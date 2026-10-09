with open('prisma/seed.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
# Look for height:"..."
text = re.sub(r'height:"([^"]+)""', r'height:"\1\""', text)

with open('prisma/seed.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed quotes in seed.ts")
