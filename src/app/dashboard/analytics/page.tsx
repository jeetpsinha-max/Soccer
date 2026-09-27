'use client';

/**
 * ============================================================================
 * Peddie Soccer SAC — Phase 3: Interactive 2D Pitch Visualizer
 * /dashboard/analytics
 *
 * Broadcast-grade 105m × 68m pitch visualizer featuring:
 *  - xG shot charts with variable bubble sizes
 *  - Pass network with edge thickness by pass frequency
 *  - Defensive pressure heatmap (12×8 xT grid)
 *  - Physical telemetry heat trails
 *  - Match filter: per-fixture or season aggregate
 * ============================================================================
 */

import React, { useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  PEDDIE_SCHEDULE_2026_2027,
  DETAILED_SHOTS_LOG_PDS,
  DETAILED_SHOTS_LOG_AQUINAS,
  DETAILED_SHOTS_LOG_GEORGE,
  PASSING_NETWORK_PDS,
  PHYSICAL_TELEMETRY_PDS,
  ALL_VEO_MATCH_EVENTS,
  XT_GRID_MODEL_PDS,
} from '@/lib/soccer-data';
import { ShotDetail, PassingLink, MatchEvent, PhysicalTelemetry } from '@/lib/types';
import {
  Target, Users, Flame, Activity, ArrowLeft, Filter,
  TrendingUp, ChevronDown, Info, Eye, Layers, Crosshair,
  BarChart3, Wind,
} from 'lucide-react';

// ============================================================================
// Types & Constants
// ============================================================================

type VisualizerMode = 'shots' | 'passes' | 'heatmap' | 'telemetry' | 'xt';
type TeamFilter = 'Peddie' | 'Opponent' | 'Both';

const PITCH_W = 105; // meters
const PITCH_H = 68;  // meters

// Color palette
const PEDDIE_GOLD = '#FFD700';
const PEDDIE_NAVY = '#1B2A4A';
const DANGER_RED = '#EF4444';
const SUCCESS_GREEN = '#22C55E';
const PRESS_BLUE = '#3B82F6';
const NEUTRAL_GRAY = '#6B7280';

// Mode metadata
const MODES: { id: VisualizerMode; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { id: 'shots', label: 'Shot Chart', icon: Target, description: 'xG weighted shot locations with outcome indicators' },
  { id: 'passes', label: 'Pass Network', icon: Users, description: 'Player-to-player passing connections by frequency' },
  { id: 'heatmap', label: 'xT Heatmap', icon: Flame, description: 'Expected Threat distribution across 96 pitch zones' },
  { id: 'telemetry', label: 'Telemetry', icon: Activity, description: 'Physical intensity trails by distance & sprint zones' },
  { id: 'xt', label: 'Press Map', icon: Wind, description: 'Defensive pressing intensity & recovery zones' },
];

// ============================================================================
// SVG Pitch Helpers
// ============================================================================

/** Convert real pitch coordinates (0-105m, 0-68m) to SVG viewBox coordinates */
function pitchToSvg(xM: number, yM: number, svgW: number, svgH: number, padding = 20) {
  return {
    x: padding + (xM / PITCH_W) * (svgW - 2 * padding),
    y: padding + (yM / PITCH_H) * (svgH - 2 * padding),
  };
}

// ============================================================================
// Subcomponents
// ============================================================================

