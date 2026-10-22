# -*- coding: utf-8 -*-
"""
AIGameHub 游戏页英文化脚本（meta 层 + JSON-LD + 顶部静态横幅）
对每个游戏页 index.html：
  1) title / meta description / og / twitter 中的中文 -> 英文模板
  2) JSON-LD VideoGame.description、Breadcrumb 中文名、FAQ 中文 -> 英文
  3) 顶部静态横幅常见中文 -> 英文
用法：python _i18n_en.py            # 处理全部游戏页
      python _i18n_en.py only      # 只处理 SAMPLE_LIST 中的样板页
"""
import io, os, re, glob, sys

ROOT = r'D:\PycharmProjects\GameHub'

CAT_EN = {
    'Puzzle': 'Puzzle', 'Action': 'Action', 'Arcade': 'Arcade', 'Board': 'Board',
    'Memory': 'Memory', 'Typing': 'Typing', 'Casual': 'Casual',
    'Adventure': 'Adventure', 'Astra': 'AI Art', 'FPS': 'Shooter',
}
CAT_BREAD = {  # Breadcrumb 分类英文名
    'Action': 'Action Games', 'Arcade': 'Arcade Games', 'Puzzle': 'Puzzle Games',
    'Board': 'Board Games', 'Memory': 'Memory Games', 'Typing': 'Typing Games',
    'Casual': 'Casual Games', 'Adventure': 'Adventure Games',
    'Astra': 'AI Art', 'FPS': 'Shooter Games',
}

SAMPLE_LIST = [
    'games/Action/Breakout',
    'games/Arcade/Snake',
    'games/Arcade/Tetris',
    'games/Puzzle/2048',
    'games/Puzzle/Minesweeper',
    'games/Puzzle/Sudoku',
    'games/Board/Chess',
    'games/Action/Flappy-Bird',
    'games/Arcade/Pac-Man',
    'games/Arcade/Magic-Carpet-Wizard',
]

# 顶部静态横幅常见中文 -> 英文（游戏特有文案不在此，样板另行润色）
STATIC_REPLACEMENTS = [
    ('更多游戏', 'More Games'),
    ('返回游戏大厅', 'Back to Game Hub'),
    ('游戏大厅', 'Game Hub'),
    ('首页', 'Home'),
]

def slug_to_title(slug):
    if not slug:
        return ''
    s = re.sub(r'([a-z])([A-Z])', r'\1 \2', slug)
    s = re.sub(r'[-_]+', ' ', s).strip()
    return ' '.join(w.capitalize() if w.islower() else w for w in s.split())

def has_cjk(s):
    return bool(re.search(r'[\u4e00-\u9fff]', s))

def article_for(cat):
    return 'an' if cat[0].lower() in 'aeiou' else 'a'

def make_title(en_name, cat):
    return f"Play {en_name} Online - Free {cat} Game | AIGameHub"

def make_desc(en_name, cat):
    art = article_for(cat)
    return (f"Play {en_name} online for free — {art} {cat.lower()} game that runs instantly "
            f"in your browser. No download, no sign-up. Works on desktop and mobile. Try it now!")

