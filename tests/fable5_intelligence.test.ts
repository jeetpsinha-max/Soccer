import { describe, it, expect } from 'vitest';
import { 
  FableIntelligenceEngine, 
  FABLE_SOCCER_PSYCH_ROSTER, 
  FABLE_FOOTBALL_PSYCH_ROSTER 
} from '../src/lib/fable-intelligence';

describe('Fable 5 Creative & Psychological Intelligence Suite', () => {
  describe('Player Psychological & Grit Profiles', () => {
    it('verifies all soccer psychological profiles have valid grit, clutch, and composure scores', () => {
      expect(FABLE_SOCCER_PSYCH_ROSTER.length).toBeGreaterThan(0);
      FABLE_SOCCER_PSYCH_ROSTER.forEach(p => {
        expect(p.gritScore).toBeGreaterThanOrEqual(80);
        expect(p.gritScore).toBeLessThanOrEqual(100);
        expect(p.clutchRating).toBeGreaterThanOrEqual(80);
        expect(p.clutchRating).toBeLessThanOrEqual(100);
        expect(p.composureGrade).toBeGreaterThanOrEqual(80);
        expect(p.composureGrade).toBeLessThanOrEqual(100);
        expect(p.fableNarrative.length).toBeGreaterThan(30);
        expect(p.clutchMoments.length).toBeGreaterThan(0);
      });
    });

    it('retrieves Christian Tharney (#13 Captain) profile by id, name, and number', () => {
      const byId = FableIntelligenceEngine.getPlayerPsychProfile('p-13');
      const byName = FableIntelligenceEngine.getPlayerPsychProfile('Tharney');
      const byNumber = FableIntelligenceEngine.getPlayerPsychProfile('13');

      expect(byId).toBeDefined();
      expect(byName).toBeDefined();
      expect(byNumber).toBeDefined();
      expect(byId?.name).toBe('Christian Tharney');
      expect(byId?.leadershipArchetype).toBe('Vocal Field General');
      expect(byId?.clutchRating).toBe(96);
    });

    it('retrieves Tommy Kim (#28 ST) profile and verifies clutch hat-trick narrative', () => {
      const tommy = FableIntelligenceEngine.getPlayerPsychProfile('Tommy Kim');
      expect(tommy).toBeDefined();
      expect(tommy?.number).toBe(28);
      expect(tommy?.clutchRating).toBe(98);
      expect(tommy?.fableNarrative).toContain('finishing');
    });

    it('retrieves August Cassidy (#10 Football LB) profile and verifies grit metrics', () => {
      const cassidy = FableIntelligenceEngine.getPlayerPsychProfile('August Cassidy');
      expect(cassidy).toBeDefined();
      expect(cassidy?.sport).toBe('FOOTBALL');
      expect(cassidy?.gritScore).toBe(99);
      expect(cassidy?.position).toContain('LB');
    });
  });

  describe('Fable 5 Tactical Dilemma Solver', () => {
    it('solves Haverford 4-3-3 high-press dilemma with psychological & spatial overload', () => {
      const resolution = FableIntelligenceEngine.solveTacticalDilemma('How do we break Haverford high press?', false);
      expect(resolution.opponent).toBe('The Haverford School');
      expect(resolution.artisticOverloadSolution).toContain('Asymmetrical Diamond Tilt');
      expect(resolution.momentumSwingIndex).toBeGreaterThan(20);
      expect(resolution.touchlineInspirationSpeech).toContain('Haverford');
    });

    it('solves Blair Day low-block dilemma with overload & blind-side wave', () => {
      const resolution = FableIntelligenceEngine.solveTacticalDilemma('Blair Day low block dilemma', false);
      expect(resolution.opponent).toBe('Blair Academy');
      expect(resolution.artisticOverloadSolution).toContain('Overload & Blind-Side Wave');
      expect(resolution.clutchPlayerAssignment).toContain('Mohiuddin');
      expect(resolution.momentumSwingIndex).toBe(32);
    });

    it('solves 4th-and-short football high-leverage scenario with Cassidy defensive havoc', () => {
      const resolution = FableIntelligenceEngine.solveTacticalDilemma('4th and 2 conversion decision', true);
      expect(resolution.opponent).toContain('Blair Academy');
      expect(resolution.clutchPlayerAssignment).toContain('August Cassidy');
      expect(resolution.momentumSwingIndex).toBe(35);
      expect(resolution.touchlineInspirationSpeech).toContain('Peddie Football');
    });
  });
});
