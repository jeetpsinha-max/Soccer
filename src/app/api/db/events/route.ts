/**
 * ============================================================================
 * Peddie Soccer SAC — Database API: Match Events
 * GET  /api/db/events?matchId=xxx      → All events for a match
 * GET  /api/db/events?matchExternalId=m-0 → By external match ID
 * GET  /api/db/events?playerExternalId=p-kim-t → Events by player
 * GET  /api/db/events?type=Goal         → Filter by event type
 * POST /api/db/events                   → Ingest a new event
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get('matchId');
    const matchExternalId = searchParams.get('matchExternalId');
    const playerExternalId = searchParams.get('playerExternalId');
    const type = searchParams.get('type');
    const team = searchParams.get('team'); // 'Peddie' | 'Opponent'
    const period = searchParams.get('period');

    // Resolve matchId from externalId if needed
    let resolvedMatchId: string | undefined = matchId ?? undefined;
    if (!resolvedMatchId && matchExternalId) {
      const match = await db.match.findUnique({ where: { externalId: matchExternalId } });
      if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 });
      resolvedMatchId = match.id;
    }

    let resolvedPlayerId: string | undefined;
    if (playerExternalId) {
      const player = await db.player.findUnique({ where: { externalId: playerExternalId } });
      if (!player) return NextResponse.json({ error: 'Player not found' }, { status: 404 });
      resolvedPlayerId = player.id;
    }

    const events = await db.matchEvent.findMany({
      where: {
        ...(resolvedMatchId ? { matchId: resolvedMatchId } : {}),
        ...(resolvedPlayerId ? { playerId: resolvedPlayerId } : {}),
        ...(type ? { type: type } : {}),
        ...(team ? { team } : {}),
        ...(period ? { period: parseInt(period) } : {}),
      },
      orderBy: [{ period: 'asc' }, { minute: 'asc' }, { second: 'asc' }],
      include: {
        match: { select: { externalId: true, opponent: true, matchDate: true } },
        player: { select: { externalId: true, name: true, number: true, position: true } },
      },
    });

    return NextResponse.json({
      events,
      meta: {
        total: events.length,
        goals: events.filter(e => e.type === 'Goal').length,
        byTeam: {
          peddie: events.filter(e => e.team === 'Peddie').length,
          opponent: events.filter(e => e.team === 'Opponent').length,
        },
      },
    });
  } catch (error) {
    console.error('[API /db/events] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      matchExternalId, externalId, minute, second, team,
      playerNumber, playerName, type, startX, startY,
      endX, endY, expectedGoals, success, description,
      phase, period, videoUrl, thumbnailUrl,
    } = body;

    if (!matchExternalId || !type || !team) {
      return NextResponse.json(
        { error: 'matchExternalId, type, and team are required' },
        { status: 400 }
      );
    }

    const match = await db.match.findUnique({ where: { externalId: matchExternalId } });
    if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 });

    // Try to find player by number + match
    let playerId: string | undefined;
    if (playerNumber) {
      const player = await db.player.findFirst({ where: { number: playerNumber, squadLevel: 'Varsity' } });
      if (player) playerId = player.id;
    }

    const event = await db.matchEvent.upsert({
      where: { externalId: externalId ?? `auto-${Date.now()}` },
      update: { minute, second, team, playerNumber, playerName, type, startX, startY, endX, endY, expectedGoals, success, description, phase, period, videoUrl, thumbnailUrl },
      create: {
        externalId: externalId ?? `auto-${Date.now()}`,
        matchId: match.id,
        playerId,
        minute: minute ?? 0,
        second: second ?? 0,
        team,
        playerNumber: playerNumber ?? 0,
        playerName: playerName ?? 'Unknown',
        type,
        startX: startX ?? 0,
        startY: startY ?? 0,
        endX, endY, expectedGoals,
        success: success ?? true,
        description: description ?? '',
        phase: phase ?? 'Open Play',
        period, videoUrl, thumbnailUrl,
      },
    });

    return NextResponse.json({ event, message: 'Event ingested successfully' });
  } catch (error) {
    console.error('[API /db/events POST] Error:', error);
    return NextResponse.json({ error: 'Failed to ingest event' }, { status: 500 });
  }
}
