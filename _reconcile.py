# -*- coding: utf-8 -*-
import os, re, glob
from collections import Counter

root = r"D:\PycharmProjects\GameHub"
js = open(os.path.join(root, "script.js"), encoding="utf-8", errors="ignore").read()

# 提取 path 并标准化为 games/Cat/Game/ 目录形式
raw_paths = re.findall(r"path:\s*['\"]([^'\"]+)['\"]", js)
def norm(p):
    p = p.split("?")[0]
    p = p.replace("/index.html", "")
    if not p.endswith("/"):
        p = p + "/"
    return p
js_dirs = [norm(p) for p in raw_paths if p.startswith("games/")]

# 实际目录（有 index.html 的）
actual = set()
for f in glob.glob(os.path.join(root, "games", "*", "*", "index.html")):
    rel = f.replace("\\", "/").split(root.replace("\\", "/") + "/")[1]
    actual.add(rel)  # games/Cat/Game/index.html
actual_dirs = set(a.replace("index.html", "") for a in actual)

# 重复
dups = [d for d, c in Counter(js_dirs).items() if c > 1]
# script.js 里有但实际目录不存在（无效链接）
dead = sorted(set(js_dirs) - actual_dirs)
# 实际目录有但 script.js 没列出（首页看不到）
missing = sorted(actual_dirs - set(js_dirs))

print("script.js path 条目:", len(raw_paths), "标准化后:", len(js_dirs))
print("实际游戏目录:", len(actual_dirs))
print("重复 path:", len(dups), dups[:20])
print("无效链接(js有/目录无):", len(dead), dead[:30])
print("未在首页列出(目录有/js无):", len(missing), missing[:30])
