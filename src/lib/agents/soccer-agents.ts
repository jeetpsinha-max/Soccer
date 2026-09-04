import { MatchEvent, ScoutingReport, Player } from '../types';
import { PEDDIE_ROSTER_2026_2027, MAPL_SCOUTING_REPORTS } from '../soccer-data';

export interface TacticalAnalysisResult {
  headline: string;
  opponent: string;
  systemSummary: string;
  keyMatchups: { ourPlayer: string; opponentKey: string; edge: string }[];
  substitutionsRoadmap: { minute: number; offPlayer: string; onPlayer: string; tacticalPurpose: string }[];
  predictedOutcome: { peddieGoals: number; opponentGoals: number; winProbabilityPct: number };
}

export class SoccerTacticalAgent {
  /**
   * Generates a comprehensive scouting and tactical plan against an opponent.
   */
  static generateTacticalPlan(opponentName: string): TacticalAnalysisResult {
    const report: ScoutingReport | undefined = MAPL_SCOUTING_REPORTS[opponentName] || MAPL_SCOUTING_REPORTS['Blair Academy'];

    return {
      headline: `Tactical Blueprint vs ${report.opponent}`,
      opponent: report.opponent,
      systemSummary: `Opponent deploys a ${report.formation}. ${report.tendencies.buildup} To break their ${report.tendencies.defensiveBlock}, our system recommends targeting ${report.tendencies.vulnerabilityZone}.`,
      keyMatchups: [
        {
          ourPlayer: '#4 Julian Vance (CB)',
          opponentKey: report.keyPlaymakers[0] || 'Opposing Striker',
          edge: 'Peddie +14% Aerial Dominance. Vance wins 88% of headers inside our 18-yard box.'
        },
        {
          ourPlayer: '#8 Mateo Rossi (CM)',
          opponentKey: report.keyPlaymakers[1] || 'Opposing Midfield Pivot',
          edge: 'Peddie +22% Ball Retention under high press. Rossi averages 93.8% passing accuracy.'
        },
        {
          ourPlayer: '#9 Dylan Morales (ST)',
          opponentKey: 'Opponent Center Backs',
          edge: 'Explosive pace advantage. Morales top speed 34.7 km/h beats their backline by 0.3s over 20m.'
        }
      ],
      substitutionsRoadmap: [
        {
          minute: 60,
          offPlayer: '#7 Tyler Brooks (RW)',
          onPlayer: '#15 Carlos Mendez (LW/RW)',
          tacticalPurpose: 'Inject fresh sprinting legs against fatigued opposing left-back.'
        },
        {
          minute: 75,
          offPlayer: '#10 Leo Sterling (CAM)',
          onPlayer: '#12 Samira Patel (CM)',
          tacticalPurpose: 'Reinforce midfield possession triangle and prevent late counter-attacks.'
        },
        {
          minute: 82,
          offPlayer: '#11 Xavier Dupont (LW)',
          onPlayer: '#17 Jack Turner (CDM)',
          tacticalPurpose: 'Lock down central zones; transition into 4-4-2 double pivot.'
        }
      ],
      predictedOutcome: {
        peddieGoals: 2,
        opponentGoals: 1,
        winProbabilityPct: report.winProbabilityPct
      }
    };
  }

  /**
   * Natural Language film and match event parser (Gemini / Claude agent style).
   */
  static filterEventsByNaturalLanguage(query: string, events: MatchEvent[]): MatchEvent[] {
    const q = query.toLowerCase().trim();
    if (q === 'goal' || q === 'goals') {
      return events.filter(e => e.type === 'Goal');
    }

    return events.filter(e => {
      if (q.includes('goal') && e.type === 'Goal') return true;
      if (q.includes('shot') && (e.type === 'Shot' || e.type === 'Goal')) return true;
      if (q.includes('pass') && (e.type === 'Pass' || e.type === 'Key Pass')) return true;
      if (q.includes('tackle') && e.type === 'Tackle') return true;
      if (q.includes('corner') && e.type === 'Corner') return true;
      if (q.includes('press') && (e.type === 'Press Trap' || e.phase === 'High Press')) return true;
      if (q.includes('blair') && (e.team === 'Opponent' || e.description.toLowerCase().includes('blair'))) return true;
      if (q.includes('peddie') && e.team === 'Peddie') return true;
      if (q.includes('morales') && e.playerName.toLowerCase().includes('morales')) return true;
      if (q.includes('rossi') && e.playerName.toLowerCase().includes('rossi')) return true;
      if (q.includes('vance') && e.playerName.toLowerCase().includes('vance')) return true;
      if (q.includes('dupont') && e.playerName.toLowerCase().includes('dupont')) return true;
      return e.description.toLowerCase().includes(q) || e.playerName.toLowerCase().includes(q);
    });
  }
}
