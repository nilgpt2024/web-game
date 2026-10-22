# -*- coding: utf-8 -*-
import os, re
root = r"D:\PycharmProjects\GameHub"
for g in ["Action/Archery-3D","Action/Ink-Raiders","Action/Space-Shooter-3D","Puzzle/Cialdini-3D"]:
    print("="*10, g)
    for sub in ["index.html", "dist/index.html"]:
        f = os.path.join(root, "games", g, sub)
        if not os.path.exists(f):
            print("  ", sub, "不存在")
            continue
        h = open(f, encoding="utf-8", errors="ignore").read()
        refs = re.findall(r'<(?:script|link)[^>]+(?:src|href)=["\']([^"\']+)["\']', h, re.I)
        print("  ", sub, "长度", len(h), "引用:", refs[:6])
    # dist 内是否有 assets
    distdir = os.path.join(root, "games", g, "dist")
    if os.path.isdir(distdir):
        n = sum(len(fs) for _,_,fs in os.walk(distdir))
        print("   dist 文件数:", n)
