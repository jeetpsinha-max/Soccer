'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MAPL_SCOUTING_REPORTS, OPPONENT_VEO_SCOUTING, OPPONENT_PLAYER_SCOUTING_REPORTS } from '@/lib/soccer-data';
import { SoccerTacticalAgent } from '@/lib/agents/soccer-agents';
import { OpponentPlayerReport } from '@/lib/types';
import { 
  Compass, 
  Shield, 
  Award, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  Video, 
  Calendar, 
  ChevronRight,
  Target,
  Layers,
  Flame,
  X,
  Footprints,
  Activity,
  ExternalLink
} from 'lucide-react';

export default function ScoutingPage() {
  const scoutingList = Object.values(OPPONENT_VEO_SCOUTING);
  const [selectedOpponentName, setSelectedOpponentName] = useState<string>(scoutingList[0]?.opponent || 'The Haverford School');
  const [playerLineFilter, setPlayerLineFilter] = useState<'ALL' | 'GK' | 'DEF' | 'MID' | 'FWD'>('ALL');
  const [selectedOpponentPlayer, setSelectedOpponentPlayer] = useState<OpponentPlayerReport | null>(null);

  const selectedScout = scoutingList.find(s => s.opponent === selectedOpponentName) || scoutingList[0];
  const opponentKey = Object.keys(OPPONENT_VEO_SCOUTING).find(k => OPPONENT_VEO_SCOUTING[k].opponent === selectedScout.opponent) || 'haverford';
  const opponentPlayers = OPPONENT_PLAYER_SCOUTING_REPORTS[opponentKey] || selectedScout.scoutedPlayers || [];
  
  const filteredOpponentPlayers = opponentPlayers.filter(p => {
    if (playerLineFilter === 'ALL') return true;
    return p.line === playerLineFilter;
  });

  const report = MAPL_SCOUTING_REPORTS[selectedOpponentName] || MAPL_SCOUTING_REPORTS[selectedScout.opponent] || MAPL_SCOUTING_REPORTS['blair'];
  const tacticalPlan = SoccerTacticalAgent.generateTacticalPlan(selectedOpponentName);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="glass-panel p-6 border border-cyan-500/30 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#001f3f] shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase tracking-wider">
              VEO FILM MATCH INTELLIGENCE & SCOUTING
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-300 text-xs font-semibold">All 17 Scheduled Opponents</span>
          </div>

          <Link
            href="/dashboard/schedule"
            className="px-3.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            View Upcoming Schedule
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Opponent Tendencies, Veo AI Film & Win Probability
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Comprehensive tactical dossiers for every school on Peddie&apos;s 2026–2027 varsity boys schedule. Evaluated with Veo AI tracking timestamps, 4-phase breakdowns, and Coach Nazario&apos;s diamond counter-directives.
        </p>
      </div>

      {/* Opponent Selector Carousel / Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-1">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          Select Opponent Dossier ({scoutingList.length} Teams Scanned):
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {scoutingList.map(scout => {
            const isSelected = scout.opponent === selectedOpponentName;
            return (
              <button
                key={scout.opponent}
                onClick={() => setSelectedOpponentName(scout.opponent)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20 border-amber-400'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className={`w-6 h-6 rounded-md text-[10px] flex items-center justify-center font-black ${
                  isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {scout.logoText}
                </span>
                <span>{scout.shortName}</span>
                {scout.threatLevel === 'Critical' && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scouting Dossier Card */}
      <div className="glass-panel p-6 sm:p-8 border border-amber-500/30 rounded-2xl flex flex-col gap-6 bg-slate-900/80 shadow-2xl">
        {/* Opponent Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-amber-400/60 flex items-center justify-center text-amber-400 font-black text-xl shadow-lg shrink-0">
              {selectedScout.logoText}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
                  {selectedScout.conference}
                </span>
                <span className={`px-2 py-0.2 rounded text-[10px] font-black uppercase ${
                  selectedScout.threatLevel === 'Critical'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : selectedScout.threatLevel === 'High'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {selectedScout.threatLevel} Threat
                </span>
                {selectedScout.nationalRanking && (
                  <span className="px-2 py-0.2 rounded text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    🏆 {selectedScout.nationalRanking}
                  </span>
                )}
                {selectedScout.stateRanking && (
                  <span className="px-2 py-0.2 rounded text-[10px] font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    📍 {selectedScout.stateRanking}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black text-white mt-0.5">{selectedScout.opponent}</h2>
              <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span>Primary System: <strong className="text-cyan-400 font-mono">{selectedScout.primaryFormation}</strong> (Alt: {selectedScout.secondaryFormation})</span>
                <span>•</span>
                <span>Head Coach: <span className="text-slate-200 font-semibold">{selectedScout.headCoach}</span></span>
                {selectedScout.currentRecord && (
                  <>
                    <span>•</span>
                    <span>2026 Record: <strong className="text-amber-300 font-mono font-bold">{selectedScout.currentRecord}</strong></span>
                  </>
                )}
                {selectedScout.formGuide && (
                  <>
                    <span>•</span>
                    <span>Recent Form: <span className="font-mono text-xs px-1.5 py-0.2 bg-slate-800 rounded text-slate-300 border border-slate-700">{selectedScout.formGuide}</span></span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {selectedScout.projectedScore && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-right min-w-[140px]">
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Projected Score</div>
                <div className="text-lg font-mono font-black text-white">{selectedScout.projectedScore}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Veo Model Estimate</div>
              </div>
            )}

            {(() => {
              const pct = selectedScout.winProbabilityPct;
              const style = pct < 35 
                ? { text: 'text-rose-400', icon: 'text-rose-400', label: 'Underdog' }
                : pct < 50
                ? { text: 'text-amber-400', icon: 'text-amber-400', label: 'Slight Underdog' }
                : pct <= 55
                ? { text: 'text-cyan-400', icon: 'text-cyan-400', label: 'Even Match' }
                : { text: 'text-emerald-400', icon: 'text-emerald-400', label: pct >= 70 ? 'Projected Favorite' : 'Competitive Favorite' };
              return (
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Win Expectancy</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-slate-700 bg-slate-900 ${style.text}`}>
                        {style.label}
                      </span>
                    </div>
                    <div className={`text-2xl font-mono font-black ${style.text}`}>{selectedScout.winProbabilityPct}%</div>
                  </div>
                  <Award className={`w-8 h-8 ${style.icon}`} />
                </div>
              );
            })()}
          </div>
        </div>

        {/* Multi-Agent Council & Tactical Action Bar */}
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800">
          <Link
            href="/dashboard/war-room"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-md transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> Convene War Room vs {selectedScout.shortName}
          </Link>
          <Link
            href="/dashboard/simulator"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-black shadow-md transition"
          >
            <Activity className="w-3.5 h-3.5" /> Simulate Match vs {selectedScout.shortName}
          </Link>
          <Link
            href="/dashboard/playbook"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-bold transition"
          >
            <Layers className="w-3.5 h-3.5" /> Counter-Tactics Playbook
          </Link>
          <Link
            href="/dashboard/call-sheet"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold transition"
          >
            Sideline Call Sheet
          </Link>
          {selectedScout.sourceUrl && (
            <a
              href={selectedScout.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition ml-auto"
              title={selectedScout.sourceLabel || 'Verify Live Stats Online'}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify Online: {selectedScout.sourceLabel || 'MaxPreps'}</span>
            </a>
          )}
        </div>

        {/* Overview */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block mb-1 text-xs uppercase tracking-wider font-bold">Veo Film Scout Overview:</strong>
          {selectedScout.scoutingOverview}
        </div>

        {/* Veo Film Clips Section */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Video className="w-4 h-4 text-cyan-400" />
            Veo AI Match Film Key Moments ({selectedScout.veoClips.length} Clips Indexed)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {selectedScout.veoClips.map((clip, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {clip.minute}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    clip.phase === 'Vulnerability'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : clip.phase === 'High Press'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {clip.phase}
                  </span>
                </div>
                <div className="text-sm font-bold text-white">{clip.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{clip.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tendencies 4-Phase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Buildup & Progression Style
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{selectedScout.tacticalBreakdown.inPossession}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Defensive Block Organization
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{selectedScout.tacticalBreakdown.outOfPossession}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="font-bold text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Opponent Vulnerability Zone
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{selectedScout.tacticalBreakdown.transitionFlaws}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Set-Piece Threat Profile
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{selectedScout.tacticalBreakdown.setPieceTendencies}</p>
          </div>
        </div>

        {/* Detailed Player Scouting Reports for this Team */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                Detailed Opponent Player Scouting Reports ({selectedScout.shortName})
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Current 2026–2027 season analysis, tactical roles, and Coach Nazario 1-on-1 counters.
              </div>
            </div>

            {/* Line Filter */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              {(['ALL', 'FWD', 'MID', 'DEF', 'GK'] as const).map(line => (
                <button
                  key={line}
                  onClick={() => setPlayerLineFilter(line)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                    playerLineFilter === line
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {line === 'ALL' ? 'All Lines' : line}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOpponentPlayers.map((player) => (
              <div 
                key={player.id} 
                onClick={() => setSelectedOpponentPlayer(player)}
                className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-amber-400/60 cursor-pointer transition flex flex-col gap-3 group shadow-sm hover:shadow-amber-500/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-400/40 text-amber-300 font-mono font-black text-base flex items-center justify-center shrink-0 shadow">
                      #{player.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-black text-sm group-hover:text-amber-300 transition">{player.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {player.position}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          player.dangerLevel === 'Elite'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : player.dangerLevel === 'Dangerous'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : player.dangerLevel === 'Key Threat'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {player.dangerLevel}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {player.classYear} • Foot: {player.dominantFoot || 'Right'}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition flex items-center gap-0.5 shrink-0">
                    Full Dossier <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="text-xs font-semibold text-amber-300/90">
                  Role: <span className="text-white font-normal">{player.tacticalRole}</span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  <strong className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider block mb-0.5">2026–2027 Veo Film Note:</strong>
                  {player.currentSeasonNotes}
                </div>

                {/* Key Strengths & Flaws */}
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex flex-wrap gap-1">
                    {player.strengths.slice(0, 2).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px]">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                  {player.vulnerabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {player.vulnerabilities.slice(0, 1).map((v, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px]">
                          ⚠ Exploit: {v}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Peddie Matchup Counter */}
                <div className="mt-auto pt-2 border-t border-slate-800/80 text-[11px] text-cyan-300 flex items-start gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Peddie Matchup Counter: </span>
                    {player.peddieMatchupCounter}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tactical Directive & Matchup Edges */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-amber-950/40 border border-cyan-500/40 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-cyan-400" /> COACH NAZARIO DIRECTIVE & 4-4-2 DIAMOND ASSIGNMENTS
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            &ldquo;{selectedScout.peddieCounterDirectives.coachNazarioDirective}&rdquo;
          </p>
          <div className="text-xs text-amber-300 font-semibold bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-white">Diamond Midfield Role: </span>
            {selectedScout.peddieCounterDirectives.diamondKeyAssignment}
          </div>

          <div className="text-xs font-bold text-white mt-3">1-on-1 Critical Player Matchups:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {tacticalPlan.keyMatchups.map((km, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex flex-col gap-1">
                <div className="font-bold text-amber-400">{km.ourPlayer}</div>
                <div className="text-[11px] text-slate-400">vs {km.opponentKey}</div>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">{km.edge}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Opponent Player Dossier Modal */}
      {selectedOpponentPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl shadow-amber-950/80 p-6 sm:p-8 space-y-5 text-slate-100">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-mono font-black text-2xl shadow-xl">
                  #{selectedOpponentPlayer.number}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-black text-white">{selectedOpponentPlayer.name}</h2>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-slate-200 border border-slate-700">
                      {selectedOpponentPlayer.position}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      selectedOpponentPlayer.dangerLevel === 'Elite'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : selectedOpponentPlayer.dangerLevel === 'Dangerous'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {selectedOpponentPlayer.dangerLevel} Threat
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {selectedOpponentPlayer.teamName} • {selectedOpponentPlayer.classYear} • Preferred Foot: {selectedOpponentPlayer.dominantFoot || 'Right'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedOpponentPlayer(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tactical Role & Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tactical Role in 2026–2027</span>
                <div className="text-sm font-bold text-amber-300">{selectedOpponentPlayer.tacticalRole}</div>
                <div className="text-xs text-slate-300 mt-1">{selectedOpponentPlayer.traits}</div>
              </div>

              {selectedOpponentPlayer.keyStats && (
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold">Goals</span>
                    <div className="text-lg font-black text-cyan-400 font-mono mt-0.5">{selectedOpponentPlayer.keyStats.goals ?? 0}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold">Assists</span>
                    <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">{selectedOpponentPlayer.keyStats.assists ?? 0}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold">Duels Won</span>
                    <div className="text-lg font-black text-amber-400 font-mono mt-0.5">{selectedOpponentPlayer.keyStats.duelsWonPct ?? 50}%</div>
                  </div>
                </div>
              )}
            </div>

            {/* Veo Film Notes */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1.5">
              <span className="text-[10px] text-cyan-400 uppercase font-extrabold tracking-wider flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" /> 2026–2027 Current Season Veo Film Scouting
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedOpponentPlayer.currentSeasonNotes}
              </p>
            </div>

            {/* Strengths & Vulnerabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Key Player Strengths
                </span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {selectedOpponentPlayer.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/30 space-y-2">
                <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Tactical Flaws to Exploit
                </span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {selectedOpponentPlayer.vulnerabilities.map((v, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Coach George Nazario Matchup Plan */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Coach Nazario Tactical Assignment & Matchup Strategy
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                {selectedOpponentPlayer.peddieMatchupCounter}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
