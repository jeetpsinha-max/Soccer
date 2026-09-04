import { MatchEvent } from './types';

export class SoccerCsvEngine {
  /**
   * Converts match events into standard Wyscout / Hudl Soccer CSV format.
   */
  static exportToCsv(events: MatchEvent[]): string {
    const headers = [
      'EVENT_ID',
      'MINUTE',
      'SECOND',
      'TEAM',
      'PLAYER_NUMBER',
      'PLAYER_NAME',
      'EVENT_TYPE',
      'START_X_METERS',
      'START_Y_METERS',
      'END_X_METERS',
      'END_Y_METERS',
      'EXPECTED_GOALS_XG',
      'SUCCESS',
      'PHASE',
      'DESCRIPTION'
    ];

    const rows = events.map(e => [
      e.id,
      e.minute,
      e.second,
      e.team,
      e.playerNumber,
      `"${e.playerName.replace(/"/g, '""')}"`,
      e.type,
      e.startX,
      e.startY,
      e.endX !== undefined ? e.endX : '',
      e.endY !== undefined ? e.endY : '',
      e.expectedGoals !== undefined ? e.expectedGoals.toFixed(2) : '',
      e.success ? '1' : '0',
      `"${e.phase}"`,
      `"${e.description.replace(/"/g, '""')}"`
    ].join(','));

    return [headers.join(','), ...rows].join('\n');
  }

  /**
   * Parses standard Wyscout / Hudl Soccer CSV format into MatchEvent objects.
   */
  static parseCsv(csvText: string): MatchEvent[] {
    const lines = csvText.trim().split('\n');
    if (lines.length <= 1) return [];

    const events: MatchEvent[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle simple CSV parsing
      const parts = line.split(',');
      if (parts.length < 10) continue;

      events.push({
        id: parts[0] || `csv-${i}`,
        minute: parseInt(parts[1], 10) || 0,
        second: parseInt(parts[2], 10) || 0,
        team: (parts[3] === 'Peddie' ? 'Peddie' : 'Opponent') as 'Peddie' | 'Opponent',
        playerNumber: parseInt(parts[4], 10) || 0,
        playerName: (parts[5] || '').replace(/^"|"$/g, ''),
        type: (parts[6] || 'Pass') as any,
        startX: parseFloat(parts[7]) || 50,
        startY: parseFloat(parts[8]) || 34,
        endX: parts[9] ? parseFloat(parts[9]) : undefined,
        endY: parts[10] ? parseFloat(parts[10]) : undefined,
        expectedGoals: parts[11] ? parseFloat(parts[11]) : undefined,
        success: parts[12] === '1' || parts[12]?.toLowerCase() === 'true',
        phase: (parts[13] ? parts[13].replace(/^"|"$/g, '') : 'Open Play') as any,
        description: parts[14] ? parts[14].replace(/^"|"$/g, '') : ''
      });
    }

    return events;
  }
}
