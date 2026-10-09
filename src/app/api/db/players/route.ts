/**
 * ============================================================================
 * Peddie Soccer SAC — Database API: Players
 * GET  /api/db/players           → List all players (with filters)
 * GET  /api/db/players?id=xxx    → Single player by DB id
 * GET  /api/db/players?squad=Varsity → Filter by squad level
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const externalId = searchParams.get('externalId');
    const squad = searchParams.get('squad');
    const position = searchParams.get('position');
    const name = searchParams.get('name');

    // Single player lookup
    if (id) {
      const player = await db.player.findUnique({
        where: { id },
        include: {
          playerMatchStats: { include: { match: true } },
          matchEvents: { include: { match: true }, take: 50, orderBy: { createdAt: 'desc' } },
          filmClips: { take: 20 },
        },
      });
      if (!player) return NextResponse.json({ error: 'Player not found' }, { status: 404 });
      return NextResponse.json({ player });
    }

    if (externalId) {
      const player = await db.player.findUnique({
        where: { externalId },
        include: { playerMatchStats: { include: { match: true } } },
      });
      if (!player) return NextResponse.json({ error: 'Player not found' }, { status: 404 });
      return NextResponse.json({ player });
    }

    // List with optional filters
    const players = await db.player.findMany({
      where: {
        ...(squad ? { squadLevel: squad } : {}),
        ...(position ? { position: position } : {}),
        ...(name ? { name: { contains: name } } : {}),
      },
      orderBy: [{ squadLevel: 'asc' }, { goals: 'desc' }, { number: 'asc' }],
    });

    return NextResponse.json({
      players,
      meta: {
        total: players.length,
        varsity: players.filter(p => p.squadLevel === 'Varsity').length,
        jv: players.filter(p => p.squadLevel === 'JuniorVarsity').length,
      },
    });
  } catch (error) {
    console.error('[API /db/players] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
