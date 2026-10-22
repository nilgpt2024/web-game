# -*- coding: utf-8 -*-
"""10 个样板游戏页 body 中文 -> 英文 精确替换（针对顶部横幅与游戏内文案）"""
import io, os

ROOT = r'D:\PycharmProjects\GameHub'

MAP = {
    'Breakout': {'经典打砖块游戏': 'Classic Brick Breaker'},
    'Snake': {'经典贪吃蛇游戏': 'Classic Snake Game', '经典街机游戏': 'Classic Arcade Game'},
    'Tetris': {'经典俄罗斯方块': 'Classic Tetris', '消除整行得分': 'Clear full lines to score', '经典街机游戏': 'Classic Arcade Game'},
    '2048': {
        '使用方向键合并相同数字': 'Use arrow keys to merge tiles',
        '浏览器即开即玩': 'Play instantly in your browser',
        '经典益智游戏': 'Classic Puzzle Game',
        '达到': 'Reach',
        '益智解谜游戏': 'Classic Puzzle Game',
        '网页版': 'web version',
        '在线玩': 'play online',
    },
    'Minesweeper': {'经典扫雷游戏': 'Classic Minesweeper', '益智解谜游戏': 'Classic Puzzle Game'},
    'Sudoku': {'经典数独游戏': 'Classic Sudoku', '益智解谜游戏': 'Classic Puzzle Game'},
    'Chess': {'经典国际象棋': 'Classic Chess', '棋牌策略游戏': 'Board Strategy Game', '国际象棋': 'Chess'},
    'Flappy-Bird': {'经典小鸟飞行游戏': 'Classic Flappy Bird'},
    'Pac-Man': {'经典吃豆人游戏': 'Classic Pac-Man', '经典街机游戏': 'Classic Arcade Game'},
    'Magic-Carpet-Wizard': {
        '魔毯巫师': 'Magic Carpet Wizard',
        '魔法飞毯冒险': 'Magic Carpet Adventure',
        '中文玩法引导': 'How to Play',
        '无需阅读英文': 'No reading required',
        '纯图形操作': 'purely visual controls',
        '方向键或鼠标控制角色': 'Use arrow keys or mouse to move',
        '空格或点击触发主操作': 'Press Space or click to perform the main action',
        '在有限时间内争取更高分数': 'Score as high as you can within the time limit',
        '查看': 'View', '关闭': 'Close', '返回': 'Back', '生成': 'Generated', '物体': 'object',
        '中文玩法': 'How to Play',
        '经典街机游戏': 'Classic Arcade Game',
    },
}

samples = {
    'Breakout': 'games/Action/Breakout', 'Snake': 'games/Arcade/Snake',
    'Tetris': 'games/Arcade/Tetris', '2048': 'games/Puzzle/2048',
    'Minesweeper': 'games/Puzzle/Minesweeper', 'Sudoku': 'games/Puzzle/Sudoku',
    'Chess': 'games/Board/Chess', 'Flappy-Bird': 'games/Action/Flappy-Bird',
    'Pac-Man': 'games/Arcade/Pac-Man', 'Magic-Carpet-Wizard': 'games/Arcade/Magic-Carpet-Wizard',
}

for slug, rel in samples.items():
    p = os.path.join(ROOT, rel, 'index.html').replace('\\', '/')
    c = io.open(p, encoding='utf-8', errors='ignore').read()
    body_i = c.index('<body>')
    head, body = c[:body_i], c[body_i:]
    n = 0
    for zh, en in MAP.get(slug, {}).items():
        if zh in body:
            body = body.replace(zh, en)
            n += 1
    io.open(p, 'w', encoding='utf-8', newline='').write(head + body)
    print('OK', slug, 'replaced keys =', n)
