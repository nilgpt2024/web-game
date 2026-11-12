/* 牌桌方言俚语语音包 v2 · 由 tools/gen_chatter_pack.py 生成
 * 口音与俚语一一配套：东北官话讲东北话、中原官话关中讲陕西话、
 * 中性北方男声讲阜阳（皖北）话；固定 MP3 随站离线分发。
 * 台词出处见脚本注释；请勿手工编辑本文件。
 */
window.MJ_CHATTER = {
  "version": 2,
  "base": "voice/",
  "dialects": [
    "阜阳话",
    "东北话",
    "陕西话"
  ],
  "voices": {
    "东北话": "zh-CN-liaoning-XiaobeiNeural",
    "陕西话": "zh-CN-shaanxi-XiaoniNeural",
    "阜阳话": "zh-CN-YunjianNeural"
  },
  "groups": {
    "wait": [
      {
        "t": "麻溜儿的，别搁那儿磨叽了",
        "f": "db-wait-1.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "沙楞的，赶紧出牌，别磨蹭",
        "f": "db-wait-2.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "嘎哈呢这是，快整啊",
        "f": "db-wait-3.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "克里马擦，包磨蹭咧",
        "f": "sx-wait-1.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "你咋木囊成马咧，赶紧些",
        "f": "sx-wait-2.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "额滴神呀，还谝啥闲传，快出牌",
        "f": "sx-wait-3.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "慢哩羊熊样，该你出牌啦",
        "f": "fy-wait-1.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      },
      {
        "t": "你咋恁肉，我都等你等哩心慌哩羊熊样",
        "f": "fy-wait-2.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      },
      {
        "t": "白肉叽了，赶紧的呗",
        "f": "fy-wait-3.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      },
      {
        "t": "慢哩跟羊熊样，快点呗",
        "f": "fy-wait-4.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      }
    ],
    "meld": [
      {
        "t": "碰！哎呀妈呀，这牌整得杠杠滴",
        "f": "db-meld-1.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "这把整得贼拉带劲",
        "f": "db-meld-2.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "碰！嫽扎咧",
        "f": "sx-meld-1.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "这牌美滴太",
        "f": "sx-meld-2.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "碰！这一下真过劲",
        "f": "fy-meld-1.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      },
      {
        "t": "杠！过劲哩羊熊样",
        "f": "fy-meld-2.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      },
      {
        "t": "好牌，真沾闲",
        "f": "fy-meld-3.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      }
    ],
    "win": [
      {
        "t": "哎呀妈呀，自摸了，太敞亮了",
        "f": "db-win-1.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "杠杠滴，这把胡得漂亮",
        "f": "db-win-2.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "嫽得太太，自摸咧",
        "f": "sx-win-1.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "么麻达，这把稳咧",
        "f": "sx-win-2.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "过劲哩羊熊样，胡啦",
        "f": "fy-win-1.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      },
      {
        "t": "真沾闲，自摸！",
        "f": "fy-win-2.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      }
    ],
    "lose": [
      {
        "t": "咋整，这把秃噜了",
        "f": "db-lose-1.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "完了，点炮了，白瞎这把牌",
        "f": "db-lose-2.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "麻达咧，这一把点炮咧",
        "f": "sx-lose-1.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "这下把人熬煎咧",
        "f": "sx-lose-2.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "也熊吧，这一把点炮了",
        "f": "fy-lose-1.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      },
      {
        "t": "靠毁，白忙活一圈子",
        "f": "fy-lose-2.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      }
    ],
    "start": [
      {
        "t": "来来来，唠啥嗑，开整！",
        "f": "db-start-1.mp3",
        "who": "东北大姐",
        "dialect": "东北话"
      },
      {
        "t": "今儿咱谝着打，包客气",
        "f": "sx-start-1.mp3",
        "who": "陕西老姐",
        "dialect": "陕西话"
      },
      {
        "t": "今个咱斗两圈，白作假",
        "f": "fy-start-1.mp3",
        "who": "阜阳老哥",
        "dialect": "阜阳话"
      }
    ]
  }
};
