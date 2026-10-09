'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Zap, 
  Clock, 
  Trophy, 
  Target, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  UserCheck, 
  Users, 
  Flame, 
  TrendingUp,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { 
  PEDDIE_OFFICIAL_SEASON_SCORING_2026, 
  PEDDIE_OFFICIAL_GOALIE_2026, 
  PEDDIE_OFFICIAL_TEAM_TOTALS_2026,
  PEDDIE_ROSTER_2026_2027 
} from '@/lib/soccer-data';

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
  showSeasonStatsByDefault?: boolean;
}

export const BroadcastSoccerHud: React.FC<BroadcastSoccerHudProps> = ({
  minute = 80,
  second = 0,
  peddieScore = 7,
  opponentScore = 1,
  opponentName = 'PRINCETON DAY SCHOOL',
  peddieXg = 4.48,
  opponentXg = 0.94,
  possessionPeddie = 65,
  pressStatus = 'FINAL • 2026 MERCER DERBY TRIUMPH',
  showSeasonStatsByDefault = true
}) => {
  const [activeTab, setActiveTab] = useState<'MATCH' | 'SCORING' | 'GOALIE' | 'LINEUP' | 'CAPTAINS'>('SCORING');
  const [isExpanded, setIsExpanded] = useState<boolean>(showSeasonStatsByDefault);

  const scoringPlayers = PEDDIE_OFFICIAL_SEASON_SCORING_2026;
  const goalie = PEDDIE_OFFICIAL_GOALIE_2026;
  const totals = PEDDIE_OFFICIAL_TEAM_TOTALS_2026;

  return (
    <div className="w-full glass-panel border border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl bg-slate-950/90 flex flex-col transition-all">
      {/* ------------------------------------------------------------- */}
      {/* TOP HUD BAR: Match Telemetry & Quick Stat Pills */}
      {/* ------------------------------------------------------------- */}
      <div className="p-3.5 md:p-4 flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-slate-800/80 bg-gradient-to-r from-slate-950 via-[#001733]/50 to-slate-950">
        {/* Match Clock & Score Board */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* Clock Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono text-sm font-bold shadow-inner">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{minute}:{second < 10 ? `0${second}` : second}</span>
            <span className="text-[10px] text-amber-400 uppercase font-sans font-black ml-1">FT</span>
          </div>

          {/* Score Board */}
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow">
            {/* Peddie */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#002147] border border-amber-400 flex items-center justify-center font-black text-amber-400 text-xs shadow-md">
                P
              </div>
              <span className="font-black text-white text-xs md:text-sm tracking-wide">PEDDIE</span>
              <span className="text-xl md:text-2xl font-black text-amber-400 font-mono">{peddieScore}</span>
            </div>

            <span className="text-slate-600 font-bold text-sm">-</span>

            {/* Opponent */}
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-black text-slate-300 font-mono">{opponentScore}</span>
              <span className="font-black text-slate-300 text-xs md:text-sm tracking-wide truncate max-w-[120px] md:max-w-none">
                {opponentName}
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-slate-300 text-xs">
                {opponentName.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Expected Goals & Possession Telemetry */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          {/* xG */}
          <div className="flex flex-col items-center bg-slate-900/70 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">EXPECTED GOALS (xG)</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-emerald-400 text-xs md:text-sm">{peddieXg.toFixed(2)}</span>
              <span className="text-slate-600 text-[10px]">vs</span>
              <span className="font-mono font-bold text-slate-400 text-xs md:text-sm">{opponentXg.toFixed(2)}</span>
            </div>
          </div>

          {/* Possession Bar */}
          <div className="w-28 md:w-32 flex flex-col gap-1 bg-slate-900/70 px-2.5 py-1 rounded-lg border border-slate-800">
            <div className="flex justify-between text-[9px] text-slate-400 font-bold">
              <span>POSSESSION</span>
              <span className="text-cyan-400">{possessionPeddie}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
              <div style={{ width: `${possessionPeddie}%` }} className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full"></div>
              <div style={{ width: `${100 - possessionPeddie}%` }} className="bg-slate-700 h-full"></div>
            </div>
          </div>

          {/* Season Totals Highlight Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-inner">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono font-black text-amber-300">37G • 27A • 101 PTS</span>
          </div>

          {/* Captains Quick Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Captains: <strong className="text-white font-mono">#12, #28, #14, #13</strong></span>
          </div>

          {/* Starting LM / RM Quick Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>LM: <strong className="text-white font-mono">#7 Bennett</strong> • RM: <strong className="text-white font-mono">#26 Blake</strong></span>
          </div>
        </div>

        {/* HUD View Toggles */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => { setActiveTab('CAPTAINS'); setIsExpanded(true); }}
            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition ${
              activeTab === 'CAPTAINS' && isExpanded
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Captains (4)
          </button>
          <button
            onClick={() => { setActiveTab('SCORING'); setIsExpanded(true); }}
            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition ${
              activeTab === 'SCORING' && isExpanded
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Scoring (101p)
          </button>
          <button
            onClick={() => { setActiveTab('GOALIE'); setIsExpanded(true); }}
            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition ${
              activeTab === 'GOALIE' && isExpanded
                ? 'bg-cyan-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Goalie (41sv)
          </button>
          <button
            onClick={() => { setActiveTab('LINEUP'); setIsExpanded(true); }}
            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition ${
              activeTab === 'LINEUP' && isExpanded
                ? 'bg-purple-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Lineup (LM/RM)
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title={isExpanded ? 'Collapse HUD Drawer' : 'Expand HUD Drawer'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONTINUOUS STATS TICKER: Scrolling Real Player Performance */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full bg-slate-950/80 border-b border-slate-800/60 px-4 py-1.5 flex items-center justify-between text-[11px] overflow-hidden whitespace-nowrap gap-4">
        <div className="flex items-center gap-1.5 text-amber-400 font-extrabold flex-shrink-0">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="uppercase tracking-wider text-[10px]">LIVE HUD STAT TICKER:</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300 font-mono overflow-x-auto no-scrollbar scroll-smooth">
          <span className="text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            ⭐ #28 Tommy Kim: 12G 4A 28P
          </span>
          <span className="text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            🎯 #13 Christian Tharney: 10G 5A 25P
          </span>
          <span className="text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ⚡ #7 Bennett Cucchiara [STARTING LM]: 3G 3A 9P
          </span>
          <span className="text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            🚀 #26 Blake Romanelli [STARTING RM]: 21.8 mph Peak
          </span>
          <span className="text-slate-300">#10 Quinn Wachtveitl: 2G 4A 8P</span>
          <span className="text-slate-300">#2 Wyatt Raya: 3G 1A 7P</span>
          <span className="text-slate-300">#9 Michael Pratt: 2G 3A 7P</span>
          <span className="text-slate-300">#22 Carson Wiley: 2G 1A 5P</span>
          <span className="text-slate-300">#14 Rayyaan Mohiuddin: 1G 2A 4P</span>
          <span className="text-slate-300">#12 Noah Eldessouky: 0G 2A 2P</span>
          <span className="text-slate-300">#6 Jeet Sinha: 1G 0A 2P</span>
          <span className="text-slate-300">#25 Harry Xiao: 1G 0A 2P</span>
          <span className="text-slate-300">#20 Jeffrey Zhang: 0G 1A 1P</span>
          <span className="text-slate-300">#18 Brody Rozo: 0G 1A 1P</span>
          <span className="text-blue-300 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            🧤 #98 Dylan McKenzie [GK]: 41 Saves in 7 GP
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EXPANDABLE HUD DRAWER: Detailed Interactive Tabs */}
      {/* ------------------------------------------------------------- */}
      {isExpanded && (
        <div className="p-4 md:p-5 bg-gradient-to-b from-slate-950 via-[#001329]/40 to-slate-950 border-t border-slate-800">
          {/* TAB 1: SEASON SCORING LEADERBOARD */}
          {activeTab === 'SCORING' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                      2026–2027 Season Scoring Leaderboard
                      <span className="text-[10px] text-amber-400 font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                        {totals.goals} Goals • {totals.assists} Assists • {totals.points} Points
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Authoritative player points, goals, assists, and starting wing assignments
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                    Starting LM: #7 Bennett Cucchiara
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-bold">
                    Starting RM: #26 Blake Romanelli
                  </span>
                </div>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto max-h-[340px] overflow-y-auto rounded-lg border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-slate-950 text-slate-400 uppercase text-[10px] font-black border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Player</th>
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3">Pos</th>
                      <th className="py-2.5 px-3 text-center text-amber-400 font-bold">Goals (G)</th>
                      <th className="py-2.5 px-3 text-center text-cyan-400 font-bold">Assists (A)</th>
                      <th className="py-2.5 px-3 text-center text-emerald-400 font-black">Points (P)</th>
                      <th className="py-2.5 px-3 text-right">Lineup / Role Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {scoringPlayers.map((p, idx) => {
                      const isLM = p.number === 7;
                      const isRM = p.number === 26;
                      const isTopScorer = p.number === 28;
                      const isRegista = p.number === 13;

                      return (
                        <tr 
                          key={p.number}
                          className={`hover:bg-slate-800/50 transition font-mono ${
                            isLM ? 'bg-emerald-500/10 border-l-2 border-emerald-400' :
                            isTopScorer ? 'bg-amber-500/10' :
                            isRegista ? 'bg-cyan-500/10' : ''
                          }`}
                        >
                          <td className="py-2 px-3 font-bold text-slate-300">
                            #{p.number}
                          </td>
                          <td className="py-2 px-3 font-sans font-bold text-white flex items-center gap-2">
                            <span>{p.name}</span>
                            {isLM && (
                              <span className="text-[9px] font-sans font-black px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                                STARTING LM
                              </span>
                            )}
                            {isTopScorer && (
                              <span className="text-[9px] font-sans font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40">
                                TOP SCORER
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 font-sans text-slate-400 text-[11px]">
                            {p.classYear}
                          </td>
                          <td className="py-2 px-3 font-bold text-slate-300">
                            {p.position}
                          </td>
                          <td className="py-2 px-3 text-center font-bold text-amber-400 text-sm">
                            {p.goals > 0 ? p.goals : '—'}
                          </td>
                          <td className="py-2 px-3 text-center font-bold text-cyan-400 text-sm">
                            {p.assists > 0 ? p.assists : '—'}
                          </td>
                          <td className="py-2 px-3 text-center font-black text-emerald-400 text-sm bg-emerald-500/5">
                            {p.points}
                          </td>
                          <td className="py-2 px-3 text-right font-sans text-[11px] text-slate-300">
                            {isLM ? (
                              <span className="text-emerald-400 font-bold">Starting LM • Precision Inverted Creator</span>
                            ) : p.number === 28 ? (
                              <span className="text-amber-400 font-bold">Starting ST • Clinical Center-Forward</span>
                            ) : p.number === 13 ? (
                              <span className="text-cyan-400 font-bold">Starting CDM • Single Pivot Commander</span>
                            ) : p.number === 10 ? (
                              <span className="text-slate-300">Starting ST / CAM • Attacking Target</span>
                            ) : p.number === 22 ? (
                              <span className="text-slate-300">Starting CB • Set-Piece Target Finisher</span>
                            ) : p.number === 14 ? (
                              <span className="text-slate-300">Starting CAM • Diamond Tip Conductor</span>
                            ) : p.number === 12 ? (
                              <span className="text-slate-300">Starting LB • Inverted Wing-Back</span>
                            ) : (
                              <span className="text-slate-400">First-Team Rotation</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {/* Team Total Footer Row */}
                    <tr className="bg-slate-950 font-bold text-white border-t-2 border-amber-400/40">
                      <td colSpan={4} className="py-2.5 px-3 uppercase text-amber-400 tracking-wider font-sans">
                        TEAM TOTALS (13 Scoring Players)
                      </td>
                      <td className="py-2.5 px-3 text-center font-black font-mono text-amber-400 text-base">
                        {totals.goals}
                      </td>
                      <td className="py-2.5 px-3 text-center font-black font-mono text-cyan-400 text-base">
                        {totals.assists}
                      </td>
                      <td className="py-2.5 px-3 text-center font-black font-mono text-emerald-400 text-base bg-emerald-500/10">
                        {totals.points}
                      </td>
                      <td className="py-2.5 px-3 text-right font-sans text-xs text-amber-300">
                        MAPL #1 Offensive Powerhouse
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: GOALKEEPER DEFENSE WALL */}
          {activeTab === 'GOALIE' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-1 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-900 border-2 border-cyan-400 flex items-center justify-center text-white font-mono font-black text-xl shadow-lg">
                  #98
                </div>
                <div>
                  <h4 className="text-base font-black text-white">{goalie.name}</h4>
                  <p className="text-xs text-cyan-400 font-semibold">{goalie.classYear} • Starting Goalkeeper (G)</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Primary Shot Stopper</span>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Saves</span>
                  <span className="text-2xl font-black font-mono text-cyan-400">{goalie.saves}</span>
                  <span className="text-[10px] text-slate-500">Official 2026-27</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Games Played</span>
                  <span className="text-2xl font-black font-mono text-white">{goalie.gamesPlayed}</span>
                  <span className="text-[10px] text-slate-500">All 7 Fixtures</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Saves / Game</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {(goalie.saves / goalie.gamesPlayed).toFixed(1)}
                  </span>
                  <span className="text-[10px] text-slate-500">Elite Reflex Rate</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Clean Sheets</span>
                  <span className="text-2xl font-black font-mono text-amber-400">2</span>
                  <span className="text-[10px] text-slate-500">Haverford/PDS Form</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STARTING LINEUP (LM: BENNETT • RM: BLAKE) */}
          {activeTab === 'LINEUP' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    Official Peddie Starting XI • 4-4-2 Diamond
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Verified Starting LM (#7 Bennett Cucchiara) and Starting RM (#26 Blake Romanelli) flanking diamond midfield
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                    LM: #7 Bennett Cucchiara (Freshman)
                  </span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black">
                    RM: #26 Blake Romanelli (Sophomore)
                  </span>
                </div>
              </div>

              {/* Starting 11 Grid Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {[
                  { pos: 'GK', num: 98, name: 'Dylan McKenzie', year: 'Junior', note: '41 Saves (7 GP)', highlight: false },
                  { pos: 'LB', num: 12, name: 'Noah Eldessouky', year: 'Senior', note: 'Captain • 2 Assists', highlight: false },
                  { pos: 'CB', num: 8, name: 'Owen Bonchev', year: 'Sophomore', note: 'Ball-Playing CB', highlight: false },
                  { pos: 'CB', num: 22, name: 'Carson Wiley', year: 'Junior', note: '2 Goals • 1 Assist (5P)', highlight: false },
                  { pos: 'RB', num: 5, name: 'Gabriel Lam', year: 'Senior', note: 'Starting Right Fullback', highlight: false },
                  { pos: 'CDM', num: 13, name: 'Christian Tharney', year: 'Senior', note: 'Captain • 10G, 5A (25P)', highlight: false },
                  { pos: 'LM', num: 7, name: 'Bennett Cucchiara', year: 'Freshman', note: 'STARTING LM • 3G, 3A (9P)', highlight: 'LM' },
                  { pos: 'RM', num: 26, name: 'Blake Romanelli', year: 'Sophomore', note: 'STARTING RM • 21.8 mph Peak', highlight: 'RM' },
                  { pos: 'CAM', num: 14, name: 'Rayyaan Mohiuddin', year: 'Junior', note: 'Captain • 1G, 2A (4P)', highlight: false },
                  { pos: 'ST', num: 28, name: 'Tommy Kim', year: 'Senior', note: 'Captain • 12G, 4A (28P)', highlight: false },
                  { pos: 'ST', num: 10, name: 'Quinn Wachtveitl', year: 'Senior', note: 'Target Striker • 2G, 4A (8P)', highlight: false },
                ].map((item) => (
                  <div
                    key={item.num + item.pos}
                    className={`p-2.5 rounded-xl border flex flex-col gap-1 transition ${
                      item.highlight === 'LM' 
                        ? 'bg-emerald-950/40 border-emerald-400/80 shadow-lg shadow-emerald-950/50' 
                        : item.highlight === 'RM'
                          ? 'bg-purple-950/40 border-purple-400/80 shadow-lg shadow-purple-950/50'
                          : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${
                        item.highlight === 'LM' ? 'bg-emerald-400 text-slate-950' :
                        item.highlight === 'RM' ? 'bg-purple-400 text-slate-950' :
                        'bg-slate-800 text-cyan-400'
                      }`}>
                        {item.pos}
                      </span>
                      <span className="font-mono font-black text-white text-xs">#{item.num}</span>
                    </div>
                    <div className="font-bold text-white text-xs truncate mt-0.5">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{item.year}</div>
                    <div className={`text-[10px] font-mono mt-0.5 ${
                      item.highlight === 'LM' ? 'text-emerald-300 font-bold' :
                      item.highlight === 'RM' ? 'text-purple-300 font-bold' :
                      'text-slate-400'
                    }`}>
                      {item.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL TEAM CAPTAINS */}
          {activeTab === 'CAPTAINS' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    <Award className="w-4 h-4 text-amber-400" />
                  </span>
                  <div>
                    <h3 className="font-black text-white text-sm">2026–2027 Official Varsity Captains</h3>
                    <p className="text-slate-400 text-xs">Four Pillars of Peddie Leadership: Defense, Attack, Playmaking, and Midfield Anchor</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>4 Official Team Captains</span>
                </div>
              </div>

              {/* 4 Captains Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    num: 12,
                    name: 'Noah Eldessouky',
                    year: 'Senior (2027)',
                    pos: 'LB / Inverted Wing-Back',
                    role: 'Defensive Anchor & Captain',
                    stats: '0G • 2A • 2 PTS (34.2 Miles Run)',
                    photo: '/media-day-headshots/IMG_000493.jpg',
                    desc: 'Relentless touchline engine with elite crossing precision, vocal backline leadership, and 1v1 lockdown containment.'
                  },
                  {
                    num: 28,
                    name: 'Tommy Kim',
                    year: 'Senior (2027)',
                    pos: 'ST / Center Forward',
                    role: 'Attacking Spearhead & Captain',
                    stats: '12G • 4A • 28 PTS (Top Scorer)',
                    photo: '/media-day-headshots/IMG_000625.jpg',
                    desc: 'Lethal MAPL leading goal scorer, two-footed finishing, explosive 21.3 mph sprint speed, and hat-trick hero.'
                  },
                  {
                    num: 14,
                    name: 'Rayyaan Mohiuddin',
                    year: 'Junior (2028)',
                    pos: 'CAM / Attacking Midfielder',
                    role: 'Playmaking Conductor & Captain',
                    stats: '1G • 2A • 4 PTS (16 Key Passes)',
                    photo: '/media-day-headshots/IMG_000566.jpg',
                    desc: 'Diamond tip creative maestro, defense-splitting through-balls, pressing trigger initiator, and high-tempo rhythm setter.'
                  },
                  {
                    num: 13,
                    name: 'Christian Tharney',
                    year: 'Senior (2027)',
                    pos: 'CDM / Deep Regista',
                    role: 'Midfield Commander & Captain',
                    stats: '10G • 5A • 25 PTS (Vice Lead)',
                    photo: '/media-day-headshots/IMG_000547.jpg',
                    desc: 'Single pivot holding anchor, designated set-piece specialist (corners, free kicks, penalties), and aerial enforcer.'
                  }
                ].map((cap) => (
                  <div
                    key={cap.num}
                    className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 flex flex-col gap-3 shadow-lg shadow-slate-950/60 hover:border-amber-400/60 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-amber-500/40 flex-shrink-0">
                        <img
                          src={cap.photo}
                          alt={cap.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-amber-400 font-mono">#{cap.num}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-mono">
                            CAPTAIN
                          </span>
                        </div>
                        <h4 className="font-black text-white text-sm truncate mt-0.5">{cap.name}</h4>
                        <div className="text-[11px] text-cyan-400 font-semibold">{cap.pos}</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex flex-col gap-1.5">
                      <div className="text-xs font-mono font-bold text-amber-300 bg-amber-950/40 p-1.5 rounded border border-amber-500/20 text-center">
                        {cap.stats}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
