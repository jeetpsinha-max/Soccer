import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Formations in soccer-data.ts
# Replace 4-4-2 nodes
old_442_nodes = """      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 64, role: 'Diamond Base Holding Anchor (Captain)' },
      { position: 'LM', playerNumber: 6, playerName: 'Sinha', xPct: 24, yPct: 48, role: 'Left Midfielder' },
      { position: 'RM', playerNumber: 7, playerName: 'Cuchera', xPct: 76, yPct: 48, role: 'Right Midfielder' },"""

new_442_nodes = """      { position: 'CDM', playerNumber: 13, playerName: 'Tharney (C)', xPct: 50, yPct: 64, role: 'Diamond Base Holding Anchor (Captain)' },
      { position: 'LM', playerNumber: 7, playerName: 'Cucchiara', xPct: 24, yPct: 48, role: 'Starting Left Midfielder' },
      { position: 'RM', playerNumber: 26, playerName: 'Romanelli', xPct: 76, yPct: 48, role: 'Starting Right Midfielder' },"""

if old_442_nodes in content:
    content = content.replace(old_442_nodes, new_442_nodes)
    print("Updated 4-4-2 nodes")
else:
    print("Warning: old_442_nodes not found")

# Replace 4-4-2 description & strengths
old_442_desc = "wide midfielders #6 Jeet Sinha (LM) and #7 Bennett Cuchera (RM)"
new_442_desc = "starting wide midfielders #7 Bennett Cucchiara (LM) and #26 Blake Romanelli (RM)"
content = content.replace(old_442_desc, new_442_desc)

old_442_str = "flank service from #6 Jeet Sinha (LM) and #7 Bennett Cuchera (RM)"
new_442_str = "flank service from starting LM #7 Bennett Cucchiara and starting RM #26 Blake Romanelli"
content = content.replace(old_442_str, new_442_str)

# 4-2-3-1
old_4231_nodes = """      { position: 'LM', playerNumber: 10, playerName: 'Wachtveitl', xPct: 18, yPct: 26, role: 'Left Midfielder' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 15, role: 'Striker (Captain)' },
      { position: 'RM', playerNumber: 7, playerName: 'Cuchera', xPct: 82, yPct: 26, role: 'Right Midfielder' }"""

new_4231_nodes = """      { position: 'LM', playerNumber: 7, playerName: 'Cucchiara', xPct: 18, yPct: 26, role: 'Starting Left Midfielder' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 15, role: 'Striker (Captain)' },
      { position: 'RM', playerNumber: 26, playerName: 'Romanelli', xPct: 82, yPct: 26, role: 'Starting Right Midfielder' }"""
content = content.replace(old_4231_nodes, new_4231_nodes)

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
content = content.replace(old_352_nodes, new_352_nodes)

# 4-3-3
old_433_nodes = """      { position: 'LW', playerNumber: 19, playerName: 'Gimbel', xPct: 18, yPct: 24, role: 'Inside Forward' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 16, role: 'Complete Forward (Captain)' },
      { position: 'RW', playerNumber: 7, playerName: 'Cuchera', xPct: 82, yPct: 24, role: 'Touchline Winger & Set-Piece Specialist' }"""

new_433_nodes = """      { position: 'LW', playerNumber: 7, playerName: 'Cucchiara', xPct: 18, yPct: 24, role: 'Starting Left Winger' },
      { position: 'ST', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 16, role: 'Complete Forward (Captain)' },
      { position: 'RW', playerNumber: 26, playerName: 'Romanelli', xPct: 82, yPct: 24, role: 'Starting Right Winger' }"""
content = content.replace(old_433_nodes, new_433_nodes)

with open('src/lib/soccer-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Formations updated successfully in soccer-data.ts")
