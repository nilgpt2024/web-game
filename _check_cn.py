# -*- coding: utf-8 -*-
import io, re, os
ROOT = r'D:\PycharmProjects\GameHub'
samples = [
    'games/Action/Breakout', 'games/Arcade/Snake', 'games/Arcade/Tetris',
    'games/Puzzle/2048', 'games/Puzzle/Minesweeper', 'games/Puzzle/Sudoku',
    'games/Board/Chess', 'games/Action/Flappy-Bird', 'games/Arcade/Pac-Man',
    'games/Arcade/Magic-Carpet-Wizard',
]
out = io.open(os.path.join(ROOT, '_cn_report.txt'), 'w', encoding='utf-8')
ok = True
for s in samples:
    p = os.path.join(ROOT, s, 'index.html')
    c = io.open(p, encoding='utf-8', errors='ignore').read()
    full_cn = set(re.findall(r'[\u4e00-\u9fff]+', c))
    title = re.search(r'<title[^>]*>(.*?)</title>', c, re.S)
    struct_ok = c.count('<html') >= 1 and c.count('</html>') == 1 and c.count('</body>') == 1 and c.count('</head>') == 1
    out.write('### %s | 剩余中文串=%d | 结构=%s | title=%s\n' % (s.split('/')[2], len(full_cn), 'OK' if struct_ok else 'BROKEN', (title.group(1) if title else 'NONE').strip()))
    for x in sorted(full_cn, key=len, reverse=True):
        out.write('   ' + x + '\n')
        ok = False
out.close()
print('ALL_CLEAN' if ok else 'HAS_CN')
