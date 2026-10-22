# -*- coding: utf-8 -*-
import os, re, glob
root = r"D:\PycharmProjects\GameHub"
bad_jsonld = []
for f in glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True):
    h = open(f, encoding="utf-8", errors="ignore").read()
    blocks = re.findall(r'<script[^>]*application/ld\+json[^>]*>([\s\S]*?)</script>', h, re.I)
    for b in blocks:
        if "gptgames.dev" in b:
            rel = f.replace("\\", "/").split("games/")[1]
            bad_jsonld.append((rel, b.strip()[:300]))
print("JSON-LD 中真正含 gptgames 的块数:", len(bad_jsonld))
for rel, b in bad_jsonld[:8]:
    print("====", rel)
    print(b)
