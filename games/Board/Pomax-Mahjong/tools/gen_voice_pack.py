# -*- coding: utf-8 -*-
"""
生成 Pomax-Mahjong 中文报牌语音包（AIGameHub 本地增强层专用）。

线上找到的「现成真人语音包」基本都是欢乐麻将/雀魂等商业游戏的素材，
版权不明或来自盗版传播，不能直接随站分发。因此这里用微软 Edge 在线
神经语音（edge-tts）按游戏实际词表合成一套固定 MP3，一次生成后随项目
离线分发：音色固定、不依赖运行时联网、不依赖用户机器装中文语音。

v2：按玩家分配音色——4 家各有各的喊牌（碰/吃/杠/胡/自摸），
    你(0)=晓伊、电脑1=云健、电脑2=东北话、电脑3=陕西话；
    牌名与开局/流局等系统播报保持统一音色。

v3：牌名也按玩家分音色（42 张牌 × 4 家），谁打牌就用谁的嗓子念牌名；
    map 里的统一牌名保留作回退，系统播报仍统一音色。

用法：  pip install edge-tts && python tools/gen_voice_pack.py
输出：  voice/*.mp3 + voice/manifest.js

注意：edge-tts 是第三方对 Edge 朗读接口的封装，合成结果用于本地/
个人项目展示；若将来正式商用，请先确认微软语音服务的使用条款。
"""
import asyncio
import json
import time
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "voice"

# 分工：牌名要清楚，喊牌要有气势，流程播报要稳
V_TILE = "zh-CN-XiaoxiaoNeural"    # 女声 · 温暖清晰，念牌名
V_INFO = "zh-CN-YunyangNeural"     # 男声 · News，开局 / 流局 / 全场结束
V_BLOOM = "zh-CN-YunjianNeural"    # 男声 · Passion，杠上开花旁白
V_HAPPY = "zh-CN-XiaoyiNeural"     # 玩家0（你）· Lively
V_P1 = "zh-CN-YunjianNeural"       # 玩家1 · 激情男声
V_P2 = "zh-CN-liaoning-XiaobeiNeural"  # 玩家2 · 东北话 Humorous
V_P3 = "zh-CN-shaanxi-XiaoniNeural"    # 玩家3 · 陕西话 Bright

CN_NUM = ["一", "二", "三", "四", "五", "六", "七", "八", "九"]

# 念法别名：manifest 查表键 = 显示名（一条/青发），但音频念本地叫法。
# 阜阳麻将习惯：一条叫「小鸡」，青发（green dragon）叫「发财」。
SPOKEN_ALIAS = {"一条": "小鸡", "青发": "发财"}

# (文本, 文件名, 音色, 语速)
ITEMS = []

# 1) 42 张牌：统一音色版本（回退用）+ 四家各自音色版本（谁打牌谁念）
TILE_DEFS = []
for n, cn in enumerate(CN_NUM, 1):
    TILE_DEFS.append((cn + "万", "w%d.mp3" % n))
for n, cn in enumerate(CN_NUM, 1):
    TILE_DEFS.append((cn + "筒", "t%d.mp3" % n))
for n, cn in enumerate(CN_NUM, 1):
    TILE_DEFS.append((cn + "条", "s%d.mp3" % n))

TILE_DEFS += [
    ("东风", "wind-e.mp3"), ("南风", "wind-s.mp3"),
    ("西风", "wind-w.mp3"), ("北风", "wind-n.mp3"),
    ("青发", "dragon-g.mp3"), ("红中", "dragon-r.mp3"), ("白板", "dragon-w.mp3"),
    ("兰", "flower-1.mp3"), ("梅", "flower-2.mp3"),
    ("竹", "flower-3.mp3"), ("菊", "flower-4.mp3"),
    ("春", "season-1.mp3"), ("夏", "season-2.mp3"),
    ("秋", "season-3.mp3"), ("冬", "season-4.mp3"),
]

