const fs = require('fs');
const evs = require('../veo_curated_events_final.json');
let content = fs.readFileSync('./src/lib/soccer-data.ts', 'utf8');

// 1. Add fixture m-0 to PEDDIE_SCHEDULE_2026_2027
const fixtureCode = `  {
    id: 'm-0',
    season: '2026-2027',
    matchDate: 'Sept 1, 2026',
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
    videoUrl: 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/',
    thumbnailUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg',
    keySummary: 'Official 2026-2027 Season Opener vs. The Haverford School (PA). 4 periods of 20 minutes captured via Veo AI camera. Initial game trial for 4-4-2 diamond midfield rotations against a nationally ranked Inter-Ac powerhouse.'
  },\n`;

if (!content.includes("'m-0'")) {
  content = content.replace('export const PEDDIE_SCHEDULE_2026_2027: MatchFixture[] = [\n', 'export const PEDDIE_SCHEDULE_2026_2027: MatchFixture[] = [\n' + fixtureCode);
}

// 2. Add MATCH_EVENTS_VEO_HAVERFORD
const eventsCode = `\nexport const MATCH_EVENTS_VEO_HAVERFORD: MatchEvent[] = ${JSON.stringify(evs, null, 2)};\n`;

if (!content.includes('MATCH_EVENTS_VEO_HAVERFORD')) {
  content = content.replace('export const MATCH_EVENTS_LIVE_BLAIR: MatchEvent[] = [', eventsCode + '\nexport const MATCH_EVENTS_LIVE_BLAIR: MatchEvent[] = [');
}

// 3. Add Haverford scouting report
const haverfordScouting = `  'The Haverford School': {
    opponent: 'The Haverford School Fords',
    conference: 'Inter-Ac League (PA)',
    headCoach: 'Keith Cappo',
    formation: '4-3-3',
    keyPlaymakers: [
      '#9 Center Forward (clinical box finishing, 2 goals in Q1/Q2)',
      '#10 Central Midfield (direct passing vision and set-piece taker)',
      '#7 Right Winger (pace on overlap and early crosses)'
    ],
    tendencies: {
      buildup: 'Vertical direct switches into wide channels, rapid overloads in the penalty area.',
      defensiveBlock: 'Aggressive mid-to-high press; counter-press immediately upon turnovers.',
      vulnerabilityZone: 'Transitional channels behind high-pressing fullbacks when broken.',
      setPieceThreat: 'Whipped near-post corners and back-post cutbacks.'
    },
    recommendedTactics: [
      'Maintain compact 4-4-2 diamond central block to choke their interior central passing lanes.',
      'Utilize quick diagonal long releases from Tharney and Wachtveitl into Tommy Kim and Blake Romanelli channels.',
      'Double down on second-ball recoveries via Gabriel Lam (#6) and Rayyaan Mohiuddin (#14).'
    ],
    winProbabilityPct: 62.0
  },\n`;

if (!content.includes("'The Haverford School': {")) {
  content = content.replace("export const MAPL_SCOUTING_REPORTS: Record<string, ScoutingReport> = {\n", "export const MAPL_SCOUTING_REPORTS: Record<string, ScoutingReport> = {\n" + haverfordScouting);
}

fs.writeFileSync('./src/lib/soccer-data.ts', content, 'utf8');
console.log('Successfully updated soccer-data.ts with Haverford Veo game, 18 events, and scouting report!');
