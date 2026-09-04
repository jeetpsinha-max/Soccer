'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SeasonId, FormationId, MatchFixture } from '@/lib/types';
import { PEDDIE_SCHEDULE_2026_2027 } from '@/lib/soccer-data';

interface SeasonContextType {
  season: SeasonId;
  setSeason: (s: SeasonId) => void;
  activeFormation: FormationId;
  setActiveFormation: (f: FormationId) => void;
  selectedMatch: MatchFixture;
  setSelectedMatch: (m: MatchFixture) => void;
  isLiveMatch: boolean;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [season, setSeasonState] = useState<SeasonId>('2026-2027');
  const [activeFormation, setActiveFormation] = useState<FormationId>('4-3-3');
  const [selectedMatch, setSelectedMatch] = useState<MatchFixture>(
    PEDDIE_SCHEDULE_2026_2027.find(m => m.status === 'Live') || PEDDIE_SCHEDULE_2026_2027[0]
  );

  useEffect(() => {
    const saved = localStorage.getItem('peddie_soccer_season');
    if (saved === '2024-2025' || saved === '2025-2026' || saved === '2026-2027') {
      setSeasonState(saved as SeasonId);
    }
  }, []);

  const setSeason = (s: SeasonId) => {
    setSeasonState(s);
    localStorage.setItem('peddie_soccer_season', s);
  };

  return (
    <SeasonContext.Provider
      value={{
        season,
        setSeason,
        activeFormation,
        setActiveFormation,
        selectedMatch,
        setSelectedMatch,
        isLiveMatch: selectedMatch.status === 'Live'
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
};

export function useSeason() {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
}
