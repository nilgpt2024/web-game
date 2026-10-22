# -*- coding: utf-8 -*-
import os, re, glob, sys

root = r"D:\PycharmProjects\GameHub"
apply = "--apply" in sys.argv
files = list(glob.glob(os.path.join(root, "games", "**", "index.html"), recursive=True))

meta_re = re.compile(r'<meta\b[^>]*gptgames\.dev[^>]*>', re.I)
json_re = re.compile(r'(<script[^>]*application/ld\+json[^>]*>)([\s\S]*?)(</script>)', re.I)
stat = {"meta":0, "url":0, "img":0, "graph_del":0, "canon":0}
filecount = 0
report = []

for f in files:
    h = open(f, encoding="utf-8", errors="ignore").read()
    if "gptgames.dev" not in h:
        continue
    rel = f.replace("\\", "/").split("games/")[1].replace("index.html", "")
    page_url = "https://suipce.com/games/" + rel
    gdir = os.path.dirname(f)
    if os.path.exists(os.path.join(gdir, "preview.webp")):
        prev = page_url + "preview.webp"
    elif os.path.exists(os.path.join(gdir, "preview.png")):
        prev = page_url + "preview.png"
    else:
        prev = page_url + "preview.webp"
    c0 = [0]
    # 1) meta 标签
    def repl_meta(m):
        tag = m.group(0)
        if re.search(r'property=["\']og:url["\']|name=["\']og:url["\']', tag, re.I):
            new = re.sub(r'content=["\'][^"\']*["\']', 'content="%s"' % page_url, tag, count=1)
        elif re.search(r'(og:image|twitter:image)', tag, re.I):
            new = re.sub(r'content=["\'][^"\']*["\']', 'content="%s"' % prev, tag, count=1)
        else:
            new = tag
        if new != tag: c0[0]+=1; stat["meta"]+=1
        return new
    h = meta_re.sub(repl_meta, h)

    # 2) JSON-LD：大型原站 @graph 整块删除；单 VideoGame 替换 url/image
    def repl_json(m):
        open_tag, body, close_tag = m.group(1), m.group(2), m.group(3)
        if "gptgames.dev" not in body:
            return m.group(0)
        # 原站 WebSite/CollectionPage/ItemList 组织数据 -> 整块删除（保留我方 BreadcrumbList）
        if '"@graph"' in body or 'CollectionPage' in body:
            stat["graph_del"] += 1
            return ""
        nb = body
        nb2 = re.sub(r'("url"\s*:\s*")[^"]*gptgames\.dev[^"]*(")', r'\1%s\2' % page_url, nb)
        if nb2 != nb: stat["url"]+=1; c0[0]+=1
        nb = nb2
        for fld in ["image","thumbnailUrl","screenshot"]:
            nb3 = re.sub(r'("%s"\s*:\s*")[^"]*gptgames\.dev[^"]*(")' % fld, r'\1%s\2' % prev, nb)
            if nb3 != nb: stat["img"]+=1
            nb = nb3
        return open_tag + nb + close_tag
    h = json_re.sub(repl_json, h)

    # 3) 补缺失 canonical（幂等）
    if not re.search(r'<link\b[^>]*rel=["\']canonical["\']', h, re.I):
        can = '<link rel="canonical" href="%s"/>' % page_url
        if "</head>" in h:
            h = h.replace("</head>", "    " + can + "\n</head>", 1)
            stat["canon"] += 1; c0[0] += 1

    remain = h.count("gptgames.dev")
    report.append((rel, c0[0], remain))
    if c0[0] and apply:
        open(f, "w", encoding="utf-8").write(h); filecount+=1

print("模式:", "APPLY" if apply else "DRY-RUN")
print("改动 meta:", stat["meta"], " JSON-LD url:", stat["url"], " JSON-LD image:", stat["img"], " 删除@graph块:", stat["graph_del"], " 补canonical:", stat["canon"])
print("涉及文件:", len(report), "实际写入:", filecount)
for rel, n, remain in report:
    flag = "  <<< 仍有剩余(署名链接属正常)" if remain>0 else ""
    print("  %-40s 改 %d 剩余 %d%s" % (rel, n, remain, flag))
