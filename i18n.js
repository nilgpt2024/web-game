// Internationalization (i18n) System
// Translation data embedded directly to avoid CORS issues
const TRANSLATIONS = {
    'zh-CN': {
        "nav": {
            "home": "首页",
            "games": "游戏",
            "stats": "统计",
            "directory": "作品目录",
            "guide": "玩法指南",
            "tags": "标签云",
            "about": "关于我们",
            "contact": "联系我们",
            "privacy": "隐私政策",
            "terms": "服务条款",
            "cookie_settings": "Cookie设置"
        },
        "hero": {
            "badge": "款 AI 生成游戏 · 持续收录中",
            "title_1": "AI 生成游戏，不止于收藏",
            "title_2": "收录即可玩，打开即上手",
            "desc_pre": "WebGameHub 收录 ",
            "desc_post": " 款由 AI 生成并持续更新的浏览器游戏：益智解谜、动作反应、经典街机、生成艺术……无需下载、无需注册，打开即玩，持续收录中。",
            "cta_play": "开始试玩",
            "cta_guide": "查看玩法指南",
            "scroll": "向下滚动",
            "stat_games": "收录作品",
            "stat_categories": "游戏分类",
            "stat_playable": "可直接试玩"
        },
        "directory": {
            "eyebrow": "作品目录",
            "title": "收录即可玩，不是收藏夹",
            "subtitle_pre": "全部 ",
            "subtitle_post": " 款游戏均可直接试玩，分类筛选、即时搜索，找到即玩。"
        },
        "tags": {
            "eyebrow": "标签云",
            "title": "玩法标签云",
            "subtitle": "从每款游戏的玩法描述中提炼的真实关键词，点击标签即可搜索",
            "tech_title": "技术能力",
            "tech_html5": "HTML5",
            "tech_js": "原生 JavaScript",
            "tech_play": "即开即玩"
        },
        "guide": {
            "eyebrow": "指南",
            "title": "玩法与创作指南",
            "subtitle": "从选择到上手，再到理解收录背后的标准",
            "card1_title": "作品选择指南",
            "card1_head": "从分类与关键词快速定位作品",
            "card1_desc": "从分类、玩法关键词或直接搜索入手，快速定位你想试玩的作品。",
            "card2_title": "玩法指南",
            "card2_head": "打开即玩，无需下载注册",
            "card2_desc": "全部游戏均在浏览器中直接运行，无需下载、无需注册，桌面与移动端打开即玩。",
            "card3_title": "收录与创作指南",
            "card3_head": "每款收录作品都经过可玩性核验",
            "card3_desc": "每款收录作品均由 AI 生成并逐项核验可运行，持续收录，保证收录即可玩。",
            "read": "阅读指南"
        },
        "games": {
            "filter": {
                "all": "全部",
                "puzzle": "益智解谜",
                "action": "动作反应",
                "arcade": "经典街机",
                "board": "棋牌策略",
                "memory": "记忆训练",
                "typing": "打字练习",
                "casual": "休闲娱乐",
                "astra": "AI生成",
                "genart": "生成艺术"
            },
            "empty": {
                "title": "未找到游戏",
                "description": "试试其他关键词或分类"
            },
            "search_placeholder": "搜索游戏或玩法",
            "no_results": "未找到游戏",
            "try_other": "试试其他关键词或分类",
            "play": "开始试玩",
            "load_more": "加载更多",
            "loading": "加载中...",
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
            "Mount & Blade": "骑马与砍杀",
            "Mount & Blade_desc": "3D马上战场混战，骑射与挥砍",
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
        "footer": {
            "desc_pre": "WebGameHub 收录 ",
            "desc_post": " 款 AI 生成游戏合集，浏览器即开即玩，持续收录中。",
            "note": "每款收录游戏均可直接在浏览器中试玩，无需下载或注册。",
            "col_site": "网站信息",
            "col_dir": "目录",
            "col_legal": "合规",
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
            "directory": "Directory",
            "guide": "How to Play",
            "tags": "Tags",
            "about": "About",
            "contact": "Contact",
            "privacy": "Privacy Policy",
            "terms": "Terms of Service",
            "cookie_settings": "Cookie Settings"
        },
        "hero": {
            "badge": "AI Generated Games · Continuously Curated",
            "title_1": "AI-Generated Games, Not Just a Collection",
            "title_2": "Curated to Play, Instant to Start",
            "desc_pre": "A curated collection of ",
            "desc_post": " AI-generated, continuously updated browser games: puzzle, action, arcade classics, generative art… No download, no sign-up — open and play.",
            "cta_play": "Start Playing",
            "cta_guide": "View Guide",
            "scroll": "SCROLL",
            "stat_games": "Games Curated",
            "stat_categories": "Categories",
            "stat_playable": "Playable Instantly"
        },
        "directory": {
            "eyebrow": "Directory",
            "title": "Curated to Play, Not Just Collected",
            "subtitle_pre": "All ",
            "subtitle_post": " games are instantly playable — filter by category, search by keyword, click and play."
        },
        "tags": {
            "eyebrow": "Tags",
            "title": "Play-Style Tags",
            "subtitle": "Real keywords mined from every game's description — click a tag to search",
            "tech_title": "Tech Stack",
            "tech_html5": "HTML5",
            "tech_js": "Vanilla JavaScript",
            "tech_play": "Instant Play"
        },
        "guide": {
            "eyebrow": "Guide",
            "title": "How to Play & Create",
            "subtitle": "From choosing a game to understanding how this collection is built",
            "card1_title": "Game Selection Guide",
            "card1_head": "Find your next game by category or keyword",
            "card1_desc": "Start from categories, play-style tags, or direct search to quickly find the game you want to try.",
            "card2_title": "How to Play",
            "card2_head": "Open and play — no download, no sign-up",
            "card2_desc": "Every game runs directly in your browser — no download, no sign-up. Open and play on desktop or mobile.",
            "card3_title": "Curation & Creation",
            "card3_head": "Every entry is verified playable",
            "card3_desc": "Every listed work is AI-generated and verified playable; the collection keeps growing.",
            "read": "Read Guide"
        },
        "games": {
            "filter": {
                "all": "All",
                "puzzle": "Puzzle",
                "action": "Action",
                "arcade": "Arcade",
                "board": "Board",
                "memory": "Memory",
                "typing": "Typing",
                "casual": "Casual",
                "astra": "AI Generated",
                "genart": "Generative Art"
            },
            "empty": {
                "title": "No games found",
                "description": "Try other keywords or categories"
            },
            "search_placeholder": "Search games or play styles",
            "no_results": "No games found",
            "try_other": "Try other keywords or categories",
            "play": "Play Now",
            "load_more": "Load More",
            "loading": "Loading...",
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
            "Mount & Blade": "Mount & Blade",
            "Mount & Blade_desc": "3D mounted battlefield with bow and blade",
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
        "footer": {
            "desc_pre": "A collection of ",
            "desc_post": " AI-generated games — play instantly in your browser, continuously updated.",
            "note": "Every curated game is playable directly in your browser — no download, no sign-up.",
            "col_site": "Site",
            "col_dir": "Directory",
            "col_legal": "Legal",
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
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        this.currentLang = urlLang || localStorage.getItem('WebGameHub-lang') || this.detectLanguage();
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

    // 按指定语言取值（不改变当前语言），供脚本生成英文副标题等场景使用
    tLang(lang, key, fallback = '') {
        const keys = key.split('.');
        let value = this.translations[lang];
        
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
