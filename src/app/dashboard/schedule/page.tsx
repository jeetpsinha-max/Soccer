'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PEDDIE_SCHEDULE_2026_2027, 
  OPPONENT_VEO_SCOUTING,
  MATCH_EVENTS_VEO_HAVERFORD
} from '@/lib/soccer-data';
import { MatchFixture, VeoTeamScout } from '@/lib/types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Video, 
  Compass, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ChevronRight, 
  Filter, 
  Sparkles, 
  Target, 
  X,
  PlayCircle,
  Eye,
  Crosshair,
  TrendingUp,
  Layers,
  Flame
} from 'lucide-react';

type FilterType = 'all' | 'upcoming' | 'completed' | 'mapl' | 'home' | 'away';

function getWinExpectancyStyle(pct: number) {
  if (pct < 35) {
    return {
      textColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      barGradient: 'from-rose-600 to-rose-400',
      label: 'Underdog'
    };
  }
  if (pct < 50) {
    return {
      textColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      barGradient: 'from-amber-600 to-amber-400',
      label: 'Slight Underdog'
    };
  }
  if (pct <= 55) {
    return {
      textColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      barGradient: 'from-cyan-600 to-cyan-400',
      label: 'Even Match'
    };
  }
  if (pct < 70) {
    return {
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      barGradient: 'from-emerald-500 to-cyan-400',
      label: 'Competitive Favorite'
    };
  }
  return {
    textColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    barGradient: 'from-emerald-500 to-teal-400',
    label: 'Projected Favorite'
  };
}

