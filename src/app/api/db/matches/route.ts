/**
 * ============================================================================
 * Peddie Soccer SAC — Database API: Matches
 * GET  /api/db/matches              → All matches (optionally filtered)
 * GET  /api/db/matches?status=Completed → Filter by status
 * GET  /api/db/matches?id=xxx       → Single match with events + film
 * GET  /api/db/matches?externalId=m-0 → Lookup by external ID
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const externalId = searchParams.get('externalId');
    const status = searchParams.get('status');
    const season = searchParams.get('season');
    const isConference = searchParams.get('conference');
    const includeEvents = searchParams.get('events') === 'true';
    const includeFilm = searchParams.get('film') === 'true';

    // Single match lookup
    if (id || externalId) {
      const match = await db.match.findUnique({
        where: id ? { id } : { externalId: externalId! },
        include: {
          events: includeEvents
            ? { orderBy: [{ period: 'asc' }, { minute: 'asc' }, { second: 'asc' }] }
            : false,
          filmClips: includeFilm
            ? { orderBy: { minute: 'asc' } }
            : false,
          playerMatchStats: {
            include: { player: true },
            orderBy: { goals: 'desc' },
          },
        },
      });
      if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 });
      return NextResponse.json({ match });
    }

    // List with filters
    const matches = await db.match.findMany({
      where: {
        ...(status ? { status: status as 'Completed' | 'Live' | 'Upcoming' } : {}),
        ...(season ? { season } : {}),
        ...(isConference !== null ? { isConference: isConference === 'true' } : {}),
      },
      orderBy: { matchDate: 'asc' },
      include: {
        _count: { select: { events: true, filmClips: true } },
      },
    });

    const completed = matches.filter(m => m.status === 'Completed');
    const upcoming = matches.filter(m => m.status === 'Upcoming');
    const record = {
      wins: completed.filter(m => (m.peddieScore ?? 0) > (m.opponentScore ?? 0)).length,
      losses: completed.filter(m => (m.peddieScore ?? 0) < (m.opponentScore ?? 0)).length,
      draws: completed.filter(m => (m.peddieScore ?? 0) === (m.opponentScore ?? 0)).length,
      goalsFor: completed.reduce((s, m) => s + (m.peddieScore ?? 0), 0),
      goalsAgainst: completed.reduce((s, m) => s + (m.opponentScore ?? 0), 0),
    };

    return NextResponse.json({
      matches,
      meta: {
        total: matches.length,
        completed: completed.length,
        upcoming: upcoming.length,
        record,
      },
    });
  } catch (error) {
    console.error('[API /db/matches] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
