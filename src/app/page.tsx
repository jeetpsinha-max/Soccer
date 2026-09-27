'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSeason } from '@/context/SeasonContext';
import { BroadcastSoccerHud } from '@/components/video/BroadcastSoccerHud';
import { PitchRadarOverlay } from '@/components/pitch/PitchRadarOverlay';
import { FormationBoard } from '@/components/pitch/FormationBoard';
import { 
  MATCH_EVENTS_VEO_HAVERFORD, 
  MATCH_EVENTS_VEO_AQUINAS,
  MATCH_EVENTS_VEO_TRENTON,
  MATCH_EVENTS_VEO_GEORGE,
  MATCH_EVENTS_VEO_PDS,
  PEDDIE_SCHEDULE_2026_2027 
} from '@/lib/soccer-data';
import { MatchEvent } from '@/lib/types';
import { SoccerCsvEngine } from '@/lib/soccer-csv-engine';
import { 
  Sparkles, 
  Download, 
  ArrowRight, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Award,
  Zap,
  Film,
  BarChart3,
  Calendar,
  Trophy,
  Flame,
  Clock,
  Eye,
  Compass,
  Radio,
  Play,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  const { season, isLiveMatch } = useSeason();
  const [selectedMatchId, setSelectedMatchId] = useState<string>('m-4'); // Defaults to PDS 7-1 W
  const [eventFilter, setEventFilter] = useState('ALL');
  const [nlQuery, setNlQuery] = useState('');

  const nextFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.status === 'Upcoming') || PEDDIE_SCHEDULE_2026_2027[5];

  const MATCH_DATA: Record<string, {
    name: string;
    opponent: string;
    date: string;
    scorePeddie: number;
    scoreOpponent: number;
    xgPeddie: number;
    xgOpponent: number;
    possession: number;
    badge: string;
    headline: string;
    summary: string;
    events: MatchEvent[];
    coachQuote: string;
    pressStatus: string;
  }> = {
    'm-4': {
      name: 'PDS (7-1 W)',
      opponent: 'PRINCETON DAY SCHOOL',
      date: 'Sept 14, 2026',
      scorePeddie: 7,
      scoreOpponent: 1,
      xgPeddie: 4.48,
      xgOpponent: 0.94,
      possession: 65,
      badge: '2026–2027 MERCER COUNTY DERBY TRIUMPH',
      headline: 'Peddie Falcons 7 – 1 Princeton Day School',
      summary: "Signature road masterclass highlighted by Tommy Kim's explosive hat-trick (8', 24', 51'), Jeet Sinha's stunning 64' curling strike into the upper 90, and goals by Zhang, Tharney, and Cucchiara.",
      events: MATCH_EVENTS_VEO_PDS,
      coachQuote: '"A complete 80-minute performance. Jeet Sinha\'s curling finish was world-class, Tommy Kim was unplayable, and our diamond midfield owned every inch of the pitch." — Coach George Nazario',
      pressStatus: 'FINAL • PEDDIE 7-1 PDS (W)'
    },
    'm-3': {
      name: 'George (5-2 W)',
      opponent: 'GEORGE SCHOOL',
      date: 'Sept 10, 2026',
      scorePeddie: 5,
      scoreOpponent: 2,
      xgPeddie: 3.65,
      xgOpponent: 1.42,
      possession: 59,
      badge: 'FRIENDS SCHOOLS LEAGUE SHOWCASE ROAD WIN',
      headline: 'Peddie Falcons 5 – 2 George School',
      summary: "Dominant 5-2 road triumph powered by Tommy Kim's brace, Rayyaan Mohiuddin's Zone 14 masterclass, Christian Tharney's penalty, and Blake Romanelli's clinical finish.",
      events: MATCH_EVENTS_VEO_GEORGE,
      coachQuote: '"Scoring 5 goals away from home proved our attacking depth and tactical maturity." — Coach George Nazario',
      pressStatus: 'FINAL • PEDDIE 5-2 GEORGE (W)'
    },
    'm-1': {
      name: 'Aquinas (3-2 W)',
      opponent: 'ST. THOMAS AQUINAS',
      date: 'Sept 4, 2026',
      scorePeddie: 3,
      scoreOpponent: 2,
      xgPeddie: 2.84,
      xgOpponent: 1.65,
      possession: 57,
      badge: '2026–2027 HOME OPENER VICTORY',
      headline: 'Peddie Falcons 3 – 2 St. Thomas Aquinas',
      summary: 'Thrilling Home Opener triumph. Goals by Tommy Kim 34\', Captain Christian Tharney 58\', and Carson Wiley 81\' (Game-Winning Header off Cucchiara corner).',
      events: MATCH_EVENTS_VEO_AQUINAS,
      coachQuote: '"Carson Wiley\'s 81st minute header gave us the lift we needed against a very tough GMC Non-Public power." — Coach George Nazario',
      pressStatus: 'FINAL • PEDDIE 3-2 AQUINAS (W)'
    },
    'm-2': {
      name: 'Trenton (2-3 L)',
      opponent: 'TRENTON CENTRAL HIGH SCHOOL',
      date: 'Sept 8, 2026',
      scorePeddie: 2,
      scoreOpponent: 3,
      xgPeddie: 2.12,
      xgOpponent: 2.45,
      possession: 51,
      badge: 'MERCER COUNTY NON-CONFERENCE CLASH',
      headline: 'Peddie Falcons 2 – 3 Trenton Central',
      summary: 'High-octane Mercer County battle at Trenton Central. Peddie struck twice through Tommy Kim (#28) and Jeffrey Zhang (#20), battling intensely across 80 minutes.',
      events: MATCH_EVENTS_VEO_TRENTON,
      coachQuote: '"Tough road clash against an athletic side. We scored two great goals and identified key transition coverage adjustments." — Coach George Nazario',
      pressStatus: 'FINAL • PEDDIE 2-3 TRENTON (L)'
    },
    'm-0': {
      name: 'Haverford (0-5 L)',
      opponent: 'THE HAVERFORD SCHOOL',
      date: 'Sept 1, 2026',
      scorePeddie: 0,
      scoreOpponent: 5,
      xgPeddie: 1.15,
      xgOpponent: 3.48,
      possession: 45,
      badge: '2026–2027 PRESEASON OPENER (VEO AI)',
      headline: 'Peddie Falcons 0 – 5 The Haverford School',
      summary: 'Official Veo AI match breakdown, 4x20 min periods, early trial against nationally ranked Inter-Ac powerhouse that launched our diamond midfield progression.',
      events: MATCH_EVENTS_VEO_HAVERFORD,
      coachQuote: '"Playing a national power like Haverford was the crucible that forged our diamond midfield structure and ignited our winning form." — Coach George Nazario',
      pressStatus: 'FINAL • 4x20-MIN PERIODS (0-5 L)'
    }
  };

  const currentMatch = MATCH_DATA[selectedMatchId] || MATCH_DATA['m-4'];
  const activeEvents = currentMatch.events;

  const exportHudlCsv = () => {
    const csv = SoccerCsvEngine.exportToCsv(activeEvents);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `peddie_soccer_${selectedMatchId}_events_${season}.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🦅 DUAL-SPORT ATHLETIC COMMAND CENTER BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#001733] border border-amber-400/40 p-5 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Platform Identity */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                Peddie Athletics SAC
              </span>
              <span className="text-cyan-400 text-xs font-mono font-bold">
                Unified Multi-Sport Intelligence
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-300 text-xs">
                Mid-Atlantic Prep League (MAPL)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>FALCON VARSITY COMMAND SUITE</span>
              <span className="text-amber-400 font-mono text-sm font-bold bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/30">
                v2.0 DUAL-SPORT
              </span>
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Real-time strategic analytics, AI vision tracking, and automated game planning for both Falcon Varsity Soccer (Veo Optical Tracking) and Falcon Varsity Football (Hudl AI Engine).
            </p>
          </div>

          {/* Quick Program Jump Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
            {/* Soccer Program Pill */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/40 hover:border-emerald-400 transition-all flex flex-col justify-between gap-2 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚽</span>
                  <div>
                    <div className="text-xs font-black text-white">VARSITY SOCCER</div>
                    <div className="text-[10px] text-emerald-400 font-bold">2026–2027 • 3-2-0 (17 GF)</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black">
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-white/5">
                <Link
                  href="/dashboard/war-room"
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 text-[10px] font-bold transition"
                >
                  AI War Room
                </Link>
                <Link
                  href="/dashboard/playbook"
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 text-[10px] font-bold transition"
                >
                  Playbook
                </Link>
                <Link
                  href="/dashboard/simulator"
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 text-[10px] font-bold transition"
                >
                  Simulator
                </Link>
              </div>
            </div>

            {/* Football Program Pill */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/40 hover:border-amber-400 transition-all flex flex-col justify-between gap-2 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏈</span>
                  <div>
                    <div className="text-xs font-black text-white">VARSITY FOOTBALL</div>
                    <div className="text-[10px] text-amber-400 font-bold">2025–2026 • 5-4 (1,280 Plays)</div>
                  </div>
                </div>
                <Link
                  href="/football"
                  className="text-[10px] px-2 py-0.5 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-black transition flex items-center gap-1 shadow-md shadow-amber-400/20"
                >
                  LAUNCH <span>→</span>
                </Link>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-white/5">
                <Link
                  href="/football/film-room"
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 text-[10px] font-bold transition"
                >
                  Film Room
                </Link>
                <Link
                  href="/football/call-sheet"
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 text-[10px] font-bold transition"
                >
                  Call Sheet
                </Link>
                <Link
                  href="/football/offensive-coach"
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 text-[10px] font-bold transition"
                >
                  AI Coach
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner / Match Fixture Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 border border-emerald-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-extrabold text-[11px] tracking-wide uppercase">
              {currentMatch.badge}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-400 text-xs font-semibold">{currentMatch.date}</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-cyan-400 text-xs font-semibold">Head Coach: George Nazario</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-amber-400 text-xs font-bold">Captains: Christian, Rayyaan, Noah, Tommy</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-emerald-400 text-xs font-bold">System: 4-4-2 Diamond Midfield</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            {currentMatch.headline}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {currentMatch.summary}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 flex-wrap">
          {/* Match Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold flex-wrap">
            {Object.entries(MATCH_DATA).map(([id, m]) => (
              <button
                key={id}
                onClick={() => setSelectedMatchId(id)}
                className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 text-[11px] ${
                  selectedMatchId === id
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.scorePeddie > m.scoreOpponent ? <Trophy className="w-3 h-3 text-emerald-600" /> : <Calendar className="w-3 h-3 text-slate-400" />}
                {m.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition shadow"
            >
              <BarChart3 className="w-3.5 h-3.5" /> Analytics
            </Link>
            <button
              onClick={exportHudlCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition shadow"
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
            <Link
              href="/dashboard/call-sheet"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition shadow-lg shadow-amber-500/20"
            >
              Call Sheet <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Next Match Spotlight Banner */}
      <div className="glass-panel p-4 border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 animate-pulse shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wide">
                NEXT MATCH ON SCHEDULE
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                {nextFixture.matchDate} • {nextFixture.gameTime}
              </span>
            </div>
            <div className="text-sm font-bold text-white">
              {nextFixture.isHome ? 'vs' : '@'} {nextFixture.opponent} ({nextFixture.isHome ? 'Home Field' : 'Away'})
            </div>
            <div className="text-xs text-slate-300">
              {nextFixture.keySummary}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dashboard/scouting"
            className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition shadow flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Scout {nextFixture.opponentLogoText}
          </Link>
          <Link
            href="/dashboard/schedule"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <span>Full Schedule (17)</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Multi-Agent Council Quick Launch Command Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link
          href="/dashboard/war-room"
          className="p-4 rounded-2xl glass-panel border border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-slate-900/80 to-slate-950 hover:border-amber-400 transition-all duration-300 group shadow-lg"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              4 AI MINDS
            </span>
          </div>
          <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition flex items-center gap-1">
            AI Tactical War Room <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition" />
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Fable 5, Grok, GPT & Kimi debate in-game dilemmas in real time.
          </p>
        </Link>

        <Link
          href="/dashboard/playbook"
          className="p-4 rounded-2xl glass-panel border border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 via-slate-900/80 to-slate-950 hover:border-cyan-400 transition-all duration-300 group shadow-lg"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              ANIMATED
            </span>
          </div>
          <h3 className="text-sm font-black text-white group-hover:text-cyan-300 transition flex items-center gap-1">
            Playbook Studio <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition" />
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Animated corner kicks, press-break triangles, and free kick routines.
          </p>
        </Link>

        <Link
          href="/dashboard/simulator"
          className="p-4 rounded-2xl glass-panel border border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-slate-950 hover:border-emerald-400 transition-all duration-300 group shadow-lg"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              <Radio className="w-4 h-4" />
            </span>
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              LIVE ENGINE
            </span>
          </div>
          <h3 className="text-sm font-black text-white group-hover:text-emerald-300 transition flex items-center gap-1">
            Touchline Simulator <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition" />
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Simulate 80-min matches with live stances, team talks & substitutions.
          </p>
        </Link>

        <Link
          href="/dashboard/scouting"
          className="p-4 rounded-2xl glass-panel border border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-slate-900/80 to-slate-950 hover:border-purple-400 transition-all duration-300 group shadow-lg"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
              OPPONENT INTEL
            </span>
          </div>
          <h3 className="text-sm font-black text-white group-hover:text-purple-300 transition flex items-center gap-1">
            Opponent Scouting Hub <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition" />
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Opponent tactical dossiers, key threats, and 1v1 duel matchup simulations.
          </p>
        </Link>
      </div>

      {/* Broadcast Scoreboard & HUD Telemetry */}
      <BroadcastSoccerHud 
        peddieScore={currentMatch.scorePeddie}
        opponentScore={currentMatch.scoreOpponent}
        opponentName={currentMatch.opponent}
        peddieXg={currentMatch.xgPeddie}
        opponentXg={currentMatch.xgOpponent}
        possessionPeddie={currentMatch.possession}
        pressStatus={currentMatch.pressStatus}
      />

      {/* Main Grid: Pitch Radar & Match Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Pitch Radar */}
        <div className="lg:col-span-2 glass-panel p-5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Match Spatial Radar & Events
              </h2>
              <p className="text-[11px] text-slate-400">
                105m x 68m regulation pitch coordinates with real-time pass completion vectors
              </p>
            </div>

            {/* Event Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
              {['ALL', 'GOALS', 'SHOTS', 'PASSES', 'DEFENSE'].map(f => (
                <button
                  key={f}
                  onClick={() => setEventFilter(f)}
                  className={`px-2.5 py-1 rounded text-[10px] font-extrabold transition ${
                    eventFilter === f ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <PitchRadarOverlay events={activeEvents} selectedEventType={eventFilter} />
        </div>

        {/* Right Col: Tactical AI Coach & Live Match Feed */}
        <div className="flex flex-col gap-5">
          {/* AI Coach Directive Card */}
          <div className="glass-panel p-5 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>COACH GEORGE NAZARIO • MATCH DIRECTIVE</span>
            </div>
            <div className="text-sm font-bold text-white mb-2">
              {currentMatch.name}: 4-4-2 Diamond Breakdown
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {currentMatch.coachQuote}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] flex items-center justify-between">
              <span className="text-slate-400">Match Status:</span>
              <span className="text-emerald-400 font-black font-mono">
                {currentMatch.pressStatus}
              </span>
            </div>
          </div>

          {/* Match Events Timeline */}
          <div className="glass-panel p-5 flex flex-col gap-3">
            <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
              <span>{currentMatch.name} Events & Highlights</span>
              <span className="text-amber-400">{activeEvents.length} Recorded</span>
            </div>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {activeEvents.slice().reverse().map(ev => (
                <div
                  key={ev.id}
                  className={`p-2.5 rounded-lg border text-xs flex flex-col gap-1 transition ${
                    ev.type === 'Goal'
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      : ev.team === 'Peddie'
                        ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                        : 'bg-red-500/5 border-red-500/20 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-cyan-400">
                      {ev.period ? `${selectedMatchId === 'm-0' ? 'Q' : 'H'}${ev.period} ` : ''}{ev.minute}&apos; {ev.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{ev.team}</span>
                  </div>
                  <div className="font-semibold text-white">{ev.playerName}</div>
                  <div className="text-[11px] text-slate-400">{ev.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tactical Formation Snapshot */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" /> Active System & Lineup
            </h2>
            <p className="text-xs text-slate-400">
              Interactive formation visualizer with tactical instructions per position
            </p>
          </div>
          <Link
            href="/dashboard/tactics"
            className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            Tactics Lab <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <FormationBoard />
      </div>
    </div>
  );
}
