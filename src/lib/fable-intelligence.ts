// ============================================================================
// Peddie Athletics SAC — Fable 5 Creative & Psychological Intelligence Engine
// Deep Narrative Diagnostics, Player Grit Matrix, High-Leverage Composure &
// Momentum Modeling for Falcon Varsity Soccer and Falcon Varsity Football
// ============================================================================

export interface PlayerPsychologicalProfile {
  id: string;
  name: string;
  number: number;
  sport: 'SOCCER' | 'FOOTBALL';
  position: string;
  gritScore: number;            // 0 - 100: Resiliency when trailing or under sustained pressure
  clutchRating: number;         // 0 - 100: Conversion & defensive execution in final 15 minutes / 4th quarter
  composureGrade: number;       // 0 - 100: Emotional stability in hostile road venues & rivalries
  leadershipArchetype: string;  // e.g. "Vocal General", "Silent Enforcer", "Creative Catalyst"
  fableNarrative: string;       // Fable 5's cinematic qualitative assessment
  clutchMoments: string[];      // Verified match events exemplifying clutch execution
}

export interface TacticalDilemmaResolution {
  dilemma: string;
  opponent: string;
  psychologicalDiagnostic: string;
  artisticOverloadSolution: string;
  clutchPlayerAssignment: string;
  momentumSwingIndex: number;   // Expected % momentum shift (+10 to +40)
  touchlineInspirationSpeech: string;
}

// ----------------------------------------------------------------------------
// 1. Fable 5 Player Grit & Clutch Database (Soccer 2026-2027 & Football 2025-2026)
// ----------------------------------------------------------------------------

export const FABLE_SOCCER_PSYCH_ROSTER: PlayerPsychologicalProfile[] = [
  {
    id: 'p-13',
    name: 'Christian Tharney',
    number: 13,
    sport: 'SOCCER',
    position: 'CM / CAM (Captain)',
    gritScore: 98,
    clutchRating: 96,
    composureGrade: 97,
    leadershipArchetype: 'Vocal Field General',
    fableNarrative: 'The beating tactical heart of the Falcon program. Tharney plays with an unshakeable poise that calms the entire middle third during chaotic transition waves. When the MAPL pace accelerates, his pulse slows down.',
    clutchMoments: [
      "58' equalizing volley rally vs St. Thomas Aquinas (Sept 4)",
      "41' penalty kick ice conversion under away pressure at George School (Sept 10)",
      "Stoppage-time defensive recovery tackle against Trenton Central (Sept 8)"
    ]
  },
  {
    id: 'p-28',
    name: 'Tommy Kim',
    number: 28,
    sport: 'SOCCER',
    position: 'ST / Winger (Captain)',
    gritScore: 96,
    clutchRating: 98,
    composureGrade: 92,
    leadershipArchetype: 'Explosive Spearhead',
    fableNarrative: 'An electric attacking predator. Tommy feeds on defensive fatigue, exploding into half-spaces precisely when opponents believe they have contained the initial wave. His hat-trick against PDS was a clinic in cold-blooded finishing.',
    clutchMoments: [
      "8', 24', 51' hat-trick display at Princeton Day School (Sept 14)",
      "34' curling equalizer from 20 yards vs Aquinas (Sept 4)",
      "12' & 54' brace driving road triumph at George School (Sept 10)"
    ]
  },
  {
    id: 'p-22',
    name: 'Carson Wiley',
    number: 22,
    sport: 'SOCCER',
    position: 'CB (Class of 2028 Anchor)',
    gritScore: 95,
    clutchRating: 94,
    composureGrade: 94,
    leadershipArchetype: 'Silent Aerial Enforcer',
    fableNarrative: 'A physical revelation on the backline. Despite his underclassman status, Wiley commands the aerial corridors with veteran authority and unmatched aerial bravery in set-piece chaos.',
    clutchMoments: [
      "81' game-winning header off corner kick vs St. Thomas Aquinas (Sept 4)",
      "9 aerial clearances denying Trenton Central aerial bombardments",
      "Goal-line sliding block against George School"
    ]
  },
  {
    id: 'p-14',
    name: 'Rayyaan Mohiuddin',
    number: 14,
    sport: 'SOCCER',
    position: 'CAM / Inverted Winger (Captain)',
    gritScore: 94,
    clutchRating: 93,
    composureGrade: 95,
    leadershipArchetype: 'Spatial Virtuoso',
    fableNarrative: 'A maestro of spatial deception. Mohiuddin glides between opposition lines, finding pockets of tranquility in congested middle thirds and unlocking low blocks with surgical through-balls.',
    clutchMoments: [
      "22' Zone 14 visionary diagonal assist at George School (Sept 10)",
      "48' tempo-controlling sequence retaining possession under 3v1 Haverford press",
      "Key link-up orchestration fueling 7-1 road masterclass at PDS"
    ]
  },
  {
    id: 'p-12',
    name: 'Noah Eldessouky',
    number: 12,
    sport: 'SOCCER',
    position: 'ST (Target Forward, Captain)',
    gritScore: 97,
    clutchRating: 95,
    composureGrade: 91,
    leadershipArchetype: 'Physical Batterram',
    fableNarrative: 'A relentless competitor who tires out opposing center-backs through 80 minutes of brutal physical duels. His post-up play provides the platform for our entire diamond midfield to advance.',
    clutchMoments: [
      "Second-half power header and physical hold-up vs PDS",
      "Drawing 4 fouls in final 10 minutes against Aquinas to secure 3-2 victory",
      "Crucial front-post decoy run unlocking Tharney's strike at George"
    ]
  },
  {
    id: 'p-6',
    name: 'Jeet Sinha',
    number: 6,
    sport: 'SOCCER',
    position: 'CM / CAM',
    gritScore: 93,
    clutchRating: 95,
    composureGrade: 93,
    leadershipArchetype: 'Creative Catalyst',
    fableNarrative: 'The visionary spark plug of the Falcon midfield. Sinha possesses an innate spatial flair, threading needle passes through compressed lines and stepping up with spectacular long-range strikes when the game hangs in the balance.',
    clutchMoments: [
      "64' sensational 22-yard curling strike into the top right 90 vs Princeton Day School (Sept 14)",
      "Pinpoint diagonal switch unlocking the right flank against George School",
      "High-pressure counter-press interception triggering Peddie's fast break"
    ]
  },
  {
    id: 'p-98',
    name: 'Dylan McKenzie',
    number: 98,
    sport: 'SOCCER',
    position: 'GK',
    gritScore: 94,
    clutchRating: 95,
    composureGrade: 96,
    leadershipArchetype: 'The Iron Wall',
    fableNarrative: 'Commanding 6\'3" shot-stopper with razor reflexes and elite spatial communication. In high-leverage penalty box scrambles, McKenzie provides the psychic security that allows our fullbacks to fly forward.',
    clutchMoments: [
      "76' diving fingertip save to preserve 3-2 lead vs Aquinas",
      "Point-blank reflex stop denying Trenton Central counter-attack",
      "84% save conversion across verified 2026-2027 match minutes"
    ]
  }
];

