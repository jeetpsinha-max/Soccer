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
          ourPlayer: '#10 Quinn Wachtveitl (CB)',
          opponentKey: report.keyPlaymakers[0] || 'Opposing Striker',
          edge: 'Peddie +14% Aerial Dominance. Wachtveitl wins 89% of headers inside our 18-yard box.'
        },
        {
          ourPlayer: '#8 Owen Bonchev (CM)',
          opponentKey: report.keyPlaymakers[1] || 'Opposing Midfield Pivot',
          edge: 'Peddie +22% Ball Retention under high press. Bonchev averages 91.5% passing accuracy.'
        },
        {
          ourPlayer: '#28 Tommy Kim (CAM/ST)',
          opponentKey: 'Opponent Center Backs',
          edge: 'Prep A 1st Team pace and agility. Tommy Kim top speed 34.2 km/h beats their backline by 0.3s over 20m.'
        }
      ],
      substitutionsRoadmap: [
        {
          minute: 60,
          offPlayer: '#7 Harry Xiao (RW)',
          onPlayer: '#9 Brody Rozo (ST)',
          tacticalPurpose: 'Inject direct sophomore forward against fatigued backline.'
        },
        {
          minute: 75,
          offPlayer: '#8 Owen Bonchev (LCM)',
          onPlayer: '#16 Massimo Sheinin (CM)',
          tacticalPurpose: 'Reinforce midfield possession triangle with fresh legs.'
        },
        {
          minute: 82,
          offPlayer: '#11 Blake Romanelli (LW)',
          onPlayer: '#6 Gabriel Lam (CDM)',
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
    if (!q) return events;
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
      if (q.includes('haverford') && (e.team === 'Opponent' || e.description.toLowerCase().includes('haverford'))) return true;
      if (q.includes('blair') && (e.team === 'Opponent' || e.description.toLowerCase().includes('blair'))) return true;
      if (q.includes('peddie') && e.team === 'Peddie') return true;
      if (q.includes('kim') && e.playerName.toLowerCase().includes('kim')) return true;
      if (q.includes('mckenzie') && e.playerName.toLowerCase().includes('mckenzie')) return true;
      if (q.includes('tharney') && e.playerName.toLowerCase().includes('tharney')) return true;
      if (q.includes('mohiuddin') && e.playerName.toLowerCase().includes('mohiuddin')) return true;
      if (q.includes('sheinin') && e.playerName.toLowerCase().includes('sheinin')) return true;
      if (q.includes('bonchev') && e.playerName.toLowerCase().includes('bonchev')) return true;
      if (q.includes('owen') && e.playerName.toLowerCase().includes('owen')) return true;
      if (q.includes('wachtveitl') && e.playerName.toLowerCase().includes('wachtveitl')) return true;
      if (q.includes('romanelli') && e.playerName.toLowerCase().includes('romanelli')) return true;
      if (q.includes('rozo') && e.playerName.toLowerCase().includes('rozo')) return true;
      return e.description.toLowerCase().includes(q) || e.playerName.toLowerCase().includes(q);
    });
  }
}
