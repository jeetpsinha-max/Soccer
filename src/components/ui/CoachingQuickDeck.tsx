'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  FileText, 
  Printer, 
  Sparkles, 
  Radio, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Swords, 
  Sliders, 
  Zap, 
  Command 
} from 'lucide-react';
import { TacticalAudio } from '@/lib/audio-synthesizer';

export function CoachingQuickDeck() {
  const pathname = usePathname();
  const isFootball = pathname?.startsWith('/football');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [notesCount, setNotesCount] = useState(0);

  // Monitor notes count
  useEffect(() => {
    const updateNotesCount = () => {
      try {
        const saved = localStorage.getItem('peddie_sideline_notes_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          setNotesCount(Array.isArray(parsed) ? parsed.length : 0);
        }
      } catch {}
    };

    updateNotesCount();
    const interval = setInterval(updateNotesCount, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleOpenSearch = () => {
    TacticalAudio.playKick();
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  const handleOpenNotes = () => {
    TacticalAudio.playKick();
    window.dispatchEvent(new CustomEvent('open-sideline-scratchpad'));
  };

  const handleOpenCouncil = () => {
    TacticalAudio.playKick();
    window.dispatchEvent(new CustomEvent('open-council-drawer'));
  };

  const handleToggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    TacticalAudio.isMuted = next;
    if (!next) {
      TacticalAudio.playWhistle(150);
    }
  };

  return (
    <aside 
      aria-label="Sideline Quick Deck"
      className="fixed bottom-6 left-6 z-40 no-print flex flex-col items-start gap-1.5 pointer-events-auto"
    >
      {/* Expanded Quick Deck Pill */}
      {!isCollapsed ? (
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-amber-400/40 shadow-[0_0_30px_rgba(0,0,0,0.8),0_0_15px_rgba(245,179,53,0.15)] animate-in slide-in-from-bottom-2 duration-150">
          {/* Quick Search (Cmd+K) */}
          <button
            onClick={handleOpenSearch}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-amber-400 text-slate-300 hover:text-slate-950 border border-slate-800 hover:border-amber-400 text-xs font-bold transition group shadow-sm"
            title="Search anything (Cmd+K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-400 group-hover:text-slate-950 transition-colors" />
            <span className="hidden sm:inline">Search</span>
            <span className="px-1.5 py-0.2 rounded bg-slate-800 group-hover:bg-slate-950/20 text-slate-400 group-hover:text-slate-950 font-mono text-[9px] font-black border border-slate-700/60">
              ⌘K
            </span>
          </button>

          {/* Coach Scratchpad (Alt+N) */}
          <button
            onClick={handleOpenNotes}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition group shadow-sm"
            title="Open Sideline Coach Scratchpad (Alt+N)"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="hidden sm:inline">Notes</span>
            {notesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 font-mono text-[9px] font-black">
                {notesCount}
              </span>
            )}
          </button>

          {/* Quick Print Call Sheet */}
          <Link
            href="/dashboard/call-sheet"
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition group shadow-sm"
            title="Open Sideline Call Sheet"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-300" />
            <span className="hidden md:inline">Call Sheet</span>
          </Link>

          {/* AI Council Quick Summon */}
          <button
            onClick={handleOpenCouncil}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition group shadow-sm"
            title="Summon Multi-Agent AI Council"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300 animate-pulse" />
            <span className="hidden md:inline">AI Council</span>
          </button>

          {/* Touchline Simulator Quick Link */}
          <Link
            href="/dashboard/simulator"
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition group shadow-sm"
            title="Touchline Match Simulator"
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300" />
            <span className="hidden lg:inline">Simulator</span>
          </Link>

          {/* Audio Synthesizer Mute / Unmute */}
          <button
            onClick={handleToggleAudio}
            className={`p-2 rounded-xl border text-xs transition shadow-sm ${
              isAudioMuted 
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white' 
                : 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
            }`}
            title={isAudioMuted ? 'Tactical Audio FX Muted' : 'Tactical Audio FX Active'}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Collapse Deck Toggle */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-500 hover:text-slate-300 border border-slate-800 transition"
            title="Minimize Quick Deck"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Minimized Trigger Pill */
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-amber-400/40 text-slate-300 hover:text-white hover:border-amber-400 shadow-xl transition-all duration-200 group active:scale-95"
          title="Expand Sideline Quick Deck"
        >
          <div className="w-5 h-5 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[10px]">
            ⚡
          </div>
          <span className="text-xs font-black text-amber-400">COACHING DECK</span>
          {notesCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 font-mono text-[9px] font-black">
              {notesCount}
            </span>
          )}
          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        </button>
      )}
    </aside>
  );
}