export const FABLE_FOOTBALL_PSYCH_ROSTER: PlayerPsychologicalProfile[] = [
  {
    id: 'fb-p10-cassidy',
    name: 'August Cassidy',
    number: 10,
    sport: 'FOOTBALL',
    position: 'LB (All-MAPL Defensive Captain)',
    gritScore: 99,
    clutchRating: 98,
    composureGrade: 97,
    leadershipArchetype: 'Collisional Enforcer & Defensive Architect',
    fableNarrative: 'A defensive titan in the MAPL circuit. Cassidy plays with a rare combination of violent downhill pursuit and cerebral run-gap recognition. On 3rd & 4th-and-short, his instinct to scrape across the A/B gaps consistently terminates opposing drives before they breathe.',
    clutchMoments: [
      "Goal-line stop on 4th-and-goal vs Blair Academy to preserve 21-14 victory",
      "Solo B-gap tackle for 4-yard loss against Hun's sweep play",
      "84 Total Tackles & 14 TFLs across 2025-2026 campaign"
    ]
  }
];

// ----------------------------------------------------------------------------
// 2. Fable 5 Tactical Dilemma Solver Engine
// ----------------------------------------------------------------------------

export class FableIntelligenceEngine {
  /**
   * Evaluates emotional grit and clutch score for a given player ID
   */
  static getPlayerPsychProfile(idOrName: string): PlayerPsychologicalProfile | undefined {
    const query = idOrName.toLowerCase();
    const all = [...FABLE_SOCCER_PSYCH_ROSTER, ...FABLE_FOOTBALL_PSYCH_ROSTER];
    return all.find(p => 
      p.id.toLowerCase() === query || 
      p.name.toLowerCase().includes(query) ||
      p.number.toString() === query
    );
  }

