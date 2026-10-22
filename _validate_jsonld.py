# -*- coding: utf-8 -*-
import os, re, glob, json
root = r"D:\PycharmProjects\GameHub"
bad = 0
total = 0
for f in glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True):
    h = open(f, encoding="utf-8", errors="ignore").read()
    for b in re.findall(r'<script[^>]*application/ld\+json[^>]*>([\s\S]*?)</script>', h, re.I):
        total += 1
        try:
            json.loads(b)
        except Exception as e:
            bad += 1
            print("JSON 非法:", f.replace("\\", "/").split("games/")[1], str(e)[:80])
print("JSON-LD 块总数:", total, " 非法:", bad)
