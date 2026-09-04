export type Position = 
  | 'GK' 
  | 'CB' 
  | 'LB' 
  | 'RB' 
  | 'CDM' 
  | 'CM' 
  | 'CAM' 
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
  overallRating: number; // 0 - 100
  height: string;
  weight: string;
  hometown: string;
  minutesPlayed: number;
  matchesPlayed: number;
  goals: number;
  assists: number;
  expectedGoals: number; // xG
  expectedAssists: number; // xA
  passCompletionPct: number;
  tackleSuccessPct: number;
  topSpeedKmh: number;
  distanceCoveredKm: number;
  assignmentHistory: PlayerAssignmentRecord[];
  recruitmentNotes: string;
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

export type SeasonId = '2024-2025' | '2025-2026' | '2026-2027';

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
  expectedGoalsPeddie: number;
  expectedGoalsOpponent: number;
  possessionPctPeddie: number;
  fieldTiltPctPeddie: number;
  keySummary: string;
  videoUrl?: string; // Veo match link
  thumbnailUrl?: string;
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
