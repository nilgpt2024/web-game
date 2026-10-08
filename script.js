const gamesData = {
    Puzzle: [
        { name: '2048', path: 'games/Puzzle/2048/index.html', preview: 'games/Puzzle/2048/preview.webp', icon: 'fas fa-th', hot: true, desc: '经典数字合并益智游戏' },
        { name: 'Jigsaw Puzzle', path: 'games/Puzzle/Jigsaw-Puzzle/index.html', preview: 'games/Puzzle/Jigsaw-Puzzle/preview.webp', icon: 'fas fa-puzzle-piece', desc: '趣味拼图挑战' },
        { name: 'Klotski', path: 'games/Puzzle/Klotski/index.html', preview: 'games/Puzzle/Klotski/preview.webp', icon: 'fas fa-chess-board', desc: '华容道滑块解谜' },
        { name: 'Maze Escape', path: 'games/Puzzle/Maze-Escape/index.html', preview: 'games/Puzzle/Maze-Escape/preview.webp', icon: 'fas fa-route', desc: '迷宫逃脱冒险' },
        { name: 'Minesweeper', path: 'games/Puzzle/Minesweeper/index.html', preview: 'games/Puzzle/Minesweeper/preview.webp', icon: 'fas fa-bomb', hot: true, desc: '经典扫雷游戏' },
        { name: 'Spot Difference', path: 'games/Puzzle/Spot-Difference/index.html', preview: 'games/Puzzle/Spot-Difference/preview.webp', icon: 'fas fa-search', desc: '找不同挑战' },
        { name: 'Sudoku', path: 'games/Puzzle/Sudoku/index.html', preview: 'games/Puzzle/Sudoku/preview.webp', icon: 'fas fa-table-cells', hot: true, desc: '数独逻辑游戏' },
        { name: 'Tilting Maze', path: 'games/Puzzle/Tilting-Maze/index.html', preview: 'games/Puzzle/Tilting-Maze/preview.webp', icon: 'fas fa-compass', desc: '重力迷宫' },
        { name: 'Sokoban', path: 'games/Puzzle/Sokoban/index.html', preview: 'games/Puzzle/Sokoban/preview.webp', icon: 'fas fa-box', hot: true, desc: '3D推箱子解谜' },
        { name: 'Tangram', path: 'games/Puzzle/Tangram/index.html', preview: 'games/Puzzle/Tangram/preview.webp', icon: 'fas fa-shapes', desc: '七巧板拼图' },
        { name: 'Cialdini-Persuasion-Lab', path: 'games/Puzzle/Cialdini-Persuasion-Lab/index.html', preview: 'games/Puzzle/Cialdini-Persuasion-Lab/preview.webp', icon: 'fas fa-brain', desc: '西奥迪尼影响力原理说服力训练' },
        { name: 'Wordle', path: 'games/Puzzle/Wordle/index.html', preview: 'games/Puzzle/Wordle/preview.webp', icon: 'fas fa-font', hot: true, desc: '经典五字母猜词游戏' },
        { name: 'Mastermind', path: 'games/Puzzle/Mastermind/index.html', preview: 'games/Puzzle/Mastermind/preview.webp', icon: 'fas fa-circle-dot', desc: '破解密码的经典推理游戏' },
        { name: 'Nonogram', path: 'games/Puzzle/Nonogram/index.html', preview: 'games/Puzzle/Nonogram/preview.webp', icon: 'fas fa-table-cells', desc: '逻辑推理填色游戏' },
        { name: 'Lights Out', path: 'games/Puzzle/Lights-Out/index.html', preview: 'games/Puzzle/Lights-Out/preview.webp', icon: 'fas fa-lightbulb', desc: '经典点灯解谜游戏' },
        { name: '颜色洪水', path: 'games/Puzzle/Color-Flood/index.html', preview: 'games/Puzzle/Color-Flood/preview.webp', icon: 'fas fa-fill-drip', desc: 'AI生成的颜色填充解谜' },
        { name: '萤火虫罐', path: 'games/Puzzle/Firefly-Jar/index.html', preview: 'games/Puzzle/Firefly-Jar/preview.webp', icon: 'fas fa-bug', desc: 'AI生成的萤火虫收集游戏' },
        { name: '魔方', path: 'games/Puzzle/Rubiks-Cube/index.html', preview: 'games/Puzzle/Rubiks-Cube/preview.webp', icon: 'fas fa-cube', desc: 'AI生成的3D魔方游戏' },
        { name: '汉诺塔', path: 'games/Puzzle/Tower-of-Hanoi/index.html', preview: 'games/Puzzle/Tower-of-Hanoi/preview.webp', icon: 'fas fa-layer-group', desc: 'AI生成的经典汉诺塔解谜' },
        { name: '不在场证明', path: 'games/Puzzle/Alibi/index.html', preview: 'games/Puzzle/Alibi/preview.webp', icon: 'fas fa-search', desc: 'AI生成·推理解谜' },
        { name: '字母解谜', path: 'games/Puzzle/Alphabet/index.html', preview: 'games/Puzzle/Alphabet/preview.webp', icon: 'fas fa-font', desc: 'AI生成·字母游戏' },
        { name: '动物配对', path: 'games/Puzzle/Animals/index.html', preview: 'games/Puzzle/Animals/preview.webp', icon: 'fas fa-paw', desc: 'AI生成·动物记忆' },
        { name: '盲纹', path: 'games/Puzzle/Blind-Crest/index.html', preview: 'games/Puzzle/Blind-Crest/preview.webp', icon: 'fas fa-chess-knight', desc: 'AI生成·纹章解谜' },
        { name: '颜色猜谜', path: 'games/Puzzle/Color-Guessing/index.html', preview: 'games/Puzzle/Color-Guessing/preview.webp', icon: 'fas fa-palette', desc: 'AI生成·猜颜色游戏' },
        { name: '深度挖矿', path: 'games/Puzzle/Deep-Miner/index.html', preview: 'games/Puzzle/Deep-Miner/preview.webp', icon: 'fas fa-mountain', desc: 'AI生成·挖矿解谜' },
        { name: '表情拼图狂', path: 'games/Puzzle/Emoji-Puzzle-Mania/index.html', preview: 'games/Puzzle/Emoji-Puzzle-Mania/preview.webp', icon: 'fas fa-puzzle-piece', desc: 'AI生成·表情拼图' },
        { name: '迷宫逃脱', path: 'games/Puzzle/Escape-the-Maze/index.html', preview: 'games/Puzzle/Escape-the-Maze/preview.webp', icon: 'fas fa-route', desc: 'AI生成·迷宫逃脱' },
        { name: '擒纵机构', path: 'games/Puzzle/Escapement/index.html', preview: 'games/Puzzle/Escapement/preview.webp', icon: 'fas fa-cog', desc: 'AI生成·机械解谜' },
        { name: '深渊', path: 'games/Puzzle/Fathom/index.html', preview: 'games/Puzzle/Fathom/preview.webp', icon: 'fas fa-water', desc: 'AI生成·深海解谜' },
        { name: '五级阶梯', path: 'games/Puzzle/Five-Rungs/index.html', preview: 'games/Puzzle/Five-Rungs/preview.webp', icon: 'fas fa-stairs', desc: 'AI生成·阶梯解谜' },
        { name: '符文之门', path: 'games/Puzzle/Glyphgate/index.html', preview: 'games/Puzzle/Glyphgate/preview.webp', icon: 'fas fa-door-open', desc: 'AI生成·符文解谜' },
        { name: '记忆配对', path: 'games/Puzzle/Memory-Match/index.html', preview: 'games/Puzzle/Memory-Match/preview.webp', icon: 'fas fa-brain', desc: 'AI生成·记忆翻牌' },
        { name: '心智计量', path: 'games/Puzzle/Mind-Meter/index.html', preview: 'games/Puzzle/Mind-Meter/preview.webp', icon: 'fas fa-brain', desc: 'AI生成·心智谜题' },
        { name: '九洞棋', path: 'games/Puzzle/Nine-Holes/index.html', preview: 'games/Puzzle/Nine-Holes/preview.webp', icon: 'fas fa-circle', desc: 'AI生成·九洞策略' },
        { name: '自我', path: 'games/Puzzle/Selfsame/index.html', preview: 'games/Puzzle/Selfsame/preview.webp', icon: 'fas fa-copy', desc: 'AI生成·镜像解谜' },
        { name: '倾斜迷宫', path: 'games/Puzzle/Tilt-Maze/index.html', preview: 'games/Puzzle/Tilt-Maze/preview.webp', icon: 'fas fa-compass', desc: 'AI生成·重力迷宫' },
        { name: '单词搜索', path: 'games/Puzzle/Word-Search/index.html', preview: 'games/Puzzle/Word-Search/preview.webp', icon: 'fas fa-search', desc: 'AI生成·找单词游戏' },,
        { name: 'HTML拼图', path: 'games/Puzzle/Jigsaw-HTML/index.html', preview: 'games/Puzzle/Jigsaw-HTML/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·网页拼图游戏', isNew: true },
        { name: '冷热搜索', path: 'games/Puzzle/hot-cold-hunt/index.html', preview: 'games/Puzzle/hot-cold-hunt/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·冷热提示寻宝游戏', isNew: true },
        { name: '迷宫行走', path: 'games/Puzzle/maze-walker/index.html', preview: 'games/Puzzle/maze-walker/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·迷宫探索游戏', isNew: true },
        { name: '文字冒险', path: 'games/Puzzle/text-adventure/index.html', preview: 'games/Puzzle/text-adventure/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·文字冒险游戏', isNew: true },
        { name: '算盘', path: 'games/Puzzle/abacus/index.html', preview: 'games/Puzzle/abacus/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·算盘计算游戏', isNew: true },
        { name: '收敛', path: 'games/Puzzle/convergence/index.html', preview: 'games/Puzzle/convergence/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·益智收敛游戏', isNew: true },
        { name: '洪水线', path: 'games/Puzzle/floodline/index.html', preview: 'games/Puzzle/floodline/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·洪水模拟益智游戏', isNew: true },
        { name: '单词构成', path: 'games/Puzzle/wordform/index.html', preview: 'games/Puzzle/wordform/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·单词构成益智游戏', isNew: true },
        { name: '6Oct', path: 'games/Puzzle/6oct/index.html', preview: 'games/Puzzle/6oct/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·6Oct游戏', isNew: true },
        { name: 'Cargo Stack', path: 'games/Puzzle/cargo-stack/index.html', preview: 'games/Puzzle/cargo-stack/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Cargo Stack游戏', isNew: true },
        { name: 'Circuit Bulb', path: 'games/Puzzle/circuit-bulb/index.html', preview: 'games/Puzzle/circuit-bulb/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Circuit Bulb游戏', isNew: true },
        { name: 'Colour Pour', path: 'games/Puzzle/colour-pour/index.html', preview: 'games/Puzzle/colour-pour/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Colour Pour游戏', isNew: true },
        { name: 'Connected', path: 'games/Puzzle/connected/index.html', preview: 'games/Puzzle/connected/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Connected游戏', isNew: true },
        { name: 'Cut Rope', path: 'games/Puzzle/cut-rope/index.html', preview: 'games/Puzzle/cut-rope/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Cut Rope游戏', isNew: true },
        { name: 'Four Dots', path: 'games/Puzzle/four-dots/index.html', preview: 'games/Puzzle/four-dots/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Four Dots游戏', isNew: true },
        { name: 'Hex Puzzle', path: 'games/Puzzle/hex-puzzle/index.html', preview: 'games/Puzzle/hex-puzzle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Hex Puzzle游戏', isNew: true },
        { name: 'Laser Bounce', path: 'games/Puzzle/laser-bounce/index.html', preview: 'games/Puzzle/laser-bounce/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Laser Bounce游戏', isNew: true },
        { name: 'Line Trap', path: 'games/Puzzle/line-trap/index.html', preview: 'games/Puzzle/line-trap/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Line Trap游戏', isNew: true },
        { name: 'Link', path: 'games/Puzzle/link/index.html', preview: 'games/Puzzle/link/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Link游戏', isNew: true },
        { name: 'Memory', path: 'games/Puzzle/memory/index.html', preview: 'games/Puzzle/memory/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Memory游戏', isNew: true },
        { name: 'Memory Cards', path: 'games/Puzzle/memory-cards/index.html', preview: 'games/Puzzle/memory-cards/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Memory Cards游戏', isNew: true },
        { name: 'Number Merge', path: 'games/Puzzle/number-merge/index.html', preview: 'games/Puzzle/number-merge/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Number Merge游戏', isNew: true },
        { name: 'Pairing', path: 'games/Puzzle/pairing/index.html', preview: 'games/Puzzle/pairing/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Pairing游戏', isNew: true },
        { name: 'Pathfinder', path: 'games/Puzzle/pathfinder/index.html', preview: 'games/Puzzle/pathfinder/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Pathfinder游戏', isNew: true },
        { name: 'Perfect Square', path: 'games/Puzzle/perfect-square/index.html', preview: 'games/Puzzle/perfect-square/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Perfect Square游戏', isNew: true },
        { name: 'Screw Master', path: 'games/Puzzle/screw-master/index.html', preview: 'games/Puzzle/screw-master/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Screw Master游戏', isNew: true },
        { name: 'Shape Fitter', path: 'games/Puzzle/shape-fitter/index.html', preview: 'games/Puzzle/shape-fitter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Shape Fitter游戏', isNew: true },
        { name: 'Signal Circuit', path: 'games/Puzzle/signal-circuit/index.html', preview: 'games/Puzzle/signal-circuit/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Signal Circuit游戏', isNew: true },
        { name: 'Slide Puzzle', path: 'games/Puzzle/slide-puzzle/index.html', preview: 'games/Puzzle/slide-puzzle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Slide Puzzle游戏', isNew: true },
        { name: 'Square One', path: 'games/Puzzle/square-one/index.html', preview: 'games/Puzzle/square-one/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Square One游戏', isNew: true },
        { name: 'Tile Tap', path: 'games/Puzzle/tile-tap/index.html', preview: 'games/Puzzle/tile-tap/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Tile Tap游戏', isNew: true },
        { name: 'Unruly', path: 'games/Puzzle/unruly/index.html', preview: 'games/Puzzle/unruly/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Unruly游戏', isNew: true },
        { name: 'Math Quest', path: 'games/Puzzle/math-quest/index.html', preview: 'games/Puzzle/math-quest/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Math Quest游戏', isNew: true },
        { name: 'Words Of Wonder', path: 'games/Puzzle/words-of-wonder/index.html', preview: 'games/Puzzle/words-of-wonder/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Words Of Wonder游戏', isNew: true },
        { name: 'Silent Meridian', path: 'games/Astra/Silent-Meridian/index.html', preview: 'games/Astra/Silent-Meridian/preview.webp', icon: 'fas fa-compass', desc: '静默子午线：网页解谜游戏' },
    ],
    Action: [
        { name: 'Archery', path: 'games/Action/Archery/index.html', preview: 'games/Action/Archery/preview.webp', icon: 'fas fa-bullseye', desc: '射箭竞技' },
        { name: 'Mount & Blade', path: 'games/Action/Archery-3D/dist/index.html', preview: 'games/Action/Archery-3D/dist/preview.webp', icon: 'fas fa-horse-head', desc: '骑马与砍杀：3D马上战场混战' },
        { name: 'Breakout', path: 'games/Action/Breakout/index.html', preview: 'games/Action/Breakout/preview.webp', icon: 'fas fa-cube', hot: true, desc: '打砖块游戏' },
        { name: 'Crossy Road', path: 'games/Action/Crossy-Road/index.html', preview: 'games/Action/Crossy-Road/preview.webp', icon: 'fas fa-road', desc: '过马路挑战' },
        { name: 'Emoji Catcher', path: 'games/Action/Emoji-Catcher/index.html', preview: 'games/Action/Emoji-Catcher/preview.webp', icon: 'fas fa-smile', desc: '表情符号捕捉' },
        { name: 'Flappy Bird', path: 'games/Action/Flappy-Bird/index.html', preview: 'games/Action/Flappy-Bird/preview.webp', icon: 'fas fa-dove', desc: '飞翔的小鸟' },
        { name: 'Fruit Slicer', path: 'games/Action/Fruit-Slicer/index.html', preview: 'games/Action/Fruit-Slicer/preview.webp', icon: 'fas fa-lemon', desc: '水果切切乐' },
        { name: 'Insect Catch', path: 'games/Action/Insect-Catch/index.html', preview: 'games/Action/Insect-Catch/preview.webp', icon: 'fas fa-bug', desc: '昆虫捕捉' },
        { name: 'Piano Tiles', path: 'games/Action/Piano-Tiles/index.html', preview: 'games/Action/Piano-Tiles/preview.webp', icon: 'fas fa-music', desc: '别踩白块' },
        { name: 'Ping Pong', path: 'games/Action/Ping-Pong/index.html', preview: 'games/Action/Ping-Pong/preview.webp', icon: 'fas fa-table-tennis-paddle-ball', desc: '乒乓球对战' },
        { name: 'Shape Clicker', path: 'games/Action/Shape-Clicker/index.html', preview: 'games/Action/Shape-Clicker/preview.webp', icon: 'fas fa-shapes', desc: '形状点击' },
        { name: 'Whack A Mole', path: 'games/Action/Whack-A-Mole/index.html', preview: 'games/Action/Whack-A-Mole/preview.webp', icon: 'fas fa-hammer', desc: '打地鼠游戏' },
        { name: 'Dodge Game', path: 'games/Action/Dodge-Game/index.html', preview: 'games/Action/Dodge-Game/preview.webp', icon: 'fas fa-running', desc: '3D躲避障碍' },
        { name: 'Space Shooter', path: 'games/Action/Space-Shooter/index.html', preview: 'games/Action/Space-Shooter/preview.webp', icon: 'fas fa-rocket', desc: '太空射击' },
        { name: 'Platform Game', path: 'games/Action/Platform-Game/index.html', preview: 'games/Action/Platform-Game/preview.webp', icon: 'fas fa-person-running', desc: '平台跳跃冒险' },
        { name: 'Reaction Test', path: 'games/Action/Reaction-Test/index.html', preview: 'games/Action/Reaction-Test/preview.webp', icon: 'fas fa-bolt', desc: '反应速度测试' },
        { name: 'Ink Raiders', path: 'games/Action/Ink-Raiders/dist/index.html', preview: 'games/Action/Ink-Raiders/dist/preview.webp', icon: 'fas fa-fill-drip', desc: '墨水突击：3D竞技场喷射涂地击杀' },
        { name: 'Odyssey Expedition', path: 'games/Action/Odyssey-Expedition/index.html', preview: 'games/Action/Odyssey-Expedition/preview.webp', icon: 'fas fa-compass', desc: '奥德赛远征：3D海盗远航冒险' },,
        { name: '表情部落生存', path: 'games/Action/Emoji-Horde-Survival/index.html', preview: 'games/Action/Emoji-Horde-Survival/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·表情生存射击', isNew: true },
        { name: '键盘躲避', path: 'games/Action/keyboard-dodger/index.html', preview: 'games/Action/keyboard-dodger/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·键盘控制躲避游戏', isNew: true },
        { name: '瞄准训练', path: 'games/Action/aim-trainer/index.html', preview: 'games/Action/aim-trainer/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·鼠标瞄准训练游戏', isNew: true },
        { name: '悬崖行者', path: 'games/Action/cliffwalkers/index.html', preview: 'games/Action/cliffwalkers/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·悬崖行走游戏', isNew: true },
        { name: '地狱猫', path: 'games/Action/hellcat/index.html', preview: 'games/Action/hellcat/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·动作射击游戏', isNew: true },
        { name: 'Cosmic Cleaner', path: 'games/Action/cosmic-cleaner/index.html', preview: 'games/Action/cosmic-cleaner/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Cosmic Cleaner游戏', isNew: true },
        { name: 'Orbital Outpost', path: 'games/Action/orbital-outpost/index.html', preview: 'games/Action/orbital-outpost/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Orbital Outpost游戏', isNew: true },
        { name: 'Planet Visitor', path: 'games/Action/planet-visitor/index.html', preview: 'games/Action/planet-visitor/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Planet Visitor游戏', isNew: true },
        { name: 'Planet War', path: 'games/Action/planet-war/index.html', preview: 'games/Action/planet-war/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Planet War游戏', isNew: true },
        { name: 'Antigravity', path: 'games/Action/antigravity/index.html', preview: 'games/Action/antigravity/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Antigravity游戏', isNew: true },
        { name: 'Cool Platformer', path: 'games/Action/cool-platformer/index.html', preview: 'games/Action/cool-platformer/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Cool Platformer游戏', isNew: true },
        { name: 'Devil King', path: 'games/Action/devil-king/index.html', preview: 'games/Action/devil-king/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Devil King游戏', isNew: true },
        { name: 'Doodle Jump', path: 'games/Action/doodle-jump/index.html', preview: 'games/Action/doodle-jump/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Doodle Jump游戏', isNew: true },
        { name: 'Flip Jump', path: 'games/Action/flip-jump/index.html', preview: 'games/Action/flip-jump/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Flip Jump游戏', isNew: true },
        { name: 'Level Devil', path: 'games/Action/level-devil/index.html', preview: 'games/Action/level-devil/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Level Devil游戏', isNew: true },
        { name: 'Mario', path: 'games/Action/mario/index.html', preview: 'games/Action/mario/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Mario游戏', isNew: true },
        { name: 'Parkour', path: 'games/Action/parkour/index.html', preview: 'games/Action/parkour/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Parkour游戏', isNew: true },
        { name: 'That Level Again 1', path: 'games/Action/that-level-again-1/index.html', preview: 'games/Action/that-level-again-1/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·That Level Again 1游戏', isNew: true },
        { name: 'That Level Again 2', path: 'games/Action/that-level-again-2/index.html', preview: 'games/Action/that-level-again-2/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·That Level Again 2游戏', isNew: true },
        { name: 'That Level Again 3', path: 'games/Action/that-level-again-3/index.html', preview: 'games/Action/that-level-again-3/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·That Level Again 3游戏', isNew: true },
        { name: 'That Level Again 4', path: 'games/Action/that-level-again-4/index.html', preview: 'games/Action/that-level-again-4/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·That Level Again 4游戏', isNew: true },
        { name: 'That Level Again 5', path: 'games/Action/that-level-again-5/index.html', preview: 'games/Action/that-level-again-5/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·That Level Again 5游戏', isNew: true },
        { name: 'Alien Battle', path: 'games/Action/alien-battle/index.html', preview: 'games/Action/alien-battle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Alien Battle游戏', isNew: true },
        { name: 'Bird Shooter', path: 'games/Action/bird-shooter/index.html', preview: 'games/Action/bird-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Bird Shooter游戏', isNew: true },
        { name: 'Cannon Blaster', path: 'games/Action/cannon-blaster/index.html', preview: 'games/Action/cannon-blaster/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Cannon Blaster游戏', isNew: true },
        { name: 'Fighter Fury', path: 'games/Action/fighter-fury/index.html', preview: 'games/Action/fighter-fury/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Fighter Fury游戏', isNew: true },
        { name: 'Fighter Jet', path: 'games/Action/fighter-jet/index.html', preview: 'games/Action/fighter-jet/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Fighter Jet游戏', isNew: true },
        { name: 'Gun Run', path: 'games/Action/gun-run/index.html', preview: 'games/Action/gun-run/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Gun Run游戏', isNew: true },
        { name: 'Gunman', path: 'games/Action/gunman/index.html', preview: 'games/Action/gunman/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Gunman游戏', isNew: true },
        { name: 'Projectile Enemy', path: 'games/Action/projectile-enemy/index.html', preview: 'games/Action/projectile-enemy/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Projectile Enemy游戏', isNew: true },
        { name: 'Robot Destruction', path: 'games/Action/robot-destruction/index.html', preview: 'games/Action/robot-destruction/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Robot Destruction游戏', isNew: true },
        { name: 'Shadow Shooter', path: 'games/Action/shadow-shooter/index.html', preview: 'games/Action/shadow-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Shadow Shooter游戏', isNew: true },
        { name: 'Shoot Enemy', path: 'games/Action/shoot-enemy/index.html', preview: 'games/Action/shoot-enemy/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Shoot Enemy游戏', isNew: true },
        { name: 'Shooter', path: 'games/Action/shooter/index.html', preview: 'games/Action/shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Shooter游戏', isNew: true },
        { name: 'Sniper', path: 'games/Action/sniper/index.html', preview: 'games/Action/sniper/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Sniper游戏', isNew: true },
        { name: 'Space Fighter', path: 'games/Action/space-fighter/index.html', preview: 'games/Action/space-fighter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Space Fighter游戏', isNew: true },
        { name: 'Survivor', path: 'games/Action/survivor/index.html', preview: 'games/Action/survivor/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Survivor游戏', isNew: true },
        { name: 'Tee Shooter', path: 'games/Action/tee-shooter/index.html', preview: 'games/Action/tee-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Tee Shooter游戏', isNew: true },
        { name: 'Thunder God', path: 'games/Action/thunder-god/index.html', preview: 'games/Action/thunder-god/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Thunder God游戏', isNew: true },
        { name: 'Tower Shooter', path: 'games/Action/tower-shooter/index.html', preview: 'games/Action/tower-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Tower Shooter游戏', isNew: true },
        { name: 'Trench Defence', path: 'games/Action/trench-defence/index.html', preview: 'games/Action/trench-defence/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Trench Defence游戏', isNew: true },
        { name: 'Vaccine Shooter', path: 'games/Action/vaccine-shooter/index.html', preview: 'games/Action/vaccine-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Vaccine Shooter游戏', isNew: true },
        { name: 'Window Shooter', path: 'games/Action/window-shooter/index.html', preview: 'games/Action/window-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Window Shooter游戏', isNew: true },
        { name: 'Last Beacon', path: 'games/Astra/Last-Beacon/index.html', preview: 'games/Astra/Last-Beacon/preview.webp', icon: 'fas fa-tower-broadcast', desc: '最后的灯塔：3D海岛塔防' },
        { name: 'Dual Realms', path: 'games/Astra/Dual-Realms/index.html', preview: 'games/Astra/Dual-Realms/preview.webp', icon: 'fas fa-khanda', desc: '时域·放学路：中文横版动作' },
    ],
    Arcade: [
        { name: 'Asteroids', path: 'games/Arcade/Asteroids/index.html', preview: 'games/Arcade/Asteroids/preview.webp', icon: 'fas fa-rocket', hot: true, desc: '经典太空射击街机游戏' },
        { name: 'Frogger', path: 'games/Arcade/Frogger/index.html', preview: 'games/Arcade/Frogger/preview.webp', icon: 'fas fa-frog', hot: true, desc: '经典过街青蛙游戏' },
        { name: 'Bubble Shooter', path: 'games/Arcade/Bubble-Shooter/index.html', preview: 'games/Arcade/Bubble-Shooter/preview.webp', icon: 'fas fa-circle', desc: '泡泡龙射击' },
        { name: 'Candy Crush', path: 'games/Arcade/Candy-Crush/index.html', preview: 'games/Arcade/Candy-Crush/preview.webp', icon: 'fas fa-candy-cane', desc: '糖果消消乐' },
        { name: 'Jump Game', path: 'games/Arcade/Jump-Game/index.html', preview: 'games/Arcade/Jump-Game/preview.webp', icon: 'fas fa-person-running', desc: '跳跃冒险' },
        { name: 'Pac-Man', path: 'games/Arcade/Pac-Man/index.html', preview: 'games/Arcade/Pac-Man/preview.webp', icon: 'fas fa-ghost', hot: true, desc: '经典吃豆人' },
        { name: 'Snake', path: 'games/Arcade/Snake/index.html', preview: 'games/Arcade/Snake/preview.webp', icon: 'fas fa-worm', hot: true, desc: '贪吃蛇' },
        { name: 'Space Invaders', path: 'games/Arcade/Space-Invaders/index.html', preview: 'games/Arcade/Space-Invaders/preview.webp', icon: 'fas fa-space-shuttle', desc: '太空入侵者' },
        { name: 'Tetris', path: 'games/Arcade/Tetris/index.html', preview: 'games/Arcade/Tetris/preview.webp', icon: 'fas fa-square', hot: true, desc: '俄罗斯方块' },
        { name: 'Tower Blocks', path: 'games/Arcade/Tower-Blocks/index.html', preview: 'games/Arcade/Tower-Blocks/preview.webp', icon: 'fas fa-layer-group', desc: '叠叠乐' },
        { name: 'DiabloJS', path: 'games/Arcade/Diablo-JS/index.html', preview: 'games/Arcade/Diablo-JS/preview.webp', icon: 'fas fa-sword', desc: '暗黑风格动作RPG' },
        { name: '3D 小行星', path: 'games/Arcade/Asteroids-3D/index.html', preview: 'games/Arcade/Asteroids-3D/preview.webp', icon: 'fas fa-rocket', desc: 'AI生成的3D太空射击游戏' },
        { name: '泡泡排球', path: 'games/Arcade/Blobby-Volley/index.html', preview: 'games/Arcade/Blobby-Volley/preview.webp', icon: 'fas fa-volleyball', desc: 'AI生成的搞笑排球对战' },
        { name: '打鸭子', path: 'games/Arcade/Duck-Hunt/index.html', preview: 'games/Arcade/Duck-Hunt/preview.webp', icon: 'fas fa-duck', desc: 'AI生成的经典打鸭子游戏' },
        { name: '冰塔攀爬', path: 'games/Arcade/Icy-Tower/index.html', preview: 'games/Arcade/Icy-Tower/preview.webp', icon: 'fas fa-mountain', desc: 'AI生成的冰塔跳跃游戏' },
        { name: '迷你塔防', path: 'games/Arcade/Mini-Tower-Defense/index.html', preview: 'games/Arcade/Mini-Tower-Defense/preview.webp', icon: 'fas fa-chess-rook', desc: 'AI生成的迷你塔防游戏' },
        { name: '导弹指令', path: 'games/Arcade/Missile-Command/index.html', preview: 'games/Arcade/Missile-Command/preview.webp', icon: 'fas fa-bomb', desc: 'AI生成的经典导弹防御' },
        { name: '佩格尔弹球', path: 'games/Arcade/Peggle/index.html', preview: 'games/Arcade/Peggle/preview.webp', icon: 'fas fa-circle', desc: 'AI生成的弹球消除游戏' },
        { name: '合成大西瓜', path: 'games/Arcade/Suika/index.html', preview: 'games/Arcade/Suika/preview.webp', icon: 'fas fa-apple-whole', desc: 'AI生成的合成大西瓜' },
        { name: '蠕虫大战', path: 'games/Arcade/Worms/index.html', preview: 'games/Arcade/Worms/preview.webp', icon: 'fas fa-worm', desc: 'AI生成的回合制蠕虫对战' },
        { name: '细胞吞噬', path: 'games/Arcade/Agario/index.html', preview: 'games/Arcade/Agario/preview.webp', icon: 'fas fa-circle', desc: 'AI生成·细胞吞噬大作战' },
        { name: '火炮对战', path: 'games/Arcade/Artillery/index.html', preview: 'games/Arcade/Artillery/preview.webp', icon: 'fas fa-bomb', desc: 'AI生成·回合制火炮射击' },
        { name: '弹球挑战', path: 'games/Arcade/Ball-Bouncing/index.html', preview: 'games/Arcade/Ball-Bouncing/preview.webp', icon: 'fas fa-baseball', desc: 'AI生成·弹跳球游戏' },
        { name: '泡泡爆破', path: 'games/Arcade/Bubble-Break/index.html', preview: 'games/Arcade/Bubble-Break/preview.webp', icon: 'fas fa-circle', desc: 'AI生成·泡泡消除游戏' },
        { name: '连锁反应', path: 'games/Arcade/Chain-Reaction/index.html', preview: 'games/Arcade/Chain-Reaction/preview.webp', icon: 'fas fa-atom', desc: 'AI生成·连锁反应策略' },
        { name: '涂鸦跳跃', path: 'games/Arcade/Doodling/index.html', preview: 'games/Arcade/Doodling/preview.webp', icon: 'fas fa-pen', desc: 'AI生成·涂鸦冒险' },
        { name: '下坡梦想家', path: 'games/Arcade/Downhill-Dreamer/index.html', preview: 'games/Arcade/Downhill-Dreamer/preview.webp', icon: 'fas fa-skiing', desc: 'AI生成·下坡滑雪' },
        { name: '投掷挑战', path: 'games/Arcade/Fling/index.html', preview: 'games/Arcade/Fling/preview.webp', icon: 'fas fa-hand-rock', desc: 'AI生成·物理投掷游戏' },
        { name: '石油大亨', path: 'games/Arcade/Fresh-Oil/index.html', preview: 'games/Arcade/Fresh-Oil/preview.webp', icon: 'fas fa-gas-pump', desc: 'AI生成·石油开采' },
        { name: '攀登挑战', path: 'games/Arcade/Getting-Up-Here/index.html', preview: 'games/Arcade/Getting-Up-Here/preview.webp', icon: 'fas fa-mountain', desc: 'AI生成·向上攀爬' },
        { name: '蜂鸟飞行', path: 'games/Arcade/Hummingbird/index.html', preview: 'games/Arcade/Hummingbird/preview.webp', icon: 'fas fa-dove', desc: 'AI生成·蜂鸟冒险' },
        { name: '曲线蛇', path: 'games/Arcade/Kurve/index.html', preview: 'games/Arcade/Kurve/preview.webp', icon: 'fas fa-wave-square', desc: 'AI生成·曲线对战' },
        { name: '液体战争', path: 'games/Arcade/Liquid-War/index.html', preview: 'games/Arcade/Liquid-War/preview.webp', icon: 'fas fa-tint', desc: 'AI生成·液体领地争夺' },
        { name: '流光使者', path: 'games/Arcade/Lumenwright/index.html', preview: 'games/Arcade/Lumenwright/preview.webp', icon: 'fas fa-lightbulb', desc: 'AI生成·光影动作' },
        { name: '野鸡射击', path: 'games/Arcade/Moorhuhn/index.html', preview: 'games/Arcade/Moorhuhn/preview.webp', icon: 'fas fa-feather', desc: 'AI生成·打野鸡游戏' },
        { name: '障碍躲避', path: 'games/Arcade/Obstacle-Dodge/index.html', preview: 'games/Arcade/Obstacle-Dodge/preview.webp', icon: 'fas fa-running', desc: 'AI生成·躲避障碍' },
        { name: '企鹅投掷', path: 'games/Arcade/Pingu-Throw/index.html', preview: 'games/Arcade/Pingu-Throw/preview.webp', icon: 'fas fa-snowman', desc: 'AI生成·企鹅扔雪球' },
        { name: '脉冲锻造', path: 'games/Arcade/Pulseforge/index.html', preview: 'games/Arcade/Pulseforge/preview.webp', icon: 'fas fa-bolt', desc: 'AI生成·脉冲射击' },
        { name: '推矿车', path: 'games/Arcade/Push-Mine/index.html', preview: 'games/Arcade/Push-Mine/preview.webp', icon: 'fas fa-hard-hat', desc: 'AI生成·推矿车冒险' },
        { name: 'Qix围地', path: 'games/Arcade/Qix/index.html', preview: 'games/Arcade/Qix/preview.webp', icon: 'fas fa-vector-square', desc: 'AI生成·经典围地游戏' },
        { name: '散射', path: 'games/Arcade/Scatter/index.html', preview: 'games/Arcade/Scatter/preview.webp', icon: 'fas fa-expand', desc: 'AI生成·散射射击' },
        { name: '天际线', path: 'games/Arcade/Skyline/index.html', preview: 'games/Arcade/Skyline/preview.webp', icon: 'fas fa-city', desc: 'AI生成·城市建造' },
        { name: '堆叠塔', path: 'games/Arcade/Stack-Tower/index.html', preview: 'games/Arcade/Stack-Tower/preview.webp', icon: 'fas fa-layer-group', desc: 'AI生成·堆叠高塔' },
        { name: '层叠', path: 'games/Arcade/Strata/index.html', preview: 'games/Arcade/Strata/preview.webp', icon: 'fas fa-layer-group', desc: 'AI生成·层叠消除' },
        { name: '木材边界', path: 'games/Arcade/Timberbound/index.html', preview: 'games/Arcade/Timberbound/preview.webp', icon: 'fas fa-tree', desc: 'AI生成·伐木动作' },
        { name: '虚空', path: 'games/Arcade/Void/index.html', preview: 'games/Arcade/Void/preview.webp', icon: 'fas fa-globe', desc: 'AI生成·虚空探索' },
        { name: '虚空奔跑', path: 'games/Arcade/Void-Runner/index.html', preview: 'games/Arcade/Void-Runner/preview.webp', icon: 'fas fa-running', desc: 'AI生成·虚空跑酷' },
        { name: '网页工艺', path: 'games/Arcade/Webcraft/index.html', preview: 'games/Arcade/Webcraft/preview.webp', icon: 'fas fa-cube', desc: 'AI生成·网页建造' },
        { name: '魔毯巫师', path: 'games/Arcade/Magic-Carpet-Wizard/index.html', preview: 'games/Arcade/Magic-Carpet-Wizard/preview.webp', icon: 'fas fa-hat-wizard', desc: 'AI生成·魔法飞毯冒险' },,
        { name: '方块掉落', path: 'games/Arcade/Block-Drop/index.html', preview: 'games/Arcade/Block-Drop/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·方块掉落街机游戏', isNew: true },
        { name: '乒乓', path: 'games/Arcade/Pong/index.html', preview: 'games/Arcade/Pong/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·经典乒乓游戏', isNew: true },
        { name: '乒乓精简版', path: 'games/Arcade/pong-lite/index.html', preview: 'games/Arcade/pong-lite/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·精简版乒乓游戏', isNew: true },
        { name: '无尽跑酷', path: 'games/Arcade/endless-runner/index.html', preview: 'games/Arcade/endless-runner/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·无尽跑酷游戏', isNew: true },
        { name: 'Abhita', path: 'games/Arcade/abhita/index.html', preview: 'games/Arcade/abhita/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Abhita游戏', isNew: true },
        { name: 'Balance Stack', path: 'games/Arcade/balance-stack/index.html', preview: 'games/Arcade/balance-stack/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Balance Stack游戏', isNew: true },
        { name: 'Bomb Blast', path: 'games/Arcade/bomb-blast/index.html', preview: 'games/Arcade/bomb-blast/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Bomb Blast游戏', isNew: true },
        { name: 'Boom Dots', path: 'games/Arcade/boom-dots/index.html', preview: 'games/Arcade/boom-dots/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Boom Dots游戏', isNew: true },
        { name: 'Breakoid', path: 'games/Arcade/breakoid/index.html', preview: 'games/Arcade/breakoid/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Breakoid游戏', isNew: true },
        { name: 'Bug Smasher', path: 'games/Arcade/bug-smasher/index.html', preview: 'games/Arcade/bug-smasher/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Bug Smasher游戏', isNew: true },
        { name: 'Catch Me If You Can', path: 'games/Arcade/catch-me-if-you-can/index.html', preview: 'games/Arcade/catch-me-if-you-can/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Catch Me If You Can游戏', isNew: true },
        { name: 'Circle Path', path: 'games/Arcade/circle-path/index.html', preview: 'games/Arcade/circle-path/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Circle Path游戏', isNew: true },
        { name: 'Collector', path: 'games/Arcade/collector/index.html', preview: 'games/Arcade/collector/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Collector游戏', isNew: true },
        { name: 'Color Dash', path: 'games/Arcade/color-dash/index.html', preview: 'games/Arcade/color-dash/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Color Dash游戏', isNew: true },
        { name: 'Crowd Control', path: 'games/Arcade/crowd-control/index.html', preview: 'games/Arcade/crowd-control/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Crowd Control游戏', isNew: true },
        { name: 'Curve Snake', path: 'games/Arcade/curve-snake/index.html', preview: 'games/Arcade/curve-snake/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Curve Snake游戏', isNew: true },
        { name: 'Demon', path: 'games/Arcade/demon/index.html', preview: 'games/Arcade/demon/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Demon游戏', isNew: true },
        { name: 'Dodge Enemy', path: 'games/Arcade/dodge-enemy/index.html', preview: 'games/Arcade/dodge-enemy/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Dodge Enemy游戏', isNew: true },
        { name: 'Dodge Master', path: 'games/Arcade/dodge-master/index.html', preview: 'games/Arcade/dodge-master/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Dodge Master游戏', isNew: true },
        { name: 'Dream Weaver', path: 'games/Arcade/dream-weaver/index.html', preview: 'games/Arcade/dream-weaver/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Dream Weaver游戏', isNew: true },
        { name: 'Ellars', path: 'games/Arcade/ellars/index.html', preview: 'games/Arcade/ellars/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Ellars游戏', isNew: true },
        { name: 'Endless Mafia', path: 'games/Arcade/endless-mafia/index.html', preview: 'games/Arcade/endless-mafia/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Endless Mafia游戏', isNew: true },
        { name: 'Flappy', path: 'games/Arcade/flappy/index.html', preview: 'games/Arcade/flappy/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Flappy游戏', isNew: true },
        { name: 'Fly Monkey', path: 'games/Arcade/fly-monkey/index.html', preview: 'games/Arcade/fly-monkey/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Fly Monkey游戏', isNew: true },
        { name: 'Glass Step', path: 'games/Arcade/glass-step/index.html', preview: 'games/Arcade/glass-step/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Glass Step游戏', isNew: true },
        { name: 'Hungry Player', path: 'games/Arcade/hungry-player/index.html', preview: 'games/Arcade/hungry-player/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Hungry Player游戏', isNew: true },
        { name: 'Jump Dot', path: 'games/Arcade/jump-dot/index.html', preview: 'games/Arcade/jump-dot/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Jump Dot游戏', isNew: true },
        { name: 'Kaiju Krush', path: 'games/Arcade/kaiju-krush/index.html', preview: 'games/Arcade/kaiju-krush/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Kaiju Krush游戏', isNew: true },
        { name: 'Luma Bounce', path: 'games/Arcade/luma-bounce/index.html', preview: 'games/Arcade/luma-bounce/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Luma Bounce游戏', isNew: true },
        { name: 'Pirates', path: 'games/Arcade/pirates/index.html', preview: 'games/Arcade/pirates/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Pirates游戏', isNew: true },
        { name: 'Red Light Green Light', path: 'games/Arcade/red-light-green-light/index.html', preview: 'games/Arcade/red-light-green-light/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Red Light Green Light游戏', isNew: true },
        { name: 'Road Cross', path: 'games/Arcade/road-cross/index.html', preview: 'games/Arcade/road-cross/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Road Cross游戏', isNew: true },
        { name: 'Shape Collector', path: 'games/Arcade/shape-collector/index.html', preview: 'games/Arcade/shape-collector/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Shape Collector游戏', isNew: true },
        { name: 'Sky High', path: 'games/Arcade/sky-high/index.html', preview: 'games/Arcade/sky-high/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Sky High游戏', isNew: true },
        { name: 'Space Waves', path: 'games/Arcade/space-waves/index.html', preview: 'games/Arcade/space-waves/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Space Waves游戏', isNew: true },
        { name: 'Spaceman', path: 'games/Arcade/spaceman/index.html', preview: 'games/Arcade/spaceman/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Spaceman游戏', isNew: true },
        { name: 'Stick Game', path: 'games/Arcade/stick-game/index.html', preview: 'games/Arcade/stick-game/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Stick Game游戏', isNew: true },
        { name: 'Stick Toss', path: 'games/Arcade/stick-toss/index.html', preview: 'games/Arcade/stick-toss/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Stick Toss游戏', isNew: true },
        { name: 'Swipe Assassin', path: 'games/Arcade/swipe-assassin/index.html', preview: 'games/Arcade/swipe-assassin/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Swipe Assassin游戏', isNew: true },
        { name: 'Tap Target', path: 'games/Arcade/tap-target/index.html', preview: 'games/Arcade/tap-target/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Tap Target游戏', isNew: true },
        { name: 'Whack A Bug', path: 'games/Arcade/whack-a-bug/index.html', preview: 'games/Arcade/whack-a-bug/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Whack A Bug游戏', isNew: true },
        { name: 'Car Race', path: 'games/Arcade/car-race/index.html', preview: 'games/Arcade/car-race/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Car Race游戏', isNew: true },
        { name: 'Forest Runner', path: 'games/Arcade/forest-runner/index.html', preview: 'games/Arcade/forest-runner/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Forest Runner游戏', isNew: true },
        { name: 'One Car', path: 'games/Arcade/one-car/index.html', preview: 'games/Arcade/one-car/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·One Car游戏', isNew: true },
        { name: 'Road Fighter', path: 'games/Arcade/road-fighter/index.html', preview: 'games/Arcade/road-fighter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Road Fighter游戏', isNew: true },
        { name: 'Shadow Runner', path: 'games/Arcade/shadow-runner/index.html', preview: 'games/Arcade/shadow-runner/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Shadow Runner游戏', isNew: true },
        { name: 'Straight Rush', path: 'games/Arcade/straight-rush/index.html', preview: 'games/Arcade/straight-rush/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Straight Rush游戏', isNew: true },
        { name: 'Survival Run', path: 'games/Arcade/survival-run/index.html', preview: 'games/Arcade/survival-run/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Survival Run游戏', isNew: true },
        { name: 'Two Cars', path: 'games/Arcade/two-cars/index.html', preview: 'games/Arcade/two-cars/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Two Cars游戏', isNew: true },
        { name: 'Two Cars Ai', path: 'games/Arcade/two-cars-ai/index.html', preview: 'games/Arcade/two-cars-ai/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Two Cars Ai游戏', isNew: true },
        { name: 'Thunderfall', path: 'games/Astra/Thunderfall/index.html', preview: 'games/Astra/Thunderfall/preview.webp', icon: 'fas fa-rocket', hot: true, desc: '雷霆战机·天穹远征：纵向弹幕射击' },
        { name: 'APEX CLUB', path: 'games/Astra/Apex-Club/index.html', preview: 'games/Astra/Apex-Club/preview.webp', icon: 'fas fa-car', desc: 'Bay Circuit 3D卡丁车大奖赛' },
        { name: 'Fruit Ninja', path: 'games/Astra/Fruit-Ninja-Dojo/index.html', preview: 'games/Astra/Fruit-Ninja-Dojo/preview.webp', icon: 'fas fa-apple-whole', desc: '水果忍者·再来一刀：经典切水果' },
        { name: 'Race Jimothy', path: 'games/Astra/Race-Jimothy/index.html', preview: 'games/Astra/Race-Jimothy/preview.webp', icon: 'fas fa-pencil-ruler', desc: '画画赛车：和浣熊比赛' },
    ],
    Board: [
        { name: 'Connect Four', path: 'games/Board/Connect-Four/index.html', preview: 'games/Board/Connect-Four/preview.webp', icon: 'fas fa-circle', desc: '经典四子连珠策略游戏' },
        { name: 'Blackjack', path: 'games/Board/Blackjack/index.html', preview: 'games/Board/Blackjack/preview.webp', icon: 'fas fa-club', desc: '经典21点扑克牌游戏' },
        { name: 'Checkers', path: 'games/Board/Checkers/index.html', preview: 'games/Board/Checkers/preview.webp', icon: 'fas fa-chess-board', desc: '经典西洋跳棋游戏' },
        { name: 'Poker', path: 'games/Board/Poker/index.html', preview: 'games/Board/Poker/preview.webp', icon: 'fas fa-diamond', desc: '经典五张牌扑克游戏' },
        { name: 'Battleship', path: 'games/Board/Battleship/index.html', preview: 'games/Board/Battleship/preview.webp', icon: 'fas fa-ship', desc: '经典海战棋游戏' },
        { name: '双陆棋', path: 'games/Board/Backgammon/index.html', preview: 'games/Board/Backgammon/preview.webp', icon: 'fas fa-dice', desc: 'AI生成的经典双陆棋游戏' },
        { name: '国际象棋', path: 'games/Board/Chess/index.html', preview: 'games/Board/Chess/preview.webp', icon: 'fas fa-chess', desc: 'AI生成的国际象棋游戏' },
        { name: '空当接龙', path: 'games/Board/Freecell/index.html', preview: 'games/Board/Freecell/preview.webp', icon: 'fas fa-clone', desc: 'AI生成的空当接龙纸牌' },
        { name: '8球台球', path: 'games/Board/8-Ball/index.html', preview: 'games/Board/8-Ball/preview.webp', icon: 'fas fa-circle', desc: 'AI生成·美式台球' },
        { name: '疯狂八', path: 'games/Board/Crazy-Eights/index.html', preview: 'games/Board/Crazy-Eights/preview.webp', icon: 'fas fa-clone', desc: 'AI生成·疯狂八纸牌' },
        { name: '飞行棋', path: 'games/Board/Ludo/index.html', preview: 'games/Board/Ludo/preview.webp', icon: 'fas fa-dice', desc: 'AI生成·经典飞行棋' },
        { name: '快艇骰子', path: 'games/Board/Yahtzee/index.html', preview: 'games/Board/Yahtzee/preview.webp', icon: 'fas fa-dice', desc: 'AI生成·骰子游戏' },
        { name: 'Gomoku', path: 'games/Board/Gomoku/index.html', preview: 'games/Board/Gomoku/preview.webp', icon: 'fas fa-circle-dot', desc: '五子棋对战' },
        { name: 'Rock Paper Scissors', path: 'games/Board/Rock-Paper-Scissors/index.html', preview: 'games/Board/Rock-Paper-Scissors/preview.webp', icon: 'fas fa-hand-scissors', desc: '石头剪刀布' },
        { name: 'Tic Tac Toe', path: 'games/Board/Tic-Tac-Toe/index.html', preview: 'games/Board/Tic-Tac-Toe/preview.webp', icon: 'fas fa-hashtag', desc: '井字棋' },
        { name: 'Reversi', path: 'games/Board/Reversi/index.html', preview: 'games/Board/Reversi/preview.webp', icon: 'fas fa-circle-half-stroke', desc: '3D黑白棋' },
        { name: 'Solitaire', path: 'games/Board/Solitaire/index.html', preview: 'games/Board/Solitaire/preview.webp', icon: 'fas fa-layer-group', hot: true, desc: '纸牌接龙' },
        { name: 'Mahjong Connect', path: 'games/Board/Mahjong-Connect/index.html', preview: 'games/Board/Mahjong-Connect/preview.webp', icon: 'fas fa-border-all', desc: '麻将连连看' },,
        { name: '集会', path: 'games/Board/agora/index.html', preview: 'games/Board/agora/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·策略棋盘游戏', isNew: true },
        { name: '阿雷西亚', path: 'games/Board/aresia/index.html', preview: 'games/Board/aresia/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·策略棋盘游戏', isNew: true },
        { name: 'Bisque棋', path: 'games/Board/bisque/index.html', preview: 'games/Board/bisque/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·原创棋盘游戏', isNew: true },
        { name: '教义', path: 'games/Board/doctrine/index.html', preview: 'games/Board/doctrine/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·策略棋盘游戏', isNew: true },
        { name: '围棋', path: 'games/Board/go/index.html', preview: 'games/Board/go/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·经典围棋游戏', isNew: true },
        { name: '麻将', path: 'games/Board/mahjong/index.html', preview: 'games/Board/mahjong/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·经典麻将游戏', isNew: true },
        { name: '非洲棋', path: 'games/Board/mancala/index.html', preview: 'games/Board/mancala/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·经典非洲棋游戏', isNew: true },
        { name: '黑白棋', path: 'games/Board/othello/index.html', preview: 'games/Board/othello/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·经典黑白棋游戏', isNew: true },
        { name: '五线棋', path: 'games/Board/pentegrammai/index.html', preview: 'games/Board/pentegrammai/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·原创棋盘游戏', isNew: true },
        { name: '塞尼特棋', path: 'games/Board/senet/index.html', preview: 'games/Board/senet/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·古埃及棋盘游戏', isNew: true },
        { name: '乌尔棋', path: 'games/Board/ur/index.html', preview: 'games/Board/ur/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·古美索不达米亚棋盘游戏', isNew: true },
        { name: 'Carrom', path: 'games/Board/carrom/index.html', preview: 'games/Board/carrom/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Carrom游戏', isNew: true },
        { name: 'Snake And Ladder', path: 'games/Board/snake-and-ladder/index.html', preview: 'games/Board/snake-and-ladder/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Snake And Ladder游戏', isNew: true }
    ],
    Memory: [
        { name: 'Color Match', path: 'games/Memory/Color-Match/index.html', icon: 'fas fa-palette', desc: '颜色匹配记忆' },
        { name: 'Match Pairs', path: 'games/Memory/Match-Pairs/index.html', icon: 'fas fa-clone', desc: '配对记忆' },
        { name: 'Memory Card', path: 'games/Memory/Memory-Card/index.html', icon: 'fas fa-id-card', desc: '记忆卡片翻牌' },
        { name: 'Simon Says', path: 'games/Memory/Simon-Says/index.html', icon: 'fas fa-circle-notch', desc: '西蒙说记忆' },
    ],
    Typing: [
        { name: '猴子打字', path: 'games/Typing/MonkeyType/index.html', preview: 'games/Typing/MonkeyType/preview.webp', icon: 'fas fa-keyboard', desc: 'AI生成·打字测试' },
        { name: '文字雨', path: 'games/Typing/Word-Rain/index.html', preview: 'games/Typing/Word-Rain/preview.webp', icon: 'fas fa-cloud-rain', desc: 'AI生成·打字雨' },
        { name: 'Hangman', path: 'games/Typing/Hangman/index.html', icon: 'fas fa-spell-check', desc: '猜单词游戏' },
        { name: 'Speed Typing', path: 'games/Typing/Speed-Typing/index.html', icon: 'fas fa-keyboard', desc: '速度打字练习' },
        { name: 'Type Master', path: 'games/Typing/Type-Master/index.html', icon: 'fas fa-font', desc: '打字大师' },
        { name: 'Typing Speed Challenge', path: 'games/Typing/Typing-Speed-Challenge/index.html', icon: 'fas fa-stopwatch', desc: '打字速度挑战' },,
        { name: '打字比赛', path: 'games/Typing/typing-race/index.html', preview: 'games/Typing/typing-race/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·打字速度比赛', isNew: true }
    ],
    Adventure: [],
    Casual: [
        { name: 'AI之死', path: 'games/Casual/Death-by-AI/index.html', preview: 'games/Casual/Death-by-AI/preview.webp', icon: 'fas fa-robot', desc: 'AI生成·AI审判互动' },
        { name: '无处不在', path: 'games/Casual/Everywhere/index.html', preview: 'games/Casual/Everywhere/preview.webp', icon: 'fas fa-globe-americas', desc: 'AI生成·互动体验' },
        { name: '家庭问答', path: 'games/Casual/Family-Feud/index.html', preview: 'games/Casual/Family-Feud/preview.webp', icon: 'fas fa-users', desc: 'AI生成·家庭竞猜' },
        { name: '互动伙伴', path: 'games/Casual/Interactive-Buddy/index.html', preview: 'games/Casual/Interactive-Buddy/preview.webp', icon: 'fas fa-hand-sparkles', desc: 'AI生成·虚拟宠物' },
        { name: '生活石头剪刀布', path: 'games/Casual/Living-RPS/index.html', preview: 'games/Casual/Living-RPS/preview.webp', icon: 'fas fa-hand-scissors', desc: 'AI生成·动态猜拳' },
        { name: '动物园', path: 'games/Casual/Menagerie/index.html', preview: 'games/Casual/Menagerie/preview.webp', icon: 'fas fa-horse', desc: 'AI生成·动物观赏' },
        { name: '神秘AI', path: 'games/Casual/Mystery-AI/index.html', preview: 'games/Casual/Mystery-AI/preview.webp', icon: 'fas fa-question', desc: 'AI生成·AI推理互动' },
        { name: '游行', path: 'games/Casual/Procession/index.html', preview: 'games/Casual/Procession/preview.webp', icon: 'fas fa-music', desc: 'AI生成·游行体验' },
        { name: '台球架', path: 'games/Casual/Rack/index.html', preview: 'games/Casual/Rack/preview.webp', icon: 'fas fa-circle', desc: 'AI生成·休闲台球' },
        { name: '车间', path: 'games/Casual/Shopfloor/index.html', preview: 'games/Casual/Shopfloor/preview.webp', icon: 'fas fa-industry', desc: 'AI生成·车间模拟' },
        { name: '时间旅行社', path: 'games/Casual/Time-Travel-Agency/index.html', preview: 'games/Casual/Time-Travel-Agency/preview.webp', icon: 'fas fa-clock', desc: 'AI生成·文字冒险' },
        { name: '两真一假', path: 'games/Casual/Two-Truths-One-Lie/index.html', preview: 'games/Casual/Two-Truths-One-Lie/preview.webp', icon: 'fas fa-theater-masks', desc: 'AI生成·猜谎游戏' },
        { name: '表情部落', path: 'games/Casual/Emoji-Horde/index.html', preview: 'games/Casual/Emoji-Horde/preview.webp', icon: 'fas fa-laugh', desc: 'AI生成的表情塔防生存' },
        { name: '表情三消', path: 'games/Casual/Emoji-Match-Three/index.html', preview: 'games/Casual/Emoji-Match-Three/preview.webp', icon: 'fas fa-gem', desc: 'AI生成的表情三消游戏' },
        { name: '钓鱼', path: 'games/Casual/Fishing/index.html', preview: 'games/Casual/Fishing/preview.webp', icon: 'fas fa-fish', desc: 'AI生成的休闲钓鱼游戏' },
        { name: '闲置工厂', path: 'games/Casual/Idle-Factory/index.html', preview: 'games/Casual/Idle-Factory/preview.webp', icon: 'fas fa-industry', desc: 'AI生成的放置类工厂经营' },
        { name: 'Dice Roll Simulator', path: 'games/Casual/Dice-Roll-Simulator/index.html', preview: 'games/Casual/Dice-Roll-Simulator/preview.webp', icon: 'fas fa-dice', desc: '骰子模拟器' },
        { name: 'Quiz', path: 'games/Casual/Quiz/index.html', preview: 'games/Casual/Quiz/preview.webp', icon: 'fas fa-question-circle', desc: '知识问答' },
        { name: 'Speak Number Guessing', path: 'games/Casual/Speak-Number-Guessing/index.html', preview: 'games/Casual/Speak-Number-Guessing/preview.webp', icon: 'fas fa-microphone', desc: '语音猜数字' },
        { name: 'Type Number Guessing', path: 'games/Casual/Type-Number-Guessing/index.html', preview: 'games/Casual/Type-Number-Guessing/preview.webp', icon: 'fas fa-calculator', desc: '打字猜数字' },
        { name: 'Rhythm Game', path: 'games/Casual/Rhythm-Game/index.html', preview: 'games/Casual/Rhythm-Game/preview.webp', icon: 'fas fa-music', desc: '音乐节奏游戏' },
        { name: 'Coloring Book', path: 'games/Casual/Coloring-Book/index.html', preview: 'games/Casual/Coloring-Book/preview.webp', icon: 'fas fa-paint-brush', desc: '涂色画册' },,
        { name: '接住圆圈', path: 'games/Casual/Catch-Circle/index.html', preview: 'games/Casual/Catch-Circle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·休闲反应游戏', isNew: true },
        { name: '数字猜谜', path: 'games/Casual/Number-Guess/index.html', preview: 'games/Casual/Number-Guess/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·猜数字游戏', isNew: true },
        { name: '打地鼠HTML', path: 'games/Casual/Whac-A-Mole-HTML/index.html', preview: 'games/Casual/Whac-A-Mole-HTML/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·打地鼠游戏', isNew: true },
        { name: '点击冲刺', path: 'games/Casual/click-sprint/index.html', preview: 'games/Casual/click-sprint/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·快速点击反应游戏', isNew: true },
        { name: '猜数字', path: 'games/Casual/guess-number/index.html', preview: 'games/Casual/guess-number/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·猜数字小游戏', isNew: true },
        { name: '硬币连胜', path: 'games/Casual/coin-streak/index.html', preview: 'games/Casual/coin-streak/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·抛硬币连胜游戏', isNew: true },
        { name: '反应测试', path: 'games/Casual/reaction-time/index.html', preview: 'games/Casual/reaction-time/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·反应速度测试', isNew: true },
        { name: '骰子战斗', path: 'games/Casual/dice-battle/index.html', preview: 'games/Casual/dice-battle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·骰子对战游戏', isNew: true },
        { name: '接掉落物', path: 'games/Casual/falling-catcher/index.html', preview: 'games/Casual/falling-catcher/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·接取掉落物游戏', isNew: true },
        { name: '远日点', path: 'games/Casual/apoapsis/index.html', preview: 'games/Casual/apoapsis/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·物理模拟游戏', isNew: true },
        { name: '蓝色生物圈', path: 'games/Casual/biosphereblue/index.html', preview: 'games/Casual/biosphereblue/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·生态模拟游戏', isNew: true },
        { name: '大坝操作员', path: 'games/Casual/bonnevillespillwayoperator/index.html', preview: 'games/Casual/bonnevillespillwayoperator/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·水坝管理模拟游戏', isNew: true },
        { name: '漂移', path: 'games/Casual/drift/index.html', preview: 'games/Casual/drift/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·漂移物理游戏', isNew: true },
        { name: '日食预测', path: 'games/Casual/eclipsepredictor/index.html', preview: 'games/Casual/eclipsepredictor/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·天文预测游戏', isNew: true },
        { name: '大都会2K', path: 'games/Casual/metropolis2k/index.html', preview: 'games/Casual/metropolis2k/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·城市建设模拟游戏', isNew: true },
        { name: '奥德赛', path: 'games/Adventure/odyssey/index.html', preview: 'games/Adventure/odyssey/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·冒险探索游戏', isNew: true },
        { name: '潮间带', path: 'games/Casual/tidelands/index.html', preview: 'games/Casual/tidelands/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·潮汐模拟游戏', isNew: true },
        { name: '塔楼', path: 'games/Casual/tower/index.html', preview: 'games/Casual/tower/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·塔楼物理游戏', isNew: true },
        { name: '终极井字棋', path: 'games/Casual/ultimatetictactoe/index.html', preview: 'games/Casual/ultimatetictactoe/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·终极井字棋游戏', isNew: true },
        { name: 'Bubble Pop', path: 'games/Casual/bubble-pop/index.html', preview: 'games/Casual/bubble-pop/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Bubble Pop游戏', isNew: true },
        { name: 'Buttermilk', path: 'games/Casual/buttermilk/index.html', preview: 'games/Casual/buttermilk/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Buttermilk游戏', isNew: true },
        { name: 'Candy Crusher', path: 'games/Casual/candy-crusher/index.html', preview: 'games/Casual/candy-crusher/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Candy Crusher游戏', isNew: true },
        { name: 'Cooking', path: 'games/Casual/cooking/index.html', preview: 'games/Casual/cooking/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Cooking游戏', isNew: true },
        { name: 'Fruit Basket', path: 'games/Casual/fruit-basket/index.html', preview: 'games/Casual/fruit-basket/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Fruit Basket游戏', isNew: true },
        { name: 'Fruit Cosmics', path: 'games/Casual/fruit-cosmics/index.html', preview: 'games/Casual/fruit-cosmics/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Fruit Cosmics游戏', isNew: true },
        { name: 'Archer', path: 'games/Casual/archer/index.html', preview: 'games/Casual/archer/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Archer游戏', isNew: true },
        { name: 'Basketball', path: 'games/Casual/basketball/index.html', preview: 'games/Casual/basketball/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Basketball游戏', isNew: true },
        { name: 'Bowling', path: 'games/Casual/bowling/index.html', preview: 'games/Casual/bowling/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Bowling游戏', isNew: true },
        { name: 'Cricket 123', path: 'games/Casual/cricket-123/index.html', preview: 'games/Casual/cricket-123/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Cricket 123游戏', isNew: true },
        { name: 'Football', path: 'games/Casual/football/index.html', preview: 'games/Casual/football/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Football游戏', isNew: true },
        { name: 'Penalty', path: 'games/Casual/penalty/index.html', preview: 'games/Casual/penalty/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Penalty游戏', isNew: true },
        { name: 'Table Tennis', path: 'games/Casual/table-tennis/index.html', preview: 'games/Casual/table-tennis/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Table Tennis游戏', isNew: true },
        { name: 'Mosswing', path: 'games/Astra/Mosswing/index.html', preview: 'games/Astra/Mosswing/preview.webp', icon: 'fas fa-leaf', desc: '物理沙盒：动量重力与软体' },
        { name: 'Melon Lab', path: 'games/Astra/Melon-Lab/index.html', preview: 'games/Astra/Melon-Lab/preview.webp', icon: 'fas fa-apple-whole', desc: '瓜体实验室：甜瓜物理沙盒' },
    ],
};
// 生成艺术体验（AI 生成交互体验合集）：独立于玩法分类展示，不参与筛选与计数
const genArtExperiences = [
    { name: 'Orbital Garden', path: 'games/Astra/Orbital-Garden/index.html', preview: 'games/Astra/Orbital-Garden/preview.webp', icon: 'fas fa-atom', desc: '轨道花园：可触摸的生成艺术' },
    { name: '极光观测台', path: 'games/Astra/MiaAI-Experiences/001-aurora-observatory/index.html', preview: 'games/Astra/MiaAI-Experiences/001-aurora-observatory/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '形态编辑', path: 'games/Astra/MiaAI-Experiences/002-form-editorial/index.html', preview: 'games/Astra/MiaAI-Experiences/002-form-editorial/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '动力时间', path: 'games/Astra/MiaAI-Experiences/003-kinetic-time/index.html', preview: 'games/Astra/MiaAI-Experiences/003-kinetic-time/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '沙丘居所', path: 'games/Astra/MiaAI-Experiences/004-dune-residence/index.html', preview: 'games/Astra/MiaAI-Experiences/004-dune-residence/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '深渊声纳', path: 'games/Astra/MiaAI-Experiences/005-abyss-sonar/index.html', preview: 'games/Astra/MiaAI-Experiences/005-abyss-sonar/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: 'A面唱片', path: 'games/Astra/MiaAI-Experiences/006-side-a-records/index.html', preview: 'games/Astra/MiaAI-Experiences/006-side-a-records/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '植物标本馆', path: 'games/Astra/MiaAI-Experiences/007-herbarium/index.html', preview: 'games/Astra/MiaAI-Experiences/007-herbarium/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '珍珠香水', path: 'games/Astra/MiaAI-Experiences/008-nacre-parfum/index.html', preview: 'games/Astra/MiaAI-Experiences/008-nacre-parfum/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '非常规练习', path: 'games/Astra/MiaAI-Experiences/009-unusual-practice/index.html', preview: 'games/Astra/MiaAI-Experiences/009-unusual-practice/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '熔岩酒廊', path: 'games/Astra/MiaAI-Experiences/010-lava-lounge/index.html', preview: 'games/Astra/MiaAI-Experiences/010-lava-lounge/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '远方明信片', path: 'games/Astra/MiaAI-Experiences/011-postcards-from-elsewhere/index.html', preview: 'games/Astra/MiaAI-Experiences/011-postcards-from-elsewhere/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '文字花园', path: 'games/Astra/MiaAI-Experiences/012-word-garden/index.html', preview: 'games/Astra/MiaAI-Experiences/012-word-garden/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '像素果园', path: 'games/Astra/MiaAI-Experiences/013-pixel-orchard/index.html', preview: 'games/Astra/MiaAI-Experiences/013-pixel-orchard/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '风暴之窗', path: 'games/Astra/MiaAI-Experiences/014-storm-window/index.html', preview: 'games/Astra/MiaAI-Experiences/014-storm-window/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '折纸工作室', path: 'games/Astra/MiaAI-Experiences/015-fold-studio/index.html', preview: 'games/Astra/MiaAI-Experiences/015-fold-studio/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '光之蓝图', path: 'games/Astra/MiaAI-Experiences/016-blueprint-of-light/index.html', preview: 'games/Astra/MiaAI-Experiences/016-blueprint-of-light/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '水母芭蕾', path: 'games/Astra/MiaAI-Experiences/017-jellyfish-ballet/index.html', preview: 'games/Astra/MiaAI-Experiences/017-jellyfish-ballet/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '迷宫俱乐部', path: 'games/Astra/MiaAI-Experiences/018-labyrinth-club/index.html', preview: 'games/Astra/MiaAI-Experiences/018-labyrinth-club/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '木漏日厨房', path: 'games/Astra/MiaAI-Experiences/019-komorebi-kitchen/index.html', preview: 'games/Astra/MiaAI-Experiences/019-komorebi-kitchen/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '色度场', path: 'games/Astra/MiaAI-Experiences/020-chroma-field/index.html', preview: 'games/Astra/MiaAI-Experiences/020-chroma-field/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '出发时刻表', path: 'games/Astra/MiaAI-Experiences/021-departure-board/index.html', preview: 'games/Astra/MiaAI-Experiences/021-departure-board/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '线与形', path: 'games/Astra/MiaAI-Experiences/022-thread-and-form/index.html', preview: 'games/Astra/MiaAI-Experiences/022-thread-and-form/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '山脊线', path: 'games/Astra/MiaAI-Experiences/023-ridgeline/index.html', preview: 'games/Astra/MiaAI-Experiences/023-ridgeline/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '小小胜利', path: 'games/Astra/MiaAI-Experiences/024-small-victories/index.html', preview: 'games/Astra/MiaAI-Experiences/024-small-victories/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '航空形态', path: 'games/Astra/MiaAI-Experiences/025-aero-form/index.html', preview: 'games/Astra/MiaAI-Experiences/025-aero-form/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '潮汐时刻', path: 'games/Astra/MiaAI-Experiences/026-tidal-hours/index.html', preview: 'games/Astra/MiaAI-Experiences/026-tidal-hours/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '矿物陈列柜', path: 'games/Astra/MiaAI-Experiences/027-mineral-cabinet/index.html', preview: 'games/Astra/MiaAI-Experiences/027-mineral-cabinet/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '月历', path: 'games/Astra/MiaAI-Experiences/028-lunar-calendar/index.html', preview: 'games/Astra/MiaAI-Experiences/028-lunar-calendar/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '花粉图谱', path: 'games/Astra/MiaAI-Experiences/029-pollen-atlas/index.html', preview: 'games/Astra/MiaAI-Experiences/029-pollen-atlas/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '等高线办公室', path: 'games/Astra/MiaAI-Experiences/030-contour-office/index.html', preview: 'games/Astra/MiaAI-Experiences/030-contour-office/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '鲸鱼频率', path: 'games/Astra/MiaAI-Experiences/031-whale-frequency/index.html', preview: 'games/Astra/MiaAI-Experiences/031-whale-frequency/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '蕨类温室', path: 'games/Astra/MiaAI-Experiences/032-fern-house/index.html', preview: 'games/Astra/MiaAI-Experiences/032-fern-house/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '气压计房间', path: 'games/Astra/MiaAI-Experiences/033-barometer-room/index.html', preview: 'games/Astra/MiaAI-Experiences/033-barometer-room/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '日食密室', path: 'games/Astra/MiaAI-Experiences/034-eclipse-chamber/index.html', preview: 'games/Astra/MiaAI-Experiences/034-eclipse-chamber/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '珊瑚礁保护区', path: 'games/Astra/MiaAI-Experiences/035-reef-reserve/index.html', preview: 'games/Astra/MiaAI-Experiences/035-reef-reserve/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '北极日记', path: 'games/Astra/MiaAI-Experiences/036-arctic-journal/index.html', preview: 'games/Astra/MiaAI-Experiences/036-arctic-journal/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '迁徙地图', path: 'games/Astra/MiaAI-Experiences/037-migration-map/index.html', preview: 'games/Astra/MiaAI-Experiences/037-migration-map/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '棱镜工作室', path: 'games/Astra/MiaAI-Experiences/038-prism-studio/index.html', preview: 'games/Astra/MiaAI-Experiences/038-prism-studio/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '沙之记忆', path: 'games/Astra/MiaAI-Experiences/039-sand-memory/index.html', preview: 'games/Astra/MiaAI-Experiences/039-sand-memory/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '太阳花园', path: 'games/Astra/MiaAI-Experiences/040-solar-garden/index.html', preview: 'games/Astra/MiaAI-Experiences/040-solar-garden/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '灯笼节', path: 'games/Astra/MiaAI-Experiences/041-lantern-festival/index.html', preview: 'games/Astra/MiaAI-Experiences/041-lantern-festival/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '纸张博物馆', path: 'games/Astra/MiaAI-Experiences/042-paper-museum/index.html', preview: 'games/Astra/MiaAI-Experiences/042-paper-museum/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '日晷庭院', path: 'games/Astra/MiaAI-Experiences/043-sundial-courtyard/index.html', preview: 'games/Astra/MiaAI-Experiences/043-sundial-courtyard/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '思维网络', path: 'games/Astra/MiaAI-Experiences/044-thought-network/index.html', preview: 'games/Astra/MiaAI-Experiences/044-thought-network/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '种子图书馆', path: 'games/Astra/MiaAI-Experiences/045-seed-library/index.html', preview: 'games/Astra/MiaAI-Experiences/045-seed-library/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '风之礼拜堂', path: 'games/Astra/MiaAI-Experiences/046-wind-chapel/index.html', preview: 'games/Astra/MiaAI-Experiences/046-wind-chapel/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '冰芯档案', path: 'games/Astra/MiaAI-Experiences/047-ice-core-archive/index.html', preview: 'games/Astra/MiaAI-Experiences/047-ice-core-archive/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '梦境索引', path: 'games/Astra/MiaAI-Experiences/048-dream-index/index.html', preview: 'games/Astra/MiaAI-Experiences/048-dream-index/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '墨水扩散', path: 'games/Astra/MiaAI-Experiences/049-ink-diffusion/index.html', preview: 'games/Astra/MiaAI-Experiences/049-ink-diffusion/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '星辰导航', path: 'games/Astra/MiaAI-Experiences/050-star-navigation/index.html', preview: 'games/Astra/MiaAI-Experiences/050-star-navigation/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '茶道', path: 'games/Astra/MiaAI-Experiences/051-tea-ceremony/index.html', preview: 'games/Astra/MiaAI-Experiences/051-tea-ceremony/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '液压平衡', path: 'games/Astra/MiaAI-Experiences/052-hydraulic-balance/index.html', preview: 'games/Astra/MiaAI-Experiences/052-hydraulic-balance/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '字体标本', path: 'games/Astra/MiaAI-Experiences/053-type-specimen/index.html', preview: 'games/Astra/MiaAI-Experiences/053-type-specimen/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '月球规划器', path: 'games/Astra/MiaAI-Experiences/054-lunar-planner/index.html', preview: 'games/Astra/MiaAI-Experiences/054-lunar-planner/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '色彩混合器', path: 'games/Astra/MiaAI-Experiences/055-chromatic-mixer/index.html', preview: 'games/Astra/MiaAI-Experiences/055-chromatic-mixer/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '午夜电台', path: 'games/Astra/MiaAI-Experiences/056-midnight-radio/index.html', preview: 'games/Astra/MiaAI-Experiences/056-midnight-radio/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '禅石', path: 'games/Astra/MiaAI-Experiences/057-zen-stones/index.html', preview: 'games/Astra/MiaAI-Experiences/057-zen-stones/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '档案金库', path: 'games/Astra/MiaAI-Experiences/058-archive-vault/index.html', preview: 'games/Astra/MiaAI-Experiences/058-archive-vault/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '冲刺时钟', path: 'games/Astra/MiaAI-Experiences/059-sprint-clock/index.html', preview: 'games/Astra/MiaAI-Experiences/059-sprint-clock/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '意面餐桌', path: 'games/Astra/MiaAI-Experiences/060-pasta-table/index.html', preview: 'games/Astra/MiaAI-Experiences/060-pasta-table/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '地铁地图', path: 'games/Astra/MiaAI-Experiences/061-metro-map/index.html', preview: 'games/Astra/MiaAI-Experiences/061-metro-map/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '星图', path: 'games/Astra/MiaAI-Experiences/062-star-atlas/index.html', preview: 'games/Astra/MiaAI-Experiences/062-star-atlas/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '声音形状', path: 'games/Astra/MiaAI-Experiences/063-sound-shapes/index.html', preview: 'games/Astra/MiaAI-Experiences/063-sound-shapes/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '第四维度', path: 'games/Astra/MiaAI-Experiences/064-fourth-dimension/index.html', preview: 'games/Astra/MiaAI-Experiences/064-fourth-dimension/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '绽放实验室', path: 'games/Astra/MiaAI-Experiences/065-bloom-lab/index.html', preview: 'games/Astra/MiaAI-Experiences/065-bloom-lab/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '骑士巡游', path: 'games/Astra/MiaAI-Experiences/066-knights-tour/index.html', preview: 'games/Astra/MiaAI-Experiences/066-knights-tour/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '冰川研究', path: 'games/Astra/MiaAI-Experiences/067-glacier-study/index.html', preview: 'games/Astra/MiaAI-Experiences/067-glacier-study/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '田野笔记', path: 'games/Astra/MiaAI-Experiences/068-field-notes/index.html', preview: 'games/Astra/MiaAI-Experiences/068-field-notes/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '夜车票', path: 'games/Astra/MiaAI-Experiences/069-night-ticket/index.html', preview: 'games/Astra/MiaAI-Experiences/069-night-ticket/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '动力平衡', path: 'games/Astra/MiaAI-Experiences/070-kinetic-balance/index.html', preview: 'games/Astra/MiaAI-Experiences/070-kinetic-balance/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '专注房间', path: 'games/Astra/MiaAI-Experiences/071-focus-room/index.html', preview: 'games/Astra/MiaAI-Experiences/071-focus-room/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '像素拼布', path: 'games/Astra/MiaAI-Experiences/072-pixel-quilt/index.html', preview: 'games/Astra/MiaAI-Experiences/072-pixel-quilt/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '酒窖笔记', path: 'games/Astra/MiaAI-Experiences/073-cellar-notes/index.html', preview: 'games/Astra/MiaAI-Experiences/073-cellar-notes/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '轨道预算', path: 'games/Astra/MiaAI-Experiences/074-orbit-budget/index.html', preview: 'games/Astra/MiaAI-Experiences/074-orbit-budget/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '云作曲家', path: 'games/Astra/MiaAI-Experiences/075-cloud-composer/index.html', preview: 'games/Astra/MiaAI-Experiences/075-cloud-composer/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '工作室平面图', path: 'games/Astra/MiaAI-Experiences/076-atelier-plan/index.html', preview: 'games/Astra/MiaAI-Experiences/076-atelier-plan/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '金缮修复', path: 'games/Astra/MiaAI-Experiences/077-golden-repair/index.html', preview: 'games/Astra/MiaAI-Experiences/077-golden-repair/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '午夜影院', path: 'games/Astra/MiaAI-Experiences/078-midnight-cinema/index.html', preview: 'games/Astra/MiaAI-Experiences/078-midnight-cinema/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '岛屿图谱', path: 'games/Astra/MiaAI-Experiences/079-island-atlas/index.html', preview: 'games/Astra/MiaAI-Experiences/079-island-atlas/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '时间物件', path: 'games/Astra/MiaAI-Experiences/080-hour-object/index.html', preview: 'games/Astra/MiaAI-Experiences/080-hour-object/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '色彩礼拜堂', path: 'games/Astra/MiaAI-Experiences/081-chromatic-chapel/index.html', preview: 'games/Astra/MiaAI-Experiences/081-chromatic-chapel/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '黏土形态', path: 'games/Astra/MiaAI-Experiences/082-clay-form/index.html', preview: 'games/Astra/MiaAI-Experiences/082-clay-form/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '字母铸造厂', path: 'games/Astra/MiaAI-Experiences/083-letter-foundry/index.html', preview: 'games/Astra/MiaAI-Experiences/083-letter-foundry/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '环形世界', path: 'games/Astra/MiaAI-Experiences/084-ring-world/index.html', preview: 'games/Astra/MiaAI-Experiences/084-ring-world/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '夜行列车', path: 'games/Astra/MiaAI-Experiences/085-night-train/index.html', preview: 'games/Astra/MiaAI-Experiences/085-night-train/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '编织记忆', path: 'games/Astra/MiaAI-Experiences/086-woven-memory/index.html', preview: 'games/Astra/MiaAI-Experiences/086-woven-memory/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '大理石房间', path: 'games/Astra/MiaAI-Experiences/087-marble-room/index.html', preview: 'games/Astra/MiaAI-Experiences/087-marble-room/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '焚香时刻', path: 'games/Astra/MiaAI-Experiences/088-incense-hour/index.html', preview: 'games/Astra/MiaAI-Experiences/088-incense-hour/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '黑胶之夜', path: 'games/Astra/MiaAI-Experiences/089-vinyl-evening/index.html', preview: 'games/Astra/MiaAI-Experiences/089-vinyl-evening/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '玻璃温室', path: 'games/Astra/MiaAI-Experiences/090-glasshouse/index.html', preview: 'games/Astra/MiaAI-Experiences/090-glasshouse/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '水墨山水', path: 'games/Astra/MiaAI-Experiences/091-ink-mountains/index.html', preview: 'games/Astra/MiaAI-Experiences/091-ink-mountains/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '航空邮件', path: 'games/Astra/MiaAI-Experiences/092-aerogram/index.html', preview: 'games/Astra/MiaAI-Experiences/092-aerogram/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '093 Cellar Notes', path: 'games/Astra/MiaAI-Experiences/093-cellar-notes/index.html', preview: 'games/Astra/MiaAI-Experiences/093-cellar-notes/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '缎带排练', path: 'games/Astra/MiaAI-Experiences/094-ribbon-rehearsal/index.html', preview: 'games/Astra/MiaAI-Experiences/094-ribbon-rehearsal/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '光之时辰', path: 'games/Astra/MiaAI-Experiences/095-light-hour/index.html', preview: 'games/Astra/MiaAI-Experiences/095-light-hour/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '磁性物质', path: 'games/Astra/MiaAI-Experiences/096-magnetic-matter/index.html', preview: 'games/Astra/MiaAI-Experiences/096-magnetic-matter/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '小小神谕', path: 'games/Astra/MiaAI-Experiences/097-small-oracle/index.html', preview: 'games/Astra/MiaAI-Experiences/097-small-oracle/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '泳池边俱乐部', path: 'games/Astra/MiaAI-Experiences/098-poolside-club/index.html', preview: 'games/Astra/MiaAI-Experiences/098-poolside-club/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '旁注', path: 'games/Astra/MiaAI-Experiences/099-marginalia/index.html', preview: 'games/Astra/MiaAI-Experiences/099-marginalia/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
    { name: '有机波实验室', path: 'games/Astra/MiaAI-Experiences/100-organic-wave-lab/index.html', preview: 'games/Astra/MiaAI-Experiences/100-organic-wave-lab/preview.jpg', icon: 'fas fa-palette', desc: 'AI生成交互体验' },
];

let currentCategory = 'all';
let allGames = [];
let i18nInitialized = false;
// 分页加载
const PAGE_SIZE = 24;
let currentPage = 1;
let filteredGames = [];
let isLoading = false;

// 玩法标签云：关键词必须能在真实 desc/name 文本中命中，点击标签即按该关键词搜索
const TAG_KEYWORDS = [
    { label: 'AI 生成', kw: '生成' },
    { label: '体验', kw: '体验' },
    { label: '经典', kw: '经典' },
    { label: '棋', kw: '棋' },
    { label: '解谜', kw: '解谜' },
    { label: '射击', kw: '射击' },
    { label: '冒险', kw: '冒险' },
    { label: '猜', kw: '猜' },
    { label: '记忆', kw: '记忆' },
    { label: '球', kw: '球' },
    { label: '打字', kw: '打字' },
    { label: '牌', kw: '牌' },
    { label: '挑战', kw: '挑战' },
    { label: '物理', kw: '物理' },
    { label: '迷宫', kw: '迷宫' },
    { label: '策略', kw: '策略' },
    { label: '反应', kw: '反应' },
    { label: '数字', kw: '数字' },
    { label: '速度', kw: '速度' },
    { label: '拼图', kw: '拼图' }
];

// 分类英文名（用于卡片英文副标题，均为真实分类映射）
const CATEGORY_EN = {
    'Puzzle': 'Puzzle',
    'Action': 'Action',
    'Arcade': 'Arcade',
    'Board': 'Board',
    'Memory': 'Memory',
    'Typing': 'Typing',
    'Casual': 'Casual',
    'GenArt': 'Generative Art',
    'Adventure': 'Adventure'
};

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

    renderTagCloud();
    fillCounts();
    renderGames();
    renderGenArtSection();
    renderHotGames();
    bindEvents();
    setupNavigation();
    setupBackToTop();
    setupMobileMenu();
    setupScrollReveal();
    setupNavbarScroll();
    setupInteractions();
    initHeroCanvas();
    
    console.log('%c🎮 WebGameHub v2.1', 'font-size: 20px; font-weight: bold; color: #7C6CFF;');
    console.log(`%c${window.i18n?.t('hero.stat_games') || 'Total games'}: ${allGames.length}`, 'color: #ea580c;');
}

