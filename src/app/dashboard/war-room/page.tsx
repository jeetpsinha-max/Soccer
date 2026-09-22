'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  SoccerTacticalAgent, 
  TacticalDebateSession, 
  AgentPersonaId 
} from '@/lib/agents/soccer-agents';
import { OPPONENT_VEO_SCOUTING, PEDDIE_SCHEDULE_2026_2027 } from '@/lib/soccer-data';
import { 
  Shield, 
  Sparkles, 
  Zap, 
  Target, 
  Swords, 
  Users, 
  Activity, 
  Compass, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  MessageSquare,
  Bot,
  Brain,
  Sliders,
  ChevronRight,
  RefreshCw,
  Award
} from 'lucide-react';

export default function TacticalWarRoomPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('blair-low-block');
  const [customOpponent, setCustomOpponent] = useState<string>('Blair Academy');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [activeTabAgent, setActiveTabAgent] = useState<'ALL' | AgentPersonaId>('ALL');
  const [isDebating, setIsDebating] = useState<boolean>(false);

  const debateSession: TacticalDebateSession = SoccerTacticalAgent.getCouncilDebate(
    selectedScenarioId,
    customOpponent,
    customPrompt
  );

  const handleTriggerDebate = (scenarioKey: string) => {
    setIsDebating(true);
    setSelectedScenarioId(scenarioKey);
    setTimeout(() => {
      setIsDebating(false);
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    setIsDebating(true);
    setSelectedScenarioId('custom-' + Date.now());
    setTimeout(() => {
      setIsDebating(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="glass-panel p-6 border border-amber-500/30 rounded-2xl bg-gradient-to-r from-slate-950 via-[#001830] to-[#000d1a] shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-500/40 text-amber-300 font-black text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              MULTI-AGENT TACTICAL WAR ROOM
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 text-xs font-bold tracking-wide">4 Elite AI Minds</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Active Council: Fable 5 • Grok • GPT • Kimi</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight relative z-10">
          Autonomous Sideline War Room & Tactical Debate
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed relative z-10">
          Simulating real-time high-stakes tactical debate among four distinct AI architectures to solve Coach George Nazario&apos;s toughest in-game dilemmas. Compare contrasting philosophies, pressure triggers, and synthesized consensus directives.
        </p>

        {/* Quick Launch Scenario Badges */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/80 flex-wrap relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Presets:
          </span>
          <button
            onClick={() => handleTriggerDebate('blair-low-block')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedScenarioId === 'blair-low-block'
                ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Blair 5-4-1 Low Block (Blair Day)
          </button>
          <button
            onClick={() => handleTriggerDebate('life-center-flanks')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedScenarioId === 'life-center-flanks'
                ? 'bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-400/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-cyan-400" /> Life Center Flank Threat (Sep 22)
          </button>
          <button
            onClick={() => handleTriggerDebate('pennington-set-pieces')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedScenarioId === 'pennington-set-pieces'
                ? 'bg-purple-400 text-slate-950 font-black shadow-lg shadow-purple-400/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-purple-400" /> Pennington Aerial Set Pieces
          </button>
        </div>
      </div>

      {/* Custom Scenario Generator & Opponent Match Selector */}
      <div className="glass-panel p-5 border border-slate-800 rounded-2xl bg-slate-900/70">
        <form onSubmit={handleCustomSubmit} className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 shrink-0">
            <Swords className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-400">Opponent:</span>
            <select
              value={customOpponent}
              onChange={(e) => setCustomOpponent(e.target.value)}
              className="bg-transparent text-xs font-black text-white focus:outline-none cursor-pointer"
            >
              {PEDDIE_SCHEDULE_2026_2027.map(m => (
                <option key={m.id} value={m.opponent} className="bg-slate-950 text-white">
                  {m.opponent} ({m.isHome ? 'H' : 'A'})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="E.g., 'Down 1-2 at 70th minute in rain vs Lawrenceville, need high press escape and late equalizer'..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer shrink-0"
          >
            <Brain className="w-4 h-4" /> Convene Council Debate
          </button>
        </form>
      </div>

      {/* Active Tactical Scenario Context Card */}
      <div className="glass-panel p-5 border border-slate-700/80 rounded-2xl bg-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 font-extrabold text-[10px] uppercase">
              {debateSession.urgency} URGENCY
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-bold text-xs">{debateSession.contextMatch}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-mono text-xs font-semibold">Minute: {debateSession.minute}&apos;</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 font-bold text-xs">{debateSession.scoreline}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            {debateSession.scenarioTitle}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            {debateSession.scenarioDescription}
          </p>
        </div>

        {/* Agent Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTabAgent('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              activeTabAgent === 'ALL' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            All 4 Agents
          </button>
          <button
            onClick={() => setActiveTabAgent('fable-5')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              activeTabAgent === 'fable-5' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fable 5
          </button>
          <button
            onClick={() => setActiveTabAgent('grok')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              activeTabAgent === 'grok' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Grok
          </button>
          <button
            onClick={() => setActiveTabAgent('gpt')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              activeTabAgent === 'gpt' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            GPT
          </button>
          <button
            onClick={() => setActiveTabAgent('kimi')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              activeTabAgent === 'kimi' ? 'bg-purple-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kimi
          </button>
        </div>
      </div>

      {/* 4-Agent Debate Arena Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {debateSession.statements
          .filter(stmt => activeTabAgent === 'ALL' || stmt.agentId === activeTabAgent)
          .map(stmt => (
            <div
              key={stmt.agentId}
              className={`glass-panel p-6 rounded-2xl border ${stmt.colorScheme.border} ${stmt.colorScheme.bg} flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] shadow-xl`}
            >
              <div>
                {/* Agent Header */}
                <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-md ${stmt.colorScheme.badge}`}>
                      {stmt.avatarBadge}
                    </span>
                    <div>
                      <h3 className={`font-black text-sm ${stmt.colorScheme.text}`}>
                        {stmt.agentName}
                      </h3>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {stmt.specialty}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-black text-emerald-400">
                      {stmt.confidenceScore}% Confidence
                    </span>
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                      <div className="bg-emerald-400 h-full" style={{ width: `${stmt.confidenceScore}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Agent Tactical Philosophy */}
                <div className="mb-3.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-cyan-400" /> Core Philosophy:
                  </div>
                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    &ldquo;{stmt.philosophy}&rdquo;
                  </p>
                </div>

                {/* Key Scouting Observation */}
                <div className="mb-3.5 space-y-1">
                  <div className="text-[10px] uppercase font-extrabold text-amber-400 tracking-wide flex items-center gap-1">
                    <Activity className="w-3 h-3 text-amber-400" /> Key Pitch Observation:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {stmt.keyObservation}
                  </p>
                </div>

                {/* Recommended Tactical Blueprint */}
                <div className="mb-3.5 space-y-1">
                  <div className="text-[10px] uppercase font-extrabold text-cyan-400 tracking-wide flex items-center gap-1">
                    <Target className="w-3 h-3 text-cyan-400" /> Proposed Tactical Maneuver:
                  </div>
                  <p className="text-xs text-slate-200 font-semibold leading-relaxed">
                    {stmt.recommendedTactic}
                  </p>
                </div>

                {/* Lineup & Personnel Adjustment */}
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wide flex items-center gap-1">
                    <Users className="w-3 h-3 text-emerald-400" /> Recommended Lineup Adjustment:
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {stmt.lineupAdjustment}
                  </p>
                </div>
              </div>

              {/* Expected Statistical Outcome */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Projected Payoff:</span>
                <span className="font-bold text-amber-300 font-mono">{stmt.expectedOutcome}</span>
              </div>
            </div>
          ))}
      </div>

      {/* SYNTHESIZED COUNCIL CONSENSUS DIRECTIVE */}
      <div className="glass-panel p-6 lg:p-8 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-slate-950 via-[#001c38] to-[#000e1e] shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between gap-3 flex-wrap mb-4 pb-3 border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Award className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-black tracking-widest text-amber-400">
                OFFICIAL UNIFIED SIDELINE BLUEPRINT
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {debateSession.consensusDirective.headline}
              </h2>
            </div>
          </div>

          <div className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-black flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unanimous Consensus (4-0)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Action */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <h3 className="text-xs uppercase font-black tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" /> Primary Formation Shift & Spacing
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {debateSession.consensusDirective.primaryAction}
              </p>
            </div>

            {/* Substitution Directives */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
              <h3 className="text-xs uppercase font-black tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" /> Prescribed In-Game Substitutions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {debateSession.consensusDirective.substitutions.map((sub, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono text-amber-400 font-black">{sub.minute}&apos; Tactical Window</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-bold">SUB #{idx + 1}</span>
                    </div>
                    <div className="font-bold text-white mb-0.5">
                      <span className="text-rose-400">OFF:</span> {sub.offPlayer}
                    </div>
                    <div className="font-bold text-emerald-400 mb-1.5">
                      <span className="text-emerald-400">ON:</span> {sub.onPlayer}
                    </div>
                    <p className="text-[11px] text-slate-400 italic">
                      {sub.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Directives Column */}
          <div className="space-y-4">
            {/* Pressing Trigger */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[11px] font-black uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> Sideline Pressing Trigger:
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                {debateSession.consensusDirective.pressingTrigger}
              </p>
            </div>

            {/* Set Piece Directive */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[11px] font-black uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Dead-Ball / Set-Piece Plan:
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                {debateSession.consensusDirective.setPieceDirective}
              </p>
            </div>

            {/* Expected xG Swing */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/30">
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 mb-1">
                Mathematical Expectation (xG Swing):
              </div>
              <div className="text-base font-black font-mono text-emerald-300">
                {debateSession.consensusDirective.expectedXgSwing}
              </div>
            </div>

            {/* Link to Playbook Studio */}
            <Link
              href="/dashboard/playbook"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              Open Interactive Playbook Studio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
