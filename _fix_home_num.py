# -*- coding: utf-8 -*-
import re
h = open('index.html', encoding='utf-8').read()
orig = h

# total 占位统一改为真实可玩数 508
h = h.replace('data-count="total">496<', 'data-count="total">508<')
h = h.replace('data-count="cat:all">496<', 'data-count="cat:all">508<')

# 分类静态数字（JS 动态计数的 no-JS fallback，按真实目录更新）
cat_map = {
    'Puzzle': 82, 'Action': 123, 'Arcade': 130, 'Board': 32,
    'Memory': 4, 'Typing': 8, 'Casual': 117,
}
for cat, num in cat_map.items():
    h = re.sub(r'(data-count="cat:%s">)\d+(<)' % cat, r'\g<1>%d\g<2>' % num, h)

# 版权年份
h = h.replace('&copy; 2025 AIGameHub', '&copy; 2026 AIGameHub')

open('index.html', 'w', encoding='utf-8').write(h)
print('changed:', h != orig)
print('剩余 496:', h.count('496'))
print('total 508 占位:', h.count('data-count="total">508<'))
for cat, num in cat_map.items():
    print(cat, '->', ('data-count="cat:%s">%d<' % (cat, num)) in h)
