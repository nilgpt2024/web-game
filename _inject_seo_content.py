# -*- coding: utf-8 -*-
"""把 SEO 内容区注入到游戏页 index.html（在 </body> 前插入）。
重复运行安全：已含 .game-info-section 的页面跳过。"""
import os, re, sys, importlib.util

ROOT = r"D:\PycharmProjects\GameHub"
GAMES = os.path.join(ROOT, "games")

# 加载内容数据
spec = importlib.util.spec_from_file_location("seo_content", os.path.join(ROOT, "_seo_content.py"))
mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
CONTENT = mod.CONTENT

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def related_links(cat, game):
    """同分类下前 4 个其他游戏，相对链接 ../Other/"""
    cdir = os.path.join(GAMES, cat)
    out = []
    if os.path.isdir(cdir):
        for name in sorted(os.listdir(cdir)):
            p = os.path.join(cdir, name)
            if os.path.isdir(p) and name != game and os.path.exists(os.path.join(p, "index.html")):
                out.append((name, "../" + name + "/"))
            if len(out) >= 4:
                break
    return out

def build_html(cat, game, c):
    gid = game.lower()
    toc = [
        ("intro", "游戏介绍"), ("how", "玩法说明"), ("controls", "操作方式"),
        ("features", "游戏特色"), ("tips", "玩法技巧"), ("faq", "常见问题"),
    ]
    parts = []
    parts.append('<section class="game-info-section" id="game-info">')
    parts.append('<div class="game-info-inner">')
    # 目录
    parts.append('<ul class="gi-toc">' + "".join(
        '<li><a href="#%s-%s">%s</a></li>' % (gid, a, label) for a, label in toc) + '</ul>')
    # 介绍
    parts.append('<h2 id="%s-intro">%s</h2>' % (gid, esc(c["h2"])))
    for para in c["intro"]:
        parts.append('<p>' + esc(para) + '</p>')
    # 玩法
    parts.append('<h2 id="%s-how">怎么玩 %s？玩法说明</h2>' % (gid, esc(game)))
    how = c["how"]
    if isinstance(how, list):
        how = " ".join(how)
    parts.append('<p>' + esc(how) + '</p>')
    # 操作
    parts.append('<h3 id="%s-controls">操作方式</h3>' % gid)
    parts.append('<ul>' + "".join('<li>' + esc(x) + '</li>' for x in c["controls"]) + '</ul>')
    # 特色
    parts.append('<h2 id="%s-features">游戏特色</h2>' % gid)
    parts.append('<ul>' + "".join('<li>' + esc(x) + '</li>' for x in c["features"]) + '</ul>')
    # 技巧
    parts.append('<h2 id="%s-tips">玩法技巧与攻略</h2>' % gid)
    parts.append('<ol>' + "".join('<li>' + esc(x) + '</li>' for x in c["tips"]) + '</ol>')
    # FAQ
    parts.append('<div class="game-faq" id="%s-faq">' % gid)
    parts.append('<h2>常见问题 FAQ</h2>')
    for q, a in c["faq"]:
        parts.append('<details><summary>' + esc(q) + '</summary><p>' + esc(a) + '</p></details>')
    parts.append('</div>')
    # 相关推荐
    rel = related_links(cat, game)
    if rel:
        parts.append('<div class="gi-related">')
        parts.append('<h2>更多同类游戏推荐</h2>')
        parts.append('<div class="gi-related-links">' + "".join(
            '<a href="%s">%s</a>' % (href, esc(display)) for display, href in rel) + '</div>')
        parts.append('</div>')
    parts.append('</div>')
    parts.append('</section>')
    return "".join(parts)

MARK = "game-info-section"
done, skipped, missing, unsafe = [], [], [], []
for key, c in CONTENT.items():
    cat, game = key.split("/")
    p = os.path.join(GAMES, cat, game, "index.html")
    if not os.path.exists(p):
        missing.append(key); continue
    html = open(p, encoding="utf-8").read()
    if MARK in html:
        skipped.append(key); continue
    block = build_html(cat, game, c)
    if "</body>" in html:
        html = html.replace("</body>", block + "</body>", 1)
    else:
        # 无 </body>：仅当 script 标签开闭平衡时才能安全追加（补全 body/html）
        opens = html.count("<script")
        closes = html.count("</script")
        if opens > closes or closes == 0 and opens > 0:
            unsafe.append(key); continue  # 原文件 JS 未闭合/畸形，跳过
        html = html.rstrip() + "\n" + block + "\n</body></html>\n"
    open(p, "w", encoding="utf-8", newline="").write(html)
    done.append(key)

print("已注入 (%d):" % len(done)); [print("  ", x) for x in done]
print("跳过(已存在) (%d):" % len(skipped)); [print("  ", x) for x in skipped]
print("跳过(原文件畸形，JS未闭合) (%d):" % len(unsafe)); [print("  ", x) for x in unsafe]
print("缺失 (%d):" % len(missing)); [print("  ", x) for x in missing]
