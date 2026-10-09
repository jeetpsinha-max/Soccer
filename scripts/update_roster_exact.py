import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Formations in soccer-data.ts
# Replace 4-4-2 nodes
old_442_nodes = """      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 64, role: 'Diamond Base Holding Anchor (Captain)' },
      { position: 'LM', playerNumber: 6, playerName: 'Sinha', xPct: 24, yPct: 48, role: 'Left Midfielder' },
      { position: 'RM', playerNumber: 7, playerName: 'Cuchera', xPct: 76, yPct: 48, role: 'Right Midfielder' },"""

new_442_nodes = """      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 64, role: 'Diamond Base Holding Anchor (Captain)' },
      { position: 'LM', playerNumber: 7, playerName: 'Cucchiara', xPct: 24, yPct: 48, role: 'Starting Left Midfielder' },
      { position: 'RM', playerNumber: 26, playerName: 'Romanelli', xPct: 76, yPct: 48, role: 'Starting Right Midfielder' },"""

if old_442_nodes in text:
    text = text.replace(old_442_nodes, new_442_nodes)
    print("Updated 4-4-2 nodes")

# Replace 4-4-2 description & strengths
old_442_desc = "wide midfielders #6 Jeet Sinha (LM) and #7 Bennett Cuchera (RM)"
new_442_desc = "starting wide midfielders #7 Bennett Cucchiara (LM) and #26 Blake Romanelli (RM)"
text = text.replace(old_442_desc, new_442_desc)

old_442_str = "flank service from #6 Jeet Sinha (LM) and #7 Bennett Cuchera (RM)"
new_442_str = "flank service from starting LM #7 Bennett Cucchiara and starting RM #26 Blake Romanelli"
text = text.replace(old_442_str, new_442_str)

# 4-2-3-1
old_4231_nodes = """      { position: 'LM', playerNumber: 10, playerName: 'Wachtveitl', xPct: 18, yPct: 26, role: 'Left Midfielder' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 15, role: 'Striker (Captain)' },
      { position: 'RM', playerNumber: 7, playerName: 'Cuchera', xPct: 82, yPct: 26, role: 'Right Midfielder' }"""

new_4231_nodes = """      { position: 'LM', playerNumber: 7, playerName: 'Cucchiara', xPct: 18, yPct: 26, role: 'Starting Left Midfielder' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 15, role: 'Striker (Captain)' },
      { position: 'RM', playerNumber: 26, playerName: 'Romanelli', xPct: 82, yPct: 26, role: 'Starting Right Midfielder' }"""
text = text.replace(old_4231_nodes, new_4231_nodes)

# 3-5-2
old_352_nodes = """      { position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 12, yPct: 52, role: 'Left Wing-Back (Captain)' },
      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 56, role: 'Central Midfield Anchor (Captain)' },
      { position: 'LM', playerNumber: 10, playerName: 'Wachtveitl', xPct: 34, yPct: 44, role: 'Left Central Midfielder' },
      { position: 'CAM', playerNumber: 14, playerName: 'Mohiuddin (C)', xPct: 66, yPct: 44, role: 'Attacking Midfielder (Captain)' },
      { position: 'RM', playerNumber: 7, playerName: 'Cuchera', xPct: 88, yPct: 52, role: 'Right Wing-Back' },"""

new_352_nodes = """      { position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 12, yPct: 52, role: 'Left Wing-Back (Captain)' },
      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 56, role: 'Central Midfield Anchor (Captain)' },
      { position: 'LM', playerNumber: 7, playerName: 'Cucchiara', xPct: 34, yPct: 44, role: 'Starting Left Midfielder' },
      { position: 'CAM', playerNumber: 14, playerName: 'Mohiuddin (C)', xPct: 66, yPct: 44, role: 'Attacking Midfielder (Captain)' },
      { position: 'RM', playerNumber: 26, playerName: 'Romanelli', xPct: 88, yPct: 52, role: 'Starting Right Midfielder' },"""
text = text.replace(old_352_nodes, new_352_nodes)

# 4-3-3
old_433_nodes = """      { position: 'LW', playerNumber: 19, playerName: 'Gimbel', xPct: 18, yPct: 24, role: 'Inside Forward' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 16, role: 'Complete Forward (Captain)' },
      { position: 'RW', playerNumber: 7, playerName: 'Cuchera', xPct: 82, yPct: 24, role: 'Touchline Winger & Set-Piece Specialist' }"""

