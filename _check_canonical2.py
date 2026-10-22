# -*- coding: utf-8 -*-
import os, re, glob

root = r"D:\PycharmProjects\GameHub"
game_files = glob.glob(os.path.join(root, "games", "*", "*", "index.html"))

# 宽松匹配：标签内允许无空格、单/双引号、href 在前或后
canon_re = re.compile(r'<link[^>]*rel=["\']canonical["\'][^>]*>|<link[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', re.I)
href_re = re.compile(r'<link[^>]*?(?:rel=["\']canonical["\'][^>]*?href|href=["\']([^"\']+)["\'][^>]*?rel)["\']?[^>]*>', re.I)

missing, wrong = [], []
for f in game_files:
    h = open(f, encoding="utf-8", errors="ignore").read()
    rel = f.replace("\\", "/").split("games/")[1].replace("index.html", "")
    # 直接找 canonical link 整段
    m = re.search(r'<link\b[^>]*canonical[^>]*>', h, re.I)
    if not m:
        missing.append(rel)
        continue
    tag = m.group(0)
    hm = re.search(r'href=["\']([^"\']+)["\']', tag)
    url = hm.group(1) if hm else "(无href)"
    if "suipce.com/games/" not in url:
        wrong.append((rel, url))

print("游戏页总数:", len(game_files))
print("真正缺 canonical:", len(missing), missing)
print("canonical 域名/路径异常:", len(wrong), wrong)
