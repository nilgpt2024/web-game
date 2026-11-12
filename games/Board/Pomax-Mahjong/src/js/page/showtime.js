/* ------------------------------------------------------------------
   AIGameHub 本地增强层 2：胡牌演出 + 夸张音效 + 真人感中文报牌
   - 完全不修改上游源码/规则：只监听 immersive.js 派发的 mj:clip 事件
     （上游每次 playClip() 播放 mp3 时都会派发一次），并只读 DOM
  - 音效全部用 Web Audio 现场合成，不新增任何音频文件
  - 语音优先播 voice/ 下预生成的固定中文语音包；四位玩家各有自己的
    音色（你=活泼女声、电脑1=激情男声、电脑2=东北话、电脑3=陕西话），
    碰/吃/杠/胡按响应者或赢家播对应音色，未命中才回退系统 TTS
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var E = window.__mjEnhance;
  if (!E) return; // 基础增强层未加载时不启动，避免报错

  var state = E.state;
  var say = E.say;
  // 按玩家喊牌（每家音色不同）；基础层未提供 sayFor 时降级为普通播报
  var sayFor = E.sayFor || function (pid, action, opts) {
    var G = { peng: "碰！", chi: "吃！", gang: "杠！", hu: "胡啦！", zimo: "自摸，胡啦！" };
    return say(G[action] || "", opts);
  };
  // 按玩家音色念牌名（v3 语音包）；基础层未提供时降级为统一女声
  var sayTile = E.sayTile || function (pid, text, opts) { return say(text, opts); };
  // 阜阳牌桌俚语（基础层未加载时静默跳过）
  var chatter = E.chatter || function () {};
  var audio = E.audio;

  // ----------------------------------------------------------------
  // 0. 小工具
  // ----------------------------------------------------------------
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function $(sel) { return document.querySelector(sel); }

  var CN_NUM = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  var WINDS = ["东风", "南风", "西风", "北风"];
  var DRAGONS = ["青发", "红中", "白板"];
  var BONUS = ["兰", "梅", "竹", "菊", "春", "夏", "秋", "冬"];

  function tileName(n) {
    n = parseInt(n, 10);
    if (isNaN(n) || n < 0) return "";
    if (n < 9) return CN_NUM[n] + "索";
    if (n < 18) return CN_NUM[n - 9] + "万";
    if (n < 27) return CN_NUM[n - 18] + "筒";
    if (n < 31) return WINDS[n - 27];
    if (n < 34) return DRAGONS[n - 31];
    return BONUS[n - 34] || "";
  }

  // 上游 playClip() 先响、弃牌 DOM 后插入，因此延后一小会儿再读牌名
  function lastDiscardName() {
    var list = document.querySelectorAll(".discards game-tile.discard");
    var t = list[list.length - 1];
    return t ? tileNameFrom(t) : "";
  }

  // 从弃牌元素读牌名（zh-CN 层翻过的 title 优先，否则按 tile 号反查）
  function tileNameFrom(t) {
    var title = (t.getAttribute("title") || "").trim();
    if (title && !/^[a-z]/i.test(title)) return title;
    return tileName(t.getAttribute("tile"));
  }

  // 最后一张弃牌是谁打的（弃牌元素带 from="玩家号"）
  function lastDiscardPid() {
    var list = document.querySelectorAll(".discards game-tile.discard");
    var t = list[list.length - 1];
    return t ? (t.getAttribute("from") || "0") : "0";
  }

  function winnerLabel() {
    var w = $(".players .player.winner");
    if (!w) return "有人胡了";
    var id = w.getAttribute("id");
    return id === "0" ? "你胡了" : "电脑 " + id + " 胡了";
  }

  // ----------------------------------------------------------------
  // 1. Web Audio 合成：锣 / 鼓 / 金币 / 掌声 / 鞭炮 / 五声音阶号角
  //    所有音量都跟随工具条音量，静音时整体不发声
  // ----------------------------------------------------------------
  var noise = null;

  function noiseBuffer(c) {
    if (noise && noise.sampleRate === c.sampleRate) return noise;
    var len = Math.floor(c.sampleRate * 2);
    noise = c.createBuffer(1, len, c.sampleRate);
    var d = noise.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return noise;
  }

  function gain(c, t, peak, attack, decay) {
    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    g.connect(c.destination);
    return g;
  }

  function tone(c, t, freq, dur, peak, type) {
    var o = c.createOscillator();
    o.type = type || "triangle";
    o.frequency.setValueAtTime(freq, t);
    var g = gain(c, t, peak, 0.008, dur);
    o.connect(g);
    o.start(t);
    o.stop(t + dur + 0.03);
    return o;
  }

  // 铜锣：失谐泛音 + 一层噪声，长尾衰减
  function gong(c, t, v) {
    [196, 293, 412, 587, 743].forEach(function (f, i) {
      tone(c, t, f * (1 + (i % 2 ? 0.006 : -0.004)), 2.4 - i * 0.22, v * 0.16 / (1 + i * 0.5), "sine");
    });
    var s = c.createBufferSource();
    s.buffer = noiseBuffer(c);
    var bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1500;
    bp.Q.value = 0.8;
    var g = gain(c, t, v * 0.20, 0.004, 1.1);
    s.connect(bp); bp.connect(g);
    s.start(t); s.stop(t + 1.2);
  }

  // 大鼓：低频快速下滑 + 一记拍击
  function drum(c, t, v) {
    var o = c.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(190, t);
    o.frequency.exponentialRampToValueAtTime(58, t + 0.16);
    var g = gain(c, t, v * 0.44, 0.004, 0.26);
    o.connect(g); o.start(t); o.stop(t + 0.3);

    var s = c.createBufferSource();
    s.buffer = noiseBuffer(c);
    var lp = c.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 900;
    var g2 = gain(c, t, v * 0.14, 0.002, 0.09);
    s.connect(lp); lp.connect(g2);
    s.start(t); s.stop(t + 0.1);
  }

  // 铜钱叮当：高频双音，连成一串
  function coins(c, t, v, count) {
    for (var i = 0; i < count; i++) {
      var at = t + i * 0.075;
      var f = 1400 + Math.random() * 900;
      tone(c, at, f, 0.22, v * 0.075, "triangle");
      tone(c, at + 0.006, f * 1.5, 0.16, v * 0.035, "sine");
    }
  }

  // 掌声：带随机峰值的宽带噪声
  function applause(c, t, v, dur) {
    var s = c.createBufferSource();
    s.buffer = noiseBuffer(c);
    var bp = c.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 2100; bp.Q.value = 0.5;
    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    for (var i = 0; i < 22; i++) {
      var at = t + Math.random() * dur;
      g.gain.setValueAtTime(v * (0.07 + Math.random() * 0.09), at);
      g.gain.exponentialRampToValueAtTime(v * 0.02, at + 0.05);
    }
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(bp); bp.connect(g); g.connect(c.destination);
    s.start(t); s.stop(t + dur + 0.05);
  }

  // 鞭炮：短促爆裂脉冲串
  function firecrackers(c, t, v) {
    for (var i = 0; i < 7; i++) {
      var at = t + i * 0.085 + Math.random() * 0.03;
      var s = c.createBufferSource();
      s.buffer = noiseBuffer(c);
      var hp = c.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 2200;
      var g = gain(c, at, v * 0.17, 0.001, 0.055);
      s.connect(hp); hp.connect(g);
      s.start(at); s.stop(at + 0.07);
    }
  }

  // 五声音阶上行号角（宫商角徵羽），欢乐麻将式「登基」感
  function fanfare(c, t, v) {
    [523.25, 587.33, 659.25, 783.99, 880, 1046.5].forEach(function (f, i) {
      var at = t + i * 0.11;
      tone(c, at, f, 0.42, v * 0.11, "triangle");
      tone(c, at, f / 2, 0.42, v * 0.05, "sine");
    });
  }

  // 整套胡牌音效：上游 win.mp3 照常播放，这里再叠一层夸张演出
  function fxWin(bloom) {
    if (!state.sound) return;
    var c = audio();
    if (!c) return;
    var v = state.volume;
    if (v <= 0) return;
    try {
      var t = c.currentTime + 0.02;
      gong(c, t, v);
      drum(c, t + 0.02, v);
      drum(c, t + 0.19, v * 0.8);
      drum(c, t + 0.34, v * 0.7);
      fanfare(c, t + 0.20, v);
      coins(c, t + 0.48, v, bloom ? 14 : 9);
      applause(c, t + 0.52, v, 2.0);
      firecrackers(c, t + 0.95, v);
      if (bloom) {
        gong(c, t + 0.78, v * 0.75);
        coins(c, t + 1.35, v, 8);
      }
    } catch (e) {}
  }

  function fxSmall(kind) {
    if (!state.sound) return;
    var c = audio();
    if (!c || state.volume <= 0) return;
    try {
      var t = c.currentTime + 0.01;
      if (kind === "draw") {
        tone(c, t, 330, 0.5, state.volume * 0.12, "sine");
        tone(c, t + 0.16, 262, 0.6, state.volume * 0.1, "sine");
      } else if (kind === "end") {
        fanfare(c, t, state.volume * 0.75);
        coins(c, t + 0.6, state.volume, 6);
      } else if (kind === "start") {
        tone(c, t, 660, 0.18, state.volume * 0.1, "triangle");
        tone(c, t + 0.13, 880, 0.28, state.volume * 0.1, "triangle");
      }
    } catch (e) {}
  }

  // ----------------------------------------------------------------
  // 2. 结算数据：只读 DOM，不碰规则对象
  // ----------------------------------------------------------------
  function readScores() {
    var panel = $(".modal .panel.scores");
    if (!panel) return null;
    var table = panel.querySelector("table");
    if (!table) return null;

    var rows = Array.prototype.slice.call(table.querySelectorAll("tr"));
    var totalRow = null, deltaRow = null, basicRow = null, dblRow = null;
    var winnerCol = -1;

    rows.forEach(function (r) {
      var cells = Array.prototype.slice.call(r.querySelectorAll("td, th"));
      if (!cells.length) return;
      var label = (cells[0].textContent || "").trim().toLowerCase();
      if (label === "合计" || label === "total") totalRow = cells;
      else if (label === "得失分" || label === "win/loss") deltaRow = cells;
      else if (label === "基本分" || label === "分数" || label === "basic" || label === "points") basicRow = cells;
      else if (label === "翻倍" || label === "doubles") dblRow = cells;
      else if (label === "赢家" || label === "winner") {
        for (var i = 1; i < cells.length; i++) {
          if ((cells[i].textContent || "").indexOf("*") > -1) winnerCol = i;
        }
      }
    });

    if (winnerCol < 0) {
      var w = $(".players .player.winner");
      if (w) winnerCol = parseInt(w.getAttribute("id"), 10) + 1;
    }
    if (winnerCol < 1) winnerCol = 1;

    var cell = function (row) {
      return row && row[winnerCol] ? (row[winnerCol].textContent || "").trim() : "";
    };
    var total = cell(totalRow);
    var delta = cell(deltaRow);
    var basic = cell(basicRow);
    var dbl = cell(dblRow);

    var fan = "下方计分表可查看番种明细";
    if (total) {
      fan = "本局合计 " + total + " 分";
      if (basic) fan = "基本分 " + basic + (dbl ? " × " + dbl + " 倍" : "") + " → " + total + " 分";
    }
    return { total: total, delta: delta, fan: fan, winnerId: winnerCol - 1 };
  }

  function labelFor(id) {
    if (typeof id !== "number" || id < 0) return null;
    return id === 0 ? "你胡了" : "电脑 " + id + " 胡了";
  }

  // 结算面板出现后把分数与赢家补进横幅（演出层结束后就不再改动 DOM）
  function applyResult(res) {
    if (!layer || !res) return;
    var scoreEl = layer.querySelector(".mj-score");
    var fanEl = layer.querySelector(".mj-fan");
    if (res.delta) rollScore(scoreEl, res.delta);
    else if (res.total) rollScore(scoreEl, "+" + res.total);
    else scoreEl.textContent = "";
    fanEl.textContent = res.fan;
    var label = labelFor(res.winnerId);
    if (label) layer.querySelector(".mj-kicker").textContent = label + " · 恭喜";
  }

  // 数字滚动，制造「分数往上跳」的感觉
  function rollScore(el, text) {
    var m = /^([+-]?)\s*(\d+)/.exec(text || "");
    if (!m) { el.textContent = text || ""; return; }
    var sign = m[1] || "+";
    var target = parseInt(m[2], 10);
    if (!isFinite(target)) { el.textContent = text; return; }
    var t0 = performance.now();
    var dur = 700;
    function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = sign + Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ----------------------------------------------------------------
  // 3. 演出层 DOM + 礼花粒子
  // ----------------------------------------------------------------
  var layer = null, canvas = null, toast = null;
  var raf = 0, hideTimer = 0, resultPending = false;

  function build() {
    layer = document.createElement("div");
    layer.id = "mj-showtime";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML =
      '<div class="mj-veil"></div>' +
      '<div class="mj-flash"></div>' +
      '<div class="mj-rays"></div>' +
      '<div class="mj-stamp"></div>' +
      '<canvas></canvas>' +
      '<div class="mj-banner">' +
      '  <div class="mj-kicker"></div>' +
      '  <div class="mj-title">胡</div>' +
      '  <div class="mj-sub"></div>' +
      '  <div class="mj-score"></div>' +
      '  <div class="mj-fan"></div>' +
      '</div>' +
      '<div class="mj-hint">点击任意处跳过</div>';
    document.body.appendChild(layer);
    canvas = layer.querySelector("canvas");

    toast = document.createElement("div");
    toast.id = "mj-toast";
    document.body.appendChild(toast);

    // 演出时点一下就收起，不打断上游弹窗
    document.addEventListener("pointerdown", function () {
      if (layer.classList.contains("mj-active")) finish();
    }, { capture: true });

    // 结算面板是异步生成的，出现后把分数补进横幅
    new MutationObserver(function () {
      if (!resultPending) return;
      var res = readScores();
      if (!res) return;
      resultPending = false;
      applyResult(res);
    }).observe(document.body, { childList: true, subtree: true, characterData: true });

    // 全桌报牌：上游只给真人玩家的 UI 播落牌音效（AI 出牌静默），
    // 所以逐张念牌改为监听弃牌堆 DOM——任何一家打出牌都会插入
    // <game-tile class="discard" from="玩家号">，在这里统一报牌。
    // 弃牌元素同步入队，播报时直接从元素读牌名/出牌人（元素一直在
    // 弃牌堆里，无竞态）。关键是**不按固定定时抢播**：牌名音频实测
    // 1.1~1.4s，原先每 1.05s 塞下一条会把上一句掐成碎片，四家一圈
    // 打完只听得见半句。现在跟着 immersive 的语音链走，等这一句
    // 真正 ended 再念下一句；音频不可用时 quiet() 立即 resolve，
    // 由 140ms 呼吸间隔兜底。
    var voiceQueue = [];
    var queueBusy = false;
    function drainVoiceQueue() {
      if (!voiceQueue.length) { queueBusy = false; return; }
      queueBusy = true;
      var el = voiceQueue.shift();
      var pid = el.getAttribute("from") || "0";
      var name = tileNameFrom(el);
      if (name) sayTile(pid, name, { rate: 1.16, pitch: 1.0, interrupt: true });
      var P = window.__mjPace;
      var wait = P && typeof P.quiet === "function" ? P.quiet() : null;
      if (wait && typeof wait.then === "function") {
        wait.then(function () { setTimeout(drainVoiceQueue, 140); });
      } else {
        setTimeout(drainVoiceQueue, 1050); // 老版增强层：保留原节奏
      }
    }
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var nodes = records[i].addedNodes;
        for (var j = 0; j < nodes.length; j++) {
          var n = nodes[j];
          if (n.nodeType !== 1 || !n.matches || !n.matches("game-tile.discard") ||
              !n.closest || !n.closest(".discards")) continue;
          var tail = voiceQueue[voiceQueue.length - 1];
          if (tail === n) continue; // 同一张牌的重复触发
          voiceQueue.push(n);
          // 节奏已由语音闸控速，正常不会积压；放宽上限，别再把
          // 玩家自己打的那张牌挤出队列（原上限 3 会丢最老一张）。
          if (voiceQueue.length > 8) voiceQueue.shift();
          if (!queueBusy) drainVoiceQueue();
        }
      }
    }).observe(document.body, { childList: true, subtree: true });

    // 碰/吃/杠公告观察器：正常模式下游为每一家（含 AI）的喊牌渲染
    // .announcement[data-player]，出现即按该玩家的音色喊（胡牌公告
    // 走 win 音效事件链路，这里跳过避免双报）
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var nodes = records[i].addedNodes;
        for (var j = 0; j < nodes.length; j++) {
          var n = nodes[j];
          if (n.nodeType !== 1 || !n.matches || !n.matches(".announcement[data-player]")) continue;
          var s = (n.textContent || "").trim();
          // zh-CN 层会把公告同步翻成中文（碰！/吃！/杠！/胡！），中英文都要认；
          // 胡牌公告走 win 音效事件链路，这里跳过避免双报
          if (/胡|win/i.test(s)) continue;
          var kind = /杠|kong/i.test(s) ? "kong" : /碰|pung/i.test(s) ? "pung" : /吃|chow/i.test(s) ? "chow" : null;
          if (!kind) continue;
          handleClaim(kind, n.getAttribute("data-player"));
        }
      }
    }).observe(document.body, { childList: true, subtree: true });

    // 上游若关掉「每局结算弹窗」就没有计分表可读，给个兜底文案
    window.setTimeout(function () {
      if (!resultPending) return;
      var fanEl = layer.querySelector(".mj-fan");
      if (fanEl && fanEl.textContent.indexOf("结算中") === 0) {
        fanEl.textContent = "本局已结算 · 成绩见四角分数";
      }
    }, 3400);
  }

  function startConfetti(bloom) {
    if (!canvas) return;
    var ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var W = window.innerWidth, H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);

    var colors = ["#ffd45e", "#ff9b2f", "#e8452f", "#fff2cf", "#ff6b3d"];
    var parts = [];
    var count = bloom ? 230 : 160;
    for (var i = 0; i < count; i++) {
      var fromLeft = i % 2 === 0;
      parts.push({
        x: fromLeft ? -20 - Math.random() * 90 : W + 20 + Math.random() * 90,
        y: H * (0.18 + Math.random() * 0.42),
        vx: (fromLeft ? 1 : -1) * (3.2 + Math.random() * 7.5),
        vy: -5 - Math.random() * 7,
        w: 5 + Math.random() * 9,
        h: 3 + Math.random() * 7,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.28,
        round: Math.random() < 0.22,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    var t0 = performance.now();
    cancelAnimationFrame(raf);
    function frame(now) {
      var dt = Math.min(2.2, (now - (frame.last || now)) / 16.67);
      frame.last = now;
      ctx2d.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.vy += 0.17 * dt;
        p.vx *= 0.995;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        if (p.y > H + 30) return;
        ctx2d.save();
        ctx2d.translate(p.x, p.y);
        ctx2d.rotate(p.rot);
        ctx2d.fillStyle = p.color;
        ctx2d.globalAlpha = 0.92;
        if (p.round) {
          ctx2d.beginPath();
          ctx2d.arc(0, 0, p.w / 1.5, 0, Math.PI * 2);
          ctx2d.fill();
          ctx2d.strokeStyle = "rgba(120,60,0,.45)";
          ctx2d.lineWidth = 1;
          ctx2d.stroke();
        } else {
          ctx2d.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx2d.restore();
      });
      if (now - t0 < 3200) raf = requestAnimationFrame(frame);
      else ctx2d.clearRect(0, 0, W, H);
    }
    raf = requestAnimationFrame(frame);
  }

  function finish() {
    if (!layer || !layer.classList.contains("mj-active")) return;
    layer.classList.remove("mj-active");
    layer.classList.add("mj-leaving");
    document.body.classList.remove("mj-shake", "mj-showing");
    resultPending = false;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      layer.classList.remove("mj-leaving");
      var c = canvas.getContext("2d");
      if (c) c.clearRect(0, 0, canvas.width, canvas.height);
    }, 420);
  }

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("mj-on");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(hideToast, 2200);
  }

  function hideToast() {
    clearTimeout(showToast.timer);
    if (toast) toast.classList.remove("mj-on");
  }

  function showWin(bloom) {
    if (!state.showtime) return;
    if (!layer) return;
    clearTimeout(hideTimer);
    layer.classList.remove("mj-leaving");
    layer.dataset.mode = bloom ? "kong-bloom" : "win";

    hideToast(); // 别让上一条「杠 !」压在胡牌大字上
    layer.querySelector(".mj-kicker").textContent = winnerLabel() + " · 恭喜";
    layer.querySelector(".mj-sub").textContent = bloom ? "杠 上 开 花" : "胡 牌";
    layer.querySelector(".mj-title").textContent = "胡";
    layer.querySelector(".mj-score").textContent = "";
    layer.querySelector(".mj-fan").textContent = "结算中 · 下方计分表可看番种明细";

    // 上游在 win.mp3 之后才给赢家加 .winner，稍后再读一次才能拿到真实赢家
    setTimeout(function () {
      if (!layer.classList.contains("mj-active")) return;
      layer.querySelector(".mj-kicker").textContent = winnerLabel() + " · 恭喜";
    }, 220);

    // 重启动画：先摘掉 active，强制回流再挂上
    layer.classList.remove("mj-active");
    void layer.offsetWidth;
    layer.classList.add("mj-active");
    document.body.classList.add("mj-shake", "mj-showing");

    startConfetti(bloom);
    resultPending = true;

    // 结算面板可能已经存在（例如重看历史牌局），先试着读一次
    var res = readScores();
    if (res) {
      resultPending = false;
      applyResult(res);
    }

    // 震屏只持续 0.62s，showing 保持到演出结束以便工具条可点
    setTimeout(function () { document.body.classList.remove("mj-shake"); }, 700);
    hideTimer = setTimeout(finish, 3600);
  }

  // ----------------------------------------------------------------
  // 4. 事件 → 报牌 / 演出
  // ----------------------------------------------------------------
  var kongAt = 0;
  var kongClean = false; // 杠后还没人打过牌 → 可能为杠上开花
  var lastTileVoice = 0;

  var LINES = {
    start: ["开局啦，祝你好运！", "开局，起牌！"],
    bloom: ["杠上开花！好牌！", "杠上开花，恭喜！", "哎呀，杠上开花咧！"],
    draw: ["流局，下一局。", "这一局流局了。"],
    end: ["全场结束，恭喜！", "本场打完啦！"]
  };

  function announce(text, priority, rate) {
    say(text, { priority: !!priority, rate: rate || 1.06, pitch: 0.98 + Math.random() * 0.12 });
  }

  // 碰/杠/吃/胡的公告（上游 renderClaimAnnouncement 带 data-player=pid）
  function claimInfo() {
    var list = document.querySelectorAll(".announcement");
    if (!list.length) return null;
    var a = list[list.length - 1];
    var s = (a.textContent || "").trim();
    var kind = /杠|kong/i.test(s) ? "kong"
      : /碰|pung/i.test(s) ? "pung"
      : /吃|chow/i.test(s) ? "chow"
      : /胡|win/i.test(s) ? "win" : null;
    if (!kind) return null;
    var pid = a.getAttribute("data-player");
    return { kind: kind, pid: pid == null || pid === "" ? "0" : String(pid) };
  }

  // 赢家：优先结算时打上 .winner 的玩家，其次 win 公告的 data-player；
  // 没有 win 公告 → 自摸（上游自摸胡不走 claim 公告）
  function winInfo() {
    var info = claimInfo();
    var w = document.querySelector(".players .player.winner");
    if (w) {
      var id = w.getAttribute("id");
      return { pid: id == null ? "0" : String(id), zimo: !(info && info.kind === "win") };
    }
    if (info && info.kind === "win") return { pid: info.pid, zimo: false };
    return { pid: "0", zimo: true };
  }

  // ----------------------------------------------------------------
  // 碰/吃/杠：谁在喊、喊什么
  // 上游公告 (.announcement[data-player]) 在 playClip 之后才插入，
  // 且代玩模式 (BOT_PLAY) 下根本不渲染公告，所以要两条路兜底：
  //   a) 公告观察器（正常模式，最快最准）
  //   b) 音效事件 + 锁定牌数量差推断（代玩模式）
  // ----------------------------------------------------------------
  var lastClaimKey = "";
  var lastClaimAt = 0;
  var locksBefore = null;

  function playerBank(pid) {
    return document.getElementById(String(pid));
  }

  function lockedTiles(pid) {
    var p = playerBank(pid);
    return p ? p.querySelectorAll("game-tile[locked]") : [];
  }

  // 音效事件瞬间先拍快照（此刻牌还没锁上），稍后对比哪家锁定牌变多
  function snapshotLocks() {
    locksBefore = [0, 1, 2, 3].map(function (i) { return lockedTiles(i).length; });
  }

  function inferClaimer(grew) {
    if (!locksBefore) return null;
    for (var i = 0; i < 4; i++) {
      if (lockedTiles(i).length - locksBefore[i] >= grew) return String(i);
    }
    return null;
  }

  // 最后锁上的 n 张牌牌面是否相同（相同→碰，不同→吃）
  function sameFaces(pid, n) {
    var t = lockedTiles(pid);
    if (t.length < n) return false;
    var f = t[t.length - 1].getAttribute("tile");
    for (var i = t.length - n + 1; i < t.length; i++) {
      if (t[i].getAttribute("tile") !== f) return false;
    }
    return true;
  }

  function handleClaim(kind, pid) {
    if (!pid && pid !== "0") return;
    var key = pid + ":" + kind;
    var now = Date.now();
    if (key === lastClaimKey && now - lastClaimAt < 1500) return; // 去重
    lastClaimKey = key;
    lastClaimAt = now;
    var action = kind === "kong" ? "gang" : kind === "pung" ? "peng" : "chi";
    sayFor(pid, action, { priority: true });
  }

  // 公告没出现时的兜底：从音效事件延迟推断
  function queueClaimVoice(isKong) {
    snapshotLocks();
    setTimeout(function () {
      if (lastClaimAt && Date.now() - lastClaimAt < 1300) return; // 公告已处理
      var botPlay = !!(window.__mjConfigBridge && window.__mjConfigBridge.BOT_PLAY);
      var kind = null, pid = null;
      if (!botPlay) {
        var info = claimInfo();
        if (info && info.kind && info.kind !== "win") { kind = info.kind; pid = info.pid; }
      }
      if (!kind) {
        pid = inferClaimer(isKong ? 4 : 3);
        kind = isKong ? "kong" : (pid != null && sameFaces(pid, 3) ? "pung" : "chow");
      }
      if (kind && pid != null) handleClaim(kind, pid);
    }, 300);
  }

  function onClip(kind) {
    switch (kind) {
      case "start":
        kongClean = false;
        fxSmall("start");
        announce(pick(LINES.start), false, 1.08);
        showToast("开 局");
        break;

      case "thud":
      case "discard":
        kongClean = false; // 杠后又打了牌，就不是直接杠上开花
        // 注意：上游只有真人玩家的 UI 会播放落牌音效，AI 出牌没有声音，
        // 所以报牌不挂在这里，统一交给 build() 里的弃牌 DOM 观察器。
        break;

      case "multi":
      case "kong":
        // 碰/吃/杠的语音统一走公告观察器：上游公告在 playClip 之后才插入
        // DOM，这里立即读 claimInfo 会读到旧公告（竞态）。
        // 公告没出现（代玩模式上游不渲染公告）时，延迟后用「哪家的
        // 锁定牌变多了」推断是谁在碰/吃/杠。
        if (kind === "kong") {
          kongAt = Date.now();
          kongClean = true;
          showToast("杠 !");
        }
        queueClaimVoice(kind === "kong");
        break;

      case "win": {
        // 杠后 8 秒内直接和牌、且中间没有再打牌 → 按杠上开花演出
        var bloom = kongClean && (Date.now() - kongAt < 8000);
        kongClean = false;
        fxWin(bloom);
        showWin(bloom);
        // 赢家用自己的音色喊胡 / 自摸
        var wi = winInfo();
        sayFor(wi.pid, wi.zimo ? "zimo" : "hu", { priority: true });
        // 阜阳话：自己胡了夸「过劲」，别人胡了自嘲「也熊吧」
        chatter(wi.pid === 0 ? "win" : "lose", { cooldown: 2500 });
        if (bloom) setTimeout(function () {
          announce(pick(LINES.bloom), true, 1.1);
          setTimeout(function () { announce("这一手太漂亮了！", false, 1.04); }, 1400);
        }, 1500);
        break;
      }

      case "draw":
        kongClean = false;
        fxSmall("draw");
        announce(pick(LINES.draw), true, 1.02);
        showToast("流 局");
        break;

      case "end":
        fxSmall("end");
        announce(pick(LINES.end), true, 1.04);
        showToast("全 场 结 束");
        break;
    }
  }

  window.addEventListener("mj:clip", function (e) {
    var d = e.detail || {};
    if (d.kind) onClip(d.kind);
  });

  // 暴露给工具条「试听」与调试：每次随机抽一位玩家的随机台词，
  // 连按几次能听遍四家音色（0=你、1=男声、2=东北话、3=陕西话）
  window.__mjShowtime = {
    preview: function () {
      var actions = ["peng", "chi", "gang", "hu", "zimo"];
      sayFor(String(Math.floor(Math.random() * 4)),
        actions[Math.floor(Math.random() * actions.length)], { priority: true });
    },
    show: showWin,
    finish: finish,
    readScores: readScores,
    claimInfo: claimInfo,
    winInfo: winInfo
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
