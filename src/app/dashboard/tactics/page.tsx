'use client';

import React from 'react';
import { FormationBoard } from '@/components/pitch/FormationBoard';
import { useSeason } from '@/context/SeasonContext';
import { FORMATIONS_CONFIG } from '@/lib/soccer-data';
import { Layers, Activity, Compass, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export default function TacticsPage() {
  const { activeFormation } = useSeason();
  const [tacticsMatch, setTacticsMatch] = React.useState<'pds' | 'george' | 'aquinas' | 'haverford'>('pds');
  const config = FORMATIONS_CONFIG[activeFormation] || FORMATIONS_CONFIG['4-4-2'];

  const MATCH_TACTICS_DATA = {
    pds: {
      title: 'Princeton Day School (7-1 W)',
      tiltLabel: 'AVG 68.4% PEDDIE TILT',
      periodTilt: [
        { period: 'Period 1: 0\' - 25\' (Tommy Kim 14\' Opener & Diamond Overload)', pct: '66% Peddie', width: 'w-[66%]', color: 'bg-amber-500' },
        { period: 'Period 2: 25\' - 50\' (Tommy Kim 29\' & High-Press Blitz)', pct: '74% Peddie', width: 'w-[74%]', color: 'bg-emerald-500' },
        { period: 'Period 3: 50\' - 70\' (Kim Hat-Trick 61\' & Flank Penetration)', pct: '71% Peddie', width: 'w-[71%]', color: 'bg-cyan-500' },
        { period: 'Period 4: 70\' - 90\' (Bench Depth & Complete Lockout)', pct: '62% Peddie', width: 'w-[62%]', color: 'bg-slate-400' }
      ],
      hubTharney: 'Diamond Base Anchor | Passes: 82 | Acc: 92.4%',
      xtTharney: '+3.48',
      hubMohiuddin: 'Tip of Diamond 10 | Zone 14 Key Passes: 11 | xA: 1.45',
      xtMohiuddin: '+3.95',
      hubStriker: '#28 Tommy Kim (ST, Captain)',
      strikerDesc: 'Hat-Trick Hero (14\', 29\', 61\') | 5 Shots on Frame | xG: 2.85',
      xtStriker: '+4.12'
    },
    george: {
      title: 'George School (5-2 W)',
      tiltLabel: 'AVG 62.1% PEDDIE TILT',
      periodTilt: [
        { period: 'Period 1: 0\' - 25\' (Road Blitz & High Press 8.1 PPDA)', pct: '64% Peddie', width: 'w-[64%]', color: 'bg-amber-500' },
        { period: 'Period 2: 25\' - 50\' (Midfield Circulation & 2 Quick Goals)', pct: '68% Peddie', width: 'w-[68%]', color: 'bg-emerald-500' },
        { period: 'Period 3: 50\' - 70\' (Transition Attack & Flank Isolation)', pct: '59% Peddie', width: 'w-[59%]', color: 'bg-cyan-500' },
        { period: 'Period 4: 70\' - 90\' (Game Management & Defensive Shape)', pct: '57% Peddie', width: 'w-[57%]', color: 'bg-slate-400' }
      ],
      hubTharney: 'Single Pivot Anchor | Interceptions: 8 | Acc: 89.6%',
      xtTharney: '+3.15',
      hubMohiuddin: 'Playmaker Conductor | Progressive Carries: 14',
      xtMohiuddin: '+3.20',
      hubStriker: '#28 Tommy Kim & #20 Jeffery Zhang',
      strikerDesc: 'Twin Striker Pressing Triggers | Combined 3 Goals',
      xtStriker: '+3.40'
    },
    aquinas: {
      title: 'St. Thomas Aquinas (3-2 W)',
      tiltLabel: 'AVG 62.4% PEDDIE TILT',
      periodTilt: [
        { period: 'Period 1: 0\' - 35\' (Tommy Kim 34\' Opener & Central Press)', pct: '58% Peddie', width: 'w-[58%]', color: 'bg-amber-500' },
        { period: 'Period 2: 35\' - 60\' (Tharney 58\' Corner Header & High Turnover)', pct: '64% Peddie', width: 'w-[64%]', color: 'bg-emerald-500' },
        { period: 'Period 3: 60\' - 82\' (Carson Wiley 81\' Winner Header)', pct: '66% Peddie', width: 'w-[66%]', color: 'bg-cyan-500' },
        { period: 'Period 4: 82\' - 90\'+ (Late Lockout Block & McKenzie Saves)', pct: '56% Peddie', width: 'w-[56%]', color: 'bg-slate-400' }
      ],
      hubTharney: 'Goal 58\' | Diamond Anchor | Passes: 74 | Acc: 90.2%',
      xtTharney: '+3.12',
      hubMohiuddin: 'Assist 34\' | Free 10 | Half-space through-balls: 9',
      xtMohiuddin: '+2.95',
      hubStriker: '#22 Carson Wiley (CB / Winner 81\')',
      strikerDesc: 'Game Winner 81\' | Towering header from Cuchera corner',
      xtStriker: '+2.48'
    },
    haverford: {
      title: 'The Haverford School (0-5 L)',
      tiltLabel: 'AVG 41.2% PEDDIE TILT',
      periodTilt: [
        { period: 'Period 1: 0\' - 20\' (Diamond Midfield Initial Press)', pct: '46% Peddie', width: 'w-[46%]', color: 'bg-cyan-500' },
        { period: 'Period 2: 20\' - 40\' (Tommy Kim 34\' Chance & Midfield Spell)', pct: '52% Peddie', width: 'w-[52%]', color: 'bg-amber-500' },
        { period: 'Period 3: 40\' - 60\' (Flank Overloads with Romanelli & Cuchera)', pct: '42% Peddie', width: 'w-[42%]', color: 'bg-slate-500' },
        { period: 'Period 4: 60\' - 80\' (McKenzie Box Command & Defensive Block)', pct: '41% Peddie', width: 'w-[41%]', color: 'bg-slate-500' }
      ],
      hubTharney: 'Diamond Base Anchor | Passes: 68 | Accuracy: 88.6%',
      xtTharney: '+2.84',
      hubMohiuddin: 'Diamond Tip Free 10 | Half-space through-balls: 7',
      xtMohiuddin: '+2.35',
      hubStriker: '#28 Tommy Kim (ST, Captain)',
      strikerDesc: 'Direct Striker | Channel runs: 12 | Shots on frame: 3',
      xtStriker: '+1.95'
    }
  };

  const activeData = MATCH_TACTICS_DATA[tacticsMatch];

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
            <span className="text-slate-400 text-xs font-semibold">Peddie Soccer 2026–2027</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Tactical Formations, Passing Networks & Field Tilt
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Positional play architecture, passing triangles, half-space penetration routes, and situational shape shifting.
          </p>
        </div>

        {/* Match Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 flex-wrap">
          <button
            onClick={() => setTacticsMatch('pds')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
              tacticsMatch === 'pds' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            PDS (7-1 W)
          </button>
          <button
            onClick={() => setTacticsMatch('george')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
              tacticsMatch === 'george' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            George (5-2 W)
          </button>
          <button
            onClick={() => setTacticsMatch('aquinas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
              tacticsMatch === 'aquinas' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Aquinas (3-2 W)
          </button>
          <button
            onClick={() => setTacticsMatch('haverford')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
              tacticsMatch === 'haverford' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
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
              {activeData.title} Field Tilt
            </h2>
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
              {activeData.tiltLabel}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {activeData.periodTilt.map((pt, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>{pt.period}</span>
                  <span className="font-mono font-bold text-amber-400">{pt.pct}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`${pt.color} h-full ${pt.width}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Threat (xT) Passing Hubs */}
        <div className="glass-panel p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Expected Threat (xT) Central Hubs
            </h2>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
              {activeData.title} Production
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#13 Christian Tharney (CDM, Captain)</div>
                <div className="text-[11px] text-slate-400">
                  {activeData.hubTharney}
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-amber-400">
                  {activeData.xtTharney}
                </span>
                <div className="text-[10px] text-slate-400">xT Created</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#14 Rayyaan Mohiuddin (CAM, Captain)</div>
                <div className="text-[11px] text-slate-400">
                  {activeData.hubMohiuddin}
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-cyan-400">
                  {activeData.xtMohiuddin}
                </span>
                <div className="text-[10px] text-slate-400">xT Created</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">
                  {activeData.hubStriker}
                </div>
                <div className="text-[11px] text-slate-400">
                  {activeData.strikerDesc}
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-emerald-400">
                  {activeData.xtStriker}
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
