import { MatchEvent, ScoutingReport, Player } from '../types';
import { PEDDIE_ROSTER_2026_2027, MAPL_SCOUTING_REPORTS, PEDDIE_SCHEDULE_2026_2027 } from '../soccer-data';
import { OPPONENT_PLAYER_SCOUTING_REPORTS } from '../opponent-players-data';

// ============================================================================
// Multi-Agent Council Types & Interfaces
// ============================================================================

export type AgentPersonaId = 'fable-5' | 'grok' | 'gpt' | 'kimi';

export interface AgentDebateStatement {
  agentId: AgentPersonaId;
  agentName: string;
  avatarBadge: string;
  colorScheme: {
    border: string;
    bg: string;
    text: string;
    badge: string;
  };
  specialty: string;
  philosophy: string;
  keyObservation: string;
  recommendedTactic: string;
  lineupAdjustment: string;
  expectedOutcome: string;
  confidenceScore: number; // 0-100
}

export interface TacticalDebateSession {
  scenarioId: string;
  scenarioTitle: string;
  scenarioDescription: string;
  contextMatch: string;
  opponent: string;
  minute: number;
  scoreline: string;
  urgency: 'HIGH' | 'MEDIUM' | 'CRITICAL';
  statements: AgentDebateStatement[];
  consensusDirective: {
    headline: string;
    primaryAction: string;
    substitutions: { offPlayer: string; onPlayer: string; minute: number; rationale: string }[];
    pressingTrigger: string;
    setPieceDirective: string;
    expectedXgSwing: string;
  };
}

// ============================================================================
// Playbook & Animated Routine Types
// ============================================================================

export interface PlaybookPlayerFrame {
  playerNumber: number;
  playerName: string;
  position: string;
  xPct: number; // 0 - 100
  yPct: number; // 0 - 100
  roleNote?: string;
  isBallCarrier?: boolean;
}

export interface PlaybookStep {
  stepIndex: number;
  label: string;
  description: string;
  durationMs: number;
  ballPosition: { xPct: number; yPct: number };
  peddiePlayers: PlaybookPlayerFrame[];
  opponentDefenders: PlaybookPlayerFrame[];
  passingLine?: { from: { xPct: number; yPct: number }; to: { xPct: number; yPct: number } };
  runVectors?: { playerNumber: number; from: { xPct: number; yPct: number }; to: { xPct: number; yPct: number } }[];
}

export interface PlaybookRoutine {
  id: string;
  title: string;
  category: 'CORNER' | 'FREE_KICK' | 'PRESS_BREAK' | 'OPEN_PLAY' | 'LOCKOUT';
  designerAgent: AgentPersonaId;
  successRatePct: number;
  expectedXG: number;
  description: string;
  keyPersonnel: string[];
  steps: PlaybookStep[];
}

// ============================================================================
// Match Simulator Types
// ============================================================================

export interface SimEvent {
  minute: number;
  type: 'Goal' | 'Shot' | 'Save' | 'Tackle' | 'Yellow Card' | 'Substitution' | 'Tactical Shift' | 'Corner';
  team: 'Peddie' | 'Opponent';
  player: string;
  description: string;
  xgValue: number;
  peddieScore: number;
  opponentScore: number;
  tacticalNote: string;
}

export interface SimState {
  currentMinute: number;
  peddieScore: number;
  opponentScore: number;
  peddieXg: number;
  opponentXg: number;
  peddiePossessionPct: number;
  tacticalStance: 'ALL_OUT_ATTACK' | 'HIGH_PRESS_DIAMOND' | 'BALANCED_CONTROL' | 'LOW_BLOCK_COUNTER';
  events: SimEvent[];
  isFinished: boolean;
  momentumPeddie: number; // -100 to 100
}

// ============================================================================
// SoccerTacticalAgent & Council Implementation
// ============================================================================

export class SoccerTacticalAgent {
  /**
   * Generates a comprehensive scouting and tactical plan against an opponent.
   */
  static generateTacticalPlan(opponentName: string) {
    const report: ScoutingReport | undefined = MAPL_SCOUTING_REPORTS[opponentName] ||
      Object.values(MAPL_SCOUTING_REPORTS).find(r => r.opponent.toLowerCase().includes(opponentName.toLowerCase())) ||
      MAPL_SCOUTING_REPORTS['Blair Academy'] ||
      Object.values(MAPL_SCOUTING_REPORTS)[0];

    if (!report) {
      throw new Error(`Scouting report not found for ${opponentName}`);
    }

    return {
      headline: `Tactical Blueprint vs ${report.opponent}`,
      opponent: report.opponent,
      systemSummary: `Opponent deploys a ${report.formation}. ${report.tendencies.buildup} To break their ${report.tendencies.defensiveBlock}, our system recommends targeting ${report.tendencies.vulnerabilityZone}.`,
      keyMatchups: [
        {
          ourPlayer: '#13 Christian Tharney (CDM, Captain)',
          opponentKey: report.keyPlaymakers[0] || 'Opposing Striker',
          edge: 'Peddie +28% Defensive Reading. Tharney wins 89.3% of sliding and standing tackles at the diamond base.'
        },
        {
          ourPlayer: '#28 Tommy Kim (ST, Captain)',
          opponentKey: 'Opponent Center Backs',
          edge: 'Prep A 1st Team pace and agility. Tommy Kim top speed 21.3 mph beats their backline by 0.3s over 20 yards.'
        },
        {
          ourPlayer: '#14 Rayyaan Mohiuddin (CAM, Captain)',
          opponentKey: report.keyPlaymakers[1] || 'Opposing Midfield Pivot',
          edge: 'Peddie +22% Ball Retention in Zone 14. Mohiuddin averages 91.5% passing accuracy and 11 key passes per match.'
        }
      ],
      substitutionsRoadmap: [
        {
          minute: 60,
          offPlayer: '#7 Bennett Cucchiara (RM)',
          onPlayer: '#18 Brody Rozo (CM)',
          tacticalPurpose: 'Inject direct sophomore forward/midfielder against fatigued backline.'
        },
        {
          minute: 72,
          offPlayer: '#6 Jeet Sinha (LM)',
          onPlayer: '#25 Harry Xiao (RW)',
          tacticalPurpose: 'Provide fresh flank pace and touchline dribbling.'
        },
        {
          minute: 82,
          offPlayer: '#20 Jeffrey Zhang (ST)',
          onPlayer: '#5 Gabriel Lam (RB/CDM)',
          tacticalPurpose: 'Lock down central zones; transition into 5-4-1 defensive lockout.'
        }
      ],
      predictedOutcome: {
        peddieGoals: 2,
        opponentGoals: 1,
        winProbabilityPct: report.winProbabilityPct
      }
    };
  }

