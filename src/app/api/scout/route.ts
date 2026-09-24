import { NextRequest, NextResponse } from 'next/server';
import { SoccerTacticalAgent } from '@/lib/agents/soccer-agents';
import { claudeOrchestrator } from '@/lib/football/agents/claude-orchestrator';
import { getSeasonGameById, getSeasonPlays } from '@/lib/football/seasons-data';
import { SeasonId } from '@/types/football';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const opponent = searchParams.get('opponent') || 'Blair Academy';

  const plan = SoccerTacticalAgent.generateTacticalPlan(opponent);

  return NextResponse.json({
    status: 'ok',
    plan
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, gameId = 'peddie-blair-2025', season = '2025-2026', down = 4, distance = 2, yardLine = 38, scoreDiff = -4 } = body;

    if (action === 'win-probability') {
      const wpDecision = claudeOrchestrator.evaluateWinProbabilityTradeOff(down, distance, yardLine, scoreDiff);
      return NextResponse.json({ success: true, action, wpDecision });
    }

    // Default: Executive Scouting Report
    const game = getSeasonGameById(gameId, season as SeasonId);
    const opponentName = game?.opponent || 'Opponent';
    const plays = game?.plays || getSeasonPlays(season as SeasonId);

    const report = claudeOrchestrator.generateExecutiveScoutingReport(gameId, opponentName, plays as any);

    return NextResponse.json({
      success: true,
      action: 'scouting-report',
      report,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to generate scouting report' },
      { status: 500 }
    );
  }
}
