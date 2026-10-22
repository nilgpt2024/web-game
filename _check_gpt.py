# -*- coding: utf-8 -*-
import os, re, glob

root = r"D:\PycharmProjects\GameHub"
files = list(glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True))

og_url_bad = []
img_bad = 0
detail = []
for f in files:
    h = open(f, encoding="utf-8", errors="ignore").read()
    if "gptgames.dev" not in h:
        continue
    rel = f.replace("\\", "/").split("games/")[1]
    # og:url 指向 gptgames
    og = re.search(r'<meta[^>]+property=["\']og:url["\'][^>]+content=["\']([^"\']+)["\']', h)
    if og and "gptgames.dev" in og.group(1):
        og_url_bad.append((rel, og.group(1)))
    # 图片引用
    imgs = re.findall(r'(?:og:image|twitter:image)["\'][^>]+content=["\']([^"\']*gptgames[^"\']*)["\']', h)
    if imgs:
        img_bad += 1
        detail.append((rel, imgs))

print("含 gptgames.dev 文件数:", len(og_url_bad) + 0)
print("og:url 指向原站(最严重):", len(og_url_bad))
for r, u in og_url_bad:
    print("   ", r, "->", u)
print("含 gptgames 图片引用文件数:", img_bad)
