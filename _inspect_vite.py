# -*- coding: utf-8 -*-
import os
root = r"D:\PycharmProjects\GameHub"
for g in ["Action/Archery-3D","Action/Ink-Raiders","Action/Space-Shooter-3D","Puzzle/Cialdini-3D"]:
    print("="*12, g)
    print("  package.json:", os.path.exists(os.path.join(root,"games",g,"package.json")))
    dist = os.path.join(root,"games",g,"dist")
    for dp, dn, fn in os.walk(dist):
        rel = os.path.relpath(dp, dist).replace("\\","/")
        for f in fn:
            full = os.path.join(dp,f)
            print("   dist/%s/%s  %dKB" % (rel, f, os.path.getsize(full)//1024))
    # 根 index 是否 vite 模板
    rootidx = os.path.join(root,"games",g,"index.html")
    h = open(rootidx,encoding="utf-8",errors="ignore").read()
    print("  根index 长度:", len(h), " 含/src/main:", "/src/main" in h, " 含game-info-section:", "game-info-section" in h)
