/* ------------------------------------------------------------------
   AIGameHub 本地增强层：纯游戏布局 + 浏览器全屏 + 打牌音效增强 + 中文报牌
   - 不修改上游任何源码，仅通过 index.html 额外引入本文件
   - 通过包裹 HTMLMediaElement.prototype.play 感知上游音效事件
   - 静态说明文字已全部迁往独立手册 manual.html，本页默认只显示棋盘
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var LS_KEY = "mahjongImmersive.v1";
  // immersive 常驻为 true：页面一打开就是纯游戏布局。
  // skin = 拟真牌桌；showtime = 胡牌全屏演出；两者都可单独关掉。
  var state = {
    sound: true, voice: true, volume: 0.95, immersive: true,
    skin: true, showtime: true, autopilot: false,
    // 长辈模式：出牌二次确认，单击只举牌、再点同一张才打出（防误点打错牌）
    elder: true
  };

  try {
    var saved = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    if (typeof saved.sound === "boolean") state.sound = saved.sound;
    if (typeof saved.voice === "boolean") state.voice = saved.voice;
    if (typeof saved.skin === "boolean") state.skin = saved.skin;
    if (typeof saved.showtime === "boolean") state.showtime = saved.showtime;
    if (typeof saved.autopilot === "boolean") state.autopilot = saved.autopilot;
    if (typeof saved.elder === "boolean") state.elder = saved.elder;
    if (typeof saved.volume === "number") state.volume = Math.max(0, Math.min(1, saved.volume));
  } catch (e) {}

  // 上游 settings 面板用 ?USE_SOUND=false 关音效，此时 playClip 根本不会调用，
  // 控制条必须同步显示「静音」，否则会显示「开」却听不到声音。
  var upstreamSoundOff = /(?:^|[?&])(?:USE_SOUND|use_sound)=false(?:&|$)/i.test(location.search);
  if (upstreamSoundOff) state.sound = false;

  function save() {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify({
          sound: state.sound, voice: state.voice, volume: state.volume,
          skin: state.skin, showtime: state.showtime, autopilot: state.autopilot,
          elder: state.elder
        }));
    } catch (e) {}
  }

  // ----------------------------------------------------------------
  // 电脑代玩：上游 HumanPlayer 继承自 BotPlayer，config.BOT_PLAY=true
  // 时真人回合直接由内置 AI 出牌/报牌，局间计分弹窗也会自动关闭
  // （modal.addFooter 的 botDismissible 逻辑），全程上游原生行为。
  // ----------------------------------------------------------------
  function cfgBridge() {
    var cfg = window.__mjConfigBridge;
    return cfg && typeof cfg.set === "function" ? cfg : null;
  }

  var botHooked = false;
  // 代玩演示速度：上游 BOT_PLAY_DELAY=50ms，AI 几乎瞬间打完整局，
  // 观战的人什么都看不清。代玩时放慢到 1.3s 一张（与报牌队列 ~1.05s
  // 节奏匹配，每张牌都能听清念到谁打的什么）；恢复手动时还原原速。
  // game.js 每个回合都实时读 config.BOT_PLAY_DELAY，改了立即生效。
  var paceDefault = null;
  var AUTOPILOT_PACE = 2300;
  // 兜底节奏：万一 CDN 边缘节点还缓存着旧版 game.js（没有 __mjPace
  // 门控），上游 PLAY_INTERVAL=100 会让三家 AI 半秒打完一圈，报牌根本
  // 来不及念。手动模式把它抬到一张报牌的长度；新版 game.js 由语音闸
  // 精确控速，会忽略这个值。代玩仍走自己的 2.3s。
  var MANUAL_PACE_FALLBACK = 1400;

  function applyAutopilot() {
    var cfg = cfgBridge();
    if (cfg) {
      try {
        if (paceDefault === null) {
          paceDefault = typeof cfg.BOT_PLAY_DELAY === "number" ? cfg.BOT_PLAY_DELAY : 50;
        }
        if (state.autopilot && !botHooked) {
          // 给 BOT_PLAY 挂访问器：上游在点「亲自打一局」时会把它重置为
          // false（play-or-watch.js），且发牌链路是同步的，来不及补救。
          // 代玩期间读取永远返回 true，写入存到后备变量，竞态彻底消失。
          botHooked = true;
          var backing = true;
          Object.defineProperty(cfg, "BOT_PLAY", {
            configurable: true,
            get: function () { return true; },
            set: function (v) { backing = v; }
          });
        }
        // 「失焦暂停」已整体移除，手动/代玩两种模式都恒关：
        // 牌桌失焦（点工具栏、设置、弹窗、切标签页）不再冻结对局。
        cfg.set({
          BOT_PLAY: state.autopilot,
          PAUSE_ON_BLUR: false,
          BOT_PLAY_DELAY: state.autopilot ? AUTOPILOT_PACE : paceDefault,
          PLAY_INTERVAL: state.autopilot ? 100 : MANUAL_PACE_FALLBACK
        });
        if (!state.autopilot && botHooked) {
          // 交还控制权：摘掉访问器，恢复普通属性（config.set 会跳过
          // undefined 的键，所以这里必须直接赋值）
          botHooked = false;
          delete cfg.BOT_PLAY;
          cfg.BOT_PLAY = false;
        }
      } catch (e) {}
    }
    if (document.body) document.body.classList.toggle("mj-autopilot", state.autopilot);
  }

  // 切换瞬间可能正卡在「等玩家选牌弃牌」：接管一次，点掉 AI 建议牌。
  // 报牌等待窗不用管——上游 CLAIM_INTERVAL 5 秒后自动过。
  function nudgeAutopilot() {
    setTimeout(function () {
      if (!state.autopilot) return;
      var tiles = document.querySelectorAll(".suggestion");
      for (var i = 0; i < tiles.length; i++) {
        var t = tiles[i];
        if (t.closest && t.closest(".discards")) continue; // 别人打出的牌的报牌提示，不是自己手牌
        try {
          t.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
          t.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        } catch (e) {}
        return;
      }
    }, 180);
  }

  function toggleAutopilot() {
    state.autopilot = !state.autopilot;
    applyAutopilot();
    if (state.autopilot) nudgeAutopilot();
    save();
    if (typeof syncToolbar === "function") syncToolbar();
    showToast(state.autopilot ? "🤖 电脑代玩中（慢速演示），随时点按钮接管" : "已切回手动打牌");
  }

  // buildToolbar 里赋值，供外部开关刷新按钮状态
  var syncToolbar = null;

  // 轻量提示条（showtime.js 的 toast 属于其内部作用域，这里独立一份）
  var hintTimer = null;
  function showToast(text) {
    var el = document.getElementById("mj-hint-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "mj-hint-toast";
      (document.body || document.documentElement).appendChild(el);
    }
    el.textContent = text;
    el.classList.add("mj-on");
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { el.classList.remove("mj-on"); }, 2400);
  }

  // 上游开局弹窗点「亲自打一局」时会把 BOT_PLAY 重置为 false
  // （play-or-watch.js: config.BOT_PLAY = result === "watch"），而且
  // 发牌是同步链路，会在我们的延时补救之前弹出「准备好开局了吗？」
  // 等待窗。所以双保险：点击后短时反复重新应用 + 自动点掉就绪等待窗。
  function guardAutopilotOnStart() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      var btn = t && t.closest ? t.closest("button") : null;
      if (!btn) return;
      if (!/亲自打一局|play some mahjong/i.test(btn.textContent || "")) return;
      if (!state.autopilot) return;
      var n = 0;
      var iv = setInterval(function () {
        applyAutopilot();
        if (++n >= 12) clearInterval(iv);
      }, 150);
    }, true);
  }

  // 代玩中自动点掉「准备好开局了吗？/ 准备重打这一局吗？」等待窗
  function autoDismissReadyDialogs() {
    if (!state.autopilot) return;
    var panels = document.querySelectorAll(".modal .panel");
    for (var i = 0; i < panels.length; i++) {
      var p = panels[i];
      if (p.__mjRules) continue; // 是我们自己注入的玩法选择，别乱点
      if (getComputedStyle(p).display === "none") continue;
      var head = p.querySelector("h1, h3");
      if (!head || !/准备好开局|准备重打|ready to (start|replay)/i.test(head.textContent || "")) continue;
      var btn = p.querySelector("button");
      if (btn) { btn.click(); return; }
    }
  }

  // ----------------------------------------------------------------
  // 玩法选择：上游 Ruleset 只有「中国古典 / 广东麻将」两种，
  // 规则在页面加载时定死，切换 = 带 ?rules= 参数重载重新开局。
  // ----------------------------------------------------------------
  var RULESETS = [
    { name: "Chinese Classical", label: "🀄 中国古典" },
    { name: "Cantonese", label: "🎋 广东麻将" },
    { name: "Fuyang Mahjong", label: "🐓 阜阳麻将" }
  ];

  function currentRules() {
    var m = /[?&]rules=([^&]+)/i.exec(location.search);
    if (m) {
      // 注意：URL 里 rules=Fuyang+Mahjong 的 + 号是空格编码，
      // decodeURIComponent 不解码 + 号，必须手动还原，
      // 否则「当前玩法」标记永远匹配不上（游戏本体走
      // URLSearchParams 能正确解码，两边会不一致）
      var raw = m[1].replace(/\+/g, " ");
      try { return decodeURIComponent(raw); } catch (e) { return raw; }
    }
    var cfg = cfgBridge();
    return (cfg && cfg.RULES) || "Chinese Classical";
  }

  function rulesLabel(name) {
    for (var i = 0; i < RULESETS.length; i++) {
      if (RULESETS[i].name === name) return RULESETS[i].label;
    }
    return name;
  }

  function gotoRules(name) {
    try {
      var u = new URL(location.href);
      u.searchParams.set("rules", name);
      location.href = u.toString();
    } catch (e) {
      location.href = "index.html?rules=" + encodeURIComponent(name);
    }
  }

  function buildRulesRow(cur) {
    var wrap = document.createElement("div");
    wrap.className = "mj-rules-choose";
    var head = document.createElement("div");
    head.className = "mj-rc-head";
    head.textContent = "玩法选择";
    wrap.appendChild(head);
    RULESETS.forEach(function (r) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = r.label + (r.name === cur ? "（当前）" : "");
      b.classList.toggle("mj-cur", r.name === cur);
      b.addEventListener("click", function () { gotoRules(r.name); });
      wrap.appendChild(b);
    });
    var hint = document.createElement("div");
    hint.className = "mj-rc-hint";
    hint.textContent = "点击即以此玩法重新洗牌开局";
    wrap.appendChild(hint);
    return wrap;
  }

  // 上游开局弹窗（我要亲自打一局 / 看机器人打）出现时，把玩法选择注进去
  function scanStartPanels() {
    var panels = document.querySelectorAll(".modal .panel");
    for (var i = 0; i < panels.length; i++) {
      var panel = panels[i];
      if (panel.__mjRules) continue;
      var btns = panel.querySelectorAll("button");
      for (var j = 0; j < btns.length; j++) {
        if (/亲自打一局|play some mahjong/i.test(btns[j].textContent || "")) {
          panel.__mjRules = true;
          panel.appendChild(buildRulesRow(currentRules()));
          break;
        }
      }
    }
  }

  var scanPending = false;
  var panelObserver = new MutationObserver(function () {
    if (scanPending) return;
    scanPending = true;
    requestAnimationFrame(function () {
      scanPending = false;
      try { scanStartPanels(); } catch (e) {}
      try { autoDismissReadyDialogs(); } catch (e) {}
    });
  });

  // 玩法切换浮层：中途换玩法用（会重载页面）
  function openRulesOverlay() {
    var ov = document.getElementById("mj-rules-overlay");
    if (ov) ov.remove();
    ov = document.createElement("div");
    ov.id = "mj-rules-overlay";
    var cur = currentRules();
    var card = document.createElement("div");
    card.className = "mj-ro-card";
    var title = document.createElement("h3");
    title.textContent = "选择玩法";
    card.appendChild(title);
    RULESETS.forEach(function (r) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = r.label + (r.name === cur ? "（当前）" : "");
      b.classList.toggle("mj-cur", r.name === cur);
      b.addEventListener("click", function () { gotoRules(r.name); });
      card.appendChild(b);
    });
    var note = document.createElement("p");
    note.className = "mj-ro-note";
    note.textContent = "规则在开局时确定：切换会重载页面并放弃当前对局。";
    card.appendChild(note);
    var cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "mj-ro-cancel";
    cancel.textContent = "取消";
    cancel.addEventListener("click", function () { ov.remove(); });
    card.appendChild(cancel);
    ov.appendChild(card);
    ov.addEventListener("click", function (e) { if (e.target === ov) ov.remove(); });
    document.body.appendChild(ov);
  }

  // ----------------------------------------------------------------
  // 音频引擎：解锁自动播放 + 预加载 + 合成落牌声
  // ----------------------------------------------------------------
  var AUDIO_FILES = [
    "click-01.mp3", "click-02.mp3", "click-03.mp3",
    "click-multi-01.mp3", "click-multi-02.mp3", "click-multi-03.mp3",
    "click-multi-large-01.mp3", "click-multi-large-02.mp3",
    "click2-01.mp3", "click2-02.mp3",
    "play-01.mp3", "play-02.mp3", "play-03.mp3", "play-04.mp3",
    "play-05.mp3", "play-06.mp3", "play-07.mp3",
    "draw.mp3", "end.mp3", "start.mp3", "win.mp3"
  ];

  var audioCtx = null;
  var unlocked = false;
  var noiseBuf = null;
  var voices = [];

  // ----------------------------------------------------------------
  // 固定中文报牌语音包 v2：voice/*.mp3 由 tools/gen_voice_pack.py 预生成。
  // map: 牌名 + 系统旁白（按文本查）；calls: 四位玩家各自的喊牌
  // （calls[pid][action] = [{t,f}]，每家音色不同）。命中即播离线音频，
  // 未命中才回退 speechSynthesis。
  // ----------------------------------------------------------------
  var packCache = {};
  var packAudio = null;
  var packPlayed = 0;
  var packFallback = 0;
  var lastFallback = "";

  // 长辈/移动端节奏：报牌串行播放，绝不「后一张掐掉前一张」。
  // voicePending = 已入队但还没播完的段数，game.js 靠它决定何时
  // 打下一张牌；voiceChain 是播放链，showtime.js 靠它排队下一条报牌。
  var voiceChain = Promise.resolve();
  var voicePending = 0;

  function packInfo() {
    var p = window.MJ_VOICE_PACK;
    return p && p.map ? p : null;
  }

  function packSrc(file) {
    var p = window.MJ_VOICE_PACK;
    return (p && p.base ? p.base : "voice/") + file;
  }

  // 首次用户手势时预热**整包**语音（含四家各自音色的牌名）。
  // 原先牌名按需 new Audio()，公网 CDN 首次要现连现下，等轮到这张牌
  // 时音频还没数据，播放被计时器掐断 → 手机上一整圈听不到报牌。
  // 全包 1.88MB / 248 个小文件，配合 Cloudflare 静态缓存，开局点按钮
  // 到第一张牌之间有足够的预热时间。
  function prewarmPack() {
    var p = packInfo();
    if (!p) return;
    function warm(f) {
      if (!f || packCache[f]) return;
      try {
        var a = new Audio(packSrc(f));
        a.preload = "auto";
        a.load();
        packCache[f] = a;
      } catch (e) {}
    }
    // map 里既有系统旁白也有统一牌名回退，全部预热
    Object.keys(p.map).forEach(function (text) { warm(p.map[text]); });
    if (p.calls) {
      Object.keys(p.calls).forEach(function (pid) {
        var set = p.calls[pid];
        Object.keys(set).forEach(function (action) {
          set[action].forEach(function (line) { warm(line.f); });
        });
      });
    }
    if (p.tilesByPid) {
      Object.keys(p.tilesByPid).forEach(function (pid) {
        var table = p.tilesByPid[pid];
        Object.keys(table).forEach(function (name) { warm(table[name]); });
      });
    }
  }

  // 播完一段才播下一段：返回 Promise，等 ended / error / 超时。
  // 超时按音频真实时长算，覆盖移动端首次按需加载的等待；万一浏览器
  // 拒绝自动播放或文件加载失败，也不会把整局游戏永久卡住。
  function playOne(a) {
    return new Promise(function (resolve) {
      var done = false, timer = 0, readyTimer = 0, armed = false;
      function finish() {
        if (done) return;
        done = true;
        clearTimeout(timer);
        clearTimeout(readyTimer);
        a.removeEventListener("ended", finish);
        a.removeEventListener("error", finish);
        voicePending = Math.max(0, voicePending - 1);
        resolve();
      }
      function arm() {
        if (done || armed) return;
        armed = true;
        var d = a.duration;
        // 已知时长按真实时长 + 收尾余量；未知（CDN 慢）给足 3.2s，
        // 别在音频还在缓冲时就把自己掐断。
        var ms = (d && isFinite(d) && d > 0.1)
          ? Math.min(3200, Math.round(d * 1000) + 600) : 3200;
        timer = setTimeout(function () {
          try { a.pause(); } catch (e) {} // 超时就掐掉，避免和下一段叠音
          finish();
        }, ms);
        a.addEventListener("ended", finish);
        a.addEventListener("error", finish);
        try { a.currentTime = 0; } catch (e) {}
        a.volume = Math.min(1, state.volume * 0.95 + 0.05);
        packAudio = a;
        try {
          var pr = a.play();
          // 自动播放策略拒绝时静默降级，不抛 unhandledrejection
          if (pr && typeof pr.catch === "function") pr.catch(finish);
        } catch (e) { finish(); }
      }
      // 等「真的有数据可播」再开始计时。公网首次按需加载时
      // loadedmetadata 会先到但数据未必够，原先 700ms 就 arm 会让
      // 计时器在音频还没出声时跑完，把每一句都掐断。
      if (a.readyState >= 2) arm();
      else {
        var go = function () { clearTimeout(readyTimer); arm(); };
        readyTimer = setTimeout(go, 1800);
        a.addEventListener("canplay", go, { once: true });
        a.addEventListener("loadeddata", go, { once: true });
        a.addEventListener("error", go, { once: true });
        try { a.load(); } catch (e) {}
      }
    });
  }

  function playFile(f) {
    try {
      var a = packCache[f];
      if (!a) {
        a = new Audio(packSrc(f));
        a.preload = "auto";
        packCache[f] = a;
      }
      voicePending++;
      voiceChain = voiceChain.then(function () { return playOne(a); });
      packPlayed++;
      return true;
    } catch (e) { return false; }
  }

  // 出牌节奏闸：game.js 每打一张牌前调用，等已入队的报牌全部念完。
  // maxMs 是硬上限——音频被浏览器拦截 / 静音 / 加载异常时游戏照常推进。
  function settleVoice(maxMs, minMs) {
    var t0 = Date.now();
    var floor = Math.max(0, minMs || 0);
    return new Promise(function (resolve) {
      (function check() {
        var elapsed = Date.now() - t0;
        if (elapsed >= maxMs || (elapsed >= floor && voicePending <= 0)) {
          resolve(elapsed);
          return;
        }
        setTimeout(check, 40);
      })();
    });
  }

  function playPack(text) {
    var p = packInfo();
    if (!p) return false;
    // DOM 里读到的牌名偶尔带空白，容错后再查表
    var key = String(text).trim();
    var f = p.map[text] || p.map[key];
    return f ? playFile(f) : false;
  }

  // 非关键报牌（逐张念牌名）自动节流，且语音忙时直接跳过，
  // 避免连打时语音排队、念的牌和桌面上的牌对不上
  function gate(opts) {
    opts = opts || {};
    var now = Date.now();
    if (!opts.priority && !opts.interrupt) {
      if (now - lastSayAt < 850) return false;
      if (packAudio && !packAudio.paused && !packAudio.ended) return false;
      try {
        if ("speechSynthesis" in window && window.speechSynthesis.speaking) return false;
      } catch (e) {}
    }
    lastSayAt = now;
    return true;
  }

  // 播某位玩家(pid "0"-"3")的喊牌动作：peng/chi/gang/hu/zimo。
  // 每家音色固定：你=活泼女声、电脑1=激情男声、电脑2=东北话、电脑3=陕西话；
  // 同一动作有多条台词时随机挑一条，未配置的动作回退通用播报。
  function sayFor(pid, action, opts) {
    opts = opts || {};
    if (!state.voice || !state.sound || !action) return false;
    var p = packInfo();
    var set = p && p.calls && p.calls[String(pid)];
    var lines = set && set[action];
    if (lines && lines.length) {
      if (!gate(opts)) return false;
      var line = lines[Math.floor(Math.random() * lines.length)];
      return playFile(line.f);
    }
    var GENERIC = { peng: "碰！", chi: "吃！", gang: "杠！", hu: "胡啦！", zimo: "自摸，胡啦！" };
    return say(GENERIC[action] || "", opts);
  }

  // 按玩家音色念牌名（v3 语音包：42 张牌 × 4 家）。
  // 谁打牌就用谁的嗓子念；未命中回退统一女声牌名，再回退 TTS。
  function sayTile(pid, text, opts) {
    opts = opts || {};
    if (!state.voice || !state.sound || !text) return false;
    var p = packInfo();
    var table = p && p.tilesByPid && p.tilesByPid[String(pid)];
    var f = table && (table[text] || table[String(text).trim()]);
    if (f) {
      if (!gate(opts)) return false;
      return playFile(f);
    }
    if (playPack(text)) return true; // 统一牌名回退
    return say(text, opts);
  }

  function ctx() {
    if (audioCtx) return audioCtx;
    var C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    try { audioCtx = new C(); } catch (e) { return null; }
    return audioCtx;
  }

  function resume() {
    var c = ctx();
    if (c && c.state === "suspended") { try { c.resume(); } catch (e) {} }
    return c;
  }

  // 浏览器自动播放策略：首次真实用户手势时解锁 Web Audio 并预热全部 mp3
  function unlock() {
    if (unlocked) return;
    unlocked = true;
    resume();
    AUDIO_FILES.forEach(function (f) {
      try {
        var a = new Audio("audio/" + f);
        a.preload = "auto";
        a.volume = 0;
        a.load();
      } catch (e) {}
    });
    prewarmPack();
    refreshVoices();
  }

  document.addEventListener("pointerdown", unlock, { capture: true });
  document.addEventListener("keydown", unlock, { capture: true });

  // 短促「啪」：白噪声瞬态 + 低频冲击，模拟麻将牌拍到桌面
  function slap(strength) {
    var c = resume();
    if (!c) return;
    var t = c.currentTime;
    var vol = state.volume * (strength || 1);
    if (vol <= 0) return;

    try {
      if (!noiseBuf) {
        var len = Math.floor(c.sampleRate * 0.05);
        noiseBuf = c.createBuffer(1, len, c.sampleRate);
        var d = noiseBuf.getChannelData(0);
        for (var i = 0; i < len; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
        }
      }
      var src = c.createBufferSource();
      src.buffer = noiseBuf;
      var hp = c.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1100;
      var g = c.createGain();
      g.gain.setValueAtTime(0.42 * vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      src.connect(hp); hp.connect(g); g.connect(c.destination);
      src.start(t); src.stop(t + 0.05);

      var osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(85, t + 0.07);
      var g2 = c.createGain();
      g2.gain.setValueAtTime(0.32 * vol, t);
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.075);
      osc.connect(g2); g2.connect(c.destination);
      osc.start(t); osc.stop(t + 0.08);
    } catch (e) {}
  }

  // 碰/吃的清脆双响（不使用语音，避免把「吃」误报成「碰」）
  function ding(count) {
    var c = resume();
    if (!c || state.volume <= 0) return;
    var t = c.currentTime;
    for (var n = 0; n < count; n++) {
      try {
        var o = c.createOscillator();
        o.type = "triangle";
        o.frequency.value = n % 2 ? 880 : 1180;
        var g = c.createGain();
        var at = t + n * 0.075;
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(0.16 * state.volume, at + 0.008);
        g.gain.exponentialRampToValueAtTime(0.001, at + 0.09);
        o.connect(g); g.connect(c.destination);
        o.start(at); o.stop(at + 0.1);
      } catch (e) {}
    }
  }

  function refreshVoices() {
    if (!("speechSynthesis" in window)) return;
    try { voices = window.speechSynthesis.getVoices() || []; } catch (e) { voices = []; }
  }
  if ("speechSynthesis" in window) {
    refreshVoices();
    try { window.speechSynthesis.addEventListener("voiceschanged", refreshVoices); } catch (e) {}
  }

  // ----------------------------------------------------------------
  // 中文报牌：优先挑系统里的「自然人声」，没有中文语音则静默降级
  // ----------------------------------------------------------------
  function pickVoice() {
    if (!voices.length) refreshVoices();
    var zh = voices.filter(function (v) { return /^(zh|cmn)/i.test(v.lang || ""); });
    if (!zh.length) return null;

    function score(v) {
      var n = ((v.name || "") + " " + (v.voiceURI || "")).toLowerCase();
      var s = 0;
      // Edge / Windows 11 的在线自然语音，最接近真人播报
      if (/natural|neural|online|xiaoxiao|xiaoyi|yunxi|yunyang|晓晓|晓/.test(n)) s += 100;
      // Chrome 自带的 Google 普通话/國語，听感明显好于系统 SAPI 拼接语音
      if (/google|普通话|國語|粤語|mandarin/i.test(n)) s += 90;
      // 系统自带的中文桌面语音（保底）
      if (/huihui|yaoyao|kangkang|ting-?ting|sinji/.test(n)) s += 40;
      if (/zh-cn|zh_cn|cmn-hans/i.test(v.lang || "")) s += 20;
      if (v.localService) s += 10;
      return s;
    }
    zh.sort(function (a, b) { return score(b) - score(a); });
    return zh[0];
  }

  var lastSayAt = 0;

  /**
   * 播一句中文（牌名 / 系统旁白）。优先播放 voice/ 下预生成的固定
   * 真人感音频包，未命中长句才回退系统 TTS。节流与「语音忙跳过」
   * 逻辑在 gate() 里，sayFor()（按玩家喊牌）共用同一套。
   * opts: { priority:true 强制打断, rate, pitch }
   */
  function say(text, opts) {
    opts = opts || {};
    if (!state.voice || !state.sound || !text) return false;
    if (!gate(opts)) return false;

    // 固定音频包命中：不再调用系统 TTS，音色每次都一致
    if (playPack(text)) return true;

    if (!("speechSynthesis" in window) || !window.SpeechSynthesisUtterance) return false;
    try {
      var zh = pickVoice();
      if (!zh) return false; // 系统没有中文语音时静默降级，不硬念
      if (opts.priority) window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN";
      u.voice = zh;
      u.rate = opts.rate || (0.98 + Math.random() * 0.12);
      u.pitch = opts.pitch || (0.96 + Math.random() * 0.14);
      u.volume = Math.min(1, state.volume * 0.92 + 0.08);
      window.speechSynthesis.speak(u);
      packFallback++;
      lastFallback = text;
      return true;
    } catch (e) { return false; }
  }

  function hush() {
    if (packAudio) {
      try { packAudio.pause(); packAudio.currentTime = 0; } catch (e) {}
    }
    if ("speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    // 静音 / 关报牌：立刻丢弃还没开口的语音，节奏闸也要能放行
    voiceChain = Promise.resolve();
    voicePending = 0;
  }

  function classify(file) {
    if (/^play-\d+\.mp3$/.test(file)) return "thud";
    if (/^click2?-\d+\.mp3$/.test(file)) return "discard";
    if (/^click-multi-large-\d+\.mp3$/.test(file)) return "kong";
    if (/^click-multi-\d+\.mp3$/.test(file)) return "multi";
    if (file === "win.mp3") return "win";
    if (file === "draw.mp3") return "draw";
    if (file === "end.mp3") return "end";
    if (file === "start.mp3") return "start";
    return null;
  }

  // 感知上游 playClip()：上游每次 cloneNode().play()，这里按文件名识别事件
  // 暴露给 showtime.js：语音、AudioContext、状态与基础音效
  var debug = {
    clips: [], state: state, say: say, sayFor: sayFor, sayTile: sayTile, audio: resume,
    slap: slap, ding: ding, hush: hush,
    voicePack: function () {
      var p = packInfo();
      var callCount = 0;
      if (p && p.calls) {
        Object.keys(p.calls).forEach(function (pid) {
          Object.keys(p.calls[pid]).forEach(function (a) {
            callCount += p.calls[pid][a].length;
          });
        });
      }
      return {
        loaded: !!p,
        entries: p ? Object.keys(p.map).length : 0,
        callLines: callCount,
        played: packPlayed,
        fallback: packFallback,
        lastFallback: lastFallback || null,
        current: packAudio ? packAudio.src : null,
        playing: !!(packAudio && !packAudio.paused && !packAudio.ended),
        at: packAudio ? Math.round((packAudio.currentTime || 0) * 100) / 100 : 0,
        dur: packAudio && packAudio.duration ? Math.round(packAudio.duration * 100) / 100 : 0,
        cached: Object.keys(packCache).length
      };
    }
  };
  window.__mjEnhance = debug;

  // 供 game.js（出牌节奏）与 showtime.js（报牌队列）共用的节拍接口。
  // settle: 等当前报牌念完，最多等 maxMs；quiet: 当前播放链，用于排队；
  // pending: 还没播完的段数，供验证与调试。
  window.__mjPace = {
    settle: settleVoice,
    quiet: function () { return voiceChain; },
    pending: function () { return voicePending; }
  };

  function onClip(kind, file) {
    if (debug.clips.length > 200) debug.clips.shift();
    debug.clips.push({ kind: kind, file: file, at: Date.now() });

    switch (kind) {
      case "thud":    slap(1.0); break;                 // 每手第一张：原有重拍 + 强调
      case "discard": slap(0.78); break;               // 后续打牌：补上一致的落牌声
      case "multi":   ding(2); break;                  // 碰 / 吃
      case "kong":    slap(1.0); ding(3); break;       // 杠：清脆三连
    }

    // 演出层订阅这个事件，负责胡牌动画、夸张音效与真人感报牌
    try {
      window.dispatchEvent(new CustomEvent("mj:clip", {
        detail: { kind: kind, file: file }
      }));
    } catch (e) {}
  }

  var nativePlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    var src = "";
    try { src = this.currentSrc || this.src || ""; } catch (e) {}
    if (!/\/audio\/[^/]+\.mp3(\?|$)/.test(src)) {
      return nativePlay.apply(this, arguments);
    }
    if (!state.sound) return Promise.resolve();

    try { this.volume = state.volume; } catch (e) {}

    var file = decodeURIComponent(src.split("?")[0].split("/").pop());
    var kind = classify(file);
    var result;
    try {
      result = nativePlay.call(this);
    } catch (e) {
      return Promise.resolve();
    }
    onClip(kind, file);
    // 吞掉自动播放策略抛出的 NotAllowedError，避免控制台 unhandledrejection
    if (result && typeof result.catch === "function") {
      return result.catch(function () {});
    }
    return result;
  };

  // ----------------------------------------------------------------
  // 纯游戏布局：棋盘按视口等比放大居中，默认常驻
  // ----------------------------------------------------------------
  var BASE_BOARD = 720; // 上游 .board = 45em，默认 html font-size 16px
  var fitPending = false;

  // 部分移动 WebView / 页面被缩放时，布局视口(window.innerWidth)会明显
  // 大于真正看得见的区域(visualViewport)。此时按 innerWidth 布局会让牌桌、
  // 弹窗、工具栏统统溢出屏幕右侧。统一以可见视口为准，并写进 CSS 变量，
  // 让 fixed 定位的元素也能用同一套尺寸。正常手机上两者相等，行为不变。
  function viewportSize() {
    var w = window.innerWidth, h = window.innerHeight;
    var vv = window.visualViewport;
    if (vv && vv.width > 0 && vv.height > 0) {
      w = Math.min(w, vv.width);
      h = Math.min(h, vv.height);
    }
    return { w: w, h: h };
  }

  function syncViewportVars() {
    var v = viewportSize();
    var root = document.documentElement;
    root.style.setProperty("--mj-vw", v.w.toFixed(1) + "px");
    root.style.setProperty("--mj-vh", v.h.toFixed(1) + "px");
  }

  function fit() {
    if (fitPending) return;
    fitPending = true;
    requestAnimationFrame(function () {
      fitPending = false;
      var root = document.documentElement;
      syncViewportVars();
      if (!document.body || !document.body.classList.contains("mj-immersive")) {
        root.style.fontSize = "";
        return;
      }
      var v = viewportSize();
      var narrow = v.w < 760;
      // 宽屏多留一点，给拟真牌桌的胡桃木外框（box-shadow 不占布局）
      var pad = narrow ? 22 : 56;
      var reserve = narrow ? 62 : 46; // 与 CSS 的 padding-top 保持一致
      var scale = Math.min(
        (v.w - pad) / BASE_BOARD,
        (v.h - pad - reserve) / BASE_BOARD
      );
      scale = Math.max(0.42, Math.min(scale, 2.4));
      root.style.fontSize = (16 * scale).toFixed(3) + "px";
    });
  }

  var fsBtn = null;

  function updateFsLabel() {
    if (!fsBtn) return;
    var on = !!document.fullscreenElement;
    fsBtn.textContent = on ? "⛶ 退出全屏" : "⛶ 全屏";
    fsBtn.classList.toggle("mj-on", on);
    fsBtn.setAttribute("aria-pressed", String(on));
  }

  function enterGameOnly() {
    state.immersive = true;
    document.body.classList.add("mj-immersive");
    document.body.classList.toggle("mj-table-skin", state.skin);
    fit();
  }

  function buildToolbar() {
    var bar = document.createElement("div");
    bar.id = "mj-toolbar";
    bar.innerHTML =
      '<a class="mj-link" id="mj-manual" href="manual.html" target="_blank" rel="noopener" title="打开游戏手册（快捷键 H）">📖 手册</a>' +
      '<button type="button" id="mj-fs" title="切换浏览器全屏（快捷键 F，Esc 退出）">⛶ 全屏</button>' +
      '<button type="button" id="mj-sound" title="开关全部音效（快捷键 M）">🔊 音效</button>' +
      '<button type="button" id="mj-voice" title="固定中文语音包报牌：单击开关、双击试听（快捷键 V）">🗣 报牌</button>' +
      '<button type="button" id="mj-elder" title="出牌二次确认：点一下举牌、再点一下才打出，防止误点打错牌（快捷键 E）">🔒 防误触</button>' +
      '<button type="button" id="mj-skin" title="切换拟真牌桌皮肤（快捷键 G）">🎴 牌桌</button>' +
      '<button type="button" id="mj-fx" title="开关胡牌全屏演出（快捷键 B）">🎉 演出</button>' +
      '<button type="button" id="mj-auto" title="电脑代玩：AI 替你出牌报牌，随时可接管（快捷键 A）">🤖 代玩</button>' +
      '<button type="button" id="mj-rules" title="切换玩法：中国古典 / 广东麻将 / 阜阳麻将（会重新开局）">🎮 玩法</button>' +
      '<span class="mj-sep"></span>' +
      '<input type="range" id="mj-volume" min="0" max="100" step="5" title="音量" aria-label="音量">' +
      '<span id="mj-volume-label"></span>' +
      '<span class="mj-sep"></span>' +
      '<a class="mj-credit" target="_blank" rel="nofollow noopener" href="https://github.com/Pomax/mahjong">Pomax</a>' +
      '<a class="mj-link" href="../../../index.html" title="返回 AIGameHub 游戏库">← 游戏库</a>';
    document.body.appendChild(bar);

    var badge = document.createElement("div");
    badge.id = "mj-autopilot-badge";
    badge.textContent = "🤖 电脑代玩中 · 按 A 或点工具条按钮接管";
    document.body.appendChild(badge);

    fsBtn = bar.querySelector("#mj-fs");
    var soundBtn = bar.querySelector("#mj-sound");
    var voiceBtn = bar.querySelector("#mj-voice");
    var elderBtn = bar.querySelector("#mj-elder");
    var skinBtn = bar.querySelector("#mj-skin");
    var fxBtn = bar.querySelector("#mj-fx");
    var autoBtn = bar.querySelector("#mj-auto");
    var rulesBtn = bar.querySelector("#mj-rules");
    // 当前玩法直接显示在顶栏按钮上：不点开弹窗也能一眼看到正在玩什么
    try {
      var shortRules = {
        "Chinese Classical": "中国古典",
        "Cantonese": "广东麻将",
        "Fuyang Mahjong": "阜阳麻将"
      };
      var curRules = currentRules();
      var curRulesLabel = shortRules[curRules] || curRules;
      rulesBtn.textContent = "🎮 " + curRulesLabel;
      rulesBtn.title = "切换玩法（当前：" + curRulesLabel + "；切换会重新开局）";
    } catch (e) {}
    var volInput = bar.querySelector("#mj-volume");
    var volLabel = bar.querySelector("#mj-volume-label");

    function syncUI() {
      soundBtn.textContent = state.sound ? "🔊 音效" : "🔇 静音";
      soundBtn.classList.toggle("mj-on", state.sound);
      soundBtn.classList.toggle("mj-off", !state.sound);
      voiceBtn.textContent = state.voice ? "🗣 报牌" : "🤫 报牌关";
      voiceBtn.classList.toggle("mj-on", state.voice && state.sound);
      voiceBtn.classList.toggle("mj-off", !state.voice || !state.sound);
      elderBtn.textContent = state.elder ? "🔒 防误触" : "🔓 防误触关";
      elderBtn.classList.toggle("mj-on", state.elder);
      elderBtn.classList.toggle("mj-off", !state.elder);
      skinBtn.textContent = state.skin ? "🎴 牌桌" : "🟩 原版";
      skinBtn.classList.toggle("mj-on", state.skin);
      skinBtn.classList.toggle("mj-off", !state.skin);
      fxBtn.textContent = state.showtime ? "🎉 演出" : "🚫 演出关";
      fxBtn.classList.toggle("mj-on", state.showtime);
      fxBtn.classList.toggle("mj-off", !state.showtime);
      autoBtn.textContent = state.autopilot ? "🤖 代玩中" : "🤖 代玩";
      autoBtn.classList.toggle("mj-on", state.autopilot);
      autoBtn.classList.toggle("mj-off", !state.autopilot);
      volInput.value = String(Math.round(state.volume * 100));
      volLabel.textContent = Math.round(state.volume * 100) + "%";
    }
    syncToolbar = syncUI;

    function previewVoice() {
      if (window.__mjShowtime && window.__mjShowtime.preview) {
        window.__mjShowtime.preview();
      }
    }

    fsBtn.addEventListener("click", function () {
      // 纯游戏布局常驻，这个按钮只负责切换浏览器真全屏
      if (document.fullscreenElement) {
        try { document.exitFullscreen(); } catch (e) {}
      } else {
        try {
          var p = document.documentElement.requestFullscreen();
          if (p && typeof p.then === "function") p.then(fit).catch(function () {});
        } catch (e) {}
      }
    });

    soundBtn.addEventListener("click", function () {
      state.sound = !state.sound;
      if (state.sound && upstreamSoundOff) {
        // 上游 config 在模块加载时已固定为关闭，去掉 URL 参数后重载才能恢复
        save();
        try {
          var u = new URL(window.location.href);
          u.searchParams.delete("USE_SOUND");
          u.searchParams.delete("use_sound");
          window.location.href = u.toString();
        } catch (e) {}
        return;
      }
      if (state.sound) { unlock(); resume(); }
      else {
        hush();
        // 连已经排程的 Web Audio 合成音一起掐掉，避免静音后还响两秒
        try { var c = ctx(); if (c && c.state === "running") c.suspend(); } catch (e) {}
      }
      save(); syncUI();
    });

    voiceBtn.addEventListener("click", function () {
      state.voice = !state.voice;
      if (!state.voice) hush();
      save(); syncUI();
    });

    elderBtn.addEventListener("click", function () {
      state.elder = !state.elder;
      if (!state.elder) clearElderArmed();
      save(); syncUI();
    });

    // 双击报牌按钮（或按 V）试听一句固定语音包
    voiceBtn.addEventListener("dblclick", function (e) {
      e.preventDefault();
      if (!state.voice || !state.sound) {
        state.voice = true;
        state.sound = true;
        unlock(); resume();
        save(); syncUI();
      }
      previewVoice();
    });

    skinBtn.addEventListener("click", function () {
      state.skin = !state.skin;
      document.body.classList.toggle("mj-table-skin", state.skin);
      save(); syncUI(); fit();
    });

    fxBtn.addEventListener("click", function () {
      state.showtime = !state.showtime;
      if (!state.showtime && window.__mjShowtime) window.__mjShowtime.finish();
      save(); syncUI();
    });

    autoBtn.addEventListener("click", toggleAutopilot);
    rulesBtn.addEventListener("click", openRulesOverlay);

    volInput.addEventListener("input", function () {
      state.volume = Math.max(0, Math.min(1, Number(volInput.value) / 100));
      save(); syncUI();
    });

    syncUI();
    enterGameOnly();
    updateFsLabel();
  }

  document.addEventListener("fullscreenchange", function () {
    var on = !!document.fullscreenElement;
    if (document.body) document.body.classList.toggle("mj-really-fullscreen", on);
    updateFsLabel(); // Esc 退出浏览器全屏后，纯游戏布局保持不变
    fit();
  });

  window.addEventListener("resize", fit);

  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = (e.key || "").toLowerCase();
    if (k === "f") { e.preventDefault(); fsBtn && fsBtn.click(); }
    else if (k === "h") {
      e.preventDefault();
      var manual = document.getElementById("mj-manual");
      if (manual) manual.click();
    }
    else if (k === "m") {
      e.preventDefault();
      var b = document.getElementById("mj-sound");
      b && b.click();
    }
    else if (k === "g" || k === "b") {
      e.preventDefault();
      var t2 = document.getElementById(k === "g" ? "mj-skin" : "mj-fx");
      t2 && t2.click();
    }
    else if (k === "a") {
      // A 键同时是游戏内的「左移选牌」：出牌/报牌等待中不抢这个键
      if (document.querySelector(".selectable")) return;
      e.preventDefault();
      var ab = document.getElementById("mj-auto");
      ab && ab.click();
    }
    else if (k === "e") {
      e.preventDefault();
      var eb = document.getElementById("mj-elder");
      eb && eb.click();
    }
    else if (k === "v") {
      e.preventDefault();
      if (window.__mjShowtime && window.__mjShowtime.preview) window.__mjShowtime.preview();
    }
  });

  // 可见视口变化（WebView 缩放、地址栏收放）未必触发 window.resize，
  // 单独监听一次，同步 CSS 变量并整体重排；正常视口下这些都是幂等的。
  function refreshViewport() {
    syncViewportVars();
    fit();
    try { updateTurnMarker(); } catch (e) {}
    try { syncMobileHand(); } catch (e) {}
  }
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", refreshViewport);
  }
  syncViewportVars();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      buildToolbar();
      buildElderGuard();
      buildMobileHand();
    });
  } else {
    buildToolbar();
    buildElderGuard();
    buildMobileHand();
  }

  // ----------------------------------------------------------------
  // 长辈模式①：出牌二次确认。上游单击手牌立即打出，老人手抖误点
  // 就回不来了。这里在 document 捕获阶段拦截：第一次点只「举牌」
  // （金色描边 + 气泡提示），再点同一张才真正放行打出；点别的牌则
  // 换举牌目标。只拦自己(id=0)手牌，不碰弃牌区声明窗和弹窗按钮。
  // ----------------------------------------------------------------
  var elderHint = null;

  function clearElderArmed() {
    // 包含手机「大手牌区」里的放大牌（div），不只是原牌 game-tile
    var armed = document.querySelectorAll(".mj-armed");
    for (var i = 0; i < armed.length; i++) armed[i].classList.remove("mj-armed");
    if (elderHint) elderHint.classList.remove("mj-on");
  }

  function elderGuardClick(evt) {
    if (!state.elder || !elderHint || evt.__mjForwarded) return;
    // 有弹窗开着（开局确认/结算/声明等）时不拦，避免干扰正常按钮点击
    if (document.querySelector(".modal:not(.hidden)")) return;
    // 手机大手牌区：点放大牌等价于点原牌，二次确认在放大牌上完成
    var bigTile = evt.target && evt.target.closest
      ? evt.target.closest("#mj-mobile-hand [data-mj-idx]") : null;
    var tile = (evt.target && evt.target.closest
      ? evt.target.closest("game-tile.selectable") : null) || bigTile;
    if (!tile) return;
    if (!bigTile) {
      var pEl = tile.closest(".player");
      if (!pEl || pEl.getAttribute("id") !== "0") return;
    }
    if (tile.classList.contains("mj-armed")) {
      // 第二次点击同一张：放行，上游正常打出
      tile.classList.remove("mj-armed");
      elderHint.classList.remove("mj-on");
      return;
    }
    // 第一次点击：拦下，改为举牌 + 提示
    evt.preventDefault();
    evt.stopPropagation();
    clearElderArmed();
    tile.classList.add("mj-armed");
    var r = tile.getBoundingClientRect();
    elderHint.style.left = (r.left + r.width / 2).toFixed(0) + "px";
    elderHint.style.top = Math.max(52, r.top - 10).toFixed(0) + "px";
    elderHint.classList.add("mj-on");
  }

  function buildElderGuard() {
    elderHint = document.createElement("div");
    elderHint.id = "mj-elder-hint";
    elderHint.textContent = "再点一下，打出这张牌";
    document.body.appendChild(elderHint);
    document.addEventListener("click", elderGuardClick, true);
  }

  // ----------------------------------------------------------------
  // 长辈模式② / 手机适配：竖屏时把「我的手牌」放大成屏幕底部一条大手牌区。
  // 不能把原牌 DOM 搬走——上游 getAvailableTiles() 是在 .player[id=0]
  // 里查 game-tile 的。所以用镜像 div（复用 [tile=N] 牌面 CSS）+ 点击转发：
  // 点放大牌 → 给原牌派发 mouseover(更新 highlight) + click(出牌)。
  // 长辈模式的二次确认在 document 捕获阶段作用于放大牌，放行后才转发。
  // 只在竖屏、且轮到你出牌（手牌出现 .selectable）时显示，声明窗/代玩/弹窗
  // 时自动隐藏，不干扰任何上游流程。
  // ----------------------------------------------------------------
  var mobileHand = null;
  var mobileOrigTiles = [];
  var mobileRaf = 0;

  function mobileHandEnabled() {
    // 手机/小屏（含横屏 844×390）都启用；桌面 1280 及以上保持原牌桌
    try {
      return window.innerWidth <= 900 || window.innerHeight <= 500;
    } catch (e) { return false; }
  }

  function buildMobileHand() {
    if (mobileHand) return;
    mobileHand = document.createElement("div");
    mobileHand.id = "mj-mobile-hand";
    mobileHand.setAttribute("aria-label", "放大手牌区");
    mobileHand.addEventListener("click", function (evt) {
      var big = evt.target && evt.target.closest
        ? evt.target.closest("[data-mj-idx]") : null;
      if (!big) return;
      var orig = mobileOrigTiles[parseInt(big.getAttribute("data-mj-idx"), 10)];
      if (!orig || !orig.isConnected) return;
      // 上游靠 mouseover 更新 currentTile，必须先派发，否则会打出别的牌
      try { orig.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); } catch (e) {}
      var click = new MouseEvent("click", { bubbles: true });
      click.__mjForwarded = true; // 别让二次确认把转发事件又拦一次
      orig.dispatchEvent(click);
    });
    document.body.appendChild(mobileHand);

    var bank = document.querySelector(".player[id='0']");
    function scheduleSync() {
      if (mobileRaf) return;
      mobileRaf = requestAnimationFrame(function () {
        mobileRaf = 0;
        syncMobileHand();
      });
    }
    if (bank) {
      var obs = new MutationObserver(scheduleSync);
      obs.observe(bank, {
        childList: true, subtree: true, attributes: true,
        attributeFilter: ["class", "tile", "locked", "hidden"]
      });
    }
    // 弹窗开/关不在手牌区里，另起一个观察器保证关弹窗后大牌区回来。
    // 只认 .modal 自身 class 变化，避免和大牌区自身 DOM 更新互相触发死循环。
    var modalObs = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var t = records[i].target;
        if (records[i].type === "attributes" && t.classList && t.classList.contains("modal")) {
          scheduleSync();
          return;
        }
      }
    });
    modalObs.observe(document.body, {
      childList: true, subtree: true, attributes: true,
      attributeFilter: ["class"]
    });
    window.addEventListener("resize", syncMobileHand);
    syncMobileHand();
  }

  function syncMobileHand() {
    if (!mobileHand) return;
    if (!mobileHandEnabled() || document.querySelector(".modal:not(.hidden)")) {
      document.body.classList.remove("mj-mobile-hand-on");
      return;
    }
    var bank = document.querySelector(".player[id='0']");
    var tiles = bank ? bank.querySelectorAll("game-tile.selectable") : [];
    if (!tiles.length) {
      document.body.classList.remove("mj-mobile-hand-on");
      mobileOrigTiles = [];
      return;
    }
    mobileOrigTiles = Array.prototype.slice.call(tiles);
    var frag = document.createDocumentFragment();
    // 托盘标题：竖屏时替代浮动指示牌，直接压在手牌上方（CSS 决定显隐）
    var title = document.createElement("div");
    title.id = "mj-mobile-hand-title";
    title.textContent = "▶ 该你出牌";
    frag.appendChild(title);
    mobileOrigTiles.forEach(function (t, i) {
      // 竖屏 7 列网格自动排成两行，横屏 14 列一行；无需手动插隔断
      var big = document.createElement("div");
      big.className = "mj-big-tile";
      big.setAttribute("tile", t.getAttribute("tile"));
      big.setAttribute("data-mj-idx", String(i));
      big.setAttribute("title", t.getAttribute("title") || "");
      ["highlight", "suggestion", "mj-armed", "latest"].forEach(function (c) {
        if (t.classList.contains(c)) big.classList.add(c);
      });
      frag.appendChild(big);
    });
    mobileHand.replaceChildren(frag);
    document.body.classList.add("mj-mobile-hand-on");
  }

  // ----------------------------------------------------------------
  // 回合指示：浮动指示牌直接贴在当前出牌玩家的座位旁
  // 上游只有 .playerbank 上的 subtle active 色块，用户反馈（老人视角）
  // 看不出轮到谁、也不想把视线挪到屏幕角落。这里监听 .player.active
  // 的类变化，在座位外侧放一个大字指示牌，视线不用离开牌桌。
  // 注意：.player 元素本身带座位旋转，指示牌放 .player 内会跟着歪，
  // 所以用 fixed 定位 + getBoundingClientRect 换算到屏幕坐标，
  // 文字始终正向。
  // ----------------------------------------------------------------
  var turnMarker = null;
  var TURN_TEXTS = ["该你出牌", "玩家 1 出牌", "玩家 2 出牌", "玩家 3 出牌"];
  var lastActivePid = null;

  function updateTurnMarker() {
    if (!turnMarker) return;
    var active = document.querySelector(".player.active");
    var pid = active ? parseInt(active.getAttribute("id"), 10) : NaN;
    if (isNaN(pid)) {
      turnMarker.classList.remove("mj-on");
      return;
    }
    // 换人了：清掉上一手的举牌状态；轮到你时语音喊一嗓子（长辈友好）
    if (pid !== lastActivePid) {
      lastActivePid = pid;
      clearElderArmed();
      if (pid === 0) say("该你出牌了", { rate: 0.95 });
      syncMobileHand();
    }
    var board = document.querySelector(".board");
    var seat = active.getBoundingClientRect();
    if (!board || !seat.width) {
      turnMarker.classList.remove("mj-on");
      return;
    }
    var br = board.getBoundingClientRect();
    var cx = br.left + br.width / 2, cy = br.top + br.height / 2;
    var sx = seat.left + seat.width / 2, sy = seat.top + seat.height / 2;
    var dx = sx - cx, dy = sy - cy;
    var len = Math.hypot(dx, dy) || 1;
    var ux = dx / len, uy = dy / len;
    // 座位条带在“向外”方向上的半宽 + 出界余量
    var extent = (seat.width * Math.abs(ux) + seat.height * Math.abs(uy)) / 2;
    var mx = sx + ux * (extent + 34);
    var my = sy + uy * (extent + 34);
    // 指示牌用 translate(-50%,-50%) 居中定位,这里按半宽/半高 clamp,
    // 保证四边都不裁切;顶部还要让开工具栏条带(#mj-toolbar z-index 9999
    // 盖过指示牌 9997)——否则玩家 2(顶部座位)的指示牌会被压进工具栏
    // 后面完全看不见(用户反馈:1→2 切换看不到提示)。
    turnMarker.textContent = "▶ " + TURN_TEXTS[pid];
    turnMarker.classList.toggle("mj-you", pid === 0);
    turnMarker.classList.add("mj-on");
    var halfW = (turnMarker.offsetWidth || 200) / 2;
    var halfH = (turnMarker.offsetHeight || 46) / 2;
    var minY = halfH + 4;
    var tb = document.getElementById("mj-toolbar");
    if (tb) {
      var tr = tb.getBoundingClientRect();
      if (tr.height > 0) minY = tr.bottom + halfH + 4;
    }
    var vs = viewportSize();
    mx = Math.max(halfW + 4, Math.min(vs.w - halfW - 4, mx));
    my = Math.max(minY, Math.min(vs.h - halfH - 4, my));
    // 手机横屏时牌桌被压得很小，贴底部座位的指示牌会正好盖住自己要点的手牌。
    // 横屏左右各有一大片空白，把指示牌挪到较宽那侧的空白带，不挡任何牌。
    if (vs.w > vs.h && vs.h < 560) {
      var coversBoard = !(mx + halfW < br.left || mx - halfW > br.right ||
                          my + halfH < br.top || my - halfH > br.bottom);
      if (coversBoard) {
        var rightGap = vs.w - br.right;
        var leftGap = br.left;
        if (Math.max(rightGap, leftGap) > halfW * 2 + 8) {
          mx = rightGap >= leftGap ? br.right + rightGap / 2 : leftGap / 2;
          my = vs.h / 2;
          mx = Math.max(halfW + 4, Math.min(vs.w - halfW - 4, mx));
        }
      }
    }
    turnMarker.style.left = mx.toFixed(0) + "px";
    turnMarker.style.top = my.toFixed(0) + "px";
  }

  function buildTurnIndicator() {
    turnMarker = document.createElement("div");
    turnMarker.id = "mj-turn-marker";
    turnMarker.setAttribute("aria-live", "polite");
    document.body.appendChild(turnMarker);
    var banks = document.querySelectorAll(".player");
    if (!banks.length) return;
    var obs = new MutationObserver(updateTurnMarker);
    banks.forEach(function (b) {
      obs.observe(b, { attributes: true, attributeFilter: ["class"] });
    });
    window.addEventListener("resize", updateTurnMarker);
    updateTurnMarker();
  }

  // ----------------------------------------------------------------
  // 彻底禁用「失焦暂停」的运行时兜底。
  // 上游 config.js / client-ui-master.js 是无版本参数的 ES module，
  // 浏览器或 CDN 可能仍缓存旧版；这里在带版本号的 immersive.js 里
  // 再加两层拦截，保证线上旧缓存也不会再出现 "GAME PAUSED"。
  // ----------------------------------------------------------------
  function disablePauseOnBlur() {
    // 1) 配置层：bridge 由 type=module 异步挂载，重试直到拿到为止
    var tries = 0;
    var forceConfig = function () {
      var cfg = cfgBridge();
      if (cfg) {
        try { cfg.set({ PAUSE_ON_BLUR: false }); } catch (e) {}
        try { cfg.PAUSE_ON_BLUR = false; } catch (e) {}
        // config 是 ES module 异步挂载的；拿到后补一次节奏配置，
        // 保证手动模式的 PLAY_INTERVAL 兜底一定生效。
        try { applyAutopilot(); } catch (e) {}
      }
      if ((!cfg || cfg.PAUSE_ON_BLUR !== false) && ++tries < 12) {
        setTimeout(forceConfig, 400);
      }
    };
    forceConfig();

    // 2) DOM 层：即便旧上游已给 .board 注册 blur→game.pause()，
    //    捕获阶段先拦掉，其后所有监听器都收不到这个事件。
    //    本函数在开局前执行，注册顺序一定早于 ClientUIMaster。
    var board = document.querySelector(".board");
    if (board && !board.__mjNoPauseBlur) {
      board.__mjNoPauseBlur = true;
      board.addEventListener("blur", function (evt) {
        evt.stopImmediatePropagation();
      }, true);
    }
  }

  // 开始弹窗注入玩法选择 + 应用记忆中的代玩状态
  function bootExtras() {
    disablePauseOnBlur();
    applyAutopilot();
    guardAutopilotOnStart();
    try { panelObserver.observe(document.body, { childList: true, subtree: true }); } catch (e) {}
    try { scanStartPanels(); } catch (e) {}
    try { buildTurnIndicator(); } catch (e) {}
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootExtras);
  } else {
    bootExtras();
  }
})();
