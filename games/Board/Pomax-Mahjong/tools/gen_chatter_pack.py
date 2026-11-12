# -*- coding: utf-8 -*-
"""
生成「牌桌搭话」方言俚语语音包（本地增强层专用）。

原则：口音和俚语必须配套，不串味——
  · 东北大姐用东北官话嗓，只讲东北俚语；
  · 陕西老姐用中原官话关中嗓，只讲陕西俚语；
  · 阜阳老哥只讲阜阳（皖北 / 中原官话商阜片）俚语。
三副嗓子与 voice/manifest.js 里四家报牌的音色一一对应，
同一个人报牌和搭话听起来是同一个声音。

台词出处（均为公开资料里能查到的说法）：
  · 阜阳台《阜阳这些"三字方言"》：「羊熊样」「你咋恁肉，我都等你等哩
    心慌哩羊熊样」「也熊吧」「真沾闲」「倒劲了」「白」
  · 阜阳发布《博大精深的阜阳话》：「过劲」「粘闲」「白徐吊」
  · 新浪《学好阜阳话》：「肉叽」「靠毁」「白作假」「斗」
  · 百度百科「羊熊样」：X + 的/哩 + 羊熊样 = 「……得很」
  · 今日头条《催人快点少用急》：「麻溜儿的」「沙楞的」「别磨叽」
  · 校对网《东北话》：「磨叽」「麻溜」「嘎哈」「咋整」「秃噜」「唠嗑」
  · 百度百科「麻溜」「咋整」、北方方言「杠杠滴」
  · 央视/陕西文旅《测测你的老陕纯度》：「克里马擦」「嫽扎咧」「么麻达」
    「谝」「咥」「额滴神」「包（别）」
  · 中安在线《一分钟教你快速学说陕西话》：「美滴太」「木囊」「瓜娃」
  · 华商网《陕将方言人建档》：「麻达」「瓷麻二楞」「嫽扎咧」

字幕保留方言本字（t），合成文本（say）用谐音字修正 TTS 读错的字：
  「白」= 别、「包」= 别、「嫽」= 嘹，避免合成音把方言字念成普通话字音。

关于皖北口音：edge-tts 免费端点只提供东北官话（辽宁）与中原官话
（陕西关中）两种方言音色，没有河南 / 安徽专用音色。阜阳话属中原官话
商阜片，与豫东几乎互通；若要真正地道的皖北嗓，可把 FY_VOICE 换成
Azure 的 zh-CN-henan-YundengNeural（中原官话河南）后重新生成本包，
运行时无需改动。当前用不带外地腔的中性北方男声 + 慢速低沉朗读，
至少不会拿东北腔去讲阜阳话。

用法：  pip install edge-tts && python tools/gen_chatter_pack.py
输出：  voice/db-*.mp3 + voice/sx-*.mp3 + voice/fy-*.mp3 + voice/chatter.js
"""
import asyncio
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "voice"

# 三副嗓子：与报牌包（tools/gen_voice_pack.py）的 p2 / p3 / p1 一致
V_DB = "zh-CN-liaoning-XiaobeiNeural"   # 东北官话 · 东北大姐
V_SX = "zh-CN-shaanxi-XiaoniNeural"     # 中原官话关中 · 陕西老姐
V_FY = "zh-CN-YunjianNeural"            # 阜阳老哥 · 中性北方男声，慢速低沉
# 有 Azure 中原官话（河南）密钥时改这里即可一键换嗓：
# V_FY = "zh-CN-henan-YundengNeural"

DB = ("东北话", "东北大姐", V_DB, "+8%", "+0Hz")
SX = ("陕西话", "陕西老姐", V_SX, "+6%", "+0Hz")
FY = ("阜阳话", "阜阳老哥", V_FY, "-6%", "-12Hz")

