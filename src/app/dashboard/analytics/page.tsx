'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  XG_TIMELINE_AQUINAS,
  XG_TIMELINE_HAVERFORD, 
  XG_TIMELINE_TRENTON,
  XG_TIMELINE_GEORGE,
  XG_TIMELINE_PDS,
  XG_TIMELINE_SEASON_AGGREGATE,
  DETAILED_SHOTS_LOG_AQUINAS, 
  DETAILED_SHOTS_LOG_HAVERFORD,
  DETAILED_SHOTS_LOG_TRENTON,
  DETAILED_SHOTS_LOG_GEORGE,
  DETAILED_SHOTS_LOG_PDS,
  XT_GRID_PITCH_MODEL,
  PPDA_SEASON_SERIES,
  PASSING_NETWORK_DIAMOND, 
  SQUAD_PHYSICAL_TELEMETRY, 
  GOALKEEPER_ADVANCED_METRICS,
  PEDDIE_ROSTER_2026_2027,
  PEDDIE_SCHEDULE_2026_2027
} from '@/lib/soccer-data';
import { Player, ShotDetail, PassingLink, PhysicalTelemetry, XTCell } from '@/lib/types';
import { 
  TrendingUp, 
  Activity, 
  Compass, 
  Zap, 
  Award, 
  Download, 
  ShieldCheck, 
  Crosshair, 
  Users, 
  Layers, 
  ArrowRight,
  Filter,
  BarChart2,
  Gauge,
  CheckCircle2,
  Info,
  Calendar,
  Sparkles,
  Flame,
  Target,
  Video,
  PlayCircle
} from 'lucide-react';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'XG' | 'XT' | 'PPDA' | 'PASSING' | 'GPS' | 'GK' | 'COMPARE'>('XG');
  
  // Match selector: Options include m-4 (PDS 7-1), m-3 (George 5-2), m-1 (Aquinas 3-2), m-2 (Trenton 2-3), m-0 (Haverford 0-5), or 'season'
  const [selectedMatchId, setSelectedMatchId] = useState<string>('m-4');

  // Shot filter in xG tab
  const [shotFilter, setShotFilter] = useState<'ALL' | 'PEDDIE' | 'GOALS'>('ALL');
  
  // Player comparison selection
  const [playerAId, setPlayerAId] = useState<string>('p-kim-t'); // Tommy Kim (#28)
  const [playerBId, setPlayerBId] = useState<string>('p-zhang-20'); // Jeffery Zhang (#20)

  // Dynamic Match Mapping
  let activeMatch = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === selectedMatchId) || PEDDIE_SCHEDULE_2026_2027[4];
  let xgData = XG_TIMELINE_PDS;
  let allShots = DETAILED_SHOTS_LOG_PDS;

  if (selectedMatchId === 'm-3') {
    activeMatch = PEDDIE_SCHEDULE_2026_2027[3];
    xgData = XG_TIMELINE_GEORGE;
    allShots = DETAILED_SHOTS_LOG_GEORGE;
  } else if (selectedMatchId === 'm-1') {
    activeMatch = PEDDIE_SCHEDULE_2026_2027[1];
    xgData = XG_TIMELINE_AQUINAS;
    allShots = DETAILED_SHOTS_LOG_AQUINAS;
  } else if (selectedMatchId === 'm-2') {
    activeMatch = PEDDIE_SCHEDULE_2026_2027[2];
    xgData = XG_TIMELINE_TRENTON;
    allShots = DETAILED_SHOTS_LOG_TRENTON;
  } else if (selectedMatchId === 'm-0') {
    activeMatch = PEDDIE_SCHEDULE_2026_2027[0];
    xgData = XG_TIMELINE_HAVERFORD;
    allShots = DETAILED_SHOTS_LOG_HAVERFORD;
  } else if (selectedMatchId === 'season') {
    xgData = XG_TIMELINE_SEASON_AGGREGATE;
    allShots = [...DETAILED_SHOTS_LOG_PDS, ...DETAILED_SHOTS_LOG_GEORGE, ...DETAILED_SHOTS_LOG_AQUINAS];
  }

  const isSeason = selectedMatchId === 'season';
  const playerA = PEDDIE_ROSTER_2026_2027.find(p => p.id === playerAId) || PEDDIE_ROSTER_2026_2027[0];
  const playerB = PEDDIE_ROSTER_2026_2027.find(p => p.id === playerBId) || PEDDIE_ROSTER_2026_2027[1];
  const playerAPhysical = SQUAD_PHYSICAL_TELEMETRY.find(p => p.playerId === playerAId);
  const playerBPhysical = SQUAD_PHYSICAL_TELEMETRY.find(p => p.playerId === playerBId);

  const filteredShots: ShotDetail[] = allShots.filter((s: ShotDetail) => {
    if (shotFilter === 'PEDDIE') return s.team === 'Peddie';
    if (shotFilter === 'GOALS') return s.outcome === 'Goal';
    return true;
  });

  const exportAnalyticsCsv = () => {
    const rows = [
      ['MATCH', isSeason ? '2026 Season Aggregate' : `${activeMatch.opponent} (${activeMatch.matchDate})`],
      ['MINUTE', 'PEDDIE_XG', 'OPPONENT_XG', 'EVENT_DESCRIPTION'],
      ...xgData.map(pt => [pt.minute, pt.peddieXg, pt.opponentXg, `"${pt.eventDescription || ''}"`])
    ];
    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `peddie_${selectedMatchId}_xg_analytics.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Banner */}
      <div className="glass-panel p-6 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-extrabold text-[11px] uppercase tracking-wide">
              ADVANCED DATA ANALYTICS STUDIO
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-cyan-400 text-xs font-semibold">Opta / Wyscout / Hudl Standards</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-emerald-400 text-xs font-bold">2026–2027 Season Telemetry</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Activity className="w-7 h-7 text-amber-400" />
            Peddie Soccer Match Intelligence & Advanced Metrics
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Live Expected Goals ($xG$) flow momentum, Expected Threat ($xT$) spatial zone danger, PPDA pressing traps, 4-4-2 diamond pass topology, GPS physical load, and goalkeeper shot-stopping analytics.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Match Switcher Dropdown */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl">
            <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-bold text-slate-400">Match:</span>
            <select
              value={selectedMatchId}
              onChange={(e) => setSelectedMatchId(e.target.value)}
              className="bg-transparent text-white text-xs font-extrabold focus:outline-none cursor-pointer"
            >
              <option value="m-4" className="bg-slate-950 text-white">
                Match 4: Sept 16 vs Princeton Day (4-2 W)
              </option>
              <option value="m-3" className="bg-slate-950 text-white">
                Match 3: Sept 12 @ George School (6-4 W)
              </option>
              <option value="m-1" className="bg-slate-950 text-white">
                Match 1: Sept 5 vs St. Thomas Aquinas (3-2 W)
              </option>
              <option value="m-2" className="bg-slate-950 text-white">
                Match 2: Sept 9 @ Trenton Catholic (4-1 W)
              </option>
              <option value="m-0" className="bg-slate-950 text-white">
                Match 0: Sept 1 @ Haverford (0-4 L Veo Film)
              </option>
              <option value="season" className="bg-slate-950 text-amber-400 font-bold">
                ⭐ Full 2026 Season Aggregate (17 Goals, 15.84 xG)
              </option>
            </select>
          </div>

          <button
            onClick={exportAnalyticsCsv}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-400 text-xs font-bold transition shadow hover:bg-amber-500/10 flex-shrink-0"
          >
            <Download className="w-4 h-4" /> Export Opta CSV
          </button>
        </div>
      </div>

      {/* Match Overview Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Match Stream Info */}
        <div className="lg:col-span-2 glass-panel p-4 flex flex-col justify-between gap-2 border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
              Active Match Telemetry Stream
            </span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {['m-4', 'm-3', 'm-1', 'm-2', 'm-0', 'season'].map(id => (
                <button
                  key={id}
                  onClick={() => setSelectedMatchId(id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                    selectedMatchId === id 
                      ? 'bg-amber-400 text-slate-950 font-black' 
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {id === 'm-4' ? 'PDS 4-2' : id === 'm-3' ? 'GEO 6-4' : id === 'm-1' ? 'STA 3-2' : id === 'm-2' ? 'TCH 4-1' : id === 'm-0' ? 'HAV 0-4' : 'Season'}
                </button>
              ))}
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-white flex flex-col gap-1 ${
            isSeason ? 'bg-amber-500/10 border-amber-500/40' : 'bg-cyan-500/10 border-cyan-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                {isSeason ? '2026 Campaign Record: 3-2-0' : `${activeMatch.matchDate} • ${activeMatch.matchType || 'Varsity Fixture'}`}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {isSeason 
                  ? 'PEDDIE: 17 GOALS SCORED' 
                  : `PEDDIE ${activeMatch.peddieScore ?? 0} - ${activeMatch.opponentScore ?? 0} ${activeMatch.opponent.toUpperCase().slice(0, 12)}`}
              </span>
            </div>
            <span className="text-sm font-black text-white">
              {isSeason 
                ? 'Peddie Varsity Soccer 2026–2027 Aggregate Performance' 
                : `Peddie Falcons vs. ${activeMatch.opponent}`}
            </span>
            <span className="text-[11px] text-slate-300">
              {activeMatch.keySummary}
            </span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="glass-panel p-4 flex flex-col justify-between border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Cumulative xG</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {isSeason 
                ? '15.84 - 13.13' 
                : `${activeMatch.expectedGoalsPeddie?.toFixed(2) ?? '2.84'} - ${activeMatch.expectedGoalsOpponent?.toFixed(2) ?? '1.65'}`}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {isSeason ? '+2.71 Net Season xG' : `${((activeMatch.expectedGoalsPeddie ?? 0) - (activeMatch.expectedGoalsOpponent ?? 0)).toFixed(2)} Net xG Diff`}
            </span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Territory Field Tilt</span>
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-amber-400">
              {isSeason ? '58.7%' : `${activeMatch.fieldTiltPctPeddie ?? 62.4}%`}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Attacking 3rd Dominance
            </span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>High-Press PPDA</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-cyan-400">
              {isSeason ? '8.4' : `${activeMatch.ppdaPeddie ?? 8.6}`}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Passes Allowed Per Def Action
            </span>
          </div>
        </div>
      </div>

      {/* Main Analytics Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('XG')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'XG' ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>xG Flow & Shot Map</span>
        </button>
        <button
          onClick={() => setActiveTab('XT')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'XT' ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Expected Threat (xT) Pitch Radar</span>
        </button>
        <button
          onClick={() => setActiveTab('PPDA')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'PPDA' ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>PPDA & Pressing Traps</span>
        </button>
        <button
          onClick={() => setActiveTab('PASSING')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'PASSING' ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Passing Network & Topology</span>
        </button>
        <button
          onClick={() => setActiveTab('GPS')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'GPS' ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>GPS Physical Telemetry</span>
        </button>
        <button
          onClick={() => setActiveTab('GK')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'GK' ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Goalkeeper & Backline Shield</span>
        </button>
        <button
          onClick={() => setActiveTab('COMPARE')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'COMPARE' ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Head-to-Head Athlete Comparison</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: xG Flow Timeline & Spatial Shot Map */}
      {/* ==================================================================== */}
      {activeTab === 'XG' && (
        <div className="flex flex-col gap-6">
          {/* Cumulative xG Flow SVG Graph */}
          <div className="glass-panel p-5 border border-slate-800 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Cumulative Expected Goals ($xG$) Flow Progression
                </h2>
                <p className="text-[11px] text-slate-400">
                  Minute-by-minute step curve illustrating quality and timing of goal scoring opportunities
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                  <span className="text-white font-bold">Peddie Falcons ({xgData[xgData.length - 1].peddieXg} xG)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                  <span className="text-slate-400 font-bold">Opponent ({xgData[xgData.length - 1].opponentXg} xG)</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive SVG Graph */}
            <div className="w-full h-64 bg-slate-950/80 rounded-xl p-4 border border-slate-800 relative flex items-center justify-center">
              <svg viewBox="0 0 900 220" className="w-full h-full overflow-visible">
                {/* Horizontal Grid Lines */}
                <line x1="40" y1="20" x2="880" y2="20" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="80" x2="880" y2="80" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="140" x2="880" y2="140" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="200" x2="880" y2="200" stroke="#475569" strokeWidth="1.5" />

                {/* Vertical Minute Markers (0', 20', 45', 70', 90') */}
                <line x1="40" y1="10" x2="40" y2="200" stroke="#334155" />
                <line x1="226" y1="10" x2="226" y2="200" stroke="#334155" />
                <line x1="460" y1="10" x2="460" y2="200" stroke="#334155" />
                <line x1="693" y1="10" x2="693" y2="200" stroke="#334155" />
                <line x1="880" y1="10" x2="880" y2="200" stroke="#334155" />

                {/* Y-Axis Labels */}
                <text x="10" y="25" fill="#64748b" fontSize="10" fontFamily="monospace">3.0</text>
                <text x="10" y="85" fill="#64748b" fontSize="10" fontFamily="monospace">2.0</text>
                <text x="10" y="145" fill="#64748b" fontSize="10" fontFamily="monospace">1.0</text>
                <text x="10" y="205" fill="#64748b" fontSize="10" fontFamily="monospace">0.0</text>

                {/* X-Axis Minute Labels */}
                <text x="35" y="218" fill="#94a3b8" fontSize="10" fontFamily="monospace">0&apos;</text>
                <text x="215" y="218" fill="#94a3b8" fontSize="10" fontFamily="monospace">20&apos;</text>
                <text x="445" y="218" fill="#94a3b8" fontSize="10" fontFamily="monospace">45&apos; (HT)</text>
                <text x="680" y="218" fill="#94a3b8" fontSize="10" fontFamily="monospace">70&apos;</text>
                <text x="865" y="218" fill="#94a3b8" fontSize="10" fontFamily="monospace">90&apos;</text>

                {/* Peddie Cumulative Line & Fill */}
                {(() => {
                  const maxXg = Math.max(3.5, ...xgData.map(pt => Math.max(pt.peddieXg, pt.opponentXg)));
                  return (
                    <>
                      <polyline
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3.5"
                        points={xgData.map(pt => {
                          const x = 40 + (pt.minute / 90) * 840;
                          const y = 200 - (pt.peddieXg / maxXg) * 170;
                          return `${x},${y}`;
                        }).join(' ')}
                      />

                      {/* Opponent Cumulative Line */}
                      <polyline
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                        points={xgData.map(pt => {
                          const x = 40 + (pt.minute / 90) * 840;
                          const y = 200 - (pt.opponentXg / maxXg) * 170;
                          return `${x},${y}`;
                        }).join(' ')}
                      />

                      {/* Goal Markers */}
                      {xgData.filter(pt => pt.isGoal).map((pt, i) => {
                        const x = 40 + (pt.minute / 90) * 840;
                        const y = pt.scoringTeam === 'Peddie'
                          ? 200 - (pt.peddieXg / maxXg) * 170
                          : 200 - (pt.opponentXg / maxXg) * 170;
                        const isPeddie = pt.scoringTeam === 'Peddie';
                        return (
                          <g key={i}>
                            <circle cx={x} cy={y} r="7" fill={isPeddie ? '#fbbf24' : '#ef4444'} stroke="#0f172a" strokeWidth="2" />
                            <text x={x} y={y - 12} fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                              ⚽ {pt.minute}&apos;
                            </text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Spatial Shot Map on Pitch */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pitch Visualizer */}
            <div className="lg:col-span-2 glass-panel p-5 border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-amber-400" /> Shot Map & Quality Matrix (105m x 68m Pitch)
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Bubble radius proportional to calculated $xG$; yellow indicates goal conversion
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                  {(['ALL', 'PEDDIE', 'GOALS'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setShotFilter(f)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition ${
                        shotFilter === f ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pitch Rendering */}
              <div className="relative w-full aspect-[16/10] bg-emerald-950/40 rounded-xl border border-emerald-500/30 overflow-hidden shadow-inner p-4">
                {/* Grass Striping */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#000_50%,transparent_50%)] bg-[length:60px_100%]"></div>

                {/* Pitch Lines */}
                <div className="absolute inset-4 border-2 border-emerald-500/40 pointer-events-none">
                  {/* Halfway Line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-emerald-500/40 -translate-x-1/2"></div>
                  {/* Center Circle */}
                  <div className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full border-2 border-emerald-500/40 -translate-x-1/2 -translate-y-1/2"></div>
                  {/* Right Penalty Box (Peddie Attacking) */}
                  <div className="absolute top-1/2 right-0 w-36 h-56 border-2 border-r-0 border-emerald-500/40 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 right-0 w-16 h-28 border-2 border-r-0 border-emerald-500/40 -translate-y-1/2"></div>
                  {/* Left Penalty Box */}
                  <div className="absolute top-1/2 left-0 w-36 h-56 border-2 border-l-0 border-emerald-500/40 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-0 w-16 h-28 border-2 border-l-0 border-emerald-500/40 -translate-y-1/2"></div>
                </div>

                {/* Shot Points */}
                {filteredShots.map((shot: ShotDetail) => {
                  const leftPct = (shot.xMeters / 105) * 100;
                  const topPct = (shot.yMeters / 68) * 100;
                  const radius = Math.max(14, shot.xg * 44);
                  const isGoal = shot.outcome === 'Goal';
                  const isPeddie = shot.team === 'Peddie';

                  return (
                    <div
                      key={shot.id}
                      style={{
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        width: `${radius}px`,
                        height: `${radius}px`
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125 shadow-lg ${
                        isGoal
                          ? 'bg-amber-400 border-2 border-white text-slate-950 font-black text-[10px] animate-pulse z-20'
                          : isPeddie
                            ? 'bg-cyan-500/80 border border-cyan-300 text-white text-[9px] z-10'
                            : 'bg-red-500/70 border border-red-300 text-white text-[9px] z-10'
                      }`}
                      title={`${shot.playerName} (${shot.minute}') - xG: ${shot.xg}, Outcome: ${shot.outcome}`}
                    >
                      {isGoal ? '⚽' : shot.playerNumber}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shot Details Feed */}
            <div className="glass-panel p-5 border border-slate-800 flex flex-col gap-3">
              <div className="text-xs font-bold text-slate-300 uppercase border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Shot Log Telemetry</span>
                <span className="text-amber-400">{filteredShots.length} Logged</span>
              </div>

              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 text-xs">
                {filteredShots.map((shot: ShotDetail) => (
                  <div
                    key={shot.id}
                    className={`p-2.5 rounded-lg border flex flex-col gap-1 transition ${
                      shot.outcome === 'Goal'
                        ? 'bg-amber-500/10 border-amber-500/50 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400">
                        {shot.minute}&apos; #{shot.playerNumber} {shot.playerName}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        shot.outcome === 'Goal' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {shot.outcome}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>xG: <strong className="text-emerald-400 font-mono">{shot.xg}</strong></span>
                      {shot.psxg && <span>PSxG: <strong className="text-cyan-400 font-mono">{shot.psxg}</strong></span>}
                      <span>Dist: {shot.distanceYards} yds</span>
                      <span>{shot.shotType}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: Expected Threat (xT) Spatial Pitch Radar */}
      {/* ==================================================================== */}
      {activeTab === 'XT' && (
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-5 border border-slate-800 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" /> Spatial Pitch Expected Threat ($xT$) Zone Radar
                </h2>
                <p className="text-[11px] text-slate-400">
                  Measures the probability of an attacking action leading to a goal in the next 5 actions, calculated across half-spaces, central Zone 14, and wide cutbacks.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Peddie Total xT: <strong className="text-amber-400">{XT_GRID_PITCH_MODEL.peddieTotalXT}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" /> Opponent xT: <strong className="text-red-400">{XT_GRID_PITCH_MODEL.opponentTotalXT}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  +{XT_GRID_PITCH_MODEL.halfSpaceAdvantagePct}% Half-Space Edge
                </span>
              </div>
            </div>

            {/* Pitch Visualization of xT Danger Zones */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Pitch Canvas */}
              <div className="lg:col-span-2 relative aspect-[105/68] bg-[#0c1a11] rounded-2xl border-2 border-emerald-900/60 overflow-hidden shadow-2xl p-4 flex flex-col justify-between">
                {/* Grass Striping Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.4) 40px, rgba(0,0,0,0.4) 80px)'
                  }}
                />

                {/* Pitch Markings SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 105 68">
                  {/* Outer Boundary */}
                  <rect x="2" y="2" width="101" height="64" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                  {/* Halfway Line */}
                  <line x1="52.5" y1="2" x2="52.5" y2="66" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                  {/* Center Circle */}
                  <circle cx="52.5" cy="34" r="9.15" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                  {/* Left Penalty Box */}
                  <rect x="2" y="16.5" width="16.5" height="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
                  {/* Right Penalty Box (Attacking Zone) */}
                  <rect x="86.5" y="16.5" width="16.5" height="35" fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.5)" strokeWidth="0.8" />
                  {/* Right 6-Yard Box */}
                  <rect x="97.5" y="25" width="5.5" height="18" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
                  {/* Right Penalty Spot */}
                  <circle cx="94" cy="34" r="0.6" fill="#f59e0b" />
                  {/* Penalty Arc */}
                  <path d="M 86.5 28 A 9.15 9.15 0 0 0 86.5 40" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="0.6" />
                  {/* Half-Space Guideline Dashes */}
                  <line x1="52.5" y1="20" x2="103" y2="20" stroke="rgba(56,189,248,0.3)" strokeDasharray="1.5 1.5" strokeWidth="0.4" />
                  <line x1="52.5" y1="48" x2="103" y2="48" stroke="rgba(56,189,248,0.3)" strokeDasharray="1.5 1.5" strokeWidth="0.4" />
                </svg>

                {/* Spatial Zone Badges Rendered on Pitch */}
                {XT_GRID_PITCH_MODEL.zones.map((zone: XTCell) => {
                  const leftPct = (zone.xMeters / 105) * 100;
                  const topPct = (zone.yMeters / 68) * 100;
                  const isHighThreat = zone.threatValue >= 0.20;

                  return (
                    <div
                      key={zone.zoneId}
                      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-lg ${
                        isHighThreat 
                          ? 'bg-amber-500/25 border-amber-400 text-white shadow-amber-500/20' 
                          : 'bg-slate-900/80 border-slate-700 text-slate-200'
                      }`}
                      title={`${zone.zoneName} • Base xT: ${zone.threatValue} • Peddie Generated: ${zone.peddieThreatCreated}`}
                    >
                      <span className="text-[9px] font-mono font-black text-amber-300">
                        xT: {zone.threatValue}
                      </span>
                      <span className="text-[8px] font-sans font-bold text-emerald-400">
                        +{zone.peddieThreatCreated}
                      </span>
                    </div>
                  );
                })}

                <div className="relative z-10 text-[10px] text-slate-400 font-mono flex items-center justify-between pointer-events-none mt-auto">
                  <span>Defensive Third</span>
                  <span>Midfield Diamond Engine</span>
                  <span className="text-amber-400 font-bold">Attacking Zone 14 & Half-Spaces →</span>
                </div>
              </div>

              {/* Zone Threat Breakdown Card */}
              <div className="glass-panel p-5 border border-slate-800 flex flex-col gap-3">
                <div className="text-xs font-bold text-slate-300 uppercase border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>Target Threat Zones</span>
                  <span className="text-amber-400 font-mono">Top Threat: Zone 14</span>
                </div>

                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1 text-xs">
                  {XT_GRID_PITCH_MODEL.zones.map((zone: XTCell) => (
                    <div 
                      key={zone.zoneId} 
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-1.5 hover:border-amber-500/40 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-[11px]">{zone.zoneName}</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                          xT: {zone.threatValue}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Peddie Produced: <strong className="text-emerald-400 font-mono">+{zone.peddieThreatCreated}</strong></span>
                        <span>Opp Allowed: <strong className="text-red-400 font-mono">+{zone.opponentThreatCreated}</strong></span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden flex">
                        <div 
                          className="bg-emerald-400 h-full rounded-full" 
                          style={{ width: `${(zone.peddieThreatCreated / (zone.peddieThreatCreated + zone.opponentThreatCreated)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: PPDA & High-Press Pressing Traps */}
      {/* ==================================================================== */}
      {activeTab === 'PPDA' && (
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-5 border border-slate-800 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" /> Passes Per Defensive Action (PPDA) & Pressing Intensity
                </h2>
                <p className="text-[11px] text-slate-400">
                  Quantifies defensive pressure in the opposition half. Lower values indicate higher pressing intensity and faster turnover forcing.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span>Season Avg PPDA: <strong className="text-cyan-400">8.4 (Elite High Press)</strong></span>
                <span>•</span>
                <span>Opponents Avg: <strong className="text-red-400">14.2</strong></span>
              </div>
            </div>

            {/* PPDA Match Progression Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {PPDA_SEASON_SERIES.map(item => (
                <div 
                  key={item.matchId}
                  className={`p-4 rounded-xl border flex flex-col justify-between gap-2 ${
                    item.peddiePpda <= 8.0 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white' 
                      : item.peddiePpda <= 9.5
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-400">{item.matchLabel}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 font-mono font-bold">
                      {item.pressingIntensity}
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-cyan-400">
                      {item.peddiePpda}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      vs Opponent {item.opponentPpda} PPDA
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.peddiePpda <= 8.0 ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                      style={{ width: `${Math.max(10, Math.min(100, (20 - item.peddiePpda) * 6))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Coach Nazario's 3 Pressing Triggers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold w-fit">
                  TRIGGER 1: BACKPASS TO GK
                </span>
                <h4 className="text-xs font-bold text-white">Twin Striker Sprint & Cut</h4>
                <p className="text-[11px] text-slate-400">
                  Tommy Kim (#28) and Jeffery Zhang (#20) sprint aggressively toward the goalkeeper’s dominant foot while shutting down central split-pass passing lanes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold w-fit">
                  TRIGGER 2: FACING OWN GOAL
                </span>
                <h4 className="text-xs font-bold text-white">Midfield Step & Trap</h4>
                <p className="text-[11px] text-slate-400">
                  When an opponent midfielder turns toward their own goal under pressure, Christian Tharney (#13) and Rayyaan Mohiuddin (#14) advance 10 yards to intercept panic passes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold w-fit">
                  TRIGGER 3: TOUCHLINE BOUNCE
                </span>
                <h4 className="text-xs font-bold text-white">Flank Pin & Double-Team</h4>
                <p className="text-[11px] text-slate-400">
                  Gabriel Lam (#5) & Bennett Cuchera (#7) or Noah Eldessouky (#12) & Quinn Wachtveitl (#10) pin the ball carrier against the sideline with zero escape angle.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: Passing Network & 4-4-2 Diamond Topology */}
      {/* ==================================================================== */}
      {activeTab === 'PASSING' && (
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-5 border border-slate-800 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" /> 4-4-2 Diamond Midfield Passing Network Topology
                </h2>
                <p className="text-[11px] text-slate-400">
                  Calculated pass links between all 11 starters. Line thickness indicates pass volume, node size reflects total ball interactions.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                <span>Pass Completion: <strong className="text-emerald-400 font-bold">88.4%</strong></span>
                <span>•</span>
                <span>Total Sequences: <strong className="text-cyan-400 font-bold">387 Passes</strong></span>
              </div>
            </div>

            {/* Passing Matrix Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Table of Top Passing Combos */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold text-[10px] uppercase">
                      <th className="py-2">Origin</th>
                      <th className="py-2">Receiver</th>
                      <th className="py-2">Completed</th>
                      <th className="py-2">Accuracy</th>
                      <th className="py-2">Prog Yards</th>
                      <th className="py-2">Key Passes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                    {PASSING_NETWORK_DIAMOND.map((link, idx) => {
                      const pct = Math.round((link.completedPasses / link.attemptedPasses) * 100);
                      return (
                        <tr key={idx} className="hover:bg-slate-900/50 transition">
                          <td className="py-2 font-semibold text-white">#{link.fromNumber} {link.fromName}</td>
                          <td className="py-2 font-semibold text-cyan-300">#{link.toNumber} {link.toName}</td>
                          <td className="py-2 font-mono font-bold text-amber-400">{link.completedPasses} / {link.attemptedPasses}</td>
                          <td className="py-2 font-mono text-emerald-400">{pct}%</td>
                          <td className="py-2 font-mono text-slate-300">{link.progressiveYards}m</td>
                          <td className="py-2 font-mono text-amber-300">{link.keyPasses > 0 ? `🔥 ${link.keyPasses}` : '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Diamond Architecture Insights */}
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="text-xs font-black text-amber-400 uppercase">
                    Key Passing Hub: Captain Christian Tharney (#13, CDM)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Christian Tharney acts as the single-pivot distribution switchboard at the base of the diamond, completing <strong>52 forward passes</strong> to wide midfielders Quinn Wachtveitl (#10) and Bennett Cuchera (#7), and advanced playmaker Rayyaan Mohiuddin (#14).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="text-xs font-black text-cyan-400 uppercase">
                    Diamond Tip Playmaker: Captain Rayyaan Mohiuddin (#14, CAM)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Rayyaan Mohiuddin achieved <strong>7 key passes</strong> into the 18-yard box, feeding twin strikers Captain Tommy Kim (#28) and Jeffery Zhang (#20) with high Expected Threat ($xT$) diagonal through-balls.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="text-xs font-black text-emerald-400 uppercase">
                    Center Back Progressive Axis: Owen Bonchev & Carson Wiley
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Bonchev (#8) and Wiley (#22) demonstrated elite press resistance with <strong>92.3% completion rate</strong> from deep buildup, bypassing first line opponent pressure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: GPS Physical Telemetry & Sprint Engine */}
      {/* ==================================================================== */}
      {activeTab === 'GPS' && (
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-5 border border-slate-800 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" /> Squad GPS Tracking & Athletic Load Metrics
                </h2>
                <p className="text-[11px] text-slate-400">
                  Catapult GPS vest telemetry covering all 20 active roster athletes across total distance, high-intensity running, sprint count, and top speed.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-300">
                Squad Work Rate: <strong className="text-emerald-400 font-bold">92.4% Aerobic Intensity</strong>
              </div>
            </div>

            {/* GPS Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold text-[10px] uppercase">
                    <th className="py-2.5">Athlete</th>
                    <th className="py-2.5">Pos</th>
                    <th className="py-2.5">Total Distance</th>
                    <th className="py-2.5">High-Speed Run (&gt;12.5 mph)</th>
                    <th className="py-2.5">Sprints (&gt;15.5 mph)</th>
                    <th className="py-2.5">Max Velocity</th>
                    <th className="py-2.5">Work Rate Intensity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                  {SQUAD_PHYSICAL_TELEMETRY.map((p) => {
                    const rosterMatch = PEDDIE_ROSTER_2026_2027.find(r => r.number === p.playerNumber);
                    return (
                      <tr key={p.playerId} className="hover:bg-slate-900/50 transition">
                        <td className="py-2 font-bold text-white">
                          <div className="flex items-center gap-2">
                            {rosterMatch?.photoUrl ? (
                              <img 
                                src={rosterMatch.photoUrl} 
                                alt={p.playerName} 
                                className="w-7 h-7 rounded-full object-cover border border-amber-400/80 flex-shrink-0" 
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-[#002147] border border-amber-400 text-amber-300 font-black text-[10px] flex items-center justify-center flex-shrink-0">
                                {p.playerNumber}
                              </div>
                            )}
                            <span>#{p.playerNumber} {p.playerName}</span>
                          </div>
                        </td>
                      <td className="py-2 font-mono text-amber-400 font-semibold">{p.position}</td>
                      <td className="py-2 font-mono font-bold text-emerald-400">{p.totalDistanceMiles || (p.totalDistanceKm ? Number((p.totalDistanceKm * 0.621371).toFixed(1)) : 0)} mi</td>
                      <td className="py-2 font-mono text-cyan-300">{p.highIntensityMiles || (p.highIntensityKm ? Number((p.highIntensityKm * 0.621371).toFixed(1)) : 0)} mi</td>
                      <td className="py-2 font-mono text-amber-300">{p.sprintsCount} bursts</td>
                      <td className="py-2 font-mono font-bold text-white">{p.topSpeedMph || (p.topSpeedKmh ? Number((p.topSpeedKmh * 0.621371).toFixed(1)) : 0)} mph</td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${p.aerobicWorkRatePct}%` }}
                              className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full"
                            ></div>
                          </div>
                          <span className="font-mono text-[10px] text-slate-400">{p.aerobicWorkRatePct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: Goalkeeper & Defensive Shield */}
      {/* ==================================================================== */}
      {activeTab === 'GK' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dylan McKenzie #98 Starter Profile */}
            <div className="glass-panel p-5 border border-amber-500/40 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  {PEDDIE_ROSTER_2026_2027.find(p => p.number === 98)?.photoUrl && (
                    <img 
                      src={PEDDIE_ROSTER_2026_2027.find(p => p.number === 98)?.photoUrl} 
                      alt="Dylan McKenzie" 
                      className="w-14 h-14 rounded-xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0" 
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
                        STARTING VARSITY GK (#98)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Junior (&apos;28)</span>
                    </div>
                    <h3 className="text-lg font-black text-white mt-1">Dylan McKenzie</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Goals Prevented</span>
                  <div className="text-xl font-mono font-black text-emerald-400">+6.8 PSxG</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Save Percentage</span>
                  <span className="text-lg font-mono font-black text-emerald-400">84.6%</span>
                  <span className="text-[10px] text-slate-500">44 Saves / 52 Shots</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Clean Sheets</span>
                  <span className="text-lg font-mono font-black text-amber-400">6 Clean Sheets</span>
                  <span className="text-[10px] text-slate-500">12 Matches Played</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Crosses Claimed %</span>
                  <span className="text-lg font-mono font-black text-cyan-400">96.2%</span>
                  <span className="text-[10px] text-slate-500">25 of 26 Crosses Captured</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Avg Launch Dist</span>
                  <span className="text-lg font-mono font-black text-white">48.5m</span>
                  <span className="text-[10px] text-slate-500">Drop Kick / Distribution</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-300 leading-relaxed">
                <strong>Scout Evaluation:</strong> Exceptional penalty box command and rapid reflex reaction. Dylan consistently neutralizes high-danger 1v1 situations and initiates rapid counter-attack transitions with pinpoint long kicks into wide channels.
              </div>
            </div>

            {/* Jeffery Zhang #20 Backup Keeper Profile */}
            <div className="glass-panel p-5 border border-cyan-500/40 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  {PEDDIE_ROSTER_2026_2027.find(p => p.number === 20)?.photoUrl && (
                    <img 
                      src={PEDDIE_ROSTER_2026_2027.find(p => p.number === 20)?.photoUrl} 
                      alt="Jeffery Zhang" 
                      className="w-14 h-14 rounded-xl object-cover border-2 border-cyan-400 shadow-md flex-shrink-0" 
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold">
                        EMERGENCY BACKUP GK (#20)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Junior (&apos;28)</span>
                    </div>
                    <h3 className="text-lg font-black text-white mt-1">Jeffery Zhang</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Primary Role</span>
                  <div className="text-xs font-mono font-bold text-amber-400">Starting ST (#20)</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Backup Save %</span>
                  <span className="text-lg font-mono font-black text-emerald-400">80.0%</span>
                  <span className="text-[10px] text-slate-500">4 Saves in Match Situations</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Weight &amp; Frame</span>
                  <span className="text-lg font-mono font-black text-white">172 lbs</span>
                  <span className="text-[10px] text-slate-500">Athletic Build</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Crosses Claimed %</span>
                  <span className="text-lg font-mono font-black text-cyan-400">88.0%</span>
                  <span className="text-[10px] text-slate-500">Aerial Box Authority</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Versatility Index</span>
                  <span className="text-lg font-mono font-black text-amber-400">ST / GK</span>
                  <span className="text-[10px] text-slate-500">Twin Threat Athlete</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs text-slate-300 leading-relaxed">
                <strong>Sideline Protocol:</strong> Jeffery Zhang acts as the designated emergency goalkeeper in the event of injury or tactical card accumulation to Dylan McKenzie (#98). His wingspan and explosive jumping ability provide reliable net protection.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: Head-to-Head Athlete Comparison */}
      {/* ==================================================================== */}
      {activeTab === 'COMPARE' && (
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-5 border border-slate-800 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" /> Head-to-Head Athlete Comparison Matrix
                </h2>
                <p className="text-[11px] text-slate-400">
                  Compare any two Peddie players side-by-side across overall rating, speed, distance load, and tactical telemetry.
                </p>
              </div>

              {/* Selectors */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400">Athlete A:</span>
                  <select
                    value={playerAId}
                    onChange={(e) => setPlayerAId(e.target.value)}
                    className="bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-bold py-1.5 px-2.5 rounded-lg"
                  >
                    {PEDDIE_ROSTER_2026_2027.map(p => (
                      <option key={p.id} value={p.id}>#{p.number} {p.name} ({p.position})</option>
                    ))}
                  </select>
                </div>

                <span className="text-slate-500 font-bold text-xs">VS</span>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cyan-400">Athlete B:</span>
                  <select
                    value={playerBId}
                    onChange={(e) => setPlayerBId(e.target.value)}
                    className="bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold py-1.5 px-2.5 rounded-lg"
                  >
                    {PEDDIE_ROSTER_2026_2027.map(p => (
                      <option key={p.id} value={p.id}>#{p.number} {p.name} ({p.position})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Comparison Cards Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Athlete A Card */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    {playerA.photoUrl ? (
                      <img 
                        src={playerA.photoUrl} 
                        alt={playerA.name} 
                        className="w-14 h-14 rounded-xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0" 
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#002147] border-2 border-amber-400 text-amber-300 font-black text-lg flex items-center justify-center flex-shrink-0">
                        #{playerA.number}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">
                          #{playerA.number} • {playerA.position}
                        </span>
                        {playerA.isCaptain && (
                          <span className="text-[10px] text-amber-300 font-bold uppercase">(Captain)</span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-white mt-1">{playerA.name}</h3>
                      <span className="text-[11px] text-slate-400">{playerA.classYear} • {playerA.hometown}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Match Form</span>
                    <div className="text-2xl font-mono font-black text-amber-400">{playerA.matchFormScore || 8.8} <span className="text-xs text-slate-400 font-sans">/ 10</span></div>
                    <div className="text-[10px] text-amber-300 font-semibold">{playerA.scoutingTier || 'Varsity Starter'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Minutes Played</span>
                    <div className="text-base font-mono font-bold text-white">{playerA.minutesPlayed}&apos;</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Goals / Assists</span>
                    <div className="text-base font-mono font-bold text-emerald-400">{playerA.goals} G / {playerA.assists} A</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Pass Completion %</span>
                    <div className="text-base font-mono font-bold text-cyan-400">{playerA.passCompletionPct}%</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Max Sprint Speed</span>
                    <div className="text-base font-mono font-bold text-white">{playerA.topSpeedMph || (playerA.topSpeedKmh ? Number((playerA.topSpeedKmh * 0.621371).toFixed(1)) : 0)} mph</div>
                  </div>
                </div>

                {playerAPhysical && (
                  <div className="p-3 rounded bg-slate-950/80 border border-slate-800 text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Total Distance:</span>
                      <strong className="text-white font-mono">{playerAPhysical.totalDistanceMiles || (playerAPhysical.totalDistanceKm ? Number((playerAPhysical.totalDistanceKm * 0.621371).toFixed(1)) : 0)} mi</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>High-Intensity Distance:</span>
                      <strong className="text-cyan-300 font-mono">{playerAPhysical.highIntensityMiles || (playerAPhysical.highIntensityKm ? Number((playerAPhysical.highIntensityKm * 0.621371).toFixed(1)) : 0)} mi</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Sprint Bursts:</span>
                      <strong className="text-amber-300 font-mono">{playerAPhysical.sprintsCount}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Athlete B Card */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    {playerB.photoUrl ? (
                      <img 
                        src={playerB.photoUrl} 
                        alt={playerB.name} 
                        className="w-14 h-14 rounded-xl object-cover border-2 border-cyan-400 shadow-md flex-shrink-0" 
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#002147] border-2 border-cyan-400 text-cyan-300 font-black text-lg flex items-center justify-center flex-shrink-0">
                        #{playerB.number}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold">
                          #{playerB.number} • {playerB.position}
                        </span>
                        {playerB.isCaptain && (
                          <span className="text-[10px] text-cyan-300 font-bold uppercase">(Captain)</span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-white mt-1">{playerB.name}</h3>
                      <span className="text-[11px] text-slate-400">{playerB.classYear} • {playerB.hometown}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Match Form</span>
                    <div className="text-2xl font-mono font-black text-cyan-400">{playerB.matchFormScore || 8.8} <span className="text-xs text-slate-400 font-sans">/ 10</span></div>
                    <div className="text-[10px] text-cyan-300 font-semibold">{playerB.scoutingTier || 'Varsity Starter'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Minutes Played</span>
                    <div className="text-base font-mono font-bold text-white">{playerB.minutesPlayed}&apos;</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Goals / Assists</span>
                    <div className="text-base font-mono font-bold text-emerald-400">{playerB.goals} G / {playerB.assists} A</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Pass Completion %</span>
                    <div className="text-base font-mono font-bold text-cyan-400">{playerB.passCompletionPct}%</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Max Sprint Speed</span>
                    <div className="text-base font-mono font-bold text-white">{playerB.topSpeedMph || (playerB.topSpeedKmh ? Number((playerB.topSpeedKmh * 0.621371).toFixed(1)) : 0)} mph</div>
                  </div>
                </div>

                {playerBPhysical && (
                  <div className="p-3 rounded bg-slate-950/80 border border-slate-800 text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Total Distance:</span>
                      <strong className="text-white font-mono">{playerBPhysical.totalDistanceMiles || (playerBPhysical.totalDistanceKm ? Number((playerBPhysical.totalDistanceKm * 0.621371).toFixed(1)) : 0)} mi</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>High-Intensity Distance:</span>
                      <strong className="text-cyan-300 font-mono">{playerBPhysical.highIntensityMiles || (playerBPhysical.highIntensityKm ? Number((playerBPhysical.highIntensityKm * 0.621371).toFixed(1)) : 0)} mi</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Sprint Bursts:</span>
                      <strong className="text-amber-300 font-mono">{playerBPhysical.sprintsCount}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
