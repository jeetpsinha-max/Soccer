import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Quinn Wachtveitl recruitmentNotes to remove Co-Captain
content = content.replace("recruitmentNotes: 'Team Co-Captain (2026-2027). Physical powerhouse striker",
                          "recruitmentNotes: 'Senior striker with aerial dominance")

# 2. Update formations description referencing Quinn as co-captain
content = content.replace("and Co-Captain #10 Quinn Wachtveitl", "and #10 Quinn Wachtveitl")
content = content.replace("and Co-Captain Quinn Wachtveitl (#10)", "and Quinn Wachtveitl (#10)")

# 3. Add PEDDIE_CAPTAINS_2026 export
captains_block = """
export const PEDDIE_CAPTAINS_2026 = [
  { number: 12, name: 'Noah Eldessouky', classYear: 'Senior', position: 'LB', role: 'Defensive Anchor & Captain' },
  { number: 28, name: 'Tommy Kim', classYear: 'Senior', position: 'ST', role: 'Attacking Spearhead & Captain' },
  { number: 14, name: 'Rayyaan Mohiuddin', classYear: 'Junior', position: 'CAM', role: 'Playmaking Conductor & Captain' },
  { number: 13, name: 'Christian Tharney', classYear: 'Senior', position: 'CDM', role: 'Midfield Commander & Captain' },
] as const;
"""

if 'export const PEDDIE_CAPTAINS_2026' not in content:
    # Insert right after PEDDIE_OFFICIAL_TEAM_TOTALS_2026
    target = "export const PEDDIE_OFFICIAL_TEAM_TOTALS_2026"
    idx = content.find(target)
    if idx != -1:
        # find closing brace of that object
        brace_end = content.find('};', idx)
        if brace_end != -1:
            content = content[:brace_end+2] + "\n" + captains_block + content[brace_end+2:]

# 4. Map video URLs for each match in PEDDIE_SCHEDULE_2026_2027
VEO_URLS = [
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/df91eca4-bd9b-4171-893d-6da93b295af0_1788317479.555815/video.mp4?v=7v9q8pPK",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/86a673c2-a2f7-495c-8282-739cfb12c034_1788317479.555815/video.mp4?v=0FOHwG9l",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/4c7c51a0-7704-4549-b0a2-991a39b54a3c_1788317479.555815/video.mp4?v=2Vr-NiPh",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/8b7d90a3-7840-4447-8fa8-89cf0aa8def2_1788317479.555815/video.mp4?v=D0hJ9wO1",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/3eabdafc-f07f-47c1-8c0a-5913bb6e0015_1788317479.555815/video.mp4?v=YwaRAfam",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/cded00c6-bb03-4a7d-ad64-bc747f764f62_1788317479.555815/video.mp4?v=gjk_1dSv",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/f07ba327-7225-4d16-ab40-207b712e2705_1788317479.555815/video.mp4?v=2VxPy6iu",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/fe533807-2f40-403c-b49a-8b528bc76a1e_1788317479.555815/video.mp4?v=2XbKbMD2",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/06cc928b-6a11-40e9-85ae-01bf1d34dca8_1788317479.555815/video.mp4?v=00ys9FWU",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/4c049e62-a5bf-418f-934d-74b1d09f43d9_1788317479.555815/video.mp4?v=Nhvja1fS",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/c8ce0eb8-d651-4193-a476-ecc79ff6d247_1788317479.555815/video.mp4?v=iD5jIntY",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/1c160071-7c95-495f-9083-746380345b00_1788317479.555815/video.mp4?v=St2s4S9u",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/00d9a0b2-e89b-46f4-b02f-31c6981dce41_1788317479.555815/video.mp4?v=daL9_KhM",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/f7d5ec37-6dc4-461e-843c-128f2e82c1df_1788317479.555815/video.mp4?v=OIMYNrKJ",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/955497fe-8896-48bf-aaf6-4d4a0418b6fa_1788317479.555815/video.mp4?v=VIt--J5f",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/7c9d8fdf-ab12-456e-854a-a3b685d7aa05_1788317479.555815/video.mp4?v=BXlEsn3q",
    "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/2dc977f1-451b-4319-8b7f-a350caa01420_1788317479.555815/video.mp4?v=QbeHPDVs"
]

DEFAULT_THUMB = "https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/standard/machine/c53c9a17/thumbnail.jpg"

# For matches m-5 through m-16, ensure videoUrl, thumbnailUrl, and filmProvider are set
for idx in range(5, 17):
    mid = f"m-{idx}"
    video_url = VEO_URLS[idx]
    # find match block
    m_pattern = rf"(\{{\s*id:\s*'{mid}',[\s\S]*?\n  \}})"
    match = re.search(m_pattern, content)
    if match:
        block = match.group(1)
        if "videoUrl:" not in block:
            # inject videoUrl, thumbnailUrl, and filmProvider
            lines = block.split('\n')
            # insert after id: 'm-X',
            new_lines = []
            for l in lines:
                new_lines.append(l)
                if f"id: '{mid}'," in l:
                    new_lines.append(f"    videoUrl: '{video_url}',")
                    new_lines.append(f"    thumbnailUrl: '{DEFAULT_THUMB}',")
                    new_lines.append("    filmProvider: 'both',")
            new_block = '\n'.join(new_lines)
            content = content.replace(block, new_block)
            print(f"Updated videoUrl for {mid}")

with open('src/lib/soccer-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished phase 1: schedule and captains updated")
