// Internationalization (i18n) System
// Translation data embedded directly to avoid CORS issues
const TRANSLATIONS = {
    'zh-CN': {
        "nav": {
            "home": "首页",
            "games": "游戏",
            "stats": "统计",
            "about": "关于我们",
            "contact": "联系我们",
            "privacy": "隐私政策",
            "terms": "服务条款",
            "cookie_settings": "Cookie设置"
        },
        "hero": {
            "eyebrow": "53款游戏 · 免费畅玩",
            "title": "53款精品小游戏",
            "subtitle": "随时随地，畅玩无限",
            "description": "从经典街机到创新益智，从动作冒险到休闲放松，精选53款HTML5游戏，无需下载，即刻畅玩。",
            "stats": {
                "games": "游戏总数",
                "categories": "游戏分类",
                "free": "免费畅玩"
            },
            "cta": "开始游戏"
        },
        "games": {
            "section_eyebrow": "🎮 游戏库",
            "title": "游戏大厅",
            "subtitle": "选择你喜欢的类别，开始畅玩",
            "filter": {
                "all": "全部",
                "puzzle": "益智解谜",
                "action": "动作反应",
                "arcade": "经典街机",
                "board": "棋牌策略",
                "memory": "记忆训练",
                "typing": "打字练习",
                "casual": "休闲娱乐"
            },
            "empty": {
                "title": "未找到游戏",
                "description": "试试其他关键词或分类"
            },
            "search_placeholder": "搜索游戏...",
            "no_results": "未找到游戏",
            "try_other": "试试其他关键词或分类",
            "2048": "2048",
            "2048_desc": "经典数字合并益智游戏",
            "Jigsaw Puzzle": "拼图挑战",
            "Jigsaw Puzzle_desc": "趣味拼图挑战",
            "Klotski": "华容道",
            "Klotski_desc": "华容道滑块解谜",
            "Maze Escape": "迷宫逃脱",
            "Maze Escape_desc": "迷宫逃脱冒险",
            "Minesweeper": "扫雷",
            "Minesweeper_desc": "经典扫雷游戏",
            "Spot Difference": "找不同",
            "Spot Difference_desc": "找不同挑战",
            "Sudoku": "数独",
            "Sudoku_desc": "数独逻辑游戏",
            "Tilting Maze": "重力迷宫",
            "Tilting Maze_desc": "重力迷宫",
            "Archery": "射箭",
            "Archery_desc": "射箭竞技",
            "Breakout": "打砖块",
            "Breakout_desc": "打砖块游戏",
            "Crossy Road": "过马路",
            "Crossy Road_desc": "过马路挑战",
            "Emoji Catcher": "表情捕捉",
            "Emoji Catcher_desc": "表情符号捕捉",
            "Flappy Bird": "飞翔的小鸟",
            "Flappy Bird_desc": "飞翔的小鸟",
            "Fruit Slicer": "水果切切乐",
            "Fruit Slicer_desc": "水果切切乐",
            "Insect Catch": "昆虫捕捉",
            "Insect Catch_desc": "昆虫捕捉",
            "Piano Tiles": "别踩白块",
            "Piano Tiles_desc": "别踩白块",
            "Ping Pong": "乒乓球",
            "Ping Pong_desc": "乒乓球对战",
            "Shape Clicker": "形状点击",
            "Shape Clicker_desc": "形状点击",
            "Whack A Mole": "打地鼠",
            "Whack A Mole_desc": "打地鼠游戏",
            "Bubble Shooter": "泡泡龙",
            "Bubble Shooter_desc": "泡泡龙射击",
            "Candy Crush": "糖果消消乐",
            "Candy Crush_desc": "糖果消消乐",
            "Jump Game": "跳跃冒险",
            "Jump Game_desc": "跳跃冒险",
            "Pac-Man": "吃豆人",
            "Pac-Man_desc": "经典吃豆人",
            "Snake": "贪吃蛇",
            "Snake_desc": "贪吃蛇",
            "Space Invaders": "太空入侵者",
            "Space Invaders_desc": "太空入侵者",
            "Tetris": "俄罗斯方块",
            "Tetris_desc": "俄罗斯方块",
            "Tower Blocks": "叠叠乐",
            "Tower Blocks_desc": "叠叠乐",
            "Gomoku": "五子棋",
            "Gomoku_desc": "五子棋对战",
            "Rock Paper Scissors": "石头剪刀布",
            "Rock Paper Scissors_desc": "石头剪刀布",
            "Tic Tac Toe": "井字棋",
            "Tic Tac Toe_desc": "井字棋",
            "Color Match": "颜色匹配",
            "Color Match_desc": "颜色匹配记忆",
            "Match Pairs": "配对记忆",
            "Match Pairs_desc": "配对记忆",
            "Memory Card": "记忆卡片",
            "Memory Card_desc": "记忆卡片翻牌",
            "Simon Says": "西蒙说",
            "Simon Says_desc": "西蒙说记忆",
            "Hangman": "猜单词",
            "Hangman_desc": "猜单词游戏",
            "Speed Typing": "速度打字",
            "Speed Typing_desc": "速度打字练习",
            "Type Master": "打字大师",
            "Type Master_desc": "打字大师",
            "Typing Speed Challenge": "打字速度挑战",
            "Typing Speed Challenge_desc": "打字速度挑战",
            "Simon": "西蒙",
            "Simon_desc": "西蒙记忆游戏",
            "Color Picker": "颜色选择器",
            "Color Picker_desc": "颜色选择休闲游戏",
            "Dice Roll Simulator": "骰子模拟器",
            "Dice Roll Simulator_desc": "骰子模拟器",
            "Quiz": "知识问答",
            "Quiz_desc": "知识问答",
            "Speak Number Guessing": "语音猜数字",
            "Speak Number Guessing_desc": "语音猜数字",
            "Type Number Guessing": "打字猜数字",
            "Type Number Guessing_desc": "打字猜数字",
            "Sokoban": "推箱子",
            "Sokoban_desc": "3D推箱子解谜",
            "Tangram": "七巧板",
            "Tangram_desc": "七巧板拼图",
            "Dodge Game": "躲避障碍",
            "Dodge Game_desc": "3D躲避障碍",
            "Space Shooter": "太空射击",
            "Space Shooter_desc": "太空射击",
            "Platform Game": "平台跳跃",
            "Platform Game_desc": "平台跳跃冒险",
            "Reaction Test": "反应测试",
            "Reaction Test_desc": "反应速度测试",
            "Reversi": "黑白棋",
            "Reversi_desc": "3D黑白棋",
            "Solitaire": "纸牌接龙",
            "Solitaire_desc": "经典纸牌接龙",
            "Mahjong Connect": "麻将连连看",
            "Mahjong Connect_desc": "麻将配对消除",
            "Rhythm Game": "音乐节奏",
            "Rhythm Game_desc": "音乐节奏游戏",
            "Coloring Book": "涂色画册",
            "Coloring Book_desc": "创意涂色游戏"
        },
        "stats": {
            "section_eyebrow": "📊 分类统计",
            "title": "分类统计",
            "subtitle": "7大类别，各有精彩",
            "puzzle": "益智解谜",
            "action": "动作反应",
            "arcade": "经典街机",
            "board": "棋牌策略",
            "memory": "记忆训练",
            "typing": "打字练习",
            "casual": "休闲娱乐"
        },
        "footer": {
            "description": "53款精品HTML5游戏，随时随地畅玩无限",
            "copyright": "© 2025 WebGameHub. Made with ❤️ for gamers"
        },
        "back_to_top": "回到顶部",
        "a11y": {
            "search": "搜索游戏",
            "open_menu": "打开菜单",
            "skip_nav": "跳转到主要内容"
        },
        "cookie": {
            "title": "我们使用 Cookie",
            "description": "本网站使用 Cookie 来改善您的浏览体验、分析网站流量并展示个性化广告。继续使用本网站即表示您同意我们的 Cookie 政策。",
            "learn_more": "了解更多",
            "accept_all": "全部接受",
            "reject_all": "拒绝非必需",
            "customize": "自定义",
            "hide_settings": "收起",
            "preferences_title": "Cookie 偏好设置",
            "necessary": "必要 Cookie",
            "necessary_desc": "网站正常运行所必需",
            "analytics": "分析 Cookie",
            "analytics_desc": "帮助我们了解访客行为",
            "advertising": "广告 Cookie",
            "advertising_desc": "用于展示个性化广告",
            "save_preferences": "保存设置"
        }
    },
    'en': {
        "nav": {
            "home": "Home",
            "games": "Games",
            "stats": "Stats",
            "about": "About",
            "contact": "Contact",
            "privacy": "Privacy Policy",
            "terms": "Terms of Service",
            "cookie_settings": "Cookie Settings"
        },
        "hero": {
            "eyebrow": "53 Games · Free to Play",
            "title": "53 Premium Games",
            "subtitle": "Play Anywhere, Anytime",
            "description": "From classic arcade to innovative puzzles, from action adventures to casual relaxation, curated 53 HTML5 games, no download required, play instantly.",
            "stats": {
                "games": "Total Games",
                "categories": "Categories",
                "free": "Free to Play"
            },
            "cta": "Start Playing"
        },
        "games": {
            "section_eyebrow": "🎮 Game Library",
            "title": "Game Lobby",
            "subtitle": "Choose your favorite category and start playing",
            "filter": {
                "all": "All",
                "puzzle": "Puzzle",
                "action": "Action",
                "arcade": "Arcade",
                "board": "Board",
                "memory": "Memory",
                "typing": "Typing",
                "casual": "Casual"
            },
            "empty": {
                "title": "No games found",
                "description": "Try other keywords or categories"
            },
            "search_placeholder": "Search games...",
            "no_results": "No games found",
            "try_other": "Try other keywords or categories",
            "2048": "2048",
            "2048_desc": "Classic number merging puzzle game",
            "Jigsaw Puzzle": "Jigsaw Puzzle",
            "Jigsaw Puzzle_desc": "Fun jigsaw puzzle challenge",
            "Klotski": "Klotski",
            "Klotski_desc": "Slider puzzle",
            "Maze Escape": "Maze Escape",
            "Maze Escape_desc": "Maze escape adventure",
            "Minesweeper": "Minesweeper",
            "Minesweeper_desc": "Classic minesweeper game",
            "Spot Difference": "Spot Difference",
            "Spot Difference_desc": "Find the difference challenge",
            "Sudoku": "Sudoku",
            "Sudoku_desc": "Sudoku logic game",
            "Tilting Maze": "Tilting Maze",
            "Tilting Maze_desc": "Gravity maze",
            "Archery": "Archery",
            "Archery_desc": "Archery competition",
            "Breakout": "Breakout",
            "Breakout_desc": "Break bricks game",
            "Crossy Road": "Crossy Road",
            "Crossy Road_desc": "Cross the road challenge",
            "Emoji Catcher": "Emoji Catcher",
            "Emoji Catcher_desc": "Emoji catching game",
            "Flappy Bird": "Flappy Bird",
            "Flappy Bird_desc": "Flappy bird game",
            "Fruit Slicer": "Fruit Slicer",
            "Fruit Slicer_desc": "Fruit slicing fun",
            "Insect Catch": "Insect Catch",
            "Insect Catch_desc": "Catch insects",
            "Piano Tiles": "Piano Tiles",
            "Piano Tiles_desc": "Don't tap white tiles",
            "Ping Pong": "Ping Pong",
            "Ping Pong_desc": "Ping pong battle",
            "Shape Clicker": "Shape Clicker",
            "Shape Clicker_desc": "Click shapes",
            "Whack A Mole": "Whack A Mole",
            "Whack A Mole_desc": "Whack a mole game",
            "Bubble Shooter": "Bubble Shooter",
            "Bubble Shooter_desc": "Bubble shooter game",
            "Candy Crush": "Candy Crush",
            "Candy Crush_desc": "Candy matching game",
            "Jump Game": "Jump Game",
            "Jump Game_desc": "Jump adventure",
            "Pac-Man": "Pac-Man",
            "Pac-Man_desc": "Classic Pac-Man",
            "Snake": "Snake",
            "Snake_desc": "Snake game",
            "Space Invaders": "Space Invaders",
            "Space Invaders_desc": "Space invaders",
            "Tetris": "Tetris",
            "Tetris_desc": "Tetris game",
            "Tower Blocks": "Tower Blocks",
            "Tower Blocks_desc": "Stacking game",
            "Gomoku": "Gomoku",
            "Gomoku_desc": "Five in a row",
            "Rock Paper Scissors": "Rock Paper Scissors",
            "Rock Paper Scissors_desc": "Rock paper scissors",
            "Tic Tac Toe": "Tic Tac Toe",
            "Tic Tac Toe_desc": "Tic tac toe",
            "Color Match": "Color Match",
            "Color Match_desc": "Color matching memory",
            "Match Pairs": "Match Pairs",
            "Match Pairs_desc": "Memory pairs game",
            "Memory Card": "Memory Card",
            "Memory Card_desc": "Memory card flip",
            "Simon Says": "Simon Says",
            "Simon Says_desc": "Simon says memory game",
            "Hangman": "Hangman",
            "Hangman_desc": "Guess the word",
            "Speed Typing": "Speed Typing",
            "Speed Typing_desc": "Speed typing practice",
            "Type Master": "Type Master",
            "Type Master_desc": "Typing master",
            "Typing Speed Challenge": "Typing Speed Challenge",
            "Typing Speed Challenge_desc": "Typing speed challenge",
            "Simon": "Simon",
            "Simon_desc": "Simon memory game",
            "Color Picker": "Color Picker",
            "Color Picker_desc": "Color picking casual game",
            "Dice Roll Simulator": "Dice Roll Simulator",
            "Dice Roll Simulator_desc": "Dice roll simulator",
            "Quiz": "Quiz",
            "Quiz_desc": "Quiz game",
            "Speak Number Guessing": "Speak Number Guessing",
            "Speak Number Guessing_desc": "Voice number guessing",
            "Type Number Guessing": "Type Number Guessing",
            "Type Number Guessing_desc": "Type number guessing",
            "Sokoban": "Sokoban",
            "Sokoban_desc": "3D Sokoban puzzle",
            "Tangram": "Tangram",
            "Tangram_desc": "Tangram puzzle",
            "Dodge Game": "Dodge Game",
            "Dodge Game_desc": "3D dodge obstacles",
            "Space Shooter": "Space Shooter",
            "Space Shooter_desc": "Space shooter game",
            "Platform Game": "Platform Game",
            "Platform Game_desc": "Platform jumping adventure",
            "Reaction Test": "Reaction Test",
            "Reaction Test_desc": "Reaction speed test",
            "Reversi": "Reversi",
            "Reversi_desc": "3D Reversi",
            "Solitaire": "Solitaire",
            "Solitaire_desc": "Classic Solitaire",
            "Mahjong Connect": "Mahjong Connect",
            "Mahjong Connect_desc": "Mahjong matching",
            "Rhythm Game": "Rhythm Game",
            "Rhythm Game_desc": "Rhythm music game",
            "Coloring Book": "Coloring Book",
            "Coloring Book_desc": "Creative coloring game"
        },
        "stats": {
            "section_eyebrow": "📊 Category Stats",
            "title": "Category Stats",
            "subtitle": "7 Categories, Each with Excellence",
            "puzzle": "Puzzle",
            "action": "Action",
            "arcade": "Arcade",
            "board": "Board",
            "memory": "Memory",
            "typing": "Typing",
            "casual": "Casual"
        },
        "footer": {
            "description": "53 Premium HTML5 Games, Play Anywhere, Anytime",
            "copyright": "© 2025 WebGameHub. Made with ❤️ for gamers"
        },
        "back_to_top": "Back to Top",
        "a11y": {
            "search": "Search games",
            "open_menu": "Open menu",
            "skip_nav": "Skip to main content"
        },
        "cookie": {
            "title": "We Use Cookies",
            "description": "This website uses cookies to enhance your browsing experience, analyze site traffic, and display personalized ads. By continuing to use this site, you agree to our Cookie Policy.",
            "learn_more": "Learn more",
            "accept_all": "Accept All",
            "reject_all": "Reject Non-Essential",
            "customize": "Customize",
            "hide_settings": "Hide",
            "preferences_title": "Cookie Preferences",
            "necessary": "Necessary Cookies",
            "necessary_desc": "Required for website to function",
            "analytics": "Analytics Cookies",
            "analytics_desc": "Help us understand visitor behavior",
            "advertising": "Advertising Cookies",
            "advertising_desc": "Used for personalized advertising",
            "save_preferences": "Save Preferences"
        }
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('WebGameHub-lang') || this.detectLanguage();
        this.translations = TRANSLATIONS;
        this.availableLangs = ['zh-CN', 'en'];
    }

    init() {
        this.render();
        this.bindEvents();
        
        // Dispatch custom event for i18n initialized
        document.dispatchEvent(new CustomEvent('i18n:initialized', {
            detail: { language: this.currentLang }
        }));
    }

    detectLanguage() {
        const browserLang = navigator.language;
        if (browserLang.startsWith('zh')) return 'zh-CN';
        return 'en';
    }

    t(key, fallback = '') {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return fallback;
            }
        }
        
        return value || fallback;
    }

    setLanguage(lang) {
        if (!this.availableLangs.includes(lang)) {
            lang = 'en';
        }
        
        this.currentLang = lang;
        localStorage.setItem('WebGameHub-lang', lang);
        this.render();
        
        // Dispatch custom event for language change
        document.dispatchEvent(new CustomEvent('i18n:languageChanged', {
            detail: { language: lang }
        }));
    }

    render() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation) {
                el.textContent = translation;
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const attr = el.getAttribute('data-i18n-attr');
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation && attr) {
                el.setAttribute(attr, translation);
            }
        });

        document.documentElement.lang = this.currentLang;
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }

    bindEvents() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.dataset.lang);
            });
        });
    }
}

const i18n = new I18n();
window.i18n = i18n; // Expose to global scope for other scripts
document.addEventListener('DOMContentLoaded', () => i18n.init());
