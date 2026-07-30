# Plan: 为 GameHub 增加 3D 射箭游戏

## 1. 任务摘要
基于 `D:\app\threejs-game-skills-main\skills` 中 Three.js 游戏技能，为当前 GameHub 项目新增一个基于 Three.js 的 3D 射箭游戏（`Archery 3D`），并与游戏大厅集成。实现拉弓、瞄准、发射、重力和风力物理模拟、靶心命中检测及计分系统。

## 2. 当前状态分析
- 项目结构：GameHub 是一个多分类 HTML5 小游戏合集，大厅入口为 `index.html`，游戏数据注册在 `script.js` 中。
- 现有 2D 射箭游戏：`games/Action/Archery/` 已存在。
- 3D 子项目已独立为 `games/Action/Archery-3D/`，使用 Vite + TypeScript + Three.js 构建。
- 当前已创建/修改的关键文件：
  - `games/Action/Archery-3D/package.json`：依赖 `three`、`@types/three`、`vite`、`typescript`。
  - `games/Action/Archery-3D/vite.config.ts`：`base: './'`，支持子目录部署。
  - `games/Action/Archery-3D/tsconfig.json`：TypeScript 配置。
  - `games/Action/Archery-3D/index.html`：开发入口，动态计算返回大厅路径与国际化脚本路径。
  - `games/Action/Archery-3D/src/main.ts`：核心游戏逻辑。
  - `games/Action/Archery-3D/src/style.css`：游戏 UI 样式。
  - `games/Action/Archery-3D/dist/`：Vite 构建产物。
  - `script.js`：新增 `Archery 3D` 注册。
  - `game-i18n.js`：新增 `Archery-3D` 中英翻译。
  - `i18n.js`：更新游戏总数相关文案（54 → 55）。
  - `index.html`：更新总数、Action 分类计数、SEO 文案、统计条宽度。

## 3. 已实现的关键功能
### 3.1 3D 射箭游戏核心玩法
- **场景**：天空背景、雾化效果、草地地面、树木装饰、距离标记。
- **弓箭**：弓身、弓弦、箭矢 Mesh；拉弓时更新弓弦形态与轨迹预览线。
- **输入**：支持鼠标和触屏拖拽，按住拉弓、拖动调整角度和力度、松开发射。
- **物理**：箭矢受重力、风力影响；实时飞行朝向跟随速度方向。
- **目标**：动态生成带环状纹理的靶子，支持不同距离。
- **命中判定**：基于箭矢尖端与靶面圆心的距离计算得分，区分靶心（bullseye）和普通命中。
- **HUD**：显示得分、靶心数、射击数、命中率、风力、距离。
- **控制按钮**：重新开始、清除箭矢。
- **开始覆盖层**：游戏说明与开始按钮。

### 3.2 已修复的关键问题
- `e.target.closest is not a function`：在 `onPointerDown` 中增加 `e.target instanceof Element` 校验。
- `BufferGeometry: Buffer size too small`：在 `updateTrajectory` 中 `dispose` 旧 geometry 后重建。
- 覆盖层阻止返回按钮点击：`.overlay { pointer-events: none; }` + `.overlay-content { pointer-events: auto; }`。
- 返回大厅路径兼容 dev 与 dist：通过 `location.pathname` 动态计算相对深度。

### 3.3 大厅集成
- `script.js` Action 数组新增：
  ```js
  { name: 'Archery 3D', path: 'games/Action/Archery-3D/dist/index.html', icon: 'fas fa-bullseye', desc: '3D射箭竞技' }
  ```
- `index.html` 中游戏总数从 54 更新为 55，Action 分类计数从 15 更新为 16，SEO 与统计条同步更新。

## 4. 假设与决策
- 构建产物 `dist/` 需要提交，因为大厅直接引用 `games/Action/Archery-3D/dist/index.html`。
- 保留现有 2D 射箭游戏 `Archery`，两者并存。
- 返回大厅按钮使用相对路径 `../../index.html`（dev）或 `../../../../index.html`（dist），通过脚本动态修正。
- 使用 `game-i18n.js` 进行子页面国际化，兼容中英文切换。

## 5. 验证步骤
- [x] 运行 `npm run build` 在 `games/Action/Archery-3D/` 目录成功构建。
- [x] 启动本地 HTTP 服务器访问 `games/Action/Archery-3D/dist/index.html`，游戏可独立运行。
- [x] 从大厅点击 `Archery 3D` 卡片正确进入游戏。
- [x] 返回大厅按钮可正常跳转。
- [x] 拉弓、瞄准、发射、命中计分流程正常。
- [x] 中英文切换正常显示 `Archery-3D` 对应文案。

## 6. 可选后续
- 当前任务已完成，无需进一步操作。若后续需要，可考虑将 `Space-Shooter-3D` 同样完成大厅集成。
