/**
 * ============================================================================
 * Peddie Soccer SAC — Phase 1 Database Seed Script
 * Migrates all validated data from soccer-data.ts → Prisma SQLite DB
 * Run: npx ts-node --project tsconfig.seed.json prisma/seed.ts
 * ============================================================================
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Type Helpers
// ---------------------------------------------------------------------------

const VALID_POSITIONS = ['GK','CB','LB','RB','CDM','CM','CAM','LM','RM','LW','RW','ST'];

function toPosition(p: string | undefined): string | undefined {
  if (!p) return undefined;
  return VALID_POSITIONS.includes(p) ? p : undefined;
}


// ---------------------------------------------------------------------------
// Peddie Varsity Roster (2026-2027)
// ---------------------------------------------------------------------------

const PEDDIE_PLAYERS = [
  { externalId:'p-kim-t',       number:28, name:'Tommy Kim',           classYear:'Senior',    gradYear:2027, position:'ST',  secondaryPosition:'CAM', isCaptain:true,  squadLevel:'Varsity', tacticalRole:'Clinical Center-Forward & Transition Spearhead', scoutingTier:'NCAA D1 Collegiate Prospect', height:"5'11\"", weight:'168 lbs', hometown:'Princeton, NJ',       minutesPlayed:540, matchesPlayed:7, goals:12, assists:4, expectedGoals:11.45, expectedAssists:3.65, passCompletionPct:88.5, tackleSuccessPct:76.0, topSpeedMph:21.3, distanceCoveredMiles:45.8, shots:38, shotsOnTarget:28, keyPasses:18, interceptions:12, clearances:6, matchFormScore:9.6, photoUrl:'/media-day-headshots/IMG_000625.jpg', photoUrl2:'/media-day-previews/IMG_000632.jpg' },
  { externalId:'p-tharney',     number:13, name:'Christian Tharney',   classYear:'Senior',    gradYear:2027, position:'CDM', secondaryPosition:'CB',  isCaptain:true,  squadLevel:'Varsity', tacticalRole:'Single Pivot Regista & Set-Piece Commander', scoutingTier:'All-MAPL First Team Anchor', height:"6'1\"", weight:'176 lbs', hometown:'Kendall Park, NJ',   minutesPlayed:560, matchesPlayed:7, goals:10, assists:5, expectedGoals:8.85, expectedAssists:4.45, passCompletionPct:91.2, tackleSuccessPct:89.3, topSpeedMph:20.4, distanceCoveredMiles:48.5, shots:26, shotsOnTarget:18, keyPasses:22, interceptions:32, clearances:24, matchFormScore:9.5, photoUrl:'/media-day-headshots/IMG_000547.jpg', photoUrl2:'/media-day-previews/IMG_000560.jpg' },
  { externalId:'p-cucchiara',   number:7,  name:'Bennett Cucchiara',   classYear:'Freshman',  gradYear:2030, position:'LM',  secondaryPosition:'RM',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'Starting Left Midfielder & Precision Set-Piece Specialist', scoutingTier:'Varsity Cornerstone Starter', height:"5'9\"", weight:'152 lbs', hometown:'Cranbury, NJ', minutesPlayed:480, matchesPlayed:7, goals:3, assists:3, expectedGoals:2.85, expectedAssists:3.10, passCompletionPct:88.2, tackleSuccessPct:78.0, topSpeedMph:21.0, distanceCoveredMiles:42.5, shots:16, shotsOnTarget:11, keyPasses:19, interceptions:16, clearances:8, matchFormScore:9.1, photoUrl:'/media-day-headshots/IMG_0001197.jpg', photoUrl2:'/media-day-previews/IMG_0001227.jpg' },
  { externalId:'p-romanelli',   number:26, name:'Blake Romanelli',     classYear:'Sophomore', gradYear:2029, position:'RM',  secondaryPosition:'RB',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'Starting Right Midfielder & Blistering Sprinter (21.8 mph Peak)', scoutingTier:'Varsity Cornerstone Starter', height:"5'10\"", weight:'162 lbs', hometown:'Robbinsville, NJ', minutesPlayed:470, matchesPlayed:7, goals:0, assists:0, expectedGoals:0.60, expectedAssists:1.15, passCompletionPct:87.5, tackleSuccessPct:85.0, topSpeedMph:21.8, distanceCoveredMiles:44.2, shots:7, shotsOnTarget:3, keyPasses:12, interceptions:21, clearances:18, matchFormScore:8.8, photoUrl:'/media-day-headshots/IMG_000976.jpg', photoUrl2:'/media-day-previews/IMG_0001037.jpg' },
  { externalId:'p-wachtveitl',  number:10, name:'Quinn Wachtveitl',    classYear:'Senior',    gradYear:2027, position:'ST',  secondaryPosition:'CAM', isCaptain:false, squadLevel:'Varsity', tacticalRole:'Striker & Combination Attacking Threat', scoutingTier:'MAPL Emerging Talent', height:"5'10\"", weight:'160 lbs', hometown:'Princeton, NJ',       minutesPlayed:440, matchesPlayed:7, goals:2, assists:4, expectedGoals:2.40, expectedAssists:2.95, passCompletionPct:84.5, tackleSuccessPct:74.0, topSpeedMph:20.5, distanceCoveredMiles:38.0, shots:15, shotsOnTarget:9, keyPasses:14, interceptions:8, clearances:3, matchFormScore:8.7 },
  { externalId:'p-raya',        number:2,  name:'Wyatt Raya',          classYear:'Sophomore', gradYear:2029, position:'CM',  secondaryPosition:'RM',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'Dynamic Attacking Midfielder & Clinical Finisher', scoutingTier:'Varsity Key Contributor', height:"5'9\"", weight:'154 lbs', hometown:'Princeton, NJ', minutesPlayed:390, matchesPlayed:7, goals:3, assists:1, expectedGoals:2.65, expectedAssists:1.40, passCompletionPct:86.4, tackleSuccessPct:78.5, topSpeedMph:20.6, distanceCoveredMiles:35.2, shots:14, shotsOnTarget:9, keyPasses:11, interceptions:10, clearances:4, matchFormScore:8.6 },
  { externalId:'p-pratt',       number:9,  name:'Michael Pratt',       classYear:'Sophomore', gradYear:2029, position:'ST',  secondaryPosition:'RW',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'Direct Attacking Forward & Playmaker', scoutingTier:'Varsity Key Contributor', height:"5'10\"", weight:'160 lbs', hometown:'Pennington, NJ', minutesPlayed:380, matchesPlayed:7, goals:2, assists:3, expectedGoals:2.10, expectedAssists:2.45, passCompletionPct:85.2, tackleSuccessPct:72.0, topSpeedMph:20.9, distanceCoveredMiles:34.5, shots:12, shotsOnTarget:8, keyPasses:12, interceptions:7, clearances:2, matchFormScore:8.5 },
  { externalId:'p-wiley',       number:22, name:'Carson Wiley',        classYear:'Junior',    gradYear:2028, position:'CB',  secondaryPosition:'CDM', isCaptain:false, squadLevel:'Varsity', tacticalRole:'Ball-Playing Center-Back & Set-Piece Target', scoutingTier:'MAPL Defensive Core', height:"6'0\"", weight:'176 lbs', hometown:'Summit, NJ',         minutesPlayed:560, matchesPlayed:7, goals:2, assists:1, expectedGoals:1.45, expectedAssists:0.60, passCompletionPct:89.5, tackleSuccessPct:88.0, topSpeedMph:19.8, distanceCoveredMiles:44.5, shots:6, shotsOnTarget:4, keyPasses:5, interceptions:29, clearances:36, matchFormScore:9.0 },
  { externalId:'p-mohiuddin',   number:14, name:'Rayyaan Mohiuddin',   classYear:'Junior',    gradYear:2028, position:'CAM', secondaryPosition:'RM',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'Central Advanced Playmaker (Tip of Diamond)', scoutingTier:'All-MAPL Playmaking Cornerstone', height:"5'9\"", weight:'157 lbs', hometown:'Hillsborough, NJ', minutesPlayed:500, matchesPlayed:7, goals:1, assists:2, expectedGoals:1.80, expectedAssists:2.60, passCompletionPct:88.0, tackleSuccessPct:78.0, topSpeedMph:21.1, distanceCoveredMiles:46.0, shots:14, shotsOnTarget:7, keyPasses:22, interceptions:18, clearances:4, matchFormScore:9.0 },
  { externalId:'p-eldessouky',  number:12, name:'Noah Eldessouky',     classYear:'Senior',    gradYear:2027, position:'LB',  secondaryPosition:'CB',  isCaptain:true,  squadLevel:'Varsity', tacticalRole:'Attacking Inverted Wing-Back & Engine', scoutingTier:'All-MAPL First Team Caliber', height:"5'10\"", weight:'160 lbs', hometown:'Monroe, NJ', minutesPlayed:560, matchesPlayed:7, goals:0, assists:2, expectedGoals:0.35, expectedAssists:2.40, passCompletionPct:89.0, tackleSuccessPct:86.5, topSpeedMph:21.1, distanceCoveredMiles:47.5, shots:7, shotsOnTarget:3, keyPasses:16, interceptions:24, clearances:21, matchFormScore:9.2, photoUrl:'/media-day-headshots/IMG_000493.jpg', photoUrl2:'/media-day-previews/IMG_000525.jpg' },
  { externalId:'p-sinha-jeet',  number:6,  name:'Jeet Sinha',          classYear:'Junior',    gradYear:2028, position:'CM',  secondaryPosition:'LM',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'Central Midfielder & Possession Progressor', scoutingTier:'Varsity Core Contributor', height:"5'11\"", weight:'165 lbs', hometown:'Hightstown, NJ', minutesPlayed:460, matchesPlayed:7, goals:1, assists:0, expectedGoals:1.05, expectedAssists:1.10, passCompletionPct:91.8, tackleSuccessPct:89.5, topSpeedMph:20.9, distanceCoveredMiles:41.0, shots:11, shotsOnTarget:6, keyPasses:14, interceptions:21, clearances:12, matchFormScore:8.9, photoUrl:'/media-day-headshots/IMG_000761.jpg', photoUrl2:'/media-day-previews/IMG_000769.jpg' },
  { externalId:'p-xiao',        number:25, name:'Harry Xiao',          classYear:'Junior',    gradYear:2028, position:'RW',  secondaryPosition:'CM',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'Wide Attacking Winger & Goal Threat', scoutingTier:'Varsity Rotation', height:"5'9\"", weight:'156 lbs', hometown:'Princeton, NJ', minutesPlayed:280, matchesPlayed:7, goals:1, assists:0, expectedGoals:0.90, expectedAssists:0.45, passCompletionPct:83.0, tackleSuccessPct:72.0, topSpeedMph:20.5, distanceCoveredMiles:24.0, shots:6, shotsOnTarget:3, keyPasses:7, interceptions:8, clearances:2, matchFormScore:8.1 },
  { externalId:'p-zhang-j',     number:20, name:'Jeffrey Zhang',       classYear:'Junior',    gradYear:2028, position:'ST',  secondaryPosition:'CAM', isCaptain:false, squadLevel:'Varsity', tacticalRole:'Second Striker & Tactical Combiner', scoutingTier:'Varsity Key Rotation', height:"5'10\"", weight:'163 lbs', hometown:'Short Hills, NJ', minutesPlayed:380, matchesPlayed:7, goals:0, assists:1, expectedGoals:1.10, expectedAssists:1.50, passCompletionPct:84.8, tackleSuccessPct:74.0, topSpeedMph:20.9, distanceCoveredMiles:33.0, shots:9, shotsOnTarget:4, keyPasses:9, interceptions:7, clearances:3, matchFormScore:8.4, photoUrl:'/media-day-headshots/IMG_000551.jpg', photoUrl2:'/media-day-previews/IMG_000558.jpg' },
  { externalId:'p-rozo',        number:18, name:'Brody Rozo',          classYear:'Sophomore', gradYear:2029, position:'CM',  secondaryPosition:'ST',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'High-Press Central Midfielder & Aerial Battler', scoutingTier:'Varsity Rotation', height:"5'10\"", weight:'162 lbs', hometown:'Robbinsville, NJ', minutesPlayed:270, matchesPlayed:7, goals:0, assists:1, expectedGoals:0.45, expectedAssists:0.80, passCompletionPct:84.0, tackleSuccessPct:80.0, topSpeedMph:20.4, distanceCoveredMiles:25.0, shots:5, shotsOnTarget:2, keyPasses:7, interceptions:11, clearances:5, matchFormScore:8.0 },
  { externalId:'p-mckenzie',    number:98, name:'Dylan McKenzie',      classYear:'Junior',    gradYear:2028, position:'GK',  secondaryPosition:undefined, isCaptain:false, squadLevel:'Varsity', tacticalRole:'Sweeper-Keeper & Shot-Stopper (41 Saves)', scoutingTier:'NCAA D1/D2 Goalkeeper Prospect', height:"6'2\"", weight:'184 lbs', hometown:'Plainsboro, NJ', minutesPlayed:560, matchesPlayed:7, goals:0, assists:0, expectedGoals:0, expectedAssists:0, passCompletionPct:89.5, tackleSuccessPct:0, topSpeedMph:17.8, distanceCoveredMiles:27.0, shots:0, shotsOnTarget:0, keyPasses:0, interceptions:6, clearances:18, saves:41, goalsConceded:12, cleanSheets:2, matchFormScore:9.2, photoUrl:'/media-day-headshots/IMG_000565.jpg' },
  { externalId:'p-bonchev',     number:8,  name:'Owen Bonchev',        classYear:'Sophomore', gradYear:2029, position:'CB',  secondaryPosition:'CDM', isCaptain:false, squadLevel:'Varsity', tacticalRole:'Ball-Playing Center-Back', scoutingTier:'Varsity Starter', height:"6'1\"", weight:'175 lbs', hometown:'Princeton, NJ', minutesPlayed:520, matchesPlayed:7, goals:0, assists:0, expectedGoals:0.15, expectedAssists:0.25, passCompletionPct:89.0, tackleSuccessPct:86.0, topSpeedMph:20.2, distanceCoveredMiles:41.0, shots:2, shotsOnTarget:1, keyPasses:4, interceptions:26, clearances:32, matchFormScore:8.8 },
  { externalId:'p-lam',         number:5,  name:'Gabriel Lam',          classYear:'Senior',    gradYear:2027, position:'RB',  secondaryPosition:'CB',  isCaptain:false, squadLevel:'Varsity', tacticalRole:'Starting Right Fullback', scoutingTier:'Varsity Starter', height:"5'10\"", weight:'164 lbs', hometown:'Princeton, NJ', minutesPlayed:530, matchesPlayed:7, goals:0, assists:0, expectedGoals:0.20, expectedAssists:0.75, passCompletionPct:91.2, tackleSuccessPct:87.5, topSpeedMph:20.8, distanceCoveredMiles:43.0, shots:3, shotsOnTarget:1, keyPasses:10, interceptions:23, clearances:24, matchFormScore:8.9 },
  // JV Players
  { externalId:'p-li-raymond',  number:31, name:'Raymond Li',          classYear:'Sophomore', gradYear:2029, position:'CM',  isCaptain:false, squadLevel:'JuniorVarsity', tacticalRole:'JV Central Midfielder', scoutingTier:'JV Development', height:"5'9\"", weight:'153 lbs', hometown:'Montgomery Township, NJ', minutesPlayed:0, matchesPlayed:0, goals:0, assists:0, expectedGoals:0, expectedAssists:0, passCompletionPct:0, tackleSuccessPct:0, topSpeedMph:0, distanceCoveredMiles:0 },
  { externalId:'p-kwok',        number:32, name:'Harrison Kwok',       classYear:'Sophomore', gradYear:2029, position:'CB',  isCaptain:false, squadLevel:'JuniorVarsity', tacticalRole:'JV Center-Back', scoutingTier:'JV Development', height:"5'11\"", weight:'165 lbs', hometown:'Edison, NJ',          minutesPlayed:0, matchesPlayed:0, goals:0, assists:0, expectedGoals:0, expectedAssists:0, passCompletionPct:0, tackleSuccessPct:0, topSpeedMph:0, distanceCoveredMiles:0 },
];

// ---------------------------------------------------------------------------
// 2026-2027 Match Schedule (17 fixtures)
// ---------------------------------------------------------------------------

const MATCH_SCHEDULE = [
  { externalId:'m-0',  matchDate:'2026-09-01', opponent:'The Haverford School',         opponentLogoText:'⚡', isHome:false, isConference:false, status:'Completed', peddieScore:0, opponentScore:5, hudlUrl:'https://fan.hudl.com/usa/pa/haverford/organization/16669/haverford-school', expectedGoalsPeddie:0.82, expectedGoalsOpponent:3.45, possessionPctPeddie:38.0, fieldTiltPctPeddie:29.0, filmProvider:'hudl', keySummary:'Challenging opener at Inter-Ac powerhouse. McKenzie kept Peddie within reach with 5 saves.', opponentRecord:'4-1-1', winProbabilityPct:22.0 },
  { externalId:'m-1',  matchDate:'2026-09-04', opponent:'St. Thomas Aquinas',           opponentLogoText:'✝️', isHome:true,  isConference:false, status:'Completed', peddieScore:3, opponentScore:2, hudlUrl:'https://fan.hudl.com/usa/nj/hightstown/organization/5978/peddie-high-school/team/15968/boys-varsity-soccer/watch?b=QnJvYWRjYXN0NDQ5NDgxNw%3D%3D', videoUrl:'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/', expectedGoalsPeddie:2.45, expectedGoalsOpponent:1.95, possessionPctPeddie:54.0, fieldTiltPctPeddie:58.0, filmProvider:'both', keySummary:'Thrilling comeback 3-2 home victory. Tommy Kim 34\' go-ahead goal sealed it.', opponentRecord:'7-2-0', winProbabilityPct:55.0 },
  { externalId:'m-2',  matchDate:'2026-09-09', opponent:'Trenton Central',              opponentLogoText:'🌪️', isHome:true,  isConference:false, status:'Completed', peddieScore:2, opponentScore:3, hudlUrl:'https://fan.hudl.com/usa/nj/trenton/organization/14878/trenton-central-high-school', expectedGoalsPeddie:1.85, expectedGoalsOpponent:2.05, possessionPctPeddie:52.0, fieldTiltPctPeddie:55.0, filmProvider:'hudl', keySummary:'Narrow 2-3 home loss. Kim 39\' equalizer could not prevent late collapse.', opponentRecord:'3-4-0', winProbabilityPct:62.0 },
  { externalId:'m-3',  matchDate:'2026-09-12', opponent:'George School',                opponentLogoText:'🏛️', isHome:false, isConference:false, status:'Completed', peddieScore:5, opponentScore:2, hudlUrl:'https://fan.hudl.com/usa/pa/newtown/organization/15467/george-school', expectedGoalsPeddie:3.80, expectedGoalsOpponent:1.40, possessionPctPeddie:62.0, fieldTiltPctPeddie:68.0, filmProvider:'hudl', keySummary:'Dominant 5-2 road victory. Kim brace + Mohiuddin strikes.', opponentRecord:'2-3-0', winProbabilityPct:72.0 },
  { externalId:'m-4',  matchDate:'2026-09-17', opponent:'Princeton Day School',         opponentLogoText:'🐾', isHome:false, isConference:false, status:'Completed', peddieScore:7, opponentScore:1, hudlUrl:'https://fan.hudl.com/usa/nj/princeton/organization/18654/princeton-day-school', expectedGoalsPeddie:5.55, expectedGoalsOpponent:0.85, possessionPctPeddie:71.0, fieldTiltPctPeddie:79.0, filmProvider:'hudl', keySummary:'Dominant 7-1 road rout. Tommy Kim hat-trick (8\', 24\', 51\').', opponentRecord:'1-4-0', winProbabilityPct:85.0 },
  { externalId:'m-5',  matchDate:'2026-09-22', opponent:'Life Center Academy',          opponentLogoText:'🛡️', isHome:true,  isConference:false, status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/burlington/organization/31754/life-center-academy', keySummary:'Home fixture vs Independence Prep warriors. Scout reel available.', opponentRecord:'1-5-0', winProbabilityPct:86.0 },
  { externalId:'m-6',  matchDate:'2026-09-26', opponent:'The Lawrenceville School',     opponentLogoText:'🔴', isHome:false, isConference:true,  status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/lawrenceville/organization/14867/the-lawrenceville-school', keySummary:'MAPL Opener at Lawrenceville. Press-heavy tactical battle.', opponentRecord:'0-3-0', winProbabilityPct:65.0, matchType:'MAPL Conference' },
  { externalId:'m-7',  matchDate:'2026-09-30', opponent:'Delran High School',           opponentLogoText:'🐻', isHome:true,  isConference:false, status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/delran/organization/12837/delran-high-school', keySummary:'Home non-conference clash vs rebuilding Delran.', opponentRecord:'2-4-0', winProbabilityPct:64.0 },
  { externalId:'m-8',  matchDate:'2026-10-03', opponent:'Mercersburg Academy',          opponentLogoText:'⚔️', isHome:true,  isConference:true,  status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/pa/mercersburg/organization/16548/mercersburg-academy', keySummary:'MAPL home match vs Mercersburg Blue Storm.', opponentRecord:'1-2-1', winProbabilityPct:72.0, matchType:'MAPL Conference' },
  { externalId:'m-9',  matchDate:'2026-10-07', opponent:'The Wilberforce School',       opponentLogoText:'🐺', isHome:false, isConference:false, status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/princeton/organization/103452/the-wilberforce-school', keySummary:'Road trip vs Wilberforce. Strong win expected.', opponentRecord:'2-1-0', winProbabilityPct:84.0 },
  { externalId:'m-10', matchDate:'2026-10-10', opponent:'The Hill School',              opponentLogoText:'🔵', isHome:true,  isConference:true,  status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/pa/pottstown/organization/14862/the-hill-school', keySummary:'MAPL home showdown vs Hill School Blues.', opponentRecord:'2-1-2', winProbabilityPct:52.0, matchType:'MAPL Conference' },
  { externalId:'m-11', matchDate:'2026-10-14', opponent:'Rutgers Prep',                 opponentLogoText:'⚓', isHome:false, isConference:false, status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/somerset/organization/18274/rutgers-preparatory-school', keySummary:'Road non-conference vs Rutgers Prep.', opponentRecord:'2-3-0', winProbabilityPct:78.0 },
  { externalId:'m-12', matchDate:'2026-10-20', opponent:'Hopewell Valley Central',      opponentLogoText:'🐕', isHome:true,  isConference:false, status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/pennington/organization/13768/hopewell-valley-central-high-school', keySummary:'Crucial home test vs undefeated Hopewell Valley (#22 NJ).', opponentRecord:'6-0-1', winProbabilityPct:50.0, stateRanking:'#22 NJ' },
  { externalId:'m-13', matchDate:'2026-10-24', opponent:'The Pennington School',        opponentLogoText:'🦅', isHome:false, isConference:true,  status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/pennington/organization/16629/the-pennington-school', keySummary:'MAPL title-decider at Pennington (#8 National, NJ Prep A #1).', opponentRecord:'7-0-0', winProbabilityPct:26.0, matchType:'MAPL Conference', nationalRanking:'#8 National', stateRanking:'NJ Prep A #1', rivalryName:'MAPL Championship Preview' },
  { externalId:'m-14', matchDate:'2026-10-28', opponent:'WW-P South Pirates',           opponentLogoText:'🏴‍☠️', isHome:false, isConference:false, status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/princeton-junction/organization/13591/ww-p-south-high-school', keySummary:'Road match at West Windsor-Plainsboro South.', opponentRecord:'3-6-0', winProbabilityPct:68.0 },
  { externalId:'m-15', matchDate:'2026-11-03', opponent:'The Hun School',               opponentLogoText:'⚡', isHome:true,  isConference:true,  status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/princeton/organization/15456/the-hun-school', keySummary:'MAPL home derby vs Hun School Raiders.', opponentRecord:'2-3-0', winProbabilityPct:62.0, matchType:'MAPL Conference' },
  { externalId:'m-16', matchDate:'2026-11-07', opponent:'Blair Academy',                opponentLogoText:'🏴', isHome:false, isConference:true,  status:'Upcoming', hudlUrl:'https://fan.hudl.com/usa/nj/blairstown/organization/15865/blair-academy', keySummary:'123rd Peddie-Blair Day Classic at Blair. Premier MAPL rivalry.', opponentRecord:'1-2-0', winProbabilityPct:66.0, matchType:'MAPL Conference', rivalryName:'123rd Peddie-Blair Day Classic' },
];

// ---------------------------------------------------------------------------
// Main Seed Function
// ---------------------------------------------------------------------------

async function main() {
  console.log('🌱 Peddie Soccer SAC — Phase 1 Database Seed Starting...\n');

  // ---- STEP 1: Upsert Players ----
  console.log('📋 Seeding players...');
  let playerCount = 0;
  const playerIdMap: Record<string, string> = {};

  for (const p of PEDDIE_PLAYERS) {
    const created = await prisma.player.upsert({
      where: { externalId: p.externalId },
      update: {
        number: p.number,
        name: p.name,
        classYear: p.classYear,
        gradYear: p.gradYear,
        position: p.position,
        secondaryPosition: toPosition(p.secondaryPosition),
        isCaptain: p.isCaptain,
        squadLevel: p.squadLevel,
        tacticalRole: p.tacticalRole,
        scoutingTier: p.scoutingTier,
        height: p.height,
        weight: p.weight,
        hometown: p.hometown,
        minutesPlayed: p.minutesPlayed,
        matchesPlayed: p.matchesPlayed,
        goals: p.goals,
        assists: p.assists,
        expectedGoals: p.expectedGoals,
        expectedAssists: p.expectedAssists,
        passCompletionPct: p.passCompletionPct,
        tackleSuccessPct: p.tackleSuccessPct,
        topSpeedMph: p.topSpeedMph,
        distanceCoveredMiles: p.distanceCoveredMiles,
        shots: p.shots ?? 0,
        shotsOnTarget: p.shotsOnTarget ?? 0,
        keyPasses: p.keyPasses ?? 0,
        interceptions: p.interceptions ?? 0,
        clearances: p.clearances ?? 0,
        saves: p.saves ?? 0,
        goalsConceded: p.goalsConceded ?? 0,
        cleanSheets: p.cleanSheets ?? 0,
        matchFormScore: p.matchFormScore,
        photoUrl: p.photoUrl,
        photoUrl2: p.photoUrl2,
      },
      create: {
        externalId: p.externalId,
        number: p.number,
        name: p.name,
        classYear: p.classYear,
        gradYear: p.gradYear,
        position: p.position,
        secondaryPosition: toPosition(p.secondaryPosition),
        isCaptain: p.isCaptain,
        squadLevel: p.squadLevel,
        tacticalRole: p.tacticalRole,
        scoutingTier: p.scoutingTier,
        height: p.height,
        weight: p.weight,
        hometown: p.hometown,
        minutesPlayed: p.minutesPlayed,
        matchesPlayed: p.matchesPlayed,
        goals: p.goals,
        assists: p.assists,
        expectedGoals: p.expectedGoals,
        expectedAssists: p.expectedAssists,
        passCompletionPct: p.passCompletionPct,
        tackleSuccessPct: p.tackleSuccessPct,
        topSpeedMph: p.topSpeedMph,
        distanceCoveredMiles: p.distanceCoveredMiles,
        shots: p.shots ?? 0,
        shotsOnTarget: p.shotsOnTarget ?? 0,
        keyPasses: p.keyPasses ?? 0,
        interceptions: p.interceptions ?? 0,
        clearances: p.clearances ?? 0,
        saves: p.saves ?? 0,
        goalsConceded: p.goalsConceded ?? 0,
        cleanSheets: p.cleanSheets ?? 0,
        matchFormScore: p.matchFormScore,
        photoUrl: p.photoUrl,
        photoUrl2: p.photoUrl2,
      },
    });
    playerIdMap[p.externalId] = created.id;
    playerCount++;
  }
  console.log(`  ✅ ${playerCount} players seeded (25 Varsity + 2 JV)\n`);

  // ---- STEP 2: Upsert Matches ----
  console.log('📅 Seeding matches...');
  let matchCount = 0;
  const matchIdMap: Record<string, string> = {};

  for (const m of MATCH_SCHEDULE) {
    const created = await prisma.match.upsert({
      where: { externalId: m.externalId },
      update: {
        matchDate: m.matchDate,
        opponent: m.opponent,
        opponentLogoText: m.opponentLogoText,
        isHome: m.isHome,
        isConference: m.isConference,
        status: m.status,
        peddieScore: m.peddieScore,
        opponentScore: m.opponentScore,
        hudlUrl: m.hudlUrl,
        videoUrl: m.videoUrl,
        filmProvider: m.filmProvider ?? null,
        expectedGoalsPeddie: m.expectedGoalsPeddie,
        expectedGoalsOpponent: m.expectedGoalsOpponent,
        possessionPctPeddie: m.possessionPctPeddie,
        fieldTiltPctPeddie: m.fieldTiltPctPeddie,
        keySummary: m.keySummary,
        opponentRecord: m.opponentRecord,
        winProbabilityPct: m.winProbabilityPct,
        nationalRanking: m.nationalRanking,
        stateRanking: m.stateRanking,
        matchType: m.matchType,
        rivalryName: m.rivalryName,
      },
      create: {
        externalId: m.externalId,
        season: '2026-2027',
        matchDate: m.matchDate,
        opponent: m.opponent,
        opponentLogoText: m.opponentLogoText,
        isHome: m.isHome,
        isConference: m.isConference,
        status: m.status,
        peddieScore: m.peddieScore,
        opponentScore: m.opponentScore,
        hudlUrl: m.hudlUrl,
        videoUrl: m.videoUrl ?? null,
        filmProvider: m.filmProvider ?? null,
        expectedGoalsPeddie: m.expectedGoalsPeddie,
        expectedGoalsOpponent: m.expectedGoalsOpponent,
        possessionPctPeddie: m.possessionPctPeddie,
        fieldTiltPctPeddie: m.fieldTiltPctPeddie,
        keySummary: m.keySummary,
        opponentRecord: m.opponentRecord,
        winProbabilityPct: m.winProbabilityPct,
        nationalRanking: m.nationalRanking,
        stateRanking: m.stateRanking,
        matchType: m.matchType,
        rivalryName: m.rivalryName,
      },
    });
    matchIdMap[m.externalId] = created.id;
    matchCount++;
  }
  console.log(`  ✅ ${matchCount} matches seeded (5 Completed, 12 Upcoming)\n`);

  // ---- STEP 3: Log Ingestion Audit Entry ----
  console.log('📝 Logging seed ingestion audit entry...');
  await prisma.ingestionAuditLog.create({
    data: {
      source: 'manual',
      status: 'success',
      recordType: 'seed',
      rawPayload: JSON.stringify({ players: playerCount, matches: matchCount }),
      resolvedPayload: JSON.stringify({ players: playerCount, matches: matchCount }),
      durationMs: 0,
    }
  });
  console.log('  ✅ Audit log entry created\n');

  // ---- Summary ----
  console.log('='.repeat(60));
  console.log('🏆 Phase 1 Seed Complete!');
  console.log(`   Players: ${playerCount}`);
  console.log(`   Matches: ${matchCount}`);
  console.log('='.repeat(60));
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
