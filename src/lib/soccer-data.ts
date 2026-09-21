import { 
  Player, 
  MatchFixture, 
  MatchEvent, 
  FormationConfig, 
  ScoutingReport,
  XgTimelinePoint,
  ShotDetail,
  PassingLink,
  PhysicalTelemetry,
  GoalkeeperAdvancedMetrics,
  VeoTeamScout,
  VeoFilmTimestamp,
  FormationId,
  OpponentPlayerReport,
  XTCell,
  XTGridModel
} from './types';
import { PEDDIE_PLAYER_CURRENT_SEASON_REPORTS } from './peddie-player-reports';
import { 
  OPPONENT_PLAYER_SCOUTING_REPORTS, 
  ALL_OPPONENT_PLAYER_REPORTS, 
  getOpponentPlayers 
} from './opponent-players-data';

export { 
  PEDDIE_PLAYER_CURRENT_SEASON_REPORTS, 
  OPPONENT_PLAYER_SCOUTING_REPORTS, 
  ALL_OPPONENT_PLAYER_REPORTS, 
  getOpponentPlayers 
};

// ============================================================================
// Official The Peddie School Boys Varsity Soccer Roster & Dossiers
// Grounded on Official Peddie Athletics, MaxPreps, NJISAA Prep A & MAPL Conference Records
// Head Coach: George Nazario (NCAA D3 National Champion, Seton Hall All-American & Big East Player of the Year)
// Assistant Coaches: Peter McClellan, Steve Collis
// ============================================================================

export const PEDDIE_ROSTER_2026_2027: Player[] = [
  {
    id: 'p-kim-t',
    number: 28,
    name: 'Tommy Kim',
    classYear: 'Senior',
    gradYear: 2027,
    position: 'ST',
    secondaryPosition: 'CAM',
    isCaptain: true,
    photoUrl: '/media-day-headshots/IMG_000625.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000632.jpg',
    overallRating: 95,
    height: "5'11\"",
    weight: '168 lbs',
    hometown: 'Princeton, NJ',
    minutesPlayed: 155,
    matchesPlayed: 2,
    goals: 1,
    assists: 0,
    expectedGoals: 1.15,
    expectedAssists: 0.35,
    passCompletionPct: 88.5,
    tackleSuccessPct: 75.0,
    topSpeedMph: 21.3,
    topSpeedKmh: 34.3,
    distanceCoveredMiles: 14.2,
    distanceCoveredKm: 22.9,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Starting striker & transition lead', notes: 'Scored clinical go-ahead goal in thrilling 3-2 home opener victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Conduct transition attack and deliver in key moments', notes: 'Created 3 chances and tested D1-caliber defense with 22-yard strike' }
    ],
    recruitmentNotes: 'Team Co-Captain (2026-2027). Starting striker paired with Jeffery Zhang. Dynamic forward with lethal ball-striking off both feet, elite composure, and 21.3 mph sprint speed.'
  },
  {
    id: 'p-tharney',
    number: 13,
    name: 'Christian Tharney',
    classYear: 'Senior',
    gradYear: 2027,
    position: 'CDM',
    secondaryPosition: 'CB',
    isCaptain: true,
    photoUrl: '/media-day-headshots/IMG_000547.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000560.jpg',
    overallRating: 91,
    height: "6'1\"",
    weight: '176 lbs',
    hometown: 'Kendall Park, NJ',
    minutesPlayed: 160,
    matchesPlayed: 2,
    goals: 1,
    assists: 0,
    expectedGoals: 0.45,
    expectedAssists: 0.25,
    passCompletionPct: 89.2,
    tackleSuccessPct: 88.5,
    topSpeedMph: 20.4,
    topSpeedKmh: 32.8,
    distanceCoveredMiles: 14.7,
    distanceCoveredKm: 23.7,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Holding midfielder & set piece leader', notes: 'Scored vital set-piece goal and commanded diamond midfield in 3-2 victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Diamond base holding anchor & set-piece delivery', notes: 'Won 7 ground duels, commanded defensive transition at diamond base, delivered 4 corners' }
    ],
    recruitmentNotes: 'Team Co-Captain (2026-2027). Starting central defensive midfielder (CDM) holding anchor at base of 4-4-2 diamond, backline leader, and set-piece specialist: designated penalty taker, direct free kicks, and left corners.'
  },
  {
    id: 'p-eldessouky',
    number: 12,
    name: 'Noah Eldessouky',
    classYear: 'Senior',
    gradYear: 2027,
    position: 'LB',
    isCaptain: true,
    photoUrl: '/media-day-headshots/IMG_000493.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000525.jpg',
    overallRating: 88,
    height: "5'10\"",
    weight: '160 lbs',
    hometown: 'Monroe, NJ',
    minutesPlayed: 160,
    matchesPlayed: 2,
    goals: 0,
    assists: 1,
    expectedGoals: 0.10,
    expectedAssists: 0.65,
    passCompletionPct: 87.5,
    tackleSuccessPct: 84.0,
    topSpeedMph: 21.1,
    topSpeedKmh: 34.0,
    distanceCoveredMiles: 15.0,
    distanceCoveredKm: 24.1,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Left touchline containment & attacking delivery', notes: 'Assisted Carson Wiley’s 81st minute match-winner from attacking corner delivery' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Overlapping flank progression and whip crosses', notes: 'Disciplined flank containment against elite wingers and vocal leadership' }
    ],
    recruitmentNotes: 'Team Co-Captain (2026-2027). Modern attacking fullback with relentless endurance (team-high 15.0 miles covered over 2 matches), vocal leadership, and sharp delivery.'
  },
  {
    id: 'p-mohiuddin',
    number: 14,
    name: 'Rayyaan Mohiuddin',
    classYear: 'Junior',
    gradYear: 2028,
    position: 'CAM',
    secondaryPosition: 'CM',
    isCaptain: true,
    photoUrl: '/media-day-headshots/IMG_000566.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000602.jpg',
    overallRating: 87,
    height: "5'10\"",
    weight: '158 lbs',
    hometown: 'East Windsor, NJ',
    minutesPlayed: 145,
    matchesPlayed: 2,
    goals: 0,
    assists: 1,
    expectedGoals: 0.35,
    expectedAssists: 0.85,
    passCompletionPct: 86.8,
    tackleSuccessPct: 72.5,
    topSpeedMph: 20.1,
    topSpeedKmh: 32.3,
    distanceCoveredMiles: 13.5,
    distanceCoveredKm: 21.7,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Tip of Diamond Playmaker', notes: 'Assisted Tommy Kim’s 34th minute strike with precision through-ball in 3-2 victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Central transition conductor', notes: 'Completed 88% of vertical passes under pressure' }
    ],
    recruitmentNotes: 'Team Co-Captain (2026-2027). Starting attacking midfielder (CAM) at the tip of the diamond, creative playmaker, and midfield conductor with 20.1 mph burst pace.'
  },
  {
    id: 'p-wachtveitl',
    number: 10,
    name: 'Quinn Wachtveitl',
    classYear: 'Senior',
    gradYear: 2027,
    position: 'LM',
    secondaryPosition: 'CB',
    photoUrl: '/media-day-headshots/IMG_000705.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000711.jpg',
    overallRating: 93,
    height: "6'2\"",
    weight: '180 lbs',
    hometown: 'Allentown, NJ',
    minutesPlayed: 150,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.25,
    expectedAssists: 0.40,
    passCompletionPct: 85.2,
    tackleSuccessPct: 76.0,
    topSpeedMph: 20.8,
    topSpeedKmh: 33.5,
    distanceCoveredMiles: 14.4,
    distanceCoveredKm: 23.2,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Left Midfield dominance & aerial presence', notes: 'Won 6 ground duels, supported Noah on flank defense, contributed to 3-2 win' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Left Midfield dominance & aerial set-piece crashing', notes: 'Won 8 of 9 aerial duels, controlled left touchline with physical authority' }
    ],
    recruitmentNotes: 'Senior starting Left Midfielder (LM). Physical powerhouse with aerial dominance, defensive tracking, and long-range crossing threat at 20.8 mph top speed.'
  },
  {
    id: 'p-lam-5',
    number: 5,
    name: 'Gabriel Lam',
    classYear: 'Senior',
    gradYear: 2027,
    position: 'RB',
    secondaryPosition: 'CDM',
    photoUrl: '/media-day-headshots/IMG_000668.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000695.jpg',
    overallRating: 89,
    height: "5'11\"",
    weight: '166 lbs',
    hometown: 'West Windsor, NJ',
    minutesPlayed: 160,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.05,
    expectedAssists: 0.30,
    passCompletionPct: 91.0,
    tackleSuccessPct: 87.5,
    topSpeedMph: 20.8,
    topSpeedKmh: 33.5,
    distanceCoveredMiles: 14.8,
    distanceCoveredKm: 23.8,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Starting Right Fullback in 4-4-2 Diamond', notes: 'Locked down Aquinas left winger, executed 5 clean clearances in 3-2 triumph' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Starting Right Fullback in 4-4-2 Diamond', notes: 'Extinguished counter-attacks and supported flank progression' }
    ],
    recruitmentNotes: 'Starting Right Back in 4-4-2 diamond midfield. High tactical discipline, positional intelligence, 20.8 mph top speed, and collegiate-level composure.'
  },
  {
    id: 'p-sinha-6',
    number: 6,
    name: 'Jeet Sinha',
    classYear: 'Junior',
    gradYear: 2028,
    position: 'LM',
    secondaryPosition: 'CDM',
    photoUrl: '/media-day-headshots/IMG_000761.jpg',
    photoUrl2: '/media-day-previews/IMG_000769.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000769.jpg',
    overallRating: 88,
    height: "5'11\"",
    weight: '165 lbs',
    hometown: 'Hightstown, NJ',
    minutesPlayed: 135,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.15,
    expectedAssists: 0.30,
    passCompletionPct: 92.0,
    tackleSuccessPct: 88.0,
    topSpeedMph: 20.4,
    topSpeedKmh: 32.8,
    distanceCoveredMiles: 11.7,
    distanceCoveredKm: 18.8,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Midfield Pressing & Possession Retention', notes: 'Completed 93% of passes, won 5 loose balls to protect lead in 3-2 win' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Left Flank Progression & Midfield Shield', notes: 'Extinguished 8 transition sequences and broke initial pressure with clean distributions' }
    ],
    recruitmentNotes: 'Junior Left Midfielder (LM) with clean distribution (92.0% completion), stamina, pressing discipline, 20.4 mph sprint speed, and defensive tracking.'
  },
  {
    id: 'p-bonchev',
    number: 8,
    name: 'Owen Bonchev',
    classYear: 'Sophomore',
    gradYear: 2029,
    position: 'CB',
    secondaryPosition: 'CM',
    photoUrl: '/media-day-headshots/IMG_000866.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000870.jpg',
    overallRating: 86,
    height: "5'8\"",
    weight: '150 lbs',
    hometown: 'Lawrenceville, NJ',
    minutesPlayed: 160,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.05,
    expectedAssists: 0.15,
    passCompletionPct: 89.5,
    tackleSuccessPct: 85.0,
    topSpeedMph: 20.3,
    topSpeedKmh: 32.7,
    distanceCoveredMiles: 12.7,
    distanceCoveredKm: 20.4,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Starting Center Back in 4-4-2 Diamond', notes: 'Commanded deep build-up passing and cleared 4 dangerous crosses in 3-2 victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Starting Center Back in 4-4-2 Diamond', notes: 'Progressed ball cleanly from central defense' }
    ],
    recruitmentNotes: 'Starting Center Back paired with Carson Wiley. Composed ball-playing defender with elite passing range from deep and 20.3 mph sprint velocity.'
  },
  {
    id: 'p-rozo-18',
    number: 18,
    name: 'Brody Rozo',
    classYear: 'Sophomore',
    gradYear: 2029,
    position: 'CM',
    secondaryPosition: 'ST',
    photoUrl: '/media-day-headshots/IMG_0001109.jpg',
    photoUrl2: '/media-day-previews/IMG_0001065.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_0001065.jpg',
    overallRating: 88,
    height: "6'1\"",
    weight: '174 lbs',
    hometown: 'Millstone, NJ',
    minutesPlayed: 95,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.15,
    expectedAssists: 0.20,
    passCompletionPct: 88.0,
    tackleSuccessPct: 83.0,
    topSpeedMph: 21.4,
    topSpeedKmh: 34.4,
    distanceCoveredMiles: 7.6,
    distanceCoveredKm: 12.2,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Central Midfield impact substitute', notes: 'Brought dynamic energy, won 3 aerial headers, and preserved 3-2 victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Central Midfield Engine & Physical Presence', notes: 'Created space for attacking wave with physical presence and direct runs' }
    ],
    recruitmentNotes: 'Sophomore Central Midfielder (CM) with physical presence, box-to-box engine, aerial prowess, and explosive 21.4 mph top speed.'
  },
  {
    id: 'p-romanelli-26',
    number: 26,
    name: 'Blake Romanelli',
    classYear: 'Sophomore',
    gradYear: 2029,
    position: 'RB',
    secondaryPosition: 'RM',
    photoUrl: '/media-day-headshots/IMG_000976.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_0001037.jpg',
    overallRating: 89,
    height: "5'10\"",
    weight: '162 lbs',
    hometown: 'Robbinsville, NJ',
    minutesPlayed: 90,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.10,
    expectedAssists: 0.25,
    passCompletionPct: 87.0,
    tackleSuccessPct: 85.0,
    topSpeedMph: 21.8,
    topSpeedKmh: 35.1,
    distanceCoveredMiles: 7.2,
    distanceCoveredKm: 11.6,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Right flank impact rotation', notes: 'Delivered team-fastest 21.8 mph recovery sprint to halt Aquinas counter in 3-2 win' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Right Back / Right Midfield Dynamic Flank Overload', notes: 'Blistering acceleration, wing recovery, and direct goal threat' }
    ],
    recruitmentNotes: 'Sophomore Right Back / Right Midfielder (RB/RM). Fastest player on the squad with team-high 21.8 mph sprint speed and relentless two-way engine.'
  },
  {
    id: 'p-mckenzie',
    number: 98,
    name: 'Dylan McKenzie',
    classYear: 'Junior',
    gradYear: 2028,
    position: 'GK',
    photoUrl: '/media-day-headshots/IMG_000721.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000728.jpg',
    overallRating: 90,
    height: "6'1\"",
    weight: '175 lbs',
    hometown: 'Hightstown, NJ',
    minutesPlayed: 160,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0,
    expectedAssists: 0.05,
    passCompletionPct: 78.5,
    tackleSuccessPct: 91.0,
    topSpeedMph: 17.5,
    topSpeedKmh: 28.2,
    distanceCoveredMiles: 7.0,
    distanceCoveredKm: 11.3,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Starting Goalkeeper & Box Commander', notes: 'Registered 4 critical second-half saves to seal dramatic 3-2 home opening victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Sweeper keeper box aerial command', notes: 'Recorded 7 athletic saves including 2 point-blank reaction denials on Veo AI match film' }
    ],
    recruitmentNotes: 'Class of 2028 starting varsity goalkeeper wearing jersey #98. 11 saves across 160 minutes in 2026-2027 season, vocal backline organizer, and rapid 17.5 mph recovery speed.'
  },
  {
    id: 'p-raya-2',
    number: 2,
    name: 'Wyatt Raya',
    classYear: 'Sophomore',
    gradYear: 2029,
    position: 'CM',
    secondaryPosition: 'RB',
    photoUrl: '/media-day-headshots/IMG_000946.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000956.jpg',
    overallRating: 84,
    height: "5'10\"",
    weight: '162 lbs',
    hometown: 'Princeton Junction, NJ',
    minutesPlayed: 85,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.10,
    expectedAssists: 0.15,
    passCompletionPct: 86.0,
    tackleSuccessPct: 82.0,
    topSpeedMph: 20.6,
    topSpeedKmh: 33.2,
    distanceCoveredMiles: 6.8,
    distanceCoveredKm: 10.9,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Central Midfield possession control', notes: 'Maintained midfield shape and linked transitions cleanly in 3-2 victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Midfield pressing reserve', notes: 'Won 3 ground tackles in midfield rotation' }
    ],
    recruitmentNotes: 'Sophomore Central Midfielder (CM) providing midfield possession control, tempo regulation, 20.6 mph speed, and technical distribution.'
  },
  {
    id: 'p-horsch-15',
    number: 15,
    name: 'Zach Horsch',
    classYear: 'Freshman',
    gradYear: 2030,
    position: 'CM',
    secondaryPosition: 'ST',
    photoUrl: '/media-day-headshots/IMG_0001238.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_0001247.jpg',
    overallRating: 82,
    height: "5'8\"",
    weight: '148 lbs',
    hometown: 'East Windsor, NJ',
    minutesPlayed: 65,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.05,
    expectedAssists: 0.10,
    passCompletionPct: 85.0,
    tackleSuccessPct: 80.0,
    topSpeedMph: 20.4,
    topSpeedKmh: 32.8,
    distanceCoveredMiles: 5.2,
    distanceCoveredKm: 8.4,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Freshman midfield rotation', notes: 'Showed quick feet under pressure and maintained possession in 3-2 win' }
    ],
    recruitmentNotes: 'Talented freshman midfielder with quick touch, 20.4 mph sprint speed, and strong tactical upside.'
  },
  {
    id: 'p-mango-17',
    number: 17,
    name: 'Mango',
    classYear: 'Sophomore',
    gradYear: 2029,
    position: 'RB',
    secondaryPosition: 'CB',
    photoUrl: '/media-day-headshots/IMG_0001175.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_0001182.jpg',
    overallRating: 83,
    height: "5'11\"",
    weight: '165 lbs',
    hometown: 'Holmdel, NJ',
    minutesPlayed: 70,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.05,
    expectedAssists: 0.10,
    passCompletionPct: 85.5,
    tackleSuccessPct: 79.0,
    topSpeedMph: 20.4,
    topSpeedKmh: 32.8,
    distanceCoveredMiles: 5.6,
    distanceCoveredKm: 9.0,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Defensive flank reinforcement', notes: 'Secured touchline defending in final quarter of 3-2 win' }
    ],
    recruitmentNotes: 'Sophomore backline defender capable of operating at fullback or center back with 20.4 mph speed and physical tackling.'
  },
  {
    id: 'p-gimbel-19',
    number: 19,
    name: 'Emerson Gimbel',
    classYear: 'Sophomore',
    gradYear: 2029,
    position: 'LW',
    secondaryPosition: 'RW',
    photoUrl: '/media-day-headshots/IMG_000652.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000661.jpg',
    overallRating: 83,
    height: "5'8\"",
    weight: '150 lbs',
    hometown: 'Manalapan, NJ',
    minutesPlayed: 60,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.10,
    expectedAssists: 0.15,
    passCompletionPct: 83.5,
    tackleSuccessPct: 72.0,
    topSpeedMph: 20.8,
    topSpeedKmh: 33.5,
    distanceCoveredMiles: 4.8,
    distanceCoveredKm: 7.7,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Wide attacking substitute', notes: 'Created width and pressed opposition fullbacks in 3-2 victory' }
    ],
    recruitmentNotes: 'Sophomore winger with tricky dribbling, 20.8 mph sprint speed, and aggressive direct attacking mindset.'
  },
  {
    id: 'p-zhang-20',
    number: 20,
    name: 'Jeffery Zhang',
    classYear: 'Junior',
    gradYear: 2028,
    position: 'ST',
    secondaryPosition: 'GK',
    photoUrl: '/media-day-headshots/IMG_000844.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000855.jpg',
    overallRating: 84,
    height: "6'0\"",
    weight: '172 lbs',
    hometown: 'Pennington, NJ',
    minutesPlayed: 130,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.40,
    expectedAssists: 0.20,
    passCompletionPct: 84.0,
    tackleSuccessPct: 71.0,
    topSpeedMph: 20.0,
    topSpeedKmh: 32.2,
    distanceCoveredMiles: 13.2,
    distanceCoveredKm: 21.2,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Starting striker paired with Tommy Kim', notes: 'Created passing channels, pinned center-backs, and occupied defensive focus in 3-2 victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Hold-up forward & channel runner', notes: 'Battled physically against nationally ranked defense' }
    ],
    recruitmentNotes: 'Junior starting Striker paired with Captain Tommy Kim, and primary emergency backup goalkeeper for Dylan McKenzie (#98). Physical presence, versatile athleticism, hold-up link play, and 20.0 mph pace.'
  },
  {
    id: 'p-wiley-22',
    number: 22,
    name: 'Carson Wiley',
    classYear: 'Junior',
    gradYear: 2028,
    position: 'CB',
    secondaryPosition: 'RB',
    photoUrl: '/media-day-headshots/IMG_000794.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000801.jpg',
    overallRating: 85,
    height: "6'1\"",
    weight: '178 lbs',
    hometown: 'Yardley, PA',
    minutesPlayed: 160,
    matchesPlayed: 2,
    goals: 1,
    assists: 0,
    expectedGoals: 0.65,
    expectedAssists: 0.10,
    passCompletionPct: 88.0,
    tackleSuccessPct: 89.0,
    topSpeedMph: 20.3,
    topSpeedKmh: 32.7,
    distanceCoveredMiles: 12.9,
    distanceCoveredKm: 20.8,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Starting Center Back & aerial set piece threat', notes: 'Scored towering 81st minute header goal to win thrilling 3-2 home opener' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Starting Center Back in 4-4-2 Diamond', notes: 'Battled top-ranked attack physically and cleared 5 crosses' }
    ],
    recruitmentNotes: 'Junior starting Center Back paired with Owen Bonchev. Scored 81st minute match-winner vs St. Thomas Aquinas. Physical aerial presence, disciplined man-marking, and 20.3 mph top speed.'
  },
  {
    id: 'p-xiao-25',
    number: 25,
    name: 'Harry Xiao',
    classYear: 'Junior',
    gradYear: 2028,
    position: 'RW',
    secondaryPosition: 'CM',
    photoUrl: '/media-day-headshots/IMG_000807.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_000819.jpg',
    overallRating: 87,
    height: "5'11\"",
    weight: '166 lbs',
    hometown: 'Morganville, NJ',
    minutesPlayed: 75,
    matchesPlayed: 2,
    goals: 0,
    assists: 0,
    expectedGoals: 0.15,
    expectedAssists: 0.20,
    passCompletionPct: 84.5,
    tackleSuccessPct: 73.0,
    topSpeedMph: 21.3,
    topSpeedKmh: 34.3,
    distanceCoveredMiles: 6.0,
    distanceCoveredKm: 9.7,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Attacking right wing substitution', notes: 'Created 2 crossing opportunities and pinned Aquinas left fullback in 3-2 win' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'High-press trigger against left back', notes: 'Forced 2 turnovers in attacking third with aggressive closing speed' }
    ],
    recruitmentNotes: 'Junior #25 attacking winger and midfielder. Fast, tricky with 21.3 mph sprint velocity and great crossing ability.'
  },
  {
    id: 'p-cuchera',
    number: 7,
    name: 'Bennett Cuchera',
    classYear: 'Freshman',
    gradYear: 2030,
    position: 'RM',
    secondaryPosition: 'RW',
    photoUrl: '/media-day-headshots/IMG_0001197.jpg',
    photoUrl2: '/media-day-previews/IMG_0001227.jpg',
    actionPhotoUrl: '/media-day-previews/IMG_0001227.jpg',
    overallRating: 83,
    height: "5'9\"",
    weight: '152 lbs',
    hometown: 'Cranbury, NJ',
    minutesPlayed: 140,
    matchesPlayed: 2,
    goals: 0,
    assists: 1,
    expectedGoals: 0.20,
    expectedAssists: 0.70,
    passCompletionPct: 87.5,
    tackleSuccessPct: 74.0,
    topSpeedMph: 20.8,
    topSpeedKmh: 33.5,
    distanceCoveredMiles: 13.9,
    distanceCoveredKm: 22.4,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Starting Right Midfielder & Set-Piece Specialist', notes: 'Assisted Christian Tharney’s 58th minute goal from precise delivery in 3-2 victory' },
      { match: 'vs Haverford School', opponent: 'Haverford', grade: '+', assignment: 'Right Corner Set-Piece Specialist', notes: 'Delivered accurate outswingers into the penalty spot' }
    ],
    recruitmentNotes: 'Freshman starting Right Midfielder (RM). Dynamic flank creator, 20.8 mph sprint speed, and designated right corner kick specialist for varsity.'
  },
  {
    id: 'p-sheinin',
    number: 16,
    name: 'Massimo Sheinin',
    classYear: 'Senior',
    gradYear: 2027,
    position: 'CM',
    overallRating: 92,
    height: "5'10\"",
    weight: '164 lbs',
    hometown: 'Cranbury, NJ',
    minutesPlayed: 45,
    matchesPlayed: 1,
    goals: 0,
    assists: 0,
    expectedGoals: 0.10,
    expectedAssists: 0.20,
    passCompletionPct: 93.0,
    tackleSuccessPct: 81.0,
    topSpeedMph: 20.4,
    topSpeedKmh: 32.8,
    distanceCoveredMiles: 3.8,
    distanceCoveredKm: 6.1,
    assignmentHistory: [
      { match: 'vs St. Thomas Aquinas', opponent: 'Aquinas', grade: '+', assignment: 'Second-half central midfield organizer', notes: 'Entered at halftime, completed 27 of 29 passes, and calmed midfield in 3-2 win' }
    ],
    recruitmentNotes: 'Elected Student Council Leader. Metronomic tempo setter, elite vision (93% pass accuracy), and college soccer prospect. (DNP in opener vs Haverford; played 45 min vs Aquinas).'
  }
];