// 用运行时 gamesData 统计结果填充页面所有计数（hero/统计/筛选/标语/footer）
function fillCounts() {
    const byCat = {};
    for (const category in gamesData) {
        byCat[category] = (gamesData[category] || []).filter(Boolean).length;
    }
    const total = allGames.length;
    const categoriesWithGames = Object.keys(gamesData).filter(c => byCat[c] > 0).length;

    document.querySelectorAll('[data-count]').forEach(el => {
        const key = el.getAttribute('data-count');
        let value = null;
        if (key === 'total') value = total;
        else if (key === 'categories') value = categoriesWithGames;
        else if (key === 'cat:all') value = total;
        else if (key.indexOf('cat:') === 0) value = byCat[key.slice(4)] || 0;
        else if (key === 'genart') value = genArtExperiences.filter(Boolean).length;
        if (value !== null) el.textContent = value;
    });
}

// 标签云：marquee 无缝滚动带（46s，双份列表）；玩法标签按真实命中数渲染，技术标签只声明全站成立的能力
const TECH_TAGS = [
    { icon: 'fab fa-html5', key: 'tags.tech_html5', label: 'HTML5' },
    { icon: 'fas fa-code', key: 'tags.tech_js', label: '原生 JavaScript' },
    { icon: 'fas fa-bolt', key: 'tags.tech_play', label: '即开即玩' }
];