/** SVG pitch background (lines, arcs, penalty areas) */
function PitchBackground({ svgW, svgH, padding = 20 }: { svgW: number; svgH: number; padding?: number }) {
  const p = (xM: number, yM: number) => pitchToSvg(xM, yM, svgW, svgH, padding);
  const w = svgW - 2 * padding;
  const h = svgH - 2 * padding;
  const cx = padding + w / 2;
  const cy = padding + h / 2;
  const cr = (9.15 / PITCH_W) * w; // center circle radius

  // Penalty areas
  const penaltyW = (16.5 / PITCH_W) * w;
  const penaltyH = (40.32 / PITCH_H) * h;
  const sixYardW = (5.5 / PITCH_W) * w;
  const sixYardH = (18.32 / PITCH_H) * h;
  const goalW = (1.5 / PITCH_W) * w;
  const goalH = (7.32 / PITCH_H) * h;
  const penaltyY = cy - penaltyH / 2;
  const sixYardY = cy - sixYardH / 2;
  const goalY = cy - goalH / 2;

  const lineStyle = { stroke: 'rgba(255,255,255,0.25)', strokeWidth: 1, fill: 'none' };

  return (
    <g>
      {/* Pitch surface */}
      <rect x={padding} y={padding} width={w} height={h} fill="#1a4a1a" rx={2} />
      {/* Pitch stripes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i}
          x={padding + (i * w) / 8} y={padding}
          width={w / 8} height={h}
          fill={i % 2 === 0 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.02)'}
        />
      ))}
      {/* Outer boundary */}
      <rect x={padding} y={padding} width={w} height={h} {...lineStyle} />
      {/* Half-way line */}
      <line x1={cx} y1={padding} x2={cx} y2={padding + h} {...lineStyle} />
      {/* Center circle */}
      <circle cx={cx} cy={cy} r={cr} {...lineStyle} />
      <circle cx={cx} cy={cy} r={3} fill="rgba(255,255,255,0.4)" />

      {/* Left penalty area */}
      <rect x={padding} y={penaltyY} width={penaltyW} height={penaltyH} {...lineStyle} />
      <rect x={padding} y={sixYardY} width={sixYardW} height={sixYardH} {...lineStyle} />
      <rect x={padding - goalW} y={goalY} width={goalW} height={goalH} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
      <circle cx={padding + (11 / PITCH_W) * w} cy={cy} r={3} fill="rgba(255,255,255,0.3)" />

      {/* Right penalty area */}
      <rect x={padding + w - penaltyW} y={penaltyY} width={penaltyW} height={penaltyH} {...lineStyle} />
      <rect x={padding + w - sixYardW} y={sixYardY} width={sixYardW} height={sixYardH} {...lineStyle} />
      <rect x={padding + w} y={goalY} width={goalW} height={goalH} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
      <circle cx={padding + w - (11 / PITCH_W) * w} cy={cy} r={3} fill="rgba(255,255,255,0.3)" />

      {/* Corner arcs */}
      {[
        { cx: padding, cy: padding },
        { cx: padding + w, cy: padding },
        { cx: padding, cy: padding + h },
        { cx: padding + w, cy: padding + h },
      ].map((corner, i) => (
        <path
          key={i}
          d={`M ${corner.cx + (i % 2 === 0 ? 6 : -6)} ${corner.cy} A 6 6 0 0 ${i < 2 ? 1 : 0} ${corner.cx} ${corner.cy + (i < 2 ? 6 : -6)}`}
          {...lineStyle}
        />
      ))}
    </g>
  );
}

