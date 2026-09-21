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
  Eye
} from 'lucide-react';

export default function Home() {
  const { season, isLiveMatch } = useSeason();
  const [selectedMatchId, setSelectedMatchId] = useState<string>('m-4'); // Defaults to PDS 4-2 W
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
      name: 'PDS (4-2 W)',
      opponent: 'PRINCETON DAY SCHOOL',
      date: 'Sept 16, 2026',
      scorePeddie: 4,
      scoreOpponent: 2,
      xgPeddie: 3.12,
      xgOpponent: 1.45,
      possession: 58,
      badge: '2026–2027 MERCER COUNTY DERBY VICTORY',
      headline: 'Peddie Falcons 4 – 2 Princeton Day School',
      summary: "Signature home victory highlighted by Jeet Sinha's stunning 64' curling strike into the top corner, Tommy Kim's brace (9', 38'), and Zachary Horsch's 79' counter-attack sealer.",
      events: MATCH_EVENTS_VEO_PDS,
      coachQuote: '"Outstanding discipline. Jeet Sinha\'s curling finish was world-class, and Dylan McKenzie came up huge in goal to seal the win." — Coach George Nazario',
      pressStatus: 'FINAL • PEDDIE 4-2 PDS (W)'
    },
    'm-3': {
      name: 'George (6-4 W)',
      opponent: 'GEORGE SCHOOL',
      date: 'Sept 12, 2026',
      scorePeddie: 6,
      scoreOpponent: 4,
      xgPeddie: 4.25,
      xgOpponent: 3.10,
      possession: 54,
      badge: 'HIGH-SCORING ROAD TRIUMPH',
      headline: 'Peddie Falcons 6 – 4 George School',
      summary: 'Epic 10-goal thriller on the road featuring braces from Tommy Kim and Jeffrey Zhang, Bennett Cucchiara\'s laser, and Carson Wiley\'s towering header.',
      events: MATCH_EVENTS_VEO_GEORGE,
      coachQuote: '"We showed tremendous offensive firepower. Scoring 6 goals away from home proved our attacking depth." — Coach George Nazario',
      pressStatus: 'FINAL • PEDDIE 6-4 GEORGE (W)'
    },
    'm-1': {
      name: 'Aquinas (3-2 W)',
      opponent: 'ST. THOMAS AQUINAS',
      date: 'Sept 5, 2026',
      scorePeddie: 3,
      scoreOpponent: 2,
      xgPeddie: 2.84,
      xgOpponent: 1.65,
      possession: 55,
      badge: '2026–2027 HOME OPENER VICTORY',
      headline: 'Peddie Falcons 3 – 2 St. Thomas Aquinas',
      summary: 'Thrilling Home Opener triumph. Goals by Tommy Kim 34\', Captain Christian Tharney 58\', and Carson Wiley 81\' (Game-Winning Header).',
      events: MATCH_EVENTS_VEO_AQUINAS,
      coachQuote: '"Carson Wiley\'s 81st minute header gave us the lift we needed against a very tough Aquinas side." — Coach George Nazario',
      pressStatus: 'FINAL • PEDDIE 3-2 AQUINAS (W)'
    },
    'm-2': {
      name: 'Trenton (4-1 W)',
      opponent: 'TRENTON CATHOLIC ACADEMY',
      date: 'Sept 9, 2026',
      scorePeddie: 4,
      scoreOpponent: 1,
      xgPeddie: 3.35,
      xgOpponent: 1.20,
      possession: 61,
      badge: 'NON-CONFERENCE HOME MASTERCLASS',
      headline: 'Peddie Falcons 4 – 1 Trenton Catholic',
      summary: 'Decisive home victory powered by Tommy Kim\'s brace, Jeffrey Zhang\'s curling strike, and Christian Tharney\'s towering header off a Cucchiara corner.',
      events: MATCH_EVENTS_VEO_TRENTON,
      coachQuote: '"Dominant response after the opener. Our midfield diamond controlled the tempo from start to finish." — Coach George Nazario',
      pressStatus: 'FINAL • PEDDIE 4-1 TRENTON (W)'
    },
    'm-0': {
      name: 'Haverford (0-4 L)',
      opponent: 'THE HAVERFORD SCHOOL',
      date: 'Sept 1, 2026',
      scorePeddie: 0,
      scoreOpponent: 4,
      xgPeddie: 1.02,
      xgOpponent: 2.85,
      possession: 46,
      badge: '2026–2027 SEASON OPENER (VEO AI)',
      headline: 'Peddie Falcons 0 – 4 The Haverford School',
      summary: 'Official Veo AI match breakdown, 4x20 min periods, test against nationally ranked Inter-Ac powerhouse that launched our tactical progression.',
      events: MATCH_EVENTS_VEO_HAVERFORD,
      coachQuote: '"Playing a national power like Haverford revealed what we needed to tighten defensively before embarking on our 3-game win streak." — Coach George Nazario',
      pressStatus: 'FINAL • 4x20-MIN PERIODS'
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
