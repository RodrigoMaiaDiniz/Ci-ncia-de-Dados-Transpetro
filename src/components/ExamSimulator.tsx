import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Filter, 
  Lightbulb, 
  BarChart3, 
  Award, 
  Play, 
  Pause, 
  Shuffle,
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Download,
  Upload,
  Layers,
  Flame,
  Check,
  RefreshCw,
  Plus,
  Headphones,
  VolumeX,
  Volume2
} from 'lucide-react';
import { Question } from '../types';
import { speechService } from '../services/speechService';

interface ExamSimulatorProps {
  initialQuestions: Question[];
  onQuestionAnswered: (questionId: string, isCorrect: boolean) => void;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  initialQuestions,
  onQuestionAnswered,
}) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [isSpeakingCurrent, setIsSpeakingCurrent] = useState(false);
  
  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unanswered' | 'wrong' | 'correct' | 'bookmarked' | 'ai'>('all');
  const [examSourceFilter, setExamSourceFilter] = useState<'all' | 'revisao-pra-torar' | 'petrobras-2021' | 'ai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // AI Generator modal / panel state
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('Machine Learning');
  const [aiCount, setAiCount] = useState(5);
  const [aiDifficulty, setAiDifficulty] = useState('Médio/Difícil');
  const [customContext, setCustomContext] = useState('Transpetro: Dutos, Navios, Refinarias e Telemetria');
  const [showImportModal, setShowImportModal] = useState(false);
  const [rawImportJson, setRawImportJson] = useState('');
  const [importError, setImportError] = useState('');

  // Keep local storage or state synced
  useEffect(() => {
    if (questions.length === 0 && initialQuestions.length > 0) {
      setQuestions(initialQuestions);
    }
  }, [initialQuestions]);

  // Filtered list
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Exam Source filter
      if (examSourceFilter === 'revisao-pra-torar') {
        const isRpt = q.id.startsWith('rpt-') || 
                      q.officialExam?.examName?.toLowerCase().includes('revisão pra torar') || 
                      q.statement.includes('REVISÃO PRA TORAR');
        if (!isRpt) return false;
      } else if (examSourceFilter === 'petrobras-2021') {
        const isPetrobras = (q.id.startsWith('petrobras-2021') || 
                            q.officialExam?.examName?.toLowerCase().includes('petrobras')) && 
                            !q.statement.includes('REVISÃO PRA TORAR') &&
                            !q.id.startsWith('rpt-');
        if (!isPetrobras) return false;
      } else if (examSourceFilter === 'ai') {
        if (!q.isCustomGenerated) return false;
      }

      // Category filter
      if (selectedCategory !== 'Todos') {
        const matchesCategory = q.topic.toLowerCase().includes(selectedCategory.toLowerCase()) || 
                                q.subtopic.toLowerCase().includes(selectedCategory.toLowerCase());
        if (!matchesCategory) return false;
      }

      // Status filter
      const answer = selectedAnswers[q.id];
      if (statusFilter === 'unanswered' && answer) return false;
      if (statusFilter === 'wrong' && (!answer || answer === q.correctAnswer)) return false;
      if (statusFilter === 'correct' && answer !== q.correctAnswer) return false;
      if (statusFilter === 'bookmarked' && !bookmarkedIds[q.id]) return false;
      if (statusFilter === 'ai' && !q.isCustomGenerated) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inStatement = q.statement.toLowerCase().includes(query);
        const inSubtopic = q.subtopic.toLowerCase().includes(query);
        const inTopic = q.topic.toLowerCase().includes(query);
        const inOptions = q.options.some(o => o.text.toLowerCase().includes(query));
        if (!inStatement && !inSubtopic && !inTopic && !inOptions) return false;
      }

      return true;
    });
  }, [questions, examSourceFilter, selectedCategory, statusFilter, searchQuery, selectedAnswers, bookmarkedIds]);

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !examSubmitted) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, examSubmitted]);

  // Adjust index if out of bounds
  useEffect(() => {
    if (currentIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredQuestions.length, currentIndex]);

  // Stop audio when navigating to another question
  useEffect(() => {
    speechService.stop();
    setIsSpeakingCurrent(false);
  }, [currentIndex]);

  // Track global speech state
  useEffect(() => {
    const unsubscribe = speechService.subscribe((state) => {
      setIsSpeakingCurrent(state.isPlaying && (state.activeId?.startsWith('exam-') ?? false));
    });

    return () => {
      speechService.stop();
      unsubscribe();
    };
  }, []);

  const handleToggleSpeechExplanation = (q: Question) => {
    const qId = `exam-${q.id}`;
    if (isSpeakingCurrent) {
      speechService.stop();
      setIsSpeakingCurrent(false);
      return;
    }

    const answerLabel = q.correctAnswer === 'C' ? 'Certo' : q.correctAnswer === 'E' ? 'Errado' : `Alternativa ${q.correctAnswer}`;
    const cleanStatement = q.statement.replace(/[\[\]]/g, '');
    const textToSpeak = q.audioScript || `Questão sobre ${q.subtopic}. ${cleanStatement}. O gabarito oficial é: ${answerLabel}. Justificativa: ${q.explanationCorrect}. Dica de prova da banca: ${q.cesgranrioTip}`;

    speechService.play(textToSpeak, {
      id: qId,
      rate: 1.05,
      onStart: () => setIsSpeakingCurrent(true),
      onEnd: () => setIsSpeakingCurrent(false),
      onError: () => setIsSpeakingCurrent(false)
    });
    setIsSpeakingCurrent(true);
  };

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const remainingSecs = secs % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: string, option: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (examSubmitted) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));

    const isCorrect = currentQuestion.correctAnswer === option;
    onQuestionAnswered(questionId, isCorrect);
  };

  const toggleExplanation = (questionId: string) => {
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarkedIds(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    setIsTimerRunning(false);

    let correctCount = 0;
    filteredQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = filteredQuestions.length > 0 ? Math.round((correctCount / filteredQuestions.length) * 100) : 0;
    if (percent >= 70) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetExam = () => {
    setSelectedAnswers({});
    setShowExplanations({});
    setExamSubmitted(false);
    setSecondsElapsed(0);
    setIsTimerRunning(true);
    setCurrentIndex(0);
  };

  const handleGenerateQuestionsWithAI = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          count: aiCount,
          difficulty: aiDifficulty,
          context: customContext || 'Transpetro'
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar questões com a IA');
      }

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        const mappedQuestions: Question[] = data.questions.map((q: any, idx: number) => ({
          ...q,
          id: `ai-gen-${Date.now()}-${idx}`,
          isCustomGenerated: true
        }));

        setQuestions(prev => [...mappedQuestions, ...prev]);
        setCurrentIndex(0);
        setSelectedCategory('Todos');
        setStatusFilter('all');
        
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar questões via IA. Verifique a conexão com a API e tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImportJson = () => {
    try {
      setImportError('');
      const parsed = JSON.parse(rawImportJson);
      const items = Array.isArray(parsed) ? parsed : (parsed.questions || []);
      
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error('O JSON fornecido não contém uma lista válida de questões.');
      }

      const validQuestions: Question[] = items.map((q, idx) => ({
        id: q.id || `custom-import-${Date.now()}-${idx}`,
        topic: q.topic || 'Conhecimentos Específicos',
        subtopic: q.subtopic || 'Geral',
        difficulty: q.difficulty || 'Médio',
        statement: q.statement || 'Enunciado não fornecido',
        options: q.options || [
          { letter: 'A', text: 'Opção A' },
          { letter: 'B', text: 'Opção B' },
          { letter: 'C', text: 'Opção C' },
          { letter: 'D', text: 'Opção D' },
          { letter: 'E', text: 'Opção E' }
        ],
        correctAnswer: q.correctAnswer || 'A',
        explanationCorrect: q.explanationCorrect || 'Justificativa padrão.',
        distractorAnalysis: q.distractorAnalysis || [],
        cesgranrioTip: q.cesgranrioTip || 'Atenção aos detalhes do enunciado.',
        isCustomGenerated: true
      }));

      setQuestions(prev => [...validQuestions, ...prev]);
      setShowImportModal(false);
      setRawImportJson('');
      setCurrentIndex(0);
      alert(`${validQuestions.length} questões importadas com sucesso!`);
    } catch (err: any) {
      setImportError(err.message || 'Erro ao processar JSON');
    }
  };

  // Stats calculation
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = filteredQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
  const wrongCount = filteredQuestions.filter(q => selectedAnswers[q.id] && selectedAnswers[q.id] !== q.correctAnswer).length;
  const scorePercent = filteredQuestions.length > 0 ? Math.round((correctCount / filteredQuestions.length) * 100) : 0;

  // Breakdown by Category
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number; wrong: number }> = {};
    questions.forEach(q => {
      const cat = q.topic;
      if (!stats[cat]) {
        stats[cat] = { total: 0, correct: 0, wrong: 0 };
      }
      stats[cat].total++;
      if (selectedAnswers[q.id] === q.correctAnswer) {
        stats[cat].correct++;
      } else if (selectedAnswers[q.id]) {
        stats[cat].wrong++;
      }
    });
    return stats;
  }, [questions, selectedAnswers]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Top Header & Exam Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> Cesgranrio Concurso Transpetro
              </span>
              <span className="text-xs text-slate-400">Ciência de Dados • Nível Superior</span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-800 text-emerald-300">
                {questions.length} Questões no Banco
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Simulador Oficial & Banco de Treinamento Massivo</span>
            </h1>
          </div>

          {/* Right Action Bar (Timer, Status & AI Generator) */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-sm font-bold">{formatTime(secondsElapsed)}</span>
              <button
                id="toggle-timer-btn"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-slate-400 hover:text-white transition p-0.5"
                title={isTimerRunning ? 'Pausar Cronômetro' : 'Continuar'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>

            {/* Import Button */}
            <button
              id="open-import-modal-btn"
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              title="Importar questões em lote (JSON)"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Importar</span>
            </button>

            {/* AI Generator Quick Trigger */}
            <button
              id="ai-generate-questions-btn"
              onClick={() => handleGenerateQuestionsWithAI()}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Gerando Questões...' : '+ Gerar Questões Inéditas (IA)'}</span>
            </button>

            {/* Reset */}
            <button
              id="reset-exam-btn"
              onClick={handleResetExam}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Reiniciar Simulado"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Secondary Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-800/80">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por termo (ex: XGBoost, P-valor, Spark, DAMA)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Status quick filters */}
          <div className="md:col-span-7 flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                statusFilter === 'all'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Todas ({questions.length})
            </button>

            <button
              onClick={() => setStatusFilter('wrong')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                statusFilter === 'wrong'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-slate-950 text-rose-400 hover:text-rose-300 border border-slate-800'
              }`}
            >
              <Flame className="w-3 h-3 text-rose-400" /> Caderno de Erros ({wrongCount})
            </button>

            <button
              onClick={() => setStatusFilter('unanswered')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                statusFilter === 'unanswered'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Pendentes ({questions.length - answeredCount})
            </button>

            <button
              onClick={() => setStatusFilter('correct')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                statusFilter === 'correct'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'bg-slate-950 text-emerald-400 hover:text-emerald-300 border border-slate-800'
              }`}
            >
              Acertos ({correctCount})
            </button>

            <button
              onClick={() => setStatusFilter('bookmarked')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                statusFilter === 'bookmarked'
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-950 text-purple-400 hover:text-purple-300 border border-slate-800'
              }`}
            >
              <Bookmark className="w-3 h-3" /> Salvas
            </button>

            <button
              onClick={() => setStatusFilter('ai')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                statusFilter === 'ai'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-950 text-indigo-400 hover:text-indigo-300 border border-slate-800'
              }`}
            >
              <Sparkles className="w-3 h-3" /> Geradas IA
            </button>
          </div>
        </div>

        {/* Exam Source selector */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Fonte / Prova:
          </span>
          {[
            { id: 'all', label: 'Todas as Fontes', count: questions.length },
            { 
              id: 'revisao-pra-torar', 
              label: '🔥 Simulado 01: Revisão Pra Torar', 
              count: questions.filter(q => q.id.startsWith('rpt-') || q.statement.includes('REVISÃO PRA TORAR')).length 
            },
            { 
              id: 'petrobras-2021', 
              label: '🏛️ Prova Oficial Petrobras', 
              count: questions.filter(q => (q.id.startsWith('petrobras-2021') || q.officialExam?.examName?.toLowerCase().includes('petrobras')) && !q.id.startsWith('rpt-')).length 
            },
            { 
              id: 'ai', 
              label: '⚡ Geradas por IA', 
              count: questions.filter(q => q.isCustomGenerated).length 
            },
          ].map((src) => (
            <button
              key={src.id}
              id={`filter-source-${src.id}`}
              onClick={() => {
                setExamSourceFilter(src.id as any);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                examSourceFilter === src.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{src.label}</span>
              {src.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  examSourceFilter === src.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {src.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Subject discipline selector */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Disciplina:
          </span>
          {['Todos', 'Machine Learning', 'Estatística', 'Big Data', 'Python', 'Governança', 'Básicos'].map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat}`}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-slate-100 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulator Layout: Question on Left, Matrix & AI Config on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Current Question Card */}
        <div className="lg:col-span-2 space-y-4">
          {currentQuestion ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              {/* Question Meta header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Questão {currentIndex + 1} de {filteredQuestions.length}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
                    {currentQuestion.topic}
                  </span>
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                    • {currentQuestion.subtopic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    currentQuestion.difficulty === 'Fácil' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    currentQuestion.difficulty === 'Médio' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  {currentQuestion.isCustomGenerated && (
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 flex items-center gap-1 font-semibold">
                      <Sparkles className="w-2.5 h-2.5" /> Inédita IA
                    </span>
                  )}
                  <button
                    id={`bookmark-${currentQuestion.id}`}
                    onClick={() => toggleBookmark(currentQuestion.id)}
                    className="p-1 rounded text-slate-400 hover:text-amber-400 transition"
                    title={bookmarkedIds[currentQuestion.id] ? 'Remover dos favoritos' : 'Salvar questão'}
                  >
                    {bookmarkedIds[currentQuestion.id] ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Statement */}
              <div className="text-slate-100 text-base leading-relaxed whitespace-pre-line font-normal">
                {currentQuestion.statement}
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === opt.letter;
                  const isCorrect = currentQuestion.correctAnswer === opt.letter;
                  const isRevealed = examSubmitted || showExplanations[currentQuestion.id];

                  let optionStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/40';

                  if (isRevealed) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                    } else {
                      optionStyle = 'bg-slate-950/50 border-slate-800/60 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-emerald-900/30 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40';
                  }

                  return (
                    <button
                      key={opt.letter}
                      id={`option-${currentQuestion.id}-${opt.letter}`}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.letter)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${optionStyle}`}
                    >
                      <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected 
                          ? 'bg-emerald-500 text-slate-950' 
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {opt.letter}
                      </div>
                      <div className="text-sm leading-snug flex-1 pt-0.5">
                        {opt.text}
                      </div>
                      {isRevealed && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {isRevealed && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Actions below options */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  id="toggle-explanation-btn"
                  onClick={() => toggleExplanation(currentQuestion.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>{showExplanations[currentQuestion.id] || examSubmitted ? 'Ocultar Justificativa & Pegadinha' : 'Ver Comentário do Professor & Pegadinha Cesgranrio'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(prev => prev - 1)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                  </button>
                  <button
                    disabled={currentIndex === filteredQuestions.length - 1}
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Próxima <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Detailed Explanation Box */}
              {(showExplanations[currentQuestion.id] || examSubmitted) && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-sm animate-in fade-in duration-300">
                  
                  {/* Gabarito e Justificativa */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Gabarito Oficial: {currentQuestion.correctAnswer === 'C' ? 'CERTO' : currentQuestion.correctAnswer === 'E' ? 'ERRADO' : `Alternativa ${currentQuestion.correctAnswer}`}
                      </div>

                      <button
                        id="play-audio-explanation-btn"
                        onClick={() => handleToggleSpeechExplanation(currentQuestion)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition shadow-sm ${
                          isSpeakingCurrent
                            ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                            : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isSpeakingCurrent ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" /> Parar Áudio
                          </>
                        ) : (
                          <>
                            <Headphones className="w-3.5 h-3.5 text-emerald-400" /> Ouvir Explicação em Áudio
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-slate-300 whitespace-pre-line leading-relaxed">
                      {currentQuestion.explanationCorrect}
                    </div>
                  </div>

                  {/* Análise de Distratores */}
                  {currentQuestion.distractorAnalysis && currentQuestion.distractorAnalysis.length > 0 && (
                    <div className="pt-3 border-t border-slate-800/80">
                      <div className="text-xs font-bold text-slate-400 mb-2">
                        Por que os distratores estão incorretos:
                      </div>
                      <div className="space-y-1.5">
                        {currentQuestion.distractorAnalysis.map((d) => (
                          <div key={d.letter} className="text-xs text-slate-400 flex items-start gap-2">
                            <span className="font-bold text-rose-400 min-w-[20px]">[{d.letter}]:</span>
                            <span>{d.whyWrong}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dica da Cesgranrio */}
                  {currentQuestion.cesgranrioTip && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="font-bold">Dica de Prova Cesgranrio: </span>
                        <span>{currentQuestion.cesgranrioTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">Nenhuma questão encontrada com os filtros atuais.</p>
              <p className="text-xs text-slate-500">Tente redefinir a busca ou gerar novas questões com IA.</p>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Answer Sheet & Exam Results & AI Tool */}
        <div className="space-y-4">
          
          {/* Card: Cartão-Resposta Interativo */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" /> Cartão-Resposta
              </h3>
              <span className="text-xs text-slate-400 font-semibold">
                {answeredCount}/{filteredQuestions.length} respondidas
              </span>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredQuestions.map((q, idx) => {
                const answer = selectedAnswers[q.id];
                const isCurrent = idx === currentIndex;
                const isCorrect = answer === q.correctAnswer;

                let btnClass = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700';

                if (examSubmitted) {
                  if (isCorrect) {
                    btnClass = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                  } else if (answer) {
                    btnClass = 'bg-rose-600 text-white border-rose-500 font-bold';
                  } else {
                    btnClass = 'bg-slate-950 text-slate-600 border-slate-900';
                  }
                } else if (answer) {
                  btnClass = 'bg-emerald-950 text-emerald-300 border-emerald-500 font-bold';
                }

                if (isCurrent) {
                  btnClass += ' ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900';
                }

                return (
                  <button
                    key={q.id}
                    id={`matrix-btn-${idx}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center transition-all ${btnClass}`}
                  >
                    <span>{idx + 1}</span>
                    {answer && <span className="text-[9px] opacity-90">{answer}</span>}
                  </button>
                );
              })}
            </div>

            {/* Submit / Finish Button */}
            {!examSubmitted ? (
              <button
                id="submit-exam-btn"
                onClick={handleSubmitExam}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 transition flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Finalizar e Corrigir Simulado</span>
              </button>
            ) : (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">
                    {scorePercent}%
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    {correctCount} de {filteredQuestions.length} acertos
                  </div>
                  <div className="mt-2 text-xs font-bold px-2 py-1 rounded bg-slate-900 text-emerald-400 border border-slate-800">
                    {scorePercent >= 70 ? '🎉 Aprovado no Ponto de Corte Transpetro' : '⚠️ Abaixo da Nota de Corte (~70%)'}
                  </div>
                </div>

                <button
                  onClick={handleResetExam}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Refazer Simulado
                </button>
              </div>
            )}
          </div>

          {/* AI Generator Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Gerador Customizado com IA (Gemini 3.7)
            </h4>
            <p className="text-[11px] text-slate-400">
              Gere pacotes ilimitados de questões inéditas para qualquer tópico do edital com justificativas completas.
            </p>
            
            <div className="space-y-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tópico do Edital:</label>
                <select
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Machine Learning">Machine Learning & Deep Learning (XGBoost, SVM, CNNs, Transformers)</option>
                  <option value="Estatística e Probabilidade">Estatística & Inferência (Gauss-Markov, Bayes, ANOVA, Hipóteses)</option>
                  <option value="Big Data e SQL Avançado">Big Data, SQL & Apache Spark (Window Functions, Delta Lake, Joins)</option>
                  <option value="Python para Dados e MLOps">Python, MLOps, Data Drift & SHAP</option>
                  <option value="Governança de Dados e LGPD">Governança, DAMA DMBOK & LGPD (Art. 7º/11)</option>
                  <option value="Língua Portuguesa Cesgranrio">Língua Portuguesa Cesgranrio (Crase, Regência, Concordância)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Contexto Especializado:</label>
                <input
                  type="text"
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  placeholder="Ex: Transpetro - telemetria de dutos, sensores de pressão, petroleiros"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Dificuldade:</label>
                  <select
                    value={aiDifficulty}
                    onChange={(e) => setAiDifficulty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Médio">Nível Médio</option>
                    <option value="Difícil">Nível Difícil</option>
                    <option value="Muito Difícil">Nível Muito Difícil (Pegadinha)</option>
                  </select>
                </div>

                <div className="w-24">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Qtd:</label>
                  <select
                    value={aiCount}
                    onChange={(e) => setAiCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value={1}>1 Questão</option>
                    <option value={3}>3 Questões</option>
                    <option value={5}>5 Questões</option>
                    <option value={10}>10 Questões</option>
                  </select>
                </div>
              </div>

              <button
                id="generate-batch-ai-btn"
                onClick={handleGenerateQuestionsWithAI}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Gerando Questões Inéditas...' : 'Gerar e Inserir no Simulado'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" /> Importar Banco de Questões (JSON)
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Cole abaixo uma lista de questões em formato JSON compatível para injetar diretamente no seu simulador.
            </p>

            <textarea
              rows={8}
              value={rawImportJson}
              onChange={(e) => setRawImportJson(e.target.value)}
              placeholder={`[
  {
    "statement": "Enunciado da questão...",
    "topic": "Machine Learning",
    "subtopic": "Gradient Boosting",
    "difficulty": "Difícil",
    "options": [
      { "letter": "A", "text": "Opção A..." },
      { "letter": "B", "text": "Opção B..." },
      { "letter": "C", "text": "Opção C..." },
      { "letter": "D", "text": "Opção D..." },
      { "letter": "E", "text": "Opção E..." }
    ],
    "correctAnswer": "A",
    "explanationCorrect": "Justificativa detalhada..."
  }
]`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />

            {importError && (
              <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleImportJson}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
              >
                Importar Questões
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
