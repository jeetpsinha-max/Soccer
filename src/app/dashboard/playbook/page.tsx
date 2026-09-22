'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  SoccerTacticalAgent, 
  PlaybookRoutine, 
  PlaybookStep 
} from '@/lib/agents/soccer-agents';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  ChevronRight, 
  ChevronLeft, 
  Flag, 
  Shield, 
  Zap, 
  Target, 
  Sparkles, 
  Users, 
  Layers, 
  Compass, 
  Activity, 
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function PlaybookPage() {
  const routines = SoccerTacticalAgent.PLAYBOOK_ROUTINES;
  const [selectedRoutineId, setSelectedRoutineId] = useState<string>(routines[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1.0); // 0.5x, 1.0x, 1.5x
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);

  const activeRoutine = routines.find(r => r.id === selectedRoutineId) || routines[0];
  const activeStep = activeRoutine.steps[currentStepIndex] || activeRoutine.steps[0];

  // Animation Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const stepDuration = (activeStep.durationMs || 2000) / playSpeed;
      timer = setTimeout(() => {
        if (currentStepIndex < activeRoutine.steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setCurrentStepIndex(0);
        }
      }, stepDuration);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, activeRoutine, activeStep, playSpeed]);

  const handleRoutineChange = (routineId: string) => {
    setSelectedRoutineId(routineId);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < activeRoutine.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="glass-panel p-6 border border-cyan-500/30 rounded-2xl bg-gradient-to-r from-slate-950 via-[#001933] to-[#001020] shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              GRIDIRON SOCCER PLAYBOOK STUDIO
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 text-xs font-bold">Choreographed Tactical Routines</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/war-room"
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" /> War Room Debate
            </Link>
            <Link
              href="/dashboard/call-sheet"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              Sideline Call Sheet
            </Link>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Interactive Tactical Board & Animated Play Animator
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Simulate Peddie&apos;s verified set-piece choreography and diamond press-break schemes with step-by-step player runs, passing lines, and ball trajectory vectors.
        </p>
      </div>

      {/* Routine Selector Carousel */}
      <div className="space-y-2">
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-1">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          Select Playbook Routine:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {routines.map(routine => {
            const isSelected = routine.id === selectedRoutineId;
            return (
              <button
                key={routine.id}
                onClick={() => handleRoutineChange(routine.id)}
                className={`p-4 rounded-xl text-left transition border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#002447] to-[#001529] border-amber-400/80 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    routine.category === 'CORNER' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}>
                    {routine.category}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    {routine.successRatePct}% Success Rate
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white line-clamp-1">
                  {routine.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {routine.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN TACTICAL PITCH BOARD */}
      <div className="glass-panel p-6 rounded-2xl border-2 border-slate-700 bg-slate-950 flex flex-col gap-4 shadow-2xl">
        {/* Playback Controls & Frame Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-black text-amber-400">
                FRAME {currentStepIndex + 1} OF {activeRoutine.steps.length}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-bold text-white">{activeStep.label}</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {activeStep.description}
            </p>
          </div>

          {/* VCR Style Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowZones(!showZones)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                showZones ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Zone 14
            </button>
            <button
              onClick={() => setShowVectors(!showVectors)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                showVectors ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Run Vectors
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1"></div>

            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'PAUSE' : 'ANIMATE PLAY'}
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === activeRoutine.steps.length - 1}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed Selector */}
            <select
              value={playSpeed}
              onChange={(e) => setPlaySpeed(parseFloat(e.target.value))}
              className="bg-slate-900 text-slate-300 text-xs font-bold border border-slate-800 rounded-lg px-2 py-1.5 cursor-pointer focus:outline-none"
            >
              <option value="0.5">0.5x</option>
              <option value="1.0">1.0x</option>
              <option value="1.5">1.5x</option>
            </select>
          </div>
        </div>

        {/* Tactical Pitch Canvas SVG */}
        <div className="relative w-full aspect-[16/10] bg-[#0c2816] rounded-xl border-4 border-[#174627] overflow-hidden shadow-inner select-none">
          {/* Pitch Mowing Striping */}
          <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-25">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={i % 2 === 0 ? 'bg-black/20' : 'bg-white/10'}></div>
            ))}
          </div>

          {/* Touchlines, Boxes & Pitch Markings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/40 fill-none" strokeWidth="2">
            {/* Outer Boundary */}
            <rect x="3%" y="3%" width="94%" height="94%" />

            {/* Halfway Line */}
            <line x1="50%" y1="3%" x2="50%" y2="97%" />
            <circle cx="50%" cy="50%" r="9%" />
            <circle cx="50%" cy="50%" r="1.5" fill="white" />

            {/* Left Penalty Area (Peddie Defensive Box) */}
            <rect x="3%" y="22%" width="16%" height="56%" />
            <rect x="3%" y="36%" width="6%" height="28%" />
            <circle cx="13%" cy="50%" r="1.5" fill="white" />
            <path d="M 19% 42% A 9% 9% 0 0 1 19% 58%" />

            {/* Right Penalty Area (Opponent Box / Attacking Zone) */}
            <rect x="81%" y="22%" width="16%" height="56%" />
            <rect x="91%" y="36%" width="6%" height="28%" />
            <circle cx="87%" cy="50%" r="1.5" fill="white" />
            <path d="M 81% 42% A 9% 9% 0 0 0 81% 58%" />

            {/* Corner Arcs */}
            <path d="M 3% 6% A 3% 3% 0 0 0 5% 3%" />
            <path d="M 3% 94% A 3% 3% 0 0 1 5% 97%" />
            <path d="M 97% 6% A 3% 3% 0 0 1 95% 3%" />
            <path d="M 97% 94% A 3% 3% 0 0 0 95% 97%" />
          </svg>

          {/* Zone 14 Highlight Overlay */}
          {showZones && (
            <div 
              className="absolute left-[65%] top-[34%] w-[16%] h-[32%] border-2 border-dashed border-amber-400/50 bg-amber-400/10 rounded-lg flex items-center justify-center pointer-events-none transition-all duration-500"
            >
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider bg-slate-950/80 px-2 py-0.5 rounded border border-amber-400/40">
                ZONE 14
              </span>
            </div>
          )}

          {/* Passing Line Vector */}
          {activeStep.passingLine && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
              <defs>
                <marker id="pass-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#facc15" />
                </marker>
              </defs>
              <line
                x1={`${activeStep.passingLine.from.xPct}%`}
                y1={`${activeStep.passingLine.from.yPct}%`}
                x2={`${activeStep.passingLine.to.xPct}%`}
                y2={`${activeStep.passingLine.to.yPct}%`}
                stroke="#facc15"
                strokeWidth="3"
                strokeDasharray="4,4"
                markerEnd="url(#pass-arrow)"
                className="animate-pulse"
              />
            </svg>
          )}

          {/* Player Run Vectors */}
          {showVectors && activeStep.runVectors && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
              <defs>
                <marker id="run-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M 0 0 L 6 3 L 0 6 z" fill="#38bdf8" />
                </marker>
              </defs>
              {activeStep.runVectors.map((rv, idx) => (
                <line
                  key={idx}
                  x1={`${rv.from.xPct}%`}
                  y1={`${rv.from.yPct}%`}
                  x2={`${rv.to.xPct}%`}
                  y2={`${rv.to.yPct}%`}
                  stroke="#38bdf8"
                  strokeWidth="2"
                  markerEnd="url(#run-arrow)"
                />
              ))}
            </svg>
          )}

          {/* Ball Marker */}
          <div
            className="absolute z-30 w-4 h-4 -ml-2 -mt-2 rounded-full bg-white border-2 border-slate-950 shadow-lg shadow-black/80 flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              left: `${activeStep.ballPosition.xPct}%`,
              top: `${activeStep.ballPosition.yPct}%`
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
          </div>

          {/* Opponent Defenders (Red/Grey) */}
          {activeStep.opponentDefenders.map(opp => (
            <div
              key={opp.playerNumber}
              className="absolute z-10 w-7 h-7 -ml-3.5 -mt-3.5 rounded-full bg-rose-700 border-2 border-white/80 shadow-md flex items-center justify-center font-black text-[10px] text-white transition-all duration-700 ease-out"
              style={{
                left: `${opp.xPct}%`,
                top: `${opp.yPct}%`
              }}
              title={`${opp.playerName} (${opp.position})`}
            >
              {opp.playerNumber}
            </div>
          ))}

          {/* Peddie Players (Navy & Gold) */}
          {activeStep.peddiePlayers.map(player => (
            <div
              key={player.playerNumber}
              className={`absolute z-20 w-8 h-8 -ml-4 -mt-4 rounded-full flex flex-col items-center justify-center font-black text-[11px] shadow-lg transition-all duration-700 ease-out ${
                player.isBallCarrier
                  ? 'bg-amber-400 text-slate-950 border-2 border-white ring-4 ring-amber-400/40 scale-110'
                  : 'bg-[#002147] text-amber-300 border-2 border-amber-400'
              }`}
              style={{
                left: `${player.xPct}%`,
                top: `${player.yPct}%`
              }}
            >
              <span>{player.playerNumber}</span>

              {/* Player Name Tag */}
              <span className="absolute -bottom-4 whitespace-nowrap bg-slate-950/90 text-white font-bold text-[9px] px-1.5 py-0.2 rounded border border-slate-800 shadow pointer-events-none">
                {player.playerName}
              </span>
            </div>
          ))}
        </div>

        {/* Key Personnel & Routine Breakdown */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Key Personnel Assignments:
            </div>
            <div className="flex flex-wrap gap-2">
              {activeRoutine.keyPersonnel.map((person, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 text-white border border-slate-800 text-xs font-bold">
                  {person}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[10px] uppercase font-bold text-amber-400">Expected Threat Created:</div>
            <div className="text-xl font-black font-mono text-emerald-300">+{activeRoutine.expectedXG} xG</div>
          </div>
        </div>
      </div>
    </div>
  );
}
