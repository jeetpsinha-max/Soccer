'use client';

import React, { useState } from 'react';
import { MatchEvent } from '@/lib/types';
import { MATCH_EVENTS_LIVE_BLAIR } from '@/lib/soccer-data';
import { Crosshair, Eye, ShieldAlert, Award } from 'lucide-react';

interface PitchRadarOverlayProps {
  events?: MatchEvent[];
  selectedEventType?: string;
  showHalfSpaces?: boolean;
}

export const PitchRadarOverlay: React.FC<PitchRadarOverlayProps> = ({
  events = MATCH_EVENTS_LIVE_BLAIR,
  selectedEventType = 'ALL',
  showHalfSpaces = true
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<MatchEvent | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  const filteredEvents = events.filter(e => {
    if (selectedEventType === 'ALL') return true;
    if (selectedEventType === 'GOALS') return e.type === 'Goal';
    if (selectedEventType === 'SHOTS') return e.type === 'Shot' || e.type === 'Goal';
    if (selectedEventType === 'PASSES') return e.type === 'Pass' || e.type === 'Key Pass';
    if (selectedEventType === 'DEFENSE') return e.type === 'Tackle' || e.type === 'Interception';
    return true;
  });

  return (
    <div className="flex flex-col gap-3">
      {/* Field Viewport Toolbar */}
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-400 flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5" /> PITCH SPATIAL RADAR (105m x 68m)
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">Field Tilt: <strong className="text-emerald-400">65.0% Peddie</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition ${
              showHeatmap ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400'
            }`}
          >
            <Eye className="w-3 h-3" /> {showHeatmap ? 'Territory Dominance: ON' : 'Territory Dominance: OFF'}
          </button>
        </div>
      </div>

      {/* SVG Soccer Pitch */}
      <div className="relative w-full aspect-[105/68] max-h-[500px] soccer-pitch rounded-xl overflow-hidden shadow-2xl">
        <svg
          viewBox="0 0 105 68"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Pitch Grass Stripes */}
          <rect x="0" y="0" width="105" height="68" fill="#072b1a" />
          {[0, 15, 30, 45, 60, 75, 90].map((x, i) => (
            <rect
              key={i}
              x={x}
              y="0"
              width="15"
              height="68"
              fill={i % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'}
            />
          ))}

          {/* Territory Heatmap Shade */}
          {showHeatmap && (
            <>
              {/* Peddie Attacking Dominance Zone in Final Third */}
              <rect x="65" y="10" width="35" height="48" fill="rgba(0, 255, 136, 0.08)" rx="4" />
              {/* Half-Space Infiltration Zone */}
              <rect x="65" y="14" width="25" height="18" fill="rgba(255, 184, 28, 0.12)" rx="2" />
            </>
          )}

          {/* Half-Space Guidelines */}
          {showHalfSpaces && (
            <>
              <line x1="0" y1="18" x2="105" y2="18" stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="2,2" strokeWidth="0.4" />
              <line x1="0" y1="50" x2="105" y2="50" stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="2,2" strokeWidth="0.4" />
              {/* Third Lines */}
              <line x1="35" y1="0" x2="35" y2="68" stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="2,2" strokeWidth="0.4" />
              <line x1="70" y1="0" x2="70" y2="68" stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="2,2" strokeWidth="0.4" />
            </>
          )}

          {/* Touchlines & Goal Lines */}
          <rect x="2" y="2" width="101" height="64" className="pitch-line" />

          {/* Halfway Line */}
          <line x1="52.5" y1="2" x2="52.5" y2="66" className="pitch-line" />

          {/* Center Circle & Spot */}
          <circle cx="52.5" cy="34" r="9.15" className="pitch-line" />
          <circle cx="52.5" cy="34" r="0.8" fill="#ffffff" />

          {/* Left Penalty Area (Defending Peddie) */}
          <rect x="2" y="16.5" width="16.5" height="35" className="pitch-line" />
          <rect x="2" y="24.5" width="5.5" height="19" className="pitch-line" />
          <circle cx="11" cy="34" r="0.8" fill="#ffffff" />
          <path d="M 18.5 27.5 A 9.15 9.15 0 0 1 18.5 40.5" className="pitch-line" />

          {/* Right Penalty Area (Attacking Peddie vs Blair) */}
          <rect x="86.5" y="16.5" width="16.5" height="35" className="pitch-line" />
          <rect x="97.5" y="24.5" width="5.5" height="19" className="pitch-line" />
          <circle cx="94" cy="34" r="0.8" fill="#ffffff" />
          <path d="M 86.5 27.5 A 9.15 9.15 0 0 0 86.5 40.5" className="pitch-line" />

          {/* Corner Arcs */}
          <path d="M 2 4 A 2 2 0 0 0 4 2" className="pitch-line" />
          <path d="M 2 64 A 2 2 0 0 1 4 66" className="pitch-line" />
          <path d="M 103 4 A 2 2 0 0 1 101 2" className="pitch-line" />
          <path d="M 103 64 A 2 2 0 0 0 101 66" className="pitch-line" />

          {/* Zone Watermark Labels */}
          <text x="18" y="8" fill="rgba(255,255,255,0.25)" fontSize="3" fontWeight="bold">PEDDIE DEFENSIVE 3RD</text>
          <text x="47" y="8" fill="rgba(255,255,255,0.25)" fontSize="3" fontWeight="bold">MIDFIELD DUEL ZONE</text>
          <text x="75" y="8" fill="rgba(255,255,255,0.35)" fontSize="3" fontWeight="bold">ATTACKING FINAL 3RD</text>

          {/* Match Events Plotted */}
          {filteredEvents.map(event => {
            const isGoal = event.type === 'Goal';
            const isPeddie = event.team === 'Peddie';
            const color = isGoal 
              ? '#ffb81c' // Peddie Gold
              : isPeddie 
                ? '#00ff88' // Peddie Green
                : '#ef4444'; // Opponent Red

            return (
              <g
                key={event.id}
                className="cursor-pointer transition-transform hover:scale-125"
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Event Path line for passes */}
                {event.endX !== undefined && event.endY !== undefined && (
                  <line
                    x1={event.startX}
                    y1={event.startY}
                    x2={event.endX}
                    y2={event.endY}
                    stroke={color}
                    strokeWidth={isGoal ? 1.5 : 0.9}
                    strokeDasharray={event.type === 'Cross' ? '1,1' : undefined}
                    opacity={0.85}
                  />
                )}

                {/* Event Origin Circle */}
                <circle
                  cx={event.startX}
                  cy={event.startY}
                  r={isGoal ? 2.8 : 1.6}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={0.6}
                  opacity={0.95}
                />

                {/* Star for Goal */}
                {isGoal && (
                  <text
                    x={event.startX}
                    y={event.startY + 1}
                    textAnchor="middle"
                    fill="#000000"
                    fontSize="2.4"
                    fontWeight="black"
                  >
                    ★
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredEvent && (
          <div className="absolute top-4 left-4 bg-slate-950/95 border border-cyan-400 p-3 rounded-lg shadow-2xl max-w-xs pointer-events-none backdrop-blur-md">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`text-xs font-bold uppercase ${hoveredEvent.type === 'Goal' ? 'text-amber-400' : 'text-cyan-400'}`}>
                {hoveredEvent.minute}&apos; {hoveredEvent.type}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                {hoveredEvent.phase}
              </span>
            </div>
            <div className="text-sm font-semibold text-white mb-1">
              {hoveredEvent.playerName} #{hoveredEvent.playerNumber}
            </div>
            <p className="text-xs text-slate-300 mb-2">{hoveredEvent.description}</p>
            {hoveredEvent.expectedGoals !== undefined && (
              <div className="text-[11px] font-mono text-emerald-400">
                xG Probability: <strong>{(hoveredEvent.expectedGoals * 100).toFixed(1)}%</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 px-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Goal (★)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span> Peddie Event
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span> Opponent Event
          </span>
        </div>
        <div className="text-slate-400 italic">
          Hover over points on the pitch for full tactical event telemetry
        </div>
      </div>
    </div>
  );
};
