import { Player, OpponentPlayerReport } from './types';

export interface DuelDimension {
  name: string;
  peddieScore: number;    // 0 - 100
  opponentScore: number;  // 0 - 100
  advantage: 'peddie' | 'opponent' | 'neutral';
  analysis: string;
}

export interface DuelCouncilBreakdown {
  fableNarrative: string;
  grokEdge: string;
  gptStructure: string;
  kimiFilmScout: string;
}

export interface DuelAnalysis {
  peddiePlayer: {
    id: string;
    number: number;
    name: string;
    position: string;
    height: string;
    speedMph: number;
  };
  opponentPlayer: {
    id: string;
    teamName: string;
    number: number;
    name: string;
    position: string;
    dangerLevel: string;
    height: string;
  };
  winProbabilityPct: number; // 0 - 100
  outcomeTier: 'Peddie Dominance' | 'Slight Peddie Edge' | 'Contested Deadlock' | 'Opponent Advantage' | 'Critical Threat Alert';
  dimensions: {
    pace: DuelDimension;
    aerial: DuelDimension;
    groundContest: DuelDimension;
    tacticalIQ: DuelDimension;
    pressResistance: DuelDimension;
  };
  keyBattleground: string;
  coachNazarioDirective: string;
  councilBreakdown: DuelCouncilBreakdown;
}

/**
 * Utility: Convert height string like 6'2" or 5'11" to inches
 */
