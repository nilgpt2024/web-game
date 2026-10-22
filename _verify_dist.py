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

# 旧 dist 下的具体 js 文件（已从仓库删除，应404）
for u in [
  "https://game.suipce.com/games/Action/Archery-3D/dist/assets/index-BirGT9YU.js",
  "https://game.suipce.com/games/Action/Archery-3D/dist/index.html",
]:
    c, b = get(u)
    print("旧dist文件:", c, u, " 长度:", len(b))

# 旧 dist 目录返回内容标题/特征
c, b = get("https://game.suipce.com/games/Action/Archery-3D/dist/")
print("dist目录状态:", c, " 长度:", len(b))
t = re.search(r"<title>([^<]*)</title>", b) if (re:=__import__('re')) else None
print("  title:", t.group(1) if t else "(无)")
print("  含旧绝对路径/assets:", 'src="/assets' in b or 'href="/assets' in b)
print("  含/dist/资源:", "/dist/assets" in b)

# sitemap 游戏 URL host 检查
c, b = get("https://suipce.com/sitemap.xml")
import re
urls = re.findall(r"<loc>([^<]+)</loc>", b)
hosts = {}
for u in urls:
    h = u.split("/")[2]
    hosts[h] = hosts.get(h,0)+1
print("sitemap host 分布:", hosts)
print("样例游戏URL:", [u for u in urls if "Archery" in u][:2])
