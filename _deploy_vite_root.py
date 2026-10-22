# -*- coding: utf-8 -*-
import os, shutil, re
root = r"D:\PycharmProjects\GameHub"
games = ["Action/Archery-3D","Action/Ink-Raiders","Action/Space-Shooter-3D","Puzzle/Cialdini-3D"]
for g in games:
    gd = os.path.join(root, "games", g)
    dist = os.path.join(gd, "dist")
    # 1. 根 assets 目录
    os.makedirs(os.path.join(gd, "assets"), exist_ok=True)
    src_assets = os.path.join(dist, "assets")
    for f in os.listdir(src_assets):
        if f.endswith(".map"):
            continue
        shutil.copy2(os.path.join(src_assets, f), os.path.join(gd, "assets", f))
    # 2. dist 根目录的其他文件（preview 等，排除 index.html / assets）
    for f in os.listdir(dist):
        p = os.path.join(dist, f)
        if os.path.isfile(p) and f.lower() != "index.html":
            shutil.copy2(p, os.path.join(gd, f))
    # 3. 覆盖根 index.html（先确认相对路径引用）
    di = os.path.join(dist, "index.html")
    dh = open(di, encoding="utf-8", errors="ignore").read()
    assert '"/assets/' not in dh and "'/assets/" not in dh, g + " 仍有绝对路径!"
    open(os.path.join(gd, "index.html"), "w", encoding="utf-8").write(dh)
    # 4. 删除 dist
    shutil.rmtree(dist)
    print("部署到根:", g)

# 5. 更新 script.js：path/preview 去掉 dist/
sp = os.path.join(root, "script.js")
s = open(sp, encoding="utf-8").read()
before = s.count("/dist/index.html")
s = s.replace("/dist/index.html", "/index.html")
s = s.replace("/dist/preview.", "/preview.")
open(sp, "w", encoding="utf-8").write(s)
print("script.js dist 条目改回根:", before)
