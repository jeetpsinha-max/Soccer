/**
 * ============================================================================
 * Peddie Soccer SAC — Phase 2: Automated Ingestion Pipeline
 * POST /api/db/ingest/match-events
 *   → Accepts a payload from Veo webhooks or manual upload
 *   → Deduplicates events by externalId
 *   → Links events to player records and match records
 *   → Writes audit trail to IngestionAuditLog
 *
 * POST /api/db/ingest/film
 *   → Accepts Hudl Fan / Veo film metadata
 *   → Creates FilmClip records linked to matches
 *
 * GET  /api/db/ingest/status
 *   → Returns ingestion audit logs for monitoring
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// ---------------------------------------------------------------------------
// Shared: Resolve a match by externalId or opponent name + date
// ---------------------------------------------------------------------------
async function resolveMatch(externalId?: string, opponent?: string, date?: string) {
  if (externalId) {
    return db.match.findUnique({ where: { externalId } });
  }
  if (opponent && date) {
    return db.match.findFirst({
      where: { opponent: { contains: opponent }, matchDate: date },
    });
  }
  return null;
}

// ---------------------------------------------------------------------------
// Shared: Resolve a player by externalId or jersey number
// ---------------------------------------------------------------------------
async function resolvePlayer(externalId?: string, number?: number) {
  if (externalId) return db.player.findUnique({ where: { externalId } });
  if (number) return db.player.findFirst({ where: { number, squadLevel: 'Varsity' } });
  return null;
}

// ---------------------------------------------------------------------------
// POST /api/db/ingest  — Match Events Ingestion
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { source = 'manual', mode, events: rawEvents, clip: rawClip } = body;

  // ---- MODE: film clip ingestion ----
  if (mode === 'film') {
    return ingestFilmClip(rawClip, source, startTime);
  }

  // ---- MODE: match events (default) ----
  return ingestMatchEvents(rawEvents, source, startTime, body);
}

// ---------------------------------------------------------------------------
async function ingestMatchEvents(
  rawEvents: unknown[],
  source: string,
  startTime: number,
  body: Record<string, unknown>
) {
  if (!Array.isArray(rawEvents) || rawEvents.length === 0) {
    return NextResponse.json({ error: 'events array is required and must not be empty' }, { status: 400 });
  }

  const match = await resolveMatch(
    body.matchExternalId as string | undefined,
    body.opponent as string | undefined,
    body.date as string | undefined
  );

  if (!match) {
    return NextResponse.json({
      error: 'Match not found. Provide matchExternalId (e.g. "m-0") or opponent + date.',
    }, { status: 404 });
  }

  let ingested = 0;
  let skipped = 0;
  let conflicts = 0;
  const auditDetails: string[] = [];

  for (const raw of rawEvents as Record<string, unknown>[]) {
    const extId = raw.id as string | undefined;

    // Check for duplicate
    if (extId) {
      const existing = await db.matchEvent.findUnique({ where: { externalId: extId } });
      if (existing) {
        // Conflict resolution: keep newest if data differs
        const hasConflict = existing.playerName !== raw.playerName ||
          existing.minute !== raw.minute ||
          existing.type !== raw.type;

        if (hasConflict) {
          conflicts++;
          await db.ingestionAuditLog.create({
            data: {
              matchId: match.id,
              source: source,
              status: 'conflict',
              recordType: 'event',
              externalId: extId,
              rawPayload: JSON.stringify(raw),
              conflictReason: `Existing event ${extId} has different data; skipping overwrite`,
            }
          });
          continue;
        }
        skipped++;
        continue;
      }
    }

    // Resolve player
    const player = await resolvePlayer(
      raw.playerExternalId as string | undefined,
      raw.playerNumber as number | undefined
    );

    await db.matchEvent.create({
      data: {
        externalId: extId ?? `${source}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        matchId: match.id,
        playerId: player?.id,
        minute: (raw.minute as number) ?? 0,
        second: (raw.second as number) ?? 0,
        team: (raw.team as string) ?? 'Peddie',
        playerNumber: (raw.playerNumber as number) ?? 0,
        playerName: (raw.playerName as string) ?? 'Unknown',
        type: raw.type as string,
        startX: (raw.startX as number) ?? 0,
        startY: (raw.startY as number) ?? 0,
        endX: raw.endX as number | undefined,
        endY: raw.endY as number | undefined,
        expectedGoals: raw.expectedGoals as number | undefined,
        success: (raw.success as boolean) ?? true,
        description: (raw.description as string) ?? '',
        phase: (raw.phase as string) ?? 'Open Play',
        period: raw.period as number | undefined,
        videoUrl: raw.videoUrl as string | undefined,
        thumbnailUrl: raw.thumbnailUrl as string | undefined,
      }
    });
    ingested++;
    auditDetails.push(`${raw.type}@${raw.minute}' by ${raw.playerName}`);
  }

  // Audit log
  await db.ingestionAuditLog.create({
    data: {
      matchId: match.id,
      source: source as never,
      status: conflicts > 0 ? 'conflict' : 'success',
      recordType: 'event',
      rawPayload: JSON.stringify({ count: rawEvents.length }),
      resolvedPayload: JSON.stringify({ ingested, skipped, conflicts, events: auditDetails }),
      durationMs: Date.now() - startTime,
    }
  });

  return NextResponse.json({
    success: true,
    match: { id: match.id, externalId: match.externalId, opponent: match.opponent },
    ingested,
    skipped,
    conflicts,
    message: `${ingested} events ingested, ${skipped} duplicates skipped, ${conflicts} conflicts flagged.`,
  });
}

// ---------------------------------------------------------------------------
async function ingestFilmClip(
  clip: Record<string, unknown>,
  source: string,
  startTime: number
) {
  if (!clip || !clip.matchExternalId || !clip.videoUrl) {
    return NextResponse.json({
      error: 'clip.matchExternalId and clip.videoUrl are required'
    }, { status: 400 });
  }

  const match = await db.match.findUnique({
    where: { externalId: clip.matchExternalId as string }
  });
  if (!match) {
    return NextResponse.json({ error: 'Match not found' }, { status: 404 });
  }

  const player = await resolvePlayer(
    clip.playerExternalId as string | undefined,
    clip.playerNumber as number | undefined
  );

  const filmClip = await db.filmClip.upsert({
    where: { externalId: (clip.externalId as string) ?? `film-${Date.now()}` },
    update: {
      title: clip.title as string ?? 'Untitled Clip',
      videoUrl: clip.videoUrl as string,
      thumbnailUrl: clip.thumbnailUrl as string | undefined,
      minute: clip.minute as number | undefined,
      phase: clip.phase as string | undefined,
      isHighlight: (clip.isHighlight as boolean) ?? false,
    },
    create: {
      externalId: (clip.externalId as string) ?? `film-${Date.now()}`,
      matchId: match.id,
      playerId: player?.id,
      provider: (clip.provider as string) ?? 'hudl',
      title: (clip.title as string) ?? 'Untitled Clip',
      videoUrl: clip.videoUrl as string,
      thumbnailUrl: clip.thumbnailUrl as string | undefined,
      startTimeSec: clip.startTimeSec as number | undefined,
      endTimeSec: clip.endTimeSec as number | undefined,
      durationSec: clip.durationSec as number | undefined,
      minute: clip.minute as number | undefined,
      second: clip.second as number | undefined,
      phase: clip.phase as string | undefined,
      tags: clip.tags ? JSON.stringify(clip.tags) : undefined,
      isHighlight: (clip.isHighlight as boolean) ?? false,
    }
  });

  await db.ingestionAuditLog.create({
    data: {
      matchId: match.id,
      source: source as never,
      status: 'success',
      recordType: 'film_clip',
      externalId: filmClip.externalId ?? undefined,
      resolvedPayload: JSON.stringify({ filmClipId: filmClip.id, provider: filmClip.provider }),
      durationMs: Date.now() - startTime,
    }
  });

  return NextResponse.json({ success: true, filmClip });
}

// ---------------------------------------------------------------------------
// GET /api/db/ingest — Ingestion audit status
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '50');
  const source = searchParams.get('source');
  const status = searchParams.get('status');

  const logs = await db.ingestionAuditLog.findMany({
    where: {
      ...(source ? { source: source } : {}),
      ...(status ? { status: status } : {}),
    },
    orderBy: { runAt: 'desc' },
    take: limit,
    include: {
      match: { select: { externalId: true, opponent: true, matchDate: true } },
    },
  });

  const summary = {
    total: logs.length,
    success: logs.filter(l => l.status === 'success').length,
    conflicts: logs.filter(l => l.status === 'conflict').length,
    failed: logs.filter(l => l.status === 'failed').length,
    pending: logs.filter(l => l.status === 'pending').length,
  };

  return NextResponse.json({ logs, summary });
}
