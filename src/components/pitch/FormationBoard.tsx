'use client';

import React, { useState } from 'react';
import { useSeason } from '@/context/SeasonContext';
import { FORMATIONS_CONFIG, PEDDIE_ROSTER_2026_2027, OPPONENT_VEO_SCOUTING } from '@/lib/soccer-data';
import { FormationId } from '@/lib/types';
import { 
  Shield, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Swords, 
  ChevronDown,
  Target,
  Zap,
  RotateCcw
} from 'lucide-react';

interface OpponentNode {
  position: string;
  name: string;
  xPct: number;
  yPct: number;
  isKeyPlaymaker?: boolean;
}

const OPPONENT_FORMATION_LAYOUTS: Record<string, OpponentNode[]> = {
  '4-3-3': [
    { position: 'GK', name: 'Opponent GK', xPct: 50, yPct: 8 },
    { position: 'LB', name: 'Left Back', xPct: 16, yPct: 22 },
    { position: 'CB', name: 'Center Back', xPct: 38, yPct: 20 },
    { position: 'CB', name: 'Center Back', xPct: 62, yPct: 20 },
    { position: 'RB', name: 'Right Back', xPct: 84, yPct: 22 },
    { position: 'CDM', name: 'Holding Pivot', xPct: 50, yPct: 38 },
    { position: 'CM', name: 'Left Mid', xPct: 34, yPct: 50 },
    { position: 'CM', name: 'Right Mid', xPct: 66, yPct: 50 },
    { position: 'LW', name: 'Left Wing', xPct: 18, yPct: 70 },
    { position: 'ST', name: 'Center Forward', xPct: 50, yPct: 78, isKeyPlaymaker: true },
    { position: 'RW', name: 'Right Wing', xPct: 82, yPct: 70 }
  ],
  '4-2-3-1': [
    { position: 'GK', name: 'Opponent GK', xPct: 50, yPct: 8 },
    { position: 'LB', name: 'Left Back', xPct: 16, yPct: 22 },
    { position: 'CB', name: 'Center Back', xPct: 38, yPct: 20 },
    { position: 'CB', name: 'Center Back', xPct: 62, yPct: 20 },
    { position: 'RB', name: 'Right Back', xPct: 84, yPct: 22 },
    { position: 'CDM', name: 'Double Pivot L', xPct: 38, yPct: 38 },
    { position: 'CDM', name: 'Double Pivot R', xPct: 62, yPct: 38 },
    { position: 'CAM', name: 'Attacking Mid', xPct: 50, yPct: 54, isKeyPlaymaker: true },
    { position: 'LM', name: 'Left Mid', xPct: 18, yPct: 68 },
    { position: 'RM', name: 'Right Mid', xPct: 82, yPct: 68 },
    { position: 'ST', name: 'Target Forward', xPct: 50, yPct: 78 }
  ],
  '3-5-2': [
    { position: 'GK', name: 'Opponent GK', xPct: 50, yPct: 8 },
    { position: 'CB', name: 'Left Stopper', xPct: 28, yPct: 22 },
    { position: 'CB', name: 'Central Sweeper', xPct: 50, yPct: 20 },
    { position: 'CB', name: 'Right Stopper', xPct: 72, yPct: 22 },
    { position: 'LWB', name: 'Left Wingback', xPct: 12, yPct: 46 },
    { position: 'CDM', name: 'Pivot Anchor', xPct: 50, yPct: 38 },
    { position: 'CM', name: 'Left Interior', xPct: 36, yPct: 52 },
    { position: 'CM', name: 'Right Interior', xPct: 64, yPct: 52 },
    { position: 'RWB', name: 'Right Wingback', xPct: 88, yPct: 46 },
    { position: 'ST', name: 'Twin Striker L', xPct: 38, yPct: 76, isKeyPlaymaker: true },
    { position: 'ST', name: 'Twin Striker R', xPct: 62, yPct: 76 }
  ],
  '4-4-2': [
    { position: 'GK', name: 'Opponent GK', xPct: 50, yPct: 8 },
    { position: 'LB', name: 'Left Back', xPct: 16, yPct: 22 },
    { position: 'CB', name: 'Center Back', xPct: 38, yPct: 20 },
    { position: 'CB', name: 'Center Back', xPct: 62, yPct: 20 },
    { position: 'RB', name: 'Right Back', xPct: 84, yPct: 22 },
    { position: 'LM', name: 'Left Mid', xPct: 18, yPct: 48 },
    { position: 'CM', name: 'Central Mid L', xPct: 38, yPct: 46 },
    { position: 'CM', name: 'Central Mid R', xPct: 62, yPct: 46 },
    { position: 'RM', name: 'Right Mid', xPct: 82, yPct: 48 },
    { position: 'ST', name: 'Striker 1', xPct: 38, yPct: 76, isKeyPlaymaker: true },
    { position: 'ST', name: 'Striker 2', xPct: 62, yPct: 76 }
  ]
};