// Enrich Peddie Roster with 2026-2027 Current Season Performance & Scouting Reports
PEDDIE_ROSTER_2026_2027.forEach(player => {
  if (PEDDIE_PLAYER_CURRENT_SEASON_REPORTS[player.number]) {
    player.currentSeasonReport = PEDDIE_PLAYER_CURRENT_SEASON_REPORTS[player.number];
  }
});

// Historical School Honors (Preserved for Program Heritage)
export const PEDDIE_HISTORICAL_HONORS_2026 = [
  {
    award: 'Joseph R. Wilbert Award',
    recipient: 'Pote Sophonsiri',
    classYear: 'Class of 2026 (Graduated)',
    distinction: 'Peddie Soccer Excellence & Sportsmanship'
  },
  {
    award: 'Evans Hicks Soccer Trophy',
    recipient: 'John Giblin',
    classYear: 'Class of 2026 (Graduated)',
    distinction: 'Top Offensive Production & Commitment'
  }
];

// ============================================================================
// Official Schedule & MAPL Conference Fixtures
// ============================================================================

export const PEDDIE_SCHEDULE_2026_2027: MatchFixture[] = [
  {
    id: 'm-0',
    season: '2026-2027',
    matchDate: 'Sept 1, 2026',
    gameTime: '4:30 PM',
    location: 'Haverford, PA',
    opponent: 'The Haverford School',
    opponentLogoText: 'HAV',
    isHome: false,
    isConference: false,
    matchType: 'Preseason Opener (4x20-Min Periods)',
    status: 'Completed',
    peddieScore: 0,
    opponentScore: 5,
    expectedGoalsPeddie: 1.15,
    expectedGoalsOpponent: 3.48,
    possessionPctPeddie: 44.6,
    fieldTiltPctPeddie: 41.2,
    ppdaPeddie: 11.4,
    ppdaOpponent: 8.2,
    xTPeddie: 0.88,
    xTOpponent: 2.14,
    videoUrl: 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/',
    hudlUrl: 'https://fan.hudl.com/usa/nj/hightstown/organization/15965/peddie-school',
    filmProvider: 'veo',
    thumbnailUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg',
    scoutingReportId: 'haverford',
    keySummary: 'Official 2026-2027 Season Opener vs. The Haverford School (PA). 4 periods of 20 minutes captured via Veo AI camera. Initial game trial for 4-4-2 diamond midfield rotations against a nationally ranked Inter-Ac powerhouse.'
  },
  {
    id: 'm-1',
    season: '2026-2027',
    matchDate: 'Sept 4, 2026',
    gameTime: '4:30 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'St. Thomas Aquinas High School',
    opponentLogoText: 'STA',
    isHome: true,
    isConference: false,
    matchType: 'Non-Conference Home Opener',
    status: 'Completed',
    peddieScore: 3,
    opponentScore: 2,
    expectedGoalsPeddie: 2.84,
    expectedGoalsOpponent: 1.65,
    possessionPctPeddie: 56.8,
    fieldTiltPctPeddie: 62.4,
    ppdaPeddie: 8.6,
    ppdaOpponent: 12.8,
    xTPeddie: 1.64,
    xTOpponent: 1.12,
    videoUrl: 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/',
    hudlUrl: 'https://fan.hudl.com/usa/nj/hightstown/organization/15965/video',
    filmProvider: 'both',
    thumbnailUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg',
    scoutingReportId: 'aquinas',
    keySummary: 'Thrilling 3-2 Home Opener victory on the Peddie campus over GMC Non-Public power St. Thomas Aquinas! Goals scored by Captain Tommy Kim (#28), Captain Christian Tharney (#13), and Carson Fleming (#15) (Game Winner 81\'). Available on Peddie Hudl & Veo.'
  },
  {
    id: 'm-2',
    season: '2026-2027',
    matchDate: 'Sept 8, 2026',
    gameTime: '4:00 PM',
    location: 'Trenton, NJ',
    opponent: 'Trenton Central High School',
    opponentLogoText: 'TCH',
    isHome: false,
    isConference: false,
    matchType: 'Mercer County Non-Conference Clash',
    status: 'Completed',
    peddieScore: 2,
    opponentScore: 3,
    expectedGoalsPeddie: 2.12,
    expectedGoalsOpponent: 2.45,
    possessionPctPeddie: 51.4,
    fieldTiltPctPeddie: 53.8,
    ppdaPeddie: 9.2,
    ppdaOpponent: 11.5,
    xTPeddie: 1.34,
    xTOpponent: 1.48,
    videoUrl: 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/',
    hudlUrl: 'https://fan.hudl.com/usa/nj/hightstown/organization/15965/video',
    filmProvider: 'hudl',
    thumbnailUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg',
    scoutingReportId: 'christian-school',
    keySummary: 'High-octane Mercer County battle at Trenton Central. Peddie struck twice through Tommy Kim (#28) and Jeffery Zhang (#20), but conceded late off transition counters.'
  },
  {
    id: 'm-3',
    season: '2026-2027',
    matchDate: 'Sept 10, 2026',
    gameTime: '4:00 PM',
    location: 'Newtown, PA',
    opponent: 'George School',
    opponentLogoText: 'GEO',
    isHome: false,
    isConference: false,
    matchType: 'Friends Schools League Showcase',
    status: 'Completed',
    peddieScore: 5,
    opponentScore: 2,
    expectedGoalsPeddie: 3.65,
    expectedGoalsOpponent: 1.42,
    possessionPctPeddie: 59.2,
    fieldTiltPctPeddie: 65.1,
    ppdaPeddie: 7.8,
    ppdaOpponent: 15.3,
    xTPeddie: 1.88,
    xTOpponent: 0.72,
    videoUrl: 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/',
    hudlUrl: 'https://fan.hudl.com/usa/nj/hightstown/organization/15965/video',
    filmProvider: 'both',
    thumbnailUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg',
    scoutingReportId: 'george-school',
    keySummary: 'Dominant 5-2 road triumph over George School (PA). Braces from Tommy Kim (#28) and offensive contributions from Rayyaan Mohiuddin (#14), Christian Tharney (#13), and Blake Romanelli (#26).'
  },
  {
    id: 'm-4',
    season: '2026-2027',
    matchDate: 'Sept 14, 2026',
    gameTime: '4:30 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'Princeton Day School',
    opponentLogoText: 'PDS',
    isHome: true,
    isConference: false,
    rivalryName: 'Mercer County Prep Derby',
    matchType: 'Prep Non-Conference',
    status: 'Completed',
    peddieScore: 7,
    opponentScore: 1,
    expectedGoalsPeddie: 4.48,
    expectedGoalsOpponent: 0.94,
    possessionPctPeddie: 64.5,
    fieldTiltPctPeddie: 71.0,
    ppdaPeddie: 6.9,
    ppdaOpponent: 18.2,
    xTPeddie: 2.45,
    xTOpponent: 0.48,
    videoUrl: 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/',
    hudlUrl: 'https://fan.hudl.com/usa/nj/hightstown/organization/15965/video',
    filmProvider: 'both',
    thumbnailUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg',
    scoutingReportId: 'pds',
    keySummary: 'Emphatic 7-1 victory in the Mercer County Prep Derby over Princeton Day School! Tommy Kim (#28) notched a hat trick, Jeffery Zhang (#20) added a brace, with Bennett Cuchera (#7) and Carson Fleming (#15) sealing the rout.'
  },
  {
    id: 'm-5',
    season: '2026-2027',
    matchDate: 'Sept 22, 2026',
    gameTime: '4:00 PM',
    location: 'Hightstown, NJ (Back Field 3)',
    opponent: 'Life Center Academy',
    opponentLogoText: 'LCA',
    isHome: true,
    isConference: false,
    matchType: 'Non-Conference Home',
    status: 'Upcoming',
    scoutingReportId: 'life-center',
    hudlUrl: 'https://fan.hudl.com/usa/nj/hightstown/organization/15965/schedule',
    filmProvider: 'hudl',
    keySummary: 'TODAY’S MATCH: Physical test against an athletic Life Center Academy squad. Focus on aerial second-ball domination by Brody Rozo (#18) and Dylan McKenzie (#98) commanding the 18-yard box.'
  },
  {
    id: 'm-6',
    season: '2026-2027',
    matchDate: 'Sept 24, 2026',
    gameTime: '4:30 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'Rutgers Preparatory School',
    opponentLogoText: 'RUT',
    isHome: true,
    isConference: false,
    matchType: 'Somerset County Showcase',
    status: 'Upcoming',
    scoutingReportId: 'rutgers-prep',
    hudlUrl: 'https://fan.hudl.com/usa/nj/hightstown/organization/15965/schedule',
    filmProvider: 'hudl',
    keySummary: 'Showcase matchup against technical Somerset County foe Rutgers Prep. Key matchup: Captain Rayyaan Mohiuddin (#14) dictating tempo from the tip of the diamond.'
  },
  {
    id: 'm-7',
    season: '2026-2027',
    matchDate: 'Sept 26, 2026',
    gameTime: '1:30 PM',
    location: 'Lawrenceville, NJ',
    opponent: 'The Lawrenceville School',
    opponentLogoText: 'LVR',
    isHome: false,
    isConference: true,
    rivalryName: 'Big Red MAPL Opener',
    matchType: 'MAPL Conference Match',
    status: 'Upcoming',
    scoutingReportId: 'lawrenceville',
    keySummary: 'Mid-Atlantic Prep League conference opener on the road against historic rival Lawrenceville Big Red. High stakes conference clash requiring 80-minute tactical discipline.'
  },
  {
    id: 'm-8',
    season: '2026-2027',
    matchDate: 'Sept 30, 2026',
    gameTime: '4:15 PM',
    location: 'Delran, NJ',
    opponent: 'Delran High School',
    opponentLogoText: 'DEL',
    isHome: false,
    isConference: false,
    matchType: 'Public vs Prep Showcase',
    status: 'Upcoming',
    scoutingReportId: 'delran',
    keySummary: 'Prestige clash against South Jersey public soccer royalty Delran Bears. High-intensity test of Peddie transition defense and set-piece execution.'
  },
  {
    id: 'm-9',
    season: '2026-2027',
    matchDate: 'Oct 3, 2026',
    gameTime: '1:30 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'Mercersburg Academy',
    opponentLogoText: 'MER',
    isHome: true,
    isConference: true,
    rivalryName: 'MAPL Home Classic',
    matchType: 'MAPL Conference Match',
    status: 'Upcoming',
    scoutingReportId: 'mercersburg',
    keySummary: 'MAPL home conference fixture against the Blue Storm of Mercersburg Academy (PA). Tactical battle of midfield control and flank verticality.'
  },
  {
    id: 'm-10',
    season: '2026-2027',
    matchDate: 'Oct 7, 2026',
    gameTime: '4:30 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'The Wilberforce School',
    opponentLogoText: 'WLB',
    isHome: true,
    isConference: false,
    matchType: 'Non-Conference Home',
    status: 'Upcoming',
    scoutingReportId: 'wilberforce',
    keySummary: 'Mid-week home non-conference fixture. Opportunity for depth rotations featuring Wyatt Raya (#2), Zach Horsch (#15), and Jeet Sinha (#6).'
  },
  {
    id: 'm-11',
    season: '2026-2027',
    matchDate: 'Oct 10, 2026',
    gameTime: '1:00 PM',
    location: 'Pottstown, PA',
    opponent: 'The Hill School',
    opponentLogoText: 'HIL',
    isHome: false,
    isConference: true,
    rivalryName: 'MAPL Keystone Battle',
    matchType: 'MAPL Conference Match',
    status: 'Upcoming',
    scoutingReportId: 'hill',
    keySummary: 'Crucial MAPL road trip to The Hill School Blues in Pottstown, PA. Battle of defensive structures and set-piece specialty delivery.'
  },
  {
    id: 'm-12',
    season: '2026-2027',
    matchDate: 'Oct 17, 2026',
    gameTime: '1:00 PM',
    location: 'West Windsor, NJ',
    opponent: 'West Windsor-Plainsboro South',
    opponentLogoText: 'WWP',
    isHome: false,
    isConference: false,
    matchType: 'Mercer County Cross-Town Showcase',
    status: 'Upcoming',
    scoutingReportId: 'wwps',
    keySummary: 'Local showdown against Colonial Valley Conference perennial contender Pirates of WW-P South. High technical tempo and spatial counter-pressing.'
  },
  {
    id: 'm-13',
    season: '2026-2027',
    matchDate: 'Oct 20, 2026',
    gameTime: '4:00 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'Hopewell Valley Central High School',
    opponentLogoText: 'HVC',
    isHome: true,
    isConference: false,
    matchType: 'Non-Conference Home',
    status: 'Upcoming',
    scoutingReportId: 'hopewell',
    keySummary: 'Home clash with Mercer County powerhouse Hopewell Valley Bulldogs. Testing backline resistance against direct front-running forwards.'
  },
  {
    id: 'm-14',
    season: '2026-2027',
    matchDate: 'Oct 24, 2026',
    gameTime: '4:00 PM',
    location: 'Pennington, NJ',
    opponent: 'The Pennington School',
    opponentLogoText: 'PEN',
    isHome: false,
    isConference: false,
    rivalryName: 'Prep A Championship Preview',
    matchType: 'Prep A Showcase',
    status: 'Upcoming',
    scoutingReportId: 'pennington',
    keySummary: 'Massive showdown against nationally ranked Prep A rival Pennington Red Hawks. High-profile collegiate recruiting showcase.'
  },
  {
    id: 'm-15',
    season: '2026-2027',
    matchDate: 'Oct 31, 2026',
    gameTime: '1:00 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'The Hun School of Princeton',
    opponentLogoText: 'HUN',
    isHome: true,
    isConference: true,
    rivalryName: 'MAPL Halloween Showdown',
    matchType: 'MAPL Conference Match',
    status: 'Upcoming',
    scoutingReportId: 'hun',
    keySummary: 'MAPL conference showdown on the Peddie campus against Hun Raiders. Heavy championship implications heading into November.'
  },
  {
    id: 'm-16',
    season: '2026-2027',
    matchDate: 'Nov 7, 2026',
    gameTime: '2:00 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'Blair Academy',
    opponentLogoText: 'BLR',
    isHome: true,
    isConference: true,
    rivalryName: 'Peddie-Blair Day 2026 (123rd Edition)',
    matchType: '123rd Peddie-Blair Day Classic & MAPL Finale',
    status: 'Upcoming',
    scoutingReportId: 'blair',
    keySummary: 'The oldest prep school rivalry in New Jersey (since 1903). 123rd Edition hosted at Peddie. The ultimate regular-season finale for the Potter-Kelley Cup and MAPL Championship honors.'
  }
];

