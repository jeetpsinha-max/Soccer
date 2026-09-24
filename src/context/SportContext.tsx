'use client';

// ============================================================================
// Peddie Athletics SAC — Master Multi-Sport State Context Provider
// Synchronizes active sport (Football vs Soccer) across all pages
// ============================================================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type SportId = 'soccer' | 'football';

interface SportContextType {
  activeSport: SportId;
  setSport: (sport: SportId) => void;
  isSoccer: boolean;
  isFootball: boolean;
  toggleSport: () => void;
}

const SportContext = createContext<SportContextType | undefined>(undefined);

const LOCAL_STORAGE_SPORT_KEY = 'peddie_sac_active_sport';

export function SportProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Detect sport from route pathname or fallback
  const getInitialSport = (): SportId => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/football')) {
        return 'football';
      }
      const saved = localStorage.getItem(LOCAL_STORAGE_SPORT_KEY) as SportId;
      if (saved === 'football' || saved === 'soccer') {
        return saved;
      }
    }
    return pathname.startsWith('/football') ? 'football' : 'soccer';
  };

  const [activeSport, setActiveSportState] = useState<SportId>(getInitialSport);

  useEffect(() => {
    if (pathname.startsWith('/football')) {
      setActiveSportState('football');
      localStorage.setItem(LOCAL_STORAGE_SPORT_KEY, 'football');
    } else if (pathname.startsWith('/dashboard') || pathname === '/') {
      // If navigating to soccer routes
      if (!pathname.startsWith('/football')) {
        setActiveSportState('soccer');
        localStorage.setItem(LOCAL_STORAGE_SPORT_KEY, 'soccer');
      }
    }
  }, [pathname]);

  const setSport = (sport: SportId) => {
    setActiveSportState(sport);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_SPORT_KEY, sport);
    }
    if (sport === 'football' && !pathname.startsWith('/football')) {
      router.push('/football');
    } else if (sport === 'soccer' && pathname.startsWith('/football')) {
      router.push('/');
    }
  };

  const toggleSport = () => {
    setSport(activeSport === 'soccer' ? 'football' : 'soccer');
  };

  return (
    <SportContext.Provider
      value={{
        activeSport,
        setSport,
        isSoccer: activeSport === 'soccer',
        isFootball: activeSport === 'football',
        toggleSport
      }}
    >
      {children}
    </SportContext.Provider>
  );
}

export function useSport() {
  const context = useContext(SportContext);
  if (!context) {
    throw new Error('useSport must be used within a SportProvider');
  }
  return context;
}
