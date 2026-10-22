# -*- coding: utf-8 -*-
"""样板游戏页 i18n 启用：修复 lang-switcher、启用 GameI18n、注入双语 GAME_META、横幅改 data-i18n"""
import io, os, re, json

ROOT = r'D:\PycharmProjects\GameHub'

# 每个样板的中文 SEO title/desc（英文版从当前页面读取）
ZH_META = {
    'Breakout': ('打砖块游戏在线玩 - 免费网页版 | AIGameHub',
                 '免费在线玩经典打砖块游戏，移动挡板反弹小球击碎全部砖块。无需下载注册，手机电脑浏览器打开即玩。'),
    'Snake': ('贪吃蛇游戏在线玩 - 免费网页版 | AIGameHub',
              '免费在线玩经典贪吃蛇游戏，吃食物变长。无需下载注册，手机电脑浏览器打开即玩。'),
    'Tetris': ('俄罗斯方块在线玩 - 免费网页版 | AIGameHub',
               '免费在线玩经典俄罗斯方块，消除整行得分。无需下载注册，手机电脑浏览器打开即玩。'),
    '2048': ('2048在线玩 - 免费数字合并游戏 | AIGameHub',
             '免费在线玩2048数字合并游戏，合并相同数字挑战2048。无需下载注册，手机电脑浏览器打开即玩。'),
    'Minesweeper': ('扫雷在线玩 - 免费网页版 | AIGameHub',
                    '免费在线玩经典扫雷游戏，揭开所有安全格子。无需下载注册，手机电脑浏览器打开即玩。'),
    'Sudoku': ('数独在线玩 - 免费网页版 | AIGameHub',
               '免费在线玩数独逻辑游戏，填满所有格子。无需下载注册，手机电脑浏览器打开即玩。'),
    'Chess': ('国际象棋在线玩 - 免费网页版 | AIGameHub',
              '免费在线玩国际象棋，与AI对弈。无需下载注册，手机电脑浏览器打开即玩。'),
    'Flappy-Bird': ('Flappy Bird在线玩 - 免费网页版 | AIGameHub',
                    '免费在线玩Flappy Bird，点击或按空格控制小鸟飞翔。无需下载注册，手机电脑浏览器打开即玩。'),
    'Pac-Man': ('吃豆人在线玩 - 免费街机游戏 | AIGameHub',
                '免费在线玩经典吃豆人街机游戏，收集豆子躲避幽灵。无需下载注册，手机电脑浏览器打开即玩。'),
    'Magic-Carpet-Wizard': ('魔毯巫师在线玩 - 免费冒险游戏 | AIGameHub',
                            '免费在线玩魔毯巫师冒险游戏，方向键或鼠标控制角色。无需下载注册，手机电脑浏览器打开即玩。'),
}

SAMPLES = {
    'Breakout': 'games/Action/Breakout', 'Snake': 'games/Arcade/Snake',
    'Tetris': 'games/Arcade/Tetris', '2048': 'games/Puzzle/2048',
    'Minesweeper': 'games/Puzzle/Minesweeper', 'Sudoku': 'games/Puzzle/Sudoku',
    'Chess': 'games/Board/Chess', 'Flappy-Bird': 'games/Action/Flappy-Bird',
    'Pac-Man': 'games/Arcade/Pac-Man', 'Magic-Carpet-Wizard': 'games/Arcade/Magic-Carpet-Wizard',
}