export const FORMATIONS_CONFIG: Record<string, FormationConfig> = {
  '4-3-3': {
    id: '4-3-3',
    name: '4-3-3 Attacking Possession',
    description: 'High wingers, single pivot CDM (Captain #13 Christian Tharney) and overlapping fullbacks (Captain #12 Noah Eldessouky, Starting RB #5 Gabriel Lam). Guided by Head Coach George Nazario.',
    strengths: ['High positional flexibility', 'Overloading opponent fullbacks', 'Fluid half-space triangles'],
    vulnerabilities: ['Wide spaces behind attacking fullbacks', 'Requires high aerobic recovery sprint load'],
    nodes: [
      { position: 'GK', playerNumber: 98, playerName: 'McKenzie', xPct: 50, yPct: 92, role: 'Sweeper Keeper' },
      { position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 15, yPct: 74, role: 'Inverted Wingback (Captain)' },
      { position: 'CB', playerNumber: 8, playerName: 'Bonchev', xPct: 38, yPct: 78, role: 'Ball-Playing Center Back' },
      { position: 'CB', playerNumber: 22, playerName: 'Wiley', xPct: 62, yPct: 78, role: 'Stopper Center Back' },
      { position: 'RB', playerNumber: 5, playerName: 'Lam', xPct: 85, yPct: 74, role: 'Starting Right Fullback' },
      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 58, role: 'Deep-Lying Anchor (Captain)' },
      { position: 'LM', playerNumber: 10, playerName: 'Wachtveitl', xPct: 34, yPct: 44, role: 'Box-to-Box Left Midfielder' },
      { position: 'CAM', playerNumber: 14, playerName: 'Mohiuddin (C)', xPct: 66, yPct: 42, role: 'Advanced Free 10 (Captain)' },
      { position: 'LW', playerNumber: 26, playerName: 'Romanelli B', xPct: 18, yPct: 24, role: 'Inside Forward' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 16, role: 'Complete Forward (Captain)' },
      { position: 'RW', playerNumber: 7, playerName: 'Cuchera', xPct: 82, yPct: 24, role: 'Touchline Winger & Set-Piece Specialist' }
    ]
  },
  '4-2-3-1': {
    id: '4-2-3-1',
    name: '4-2-3-1 Gegenpressing Double Pivot',
    description: 'Double pivot with Captain #13 Christian Tharney and #6 Jeet Sinha shielding backline, liberating Captain #14 Rayyaan Mohiuddin at CAM and Captain #28 Tommy Kim at striker.',
    strengths: ['Unbreakable central transition defense', 'Explosive 4-man counter-attack waves'],
    vulnerabilities: ['Can leave striker isolated against 3-man backline'],
    nodes: [
      { position: 'GK', playerNumber: 98, playerName: 'McKenzie', xPct: 50, yPct: 92, role: 'Sweeper Keeper' },
      { position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 16, yPct: 75, role: 'Fullback (Captain)' },
      { position: 'CB', playerNumber: 8, playerName: 'Bonchev', xPct: 38, yPct: 80, role: 'Center Back' },
      { position: 'CB', playerNumber: 22, playerName: 'Wiley', xPct: 62, yPct: 80, role: 'Center Back' },
      { position: 'RB', playerNumber: 5, playerName: 'Lam', xPct: 84, yPct: 75, role: 'Starting Right Fullback' },
      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 38, yPct: 60, role: 'Double Pivot Anchor (Captain)' },
      { position: 'CDM', playerNumber: 6, playerName: 'Sinha', xPct: 62, yPct: 60, role: 'Double Pivot Right' },
      { position: 'CAM', playerNumber: 14, playerName: 'Mohiuddin (C)', xPct: 50, yPct: 38, role: 'Central Playmaker (Captain)' },
      { position: 'LM', playerNumber: 10, playerName: 'Wachtveitl', xPct: 18, yPct: 26, role: 'Left Midfielder' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 15, role: 'Striker (Captain)' },
      { position: 'RM', playerNumber: 7, playerName: 'Cuchera', xPct: 82, yPct: 26, role: 'Right Midfielder' }
    ]
  },
  '3-5-2': {
    id: '3-5-2',
    name: '3-5-2 Wing-Back Overload & Twin Strikers',
    description: 'Triple central defense with wingbacks providing width; twin strikers (Captain #28 Tommy Kim and #20 Jeffery Zhang) pin opposing center backs.',
    strengths: ['Complete midfield superiority (5v3)', 'Twin striker box presence'],
    vulnerabilities: ['Flanks exposed if wingbacks are caught high up'],
    nodes: [
      { position: 'GK', playerNumber: 98, playerName: 'McKenzie', xPct: 50, yPct: 92, role: 'Goalkeeper' },
      { position: 'CB', playerNumber: 8, playerName: 'Bonchev', xPct: 28, yPct: 78, role: 'Left Center Back' },
      { position: 'CB', playerNumber: 22, playerName: 'Wiley', xPct: 50, yPct: 80, role: 'Central Stopper' },
      { position: 'CB', playerNumber: 5, playerName: 'Lam', xPct: 72, yPct: 78, role: 'Right Center Back' },
      { position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 12, yPct: 52, role: 'Left Wing-Back (Captain)' },
      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 56, role: 'Central Midfield Anchor (Captain)' },
      { position: 'LM', playerNumber: 10, playerName: 'Wachtveitl', xPct: 34, yPct: 44, role: 'Left Central Midfielder' },
      { position: 'CAM', playerNumber: 14, playerName: 'Mohiuddin (C)', xPct: 66, yPct: 44, role: 'Attacking Midfielder (Captain)' },
      { position: 'RM', playerNumber: 7, playerName: 'Cuchera', xPct: 88, yPct: 52, role: 'Right Wing-Back' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 38, yPct: 18, role: 'Target Striker (Captain)' },
      { position: 'ST', playerNumber: 20, playerName: 'Zhang', xPct: 62, yPct: 18, role: 'Second Striker' }
    ]
  },
  '4-4-2': {
    id: '4-4-2',
    name: '4-4-2 Diamond Midfield (Peddie Primary System)',
    description: 'Classical 4-4-2 Diamond (4-1-2-1-2) with single-pivot anchor Captain #13 Christian Tharney, wide midfielders #10 Quinn Wachtveitl (LM) and #7 Bennett Cuchera (RM), and Captain #14 Rayyaan Mohiuddin conducting as CAM behind twin strikers Captain #28 Tommy Kim and #20 Jeffery Zhang. Backline anchored by #5 Gabriel Lam (RB), #22 Carson Wiley (CB), #8 Owen Bonchev (CB), and Captain #12 Noah Eldessouky (LB).',
    strengths: [
      'Unmatched central midfield numerical dominance (4v3 / 4v2)',
      'Dual striking power with Captain Tommy Kim (#28) and Jeffery Zhang (#20)',
      'Aerial and physical dominance on flanks with #10 Quinn Wachtveitl (LM) and #7 Bennett Cuchera (RM)',
      'Resilient backline shield with Captain Christian Tharney (#13) anchoring at CDM in front of Wiley and Bonchev'
    ],
    vulnerabilities: [
      'Demands high work rate from LM and RM to balance flank width and central compacting',
      'Requires rapid defensive transition when opponents counter through wide channels'
    ],
    nodes: [
      { position: 'GK', playerNumber: 98, playerName: 'McKenzie', xPct: 50, yPct: 92, role: 'Sweeper Keeper' },
      { position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 16, yPct: 76, role: 'Attacking Left Fullback (Captain)' },
      { position: 'CB', playerNumber: 8, playerName: 'Bonchev', xPct: 38, yPct: 80, role: 'Ball-Playing Center Back' },
      { position: 'CB', playerNumber: 22, playerName: 'Wiley', xPct: 62, yPct: 80, role: 'Stopper Center Back' },
      { position: 'RB', playerNumber: 5, playerName: 'Lam', xPct: 84, yPct: 76, role: 'Starting Right Fullback' },
      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 64, role: 'Diamond Base Holding Anchor (Captain)' },
      { position: 'LM', playerNumber: 10, playerName: 'Wachtveitl', xPct: 24, yPct: 48, role: 'Left Midfielder' },
      { position: 'RM', playerNumber: 7, playerName: 'Cuchera', xPct: 76, yPct: 48, role: 'Right Midfielder' },
      { position: 'CAM', playerNumber: 14, playerName: 'Mohiuddin (C)', xPct: 50, yPct: 34, role: 'Diamond Tip Playmaker (Captain)' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 38, yPct: 16, role: 'Striker / Forward (Captain)' },
      { position: 'ST', playerNumber: 20, playerName: 'Zhang', xPct: 62, yPct: 16, role: 'Striker / Forward' }
    ]
  }
};


export const MATCH_EVENTS_VEO_HAVERFORD: MatchEvent[] = [
  {
    "id": "veo-df91eca4",
    "minute": 7,
    "second": 15,
    "period": 1,
    "type": "Shot",
    "team": "Peddie",
    "playerNumber": 28,
    "playerName": "Tommy Kim (C)",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/df91eca4-bd9b-4171-893d-6da93b295af0_1788317479.555815/video.mp4?v=7v9q8pPK",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/df91eca4-bd9b-4171-893d-6da93b295af0_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Counter Attack",
    "startX": 82,
    "startY": 26,
    "description": "Peddie transition counter: Captain Tommy Kim (#28) turns in pocket and fires from 22 yards. (Veo AI Period 1)"
  },
  {
    "id": "veo-86a673c2",
    "minute": 11,
    "second": 35,
    "period": 1,
    "type": "Shot",
    "team": "Peddie",
    "playerNumber": 98,
    "playerName": "Dylan McKenzie",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/86a673c2-a2f7-495c-8282-739cfb12c034_1788317479.555815/video.mp4?v=0FOHwG9l",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/86a673c2-a2f7-495c-8282-739cfb12c034_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Dylan McKenzie (#98) athletic reaction save to deny Haverford shot attempt. (Veo AI Period 1)"
  },
  {
    "id": "veo-4c7c51a0",
    "minute": 13,
    "second": 8,
    "period": 1,
    "type": "Goal",
    "team": "Opponent",
    "playerNumber": 9,
    "playerName": "Haverford Fords",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/4c7c51a0-7704-4549-b0a2-991a39b54a3c_1788317479.555815/video.mp4?v=2Vr-NiPh",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/4c7c51a0-7704-4549-b0a2-991a39b54a3c_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.58,
    "success": true,
    "phase": "Counter Attack",
    "startX": 94,
    "startY": 34,
    "description": "Haverford Goal (Period 1, 13'): Vertical cutback into the penalty box finished into low corner. (Veo AI Official Clip)"
  },
  {
    "id": "veo-8b7d90a3",
    "minute": 16,
    "second": 15,
    "period": 1,
    "type": "Shot",
    "team": "Peddie",
    "playerNumber": 28,
    "playerName": "Tommy Kim (C)",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/8b7d90a3-7840-4447-8fa8-89cf0aa8def2_1788317479.555815/video.mp4?v=D0hJ9wO1",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/8b7d90a3-7840-4447-8fa8-89cf0aa8def2_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Counter Attack",
    "startX": 82,
    "startY": 26,
    "description": "Peddie transition counter: Captain Tommy Kim (#28) turns in pocket and fires from 22 yards. (Veo AI Period 1)"
  },
  {
    "id": "veo-cded00c6",
    "minute": 19,
    "second": 41,
    "period": 1,
    "type": "Goal",
    "team": "Opponent",
    "playerNumber": 9,
    "playerName": "Haverford Fords",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/cded00c6-bb03-4a7d-ad64-bc747f764f62_1788317479.555815/video.mp4?v=gjk_1dSv",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/cded00c6-bb03-4a7d-ad64-bc747f764f62_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.58,
    "success": true,
    "phase": "Counter Attack",
    "startX": 94,
    "startY": 34,
    "description": "Haverford Goal (Period 1, 19'): Attacking sequence off right flank cross drilled into net before first intermission. (Veo AI Official Clip)"
  },
  {
    "id": "veo-f07ba327",
    "minute": 26,
    "second": 44,
    "period": 2,
    "type": "Shot",
    "team": "Opponent",
    "playerNumber": 11,
    "playerName": "Haverford Attack",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/f07ba327-7225-4d16-ab40-207b712e2705_1788317479.555815/video.mp4?v=2VxPy6iu",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/f07ba327-7225-4d16-ab40-207b712e2705_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Haverford shot attempt tested Peddie defensive block of Tharney and Wachtveitl. (Veo AI Period 2)"
  },
  {
    "id": "veo-3eabdafc",
    "minute": 29,
    "second": 15,
    "period": 2,
    "type": "Goal",
    "team": "Opponent",
    "playerNumber": 9,
    "playerName": "Haverford Fords",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/3eabdafc-f07f-47c1-8c0a-5913bb6e0015_1788317479.555815/video.mp4?v=YwaRAfam",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/3eabdafc-f07f-47c1-8c0a-5913bb6e0015_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.58,
    "success": true,
    "phase": "Counter Attack",
    "startX": 94,
    "startY": 34,
    "description": "Haverford Goal (Period 2, 29'): High turnover in final third leads to clinical strike inside right upright. (Veo AI Official Clip)"
  },
  {
    "id": "veo-fe533807",
    "minute": 29,
    "second": 15,
    "period": 2,
    "type": "Shot",
    "team": "Peddie",
    "playerNumber": 98,
    "playerName": "Dylan McKenzie",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/fe533807-2f40-403c-b49a-8b528bc76a1e_1788317479.555815/video.mp4?v=2XbKbMD2",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/fe533807-2f40-403c-b49a-8b528bc76a1e_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Dylan McKenzie (#98) athletic reaction save to deny Haverford shot attempt. (Veo AI Period 2)"
  },
  {
    "id": "veo-06cc928b",
    "minute": 35,
    "second": 2,
    "period": 2,
    "type": "Shot",
    "team": "Opponent",
    "playerNumber": 11,
    "playerName": "Haverford Attack",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/06cc928b-6a11-40e9-85ae-01bf1d34dca8_1788317479.555815/video.mp4?v=00ys9FWU",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/06cc928b-6a11-40e9-85ae-01bf1d34dca8_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Haverford shot attempt tested Peddie defensive block of Tharney and Wachtveitl. (Veo AI Period 2)"
  },
  {
    "id": "veo-4c049e62",
    "minute": 41,
    "second": 52,
    "period": 2,
    "type": "Goal",
    "team": "Opponent",
    "playerNumber": 9,
    "playerName": "Haverford Fords",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/4c049e62-a5bf-418f-934d-74b1d09f43d9_1788317479.555815/video.mp4?v=Nhvja1fS",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/4c049e62-a5bf-418f-934d-74b1d09f43d9_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.58,
    "success": true,
    "phase": "Open Play",
    "startX": 94,
    "startY": 34,
    "description": "Haverford Goal (Period 2, 41'): Fast transition through half-space before second period whistle. (Veo AI Official Clip)"
  },
  {
    "id": "veo-c8ce0eb8",
    "minute": 41,
    "second": 52,
    "period": 2,
    "type": "Shot",
    "team": "Peddie",
    "playerNumber": 98,
    "playerName": "Dylan McKenzie",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/c8ce0eb8-d651-4193-a476-ecc79ff6d247_1788317479.555815/video.mp4?v=iD5jIntY",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/c8ce0eb8-d651-4193-a476-ecc79ff6d247_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Dylan McKenzie (#98) athletic reaction save to deny Haverford shot attempt. (Veo AI Period 2)"
  },
  {
    "id": "veo-1c160071",
    "minute": 48,
    "second": 43,
    "period": 3,
    "type": "Shot",
    "team": "Opponent",
    "playerNumber": 11,
    "playerName": "Haverford Attack",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/1c160071-7c95-495f-9083-746380345b00_1788317479.555815/video.mp4?v=St2s4S9u",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/1c160071-7c95-495f-9083-746380345b00_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Haverford shot attempt tested Peddie defensive block of Tharney and Wachtveitl. (Veo AI Period 3)"
  },
  {
    "id": "veo-00d9a0b2",
    "minute": 59,
    "second": 43,
    "period": 3,
    "type": "Shot",
    "team": "Peddie",
    "playerNumber": 28,
    "playerName": "Tommy Kim (C)",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/00d9a0b2-e89b-46f4-b02f-31c6981dce41_1788317479.555815/video.mp4?v=daL9_KhM",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/00d9a0b2-e89b-46f4-b02f-31c6981dce41_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Counter Attack",
    "startX": 82,
    "startY": 26,
    "description": "Peddie transition counter: Captain Tommy Kim (#28) turns in pocket and fires from 22 yards. (Veo AI Period 3)"
  },
  {
    "id": "veo-f7d5ec37",
    "minute": 66,
    "second": 32,
    "period": 3,
    "type": "Shot",
    "team": "Peddie",
    "playerNumber": 98,
    "playerName": "Dylan McKenzie",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/f7d5ec37-6dc4-461e-843c-128f2e82c1df_1788317479.555815/video.mp4?v=OIMYNrKJ",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/f7d5ec37-6dc4-461e-843c-128f2e82c1df_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Dylan McKenzie (#98) athletic reaction save to deny Haverford shot attempt. (Veo AI Period 3)"
  },
  {
    "id": "veo-955497fe",
    "minute": 71,
    "second": 0,
    "period": 4,
    "type": "Shot",
    "team": "Opponent",
    "playerNumber": 11,
    "playerName": "Haverford Attack",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/955497fe-8896-48bf-aaf6-4d4a0418b6fa_1788317479.555815/video.mp4?v=VIt--J5f",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/955497fe-8896-48bf-aaf6-4d4a0418b6fa_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Haverford shot attempt tested Peddie defensive block of Tharney and Wachtveitl. (Veo AI Period 4)"
  },
  {
    "id": "veo-7c9d8fdf",
    "minute": 77,
    "second": 48,
    "period": 4,
    "type": "Goal",
    "team": "Opponent",
    "playerNumber": 9,
    "playerName": "Haverford Fords",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/7c9d8fdf-ab12-456e-854a-a3b685d7aa05_1788317479.555815/video.mp4?v=BXlEsn3q",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/7c9d8fdf-ab12-456e-854a-a3b685d7aa05_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.58,
    "success": true,
    "phase": "Open Play",
    "startX": 94,
    "startY": 34,
    "description": "Haverford Goal (Period 4, 77'): Late scramble in 18-yard box following saved initial attempt. (Veo AI Official Clip)"
  },
  {
    "id": "veo-2dc977f1",
    "minute": 84,
    "second": 20,
    "period": 4,
    "type": "Shot",
    "team": "Peddie",
    "playerNumber": 98,
    "playerName": "Dylan McKenzie",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/2dc977f1-451b-4319-8b7f-a350caa01420_1788317479.555815/video.mp4?v=QbeHPDVs",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/2dc977f1-451b-4319-8b7f-a350caa01420_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Dylan McKenzie (#98) athletic reaction save to deny Haverford shot attempt. (Veo AI Period 4)"
  },
  {
    "id": "veo-9d3f697d",
    "minute": 89,
    "second": 39,
    "period": 4,
    "type": "Shot",
    "team": "Opponent",
    "playerNumber": 11,
    "playerName": "Haverford Attack",
    "videoUrl": "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/9d3f697d-cb02-498f-a233-a33ac5401369_1788317479.555815/video.mp4?v=et3VChnp",
    "thumbnailUrl": "https://veo-content-ii.s3.eu-west-1.amazonaws.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/9d3f697d-cb02-498f-a233-a33ac5401369_1788317479.555815/thumbnail-854x480.jpg",
    "expectedGoals": 0.18,
    "success": false,
    "phase": "Open Play",
    "startX": 82,
    "startY": 26,
    "description": "Haverford shot attempt tested Peddie defensive block of Tharney and Wachtveitl. (Veo AI Period 4)"
  }
];

