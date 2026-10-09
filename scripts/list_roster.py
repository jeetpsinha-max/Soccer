import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

roster_part = text.split('export const PEDDIE_ROSTER_2026_2027')[1].split('export const PEDDIE_JV_ROSTER_2026_2027')[0]
pattern = r"number:\s*(\d+),\s*name:\s*'([^']+)'"
matches = re.findall(pattern, roster_part)
for num, name in matches:
    print(f"#{num}: {name}")
