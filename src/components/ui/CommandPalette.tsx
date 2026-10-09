'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  X, 
  ArrowRight, 
  Activity, 
  Sliders, 
  Sparkles, 
  Radio, 
  ClipboardList, 
  Layers, 
  Users, 
  Film, 
  Compass, 
  BarChart3, 
  Calendar, 
  Printer, 
  FileText, 
  Shield, 
  Swords, 
  CornerUpRight, 
  Zap, 
  User, 
  Trophy, 
  Clock, 
  Flame, 
  HelpCircle,
  Command,
  ArrowUp,
  ArrowDown,
  CornerDownLeft
} from 'lucide-react';
import { 
  PEDDIE_ROSTER_2026_2027, 
  PEDDIE_SCHEDULE_2026_2027,
  SIDELINE_SET_PIECE_PLAYBOOK 
} from '@/lib/soccer-data';
import { TacticalAudio } from '@/lib/audio-synthesizer';

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tools' | 'Players' | 'Matches' | 'Set Pieces' | 'Actions';
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  keywords: string[];
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleOpenCustom = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenCustom);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenCustom);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Build searchable database
  const allCommands = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [
      // Quick Tactical Actions
      {
        id: 'action-print-call-sheet',
        title: 'Print Sideline Call Sheet',
        subtitle: '1-click optimized clipboard matrix with set-piece assignments & 80\'+ lockout',
        category: 'Actions',
        icon: Printer,
        badge: 'Sideline Tool',
        badgeColor: 'bg-amber-400 text-slate-950',
        keywords: ['print', 'call sheet', 'clipboard', 'sideline', 'pdf', 'lockout'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/call-sheet');
          setTimeout(() => {
            window.print();
          }, 600);
        }
      },
      {
        id: 'action-open-notes',
        title: 'Open Sideline Coach Scratchpad',
        subtitle: 'In-game adjustments, half-time talks & player feedback notes (Alt+N)',
        category: 'Actions',
        icon: FileText,
        badge: 'Coach Scratchpad',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30',
        keywords: ['notes', 'scratchpad', 'in-game', 'halftime', 'write', 'memo'],
        action: () => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent('open-sideline-scratchpad'));
        }
      },
      {
        id: 'action-open-council',
        title: 'Summon AI Tactical Council',
        subtitle: 'Multi-agent consensus debate (Fable 5, Grok Edge, GPT Structure, Kimi Focus)',
        category: 'Actions',
        icon: Sparkles,
        badge: '4 AI Minds',
        badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-400/30',
        keywords: ['council', 'ai', 'fable', 'grok', 'gpt', 'kimi', 'chat', 'war room', 'debate'],
        action: () => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent('open-council-drawer'));
        }
      },
      {
        id: 'action-switch-sport',
        title: 'Toggle Sport: Soccer ↔ Football',
        subtitle: 'Seamless switch between Falcon Varsity Soccer and Football SAC',
        category: 'Actions',
        icon: Swords,
        badge: 'Dual-Sport',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30',
        keywords: ['switch', 'sport', 'football', 'soccer', 'gridiron', 'cockpit'],
        action: () => {
          setIsOpen(false);
          if (window.location.pathname.startsWith('/football')) {
            router.push('/');
          } else {
            router.push('/football');
          }
        }
      },

      // Core Soccer Tools & Pages
      {
        id: 'tool-match-center',
        title: 'Match Center & Pitch Spatial Radar',
        subtitle: 'Regulation 105m x 68m pitch, live scorelines, events, and xG progression',
        category: 'Tools',
        icon: Activity,
        badge: 'Home',
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
        keywords: ['match center', 'home', 'radar', 'pitch', 'events', 'xg', 'radar', 'pds', 'george'],
        action: () => {
          setIsOpen(false);
          router.push('/');
        }
      },
      {
        id: 'tool-tactics',
        title: 'Tactics Lab & 4-4-2 Diamond Board',
        subtitle: 'Dynamic formation visualizer, half-space guidelines & player instructions',
        category: 'Tools',
        icon: Sliders,
        badge: 'Formation Engine',
        badgeColor: 'bg-cyan-500/20 text-cyan-300',
        keywords: ['tactics', 'formation', '4-4-2', 'diamond', 'lineup', 'system', 'board'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/tactics');
        }
      },
      {
        id: 'tool-war-room',
        title: 'AI Tactical War Room',
        subtitle: 'Multi-model tactical debate engine solving high-stakes match dilemmas',
        category: 'Tools',
        icon: Sparkles,
        badge: 'AI Debate',
        badgeColor: 'bg-amber-400/20 text-amber-300',
        keywords: ['war room', 'ai debate', 'dilemma', 'fable', 'tactical council'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/war-room');
        }
      },
      {
        id: 'tool-simulator',
        title: 'Touchline Simulator',
        subtitle: '80-minute match engine with real-time tactical stances, team talks & subs',
        category: 'Tools',
        icon: Radio,
        badge: '80-min Sim',
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
        keywords: ['simulator', 'touchline', 'sim', 'match simulation', 'live', 'stances'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/simulator');
        }
      },
      {
        id: 'tool-call-sheet',
        title: 'Sideline Call Sheet',
        subtitle: 'Print-ready clipboard matrix, set-piece roles, pressing cues & lockout protocol',
        category: 'Tools',
        icon: ClipboardList,
        badge: 'Print Ready',
        badgeColor: 'bg-amber-400 text-slate-950 font-black',
        keywords: ['call sheet', 'clipboard', 'sideline', 'print', 'specialists', 'lockout'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/call-sheet');
        }
      },
      {
        id: 'tool-playbook',
        title: 'Playbook Studio',
        subtitle: 'Interactive animated corner kicks, press-break triangles & free kick schemes',
        category: 'Tools',
        icon: Layers,
        badge: 'Animated',
        badgeColor: 'bg-cyan-500/20 text-cyan-300',
        keywords: ['playbook', 'corners', 'set piece', 'falcon claw', 'animation', 'free kick'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/playbook');
        }
      },
      {
        id: 'tool-player-portal',
        title: '24-Player Varsity Roster & Portals',
        subtitle: 'Player athletic telemetries, coach assignment scores (+/-/0), and duel engine',
        category: 'Tools',
        icon: Users,
        badge: 'Roster Intel',
        badgeColor: 'bg-purple-500/20 text-purple-300',
        keywords: ['player portal', 'roster', 'players', 'dossier', 'gps', 'speed', 'evaluations'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/player-portal');
        }
      },
      {
        id: 'tool-match-film',
        title: 'Match Film Room & Telestration HUD',
        subtitle: 'Broadcast video telestration with vector arrows, pressure zones, and Veo clips',
        category: 'Tools',
        icon: Film,
        badge: 'Video AI',
        badgeColor: 'bg-rose-500/20 text-rose-300',
        keywords: ['match film', 'film', 'video', 'telestration', 'veo', 'hud', 'replay'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/match-film');
        }
      },
      {
        id: 'tool-scouting',
        title: 'Opponent Scouting Hub',
        subtitle: 'MAPL opponent tactical dossiers, dangerous players, and defensive vulnerabilities',
        category: 'Tools',
        icon: Compass,
        badge: '17 Opponents',
        badgeColor: 'bg-indigo-500/20 text-indigo-300',
        keywords: ['scouting', 'opponents', 'blair', 'lawrenceville', 'hun', 'mapl', 'dossier'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/scouting');
        }
      },
      {
        id: 'tool-analytics',
        title: 'Data Analytics & xG / xT Matrix',
        subtitle: 'Expected Goals, Expected Threat, pass networks, and territory tilt models',
        category: 'Tools',
        icon: BarChart3,
        badge: 'Advanced Math',
        badgeColor: 'bg-teal-500/20 text-teal-300',
        keywords: ['analytics', 'xg', 'xt', 'field tilt', 'stats', 'data', 'metrics'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/analytics');
        }
      },
      {
        id: 'tool-schedule',
        title: 'Full 2026–2027 Varsity Schedule',
        subtitle: 'Complete 17-fixture calendar across MAPL conference and non-league showcase',
        category: 'Tools',
        icon: Calendar,
        badge: '17 Games',
        badgeColor: 'bg-slate-800 text-slate-300',
        keywords: ['schedule', 'calendar', 'fixtures', 'games', 'upcoming', 'dates'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/schedule');
        }
      },
      {
        id: 'tool-football',
        title: 'Peddie Football SAC Cockpit',
        subtitle: 'Hudl AI 1,280 plays breakdown, offensive coach, and 38-player football roster',
        category: 'Tools',
        icon: Shield,
        badge: 'Gridiron',
        badgeColor: 'bg-amber-500 text-slate-950 font-black',
        keywords: ['football', 'hudl', 'gridiron', 'touchdown', 'offensive coach', 'august cassidy'],
        action: () => {
          setIsOpen(false);
          router.push('/football');
        }
      }
    ];

    // Add All 25 Peddie Varsity Players
    PEDDIE_ROSTER_2026_2027.forEach(player => {
      const isCap = player.isCaptain ? ' • 👑 Captain' : '';
      const stats = `${player.position} #${player.number} • ${player.classYear}${isCap} • ${player.goals || 0}G, ${player.assists || 0}A, ${player.points || 0}P`;
      items.push({
        id: `player-${player.id}`,
        title: `${player.name} (#${player.number})`,
        subtitle: stats,
        category: 'Players',
        icon: User,
        badge: player.position,
        badgeColor: player.isCaptain ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-300',
        keywords: [
          player.name.toLowerCase(),
          `#${player.number}`,
          player.number.toString(),
          player.position.toLowerCase(),
          (player.tacticalRole || '').toLowerCase(),
          player.classYear.toLowerCase(),
          player.hometown.toLowerCase(),
          'player',
          'roster'
        ],
        action: () => {
          setIsOpen(false);
          router.push(`/dashboard/player-portal?player=${encodeURIComponent(player.id)}`);
        }
      });
    });

    // Add Opponents & Matches
    PEDDIE_SCHEDULE_2026_2027.forEach(match => {
      const result = match.status === 'Completed' ? `Result: ${match.peddieScore}-${match.opponentScore}` : `Upcoming: ${match.matchDate} at ${match.gameTime}`;
      items.push({
        id: `match-${match.id}`,
        title: `vs ${match.opponent}`,
        subtitle: `${match.isHome ? 'Home Field' : 'Away'} • ${result} • ${match.keySummary}`,
        category: 'Matches',
        icon: match.status === 'Completed' ? Trophy : Calendar,
        badge: match.status,
        badgeColor: match.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300',
        keywords: [
          match.opponent.toLowerCase(),
          match.opponentLogoText.toLowerCase(),
          match.matchDate.toLowerCase(),
          match.status.toLowerCase(),
          'match',
          'opponent',
          'game'
        ],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/scouting');
        }
      });
    });

    // Add Set-Piece Playbook Routines
    SIDELINE_SET_PIECE_PLAYBOOK.attackingCorners.forEach(c => {
      items.push({
        id: `corner-${c.name}`,
        title: `Corner: ${c.name}`,
        subtitle: `Taker: ${c.taker} • Signal: "${c.triggerSignal}" • ${c.description}`,
        category: 'Set Pieces',
        icon: CornerUpRight,
        badge: `${c.probabilityGoalPct}% xG`,
        badgeColor: 'bg-cyan-500/20 text-cyan-300',
        keywords: [c.name.toLowerCase(), c.taker.toLowerCase(), c.triggerSignal.toLowerCase(), 'corner', 'playbook', 'set piece'],
        action: () => {
          setIsOpen(false);
          router.push('/dashboard/playbook');
        }
      });
    });

    return items;
  }, [router]);

  // Filter commands based on search query & category filter
  const filteredCommands = useMemo(() => {
    let list = allCommands;
    if (categoryFilter !== 'ALL') {
      list = list.filter(item => item.category === categoryFilter);
    }
    if (!query.trim()) {
      return list.slice(0, 16);
    }

    const cleanQuery = query.toLowerCase().trim();
    const scored = list
      .map(item => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const subtitleLower = item.subtitle.toLowerCase();

        if (titleLower === cleanQuery) score += 100;
        else if (titleLower.startsWith(cleanQuery)) score += 50;
        else if (titleLower.includes(cleanQuery)) score += 30;

        if (subtitleLower.includes(cleanQuery)) score += 15;

        for (const kw of item.keywords) {
          if (kw === cleanQuery) score += 40;
          else if (kw.includes(cleanQuery)) score += 10;
        }

        return { item, score };
      })
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.item);

    return scored.slice(0, 24);
  }, [allCommands, query, categoryFilter]);

  // Handle keyboard navigation inside the list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
      scrollActiveIntoView(selectedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      scrollActiveIntoView(selectedIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) {
        TacticalAudio.playKick();
        selected.action();
      }
    }
  };

  const scrollActiveIntoView = (index: number) => {
    if (!listRef.current) return;
    const elements = listRef.current.querySelectorAll('[data-command-item]');
    const target = elements[index] as HTMLElement;
    if (target) {
      target.scrollIntoView({ block: 'nearest' });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 md:p-12 animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="w-full max-w-2xl bg-slate-900/95 border border-amber-400/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,179,53,0.15)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-amber-400 shrink-0 mr-3 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search players (Kim, Sinha), tools, matches (Blair), plays, or commands..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none font-medium"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700 shrink-0">
            <span>ESC</span>
            <span>to close</span>
          </div>
        </div>

        {/* Filter Categories Ribbon */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800/80 bg-slate-950/40 overflow-x-auto scrollbar-none text-[11px]">
          {['ALL', 'Tools', 'Actions', 'Players', 'Matches', 'Set Pieces'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                categoryFilter === cat 
                  ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20' 
                  : 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800'
              }`}
            >
              {cat === 'ALL' ? '🌟 All Items' : cat}
            </button>
          ))}
          <span className="text-[10px] text-slate-500 font-mono ml-auto pl-2 shrink-0">
            {filteredCommands.length} results
          </span>
        </div>

        {/* Command Items List */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/30 scrollbar-thin scrollbar-thumb-slate-800"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-slate-300">No matching tactical items found</div>
              <div className="text-xs text-slate-500 mt-1">Try searching for &quot;Kim&quot;, &quot;Call Sheet&quot;, &quot;Lockout&quot;, &quot;Blair&quot;, or &quot;Print&quot;</div>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  data-command-item
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    TacticalAudio.playKick();
                    cmd.action();
                  }}
                  className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-amber-400/20 via-slate-800 to-slate-800/80 border border-amber-400/50 shadow-md' 
                      : 'hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-amber-400 text-slate-950 font-black' 
                        : 'bg-slate-800 text-slate-300 group-hover:text-amber-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {cmd.title}
                        </span>
                        {cmd.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${cmd.badgeColor || 'bg-slate-800 text-slate-400'}`}>
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block">
                      {cmd.category}
                    </span>
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-xs transition ${
                      isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'
                    }`}>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-[10px]">↑↓</span>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-[10px]">↵</span>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-1 hidden sm:flex">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-[10px]">⌘K</span>
              <span>toggle anytime</span>
            </span>
          </div>
          <div className="text-amber-400 font-mono text-[10px] font-bold flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Peddie SAC Universal HUD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
