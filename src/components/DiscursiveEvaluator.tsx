import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  FileCheck, 
  Sparkles, 
  Send, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  RefreshCw, 
  HelpCircle,
  Clock,
  Layers,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { EssayScenario, EssayEvaluation } from '../types';

interface DiscursiveEvaluatorProps {
  initialScenarios: EssayScenario[];
}

export const DiscursiveEvaluator: React.FC<DiscursiveEvaluatorProps> = ({
  initialScenarios,
}) => {
  const [scenarios, setScenarios] = useState<EssayScenario[]>(initialScenarios);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(initialScenarios[0]?.id || '');
  const [candidateText, setCandidateText] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<EssayEvaluation | null>(null);
  
  // Scenario generator
  const [isGeneratingScenario, setIsGeneratingScenario] = useState<boolean>(false);
  const [newScenarioCategory, setNewScenarioCategory] = useState('Manutenção Preditiva & IoT em Dutos');

  const currentScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  const wordCount = candidateText.trim() ? candidateText.trim().split(/\s+/).length : 0;
  const estimatedLines = Math.round(wordCount / 10); // roughly 10 words per line

  const handleEvaluate = async () => {
    if (!candidateText.trim() || isEvaluating || !currentScenario) return;

    setIsEvaluating(true);
    setEvaluation(null);

    try {
      const response = await fetch('/api/evaluate-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioTitle: currentScenario.title,
          scenarioPrompt: currentScenario.promptQuestion,
          candidateAnswer: candidateText,
          keyCriteria: currentScenario.evaluationRubric.join('; ')
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao avaliar discursiva');
      }

      const data = await response.json();
      setEvaluation(data);
    } catch (error) {
      console.error(error);
      alert('Erro ao avaliar estudo de caso com IA. Tente novamente.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleGenerateNewScenario = async () => {
    setIsGeneratingScenario(true);
    try {
      const response = await fetch('/api/generate-essay-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newScenarioCategory
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar cenário');
      }

      const data: EssayScenario = await response.json();
      const scenarioWithId = {
        ...data,
        id: `scenario-${Date.now()}`
      };

      setScenarios(prev => [scenarioWithId, ...prev]);
      setActiveScenarioId(scenarioWithId.id);
      setCandidateText('');
      setEvaluation(null);
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar novo estudo de caso.');
    } finally {
      setIsGeneratingScenario(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Prova Discursiva & Estudo de Caso
              </span>
              <span className="text-xs text-slate-400">Padrão Banca Cesgranrio / Transpetro</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Laboratório de Estudos de Caso Técnicos
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Treine redação técnica aplicada a cenários reais de transporte dutoviário e marítimo com correção automática segundo a matriz oficial de 0 a 100 pontos.
            </p>
          </div>

          {/* Scenario Generator Button */}
          <div className="flex items-center gap-2">
            <button
              id="generate-new-scenario-btn"
              onClick={handleGenerateNewScenario}
              disabled={isGeneratingScenario}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGeneratingScenario ? 'animate-spin' : ''}`} />
              <span>{isGeneratingScenario ? 'Criando Cenário...' : '+ Gerar Estudo de Caso Inédito (IA)'}</span>
            </button>
          </div>
        </div>

        {/* Scenarios Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto mt-5 pt-4 border-t border-slate-800/80 no-scrollbar">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                setEvaluation(null);
              }}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                sc.id === activeScenarioId
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="truncate max-w-[220px]">Caso #{idx + 1}: {sc.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Scenario Statement & Writing Area */}
      {currentScenario && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Context, Question & Expected Concepts */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {currentScenario.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> ~{currentScenario.estimatedTimeMinutes} min recomendados
                </span>
              </div>

              <h2 className="text-lg font-bold text-white leading-snug">
                {currentScenario.title}
              </h2>

              {/* Scenario Context */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-sm text-slate-300 leading-relaxed space-y-2">
                <div className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Contexto Operacional Transpetro:
                </div>
                <p className="whitespace-pre-line">{currentScenario.scenarioContext}</p>
              </div>

              {/* Prompt Question */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-sm text-emerald-100 leading-relaxed space-y-2">
                <div className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> Enunciado da Prova Discursiva:
                </div>
                <div className="whitespace-pre-line font-medium text-slate-200">
                  {currentScenario.promptQuestion}
                </div>
              </div>

              {/* Key concepts hint */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-bold text-slate-400">
                  Conceitos e Palavras-Chave Esperados pela Banca:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentScenario.keyConceptsExpected.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Writing Area & Evaluation Result */}
          <div className="space-y-4">
            
            {/* Editor Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" /> Sua Resposta Técnica
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span><strong>{wordCount}</strong> palavras</span>
                  <span>•</span>
                  <span>~<strong>{estimatedLines}</strong> linhas (ideal: 20-30 linhas)</span>
                </div>
              </div>

              <textarea
                id="essay-textarea-input"
                rows={14}
                value={candidateText}
                onChange={(e) => setCandidateText(e.target.value)}
                placeholder={`Redija sua resposta dissertativa aqui estruturando a introdução do problema, arquitetura de dados e ML, métricas de avaliação para o contexto da Transpetro, estratégia de MLOps e governança...`}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 leading-relaxed font-sans"
              />

              <div className="flex items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-slate-500">
                  A IA avaliará Domínio Técnico (0-40), Arquitetura (0-30), Clareza (0-20) e MLOps/LGPD (0-10).
                </p>

                <button
                  id="evaluate-essay-btn"
                  onClick={handleEvaluate}
                  disabled={!candidateText.trim() || isEvaluating}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 transition disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Avaliando...</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Submeter e Corrigir com IA</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Evaluation Results Card */}
            {evaluation && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 animate-in fade-in duration-300">
                
                {/* Score Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Resultado Oficial da Banca
                    </span>
                    <h3 className="text-xl font-black text-white mt-0.5">
                      Parecer do Examinador
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-3xl font-black text-emerald-400">
                        {evaluation.totalScore}<span className="text-base text-slate-400">/100</span>
                      </div>
                      <div className="text-xs font-bold text-slate-300">
                        {evaluation.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Domínio Técnico</div>
                    <div className="text-base font-extrabold text-white mt-1">
                      {evaluation.scoreBreakdown.technicalKnowledge} <span className="text-xs text-slate-500 font-normal">/ 40</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Solução Arquitetural</div>
                    <div className="text-base font-extrabold text-white mt-1">
                      {evaluation.scoreBreakdown.architecturalSolution} <span className="text-xs text-slate-500 font-normal">/ 30</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Clareza & Coesão</div>
                    <div className="text-base font-extrabold text-white mt-1">
                      {evaluation.scoreBreakdown.clarityAndStructure} <span className="text-xs text-slate-500 font-normal">/ 20</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">MLOps & LGPD</div>
                    <div className="text-base font-extrabold text-white mt-1">
                      {evaluation.scoreBreakdown.mlopsAndGovernance} <span className="text-xs text-slate-500 font-normal">/ 10</span>
                    </div>
                  </div>
                </div>

                {/* General Comment */}
                <div className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <strong className="text-white block mb-1">Comentário Geral:</strong>
                  {evaluation.generalComment}
                </div>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                      <CheckCircle2 className="w-4 h-4" /> Pontos Fortes
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {evaluation.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                      <AlertCircle className="w-4 h-4" /> Oportunidades de Melhoria
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {evaluation.improvements.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Model Answer */}
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Espelho de Correção Padrão (Nota 100)
                    </h4>
                  </div>
                  <div className="prose prose-invert prose-emerald max-w-none text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    <ReactMarkdown>{evaluation.modelAnswer}</ReactMarkdown>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
