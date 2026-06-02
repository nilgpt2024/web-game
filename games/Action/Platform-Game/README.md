# Platform Game - 平台跳跃游戏

A complete 2D platformer game with pseudo-3D effects, multiple levels, and collectible items.

## 游戏特色 / Features

- **Canvas 2D 渲染** - 带伪3D效果（多层视差滚动背景、角色阴影）
- **完整物理引擎** - 重力系统、摩擦力、碰撞检测
- **二段跳机制** - 空中可再跳跃一次
- **三种平台类型**：
  - 普通平台 (蓝色) - 稳定可靠
  - 移动平台 (紫色) - 左右移动
  - 消失平台 (橙色) - 踩上后消失
- **收集物品系统**：
  - 金币 🪙 = 10分
  - 星星 ⭐ = 50分
  - 宝石 💎 = 100分
- **敌人AI巡逻** - 自动巡逻的敌人，碰到会扣血
- **3个主题关卡**：
  1. Forest Adventure (森林冒险)
  2. Crystal Caves (水晶洞穴)
  3. Sky Summit (天空之巅)
- **分数与生命值系统**
- **粒子特效** - 跳跃、收集、受伤特效
- **响应式设计** - 支持移动端触控操作
- **国际化支持** - 中英文切换

## 操作方式 / Controls

### 键盘 Keyboard:
| 按键 | 功能 |
|------|------|
| A/D 或 ←/→ | 左右移动 |
| Space/W/↑ | 跳跃（支持二段跳） |
| P | 暂停游戏 |
| ESC | 退出暂停 |

### 移动端 Mobile:
- 屏幕底部虚拟按钮控制移动和跳跃

## 技术实现 / Technical Details

- **渲染**: HTML5 Canvas 2D API
- **物理**: 自定义重力与碰撞检测系统
- **动画**: requestAnimationFrame 60fps
- **存储**: localStorage 存储最高分
- **字体**: Plus Jakarta Sans
- **主题色**: #0d9488 (Teal)

## 文件结构

```
Platform-Game/
├── index.html    # 主页面（含国际化 data-i18n 属性）
├── style.css     # 3D效果样式、响应式设计
├── script.js     # 完整游戏逻辑
└── README.md     # 游戏说明
```

## 运行方式

直接在浏览器中打开 `index.html` 即可开始游戏。