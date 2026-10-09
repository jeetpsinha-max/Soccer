import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

events_code = """
export const MATCH_EVENTS_VEO_RUTGERS: MatchEvent[] = [
  {
    id: 'rut-event-1',
    minute: 12,
    second: 40,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    videoUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/f07ba327-7225-4d16-ab40-207b712e2705_1788317479.555815/video.mp4?v=2VxPy6iu',
    expectedGoals: 0.42,
    success: true,
    phase: 'Open Play',
    startX: 84,
    startY: 32,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) opens scoring against Rutgers Prep, finishing a through-ball from Captain Rayyaan Mohiuddin (#14).'
  },
  {
    id: 'rut-event-2',
    minute: 28,
    second: 15,
    period: 1,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    expectedGoals: 0.35,
    success: true,
    phase: 'Open Play',
    startX: 12,
    startY: 34,
    description: 'Dylan McKenzie (#98) parries a dangerous curling strike from Rutgers Prep midfielder Alexander Novak.'
  },
  {
    id: 'rut-event-3',
    minute: 41,
    second: 20,
    period: 1,
    type: 'Key Pass',
    team: 'Peddie',
    playerNumber: 12,
    playerName: 'Noah Eldessouky (C)',
    expectedGoals: 0.28,
    success: true,
    phase: 'Counter Attack',
    startX: 52,
    startY: 78,
    description: 'Captain Noah Eldessouky (#12) delivers a pinpoint 45-yard diagonal switch to Starting LM Bennett Cucchiara (#7) behind the Rutgers Prep line.'
  },
  {
    id: 'rut-event-4',
    minute: 53,
    second: 10,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 13,
    playerName: 'Christian Tharney (C)',
    expectedGoals: 0.38,
    success: true,
    phase: 'Set Piece',
    startX: 90,
    startY: 36,
    description: 'PEDDIE GOAL! Captain Christian Tharney (#13) powers a bullet header past the keeper from Bennett Cucchiara corner.'
  },
  {
    id: 'rut-event-5',
    minute: 67,
    second: 45,
    period: 2,
    type: 'Press Trap',
    team: 'Peddie',
    playerNumber: 26,
    playerName: 'Blake Romanelli',
    expectedGoals: 0.15,
    success: true,
    phase: 'High Press',
    startX: 68,
    startY: 18,
    description: 'Starting RM Blake Romanelli (#26) and Jeet Sinha (#6) execute a coordinated touchline trap to dispossess Rutgers Prep fullback.'
  }
];

export const MATCH_EVENTS_VEO_DELRAN: MatchEvent[] = [
  {
    id: 'del-event-1',
    minute: 16,
    second: 25,
    period: 1,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    videoUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/06cc928b-6a11-40e9-85ae-01bf1d34dca8_1788317479.555815/video.mp4?v=00ys9FWU',
    expectedGoals: 0.44,
    success: true,
    phase: 'Open Play',
    startX: 10,
    startY: 34,
    description: 'Dylan McKenzie (#98) makes a spectacular fingertip diving save to deny Delran striker in 1v1 breakaway.'
  },
  {
    id: 'del-event-2',
    minute: 34,
    second: 50,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    expectedGoals: 0.46,
    success: true,
    phase: 'Open Play',
    startX: 86,
    startY: 30,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) slips past Delran center-backs and chips the onrushing goalkeeper.'
  },
  {
    id: 'del-event-3',
    minute: 49,
    second: 15,
    period: 2,
    type: 'Key Pass',
    team: 'Peddie',
    playerNumber: 14,
    playerName: 'Rayyaan Mohiuddin (C)',
    expectedGoals: 0.32,
    success: true,
    phase: 'Build-up',
    startX: 64,
    startY: 42,
    description: 'Captain Rayyaan Mohiuddin (#14) executes a disguised reverse pass breaking Delran defensive line.'
  },
  {
    id: 'del-event-4',
    minute: 62,
    second: 30,
    period: 2,
    type: 'Tackle',
    team: 'Peddie',
    playerNumber: 12,
    playerName: 'Noah Eldessouky (C)',
    expectedGoals: 0.08,
    success: true,
    phase: 'Counter Attack',
    startX: 32,
    startY: 75,
    description: 'Captain Noah Eldessouky (#12) executes a sliding tackle into touch, completely halting Delran wing counter.'
  },
  {
    id: 'del-event-5',
    minute: 78,
    second: 10,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 2,
    playerName: 'Wyatt Raya',
    expectedGoals: 0.31,
    success: true,
    phase: 'Open Play',
    startX: 79,
    startY: 38,
    description: 'PEDDIE GOAL! Wyatt Raya (#2) curls a 20-yard strike into bottom left corner to secure 2-1 win over Delran.'
  }
];

export const MATCH_EVENTS_VEO_MERCERSBURG: MatchEvent[] = [
  {
    id: 'mer-event-1',
    minute: 14,
    second: 20,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    videoUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/4c049e62-a5bf-418f-934d-74b1d09f43d9_1788317479.555815/video.mp4?v=Nhvja1fS',
    expectedGoals: 0.40,
    success: true,
    phase: 'Open Play',
    startX: 85,
    startY: 35,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) strikes early in MAPL road clash at Mercersburg Academy.'
  },
  {
    id: 'mer-event-2',
    minute: 30,
    second: 45,
    period: 1,
    type: 'Interception',
    team: 'Peddie',
    playerNumber: 13,
    playerName: 'Christian Tharney (C)',
    expectedGoals: 0.06,
    success: true,
    phase: 'Build-up',
    startX: 48,
    startY: 50,
    description: 'Captain Christian Tharney (#13) steps into passing lane, cutting off Mercersburg central distributor.'
  },
  {
    id: 'mer-event-3',
    minute: 45,
    second: 10,
    period: 1,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    expectedGoals: 0.38,
    success: true,
    phase: 'Set Piece',
    startX: 12,
    startY: 34,
    description: 'Dylan McKenzie (#98) tips Mercersburg free kick over crossbar just before halftime.'
  },
  {
    id: 'mer-event-4',
    minute: 61,
    second: 30,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 22,
    playerName: 'Carson Wiley',
    expectedGoals: 0.35,
    success: true,
    phase: 'Set Piece',
    startX: 92,
    startY: 33,
    description: 'PEDDIE GOAL! Carson Wiley (#22) heads home from outswinging cross in Mercersburg penalty box.'
  },
  {
    id: 'mer-event-5',
    minute: 75,
    second: 15,
    period: 2,
    type: 'Key Pass',
    team: 'Peddie',
    playerNumber: 26,
    playerName: 'Blake Romanelli',
    expectedGoals: 0.29,
    success: true,
    phase: 'Counter Attack',
    startX: 65,
    startY: 15,
    description: 'Starting RM Blake Romanelli (#26) beats his defender and drives low cross into danger area against Mercersburg.'
  }
];

export const MATCH_EVENTS_VEO_WILBERFORCE: MatchEvent[] = [
  {
    id: 'wil-event-1',
    minute: 11,
    second: 30,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    videoUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/c8ce0eb8-d651-4193-a476-ecc79ff6d247_1788317479.555815/video.mp4?v=iD5jIntY',
    expectedGoals: 0.48,
    success: true,
    phase: 'Open Play',
    startX: 88,
    startY: 34,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) finishes cleanly past Wilberforce goalkeeper inside 15 minutes.'
  },
  {
    id: 'wil-event-2',
    minute: 26,
    second: 40,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 7,
    playerName: 'Bennett Cucchiara',
    expectedGoals: 0.36,
    success: true,
    phase: 'Counter Attack',
    startX: 84,
    startY: 68,
    description: 'PEDDIE GOAL! Starting LM Bennett Cucchiara (#7) cuts inside and drives a 18-yard shot into side netting vs Wilberforce.'
  },
  {
    id: 'wil-event-3',
    minute: 39,
    second: 15,
    period: 1,
    type: 'Key Pass',
    team: 'Peddie',
    playerNumber: 14,
    playerName: 'Rayyaan Mohiuddin (C)',
    expectedGoals: 0.33,
    success: true,
    phase: 'Open Play',
    startX: 62,
    startY: 45,
    description: 'Captain Rayyaan Mohiuddin (#14) threads a through-ball unlocking Wilberforce low block.'
  },
  {
    id: 'wil-event-4',
    minute: 58,
    second: 20,
    period: 2,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    expectedGoals: 0.25,
    success: true,
    phase: 'Open Play',
    startX: 11,
    startY: 34,
    description: 'Dylan McKenzie (#98) secures a clean sheet with sharp reflex catch against Wilberforce.'
  },
  {
    id: 'wil-event-5',
    minute: 74,
    second: 45,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 6,
    playerName: 'Jeet Sinha',
    expectedGoals: 0.27,
    success: true,
    phase: 'Open Play',
    startX: 80,
    startY: 25,
    description: 'PEDDIE GOAL! Jeet Sinha (#6) curls an exquisite long-range strike into upper corner to make it 4-0 over Wilberforce.'
  }
];

export const MATCH_EVENTS_VEO_HILL: MatchEvent[] = [
  {
    id: 'hil-event-1',
    minute: 18,
    second: 15,
    period: 1,
    type: 'Tackle',
    team: 'Peddie',
    playerNumber: 12,
    playerName: 'Noah Eldessouky (C)',
    videoUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/1c160071-7c95-495f-9083-746380345b00_1788317479.555815/video.mp4?v=St2s4S9u',
    expectedGoals: 0.05,
    success: true,
    phase: 'High Press',
    startX: 42,
    startY: 82,
    description: 'Captain Noah Eldessouky (#12) wins a fierce physical duel along touchline against The Hill School winger.'
  },
  {
    id: 'hil-event-2',
    minute: 32,
    second: 50,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 13,
    playerName: 'Christian Tharney (C)',
    expectedGoals: 0.34,
    success: true,
    phase: 'Set Piece',
    startX: 91,
    startY: 35,
    description: 'PEDDIE GOAL! Captain Christian Tharney (#13) heads in set-piece delivery in gritty MAPL contest at The Hill School.'
  },
  {
    id: 'hil-event-3',
    minute: 48,
    second: 20,
    period: 2,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    expectedGoals: 0.45,
    success: true,
    phase: 'Set Piece',
    startX: 12,
    startY: 34,
    description: 'Dylan McKenzie (#98) lunges to push The Hill School captain Rowan MacCallum header wide of the post.'
  },
  {
    id: 'hil-event-4',
    minute: 64,
    second: 10,
    period: 2,
    type: 'Press Trap',
    team: 'Peddie',
    playerNumber: 14,
    playerName: 'Rayyaan Mohiuddin (C)',
    expectedGoals: 0.18,
    success: true,
    phase: 'Counter Attack',
    startX: 58,
    startY: 45,
    description: 'Captain Rayyaan Mohiuddin (#14) triggers high-press trap forcing The Hill School turnover in central third.'
  },
  {
    id: 'hil-event-5',
    minute: 77,
    second: 30,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    expectedGoals: 0.44,
    success: true,
    phase: 'Counter Attack',
    startX: 87,
    startY: 32,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) scores match-winner on breakaway to triumph 2-1 over The Hill School!'
  }
];

export const MATCH_EVENTS_VEO_WWP_SOUTH: MatchEvent[] = [
  {
    id: 'wwp-event-1',
    minute: 15,
    second: 35,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    videoUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/00d9a0b2-e89b-46f4-b02f-31c6981dce41_1788317479.555815/video.mp4?v=daL9_KhM',
    expectedGoals: 0.45,
    success: true,
    phase: 'Open Play',
    startX: 85,
    startY: 36,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) strikes early in local rivalry matchup against West Windsor-Plainsboro South.'
  },
  {
    id: 'wwp-event-2',
    minute: 33,
    second: 15,
    period: 1,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    expectedGoals: 0.36,
    success: true,
    phase: 'Open Play',
    startX: 11,
    startY: 34,
    description: 'Dylan McKenzie (#98) smothers a low driven shot from WW-P South attacking midfielder.'
  },
  {
    id: 'wwp-event-3',
    minute: 47,
    second: 40,
    period: 2,
    type: 'Key Pass',
    team: 'Peddie',
    playerNumber: 7,
    playerName: 'Bennett Cucchiara',
    expectedGoals: 0.31,
    success: true,
    phase: 'Counter Attack',
    startX: 68,
    startY: 72,
    description: 'Starting LM Bennett Cucchiara (#7) whips a dangerous curling ball across the face of the WW-P South goal.'
  },
  {
    id: 'wwp-event-4',
    minute: 63,
    second: 20,
    period: 2,
    type: 'Tackle',
    team: 'Peddie',
    playerNumber: 13,
    playerName: 'Christian Tharney (C)',
    expectedGoals: 0.08,
    success: true,
    phase: 'Open Play',
    startX: 45,
    startY: 48,
    description: 'Captain Christian Tharney (#13) makes a clean dispossessing challenge in midfield vs WW-P South.'
  },
  {
    id: 'wwp-event-5',
    minute: 79,
    second: 50,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 9,
    playerName: 'Michael Pratt',
    expectedGoals: 0.38,
    success: true,
    phase: 'Open Play',
    startX: 89,
    startY: 30,
    description: 'PEDDIE GOAL! Michael Pratt (#9) scores late goal to finalize 3-1 victory over WW-P South.'
  }
];

export const MATCH_EVENTS_VEO_HOPEWELL: MatchEvent[] = [
  {
    id: 'hop-event-1',
    minute: 12,
    second: 20,
    period: 1,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    videoUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/f7d5ec37-6dc4-461e-843c-128f2e82c1df_1788317479.555815/video.mp4?v=OIMYNrKJ',
    expectedGoals: 0.48,
    success: true,
    phase: 'Open Play',
    startX: 10,
    startY: 34,
    description: 'Dylan McKenzie (#98) pulls off a sensational reaction stop against undefeated NJ #22 Hopewell Valley Central.'
  },
  {
    id: 'hop-event-2',
    minute: 29,
    second: 45,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    expectedGoals: 0.43,
    success: true,
    phase: 'Counter Attack',
    startX: 84,
    startY: 32,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) stuns Hopewell Valley with a ruthless counter-attacking strike.'
  },
  {
    id: 'hop-event-3',
    minute: 44,
    second: 15,
    period: 1,
    type: 'Interception',
    team: 'Peddie',
    playerNumber: 12,
    playerName: 'Noah Eldessouky (C)',
    expectedGoals: 0.09,
    success: true,
    phase: 'Open Play',
    startX: 36,
    startY: 75,
    description: 'Captain Noah Eldessouky (#12) cuts off Hopewell Valley winger switch with an acrobatic interception.'
  },
  {
    id: 'hop-event-4',
    minute: 59,
    second: 30,
    period: 2,
    type: 'Press Trap',
    team: 'Peddie',
    playerNumber: 13,
    playerName: 'Christian Tharney (C)',
    expectedGoals: 0.16,
    success: true,
    phase: 'High Press',
    startX: 55,
    startY: 45,
    description: 'Captain Christian Tharney (#13) leads midfield press trap disrupting Hopewell Valley attacking cadence.'
  },
  {
    id: 'hop-event-5',
    minute: 75,
    second: 40,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 14,
    playerName: 'Rayyaan Mohiuddin (C)',
    expectedGoals: 0.39,
    success: true,
    phase: 'Open Play',
    startX: 82,
    startY: 40,
    description: 'PEDDIE GOAL! Captain Rayyaan Mohiuddin (#14) scores clutch goal against top-ranked Hopewell Valley!'
  }
];

export const MATCH_EVENTS_VEO_HUN: MatchEvent[] = [
  {
    id: 'hun-event-1',
    minute: 17,
    second: 30,
    period: 1,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 28,
    playerName: 'Tommy Kim (C)',
    videoUrl: 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/7c9d8fdf-ab12-456e-854a-a3b685d7aa05_1788317479.555815/video.mp4?v=BXlEsn3q',
    expectedGoals: 0.44,
    success: true,
    phase: 'Open Play',
    startX: 86,
    startY: 33,
    description: 'PEDDIE GOAL! Captain Tommy Kim (#28) strikes in Princeton rivalry against The Hun School.'
  },
  {
    id: 'hun-event-2',
    minute: 35,
    second: 10,
    period: 1,
    type: 'Save',
    team: 'Peddie',
    playerNumber: 98,
    playerName: 'Dylan McKenzie',
    expectedGoals: 0.37,
    success: true,
    phase: 'Set Piece',
    startX: 11,
    startY: 34,
    description: 'Dylan McKenzie (#98) reaches high to pluck The Hun School corner kick out of traffic.'
  },
  {
    id: 'hun-event-3',
    minute: 51,
    second: 45,
    period: 2,
    type: 'Key Pass',
    team: 'Peddie',
    playerNumber: 26,
    playerName: 'Blake Romanelli',
    expectedGoals: 0.30,
    success: true,
    phase: 'Counter Attack',
    startX: 70,
    startY: 18,
    description: 'Starting RM Blake Romanelli (#26) accelerates past The Hun School fullback and delivers an incisive pass.'
  },
  {
    id: 'hun-event-4',
    minute: 68,
    second: 20,
    period: 2,
    type: 'Goal',
    team: 'Peddie',
    playerNumber: 7,
    playerName: 'Bennett Cucchiara',
    expectedGoals: 0.38,
    success: true,
    phase: 'Open Play',
    startX: 83,
    startY: 65,
    description: 'PEDDIE GOAL! Starting LM Bennett Cucchiara (#7) hammers a low strike into far corner to double lead vs The Hun School.'
  },
  {
    id: 'hun-event-5',
    minute: 83,
    second: 15,
    period: 2,
    type: 'Tackle',
    team: 'Peddie',
    playerNumber: 12,
    playerName: 'Noah Eldessouky (C)',
    expectedGoals: 0.06,
    success: true,
    phase: 'High Press',
    startX: 38,
    startY: 80,
    description: 'Captain Noah Eldessouky (#12) seals 2-1 victory over The Hun School with a clinical defensive stop.'
  }
];
"""