export function parseHeightInInches(heightStr?: string): number {
  if (!heightStr) return 70; // 5'10" default
  const match = heightStr.match(/(\d+)'(?:(\d+)")?/);
  if (!match) return 70;
  const feet = parseInt(match[1], 10);
  const inches = match[2] ? parseInt(match[2], 10) : 0;
  return feet * 12 + inches;
}

/**
 * Estimate opponent top speed (mph) based on position, line, and danger level
 */
function estimateOpponentSpeed(opponent: OpponentPlayerReport): number {
  let base = 18.2;
  if (opponent.line === 'FWD') base = 19.4;
  else if (opponent.line === 'MID') base = 18.8;
  else if (opponent.line === 'DEF') base = 18.5;
  else if (opponent.line === 'GK') base = 15.0;

  if (opponent.dangerLevel === 'Elite') base += 1.4;
  else if (opponent.dangerLevel === 'Dangerous') base += 0.9;
  else if (opponent.dangerLevel === 'Key Threat') base += 0.5;

  const lowerTraits = (opponent.traits + ' ' + opponent.strengths.join(' ')).toLowerCase();
  if (lowerTraits.includes('pace') || lowerTraits.includes('rapid') || lowerTraits.includes('speed') || lowerTraits.includes('burst')) {
    base += 0.8;
  }
  return Math.round(base * 10) / 10;
}

/**
 * Main Algorithmic Duel Calculator
 */
export function calculateDuelMatchup(
  peddie: Player,
  opponent: OpponentPlayerReport
): DuelAnalysis {
  const peddieHeight = parseHeightInInches(peddie.height);
  const oppHeight = parseHeightInInches(opponent.height);
  const oppSpeed = estimateOpponentSpeed(opponent);
  const peddieSpeed = peddie.topSpeedMph || 19.0;

  // 1. Pace & Velocity Dimension
  const speedDiff = peddieSpeed - oppSpeed;
  const peddiePaceScore = Math.min(99, Math.max(50, Math.round(75 + speedDiff * 8)));
  const oppPaceScore = Math.min(99, Math.max(50, Math.round(75 - speedDiff * 8)));
  const paceAdv = peddiePaceScore > oppPaceScore + 3 ? 'peddie' : (oppPaceScore > peddiePaceScore + 3 ? 'opponent' : 'neutral');

  // 2. Aerial Dominance Dimension
  const heightDiff = peddieHeight - oppHeight;
  const peddieAerialPct = peddie.aerialDuelsContested && peddie.aerialDuelsContested > 0
    ? Math.round(((peddie.aerialDuelsWon || 0) / peddie.aerialDuelsContested) * 100)
    : 65;
  const oppAerialPct = opponent.keyStats?.duelsWonPct || 55;
  const peddieAerialScore = Math.min(99, Math.max(45, Math.round(peddieAerialPct + heightDiff * 4)));
  const oppAerialScore = Math.min(99, Math.max(45, Math.round(oppAerialPct - heightDiff * 3)));
  const aerialAdv = peddieAerialScore > oppAerialScore + 4 ? 'peddie' : (oppAerialScore > peddieAerialScore + 4 ? 'opponent' : 'neutral');

  // 3. Ground 1v1 Contest Dimension
  const peddieTackleScore = Math.min(99, Math.max(50, Math.round(peddie.tackleSuccessPct || 70)));
  const oppGroundScore = opponent.dangerLevel === 'Elite' ? 88 : opponent.dangerLevel === 'Dangerous' ? 78 : 68;
  const groundAdv = peddieTackleScore > oppGroundScore + 3 ? 'peddie' : (oppGroundScore > peddieTackleScore + 3 ? 'opponent' : 'neutral');

  // 4. Tactical IQ & Form
  const peddieForm = peddie.matchFormScore ? peddie.matchFormScore * 10 : 85;
  const oppThreatRating = opponent.dangerLevel === 'Elite' ? 92 : opponent.dangerLevel === 'Dangerous' ? 82 : 72;
  const peddieIqScore = Math.min(99, Math.max(55, Math.round(peddieForm + (peddie.isCaptain ? 5 : 0))));
  const oppIqScore = Math.min(99, Math.max(50, Math.round(oppThreatRating)));
  const iqAdv = peddieIqScore > oppIqScore + 2 ? 'peddie' : (oppIqScore > peddieIqScore + 2 ? 'opponent' : 'neutral');

  // 5. Press Resistance & Ball Security
  const peddiePassPct = peddie.passCompletionPct || 80;
  const oppVulnerabilities = opponent.vulnerabilities.join(' ').toLowerCase();
  const opponentProneToPress = oppVulnerabilities.includes('press') || oppVulnerabilities.includes('turn') || oppVulnerabilities.includes('feet');
  const peddiePressScore = Math.min(99, Math.max(50, Math.round(peddiePassPct + (opponentProneToPress ? 8 : 0))));
  const oppPressScore = Math.min(99, Math.max(50, Math.round(oppThreatRating - (opponentProneToPress ? 6 : 0))));
  const pressAdv = peddiePressScore > oppPressScore + 3 ? 'peddie' : (oppPressScore > peddiePressScore + 3 ? 'opponent' : 'neutral');

  // Win Probability Composite
  const peddieTotal = (peddiePaceScore * 0.25) + (peddieAerialScore * 0.20) + (peddieTackleScore * 0.25) + (peddieIqScore * 0.15) + (peddiePressScore * 0.15);
  const oppTotal = (oppPaceScore * 0.25) + (oppAerialScore * 0.20) + (oppGroundScore * 0.25) + (oppIqScore * 0.15) + (oppPressScore * 0.15);
  
  const scoreDelta = peddieTotal - oppTotal;
  let winProbabilityPct = Math.round(50 + scoreDelta * 1.5);
  winProbabilityPct = Math.min(94, Math.max(18, winProbabilityPct));

  let outcomeTier: DuelAnalysis['outcomeTier'];
  if (winProbabilityPct >= 68) outcomeTier = 'Peddie Dominance';
  else if (winProbabilityPct >= 55) outcomeTier = 'Slight Peddie Edge';
  else if (winProbabilityPct >= 46) outcomeTier = 'Contested Deadlock';
  else if (winProbabilityPct >= 35) outcomeTier = 'Opponent Advantage';
  else outcomeTier = 'Critical Threat Alert';

  // Key Battleground Determination
  let keyBattleground = 'Central Transition Zone';
  if (peddie.position === 'CB' || opponent.position === 'ST') {
    keyBattleground = 'Box Entry & First-Time Physical Stoppage';
  } else if (peddie.position === 'CDM' || peddie.position === 'CM' || opponent.line === 'MID') {
    keyBattleground = 'Zone 14 Edge & Second-Ball Scramble';
  } else if (peddie.position === 'LB' || peddie.position === 'RB' || peddie.position === 'LW' || peddie.position === 'RW') {
    keyBattleground = 'Touchline Flank Iso & Recovery Channel';
  }

  // Coach Nazario Directive
  let coachNazarioDirective = '';
  if (opponent.dangerLevel === 'Elite') {
    coachNazarioDirective = `Deny ${opponent.name} (#${opponent.number}) inner access into Zone 14. Double-team on touchline with CDM cover.`;
  } else if (opponent.vulnerabilities.length > 0) {
    coachNazarioDirective = `Exploit ${opponent.name}'s known vulnerability: ${opponent.vulnerabilities[0]}. Maintain aggressive high step.`;
  } else {
    coachNazarioDirective = `Contain in 1v1 posture. Force backwards toward center circle, cutting off diagonal switch routes.`;
  }

  return {
    peddiePlayer: {
      id: peddie.id,
      number: peddie.number,
      name: peddie.name,
      position: peddie.position,
      height: peddie.height,
      speedMph: peddieSpeed,
    },
    opponentPlayer: {
      id: opponent.id,
      teamName: opponent.teamName,
      number: opponent.number,
      name: opponent.name,
      position: opponent.position,
      dangerLevel: opponent.dangerLevel,
      height: opponent.height || "5'10\"",
    },
    winProbabilityPct,
    outcomeTier,
    dimensions: {
      pace: {
        name: 'Sprint Velocity & Recovery',
        peddieScore: peddiePaceScore,
        opponentScore: oppPaceScore,
        advantage: paceAdv,
        analysis: `${peddie.name} clocks ${peddieSpeed} mph against estimated ${oppSpeed} mph top speed.`
      },
      aerial: {
        name: 'Aerial Dominance & Height',
        peddieScore: peddieAerialScore,
        opponentScore: oppAerialScore,
        advantage: aerialAdv,
        analysis: `${peddie.name} (${peddie.height}) vs ${opponent.name} (${opponent.height || "5'10\""}) — ${heightDiff >= 0 ? '+' : ''}${heightDiff}" differential.`
      },
      groundContest: {
        name: 'Ground Duel & Tackle Success',
        peddieScore: peddieTackleScore,
        opponentScore: oppGroundScore,
        advantage: groundAdv,
        analysis: `${peddie.tackleSuccessPct || 70}% tackle conversion facing ${opponent.dangerLevel} caliber threat.`
      },
      tacticalIQ: {
        name: 'Positional Discipline & Composure',
        peddieScore: peddieIqScore,
        opponentScore: oppIqScore,
        advantage: iqAdv,
        analysis: `Peddie Form Rating ${peddie.matchFormScore || 8.5}/10 vs ${opponent.tacticalRole}.`
      },
      pressResistance: {
        name: 'Ball Retention Under Pressure',
        peddieScore: peddiePressScore,
        opponentScore: oppPressScore,
        advantage: pressAdv,
        analysis: `${peddie.passCompletionPct}% pass reliability against ${opponent.traits}.`
      }
    },
    keyBattleground,
    coachNazarioDirective,
    councilBreakdown: {
      fableNarrative: `Under the bright floodlights of the MAPL circuit, ${peddie.name} (#${peddie.number}) steps into the spotlight against ${opponent.name} (#${opponent.number}, ${opponent.teamName}). This is an electrifying collision of discipline vs raw counter-punching.`,
      grokEdge: `Analytical edge: ${winProbabilityPct}% Peddie win probability. Key statistical vulnerability to target: "${opponent.vulnerabilities[0] || 'denying inside half-space turn'}".`,
      gptStructure: `Structural recommendation: Ensure ${peddie.position === 'CB' ? 'weak-side fullback pinches narrow' : 'pivot CDM locks the central channel'} to prevent cutback overloads when ${peddie.name} commits to the duel.`,
      kimiFilmScout: `Veo film analysis across match footage: ${opponent.name} executes with ${opponent.traits}. Peddie counter-measure: ${opponent.peddieMatchupCounter}.`
    }
  };
}
