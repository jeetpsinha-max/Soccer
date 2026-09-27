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
  Sparkles,
  Sliders,
  Radio,
  Swords,
  Home,
  User,
  Crosshair,
  ListChecks,
  FileText
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { isLiveMatch, selectedMatch } = useSeason();
  const isFootball = pathname.startsWith('/football');

  const soccerNavItems = [
    { label: 'Match Center', href: '/', icon: Activity },
    { label: 'AI War Room', href: '/dashboard/war-room', icon: Sparkles },
    { label: 'Playbook Studio', href: '/dashboard/playbook', icon: Layers },
    { label: 'Touchline Simulator', href: '/dashboard/simulator', icon: Radio },
    { label: 'Data Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Tactics & Pitch', href: '/dashboard/tactics', icon: Sliders },
    { label: 'Call Sheet', href: '/dashboard/call-sheet', icon: ClipboardList },
    { label: 'Player Portal', href: '/dashboard/player-portal', icon: Users },
    { label: 'Match Film', href: '/dashboard/match-film', icon: Film },
    { label: 'Opponent Scouting', href: '/dashboard/scouting', icon: Compass },
    { label: 'Schedule', href: '/dashboard/schedule', icon: Calendar }
  ];

  const footballNavItems = [
    { label: 'Cockpit', href: '/football', icon: Home },
    { label: 'Film Room', href: '/football/film-room', icon: Film },
    { label: 'Call Sheet', href: '/football/call-sheet', icon: Crosshair },
    { label: 'Player Portal', href: '/football/player-portal', icon: User },
    { label: 'AI Offensive Coach', href: '/football/offensive-coach', icon: Swords },
    { label: 'Player Tracker', href: '/football/players', icon: Users },
    { label: 'Analytics & ML', href: '/football/analytics', icon: BarChart3 },
    { label: 'Reports', href: '/football/reports', icon: FileText }
  ];

  const activeNavItems = isFootball ? footballNavItems : soccerNavItems;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 px-3 lg:px-6 py-2.5 no-print shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Crest */}
        <div className="flex items-center gap-3">
          <Link href={isFootball ? '/football' : '/'} className="flex items-center gap-3 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
              isFootball 
                ? 'bg-gradient-to-br from-amber-500 to-amber-700 shadow-amber-500/20 text-slate-950' 
                : 'bg-gradient-to-br from-[#002147] to-[#001226] border border-amber-400/60 shadow-amber-500/10 text-amber-400'
            }`}>
              {isFootball ? <Shield className="w-5 h-5 text-slate-950 fill-current" /> : <span className="font-black text-xl tracking-tighter">P</span>}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm lg:text-base tracking-wide flex items-center gap-1.5">
                  PEDDIE {isFootball ? 'FOOTBALL' : 'SOCCER'} <span className="text-amber-400">SAC</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  GRIDIRON v2.0
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                The Peddie School Varsity {isFootball ? 'Football' : 'Soccer'} • MAPL Conference
              </div>
            </div>
          </Link>
        </div>

        {/* Master Sport Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all ${
              !isFootball
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚽ Soccer SAC</span>
          </Link>
          <Link
            href="/football"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all ${
              isFootball
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏈 Football SAC</span>
          </Link>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none w-full lg:w-auto order-last lg:order-none">
          {activeNavItems.map(item => {
            const Icon = item.icon;
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
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

        {/* Telemetry Status / Season Badge */}
        <div className="flex items-center gap-2">
          {isFootball ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>2025–2026 Varsity (5-4 MAPL)</span>
            </div>
          ) : isLiveMatch ? (
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
        </div>
      </div>
    </header>
  );
};
