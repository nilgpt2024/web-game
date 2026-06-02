# 🎮 游戏仓库国际化系统

## ✨ 功能特性

- ✅ 支持中文(zh-CN)和英文(en)双语言
- ✅ 自动检测浏览器语言
- ✅ 用户语言选择本地存储
- ✅ 主页面和所有42个游戏子页面都支持
- ✅ 语言切换按钮优雅设计

---

## 📁 文件结构

```
GameHub/
├── i18n.js                  # 主页国际化模块
├── game-i18n.js            # 游戏页面通用国际化模块
├── games/game-shared.css    # 游戏页面共享样式（含语言切换按钮）
├── locales/
│   ├── zh-CN.json          # 中文语言包
│   └── en.json             # 英文语言包
├── index.html              # 主页（已国际化）
└── games/
    └── **/index.html       # 所有游戏页面（已批量国际化）
```

---

## 🚀 快速使用

### 1. 主页面 (index.html)

主页已经配置好国际化系统，包含：
- 导航栏语言切换按钮
- 自动检测浏览器语言
- 语言选择保存到LocalStorage

### 2. 游戏页面

所有42个游戏页面都已添加：
- 统一的导航栏（返回按钮 + 语言切换）
- 国际化脚本自动初始化
- 共享样式库

---

## 📝 如何为游戏页面添加翻译

### 更新语言包文件

1. **中文**: `locales/zh-CN.json`
2. **英文**: `locales/en.json`

语言包结构示例：

```json
{
  "common": {
    "backToHub": "返回游戏大厅"
  },
  "ui": {
    "features": "✨ 游戏特色"
  },
  "specific": {
    "2048": {
      "title": "2048",
      "desc": "合并相同数字，挑战2048！"
    }
  }
}
```

### 在HTML中使用翻译

使用 `data-i18n` 属性：

```html
<!-- 简单文本 -->
<span data-i18n="common.backToHub">默认文本</span>

<!-- 属性翻译 -->
<button data-i18n="ui.start" data-i18n-attr="title" title="开始">开始</button>
```

### 在JavaScript中使用翻译

```javascript
// 主页
const text = window.i18n.t('common.backToHub');

// 游戏页
const text = gameI18n.t('specific.2048.title');
```

---

## 🎯 语言代码规范

| 代码 | 语言 | 说明 |
|-----|------|-----|
| `zh-CN` | 简体中文 | 默认语言 |
| `en` | 英语 | 备用语言 |

---

## 🔧 自定义添加新语言

1. 在 `game-i18n.js` 中的 `TRANSLATIONS` 对象添加新语言：

```javascript
const TRANSLATIONS = {
  'zh-CN': { ... },
  'en': { ... },
  'ja': { ... }, // 新增日语
  // ...
}
```

2. 在语言切换按钮中添加选项（在需要的HTML页面中）

```html
<button class="lang-btn" data-lang="ja" title="日本語">
  <span class="lang-flag">🇯🇵</span>
  <span class="lang-text">日本語</span>
</button>
```

---

## 📖 语言切换流程

1. **初始化**: 检测浏览器语言或读取LocalStorage
2. **渲染**: 根据当前语言更新所有带 `data-i18n` 属性的元素
3. **切换**: 点击语言按钮 → 更新Language → 重新渲染 → 保存到LocalStorage

---

## 🛠️ 开发说明

### 批量更新游戏页面

如果需要重新批量更新，可以运行：

```bash
py update_game_pages.py
```

### 注意事项

- `game-i18n.js` 和 `i18n.js` 类似但有区别，前者专为游戏页优化
- 语言包中的路径层级要对应正确
- 确保Font Awesome CSS已加载（用于图标）

---

## 🌈 设计特点

- 主题色使用与主页一致的青色（#0d9488）
- 语言按钮有悬停和激活状态
- 国旗图标直观显示当前语言
- 响应式设计，支持移动设备

---

## 📄 License

与GameHub项目使用相同的开源协议
