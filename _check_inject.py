# -*- coding: utf-8 -*-
"""全面检查 36 个目标游戏页：是否有 </body>、注入的 section 是否位于正确位置。"""
import os, re, importlib.util

ROOT = r"D:\PycharmProjects\GameHub"
spec = importlib.util.spec_from_file_location("c", os.path.join(ROOT, "_seo_content.py"))
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)

for key in sorted(m.CONTENT.keys()):
    cat, game = key.split("/")
    p = os.path.join(ROOT, "games", cat, game, "index.html")
    html = open(p, encoding="utf-8").read()
    has_body_end = "</body>" in html
    has_info = "game-info-section" in html
    # 找 section 位置
    idx = html.find('<section class="game-info-section"')
    ok_pos = True
    if idx >= 0:
        prev = html[max(0, idx-200):idx]
        # 前面若是脚本代码（含分号/函数调用痕迹），说明插错位置
        if re.search(r"\);?\s*$|drawBackground|</script>", prev):
            ok_pos = False
    flag = "OK" if (has_body_end and has_info and ok_pos) else ("缺</body>!" if not has_body_end else ("缺content!" if not has_info else "位置异常!"))
    print("%-34s body_end=%s info=%s pos=%s => %s" % (key, has_body_end, has_info, ok_pos, flag))
