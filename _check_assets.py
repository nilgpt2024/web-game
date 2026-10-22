# -*- coding: utf-8 -*-
import os, re, glob
root = r"D:\PycharmProjects\GameHub"
# 校验所有 index.html 引用的相对本地资源（./assets/xxx、assets/xxx）是否存在
missing = []
checked = 0
for f in glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True):
    if "/dist/" in f.replace("\\","/") or "node_modules" in f:
        continue
    gd = os.path.dirname(f)
    h = open(f, encoding="utf-8", errors="ignore").read()
    refs = re.findall(r'(?:src|href)=["\'](\.{0,2}/?assets/[^"\'#?]+)["\']', h)
    for r in refs:
        if r.startswith("http") or r.startswith("data:"):
            continue
        checked += 1
        rp = os.path.normpath(os.path.join(gd, r.replace("./","")))
        if not os.path.exists(rp):
            missing.append(f.replace("\\","/").split("games/")[1] + " -> " + r)
print("校验本地 assets 引用:", checked)
print("缺失:", len(missing))
for m in missing:
    print("  ", m)
