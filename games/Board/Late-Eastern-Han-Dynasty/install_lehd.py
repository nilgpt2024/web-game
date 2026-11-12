"""Deploy CtxPilot/Late-Eastern-Han-Dynasty GitHub Pages build into GameHub."""
import os, io, shutil, re

SRC = r'C:/Users/nil/AppData/Local/Temp/lehd'
DST = r'D:/PycharmProjects/GameHub/games/Board/Late-Eastern-Han-Dynasty'
BASE = '/Late-Eastern-Han-Dynasty/'

if os.path.exists(DST):
    raise SystemExit('target already exists: ' + DST)
shutil.copytree(SRC, DST)
print('copied tree')


def patch(rel, replacements, expect=None):
    p = os.path.join(DST, rel)
    s = io.open(p, encoding='utf-8', errors='surrogateescape').read()
    for old, new, n in replacements:
        found = s.count(old)
        assert found == n, f'{rel}: expected {n} occurrences of {old[:60]!r}, found {found}'
        s = s.replace(old, new)
    io.open(p, 'w', encoding='utf-8', errors='surrogateescape', newline='').write(s)
    print('patched', rel)


# 1. entry html: relative asset paths + site SEO head (keep upstream SPDX/copyright comment)
patch('index.html', [
    ('src="/Late-Eastern-Han-Dynasty/assets/', 'src="./assets/', 1),
    ('href="/Late-Eastern-Han-Dynasty/assets/', 'href="./assets/', 1),
    ('<title>LateEasternHanDynasty — Phase 0-A</title>',
     '<title>Late Eastern Han Dynasty — 东汉末年大战略 | AIGameHub</title>\n'
     '    <meta name="description" content="东汉末年大战略：223 位武将、30 座城池、求贤登用与忠诚、外交谍报、11 计 8 国策、9 兵种 7 阵型与六角战棋。纯前端开源策略游戏，无需下载。" />\n'
     '    <link rel="canonical" href="https://suipce.com/games/Board/Late-Eastern-Han-Dynasty/" />\n'
     '    <meta property="og:image" content="https://suipce.com/games/Board/Late-Eastern-Han-Dynasty/preview.webp" />\n'
     '    <meta name="twitter:image" content="https://suipce.com/games/Board/Late-Eastern-Han-Dynasty/preview.webp" />\n'
     '    <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://suipce.com/"},{"@type":"ListItem","position":2,"name":"Board &amp; Strategy Games","item":"https://suipce.com/board-games"},{"@type":"ListItem","position":3,"name":"Late Eastern Han Dynasty","item":"https://suipce.com/games/Board/Late-Eastern-Han-Dynasty/"}]}</script>', 1),
])

# 2. main bundle: Vite modulepreload base, worker URL, service worker registration
patch('assets/index-Bmjpo5v0.js', [
    ('return"/Late-Eastern-Han-Dynasty/"+e', 'return"./"+e', 1),
    ('new URL("/Late-Eastern-Han-Dynasty/assets/game.worker-BGSt6o6Y.js",import.meta.url)',
     'new URL("./game.worker-BGSt6o6Y.js",import.meta.url)', 1),
    ('navigator.serviceWorker.register("/Late-Eastern-Han-Dynasty/sw.js")',
     'navigator.serviceWorker.register("./sw.js")', 1),
])

# 3. css: font urls are relative to assets/ -> ../fonts/
patch('assets/index-CY6QwkDC.css', [
    ('url(/Late-Eastern-Han-Dynasty/fonts/', 'url(../fonts/', 3),
])

# 4. service worker: precache manifest + navigation fallback
sw = os.path.join(DST, 'sw.js')
t = io.open(sw, encoding='utf-8').read()
print('sw.js base occurrences:', t.count(BASE))
t = t.replace('"/Late-Eastern-Han-Dynasty/', '"./')
t = t.replace("'/Late-Eastern-Han-Dynasty/index.html'", "'./index.html'")
assert '/Late-Eastern-Han-Dynasty' not in t
io.open(sw, 'w', encoding='utf-8', newline='').write(t)

# 5. global sanity: no leftover absolute base path anywhere
left = []
for dp, dn, fn in os.walk(DST):
    for f in fn:
        if not f.endswith(('.html', '.js', '.css', '.txt', '.md')):
            continue
        p = os.path.join(dp, f)
        s = io.open(p, encoding='utf-8', errors='ignore').read()
        if '/Late-Eastern-Han-Dynasty' in s:
            left.append(os.path.relpath(p, DST))
print('files still containing absolute base:', left)

# 6. attribution (MIT + OFL font licenses)
io.open(os.path.join(DST, 'ATTRIBUTION.txt'), 'w', encoding='utf-8').write(
    'Late Eastern Han Dynasty / 晚东汉末·大战略 (Phase 0-A playable prototype)\n'
    'Upstream: https://github.com/CtxPilot/Late-Eastern-Han-Dynasty\n'
    'Live demo: https://ctxpilot.github.io/Late-Eastern-Han-Dynasty/\n'
    'Copyright (c) 2026 CtxPilot — SPDX-License-Identifier: MIT\n'
    'Fonts: Noto Serif CJK SC (Regular/Bold) and Ma Shan Zheng — SIL Open Font License 1.1,\n'
    'license text in fonts/OFL-1.1.txt, provenance in fonts/README.md.\n'
    'This is the unmodified GitHub Pages build except: absolute /Late-Eastern-Han-Dynasty/\n'
    'base paths rewritten to relative paths (index.html, main bundle, CSS, sw.js) and\n'
    'site SEO/meta tags added to index.html.\n'
    'NOTE: fonts are mandatory - the app refuses to boot if document.fonts.load() fails.\n'
)

files = [os.path.join(dp, f) for dp, dn, fn in os.walk(DST) for f in fn]
print('deployed files:', len(files), '| total KB:', sum(os.path.getsize(x) for x in files) // 1024)
