import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Code2, 
  GraduationCap, 
  HelpCircle, 
  RefreshCw, 
  Terminal, 
  Zap, 
  ArrowRight,
  Headphones,
  VolumeX,
  Volume2,
  History,
  Download,
  BookMarked,
  Maximize2,
  Minimize2,
  BookOpen,
  AlignLeft,
  Columns,
  Type,
  X,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Link2,
  ExternalLink,
  Eye,
  Plus,
  UploadCloud,
  Palette,
  Layers,
  Scan,
  Highlighter,
  CheckCheck,
  Hash,
  Play,
  Pause,
  Radio,
  Target
} from 'lucide-react';
import { ChatMessage, RequestedSubject, ChatAttachment, GeneratedImageMeta } from '../types';
import { 
  saveRequestedSubject, 
  deduceSubjectMetadata, 
  getRequestedSubjects 
} from '../services/historyStorage';
import { downloadRequestedSubjectPDF } from '../services/pdfGenerator';
import { speechService } from '../services/speechService';
import { cleanCesgranrioExamNotation } from '../utils/mathNotation';
import { CodeBlockHighlight } from './CodeBlockHighlight';
import { ImageScannerOverlay } from './ImageScannerOverlay';
import { ImageExplainerModal } from './ImageExplainerModal';

const CHAT_STORAGE_KEY = 'transpetro_agent_chat_messages_v2';

interface AgentChatProps {
  onNavigateToSimulator?: () => void;
  onNavigateToDiscursive?: () => void;
  onNavigateToAudio?: () => void;
  onNavigateToHistory?: () => void;
  onNavigateToBooks?: () => void;
  pendingPrompt?: string | null;
  onClearPendingPrompt?: () => void;
}

