# -*- coding: utf-8 -*-
"""
生成阜阳麻将「牌桌搭话」俚语语音包（本地增强层专用）。

台词来源（皖北/阜阳方言，均为公开资料里能查到的说法）：
  · 阜阳台《阜阳这些"三字方言"》：「羊熊样」「你咋恁肉，我都等你等哩
    心慌哩羊熊样」「也熊吧」「真沾闲」「倒劲了」「白」
  · 阜阳发布《博大精深的阜阳话》：「过劲」「粘闲」「白徐吊」
  · 新浪《学好阜阳话》：「肉叽」「靠毁」「白作假」「斗」
  · 百度百科「羊熊样」：X + 的/哩 + 羊熊样 = 「……得很」
用户原话「慢里羊熊羊」按本地通行写法记作「慢哩羊熊样」。

与 voice/manifest.js 分开维护：报牌包是规则词表，这里是趣味俚语，
互不污染；生成的 MP3 随站离线分发，运行时不依赖 TTS 或联网。

用法：  pip install edge-tts && python tools/gen_chatter_pack.py
输出：  voice/fy-*.mp3 + voice/chatter.js
"""
import asyncio
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "voice"

# 沿用报牌包的四家音色，搭话听起来像同桌的人
V_P1 = "zh-CN-YunjianNeural"            # 激情男声
V_P2 = "zh-CN-liaoning-XiaobeiNeural"  # 北方幽默嗓，负责催牌/幸灾乐祸
V_P3 = "zh-CN-shaanxi-XiaoniNeural"    # 明亮方言嗓
V_HAPPY = "zh-CN-XiaoyiNeural"         # 活泼女声
V_INFO = "zh-CN-YunyangNeural"         # 稳重男声

# (场景, 台词, 文件, 说话的人, 音色, 语速)
LINES = [
    # 等你出牌——用户点名的场景
    ("wait", "慢哩羊熊样，该你出牌啦", "fy-wait-1.mp3", "下家", V_P2, "+8%"),
    ("wait", "你咋恁肉，我都等你等哩心慌哩羊熊样", "fy-wait-2.mp3", "对家", V_P3, "+5%"),
    ("wait", "白肉叽了，赶紧的呗", "fy-wait-3.mp3", "上家", V_P2, "+12%"),
    # 碰 / 杠
    ("meld", "碰！这一下真过劲", "fy-meld-1.mp3", "对家", V_P1, "+12%"),
    ("meld", "杠！过劲哩羊熊样", "fy-meld-2.mp3", "下家", V_P1, "+14%"),
    ("meld", "好牌，真沾闲", "fy-meld-3.mp3", "上家", V_HAPPY, "+8%"),
    # 胡 / 自摸
    ("win", "过劲哩羊熊样，胡啦", "fy-win-1.mp3", "牌桌", V_P1, "+14%"),
    ("win", "真沾闲，自摸！", "fy-win-2.mp3", "牌桌", V_HAPPY, "+10%"),
    ("win", "今个手气真过劲", "fy-win-3.mp3", "牌桌", V_P3, "+8%"),
    # 点炮 / 输牌，自嘲不吵人
    ("lose", "也熊吧，这一把点炮了", "fy-lose-1.mp3", "下家", V_P2, "+6%"),
    ("lose", "靠毁，白忙活一圈子", "fy-lose-2.mp3", "对家", V_P2, "+8%"),
    ("lose", "倒劲了，下把再扳回来", "fy-lose-3.mp3", "上家", V_P3, "+6%"),
    # 开局
    ("start", "今个咱斗两圈，白作假", "fy-start-1.mp3", "牌桌", V_INFO, "+5%"),
    ("start", "起牌喽，看谁过劲", "fy-start-2.mp3", "牌桌", V_HAPPY, "+8%"),
]


async def synth(item, sem):
    kind, text, fname, who, voice, rate = item
    dest = OUT / fname
    if dest.exists() and dest.stat().st_size > 2000:
        print("skip", fname)
        return
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text, voice, rate=rate).save(str(dest))
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
    await asyncio.gather(*(synth(item, sem) for item in LINES))

    groups = {}
    for kind, text, fname, who, _voice, _rate in LINES:
        groups.setdefault(kind, []).append({"t": text, "f": fname, "who": who})

    payload = {
        "version": 1,
        "base": "voice/",
        "dialect": "阜阳 / 皖北",
        "groups": groups,
    }
    header = (
        "/* 阜阳麻将牌桌俚语语音包 v1 · 由 tools/gen_chatter_pack.py 生成\n"
        " * 音源：Microsoft Edge 在线神经语音，固定 MP3 随站离线分发。\n"
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
