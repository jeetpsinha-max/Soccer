import os
import re

directories = [
    r'd:\MyProfile\Desktop\peddie-soccer-gridiron\src\app\football',
    r'd:\MyProfile\Desktop\peddie-soccer-gridiron\src\app\api',
    r'd:\MyProfile\Desktop\peddie-soccer-gridiron\src\components\football',
    r'd:\MyProfile\Desktop\peddie-soccer-gridiron\src\lib\football'
]

football_libs = [
    'store', 'seasons-data', 'mock-game-data', 'peddie-player-data',
    'epa-calculator', 'hudl-csv-engine', 'discovery-engine',
    'ai-vision-parser', 'data-schemas', 'utils'
]

replacements = [
    (r"@/context/SeasonContext", r"@/context/FootballSeasonContext"),
    (r"@/components/AntigravityTacticalHUD", r"@/components/football/AntigravityTacticalHUD"),
    (r"@/components/video-player/", r"@/components/football/video-player/"),
    (r"@/lib/agents/claude-orchestrator", r"@/lib/football/agents/claude-orchestrator"),
    (r"@/lib/agents/gemini-workers", r"@/lib/football/agents/gemini-workers"),
]

for lib in football_libs:
    replacements.append((rf"@/lib/{lib}", rf"@/lib/football/{lib}"))

updated_count = 0

for d in directories:
    for root, _, files in os.walk(d):
        for f in files:
            if not f.endswith(('.ts', '.tsx')):
                continue
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()

            new_content = content
            for old, new in replacements:
                new_content = re.sub(re.escape(old), new, new_content)

            # In football pages, update navigation links from /dashboard/ to /football/
            if r'src\app\football' in path:
                new_content = re.sub(r'\/dashboard\/film-room', r'/football/film-room', new_content)
                new_content = re.sub(r'\/dashboard\/call-sheet', r'/football/call-sheet', new_content)
                new_content = re.sub(r'\/dashboard\/player-portal', r'/football/player-portal', new_content)
                new_content = re.sub(r'\/dashboard\/offensive-coach', r'/football/offensive-coach', new_content)
                new_content = re.sub(r'\/dashboard\/players', r'/football/players', new_content)
                new_content = re.sub(r'\/dashboard\/analytics', r'/football/analytics', new_content)
                new_content = re.sub(r'\/dashboard\/actions', r'/football/actions', new_content)
                new_content = re.sub(r'\/dashboard\/reports', r'/football/reports', new_content)
                new_content = re.sub(r"router\.push\('\/dashboard'\)", r"router.push('/football')", new_content)
                new_content = re.sub(r'href="\/dashboard"', r'href="/football"', new_content)
                new_content = re.sub(r"href: `\/dashboard`", r"href: `/football`", new_content)

            if new_content != content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                updated_count += 1
                print(f"Updated: {path}")

print(f"\nDone! Updated {updated_count} files.")
