with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace duplicate filmProvider
text = text.replace("    filmProvider: 'hudl',\n    filmProvider: 'both',", "    filmProvider: 'both',")
text = text.replace("    filmProvider: 'both',\n    filmProvider: 'both',", "    filmProvider: 'both',")
text = text.replace("    filmProvider: 'hudl',", "    filmProvider: 'both',")

# Ensure Lawrenceville is explicitly in descriptions
text = text.replace("LVR Film Scout: Fairchild", "Lawrenceville Film Scout: Fairchild")
text = text.replace("LVR Film Scout: Cruz", "Lawrenceville Film Scout: Cruz")
text = text.replace("PEDDIE TACTICAL COUNTER: LVR", "PEDDIE TACTICAL COUNTER: Lawrenceville Big Red")
text = text.replace("LVR Film Scout: Tristan", "Lawrenceville Film Scout: Tristan")

with open('src/lib/soccer-data.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print('Cleaned soccer-data.ts successfully')
