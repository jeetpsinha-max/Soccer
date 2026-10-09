'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  X, 
  Plus, 
  Trash2, 
  Copy, 
  Download, 
  Check, 
  Sparkles, 
  Zap, 
  Tag, 
  Clock, 
  Share2, 
  ShieldAlert, 
  Target, 
  Users, 
  Megaphone 
} from 'lucide-react';
import { PEDDIE_ROSTER_2026_2027 } from '@/lib/soccer-data';
import { TacticalAudio } from '@/lib/audio-synthesizer';

export interface CoachNote {
  id: string;
  category: 'Tactical Shift' | 'Set-Piece Tweak' | 'Player Form' | 'Half-Time Directive';
  text: string;
  timestamp: string;
  taggedPlayers?: string[];
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Tactical Shift': { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Set-Piece Tweak': { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  'Player Form': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Half-Time Directive': { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30' }
};

const PRESET_OBSERVATIONS = [
  'Trigger high press when opponent #6 receives back to goal',
  'Exploit wide half-spaces behind advancing fullbacks',
  'Julian Vance #4 anchor 6-yd line on defensive corners',
  'Tommy Kim #28 isolate central CB in 1v1 transitional duels',
  'Jeet Sinha #6 look for diagonal switch to right wing channel',
  'Prepare 60\' substitution: fresh legs at LM & RM wings',
  'Lockout protocol at 80\'+: switch to compact 5-4-1 block'
];

