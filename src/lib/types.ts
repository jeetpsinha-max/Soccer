export type Position = 
  | 'GK' 
  | 'CB' 
  | 'LB' 
  | 'RB' 
  | 'CDM' 
  | 'CM' 
  | 'CAM' 
  | 'LM'
  | 'RM'
  | 'LW' 
  | 'RW' 
  | 'ST';

export type CoachGrade = '+' | '0' | '-';

export interface PlayerAssignmentRecord {
  match: string;
  opponent: string;
  grade: CoachGrade;
  assignment: string;
  notes: string;
}

export interface Player {
  id: string;
  number: number;
  name: string;
  classYear: string; // 'Senior', 'Junior', 'Sophomore', 'Freshman'
  gradYear: number;
  position: Position;
  secondaryPosition?: Position;
  isCaptain?: boolean;
  squadLevel?: 'Varsity' | 'Junior Varsity';
  tacticalRole?: string; // e.g. 'Single Pivot Regista', 'Inverted Inside-Forward', 'Target Center-Forward'
  scoutingTier?: string; // e.g. 'NCAA D1 Prospect', 'All-MAPL First Team Caliber', 'Varsity Cornerstone'
  matchFormScore?: number; // 0.0 - 10.0 Sofascore/WhoScored match performance rating (e.g. 8.8)
  overallRating?: number; // Deprecated legacy field: Kept optional for backwards compatibility
  height: string;
  weight: string;
  hometown: string;
  photoUrl?: string; // Media Day Picture 1 (Primary Headshot)
  photoUrl2?: string; // Media Day Picture 2 (Secondary Portrait)
  actionPhotoUrl?: string; // Backwards compatible alias for photoUrl2
  minutesPlayed: number;
  matchesPlayed: number;
  goals: number;
  assists: number;
  expectedGoals: number; // xG
  expectedAssists: number; // xA
  passCompletionPct: number;
  tackleSuccessPct: number;
  topSpeedMph: number;
  topSpeedKmh?: number;
  distanceCoveredMiles: number;
  distanceCoveredKm?: number;
  shots?: number;
  shotsOnTarget?: number;
  keyPasses?: number;
  interceptions?: number;
  clearances?: number;
  aerialDuelsWon?: number;
  aerialDuelsContested?: number;
  cleanSheets?: number;
  saves?: number;
  goalsConceded?: number;
  assignmentHistory: PlayerAssignmentRecord[];
  recruitmentNotes: string;
  currentSeasonReport?: CurrentSeasonReport;
}

export interface CurrentSeasonReport {
  seasonRole: string; // e.g. "Starting Center Forward & Captain", "Key Central Midfield Anchor"
  formRating: number; // e.g. 9.4 (out of 10)
  match0Review?: string; // Haverford match review
  match1Review?: string; // Aquinas match review (3-2 Win)
  match2Review?: string; // Trenton Catholic match review (2-3 L)
  match3Review?: string; // George School match review (5-2 W)
  match4Review?: string; // PDS match review (7-1 W)
  latestMatchReview?: string; // Latest completed fixture summary
  upcomingMatchAssignment: string; // Next match directive (vs Life Center Academy)
  technicalStrengths: string[];
  developmentPriorities: string[];
  coachNazarioEvaluation: string;
  veoFilmInsight: string;
}

export interface TeamSeasonStats {
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsScored: number;
  goalsConceded: number;
  goalDifference: number;
  cleanSheets: number;
  avgPossessionPct: number;
  avgFieldTiltPct: number;
  avgPassCompletionPct: number;
  totalShots: number;
  totalShotsOnTarget: number;
  shotAccuracyPct: number;
  totalXgCreated: number;
  totalXgConceded: number;
  ppdaAverage: number;
  distanceCoveredTeamMiles: number;
}

export type EventType = 
  | 'Pass' 
  | 'Shot' 
  | 'Goal' 
  | 'Key Pass' 
  | 'Cross'
  | 'Tackle' 
  | 'Interception' 
  | 'Press Trap' 
  | 'Save' 
  | 'Corner' 
  | 'Foul';

