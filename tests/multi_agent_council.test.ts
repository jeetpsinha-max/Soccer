import { describe, it, expect } from 'vitest';
import { 
  SoccerTacticalAgent, 
  TacticalDebateSession, 
  PlaybookRoutine, 
  SimState 
} from '../src/lib/agents/soccer-agents';
import { 
  PEDDIE_ROSTER_2026_2027, 
  PEDDIE_SCHEDULE_2026_2027, 
  PEDDIE_SEASON_TEAM_STATS_2026 
} from '../src/lib/soccer-data';

describe('Multi-Agent Tactical Council & Playbook Studio Engine', () => {
  // ==========================================================================
  // 1. Council Debate & Multi-Agent Consensus Tests
  // ==========================================================================

  it('validates 4 distinct agent personas (Fable 5, Grok, GPT, Kimi) in tactical debate sessions', () => {
    const session = SoccerTacticalAgent.getCouncilDebate('blair-low-block');
    expect(session).toBeDefined();
    expect(session.scenarioId).toBe('blair-low-block');
    expect(session.opponent).toBe('Blair Academy');
    expect(session.urgency).toBe('CRITICAL');

    // Exactly 4 agents in council
    expect(session.statements.length).toBe(4);
    const agentIds = session.statements.map(s => s.agentId);
    expect(agentIds).toContain('fable-5');
    expect(agentIds).toContain('grok');
    expect(agentIds).toContain('gpt');
    expect(agentIds).toContain('kimi');

    // Fable 5 Creative Strategist
    const fable = session.statements.find(s => s.agentId === 'fable-5');
    expect(fable?.agentName).toContain('Fable 5');
    expect(fable?.specialty).toContain('Spatial');
    expect(fable?.confidenceScore).toBeGreaterThanOrEqual(85);
    expect(fable?.philosophy.length).toBeGreaterThan(20);
    expect(fable?.recommendedTactic.length).toBeGreaterThan(15);

    // Grok Counter-Tactics & Press Breakers
    const grok = session.statements.find(s => s.agentId === 'grok');
    expect(grok?.agentName).toContain('Grok');
    expect(grok?.specialty).toContain('Counter-Tactics');
    expect(grok?.recommendedTactic).toContain('PPDA');
    expect(grok?.confidenceScore).toBeGreaterThanOrEqual(90);

    // GPT Positional Architecture
    const gpt = session.statements.find(s => s.agentId === 'gpt');
    expect(gpt?.agentName).toContain('GPT');
    expect(gpt?.specialty).toContain('Architecture');
    expect(gpt?.recommendedTactic).toContain('Routine');

    // Kimi Deep Video Telemetry & Scouting Archive
    const kimi = session.statements.find(s => s.agentId === 'kimi');
    expect(kimi?.agentName).toContain('Kimi');
    expect(kimi?.specialty).toContain('Film');
    expect(kimi?.philosophy).toContain('Blair film');

    // Unified Consensus Directive
    expect(session.consensusDirective).toBeDefined();
    expect(session.consensusDirective.headline).toContain('Consensus');
    expect(session.consensusDirective.primaryAction.length).toBeGreaterThan(30);
    expect(session.consensusDirective.substitutions.length).toBeGreaterThanOrEqual(2);
    expect(session.consensusDirective.pressingTrigger.length).toBeGreaterThan(15);
    expect(session.consensusDirective.setPieceDirective.length).toBeGreaterThan(15);
    expect(session.consensusDirective.expectedXgSwing).toContain('xG');
  });

  it('validates preset scenarios for Life Center Academy and Pennington School', () => {
    // Life Center
    const lcaSession = SoccerTacticalAgent.getCouncilDebate('life-center-flanks');
    expect(lcaSession.opponent).toBe('Life Center Academy');
    expect(lcaSession.statements.length).toBe(4);
    expect(lcaSession.consensusDirective.primaryAction).toContain('Santos');

    // Pennington
    const penSession = SoccerTacticalAgent.getCouncilDebate('pennington-set-pieces');
    expect(penSession.opponent).toBe('The Pennington School');
    expect(penSession.statements.length).toBe(4);
    expect(penSession.consensusDirective.primaryAction.toLowerCase()).toContain('zonal');
  });

  it('generates customized dynamic debate sessions for any scheduled opponent', () => {
    const customSession = SoccerTacticalAgent.getCouncilDebate('custom-lawrenceville', 'The Lawrenceville School', 'Need high press trap on their playmaker');
    expect(customSession.opponent).toBe('The Lawrenceville School');
    expect(customSession.statements.length).toBe(4);
    expect(customSession.consensusDirective.headline).toContain('Lawrenceville');
  });

  // ==========================================================================
  // 2. Playbook Studio & Choreographed Routines Tests
  // ==========================================================================

  it('validates animated playbook routines and pitch coordinate validity', () => {
    const routines = SoccerTacticalAgent.PLAYBOOK_ROUTINES;
    expect(routines.length).toBeGreaterThanOrEqual(3);

    routines.forEach(routine => {
      expect(routine.id).toBeDefined();
      expect(routine.title).toBeDefined();
      expect(routine.successRatePct).toBeGreaterThan(30);
      expect(routine.expectedXG).toBeGreaterThan(0.2);
      expect(routine.keyPersonnel.length).toBeGreaterThanOrEqual(3);
      expect(routine.steps.length).toBeGreaterThanOrEqual(3);

      routine.steps.forEach(step => {
        expect(step.stepIndex).toBeGreaterThanOrEqual(0);
        expect(step.label).toBeDefined();
        expect(step.description).toBeDefined();
        expect(step.durationMs).toBeGreaterThan(500);

        // Ball position within pitch bounds (0-100%)
        expect(step.ballPosition.xPct).toBeGreaterThanOrEqual(0);
        expect(step.ballPosition.xPct).toBeLessThanOrEqual(100);
        expect(step.ballPosition.yPct).toBeGreaterThanOrEqual(0);
        expect(step.ballPosition.yPct).toBeLessThanOrEqual(100);

        // Players on pitch have valid coordinates
        expect(step.peddiePlayers.length).toBeGreaterThanOrEqual(10);
        step.peddiePlayers.forEach(p => {
          expect(p.playerNumber).toBeGreaterThan(0);
          expect(p.playerName).toBeDefined();
          expect(p.xPct).toBeGreaterThanOrEqual(0);
          expect(p.xPct).toBeLessThanOrEqual(100);
          expect(p.yPct).toBeGreaterThanOrEqual(0);
          expect(p.yPct).toBeLessThanOrEqual(100);
        });

        // Opponents on pitch
        expect(step.opponentDefenders.length).toBeGreaterThanOrEqual(1);
      });
    });

    // Verify specific key routines
    const nearPostCorner = routines.find(r => r.id === 'routine-corner-near-post');
    expect(nearPostCorner).toBeDefined();
    expect(nearPostCorner?.keyPersonnel.some(k => k.includes('Tharney'))).toBe(true);
    expect(nearPostCorner?.keyPersonnel.some(k => k.includes('Wiley'))).toBe(true);

    const pressBreak = routines.find(r => r.id === 'routine-press-break-left');
    expect(pressBreak).toBeDefined();
    expect(pressBreak?.keyPersonnel.some(k => k.includes('Eldessouky'))).toBe(true);
    expect(pressBreak?.keyPersonnel.some(k => k.includes('Sinha'))).toBe(true);
  });

  // ==========================================================================
  // 3. Matchday Simulator Engine Tests
  // ==========================================================================

  it('validates simulation initialization, clock stepping, and full-time completion', () => {
    let state = SoccerTacticalAgent.initSimulation('Life Center Academy');
    expect(state.currentMinute).toBe(0);
    expect(state.peddieScore).toBe(0);
    expect(state.opponentScore).toBe(0);
    expect(state.peddieXg).toBe(0);
    expect(state.isFinished).toBe(false);
    expect(state.tacticalStance).toBe('HIGH_PRESS_DIAMOND');
    expect(state.events.length).toBe(1);

    // Step simulation through 80 regulation minutes
    while (!state.isFinished && state.currentMinute < 80) {
      state = SoccerTacticalAgent.simulateNextMinute(state, 'Life Center Academy');
    }

    expect(state.currentMinute).toBeGreaterThanOrEqual(80);
    expect(state.isFinished).toBe(true);
    expect(state.events.length).toBeGreaterThan(1);
    expect(state.events[state.events.length - 1].type).toBe('Tactical Shift');
    expect(state.events[state.events.length - 1].player).toBe('Official Whistle');
  });

  // ==========================================================================
  // 4. Ground-Truth Match Center & Team Stats Consistency
  // ==========================================================================

  it('validates verified 2026 scorelines and zero discrepancies in team totals', () => {
    // 5 completed matches
    const completed = PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Completed');
    expect(completed.length).toBe(5);

    // Haverford: 0-5 L
    const haverford = completed.find(m => m.id === 'm-0');
    expect(haverford?.peddieScore).toBe(0);
    expect(haverford?.opponentScore).toBe(5);

    // Aquinas: 3-2 W
    const aquinas = completed.find(m => m.id === 'm-1');
    expect(aquinas?.peddieScore).toBe(3);
    expect(aquinas?.opponentScore).toBe(2);

    // Trenton Central: 2-3 L
    const trenton = completed.find(m => m.id === 'm-2');
    expect(trenton?.peddieScore).toBe(2);
    expect(trenton?.opponentScore).toBe(3);

    // George School: 5-2 W
    const george = completed.find(m => m.id === 'm-3');
    expect(george?.peddieScore).toBe(5);
    expect(george?.opponentScore).toBe(2);

    // Princeton Day School (PDS): 7-1 W
    const pds = completed.find(m => m.id === 'm-4');
    expect(pds?.peddieScore).toBe(7);
    expect(pds?.opponentScore).toBe(1);

    // Season Totals: 3 wins, 2 losses, 17 goals scored, 13 conceded
    const totalGoalsScored = completed.reduce((sum, m) => sum + (m.peddieScore || 0), 0);
    const totalGoalsConceded = completed.reduce((sum, m) => sum + (m.opponentScore || 0), 0);
    expect(totalGoalsScored).toBe(17);
    expect(totalGoalsConceded).toBe(13);

    expect(PEDDIE_SEASON_TEAM_STATS_2026.goalsScored).toBe(17);
    expect(PEDDIE_SEASON_TEAM_STATS_2026.goalsConceded).toBe(13);
    expect(PEDDIE_SEASON_TEAM_STATS_2026.wins).toBe(3);
    expect(PEDDIE_SEASON_TEAM_STATS_2026.losses).toBe(2);

    // All 4 team captains verified
    const captains = PEDDIE_ROSTER_2026_2027.filter(p => p.isCaptain);
    expect(captains.length).toBe(4);
    const captainNumbers = captains.map(c => c.number);
    expect(captainNumbers).toContain(13); // Tharney
    expect(captainNumbers).toContain(14); // Mohiuddin
    expect(captainNumbers).toContain(12); // Eldessouky
    expect(captainNumbers).toContain(28); // Kim
  });
});