  /**
   * Natural Language film and match event parser.
   */
  static filterEventsByNaturalLanguage(query: string, events: MatchEvent[]): MatchEvent[] {
    const q = query.toLowerCase().trim();
    if (!q) return events;
    if (q === 'goal' || q === 'goals') {
      return events.filter(e => e.type === 'Goal');
    }

    return events.filter(e => {
      if (q.includes('goal') && e.type === 'Goal') return true;
      if (q.includes('shot') && (e.type === 'Shot' || e.type === 'Goal')) return true;
      if (q.includes('pass') && (e.type === 'Pass' || e.type === 'Key Pass')) return true;
      if (q.includes('tackle') && e.type === 'Tackle') return true;
      if (q.includes('corner') && e.type === 'Corner') return true;
      if (q.includes('press') && (e.type === 'Press Trap' || e.phase === 'High Press')) return true;
      if (q.includes('haverford') && (e.team === 'Opponent' || e.description.toLowerCase().includes('haverford'))) return true;
      if (q.includes('blair') && (e.team === 'Opponent' || e.description.toLowerCase().includes('blair'))) return true;
      if (q.includes('peddie') && e.team === 'Peddie') return true;
      if (q.includes('kim') && e.playerName.toLowerCase().includes('kim')) return true;
      if (q.includes('mckenzie') && e.playerName.toLowerCase().includes('mckenzie')) return true;
      if (q.includes('tharney') && e.playerName.toLowerCase().includes('tharney')) return true;
      if (q.includes('mohiuddin') && e.playerName.toLowerCase().includes('mohiuddin')) return true;
      if (q.includes('sheinin') && e.playerName.toLowerCase().includes('sheinin')) return true;
      if (q.includes('bonchev') && e.playerName.toLowerCase().includes('bonchev')) return true;
      if (q.includes('sinha') && e.playerName.toLowerCase().includes('sinha')) return true;
      if (q.includes('wachtveitl') && e.playerName.toLowerCase().includes('wachtveitl')) return true;
      if (q.includes('romanelli') && e.playerName.toLowerCase().includes('romanelli')) return true;
      if (q.includes('rozo') && e.playerName.toLowerCase().includes('rozo')) return true;
      return e.description.toLowerCase().includes(q) || e.playerName.toLowerCase().includes(q);
    });
  }

  // ============================================================================
  // Multi-Agent Council Debate Engine
  // ============================================================================