TILE_VOICES = {"0": (V_HAPPY, "+18%"), "1": (V_P1, "+20%"),
               "2": (V_P2, "+18%"), "3": (V_P3, "+18%")}

# 统一版（女声清晰，回退用）
for text, name in TILE_DEFS:
    ITEMS.append((text, name, V_TILE, "+12%"))

# 四家各自的版本：p{pid}-{原文件名}
TILES_BY_PID = {}
for pid, (voice, rate) in TILE_VOICES.items():
    table = {}
    for text, name in TILE_DEFS:
        fname = "p%s-%s" % (pid, name)
        ITEMS.append((text, fname, voice, rate))
        table[text] = fname
    TILES_BY_PID[pid] = table

# 2) 四位玩家各自的喊牌：action 键 → [{t: 文本, f: 文件}]
#    每家 碰1 吃1 杠2 胡2 自摸1 = 7 句
CALL_SETS = {
    "0": (V_HAPPY, [
        ("peng", "碰！",           "p0-peng-1.mp3",  "+18%"),
        ("chi",  "吃！",           "p0-chi-1.mp3",   "+18%"),
        ("gang", "杠！",           "p0-gang-1.mp3",  "+20%"),
        ("gang", "杠！好牌！",     "p0-gang-2.mp3",  "+20%"),
        ("hu",   "胡啦！",         "p0-hu-1.mp3",    "+18%"),
        ("hu",   "胡了，漂亮！",   "p0-hu-2.mp3",    "+18%"),
        ("zimo", "自摸，胡啦！",   "p0-zimo-1.mp3",  "+18%"),
    ]),
    "1": (V_P1, [
        ("peng", "碰！",           "p1-peng-1.mp3",  "+22%"),
        ("chi",  "吃！",           "p1-chi-1.mp3",   "+22%"),
        ("gang", "杠！",           "p1-gang-1.mp3",  "+24%"),
        ("gang", "杠！好牌！",     "p1-gang-2.mp3",  "+22%"),
        ("hu",   "胡了！",         "p1-hu-1.mp3",    "+20%"),
        ("hu",   "胡了，漂亮！",   "p1-hu-2.mp3",    "+20%"),
        ("zimo", "自摸！",         "p1-zimo-1.mp3",  "+22%"),
    ]),
    "2": (V_P2, [
        ("peng", "碰！",               "p2-peng-1.mp3",  "+18%"),
        ("chi",  "吃！",               "p2-chi-1.mp3",   "+18%"),
        ("gang", "杠喽！",             "p2-gang-1.mp3",  "+20%"),
        ("gang", "杠！这牌忒好了！",   "p2-gang-2.mp3",  "+20%"),
        ("hu",   "哎呀妈呀，胡啦！",   "p2-hu-1.mp3",    "+18%"),
        ("hu",   "胡啦，老带劲了！",   "p2-hu-2.mp3",    "+18%"),
        ("zimo", "自摸了，美滋滋！",   "p2-zimo-1.mp3",  "+18%"),
    ]),
    "3": (V_P3, [
        ("peng", "碰！",             "p3-peng-1.mp3",  "+18%"),
        ("chi",  "吃！",             "p3-chi-1.mp3",   "+18%"),
        ("gang", "杠咧！",           "p3-gang-1.mp3",  "+20%"),
        ("gang", "杠得好着哩！",     "p3-gang-2.mp3",  "+20%"),
        ("hu",   "美滴很，胡咧！",   "p3-hu-1.mp3",    "+16%"),
        ("hu",   "胡咧，嘹咋咧！",   "p3-hu-2.mp3",    "+18%"),
        ("zimo", "自摸咧！",         "p3-zimo-1.mp3",  "+18%"),
    ]),
}
CALLS = {}
for pid, (voice, lines) in CALL_SETS.items():
    entry = {}
    for action, text, name, rate in lines:
        ITEMS.append((text, name, voice, rate))
        entry.setdefault(action, []).append({"t": text, "f": name})
    CALLS[pid] = entry

