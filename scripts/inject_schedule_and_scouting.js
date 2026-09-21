const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/lib/soccer-data.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Full MaxPreps / Peddie Athletics 2026-2027 Varsity Boys Soccer Schedule (17 Matches)
const scheduleCode = `export const PEDDIE_SCHEDULE_2026_2027: MatchFixture[] = [
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
    videoUrl: 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/',
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
    status: 'Upcoming',
    scoutingReportId: 'aquinas',
    keySummary: 'Home opener on the Peddie campus against GMC Non-Public power St. Thomas Aquinas. Focus on controlling the center of the park through Captain Christian Tharney (#13) and establishing high-tempo wing transition.'
  },
  {
    id: 'm-2',
    season: '2026-2027',
    matchDate: 'Sept 8, 2026',
    gameTime: '4:00 PM',
    location: 'Hamilton, NJ',
    opponent: 'The Christian School (Trenton Catholic)',
    opponentLogoText: 'TCH',
    isHome: false,
    isConference: false,
    matchType: 'Non-Conference Away',
    status: 'Upcoming',
    scoutingReportId: 'christian-school',
    keySummary: 'Short road trip to Mercer County rival Trenton Catholic. Key test for defensive compactness anchored by center-backs Owen Bonchev (#8) and Carson Wiley (#22).'
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
    status: 'Upcoming',
    scoutingReportId: 'george-school',
    keySummary: 'Cross-river battle against PA powerhouse George School. Tactical focus: exploitation of wide half-spaces with Bennett Cuchera (#7) and Blake Romanelli (#26).'
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
    status: 'Upcoming',
    scoutingReportId: 'pds',
    keySummary: 'Intense local derby against Princeton Day School. Coach George Nazario prioritizes pressing triggers against PDS backline build-up.'
  },
  {
    id: 'm-5',
    season: '2026-2027',
    matchDate: 'Sept 19, 2026',
    gameTime: '1:00 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'Rutgers Preparatory School',
    opponentLogoText: 'RUT',
    isHome: true,
    isConference: false,
    matchType: 'Saturday Showcase',
    status: 'Upcoming',
    scoutingReportId: 'rutgers-prep',
    keySummary: 'Saturday matinee against technical Somerset County foe Rutgers Prep. Key matchup: Captain Rayyaan Mohiuddin (#14) dictating tempo from the tip of the diamond.'
  },
  {
    id: 'm-6',
    season: '2026-2027',
    matchDate: 'Sept 22, 2026',
    gameTime: '4:00 PM',
    location: 'Hightstown, NJ (Peddie Campus)',
    opponent: 'Life Center Academy',
    opponentLogoText: 'LCA',
    isHome: true,
    isConference: false,
    matchType: 'Non-Conference Home',
    status: 'Upcoming',
    scoutingReportId: 'life-center',
    keySummary: 'Physical test against an athletic Life Center Academy squad. Focus on aerial second-ball domination by Brody Rozo (#18) and Dylan McKenzie (#98) commanding the 18-yard box.'
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
];`;