  static PRESET_SCENARIOS: Record<string, TacticalDebateSession> = {
    'blair-low-block': {
      scenarioId: 'blair-low-block',
      scenarioTitle: "Breaking Blair Academy's 5-4-1 Low Block (Peddie-Blair Day)",
      scenarioDescription: "Trailing 0-1 at 65' on Blair Day. Blair is packing the penalty box with 9 outfielders and clearing long to their isolated striker.",
      contextMatch: 'Peddie-Blair Day 2026',
      opponent: 'Blair Academy',
      minute: 65,
      scoreline: 'Peddie 0 – 1 Blair',
      urgency: 'CRITICAL',
      statements: [
        {
          agentId: 'fable-5',
          agentName: 'Fable 5 (Creative Strategist)',
          avatarBadge: 'F5',
          colorScheme: {
            border: 'border-amber-400/40',
            bg: 'bg-amber-950/20',
            text: 'text-amber-300',
            badge: 'bg-amber-500 text-slate-950'
          },
          specialty: 'Spatial Artistry, Overload Choreography & Momentum Psychology',
          philosophy: 'A low block cannot be broken with head-on persistence. We must tempt them out through asymmetrical overloads on the weak side and unleash Jeet Sinha and Bennett Cucchiara into the half-spaces.',
          keyObservation: "Blair's left wing-back is drifting 8 yards inside to double Tommy Kim, leaving the entire right touchline completely vacant.",
          recommendedTactic: 'Switch to a 3-2-3-2 Asymmetric Flank Wave. Instruct Bennett Cucchiara to hug the right touchline and drag Blair’s defense wide, opening Zone 14 for Mohiuddin.',
          lineupAdjustment: 'Sub off defensive anchor Tharney to single center-back role; push Eldessouky up as an inverted winger.',
          expectedOutcome: '+0.85 xG generated in next 15 minutes through far-post crosses.',
          confidenceScore: 92
        },
        {
          agentId: 'grok',
          agentName: 'Grok Smartest Agent',
          avatarBadge: 'GRK',
          colorScheme: {
            border: 'border-cyan-400/40',
            bg: 'bg-cyan-950/20',
            text: 'text-cyan-300',
            badge: 'bg-cyan-400 text-slate-950'
          },
          specialty: 'Ruthless Counter-Tactics, Press Breakers & Structural Exploitation',
          philosophy: 'Forget patient passing. A low block lives on breathing room between clearances. Suffocate their second balls with an immediate 5-second counter-press and foul their target striker before he turns.',
          keyObservation: "Blair's clearing headers only average 18.4 yards. If Christian Tharney and Owen Bonchev step up to the 35-yard line, Peddie wins 100% of second balls.",
          recommendedTactic: 'Ultra-High Defensive Squeeze (PPDA < 5.5). All 10 outfielders inside Blair’s half. Force 3 corner kicks within 10 minutes and target Carson Wiley at the back post.',
          lineupAdjustment: 'Bring on Brody Rozo for Harry Xiao at 68\' to add ruthless aerial pressure inside their six-yard box.',
          expectedOutcome: 'Forced turnover in Blair’s defensive third within 8 minutes leading to high-xG equalizer.',
          confidenceScore: 95
        },
        {
          agentId: 'gpt',
          agentName: 'GPT Smartest Agent',
          avatarBadge: 'GPT',
          colorScheme: {
            border: 'border-emerald-400/40',
            bg: 'bg-emerald-950/20',
            text: 'text-emerald-300',
            badge: 'bg-emerald-400 text-slate-950'
          },
          specialty: 'System Architecture, Positional Discipline & Set-Piece Engineering',
          philosophy: 'Structure dictates outcomes. Maintain our 4-diamond foundation but modify pass trajectories: replace direct crosses into congested penalty boxes with cutbacks to the top of the 18.',
          keyObservation: "Blair collapses 6 players into the goalmouth on crosses, leaving the penalty arc ('The D') unprotected.",
          recommendedTactic: 'Execute Playbook Routine: Short Corner Triangle into Mohiuddin cutback to Tharney or Sinha arriving late from deep.',
          lineupAdjustment: 'Move Tommy Kim to shadow striker to occupy both central defenders, freeing space for late runner Jeffrey Zhang.',
          expectedOutcome: '3 high-quality shots from 16-20 yards with >0.35 xG per shot.',
          confidenceScore: 94
        },
        {
          agentId: 'kimi',
          agentName: 'Kimi Strongest Agent',
          avatarBadge: 'KMI',
          colorScheme: {
            border: 'border-purple-400/40',
            bg: 'bg-purple-950/20',
            text: 'text-purple-300',
            badge: 'bg-purple-400 text-slate-950'
          },
          specialty: 'Deep Film Context, Historical Pattern Recognition & Zero Hallucinations',
          philosophy: 'Reviewing 3 seasons of Blair film: Blair has conceded 78% of their late goals between the 75th and 88th minute when their outside center-backs suffer hamstring fatigue.',
          keyObservation: "Blair #4 CB Matthew Vance has played 320 consecutive minutes and commits fouls in transition when turned toward his left shoulder.",
          recommendedTactic: 'Direct diagonal balls into Tommy Kim spinning off Vance’s left shoulder. Draw set pieces in shooting range (22-26 yards).',
          lineupAdjustment: 'Prepare Zachary Horsch for 78th minute injection to exploit tired legs in the left channel.',
          expectedOutcome: 'Direct free-kick opportunity or penalty kick awarded within 12 minutes.',
          confidenceScore: 96
        }
      ],
      consensusDirective: {
        headline: 'Consensus Sideline Directive: 3-1-4-2 Flank Overload with Second-Ball Squeeze',
        primaryAction: 'Push fullbacks Eldessouky (#12) and Lam (#5) into wing positions; compress backline to the 40-yard line behind Tharney (#13). Target cutbacks to Zone 14 rather than aerial box crosses.',
        substitutions: [
          { offPlayer: '#7 Bennett Cucchiara (RM)', onPlayer: '#18 Brody Rozo (CM/ST)', minute: 67, rationale: 'Add physical aerial presence and relentless counter-pressing.' },
          { offPlayer: '#20 Jeffrey Zhang (ST)', onPlayer: '#15 Zachary Horsch (LW)', minute: 76, rationale: 'Exploit Blair #4 Vance fatigue with fresh channel speed.' }
        ],
        pressingTrigger: 'Immediate 3-man counter-press on Blair goalkeeper clearance; lock them inside their defensive third.',
        setPieceDirective: 'Right Corner: Short play to Mohiuddin -> low cutback to Sinha/Tharney at the edge of the 18.',
        expectedXgSwing: '+1.42 Peddie xG / -0.10 Blair xG over final 25 minutes'
      }
    },

    'life-center-flanks': {
      scenarioId: 'life-center-flanks',
      scenarioTitle: "Neutralizing Life Center Academy's Explosive Wide Attack (Sept 22)",
      scenarioDescription: "Life Center deploys high-speed wingers and counter-attacks down both touchlines with 4-3-3. Peddie's diamond midfield needs width containment.",
      contextMatch: 'Next Match: Sept 22, 2026',
      opponent: 'Life Center Academy',
      minute: 0,
      scoreline: 'Pre-Match Tactical Masterplan',
      urgency: 'HIGH',
      statements: [
        {
          agentId: 'fable-5',
          agentName: 'Fable 5 (Creative Strategist)',
          avatarBadge: 'F5',
          colorScheme: { border: 'border-amber-400/40', bg: 'bg-amber-950/20', text: 'text-amber-300', badge: 'bg-amber-500 text-slate-950' },
          specialty: 'Aesthetic Symmetry & Wing Containment',
          philosophy: 'Turn their strength into their trap. Allow their wingers to receive on the touchline, then snap the sideline trap with fullbacks Lam and Eldessouky pinching inwards.',
          keyObservation: "Life Center wingers don't cut inside; they depend purely on outer lane acceleration.",
          recommendedTactic: 'Channel their wingers to the sideline where the touchline acts as an extra defender.',
          lineupAdjustment: 'Keep Lam and Eldessouky deep in first 20 minutes before releasing them on overlaps.',
          expectedOutcome: 'Disrupt 85% of their wide entries.',
          confidenceScore: 91
        },
        {
          agentId: 'grok',
          agentName: 'Grok Smartest Agent',
          avatarBadge: 'GRK',
          colorScheme: { border: 'border-cyan-400/40', bg: 'bg-cyan-950/20', text: 'text-cyan-300', badge: 'bg-cyan-400 text-slate-950' },
          specialty: 'Press Traps & Physical Duels',
          philosophy: 'Cut the oxygen off at the distributor. Their wingers are useless if their center midfielder (#6 Marco Santos) is harassed every time he touches the ball.',
          keyObservation: 'Santos takes an average of 3.2 touches before looking wide. Mohiuddin can dispossess him in 1.5 seconds.',
          recommendedTactic: 'High diamond pressing trap on Santos. Win possession in their half and feed Tommy Kim in behind.',
          lineupAdjustment: 'Instruct Mohiuddin and Tharney to form a pincer around Santos from the opening whistle.',
          expectedOutcome: '3 high-turnover scoring chances within the opening 30 minutes.',
          confidenceScore: 94
        },
        {
          agentId: 'gpt',
          agentName: 'GPT Smartest Agent',
          avatarBadge: 'GPT',
          colorScheme: { border: 'border-emerald-400/40', bg: 'bg-emerald-950/20', text: 'text-emerald-300', badge: 'bg-emerald-400 text-slate-950' },
          specialty: 'System Balance & Defensive Transitions',
          philosophy: 'Maintain numerical superiority in central midfield (4 v 3). When defending wide counters, slide the diamond base (Tharney) to cover the vacated fullback zone.',
          keyObservation: 'A sliding 4-4-2 diamond prevents 2v1 overloads on our outside backs.',
          recommendedTactic: 'Rotational cover: When Noah Eldessouky steps out to tackle, Owen Bonchev slides left and Tharney drops between center-backs.',
          lineupAdjustment: 'Ensure Bonchev and Wiley communicate shifts loudly with goalkeeper Dylan McKenzie.',
          expectedOutcome: 'Limit Life Center to under 0.85 expected goals across 80 minutes.',
          confidenceScore: 93
        },
        {
          agentId: 'kimi',
          agentName: 'Kimi Strongest Agent',
          avatarBadge: 'KMI',
          colorScheme: { border: 'border-purple-400/40', bg: 'bg-purple-950/20', text: 'text-purple-300', badge: 'bg-purple-400 text-slate-950' },
          specialty: 'Scouting Archive & Biometric Matchups',
          philosophy: 'Cross-referencing LCA’s 4 matches this month: They struggle against physical pressure inside their defensive half and commit 14 fouls per game.',
          keyObservation: 'Their goalkeeper struggles on inswinging corners to the front post.',
          recommendedTactic: 'Target Bennett Cucchiara’s inswinging right corners directly into the 6-yard box for Wiley and Tharney.',
          lineupAdjustment: 'Start Jeffrey Zhang alongside Tommy Kim to press their inexperienced center-back pairing.',
          expectedOutcome: 'Set-piece goal for Peddie in first half.',
          confidenceScore: 95
        }
      ],
      consensusDirective: {
        headline: 'Consensus Sideline Directive: Midfield Pincer on Santos & Asymmetric Fullback Cover',
        primaryAction: 'Mohiuddin presses LCA pivot Santos instantly upon turnover. Tharney slides to provide lateral cover for fullbacks Lam and Eldessouky. Attack their right-back via Sinha/Kim combination play.',
        substitutions: [
          { offPlayer: '#7 Bennett Cucchiara (RM)', onPlayer: '#18 Brody Rozo (CM)', minute: 58, rationale: 'Enforce midfield physical dominance.' },
          { offPlayer: '#20 Jeffrey Zhang (ST)', onPlayer: '#15 Zachary Horsch (LW)', minute: 70, rationale: 'Provide fresh flank speed to counter their attacking substitutes.' }
        ],
        pressingTrigger: 'Trigger press whenever ball is played back to LCA center-backs or into Santos facing his own goal.',
        setPieceDirective: 'Right Corner: Inswinging delivery to near post (Carson Wiley / Christian Tharney target).',
        expectedXgSwing: '+1.85 Peddie xG / 0.65 LCA xG'
      }
    },

    'pennington-set-pieces': {
      scenarioId: 'pennington-set-pieces',
      scenarioTitle: "Neutralizing The Pennington School's Set-Piece Dominance (Prep A Clash)",
      scenarioDescription: "Pennington boasts 3 Division-1 committed aerial targets over 6'2\" and scores 40% of their goals off corners and long throw-ins.",
      contextMatch: 'Prep A Championship Showcase',
      opponent: 'The Pennington School',
      minute: 35,
      scoreline: 'Peddie 1 – 1 Pennington',
      urgency: 'HIGH',
      statements: [
        {
          agentId: 'fable-5',
          agentName: 'Fable 5 (Creative Strategist)',
          avatarBadge: 'F5',
          colorScheme: { border: 'border-amber-400/40', bg: 'bg-amber-950/20', text: 'text-amber-300', badge: 'bg-amber-500 text-slate-950' },
          specialty: 'Goalkeeper Command & Zonal Choreography',
          philosophy: 'Do not wrestle their giants. Use Dylan McKenzie’s box command and a 6-man zonal wall across the 6-yard line to control the drop zone.',
          keyObservation: 'Pennington runs a 3-man stack at the penalty spot that breaks forward on the whistle.',
          recommendedTactic: 'Position Christian Tharney as the block disruptor to physically impede their stack runners before they gain momentum.',
          lineupAdjustment: 'Keep Tommy Kim high on the halfway line to force Pennington to keep 2 defenders back, diluting their box numbers.',
          expectedOutcome: 'Eliminate Pennington’s running header advantage.',
          confidenceScore: 92
        },
        {
          agentId: 'grok',
          agentName: 'Grok Smartest Agent',
          avatarBadge: 'GRK',
          colorScheme: { border: 'border-cyan-400/40', bg: 'bg-cyan-950/20', text: 'text-cyan-300', badge: 'bg-cyan-400 text-slate-950' },
          specialty: 'Counter-Attack on Set-Piece Turnovers',
          philosophy: 'Pennington over-commits on corners. When McKenzie claims the ball or Wiley clears, launch Tommy Kim and Blake Romanelli immediately into 60 yards of green grass.',
          keyObservation: 'Their rest-defense consists of two slow fullbacks with zero recovery pace.',
          recommendedTactic: 'Immediate 4-second transition strike off every defensive corner clearance.',
          lineupAdjustment: 'Have Mohiuddin hover at the edge of our box ready to spray the first-time outlet pass.',
          expectedOutcome: 'High-probability 2v2 breakaway goal within 2 defensive set pieces.',
          confidenceScore: 97
        },
        {
          agentId: 'gpt',
          agentName: 'GPT Smartest Agent',
          avatarBadge: 'GPT',
          colorScheme: { border: 'border-emerald-400/40', bg: 'bg-emerald-950/20', text: 'text-emerald-300', badge: 'bg-emerald-400 text-slate-950' },
          specialty: 'Hybrid Zonal-Man Marking Calibration',
          philosophy: 'Deploy a 4-zonal, 5-man-marking hybrid matrix. Assign Carson Wiley to their top aerial threat (#9) and Owen Bonchev to their secondary runner (#5).',
          keyObservation: 'Pennington scores when zonal players miscommunicate with man-markers on near-post flick-ons.',
          recommendedTactic: 'Tharney controls the near-post zone; Wiley tracks #9 stride-for-stride.',
          lineupAdjustment: 'Ensure Dylan McKenzie calls "KEEPER" authoritatively to claim all high balls within 8 yards.',
          expectedOutcome: 'Zero set-piece goals conceded.',
          confidenceScore: 94
        },
        {
          agentId: 'kimi',
          agentName: 'Kimi Strongest Agent',
          avatarBadge: 'KMI',
          colorScheme: { border: 'border-purple-400/40', bg: 'bg-purple-950/20', text: 'text-purple-300', badge: 'bg-purple-400 text-slate-950' },
          specialty: 'Historical Tendency Telemetry',
          philosophy: 'Historical Prep A tracking reveals Pennington plays short on 1 in 5 corners when their coach signals with raised right hand.',
          keyObservation: 'When their right hand is raised, #7 dashes short to the corner quadrant for a quick 2v1.',
          recommendedTactic: 'Alert Bennett Cucchiara and Jeet Sinha to watch the coach’s hand signal and close down the short corner before it crosses into the box.',
          lineupAdjustment: 'No personnel change needed; pure tactical awareness drills in warmup.',
          expectedOutcome: 'Neutralize 100% of their trick plays.',
          confidenceScore: 96
        }
      ],
      consensusDirective: {
        headline: 'Consensus Sideline Directive: Hybrid Zonal Wall with Instant Tommy Kim Outlet Counter',
        primaryAction: '4 zonal defenders along the 6-yard box (Tharney, Wiley, Bonchev, Eldessouky). Wiley man-marks Pennington #9. Tommy Kim stays posted at the midfield circle. McKenzie claims aggressively and throws long instantly.',
        substitutions: [
          { offPlayer: '#7 Bennett Cucchiara (RM)', onPlayer: '#26 Blake Romanelli (RB/RM)', minute: 62, rationale: 'Add physical defensive height and vertical speed.' }
        ],
        pressingTrigger: 'Drop to compact block when ball is in Pennington defensive half; do not concede cheap fouls within 35 yards.',
        setPieceDirective: 'Hybrid 4-Zonal / 5-Man. Tommy Kim stays high for transition outlet.',
        expectedXgSwing: 'Reduce Pennington set-piece xG from 0.42/corner to <0.08/corner'
      }
    }
  };

