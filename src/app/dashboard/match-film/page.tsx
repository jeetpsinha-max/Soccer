'use client';

import React, { useState } from 'react';
import { MatchTelestration } from '@/components/video/MatchTelestration';
import { 
  MATCH_EVENTS_VEO_HAVERFORD, 
  MATCH_EVENTS_VEO_AQUINAS,
  MATCH_EVENTS_VEO_TRENTON,
  MATCH_EVENTS_VEO_GEORGE,
  MATCH_EVENTS_VEO_PDS,
  MATCH_EVENTS_VEO_LIFE_CENTER,
  MATCH_EVENTS_VEO_LAWRENCEVILLE,
  MATCH_EVENTS_VEO_PENNINGTON,
  MATCH_EVENTS_VEO_BLAIR,
  ALL_VEO_MATCH_EVENTS,
  PEDDIE_SCHEDULE_2026_2027 
} from '@/lib/soccer-data';
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
  Target
} from 'lucide-react';

interface MatchTab {
  id: string;
  name: string;
  subtext: string;
  type: 'completed' | 'scout';
  scoreBadge?: string;
  badgeStyle?: string;
  opponentKey?: string;
}

const MATCH_TABS: MatchTab[] = [
  // Completed 2026 Matches
  { id: 'm-4', name: 'PDS', subtext: 'Sep 14 (7-1 W)', type: 'completed', scoreBadge: '7-1 W', badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { id: 'm-3', name: 'George School', subtext: 'Sep 10 (5-2 W)', type: 'completed', scoreBadge: '5-2 W', badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { id: 'm-2', name: 'Trenton Central', subtext: 'Sep 8 (2-3 L)', type: 'completed', scoreBadge: '2-3 L', badgeStyle: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  { id: 'm-1', name: 'St. Thomas Aquinas', subtext: 'Sep 4 (3-2 W)', type: 'completed', scoreBadge: '3-2 W', badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { id: 'm-0', name: 'Haverford', subtext: 'Sep 1 (0-5 L)', type: 'completed', scoreBadge: '0-5 L', badgeStyle: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  
  // Advance Opponent Scouting Reels
  { id: 'scout-lca', name: 'Life Center Academy', subtext: 'NEXT MATCH: Sep 22', type: 'scout', scoreBadge: 'SCOUT REEL', badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40', opponentKey: 'life-center' },
  { id: 'scout-lvr', name: 'Lawrenceville Big Red', subtext: 'Oct 7 Rivalry', type: 'scout', scoreBadge: 'SCOUT REEL', badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', opponentKey: 'lawrenceville' },
  { id: 'scout-pen', name: 'Pennington Red Hawks', subtext: 'Oct 20 Prep A', type: 'scout', scoreBadge: 'SCOUT REEL', badgeStyle: 'bg-purple-500/20 text-purple-300 border-purple-500/40', opponentKey: 'pennington' },
  { id: 'scout-blr', name: 'Blair Buccaneers', subtext: 'Nov 7 Blair Day', type: 'scout', scoreBadge: 'SCOUT REEL', badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-500/40', opponentKey: 'blair' }
];

export default function MatchFilmPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string>('m-4'); // Defaults to PDS 7-1 W (Sinha 64' golazo, Kim Hat-trick)
  const [filmCategory, setFilmCategory] = useState<'completed' | 'scout'>('completed');
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'all'>('all');
  const [nlQuery, setNlQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customVeoUrl, setCustomVeoUrl] = useState('');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Active match data
  const currentTab = MATCH_TABS.find(t => t.id === selectedMatchId) || MATCH_TABS[0];
  const isScoutReel = currentTab.type === 'scout';
  const rawEvents = ALL_VEO_MATCH_EVENTS[selectedMatchId] || MATCH_EVENTS_VEO_PDS;
  const matchFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === selectedMatchId);

  // Filter by period if specified
  const periodFiltered = selectedPeriod === 'all' 
    ? rawEvents 
    : rawEvents.filter(e => e.period === selectedPeriod);

  // Apply NLP filter
  const filteredEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage(nlQuery, periodFiltered);

  // Selected clip for telestration playback
  const [selectedClip, setSelectedClip] = useState<MatchEvent>(rawEvents[0] || MATCH_EVENTS_VEO_PDS[4]);

  const handleSwitchMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setSelectedPeriod('all');
    setNlQuery('');
    const events = ALL_VEO_MATCH_EVENTS[matchId] || MATCH_EVENTS_VEO_PDS;
    // Prefer goal clip or first clip
    const goalClip = events.find(e => e.type === 'Goal' && e.team === 'Peddie') || events[0];
    setSelectedClip(goalClip || events[0]);
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
    <div className="flex flex-col gap-6">
      {/* Header with Match Selector & Status */}
      <div className="glass-panel p-5 border border-cyan-500/30 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase">
              ALL-22 FILM & TELESTRATION STUDIO
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-amber-400 text-xs font-bold">2026–2027 Varsity Campaign</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-emerald-400 text-xs font-bold">Veo AI & Hudl Fan Platform</span>
          </div>

          {/* Mode Switcher: Completed Matches vs Opponent Scouting Film */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => {
                setFilmCategory('completed');
                handleSwitchMatch('m-4');
              }}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                filmCategory === 'completed'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Completed Matches (5)</span>
            </button>
            <button
              onClick={() => {
                setFilmCategory('scout');
                handleSwitchMatch('scout-lca');
              }}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                filmCategory === 'scout'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Opponent Scout Reels (4)</span>
            </button>
          </div>
        </div>

        {/* Match Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {MATCH_TABS.filter(t => t.type === filmCategory).map(tab => {
            const isSelected = selectedMatchId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSwitchMatch(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-lg shadow-cyan-500/20 border border-cyan-400'
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
                <span className="font-bold text-white">Peddie School Official Film Hubs</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">Hudl Org 15965 Verified</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Direct access to Peddie High School varsity soccer footage, player highlights, and full-match Veo AI replays.
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
              <span>Peddie Hudl Fan Page</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href="https://fan.hudl.com/usa/nj/hightstown/organization/15965/video"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <span>Hudl Video Archive</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href="https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/"
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
                {isScoutReel ? (
                  `Tactical Film Scout: ${currentTab.name}`
                ) : (
                  `Peddie Falcons ${matchFixture?.peddieScore ?? 0} – ${matchFixture?.opponentScore ?? 0} ${matchFixture?.opponent}`
                )}
              </h1>
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${currentTab.badgeStyle}`}>
                {currentTab.scoreBadge}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {isScoutReel ? (
                `Advance tactical scouting reel • Video breakdowns of key opponent tendencies, transition traps, and Coach Nazario counter-strategies`
              ) : (
                `${matchFixture?.matchDate} • ${matchFixture?.location} • ${matchFixture?.keySummary}`
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Connect Match Video Link</span>
            </button>
          </div>
        </div>

        {/* Period / Half Selector */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wide">
            {isScoutReel ? 'Filter Reel Phase:' : 'Filter Half:'}
          </span>
          {(['all', 1, 2] as const).map(p => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition ${
                selectedPeriod === p
                  ? 'bg-cyan-400 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {p === 'all' ? `All Clips (${rawEvents.length} events)` : `${p === 1 ? '1st Half / Phase 1' : '2nd Half / Phase 2'}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Telestration Suite (Left) & NLP Playlist (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Telestration Canvas & Live Video Player */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <MatchTelestration
            videoUrl={selectedClip?.videoUrl}
            thumbnailUrl={selectedClip?.thumbnailUrl}
            clipTitle={selectedClip?.description || `${currentTab.name} Film`}
            sourceLabel={isScoutReel ? `ADVANCE OPPONENT SCOUT • ${currentTab.name.toUpperCase()}` : `VEO AI SENSORS • ${currentTab.name.toUpperCase()}`}
            matchUrl="https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/"
          />

          {/* Active Clip Intelligence Pill */}
          {selectedClip && (
            <div className="glass-panel p-4 flex flex-col gap-2 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-black text-amber-400 flex items-center gap-1.5">
                  {selectedClip.period && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px]">
                      H{selectedClip.period}
                    </span>
                  )}
                  <span>
                    {selectedClip.minute}&apos;:{selectedClip.second < 10 ? `0${selectedClip.second}` : selectedClip.second} • {selectedClip.type}
                  </span>
                  {selectedClip.type === 'Goal' && (
                    <span className="px-2 py-0.2 rounded bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                      GOAL
                    </span>
                  )}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-400 font-mono text-[10px] font-bold">
                  {selectedClip.phase}
                </span>
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{selectedClip.playerName}</span>
                {selectedClip.playerNumber > 0 && (
                  <span className="text-xs text-slate-400 font-mono">
                    (#{selectedClip.playerNumber})
                  </span>
                )}
                {selectedClip.team === 'Peddie' && (
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                    Peddie Falcons
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedClip.description}</p>
              {selectedClip.expectedGoals !== undefined && (
                <div className="text-xs font-mono text-emerald-400 font-bold">
                  Shot Quality xG: {(selectedClip.expectedGoals * 100).toFixed(1)}% Conversion Likelihood
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Col: Gemini Natural Language Film Filter */}
        <div className="flex flex-col gap-4">
          {/* NLP Search Bar */}
          <div className="glass-panel p-4 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>GEMINI NLP FILM QUERY</span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={nlQuery}
                onChange={e => setNlQuery(e.target.value)}
                placeholder="e.g., 'goal', 'kim', 'sinha', 'tharney', 'wiley', 'save'"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 flex-wrap">
              <span>Quick tags:</span>
              <button onClick={() => setNlQuery('goal')} className="hover:text-amber-400 underline">Goals</button>
              <span>•</span>
              <button onClick={() => setNlQuery('kim')} className="hover:text-amber-400 underline">Kim</button>
              <span>•</span>
              <button onClick={() => setNlQuery('sinha')} className="hover:text-amber-400 underline">Sinha</button>
              <span>•</span>
              <button onClick={() => setNlQuery('tharney')} className="hover:text-amber-400 underline">Tharney</button>
              <span>•</span>
              <button onClick={() => setNlQuery('save')} className="hover:text-amber-400 underline">McKenzie Saves</button>
              <span>•</span>
              <button onClick={() => setNlQuery('')} className="hover:text-cyan-400 underline">Clear</button>
            </div>
          </div>

          {/* Film Clips Playlist */}
          <div className="glass-panel p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" /> Events ({filteredEvents.length})
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                {currentTab.name}
              </span>
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filteredEvents.map(ev => {
                const isSelected = selectedClip?.id === ev.id;
                const isGoal = ev.type === 'Goal';
                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedClip(ev)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg'
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
                      {ev.videoUrl ? (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold shrink-0">
                          1080p MP4
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono text-[9px] shrink-0">
                          Veo Tracked
                        </span>
                      )}
                    </div>
                    
                    <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{ev.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

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
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Coach Nazario coaching staff or team videographer can connect the Veo Cam video file or share URL for any 2026–2027 varsity fixture.
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
                    className="text-left text-cyan-400 hover:underline"
                  >
                    • Official Veo Match Cloud: 20260901-vs-peddie-v4d69c3b
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomVeoUrl('https://fan.hudl.com/usa/nj/hightstown/organization/15965/peddie-school')}
                    className="text-left text-cyan-400 hover:underline"
                  >
                    • Peddie High School Official Hudl Fan Video Cloud
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20"
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
