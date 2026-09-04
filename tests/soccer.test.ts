import { describe, it, expect } from 'vitest';
import { PEDDIE_ROSTER_2026_2027, PEDDIE_SCHEDULE_2026_2027, FORMATIONS_CONFIG, MATCH_EVENTS_LIVE_BLAIR } from '../src/lib/soccer-data';
import { SoccerCsvEngine } from '../src/lib/soccer-csv-engine';
import { SoccerTacticalAgent } from '../src/lib/agents/soccer-agents';

describe('Peddie Soccer Gridiron 2026-2027 Core Engine', () => {
  it('validates official 24-player varsity roster integrity', () => {
    expect(PEDDIE_ROSTER_2026_2027.length).toBe(24);

    const captain = PEDDIE_ROSTER_2026_2027.find(p => p.number === 4);
    expect(captain).toBeDefined();
    expect(captain?.name).toBe('Julian Vance');
    expect(captain?.isCaptain).toBe(true);
    expect(captain?.overallRating).toBeGreaterThanOrEqual(90);

    const striker = PEDDIE_ROSTER_2026_2027.find(p => p.number === 9);
    expect(striker?.name).toBe('Dylan Morales');
    expect(striker?.goals).toBe(15);
  });

  it('validates MAPL Conference schedule and Peddie-Blair Day fixture', () => {
    expect(PEDDIE_SCHEDULE_2026_2027.length).toBeGreaterThanOrEqual(6);
    const blairFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.opponent.includes('Blair'));
    expect(blairFixture).toBeDefined();
    expect(blairFixture?.rivalryName).toContain('Peddie-Blair Day');
    expect(blairFixture?.status).toBe('Live');
  });

  it('verifies all tactical formations have exactly 11 player nodes and valid coordinates', () => {
    const formations = ['4-3-3', '4-2-3-1', '3-5-2', '4-4-2'];
    formations.forEach(f => {
      const cfg = FORMATIONS_CONFIG[f];
      expect(cfg).toBeDefined();
      expect(cfg.nodes.length).toBe(11);
      cfg.nodes.forEach(node => {
        expect(node.xPct).toBeGreaterThanOrEqual(0);
        expect(node.xPct).toBeLessThanOrEqual(100);
        expect(node.yPct).toBeGreaterThanOrEqual(0);
        expect(node.yPct).toBeLessThanOrEqual(100);
        expect(node.playerName).toBeTruthy();
      });
    });
  });

  it('tests SoccerCsvEngine serialization and deserialization roundtrip', () => {
    const csv = SoccerCsvEngine.exportToCsv(MATCH_EVENTS_LIVE_BLAIR);
    expect(csv).toContain('EVENT_ID,MINUTE,SECOND');
    expect(csv).toContain('Dylan Morales');

    const parsed = SoccerCsvEngine.parseCsv(csv);
    expect(parsed.length).toBe(MATCH_EVENTS_LIVE_BLAIR.length);
    expect(parsed[0].minute).toBe(MATCH_EVENTS_LIVE_BLAIR[0].minute);
    expect(parsed[0].playerName).toBe(MATCH_EVENTS_LIVE_BLAIR[0].playerName);
  });

  it('tests SoccerTacticalAgent NLP filter and opponent game planning', () => {
    const goalEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage('goal', MATCH_EVENTS_LIVE_BLAIR);
    expect(goalEvents.length).toBeGreaterThanOrEqual(2);
    expect(goalEvents.every(e => e.type === 'Goal')).toBe(true);

    const plan = SoccerTacticalAgent.generateTacticalPlan('Blair Academy');
    expect(plan.opponent).toContain('Blair');
    expect(plan.substitutionsRoadmap.length).toBeGreaterThan(0);
    expect(plan.predictedOutcome.winProbabilityPct).toBeGreaterThan(50);
  });
});
