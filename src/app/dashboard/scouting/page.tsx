'use client';

import React, { useState } from 'react';
import { MAPL_SCOUTING_REPORTS } from '@/lib/soccer-data';
import { SoccerTacticalAgent } from '@/lib/agents/soccer-agents';
import { Compass, Shield, Award, Users, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';

export default function ScoutingPage() {
  const [selectedOpponent, setSelectedOpponent] = useState<string>('Blair Academy');

  const report = MAPL_SCOUTING_REPORTS[selectedOpponent] || MAPL_SCOUTING_REPORTS['Blair Academy'];
  const tacticalPlan = SoccerTacticalAgent.generateTacticalPlan(selectedOpponent);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-5 border border-cyan-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase">
            MAPL CONFERENCE OPPONENT SCOUTING
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-slate-400 text-xs">AI Game Plans & Matchup Edges</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          Opponent Tendencies & Win Probability Engine
        </h1>
        <p className="text-xs text-slate-300 mt-0.5">
          Detailed tactical dossiers for Mid-Atlantic Prep League rivals (Blair, Lawrenceville, Hun).
        </p>
      </div>

      {/* Opponent Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
        {Object.keys(MAPL_SCOUTING_REPORTS).map(opp => (
          <button
            key={opp}
            onClick={() => setSelectedOpponent(opp)}
            className={`px-4 py-2 rounded-xl transition ${
              selectedOpponent === opp
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {opp}
          </button>
        ))}
      </div>

      {/* Main Scouting Dossier Card */}
      <div className="glass-panel p-6 border border-amber-500/30 flex flex-col gap-6">
        {/* Opponent Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase font-bold">
              {report.conference} CONFERENCE SCOUT REPORT
            </div>
            <h2 className="text-xl font-black text-white">{report.opponent}</h2>
            <div className="text-xs text-slate-400 mt-0.5">
              Primary System: <strong className="text-cyan-400 font-mono">{report.formation}</strong> • Head Coach: {report.headCoach}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">WIN PROBABILITY</div>
              <div className="text-xl font-mono font-black text-emerald-400">{report.winProbabilityPct}%</div>
            </div>
            <Award className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        {/* Tendencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Buildup & Progression Style
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{report.tendencies.buildup}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Defensive Block Organization
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{report.tendencies.defensiveBlock}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Opponent Vulnerability Zone
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{report.tendencies.vulnerabilityZone}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Set-Piece Threat Profile
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{report.tendencies.setPieceThreat}</p>
          </div>
        </div>

        {/* AI Tactical Directive & Matchup Edges */}
        <div className="p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs">
            <Sparkles className="w-4 h-4" /> AI COACH DIRECTIVE: {tacticalPlan.headline}
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">{tacticalPlan.systemSummary}</p>

          <div className="text-xs font-bold text-white mt-2">1-on-1 Critical Player Matchups:</div>
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
    </div>
  );
}
