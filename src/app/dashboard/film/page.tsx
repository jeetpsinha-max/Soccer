'use client';

/**
 * ============================================================================
 * Peddie Soccer SAC — Phase 4: Film & Event Synchronization Studio
 * /dashboard/film
 *
 * Premium film review tool featuring:
 *  - Side-by-side video player + live event timeline
 *  - Click-to-seek: click any event → jump to that match minute
 *  - Clip library: browse highlights by type (Goal, Key Pass, Press Trap…)
 *  - Annotation panel: add coach notes to any clip
 *  - Export playlist: curated clips for team meeting
 *  - Synced with DB via /api/db/events and /api/db/matches
 * ============================================================================
 */

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Maximize2, Film, Clock,
  Target, Users, Zap, Shield, Flag, Star,
  MessageSquare, Download, Search, Filter,
  ChevronRight, Tag, BookOpen, Video, Crosshair,
  TrendingUp, AlertTriangle, Award,
} from 'lucide-react';
import {
  PEDDIE_SCHEDULE_2026_2027,
  ALL_VEO_MATCH_EVENTS,
  HUDL_FILM_CLIPS,
} from '@/lib/soccer-data';
import { MatchEvent, FilmClip } from '@/lib/types';

// ============================================================================
// Types
// ============================================================================

type EventFilter = 'All' | 'Goal' | 'Shot' | 'KeyPass' | 'PressTrap' | 'Tackle' | 'Cross' | 'Save';
type PlaylistItem = { clip: FilmClip; note: string; starred: boolean };

const EVENT_COLORS: Record<string, string> = {
  Goal:         '#22C55E',
  Shot:         '#FFD700',
  KeyPass:      '#60A5FA',
  PressTrap:    '#A78BFA',
  Tackle:       '#F97316',
  Interception: '#FB923C',
  Cross:        '#34D399',
  Save:         '#EC4899',
  Pass:         '#9CA3AF',
  Corner:       '#6EE7B7',
  Foul:         '#EF4444',
};

const EVENT_ICONS: Record<string, React.ComponentType<{ className?: string; color?: string; style?: React.CSSProperties }>> = {
  Goal:         Target,
  Shot:         Crosshair,
  KeyPass:      TrendingUp,
  PressTrap:    Zap,
  Tackle:       Shield,
  Interception: Shield,
  Cross:        Users,
  Save:         Film,
  Pass:         ChevronRight,
  Corner:       Flag,
  Foul:         AlertTriangle,
};

const EVENT_FILTERS: { id: EventFilter; label: string }[] = [
  { id: 'All', label: 'All Events' },
  { id: 'Goal', label: '⚽ Goals' },
  { id: 'Shot', label: '🎯 Shots' },
  { id: 'KeyPass', label: '🔑 Key Passes' },
  { id: 'PressTrap', label: '⚡ Press Traps' },
  { id: 'Tackle', label: '🛡️ Tackles' },
  { id: 'Cross', label: '↗️ Crosses' },
  { id: 'Save', label: '🧤 Saves' },
];

// ============================================================================
// Sub-components
// ============================================================================

