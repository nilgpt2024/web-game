# -*- coding: utf-8 -*-
import os, re, glob

root = r"D:\PycharmProjects\GameHub"
game_files = glob.glob(os.path.join(root, "games", "*", "*", "index.html"))

missing = []
trailing = 0   # 尾斜杠目录形式
indexhtml = 0  # 带 index.html
other = 0
bad_domain = []

for f in game_files:
    h = open(f, encoding="utf-8", errors="ignore").read()
    m = re.search(r'<link rel="canonical" href="([^"]+)"', h)
    rel = f.replace("\\", "/").split("games/")[1].replace("index.html", "")
    if not m:
        missing.append(rel)
        continue
    c = m.group(1)
    if "suipce.com" not in c:
        bad_domain.append((rel, c))
    if c.endswith("/") and "index.html" not in c:
        trailing += 1
    elif "index.html" in c:
        indexhtml += 1
    else:
        other += 1

print("游戏页总数:", len(game_files))
print("缺 canonical:", len(missing))
print("canonical 尾斜杠目录形式:", trailing)
print("canonical 带 index.html:", indexhtml)
print("canonical 其他:", other)
print("域名非 suipce:", len(bad_domain), bad_domain[:10])
print("\n缺 canonical 示例:", missing[:20])
