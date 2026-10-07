const gamesData = {
    Puzzle: [
        { name: '2048', path: 'games/Puzzle/2048/index.html', preview: 'games/Puzzle/2048/preview.png', icon: 'fas fa-th', desc: '经典数字合并益智游戏' },
        { name: 'Jigsaw Puzzle', path: 'games/Puzzle/Jigsaw-Puzzle/index.html', preview: 'games/Puzzle/Jigsaw-Puzzle/preview.png', icon: 'fas fa-puzzle-piece', desc: '趣味拼图挑战' },
        { name: 'Klotski', path: 'games/Puzzle/Klotski/index.html', preview: 'games/Puzzle/Klotski/preview.png', icon: 'fas fa-chess-board', desc: '华容道滑块解谜' },
        { name: 'Maze Escape', path: 'games/Puzzle/Maze-Escape/index.html', preview: 'games/Puzzle/Maze-Escape/preview.png', icon: 'fas fa-route', desc: '迷宫逃脱冒险' },
        { name: 'Minesweeper', path: 'games/Puzzle/Minesweeper/index.html', preview: 'games/Puzzle/Minesweeper/preview.png', icon: 'fas fa-bomb', desc: '经典扫雷游戏' },
        { name: 'Spot Difference', path: 'games/Puzzle/Spot-Difference/index.html', preview: 'games/Puzzle/Spot-Difference/preview.png', icon: 'fas fa-search', desc: '找不同挑战' },
        { name: 'Sudoku', path: 'games/Puzzle/Sudoku/index.html', preview: 'games/Puzzle/Sudoku/preview.png', icon: 'fas fa-table-cells', desc: '数独逻辑游戏' },
        { name: 'Tilting Maze', path: 'games/Puzzle/Tilting-Maze/index.html', preview: 'games/Puzzle/Tilting-Maze/preview.png', icon: 'fas fa-compass', desc: '重力迷宫' },
        { name: 'Sokoban', path: 'games/Puzzle/Sokoban/index.html', preview: 'games/Puzzle/Sokoban/preview.png', icon: 'fas fa-box', desc: '3D推箱子解谜' },
        { name: 'Tangram', path: 'games/Puzzle/Tangram/index.html', preview: 'games/Puzzle/Tangram/preview.png', icon: 'fas fa-shapes', desc: '七巧板拼图' },
        { name: 'Cialdini-Persuasion-Lab', path: 'games/Puzzle/Cialdini-Persuasion-Lab/index.html', preview: 'games/Puzzle/Cialdini-Persuasion-Lab/preview.png', icon: 'fas fa-brain', desc: '西奥迪尼影响力原理说服力训练' },
        { name: 'Wordle', path: 'games/Puzzle/Wordle/index.html', preview: 'games/Puzzle/Wordle/preview.png', icon: 'fas fa-font', desc: '经典五字母猜词游戏' },
        { name: 'Mastermind', path: 'games/Puzzle/Mastermind/index.html', preview: 'games/Puzzle/Mastermind/preview.png', icon: 'fas fa-circle-dot', desc: '破解密码的经典推理游戏' },
        { name: 'Nonogram', path: 'games/Puzzle/Nonogram/index.html', preview: 'games/Puzzle/Nonogram/preview.png', icon: 'fas fa-table-cells', desc: '逻辑推理填色游戏' },
        { name: 'Lights Out', path: 'games/Puzzle/Lights-Out/index.html', preview: 'games/Puzzle/Lights-Out/preview.png', icon: 'fas fa-lightbulb', desc: '经典点灯解谜游戏' },
        { name: '颜色洪水', path: 'games/Puzzle/Color-Flood/index.html', preview: 'games/Puzzle/Color-Flood/preview.png', icon: 'fas fa-fill-drip', desc: 'AI生成的颜色填充解谜' },
        { name: '萤火虫罐', path: 'games/Puzzle/Firefly-Jar/index.html', preview: 'games/Puzzle/Firefly-Jar/preview.png', icon: 'fas fa-bug', desc: 'AI生成的萤火虫收集游戏' },
        { name: '魔方', path: 'games/Puzzle/Rubiks-Cube/index.html', preview: 'games/Puzzle/Rubiks-Cube/preview.png', icon: 'fas fa-cube', desc: 'AI生成的3D魔方游戏' },
        { name: '汉诺塔', path: 'games/Puzzle/Tower-of-Hanoi/index.html', preview: 'games/Puzzle/Tower-of-Hanoi/preview.png', icon: 'fas fa-layer-group', desc: 'AI生成的经典汉诺塔解谜' },
        { name: '不在场证明', path: 'games/Puzzle/Alibi/index.html', preview: 'games/Puzzle/Alibi/preview.png', icon: 'fas fa-search', desc: 'AI生成·推理解谜' },
        { name: '字母解谜', path: 'games/Puzzle/Alphabet/index.html', preview: 'games/Puzzle/Alphabet/preview.png', icon: 'fas fa-font', desc: 'AI生成·字母游戏' },
        { name: '动物配对', path: 'games/Puzzle/Animals/index.html', preview: 'games/Puzzle/Animals/preview.png', icon: 'fas fa-paw', desc: 'AI生成·动物记忆' },
        { name: '盲纹', path: 'games/Puzzle/Blind-Crest/index.html', preview: 'games/Puzzle/Blind-Crest/preview.png', icon: 'fas fa-chess-knight', desc: 'AI生成·纹章解谜' },
        { name: '颜色猜谜', path: 'games/Puzzle/Color-Guessing/index.html', preview: 'games/Puzzle/Color-Guessing/preview.png', icon: 'fas fa-palette', desc: 'AI生成·猜颜色游戏' },
        { name: '深度挖矿', path: 'games/Puzzle/Deep-Miner/index.html', preview: 'games/Puzzle/Deep-Miner/preview.png', icon: 'fas fa-mountain', desc: 'AI生成·挖矿解谜' },
        { name: '表情拼图狂', path: 'games/Puzzle/Emoji-Puzzle-Mania/index.html', preview: 'games/Puzzle/Emoji-Puzzle-Mania/preview.png', icon: 'fas fa-puzzle-piece', desc: 'AI生成·表情拼图' },
        { name: '迷宫逃脱', path: 'games/Puzzle/Escape-the-Maze/index.html', preview: 'games/Puzzle/Escape-the-Maze/preview.png', icon: 'fas fa-route', desc: 'AI生成·迷宫逃脱' },
        { name: '擒纵机构', path: 'games/Puzzle/Escapement/index.html', preview: 'games/Puzzle/Escapement/preview.png', icon: 'fas fa-cog', desc: 'AI生成·机械解谜' },
        { name: '深渊', path: 'games/Puzzle/Fathom/index.html', preview: 'games/Puzzle/Fathom/preview.png', icon: 'fas fa-water', desc: 'AI生成·深海解谜' },
        { name: '五级阶梯', path: 'games/Puzzle/Five-Rungs/index.html', preview: 'games/Puzzle/Five-Rungs/preview.png', icon: 'fas fa-stairs', desc: 'AI生成·阶梯解谜' },
        { name: '符文之门', path: 'games/Puzzle/Glyphgate/index.html', preview: 'games/Puzzle/Glyphgate/preview.png', icon: 'fas fa-door-open', desc: 'AI生成·符文解谜' },
        { name: '记忆配对', path: 'games/Puzzle/Memory-Match/index.html', preview: 'games/Puzzle/Memory-Match/preview.png', icon: 'fas fa-brain', desc: 'AI生成·记忆翻牌' },
        { name: '心智计量', path: 'games/Puzzle/Mind-Meter/index.html', preview: 'games/Puzzle/Mind-Meter/preview.png', icon: 'fas fa-brain', desc: 'AI生成·心智谜题' },
        { name: '九洞棋', path: 'games/Puzzle/Nine-Holes/index.html', preview: 'games/Puzzle/Nine-Holes/preview.png', icon: 'fas fa-circle', desc: 'AI生成·九洞策略' },
        { name: '自我', path: 'games/Puzzle/Selfsame/index.html', preview: 'games/Puzzle/Selfsame/preview.png', icon: 'fas fa-copy', desc: 'AI生成·镜像解谜' },
        { name: '倾斜迷宫', path: 'games/Puzzle/Tilt-Maze/index.html', preview: 'games/Puzzle/Tilt-Maze/preview.png', icon: 'fas fa-compass', desc: 'AI生成·重力迷宫' },
        { name: '单词搜索', path: 'games/Puzzle/Word-Search/index.html', preview: 'games/Puzzle/Word-Search/preview.png', icon: 'fas fa-search', desc: 'AI生成·找单词游戏' },
    ],
    Action: [
        { name: 'Archery', path: 'games/Action/Archery/index.html', preview: 'games/Action/Archery/preview.png', icon: 'fas fa-bullseye', desc: '射箭竞技' },
        { name: 'Mount & Blade', path: 'games/Action/Archery-3D/dist/index.html', preview: 'games/Action/Archery-3D/dist/preview.png', icon: 'fas fa-horse-head', desc: '骑马与砍杀：3D马上战场混战' },
        { name: 'Breakout', path: 'games/Action/Breakout/index.html', preview: 'games/Action/Breakout/preview.png', icon: 'fas fa-cube', desc: '打砖块游戏' },
        { name: 'Crossy Road', path: 'games/Action/Crossy-Road/index.html', preview: 'games/Action/Crossy-Road/preview.png', icon: 'fas fa-road', desc: '过马路挑战' },
        { name: 'Emoji Catcher', path: 'games/Action/Emoji-Catcher/index.html', preview: 'games/Action/Emoji-Catcher/preview.png', icon: 'fas fa-smile', desc: '表情符号捕捉' },
        { name: 'Flappy Bird', path: 'games/Action/Flappy-Bird/index.html', preview: 'games/Action/Flappy-Bird/preview.png', icon: 'fas fa-dove', desc: '飞翔的小鸟' },
        { name: 'Fruit Slicer', path: 'games/Action/Fruit-Slicer/index.html', preview: 'games/Action/Fruit-Slicer/preview.png', icon: 'fas fa-lemon', desc: '水果切切乐' },
        { name: 'Insect Catch', path: 'games/Action/Insect-Catch/index.html', preview: 'games/Action/Insect-Catch/preview.png', icon: 'fas fa-bug', desc: '昆虫捕捉' },
        { name: 'Piano Tiles', path: 'games/Action/Piano-Tiles/index.html', preview: 'games/Action/Piano-Tiles/preview.png', icon: 'fas fa-music', desc: '别踩白块' },
        { name: 'Ping Pong', path: 'games/Action/Ping-Pong/index.html', preview: 'games/Action/Ping-Pong/preview.png', icon: 'fas fa-table-tennis-paddle-ball', desc: '乒乓球对战' },
        { name: 'Shape Clicker', path: 'games/Action/Shape-Clicker/index.html', preview: 'games/Action/Shape-Clicker/preview.png', icon: 'fas fa-shapes', desc: '形状点击' },
        { name: 'Whack A Mole', path: 'games/Action/Whack-A-Mole/index.html', preview: 'games/Action/Whack-A-Mole/preview.png', icon: 'fas fa-hammer', desc: '打地鼠游戏' },
        { name: 'Dodge Game', path: 'games/Action/Dodge-Game/index.html', preview: 'games/Action/Dodge-Game/preview.png', icon: 'fas fa-running', desc: '3D躲避障碍' },
        { name: 'Space Shooter', path: 'games/Action/Space-Shooter/index.html', preview: 'games/Action/Space-Shooter/preview.png', icon: 'fas fa-rocket', desc: '太空射击' },
        { name: 'Platform Game', path: 'games/Action/Platform-Game/index.html', preview: 'games/Action/Platform-Game/preview.png', icon: 'fas fa-person-running', desc: '平台跳跃冒险' },
        { name: 'Reaction Test', path: 'games/Action/Reaction-Test/index.html', preview: 'games/Action/Reaction-Test/preview.png', icon: 'fas fa-bolt', desc: '反应速度测试' },
        { name: 'Ink Raiders', path: 'games/Action/Ink-Raiders/dist/index.html', preview: 'games/Action/Ink-Raiders/dist/preview.png', icon: 'fas fa-fill-drip', desc: '墨水突击：3D竞技场喷射涂地击杀' },
        { name: 'Odyssey Expedition', path: 'games/Action/Odyssey-Expedition/index.html', preview: 'games/Action/Odyssey-Expedition/preview.png', icon: 'fas fa-compass', desc: '奥德赛远征：3D海盗远航冒险' }
        { name: 'Asteroids', path: 'games/Arcade/Asteroids/index.html', preview: 'games/Arcade/Asteroids/preview.png', icon: 'fas fa-rocket', desc: '经典太空射击街机游戏' },
        { name: 'Frogger', path: 'games/Arcade/Frogger/index.html', preview: 'games/Arcade/Frogger/preview.png', icon: 'fas fa-frog', desc: '经典过街青蛙游戏' },
    ],
    Arcade: [
        { name: 'Bubble Shooter', path: 'games/Arcade/Bubble-Shooter/index.html', preview: 'games/Arcade/Bubble-Shooter/preview.png', icon: 'fas fa-circle', desc: '泡泡龙射击' },
        { name: 'Candy Crush', path: 'games/Arcade/Candy-Crush/index.html', preview: 'games/Arcade/Candy-Crush/preview.png', icon: 'fas fa-candy-cane', desc: '糖果消消乐' },
        { name: 'Jump Game', path: 'games/Arcade/Jump-Game/index.html', preview: 'games/Arcade/Jump-Game/preview.png', icon: 'fas fa-person-running', desc: '跳跃冒险' },
        { name: 'Pac-Man', path: 'games/Arcade/Pac-Man/index.html', preview: 'games/Arcade/Pac-Man/preview.png', icon: 'fas fa-ghost', desc: '经典吃豆人' },
        { name: 'Snake', path: 'games/Arcade/Snake/index.html', preview: 'games/Arcade/Snake/preview.png', icon: 'fas fa-worm', desc: '贪吃蛇' },
        { name: 'Space Invaders', path: 'games/Arcade/Space-Invaders/index.html', preview: 'games/Arcade/Space-Invaders/preview.png', icon: 'fas fa-space-shuttle', desc: '太空入侵者' },
        { name: 'Tetris', path: 'games/Arcade/Tetris/index.html', preview: 'games/Arcade/Tetris/preview.png', icon: 'fas fa-square', desc: '俄罗斯方块' },
        { name: 'Tower Blocks', path: 'games/Arcade/Tower-Blocks/index.html', preview: 'games/Arcade/Tower-Blocks/preview.png', icon: 'fas fa-layer-group', desc: '叠叠乐' },
        { name: 'DiabloJS', path: 'games/Arcade/Diablo-JS/index.html', preview: 'games/Arcade/Diablo-JS/preview.png', icon: 'fas fa-sword', desc: '暗黑风格动作RPG' },
        { name: 'Connect Four', path: 'games/Board/Connect-Four/index.html', preview: 'games/Board/Connect-Four/preview.png', icon: 'fas fa-circle', desc: '经典四子连珠策略游戏' },
        { name: 'Blackjack', path: 'games/Board/Blackjack/index.html', preview: 'games/Board/Blackjack/preview.png', icon: 'fas fa-club', desc: '经典21点扑克牌游戏' },
        { name: 'Checkers', path: 'games/Board/Checkers/index.html', preview: 'games/Board/Checkers/preview.png', icon: 'fas fa-chess-board', desc: '经典西洋跳棋游戏' },
        { name: 'Poker', path: 'games/Board/Poker/index.html', preview: 'games/Board/Poker/preview.png', icon: 'fas fa-diamond', desc: '经典五张牌扑克游戏' },
        { name: 'Battleship', path: 'games/Board/Battleship/index.html', preview: 'games/Board/Battleship/preview.png', icon: 'fas fa-ship', desc: '经典海战棋游戏' },
        { name: '3D 小行星', path: 'games/Arcade/Asteroids-3D/index.html', preview: 'games/Arcade/Asteroids-3D/preview.png', icon: 'fas fa-rocket', desc: 'AI生成的3D太空射击游戏' },
        { name: '泡泡排球', path: 'games/Arcade/Blobby-Volley/index.html', preview: 'games/Arcade/Blobby-Volley/preview.png', icon: 'fas fa-volleyball', desc: 'AI生成的搞笑排球对战' },
        { name: '打鸭子', path: 'games/Arcade/Duck-Hunt/index.html', preview: 'games/Arcade/Duck-Hunt/preview.png', icon: 'fas fa-duck', desc: 'AI生成的经典打鸭子游戏' },
        { name: '冰塔攀爬', path: 'games/Arcade/Icy-Tower/index.html', preview: 'games/Arcade/Icy-Tower/preview.png', icon: 'fas fa-mountain', desc: 'AI生成的冰塔跳跃游戏' },
        { name: '迷你塔防', path: 'games/Arcade/Mini-Tower-Defense/index.html', preview: 'games/Arcade/Mini-Tower-Defense/preview.png', icon: 'fas fa-chess-rook', desc: 'AI生成的迷你塔防游戏' },
        { name: '导弹指令', path: 'games/Arcade/Missile-Command/index.html', preview: 'games/Arcade/Missile-Command/preview.png', icon: 'fas fa-bomb', desc: 'AI生成的经典导弹防御' },
        { name: '佩格尔弹球', path: 'games/Arcade/Peggle/index.html', preview: 'games/Arcade/Peggle/preview.png', icon: 'fas fa-circle', desc: 'AI生成的弹球消除游戏' },
        { name: '合成大西瓜', path: 'games/Arcade/Suika/index.html', preview: 'games/Arcade/Suika/preview.png', icon: 'fas fa-apple-whole', desc: 'AI生成的合成大西瓜' },
        { name: '蠕虫大战', path: 'games/Arcade/Worms/index.html', preview: 'games/Arcade/Worms/preview.png', icon: 'fas fa-worm', desc: 'AI生成的回合制蠕虫对战' },
        { name: '双陆棋', path: 'games/Board/Backgammon/index.html', preview: 'games/Board/Backgammon/preview.png', icon: 'fas fa-dice', desc: 'AI生成的经典双陆棋游戏' },
        { name: '国际象棋', path: 'games/Board/Chess/index.html', preview: 'games/Board/Chess/preview.png', icon: 'fas fa-chess', desc: 'AI生成的国际象棋游戏' },
        { name: '空当接龙', path: 'games/Board/Freecell/index.html', preview: 'games/Board/Freecell/preview.png', icon: 'fas fa-clone', desc: 'AI生成的空当接龙纸牌' },
        { name: '细胞吞噬', path: 'games/Arcade/Agario/index.html', preview: 'games/Arcade/Agario/preview.png', icon: 'fas fa-circle', desc: 'AI生成·细胞吞噬大作战' },
        { name: '火炮对战', path: 'games/Arcade/Artillery/index.html', preview: 'games/Arcade/Artillery/preview.png', icon: 'fas fa-bomb', desc: 'AI生成·回合制火炮射击' },
        { name: '弹球挑战', path: 'games/Arcade/Ball-Bouncing/index.html', preview: 'games/Arcade/Ball-Bouncing/preview.png', icon: 'fas fa-baseball', desc: 'AI生成·弹跳球游戏' },
        { name: '泡泡爆破', path: 'games/Arcade/Bubble-Break/index.html', preview: 'games/Arcade/Bubble-Break/preview.png', icon: 'fas fa-circle', desc: 'AI生成·泡泡消除游戏' },
        { name: '连锁反应', path: 'games/Arcade/Chain-Reaction/index.html', preview: 'games/Arcade/Chain-Reaction/preview.png', icon: 'fas fa-atom', desc: 'AI生成·连锁反应策略' },
        { name: '涂鸦跳跃', path: 'games/Arcade/Doodling/index.html', preview: 'games/Arcade/Doodling/preview.png', icon: 'fas fa-pen', desc: 'AI生成·涂鸦冒险' },
        { name: '下坡梦想家', path: 'games/Arcade/Downhill-Dreamer/index.html', preview: 'games/Arcade/Downhill-Dreamer/preview.png', icon: 'fas fa-skiing', desc: 'AI生成·下坡滑雪' },
        { name: '投掷挑战', path: 'games/Arcade/Fling/index.html', preview: 'games/Arcade/Fling/preview.png', icon: 'fas fa-hand-rock', desc: 'AI生成·物理投掷游戏' },
        { name: '石油大亨', path: 'games/Arcade/Fresh-Oil/index.html', preview: 'games/Arcade/Fresh-Oil/preview.png', icon: 'fas fa-gas-pump', desc: 'AI生成·石油开采' },
        { name: '攀登挑战', path: 'games/Arcade/Getting-Up-Here/index.html', preview: 'games/Arcade/Getting-Up-Here/preview.png', icon: 'fas fa-mountain', desc: 'AI生成·向上攀爬' },
        { name: '蜂鸟飞行', path: 'games/Arcade/Hummingbird/index.html', preview: 'games/Arcade/Hummingbird/preview.png', icon: 'fas fa-dove', desc: 'AI生成·蜂鸟冒险' },
        { name: '曲线蛇', path: 'games/Arcade/Kurve/index.html', preview: 'games/Arcade/Kurve/preview.png', icon: 'fas fa-wave-square', desc: 'AI生成·曲线对战' },
        { name: '液体战争', path: 'games/Arcade/Liquid-War/index.html', preview: 'games/Arcade/Liquid-War/preview.png', icon: 'fas fa-tint', desc: 'AI生成·液体领地争夺' },
        { name: '流光使者', path: 'games/Arcade/Lumenwright/index.html', preview: 'games/Arcade/Lumenwright/preview.png', icon: 'fas fa-lightbulb', desc: 'AI生成·光影动作' },
        { name: '野鸡射击', path: 'games/Arcade/Moorhuhn/index.html', preview: 'games/Arcade/Moorhuhn/preview.png', icon: 'fas fa-feather', desc: 'AI生成·打野鸡游戏' },
        { name: '障碍躲避', path: 'games/Arcade/Obstacle-Dodge/index.html', preview: 'games/Arcade/Obstacle-Dodge/preview.png', icon: 'fas fa-running', desc: 'AI生成·躲避障碍' },
        { name: '企鹅投掷', path: 'games/Arcade/Pingu-Throw/index.html', preview: 'games/Arcade/Pingu-Throw/preview.png', icon: 'fas fa-snowman', desc: 'AI生成·企鹅扔雪球' },
        { name: '脉冲锻造', path: 'games/Arcade/Pulseforge/index.html', preview: 'games/Arcade/Pulseforge/preview.png', icon: 'fas fa-bolt', desc: 'AI生成·脉冲射击' },
        { name: '推矿车', path: 'games/Arcade/Push-Mine/index.html', preview: 'games/Arcade/Push-Mine/preview.png', icon: 'fas fa-hard-hat', desc: 'AI生成·推矿车冒险' },
        { name: 'Qix围地', path: 'games/Arcade/Qix/index.html', preview: 'games/Arcade/Qix/preview.png', icon: 'fas fa-vector-square', desc: 'AI生成·经典围地游戏' },
        { name: '散射', path: 'games/Arcade/Scatter/index.html', preview: 'games/Arcade/Scatter/preview.png', icon: 'fas fa-expand', desc: 'AI生成·散射射击' },
        { name: '天际线', path: 'games/Arcade/Skyline/index.html', preview: 'games/Arcade/Skyline/preview.png', icon: 'fas fa-city', desc: 'AI生成·城市建造' },
        { name: '堆叠塔', path: 'games/Arcade/Stack-Tower/index.html', preview: 'games/Arcade/Stack-Tower/preview.png', icon: 'fas fa-layer-group', desc: 'AI生成·堆叠高塔' },
        { name: '层叠', path: 'games/Arcade/Strata/index.html', preview: 'games/Arcade/Strata/preview.png', icon: 'fas fa-layer-group', desc: 'AI生成·层叠消除' },
        { name: '木材边界', path: 'games/Arcade/Timberbound/index.html', preview: 'games/Arcade/Timberbound/preview.png', icon: 'fas fa-tree', desc: 'AI生成·伐木动作' },
        { name: '虚空', path: 'games/Arcade/Void/index.html', preview: 'games/Arcade/Void/preview.png', icon: 'fas fa-globe', desc: 'AI生成·虚空探索' },
        { name: '虚空奔跑', path: 'games/Arcade/Void-Runner/index.html', preview: 'games/Arcade/Void-Runner/preview.png', icon: 'fas fa-running', desc: 'AI生成·虚空跑酷' },
        { name: '网页工艺', path: 'games/Arcade/Webcraft/index.html', preview: 'games/Arcade/Webcraft/preview.png', icon: 'fas fa-cube', desc: 'AI生成·网页建造' },
        { name: '8球台球', path: 'games/Board/8-Ball/index.html', preview: 'games/Board/8-Ball/preview.png', icon: 'fas fa-circle', desc: 'AI生成·美式台球' },
        { name: '疯狂八', path: 'games/Board/Crazy-Eights/index.html', preview: 'games/Board/Crazy-Eights/preview.png', icon: 'fas fa-clone', desc: 'AI生成·疯狂八纸牌' },
        { name: '飞行棋', path: 'games/Board/Ludo/index.html', preview: 'games/Board/Ludo/preview.png', icon: 'fas fa-dice', desc: 'AI生成·经典飞行棋' },
        { name: '快艇骰子', path: 'games/Board/Yahtzee/index.html', preview: 'games/Board/Yahtzee/preview.png', icon: 'fas fa-dice', desc: 'AI生成·骰子游戏' },
        { name: 'AI之死', path: 'games/Casual/Death-by-AI/index.html', preview: 'games/Casual/Death-by-AI/preview.png', icon: 'fas fa-robot', desc: 'AI生成·AI审判互动' },
        { name: '无处不在', path: 'games/Casual/Everywhere/index.html', preview: 'games/Casual/Everywhere/preview.png', icon: 'fas fa-globe-americas', desc: 'AI生成·互动体验' },
        { name: '家庭问答', path: 'games/Casual/Family-Feud/index.html', preview: 'games/Casual/Family-Feud/preview.png', icon: 'fas fa-users', desc: 'AI生成·家庭竞猜' },
        { name: '互动伙伴', path: 'games/Casual/Interactive-Buddy/index.html', preview: 'games/Casual/Interactive-Buddy/preview.png', icon: 'fas fa-hand-sparkles', desc: 'AI生成·虚拟宠物' },
        { name: '生活石头剪刀布', path: 'games/Casual/Living-RPS/index.html', preview: 'games/Casual/Living-RPS/preview.png', icon: 'fas fa-hand-scissors', desc: 'AI生成·动态猜拳' },
        { name: '动物园', path: 'games/Casual/Menagerie/index.html', preview: 'games/Casual/Menagerie/preview.png', icon: 'fas fa-horse', desc: 'AI生成·动物观赏' },
        { name: '神秘AI', path: 'games/Casual/Mystery-AI/index.html', preview: 'games/Casual/Mystery-AI/preview.png', icon: 'fas fa-question', desc: 'AI生成·AI推理互动' },
        { name: '游行', path: 'games/Casual/Procession/index.html', preview: 'games/Casual/Procession/preview.png', icon: 'fas fa-music', desc: 'AI生成·游行体验' },
        { name: '台球架', path: 'games/Casual/Rack/index.html', preview: 'games/Casual/Rack/preview.png', icon: 'fas fa-circle', desc: 'AI生成·休闲台球' },
        { name: '车间', path: 'games/Casual/Shopfloor/index.html', preview: 'games/Casual/Shopfloor/preview.png', icon: 'fas fa-industry', desc: 'AI生成·车间模拟' },
        { name: '时间旅行社', path: 'games/Casual/Time-Travel-Agency/index.html', preview: 'games/Casual/Time-Travel-Agency/preview.png', icon: 'fas fa-clock', desc: 'AI生成·文字冒险' },
        { name: '两真一假', path: 'games/Casual/Two-Truths-One-Lie/index.html', preview: 'games/Casual/Two-Truths-One-Lie/preview.png', icon: 'fas fa-theater-masks', desc: 'AI生成·猜谎游戏' },
        { name: '猴子打字', path: 'games/Typing/MonkeyType/index.html', preview: 'games/Typing/MonkeyType/preview.png', icon: 'fas fa-keyboard', desc: 'AI生成·打字测试' },
        { name: '文字雨', path: 'games/Typing/Word-Rain/index.html', preview: 'games/Typing/Word-Rain/preview.png', icon: 'fas fa-cloud-rain', desc: 'AI生成·打字雨' },
    ],
    Board: [
        { name: 'Gomoku', path: 'games/Board/Gomoku/index.html', preview: 'games/Board/Gomoku/preview.png', icon: 'fas fa-circle-dot', desc: '五子棋对战' },
        { name: 'Rock Paper Scissors', path: 'games/Board/Rock-Paper-Scissors/index.html', preview: 'games/Board/Rock-Paper-Scissors/preview.png', icon: 'fas fa-hand-scissors', desc: '石头剪刀布' },
        { name: 'Tic Tac Toe', path: 'games/Board/Tic-Tac-Toe/index.html', preview: 'games/Board/Tic-Tac-Toe/preview.png', icon: 'fas fa-hashtag', desc: '井字棋' },
        { name: 'Reversi', path: 'games/Board/Reversi/index.html', preview: 'games/Board/Reversi/preview.png', icon: 'fas fa-circle-half-stroke', desc: '3D黑白棋' },
        { name: 'Solitaire', path: 'games/Board/Solitaire/index.html', preview: 'games/Board/Solitaire/preview.png', icon: 'fas fa-layer-group', desc: '纸牌接龙' },
        { name: 'Mahjong Connect', path: 'games/Board/Mahjong-Connect/index.html', preview: 'games/Board/Mahjong-Connect/preview.png', icon: 'fas fa-border-all', desc: '麻将连连看' },
        { name: '表情部落', path: 'games/Casual/Emoji-Horde/index.html', preview: 'games/Casual/Emoji-Horde/preview.png', icon: 'fas fa-laugh', desc: 'AI生成的表情塔防生存' },
        { name: '表情三消', path: 'games/Casual/Emoji-Match-Three/index.html', preview: 'games/Casual/Emoji-Match-Three/preview.png', icon: 'fas fa-gem', desc: 'AI生成的表情三消游戏' },
        { name: '钓鱼', path: 'games/Casual/Fishing/index.html', preview: 'games/Casual/Fishing/preview.png', icon: 'fas fa-fish', desc: 'AI生成的休闲钓鱼游戏' },
        { name: '闲置工厂', path: 'games/Casual/Idle-Factory/index.html', preview: 'games/Casual/Idle-Factory/preview.png', icon: 'fas fa-industry', desc: 'AI生成的放置类工厂经营' },
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
        { name: 'Dice Roll Simulator', path: 'games/Casual/Dice-Roll-Simulator/index.html', preview: 'games/Casual/Dice-Roll-Simulator/preview.png', icon: 'fas fa-dice', desc: '骰子模拟器' },
        { name: 'Quiz', path: 'games/Casual/Quiz/index.html', preview: 'games/Casual/Quiz/preview.png', icon: 'fas fa-question-circle', desc: '知识问答' },
        { name: 'Speak Number Guessing', path: 'games/Casual/Speak-Number-Guessing/index.html', preview: 'games/Casual/Speak-Number-Guessing/preview.png', icon: 'fas fa-microphone', desc: '语音猜数字' },
        { name: 'Type Number Guessing', path: 'games/Casual/Type-Number-Guessing/index.html', preview: 'games/Casual/Type-Number-Guessing/preview.png', icon: 'fas fa-calculator', desc: '打字猜数字' },
        { name: 'Rhythm Game', path: 'games/Casual/Rhythm-Game/index.html', preview: 'games/Casual/Rhythm-Game/preview.png', icon: 'fas fa-music', desc: '音乐节奏游戏' },
        { name: 'Coloring Book', path: 'games/Casual/Coloring-Book/index.html', preview: 'games/Casual/Coloring-Book/preview.png', icon: 'fas fa-paint-brush', desc: '涂色画册' }
    ],
    Astra: [
        { name: 'Orbital Garden', path: 'games/Astra/Orbital-Garden/index.html', preview: 'games/Astra/Orbital-Garden/preview.png', icon: 'fas fa-atom', desc: '轨道花园：可触摸的生成艺术' },
        { name: 'Thunderfall', path: 'games/Astra/Thunderfall/index.html', preview: 'games/Astra/Thunderfall/preview.png', icon: 'fas fa-rocket', desc: '雷霆战机·天穹远征：纵向弹幕射击' },
        { name: 'APEX CLUB', path: 'games/Astra/Apex-Club/index.html', preview: 'games/Astra/Apex-Club/preview.png', icon: 'fas fa-car', desc: 'Bay Circuit 3D卡丁车大奖赛' },
        { name: 'Mosswing', path: 'games/Astra/Mosswing/index.html', preview: 'games/Astra/Mosswing/preview.png', icon: 'fas fa-leaf', desc: '物理沙盒：动量重力与软体' },
        { name: 'Melon Lab', path: 'games/Astra/Melon-Lab/index.html', preview: 'games/Astra/Melon-Lab/preview.png', icon: 'fas fa-apple-whole', desc: '瓜体实验室：甜瓜物理沙盒' },
        { name: 'Last Beacon', path: 'games/Astra/Last-Beacon/index.html', preview: 'games/Astra/Last-Beacon/preview.png', icon: 'fas fa-tower-broadcast', desc: '最后的灯塔：3D海岛塔防' },
        { name: 'Silent Meridian', path: 'games/Astra/Silent-Meridian/index.html', preview: 'games/Astra/Silent-Meridian/preview.png', icon: 'fas fa-compass', desc: '静默子午线：网页解谜游戏' },
        { name: 'Dual Realms', path: 'games/Astra/Dual-Realms/index.html', preview: 'games/Astra/Dual-Realms/preview.png', icon: 'fas fa-khanda', desc: '时域·放学路：中文横版动作' },
        { name: 'Race Jimothy', path: 'games/Astra/Race-Jimothy/index.html', preview: 'games/Astra/Race-Jimothy/preview.png', icon: 'fas fa-pencil-ruler', desc: '画画赛车：和浣熊比赛' },
        { name: 'Fruit Ninja', path: 'games/Astra/Fruit-Ninja-Dojo/index.html', preview: 'games/Astra/Fruit-Ninja-Dojo/preview.png', icon: 'fas fa-apple-whole', desc: '水果忍者·再来一刀：经典切水果' }
    ],
    GenArt: [
        { name: '极光观测台', path: 'games/Astra/MiaAI-Experiences/001-aurora-observatory/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/001-aurora-observatory/preview.jpg' },
        { name: '形态编辑', path: 'games/Astra/MiaAI-Experiences/002-form-editorial/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/002-form-editorial/preview.jpg' },
        { name: '动力时间', path: 'games/Astra/MiaAI-Experiences/003-kinetic-time/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/003-kinetic-time/preview.jpg' },
        { name: '沙丘居所', path: 'games/Astra/MiaAI-Experiences/004-dune-residence/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/004-dune-residence/preview.jpg' },
        { name: '深渊声纳', path: 'games/Astra/MiaAI-Experiences/005-abyss-sonar/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/005-abyss-sonar/preview.jpg' },
        { name: 'A面唱片', path: 'games/Astra/MiaAI-Experiences/006-side-a-records/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/006-side-a-records/preview.jpg' },
        { name: '植物标本馆', path: 'games/Astra/MiaAI-Experiences/007-herbarium/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/007-herbarium/preview.jpg' },
        { name: '珍珠香水', path: 'games/Astra/MiaAI-Experiences/008-nacre-parfum/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/008-nacre-parfum/preview.jpg' },
        { name: '非常规练习', path: 'games/Astra/MiaAI-Experiences/009-unusual-practice/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/009-unusual-practice/preview.jpg' },
        { name: '熔岩酒廊', path: 'games/Astra/MiaAI-Experiences/010-lava-lounge/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/010-lava-lounge/preview.jpg' },
        { name: '远方明信片', path: 'games/Astra/MiaAI-Experiences/011-postcards-from-elsewhere/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/011-postcards-from-elsewhere/preview.jpg' },
        { name: '文字花园', path: 'games/Astra/MiaAI-Experiences/012-word-garden/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/012-word-garden/preview.jpg' },
        { name: '像素果园', path: 'games/Astra/MiaAI-Experiences/013-pixel-orchard/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/013-pixel-orchard/preview.jpg' },
        { name: '风暴之窗', path: 'games/Astra/MiaAI-Experiences/014-storm-window/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/014-storm-window/preview.jpg' },
        { name: '折纸工作室', path: 'games/Astra/MiaAI-Experiences/015-fold-studio/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/015-fold-studio/preview.jpg' },
        { name: '光之蓝图', path: 'games/Astra/MiaAI-Experiences/016-blueprint-of-light/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/016-blueprint-of-light/preview.jpg' },
        { name: '水母芭蕾', path: 'games/Astra/MiaAI-Experiences/017-jellyfish-ballet/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/017-jellyfish-ballet/preview.jpg' },
        { name: '迷宫俱乐部', path: 'games/Astra/MiaAI-Experiences/018-labyrinth-club/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/018-labyrinth-club/preview.jpg' },
        { name: '木漏日厨房', path: 'games/Astra/MiaAI-Experiences/019-komorebi-kitchen/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/019-komorebi-kitchen/preview.jpg' },
        { name: '色度场', path: 'games/Astra/MiaAI-Experiences/020-chroma-field/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/020-chroma-field/preview.jpg' },
        { name: '出发时刻表', path: 'games/Astra/MiaAI-Experiences/021-departure-board/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/021-departure-board/preview.jpg' },
        { name: '线与形', path: 'games/Astra/MiaAI-Experiences/022-thread-and-form/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/022-thread-and-form/preview.jpg' },
        { name: '山脊线', path: 'games/Astra/MiaAI-Experiences/023-ridgeline/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/023-ridgeline/preview.jpg' },
        { name: '小小胜利', path: 'games/Astra/MiaAI-Experiences/024-small-victories/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/024-small-victories/preview.jpg' },
        { name: '航空形态', path: 'games/Astra/MiaAI-Experiences/025-aero-form/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/025-aero-form/preview.jpg' },
        { name: '潮汐时刻', path: 'games/Astra/MiaAI-Experiences/026-tidal-hours/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/026-tidal-hours/preview.jpg' },
        { name: '矿物陈列柜', path: 'games/Astra/MiaAI-Experiences/027-mineral-cabinet/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/027-mineral-cabinet/preview.jpg' },
        { name: '月历', path: 'games/Astra/MiaAI-Experiences/028-lunar-calendar/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/028-lunar-calendar/preview.jpg' },
        { name: '花粉图谱', path: 'games/Astra/MiaAI-Experiences/029-pollen-atlas/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/029-pollen-atlas/preview.jpg' },
        { name: '等高线办公室', path: 'games/Astra/MiaAI-Experiences/030-contour-office/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/030-contour-office/preview.jpg' },
        { name: '鲸鱼频率', path: 'games/Astra/MiaAI-Experiences/031-whale-frequency/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/031-whale-frequency/preview.jpg' },
        { name: '蕨类温室', path: 'games/Astra/MiaAI-Experiences/032-fern-house/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/032-fern-house/preview.jpg' },
        { name: '气压计房间', path: 'games/Astra/MiaAI-Experiences/033-barometer-room/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/033-barometer-room/preview.jpg' },
        { name: '日食密室', path: 'games/Astra/MiaAI-Experiences/034-eclipse-chamber/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/034-eclipse-chamber/preview.jpg' },
        { name: '珊瑚礁保护区', path: 'games/Astra/MiaAI-Experiences/035-reef-reserve/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/035-reef-reserve/preview.jpg' },
        { name: '北极日记', path: 'games/Astra/MiaAI-Experiences/036-arctic-journal/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/036-arctic-journal/preview.jpg' },
        { name: '迁徙地图', path: 'games/Astra/MiaAI-Experiences/037-migration-map/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/037-migration-map/preview.jpg' },
        { name: '棱镜工作室', path: 'games/Astra/MiaAI-Experiences/038-prism-studio/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/038-prism-studio/preview.jpg' },
        { name: '沙之记忆', path: 'games/Astra/MiaAI-Experiences/039-sand-memory/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/039-sand-memory/preview.jpg' },
        { name: '太阳花园', path: 'games/Astra/MiaAI-Experiences/040-solar-garden/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/040-solar-garden/preview.jpg' },
        { name: '灯笼节', path: 'games/Astra/MiaAI-Experiences/041-lantern-festival/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/041-lantern-festival/preview.jpg' },
        { name: '纸张博物馆', path: 'games/Astra/MiaAI-Experiences/042-paper-museum/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/042-paper-museum/preview.jpg' },
        { name: '日晷庭院', path: 'games/Astra/MiaAI-Experiences/043-sundial-courtyard/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/043-sundial-courtyard/preview.jpg' },
        { name: '思维网络', path: 'games/Astra/MiaAI-Experiences/044-thought-network/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/044-thought-network/preview.jpg' },
        { name: '种子图书馆', path: 'games/Astra/MiaAI-Experiences/045-seed-library/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/045-seed-library/preview.jpg' },
        { name: '风之礼拜堂', path: 'games/Astra/MiaAI-Experiences/046-wind-chapel/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/046-wind-chapel/preview.jpg' },
        { name: '冰芯档案', path: 'games/Astra/MiaAI-Experiences/047-ice-core-archive/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/047-ice-core-archive/preview.jpg' },
        { name: '梦境索引', path: 'games/Astra/MiaAI-Experiences/048-dream-index/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/048-dream-index/preview.jpg' },
        { name: '墨水扩散', path: 'games/Astra/MiaAI-Experiences/049-ink-diffusion/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/049-ink-diffusion/preview.jpg' },
        { name: '星辰导航', path: 'games/Astra/MiaAI-Experiences/050-star-navigation/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/050-star-navigation/preview.jpg' },
        { name: '茶道', path: 'games/Astra/MiaAI-Experiences/051-tea-ceremony/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/051-tea-ceremony/preview.jpg' },
        { name: '液压平衡', path: 'games/Astra/MiaAI-Experiences/052-hydraulic-balance/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/052-hydraulic-balance/preview.jpg' },
        { name: '字体标本', path: 'games/Astra/MiaAI-Experiences/053-type-specimen/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/053-type-specimen/preview.jpg' },
        { name: '月球规划器', path: 'games/Astra/MiaAI-Experiences/054-lunar-planner/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/054-lunar-planner/preview.jpg' },
        { name: '色彩混合器', path: 'games/Astra/MiaAI-Experiences/055-chromatic-mixer/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/055-chromatic-mixer/preview.jpg' },
        { name: '午夜电台', path: 'games/Astra/MiaAI-Experiences/056-midnight-radio/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/056-midnight-radio/preview.jpg' },
        { name: '禅石', path: 'games/Astra/MiaAI-Experiences/057-zen-stones/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/057-zen-stones/preview.jpg' },
        { name: '档案金库', path: 'games/Astra/MiaAI-Experiences/058-archive-vault/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/058-archive-vault/preview.jpg' },
        { name: '冲刺时钟', path: 'games/Astra/MiaAI-Experiences/059-sprint-clock/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/059-sprint-clock/preview.jpg' },
        { name: '意面餐桌', path: 'games/Astra/MiaAI-Experiences/060-pasta-table/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/060-pasta-table/preview.jpg' },
        { name: '地铁地图', path: 'games/Astra/MiaAI-Experiences/061-metro-map/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/061-metro-map/preview.jpg' },
        { name: '星图', path: 'games/Astra/MiaAI-Experiences/062-star-atlas/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/062-star-atlas/preview.jpg' },
        { name: '声音形状', path: 'games/Astra/MiaAI-Experiences/063-sound-shapes/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/063-sound-shapes/preview.jpg' },
        { name: '第四维度', path: 'games/Astra/MiaAI-Experiences/064-fourth-dimension/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/064-fourth-dimension/preview.jpg' },
        { name: '绽放实验室', path: 'games/Astra/MiaAI-Experiences/065-bloom-lab/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/065-bloom-lab/preview.jpg' },
        { name: '骑士巡游', path: 'games/Astra/MiaAI-Experiences/066-knights-tour/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/066-knights-tour/preview.jpg' },
        { name: '冰川研究', path: 'games/Astra/MiaAI-Experiences/067-glacier-study/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/067-glacier-study/preview.jpg' },
        { name: '田野笔记', path: 'games/Astra/MiaAI-Experiences/068-field-notes/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/068-field-notes/preview.jpg' },
        { name: '夜车票', path: 'games/Astra/MiaAI-Experiences/069-night-ticket/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/069-night-ticket/preview.jpg' },
        { name: '动力平衡', path: 'games/Astra/MiaAI-Experiences/070-kinetic-balance/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/070-kinetic-balance/preview.jpg' },
        { name: '专注房间', path: 'games/Astra/MiaAI-Experiences/071-focus-room/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/071-focus-room/preview.jpg' },
        { name: '像素拼布', path: 'games/Astra/MiaAI-Experiences/072-pixel-quilt/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/072-pixel-quilt/preview.jpg' },
        { name: '酒窖笔记', path: 'games/Astra/MiaAI-Experiences/073-cellar-notes/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/073-cellar-notes/preview.jpg' },
        { name: '轨道预算', path: 'games/Astra/MiaAI-Experiences/074-orbit-budget/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/074-orbit-budget/preview.jpg' },
        { name: '云作曲家', path: 'games/Astra/MiaAI-Experiences/075-cloud-composer/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/075-cloud-composer/preview.jpg' },
        { name: '工作室平面图', path: 'games/Astra/MiaAI-Experiences/076-atelier-plan/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/076-atelier-plan/preview.jpg' },
        { name: '金缮修复', path: 'games/Astra/MiaAI-Experiences/077-golden-repair/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/077-golden-repair/preview.jpg' },
        { name: '午夜影院', path: 'games/Astra/MiaAI-Experiences/078-midnight-cinema/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/078-midnight-cinema/preview.jpg' },
        { name: '岛屿图谱', path: 'games/Astra/MiaAI-Experiences/079-island-atlas/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/079-island-atlas/preview.jpg' },
        { name: '时间物件', path: 'games/Astra/MiaAI-Experiences/080-hour-object/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/080-hour-object/preview.jpg' },
        { name: '色彩礼拜堂', path: 'games/Astra/MiaAI-Experiences/081-chromatic-chapel/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/081-chromatic-chapel/preview.jpg' },
        { name: '黏土形态', path: 'games/Astra/MiaAI-Experiences/082-clay-form/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/082-clay-form/preview.jpg' },
        { name: '字母铸造厂', path: 'games/Astra/MiaAI-Experiences/083-letter-foundry/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/083-letter-foundry/preview.jpg' },
        { name: '环形世界', path: 'games/Astra/MiaAI-Experiences/084-ring-world/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/084-ring-world/preview.jpg' },
        { name: '夜行列车', path: 'games/Astra/MiaAI-Experiences/085-night-train/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/085-night-train/preview.jpg' },
        { name: '编织记忆', path: 'games/Astra/MiaAI-Experiences/086-woven-memory/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/086-woven-memory/preview.jpg' },
        { name: '大理石房间', path: 'games/Astra/MiaAI-Experiences/087-marble-room/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/087-marble-room/preview.jpg' },
        { name: '焚香时刻', path: 'games/Astra/MiaAI-Experiences/088-incense-hour/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/088-incense-hour/preview.jpg' },
        { name: '黑胶之夜', path: 'games/Astra/MiaAI-Experiences/089-vinyl-evening/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/089-vinyl-evening/preview.jpg' },
        { name: '玻璃温室', path: 'games/Astra/MiaAI-Experiences/090-glasshouse/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/090-glasshouse/preview.jpg' },
        { name: '水墨山水', path: 'games/Astra/MiaAI-Experiences/091-ink-mountains/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/091-ink-mountains/preview.jpg' },
        { name: '航空邮件', path: 'games/Astra/MiaAI-Experiences/092-aerogram/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/092-aerogram/preview.jpg' },
        { name: '093 Cellar Notes', path: 'games/Astra/MiaAI-Experiences/093-cellar-notes/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/093-cellar-notes/preview.jpg' },
        { name: '缎带排练', path: 'games/Astra/MiaAI-Experiences/094-ribbon-rehearsal/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/094-ribbon-rehearsal/preview.jpg' },
        { name: '光之时辰', path: 'games/Astra/MiaAI-Experiences/095-light-hour/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/095-light-hour/preview.jpg' },
        { name: '磁性物质', path: 'games/Astra/MiaAI-Experiences/096-magnetic-matter/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/096-magnetic-matter/preview.jpg' },
        { name: '小小神谕', path: 'games/Astra/MiaAI-Experiences/097-small-oracle/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/097-small-oracle/preview.jpg' },
        { name: '泳池边俱乐部', path: 'games/Astra/MiaAI-Experiences/098-poolside-club/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/098-poolside-club/preview.jpg' },
        { name: '旁注', path: 'games/Astra/MiaAI-Experiences/099-marginalia/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/099-marginalia/preview.jpg' },
        { name: '有机波实验室', path: 'games/Astra/MiaAI-Experiences/100-organic-wave-lab/index.html', icon: 'fas fa-palette', desc: 'AI生成交互体验', preview: 'games/Astra/MiaAI-Experiences/100-organic-wave-lab/preview.jpg' }
    ],
};

let currentCategory = 'all';
let allGames = [];
let i18nInitialized = false;

document.addEventListener('i18n:initialized', () => {
    i18nInitialized = true;
    initializeApp();
});

// 兜底：如果 i18n 已经初始化完成，直接执行
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!i18nInitialized && window.i18n && window.i18n.currentLang) {
            i18nInitialized = true;
            initializeApp();
        }
    }, 100);
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
            <div class="card-thumb">
                <span class="category-tag">${localizedCategory}</span>
                ${game.preview ? `<img src="${game.preview}" alt="${localizedName}" loading="lazy" class="card-img">` : `<i class="thumb-icon ${game.icon}"></i>`}
            </div>
            <div class="card-body">
                <h3 class="game-name">${localizedName}</h3>
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
        'Casual': 'games.filter.casual',
        'Astra': 'games.filter.astra',
        'GenArt': 'games.filter.genart'
    };
    const key = i18nKeys[category];
    if (!key) return category;
    return window.i18n?.t(key) || category;
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
