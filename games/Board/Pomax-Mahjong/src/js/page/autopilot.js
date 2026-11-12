/* ------------------------------------------------------------------
   AIGameHub 本地增强层：config 桥
   - 上游 config 是 ES module 内部对象，传统脚本增强层拿不到；
     本文件只做一件事：把 config 暴露到 window 供 immersive.js
     实现运行时「电脑代玩」开关（config.set({ BOT_PLAY })）。
   - 不修改上游任何源码。
   ------------------------------------------------------------------ */
import { config } from "../../config.js";
import "../core/scoring/fuyang.js"; // 注册「阜阳麻将」玩法（本地新增规则文件）

window.__mjConfigBridge = config;
