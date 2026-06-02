# ⚫ Gomoku - 五子棋 | Five in a Row

![GitHub stars](https://img.shields.io/github/stars/SinceraXY/GameHub?style=social&label=Star)
![GitHub forks](https://img.shields.io/github/forks/SinceraXY/GameHub?style=social&label=Fork)
![License](https://img.shields.io/github/license/SinceraXY/GameHub)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**经典策略棋类游戏！双人对弈，连成五子获胜，挑战你的策略思维！**

[🎮 在线体验](https://sinceraxy.github.io/GameHub/games/board/gomoku/index.html) | [📖 完整文档](#) | [🐛 反馈问题](https://github.com/nilgpt2024/web-game/issues)

---

## 📊 项目概览

| 特性 | 说明 |
|------|------|
| 🎯 **游戏类型** | 策略棋类 / 双人对战 |
| 🎨 **界面风格** | 现代化设计 + 木质纹理棋盘 |
| 📱 **响应式** | 桌面 / 平板 / 手机全适配 |
| 💾 **数据保存** | localStorage 本地存储 |
| 🌍 **多语言** | 中文 / English 双语支持 |
| ⚡ **性能** | 纯原生 HTML5/CSS3/JS，无依赖框架 |
| 🔧 **技术栈** | HTML5 + CSS3 + Vanilla JavaScript |

---

## 📖 游戏简介

Gomoku（五子棋），又称连珠、五目棋，是一款源于中国的传统策略棋类游戏。两位玩家在 15×15 的棋盘上轮流落子，黑方先行，率先在横向、纵向或斜向连成五个同色棋子的一方获胜。

### ✨ 核心亮点

- 🎮 **经典玩法** - 15×15 标准五子棋规则
- 👥 **双人对战** - 本地双人轮流对弈模式
- 🎨 **精美界面** - 仿真木质棋盘 + 立体渐变棋子
- ✅ **四向检测** - 横、纵、两对角线全方位获胜检测
- 🏆 **获胜高亮** - 金色发光 + 脉冲动画效果
- 📊 **统计系统** - 完整的胜/负/平局统计
- 💾 **本地保存** - 数据自动持久化存储
- 📱 **响应式设计** - 完美适配各种设备尺寸
- 🌐 **国际化支持** - 中英文双语界面

---

## 🎮 快速开始

### 方式一：在线游玩（推荐）

直接访问：**[🎮 点击开始游戏](https://sinceraxy.github.io/GameHub/games/board/gomoku/index.html)**

无需下载，打开浏览器即可畅玩！

### 方式二：本地运行

```bash
# 1. 克隆项目
git clone https://github.com/nilgpt2024/web-game.git
cd GameHub

# 2. 打开游戏文件
# 直接双击 games/board/gomoku/index.html
# 或使用本地服务器：
python -m http.server 8000
# 访问 http://localhost:8000/games/board/gomoku/
```

### 基本操作

| 操作 | 说明 |
|------|------|
| 🖱️ **落子** | 点击任意空白交叉点放置棋子 |
| ⚫⚪ **轮流** | 黑方先行，双方交替落子 |
| 🔄 **新游戏** | 点击"New Game"按钮重新开始 |
| 📊 **重置统计** | 点击"Reset Stats"清空所有数据 |
| 🏆 **再玩一局** | 游戏结束后点击"Play Again" |

---

## 📋 游戏规则

### 获胜条件

✅ **连成五子**：率先在任意方向连成5个同色棋子即可获胜

支持的方向：
- ➡️ **横向**（水平方向）
- ⬇️ **纵向**（垂直方向）
- ↘️ **主对角线**（左上到右下）
- ↗️ **副对角线**（左下到右上）

### 平局条件

当所有 225 个交叉点都落满棋子且无人获胜时，判定为平局。

### 规格参数

```
棋盘规格:
├── 尺寸: 15×15 = 225个交叉点
├── 桌面: 600×600px
├── 平板: 480×480px
├── 手机: 380×380px (≤550px)
└── 小屏: 320×320px (≤450px)

棋子样式:
├── 黑棋: 径向渐变 (#4A4A4A → #000000)
├── 白棋: 径向渐变 (#FFFFFF → #D0D0D0)
└── 大小: 格子尺寸的 75%
```

---

## 🎨 界面展示

### 配色方案

| 元素 | 颜色 | 用途 |
|------|------|------|
| 主色调 | `#4F3FF0` | 按钮、强调色 |
| 背景渐变 | `#667eea → #764ba2` | 页面背景 |
| 棋盘底色 | `#E7C27D → #D4A862` | 木质纹理 |
| 边框颜色 | `#8B5A2B` | 棋盘边框 |
| 黑棋 | `#4A4A4A → #000000` | 黑方棋子 |
| 白棋 | `#FFFFFF → #D0D0D0` | 白方棋子 |

### 动画效果

| 效果 | 时长 | 说明 |
|------|------|------|
| 棋子落下 | 0.3s | 缩放 + 透明度过渡 |
| 获胜脉冲 | 0.6s | 金色发光 + 缩放循环 |
| 当前玩家提示 | 1.5s | 棋子脉冲动画 |
| 模态框弹入 | 0.6s | 弹跳缩放效果 |
| 按钮悬停 | 0.3s | 上浮 + 阴影增强 |

---

## 📱 响应式适配

| 设备类型 | 屏幕宽度 | 棋盘大小 | 布局方式 |
|----------|----------|----------|----------|
| 🖥️ 桌面设备 | > 1024px | 600×600px | 双列布局（侧边栏+主区） |
| 💻 平板设备 | ≤ 1024px | 600×600px | 单列布局（顶部侧边栏） |
| 📱 手机设备 | ≤ 768px | 480×480px | 垂直堆叠布局 |
| 📱 小屏手机 | ≤ 550px | 380×380px | 紧凑布局 |
| 📱 超小屏 | ≤ 450px | 320×320px | 极简布局 |

---

## 💡 游戏技巧

### 🌟 新手入门

1. **中央优势** 📍 - 优先占领棋盘中央位置，控制力最强
2. **攻守兼备** ⚔️ - 既要积极进攻也要注意防守
3. **及时阻断** 🛡️ - 对手连成3子时必须立即阻断
4. **全局视野** 🔭 - 不要只关注局部，要有大局观
5. **落子谨慎** 🤔 - 每一步都要有明确目的

### 🎯 进阶策略

- **三三禁手** ⚠️ - 注意禁手规则（本版本未实现）
- **活三 vs 眠三** 区分活三（两端可延伸）和眠三（单端可延伸）
- **四四必胜** 🏆 - 形成双活四必胜局面
- **三四组合** 💪 - 活三+活四的组合极具威胁
- **VCF 战术** ⚡ - 连续冲四取胜的高级战术

### 🏆 高手秘籍

1. **多线进攻** - 同时在多个方向形成威胁
2. **虚实结合** - 虚张声势，实则防守反击
3. **诱敌深入** - 设置陷阱引诱对手犯错
4. **节奏掌控** - 掌握进攻和防守的转换节奏
5. **预判能力** - 提前预判 3-5 步后的棋局变化

---

## 🏅 挑战成就

### 胜局里程碑

| 等级 | 目标 | 称号 |
|------|------|------|
| 🥉 | 赢得 1 局 | 新手玩家 |
| 🥈 | 赢得 5 局 | 入门选手 |
| 🥇 | 赢得 10 局 | 熟练玩家 |
| 💎 | 赢得 25 局 | 高手玩家 |
| 👑 | 赢得 50 局 | 大师级别 |
| 🌟 | 赢得 100+ 局 | 传奇大师 |

### 胜率挑战

- 📊 **稳定者** - 胜率达到 50%
- 📈 **优势者** - 胜率达到 60%
- 🎯 **主宰者** - 胜率达到 70%
- 🏅 **完美者** - 胜率达到 80%

### 连胜记录

- 🔥 **二连胜** - 连续赢 2 局
- ⚡ **三连胜** - 连续赢 3 局
- 💪 **五连胜** - 连续赢 5 局
- 🏆 **十连胜** - 连续赢 10 局

---

## 📂 文件结构

```
games/board/gomoku/
├── index.html      # 游戏主页面（含 SEO 优化）
├── style.css       # 样式表（UI 设计、动画、响应式）
├── script.js       # 游戏逻辑（落子、判定、统计）
└── README.md       # 本文档
```

---

## 🔧 技术实现

### 核心算法

#### 获胜检测算法

```javascript
四个检测方向:
  [0, 1]   → 横向（→）
  [1, 0]   → 纵向（↓）
  [1, 1]   → 主对角线（↘）
  [1, -1]  → 副对角线（↗）

检测流程:
1. 从最新落子位置开始
2. 向正反两个方向分别检测（最多4格）
3. 统计连续同色棋子数量
4. 总数 ≥ 5 即判定获胜
```

#### 棋盘渲染机制

- 使用 **CSS Grid** 进行精确定位
- 每个交叉点对应一个可交互 div
- 通过 `absolute` 定位 + `transform: translate(-50%, -50%)` 居中
- 网格线使用 SVG `background-image` 绘制
- 响应式计算：窗口 resize 时动态重新计算坐标

#### 数据持久化

```json
{
  "player1Wins": 0,
  "player2Wins": 0,
  "draws": 0,
  "totalGames": 0
}

存储键: 'gomokuStats'
存储位置: localStorage
```

---

## ❓ 常见问题

<details>
<summary><b>❓ 如何获胜？</b></summary>

在横向、纵向或两个对角线方向任一方向连成 5 个同色棋子即可获胜。系统会自动检测并高亮显示获胜的棋子。
</details>

<details>
<summary><b>❓ 黑方有先手优势吗？</b></summary>

是的，五子棋黑方先手有一定优势，这也是为什么职业赛制会有禁手规则（如三三禁手、四四禁手等）。本游戏当前版本未实现禁手规则。
</details>

<details>
<summary><b>❓ 可以悔棋吗？</b></summary>

当前版本不支持悔棋功能，请谨慎落子。我们计划在未来版本中添加此功能。
</details>

<details>
<summary><b>❓ 统计数据会保存吗？</b></summary>

会的！所有统计数据保存在浏览器 `localStorage` 中，即使关闭浏览器也不会丢失。除非手动清除浏览器数据或点击"Reset Stats"按钮。
</details>

<details>
<summary><b>❓ 支持手机玩吗？</b></summary>

完全支持！游戏采用响应式设计，会根据屏幕尺寸自动调整棋盘大小和布局，在手机和平板上都能流畅运行。
</details>

<details>
<summary><b>❓ 可以和电脑对战吗？</b></summary>

当前版本仅支持双人本地对弈，暂无 AI 对手功能。我们计划在未来版本添加不同难度的 AI 对手。
</details>

---

## ⚠️ 已知限制

- ❌ 无悔棋功能
- ❌ 无 AI 对手
- ❌ 无禁手规则（三三禁手、四四禁手等）
- ❌ 无时间限制
- ❌ 无在线多人对战
- ❌ 无棋谱保存/加载
- ❌ 无复盘功能

---

## 🚀 未来规划

### 即将推出

- 🤖 **AI 对手** - 不同难度级别的电脑对手
- ↩️ **悔棋功能** - 支持撤销最近几步
- ⏱️ **计时模式** - 添加时间限制增加挑战性
- 🔊 **音效系统** - 落子音效、背景音乐

### 远期目标

- 📜 **完整规则** - 支持专业赛制禁手规则
- 💾 **棋谱系统** - 保存和加载对局记录
- 📊 **数据分析** - 详细的对局统计分析
- 🌐 **在线对战** - 多人实时对战功能
- 🏆 **排位系统** - 天梯积分和段位系统
- 🎨 **皮肤系统** - 多种棋盘和棋子主题
- 📖 **教学模式** - 互动式新手教程
- 🎬 **回放功能** - 对局录像和复盘

---

## 🌐 SEO 优化

本页面已进行全面的 SEO 优化：

### ✅ 已实现的优化

- 🔍 **Meta Tags** - 完整的 title、description、keywords
- 🌐 **Open Graph** - 社交媒体分享优化（Facebook、微信等）
- 🐦 **Twitter Cards** - Twitter 分享卡片优化
- 🔗 **Canonical URL** - 规范链接防止重复内容
- 📊 **结构化数据** - JSON-LD 格式的 VideoGame schema
- ❓ **FAQ Schema** - 常见问题结构化数据
- 🌍 **多语言支持** - zh-CN 和 en-US 语言标签
- 📱 **移动优先** - 响应式设计和 viewport 设置
- ⚡ **性能优化** - 快速加载，良好的 Core Web Vitals

### 结构化数据包含

```json
{
  "@type": "VideoGame",
  "name": "Gomoku - 五子棋",
  "genre": ["策略游戏", "棋类游戏"],
  "playMode": "MultiPlayer",
  "numberOfPlayers": {"minValue": 2, "maxValue": 2},
  "offers": {"price": "0", "priceCurrency": "CNY"},
  "aggregateRating": {"ratingValue": "4.8"}
}
```

---

## 🛠️ 浏览器兼容性

| 浏览器 | 最低版本 | 支持状态 |
|--------|----------|----------|
| Chrome | 90+ | ✅ 完美支持 |
| Firefox | 88+ | ✅ 完美支持 |
| Safari | 14+ | ✅ 完美支持 |
| Edge | 90+ | ✅ 完美支持 |
| Opera | 76+ | ✅ 完美支持 |

**要求**：ES6 语法、CSS Grid、localStorage、SVG 支持

---

## 📄 许可证

本项目采用 Apache License 开源协议。

详见 [LICENSE](https://github.com/nilgpt2024/web-game/blob/main/LICENSE) 文件。

---

## 🙏 致谢

感谢以下开源项目和技术：

- **Google Fonts** - Poppins 字体
- **Font Awesome** - 图标库
- **HTML5/CSS3/JavaScript** - 前端技术栈

---

## 📞 联系与反馈

如有问题、建议或贡献意向，欢迎通过以下方式联系：

- 🐙 **GitHub**: [SinceraXY/GameHub](https://github.com/nilgpt2024/web-game)
  - 🐛 [提交 Issue](https://github.com/nilgpt2024/web-game/issues)
  - 💾 [Pull Request](https://github.com/nilgpt2024/web-game/pulls)
- 📧 **Email**: <2952671670@qq.com>
- 💬 **QQ**: 2952671670

---

## ⭐ 支持项目

如果这个项目对你有帮助，欢迎给一个 ⭐ Star！

你的支持是我们持续改进的动力！💪

---

<div align="center">

**🎮 准备好挑战五子棋了吗？开始游戏吧！** ⚫⚪🎮✨

**Made with ❤️ by [SinceraXY](https://github.com/SinceraXY)**

**Powered by [GameHub](https://github.com/nilgpt2024/web-game)**

</div>