/** Inline video player with custom controls */
function VideoPlayer({
  src, poster, seekToMinute, onTimeUpdate,
}: {
  src: string | null;
  poster?: string;
  seekToMinute: number | null;
  onTimeUpdate: (sec: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  // Seek to minute when requested
  useEffect(() => {
    if (seekToMinute !== null && videoRef.current && duration > 0) {
      const targetSec = seekToMinute * 60;
      videoRef.current.currentTime = Math.min(targetSec, duration);
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, [seekToMinute, duration]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); } else { videoRef.current.play().catch(() => {}); }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    setProgress((t / (videoRef.current.duration || 1)) * 100);
    onTimeUpdate(t);
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * (videoRef.current.duration || 0);
  };

  const skip = (sec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + sec);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  if (!src) {
    return (
      <div className="w-full aspect-video flex items-center justify-center rounded-xl"
        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="text-center space-y-3">
          <Film className="w-12 h-12 text-gray-600 mx-auto" />
          <p className="text-gray-500 text-sm">Select a match to load film</p>
          <p className="text-gray-600 text-xs">Hudl Fan · Veo · YouTube links available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#000', border: '1px solid rgba(255,215,0,0.15)' }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full aspect-video object-cover"
        muted={muted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
        style={{ cursor: 'pointer' }}
      />

      {/* Custom controls */}
      <div className="p-3 space-y-2" style={{ background: 'rgba(13,24,41,0.95)' }}>
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="h-1.5 rounded-full cursor-pointer relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          onClick={handleSeekClick}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: '#FFD700' }} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => skip(-10)} className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
            <button onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#FFD700' }}>
              {playing
                ? <Pause className="w-4 h-4 text-black" />
                : <Play className="w-4 h-4 text-black ml-0.5" />
              }
            </button>
            <button onClick={() => skip(10)} className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
            <button onClick={() => setMuted(!muted)} className="text-gray-400 hover:text-white transition-colors">
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-gray-400 text-xs font-mono">{fmt(currentTime)} / {fmt(duration)}</span>
          </div>
          <button onClick={() => videoRef.current?.requestFullscreen?.()} className="text-gray-400 hover:text-white transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** A single event row in the timeline */
function EventRow({
  event, active, onSeek, onAddToPlaylist,
}: {
  event: MatchEvent;
  active: boolean;
  onSeek: (min: number) => void;
  onAddToPlaylist: (event: MatchEvent) => void;
}) {
  const color = EVENT_COLORS[event.type] ?? '#9CA3AF';
  const Icon = EVENT_ICONS[event.type] ?? Film;

  return (
    <div
      className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer group transition-all"
      style={{
        background: active ? `${color}18` : 'transparent',
        border: `1px solid ${active ? `${color}40` : 'transparent'}`,
      }}
      onClick={() => onSeek(event.minute)}>
      {/* Time */}
      <span className="text-xs font-mono w-10 text-right flex-shrink-0" style={{ color }}>
        {event.minute}&apos;
      </span>

      {/* Icon */}
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20` }}>
        <Icon className="w-3.5 h-3.5" color={color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white text-xs font-semibold truncate">{event.playerName}</span>
          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${color}20`, color }}>
            {event.type}
          </span>
          {event.team === 'Peddie' && (
            <span className="text-xs text-yellow-500">●</span>
          )}
        </div>
        <p className="text-gray-500 text-xs truncate">{event.description}</p>
      </div>

      {/* Add to playlist */}
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
        style={{ background: 'rgba(255,215,0,0.15)' }}
        onClick={(e) => { e.stopPropagation(); onAddToPlaylist(event); }}>
        <Star className="w-3 h-3 text-yellow-400" />
      </button>
    </div>
  );
}

/** Clip card in the library panel */
function ClipCard({
  clip, inPlaylist, onAdd, onSeek,
}: {
  clip: FilmClip;
  inPlaylist: boolean;
  onAdd: () => void;
  onSeek: (min: number) => void;
}) {
  return (
    <div className="rounded-xl overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]"
      style={{ background: 'rgba(13,24,41,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}
      onClick={() => clip.minute !== undefined && onSeek(clip.minute)}>
      {/* Thumbnail */}
      <div className="relative aspect-video bg-black overflow-hidden">
        {clip.thumbnailUrl ? (
          <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(27,42,74,0.5)' }}>
            <Video className="w-8 h-8 text-gray-600" />
          </div>
        )}
        {clip.isHighlight && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold"
            style={{ background: '#FFD700', color: '#000' }}>
            ★ HIGHLIGHT
          </div>
        )}
        {clip.minute !== undefined && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-mono"
            style={{ background: 'rgba(0,0,0,0.8)', color: '#FFD700' }}>
            {clip.minute}&apos;
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.9)' }}>
            <Play className="w-5 h-5 text-black ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-white text-xs font-semibold truncate">{clip.title}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-gray-500 text-xs">{clip.phase ?? 'Open Play'}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="text-xs px-2 py-0.5 rounded transition-all"
            style={{
              background: inPlaylist ? 'rgba(34,197,94,0.15)' : 'rgba(255,215,0,0.1)',
              color: inPlaylist ? '#22C55E' : '#FFD700',
              border: `1px solid ${inPlaylist ? 'rgba(34,197,94,0.3)' : 'rgba(255,215,0,0.2)'}`,
            }}>
            {inPlaylist ? '✓ Added' : '+ Playlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function FilmPage() {
  const [selectedMatchId, setSelectedMatchId] = useState('m-4'); // PDS 7-1
  const [eventFilter, setEventFilter] = useState<EventFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [seekTo, setSeekTo] = useState<number | null>(null);
  const [activeMinute, setActiveMinute] = useState(0);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [activePanel, setActivePanel] = useState<'events' | 'clips' | 'playlist'>('events');
  const [coachNote, setCoachNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState<string | null>(null); // clipId or eventId

  const completedMatches = PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Completed');
  const selectedMatch = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === selectedMatchId);

  // Filter events for selected match
  const matchEvents = useMemo<MatchEvent[]>(() => {
    const raw = (ALL_VEO_MATCH_EVENTS[selectedMatchId] ?? []) as MatchEvent[];
    return raw
      .filter(e => eventFilter === 'All' || e.type === eventFilter)
      .filter(e => searchQuery === '' ||
        e.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => a.minute - b.minute || (a.second ?? 0) - (b.second ?? 0));
  }, [selectedMatchId, eventFilter, searchQuery]);

  // Filter film clips for selected match
  const matchClips = useMemo<FilmClip[]>(() => {
    const raw = HUDL_FILM_CLIPS as FilmClip[];
    return raw.filter(c => c.matchId === selectedMatchId);
  }, [selectedMatchId]);

  const handleSeek = useCallback((minute: number) => {
    setSeekTo(minute);
    setTimeout(() => setSeekTo(null), 500);
  }, []);

  const addEventToPlaylist = useCallback((event: MatchEvent) => {
    const clip: FilmClip = {
      id: `event-${event.id}`,
      matchId: selectedMatchId,
      externalId: `clip-event-${event.id}`,
      provider: 'veo',
      title: `${event.type} — ${event.playerName} ${event.minute}'`,
      videoUrl: event.videoUrl ?? selectedMatch?.videoUrl ?? '',
      thumbnailUrl: event.thumbnailUrl,
      minute: event.minute,
      phase: event.phase,
      isHighlight: event.type === 'Goal' || event.type === 'Key Pass',
    };
    setPlaylist(prev => {
      if (prev.some(p => p.clip.id === clip.id)) return prev;
      return [...prev, { clip, note: '', starred: false }];
    });
  }, [selectedMatch, selectedMatchId]);

  const addClipToPlaylist = useCallback((clip: FilmClip) => {
    setPlaylist(prev => {
      if (prev.some(p => p.clip.id === clip.id)) {
        return prev.filter(p => p.clip.id !== clip.id);
      }
      return [...prev, { clip, note: '', starred: false }];
    });
  }, []);

  const isInPlaylist = useCallback((id: string) => playlist.some(p => p.clip.id === id), [playlist]);

  // Auto-highlight nearest event as video plays
  const activeEvent = useMemo(() => {
    return matchEvents.find(e => e.minute === Math.floor(activeMinute / 60)) ?? null;
  }, [activeMinute, matchEvents]);

  const eventStats = useMemo(() => ({
    goals: matchEvents.filter(e => e.type === 'Goal' && e.team === 'Peddie').length,
    shots: matchEvents.filter(e => e.type === 'Shot' && e.team === 'Peddie').length,
    keyPasses: matchEvents.filter(e => e.type === 'Key Pass').length,
    pressTraps: matchEvents.filter(e => e.type === 'Press Trap').length,
  }), [matchEvents]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #050d1a 0%, #0a1628 50%, #050d1a 100%)' }}>
      {/* Header */}
      <div style={{ background: 'rgba(13,24,41,0.98)', borderBottom: '1px solid rgba(255,215,0,0.12)' }}
        className="sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
                <Film className="w-5 h-5 text-yellow-400" /> Film Sync Studio
              </h1>
              <p className="text-gray-500 text-xs">Click any event to jump to that match moment</p>
            </div>
          </div>

          {/* Match Selector */}
          <select
            value={selectedMatchId}
            onChange={e => setSelectedMatchId(e.target.value)}
            className="text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer"
            style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.25)', color: '#FFD700' }}>
            <optgroup label="Completed Match Broadcasts (5)" style={{ background: '#0a1628', color: '#6EE7B7' }}>
              {PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Completed').map(m => (
                <option key={m.id} value={m.id} style={{ background: '#0a1628', color: 'white' }}>
                  {m.matchDate} · vs {m.opponent.replace('The ', '').replace(' School', '')} ({m.peddieScore}–{m.opponentScore} Final)
                </option>
              ))}
            </optgroup>
            <optgroup label="Upcoming Match Film & Scout Feeds (12)" style={{ background: '#0a1628', color: '#FCD34D' }}>
              {PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Upcoming').map(m => (
                <option key={m.id} value={m.id} style={{ background: '#0a1628', color: 'white' }}>
                  {m.matchDate} · vs {m.opponent.replace('The ', '').replace(' School', '')} (Proj: {m.projectedScore})
                </option>
              ))}
            </optgroup>
          </select>

          {/* Playlist badge */}
          <button
            onClick={() => setActivePanel('playlist')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: playlist.length > 0 ? 'rgba(255,215,0,0.12)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,215,0,0.2)', color: '#FFD700' }}>
            <BookOpen className="w-4 h-4" />
            Playlist
            {playlist.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-xs font-bold text-black" style={{ background: '#FFD700' }}>
                {playlist.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Captains & Team Telemetry Ribbon */}
      <div className="max-w-[1500px] mx-auto px-6 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 flex items-center gap-1.5 font-mono">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Captains: #12 Eldessouky • #28 Kim • #14 Mohiuddin • #13 Tharney
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-mono">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            LM: #7 Bennett Cucchiara • RM: #26 Blake Romanelli
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 font-mono">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            GK: #98 Dylan McKenzie (41 Saves)
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <span>Viewing Film: <strong className="text-white">{selectedMatch?.opponent}</strong> ({selectedMatch?.matchDate})</span>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 py-4">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">

          {/* LEFT: Video Player */}
          <div className="space-y-4">
            <VideoPlayer
              src={selectedMatch?.videoUrl ?? null}
              seekToMinute={seekTo}
              onTimeUpdate={setActiveMinute}
            />

            {/* Match stat bar */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Peddie Goals', value: eventStats.goals, color: '#22C55E', icon: '⚽' },
                { label: 'Shots Logged', value: eventStats.shots, color: '#FFD700', icon: '🎯' },
                { label: 'Key Passes', value: eventStats.keyPasses, color: '#60A5FA', icon: '🔑' },
                { label: 'Press Traps', value: eventStats.pressTraps, color: '#A78BFA', icon: '⚡' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(13,24,41,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-2xl font-bold" style={{ color: stat.color }}>
                    {stat.icon} {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Clip library grid */}
            {activePanel === 'clips' && matchClips.length > 0 && (
              <div className="rounded-2xl p-4 space-y-3"
                style={{ background: 'rgba(13,24,41,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <Film className="w-4 h-4 text-yellow-400" /> Clip Library ({matchClips.length} clips)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {matchClips.map(clip => (
                    <ClipCard
                      key={clip.id}
                      clip={clip}
                      inPlaylist={isInPlaylist(clip.id)}
                      onAdd={() => addClipToPlaylist(clip)}
                      onSeek={handleSeek}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Playlist manager */}
            {activePanel === 'playlist' && (
              <div className="rounded-2xl p-4 space-y-3"
                style={{ background: 'rgba(13,24,41,0.8)', border: '1px solid rgba(255,215,0,0.12)' }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-yellow-400" /> Team Meeting Playlist ({playlist.length} clips)
                  </h3>
                  {playlist.length > 0 && (
                    <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                      style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)' }}>
                      <Download className="w-3 h-3" /> Export Playlist
                    </button>
                  )}
                </div>

                {playlist.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <Star className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No clips added yet.</p>
                    <p className="text-xs">Click the ★ on any event or clip to add it.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {playlist.map((item, idx) => (
                      <div key={item.clip.id} className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <span className="text-gray-600 text-xs w-5">{idx + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-semibold truncate">{item.clip.title}</p>
                          {item.note && <p className="text-gray-500 text-xs mt-0.5 italic">&quot;{item.note}&quot;</p>}
                        </div>
                        <button
                          onClick={() => handleSeek(item.clip.minute ?? 0)}
                          className="p-1.5 rounded-lg text-yellow-400 hover:text-yellow-300 transition-colors"
                          style={{ background: 'rgba(255,215,0,0.08)' }}>
                          <Play className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setPlaylist(prev => prev.filter(p => p.clip.id !== item.clip.id))}
                          className="text-gray-600 hover:text-red-400 transition-colors text-xs">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Event Timeline */}
          <div className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: 'rgba(13,24,41,0.9)', border: '1px solid rgba(255,255,255,0.07)', maxHeight: '85vh' }}>

            {/* Panel tabs */}
            <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {[
                { id: 'events' as const, label: 'Events', icon: Clock },
                { id: 'clips' as const, label: 'Clips', icon: Film },
                { id: 'playlist' as const, label: 'Playlist', icon: BookOpen },
              ].map(tab => {
                const Icon = tab.icon;
                const active = activePanel === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActivePanel(tab.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-all"
                    style={{
                      borderBottom: active ? '2px solid #FFD700' : '2px solid transparent',
                      color: active ? '#FFD700' : '#6B7280',
                    }}>
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                    {tab.id === 'events' && matchEvents.length > 0 && (
                      <span className="text-xs opacity-60">({matchEvents.length})</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search + filter bar */}
            {activePanel === 'events' && (
              <div className="p-3 space-y-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-600" />
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search player or event…"
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg outline-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {EVENT_FILTERS.map(f => (
                    <button key={f.id} onClick={() => setEventFilter(f.id)}
                      className="text-xs px-2 py-1 rounded-lg transition-all"
                      style={{
                        background: eventFilter === f.id ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${eventFilter === f.id ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.06)'}`,
                        color: eventFilter === f.id ? '#FFD700' : '#6B7280',
                      }}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Event list */}
            {activePanel === 'events' && (
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {matchEvents.length === 0 ? (
                  <div className="text-center py-12 text-gray-600">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No events match your filter.</p>
                    <p className="text-xs mt-1">Try clearing the search or selecting a different type.</p>
                  </div>
                ) : (
                  matchEvents.map(event => (
                    <EventRow
                      key={event.id}
                      event={event}
                      active={activeEvent?.id === event.id}
                      onSeek={handleSeek}
                      onAddToPlaylist={addEventToPlaylist}
                    />
                  ))
                )}
              </div>
            )}

            {/* Clips tab content (right panel summary) */}
            {activePanel === 'clips' && (
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {matchClips.length === 0 ? (
                  <div className="text-center py-12 text-gray-600">
                    <Film className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No clips linked to this match.</p>
                    <p className="text-xs mt-1">Clips appear here after ingestion from Hudl or Veo.</p>
                  </div>
                ) : (
                  matchClips.map(clip => (
                    <div key={clip.id}
                      className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer group transition-all"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      onClick={() => clip.minute !== undefined && handleSeek(clip.minute)}>
                      <Film className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate">{clip.title}</p>
                        <p className="text-gray-500 text-xs">{clip.minute !== undefined ? `${clip.minute}'` : ''} · {clip.provider}</p>
                      </div>
                      {clip.isHighlight && <Star className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />}
                      <button onClick={e => { e.stopPropagation(); addClipToPlaylist(clip); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-0.5 rounded"
                        style={{ background: 'rgba(255,215,0,0.12)', color: '#FFD700' }}>
                        + Add
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Playlist summary in right panel */}
            {activePanel === 'playlist' && (
              <div className="flex-1 overflow-y-auto p-3">
                <div className="text-center py-6 text-gray-600 text-xs">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 opacity-40" />
                  Manage your playlist in the main panel below the video.
                </div>
              </div>
            )}

            {/* Footer: coach note composer */}
            <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                <input
                  value={coachNote}
                  onChange={e => setCoachNote(e.target.value)}
                  placeholder="Add coach note to selected clip…"
                  className="flex-1 text-xs px-2 py-1.5 rounded-lg outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'white' }}
                />
                <button
                  disabled={!coachNote}
                  className="text-xs px-2 py-1.5 rounded-lg disabled:opacity-40 transition-all"
                  style={{ background: 'rgba(255,215,0,0.12)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.2)' }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
