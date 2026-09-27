-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "classYear" TEXT NOT NULL,
    "gradYear" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "secondaryPosition" TEXT,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "squadLevel" TEXT NOT NULL DEFAULT 'Varsity',
    "tacticalRole" TEXT,
    "scoutingTier" TEXT,
    "height" TEXT NOT NULL DEFAULT '',
    "weight" TEXT NOT NULL DEFAULT '',
    "hometown" TEXT NOT NULL DEFAULT '',
    "topSpeedMph" REAL NOT NULL DEFAULT 0,
    "distanceCoveredMiles" REAL NOT NULL DEFAULT 0,
    "minutesPlayed" INTEGER NOT NULL DEFAULT 0,
    "matchesPlayed" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "expectedGoals" REAL NOT NULL DEFAULT 0,
    "expectedAssists" REAL NOT NULL DEFAULT 0,
    "passCompletionPct" REAL NOT NULL DEFAULT 0,
    "tackleSuccessPct" REAL NOT NULL DEFAULT 0,
    "shots" INTEGER NOT NULL DEFAULT 0,
    "shotsOnTarget" INTEGER NOT NULL DEFAULT 0,
    "keyPasses" INTEGER NOT NULL DEFAULT 0,
    "interceptions" INTEGER NOT NULL DEFAULT 0,
    "clearances" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "goalsConceded" INTEGER NOT NULL DEFAULT 0,
    "cleanSheets" INTEGER NOT NULL DEFAULT 0,
    "matchFormScore" REAL,
    "photoUrl" TEXT,
    "photoUrl2" TEXT,
    "recruitmentNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT,
    "season" TEXT NOT NULL DEFAULT '2026-2027',
    "matchDate" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "opponentLogoText" TEXT,
    "isHome" BOOLEAN NOT NULL DEFAULT true,
    "isConference" BOOLEAN NOT NULL DEFAULT false,
    "matchType" TEXT,
    "rivalryName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Upcoming',
    "peddieScore" INTEGER,
    "opponentScore" INTEGER,
    "expectedGoalsPeddie" REAL,
    "expectedGoalsOpponent" REAL,
    "possessionPctPeddie" REAL,
    "fieldTiltPctPeddie" REAL,
    "ppdaPeddie" REAL,
    "ppdaOpponent" REAL,
    "xTPeddie" REAL,
    "xTOpponent" REAL,
    "keySummary" TEXT,
    "opponentRecord" TEXT,
    "projectedScore" TEXT,
    "nationalRanking" TEXT,
    "stateRanking" TEXT,
    "winProbabilityPct" REAL,
    "scoutingReportId" TEXT,
    "videoUrl" TEXT,
    "hudlUrl" TEXT,
    "filmProvider" TEXT,
    "thumbnailUrl" TEXT,
    "location" TEXT,
    "gameTime" TEXT,
    "sourceUrl" TEXT,
    "sourceLabel" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "match_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT,
    "minute" INTEGER NOT NULL,
    "second" INTEGER NOT NULL DEFAULT 0,
    "team" TEXT NOT NULL,
    "playerNumber" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startX" REAL NOT NULL,
    "startY" REAL NOT NULL,
    "endX" REAL,
    "endY" REAL,
    "expectedGoals" REAL,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "period" INTEGER,
    "videoUrl" TEXT,
    "thumbnailUrl" TEXT,
    "filmClipId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "match_events_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "match_events_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "match_events_filmClipId_fkey" FOREIGN KEY ("filmClipId") REFERENCES "film_clips" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "film_clips" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT,
    "provider" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "startTimeSec" REAL,
    "endTimeSec" REAL,
    "durationSec" REAL,
    "minute" INTEGER,
    "second" INTEGER,
    "phase" TEXT,
    "tags" TEXT,
    "isHighlight" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "film_clips_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "film_clips_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_match_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "minutesPlayed" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "shots" INTEGER NOT NULL DEFAULT 0,
    "shotsOnTarget" INTEGER NOT NULL DEFAULT 0,
    "keyPasses" INTEGER NOT NULL DEFAULT 0,
    "passAttempts" INTEGER NOT NULL DEFAULT 0,
    "passCompleted" INTEGER NOT NULL DEFAULT 0,
    "tackles" INTEGER NOT NULL DEFAULT 0,
    "tacklesWon" INTEGER NOT NULL DEFAULT 0,
    "interceptions" INTEGER NOT NULL DEFAULT 0,
    "clearances" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "goalsConceded" INTEGER NOT NULL DEFAULT 0,
    "xG" REAL NOT NULL DEFAULT 0,
    "xA" REAL NOT NULL DEFAULT 0,
    "matchFormScore" REAL,
    "distanceMiles" REAL,
    "topSpeedMph" REAL,
    "formationSlot" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_match_stats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "player_match_stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ingestion_audit_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT,
    "source" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "recordType" TEXT NOT NULL,
    "externalId" TEXT,
    "rawPayload" TEXT,
    "resolvedPayload" TEXT,
    "conflictReason" TEXT,
    "runAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationMs" INTEGER,
    "errorMessage" TEXT,
    CONSTRAINT "ingestion_audit_logs_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "opponent_teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "logoText" TEXT,
    "conference" TEXT,
    "headCoach" TEXT,
    "primaryFormation" TEXT,
    "secondaryFormation" TEXT,
    "currentRecord" TEXT,
    "winProbabilityPct" REAL,
    "threatLevel" TEXT,
    "nationalRanking" TEXT,
    "stateRanking" TEXT,
    "hudlUrl" TEXT,
    "sourceUrl" TEXT,
    "scoutingOverview" TEXT,
    "tacticalNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "opponent_players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT,
    "teamId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "classYear" TEXT,
    "height" TEXT,
    "dominantFoot" TEXT,
    "tacticalRole" TEXT NOT NULL,
    "dangerLevel" TEXT NOT NULL,
    "traits" TEXT,
    "strengths" TEXT,
    "vulnerabilities" TEXT,
    "currentSeasonNotes" TEXT,
    "peddieMatchupCounter" TEXT,
    "profileUrl" TEXT,
    "filmUrl" TEXT,
    "goals" INTEGER,
    "assists" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "opponent_players_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "opponent_teams" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "players_externalId_key" ON "players"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "matches_externalId_key" ON "matches"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "match_events_externalId_key" ON "match_events"("externalId");

