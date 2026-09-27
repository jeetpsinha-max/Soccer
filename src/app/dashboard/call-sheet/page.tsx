'use client';

import React, { useState } from 'react';
import { 
  SIDELINE_SET_PIECE_PLAYBOOK, 
  PEDDIE_ROSTER_2026_2027,
  PEDDIE_SCHEDULE_2026_2027,
  OPPONENT_VEO_SCOUTING,
  getOpponentPlayers
} from '@/lib/soccer-data';
import { 
  Printer, 
  Shield, 
  Flag, 
  CornerUpRight, 
  AlertTriangle, 
  Lock, 
  Users, 
  Calendar,
  Zap,
  Target,
  Swords,
  Eye,
  Crosshair
} from 'lucide-react';

export default function SidelineCallSheetPage() {
  const nextUpcoming = PEDDIE_SCHEDULE_2026_2027.find(m => m.status === 'Upcoming') || PEDDIE_SCHEDULE_2026_2027[5];
  const [selectedMatchId, setSelectedMatchId] = useState<string>(nextUpcoming.id);

  const handlePrint = () => {
    window.print();
  };

  const getPlayer = (num: number) => PEDDIE_ROSTER_2026_2027.find(p => p.number === num);
  
  const activeFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === selectedMatchId) || nextUpcoming;
  const opponentDossier = activeFixture.scoutingReportId ? OPPONENT_VEO_SCOUTING[activeFixture.scoutingReportId] : undefined;
  const opponentKeyThreats = getOpponentPlayers(activeFixture.opponent);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Header Toolbar (Hidden on Print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 no-print border border-amber-500/30 rounded-2xl bg-gradient-to-r from-slate-950 to-[#001f3f]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-extrabold text-[11px] uppercase tracking-wider">
              SIDELINE COACHING MATRIX
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-300 text-xs font-semibold">Print-Ready Clipboard Sheet (2026–2027)</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Peddie Soccer Match Call Sheet
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time match preparation, set-piece specialist matrix, pressing triggers, late lockout protocol, and bench rotation.
          </p>
        </div>

        {/* Fixture Selector & Print Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl">
            <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-bold text-slate-400">Match:</span>
            <select
              value={selectedMatchId}
              onChange={(e) => setSelectedMatchId(e.target.value)}
              className="bg-transparent text-white text-xs font-extrabold focus:outline-none cursor-pointer"
            >
              {PEDDIE_SCHEDULE_2026_2027.map(m => (
                <option key={m.id} value={m.id} className="bg-slate-950 text-white">
                  {m.matchDate}: {m.opponent} ({m.isHome ? 'Home' : 'Away'})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Sideline Card (PDF)
          </button>
        </div>
      </div>

      {/* PRINTABLE CALL SHEET CARD */}
      <div className="print-card glass-panel p-6 lg:p-8 flex flex-col gap-6 border-2 border-slate-700 rounded-2xl bg-slate-950">
        {/* Printable Header */}
        <div className="print-header p-4 rounded-xl border border-amber-500/40 bg-gradient-to-r from-[#002147] to-[#001226] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center">
              P
            </div>
            <div>
              <div className="text-base font-black text-white tracking-wide">
                THE PEDDIE SCHOOL VARSITY SOCCER • SIDELINE CALL SHEET
              </div>
              <div className="text-xs text-amber-300 font-semibold">
                MAPL Campaign 2026–2027 • Coach George Nazario • 4-4-2 Diamond Midfield
              </div>
            </div>
          </div>
          <div className="text-right text-xs text-slate-300 font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">MATCH PROTOCOL</div>
            <div className="text-amber-400 font-black text-sm uppercase">{activeFixture.opponent}</div>
            <div className="text-[10px] text-slate-400">{activeFixture.matchDate} • {activeFixture.gameTime} ({activeFixture.location})</div>
          </div>
        </div>

        {/* Section 0: Opponent Tactical Directive & Diamond Role (Pulled from Veo Scouting) */}
        {opponentDossier && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-wider">
                <Target className="w-4 h-4" /> Sideline Game Plan vs {opponentDossier.opponent}
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold">
                System: {opponentDossier.primaryFormation} • Peddie Win Expectancy: {opponentDossier.winProbabilityPct}%
              </span>
            </div>
            <div className="text-xs text-slate-200 leading-relaxed font-semibold italic">
              &ldquo;{opponentDossier.peddieCounterDirectives.coachNazarioDirective}&rdquo;
            </div>
            <div className="text-[11px] text-amber-300 font-medium">
              <strong className="text-white">Diamond Midfield Focus:</strong> {opponentDossier.peddieCounterDirectives.diamondKeyAssignment}
            </div>
          </div>
        )}

        {/* Section 0B: Opponent Key Threat Roster & Neutralization Matrix */}
        {opponentKeyThreats.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
              <div className="flex items-center gap-2 text-sm font-black text-rose-400 uppercase tracking-wide">
                <Swords className="w-4 h-4" /> Opponent Threat Scouting & Tactical Neutralization ({activeFixture.opponent})
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-bold">
                {opponentKeyThreats.length} Scouted Personnel Dossiers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {opponentKeyThreats.map((opp) => {
                const dangerBadgeColor = 
                  opp.dangerLevel === 'Elite' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                  opp.dangerLevel === 'Dangerous' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  opp.dangerLevel === 'Key Threat' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                  'bg-purple-500/20 text-purple-300 border-purple-500/40';

                return (
                  <div key={opp.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between gap-2.5 hover:border-slate-700 transition">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 font-mono font-black text-xs text-white flex items-center justify-center shrink-0">
                            #{opp.number}
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-xs font-black text-white truncate">{opp.name}</h4>
                            <span className="text-[10px] text-slate-400 font-mono font-semibold">{opp.position} • {opp.classYear}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-black tracking-wider uppercase shrink-0 ${dangerBadgeColor}`}>
                          {opp.dangerLevel}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px]">
                        <div className="text-slate-300">
                          <span className="font-bold text-amber-400">Primary Skill:</span> {opp.strengths[0]}
                        </div>
                        <div className="text-slate-400 text-[10px] line-clamp-2">
                          <span className="font-bold text-rose-400">Exploit Flaw:</span> {opp.vulnerabilities[0]}
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300">
                      <strong className="text-white block font-sans text-[10px]">Nazario Counter-Tactic:</strong>
                      <span className="font-medium line-clamp-2">{opp.peddieMatchupCounter}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dedicated Section: Official Set-Piece Specialists with Photos */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-amber-400 border-b border-slate-700 pb-1.5 uppercase">
            <Flag className="w-4 h-4" /> 1. Designated Set-Piece Specialist Matrix
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Penalties */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              {getPlayer(13)?.photoUrl && (
                <img 
                  src={getPlayer(13)?.photoUrl} 
                  alt="Christian Tharney" 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0" 
                />
              )}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">PENALTY TAKER</span>
                <span className="text-xs font-black text-white truncate">#13 Christian Tharney (C)</span>
                <span className="text-[10px] text-slate-300">Backup: #28 Tommy Kim (C)</span>
              </div>
            </div>

            {/* Direct Free Kicks */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              {getPlayer(13)?.photoUrl && (
                <img 
                  src={getPlayer(13)?.photoUrl} 
                  alt="Christian Tharney" 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0" 
                />
              )}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">DIRECT FREE KICKS (CENTRAL)</span>
                <span className="text-xs font-black text-white truncate">#13 Christian Tharney (C)</span>
                <span className="text-[10px] text-slate-300">Backup: #28 Tommy Kim (C)</span>
              </div>
            </div>

            {/* Left Corner Kick */}
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3">
              {getPlayer(13)?.photoUrl && (
                <img 
                  src={getPlayer(13)?.photoUrl} 
                  alt="Christian Tharney" 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400 shadow-md flex-shrink-0" 
                />
              )}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">LEFT CORNER (INS-SWING)</span>
                <span className="text-xs font-black text-white truncate">#13 Christian Tharney (C)</span>
                <span className="text-[10px] text-slate-300">Backup: #14 Rayyaan Mohiuddin (C)</span>
              </div>
            </div>

            {/* Right Corner Kick - Bennett Cuchera (#7) */}
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3">
              {getPlayer(7)?.photoUrl && (
                <img 
                  src={getPlayer(7)?.photoUrl} 
                  alt="Bennett Cuchera" 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400 shadow-md flex-shrink-0" 
                />
              )}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">RIGHT CORNER (OUT-SWING)</span>
                <span className="text-xs font-black text-white truncate">#7 Bennett Cuchera (RM)</span>
                <span className="text-[10px] text-slate-300">Backup: #26 Blake Romanelli</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Attacking Corner Routines */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-cyan-400 border-b border-slate-700 pb-1.5 uppercase">
            <CornerUpRight className="w-4 h-4" /> 2. Attacking Corner Kick Routines & Target Runners
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIDELINE_SET_PIECE_PLAYBOOK.attackingCorners.map((routine, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400">&ldquo;{routine.name}&rdquo;</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">
                    Signal: {routine.triggerSignal}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{routine.description}</p>
                <div className="text-[10px] text-amber-400 font-mono">Taker: {routine.taker} • Goal Expectancy: {routine.probabilityGoalPct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Defensive Box Lockout Structure */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-emerald-400 border-b border-slate-700 pb-1.5 uppercase">
            <Shield className="w-4 h-4" /> 3. Defensive Corner Box Lockout (Hybrid Zonal-Man)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white">Central 6-Yard Dominance & Near-Post Security</div>
              <p>
                <strong>#8 Owen Bonchev</strong> and <strong>#22 Carson Wiley</strong> command central 6-yard box as starting Center Backs.
              </p>
              <p>
                <strong>#10 Quinn Wachtveitl (LM)</strong> crashes near-post zone to clear aerial balls with elite physical presence.
              </p>
              <p>
                <strong>#13 Christian Tharney (C)</strong> anchors the top of the box at CDM to intercept secondary rebounds.
              </p>
              <p>
                <strong>#12 Noah Eldessouky (C)</strong> and <strong>#98 Dylan McKenzie (GK)</strong> secure near-post line and 6-yard box (Emergency Backup GK: #20 Jeffery Zhang).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white">Counter-Attack Sprinters & Short Disturber</div>
              <p>
                <strong>#28 Tommy Kim (C)</strong> and <strong>#20 Jeffery Zhang</strong> positioned 10 yards past halfway stripe for instant counter-outlet.
              </p>
              <p>
                <strong>#7 Bennett Cuchera (RM)</strong> charges any short corner attempt within 5 yards.
              </p>
              <p>
                <strong>#14 Rayyaan Mohiuddin (C)</strong> orchestrates the rapid breakout pass from CAM.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: High-Press Entrapment Triggers */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-cyan-400 border-b border-slate-700 pb-1.5 uppercase">
            <Flag className="w-4 h-4" /> 4. High-Press Tactical Entrapment Triggers
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SIDELINE_SET_PIECE_PLAYBOOK.pressingTriggers.map((trig, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-1.5">
                <div className="text-xs font-black text-amber-400">Trigger {idx + 1}: {trig.cue}</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">{trig.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Late-Game Lockout Protocol (80'+) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-amber-400 border-b border-slate-700 pb-1.5 uppercase">
            <Lock className="w-4 h-4" /> 5. Late Game Advantage Lockout Protocol (80&apos; - 90&apos;+)
          </div>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200">
            <div className="font-black text-amber-300 mb-2">
              TACTICAL SHIFT: 4-4-2 DIAMOND &rarr; COMPACT LOW BLOCK (BRING ON #2 WYATT RAYA [CM] / #6 JEET SINHA [LM] / #18 BRODY ROZO [CM])
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
              {SIDELINE_SET_PIECE_PLAYBOOK.lateGameLockout[0].rules.map((rule, idx) => (
                <li key={idx}><strong>{rule}</strong></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 6: Official Bench Athletes & Substitution Matrix */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
            <div className="flex items-center gap-2 text-sm font-black text-slate-300 uppercase">
              <Users className="w-4 h-4" /> 6. Official Varsity Bench & Sideline Substitution Matrix
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
              9 Active Substitutes • 20 Total Squad
            </span>
          </div>

          {/* Official Bench Roster Cards with Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[2, 6, 15, 16, 17, 18, 19, 25, 26].map(num => {
              const benchPlayer = getPlayer(num);
              if (!benchPlayer) return null;

              return (
                <div key={num} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  {benchPlayer.photoUrl ? (
                    <img 
                      src={benchPlayer.photoUrl} 
                      alt={benchPlayer.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-slate-700 shadow-md flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#002147] to-[#001226] border-2 border-amber-400/50 flex flex-col items-center justify-center text-amber-400 font-black shadow-md flex-shrink-0">
                      <span className="text-xs">#{benchPlayer.number}</span>
                      <span className="text-[8px] uppercase tracking-tighter text-slate-400">Falcon</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-white truncate">{benchPlayer.name}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-800 text-amber-400 font-mono">
                        #{benchPlayer.number}
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-semibold">{benchPlayer.position} • Class of {benchPlayer.gradYear}</span>
                    <span className="text-[9px] text-slate-400 truncate">{benchPlayer.recruitmentNotes}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-[11px] text-slate-400 font-mono uppercase">
                  <th className="py-2">Sub Minute Window</th>
                  <th className="py-2">Incoming Player</th>
                  <th className="py-2">Replaced Starter</th>
                  <th className="py-2">Tactical Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 text-xs">
                <tr>
                  <td className="py-2 font-mono text-cyan-400">55&apos; - 60&apos;</td>
                  <td className="py-2 font-semibold text-amber-400">#18 Brody Rozo (Sophomore, CM)</td>
                  <td className="py-2">#10 Quinn Wachtveitl (LM)</td>
                  <td className="py-2">Physical box-to-box engine and aerial presence</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-cyan-400">65&apos; - 70&apos;</td>
                  <td className="py-2 font-semibold text-emerald-400">#6 Jeet Sinha (Junior, LM)</td>
                  <td className="py-2">#7 Bennett Cuchera (RM)</td>
                  <td className="py-2">Defensive midfield stability & flank containment</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-cyan-400">70&apos; - 75&apos;</td>
                  <td className="py-2 font-semibold text-amber-400">#2 Wyatt Raya (Sophomore, CM)</td>
                  <td className="py-2">#14 Rayyaan Mohiuddin (CAM)</td>
                  <td className="py-2">Possession tempo control and midfield ball retention</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-cyan-400">75&apos; - 80&apos;</td>
                  <td className="py-2 font-semibold text-cyan-400">#26 Blake Romanelli (Sophomore, RB/RM)</td>
                  <td className="py-2">#5 Gabriel Lam (RB)</td>
                  <td className="py-2">Explosive pace on right flank & direct transition threat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
