import { describe, it, expect } from 'vitest';
import { parseHeightInInches, calculateDuelMatchup } from '../src/lib/duel-engine';
import { TacticalAudio } from '../src/lib/audio-synthesizer';
import { PEDDIE_ROSTER_2026_2027, PEDDIE_SCHEDULE_2026_2027 } from '../src/lib/soccer-data';
import { OPPONENT_PLAYER_SCOUTING_REPORTS, ALL_OPPONENT_PLAYER_REPORTS } from '../src/lib/opponent-players-data';

describe('Duel Engine & Tactical Intelligence Tests', () => {
  it('should accurately parse height strings into total inches', () => {
    expect(parseHeightInInches("6'2\"")).toBe(74);
    expect(parseHeightInInches("5'11\"")).toBe(71);
    expect(parseHeightInInches("6'0\"")).toBe(72);
    expect(parseHeightInInches("5'9\"")).toBe(69);
    expect(parseHeightInInches("")).toBe(70); // default fallback
    expect(parseHeightInInches(undefined)).toBe(70); // default fallback
  });

  it('should compute head-to-head duel matchups with 5 dimensions', () => {
    const tharney = PEDDIE_ROSTER_2026_2027.find(p => p.number === 13);
    expect(tharney).toBeDefined();

    const deAngelis = OPPONENT_PLAYER_SCOUTING_REPORTS['haverford']?.find(p => p.number === 10);
    expect(deAngelis).toBeDefined();

    if (tharney && deAngelis) {
      const duel = calculateDuelMatchup(tharney, deAngelis);
      
      expect(duel.winProbabilityPct).toBeGreaterThanOrEqual(18);
      expect(duel.winProbabilityPct).toBeLessThanOrEqual(94);
      expect(duel.keyBattleground).toBeTruthy();
      expect(duel.coachNazarioDirective).toBeTruthy();

      // Check all 5 dimensions
      expect(duel.dimensions.pace.peddieScore).toBeGreaterThan(0);
      expect(duel.dimensions.aerial.peddieScore).toBeGreaterThan(0);
      expect(duel.dimensions.groundContest.peddieScore).toBeGreaterThan(0);
      expect(duel.dimensions.tacticalIQ.peddieScore).toBeGreaterThan(0);
      expect(duel.dimensions.pressResistance.peddieScore).toBeGreaterThan(0);

      // Check council breakdown
      expect(duel.councilBreakdown.fableNarrative).toContain('Christian Tharney');
      expect(duel.councilBreakdown.grokEdge).toContain('Analytical edge');
      expect(duel.councilBreakdown.gptStructure).toContain('Structural recommendation');
      expect(duel.councilBreakdown.kimiFilmScout).toContain('Veo film');
    }
  });

  it('should evaluate defensive center-back duel vs elite striker correctly', () => {
    const wiley = PEDDIE_ROSTER_2026_2027.find(p => p.number === 22);
    expect(wiley).toBeDefined();

    const vance = OPPONENT_PLAYER_SCOUTING_REPORTS['haverford']?.find(p => p.number === 9);
    expect(vance).toBeDefined();

    if (wiley && vance) {
      const duel = calculateDuelMatchup(wiley, vance);
      expect(duel.keyBattleground).toBe('Box Entry & First-Time Physical Stoppage');
      expect(duel.outcomeTier).toBeDefined();
    }
  });

  it('should evaluate all 85 opponent players without throwing errors', () => {
    expect(ALL_OPPONENT_PLAYER_REPORTS.length).toBe(85);
    const testPeddie = PEDDIE_ROSTER_2026_2027[0];

    for (const opp of ALL_OPPONENT_PLAYER_REPORTS) {
      const result = calculateDuelMatchup(testPeddie, opp);
      expect(result.winProbabilityPct).toBeGreaterThanOrEqual(18);
      expect(result.winProbabilityPct).toBeLessThanOrEqual(94);
    }
  });
});

describe('Tactical Audio Engine Safe Execution Tests', () => {
  it('should gracefully handle node environment without AudioContext crash', () => {
    expect(TacticalAudio.isMuted).toBe(false);

    // Should not throw in Node environment
    expect(() => TacticalAudio.playWhistle()).not.toThrow();
    expect(() => TacticalAudio.playKick()).not.toThrow();
    expect(() => TacticalAudio.playGoalCheer()).not.toThrow();
    expect(() => TacticalAudio.playPostClang()).not.toThrow();

    TacticalAudio.isMuted = true;
    expect(() => TacticalAudio.playWhistle()).not.toThrow();
    TacticalAudio.isMuted = false;
  });
});

describe('Peddie Canonical Ledger & Roster Integrity', () => {
  it('should verify exact 25 rostered athletes with zero 2026 graduates', () => {
    expect(PEDDIE_ROSTER_2026_2027.length).toBe(25);
    const grads2026 = PEDDIE_ROSTER_2026_2027.filter(p => p.gradYear === 2026);
    expect(grads2026.length).toBe(0);

    const captains = PEDDIE_ROSTER_2026_2027.filter(p => p.isCaptain);
    expect(captains.length).toBe(4);
    const captainNumbers = captains.map(c => c.number).sort((a, b) => a - b);
    expect(captainNumbers).toEqual([12, 13, 14, 28]);
  });

  it('should verify 5 completed matches with canonical scores and 17 GF / 13 GA', () => {
    const completed = PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Completed');
    expect(completed.length).toBe(5);

    const matchScores = completed.map(m => ({
      opp: m.opponent,
      score: `${m.peddieScore}-${m.opponentScore}`,
      result: (m.peddieScore ?? 0) > (m.opponentScore ?? 0) ? 'W' : (m.peddieScore ?? 0) < (m.opponentScore ?? 0) ? 'L' : 'D'
    }));

    expect(matchScores).toEqual([
      { opp: 'The Haverford School', score: '0-5', result: 'L' },
      { opp: 'St. Thomas Aquinas High School', score: '3-2', result: 'W' },
      { opp: 'Trenton Central High School', score: '2-3', result: 'L' },
      { opp: 'George School', score: '5-2', result: 'W' },
      { opp: 'Princeton Day School', score: '7-1', result: 'W' }
    ]);

    const totalGF = completed.reduce((sum, m) => sum + (m.peddieScore || 0), 0);
    const totalGA = completed.reduce((sum, m) => sum + (m.opponentScore || 0), 0);
    expect(totalGF).toBe(17);
    expect(totalGA).toBe(13);
  });
});
