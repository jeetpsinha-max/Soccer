import { NextResponse } from 'next/server';
import { SoccerTacticalAgent } from '@/lib/agents/soccer-agents';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const opponent = searchParams.get('opponent') || 'Blair Academy';

  const plan = SoccerTacticalAgent.generateTacticalPlan(opponent);

  return NextResponse.json({
    status: 'ok',
    plan
  });
}
