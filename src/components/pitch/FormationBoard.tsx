'use client';

import React from 'react';
import { useSeason } from '@/context/SeasonContext';
import { FORMATIONS_CONFIG } from '@/lib/soccer-data';
import { FormationId } from '@/lib/types';
import { Shield, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';

export const FormationBoard: React.FC = () => {
  const { activeFormation, setActiveFormation } = useSeason();
  const currentConfig = FORMATIONS_CONFIG[activeFormation] || FORMATIONS_CONFIG['4-3-3'];

  return (
    <div className="flex flex-col gap-4">
      {/* System Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          {(['4-3-3', '4-2-3-1', '3-5-2', '4-4-2'] as FormationId[]).map(fid => (
            <button
              key={fid}
              onClick={() => setActiveFormation(fid)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFormation === fid
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {fid}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>{currentConfig.name}</span>
        </div>
      </div>

      {/* Formation Pitch Board */}
      <div className="relative w-full aspect-[4/3] max-h-[440px] soccer-pitch rounded-xl overflow-hidden border border-emerald-500/30 shadow-2xl">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Pitch Lines */}
          <rect x="3" y="3" width="94" height="94" className="pitch-line" />
          <line x1="3" y1="50" x2="97" y2="50" className="pitch-line" />
          <circle cx="50" cy="50" r="14" className="pitch-line" />
          <circle cx="50" cy="50" r="1" fill="#ffffff" />
          
          {/* Penalty Boxes */}
          <rect x="25" y="3" width="50" height="18" className="pitch-line" />
          <rect x="25" y="79" width="50" height="18" className="pitch-line" />
          <rect x="36" y="89" width="28" height="8" className="pitch-line" />
          <circle cx="50" cy="88" r="1" fill="#ffffff" />

          {/* Connective Tactical Passing Lines between Nodes */}
          {currentConfig.nodes.slice(0, 10).map((node, idx) => {
            const nextNode = currentConfig.nodes[idx + 1];
            if (!nextNode) return null;
            return (
              <line
                key={idx}
                x1={node.xPct}
                y1={node.yPct}
                x2={nextNode.xPct}
                y2={nextNode.yPct}
                stroke="rgba(0, 240, 255, 0.25)"
                strokeWidth="0.6"
                strokeDasharray="1,1"
              />
            );
          })}
        </svg>

        {/* Player Position Pins */}
        {currentConfig.nodes.map(node => (
          <div
            key={node.playerNumber}
            style={{
              left: `${node.xPct}%`,
              top: `${node.yPct}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute flex flex-col items-center group cursor-pointer"
          >
            {/* Jersey Circle Badge */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#002147] to-[#001226] border-2 border-amber-400 text-amber-300 font-extrabold text-xs flex items-center justify-center shadow-lg shadow-black/80 group-hover:scale-125 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all">
              {node.playerNumber}
            </div>

            {/* Name & Role Pill */}
            <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-800 text-[9px] font-semibold text-slate-200 tracking-tight whitespace-nowrap shadow group-hover:border-amber-400 transition">
              {node.playerName} ({node.position})
            </div>

            {/* Hover Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 transition pointer-events-none absolute bottom-full mb-1 z-30 px-2 py-1 bg-slate-900 border border-cyan-400 rounded text-[10px] text-cyan-300 whitespace-nowrap shadow-xl">
              Role: {node.role}
            </div>
          </div>
        ))}
      </div>

      {/* Strengths & Vulnerabilities Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
            <CheckCircle className="w-3.5 h-3.5" /> SYSTEM STRENGTHS
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
            {currentConfig.strengths.map((str, i) => (
              <li key={i}>{str}</li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> TACTICAL SAFEGUARDS
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
            {currentConfig.vulnerabilities.map((vuln, i) => (
              <li key={i}>{vuln}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
