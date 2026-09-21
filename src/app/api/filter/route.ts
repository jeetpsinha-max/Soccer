import { NextResponse } from 'next/server';
import { MATCH_EVENTS_VEO_HAVERFORD } from '@/lib/soccer-data';
import { SoccerTacticalAgent } from '@/lib/agents/soccer-agents';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = body.query || '';

    const matchedEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage(query, MATCH_EVENTS_VEO_HAVERFORD);

    return NextResponse.json({
      status: 'ok',
      query,
      count: matchedEvents.length,
      events: matchedEvents
    });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err?.message || 'Invalid request' }, { status: 400 });
  }
}