/** Shot chart overlay */
function ShotChartOverlay({
  shots, teamFilter, svgW, svgH, padding = 20,
  hoveredShot, onHover,
}: {
  shots: ShotDetail[];
  teamFilter: TeamFilter;
  svgW: number; svgH: number; padding?: number;
  hoveredShot: ShotDetail | null;
  onHover: (s: ShotDetail | null) => void;
}) {
  const filtered = shots.filter(s =>
    teamFilter === 'Both' ? true :
    teamFilter === 'Peddie' ? s.team === 'Peddie' : s.team === 'Opponent'
  );

  return (
    <g>
      {filtered.map((shot) => {
        const { x, y } = pitchToSvg(shot.xMeters, shot.yMeters, svgW, svgH, padding);
        const r = Math.max(5, Math.min(18, shot.xg * 60));
        const color = shot.outcome === 'Goal' ? SUCCESS_GREEN :
          shot.outcome === 'Saved' ? PEDDIE_GOLD :
          shot.outcome === 'Off Target' ? DANGER_RED :
          NEUTRAL_GRAY;
        const isHovered = hoveredShot?.id === shot.id;

        return (
          <g key={shot.id} onMouseEnter={() => onHover(shot)} onMouseLeave={() => onHover(null)}>
            <circle
              cx={x} cy={y} r={r + (isHovered ? 4 : 0)}
              fill={`${color}22`}
              stroke={color}
              strokeWidth={isHovered ? 2.5 : 1.5}
              style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
            />
            {shot.outcome === 'Goal' && (
              <circle cx={x} cy={y} r={4} fill={SUCCESS_GREEN} />
            )}
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize={9} fill="white" fontWeight="600" style={{ pointerEvents: 'none' }}>
              {shot.xg.toFixed(2)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Pass network overlay */
function PassNetworkOverlay({
  passes, svgW, svgH, padding = 20,
}: {
  passes: PassingLink[];
  svgW: number; svgH: number; padding?: number;
}) {
  // Position players on a 4-3-3 formation spread
  const positions: Record<string, { x: number; y: number }> = {
    'McKenzie': { x: 5, y: 34 },
    'Seigies':  { x: 18, y: 56 }, 'Manney': { x: 20, y: 42 }, 'Wiley': { x: 20, y: 26 }, 'Romanelli': { x: 18, y: 12 },
    'Sinha':    { x: 42, y: 58 }, 'Tharney': { x: 45, y: 34 }, 'Horsch': { x: 42, y: 10 },
    'Mohiuddin':{ x: 72, y: 8 }, 'Kim': { x: 82, y: 34 }, 'Zhang': { x: 72, y: 60 },
    // extended
    'Gimbel':   { x: 68, y: 58 }, 'Fischetti': { x: 16, y: 56 }, 'Kwak': { x: 40, y: 22 },
  };

  const maxPasses = Math.max(...passes.map(p => p.completedPasses), 1);

  return (
    <g>
      {/* Edges (passing lanes) */}
      {passes.map((link) => {
        const fromPos = positions[link.fromName.split(' ')[1] || link.fromName.split(' ')[0]];
        const toPos = positions[link.toName.split(' ')[1] || link.toName.split(' ')[0]];
        if (!fromPos || !toPos) return null;

        const from = pitchToSvg(fromPos.x, fromPos.y, svgW, svgH, padding);
        const to = pitchToSvg(toPos.x, toPos.y, svgW, svgH, padding);
        const thickness = 1 + (link.completedPasses / maxPasses) * 8;
        const opacity = 0.3 + (link.completedPasses / maxPasses) * 0.5;

        return (
          <line key={`${link.fromNumber}-${link.toNumber}`}
            x1={from.x} y1={from.y} x2={to.x} y2={to.y}
            stroke={PEDDIE_GOLD}
            strokeWidth={thickness}
            opacity={opacity}
          />
        );
      })}

      {/* Nodes (players) */}
      {Object.entries(positions).map(([name, pos]) => {
        const { x, y } = pitchToSvg(pos.x, pos.y, svgW, svgH, padding);
        const totalPasses = passes
          .filter(p => p.fromName.includes(name) || p.toName.includes(name))
          .reduce((s, p) => s + p.completedPasses, 0);
        const r = Math.max(8, Math.min(18, 8 + (totalPasses / 80) * 10));

        return (
          <g key={name}>
            <circle cx={x} cy={y} r={r + 3} fill={`${PEDDIE_NAVY}88`} />
            <circle cx={x} cy={y} r={r} fill={PEDDIE_NAVY} stroke={PEDDIE_GOLD} strokeWidth={2} />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              fontSize={7} fill={PEDDIE_GOLD} fontWeight="700">
              {name.slice(0, 3).toUpperCase()}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Expected Threat (xT) heatmap */
function XTHeatmapOverlay({
  svgW, svgH, padding = 20,
}: { svgW: number; svgH: number; padding?: number }) {
  const cols = 12;
  const rows = 8;
  const cellW = (svgW - 2 * padding) / cols;
  const cellH = (svgH - 2 * padding) / rows;

  // Synthetic xT grid based on canonical soccer expected threat model
  // Higher values near goal areas (cols 10-11), penalty spots, half-spaces
  const getXT = (col: number, row: number): number => {
    const distFromGoal = Math.abs(col - 11.5) / 12;
    const centralBonus = 1 - Math.abs(row - 3.5) / 4;
    const base = (1 - distFromGoal) * centralBonus;
    // Penalty area spike
    if (col >= 9 && row >= 2 && row <= 5) return Math.min(1, base * 2.2);
    // 6-yard box
    if (col >= 11 && row >= 3 && row <= 4) return 0.95;
    return Math.min(0.8, base * 1.1);
  };

  return (
    <g opacity={0.75}>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const xt = getXT(col, row);
          const r = Math.round(239 * xt + 30 * (1 - xt));
          const g = Math.round(20 * xt + 80 * (1 - xt));
          const b = Math.round(20 * (1 - xt) + 100 * xt);
          return (
            <rect key={`${col}-${row}`}
              x={padding + col * cellW}
              y={padding + row * cellH}
              width={cellW} height={cellH}
              fill={`rgb(${r},${g},${b})`}
              opacity={0.3 + xt * 0.5}
            />
          );
        })
      )}
    </g>
  );
}

/** Physical telemetry heat trails */
function TelemetryOverlay({
  telemetry, svgW, svgH, padding = 20,
}: { telemetry: PhysicalTelemetry[]; svgW: number; svgH: number; padding?: number }) {
  const top5 = [...telemetry].sort((a, b) => b.totalDistanceMiles - a.totalDistanceMiles).slice(0, 5);

  // Synthetic sprint trail positions for each player based on their positional role
  const trailSeeds: Record<string, number[][]> = {
    'Christian Tharney': [[35,34],[45,25],[55,34],[45,43],[35,34]],
    'Rayyaan Mohiuddin': [[68,8],[82,15],[95,8],[85,4],[72,8]],
    'Tommy Kim':         [[75,34],[88,26],[98,34],[88,42],[75,34]],
    'Jeet Sinha':        [[35,58],[50,52],[65,58],[50,62],[35,58]],
    'Zachary Horsch':    [[40,20],[55,30],[60,20],[50,14],[40,20]],
  };

  return (
    <g>
      {top5.map((player) => {
        const name = player.playerName;
        const trail = trailSeeds[name];
        if (!trail) return null;
        const intensity = player.totalDistanceMiles / 8; // normalize

        const points = trail.map(([xM, yM]) => {
          const { x, y } = pitchToSvg(xM, yM, svgW, svgH, padding);
          return `${x},${y}`;
        }).join(' ');

        return (
          <g key={name}>
            <polyline
              points={points}
              fill="none"
              stroke={`rgba(251,146,60,${0.3 + intensity * 0.4})`}
              strokeWidth={3 + intensity * 4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {trail.map(([xM, yM], i) => {
              const { x, y } = pitchToSvg(xM, yM, svgW, svgH, padding);
              return (
                <circle key={i} cx={x} cy={y} r={i === 0 ? 5 : 3}
                  fill={i === 0 ? 'rgba(251,146,60,0.9)' : 'rgba(251,146,60,0.4)'} />
              );
            })}
            <text
              x={pitchToSvg(trail[0][0], trail[0][1], svgW, svgH, padding).x + 8}
              y={pitchToSvg(trail[0][0], trail[0][1], svgW, svgH, padding).y - 6}
              fontSize={8} fill="rgba(251,146,60,0.95)" fontWeight="700">
              #{player.playerNumber}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function AnalyticsPage() {
  const [mode, setMode] = useState<VisualizerMode>('shots');
  const [selectedMatchId, setSelectedMatchId] = useState<string>('m-4'); // PDS default
  const [teamFilter, setTeamFilter] = useState<TeamFilter>('Both');
  const [hoveredShot, setHoveredShot] = useState<ShotDetail | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  const SVG_W = 840;
  const SVG_H = 560;
  const PADDING = 28;

  // Aggregate shots across matches
  const allShots = useMemo<ShotDetail[]>(() => {
    const sets: Record<string, ShotDetail[]> = {
      'm-4': DETAILED_SHOTS_LOG_PDS as ShotDetail[],
      'm-1': DETAILED_SHOTS_LOG_AQUINAS as ShotDetail[],
      'm-3': DETAILED_SHOTS_LOG_GEORGE as ShotDetail[],
    };
    return sets[selectedMatchId] ?? DETAILED_SHOTS_LOG_PDS as ShotDetail[];
  }, [selectedMatchId]);

  const completedMatches = PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Completed');

  const shotStats = useMemo(() => {
    const peddie = allShots.filter(s => s.team === 'Peddie');
    const opp = allShots.filter(s => s.team === 'Opponent');
    return {
      peddieShots: peddie.length,
      peddieGoals: peddie.filter(s => s.outcome === 'Goal').length,
      peddieXg: peddie.reduce((s, x) => s + x.xg, 0),
      oppShots: opp.length,
      oppGoals: opp.filter(s => s.outcome === 'Goal').length,
      oppXg: opp.reduce((s, x) => s + x.xg, 0),
    };
  }, [allShots]);

  const selectedMatch = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === selectedMatchId);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1829 50%, #071224 100%)' }}>
      {/* Header */}
      <div style={{ background: 'rgba(27,42,74,0.95)', borderBottom: '1px solid rgba(255,215,0,0.15)' }}
        className="sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">
                🎯 Pitch Analytics Studio
              </h1>
              <p className="text-gray-400 text-xs">Broadcast-Grade 2D Pitch Visualizer · 105m × 68m</p>
            </div>
          </div>

          {/* Match Selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedMatchId}
                onChange={(e) => setSelectedMatchId(e.target.value)}
                className="appearance-none text-sm font-medium px-4 py-2 pr-8 rounded-lg cursor-pointer"
                style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                {completedMatches.map(m => (
                  <option key={m.id} value={m.id} style={{ background: '#0d1829', color: 'white' }}>
                    vs {m.opponent.replace('The ', '').replace(' School', '')} ({m.peddieScore}-{m.opponentScore})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-yellow-400 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowLegend(!showLegend)}
              className="p-2 rounded-lg transition-colors"
              style={{ background: showLegend ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)', color: '#FFD700' }}>
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">

        {/* Mode Tabs */}
        <div className="flex gap-2 flex-wrap">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: active ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  color: active ? '#FFD700' : '#9CA3AF',
                  transform: active ? 'translateY(-1px)' : 'none',
                  boxShadow: active ? '0 4px 16px rgba(255,215,0,0.15)' : 'none',
                }}>
                <Icon className="w-4 h-4" />
                {m.label}
              </button>
            );
          })}

          {/* Team filter — only for shots */}
          {mode === 'shots' && (
            <div className="ml-auto flex items-center gap-1">
              {(['Both', 'Peddie', 'Opponent'] as TeamFilter[]).map(t => (
                <button key={t} onClick={() => setTeamFilter(t)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all"
                  style={{
                    background: teamFilter === t ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${teamFilter === t ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: teamFilter === t ? '#FFD700' : '#6B7280',
                  }}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main viz grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">

          {/* Pitch SVG */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(13,24,41,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <Crosshair className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-semibold text-sm">
                  {MODES.find(m => m.id === mode)?.label} ·{' '}
                  {selectedMatch ? `vs ${selectedMatch.opponent.replace('The ', '')}` : 'Season Aggregate'}
                </span>
              </div>
              <span className="text-gray-500 text-xs">
                {MODES.find(m => m.id === mode)?.description}
              </span>
            </div>

            <div className="p-2 overflow-x-auto">
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                style={{ width: '100%', maxWidth: SVG_W, height: 'auto', display: 'block' }}>

                <defs>
                  <filter id="blur-sm">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Pitch */}
                <PitchBackground svgW={SVG_W} svgH={SVG_H} padding={PADDING} />

                {/* Overlay layer */}
                {mode === 'shots' && (
                  <ShotChartOverlay
                    shots={allShots}
                    teamFilter={teamFilter}
                    svgW={SVG_W} svgH={SVG_H} padding={PADDING}
                    hoveredShot={hoveredShot}
                    onHover={setHoveredShot}
                  />
                )}

                {mode === 'passes' && (
                  <PassNetworkOverlay
                    passes={PASSING_NETWORK_PDS as PassingLink[]}
                    svgW={SVG_W} svgH={SVG_H} padding={PADDING}
                  />
                )}

                {mode === 'heatmap' && (
                  <XTHeatmapOverlay svgW={SVG_W} svgH={SVG_H} padding={PADDING} />
                )}

                {mode === 'telemetry' && (
                  <TelemetryOverlay
                    telemetry={PHYSICAL_TELEMETRY_PDS as PhysicalTelemetry[]}
                    svgW={SVG_W} svgH={SVG_H} padding={PADDING}
                  />
                )}

                {mode === 'xt' && (
                  <>
                    <XTHeatmapOverlay svgW={SVG_W} svgH={SVG_H} padding={PADDING} />
                    <ShotChartOverlay
                      shots={allShots.filter(s => s.outcome === 'Goal')}
                      teamFilter="Both"
                      svgW={SVG_W} svgH={SVG_H} padding={PADDING}
                      hoveredShot={null}
                      onHover={() => {}}
                    />
                  </>
                )}

                {/* Attack direction arrow */}
                <g opacity={0.4}>
                  <text x={PADDING + 10} y={PADDING - 8} fill="#FFD700" fontSize={9} fontWeight="600">
                    ← PEDDIE DEFENDS
                  </text>
                  <text x={SVG_W - PADDING - 80} y={PADDING - 8} fill="#22C55E" fontSize={9} fontWeight="600">
                    PEDDIE ATTACKS →
                  </text>
                </g>
              </svg>
            </div>

            {/* Shot tooltip */}
            {mode === 'shots' && hoveredShot && (
              <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold">{hoveredShot.playerName}</span>
                    <span className="text-gray-400 text-sm ml-2">{hoveredShot.minute}&apos;</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span style={{ color: hoveredShot.outcome === 'Goal' ? SUCCESS_GREEN : hoveredShot.outcome === 'Saved' ? PEDDIE_GOLD : DANGER_RED }} className="font-bold">
                      {hoveredShot.outcome}
                    </span>
                    <span className="text-gray-400">{hoveredShot.shotType}</span>
                    <span className="text-yellow-400 font-mono">xG: {hoveredShot.xg.toFixed(3)}</span>
                    <span className="text-gray-400">{hoveredShot.distanceYards}yd · {hoveredShot.angleDegrees}°</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right panel: stats & legend */}
          <div className="space-y-4">

            {/* Team xG comparison */}
            {mode === 'shots' && (
              <div className="rounded-2xl p-4 space-y-4" style={{ background: 'rgba(13,24,41,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-yellow-400" /> xG Summary
                </h3>
                {[
                  { team: 'Peddie', goals: shotStats.peddieGoals, xg: shotStats.peddieXg, shots: shotStats.peddieShots, color: PEDDIE_GOLD },
                  { team: 'Opponent', goals: shotStats.oppGoals, xg: shotStats.oppXg, shots: shotStats.oppShots, color: DANGER_RED },
                ].map(row => (
                  <div key={row.team}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm" style={{ color: row.color }}>{row.team}</span>
                      <span className="text-white font-bold">{row.goals}G · {row.xg.toFixed(2)} xG</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, (row.xg / 6) * 100)}%`, background: row.color }} />
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{row.shots} shots</div>
                  </div>
                ))}
              </div>
            )}

            {/* Legend */}
            {showLegend && (
              <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(13,24,41,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-yellow-400" /> Legend
                </h3>
                {mode === 'shots' && (
                  <div className="space-y-2 text-xs">
                    {[
                      { color: SUCCESS_GREEN, label: 'Goal', shape: 'circle' },
                      { color: PEDDIE_GOLD, label: 'Saved', shape: 'circle' },
                      { color: DANGER_RED, label: 'Off Target', shape: 'circle' },
                      { color: NEUTRAL_GRAY, label: 'Blocked', shape: 'circle' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: item.color, background: `${item.color}22` }} />
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-gray-600 ml-auto">bubble = xG</span>
                      </div>
                    ))}
                  </div>
                )}

                {mode === 'passes' && (
                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-1" style={{ background: PEDDIE_GOLD }} />
                      <span>Pass frequency (thicker = more passes)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-yellow-400" style={{ background: PEDDIE_NAVY }} />
                      <span>Player node (size = involvement)</span>
                    </div>
                  </div>
                )}

                {(mode === 'heatmap' || mode === 'xt') && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-3 rounded" style={{ background: 'linear-gradient(90deg, #4040ff, #ff1414)' }} />
                      <span className="text-gray-400">Low → High xT</span>
                    </div>
                    <p className="text-gray-600">Expected Threat = probability a possession in this zone leads to a goal</p>
                  </div>
                )}

                {mode === 'telemetry' && (
                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-2 rounded-full" style={{ background: 'rgba(251,146,60,0.8)' }} />
                      <span>Sprint trail (brighter = more intense)</span>
                    </div>
                    <p className="text-gray-600">Top 5 players by total distance covered</p>
                  </div>
                )}
              </div>
            )}

            {/* Quick stats cards */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Total xG', value: shotStats.peddieXg.toFixed(2), sub: 'Peddie created', color: PEDDIE_GOLD },
                { label: 'Shots', value: shotStats.peddieShots.toString(), sub: 'Peddie attempts', color: '#60A5FA' },
                { label: 'Conversion', value: `${((shotStats.peddieGoals / Math.max(1, shotStats.peddieShots)) * 100).toFixed(0)}%`, sub: 'Shot accuracy', color: SUCCESS_GREEN },
                { label: 'xG Diff', value: `+${(shotStats.peddieXg - shotStats.oppXg).toFixed(2)}`, sub: 'vs Opponent', color: '#A78BFA' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(13,24,41,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-white text-xs font-semibold">{stat.label}</div>
                  <div className="text-gray-500 text-xs">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