new_433_nodes = """      { position: 'LW', playerNumber: 7, playerName: 'Cucchiara', xPct: 18, yPct: 24, role: 'Starting Left Winger' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 16, role: 'Complete Forward (Captain)' },
      { position: 'RW', playerNumber: 26, playerName: 'Romanelli', xPct: 82, yPct: 24, role: 'Starting Right Winger' }"""
text = text.replace(old_433_nodes, new_433_nodes)

# 2. Player Updates definition:
updates = {
    # number: (name, classYear, gradYear, position, secPos, goals, assists, points, extra_dict)
    28: ('Tommy Kim', 'Senior', 2027, 'ST', 'CAM', 12, 4, 28, {}),
    13: ('Christian Tharney', 'Senior', 2027, 'CDM', 'CB', 10, 5, 25, {}),
    12: ('Noah Eldessouky', 'Senior', 2027, 'LB', 'CB', 0, 2, 2, {}),
    14: ('Rayyaan Mohiuddin', 'Junior', 2028, 'CAM', 'RM', 1, 2, 4, {}),
    10: ('Quinn Wachtveitl', 'Senior', 2027, 'ST', 'CAM', 2, 4, 8, {}),
    98: ('Dylan McKenzie', 'Junior', 2028, 'GK', None, 0, 0, 0, {'saves': 41}),
    22: ('Carson Wiley', 'Junior', 2028, 'CB', 'CDM', 2, 1, 5, {}),
    6:  ('Jeet Sinha', 'Junior', 2028, 'CM', 'LM', 1, 0, 2, {}),
    7:  ('Bennett Cucchiara', 'Freshman', 2030, 'LM', 'RM', 3, 3, 9, {'tacticalRole': "'Starting Left Midfielder & Precision Set-Piece Specialist'"}),
    20: ('Jeffrey Zhang', 'Junior', 2028, 'ST', 'CAM', 0, 1, 1, {}),
    26: ('Blake Romanelli', 'Sophomore', 2029, 'RM', 'RB', 0, 0, 0, {'tacticalRole': "'Starting Right Midfielder & Blistering Sprinter (21.8 mph Peak)'"}),
    18: ('Brody Rozo', 'Sophomore', 2029, 'CM', 'ST', 0, 1, 1, {}),
    25: ('Harry Xiao', 'Junior', 2028, 'RW', 'CM', 1, 0, 2, {}),
    2:  ('Wyatt Raya', 'Sophomore', 2029, 'CM', 'RM', 3, 1, 7, {}),
    9:  ('Michael Pratt', 'Sophomore', 2029, 'ST', 'RW', 2, 3, 7, {}),
}

roster_marker = "export const PEDDIE_ROSTER_2026_2027: Player[] = ["
end_marker = "export const PEDDIE_JV_ROSTER_2026_2027"

idx_start = text.find(roster_marker)
idx_end = text.find(end_marker, idx_start)

roster_text = text[idx_start:idx_end]
blocks = roster_text.split('  {\n')
new_blocks = [blocks[0]]

for b in blocks[1:]:
    # Find number in this block
    m_num = re.search(r"number:\s*(\d+)", b)
    if not m_num:
        new_blocks.append(b)
        continue
    
    num = int(m_num.group(1))
    if num not in updates:
        new_blocks.append(b)
        continue
    
    name, classYear, gradYear, pos, secPos, goals, assists, points, extras = updates[num]
    
    # Replace within b only
    b = re.sub(r"classYear:\s*'[^']+'", f"classYear: '{classYear}'", b)
    b = re.sub(r"gradYear:\s*\d+", f"gradYear: {gradYear}", b)
    b = re.sub(r"position:\s*'[^']+'", f"position: '{pos}'", b)
    if secPos:
        if "secondaryPosition:" in b:
            b = re.sub(r"secondaryPosition:\s*'[^']+'", f"secondaryPosition: '{secPos}'", b)
        else:
            b = re.sub(r"(position:\s*'[^']+',)", rf"\1\n    secondaryPosition: '{secPos}',", b)
    
    b = re.sub(r"goals:\s*\d+", f"goals: {goals}", b)
    b = re.sub(r"assists:\s*\d+", f"assists: {assists}", b)
    b = re.sub(r"matchesPlayed:\s*\d+", "matchesPlayed: 7", b)
    
    if "points:" in b:
        b = re.sub(r"points:\s*\d+", f"points: {points}", b)
    else:
        b = re.sub(r"(assists:\s*\d+,)", rf"\1\n    points: {points},", b)
    
    for ek, ev in extras.items():
        if f"{ek}:" in b:
            b = re.sub(rf"{ek}:\s*[^,\n]+", f"{ek}: {ev}", b)
        else:
            b = re.sub(r"(points:\s*\d+,)", rf"\1\n    {ek}: {ev},", b)
            
    print(f"Updated block #{num} {name}")
    new_blocks.append(b)