-- CreateIndex
CREATE INDEX "match_events_matchId_idx" ON "match_events"("matchId");

-- CreateIndex
CREATE INDEX "match_events_playerId_idx" ON "match_events"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "film_clips_externalId_key" ON "film_clips"("externalId");

-- CreateIndex
CREATE INDEX "film_clips_matchId_idx" ON "film_clips"("matchId");

-- CreateIndex
CREATE INDEX "player_match_stats_matchId_idx" ON "player_match_stats"("matchId");

-- CreateIndex
CREATE INDEX "player_match_stats_playerId_idx" ON "player_match_stats"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "player_match_stats_matchId_playerId_key" ON "player_match_stats"("matchId", "playerId");

-- CreateIndex
CREATE INDEX "ingestion_audit_logs_matchId_idx" ON "ingestion_audit_logs"("matchId");

-- CreateIndex
CREATE INDEX "ingestion_audit_logs_source_idx" ON "ingestion_audit_logs"("source");

-- CreateIndex
CREATE UNIQUE INDEX "opponent_teams_externalKey_key" ON "opponent_teams"("externalKey");

-- CreateIndex
CREATE UNIQUE INDEX "opponent_players_externalId_key" ON "opponent_players"("externalId");

-- CreateIndex
CREATE INDEX "opponent_players_teamId_idx" ON "opponent_players"("teamId");
