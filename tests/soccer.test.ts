import { describe, it, expect } from 'vitest';
import { 
  PEDDIE_ROSTER_2026_2027, 
  PEDDIE_JV_ROSTER_2026_2027,
  PEDDIE_SCHEDULE_2026_2027, 
  OPPONENT_VEO_SCOUTING,
  FORMATIONS_CONFIG, 
  MATCH_EVENTS_VEO_HAVERFORD,
  XT_GRID_PITCH_MODEL,
  PPDA_SEASON_SERIES,
  XG_TIMELINE_PDS,
  ALL_VEO_MATCH_EVENTS,
  PEDDIE_SEASON_TEAM_STATS_2026
} from '../src/lib/soccer-data';
import { 
  OPPONENT_PLAYER_SCOUTING_REPORTS, 
  ALL_OPPONENT_PLAYER_REPORTS, 
  getOpponentPlayers 
} from '../src/lib/opponent-players-data';
import { SoccerCsvEngine } from '../src/lib/soccer-csv-engine';
import { SoccerTacticalAgent } from '../src/lib/agents/soccer-agents';

describe('Peddie Soccer Gridiron 2026-2027 Core Engine', () => {
  it('validates active varsity roster integrity, zero 2026 graduates, and 4 new captains', () => {
    // 1. Ensure zero players with gradYear 2026 (they graduated)
    const classOf2026 = PEDDIE_ROSTER_2026_2027.filter(p => p.gradYear === 2026);
    expect(classOf2026.length).toBe(0);

    // 2. Official 4 new captains: Christian (#13), Rayyaan (#14), Noah (#12), Tommy (#28)
    const captains = PEDDIE_ROSTER_2026_2027.filter(p => p.isCaptain);
    expect(captains.length).toBe(4);
    const captainNames = captains.map(c => c.name);
    expect(captainNames).toContain('Christian Tharney');
    expect(captainNames).toContain('Rayyaan Mohiuddin');
    expect(captainNames).toContain('Noah Eldessouky');
    expect(captainNames).toContain('Tommy Kim');

    const tharney = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Christian Tharney');
    expect(tharney).toBeDefined();
    expect(tharney?.number).toBe(13);
    expect(tharney?.isCaptain).toBe(true);

    // 3. Number 8 is Owen Bonchev (starting CB with Carson Wiley); Massimo did not play in opener (DNP)
    const owen = PEDDIE_ROSTER_2026_2027.find(p => p.number === 8);
    expect(owen).toBeDefined();
    expect(owen?.name).toBe('Owen Bonchev');
    expect(owen?.position).toBe('CB');

    const massimo = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Massimo Sheinin');
    expect(massimo).toBeDefined();
    expect(massimo?.recruitmentNotes).toContain('DNP');

    // 4. Number 10 is Quinn Wachtveitl; Tommy Kim is #28 (Captain)
    const quinn = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Quinn Wachtveitl');
    expect(quinn).toBeDefined();
    expect(quinn?.number).toBe(10);

    const tommy = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Tommy Kim');
    expect(tommy).toBeDefined();
    expect(tommy?.number).toBe(28);
    expect(tommy?.isCaptain).toBe(true);

    // 5. Noah Eldessouky is #12; Clayton Ling is jersey #3; Connor Mahoney is not on the team
    const noah = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Noah Eldessouky');
    expect(noah).toBeDefined();
    expect(noah?.number).toBe(12);
    expect(noah?.isCaptain).toBe(true);

    const claytonLing = PEDDIE_ROSTER_2026_2027.find(p => p.number === 3);
    expect(claytonLing).toBeDefined();
    expect(claytonLing?.name).toBe('Clayton Ling');

    const mahoney = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes('Mahoney'));
    expect(mahoney).toBeUndefined();

    // 6. Verify fake names (Shavel, Patel, Murphy, D'Alonzo, Chen, Zeller) are completely wiped
    const fakeNames = ['Shavel', 'Patel', 'Murphy', "D'Alonzo", 'Chen', 'Zeller'];
    fakeNames.forEach(name => {
      const found = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes(name));
      expect(found).toBeUndefined();
    });

    // 7. Verify Junior Varsity (JV) separation: Raymond Li and Harrison Kwok are strictly JV, not Varsity
    const raymondVarsity = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes('Raymond') || p.name.includes('Raymond Li'));
    expect(raymondVarsity).toBeUndefined();

    const harrisonVarsity = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes('Kwok') || p.name.includes('Harrison Kwok'));
    expect(harrisonVarsity).toBeUndefined();

    expect(PEDDIE_JV_ROSTER_2026_2027.length).toBe(2);
    expect(PEDDIE_JV_ROSTER_2026_2027.map(p => p.name)).toEqual(['Raymond Li', 'Harrison Kwok']);
    expect(PEDDIE_JV_ROSTER_2026_2027.every(p => p.squadLevel === 'Junior Varsity')).toBe(true);

    // Verify all active Peddie roster players are explicitly Varsity
    expect(PEDDIE_ROSTER_2026_2027.every(p => p.squadLevel === 'Varsity')).toBe(true);

    // 8. Validate all official rostered players & jersey numbers
    const dylanMcKenzie = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Dylan McKenzie');
    expect(dylanMcKenzie).toBeDefined();
    expect(dylanMcKenzie?.number).toBe(98);
    expect(dylanMcKenzie?.position).toBe('GK');

    const jefferyZhang = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Jeffrey Zhang');
    expect(jefferyZhang).toBeDefined();
    expect(jefferyZhang?.number).toBe(20);
    expect(jefferyZhang?.classYear).toBe('Junior');
    expect(jefferyZhang?.position).toBe('ST');
    expect(jefferyZhang?.secondaryPosition).toBe('GK'); // Jeffrey is backup GK to Dylan

    const gabrielLam = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Gabriel Lam');
    expect(gabrielLam).toBeDefined();
    expect(gabrielLam?.number).toBe(5);
    expect(gabrielLam?.position).toBe('RB');

    const jeetSinha = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Jeet Sinha');
    expect(jeetSinha).toBeDefined();
    expect(jeetSinha?.number).toBe(6);
    expect(jeetSinha?.classYear).toBe('Junior');
    expect(jeetSinha?.position).toBe('LM');
    expect(jeetSinha?.photoUrl).toBe('/media-day-headshots/IMG_000761.jpg');
    expect(jeetSinha?.actionPhotoUrl).toBe('/media-day-previews/IMG_000769.jpg');

    const brodyRozo = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Brody Rozo');
    expect(brodyRozo).toBeDefined();
    expect(brodyRozo?.number).toBe(18);
    expect(brodyRozo?.classYear).toBe('Sophomore');
    expect(brodyRozo?.position).toBe('CM');
    expect(brodyRozo?.photoUrl).toBe('/media-day-headshots/IMG_0001109.jpg');
    expect(brodyRozo?.actionPhotoUrl).toBe('/media-day-previews/IMG_0001065.jpg');

    const blakeRomanelli = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Blake Romanelli');
    expect(blakeRomanelli).toBeDefined();
    expect(blakeRomanelli?.number).toBe(26);
    expect(blakeRomanelli?.classYear).toBe('Sophomore');
    expect(blakeRomanelli?.position).toBe('RB');
    expect(blakeRomanelli?.secondaryPosition).toBe('RM');

    const harryXiao = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Harry Xiao');
    expect(harryXiao).toBeDefined();
    expect(harryXiao?.number).toBe(25);
    expect(harryXiao?.classYear).toBe('Junior');

    const bennettCucchiara = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Bennett Cucchiara');
    expect(bennettCucchiara).toBeDefined();
    expect(bennettCucchiara?.number).toBe(7);
    expect(bennettCucchiara?.photoUrl).toBe('/media-day-headshots/IMG_0001197.jpg');
    expect(bennettCucchiara?.photoUrl2).toBe('/media-day-previews/IMG_0001227.jpg');
    expect(bennettCucchiara?.actionPhotoUrl).toBe('/media-day-previews/IMG_0001227.jpg');

    const wyattRaya = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Wyatt Raya');
    expect(wyattRaya).toBeDefined();
    expect(wyattRaya?.number).toBe(2);
    expect(wyattRaya?.classYear).toBe('Sophomore');
    expect(wyattRaya?.position).toBe('CM');

    const zachHorsch = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Zachary Horsch');
    expect(zachHorsch).toBeDefined();
    expect(zachHorsch?.number).toBe(15);
    expect(zachHorsch?.classYear).toBe('Sophomore');

    const mango = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Mango Zhang');
    expect(mango).toBeDefined();
    expect(mango?.number).toBe(17);
    expect(mango?.classYear).toBe('Sophomore');

    const emersonGimbel = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Emerson Gimbel');
    expect(emersonGimbel).toBeDefined();
    expect(emersonGimbel?.number).toBe(19);

    const carsonWiley = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Carson Wiley');
    expect(carsonWiley).toBeDefined();
    expect(carsonWiley?.number).toBe(22);
    expect(carsonWiley?.classYear).toBe('Junior');

    // Confirm players not on the team are completely purged:
    const maxPersons = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Max Persons');
    expect(maxPersons).toBeUndefined();

    const umarMubaraki = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Umar Mubaraki');
    expect(umarMubaraki).toBeUndefined();

    const mattKleinhandler = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Matt Kleinhandler');
    expect(mattKleinhandler).toBeUndefined();

    // Exactly 25 players matching peddie.org active varsity roster (11 starters + 14 depth)
    expect(PEDDIE_ROSTER_2026_2027.length).toBe(25);

    // 8. Validate 4-4-2 Diamond Midfield system
    const diamond = FORMATIONS_CONFIG['4-4-2'];
    expect(diamond.name).toContain('4-4-2 Diamond Midfield');
    const diamondNodes = diamond.nodes;
    expect(diamondNodes.length).toBe(11);
    
    // Backline
    const lbNoah = diamondNodes.find(n => n.playerNumber === 12);
    expect(lbNoah?.playerName).toBe('Eldessouky (C)');
    const cbBonchev = diamondNodes.find(n => n.playerNumber === 8);
    expect(cbBonchev?.playerName).toBe('Bonchev');
    expect(cbBonchev?.position).toBe('CB');
    const cbWiley = diamondNodes.find(n => n.playerNumber === 22);
    expect(cbWiley?.playerName).toBe('Wiley');
    expect(cbWiley?.position).toBe('CB');
    const rbLam = diamondNodes.find(n => n.playerNumber === 5);
    expect(rbLam?.playerName).toBe('Lam');
    expect(rbLam?.role).toBe('Starting Right Fullback');

    // Diamond Midfield
    const cdm = diamondNodes.find(n => n.position === 'CDM');
    expect(cdm?.playerNumber).toBe(13);
    expect(cdm?.playerName).toContain('Tharney');
    expect(cdm?.role).toContain('Diamond Base');
    
    const lm = diamondNodes.find(n => n.position === 'LM');
    expect(lm?.playerNumber).toBe(10);
    expect(lm?.playerName).toBe('Wachtveitl');
    
    const rm = diamondNodes.find(n => n.position === 'RM');
    expect(rm?.playerNumber).toBe(7);
    expect(rm?.playerName).toBe('Cuchera');

    const cam = diamondNodes.find(n => n.position === 'CAM');
    expect(cam?.role).toContain('Diamond Tip');
    expect(cam?.playerNumber).toBe(14);
    expect(cam?.playerName).toContain('Mohiuddin');

    // Twin Strikers
    const stKim = diamondNodes.find(n => n.playerNumber === 28);
    expect(stKim?.playerName).toContain('Kim');
    expect(stKim?.position).toBe('ST');

    const stZhang = diamondNodes.find(n => n.playerNumber === 20);
    expect(stZhang?.playerName).toBe('Zhang');
    expect(stZhang?.position).toBe('ST');
  });

  it('validates complete 17-match official schedule and Veo scouting coverage for all opponents', () => {
    // 1. Exactly 17 official fixtures from MaxPreps and Peddie Athletics
    expect(PEDDIE_SCHEDULE_2026_2027.length).toBe(17);

    // 2. Exactly 9 home matches and 8 away matches (total 17)
    const homeMatches = PEDDIE_SCHEDULE_2026_2027.filter(m => m.isHome);
    const awayMatches = PEDDIE_SCHEDULE_2026_2027.filter(m => !m.isHome);
    expect(homeMatches.length).toBe(9);
    expect(awayMatches.length).toBe(8);

    // 3. Exactly 5 MAPL Conference rivals
    const maplMatches = PEDDIE_SCHEDULE_2026_2027.filter(m => m.isConference);
    expect(maplMatches.length).toBe(5);

    // 4. Completed matches through mid-Sept 2026: Haverford (0-5), Aquinas (3-2), Trenton (2-3), George (5-2), PDS (7-1)
    const completedMatches = PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Completed');
    expect(completedMatches.length).toBe(5);

    const upcomingMatches = PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Upcoming');
    expect(upcomingMatches.length).toBe(12);

    const opener = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === 'm-0');
    expect(opener?.opponent).toBe('The Haverford School');
    expect(opener?.status).toBe('Completed');
    expect(opener?.peddieScore).toBe(0);
    expect(opener?.opponentScore).toBe(5);

    const aquinasFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === 'm-1');
    expect(aquinasFixture?.opponent).toBe('St. Thomas Aquinas High School');
    expect(aquinasFixture?.status).toBe('Completed');
    expect(aquinasFixture?.peddieScore).toBe(3);
    expect(aquinasFixture?.opponentScore).toBe(2);
    expect(aquinasFixture?.keySummary).toContain('Tommy Kim');
    expect(aquinasFixture?.keySummary).toContain('Christian Tharney');
    expect(aquinasFixture?.keySummary).toContain('Carson');

    // Verify scorers have Aquinas game logged and goals strictly reflect 2026-2027 season
    const tommy = PEDDIE_ROSTER_2026_2027.find(p => p.number === 28);
    expect(tommy?.goals).toBe(7);
    expect(tommy?.topSpeedMph).toBe(21.3);
    expect(tommy?.assignmentHistory.some(a => a.opponent === 'Aquinas')).toBe(true);

    const tharney = PEDDIE_ROSTER_2026_2027.find(p => p.number === 13);
    expect(tharney?.goals).toBe(1);
    expect(tharney?.topSpeedMph).toBe(20.4);
    expect(tharney?.assignmentHistory.some(a => a.opponent === 'Aquinas')).toBe(true);

    const carson = PEDDIE_ROSTER_2026_2027.find(p => p.name.includes('Carson'));
    expect(carson?.goals).toBe(1);
    expect(carson?.assignmentHistory.some(a => a.opponent === 'Aquinas')).toBe(true);

    const blairFixture = PEDDIE_SCHEDULE_2026_2027.find(m => m.opponent.includes('Blair'));
    expect(blairFixture).toBeDefined();
    expect(blairFixture?.rivalryName).toContain('Peddie-Blair Day');
    expect(blairFixture?.status).toBe('Upcoming');
    expect(blairFixture?.peddieScore).toBeUndefined();

    // 5. Verify every scheduled match with scoutingReportId maps to a comprehensive Veo scouting dossier
    PEDDIE_SCHEDULE_2026_2027.forEach(fixture => {
      expect(fixture.matchDate).toBeTruthy();
      expect(fixture.gameTime).toBeTruthy();
      expect(fixture.location).toBeTruthy();
      expect(fixture.scoutingReportId).toBeTruthy();

      const scoutKey = fixture.scoutingReportId!;
      const dossier = OPPONENT_VEO_SCOUTING[scoutKey];
      expect(dossier).toBeDefined();
      expect(dossier.opponent).toBeTruthy();
      expect(dossier.logoText).toBeTruthy();
      expect(dossier.winProbabilityPct).toBeGreaterThan(0);
      expect(dossier.veoClips.length).toBeGreaterThanOrEqual(2);
      expect(dossier.keyPlaymakers.length).toBeGreaterThanOrEqual(1);
      expect(dossier.tacticalBreakdown.inPossession).toBeTruthy();
      expect(dossier.tacticalBreakdown.outOfPossession).toBeTruthy();
      expect(dossier.tacticalBreakdown.transitionFlaws).toBeTruthy();
      expect(dossier.peddieCounterDirectives.coachNazarioDirective).toBeTruthy();
      expect(dossier.peddieCounterDirectives.diamondKeyAssignment).toBeTruthy();
    });

    // 6. Verify total Veo scouting database covers all 17 distinct teams
    const uniqueScoutedKeys = Object.keys(OPPONENT_VEO_SCOUTING);
    expect(uniqueScoutedKeys.length).toBe(17);
  });

  it('verifies all tactical formations have exactly 11 player nodes and valid coordinates', () => {
    const formations = ['4-3-3', '4-2-3-1', '3-5-2', '4-4-2'];
    formations.forEach(f => {
      const cfg = FORMATIONS_CONFIG[f];
      expect(cfg).toBeDefined();
      expect(cfg.nodes.length).toBe(11);
      cfg.nodes.forEach(node => {
        expect(node.xPct).toBeGreaterThanOrEqual(0);
        expect(node.xPct).toBeLessThanOrEqual(100);
        expect(node.yPct).toBeGreaterThanOrEqual(0);
        expect(node.yPct).toBeLessThanOrEqual(100);
        expect(node.playerName).toBeTruthy();
      });
    });
  });

  it('tests SoccerCsvEngine serialization and deserialization roundtrip', () => {
    const csv = SoccerCsvEngine.exportToCsv(MATCH_EVENTS_VEO_HAVERFORD);
    expect(csv).toContain('EVENT_ID,MINUTE,SECOND');
    expect(csv).toContain('Tommy Kim');
    expect(csv).toContain('Dylan McKenzie');

    const parsed = SoccerCsvEngine.parseCsv(csv);
    expect(parsed.length).toBe(MATCH_EVENTS_VEO_HAVERFORD.length);
    expect(parsed[0].minute).toBe(MATCH_EVENTS_VEO_HAVERFORD[0].minute);
    expect(parsed[0].playerName).toBe(MATCH_EVENTS_VEO_HAVERFORD[0].playerName);
  });

  it('tests SoccerTacticalAgent NLP filter and opponent game planning', () => {
    const goalEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage('goal', MATCH_EVENTS_VEO_HAVERFORD);
    expect(goalEvents.length).toBe(5);
    expect(goalEvents.every(e => e.type === 'Goal')).toBe(true);

    const plan = SoccerTacticalAgent.generateTacticalPlan('Blair Academy');
    expect(plan.opponent).toContain('Blair');
    expect(plan.substitutionsRoadmap.length).toBeGreaterThan(0);
    expect(plan.predictedOutcome.winProbabilityPct).toBeGreaterThan(50);
  });

  it('validates Official First Game vs The Haverford School on Veo AI Video', async () => {
    const { MATCH_EVENTS_VEO_HAVERFORD } = await import('../src/lib/soccer-data');
    
    // 1. Fixture m-0 is in schedule
    const firstGame = PEDDIE_SCHEDULE_2026_2027.find(m => m.id === 'm-0');
    expect(firstGame).toBeDefined();
    expect(firstGame?.opponent).toBe('The Haverford School');
    expect(firstGame?.matchDate).toBe('Sept 1, 2026');
    expect(firstGame?.status).toBe('Completed');
    expect(firstGame?.videoUrl).toBe('https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/');
    expect(firstGame?.peddieScore).toBe(0);
    expect(firstGame?.opponentScore).toBe(5);

    // 2. Curated Veo highlights
    expect(MATCH_EVENTS_VEO_HAVERFORD).toBeDefined();
    expect(MATCH_EVENTS_VEO_HAVERFORD.length).toBe(18);

    // 3. Exactly 5 goals from the match
    const goals = MATCH_EVENTS_VEO_HAVERFORD.filter(e => e.type === 'Goal');
    expect(goals.length).toBe(5);

    // 4. Video URLs and thumbnails all point to Veo CDN
    MATCH_EVENTS_VEO_HAVERFORD.forEach(e => {
      expect(e.videoUrl).toMatch(/https:\/\/c\.veocdn\.com/);
      expect(e.thumbnailUrl).toBeTruthy();
      expect(e.period).toBeGreaterThanOrEqual(1);
      expect(e.period).toBeLessThanOrEqual(4);
    });

    // 5. NLP filtering on Veo events
    const kimEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage('kim', MATCH_EVENTS_VEO_HAVERFORD);
    expect(kimEvents.length).toBeGreaterThan(0);
    const mckenzieEvents = SoccerTacticalAgent.filterEventsByNaturalLanguage('mckenzie', MATCH_EVENTS_VEO_HAVERFORD);
    expect(mckenzieEvents.length).toBeGreaterThan(0);
  });

  it('validates Set-Piece Specialists (Tharney on Penalties, Left Corner, Free Kicks; Bennett Cuchera on Right Corner)', async () => {
    const { SIDELINE_SET_PIECE_PLAYBOOK } = await import('../src/lib/soccer-data');
    
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers).toBeDefined();
    
    // Penalties -> Christian Tharney (#13)
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers.penalties.primary).toContain('Christian Tharney');
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers.penalties.primary).toContain('13');

    // Left Corner -> Christian Tharney (#13)
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers.leftCorner.primary).toContain('Christian Tharney');
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers.leftCorner.primary).toContain('13');

    // Right Corner -> Bennett Cuchera (#7, Freshman)
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers.rightCorner.primary).toContain('Bennett Cuchera');
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers.rightCorner.primary).toContain('7');

    // Direct Free Kicks -> Christian Tharney (#13)
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers.freeKicks.primary).toContain('Christian Tharney');
    expect(SIDELINE_SET_PIECE_PLAYBOOK.designatedTakers.freeKicks.primary).toContain('13');
  });

  it('validates Advanced Data Analytics engine (xG flow, passing network, physical telemetry, GK metrics)', async () => {
    const { 
      XG_TIMELINE_HAVERFORD, 
      DETAILED_SHOTS_LOG_HAVERFORD, 
      PASSING_NETWORK_DIAMOND, 
      SQUAD_PHYSICAL_TELEMETRY, 
      GOALKEEPER_ADVANCED_METRICS 
    } = await import('../src/lib/soccer-data');

    // 1. xG Timelines (Season Opener vs Haverford)
    expect(XG_TIMELINE_HAVERFORD.length).toBeGreaterThanOrEqual(8);
    const finalHaverfordXg = XG_TIMELINE_HAVERFORD[XG_TIMELINE_HAVERFORD.length - 1].opponentXg;
    expect(finalHaverfordXg).toBeGreaterThan(3.0); // 3.48 xG
    const goalsInTimeline = XG_TIMELINE_HAVERFORD.filter(pt => pt.isGoal);
    expect(goalsInTimeline.length).toBe(5); // 5 Haverford goals

    // 2. Shot Quality Details (12 total shots logged for Season Opener)
    expect(DETAILED_SHOTS_LOG_HAVERFORD.length).toBe(12);
    const kimShot = DETAILED_SHOTS_LOG_HAVERFORD.find(s => s.playerNumber === 28);
    expect(kimShot).toBeDefined();
    expect(kimShot?.playerName).toBe('Tommy Kim');
    const cucheraShot = DETAILED_SHOTS_LOG_HAVERFORD.find(s => s.playerNumber === 7);
    expect(cucheraShot).toBeDefined();
    expect(cucheraShot?.playerName).toBe('Bennett Cuchera');

    // 3. Passing Network
    expect(PASSING_NETWORK_DIAMOND.length).toBeGreaterThanOrEqual(12);
    // Ensure captain Tharney (#13) and playmaker Mohiuddin (#14) are prominent nodes
    const tharneyLinks = PASSING_NETWORK_DIAMOND.filter(l => l.fromNumber === 13 || l.toNumber === 13);
    expect(tharneyLinks.length).toBeGreaterThanOrEqual(4);
    const mohiuddinLinks = PASSING_NETWORK_DIAMOND.filter(l => l.fromNumber === 14 || l.toNumber === 14);
    expect(mohiuddinLinks.length).toBeGreaterThanOrEqual(4);

    // 4. Squad Physical Telemetry covers all 25 players
    expect(SQUAD_PHYSICAL_TELEMETRY.length).toBe(25);
    SQUAD_PHYSICAL_TELEMETRY.forEach(athlete => {
      expect(athlete.totalDistanceMiles).toBeGreaterThan(3.0);
      expect(athlete.topSpeedMph).toBeGreaterThan(16.0);
      expect(athlete.aerobicWorkRatePct).toBeGreaterThanOrEqual(80);
    });

    // 5. Goalkeeper Advanced Metrics
    expect(GOALKEEPER_ADVANCED_METRICS.length).toBe(2);
    const dylanGk = GOALKEEPER_ADVANCED_METRICS.find(g => g.playerNumber === 98);
    expect(dylanGk).toBeDefined();
    expect(dylanGk?.isStarter).toBe(true);
    expect(dylanGk?.goalsPrevented).toBeGreaterThan(0); // Positive PSxG
    expect(dylanGk?.crossesClaimedPct).toBeGreaterThan(90);

    const jeffreyGk = GOALKEEPER_ADVANCED_METRICS.find(g => g.playerNumber === 20);
    expect(jeffreyGk).toBeDefined();
    expect(jeffreyGk?.isStarter).toBe(false);

    // 6. Test Midfielder filter includes LM and RM
    const midPositions = ['CDM', 'CM', 'CAM', 'LM', 'RM'];
    const quinn = PEDDIE_ROSTER_2026_2027.find(p => p.number === 10);
    expect(quinn?.position).toBe('LM');
    expect(midPositions.includes(quinn!.position)).toBe(true);

    const jeet = PEDDIE_ROSTER_2026_2027.find(p => p.number === 6);
    expect(jeet?.position).toBe('LM');
    expect(midPositions.includes(jeet!.position)).toBe(true);

    const bennett = PEDDIE_ROSTER_2026_2027.find(p => p.number === 7);
    expect(bennett?.position).toBe('RM');
    expect(midPositions.includes(bennett!.position)).toBe(true);

    // 7. Verify media day photo coverage: 19 athletes have official media day photos; Massimo Sheinin (#27) has no media day photo
    expect(PEDDIE_ROSTER_2026_2027.length).toBe(25);
    const massimoAthlete = PEDDIE_ROSTER_2026_2027.find(p => p.name === 'Massimo Sheinin');
    expect(massimoAthlete?.photoUrl).toBeUndefined();
    expect(massimoAthlete?.photoUrl2).toBeUndefined();
    expect(massimoAthlete?.actionPhotoUrl).toBeUndefined();

    const playersWithPhotos = PEDDIE_ROSTER_2026_2027.filter(p => p.photoUrl);
    expect(playersWithPhotos.length).toBe(19);
    playersWithPhotos.forEach(player => {
      expect(player.photoUrl).toMatch(/^\/media-day-headshots\/IMG_\d+\.jpg$/);
      const photo2 = player.photoUrl2 || player.actionPhotoUrl;
      expect(photo2).toMatch(/^\/media-day-previews\/IMG_\d+\.jpg$/);
    });
  });

  it('validates 2026 campaign ground-truth matches, Veo/Hudl linkages, and Expected Threat (xT) models', () => {
    // 1. Verify 5 completed matches in 2026 schedule
    const completedMatches = PEDDIE_SCHEDULE_2026_2027.filter(m => m.status === 'Completed');
    expect(completedMatches.length).toBe(5);

    // Verify key scores
    const aquinas = completedMatches.find(m => m.id === 'm-1');
    expect(aquinas?.peddieScore).toBe(3);
    expect(aquinas?.opponentScore).toBe(2);

    const trenton = completedMatches.find(m => m.id === 'm-2');
    expect(trenton?.peddieScore).toBe(2);
    expect(trenton?.opponentScore).toBe(3);

    const george = completedMatches.find(m => m.id === 'm-3');
    expect(george?.peddieScore).toBe(5);
    expect(george?.opponentScore).toBe(2);

    const pds = completedMatches.find(m => m.id === 'm-4');
    expect(pds?.peddieScore).toBe(7);
    expect(pds?.opponentScore).toBe(1);

    // 2. Verify Veo & Hudl platform links
    completedMatches.forEach(m => {
      if (m.hudlUrl) {
        expect(m.hudlUrl).toContain('fan.hudl.com');
        expect(m.hudlUrl).toContain('15965');
      }
      if (m.videoUrl) {
        expect(m.videoUrl).toContain('app.veo.co');
      }
    });

    // 3. Verify Expected Threat (xT) pitch model
    expect(XT_GRID_PITCH_MODEL.peddieTotalXT).toBeGreaterThan(XT_GRID_PITCH_MODEL.opponentTotalXT);
    expect(XT_GRID_PITCH_MODEL.halfSpaceAdvantagePct).toBeGreaterThan(20);
    expect(XT_GRID_PITCH_MODEL.zones.length).toBeGreaterThanOrEqual(10);

    // 4. Verify PPDA series (Peddie maintains high-press intensity under 10.0 PPDA in wins)
    expect(PPDA_SEASON_SERIES.length).toBe(5);
    const pdsPpda = PPDA_SEASON_SERIES.find(p => p.matchId === 'm-4');
    expect(pdsPpda?.peddiePpda).toBeLessThan(8.0); // 6.9 PPDA dominant high trap

    // 5. Verify PDS 7-1 xG Timeline
    expect(XG_TIMELINE_PDS.length).toBeGreaterThanOrEqual(8);
    const finalPdsXg = XG_TIMELINE_PDS[XG_TIMELINE_PDS.length - 1].peddieXg;
    expect(finalPdsXg).toBeGreaterThan(4.0);
  });

  it('validates elimination of arcade OVR ratings and verifies tactical roles & scouting tiers across all 25 players', () => {
    // 1. All 25 rostered players must have authentic tacticalRole, scoutingTier, and valid matchFormScore (7.0 - 10.0)
    expect(PEDDIE_ROSTER_2026_2027.length).toBe(25);
    PEDDIE_ROSTER_2026_2027.forEach(player => {
      expect(player.tacticalRole).toBeDefined();
      expect(player.tacticalRole?.length).toBeGreaterThan(5);
      expect(player.scoutingTier).toBeDefined();
      expect(player.scoutingTier?.length).toBeGreaterThan(5);
      expect(player.matchFormScore).toBeGreaterThanOrEqual(7.0);
      expect(player.matchFormScore).toBeLessThanOrEqual(10.0);
    });

    // 2. Four team captains have verified roles
    const tharney = PEDDIE_ROSTER_2026_2027.find(p => p.number === 13);
    expect(tharney?.tacticalRole).toContain('Single Pivot');
    expect(tharney?.scoutingTier).toContain('All-MAPL');

    const kim = PEDDIE_ROSTER_2026_2027.find(p => p.number === 28);
    expect(kim?.tacticalRole).toContain('Center-Forward');
    expect(kim?.scoutingTier).toContain('NCAA D1');

    const eldessouky = PEDDIE_ROSTER_2026_2027.find(p => p.number === 12);
    expect(eldessouky?.tacticalRole).toContain('Wing-Back');

    const mohiuddin = PEDDIE_ROSTER_2026_2027.find(p => p.number === 14);
    expect(mohiuddin?.tacticalRole).toContain('Advanced Playmaker');
  });

  it('validates 17-opponent 5-player scouting coverage, fuzzy opponent lookup, and Veo film reels', () => {
    // 1. All 17 scheduled opponents have exactly 5 scouted players
    const opponentKeys = Object.keys(OPPONENT_PLAYER_SCOUTING_REPORTS);
    expect(opponentKeys.length).toBe(17);
    opponentKeys.forEach(key => {
      const players = OPPONENT_PLAYER_SCOUTING_REPORTS[key];
      expect(players.length).toBe(5);
      players.forEach(p => {
        expect(p.name).toBeDefined();
        expect(p.tacticalRole).toBeDefined();
        expect(p.dangerLevel).toBeDefined();
        expect(p.currentSeasonNotes).toBeDefined();
        expect(p.peddieMatchupCounter).toBeDefined();
      });
    });

    // Total 85 scouted opponent player dossiers
    expect(ALL_OPPONENT_PLAYER_REPORTS.length).toBe(85);

    // 2. Fuzzy opponent player lookup
    const lcaByKey = getOpponentPlayers('life-center');
    expect(lcaByKey.length).toBe(5);
    const lcaByName = getOpponentPlayers('Life Center Academy');
    expect(lcaByName.length).toBe(5);
    expect(lcaByName[0].teamName).toContain('Life Center');

    // 3. Film events coverage
    expect(ALL_VEO_MATCH_EVENTS['m-0'].length).toBeGreaterThan(5); // Haverford
    expect(ALL_VEO_MATCH_EVENTS['m-1'].length).toBeGreaterThan(5); // Aquinas
    expect(ALL_VEO_MATCH_EVENTS['m-2'].length).toBeGreaterThan(4); // Trenton
    expect(ALL_VEO_MATCH_EVENTS['m-3'].length).toBeGreaterThan(5); // George
    expect(ALL_VEO_MATCH_EVENTS['m-4'].length).toBeGreaterThan(5); // PDS
    expect(ALL_VEO_MATCH_EVENTS['scout-lca'].length).toBe(5);     // Life Center Scout Reel

    // 4. Team stats 2026
    expect(PEDDIE_SEASON_TEAM_STATS_2026.matchesPlayed).toBe(5);
    expect(PEDDIE_SEASON_TEAM_STATS_2026.wins).toBe(3);
    expect(PEDDIE_SEASON_TEAM_STATS_2026.losses).toBe(2);
    expect(PEDDIE_SEASON_TEAM_STATS_2026.goalsScored).toBe(17);
    expect(PEDDIE_SEASON_TEAM_STATS_2026.goalsConceded).toBe(13);

    // 5. User Jeet Sinha on varsity roster
    const sinha = PEDDIE_ROSTER_2026_2027.find(p => p.number === 6);
    expect(sinha).toBeDefined();
    expect(sinha?.name).toBe('Jeet Sinha');
    expect(sinha?.position).toBe('LM');
    expect(sinha?.passCompletionPct).toBe(91.8);
    expect(sinha?.goals).toBe(1);
    expect(sinha?.assists).toBe(1);

    // 6. Online stats & film verification links for all 17 opponents and 85 scouted players
    PEDDIE_SCHEDULE_2026_2027.forEach(m => {
      expect(m.sourceUrl).toBeDefined();
      expect(m.sourceUrl?.startsWith('http')).toBe(true);
      expect(m.hudlUrl).toBeDefined();
      expect(m.hudlUrl?.startsWith('http')).toBe(true);
    });

    Object.values(OPPONENT_VEO_SCOUTING).forEach(scout => {
      expect(scout.sourceUrl).toBeDefined();
      expect(scout.sourceUrl?.startsWith('http')).toBe(true);
      expect(scout.hudlUrl).toBeDefined();
      expect(scout.hudlUrl?.startsWith('http')).toBe(true);
    });

    ALL_OPPONENT_PLAYER_REPORTS.forEach(p => {
      expect(p.profileUrl).toBeDefined();
      expect(p.profileUrl?.startsWith('http')).toBe(true);
      expect(p.filmUrl).toBeDefined();
      expect(p.filmUrl?.startsWith('http')).toBe(true);
    });
  });

  it('verifies match film is strictly and accurately shown only for correct games', () => {
    // 1. Completed matches (m-0 to m-4) must all have official Veo match film
    const completedIds = ['m-0', 'm-1', 'm-2', 'm-3', 'm-4'];
    completedIds.forEach(id => {
      expect(ALL_VEO_MATCH_EVENTS[id]).toBeDefined();
      expect(ALL_VEO_MATCH_EVENTS[id].length).toBeGreaterThan(0);
    });

    // 2. Dedicated opponent pre-match scout reels exist for specified upcoming opponents
    const scoutReelKeys = ['scout-lca', 'scout-lvr', 'scout-pen', 'scout-blr'];
    scoutReelKeys.forEach(key => {
      expect(ALL_VEO_MATCH_EVENTS[key]).toBeDefined();
      expect(ALL_VEO_MATCH_EVENTS[key].length).toBeGreaterThanOrEqual(4);
    });

    // 3. Upcoming matches without dedicated scout reels MUST NOT have film entries or false cross-mappings
    const upcomingWithoutFilm = ['m-6', 'm-8', 'm-9', 'm-10', 'm-11', 'm-12', 'm-13', 'm-15'];
    upcomingWithoutFilm.forEach(id => {
      expect(ALL_VEO_MATCH_EVENTS[id]).toBeUndefined();
    });

    // 4. Verify each completed match's events strictly describe its own opponent
    // m-0: Haverford
    expect(ALL_VEO_MATCH_EVENTS['m-0'].some(e => e.description.toLowerCase().includes('haverford'))).toBe(true);
    // m-1: Aquinas
    expect(ALL_VEO_MATCH_EVENTS['m-1'].some(e => e.description.toLowerCase().includes('aquinas'))).toBe(true);
    // m-2: Trenton Central
    expect(ALL_VEO_MATCH_EVENTS['m-2'].some(e => e.description.toLowerCase().includes('trenton'))).toBe(true);
    // m-3: George School
    expect(ALL_VEO_MATCH_EVENTS['m-3'].some(e => e.description.toLowerCase().includes('george'))).toBe(true);
    // m-4: Princeton Day School
    expect(ALL_VEO_MATCH_EVENTS['m-4'].some(e => e.description.toLowerCase().includes('pds') || e.description.toLowerCase().includes('princeton day'))).toBe(true);

    // 5. Verify scout reels strictly describe their own opponents
    expect(ALL_VEO_MATCH_EVENTS['scout-lca'].every(e => e.id.startsWith('lca-'))).toBe(true);
    expect(ALL_VEO_MATCH_EVENTS['scout-lvr'].every(e => e.id.startsWith('lvr-'))).toBe(true);
    expect(ALL_VEO_MATCH_EVENTS['scout-pen'].every(e => e.id.startsWith('pen-'))).toBe(true);
    expect(ALL_VEO_MATCH_EVENTS['scout-blr'].every(e => e.id.startsWith('blr-'))).toBe(true);

    // 6. Ensure no false cross-pollination:
    // m-6 (Rutgers Prep) must NOT have Aquinas events
    expect(ALL_VEO_MATCH_EVENTS['m-6']).toBeUndefined();
    // m-8 (St. Benedict's) must NOT have Trenton events
    expect(ALL_VEO_MATCH_EVENTS['m-8']).toBeUndefined();
    // m-11 (Hill) must NOT have Haverford events
    expect(ALL_VEO_MATCH_EVENTS['m-11']).toBeUndefined();
  });
});

