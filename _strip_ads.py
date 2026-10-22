# -*- coding: utf-8 -*-
"""AdSense 过审前：移除 body/<head> 中的广告位 ins 块，保留首页 head 验证脚本。
- 游戏页：删除 <!-- adsense --> ... <!-- /adsense --> 整块
- 首页 index.html：删除 <div class="ad-slot">...</div> 容器，保留 head 中的 adsbygoogle.js
幂等：无广告块则跳过。
"""
import re, glob, os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

# 1) 游戏页
game_files = [p for p in glob.glob("games/**/index.html", recursive=True)
              if "adsbygoogle" in open(p, encoding="utf-8").read()]
block_re = re.compile(r"<!--\s*adsense\s*-->.*?<!--\s*/adsense\s*-->\s*", re.S)
g_changed = 0
for p in game_files:
    h = open(p, encoding="utf-8").read()
    n = block_re.sub("", h)
    if n != h:
        # 确保该文件已无 ins 广告位 / 残留 client
        if "adsbygoogle" in n or "ca-pub-" in n:
            print("!! 残留广告代码，跳过:", p)
            continue
        open(p, "w", encoding="utf-8").write(n)
        g_changed += 1
print("游戏页移除广告块:", g_changed)

# 2) 首页
ip = "index.html"
h = open(ip, encoding="utf-8").read()
slot_re = re.compile(r'<div class="ad-slot"[^>]*>.*?</div>\s*', re.S)
h2 = slot_re.sub("", h)
# 保留 head 中的 adsbygoogle.js 验证脚本
open(ip, "w", encoding="utf-8").write(h2)
print("首页 ad-slot 容器:", "已移除" if h2 != h else "未找到")
print("首页 head 验证脚本保留:", "adsbygoogle.js?client=" in h2)