export const AgentChat: React.FC<AgentChatProps> = ({
  onNavigateToSimulator,
  onNavigateToDiscursive,
  onNavigateToAudio,
  onNavigateToHistory,
  onNavigateToBooks,
  pendingPrompt,
  onClearPendingPrompt
}) => {
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [generatingPdfMsgId, setGeneratingPdfMsgId] = useState<string | null>(null);
  const [historyCount, setHistoryCount] = useState<number>(() => {
    return getRequestedSubjects().length;
  });

  // Full-screen Chat Maximization State
  const [isChatMaximized, setIsChatMaximized] = useState<boolean>(false);
  const [chatTextSize, setChatTextSize] = useState<'sm' | 'base' | 'lg' | 'xl'>(() => {
    try {
      const saved = localStorage.getItem('tp_agent_chat_fontsize');
      if (saved === 'sm' || saved === 'base' || saved === 'lg' || saved === 'xl') return saved;
    } catch {}
    return 'base';
  });
  const [chatWidthMode, setChatWidthMode] = useState<'reading' | 'full'>('reading');

  // Single-message reading expansion modal
  const [expandedReadingMessage, setExpandedReadingMessage] = useState<ChatMessage | null>(null);
  const [readingMessageTextSize, setReadingMessageTextSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [readingMessageWidthMode, setReadingMessageWidthMode] = useState<'reading' | 'full'>('reading');

  const handleSetChatTextSize = (size: 'sm' | 'base' | 'lg' | 'xl') => {
    setChatTextSize(size);
    try {
      localStorage.setItem('tp_agent_chat_fontsize', size);
    } catch {}
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (expandedReadingMessage) {
          setExpandedReadingMessage(null);
        } else if (isChatMaximized) {
          setIsChatMaximized(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedReadingMessage, isChatMaximized]);

  const getTextSizeClass = (size: 'sm' | 'base' | 'lg' | 'xl') => {
    switch (size) {
      case 'sm':
        return 'text-xs sm:text-sm leading-relaxed';
      case 'base':
        return 'text-sm sm:text-base leading-relaxed';
      case 'lg':
        return 'text-base sm:text-lg leading-relaxed';
      case 'xl':
        return 'text-lg sm:text-xl leading-loose';
      default:
        return 'text-sm sm:text-base leading-relaxed';
    }
  };

  const getProseSizeClass = (size: 'sm' | 'base' | 'lg' | 'xl') => {
    switch (size) {
      case 'sm':
        return 'text-xs sm:text-sm prose-p:text-xs sm:prose-p:text-sm prose-headings:text-base prose-h1:text-lg prose-h2:text-base prose-h3:text-sm prose-code:text-xs';
      case 'base':
        return 'text-sm sm:text-base prose-p:text-sm sm:prose-p:text-base prose-headings:text-lg prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-code:text-sm';
      case 'lg':
        return 'text-base sm:text-lg prose-p:text-base sm:prose-p:text-lg prose-headings:text-xl prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-code:text-base';
      case 'xl':
        return 'text-lg sm:text-xl prose-p:text-lg sm:prose-p:text-xl prose-headings:text-2xl prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-code:text-lg leading-loose';
      default:
        return 'text-sm sm:text-base';
    }
  };

  const renderFontSizeSelector = (
    currentSize: 'sm' | 'base' | 'lg' | 'xl',
    onSelectSize: (size: 'sm' | 'base' | 'lg' | 'xl') => void,
    showLabel = true
  ) => (
    <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs shadow-inner">
      {showLabel && (
        <span className="px-2 text-slate-400 text-[11px] font-medium hidden sm:inline flex items-center gap-1">
          <Type className="w-3 h-3 text-emerald-400" />
          Fonte:
        </span>
      )}
      {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onSelectSize(size)}
          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg font-bold transition text-xs ${
            currentSize === size
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title={`Tamanho da fonte: ${
            size === 'sm' ? 'Pequeno (A-)' : size === 'base' ? 'Padrão (A)' : size === 'lg' ? 'Grande (A+)' : 'Extra Grande (A++)'
          }`}
        >
          {size === 'sm' ? 'A-' : size === 'base' ? 'A' : size === 'lg' ? 'A+' : 'A++'}
        </button>
      ))}
    </div>
  );

  const handleSpeakMessage = (msgId: string, text: string) => {
    if (speakingMessageId === msgId) {
      speechService.stop();
      setSpeakingMessageId(null);
    } else {
      const cleanVoiceText = cleanCesgranrioExamNotation(text);
      speechService.play(cleanVoiceText, {
        id: msgId,
        rate: 1.05,
        onStart: () => setSpeakingMessageId(msgId),
        onEnd: () => setSpeakingMessageId(null),
        onError: () => setSpeakingMessageId(null)
      });
      setSpeakingMessageId(msgId);
    }
  };

  const getQuestionForMessage = (targetMsg: ChatMessage) => {
    const idx = messages.findIndex(m => m.id === targetMsg.id);
    if (idx > 0 && messages[idx - 1].role === 'user') {
      return messages[idx - 1].content;
    }
    return null;
  };

  useEffect(() => {
    const updateCount = () => {
      setHistoryCount(getRequestedSubjects().length);
    };
    window.addEventListener('tp_subject_history_updated', updateCount);

    const unsubscribe = speechService.subscribe((state) => {
      if (!state.isPlaying) {
        setSpeakingMessageId(null);
      } else if (state.isPlaying && state.activeId) {
        setSpeakingMessageId(state.activeId);
      }
    });

    return () => {
      window.removeEventListener('tp_subject_history_updated', updateCount);
      unsubscribe();
    };
  }, []);

  // Initialize messages from persistent storage or default welcome message
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error reading chat messages from storage:', err);
    }
    return [
      {
        id: 'welcome-01',
        role: 'assistant',
        content: `Olá, futuro **Cientista de Dados da Transpetro**! 🚀

Sou o seu **Agente de IA Especialista no Concurso da Transpetro (Banca Cesgranrio)**. Estou calibrado com 100% do edital de nível superior:
- 📊 **Estatística e Probabilidade** (TCL, Inferência, Testes de Hipótese, Bayes, Regressão)
- 🤖 **Machine Learning & Deep Learning** (XGBoost, Árvores, Redes Neurais, Métricas de Desbalanceamento)
- 🗄️ **Big Data & SQL Avançado** (Window Functions, Apache Spark, Lakehouse, Delta Lake)
- 🐍 **Python & MLOps** (Pandas, Scikit-Learn, Concept Drift, Monitoramento, SHAP)
- 📜 **Governança & LGPD** (DAMA DMBOK, Qualidade de Dados, Ética em IA)
- 🚢 **Casos Reais Transpetro** (Dutos, Telemetria de Sensores, Navios Petroleiros e Terminais)

Como posso te ajudar hoje? Escolha um modo acima ou envie sua dúvida!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'tutor'
      }
    ];
  });

  // Save messages to persistent storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error('Error saving chat messages to storage:', err);
    }
  }, [messages]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedMode, setSelectedMode] = useState<'tutor' | 'cesgranrio_traps' | 'debugger' | 'quiz'>('tutor');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Staged Attachments (Images, PDFs, Links)
  const [stagedAttachments, setStagedAttachments] = useState<ChatAttachment[]>([]);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [linkInputUrl, setLinkInputUrl] = useState<string>('');
  const [linkInputTitle, setLinkInputTitle] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<{ url: string; name: string } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  // Image Generation State & Modal
  const [isImageGenModalOpen, setIsImageGenModalOpen] = useState<boolean>(false);
  const [imageGenPrompt, setImageGenPrompt] = useState<string>('');
  const [imageGenTopic, setImageGenTopic] = useState<string>('');
  const [imageGenStyle, setImageGenStyle] = useState<'architecture' | 'statistics' | 'ml_pipeline' | 'decision_tree' | 'transpetro_ops' | 'infographic'>('architecture');
  const [imageGenAspectRatio, setImageGenAspectRatio] = useState<'16:9' | '1:1' | '4:3'>('16:9');
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [imageGenError, setImageGenError] = useState<string | null>(null);

  // Image Scanning Animation States
  const [scanningImages, setScanningImages] = useState<Record<string, boolean>>({});
  const [explainingModalImage, setExplainingModalImage] = useState<{ url: string; name: string } | null>(null);

  // Programming Code Copy & Highlight States for Tutor Especialista
  const [copiedCodeMsgId, setCopiedCodeMsgId] = useState<string | null>(null);
  const [highlightedMsgIds, setHighlightedMsgIds] = useState<Record<string, boolean>>({});

  const hasCodeInMessage = (text: string): boolean => {
    return /```|(?:\bdef\s+\w+\(|\bimport\s+(?:pandas|numpy|pyspark|sklearn|torch|tensorflow)|\bSELECT\s+.+\s+FROM\b|\bfrom\s+\w+\s+import\b|\bpyspark\b|\bSparkSession\b)/i.test(text);
  };

  const handleCopyMessageCode = (msg: ChatMessage) => {
    // Extract code from ``` blocks or take code lines
    const codeBlockRegex = /```(?:[a-zA-Z0-9_-]+)?\s*([\s\S]*?)```/g;
    let match;
    const codeSnippets: string[] = [];
    while ((match = codeBlockRegex.exec(msg.content)) !== null) {
      codeSnippets.push(match[1].trim());
    }

    const codeToCopy = codeSnippets.length > 0 
      ? codeSnippets.join('\n\n# --- Bloco de Código Sequencial ---\n\n') 
      : msg.content;

    navigator.clipboard.writeText(codeToCopy);
    setCopiedCodeMsgId(msg.id);
    setTimeout(() => setCopiedCodeMsgId(null), 2200);
  };

  const handleToggleMessageCodeHighlight = (msgId: string) => {
    setHighlightedMsgIds(prev => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  const handleToggleImageScan = (url: string) => {
    setScanningImages(prev => ({
      ...prev,
      [url]: !prev[url]
    }));
  };

  const handleExplainImage = (url: string, name: string) => {
    setScanningImages(prev => ({
      ...prev,
      [url]: true
    }));

    const explainPrompt = `🔍 Explique detalhadamente esta imagem/gráfico (${name || 'análise visual'}) no padrão oficial da banca Cesgranrio para a Transpetro: examine os eixos, curvas, fórmulas e aponte as pegadinhas que costumam ser cobradas em prova sobre o assunto.`;

    const imageAttachment: ChatAttachment = {
      id: `img-${Date.now()}`,
      type: 'image',
      name: name || 'grafico_analise.png',
      dataUrl: url
    };

    handleSendMessage(explainPrompt, 'tutor', [imageAttachment]);
  };

  // Custom Markdown Components with CodeBlockHighlight
  const markdownComponents = {
    pre({ children }: any) {
      return <div className="not-prose my-3.5">{children}</div>;
    },
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      if (inline || (!match && !codeString.includes('\n'))) {
        return (
          <code className="px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-[0.88em] font-medium tracking-tight" {...props}>
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

  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleImageFiles = async (files: FileList | File[]) => {
    const newAttachments: ChatAttachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        alert(`O arquivo "${file.name}" não é uma imagem compatível.`);
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert(`A imagem "${file.name}" excede o tamanho limite de 15MB.`);
        continue;
      }
      try {
        const dataUrl = await readFileAsDataUrl(file);
        newAttachments.push({
          id: `att-img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          type: 'image',
          name: file.name,
          size: file.size,
          mimeType: file.type,
          dataUrl
        });
      } catch (err) {
        console.error('Erro ao ler imagem:', err);
      }
    }
    if (newAttachments.length > 0) {
      setStagedAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const handlePdfFiles = async (files: FileList | File[]) => {
    const newAttachments: ChatAttachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert(`O arquivo "${file.name}" não é um documento PDF válido.`);
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert(`O PDF "${file.name}" excede o tamanho máximo de 15MB.`);
        continue;
      }
      try {
        const dataUrl = await readFileAsDataUrl(file);
        newAttachments.push({
          id: `att-pdf-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          type: 'pdf',
          name: file.name,
          size: file.size,
          mimeType: 'application/pdf',
          dataUrl
        });
      } catch (err) {
        console.error('Erro ao ler PDF:', err);
      }
    }
    if (newAttachments.length > 0) {
      setStagedAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const handleAddLink = () => {
    let url = linkInputUrl.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    const title = linkInputTitle.trim() || url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
    const newLinkAtt: ChatAttachment = {
      id: `att-link-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: 'link',
      name: title,
      linkUrl: url,
      linkTitle: title
    };
    setStagedAttachments(prev => [...prev, newLinkAtt]);
    setLinkInputUrl('');
    setLinkInputTitle('');
    setIsLinkModalOpen(false);
  };

  const removeStagedAttachment = (id: string) => {
    setStagedAttachments(prev => prev.filter(a => a.id !== id));
  };

  const clearStagedAttachments = () => {
    setStagedAttachments([]);
  };

  const handleOpenImageGenModal = (initialPrompt?: string, initialTopic?: string, initialStyle?: typeof imageGenStyle) => {
    setImageGenPrompt(initialPrompt || '');
    setImageGenTopic(initialTopic || '');
    if (initialStyle) setImageGenStyle(initialStyle);
    setImageGenError(null);
    setIsImageGenModalOpen(true);
  };

  const handleDownloadImage = (url: string, title?: string) => {
    const isSvg = url.startsWith('data:image/svg+xml');
    const safeName = (title || 'diagrama_transpetro').toLowerCase().replace(/[^a-z0-9_-]/g, '_').slice(0, 50);
    const ext = isSvg ? 'svg' : 'png';
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeName}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleGenerateImageForMessage = (msg: ChatMessage) => {
    const userQ = getQuestionForMessage(msg);
    const titleMatch = msg.content.match(/^###?\s+(.+)$/m);
    const promptGuess = userQ || (titleMatch ? titleMatch[1].replace(/[*#]/g, '').trim() : msg.content.slice(0, 120));
    const topicGuess = titleMatch ? titleMatch[1].replace(/[*#]/g, '').trim() : 'Ciência de Dados Transpetro';

    let suggestedStyle: typeof imageGenStyle = 'architecture';
    const lower = (promptGuess + ' ' + msg.content).toLowerCase();
    if (lower.includes('roc') || lower.includes('p-valor') || lower.includes('regress') || lower.includes('estatíst') || lower.includes('probabilidade') || lower.includes('distribui') || lower.includes('confus')) {
      suggestedStyle = 'statistics';
    } else if (lower.includes('árvore') || lower.includes('gini') || lower.includes('entropia') || lower.includes('random forest') || lower.includes('xgboost') || lower.includes('boosting')) {
      suggestedStyle = 'decision_tree';
    } else if (lower.includes('duto') || lower.includes('sensor') || lower.includes('telemetria') || lower.includes('pressão') || lower.includes('vazamento') || lower.includes('navio') || lower.includes('scada')) {
      suggestedStyle = 'transpetro_ops';
    } else if (lower.includes('spark') || lower.includes('lakehouse') || lower.includes('delta') || lower.includes('pipeline') || lower.includes('ingest') || lower.includes('kafka')) {
      suggestedStyle = 'architecture';
    } else {
      suggestedStyle = 'infographic';
    }

    handleOpenImageGenModal(promptGuess, topicGuess, suggestedStyle);
  };

  const handleExecuteImageGeneration = async (
    promptToGen: string,
    styleToGen: typeof imageGenStyle,
    aspectRatioToGen: typeof imageGenAspectRatio,
    topicToGen?: string
  ) => {
    if (!promptToGen.trim() || isGeneratingImage) return;

    setIsGeneratingImage(true);
    setImageGenError(null);

    const userMsgText = `🎨 Gerar imagem / diagrama técnico: "${promptToGen.trim()}"`;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'tutor'
    };

    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToGen.trim(),
          style: styleToGen,
          aspectRatio: aspectRatioToGen,
          topic: topicToGen || 'Ciência de Dados Transpetro'
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Erro ${res.status} ao gerar imagem`);
      }

      const data = await res.json();
      if (!data.success || !data.image) {
        throw new Error('Falha ao processar o arquivo visual gerado.');
      }

      const genImg: GeneratedImageMeta = data.image;

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `### 🎨 ${genImg.title}

${genImg.description}

#### 📌 Destaques Técnicos & Aplicação na Prova Cesgranrio:
${(genImg.technicalDetails || []).map(d => `- **${d}**`).join('\n')}

${genImg.keyFormulaOrMetric ? `> **Equação / Métrica Chave:** \`${genImg.keyFormulaOrMetric}\`\n\n` : ''}💡 *Dica:* Clique na imagem gerada abaixo para ampliá-la em tela cheia com alta resolução (Lightbox) ou para fazer o download em alta definição.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'tutor',
        generatedImages: [genImg]
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsImageGenModalOpen(false);

      // Register in subject history
      const meta = deduceSubjectMetadata(genImg.title + ' ' + promptToGen);
      saveRequestedSubject({
        title: genImg.title,
        source: 'agent_chat',
        category: meta.category,
        block: meta.block,
        userQuery: `Geração de Imagem: ${promptToGen}`,
        agentResponse: assistantMsg.content,
        mode: 'tutor',
        tags: [...meta.tags, 'Diagrama Visual', 'Imagem Gerada'],
        status: 'answered'
      });

    } catch (err: any) {
      console.error('Erro ao gerar imagem:', err);
      setImageGenError(err.message || 'Erro na síntese da imagem.');
      const errAssistantMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Não foi possível renderizar a representação visual de "${promptToGen}" no momento: ${err.message || 'Instabilidade temporária'}. Você pode tentar novamente clicando no botão "Gerar Imagem".`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errAssistantMsg]);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const imgFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) imgFiles.push(file);
      }
    }
    if (imgFiles.length > 0) {
      handleImageFiles(imgFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = e.dataTransfer?.files;
    if (!files || files.length === 0) return;
    const images: File[] = [];
    const pdfs: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        images.push(file);
      } else if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        pdfs.push(file);
      }
    }
    if (images.length > 0) handleImageFiles(images);
    if (pdfs.length > 0) handlePdfFiles(pdfs);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (pendingPrompt && pendingPrompt.trim()) {
      handleSendMessage(pendingPrompt.trim());
      if (onClearPendingPrompt) {
        onClearPendingPrompt();
      }
    }
  }, [pendingPrompt]);

  const quickPrompts = [
    {
      label: 'Pegadinha: P-valor na Cesgranrio',
      mode: 'cesgranrio_traps' as const,
      prompt: 'Quais são as principais pegadinhas da Cesgranrio sobre interpretação de p-valor e testes de hipóteses estatísticos?'
    },
    {
      label: '🎨 Gerar Diagrama: Pipeline Spark',
      mode: 'tutor' as const,
      prompt: 'Gere uma imagem esquemática da arquitetura Lakehouse Medallion com Apache Spark e Delta Lake na Transpetro.'
    },
    {
      label: '📊 Gerar Gráfico: Curva ROC',
      mode: 'tutor' as const,
      prompt: 'Gere um gráfico com a Curva ROC vs Curva PR e a Matriz de Confusão para a prova Cesgranrio.'
    },
    {
      label: 'Explicar: XGBoost vs Random Forest',
      mode: 'tutor' as const,
      prompt: 'Explique a diferença matemática e prática entre o método de ensemble Bagging (Random Forest) e Boosting (XGBoost), e como regularizar o XGBoost para evitar overfitting em dados de sensores de dutos.'
    },
    {
      label: 'Código: Window Functions no PySpark',
      mode: 'debugger' as const,
      prompt: 'Mostre um exemplo completo em PySpark calculando a média móvel de pressão e o ranking das 3 maiores anomalias de sensores por dia usando Window.partitionBy e orderBy.'
    },
    {
      label: 'Desafio Quiz: Pergunta Inédita',
      mode: 'quiz' as const,
      prompt: 'Faça uma pergunta desafiadora de nível difícil no estilo Cesgranrio sobre Regularização L1/L2 ou Teorema de Bayes para testar meu conhecimento agora!'
    }
  ];

  const [lastSentPrompt, setLastSentPrompt] = useState<string>('');
  const [lastSentMode, setLastSentMode] = useState<typeof selectedMode>('tutor');
  const [lastSentAttachments, setLastSentAttachments] = useState<ChatAttachment[]>([]);

  const handleSendMessage = async (
    customText?: string, 
    customMode?: typeof selectedMode,
    customAttachments?: ChatAttachment[]
  ) => {
    const textToSend = customText !== undefined ? customText : inputPrompt;
    const modeToUse = customMode || selectedMode;
    const attachmentsToSend = customAttachments !== undefined ? customAttachments : stagedAttachments;

    if ((!textToSend.trim() && attachmentsToSend.length === 0) || isLoading) return;

    // Check for natural language image/diagram generation requests
    const isImageRequest = /(gere|gerar|crie|criar|desenhe|desenhar|faça|fazer|ilustre|ilustrar)\s+(uma?\s+)?(imagem|diagrama|esquema|gráfico|ilustração|infográfico)/i.test(textToSend);
    if (isImageRequest && attachmentsToSend.length === 0) {
      setInputPrompt('');
      setStagedAttachments([]);
      const cleanSubject = textToSend.replace(/(por favor|pode|gostaria de)?\s*(gere|gerar|crie|criar|desenhe|desenhar|faça|fazer|ilustre|ilustrar)\s+(uma?\s+)?(imagem|diagrama|esquema|gráfico|ilustração|infográfico)\s*(de|do|da|sobre|mostrando|explicando)?/i, '').trim() || textToSend;
      let style: typeof imageGenStyle = 'architecture';
      const lower = textToSend.toLowerCase();
      if (lower.includes('roc') || lower.includes('gráfico') || lower.includes('estatíst') || lower.includes('confus') || lower.includes('regress')) style = 'statistics';
      else if (lower.includes('árvore') || lower.includes('gini') || lower.includes('random forest') || lower.includes('xgboost')) style = 'decision_tree';
      else if (lower.includes('duto') || lower.includes('sensor') || lower.includes('telemetria') || lower.includes('petróleo') || lower.includes('navio')) style = 'transpetro_ops';
      else if (lower.includes('spark') || lower.includes('lakehouse') || lower.includes('pipeline') || lower.includes('delta')) style = 'architecture';
      else style = 'infographic';

      await handleExecuteImageGeneration(cleanSubject, style, '16:9', cleanSubject);
      return;
    }

    setLastSentPrompt(textToSend.trim());
    setLastSentMode(modeToUse);
    setLastSentAttachments(attachmentsToSend);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: modeToUse,
      attachments: attachmentsToSend.length > 0 ? [...attachmentsToSend] : undefined
    };

    // Filter out previous error messages from the history sent to the model
    const cleanHistory = messages.filter(m => !m.content.startsWith('⚠️'));
    const newHistory = [...cleanHistory, userMessage];
    setMessages([...messages, userMessage]);
    setInputPrompt('');
    setStagedAttachments([]);
    setIsLoading(true);

    // If sending images, activate visual scanning animation during analysis
    if (attachmentsToSend.some(a => a.type === 'image' && a.dataUrl)) {
      attachmentsToSend.forEach(a => {
        if (a.type === 'image' && a.dataUrl) {
          setScanningImages(prev => ({ ...prev, [a.dataUrl!]: true }));
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: newHistory.map(m => ({ 
            role: m.role, 
            content: m.content,
            attachments: m.attachments
          })),
          mode: modeToUse
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro ${response.status} ao comunicar com o servidor`);
      }

      const data = await response.json();
      const cleanContent = cleanCesgranrioExamNotation(data.text || 'Não consegui obter uma resposta do modelo.');
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: cleanContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: modeToUse
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Automatically register this consulted subject in permanent history
      const queryRecordText = textToSend || (attachmentsToSend.length > 0 ? `Análise de ${attachmentsToSend.map(a => a.name).join(', ')}` : 'Consulta Especialista');
      const meta = deduceSubjectMetadata(queryRecordText);
      saveRequestedSubject({
        title: queryRecordText.length > 70 ? queryRecordText.slice(0, 67) + '...' : queryRecordText,
        source: 'agent_chat',
        category: meta.category,
        block: meta.block,
        userQuery: queryRecordText,
        agentResponse: cleanContent,
        mode: modeToUse,
        tags: meta.tags,
        status: 'answered'
      });
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error(error);
      const isTimeout = error.name === 'AbortError';
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: isTimeout 
          ? '⚠️ O tempo limite da requisição expirou devido à sobrecarga temporária dos servidores de IA. Clique em "Tentar Novamente" abaixo para reenviar.'
          : '⚠️ Ocorreu uma instabilidade temporária ao contatar o Agente de IA. Nossa camada de contingência foi atualizada. Clique em "Tentar Novamente" abaixo para obter a resposta.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);

      // Still record to history so user never loses their question prompt
      const queryRecordText = textToSend || (attachmentsToSend.length > 0 ? `Análise de ${attachmentsToSend.map(a => a.name).join(', ')}` : 'Consulta Especialista');
      const meta = deduceSubjectMetadata(queryRecordText);
      saveRequestedSubject({
        title: queryRecordText.length > 70 ? queryRecordText.slice(0, 67) + '...' : queryRecordText,
        source: 'agent_chat',
        category: meta.category,
        block: meta.block,
        userQuery: queryRecordText,
        agentResponse: isTimeout ? 'Tempo limite expirou na consulta.' : 'Ocorreu instabilidade temporária na consulta.',
        mode: modeToUse,
        tags: meta.tags,
        status: 'pending'
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setScanningImages({});
      }, 5000);
    }
  };

  const handleRetryLast = () => {
    if (lastSentPrompt || lastSentAttachments.length > 0) {
      handleSendMessage(lastSentPrompt, lastSentMode, lastSentAttachments);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadMessagePDF = (msg: ChatMessage) => {
    try {
      setGeneratingPdfMsgId(msg.id);
      const msgIndex = messages.findIndex(m => m.id === msg.id);
      let userQuery = 'Aula Especializada Transpetro';
      if (msgIndex > 0 && messages[msgIndex - 1].role === 'user') {
        userQuery = messages[msgIndex - 1].content;
      }
      const meta = deduceSubjectMetadata(userQuery);
      const titleClean = userQuery.length > 50 
        ? userQuery.substring(0, 50).trim() + '...' 
        : userQuery.trim() || 'Consulta Teórica e Prática';
      const subjectRecord: RequestedSubject = {
        id: `chat-${msg.id}`,
        title: titleClean,
        source: 'agent_chat',
        category: meta.category,
        block: meta.block,
        userQuery,
        agentResponse: msg.content,
        timestamp: msg.timestamp,
        isoDate: new Date().toISOString(),
        mode: msg.mode || 'tutor',
        tags: meta.tags,
        status: 'answered'
      };

      setTimeout(() => {
        downloadRequestedSubjectPDF(subjectRecord);
        setGeneratingPdfMsgId(null);
      }, 80);
    } catch (err) {
      console.error(err);
      setGeneratingPdfMsgId(null);
      alert('Não foi possível gerar o PDF desta resposta.');
    }
  };

  const clearChat = () => {
    if (window.confirm('Deseja reiniciar apenas a exibição desta tela de chat?\n\nFique tranquilo: TODOS os seus assuntos solicitados e respostas da IA continuam salvos com segurança na aba "Histórico de Assuntos".')) {
      const resetList: ChatMessage[] = [
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: 'Tela de conversa reiniciada! 🚀\n\nLembre-se: todas as suas dúvidas anteriores e temas de estudo continuam gravados permanentemente na aba **"Histórico de Assuntos"**.\n\nQual assunto do edital da Transpetro você deseja explorar agora?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mode: selectedMode
        }
      ];
      setMessages(resetList);
      try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(resetList));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className={
        isChatMaximized
          ? "fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl flex flex-col p-3 sm:p-5 gap-3 animate-in fade-in duration-200 text-slate-100 overflow-hidden"
          : "flex flex-col h-[calc(100vh-5rem)] max-w-6xl mx-auto p-4 gap-4"
      }>
        
        {/* Top Banner & Mode Selectors */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  Agente Especialista Transpetro 
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Gemini Flash Ativo
                  </span>
                  {isChatMaximized && (
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60 hidden sm:inline-flex items-center gap-1">
                      <Maximize2 className="w-2.5 h-2.5" />
                      Tela Inteira
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-400">Tire dúvidas teóricas, resolva códigos, desmonte pegadinhas da Cesgranrio e treine estudos de caso.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Global Font Size Selector */}
              {renderFontSizeSelector(chatTextSize, handleSetChatTextSize)}

              {/* Reading Width Toggle in Maximized Mode */}
              {isChatMaximized && (
                <button
                  type="button"
                  onClick={() => setChatWidthMode(prev => prev === 'reading' ? 'full' : 'reading')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition"
                  title="Alternar entre largura de leitura confortável e tela inteira"
                >
                  {chatWidthMode === 'reading' ? <AlignLeft className="w-3.5 h-3.5 text-cyan-400" /> : <Columns className="w-3.5 h-3.5 text-cyan-400" />}
                  <span className="hidden sm:inline">{chatWidthMode === 'reading' ? 'Modo Leitura' : 'Largura Total'}</span>
                </button>
              )}

              {/* Maximize / Minimize Chat Button */}
              <button
                id="btn-toggle-maximize-chat"
                type="button"
                onClick={() => setIsChatMaximized(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 ${
                  isChatMaximized
                    ? 'bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                }`}
                title={isChatMaximized ? "Minimizar chat para tela normal (ou pressione Esc)" : "Maximizar chat para visualização ampla em tela inteira"}
              >
                {isChatMaximized ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Minimizar</span>
                    <span className="text-[10px] opacity-75 bg-rose-950/80 px-1 rounded hidden sm:inline">Esc</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Maximizar</span>
                  </>
                )}
              </button>

              {onNavigateToBooks && (
                <button
                  id="open-books-btn"
                  onClick={onNavigateToBooks}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 transition shadow-sm"
                  title="Acessar os 14 Livros Digitais Completos do Edital"
                >
                  <BookMarked className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Livros (14)</span>
                </button>
              )}

              {onNavigateToHistory && (
                <button
                  id="open-history-btn"
                  onClick={onNavigateToHistory}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 transition shadow-sm"
                  title="Acessar Área de Histórico Permanente com todos os assuntos solicitados"
                >
                  <History className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Histórico ({historyCount})</span>
                </button>
              )}

              <button
                id="clear-chat-btn"
                onClick={clearChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition"
                title="Limpar Conversa da Tela (sem apagar o Histórico de Assuntos)"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpar</span>
              </button>
            </div>
          </div>

          {/* Mode Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
            <button
              id="mode-tutor"
              onClick={() => setSelectedMode('tutor')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedMode === 'tutor'
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <div className="font-bold">Tutor Teórico</div>
                <div className="text-[10px] text-slate-400 font-normal">Fórmulas, ML & Estatística</div>
              </div>
            </button>

            <button
              id="mode-traps"
              onClick={() => setSelectedMode('cesgranrio_traps')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedMode === 'cesgranrio_traps'
                  ? 'bg-amber-600/20 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="font-bold">Caça-Pegadinhas</div>
                <div className="text-[10px] text-slate-400 font-normal">Armadilhas Cesgranrio</div>
              </div>
            </button>

            <button
              id="mode-debugger"
              onClick={() => setSelectedMode('debugger')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedMode === 'debugger'
                  ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <div className="text-left">
                <div className="font-bold">Code Lab</div>
                <div className="text-[10px] text-slate-400 font-normal">Python, Spark & SQL</div>
              </div>
            </button>

            <button
              id="mode-quiz"
              onClick={() => setSelectedMode('quiz')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedMode === 'quiz'
                  ? 'bg-purple-600/20 border-purple-500 text-purple-300 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <div className="text-left">
                <div className="font-bold">Quiz Rápido</div>
                <div className="text-[10px] text-slate-400 font-normal">Desafios e perguntas orais</div>
              </div>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-6 space-y-6 shadow-inner ${
          isChatMaximized && chatWidthMode === 'reading' ? 'max-w-4xl mx-auto w-full' : 'w-full'
        }`}>
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-md ${
                    isUser
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-tr from-slate-800 to-slate-700 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {isUser ? 'EU' : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[88%] sm:max-w-[82%] group relative`}>
                  <div
                    className={`rounded-2xl px-4 py-3.5 ${getTextSizeClass(chatTextSize)} ${
                      isUser
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 rounded-tr-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 shadow-xl rounded-tl-none'
                    }`}
                  >
                    {/* Header for assistant message with reading expansion button */}
                    {!isUser && (
                      <div className="mb-2.5 flex items-center justify-between text-[11px] font-semibold pb-2 border-b border-slate-800/80 gap-2">
                        <div className="flex items-center gap-1.5 text-emerald-400/90 truncate">
                          {msg.mode === 'tutor' && <GraduationCap className="w-3.5 h-3.5 shrink-0" />}
                          {msg.mode === 'cesgranrio_traps' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          {msg.mode === 'debugger' && <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                          {msg.mode === 'quiz' && <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                          <span className="capitalize truncate">
                            {msg.mode === 'tutor' && 'Modo Tutor Especialista'}
                            {msg.mode === 'cesgranrio_traps' && 'Análise de Pegadinhas Cesgranrio'}
                            {msg.mode === 'debugger' && 'Code Lab & Algoritmos'}
                            {msg.mode === 'quiz' && 'Simulação Oral'}
                            {!msg.mode && 'Resposta do Especialista'}
                          </span>
                        </div>

                        {/* Dedicated Reading Expansion Mode Button */}
                        <button
                          type="button"
                          onClick={() => setExpandedReadingMessage(msg)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold transition active:scale-95 shadow-sm shrink-0"
                          title="Expandir esta resposta para leitura aprofundada com fonte ajustável"
                        >
                          <BookOpen className="w-3 h-3 text-cyan-400" />
                          <span>Modo Leitura</span>
                          <Maximize2 className="w-2.5 h-2.5 opacity-70" />
                        </button>
                      </div>
                    )}

                    {/* Markdown text with dynamic font size */}
                    <div className={`prose prose-invert prose-emerald max-w-none ${getProseSizeClass(chatTextSize)} leading-relaxed prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0 prose-code:text-emerald-300 prose-code:font-mono prose-table:border prose-table:border-slate-800`}>
                      <ReactMarkdown components={markdownComponents}>{cleanCesgranrioExamNotation(msg.content)}</ReactMarkdown>
                    </div>

                    {/* Message Attachments (Images, PDFs, Links) */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/60 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {msg.attachments.map((att) => {
                            if (att.type === 'image' && att.dataUrl) {
                              const isScanActive = !!scanningImages[att.dataUrl];
                              return (
                                <div
                                  key={att.id}
                                  className="group/img relative rounded-xl overflow-hidden border border-emerald-500/30 hover:border-cyan-400 bg-slate-900 shadow-md transition"
                                >
                                  <div 
                                    onClick={() => setPreviewImage({ url: att.dataUrl!, name: att.name })}
                                    className="relative cursor-pointer"
                                    title="Clique para ampliar a imagem"
                                  >
                                    <img
                                      src={att.dataUrl}
                                      alt={att.name}
                                      className="w-32 h-24 sm:w-40 sm:h-28 object-cover group-hover/img:scale-105 transition duration-200"
                                    />

                                    {/* Laser Scanner Animation Overlay */}
                                    <ImageScannerOverlay
                                      isScanning={isScanActive}
                                      onToggleScan={() => handleToggleImageScan(att.dataUrl!)}
                                      showAlwaysControls={false}
                                    />

                                    <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition gap-1.5 z-10">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPreviewImage({ url: att.dataUrl!, name: att.name });
                                        }}
                                        className="p-1.5 rounded-lg bg-slate-900/90 text-white hover:text-emerald-400 shadow transition"
                                        title="Ampliar em tela cheia"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExplainingModalImage({ url: att.dataUrl!, name: att.name });
                                        }}
                                        className="p-1.5 rounded-lg bg-cyan-600/90 hover:bg-cyan-500 text-white shadow transition flex items-center gap-1 text-[10px] font-bold"
                                        title="Abrir Animação de Análise Visual"
                                      >
                                        <Scan className="w-3.5 h-3.5" />
                                        <span>Animação</span>
                                      </button>
                                    </div>
                                  </div>

                                  {/* Bottom Image Toolbar */}
                                  <div className="p-1.5 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-between gap-1">
                                    <span className="truncate text-[10px] text-slate-300 font-medium max-w-[85px]">{att.name}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleExplainImage(att.dataUrl!, att.name)}
                                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition active:scale-95 ${
                                        isScanActive
                                          ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 shadow-sm'
                                          : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30'
                                      }`}
                                      title="Pedir para o Agente explicar esta imagem com escaneamento animado"
                                    >
                                      <Scan className="w-3 h-3 text-cyan-400" />
                                      <span>Explicar</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                            if (att.type === 'pdf') {
                              return (
                                <div
                                  key={att.id}
                                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs shadow-md transition ${
                                    isUser 
                                      ? 'bg-emerald-700/80 border-emerald-400/40 text-white' 
                                      : 'bg-slate-900 border-rose-500/30 text-slate-200 hover:border-rose-400'
                                  }`}
                                >
                                  <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 shrink-0">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0 max-w-[180px] sm:max-w-[220px]">
                                    <div className="font-semibold truncate text-xs">{att.name}</div>
                                    <div className="text-[10px] opacity-80 flex items-center gap-1.5">
                                      <span className="uppercase font-bold text-[9px] px-1 py-0.2 rounded bg-rose-500/30 text-rose-200">PDF</span>
                                      {att.size && <span>{formatFileSize(att.size)}</span>}
                                    </div>
                                  </div>
                                  {att.dataUrl && (
                                    <a
                                      href={att.dataUrl}
                                      download={att.name}
                                      className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition shrink-0 ml-1"
                                      title="Baixar arquivo PDF"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                              );
                            }
                            if (att.type === 'link') {
                              return (
                                <a
                                  key={att.id}
                                  href={att.linkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs shadow-md transition hover:scale-[1.01] ${
                                    isUser 
                                      ? 'bg-emerald-700/80 border-cyan-400/40 text-white' 
                                      : 'bg-slate-900 border-cyan-500/30 text-slate-200 hover:border-cyan-400'
                                  }`}
                                  title={`Abrir link em nova aba: ${att.linkUrl}`}
                                >
                                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                                    <Link2 className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0 max-w-[190px] sm:max-w-[240px]">
                                    <div className="font-semibold truncate text-xs text-cyan-200">{att.name || att.linkTitle || 'Link de Referência'}</div>
                                    <div className="text-[10px] opacity-80 truncate text-slate-300">{att.linkUrl}</div>
                                  </div>
                                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1 opacity-80" />
                                </a>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Generated Visual Diagram Cards */}
                    {msg.generatedImages && msg.generatedImages.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {msg.generatedImages.map((genImg) => {
                          const styleBadgeName = 
                            genImg.style === 'statistics' ? 'Gráfico Estatístico' :
                            genImg.style === 'architecture' ? 'Arquitetura de Dados' :
                            genImg.style === 'ml_pipeline' ? 'Pipeline Machine Learning' :
                            genImg.style === 'decision_tree' ? 'Árvore de Decisão' :
                            genImg.style === 'transpetro_ops' ? 'Telemetria Transpetro' :
                            'Infográfico Conceitual';

                          return (
                            <div 
                              key={genImg.id}
                              className="rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950/80 shadow-xl"
                            >
                              {/* Card Header */}
                              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-purple-500/20 text-xs">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
                                    <Palette className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="truncate">
                                    <span className="font-bold text-white text-xs block truncate">{genImg.title}</span>
                                    <span className="text-[10px] text-purple-300/80">{styleBadgeName} • {genImg.aspectRatio || '16:9'}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                  <button
                                    type="button"
                                    onClick={() => handleExplainImage(genImg.url, genImg.title)}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition active:scale-95 shadow-sm"
                                    title="Pedir para o Agente explicar esta imagem com escaneamento animado"
                                  >
                                    <Scan className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                                    <span className="hidden sm:inline">Explicar com Animação</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setExplainingModalImage({ url: genImg.url, name: genImg.title })}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                    title="Abrir painel de animação de análise visual"
                                  >
                                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setPreviewImage({ url: genImg.url, name: genImg.title })}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                    title="Ampliar em tela cheia (Lightbox)"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDownloadImage(genImg.url, genImg.title)}
                                    className="p-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 transition"
                                    title="Baixar imagem em alta definição"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Image Display */}
                              <div 
                                onClick={() => setPreviewImage({ url: genImg.url, name: genImg.title })}
                                className="relative group cursor-pointer overflow-hidden bg-slate-950 flex items-center justify-center p-2"
                              >
                                <img
                                  src={genImg.url}
                                  alt={genImg.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-auto max-h-[480px] object-contain rounded-xl transition duration-200 group-hover:scale-[1.01]"
                                />

                                {/* Laser Scanner Overlay Animation */}
                                <ImageScannerOverlay
                                  isScanning={!!scanningImages[genImg.url]}
                                  onToggleScan={() => handleToggleImageScan(genImg.url)}
                                  showAlwaysControls={false}
                                />

                                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-white shadow-lg flex items-center gap-1.5">
                                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                                    Clique para Ampliar
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleExplainImage(genImg.url, genImg.title);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 transition active:scale-95"
                                  >
                                    <Scan className="w-3.5 h-3.5" />
                                    Explicar Imagem
                                  </button>
                                </div>
                              </div>

                              {/* Card Footer Insights */}
                              {genImg.keyFormulaOrMetric && (
                                <div className="px-3.5 py-2 bg-slate-900/50 border-t border-slate-800/60 flex items-center justify-between text-xs">
                                  <span className="text-[11px] text-purple-300 font-mono font-medium truncate">
                                    ⚡ {genImg.keyFormulaOrMetric}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Retry button if this message is a temporary warning/error */}
                    {!isUser && msg.content.includes('⚠️') && lastSentPrompt && (
                      <div className="mt-3 pt-2 border-t border-slate-800/80">
                        <button
                          onClick={handleRetryLast}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-semibold transition disabled:opacity-50 shadow-sm"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                          <span>Tentar Novamente Agora</span>
                        </button>
                      </div>
                    )}

                    {/* Footer & Copy/Audio/Expand buttons */}
                    <div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-slate-800/40 text-[10px] text-slate-500">
                      <span>{msg.timestamp}</span>
                      <div className="flex items-center gap-3">
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => setExpandedReadingMessage(msg)}
                            className="opacity-70 hover:opacity-100 transition flex items-center gap-1 text-slate-400 hover:text-cyan-400 font-semibold"
                            title="Expandir esta resposta para leitura dedicada"
                          >
                            <BookOpen className="w-3 h-3 text-cyan-400" />
                            <span>Leitura</span>
                          </button>
                        )}

                        {!isUser && (
                          <button
                            onClick={() => handleSpeakMessage(msg.id, msg.content)}
                            className={`transition flex items-center gap-1 font-semibold ${
                              speakingMessageId === msg.id 
                                ? 'text-rose-400 hover:text-rose-300' 
                                : 'text-slate-400 hover:text-emerald-400'
                            }`}
                            title={speakingMessageId === msg.id ? 'Parar Áudio' : 'Ouvir resposta em áudio'}
                          >
                            {speakingMessageId === msg.id ? (
                              <>
                                <VolumeX className="w-3 h-3 text-rose-400" />
                                <span className="text-rose-400">Parar</span>
                              </>
                            ) : (
                              <>
                                <Headphones className="w-3 h-3 text-emerald-400" />
                                <span>Ouvir</span>
                              </>
                            )}
                          </button>
                        )}

                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => handleGenerateImageForMessage(msg)}
                            className="opacity-70 hover:opacity-100 transition flex items-center gap-1 text-slate-400 hover:text-purple-400 font-semibold"
                            title="Criar ou gerar imagem/diagrama referente a este conteúdo"
                          >
                            <Palette className="w-3 h-3 text-purple-400" />
                            <span>Gerar Imagem</span>
                          </button>
                        )}

                        {/* Copy Code & Highlight Code buttons if message contains programming code */}
                        {!isUser && hasCodeInMessage(msg.content) && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleCopyMessageCode(msg)}
                              className="opacity-90 hover:opacity-100 transition flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-950/70 hover:bg-emerald-900/90 px-2 py-0.5 rounded-lg border border-emerald-500/40 shadow-sm text-[10px]"
                              title="Copiar blocos de código de programação desta resposta"
                            >
                              {copiedCodeMsgId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-300" />
                                  <span className="text-white font-extrabold">Código Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Code2 className="w-3 h-3 text-emerald-400" />
                                  <span>Copiar Código</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleMessageCodeHighlight(msg.id)}
                              className={`transition flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg border text-[10px] shadow-sm ${
                                highlightedMsgIds[msg.id]
                                  ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/60 shadow-cyan-950/60'
                                  : 'opacity-90 hover:opacity-100 text-cyan-400 hover:text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/90 border-cyan-500/40'
                              }`}
                              title="Destacar código com realce sintático e brilho visual"
                            >
                              <Highlighter className="w-3 h-3 text-cyan-400" />
                              <span>{highlightedMsgIds[msg.id] ? 'Código Destacado' : 'Destacar Código'}</span>
                            </button>
                          </>
                        )}

                        {/* Visual Image Animation Explainer button if message contains image */}
                        {((msg.attachments && msg.attachments.some(a => a.type === 'image')) || (msg.generatedImages && msg.generatedImages.length > 0)) && (
                          <button
                            type="button"
                            onClick={() => {
                              const imgUrl = msg.generatedImages?.[0]?.url || msg.attachments?.find(a => a.type === 'image')?.dataUrl;
                              const imgName = msg.generatedImages?.[0]?.title || msg.attachments?.find(a => a.type === 'image')?.name || 'Imagem de Análise';
                              if (imgUrl) setExplainingModalImage({ url: imgUrl, name: imgName });
                            }}
                            className="opacity-90 hover:opacity-100 transition flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-bold bg-cyan-950/70 hover:bg-cyan-900 px-2 py-0.5 rounded-lg border border-cyan-500/40 text-[10px] shadow-sm"
                            title="Abrir animação de escaneamento visual e explicar imagem"
                          >
                            <Scan className="w-3 h-3 text-cyan-400 animate-pulse" />
                            <span>🎬 Animação Visual</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="opacity-60 hover:opacity-100 transition flex items-center gap-1 text-slate-400 hover:text-emerald-400"
                          title="Copiar texto"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>

                        {!isUser && (
                          <button
                            id={`download-chat-pdf-${msg.id}`}
                            onClick={() => handleDownloadMessagePDF(msg)}
                            disabled={generatingPdfMsgId === msg.id}
                            className="opacity-70 hover:opacity-100 transition flex items-center gap-1 text-slate-400 hover:text-emerald-400 font-semibold disabled:opacity-50"
                            title="Baixar esta resposta em arquivo PDF formatado"
                          >
                            {generatingPdfMsgId === msg.id ? (
                              <>
                                <div className="w-2.5 h-2.5 border border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                <span>PDF...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3 h-3 text-emerald-400" />
                                <span>PDF</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 border border-emerald-500/30 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              {Object.values(scanningImages).some(Boolean) || lastSentAttachments.some(a => a.type === 'image') ? (
                <div className="bg-slate-950 border border-cyan-500/50 rounded-2xl rounded-tl-none p-4 text-sm shadow-2xl relative overflow-hidden max-w-lg w-full">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-scan shadow-[0_0_12px_#06b6d4]" />
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <div className="w-5 h-5 rounded-full border border-dashed border-cyan-400 animate-spin" />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute" />
                    </div>
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <Scan className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      Escaneando & Explicando Imagem com IA
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-8">
                    Analisando eixos cartesianos, curvas, variáveis e sintetizando armadilhas da Cesgranrio...
                  </p>
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-400 flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>O Agente Transpetro está formulando a resposta com rigor técnico...</span>
                </div>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts & Input Form Wrapper */}
        <div className={`w-full space-y-2.5 shrink-0 ${isChatMaximized && chatWidthMode === 'reading' ? 'max-w-4xl mx-auto' : ''}`}>
          {/* Suggested Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 whitespace-nowrap pl-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Sugestões:
            </span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedMode(qp.mode);
                  handleSendMessage(qp.prompt, qp.mode);
                }}
                disabled={isLoading}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 transition-all flex items-center gap-1.5"
              >
                <span>{qp.label}</span>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>

          {/* Input Form & Attachment Workspace */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative bg-slate-900/90 border rounded-2xl p-2.5 sm:p-3.5 shadow-xl transition-all ${
              isDraggingOver 
                ? 'border-emerald-400 bg-emerald-950/30 ring-2 ring-emerald-500/50' 
                : 'border-slate-800 focus-within:border-emerald-500/50'
            }`}
          >
            {/* Drag & Drop Visual Overlay */}
            {isDraggingOver && (
              <div className="absolute inset-0 z-20 rounded-2xl bg-slate-950/92 backdrop-blur-xs border-2 border-dashed border-emerald-400 flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-150">
                <UploadCloud className="w-10 h-10 text-emerald-400 animate-bounce mb-2" />
                <span className="text-sm font-bold text-white">Solte imagens ou arquivos PDF aqui</span>
                <span className="text-xs text-emerald-400/90 mt-1">O Agente Especialista fará a leitura e resolução técnica</span>
              </div>
            )}

            {/* Hidden Native File Inputs */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  handleImageFiles(e.target.files);
                  e.target.value = '';
                }
              }}
            />
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  handlePdfFiles(e.target.files);
                  e.target.value = '';
                }
              }}
            />

            {/* Staging Area (Pre-Send Attachments Tray) */}
            {stagedAttachments.length > 0 && (
              <div className="mb-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800/80 text-[11px]">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5" />
                    Arquivos e Links Anexados ({stagedAttachments.length})
                  </span>
                  <button
                    type="button"
                    onClick={clearStagedAttachments}
                    className="text-slate-400 hover:text-rose-400 transition text-[10px]"
                    title="Remover todos os anexos"
                  >
                    Limpar todos
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {stagedAttachments.map((att) => {
                    if (att.type === 'image') {
                      return (
                        <div
                          key={att.id}
                          className="group relative flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs shadow"
                        >
                          <img
                            src={att.dataUrl}
                            alt={att.name}
                            onClick={() => att.dataUrl && setPreviewImage({ url: att.dataUrl, name: att.name })}
                            className="w-10 h-10 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                            title="Clique para ampliar"
                          />
                          <div className="min-w-0 max-w-[120px] sm:max-w-[160px]">
                            <span className="block font-medium text-slate-200 truncate text-[11px]">{att.name}</span>
                            <span className="block text-[10px] text-emerald-400/80 font-mono">{formatFileSize(att.size) || 'Imagem'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (att.dataUrl) {
                                setExplainingModalImage({ url: att.dataUrl, name: att.name });
                              }
                            }}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold transition active:scale-95 shadow-sm"
                            title="Abrir animação de escaneamento visual e explicar imagem com IA"
                          >
                            <Scan className="w-3 h-3 text-cyan-400 animate-pulse" />
                            <span>Animação &amp; Explicar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeStagedAttachment(att.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                            title="Remover anexo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    }
                    if (att.type === 'pdf') {
                      return (
                        <div
                          key={att.id}
                          className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-rose-500/30 text-xs shadow"
                        >
                          <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 max-w-[120px] sm:max-w-[160px]">
                            <span className="block font-medium text-slate-200 truncate text-[11px]">{att.name}</span>
                            <span className="block text-[10px] text-rose-400/80 font-mono">{formatFileSize(att.size) || 'PDF'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeStagedAttachment(att.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                            title="Remover anexo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    }
                    if (att.type === 'link') {
                      return (
                        <div
                          key={att.id}
                          className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs shadow"
                        >
                          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                            <Link2 className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 max-w-[140px] sm:max-w-[180px]">
                            <span className="block font-medium text-cyan-300 truncate text-[11px]">{att.name}</span>
                            <span className="block text-[10px] text-slate-400 truncate">{att.linkUrl}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeStagedAttachment(att.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                            title="Remover anexo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}

            {/* Input Form Textarea and Controls */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex flex-col gap-2"
            >
              <div className="relative">
                <textarea
                  id="agent-chat-input"
                  rows={2}
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  onPaste={handlePaste}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={
                    stagedAttachments.length > 0 
                      ? "Adicione uma instrução para os anexos (ex: resolva a questão da foto, resuma o PDF) ou pressione Enter..."
                      : "Pergunte algo sobre o edital, anexe prints de questões, PDFs ou links... (Enter para enviar)"
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Bottom Toolbar: Attachment Quick Buttons & Send */}
              <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                {/* Left Attachment Buttons */}
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline-flex items-center gap-1">
                    <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
                    Anexar:
                  </span>

                  {/* Attach Image Button */}
                  <button
                    id="btn-attach-image"
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition active:scale-95 shadow-sm"
                    title="Anexar imagens (enunciado de questões, gráficos, fórmulas, capturas de tela)"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Imagem</span>
                  </button>

                  {/* Attach PDF Button */}
                  <button
                    id="btn-attach-pdf"
                    type="button"
                    onClick={() => pdfInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 transition active:scale-95 shadow-sm"
                    title="Anexar arquivo PDF (provas anteriores, editais, apostilas teóricas)"
                  >
                    <FileText className="w-3.5 h-3.5 text-rose-400" />
                    <span>PDF</span>
                  </button>

                  {/* Attach Link Button */}
                  <button
                    id="btn-attach-link"
                    type="button"
                    onClick={() => setIsLinkModalOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition active:scale-95 shadow-sm"
                    title="Anexar link da web ou documentação técnica"
                  >
                    <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Link</span>
                  </button>

                  {/* Create / Generate Image Button */}
                  <button
                    id="btn-generate-image-modal"
                    type="button"
                    onClick={() => handleOpenImageGenModal()}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:text-purple-200 transition active:scale-95 shadow-sm"
                    title="Criar ou gerar imagem, diagrama técnico ou infográfico referente ao conteúdo"
                  >
                    <Palette className="w-3.5 h-3.5 text-purple-400" />
                    <span>Gerar Imagem</span>
                  </button>

                  <span className="text-[10px] text-slate-500 hidden md:inline ml-1">
                    (Ctrl+V para colar prints)
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  id="agent-chat-submit"
                  type="submit"
                  disabled={(!inputPrompt.trim() && stagedAttachments.length === 0) || isLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all shrink-0 ml-auto"
                  title="Enviar mensagem com anexos"
                >
                  <span>Enviar</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* DEDICATED RESPONSE READING EXPANSION MODAL */}
      {expandedReadingMessage && (
        <div 
          id="expanded-message-reading-modal"
          className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl flex flex-col animate-in fade-in duration-200 text-slate-100"
        >
          {/* Reading Modal Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md shrink-0 shadow-xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-0.5">
                  <span>Modo de Expansão de Leitura</span>
                  <span>•</span>
                  <span className="text-slate-400 lowercase">{expandedReadingMessage.timestamp}</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                  {expandedReadingMessage.mode === 'tutor' ? 'Tutor Teórico Especialista' :
                   expandedReadingMessage.mode === 'cesgranrio_traps' ? 'Caça-Pegadinhas Cesgranrio' :
                   expandedReadingMessage.mode === 'debugger' ? 'Code Lab & Algoritmos' :
                   expandedReadingMessage.mode === 'quiz' ? 'Simulação Oral & Quiz' :
                   'Explicação Especializada do Agente'}
                </h2>
              </div>
            </div>

            {/* Reader Controls Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Font Size Selector for Reading Mode */}
              {renderFontSizeSelector(readingMessageTextSize, setReadingMessageTextSize)}

              {/* Width Mode Toggle */}
              <button
                type="button"
                onClick={() => setReadingMessageWidthMode(prev => prev === 'reading' ? 'full' : 'reading')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition"
                title="Alternar entre coluna de leitura confortável e tela inteira"
              >
                {readingMessageWidthMode === 'reading' ? <AlignLeft className="w-3.5 h-3.5 text-cyan-400" /> : <Columns className="w-3.5 h-3.5 text-cyan-400" />}
                <span className="hidden sm:inline">{readingMessageWidthMode === 'reading' ? 'Modo Leitura' : 'Largura Total'}</span>
              </button>

              {/* Audio Narrator Button */}
              <button
                type="button"
                onClick={() => handleSpeakMessage(expandedReadingMessage.id, expandedReadingMessage.content)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-sm border ${
                  speakingMessageId === expandedReadingMessage.id
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                }`}
                title="Ouvir resposta em áudio com síntese de voz"
              >
                {speakingMessageId === expandedReadingMessage.id ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span>Parar Áudio</span>
                  </>
                ) : (
                  <>
                    <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ouvir Texto</span>
                  </>
                )}
              </button>

              {/* Download PDF */}
              <button
                type="button"
                onClick={() => handleDownloadMessagePDF(expandedReadingMessage)}
                disabled={generatingPdfMsgId === expandedReadingMessage.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title="Baixar em PDF"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Baixar PDF</span>
              </button>

              {/* Copy Text */}
              <button
                type="button"
                onClick={() => handleCopy(expandedReadingMessage.id, expandedReadingMessage.content)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title="Copiar texto"
              >
                {copiedId === expandedReadingMessage.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedId === expandedReadingMessage.id ? 'Copiado' : 'Copiar'}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setExpandedReadingMessage(null)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition active:scale-95 shadow-sm"
                title="Fechar modo de leitura (ou pressione Esc)"
              >
                <X className="w-4 h-4" />
                <span>Fechar</span>
                <span className="text-[10px] opacity-75 bg-rose-950/80 px-1 rounded hidden sm:inline">Esc</span>
              </button>
            </div>
          </div>

          {/* Reading Content Canvas */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
            <div className={`transition-all duration-200 ${readingMessageWidthMode === 'reading' ? 'max-w-4xl mx-auto' : 'w-full'}`}>
              
              {/* Preceding User Question Context (if any) */}
              {(() => {
                const userQ = getQuestionForMessage(expandedReadingMessage);
                if (!userQ) return null;
                return (
                  <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-md">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      Pergunta / Tópico Solicitado pelo Aluno:
                    </span>
                    <p className="text-sm sm:text-base text-slate-200 font-medium italic">
                      &ldquo;{userQ}&rdquo;
                    </p>
                  </div>
                );
              })()}

              {/* Assistant Explanation in Expanded Mode */}
              {expandedReadingMessage.generatedImages && expandedReadingMessage.generatedImages.length > 0 && (
                <div className="mb-6 space-y-4">
                  {expandedReadingMessage.generatedImages.map((genImg) => (
                    <div key={genImg.id} className="rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-900 shadow-2xl">
                      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-purple-500/20">
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-purple-400" />
                          <span className="font-bold text-white text-sm">{genImg.title}</span>
                          <span className="text-xs text-purple-300/80">({genImg.aspectRatio || '16:9'})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewImage({ url: genImg.url, name: genImg.title })}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                          >
                            <Eye className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Tela Cheia</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownloadImage(genImg.url, genImg.title)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 border border-purple-500/40 text-xs font-semibold transition"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Baixar</span>
                          </button>
                        </div>
                      </div>
                      <div 
                        onClick={() => setPreviewImage({ url: genImg.url, name: genImg.title })}
                        className="p-3 bg-slate-950 flex items-center justify-center cursor-pointer group"
                      >
                        <img 
                          src={genImg.url} 
                          alt={genImg.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto max-h-[550px] object-contain rounded-xl group-hover:scale-[1.01] transition"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={`prose prose-invert prose-emerald max-w-none ${getProseSizeClass(readingMessageTextSize)} ${getTextSizeClass(readingMessageTextSize)} prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0 prose-code:text-emerald-300 prose-code:font-mono prose-table:border prose-table:border-slate-800 prose-th:bg-slate-900 prose-th:p-3 prose-td:p-3`}>
                <ReactMarkdown components={markdownComponents}>{cleanCesgranrioExamNotation(expandedReadingMessage.content)}</ReactMarkdown>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* LINK ATTACHMENT MODAL */}
      {isLinkModalOpen && (
        <div 
          id="link-attachment-modal"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-5 sm:p-6 text-slate-100">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Anexar Link ou Referência</h3>
                  <p className="text-xs text-slate-400">Adicione uma URL ou link de documentação para o Agente consultar</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  URL do Link <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  autoFocus
                  placeholder="https://exemplo.com/artigo-ou-documentacao"
                  value={linkInputUrl}
                  onChange={(e) => setLinkInputUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddLink();
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Título ou Descrição do Link <span className="text-slate-500 font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Documentação Apache Spark Window Functions"
                  value={linkInputTitle}
                  onChange={(e) => setLinkInputTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddLink();
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none"
                />
              </div>

              {/* Quick Preset Links */}
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 mb-2">
                  Sugestões Rápidas de Links Úteis:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Edital Transpetro (Cesgranrio)', url: 'https://concursos.cesgranrio.org.br/transpetro', title: 'Edital Oficial Concurso Transpetro' },
                    { label: 'Doc Scikit-Learn', url: 'https://scikit-learn.org/stable/', title: 'Documentação Scikit-Learn' },
                    { label: 'Doc Apache Spark', url: 'https://spark.apache.org/docs/latest/', title: 'Apache Spark Docs' },
                    { label: 'DAMA DMBOK Guia', url: 'https://www.dama.org/', title: 'DAMA Data Management Body of Knowledge' }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setLinkInputUrl(preset.url);
                        setLinkInputTitle(preset.title);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-cyan-300 transition"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-5 mt-5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddLink}
                disabled={!linkInputUrl.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-cyan-600/30 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Anexar Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {previewImage && (
        <div 
          id="image-lightbox-modal"
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 sm:p-6 animate-in fade-in duration-150"
        >
          {/* Lightbox Top Header */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="flex items-center justify-between pb-3 border-b border-slate-800 max-w-5xl mx-auto w-full mb-3 shrink-0"
          >
            <div className="flex items-center gap-2 text-slate-200 truncate">
              <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-sm truncate">{previewImage.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={previewImage.url}
                download={previewImage.name}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                title="Baixar imagem original"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Baixar</span>
              </a>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition"
                title="Fechar visualização"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Preview */}
          <div className="flex-1 flex items-center justify-center p-2 min-h-0">
            <img
              src={previewImage.url}
              alt={previewImage.name}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-slate-800"
            />
          </div>
        </div>
      )}

      {/* IMAGE GENERATION MODAL */}
      {isImageGenModalOpen && (
        <div 
          id="image-generation-modal"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl w-full max-w-xl shadow-2xl p-5 sm:p-6 text-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>Criar Imagem ou Diagrama com IA</span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-extrabold border border-purple-500/30">
                      Visual Engine
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Gere esquemas visuais, gráficos de métricas e fluxos de dados para o edital Transpetro</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => !isGeneratingImage && setIsImageGenModalOpen(false)}
                disabled={isGeneratingImage}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error banner if any */}
            {imageGenError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{imageGenError}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Concept/Prompt input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Conteúdo ou Tópico para Ilustrar <span className="text-purple-400">*</span></span>
                  <span className="text-[11px] text-slate-500 font-normal">Ex: Curva ROC, Pipeline Spark, Árvores</span>
                </label>
                <textarea
                  rows={2}
                  autoFocus
                  placeholder="Ex: Arquitetura Lakehouse Medallion com Spark Streaming para telemetria de dutos na Transpetro..."
                  value={imageGenPrompt}
                  onChange={(e) => setImageGenPrompt(e.target.value)}
                  disabled={isGeneratingImage}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none transition"
                />
              </div>

              {/* Visual Style Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Estilo Visual &amp; Representação Técnica:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'architecture', label: 'Arquitetura & Pipeline', icon: '🏗️', desc: 'Lakehouse, Spark, Dutos' },
                    { id: 'statistics', label: 'Gráfico Estatístico', icon: '📈', desc: 'ROC-AUC, Resíduos, Regressão' },
                    { id: 'ml_pipeline', label: 'Pipeline & MLOps', icon: '🤖', desc: 'Treino, Validação, Drift' },
                    { id: 'decision_tree', label: 'Árvore de Decisão', icon: '🌲', desc: 'Gini, Boosting vs Bagging' },
                    { id: 'transpetro_ops', label: 'Dutos & Telemetria', icon: '📡', desc: 'SCADA, Sensores, Navios' },
                    { id: 'infographic', label: 'Infográfico de Estudo', icon: '📋', desc: 'Resumo Cesgranrio' }
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      disabled={isGeneratingImage}
                      onClick={() => setImageGenStyle(st.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                        imageGenStyle === st.id
                          ? 'bg-purple-950/60 border-purple-500 text-white shadow-md ring-1 ring-purple-500/50'
                          : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <span>{st.icon}</span>
                        <span className="truncate">{st.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate">{st.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Proporção da Imagem (Aspect Ratio):
                </label>
                <div className="flex gap-2">
                  {[
                    { id: '16:9', label: '16:9 Widescreen (Diagrama Panorâmico)', badge: 'Recomendado' },
                    { id: '1:1', label: '1:1 Quadrado (Foco em Conceito)', badge: 'Padrão' },
                    { id: '4:3', label: '4:3 Apresentação', badge: 'Slide' }
                  ].map((ar) => (
                    <button
                      key={ar.id}
                      type="button"
                      disabled={isGeneratingImage}
                      onClick={() => setImageGenAspectRatio(ar.id as any)}
                      className={`flex-1 p-2 rounded-xl border text-xs font-semibold transition text-center ${
                        imageGenAspectRatio === ar.id
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-sm ring-1 ring-emerald-500/40'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div>{ar.id}</div>
                      <div className="text-[10px] opacity-75 font-normal">{ar.badge}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Topic Suggestions */}
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                  Sugestões Prontas para Cesgranrio / Transpetro:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { text: 'Curva ROC vs Curva PR em Detecção de Falhas de Dutos', style: 'statistics' as const },
                    { text: 'Pipeline Lakehouse Medallion com Spark Streaming & Delta Lake', style: 'architecture' as const },
                    { text: 'Trade-off Viés-Variância: Overfitting vs Underfitting e L1/L2', style: 'statistics' as const },
                    { text: 'Rede de Sensores IoT e Telemetria em Oleodutos Transpetro', style: 'transpetro_ops' as const },
                    { text: 'Random Forest (Bagging) vs XGBoost (Boosting)', style: 'decision_tree' as const }
                  ].map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isGeneratingImage}
                      onClick={() => {
                        setImageGenPrompt(sug.text);
                        setImageGenStyle(sug.style);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-[11px] text-purple-300 transition"
                    >
                      + {sug.text.slice(0, 38)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress message if generating */}
              {isGeneratingImage && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-200 text-xs flex items-center gap-3 animate-pulse">
                  <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <div>
                    <span className="font-bold block">Renderizando representação visual com IA...</span>
                    <span className="text-[11px] text-purple-300/80">O Agente está construindo o diagrama técnico em alta definição com paleta Transpetro.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-4 mt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsImageGenModalOpen(false)}
                disabled={isGeneratingImage}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleExecuteImageGeneration(imageGenPrompt, imageGenStyle, imageGenAspectRatio, imageGenTopic)}
                disabled={!imageGenPrompt.trim() || isGeneratingImage}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-purple-600/30 transition active:scale-95"
              >
                {isGeneratingImage ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Gerando Imagem...</span>
                  </>
                ) : (
                  <>
                    <Palette className="w-4 h-4" />
                    <span>✨ Gerar Imagem Agora</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE EXPLAINER ANIMATION MODAL */}
      {explainingModalImage && (
        <ImageExplainerModal
          isOpen={!!explainingModalImage}
          onClose={() => setExplainingModalImage(null)}
          imageUrl={explainingModalImage.url}
          imageName={explainingModalImage.name}
          onAskAgentToExplain={(prompt) => {
            const imgAtt: ChatAttachment = {
              id: `img-${Date.now()}`,
              type: 'image',
              name: explainingModalImage.name || 'imagem_analise.png',
              dataUrl: explainingModalImage.url
            };
            handleSendMessage(prompt, 'tutor', [imgAtt]);
          }}
          isAgentThinking={isLoading}
        />
      )}
    </>
  );
};
