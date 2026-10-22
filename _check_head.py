# -*- coding: utf-8 -*-
import os, re, glob

root = r"D:\PycharmProjects\GameHub"
game_files = glob.glob(os.path.join(root, "games", "*", "*", "index.html"))

no_head = []
ok = []
for f in game_files:
    h = open(f, encoding="utf-8", errors="ignore").read()
    if re.search(r'<link rel="canonical"', h):
        continue
    rel = f.replace("\\", "/").split("games/")[1].replace("index.html", "")
    if "</head>" in h:
        ok.append(rel)
    elif "<head" in h or "<head>" in h:
        no_head.append((rel, "有head无闭合"))
    else:
        no_head.append((rel, "无head"))

print("缺 canonical 且有 </head> 可直接补:", len(ok))
print("结构异常:", len(no_head))
for x in no_head:
    print("   ", x)
