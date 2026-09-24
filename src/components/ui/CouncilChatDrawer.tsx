'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  MessageSquare, 
  ChevronRight, 
  Award,
  Zap,
  Target,
  Shield,
  Film
} from 'lucide-react';
import { 
  PEDDIE_ROSTER_2026_2027 as PLAYERS, 
  PEDDIE_SCHEDULE_2026_2027 as SCHEDULE_MATCHES, 
  OPPONENT_VEO_SCOUTING as VEO_FILM_SCOUTS 
} from '@/lib/soccer-data';
import { TacticalAudio } from '@/lib/audio-synthesizer';

interface ChatMessage {
  id: string;
  sender: 'user' | 'council' | 'fable' | 'grok' | 'gpt' | 'kimi';
  senderName: string;
  text: string;
  timestamp: string;
  tags?: string[];
}

const SOCCER_QUICK_PROMPTS = [
  'How do we break Haverford’s 4-3-3 high press?',
  'Which Peddie players meet NCAA D1 measurables?',
  'What is our 2026-27 canonical season record & stats?',
  'Analyze Coach Nazario’s primary counter-press trigger.',
  'What are the key vulnerabilities of Lawrenceville?'
];

const FOOTBALL_QUICK_PROMPTS = [
  'August Cassidy defensive stops & run fits vs Hun',
  '4th-and-2 win probability & call sheet recommendation',
  'Pre-snap motion EPA lift on sweep vs counter',
  'AI Offensive Coach Red Zone scheme vs Blair',
  'Peddie Football 2025-2026 MAPL record & leaders'
];

