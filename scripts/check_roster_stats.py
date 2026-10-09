import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

roster_part = text.split('export const PEDDIE_ROSTER_2026_2027')[1].split('export const PEDDIE_JV_ROSTER_2026_2027')[0]

# Split by player object
player_blocks = roster_part.split('{\n    id:')

for b in player_blocks[1:]:
    def get_val(key, text):
        m = re.search(rf"{key}:\s*['\"]?([^'\",\n]+)['\"]?", text)
        return m.group(1).strip() if m else None
    
    name = get_val('name', b)
    num = get_val('number', b)
    year = get_val('classYear', b)
    pos = get_val('position', b)
    goals = get_val('goals', b)
    assists = get_val('assists', b)
    print(f"#{num} {name} | Year: {year} | Pos: {pos} | G: {goals} | A: {assists}")
