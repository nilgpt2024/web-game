const gamesData = {
    Puzzle: [
        { name: '2048', path: 'games/Puzzle/2048/index.html', icon: 'fas fa-th', desc: '经典数字合并益智游戏' },
        { name: 'Jigsaw Puzzle', path: 'games/Puzzle/Jigsaw-Puzzle/index.html', icon: 'fas fa-puzzle-piece', desc: '趣味拼图挑战' },
        { name: 'Klotski', path: 'games/Puzzle/Klotski/index.html', icon: 'fas fa-chess-board', desc: '华容道滑块解谜' },
        { name: 'Maze Escape', path: 'games/Puzzle/Maze-Escape/index.html', icon: 'fas fa-route', desc: '迷宫逃脱冒险' },
        { name: 'Minesweeper', path: 'games/Puzzle/Minesweeper/index.html', icon: 'fas fa-bomb', desc: '经典扫雷游戏' },
        { name: 'Spot Difference', path: 'games/Puzzle/Spot-Difference/index.html', icon: 'fas fa-search', desc: '找不同挑战' },
        { name: 'Sudoku', path: 'games/Puzzle/Sudoku/index.html', icon: 'fas fa-table-cells', desc: '数独逻辑游戏' },
        { name: 'Tilting Maze', path: 'games/Puzzle/Tilting-Maze/index.html', icon: 'fas fa-compass', desc: '重力迷宫' },
        { name: 'Sokoban', path: 'games/Puzzle/Sokoban/index.html', icon: 'fas fa-box', desc: '3D推箱子解谜' },
        { name: 'Tangram', path: 'games/Puzzle/Tangram/index.html', icon: 'fas fa-shapes', desc: '七巧板拼图' }
    ],
    Action: [
        { name: 'Archery', path: 'games/Action/Archery/index.html', icon: 'fas fa-bullseye', desc: '射箭竞技' },
        { name: 'Breakout', path: 'games/Action/Breakout/index.html', icon: 'fas fa-cube', desc: '打砖块游戏' },
        { name: 'Crossy Road', path: 'games/Action/Crossy-Road/index.html', icon: 'fas fa-road', desc: '过马路挑战' },
        { name: 'Emoji Catcher', path: 'games/Action/Emoji-Catcher/index.html', icon: 'fas fa-smile', desc: '表情符号捕捉' },
        { name: 'Flappy Bird', path: 'games/Action/Flappy-Bird/index.html', icon: 'fas fa-dove', desc: '飞翔的小鸟' },
        { name: 'Fruit Slicer', path: 'games/Action/Fruit-Slicer/index.html', icon: 'fas fa-lemon', desc: '水果切切乐' },
        { name: 'Insect Catch', path: 'games/Action/Insect-Catch/index.html', icon: 'fas fa-bug', desc: '昆虫捕捉' },
        { name: 'Piano Tiles', path: 'games/Action/Piano-Tiles/index.html', icon: 'fas fa-music', desc: '别踩白块' },
        { name: 'Ping Pong', path: 'games/Action/Ping-Pong/index.html', icon: 'fas fa-table-tennis-paddle-ball', desc: '乒乓球对战' },
        { name: 'Shape Clicker', path: 'games/Action/Shape-Clicker/index.html', icon: 'fas fa-shapes', desc: '形状点击' },
        { name: 'Whack A Mole', path: 'games/Action/Whack-A-Mole/index.html', icon: 'fas fa-hammer', desc: '打地鼠游戏' },
        { name: 'Dodge Game', path: 'games/Action/Dodge-Game/index.html', icon: 'fas fa-running', desc: '3D躲避障碍' },
        { name: 'Space Shooter', path: 'games/Action/Space-Shooter/index.html', icon: 'fas fa-rocket', desc: '太空射击' },
        { name: 'Platform Game', path: 'games/Action/Platform-Game/index.html', icon: 'fas fa-person-running', desc: '平台跳跃冒险' },
        { name: 'Reaction Test', path: 'games/Action/Reaction-Test/index.html', icon: 'fas fa-bolt', desc: '反应速度测试' }
    ],
    Arcade: [
        { name: 'Bubble Shooter', path: 'games/Arcade/Bubble-Shooter/index.html', icon: 'fas fa-circle', desc: '泡泡龙射击' },
        { name: 'Candy Crush', path: 'games/Arcade/Candy-Crush/index.html', icon: 'fas fa-candy-cane', desc: '糖果消消乐' },
        { name: 'Jump Game', path: 'games/Arcade/Jump-Game/index.html', icon: 'fas fa-person-running', desc: '跳跃冒险' },
        { name: 'Pac-Man', path: 'games/Arcade/Pac-Man/index.html', icon: 'fas fa-ghost', desc: '经典吃豆人' },
        { name: 'Snake', path: 'games/Arcade/Snake/index.html', icon: 'fas fa-worm', desc: '贪吃蛇' },
        { name: 'Space Invaders', path: 'games/Arcade/Space-Invaders/index.html', icon: 'fas fa-space-shuttle', desc: '太空入侵者' },
        { name: 'Tetris', path: 'games/Arcade/Tetris/index.html', icon: 'fas fa-square', desc: '俄罗斯方块' },
        { name: 'Tower Blocks', path: 'games/Arcade/Tower-Blocks/index.html', icon: 'fas fa-layer-group', desc: '叠叠乐' }
    ],
    Board: [
        { name: 'Gomoku', path: 'games/Board/Gomoku/index.html', icon: 'fas fa-circle-dot', desc: '五子棋对战' },
        { name: 'Rock Paper Scissors', path: 'games/Board/Rock-Paper-Scissors/index.html', icon: 'fas fa-hand-scissors', desc: '石头剪刀布' },
        { name: 'Tic Tac Toe', path: 'games/Board/Tic-Tac-Toe/index.html', icon: 'fas fa-hashtag', desc: '井字棋' },
        { name: 'Reversi', path: 'games/Board/Reversi/index.html', icon: 'fas fa-circle-half-stroke', desc: '3D黑白棋' },
        { name: 'Solitaire', path: 'games/Board/Solitaire/index.html', icon: 'fas fa-layer-group', desc: '纸牌接龙' },
        { name: 'Mahjong Connect', path: 'games/Board/Mahjong-Connect/index.html', icon: 'fas fa-border-all', desc: '麻将连连看' }
    ],
    Memory: [
        { name: 'Color Match', path: 'games/Memory/Color-Match/index.html', icon: 'fas fa-palette', desc: '颜色匹配记忆' },
        { name: 'Match Pairs', path: 'games/Memory/Match-Pairs/index.html', icon: 'fas fa-clone', desc: '配对记忆' },
        { name: 'Memory Card', path: 'games/Memory/Memory-Card/index.html', icon: 'fas fa-id-card', desc: '记忆卡片翻牌' },
        { name: 'Simon Says', path: 'games/Memory/Simon-Says/index.html', icon: 'fas fa-circle-notch', desc: '西蒙说记忆' }
    ],
    Typing: [
        { name: 'Hangman', path: 'games/Typing/Hangman/index.html', icon: 'fas fa-spell-check', desc: '猜单词游戏' },
        { name: 'Speed Typing', path: 'games/Typing/Speed-Typing/index.html', icon: 'fas fa-keyboard', desc: '速度打字练习' },
        { name: 'Type Master', path: 'games/Typing/Type-Master/index.html', icon: 'fas fa-font', desc: '打字大师' },
        { name: 'Typing Speed Challenge', path: 'games/Typing/Typing-Speed-Challenge/index.html', icon: 'fas fa-stopwatch', desc: '打字速度挑战' }
    ],
    Casual: [
        { name: 'Dice Roll Simulator', path: 'games/Casual/Dice-Roll-Simulator/index.html', icon: 'fas fa-dice', desc: '骰子模拟器' },
        { name: 'Quiz', path: 'games/Casual/Quiz/index.html', icon: 'fas fa-question-circle', desc: '知识问答' },
        { name: 'Speak Number Guessing', path: 'games/Casual/Speak-Number-Guessing/index.html', icon: 'fas fa-microphone', desc: '语音猜数字' },
        { name: 'Type Number Guessing', path: 'games/Casual/Type-Number-Guessing/index.html', icon: 'fas fa-calculator', desc: '打字猜数字' },
        { name: 'Rhythm Game', path: 'games/Casual/Rhythm-Game/index.html', icon: 'fas fa-music', desc: '音乐节奏游戏' },
        { name: 'Coloring Book', path: 'games/Casual/Coloring-Book/index.html', icon: 'fas fa-paint-brush', desc: '涂色画册' }
    ]
};

