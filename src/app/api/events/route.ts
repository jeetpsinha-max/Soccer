import { NextResponse } from 'next/server';
import { MATCH_EVENTS_VEO_HAVERFORD } from '@/lib/soccer-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const team = searchParams.get('team');
  const player = searchParams.get('player');

  let events = MATCH_EVENTS_VEO_HAVERFORD;

  if (type) {
    events = events.filter(e => e.type.toLowerCase() === type.toLowerCase());
  }

  if (team) {
    events = events.filter(e => e.team.toLowerCase() === team.toLowerCase());
  }

  if (player) {
    events = events.filter(e => e.playerName.toLowerCase().includes(player.toLowerCase()));
  }

  return NextResponse.json({
    status: 'ok',
    total: events.length,
    events
  });
}
