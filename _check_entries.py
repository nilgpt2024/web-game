# -*- coding: utf-8 -*-
import os, re
root = r"D:\PycharmProjects\GameHub"
games = [
 "Action/Odyssey-Voyage","Action/Pirate-Raid","Action/Pirate-Raiders",
 "FPS/Nazi-Zombies-Portable","Arcade/Doodle-Jump-Game","Board/Mahjong-Solitaire-Game",
 "Puzzle/Sliding-Puzzle-Game","Typing/Typing-Game",
 "Action/Space-Shooter-3D","Puzzle/Cialdini-3D",
]
for g in games:
    f = os.path.join(root, "games", g, "index.html")
    h = open(f, encoding="utf-8", errors="ignore").read()
    refs = re.findall(r'(?:src|href)=["\']([^"\']+\.(?:js|css|ts))["\']', h, re.I)
    needs_build = any("/src/main" in r or r.endswith(".ts") for r in refs)
    dist = os.path.join(root, "games", g, "dist", "index.html")
    distrefs = []
    if os.path.exists(dist):
        dh = open(dist, encoding="utf-8", errors="ignore").read()
        distrefs = re.findall(r'(?:src|href)=["\']([^"\']+\.(?:js|css))["\']', dh, re.I)
    print("%-28s 根%s dist:%s" % (
        g,
        "需构建(源码)" if needs_build else "可玩",
        distrefs[:2] if distrefs else ("无dist" if not os.path.exists(dist) else "dist无js引用")))
