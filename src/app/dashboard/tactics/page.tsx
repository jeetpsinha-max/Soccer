'use client';

import React from 'react';
import { FormationBoard } from '@/components/pitch/FormationBoard';
import { useSeason } from '@/context/SeasonContext';
import { FORMATIONS_CONFIG } from '@/lib/soccer-data';
import { Layers, Activity, Compass, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export default function TacticsPage() {
  const { activeFormation } = useSeason();
  const config = FORMATIONS_CONFIG[activeFormation] || FORMATIONS_CONFIG['4-3-3'];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-5 border border-amber-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-[11px] uppercase">
            TACTICAL ENGINE & POSITIONAL PLAY
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-slate-400 text-xs">Peddie Soccer 2026–2027</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          Tactical Formations, Passing Networks & Field Tilt
        </h1>
        <p className="text-xs text-slate-300 mt-0.5">
          Positional play architecture, passing triangles, half-space penetration routes, and situational shape shifting.
        </p>
      </div>

      {/* Main Formation Canvas */}
      <div className="glass-panel p-6">
        <FormationBoard />
      </div>

      {/* Positional Passing Network & Field Tilt Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Field Tilt & Spatial Dominance */}
        <div className="glass-panel p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> 15-Minute Field Tilt Dominance
            </h2>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">AVG 65.0% PEDDIE</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>0&apos; - 15&apos; (Early Feeling Out)</span>
                <span className="font-mono font-bold text-cyan-400">54% Peddie</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="bg-cyan-500 h-full w-[54%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>15&apos; - 30&apos; (Blake Romanelli 18&apos; Goal Spell)</span>
                <span className="font-mono font-bold text-amber-400">72% Peddie</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="bg-amber-500 h-full w-[72%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>30&apos; - 45&apos; (Quinn Wachtveitl Crossbar Header)</span>
                <span className="font-mono font-bold text-cyan-400">68% Peddie</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="bg-cyan-500 h-full w-[68%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>45&apos; - 60&apos; (Blair Equalizer Push)</span>
                <span className="font-mono font-bold text-slate-400">48% Peddie</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="bg-slate-500 h-full w-[48%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>60&apos; - 75&apos; (Tommy Kim 74&apos; Game Winner)</span>
                <span className="font-mono font-bold text-emerald-400">76% Peddie</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[76%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Threat (xT) Passing Hubs */}
        <div className="glass-panel p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Expected Threat (xT) Central Hubs
            </h2>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">Progressive Value</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#8 Massimo Sheinin (CM)</div>
                <div className="text-[11px] text-slate-400">Pass Volume: 88 passes | Success: 95%</div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-amber-400">+2.48</span>
                <div className="text-[10px] text-slate-400">xT Created</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#3 Noah Eldessouky (LB)</div>
                <div className="text-[11px] text-slate-400">Overlaps: 14 | Crosses: 8</div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-cyan-400">+1.82</span>
                <div className="text-[10px] text-slate-400">xT Created</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#10 Tommy Kim (CAM)</div>
                <div className="text-[11px] text-slate-400">Half-space receipts: 22</div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-emerald-400">+1.65</span>
                <div className="text-[10px] text-slate-400">xT Created</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