def process(path):
    """英文化单个游戏页，返回统计 dict"""
    st = {'title': 0, 'desc': 0, 'og': 0, 'ld': 0, 'static': 0}
    c = io.open(path, encoding='utf-8', errors='ignore').read()
    rel = os.path.relpath(path, ROOT).replace('\\', '/')
    parts = rel.split('/')          # ['games', cat, slug, 'index.html']
    cat = parts[1]
    slug = parts[2]
    cat_en = CAT_EN.get(cat, 'Game')
    en_name = slug_to_title(slug)
    # 默认英文值（无论 meta 是否需要替换，JSON-LD 处理都引用）
    new_title = make_title(en_name, cat_en)[:90]
    new_desc = make_desc(en_name, cat_en)[:155]

    # ---- title ----
    tm = re.search(r'<title[^>]*>(.*?)</title>', c, re.S | re.I)
    old_title = tm.group(1).strip() if tm else ''
    if has_cjk(old_title) or (old_title and not re.search(r'\bplay\b|\bonline\b', old_title, re.I)) or not old_title:
        if tm:
            c = c[:tm.start()] + '<title>' + new_title + '</title>' + c[tm.end():]
        else:
            c = re.sub(r'(<meta charset="[^"]*"\s*/?>)', r'\1<title>' + new_title + '</title>', c, count=1, flags=re.I)
        st['title'] += 1
        # og:title / twitter:title
        c = re.sub(r'(<meta[^>]+property="og:title"[^>]*content=")[^"]*(")', r'\g<1>' + new_title + r'\g<2>', c, flags=re.I)
        c = re.sub(r'(<meta[^>]+name="twitter:title"[^>]*content=")[^"]*(")', r'\g<1>' + new_title + r'\g<2>', c, flags=re.I)
        c = re.sub(r'(<meta[^>]+name="title"[^>]*content=")[^"]*(")', r'\g<1>' + new_title + r'\g<2>', c, flags=re.I)
        st['og'] += 1

    # ---- description ----
    dm = re.search(r'(<meta[^>]+name="description"[^>]*content=")[^"]*(")', c, re.I)
    old_desc = re.search(r'<meta[^>]+name="description"[^>]*content="([^"]*)"', c, re.I)
    old_desc_v = old_desc.group(1).strip() if old_desc else ''
    if has_cjk(old_desc_v) or (old_desc_v and not re.search(r'\bplay\b|\bonline\b', old_desc_v, re.I)):
        if dm:
            c = re.sub(r'(<meta[^>]+name="description"[^>]*content=")[^"]*(")', r'\g<1>' + new_desc + r'\g<2>', c, count=1, flags=re.I)
        else:
            c = re.sub(r'(<title[^>]*>.*?</title>)', r'\1\n    <meta name="description" content="' + new_desc + '">',
                       c, count=1, flags=re.S | re.I)
        st['desc'] += 1
        c = re.sub(r'(<meta[^>]+property="og:description"[^>]*content=")[^"]*(")', r'\g<1>' + new_desc + r'\g<2>', c, flags=re.I)
        c = re.sub(r'(<meta[^>]+name="twitter:description"[^>]*content=")[^"]*(")', r'\g<1>' + new_desc + r'\g<2>', c, flags=re.I)
        st['og'] += 1

    # ---- 独立同步 og/twitter（兜底：即使 title/desc 已英文，只要这些标签仍是中文就替换）----
    def og_sync(tag, value):
        pat = re.compile(r'(<meta[^>]+' + tag + r'[^>]*content=")[^"]*(")', re.I)
        def repl(m):
            return m.group(1) + value + m.group(2) if has_cjk(m.group(0)) else m.group(0)
        return pat.sub(repl, c)
    for tag in ['property="og:title"', 'name="twitter:title"', 'name="title"']:
        c = og_sync(tag, new_title)
    for tag in ['property="og:description"', 'name="twitter:description"']:
        c = og_sync(tag, new_desc)

    # ---- JSON-LD ----
    def ld_repl(m):
        block = m.group(0)
        changed = False
        # FAQPage：重建为英文模板
        if 'FAQPage' in block:
            faq = ('{"@context":"https://schema.org","@type":"FAQPage","mainEntity":['
                   '{"@type":"Question","name":"How do I play %s?",'
                   '"acceptedAnswer":{"@type":"Answer","text":"Open the game, follow the on-screen instructions and start playing instantly. No download or sign-up required."}},'
                   '{"@type":"Question","name":"Is %s free to play?",'
                   '"acceptedAnswer":{"@type":"Answer","text":"Yes, completely free to play in your browser on desktop and mobile."}}]}'
                   % (en_name, en_name))
            return '<script type="application/ld+json">' + faq + '</script>'
        # VideoGame description
        pattern_desc = r'("description":")([^"]*?)(")'
        def dsub(mm):
            nonlocal changed
            if has_cjk(mm.group(2)):
                changed = True
                return mm.group(1) + new_desc.replace('"', '\\"') + mm.group(3)
            return mm.group(0)
        block = re.sub(pattern_desc, dsub, block)
        # VideoGame priceCurrency CNY -> USD
        if 'CNY' in block:
            block = block.replace('CNY', 'USD')
            changed = True
        # Breadcrumb 中文分类名 / 首页
        bread_map = {'首页': 'Home', '动作反应游戏': CAT_BREAD.get('Action', 'Action Games'),
                     '动作游戏': CAT_BREAD.get('Action', 'Action Games'),
                     '街机游戏': CAT_BREAD.get('Arcade', 'Arcade Games'),
                     '经典街机游戏': CAT_BREAD.get('Arcade', 'Arcade Games'),
                     '解谜游戏': CAT_BREAD.get('Puzzle', 'Puzzle Games'),
                     '益智解谜游戏': CAT_BREAD.get('Puzzle', 'Puzzle Games'),
                     '经典益智游戏': CAT_BREAD.get('Puzzle', 'Puzzle Games'),
                     '棋类游戏': CAT_BREAD.get('Board', 'Board Games'),
                     '棋牌策略游戏': 'Board Strategy Games'}
        for zh, en in bread_map.items():
            if zh in block:
                block = block.replace('"' + zh + '"', '"' + en + '"')
                changed = True
        # 剩余中文 name（VideoGame / Breadcrumb 游戏名）-> 英文游戏名
        def nsub(mm):
            nonlocal changed
            if has_cjk(mm.group(2)):
                changed = True
                return mm.group(1) + en_name + mm.group(3)
            return mm.group(0)
        block = re.sub(r'("name":")([^"]*?)(")', nsub, block)
        # FAQ 中文问题
        faq_map = {
            '怎么玩': 'How to play',
            '免费吗': 'Is it free',
            '下载吗': 'Do I need to download',
        }
        for zh, en in faq_map.items():
            if zh in block:
                block = block.replace(zh, en)
                changed = True
        if changed:
            st['ld'] += 1
        return block
    c = re.sub(r'<script[^>]+type="application/ld\+json"[^>]*>.*?</script>', ld_repl, c, flags=re.S | re.I)

    # ---- 顶部静态横幅中文 ----
    for zh, en in STATIC_REPLACEMENTS:
        if zh in c and re.search(r'[\u4e00-\u9fff]', c):
            # 仅替换横幅区域的裸中文文本（不误伤 meta/script）
            pass
    # 安全做法：替换常见中文词组为英文（仅在 body 可见文本中，避免改动 JSON-LD 已处理）
    body_m = re.search(r'<body>.*</body>', c, re.S | re.I)
    if body_m:
        b = body_m.group(0)
        for zh, en in STATIC_REPLACEMENTS:
            b = b.replace(zh, en)
        c = c[:body_m.start()] + b + c[body_m.end():]
        st['static'] = 1

    io.open(path, 'w', encoding='utf-8', newline='').write(c)
    return st

def main():
    only = len(sys.argv) > 1 and sys.argv[1] == 'only'
    files = []
    if only:
        for s in SAMPLE_LIST:
            p = os.path.join(ROOT, s, 'index.html').replace('\\', '/')
            if os.path.exists(p):
                files.append(p)
            else:
                print('  !MISS', s)
    else:
        files = glob.glob(ROOT + r'\games\**\index.html', recursive=True)
        files = [f for f in files if 'node_modules' not in f and '/dist/' not in f and '/assets/' not in f]
    print(f"处理 {len(files)} 个页面")
    total = {'title': 0, 'desc': 0, 'og': 0, 'ld': 0, 'static': 0}
    for f in files:
        try:
            st = process(f)
            for k in total:
                total[k] += st[k]
            print('  OK', os.path.relpath(f, ROOT).replace('\\', '/'), st)
        except Exception as e:
            print('  ERR', os.path.relpath(f, ROOT).replace('\\', '/'), e)
    print('TOTAL', total)

if __name__ == '__main__':
    main()
