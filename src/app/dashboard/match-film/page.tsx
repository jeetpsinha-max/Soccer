'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MatchTelestration } from '@/components/video/MatchTelestration';
import { 
  ALL_VEO_MATCH_EVENTS,
  PEDDIE_SCHEDULE_2026_2027,
  MATCH_EVENTS_VEO_PDS
} from '@/lib/soccer-data';
import { MOCK_GAMES } from '@/lib/football/mock-game-data';
import { MatchEvent } from '@/lib/types';
import { SoccerTacticalAgent } from '@/lib/agents/soccer-agents';
import { 
  Film, 
  Search, 
  Sparkles, 
  Video, 
  PlayCircle, 
  ExternalLink, 
  Upload,
  Calendar,
  Trophy,
  CheckCircle,
  Clock,
  X,
  PlusCircle,
  Eye,
  Target,
  Shield,
  Zap,
  ArrowRight,
  Flame
} from 'lucide-react';

interface MatchTab {
  id: string;
  name: string;
  subtext: string;
  type: 'completed' | 'scout';
  scoreBadge?: string;
  badgeStyle?: string;
  opponentKey?: string;
  sport: 'soccer' | 'football';
  videoUrl?: string;
  hudlUrl?: string;
}

// Generate soccer match tabs for all 17 matches plus dedicated scout reels
const SOCCER_MATCH_TABS: MatchTab[] = [
  // 1. All 17 Official Matches (2026 Season - Full Match Film & Tactical Feeds)
  ...PEDDIE_SCHEDULE_2026_2027.map(m => {
    const isCompleted = m.status === 'Completed';
    const isWin = (m.peddieScore ?? 0) > (m.opponentScore ?? 0);
    const scoreBadge = isCompleted
      ? `${m.peddieScore}-${m.opponentScore} ${isWin ? 'W' : 'L'}`
      : (m.projectedScore ? `Proj: ${m.projectedScore}` : 'SCOUT REEL');
    const badgeStyle = isCompleted
      ? (isWin
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          : 'bg-rose-500/20 text-rose-300 border-rose-500/40')
      : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

    return {
      id: m.id,
      name: m.opponentLogoText ? `${m.opponentLogoText} - ${m.opponent.replace('The ', '').replace(' High School', '').replace(' School', '')}` : m.opponent,
      subtext: isCompleted 
        ? `${m.matchDate} (${m.peddieScore}-${m.opponentScore} Final)` 
        : `${m.matchDate} (Film & Scout Reel)`,
      type: isCompleted ? 'completed' as const : 'scout' as const,
      scoreBadge,
      badgeStyle,
      opponentKey: m.scoutingReportId,
      sport: 'soccer' as const,
      videoUrl: m.videoUrl,
      hudlUrl: m.hudlUrl
    };
  }),
  // 2. Opponent Pre-Match Scouting Film Reels
  { id: 'scout-lca', name: 'Life Center Academy', subtext: 'Sep 22 Scout Reel', type: 'scout', scoreBadge: 'SCOUT REEL', badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40', opponentKey: 'life-center', sport: 'soccer' },
  { id: 'scout-lvr', name: 'Lawrenceville Big Red', subtext: 'MAPL Opener Scout', type: 'scout', scoreBadge: 'SCOUT REEL', badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', opponentKey: 'lawrenceville', sport: 'soccer' },
  { id: 'scout-pen', name: 'Pennington Red Hawks', subtext: 'Prep A Scout Reel', type: 'scout', scoreBadge: 'SCOUT REEL', badgeStyle: 'bg-purple-500/20 text-purple-300 border-purple-500/40', opponentKey: 'pennington', sport: 'soccer' },
  { id: 'scout-blr', name: 'Blair Buccaneers', subtext: 'Blair Day Scout', type: 'scout', scoreBadge: 'SCOUT REEL', badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-500/40', opponentKey: 'blair', sport: 'soccer' }
];

// Generate football match tabs for all 9 games
const FOOTBALL_MATCH_TABS: MatchTab[] = MOCK_GAMES.map(g => {
  const home = g.homeScore ?? 0;
  const away = g.awayScore ?? 0;
  const isWin = home > away;
  const scoreBadge = `${home}-${away} ${isWin ? 'W' : 'L'}`;
  const badgeStyle = isWin
    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

  const oppName = g.opponent || 'Opponent';
  return {
    id: g.id,
    name: oppName.replace(' Spartans', '').replace(' College Prep', '').replace(' The ', '').replace(' School', ''),
    subtext: `${g.date.split(' · ')[0]} (${scoreBadge})`,
    type: 'completed' as const,
    scoreBadge,
    badgeStyle,
    sport: 'football' as const,
    videoUrl: g.videoUrl,
    hudlUrl: 'https://fan.hudl.com/usa/nj/hightstown/organization/15965/peddie-school/video'
  };
});

function MatchFilmContent() {
  const searchParams = useSearchParams();
  const requestedMatch = searchParams.get('match');
  const requestedSport = searchParams.get('sport');

  const [activeSport, setActiveSport] = useState<'soccer' | 'football'>(
    requestedSport === 'football' ? 'football' : 'soccer'
  );
  const [selectedMatchId, setSelectedMatchId] = useState<string>(
    requestedMatch || (requestedSport === 'football' ? 'peddie-hill-2025' : 'm-4')
  );
  const [filmCategory, setFilmCategory] = useState<'all' | 'completed' | 'scout'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'all'>('all');
  const [nlQuery, setNlQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customVeoUrl, setCustomVeoUrl] = useState('');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Sync with searchParams if provided
  useEffect(() => {
    if (requestedMatch) {
      let targetId = requestedMatch;
      // Map upcoming fixture requests with available scout reels
      if (requestedMatch === 'm-5') targetId = 'scout-lca';
      else if (requestedMatch === 'm-7') targetId = 'scout-lvr';
      else if (requestedMatch === 'm-14') targetId = 'scout-pen';
      else if (requestedMatch === 'm-16') targetId = 'scout-blr';

      setSelectedMatchId(targetId);
      const isFoot = FOOTBALL_MATCH_TABS.some(f => f.id === targetId);
      if (isFoot) {
        setActiveSport('football');
      } else {
        setActiveSport('soccer');
        const isScout = targetId.startsWith('scout-');
        setFilmCategory(isScout ? 'scout' : 'completed');
      }
    }
  }, [requestedMatch]);

  // Current sport match tabs
  const currentSportTabs = activeSport === 'soccer' ? SOCCER_MATCH_TABS : FOOTBALL_MATCH_TABS;
  const matchedTab = currentSportTabs.find(t => t.id === selectedMatchId);

  // Soccer match fixture
  const soccerFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === selectedMatchId);
  // Football game
  const footballGame = MOCK_GAMES.find(g => g.id === selectedMatchId);

  const currentTab: MatchTab = matchedTab || (
    soccerFixture ? {
      id: soccerFixture.id,
      name: soccerFixture.opponentLogoText ? `${soccerFixture.opponentLogoText} - ${soccerFixture.opponent.replace('The ', '').replace(' High School', '').replace(' School', '')}` : soccerFixture.opponent,
      subtext: `${soccerFixture.matchDate} (Upcoming)`,
      type: 'completed',
      scoreBadge: 'UPCOMING',
      badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      opponentKey: soccerFixture.scoutingReportId,
      sport: 'soccer',
      hudlUrl: soccerFixture.hudlUrl
    } : currentSportTabs[0]
  );
  const isScoutReel = currentTab.type === 'scout';

  // Raw events for soccer - strictly for the selected match (never fall back to a different game)
  const rawEvents = ALL_VEO_MATCH_EVENTS[selectedMatchId] || [];

  // Filter by period if specified
  const periodFiltered = selectedPeriod === 'all' 
    ? rawEvents 
    : rawEvents.filter(e => e.period === selectedPeriod);

  // Apply NLP filter
  const filteredEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage(nlQuery, periodFiltered);

  // Selected clip for telestration playback
  const [selectedClip, setSelectedClip] = useState<MatchEvent | null>(rawEvents[0] || null);

  // Keep selectedClip in sync when selectedMatchId changes
  useEffect(() => {
    if (rawEvents.length > 0) {
      const goalClip = rawEvents.find(e => e.type === 'Goal' && e.team === 'Peddie') || rawEvents[0];
      setSelectedClip(goalClip);
    } else {
      setSelectedClip(null);
    }
  }, [selectedMatchId]);

  const handleSwitchSport = (sport: 'soccer' | 'football') => {
    setActiveSport(sport);
    if (sport === 'football') {
      setSelectedMatchId('peddie-hill-2025');
    } else {
      setSelectedMatchId('m-4');
      setFilmCategory('completed');
    }
    setSelectedPeriod('all');
    setNlQuery('');
  };

  const handleSwitchMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setSelectedPeriod('all');
    setNlQuery('');
    const events = ALL_VEO_MATCH_EVENTS[matchId] || [];
    if (events.length > 0) {
      const goalClip = events.find(e => e.type === 'Goal' && e.team === 'Peddie') || events[0];
      setSelectedClip(goalClip);
    } else {
      setSelectedClip(null);
    }
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (customVeoUrl.trim()) {
      setUploadSuccessMessage(`Successfully connected film link: ${customVeoUrl}. Calibrated with Veo AI camera timestamps.`);
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadSuccessMessage(null);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Top Header & Dual-Sport Selector */}
      <div className="glass-panel p-5 border border-cyan-500/30 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase">
              SAC ALL-GAME BROADCAST FILM & TELESTRATION STUDIO
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-amber-400 text-xs font-bold">2024–2027 Dual-Sport Campaign</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-emerald-400 text-xs font-bold">Veo AI & Hudl Fan Platform</span>
          </div>

          {/* Master Sport Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => handleSwitchSport('soccer')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                activeSport === 'soccer'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚽ Soccer SAC (16 Matches)</span>
            </button>
            <button
              onClick={() => handleSwitchSport('football')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                activeSport === 'football'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🏈 Football SAC (9 Games)</span>
            </button>
          </div>
        </div>

        {/* Sub-Category Switcher for Soccer */}
        {activeSport === 'soccer' && (
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Filter Fixtures:</span>
              <button
                onClick={() => setFilmCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  filmCategory === 'all'
                    ? 'bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>All Fixtures ({PEDDIE_SCHEDULE_2026_2027.length})</span>
              </button>
              <button
                onClick={() => {
                  setFilmCategory('completed');
                  handleSwitchMatch('m-4');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  filmCategory === 'completed'
                    ? 'bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Completed Matches ({SOCCER_MATCH_TABS.filter(t => t.type === 'completed').length})</span>
              </button>
              <button
                onClick={() => {
                  setFilmCategory('scout');
                  handleSwitchMatch('m-5');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  filmCategory === 'scout'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Upcoming Match Film & Scouts ({SOCCER_MATCH_TABS.filter(t => t.type === 'scout').length})</span>
              </button>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Connect Custom Veo Link</span>
            </button>
          </div>
        )}

        {/* Match Carousel Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {(activeSport === 'soccer' 
            ? SOCCER_MATCH_TABS.filter(t => filmCategory === 'all' ? true : t.type === filmCategory)
            : FOOTBALL_MATCH_TABS
          ).map(tab => {
            const isSelected = selectedMatchId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSwitchMatch(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? activeSport === 'soccer'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-lg shadow-cyan-500/20 border border-cyan-400'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20 border border-amber-400'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${tab.badgeStyle}`}>
                  {tab.scoreBadge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dual Source Video Hub Banner */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Peddie Athletics Official Film Portals</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">Hudl Org 15965 & Veo Cloud</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Broadcast-grade film streaming for all {activeSport === 'soccer' ? '16 soccer fixtures' : '9 gridiron matchups'}, with real-time telestration, ball tracking, and AI coaching breakdowns.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="https://fan.hudl.com/usa/nj/hightstown/organization/15965/peddie-school"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Peddie Hudl Fan Portal</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href="https://app.veo.co"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow"
            >
              <span>Veo Match Cloud</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Active Match Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">
                {activeSport === 'football' ? (
                  footballGame?.title || 'Peddie Varsity Football Game Film'
                ) : isScoutReel ? (
                  `Tactical Film Scout: ${currentTab.name}`
                ) : soccerFixture?.status === 'Completed' ? (
                  `Peddie Falcons ${soccerFixture?.peddieScore ?? 0} – ${soccerFixture?.opponentScore ?? 0} ${soccerFixture?.opponent}`
                ) : (
                  `Peddie Falcons vs. ${soccerFixture?.opponent || currentTab.name}`
                )}
              </h1>
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${currentTab.badgeStyle}`}>
                {currentTab.scoreBadge}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {activeSport === 'football' ? (
                `${footballGame?.date} • Coach Mark Fabish • ${footballGame?.plays?.length ?? 18} Plays Analyzed • All-22 Tactical Breakdown`
              ) : isScoutReel ? (
                `Advance tactical scouting reel • Video breakdowns of key opponent tendencies, transition traps, and Coach Nazario counter-strategies`
              ) : soccerFixture?.status === 'Completed' ? (
                `${soccerFixture?.matchDate} • ${soccerFixture?.location} • ${soccerFixture?.keySummary}`
              ) : (
                `Upcoming fixture scheduled for ${soccerFixture?.matchDate || 'Fall 2026'} • Official broadcast film pending post-match upload`
              )}
            </p>
          </div>

          {/* Quick External Deep Links */}
          <div className="flex items-center gap-2">
            {activeSport === 'football' ? (
              <Link
                href={`/football/film-room/${selectedMatchId}`}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Launch Gridiron All-22 Cockpit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <a
                href={currentTab.videoUrl || currentTab.hudlUrl || "https://app.veo.co"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 font-bold text-xs flex items-center gap-2 transition"
              >
                <span>Full Uncut Match Video</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Studio: Video Player, Telestration & Play Events */}
      {activeSport === 'soccer' && (!selectedClip || rawEvents.length === 0) ? (
        <div className="glass-panel p-8 border border-slate-800 text-center flex flex-col items-center justify-center gap-6 my-2 rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-8 h-8" />
          </div>
          <div className="max-w-xl space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase">
              Upcoming Fixture • Match Broadcast Film Ingestion Pending
            </span>
            <h2 className="text-2xl font-black text-white">
              {soccerFixture ? `Peddie vs. ${soccerFixture.opponent}` : 'Match Film Pending'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {soccerFixture
                ? `This match is scheduled for ${soccerFixture.matchDate} at ${soccerFixture.location}. Official Veo 1080p AI broadcast footage, player tracking, and telestration events will be uploaded immediately following the match.`
                : 'Official match broadcast footage is strictly displayed for completed varsity games or dedicated advance opponent scout reels.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {soccerFixture?.hudlUrl && (
              <a
                href={soccerFixture.hudlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition shadow"
              >
                <Video className="w-4 h-4" />
                <span>Watch Opponent Film on Hudl Fan ↗</span>
              </a>
            )}
            <button
              onClick={() => {
                setFilmCategory('completed');
                handleSwitchMatch('m-4');
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Watch Latest Completed Film (PDS 7-1 W)</span>
            </button>
            <button
              onClick={() => {
                setFilmCategory('scout');
                handleSwitchMatch('scout-lvr');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>View Opponent Scout Reels</span>
            </button>
            <Link
              href="/dashboard/schedule"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Full 2026 Season Schedule</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Broadcast Player & Telestration Viewport */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <MatchTelestration
              videoUrl={
                activeSport === 'football'
                  ? footballGame?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                  : selectedClip?.videoUrl || currentTab.videoUrl || 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/df91eca4-bd9b-4171-893d-6da93b295af0_1788317479.555815/video.mp4?v=7v9q8pPK'
              }
              thumbnailUrl={
                activeSport === 'football'
                  ? undefined
                  : soccerFixture?.thumbnailUrl || 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg'
              }
              clipTitle={
                activeSport === 'football'
                  ? `${footballGame?.title} - All-22 Tactical Film`
                  : `${selectedClip?.minute ?? 0}' - ${selectedClip?.type ?? 'Highlight'}: ${selectedClip?.playerName ?? ''}`
              }
              sourceLabel={
                activeSport === 'football'
                  ? 'HUDL ALL-22 BROADCAST FOOTAGE'
                  : 'VEO AI OFFICIAL 1080P BROADCAST'
              }
              matchUrl={currentTab.videoUrl || currentTab.hudlUrl}
            />

            {/* Active Clip Analysis Card */}
            <div className="glass-panel p-4 border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {activeSport === 'football' ? 'GRIDIRON COGNITIVE INSIGHT' : 'AI TACTICAL CLIP BREAKDOWN'}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {activeSport === 'football' ? `${footballGame?.plays?.length ?? 18} Plays on Record` : `Timestamp: ${selectedClip?.minute ?? 0}:${(selectedClip?.second ?? 0) < 10 ? '0' : ''}${selectedClip?.second ?? 0}`}
                </span>
              </div>
              
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {activeSport === 'football' ? (
                  selectedMatchId === 'peddie-hill-2025'
                    ? 'Historic 45-42 shootout victory over The Hill School Blues. Peddie generated 412 total yards of offense with +0.38 passing EPA/play and completed a clutch 4th-quarter game-winning touchdown drive.'
                    : `Official game film for ${footballGame?.title}. High-leverage execution, route concepts, and defensive containment breakdowns available across all drives.`
                ) : (
                  selectedClip?.description || 'Tactical clip breakdown tracked with Veo AI.'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                {activeSport === 'football' ? (
                  <>
                    <span>Passing EPA: <strong className="text-emerald-400">+0.38</strong></span>
                    <span>•</span>
                    <span>Rushing Success: <strong className="text-cyan-400">54.2%</strong></span>
                    <span>•</span>
                    <span>3rd Down Conv: <strong className="text-amber-400">62.5%</strong></span>
                  </>
                ) : (
                  <>
                    <span>Expected Goals (xG): <strong className="text-emerald-400">{(selectedClip?.expectedGoals ?? 0).toFixed(2)}</strong></span>
                    <span>•</span>
                    <span>Phase: <strong className="text-cyan-400">{selectedClip?.phase ?? 'Open Play'}</strong></span>
                    <span>•</span>
                    <span>Success: <strong className={selectedClip?.success ? 'text-emerald-400' : 'text-rose-400'}>{selectedClip?.success ? 'Successful' : 'Unsuccessful'}</strong></span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Col: Match Event Timeline & Filter */}
          <div className="flex flex-col gap-4">
            <div className="glass-panel p-4 border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-white text-sm">
                    {activeSport === 'football' ? 'Game Plays & Drives' : 'Key Match Events & Clips'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {activeSport === 'football' ? `${footballGame?.plays?.length ?? 18} Plays` : `${filteredEvents.length} Clips`}
                </span>
              </div>

              {/* Soccer Event Search & Period Filter */}
              {activeSport === 'soccer' && (
                <>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search events (e.g., 'Goal', 'Kim', 'Save')..."
                      value={nlQuery}
                      onChange={e => setNlQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    {(['all', 1, 2] as const).map(p => (
                      <button
                        key={p}
                        onClick={() => setSelectedPeriod(p)}
                        className={`flex-1 py-1 rounded-lg transition cursor-pointer ${
                          selectedPeriod === p
                            ? 'bg-cyan-500 text-slate-950 font-black'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {p === 'all' ? 'All Halves' : `Half ${p}`}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* List of Clips */}
              <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                {activeSport === 'football' ? (
                  // Football Plays List
                  (footballGame?.plays || []).map((play, idx) => (
                    <div
                      key={play.id || idx}
                      className="p-3 rounded-xl border border-slate-800/90 bg-slate-900/60 hover:border-amber-400/50 flex flex-col gap-1.5 transition text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" />
                          <span>Q{play.quarter} • {play.down ? `${play.down} & ${play.distance}` : `Play #${idx + 1}`}</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">
                          EPA: {play.epa > 0 ? `+${play.epa.toFixed(2)}` : play.epa.toFixed(2)}
                        </span>
                      </div>
                      <div className="font-semibold text-white truncate">{play.routeConcept || play.playType}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {play.playDescription || `Gain of ${play.yardsGained ?? 4} yards.`}
                      </div>
                    </div>
                  ))
                ) : (
                  // Soccer Events List
                  filteredEvents.map(ev => {
                    const isSelected = selectedClip?.id === ev.id;
                    const isGoal = ev.type === 'Goal';
                    return (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedClip(ev)}
                        className={`p-3 rounded-xl border flex flex-col gap-1.5 transition cursor-pointer text-xs ${
                          isSelected
                            ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10'
                            : isGoal && ev.team === 'Peddie'
                            ? 'bg-amber-950/20 border-amber-500/40 text-amber-200 hover:border-amber-400'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                            <PlayCircle className="w-3 h-3" />
                            {ev.period && (
                              <span className="px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px]">
                                H{ev.period}
                              </span>
                            )}
                            <span>{ev.minute}&apos; {ev.type}</span>
                            {isGoal && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black text-[9px]">
                                GOAL
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-400">{ev.phase}</span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="font-semibold text-white truncate">{ev.playerName}</div>
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono text-[9px] shrink-0">
                            Veo AI Tracked
                          </span>
                        </div>
                        
                        <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{ev.description}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Film Upload Modal */}
      {showUploadModal && (
        <div 
          onClick={() => setShowUploadModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-lg bg-slate-950 border border-amber-500/60 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-black text-white">Upload / Connect Match Film Link</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Coaching staff or team videographer can connect the Veo Cam video file or share URL for any 2026–2027 varsity fixture.
            </p>

            {uploadSuccessMessage ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/60 text-emerald-300 flex items-center gap-2 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{uploadSuccessMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSaveUpload} className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold uppercase block mb-1">
                    Veo Match URL or MP4 Direct Link:
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/"
                    value={customVeoUrl}
                    onChange={e => setCustomVeoUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1">
                  <span className="font-bold text-slate-300">Quick Connect Presets:</span>
                  <button
                    type="button"
                    onClick={() => setCustomVeoUrl('https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/')}
                    className="text-left text-cyan-400 hover:underline cursor-pointer"
                  >
                    • Official Veo Match Cloud: 20260901-vs-peddie-v4d69c3b
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomVeoUrl('https://fan.hudl.com/usa/nj/hightstown/organization/15965/peddie-school')}
                    className="text-left text-cyan-400 hover:underline cursor-pointer"
                  >
                    • Peddie High School Official Hudl Fan Video Cloud
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    Save & Calibrate Video
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MatchFilmPage() {
  return (
    <Suspense fallback={
      <div className="p-12 text-center text-slate-400 font-mono text-sm animate-pulse">
        Initializing Peddie SAC Broadcast Film & Telestration Studio...
      </div>
    }>
      <MatchFilmContent />
    </Suspense>
  );
}