  /**
   * Retrieves or generates a multi-agent debate session.
   */
  static getCouncilDebate(scenarioId: string, customOpponent?: string, customPrompt?: string): TacticalDebateSession {
    if (this.PRESET_SCENARIOS[scenarioId]) {
      return this.PRESET_SCENARIOS[scenarioId];
    }

    const opponent = customOpponent || 'Selected Opponent';
    const title = customPrompt ? `Coach Nazario Directive: ${customPrompt.slice(0, 50)}...` : `Tactical Blueprint vs ${opponent}`;

    return {
      scenarioId: scenarioId || 'custom',
      scenarioTitle: title,
      scenarioDescription: customPrompt || `Custom tactical scenario generated against ${opponent}.`,
      contextMatch: `2026–2027 Season Clash vs ${opponent}`,
      opponent: opponent,
      minute: 45,
      scoreline: 'Peddie 1 – 1 ' + opponent,
      urgency: 'HIGH',
      statements: [
        {
          agentId: 'fable-5',
          agentName: 'Fable 5 (Creative Strategist)',
          avatarBadge: 'F5',
          colorScheme: { border: 'border-amber-400/40', bg: 'bg-amber-950/20', text: 'text-amber-300', badge: 'bg-amber-500 text-slate-950' },
          specialty: 'Spatial Fluidity & Psychological Momentum',
          philosophy: 'Unlock their defense through rapid third-man combinations between Jeet Sinha, Tommy Kim, and Rayyaan Mohiuddin.',
          keyObservation: `${opponent} leaves central gaps between their midfield and defensive line when transitioning backward.`,
          recommendedTactic: 'Exploit Zone 14 with rapid diagonal one-twos; unleash Mohiuddin to pick key through-balls.',
          lineupAdjustment: 'Encourage fullbacks Lam and Eldessouky to overlap aggressively.',
          expectedOutcome: '+0.75 xG generated per 20 minutes.',
          confidenceScore: 92
        },
        {
          agentId: 'grok',
          agentName: 'Grok Smartest Agent',
          avatarBadge: 'GRK',
          colorScheme: { border: 'border-cyan-400/40', bg: 'bg-cyan-950/20', text: 'text-cyan-300', badge: 'bg-cyan-400 text-slate-950' },
          specialty: 'Counter-Tactics & Press Breakers',
          philosophy: `Pin ${opponent}'s center-backs with high pressing triggers. Force their goalkeeper into long, inaccurate kicks that our backline easily claims.`,
          keyObservation: `${opponent}'s backline commits unforced errors under direct 2-man pressure from Tommy Kim and Jeffrey Zhang.`,
          recommendedTactic: 'Synchronized high-press trap triggered by Tharney’s forward step.',
          lineupAdjustment: 'Bring on Brody Rozo at 65\' to maintain ferocious pressing energy.',
          expectedOutcome: 'High turnover inside their defensive third within 10 minutes.',
          confidenceScore: 95
        },
        {
          agentId: 'gpt',
          agentName: 'GPT Smartest Agent',
          avatarBadge: 'GPT',
          colorScheme: { border: 'border-emerald-400/40', bg: 'bg-emerald-950/20', text: 'text-emerald-300', badge: 'bg-emerald-400 text-slate-950' },
          specialty: '4-Phase Positional Discipline',
          philosophy: 'Establish control through our 4-4-2 diamond midfield. Maintain passing angles so Tharney always has at least 3 progressive passing options.',
          keyObservation: `${opponent} struggles when we switch play rapidly across the central pivot.`,
          recommendedTactic: 'Circulate through Tharney -> switch to opposite wing within 2 touches.',
          lineupAdjustment: 'Instruct center-backs Bonchev and Wiley to maintain 18-yard spacing.',
          expectedOutcome: 'Elevate Peddie possession to >62% with >88% pass accuracy.',
          confidenceScore: 94
        },
        {
          agentId: 'kimi',
          agentName: 'Kimi Strongest Agent',
          avatarBadge: 'KMI',
          colorScheme: { border: 'border-purple-400/40', bg: 'bg-purple-950/20', text: 'text-purple-300', badge: 'bg-purple-400 text-slate-950' },
          specialty: 'Deep Video Telemetry & Scouting Archive',
          philosophy: `Cross-referencing all 2026 film: ${opponent} concedes 65% of their goals off dead-ball situations and rapid transitions down their right flank.`,
          keyObservation: `${opponent}'s right-back gets caught high upfield and recovers slowly.`,
          recommendedTactic: 'Overload the left touchline with Jeet Sinha (#6) and Noah Eldessouky (#12); slip Tommy Kim into the channel.',
          lineupAdjustment: 'Set-piece focus: Tharney and Cucchiara take all dead-ball kicks with pinpoint inswingers.',
          expectedOutcome: 'Set-piece goal and clean sheet defense.',
          confidenceScore: 96
        }
      ],
      consensusDirective: {
        headline: `Consensus Directive vs ${opponent}: Asymmetric Left-Flank Overload & High-Press Trap`,
        primaryAction: `Exploit ${opponent}'s right flank vulnerability with Eldessouky and Sinha combinations. Tharney locks down the central pivot while Mohiuddin conducts Zone 14 attacks.`,
        substitutions: [
          { offPlayer: '#7 Bennett Cucchiara (RM)', onPlayer: '#18 Brody Rozo (CM/ST)', minute: 60, rationale: 'Inject fresh pace and pressing intensity.' },
          { offPlayer: '#20 Jeffrey Zhang (ST)', onPlayer: '#15 Zachary Horsch (LW)', minute: 75, rationale: 'Provide fresh flank speed to seal the result.' }
        ],
        pressingTrigger: `Trigger press when ${opponent} plays backward to their center-backs.`,
        setPieceDirective: 'Tharney on Left Corners & Penalties; Cucchiara on Right Corners.',
        expectedXgSwing: '+1.65 Peddie xG / -0.80 Opponent xG'
      }
    };
  }

