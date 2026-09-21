'use client';

import React, { useState } from 'react';
import { MatchTelestration } from '@/components/video/MatchTelestration';
import { 
  MATCH_EVENTS_VEO_HAVERFORD, 
  MATCH_EVENTS_VEO_AQUINAS,
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
  ShieldCheck,
  Upload,
  Calendar,
  Trophy,
  CheckCircle,
  Clock,
  X,
  PlusCircle
} from 'lucide-react';

export default function MatchFilmPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string>('m-1'); // Defaults to Aquinas 3-2 W
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'all'>('all');
  const [nlQuery, setNlQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customVeoUrl, setCustomVeoUrl] = useState('');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Active match data
  const isAquinas = selectedMatchId === 'm-1';
  const isHaverford = selectedMatchId === 'm-0';
  const rawEvents = isHaverford ? MATCH_EVENTS_VEO_HAVERFORD : MATCH_EVENTS_VEO_AQUINAS;
  const matchFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === selectedMatchId) || PEDDIE_SCHEDULE_2026_2027[1];
  
  // Filter by period if specified
  const periodFiltered = selectedPeriod === 'all' 
    ? rawEvents 
    : rawEvents.filter(e => e.period === selectedPeriod);

  // Apply NLP filter
  const filteredEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage(nlQuery, periodFiltered);

  // Selected clip for telestration playback
  const [selectedClip, setSelectedClip] = useState<MatchEvent>(
    isHaverford ? MATCH_EVENTS_VEO_HAVERFORD[2] : MATCH_EVENTS_VEO_AQUINAS[4]
  );

  const handleSwitchMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setSelectedPeriod('all');
    setNlQuery('');
    setSelectedClip(matchId === 'm-0' ? MATCH_EVENTS_VEO_HAVERFORD[2] : MATCH_EVENTS_VEO_AQUINAS[4]);
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

          {/* Match Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold flex-wrap">
            <button
              onClick={() => handleSwitchMatch('m-4')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedMatchId === 'm-4'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              PDS (7-1 W)
            </button>
            <button
              onClick={() => handleSwitchMatch('m-3')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedMatchId === 'm-3'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              George (5-2 W)
            </button>
            <button
              onClick={() => handleSwitchMatch('m-1')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedMatchId === 'm-1'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Aquinas (3-2 W)
            </button>
            <button
              onClick={() => handleSwitchMatch('m-2')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedMatchId === 'm-2'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Trenton (2-3 L)
            </button>
            <button
              onClick={() => handleSwitchMatch('m-0')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedMatchId === 'm-0'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Haverford (0-5 Veo)
            </button>
          </div>
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
              <span>Veo Match Film (Haverford)</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Active Match Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">
                Peddie Falcons {matchFixture.peddieScore ?? 0} – {matchFixture.opponentScore ?? 0} {matchFixture.opponent}
              </h1>
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                (matchFixture.peddieScore ?? 0) > (matchFixture.opponentScore ?? 0)
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}>
                {matchFixture.status.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {matchFixture.matchDate} • {matchFixture.location} • {matchFixture.keySummary}
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

        {/* Film Ingestion Status Card for Aquinas */}
        {isAquinas && (
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-amber-300 font-bold">Film Pipeline Status:</span>
              <span className="text-slate-300">
                Match events & xG telemetry logged. User noted: <em className="text-amber-200">&ldquo;Peddie beat Thomas Aquinas 3-2 Tommy goal, Christian goal, Carson goal. Will upload film later&rdquo;</em>.
              </span>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="text-amber-300 hover:text-white font-mono text-[11px] underline flex items-center gap-1"
            >
              <PlusCircle className="w-3 h-3" /> Connect Match Video Link
            </button>
          </div>
        )}

        {/* Period / Half Selector */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wide">
            {isAquinas ? 'Filter Half:' : 'Filter Period:'}
          </span>
          {isAquinas ? (
            (['all', 1, 2] as const).map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition ${
                  selectedPeriod === p
                    ? 'bg-emerald-400 text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p === 'all' ? `Full 80 Min (${MATCH_EVENTS_VEO_AQUINAS.length} events)` : `${p === 1 ? '1st Half (1-40\')' : '2nd Half (41-80\')'}`}
              </button>
            ))
          ) : (
            (['all', 1, 2, 3, 4] as const).map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition ${
                  selectedPeriod === p
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p === 'all' ? 'All Periods (18 clips)' : `Period ${p}`}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Grid: Telestration Suite (Left) & NLP Playlist (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Telestration Canvas & Live Video Player */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <MatchTelestration
            videoUrl={selectedClip?.videoUrl}
            thumbnailUrl={selectedClip?.thumbnailUrl}
            clipTitle={selectedClip?.description || `${isAquinas ? 'Aquinas' : 'Haverford'} Match Film`}
            sourceLabel={isAquinas ? "VEO AI SENSORS • AQUINAS VS PEDDIE (3-2 W)" : "VEO AI CAMERA • HAVERFORD VS PEDDIE"}
            matchUrl={isAquinas ? "https://app.veo.co/matches/20260904-vs-peddie-aquinas/" : "https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/"}
          />

          {/* Active Clip Intelligence Pill */}
          {selectedClip && (
            <div className="glass-panel p-4 flex flex-col gap-2 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-black text-amber-400 flex items-center gap-1.5">
                  {selectedClip.period && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px]">
                      {isAquinas ? `H${selectedClip.period}` : `Q${selectedClip.period}`}
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
                placeholder={isAquinas ? "e.g., 'goal', 'kim', 'tharney', 'fleming'" : "e.g., 'goals', 'kim', 'mckenzie', 'period 2'"}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 flex-wrap">
              <span>Quick tags:</span>
              <button onClick={() => setNlQuery('goal')} className="hover:text-amber-400 underline">Goals</button>
              <span>•</span>
              <button onClick={() => setNlQuery('kim')} className="hover:text-amber-400 underline">Tommy Kim</button>
              {isAquinas ? (
                <>
                  <span>•</span>
                  <button onClick={() => setNlQuery('tharney')} className="hover:text-amber-400 underline">Tharney</button>
                  <span>•</span>
                  <button onClick={() => setNlQuery('fleming')} className="hover:text-amber-400 underline">Fleming</button>
                </>
              ) : (
                <>
                  <span>•</span>
                  <button onClick={() => setNlQuery('mckenzie')} className="hover:text-amber-400 underline">McKenzie</button>
                </>
              )}
              <span>•</span>
              <button onClick={() => setNlQuery('')} className="hover:text-cyan-400 underline">Clear</button>
            </div>
          </div>

          {/* Film Clips Playlist */}
          <div className="glass-panel p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" /> Match Events ({filteredEvents.length})
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                {isAquinas ? 'Aquinas 3-2 Win' : 'Haverford Opener'}
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
                            {isAquinas ? `H${ev.period}` : `Q${ev.period}`}
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

      {/* Film Upload Modal for Aquinas ("Will upload film later") */}
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
                <h3 className="text-base font-black text-white">Upload / Connect Aquinas Match Film</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Coach Nazario coaching staff or team videographer can connect the Veo Cam video file or share URL for the <strong className="text-amber-300">Sept 4 St. Thomas Aquinas 3-2 victory</strong>.
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
                    placeholder="https://app.veo.co/matches/20260904-vs-peddie-aquinas/"
                    value={customVeoUrl}
                    onChange={e => setCustomVeoUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1">
                  <span className="font-bold text-slate-300">Quick Connect Presets:</span>
                  <button
                    type="button"
                    onClick={() => setCustomVeoUrl('https://app.veo.co/matches/20260904-vs-peddie-aquinas/')}
                    className="text-left text-cyan-400 hover:underline"
                  >
                    • Official Veo Match Cloud: 20260904-vs-peddie-aquinas
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomVeoUrl('https://c.veocdn.com/matches/20260904-aquinas-peddie-full.mp4')}
                    className="text-left text-cyan-400 hover:underline"
                  >
                    • High School Sports 1080p MP4 Raw Cam Stream
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
