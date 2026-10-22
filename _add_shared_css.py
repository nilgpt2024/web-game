# -*- coding: utf-8 -*-
"""给缺 game-shared.css 的游戏页补 <link>（在 </head> 前）。幂等：已含则跳过。"""
import os, re, importlib.util

ROOT = r"D:\PycharmProjects\GameHub"
spec = importlib.util.spec_from_file_location("c", os.path.join(ROOT, "_seo_content.py"))
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)

LINK = '<link rel="stylesheet" href="../../game-shared.css">'
done, skip, nohead = [], [], []
for key in sorted(m.CONTENT.keys()):
    p = os.path.join(ROOT, "games", key, "index.html")
    if not os.path.exists(p):
        continue
    html = open(p, encoding="utf-8").read()
    if "game-info-section" not in html:
        skip.append(key); continue  # 无内容区的页面（含畸形文件）不处理
    if "game-shared.css" in html:
        skip.append(key); continue
    hm = re.search(r"</head>", html, re.I)
    if not hm:
        nohead.append(key); continue
    html = html[:hm.start()] + LINK + "\n" + html[hm.start():]
    open(p, "w", encoding="utf-8", newline="").write(html)
    done.append(key)
print("已插入 (%d):" % len(done)); [print("  ", x) for x in done]
print("跳过(已存在) (%d):" % len(skip))
print("无 </head> (%d):" % len(nohead)); [print("  ", x) for x in nohead]
