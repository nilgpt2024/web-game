# -*- coding: utf-8 -*-
import re, sys
p = r"D:\PycharmProjects\GameHub\script.js"
src = open(p, encoding="utf-8").read()
apply = "--apply" in sys.argv
report = []

# 1) 修复两个真实目录分类错误（path + preview 指向真实目录，分类归属保留）
fixes = [
    ("games/Puzzle/wordform/index.html", "games/Casual/wordform/index.html"),
    ("games/Puzzle/wordform/preview.webp", "games/Casual/wordform/preview.webp"),
    ("games/Board/ur/index.html", "games/Casual/ur/index.html"),
    ("games/Board/ur/preview.webp", "games/Casual/ur/preview.webp"),
]
for old, new in fixes:
    c = src.count(old)
    src = src.replace(old, new)
    report.append("修正 %s x%d" % (old, c))

# 2) 新增条目：按分类分组
NEW = {
 "Action": [
  ("Archery 3D","little","🎯","","3D 第一人称射箭，拉弓、调整力度与风向，一箭命中靶心取得高分。"),
  ("Ink Raiders","little","⚔️","","水墨风格动作冒险，挥墨为刃、闪避突进，在纸墨世界中一路闯关。"),
  ("Odyssey Voyage","little","⛵","","扬帆起航的海上冒险，躲避暗礁与风暴、收集物资，探索奥德赛航路。"),
  ("Pirate Raid","little","🏴‍☠️","","指挥海盗船发起突袭，瞄准开炮、接舷跳帮，劫掠港口。"),
  ("Pirate Raiders","little","🏝️","","海盗题材动作闯关，在岛屿与战船间战斗、收集宝藏。"),
  ("Space Shooter 3D","little","🚀","","3D 太空飞行射击，操控战机在星空中穿梭并击落敌舰。"),
  ("纳粹僵尸：便携版","little","🧟","","使命召唤纳粹僵尸模式的网页复刻，第一人称生存射击，修窗、买枪、撑过一波波尸潮。"),
 ],
 "Arcade": [
  ("Doodle Jump","no_need","🦘","games/Arcade/Doodle-Jump-Game/preview.webp","涂鸦跳跃，按方向键让小怪兽不断踩跳板向上，避开黑洞与障碍。"),
 ],
 "Board": [
  ("Mahjong Solitaire","no_need","🀄","games/Board/Mahjong-Solitaire-Game/preview.webp","经典麻将连连看，配对两张相同的开放麻将牌，逐步清空整个牌面。"),
 ],
 "Puzzle": [
  ("Cialdini 3D","text","🧩","","3D 空间解谜，在立体场景中移动、观察并触发机关解开谜题。"),
  ("Sliding Puzzle","no_need","🔢","games/Puzzle/Sliding-Puzzle-Game/preview.webp","数字华容道滑动拼图，把打乱的方块按顺序滑动还原。"),
 ],
 "Typing": [
  ("Typing Game","no_need","⌨️","games/Typing/Typing-Game/preview.webp","打字练习小游戏，按提示快速准确敲击对应字母，提升输入速度。"),
 ],
}

# 目录 slug 映射（名称 -> 目录名）
SLUG = {
 "Archery 3D":"games/Action/Archery-3D",
 "Ink Raiders":"games/Action/Ink-Raiders",
 "Odyssey Voyage":"games/Action/Odyssey-Voyage",
 "Pirate Raid":"games/Action/Pirate-Raid",
 "Pirate Raiders":"games/Action/Pirate-Raiders",
 "Space Shooter 3D":"games/Action/Space-Shooter-3D",
 "纳粹僵尸：便携版":"games/FPS/Nazi-Zombies-Portable",
 "Doodle Jump":"games/Arcade/Doodle-Jump-Game",
 "Mahjong Solitaire":"games/Board/Mahjong-Solitaire-Game",
 "Cialdini 3D":"games/Puzzle/Cialdini-3D",
 "Sliding Puzzle":"games/Puzzle/Sliding-Puzzle-Game",
 "Typing Game":"games/Typing/Typing-Game",
}

def entry(name, lang, icon, prev, desc):
    prev_field = ("preview: '%s', " % prev) if prev else "preview: '', "
    return ("        { name: '%s', lang: '%s', added: '2026-10-20', path: '%s/index.html', "
            "%sicon: '%s', desc: '%s', isNew: true }") % (
            name, lang, SLUG[name], prev_field, icon, desc)

lines = src.split("\n")
# 找每个分类的结束行（4 空格 ] 或 ],）
out = []
i = 0
while i < len(lines):
    out.append(lines[i])
    m = re.match(r'^    (\w+):\s*\[\s*$', lines[i])
    if m and m.group(1) in NEW:
        cat = m.group(1)
        # 找结束行
        j = i + 1
        while j < len(lines) and not re.match(r'^    \]', lines[j]):
            j += 1
        # 复制 i+1 .. j-1
        body = lines[i+1:j]
        out.extend(body)
        # 最后一个非空条目补逗号
        last = body[-1].rstrip()
        if last and not last.endswith(","):
            out[-1] = body[-1].rstrip() + ","
        # 追加新条目
        for k, item in enumerate(NEW[cat]):
            line = entry(*item)
            if k != len(NEW[cat]) - 1:
                line += ","
            out.append(line)
        report.append("分类 %s 追加 %d 条" % (cat, len(NEW[cat])))
        i = j
        continue
    i += 1

newsrc = "\n".join(out)
print("\n".join(report))
if apply:
    open(p, "w", encoding="utf-8").write(newsrc)
    print("已写入 script.js")
else:
    print("DRY-RUN 未写入")
