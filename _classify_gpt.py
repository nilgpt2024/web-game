# -*- coding: utf-8 -*-
import os, re, glob
from collections import Counter

root = r"D:\PycharmProjects\GameHub"
samples = ["Puzzle/Mind-Meter", "Puzzle/Glyphgate", "Arcade/Timberbound", "Arcade/Artillery"]
cats = Counter()
examples = {}

for f in glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True):
    h = open(f, encoding="utf-8", errors="ignore").read()
    if "gptgames.dev" not in h:
        continue
    # 按行/标签切分，看每个引用所在的上下文标签
    for m in re.finditer(r'gptgames\.dev', h):
        s = max(0, m.start()-120)
        ctx = h[s:m.start()+40].replace("\n", " ")
        # 归类
        if re.search(r'<meta\b', h[max(0,m.start()-200):m.start()]):
            cat = "meta"
        elif 'application/ld+json' in h[max(0,m.start()-400):m.start()] or '"@type"' in h[max(0,m.start()-300):m.start()]:
            cat = "jsonld"
        elif re.search(r'<script\b', h[max(0,m.start()-3000):m.start()]) and '</script>' not in h[max(0,m.start()-300):m.start()]:
            cat = "script-runtime"
        elif re.search(r'<link\b', h[max(0,m.start()-200):m.start()]):
            cat = "link"
        elif re.search(r'(src|href)\s*=\s*["\']', h[max(0,m.start()-100):m.start()]):
            cat = "src/href"
        else:
            cat = "other"
        cats[cat] += 1
        examples.setdefault(cat, ctx)

print("剩余 gptgames.dev 引用上下文分类:")
for c, n in cats.most_common():
    print("  %-16s %d" % (c, n))
    print("      例:", examples[c][-140:])