export function SidelineScratchpad() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<CoachNote[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CoachNote['category']>('Tactical Shift');
  const [selectedPlayerTags, setSelectedPlayerTags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('peddie_sideline_notes_v2');
      if (saved) {
        setNotes(JSON.parse(saved));
      } else {
        // Default starter notes for coach
        setNotes([
          {
            id: 'init-note-1',
            category: 'Tactical Shift',
            text: 'Dominating Zone 14 in 4-4-2 diamond. Rayyaan Mohiuddin controlling central tempo with Christian Tharney holding depth.',
            timestamp: 'Pre-Match Briefing',
            taggedPlayers: ['Rayyaan Mohiuddin (#14)', 'Christian Tharney (#13)']
          },
          {
            id: 'init-note-2',
            category: 'Set-Piece Tweak',
            text: 'Falcon Claw corner kick: Bennett Cucchiara inswinger targeted to back-post run by Julian Vance and Carson Wiley.',
            timestamp: 'Set-Piece Plan',
            taggedPlayers: ['Bennett Cucchiara (#7)', 'Julian Vance (#4)']
          }
        ]);
      }
    } catch {
      // Fallback
    }
  }, []);

  // Save notes to localStorage
  const saveNotes = (updated: CoachNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem('peddie_sideline_notes_v2', JSON.stringify(updated));
    } catch {}
  };

  // Keyboard shortcut listener: Alt+N or Ctrl+Shift+N
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'n') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'n')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    const handleOpenCustom = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-sideline-scratchpad', handleOpenCustom);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-sideline-scratchpad', handleOpenCustom);
    };
  }, []);

  const handleAddNote = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newNoteText.trim()) return;

    TacticalAudio.playKick();

    const note: CoachNote = {
      id: `note-${Date.now()}`,
      category: selectedCategory,
      text: newNoteText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      taggedPlayers: selectedPlayerTags.length > 0 ? [...selectedPlayerTags] : undefined
    };

    const updated = [note, ...notes];
    saveNotes(updated);
    setNewNoteText('');
    setSelectedPlayerTags([]);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all sideline notes? This action cannot be undone.')) {
      saveNotes([]);
    }
  };

  const handleCopyAll = () => {
    if (notes.length === 0) return;
    const formatted = notes
      .map(n => `[${n.timestamp}] [${n.category}]${n.taggedPlayers ? ` (${n.taggedPlayers.join(', ')})` : ''}\n${n.text}\n`)
      .join('\n---\n\n');

    const header = `⚽ PEDDIE SOCCER SAC — SIDELINE COACH OBSERVATIONS\nDate: ${new Date().toLocaleDateString()}\nTotal Notes: ${notes.length}\n\n=========================================\n\n`;

    navigator.clipboard.writeText(header + formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportFile = () => {
    if (notes.length === 0) return;
    const formatted = notes
      .map(n => `### [${n.timestamp}] ${n.category}\n${n.taggedPlayers ? `**Players:** ${n.taggedPlayers.join(', ')}\n\n` : ''}${n.text}\n`)
      .join('\n---\n\n');

    const content = `# ⚽ Peddie Soccer SAC — Sideline Coach Notes\n**Date:** ${new Date().toLocaleDateString()}\n**Source:** Official Peddie Soccer Coaching Matrix\n\n---\n\n${formatted}`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `peddie_sideline_notes_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
  };

  const togglePlayerTag = (tag: string) => {
    setSelectedPlayerTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Quick player tags (captains & key starters)
  const quickRosterTags = [
    'Tommy Kim (#28)',
    'Jeet Sinha (#6)',
    'Rayyaan Mohiuddin (#14)',
    'Christian Tharney (#13)',
    'Dylan McKenzie (#98)',
    'Bennett Cucchiara (#7)',
    'Blake Romanelli (#26)',
    'Julian Vance (#4)',
    'Carson Wiley (#16)',
    'Jeffrey Zhang (#20)'
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[95] bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="w-full sm:w-[480px] h-full bg-slate-950 border-l border-amber-400/40 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>Sideline Coach Scratchpad</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">
                  {notes.length}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Real-time In-Game & Film Tactical Log (Alt+N)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyAll}
              disabled={notes.length === 0}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition"
              title="Copy All Notes"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleExportFile}
              disabled={notes.length === 0}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition"
              title="Download Markdown File"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Note Composer Box */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex flex-col gap-3">
          {/* Category Selector */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {(['Tactical Shift', 'Set-Piece Tweak', 'Player Form', 'Half-Time Directive'] as const).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1.5 rounded-lg font-bold text-[11px] transition text-left truncate ${
                  selectedCategory === cat
                    ? `${CATEGORY_COLORS[cat].bg} ${CATEGORY_COLORS[cat].text} border ${CATEGORY_COLORS[cat].border} shadow-sm`
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Text Area */}
          <form onSubmit={handleAddNote} className="flex flex-col gap-2">
            <textarea
              value={newNoteText}
              onChange={e => setNewNoteText(e.target.value)}
              placeholder="Record live tactical adjustment, sub idea, or player note..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none resize-none h-20 transition"
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleAddNote();
                }
              }}
            />

            {/* Quick Player Tag Pills */}
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>Tag Athletes:</span>
                <span>{selectedPlayerTags.length} tagged</span>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[10px]">
                {quickRosterTags.map(pTag => {
                  const isTagged = selectedPlayerTags.includes(pTag);
                  return (
                    <button
                      key={pTag}
                      type="button"
                      onClick={() => togglePlayerTag(pTag)}
                      className={`px-2 py-0.5 rounded font-mono whitespace-nowrap transition ${
                        isTagged 
                          ? 'bg-amber-400 text-slate-950 font-bold' 
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {pTag.split(' (')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Bar & Quick Presets */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <select
                onChange={e => {
                  if (e.target.value) {
                    setNewNoteText(e.target.value);
                  }
                }}
                defaultValue=""
                className="bg-slate-950 border border-slate-800 text-[10px] text-slate-400 rounded-lg px-2 py-1.5 focus:outline-none max-w-[200px] truncate"
              >
                <option value="" disabled>Insert Quick Tactical Preset...</option>
                {PRESET_OBSERVATIONS.map((preset, idx) => (
                  <option key={idx} value={preset}>{preset}</option>
                ))}
              </select>

              <button
                type="submit"
                disabled={!newNoteText.trim()}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 text-xs font-black transition flex items-center gap-1 shadow-md shadow-amber-400/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            </div>
          </form>
        </div>

        {/* Notes Timeline List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
          {notes.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <FileText className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <div className="text-sm font-bold text-slate-400">No notes recorded yet</div>
              <div className="text-xs text-slate-600 mt-1">Use this scratchpad during matches or video analysis to log strategic thoughts.</div>
            </div>
          ) : (
            notes.map(note => {
              const style = CATEGORY_COLORS[note.category] || CATEGORY_COLORS['Tactical Shift'];
              return (
                <div 
                  key={note.id}
                  className={`p-3 rounded-xl border bg-slate-900/80 ${style.border} flex flex-col gap-2 transition hover:border-amber-400/50`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${style.bg} ${style.text}`}>
                        {note.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-600" />
                        {note.timestamp}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-600 hover:text-rose-400 transition p-1"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {note.text}
                  </p>

                  {note.taggedPlayers && note.taggedPlayers.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap pt-1 border-t border-slate-800/80">
                      {note.taggedPlayers.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-slate-800 text-amber-300 border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {notes.length > 0 && (
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono text-slate-500">
              {notes.length} note{notes.length === 1 ? '' : 's'} stored locally
            </span>
            <button
              onClick={handleClearAll}
              className="text-slate-500 hover:text-rose-400 transition font-medium text-[11px]"
            >
              Clear All Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
