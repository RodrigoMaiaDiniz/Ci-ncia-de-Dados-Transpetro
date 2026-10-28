import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Clock, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen,
  ArrowRight,
  RefreshCw,
  Award,
  Layers
} from 'lucide-react';
import { StudyPlan } from '../types';

export const StudyPlanner: React.FC = () => {
  const [dailyHours, setDailyHours] = useState(3);
  const [targetDays, setTargetDays] = useState(45);
  const [currentLevel, setCurrentLevel] = useState('Intermediário');
  const [weakTopics, setWeakTopics] = useState<string[]>(['Estatística e Inferência', 'PySpark e Big Data']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedGoals, setCompletedGoals] = useState<Set<string>>(new Set());

  const [plan, setPlan] = useState<StudyPlan | null>({
    title: 'Plano Tático Reta Final Transpetro - Ciência de Dados',
    summary: 'Cronograma acelerado de 45 dias equilibrando teoria de alta densidade, resolução massiva de questões Cesgranrio e estudos de caso práticos para a prova discursiva.',
    recommendedWeeklyHours: 21,
    phases: [
      {
        phaseNumber: 1,
        phaseName: 'Fase 1: Domínio da Base Estatística & SQL Avançado',
        weeksSpan: 'Semanas 1 a 2',
        focus: 'Fixar Teorema Central do Limite, Testes de Hipótese, Inferência Bayesiana e Window Functions em SQL/PySpark.',
        goals: [
          'Resolver 50 questões de Inferência Estatística e P-valor da Cesgranrio',
          'Dominar sintaxe de ROWS/RANGE BETWEEN e RANK em SQL',
          'Revisar distribuições de probabilidade contínuas e discretas'
        ],
        cesgranrioTips: 'A Cesgranrio foca muito na interpretação conceitual dos testes de hipótese e pressupostos de regressão linear (homocedasticidade, normalidade dos resíduos).'
      },
      {
        phaseNumber: 2,
        phaseName: 'Fase 2: Machine Learning, Deep Learning & MLOps',
        weeksSpan: 'Semanas 3 a 4',
        focus: 'Regularização L1/L2, XGBoost/LightGBM, métricas para desbalanceamento (PR-AUC, F-beta) e detecção de Concept Drift.',
        goals: [
          'Implementar pipeline de feature engineering para séries temporais de sensores',
          'Dominar explicabilidade com SHAP e métricas de desbalanceamento',
          'Treinar 2 redações de estudos de caso para a prova discursiva'
        ],
        cesgranrioTips: 'Não confunda Acurácia com PR-AUC em problemas com classes raras (vazamentos e falhas operacionais).'
      },
      {
        phaseNumber: 3,
        phaseName: 'Fase 3: Simulação Intensiva & Reta Final',
        weeksSpan: 'Semanas 5 a 6',
        focus: 'Simulados cronometrados completos com gabarito comentado, revisão de flashcards e fixação dos detalhes da LGPD e DAMA-DMBOK.',
        goals: [
          'Fazer 3 simulados completos de 70 questões com controle de tempo',
          'Revisar bases legais da LGPD (Art. 7º) e Governança DAMA',
          'Mapear e zerar erros recorrentes'
        ],
        cesgranrioTips: 'Na semana da prova, foque em velocidade de leitura e eliminação rápida de distratores absurdos.'
      }
    ],
    weeklyRoutine: [
      { day: 'Segunda-feira', primaryTopic: 'Estatística & Probabilidade', activity: 'Teoria + 15 Questões Cesgranrio (Inferência e Regressão)', durationHours: 3 },
      { day: 'Terça-feira', primaryTopic: 'Machine Learning', activity: 'Modelos de Árvores (XGBoost) e Regularização', durationHours: 3 },
      { day: 'Quarta-feira', primaryTopic: 'Big Data & SQL', activity: 'Window Functions, Spark Transformations e Otimização', durationHours: 3 },
      { day: 'Quinta-feira', primaryTopic: 'Python & MLOps', activity: 'Concept Drift, SHAP e Rastreamento com MLflow', durationHours: 3 },
      { day: 'Sexta-feira', primaryTopic: 'Governança, LGPD & Português', activity: 'Princípios da LGPD + 10 Questões de Português Cesgranrio', durationHours: 3 },
      { day: 'Sábado', primaryTopic: 'Prova Discursiva & Estudo de Caso', activity: 'Redação técnica de 1 Estudo de Caso Transpetro com IA', durationHours: 3 },
      { day: 'Domingo', primaryTopic: 'Simulado & Flashcards', activity: 'Simulado Parcial + Revisão de Fórmulas e Erros', durationHours: 3 }
    ],
    topCesgranrioPriorities: [
      'XGBoost hiperparâmetros (max_depth, gamma, reg_alpha, reg_lambda)',
      'Interpretação de P-valor e Erros Tipo I e II',
      'SQL Window Functions (ROW_NUMBER vs RANK vs DENSE_RANK)',
      'Métricas para classes raras (PR-AUC vs ROC-AUC)',
      'Apache Spark: Narrow vs Wide Transformations (Shuffle)'
    ]
  });

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dailyHours,
          targetDays,
          currentLevel,
          weakTopics
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar plano');
      }

      const data = await response.json();
      setPlan(data);
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar plano de estudos com IA.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleGoal = (goalText: string) => {
    setCompletedGoals(prev => {
      const next = new Set(prev);
      if (next.has(goalText)) {
        next.delete(goalText);
      } else {
        next.add(goalText);
      }
      return next;
    });
  };

  const availableTopics = [
    'Estatística e Inferência',
    'Machine Learning & XGBoost',
    'PySpark e Big Data',
    'SQL Avançado & Window Functions',
    'MLOps & Monitoramento de Drift',
    'Governança & LGPD',
    'Português Cesgranrio'
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Estratégia & Cronograma IA
              </span>
              <span className="text-xs text-slate-400">Personalizado para seu tempo disponível</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Plano de Estudos Tático Transpetro
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Meta:</span>
            <span className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold text-xs">
              Aprovação Cargo Superior Ciência de Dados
            </span>
          </div>
        </div>
      </div>

      {/* Plan Configuration Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" /> Parâmetros do seu Planejamento
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1.5">
              Horas de Estudo por Dia:
            </label>
            <select
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value={2}>2 horas/dia</option>
              <option value={3}>3 horas/dia (Recomendado)</option>
              <option value={4}>4 horas/dia</option>
              <option value={6}>6 horas/dia (Intensivo)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1.5">
              Dias até a Prova:
            </label>
            <select
              value={targetDays}
              onChange={(e) => setTargetDays(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value={30}>30 dias (Sprint Reta Final)</option>
              <option value={45}>45 dias</option>
              <option value={60}>60 dias (Preparação Completa)</option>
              <option value={90}>90 dias</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1.5">
              Seu Nível Atual em Dados:
            </label>
            <select
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="Iniciante em Concursos">Iniciante em Concursos / Cesgranrio</option>
              <option value="Intermediário">Intermediário (Base em Python/SQL)</option>
              <option value="Avançado">Avançado (Foco em revisão e discursivas)</option>
            </select>
          </div>
        </div>

        {/* Weak topics selector */}
        <div>
          <label className="text-xs text-slate-400 font-medium block mb-2">
            Tópicos que você mais precisa reforçar:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTopics.map((topic) => {
              const isSelected = weakTopics.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      setWeakTopics(prev => prev.filter(t => t !== topic));
                    } else {
                      setWeakTopics(prev => [...prev, topic]);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                    isSelected
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '} {topic}
                </button>
              );
            })}
          </div>
        </div>

        <button
          id="generate-study-plan-btn"
          onClick={handleGeneratePlan}
          disabled={isGenerating}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>O Agente está recalculando seu plano de estudos...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Gerar / Recalcular Cronograma com IA</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Study Plan Display */}
      {plan && (
        <div className="space-y-6">
          
          {/* Plan Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white">{plan.title}</h2>
                <p className="text-xs text-slate-400 mt-1">{plan.summary}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-bold whitespace-nowrap">
                <Clock className="w-4 h-4" /> ~{plan.recommendedWeeklyHours}h semanais
              </div>
            </div>

            {/* Top Priorities Checklist */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Prioridades Máximas Cesgranrio Transpetro:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {plan.topCesgranrioPriorities.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">#{idx + 1}</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phases Roadmap */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Fases de Preparação Estruturadas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plan.phases.map((phase) => (
                <div
                  key={phase.phaseNumber}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-400 uppercase">
                        Fase {phase.phaseNumber}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {phase.weeksSpan}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {phase.phaseName}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {phase.focus}
                    </p>

                    {/* Goals Checklist */}
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-bold text-slate-400">Metas Práticas:</div>
                      {phase.goals.map((g, gIdx) => {
                        const isDone = completedGoals.has(g);
                        return (
                          <div
                            key={gIdx}
                            onClick={() => toggleGoal(g)}
                            className={`cursor-pointer p-2 rounded-lg text-xs flex items-start gap-2 transition border ${
                              isDone
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800 line-through opacity-80'
                                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isDone}
                              readOnly
                              className="mt-0.5 rounded text-emerald-500 focus:ring-0"
                            />
                            <span>{g}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {phase.cesgranrioTips && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-snug">
                      <strong>Banca: </strong>{phase.cesgranrioTips}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Routine Schedule Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" /> Grade Horária Semanal Recomendada
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="py-2.5 px-3">Dia</th>
                    <th className="py-2.5 px-3">Disciplina Principal</th>
                    <th className="py-2.5 px-3">Atividade / Metodologia</th>
                    <th className="py-2.5 px-3 text-right">Duração</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {plan.weeklyRoutine.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                      <td className="py-2.5 px-3 font-bold text-white">{d.day}</td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">{d.primaryTopic}</td>
                      <td className="py-2.5 px-3">{d.activity}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-200">{d.durationHours}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