new_roster_text = '  {\n'.join(new_blocks)

# Also add the official constants export right after PEDDIE_ROSTER_2026_2027
official_constants = """
export interface OfficialScoringPlayer {
  number: number;
  name: string;
  classYear: string;
  position: string;
  goals: number;
  assists: number;
  points: number;
  isStarting?: boolean;
  startingPosition?: string;
}

export interface OfficialGoalieStats {
  number: number;
  name: string;
  classYear: string;
  position: string;
  saves: number;
  gamesPlayed: number;
}

export const PEDDIE_OFFICIAL_SEASON_SCORING_2026: OfficialScoringPlayer[] = [
  { number: 28, name: 'Tommy Kim', classYear: 'Senior', position: 'F', goals: 12, assists: 4, points: 28, isStarting: true, startingPosition: 'ST' },
  { number: 13, name: 'Christian Tharney', classYear: 'Senior', position: 'M', goals: 10, assists: 5, points: 25, isStarting: true, startingPosition: 'CDM' },
  { number: 7, name: 'Bennett Cucchiara', classYear: 'Freshman', position: 'M', goals: 3, assists: 3, points: 9, isStarting: true, startingPosition: 'LM' },
  { number: 10, name: 'Quinn Wachtveitl', classYear: 'Senior', position: 'M', goals: 2, assists: 4, points: 8, isStarting: true, startingPosition: 'ST' },
  { number: 2, name: 'Wyatt Raya', classYear: 'Sophomore', position: 'M', goals: 3, assists: 1, points: 7 },
  { number: 9, name: 'Michael Pratt', classYear: 'Sophomore', position: 'F', goals: 2, assists: 3, points: 7 },
  { number: 22, name: 'Carson Wiley', classYear: 'Junior', position: 'B', goals: 2, assists: 1, points: 5, isStarting: true, startingPosition: 'CB' },
  { number: 14, name: 'Rayyaan Mohiuddin', classYear: 'Junior', position: 'M', goals: 1, assists: 2, points: 4, isStarting: true, startingPosition: 'CAM' },
  { number: 12, name: 'Noah Eldessouky', classYear: 'Senior', position: 'B', goals: 0, assists: 2, points: 2, isStarting: true, startingPosition: 'LB' },
  { number: 6, name: 'Jeet Sinha', classYear: 'Junior', position: 'M', goals: 1, assists: 0, points: 2 },
  { number: 25, name: 'Harry Xiao', classYear: 'Junior', position: 'M', goals: 1, assists: 0, points: 2 },
  { number: 20, name: 'Jeffrey Zhang', classYear: 'Junior', position: 'M', goals: 0, assists: 1, points: 1 },
  { number: 18, name: 'Brody Rozo', classYear: 'Sophomore', position: 'M', goals: 0, assists: 1, points: 1 },
];

export const PEDDIE_OFFICIAL_GOALIE_2026: OfficialGoalieStats = {
  number: 98,
  name: 'Dylan McKenzie',
  classYear: 'Junior',
  position: 'G',
  saves: 41,
  gamesPlayed: 7
};

export const PEDDIE_OFFICIAL_TEAM_TOTALS_2026 = {
  goals: 37,
  assists: 27,
  points: 101,
  goalieSaves: 41,
  gamesPlayed: 7,
  startingLM: { number: 7, name: 'Bennett Cucchiara', position: 'LM', classYear: 'Freshman' },
  startingRM: { number: 26, name: 'Blake Romanelli', position: 'RM', classYear: 'Sophomore' },
};
"""

text = text[:idx_start] + new_roster_text + text[idx_end:]

if "PEDDIE_OFFICIAL_SEASON_SCORING_2026" not in text:
    text = text.replace(end_marker, official_constants + "\n" + end_marker)

with open('src/lib/soccer-data.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Finished updating soccer-data.ts with exact blocks!")
