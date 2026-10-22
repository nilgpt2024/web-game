# -*- coding: utf-8 -*-
"""精确检查：section 是否被插入到未闭合的 <script> 内部。"""
import os, importlib.util

ROOT = r"D:\PycharmProjects\GameHub"
spec = importlib.util.spec_from_file_location("c", os.path.join(ROOT, "_seo_content.py"))
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)

for key in sorted(m.CONTENT.keys()):
    cat, game = key.split("/")
    p = os.path.join(ROOT, "games", cat, game, "index.html")
    html = open(p, encoding="utf-8").read()
    idx = html.find('<section class="game-info-section"')
    head = html[:idx] if idx >= 0 else html
    open_scripts = head.count("<script")
    close_scripts = head.count("</script")
    # 也检查 style
    in_script = open_scripts > close_scripts
    has_body_end = "</body>" in html
    status = []
    if not has_body_end:
        status.append("缺</body>")
    if idx < 0:
        status.append("无content")
    if in_script:
        status.append("IN-SCRIPT!!")
    # section 在文件末尾但文件以 </body> 结尾 = 正常
    print("%-34s script=%d/%d %s" % (key, open_scripts, close_scripts, " | ".join(status) if status else "OK"))
