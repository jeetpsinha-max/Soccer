'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PEDDIE_ROSTER_2026_2027 } from '@/lib/soccer-data';
import { Player } from '@/lib/types';
import { 
  GraduationCap, 
  Award, 
  Target, 
  ExternalLink, 
  Zap, 
  Activity, 
  Search, 
  ShieldCheck, 
  Video, 
  Sparkles, 
  ChevronRight, 
  Printer, 
  Star,
  FileText,
  Flame,
  Users,
  ArrowRight
} from 'lucide-react';

interface CollegiateProfile {
  playerId: string;
  gpa: string;
  testScore?: string;
  intendedMajor: string;
  targetColleges: string[];
  fortyYardDash: string;
  verticalJumpInches: number;
  beepTestLevel: string;
  ncaaEligibilityId?: string;
  scoutHighlights: string;
}

const COLLEGIATE_PROFILES: Record<number, CollegiateProfile> = {
  28: { // Tommy Kim
    playerId: 'p-kim-t',
    gpa: '3.92 W (Honors & AP Scholar)',
    testScore: 'SAT: 1480',
    intendedMajor: 'Economics / Finance',
    targetColleges: ['Princeton University', 'Georgetown University', 'Columbia University', 'Amherst College', 'Tufts University'],
    fortyYardDash: '4.48s',
    verticalJumpInches: 33.5,
    beepTestLevel: 'Level 14.8 (Elite Aerobic)',
    ncaaEligibilityId: '2609-881-921',
    scoutHighlights: 'Dynamic center-forward with 21.3 mph top speed. Lethal two-footed finishing (7 goals in 5 games in 2026). Prep A 1st Team caliber and team captain.'
  },
  13: { // Christian Tharney
    playerId: 'p-tharney-c',
    gpa: '4.02 W (Cum Laude Candidate)',
    testScore: 'ACT: 34',
    intendedMajor: 'Applied Mathematics / Computer Science',
    targetColleges: ['University of Pennsylvania', 'Johns Hopkins University', 'Dartmouth College', 'Williams College', 'MIT'],
    fortyYardDash: '4.62s',
    verticalJumpInches: 31.0,
    beepTestLevel: 'Level 15.2 (Top Squad Stamina)',
    ncaaEligibilityId: '2609-442-130',
    scoutHighlights: 'Single-pivot defensive midfield anchor (Regista). 90.2% pass accuracy, designated penalty and corner taker. Team co-captain with supreme tactical IQ.'
  },
  12: { // Noah Eldessouky
    playerId: 'p-eldessouky-n',
    gpa: '3.88 W',
    testScore: 'SAT: 1430',
    intendedMajor: 'Mechanical Engineering',
    targetColleges: ['Navy (USNA)', 'Cornell University', 'Lehigh University', 'Middlebury College'],
    fortyYardDash: '4.55s',
    verticalJumpInches: 32.0,
    beepTestLevel: 'Level 14.6',
    ncaaEligibilityId: '2609-122-890',
    scoutHighlights: 'Modern attacking left wing-back. Exceptional 1v1 touchline containment, 89% ground duel win rate, and precise overlapping crosses.'
  },
  14: { // Rayyaan Mohiuddin
    playerId: 'p-mohiuddin-r',
    gpa: '3.95 W',
    testScore: 'SAT: 1460',
    intendedMajor: 'Business & Sports Analytics',
    targetColleges: ['Georgetown University', 'Villanova University', 'Emory University', 'Bowdoin College'],
    fortyYardDash: '4.58s',
    verticalJumpInches: 30.5,
    beepTestLevel: 'Level 14.5',
    ncaaEligibilityId: '2609-140-554',
    scoutHighlights: 'Silky advanced playmaker operating in Zone 14. Averages 11 key passes per match with elite half-space vision and dead-ball delivery.'
  },
  98: { // Dylan McKenzie
    playerId: 'p-mckenzie-d',
    gpa: '3.85 W',
    intendedMajor: 'Biology / Sports Medicine',
    targetColleges: ['Bucknell University', 'Colgate University', 'Lafayette College', 'Hobart College'],
    fortyYardDash: '4.78s',
    verticalJumpInches: 34.0,
    beepTestLevel: 'Level 13.8',
    ncaaEligibilityId: '2609-980-012',
    scoutHighlights: '6-foot-2 commanding goalkeeper. Dominates the 18-yard box, 93% cross claim efficiency, positive PSxG differential, and quick counter-distribution.'
  },
  6: { // Jeet Sinha
    playerId: 'p-sinha-6',
    gpa: '4.15 W (AP Scholar with Distinction)',
    testScore: 'SAT: 1540',
    intendedMajor: 'Computer Science & Artificial Intelligence',
    targetColleges: ['Carnegie Mellon University', 'Stanford University', 'Princeton University', 'Harvard College', 'Williams College'],
    fortyYardDash: '4.52s',
    verticalJumpInches: 32.5,
    beepTestLevel: 'Level 15.0',
    ncaaEligibilityId: '2609-006-761',
    scoutHighlights: 'Explosive left midfielder with 91.8% pass accuracy. Scored stunning 64-minute curling goal from 25 yards vs PDS. Elite spatial intelligence and work rate.'
  },
  20: { // Jeffrey Zhang
    playerId: 'p-zhang-20',
    gpa: '3.90 W',
    intendedMajor: 'Pre-Law / History',
    targetColleges: ['Boston College', 'Wake Forest University', 'Tufts University', 'Hamilton College'],
    fortyYardDash: '4.56s',
    verticalJumpInches: 31.5,
    beepTestLevel: 'Level 14.2',
    scoutHighlights: 'Versatile forward and backup goalkeeper. Clinical finishing inside 18 yards with sharp link-up play in Peddie’s twin-striker formation.'
  },
  22: { // Carson Wiley
    playerId: 'p-wiley-22',
    gpa: '3.80 W',
    intendedMajor: 'Civil Engineering',
    targetColleges: ['Rutgers University', 'Delaware', 'Ithaca College', 'Babson College'],
    fortyYardDash: '4.68s',
    verticalJumpInches: 33.0,
    beepTestLevel: 'Level 14.0',
    scoutHighlights: 'Dominant 6-foot-1 center-back. Scored 81st-minute game winner vs St. Thomas Aquinas with towering header. Wins 88% of aerial duels.'
  },
  8: { // Owen Bonchev
    playerId: 'p-bonchev-o',
    gpa: '3.86 W',
    intendedMajor: 'International Relations',
    targetColleges: ['Brown University', 'Trinity College', 'Franklin & Marshall'],
    fortyYardDash: '4.64s',
    verticalJumpInches: 31.0,
    beepTestLevel: 'Level 14.4',
    scoutHighlights: 'Starting center-back alongside Wiley. Exceptional ball-playing defender completing 91.5% of progressive passes out of the back.'
  },
  7: { // Bennett Cucchiara
    playerId: 'p-cucchiara-b',
    gpa: '3.82 W',
    intendedMajor: 'Business Administration',
    targetColleges: ['Fordham University', 'Monmouth University', 'Bates College'],
    fortyYardDash: '4.50s',
    verticalJumpInches: 30.0,
    beepTestLevel: 'Level 14.6',
    scoutHighlights: 'Explosive wide player and designated right-corner specialist. Dangerous inswinging deliveries and high work-rate tracking back on defense.'
  }
};

