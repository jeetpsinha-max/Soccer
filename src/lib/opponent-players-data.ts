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
      filmUrl: 'https://fan.hudl.com/usa/pa/haverford/organization/16669/haverford-school',
      profileUrl: 'https://www.maxpreps.com/pa/haverford/haverford-school-fords/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/pa/haverford/organization/16669/haverford-school',
      profileUrl: 'https://www.maxpreps.com/pa/haverford/haverford-school-fords/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/pa/haverford/organization/16669/haverford-school',
      profileUrl: 'https://www.maxpreps.com/pa/haverford/haverford-school-fords/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/pa/haverford/organization/16669/haverford-school',
      profileUrl: 'https://www.maxpreps.com/pa/haverford/haverford-school-fords/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/pa/haverford/organization/16669/haverford-school',
      profileUrl: 'https://www.maxpreps.com/pa/haverford/haverford-school-fords/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/edison/organization/21175/st-thomas-aquinas-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/edison/st-thomas-aquinas-trojans/soccer/26-27/schedule/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/edison/organization/21175/st-thomas-aquinas-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/edison/st-thomas-aquinas-trojans/soccer/26-27/schedule/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/edison/organization/21175/st-thomas-aquinas-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/edison/st-thomas-aquinas-trojans/soccer/26-27/schedule/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/edison/organization/21175/st-thomas-aquinas-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/edison/st-thomas-aquinas-trojans/soccer/26-27/schedule/',
      keyStats: { goals: 0, assists: 2, duelsWonPct: 49, savesOrTackles: '1.9 clearances/gm' }
    },
    {
      id: 'sta-1',
      opponentKey: 'aquinas',
      teamName: 'St. Thomas Aquinas Trojans',
      number: 1,
      name: 'Julian Moretti',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Agile Shot Stopper & Near-Post Commander',
      dangerLevel: 'Key Threat',
      traits: 'High reaction agility on low strikes, vocal organizer of 4-man low block',
      strengths: [
        'Quick reflex dives against low driven shots to corners',
        'Strong commanding presence inside the 6-yard box'
      ],
      vulnerabilities: [
        'Uncomfortable playing under high press with ball at his feet',
        'Conceded 81st minute header to Carson Wiley (#22) on Tharney set piece'
      ],
      currentSeasonNotes: 'Starting keeper who faced 14 Peddie shots in Sept 5 clash. Beaten by Wiley\'s late header.',
      peddieMatchupCounter: 'Christian Tharney (#13) whipped set pieces into 6-yard cluster; Wiley and Eldessouky crash frame.',
      filmUrl: 'https://fan.hudl.com/usa/nj/edison/organization/21175/st-thomas-aquinas-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/edison/st-thomas-aquinas-trojans/soccer/26-27/schedule/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 67, savesOrTackles: '74% save pct' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/trenton/organization/14878/trenton-central-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/trenton/trenton-central-tornadoes/soccer/boys/schedule/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/trenton/organization/14878/trenton-central-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/trenton/trenton-central-tornadoes/soccer/boys/schedule/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/trenton/organization/14878/trenton-central-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/trenton/trenton-central-tornadoes/soccer/boys/schedule/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 71, savesOrTackles: '4.8 clearances/gm' }
    },
    {
      id: 'tch-1',
      opponentKey: 'christian-school',
      teamName: 'Trenton Catholic Academy Iron Mikes',
      number: 1,
      name: 'Dante Vasquez',
      position: 'GK',
      line: 'GK',
      classYear: 'Junior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Reflex Shot Stopper & Scramble Netminder',
      dangerLevel: 'Key Threat',
      traits: 'Bravery in 1v1 collisions, athletic spring, commands goal line',
      strengths: [
        'Exceptional recovery speed on second-chance shots',
        'Aggressive diving at feet of attackers in penalty area'
      ],
      vulnerabilities: [
        'Vulnerable to curling far-post bending strikes from wide angles',
        'Spills wet ball rebounds on heavy turf'
      ],
      currentSeasonNotes: 'Faced heavy barrage vs Peddie attack on Sept 9.',
      peddieMatchupCounter: 'Tommy Kim (#28) and Jeffrey Zhang (#17) test Vasquez with early curled efforts.',
      filmUrl: 'https://fan.hudl.com/usa/nj/trenton/organization/14878/trenton-central-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/trenton/trenton-central-tornadoes/soccer/boys/schedule/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 70, savesOrTackles: '72% save pct' }
    },
    {
      id: 'tch-10',
      opponentKey: 'christian-school',
      teamName: 'Trenton Catholic Academy Iron Mikes',
      number: 10,
      name: 'Malik Robinson',
      position: 'CAM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'9\"",
      dominantFoot: 'Right',
      tacticalRole: 'Transition Distributor & Dribbling Threat',
      dangerLevel: 'Dangerous',
      traits: 'Explosive burst in tight quarters, tricky change of pace, central playmaker',
      strengths: [
        'Quick turns under pressure to spark vertical counter-attacks',
        'Accurate through-balls slicing between opposing fullbacks'
      ],
      vulnerabilities: [
        'Low work rate tracking back when play transitions',
        'Frustrated by aggressive physical containment'
      ],
      currentSeasonNotes: 'Focal point of Trenton Catholic counter-attacking system.',
      peddieMatchupCounter: 'Rayyaan Mohiuddin (#14) step in early to break Robinson\'s transitional rhythm.',
      keyStats: { goals: 3, assists: 3, duelsWonPct: 54, savesOrTackles: '1.9 dribbles/gm' },
      filmUrl: 'https://fan.hudl.com/usa/nj/trenton/organization/14878/trenton-central-high-school',

      profileUrl: 'https://www.maxpreps.com/nj/trenton/trenton-central-tornadoes/soccer/boys/schedule/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/trenton/organization/14878/trenton-central-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/trenton/trenton-central-tornadoes/soccer/boys/schedule/',
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
      filmUrl: 'https://fan.hudl.com/usa/pa/newtown/organization/15467/george-school',
      profileUrl: 'https://www.maxpreps.com/pa/newtown/george-school-cougars/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/pa/newtown/organization/15467/george-school',
      profileUrl: 'https://www.maxpreps.com/pa/newtown/george-school-cougars/soccer/',
      keyStats: { goals: 1, assists: 3, duelsWonPct: 53, savesOrTackles: '2.0 crosses/gm' }
    },
    {
      id: 'geo-1',
      opponentKey: 'george-school',
      teamName: 'George School Cougars',
      number: 1,
      name: 'Aidan Gallagher',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Right',
      tacticalRole: 'Commanding Aerial Netminder',
      dangerLevel: 'Dangerous',
      traits: 'Excellent aerial reach on crosses, confident distributor from back, patient communicator',
      strengths: [
        'Snatches high looping service cleanly at maximum height',
        'Calm side-volley distributions initiating counter-attacks'
      ],
      vulnerabilities: [
        'Slower lateral footwork on skidding low grass strikes',
        'Beaten near-post when caught leaning toward center'
      ],
      currentSeasonNotes: 'Anchors George School backline; faced Peddie on Sept 12.',
      peddieMatchupCounter: 'Drive low hard strikes across frame; crash far post for tuck-ins.',
      filmUrl: 'https://fan.hudl.com/usa/pa/newtown/organization/15467/george-school',
      profileUrl: 'https://www.maxpreps.com/pa/newtown/george-school-cougars/soccer/',
      keyStats: { goals: 0, assists: 1, duelsWonPct: 75, savesOrTackles: '76% save pct' }
    },
    {
      id: 'geo-11',
      opponentKey: 'george-school',
      teamName: 'George School Cougars',
      number: 11,
      name: 'Lucas Ferreira',
      position: 'ST',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'11\"",
      dominantFoot: 'Left',
      tacticalRole: 'Direct Channel Runner & Aerial Target',
      dangerLevel: 'Dangerous',
      traits: 'Diagonal channel slicing runs, powerful left-foot strike, high physical motor',
      strengths: [
        'Times diagonal runs across center-backs into blind spots',
        'Dangerous cutting in from right channel onto favored left foot'
      ],
      vulnerabilities: [
        'Rarely uses right foot; predictable when forced wide right',
        'Easily dispossessed when isolated 1v2'
      ],
      currentSeasonNotes: 'Cougars primary goal scorer in FSL action.',
      peddieMatchupCounter: 'Noah Eldessouky (#12) shade Ferreira onto his weaker right foot.',
      filmUrl: 'https://fan.hudl.com/usa/pa/newtown/organization/15467/george-school',
      profileUrl: 'https://www.maxpreps.com/pa/newtown/george-school-cougars/soccer/',
      keyStats: { goals: 4, assists: 2, duelsWonPct: 51, savesOrTackles: '2.4 shots/gm' }
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
      peddieMatchupCounter: 'Jeet Sinha (#6) and Brody Rozo (#18) provide relentless physical midfield pressure while Quinn Wachtveitl (#10) pins their center-backs.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/18654/princeton-day-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/princeton-day-panthers/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/18654/princeton-day-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/princeton-day-panthers/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/18654/princeton-day-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/princeton-day-panthers/soccer/',
      keyStats: { goals: 2, assists: 3, duelsWonPct: 52, savesOrTackles: '2.6 dribbles/gm' }
    },
    {
      id: 'pds-1',
      opponentKey: 'pds',
      teamName: 'Princeton Day School Panthers',
      number: 1,
      name: 'Oliver Stern',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Sweeper Keeper & Distribution Hub',
      dangerLevel: 'Dangerous',
      traits: 'High starting position outside penalty box, confident distributor under pressure',
      strengths: [
        'Rushes off line rapidly to sweep through-balls',
        'Comfortable pinging 40-yard driven passes into midfield'
      ],
      vulnerabilities: [
        'Conceded 4 goals to Peddie on Sept 16, including Sinha\'s 64\' curling strike',
        'Susceptible to chip attempts when positioned 18 yards off his line'
      ],
      currentSeasonNotes: 'Struggled against Peddie\'s rapid wing switches and Tommy Kim\'s clinical finishing.',
      peddieMatchupCounter: 'Press Stern vigorously when PDS plays out from back to force hurried clearances.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/18654/princeton-day-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/princeton-day-panthers/soccer/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 64, savesOrTackles: '68% save pct' }
    },
    {
      id: 'pds-9',
      opponentKey: 'pds',
      teamName: 'Princeton Day School Panthers',
      number: 9,
      name: 'Henry Wallace',
      position: 'ST',
      line: 'FWD',
      classYear: 'Junior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Physical Target Forward & Box Presence',
      dangerLevel: 'Key Threat',
      traits: 'Combative aerial presence, holds up play with back to goal, dangerous on corners',
      strengths: [
        'Wins flick-ons to release secondary runners',
        'Scored 2 goals vs Peddie in Sept 16 contest'
      ],
      vulnerabilities: [
        'Lacks pace to outrun Peddie backline over 30+ yards',
        'Struggles when denied early physical contact'
      ],
      currentSeasonNotes: 'Scored both PDS goals in Peddie\'s 4-2 victory.',
      peddieMatchupCounter: 'Carson Wiley (#22) deny Wallace body contact and contest first ball early.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/18654/princeton-day-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/princeton-day-panthers/soccer/',
      keyStats: { goals: 5, assists: 1, duelsWonPct: 59, savesOrTackles: '2.8 aerial duels/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/somerset/organization/18274/rutgers-preparatory-school',
      profileUrl: 'https://www.maxpreps.com/nj/somerset/rutgers-prep-argonauts/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/somerset/organization/18274/rutgers-preparatory-school',
      profileUrl: 'https://www.maxpreps.com/nj/somerset/rutgers-prep-argonauts/soccer/',
      keyStats: { goals: 3, assists: 2, duelsWonPct: 55, savesOrTackles: '2.8 dribbles/gm' }
    },
    {
      id: 'rut-1',
      opponentKey: 'rutgers-prep',
      teamName: 'Rutgers Preparatory School Argonauts',
      number: 1,
      name: 'Evan Goldberg',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Athletic Shot Stopper & Box Commander',
      dangerLevel: 'Dangerous',
      traits: 'Sharp lateral spring, aggressive puncher on set-piece scrums, commanding vocal tone',
      strengths: [
        'Reflex stops on close-range headers',
        'Commands defensive wall setup with precision'
      ],
      vulnerabilities: [
        'Slow to get down to low skimming balls on wet grass',
        'Prone to mistimed punches on swirling windy deliveries'
      ],
      currentSeasonNotes: 'Senior leader for Rutgers Prep with 3 clean sheets this fall.',
      peddieMatchupCounter: 'Low driven strikes from distance; Jeffrey Zhang (#17) and Jeet Sinha (#6) follow in for rebounds.',
      filmUrl: 'https://fan.hudl.com/usa/nj/somerset/organization/18274/rutgers-preparatory-school',
      profileUrl: 'https://www.maxpreps.com/nj/somerset/rutgers-prep-argonauts/soccer/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 76, savesOrTackles: '80% save pct' }
    },
    {
      id: 'rut-4',
      opponentKey: 'rutgers-prep',
      teamName: 'Rutgers Preparatory School Argonauts',
      number: 4,
      name: 'Christian Meyer',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Defensive Anchor & Marking Stopper',
      dangerLevel: 'Key Threat',
      traits: 'Disciplined positioning, heavy tackler, blocks shooting lanes inside 18',
      strengths: [
        'Dominates aerial duels on opposing long punts',
        'Maintains compact central shape under pressure'
      ],
      vulnerabilities: [
        'Vulnerable in 1v1 space when pulled out into wide touchline channels',
        'Limited speed when turned around by quick through-balls'
      ],
      currentSeasonNotes: 'Starting center back who marshals the Argonauts defensive unit.',
      peddieMatchupCounter: 'Tommy Kim (#28) pull Meyer out wide to open central pockets for Mohiuddin (#14).',
      filmUrl: 'https://fan.hudl.com/usa/nj/somerset/organization/18274/rutgers-preparatory-school',
      profileUrl: 'https://www.maxpreps.com/nj/somerset/rutgers-prep-argonauts/soccer/',
      keyStats: { goals: 1, assists: 0, duelsWonPct: 69, savesOrTackles: '4.2 clearances/gm' }
    },
    {
      id: 'rut-9',
      opponentKey: 'rutgers-prep',
      teamName: 'Rutgers Preparatory School Argonauts',
      number: 9,
      name: 'Gabriel Santos',
      position: 'ST',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'10\"",
      dominantFoot: 'Left',
      tacticalRole: 'Explosive Finisher & Pressing Winger/Striker',
      dangerLevel: 'Elite',
      traits: 'Rapid acceleration, precise left-footed curling finishing, high defensive press',
      strengths: [
        'Deadly when cutting inside from right wing onto left foot',
        'Finishes clinically on first touch in transition'
      ],
      vulnerabilities: [
        'Ineffective when forced into touchline corners with right foot',
        'Over-commits to aggressive tackles resulting in cautions'
      ],
      currentSeasonNotes: 'Leading goalscorer for Rutgers Prep with 6 goals in first 5 games.',
      peddieMatchupCounter: 'Noah Eldessouky (#12) show Santos outside touchline; deny inside cutback lane.',
      filmUrl: 'https://fan.hudl.com/usa/nj/somerset/organization/18274/rutgers-preparatory-school',
      profileUrl: 'https://www.maxpreps.com/nj/somerset/rutgers-prep-argonauts/soccer/',
      keyStats: { goals: 6, assists: 2, duelsWonPct: 53, savesOrTackles: '3.1 shots/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/burlington/organization/31754/life-center-academy',
      profileUrl: 'https://www.maxpreps.com/nj/burlington/life-center-academy-warriors/soccer/boys/schedule/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/burlington/organization/31754/life-center-academy',
      profileUrl: 'https://www.maxpreps.com/nj/burlington/life-center-academy-warriors/soccer/boys/schedule/',
      keyStats: { goals: 1, assists: 0, duelsWonPct: 70, savesOrTackles: '5.2 clearances/gm' }
    },
    {
      id: 'lca-1',
      opponentKey: 'life-center',
      teamName: 'Life Center Academy Warriors',
      number: 1,
      name: 'Mateo Sanchez',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Shot Stopper & Fast Break Distributer',
      dangerLevel: 'Key Threat',
      traits: 'Aggressive diving, long-range throwing to spark wing counters, vocal commander',
      strengths: [
        'Reflex stops from point-blank range',
        '50-yard throwing arm reaching wide wingers immediately'
      ],
      vulnerabilities: [
        'Vulnerable to whipped crosses into the corridor of uncertainty between him and his center-backs',
        'Can be hurried into errant clearances by high press'
      ],
      currentSeasonNotes: 'Next opponent on Sept 22! Film review shows Sanchez favors rolling ball out to right winger.',
      peddieMatchupCounter: 'Jeet Sinha (#6) cut off the rollout lane to LCA\'s right wing immediately upon save.',
      keyStats: { goals: 0, assists: 1, duelsWonPct: 71, savesOrTackles: '75% save pct' },
      filmUrl: 'https://fan.hudl.com/usa/nj/burlington/organization/31754/life-center-academy',

      profileUrl: 'https://www.maxpreps.com/nj/burlington/life-center-academy-warriors/soccer/boys/schedule/',
    },
    {
      id: 'lca-6',
      opponentKey: 'life-center',
      teamName: 'Life Center Academy Warriors',
      number: 6,
      name: 'Kofi Mensah',
      position: 'CDM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Both',
      tacticalRole: 'Physical Ball Winner & Transition Screen',
      dangerLevel: 'Dangerous',
      traits: 'Exceptional tackling range, physically imposing in central duels, breaks lines with power',
      strengths: [
        'Intercepts passes at midfield and drives forward with power',
        'Shields his back four aggressively'
      ],
      vulnerabilities: [
        'Can be caught out of position by rapid wall-passes and 1-2 combinations',
        'Accumulates yellow cards due to late physical tackles'
      ],
      currentSeasonNotes: 'Key engine for LCA. Critical assignment for Sept 22 fixture at Peddie.',
      peddieMatchupCounter: 'Rayyaan Mohiuddin (#14) and Quinn Wachtveitl (#10) quick one-touch passing around Mensah.',
      filmUrl: 'https://fan.hudl.com/usa/nj/burlington/organization/31754/life-center-academy',
      profileUrl: 'https://www.maxpreps.com/nj/burlington/life-center-academy-warriors/soccer/boys/schedule/',
      keyStats: { goals: 2, assists: 2, duelsWonPct: 68, savesOrTackles: '3.8 tackles/gm' }
    },
    {
      id: 'lca-10',
      opponentKey: 'life-center',
      teamName: 'Life Center Academy Warriors',
      number: 10,
      name: 'Lucas DeOliveira',
      position: 'CAM',
      line: 'MID',
      classYear: 'Junior',
      height: "5'9\"",
      dominantFoot: 'Right',
      tacticalRole: 'Technical Playmaker & Free Kick Specialist',
      dangerLevel: 'Elite',
      traits: 'Superb ball mastery, curls dead-ball strikes over the wall, vision in attacking third',
      strengths: [
        'Delivers inch-perfect through-balls behind high defensive lines',
        'Direct free kick danger from anywhere within 25 yards'
      ],
      vulnerabilities: [
        'Dislikes physical body-to-body challenges; fades when marked tightly',
        'Minimal defensive tracking when out of possession'
      ],
      currentSeasonNotes: 'Prime creator for LCA. Peddie must avoid conceding cheap fouls around the penalty arch on Sept 22.',
      peddieMatchupCounter: 'Christian Tharney (#13) step aggressively to deny DeOliveira time to turn and scan.',
      filmUrl: 'https://fan.hudl.com/usa/nj/burlington/organization/31754/life-center-academy',
      profileUrl: 'https://www.maxpreps.com/nj/burlington/life-center-academy-warriors/soccer/boys/schedule/',
      keyStats: { goals: 4, assists: 5, duelsWonPct: 48, savesOrTackles: '2.5 key passes/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/lawrenceville/organization/14867/the-lawrenceville-school',
      profileUrl: 'https://athletics.lawrenceville.org/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/lawrenceville/organization/14867/the-lawrenceville-school',
      profileUrl: 'https://athletics.lawrenceville.org/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/lawrenceville/organization/14867/the-lawrenceville-school',
      profileUrl: 'https://athletics.lawrenceville.org/',
      keyStats: { goals: 5, assists: 2, duelsWonPct: 49, savesOrTackles: '2.1 tackles/gm' }
    },
    {
      id: 'lvr-1',
      opponentKey: 'lawrenceville',
      teamName: 'The Lawrenceville School Big Red',
      number: 1,
      name: 'Henry Fairchild',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Right',
      tacticalRole: 'Composed Modern Sweeper-Keeper',
      dangerLevel: 'Dangerous',
      traits: 'Tall athletic build, crisp distribution from the back, confident on high crosses',
      strengths: [
        'Snuffs out vertical through-balls 20 yards from goal',
        'Pings driven diagonals to wingbacks with great accuracy'
      ],
      vulnerabilities: [
        'Vulnerable when pressed rapidly with his back foot',
        'Susceptible to low strikes tucked into the near side of his diving side'
      ],
      currentSeasonNotes: 'Big Red captain and primary organizer of their disciplined 4-3-3 setup.',
      peddieMatchupCounter: 'High intense press from Tommy Kim (#28) and Jeffrey Zhang (#17) on backpasses to Fairchild.',
      filmUrl: 'https://fan.hudl.com/usa/nj/lawrenceville/organization/14867/the-lawrenceville-school',
      profileUrl: 'https://athletics.lawrenceville.org/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 78, savesOrTackles: '82% save pct' }
    },
    {
      id: 'lvr-4',
      opponentKey: 'lawrenceville',
      teamName: 'The Lawrenceville School Big Red',
      number: 4,
      name: 'Sebastian Cruz',
      position: 'CB',
      line: 'DEF',
      classYear: 'Junior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Physical Ball-Winning Center Back',
      dangerLevel: 'Key Threat',
      traits: 'Dominant aerial leap, rugged tackles, marks opposing center forward closely',
      strengths: [
        'Wins over 75% of defensive aerial headers',
        'Effective at sliding blocks denying goal-bound strikes'
      ],
      vulnerabilities: [
        'Vulnerable to fast wingers cutting across his front shoulder',
        'Can be drawn into rash fouls inside the defensive third'
      ],
      currentSeasonNotes: 'Rivalry match anchor for Lawrenceville. MAPL First Team candidate.',
      peddieMatchupCounter: 'Drag Cruz into wide channels where Bennett Cucchiara (#7) can isolate him 1v1.',
      filmUrl: 'https://fan.hudl.com/usa/nj/lawrenceville/organization/14867/the-lawrenceville-school',
      profileUrl: 'https://athletics.lawrenceville.org/',
      keyStats: { goals: 1, assists: 1, duelsWonPct: 71, savesOrTackles: '4.5 clearances/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/delran/organization/12837/delran-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/delran/delran-bears/soccer/boys/26-27/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/delran/organization/12837/delran-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/delran/delran-bears/soccer/boys/26-27/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/delran/organization/12837/delran-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/delran/delran-bears/soccer/boys/26-27/',
      keyStats: { goals: 3, assists: 1, duelsWonPct: 78, savesOrTackles: '6.0 clearances/gm' }
    },
    {
      id: 'del-1',
      opponentKey: 'delran',
      teamName: 'Delran High School Bears',
      number: 1,
      name: 'Tyler Schmidt',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Traditional Tough Shot Stopper',
      dangerLevel: 'Key Threat',
      traits: 'Aggressive puncher on crosses, vocal South Jersey leadership, fearless in scrums',
      strengths: [
        'Outstanding reflex stops on near-post headers',
        'Commands physical box presence in chaotic scrambles'
      ],
      vulnerabilities: [
        'Punches crosses rather than catching, creating secondary rebound chances',
        'Struggles with turf backpasses on poor field surfaces'
      ],
      currentSeasonNotes: 'South Jersey Group 2 powerhouse anchor. Extremely tough competitor.',
      peddieMatchupCounter: 'Surround Schmidt on corner rebounds; Carson Wiley (#22) and Christian Tharney (#13) crash the 6-yard box.',
      filmUrl: 'https://fan.hudl.com/usa/nj/delran/organization/12837/delran-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/delran/delran-bears/soccer/boys/26-27/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 72, savesOrTackles: '79% save pct' }
    },
    {
      id: 'del-11',
      opponentKey: 'delran',
      teamName: 'Delran High School Bears',
      number: 11,
      name: 'Brendan Kelly',
      position: 'LW',
      line: 'FWD',
      classYear: 'Senior',
      height: "5'10\"",
      dominantFoot: 'Left',
      tacticalRole: 'Pacey Touchline Winger & Crossing Threat',
      dangerLevel: 'Dangerous',
      traits: 'Blistering acceleration down left flank, whips early low-driven crosses, tireless pressing',
      strengths: [
        'Beats fullbacks to the endline with pure acceleration',
        'Delivers dangerous first-time crosses into the corridor of uncertainty'
      ],
      vulnerabilities: [
        'Ineffective when forced onto his weaker right foot',
        'Struggles to retain possession against physical shoulder-to-shoulder tackles'
      ],
      currentSeasonNotes: 'Classic South Jersey direct winger who fuels Delran\'s counter-attack.',
      peddieMatchupCounter: 'Owen Bonchev (#8) and Blake Romanelli (#26) double Kelly early to deny endline crosses.',
      filmUrl: 'https://fan.hudl.com/usa/nj/delran/organization/12837/delran-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/delran/delran-bears/soccer/boys/26-27/',
      keyStats: { goals: 4, assists: 6, duelsWonPct: 52, savesOrTackles: '3.4 crosses/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/pa/mercersburg/organization/16548/mercersburg-academy',
      profileUrl: 'https://www.mercersburg.edu/athletics/teams/boys-varsity-soccer',
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
      filmUrl: 'https://fan.hudl.com/usa/pa/mercersburg/organization/16548/mercersburg-academy',
      profileUrl: 'https://www.mercersburg.edu/athletics/teams/boys-varsity-soccer',
      keyStats: { goals: 2, assists: 2, duelsWonPct: 55, savesOrTackles: '2.0 shots/gm' }
    },
    {
      id: 'mer-1',
      opponentKey: 'mercersburg',
      teamName: 'Mercersburg Academy Blue Storm',
      number: 1,
      name: 'Lars Lindqvist',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'4\"",
      dominantFoot: 'Right',
      tacticalRole: 'Towering Aerial Shot Stopper',
      dangerLevel: 'Dangerous',
      traits: 'European academy background, massive wingspan, calm presence on set pieces',
      strengths: [
        'Catches crosses at highest point over opposing strikers',
        'High positioning cutting down angles in 1v1 breakaways'
      ],
      vulnerabilities: [
        'Slower reactions on low curling strikes tucked into the side netting',
        'Can be rattled by aggressive screeners on corners'
      ],
      currentSeasonNotes: 'Anchors Mercersburg\'s low-block strategy in MAPL play.',
      peddieMatchupCounter: 'Keep shots low and driven; test Lindqvist with curled strikes toward bottom corners.',
      filmUrl: 'https://fan.hudl.com/usa/pa/mercersburg/organization/16548/mercersburg-academy',
      profileUrl: 'https://www.mercersburg.edu/athletics/teams/boys-varsity-soccer',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 80, savesOrTackles: '83% save pct' }
    },
    {
      id: 'mer-4',
      opponentKey: 'mercersburg',
      teamName: 'Mercersburg Academy Blue Storm',
      number: 4,
      name: 'Maximilien Dubois',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Sweeping Center Back & Stopper',
      dangerLevel: 'Key Threat',
      traits: 'Disciplined reader of the game, times last-ditch slide tackles, vocal leader',
      strengths: [
        'Interprets passing lanes to intercept through-balls before they develop',
        'Strong aerial duel success rate on long punts'
      ],
      vulnerabilities: [
        'Lacks sprint recovery speed if caught in a footrace beyond halfway line',
        'Prone to committing tactical fouls when turned'
      ],
      currentSeasonNotes: 'Defensive linchpin for the Blue Storm.',
      peddieMatchupCounter: 'Exploit Dubois\' lack of pace by sending Tommy Kim (#28) behind him on diagonal runs.',
      keyStats: { goals: 1, assists: 0, duelsWonPct: 67, savesOrTackles: '5.1 clearances/gm' },
      filmUrl: 'https://fan.hudl.com/usa/pa/mercersburg/organization/16548/mercersburg-academy',

      profileUrl: 'https://www.mercersburg.edu/athletics/teams/boys-varsity-soccer',
    },
    {
      id: 'mer-8',
      opponentKey: 'mercersburg',
      teamName: 'Mercersburg Academy Blue Storm',
      number: 8,
      name: 'Tobias Becker',
      position: 'CM',
      line: 'MID',
      classYear: 'Junior',
      height: "5'11\"",
      dominantFoot: 'Both',
      tacticalRole: 'Box-to-Box Workhorse',
      dangerLevel: 'Key Threat',
      traits: 'Relentless stamina, covers 11+ km per match, solid two-way contribution',
      strengths: [
        'Disrupts opposing midfield sequences with continuous pressing',
        'Arrives late at the edge of the box for cutback shots'
      ],
      vulnerabilities: [
        'Lacks creative flair to unlock compact low blocks',
        'Can be bypassed with rapid one-touch give-and-gos'
      ],
      currentSeasonNotes: 'Heartbeat of Mercersburg midfield engine.',
      peddieMatchupCounter: 'Jeet Sinha (#6) and Rayyaan Mohiuddin (#14) outmaneuver Becker with rapid triangle passing.',
      filmUrl: 'https://fan.hudl.com/usa/pa/mercersburg/organization/16548/mercersburg-academy',
      profileUrl: 'https://www.mercersburg.edu/athletics/teams/boys-varsity-soccer',
      keyStats: { goals: 2, assists: 3, duelsWonPct: 56, savesOrTackles: '3.1 tackles/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/103452/the-wilberforce-school',
      profileUrl: 'https://www.wilberforce.org/athletics',
      keyStats: { goals: 4, assists: 0, duelsWonPct: 46, savesOrTackles: '2.5 shots/gm' }
    },
    {
      id: 'wlb-1',
      opponentKey: 'wilberforce',
      teamName: 'The Wilberforce School Wolverines',
      number: 1,
      name: 'Samuel Wright',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Disciplined Low Block Shot Stopper',
      dangerLevel: 'Key Threat',
      traits: 'Patient positioning, rarely gets chipped, commands disciplined defense',
      strengths: [
        'Solid handling on routine strikes from outside the 18',
        'Communicates defensive marks clearly to backline'
      ],
      vulnerabilities: [
        'Struggles with rapid ball circulation and quick side-to-side switches',
        'Limited range of distribution beyond mid-field'
      ],
      currentSeasonNotes: 'Under heavy pressure in big matches; reliable when shielded.',
      peddieMatchupCounter: 'Force Wright into continuous lateral shifting with rapid switches from Sinha (#6) to Cucchiara (#7).',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/103452/the-wilberforce-school',
      profileUrl: 'https://www.wilberforce.org/athletics',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 66, savesOrTackles: '72% save pct' }
    },
    {
      id: 'wlb-5',
      opponentKey: 'wilberforce',
      teamName: 'The Wilberforce School Wolverines',
      number: 5,
      name: 'Nathaniel Cole',
      position: 'CB',
      line: 'DEF',
      classYear: 'Junior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Physical Marking Center Back',
      dangerLevel: 'Key Threat',
      traits: 'Grit in tight spaces, stays goal-side of strikers, blocks shots with body',
      strengths: [
        'Committed shot-blocker inside the box',
        'Strong in ground challenges'
      ],
      vulnerabilities: [
        'Lacks recovery speed if beaten on first step',
        'Vulnerable to clever dummy runs and wall passes'
      ],
      currentSeasonNotes: 'Anchors Wilberforce backline.',
      peddieMatchupCounter: 'Tommy Kim (#28) use quick turns and drop deep to pull Cole out of the backline.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/103452/the-wilberforce-school',
      profileUrl: 'https://www.wilberforce.org/athletics',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 63, savesOrTackles: '4.0 clearances/gm' }
    },
    {
      id: 'wlb-8',
      opponentKey: 'wilberforce',
      teamName: 'The Wilberforce School Wolverines',
      number: 8,
      name: 'Micah Adams',
      position: 'CM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'10\"",
      dominantFoot: 'Right',
      tacticalRole: 'Midfield Link & Distributor',
      dangerLevel: 'Key Threat',
      traits: 'High effort, links defense to attack, strikes well from distance',
      strengths: [
        'Accurate intermediate passing into forward feet',
        'Hard working in defensive transitions'
      ],
      vulnerabilities: [
        'Struggles when pressed by athletic midfielders',
        'Can be dispossessed from blind side'
      ],
      currentSeasonNotes: 'Wilberforce primary distributor.',
      peddieMatchupCounter: 'Rayyaan Mohiuddin (#14) press Adams as soon as he receives from his center-backs.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/103452/the-wilberforce-school',
      profileUrl: 'https://www.wilberforce.org/athletics',
      keyStats: { goals: 2, assists: 2, duelsWonPct: 52, savesOrTackles: '2.5 tackles/gm' }
    },
    {
      id: 'wlb-9',
      opponentKey: 'wilberforce',
      teamName: 'The Wilberforce School Wolverines',
      number: 9,
      name: 'Joshua Taylor',
      position: 'ST',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Counter-Attacking Poacher',
      dangerLevel: 'Dangerous',
      traits: 'Hustles down long balls, opportunistic poacher, quick snap-shots',
      strengths: [
        'Scores on second chances in penalty box scrambles',
        'Persistent pressing on opposing center-backs'
      ],
      vulnerabilities: [
        'Isolated easily if Wilberforce is pinned deep',
        'Struggles in physical duels against taller defenders'
      ],
      currentSeasonNotes: 'Leading scorer for Wilberforce.',
      peddieMatchupCounter: 'Carson Wiley (#22) maintain physical dominance and win aerial balls cleanly.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/103452/the-wilberforce-school',
      profileUrl: 'https://www.wilberforce.org/athletics',
      keyStats: { goals: 4, assists: 1, duelsWonPct: 47, savesOrTackles: '2.2 shots/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/pa/pottstown/organization/14862/the-hill-school',
      profileUrl: 'https://www.maxpreps.com/pa/pottstown/hill-school-blues/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/pa/pottstown/organization/14862/the-hill-school',
      profileUrl: 'https://www.maxpreps.com/pa/pottstown/hill-school-blues/soccer/',
      keyStats: { goals: 4, assists: 4, duelsWonPct: 58, savesOrTackles: '2.8 fouls drawn/gm' }
    },
    {
      id: 'hil-1',
      opponentKey: 'hill',
      teamName: 'The Hill School Blues',
      number: 1,
      name: 'Spencer Collins',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Right',
      tacticalRole: 'All-MAPL Shot Stopper & Command Presence',
      dangerLevel: 'Elite',
      traits: 'Elite wingspan, quick drop-step agility, vocal backline leadership, fearless',
      strengths: [
        'Exceptional reflex saves on high-velocity strikes',
        'Dominates the aerial realm inside the 6-yard box'
      ],
      vulnerabilities: [
        'Vulnerable when screened closely by physical attackers on corner kicks',
        'Can be slow to recover when forced to slide out of his box'
      ],
      currentSeasonNotes: 'First Team All-MAPL goalkeeper candidate. Primary reason for Hill\'s low goals against.',
      peddieMatchupCounter: 'Screen Collins aggressively with Carson Wiley (#22) on Tharney corner deliveries.',
      filmUrl: 'https://fan.hudl.com/usa/pa/pottstown/organization/14862/the-hill-school',
      profileUrl: 'https://www.maxpreps.com/pa/pottstown/hill-school-blues/soccer/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 82, savesOrTackles: '84% save pct' }
    },
    {
      id: 'hil-11',
      opponentKey: 'hill',
      teamName: 'The Hill School Blues',
      number: 11,
      name: 'Gavin Hughes',
      position: 'LW',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'10\"",
      dominantFoot: 'Left',
      tacticalRole: 'Dynamic Flank Winger & Crosser',
      dangerLevel: 'Dangerous',
      traits: 'Pacey left-footer, whips dangerous crosses from wide touchline, cuts inside with pace',
      strengths: [
        'Endline speed that challenges opposing fullbacks',
        'Inswinging corner and set-piece delivery'
      ],
      vulnerabilities: [
        'Rarely defends behind midfield line',
        'Can be neutralized by physical body contact early in the match'
      ],
      currentSeasonNotes: 'Primary creative flank outlet for Hill School in MAPL fixtures.',
      peddieMatchupCounter: 'Owen Bonchev (#8) step out to close down Hughes before he can cross.',
      filmUrl: 'https://fan.hudl.com/usa/pa/pottstown/organization/14862/the-hill-school',
      profileUrl: 'https://www.maxpreps.com/pa/pottstown/hill-school-blues/soccer/',
      keyStats: { goals: 3, assists: 5, duelsWonPct: 53, savesOrTackles: '3.1 crosses/gm' }
    },
    {
      id: 'hil-6',
      opponentKey: 'hill',
      teamName: 'The Hill School Blues',
      number: 6,
      name: 'Patrick Brennan',
      position: 'CDM',
      line: 'MID',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Defensive Midfield Screen & Enforcer',
      dangerLevel: 'Dangerous',
      traits: 'Tough tackling, intercepts balls ahead of back four, strong aerial presence',
      strengths: [
        'Disrupts opposing combinations through central third',
        'Wins second balls off goal kicks and clearances'
      ],
      vulnerabilities: [
        'Lacks agility against quick turning playmakers',
        'Can pick up reckless cards when stretched laterally'
      ],
      currentSeasonNotes: 'Anchors Hill midfield battle.',
      peddieMatchupCounter: 'Quinn Wachtveitl (#10) and Rayyaan Mohiuddin (#14) draw Brennan out and exploit space behind him.',
      filmUrl: 'https://fan.hudl.com/usa/pa/pottstown/organization/14862/the-hill-school',
      profileUrl: 'https://www.maxpreps.com/pa/pottstown/hill-school-blues/soccer/',
      keyStats: { goals: 1, assists: 2, duelsWonPct: 69, savesOrTackles: '4.1 tackles/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton-junction/organization/13591/ww-p-south-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton-junction/west-windsor-plainsboro-south-pirates/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton-junction/organization/13591/ww-p-south-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton-junction/west-windsor-plainsboro-south-pirates/soccer/',
      keyStats: { goals: 3, assists: 5, duelsWonPct: 50, savesOrTackles: '89% pass pct' }
    },
    {
      id: 'wwp-1',
      opponentKey: 'wwps',
      teamName: 'West Windsor-Plainsboro South Pirates',
      number: 1,
      name: 'Vikram Nair',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'1\"",
      dominantFoot: 'Right',
      tacticalRole: 'Agile Shot Stopper & Technical Sweeper',
      dangerLevel: 'Dangerous',
      traits: 'Great agility, commands penalty box, comfortable playing short from back',
      strengths: [
        'Quick diving reflex saves on low grass shots',
        'High soccer IQ distributing to fullbacks under pressure'
      ],
      vulnerabilities: [
        'Vulnerable on aerial crosses when crowded by physical runners',
        'Sometimes hesitates when coming for contested 50-50 balls'
      ],
      currentSeasonNotes: 'CVC conference veteran who provides stability to WWPS.',
      peddieMatchupCounter: 'Attack Nair with inswinging corners and crowd his near post.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton-junction/organization/13591/ww-p-south-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton-junction/west-windsor-plainsboro-south-pirates/soccer/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 70, savesOrTackles: '77% save pct' }
    },
    {
      id: 'wwp-4',
      opponentKey: 'wwps',
      teamName: 'West Windsor-Plainsboro South Pirates',
      number: 4,
      name: 'Jason Chen',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'0\"",
      dominantFoot: 'Right',
      tacticalRole: 'Composed Ball-Playing Center Back',
      dangerLevel: 'Key Threat',
      traits: 'Superb tactical positioning, clean tackle technique, steps up into midfield',
      strengths: [
        'Intercepts passes with anticipation rather than sliding',
        'Builds attack with progressive passing'
      ],
      vulnerabilities: [
        'Can be caught high when WWPS commits players forward',
        'Susceptible to direct speed over the top'
      ],
      currentSeasonNotes: 'Key defensive orchestrator for WWPS.',
      peddieMatchupCounter: 'Tommy Kim (#28) exploit Chen\'s high starting line with runs in behind.',
      keyStats: { goals: 1, assists: 2, duelsWonPct: 64, savesOrTackles: '3.9 clearances/gm' },
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton-junction/organization/13591/ww-p-south-high-school',

      profileUrl: 'https://www.maxpreps.com/nj/princeton-junction/west-windsor-plainsboro-south-pirates/soccer/',
    },
    {
      id: 'wwp-8',
      opponentKey: 'wwps',
      teamName: 'West Windsor-Plainsboro South Pirates',
      number: 8,
      name: 'Rohan Patel',
      position: 'CM',
      line: 'MID',
      classYear: 'Junior',
      height: "5'9\"",
      dominantFoot: 'Both',
      tacticalRole: 'Central Playmaking Distributor',
      dangerLevel: 'Dangerous',
      traits: 'Fluid passing vision, dictates game tempo, sharp one-touch combinations',
      strengths: [
        'Completes 88%+ of passes through midfield',
        'Turns smoothly away from initial pressure'
      ],
      vulnerabilities: [
        'Can be muscled off the ball by physical pressing midfielders',
        'Limited defensive presence in aerial duels'
      ],
      currentSeasonNotes: 'Playmaker in the Pirates 4-3-3 system.',
      peddieMatchupCounter: 'Jeet Sinha (#6) apply aggressive high-intensity press to disrupt Patel\'s passing cadence.',
      keyStats: { goals: 2, assists: 4, duelsWonPct: 51, savesOrTackles: '2.1 key passes/gm' },
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton-junction/organization/13591/ww-p-south-high-school',

      profileUrl: 'https://www.maxpreps.com/nj/princeton-junction/west-windsor-plainsboro-south-pirates/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton-junction/organization/13591/ww-p-south-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton-junction/west-windsor-plainsboro-south-pirates/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/13768/hopewell-valley-central-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/pennington/hopewell-valley-central-bulldogs/soccer/boys/',
      keyStats: { goals: 1, assists: 0, duelsWonPct: 73, savesOrTackles: '4.5 clearances/gm' }
    },
    {
      id: 'hvc-1',
      opponentKey: 'hopewell',
      teamName: 'Hopewell Valley Central Bulldogs',
      number: 1,
      name: 'Logan Bradley',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Physical Shot Stopper & Box Commander',
      dangerLevel: 'Dangerous',
      traits: 'Athletic frame, loud communicator, commands his 18-yard box aggressively',
      strengths: [
        'Brave dive stops at the feet of oncoming strikers',
        'Strong punching on contested corner kicks'
      ],
      vulnerabilities: [
        'Struggles with ground passes when pressed on his left foot',
        'Prone to spilling low skips on wet grass surfaces'
      ],
      currentSeasonNotes: 'Bulldogs team captain with 4 clean sheets this autumn.',
      peddieMatchupCounter: 'Test Bradley with low skidding shots and follow up for rebounds immediately.',
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/13768/hopewell-valley-central-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/pennington/hopewell-valley-central-bulldogs/soccer/boys/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 74, savesOrTackles: '81% save pct' }
    },
    {
      id: 'hvc-10',
      opponentKey: 'hopewell',
      teamName: 'Hopewell Valley Central Bulldogs',
      number: 10,
      name: 'Connor Mitchell',
      position: 'CAM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'11\"",
      dominantFoot: 'Right',
      tacticalRole: 'Attacking Engine & Long-Range Striker',
      dangerLevel: 'Elite',
      traits: 'Powerful shooting from distance, sharp vision, drives through defensive seams',
      strengths: [
        'Scores from 25+ yards with dipping strikes',
        'Drives Hopewell\'s transition with direct dribbling'
      ],
      vulnerabilities: [
        'Reluctant to track back when opponents switch play quickly',
        'Can become frustrated if marked out of the match early'
      ],
      currentSeasonNotes: 'Top offensive weapon for Hopewell Valley; must be neutralized outside the 18.',
      peddieMatchupCounter: 'Christian Tharney (#13) step up to close down Mitchell\'s shooting space immediately.',
      keyStats: { goals: 5, assists: 4, duelsWonPct: 58, savesOrTackles: '3.2 shots/gm' },
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/13768/hopewell-valley-central-high-school',

      profileUrl: 'https://www.maxpreps.com/nj/pennington/hopewell-valley-central-bulldogs/soccer/boys/',
    },
    {
      id: 'hvc-11',
      opponentKey: 'hopewell',
      teamName: 'Hopewell Valley Central Bulldogs',
      number: 11,
      name: 'Tyler Evans',
      position: 'LW',
      line: 'FWD',
      classYear: 'Junior',
      height: "5'10\"",
      dominantFoot: 'Left',
      tacticalRole: 'Pacey Counter-Attacking Winger',
      dangerLevel: 'Key Threat',
      traits: 'Speed in transition, cuts inside to shoot, works well in tandem with Mitchell',
      strengths: [
        'Accelerates quickly into wide defensive channels',
        'Dangerous on quick counter-attacks'
      ],
      vulnerabilities: [
        'Struggles against physical defenders who engage him before he hits top speed',
        'Inconsistent delivery with weaker right foot'
      ],
      currentSeasonNotes: 'Secondary scoring option for Bulldogs.',
      peddieMatchupCounter: 'Owen Bonchev (#8) contain Evans and guide him toward the touchline.',
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/13768/hopewell-valley-central-high-school',
      profileUrl: 'https://www.maxpreps.com/nj/pennington/hopewell-valley-central-bulldogs/soccer/boys/',
      keyStats: { goals: 3, assists: 3, duelsWonPct: 49, savesOrTackles: '2.6 crosses/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/16629/the-pennington-school',
      profileUrl: 'https://www.pennington.org/athletics/team-pages/boys-varsity-soccer',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/16629/the-pennington-school',
      profileUrl: 'https://www.pennington.org/athletics/team-pages/boys-varsity-soccer',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/16629/the-pennington-school',
      profileUrl: 'https://www.pennington.org/athletics/team-pages/boys-varsity-soccer',
      keyStats: { goals: 2, assists: 1, duelsWonPct: 82, savesOrTackles: '4.8 clearances/gm' }
    },
    {
      id: 'pen-1',
      opponentKey: 'pennington',
      teamName: 'The Pennington School Red Hawks',
      number: 1,
      name: 'Mateo Rossi',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'3\"",
      dominantFoot: 'Both',
      tacticalRole: 'Elite Collegiate Division 1 Commit Goalkeeper',
      dangerLevel: 'Elite',
      traits: 'D1 commit, world-class reflex agility, sweeps 25 yards out, pinpoint distribution',
      strengths: [
        'Commands entire defensive third as sweeper-keeper',
        'Reflex stops on point-blank shots inside 6-yard box'
      ],
      vulnerabilities: [
        'Can be caught out of position by early long-range lobs when sweeping high',
        'Prone to overcommitting on low 1v1 fake shots'
      ],
      currentSeasonNotes: 'Nationally ranked Prep A goalkeeper. One of the top prep netminders in the United States.',
      peddieMatchupCounter: 'Shoot early and with disguise; force Rossi to make saves while scrambling back.',
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/16629/the-pennington-school',
      profileUrl: 'https://www.pennington.org/athletics/team-pages/boys-varsity-soccer',
      keyStats: { goals: 0, assists: 1, duelsWonPct: 85, savesOrTackles: '88% save pct' }
    },
    {
      id: 'pen-6',
      opponentKey: 'pennington',
      teamName: 'The Pennington School Red Hawks',
      number: 6,
      name: 'Lucas DeSilva',
      position: 'CDM',
      line: 'MID',
      classYear: 'Junior',
      height: "6'0\"",
      dominantFoot: 'Both',
      tacticalRole: 'Gegenpress Engine & Midfield Anchor',
      dangerLevel: 'Elite',
      traits: 'Relentless counter-pressing, ball swarming within 3 seconds, laser switches',
      strengths: [
        'Leads 4-man Gegenpress swarm in attacking third',
        'Wins 75%+ of second balls in central midfield'
      ],
      vulnerabilities: [
        'Overcommits to ball-side press, leaving opposite touchline open to diagonal switches',
        'Accumulates fouls when press is bypassed'
      ],
      currentSeasonNotes: 'The tactical pivot of Pennington\'s high-press system. Division 1 target.',
      peddieMatchupCounter: 'Christian Tharney (#13) bypass DeSilva immediately with long diagonal switches to Bennett Cucchiara (#7).',
      filmUrl: 'https://fan.hudl.com/usa/nj/pennington/organization/16629/the-pennington-school',
      profileUrl: 'https://www.pennington.org/athletics/team-pages/boys-varsity-soccer',
      keyStats: { goals: 3, assists: 5, duelsWonPct: 71, savesOrTackles: '4.8 tackles/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/15456/the-hun-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/hun-raiders/soccer/boys/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/15456/the-hun-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/hun-raiders/soccer/boys/',
      keyStats: { goals: 1, assists: 1, duelsWonPct: 77, savesOrTackles: '5.4 clearances/gm' }
    },
    {
      id: 'hun-1',
      opponentKey: 'hun',
      teamName: 'The Hun School Raiders',
      number: 1,
      name: 'Nicholas Vance',
      position: 'GK',
      line: 'GK',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Athletic Box Stopper',
      dangerLevel: 'Dangerous',
      traits: 'Big physical frame, brave on crosses, commands back 3',
      strengths: [
        'Strong handling on high crosses into the box',
        'Reflex stops on deflected strikes'
      ],
      vulnerabilities: [
        'Struggles with turf backpasses under high pressure',
        'Can be beaten on low grounded cutbacks into the bottom corners'
      ],
      currentSeasonNotes: 'Starting goalkeeper for Hun\'s 3-5-2 system.',
      peddieMatchupCounter: 'Deploy low driven cutbacks to the 18-yard arc for arriving midfielders Mohiuddin and Sinha.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/15456/the-hun-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/hun-raiders/soccer/boys/',
      keyStats: { goals: 0, assists: 0, duelsWonPct: 75, savesOrTackles: '79% save pct' }
    },
    {
      id: 'hun-3',
      opponentKey: 'hun',
      teamName: 'The Hun School Raiders',
      number: 3,
      name: 'Marco Rossi',
      position: 'LB',
      line: 'DEF',
      classYear: 'Junior',
      height: "5'11\"",
      dominantFoot: 'Left',
      tacticalRole: 'High Attacking Wingback',
      dangerLevel: 'Dangerous',
      traits: 'Pushes past halfway line, dangerous whipped crosses, high offensive work rate',
      strengths: [
        'Creates attacking width in Hun\'s 3-5-2 formation',
        'Whipped inswinging crosses into striker chest'
      ],
      vulnerabilities: [
        'Leaves massive space behind him on transitions',
        'Slow recovery when forced into a 50-yard sprint back'
      ],
      currentSeasonNotes: 'Veo film shows huge space behind Rossi on quick turnovers.',
      peddieMatchupCounter: 'Bennett Cucchiara (#7) and Blake Romanelli (#26) attack the space vacated behind Rossi immediately.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/15456/the-hun-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/hun-raiders/soccer/boys/',
      keyStats: { goals: 2, assists: 4, duelsWonPct: 54, savesOrTackles: '2.8 crosses/gm' }
    },
    {
      id: 'hun-8',
      opponentKey: 'hun',
      teamName: 'The Hun School Raiders',
      number: 8,
      name: 'Julian Mercer',
      position: 'CM',
      line: 'MID',
      classYear: 'Senior',
      height: "5'10\"",
      dominantFoot: 'Right',
      tacticalRole: 'Central Midfield Conductor',
      dangerLevel: 'Key Threat',
      traits: 'Clean passing tempo, links back 3 with attacking wingbacks',
      strengths: [
        'Reliable 88%+ passing accuracy in build-up',
        'Tactical positioning between lines'
      ],
      vulnerabilities: [
        'Lacks physical bite in contested midfield collisions',
        'Struggles when pressed tightly from behind'
      ],
      currentSeasonNotes: 'Midfield connector for the Raiders.',
      peddieMatchupCounter: 'Jeet Sinha (#6) and Quinn Wachtveitl (#10) pressure Mercer to deny central progression.',
      filmUrl: 'https://fan.hudl.com/usa/nj/princeton/organization/15456/the-hun-school',
      profileUrl: 'https://www.maxpreps.com/nj/princeton/hun-raiders/soccer/boys/',
      keyStats: { goals: 1, assists: 3, duelsWonPct: 53, savesOrTackles: '2.2 tackles/gm' }
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
      filmUrl: 'https://fan.hudl.com/usa/nj/blairstown/organization/15865/blair-academy',
      profileUrl: 'https://www.maxpreps.com/nj/blairstown/blair-academy-buccaneers/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/blairstown/organization/15865/blair-academy',
      profileUrl: 'https://www.maxpreps.com/nj/blairstown/blair-academy-buccaneers/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/blairstown/organization/15865/blair-academy',
      profileUrl: 'https://www.maxpreps.com/nj/blairstown/blair-academy-buccaneers/soccer/',
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
      filmUrl: 'https://fan.hudl.com/usa/nj/blairstown/organization/15865/blair-academy',
      profileUrl: 'https://www.maxpreps.com/nj/blairstown/blair-academy-buccaneers/soccer/',
      keyStats: { goals: 0, assists: 1, duelsWonPct: 80, savesOrTackles: '78% save pct' }
    },
    {
      id: 'blr-5',
      opponentKey: 'blair',
      teamName: 'Blair Academy Buccaneers',
      number: 5,
      name: 'Liam Gallagher',
      position: 'CB',
      line: 'DEF',
      classYear: 'Senior',
      height: "6'2\"",
      dominantFoot: 'Right',
      tacticalRole: 'Direct Stopper & Set Piece Target',
      dangerLevel: 'Dangerous',
      traits: 'Aggressive aerial defending, physical marking, targets long throw-ins',
      strengths: [
        'Dominates the 18-yard box during opposing corner kicks',
        'Long throw-in weapon that reaches the 6-yard box'
      ],
      vulnerabilities: [
        'Vulnerable in space when forced to turn and sprint 40 yards',
        'Prone to diving in and committing fouls against rapid cutbacks'
      ],
      currentSeasonNotes: 'Blair Day rivalry leader; anchors their physical defensive front.',
      peddieMatchupCounter: 'Carson Wiley (#22) and Christian Tharney (#13) mark Gallagher on long throws; Tommy Kim (#28) exploit his lack of lateral speed.',
      filmUrl: 'https://fan.hudl.com/usa/nj/blairstown/organization/15865/blair-academy',
      profileUrl: 'https://www.maxpreps.com/nj/blairstown/blair-academy-buccaneers/soccer/',
      keyStats: { goals: 1, assists: 1, duelsWonPct: 73, savesOrTackles: '4.6 clearances/gm' }
    }
  ]
};

export const ALL_OPPONENT_PLAYER_REPORTS: OpponentPlayerReport[] = Object.values(
  OPPONENT_PLAYER_SCOUTING_REPORTS
).flat();

export function getOpponentPlayers(opponentKeyOrName: string): OpponentPlayerReport[] {
  if (!opponentKeyOrName) return [];
  if (OPPONENT_PLAYER_SCOUTING_REPORTS[opponentKeyOrName]) {
    return OPPONENT_PLAYER_SCOUTING_REPORTS[opponentKeyOrName];
  }
  const clean = opponentKeyOrName.toLowerCase().trim();
  // Match by key or teamName
  for (const [k, players] of Object.entries(OPPONENT_PLAYER_SCOUTING_REPORTS)) {
    if (k === clean) return players;
    const team = (players[0]?.teamName || '').toLowerCase();
    if (team.includes(clean) || clean.includes(k) || clean.includes(team.replace('the ', '').replace(' high school', '').replace(' school', ''))) {
      return players;
    }
  }
  return [];
}
