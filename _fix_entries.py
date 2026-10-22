# -*- coding: utf-8 -*-
import re
p = r"D:\PycharmProjects\GameHub\script.js"
lines = open(p, encoding="utf-8").read().split("\n")
out = []
removed = []
changed = []
for ln in lines:
    # 删除我新增的 Archery-3D 根条目（已有 dist 条目 Mount & Blade）
    if "added: '2026-10-20'" in ln and "games/Action/Archery-3D/index.html" in ln:
        removed.append(ln.strip()[:60]); continue
    # 删除我新增的 Ink-Raiders 根条目（已有 dist 条目）
    if "added: '2026-10-20'" in ln and "games/Action/Ink-Raiders/index.html" in ln:
        removed.append(ln.strip()[:60]); continue
    # Space-Shooter / Cialdini 根入口 -> dist
    if "games/Action/Space-Shooter-3D/index.html" in ln:
        ln = ln.replace("games/Action/Space-Shooter-3D/index.html", "games/Action/Space-Shooter-3D/dist/index.html")
        changed.append("Space-Shooter-3D -> dist")
    if "games/Puzzle/Cialdini-3D/index.html" in ln:
        ln = ln.replace("games/Puzzle/Cialdini-3D/index.html", "games/Puzzle/Cialdini-3D/dist/index.html")
        changed.append("Cialdini-3D -> dist")
    out.append(ln)

# 清理删除后可能留下的孤立逗号/空行：删除纯空白行中多余的（保留结构）
open(p, "w", encoding="utf-8").write("\n".join(out))
print("删除行:", len(removed))
for r in removed: print("  -", r)
print("修改:", changed)