export interface MatchEvent {
  id: string;
  minute: number;
  second: number;
  team: 'Peddie' | 'Opponent';
  playerNumber: number;
  playerName: string;
  type: EventType;
  startX: number; // 0 to 105 (meters)
  startY: number; // 0 to 68 (meters)
  endX?: number;
  endY?: number;
  expectedGoals?: number;
  success: boolean;
  description: string;
  phase: 'Open Play' | 'High Press' | 'Counter Attack' | 'Set Piece';
  period?: number; // 1, 2, 3, 4
  videoUrl?: string; // Direct Veo CDN 1080p MP4 clip
  thumbnailUrl?: string;
}

export type FormationId = '4-3-3' | '4-2-3-1' | '3-5-2' | '4-4-2';

export interface FormationNode {
  position: Position;
  playerNumber: number;
  playerName: string;
  xPct: number; // 0 to 100% horizontal coordinate
  yPct: number; // 0 to 100% vertical coordinate
  role: string;
}

export interface FormationConfig {
  id: FormationId;
  name: string;
  description: string;
  strengths: string[];
  vulnerabilities: string[];
  nodes: FormationNode[];
}

export type SeasonId = '2026-2027';

export interface MatchFixture {
  id: string;
  season: SeasonId;
  matchDate: string;
  opponent: string;
  opponentLogoText: string;
  isHome: boolean;
  isConference: boolean; // MAPL Conference match
  matchType?: string;
  rivalryName?: string;
  status: 'Completed' | 'Live' | 'Upcoming';
  peddieScore?: number;
  opponentScore?: number;
  gameTime?: string;
  location?: string;
  expectedGoalsPeddie?: number;
  expectedGoalsOpponent?: number;
  possessionPctPeddie?: number;
  fieldTiltPctPeddie?: number;
  ppdaPeddie?: number; // Passes Per Defensive Action (pressing intensity)
  ppdaOpponent?: number;
  xTPeddie?: number; // Expected Threat created
  xTOpponent?: number;
  keySummary: string;
  videoUrl?: string; // Veo match link
  hudlUrl?: string; // Official Hudl team/match video link
  filmProvider?: 'veo' | 'hudl' | 'both' | 'pending';
  thumbnailUrl?: string;
  scoutingReportId?: string;
  opponentRecord?: string;
  projectedScore?: string;
  nationalRanking?: string;
  stateRanking?: string;
  winProbabilityPct?: number;
}

export interface XTCell {
  zoneId: string;
  zoneName: string;
  col: number; // 0 to 11 (pitch length divided into 12 zones)
  row: number; // 0 to 7 (pitch width divided into 8 channels)
  xMeters: number;
  yMeters: number;
  threatValue: number; // Expected Threat baseline value (0.001 - 0.28)
  peddieThreatCreated: number;
  opponentThreatCreated: number;
  dominantTeam: 'Peddie' | 'Opponent' | 'Neutral';
}

export interface XTGridModel {
  zones: XTCell[];
  peddieTotalXT: number;
  opponentTotalXT: number;
  topDangerZone: string;
  halfSpaceAdvantagePct: number;
}

export interface ScoutingReport {
  opponent: string;
  conference: string;
  headCoach: string;
  formation: FormationId;
  keyPlaymakers: string[];
  tendencies: {
    buildup: string;
    defensiveBlock: string;
    vulnerabilityZone: string;
    setPieceThreat: string;
  };
  recommendedTactics: string[];
  winProbabilityPct: number;
}

// ============================================================================
// Advanced Data Analytics Interfaces (xG Flow, Shot Quality, Passing Networks)
// ============================================================================

export interface XgTimelinePoint {
  minute: number;
  peddieXg: number;
  opponentXg: number;
  eventDescription?: string;
  isGoal?: boolean;
  scoringTeam?: 'Peddie' | 'Opponent';
}

