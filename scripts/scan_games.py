import re
import json

def parse_js_objects(text):
    """Simple parser to extract objects between { and }"""
    objs = []
    depth = 0
    start = -1
    in_str = False
    str_char = ''
    i = 0
    while i < len(text):
        c = text[i]
        if in_str:
            if c == '\\':
                i += 1
            elif c == str_char:
                in_str = False
        else:
            if c in ("'", '"', '`'):
                in_str = True
                str_char = c
            elif c == '{':
                if depth == 0:
                    start = i
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0 and start != -1:
                    objs.append(text[start:i+1])
                    start = -1
        i += 1
    return objs

def scan_all():
    print("==================================================")
    print("1. SCANNING PEDDIE SOCCER ROSTER & OPPONENT DATA")
    print("==================================================")
    with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
        soccer_content = f.read()

    with open('src/lib/opponent-players-data.ts', 'r', encoding='utf-8') as f:
        opp_content = f.read()

    # Parse Peddie roster
    roster_chunk = soccer_content[soccer_content.find('export const PEDDIE_ROSTER_2026_2027'):soccer_content.find('export const PEDDIE_SCHEDULE_2026_2027')]
    roster_objs = parse_js_objects(roster_chunk)
    
    peddie_roster_by_num = {}
    peddie_roster_by_name = {}
    for obj in roster_objs:
        num_m = re.search(r"number:\s*(\d+)", obj)
        name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", obj)
        pos_m = re.search(r"position:\s*['\"]([^'\"]+)['\"]", obj)
        sec_pos_m = re.search(r"secondaryPosition:\s*['\"]([^'\"]+)['\"]", obj)
        id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", obj)
        
        if num_m and name_m and pos_m:
            num = int(num_m.group(1))
            name = name_m.group(1)
            pos = pos_m.group(1)
            sec_pos = sec_pos_m.group(1) if sec_pos_m else None
            pid = id_m.group(1) if id_m else ''
            peddie_roster_by_num[num] = {
                'id': pid, 'name': name, 'pos': pos, 'sec_pos': sec_pos
            }
            peddie_roster_by_name[name.lower()] = {
                'id': pid, 'number': num, 'name': name, 'pos': pos, 'sec_pos': sec_pos
            }

    print(f"Peddie Roster: {len(peddie_roster_by_num)} players.")
    for num, p in sorted(peddie_roster_by_num.items()):
        sec = f" / {p['sec_pos']}" if p['sec_pos'] else ""
        print(f"  #{num:2d}: {p['name']} ({p['pos']}{sec})")

    # Opponent Players
    opp_objs = parse_js_objects(opp_content)
    opp_by_team_num = {}
    opp_by_name = {}
    for obj in opp_objs:
        num_m = re.search(r"number:\s*(\d+)", obj)
        name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", obj)
        pos_m = re.search(r"position:\s*['\"]([^'\"]+)['\"]", obj)
        team_m = re.search(r"teamName:\s*['\"]([^'\"]+)['\"]", obj)
        if num_m and name_m and pos_m:
            num = int(num_m.group(1))
            name = name_m.group(1)
            pos = pos_m.group(1)
            team = team_m.group(1) if team_m else 'Unknown'
            opp_by_team_num[(team.lower(), num)] = (name, pos)
            opp_by_name[name.lower()] = (team, num, pos)

    print(f"Opponent Roster: {len(opp_by_name)} players.")

    print("\n==================================================")
    print("2. SCANNING SOCCER FORMATIONS (ALL FORMATIONS)")
    print("==================================================")
    # Extract formation configs
    form_matches = re.finditer(r"position:\s*['\"]([^'\"]+)['\"],\s*playerNumber:\s*(\d+),\s*playerName:\s*['\"]([^'\"]+)['\"]", soccer_content)
    for fm in form_matches:
        pos, num_str, name = fm.group(1), int(fm.group(2)), fm.group(3)
        clean_name = name.replace(' (C)', '').replace(' (GK)', '').strip()
        if num_str not in peddie_roster_by_num:
            print(f"  [FORMATION ERROR] Slot #{num_str} '{name}' ({pos}) - Number not found in Peddie roster!")
        else:
            roster_p = peddie_roster_by_num[num_str]
            # Check name similarity
            last_name = roster_p['name'].split()[-1]
            if last_name.lower() not in clean_name.lower() and clean_name.lower() not in roster_p['name'].lower():
                print(f"  [FORMATION NAME MISMATCH] #{num_str}: slot says '{name}', roster has '{roster_p['name']}'")
            # Check position compatibility
            compatible = (pos == roster_p['pos']) or (roster_p['sec_pos'] and pos == roster_p['sec_pos'])
            # Some defensive / midfield flexibility
            pos_groups = {
                'CB': ['CB', 'LB', 'RB', 'SW'],
                'LB': ['LB', 'LWB', 'LM', 'CB'],
                'RB': ['RB', 'RWB', 'RM', 'CB'],
                'CDM': ['CDM', 'CM'],
                'CM': ['CM', 'CDM', 'CAM', 'LM', 'RM'],
                'CAM': ['CAM', 'CM', 'ST', 'LW', 'RW'],
                'LM': ['LM', 'LW', 'LB', 'CM'],
                'RM': ['RM', 'RW', 'RB', 'CM'],
                'LW': ['LW', 'LM', 'ST', 'RW'],
                'RW': ['RW', 'RM', 'ST', 'LW'],
                'ST': ['ST', 'CF', 'CAM', 'LW', 'RW'],
                'GK': ['GK']
            }
            allowed = pos_groups.get(roster_p['pos'], [roster_p['pos']])
            if roster_p['sec_pos']:
                allowed = list(set(allowed + pos_groups.get(roster_p['sec_pos'], [roster_p['sec_pos']])))
            if pos not in allowed:
                print(f"  [FORMATION POSITION NOTICE] #{num_str} {roster_p['name']}: placed at {pos}, but official pos is {roster_p['pos']} (sec: {roster_p['sec_pos']})")

    print("\n==================================================")
    print("3. SCANNING SOCCER MATCH EVENTS")
    print("==================================================")
    event_blocks = re.findall(r"(export const MATCH_EVENTS_VEO_([A-Z_]+): MatchEvent\[\] = \[([\s\S]*?)\];)", soccer_content)
    for full_array, team_label, inner in event_blocks:
        event_objs = parse_js_objects(inner)
        for e_str in event_objs:
            num_m = re.search(r"playerNumber:\s*(\d+)", e_str)
            name_m = re.search(r"playerName:\s*['\"]([^'\"]+)['\"]", e_str)
            team_m = re.search(r"team:\s*['\"]([^'\"]+)['\"]", e_str)
            desc_m = re.search(r"description:\s*['\"]([^'\"]+)['\"]", e_str)
            id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", e_str)

            if not (num_m and name_m and team_m):
                continue

            num = int(num_m.group(1))
            name = name_m.group(1)
            team = team_m.group(1)
            desc = desc_m.group(1) if desc_m else ""
            eid = id_m.group(1) if id_m else ""

            if team == 'Peddie':
                clean_name = name.replace(' (C)', '').replace(' (GK)', '').strip()
                # Check if number matches roster
                if num in peddie_roster_by_num:
                    roster_p = peddie_roster_by_num[num]
                    last_name = roster_p['name'].split()[-1]
                    if last_name.lower() not in clean_name.lower() and clean_name.lower() not in roster_p['name'].lower():
                        print(f"  [{team_label} Event {eid}] #{num} Name Mismatch: event has '{name}', but roster #{num} is '{roster_p['name']}'")
                else:
                    print(f"  [{team_label} Event {eid}] Number #{num} '{name}' NOT in Peddie roster!")

                # Check description for '#X' mentions
                desc_nums = re.findall(r"#(\d+)", desc)
                for dn in desc_nums:
                    dn_int = int(dn)
                    # If player name is mentioned next to this #dn
                    for r_name, r_info in peddie_roster_by_name.items():
                        last = r_info['name'].split()[-1]
                        if last.lower() in desc.lower():
                            # Check if the description says "Name (#X)"
                            name_num_match = re.search(rf"{last}[^.]*?#(\d+)", desc, re.IGNORECASE)
                            if name_num_match and int(name_num_match.group(1)) != r_info['number']:
                                print(f"  [{team_label} Event {eid} DESC MISMATCH] Description says '{name_num_match.group(0)}', but {r_info['name']} is #{r_info['number']}")

    print("\n==================================================")
    print("4. SCANNING PASSING LINKS & TELEMETRY IN SOCCER")
    print("==================================================")
    pass_links = re.findall(r"fromPlayer:\s*['\"]([^'\"]+)['\"],\s*toPlayer:\s*['\"]([^'\"]+)['\"],\s*fromNumber:\s*(\d+),\s*toNumber:\s*(\d+)", soccer_content)
    for from_p, to_p, from_n, to_n in pass_links:
        from_n = int(from_n)
        to_n = int(to_n)
        if from_n in peddie_roster_by_num:
            if peddie_roster_by_num[from_n]['name'].split()[-1].lower() not in from_p.lower():
                print(f"  [PASSING LINK MISMATCH] fromNumber #{from_n} ({from_p}) != {peddie_roster_by_num[from_n]['name']}")
        else:
            print(f"  [PASSING LINK ERROR] fromNumber #{from_n} not in roster!")

        if to_n in peddie_roster_by_num:
            if peddie_roster_by_num[to_n]['name'].split()[-1].lower() not in to_p.lower():
                print(f"  [PASSING LINK MISMATCH] toNumber #{to_n} ({to_p}) != {peddie_roster_by_num[to_n]['name']}")
        else:
            print(f"  [PASSING LINK ERROR] toNumber #{to_n} not in roster!")

    print("\n==================================================")
    print("5. SCANNING FOOTBALL ROSTERS & GAME PLAYS")
    print("==================================================")
    with open('src/lib/football/peddie-player-data.ts', 'r', encoding='utf-8') as f:
        fb_content = f.read()

    fb_players = parse_js_objects(fb_content)
    fb_by_num = {}
    for obj in fb_players:
        num_m = re.search(r"jerseyNumber:\s*(\d+)", obj)
        name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", obj)
        pos_m = re.search(r"primaryPosition:\s*['\"]([^'\"]+)['\"]", obj)
        if num_m and name_m and pos_m:
            num = int(num_m.group(1))
            name = name_m.group(1)
            pos = pos_m.group(1)
            fb_by_num[num] = (name, pos)

    print(f"Football Roster: {len(fb_by_num)} players.")
    for num, (name, pos) in sorted(fb_by_num.items()):
        print(f"  #{num:2d}: {name} ({pos})")

    # Check football games/seasons data
    with open('src/lib/football/seasons-data.ts', 'r', encoding='utf-8') as f:
        fb_seasons = f.read()

    # Look for plays mentioning jersey numbers
    play_numbers = re.finditer(r"#(\d+)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)", fb_seasons)
    for pm in play_numbers:
        num = int(pm.group(1))
        name = pm.group(2)
        if num in fb_by_num:
            real_name, pos = fb_by_num[num]
            if name.split()[-1].lower() not in real_name.lower():
                print(f"  [FOOTBALL PLAY MISMATCH] Text says #{num} {name}, but roster #{num} is {real_name} ({pos})")
        else:
            # Check if opponent
            pass

    print("\nScan complete.")

if __name__ == '__main__':
    scan_all()