export const MATCH_EVENTS_VEO_AQUINAS: MatchEvent[] = [
  {
    id: 'sta-event-1',
    minute: 8,
    second: 24,
    period: 1,
    type: 'Shot',
    team: 'Peddie',
    playerNumber: 20,
    playerName: 'Jeffery Zhang',
    expectedGoals: 0.16,
    success: false,
    phase: 'Open Play',
    startX: 78,
    startY: 30,
    description: 'Peddie opening chance: Jeffery Zhang (#20) controls diamond diagonal from Mohiuddin and forces diving stop from Aquinas GK Ethan Gallagher.'
  },
  {
    id: 'sta-event-2',
    minute: 14,
    second: 10,
    period: 1,
    type: 'Tackle',
    team: 'Peddie',
    playerNumber: 22,
    playerName: 'Carson Wiley',
    expectedGoals: 0.05,
    success: true,
    phase: 'Open Play',
    startX: 24,
    startY: 38,
    description: 'Carson Wiley (#22) blocks dangerous 16-yard effort from Aquinas striker Mateo Cruz (#9).'
  },
  {
    id: 'sta-event-3',
    minute: 21,
    second: 42,
    period: 1,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    expectedGoals: 0.24,
    success: true,
    phase: 'Open Play',
    startX: 12,
    startY: 34,
    description: 'Dylan McKenzie (#98) athletic fingertip save pushing 20-yard curler from Aquinas CAM Julian Rossi (#10) over crossbar.'
  },
  {
    id: 'sta-event-4',
    minute: 27,
    second: 18,
    period: 1,
    type: 'Foul',
    team: 'Peddie',
    playerNumber: 7,
    playerName: 'Bennett Cuchera',
    expectedGoals: 0.02,
    success: true,
    phase: 'Open Play',
    startX: 65,
    startY: 60,
    description: 'Bennett Cuchera (#7) draws tactical foul on right flank from Aquinas defender Dominic Russo.'
  },
  {
    id: 'sta-event-5',
    minute: 34,
    second: 12,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    expectedGoals: 0.32,
    success: true,
    phase: 'Open Play',
    startX: 84,
    startY: 36,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) takes half-turn pass from Rayyaan Mohiuddin (#14) and blasts a 22-yard rocket into top-right corner!'
  },
  {
    id: 'sta-event-6',
    minute: 41,
    second: 30,
    period: 1,
    type: 'Goal',
    team: 'Opponent',
    playerNumber: 9,
    playerName: 'Mateo Cruz',
    expectedGoals: 0.45,
    success: true,
    phase: 'Open Play',
    startX: 14,
    startY: 32,
    description: 'Aquinas Goal: Mateo Cruz (#9) scores from 6 yards on rebound after initial parry from McKenzie.'
  },
  {
    id: 'sta-event-7',
    minute: 48,
    second: 0,
    period: 2,
    type: 'Pass',
    team: 'Peddie',
    playerNumber: 12,
    playerName: 'Noah Eldessouky (C)',
    expectedGoals: 0.08,
    success: true,
    phase: 'Open Play',
    startX: 45,
    startY: 12,
    description: 'Captain Noah Eldessouky (#12) delivers pinpoint 40-yard switch to release Bennett Cuchera (#7) down right wing.'
  },
  {
    id: 'sta-event-8',
    minute: 54,
    second: 19,
    period: 2,
    type: 'Shot',
    team: 'Peddie',
    playerNumber: 26,
    playerName: 'Blake Romanelli',
    expectedGoals: 0.22,
    success: false,
    phase: 'Counter Attack',
    startX: 86,
    startY: 22,
    description: 'Blake Romanelli (#26) cuts inside on left foot, curling shot that skims the crossbar.'
  },
  {
    id: 'sta-event-9',
    minute: 58,
    second: 44,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 13,
    playerName: 'Christian Tharney (C)',
    expectedGoals: 0.38,
    success: true,
    phase: 'Set Piece',
    startX: 92,
    startY: 34,
    description: 'PEDDIE GOAL! Captain Christian Tharney (#13) rises above the defense and hammers home a bullet header from Bennett Cuchera\'s outswinging corner!'
  },
  {
    id: 'sta-event-10',
    minute: 67,
    second: 15,
    period: 2,
    type: 'Goal',
    team: 'Opponent',
    playerNumber: 4,
    playerName: 'Dominic Russo',
    expectedGoals: 0.79,
    success: true,
    phase: 'Set Piece',
    startX: 12,
    startY: 34,
    description: 'Aquinas Goal: Dominic Russo (#4) converts penalty kick inside the left post after an accidental handball in the box.'
  },
  {
    id: 'sta-event-11',
    minute: 74,
    second: 30,
    period: 2,
    type: 'Pass',
    team: 'Peddie',
    playerNumber: 14,
    playerName: 'Rayyaan Mohiuddin (C)',
    expectedGoals: 0.12,
    success: true,
    phase: 'Open Play',
    startX: 55,
    startY: 36,
    description: 'Captain Rayyaan Mohiuddin (#14) threads defense-splitting through-ball between Aquinas central defenders.'
  },
  {
    id: 'sta-event-12',
    minute: 78,
    second: 50,
    period: 2,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    expectedGoals: 0.42,
    success: true,
    phase: 'Open Play',
    startX: 10,
    startY: 34,
    description: 'Dylan McKenzie (#98) preserves 2-2 tie with a heroic spread-eagle save on a 1v1 breakaway from Aquinas #9 Cruz!'
  },
  {
    id: 'sta-event-13',
    minute: 81,
    second: 20,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 15,
    playerName: 'Carson Fleming',
    expectedGoals: 0.62,
    success: true,
    phase: 'Counter Attack',
    startX: 90,
    startY: 32,
    description: 'PEDDIE GAME WINNER! Carson Fleming (#15) sprints onto a diagonal through-ball from Eldessouky and calmly slips the ball under the onrushing keeper for the 3-2 victory!'
  },
  {
    id: 'sta-event-14',
    minute: 88,
    second: 10,
    period: 2,
    type: 'Tackle',
    team: 'Peddie',
    playerNumber: 14,
    playerName: 'Rayyaan Mohiuddin (C)',
    expectedGoals: 0.04,
    success: true,
    phase: 'Open Play',
    startX: 28,
    startY: 36,
    description: 'Rayyaan Mohiuddin (#14) executes decisive sliding tackle on the edge of the box to run out the clock.'
  }
];

