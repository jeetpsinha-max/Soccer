'use client';

import React, { useState } from 'react';
import { PEDDIE_ROSTER_2026_2027 } from '@/lib/soccer-data';
import { Player, Position } from '@/lib/types';
import { 
  Users, 
  Search, 
  Award, 
  Activity, 
  TrendingUp, 
  Zap, 
  FileText, 
  GraduationCap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function PlayerPortalPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(PEDDIE_ROSTER_2026_2027[0]);
  const [filterPos, setFilterPos] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPlayers = PEDDIE_ROSTER_2026_2027.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.number.toString().includes(searchQuery);
    if (!matchesSearch) return false;
    if (filterPos === 'ALL') return true;
    if (filterPos === 'FWD') return ['ST', 'LW', 'RW'].includes(p.position);
    if (filterPos === 'MID') return ['CDM', 'CM', 'CAM'].includes(p.position);
    if (filterPos === 'DEF') return ['CB', 'LB', 'RB'].includes(p.position);
    if (filterPos === 'GK') return p.position === 'GK';
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-5 border border-cyan-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase">
            ATHLETE INTELLIGENCE & RECRUITING DOSSIER
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-slate-400 text-xs">24-Player Varsity Roster</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          Peddie Varsity Soccer Player Portal (2026–2027)
        </h1>
        <p className="text-xs text-slate-300 mt-0.5">
          Coach assignment scorecards ($+ / - / 0$), biometrics, GPS top speed, expected goals ($xG$), and college recruitment dossiers.
        </p>
      </div>

      {/* Main Grid: Roster List (Left) + Player Detail (Right) */}
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
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border-amber-400 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#002147] border border-amber-400 flex items-center justify-center font-black text-amber-300 text-sm shadow">
                      {p.number}
                    </div>
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
          <div className="glass-panel p-6 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#002147] to-[#001226] border-2 border-amber-400 flex items-center justify-center text-amber-300 font-black text-2xl shadow-xl shadow-black">
                {selectedPlayer.number}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white">{selectedPlayer.name}</h2>
                  {selectedPlayer.isCaptain && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                      TEAM CAPTAIN
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    {selectedPlayer.position}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {selectedPlayer.classYear} • Class of {selectedPlayer.gradYear} • {selectedPlayer.hometown}
                </div>
                <div className="text-xs text-slate-400">
                  Height: {selectedPlayer.height} • Weight: {selectedPlayer.weight}
                </div>
              </div>
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

          {/* Performance Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">MINUTES PLAYED</span>
              <span className="text-lg font-black font-mono text-white mt-1">{selectedPlayer.minutesPlayed}</span>
              <span className="text-[10px] text-slate-500">{selectedPlayer.matchesPlayed} Matches</span>
            </div>

            <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">GOALS / ASSISTS</span>
              <span className="text-lg font-black font-mono text-emerald-400 mt-1">
                {selectedPlayer.goals} <span className="text-xs text-slate-400 font-normal">G</span> / {selectedPlayer.assists} <span className="text-xs text-slate-400 font-normal">A</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">xG: {selectedPlayer.expectedGoals.toFixed(1)}</span>
            </div>

            <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">PASS COMPLETION</span>
              <span className="text-lg font-black font-mono text-cyan-400 mt-1">{selectedPlayer.passCompletionPct}%</span>
              <span className="text-[10px] text-slate-500 font-mono">Tackle: {selectedPlayer.tackleSuccessPct}%</span>
            </div>

            <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">TOP SPRINT SPEED</span>
              <span className="text-lg font-black font-mono text-amber-400 mt-1">{selectedPlayer.topSpeedKmh} <span className="text-xs font-normal">km/h</span></span>
              <span className="text-[10px] text-slate-500">{selectedPlayer.distanceCoveredKm} km Run</span>
            </div>
          </div>

          {/* Coach Assignment Scorecard & Film Notes */}
          <div className="glass-panel p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Coach Tactical Assignment Scorecards (+ / - / 0)
              </h3>
              <span className="text-[10px] font-mono text-slate-400 font-bold">MAPL Coaching Staff</span>
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
    </div>
  );
}
