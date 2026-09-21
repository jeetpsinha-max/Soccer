'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSeason } from '@/context/SeasonContext';
import { PEDDIE_SCHEDULE_2026_2027 } from '@/lib/soccer-data';
import { 
  Shield, 
  Activity, 
  ClipboardList, 
  Users, 
  Film, 
  Compass, 
  Layers,
  BarChart3,
  Calendar,
  ChevronDown
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { season, setSeason, isLiveMatch, selectedMatch } = useSeason();

  const navItems = [
    { label: 'Match Center', href: '/', icon: Activity },
    { label: 'Upcoming Schedule', href: '/dashboard/schedule', icon: Calendar },
    { label: 'Data Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Tactics & Pitch', href: '/dashboard/tactics', icon: Layers },
    { label: 'Sideline Call Sheet', href: '/dashboard/call-sheet', icon: ClipboardList },
    { label: 'Player Portal', href: '/dashboard/player-portal', icon: Users },
    { label: 'Match Film Room', href: '/dashboard/match-film', icon: Film },
    { label: 'Opponent Scouting', href: '/dashboard/scouting', icon: Compass }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3 no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Crest */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002147] to-[#001226] border border-amber-400/60 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <span className="text-amber-400 font-black text-xl tracking-tighter">P</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5">
                PEDDIE SOCCER <span className="text-amber-400">SAC</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                GRIDIRON v2.0
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              The Peddie School Varsity Soccer • MAPL Conference
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-amber-500/20 text-white border border-cyan-400/40 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Telemetry Status & Season Selector */}
        <div className="flex items-center gap-3">
          {isLiveMatch ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE: vs {selectedMatch.opponent}</span>
            </div>
          ) : (
            (() => {
              const nextFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.status === 'Upcoming') || PEDDIE_SCHEDULE_2026_2027[5];
              return (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Next: {nextFixture.isHome ? 'vs' : '@'} {nextFixture.opponent} ({nextFixture.matchDate})</span>
                </div>
              );
            })()
          )}

          {/* Current Season Exclusive Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/40 text-xs font-bold text-amber-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>2026–2027 Current Season</span>
          </div>
        </div>
      </div>
    </header>
  );
};
