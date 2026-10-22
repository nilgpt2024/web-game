# -*- coding: utf-8 -*-
import subprocess, re, shutil, os
profile = r"D:\PycharmProjects\GameHub\_cdptmp"
shutil.rmtree(profile, ignore_errors=True)
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
p = subprocess.run([
    chrome, "--headless=new", "--disable-gpu", "--no-sandbox",
    "--user-data-dir=" + profile, "--virtual-time-budget=15000",
    "--dump-dom", "https://suipce.com/"
], capture_output=True, timeout=90)
dom = p.stdout.decode("utf-8", errors="ignore")
links = re.findall(r'<a[^>]+href="([^"]+)"', dom)
games = [l for l in links if "games/" in l]
with_idx = [l for l in games if "index.html" in l]
no_trail = [l for l in games if not l.endswith("/") and "index.html" not in l]
print("DOM 长度:", len(dom), "总链接:", len(links), "游戏链接:", len(games))
print("带 index.html 的:", with_idx[:10])
print("无尾斜杠非index:", no_trail[:10])
print("样本:", games[:10])
shutil.rmtree(profile, ignore_errors=True)
