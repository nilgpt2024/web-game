# -*- coding: utf-8 -*-
import urllib.request, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=30, context=ctx).read().decode("utf-8", "ignore")

checks = [
    ("https://suipce.com/privacy-policy.html", [
        ("广告 Cookie（Google AdSense）", "AdSense 广告 Cookie 条款"),
        ("DART Cookie", "DART Cookie"),
        ("google.com/settings/ads", "退出个性化广告链接"),
        ("aboutads.info", "aboutads 链接"),
        ("2026 年 10 月 19 日", "更新日期"),
    ]),
    ("https://suipce.com/about.html", [
        ("游戏来源与开源许可证", "开源许可证章节"),
        ("MIT、Apache-2.0、GPL、CC0", "许可证类型"),
        ("500+ 款", "500+ 游戏"),
        ("10 大分类", "10 分类"),
        ("不希望被收录", "下架联系说明"),
    ]),
    ("https://suipce.com/", [
        ('lang="zh-CN"', "首页 lang zh-CN"),
        ("500+ 打开即玩", "标题 500+"),
        ("adsbygoogle.js?client=", "head 验证脚本保留"),
        ('class="ad-slot"', "首页广告位(应不存在)"),
    ]),
    ("https://suipce.com/games/Action/cliffwalkers/", [
        ("adsbygoogle", "游戏页广告(应不存在)"),
        ("data-ad-slot", "广告位(应不存在)"),
    ]),
]

for url, items in checks:
    try:
        h = get(url)
    except Exception as e:
        print(url, "FETCH ERROR:", e)
        continue
    print("== " * 4, url)
    for needle, label in items:
        present = needle in h
        if label.endswith("(应不存在)"):
            ok = "OK 已移除" if not present else "!! 仍存在"
        else:
            ok = "OK" if present else "!! 缺失"
        print("  [%s] %s" % (ok, label))