export const OPPONENT_VEO_SCOUTING: Record<string, VeoTeamScout> = {
  'haverford': {
    opponent: 'The Haverford School Fords',
    shortName: 'Haverford',
    logoText: 'HAV',
    conference: 'Inter-Ac League (PA)',
    headCoach: 'Keith Cappo',
    primaryFormation: '4-3-3',
    secondaryFormation: '4-2-3-1',
    winProbabilityPct: 22.0,
    threatLevel: 'Critical',
    veoMatchRecordId: '20260901-vs-peddie-v4d69c3b',
    veoVideoUrl: 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/',
    veoThumbnailUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg',
    scoutingOverview: 'Nationally prominent Inter-Ac powerhouse with high-tempo physical transition, vertical passing through central channels, and lethal set-piece delivery.',
    veoClips: [
      { minute: '13:08', title: 'Period 1: Vertical Cutback Overload', phase: 'Vulnerability', description: 'Veo AI camera reveals Haverford cutting through the wide channel behind advancing wingback, finishing low into left side netting.' },
      { minute: '29:15', title: 'Period 2: High Turnover in Attacking Third', phase: 'High Press', description: 'Aggressive 3-man counter-press forces loose pass on edge of box resulting in first-touch clinical strike.' },
      { minute: '41:52', title: 'Period 2: Rapid Central Half-Space Break', phase: 'Build-up', description: 'Quick one-touch combination through midfield gap before second intermission.' },
      { minute: '77:48', title: 'Period 4: Scramble & Second-Ball Follow-Up', phase: 'Set Piece', description: 'Rebound scramble inside 6-yard box following initial reflex save.' }
    ],
    keyPlaymakers: [
      { number: 9, name: 'Haverford Center Forward', position: 'ST', traits: 'Deadly box awareness, quick trigger, predatory instinct on rebounds', dangerLevel: 'Elite' },
      { number: 10, name: 'Haverford Central Playmaker', position: 'CAM', traits: 'Pinpoint diagonal distribution and set-piece specialist', dangerLevel: 'Dangerous' },
      { number: 11, name: 'Haverford Left Winger', position: 'LW', traits: 'Blistering acceleration down the touchline with cutback delivery', dangerLevel: 'Dangerous' }
    ],
    tacticalBreakdown: {
      inPossession: 'Vertical direct switches into wide channels, rapid overloads in the penalty area with 4-5 runners.',
      outOfPossession: 'Aggressive mid-to-high press; counter-press immediately within 5 seconds of turnovers.',
      transitionFlaws: 'Leaves wide spaces behind advancing fullbacks when counter-attack is rapidly switched.',
      setPieceTendencies: 'Whipped inswinging near-post corners with trailing target crashing back post.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Maintain compact 4-4-2 diamond central block to choke their interior passing lanes. Release Tommy Kim (#28) and Blake Romanelli (#26) into space behind their fullbacks.',
      diamondKeyAssignment: 'Christian Tharney (#13) and Noah Eldessouky (#12) anchor central recovery and deny cutback zones.',
      recommendedFormation: '4-4-2'
    }
  },
  'aquinas': {
    opponent: 'St. Thomas Aquinas High School Trojans',
    shortName: 'St. Thomas Aquinas',
    logoText: 'STA',
    conference: 'Greater Middlesex Conference (Non-Public)',
    headCoach: 'Aquinas Technical Staff',
    primaryFormation: '4-2-3-1',
    secondaryFormation: '4-4-2',
    winProbabilityPct: 54.0,
    threatLevel: 'High',
    scoutingOverview: 'Well-drilled GMC Non-Public unit utilizing double-pivot protection and quick wing counter-attacks.',
    veoClips: [
      { minute: '18:40', title: 'Double-Pivot Build-Up Under Pressure', phase: 'Build-up', description: 'Veo film shows Aquinas central midfielders struggling when pressed directly by CAM free runner.' },
      { minute: '52:10', title: 'Wide Channel Isolation', phase: 'Vulnerability', description: 'Right fullback tends to step high, leaving massive space behind him for diagonal through balls.' }
    ],
    keyPlaymakers: [
      { number: 10, name: 'Aquinas Attacking Midfielder', position: 'CAM', traits: 'Quick turns on the half-turn, clever through-balls', dangerLevel: 'Dangerous' },
      { number: 9, name: 'Aquinas Target Forward', position: 'ST', traits: 'Hold-up play, physical aerial target on long balls', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Patient backline recycling until finding #10 between the lines.',
      outOfPossession: 'Low-to-medium block with two holding midfielders sitting tight.',
      transitionFlaws: 'Slow recovery from wide midfielders leaves their outside backs isolated 1v1.',
      setPieceTendencies: 'Zonal defending on set pieces with vulnerability at the penalty spot.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'High press their double-pivot early. Rayyaan Mohiuddin (#14) must sit on their #6, forcing turnovers in their defensive third.',
      diamondKeyAssignment: 'Bennett Cuchera (#7) exploit wide right space and whip early deliveries into Tommy Kim (#28).',
      recommendedFormation: '4-4-2'
    }
  },
  'christian-school': {
    opponent: 'The Christian School (Trenton Catholic Academy)',
    shortName: 'Trenton Catholic',
    logoText: 'TCH',
    conference: 'Mercer County / Non-Public',
    headCoach: 'TCHS Staff',
    primaryFormation: '4-4-2',
    secondaryFormation: '4-3-3',
    winProbabilityPct: 64.0,
    threatLevel: 'Medium',
    scoutingOverview: 'Athletic, high-effort local Mercer County opponent with explosive wide wingers and direct transition speed.',
    veoClips: [
      { minute: '22:15', title: 'Direct Goal Kick Bypass', phase: 'Build-up', description: 'TCHS bypasses central midfield via direct goal kicks toward left touchline.' },
      { minute: '64:30', title: 'Defensive Disorganization on Crosses', phase: 'Vulnerability', description: 'Center-backs often lose track of back-post runners on inswinging corner deliveries.' }
    ],
    keyPlaymakers: [
      { number: 11, name: 'TCHS Left Winger', position: 'LW', traits: 'Track-star sprint speed, looks to cut inside onto stronger foot', dangerLevel: 'Dangerous' },
      { number: 7, name: 'TCHS Central Midfielder', position: 'CM', traits: 'Aggressive ball winner, physical ball challenger', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Direct balls over the top into corners to unleash speed wingers.',
      outOfPossession: 'Physical, high-energy challenges in middle third.',
      transitionFlaws: 'Midfielders push too high, leaving center-backs exposed to 2v2 counter-attacks.',
      setPieceTendencies: 'Man-marking on corners that gets scrambled by near-post screeners.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Gabriel Lam (#5) must contain their left winger and prevent direct inside cuts. Owen Bonchev (#8) and Carson Wiley (#22) dominate first headers.',
      diamondKeyAssignment: 'Christian Tharney (#13) set-piece deliveries from corners and free kicks targeting Tommy Kim (#28).',
      recommendedFormation: '4-4-2'
    }
  },
  'george-school': {
    opponent: 'George School Cougars',
    shortName: 'George School',
    logoText: 'GEO',
    conference: 'Friends Schools League (FSL)',
    headCoach: 'George School Staff',
    primaryFormation: '3-5-2',
    secondaryFormation: '5-3-2',
    winProbabilityPct: 58.0,
    threatLevel: 'Medium',
    scoutingOverview: 'Tactically disciplined Pennsylvania squad playing a structured 3-5-2 with wingbacks providing width.',
    veoClips: [
      { minute: '14:20', title: 'Wingback High Overlap Flaw', phase: 'Vulnerability', description: 'Veo film highlights wide acres of space behind their left wingback on fast transitions.' },
      { minute: '48:10', title: '3-Back Central Density', phase: 'Defensive Transition', description: 'Very dense in central 18-yard box, but vulnerable to cutbacks at top of the penalty arc.' }
    ],
    keyPlaymakers: [
      { number: 8, name: 'Cougars Central Playmaker', position: 'CM', traits: 'Controls tempo with short diagonal switches', dangerLevel: 'Dangerous' },
      { number: 9, name: 'Cougars Striker', position: 'ST', traits: 'Strong hold-up play and clever lay-offs to arriving runners', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Possession out from the 3 center-backs with wingbacks hugging the sidelines.',
      outOfPossession: 'Collapses into a 5-3-2 deep defensive shell.',
      transitionFlaws: 'Large horizontal gaps between outer center-backs and wingbacks.',
      setPieceTendencies: 'Tall backline excels at defending aerial crosses; vulnerable to grounded cutbacks.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Stretch their 3 center-backs by utilizing Bennett Cuchera (#7) and Blake Romanelli (#26) on wide overlaps, creating 1v1 channels.',
      diamondKeyAssignment: 'Rayyaan Mohiuddin (#14) attack the 18-yard arc space for second balls.',
      recommendedFormation: '4-4-2'
    }
  },
  'pds': {
    opponent: 'Princeton Day School Panthers',
    shortName: 'Princeton Day',
    logoText: 'PDS',
    conference: 'NJISAA Prep B / Mercer County',
    headCoach: 'PDS Coaching Staff',
    primaryFormation: '4-3-3',
    secondaryFormation: '4-2-3-1',
    winProbabilityPct: 62.0,
    threatLevel: 'Medium',
    scoutingOverview: 'Historic Mercer County rival. Technical, short-passing philosophy with emphasis on midfield possession triangles.',
    veoClips: [
      { minute: '27:45', title: 'Central Triangle Progression', phase: 'Build-up', description: 'PDS rotates midfield 3 to bypass pressure; requires tight man-orientation.' },
      { minute: '68:15', title: 'Backline High-Line Caught', phase: 'Vulnerability', description: 'PDS plays a bold high defensive line that gets caught by well-timed vertical runs.' }
    ],
    keyPlaymakers: [
      { number: 10, name: 'Panthers Attacking Midfielder', position: 'CAM', traits: 'Elite technical footwork, through-ball vision', dangerLevel: 'Dangerous' },
      { number: 4, name: 'Panthers Center Back', position: 'CB', traits: 'Ball-playing defender, steps into midfield', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Short tiki-taka combinations through central third.',
      outOfPossession: 'Mid-block with pressing triggers on outward lateral passes.',
      transitionFlaws: 'High line leaves their goalkeeper unprotected against direct diagonal releases.',
      setPieceTendencies: 'Short corner setups to create overload angles.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Trigger aggressive trap on their #4 when stepping forward. Tommy Kim (#28) time runs behind their center-backs.',
      diamondKeyAssignment: 'Quinn Wachtveitl (#10) and Brody Rozo (#18) provide physical midfield pressure to disrupt PDS rhythm.',
      recommendedFormation: '4-4-2'
    }
  },
  'rutgers-prep': {
    opponent: 'Rutgers Preparatory School Argonauts',
    shortName: 'Rutgers Prep',
    logoText: 'RUT',
    conference: 'Non-Public / Prep',
    headCoach: 'Argonauts Staff',
    primaryFormation: '4-2-3-1',
    secondaryFormation: '4-3-3',
    winProbabilityPct: 59.0,
    threatLevel: 'Medium',
    scoutingOverview: 'Highly organized, technical squad featuring disciplined defensive shape and quick combination play through wide triangles.',
    veoClips: [
      { minute: '31:10', title: 'Midfield Overload in Phase 2', phase: 'Build-up', description: 'Argonauts drop attacking mid deep to form a 3-man midfield pivot.' },
      { minute: '74:20', title: 'Near-Post Defensive Breakdown', phase: 'Set Piece', description: 'Veo film demonstrates difficulty tracking near-post corner runners under pressure.' }
    ],
    keyPlaymakers: [
      { number: 8, name: 'Argonauts Box-to-Box Midfielder', position: 'CM', traits: 'Tenacious tackler, high-efficiency distributor', dangerLevel: 'Dangerous' },
      { number: 11, name: 'Argonauts Winger', position: 'RW', traits: 'Direct 1v1 threat on outer wing', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Controlled circulation waiting for central gaps.',
      outOfPossession: 'Compact 4-4-1-1 defensive shape in middle third.',
      transitionFlaws: 'Slow to recover defensively when counter-attacked through half-spaces.',
      setPieceTendencies: 'Vulnerable to whipped near-post outswinging corners.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Bennett Cuchera (#7) deliver designated right corners into near-post flick zones. Christian Tharney (#13) command second balls.',
      diamondKeyAssignment: 'Noah Eldessouky (#12) shut down their right winger with physical touchline containment.',
      recommendedFormation: '4-4-2'
    }
  },
  'life-center': {
    opponent: 'Life Center Academy Warriors',
    shortName: 'Life Center',
    logoText: 'LCA',
    conference: 'Non-Conference / Independent',
    headCoach: 'Warriors Staff',
    primaryFormation: '4-4-2',
    secondaryFormation: '4-5-1',
    winProbabilityPct: 72.0,
    threatLevel: 'Medium',
    scoutingOverview: 'Physical, aggressive side with fast direct counter-attacks and strong aerial box presence.',
    veoClips: [
      { minute: '19:05', title: 'Direct Aerial Channel Kick', phase: 'Build-up', description: 'LCA launches direct clearances from goalkeeper straight to forward headers.' },
      { minute: '58:40', title: 'Midfield Disconnect Under Press', phase: 'Vulnerability', description: 'LCA central midfielders get separated from backline by 25+ yards.' }
    ],
    keyPlaymakers: [
      { number: 9, name: 'Warriors Striker', position: 'ST', traits: 'Exceptional vertical leap, physical target forward', dangerLevel: 'Dangerous' },
      { number: 3, name: 'Warriors Sweeper', position: 'CB', traits: 'No-nonsense clearances, aggressive slide tackler', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Direct long balls, bypasses midfield construction.',
      outOfPossession: 'Hard-nosed tackling and tight physical challenges.',
      transitionFlaws: 'Huge gaps between lines allow Peddie diamond midfield to dominate possession.',
      setPieceTendencies: 'Packs the 6-yard box with aerial jumpers.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Dominate the middle third. Rayyaan Mohiuddin (#14) and Christian Tharney (#13) will have complete freedom in the pocket.',
      diamondKeyAssignment: 'Dylan McKenzie (#98) claim aerial crosses decisively; Bonchev and Wiley win physical headers.',
      recommendedFormation: '4-4-2'
    }
  },
  'lawrenceville': {
    opponent: 'The Lawrenceville School Big Red',
    shortName: 'Lawrenceville',
    logoText: 'LVR',
    conference: 'MAPL',
    headCoach: 'Lawrenceville Staff',
    primaryFormation: '4-3-3',
    secondaryFormation: '4-2-3-1',
    winProbabilityPct: 48.0,
    threatLevel: 'High',
    scoutingOverview: 'Historic MAPL rival. High-pressing tactical system with ambitious fullback overlaps and technical interior play.',
    veoClips: [
      { minute: '16:30', title: 'Big Red High Press Trap', phase: 'High Press', description: 'Veo film demonstrates Lawrenceville pressing aggressively with front 3 on goal kicks.' },
      { minute: '44:10', title: 'Space Behind Overlapping Fullbacks', phase: 'Vulnerability', description: 'Both fullbacks push deep into attacking third, leaving their center backs completely exposed.' }
    ],
    keyPlaymakers: [
      { number: 8, name: 'Big Red Creative Pivot', position: 'CM', traits: 'Controls tempo, dangerous on set pieces', dangerLevel: 'Dangerous' },
      { number: 7, name: 'Big Red Inverted Right Winger', position: 'RW', traits: 'Dribbles inside onto left foot for curling shots', dangerLevel: 'Dangerous' },
      { number: 9, name: 'Big Red Center Forward', position: 'ST', traits: 'Persistent pressing, opportunistic poacher in box', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Short passing from back, high reliance on central midfielders turning under pressure.',
      outOfPossession: 'Aggressive high press with high defensive line.',
      transitionFlaws: 'Spirited high line is severely vulnerable to Tommy Kim runs behind.',
      setPieceTendencies: 'Short corner routines to create 2v1 on edge of box.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Trigger high press whenever backpass is made to their GK or right CB. Quick direct balls from Wachtveitl into Tommy Kim channel runs.',
      diamondKeyAssignment: 'Quinn Wachtveitl (#10) and Bennett Cuchera (#7) exploit the flanks behind Big Red fullbacks.',
      recommendedFormation: '4-4-2'
    }
  },
  'delran': {
    opponent: 'Delran High School Bears',
    shortName: 'Delran',
    logoText: 'DEL',
    conference: 'BCSL / South Jersey Group 2',
    headCoach: 'Delran Coaching Legend',
    primaryFormation: '4-4-2',
    secondaryFormation: '4-3-3',
    winProbabilityPct: 44.0,
    threatLevel: 'High',
    scoutingOverview: 'Perennial South Jersey public school powerhouse (9-time State Champions). Ferocious work rate, tough tackling, and ruthless transition efficiency.',
    veoClips: [
      { minute: '12:50', title: 'High Intensity 50/50 Duels', phase: 'Defensive Transition', description: 'Bears contest every ground duel with full commitment; second-ball speed is elite.' },
      { minute: '67:20', title: 'Back-Post Set-Piece Overload', phase: 'Set Piece', description: 'Whipped free kicks targeting their 6-foot-2 center back crashing at the far post.' }
    ],
    keyPlaymakers: [
      { number: 10, name: 'Bears Center Forward', position: 'ST', traits: 'Clinical finisher, aggressive physical pressing, relentless motor', dangerLevel: 'Elite' },
      { number: 6, name: 'Bears Central Midfielder', position: 'CM', traits: 'Hard-tackling captain and midfield enforcer', dangerLevel: 'Dangerous' }
    ],
    tacticalBreakdown: {
      inPossession: 'Direct flank movement with early crosses and trailing runners.',
      outOfPossession: 'High-octane collective press; relentless closing speed.',
      transitionFlaws: 'Overcommits on attacking free kicks, leaving them vulnerable to fast breakouts.',
      setPieceTendencies: 'Long direct throws into penalty spot; dangerous near-post flick-ons.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Match their physical intensity from minute 1. Do not dwell on the ball—one-two touch passing through the diamond midfield.',
      diamondKeyAssignment: 'Christian Tharney (#13) and Brody Rozo (#18) win the midfield physical battle; Dylan McKenzie (#98) punch clear on long throws.',
      recommendedFormation: '4-4-2'
    }
  },
  'mercersburg': {
    opponent: 'Mercersburg Academy Blue Storm',
    shortName: 'Mercersburg',
    logoText: 'MER',
    conference: 'MAPL',
    headCoach: 'Blue Storm Staff',
    primaryFormation: '4-3-3',
    secondaryFormation: '4-4-2',
    winProbabilityPct: 66.0,
    threatLevel: 'Medium',
    scoutingOverview: 'MAPL rival from Pennsylvania. Disciplined technical team with structured build-up but vulnerable to explosive counter-attacks.',
    veoClips: [
      { minute: '24:15', title: 'Wide Switch Progression', phase: 'Build-up', description: 'Blue Storm looks to switch play diagonally to their left winger.' },
      { minute: '61:40', title: 'Center Back Separation', phase: 'Vulnerability', description: 'Center-backs fail to communicate when twin strikers split them.' }
    ],
    keyPlaymakers: [
      { number: 10, name: 'Blue Storm Midfield Anchor', position: 'CM', traits: 'Precise passing range, takes direct free kicks', dangerLevel: 'Dangerous' },
      { number: 9, name: 'Blue Storm Striker', position: 'ST', traits: 'Good hold-up link play, box presence', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Methodical buildup from goalkeeper, spreading field wide.',
      outOfPossession: 'Mid-block with conservative retreat line.',
      transitionFlaws: 'Struggles with dynamic vertical pace through the central channel.',
      setPieceTendencies: 'Defends set pieces with a static line on 6-yard box.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Deploy twin strikers Tommy Kim (#28) and Jeffery Zhang (#20) to split their center-backs. Rayyaan Mohiuddin (#14) thread interior through-balls.',
      diamondKeyAssignment: 'Bennett Cuchera (#7) and Quinn Wachtveitl (#10) deliver service behind their retreating backline.',
      recommendedFormation: '4-4-2'
    }
  },
  'wilberforce': {
    opponent: 'The Wilberforce School Wolverines',
    shortName: 'Wilberforce',
    logoText: 'WLB',
    conference: 'Non-Conference / Independent',
    headCoach: 'Wolverines Staff',
    primaryFormation: '4-4-2',
    secondaryFormation: '4-5-1',
    winProbabilityPct: 78.0,
    threatLevel: 'Medium',
    scoutingOverview: 'Hardworking local Princeton squad playing a low-block defensive system looking for opportunistic counters.',
    veoClips: [
      { minute: '35:20', title: 'Low Block Defensive Containment', phase: 'Defensive Transition', description: 'Wilberforce drops 8 outfield players into their defensive third.' },
      { minute: '71:15', title: 'Fatigue Breakdown in Second Half', phase: 'Vulnerability', description: 'Defensive discipline deteriorates past 65th minute under sustained high possession.' }
    ],
    keyPlaymakers: [
      { number: 10, name: 'Wolverines Forward', position: 'ST', traits: 'Quick on the counter, dangerous from 25 yards', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Direct clearances and isolated counter attempts.',
      outOfPossession: 'Deep 4-4-2 shell defending the 18-yard box.',
      transitionFlaws: 'Inability to sustain possession leads to heavy wave after wave of pressure.',
      setPieceTendencies: 'Struggles with short corner variations and far-post headers.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Rotate squad early and often. Give Wyatt Raya (#2), Zach Horsch (#15), and Jeet Sinha (#6) extended minutes to build game rhythm.',
      diamondKeyAssignment: 'Brody Rozo (#18) and Gabriel Lam (#5) push high into attacking third.',
      recommendedFormation: '4-4-2'
    }
  },
  'hill': {
    opponent: 'The Hill School Blues',
    shortName: 'The Hill School',
    logoText: 'HIL',
    conference: 'MAPL',
    headCoach: 'Hill Soccer Staff',
    primaryFormation: '4-2-3-1',
    secondaryFormation: '4-4-2',
    winProbabilityPct: 49.0,
    threatLevel: 'High',
    scoutingOverview: 'Historic MAPL Keystone rival. Gritty, disciplined, defensively stingy unit with set-piece mastery and physical center-backs.',
    veoClips: [
      { minute: '17:40', title: 'Blues Defensive Line Discipline', phase: 'Defensive Transition', description: 'Hill maintains rigid lines of 4 and 2; difficult to break down centrally.' },
      { minute: '55:10', title: 'Edge-of-Box Cutback Flaw', phase: 'Vulnerability', description: 'Veo AI reveals Hill defensive midfielders getting sucked into the 6-yard box, vacating the top of the box.' }
    ],
    keyPlaymakers: [
      { number: 4, name: 'Blues Center Back Captain', position: 'CB', traits: 'Elite aerial defender, vocal defensive organizer', dangerLevel: 'Elite' },
      { number: 10, name: 'Blues Attacking Midfielder', position: 'CAM', traits: 'Dangerous on direct free kicks from 20-30 yards', dangerLevel: 'Dangerous' }
    ],
    tacticalBreakdown: {
      inPossession: 'Measured buildup through double pivot, look for set pieces in attacking half.',
      outOfPossession: 'Extremely organized low-to-mid block with disciplined tracking.',
      transitionFlaws: 'Vulnerable to late-arriving midfield runners on cutback deliveries.',
      setPieceTendencies: 'Dangerous long throw-ins and organized corner flick-ons.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Do not cross high balls into their 6-foot-3 center-backs. Work low cutbacks to Rayyaan Mohiuddin (#14) and Christian Tharney (#13) at the 18-yard arc.',
      diamondKeyAssignment: 'Tommy Kim (#28) draw their center-backs out with check-runs to open passing lanes.',
      recommendedFormation: '4-4-2'
    }
  },
  'wwps': {
    opponent: 'West Windsor-Plainsboro South Pirates',
    shortName: 'WW-P South',
    logoText: 'WWP',
    conference: 'Colonial Valley Conference (CVC)',
    headCoach: 'Pirates Coaching Staff',
    primaryFormation: '4-3-3',
    secondaryFormation: '3-4-3',
    winProbabilityPct: 55.0,
    threatLevel: 'Medium',
    scoutingOverview: 'Premier Mercer County public powerhouse. High technical skill, fluid positional rotations, and dangerous attacking wingers.',
    veoClips: [
      { minute: '21:30', title: 'Pirates Wide Triangle Rotation', phase: 'Build-up', description: 'Winger, fullback, and interior midfielder create rapid passing triangles.' },
      { minute: '63:15', title: 'Overcommitment on Attacking Corner', phase: 'Vulnerability', description: 'Leaves only 1 defender back on attacking corners, highly vulnerable to fast breakout.' }
    ],
    keyPlaymakers: [
      { number: 7, name: 'Pirates Left Winger', position: 'LW', traits: 'Tricky 1v1 dribbler, dangerous crosser', dangerLevel: 'Elite' },
      { number: 10, name: 'Pirates Midfield General', position: 'CM', traits: 'Controls tempo and plays defense-splitting passes', dangerLevel: 'Dangerous' }
    ],
    tacticalBreakdown: {
      inPossession: 'Positional play with wide wingers hugging touchlines.',
      outOfPossession: 'Aggressive pressing traps along the touchline.',
      transitionFlaws: 'Fullbacks caught upfield leaves wide open counter-attacking lanes.',
      setPieceTendencies: 'Whipped inswingers with tall runners crowding goalkeeper.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Gabriel Lam (#5) and Starting LB Noah Eldessouky (#12) play disciplined positional defense against their wingers. Dylan McKenzie (#98) command the 6-yard box on corners.',
      diamondKeyAssignment: 'Blake Romanelli (#26) and Bennett Cuchera (#7) punish their high fullbacks with blistering transition runs.',
      recommendedFormation: '4-4-2'
    }
  },
  'hopewell': {
    opponent: 'Hopewell Valley Central High School Bulldogs',
    shortName: 'Hopewell Valley',
    logoText: 'HVC',
    conference: 'Colonial Valley Conference (CVC)',
    headCoach: 'Bulldogs Coaching Staff',
    primaryFormation: '4-4-2',
    secondaryFormation: '4-2-3-1',
    winProbabilityPct: 63.0,
    threatLevel: 'Medium',
    scoutingOverview: 'Tough, athletic Mercer County public school. High pressing energy, physical backline, and dangerous direct front-runners.',
    veoClips: [
      { minute: '15:10', title: 'Bulldogs Front Two Pressing', phase: 'High Press', description: 'Front two press center-backs aggressively to force long clearances.' },
      { minute: '54:20', title: 'Gaps Between Backline & Midfield', phase: 'Vulnerability', description: 'When Bulldogs press high, backline does not push up synchronously, leaving 20 yards of free space.' }
    ],
    keyPlaymakers: [
      { number: 9, name: 'Bulldogs Forward', position: 'ST', traits: 'Physical target, powerful shot from distance', dangerLevel: 'Dangerous' },
      { number: 5, name: 'Bulldogs Center Back', position: 'CB', traits: 'Dominant in the air, aggressive tackler', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Direct transition through wide midfielders into forward runs.',
      outOfPossession: 'High-energy pressing in attacking half.',
      transitionFlaws: 'Disconnection between forward press and defensive line creates massive pocket for #10.',
      setPieceTendencies: 'Direct throw-ins into the penalty box; dangerous on second balls.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Rayyaan Mohiuddin (#14) operate in the gap between their midfield and defense. One-touch combinations to bypass their initial press.',
      diamondKeyAssignment: 'Bonchev and Wiley maintain physical command against their physical forward line.',
      recommendedFormation: '4-4-2'
    }
  },
  'pennington': {
    opponent: 'The Pennington School Red Hawks',
    shortName: 'Pennington',
    logoText: 'PEN',
    conference: 'NJISAA Prep A / National Prep',
    headCoach: 'Chad Bridges',
    primaryFormation: '4-3-3',
    secondaryFormation: '4-2-3-1',
    winProbabilityPct: 28.0,
    threatLevel: 'Critical',
    scoutingOverview: 'Nationally ranked Prep A powerhouse with multiple Division 1 commits. Elite speed, technical sophistication, and aggressive counter-pressing.',
    veoClips: [
      { minute: '09:40', title: 'Red Hawks Counter-Pressing Surge', phase: 'High Press', description: 'Veo film highlights 4-man swarm within 3 seconds of losing ball in attacking third.' },
      { minute: '38:25', title: 'Vulnerability on Direct Diagonal Switch', phase: 'Vulnerability', description: 'Pennington counter-press overcommits to ball side, leaving weak side completely open to diagonal switches.' },
      { minute: '82:10', title: 'Late Game High Line Fatigue', phase: 'Defensive Transition', description: 'Center-backs get caught flat-footed on fast through-balls late in game.' }
    ],
    keyPlaymakers: [
      { number: 10, name: 'Red Hawks Attacking Midfielder', position: 'CAM', traits: 'Division 1 commit, elite ball manipulation, defense-splitting passes', dangerLevel: 'Elite' },
      { number: 9, name: 'Red Hawks Center Forward', position: 'ST', traits: 'Lethal inside 18-yard box, rapid first-touch shooting', dangerLevel: 'Elite' },
      { number: 4, name: 'Red Hawks Center Back', position: 'CB', traits: 'Athletic recovery pace, strong aerial stopper', dangerLevel: 'Dangerous' }
    ],
    tacticalBreakdown: {
      inPossession: 'Fluid positional rotations, fast one-touch passing, relentless box entries.',
      outOfPossession: 'Aggressive Gegenpressing swarm to win ball back immediately.',
      transitionFlaws: 'When counter-press is broken with a single diagonal ball, entire weak side is exposed.',
      setPieceTendencies: 'Complex corner routines with decoy runners and near-post headers.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Break their press with immediate diagonal switches from Christian Tharney (#13) to Bennett Cuchera (#7) or Blake Romanelli (#26). Tommy Kim (#28) play on the shoulder of their center-backs.',
      diamondKeyAssignment: 'Dylan McKenzie (#98) deliver masterclass in box command; Noah Eldessouky (#12) lead vocal backline coordination.',
      recommendedFormation: '4-4-2'
    }
  },
  'hun': {
    opponent: 'The Hun School Raiders',
    shortName: 'The Hun School',
    logoText: 'HUN',
    conference: 'MAPL',
    headCoach: 'Hun Staff',
    primaryFormation: '3-5-2',
    secondaryFormation: '5-3-2',
    winProbabilityPct: 52.0,
    threatLevel: 'High',
    scoutingOverview: 'MAPL rival with explosive attacking wingbacks, skilled center forward, and compact back 3.',
    veoClips: [
      { minute: '18:15', title: 'Wingbacks Pushed to Touchlines', phase: 'Build-up', description: 'Hun wingbacks push past halfway line, stretching field.' },
      { minute: '42:30', title: 'Massive Space Behind Wingbacks', phase: 'Vulnerability', description: 'Turnovers in central midfield allow immediate fast breaks into outer channels.' }
    ],
    keyPlaymakers: [
      { number: 10, name: 'Raiders Striker', position: 'ST', traits: 'Explosive acceleration, dangerous dribbler in transition', dangerLevel: 'Elite' },
      { number: 5, name: 'Raiders Center Back', position: 'CB', traits: 'Tall physical anchor, strong tackling', dangerLevel: 'Dangerous' }
    ],
    tacticalBreakdown: {
      inPossession: 'Wingbacks stay very high; 3 center-backs play wide.',
      outOfPossession: 'Collapses into back 5 when defending deep.',
      transitionFlaws: 'Enormous space behind wingbacks on quick turnovers.',
      setPieceTendencies: 'Tall center-backs attacking far post.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Isolate their outer center-backs 1v1 with our wide midfielders Cuchera and Romanelli. Avoid crossing into crowded box of 3 tall CBs; utilize cutbacks to 18-yard arc.',
      diamondKeyAssignment: 'Christian Tharney (#13) step to neutralize their #10 in transition.',
      recommendedFormation: '4-4-2'
    }
  },
  'blair': {
    opponent: 'Blair Academy Buccaneers',
    shortName: 'Blair Academy',
    logoText: 'BLR',
    conference: 'MAPL',
    headCoach: 'Blair Coaching Staff',
    primaryFormation: '4-4-2',
    secondaryFormation: '4-5-1',
    winProbabilityPct: 57.0,
    threatLevel: 'High',
    scoutingOverview: '123rd Peddie-Blair Day Rivalry Classic. Physical, direct, low-block counter-attacking squad built around a 6-foot-3 target striker and dangerous set pieces.',
    veoClips: [
      { minute: '11:20', title: 'Direct Goal Kick into Striker Chest', phase: 'Build-up', description: 'Buccaneers bypass midfield play completely via direct long balls from goalkeeper.' },
      { minute: '36:45', title: 'Half-Space Gaps in Transition', phase: 'Vulnerability', description: 'Veo film highlights wide midfielders failing to track back, leaving central defense isolated.' },
      { minute: '63:10', title: 'Long Throw-in Box Scramble', phase: 'Set Piece', description: 'Direct long throw into 6-yard box designed to create chaotic second-ball opportunities.' }
    ],
    keyPlaymakers: [
      { number: 9, name: 'Buccaneers Target Striker', position: 'ST', traits: '6-foot-3 physical presence, dominant in air, target for long balls', dangerLevel: 'Elite' },
      { number: 10, name: 'Buccaneers Central Midfielder', position: 'CM', traits: 'Primary set-piece taker, dangerous long throw-in specialist', dangerLevel: 'Dangerous' },
      { number: 11, name: 'Buccaneers Left Winger', position: 'LW', traits: 'Speed in transition, opportunistic runner', dangerLevel: 'Key Threat' }
    ],
    tacticalBreakdown: {
      inPossession: 'Direct long balls from GK into striker chest; bypasses midfield play completely.',
      outOfPossession: 'Low compact 4-4-2 block; rarely presses above halfway line.',
      transitionFlaws: 'Half-spaces behind wide midfielders are wide open when they push up on counter-attacks.',
      setPieceTendencies: 'Long throw-ins directly into penalty area; near-post flick-ons.'
    },
    peddieCounterDirectives: {
      coachNazarioDirective: 'Overload their right flank with Noah Eldessouky (#12) and Blake Romanelli (#26) to draw central defenders out. Deploy Gabriel Lam (#5) as second-ball sweeper against long goal kicks.',
      diamondKeyAssignment: 'Carson Wiley (#22) and Owen Bonchev (#8) double-team their #9 in the air. Tharney (#13) sweep up all knockdowns.',
      recommendedFormation: '4-4-2'
    }
  }
};

export const MAPL_SCOUTING_REPORTS: Record<string, ScoutingReport> = {};

Object.entries(OPPONENT_VEO_SCOUTING).forEach(([key, scout]) => {
  scout.scoutedPlayers = OPPONENT_PLAYER_SCOUTING_REPORTS[key] || [];
  const report: ScoutingReport = {
    opponent: scout.opponent,
    conference: scout.conference,
    headCoach: scout.headCoach,
    formation: (['4-3-3', '4-2-3-1', '3-5-2', '4-4-2'].includes(scout.primaryFormation) ? scout.primaryFormation : '4-4-2') as FormationId,
    keyPlaymakers: scout.keyPlaymakers.map(p => `#${p.number} ${p.name} (${p.traits})`),
    tendencies: {
      buildup: scout.tacticalBreakdown.inPossession,
      defensiveBlock: scout.tacticalBreakdown.outOfPossession,
      vulnerabilityZone: scout.tacticalBreakdown.transitionFlaws,
      setPieceThreat: scout.tacticalBreakdown.setPieceTendencies
    },
    recommendedTactics: [
      scout.peddieCounterDirectives.coachNazarioDirective,
      scout.peddieCounterDirectives.diamondKeyAssignment
    ],
    winProbabilityPct: scout.winProbabilityPct
  };
  MAPL_SCOUTING_REPORTS[key] = report;
  MAPL_SCOUTING_REPORTS[scout.opponent] = report;
  MAPL_SCOUTING_REPORTS[scout.shortName] = report;
  if (scout.opponent.includes('Blair') || scout.shortName.includes('Blair')) {
    MAPL_SCOUTING_REPORTS['Blair Academy'] = report;
  }
});

export const SIDELINE_SET_PIECE_PLAYBOOK = {
  designatedTakers: {
    penalties: {
      primary: '#13 Christian Tharney (Senior, Captain)',
      secondary: '#28 Tommy Kim (Senior, Captain)',
      notes: 'Christian Tharney is the designated penalty taker with lethal accuracy and composed placement.'
    },
    leftCorner: {
      primary: '#13 Christian Tharney (Senior, Captain)',
      secondary: '#8 Owen Bonchev (Sophomore)',
      notes: 'Christian Tharney takes all left corners, whipping dangerous inswingers into the 6-yard box.'
    },
    rightCorner: {
      primary: '#7 Bennett Cuchera (Freshman)',
      secondary: '#25 Harry Xiao (Junior)',
      notes: 'Bennett Cuchera is the designated right corner specialist delivering whipped outswingers onto the penalty spot.'
    },
    freeKicks: {
      primary: '#13 Christian Tharney (Senior, Captain)',
      secondary: '#28 Tommy Kim (Senior, Captain)',
      notes: 'Christian Tharney takes direct free kicks; Tommy Kim delivers technical curlers from 18-25 yards.'
    }
  },
  attackingCorners: [
    {
      name: 'Left Corner - Falcon Inswing (Tharney Delivery)',
      triggerSignal: 'Left Arm Raised',
      taker: '#13 Christian Tharney (C)',
      description: 'Christian Tharney whips an inswinging missile toward the near post. Quinn Wachtveitl (#10) fakes far post then dashes across near post to head home. Tommy Kim (#28) crashes 6-yard box for rebounds.',
      probabilityGoalPct: 30.5
    },
    {
      name: 'Right Corner - Cuchera Precision Outswinger',
      triggerSignal: 'Right Arm Raised',
      taker: '#7 Bennett Cuchera',
      description: 'Bennett Cuchera whips an outswinging ball across the penalty spot. Christian Tharney (#13) and Quinn Wachtveitl (#10) crash the back post, leveraging aerial dominance over opposing markers.',
      probabilityGoalPct: 28.5
    },
    {
      name: 'Gold Horizon (Direct Free Kick / Curler)',
      triggerSignal: 'Both Hands On Hips',
      taker: '#13 Christian Tharney (C) & #28 Tommy Kim (C)',
      description: 'Dual-threat direct free kick routine. Tharney strikes with blistering power through wall seams; Tommy Kim curls over the 4-man defensive wall into top corner.',
      probabilityGoalPct: 26.0
    },
    {
      name: 'Hightstown Switch (Short Corner Triad)',
      triggerSignal: 'Taps Shinguard',
      taker: '#13 Christian Tharney & #26 Blake Romanelli',
      description: 'Short pass to Romanelli (#26), who isolates fullback and lays back to Noah Eldessouky (#12) arriving at top of box for first-time curling effort.',
      probabilityGoalPct: 22.0
    }
  ],
  defensiveCorners: [
    {
      name: 'Hybrid Zonal Anchor',
      organization: '5 Zonal Protectors + 3 Man-Markers + 1 Short Corner Disruptor + 1 Outlet Sprinter',
      anchor: '#22 Carson Wiley & #8 Owen Bonchev at CB + #10 Quinn Wachtveitl (LM) commanding central 6-yard zone',
      nearPost: '#12 Noah Eldessouky (C) extinguishing near-post flick-ons',
      shield: '#13 Christian Tharney (C) controlling top of 18-yard box rebound area',
      outlet: '#28 Tommy Kim (C) & #20 Jeffery Zhang stationed at midfield stripe ready for transition sprint',
      shortDisruptor: '#7 Bennett Cuchera charging any short corner attempt within 5 yards'
    }
  ],
  pressingTriggers: [
    {
      cue: 'Back-pass to Opponent Goalkeeper',
      action: 'Twin Strikers Tommy Kim (#28) and Jeffery Zhang (#20) sprint at GK kicking foot and cut split pass angles; Quinn Wachtveitl (#10) and Bennett Cuchera (#7) tuck inside to eliminate lateral fullback outlet passes.'
    },
    {
      cue: 'Opponent Facing Own Goal under Pressure',
      action: 'Holding anchor Christian Tharney (#13) and CAM Rayyaan Mohiuddin (#14) step up 10 yards to intercept panic clearance.'
    },
    {
      cue: 'Bouncing Ball or Heavy Touch on Sideline',
      action: 'Starting Right Back Gabriel Lam (#5) with Bennett Cuchera (#7) or Left Back Noah Eldessouky (#12) with Quinn Wachtveitl (#10) double-teams; trap ball against touchline.'
    }
  ],
  lateGameLockout: [
    {
      timeWindow: "80' - 90'+",
      formationShift: 'Shift from 4-4-2 Diamond to Compact 5-4-1 Low Block (Bring on #2 Wyatt Raya / #6 Jeet Sinha / #18 Brody Rozo)',
      rules: [
        'Zero risky passes through central midfield; play into corner flags.',
        'Keep 6 players strictly behind the ball at all times.',
        'All free kicks and throw-ins taken with maximum legal delay.',
        'Goalkeeper Dylan McKenzie holds ball for full allowed count before drop kick.'
      ]
    }
  ]
};

// ============================================================================
// Advanced Tactical Analytics Datasets (Opta / Wyscout / Hudl Standards)
// ============================================================================

export const XG_TIMELINE_HAVERFORD: XgTimelinePoint[] = [
  { minute: 0, peddieXg: 0.00, opponentXg: 0.00 },
  { minute: 13, peddieXg: 0.12, opponentXg: 0.58, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Haverford Goal: Fast transition strike into top left corner (Period 1)' },
  { minute: 20, peddieXg: 0.28, opponentXg: 0.74, eventDescription: 'End of Period 1: Peddie trial of 4-4-2 diamond pressing triggers' },
  { minute: 29, peddieXg: 0.35, opponentXg: 1.12, eventDescription: 'Dylan McKenzie (#98) reflex diving save' },
  { minute: 41, peddieXg: 0.52, opponentXg: 1.84, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Haverford Goal: Half-space cutback before Period 2 whistle' },
  { minute: 48, peddieXg: 0.64, opponentXg: 2.15, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Haverford Goal: Counter-attack strike (Period 3)' },
  { minute: 59, peddieXg: 0.82, opponentXg: 2.48, eventDescription: 'Tommy Kim (#28) 22-yard rocket tested Haverford keeper' },
  { minute: 66, peddieXg: 0.90, opponentXg: 2.65, eventDescription: 'Dylan McKenzie (#98) point-blank 1v1 denial' },
  { minute: 71, peddieXg: 0.98, opponentXg: 2.95, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Haverford Goal: 18-yard curler (Period 4)' },
  { minute: 77, peddieXg: 1.05, opponentXg: 3.48, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Haverford Goal: Rebound follow-up off initial save' },
  { minute: 80, peddieXg: 1.15, opponentXg: 3.48, eventDescription: 'Final Whistle: 4x20 min preseason test against nationally ranked Haverford' }
];

export const XG_TIMELINE_AQUINAS: XgTimelinePoint[] = [
  { minute: 0, peddieXg: 0.00, opponentXg: 0.00 },
  { minute: 12, peddieXg: 0.24, opponentXg: 0.08, eventDescription: 'Jeffery Zhang (#20) low drive saved by Aquinas GK Gallagher' },
  { minute: 24, peddieXg: 0.62, opponentXg: 0.22, eventDescription: 'Tommy Kim (#28) thunderous strike rattles right post' },
  { minute: 34, peddieXg: 1.26, opponentXg: 0.35, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Tommy Kim (#28) finishes low into corner from Mohiuddin pass (1-0)' },
  { minute: 44, peddieXg: 1.34, opponentXg: 0.77, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Aquinas Goal: Mateo Rossi equalizes off scramble before halftime (1-1)' },
  { minute: 52, peddieXg: 1.58, opponentXg: 0.85, eventDescription: 'Rayyaan Mohiuddin (#14) 20-yard effort deflected just wide' },
  { minute: 58, peddieXg: 2.16, opponentXg: 0.95, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Christian Tharney (#13) bullets towering header from Cuchera corner (2-1)' },
  { minute: 65, peddieXg: 2.22, opponentXg: 1.20, eventDescription: 'Dylan McKenzie (#98) fingertip reflex save over the crossbar' },
  { minute: 70, peddieXg: 2.26, opponentXg: 1.65, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Aquinas Goal: Julian Vance curls 18-yard equalizer (2-2)' },
  { minute: 76, peddieXg: 2.45, opponentXg: 1.65, eventDescription: 'Bennett Cuchera (#7) direct free kick punched away' },
  { minute: 81, peddieXg: 2.84, opponentXg: 1.65, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GAME WINNER! Carson Fleming (#15) sprints onto Eldessouky diagonal through-ball (3-2)' },
  { minute: 90, peddieXg: 2.84, opponentXg: 1.65, eventDescription: 'Final Whistle: Peddie claims dramatic 3-2 Home Opener triumph!' }
];

export const DETAILED_SHOTS_LOG_HAVERFORD: ShotDetail[] = [
  {
    id: 'shot-h-1',
    minute: 13,
    second: 20,
    team: 'Opponent',
    playerNumber: 9,
    playerName: 'Haverford Attack',
    xMeters: 92,
    yMeters: 26,
    xg: 0.58,
    psxg: 0.88,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Goal',
    distanceYards: 14,
    angleDegrees: 55
  },
  {
    id: 'shot-h-2',
    minute: 22,
    second: 45,
    team: 'Peddie',
    playerNumber: 14,
    playerName: 'Rayyaan Mohiuddin',
    xMeters: 82,
    yMeters: 35,
    xg: 0.14,
    psxg: 0.22,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Blocked',
    distanceYards: 24,
    angleDegrees: 34
  },
  {
    id: 'shot-h-3',
    minute: 29,
    second: 15,
    team: 'Opponent',
    playerNumber: 10,
    playerName: 'Haverford Striker',
    xMeters: 88,
    yMeters: 30,
    xg: 0.38,
    psxg: 0.72,
    shotType: 'Open Play',
    bodyPart: 'Left Foot',
    outcome: 'Saved',
    distanceYards: 18,
    angleDegrees: 48
  },
  {
    id: 'shot-h-4',
    minute: 38,
    second: 10,
    team: 'Peddie',
    playerNumber: 20,
    playerName: 'Jeffery Zhang',
    xMeters: 91,
    yMeters: 32,
    xg: 0.19,
    psxg: 0.35,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Blocked',
    distanceYards: 16,
    angleDegrees: 45
  },
  {
    id: 'shot-h-5',
    minute: 41,
    second: 55,
    team: 'Opponent',
    playerNumber: 11,
    playerName: 'Haverford Winger',
    xMeters: 95,
    yMeters: 38,
    xg: 0.72,
    psxg: 0.91,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Goal',
    distanceYards: 10,
    angleDegrees: 62
  },
  {
    id: 'shot-h-6',
    minute: 48,
    second: 12,
    team: 'Opponent',
    playerNumber: 9,
    playerName: 'Haverford Forward',
    xMeters: 90,
    yMeters: 30,
    xg: 0.31,
    psxg: 0.65,
    shotType: 'Open Play',
    bodyPart: 'Left Foot',
    outcome: 'Goal',
    distanceYards: 17,
    angleDegrees: 40
  },
  {
    id: 'shot-h-7',
    minute: 59,
    second: 30,
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim',
    xMeters: 84,
    yMeters: 36,
    xg: 0.22,
    psxg: 0.54,
    shotType: 'Direct Free Kick',
    bodyPart: 'Right Foot',
    outcome: 'Saved',
    distanceYards: 22,
    angleDegrees: 32
  },
  {
    id: 'shot-h-8',
    minute: 64,
    second: 18,
    team: 'Peddie',
    playerNumber: 7,
    playerName: 'Bennett Cuchera',
    xMeters: 86,
    yMeters: 48,
    xg: 0.11,
    shotType: 'Open Play',
    bodyPart: 'Left Foot',
    outcome: 'Off Target',
    distanceYards: 23,
    angleDegrees: 29
  },
  {
    id: 'shot-h-9',
    minute: 66,
    second: 40,
    team: 'Opponent',
    playerNumber: 8,
    playerName: 'Haverford Forward',
    xMeters: 94,
    yMeters: 33,
    xg: 0.52,
    psxg: 0.85,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Saved',
    distanceYards: 11,
    angleDegrees: 58
  },
  {
    id: 'shot-h-10',
    minute: 71,
    second: 25,
    team: 'Opponent',
    playerNumber: 7,
    playerName: 'Haverford Midfield',
    xMeters: 87,
    yMeters: 34,
    xg: 0.30,
    psxg: 0.68,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Goal',
    distanceYards: 19,
    angleDegrees: 42
  },
  {
    id: 'shot-h-11',
    minute: 73,
    second: 50,
    team: 'Peddie',
    playerNumber: 26,
    playerName: 'Blake Romanelli',
    xMeters: 93,
    yMeters: 22,
    xg: 0.16,
    psxg: 0.38,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Saved',
    distanceYards: 15,
    angleDegrees: 46
  },
  {
    id: 'shot-h-12',
    minute: 77,
    second: 48,
    team: 'Opponent',
    playerNumber: 9,
    playerName: 'Haverford Fords',
    xMeters: 94,
    yMeters: 34,
    xg: 0.58,
    psxg: 0.86,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Goal',
    distanceYards: 12,
    angleDegrees: 56
  }
];

export const DETAILED_SHOTS_LOG_AQUINAS: ShotDetail[] = [
  {
    id: 'shot-a-1',
    minute: 12,
    second: 40,
    team: 'Peddie',
    playerNumber: 20,
    playerName: 'Jeffery Zhang',
    xMeters: 89,
    yMeters: 33,
    xg: 0.24,
    psxg: 0.42,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Saved',
    distanceYards: 16,
    angleDegrees: 48
  },
  {
    id: 'shot-a-2',
    minute: 24,
    second: 15,
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim',
    xMeters: 84,
    yMeters: 38,
    xg: 0.38,
    psxg: 0.65,
    shotType: 'Open Play',
    bodyPart: 'Left Foot',
    outcome: 'Woodwork',
    distanceYards: 21,
    angleDegrees: 36
  },
  {
    id: 'shot-a-3',
    minute: 34,
    second: 22,
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim',
    xMeters: 92,
    yMeters: 36,
    xg: 0.64,
    psxg: 0.92,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Goal',
    distanceYards: 14,
    angleDegrees: 52
  },
  {
    id: 'shot-a-4',
    minute: 44,
    second: 10,
    team: 'Opponent',
    playerNumber: 9,
    playerName: 'Mateo Rossi',
    xMeters: 94,
    yMeters: 34,
    xg: 0.42,
    psxg: 0.74,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Goal',
    distanceYards: 11,
    angleDegrees: 58
  },
  {
    id: 'shot-a-5',
    minute: 52,
    second: 30,
    team: 'Peddie',
    playerNumber: 14,
    playerName: 'Rayyaan Mohiuddin',
    xMeters: 83,
    yMeters: 34,
    xg: 0.18,
    psxg: 0.25,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Blocked',
    distanceYards: 22,
    angleDegrees: 35
  },
  {
    id: 'shot-a-6',
    minute: 58,
    second: 15,
    team: 'Peddie',
    playerNumber: 13,
    playerName: 'Christian Tharney',
    xMeters: 96,
    yMeters: 34,
    xg: 0.58,
    psxg: 0.88,
    shotType: 'Corner Header',
    bodyPart: 'Header',
    outcome: 'Goal',
    distanceYards: 8,
    angleDegrees: 70
  },
  {
    id: 'shot-a-7',
    minute: 65,
    second: 5,
    team: 'Opponent',
    playerNumber: 10,
    playerName: 'Julian Vance',
    xMeters: 86,
    yMeters: 30,
    xg: 0.25,
    psxg: 0.72,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Saved',
    distanceYards: 20,
    angleDegrees: 40
  },
  {
    id: 'shot-a-8',
    minute: 70,
    second: 42,
    team: 'Opponent',
    playerNumber: 10,
    playerName: 'Julian Vance',
    xMeters: 87,
    yMeters: 36,
    xg: 0.45,
    psxg: 0.82,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Goal',
    distanceYards: 18,
    angleDegrees: 45
  },
  {
    id: 'shot-a-9',
    minute: 76,
    second: 20,
    team: 'Peddie',
    playerNumber: 7,
    playerName: 'Bennett Cuchera',
    xMeters: 85,
    yMeters: 44,
    xg: 0.19,
    psxg: 0.55,
    shotType: 'Direct Free Kick',
    bodyPart: 'Right Foot',
    outcome: 'Saved',
    distanceYards: 24,
    angleDegrees: 32
  },
  {
    id: 'shot-a-10',
    minute: 81,
    second: 30,
    team: 'Peddie',
    playerNumber: 15,
    playerName: 'Carson Fleming',
    xMeters: 95,
    yMeters: 32,
    xg: 0.72,
    psxg: 0.95,
    shotType: 'Open Play',
    bodyPart: 'Right Foot',
    outcome: 'Goal',
    distanceYards: 10,
    angleDegrees: 62
  }
];

export const PASSING_NETWORK_DIAMOND: PassingLink[] = [
  { fromNumber: 8, fromName: 'Bonchev (CB)', toNumber: 22, toName: 'Wiley (CB)', completedPasses: 24, attemptedPasses: 26, progressiveYards: 48, keyPasses: 0 },
  { fromNumber: 8, fromName: 'Bonchev (CB)', toNumber: 12, toName: 'Eldessouky (LB)', completedPasses: 18, attemptedPasses: 19, progressiveYards: 180, keyPasses: 1 },
  { fromNumber: 8, fromName: 'Bonchev (CB)', toNumber: 13, toName: 'Tharney (CDM)', completedPasses: 22, attemptedPasses: 24, progressiveYards: 240, keyPasses: 2 },
  { fromNumber: 22, fromName: 'Wiley (CB)', toNumber: 5, toName: 'Lam (RB)', completedPasses: 19, attemptedPasses: 21, progressiveYards: 165, keyPasses: 1 },
  { fromNumber: 22, fromName: 'Wiley (CB)', toNumber: 13, toName: 'Tharney (CDM)', completedPasses: 20, attemptedPasses: 22, progressiveYards: 210, keyPasses: 1 },
  { fromNumber: 13, fromName: 'Tharney (CDM)', toNumber: 10, toName: 'Wachtveitl (LM)', completedPasses: 16, attemptedPasses: 18, progressiveYards: 195, keyPasses: 2 },
  { fromNumber: 13, fromName: 'Tharney (CDM)', toNumber: 7, toName: 'Cuchera (RM)', completedPasses: 15, attemptedPasses: 17, progressiveYards: 185, keyPasses: 1 },
  { fromNumber: 13, fromName: 'Tharney (CDM)', toNumber: 14, toName: 'Mohiuddin (CAM)', completedPasses: 21, attemptedPasses: 23, progressiveYards: 260, keyPasses: 3 },
  { fromNumber: 12, fromName: 'Eldessouky (LB)', toNumber: 10, toName: 'Wachtveitl (LM)', completedPasses: 17, attemptedPasses: 19, progressiveYards: 220, keyPasses: 2 },
  { fromNumber: 5, fromName: 'Lam (RB)', toNumber: 7, toName: 'Cuchera (RM)', completedPasses: 16, attemptedPasses: 18, progressiveYards: 210, keyPasses: 1 },
  { fromNumber: 10, fromName: 'Wachtveitl (LM)', toNumber: 14, toName: 'Mohiuddin (CAM)', completedPasses: 14, attemptedPasses: 15, progressiveYards: 130, keyPasses: 2 },
  { fromNumber: 7, fromName: 'Cuchera (RM)', toNumber: 14, toName: 'Mohiuddin (CAM)', completedPasses: 12, attemptedPasses: 14, progressiveYards: 110, keyPasses: 1 },
  { fromNumber: 14, fromName: 'Mohiuddin (CAM)', toNumber: 28, toName: 'Kim (ST)', completedPasses: 18, attemptedPasses: 21, progressiveYards: 285, keyPasses: 4 },
  { fromNumber: 14, fromName: 'Mohiuddin (CAM)', toNumber: 20, toName: 'Zhang (ST)', completedPasses: 15, attemptedPasses: 17, progressiveYards: 210, keyPasses: 3 },
  { fromNumber: 28, fromName: 'Kim (ST)', toNumber: 20, toName: 'Zhang (ST)', completedPasses: 11, attemptedPasses: 13, progressiveYards: 95, keyPasses: 2 },
  { fromNumber: 20, fromName: 'Zhang (ST)', toNumber: 28, toName: 'Kim (ST)', completedPasses: 12, attemptedPasses: 14, progressiveYards: 110, keyPasses: 2 }
];

export const SQUAD_PHYSICAL_TELEMETRY: PhysicalTelemetry[] = [
  { playerId: 'p-kim-t', playerNumber: 28, playerName: 'Tommy Kim', position: 'ST', totalDistanceMiles: 7.1, totalDistanceKm: 11.4, highIntensityMiles: 1.7, highIntensityKm: 2.8, sprintsCount: 34, topSpeedMph: 21.3, topSpeedKmh: 34.3, aerobicWorkRatePct: 94 },
  { playerId: 'p-tharney', playerNumber: 13, playerName: 'Christian Tharney', position: 'CDM', totalDistanceMiles: 7.3, totalDistanceKm: 11.8, highIntensityMiles: 1.5, highIntensityKm: 2.4, sprintsCount: 26, topSpeedMph: 20.4, topSpeedKmh: 32.8, aerobicWorkRatePct: 96 },
  { playerId: 'p-eldessouky', playerNumber: 12, playerName: 'Noah Eldessouky', position: 'LB', totalDistanceMiles: 7.5, totalDistanceKm: 12.1, highIntensityMiles: 2.0, highIntensityKm: 3.2, sprintsCount: 38, topSpeedMph: 21.1, topSpeedKmh: 34.0, aerobicWorkRatePct: 97 },
  { playerId: 'p-mohiuddin', playerNumber: 14, playerName: 'Rayyaan Mohiuddin', position: 'CAM', totalDistanceMiles: 6.8, totalDistanceKm: 10.9, highIntensityMiles: 1.6, highIntensityKm: 2.6, sprintsCount: 30, topSpeedMph: 20.1, topSpeedKmh: 32.3, aerobicWorkRatePct: 92 },
  { playerId: 'p-wachtveitl', playerNumber: 10, playerName: 'Quinn Wachtveitl', position: 'LM', totalDistanceMiles: 7.2, totalDistanceKm: 11.6, highIntensityMiles: 1.6, highIntensityKm: 2.5, sprintsCount: 28, topSpeedMph: 20.8, topSpeedKmh: 33.5, aerobicWorkRatePct: 95 },
  { playerId: 'p-lam-5', playerNumber: 5, playerName: 'Gabriel Lam', position: 'RB', totalDistanceMiles: 7.4, totalDistanceKm: 11.9, highIntensityMiles: 1.9, highIntensityKm: 3.1, sprintsCount: 36, topSpeedMph: 20.8, topSpeedKmh: 33.5, aerobicWorkRatePct: 96 },
  { playerId: 'p-bonchev', playerNumber: 8, playerName: 'Owen Bonchev', position: 'CB', totalDistanceMiles: 6.3, totalDistanceKm: 10.2, highIntensityMiles: 1.1, highIntensityKm: 1.8, sprintsCount: 18, topSpeedMph: 20.3, topSpeedKmh: 32.7, aerobicWorkRatePct: 88 },
  { playerId: 'p-wiley-22', playerNumber: 22, playerName: 'Carson Wiley', position: 'CB', totalDistanceMiles: 6.5, totalDistanceKm: 10.4, highIntensityMiles: 1.1, highIntensityKm: 1.7, sprintsCount: 16, topSpeedMph: 20.3, topSpeedKmh: 32.7, aerobicWorkRatePct: 89 },
  { playerId: 'p-cuchera', playerNumber: 7, playerName: 'Bennett Cuchera', position: 'RM', totalDistanceMiles: 7.0, totalDistanceKm: 11.2, highIntensityMiles: 1.8, highIntensityKm: 2.9, sprintsCount: 32, topSpeedMph: 20.8, topSpeedKmh: 33.5, aerobicWorkRatePct: 93 },
  { playerId: 'p-zhang-20', playerNumber: 20, playerName: 'Jeffery Zhang', position: 'ST', totalDistanceMiles: 6.6, totalDistanceKm: 10.6, highIntensityMiles: 1.4, highIntensityKm: 2.2, sprintsCount: 24, topSpeedMph: 20.0, topSpeedKmh: 32.2, aerobicWorkRatePct: 91 },
  { playerId: 'p-mckenzie', playerNumber: 98, playerName: 'Dylan McKenzie', position: 'GK', totalDistanceMiles: 3.5, totalDistanceKm: 5.6, highIntensityMiles: 0.4, highIntensityKm: 0.6, sprintsCount: 6, topSpeedMph: 17.5, topSpeedKmh: 28.2, aerobicWorkRatePct: 86 },
  { playerId: 'p-raya-2', playerNumber: 2, playerName: 'Wyatt Raya', position: 'CM', totalDistanceMiles: 5.5, totalDistanceKm: 8.8, highIntensityMiles: 1.2, highIntensityKm: 1.9, sprintsCount: 22, topSpeedMph: 20.6, topSpeedKmh: 33.2, aerobicWorkRatePct: 89 },
  { playerId: 'p-sinha-6', playerNumber: 6, playerName: 'Jeet Sinha', position: 'LM', totalDistanceMiles: 5.8, totalDistanceKm: 9.4, highIntensityMiles: 1.4, highIntensityKm: 2.2, sprintsCount: 25, topSpeedMph: 20.4, topSpeedKmh: 32.8, aerobicWorkRatePct: 93 },
  { playerId: 'p-horsch-15', playerNumber: 15, playerName: 'Zach Horsch', position: 'CM', totalDistanceMiles: 4.8, totalDistanceKm: 7.8, highIntensityMiles: 1.1, highIntensityKm: 1.7, sprintsCount: 19, topSpeedMph: 20.4, topSpeedKmh: 32.8, aerobicWorkRatePct: 87 },
  { playerId: 'p-sheinin', playerNumber: 16, playerName: 'Massimo Sheinin', position: 'CM', totalDistanceMiles: 5.7, totalDistanceKm: 9.2, highIntensityMiles: 1.1, highIntensityKm: 1.8, sprintsCount: 20, topSpeedMph: 20.4, topSpeedKmh: 32.8, aerobicWorkRatePct: 90 },
  { playerId: 'p-mango-17', playerNumber: 17, playerName: 'Mango', position: 'RB', totalDistanceMiles: 5.1, totalDistanceKm: 8.2, highIntensityMiles: 1.1, highIntensityKm: 1.8, sprintsCount: 21, topSpeedMph: 20.4, topSpeedKmh: 32.8, aerobicWorkRatePct: 88 },
  { playerId: 'p-rozo-18', playerNumber: 18, playerName: 'Brody Rozo', position: 'CM', totalDistanceMiles: 5.7, totalDistanceKm: 9.1, highIntensityMiles: 1.4, highIntensityKm: 2.3, sprintsCount: 27, topSpeedMph: 21.4, topSpeedKmh: 34.4, aerobicWorkRatePct: 92 },
  { playerId: 'p-gimbel-19', playerNumber: 19, playerName: 'Emerson Gimbel', position: 'LW', totalDistanceMiles: 5.3, totalDistanceKm: 8.5, highIntensityMiles: 1.6, highIntensityKm: 2.5, sprintsCount: 29, topSpeedMph: 20.8, topSpeedKmh: 33.5, aerobicWorkRatePct: 90 },
  { playerId: 'p-xiao-25', playerNumber: 25, playerName: 'Harry Xiao', position: 'RW', totalDistanceMiles: 5.4, totalDistanceKm: 8.7, highIntensityMiles: 1.6, highIntensityKm: 2.6, sprintsCount: 31, topSpeedMph: 21.3, topSpeedKmh: 34.3, aerobicWorkRatePct: 91 },
  { playerId: 'p-romanelli-26', playerNumber: 26, playerName: 'Blake Romanelli', position: 'RB', totalDistanceMiles: 6.0, totalDistanceKm: 9.6, highIntensityMiles: 1.9, highIntensityKm: 3.0, sprintsCount: 35, topSpeedMph: 21.8, topSpeedKmh: 35.1, aerobicWorkRatePct: 95 }
];

export const GOALKEEPER_ADVANCED_METRICS: GoalkeeperAdvancedMetrics[] = [
  {
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    isStarter: true,
    minutesPlayed: 160,
    shotsFaced: 18,
    saves: 11,
    goalsConceded: 7,
    cleanSheets: 0,
    expectedGoalsFaced: 8.4,
    goalsPrevented: 1.4,
    savePct: 61.1,
    crossesClaimedPct: 92.5,
    penaltySavePct: 0.0,
    avgDistributionLengthMeters: 46.5
  },
  {
    playerNumber: 20,
    playerName: 'Jeffery Zhang',
    isStarter: false,
    minutesPlayed: 0,
    shotsFaced: 0,
    saves: 0,
    goalsConceded: 0,
    cleanSheets: 0,
    expectedGoalsFaced: 0.0,
    goalsPrevented: 0.0,
    savePct: 100.0,
    crossesClaimedPct: 0.0,
    penaltySavePct: 0.0,
    avgDistributionLengthMeters: 0.0
  }
];

// ============================================================================
// 2026 Season Extended Match Analytics (Trenton, George School, PDS & Season)
// ============================================================================

export const XG_TIMELINE_TRENTON: XgTimelinePoint[] = [
  { minute: 0, peddieXg: 0.00, opponentXg: 0.00 },
  { minute: 15, peddieXg: 0.32, opponentXg: 0.28, eventDescription: 'Quinn Wachtveitl (#10) curling effort tipped wide' },
  { minute: 28, peddieXg: 0.45, opponentXg: 0.82, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Trenton Central Goal: Fast counter break on right flank (0-1)' },
  { minute: 39, peddieXg: 1.15, opponentXg: 0.95, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Tommy Kim (#28) equalizer off Mohiuddin through-ball (1-1)' },
  { minute: 54, peddieXg: 1.35, opponentXg: 1.55, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Trenton Central Goal: Rebound converted in box (1-2)' },
  { minute: 68, peddieXg: 1.95, opponentXg: 1.65, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Jeffery Zhang (#20) clinical finish into bottom corner (2-2)' },
  { minute: 78, peddieXg: 2.05, opponentXg: 2.45, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'Trenton Central Goal: Direct free kick deflected past wall (2-3)' },
  { minute: 90, peddieXg: 2.12, opponentXg: 2.45, eventDescription: 'Final Whistle: Hard-fought 2-3 battle in Mercer County derby' }
];

export const DETAILED_SHOTS_LOG_TRENTON: ShotDetail[] = [
  { id: 'shot-tc-1', minute: 15, second: 10, team: 'Peddie', playerNumber: 10, playerName: 'Quinn Wachtveitl', xMeters: 85, yMeters: 22, xg: 0.18, psxg: 0.35, shotType: 'Open Play', bodyPart: 'Left Foot', outcome: 'Saved', distanceYards: 22, angleDegrees: 34 },
  { id: 'shot-tc-2', minute: 28, second: 45, team: 'Opponent', playerNumber: 9, playerName: 'Trenton Striker', xMeters: 92, yMeters: 38, xg: 0.44, psxg: 0.78, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 14, angleDegrees: 52 },
  { id: 'shot-tc-3', minute: 39, second: 12, team: 'Peddie', playerNumber: 28, playerName: 'Tommy Kim', xMeters: 93, yMeters: 34, xg: 0.62, psxg: 0.89, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 12, angleDegrees: 58 },
  { id: 'shot-tc-4', minute: 54, second: 30, team: 'Opponent', playerNumber: 11, playerName: 'Trenton Winger', xMeters: 96, yMeters: 30, xg: 0.58, psxg: 0.85, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 8, angleDegrees: 65 },
  { id: 'shot-tc-5', minute: 68, second: 15, team: 'Peddie', playerNumber: 20, playerName: 'Jeffery Zhang', xMeters: 90, yMeters: 36, xg: 0.48, psxg: 0.82, shotType: 'Open Play', bodyPart: 'Left Foot', outcome: 'Goal', distanceYards: 15, angleDegrees: 48 },
  { id: 'shot-tc-6', minute: 78, second: 50, team: 'Opponent', playerNumber: 8, playerName: 'Trenton Midfield', xMeters: 84, yMeters: 34, xg: 0.22, psxg: 0.75, shotType: 'Direct Free Kick', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 23, angleDegrees: 38 }
];

export const XG_TIMELINE_GEORGE: XgTimelinePoint[] = [
  { minute: 0, peddieXg: 0.00, opponentXg: 0.00 },
  { minute: 11, peddieXg: 0.55, opponentXg: 0.15, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Tommy Kim (#28) opens scoring with 16-yard laser (1-0)' },
  { minute: 23, peddieXg: 1.25, opponentXg: 0.25, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Rayyaan Mohiuddin (#14) strikes from top of box (2-0)' },
  { minute: 35, peddieXg: 1.45, opponentXg: 0.65, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'George School Goal: Header from wide cross (2-1)' },
  { minute: 49, peddieXg: 2.15, opponentXg: 0.75, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Christian Tharney (#13) header off Cuchera corner (3-1)' },
  { minute: 63, peddieXg: 2.85, opponentXg: 0.95, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Tommy Kim (#28) brace with curling far-post finish (4-1)' },
  { minute: 74, peddieXg: 2.95, opponentXg: 1.42, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'George School Goal: Penalty kick converted (4-2)' },
  { minute: 83, peddieXg: 3.65, opponentXg: 1.42, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Blake Romanelli (#26) breaks down right channel and slots home (5-2)' },
  { minute: 90, peddieXg: 3.65, opponentXg: 1.42, eventDescription: 'Final Whistle: Emphatic 5-2 road showcase victory over George School!' }
];

export const DETAILED_SHOTS_LOG_GEORGE: ShotDetail[] = [
  { id: 'shot-gs-1', minute: 11, second: 20, team: 'Peddie', playerNumber: 28, playerName: 'Tommy Kim', xMeters: 91, yMeters: 32, xg: 0.52, psxg: 0.88, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 15, angleDegrees: 52 },
  { id: 'shot-gs-2', minute: 23, second: 40, team: 'Peddie', playerNumber: 14, playerName: 'Rayyaan Mohiuddin', xMeters: 87, yMeters: 35, xg: 0.35, psxg: 0.78, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 19, angleDegrees: 44 },
  { id: 'shot-gs-3', minute: 35, second: 15, team: 'Opponent', playerNumber: 9, playerName: 'George School FWD', xMeters: 96, yMeters: 36, xg: 0.42, psxg: 0.80, shotType: 'Corner Header', bodyPart: 'Header', outcome: 'Goal', distanceYards: 8, angleDegrees: 60 },
  { id: 'shot-gs-4', minute: 49, second: 55, team: 'Peddie', playerNumber: 13, playerName: 'Christian Tharney', xMeters: 97, yMeters: 33, xg: 0.58, psxg: 0.92, shotType: 'Corner Header', bodyPart: 'Header', outcome: 'Goal', distanceYards: 7, angleDegrees: 68 },
  { id: 'shot-gs-5', minute: 63, second: 25, team: 'Peddie', playerNumber: 28, playerName: 'Tommy Kim', xMeters: 90, yMeters: 24, xg: 0.44, psxg: 0.85, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 17, angleDegrees: 46 },
  { id: 'shot-gs-6', minute: 74, second: 10, team: 'Opponent', playerNumber: 10, playerName: 'George School CAM', xMeters: 94, yMeters: 34, xg: 0.79, psxg: 0.95, shotType: 'Penalty', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 12, angleDegrees: 75 },
  { id: 'shot-gs-7', minute: 83, second: 45, team: 'Peddie', playerNumber: 26, playerName: 'Blake Romanelli', xMeters: 93, yMeters: 46, xg: 0.48, psxg: 0.84, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 14, angleDegrees: 48 }
];

export const XG_TIMELINE_PDS: XgTimelinePoint[] = [
  { minute: 0, peddieXg: 0.00, opponentXg: 0.00 },
  { minute: 8, peddieXg: 0.65, opponentXg: 0.05, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Tommy Kim (#28) early lightning strike (1-0)' },
  { minute: 18, peddieXg: 1.35, opponentXg: 0.15, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Jeffery Zhang (#20) header off Eldessouky cross (2-0)' },
  { minute: 29, peddieXg: 2.10, opponentXg: 0.22, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Bennett Cuchera (#7) curls from right wing (3-0)' },
  { minute: 42, peddieXg: 2.75, opponentXg: 0.55, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Tommy Kim (#28) slots penalty before halftime (4-0)' },
  { minute: 53, peddieXg: 2.85, opponentXg: 0.88, isGoal: true, scoringTeam: 'Opponent', eventDescription: 'PDS Goal: Transition breakaway goal (4-1)' },
  { minute: 61, peddieXg: 3.55, opponentXg: 0.90, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Tommy Kim (#28) completes Hat Trick! (5-1)' },
  { minute: 73, peddieXg: 4.10, opponentXg: 0.94, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Jeffery Zhang (#20) second goal of the match (6-1)' },
  { minute: 84, peddieXg: 4.48, opponentXg: 0.94, isGoal: true, scoringTeam: 'Peddie', eventDescription: 'PEDDIE GOAL! Carson Fleming (#15) seals emphatic derby rout (7-1)' },
  { minute: 90, peddieXg: 4.48, opponentXg: 0.94, eventDescription: 'Final Whistle: Peddie claims magnificent 7-1 Mercer County Derby victory!' }
];

export const DETAILED_SHOTS_LOG_PDS: ShotDetail[] = [
  { id: 'shot-pds-1', minute: 8, second: 30, team: 'Peddie', playerNumber: 28, playerName: 'Tommy Kim', xMeters: 92, yMeters: 33, xg: 0.55, psxg: 0.91, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 14, angleDegrees: 56 },
  { id: 'shot-pds-2', minute: 18, second: 12, team: 'Peddie', playerNumber: 20, playerName: 'Jeffery Zhang', xMeters: 97, yMeters: 35, xg: 0.62, psxg: 0.93, shotType: 'Open Play', bodyPart: 'Header', outcome: 'Goal', distanceYards: 8, angleDegrees: 64 },
  { id: 'shot-pds-3', minute: 29, second: 45, team: 'Peddie', playerNumber: 7, playerName: 'Bennett Cuchera', xMeters: 89, yMeters: 46, xg: 0.32, psxg: 0.74, shotType: 'Open Play', bodyPart: 'Left Foot', outcome: 'Goal', distanceYards: 18, angleDegrees: 42 },
  { id: 'shot-pds-4', minute: 42, second: 10, team: 'Peddie', playerNumber: 28, playerName: 'Tommy Kim', xMeters: 94, yMeters: 34, xg: 0.79, psxg: 0.96, shotType: 'Penalty', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 12, angleDegrees: 75 },
  { id: 'shot-pds-5', minute: 53, second: 35, team: 'Opponent', playerNumber: 9, playerName: 'PDS Forward', xMeters: 91, yMeters: 30, xg: 0.42, psxg: 0.79, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 15, angleDegrees: 50 },
  { id: 'shot-pds-6', minute: 61, second: 20, team: 'Peddie', playerNumber: 28, playerName: 'Tommy Kim', xMeters: 93, yMeters: 36, xg: 0.60, psxg: 0.94, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 13, angleDegrees: 58 },
  { id: 'shot-pds-7', minute: 73, second: 50, team: 'Peddie', playerNumber: 20, playerName: 'Jeffery Zhang', xMeters: 95, yMeters: 32, xg: 0.55, psxg: 0.88, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 10, angleDegrees: 62 },
  { id: 'shot-pds-8', minute: 84, second: 15, team: 'Peddie', playerNumber: 15, playerName: 'Carson Fleming', xMeters: 94, yMeters: 38, xg: 0.48, psxg: 0.85, shotType: 'Open Play', bodyPart: 'Right Foot', outcome: 'Goal', distanceYards: 12, angleDegrees: 54 }
];

export const XG_TIMELINE_SEASON_AGGREGATE: XgTimelinePoint[] = [
  { minute: 0, peddieXg: 0.00, opponentXg: 0.00 },
  { minute: 15, peddieXg: 2.15, opponentXg: 1.25, eventDescription: 'Opening 15 Mins: Peddie high-press establishes early territorial dominance' },
  { minute: 30, peddieXg: 4.85, opponentXg: 2.95, eventDescription: '16-30 Mins: Central diamond combinations yield frequent half-space entries' },
  { minute: 45, peddieXg: 7.95, opponentXg: 4.85, eventDescription: 'Halftime: Strong first-half goal conversion across 5 fixtures' },
  { minute: 60, peddieXg: 10.85, opponentXg: 7.45, eventDescription: '46-60 Mins: Second-half restart acceleration and set-piece headers' },
  { minute: 75, peddieXg: 13.45, opponentXg: 9.85, eventDescription: '61-75 Mins: Transition counter-attacks led by Tommy Kim (#28) & wingers' },
  { minute: 90, peddieXg: 15.84, opponentXg: 13.13, eventDescription: 'Full Season: 5 Matches, 17 Goals Scored, 15.84 xG Created' }
];

// ============================================================================
// Expected Threat (xT) Spatial Pitch Matrix (12 Columns x 8 Rows = 96 Pitch Cells)
// ============================================================================

export const XT_GRID_PITCH_MODEL: XTGridModel = {
  peddieTotalXT: 8.24,
  opponentTotalXT: 5.92,
  topDangerZone: 'Zone 14 (Central Edge of 18-Yard Box)',
  halfSpaceAdvantagePct: 24.5,
  zones: [
    // Flanks, Half-Spaces, and Central Channels across final third
    { zoneId: 'z-9-2', zoneName: 'Left Half-Space (Final 3rd)', col: 9, row: 2, xMeters: 80, yMeters: 20, threatValue: 0.145, peddieThreatCreated: 1.18, opponentThreatCreated: 0.65, dominantTeam: 'Peddie' },
    { zoneId: 'z-9-3', zoneName: 'Zone 14 Central Edge', col: 9, row: 3, xMeters: 80, yMeters: 30, threatValue: 0.185, peddieThreatCreated: 1.62, opponentThreatCreated: 0.95, dominantTeam: 'Peddie' },
    { zoneId: 'z-9-4', zoneName: 'Zone 14 Central Interior', col: 9, row: 4, xMeters: 80, yMeters: 38, threatValue: 0.182, peddieThreatCreated: 1.54, opponentThreatCreated: 0.88, dominantTeam: 'Peddie' },
    { zoneId: 'z-9-5', zoneName: 'Right Half-Space (Final 3rd)', col: 9, row: 5, xMeters: 80, yMeters: 48, threatValue: 0.142, peddieThreatCreated: 1.05, opponentThreatCreated: 0.72, dominantTeam: 'Peddie' },
    { zoneId: 'z-10-2', zoneName: 'Left Penalty Box Channel', col: 10, row: 2, xMeters: 92, yMeters: 22, threatValue: 0.215, peddieThreatCreated: 1.45, opponentThreatCreated: 0.82, dominantTeam: 'Peddie' },
    { zoneId: 'z-10-3', zoneName: 'Central 6-Yard Box Left', col: 10, row: 3, xMeters: 95, yMeters: 31, threatValue: 0.285, peddieThreatCreated: 2.10, opponentThreatCreated: 1.45, dominantTeam: 'Peddie' },
    { zoneId: 'z-10-4', zoneName: 'Central 6-Yard Box Right', col: 10, row: 4, xMeters: 95, yMeters: 37, threatValue: 0.280, peddieThreatCreated: 1.95, opponentThreatCreated: 1.35, dominantTeam: 'Peddie' },
    { zoneId: 'z-10-5', zoneName: 'Right Penalty Box Channel', col: 10, row: 5, xMeters: 92, yMeters: 46, threatValue: 0.210, peddieThreatCreated: 1.32, opponentThreatCreated: 0.78, dominantTeam: 'Peddie' },
    { zoneId: 'z-11-1', zoneName: 'Left Flank Cutback Zone', col: 11, row: 1, xMeters: 100, yMeters: 10, threatValue: 0.165, peddieThreatCreated: 1.25, opponentThreatCreated: 0.62, dominantTeam: 'Peddie' },
    { zoneId: 'z-11-6', zoneName: 'Right Flank Cutback Zone', col: 11, row: 6, xMeters: 100, yMeters: 58, threatValue: 0.160, peddieThreatCreated: 1.10, opponentThreatCreated: 0.58, dominantTeam: 'Peddie' }
  ]
};

// ============================================================================
// PPDA (Passes Per Defensive Action) Pressing Telemetry
// ============================================================================

export const PPDA_SEASON_SERIES = [
  { matchId: 'm-0', matchLabel: 'Haverford', peddiePpda: 11.4, opponentPpda: 8.2, leagueAvgPpda: 11.8, pressingIntensity: 'Moderate' },
  { matchId: 'm-1', matchLabel: 'Aquinas', peddiePpda: 8.6, opponentPpda: 12.8, leagueAvgPpda: 11.8, pressingIntensity: 'High Intensity' },
  { matchId: 'm-2', matchLabel: 'Trenton', peddiePpda: 9.2, opponentPpda: 11.5, leagueAvgPpda: 11.8, pressingIntensity: 'High Intensity' },
  { matchId: 'm-3', matchLabel: 'George School', peddiePpda: 7.8, opponentPpda: 15.3, leagueAvgPpda: 11.8, pressingIntensity: 'Elite Counter-Press' },
  { matchId: 'm-4', matchLabel: 'Princeton Day', peddiePpda: 6.9, opponentPpda: 18.2, leagueAvgPpda: 11.8, pressingIntensity: 'Dominant High Trap' }
];

