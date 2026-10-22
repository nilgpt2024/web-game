# -*- coding: utf-8 -*-
import re
h = open('index.html', encoding='utf-8').read()
lm = re.search(r'<html[^>]*lang="([^"]+)"', h)
print('lang:', lm.group(1) if lm else None)
for m in re.finditer(r'<section[^>]*(?:id|class)="([^"]+)"', h):
    print('SECTION:', m.group(1))
for tag in ['h1', 'h2', 'h3']:
    for m in re.finditer(r'<' + tag + r'[^>]*>(.*?)</' + tag + r'>', h, re.S):
        t = re.sub(r'<[^>]+>', '', m.group(1)).strip()
        if t:
            print(tag.upper() + ':', t[:70])
ps = [re.sub(r'<[^>]+>', '', m.group(1)).strip() for m in re.finditer(r'<p[^>]*>(.*?)</p>', h, re.S)]
ps = [p for p in ps if len(p) > 20]
print('--- 长段落数:', len(ps))
for p in ps[:10]:
    print(' P:', p[:100])
