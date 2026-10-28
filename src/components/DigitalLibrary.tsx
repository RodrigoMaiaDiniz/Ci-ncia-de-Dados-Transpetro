import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Sparkles, 
  ArrowLeft, 
  HelpCircle, 
  X, 
  Share2, 
  Bookmark, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Square,
  RotateCcw,
  FastForward,
  Headphones,
  Radio,
  Sliders,
  Award,
  Cpu,
  Binary,
  Compass,
  Sigma,
  Table,
  Flame,
  Server,
  Database,
  ShieldCheck,
  Scale,
  MessageSquareText,
  Boxes,
  Network,
  Languages,
  BookMarked,
  Maximize2,
  Minimize2,
  AlignLeft,
  Columns,
  ListMusic,
  ChevronDown,
  ChevronUp,
  Activity
} from 'lucide-react';
import { ALL_DIGITAL_BOOKS, DIGITAL_BOOKS_STATS } from '../data/digitalBooks';
import { DigitalBook, DigitalBookChapter } from '../types';
import { speechService } from '../services/speechService';
import { cleanCesgranrioExamNotation } from '../utils/mathNotation';

// Helper de renderização de markdown com formatação de código Python para provas Petrobras/Transpetro
const formatDigitalBookMarkdown = (content: string): string => {
  const clean = cleanCesgranrioExamNotation(content);
  return clean
    .replace(/```python\n([\s\S]*?)```/gim, '<div class="my-5 rounded-2xl border border-emerald-500/30 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-emerald-300 shadow-xl overflow-hidden"><div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-mono tracking-wide"><span>🐍 PYTHON / NUMPY (PADRÃO PROVA PETROBRAS & TRANSPETRO)</span><span class="text-emerald-400 font-bold">CIÊNCIA DE DADOS</span></div><pre class="overflow-x-auto leading-relaxed text-emerald-200 selection:bg-emerald-900">$1</pre></div>')
    .replace(/```sql\n([\s\S]*?)```/gim, '<div class="my-5 rounded-2xl border border-cyan-500/30 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-cyan-300 shadow-xl overflow-hidden"><div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-mono tracking-wide"><span>⚡ SQL ANALÍTICO (WINDOW FUNCTIONS & CTEs)</span><span class="text-cyan-400 font-bold">BANCO DE DADOS</span></div><pre class="overflow-x-auto leading-relaxed text-cyan-200 selection:bg-cyan-900">$1</pre></div>')
    .replace(/```([\s\S]*?)```/gim, '<div class="my-5 rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-300 shadow-xl overflow-hidden"><pre class="overflow-x-auto leading-relaxed">$1</pre></div>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl sm:text-2xl font-bold text-slate-100 mt-8 mb-4 pb-2 border-b border-slate-800">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg sm:text-xl font-bold text-emerald-300 mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-emerald-300 font-bold">$1</strong>')
    .replace(/`([^`]+)`/gim, '<code class="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs font-semibold">$1</code>');
};

interface DigitalLibraryProps {
  onTrainTopicWithAI: (topicName: string) => void;
  onOpenAudioTab?: () => void;
}

export const DigitalLibrary: React.FC<DigitalLibraryProps> = ({ 
  onTrainTopicWithAI,
  onOpenAudioTab 
}) => {
  const [selectedBook, setSelectedBook] = useState<DigitalBook | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [selectedBlockFilter, setSelectedBlockFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuestionAnswers, setSelectedQuestionAnswers] = useState<Record<string, string>>({});
  const [showQuestionExplanation, setShowQuestionExplanation] = useState<Record<string, boolean>>({});

  // Full-screen Reader Maximization State
  const [isReaderMaximized, setIsReaderMaximized] = useState<boolean>(false);
  const [readerTextSize, setReaderTextSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readerWidthMode, setReaderWidthMode] = useState<'reading' | 'full'>('reading');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isReaderMaximized) {
        setIsReaderMaximized(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReaderMaximized]);

  const [bookmarkedChapters, setBookmarkedChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tp_bookmarked_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (chapterId: string) => {
    setBookmarkedChapters(prev => {
      const exists = prev.includes(chapterId);
      const next = exists ? prev.filter(id => id !== chapterId) : [...prev, chapterId];
      localStorage.setItem('tp_bookmarked_chapters', JSON.stringify(next));
      return next;
    });
  };

  const filteredBooks = useMemo(() => {
    return ALL_DIGITAL_BOOKS.filter(book => {
      const matchesBlock = selectedBlockFilter === 'Todos' || book.block === selectedBlockFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesBlock;

      const matchesQuery = 
        book.title.toLowerCase().includes(q) ||
        book.subtitle.toLowerCase().includes(q) ||
        book.overview.toLowerCase().includes(q) ||
        book.itemCode.toLowerCase().includes(q) ||
        book.officialEditalTopics.some(t => t.toLowerCase().includes(q)) ||
        book.chapters.some(c => c.title.toLowerCase().includes(q) || c.contentMarkdown.toLowerCase().includes(q));

      return matchesBlock && matchesQuery;
    });
  }, [selectedBlockFilter, searchQuery]);

  const currentChapter = selectedBook ? selectedBook.chapters[activeChapterIndex] : null;

  // Audio Text Reader State
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isAudioPaused, setIsAudioPaused] = useState<boolean>(false);
  const [audioScope, setAudioScope] = useState<'full' | 'summary' | 'theory'>('theory');
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [currentSentenceText, setCurrentSentenceText] = useState<string>('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [totalSentences, setTotalSentences] = useState<number>(0);
  const [chapterAudioSentences, setChapterAudioSentences] = useState<string[]>([]);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [preferredEngine, setPreferredEngine] = useState<'auto' | 'ai-neural' | 'browser'>('auto');
  const [activeEngine, setActiveEngine] = useState<'browser' | 'ai-neural'>('browser');
  const [showSentenceDrawer, setShowSentenceDrawer] = useState<boolean>(false);
  const [readerViewMode, setReaderViewMode] = useState<'karaoke' | 'formatted'>('karaoke');

  // Roteiro de leitura fiel ao texto do livro
  const getChapterSpeechText = (chapter: DigitalBookChapter, scope: 'full' | 'summary' | 'theory') => {
    if (scope === 'summary') {
      const takeaways = chapter.keyTakeaways.join('. ');
      const traps = chapter.cesgranrioTraps.join('. ');
      return `Resumo Executivo do Capítulo: ${chapter.summary}. Conceitos essenciais: ${takeaways}. Pegadinhas da banca Cesgranrio: ${traps}.`;
    }
    if (scope === 'theory') {
      return chapter.contentMarkdown;
    }
    // full mode
    const takeaways = chapter.keyTakeaways.join('. ');
    const traps = chapter.cesgranrioTraps.join('. ');
    const app = chapter.transpetroApplication ? `Aplicação Prática: ${chapter.transpetroApplication}.` : '';
    return `${chapter.title}. ${chapter.summary}. ${chapter.contentMarkdown}. Conceitos-chave: ${takeaways}. Pegadinhas da banca: ${traps}. ${app}`;
  };

  // Lista determinística de sentenças do capítulo para sincronização visual 1:1 com o áudio
  const currentChapterSentences = useMemo(() => {
    if (!currentChapter) return [];
    const textToSplit = getChapterSpeechText(currentChapter, audioScope);
    return speechService.splitIntoSentences(textToSplit);
  }, [currentChapter?.id, audioScope]);

  // Subscribe to central speechService
  useEffect(() => {
    speechService.initVoices();
    const unsubscribe = speechService.subscribe((state) => {
      if (state.availableVoices && state.availableVoices.length > 0) {
        setAvailableVoices(state.availableVoices);
      }
      if (state.selectedVoice) {
        setSelectedVoice(state.selectedVoice);
      }
      setPreferredEngine(state.preferredEngine);
      setActiveEngine(state.activeEngine);

      if (state.activeId && state.activeId.startsWith('book-chapter-')) {
        setIsAudioPlaying(state.isPlaying);
        setIsAudioPaused(state.isPaused);
        setAudioProgress(state.progressPercent);
        setCurrentSentenceIndex(state.currentSentenceIndex);
        setTotalSentences(state.totalSentences);
        setCurrentSentenceText(state.currentSentenceText);
        if (state.currentSentences && state.currentSentences.length > 0) {
          setChapterAudioSentences(state.currentSentences);
        }
      } else if (!state.isPlaying) {
        setIsAudioPlaying(false);
        setIsAudioPaused(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Stop audio on chapter change or book unselect
  useEffect(() => {
    if (isAudioPlaying) {
      speechService.stop();
      setIsAudioPlaying(false);
      setIsAudioPaused(false);
      setAudioProgress(0);
      setCurrentSentenceText('');
      setChapterAudioSentences([]);
    }
  }, [selectedBook?.id, activeChapterIndex]);

  // Auto-scroll highlighted sentence inside reader (tanto modo normal quanto maximizado)
  useEffect(() => {
    if (isAudioPlaying) {
      const activeEl = document.getElementById(`book-sentence-${currentSentenceIndex}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const activeMaxEl = document.getElementById(`max-book-sentence-${currentSentenceIndex}`);
      if (activeMaxEl) {
        activeMaxEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentSentenceIndex, isAudioPlaying, readerViewMode, isReaderMaximized]);

  const handleToggleAudio = (scope = audioScope) => {
    if (!currentChapter || !selectedBook) return;

    if (isAudioPlaying && isAudioPaused) {
      speechService.resume();
      setIsAudioPaused(false);
      return;
    }

    if (isAudioPlaying && !isAudioPaused) {
      speechService.pause();
      setIsAudioPaused(true);
      return;
    }

    const textToSpeak = getChapterSpeechText(currentChapter, scope);
    const sentences = speechService.splitIntoSentences(textToSpeak);
    setChapterAudioSentences(sentences);
    setTotalSentences(sentences.length);
    setCurrentSentenceIndex(0);
    setCurrentSentenceText(sentences[0] || '');

    const utteranceId = `book-chapter-${selectedBook.id}-${currentChapter.id}-${scope}`;

    speechService.play(textToSpeak, {
      id: utteranceId,
      rate: audioSpeed,
      volume: 1.0,
      voice: selectedVoice,
      preferredEngine: preferredEngine,
      onStart: () => {
        setIsAudioPlaying(true);
        setIsAudioPaused(false);
      },
      onPause: () => setIsAudioPaused(true),
      onResume: () => setIsAudioPaused(false),
      onEnd: () => {
        setIsAudioPlaying(false);
        setIsAudioPaused(false);
        setAudioProgress(100);
      },
      onError: () => {
        setIsAudioPlaying(false);
        setIsAudioPaused(false);
      },
      onProgress: (percent) => setAudioProgress(percent),
      onSentenceChange: (idx, total, sentence) => {
        setCurrentSentenceIndex(idx);
        setTotalSentences(total);
        setCurrentSentenceText(sentence);
      }
    }, 0);
  };

  const handleStopAudio = () => {
    speechService.stop();
    setIsAudioPlaying(false);
    setIsAudioPaused(false);
    setAudioProgress(0);
    setCurrentSentenceText('');
  };

  const handleChangeRate = (rate: number) => {
    setAudioSpeed(rate);
    speechService.setRate(rate);
  };

  const handleVoiceChange = (voiceName: string) => {
    const v = availableVoices.find(item => item.name === voiceName) || null;
    setSelectedVoice(v);
    speechService.setVoice(v);
  };

  const handleEngineChange = (engine: 'auto' | 'ai-neural' | 'browser') => {
    setPreferredEngine(engine);
    speechService.setPreferredEngine(engine);
  };

  const handleJumpSentence = (delta: number) => {
    if (totalSentences <= 0) return;
    const target = Math.max(0, Math.min(totalSentences - 1, currentSentenceIndex + delta));
    handleJumpToSentenceIndex(target);
  };

  const handleJumpToSentenceIndex = (index: number) => {
    if (!currentChapter || !selectedBook) return;

    const textToSpeak = getChapterSpeechText(currentChapter, audioScope);
    const sentences = speechService.splitIntoSentences(textToSpeak);
    setChapterAudioSentences(sentences);
    setTotalSentences(sentences.length);

    const safeIndex = Math.max(0, Math.min(sentences.length - 1, index));
    setCurrentSentenceIndex(safeIndex);
    setCurrentSentenceText(sentences[safeIndex] || '');

    // Se já está reproduzindo (mesmo que pausado), faz o salto imediato e retoma
    if (isAudioPlaying) {
      setIsAudioPaused(false);
      speechService.jumpToSentence(safeIndex);
      return;
    }

    // Se está pausado ou parado, dispara a reprodução com todos os callbacks e listeners ativos
    const utteranceId = `book-chapter-${selectedBook.id}-${currentChapter.id}-${audioScope}`;

    speechService.play(textToSpeak, {
      id: utteranceId,
      rate: audioSpeed,
      volume: 1.0,
      voice: selectedVoice,
      preferredEngine: preferredEngine,
      onStart: () => {
        setIsAudioPlaying(true);
        setIsAudioPaused(false);
      },
      onPause: () => setIsAudioPaused(true),
      onResume: () => setIsAudioPaused(false),
      onEnd: () => {
        setIsAudioPlaying(false);
        setIsAudioPaused(false);
        setAudioProgress(100);
      },
      onError: () => {
        setIsAudioPlaying(false);
        setIsAudioPaused(false);
      },
      onProgress: (percent) => setAudioProgress(percent),
      onSentenceChange: (idx, total, sentence) => {
        setCurrentSentenceIndex(idx);
        setTotalSentences(total);
        setCurrentSentenceText(sentence);
      }
    }, safeIndex);
  };

  const renderAudioReaderBar = (isInsideMaximized = false) => {
    if (!currentChapter || !selectedBook) return null;

    return (
      <div 
        id={isInsideMaximized ? "audio-reader-bar-maximized" : "audio-reader-bar"}
        className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-4 sm:p-5 rounded-3xl shadow-xl space-y-4"
      >
        {/* Top Header of the Player */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl transition ${
              isAudioPlaying && !isAudioPaused 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">Áudio Leitor do Texto</span>
                {isAudioPlaying && !isAudioPaused && (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-pulse delay-75" />
                    <span className="w-1.5 h-2 bg-emerald-400 rounded-full animate-pulse delay-150" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest ml-1">Lendo...</span>
                  </div>
                )}
                {isAudioPlaying && isAudioPaused && (
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">Pausado</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {isAudioPlaying 
                  ? `Sentença ${currentSentenceIndex + 1} de ${totalSentences || 1} • ${Math.round(audioProgress)}% concluído`
                  : 'Voz sintetizada com acompanhamento em tempo real e controle de velocidade'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Scope Mode Selector */}
            <div className="flex items-center bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs gap-1">
              <span className="text-[10px] font-bold text-slate-500 px-1.5 hidden md:inline">Trecho:</span>
              {[
                { id: 'theory', label: 'Texto do Livro' },
                { id: 'summary', label: 'Resumo & Destaques' },
                { id: 'full', label: 'Capítulo Completo' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    const nextScope = s.id as any;
                    setAudioScope(nextScope);
                    if (isAudioPlaying) {
                      handleStopAudio();
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    audioScope === s.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Visual Reader Mode Toggle */}
            <div className="flex items-center bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs gap-1">
              <span className="text-[10px] font-bold text-slate-500 px-1.5 hidden md:inline">Visão:</span>
              <button
                type="button"
                onClick={() => setReaderViewMode('karaoke')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  readerViewMode === 'karaoke'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Modo interativo com acompanhamento sentença a sentença"
              >
                <Activity className="w-3 h-3 text-emerald-300" />
                <span>Karaokê</span>
              </button>
              <button
                type="button"
                onClick={() => setReaderViewMode('formatted')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  readerViewMode === 'formatted'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Modo livro tradicional formatado"
              >
                <BookOpen className="w-3 h-3 text-cyan-300" />
                <span>Formatado</span>
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs gap-1">
              <span className="text-[10px] font-bold text-slate-500 px-1.5 hidden sm:inline">Velocidade:</span>
              {[0.8, 1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => handleChangeRate(rate)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                    audioSpeed === rate
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
            {/* Voice Engine & Voice Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Engine */}
              <div className="flex items-center bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs gap-1">
                <span className="text-[10px] font-bold text-slate-500 px-1 hidden md:inline">Motor:</span>
                <select
                  value={preferredEngine}
                  onChange={(e) => handleEngineChange(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700/80 text-slate-200 text-[11px] rounded-lg px-2 py-1 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                  title="Selecione o motor de sintetização de voz"
                >
                  <option value="auto">⚡ Auto (Otimizado)</option>
                  <option value="browser">🌐 Navegador (Web Speech)</option>
                  <option value="ai-neural">🎙️ Voz Neural Gemini</option>
                </select>
              </div>

              {/* Local Voice Selector if Browser Engine */}
              {preferredEngine !== 'ai-neural' && availableVoices.length > 0 && (
                <div className="flex items-center bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs gap-1">
                  <span className="text-[10px] font-bold text-slate-500 px-1 hidden md:inline">Voz:</span>
                  <select
                    value={selectedVoice?.name || ''}
                    onChange={(e) => handleVoiceChange(e.target.value)}
                    className="bg-slate-900 border border-slate-700/80 text-slate-200 text-[11px] rounded-lg px-2 py-1 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer max-w-[140px] truncate"
                    title="Selecione o timbre da voz sintetizada"
                  >
                    {availableVoices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name.slice(0, 20)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Toggle Sentence Drawer */}
              <button
                type="button"
                onClick={() => setShowSentenceDrawer(!showSentenceDrawer)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition shadow-sm ${
                  showSentenceDrawer
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
                }`}
                title="Mostrar/ocultar frases sincronizadas e pular para qualquer ponto do texto"
              >
                <ListMusic className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Frases ({chapterAudioSentences.length || totalSentences || 0})</span>
                {showSentenceDrawer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Playback Controls & Progress Bar */}
        <div className="space-y-3 pt-1">
          {/* Progress Bar */}
          <div 
            onClick={(e) => {
              if (totalSentences > 0) {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                const targetIdx = Math.floor(ratio * totalSentences);
                handleJumpToSentenceIndex(targetIdx);
              }
            }}
            className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80 relative cursor-pointer group"
            title="Clique na barra para avançar ou retroceder a leitura"
          >
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full group-hover:brightness-110"
              style={{ width: `${Math.max(0, Math.min(100, audioProgress))}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Main Play / Pause Button */}
              <button
                type="button"
                id={isInsideMaximized ? "btn-play-audio-maximized" : "btn-play-audio-chapter"}
                onClick={() => handleToggleAudio()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg active:scale-95 ${
                  isAudioPlaying && !isAudioPaused
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : isAudioPlaying && isAudioPaused
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                {isAudioPlaying && !isAudioPaused ? (
                  <>
                    <Pause className="w-4 h-4 fill-slate-950" />
                    <span>Pausar Leitura</span>
                  </>
                ) : isAudioPlaying && isAudioPaused ? (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Continuar Leitura</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Ouvir Leitura do Texto</span>
                  </>
                )}
              </button>

              {/* Stop Button */}
              {isAudioPlaying && (
                <button
                  type="button"
                  onClick={handleStopAudio}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700"
                  title="Parar leitura e reiniciar"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Parar</span>
                </button>
              )}

              {/* Step Sentences */}
              {isAudioPlaying && (
                <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleJumpSentence(-1)}
                    disabled={currentSentenceIndex <= 0}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 transition rounded hover:bg-slate-800"
                    title="Voltar 1 sentença"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-slate-400 px-1.5 font-mono font-bold">
                    {currentSentenceIndex + 1}/{totalSentences || 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleJumpSentence(1)}
                    disabled={currentSentenceIndex >= totalSentences - 1}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 transition rounded hover:bg-slate-800"
                    title="Avançar 1 sentença"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Indicator of Current Section */}
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="text-[11px] text-emerald-400 font-semibold">
                Capítulo {currentChapter.chapterNumber}
              </span>
              <span>•</span>
              <span className="text-[11px] text-slate-400">
                {currentChapter.readTimeEstimate}
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Current Sentence Reader Highlight */}
        {isAudioPlaying && currentSentenceText && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/95 border border-emerald-500/40 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                <Volume2 className="w-4 h-4 animate-pulse text-emerald-400" />
                <span>Leitura em Voz Alta (Sentença {currentSentenceIndex + 1} de {totalSentences}):</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono border border-emerald-500/20">
                {Math.round(audioProgress)}%
              </span>
            </div>
            <p className="text-white font-medium italic text-sm sm:text-base leading-relaxed bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/20">
              &ldquo;{currentSentenceText}&rdquo;
            </p>
          </div>
        )}

        {/* Interactive Sentence Drawer (Karaokê Interativo do Capítulo) */}
        {showSentenceDrawer && (
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Activity className="w-3.5 h-3.5" />
                <span>Navegação Interativa por Sentenças (Clique para Ouvir)</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Total: {chapterAudioSentences.length || totalSentences} frases
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {(chapterAudioSentences.length > 0 ? chapterAudioSentences : [currentSentenceText || 'Inicie a leitura para carregar as sentenças']).map((sent, sIdx) => {
                const isCurrent = isAudioPlaying && sIdx === currentSentenceIndex;
                return (
                  <div
                    key={sIdx}
                    id={`book-sentence-${sIdx}`}
                    onClick={() => handleJumpToSentenceIndex(sIdx)}
                    className={`p-2.5 rounded-xl text-xs transition cursor-pointer flex items-start gap-2.5 border ${
                      isCurrent
                        ? 'bg-emerald-950/60 border-emerald-500 text-white font-medium shadow-md shadow-emerald-950/50'
                        : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] shrink-0 font-bold ${
                      isCurrent ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {sIdx + 1}
                    </span>
                    <p className="leading-relaxed select-none">
                      {sent}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleSelectOption = (questionKey: string, letter: string) => {
    setSelectedQuestionAnswers(prev => ({
      ...prev,
      [questionKey]: letter
    }));
    setShowQuestionExplanation(prev => ({
      ...prev,
      [questionKey]: true
    }));
  };

  const renderPracticeQuestions = (isMaximized = false) => {
    if (!currentChapter) return null;
    const questions = (currentChapter.practiceQuestions && currentChapter.practiceQuestions.length > 0)
      ? currentChapter.practiceQuestions
      : (selectedBook?.practiceQuestions || []);

    if (!questions || questions.length === 0) return null;

    return (
      <div className={`p-6 sm:p-8 rounded-3xl space-y-6 ${
        isMaximized 
          ? 'mt-10 bg-slate-900/90 border border-slate-800 shadow-2xl' 
          : 'bg-slate-900/80 border border-slate-800'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">
              Exercícios Práticos do Capítulo (Padrão Cesgranrio)
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            {questions.length} {questions.length === 1 ? 'questão' : 'questões'}
          </span>
        </div>

        {questions.map((q, qIndex) => {
          const qKey = `${currentChapter.id}-q-${qIndex}`;
          const selected = selectedQuestionAnswers[qKey];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correctLetter;

          return (
            <div key={qKey} className="bg-slate-950/60 border border-slate-800/80 p-5 sm:p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="font-semibold text-emerald-400">Questão #{q.questionNumber || qIndex + 1}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Cesgranrio / Petrobras</span>
              </div>

              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed whitespace-pre-line">
                {q.statement}
              </p>

              {q.codeSnippet && (
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-300 overflow-x-auto">
                  <pre>{q.codeSnippet}</pre>
                </div>
              )}

              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const letter = typeof opt === 'string' ? opt.charAt(0) : opt.letter;
                  const optText = typeof opt === 'string' ? (opt.charAt(1) === ')' ? opt.substring(3).trim() : opt) : opt.text;
                  const isThisOptionSelected = selected === letter;
                  const isThisTheCorrectAnswer = letter === q.correctLetter;

                  let optionStyle = 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300';
                  if (isAnswered) {
                    if (isThisTheCorrectAnswer) {
                      optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isThisOptionSelected && !isCorrect) {
                      optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    } else {
                      optionStyle = 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      id={`btn-book-${currentChapter.id}-q-${qIndex}-opt-${letter}${isMaximized ? '-max' : ''}`}
                      onClick={() => handleSelectOption(qKey, letter)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isThisTheCorrectAnswer && isAnswered
                          ? 'bg-emerald-500 text-slate-950'
                          : isThisOptionSelected && !isCorrect
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        {letter}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{optText}</span>
                    </button>
                  );
                })}
              </div>

              {showQuestionExplanation[qKey] && (
                <div className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 animate-fadeIn ${
                  isCorrect ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Excelente! Resposta Correta (Letra {q.correctLetter})</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span>Atenção: A alternativa correta é a Letra {q.correctLetter}</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
                    {q.explanation}
                  </p>
                  {q.cesgranrioTip && (
                    <div className="pt-2 border-t border-slate-800/60 text-xs text-amber-300 flex items-start gap-1.5 font-medium">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Dica de Gabarito: {q.cesgranrioTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const getIconComponent = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Binary': return Binary;
      case 'Compass': return Compass;
      case 'Sigma': return Sigma;
      case 'Table': return Table;
      case 'Flame': return Flame;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'ShieldCheck': return ShieldCheck;
      case 'Scale': return Scale;
      case 'MessageSquareText': return MessageSquareText;
      case 'Boxes': return Boxes;
      case 'Network': return Network;
      case 'Languages': return Languages;
      default: return BookOpen;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Reader Mode View */}
      {selectedBook && currentChapter ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Bar inside Reader */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                id="btn-back-to-library"
                onClick={() => setSelectedBook(null)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700/60"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar à Biblioteca</span>
              </button>
              <div className="h-5 w-px bg-slate-800 hidden sm:block" />
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{selectedBook.block} • {selectedBook.itemCode}</span>
                <h2 className="text-base font-bold text-white line-clamp-1">{selectedBook.title}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(currentChapter.id)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  bookmarkedChapters.includes(currentChapter.id)
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
                title="Favoritar este capítulo"
              >
                <Bookmark className={`w-4 h-4 ${bookmarkedChapters.includes(currentChapter.id) ? 'fill-amber-400' : ''}`} />
                <span className="hidden sm:inline">
                  {bookmarkedChapters.includes(currentChapter.id) ? 'Favoritado' : 'Favoritar'}
                </span>
              </button>

              <button
                id="btn-train-current-topic"
                onClick={() => onTrainTopicWithAI(`${selectedBook.title} - ${currentChapter.title}`)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition-all border border-emerald-400/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Treinar com Agente IA</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-emerald-400" />
                    Capítulos da Obra
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                    {activeChapterIndex + 1} de {selectedBook.chapters.length}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {selectedBook.chapters.map((chapter, idx) => {
                    const isCurrent = idx === activeChapterIndex;
                    const isBookmarked = bookmarkedChapters.includes(chapter.id);
                    return (
                      <button
                        key={chapter.id}
                        id={`btn-chapter-${chapter.id}`}
                        onClick={() => {
                          setActiveChapterIndex(idx);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 border ${
                          isCurrent
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-white font-medium shadow-sm'
                            : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isCurrent ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                              Cap. {chapter.chapterNumber}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {chapter.readTimeEstimate}
                            </span>
                          </div>
                          <p className={`text-xs line-clamp-2 leading-relaxed ${isCurrent ? 'text-slate-100 font-semibold' : 'text-slate-300'}`}>
                            {chapter.title}
                          </p>
                        </div>
                        {isBookmarked && (
                          <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Edital Topics Quick Tagging */}
                <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Itens Oficiais do Edital
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedBook.officialEditalTopics.slice(0, 4).map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400 text-[11px] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Chapter Content Stream */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Header of Chapter */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <span>Capítulo {currentChapter.chapterNumber}</span>
                    <span>•</span>
                    <span>{currentChapter.readTimeEstimate} de leitura profunda</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quick Audio Play Button in Header */}
                    <button
                      type="button"
                      id="btn-quick-audio-header"
                      onClick={() => handleToggleAudio()}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition active:scale-95 shadow-sm ${
                        isAudioPlaying && !isAudioPaused
                          ? 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-300'
                          : isAudioPlaying && isAudioPaused
                            ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40 text-emerald-300'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                      }`}
                      title="Ouvir leitura em áudio do texto"
                    >
                      {isAudioPlaying && !isAudioPaused ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-amber-400" />
                          <span>Pausar Áudio</span>
                        </>
                      ) : isAudioPlaying && isAudioPaused ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-emerald-400" />
                          <span>Retomar Áudio</span>
                        </>
                      ) : (
                        <>
                          <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Ouvir Texto</span>
                        </>
                      )}
                    </button>

                    {/* Maximize Chapter Reader Button */}
                    <button
                      type="button"
                      id="btn-maximize-book-reader"
                      onClick={() => setIsReaderMaximized(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition active:scale-95 shadow-sm"
                      title="Maximizar leitura do texto na tela inteira com controle tipográfico"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Maximizar Leitura</span>
                    </button>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                  {currentChapter.title}
                </h1>
                <p className="text-base text-slate-300 font-medium leading-relaxed max-w-3xl">
                  {currentChapter.subtitle}
                </p>

                {/* Summary Pill */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                  <span className="font-bold text-emerald-300">Resumo Executivo: </span>
                  {currentChapter.summary}
                </div>
              </div>

              {/* Audio Reader Bar in Standard View */}
              {renderAudioReaderBar(false)}

              {/* Main Text Content */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-10 rounded-3xl">
                {readerViewMode === 'karaoke' ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 gap-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span>Acompanhamento Guiado do Texto • Clique em Qualquer Frase para Iniciar ou Pular o Áudio</span>
                      </div>
                      <span className="font-mono text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400">
                        {isAudioPlaying 
                          ? `Frase ${currentSentenceIndex + 1} de ${(chapterAudioSentences.length || currentChapterSentences.length)}` 
                          : `${currentChapterSentences.length} frases`}
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {(chapterAudioSentences.length > 0 ? chapterAudioSentences : currentChapterSentences).map((sentence, sIdx) => {
                        const isCurrent = isAudioPlaying && sIdx === currentSentenceIndex;
                        return (
                          <div
                            key={sIdx}
                            id={`book-sentence-${sIdx}`}
                            onClick={() => handleJumpToSentenceIndex(sIdx)}
                            className={`p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-3 border ${
                              isCurrent
                                ? 'bg-emerald-950/70 border-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-500/50'
                                : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:border-slate-700'
                            }`}
                            title="Clique para ouvir a partir desta frase"
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] shrink-0 font-bold transition ${
                              isCurrent 
                                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' 
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {isCurrent ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : sIdx + 1}
                            </span>
                            <p className="flex-1 select-none">
                              {sentence}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {isAudioPlaying && currentSentenceText && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/50 shadow-xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                            <Volume2 className="w-4 h-4 animate-pulse" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-emerald-400">Lendo em voz alta agora (Frase {currentSentenceIndex + 1} de {totalSentences || chapterAudioSentences.length || currentChapterSentences.length}):</span>
                            <p className="text-sm text-white font-medium italic mt-0.5">&ldquo;{currentSentenceText}&rdquo;</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setReaderViewMode('karaoke')}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-sm"
                        >
                          Acompanhar Frase a Frase (Karaokê)
                        </button>
                      </div>
                    )}
                    <div 
                      className="whitespace-pre-line font-sans text-slate-300 text-base leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{
                        __html: formatDigitalBookMarkdown(currentChapter.contentMarkdown)
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Special Learning Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Key Takeaways */}
                <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Lightbulb className="w-5 h-5 text-emerald-400" />
                    <span>Conceitos Chave para Fixação (Must-Know)</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {currentChapter.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cesgranrio Traps */}
                <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span>Pegadinhas Clássicas da Banca Cesgranrio</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {currentChapter.cesgranrioTraps.map((trap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-amber-400 font-bold text-base">•</span>
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Transpetro Practical Application (if available) */}
              {currentChapter.transpetroApplication && (
                <div className="bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 border border-cyan-500/30 p-6 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>Aplicação Prática no Contexto Transpetro / Petrobras</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentChapter.transpetroApplication}
                  </p>
                </div>
              )}

              {/* Chapter Practice Questions */}
              {renderPracticeQuestions(false)}

              {/* Bottom Chapter Pagination Controls */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
                <button
                  disabled={activeChapterIndex === 0}
                  onClick={() => {
                    setActiveChapterIndex(prev => Math.max(0, prev - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Capítulo Anterior</span>
                </button>

                <span className="text-xs text-slate-400 font-medium">
                  {activeChapterIndex + 1} de {selectedBook.chapters.length}
                </span>

                <button
                  disabled={activeChapterIndex === selectedBook.chapters.length - 1}
                  onClick={() => {
                    setActiveChapterIndex(prev => Math.min(selectedBook.chapters.length - 1, prev + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:pointer-events-none text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <span>Próximo Capítulo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Full-Screen Maximized Chapter Reader */}
          {isReaderMaximized && (
            <div 
              id="maximized-book-reader-overlay"
              className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl flex flex-col animate-in fade-in duration-200 text-slate-100"
            >
              {/* Maximized Reader Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md shrink-0 shadow-lg">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    <span className="truncate max-w-xs">{selectedBook.title}</span>
                    <span>•</span>
                    <span>Capítulo {currentChapter.chapterNumber}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-xl">
                    {currentChapter.title}
                  </h2>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Font Size Selector */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
                    <span className="px-2 text-slate-400 text-[11px] font-medium hidden sm:inline">Fonte:</span>
                    {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setReaderTextSize(size)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition text-xs ${
                          readerTextSize === size
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title={`Ajustar fonte para ${size.toUpperCase()}`}
                      >
                        {size === 'sm' ? 'A-' : size === 'base' ? 'A' : size === 'lg' ? 'A+' : 'A++'}
                      </button>
                    ))}
                  </div>

                  {/* Width Mode Toggle */}
                  <button
                    type="button"
                    onClick={() => setReaderWidthMode(prev => prev === 'reading' ? 'full' : 'reading')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition"
                    title="Alternar entre largura confortável de leitura e tela inteira"
                  >
                    {readerWidthMode === 'reading' ? <AlignLeft className="w-3.5 h-3.5 text-cyan-400" /> : <Columns className="w-3.5 h-3.5 text-cyan-400" />}
                    <span className="hidden sm:inline">{readerWidthMode === 'reading' ? 'Modo Leitura' : 'Largura Total'}</span>
                  </button>

                  {/* Chapter Navigation inside Maximized Mode */}
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                    <button
                      type="button"
                      disabled={activeChapterIndex === 0}
                      onClick={() => setActiveChapterIndex(prev => Math.max(0, prev - 1))}
                      className="px-2.5 py-1 text-xs rounded-lg font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition"
                      title="Capítulo Anterior"
                    >
                      ← Anterior
                    </button>
                    <span className="text-[11px] text-slate-500 px-1">
                      {activeChapterIndex + 1}/{selectedBook.chapters.length}
                    </span>
                    <button
                      type="button"
                      disabled={activeChapterIndex === selectedBook.chapters.length - 1}
                      onClick={() => setActiveChapterIndex(prev => Math.min(selectedBook.chapters.length - 1, prev + 1))}
                      className="px-2.5 py-1 text-xs rounded-lg font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition"
                      title="Próximo Capítulo"
                    >
                      Próximo →
                    </button>
                  </div>

                  {/* Audio Toggle in Maximized Top Bar */}
                  <button
                    type="button"
                    id="btn-maximized-audio-toggle"
                    onClick={() => handleToggleAudio()}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition active:scale-95 shadow-sm border ${
                      isAudioPlaying && !isAudioPaused
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20'
                        : isAudioPlaying && isAudioPaused
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/20'
                          : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border-emerald-500/30'
                    }`}
                    title="Ouvir leitura em áudio com síntese de voz"
                  >
                    {isAudioPlaying && !isAudioPaused ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Pausar</span>
                      </>
                    ) : isAudioPlaying && isAudioPaused ? (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Continuar</span>
                      </>
                    ) : (
                      <>
                        <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ouvir Texto</span>
                      </>
                    )}
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setIsReaderMaximized(false)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition active:scale-95 shadow-sm"
                    title="Minimizar tela (ou pressione Esc)"
                  >
                    <Minimize2 className="w-4 h-4" />
                    <span>Minimizar</span>
                    <span className="text-[10px] opacity-70 bg-rose-950 px-1 rounded hidden sm:inline">Esc</span>
                  </button>
                </div>
              </div>

              {/* Maximized Scrollable Reading Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
                <div className={`transition-all duration-200 ${readerWidthMode === 'reading' ? 'max-w-4xl mx-auto' : 'w-full'}`}>
                  {/* Chapter Banner inside reader */}
                  <div className="mb-8 pb-6 border-b border-slate-800">
                    <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                      {currentChapter.title}
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                      {currentChapter.subtitle}
                    </p>
                    <div className="mt-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 leading-relaxed">
                      <span className="font-bold text-emerald-300">Resumo Executivo: </span>
                      {currentChapter.summary}
                    </div>
                  </div>

                  {/* Audio Reader Bar inside Maximized View */}
                  <div className="mb-8">
                    {renderAudioReaderBar(true)}
                  </div>

                  {/* Chapter Body with adjusted font size */}
                  <div className="bg-slate-900/40 border border-slate-800/80 p-6 sm:p-10 rounded-3xl">
                    {readerViewMode === 'karaoke' ? (
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 gap-2">
                          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                            <Activity className="w-4 h-4 text-emerald-400" />
                            <span>Leitura Guiada em Tela Cheia • Clique em Qualquer Frase para Iniciar</span>
                          </div>
                          <span className="font-mono text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400">
                            Frase {currentSentenceIndex + 1} de {(chapterAudioSentences.length || currentChapterSentences.length)}
                          </span>
                        </div>

                        <div className={`space-y-3 pt-2 ${
                          readerTextSize === 'sm' ? 'text-sm sm:text-base leading-relaxed' :
                          readerTextSize === 'base' ? 'text-base sm:text-lg leading-relaxed' :
                          readerTextSize === 'lg' ? 'text-lg sm:text-xl leading-relaxed' :
                          'text-xl sm:text-2xl leading-loose'
                        }`}>
                          {(chapterAudioSentences.length > 0 ? chapterAudioSentences : currentChapterSentences).map((sentence, sIdx) => {
                            const isCurrent = isAudioPlaying && sIdx === currentSentenceIndex;
                            return (
                              <div
                                key={sIdx}
                                id={`max-book-sentence-${sIdx}`}
                                onClick={() => handleJumpToSentenceIndex(sIdx)}
                                className={`p-4 rounded-2xl transition-all cursor-pointer flex items-start gap-3.5 border ${
                                  isCurrent
                                    ? 'bg-emerald-950/70 border-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-500/50'
                                    : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:border-slate-700'
                                }`}
                                title="Clique para ouvir a partir desta frase"
                              >
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 font-bold transition ${
                                  isCurrent 
                                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' 
                                    : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {isCurrent ? <Volume2 className="w-4 h-4 animate-pulse" /> : sIdx + 1}
                                </span>
                                <p className="flex-1 select-none">
                                  {sentence}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {isAudioPlaying && currentSentenceText && (
                          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/50 shadow-xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                                <Volume2 className="w-4 h-4 animate-pulse" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-emerald-400">Lendo em voz alta agora (Frase {currentSentenceIndex + 1} de {totalSentences || chapterAudioSentences.length || currentChapterSentences.length}):</span>
                                <p className="text-sm sm:text-base text-white font-medium italic mt-0.5">&ldquo;{currentSentenceText}&rdquo;</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setReaderViewMode('karaoke')}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-sm"
                            >
                              Acompanhar Frase a Frase (Karaokê)
                            </button>
                          </div>
                        )}
                        <div 
                          className={`whitespace-pre-line font-sans text-slate-300 leading-relaxed space-y-4 ${
                            readerTextSize === 'sm' ? 'text-sm sm:text-base leading-relaxed' :
                            readerTextSize === 'base' ? 'text-base sm:text-lg leading-relaxed' :
                            readerTextSize === 'lg' ? 'text-lg sm:text-xl leading-relaxed' :
                            'text-xl sm:text-2xl leading-loose'
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: formatDigitalBookMarkdown(currentChapter.contentMarkdown)
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Key Takeaways in Maximized Reader */}
                  <div className="mt-12 p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Lightbulb className="w-5 h-5 text-emerald-400" />
                      <span>Conceitos Chave para Fixação (Must-Know)</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {currentChapter.keyTakeaways.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chapter Practice Questions in Maximized Reader */}
                  {renderPracticeQuestions(true)}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Library Catalog View */
        <div className="space-y-8 animate-fadeIn">
          
          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-8 sm:p-10 shadow-2xl">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                Biblioteca Completa de Livros Digitais
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Manuais Teóricos de Todos os Tópicos do Edital Transpetro
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Obras didáticas e analíticas completas para cada bloco de conhecimentos do edital de Ciência de Dados (Banca Cesgranrio). Teoria aprofundada, demonstrações matemáticas, código em Python/SQL, pegadinhas e questões resolvidas.
              </p>

              {/* Stats Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-black text-white">{DIGITAL_BOOKS_STATS.totalBooks}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Livros Especializados</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">{DIGITAL_BOOKS_STATS.totalChapters}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Capítulos Detalhados</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-black text-cyan-400">~{DIGITAL_BOOKS_STATS.totalPagesEquivalent}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Páginas de Conteúdo</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Edital Cesgranrio</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-search-books"
                type="text"
                placeholder="Buscar por assunto, código (B1-01, B2-03) ou palavra..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Block Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { id: 'Todos', label: 'Todos' },
                { id: 'Conhecimentos Básicos', label: 'Básicos (Port/Ing)' },
                { id: 'Bloco I', label: 'Bloco I (ML & NLP)' },
                { id: 'Bloco II', label: 'Bloco II (Mat, Dados & Nuvem)' },
                { id: 'Bloco III', label: 'Bloco III (Gov & LGPD)' }
              ].map(block => (
                <button
                  key={block.id}
                  id={`filter-block-${block.id.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedBlockFilter(block.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    selectedBlockFilter === block.id
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-950'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {block.label}
                </button>
              ))}
            </div>
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => {
              const Icon = getIconComponent(book.iconName);
              return (
                <div
                  key={book.id}
                  id={`card-book-${book.id}`}
                  className="group flex flex-col justify-between bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {book.block} • {book.itemCode}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-800">
                        {book.badge}
                      </span>
                    </div>

                    {/* Book Icon & Title */}
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${book.themeGradient} text-white shadow-md shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {book.title}
                        </h2>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {book.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Overview snippet */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {book.overview}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        {book.chapters.length} Capítulos
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {book.readTimeEstimate}
                      </span>
                      <span>•</span>
                      <span>~{book.pagesEquivalent} págs</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 mt-4 border-t border-slate-800 flex items-center gap-2">
                    <button
                      id={`btn-open-book-${book.id}`}
                      onClick={() => {
                        setSelectedBook(book);
                        setActiveChapterIndex(0);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Abrir Livro Digital</span>
                    </button>

                    <button
                      id={`btn-train-book-${book.id}`}
                      onClick={() => onTrainTopicWithAI(book.title)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 transition-colors border border-slate-700"
                      title="Estudar este livro com o Agente Especialista IA"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">Nenhum livro encontrado</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Tente ajustar sua busca ou selecionar a categoria &quot;Todos&quot; para visualizar as 14 obras disponíveis.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBlockFilter('Todos');
                }}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
              >
                Limpar Filtros
              </button>
            </div>
          )}

        </div>
      )}

      {/* Sticky Floating Audio Player when listening & scrolling */}
      {isAudioPlaying && currentChapter && (
        <div 
          id="sticky-floating-audio-reader"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-950/95 border border-emerald-500/40 rounded-2xl px-4 py-3 shadow-2xl backdrop-blur-xl flex items-center gap-3 sm:gap-4 max-w-xl w-[92vw] animate-in slide-in-from-bottom-4 duration-200"
        >
          <button
            type="button"
            onClick={() => handleToggleAudio()}
            className={`p-2.5 rounded-xl font-bold transition shrink-0 ${
              isAudioPlaying && !isAudioPaused
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
            }`}
            title={isAudioPaused ? "Continuar Leitura" : "Pausar Leitura"}
          >
            {isAudioPlaying && !isAudioPaused ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-bold text-white truncate max-w-[180px] sm:max-w-xs">
                {currentChapter.title}
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">
                {Math.round(audioProgress)}% • {currentSentenceIndex + 1}/{totalSentences || 1}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-200"
                style={{ width: `${Math.max(0, Math.min(100, audioProgress))}%` }}
              />
            </div>
            {currentSentenceText && (
              <p className="text-[10px] text-slate-300 truncate mt-1 italic">
                &ldquo;{currentSentenceText}&rdquo;
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => handleChangeRate(audioSpeed === 1.0 ? 1.25 : audioSpeed === 1.25 ? 1.5 : 1.0)}
              className="px-2 py-1 rounded-lg bg-slate-800 text-[10px] font-bold text-slate-300 hover:text-white"
              title="Alternar velocidade"
            >
              {audioSpeed}x
            </button>
            <button
              type="button"
              onClick={handleStopAudio}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition"
              title="Parar áudio"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
