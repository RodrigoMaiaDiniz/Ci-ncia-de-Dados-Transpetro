export interface QuestionOption {
  letter: 'A' | 'B' | 'C' | 'D' | 'E' | 'C' | 'E';
  text: string;
}

export interface DistractorAnalysis {
  letter: string;
  whyWrong: string;
}

export interface OfficialExamMeta {
  examName: string;
  board: 'CESGRANRIO' | 'CEBRASPE' | 'PETROBRAS';
  year: number;
  itemNumber: number;
  isAnnulled?: boolean;
  annulmentReason?: string;
  block?: 'Conhecimentos Básicos' | 'Bloco I' | 'Bloco II' | 'Bloco III';
}

export interface Question {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil';
  format?: 'multipla_escolha' | 'certo_errado';
  statement: string;
  codeSnippet?: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E' | 'C' | 'E' | 'X';
  explanationCorrect: string;
  distractorAnalysis: DistractorAnalysis[];
  cesgranrioTip: string;
  isCustomGenerated?: boolean;
  officialExam?: OfficialExamMeta;
  audioScript?: string;
}

export interface OfficialExamItem {
  itemNumber: number;
  statement: string;
  officialAnswer: 'C' | 'E' | 'X' | 'A' | 'B' | 'D';
  discipline: string;
  subtopic: string;
  block: 'Conhecimentos Básicos' | 'Bloco I' | 'Bloco II' | 'Bloco III';
  explanation: string;
  cesgranrioTrap: string;
}

export interface OfficialExam {
  id: string;
  title: string;
  institution: string;
  board: string;
  year: number;
  totalItems: number;
  description: string;
  items: OfficialExamItem[];
}

export interface AudioLesson {
  id: string;
  title: string;
  axisOrDiscipline: string;
  durationEstimate: string;
  tag: string;
  summary: string;
  transcript: string;
  keyPoints: string[];
}

export interface DisciplineKnowledgeBase {
  id: string;
  axisNumber: string;
  title: string;
  category: string;
  shortDescription: string;
  coreConcepts: Array<{
    conceptName: string;
    summary: string;
    formulasOrCode?: string;
    commonExamTrap: string;
    keyPoints: string[];
  }>;
  officialExamReferences: string[];
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'pdf' | 'link';
  name: string;
  size?: number; // bytes
  mimeType?: string;
  dataUrl?: string; // base64 data url for images/PDFs
  linkUrl?: string; // target URL for links
  linkTitle?: string;
}

export interface GeneratedImageMeta {
  id: string;
  url: string; // base64 data url (PNG or SVG)
  prompt: string;
  title: string;
  style: 'architecture' | 'statistics' | 'ml_pipeline' | 'decision_tree' | 'transpetro_ops' | 'infographic';
  styleLabel?: string;
  aspectRatio?: '1:1' | '16:9' | '4:3';
  description?: string;
  technicalDetails?: string[];
  keyFormulaOrMetric?: string;
  sourceModel?: string;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: 'tutor' | 'cesgranrio_traps' | 'debugger' | 'quiz';
  suggestedFollowups?: string[];
  attachments?: ChatAttachment[];
  generatedImages?: GeneratedImageMeta[];
}

export interface EssayScenario {
  id: string;
  title: string;
  category: string;
  estimatedTimeMinutes: number;
  scenarioContext: string;
  promptQuestion: string;
  evaluationRubric: string[];
  keyConceptsExpected: string[];
}

export interface EssayEvaluation {
  totalScore: number;
  scoreBreakdown: {
    technicalKnowledge: number;
    architecturalSolution: number;
    clarityAndStructure: number;
    mlopsAndGovernance: number;
  };
  status: string;
  generalComment: string;
  strengths: string[];
  improvements: string[];
  lineByLineFeedback?: Array<{
    topic: string;
    feedback: string;
  }>;
  modelAnswer: string;
}

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  formulaOrCode?: string;
  examFrequency: 'Alta' | 'Altíssima' | 'Média';
}

export interface StudyPlanPhase {
  phaseNumber: number;
  phaseName: string;
  weeksSpan: string;
  focus: string;
  goals: string[];
  cesgranrioTips?: string;
}

export interface StudyPlanDay {
  day: string;
  primaryTopic: string;
  activity: string;
  durationHours: number;
}

export interface StudyPlan {
  title: string;
  summary: string;
  recommendedWeeklyHours: number;
  phases: StudyPlanPhase[];
  weeklyRoutine: StudyPlanDay[];
  topCesgranrioPriorities: string[];
}

export interface TopicProgress {
  topicId: string;
  name: string;
  category: 'Básicos' | 'Estatística' | 'Machine Learning' | 'Big Data & SQL' | 'Python & MLOps' | 'Governança & LGPD';
  weight: number;
  masteryPercentage: number;
  questionsSolved: number;
  correctCount: number;
  subtopics: string[];
}

export type EditalBlockType = 'Conhecimentos Básicos' | 'Bloco I' | 'Bloco II' | 'Bloco III';

export interface OfficialSyllabusTopic {
  id: string;
  block: EditalBlockType;
  itemCode: string;
  title: string;
  officialWording: string;
  area: string;
  relevance: 'Altíssima' | 'Alta' | 'Média';
  subtopics: string[];
  keyConceptsAndFormulas: Array<{
    name: string;
    description: string;
    formulaOrCode?: string;
  }>;
  cesgranrioExamTraps: string[];
  transpetroPracticalContext: string;
  recommendedStudyStrategy: string[];
}

export interface RequestedSubject {
  id: string;
  title: string;
  source: 'agent_chat' | 'syllabus_explorer' | 'simulator' | 'discursive' | 'audio' | 'quick_prompt' | 'manual';
  category: string;
  block?: EditalBlockType;
  userQuery: string;
  agentResponse?: string;
  timestamp: string;
  isoDate: string;
  mode?: 'tutor' | 'cesgranrio_traps' | 'debugger' | 'quiz';
  tags: string[];
  status: 'answered' | 'pending';
  isFavorite?: boolean;
  notes?: string;
}

export interface DigitalBookPracticeQuestion {
  questionNumber: number;
  statement: string;
  codeSnippet?: string;
  options: string[] | Array<{
    letter: 'A' | 'B' | 'C' | 'D' | 'E' | string;
    text: string;
  }>;
  correctLetter: 'A' | 'B' | 'C' | 'D' | 'E' | string;
  explanation: string;
  cesgranrioTip: string;
}

export interface DigitalBookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  readTimeEstimate: string;
  summary: string;
  contentMarkdown: string;
  keyFormulasOrCode?: Array<{
    name: string;
    description: string;
    code: string;
  }>;
  keyTakeaways: string[];
  cesgranrioTraps: string[];
  transpetroApplication?: string;
  practiceQuestions?: DigitalBookPracticeQuestion[];
}

export interface DigitalBook {
  id: string;
  itemCode: string;
  block: EditalBlockType;
  title: string;
  subtitle: string;
  edition: string;
  author: string;
  pagesEquivalent: number;
  readTimeEstimate: string;
  badge: string;
  themeGradient: string;
  borderAccent: string;
  iconName: string;
  overview: string;
  officialEditalTopics: string[];
  targetAudience: string;
  chapters: DigitalBookChapter[];
  examChecklist: string[];
  practiceQuestions: DigitalBookPracticeQuestion[];
}
