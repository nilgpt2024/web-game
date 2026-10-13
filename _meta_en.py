# -*- coding: utf-8 -*-
"""英文长尾 meta 补强
目标：无中文支持的游戏入口页（页面内容为英文），
  - title 不含 play/online 时，升级为 "Play {Name} Online - Free {Category} Game | AIGameHub"
  - description 缺失/含中文/不含 play+online 时，生成英文长尾描述
  - 同步 og:title / og:description / twitter:title / twitter:description（若与旧值一致）
"""
import glob, io, os, re, json, html

root = r'D:\PycharmProjects\GameHub'

# 1) 解析 gamesData 得到 {path: {name, desc}}
sc = io.open(root + r'\script.js', encoding='utf-8').read()
start = sc.index('const gamesData ={'); i = start; depth = 0
while i < len(sc):
    if sc[i] == '{': depth += 1
    elif sc[i] == '}':
        depth -= 1
        if depth == 0: i += 1; break
    i += 1
block = sc[start:i]
GD = {}
for ln in block.split('\n'):
    m = re.search(r"\{\s*name:\s*'([^']*)'.*?path:\s*'games/([^']*)'[^}]*\}", ln)
    if m:
        GD['games/' + m.group(2)] = m.group(1)

# 2) 分类英文名
CAT_EN = {
    'Puzzle': 'Puzzle', 'Action': 'Action', 'Arcade': 'Arcade',
    'Board': 'Board', 'Memory': 'Memory', 'Typing': 'Typing',
    'Casual': 'Casual', 'Adventure': 'Adventure', 'Astra': 'AI Art',
}

def slug_to_title(slug):
    """目录名 -> 标题风格：MonkeyType->Monkey Type, 2048->2048, go->Go"""
    if not slug: return ''
    s = re.sub(r'([a-z])([A-Z])', r'\1 \2', slug)
    s = re.sub(r'[-_]+', ' ', s).strip()
    return ' '.join(w.capitalize() if w.islower() else w for w in s.split())

def extract_en_name(title, slug):
    """从现有 title 提取英文游戏名（首段连续英文词），失败用 slug"""
    m = re.match(r'\s*([A-Za-z0-9][A-Za-z0-9 &\'.\-:]{1,60}?)\s*(?:\||—|-|–|在线|免费|游戏|$)', title)
    if m:
        cand = m.group(1).strip().rstrip('|— -–')
        # 过滤掉纯模板词
        if cand and not re.search(r'^(Play|Free|Online|Game|AIGameHub)$', cand, re.I):
            return cand
    return slug_to_title(slug)

def article_for(cat_en):
    """元音开头用 an，否则 a"""
    return 'an' if cat_en[0].lower() in 'aeiou' else 'a'

# 3) 遍历目标页
root_dir = root
files = glob.glob(root_dir + r'\games\**\index.html', recursive=True)

def is_game_entry(p):
    rel = os.path.relpath(p, root_dir).replace('\\','/')
    parts = rel.split('/')
    if len(parts) != 4: return False
    if any(x in rel for x in ['node_modules','/dist/','/assets/','playwright']): return False
    if parts[2] in ('assets','dist','node_modules','ui','dashboard'): return False
    return True

def has_cjk(s): return bool(re.search(r'[\u4e00-\u9fff]', s))

# 无中文支持的页面（英文内容页）
targets = []
for p in files:
    if not is_game_entry(p): continue
    c = io.open(p, encoding='utf-8', errors='ignore').read()
    has_cn_support = ('game-i18n.js' in c) or ('data-i18n' in c) or ('<html lang="zh' in c)
    if not has_cn_support:
        targets.append(p)
print("目标页面数:", len(targets))

stats = {'title_upgraded': 0, 'title_kept': 0, 'desc_upgraded': 0, 'desc_kept': 0, 'errors': []}

for p in targets:
    try:
        c = io.open(p, encoding='utf-8', errors='ignore').read()
        rel = os.path.relpath(p, root_dir).replace('\\','/')
        parts = rel.split('/')
        cat = parts[1]; slug = parts[2]
        gd_name = GD.get(rel)

        # --- title ---
        tm = re.search(r'<title[^>]*>(.*?)</title>', c, re.S | re.I)
        old_title = tm.group(1).strip() if tm else ''
        need_title = (not old_title) or (not re.search(r'\bplay\b|\bonline\b', old_title, re.I))
        if need_title:
            en_name = extract_en_name(old_title, slug)
            cat_en = CAT_EN.get(cat, 'Game')
            new_title = f"Play {en_name} Online - Free {cat_en} Game | AIGameHub"
            new_title = new_title[:90]
            # 替换 title
            if tm:
                c = c[:tm.start()] + '<title>' + new_title + '</title>' + c[tm.end():]
            else:
                c = re.sub(r'(<meta charset="[^"]*"\s*/?>)', r'\1<title>' + new_title + '</title>', c, count=1, flags=re.I)
            stats['title_upgraded'] += 1
            # 同步 og:title / twitter:title（若内容近似旧 title）
            old_t_esc = re.escape(old_title)
            c = re.sub(r'(<meta[^>]+property="og:title"[^>]+content=")[^"]*(")', r'\g<1>' + new_title + r'\g<2>', c, flags=re.I)
            c = re.sub(r'(<meta[^>]+name="twitter:title"[^>]+content=")[^"]*(")', r'\g<1>' + new_title + r'\g<2>', c, flags=re.I)
        else:
            stats['title_kept'] += 1

        # --- description ---
        dm = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]*)"', c, re.I)
        old_desc = dm.group(1).strip() if dm else ''
        need_desc = (not old_desc) or has_cjk(old_desc) or (not re.search(r'\bplay\b|\bonline\b', old_desc, re.I))
        if need_desc:
            en_name = extract_en_name(old_title, slug)
            cat_en = CAT_EN.get(cat, 'Game')
            art = article_for(cat_en)
            new_desc = (f"Play {en_name} online for free — {art} {cat_en.lower()} game that runs instantly in your "
                        f"browser. No download, no sign-up. Works on desktop and mobile. Try it now!")
            new_desc = new_desc[:155]
            # 仅替换 content="..." 内的描述文本，保留原有标签收尾，避免多出 >
            dm_re = re.compile(r'(<meta[^>]+name="description"[^>]+content=")[^"]*(")', re.I)
            dm2 = dm_re.search(c)
            if dm2:
                c = dm_re.sub(r'\g<1>' + new_desc + r'\g<2>', c, count=1)
            else:
                c = re.sub(r'(<title[^>]*>.*?</title>)', r'\1\n    <meta name="description" content="' + new_desc + '">', c, count=1, flags=re.S | re.I)
            # 同步 og:description / twitter:description
            c = re.sub(r'(<meta[^>]+property="og:description"[^>]+content=")[^"]*(")', r'\g<1>' + new_desc + r'\g<2>', c, flags=re.I)
            c = re.sub(r'(<meta[^>]+name="twitter:description"[^>]+content=")[^"]*(")', r'\g<1>' + new_desc + r'\g<2>', c, flags=re.I)
            stats['desc_upgraded'] += 1
        else:
            stats['desc_kept'] += 1

        io.open(p, 'w', encoding='utf-8', newline='').write(c)
    except Exception as e:
        stats['errors'].append((os.path.relpath(p, root_dir).replace('\\','/'), str(e)))

print(stats)
for e in stats['errors'][:15]:
    print("  ERR", e)
