# -*- coding: utf-8 -*-
import os, re, glob
root = r"D:\PycharmProjects\GameHub"
graph_files = []
for f in glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True):
    h = open(f, encoding="utf-8", errors="ignore").read()
    for b in re.findall(r'<script[^>]*application/ld\+json[^>]*>([\s\S]*?)</script>', h, re.I):
        if "gptgames.dev" in b and ('"@graph"' in b or '"@type":"WebSite"' in b or 'CollectionPage' in b):
            rel = f.replace("\\", "/").split("games/")[1]
            types = sorted(set(re.findall(r'"@type"\s*:\s*"([^"]+)"', b)))
            graph_files.append((rel, len(b), types))
print("原站 @graph 大型块文件数:", len(graph_files))
for r, l, t in graph_files:
    print("  %-40s %d字符 %s" % (r, l, t))
