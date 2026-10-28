import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Search,
  Filter,
  Headphones,
  FileText,
  AlertTriangle,
  Code2,
  TrendingUp,
  ArrowRight,
  HelpCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Check,
  RotateCcw,
  Download,
  FileDown,
  Play,
  Pause,
  Square,
  Volume2
} from 'lucide-react';
import { TopicProgress, EditalBlockType, OfficialSyllabusTopic } from '../types';
import { OFFICIAL_SYLLABUS_DISCIPLINES } from '../data/disciplinesKnowledge';
import { OFFICIAL_EDITAL_ENFASE_8 } from '../data/officialEditalEnfase8';
import { downloadTopicPDF, downloadAllTopicsCompendiumPDF } from '../services/pdfGenerator';
import { speechService } from '../services/speechService';

interface SyllabusExplorerProps {
  topics: TopicProgress[];
  onTrainTopicWithAI: (topicName: string) => void;
  onOpenAudioTab?: () => void;
}

export const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({
  topics,
  onTrainTopicWithAI,
  onOpenAudioTab,
}) => {
  // Navigation & View states
  const [activeView, setActiveView] = useState<'officialEdital' | 'interactiveChecklist' | 'officialAxes'>('officialEdital');
  const [selectedBlock, setSelectedBlock] = useState<'Todos' | EditalBlockType>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(OFFICIAL_EDITAL_ENFASE_8.map(t => t.id)));
  const [generatingPdfId, setGeneratingPdfId] = useState<string | null>(null);
  const [isGeneratingAllPdf, setIsGeneratingAllPdf] = useState(false);
  const [pdfSuccessNotice, setPdfSuccessNotice] = useState<string | null>(null);
  
  // Audio state
  const [activeSpeakingTopicId, setActiveSpeakingTopicId] = useState<string | null>(null);
  const [isAudioPaused, setIsAudioPaused] = useState<boolean>(false);

  useEffect(() => {
    speechService.initVoices();
    const unsubscribe = speechService.subscribe((state) => {
      if (state.activeId && state.activeId.startsWith('syllabus-')) {
        setActiveSpeakingTopicId(state.activeId);
        setIsAudioPaused(state.isPaused);
        if (!state.isPlaying) {
          setActiveSpeakingTopicId(null);
        }
      } else if (!state.isPlaying) {
        setActiveSpeakingTopicId(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleTopicAudio = (topic: OfficialSyllabusTopic) => {
    const utteranceId = `syllabus-${topic.id}`;
    if (activeSpeakingTopicId === utteranceId) {
      if (isAudioPaused) {
        speechService.resume();
        setIsAudioPaused(false);
      } else {
        speechService.pause();
        setIsAudioPaused(true);
      }
      return;
    }

    const subtopicsText = topic.subtopics.join(', ');
    const formulasText = topic.keyConceptsAndFormulas.map(f => `${f.name}: ${f.description}`).join('. ');
    const trapsText = topic.cesgranrioExamTraps.join('. ');
    const textToRead = `Tópico: ${topic.title}. Enunciado Oficial: ${topic.officialWording}. Subtópicos: ${subtopicsText}. Fórmulas e conceitos essenciais: ${formulasText}. Pegadinhas da Cesgranrio: ${trapsText}. Aplicação na Transpetro: ${topic.transpetroPracticalContext}.`;

    speechService.play(textToRead, {
      id: utteranceId,
      rate: 1.0,
      volume: 1.0,
      onStart: () => {
        setActiveSpeakingTopicId(utteranceId);
        setIsAudioPaused(false);
      },
      onPause: () => setIsAudioPaused(true),
      onResume: () => setIsAudioPaused(false),
      onEnd: () => setActiveSpeakingTopicId(null),
      onError: () => setActiveSpeakingTopicId(null)
    });
  };

  const handleStopTopicAudio = () => {
    speechService.stop();
    setActiveSpeakingTopicId(null);
    setIsAudioPaused(false);
  };
  
  // Persisted checked subtopics
  const [checkedSubtopics, setCheckedSubtopics] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('transpetro_edital_checked_subtopics');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    return new Set<string>();
  });

  useEffect(() => {
    try {
      localStorage.setItem('transpetro_edital_checked_subtopics', JSON.stringify(Array.from(checkedSubtopics)));
    } catch (e) {
      console.error(e);
    }
  }, [checkedSubtopics]);

  const toggleSubtopic = (subtopic: string) => {
    setCheckedSubtopics(prev => {
      const next = new Set(prev);
      if (next.has(subtopic)) {
        next.delete(subtopic);
      } else {
        next.add(subtopic);
      }
      return next;
    });
  };

  const toggleExpand = (topicId: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedTopics(new Set(OFFICIAL_EDITAL_ENFASE_8.map(t => t.id)));
  };

  const collapseAll = () => {
    setExpandedTopics(new Set());
  };

  const handleDownloadTopicPDF = (topic: OfficialSyllabusTopic) => {
    try {
      setGeneratingPdfId(topic.id);
      setTimeout(() => {
        downloadTopicPDF(topic);
        setGeneratingPdfId(null);
        setPdfSuccessNotice(`Caderno em PDF gerado com sucesso: ${topic.itemCode} - ${topic.title}`);
        setTimeout(() => setPdfSuccessNotice(null), 4000);
      }, 80);
    } catch (err) {
      console.error(err);
      setGeneratingPdfId(null);
      alert('Não foi possível gerar o arquivo PDF. Tente novamente.');
    }
  };

  const handleDownloadAllPDF = () => {
    try {
      setIsGeneratingAllPdf(true);
      setTimeout(() => {
        const topicsToExport = selectedBlock === 'Todos'
          ? OFFICIAL_EDITAL_ENFASE_8
          : OFFICIAL_EDITAL_ENFASE_8.filter(t => t.block === selectedBlock);
        downloadAllTopicsCompendiumPDF(topicsToExport);
        setIsGeneratingAllPdf(false);
        setPdfSuccessNotice(
          selectedBlock === 'Todos'
            ? 'Apostila Completa do Edital (15 Tópicos) gerada com sucesso!'
            : `Apostila do ${selectedBlock} gerada com sucesso em PDF!`
        );
        setTimeout(() => setPdfSuccessNotice(null), 5000);
      }, 150);
    } catch (err) {
      console.error(err);
      setIsGeneratingAllPdf(false);
      alert('Erro ao compilar a apostila em PDF.');
    }
  };

  // Calculations for global progress across all edital subtopics
  const allSubtopics = useMemo(() => {
    return OFFICIAL_EDITAL_ENFASE_8.flatMap(t => t.subtopics);
  }, []);

  const totalSubtopicsCount = allSubtopics.length;
  const completedCount = allSubtopics.filter(s => checkedSubtopics.has(s)).length;
  const overallPercentage = totalSubtopicsCount > 0 ? Math.round((completedCount / totalSubtopicsCount) * 100) : 0;

  // Filtered topics based on block and search query
  const filteredEditalTopics = useMemo(() => {
    return OFFICIAL_EDITAL_ENFASE_8.filter(topic => {
      const matchesBlock = selectedBlock === 'Todos' || topic.block === selectedBlock;
      if (!matchesBlock) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = topic.title.toLowerCase().includes(q);
      const matchWording = topic.officialWording.toLowerCase().includes(q);
      const matchSub = topic.subtopics.some(s => s.toLowerCase().includes(q));
      const matchTraps = topic.cesgranrioExamTraps.some(trap => trap.toLowerCase().includes(q));
      const matchFormulas = topic.keyConceptsAndFormulas.some(f => f.name.toLowerCase().includes(q) || (f.formulaOrCode && f.formulaOrCode.toLowerCase().includes(q)));

      return matchTitle || matchWording || matchSub || matchTraps || matchFormulas;
    });
  }, [selectedBlock, searchQuery]);

  const blockStats = useMemo(() => {
    const stats: Record<string, { total: number; done: number }> = {
      'Conhecimentos Básicos': { total: 0, done: 0 },
      'Bloco I': { total: 0, done: 0 },
      'Bloco II': { total: 0, done: 0 },
      'Bloco III': { total: 0, done: 0 },
    };

    OFFICIAL_EDITAL_ENFASE_8.forEach(topic => {
      topic.subtopics.forEach(sub => {
        if (stats[topic.block]) {
          stats[topic.block].total += 1;
          if (checkedSubtopics.has(sub)) {
            stats[topic.block].done += 1;
          }
        }
      });
    });

    return stats;
  }, [checkedSubtopics]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Top Banner: Edital Oficial Identificação */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 tracking-wide">
                EDITAL OFICIAL CESGRANRIO
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/50">
                Processo Seletivo Público Petrobras / Transpetro
              </span>
              <span className="text-xs text-slate-400 font-medium">Nível Superior</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ÊNFASE 8: CIÊNCIA DE DADOS
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Conteúdo programático integral estruturado conforme o <strong>enunciado oficial do edital</strong>. 
              Acompanhe seu avanço em cada matéria, estude os subtópicos solicitados, domine as fórmulas matemáticas e prepare-se contra as pegadinhas da Cesgranrio.
            </p>
          </div>

          {/* Progress Overview Card */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-950/90 p-4 rounded-2xl border border-slate-800/90 shadow-inner">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-400">Progresso do Edital</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400">{overallPercentage}%</span>
                <span className="text-xs text-slate-500 font-medium">({completedCount}/{totalSubtopicsCount} tópicos)</span>
              </div>
              <div className="w-44 bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 self-stretch">
              <button
                id="download-full-apostila-btn"
                onClick={handleDownloadAllPDF}
                disabled={isGeneratingAllPdf}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition justify-center disabled:opacity-50"
                title="Baixar Apostila Completa em PDF com todos os tópicos do Edital"
              >
                {isGeneratingAllPdf ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Compilando Apostila...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Baixar Apostila em PDF</span>
                  </>
                )}
              </button>

              {onOpenAudioTab && (
                <button
                  onClick={onOpenAudioTab}
                  className="flex items-center gap-2 px-3.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs transition justify-center"
                >
                  <Headphones className="w-4 h-4 text-emerald-400" />
                  <span>Ouvir Aulas</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success Toast Notice */}
        {pdfSuccessNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-center justify-between gap-2 shadow-lg animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-semibold">{pdfSuccessNotice}</span>
            </div>
            <button
              onClick={() => setPdfSuccessNotice(null)}
              className="text-emerald-400 hover:text-white text-[11px] font-bold px-1.5 py-0.5 rounded"
            >
              Fechar
            </button>
          </div>
        )}

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveView('officialEdital')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeView === 'officialEdital'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Edital na Íntegra (Enunciado & Fórmulas)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800/80 text-[10px] text-emerald-300">
              {OFFICIAL_EDITAL_ENFASE_8.length} Matérias
            </span>
          </button>

          <button
            onClick={() => setActiveView('interactiveChecklist')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeView === 'interactiveChecklist'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Checklist Geral dos {totalSubtopicsCount} Tópicos</span>
          </button>

          <button
            onClick={() => setActiveView('officialAxes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeView === 'officialAxes'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>12 Eixos Transversais</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: EDITAL NA ÍNTEGRA (ENUNCIADO OFICIAL + MATÉRIAS) */}
      {activeView === 'officialEdital' && (
        <div className="space-y-5">
          {/* Controls Bar: Filter by Blocks, Search, Expand/Collapse */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Block Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Blocos:
              </span>
              {(['Todos', 'Conhecimentos Básicos', 'Bloco I', 'Bloco II', 'Bloco III'] as const).map(blockName => {
                const isSelected = selectedBlock === blockName;
                const stats = blockName === 'Todos' ? null : blockStats[blockName];
                const pct = stats && stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : null;

                return (
                  <button
                    key={blockName}
                    onClick={() => setSelectedBlock(blockName)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    <span>{blockName}</span>
                    {pct !== null && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${pct === 100 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                        {pct}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Expand/Collapse */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar no edital (ex: PCA, Spark, L1, Hessiana)..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <button
                onClick={expandedTopics.size > 0 ? collapseAll : expandAll}
                className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-[11px] font-medium text-slate-400 hover:text-slate-200 transition whitespace-nowrap"
              >
                {expandedTopics.size > 0 ? 'Recolher Todos' : 'Expandir Todos'}
              </button>
            </div>

          </div>

          {/* List of Official Syllabus Topics */}
          <div className="space-y-6">
            {filteredEditalTopics.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Nenhuma matéria do edital corresponde à busca "{searchQuery}".</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedBlock('Todos'); }}
                  className="mt-3 px-3 py-1.5 bg-emerald-600/20 text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-600/30 transition"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              filteredEditalTopics.map((item) => {
                const isExpanded = expandedTopics.has(item.id);
                const subDone = item.subtopics.filter(s => checkedSubtopics.has(s)).length;
                const totalSub = item.subtopics.length;
                const topicPercent = totalSub > 0 ? Math.round((subDone / totalSub) * 100) : 0;

                return (
                  <div
                    key={item.id}
                    id={`edital-card-${item.id}`}
                    className="bg-slate-900/95 border border-slate-800 hover:border-slate-700/80 transition-all duration-200 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {item.itemCode}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300">
                            {item.block}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400">
                            {item.area}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.relevance === 'Altíssima'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            Incidência {item.relevance}
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          {item.title}
                        </h2>
                      </div>

                      {/* Right controls: Progress & Train */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-black text-emerald-400">{topicPercent}%</div>
                          <div className="text-[10px] text-slate-500">{subDone}/{totalSub} concluídos</div>
                        </div>

                        <button
                          onClick={() => onTrainTopicWithAI(item.title)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                          title={`Abrir Agente Especialista para treinar questões sobre ${item.title}`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Treinar com IA</span>
                        </button>

                        {/* Audio Narration Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleTopicAudio(item);
                          }}
                          className={`px-3 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95 ${
                            activeSpeakingTopicId === `syllabus-${item.id}` && !isAudioPaused
                              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-amber-500/10'
                              : activeSpeakingTopicId === `syllabus-${item.id}` && isAudioPaused
                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
                          }`}
                          title={`Ouvir leitura do tópico ${item.title} em áudio`}
                        >
                          {activeSpeakingTopicId === `syllabus-${item.id}` && !isAudioPaused ? (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-amber-400" />
                              <span className="hidden sm:inline">Pausar</span>
                            </>
                          ) : activeSpeakingTopicId === `syllabus-${item.id}` && isAudioPaused ? (
                            <>
                              <Play className="w-3.5 h-3.5 fill-emerald-400" />
                              <span className="hidden sm:inline">Retomar</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="hidden sm:inline">Ouvir</span>
                            </>
                          )}
                        </button>

                        <button
                          id={`download-pdf-btn-${item.id}`}
                          onClick={() => handleDownloadTopicPDF(item)}
                          disabled={generatingPdfId === item.id}
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-bold transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                          title={`Gerar e baixar caderno completo em PDF sobre ${item.title}`}
                        >
                          {generatingPdfId === item.id ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                              <span className="hidden sm:inline">Gerando...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="hidden sm:inline">Baixar PDF</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition"
                          aria-label="Expandir ou recolher matéria"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar for this Topic */}
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${topicPercent}%` }}
                      />
                    </div>

                    {/* ENUNCIADO OFICIAL DO EDITAL (LITERAL) */}
                    <div className="bg-slate-950/80 border border-emerald-950/60 rounded-xl p-3.5 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5" />
                        Enunciado Oficial do Edital Cesgranrio:
                      </div>
                      <p className="text-slate-300 leading-relaxed italic">
                        "{item.officialWording}"
                      </p>
                    </div>

                    {/* EXPANDABLE DEEP STUDY CONTENT */}
                    {isExpanded && (
                      <div className="space-y-4 pt-2">
                        
                        {/* 1. TÓPICOS SOLICITADOS PARA ESTUDAR (CHECKLIST INTERATIVO) */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              Tópicos Solicitados para Estudar nesta Matéria:
                            </span>
                            <span className="text-[10px] text-slate-400">
                              (Clique para marcar como estudado)
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {item.subtopics.map((sub, sIdx) => {
                              const isChecked = checkedSubtopics.has(sub);
                              return (
                                <div
                                  key={sIdx}
                                  onClick={() => toggleSubtopic(sub)}
                                  className={`cursor-pointer p-2.5 rounded-xl border text-xs leading-snug flex items-start gap-2.5 transition select-none ${
                                    isChecked
                                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 line-through opacity-85'
                                      : 'bg-slate-950 border-slate-800/90 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                                  }`}
                                >
                                  <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition ${
                                    isChecked ? 'bg-emerald-500 text-slate-950' : 'border border-slate-600 bg-slate-900'
                                  }`}>
                                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span>{sub}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* 2. FÓRMULAS & CÓDIGOS CHAVE */}
                        {item.keyConceptsAndFormulas.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                              <Code2 className="w-4 h-4 text-cyan-400" />
                              Fórmulas & Comandos Chave Exigidos em Prova:
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {item.keyConceptsAndFormulas.map((f, fIdx) => (
                                <div key={fIdx} className="bg-slate-950 border border-cyan-950/80 rounded-xl p-3 text-xs space-y-1">
                                  <div className="font-bold text-cyan-400">{f.name}</div>
                                  <p className="text-slate-400 text-[11px] leading-relaxed">{f.description}</p>
                                  {f.formulaOrCode && (
                                    <pre className="mt-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 whitespace-pre-wrap overflow-x-auto">
                                      {f.formulaOrCode}
                                    </pre>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. PEGADINHAS DA BANCA CESGRANRIO */}
                        {item.cesgranrioExamTraps.length > 0 && (
                          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 text-xs space-y-2">
                            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                              <AlertTriangle className="w-4 h-4 text-amber-400" />
                              <span>O "Pulo do Gato": Pegadinhas Recorrentes da Cesgranrio</span>
                            </div>
                            <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px] leading-relaxed">
                              {item.cesgranrioExamTraps.map((trap, tIdx) => (
                                <li key={tIdx} className="pl-1">
                                  <span className="text-slate-200">{trap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* 4. CONTEXTO PRÁTICO TRANSPETRO & ESTRATÉGIA DE ESTUDO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-1">
                            <div className="font-bold text-slate-300 flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                              Aplicação no Setor (Transpetro / Energia):
                            </div>
                            <p className="text-slate-400 text-[11px] leading-relaxed">
                              {item.transpetroPracticalContext}
                            </p>
                          </div>

                          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-1">
                            <div className="font-bold text-slate-300 flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                              Estratégia Recomendada de Estudo:
                            </div>
                            <ul className="text-slate-400 text-[11px] space-y-0.5 list-disc list-inside">
                              {item.recommendedStudyStrategy.map((strat, sIdx) => (
                                <li key={sIdx}>{strat}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* PDF Full Download Banner inside the Card */}
                        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-950 to-slate-950 border border-emerald-500/30 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
                          <div className="space-y-1">
                            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                              <FileDown className="w-4 h-4 text-emerald-400" />
                              <span>Caderno de Estudos em PDF Completo ({item.itemCode})</span>
                            </div>
                            <p className="text-slate-400 text-[11px] leading-relaxed">
                              Material estruturado pronto para impressão ou estudo offline: inclui texto oficial do edital, checklist dos {item.subtopics.length} subtópicos, fórmulas matemáticas, pegadinhas e questões comentadas Cesgranrio com gabarito.
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleTopicAudio(item)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 flex-shrink-0 shadow-md ${
                                activeSpeakingTopicId === `syllabus-${item.id}` && !isAudioPaused
                                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                                  : activeSpeakingTopicId === `syllabus-${item.id}` && isAudioPaused
                                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                                    : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700'
                              }`}
                            >
                              {activeSpeakingTopicId === `syllabus-${item.id}` && !isAudioPaused ? (
                                <>
                                  <Pause className="w-3.5 h-3.5 fill-slate-950" />
                                  <span>Pausar Áudio</span>
                                </>
                              ) : activeSpeakingTopicId === `syllabus-${item.id}` && isAudioPaused ? (
                                <>
                                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                                  <span>Continuar Áudio</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Ouvir em Áudio</span>
                                </>
                              )}
                            </button>
                            <button
                              id={`download-card-pdf-btn-${item.id}`}
                              onClick={() => handleDownloadTopicPDF(item)}
                              disabled={generatingPdfId === item.id}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 flex-shrink-0 shadow-md shadow-emerald-600/20 disabled:opacity-50"
                            >
                              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>{generatingPdfId === item.id ? 'Compilando PDF...' : 'Baixar Caderno em PDF'}</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: CHECKLIST GERAL DOS TÓPICOS */}
      {activeView === 'interactiveChecklist' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Controle Completo dos Tópicos Estudados
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Marque cada tópico conforme você for estudando a teoria e resolvendo questões.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadAllPDF}
                disabled={isGeneratingAllPdf}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 transition flex items-center gap-1.5 disabled:opacity-50"
                title="Baixar Apostila Completa de todos os tópicos em PDF"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exportar Apostila PDF</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Deseja realmente desmarcar todos os tópicos?')) {
                    setCheckedSubtopics(new Set());
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-400 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resetar Checklist
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {topics.map((t) => {
              const checkedInThisTopic = t.subtopics.filter(s => checkedSubtopics.has(s)).length;
              const topicPercent = Math.round((checkedInThisTopic / t.subtopics.length) * 100);

              return (
                <div
                  key={t.topicId}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">
                          {t.category}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-0.5">
                          {t.name}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-400">
                          {topicPercent}%
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {checkedInThisTopic}/{t.subtopics.length} estudados
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${topicPercent}%` }}
                      />
                    </div>

                    {/* Subtopics Checklist */}
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {t.subtopics.map((sub, idx) => {
                        const isChecked = checkedSubtopics.has(sub);
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleSubtopic(sub)}
                            className={`cursor-pointer p-2.5 rounded-xl border text-xs leading-snug flex items-start gap-2.5 transition select-none ${
                              isChecked
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 line-through opacity-80'
                                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="mt-0.5 rounded text-emerald-500 focus:ring-0"
                            />
                            <span>{sub}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Button: Train with AI */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      id={`train-topic-${t.topicId}`}
                      onClick={() => onTrainTopicWithAI(t.name)}
                      className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-2 group"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition" />
                      <span>Treinar "{t.name}" com IA</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: 12 EIXOS TRANSVERSAIS */}
      {activeView === 'officialAxes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFICIAL_SYLLABUS_DISCIPLINES.map((axis) => (
              <div
                key={axis.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {axis.axisNumber}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{axis.category}</span>
                    </div>

                    {onOpenAudioTab && (
                      <button
                        onClick={onOpenAudioTab}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                        title="Ouvir áudio deste eixo"
                      >
                        <Headphones className="w-3.5 h-3.5" /> Ouvir Áudio
                      </button>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {axis.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {axis.shortDescription}
                  </p>

                  {/* Core Concepts */}
                  <div className="space-y-2.5 pt-2">
                    {axis.coreConcepts.map((concept, cIdx) => (
                      <div key={cIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
                        <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          {concept.conceptName}
                        </div>
                        <p className="text-slate-400 leading-normal">
                          {concept.summary}
                        </p>

                        {concept.formulasOrCode && (
                          <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300">
                            {concept.formulasOrCode}
                          </div>
                        )}

                        <div className="text-amber-300 text-[11px] flex items-start gap-1 pt-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span><strong>Pegadinha: </strong>{concept.commonExamTrap}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Official Exam Items References */}
                  {axis.officialExamReferences.length > 0 && (
                    <div className="text-[11px] text-slate-400 pt-1">
                      <strong className="text-slate-300">Na Prova Petrobras: </strong>
                      {axis.officialExamReferences.join(' • ')}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onTrainTopicWithAI(axis.title)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Treinar Questões deste Eixo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