# (场景, 方言组, 字幕文本, 合成文本, 文件名)
# 合成文本留空表示与字幕一致。
LINES = [
    # ---- 等你出牌 ----
    ("wait", DB, "麻溜儿的，别搁那儿磨叽了", "", "db-wait-1.mp3"),
    ("wait", DB, "沙楞的，赶紧出牌，别磨蹭", "", "db-wait-2.mp3"),
    ("wait", DB, "嘎哈呢这是，快整啊", "", "db-wait-3.mp3"),
    ("wait", SX, "克里马擦，包磨蹭咧", "克里马擦，别磨蹭咧", "sx-wait-1.mp3"),
    ("wait", SX, "你咋木囊成马咧，赶紧些", "", "sx-wait-2.mp3"),
    ("wait", SX, "额滴神呀，还谝啥闲传，快出牌", "", "sx-wait-3.mp3"),
    ("wait", FY, "慢哩羊熊样，该你出牌啦", "", "fy-wait-1.mp3"),
    ("wait", FY, "你咋恁肉，我都等你等哩心慌哩羊熊样", "", "fy-wait-2.mp3"),
    ("wait", FY, "白肉叽了，赶紧的呗", "别肉叽了，赶紧的呗", "fy-wait-3.mp3"),
    ("wait", FY, "慢哩跟羊熊样，快点呗", "", "fy-wait-4.mp3"),
    # ---- 碰 / 杠 ----
    ("meld", DB, "碰！哎呀妈呀，这牌整得杠杠滴", "", "db-meld-1.mp3"),
    ("meld", DB, "这把整得贼拉带劲", "", "db-meld-2.mp3"),
    ("meld", SX, "碰！嫽扎咧", "碰！嘹扎咧", "sx-meld-1.mp3"),
    ("meld", SX, "这牌美滴太", "", "sx-meld-2.mp3"),
    ("meld", FY, "碰！这一下真过劲", "", "fy-meld-1.mp3"),
    ("meld", FY, "杠！过劲哩羊熊样", "", "fy-meld-2.mp3"),
    ("meld", FY, "好牌，真沾闲", "", "fy-meld-3.mp3"),
    # ---- 胡 / 自摸 ----
    ("win", DB, "哎呀妈呀，自摸了，太敞亮了", "", "db-win-1.mp3"),
    ("win", DB, "杠杠滴，这把胡得漂亮", "", "db-win-2.mp3"),
    ("win", SX, "嫽得太太，自摸咧", "嘹得太太，自摸咧", "sx-win-1.mp3"),
    ("win", SX, "么麻达，这把稳咧", "", "sx-win-2.mp3"),
    ("win", FY, "过劲哩羊熊样，胡啦", "", "fy-win-1.mp3"),
    ("win", FY, "真沾闲，自摸！", "", "fy-win-2.mp3"),
    # ---- 点炮 / 输牌 ----
    ("lose", DB, "咋整，这把秃噜了", "", "db-lose-1.mp3"),
    ("lose", DB, "完了，点炮了，白瞎这把牌", "", "db-lose-2.mp3"),
    ("lose", SX, "麻达咧，这一把点炮咧", "", "sx-lose-1.mp3"),
    ("lose", SX, "这下把人熬煎咧", "", "sx-lose-2.mp3"),
    ("lose", FY, "也熊吧，这一把点炮了", "", "fy-lose-1.mp3"),
    ("lose", FY, "靠毁，白忙活一圈子", "", "fy-lose-2.mp3"),
    # ---- 开局 ----
    ("start", DB, "来来来，唠啥嗑，开整！", "", "db-start-1.mp3"),
    ("start", SX, "今儿咱谝着打，包客气", "今儿咱谝着打，别客气", "sx-start-1.mp3"),
    ("start", FY, "今个咱斗两圈，白作假", "今个咱斗两圈，别作假", "fy-start-1.mp3"),
]


async def synth(kind, group, text, say, fname, sem):
    dialect, who, voice, rate, pitch = group
    dest = OUT / fname
    if dest.exists() and dest.stat().st_size > 2000:
        print("skip", fname)
        return
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(say or text, voice, rate=rate, pitch=pitch).save(str(dest))
                if dest.exists() and dest.stat().st_size > 2000:
                    print("ok  ", fname, dest.stat().st_size, "bytes")
                    return
            except Exception as exc:
                print("retry", fname, attempt + 1, str(exc)[:100])
            await asyncio.sleep(1.5)
        raise RuntimeError("合成失败: " + fname)


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(4)
    await asyncio.gather(*(synth(*item, sem) for item in LINES))

    groups = {}
    voices = {}
    for kind, group, text, _say, fname in LINES:
        dialect, who, voice, _rate, _pitch = group
        groups.setdefault(kind, []).append({
            "t": text, "f": fname, "who": who, "dialect": dialect
        })
        voices[dialect] = voice

    # 清掉上一版遗留、本版不再使用的俚语 mp3
    keep = {item[4] for item in LINES}
    for p in OUT.glob("*.mp3"):
        if p.name.startswith(("db-", "sx-", "fy-")) and p.name not in keep:
            p.unlink()
            print("purge", p.name)

    payload = {
        "version": 2,
        "base": "voice/",
        "dialects": ["阜阳话", "东北话", "陕西话"],
        "voices": voices,
        "groups": groups,
    }
    header = (
        "/* 牌桌方言俚语语音包 v2 · 由 tools/gen_chatter_pack.py 生成\n"
        " * 口音与俚语一一配套：东北官话讲东北话、中原官话关中讲陕西话、\n"
        " * 中性北方男声讲阜阳（皖北）话；固定 MP3 随站离线分发。\n"
        " * 台词出处见脚本注释；请勿手工编辑本文件。\n"
        " */\n"
    )
    (OUT / "chatter.js").write_text(
        header + "window.MJ_CHATTER = " +
        json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print("written", OUT / "chatter.js", len(LINES), "lines")


if __name__ == "__main__":
    asyncio.run(main())
