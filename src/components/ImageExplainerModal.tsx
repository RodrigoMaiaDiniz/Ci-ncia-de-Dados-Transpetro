import React, { useState, useEffect } from 'react';
import { X, Scan, Play, Pause, RefreshCw, Sparkles, Download, BookOpen, Check, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { cleanCesgranrioExamNotation } from '../utils/mathNotation';

interface ImageExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName: string;
  onAskAgentToExplain: (prompt: string) => void;
  isAgentThinking?: boolean;
}

export const ImageExplainerModal: React.FC<ImageExplainerModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageName,
  onAskAgentToExplain,
  isAgentThinking = false
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [selectedHighlight, setSelectedHighlight] = useState<number>(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const analysisPoints = [
    {
      title: '1. Reconhecimento de Eixos & Variáveis',
      tag: 'Eixos & Escalas',
      description: 'Identificação das dimensões nos eixos horizontal e vertical, checagem de escalas (lineares vs logarítmicas) e unidades físicas ou probabilísticas.'
    },
    {
      title: '2. Curvas, Limiares e Pontos de Inflexão',
      tag: 'Comportamento Preditivo',
      description: 'Mapeamento de comportamentos não lineares, pontos ótimos (ex: Índice de Youden na Curva ROC), áreas sob a curva (AUC) e regiões de corte.'
    },
    {
      title: '3. Foco nas Pegadinhas da Banca Cesgranrio',
      tag: 'Banca Cesgranrio',
      description: 'Verificação de armadilhas clássicas: classes desbalanceadas, inversão de falso positivo vs falso negativo e confusão entre correlação e causalidade.'
    },
    {
      title: '4. Aplicação Prática no Setor Transpetro',
      tag: 'Operação de Dutos',
      description: 'Correlação com cenários de telemetria SCADA: detecção de anomalias em pressão, vibração de bombas e monitoramento de vazão em oleodutos.'
    }
  ];

  useEffect(() => {
    if (!isOpen) return;
    setIsScanning(true);
  }, [isOpen]);

  if (!isOpen) return null;

  const defaultPrompt = `Explique detalhadamente esta imagem/gráfico no padrão da banca Cesgranrio para a Transpetro: analise cada elemento visual, eixos, curvas, fórmulas e aponte as pegadinhas que costumam ser cobradas em prova sobre o assunto.`;

  const handleTriggerExplanation = () => {
    onAskAgentToExplain(defaultPrompt);
    onClose();
  };

  return (
    <div 
      id="image-explainer-animation-modal"
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-3 sm:p-6 animate-in fade-in duration-200 text-slate-100"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 max-w-6xl mx-auto w-full shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Scan className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-0.5">
              <span>Análise &amp; Escaneamento Visual de Imagem</span>
              <span>•</span>
              <span className="text-emerald-400 font-mono">IA Especialista</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
              {imageName || 'Imagem / Diagrama Técnico'}
            </h2>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Pause / Play Scanner */}
          <button
            type="button"
            onClick={() => setIsScanning(!isScanning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition active:scale-95 ${
              isScanning
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Pausar ou reiniciar animação de escaneamento"
          >
            {isScanning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pausar Escaneamento</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Iniciar Escaneamento</span>
              </>
            )}
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition"
            title="Fechar janela"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto w-full min-h-0 overflow-y-auto">
        {/* Left: Image Container with Visual Scanner HUD */}
        <div className="flex-1 flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden min-h-[340px]">
          <div className="relative w-full h-full max-h-[560px] flex items-center justify-center overflow-hidden rounded-xl bg-[#030712]">
            <img
              src={imageUrl}
              alt={imageName}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Visual Scanner HUD Layer */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Traveling Laser Line */}
                <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4,0_0_40px_#10b981] animate-laser-scan" />

                {/* Digital Coordinate Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d418_1px,transparent_1px),linear-gradient(to_bottom,#06b6d418_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-pulse" />

                {/* Corner Targeting Brackets */}
                <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-cyan-400 animate-hud-bracket shadow-[0_0_12px_#06b6d4]" />
                <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-cyan-400 animate-hud-bracket shadow-[0_0_12px_#06b6d4]" />
                <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-cyan-400 animate-hud-bracket shadow-[0_0_12px_#06b6d4]" />
                <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-cyan-400 animate-hud-bracket shadow-[0_0_12px_#06b6d4]" />

                {/* Telemetry pill */}
                <div className="absolute top-4 inset-x-0 flex justify-center">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-400/60 backdrop-blur-md shadow-2xl text-xs font-bold text-cyan-300">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>RASTREAMENTO VISUAL ATIVO • IA TRANSPETRO</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Analytical Inspection Panel */}
        <div className="w-full lg:w-96 flex flex-col gap-3 shrink-0">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Etapas de Análise Visual</span>
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Como o Agente examina o gráfico ou diagrama para o padrão de cobrança da Cesgranrio:
            </p>

            <div className="space-y-2">
              {analysisPoints.map((pt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedHighlight(idx)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                    selectedHighlight === idx
                      ? 'bg-slate-950 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{pt.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                      {pt.tag}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action to Ask Agent */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Enviar para Resolução Completa do Agente</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Solicite que o Agente Especialista resolva as dúvidas desta imagem no chat com fundamentação teórica, identificação de pegadinhas e fórmulas oficiais.
            </p>
            <button
              type="button"
              onClick={handleTriggerExplanation}
              disabled={isAgentThinking}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition active:scale-95"
            >
              <Scan className="w-4 h-4" />
              <span>{isAgentThinking ? 'Agente Analisando...' : 'Pedir Explicação Completa ao Agente'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
