/* AIGameHub 中文报牌语音包 v3 · 由 tools/gen_voice_pack.py 生成
 * 音源：Microsoft Edge 在线神经语音（edge-tts），固定 MP3 随站离线分发。
 * map: 统一牌名（回退）+ 系统旁白；tilesByPid: 四家各自音色的牌名；
 *       calls: 按玩家(pid 0-3)与动作(peng/chi/gang/hu/zimo)的喊牌，
 *       每条 {t:台词, f:文件}。未命中回退 TTS。详见 ATTRIBUTION.txt。
 * 请勿手工编辑本文件。
 */
window.MJ_VOICE_PACK = {
  "version": 5,
  "base": "voice/",
  "voices": {
    "tile": "zh-CN-XiaoxiaoNeural",
    "info": "zh-CN-YunyangNeural",
    "bloom": "zh-CN-YunjianNeural",
    "p0": "zh-CN-XiaoyiNeural",
    "p1": "zh-CN-YunjianNeural",
    "p2": "zh-CN-liaoning-XiaobeiNeural",
    "p3": "zh-CN-shaanxi-XiaoniNeural"
  },
  "map": {
    "一万": "p3-w1.mp3",
    "二万": "p3-w2.mp3",
    "三万": "p3-w3.mp3",
    "四万": "p3-w4.mp3",
    "五万": "p3-w5.mp3",
    "六万": "p3-w6.mp3",
    "七万": "p3-w7.mp3",
    "八万": "p3-w8.mp3",
    "九万": "p3-w9.mp3",
    "一筒": "p3-t1.mp3",
    "二筒": "p3-t2.mp3",
    "三筒": "p3-t3.mp3",
    "四筒": "p3-t4.mp3",
    "五筒": "p3-t5.mp3",
    "六筒": "p3-t6.mp3",
    "七筒": "p3-t7.mp3",
    "八筒": "p3-t8.mp3",
    "九筒": "p3-t9.mp3",
    "一条": "p3-s1.mp3",
    "二条": "p3-s2.mp3",
    "三条": "p3-s3.mp3",
    "四条": "p3-s4.mp3",
    "五条": "p3-s5.mp3",
    "六条": "p3-s6.mp3",
    "七条": "p3-s7.mp3",
    "八条": "p3-s8.mp3",
    "九条": "p3-s9.mp3",
    "东风": "p3-wind-e.mp3",
    "南风": "p3-wind-s.mp3",
    "西风": "p3-wind-w.mp3",
    "北风": "p3-wind-n.mp3",
    "青发": "p3-dragon-g.mp3",
    "红中": "p3-dragon-r.mp3",
    "白板": "p3-dragon-w.mp3",
    "兰": "p3-flower-1.mp3",
    "梅": "p3-flower-2.mp3",
    "竹": "p3-flower-3.mp3",
    "菊": "p3-flower-4.mp3",
    "春": "p3-season-1.mp3",
    "夏": "p3-season-2.mp3",
    "秋": "p3-season-3.mp3",
    "冬": "p3-season-4.mp3",
    "碰！": "p3-peng-1.mp3",
    "吃！": "p3-chi-1.mp3",
    "杠！": "p1-gang-1.mp3",
    "杠！好牌！": "p1-gang-2.mp3",
    "胡啦！": "p0-hu-1.mp3",
    "胡了，漂亮！": "p1-hu-2.mp3",
    "自摸，胡啦！": "p0-zimo-1.mp3",
    "胡了！": "p1-hu-1.mp3",
    "自摸！": "p1-zimo-1.mp3",
    "杠喽！": "p2-gang-1.mp3",
    "杠！这牌忒好了！": "p2-gang-2.mp3",
    "哎呀妈呀，胡啦！": "p2-hu-1.mp3",
    "胡啦，老带劲了！": "p2-hu-2.mp3",
    "自摸了，美滋滋！": "p2-zimo-1.mp3",
    "杠咧！": "p3-gang-1.mp3",
    "杠得好着哩！": "p3-gang-2.mp3",
    "美滴很，胡咧！": "p3-hu-1.mp3",
    "胡咧，嘹咋咧！": "p3-hu-2.mp3",
    "自摸咧！": "p3-zimo-1.mp3",
    "开局啦，祝你好运！": "start-1.mp3",
    "开局，起牌！": "start-2.mp3",
    "流局，下一局。": "draw-1.mp3",
    "这一局流局了。": "draw-2.mp3",
    "全场结束，恭喜！": "end-1.mp3",
    "本场打完啦！": "end-2.mp3",
    "这一手太漂亮了！": "extra-1.mp3",
    "杠上开花！好牌！": "bloom-1.mp3",
    "杠上开花，恭喜！": "bloom-2.mp3",
    "哎呀，杠上开花咧！": "bloom-3.mp3"
  },
  "tilesByPid": {
    "0": {
      "一万": "p0-w1.mp3",
      "二万": "p0-w2.mp3",
      "三万": "p0-w3.mp3",
      "四万": "p0-w4.mp3",
      "五万": "p0-w5.mp3",
      "六万": "p0-w6.mp3",
      "七万": "p0-w7.mp3",
      "八万": "p0-w8.mp3",
      "九万": "p0-w9.mp3",
      "一筒": "p0-t1.mp3",
      "二筒": "p0-t2.mp3",
      "三筒": "p0-t3.mp3",
      "四筒": "p0-t4.mp3",
      "五筒": "p0-t5.mp3",
      "六筒": "p0-t6.mp3",
      "七筒": "p0-t7.mp3",
      "八筒": "p0-t8.mp3",
      "九筒": "p0-t9.mp3",
      "一条": "p0-s1.mp3",
      "二条": "p0-s2.mp3",
      "三条": "p0-s3.mp3",
      "四条": "p0-s4.mp3",
      "五条": "p0-s5.mp3",
      "六条": "p0-s6.mp3",
      "七条": "p0-s7.mp3",
      "八条": "p0-s8.mp3",
      "九条": "p0-s9.mp3",
      "东风": "p0-wind-e.mp3",
      "南风": "p0-wind-s.mp3",
      "西风": "p0-wind-w.mp3",
      "北风": "p0-wind-n.mp3",
      "青发": "p0-dragon-g.mp3",
      "红中": "p0-dragon-r.mp3",
      "白板": "p0-dragon-w.mp3",
      "兰": "p0-flower-1.mp3",
      "梅": "p0-flower-2.mp3",
      "竹": "p0-flower-3.mp3",
      "菊": "p0-flower-4.mp3",
      "春": "p0-season-1.mp3",
      "夏": "p0-season-2.mp3",
      "秋": "p0-season-3.mp3",
      "冬": "p0-season-4.mp3"
    },
    "1": {
      "一万": "p1-w1.mp3",
      "二万": "p1-w2.mp3",
      "三万": "p1-w3.mp3",
      "四万": "p1-w4.mp3",
      "五万": "p1-w5.mp3",
      "六万": "p1-w6.mp3",
      "七万": "p1-w7.mp3",
      "八万": "p1-w8.mp3",
      "九万": "p1-w9.mp3",
      "一筒": "p1-t1.mp3",
      "二筒": "p1-t2.mp3",
      "三筒": "p1-t3.mp3",
      "四筒": "p1-t4.mp3",
      "五筒": "p1-t5.mp3",
      "六筒": "p1-t6.mp3",
      "七筒": "p1-t7.mp3",
      "八筒": "p1-t8.mp3",
      "九筒": "p1-t9.mp3",
      "一条": "p1-s1.mp3",
      "二条": "p1-s2.mp3",
      "三条": "p1-s3.mp3",
      "四条": "p1-s4.mp3",
      "五条": "p1-s5.mp3",
      "六条": "p1-s6.mp3",
      "七条": "p1-s7.mp3",
      "八条": "p1-s8.mp3",
      "九条": "p1-s9.mp3",
      "东风": "p1-wind-e.mp3",
      "南风": "p1-wind-s.mp3",
      "西风": "p1-wind-w.mp3",
      "北风": "p1-wind-n.mp3",
      "青发": "p1-dragon-g.mp3",
      "红中": "p1-dragon-r.mp3",
      "白板": "p1-dragon-w.mp3",
      "兰": "p1-flower-1.mp3",
      "梅": "p1-flower-2.mp3",
      "竹": "p1-flower-3.mp3",
      "菊": "p1-flower-4.mp3",
      "春": "p1-season-1.mp3",
      "夏": "p1-season-2.mp3",
      "秋": "p1-season-3.mp3",
      "冬": "p1-season-4.mp3"
    },
    "2": {
      "一万": "p2-w1.mp3",
      "二万": "p2-w2.mp3",
      "三万": "p2-w3.mp3",
      "四万": "p2-w4.mp3",
      "五万": "p2-w5.mp3",
      "六万": "p2-w6.mp3",
      "七万": "p2-w7.mp3",
      "八万": "p2-w8.mp3",
      "九万": "p2-w9.mp3",
      "一筒": "p2-t1.mp3",
      "二筒": "p2-t2.mp3",
      "三筒": "p2-t3.mp3",
      "四筒": "p2-t4.mp3",
      "五筒": "p2-t5.mp3",
      "六筒": "p2-t6.mp3",
      "七筒": "p2-t7.mp3",
      "八筒": "p2-t8.mp3",
      "九筒": "p2-t9.mp3",
      "一条": "p2-s1.mp3",
      "二条": "p2-s2.mp3",
      "三条": "p2-s3.mp3",
      "四条": "p2-s4.mp3",
      "五条": "p2-s5.mp3",
      "六条": "p2-s6.mp3",
      "七条": "p2-s7.mp3",
      "八条": "p2-s8.mp3",
      "九条": "p2-s9.mp3",
      "东风": "p2-wind-e.mp3",
      "南风": "p2-wind-s.mp3",
      "西风": "p2-wind-w.mp3",
      "北风": "p2-wind-n.mp3",
      "青发": "p2-dragon-g.mp3",
      "红中": "p2-dragon-r.mp3",
      "白板": "p2-dragon-w.mp3",
      "兰": "p2-flower-1.mp3",
      "梅": "p2-flower-2.mp3",
      "竹": "p2-flower-3.mp3",
      "菊": "p2-flower-4.mp3",
      "春": "p2-season-1.mp3",
      "夏": "p2-season-2.mp3",
      "秋": "p2-season-3.mp3",
      "冬": "p2-season-4.mp3"
    },
    "3": {
      "一万": "p3-w1.mp3",
      "二万": "p3-w2.mp3",
      "三万": "p3-w3.mp3",
      "四万": "p3-w4.mp3",
      "五万": "p3-w5.mp3",
      "六万": "p3-w6.mp3",
      "七万": "p3-w7.mp3",
      "八万": "p3-w8.mp3",
      "九万": "p3-w9.mp3",
      "一筒": "p3-t1.mp3",
      "二筒": "p3-t2.mp3",
      "三筒": "p3-t3.mp3",
      "四筒": "p3-t4.mp3",
      "五筒": "p3-t5.mp3",
      "六筒": "p3-t6.mp3",
      "七筒": "p3-t7.mp3",
      "八筒": "p3-t8.mp3",
      "九筒": "p3-t9.mp3",
      "一条": "p3-s1.mp3",
      "二条": "p3-s2.mp3",
      "三条": "p3-s3.mp3",
      "四条": "p3-s4.mp3",
      "五条": "p3-s5.mp3",
      "六条": "p3-s6.mp3",
      "七条": "p3-s7.mp3",
      "八条": "p3-s8.mp3",
      "九条": "p3-s9.mp3",
      "东风": "p3-wind-e.mp3",
      "南风": "p3-wind-s.mp3",
      "西风": "p3-wind-w.mp3",
      "北风": "p3-wind-n.mp3",
      "青发": "p3-dragon-g.mp3",
      "红中": "p3-dragon-r.mp3",
      "白板": "p3-dragon-w.mp3",
      "兰": "p3-flower-1.mp3",
      "梅": "p3-flower-2.mp3",
      "竹": "p3-flower-3.mp3",
      "菊": "p3-flower-4.mp3",
      "春": "p3-season-1.mp3",
      "夏": "p3-season-2.mp3",
      "秋": "p3-season-3.mp3",
      "冬": "p3-season-4.mp3"
    }
  },
  "calls": {
    "0": {
      "peng": [
        {
          "t": "碰！",
          "f": "p0-peng-1.mp3"
        }
      ],
      "chi": [
        {
          "t": "吃！",
          "f": "p0-chi-1.mp3"
        }
      ],
      "gang": [
        {
          "t": "杠！",
          "f": "p0-gang-1.mp3"
        },
        {
          "t": "杠！好牌！",
          "f": "p0-gang-2.mp3"
        }
      ],
      "hu": [
        {
          "t": "胡啦！",
          "f": "p0-hu-1.mp3"
        },
        {
          "t": "胡了，漂亮！",
          "f": "p0-hu-2.mp3"
        }
      ],
      "zimo": [
        {
          "t": "自摸，胡啦！",
          "f": "p0-zimo-1.mp3"
        }
      ]
    },
    "1": {
      "peng": [
        {
          "t": "碰！",
          "f": "p1-peng-1.mp3"
        }
      ],
      "chi": [
        {
          "t": "吃！",
          "f": "p1-chi-1.mp3"
        }
      ],
      "gang": [
        {
          "t": "杠！",
          "f": "p1-gang-1.mp3"
        },
        {
          "t": "杠！好牌！",
          "f": "p1-gang-2.mp3"
        }
      ],
      "hu": [
        {
          "t": "胡了！",
          "f": "p1-hu-1.mp3"
        },
        {
          "t": "胡了，漂亮！",
          "f": "p1-hu-2.mp3"
        }
      ],
      "zimo": [
        {
          "t": "自摸！",
          "f": "p1-zimo-1.mp3"
        }
      ]
    },
    "2": {
      "peng": [
        {
          "t": "碰！",
          "f": "p2-peng-1.mp3"
        }
      ],
      "chi": [
        {
          "t": "吃！",
          "f": "p2-chi-1.mp3"
        }
      ],
      "gang": [
        {
          "t": "杠喽！",
          "f": "p2-gang-1.mp3"
        },
        {
          "t": "杠！这牌忒好了！",
          "f": "p2-gang-2.mp3"
        }
      ],
      "hu": [
        {
          "t": "哎呀妈呀，胡啦！",
          "f": "p2-hu-1.mp3"
        },
        {
          "t": "胡啦，老带劲了！",
          "f": "p2-hu-2.mp3"
        }
      ],
      "zimo": [
        {
          "t": "自摸了，美滋滋！",
          "f": "p2-zimo-1.mp3"
        }
      ]
    },
    "3": {
      "peng": [
        {
          "t": "碰！",
          "f": "p3-peng-1.mp3"
        }
      ],
      "chi": [
        {
          "t": "吃！",
          "f": "p3-chi-1.mp3"
        }
      ],
      "gang": [
        {
          "t": "杠咧！",
          "f": "p3-gang-1.mp3"
        },
        {
          "t": "杠得好着哩！",
          "f": "p3-gang-2.mp3"
        }
      ],
      "hu": [
        {
          "t": "美滴很，胡咧！",
          "f": "p3-hu-1.mp3"
        },
        {
          "t": "胡咧，嘹咋咧！",
          "f": "p3-hu-2.mp3"
        }
      ],
      "zimo": [
        {
          "t": "自摸咧！",
          "f": "p3-zimo-1.mp3"
        }
      ]
    }
  }
};
