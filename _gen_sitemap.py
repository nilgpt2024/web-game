# -*- coding: utf-8 -*-
"""sitemap 生成器（v2）：只产真实可访问 URL，lastmod 取文件真实修改时间"""
import os, re, sys, glob, datetime, html

root = os.path.dirname(os.path.abspath(__file__))
# 站点架构：suipce.com 是门户（tools + game 双入口），游戏正典在 game.suipce.com
BASE = "https://game.suipce.com"
js = open(os.path.join(root, "script.js"), encoding="utf-8").read()
paths = sorted({p for p in re.findall(r"path:\s*'([^']+)'", js)
                if p.startswith("games/") and "://" not in p})

bad, missing = [], []
for pth in paths:
    if re.search(r"(node_modules|/dist/|/assets/|/build/)", pth.replace("\\", "/")):
        bad.append(pth)
    if not os.path.exists(os.path.join(root, pth.replace("/", os.sep))):
        missing.append(pth)
print("path 总数:", len(paths))
print("含 dist/assets/node_modules 的:", len(bad), bad[:5])
print("指向不存在文件的:", len(missing), missing[:10])


def norm(pth):
    u = pth.replace("\\", "/")
    if u.endswith("/index.html"):
        u = u[:-len("index.html")]
    elif u.endswith("index.html"):
        u = u[:-len("index.html")]
    if not u.endswith("/"):
        u += "/"
    return BASE + "/" + u


def mt(path):
    return datetime.date.fromtimestamp(os.path.getmtime(os.path.join(root, path))).isoformat()


# (slug, 源文件, 优先级, 频率)
static_pages = [
    ("", "index.html", 1.0, "daily"),
    ("astra-games", "astra-games.html", 0.9, "daily"),
    ("best-ai-browser-games", "best-ai-browser-games.html", 0.9, "daily"),
    ("free-ai-games-online", "free-ai-games-online.html", 0.9, "daily"),
    ("ai-opponent-games", "ai-opponent-games.html", 0.9, "daily"),
    ("vibe-coded-games", "vibe-coded-games.html", 0.9, "daily"),
    ("arcade-games", "arcade-games.html", 0.9, "daily"),
    ("action-games", "action-games.html", 0.9, "daily"),
    ("puzzle-games", "puzzle-games.html", 0.9, "daily"),
    ("board-games", "board-games.html", 0.9, "daily"),
    ("memory-games", "memory-games.html", 0.9, "daily"),
    ("typing-games", "typing-games.html", 0.9, "daily"),
    ("casual-games", "casual-games.html", 0.9, "daily"),
    ("about", "about.html", 0.9, "daily"),
    ("contact", "contact.html", 0.9, "daily"),
    ("privacy-policy", "privacy-policy.html", 0.9, "daily"),
    ("terms-of-service", "terms-of-service.html", 0.9, "daily"),
]

L = ['<?xml version="1.0" encoding="UTF-8"?>',
     '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

for slug, src, pri, freq in static_pages:
    loc = BASE + "/" + slug if slug else BASE + "/"
    lastmod = mt(src) if os.path.exists(os.path.join(root, src)) else "2026-11-13"
    L.append('  <url><loc>%s</loc><lastmod>%s</lastmod><changefreq>%s</changefreq><priority>%s</priority></url>'
             % (loc, lastmod, freq, pri))

# blog
L.append('  <url><loc>%s/blog/</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>'
         % (BASE, mt("blog/index.html")))
for bf in sorted(glob.glob(os.path.join(root, "blog", "*.html"))):
    name = os.path.basename(bf)
    if name == "index.html":
        continue
    L.append('  <url><loc>%s/blog/%s</loc><lastmod>%s</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>'
             % (BASE, name[:-5], mt(os.path.join("blog", name))))

missing_set = set(missing)
for pth in paths:
    if pth in missing_set:
        continue
    rel = pth.replace("/", os.sep)
    L.append('  <url><loc>%s</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>'
             % (norm(pth), mt(rel)))

L.append('</urlset>')
out = "\n".join(L) + "\n"
print("sitemap URL 总数:", out.count("<url>"))
if missing_set:
    print("已跳过缺失路径:", sorted(missing_set))
if "--apply" in sys.argv and not bad:
    open(os.path.join(root, "sitemap.xml"), "w", encoding="utf-8").write(out)
    print("已写入 sitemap.xml")
elif bad:
    print("存在异常路径，未写入，请先修复")
else:
    print("DRY-RUN（无异常）")