  /**
   * Generates Fable 5's artistic and psychological solution to any tactical dilemma
   */
  static solveTacticalDilemma(query: string, isFootball: boolean = false): TacticalDilemmaResolution {
    const q = query.toLowerCase();

    // 1. Haverford High Press (Soccer)
    if (q.includes('haverford') || q.includes('high press')) {
      return {
        dilemma: 'Haverford 4-3-3 High Press & Vertical Channel Penetration',
        opponent: 'The Haverford School',
        psychologicalDiagnostic: 'Haverford derives their emotional momentum from early turnovers inside our defensive third. If they smell hesitation in our backline, their front 3 presses with reckless abandon. We must break their psychological certainty within the first 10 minutes.',
        artisticOverloadSolution: 'Deploy an "Asymmetrical Diamond Tilt". Carson Wiley (#22) plays a deceptive low ball into Tharney (#13), who deliberately draws both Haverford central midfielders before hitting a blind 35-yard diagonal into space for Jeet Sinha (#6) and Tommy Kim (#28) on the sprint.',
        clutchPlayerAssignment: 'Christian Tharney (#13) must serve as the emotional shock absorber, demanding the ball with a defender on his back and maintaining a 90%+ pass accuracy under duress.',
        momentumSwingIndex: 28,
        touchlineInspirationSpeech: '"Gentlemen, Haverford expects us to retreat into survival mode. Look at their eyes when we play through their press with grace and swagger. Do not kick it away; dance through their lines!"'
      };
    }

    // 2. Blair Day Low Block (Soccer)
    if (!isFootball && (q.includes('blair') || q.includes('low block'))) {
      return {
        dilemma: "Breaking Blair Academy's 5-4-1 Low Block on Blair Day",
        opponent: 'Blair Academy',
        psychologicalDiagnostic: 'Blair will play with deep emotional conservatism, looking to frustrate us and turn our own supporters anxious. Their entire game plan relies on Peddie taking reckless low-percentage shots from 30 yards.',
        artisticOverloadSolution: 'Construct an "Overload & Blind-Side Wave". Force Blair to shift their entire defensive shell to the left flank through rapid 4-man tiki-taka triangles (Tharney, Mohiuddin, Xiao), then immediately whip an acute cross to the far post where Noah Eldessouky (#12) has pinned their smaller fullback.',
        clutchPlayerAssignment: 'Rayyaan Mohiuddin (#14) must orchestrate the tempo, refusing to force vertical balls and instead feeding the cut-back lanes.',
        momentumSwingIndex: 32,
        touchlineInspirationSpeech: '"A wall only stands until you find the hidden hinge. Do not smash your heads against it. Move the ball with surgical rhythm and watch their fortress crumble from exhaustion!"'
      };
    }

    // 3. Football: 4th-and-Short / Cassidy Stop (Football)
    if (isFootball || q.includes('4th') || q.includes('cassidy') || q.includes('blair football')) {
      return {
        dilemma: '4th & 2 Critical Midfield Game-Deciding Conversion / Stop',
        opponent: 'Blair Academy / Hun School',
        psychologicalDiagnostic: 'In 4th-down high-leverage snaps, standard playbooks crumble under fear of failure. The squad with the clearer mental picture and decisive physical commitment will seize complete game momentum.',
        artisticOverloadSolution: 'Offense: "Orbit Motion Power Jet" shifting the slot receiver across the formation 1.2 seconds pre-snap, freezing the boundary safety. Defense: "Falcon Overload Stunt", slanting the nose tackle into the A-gap while August Cassidy (#10) scrapes untouched into the ball carrier.',
        clutchPlayerAssignment: 'August Cassidy (#10 LB) on defense: read the guard\'s hip hinge and trigger the downhill strike without second thought.',
        momentumSwingIndex: 35,
        touchlineInspirationSpeech: '"This is Peddie Football. Games are not won on Tuesday diagrams; they are won in the 6 inches between the center\'s helmet and the turf right now. Line up, look them in the eyes, and claim this yard!"'
      };
    }

    // 4. Default Fable 5 Creative Synthesis
    return {
      dilemma: `Overcoming Tactical Friction on: "${query}"`,
      opponent: 'MAPL Conference Rivals',
      psychologicalDiagnostic: 'Football and soccer at the varsity prep level are fundamentally mental battles disguised as physical contests. Spatial dominance flows directly from collective self-belief.',
      artisticOverloadSolution: 'Create asymmetrical balance. Overload the half-spaces, draw the primary defender into no-man\'s-land, and execute the pre-drilled combination with flair and zero hesitation.',
      clutchPlayerAssignment: 'Our senior captains must set the emotional temperature and embody poise during transition swings.',
      momentumSwingIndex: 25,
      touchlineInspirationSpeech: '"Trust the hours of film and physical sacrifice we put in on the field. Play with joy, play with fury, and play for each other!"'
    };
  }
}
