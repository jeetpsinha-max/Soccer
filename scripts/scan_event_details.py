import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    soccer_content = f.read()

with open('src/lib/opponent-players-data.ts', 'r', encoding='utf-8') as f:
    opp_content = f.read()

# Parse Peddie roster
peddie_roster = {}
roster_chunk = soccer_content[soccer_content.find('export const PEDDIE_ROSTER_2026_2027'):soccer_content.find('export const PEDDIE_SCHEDULE_2026_2027')]
import json

# Extract each player block
matches = re.finditer(r"id:\s*['\"]([^'\"]+)['\"][\s\S]*?number:\s*(\d+)[\s\S]*?name:\s*['\"]([^'\"]+)['\"][\s\S]*?position:\s*['\"]([^'\"]+)['\"]", roster_chunk)
for m in matches:
    pid, num, name, pos = m.group(1), int(m.group(2)), m.group(3), m.group(4)
    peddie_roster[num] = {'id': pid, 'name': name, 'pos': pos}

print("PEDDIE ROSTER:")
for num, p in sorted(peddie_roster.items()):
    print(f"  #{num}: {p['name']} ({p['pos']})")

# Parse Opponent Players
opp_players = {}
opp_matches = re.finditer(r"id:\s*['\"]([^'\"]+)['\"][\s\S]*?number:\s*(\d+)[\s\S]*?name:\s*['\"]([^'\"]+)['\"][\s\S]*?position:\s*['\"]([^'\"]+)['\"][\s\S]*?teamName:\s*['\"]([^'\"]+)['\"]", opp_content)
for m in opp_matches:
    pid, num, name, pos, team = m.group(1), int(m.group(2)), m.group(3), m.group(4), m.group(5)
    opp_players[(team.lower(), num)] = {'name': name, 'pos': pos, 'team': team}
    opp_players[name.lower()] = {'num': num, 'pos': pos, 'team': team}

print(f"\nLoaded {len(opp_players)} opponent player entries.")

# Scan each match event array
game_arrays = [
    ('HAVERFORD', 'MATCH_EVENTS_VEO_HAVERFORD'),
    ('AQUINAS', 'MATCH_EVENTS_VEO_AQUINAS'),
    ('TRENTON', 'MATCH_EVENTS_VEO_TRENTON'),
    ('GEORGE', 'MATCH_EVENTS_VEO_GEORGE'),
    ('PDS', 'MATCH_EVENTS_VEO_PDS'),
    ('LIFE_CENTER', 'MATCH_EVENTS_VEO_LIFE_CENTER'),
    ('LAWRENCEVILLE', 'MATCH_EVENTS_VEO_LAWRENCEVILLE'),
    ('PENNINGTON', 'MATCH_EVENTS_VEO_PENNINGTON'),
    ('BLAIR', 'MATCH_EVENTS_VEO_BLAIR'),
]

for game_tag, arr_name in game_arrays:
    print(f"\n==========================================")
    print(f"SCANNING GAME: {game_tag} ({arr_name})")
    print(f"==========================================")
    start_idx = soccer_content.find(f"export const {arr_name}")
    if start_idx == -1:
        print(f"Array {arr_name} not found!")
        continue
    end_idx = soccer_content.find("];", start_idx)
    arr_code = soccer_content[start_idx:end_idx+2]

    # Find each event block
    event_blocks = re.findall(r"\{[\s\S]*?id:\s*['\"]([^'\"]+)['\"][\s\S]*?minute:\s*(\d+)[\s\S]*?type:\s*['\"]([^'\"]+)['\"][\s\S]*?team:\s*['\"]([^'\"]+)['\"][\s\S]*?playerNumber:\s*(\d+)[\s\S]*?playerName:\s*['\"]([^'\"]+)['\"][\s\S]*?description:\s*['\"]([^'\"]+)['\"][\s\S]*?\}", arr_code)

    for eid, minute, etype, team, num_str, name, desc in event_blocks:
        num = int(num_str)
        print(f"  [{eid}] {minute}' | {team} | #{num} {name} ({etype})")
        if team == 'Peddie':
            if num not in peddie_roster:
                print(f"    *** ERROR: #{num} {name} is NOT in Peddie roster!")
            else:
                real_p = peddie_roster[num]
                # Compare names
                clean_name = name.replace(' (C)', '').replace(' (GK)', '').strip()
                last_name = real_p['name'].split()[-1]
                if last_name.lower() not in clean_name.lower() and clean_name.lower() not in real_p['name'].lower():
                    # check Cuchera / Cucchiara
                    if not ('cuchera' in clean_name.lower() and 'cucchiara' in real_p['name'].lower()):
                        print(f"    *** NAME MISMATCH: Event has '{name}', but roster #{num} is '{real_p['name']}' ({real_p['pos']})")
        else:
            # Opponent event
            pass

        # Check description for #number mismatches
        desc_matches = re.finditer(r"([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+\(#(\d+)\)", desc)
        for dm in desc_matches:
            d_name, d_num = dm.group(1), int(dm.group(2))
            # Check if d_name is a Peddie player
            for r_num, r_p in peddie_roster.items():
                if r_p['name'].lower() in d_name.lower() or d_name.lower() in r_p['name'].lower():
                    if d_num != r_num:
                        print(f"    *** DESC NUMBER MISMATCH: Description mentions '{d_name} (#{d_num})', but roster is #{r_num}")
