# -*- coding: utf-8 -*-
import os, re
root = r"D:\PycharmProjects\GameHub"
games = [
 ("Action","Archery-3D"),("Action","Ink-Raiders"),("Action","Odyssey-Voyage"),
 ("Action","Pirate-Raid"),("Action","Pirate-Raiders"),("Action","Space-Shooter-3D"),
 ("Arcade","Doodle-Jump-Game"),("Board","Mahjong-Solitaire-Game"),
 ("FPS","Nazi-Zombies-Portable"),("Puzzle","Cialdini-3D"),
 ("Puzzle","Sliding-Puzzle-Game"),("Typing","Typing-Game"),
 ("Casual","ur"),("Casual","wordform"),
]
for cat, g in games:
    f = os.path.join(root, "games", cat, g, "index.html")
    h = open(f, encoding="utf-8", errors="ignore").read()
    t = re.search(r'<title[^>]*>([^<]+)</title>', h, re.I)
    d = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)', h, re.I)
    if not d:
        d = re.search(r'<meta[^>]+content=["\']([^"\']{20,})["\'][^>]+name=["\']description', h, re.I)
    print("【%s/%s】" % (cat, g))
    print("  T:", (t.group(1).strip() if t else ""))
    print("  D:", (d.group(1).strip()[:150] if d else ""))
