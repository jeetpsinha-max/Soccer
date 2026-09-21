'use client';

import React, { useState } from 'react';
import { PEDDIE_ROSTER_2026_2027 } from '@/lib/soccer-data';
import { OPPONENT_PLAYER_SCOUTING_REPORTS, ALL_OPPONENT_PLAYER_REPORTS } from '@/lib/opponent-players-data';
import { Player, Position, OpponentPlayerReport } from '@/lib/types';
import { 
  Users, 
  Search, 
  Award, 
  Activity, 
  TrendingUp, 
  Zap, 
  FileText, 
  GraduationCap,
  Camera,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Crosshair,
  ShieldAlert,
  Video,
  Target,
  AlertTriangle,
  Flame
} from 'lucide-react';

export default function PlayerPortalPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(PEDDIE_ROSTER_2026_2027[0]);
  const [filterPos, setFilterPos] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'DOSSIER' | 'OPPONENT_SCOUTING' | 'GALLERY'>('DOSSIER');
  const [modalPhoto, setModalPhoto] = useState<string | null>(null);

  // Opponent player scouting explorer state
  const [selectedOpponentTeam, setSelectedOpponentTeam] = useState<string>('all');
  const [opponentLineFilter, setOpponentLineFilter] = useState<string>('ALL');
  const [opponentDangerFilter, setOpponentDangerFilter] = useState<string>('ALL');
  const [opponentSearch, setOpponentSearch] = useState<string>('');
  const [inspectedOpponentPlayer, setInspectedOpponentPlayer] = useState<OpponentPlayerReport | null>(null);

  const filteredPlayers = PEDDIE_ROSTER_2026_2027.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.number.toString().includes(searchQuery);
    if (!matchesSearch) return false;
    if (filterPos === 'ALL') return true;
    if (filterPos === 'FWD') return ['ST', 'LW', 'RW'].includes(p.position);
    if (filterPos === 'MID') return ['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(p.position);
    if (filterPos === 'DEF') return ['CB', 'LB', 'RB'].includes(p.position);
    if (filterPos === 'GK') return p.position === 'GK';
    return true;
  });

  const opponentTeamsList = Object.entries(OPPONENT_PLAYER_SCOUTING_REPORTS).map(([key, players]) => ({
    key,
    name: players[0]?.teamName || key,
    count: players.length
  }));

  const filteredOpponentPlayers = ALL_OPPONENT_PLAYER_REPORTS.filter(p => {
    if (selectedOpponentTeam !== 'all' && p.opponentKey !== selectedOpponentTeam) return false;
    if (opponentLineFilter !== 'ALL' && p.line !== opponentLineFilter) return false;
    if (opponentDangerFilter !== 'ALL' && p.dangerLevel !== opponentDangerFilter) return false;
    if (opponentSearch.trim()) {
      const q = opponentSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchNum = p.number.toString().includes(q);
      const matchTeam = p.teamName.toLowerCase().includes(q);
      const matchRole = p.tacticalRole.toLowerCase().includes(q);
      if (!matchName && !matchNum && !matchTeam && !matchRole) return false;
    }
    return true;
  });

  const captains = PEDDIE_ROSTER_2026_2027.filter(p => p.isCaptain);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-5 border border-cyan-500/30">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase tracking-wide">
                OFFICIAL MEDIA DAY & ATHLETE DOSSIERS
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-amber-400 text-xs font-semibold">2026–2027 Varsity Roster</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Peddie Boys Soccer Player Portal & Media Day Matches
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Verified DSLR Media Day photo sessions matched to official roster jerseys, positional assignments, and performance telemetry.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('DOSSIER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'DOSSIER'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Peddie Player Dossiers
            </button>
            <button
              onClick={() => setActiveTab('OPPONENT_SCOUTING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'OPPONENT_SCOUTING'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              Opponent Player Reports ({ALL_OPPONENT_PLAYER_REPORTS.length})
            </button>
            <button
              onClick={() => setActiveTab('GALLERY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'GALLERY'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              Media Day Gallery (24)
            </button>
          </div>
        </div>
      </div>

      {/* Official 4 Captains Showcase Banner */}
      <div className="glass-panel p-5 border border-amber-500/30 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Captains Group Photo */}
          <div 
            onClick={() => setModalPhoto('/media-day-previews/IMG_000641.jpg')}
            className="w-full md:w-80 h-52 rounded-xl overflow-hidden relative cursor-pointer border-2 border-amber-400/80 shadow-2xl group flex-shrink-0"
          >
            <img 
              src="/media-day-previews/IMG_000641.jpg" 
              alt="Peddie 2026-2027 4 Team Captains" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-black text-amber-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Official 2026–2027 Captains (Click to expand)
              </span>
            </div>
          </div>

          {/* Captains Bios & Quick Navigation */}
          <div className="flex-1 flex flex-col gap-3">
            <div>
              <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-amber-300 font-extrabold text-[10px] uppercase">
                VARSITY LEADERSHIP GROUP
              </span>
              <h2 className="text-lg font-black text-white mt-1">
                The Four Team Captains (2026–2027)
              </h2>
              <p className="text-xs text-slate-300">
                L to R in official portrait: <span className="text-amber-400 font-bold">#14 Rayyaan Mohiuddin</span>, <span className="text-amber-400 font-bold">#13 Christian Tharney</span>, <span className="text-amber-400 font-bold">#12 Noah Eldessouky</span>, and <span className="text-amber-400 font-bold">#28 Tommy Kim</span>.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {captains.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedPlayer(c);
                    setActiveTab('DOSSIER');
                  }}
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-400 cursor-pointer transition flex flex-col gap-1 text-xs"
                >
                  <div className="flex items-center gap-2">
                    {c.photoUrl ? (
                      <img 
                        src={c.photoUrl} 
                        alt={c.name} 
                        className="w-7 h-7 rounded-full object-cover border border-amber-400"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#002147] border border-amber-400 text-amber-300 font-black text-xs flex items-center justify-center">
                        {c.number}
                      </div>
                    )}
                    <span className="font-extrabold text-white text-[11px] truncate">{c.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    #{c.number} • {c.position}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: ATHLETE DOSSIER VIEW */}
      {activeTab === 'DOSSIER' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Player Search & Roster Cards */}
          <div className="flex flex-col gap-3">
            {/* Search & Filter Bar */}
            <div className="glass-panel p-3 flex flex-col gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search athlete or #..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Position Filter Buttons */}
              <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-bold">
                {['ALL', 'FWD', 'MID', 'DEF', 'GK'].map(pos => (
                  <button
                    key={pos}
                    onClick={() => setFilterPos(pos)}
                    className={`px-2.5 py-1 rounded transition whitespace-nowrap ${
                      filterPos === pos ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Roster Scroll List */}
            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
              {filteredPlayers.map(p => {
                const isSelected = selectedPlayer.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlayer(p)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {p.photoUrl ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-amber-400/80 flex-shrink-0">
                          <img 
                            src={p.photoUrl} 
                            alt={p.name} 
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 right-0 bg-slate-950/90 text-amber-300 font-mono font-black text-[9px] px-1 rounded-tl">
                            {p.number}
                          </span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#002147] border border-amber-400 flex items-center justify-center font-black text-amber-300 text-sm shadow flex-shrink-0">
                          {p.number}
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{p.name}</span>
                          {p.isCaptain && (
                            <span className="text-[9px] px-1 rounded bg-amber-400 text-slate-950 font-black">C</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {p.position} • {p.classYear} ({p.gradYear})
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-cyan-400">{p.overallRating} OVR</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">{p.goals}G / {p.assists}A</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Columns: Detailed Athlete Dossier */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Athlete Profile Header Card */}
            <div className="glass-panel p-6 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                {selectedPlayer.photoUrl ? (
                  <div 
                    onClick={() => setModalPhoto(selectedPlayer.actionPhotoUrl || selectedPlayer.photoUrl || null)}
                    className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl flex-shrink-0 cursor-pointer relative group"
                  >
                    <img 
                      src={selectedPlayer.photoUrl} 
                      alt={selectedPlayer.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#002147] to-[#001226] border-2 border-amber-400 flex items-center justify-center text-amber-300 font-black text-2xl shadow-xl shadow-black flex-shrink-0">
                    {selectedPlayer.number}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-black text-white">{selectedPlayer.name}</h2>
                    {selectedPlayer.isCaptain && (
                      <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                        TEAM CAPTAIN
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      {selectedPlayer.position}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[10px] font-bold">
                      #{selectedPlayer.number}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {selectedPlayer.classYear} • Class of {selectedPlayer.gradYear} • {selectedPlayer.hometown}
                  </div>
                  <div className="text-xs text-slate-400">
                    Height: {selectedPlayer.height} • Weight: {selectedPlayer.weight}
                  </div>
                </div>
                  {/* Media Picture 2 Quick Preview */}
              {(selectedPlayer.photoUrl2 || selectedPlayer.actionPhotoUrl) && (
                <div 
                  onClick={() => setModalPhoto(selectedPlayer.photoUrl2 || selectedPlayer.actionPhotoUrl || null)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 cursor-pointer transition text-xs text-cyan-300"
                >
                  <img 
                    src={selectedPlayer.photoUrl2 || selectedPlayer.actionPhotoUrl} 
                    alt={`${selectedPlayer.name} Media Day 2`} 
                    className="w-12 h-12 rounded-lg object-cover border border-cyan-400/50"
                  />
                  <div className="text-[11px] font-bold">
                    <span>Media Picture 2</span>
                    <div className="text-[9px] text-slate-400">Click to view</div>
                  </div>
                </div>
              )}
              </div>

              {/* Overall Scout Rating Meter */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">SCOUT GRADE</div>
                  <div className="text-lg font-black text-amber-400 font-mono">{selectedPlayer.overallRating} / 100</div>
                </div>
                <Award className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            {/* Performance Radar & Athlete Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="glass-panel p-5 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pass Completion</span>
                <span className="text-2xl font-black font-mono text-cyan-400 mt-1">{selectedPlayer.passCompletionPct}%</span>
                <span className="text-[10px] text-slate-500">Distribution Accuracy</span>
              </div>
              <div className="glass-panel p-5 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tackle Success</span>
                <span className="text-2xl font-black font-mono text-emerald-400 mt-1">{selectedPlayer.tackleSuccessPct}%</span>
                <span className="text-[10px] text-slate-500">Ground & Aerial Duels</span>
              </div>
              <div className="glass-panel p-5 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Velocity</span>
                <span className="text-lg font-black font-mono text-amber-400 mt-1">{selectedPlayer.topSpeedMph || (selectedPlayer.topSpeedKmh ? Number((selectedPlayer.topSpeedKmh * 0.621371).toFixed(1)) : 20.5)} <span className="text-xs font-normal">mph</span></span>
                <span className="text-[10px] text-slate-500">{selectedPlayer.distanceCoveredMiles || (selectedPlayer.distanceCoveredKm ? Number((selectedPlayer.distanceCoveredKm * 0.621371).toFixed(1)) : 14.0)} miles Run</span>
              </div>
            </div>

            {/* 2026-2027 CURRENT SEASON COMPREHENSIVE REPORT */}
            {selectedPlayer.currentSeasonReport && (
              <div className="glass-panel p-5 border border-cyan-500/40 bg-slate-950/80 flex flex-col gap-4 shadow-xl shadow-cyan-950/20">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wide">
                      <Target className="w-4 h-4 text-cyan-400" />
                      2026–2027 Current Season Scouting & Match Review Report
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-black">
                      {selectedPlayer.currentSeasonReport.formRating}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold">
                      Match 1: Aquinas 3-2 Win
                    </span>
                  </div>
                </div>

                {/* Season Tactical Role */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                  <Flame className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase font-mono font-bold text-amber-400">Current Season Tactical Role</div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {selectedPlayer.currentSeasonReport.seasonRole}
                    </div>
                  </div>
                </div>

                {/* Match 0 Review, Match 1 Aquinas Review & Upcoming Match 2 Assignment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Match 0 */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 font-bold uppercase">
                      <Activity className="w-3.5 h-3.5 text-slate-400" />
                      Match 0 (Haverford Scrimmage)
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {selectedPlayer.currentSeasonReport.match0Review}
                    </p>
                  </div>

                  {/* Match 1 (Aquinas 3-2 Win) */}
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-black uppercase">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Match 1 (Aquinas 3-2 Win)
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      {selectedPlayer.currentSeasonReport.match1Review}
                    </p>
                  </div>

                  {/* Upcoming Match 2 Assignment */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/40 flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-black uppercase">
                      <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                      Next Match: @ Trenton Catholic
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      {selectedPlayer.currentSeasonReport.upcomingMatchAssignment}
                    </p>
                  </div>
                </div>

                {/* Strengths & Priorities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> 2026–2027 Key Strengths
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {selectedPlayer.currentSeasonReport.technicalStrengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-amber-400 mb-1.5 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> Development Priorities
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {selectedPlayer.currentSeasonReport.developmentPriorities.map((pri, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{pri}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Coach Nazario Evaluation & Veo Film Insight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col gap-1 text-xs">
                    <div className="text-[10px] uppercase font-mono font-black text-amber-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-amber-400" /> Head Coach George Nazario Assessment
                    </div>
                    <blockquote className="text-[11px] text-slate-200 italic leading-relaxed pt-1">
                      "{selectedPlayer.currentSeasonReport.coachNazarioEvaluation}"
                    </blockquote>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col gap-1 text-xs">
                    <div className="text-[10px] uppercase font-mono font-black text-cyan-400 flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-cyan-400" /> Veo AI Camera Tracking & Film Insight
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                      {selectedPlayer.currentSeasonReport.veoFilmInsight}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Media Day Photography Showcase for Selected Player */}
            <div className="glass-panel p-5 border border-amber-500/20 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-400" /> Official Media Day Photography (2 Pictures)
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">2026–2027 Season Media Pack</span>
              </div>

              {selectedPlayer.photoUrl || selectedPlayer.photoUrl2 || selectedPlayer.actionPhotoUrl ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Media Day Picture 1 */}
                  {selectedPlayer.photoUrl && (
                    <div 
                      onClick={() => setModalPhoto(selectedPlayer.photoUrl || null)}
                      className="relative group rounded-xl overflow-hidden border border-amber-400/50 cursor-pointer aspect-[4/3] bg-slate-900 shadow-lg"
                    >
                      <img 
                        src={selectedPlayer.photoUrl} 
                        alt={`${selectedPlayer.name} Media Day Picture 1`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end justify-between p-3">
                        <div>
                          <span className="text-[9px] font-mono text-amber-300 uppercase font-bold tracking-wider">MEDIA DAY PICTURE 1</span>
                          <div className="text-xs font-black text-white">#{selectedPlayer.number} {selectedPlayer.name}</div>
                        </div>
                        <span className="text-[10px] text-cyan-300 font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-400/40">
                          Click to Expand
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Media Day Picture 2 */}
                  {(selectedPlayer.photoUrl2 || selectedPlayer.actionPhotoUrl) && (
                    <div 
                      onClick={() => setModalPhoto(selectedPlayer.photoUrl2 || selectedPlayer.actionPhotoUrl || null)}
                      className="relative group rounded-xl overflow-hidden border border-cyan-400/50 cursor-pointer aspect-[4/3] bg-slate-900 shadow-lg"
                    >
                      <img 
                        src={selectedPlayer.photoUrl2 || selectedPlayer.actionPhotoUrl} 
                        alt={`${selectedPlayer.name} Media Day Picture 2`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end justify-between p-3">
                        <div>
                          <span className="text-[9px] font-mono text-cyan-300 uppercase font-bold tracking-wider">MEDIA DAY PICTURE 2</span>
                          <div className="text-xs font-black text-white">Portrait Pose 2</div>
                        </div>
                        <span className="text-[10px] text-amber-300 font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-amber-400/40">
                          Click to Expand
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-black text-lg">
                    #{selectedPlayer.number}
                  </div>
                  <div className="text-sm font-black text-white">No Media Day Portraits On File</div>
                  <p className="text-xs text-slate-400 max-w-md">
                    {selectedPlayer.name} does not have media day pictures on record (excused for student council leadership / academic commitments). Jersey badge #{selectedPlayer.number} active across all match call sheets and tactical boards.
                  </p>
                </div>
              )}
            </div>

            {/* Coach Assignment Scorecard & Film Notes */}
            <div className="glass-panel p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" /> Coach Tactical Assignment Scorecards (+ / - / 0)
                </h3>
                <span className="text-[10px] font-mono text-slate-400 font-bold">George Nazario Coaching Staff</span>
              </div>

              {selectedPlayer.assignmentHistory.length > 0 ? (
                <div className="space-y-2">
                  {selectedPlayer.assignmentHistory.map((rec, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{rec.match}</span>
                        <span className={`font-mono font-black px-2 py-0.5 rounded text-xs ${
                          rec.grade === '+' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                          rec.grade === '0' ? 'bg-slate-800 text-slate-300' : 'bg-red-500/20 text-red-400'
                        }`}>
                          GRADE: {rec.grade}
                        </span>
                      </div>
                      <div className="text-[11px] text-cyan-400 font-semibold">
                        Assignment: {rec.assignment}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Notes: {rec.notes}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 italic">
                  No formal match assignment grading notes recorded yet for this athlete.
                </div>
              )}
            </div>

            {/* College Recruitment Dossier */}
            <div className="glass-panel p-5 flex flex-col gap-2 border border-emerald-500/20">
              <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> College Recruitment Profile & Scout Evaluation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedPlayer.recruitmentNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OPPONENT PLAYER SCOUTING REPORTS DATABASE */}
      {activeTab === 'OPPONENT_SCOUTING' && (
        <div className="flex flex-col gap-5">
          {/* Header & Stats Banner */}
          <div className="glass-panel p-5 border border-rose-500/30 bg-slate-950/80">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-extrabold text-[11px] uppercase tracking-wide">
                    OPPONENT PLAYER DOSSIERS • 2026–2027
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-amber-400 text-xs font-semibold">17 Scheduled Teams</span>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Upcoming Opponent Player Scouting Reports & Matchup Counters
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Detailed individual reports covering all key threats, dangerous attackers, midfield playmakers, and goalkeepers across the 2026–2027 varsity schedule.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">SCOUTED ATHLETES</div>
                  <div className="text-lg font-black text-rose-400 font-mono">{ALL_OPPONENT_PLAYER_REPORTS.length} Players</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">OPPONENTS</div>
                  <div className="text-lg font-black text-amber-400 font-mono">17 Teams</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filtering Bar */}
          <div className="glass-panel p-4 flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Search Bar */}
              <div className="relative md:col-span-1">
                <input
                  type="text"
                  placeholder="Search opponent player, #, team, or trait..."
                  value={opponentSearch}
                  onChange={e => setOpponentSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-400"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Team Selector */}
              <div className="md:col-span-1">
                <select
                  value={selectedOpponentTeam}
                  onChange={e => setSelectedOpponentTeam(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                >
                  <option value="all">All 17 Opponent Teams ({ALL_OPPONENT_PLAYER_REPORTS.length} players)</option>
                  {opponentTeamsList.map(t => (
                    <option key={t.key} value={t.key}>
                      {t.name} ({t.count} scouted)
                    </option>
                  ))}
                </select>
              </div>

              {/* Danger Level Filter */}
              <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-bold">
                {['ALL', 'Elite', 'Dangerous', 'Key Threat', 'Tactical Pivot'].map(d => (
                  <button
                    key={d}
                    onClick={() => setOpponentDangerFilter(d)}
                    className={`px-2.5 py-1.5 rounded transition whitespace-nowrap ${
                      opponentDangerFilter === d
                        ? 'bg-rose-500 text-white font-black'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold border-t border-slate-800/80 pt-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Position Line:</span>
              {['ALL', 'FWD', 'MID', 'DEF', 'GK'].map(line => (
                <button
                  key={line}
                  onClick={() => setOpponentLineFilter(line)}
                  className={`px-3 py-1 rounded transition whitespace-nowrap ${
                    opponentLineFilter === line
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {line === 'ALL' ? 'All Lines' : line}
                </button>
              ))}
              <span className="ml-auto text-xs font-mono text-slate-400">
                Showing {filteredOpponentPlayers.length} of {ALL_OPPONENT_PLAYER_REPORTS.length}
              </span>
            </div>
          </div>

          {/* Opponent Player Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOpponentPlayers.map(p => {
              const dangerColors = 
                p.dangerLevel === 'Elite' 
                  ? 'border-rose-500/60 bg-rose-950/20 text-rose-300' 
                  : p.dangerLevel === 'Dangerous'
                  ? 'border-amber-500/60 bg-amber-950/20 text-amber-300'
                  : p.dangerLevel === 'Key Threat'
                  ? 'border-purple-500/60 bg-purple-950/20 text-purple-300'
                  : 'border-cyan-500/60 bg-cyan-950/20 text-cyan-300';

              return (
                <div
                  key={p.id}
                  className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-rose-500/80 transition flex flex-col justify-between gap-3 group"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-rose-400 text-base shadow">
                          #{p.number}
                        </div>
                        <div>
                          <div className="text-sm font-black text-white group-hover:text-rose-300 transition">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {p.position} ({p.line}) • {p.teamName}
                          </div>
                        </div>
                      </div>

                      {/* Danger Badge */}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase tracking-wider ${dangerColors}`}>
                        {p.dangerLevel}
                      </span>
                    </div>

                    {/* Vitals & Role */}
                    <div className="mt-2.5 p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] flex flex-col gap-1">
                      <div className="text-slate-300">
                        <span className="text-slate-500 font-mono">Role:</span> <span className="text-white font-bold">{p.tacticalRole}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 font-mono">
                        <span>{p.classYear}</span>
                        <span>•</span>
                        <span>{p.height}</span>
                        <span>•</span>
                        <span>{p.dominantFoot} Foot</span>
                      </div>
                    </div>

                    {/* Stats Pill */}
                    {p.keyStats && (
                      <div className="mt-2 flex items-center gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold">
                          {p.keyStats.goals}G / {p.keyStats.assists}A
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold">
                          {p.keyStats.duelsWonPct}% Duels
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-bold">
                          {p.keyStats.savesOrTackles}
                        </span>
                      </div>
                    )}

                    {/* 2026-2027 Veo Scouting Note */}
                    <div className="mt-2.5 text-xs text-slate-300">
                      <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase flex items-center gap-1 mb-0.5">
                        <Video className="w-3 h-3 text-cyan-400" /> 2026–2027 Veo Film Note:
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2">
                        {p.currentSeasonNotes}
                      </p>
                    </div>

                    {/* Counter Plan */}
                    <div className="mt-2.5 p-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-[11px]">
                      <div className="text-[10px] font-mono text-rose-400 font-bold uppercase flex items-center gap-1 mb-0.5">
                        <Crosshair className="w-3 h-3 text-rose-400" /> Peddie Counter:
                      </div>
                      <p className="text-[11px] text-rose-200 line-clamp-2">
                        {p.peddieMatchupCounter}
                      </p>
                    </div>
                  </div>

                  {/* Open Dossier Button */}
                  <button
                    onClick={() => setInspectedOpponentPlayer(p)}
                    className="w-full mt-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-400 text-xs font-bold text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5"
                  >
                    <span>View Complete Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: FULL MEDIA DAY PHOTO GALLERY */}
      {activeTab === 'GALLERY' && (
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-4 flex items-center justify-between">
            <div className="text-xs text-slate-300">
              Click any photo to inspect high-resolution portrait or view athlete dossier.
            </div>
            <div className="text-xs font-mono text-amber-400 font-bold">
              {PEDDIE_ROSTER_2026_2027.filter(p => p.photoUrl).length} Official Photos Matched
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {PEDDIE_ROSTER_2026_2027.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPlayer(p);
                  setActiveTab('DOSSIER');
                }}
                className="glass-panel p-3 rounded-xl border border-slate-800 hover:border-amber-400 cursor-pointer transition flex flex-col gap-2 group"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-900 relative">
                  {p.photoUrl ? (
                    <img 
                      src={p.photoUrl} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-amber-400 text-2xl bg-[#002147]">
                      #{p.number}
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-[#002147] border border-amber-400 text-amber-300 font-mono font-black text-xs px-1.5 py-0.5 rounded shadow">
                    #{p.number}
                  </span>
                  {p.isCaptain && (
                    <span className="absolute top-2 right-2 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow uppercase">
                      Captain
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 transition truncate">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {p.position} • {p.classYear}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Photo Modal */}
      {modalPhoto && (
        <div 
          onClick={() => setModalPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-amber-400 shadow-2xl">
            <img 
              src={modalPhoto} 
              alt="Expanded Photo" 
              className="w-full h-full object-contain"
            />
            <button 
              onClick={() => setModalPhoto(null)}
              className="absolute top-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-bold border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Opponent Player Detailed Dossier Modal */}
      {inspectedOpponentPlayer && (
        <div 
          onClick={() => setInspectedOpponentPlayer(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-slate-950 border border-rose-500/50 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col gap-4 text-xs"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-rose-400 text-xl shadow">
                  #{inspectedOpponentPlayer.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{inspectedOpponentPlayer.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {inspectedOpponentPlayer.dangerLevel}
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {inspectedOpponentPlayer.position} ({inspectedOpponentPlayer.line}) • {inspectedOpponentPlayer.teamName}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setInspectedOpponentPlayer(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800 font-bold px-3 py-1 text-xs"
              >
                Close
              </button>
            </div>

            {/* Vitals & Tactical Role */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-1">
              <div className="text-slate-300">
                <span className="text-slate-500 font-mono">Tactical Role:</span>{' '}
                <span className="text-white font-bold">{inspectedOpponentPlayer.tacticalRole}</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                <span>Class: {inspectedOpponentPlayer.classYear}</span>
                <span>•</span>
                <span>Height: {inspectedOpponentPlayer.height}</span>
                <span>•</span>
                <span>Foot: {inspectedOpponentPlayer.dominantFoot}</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                <span className="text-slate-500 font-mono">Key Traits:</span> {inspectedOpponentPlayer.traits}
              </div>
            </div>

            {/* Stats Row */}
            {inspectedOpponentPlayer.keyStats && (
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Goals / Assists</div>
                  <div className="text-sm font-black font-mono text-emerald-400 mt-0.5">
                    {inspectedOpponentPlayer.keyStats.goals}G / {inspectedOpponentPlayer.keyStats.assists}A
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Duels Won %</div>
                  <div className="text-sm font-black font-mono text-cyan-400 mt-0.5">
                    {inspectedOpponentPlayer.keyStats.duelsWonPct}%
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Def / GK Stats</div>
                  <div className="text-sm font-black font-mono text-amber-400 mt-0.5">
                    {inspectedOpponentPlayer.keyStats.savesOrTackles}
                  </div>
                </div>
              </div>
            )}

            {/* Strengths & Vulnerabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/30">
                <div className="text-[10px] font-mono uppercase font-black text-emerald-400 mb-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Scouted Strengths
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  {inspectedOpponentPlayer.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-rose-500/30">
                <div className="text-[10px] font-mono uppercase font-black text-rose-400 mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Tactical Vulnerabilities (Exploit)
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  {inspectedOpponentPlayer.vulnerabilities.map((vuln, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{vuln}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2026-2027 Veo Film Note */}
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/40">
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase flex items-center gap-1 mb-1">
                <Video className="w-3.5 h-3.5 text-cyan-400" /> 2026–2027 Veo Camera Tracking Note
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                {inspectedOpponentPlayer.currentSeasonNotes}
              </p>
            </div>

            {/* Coach Nazario Peddie Matchup Counter */}
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40">
              <div className="text-[10px] font-mono text-rose-400 font-black uppercase flex items-center gap-1 mb-1">
                <Crosshair className="w-3.5 h-3.5 text-rose-400" /> Coach George Nazario Matchup Counter Directives
              </div>
              <p className="text-[11px] text-rose-200 leading-relaxed font-semibold">
                {inspectedOpponentPlayer.peddieMatchupCounter}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

