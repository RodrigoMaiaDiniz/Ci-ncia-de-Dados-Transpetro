import React from 'react';
import { 
  Bot, 
  GraduationCap, 
  FileCheck, 
  Layers, 
  Calendar, 
  BookOpen, 
  Flame, 
  Sparkles,
  ShieldCheck,
  Headphones,
  History,
  BookMarked
} from 'lucide-react';

export type ActiveTab = 'agent' | 'books' | 'simulator' | 'audio' | 'discursive' | 'flashcards' | 'planner' | 'syllabus' | 'history';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  questionsAnsweredCount: number;
  streakDays: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  questionsAnsweredCount,
  streakDays,
}) => {
  const tabs = [
    { id: 'agent', label: 'Agente Especialista', icon: Bot, badge: 'IA Ativa' },
    { id: 'books', label: 'Livros Digitais', icon: BookMarked, badge: '14 Manuais' },
    { id: 'history', label: 'Histórico de Assuntos', icon: History, badge: 'Salvo' },
    { id: 'simulator', label: 'Simulador Provas', icon: GraduationCap, badge: 'Petrobras 2022' },
    { id: 'audio', label: 'Áudio Estudo', icon: Headphones, badge: 'Ouvir Aulas' },
    { id: 'discursive', label: 'Prova Discursiva', icon: FileCheck, badge: 'Estudos de Caso' },
    { id: 'flashcards', label: 'Flashcards & Fórmulas', icon: Layers, badge: 'Fixação' },
    { id: 'planner', label: 'Plano Tático', icon: Calendar, badge: 'Personalizado' },
    { id: 'syllabus', label: 'Edital & Tópicos', icon: BookOpen, badge: '100% Coberto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Contest Identifier */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20 font-black">
              <Bot className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  Transpetro <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">DataAgent</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Nível Superior
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                Banca Cesgranrio • Concurso Profissional de Ciência de Dados
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics & User Progress */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{streakDays} dias</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{questionsAnsweredCount} questões resolvidas</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Scroll */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-mobile-${tab.id}`}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
