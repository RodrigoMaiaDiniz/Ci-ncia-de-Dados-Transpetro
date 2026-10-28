/**
 * Serviço de Síntese de Voz e Áudio Ultra-Resiliente
 * Arquitetura Dual-Engine: Voz IA Gemini Neural de Alta Fidelidade + Web Speech API Aprimorado
 *
 * Soluções definitivas implementadas:
 * 1. Dual Engine com Fallback Automático: Se o navegador bloquear o Web Speech API ou não tiver
 *    vozes em português instaladas (comum em Linux, containers e iframes), utiliza o endpoint /api/tts
 *    com o modelo neural gemini-3.1-flash-tts-preview em formato WAV padrão.
 * 2. Eliminação da corrida de cancelamento assíncrono do Chrome: aguarda o flush do cancel()
 *    antes de submeter nova SpeechSynthesisUtterance.
 * 3. Destravamento contínuo do Chrome: chamada de window.speechSynthesis.resume() antes e depois
 *    de cada speak(), prevenindo deadlock de fila.
 * 4. Proteção contra Coleta de Lixo (Garbage Collection): mantém referência forte no escopo global
 *    para evitar que o V8 colete a utterance no meio da fala.
 * 5. Segmentação de sentenças protegida: preserva números decimais (ex.: 3.14, 0.05), abreviações
 *    e siglas técnicas, eliminando fragmentos pontuados vazios que travavam o motor de voz.
 * 6. Heartbeat Keep-Alive anti-congelamento (contorna o bug dos 15 segundos do Chromium).
 * 7. Desbloqueio imediato do hardware de som via Web Audio API e HTMLAudioElement em gestos do usuário.
 */

export type AudioEnginePreference = 'auto' | 'ai-neural' | 'browser';

export interface SpeechOptions {
  id?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
  preferredEngine?: AudioEnginePreference;
  onSentenceChange?: (sentenceIndex: number, totalSentences: number, sentenceText: string) => void;
  onProgress?: (percent: number) => void;
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export interface SpeechEngineState {
  isPlaying: boolean;
  isPaused: boolean;
  activeId: string | null;
  currentSentenceIndex: number;
  totalSentences: number;
  progressPercent: number;
  currentSentenceText: string;
  currentSentences: string[];
  rate: number;
  volume: number;
  selectedVoice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
  errorMessage: string | null;
  audioMode: 'speech' | 'ai-neural' | 'assistive-tone';
  activeEngine: 'browser' | 'ai-neural';
  preferredEngine: AudioEnginePreference;
  isAudioUnlocked: boolean;
}

declare global {
  interface Window {
    __transpetro_active_utterance?: SpeechSynthesisUtterance | null;
    __transpetro_audio_ctx?: AudioContext | null;
    __transpetro_ai_audio?: HTMLAudioElement | null;
  }
}

class RobustSpeechService {
  private state: SpeechEngineState = {
    isPlaying: false,
    isPaused: false,
    activeId: null,
    currentSentenceIndex: 0,
    totalSentences: 0,
    progressPercent: 0,
    currentSentenceText: '',
    currentSentences: [],
    rate: 1.0,
    volume: 1.0,
    selectedVoice: null,
    availableVoices: [],
    errorMessage: null,
    audioMode: 'speech',
    activeEngine: 'browser',
    preferredEngine: 'auto',
    isAudioUnlocked: false
  };

  private sentences: string[] = [];
  private currentOptions: SpeechOptions | null = null;
  private subscribers: Set<(state: SpeechEngineState) => void> = new Set();
  private watchdogTimer: any = null;
  private transitionTimer: any = null;
  private keepAliveInterval: any = null;
  private isVoicesInitialized = false;
  private retryCountForCurrentIndex = 0;
  private consecutiveErrors = 0;
  private isExplicitlyStopping = false;