  // ============================================================================
  // Playbook Routines Studio Engine
  // ============================================================================

  static PLAYBOOK_ROUTINES: PlaybookRoutine[] = [
    {
      id: 'routine-corner-near-post',
      title: 'Near-Post Flick & Carson Wiley Far-Post Strike',
      category: 'CORNER',
      designerAgent: 'gpt',
      successRatePct: 42,
      expectedXG: 0.38,
      description: 'Right corner delivered with whip by Bennett Cucchiara (#7). Captain Christian Tharney (#13) makes an explosive run across the 6-yard box to flick toward the back post, where Carson Wiley (#22) finishes.',
      keyPersonnel: ['#7 Bennett Cucchiara (Taker)', '#13 Christian Tharney (Near-Post Flick)', '#22 Carson Wiley (Far-Post Finisher)', '#28 Tommy Kim (Goalmouth Screen)'],
      steps: [
        {
          stepIndex: 0,
          label: 'Setup: 3-Man Box Stack & Corner Stance',
          description: 'Cucchiara places ball on right corner quadrant. Tharney, Wiley, and Bonchev stack at penalty spot.',
          durationMs: 2000,
          ballPosition: { xPct: 98, yPct: 4 },
          peddiePlayers: [
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 97, yPct: 5, isBallCarrier: true, roleNote: 'Corner Taker' },
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 65, yPct: 50, roleNote: 'Stack Leader' },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 62, yPct: 52, roleNote: 'Far Post Target' },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 60, yPct: 54, roleNote: 'Central Decoy' },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 84, yPct: 48, roleNote: 'GK Screen' },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 75, yPct: 22, roleNote: 'Short Corner Option' },
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 52, yPct: 35, roleNote: 'Zone 14 Edge' },
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 35, yPct: 30, roleNote: 'Rest Defense' },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 35, yPct: 70, roleNote: 'Rest Defense' },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 55, yPct: 65, roleNote: 'Right Edge' },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 10, yPct: 50, roleNote: 'Keeper Sweep' }
          ],
          opponentDefenders: [
            { playerNumber: 1, playerName: 'Opp GK', position: 'GK', xPct: 92, yPct: 50 },
            { playerNumber: 4, playerName: 'Opp CB1', position: 'CB', xPct: 82, yPct: 42 },
            { playerNumber: 5, playerName: 'Opp CB2', position: 'CB', xPct: 78, yPct: 55 },
            { playerNumber: 2, playerName: 'Opp LB', position: 'LB', xPct: 80, yPct: 28 },
            { playerNumber: 3, playerName: 'Opp RB', position: 'RB', xPct: 79, yPct: 68 }
          ]
        },
        {
          stepIndex: 1,
          label: 'Whistle & Near-Post Flash Run',
          description: 'Cucchiara raises two arms. Tharney explodes on a sharp curved run toward the near corner of the 6-yard box.',
          durationMs: 1800,
          ballPosition: { xPct: 90, yPct: 25 },
          passingLine: { from: { xPct: 97, yPct: 5 }, to: { xPct: 86, yPct: 36 } },
          runVectors: [
            { playerNumber: 13, from: { xPct: 65, yPct: 50 }, to: { xPct: 86, yPct: 36 } },
            { playerNumber: 22, from: { xPct: 62, yPct: 52 }, to: { xPct: 88, yPct: 66 } }
          ],
          peddiePlayers: [
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 95, yPct: 7, roleNote: 'Cross Delivery' },
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 86, yPct: 36, isBallCarrier: true, roleNote: 'Flick Point' },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 88, yPct: 66, roleNote: 'Far Post Blitz' },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 72, yPct: 50, roleNote: 'Crash Middle' },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 88, yPct: 48, roleNote: 'Pinning GK' },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 72, yPct: 25, roleNote: 'Edge Guard' },
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 50, yPct: 38, roleNote: 'Second Ball' },
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 35, yPct: 30, roleNote: 'Rest Defense' },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 35, yPct: 70, roleNote: 'Rest Defense' },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 58, yPct: 60, roleNote: 'Rebound Stalker' },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 10, yPct: 50 }
          ],
          opponentDefenders: [
            { playerNumber: 1, playerName: 'Opp GK', position: 'GK', xPct: 91, yPct: 48 },
            { playerNumber: 4, playerName: 'Opp CB1', position: 'CB', xPct: 83, yPct: 38 },
            { playerNumber: 5, playerName: 'Opp CB2', position: 'CB', xPct: 80, yPct: 58 },
            { playerNumber: 2, playerName: 'Opp LB', position: 'LB', xPct: 78, yPct: 28 },
            { playerNumber: 3, playerName: 'Opp RB', position: 'RB', xPct: 82, yPct: 65 }
          ]
        },
        {
          stepIndex: 2,
          label: 'Flick-On & Far-Post Goal Conversion',
          description: 'Tharney glances the ball with his forehead across the face of goal. Wiley crashes unchallenged at the far post and powers it into the net!',
          durationMs: 2000,
          ballPosition: { xPct: 93, yPct: 62 },
          passingLine: { from: { xPct: 86, yPct: 36 }, to: { xPct: 93, yPct: 62 } },
          peddiePlayers: [
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 92, yPct: 10 },
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 87, yPct: 38, roleNote: 'Flick Executed' },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 93, yPct: 62, isBallCarrier: true, roleNote: 'GOAL! Header Finish' },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 78, yPct: 52 },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 90, yPct: 46 },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 70, yPct: 28 },
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 52, yPct: 40 },
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 35, yPct: 30 },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 35, yPct: 70 },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 60, yPct: 58 },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 10, yPct: 50 }
          ],
          opponentDefenders: [
            { playerNumber: 1, playerName: 'Opp GK', position: 'GK', xPct: 89, yPct: 52 },
            { playerNumber: 4, playerName: 'Opp CB1', position: 'CB', xPct: 85, yPct: 42 },
            { playerNumber: 5, playerName: 'Opp CB2', position: 'CB', xPct: 84, yPct: 60 },
            { playerNumber: 2, playerName: 'Opp LB', position: 'LB', xPct: 78, yPct: 30 },
            { playerNumber: 3, playerName: 'Opp RB', position: 'RB', xPct: 88, yPct: 68 }
          ]
        }
      ]
    },

    {
      id: 'routine-short-corner-triangle',
      title: 'Short Corner Triangle & Mohiuddin Zone 14 Cutback',
      category: 'CORNER',
      designerAgent: 'fable-5',
      successRatePct: 48,
      expectedXG: 0.44,
      description: 'Left corner routine designed by Fable 5. Christian Tharney (#13) plays short to Rayyaan Mohiuddin (#14) who combines with Jeet Sinha (#6) to create an acute angle inside the penalty box.',
      keyPersonnel: ['#13 Christian Tharney (Taker)', '#14 Rayyaan Mohiuddin (Pivot)', '#6 Jeet Sinha (Cutback Finisher)', '#28 Tommy Kim (Near-Post Decoy)'],
      steps: [
        {
          stepIndex: 0,
          label: 'Setup: Short Corner Decoy',
          description: 'Tharney on left corner. Mohiuddin sprints short from the 18-yard box to offer a 2v1 advantage.',
          durationMs: 2000,
          ballPosition: { xPct: 98, yPct: 96 },
          peddiePlayers: [
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 97, yPct: 95, isBallCarrier: true },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 88, yPct: 84, roleNote: 'Short Runner' },
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 75, yPct: 70, roleNote: 'Third Man Option' },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 85, yPct: 50, roleNote: 'Box Target' },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 80, yPct: 40, roleNote: 'Back Post' },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 82, yPct: 55, roleNote: 'Aerial Pin' },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 65, yPct: 45, roleNote: 'Rebound Anchor' },
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 55, yPct: 20, roleNote: 'Far Side Lockout' },
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 40, yPct: 80, roleNote: 'Rest Defense' },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 35, yPct: 30, roleNote: 'Rest Defense' },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 10, yPct: 50 }
          ],
          opponentDefenders: [
            { playerNumber: 1, playerName: 'Opp GK', position: 'GK', xPct: 92, yPct: 50 },
            { playerNumber: 2, playerName: 'Opp Defender 1', position: 'RB', xPct: 90, yPct: 85 },
            { playerNumber: 3, playerName: 'Opp Defender 2', position: 'CB', xPct: 86, yPct: 55 }
          ]
        },
        {
          stepIndex: 1,
          label: 'Pass-and-Go Triangle & Box Penetration',
          description: 'Tharney plays to Mohiuddin, who slides a 1-touch pass into Jeet Sinha arriving into the left half-space.',
          durationMs: 1800,
          ballPosition: { xPct: 82, yPct: 75 },
          passingLine: { from: { xPct: 97, yPct: 95 }, to: { xPct: 88, yPct: 84 } },
          runVectors: [
            { playerNumber: 6, from: { xPct: 75, yPct: 70 }, to: { xPct: 82, yPct: 75 } }
          ],
          peddiePlayers: [
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 92, yPct: 90 },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 86, yPct: 82 },
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 82, yPct: 75, isBallCarrier: true, roleNote: 'Zone 14 Edge' },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 88, yPct: 52 },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 84, yPct: 42 },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 86, yPct: 58 },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 65, yPct: 45 },
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 55, yPct: 20 },
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 40, yPct: 80 },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 35, yPct: 30 },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 10, yPct: 50 }
          ],
          opponentDefenders: [
            { playerNumber: 1, playerName: 'Opp GK', position: 'GK', xPct: 90, yPct: 52 },
            { playerNumber: 2, playerName: 'Opp Defender 1', position: 'RB', xPct: 86, yPct: 80 }
          ]
        },
        {
          stepIndex: 2,
          label: 'Curling Strike into Far Top Corner',
          description: 'Sinha takes one touch inside on his favored right foot and curls an unstoppable strike into the far upper 90!',
          durationMs: 2000,
          ballPosition: { xPct: 95, yPct: 48 },
          passingLine: { from: { xPct: 82, yPct: 75 }, to: { xPct: 95, yPct: 48 } },
          peddiePlayers: [
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 82, yPct: 75, roleNote: 'GOLAZO! 64\' Style Finish' },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 90, yPct: 50 },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 84, yPct: 80 },
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 90, yPct: 88 },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 85, yPct: 40 },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 86, yPct: 58 },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 65, yPct: 45 },
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 55, yPct: 20 },
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 40, yPct: 80 },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 35, yPct: 30 },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 10, yPct: 50 }
          ],
          opponentDefenders: [
            { playerNumber: 1, playerName: 'Opp GK', position: 'GK', xPct: 91, yPct: 51 }
          ]
        }
      ]
    },

    {
      id: 'routine-press-break-left',
      title: 'Diamond Flank Press Escape (Eldessouky-Sinha-Tharney)',
      category: 'PRESS_BREAK',
      designerAgent: 'grok',
      successRatePct: 84,
      expectedXG: 0.28,
      description: 'Engineered by Grok to break out when opponents trigger a high corner trap on Peddie’s left fullback. Eldessouky baiting the winger, Tharney dropping as the single pivot wall pass, and Sinha exploding behind.',
      keyPersonnel: ['#12 Noah Eldessouky (LB)', '#13 Christian Tharney (CDM)', '#6 Jeet Sinha (LM)', '#28 Tommy Kim (Target Channel)'],
      steps: [
        {
          stepIndex: 0,
          label: 'Trap Baited: Eldessouky on Touchline',
          description: 'Opponent commits 2 attackers to trap Eldessouky against our left corner flag.',
          durationMs: 1800,
          ballPosition: { xPct: 18, yPct: 82 },
          peddiePlayers: [
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 18, yPct: 82, isBallCarrier: true },
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 28, yPct: 58, roleNote: 'Diamond Base Support' },
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 38, yPct: 85, roleNote: 'Flank Release Runner' },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 18, yPct: 52, roleNote: 'Center Back Option' },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 20, yPct: 30 },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 25, yPct: 15 },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 45, yPct: 50 },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 65, yPct: 65 },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 62, yPct: 35 },
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 48, yPct: 20 },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 8, yPct: 50 }
          ],
          opponentDefenders: [
            { playerNumber: 9, playerName: 'Opp ST', position: 'ST', xPct: 22, yPct: 75 },
            { playerNumber: 7, playerName: 'Opp RW', position: 'RW', xPct: 25, yPct: 88 }
          ]
        },
        {
          stepIndex: 1,
          label: 'Wall Pass into Tharney & Spin',
          description: 'Eldessouky punches an inside diagonal to Tharney, who cushions a first-time touch into the stride of sprinting Jeet Sinha.',
          durationMs: 1800,
          ballPosition: { xPct: 38, yPct: 85 },
          passingLine: { from: { xPct: 18, yPct: 82 }, to: { xPct: 28, yPct: 58 } },
          runVectors: [
            { playerNumber: 6, from: { xPct: 38, yPct: 85 }, to: { xPct: 55, yPct: 88 } }
          ],
          peddiePlayers: [
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 22, yPct: 80 },
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 28, yPct: 58 },
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 55, yPct: 88, isBallCarrier: true, roleNote: 'Full Breakout Speed' },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 18, yPct: 52 },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 20, yPct: 30 },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 28, yPct: 15 },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 52, yPct: 52 },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 72, yPct: 60 },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 65, yPct: 35 },
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 50, yPct: 20 },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 8, yPct: 50 }
          ],
          opponentDefenders: [
            { playerNumber: 9, playerName: 'Opp ST', position: 'ST', xPct: 24, yPct: 72 },
            { playerNumber: 7, playerName: 'Opp RW', position: 'RW', xPct: 28, yPct: 85 }
          ]
        },
        {
          stepIndex: 2,
          label: '3v2 Counter Attack Breakthrough',
          description: 'Sinha carries 30 yards at 19.5 mph into opponent half, slipping Tommy Kim through on goal!',
          durationMs: 2000,
          ballPosition: { xPct: 78, yPct: 55 },
          passingLine: { from: { xPct: 55, yPct: 88 }, to: { xPct: 78, yPct: 55 } },
          peddiePlayers: [
            { playerNumber: 6, playerName: 'Sinha', position: 'LM', xPct: 55, yPct: 88, roleNote: 'Key Assist' },
            { playerNumber: 28, playerName: 'Kim (C)', position: 'ST', xPct: 78, yPct: 55, isBallCarrier: true, roleNote: '1v1 with Goalkeeper' },
            { playerNumber: 20, playerName: 'Zhang', position: 'ST', xPct: 74, yPct: 35 },
            { playerNumber: 14, playerName: 'Mohiuddin (C)', position: 'CAM', xPct: 60, yPct: 50 },
            { playerNumber: 13, playerName: 'Tharney (C)', position: 'CDM', xPct: 35, yPct: 55 },
            { playerNumber: 12, playerName: 'Eldessouky (C)', position: 'LB', xPct: 35, yPct: 78 },
            { playerNumber: 5, playerName: 'Lam', position: 'RB', xPct: 32, yPct: 20 },
            { playerNumber: 8, playerName: 'Bonchev', position: 'CB', xPct: 22, yPct: 50 },
            { playerNumber: 22, playerName: 'Wiley', position: 'CB', xPct: 22, yPct: 32 },
            { playerNumber: 7, playerName: 'Cucchiara', position: 'RM', xPct: 55, yPct: 22 },
            { playerNumber: 98, playerName: 'McKenzie', position: 'GK', xPct: 10, yPct: 50 }
          ],
          opponentDefenders: [
            { playerNumber: 1, playerName: 'Opp GK', position: 'GK', xPct: 88, yPct: 52 },
            { playerNumber: 4, playerName: 'Opp CB1', position: 'CB', xPct: 76, yPct: 48 }
          ]
        }
      ]
    }
  ];

  // ============================================================================
  // Match Simulator Tick Engine
  // ============================================================================

  static initSimulation(opponentName: string): SimState {
    return {
      currentMinute: 0,
      peddieScore: 0,
      opponentScore: 0,
      peddieXg: 0.0,
      opponentXg: 0.0,
      peddiePossessionPct: 55,
      tacticalStance: 'HIGH_PRESS_DIAMOND',
      events: [
        {
          minute: 1,
          type: 'Tactical Shift',
          team: 'Peddie',
          player: 'Coach George Nazario',
          description: `Kickoff at Peddie! Starting in 4-4-2 Diamond Midfield vs ${opponentName}. High press active.`,
          xgValue: 0,
          peddieScore: 0,
          opponentScore: 0,
          tacticalNote: 'Fable 5 & GPT Council pre-match directives engaged.'
        }
      ],
      isFinished: false,
      momentumPeddie: 15
    };
  }

  static simulateNextMinute(state: SimState, opponentName: string): SimState {
    if (state.isFinished || state.currentMinute >= 80) {
      return { ...state, isFinished: true };
    }

    const nextMinute = state.currentMinute + 5; // Step in 5-minute tactical increments
    const events = [...state.events];
    let peddieScore = state.peddieScore;
    let opponentScore = state.opponentScore;
    let peddieXg = state.peddieXg;
    let opponentXg = state.opponentXg;
    let momentum = state.momentumPeddie;
    let possession = state.peddiePossessionPct;

    // Stance multipliers
    let peddieAttackBoost = 1.0;
    let peddieDefRisk = 1.0;

    if (state.tacticalStance === 'ALL_OUT_ATTACK') {
      peddieAttackBoost = 1.6;
      peddieDefRisk = 1.4;
      possession = Math.min(68, possession + 1);
    } else if (state.tacticalStance === 'HIGH_PRESS_DIAMOND') {
      peddieAttackBoost = 1.25;
      peddieDefRisk = 0.95;
      possession = 58;
    } else if (state.tacticalStance === 'LOW_BLOCK_COUNTER') {
      peddieAttackBoost = 0.8;
      peddieDefRisk = 0.6;
      possession = 44;
    }

    // Peddie scoring / chance logic
    const peddieRoll = Math.random() * 100 * peddieAttackBoost;
    if (peddieRoll > 78) {
      // Chance created
      const isGoal = Math.random() > 0.65;
      const xg = +(0.2 + Math.random() * 0.45).toFixed(2);
      peddieXg = +(peddieXg + xg).toFixed(2);
      momentum = Math.min(100, momentum + 25);

      const scorers = ['Tommy Kim (#28)', 'Christian Tharney (#13)', 'Rayyaan Mohiuddin (#14)', 'Jeet Sinha (#6)', 'Jeffrey Zhang (#20)', 'Carson Wiley (#22)'];
      const chosenPlayer = scorers[Math.floor(Math.random() * scorers.length)];

      if (isGoal) {
        peddieScore += 1;
        events.push({
          minute: nextMinute,
          type: 'Goal',
          team: 'Peddie',
          player: chosenPlayer,
          description: `GOAL! ${chosenPlayer} strikes clinically into the corner following a rapid diamond combination! (xG: ${xg})`,
          xgValue: xg,
          peddieScore,
          opponentScore,
          tacticalNote: 'Grok Council: Press-break execution converted.'
        });
      } else {
        events.push({
          minute: nextMinute,
          type: 'Shot',
          team: 'Peddie',
          player: chosenPlayer,
          description: `${chosenPlayer} unleashes a stinging shot on target from 18 yards, tipped wide for a corner. (xG: ${xg})`,
          xgValue: xg,
          peddieScore,
          opponentScore,
          tacticalNote: 'Fable 5: Half-space penetration route achieved.'
        });
      }
    }

    // Opponent scoring / chance logic
    const oppRoll = Math.random() * 100 * peddieDefRisk;
    if (oppRoll > 86) {
      const oppIsGoal = Math.random() > 0.75;
      const oppXg = +(0.15 + Math.random() * 0.35).toFixed(2);
      opponentXg = +(opponentXg + oppXg).toFixed(2);
      momentum = Math.max(-100, momentum - 20);

      if (oppIsGoal) {
        opponentScore += 1;
        events.push({
          minute: nextMinute,
          type: 'Goal',
          team: 'Opponent',
          player: `${opponentName} Forward`,
          description: `${opponentName} scores on a quick counter-attack over the top. (xG: ${oppXg})`,
          xgValue: oppXg,
          peddieScore,
          opponentScore,
          tacticalNote: 'Kimi Council: Rest-defense recovery spacing violated.'
        });
      } else {
        events.push({
          minute: nextMinute,
          type: 'Save',
          team: 'Peddie',
          player: 'Dylan McKenzie (#98)',
          description: `Outstanding flying save by Dylan McKenzie! Preserves the box command on a 1v1 breakaway!`,
          xgValue: oppXg,
          peddieScore,
          opponentScore,
          tacticalNote: 'McKenzie maintains All-MAPL form rating.'
        });
      }
    }

    const isFinished = nextMinute >= 80;
    if (isFinished) {
      events.push({
        minute: 80,
        type: 'Tactical Shift',
        team: 'Peddie',
        player: 'Official Whistle',
        description: `FULL TIME: Peddie ${peddieScore} – ${opponentScore} ${opponentName}. Final xG: ${peddieXg} vs ${opponentXg}.`,
        xgValue: 0,
        peddieScore,
        opponentScore,
        tacticalNote: peddieScore > opponentScore ? 'VICTORY: Council consensus verified!' : 'Match concluded.'
      });
    }

    return {
      currentMinute: nextMinute,
      peddieScore,
      opponentScore,
      peddieXg,
      opponentXg,
      peddiePossessionPct: possession,
      tacticalStance: state.tacticalStance,
      events,
      isFinished,
      momentumPeddie: momentum
    };
  }
}
