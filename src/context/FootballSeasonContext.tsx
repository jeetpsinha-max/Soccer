'use client';

// ============================================================================
// Peddie Football Analytics — Season State Context Provider
// Synchronizes active season across all routes & persists to localStorage / URL
// ============================================================================

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  SeasonId,
  SeasonMetadata,
  GameSession,
  PlayerProfile,
  PlayAnalysis,
} from '@/types/football';
import {
  SUPPORTED_SEASONS,
  DEFAULT_SEASON,
  SEASONS_LIST,
  getSeasonMetadata,
  getSeasonGames,
  getSeasonRoster,
  getSeasonPlays,
  getSeasonKpis,
} from '@/lib/football/seasons-data';

interface FootballSeasonContextType {
  currentSeason: SeasonId;
  setSeason: (season: SeasonId) => void;
  seasonMetadata: SeasonMetadata;
  availableSeasons: SeasonMetadata[];
  games: GameSession[];
  plays: PlayAnalysis[];
  roster: PlayerProfile[];
  kpis: ReturnType<typeof getSeasonKpis>;
  isHistorical: boolean;
  isCurrent: boolean;
  isProjected: boolean;
}

const FootballSeasonContext = createContext<FootballSeasonContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'peddie_sac_football_season';

export function FootballSeasonProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from search param or localStorage or default
  const [currentSeason, setCurrentSeasonState] = useState<SeasonId>(DEFAULT_SEASON);

  // Sync state if URL query param or localStorage exists on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlSeason = new URLSearchParams(window.location.search).get('season') as SeasonId;
      if (urlSeason && SUPPORTED_SEASONS.includes(urlSeason)) {
        setCurrentSeasonState(urlSeason);
        return;
      }
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as SeasonId;
      if (saved && SUPPORTED_SEASONS.includes(saved)) {
        setCurrentSeasonState(saved);
      }
    }
  }, []);

  const setSeason = (season: SeasonId) => {
    if (!SUPPORTED_SEASONS.includes(season)) return;
    setCurrentSeasonState(season);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, season);
      const params = new URLSearchParams(window.location.search);
      params.set('season', season);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const seasonMetadata = useMemo(() => getSeasonMetadata(currentSeason), [currentSeason]);
  const availableSeasons = useMemo(() => SEASONS_LIST, []);
  const games = useMemo(() => getSeasonGames(currentSeason), [currentSeason]);
  const plays = useMemo(() => getSeasonPlays(currentSeason), [currentSeason]);
  const roster = useMemo(() => getSeasonRoster(currentSeason), [currentSeason]);
  const kpis = useMemo(() => getSeasonKpis(currentSeason), [currentSeason]);

  const value = useMemo<FootballSeasonContextType>(() => ({
    currentSeason,
    setSeason,
    seasonMetadata,
    availableSeasons,
    games,
    plays,
    roster,
    kpis,
    isHistorical: currentSeason === '2024-2025',
    isCurrent: currentSeason === '2025-2026',
    isProjected: currentSeason === '2026-2027',
  }), [currentSeason, seasonMetadata, availableSeasons, games, plays, roster, kpis]);

  return (
    <FootballSeasonContext.Provider value={value}>
      {children}
    </FootballSeasonContext.Provider>
  );
}

export function useFootballSeason() {
  const context = useContext(FootballSeasonContext);
  if (!context) {
    throw new Error('useFootballSeason must be used within a FootballSeasonProvider');
  }
  return context;
}

// Backwards-compatible aliases for football pages
export const SeasonProvider = FootballSeasonProvider;
export const useSeason = useFootballSeason;
