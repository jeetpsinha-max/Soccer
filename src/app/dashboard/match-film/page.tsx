'use client';

import React, { useState } from 'react';
import { MatchTelestration } from '@/components/video/MatchTelestration';
import { MATCH_EVENTS_VEO_HAVERFORD, MATCH_EVENTS_LIVE_BLAIR } from '@/lib/soccer-data';
import { MatchEvent } from '@/lib/types';
import { SoccerTacticalAgent } from '@/lib/agents/soccer-agents';
import { Film, Search, Sparkles, Video, PlayCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export default function MatchFilmPage() {
  const [activeMatchKey, setActiveMatchKey] = useState<'haverford' | 'blair'>('haverford');
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'all'>('all');
  const [nlQuery, setNlQuery] = useState('');
  
  // Current active events pool
  const rawEvents = activeMatchKey === 'haverford' ? MATCH_EVENTS_VEO_HAVERFORD : MATCH_EVENTS_LIVE_BLAIR;
  
  // Filter by period if specified
  const periodFiltered = selectedPeriod === 'all' 
    ? rawEvents 
    : rawEvents.filter(e => e.period === selectedPeriod);

  // Apply NLP filter
  const filteredEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage(nlQuery, periodFiltered);

  // Selected clip for telestration playback
  const [selectedClip, setSelectedClip] = useState<MatchEvent>(MATCH_EVENTS_VEO_HAVERFORD[2]); // Q1 13' Haverford Goal #1

  const handleMatchSwitch = (key: 'haverford' | 'blair') => {
    setActiveMatchKey(key);
    setSelectedPeriod('all');
    setNlQuery('');
    if (key === 'haverford') {
      setSelectedClip(MATCH_EVENTS_VEO_HAVERFORD[2]);
    } else {
      setSelectedClip(MATCH_EVENTS_LIVE_BLAIR[10]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Match Selector */}
      <div className="glass-panel p-5 border border-cyan-500/30">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase">
              ALL-22 FILM & TELESTRATION STUDIO
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-400 text-xs">Broadcast Video Analysis</span>
          </div>

          {/* Match Selector Tabs */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => handleMatchSwitch('haverford')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeMatchKey === 'haverford'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Game 1: vs Haverford (Veo Official)</span>
            </button>
            <button
              onClick={() => handleMatchSwitch('blair')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeMatchKey === 'blair'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Game 2: vs Blair (123rd Day)</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              {activeMatchKey === 'haverford' ? (
                <>
                  <span>Peddie vs. The Haverford School</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                    VERIFIED VEO MATCH
                  </span>
                </>
              ) : (
                <span>Peddie vs. Blair Academy (123rd Blair Day)</span>
              )}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              {activeMatchKey === 'haverford'
                ? 'Official 2026 Season Opener Scrimmage • 4 Periods (20m each) • 32 Veo AI Camera Highlights with 1080p MP4 Video Clips'
                : 'Broadcast-grade video telestration with vector arrows, defensive compact boxes, frame-stepping, and Gemini NLP film querying.'}
            </p>
          </div>

          {activeMatchKey === 'haverford' && (
            <a
              href="https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
            >
              <span>View Full Match on Veo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Period Selector (Only for Haverford 4-quarter scrimmage) */}
        {activeMatchKey === 'haverford' && (
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wide">Filter Period:</span>
            {(['all', 1, 2, 3, 4] as const).map(p => (
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
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Telestration Suite (Left) & NLP Playlist (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Telestration Canvas & Live Video Player */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <MatchTelestration
            videoUrl={selectedClip?.videoUrl}
            thumbnailUrl={selectedClip?.thumbnailUrl}
            clipTitle={selectedClip?.description || 'Match Film'}
            sourceLabel={
              activeMatchKey === 'haverford'
                ? 'VEO AI CAMERA • HAVERFORD VS PEDDIE'
                : 'PEDDIE HUDL CAMERA 01 (ALL-22)'
            }
            matchUrl={
              activeMatchKey === 'haverford'
                ? 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/'
                : undefined
            }
          />

          {/* Active Clip Intelligence Pill */}
          {selectedClip && (
            <div className="glass-panel p-4 flex flex-col gap-2 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-black text-amber-400 flex items-center gap-1.5">
                  {selectedClip.period && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px]">
                      Q{selectedClip.period}
                    </span>
                  )}
                  <span>
                    {selectedClip.minute}&apos;:{selectedClip.second < 10 ? `0${selectedClip.second}` : selectedClip.second} • {selectedClip.type}
                  </span>
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
              <p className="text-xs text-slate-300">{selectedClip.description}</p>
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
                placeholder={
                  activeMatchKey === 'haverford'
                    ? "e.g., 'goals', 'kim', 'mckenzie', 'period 2'"
                    : "e.g., 'Show Tommy Kim goals' or 'high press'"
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <span>Quick tags:</span>
              <button onClick={() => setNlQuery('goal')} className="hover:text-amber-400 underline">Goals</button>
              <span>•</span>
              <button onClick={() => setNlQuery('shot')} className="hover:text-amber-400 underline">Shots</button>
              <span>•</span>
              <button onClick={() => setNlQuery('kim')} className="hover:text-amber-400 underline">Tommy Kim</button>
              <span>•</span>
              <button onClick={() => setNlQuery('mckenzie')} className="hover:text-amber-400 underline">McKenzie</button>
            </div>
          </div>

          {/* Film Clips Playlist */}
          <div className="glass-panel p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" /> Film Highlights ({filteredEvents.length})
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                {activeMatchKey === 'haverford' ? 'Veo AI Opener' : 'Blair Day'}
              </span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredEvents.map(ev => {
                const isSelected = selectedClip?.id === ev.id;
                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedClip(ev)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        {ev.period && (
                          <span className="px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px]">
                            Q{ev.period}
                          </span>
                        )}
                        <span>{ev.minute}&apos; {ev.type}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{ev.phase}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-white truncate">{ev.playerName}</div>
                      {ev.videoUrl && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold shrink-0">
                          1080p MP4
                        </span>
                      )}
                    </div>
                    
                    <div className="text-[11px] text-slate-400 line-clamp-2">{ev.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