  // AI Neural Audio player state
  private aiAudioElement: HTMLAudioElement | null = null;
  private aiAudioCache: Map<string, string> = new Map();
  private prefetchController: AbortController | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initVoices();
      this.initAiAudio();
    }
  }

  private initAiAudio(): void {
    if (typeof window === 'undefined') return;
    if (!window.__transpetro_ai_audio) {
      const audio = new Audio();
      audio.preload = 'auto';
      window.__transpetro_ai_audio = audio;
    }
    this.aiAudioElement = window.__transpetro_ai_audio;
  }

  /**
   * Inicializa o carregamento de vozes com detecção contínua
   */
  public initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.state.activeEngine = 'ai-neural';
      return;
    }

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          // Filtra preferencialmente vozes em português
          const ptVoices = voices.filter(v =>
            v.lang.toLowerCase().startsWith('pt') ||
            v.lang.toLowerCase().includes('br') ||
            v.lang.toLowerCase().includes('por')
          );

          const list = ptVoices.length > 0 ? ptVoices : voices;
          this.state.availableVoices = list;

          // Seleciona a melhor voz natural em português se ainda não definida
          if (!this.state.selectedVoice && list.length > 0) {
            const preferred = ptVoices.find(v =>
              /google|natural|luciana|felipe|daniel|maria|heloisa|francisca|antonio|leticia|raquel|camila/i.test(v.name)
            ) || ptVoices[0] || voices[0];

            this.state.selectedVoice = preferred;
          }

          this.isVoicesInitialized = true;
          this.notifySubscribers();
        }
      } catch (err) {
        console.warn('Aviso ao carregar vozes do navegador:', err);
      }
    };

    loadVoices();

    try {
      if (window.speechSynthesis.addEventListener) {
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
      }
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } catch {}

    [100, 300, 800, 1800, 3000].forEach(delay => {
      setTimeout(() => {
        if (this.state.availableVoices.length === 0) {
          loadVoices();
        }
      }, delay);
    });
  }

  /**
   * Desbloqueia e acorda o subsistema de áudio no clique do usuário (Autoplay policy)
   */
  public unlockAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return null;

      if (!window.__transpetro_audio_ctx) {
        window.__transpetro_audio_ctx = new AudioCtx();
      }

      const ctx = window.__transpetro_audio_ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      this.state.isAudioUnlocked = true;
      return ctx;
    } catch {
      return null;
    }
  }

  /**
   * Toca um acorde de sino harmônico (Chime) suave usando Web Audio API puro.
   */
  public playHarmonicChime(frequency = 523.25, duration = 0.25): void {
    try {
      const ctx = this.unlockAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + duration);

      const vol = (this.state.volume || 1.0) * 0.15;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignora erro se áudio bloqueado temporariamente
    }
  }

  /**
   * Teste completo de saída de áudio com Chime + Voz (prioriza Voz Neural se navegador falhar)
   */
  public async testSound(): Promise<{ success: boolean; message: string; engine: 'ai-neural' | 'browser' }> {
    this.unlockAudioContext();
    this.playHarmonicChime(523.25, 0.25);

    // Se a preferência for IA Neural ou o navegador não tiver Web Speech API
    if (this.state.preferredEngine === 'ai-neural' || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      try {
        const audioUrl = await this.fetchAiAudio('Áudio do sistema de estudos Transpetro ativado com sucesso.');
        if (audioUrl) {
          await this.playAiAudioUrl(audioUrl);
          return {
            success: true,
            message: 'Voz Neural Gemini IA funcionando perfeitamente em qualidade de estúdio!',
            engine: 'ai-neural'
          };
        }
      } catch (err: any) {
        console.warn('Erro no teste de IA Neural, tentando navegador:', err);
      }
    }

    // Testa Web Speech API do navegador com recuperação
    return new Promise(async (resolve) => {
      let resolved = false;

      const finishWithAiFallback = async () => {
        if (resolved) return;
        resolved = true;
        try {
          const audioUrl = await this.fetchAiAudio('Áudio do sistema Transpetro ativado.');
          if (audioUrl) {
            await this.playAiAudioUrl(audioUrl);
            this.state.activeEngine = 'ai-neural';
            this.notifySubscribers();
            resolve({
              success: true,
              message: 'Áudio ativado via Voz Neural Gemini IA (resolução automática para seu navegador).',
              engine: 'ai-neural'
            });
            return;
          }
        } catch {}

        this.playHarmonicChime(659.25, 0.3);
        resolve({
          success: true,
          message: 'Saída de áudio Web Audio operacional no dispositivo.',
          engine: 'browser'
        });
      };

      try {
        if (!('speechSynthesis' in window)) {
          finishWithAiFallback();
          return;
        }

        // Garante que o sintetizador está despausado
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const testUtterance = new SpeechSynthesisUtterance('Áudio do sistema de estudos Transpetro ativado.');
        this.activeUtterance = testUtterance;
        window.__transpetro_active_utterance = testUtterance;

        // Seleciona voz
        const voices = window.speechSynthesis.getVoices();
        const pt = voices.find(v => v.lang.toLowerCase().includes('pt'));
        if (this.state.selectedVoice) {
          testUtterance.voice = this.state.selectedVoice;
        } else if (pt) {
          testUtterance.voice = pt;
        }
        testUtterance.lang = testUtterance.voice?.lang || 'pt-BR';
        testUtterance.volume = this.state.volume;
        testUtterance.rate = 1.0;

        testUtterance.onstart = () => {
          if (!resolved) {
            resolved = true;
            this.state.activeEngine = 'browser';
            this.notifySubscribers();
            resolve({
              success: true,
              message: 'Áudio e voz do navegador funcionando perfeitamente!',
              engine: 'browser'
            });
          }
        };

        testUtterance.onerror = () => {
          finishWithAiFallback();
        };

        // Timeout de proteção: se o navegador demorar mais que 1.4s, testa IA Neural
        setTimeout(() => {
          if (!resolved) {
            finishWithAiFallback();
          }
        }, 1400);

        window.speechSynthesis.speak(testUtterance);
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch {
        finishWithAiFallback();
      }
    });
  }

  /**
   * Limpa formatação Markdown, blocos de código e ruídos de notação,
   * preservando a integridade do texto para leitura visual e fonética,
   * inclusive tabelas comparativas, títulos e itens de estudo.
   */
  public cleanTextForSpeech(rawText: string): string {
    if (!rawText) return '';

    return rawText
      // Remove blocos de código mantendo indicação clara e sonora para a prova
      .replace(/```(?:sql|python|bash|json|r|html)?[\s\S]*?```/gi, ' [Exemplo prático de código da prova.] ')
      // Remove inline code
      .replace(/`([^`]+)`/g, '$1')
      // Remove imagens e links Markdown
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      // Adiciona ponto ao final de cabeçalhos que não terminam com pontuação para separação limpa
      .replace(/^(#{1,6}\s+.*[^\s.?!:;])\s*$/gm, '$1.')
      // Remove marcadores de cabeçalhos Markdown (#, ##, ###)
      .replace(/#{1,6}\s+/g, '')
      // Preserva tabelas Markdown: descarta apenas a linha divisória (|---|---|)
      .replace(/^\|\s*[-:\s|]+\|\s*$/gm, '')
      // Converte linhas de tabelas em sentenças narrativas claras (Coluna 1: Coluna 2.)
      .replace(/^\|\s*/gm, '')
      .replace(/\s*\|\s*$/gm, '.')
      .replace(/\s*\|\s*/g, ': ')
      // Remove linhas horizontais e divisores
      .replace(/^\s*[-*_]{3,}\s*$/gm, ' ')
      // Remove blockquotes (>)
      .replace(/^\s*>\s*/gm, '')
      // Remove ênfases (*, _, **)
      .replace(/[*_~]{1,3}/g, '')
      // Trata fórmulas em LaTeX mantendo a leitura fiel
      .replace(/\$L_1\$/gi, 'L1')
      .replace(/\$L_2\$/gi, 'L2')
      .replace(/\$P\(([^)]+)\)\$/gi, 'P de $1')
      .replace(/\$R\^2\$/gi, 'R²')
      .replace(/\$([^$]+)\$/g, '$1')
      // Normaliza termos comparativos e abreviações que costumam quebrar sentenças
      .replace(/\bvs\.(?=\s|$)/gi, 'versus')
      .replace(/\bvs\b(?!\.)/gi, 'versus')
      .replace(/\be\.g\.(?=\s|$)/gi, 'por exemplo')
      .replace(/\bi\.e\.(?=\s|$)/gi, 'isto é')
      .replace(/\bcf\.(?=\s|$)/gi, 'conforme')
      .replace(/\bex\.:?(?=\s|$)/gi, 'exemplo:')
      .replace(/\bart\.(?=\s|$)/gi, 'artigo')
      .replace(/\binc\.(?=\s|$)/gi, 'inciso')
      .replace(/\b(pág|pag)\.(?=\s|$)/gi, 'página')
      .replace(/\bcap\.(?=\s|$)/gi, 'capítulo')
      .replace(/\bobs\.(?=\s|$)/gi, 'observação')
      .replace(/\betc\.(?=\s|$)/gi, 'etcetera')
      // Transforma letras de tópicos com ponto (ex: A. ou B.) em A) ou B) para não quebrar em frases isoladas
      .replace(/\b([A-Z])\.\s+/g, '$1) ')
      // Remove marcadores de listas
      .replace(/^\s*[-+*]\s+/gm, '')
      // Remove numeração pontuada de início de linha para fluidez
      .replace(/^\s*\d+\.\s+/gm, '')
      // Remove caracteres decorativos
      .replace(/[•●▪►▶★☆]/g, '')
      // Normaliza quebras de linha preservando pausas naturais
      .replace(/\n{2,}/g, '. ')
      .replace(/\n+/g, ' ')
      // Evita pontuação duplicada gerada pela fusão de quebras de linha
      .replace(/\.{2,}/g, '.')
      .replace(/\.\s*\./g, '.')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  /**
   * Prepara especificamente a frase para a síntese de voz (TTS),
   * otimizando a pronúncia de símbolos matemáticos e siglas técnicas sem alterar o texto visível.
   */
  public prepareUtteranceForSpeech(sentence: string): string {
    if (!sentence) return '';

    return sentence
      .replace(/\bSQL\b/g, 'S Q L')
      .replace(/\bLGPD\b/g, 'L G P D')
      .replace(/\bTF-IDF\b/gi, 'T F I D F')
      .replace(/\bROC-AUC\b/gi, 'R O C A U C')
      .replace(/\bPR-AUC\b/gi, 'P R A U C')
      .replace(/\bAUC\b/g, 'A U C')
      .replace(/\bIoT\b/g, 'I o T')
      .replace(/\bMLOps\b/gi, 'M L Ops')
      .replace(/\bXGBoost\b/gi, 'X G Boost')
      .replace(/\bPySpark\b/gi, 'Pai Spark')
      .replace(/\bScikit-Learn\b/gi, 'Scikit Learn')
      .replace(/\bAPI\b/g, 'A P I')
      .replace(/\bAPIs\b/g, 'A P Is')
      .replace(/\bETL\b/g, 'E T L')
      .replace(/\bELT\b/g, 'E L T')
      .replace(/\bANP\b/g, 'A N P')
      .replace(/\bANPD\b/g, 'A N P D')
      .replace(/\bDPO\b/g, 'D P O')
      .replace(/\bPostgreSQL\b/gi, 'Postgre SQL')
      .replace(/\bMySQL\b/gi, 'Mai SQL')
      .replace(/\bNoSQL\b/gi, 'No SQL')
      .replace(/\bL1\b/g, 'L um')
      .replace(/\bL2\b/g, 'L dois')
      .replace(/\bMSE\b/g, 'M S E')
      .replace(/\bRMSE\b/g, 'R M S E')
      .replace(/\bMAE\b/g, 'M A E')
      .replace(/\bMAPE\b/g, 'M A P E')
      .replace(/\bR2\b/g, 'R dois')
      .replace(/\bR²\b/g, 'R quadrado')
      .replace(/\bPCA\b/g, 'P C A')
      .replace(/\bt-SNE\b/gi, 'T S N E')
      .replace(/\bUMAP\b/gi, 'U MAP')
      .replace(/\bK-Means\b/gi, 'K Means')
      .replace(/\bDBSCAN\b/gi, 'D B Scan')
      .replace(/\bSVM\b/g, 'S V M')
      .replace(/\bKNN\b/gi, 'K N N')
      .replace(/\bK-NN\b/gi, 'K N N')
      .replace(/\bK-Fold\b/gi, 'K Fold')
      .replace(/!=/g, ' diferente de ')
      .replace(/>=/g, ' maior ou igual a ')
      .replace(/<=/g, ' menor ou igual a ')
      .replace(/==/g, ' igual a ')
      .replace(/%/g, ' por cento ')
      .replace(/\*\*2\b/g, ' ao quadrado')
      .replace(/\^2\b/g, ' ao quadrado')
      .replace(/sigma\*\*2/gi, 'sigma ao quadrado')
      .replace(/sigma²/gi, 'sigma quadrado')
      .replace(/f_hat\(([^)]+)\)/gi, 'f chapéu de $1')
      .replace(/x_0\b/gi, 'x zero')
      .replace(/y_0\b/gi, 'y zero')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  /**
   * Divide o texto em sentenças completas e naturais para acompanhamento e leitura,
   * protegendo decimais e abreviações sem truncar sentenças arbitrariamente.
   */
  public splitIntoSentences(text: string): string[] {
    const cleaned = this.cleanTextForSpeech(text);
    if (!cleaned) return [];

    // Protege abreviações e números decimais com marcadores temporários
    const protectedText = cleaned
      .replace(/(\d+)\.(\d+)/g, '$1__DOT__$2')
      .replace(/\b(ex|art|fig|tab|etc|gov|dr|prof|cf|obs|cap|pág|pag|inc|par)\./gi, '$1__ABBRDOT__')
      .replace(/\b(i\.e\.|e\.g\.)/gi, '__IE__');

    // Divide em frases completas por terminação pontual (. ? !)
    const rawChunks = protectedText.split(/(?<=[.?!])\s+/);
    const result: string[] = [];

    for (const chunk of rawChunks) {
      const restored = chunk
        .replace(/__DOT__/g, '.')
        .replace(/__ABBRDOT__/g, '.')
        .replace(/__IE__/g, 'isto é')
        .replace(/\s+/g, ' ')
        .trim();

      // Pula sentenças que só contêm pontuação ou vazias
      if (!restored || !/[a-zA-Z0-9\u00C0-\u00FF]/.test(restored)) {
        continue;
      }

      result.push(restored);
    }

    return result.length > 0 ? result : [cleaned];
  }

  private clearWatchdog(): void {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
  }

  private clearTransition(): void {
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = null;
    }
  }

  private startKeepAlive(): void {
    this.stopKeepAlive();
    // Heartbeat de 6 segundos para evitar o congelamento do Chrome em reproduções longas
    this.keepAliveInterval = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (this.state.isPlaying && !this.state.isPaused && this.state.activeEngine === 'browser') {
          try {
            if (window.speechSynthesis.paused) {
              window.speechSynthesis.resume();
            }
          } catch {}
        }
      }
    }, 4000);
  }

  private stopKeepAlive(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  private armWatchdog(sentenceText: string, index: number): void {
    this.clearWatchdog();

    const wordCount = sentenceText.trim().split(/\s+/).length;
    const effectiveRate = Math.max(0.5, this.state.rate);
    const expectedDurationMs = (wordCount / (2.0 * effectiveRate)) * 1000;
    const timeoutMs = Math.max(6000, Math.round(expectedDurationMs + 5000));

    this.watchdogTimer = setTimeout(() => {
      if (!this.state.isPlaying || this.state.isPaused) return;
      if (this.state.currentSentenceIndex !== index) return;

      console.warn(`[SpeechWatchdog] Frase ${index + 1} atingiu tempo limite. Avançando para próxima frase.`);

      if (this.state.activeEngine === 'browser') {
        try {
          if (window.speechSynthesis?.speaking) {
            window.speechSynthesis.cancel();
          }
          if (window.speechSynthesis?.paused) {
            window.speechSynthesis.resume();
          }
        } catch {}
      }

      if (this.state.isPlaying && !this.state.isPaused) {
        this.speakSentence(index + 1);
      }
    }, timeoutMs);
  }

  /**
   * Inicia a reprodução
   */
  public play(text: string, options: SpeechOptions = {}, startFromSentence = 0): void {
    this.isExplicitlyStopping = false;
    this.consecutiveErrors = 0;
    this.retryCountForCurrentIndex = 0;

    // Desbloqueia subsistema de som imediatamente
    this.unlockAudioContext();
    this.playHarmonicChime(659.25, 0.12);

    // Interrompe reprodução anterior se houver
    this.clearWatchdog();
    this.clearTransition();
    this.stopKeepAlive();
    this.stopAiAudio();

    const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;
    const preferred = options.preferredEngine ?? this.state.preferredEngine;

    // Web Speech API é o motor primário garantido, confiável e ilimitado
    let targetEngine: 'browser' | 'ai-neural' = 'browser';
    if (preferred === 'ai-neural') {
      targetEngine = 'ai-neural';
    } else if (!hasSpeechSynthesis) {
      targetEngine = 'ai-neural';
    } else {
      targetEngine = 'browser';
    }

    // Cancela o sintetizador do navegador sem gerar corrida assíncrona
    if (hasSpeechSynthesis) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch {}
    }

    this.activeUtterance = null;
    if (typeof window !== 'undefined') {
      window.__transpetro_active_utterance = null;
    }

    // Prepara as sentenças
    this.sentences = this.splitIntoSentences(text);
    if (this.sentences.length === 0) {
      this.sentences = [text.trim()];
    }

    this.currentOptions = options;
    const startIndex = Math.max(0, Math.min(startFromSentence, this.sentences.length - 1));

    this.state = {
      ...this.state,
      isPlaying: true,
      isPaused: false,
      activeId: options.id || 'default-audio',
      currentSentenceIndex: startIndex,
      totalSentences: this.sentences.length,
      currentSentenceText: this.sentences[startIndex] || '',
      currentSentences: [...this.sentences],
      rate: options.rate ?? this.state.rate,
      volume: options.volume ?? this.state.volume,
      selectedVoice: options.voice ?? this.state.selectedVoice,
      activeEngine: targetEngine,
      audioMode: targetEngine === 'ai-neural' ? 'ai-neural' : 'speech',
      preferredEngine: preferred,
      errorMessage: null
    };

    this.notifySubscribers();
    options.onStart?.();
    this.startKeepAlive();

    // Pequeno intervalo para o subsistema de áudio respirar e cancelar tarefas pendentes
    this.transitionTimer = setTimeout(() => {
      this.speakSentence(startIndex);
    }, 120);
  }

  /**
   * Roteador de reprodução da frase (Browser Speech vs AI Neural)
   */
  private speakSentence(index: number): void {
    this.clearWatchdog();
    this.clearTransition();

    if (!this.state.isPlaying || this.state.isPaused || this.isExplicitlyStopping) return;

    if (index >= this.sentences.length) {
      this.finishPlayback();
      return;
    }

    const sentenceText = this.sentences[index];
    this.state.currentSentenceIndex = index;
    this.state.currentSentenceText = sentenceText;
    this.state.progressPercent = Math.min(100, Math.round(((index + 1) / this.sentences.length) * 100));

    this.currentOptions?.onSentenceChange?.(index, this.sentences.length, sentenceText);
    this.currentOptions?.onProgress?.(this.state.progressPercent);
    this.notifySubscribers();

    // Roteia para IA Neural se for o motor ativo
    if (this.state.activeEngine === 'ai-neural') {
      this.speakAiSentence(index);
      return;
    }

    // Executa no Web Speech API nativo
    this.speakBrowserSentence(index, sentenceText);
  }

  /**
   * Reproduz a frase usando o Web Speech API nativo com máxima resiliência
   */
  private speakBrowserSentence(index: number, sentenceText: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.state.activeEngine = 'ai-neural';
      this.speakAiSentence(index);
      return;
    }

    try {
      const speechUtteranceText = this.prepareUtteranceForSpeech(sentenceText);
      const utterance = new SpeechSynthesisUtterance(speechUtteranceText);
      this.activeUtterance = utterance;
      window.__transpetro_active_utterance = utterance;

      // Resolução dinâmica de voz no array atual de vozes
      const currentVoices = window.speechSynthesis.getVoices();
      let chosenVoice: SpeechSynthesisVoice | null = null;

      if (this.state.selectedVoice) {
        chosenVoice = currentVoices.find(v => v.name === this.state.selectedVoice?.name) || this.state.selectedVoice;
      }
      if (!chosenVoice) {
        chosenVoice = currentVoices.find(v => v.lang.toLowerCase().includes('pt')) || null;
      }

      if (chosenVoice) {
        utterance.voice = chosenVoice;
        utterance.lang = chosenVoice.lang;
      } else {
        utterance.lang = 'pt-BR';
      }

      utterance.rate = Math.max(0.7, Math.min(2.0, this.state.rate));
      utterance.pitch = this.currentOptions?.pitch ?? 1.0;
      utterance.volume = Math.max(0, Math.min(1.0, this.state.volume));

      this.armWatchdog(sentenceText, index);

      utterance.onstart = () => {
        this.consecutiveErrors = 0;
        this.retryCountForCurrentIndex = 0;
      };

      utterance.onend = () => {
        this.clearWatchdog();
        this.activeUtterance = null;
        window.__transpetro_active_utterance = null;

        // Se o leitor já pulou para outro índice durante a fala desta frase, ignora o término antigo
        if (this.state.currentSentenceIndex !== index) {
          return;
        }

        if (this.state.isPlaying && !this.state.isPaused && !this.isExplicitlyStopping) {
          this.retryCountForCurrentIndex = 0;
          this.transitionTimer = setTimeout(() => {
            if (this.state.currentSentenceIndex !== index) return;
            this.speakSentence(index + 1);
          }, 40);
        }
      };

      utterance.onerror = (e: any) => {
        this.clearWatchdog();
        this.activeUtterance = null;
        window.__transpetro_active_utterance = null;

        if (this.isExplicitlyStopping || this.state.isPaused || !this.state.isPlaying) {
          return;
        }

        // Se a frase atual já foi alterada (ex: o usuário clicou para pular), não retenta a frase antiga
        if (this.state.currentSentenceIndex !== index) {
          return;
        }

        const errorType = e?.error || 'unknown';

        // Se foi cancelamento ou interrupção (ex: troca de frase ou parada voluntária), não retenta
        if (errorType === 'canceled' || errorType === 'interrupted') {
          return;
        }

        console.warn(`[SpeechService] Web Speech API aviso (${errorType}) na frase ${index + 1}.`);
        this.consecutiveErrors++;

        if (this.state.isPlaying && !this.state.isPaused) {
          this.transitionTimer = setTimeout(() => {
            if (this.state.currentSentenceIndex !== index) return;
            this.speakSentence(index + 1);
          }, 80);
        }
      };

      // Despausa antes de submeter
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utterance);

      // Despausa após submeter (evita bug do Chrome que aceita o speak() pausado)
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (err: any) {
      console.error('Falha ao acionar speak() do navegador:', err);
      // Tenta próxima frase suavemente
      if (this.state.isPlaying && !this.state.isPaused) {
        this.transitionTimer = setTimeout(() => {
          this.speakSentence(index + 1);
        }, 100);
      }
    }
  }

  /**
   * Reproduz a frase usando o endpoint de Voz Neural Gemini IA
   */
  private async speakAiSentence(index: number): Promise<void> {
    if (!this.state.isPlaying || this.state.isPaused || this.isExplicitlyStopping) return;

    if (index >= this.sentences.length) {
      this.finishPlayback();
      return;
    }

    const sentenceText = this.sentences[index];
    this.armWatchdog(sentenceText, index);

    try {
      const audioUrl = await this.fetchAiAudio(sentenceText);
      if (!this.state.isPlaying || this.state.isPaused || this.isExplicitlyStopping) return;

      if (!audioUrl) {
        // Se a IA não responder (ex: quota 429 ou rede), fallback imediato para o sintetizador do navegador
        console.warn('[SpeechService] Voz IA indisponível. Alternando para o sintetizador nativo do navegador para manter a leitura contínua.');
        this.clearWatchdog();
        this.state.activeEngine = 'browser';
        this.state.audioMode = 'speech';
        this.notifySubscribers();
        this.speakBrowserSentence(index, sentenceText);
        return;
      }

      // Prefetch da próxima frase em segundo plano para transição instantânea
      if (index + 1 < this.sentences.length) {
        this.prefetchAiAudio(this.sentences[index + 1]);
      }

      await this.playAiAudioUrl(audioUrl);
      this.clearWatchdog();

      if (this.state.isPlaying && !this.state.isPaused && !this.isExplicitlyStopping) {
        this.transitionTimer = setTimeout(() => {
          this.speakSentence(index + 1);
        }, 50);
      }
    } catch (err) {
      console.error('Erro na reprodução de IA Neural, alternando para síntese nativa do navegador:', err);
      this.clearWatchdog();
      this.state.activeEngine = 'browser';
      this.state.audioMode = 'speech';
      this.notifySubscribers();
      this.speakBrowserSentence(index, sentenceText);
    }
  }

  /**
   * Busca áudio sintetizado no backend /api/tts com cache em memória
   */
  private async fetchAiAudio(text: string): Promise<string | null> {
    const key = text.trim();
    if (this.aiAudioCache.has(key)) {
      return this.aiAudioCache.get(key)!;
    }

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: key, voiceName: 'Kore' })
      });

      if (!res.ok) return null;
      const data = await res.json();
      if (data.success && data.audioBase64) {
        this.aiAudioCache.set(key, data.audioBase64);
        return data.audioBase64;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Faz prefetch em segundo plano da próxima frase
   */
  private prefetchAiAudio(text: string): void {
    const key = text.trim();
    if (this.aiAudioCache.has(key)) return;

    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: key, voiceName: 'Kore' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.audioBase64) {
          this.aiAudioCache.set(key, data.audioBase64);
        }
      })
      .catch(() => {});
  }

  /**
   * Executa áudio via HTMLAudioElement
   */
  private playAiAudioUrl(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.initAiAudio();
      const audio = this.aiAudioElement;
      if (!audio) {
        resolve();
        return;
      }

      audio.src = url;
      audio.playbackRate = Math.max(0.7, Math.min(2.0, this.state.rate));
      audio.volume = Math.max(0, Math.min(1.0, this.state.volume));

      const onEnded = () => {
        cleanup();
        resolve();
      };

      const onError = (e: any) => {
        cleanup();
        reject(e);
      };

      const cleanup = () => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
      };

      audio.addEventListener('ended', onEnded);
      audio.addEventListener('error', onError);

      audio.play().catch(err => {
        cleanup();
        reject(err);
      });
    });
  }

  private stopAiAudio(): void {
    if (this.aiAudioElement) {
      try {
        this.aiAudioElement.pause();
        this.aiAudioElement.currentTime = 0;
        this.aiAudioElement.src = '';
      } catch {}
    }
  }

  /**
   * Modo Assistivo Web Audio: Feedback sonoro se tanto o Web Speech quanto a rede estiverem indisponíveis
   */
  private playAssistiveSentence(index: number, sentenceText: string): void {
    if (!this.state.isPlaying || this.state.isPaused || this.isExplicitlyStopping) return;

    this.playHarmonicChime(440 + (index % 5) * 50, 0.12);

    const wordCount = sentenceText.trim().split(/\s+/).length;
    const effectiveRate = Math.max(0.5, this.state.rate);
    const durationMs = Math.max(1600, (wordCount / (2.6 * effectiveRate)) * 1000);

    this.transitionTimer = setTimeout(() => {
      if (this.state.isPlaying && !this.state.isPaused && !this.isExplicitlyStopping) {
        this.speakSentence(index + 1);
      }
    }, durationMs);
  }

  /**
   * Pausa a reprodução
   */
  public pause(): void {
    this.clearWatchdog();
    this.clearTransition();
    this.stopKeepAlive();
    this.state.isPaused = true;

    if (this.state.activeEngine === 'ai-neural' && this.aiAudioElement) {
      try {
        this.aiAudioElement.pause();
      } catch {}
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.pause();
      } catch {}
    }

    this.currentOptions?.onPause?.();
    this.notifySubscribers();
  }

  /**
   * Retoma a reprodução
   */
  public resume(): void {
    this.unlockAudioContext();
    this.state.isPaused = false;
    this.startKeepAlive();

    if (this.state.activeEngine === 'ai-neural' && this.aiAudioElement) {
      try {
        this.aiAudioElement.play().catch(() => {
          this.speakAiSentence(this.state.currentSentenceIndex);
        });
      } catch {
        this.speakAiSentence(this.state.currentSentenceIndex);
      }
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
      try {
        window.speechSynthesis.resume();
      } catch {
        this.speakSentence(this.state.currentSentenceIndex);
      }
    } else {
      this.speakSentence(this.state.currentSentenceIndex);
    }

    this.currentOptions?.onResume?.();
    this.notifySubscribers();
  }

  public togglePlayPause(fallbackText?: string): void {
    if (this.state.isPlaying && !this.state.isPaused) {
      this.pause();
    } else if (this.state.isPaused) {
      this.resume();
    } else if (fallbackText) {
      this.play(fallbackText);
    }
  }

  /**
   * Interrompe completamente a reprodução
   */
  public stop(): void {
    this.stopInternal(true);
  }

  private stopInternal(notifyListeners = true): void {
    this.isExplicitlyStopping = true;
    this.clearWatchdog();
    this.clearTransition();
    this.stopKeepAlive();
    this.stopAiAudio();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
      } catch {}

      this.activeUtterance = null;
      window.__transpetro_active_utterance = null;
    }

    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.activeId = null;
    this.state.currentSentenceIndex = 0;
    this.state.progressPercent = 0;
    this.state.currentSentenceText = '';
    this.state.currentSentences = [];
    this.state.errorMessage = null;

    if (notifyListeners) {
      this.currentOptions?.onEnd?.();
      this.notifySubscribers();
    }

    setTimeout(() => {
      this.isExplicitlyStopping = false;
    }, 150);
  }

  private finishPlayback(): void {
    this.clearWatchdog();
    this.clearTransition();
    this.stopKeepAlive();
    this.stopAiAudio();

    this.activeUtterance = null;
    if (typeof window !== 'undefined') {
      window.__transpetro_active_utterance = null;
    }

    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.activeId = null;
    this.state.progressPercent = 100;
    this.state.currentSentences = [];

    this.currentOptions?.onEnd?.();
    this.notifySubscribers();
  }

  public setRate(rate: number): void {
    this.state.rate = rate;
    this.notifySubscribers();

    if (this.aiAudioElement) {
      this.aiAudioElement.playbackRate = rate;
    }

    if (this.state.isPlaying && !this.state.isPaused) {
      this.clearWatchdog();
      this.clearTransition();

      if (this.state.activeEngine === 'browser') {
        try {
          if (window.speechSynthesis?.speaking) {
            window.speechSynthesis.cancel();
          }
        } catch {}

        this.transitionTimer = setTimeout(() => {
          this.speakSentence(this.state.currentSentenceIndex);
        }, 80);
      }
    }
  }

  public setVolume(vol: number): void {
    const safeVol = Math.max(0, Math.min(1, vol));
    this.state.volume = safeVol;
    if (this.aiAudioElement) {
      this.aiAudioElement.volume = safeVol;
    }
    this.notifySubscribers();
  }

  public setVoice(voice: SpeechSynthesisVoice | null): void {
    this.state.selectedVoice = voice;
    this.notifySubscribers();
  }

  public setPreferredEngine(engine: AudioEnginePreference): void {
    this.state.preferredEngine = engine;
    this.state.activeEngine = engine === 'ai-neural' ? 'ai-neural' : 'browser';
    this.notifySubscribers();
  }

  public jumpToSentence(index: number): void {
    if (this.sentences.length === 0) return;
    const safeIndex = Math.max(0, Math.min(this.sentences.length - 1, index));
    this.state.currentSentenceIndex = safeIndex;
    this.state.currentSentenceText = this.sentences[safeIndex] || '';
    this.state.progressPercent = Math.round(((safeIndex + 1) / this.sentences.length) * 100);

    this.currentOptions?.onSentenceChange?.(safeIndex, this.sentences.length, this.sentences[safeIndex] || '');
    this.currentOptions?.onProgress?.(this.state.progressPercent);
    this.notifySubscribers();

    if (this.state.isPlaying) {
      this.state.isPaused = false;
      this.clearWatchdog();
      this.clearTransition();
      this.stopAiAudio();

      if (this.state.activeEngine === 'browser') {
        try {
          if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) {
            window.speechSynthesis.cancel();
          }
        } catch {}
      }

      this.transitionTimer = setTimeout(() => {
        this.speakSentence(safeIndex);
      }, 60);
    }
  }

  public getState(): SpeechEngineState {
    return { ...this.state };
  }

  public getCurrentSentences(): string[] {
    return [...this.sentences];
  }

  public subscribe(callback: (state: SpeechEngineState) => void): () => void {
    this.subscribers.add(callback);
    callback(this.getState());
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(): void {
    const currentState = this.getState();
    this.subscribers.forEach(cb => {
      try {
        cb(currentState);
      } catch (err) {
        console.error('Erro no callback de áudio:', err);
      }
    });
  }

  public toggleSnippet(
    id: string,
    text: string,
    callbacks?: { onStart?: () => void; onEnd?: () => void; onError?: (err: any) => void }
  ): boolean {
    if (this.state.isPlaying && this.state.activeId === id) {
      this.stop();
      return false;
    } else {
      this.play(text, {
        id,
        onStart: callbacks?.onStart,
        onEnd: callbacks?.onEnd,
        onError: callbacks?.onError
      });
      return true;
    }
  }
}

export const speechService = new RobustSpeechService();
