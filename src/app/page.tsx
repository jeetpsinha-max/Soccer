'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSeason } from '@/context/SeasonContext';
import { BroadcastSoccerHud } from '@/components/video/BroadcastSoccerHud';
import { PitchRadarOverlay } from '@/components/pitch/PitchRadarOverlay';
import { FormationBoard } from '@/components/pitch/FormationBoard';
import { MATCH_EVENTS_LIVE_BLAIR, PEDDIE_SCHEDULE_2026_2027 } from '@/lib/soccer-data';
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
  Film
} from 'lucide-react';

export default function Home() {
  const { season, isLiveMatch } = useSeason();
  const [eventFilter, setEventFilter] = useState('ALL');
  const [nlQuery, setNlQuery] = useState('');

  const exportHudlCsv = () => {
    const csv = SoccerCsvEngine.exportToCsv(MATCH_EVENTS_LIVE_BLAIR);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `peddie_soccer_match_events_${season}.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner / Match Fixture Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-extrabold text-[11px] tracking-wide uppercase">
              PEDDIE-BLAIR DAY 2026 (123RD EDITION)
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-400 text-xs font-semibold">MAPL Championship Decider</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-cyan-400 text-xs font-semibold">Head Coach: George Nazario</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-amber-400 text-xs font-bold">Captains: Christian, Rayyaan, Noah, Tommy</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-emerald-400 text-xs font-bold">System: 4-4-2 Diamond Midfield</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Peddie Falcons vs. Blair Academy Buccaneers
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Live broadcast tactical telemetry, expected goals ($xG$), passing channel dominance, and computerized sideline coaching directives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportHudlCsv}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 text-xs font-bold transition shadow"
          >
            <Download className="w-3.5 h-3.5" /> Export Wyscout/Hudl CSV
          </button>
          <Link
            href="/dashboard/call-sheet"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition shadow-lg shadow-amber-500/20"
          >
            Sideline Call Sheet <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Official First Game Veo AI Banner */}
      <div className="glass-panel p-4 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-xs shrink-0">
            VEO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                Season Opener Scrimmage Film Available
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                Sept 1, 2026
              </span>
            </div>
            <div className="text-sm font-bold text-white">
              Peddie Varsity vs. The Haverford School (4x20-Min Periods)
            </div>
            <div className="text-xs text-slate-300">
              Veo AI match video recorded with 32 highlight clips, 5 goals, and 1080p MP4 film breakdown.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dashboard/match-film"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition shadow flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5" /> Analyze Film
          </Link>
          <a
            href="https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <span>Veo URL</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Broadcast Scoreboard & HUD Telemetry */}
      <BroadcastSoccerHud />

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

          <PitchRadarOverlay selectedEventType={eventFilter} />
        </div>

        {/* Right Col: Tactical AI Coach & Live Match Feed */}
        <div className="flex flex-col gap-5">
          {/* AI Coach Directive Card */}
          <div className="glass-panel p-5 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>AI TACTICAL ORCHESTRATOR (74&apos; DIRECTIVE)</span>
            </div>
            <div className="text-sm font-bold text-white mb-2">
              Protect 2-1 Advantage: 4-4-2 Diamond Central Control
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Blair Academy pushing high for an equalizer. Directive: Maintain the 4-4-2 Diamond Midfield compactness anchored by Captains Christian Tharney (#13), Noah Eldessouky (#12), Rayyaan Mohiuddin (#14), and Tommy Kim (#28).
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] flex items-center justify-between">
              <span className="text-slate-400">Projected Win Rate:</span>
              <span className="text-emerald-400 font-black font-mono">82.4% with Diamond Lockout</span>
            </div>
          </div>

          {/* Match Events Timeline */}
          <div className="glass-panel p-5 flex flex-col gap-3">
            <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Key Match Highlights</span>
              <span className="text-amber-400">{MATCH_EVENTS_LIVE_BLAIR.length} Recorded</span>
            </div>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {MATCH_EVENTS_LIVE_BLAIR.slice().reverse().map(ev => (
                <div
                  key={ev.id}
                  className={`p-2.5 rounded-lg border text-xs flex flex-col gap-1 transition ${
                    ev.type === 'Goal'
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : ev.team === 'Peddie'
                        ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                        : 'bg-red-500/5 border-red-500/20 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-cyan-400">{ev.minute}&apos; {ev.type}</span>
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
