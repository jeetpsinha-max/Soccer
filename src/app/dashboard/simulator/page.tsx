'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  SoccerTacticalAgent, 
  SimState, 
  SimEvent 
} from '@/lib/agents/soccer-agents';
import { 
  PEDDIE_ROSTER_2026_2027, 
  PEDDIE_SCHEDULE_2026_2027 
} from '@/lib/soccer-data';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  Zap, 
  Shield, 
  Award, 
  Users, 
  Sparkles, 
  Clock, 
  Flame, 
  MessageSquare, 
  TrendingUp,
  Volume2,
  ChevronRight,
  ArrowRight,
  Radio
} from 'lucide-react';

export default function SimulatorPage() {
  const [selectedOpponent, setSelectedOpponent] = useState<string>('Life Center Academy');
  const [simState, setSimState] = useState<SimState>(() => SoccerTacticalAgent.initSimulation('Life Center Academy'));
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [teamTalkMessage, setTeamTalkMessage] = useState<string | null>(null);

  // Auto-play loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && !simState.isFinished) {
      timer = setTimeout(() => {
        setSimState(prev => SoccerTacticalAgent.simulateNextMinute(prev, selectedOpponent));
      }, 1200);
    } else if (simState.isFinished) {
      setIsAutoPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, simState, selectedOpponent]);

  const handleNextStep = () => {
    if (!simState.isFinished) {
      setSimState(prev => SoccerTacticalAgent.simulateNextMinute(prev, selectedOpponent));
    }
  };

  const handleReset = (opponent: string) => {
    setIsAutoPlaying(false);
    setTeamTalkMessage(null);
    setSimState(SoccerTacticalAgent.initSimulation(opponent));
  };

  const handleStanceChange = (stance: SimState['tacticalStance']) => {
    setSimState(prev => ({
      ...prev,
      tacticalStance: stance,
      events: [
        ...prev.events,
        {
          minute: prev.currentMinute,
          type: 'Tactical Shift',
          team: 'Peddie',
          player: 'Coach George Nazario',
          description: `Tactical stance switched to ${stance.replace(/_/g, ' ')}.`,
          xgValue: 0,
          peddieScore: prev.peddieScore,
          opponentScore: prev.opponentScore,
          tacticalNote: 'Council alignment updated.'
        }
      ]
    }));
  };

  const handleCouncilTeamTalk = (agent: 'fable-5' | 'grok' | 'gpt' | 'kimi') => {
    let msg = '';
    let momentumBoost = 0;
    if (agent === 'fable-5') {
      msg = 'Fable 5 Team Talk: "Believe in the spatial beauty of our diamond! Overload their weak-side fullback!" (+15 Momentum)';
      momentumBoost = 15;
    } else if (agent === 'grok') {
      msg = 'Grok Team Talk: "Suffocate their midfield pivot! Do not let Santos breathe!" (+20 Momentum)';
      momentumBoost = 20;
    } else if (agent === 'gpt') {
      msg = 'GPT Team Talk: "Maintain 15-yard passing triangles. Circulate through Tharney before penetrating." (+10 Momentum)';
      momentumBoost = 10;
    } else {
      msg = 'Kimi Team Talk: "Film tracking shows their #4 CB is fatigued. Spin Tommy Kim into the left channel!" (+15 Momentum)';
      momentumBoost = 15;
    }

    setTeamTalkMessage(msg);
    setSimState(prev => ({
      ...prev,
      momentumPeddie: Math.min(100, prev.momentumPeddie + momentumBoost),
      events: [
        ...prev.events,
        {
          minute: prev.currentMinute,
          type: 'Tactical Shift',
          team: 'Peddie',
          player: 'Coach Team Talk',
          description: msg,
          xgValue: 0,
          peddieScore: prev.peddieScore,
          opponentScore: prev.opponentScore,
          tacticalNote: 'Sideline psychological boost.'
        }
      ]
    }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="glass-panel p-6 border border-emerald-500/30 rounded-2xl bg-gradient-to-r from-slate-950 via-[#002414] to-[#00120a] shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              VIRTUAL TOUCHLINE MATCH ENGINE
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 text-xs font-bold">2026–2027 Season Simulator</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/war-room"
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> War Room Debate
            </Link>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Live Interactive Matchday Simulator & Tactical Touchline
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Take the touchline as Coach George Nazario. Simulate upcoming matches minute-by-minute, trigger high press traps, make tactical substitutions, and issue real-time team talks backed by our 4 AI agents.
        </p>
      </div>

      {/* Opponent Selector & Simulation Controls */}
      <div className="glass-panel p-5 border border-slate-800 rounded-2xl bg-slate-900/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400">Match Opponent:</span>
            <select
              value={selectedOpponent}
              onChange={(e) => {
                setSelectedOpponent(e.target.value);
                handleReset(e.target.value);
              }}
              className="bg-transparent text-xs font-black text-white focus:outline-none cursor-pointer"
            >
              {PEDDIE_SCHEDULE_2026_2027.map(m => (
                <option key={m.id} value={m.opponent} className="bg-slate-950 text-white">
                  {m.opponent} ({m.isHome ? 'Home' : 'Away'})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleReset(selectedOpponent)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Match
          </button>
        </div>

        {/* Play/Step Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            disabled={simState.isFinished}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-40"
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isAutoPlaying ? 'PAUSE CLOCK' : 'AUTO-SIMULATE'}
          </button>

          <button
            onClick={handleNextStep}
            disabled={simState.isFinished || isAutoPlaying}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer disabled:opacity-40"
          >
            +5 MIN STEP <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BROADCAST SCOREBOARD HUD */}
      <div className="glass-panel p-6 lg:p-8 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-slate-950 via-[#001a33] to-[#000e1e] shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          {/* Peddie Team Card */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#002147] to-[#001026] border-2 border-amber-400 flex items-center justify-center font-black text-3xl text-amber-400 shadow-lg shadow-amber-500/20">
              P
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold text-amber-400 tracking-widest">
                HOME • MAPL VARSITY
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Peddie Falcons
              </h2>
              <div className="text-xs text-slate-400 font-mono font-bold mt-0.5">
                xG: <span className="text-amber-300 font-black text-sm">{simState.peddieXg}</span> • Poss: {simState.peddiePossessionPct}%
              </div>
            </div>
          </div>

          {/* Central Match Score & Clock */}
          <div className="flex flex-col items-center">
            <div className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono font-black mb-2 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {simState.isFinished ? 'FULL TIME' : `${simState.currentMinute}' / 80'`}
            </div>

            <div className="flex items-center gap-4 text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
              <span className="text-amber-400">{simState.peddieScore}</span>
              <span className="text-slate-600">:</span>
              <span className="text-slate-200">{simState.opponentScore}</span>
            </div>

            <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mt-1">
              4-4-2 Diamond Midfield
            </span>
          </div>

          {/* Opponent Team Card */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-xs uppercase font-extrabold text-slate-400 tracking-widest">
                AWAY OPPONENT
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {selectedOpponent}
              </h2>
              <div className="text-xs text-slate-400 font-mono font-bold mt-0.5">
                xG: <span className="text-slate-300 font-black text-sm">{simState.opponentXg}</span> • Poss: {100 - simState.peddiePossessionPct}%
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center font-black text-2xl text-white shadow-lg">
              {selectedOpponent.slice(0, 3).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Momentum & Touchline Stance Controls */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tactical Stance Selector */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs uppercase font-black tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Touchline Tactical Stance:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleStanceChange('HIGH_PRESS_DIAMOND')}
                className={`p-2.5 rounded-lg text-xs font-bold transition text-left border ${
                  simState.tacticalStance === 'HIGH_PRESS_DIAMOND'
                    ? 'bg-amber-400 text-slate-950 font-black border-amber-400 shadow-md'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                High Press Diamond
              </button>
              <button
                onClick={() => handleStanceChange('ALL_OUT_ATTACK')}
                className={`p-2.5 rounded-lg text-xs font-bold transition text-left border ${
                  simState.tacticalStance === 'ALL_OUT_ATTACK'
                    ? 'bg-rose-500 text-white font-black border-rose-400 shadow-md'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                All-Out Attack (+xG)
              </button>
              <button
                onClick={() => handleStanceChange('BALANCED_CONTROL')}
                className={`p-2.5 rounded-lg text-xs font-bold transition text-left border ${
                  simState.tacticalStance === 'BALANCED_CONTROL'
                    ? 'bg-cyan-400 text-slate-950 font-black border-cyan-400 shadow-md'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                Balanced Control
              </button>
              <button
                onClick={() => handleStanceChange('LOW_BLOCK_COUNTER')}
                className={`p-2.5 rounded-lg text-xs font-bold transition text-left border ${
                  simState.tacticalStance === 'LOW_BLOCK_COUNTER'
                    ? 'bg-emerald-400 text-slate-950 font-black border-emerald-400 shadow-md'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                5-4-1 Low Block Lockout
              </button>
            </div>
          </div>

          {/* AI Council Team Talk Buttons */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs uppercase font-black tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Council Touchline Team Talks:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCouncilTeamTalk('fable-5')}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold text-left transition"
              >
                Fable 5 Inspire
              </button>
              <button
                onClick={() => handleCouncilTeamTalk('grok')}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-bold text-left transition"
              >
                Grok Aggression
              </button>
              <button
                onClick={() => handleCouncilTeamTalk('gpt')}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 text-xs font-bold text-left transition"
              >
                GPT Shape Reset
              </button>
              <button
                onClick={() => handleCouncilTeamTalk('kimi')}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-purple-300 border border-purple-500/40 text-xs font-bold text-left transition"
              >
                Kimi Film Read
              </button>
            </div>
            {teamTalkMessage && (
              <p className="text-[11px] text-amber-300 mt-2 italic font-medium">
                {teamTalkMessage}
              </p>
            )}
          </div>

          {/* Momentum Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase font-black tracking-wider text-white mb-1 flex items-center justify-between">
                <span>Touchline Momentum:</span>
                <span className="font-mono text-amber-400">{simState.momentumPeddie > 0 ? `+${simState.momentumPeddie}%` : `${simState.momentumPeddie}%`}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mt-2">
                <div 
                  className={`h-full transition-all duration-500 ${simState.momentumPeddie >= 0 ? 'bg-amber-400' : 'bg-rose-500'}`}
                  style={{ width: `${Math.max(10, Math.min(90, 50 + simState.momentumPeddie / 2))}%` }}
                ></div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 mt-2">
              High momentum increases clinical finishing rates and defensive duel success by up to 25%.
            </div>
          </div>
        </div>
      </div>

      {/* MATCH EVENTS TICKER FEED */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col gap-3">
        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          Live Tactical Commentary & Match Events ({simState.events.length} logged):
        </h3>

        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-2">
          {simState.events.slice().reverse().map((e, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-start justify-between gap-4 text-xs ${
                e.type === 'Goal'
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                  : e.type === 'Save'
                  ? 'bg-cyan-500/10 border-cyan-500/40'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono font-black text-amber-400 text-xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 shrink-0">
                  {e.minute}&apos;
                </span>
                <div>
                  <div className="font-bold text-white mb-0.5">
                    {e.description}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Tactical Directive: <span className="text-cyan-300 font-semibold">{e.tacticalNote}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  e.type === 'Goal' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                }`}>
                  {e.type}
                </span>
                {e.xgValue > 0 && (
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    +{e.xgValue} xG
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
