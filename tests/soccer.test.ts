import { describe, it, expect } from 'vitest';
import { PEDDIE_ROSTER_2026_2027, PEDDIE_SCHEDULE_2026_2027, FORMATIONS_CONFIG, MATCH_EVENTS_LIVE_BLAIR } from '../src/lib/soccer-data';
import { SoccerCsvEngine } from '../src/lib/soccer-csv-engine';
import { SoccerTacticalAgent } from '../src/lib/agents/soccer-agents';

describe('Peddie Soccer Gridiron 2026-2027 Core Engine', () => {
  it('validates active varsity roster integrity, zero 2026 graduates, and 4 new captains', () => {
    // 1. Ensure zero players with gradYear 2026 (they graduated)
    const classOf2026 = PEDDIE_ROSTER_2026_2027.filter(p => p.gradYear === 2026);
    expect(classOf2026.length).toBe(0);

    // 2. Official 4 new captains: Christian (#5), Rayyaan (#14), Noah (#3), Tommy (#10)
    const captains = PEDDIE_ROSTER_2026_2027.filter(p => p.isCaptain);
    expect(captains.length).toBe(4);
    const captainNames = captains.map(c => c.name);
    expect(captainNames).toContain('Christian Tharney');
    expect(captainNames).toContain('Rayyaan Mohiuddin');
    expect(captainNames).toContain('Noah Eldessouky');
    expect(captainNames).toContain('Tommy Kim');

    // 3. Number 8 is Owen Bonchev (starting LCM in diamond); Massimo did not play in opener (DNP)
    const owen = PEDDIE_ROSTER_2026_2027.find(p => p.number === 8);
    expect(owen).toBeDefined();
    expect(owen?.name).toBe('Owen Bonchev');
    expect(owen?.position).toBe('CM');

    const massimo = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Massimo Sheinin');
    expect(massimo).toBeDefined();
    expect(massimo?.recruitmentNotes).toContain('DNP');

    // 4. Number 10 is Quinn Wachtveitl; Tommy Kim is #28 (Captain)
    const quinn = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Quinn Wachtveitl');
    expect(quinn).toBeDefined();
    expect(quinn?.number).toBe(10);

    const tommy = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Tommy Kim');
    expect(tommy).toBeDefined();
    expect(tommy?.number).toBe(28);
    expect(tommy?.isCaptain).toBe(true);

    // 5. Noah Eldessouky is #12; No player has jersey #3; Connor Mahoney is not on the team
    const noah = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Noah Eldessouky');
    expect(noah).toBeDefined();
    expect(noah?.number).toBe(12);
    expect(noah?.isCaptain).toBe(true);

    const number3 = PEDDIE_ROSTER_2026_2027.find(p => p.number === 3);
    expect(number3).toBeUndefined();

    const mahoney = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes('Mahoney'));
    expect(mahoney).toBeUndefined();

    // 6. Validate 4-4-2 Diamond Midfield system
    const diamond = FORMATIONS_CONFIG['4-4-2'];
    expect(diamond.name).toContain('4-4-2 Diamond Midfield');
    const diamondNodes = diamond.nodes;
    expect(diamondNodes.length).toBe(11);
    const lbNoah = diamondNodes.find(n => n.playerNumber === 12);
    expect(lbNoah?.playerName).toBe('Eldessouky (C)');
    const rbChen = diamondNodes.find(n => n.playerNumber === 17);
    expect(rbChen?.playerName).toBe('Chen');
    const cbQuinn = diamondNodes.find(n => n.playerNumber === 10);
    expect(cbQuinn?.playerName).toBe('Wachtveitl');
    const lcm = diamondNodes.find(n => n.playerNumber === 8);
    expect(lcm?.playerName).toBe('Bonchev');
    const cdm = diamondNodes.find(n => n.position === 'CDM');
    expect(cdm?.role).toContain('Diamond Base');
    const cam = diamondNodes.find(n => n.position === 'CAM');
    expect(cam?.role).toContain('Diamond Tip');
    expect(cam?.playerName).toContain('Kim');
    expect(cam?.playerNumber).toBe(28);
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
    expect(csv).toContain('Tommy Kim');
    expect(csv).toContain('Blake Romanelli');

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

  it('validates Official First Game vs The Haverford School on Veo AI Video', async () => {
    const { MATCH_EVENTS_VEO_HAVERFORD } = await import('../src/lib/soccer-data');
    
    // 1. Fixture m-0 is in schedule
    const firstGame = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === 'm-0');
    expect(firstGame).toBeDefined();
    expect(firstGame?.opponent).toBe('The Haverford School');
    expect(firstGame?.matchDate).toBe('Sept 1, 2026');
    expect(firstGame?.status).toBe('Completed');
    expect(firstGame?.videoUrl).toBe('https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/');
    expect(firstGame?.peddieScore).toBe(0);
    expect(firstGame?.opponentScore).toBe(5);

    // 2. Curated Veo highlights
    expect(MATCH_EVENTS_VEO_HAVERFORD).toBeDefined();
    expect(MATCH_EVENTS_VEO_HAVERFORD.length).toBe(18);

    // 3. Exactly 5 goals from the match
    const goals = MATCH_EVENTS_VEO_HAVERFORD.filter(e => e.type === 'Goal');
    expect(goals.length).toBe(5);

    // 4. Video URLs and thumbnails all point to Veo CDN
    MATCH_EVENTS_VEO_HAVERFORD.forEach(e => {
      expect(e.videoUrl).toMatch(/https:\/\/c\.veocdn\.com/);
      expect(e.thumbnailUrl).toBeTruthy();
      expect(e.period).toBeGreaterThanOrEqual(1);
      expect(e.period).toBeLessThanOrEqual(4);
    });

    // 5. NLP filtering on Veo events
    const kimEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage('kim', MATCH_EVENTS_VEO_HAVERFORD);
    expect(kimEvents.length).toBeGreaterThan(0);
    const mckenzieEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage('mckenzie', MATCH_EVENTS_VEO_HAVERFORD);
    expect(mckenzieEvents.length).toBeGreaterThan(0);
  });
});