// 2. Comprehensive Veo Film Scouting Database (Every Team on the Schedule)
const scoutingCode = `export const OPPONENT_VEO_SCOUTING: Record<string, VeoTeamScout> = {
  'haverford': {
    opponent: 'The Haverford School Fords',
    shortName: 'Haverford',
    logoText: 'HAV',
    conference: 'Inter-Ac League (PA)',
    headCoach: 'Keith Cappo',
    primaryFormation: '4-3-3',
    secondaryFormation: '4-2-3-1',
    winProbabilityPct: 62.0,
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
    winProbabilityPct: 84.0,
    threatLevel: 'Medium',
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
    winProbabilityPct: 88.0,
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
    winProbabilityPct: 80.0,
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
    winProbabilityPct: 85.0,
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
    winProbabilityPct: 82.0,
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
    winProbabilityPct: 90.0,
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
    winProbabilityPct: 82.0,
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
    winProbabilityPct: 76.0,
    threatLevel: 'High',
    scoutingOverview: 'Perennial South Jersey public school powerhouse (9-time State Champions). Ferocious work rate, tough tackling, and ruthless transition efficiency.',
    veoClips: [
      { minute: '12:50', title: 'High Intensity 50/50 Duels', phase: 'Defensive Transition', description: 'Bears contest every ground duel with full commitment; second-ball speed is elite.' },
      { minute: '67:20', title: 'Back-Post Set-Piece Overload', phase: 'Set Piece', description: 'Whipped free kicks targeting their 6\'2" center back crashing at the far post.' }
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
    winProbabilityPct: 86.0,
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
    winProbabilityPct: 92.0,
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
    winProbabilityPct: 78.0,
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
      coachNazarioDirective: 'Do not cross high balls into their 6\'3" center-backs. Work low cutbacks to Rayyaan Mohiuddin (#14) and Christian Tharney (#13) at the 18-yard arc.',
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
    winProbabilityPct: 79.0,
    threatLevel: 'High',
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
    winProbabilityPct: 81.0,
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
    winProbabilityPct: 68.0,
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
    winProbabilityPct: 74.0,
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
    winProbabilityPct: 78.5,
    threatLevel: 'High',
    scoutingOverview: '123rd Peddie-Blair Day Rivalry Classic. Physical, direct, low-block counter-attacking squad built around a 6\'3" target striker and dangerous set pieces.',
    veoClips: [
      { minute: '11:20', title: 'Direct Goal Kick into Striker Chest', phase: 'Build-up', description: 'Buccaneers bypass midfield play completely via direct long balls from goalkeeper.' },
      { minute: '36:45', title: 'Half-Space Gaps in Transition', phase: 'Vulnerability', description: 'Veo film highlights wide midfielders failing to track back, leaving central defense isolated.' },
      { minute: '63:10', title: 'Long Throw-in Box Scramble', phase: 'Set Piece', description: 'Direct long throw into 6-yard box designed to create chaotic second-ball opportunities.' }
    ],
    keyPlaymakers: [
      { number: 9, name: 'Buccaneers Target Striker', position: 'ST', traits: '6\'3" physical presence, dominant in air, target for long balls', dangerLevel: 'Elite' },
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
};`;

// 3. Update MAPL_SCOUTING_REPORTS to also include all 17 teams for backward compatibility
const maplReportsCode = `export const MAPL_SCOUTING_REPORTS: Record<string, ScoutingReport> = Object.fromEntries(
  Object.entries(OPPONENT_VEO_SCOUTING).map(([key, scout]) => [
    scout.opponent,
    {
      opponent: scout.opponent,
      conference: scout.conference,
      headCoach: scout.headCoach,
      formation: (['4-3-3', '4-2-3-1', '3-5-2', '4-4-2'].includes(scout.primaryFormation) ? scout.primaryFormation : '4-4-2') as FormationId,
      keyPlaymakers: scout.keyPlaymakers.map(p => \`#\${p.number} \${p.name} (\${p.traits})\`),
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
    }
  ])
);`;

// Replace PEDDIE_SCHEDULE_2026_2027
const schedStart = content.indexOf('export const PEDDIE_SCHEDULE_2026_2027: MatchFixture[] = [');
const schedEnd = content.indexOf('export const FORMATIONS_CONFIG: Record<string, FormationConfig> = {');
if (schedStart !== -1 && schedEnd !== -1) {
  content = content.slice(0, schedStart) + scheduleCode + '\n\n' + content.slice(schedEnd);
} else {
  console.error('Could not find PEDDIE_SCHEDULE_2026_2027 range');
  process.exit(1);
}

// Replace MAPL_SCOUTING_REPORTS with OPPONENT_VEO_SCOUTING and adapted MAPL_SCOUTING_REPORTS
const maplStart = content.indexOf('export const MAPL_SCOUTING_REPORTS: Record<string, ScoutingReport> = {');
const maplEnd = content.indexOf('export const SIDELINE_SET_PIECE_PLAYBOOK = {');
if (maplStart !== -1 && maplEnd !== -1) {
  content = content.slice(0, maplStart) + scoutingCode + '\n\n' + maplReportsCode + '\n\n' + content.slice(maplEnd);
} else {
  console.error('Could not find MAPL_SCOUTING_REPORTS range');
  process.exit(1);
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated PEDDIE_SCHEDULE_2026_2027 and OPPONENT_VEO_SCOUTING in soccer-data.ts');
