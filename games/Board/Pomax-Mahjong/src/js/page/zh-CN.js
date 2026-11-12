/* ------------------------------------------------------------------
   AIGameHub 本地中文化层（zh-CN）
   - 不修改上游任何源码，仅由 index.html 额外引入
   - 精确映射 + 变量正则 + 番种短语表，配合 MutationObserver 覆盖
     运行时生成的弹窗、HUD、结算表、设置面板与牌名提示
   - 只翻译「文本节点」和纯展示型属性，绝不改 <option>/<input> 的
     value 属性，避免破坏上游提交设置时依赖的英文值
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  // ----------------------------------------------------------------
  // 1. 精确映射：整句 / 按钮 / 表头
  // ----------------------------------------------------------------
  var EXACT = {
    // 首屏
    "Welcome! What would you like to do?": "欢迎！想怎么玩？",
    "There are currently two modes of play on offer:": "本游戏提供两种玩法：",
    "I'd like to play some mahjong!": "我要亲自打一局麻将",
    "I just want to watch the bots play": "看三家电脑自动对局",
    "Alternatively, you can modify the game settings:": "也可以先调整游戏设置：",
    "Change settings": "游戏设置",
    "Change theming": "外观主题",
    "(you can also open the settings during play)": "（对局中也能随时打开设置）",

    // 开局 / 重打
    "Ready to start playing?": "准备好开局了吗？",
    "Ready to replay hand?": "准备重打这一局吗？",
    "ready!": "开始！",

    // 杠牌确认
    "Absolutely": "确定杠！",
    "No, I have plans for those tiles": "不杠，这几张牌另有用处",

    // 手牌提示
    "latest tile": "刚摸到的牌",
    "Bot-recommended discard.": "电脑推荐打这张",

    // 宣告气泡
    "win!": "胡！",
    "kong!": "杠！",
    "pung!": "碰！",
    "chow!": "吃！",

    // 胡牌 / 吃碰杠选择
    "Declare win?": "要胡牌吗？",
    "You better believe it!": "当然胡！",
    "No, I think I can do better...": "不胡，还能做更大",
    "on second thought, never mind": "算了，不要了",
    "I'm declaring a kong": "我要杠牌",
    "I just won": "我胡了",
    "Declare a kong or win?": "要杠牌还是胡牌？",
    "What kind of claim are you making?": "这张牌要怎么吃碰？",
    "Ignore": "不要",
    "Chow (▮▯▯)": "吃（▮▯▯）",
    "Chow (▯▮▯)": "吃（▯▮▯）",
    "Chow (▯▯▮)": "吃（▯▯▮）",
    "Pung": "碰",
    "Kong": "杠",
    "Win": "胡",
    "Win by robbing a kong?": "要抢杠胡吗？",
    "Actually, it doesn't": "其实凑不成",
    "Pair": "将牌（对子）",
    "How does this tile make you win?": "这张牌怎么组成胡牌？",

    // 设置面板
    "Change the game settings": "游戏设置",
    "The follow settings change how the game works, but while\n        the first three options are related to playing the game,\n        all the other options are primarily intended for debugging.":
      "以下设置会改变游戏行为。前几项与对局体验有关，其余主要用于调试。",
    "Closing without saving": "不保存并关闭",
    "Rules": "计分规则",
    "🀄 Always show everyone's tiles": "🀄 始终亮出所有人的手牌",
    "✨ Highlight claimable discards": "✨ 高亮可吃碰的弃牌",
    "💬 Show bot play suggestions": "💬 显示电脑出牌建议",
    "🎵 Play sounds": "🎵 播放音效",
    "🟢 Start play immediately": "🟢 打开即直接开局",
    "⏸️ Pause game unless focused": "⏸️ 窗口失焦时暂停",
    "💻 Turn on debug mode": "💻 开启调试模式",
    "❌ Pretend previous round was a draw": "❌ 假装上一局流局",
    "📃 Generate game log after play": "📃 对局后生成日志",
    "Set game PRNG seed": "设置随机数种子",
    "Bot quick play threshold": "电脑速和阈值",
    "Delay (in ms) between player turns": "每位玩家出牌间隔（毫秒）",
    "Delay (in ms) before starting next hand": "下一局开始前的间隔（毫秒）",
    "Delay (in ms) for bots reacting to things": "电脑响应等待（毫秒）",
    "Delay (in ms) during full bot play": "全自动对局出牌间隔（毫秒）",
    "Set up a specific wall": "指定牌墙（调试）",
    "Play using these settings": "用这些设置开始游戏",
    "Reset to default settings": "恢复默认设置",

    // 外观 / 配色面板
    "Change the game theme": "更换外观主题",
    "Change CSS Colors": "调整界面配色",
    "Close": "关闭",
    "Background image": "桌面背景图",
    "Sidebar image": "侧边栏图片",
    "Player banks": "玩家手牌区底图",
    "Tileset": "牌面图案",
    "CSS colors": "界面配色",
    "Change...": "修改…",
    "pick...": "选择文件…",

    // 结算 / 计分
    "Game finished": "本局结束",
    "Back to the menu": "返回主菜单",
    "Play next hand": "开始下一局",
    "OK": "确定",
    "Back to the scores": "返回计分表",
    "details": "明细",
    "hand": "局数",
    "winner": "赢家",
    "points": "分数",
    "basic": "基本分",
    "doubles": "翻倍",
    "total": "合计",
    "win/loss": "得失分",
    "element": "番种",
    "winner, east": "赢家，庄家",
    "east": "东风",

    // 规则名（option 显示文本；value 属性保持英文原值不动）
    "Chinese Classical": "中国古典麻将",
    "Cantonese": "广东麻将",
    "true": "开",
    "false": "关",

    // 棋盘角落
    "settings...": "设置",
    "theme": "外观",
    "settings": "设置",
    "dbl": "倍",
    "faan": "番",
    // 上游对空白牌/花牌会生成 title="undefined"，中文化后不再暴露
    "undefined": ""
  };

  // ----------------------------------------------------------------
  // 2. 带变量的文案
  // ----------------------------------------------------------------
  var PATTERNS = [
    [/^(\d+) tiles left$/, "剩余 $1 张牌"],
    [/^round (\d+)$/i, "第 $1 圈"],
    [/^hand (\d+)$/i, "第 $1 局"],
    [/^rtr (\d+)$/i, "重打 $1"],
    [/^Scores for hand (\d+)$/, "第 $1 局计分"],
    [/^Score breakdown for player (\d+)$/, "玩家 $1 的番种明细"],
    [/^Declare kong \((.+?)\)\?$/, "要杠「$1」吗？"],
    [/^player (\d)$/, "玩家 $1"],
    [/^(\d+) dbl$/, "$1 倍"],
    [/^(\d+) faan$/, "$1 番"],
    [/^winner, east$/, "赢家，庄家"],
    [/^The follow settings[\s\S]*?debugging\.$/, "以下设置会改变游戏行为。前几项与对局体验有关，其余主要用于调试。"]
  ];

  // ----------------------------------------------------------------
  // 3. 牌名（TILE_NAMES / 番种明细括号里的牌名）
  // ----------------------------------------------------------------
  var CN_NUM = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  var TILE = {};
  ["bamboo", "characters", "dots"].forEach(function (suit, si) {
    var name = ["条子", "万子", "筒子"][si];
    for (var n = 1; n <= 9; n++) TILE[suit + " " + n] = CN_NUM[n - 1] + name.slice(0, 1);
  });
  Object.assign(TILE, {
    "east": "东风", "south": "南风", "west": "西风", "north": "北风",
    "green dragon": "青发", "red dragon": "红中", "white dragon": "白板",
    "flower 1": "兰", "flower 2": "梅", "flower 3": "竹", "flower 4": "菊",
    "season 1": "春", "season 2": "夏", "season 3": "秋", "season 4": "冬",
    "bamboo": "条子", "characters": "万子", "dots": "筒子",
    "winds": "风牌", "dragons": "箭牌", "honours": "字牌", "bonus": "花牌"
  });

  // ----------------------------------------------------------------
  // 4. 番种与零散词：按「长短语优先」顺序替换
  //    主要用于计分明细（上游 log 里的英文）与配色面板的 CSS 变量标签
  // ----------------------------------------------------------------
  var PHRASES = [
    [/pung or kong of each dragon/gi, "大三元（三箭刻/杠）"],
    [/pung or kong of three wind, pair of last wind/gi, "小四喜"],
    [/pung or kong of each wind/gi, "大四喜"],
    // 阜阳麻将计分短语（本地新增规则直接用中文，这两条是基类自带的英文）
    [/\bfor winning\b/gi, "分·胡牌底分"],
    [/Limit hand:/g, "满分牌型:"],
    [/winning with the last available wall tile/gi, "海底捞月"],
    [/winning with the last discard/gi, "河底捞鱼"],
    [/one suit \(([^)]+)\) and honours hand/g, "混一色（$1）"],
    [/clean one suit hand \(([^)]+)\)/g, "清一色（$1）"],
    [/pung of player's own wind/gi, "门风刻子"],
    [/kong of player's own wind/gi, "门风杠子"],
    [/pung of wind of the round/gi, "圈风刻子"],
    [/kong of wind of the round/gi, "圈风杠子"],
    [/fully concealed pung hand/gi, "四暗刻"],
    [/fully concealed hand/gi, "门前清"],
    [/terminals an honours hand/gi, "混幺九"],
    [/all terminals hand/gi, "全幺九"],
    [/all honours hand/gi, "字一色"],
    [/All kong hand/gi, "四杠子"],
    [/all pung hand/gi, "对对和"],
    [/little three dragons/gi, "小三元"],
    [/Three great scholars/gi, "大三元"],
    [/Little four winds/gi, "小四喜"],
    [/Big four winds/gi, "大四喜"],
    [/no flowers or seasons/gi, "无花无季"],
    [/own flower and season/gi, "本门花季"],
    [/having all flowers/gi, "满花"],
    [/having all seasons/gi, "满季"],
    [/no-point hand/gi, "无番和"],
    [/winning on a major pair/gi, "大将和"],
    [/winning on a pair/gi, "将牌和"],
    [/self-drawn win/gi, "自摸"],
    [/robbing a kong/gi, "抢杠胡"],
    [/chow hand/gi, "平和（全吃）"],
    [/pair of dragons/gi, "箭牌对子"],
    [/pair of own wind/gi, "门风对子"],
    [/pair of wind of the round/gi, "圈风对子"],
    [/pung of dragons/gi, "箭牌刻子"],
    [/kong of dragons/gi, "箭牌杠子"],
    [/pung of winds/gi, "风牌刻子"],
    [/kong of winds/gi, "风牌杠子"],
    [/pung of simples/gi, "中张刻子"],
    [/kong of simples/gi, "中张杠子"],
    [/pung of terminals/gi, "幺九刻子"],
    [/kong of terminals/gi, "幺九杠子"],
    [/pung of/gi, "刻子·"],
    [/kong of/gi, "杠子·"],
    [/pair of/gi, "对子·"],
    [/concealed/gi, "暗"],
    [/locked/gi, "明"],
    [/simples/gi, "中张"],
    [/terminals/gi, "幺九"],
    [/dragons/gi, "箭牌"],
    [/winds/gi, "风牌"],
    [/honours/gi, "字牌"],
    [/flowers/gi, "花牌"],
    [/seasons/gi, "季牌"],
    [/self drawn/gi, "自摸"],
    [/winner/gi, "赢家"],
    [/\bfaan\b/gi, "番"],
    [/\bdbl\b/gi, "倍"],
    [/\bdouble\b/gi, "倍"],
    [/\bdoubles\b/gi, "倍"],
    [/\bpoints\b/gi, "分"],
    [/\bpoint\b/gi, "分"],
    [/\bfor\b/gi, "·"],
    // 配色面板的 CSS 变量名（board-background → 棋盘背景）
    [/\bboard\b/gi, "棋盘"],
    [/\bbackground\b/gi, "背景"],
    [/\bsidebar\b/gi, "侧栏"],
    [/\btext\b/gi, "文字"],
    [/\bcolor\b/gi, "颜色"],
    [/\bcolors\b/gi, "颜色"],
    [/\btile\b/gi, "牌面"],
    [/\btiles\b/gi, "牌面"],
    [/\bplayer\b/gi, "玩家"],
    [/\bbank\b/gi, "手牌区"],
    [/\bbanks\b/gi, "手牌区"],
    [/\bshadow\b/gi, "阴影"],
    [/\bhighlight\b/gi, "高亮"],
    [/\bselectable\b/gi, "可选"],
    [/\blatest\b/gi, "最新"],
    [/\bpage\b/gi, "页面"],
    [/\bhtml\b/gi, "页面"],
    [/\bsecondary\b/gi, "次要"],
    [/\bmain\b/gi, "主"],
    [/\bplay\b/gi, "出牌"],
    [/\bborder\b/gi, "边框"],
    [/\bdenim\b/gi, "牛仔蓝"],
    [/\bwind\b/gi, "风位"],
    [/\bindicator\b/gi, "指示器"],
    [/\bof\b/gi, "之"]
  ];

  // 具体牌名规则预编译，长名优先（"bamboo 1" 必须先于 "bamboo"）
  var TILE_RULES = Object.keys(TILE)
    .sort(function (a, b) { return b.length - a.length; })
    .map(function (k) {
      var esc = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return [new RegExp("\\b" + esc + "\\b", "gi"), TILE[k]];
    });

  function translate(s) {
    if (!s || !/[A-Za-z]/.test(s)) return s;

    // 1) 整句精确命中直接返回，避免后续短语替换把译文再切开
    var key = s.trim();
    if (Object.prototype.hasOwnProperty.call(EXACT, key)) {
      return s.replace(key, EXACT[key]);
    }

    var t = s;
    // 2) 带数字的文案
    for (var i = 0; i < PATTERNS.length; i++) {
      t = t.replace(PATTERNS[i][0], PATTERNS[i][1]);
    }
    // 3) 番种短语（长→短），必须在具体牌名之前，否则 "pung of dragons" 会被拆散
    for (var j = 0; j < PHRASES.length; j++) {
      t = t.replace(PHRASES[j][0], PHRASES[j][1]);
    }
    // 4) 括号里残留的具体牌名，如 "bamboo 1" / "green dragon"
    if (/[A-Za-z]/.test(t)) {
      for (var k = 0; k < TILE_RULES.length; k++) {
        t = t.replace(TILE_RULES[k][0], TILE_RULES[k][1]);
      }
    }
    return t;
  }

  // ----------------------------------------------------------------
  // 5. DOM 遍历：只碰文本节点与纯展示属性
  // ----------------------------------------------------------------
  var SKIP = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CANVAS|SVG|IFRAME|CODE|PRE)$/;
  var ATTRS = ["title", "alt", "aria-label", "placeholder"];

  function translateNode(node) {
    if (node.nodeType === 3) {
      var before = node.nodeValue;
      var after = translate(before);
      if (after !== before) node.nodeValue = after;
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.tagName;
    if (SKIP.test(tag)) return;

    for (var a = 0; a < ATTRS.length; a++) {
      var name = ATTRS[a];
      if (!node.hasAttribute(name)) continue;
      var val = node.getAttribute(name);
      var out = translate(val);
      if (out !== val) {
        try { node.setAttribute(name, out); } catch (e) {}
      }
    }
    // 仅 button/submit/reset 的 value 是纯显示文本，可以安全翻译；
    // select / text / color / file 的 value 是数据，绝不动。
    if (tag === "INPUT" && /^(submit|reset|button)$/i.test(node.getAttribute("type") || "")) {
      var v = node.getAttribute("value");
      if (v) {
        var vo = translate(v);
        if (vo !== v) {
          try { node.setAttribute("value", vo); } catch (e) {}
        }
      }
    }
    for (var i = 0; i < node.childNodes.length; i++) translateNode(node.childNodes[i]);
  }

  // ----------------------------------------------------------------
  // 6. 静态区块：教程、footer、页面标题
  // ----------------------------------------------------------------
  // 静态长文说明已全部迁往独立手册 manual.html；游戏页只保留棋盘。
  // 上游 JS 不读取这些 section 的内容，清空即可，不会破坏任何功能。
  var STATIC_SECTIONS = ["tutorial", "explanation", "gameplay", "rules", "scoring", "this-game", "controls"];

  function replaceStatic() {
    STATIC_SECTIONS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.innerHTML = "";
        el.style.display = "none";
      }
    });

    // 署名与项目链接一并移到手册页，游戏页不再出现正文文字
    var footer = document.querySelector("footer");
    if (footer) footer.innerHTML = "";

    // 风位盘原为繁体「東」，统一成简体
    document.querySelectorAll(".windicator .player-wind, .windicator .wind-of-the-round")
      .forEach(function (el) { el.textContent = el.textContent.replace(/東/g, "东"); });

    document.documentElement.setAttribute("lang", "zh-CN");
    document.title = "四人麻将 · 全中文 | AIGameHub";
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "与三家电脑对手同桌打四人麻将，开局可选中国古典或广东规则，离开时可让电脑代玩。拟真牌桌、全屏胡牌演出、四位玩家各有音色的中文语音包，附独立游戏手册。原作 Pomax。");
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "四人麻将 · 全中文 | AIGameHub");
  }

  // ----------------------------------------------------------------
  // 7. 启动 + 动态 UI 监听
  // ----------------------------------------------------------------
  var observer = null;
  var OBS_OPTS = {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ["title", "alt", "aria-label", "placeholder", "value"]
  };

  function apply(root) {
    if (observer) observer.disconnect();
    translateNode(root || document.body);
    if (observer) {
      observer.takeRecords();
      observer.observe(document.body, OBS_OPTS);
    }
  }

  function boot() {
    replaceStatic();
    apply(document.body);

    observer = new MutationObserver(function (records) {
      if (!records.length) return;
      observer.disconnect();
      for (var i = 0; i < records.length; i++) {
        var m = records[i];
        if (m.type === "childList") {
          for (var j = 0; j < m.addedNodes.length; j++) translateNode(m.addedNodes[j]);
        } else if (m.type === "characterData") {
          translateNode(m.target);
        } else if (m.type === "attributes") {
          translateNode(m.target);
        }
      }
      observer.takeRecords();
      observer.observe(document.body, OBS_OPTS);
    });
    observer.observe(document.body, OBS_OPTS);

    // 兜底：模块脚本与首局渲染完成后再全量扫一遍
    [300, 1200, 3000].forEach(function (ms) { setTimeout(function () { apply(document.body); }, ms); });

    window.__mjZh = { translate: translate, apply: apply, phrases: EXACT };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