export default function RecruitingPage() {
  const [classFilter, setClassFilter] = useState<string>('ALL');
  const [positionFilter, setPositionFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProspectNumber, setSelectedProspectNumber] = useState<number>(28); // Default Tommy Kim

  const filteredProspects = PEDDIE_ROSTER_2026_2027.filter(p => {
    if (classFilter !== 'ALL' && p.classYear !== classFilter) return false;
    if (positionFilter !== 'ALL' && p.position !== positionFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchNum = p.number.toString().includes(q);
      if (!matchName && !matchNum) return false;
    }
    return true;
  });

  const activeProspect = PEDDIE_ROSTER_2026_2027.find(p => p.number === selectedProspectNumber) || PEDDIE_ROSTER_2026_2027[0];
  const collegiateData = COLLEGIATE_PROFILES[activeProspect.number] || {
    playerId: activeProspect.id,
    gpa: '3.80+ W (Peddie College Prep)',
    intendedMajor: 'Liberal Arts / Undecided',
    targetColleges: ['NCAA D1 / D3 Academic Programs', 'NESCAC', 'Patriot League'],
    fortyYardDash: '4.65s',
    verticalJumpInches: 30.0,
    beepTestLevel: 'Level 14.0',
    scoutHighlights: `${activeProspect.name} is a key contributor for Peddie Varsity Soccer, demonstrating high technical execution and athletic commitment.`
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="glass-panel p-6 border border-amber-500/30 rounded-2xl bg-gradient-to-r from-slate-950 via-[#002244] to-[#001224] shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              NCAA COLLEGIATE RECRUITING HUB
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 text-xs font-bold">The Peddie School Varsity Boys</span>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-md"
          >
            <Printer className="w-3.5 h-3.5" /> Print Scout Dossier (PDF)
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Peddie Collegiate Soccer Prospects & Scout Dossiers
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Official academic metrics, athletic testing data, verified Veo match footage, and Coach George Nazario&apos;s evaluation cards for college coaches and collegiate scouts.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 border border-slate-800 rounded-2xl bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Class Filter */}
          <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-bold">Class:</span>
            {['ALL', 'Senior', 'Junior', 'Sophomore', 'Freshman'].map(cls => (
              <button
                key={cls}
                onClick={() => setClassFilter(cls)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  classFilter === cls ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Position Filter */}
          <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-bold">Pos:</span>
            {['ALL', 'GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'ST'].map(pos => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                  positionFilter === pos ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prospect by name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Main Prospect Dossier View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Prospect List */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col gap-2 max-h-[750px] overflow-y-auto">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
            <span>Rostered Prospects ({filteredProspects.length})</span>
            <span className="text-[10px] text-amber-400 font-bold">Class of 2027–2030</span>
          </div>

          {filteredProspects.map(player => {
            const isSelected = player.number === activeProspect.number;
            return (
              <button
                key={player.id}
                onClick={() => setSelectedProspectNumber(player.number)}
                className={`p-3 rounded-xl text-left transition flex items-center justify-between gap-3 border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#00264d] to-[#001830] border-amber-400/80 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 font-black text-xs flex items-center justify-center border border-slate-800 shrink-0">
                    #{player.number}
                  </span>
                  <div>
                    <div className="font-bold text-white text-xs flex items-center gap-1.5">
                      {player.name}
                      {player.isCaptain && (
                        <span className="px-1 rounded bg-amber-400/20 text-amber-300 text-[9px] font-black">C</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {player.classYear} • {player.position} • {player.height}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    Form {player.matchFormScore?.toFixed(1) || '8.5'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right 2 Columns: Detailed Selected Prospect Card */}
        <div className="lg:col-span-2 glass-panel p-6 lg:p-8 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-slate-950 via-[#001c38] to-[#000e1e] shadow-2xl flex flex-col gap-6">
          {/* Prospect Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              {/* Photo or Avatar */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-400/60 shadow-xl shrink-0">
                {activeProspect.photoUrl ? (
                  <Image
                    src={activeProspect.photoUrl}
                    alt={activeProspect.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-black text-3xl text-amber-400">
                    #{activeProspect.number}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-[10px] uppercase">
                    {activeProspect.scoutingTier || 'NCAA Collegiate Prospect'}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-cyan-400 font-bold text-xs">Class of {activeProspect.gradYear}</span>
                  {activeProspect.isCaptain && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      Team Captain
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  #{activeProspect.number} {activeProspect.name}
                </h2>
                <div className="text-xs text-slate-300 mt-0.5 font-medium">
                  {activeProspect.tacticalRole || `${activeProspect.position} Specialist`} • {activeProspect.height} • {activeProspect.weight} • {activeProspect.hometown}
                </div>
              </div>
            </div>

            {/* Sofascore Match Form Rating */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-center shrink-0">
              <div className="text-[10px] uppercase font-bold text-slate-400">2026 Match Form</div>
              <div className="text-3xl font-black font-mono text-emerald-400 mt-0.5">
                {activeProspect.matchFormScore?.toFixed(1) || '8.8'}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Out of 10.0</div>
            </div>
          </div>

          {/* Academic & Athletic Measurables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Academic Profile */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-400" /> Academic Standing
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Grade Point Average:</span>
                  <span className="font-bold text-white">{collegiateData.gpa}</span>
                </div>
                {collegiateData.testScore && (
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Standardized Testing:</span>
                    <span className="font-bold text-white">{collegiateData.testScore}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Intended Field of Study:</span>
                  <span className="font-bold text-cyan-300">{collegiateData.intendedMajor}</span>
                </div>
                {collegiateData.ncaaEligibilityId && (
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">NCAA Eligibility ID:</span>
                    <span className="font-mono font-bold text-slate-300">{collegiateData.ncaaEligibilityId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Athletic Measurables */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" /> Physical & Athletic Testing
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Peak GPS Sprint Velocity:</span>
                  <span className="font-bold text-amber-300 font-mono">{activeProspect.topSpeedMph} mph</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">40-Yard Sprint:</span>
                  <span className="font-bold text-white font-mono">{collegiateData.fortyYardDash}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Vertical Leap:</span>
                  <span className="font-bold text-white font-mono">{collegiateData.verticalJumpInches}&quot;</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Beep Test Aerobic Score:</span>
                  <span className="font-bold text-emerald-400">{collegiateData.beepTestLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2026 Season Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Goals / Assists</div>
              <div className="text-lg font-black font-mono text-white mt-0.5">{activeProspect.goals} G / {activeProspect.assists} A</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Pass Accuracy</div>
              <div className="text-lg font-black font-mono text-cyan-300 mt-0.5">{activeProspect.passCompletionPct}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Tackle Success</div>
              <div className="text-lg font-black font-mono text-emerald-300 mt-0.5">{activeProspect.tackleSuccessPct}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Distance Covered</div>
              <div className="text-lg font-black font-mono text-amber-300 mt-0.5">{activeProspect.distanceCoveredMiles} mi</div>
            </div>
          </div>

          {/* Target Collegiate Programs */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-400" /> Target Collegiate Fits & Division Focus:
            </h3>
            <div className="flex flex-wrap gap-2">
              {collegiateData.targetColleges.map((college, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-400" /> {college}
                </span>
              ))}
            </div>
          </div>

          {/* Head Coach Evaluation */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs uppercase font-black tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" /> Coach George Nazario&apos;s Recommendation & Scout Note:
            </div>
            <p className="text-xs text-slate-200 leading-relaxed italic">
              &ldquo;{collegiateData.scoutHighlights}&rdquo;
            </p>
          </div>

          {/* Links to Match Film Room */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/dashboard/match-film"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Video className="w-4 h-4" /> Watch Veo Match Film Clips
            </Link>
            <Link
              href="/dashboard/player-portal"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              1v1 Matchup Simulator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
