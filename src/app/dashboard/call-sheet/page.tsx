'use client';

import React from 'react';
import { SIDELINE_SET_PIECE_PLAYBOOK } from '@/lib/soccer-data';
import { Printer, Shield, Flag, CornerUpRight, AlertTriangle, Lock, Users } from 'lucide-react';

export default function SidelineCallSheetPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Toolbar (Hidden on Print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 no-print border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-extrabold text-[11px] uppercase">
              SIDELINE COACHING MATRIX
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-400 text-xs">Print-Ready Clipboard Sheet</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Peddie Soccer Match Call Sheet (2026–2027)
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Comprehensive set-piece call triggers, defensive zone anchors, high-press entrapment cues, and 80&apos;+ lockout protocol.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition"
        >
          <Printer className="w-4 h-4" /> Print Sideline Card (PDF)
        </button>
      </div>

      {/* PRINTABLE CALL SHEET CARD */}
      <div className="print-card glass-panel p-6 lg:p-8 flex flex-col gap-6 border-2 border-slate-700">
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
                MAPL Conference Campaign 2026–2027 • Head Coach & Sideline Assistants
              </div>
            </div>
          </div>
          <div className="text-right text-xs text-slate-300 font-mono">
            <div>MATCH PROTOCOL</div>
            <div className="text-amber-400 font-bold">123RD PEDDIE-BLAIR DAY</div>
          </div>
        </div>

        {/* Section 1: Attacking Set-Pieces & Corner Routines */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-amber-400 border-b border-slate-700 pb-1.5 uppercase">
            <CornerUpRight className="w-4 h-4" /> 1. Attacking Corners & Set-Piece Routines
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SIDELINE_SET_PIECE_PLAYBOOK.attackingCorners.map((play, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-xs">{play.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                    {play.probabilityGoalPct}% Goal
                  </span>
                </div>
                <div className="text-[11px] text-cyan-400 font-bold">
                  Trigger: <span className="text-white underline">{play.triggerSignal}</span> (Taker: {play.taker})
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {play.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Defensive Corner & Free Kick Organization */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-emerald-400 border-b border-slate-700 pb-1.5 uppercase">
            <Shield className="w-4 h-4" /> 2. Defensive Set-Piece Organization (Hybrid Zonal)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white">Zone 1 & Central Anchor</div>
              <p>
                <strong>#5 Christian Tharney (C)</strong> and <strong>#10 Quinn Wachtveitl</strong> command central 6-yard box. Wins initial aerial header.
              </p>
              <p>
                <strong>#12 Noah Eldessouky (C)</strong> covers near post zone to extinguish flick-ons.
              </p>
              <p>
                <strong>#1 Dylan McKenzie (GK)</strong> claims any delivery lofted inside the 6-yard perimeter.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white">Counter-Attack Sprinter & Short Disturber</div>
              <p>
                <strong>#11 Blake Romanelli</strong> positioned 10 yards past halfway stripe on left flank for instant outlet ball.
              </p>
              <p>
                <strong>#7 Harry Xiao</strong> charges any short corner attempt within 5 yards.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: High-Press Entrapment Triggers */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-cyan-400 border-b border-slate-700 pb-1.5 uppercase">
            <Flag className="w-4 h-4" /> 3. High-Press Tactical Entrapment Triggers
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

        {/* Section 4: Late-Game Lockout Protocol (80'+) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-amber-400 border-b border-slate-700 pb-1.5 uppercase">
            <Lock className="w-4 h-4" /> 4. Late Game Advantage Lockout Protocol (80&apos; - 90&apos;+)
          </div>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200">
            <div className="font-black text-amber-300 mb-2">
              TACTICAL SHIFT: 4-4-2 DIAMOND &rarr; COMPACT LOW BLOCK (BRING ON #26 LUKE D&apos;ALONZO)
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
              {SIDELINE_SET_PIECE_PLAYBOOK.lateGameLockout[0].rules.map((rule, idx) => (
                <li key={idx}><strong>{rule}</strong></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 5: Substitution Hierarchy */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-slate-300 border-b border-slate-700 pb-1.5 uppercase">
            <Users className="w-4 h-4" /> 5. Sideline Substitution Matrix
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 font-bold">
                  <th className="py-2">MINUTE</th>
                  <th className="py-2">OFF ATHLETE</th>
                  <th className="py-2">ON ATHLETE</th>
                  <th className="py-2">PURPOSE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                <tr>
                  <td className="py-2 font-mono font-bold text-amber-400">60&apos; - 65&apos;</td>
                  <td className="py-2 font-semibold">#7 Harry Xiao (RW)</td>
                  <td className="py-2 font-semibold text-emerald-400">#19 Lucas Zhang (Winger)</td>
                  <td className="py-2">Exploit tired fullback with fresh sprint burst</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono font-bold text-amber-400">75&apos;</td>
                  <td className="py-2 font-semibold">#28 Tommy Kim (CAM)</td>
                  <td className="py-2 font-semibold text-emerald-400">#4 Jackson Shavel (CM)</td>
                  <td className="py-2">Midfield possession tempo control</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono font-bold text-amber-400">82&apos;</td>
                  <td className="py-2 font-semibold">#11 Blake Romanelli (ST)</td>
                  <td className="py-2 font-semibold text-emerald-400">#26 Luke D&apos;Alonzo (CB)</td>
                  <td className="py-2">Solidify 5-man low block central defense shield</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
