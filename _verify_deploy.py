# -*- coding: utf-8 -*-
import urllib.request, ssl, os, re
proxy = "http://127.0.0.1:7897"
opener = urllib.request.build_opener(urllib.request.ProxyHandler({"http":proxy,"https":proxy}),
                                     urllib.request.HTTPSHandler(context=ssl._create_unverified_context()))
opener.addheaders = [("User-Agent","Mozilla/5.0")]
def code(url):
    try:
        r = opener.open(url, timeout=25)
        body = r.read().decode("utf-8", "ignore")
        return r.status, body
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return "ERR:"+type(e).__name__, ""

checks = [
    ("首页", "https://suipce.com/"),
    ("sitemap", "https://suipce.com/sitemap.xml"),
    ("Archery-3D 根", "https://game.suipce.com/games/Action/Archery-3D/"),
    ("Archery js", "https://game.suipce.com/games/Action/Archery-3D/assets/index-BirGT9YU.js"),
    ("Odyssey 根", "https://game.suipce.com/games/Action/Odyssey-Voyage/"),
    ("Odyssey js", "https://game.suipce.com/games/Action/Odyssey-Voyage/assets/index-DvW4ApxB.js"),
    ("Space-Shooter 根", "https://game.suipce.com/games/Action/Space-Shooter-3D/"),
    ("Cialdini 根", "https://game.suipce.com/games/Puzzle/Cialdini-3D/"),
    ("Ink 根", "https://game.suipce.com/games/Action/Ink-Raiders/"),
    ("纳粹僵尸", "https://game.suipce.com/games/FPS/Nazi-Zombies-Portable/"),
    ("Doodle Jump", "https://game.suipce.com/games/Arcade/Doodle-Jump-Game/"),
    ("Typing Game", "https://game.suipce.com/games/Typing/Typing-Game/"),
    ("旧 dist(应404)", "https://game.suipce.com/games/Action/Archery-3D/dist/"),
]
for name, url in checks:
    c, body = code(url)
    extra = ""
    if name == "sitemap" and isinstance(c,int):
        extra = " dist残留:%d 总URL:%d" % (body.count("/dist/"), body.count("<url>"))
    if name in ("Archery-3D 根","Odyssey 根") and isinstance(c,int):
        extra = " 引用gpt:%s ./assets:%s" % (
            "gptgames.dev" in body,
            "./assets/" in body)
    print("%-18s %s  %s%s" % (name, c, url, extra))
