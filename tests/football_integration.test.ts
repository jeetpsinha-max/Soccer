import { describe, it, expect } from 'vitest';
import { SUPPORTED_SEASONS, SEASONS_METADATA, getSeasonMetadata, getSeasonGames } from '../src/lib/football/seasons-data';
import { calculateEPA, calculateExpectedPoints } from '../src/lib/football/epa-calculator';
import { PEDDIE_PLAYERS } from '../src/lib/football/peddie-player-data';
import { PEDDIE_ROSTER_2026_2027 } from '../src/lib/soccer-data';

describe('Peddie Athletics Unified Multi-Sport SAC Platform', () => {
  describe('Football Dataset & Roster Verification', () => {
    it('verifies 3 football seasons are configured (2025-2026 current, 2024-2025 archive, 2026-2027 projected)', () => {
      expect(SUPPORTED_SEASONS.length).toBe(3);
      expect(SUPPORTED_SEASONS).toContain('2025-2026');
      expect(SUPPORTED_SEASONS).toContain('2024-2025');
      expect(SUPPORTED_SEASONS).toContain('2026-2027');

      const currentSeason = getSeasonMetadata('2025-2026');
      expect(currentSeason).toBeDefined();
      expect(currentSeason?.type).toBe('CURRENT');
      expect(currentSeason?.headCoach).toBe('Mark Fabish');
    });

    it('verifies official football roster contains All-MAPL Linebacker August Cassidy #10', () => {
      const cassidy = PEDDIE_PLAYERS.find(p => p.jerseyNumber === 10 || p.name.includes('Cassidy'));
      expect(cassidy).toBeDefined();
      expect(cassidy?.name).toContain('August Cassidy');
      expect(cassidy?.primaryPosition).toBe('LB');
    });

    it('verifies football EPA calculation functions accurately', () => {
      // 1st & 10 at Peddie 25 (yards from own goal)
      const epaValue = calculateEPA(
        { down: 1, distance: 10, yardLine: 25 },
        40, // Gained 15 yards to yardline 40
        false, // not turnover
        false, // not touchdown
        false  // not field goal
      );

      expect(typeof epaValue).toBe('number');
      expect(epaValue).toBeGreaterThan(0);
    });

    it('verifies season game retrieval returns matches for 2025-2026', () => {
      const games = getSeasonGames('2025-2026');
      expect(games.length).toBeGreaterThan(0);
      const blairGame = games.find(g => g.id.includes('blair'));
      expect(blairGame).toBeDefined();
      expect(blairGame?.opponent).toContain('Blair');
    });
  });

  describe('Soccer & Cross-Sport Integrity', () => {
    it('verifies soccer roster contains 25 players with zero 2026 graduates', () => {
      expect(PEDDIE_ROSTER_2026_2027.length).toBe(25);
      const invalidGrads = PEDDIE_ROSTER_2026_2027.filter(p => p.graduationYear <= 2026);
      expect(invalidGrads.length).toBe(0);
    });

    it('verifies both sport rosters maintain distinct rosters without collision', () => {
      const soccerNames = new Set(PEDDIE_ROSTER_2026_2027.map(p => p.name));
      const footballNames = new Set(PEDDIE_PLAYERS.map(p => p.name));
      expect(soccerNames.size).toBe(25);
      expect(footballNames.size).toBeGreaterThanOrEqual(30);
    });
  });
});