export interface ShotDetail {
  id: string;
  minute: number;
  second: number;
  team: 'Peddie' | 'Opponent';
  playerNumber: number;
  playerName: string;
  xMeters: number; // 0 to 105
  yMeters: number; // 0 to 68
  xg: number;
  psxg?: number; // Post-Shot xG
  shotType: 'Open Play' | 'Direct Free Kick' | 'Penalty' | 'Corner Header' | 'Volley';
  bodyPart: 'Right Foot' | 'Left Foot' | 'Header';
  outcome: 'Goal' | 'Saved' | 'Blocked' | 'Off Target' | 'Woodwork';
  distanceYards: number;
  angleDegrees: number;
}

export interface PassingLink {
  fromNumber: number;
  fromName: string;
  toNumber: number;
  toName: string;
  completedPasses: number;
  attemptedPasses: number;
  progressiveYards: number;
  keyPasses: number;
}

export interface PhysicalTelemetry {
  playerId: string;
  playerNumber: number;
  playerName: string;
  position: Position;
  totalDistanceMiles: number;
  totalDistanceKm?: number;
  highIntensityMiles: number; // speed > 12.5 mph
  highIntensityKm?: number;
  sprintsCount: number; // speed > 15.5 mph
  topSpeedMph: number;
  topSpeedKmh?: number;
  aerobicWorkRatePct: number;
}

export interface GoalkeeperAdvancedMetrics {
  playerNumber: number;
  playerName: string;
  isStarter: boolean;
  minutesPlayed: number;
  shotsFaced: number;
  saves: number;
  goalsConceded: number;
  cleanSheets: number;
  expectedGoalsFaced: number;
  goalsPrevented: number; // PSxG - GA
  savePct: number;
  crossesClaimedPct: number;
  penaltySavePct: number;
  avgDistributionLengthMeters: number;
}

export interface VeoFilmTimestamp {
  minute: string; // e.g. "14:22"
  title: string;
  phase: 'Build-up' | 'High Press' | 'Defensive Transition' | 'Set Piece' | 'Vulnerability';
  description: string;
  clipUrl?: string;
  thumbnailUrl?: string;
}

export interface VeoPlaymakerScout {
  number: number;
  name: string;
  position: string;
  traits: string;
  dangerLevel: 'Elite' | 'Dangerous' | 'Key Threat';
}

export interface VeoTeamScout {
  opponent: string;
  shortName: string;
  logoText: string;
  conference: string;
  headCoach: string;
  primaryFormation: FormationId | string;
  secondaryFormation?: string;
  winProbabilityPct: number;
  threatLevel: 'High' | 'Medium' | 'Critical';
  currentRecord?: string;
  projectedScore?: string;
  formGuide?: string;
  nationalRanking?: string;
  stateRanking?: string;
  veoMatchRecordId?: string;
  veoThumbnailUrl?: string;
  veoVideoUrl?: string;
  scoutingOverview: string;
  veoClips: VeoFilmTimestamp[];
  keyPlaymakers: VeoPlaymakerScout[];
  tacticalBreakdown: {
    inPossession: string;
    outOfPossession: string;
    transitionFlaws: string;
    setPieceTendencies: string;
  };
  peddieCounterDirectives: {
    coachNazarioDirective: string;
    diamondKeyAssignment: string;
    recommendedFormation: FormationId;
  };
  scoutedPlayers?: OpponentPlayerReport[];
}

export interface OpponentPlayerReport {
  id: string;
  opponentKey: string;
  teamName: string;
  number: number;
  name: string;
  position: string;
  line: 'GK' | 'DEF' | 'MID' | 'FWD';
  classYear: string;
  height?: string;
  dominantFoot?: 'Right' | 'Left' | 'Both';
  tacticalRole: string;
  dangerLevel: 'Elite' | 'Dangerous' | 'Key Threat' | 'Tactical Pivot';
  traits: string;
  strengths: string[];
  vulnerabilities: string[];
  currentSeasonNotes: string; // Current 2026-2027 Veo film/match scouting notes
  peddieMatchupCounter: string; // Assigned Peddie defender / tactical counter
  keyStats?: {
    goals?: number;
    assists?: number;
    duelsWonPct?: number;
    savesOrTackles?: string;
  };
}


