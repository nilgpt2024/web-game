# 🤝 贡献指南 | Contributing Guide

感谢您对 WebGameHub 项目的关注！我们欢迎各种形式的贡献。

Thank you for your interest in contributing to WebGameHub! We welcome all kinds of contributions.

**[中文](#中文) | [English](#english)**

---

## 中文

### 📋 贡献方式

#### 1. 报告问题 (Bug Reports)
- 使用 [Issues](https://github.com/nilgpt2024/web-game/issues) 报告 bug
- 请提供详细的复现步骤
- 包含浏览器版本、操作系统等信息
- 如果可能，提供截图或视频

#### 2. 功能建议 (Feature Requests)
- 在 Issues 中提出新功能建议
- 说明功能的使用场景和价值
- 讨论可能的实现方案

#### 3. 提交代码 (Pull Requests)
- Fork 本仓库
- 创建新分支进行开发
- 提交 Pull Request
- 等待代码审查

#### 4. 添加游戏
- 确保游戏是HTML5开发
- 游戏应该独立运行（不依赖外部服务）
- 提供游戏名称、描述和图标
- 将游戏放在对应的分类文件夹中

### 🔧 开发流程

#### Step 1: Fork 项目
点击仓库右上角的 Fork 按钮

#### Step 2: 克隆到本地
```bash
git clone https://github.com/YOUR_USERNAME/WebGameHub.git
cd WebGameHub
```

#### Step 3: 创建新分支
```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

#### Step 4: 进行修改
- 遵循现有的代码风格
- 添加必要的注释
- 测试你的更改

#### Step 5: 提交更改
```bash
git add .
git commit -m "feat: add new feature"
# 或
git commit -m "fix: fix bug description"
```

提交信息格式：
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建或辅助工具变动

#### Step 6: 推送到 GitHub
```bash
git push origin feature/your-feature-name
```

#### Step 7: 创建 Pull Request
- 访问你的 Fork 仓库
- 点击 "New Pull Request"
- 填写 PR 描述
- 等待审查

### 📝 代码规范

#### HTML
- 使用语义化标签
- 保持适当的缩进（2空格）
- 添加必要的注释

#### CSS
- 使用 CSS 变量
- 遵循 BEM 命名规范（建议）
- 保持样式的可维护性
- 添加浏览器兼容性前缀

#### JavaScript
- 使用现代 ES6+ 语法
- 保持函数简洁
- 添加必要的注释
- 使用 camelCase 命名变量和函数
- 使用 PascalCase 命名类

### 🎮 添加新游戏指南

#### 1. 准备游戏文件
```
games/
└── CategoryName/
    └── YourGameName/
        ├── index.html
        ├── style.css
        ├── script.js
        └── assets/ (可选)
```

#### 2. 更新 script.js
在 `script.js` 的 `gamesData` 对象中添加游戏信息：

```javascript
CategoryName: [
    // ... 其他游戏
    { 
        name: 'Your Game Name', 
        path: 'games/CategoryName/YourGameName/index.html', 
        icon: 'fas fa-icon-name', 
        desc: '游戏描述' 
    }
]
```

#### 3. 更新游戏数量
- 更新 README.md 中的游戏总数
- 更新 index.html 中的统计数字
- 更新分类过滤器中的计数

#### 4. 测试
- 确保游戏可以正常加载
- 测试响应式布局
- 检查是否有控制台错误

### ✅ Pull Request 检查清单

提交 PR 前，请确保：

- [ ] 代码遵循项目的代码规范
- [ ] 已在本地测试所有更改
- [ ] 更新了相关文档
- [ ] 提交信息清晰明确
- [ ] 没有未解决的合并冲突
- [ ] 添加了必要的注释
- [ ] 通过了所有测试（如果有）

### 🎨 设计指南

- 遵循现有的设计语言
- 使用项目定义的颜色变量
- 保持视觉一致性
- 确保响应式设计
- 注意性能优化

### 💬 社区准则

- 尊重他人
- 保持友善和专业
- 欢迎不同意见
- 建设性地讨论
- 帮助新手贡献者

### 📞 联系方式

如有问题，可以通过以下方式联系：

- GitHub Issues: [SinceraXY/WebGameHub/issues](https://github.com/nilgpt2024/web-game/issues)
- Email: 2952671670@qq.com
- QQ: 2952671670

---

## English

### 📋 Ways to Contribute

#### 1. Bug Reports
- Use [Issues](https://github.com/nilgpt2024/web-game/issues) to report bugs
- Provide detailed reproduction steps
- Include browser version, OS information
- If possible, provide screenshots or videos

#### 2. Feature Requests
- Propose new features in Issues
- Explain use cases and value
- Discuss possible implementation

#### 3. Pull Requests
- Fork the repository
- Create a new branch for development
- Submit Pull Request
- Wait for code review

#### 4. Add Games
- Ensure the game is developed in HTML5
- Game should run independently (no external services)
- Provide game name, description, and icon
- Place game in the appropriate category folder

### 🔧 Development Process

#### Step 1: Fork the Project
Click the Fork button at the top right of the repository

#### Step 2: Clone Locally
```bash
git clone https://github.com/YOUR_USERNAME/WebGameHub.git
cd WebGameHub
```

#### Step 3: Create New Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

#### Step 4: Make Changes
- Follow existing code style
- Add necessary comments
- Test your changes

#### Step 5: Commit Changes
```bash
git add .
git commit -m "feat: add new feature"
# or
git commit -m "fix: fix bug description"
```

Commit message format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation update
- `style:` Code formatting
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Testing related
- `chore:` Build or auxiliary tool changes

#### Step 6: Push to GitHub
```bash
git push origin feature/your-feature-name
```

#### Step 7: Create Pull Request
- Visit your forked repository
- Click "New Pull Request"
- Fill in PR description
- Wait for review

### 📝 Code Standards

#### HTML
- Use semantic tags
- Maintain proper indentation (2 spaces)
- Add necessary comments

#### CSS
- Use CSS variables
- Follow BEM naming convention (recommended)
- Maintain style maintainability
- Add browser compatibility prefixes

#### JavaScript
- Use modern ES6+ syntax
- Keep functions concise
- Add necessary comments
- Use camelCase for variables and functions
- Use PascalCase for classes

### 🎮 Adding New Games Guide

#### 1. Prepare Game Files
```
games/
└── CategoryName/
    └── YourGameName/
        ├── index.html
        ├── style.css
        ├── script.js
        └── assets/ (optional)
```

#### 2. Update script.js
Add game information to the `gamesData` object in `script.js`:

```javascript
CategoryName: [
    // ... other games
    { 
        name: 'Your Game Name', 
        path: 'games/CategoryName/YourGameName/index.html', 
        icon: 'fas fa-icon-name', 
        desc: 'Game description' 
    }
]
```

#### 3. Update Game Count
- Update total game count in README.md
- Update statistics in index.html
- Update count in category filters

#### 4. Test
- Ensure game loads correctly
- Test responsive layout
- Check for console errors

### ✅ Pull Request Checklist

Before submitting PR, ensure:

- [ ] Code follows project standards
- [ ] All changes tested locally
- [ ] Related documentation updated
- [ ] Commit messages are clear
- [ ] No unresolved merge conflicts
- [ ] Necessary comments added
- [ ] All tests passed (if any)

### 🎨 Design Guidelines

- Follow existing design language
- Use project-defined color variables
- Maintain visual consistency
- Ensure responsive design
- Pay attention to performance

### 💬 Community Guidelines

- Respect others
- Be friendly and professional
- Welcome different opinions
- Discuss constructively
- Help new contributors

### 📞 Contact

For questions, contact via:

- GitHub Issues: [SinceraXY/WebGameHub/issues](https://github.com/nilgpt2024/web-game/issues)
- Email: 2952671670@qq.com
- QQ: 2952671670

---

<div align="center">

**Thank you for contributing to WebGameHub! 🎮**

</div>
