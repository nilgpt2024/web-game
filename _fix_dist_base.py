# -*- coding: utf-8 -*-
import os, re
root = r"D:\PycharmProjects\GameHub"
games = ["Action/Space-Shooter-3D", "Puzzle/Cialdini-3D", "Action/Archery-3D", "Action/Ink-Raiders"]
for g in games:
    f = os.path.join(root, "games", g, "dist", "index.html")
    if not os.path.exists(f):
        print(g, "无 dist/index.html")
        continue
    h = open(f, encoding="utf-8", errors="ignore").read()
    # 绝对路径 /assets/ -> 相对 ./assets/（仅属性值）
    refs = re.findall(r'(?:src|href)=["\'](/assets/[^"\']+)["\']', h)
    h2 = re.sub(r'((?:src|href)=["\'])(/assets/)', r'\1./assets/', h)
    # 也处理 modulepreload 等可能的形式
    if h2 != h:
        open(f, "w", encoding="utf-8").write(h2)
        print(g, "修正绝对路径:", refs)
    else:
        print(g, "无需修正（已为相对路径）")