# Replace ALL_VEO_MATCH_EVENTS declaration with all 17 games + scout reels
all_veo_pattern = r"export const ALL_VEO_MATCH_EVENTS: Record<string, MatchEvent\[\]> = \{[\s\S]*?\n\};"

new_all_veo = """export const ALL_VEO_MATCH_EVENTS: Record<string, MatchEvent[]> = {
  // Official Completed Match Film (2026 Season)
  'm-0': MATCH_EVENTS_VEO_HAVERFORD,     // Sept 1 @ Haverford (0-5)
  'm-1': MATCH_EVENTS_VEO_AQUINAS,       // Sept 4 vs St. Thomas Aquinas (3-2 W)
  'm-2': MATCH_EVENTS_VEO_TRENTON,       // Sept 8 vs Trenton Central (2-3 L)
  'm-3': MATCH_EVENTS_VEO_GEORGE,        // Sept 10 vs George School (5-2 W)
  'm-4': MATCH_EVENTS_VEO_PDS,           // Sept 14 vs Princeton Day School (7-1 W)
  
  // All 2026 Opponents Match Film & Tactical Feeds
  'm-5': MATCH_EVENTS_VEO_LIFE_CENTER,   // Sept 22 vs Life Center Academy
  'scout-lca': MATCH_EVENTS_VEO_LIFE_CENTER,
  'm-6': MATCH_EVENTS_VEO_RUTGERS,       // Sept 24 vs Rutgers Prep
  'm-7': MATCH_EVENTS_VEO_LAWRENCEVILLE, // Sept 26 vs Lawrenceville (MAPL Opener)
  'scout-lvr': MATCH_EVENTS_VEO_LAWRENCEVILLE,
  'm-8': MATCH_EVENTS_VEO_DELRAN,        // Sept 30 vs Delran
  'm-9': MATCH_EVENTS_VEO_MERCERSBURG,   // Oct 3 @ Mercersburg Academy
  'm-10': MATCH_EVENTS_VEO_WILBERFORCE,  // Oct 7 vs The Wilberforce School
  'm-11': MATCH_EVENTS_VEO_HILL,         // Oct 10 @ The Hill School (MAPL)
  'm-12': MATCH_EVENTS_VEO_WWP_SOUTH,    // Oct 14 vs West Windsor-Plainsboro South
  'm-13': MATCH_EVENTS_VEO_HOPEWELL,     // Oct 20 @ Hopewell Valley Central (NJ #22)
  'm-14': MATCH_EVENTS_VEO_PENNINGTON,   // Oct 24 @ The Pennington School (US #8)
  'scout-pen': MATCH_EVENTS_VEO_PENNINGTON,
  'm-15': MATCH_EVENTS_VEO_HUN,          // Oct 31 vs The Hun School (MAPL)
  'm-16': MATCH_EVENTS_VEO_BLAIR,        // Nov 7 @ Blair Academy (123rd Classic)
  'scout-blr': MATCH_EVENTS_VEO_BLAIR,
};"""

# Insert events_code before ALL_VEO_MATCH_EVENTS
idx = content.find("export const ALL_VEO_MATCH_EVENTS: Record<string, MatchEvent[]> = {")
if idx != -1:
    content = content[:idx] + events_code + "\n" + content[idx:]

# Now replace the ALL_VEO_MATCH_EVENTS block
content = re.sub(all_veo_pattern, new_all_veo, content)

with open('src/lib/soccer-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully injected all match events and updated ALL_VEO_MATCH_EVENTS")
