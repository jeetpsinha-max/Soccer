import { OpponentPlayerReport } from './types';

export const OPPONENT_PLAYER_SCOUTING_REPORTS: Record<string, OpponentPlayerReport[]> = {
  'haverford': [
    {
      id: 'hav-9',
      opponentKey: 'haverford',
      teamName: 'The Haverford School',
      number: 9,
      name: 'Connor Vance',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Lethal Box Poacher / Transition Trigger',
      dangerLevel: 'Elite',
      traits: 'Predatory box instincts, rapid turn-and-shoot mechanism, high pressing motor',
      strengths: [
        'Finishes clinically inside the 18-yard box on first touch',
        'Aggressive pressing on opposing center-backs in build-up',
        'Ruthless reaction speed on goalkeeper rebounds (scored Period 4 vs Peddie)'
      ],
      vulnerabilities: [
        'Frustrated when denied service into feet with back to goal',
        'Limited defensive aerial contributions during opposing set pieces'
      ],
      currentSeasonNotes: 'Scored in Period 4 of Sept 1 opener vs Peddie (77:48). Targeted early in vertical channels behind advancing fullbacks.',
      peddieMatchupCounter: 'Carson Wiley (#22) must maintain tight physical touchline and deny inside turns. Dylan McKenzie (#98) must control rebound zones.',
      keyStats: { goals: 4, assists: 1, duelsWonPct: 58, savesOrTackles: '1.8 tackles/gm' }
    },
    {
      id: 'hav-10',
      opponentKey: 'haverford',
      teamName: 'The Haverford School',
      number: 10,
      name: 'Luca DeAngelis',
      position: 'CAM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'10\"",
      dominantFoot: 'Both',
      tacticalRole: 'Central Playmaker & Set-Piece Specialist',
      dangerLevel: 'Dangerous',
      traits: 'Pinpoint diagonal distribution, curls direct free kicks, reads defensive seams',
      strengths: [
        'Mastery of diagonal switches into outer wing channels',
        'Delivers whipped inswinging corner deliveries with pace',
        'High composure when pressed centrally by one runner'
      ],
      vulnerabilities: [
        'Does not track back past the center circle in fast transition',
        'Vulnerable to hard, clean slide challenges from blind side'
      ],
      currentSeasonNotes: 'Assisted Haverford’s opening goal with a slicing diagonal into the left channel. Primary engine of their 4-3-3 possession.',
      peddieMatchupCounter: 'Christian Tharney (#13) must step aggressively into the #10 passing lane and deny Luca space on the half-turn.',
      keyStats: { goals: 2, assists: 5, duelsWonPct: 52, savesOrTackles: '2.1 key passes/gm' }
    },
    {
      id: 'hav-11',
      opponentKey: 'haverford',
      teamName: 'The Haverford School',
      number: 11,
      name: 'Miles Thornton',
      position: 'LW',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'9\"",
      dominantFoot: 'Left',
      tacticalRole: 'Touchline Speed Merchant / Cutback Specialist',
      dangerLevel: 'Dangerous',
      traits: 'Blistering acceleration, cuts inside onto favored left foot, low grounded crosses',
      strengths: [
        'Beats defenders 1v1 down the outside touchline with pure pace',
        'Pulls cutbacks back to top of the 18-yard box with accuracy',
        'Relentless work rate in counter-pressing within 5 seconds'
      ],
      vulnerabilities: [
        'Predictable tendency to force shots onto left foot',
        'Can be dispossessed when forced into central congestion'
      ],
      currentSeasonNotes: 'Veo film minute 13:08 shows him isolating Peddie’s right back before squaring for the opening score.',
      peddieMatchupCounter: 'Gabriel Lam (#5) must show him inside into Noah Eldessouky and Christian Tharney’s double-team coverage.',
      keyStats: { goals: 3, assists: 3, duelsWonPct: 61, savesOrTackles: '3.4 take-ons/gm' }
    },
    {
      id: 'hav-4',
      opponentKey: 'haverford',
      teamName: 'The Haverford School',
      number: 4,
      name: 'Julian Reed',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Right',
      tacticalRole: 'Defensive Anchor & Aerial Commander',
      dangerLevel: 'Key Threat',
      traits: 'Commanding aerial dominance, aggressive step-up interceptions, vocal backline leader',
      strengths: [
        'Wins 80%+ of first headers from direct goal kicks',
        'Clears danger decisively without hesitating inside the box',
        'Strong recovery pace across the backline'
      ],
      vulnerabilities: [
        'Vulnerable to quick 1-2 wall passes through his channel',
        'Slow lateral hip rotation when isolated 1v1 on grass turf'
      ],
      currentSeasonNotes: 'Neutralized long balls in Haverford’s back 4. Orchestrates their high defensive line.',
      peddieMatchupCounter: 'Tommy Kim (#28) must pull him out of the central 18 with checking runs to open space for arriving runners.',
      keyStats: { goals: 1, assists: 0, duelsWonPct: 79, savesOrTackles: '4.2 clearances/gm' }
    },
    {
      id: 'hav-1',
      opponentKey: 'haverford',
      teamName: 'The Haverford School',
      number: 1,
      name: 'Colin McDermott',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Sweeper Keeper & Shot Stopper',
      dangerLevel: 'Tactical Pivot',
      traits: 'Composed with feet, sweeps outside the box, confident claiming high crosses',
      strengths: [
        'Excellent distribution off the turf into wide midfield pivots',
        'Quick reflex dives on low grounded strikes',
        'Commands his 6-yard box with physical authority'
      ],
      vulnerabilities: [
        'Can be pressured into loose clearances when closed down immediately',
        'Vulnerable to high chip shots when caught outside his 6-yard box'
      ],
      currentSeasonNotes: 'Recorded clean sheet against Peddie in season opener. Claimed 4 corner deliveries.',
      peddieMatchupCounter: 'Pressure his backpasses aggressively with twin forwards Kim and Zhang.',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 85, savesOrTackles: '84% save pct' }
    }
  ],

  'aquinas': [
    {
      id: 'sta-10',
      opponentKey: 'aquinas',
      teamName: 'St. Thomas Aquinas High School',
      number: 10,
      name: 'Julian Morales',
      position: 'CAM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'10\"",
      dominantFoot: 'Right',
      tacticalRole: 'Creative Attacking Midfield Dynamo',
      dangerLevel: 'Dangerous',
      traits: 'Quick half-turn dribbling, slippery between lines, clinical dead-ball specialist',
      strengths: [
        'Scores from 25+ yards out with dipping direct free kicks',
        'Excellent first-touch control under backline pressure',
        'Threaded passes through the seams of a 4-man backline'
      ],
      vulnerabilities: [
        'Fades out of physical matches when challenged forcefully early',
        'Reluctant to press opposing holding midfielders'
      ],
      currentSeasonNotes: 'Scored Aquinas’s first goal in Sept 4 3-2 clash vs Peddie from edge of box. Veo film minute 18:40.',
      peddieMatchupCounter: 'Rayyaan Mohiuddin (#14) and Christian Tharney (#13) must squeeze Julian Morales in a midfield vice whenever he receives.',
      keyStats: { goals: 3, assists: 2, duelsWonPct: 50, savesOrTackles: '2.5 shots/gm' }
    },
    {
      id: 'sta-9',
      opponentKey: 'aquinas',
      teamName: 'St. Thomas Aquinas High School',
      number: 9,
      name: 'Darius Thorne',
      position: 'ST',
      line: 'FWD',
      classYear: 'Junior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Physical Target Forward',
      dangerLevel: 'Key Threat',
      traits: 'Strong back-to-goal hold-up play, physical target on clearances, aerial flick-ons',
      strengths: [
        'Holds off center-backs to lay off balls to arriving wingers',
        'Dangerous near-post runs on set pieces',
        'High physical endurance throughout 80 minutes'
      ],
      vulnerabilities: [
        'Limited lateral foot speed against fast recovery center-backs',
        'Prone to committing offensive fouls when frustrated'
      ],
      currentSeasonNotes: 'Scored second-half goal vs Peddie on Sept 4 following loose ball scramble. Contested 14 aerial duels.',
      peddieMatchupCounter: 'Owen Bonchev (#8) and Carson Wiley (#22) must step in front of Darius to win initial headers cleanly.',
      keyStats: { goals: 2, assists: 1, duelsWonPct: 62, savesOrTackles: '3.1 aerial duels won' }
    },
    {
      id: 'sta-6',
      opponentKey: 'aquinas',
      teamName: 'St. Thomas Aquinas High School',
      number: 6,
      name: 'Mateo Cardenas',
      position: 'CDM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Defensive Midfield Destroyer',
      dangerLevel: 'Key Threat',
      traits: 'Tenacious tackler, intercepts forward passes, breaks up transitions',
      strengths: [
        'Aggressive sliding challenges in the center circle',
        'Covers wide areas to assist fullbacks',
        'Physical enforcer who disrupts opposing rhythm'
      ],
      vulnerabilities: [
        'Susceptible to yellow cards for late challenges',
        'Limited passing range beyond 15 yards'
      ],
      currentSeasonNotes: 'Struggled against Rayyaan Mohiuddin’s quick one-touch combinations in Peddie’s 3-2 victory.',
      peddieMatchupCounter: 'Quinn Wachtveitl (#10) and Brody Rozo (#18) move the ball with 1-2 touches before Mateo can arrive for contact.',
      keyStats: { goals: 0, assists: 1, duelsWonPct: 67, savesOrTackles: '4.2 tackles/gm' }
    },
    {
      id: 'sta-3',
      opponentKey: 'aquinas',
      teamName: 'St. Thomas Aquinas High School',
      number: 3,
      name: 'Anthony Rossi',
      position: 'RB',
      line: 'DEF',
      classYear: 'Junior',
      height: "5'8\"",
      dominantFoot: 'Right',
      tacticalRole: 'Advancing Fullback',
      dangerLevel: 'Tactical Pivot',
      traits: 'Pushes high up the flank, delivers early crosses, overlaps wingers',
      strengths: [
        'High stamina running the touchline',
        'Decent crossing delivery from deep right flank'
      ],
      vulnerabilities: [
        'Leaves massive space behind him on transitions (exploited by Bennett Cuchera on Sept 4)',
        'Vulnerable in 1v1 isolation when tracking back'
      ],
      currentSeasonNotes: 'Veo clip minute 52:10 shows him trapped upfield during Peddie’s second goal sequence.',
      peddieMatchupCounter: 'Bennett Cuchera (#7) and Blake Romanelli (#26) attack the space vacated behind Rossi.',
      keyStats: { goals: 0, assists: 2, duelsWonPct: 49, savesOrTackles: '1.9 clearances/gm' }
    }
  ],

  'christian-school': [
    {
      id: 'tch-11',
      opponentKey: 'christian-school',
      teamName: 'The Christian School (Trenton Catholic)',
      number: 11,
      name: 'Malik Jean-Baptiste',
      position: 'LW',
      line: 'FWD',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Explosive Inverted Winger',
      dangerLevel: 'Dangerous',
      traits: 'Olympic-level sprint speed, direct 1v1 dribbler, cuts inside onto right foot',
      strengths: [
        'Exceptional burst acceleration that punishes slow-reacting fullbacks',
        'Dangerous curling strikes toward far top corner',
        'Wins fouls in dangerous crossing positions'
      ],
      vulnerabilities: [
        'Does not track back to help his left-back defensively',
        'Becomes predictable when shown down the outside onto weaker left foot'
      ],
      currentSeasonNotes: 'Primary scoring threat for Trenton Catholic. Leads team with 5 goals through early season.',
      peddieMatchupCounter: 'Gabriel Lam (#5) must contain Malik, give a half-yard cushion to deny the sprint race, and force him left.',
      keyStats: { goals: 5, assists: 1, duelsWonPct: 56, savesOrTackles: '4.1 dribbles/gm' }
    },
    {
      id: 'tch-7',
      opponentKey: 'christian-school',
      teamName: 'The Christian School (Trenton Catholic)',
      number: 7,
      name: 'Devon Campbell',
      position: 'CM',
      line: 'MID',
      classYear: 'Senior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Box-to-Box Physical Midfielder',
      dangerLevel: 'Key Threat',
      traits: 'High motor, energetic pressing, direct long-range shooting',
      strengths: [
        'Covers huge ground from box to box',
        'Physical strength in 50/50 midfield collisions',
        'Launches quick direct balls to Jean-Baptiste'
      ],
      vulnerabilities: [
        'Lacks technical finesse when pressed by multiple players',
        'Overcommits in midfield, leaving backline exposed'
      ],
      currentSeasonNotes: 'Key playmaker in TCHS direct bypass strategy. Primary target for second balls off goal kicks.',
      peddieMatchupCounter: 'Christian Tharney (#13) and Brody Rozo (#18) control the second balls around Campbell.',
      keyStats: { goals: 2, assists: 3, duelsWonPct: 63, savesOrTackles: '3.5 tackles/gm' }
    },
    {
      id: 'tch-5',
      opponentKey: 'christian-school',
      teamName: 'The Christian School (Trenton Catholic)',
      number: 5,
      name: 'Kwame Boateng',
      position: 'CB',
      line: 'DEF',
      classYear: 'Junior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Physical Stopper',
      dangerLevel: 'Tactical Pivot',
      traits: 'Strong aerial presence, hard slide tackler, emotional vocal presence',
      strengths: [
        'Head clearance power on direct balls into box',
        'Intimidating physical presence in the 18-yard box'
      ],
      vulnerabilities: [
        'Poor turning speed on low through-balls',
        'Vulnerable to near-post corner runs and screeners'
      ],
      currentSeasonNotes: 'Veo film minute 64:30 highlights center-back miscommunication on low cutbacks.',
      peddieMatchupCounter: 'Tommy Kim (#28) use quick stop-and-go vertical acceleration to turn Kwame inside out.',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 71, savesOrTackles: '4.8 clearances/gm' }
    }
  ],

  'george-school': [
    {
      id: 'geo-9',
      opponentKey: 'george-school',
      teamName: 'George School',
      number: 9,
      name: 'Oliver Vance',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Hold-up Striker in Twin-Forward 3-5-2',
      dangerLevel: 'Key Threat',
      traits: 'Smart shielding of ball, lay-offs to arriving wingbacks, dangerous inside box',
      strengths: [
        'Excellent back-to-goal distribution into wingback channels',
        'Composed one-touch finishing',
        'Coordinates pressing traps with second forward'
      ],
      vulnerabilities: [
        'Struggles when isolated against dual physical center backs',
        'Rarely creates own shot off the dribble'
      ],
      currentSeasonNotes: 'Focal point of George School’s Friends Schools League offensive structure.',
      peddieMatchupCounter: 'Carson Wiley (#22) lock him down tightly; Owen Bonchev (#8) sweep up behind.',
      keyStats: { goals: 3, assists: 4, duelsWonPct: 54, savesOrTackles: '2.3 shots/gm' }
    },
    {
      id: 'geo-8',
      opponentKey: 'george-school',
      teamName: 'George School',
      number: 8,
      name: 'Liam Henderson',
      position: 'CM',
      line: 'MID',
      classYear: 'Junior',
      height: "5'9\"",
      dominantFoot: 'Right',
      tacticalRole: 'Central Tempo Controller',
      dangerLevel: 'Dangerous',
      traits: 'Smooth ball distributor, diagonal switches, quick 1-2 passing triangles',
      strengths: [
        'Distributes cleanly with 88% pass accuracy in middle third',
        'Reads opponent pressing triggers to release wingbacks early',
        'Takes direct free kicks within 30 yards'
      ],
      vulnerabilities: [
        'Physically outmatched by taller, aggressive defensive midfielders',
        'Does not contest high 50/50 aerial duels'
      ],
      currentSeasonNotes: 'Engine of the Cougars 3-5-2 midfield pivot. Disrupted if pressured high.',
      peddieMatchupCounter: 'Rayyaan Mohiuddin (#14) must mark Henderson man-to-man to break George School’s flow.',
      keyStats: { goals: 1, assists: 4, duelsWonPct: 48, savesOrTackles: '88% pass pct' }
    },
    {
      id: 'geo-3',
      opponentKey: 'george-school',
      teamName: 'George School',
      number: 3,
      name: 'Harrison Gray',
      position: 'LWB',
      line: 'DEF',
      classYear: 'Senior',
      height: "5'10\"",
      dominantFoot: 'Left',
      tacticalRole: 'High Attacking Wingback',
      dangerLevel: 'Key Threat',
      traits: 'Hugs touchline, delivers whipped crosses, high offensive work rate',
      strengths: [
        'Accurate inswinging crosses into penalty box',
        'Provides width to stretch opposing defensive blocks'
      ],
      vulnerabilities: [
        'Leaves massive acres of space behind him on transitions (Veo film 14:20)',
        'Slow recovery when forced into a 50-yard sprint back'
      ],
      currentSeasonNotes: 'Veo film highlights wide vulnerability zone behind Gray when George School loses possession.',
      peddieMatchupCounter: 'Bennett Cuchera (#7) exploit the vacant right flank channels behind Gray with diagonal bursts.',
      keyStats: { goals: 1, assists: 3, duelsWonPct: 53, savesOrTackles: '2.0 crosses/gm' }
    }
  ],

  'pds': [
    {
      id: 'pds-10',
      opponentKey: 'pds',
      teamName: 'Princeton Day School',
      number: 10,
      name: 'Sebastian Cole',
      position: 'CAM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'9\"",
      dominantFoot: 'Right',
      tacticalRole: 'Technical Dribbler & Triangle Orchestrator',
      dangerLevel: 'Dangerous',
      traits: 'Tiki-taka combination play, nimble footwork, eye for defense-splitting through-balls',
      strengths: [
        'Manipulates ball in tight spaces with quick sole rolls',
        'High vision on slipped through-balls behind center-backs',
        'High football IQ in identifying overload zones'
      ],
      vulnerabilities: [
        'Struggles with physical body contact and aggressive shoulder challenges',
        'Defensive work rate drops off sharply in second half'
      ],
      currentSeasonNotes: 'Captain and primary playmaker for PDS. Orchestrates their 4-3-3 possession triangles.',
      peddieMatchupCounter: 'Quinn Wachtveitl (#10) and Brody Rozo (#18) provide relentless physical midfield pressure.',
      keyStats: { goals: 4, assists: 4, duelsWonPct: 51, savesOrTackles: '3.1 key passes/gm' }
    },
    {
      id: 'pds-4',
      opponentKey: 'pds',
      teamName: 'Princeton Day School',
      number: 4,
      name: 'Nolan Spencer',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Ball-Playing Center Back',
      dangerLevel: 'Key Threat',
      traits: 'Steps into midfield with ball, diagonal switches, sets high offside line',
      strengths: [
        'Calm on ball under mild pressure',
        'Distributes into midfield pivots with pace',
        'Commands backline line-of-restraint'
      ],
      vulnerabilities: [
        'Caught flat-footed by timed runs behind when stepping high (Veo clip 68:15)',
        'Vulnerable to fast twin-forward counter-attacks'
      ],
      currentSeasonNotes: 'Veo film demonstrates Spencer stepping too far into midfield, exposing PDS to direct balls.',
      peddieMatchupCounter: 'Tommy Kim (#28) time runs onto Spencer’s blind shoulder on quick transition turnovers.',
      keyStats: { goals: 1, assists: 1, duelsWonPct: 69, savesOrTackles: '3.8 clearances/gm' }
    },
    {
      id: 'pds-7',
      opponentKey: 'pds',
      teamName: 'Princeton Day School',
      number: 7,
      name: 'Mateo Gutierrez',
      position: 'RW',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'8\"",
      dominantFoot: 'Right',
      tacticalRole: 'Touchline Dribbler & Crosser',
      dangerLevel: 'Key Threat',
      traits: 'Quick feet, low center of gravity, sharp changes of direction',
      strengths: [
        'Beats defenders 1v1 on edge of penalty box',
        'Delivers whipped low balls across the 6-yard area'
      ],
      vulnerabilities: [
        'Reluctant to challenge aerially',
        'Can be dispossessed by aggressive physical touchline tackles'
      ],
      currentSeasonNotes: 'Forms dangerous right-side triangle with Cole and Spencer.',
      peddieMatchupCounter: 'Noah Eldessouky (#12) establish physical dominance early with firm touchline tackles.',
      keyStats: { goals: 2, assists: 3, duelsWonPct: 52, savesOrTackles: '2.6 dribbles/gm' }
    }
  ],

  'rutgers-prep': [
    {
      id: 'rut-8',
      opponentKey: 'rutgers-prep',
      teamName: 'Rutgers Preparatory School',
      number: 8,
      name: 'Alexander Novak',
      position: 'CM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Box-to-Box Midfield Anchor',
      dangerLevel: 'Dangerous',
      traits: 'Tenacious tackler, high-efficiency distributor, sets team tempo',
      strengths: [
        'High motor covering central third',
        'Consistent 85%+ passing accuracy',
        'Commands central communication'
      ],
      vulnerabilities: [
        'Vulnerable to fast counter-attacks when caught ahead of ball',
        'Does not generate high volume of individual shots'
      ],
      currentSeasonNotes: 'Heartbeat of Rutgers Prep’s 4-2-3-1 setup. Controls their Phase 2 buildup.',
      peddieMatchupCounter: 'Rayyaan Mohiuddin (#14) press Novak on his back turn to force hurried errors.',
      keyStats: { goals: 2, assists: 3, duelsWonPct: 64, savesOrTackles: '3.6 tackles/gm' }
    },
    {
      id: 'rut-11',
      opponentKey: 'rutgers-prep',
      teamName: 'Rutgers Preparatory School',
      number: 11,
      name: 'Kofi Mensah',
      position: 'RW',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'10\"",
      dominantFoot: 'Right',
      tacticalRole: 'Direct 1v1 Flank Winger',
      dangerLevel: 'Key Threat',
      traits: 'Rapid acceleration down touchline, dangerous low driven crosses',
      strengths: [
        'Isolates defenders 1v1 on outer wing',
        'High sprinting work rate on counter-attacks'
      ],
      vulnerabilities: [
        'Struggles when defenders stay on feet and do not bite on feints',
        'Limited contribution to defensive corner marking'
      ],
      currentSeasonNotes: 'Veo film 74:20 shows him losing his mark on near-post corner routines.',
      peddieMatchupCounter: 'Noah Eldessouky (#12) play disciplined positional containment against Mensah.',
      keyStats: { goals: 3, assists: 2, duelsWonPct: 55, savesOrTackles: '2.8 dribbles/gm' }
    }
  ],

  'life-center': [
    {
      id: 'lca-9',
      opponentKey: 'life-center',
      teamName: 'Life Center Academy',
      number: 9,
      name: 'Emmanuel Osei',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Right',
      tacticalRole: 'Target Forward & Aerial Battler',
      dangerLevel: 'Dangerous',
      traits: 'Enormous vertical jump, physical box presence, powerful direct shooting',
      strengths: [
        'Dominates aerial duels from direct goalkeeper kicks',
        'Physical shielding of ball inside 18-yard box',
        'Lethal on attacking corner flick-ons'
      ],
      vulnerabilities: [
        'Disconnected from midfield if direct balls are intercepted',
        'Low defensive work rate when out of possession'
      ],
      currentSeasonNotes: 'Primary offensive focal point for LCA. Direct recipient of 20+ clearances per match.',
      peddieMatchupCounter: 'Carson Wiley (#22) contest first header; Owen Bonchev (#8) sweep behind.',
      keyStats: { goals: 6, assists: 1, duelsWonPct: 74, savesOrTackles: '4.8 aerials won/gm' }
    },
    {
      id: 'lca-3',
      opponentKey: 'life-center',
      teamName: 'Life Center Academy',
      number: 3,
      name: 'Lucas Ferreira',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'No-Nonsense Sweeper',
      dangerLevel: 'Key Threat',
      traits: 'Aggressive slide tackler, clears ball directly into opposing half',
      strengths: [
        'High physical commitment in the box',
        'Strong heading clearances under pressure'
      ],
      vulnerabilities: [
        'Prone to lunging into reckless challenges',
        'Huge gaps behind him when twin strikers split his position'
      ],
      currentSeasonNotes: 'Veo clip 58:40 highlights Ferreira leaving 25+ yards of space ahead of him.',
      peddieMatchupCounter: 'Tommy Kim (#28) and Blake Romanelli (#26) use quick passing combinations to bypass his lunges.',
      keyStats: { goals: 1, assists: 0, duelsWonPct: 70, savesOrTackles: '5.2 clearances/gm' }
    }
  ],

  'lawrenceville': [
    {
      id: 'lvr-8',
      opponentKey: 'lawrenceville',
      teamName: 'The Lawrenceville School',
      number: 8,
      name: 'Tristan Sterling',
      position: 'CM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Midfield General & Metronome',
      dangerLevel: 'Dangerous',
      traits: 'Controls match rhythm, high passing range, dangerous direct free kicks',
      strengths: [
        'Orchestrates Big Red’s high press transitions',
        'Excellent switch-play into wide fullbacks',
        'Composed under intense pressing'
      ],
      vulnerabilities: [
        'Susceptible to being dispossessed when closed down from behind',
        'Leaves space behind him when pressing forward'
      ],
      currentSeasonNotes: 'Captain of Big Red. Central figure in MAPL rivalry clash on Sept 26.',
      peddieMatchupCounter: 'Christian Tharney (#13) and Rayyaan Mohiuddin (#14) double-team Sterling on first touch.',
      keyStats: { goals: 3, assists: 6, duelsWonPct: 56, savesOrTackles: '3.4 tackles/gm' }
    },
    {
      id: 'lvr-7',
      opponentKey: 'lawrenceville',
      teamName: 'The Lawrenceville School',
      number: 7,
      name: 'Kai Nakamura',
      position: 'RW',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'9\"",
      dominantFoot: 'Left',
      tacticalRole: 'Inverted Winger & Long-Range Curler',
      dangerLevel: 'Dangerous',
      traits: 'Dribbles inside onto stronger left foot, curling shots from distance, crafty 1v1',
      strengths: [
        'High conversion on left-footed curling efforts from 20 yards',
        'Combines well with overlapping right fullback',
        'High acceleration over first 10 yards'
      ],
      vulnerabilities: [
        'Reluctant to use right foot on outside touchline runs',
        'Easily frustrated by physical bump challenges'
      ],
      currentSeasonNotes: 'Scored 4 goals in early MAPL action. Veo clip 16:30.',
      peddieMatchupCounter: 'Noah Eldessouky (#12) force Kai to his right and deny any inside shooting angles.',
      keyStats: { goals: 4, assists: 3, duelsWonPct: 53, savesOrTackles: '3.2 shots/gm' }
    },
    {
      id: 'lvr-9',
      opponentKey: 'lawrenceville',
      teamName: 'The Lawrenceville School',
      number: 9,
      name: 'Christian Bradley',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Relentless Pressing Forward & Poacher',
      dangerLevel: 'Key Threat',
      traits: 'Continuous pressure on backline, clinical one-touch reactions in penalty area',
      strengths: [
        'Forces turnovers through tireless pressing of opposing goalkeepers',
        'Opportunistic rebound conversions',
        'High motor across all 80 minutes'
      ],
      vulnerabilities: [
        'Prone to straying offside when timing vertical runs',
        'Struggles in aerial duels against dominant center backs'
      ],
      currentSeasonNotes: 'Tireless runner who capitalizes on loose backpasses.',
      peddieMatchupCounter: 'Carson Wiley (#22) maintain disciplined defensive depth and avoid blind backpasses.',
      keyStats: { goals: 5, assists: 2, duelsWonPct: 49, savesOrTackles: '2.1 tackles/gm' }
    }
  ],

  'delran': [
    {
      id: 'del-10',
      opponentKey: 'delran',
      teamName: 'Delran High School',
      number: 10,
      name: 'Dominic Rossi',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Ferocious Complete Striker',
      dangerLevel: 'Elite',
      traits: 'Ruthless finisher, aggressive pressing, explosive work rate in "Soccertown USA"',
      strengths: [
        'Clinical scoring from all angles inside and outside box',
        'Never stops running; contests every ball with 100% commitment',
        'Powerful header of the ball on set pieces'
      ],
      vulnerabilities: [
        'Prone to emotional reactions and yellow cards if denied fouls',
        'Can overcommit into attacking third when team is pinned back'
      ],
      currentSeasonNotes: 'South Jersey Group 2 star forward. High-volume shooter (4.8 shots/gm).',
      peddieMatchupCounter: 'Owen Bonchev (#8) and Carson Wiley (#22) must double Dominic and match his physical bite.',
      keyStats: { goals: 8, assists: 3, duelsWonPct: 65, savesOrTackles: '4.8 shots/gm' }
    },
    {
      id: 'del-6',
      opponentKey: 'delran',
      teamName: 'Delran High School',
      number: 6,
      name: 'Gavin Miller',
      position: 'CM',
      line: 'MID',
      classYear: 'Senior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Hard-Tackling Midfield Enforcer',
      dangerLevel: 'Dangerous',
      traits: 'Captain, crushing slide tackles, directs Delran’s relentless pressing waves',
      strengths: [
        'Dominates 50/50 midfield duels with overwhelming physicality',
        'High stamina and leadership on the field',
        'Direct set-piece specialist with cannon shot'
      ],
      vulnerabilities: [
        'Can be bypassed with rapid 1-2 one-touch wall passes',
        'Lacks finesse in tight defensive pockets'
      ],
      currentSeasonNotes: 'Veo film 12:50 highlights Miller winning 7 consecutive duels in central midfield.',
      peddieMatchupCounter: 'Christian Tharney (#13) and Brody Rozo (#18) must meet Miller with equal steel and discipline.',
      keyStats: { goals: 2, assists: 4, duelsWonPct: 76, savesOrTackles: '5.1 tackles/gm' }
    },
    {
      id: 'del-4',
      opponentKey: 'delran',
      teamName: 'Delran High School',
      number: 4,
      name: 'Braeden Kelly',
      position: 'CB',
      line: 'DEF',
      classYear: 'Junior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Aerial Target on Set Pieces & Stopper',
      dangerLevel: 'Key Threat',
      traits: 'Dominant header, target on attacking free kicks, aggressive clearance specialist',
      strengths: [
        'Scores headers off whipped far-post set pieces (Veo clip 67:20)',
        'Physical obstruction inside the penalty box'
      ],
      vulnerabilities: [
        'Slow recovery turning when attacked with vertical through-balls',
        'Vulnerable to clever cutbacks at the penalty spot'
      ],
      currentSeasonNotes: 'Major aerial threat on every Delran corner and long throw.',
      peddieMatchupCounter: 'Dylan McKenzie (#98) punch clear on high balls; Bonchev body-check Kelly on runs.',
      keyStats: { goals: 3, assists: 1, duelsWonPct: 78, savesOrTackles: '6.0 clearances/gm' }
    }
  ],

  'mercersburg': [
    {
      id: 'mer-10',
      opponentKey: 'mercersburg',
      teamName: 'Mercersburg Academy',
      number: 10,
      name: 'Felix Schneider',
      position: 'CM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'10\"",
      dominantFoot: 'Right',
      tacticalRole: 'Midfield Playmaker & Free Kick Specialist',
      dangerLevel: 'Dangerous',
      traits: 'European passing technique, wide vision, accurate dead-ball delivery',
      strengths: [
        'Pinpoint passing range from 40-yard diagonal switches',
        'Dangerous on curling free kicks from 20-25 yards',
        'Composed under medium pressure'
      ],
      vulnerabilities: [
        'Struggles when denied space by aggressive man-markers',
        'Low tracking speed on defensive recoveries'
      ],
      currentSeasonNotes: 'Primary creative outlet for Mercersburg’s 4-3-3 setup.',
      peddieMatchupCounter: 'Rayyaan Mohiuddin (#14) stay tight to Schneider and deny him time to look up.',
      keyStats: { goals: 3, assists: 5, duelsWonPct: 53, savesOrTackles: '86% pass pct' }
    },
    {
      id: 'mer-9',
      opponentKey: 'mercersburg',
      teamName: 'Mercersburg Academy',
      number: 9,
      name: 'Alexander Cole',
      position: 'ST',
      line: 'FWD',
      classYear: 'Junior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Hold-up Striker',
      dangerLevel: 'Key Threat',
      traits: 'Good box link play, physical hold-up, aerial presence on corners',
      strengths: [
        'Protects the ball with back to goal',
        'Dangerous on far-post crosses'
      ],
      vulnerabilities: [
        'Lacks explosive sprint speed in open field',
        'Center-back twin splits him easily (Veo film 61:40)'
      ],
      currentSeasonNotes: 'Scored 2 goals in early PA prep league action.',
      peddieMatchupCounter: 'Carson Wiley (#22) deny him clean turns inside the 18.',
      keyStats: { goals: 2, assists: 2, duelsWonPct: 55, savesOrTackles: '2.0 shots/gm' }
    }
  ],

  'wilberforce': [
    {
      id: 'wlb-10',
      opponentKey: 'wilberforce',
      teamName: 'The Wilberforce School',
      number: 10,
      name: 'Caleb Wright',
      position: 'ST',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'10\"",
      dominantFoot: 'Right',
      tacticalRole: 'Counter-Attack Lone Forward',
      dangerLevel: 'Key Threat',
      traits: 'Quick counter runner, powerful shot from distance, high effort',
      strengths: [
        'Capitalizes quickly on opposing defensive mistakes',
        'Dangerous from 20-25 yards on speculative strikes',
        'Relentless lone press on opposing center backs'
      ],
      vulnerabilities: [
        'Isolated for long stretches due to team’s deep low block',
        'Limited support runners arriving in time'
      ],
      currentSeasonNotes: 'Sole attacking outlet for Wilberforce’s deep 4-4-2 shell.',
      peddieMatchupCounter: 'Gabriel Lam (#5) and Wyatt Raya (#2) snuff out early clearances to Caleb.',
      keyStats: { goals: 4, assists: 0, duelsWonPct: 46, savesOrTackles: '2.5 shots/gm' }
    }
  ],

  'hill': [
    {
      id: 'hil-4',
      opponentKey: 'hill',
      teamName: 'The Hill School',
      number: 4,
      name: 'Rowan MacCallum',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Right',
      tacticalRole: 'Captain & Aerial Stopper',
      dangerLevel: 'Elite',
      traits: 'Colossus in the air, vocal commander, tough tackling inside penalty box',
      strengths: [
        'Wins virtually every aerial ball inside his 18-yard box',
        'Vocal leadership that organizes Hill’s stingy defensive shape',
        'Direct threat on offensive set-piece headers'
      ],
      vulnerabilities: [
        'Vulnerable to ground cutbacks to 18-yard arc (Veo film 55:10)',
        'Struggles with dynamic lateral pace of smaller, agile forwards'
      ],
      currentSeasonNotes: 'Anchors the Blues backline. Grudge match leader for Keystone MAPL clash.',
      peddieMatchupCounter: 'Avoid floating high crosses to MacCallum. Work cutbacks to Mohiuddin and Tharney.',
      keyStats: { goals: 2, assists: 0, duelsWonPct: 83, savesOrTackles: '5.6 clearances/gm' }
    },
    {
      id: 'hil-10',
      opponentKey: 'hill',
      teamName: 'The Hill School',
      number: 10,
      name: 'Aidan O’Connor',
      position: 'CAM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Direct Free-Kick Specialist & Transition Trigger',
      dangerLevel: 'Dangerous',
      traits: 'Lethal from 20-30 yards on direct free kicks, physical competitor, clever through balls',
      strengths: [
        'Converted 3 direct free kicks this season',
        'Dangerous long throw-in delivery into 6-yard box',
        'Physical competitor who thrives in gritty rivalry matches'
      ],
      vulnerabilities: [
        'Tends to commit late fouls when bypassed',
        'Leaves central passing lanes open when pressing forward'
      ],
      currentSeasonNotes: 'Key set-piece orchestrator for Hill School. Veo clip 17:40.',
      peddieMatchupCounter: 'Do not concede cheap fouls within 30 yards. Christian Tharney (#13) step to block his lanes.',
      keyStats: { goals: 4, assists: 4, duelsWonPct: 58, savesOrTackles: '2.8 fouls drawn/gm' }
    }
  ],

  'wwps': [
    {
      id: 'wwp-7',
      opponentKey: 'wwps',
      teamName: 'West Windsor-Plainsboro South',
      number: 7,
      name: 'Aditya Sharma',
      position: 'LW',
      line: 'FWD',
      classYear: 'Senior',
      height: "5'10\"",
      dominantFoot: 'Right',
      tacticalRole: 'Tricky 1v1 Inverted Winger',
      dangerLevel: 'Elite',
      traits: 'MLS NEXT academy pedigree, lightning quick stepovers, cuts inside to shoot',
      strengths: [
        'Elite 1v1 dribbler with high success rate along touchline',
        'Curling shots into far upper netting',
        'Fluid positional rotation with attacking midfielder'
      ],
      vulnerabilities: [
        'Can hold the ball too long and ignore open teammates',
        'Does not track back when fullbacks overlap past him'
      ],
      currentSeasonNotes: 'Premier public school talent in Mercer County. Scored 6 goals in early season.',
      peddieMatchupCounter: 'Gabriel Lam (#5) show Sharma outside and do not commit early on his feints.',
      keyStats: { goals: 6, assists: 3, duelsWonPct: 62, savesOrTackles: '4.5 dribbles/gm' }
    },
    {
      id: 'wwp-10',
      opponentKey: 'wwps',
      teamName: 'West Windsor-Plainsboro South',
      number: 10,
      name: 'Marcus Chen',
      position: 'CM',
      line: 'MID',
      classYear: 'Junior',
      height: "5'9\"",
      dominantFoot: 'Both',
      tacticalRole: 'Playmaking Maestro',
      dangerLevel: 'Dangerous',
      traits: 'Smooth ball manipulation, through-ball vision, positional interchange',
      strengths: [
        'Controls tempo of WW-P South positional play',
        'Dangerous combination passing in final third'
      ],
      vulnerabilities: [
        'Leaves only one defender back on attacking corners (Veo film 63:15)',
        'Physically vulnerable to aggressive midfield body contact'
      ],
      currentSeasonNotes: 'Creates rapid passing triangles with Sharma and overlapping fullbacks.',
      peddieMatchupCounter: 'Blake Romanelli (#26) and Bennett Cuchera (#7) punish their high fullbacks on turnovers.',
      keyStats: { goals: 3, assists: 5, duelsWonPct: 50, savesOrTackles: '89% pass pct' }
    }
  ],

  'hopewell': [
    {
      id: 'hvc-9',
      opponentKey: 'hopewell',
      teamName: 'Hopewell Valley Central High School',
      number: 9,
      name: 'Trevor Bennett',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Physical Power Forward',
      dangerLevel: 'Dangerous',
      traits: 'Relentless motor, powerful strike from distance, physical target',
      strengths: [
        'Scores from distance with cannon right-footed drive',
        'Bulldozes through soft challenges',
        'Presses high in dual-forward front line'
      ],
      vulnerabilities: [
        'Heavy first touch when receiving under tight backline pressure',
        'Low defensive tracking speed'
      ],
      currentSeasonNotes: 'Leads Bulldogs attack. Direct physical threat on long throw-ins.',
      peddieMatchupCounter: 'Carson Wiley (#22) and Owen Bonchev (#8) win the physical battle with clean anticipation.',
      keyStats: { goals: 5, assists: 2, duelsWonPct: 60, savesOrTackles: '3.6 shots/gm' }
    },
    {
      id: 'hvc-5',
      opponentKey: 'hopewell',
      teamName: 'Hopewell Valley Central High School',
      number: 5,
      name: 'Liam Sullivan',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Aggressive Backline Stopper',
      dangerLevel: 'Key Threat',
      traits: 'Dominant header, vocal defensive organizer, strong tackling',
      strengths: [
        'Wins aerial balls from opponent goal kicks',
        'Aggressive physical marking inside 18'
      ],
      vulnerabilities: [
        'Disconnected from midfield when team presses high (Veo film 54:20)',
        'Leaves 20 yards of space for opposing #10'
      ],
      currentSeasonNotes: 'Veo film highlights disconnect between Sullivan’s backline and forward press.',
      peddieMatchupCounter: 'Rayyaan Mohiuddin (#14) exploit the 20-yard gap in front of Sullivan with one-touch combinations.',
      keyStats: { goals: 1, assists: 0, duelsWonPct: 73, savesOrTackles: '4.5 clearances/gm' }
    }
  ],

  'pennington': [
    {
      id: 'pen-10',
      opponentKey: 'pennington',
      teamName: 'The Pennington School',
      number: 10,
      name: 'Lucas DeSilva',
      position: 'CAM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Both',
      tacticalRole: 'Division 1 Commit & Complete Attacking Midfield Maestro',
      dangerLevel: 'Elite',
      traits: 'D1 commit, elite ball manipulation, defense-splitting passes, instant transition trigger',
      strengths: [
        'Unlocks any backline with disguised no-look through-balls',
        'Lethal finishing from top of the box with either foot',
        'Directs Pennington’s 4-man Gegenpressing swarm'
      ],
      vulnerabilities: [
        'Can overcommit forward on Gegenpress, leaving weak-side open to diagonal switches',
        'Rarely defends behind the midfield circle'
      ],
      currentSeasonNotes: 'Nationally ranked prospect. Orchestrates Pennington’s top-10 offense. Veo clip 09:40.',
      peddieMatchupCounter: 'Christian Tharney (#13) and Noah Eldessouky (#12) anchor central recovery and deny DeSilva half-turn entries.',
      keyStats: { goals: 9, assists: 8, duelsWonPct: 62, savesOrTackles: '4.2 key passes/gm' }
    },
    {
      id: 'pen-9',
      opponentKey: 'pennington',
      teamName: 'The Pennington School',
      number: 9,
      name: 'Mateo Barbosa',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Elite Finisher & Box Poacher',
      dangerLevel: 'Elite',
      traits: 'D1 commit, lightning first-touch finish, predatory instinct, explosive acceleration',
      strengths: [
        'Averages 1.2 goals per game against top prep competition',
        'Lethal inside 18-yard box with minimal service needed',
        'High closing speed on loose backpasses'
      ],
      vulnerabilities: [
        'Struggles when isolated from DeSilva’s interior service',
        'Frustrated by disciplined zonal defending without biting on runs'
      ],
      currentSeasonNotes: 'Scored 11 goals in early national showcase tournaments.',
      peddieMatchupCounter: 'Owen Bonchev (#8) and Carson Wiley (#22) maintain strict zonal depth and deny Barbosa 1v1 isolations.',
      keyStats: { goals: 11, assists: 4, duelsWonPct: 58, savesOrTackles: '4.0 shots/gm' }
    },
    {
      id: 'pen-4',
      opponentKey: 'pennington',
      teamName: 'The Pennington School',
      number: 4,
      name: 'Gabriel Morales',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Athletic Stopper with Recovery Pace',
      dangerLevel: 'Dangerous',
      traits: 'D1 caliber recovery speed, dominant in air, calm under backline pressure',
      strengths: [
        'Recovers to make goal-line slide saves',
        'Wins 82% of defensive headers on corners',
        'High football IQ in timing offside traps'
      ],
      vulnerabilities: [
        'Fatigue in late game (80\'+) causes flat-footed reactions (Veo film 82:10)',
        'Weak-side exposed when counter-press shifts ball-side'
      ],
      currentSeasonNotes: 'Veo film 38:25 reveals Pennington counter-press overcommitting to ball side, leaving weak side completely open.',
      peddieMatchupCounter: 'Immediate diagonal switches from Tharney (#13) to Cuchera (#7) or Romanelli (#26) on the weak side.',
      keyStats: { goals: 2, assists: 1, duelsWonPct: 82, savesOrTackles: '4.8 clearances/gm' }
    }
  ],

  'hun': [
    {
      id: 'hun-10',
      opponentKey: 'hun',
      teamName: 'The Hun School',
      number: 10,
      name: 'Santiago Alvarez',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Explosive Dynamic Striker',
      dangerLevel: 'Elite',
      traits: 'Blistering acceleration, dangerous dribbler in transition, lethal inside 18',
      strengths: [
        'Exploits any gap in opposing center-back pairing',
        'Direct dribbling at center-backs forces fouls and cards',
        'High conversion rate on 1v1 chances against goalkeepers'
      ],
      vulnerabilities: [
        'Does not contest high goal kicks against physical center-backs',
        'Can be neutralized by body-checking before he accelerates'
      ],
      currentSeasonNotes: 'Leading scorer for Hun. Focal point of their 3-5-2 counter-attacking system.',
      peddieMatchupCounter: 'Carson Wiley (#22) must step into Alvarez before he can turn and face forward.',
      keyStats: { goals: 7, assists: 3, duelsWonPct: 56, savesOrTackles: '3.9 shots/gm' }
    },
    {
      id: 'hun-5',
      opponentKey: 'hun',
      teamName: 'The Hun School',
      number: 5,
      name: 'Nicholas Taylor',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Right',
      tacticalRole: 'Central Stopper in 3-Back System',
      dangerLevel: 'Dangerous',
      traits: 'Tall physical anchor, strong tackling, directs back 3 shape',
      strengths: [
        'Dominant in central air duels',
        'Hard tackling that discourages central entries'
      ],
      vulnerabilities: [
        'Slow lateral rotation when wingbacks are caught upfield (Veo film 42:30)',
        'Vulnerable to cutbacks at 18-yard arc'
      ],
      currentSeasonNotes: 'Veo film highlights massive space behind Hun wingbacks on turnovers.',
      peddieMatchupCounter: 'Isolate outer center-backs with Cuchera and Romanelli; cut back to Mohiuddin.',
      keyStats: { goals: 1, assists: 1, duelsWonPct: 77, savesOrTackles: '5.4 clearances/gm' }
    }
  ],

  'blair': [
    {
      id: 'blr-9',
      opponentKey: 'blair',
      teamName: 'Blair Academy',
      number: 9,
      name: 'Gunnar Henderson',
      position: 'ST',
      line: 'FWD',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Right',
      tacticalRole: 'Target Striker & Aerial Colossus',
      dangerLevel: 'Elite',
      traits: 'Dominant aerial target, direct recipient of long goal kicks, physical box battler',
      strengths: [
        'Controls direct 60-yard goalkeeper punts on his chest (Veo film 11:20)',
        'Flicks headers into path of sprinting wingers',
        'Dominates the 6-yard box on corners and long throw-ins'
      ],
      vulnerabilities: [
        'Lacks foot speed to chase down loose balls in space',
        'Struggles when double-teamed by aggressive front-and-back marking'
      ],
      currentSeasonNotes: '123rd Peddie-Blair Day main weapon. Everything in Blair’s 4-4-2 runs directly through Gunnar.',
      peddieMatchupCounter: 'Carson Wiley (#22) and Owen Bonchev (#8) double-team Henderson in the air; Christian Tharney (#13) sweeps knockdowns.',
      keyStats: { goals: 6, assists: 4, duelsWonPct: 76, savesOrTackles: '5.2 aerials won/gm' }
    },
    {
      id: 'blr-10',
      opponentKey: 'blair',
      teamName: 'Blair Academy',
      number: 10,
      name: 'Brody Campbell',
      position: 'CM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Set-Piece Taker & Long-Throw Specialist',
      dangerLevel: 'Dangerous',
      traits: 'Rory Delap style long throw-ins into 6-yard box, set-piece specialist, midfield enforcer',
      strengths: [
        'Direct long throw-ins reach 35+ yards right into the penalty spot (Veo film 63:10)',
        'Accurate inswinging corner deliveries',
        'Hard physical challenges that ignite rivalry intensity'
      ],
      vulnerabilities: [
        'Vulnerable to fast counter-attacks through his channel when he steps high',
        'Prone to emotional fouls during Peddie-Blair Day clashes'
      ],
      currentSeasonNotes: 'Blair’s set-piece catalyst. Long throw-ins are equivalent to corners.',
      peddieMatchupCounter: 'Dylan McKenzie (#98) punch clear on throw-ins; match his physical intensity with Brody Rozo (#18).',
      keyStats: { goals: 2, assists: 5, duelsWonPct: 61, savesOrTackles: '4.0 throw-ins into box/gm' }
    },
    {
      id: 'blr-11',
      opponentKey: 'blair',
      teamName: 'Blair Academy',
      number: 11,
      name: 'Tyler Vance',
      position: 'LW',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'10\"",
      dominantFoot: 'Left',
      tacticalRole: 'Direct Transition Runner',
      dangerLevel: 'Key Threat',
      traits: 'Speed in transition, opportunistic runner onto Gunnar flick-ons, aggressive crosser',
      strengths: [
        'Quick timing onto second balls off Gunnar’s headers',
        'Whips dangerous early crosses into the penalty spot'
      ],
      vulnerabilities: [
        'Fails to track back in defensive transition, leaving his flank isolated (Veo film 36:45)',
        'Can be dispossessed by aggressive first-touch tackles'
      ],
      currentSeasonNotes: 'Veo film highlights wide gaps behind Vance when he pushes up on counter-attacks.',
      peddieMatchupCounter: 'Gabriel Lam (#5) win first contact; Bennett Cuchera (#7) punish the vacated flank.',
      keyStats: { goals: 3, assists: 2, duelsWonPct: 51, savesOrTackles: '2.4 crosses/gm' }
    },
    {
      id: 'blr-1',
      opponentKey: 'blair',
      teamName: 'Blair Academy',
      number: 1,
      name: 'Mason Wright',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Traditional Shot-Stopper & Direct Punter',
      dangerLevel: 'Tactical Pivot',
      traits: 'Cannon-leg punts, aggressive on high crosses, vocal leader from back',
      strengths: [
        'Punts ball 70+ yards directly into attacking third',
        'Solid reflex stops on long-range strikes'
      ],
      vulnerabilities: [
        'Uncomfortable playing out from back with short passes',
        'Vulnerable to low cutback finishes inside the post'
      ],
      currentSeasonNotes: 'Bypasses midfield with direct punts toward Henderson.',
      peddieMatchupCounter: 'Press him into rushed kicks; win the second balls on the midfield bounce.',
      keyStats: { goals: 0, assists: 1, duelsWonPct: 80, savesOrTackles: '78% save pct' }
    }
  ]
};

export const ALL_OPPONENT_PLAYER_REPORTS: OpponentPlayerReport[] = Object.values(
  OPPONENT_PLAYER_SCOUTING_REPORTS
).flat();

export function getOpponentPlayers(opponentKey: string): OpponentPlayerReport[] {
  return OPPONENT_PLAYER_SCOUTING_REPORTS[opponentKey] || [];
}