export const FormationBoard: React.FC = () => {
  const { activeFormation, setActiveFormation } = useSeason();
  const [showOpponentOverlay, setShowOpponentOverlay] = useState<boolean>(true);
  const [selectedOpponentKey, setSelectedOpponentKey] = useState<string>('aquinas'); // St. Thomas Aquinas (Next Match)

  const currentConfig = FORMATIONS_CONFIG[activeFormation] || FORMATIONS_CONFIG['4-4-2'];
  const opponentScout = OPPONENT_VEO_SCOUTING[selectedOpponentKey] || OPPONENT_VEO_SCOUTING['aquinas'];
  
  const oppFormation = opponentScout.primaryFormation;
  const opponentNodes = OPPONENT_FORMATION_LAYOUTS[oppFormation] || OPPONENT_FORMATION_LAYOUTS['4-3-3'];

  // Midfield Overload calculation
  const peddieMidCount = activeFormation === '4-4-2' ? 4 : activeFormation === '3-5-2' ? 5 : 3;
  const oppMidCount = oppFormation === '3-5-2' ? 5 : oppFormation === '4-4-2' ? 4 : 3;
  const midDiff = peddieMidCount - oppMidCount;

  return (
    <div className="flex flex-col gap-5">
      {/* Top System Switcher & Opponent Matchup Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider">Peddie Shape:</div>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {(['4-4-2', '4-3-3', '4-2-3-1', '3-5-2'] as FormationId[]).map(fid => (
              <button
                key={fid}
                onClick={() => setActiveFormation(fid)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFormation === fid
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {fid === '4-4-2' ? '4-4-2 Diamond' : fid}
              </button>
            ))}
          </div>
        </div>

        {/* Opponent Tactical Simulation Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOpponentOverlay(!showOpponentOverlay)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                showOpponentOverlay
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-rose-400" />
              {showOpponentOverlay ? 'Simulating Opponent Shape' : 'Show Opponent Overlay'}
            </button>

            {showOpponentOverlay && (
              <select
                value={selectedOpponentKey}
                onChange={(e) => setSelectedOpponentKey(e.target.value)}
                className="bg-slate-900 border border-rose-500/40 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-rose-400 cursor-pointer"
              >
                {Object.entries(OPPONENT_VEO_SCOUTING).map(([key, scout]) => (
                  <option key={key} value={key}>
                    vs {scout.shortName} ({scout.primaryFormation})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Overload & Tactical Edge Banner */}
      {showOpponentOverlay && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-rose-500/10 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="font-bold text-white">Peddie {currentConfig.name}</span>
            <span className="text-slate-400 font-medium">vs</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="font-bold text-rose-300">{opponentScout.opponent} ({oppFormation})</span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded text-[11px] font-black uppercase ${
              midDiff > 0 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : midDiff === 0
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              Midfield Pocket: {peddieMidCount} vs {oppMidCount} ({midDiff > 0 ? `+${midDiff} Overload Advantage` : midDiff === 0 ? 'Equal Density' : `${midDiff} Disadvantage`})
            </span>

            <span className="text-slate-400 text-[11px]">
              Win Expectancy: <strong className={`font-bold ${
                opponentScout.winProbabilityPct < 35 
                  ? 'text-rose-400' 
                  : opponentScout.winProbabilityPct < 50 
                  ? 'text-amber-400' 
                  : opponentScout.winProbabilityPct <= 55
                  ? 'text-cyan-400'
                  : 'text-emerald-400'
              }`}>{opponentScout.winProbabilityPct}%</strong>
            </span>
          </div>
        </div>
      )}

      {/* 2D Tactical Pitch View */}
      <div className="relative w-full h-[540px] rounded-2xl overflow-hidden soccer-pitch border border-amber-400/40 shadow-2xl">
        {/* Tactical zones overlay lines */}
        <div className="absolute inset-0 pointer-events-none opacity-25 flex">
          <div className="flex-1 border-r border-dashed border-white/50"></div>
          <div className="flex-1 border-r border-dashed border-white/50"></div>
          <div className="flex-1 border-r border-dashed border-white/50"></div>
          <div className="flex-1"></div>
        </div>

        {/* Midfield circle label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
          <div className="text-[10px] uppercase font-black tracking-widest text-white/30 bg-slate-950/40 px-3 py-1 rounded-full border border-white/10">
            Midfield Battleground
          </div>
        </div>

        {/* 1. Opponent Simulation Nodes (Red/Rose Ghost Markers) */}
        {showOpponentOverlay && opponentNodes.map((oppNode, idx) => (
          <div
            key={`opp-${idx}`}
            style={{
              left: `${oppNode.xPct}%`,
              top: `${oppNode.yPct}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute flex flex-col items-center group cursor-pointer z-10 animate-in fade-in duration-300"
          >
            {/* Opponent Jersey Circle */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] shadow-lg transition-all group-hover:scale-125 border ${
              oppNode.isKeyPlaymaker
                ? 'bg-rose-600 text-white border-rose-300 ring-2 ring-rose-400 animate-pulse'
                : 'bg-slate-900/90 text-rose-400 border-rose-500/60'
            }`}>
              {oppNode.position}
            </div>

            {/* Opponent Label Pill */}
            <div className="mt-1 px-1.5 py-0.2 rounded bg-slate-950/90 border border-rose-500/40 text-[8px] font-bold text-rose-300 tracking-tight whitespace-nowrap shadow">
              {opponentScout.logoText} • {oppNode.name}
            </div>

            {/* Hover Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 transition pointer-events-none absolute bottom-full mb-1 z-30 px-2.5 py-1 bg-slate-950 border border-rose-400 rounded-lg text-[10px] text-rose-300 whitespace-nowrap shadow-2xl">
              <span className="font-bold text-white">{oppNode.name} ({oppNode.position})</span>
              <div className="text-[9px] text-slate-400">{opponentScout.shortName} System Node</div>
            </div>
          </div>
        ))}

        {/* 2. Peddie Falcons Positional Nodes (Navy/Gold Markers) */}
        {currentConfig.nodes.map(node => {
          const player = PEDDIE_ROSTER_2026_2027.find(p => p.number === node.playerNumber);

          return (
            <div
              key={node.playerNumber}
              style={{
                left: `${node.xPct}%`,
                top: `${node.yPct}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className="absolute flex flex-col items-center group cursor-pointer z-20"
            >
              {/* Jersey / Headshot Circle Badge */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#002147] to-[#001226] border-2 border-amber-400 text-amber-300 font-extrabold text-xs flex items-center justify-center shadow-xl shadow-black/90 group-hover:scale-125 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all relative overflow-hidden flex-shrink-0">
                {player?.photoUrl ? (
                  <>
                    <img 
                      src={player.photoUrl} 
                      alt={node.playerName} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 bg-slate-950/90 text-amber-300 font-mono font-black text-[8px] px-1 rounded-tl border-t border-l border-amber-400/50">
                      {node.playerNumber}
                    </span>
                  </>
                ) : (
                  node.playerNumber
                )}
              </div>

              {/* Name & Role Pill */}
              <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-800 text-[9px] font-semibold text-slate-200 tracking-tight whitespace-nowrap shadow group-hover:border-amber-400 transition">
                {node.playerName} ({node.position})
              </div>

              {/* Hover Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition pointer-events-none absolute bottom-full mb-1 z-30 px-2.5 py-1.5 bg-slate-900 border border-cyan-400 rounded-lg text-[10px] text-cyan-300 whitespace-nowrap shadow-2xl flex flex-col gap-0.5">
                <span className="font-bold text-white">{node.playerName} • #{node.playerNumber}</span>
                <span className="text-[9px] text-slate-400">Role: {node.role}</span>
                {showOpponentOverlay && (
                  <span className="text-[9px] text-amber-300 font-semibold border-t border-slate-800 pt-0.5">
                    Matchup vs {opponentScout.shortName}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Matchup Counter-Directive Callout if opponent active */}
      {showOpponentOverlay && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-1.5">
          <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Coach Nazario Sideline Tactical Directive vs {opponentScout.opponent}:
          </div>
          <p className="text-xs text-slate-200 leading-relaxed italic">
            &ldquo;{opponentScout.peddieCounterDirectives.coachNazarioDirective}&rdquo;
          </p>
          <div className="text-[11px] text-cyan-300 font-medium">
            <strong className="text-white">Diamond Midfield Role:</strong> {opponentScout.peddieCounterDirectives.diamondKeyAssignment}
          </div>
        </div>
      )}

      {/* Strengths & Vulnerabilities Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
            <CheckCircle className="w-3.5 h-3.5" /> SYSTEM STRENGTHS ({currentConfig.name})
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
            {currentConfig.strengths.map((str, i) => (
              <li key={i}>{str}</li>
            ))}
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> TACTICAL SAFEGUARDS & TRANSITION TRIGGERS
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
