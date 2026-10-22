# -*- coding: utf-8 -*-
import os, re
root = r"D:\PycharmProjects\GameHub"
f = os.path.join(root, "games", "Puzzle", "Mind-Meter", "index.html")
h = open(f, encoding="utf-8", errors="ignore").read()
blocks = re.findall(r'<script[^>]*application/ld\+json[^>]*>([\s\S]*?)</script>', h, re.I)
print("JSON-LD 块数:", len(blocks))
for i, b in enumerate(blocks):
    types = re.findall(r'"@type"\s*:\s*"([^"]+)"', b)
    print("  块%d 长度%d 类型%s 含gpt:%s" % (i, len(b), sorted(set(types)), "gptgames.dev" in b))
