import React, { useState, useEffect, useRef } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Radio, 
  CheckCircle2, 
  Award, 
  Zap, 
  Search, 
  ListMusic, 
  Info,
  Clock,
  Layers,
  FileQuestion,
  HelpCircle,
  Volume1,
  ExternalLink,
  Check,
  AlertCircle,
  RefreshCw,
  Maximize2,
  Minimize2,
  Columns,
  AlignLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AudioLesson, Question } from '../types';
import { AUDIO_LESSONS_PLAYLIST } from '../data/audioLessonsData';
import { OFFICIAL_PETROBRAS_2021_EXAM } from '../data/officialExamData';
import { SIMULADO_01_REVISAO_PRA_TORAR_EXAM } from '../data/revisaoPraTorarData';
import { speechService } from '../services/speechService';

interface AudioStudyPlayerProps {
  questions: Question[];
  onSelectQuestionInSimulator?: (questionId: string) => void;
  standalone?: boolean;
}

export const AudioStudyPlayer: React.FC<AudioStudyPlayerProps> = ({
  questions,
  onSelectQuestionInSimulator,
  standalone = true,
}) => {
  // Audio state
  const [playlist, setPlaylist] = useState<AudioLesson[]>(AUDIO_LESSONS_PLAYLIST);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'playlist' | 'officialExam' | 'customAudio'>('playlist');
  const [selectedExamId, setSelectedExamId] = useState<'petrobras-2021-cd' | 'simulado-01-revisao-pra-torar'>('petrobras-2021-cd');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [audioMode, setAudioMode] = useState<'speech' | 'ai-neural' | 'assistive-tone'>('speech');
  const [activeEngine, setActiveEngine] = useState<'browser' | 'ai-neural'>('browser');
  const [preferredEngine, setPreferredEngine] = useState<'auto' | 'ai-neural' | 'browser'>('auto');
  const [engineErrorMessage, setEngineErrorMessage] = useState<string | null>(null);
  const [isTestingSound, setIsTestingSound] = useState<boolean>(false);
  const [testResultText, setTestResultText] = useState<string | null>(null);

  // Text screen maximization and typography adjustments
  const [isTextMaximized, setIsTextMaximized] = useState<boolean>(false);
  const [isInlineExpanded, setIsInlineExpanded] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [textWidthMode, setTextWidthMode] = useState<'reading' | 'full'>('reading');
  const [showKeyPointsInMaximized, setShowKeyPointsInMaximized] = useState<boolean>(true);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  
  // Custom topic audio generator state
  const [customTopicInput, setCustomTopicInput] = useState<string>('');
  const [isSynthesizingTopic, setIsSynthesizingTopic] = useState<boolean>(false);

  // Canvas visualizer ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentLesson = playlist[currentLessonIndex] || playlist[0];

  // Split transcript into readable sentences for highlighted karaoke-style reading
  const sentences = React.useMemo(() => {
    if (!currentLesson?.transcript) return [];
    return speechService.splitIntoSentences(currentLesson.transcript);
  }, [currentLesson?.transcript]);

  // Subscribe to central speechService
  useEffect(() => {
    speechService.initVoices();
    const unsubscribe = speechService.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsPaused(state.isPaused);
      if (state.selectedVoice) {
        setSelectedVoice(state.selectedVoice);
      }
      if (state.availableVoices && state.availableVoices.length > 0) {
        setAvailableVoices(state.availableVoices);
      }
      setProgressPercent(state.progressPercent);
      setCurrentSentenceIndex(state.currentSentenceIndex);
      setAudioMode(state.audioMode);
      setEngineErrorMessage(state.errorMessage);
      setActiveEngine(state.activeEngine);
      setPreferredEngine(state.preferredEngine);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Auto-scroll transcript to currently spoken sentence (both inline and maximized screen)
  useEffect(() => {
    if (isPlaying) {
      const activeEl = document.getElementById(`karaoke-sentence-${currentSentenceIndex}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      const activeMaxEl = document.getElementById(`max-karaoke-sentence-${currentSentenceIndex}`);
      if (activeMaxEl) {
        activeMaxEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentSentenceIndex, isPlaying, isTextMaximized]);

  // Keyboard shortcut: Esc to exit maximized text mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTextMaximized) {
        setIsTextMaximized(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTextMaximized]);

  const handleTestSound = async () => {
    setIsTestingSound(true);
    setTestResultText('Testando saída de áudio...');
    try {
      const res = await speechService.testSound();
      setTestResultText(res.message);
    } catch (err: any) {
      setTestResultText('Teste de áudio finalizado.');
    } finally {
      setTimeout(() => {
        setIsTestingSound(false);
      }, 1200);
      setTimeout(() => {
        setTestResultText(null);
      }, 6000);
    }
  };

  // Audio Canvas visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const bars = 48;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        let barHeight = 6;
        if (isPlaying && !isPaused) {
          // Dynamic sine-wave simulation when speaking
          const wave1 = Math.sin(phase + i * 0.25);
          const wave2 = Math.cos(phase * 1.5 + i * 0.15);
          const amp = Math.abs(wave1 * wave2);
          barHeight = Math.max(8, amp * (height * 0.75));
        }

        const x = i * barWidth;
        const y = (height - barHeight) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isPlaying && !isPaused) {
          gradient.addColorStop(0, '#10b981'); // emerald
          gradient.addColorStop(0.5, '#06b6d4'); // cyan
          gradient.addColorStop(1, '#3b82f6'); // blue
        } else {
          gradient.addColorStop(0, '#334155');
          gradient.addColorStop(1, '#1e293b');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x + 1.5, y, barWidth - 3, barHeight, 3);
        ctx.fill();
      }

      if (isPlaying && !isPaused) {
        phase += 0.08 * speechRate;
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isPaused, speechRate]);

  // Handle Playback via robust speechService
  const handleEngineChange = (engine: 'auto' | 'ai-neural' | 'browser') => {
    setPreferredEngine(engine);
    speechService.setPreferredEngine(engine);
  };

  const startSpeech = (textToSpeak: string, startFromSentence: number = 0) => {
    speechService.play(textToSpeak, {
      id: currentLesson.id,
      rate: speechRate,
      volume: isMuted ? 0 : volume,
      voice: selectedVoice,
      preferredEngine: preferredEngine
    }, startFromSentence);
  };

  const handleTogglePlay = () => {
    if (isPlaying && !isPaused) {
      speechService.pause();
    } else if (isPaused) {
      speechService.resume();
    } else {
      startSpeech(currentLesson.transcript, currentSentenceIndex);
    }
  };

  const handleStop = () => {
    speechService.stop();
  };

  const handleSelectLesson = (index: number) => {
    handleStop();
    setCurrentLessonIndex(index);
    setCurrentSentenceIndex(0);
    setProgressPercent(0);
  };

  const handlePrevious = () => {
    const prevIndex = currentLessonIndex === 0 ? playlist.length - 1 : currentLessonIndex - 1;
    handleSelectLesson(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentLessonIndex === playlist.length - 1 ? 0 : currentLessonIndex + 1;
    handleSelectLesson(nextIndex);
  };

  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
    speechService.setRate(rate);
  };

  const handleVoiceChange = (voiceName: string) => {
    const voice = availableVoices.find(v => v.name === voiceName) || null;
    setSelectedVoice(voice);
    speechService.setVoice(voice);
  };

  // Play explanation for a specific question or official item
  const handlePlayQuestionAudio = (q: Question) => {
    handleStop();
    const cleanStatement = q.statement.replace(/[\[\]]/g, '');
    const officialAnswerText = q.correctAnswer === 'C' ? 'CERTO' : q.correctAnswer === 'E' ? 'ERRADO' : `Alternativa ${q.correctAnswer}`;
    
    const audioText = `Explicação em áudio da questão de ${q.topic}, subtópico ${q.subtopic}. ${cleanStatement}. O gabarito oficial é: ${officialAnswerText}. Comentário do professor: ${q.explanationCorrect}. Dica de prova e pegadinha da banca: ${q.cesgranrioTip}`;

    const tempLesson: AudioLesson = {
      id: `question-${q.id}`,
      title: `Questão: ${q.subtopic} (${officialAnswerText})`,
      axisOrDiscipline: q.topic,
      durationEstimate: '2 min',
      tag: 'Questão Comentada',
      summary: `Resolução guiada por voz para a questão sobre ${q.subtopic}.`,
      transcript: audioText,
      keyPoints: [
        `Gabarito Oficial: ${officialAnswerText}`,
        `Disciplina: ${q.topic}`,
        `Subtópico: ${q.subtopic}`,
        q.cesgranrioTip
      ]
    };

    setPlaylist(prev => [tempLesson, ...prev.filter(l => l.id !== tempLesson.id)]);
    setCurrentLessonIndex(0);
    setCurrentSentenceIndex(0);

    setTimeout(() => {
      startSpeech(audioText, 0);
    }, 100);
  };

  // Generate on-demand audio lesson for custom query
  const handleGenerateCustomAudio = () => {
    if (!customTopicInput.trim()) return;
    setIsSynthesizingTopic(true);

    const topic = customTopicInput.trim();
    
    // Create educational script focused on Petrobras / Transpetro syllabus
    const customTranscript = `Olá! Esta é uma explicação detalhada em áudio gerada para o tema: ${topic}, direcionada para a prova de Ciência de Dados da Petrobras e Transpetro.

Ao estudar ${topic}, o concurseiro deve atentar para a sua relevância conceitual e aplicação na indústria de óleo, gás e logística de combustíveis.

Primeiro, entenda a fundamentação matemática e arquitetural deste conceito. As bancas examinadoras como a Cesgranrio e Cebraspe costumam cobrar se você domina a formulação teórica, as suposições subjacentes e o impacto de hiperparâmetros ou parâmetros nos resultados finais.

Segundo, fique atento às principais pegadinhas: frequentemente a banca inverte papéis, como trocar o objetivo de redução de variância pelo de viés, ou afirmar que métricas lineares aplicam-se a dados não lineares sem as devidas transformações.

Terceiro, relacione ${topic} com as demais etapas do pipeline de dados, desde a ingestão distribuída no Data Lakehouse até o monitoramento contínuo em MLOps.

Consulte os simuladores da nossa plataforma para testar questões práticas e fixar este conteúdo em profundidade!`;

    const generatedLesson: AudioLesson = {
      id: `custom-${Date.now()}`,
      title: `Aula Sob Demanda: ${topic}`,
      axisOrDiscipline: 'Especialista em Dados',
      durationEstimate: '3 min',
      tag: 'Áudio IA',
      summary: `Resumo sob demanda focado nas exigências de concurso para ${topic}.`,
      transcript: customTranscript,
      keyPoints: [
        `Conceito central: ${topic}`,
        'Foco nas armadilhas conceituais da banca',
        'Aplicação prática no ecossistema Petrobras/Transpetro'
      ]
    };

    setPlaylist(prev => [generatedLesson, ...prev]);
    setCurrentLessonIndex(0);
    setCurrentSentenceIndex(0);
    setIsSynthesizingTopic(false);
    setCustomTopicInput('');

    setTimeout(() => {
      startSpeech(customTranscript, 0);
    }, 100);
  };

  const filteredPlaylist = playlist.filter(lesson => 
    lesson.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    lesson.axisOrDiscipline.toLowerCase().includes(searchFilter.toLowerCase()) ||
    lesson.tag.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Headphones className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              Área de Áudio-Aulas & Explicações Faladas
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Aprenda Ouvindo as Resoluções & Aulas Teóricas
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Estude no trânsito, na academia ou descanse a visão ouvindo a resolução detalhada de todas as questões oficiais da Petrobras, resumos dos 12 eixos do edital e explicações passo a passo com síntese de voz natural em português (<code className="text-emerald-300 font-mono">pt-BR</code>).
            </p>
          </div>

          {/* Audio Engine Controls & Diagnostics */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Engine & Voice Config Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-xs">
              <Radio className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              
              {/* Motor de Áudio */}
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] block font-medium">Motor de Voz:</span>
                <select
                  value={preferredEngine}
                  onChange={(e) => handleEngineChange(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-bold cursor-pointer"
                >
                  <option value="auto">⚡ Auto (Recomendado)</option>
                  <option value="ai-neural">🎙️ Voz IA Neural Gemini</option>
                  <option value="browser">🌐 Voz do Navegador</option>
                </select>
              </div>

              {/* Voz Específica do Navegador */}
              {preferredEngine !== 'ai-neural' && (
                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px] block font-medium">Voz Local:</span>
                  <select
                    value={selectedVoice?.name || ''}
                    onChange={(e) => handleVoiceChange(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-semibold cursor-pointer max-w-[170px]"
                  >
                    {availableVoices.length > 0 ? (
                      availableVoices.map((v) => (
                        <option key={v.name} value={v.name}>
                          {v.name.slice(0, 22)} {v.lang ? `(${v.lang})` : ''}
                        </option>
                      ))
                    ) : (
                      <option value="">Voz Padrão (pt-BR)</option>
                    )}
                  </select>
                </div>
              )}

              {/* Active Engine Badge */}
              <div className="hidden md:flex flex-col space-y-1">
                <span className="text-slate-400 text-[11px] block font-medium">Status Ativo:</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                  activeEngine === 'ai-neural' 
                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' 
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                  {activeEngine === 'ai-neural' ? 'Voz Neural IA' : 'Web Speech Local'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-col gap-2">
              <button
                type="button"
                onClick={handleTestSound}
                disabled={isTestingSound}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 active:scale-95 transition disabled:opacity-50"
                title="Testa imediatamente a saída de áudio e voz do sistema"
              >
                {isTestingSound ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                ) : (
                  <Volume1 className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>{isTestingSound ? 'Testando...' : 'Testar Áudio'}</span>
              </button>

              {isInIframe && (
                <button
                  type="button"
                  onClick={() => window.open(window.location.href, '_blank')}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  title="Abre o app em aba dedicada para desbloquear restrições de som do navegador"
                >
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                  <span>Abrir em Nova Aba</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Test Result Toast / Engine Banner */}
        {testResultText && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium">{testResultText}</span>
          </div>
        )}

        {engineErrorMessage && !testResultText && (
          <div className="mt-4 p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{engineErrorMessage}</span>
            </div>
            {isInIframe && (
              <button
                onClick={() => window.open(window.location.href, '_blank')}
                className="underline hover:text-white font-semibold flex items-center gap-1"
              >
                Abrir fora do iframe <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Player Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        
        {/* Top Playing Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {currentLesson.axisOrDiscipline}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {currentLesson.tag}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {currentLesson.durationEstimate}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
              {currentLesson.title}
            </h2>
            <p className="text-xs text-slate-400 line-clamp-1">
              {currentLesson.summary}
            </p>
          </div>

          {/* Speed Controls */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1.5 self-start sm:self-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 px-2">Velocidade:</span>
            {[0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map((rate) => (
              <button
                key={rate}
                onClick={() => handleRateChange(rate)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  speechRate === rate
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Audio Waveform Canvas */}
        <div className="py-4 flex flex-col items-center justify-center">
          <canvas
            ref={canvasRef}
            width={720}
            height={70}
            className="w-full max-w-2xl h-16 rounded-xl bg-slate-950/60 border border-slate-800/80"
          />
          <div className="flex items-center justify-between w-full max-w-2xl text-[11px] text-slate-400 pt-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPlaying && !isPaused ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`}></span>
              {isPlaying && !isPaused ? 'Reproduzindo Áudio em Tempo Real...' : isPaused ? 'Áudio Pausado' : 'Pronto para Ouvir'}
            </span>
            <span>Progresso: {progressPercent}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-6 border border-slate-800">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Master Audio Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition"
              title={isMuted ? 'Desmutar' : 'Mutar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Primary Buttons */}
          <div className="flex items-center gap-3">
            <button
              id="audio-prev-btn"
              onClick={handlePrevious}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Áudio Anterior"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              id="audio-play-toggle-btn"
              onClick={handleTogglePlay}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
            >
              {isPlaying && !isPaused ? (
                <>
                  <Pause className="w-5 h-5 fill-current" /> Pausar
                </>
              ) : isPaused ? (
                <>
                  <Play className="w-5 h-5 fill-current" /> Continuar
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" /> Ouvir Aula em Áudio
                </>
              )}
            </button>

            <button
              id="audio-stop-btn"
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition"
              title="Parar Reprodução"
            >
              <Square className="w-5 h-5" />
            </button>

            <button
              id="audio-next-btn"
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Próximo Áudio"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Lesson Counter */}
          <div className="text-xs font-semibold text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">
            Faixa {currentLessonIndex + 1} de {playlist.length}
          </div>
        </div>

        {/* Synchronized Karaoke Transcript & Key Takeaways */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
          
          {/* Transcript Box */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Transcrição Sincronizada (Karaokê)
                </h3>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  • Frase {currentSentenceIndex + 1} de {sentences.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Expand inline height toggle */}
                <button
                  type="button"
                  id="btn-expand-transcript-height"
                  onClick={() => setIsInlineExpanded(prev => !prev)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-400 hover:text-slate-200 transition"
                  title={isInlineExpanded ? "Recolher altura do texto" : "Expandir altura do texto"}
                >
                  {isInlineExpanded ? <ChevronUp className="w-3.5 h-3.5 text-cyan-400" /> : <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{isInlineExpanded ? "Recolher" : "Expandir"}</span>
                </button>

                {/* Fullscreen / Maximized screen button */}
                <button
                  type="button"
                  id="btn-maximize-transcript-screen"
                  onClick={() => setIsTextMaximized(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition active:scale-95 shadow-sm"
                  title="Maximizar a área do texto na tela inteira com ajuste de layout e tipografia"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Maximizar Tela</span>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-xl bg-slate-950/80 border border-slate-800 overflow-y-auto space-y-2 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 transition-all duration-300 ${isInlineExpanded ? 'max-h-[500px]' : 'max-h-72'}`}>
              {sentences.map((sentence, idx) => {
                const isCurrent = idx === currentSentenceIndex && isPlaying;
                return (
                  <span
                    key={idx}
                    id={`karaoke-sentence-${idx}`}
                    onClick={() => {
                      setCurrentSentenceIndex(idx);
                      startSpeech(currentLesson.transcript, idx);
                    }}
                    className={`cursor-pointer transition-all duration-150 inline rounded px-1 py-0.5 mr-1 ${
                      isCurrent 
                        ? 'bg-emerald-500/20 text-emerald-200 border-b-2 border-emerald-400 font-semibold' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                    title="Clique para iniciar o áudio a partir desta frase"
                  >
                    {sentence}{' '}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Pontos-Chave para Fixação
            </h3>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 max-h-72 overflow-y-auto">
              {currentLesson.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Maximized Text Screen (Tela Cheia Ajustada ao Texto) */}
      {isTextMaximized && (
        <div 
          id="maximized-text-overlay"
          className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl flex flex-col animate-in fade-in duration-200 text-slate-100"
        >
          {/* Maximized Header Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md shrink-0 shadow-lg">
            {/* Track info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {currentLesson.axisOrDiscipline}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Faixa {currentLessonIndex + 1} de {playlist.length}
                  </span>
                  {isPlaying && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/40 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Narração Ativa
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-snug truncate max-w-lg sm:max-w-xl">
                  {currentLesson.title}
                </h2>
              </div>
            </div>

            {/* Middle: Integrated Audio Controls */}
            <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-2xl shrink-0 self-start lg:self-center">
              <button
                type="button"
                id="btn-max-prev-audio"
                onClick={handlePrevious}
                className="p-2 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 transition"
                title="Faixa Anterior"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="btn-max-play-pause-audio"
                onClick={handleTogglePlay}
                className={`p-2.5 rounded-xl font-bold transition active:scale-95 shadow-md flex items-center justify-center ${
                  isPlaying 
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
                title={isPlaying ? "Pausar Narração" : "Iniciar Narração"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
              </button>

              <button
                type="button"
                id="btn-max-stop-audio"
                onClick={handleStop}
                className="p-2 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 transition"
                title="Parar Narração"
              >
                <Square className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="btn-max-next-audio"
                onClick={handleNext}
                className="p-2 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 transition"
                title="Próxima Faixa"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-slate-800 mx-1"></div>

              {/* Speed Selector */}
              <select
                id="select-max-speech-rate"
                value={speechRate}
                onChange={(e) => handleRateChange(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                title="Velocidade da voz"
              >
                <option value={0.75}>0.75x</option>
                <option value={1.0}>1.0x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2.0}>2.0x</option>
              </select>
            </div>

            {/* Right: Screen & Typography Adjustment Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Font Size Selector (A- / A / A+ / A++) */}
              <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
                <span className="px-2 text-slate-400 text-[11px] font-medium hidden sm:inline">Fonte:</span>
                {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    id={`btn-max-font-${size}`}
                    onClick={() => setTextSize(size)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition text-xs ${
                      textSize === size
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                    title={`Ajustar tamanho do texto para ${size.toUpperCase()}`}
                  >
                    {size === 'sm' ? 'A-' : size === 'base' ? 'A' : size === 'lg' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>

              {/* Layout Width Mode Toggle (Modo Leitura / Largura Total) */}
              <button
                type="button"
                id="btn-max-width-toggle"
                onClick={() => setTextWidthMode(prev => prev === 'reading' ? 'full' : 'reading')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition"
                title="Alternar entre largura de leitura otimizada e largura total da tela"
              >
                {textWidthMode === 'reading' ? <AlignLeft className="w-3.5 h-3.5 text-cyan-400" /> : <Columns className="w-3.5 h-3.5 text-cyan-400" />}
                <span className="hidden sm:inline">{textWidthMode === 'reading' ? 'Modo Leitura' : 'Largura Total'}</span>
              </button>

              {/* Key Points Toggle */}
              <button
                type="button"
                id="btn-max-toggle-keypoints"
                onClick={() => setShowKeyPointsInMaximized(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  showKeyPointsInMaximized 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title="Exibir ou ocultar coluna de pontos-chave"
              >
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xl:inline">Pontos-Chave</span>
              </button>

              {/* Minimize / Exit Fullscreen Button */}
              <button
                type="button"
                id="btn-close-maximized-screen"
                onClick={() => setIsTextMaximized(false)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition active:scale-95 shadow-sm"
                title="Sair da tela cheia ajustada (ou pressione Esc)"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Minimizar</span>
                <span className="text-[10px] opacity-70 bg-rose-950 px-1 rounded hidden sm:inline">Esc</span>
              </button>
            </div>
          </div>

          {/* Reading Progress Line */}
          <div className="w-full bg-slate-900 h-1 relative overflow-hidden shrink-0">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Maximized Content Body */}
          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            {/* Transcript Main Column (Adjusted to Screen) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
              <div className={`transition-all duration-200 ${textWidthMode === 'reading' ? 'max-w-4xl mx-auto' : 'w-full'}`}>
                {/* Subtitle / Topic intro bar */}
                <div className="mb-6 pb-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <span className="font-semibold text-emerald-400 flex items-center gap-2">
                    <Headphones className="w-4 h-4" />
                    Transcrição Completa da Aula • Clique em Qualquer Frase para Iniciar a Narração
                  </span>
                  <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                    Frase {currentSentenceIndex + 1} de {sentences.length} ({progressPercent}% concluído)
                  </span>
                </div>

                {/* Synchronized Karaoke Sentences */}
                <div className={`space-y-4 ${
                  textSize === 'sm' ? 'text-sm sm:text-base leading-relaxed' :
                  textSize === 'base' ? 'text-base sm:text-lg leading-relaxed' :
                  textSize === 'lg' ? 'text-lg sm:text-xl leading-relaxed' :
                  'text-xl sm:text-2xl leading-loose'
                }`}>
                  {sentences.map((sentence, idx) => {
                    const isCurrent = idx === currentSentenceIndex && isPlaying;
                    return (
                      <span
                        key={idx}
                        id={`max-karaoke-sentence-${idx}`}
                        onClick={() => {
                          setCurrentSentenceIndex(idx);
                          startSpeech(currentLesson.transcript, idx);
                        }}
                        className={`cursor-pointer transition-all duration-200 inline rounded-lg p-1.5 mr-2 leading-relaxed ${
                          isCurrent 
                            ? 'bg-emerald-500/25 text-emerald-200 font-bold border-l-4 border-emerald-400 pl-3 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/40' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                        title="Clique para iniciar o áudio a partir desta frase"
                      >
                        {sentence}{' '}
                      </span>
                    );
                  })}
                </div>

                {/* Bottom Navigation within Maximized Mode */}
                <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                  <div>
                    <p className="text-slate-200 font-semibold mb-0.5">Fim do texto desta aula</p>
                    <p className="text-[11px] text-slate-400">Navegue pelas próximas faixas do edital ou feche a tela cheia para retornar ao painel.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      id="btn-max-footer-prev"
                      onClick={handlePrevious}
                      disabled={currentLessonIndex === 0}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold disabled:opacity-40 transition"
                    >
                      ← Faixa Anterior
                    </button>
                    <button
                      type="button"
                      id="btn-max-footer-next"
                      onClick={handleNext}
                      disabled={currentLessonIndex === playlist.length - 1}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold disabled:opacity-40 transition shadow-sm"
                    >
                      Próxima Faixa →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Side-Panel for Key Points in Maximized View */}
            {showKeyPointsInMaximized && (
              <div className="w-full lg:w-80 lg:max-w-sm border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-slate-900/50 p-4 sm:p-6 overflow-y-auto shrink-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    Pontos-Chave para Fixação
                  </h3>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {currentLesson.keyPoints.length} tópicos
                  </span>
                </div>

                <div className="space-y-3">
                  {currentLesson.keyPoints.map((point, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-Tabs: Playlist, Prova Oficial Petrobras Comentada, Gerar Áudio Sob Demanda */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('playlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'playlist'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <ListMusic className="w-4 h-4" />
              Playlist de Aulas dos Eixos ({playlist.length})
            </button>

            <button
              onClick={() => setActiveSubTab('officialExam')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'officialExam'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <FileQuestion className="w-4 h-4" />
              Explicação em Áudio da Prova Petrobras
            </button>

            <button
              onClick={() => setActiveSubTab('customAudio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'customAudio'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Sintetizar Áudio de Qualquer Assunto
            </button>
          </div>

          {activeSubTab === 'playlist' && (
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filtrar episódios em áudio..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}
        </div>

        {/* TAB 1: PLAYLIST OF AUDIO LESSONS */}
        {activeSubTab === 'playlist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredPlaylist.map((lesson, idx) => {
              const isSelected = lesson.id === currentLesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => handleSelectLesson(idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/80 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold ${
                    isSelected 
                      ? 'bg-emerald-500 text-slate-950' 
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {isSelected && isPlaying && !isPaused ? (
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
                      </span>
                    ) : (
                      <Headphones className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {lesson.axisOrDiscipline}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {lesson.durationEstimate}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-tight leading-snug line-clamp-1">
                      {lesson.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {lesson.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: OFFICIAL EXAM & SIMULADO ITEMS AUDIO EXPLAINER */}
        {activeSubTab === 'officialExam' && (
          <div className="space-y-4">
            {/* Exam Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                id="btn-select-exam-petrobras-2021"
                onClick={() => setSelectedExamId('petrobras-2021-cd')}
                className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                  selectedExamId === 'petrobras-2021-cd'
                    ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  selectedExamId === 'petrobras-2021-cd' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <FileQuestion className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Prova Real de Concurso</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{OFFICIAL_PETROBRAS_2021_EXAM.items.length} itens</span>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">Prova Oficial Petrobras 2021/2022</h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">CEBRASPE / CESGRANRIO • Gabarito Definitivo Comentado</p>
                </div>
              </button>

              <button
                type="button"
                id="btn-select-exam-revisao-pra-torar"
                onClick={() => setSelectedExamId('simulado-01-revisao-pra-torar')}
                className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                  selectedExamId === 'simulado-01-revisao-pra-torar'
                    ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  selectedExamId === 'simulado-01-revisao-pra-torar' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Simulado Reta Final</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{SIMULADO_01_REVISAO_PRA_TORAR_EXAM.items.length} itens</span>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">Simulado 01 – Revisão Pra Torar</h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">Prof. Thiago Cavalcanti • Estilo Cesgranrio Aprofundado</p>
                </div>
              </button>
            </div>

            {/* Banner info of selected exam */}
            <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 space-y-1">
                <span className="font-bold text-white block">
                  {selectedExamId === 'simulado-01-revisao-pra-torar' 
                    ? 'Simulado 01 – Revisão Pra Torar (Petrobras / Transpetro - Ciência de Dados)' 
                    : 'Caderno de Prova Oficial CEBRASPE / PETROBRAS 2021/2022'}
                </span>
                <p>
                  Clique em <strong>"Ouvir Explicação Desta Questão"</strong> em qualquer item para que o professor falado leia o enunciado, revele o gabarito oficial (CERTO/ERRADO), explique o embasamento teórico e aponte a pegadinha da banca Cesgranrio.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {(selectedExamId === 'simulado-01-revisao-pra-torar' ? SIMULADO_01_REVISAO_PRA_TORAR_EXAM : OFFICIAL_PETROBRAS_2021_EXAM).items.map((item) => {
                const questionPrefix = selectedExamId === 'simulado-01-revisao-pra-torar' ? 'rpt-simulado-01-item' : 'petrobras-2021-item';
                const isItemPlaying = isPlaying && currentLesson.id === `question-${questionPrefix}-${item.itemNumber}`;
                return (
                  <div
                    key={item.itemNumber}
                    className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Item {item.itemNumber} • {item.block}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          {item.subtopic}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-black ${
                          item.officialAnswer === 'C' 
                            ? 'bg-emerald-950 border border-emerald-500 text-emerald-300' 
                            : 'bg-rose-950 border border-rose-500 text-rose-300'
                        }`}>
                          Gabarito: {item.officialAnswer === 'C' ? 'CERTO' : 'ERRADO'}
                        </span>

                        <button
                          onClick={() => {
                            const qId = `${questionPrefix}-${item.itemNumber}`;
                            const matchedQuestion = questions.find(q => q.id === qId) || {
                              id: qId,
                              topic: item.discipline,
                              subtopic: item.subtopic,
                              difficulty: 'Médio',
                              statement: item.statement,
                              options: [{ letter: 'C', text: 'CERTO' }, { letter: 'E', text: 'ERRADO' }],
                              correctAnswer: item.officialAnswer,
                              explanationCorrect: item.explanation,
                              distractorAnalysis: [],
                              cesgranrioTip: item.cesgranrioTrap
                            };
                            handlePlayQuestionAudio(matchedQuestion);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition"
                        >
                          <Headphones className="w-3.5 h-3.5" />
                          {isItemPlaying ? 'Ouvindo Agora...' : 'Ouvir Explicação em Áudio'}
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed font-normal">
                      "{item.statement}"
                    </p>

                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
                      <div className="text-slate-300">
                        <strong className="text-emerald-400">Justificativa Oficial: </strong>
                        {item.explanation}
                      </div>
                      <div className="text-amber-300">
                        <strong className="text-amber-400">Pegadinha da Banca: </strong>
                        {item.cesgranrioTrap}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM TOPIC AUDIO GENERATOR */}
        {activeSubTab === 'customAudio' && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Gerador de Áudio-Aulas Sob Demanda
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Digite qualquer tópico, fórmula ou dúvida específica (ex: <em>"Diferença entre L1 e L2"</em>, <em>"Como funciona o Broadcast Join no Spark"</em>, <em>"Bases legais da LGPD na Petrobras"</em>) e receba uma aula em áudio estruturada na hora!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={customTopicInput}
                onChange={(e) => setCustomTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateCustomAudio()}
                placeholder="Digite o assunto desejado (ex: Teorema Central do Limite e p-valor)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleGenerateCustomAudio}
                disabled={!customTopicInput.trim() || isSynthesizingTopic}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-40 transition shadow-lg shadow-emerald-600/20"
              >
                {isSynthesizingTopic ? (
                  <>Sintetizando...</>
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> Gerar & Ouvir Explicação
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                Sugestões Rápidas de Alta Relevância na Prova:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Overfitting vs Underfitting e Bias-Variance',
                  'Diferença entre Bagging e Boosting',
                  'MICE e KNN para Dados Faltantes MAR',
                  'Cálculo de TF-IDF e Stop-words em NLP',
                  'Teorema de Bayes e Testes de Hipóteses',
                  'Data Lakehouse Delta Lake e Transações ACID'
                ].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => {
                      setCustomTopicInput(sug);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
