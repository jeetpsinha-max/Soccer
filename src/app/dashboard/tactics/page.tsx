'use client';

import React from 'react';
import { FormationBoard } from '@/components/pitch/FormationBoard';
import { useSeason } from '@/context/SeasonContext';
import { FORMATIONS_CONFIG } from '@/lib/soccer-data';
import { Layers, Activity, Compass, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export default function TacticsPage() {
  const { activeFormation } = useSeason();
  const [tacticsMatch, setTacticsMatch] = React.useState<'aquinas' | 'haverford'>('aquinas');
  const isAquinas = tacticsMatch === 'aquinas';
  const config = FORMATIONS_CONFIG[activeFormation] || FORMATIONS_CONFIG['4-3-3'];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-5 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
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

        {/* Match Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setTacticsMatch('aquinas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
              isAquinas ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Aquinas (3-2 W)
          </button>
          <button
            onClick={() => setTacticsMatch('haverford')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
              !isAquinas ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Haverford (0-5 L)
          </button>
        </div>
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
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              {isAquinas ? 'Match 1 Period Tilt (vs St. Thomas Aquinas)' : 'Match 0 Scrimmage Tilt (vs Haverford)'}
            </h2>
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
              {isAquinas ? 'AVG 62.4% PEDDIE TILT' : 'AVG 41.2% PEDDIE TILT'}
            </span>
          </div>

          {isAquinas ? (
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Period 1: 0&apos; - 35&apos; (Tommy Kim 34&apos; Opener & Central Press)</span>
                  <span className="font-mono font-bold text-amber-400">58% Peddie</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-amber-500 h-full w-[58%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Period 2: 35&apos; - 60&apos; (Tharney 58&apos; Corner Header & High Turnover)</span>
                  <span className="font-mono font-bold text-emerald-400">64% Peddie</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[64%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Period 3: 60&apos; - 82&apos; (Carson Fleming 81&apos; Winner Breakaway)</span>
                  <span className="font-mono font-bold text-cyan-400">66% Peddie</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[66%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Period 4: 82&apos; - 90&apos;+ (Late Lockout Block & McKenzie Saves)</span>
                  <span className="font-mono font-bold text-slate-300">56% Peddie</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-slate-400 h-full w-[56%]"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Period 1: 0&apos; - 20&apos; (Diamond Midfield Initial Press)</span>
                  <span className="font-mono font-bold text-cyan-400">46% Peddie</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[46%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Period 2: 20&apos; - 40&apos; (Tommy Kim 34&apos; Chance & Midfield Spell)</span>
                  <span className="font-mono font-bold text-amber-400">52% Peddie</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-amber-500 h-full w-[52%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Period 3: 40&apos; - 60&apos; (Flank Overloads with Romanelli & Cuchera)</span>
                  <span className="font-mono font-bold text-slate-400">42% Peddie</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-slate-500 h-full w-[42%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Period 4: 60&apos; - 80&apos; (McKenzie Box Command & Defensive Block)</span>
                  <span className="font-mono font-bold text-slate-400">41% Peddie</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-slate-500 h-full w-[41%]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expected Threat (xT) Passing Hubs */}
        <div className="glass-panel p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Expected Threat (xT) Central Hubs
            </h2>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
              {isAquinas ? 'Match 1 Production' : 'Preseason Baseline'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#13 Christian Tharney (CDM, Captain)</div>
                <div className="text-[11px] text-slate-400">
                  {isAquinas ? 'Goal 58\' | Diamond Anchor | Passes: 74 | Acc: 90.2%' : 'Diamond Base Anchor | Passes: 68 | Accuracy: 88.6%'}
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-amber-400">
                  {isAquinas ? '+3.12' : '+2.84'}
                </span>
                <div className="text-[10px] text-slate-400">xT Created</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#14 Rayyaan Mohiuddin (CAM, Captain)</div>
                <div className="text-[11px] text-slate-400">
                  {isAquinas ? 'Assist 34\' | Free 10 | Half-space through-balls: 9' : 'Diamond Tip Free 10 | Half-space through-balls: 7'}
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-cyan-400">
                  {isAquinas ? '+2.95' : '+2.35'}
                </span>
                <div className="text-[10px] text-slate-400">xT Created</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">
                  {isAquinas ? '#15 Carson Fleming (ST / Winner 81\')' : '#28 Tommy Kim (ST, Captain)'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isAquinas ? 'Game Winner 81\' | Clinical 1v1 finish | Sprints: 18' : 'Direct Striker | Channel runs: 12 | Shots on frame: 3'}
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-emerald-400">
                  {isAquinas ? '+2.48' : '+1.95'}
                </span>
                <div className="text-[10px] text-slate-400">xT Created</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
