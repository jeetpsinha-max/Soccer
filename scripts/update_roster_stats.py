import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Player updates definition:
updates = {
    # number: (name, classYear, gradYear, position, secPos, goals, assists, points, extra)
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

# Regex to find each player in PEDDIE_ROSTER_2026_2027
# We can find blocks with `number:\s*(\d+)`
roster_marker = "export const PEDDIE_ROSTER_2026_2027: Player[] = ["
end_marker = "export const PEDDIE_JV_ROSTER_2026_2027"

idx_start = text.find(roster_marker)
idx_end = text.find(end_marker, idx_start)

roster_text = text[idx_start:idx_end]

# We will modify each player inside roster_text
for num, info in updates.items():
    name, classYear, gradYear, pos, secPos, goals, assists, points, extras = info
    
    # Locate player block around number: num
    pattern = rf"(\{{\s*id:\s*'[a-zA-Z0-9_\-]+',[\s\S]*?number:\s*{num},[\s\S]*?\n  \}})"
    match = re.search(pattern, roster_text)
    if not match:
        print(f"Warning: Player #{num} ({name}) not matched!")
        continue
    
    block = match.group(1)
    orig_block = block
    
    # Replace classYear
    block = re.sub(r"classYear:\s*'[^']+'", f"classYear: '{classYear}'", block)
    # Replace gradYear
    block = re.sub(r"gradYear:\s*\d+", f"gradYear: {gradYear}", block)
    # Replace position
    block = re.sub(r"position:\s*'[^']+'", f"position: '{pos}'", block)
    if secPos:
        if "secondaryPosition:" in block:
            block = re.sub(r"secondaryPosition:\s*'[^']+'", f"secondaryPosition: '{secPos}'", block)
        else:
            block = re.sub(r"(position:\s*'[^']+',)", rf"\1\n    secondaryPosition: '{secPos}',", block)
    
    # Replace goals, assists, points, matchesPlayed
    block = re.sub(r"goals:\s*\d+", f"goals: {goals}", block)
    block = re.sub(r"assists:\s*\d+", f"assists: {assists}", block)
    block = re.sub(r"matchesPlayed:\s*\d+", "matchesPlayed: 7", block)
    
    if "points:" in block:
        block = re.sub(r"points:\s*\d+", f"points: {points}", block)
    else:
        block = re.sub(r"(assists:\s*\d+,)", rf"\1\n    points: {points},", block)
    
    for ek, ev in extras.items():
        if f"{ek}:" in block:
            block = re.sub(rf"{ek}:\s*[^,\n]+", f"{ek}: {ev}", block)
        else:
            block = re.sub(r"(points:\s*\d+,)", rf"\1\n    {ek}: {ev},", block)
            
    roster_text = roster_text.replace(orig_block, block)
    print(f"Updated #{num} {name}: G={goals}, A={assists}, P={points}, Year={classYear}, Pos={pos}")

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

text = text[:idx_start] + roster_text + text[idx_end:]

# Insert official constants right before end_marker if not already present
if "PEDDIE_OFFICIAL_SEASON_SCORING_2026" not in text:
    text = text.replace(end_marker, official_constants + "\n" + end_marker)

with open('src/lib/soccer-data.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Finished updating soccer-data.ts successfully")
