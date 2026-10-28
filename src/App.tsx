/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { AgentChat } from './components/AgentChat';
import { ExamSimulator } from './components/ExamSimulator';
import { AudioStudyPlayer } from './components/AudioStudyPlayer';
import { DiscursiveEvaluator } from './components/DiscursiveEvaluator';
import { FlashcardsVault } from './components/FlashcardsVault';
import { StudyPlanner } from './components/StudyPlanner';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { SubjectHistory } from './components/SubjectHistory';
import { DigitalLibrary } from './components/DigitalLibrary';
import { 
  INITIAL_QUESTIONS, 
  INITIAL_ESSAY_SCENARIOS, 
  INITIAL_FLASHCARDS, 
  SYLLABUS_TOPICS 
} from './data/initialData';
import { ShieldCheck, Bot, GraduationCap, FileCheck, Layers, Calendar, BookOpen, Sparkles, Headphones, History } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('agent');
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(() => {
    const saved = localStorage.getItem('tp_questions_count');
    return saved ? parseInt(saved, 10) : 18;
  });
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('tp_streak_days');
    return saved ? parseInt(saved, 10) : 5;
  });

  const handleQuestionAnswered = (questionId: string, isCorrect: boolean) => {
    setQuestionsAnswered(prev => {
      const next = prev + 1;
      localStorage.setItem('tp_questions_count', next.toString());
      return next;
    });
  };

  const handleTrainTopicWithAI = (topicName: string) => {
    const prompt = `Gostaria de uma aula aprofundada sobre o tópico "${topicName}" do edital da Transpetro (Banca Cesgranrio). Poderia detalhar os conceitos essenciais, fórmulas ou códigos, as pegadinhas clássicas da banca Cesgranrio e um exemplo prático aplicado a dutos ou terminais marítimos?`;
    setPendingPrompt(prompt);
    setActiveTab('agent');
  };

  const handleContinueInAgent = (query?: string, topicTitle?: string) => {
    if (query) {
      setPendingPrompt(query);
    }
    setActiveTab('agent');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        questionsAnsweredCount={questionsAnswered}
        streakDays={streakDays}
      />

      {/* Main Content View */}
      <main className="flex-1 w-full pb-12">
        {activeTab === 'agent' && (
          <AgentChat
            onNavigateToSimulator={() => setActiveTab('simulator')}
            onNavigateToDiscursive={() => setActiveTab('discursive')}
            onNavigateToAudio={() => setActiveTab('audio')}
            onNavigateToHistory={() => setActiveTab('history')}
            onNavigateToBooks={() => setActiveTab('books')}
            pendingPrompt={pendingPrompt}
            onClearPendingPrompt={() => setPendingPrompt(null)}
          />
        )}

        {activeTab === 'books' && (
          <DigitalLibrary
            onTrainTopicWithAI={handleTrainTopicWithAI}
            onOpenAudioTab={() => setActiveTab('audio')}
          />
        )}

        {activeTab === 'history' && (
          <SubjectHistory
            onNavigateToAgent={handleContinueInAgent}
            onTrainTopicWithAI={handleTrainTopicWithAI}
          />
        )}

        {activeTab === 'simulator' && (
          <ExamSimulator
            initialQuestions={INITIAL_QUESTIONS}
            onQuestionAnswered={handleQuestionAnswered}
          />
        )}

        {activeTab === 'audio' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <AudioStudyPlayer
              questions={INITIAL_QUESTIONS}
              onSelectQuestionInSimulator={(qId) => {
                setActiveTab('simulator');
              }}
            />
          </div>
        )}

        {activeTab === 'discursive' && (
          <DiscursiveEvaluator
            initialScenarios={INITIAL_ESSAY_SCENARIOS}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsVault
            initialCards={INITIAL_FLASHCARDS}
          />
        )}

        {activeTab === 'planner' && (
          <StudyPlanner />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusExplorer
            topics={SYLLABUS_TOPICS}
            onTrainTopicWithAI={handleTrainTopicWithAI}
            onOpenAudioTab={() => setActiveTab('audio')}
          />
        )}
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Transpetro Data Science AI Agent</span>
            <span>•</span>
            <span>Concurso Nível Superior (Banca Cesgranrio)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500/80 font-mono">Gemini 3.7 Flash Engine</span>
            <span>•</span>
            <span>100% Calibrado com o Edital</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
