import re

with open('src/lib/soccer-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

urls = re.findall(r'https://c\.veocdn\.com/[^\s"\']+\.mp4\?[^\s"\']+', text)
unique_urls = list(dict.fromkeys(urls))
print(f"Found {len(unique_urls)} unique Veo video URLs")
for i, u in enumerate(unique_urls):
    print(f"{i}: {u}")
