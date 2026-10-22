# -*- coding: utf-8 -*-
import os, re, glob, sys
root = r"D:\PycharmProjects\GameHub"
apply = "--apply" in sys.argv
pat = re.compile(r'"(author|publisher)"\s*:\s*\{[^{}]*gptgames\.dev[^{}]*\}')
n = 0
for f in glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True):
    h = open(f, encoding="utf-8", errors="ignore").read()
    if "gptgames.dev" not in h:
        continue
    def repl(m):
        global n
        n += 1
        return '"%s":{"@type":"Organization","name":"AIGameHub","url":"https://suipce.com/"}' % m.group(1)
    h2 = pat.sub(repl, h)
    if h2 != h and apply:
        open(f, "w", encoding="utf-8").write(h2)
print("模式:", "APPLY" if apply else "DRY-RUN", " 替换 author/publisher 数:", n)
