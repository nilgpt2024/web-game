# -*- coding: utf-8 -*-
import os, re
from collections import Counter
from pathlib import Path

root = Path(r"D:\PycharmProjects\GameHub")
js = open(root / "script.js", encoding="utf-8", errors="ignore").read()

raw_paths = re.findall(r"path:\s*['\"]([^'\"]+)['\"]", js)
def norm(p):
    p = p.split("?")[0].replace("/index.html", "")
    return p if p.endswith("/") else p + "/"
js_dirs = [norm(p) for p in raw_paths if p.startswith("games/")]

# 递归匹配所有 index.html（含深层目录）
actual = {}
for f in root.glob("games/**/index.html"):
    rel = f.relative_to(root).as_posix()
    d = rel.replace("index.html", "")
    actual[d] = f.stat().st_size

js_set = set(js_dirs)
actual_set = set(actual)

dead = sorted(js_set - actual_set)
missing = sorted(actual_set - js_set)

print("script.js 条目:", len(js_dirs), "去重:", len(js_set))
print("实际 index.html(递归):", len(actual_set))
print("真正无效链接:", len(dead))
for d in dead:
    print("   ", d)
print("首页未列出:", len(missing))
for d in missing:
    print("   ", d, actual[d + "index.html"] if (d + "index.html") in actual else "")