let currentCategory = 'all';
let allGames = [];
let i18nInitialized = false;

document.addEventListener('i18n:initialized', () => {
    i18nInitialized = true;
    initializeApp();
});

function initializeApp() {
    for (const category in gamesData) {
        gamesData[category].forEach(game => {
            allGames.push({ ...game, category: category });
        });
    }

    renderGames();
    bindEvents();
    setupNavigation();
    setupBackToTop();
    setupMobileMenu();
    setupScrollReveal();
    setupNavbarScroll();
    
    console.log('%c🎮 WebGameHub v2.0', 'font-size: 20px; font-weight: bold; color: #0d9488;');
    console.log(`%c${window.i18n?.t('hero.stats.games') || 'Total games'}: ${allGames.length}`, 'color: #ea580c;');
}

function renderGames(category = 'all', searchTerm = '') {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';

    let gamesToShow = allGames;

    if (category !== 'all') {
        gamesToShow = allGames.filter(game => game.category === category);
    }

    if (searchTerm) {
        gamesToShow = gamesToShow.filter(game => {
            const localizedName = window.i18n?.t(`games.${game.name}`) || game.name;
            const localizedDesc = window.i18n?.t(`games.${game.name}_desc`) || game.desc;
            return localizedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   localizedDesc.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    gamesToShow.forEach((game, index) => {
        const gameCard = createGameCard(game, index);
        gamesGrid.appendChild(gameCard);
    });

    if (gamesToShow.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-state';
        emptyDiv.innerHTML = `
            <div class="empty-state-icon"><i class="fas fa-search"></i></div>
            <h3 class="empty-state-title">${window.i18n?.t('games.no_results') || '未找到游戏'}</h3>
            <p class="empty-state-text">${window.i18n?.t('games.try_other') || '试试其他关键词或分类'}</p>
        `;
        gamesGrid.appendChild(emptyDiv);
    }
}

function createGameCard(game, index) {
    const card = document.createElement('a');
    card.className = 'game-card';
    card.href = game.path;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.dataset.category = game.category;
    card.style.animationDelay = `${index * 35}ms`;

    const localizedName = window.i18n?.t(`games.${game.name}`) || game.name;
    const localizedDesc = window.i18n?.t(`games.${game.name}_desc`) || game.desc;
    const localizedCategory = getCategoryName(game.category);

    card.innerHTML = `
        <div class="card-shell">
            <div class="card-core">
                <div class="game-icon-wrap">
                    <i class="${game.icon}"></i>
                </div>
                <h3 class="game-name">${localizedName}</h3>
                <span class="game-cat-tag">${localizedCategory}</span>
                <p class="game-desc">${localizedDesc}</p>
            </div>
        </div>
    `;

    return card;
}

function getCategoryName(category) {
    const i18nKeys = {
        'Puzzle': 'games.filter.puzzle',
        'Action': 'games.filter.action',
        'Arcade': 'games.filter.arcade',
        'Board': 'games.filter.board',
        'Memory': 'games.filter.memory',
        'Typing': 'games.filter.typing',
        'Casual': 'games.filter.casual'
    };
    return window.i18n?.t(i18nKeys[category]) || category;
}

function bindEvents() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const category = btn.dataset.category;
            currentCategory = category;
            renderGames(category, document.getElementById('searchInput').value);
        });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        renderGames(currentCategory, e.target.value);
    });

    const mobileSearchInput = document.getElementById('mobileSearchInput');
    mobileSearchInput.addEventListener('input', (e) => {
        searchInput.value = e.target.value;
        renderGames(currentCategory, e.target.value);
    });
}

function setupNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('mobileOverlay');
    const mobileLinks = overlay.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        const isOpen = overlay.classList.contains('open');
        overlay.classList.toggle('open', !isOpen);
        menuBtn.classList.toggle('active', !isOpen);
        menuBtn.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('open');
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

function setupScrollReveal() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.stat-fill');
                if (fill) {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            fill.style.width = width;
                        });
                    });
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stat-box').forEach(box => {
        statObserver.observe(box);
    });
}

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.pageYOffset > 50);
                ticking = false;
            });
            ticking = true;
        }
    });
}

document.addEventListener('i18n:languageChanged', () => {
    renderGames(currentCategory, document.getElementById('searchInput').value);
});

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s ease infinite';

    if (!document.getElementById('rainbow-style')) {
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}

// Cookie Settings Button Handler
document.addEventListener('DOMContentLoaded', () => {
    const cookieSettingsBtn = document.getElementById('cookieSettingsBtn');
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', () => {
            if (window.cookieConsent) {
                window.cookieConsent.showPreferences();
            }
        });
    }
});