function renderTagCloud() {
    const track = document.getElementById('tagCloud');
    if (!track) return;

    const counts = {};
    for (const t of TAG_KEYWORDS) {
        let n = 0;
        for (const g of allGames) {
            const text = (g.desc || '') + (g.name || '');
            if (text.indexOf(t.kw) !== -1) n++;
        }
        counts[t.kw] = n;
    }

    const sorted = TAG_KEYWORDS.slice().sort((a, b) => counts[b.kw] - counts[a.kw]);

    const buildList = (target) => {
        target.innerHTML = '';
        sorted.forEach(t => {
            const li = document.createElement('li');
            li.innerHTML = `<button type="button" class="tag-chip" data-kw="${t.kw}"><span class="tag-label">${t.label}</span><span class="tag-count">${counts[t.kw]}</span></button><span class="tag-dot" aria-hidden="true">·</span>`;
            target.appendChild(li);
        });
        TECH_TAGS.forEach(t => {
            const li = document.createElement('li');
            const label = window.i18n?.t(t.key) || t.label;
            li.innerHTML = `<span class="tag-chip tech-tag"><i class="${t.icon}"></i>${label}</span><span class="tag-dot" aria-hidden="true">·</span>`;
            target.appendChild(li);
        });
    };

    const list1 = document.createElement('ul');
    list1.className = 'marquee-list';
    buildList(list1);
    const list2 = list1.cloneNode(true);
    list2.setAttribute('aria-hidden', 'true');

    track.innerHTML = '';
    track.appendChild(list1);
    track.appendChild(list2);

    // 点击任一玩法标签（含克隆份）→ 同步三输入框 + 按关键词搜索 + 滚动到目录
    track.querySelectorAll('.tag-chip[data-kw]').forEach(chip => {
        chip.addEventListener('click', () => {
            const kw = chip.dataset.kw;
            const inputs = ['searchInput', 'directorySearchInput', 'mobileSearchInput'];
            inputs.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = kw;
            });
            renderGames(currentCategory, kw);
            const dir = document.getElementById('directory');
            if (dir) dir.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function renderHotGames() {
    const hotGrid = document.getElementById('hotGrid');
    if (!hotGrid) return;

    // 取标记为hot的游戏，最多12个
    const hotGames = allGames.filter(g => g.hot).slice(0, 12);
    hotGrid.innerHTML = '';

    hotGames.forEach((game, index) => {
        const card = createGameCard(game, index);
        hotGrid.appendChild(card);
    });
}

function renderGames(category = 'all', searchTerm = '') {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    currentPage = 1;

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

    filteredGames = gamesToShow;

    if (gamesToShow.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-state';
        emptyDiv.innerHTML = `
            <div class="empty-state-icon"><i class="fas fa-search"></i></div>
            <h3 class="empty-state-title">${window.i18n?.t('games.no_results') || '未找到游戏'}</h3>
            <p class="empty-state-text">${window.i18n?.t('games.try_other') || '试试其他关键词或分类'}</p>
        `;
        gamesGrid.appendChild(emptyDiv);
        return;
    }

    // 只渲染第一页
    const firstPage = gamesToShow.slice(0, PAGE_SIZE);
    firstPage.forEach((game, index) => {
        const gameCard = createGameCard(game, index);
        gamesGrid.appendChild(gameCard);
    });

    // 如果还有更多，添加加载更多按钮
    if (gamesToShow.length > PAGE_SIZE) {
        addLoadMoreButton(gamesGrid);
    }
}

function addLoadMoreButton(container) {
    // 移除旧的加载更多按钮
    const oldBtn = document.getElementById('loadMoreBtn');
    if (oldBtn) oldBtn.remove();

    const remaining = filteredGames.length - currentPage * PAGE_SIZE;
    if (remaining <= 0) return;

    const label = window.i18n?.t('games.load_more') || '加载更多';
    const btn = document.createElement('button');
    btn.id = 'loadMoreBtn';
    btn.className = 'load-more-btn';
    btn.innerHTML = `<i class="fas fa-plus"></i> ${label} (${remaining})`;
    btn.onclick = loadMoreGames;
    container.appendChild(btn);
}

function loadMoreGames() {
    if (isLoading) return;
    isLoading = true;

    const gamesGrid = document.getElementById('gamesGrid');
    const btn = document.getElementById('loadMoreBtn');
    const loadingLabel = window.i18n?.t('games.loading') || '加载中...';
    if (btn) {
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingLabel}`;
        btn.disabled = true;
    }

    // 模拟轻微延迟，避免卡顿
    setTimeout(() => {
        currentPage++;
        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const nextPage = filteredGames.slice(start, end);

        nextPage.forEach((game, index) => {
            const gameCard = createGameCard(game, start + index);
            gamesGrid.insertBefore(gameCard, btn);
        });

        const remaining = filteredGames.length - currentPage * PAGE_SIZE;
        if (remaining > 0) {
            const label = window.i18n?.t('games.load_more') || '加载更多';
            btn.innerHTML = `<i class="fas fa-plus"></i> ${label} (${remaining})`;
            btn.disabled = false;
        } else {
            btn.remove();
        }

        isLoading = false;
    }, 100);
}

function createGameCard(game, index) {
    const card = document.createElement('a');
    card.className = 'game-card';
    card.href = game.path;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.dataset.category = game.category;
    // 网格入场阶梯延迟：55ms × min(索引,9)，封顶 9
    card.style.animationDelay = `${55 * Math.min(index, 9)}ms`;

    const localizedName = window.i18n?.t(`games.${game.name}`) || game.name;
    const localizedDesc = window.i18n?.t(`games.${game.name}_desc`) || game.desc;
    const localizedCategory = getCategoryName(game.category);
    const subtitle = getEnSubtitle(game, localizedName, localizedCategory);

    // 标签：AI生成、热门、新品
    const tags = [];
    if (game.category === 'GenArt') {
        tags.push('<span class="game-tag tag-ai">AI</span>');
    }
    if (game.hot) {
        tags.push('<span class="game-tag tag-hot">🔥 热门</span>');
    }
    if (game.isNew) {
        tags.push('<span class="game-tag tag-new">NEW</span>');
    }

    const playLabel = window.i18n?.t('games.play') || '开始试玩';

    // 封面：有 preview 用图；无 preview 用「游戏名哈希取色 + 首字母缩写」兜底
    let coverInner;
    if (game.preview) {
        coverInner = `<img src="${game.preview}" alt="${localizedName}" loading="lazy" class="card-img">`;
    } else {
        const hue = hashHue(game.name);
        const initials = (localizedName || game.name).slice(0, 2).toUpperCase();
        coverInner = `<div class="cover-fallback" style="background:linear-gradient(135deg,hsl(${hue},45%,20%),hsl(${hue + 40},45%,10%))"><span class="grid-veil"></span><span class="initials">${initials}</span></div>`;
    }

    card.innerHTML = `
        <div class="card-cover">
            <div class="cover-bg">${coverInner}</div>
            <span class="card-cat">${localizedCategory}</span>
            ${tags.length ? `<div class="card-tags">${tags.join('')}</div>` : ''}
            <div class="cover-shade"></div>
            <div class="cover-meta">
                <h3 class="game-name">${localizedName}</h3>
                <p class="game-sub">${subtitle}</p>
            </div>
            <span class="play-btn"><i class="fas fa-play"></i> ${playLabel}</span>
        </div>
        <div class="card-body">
            <p class="game-desc">${localizedDesc}</p>
        </div>
    `;

    return card;
}

// 由游戏名生成确定性的封面兜底色相（不虚构数据，仅视觉 fallback）
function hashHue(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
    return h;
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
        'GenArt': 'games.filter.genart'
    };
    const key = i18nKeys[category];
    if (!key) return category;
    return window.i18n?.t(key) || category;
}

// 卡片英文副标题：优先取 i18n en 翻译；无翻译且原名本身是英文则用原名；
// 否则退化为分类英文名。全部来自既有数据，不虚构作者或玩法描述。
function getEnSubtitle(game, localizedName, localizedCategory) {
    let enName = null;
    if (window.i18n && typeof window.i18n.tLang === 'function') {
        enName = window.i18n.tLang('en', `games.${game.name}`, null);
    }
    if (!enName && /^[\x20-\x7E]+$/.test(game.name)) {
        enName = game.name;
    }
    const enCategory = CATEGORY_EN[game.category] || localizedCategory;
    if (!enName) return enCategory;
    if (enName === localizedName) {
        return `${enName} · ${enCategory}`;
    }
    return enName;
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

    // 三个搜索输入框（导航栏 / 目录区 / 移动端抽屉）共享同一套搜索逻辑，输入时互相同步
    const searchInputs = ['searchInput', 'directorySearchInput', 'mobileSearchInput']
        .map(id => document.getElementById(id))
        .filter(el => !!el);

    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            searchInputs.forEach(other => {
                if (other !== input) other.value = value;
            });
            renderGames(currentCategory, value);
        });
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

// 光标交互：hero 鼠标光斑 + 卡片 3D 倾角与光斑（事件委托，重渲染后依然生效）
function setupInteractions() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('pointermove', (e) => {
            const r = hero.getBoundingClientRect();
            hero.style.setProperty('--spot-x', `${((e.clientX - r.left) / r.width) * 100}%`);
            hero.style.setProperty('--spot-y', `${((e.clientY - r.top) / r.height) * 100}%`);
        });
    }

    if (!window.matchMedia('(hover: hover)').matches) return; // 触屏不做 3D 倾角

    const grid = document.getElementById('gamesGrid');
    if (!grid) return;
    grid.addEventListener('pointermove', (e) => {
        const card = e.target.closest('.game-card');
        if (!card) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--tilt-x', `${(0.5 - py) * 7}deg`);
        card.style.setProperty('--tilt-y', `${(px - 0.5) * 9}deg`);
        card.style.setProperty('--spot-x', `${px * 100}%`);
        card.style.setProperty('--spot-y', `${py * 100}%`);
    });
    grid.addEventListener('pointerleave', () => {
        grid.querySelectorAll('.game-card').forEach(card => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
        });
    });
}

// Hero 粒子层：轻量星点漂移，尊重 prefers-reduced-motion
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let particles = [];
    const COUNT = 56;

    function seed() {
        particles = Array.from({ length: COUNT }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.6 + 0.4,
            vy: -(Math.random() * 0.25 + 0.06),
            vx: (Math.random() - 0.5) * 0.08,
            a: Math.random() * 0.5 + 0.12,
            violet: Math.random() > 0.7
        }));
    }

    function resize() {
        const parent = canvas.parentElement;
        const rect = parent.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        canvas.width = Math.max(1, Math.round(w * DPR));
        canvas.height = Math.max(1, Math.round(h * DPR));
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        seed();
    }

    function tick() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
            if (p.x < -4) p.x = w + 4;
            else if (p.x > w + 4) p.x = -4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.violet ? `rgba(139,92,246,${p.a})` : `rgba(246,243,240,${p.a})`;
            ctx.fill();
        }
        raf = requestAnimationFrame(tick);
    }

    let raf = null;
    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);
}

document.addEventListener('i18n:languageChanged', () => {
    renderGames(currentCategory, document.getElementById('searchInput').value);
    renderGenArtSection(); // 底部生成艺术区块跟随语言重渲染
    renderTagCloud(); // 技术标签（HTML5/原生 JavaScript/即开即玩）跟随语言重渲染；玩法标签为中文关键词，不翻译
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


// 底部「生成艺术体验」独立展示区：101 款 AI 生成交互体验，不参与玩法分类筛选与计数
let genArtCurrentPage = 1;
const GEN_ART_PAGE_SIZE = 24;
let genArtLoading = false;

function renderGenArtSection() {
    const grid = document.getElementById('genartGrid');
    if (!grid) return;

    genArtCurrentPage = 1;
    grid.innerHTML = '';

    const firstPage = genArtExperiences.filter(Boolean).slice(0, GEN_ART_PAGE_SIZE);
    firstPage.forEach((game, index) => {
        const card = createGameCard({ ...game, category: 'GenArt' }, index);
        grid.appendChild(card);
    });

    if (genArtExperiences.filter(Boolean).length > GEN_ART_PAGE_SIZE) {
        addGenArtLoadMoreButton(grid);
    }
}

function addGenArtLoadMoreButton(container) {
    const oldBtn = document.getElementById('genArtLoadMoreBtn');
    if (oldBtn) oldBtn.remove();

    const remaining = genArtExperiences.filter(Boolean).length - genArtCurrentPage * GEN_ART_PAGE_SIZE;
    if (remaining <= 0) return;

    const label = window.i18n?.t('games.load_more') || '加载更多';
    const btn = document.createElement('button');
    btn.id = 'genArtLoadMoreBtn';
    btn.className = 'load-more-btn';
    btn.innerHTML = `<i class="fas fa-plus"></i> ${label} (${remaining})`;
    btn.onclick = loadMoreGenArt;
    container.appendChild(btn);
}

function loadMoreGenArt() {
    if (genArtLoading) return;
    genArtLoading = true;

    const grid = document.getElementById('genartGrid');
    const btn = document.getElementById('genArtLoadMoreBtn');
    const loadingLabel = window.i18n?.t('games.loading') || '加载中...';
    if (btn) {
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingLabel}`;
        btn.disabled = true;
    }

    // 与主目录一致：轻微延迟避免卡顿
    setTimeout(() => {
        genArtCurrentPage++;
        const start = (genArtCurrentPage - 1) * GEN_ART_PAGE_SIZE;
        const end = start + GEN_ART_PAGE_SIZE;
        const nextPage = genArtExperiences.filter(Boolean).slice(start, end);

        nextPage.forEach((game, index) => {
            const card = createGameCard({ ...game, category: 'GenArt' }, start + index);
            grid.insertBefore(card, btn);
        });

        const remaining = genArtExperiences.filter(Boolean).length - genArtCurrentPage * GEN_ART_PAGE_SIZE;
        if (remaining > 0) {
            const label = window.i18n?.t('games.load_more') || '加载更多';
            btn.innerHTML = `<i class="fas fa-plus"></i> ${label} (${remaining})`;
            btn.disabled = false;
        } else {
            btn.remove();
        }

        genArtLoading = false;
    }, 100);
}