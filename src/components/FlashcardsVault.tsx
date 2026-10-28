import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  RotateCw, 
  Check, 
  X, 
  Filter, 
  Flame, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Code2,
  RefreshCw
} from 'lucide-react';
import { Flashcard } from '../types';

interface FlashcardsVaultProps {
  initialCards: Flashcard[];
}

export const FlashcardsVault: React.FC<FlashcardsVaultProps> = ({
  initialCards,
}) => {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Todos');
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Generator
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredCards = selectedTopic === 'Todos'
    ? cards
    : cards.filter(c => c.topic.toLowerCase().includes(selectedTopic.toLowerCase()));

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const toggleMastered = (id: string) => {
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleGenerateCustomCard = async () => {
    if (!customTopic.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Gere 2 flashcards de altíssimo impacto para o concurso Transpetro Ciência de Dados sobre o tópico: "${customTopic}".
Formato JSON estrito:
[
  {
    "topic": "${customTopic}",
    "front": "Pergunta ou Conceito Chave",
    "back": "Explicação objetiva, mnemônica e completa",
    "formulaOrCode": "Fórmula matemática ou snippet essencial",
    "examFrequency": "Altíssima"
  }
]`
            }
          ],
          mode: 'tutor'
        })
      });

      const data = await response.json();
      // Try to parse json from text
      const rawText = data.text || '';
      const jsonMatch = rawText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed: Flashcard[] = JSON.parse(jsonMatch[0]).map((c: any, i: number) => ({
          ...c,
          id: `fc-gen-${Date.now()}-${i}`
        }));
        setCards(prev => [...parsed, ...prev]);
        setCurrentIndex(0);
        setSelectedTopic('Todos');
        setCustomTopic('');
      } else {
        // Fallback card
        const fallbackCard: Flashcard = {
          id: `fc-gen-${Date.now()}`,
          topic: customTopic,
          front: `Conceito Essencial: ${customTopic}`,
          back: rawText.slice(0, 300),
          examFrequency: 'Alta'
        };
        setCards(prev => [fallbackCard, ...prev]);
        setCurrentIndex(0);
        setSelectedTopic('Todos');
        setCustomTopic('');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar flashcards com IA.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Memória Rápida & Fórmulas
              </span>
              <span className="text-xs text-slate-400">Fixação Ativa para Cesgranrio</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Flashcards & Fórmulas Essenciais
            </h1>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
              Dominados: <span className="text-emerald-400 font-bold">{masteredIds.size}</span>/{cards.length}
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </span>
          {['Todos', 'Estatística', 'Machine Learning', 'Big Data', 'Governança'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedTopic(t);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedTopic === t
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Card */}
      {currentCard ? (
        <div className="space-y-4">
          
          <div 
            id={`flashcard-item-${currentCard.id}`}
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[320px] bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
          >
            {/* Card Top Meta */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-950 border border-slate-800 text-slate-300">
                {currentCard.topic}
              </span>
              
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" /> Cobrança: {currentCard.examFrequency}
                </span>
                <span className="text-xs text-slate-500">
                  {currentIndex + 1} de {filteredCards.length}
                </span>
              </div>
            </div>

            {/* Card Content (Front vs Back) */}
            <div className="py-6 text-center space-y-4">
              {!isFlipped ? (
                <div>
                  <div className="text-xs uppercase font-bold text-slate-500 mb-2">Conceito / Pergunta (Clique para virar)</div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {currentCard.front}
                  </h2>
                </div>
              ) : (
                <div className="text-left space-y-4 animate-in fade-in duration-200">
                  <div className="text-xs uppercase font-bold text-emerald-400 mb-1">Gabarito / Explicação:</div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {currentCard.back}
                  </p>

                  {currentCard.formulaOrCode && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-line">
                      {currentCard.formulaOrCode}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Card Bottom / Hint */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 group-hover:text-emerald-400 transition">
                <RotateCw className="w-3.5 h-3.5" /> Clique para alternar frente / verso
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition ${
                  masteredIds.has(currentCard.id)
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Check className="w-3 h-3" /> {masteredIds.has(currentCard.id) ? 'Dominado' : 'Marcar como Dominado'}
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              id="prev-flashcard-btn"
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              <RotateCw className="w-3.5 h-3.5 text-emerald-400" /> Virar Cartão
            </button>

            <button
              id="next-flashcard-btn"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition"
            >
              Próximo <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          Nenhum flashcard disponível para este filtro.
        </div>
      )}

      {/* AI Card Generator Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Criar Novos Flashcards com IA
        </h3>
        <p className="text-xs text-slate-400">
          Digite qualquer fórmula, teorema estatístico ou conceito para o Gemini criar flashcards de fixação imediata:
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Ex: Teorema de Bayes, Matriz de Confusão, Spark Broadcast Join, SHAP..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />

          <button
            onClick={handleGenerateCustomCard}
            disabled={!customTopic.trim() || isGenerating}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Gerando...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Gerar Flashcards
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
