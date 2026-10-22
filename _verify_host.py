# -*- coding: utf-8 -*-
import urllib.request, ssl
proxy = "http://127.0.0.1:7897"
opener = urllib.request.build_opener(urllib.request.ProxyHandler({"http":proxy,"https":proxy}),
                                     urllib.request.HTTPSHandler(context=ssl._create_unverified_context()))
opener.addheaders = [("User-Agent","Mozilla/5.0")]
def get(url):
    try:
        r = opener.open(url, timeout=25)
        return r.status, r.read().decode("utf-8","ignore")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8","ignore")
    except Exception as e:
        return "ERR:"+type(e).__name__, ""

for u in [
  "https://suipce.com/games/Action/Archery-3D/",
  "https://suipce.com/games/Action/Archery-3D/assets/index-BirGT9YU.js",
  "https://suipce.com/games/Action/Odyssey-Voyage/",
  "https://game.suipce.com/",
]:
    c, b = get(u)
    import re
    t = re.search(r"<title>([^<]*)</title>", b)
    is_js = u.endswith(".js")
    print(c, len(b), ("JS:"+b[:20]) if is_js else ("title:"+(t.group(1) if t else "?")), u)
