# -*- coding: utf-8 -*-
import urllib.request, ssl, time

proxy = urllib.request.ProxyHandler({"http": "http://127.0.0.1:7897", "https": "http://127.0.0.1:7897"})
opener = urllib.request.build_opener(proxy)
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
opener.addheaders = [("User-Agent", "Mozilla/5.0")]

def get(url):
    for i in range(3):
        try:
            return opener.open(url, timeout=40).read().decode("utf-8", "ignore")
        except Exception as e:
            last = e
            time.sleep(2)
    raise last

checks = [
    ("https://suipce.com/about.html", [
        ("游戏来源与开源许可证", "开源许可证章节", False),
        ("MIT、Apache-2.0、GPL、CC0", "许可证类型", False),
        ("500+ 款", "500+ 游戏", False),
        ("10 大分类", "10 分类", False),
        ("不希望被收录", "下架联系说明", False),
    ]),
    ("https://suipce.com/", [
        ('lang="zh-CN"', "首页 lang zh-CN", False),
        ("500+ 打开即玩", "标题 500+", False),
        ("adsbygoogle.js?client=", "head 验证脚本保留", False),
        ('class="ad-slot"', "首页广告位(应不存在)", True),
    ]),
    ("https://suipce.com/games/Action/cliffwalkers/", [
        ("adsbygoogle", "游戏页广告(应不存在)", True),
        ("data-ad-slot", "广告位(应不存在)", True),
    ]),
]

for url, items in checks:
    try:
        h = get(url)
    except Exception as e:
        print(url, "FETCH ERROR:", e)
        continue
    print("====", url)
    for needle, label, should_absent in items:
        present = needle in h
        if should_absent:
            print("  [%s] %s" % ("OK 已移除" if not present else "!! 仍存在", label))
        else:
            print("  [%s] %s" % ("OK" if present else "!! 缺失", label))