export default function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedScoutKey, setSelectedScoutKey] = useState<string | null>(null);

  // Filter logic
  const filteredMatches = PEDDIE_SCHEDULE_2026_2027.filter(match => {
    if (activeFilter === 'upcoming') return match.status === 'Upcoming';
    if (activeFilter === 'completed') return match.status === 'Completed';
    if (activeFilter === 'mapl') return match.isConference;
    if (activeFilter === 'home') return match.isHome;
    if (activeFilter === 'away') return !match.isHome;
    return true;
  });

  const nextUpcomingMatch = PEDDIE_SCHEDULE_2026_2027.find(m => m.status === 'Upcoming');
  const activeScoutDossier: VeoTeamScout | undefined = selectedScoutKey 
    ? OPPONENT_VEO_SCOUTING[selectedScoutKey]
    : undefined;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner / Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-[#001f3f] to-slate-900 border border-cyan-500/30 p-6 lg:p-8 shadow-2xl shadow-cyan-950/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30 shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                MaxPreps & Peddie Athletics Official Sync
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                2026–2027 Varsity Calendar (17 Matches)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Upcoming Varsity Boys Schedule
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Complete official fixture calendar cross-referenced with Veo AI Tactical Film scouting. Click <span className="text-amber-400 font-semibold">"Veo Film Scout"</span> on any opponent to access live AI clips, key playmakers, and Coach Nazario&apos;s 4-4-2 diamond counter-directives.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-inner">
            <div className="text-center px-3 border-r border-slate-700">
              <div className="text-2xl font-black text-white">17</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Fixtures</div>
            </div>
            <div className="text-center px-3 border-r border-slate-700">
              <div className="text-2xl font-black text-emerald-400">9</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Home</div>
            </div>
            <div className="text-center px-3 border-r border-slate-700">
              <div className="text-2xl font-black text-blue-400">8</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Away</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-amber-400">5</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">MAPL</div>
            </div>
          </div>
        </div>

        {/* Next Match Spotlight Alert */}
        {nextUpcomingMatch && (
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 animate-pulse">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Next Match Up</div>
                <div className="text-white font-extrabold text-base flex items-center gap-2">
                  vs. {nextUpcomingMatch.opponent}
                  <span className="text-xs font-normal text-slate-400">({nextUpcomingMatch.matchDate} • {nextUpcomingMatch.gameTime})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {nextUpcomingMatch.scoutingReportId && (
                <button
                  onClick={() => setSelectedScoutKey(nextUpcomingMatch.scoutingReportId || null)}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs tracking-wider uppercase transition shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Scout {nextUpcomingMatch.opponentLogoText} on Veo
                </button>
              )}
              <Link
                href="/dashboard/call-sheet"
                className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs tracking-wider uppercase transition border border-slate-700 flex items-center gap-1.5"
              >
                Sideline Call Sheet
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Filter Navigation Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-slate-900/60 p-2 rounded-xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 ml-2 mr-1 shrink-0" />
          {[
            { id: 'all', label: 'All Fixtures', count: 17 },
            { id: 'upcoming', label: 'Upcoming', count: 15 },
            { id: 'completed', label: 'Completed', count: 2 },
            { id: 'mapl', label: 'MAPL Rivals', count: 5 },
            { id: 'home', label: 'Home Matches', count: 9 },
            { id: 'away', label: 'Away Trips', count: 8 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as FilterType)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === tab.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-medium px-2">
          Showing <span className="font-bold text-white">{filteredMatches.length}</span> matches
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMatches.map((match, index) => {
          const scoutDossier = match.scoutingReportId ? OPPONENT_VEO_SCOUTING[match.scoutingReportId] : null;
          const isNextMatch = match.id === 'm-1';

          return (
            <div
              key={match.id}
              className={`relative rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                isNextMatch
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/50 shadow-xl shadow-amber-500/10'
                  : 'bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 shadow-lg'
              }`}
            >
              {/* Top Accent bar */}
              <div className={`h-1.5 w-full ${
                match.status === 'Completed'
                  ? 'bg-slate-600'
                  : match.isConference
                  ? 'bg-amber-400'
                  : 'bg-cyan-500'
              }`} />

              <div className="p-5 space-y-4 flex-1">
                {/* Header row: Match date & badges */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white tracking-wide">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {match.matchDate}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mt-0.5">
                      <Clock className="w-3 h-3" />
                      {match.gameTime || 'TBD'}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      match.isHome 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}>
                      {match.isHome ? 'HOME' : 'AWAY'}
                    </span>

                    {match.isConference && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30">
                        MAPL RIVAL
                      </span>
                    )}
                  </div>
                </div>

                {/* Rivalry or Special Match Banner */}
                {match.rivalryName && (
                  <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500/15 to-transparent border-l-2 border-amber-400 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{match.rivalryName}</span>
                  </div>
                )}

                {/* Opponent Card */}
                <div className="flex items-center gap-3.5 py-1">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-white font-black text-base shadow-inner shrink-0 group-hover:border-cyan-400/40 transition">
                    {match.opponentLogoText}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-black text-base truncate group-hover:text-cyan-300 transition">
                      {match.opponent}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{match.location}</span>
                    </div>
                  </div>
                </div>

                {/* Status / Score or Scouting Status */}
                <div className="pt-2 border-t border-slate-800/80">
                  {match.status === 'Completed' ? (
                    <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Final Score</div>
                        <div className={`text-sm font-black flex items-center gap-1.5 ${
                          (match.peddieScore ?? 0) > (match.opponentScore ?? 0) ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          <span>Peddie {match.peddieScore} - {match.opponentScore} {match.opponentLogoText}</span>
                          {(match.peddieScore ?? 0) > (match.opponentScore ?? 0) && (
                            <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                              WIN
                            </span>
                          )}
                        </div>
                      </div>
                      {match.videoUrl ? (
                        <Link
                          href={`/dashboard/match-film?match=${match.id}`}
                          className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1 transition"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          Watch Film
                        </Link>
                      ) : (
                        <Link
                          href={`/dashboard/match-film?match=${match.id}`}
                          className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1 transition"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          Scout Reel
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Threat Rating:</span>
                        <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] uppercase ${
                          scoutDossier?.threatLevel === 'Critical'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : scoutDossier?.threatLevel === 'High'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {scoutDossier?.threatLevel || 'Medium'} Threat
                        </span>
                      </div>

                      {scoutDossier && (() => {
                        const style = getWinExpectancyStyle(scoutDossier.winProbabilityPct);
                        return (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-400">Peddie Win Expectancy</span>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${style.badgeBg}`}>
                                  {style.label}
                                </span>
                                <span className={`${style.textColor} font-black`}>{scoutDossier.winProbabilityPct}%</span>
                              </div>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`bg-gradient-to-r ${style.barGradient} h-full rounded-full transition-all`}
                                style={{ width: `${scoutDossier.winProbabilityPct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Match Type Description */}
                <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {match.keySummary}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 pt-0 flex items-center gap-2">
                <Link
                  href={`/dashboard/match-film?match=${match.id}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <PlayCircle className="w-4 h-4" />
                  Watch Match Film
                </Link>
                {match.scoutingReportId && (
                  <button
                    onClick={() => setSelectedScoutKey(match.scoutingReportId || null)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 hover:border-amber-400 font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    title={`Veo Film Scout (${match.opponentLogoText})`}
                  >
                    <Compass className="w-4 h-4" />
                    <span>Scout</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Veo Film Scouting Drawer / Modal */}
      {activeScoutDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 p-6 sm:p-8 space-y-6 text-slate-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-amber-400/50 flex items-center justify-center text-amber-400 font-black text-xl shadow-lg">
                  {activeScoutDossier.logoText}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      Veo AI Film Scouting Dossier
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{activeScoutDossier.conference}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white mt-1">
                    {activeScoutDossier.opponent}
                  </h2>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Head Coach: <span className="text-slate-200 font-semibold">{activeScoutDossier.headCoach}</span> • System: <span className="text-amber-400 font-bold">{activeScoutDossier.primaryFormation}</span> (Alt: {activeScoutDossier.secondaryFormation})
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedScoutKey(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Win Probability & Threat Metric Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {(() => {
                const style = getWinExpectancyStyle(activeScoutDossier.winProbabilityPct);
                return (
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Peddie Win Expectancy</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${style.badgeBg}`}>
                        {style.label}
                      </span>
                    </div>
                    <div className={`text-2xl font-black ${style.textColor} mt-0.5`}>{activeScoutDossier.winProbabilityPct}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${style.barGradient} h-full rounded-full transition-all`}
                        style={{ width: `${activeScoutDossier.winProbabilityPct}%` }}
                      />
                    </div>
                  </div>
                );
              })()}

              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Opponent Threat Rating</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${
                    activeScoutDossier.threatLevel === 'Critical'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : activeScoutDossier.threatLevel === 'High'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {activeScoutDossier.threatLevel} Alert
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Tactical Recommendation</div>
                <div className="text-sm font-black text-amber-400 mt-1">
                  Deploy Peddie 4-4-2 Diamond
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Control central possession pocket</div>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                Veo AI Match Intelligence Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
                {activeScoutDossier.scoutingOverview}
              </p>
            </div>

            {/* Veo AI Curated Film Clips */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-cyan-400" />
                Veo AI Film Breakdown ({activeScoutDossier.veoClips.length} Key Segments Analyzed)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeScoutDossier.veoClips.map((clip, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
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

            {/* Key Opponent Playmakers */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Key Opponent Playmakers & Threats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeScoutDossier.keyPlaymakers.map((player, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-sm flex items-center justify-center shrink-0">
                      #{player.number}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-black text-sm">{player.name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                          {player.position}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 leading-tight">
                        {player.traits}
                      </div>
                      <div>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                          player.dangerLevel === 'Elite'
                            ? 'bg-rose-500/20 text-rose-400'
                            : player.dangerLevel === 'Dangerous'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {player.dangerLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Breakdown 4-quadrant */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                4-Phase Tactical Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">In Possession</div>
                  <div className="text-slate-300 leading-relaxed">{activeScoutDossier.tacticalBreakdown.inPossession}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Out of Possession</div>
                  <div className="text-slate-300 leading-relaxed">{activeScoutDossier.tacticalBreakdown.outOfPossession}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">Transition Flaws & Vulnerabilities</div>
                  <div className="text-slate-300 leading-relaxed">{activeScoutDossier.tacticalBreakdown.transitionFlaws}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">Set Piece Tendencies</div>
                  <div className="text-slate-300 leading-relaxed">{activeScoutDossier.tacticalBreakdown.setPieceTendencies}</div>
                </div>
              </div>
            </div>

            {/* Coach Nazario Counter-Directives */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-amber-400/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                Coach George Nazario Sideline Counter-Directives
              </div>
              <div className="text-sm font-semibold text-white leading-relaxed">
                &ldquo;{activeScoutDossier.peddieCounterDirectives.coachNazarioDirective}&rdquo;
              </div>
              <div className="text-xs text-cyan-300 font-medium pt-1 border-t border-slate-800/80">
                <span className="font-bold text-white">Diamond Midfield Assignment: </span>
                {activeScoutDossier.peddieCounterDirectives.diamondKeyAssignment}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <Link
                href="/dashboard/scouting"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                Open Opponent Scouting Dashboard
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard/match-film"
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 text-xs font-black uppercase tracking-wider transition flex items-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" />
                  Watch Veo Film in Studio
                </Link>
                <button
                  onClick={() => setSelectedScoutKey(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