for slug, rel in SAMPLES.items():
    p = os.path.join(ROOT, rel, 'index.html').replace('\\', '/')
    c = io.open(p, encoding='utf-8', errors='ignore').read()
    changed = []

    # 1) 修复压缩导致的 class 粘连：lang-btnactive -> lang-btn active（否则 .lang-btn 选择器匹配不到）
    if 'class="lang-btnactive"' in c:
        c = c.replace('class="lang-btnactive"', 'class="lang-btn active"')
        changed.append('fix-lang-btn-class')
    # 2) 修复 lang-switcher：第一个(🇨🇳)按钮 data-lang -> zh-CN，lang-text -> 中
    #    匹配带 🇨🇳 的 lang-btn
    m = re.search(r'<button class="lang-btn[^"]*"data-lang="([^"]*)"[^>]*><span class="lang-flag">🇨🇳</span><span class="lang-text">([^<]*)</span></button>', c)
    if m:
        old = m.group(0)
        if m.group(1) != 'zh-CN':
            newb = old.replace('data-lang="' + m.group(1) + '"', 'data-lang="zh-CN"')
            newb = re.sub(r'<span class="lang-text">[^<]*</span>', '<span class="lang-text">中</span>', newb)
            newb = re.sub(r'title="[^"]*"', 'title="中文"', newb)
            c = c.replace(old, newb)
            changed.append('lang-switcher-zh')
    # 确保 EN 按钮 lang-text
    m2 = re.search(r'(<button class="lang-btn[^"]*"data-lang="en"[^>]*><span class="lang-flag">🇺🇸</span><span class="lang-text">)([^<]*)(</span></button>)', c)
    if m2 and m2.group(2) != 'EN':
        c = c[:m2.start(2)] + 'EN' + c[m2.end(2):]
        changed.append('lang-switcher-en')

    # 2) 启用 GameI18n：把注释的初始化改为启用（兼容无空格压缩格式）
    init_pat = re.compile(r'<script>//const\s*gameI18n\s*=\s*new\s*GameI18n\(([^)]*)\)\s*;\s*gameI18n\.init\(\)\s*;\s*</script>', re.S)
    def init_repl(m):
        args = m.group(1).strip()
        if not args:
            args = "{gameName:'" + slug + "'}"
        return "<script>const gameI18n=new GameI18n(" + args + ");gameI18n.init();</script>"
    if init_pat.search(c):
        c = init_pat.sub(init_repl, c)
        changed.append('enable-i18n')

    # 3) 注入 GAME_META（中英双语），放在 game-i18n.js 之前
    if 'window.GAME_META' not in c:
        en_title = re.search(r'<title[^>]*>(.*?)</title>', c, re.S).group(1).strip()
        en_desc = re.search(r'<meta[^>]+name="description"[^>]*content="([^"]*)"', c).group(1)
        zh_title, zh_desc = ZH_META[slug]
        meta_json = ('window.GAME_META={"en":{"title":' + json.dumps(en_title, ensure_ascii=False) +
                     ',"description":' + json.dumps(en_desc, ensure_ascii=False) +
                     '},"zh-CN":{"title":' + json.dumps(zh_title, ensure_ascii=False) +
                     ',"description":' + json.dumps(zh_desc, ensure_ascii=False) + '}};')
        inject = '<script>' + meta_json + '</script>'
        # 插到 game-i18n.js script 之前
        if 'game-i18n.js' in c:
            c = c.replace('<script src="../../../game-i18n.js"></script>',
                          inject + '<script src="../../../game-i18n.js"></script>', 1)
        changed.append('inject-GAME_META')

    # 4) 顶部横幅改 data-i18n（specific.{slug}.banner）
    #    当前横幅含英文如 <span>Classic Brick Breaker</span> 在顶部固定横幅内
    #    仅替换顶部横幅区的第一个文本 span（break 前面那块，包含 More Games 的 div 内）
    #    通过匹配 '<span>Classic' 或其他英文描述，替换为 data-i18n
    banner_span = re.search(r'(<div style="position:fixed;top:0.*?</div>)', c, re.S)
    if banner_span:
        b = banner_span.group(0)
        b2 = re.sub(r'<span>((?:Classic|Classic )[^<]*)</span>',
                    lambda m: '<span data-i18n="specific.' + slug + '.banner"></span>', b, count=1)
        if b2 != b:
            c = c.replace(b, b2)
            changed.append('banner-data-i18n')

    io.open(p, 'w', encoding='utf-8', newline='').write(c)
    print('OK', slug, '->', changed)
