# -*- coding: utf-8 -*-
import os, re, sys, glob
root = r"D:\PycharmProjects\GameHub"
js = open(os.path.join(root, "script.js"), encoding="utf-8").read()
paths = sorted(set(re.findall(r"path:\s*'([^']+)'", js)))

# 校验：无 dist/node_modules/assets，文件真实存在
bad, missing = [], []
for pth in paths:
    if re.search(r"(node_modules|/dist/|/assets/|/build/)", pth.replace("\\", "/")):
        bad.append(pth)
    if not os.path.exists(os.path.join(root, pth.replace("/", os.sep))):
        missing.append(pth)
print("path 总数:", len(paths))
print("含 dist/assets/node_modules 的:", len(bad), bad[:5])
print("指向不存在文件的:", len(missing), missing[:10])

# 规范化 URL：去掉 index.html，加尾斜杠
def norm(pth):
    u = pth.replace("\\", "/")
    if u.endswith("/index.html"):
        u = u[:-len("index.html")]
    elif u.endswith("index.html"):
        u = u[:-len("index.html")]
    if not u.endswith("/"):
        u += "/"
    return "https://suipce.com/" + u

static_pri = [
    ("", 1.0, "daily"),
    ("arcade-games", 0.9, "daily"), ("action-games", 0.9, "daily"),
    ("puzzle-games", 0.9, "daily"), ("board-games", 0.9, "daily"),
    ("memory-games", 0.9, "daily"), ("typing-games", 0.9, "daily"),
    ("casual-games", 0.9, "daily"),
    ("about", 0.9, "daily"), ("contact", 0.9, "daily"),
    ("privacy-policy", 0.9, "daily"), ("terms-of-service", 0.9, "daily"),
]
L = ['<?xml version="1.0" encoding="UTF-8"?>',
     '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for slug, pri, freq in static_pri:
    loc = "https://suipce.com/" + slug if slug else "https://suipce.com/"
    L.append('  <url><loc>%s</loc><lastmod>2026-10-20</lastmod><changefreq>%s</changefreq><priority>%s</priority></url>' % (loc, freq, pri))
# blog
L.append('  <url><loc>https://suipce.com/blog/</loc><lastmod>2026-10-14</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>')
for bf in sorted(glob.glob(os.path.join(root, "blog", "*.html"))):
    name = os.path.basename(bf)
    if name == "index.html":
        continue
    L.append('  <url><loc>https://suipce.com/blog/%s</loc><lastmod>2026-10-14</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>' % name[:-5])
# 游戏
for pth in paths:
    L.append('  <url><loc>%s</loc><lastmod>2026-10-20</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>' % norm(pth))
L.append('</urlset>')
out = "\n".join(L) + "\n"
print("sitemap URL 总数:", out.count("<url>"))
if "--apply" in sys.argv and not bad and not missing:
    open(os.path.join(root, "sitemap.xml"), "w", encoding="utf-8").write(out)
    print("已写入 sitemap.xml")
elif bad or missing:
    print("存在异常，未写入，请先修复")
else:
    print("DRY-RUN（无异常）")
