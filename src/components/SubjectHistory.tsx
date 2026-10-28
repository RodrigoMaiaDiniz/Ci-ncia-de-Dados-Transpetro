import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  History, 
  Search, 
  Filter, 
  Sparkles, 
  Star, 
  Copy, 
  Check, 
  Trash2, 
  Download, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Plus, 
  BookOpen, 
  Clock, 
  Tag, 
  FileText, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Edit3,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { RequestedSubject, EditalBlockType } from '../types';
import { 
  getRequestedSubjects, 
  deleteRequestedSubject, 
  toggleFavoriteSubject, 
  updateSubjectNotes, 
  clearAllSubjects, 
  saveRequestedSubject,
  exportHistoryAsMarkdown,
  deduceSubjectMetadata
} from '../services/historyStorage';
import { 
  downloadRequestedSubjectPDF, 
  downloadHistoryCompilationPDF 
} from '../services/pdfGenerator';
import { speechService } from '../services/speechService';
import { CodeBlockHighlight } from './CodeBlockHighlight';

interface SubjectHistoryProps {
  onNavigateToAgent: (promptToContinue?: string, topicTitle?: string) => void;
  onTrainTopicWithAI?: (topicName: string) => void;
}

export const SubjectHistory: React.FC<SubjectHistoryProps> = ({
  onNavigateToAgent,
  onTrainTopicWithAI
}) => {
  const [subjects, setSubjects] = useState<RequestedSubject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<'Todos' | EditalBlockType>('Todos');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [generatingPdfId, setGeneratingPdfId] = useState<string | null>(null);
  const [isGeneratingCompilationPdf, setIsGeneratingCompilationPdf] = useState(false);

  // Note editing state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');

  // Manual subject addition modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualQuery, setManualQuery] = useState('');
  const [manualCategory, setManualCategory] = useState('Machine Learning');

  const markdownComponents = {
    pre({ children }: any) {
      return <div className="not-prose my-2.5">{children}</div>;
    },
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      if (inline || (!match && !codeString.includes('\n'))) {
        return (
          <code className="px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-[0.88em]" {...props}>
            {children}
          </code>
        );
      }
      return (
        <CodeBlockHighlight
          code={codeString}
          language={match ? match[1] : undefined}
          inline={false}
        />
      );
    }
  };

  // Load subjects & subscribe to storage events
  const loadData = () => {
    setSubjects(getRequestedSubjects());
  };

  useEffect(() => {
    loadData();

    const handleStorageUpdate = () => {
      loadData();
    };

    window.addEventListener('tp_subject_history_updated', handleStorageUpdate);

    const unsubscribe = speechService.subscribe((state) => {
      if (!state.isPlaying) {
        setSpeakingId(null);
      } else if (state.isPlaying && state.activeId) {
        setSpeakingId(state.activeId);
      }
    });

    return () => {
      window.removeEventListener('tp_subject_history_updated', handleStorageUpdate);
      unsubscribe();
    };
  }, []);

  // Text to speech via robust speechService
  const handleSpeak = (id: string, text: string) => {
    if (speakingId === id) {
      speechService.stop();
      setSpeakingId(null);
    } else {
      speechService.play(text, {
        id,
        rate: 1.05,
        onStart: () => setSpeakingId(id),
        onEnd: () => setSpeakingId(null),
        onError: () => setSpeakingId(null)
      });
      setSpeakingId(id);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(subjects.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Deseja realmente remover o registro "${title}" do histórico?`)) {
      deleteRequestedSubject(id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Tem certeza de que deseja limpar TODO o histórico de assuntos? Esta ação não poderá ser desfeita.')) {
      clearAllSubjects();
    }
  };

  const handleSaveNote = (id: string) => {
    updateSubjectNotes(id, tempNoteText);
    setEditingNoteId(null);
    setTempNoteText('');
  };

  const handleExportMarkdown = () => {
    const md = exportHistoryAsMarkdown(filteredSubjects);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `historico_transpetro_${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSubjectPDF = (item: RequestedSubject) => {
    try {
      setGeneratingPdfId(item.id);
      setTimeout(() => {
        downloadRequestedSubjectPDF(item);
        setGeneratingPdfId(null);
      }, 80);
    } catch (err) {
      console.error(err);
      setGeneratingPdfId(null);
      alert('Não foi possível gerar o PDF deste assunto.');
    }
  };

  const handleExportHistoryPDF = () => {
    try {
      setIsGeneratingCompilationPdf(true);
      setTimeout(() => {
        downloadHistoryCompilationPDF(filteredSubjects);
        setIsGeneratingCompilationPdf(false);
      }, 150);
    } catch (err) {
      console.error(err);
      setIsGeneratingCompilationPdf(false);
      alert('Erro ao exportar compilação do histórico em PDF.');
    }
  };

  const handleCreateManualSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim() || !manualQuery.trim()) return;

    const metadata = deduceSubjectMetadata(manualQuery);
    saveRequestedSubject({
      title: manualTitle.trim(),
      source: 'manual',
      category: manualCategory,
      block: metadata.block,
      userQuery: manualQuery.trim(),
      tags: [...metadata.tags, 'Anotação'],
      status: 'pending',
      agentResponse: 'Assunto adicionado manualmente para estudo e consulta no Agente.',
      mode: 'tutor'
    });

    setManualTitle('');
    setManualQuery('');
    setShowAddModal(false);
  };

  // Filtered Subjects
  const filteredSubjects = useMemo(() => {
    return subjects.filter(item => {
      if (onlyFavorites && !item.isFavorite) return false;
      if (selectedBlock !== 'Todos' && item.block !== selectedBlock) return false;
      if (selectedSource !== 'all' && item.source !== selectedSource) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchQuery = item.userQuery.toLowerCase().includes(q);
      const matchResp = item.agentResponse ? item.agentResponse.toLowerCase().includes(q) : false;
      const matchNotes = item.notes ? item.notes.toLowerCase().includes(q) : false;
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));

      return matchTitle || matchQuery || matchResp || matchNotes || matchTags;
    });
  }, [subjects, searchQuery, selectedBlock, onlyFavorites, selectedSource]);

  // Key stats
  const totalCount = subjects.length;
  const favoritesCount = subjects.filter(s => s.isFavorite).length;
  const answeredCount = subjects.filter(s => s.agentResponse && s.agentResponse.length > 50).length;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 tracking-wide flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                HISTÓRICO PERMANENTE
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/50 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Memória Local Persistida
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Histórico de Assuntos & Dúvidas Solicitados
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Todos os assuntos, perguntas, códigos e temas de edital solicitados ao Agente ficam <strong>permanentemente gravados</strong>. 
              Mesmo que você mude de aba, saia do aplicativo ou feche o navegador, seu histórico de estudos nunca é apagado.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 shadow-inner">
            <div className="px-3 py-1.5 border-r border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Solicitado</div>
              <div className="text-2xl font-black text-emerald-400">{totalCount}</div>
            </div>

            <div className="px-3 py-1.5 border-r border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400">Respondidos IA</div>
              <div className="text-2xl font-black text-cyan-400">{answeredCount}</div>
            </div>

            <div className="px-3 py-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400">Favoritos</div>
              <div className="text-2xl font-black text-amber-400">{favoritesCount}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Export, Add Manual, Open Agent */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateToAgent()}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Fazer Nova Pergunta no Agente</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Registrar Assunto Manualmente</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportHistoryPDF}
              disabled={filteredSubjects.length === 0 || isGeneratingCompilationPdf}
              className="px-3.5 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
              title="Baixar apostila completa de todas as consultas do histórico em PDF"
            >
              {isGeneratingCompilationPdf ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>Gerando PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span>Baixar Histórico (PDF)</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportMarkdown}
              disabled={filteredSubjects.length === 0}
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
              title="Baixar todo o histórico em arquivo Markdown (.md)"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Exportar (.md)</span>
            </button>

            {subjects.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800 text-slate-400 hover:text-rose-400 text-xs font-semibold transition flex items-center gap-1.5"
                title="Limpar histórico permanentemente"
              >
                <Trash2 className="w-4 h-4" />
                <span>Limpar Tudo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar nos assuntos, perguntas, respostas da IA ou anotações..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Block Selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['Todos', 'Bloco I', 'Bloco II', 'Bloco III', 'Conhecimentos Básicos'] as const).map(block => (
              <button
                key={block}
                onClick={() => setSelectedBlock(block)}
                className={`px-2.5 py-1 rounded-lg transition text-[11px] font-semibold ${
                  selectedBlock === block 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {block === 'Conhecimentos Básicos' ? 'Básicos' : block}
              </button>
            ))}
          </div>

          {/* Only Favorites Button */}
          <button
            onClick={() => setOnlyFavorites(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 ${
              onlyFavorites
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
            <span>Favoritos</span>
          </button>

          {/* Expand/Collapse All */}
          <button
            onClick={expandedIds.size > 0 ? collapseAll : expandAll}
            className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-[11px] font-medium text-slate-400 hover:text-slate-200 transition"
          >
            {expandedIds.size > 0 ? 'Recolher Todos' : 'Expandir Todos'}
          </button>
        </div>

      </div>

      {/* Main List of Requested Subjects */}
      <div className="space-y-4">
        {filteredSubjects.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 space-y-3">
            <History className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="font-bold text-white text-base">Nenhum assunto encontrado</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {searchQuery 
                ? `Nenhum resultado corresponde à busca "${searchQuery}". Tente usar outros termos ou limpe o filtro.`
                : 'Você ainda não possui assuntos registrados para os filtros selecionados. Comece fazendo uma pergunta ao Agente!'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => { setSearchQuery(''); setSelectedBlock('Todos'); setOnlyFavorites(false); }}
                className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold hover:bg-emerald-600/30 transition"
              >
                Limpar Filtros de Busca
              </button>
            </div>
          </div>
        ) : (
          filteredSubjects.map((item) => {
            const isExpanded = expandedIds.has(item.id);
            const isSpeaking = speakingId === item.id;
            const isEditingNote = editingNoteId === item.id;

            return (
              <div
                key={item.id}
                id={`history-card-${item.id}`}
                className="bg-slate-900/95 border border-slate-800 hover:border-slate-700/80 transition-all rounded-2xl p-5 shadow-xl space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Block / Category badge */}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {item.block || 'Edital Cesgranrio'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300">
                        {item.category}
                      </span>
                      
                      {/* Source tag */}
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {item.timestamp}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      {item.title}
                    </h2>
                  </div>

                  {/* Actions Bar on Card */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* Star Favorite */}
                    <button
                      onClick={() => toggleFavoriteSubject(item.id)}
                      className={`p-2 rounded-xl border transition ${
                        item.isFavorite
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                      title={item.isFavorite ? 'Remover dos favoritos' : 'Favoritar este assunto'}
                    >
                      <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>

                    {/* Open & Continue in Agent */}
                    <button
                      onClick={() => onNavigateToAgent(item.userQuery, item.title)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                      title="Abrir este assunto diretamente no Agente de IA para aprofundar ou tirar dúvidas"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Continuar no Agente</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Expand/Collapse */}
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Delete Item */}
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 rounded-xl transition"
                      title="Excluir este item do histórico"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Prompt Question Box */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Pergunta / Prompt Solicitado:
                  </div>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    "{item.userQuery}"
                  </p>
                </div>

                {/* AI Response Preview / Full Expanded */}
                {item.agentResponse && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        Resposta do Agente de IA:
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeak(item.id, item.agentResponse || '')}
                          className={`text-xs px-2 py-1 rounded-lg border transition flex items-center gap-1 ${
                            isSpeaking 
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
                          }`}
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3 text-rose-400" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
                          <span>{isSpeaking ? 'Parar Áudio' : 'Ouvir'}</span>
                        </button>

                        <button
                          onClick={() => handleCopy(item.id, item.agentResponse || '')}
                          className="text-xs px-2 py-1 rounded-lg bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 transition flex items-center gap-1"
                        >
                          {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === item.id ? 'Copiado' : 'Copiar'}</span>
                        </button>

                        <button
                          id={`download-subject-pdf-${item.id}`}
                          onClick={() => handleDownloadSubjectPDF(item)}
                          disabled={generatingPdfId === item.id}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition flex items-center gap-1 font-semibold disabled:opacity-50"
                          title="Baixar esta aula/resposta em PDF formatado"
                        >
                          {generatingPdfId === item.id ? (
                            <>
                              <div className="w-3 h-3 border border-emerald-400 border-t-transparent rounded-full animate-spin" />
                              <span>Gerando...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3 h-3 text-emerald-400" />
                              <span>Baixar PDF</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs text-slate-300 leading-relaxed overflow-hidden transition-all ${
                      isExpanded ? 'max-h-none' : 'max-h-40 relative'
                    }`}>
                      <div className="prose prose-invert prose-xs max-w-none prose-p:my-1.5 prose-headings:text-emerald-300 prose-code:text-emerald-300 prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0">
                        <ReactMarkdown components={markdownComponents}>{item.agentResponse}</ReactMarkdown>
                      </div>

                      {!isExpanded && (
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent flex items-end justify-center pb-2">
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-slate-900/90 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1 shadow-md"
                          >
                            <span>Ver Resposta Completa</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags and Personal Study Notes */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 text-[10px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Notes toggle or editor */}
                  <div className="flex items-center gap-2">
                    {item.notes && !isEditingNote && (
                      <span className="text-[11px] text-amber-300/90 italic truncate max-w-xs">
                        📝 "{item.notes}"
                      </span>
                    )}

                    <button
                      onClick={() => {
                        setEditingNoteId(isEditingNote ? null : item.id);
                        setTempNoteText(item.notes || '');
                      }}
                      className="text-slate-400 hover:text-slate-200 text-[11px] font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3 text-emerald-400" />
                      <span>{item.notes ? 'Editar Anotação' : '+ Anotação de Estudo'}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Note Editor */}
                {isEditingNote && (
                  <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3 space-y-2 text-xs">
                    <label className="font-semibold text-emerald-400 block text-[11px]">
                      Anotação / Ponto de Revisão para este assunto:
                    </label>
                    <textarea
                      value={tempNoteText}
                      onChange={(e) => setTempNoteText(e.target.value)}
                      placeholder="Ex: Pegadinha da Cesgranrio no enunciado; revisar antes do simulado..."
                      rows={2}
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white text-[11px]"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSaveNote(item.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition"
                      >
                        Salvar Anotação
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Manual Subject Addition Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                Registrar Assunto de Estudo
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualSubject} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Título do Assunto / Tema:</label>
                <input
                  type="text"
                  required
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Ex: Regularização ElasticNet e Critérios de Parada"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Categoria do Edital:</label>
                <select
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Machine Learning">Machine Learning & Deep Learning (Bloco I)</option>
                  <option value="Estatística">Estatística, Probabilidade e Cálculo (Bloco II)</option>
                  <option value="Big Data & SQL">Big Data, Spark & SQL (Bloco II)</option>
                  <option value="Python & MLOps">Python, Pandas & MLOps (Bloco II)</option>
                  <option value="Governança & LGPD">Governança, LGPD & Ética (Bloco III)</option>
                  <option value="Básicos">Língua Portuguesa e Inglês Técnico</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Pergunta ou Dúvida a ser Consultada:</label>
                <textarea
                  required
                  rows={3}
                  value={manualQuery}
                  onChange={(e) => setManualQuery(e.target.value)}
                  placeholder="Descreva a dúvida que você quer esclarecer ou treinar no Agente..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md"
                >
                  Salvar no Histórico
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
