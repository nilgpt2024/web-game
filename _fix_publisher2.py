# -*- coding: utf-8 -*-
import os, re, glob
root = r"D:\PycharmProjects\GameHub"
pat = re.compile(r'\{\s*"@type"\s*:\s*"Organization"\s*,\s*"name"\s*:\s*"gptgames\.dev"\s*,\s*"url"\s*:\s*"[^"]*"\s*\}')
repl = '{"@type":"Organization","name":"AIGameHub","url":"https://suipce.com/"}'
n = 0
for f in glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True):
    h = open(f, encoding="utf-8", errors="ignore").read()
    if "gptgames.dev" not in h:
        continue
    h2, c = pat.subn(repl, h)
    if c:
        open(f, "w", encoding="utf-8").write(h2)
        n += c
        print("fixed:", f.replace("\\", "/").split("games/")[1], c)
print("total:", n)
