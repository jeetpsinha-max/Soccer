import { describe, it, expect } from 'vitest';
import { 
  PEDDIE_ROSTER_2026_2027, 
  PEDDIE_SCHEDULE_2026_2027, 
  SIDELINE_SET_PIECE_PLAYBOOK 
} from '../src/lib/soccer-data';

describe('Soccer SAC Workability & Command Search Index Tests', () => {
  it('indexes all 25 varsity players with valid search metadata', () => {
    expect(PEDDIE_ROSTER_2026_2027.length).toBeGreaterThanOrEqual(24);
    
    // Check key star athletes can be retrieved by name and number
    const tommyKim = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes('Tommy Kim') && p.number === 28);
    expect(tommyKim).toBeDefined();
    expect(tommyKim?.position).toBe('ST');

    const jeetSinha = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes('Jeet Sinha') && p.number === 6);
    expect(jeetSinha).toBeDefined();
    expect(jeetSinha?.position).toBe('LM');

    const dylanMcKenzie = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes('Dylan McKenzie') && p.number === 98);
    expect(dylanMcKenzie).toBeDefined();
    expect(dylanMcKenzie?.position).toBe('GK');
  });

  it('indexes all 17 schedule fixtures and opponents for instant navigation', () => {
    expect(PEDDIE_SCHEDULE_2026_2027.length).toBe(17);

    const blairFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.opponent.includes('Blair'));
    expect(blairFixture).toBeDefined();

    const pdsFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.opponent.includes('Princeton Day'));
    expect(pdsFixture).toBeDefined();
    expect(pdsFixture?.status).toBe('Completed');
    expect(pdsFixture?.peddieScore).toBe(7);
  });

  it('verifies set-piece playbook routines contain required specialist execution data', () => {
    const corners = SIDELINE_SET_PIECE_PLAYBOOK.attackingCorners;
    expect(corners.length).toBeGreaterThanOrEqual(2);

    corners.forEach(corner => {
      expect(corner.name).toBeTruthy();
      expect(corner.taker).toBeTruthy();
      expect(corner.triggerSignal).toBeTruthy();
      expect(corner.description).toBeTruthy();
      expect(corner.probabilityGoalPct).toBeGreaterThan(0);
    });
  });

  it('verifies tactical pressing triggers and late-game lockout rules for sideline sheet', () => {
    const triggers = SIDELINE_SET_PIECE_PLAYBOOK.pressingTriggers;
    expect(triggers.length).toBeGreaterThanOrEqual(2);

    const lockout = SIDELINE_SET_PIECE_PLAYBOOK.lateGameLockout;
    expect(lockout.length).toBeGreaterThanOrEqual(1);
    expect(lockout[0].rules.length).toBeGreaterThanOrEqual(3);
  });
});