# 3) 系统旁白（不区分玩家）
ITEMS.extend([
    ("开局啦，祝你好运！",   "start-1.mp3", V_INFO,  "+8%"),
    ("开局，起牌！",         "start-2.mp3", V_INFO,  "+8%"),
    ("流局，下一局。",       "draw-1.mp3",  V_INFO,  "+6%"),
    ("这一局流局了。",       "draw-2.mp3",  V_INFO,  "+6%"),
    ("全场结束，恭喜！",     "end-1.mp3",   V_INFO,  "+8%"),
    ("本场打完啦！",         "end-2.mp3",   V_INFO,  "+8%"),
    ("这一手太漂亮了！",     "extra-1.mp3", V_HAPPY, "+16%"),
    ("杠上开花！好牌！",     "bloom-1.mp3", V_BLOOM, "+22%"),
    ("杠上开花，恭喜！",     "bloom-2.mp3", V_HAPPY, "+20%"),
    ("哎呀，杠上开花咧！",   "bloom-3.mp3", V_P3,    "+18%"),
])


async def synth(item, sem):
    text, name, voice, rate = item
    dest = OUT / name
    if dest.exists() and dest.stat().st_size > 2000:
        return name, "cached", dest.stat().st_size
    spoken = SPOKEN_ALIAS.get(text, text)  # 显示名≠念法时按别名合成
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(spoken, voice, rate=rate).save(str(dest))
                if dest.exists() and dest.stat().st_size > 2000:
                    return name, "ok", dest.stat().st_size
                raise RuntimeError("empty output")
            except Exception as exc:
                if attempt == 2:
                    return name, "FAIL: %s" % exc, 0
                await asyncio.sleep(0.8 * (attempt + 1))


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(5)  # 别把在线服务打太狠
    t0 = time.time()
    results = await asyncio.gather(*(synth(i, sem) for i in ITEMS))
    failed = [r for r in results if r[1] not in ("ok", "cached")]

    # 清理不再被引用的旧 mp3，避免死文件越积越多
    keep = {name for _, name, _, _ in ITEMS} | {"manifest.js"}
    removed = []
    for f in OUT.glob("*.mp3"):
        if f.name not in keep:
            f.unlink()
            removed.append(f.name)

    mapping = {text: name for text, name, _, _ in ITEMS}
    header = (
        "/* AIGameHub 中文报牌语音包 v3 · 由 tools/gen_voice_pack.py 生成\n"
        " * 音源：Microsoft Edge 在线神经语音（edge-tts），固定 MP3 随站离线分发。\n"
        " * map: 统一牌名（回退）+ 系统旁白；tilesByPid: 四家各自音色的牌名；\n"
        " *       calls: 按玩家(pid 0-3)与动作(peng/chi/gang/hu/zimo)的喊牌，\n"
        " *       每条 {t:台词, f:文件}。未命中回退 TTS。详见 ATTRIBUTION.txt。\n"
        " * 请勿手工编辑本文件。\n */\n"
    )
    body = {
        "version": 5,
        "base": "voice/",
        "voices": {
            "tile": V_TILE, "info": V_INFO, "bloom": V_BLOOM,
            "p0": V_HAPPY, "p1": V_P1, "p2": V_P2, "p3": V_P3,
        },
        "map": mapping,
        "tilesByPid": TILES_BY_PID,
        "calls": CALLS,
    }
    (OUT / "manifest.js").write_text(
        header + "window.MJ_VOICE_PACK = " +
        json.dumps(body, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )

    total = sum(r[2] for r in results)
    print("items   :", len(ITEMS))
    print("ok      :", sum(1 for r in results if r[1] == "ok"))
    print("cached  :", sum(1 for r in results if r[1] == "cached"))
    print("failed  :", len(failed))
    print("removed :", len(removed), removed[:8])
    print("bytes   :", total, "(%.2f MB)" % (total / 1048576))
    print("elapsed : %.1fs" % (time.time() - t0))
    for r in failed:
        print("  !", r[0], r[1])
    if failed:
        raise SystemExit(1)


if __name__ == "__main__":
    asyncio.run(main())
