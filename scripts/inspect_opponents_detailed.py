import re

with open('src/lib/opponent-players-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# find blocks like 'rutgers-prep': [ ... ]
pattern = r"'([a-z0-9-]+)'\s*:\s*\[([\s\S]*?)\]\s*(?:,|\n\};)"
blocks = re.findall(pattern, text)

for key, content in blocks:
    players = re.findall(r"name:\s*'([^']+)',\s*number:\s*(\d+),\s*position:\s*'([^']+)'", content)
    print(f"=== {key} ({len(players)} players) ===")
    for name, num, pos in players[:3]:
        print(f"  #{num} {name} ({pos})")