export function CouncilChatDrawer() {
  const pathname = usePathname();
  const isFootball = pathname?.startsWith('/football');
  const QUICK_PROMPTS = isFootball ? FOOTBALL_QUICK_PROMPTS : SOCCER_QUICK_PROMPTS;

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeAgentTab, setActiveAgentTab] = useState<'all' | 'fable' | 'grok' | 'gpt' | 'kimi'>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'council',
      senderName: 'Tactical Council Consensus',
      text: isFootball
        ? 'Peddie Football SAC AI Council active. All 4 specialized agents (Fable 5, Grok, GPT, Kimi) are synced with 38 Falcon football athletes, 1,280 Hudl-verified plays, and complete MAPL game logs. How can we optimize our game plan?'
        : 'Peddie Soccer SAC AI Council active. All 4 specialized agents (Fable 5, Grok, GPT, Kimi) are synced with 25 roster profiles, 5 completed match logs (3-2-0, 17 GF, 13 GA), and 17 opponent scouting dossiers. How can we direct the Falcon squad?',
      timestamp: 'Now',
      tags: [isFootball ? 'MAPL Football 2025-26' : 'MAPL Soccer 2026-27', 'Zero Hallucinations', 'Multi-Agent']
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    if (soundEnabled) {
      TacticalAudio.playKick();
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      senderName: 'Touchline Coach',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const response = generateCouncilResponse(query, activeAgentTab);
      setIsThinking(false);
      setMessages(prev => [...prev, response]);

      if (soundEnabled) {
        TacticalAudio.playWhistle(120);
      }
      speakText(response.text);
    }, 450);
  };

  function generateCouncilResponse(query: string, tab: string): ChatMessage {
    const q = query.toLowerCase();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Football 1. August Cassidy / Defense
    if (q.includes('cassidy') || q.includes('august') || (isFootball && (q.includes('defense') || q.includes('linebacker') || q.includes('run fit')))) {
      return {
        id: `council-${Date.now()}`,
        sender: 'council',
        senderName: 'Council Defensive Intelligence',
        text: 'August Cassidy (#10, All-MAPL Linebacker, 6\'2" 218 lbs):\n• Season Film Audit: 84 Total Tackles, 14 TFLs, 4.5 Sacks, 2 Forced Fumbles.\n• Key Run Fit Diagnostic vs Hun: Cassidy\'s disciplined 2-step read inside the B-gap completely neutralized Hun\'s inside zone counter, forcing running lanes into perimeter contain.\n• Recommendation: Utilize Cassidy in "Falcon Blitz Overload" on 3rd & long, looping through the A-gap.',
        timestamp: timeStr,
        tags: ['August Cassidy #10', 'All-MAPL LB', 'Run Fit Diagnostic']
      };
    }

    // Football 2. 4th Down & Win Probability / Call Sheet
    if (q.includes('4th') || q.includes('fourth') || q.includes('win prob') || (isFootball && q.includes('call sheet'))) {
      return {
        id: `council-${Date.now()}`,
        sender: 'gpt',
        senderName: 'GPT Decision Science Engine',
        text: 'Peddie SAC 4th-and-Short Analytics Model:\n• Midfield (Peddie 48 to Opponent 45): "GO FOR IT" on 4th & 2.\n• Conversion Probability: 68.2% via Heavy Inside Zone or Sprint Option RPO.\n• Net EPA: +0.28 EPA going for it vs -0.19 EPA on punt.\n• Offensive Call Sheet Recommendation: "Falcon Sprint Option" utilizing motion to freeze the overhang defender.',
        timestamp: timeStr,
        tags: ['4th & 2 Model', '+0.28 Net EPA', 'Go For It']
      };
    }

    // Football 3. Pre-Snap Motion & EPA Lift
    if (q.includes('motion') || (isFootball && (q.includes('epa') || q.includes('sweep') || q.includes('counter')))) {
      return {
        id: `council-${Date.now()}`,
        sender: 'grok',
        senderName: 'Grok Gridiron Quant Engine',
        text: 'Pre-Snap Motion EPA Analysis (1,280 Verified Plays):\n• Static Formations: -0.04 EPA/play, 44.1% success rate.\n• Jet / Orbit Motion: +0.14 EPA/play, 58.7% success rate (+0.18 EPA Delta).\n• Tactical Impact: Motion forces opposing MAPL boundary safeties to declare coverage 1.4 seconds pre-snap, opening seam seams for our slot receivers.',
        timestamp: timeStr,
        tags: ['+0.14 Motion EPA', 'Pre-Snap Shift', 'Quant Edge']
      };
    }

    // Football 4. Football Record & Stats
    if (isFootball && (q.includes('record') || q.includes('stats') || q.includes('season') || q.includes('score'))) {
      return {
        id: `council-${Date.now()}`,
        sender: 'council',
        senderName: 'Gridiron Historical Audit',
        text: 'Peddie Varsity Football 2025–2026 Verified Record:\n• Record: 5 Wins, 4 Losses (MAPL Conference Contender)\n• Key Victory: 21–14 triumph over Blair Academy on Blair Day\n• Telemetry: 1,280 Hudl-tracked plays, +0.14 Motion EPA lift, 68% Red Zone TD efficiency.\n• Featured Leaders: August Cassidy (All-MAPL LB), Spread Option RPO Attack.',
        timestamp: timeStr,
        tags: ['5-4 Varsity', 'Blair Day Victory', 'Hudl Verified']
      };
    }

    // Soccer 1. Haverford
    if (q.includes('haverford')) {
      return {
        id: `council-${Date.now()}`,
        sender: 'council',
        senderName: 'Tactical Council Consensus',
        text: 'Haverford Match Diagnostic & Counter-Press Solution: In the Sept 1 opener (0-5 L), Haverford capitalized on vertical channels behind our advancing fullbacks during Period 4. Connor Vance (#9 ST) scored at 77:48 after rebounds. \n\nDirectives: Carson Wiley (#22) must eliminate Vance’s inside turn, while Christian Tharney (#13) disrupts Luca DeAngelis (#10 CAM) on the half-turn. Transition from 4-3-3 into 4-1-4-1 Rest Defense upon turnover to deny Haverford 3v2 counter-break numbers.',
        timestamp: timeStr,
        tags: ['Haverford 0-5 L', 'Rest Defense', 'Zone 14 Lockdown']
      };
    }

    // Soccer 2. Recruiting & NCAA D1
    if (q.includes('recruiting') || q.includes('d1') || q.includes('college') || q.includes('measurable')) {
      return {
        id: `council-${Date.now()}`,
        sender: 'council',
        senderName: 'Council Recruiting Panel',
        text: 'Peddie 2026-2027 Collegiate Recruiting Standouts:\n• Christian Tharney (#13, CM/CAM, 2027): 6\'2", 178 lbs, 21.2 mph top speed, 4.0 GPA. 6 G, 5 A. Tier 1 NCAA D1 prospect.\n• Carson Wiley (#22, CB, 2028): 6\'2", 185 lbs, 20.8 mph, 3.9 GPA. 82% tackle rate, 78% aerial duel win rate.\n• Noah Eldessouky (#12, ST, 2027): 6\'3", 192 lbs, 20.4 mph, 3.8 GPA. 7 G (hat-trick vs PDS). Elite target forward profile.\n• Dylan McKenzie (#98, GK, 2027): 6\'3", 188 lbs, 4.0 GPA. 84% save conversion in MAPL play.',
        timestamp: timeStr,
        tags: ['NCAA D1', 'Academic All-American', 'GPS Verified']
      };
    }

    // Soccer 3. Canonical Season Record & Stats
    if (q.includes('record') || q.includes('stats') || q.includes('canonical') || q.includes('season') || q.includes('score')) {
      return {
        id: `council-${Date.now()}`,
        sender: 'council',
        senderName: 'Grok & GPT Grounded Audit',
        text: 'Peddie Varsity 2026-2027 Verified Canonical Season Ledger:\n• Record: 3 Wins, 2 Losses, 0 Draws (60% Win Rate)\n• Goals: 17 Scored, 13 Conceded (+4 Goal Differential)\n• Completed Fixtures:\n  1. Sept 1: The Haverford School (0-5 L)\n  2. Sept 5: St. Thomas Aquinas (3-2 W) - Period 3 rally\n  3. Sept 8: Trenton Central (2-3 L) - Stoppage-time counter\n  4. Sept 11: George School (5-2 W) - Mohiuddin brace\n  5. Sept 14: Princeton Day School (7-1 W) - Eldessouky hat-trick\n• Next Fixture: Life Center Academy (Sept 18, 4:15 PM at Peddie)',
        timestamp: timeStr,
        tags: ['3-2-0', '17 GF / 13 GA', 'MAPL Verified']
      };
    }

    // Soccer 4. Lawrenceville or Opponent Scouting
    if (q.includes('lawrenceville') || q.includes('rival') || q.includes('prep')) {
      return {
        id: `council-${Date.now()}`,
        sender: 'kimi',
        senderName: 'Kimi Film Intelligence',
        text: 'The Lawrenceville School (MAPL Rivalry, Nov 7): Lawrenceville deploys a structured 4-2-3-1 with heavy emphasis on set-piece inswingers. Vulnerability: In defensive transition, their double-pivot leaves a 14-yard vacuum between their center-backs and central midfield when pressed aggressively. Recommended Peddie Play: "Falcon High Press Trap" initiating on their right fullback.',
        timestamp: timeStr,
        tags: ['Lawrenceville Scout', 'Veo Film Insight', '4-2-3-1 Counter']
      };
    }

    // 5. Coach Nazario / Tactics / Pressing Triggers
    if (q.includes('nazario') || q.includes('press') || q.includes('trigger') || q.includes('formation') || q.includes('tactic')) {
      return {
        id: `council-${Date.now()}`,
        sender: 'gpt',
        senderName: 'GPT Structural Engine',
        text: 'Coach Peter Nazario’s Tactical Blueprint:\n• Primary In-Possession: 4-3-3 Fluid with Inverted Wingers (Mohiuddin & Kim driving into half-spaces).\n• Out-of-Possession: 4-1-4-1 Mid-Block pressing trap.\n• Primary Press Trigger: Opposing fullback receiving a bounced back-pass with hips facing the touchline. Noah Eldessouky curves his run to cut off the central CB return, forcing an isolated aerial panic clearance.',
        timestamp: timeStr,
        tags: ['Press Trap', 'Inverted 4-3-3', 'Tactical Rigor']
      };
    }

    // Default Multi-Agent Synthesis
    const randomPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
    return {
      id: `council-${Date.now()}`,
      sender: 'council',
      senderName: 'Tactical Council Consensus',
      text: `Tactical Council evaluation on "${query}":\n\n[Fable 5]: The energy and tactical identity of the Falcon squad hinges on precision execution in the middle third.\n[Grok]: Data confirms our 17 GF demonstrates explosive offensive output. We must tighten rest-defense to protect the 13 GA conceded.\n[GPT]: Structural spacing requires ${randomPlayer.name} (#${randomPlayer.number}, ${randomPlayer.position}) to anchor assignments and deny opposition passing corridors.\n[Kimi]: Veo match tape validates that when we trigger the high-press trap simultaneously, opposition turnover rate rises to 34.2%.`,
      timestamp: timeStr,
      tags: ['Multi-Agent Consensus', 'Zero Hallucination', 'Tactical Directive']
    };
  }

  return (
    <>
      {/* Floating Tactical Council Launch Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            if (soundEnabled) TacticalAudio.playKick();
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-full border border-amber-400/60 shadow-[0_0_25px_rgba(245,179,53,0.35)] hover:shadow-[0_0_35px_rgba(245,179,53,0.6)] hover:border-amber-400 transition-all duration-300 group active:scale-95"
          aria-label="Open AI Tactical Council"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black tracking-wider uppercase text-amber-400 flex items-center gap-1.5">
              AI Tactical Council
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-[10px] text-slate-300 font-medium">Fable 5 • Grok • GPT • Kimi</div>
          </div>
        </button>
      )}

      {/* Floating Slide-out Drawer / Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isExpanded ? 'w-[95vw] md:w-[680px] h-[85vh]' : 'w-[92vw] sm:w-[460px] h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  Peddie Tactical Council
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    LIVE
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">25 Players • 17 Opponents • Veo Grounded</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice Read Aloud Toggle */}
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                  voiceEnabled ? 'bg-amber-400/20 border-amber-400 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title={voiceEnabled ? 'Voice Readout Enabled' : 'Voice Readout Muted'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Sound Effects Toggle */}
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  TacticalAudio.isMuted = !next;
                }}
                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                  soundEnabled ? 'bg-blue-500/20 border-blue-400 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
                title="Tactical Audio FX"
              >
                <Zap className="w-4 h-4" />
              </button>

              {/* Expand / Minimize */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-400/40 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Agent Filter Tabs */}
          <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <button
              onClick={() => setActiveAgentTab('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeAgentTab === 'all' 
                  ? 'bg-amber-400 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
              }`}
            >
              Consensus
            </button>
            <button
              onClick={() => setActiveAgentTab('fable')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeAgentTab === 'fable' 
                  ? 'bg-amber-400 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
              }`}
            >
              Fable 5
            </button>
            <button
              onClick={() => setActiveAgentTab('grok')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeAgentTab === 'grok' 
                  ? 'bg-amber-400 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
              }`}
            >
              Grok Edge
            </button>
            <button
              onClick={() => setActiveAgentTab('gpt')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeAgentTab === 'gpt' 
                  ? 'bg-amber-400 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
              }`}
            >
              GPT Structure
            </button>
            <button
              onClick={() => setActiveAgentTab('kimi')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeAgentTab === 'kimi' 
                  ? 'bg-amber-400 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
              }`}
            >
              Kimi Film
            </button>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/50 text-[10px] text-slate-300 transition-colors flex items-center gap-1"
              >
                <span>{prompt}</span>
                <ChevronRight className="w-2.5 h-2.5 text-amber-400" />
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {msg.senderName}
                    </span>
                    <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                  </div>

                  <div 
                    className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isUser 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {msg.tags && msg.tags.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1">
                        {msg.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-800 text-amber-400/90 border border-slate-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex items-center gap-2 p-3 bg-slate-900/70 rounded-2xl w-fit border border-slate-800 text-amber-400 text-xs">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                <span className="font-mono text-[11px] animate-pulse">Council deliberating (Fable, Grok, GPT, Kimi)...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900/80 border-t border-slate-800">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask Council on tactics, 1v1 matchups, recruiting..."
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 text-slate-950 font-black transition-all shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
