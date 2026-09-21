'use client';

import React from 'react';
import { Shield, Zap, AlertCircle, Clock } from 'lucide-react';

interface BroadcastSoccerHudProps {
  minute?: number;
  second?: number;
  peddieScore?: number;
  opponentScore?: number;
  opponentName?: string;
  peddieXg?: number;
  opponentXg?: number;
  possessionPeddie?: number;
  pressStatus?: string;
}

export const BroadcastSoccerHud: React.FC<BroadcastSoccerHudProps> = ({
  minute = 80,
  second = 0,
  peddieScore = 0,
  opponentScore = 5,
  opponentName = 'HAVERFORD',
  peddieXg = 1.15,
  opponentXg = 3.48,
  possessionPeddie = 45,
  pressStatus = 'FINAL • 4x20-MIN PERIODS'
}) => {
  return (
    <div className="w-full glass-panel p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-cyan-500/30">
      {/* Match Clock & Score Pill */}
      <div className="flex items-center gap-4">
        {/* Clock */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-cyan-400 font-mono text-sm font-bold shadow-inner">
          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{minute}:{second < 10 ? `0${second}` : second}</span>
          <span className="text-[10px] text-amber-400 uppercase font-sans font-black ml-1">FINAL</span>
        </div>

        {/* Score Board */}
        <div className="flex items-center gap-3">
          {/* Peddie Team */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#002147] border border-amber-400 flex items-center justify-center font-black text-amber-400 text-xs shadow">
              P
            </div>
            <span className="font-extrabold text-white text-sm tracking-wide">PEDDIE</span>
            <span className="text-2xl font-black text-amber-400 font-mono">{peddieScore}</span>
          </div>

          <span className="text-slate-500 font-bold">-</span>

          {/* Opponent Team */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-300 font-mono">{opponentScore}</span>
            <span className="font-extrabold text-slate-300 text-sm tracking-wide">{opponentName}</span>
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-slate-300 text-xs">
              {opponentName.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Expected Goals & Telemetry HUD */}
      <div className="flex items-center gap-6 text-xs">
        {/* xG Metric */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">EXPECTED GOALS (xG)</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono font-black text-emerald-400 text-sm">{peddieXg.toFixed(2)}</span>
            <span className="text-slate-600">vs</span>
            <span className="font-mono font-bold text-slate-400 text-sm">{opponentXg.toFixed(2)}</span>
          </div>
        </div>

        {/* Possession Meter */}
        <div className="w-32 flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>POSSESSION</span>
            <span className="text-cyan-400">{possessionPeddie}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
            <div style={{ width: `${possessionPeddie}%` }} className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full"></div>
            <div style={{ width: `${100 - possessionPeddie}%` }} className="bg-slate-700 h-full"></div>
          </div>
        </div>

        {/* Tactical Status Beacon */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold">
          <Zap className="w-3 h-3 text-amber-400 animate-bounce" />
          <span>{pressStatus}</span>
        </div>
      </div>
    </div>
  );
};
