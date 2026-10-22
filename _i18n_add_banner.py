# -*- coding: utf-8 -*-
"""给 game-i18n.js 的 GAME_TRANSLATIONS 各游戏 specific 块补 banner 字段（中英）——不丢失任何区域"""
import io, re, os

ROOT = r'D:\PycharmProjects\GameHub'
p = os.path.join(ROOT, 'game-i18n.js')
c = io.open(p, encoding='utf-8', errors='ignore').read()

BANNER_ZH = {
    'Breakout': '经典打砖块游戏', 'Snake': '经典贪吃蛇游戏', 'Tetris': '经典俄罗斯方块',
    '2048': '经典益智游戏', 'Minesweeper': '经典扫雷游戏', 'Sudoku': '经典数独游戏',
    'Chess': '经典国际象棋', 'Flappy-Bird': '经典小鸟飞行游戏', 'Pac-Man': '经典吃豆人游戏',
    'Magic-Carpet-Wizard': '经典街机游戏',
}
BANNER_EN = {
    'Breakout': 'Classic Brick Breaker', 'Snake': 'Classic Snake Game', 'Tetris': 'Classic Tetris',
    '2048': 'Classic Puzzle Game', 'Minesweeper': 'Classic Minesweeper', 'Sudoku': 'Classic Sudoku',
    'Chess': 'Classic Chess', 'Flappy-Bird': 'Classic Flappy Bird', 'Pac-Man': 'Classic Pac-Man',
    'Magic-Carpet-Wizard': 'Classic Arcade Game',
}

def add_banner_in(part, g, banner):
    pat = re.compile(r"('" + re.escape(g) + r"':\s*\{)")
    m = pat.search(part)
    if not m:
        return part, False
    after = part[m.end():]
    nxt = re.match(r"\s*([A-Za-z]+)\s*:", after)
    if nxt and nxt.group(1) == 'banner':
        return part, False
    new = pat.sub(r"\1\n                banner: '" + banner + "',", part, count=1)
    return new, new != part

# head 到 en 区域之前（含 zh-CN），tail 从 en 区域起（含 en）
en_pos = c.index("'en': {")
head, tail = c[:en_pos], c[en_pos:]
added = []
for g in BANNER_ZH:
    head, zh_changed = add_banner_in(head, g, BANNER_ZH[g])
    tail, en_changed = add_banner_in(tail, g, BANNER_EN[g])
    if zh_changed:
        added.append(g + ':zh')
    if en_changed:
        added.append(g + ':en')

io.open(p, 'w', encoding='utf-8', newline='').write(head + tail)
print('added:', added)
print('zh-CN present:', "'zh-CN': {" in (head + tail))
print('en present:', "'en': {" in (head + tail))
