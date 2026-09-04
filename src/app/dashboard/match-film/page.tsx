'use client';

import React, { useState } from 'react';
import { MatchTelestration } from '@/components/video/MatchTelestration';
import { MATCH_EVENTS_LIVE_BLAIR } from '@/lib/soccer-data';
import { SoccerTacticalAgent } from '@/lib/agents/soccer-agents';
import { Film, Search, Sparkles, Video, PlayCircle } from 'lucide-react';

export default function MatchFilmPage() {
  const [nlQuery, setNlQuery] = useState('');
  const [selectedClip, setSelectedClip] = useState(MATCH_EVENTS_LIVE_BLAIR[10]); // Tommy Kim match-winning goal

  const filteredEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage(nlQuery, MATCH_EVENTS_LIVE_BLAIR);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-5 border border-cyan-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-[11px] uppercase">
            ALL-22 FILM & TELESTRATION STUDIO
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-slate-400 text-xs">High-Angle Tactical Scouting</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          Peddie Falcons Video Match Film Room
        </h1>
        <p className="text-xs text-slate-300 mt-0.5">
          Broadcast-grade video telestration with vector arrows, defensive compact boxes, frame-stepping, and Gemini NLP film querying.
        </p>
      </div>

      {/* Main Grid: Telestration Suite (Left) & NLP Playlist (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Telestration Canvas & Player */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <MatchTelestration />

          {/* Active Clip Intelligence Pill */}
          {selectedClip && (
            <div className="glass-panel p-4 flex flex-col gap-2 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-black text-amber-400">
                  {selectedClip.minute}&apos;:{selectedClip.second < 10 ? `0${selectedClip.second}` : selectedClip.second} • {selectedClip.type}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-400 font-mono text-[10px] font-bold">
                  {selectedClip.phase}
                </span>
              </div>
              <div className="text-sm font-bold text-white">
                {selectedClip.playerName} (#{selectedClip.playerNumber})
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
                placeholder="e.g., 'Show Tommy Kim goals' or 'high press'"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <span>Quick tags:</span>
              <button onClick={() => setNlQuery('goal')} className="hover:text-amber-400 underline">Goals</button>
              <span>•</span>
              <button onClick={() => setNlQuery('press')} className="hover:text-amber-400 underline">Pressing</button>
              <span>•</span>
              <button onClick={() => setNlQuery('kim')} className="hover:text-amber-400 underline">Tommy Kim</button>
              <span>•</span>
              <button onClick={() => setNlQuery('wachtveitl')} className="hover:text-amber-400 underline">Wachtveitl</button>
            </div>
          </div>

          {/* Film Clips Playlist */}
          <div className="glass-panel p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" /> Film Highlights ({filteredEvents.length})
              </span>
              <span className="text-[10px] font-mono text-cyan-400">Peddie vs Blair Day</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredEvents.map(ev => {
                const isSelected = selectedClip?.id === ev.id;
                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedClip(ev)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-400 text-white'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> {ev.minute}&apos; {ev.type}
                      </span>
                      <span className="text-[10px] text-slate-400">{ev.phase}</span>
                    </div>
                    <div className="font-semibold text-white">{ev.playerName}</div>
                    <div className="text-[11px] text-slate-400 truncate">{ev.description}</div>
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
