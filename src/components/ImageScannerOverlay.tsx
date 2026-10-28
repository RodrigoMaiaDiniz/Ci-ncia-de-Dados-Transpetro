import React, { useState, useEffect } from 'react';
import { Scan, Target, Check, Play, Pause, Sparkles, RefreshCw } from 'lucide-react';

interface ImageScannerOverlayProps {
  isScanning: boolean;
  onToggleScan?: () => void;
  scanLabel?: string;
  showAlwaysControls?: boolean;
}

export const ImageScannerOverlay: React.FC<ImageScannerOverlayProps> = ({
  isScanning,
  onToggleScan,
  scanLabel = 'Escaneando elementos visuais com IA...',
  showAlwaysControls = true
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const scanSteps = [
    'Detectando eixos cartesianos e variáveis...',
    'Mapeando curvas, distribuições e pontos de corte...',
    'Correlacionando com padrões da banca Cesgranrio...',
    'Sintetizando explicação pedagógica Transpetro...'
  ];

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % scanSteps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isScanning, scanSteps.length]);

  if (!isScanning) {
    if (!showAlwaysControls) return null;
    return (
      <div className="absolute top-2 right-2 z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleScan?.();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/85 hover:bg-slate-850 backdrop-blur-md border border-cyan-500/40 text-[11px] font-bold text-cyan-300 shadow-lg hover:border-cyan-400 transition active:scale-95"
          title="Ativar animação de escaneamento e análise visual com IA"
        >
          <Scan className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Animação Visual</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl bg-slate-950/25 backdrop-blur-[0.5px]">
      {/* Laser Scanning Line with Trailing Glow */}
      <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4,0_0_30px_#10b981] animate-laser-scan" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d418_1px,transparent_1px),linear-gradient(to_bottom,#06b6d418_1px,transparent_1px)] bg-[size:20px_20px] animate-grid-pulse" />

      {/* Corner Targeting Brackets */}
      <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400 animate-hud-bracket shadow-[0_0_8px_#06b6d4]" />
      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-400 animate-hud-bracket shadow-[0_0_8px_#06b6d4]" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400 animate-hud-bracket shadow-[0_0_8px_#06b6d4]" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-400 animate-hud-bracket shadow-[0_0_8px_#06b6d4]" />

      {/* Center Targeting Reticle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-16 h-16 rounded-full border border-dashed border-cyan-400 animate-spin [animation-duration:12s]" />
        <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </div>

      {/* Top Telemetry Header Badge */}
      <div className="absolute top-2.5 inset-x-0 flex justify-center px-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/50 backdrop-blur-md shadow-2xl text-[11px] font-bold text-cyan-300">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Scan className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:3s]" />
          <span className="uppercase tracking-wider">ESCANEANDO IMAGEM COM IA</span>
          {onToggleScan && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleScan();
              }}
              className="ml-1 p-0.5 rounded text-slate-400 hover:text-white"
              title="Pausar escaneamento"
            >
              <Pause className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Live Step Feed */}
      <div className="absolute bottom-3 inset-x-3 flex justify-center pointer-events-auto">
        <div className="w-full max-w-sm px-3 py-1.5 rounded-xl bg-slate-950/92 border border-emerald-500/40 backdrop-blur-md shadow-2xl flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 min-w-0">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" />
            <span className="text-emerald-300 font-medium truncate">
              {scanSteps[activeStep]}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
            [{activeStep + 1}/4]
          </span>
        </div>
      </div>
    </div>
  );
};
