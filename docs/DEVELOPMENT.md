# 🛠️ 开发指南 | Development Guide

完整的WebGameHub开发指南，帮助你快速上手项目开发。

Complete development guide for WebGameHub to help you get started quickly.

**[中文](#中文) | [English](#english)**

---

## 中文

### 📋 目录

- [环境准备](#环境准备)
- [项目结构](#项目结构)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [添加新游戏](#添加新游戏)
- [测试指南](#测试指南)
- [调试技巧](#调试技巧)
- [常见问题](#常见问题)

---

### 🔧 环境准备

#### 必需工具

1. **代码编辑器**
   - VSCode（推荐）
   - Sublime Text
   - WebStorm
   - 或其他你喜欢的编辑器

2. **浏览器**
   - Chrome（推荐，有强大的开发者工具）
   - Firefox Developer Edition
   - Safari（用于测试iOS兼容性）
   - Edge（用于测试Windows兼容性）

3. **本地服务器**（可选）
   - VSCode Live Server扩展
   - Python: `python -m http.server`
   - Node.js: `npx http-server`

#### 推荐的VSCode扩展

```json
{
  "recommendations": [
    "ritwickdey.liveserver",           // Live Server
    "esbenp.prettier-vscode",          // Prettier
    "dbaeumer.vscode-eslint",          // ESLint
    "formulahendry.auto-rename-tag",   // Auto Rename Tag
    "bradlc.vscode-tailwindcss",       // Tailwind CSS IntelliSense
    "ms-vscode.vscode-typescript-next" // JavaScript/TypeScript
  ]
}
```

---

### 📁 项目结构

```
WebGameHub/
├── .github/                    # GitHub配置
│   ├── ISSUE_TEMPLATE/        # Issue模板
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── game_submission.md
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                       # 文档
│   ├── DEPLOYMENT.md          # 部署指南
│   └── DEVELOPMENT.md         # 开发指南
├── games/                      # 游戏目录
│   ├── Action/                # 动作游戏
│   ├── Arcade/                # 街机游戏
│   ├── Board/                 # 棋牌游戏
│   ├── Casual/                # 休闲游戏
│   ├── Memory/                # 记忆游戏
│   ├── Puzzle/                # 益智游戏
│   └── Typing/                # 打字游戏
├── index.html                 # 主页面
├── style.css                  # 样式文件
├── script.js                  # 脚本文件
├── README.md                  # 中文说明
├── README_EN.md               # 英文说明
├── CONTRIBUTING.md            # 贡献指南
├── CODE_OF_CONDUCT.md         # 行为准则
├── LICENSE                    # 许可证
└── .gitignore                # Git忽略文件
```

#### 文件说明

**核心文件：**
- `index.html` - 主HTML文件，包含页面结构
- `style.css` - 全局样式，使用CSS变量
- `script.js` - 主要交互逻辑

**游戏目录：**
- 每个分类一个文件夹
- 每个游戏有独立的子文件夹
- 标准游戏结构：`index.html`, `style.css`, `script.js`

---

### 💻 开发流程

#### 1. 克隆项目

```bash
git clone https://github.com/nilgpt2024/web-game.git
cd WebGameHub
```

#### 2. 创建开发分支

```bash
git checkout -b feature/your-feature-name
```

分支命名规范：
- `feature/` - 新功能
- `fix/` - Bug修复
- `docs/` - 文档更新
- `refactor/` - 代码重构
- `style/` - 样式调整
- `test/` - 测试相关

#### 3. 启动开发服务器

**方法1：VSCode Live Server**
- 右键 `index.html`
- 选择 "Open with Live Server"

**方法2：Python**
```bash
python -m http.server 8000
```

**方法3：Node.js**
```bash
npx http-server -p 8000
```

访问: `http://localhost:8000`

#### 4. 进行开发

- 修改代码
- 保存文件
- 浏览器自动刷新（如使用Live Server）
- 测试更改

#### 5. 提交代码

```bash
# 添加更改
git add .

# 提交（遵循提交规范）
git commit -m "feat: add new feature"

# 推送到远程
git push origin feature/your-feature-name
```

#### 6. 创建Pull Request

- 访问GitHub仓库
- 点击 "New Pull Request"
- 填写PR描述
- 等待审查

---

### 📝 代码规范

#### HTML规范

```html
<!-- ✅ 正确 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
<body>
    <!-- 使用语义化标签 -->
    <header>
        <nav>...</nav>
    </header>
    
    <main>
        <section>...</section>
    </main>
    
    <footer>...</footer>
</body>
</html>

<!-- ❌ 错误 -->
<div class="header">
    <div class="nav">...</div>
</div>
```

**关键点：**
- 使用语义化HTML5标签
- 保持2空格缩进
- 属性使用双引号
- 添加必要的注释
- 确保可访问性（ARIA）

#### CSS规范

```css
/* ✅ 正确 */
:root {
    --primary-color: #667eea;
    --spacing-md: 16px;
}

.game-card {
    display: flex;
    padding: var(--spacing-md);
    background: var(--primary-color);
    border-radius: 8px;
}

.game-card:hover {
    transform: translateY(-4px);
    transition: transform 0.3s ease;
}

/* ❌ 错误 */
.gameCard {
    display:flex;
    padding:16px;
    background:#667eea;
}
```

**关键点：**
- 使用CSS变量
- kebab-case命名
- 合理使用空格
- 避免过度嵌套
- 移动优先响应式设计

#### JavaScript规范

```javascript
// ✅ 正确
const gamesData = {
    Puzzle: [
        { 
            name: '2048', 
            path: 'games/Puzzle/2048/index.html',
            icon: 'fas fa-th',
            desc: '经典数字合并益智游戏'
        }
    ]
};

function renderGames(category = 'all') {
    const gamesGrid = document.getElementById('gamesGrid');
    
    // 清空现有内容
    gamesGrid.innerHTML = '';
    
    // 过滤游戏
    const filteredGames = filterGamesByCategory(category);
    
    // 渲染游戏卡片
    filteredGames.forEach(game => {
        const card = createGameCard(game);
        gamesGrid.appendChild(card);
    });
}

// ❌ 错误
function RenderGames(cat) {
    var grid = document.getElementById('gamesGrid')
    grid.innerHTML = ''
    for(var i=0;i<games.length;i++) {
        grid.appendChild(createCard(games[i]))
    }
}
```

**关键点：**
- 使用 `const` 和 `let`，避免 `var`
- camelCase命名函数和变量
- PascalCase命名类
- 添加有意义的注释
- 使用现代ES6+语法
- 保持函数简洁

---

### 🎮 添加新游戏

#### 完整流程

**1. 准备游戏文件**

创建游戏目录结构：
```
games/CategoryName/YourGameName/
├── index.html      # 游戏主页面
├── style.css       # 游戏样式
├── script.js       # 游戏逻辑
└── assets/         # 资源文件（可选）
    ├── images/
    ├── sounds/
    └── fonts/
```

**2. 游戏HTML模板**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>游戏名称</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <header class="game-header">
            <h1>游戏名称</h1>
            <button id="backBtn" onclick="window.history.back()">返回</button>
        </header>
        
        <main class="game-main">
            <!-- 游戏内容 -->
        </main>
        
        <footer class="game-footer">
            <p>操作说明：...</p>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

**3. 更新 script.js**

在 `gamesData` 对象中添加游戏信息：

```javascript
const gamesData = {
    CategoryName: [
        // 现有游戏...
        
        // 添加新游戏
        { 
            name: 'Your Game Name',
            path: 'games/CategoryName/YourGameName/index.html',
            icon: 'fas fa-icon-name',  // Font Awesome图标
            desc: '游戏简短描述'
        }
    ]
};
```

**4. 更新统计数据**

- 更新 `index.html` 中的游戏总数
- 更新分类过滤器中的计数
- 更新 README.md 中的统计信息

**5. 测试游戏**

```bash
# 启动本地服务器
python -m http.server 8000

# 测试checklist：
# ✅ 游戏正常加载
# ✅ 响应式布局正常
# ✅ 无控制台错误
# ✅ 在不同浏览器测试
# ✅ 移动端测试
```

---

### 🧪 测试指南

#### 浏览器测试

**桌面浏览器：**
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

**移动浏览器：**
- Chrome Mobile
- Safari iOS
- Samsung Internet

#### 响应式测试

使用Chrome DevTools：
1. 按 F12 打开开发者工具
2. 点击设备工具栏图标（Ctrl+Shift+M）
3. 测试不同设备尺寸

**测试尺寸：**
- 手机：375x667 (iPhone SE)
- 平板：768x1024 (iPad)
- 笔记本：1366x768
- 桌面：1920x1080

#### 性能测试

**使用Lighthouse：**
1. 打开Chrome DevTools
2. 切换到 "Lighthouse" 标签
3. 选择类别：Performance, Accessibility, Best Practices, SEO
4. 点击 "Generate report"

**目标分数：**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

### 🐛 调试技巧

#### 控制台调试

```javascript
// 打印变量
console.log('变量值:', variable);

// 打印对象
console.table(gamesData);

// 性能测试
console.time('render');
renderGames();
console.timeEnd('render');

// 分组输出
console.group('游戏信息');
console.log('名称:', game.name);
console.log('路径:', game.path);
console.groupEnd();
```

#### 断点调试

1. 在Chrome DevTools的 "Sources" 标签中打开 `script.js`
2. 点击行号设置断点
3. 刷新页面触发断点
4. 使用控制按钮：
   - Continue (F8)
   - Step over (F10)
   - Step into (F11)
   - Step out (Shift+F11)

#### 网络调试

1. 打开 "Network" 标签
2. 刷新页面
3. 检查：
   - 加载时间
   - 文件大小
   - 请求状态
   - 加载瀑布图

---

### 🔧 常用工具

#### 代码格式化

**Prettier配置 (.prettierrc):**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### Git Hooks

**使用Husky预提交检查：**

```bash
# 安装Husky
npm install --save-dev husky

# 初始化
npx husky install

# 添加pre-commit hook
npx husky add .husky/pre-commit "npm test"
```

---

### ❓ 常见问题

#### Q: 本地看起来正常，但部署后样式丢失
**A:** 检查资源路径是否使用相对路径。避免使用绝对路径如 `/style.css`，应使用 `./style.css` 或 `style.css`。

#### Q: 游戏在移动端无法正常显示
**A:** 确保添加了viewport meta标签，并使用响应式设计。

#### Q: 如何优化游戏加载速度
**A:** 
- 压缩图片
- 使用懒加载
- 压缩CSS和JavaScript
- 使用CDN

#### Q: 如何添加游戏音效
**A:** 
```javascript
const audio = new Audio('assets/sounds/click.mp3');
button.addEventListener('click', () => {
    audio.play();
});
```

---

### 📚 学习资源

#### 官方文档
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) - 浏览器兼容性
- [Font Awesome](https://fontawesome.com/) - 图标库

#### 教程推荐
- [JavaScript.info](https://javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

---

### 📞 获取帮助

遇到问题？
- 📖 查看文档
- 🐛 搜索 [Issues](https://github.com/nilgpt2024/web-game/issues)
- 💬 创建新Issue
- 📧 发送邮件：2952671670@qq.com

---

## English

[English version follows similar structure...]

---

<div align="center">

**Happy Coding! 🚀**

Made with ❤️ by SinceraXY

</div>
