const gamesData ={
    Puzzle: [
        { name: 'Vesper', added: '2026-10-10', path: 'games/Puzzle/vesper/index.html', preview: 'games/Puzzle/vesper/preview.webp', icon: '🎮', desc: '第三人称解谜冒险：探索淹没的花园与天体机械，把光作为生命、弹药和货币来管理，修复三道封印。' },
        { name: 'Mystery Town', added: '2026-10-10', path: 'games/Puzzle/mystery-town/index.html', preview: 'games/Puzzle/mystery-town/preview.webp', icon: '🎮', desc: '观察微缩 3D 世界，检查并操作物体，通过正确的因果顺序破解环境谜题。' },
        { name: '弹消消乐', added: '2026-10-10', path: 'games/Puzzle/qbxxl/index.html', preview: 'games/Puzzle/qbxxl/preview.webp', icon: '🎮', desc: '点击消除至少三颗相连的同色泡泡，大组生成爆弹和彩虹，提供解压、闯关和限时模式。' },
        { name: 'Bonkshot', added: '2026-10-10', path: 'games/Puzzle/bonkshot/index.html', preview: 'games/Puzzle/bonkshot/preview.webp', icon: '🎮', desc: '拖动弹弓发射小角色，击中木制支撑，让结构倒塌并清除目标。' },
        { name: 'Greenhouse Escape Room', added: '2026-10-10', path: 'games/Puzzle/greenhouse-escape-room/index.html', preview: 'games/Puzzle/greenhouse-escape-room/preview.webp', icon: '🎮', desc: '探索被风暴封闭的温室，通过修复铜水管、摆放植物与反射光线等谜题，救出最后一颗种子。' },
        { name: '无限庭院 ·', added: '2026-10-10', path: 'games/Puzzle/infinite-garden/index.html', preview: 'games/Puzzle/infinite-garden/preview.webp', icon: '🎮', desc: '探索 48 座可改变重力的庭院，把彩色果实送到对应底座、唤醒回路，在没有边界的建筑空间中解谜。' },
        { name: 'Lantern Cove', added: '2026-10-10', path: 'games/Puzzle/lantern-cove/index.html', preview: 'games/Puzzle/lantern-cove/preview.webp', icon: '🎮', desc: '带领 Mara 探索手绘港口，与守卫对话，结合线索和物品寻找灯塔遗失的透镜。' },
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
        { name: '单词搜索', path: 'games/Puzzle/Word-Search/index.html', preview: 'games/Puzzle/Word-Search/preview.webp', icon: 'fas fa-search', desc: 'AI生成·找单词游戏' },
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
        { name: 'CityMaker', path: 'games/Puzzle/CityMaker/index.html', preview: 'games/Puzzle/CityMaker/preview.webp', icon: 'fas fa-gamepad', desc: '在 4×4 街区上玩 2048：合并相同建筑，沿十一级建筑阶梯从传统民居成长为城市天际线。', author: 'Derek Wang', source: 'astragames 收录（开源）', github: 'https://github.com/derek-wangpch/OpenCityMaker' },
        { name: 'Sunjing Puzzles', path: 'games/Puzzle/Sunjing-Puzzles/index.html', preview: 'games/Puzzle/Sunjing-Puzzles/preview.webp', icon: 'fas fa-gamepad', desc: '在 3D 木作展台拆解六构件互锁木锁，挑战两种华容道布局，支持提示与移动撤销。', author: 'MartinDelophy', source: 'astragames 收录（开源）', github: 'https://github.com/MartinDelophy/awesome-gpt-6-astra' },
        { name: 'The Fourth Knock', path: 'games/Puzzle/The-Fourth-Knock/index.html', preview: 'games/Puzzle/The-Fourth-Knock/preview.webp', icon: 'fas fa-gamepad', desc: '探索 Cedar House、与陌生人交谈，在短篇 2.5D 侦探冒险中拼出密室凶案的真相。', author: 'Nikhil Desai', source: 'astragames 收录（开源）', github: 'https://github.com/nikhilsatishdesai/the-fourth-knock' }
    ],
    Action: [
        { name: 'Miami Flap', added: '2026-10-10', path: 'games/Action/miami-flap/index.html', preview: 'games/Action/miami-flap/preview.webp', icon: '🐦', desc: '点击振翅穿越霓虹水管，收集星星并连续精准过管获得奖励；经典与混乱模式还加入护盾、磁铁和可解锁外观。' },
        { name: 'HOLLOWMARK', added: '2026-10-10', path: 'games/Action/hollowmark/index.html', preview: 'games/Action/hollowmark/preview.webp', icon: '🎮', desc: '第一人称探索工业地下世界，寻找门禁卡、管理弹药，在战役中与敌人交战。' },
        { name: 'Canyon Overdrive', added: '2026-10-10', path: 'games/Action/canyon-overdrive/index.html', preview: 'games/Action/canyon-overdrive/preview.webp', icon: '🎮', desc: '驾驶战机穿越霓虹峡谷，躲避火力，用机炮、导弹和滚转突破封锁。' },
        { name: 'Flight 1073', added: '2026-10-10', path: 'games/Action/flight-1073/index.html', preview: 'games/Action/flight-1073/preview.webp', icon: '✈️', desc: '希伯来语航空恶搞小游戏：躲避餐车、完成限时任务，并设法让飞机降落。' },
        { name: 'FOE TO FLEET', added: '2026-10-10', path: 'games/Action/foe-to-fleet/index.html', preview: 'games/Action/foe-to-fleet/preview.webp', icon: '🎮', desc: '将击败的敌人编入舰队，让伙伴同时充当武器和护盾，在短篇弹幕射击中撑过七波进攻。' },
        { name: 'MoxRide', added: '2026-10-10', path: 'games/Action/moxride/index.html', preview: 'games/Action/moxride/preview.webp', icon: '🎮', desc: '在彩色城市中高速下坡滑板，磨轨、腾空做动作，并串联技巧累积连招得分。' },
        { name: '中途岛海战·空中突击', added: '2026-10-10', path: 'games/Action/midway-1942/index.html', preview: 'games/Action/midway-1942/preview.webp', icon: '🐟', desc: '与僚机迎击拦截机、突破防空并俯冲轰炸两艘航母；借助预计落点掌握重力投弹时机，返回友舰附近补给后再次出击。' },
        { name: 'JellyBlob', added: '2026-10-10', path: 'games/Action/jellyblob/index.html', preview: 'games/Action/jellyblob/preview.webp', icon: '🎮', desc: '多人果冻竞技场：收集水滴、用连续尾迹围堵对手并跳跃避险，小体型玩家也能通过走位击败大体型对手。' },
        { name: 'Stadium Elite', added: '2026-10-10', path: 'games/Action/stadium-elite/index.html', preview: 'games/Action/stadium-elite/preview.webp', icon: '🎮', desc: '在 3D 球场进行巴塞罗那对皇家马德里的 11 人制比赛，传球、射门并切换球员。' },
        { name: 'Magic Carpet Wizard', added: '2026-10-10', path: 'games/Action/magic-carpet/index.html', preview: 'games/Action/magic-carpet/preview.webp', icon: '🎮', desc: '驾驶魔毯探索球形世界，穿环、施法，并挑战敌人与 Boss。' },
        { name: '钢铁防线', added: '2026-10-10', path: 'games/Action/iron-bastion/index.html', preview: 'games/Action/iron-bastion/preview.webp', icon: '🎮', desc: '在六片战区驾驶 3D 坦克，抵御敌军波次并守护信标；可破坏砖墙，并使用战术冲刺与电磁脉冲。' },
        { name: 'Stick Fighter', added: '2026-10-10', path: 'games/Action/stick-fighter/index.html', preview: 'games/Action/stick-fighter/preview.webp', icon: '🎮', desc: '仍在开发中的火柴人格斗游戏，包含拳脚连招、上勾拳、飞镖和格挡；提供电脑陪练及在线、好友模式入口。' },
        { name: 'Gogh Strike', added: '2026-10-10', path: 'games/Action/gogh-strike/index.html', preview: 'games/Action/gogh-strike/preview.webp', icon: '🎮', desc: '梵高画作风格的第一人称颜料对战，包含六位艺术家、专属武器及率先获得 20 分的赛制。' },
        { name: 'Cinderfall', added: '2026-10-10', path: 'games/Action/cinderfall/index.html', preview: 'games/Action/cinderfall/preview.webp', icon: '🎮', desc: '四位英雄的奇幻对决竞技场，包含六项职业技能和单人 AI 对战，也提供在线房间。' },
        { name: 'Oz Breakdance', added: '2026-10-10', path: 'games/Action/breakdance/index.html', preview: 'games/Action/breakdance/preview.webp', icon: '🎮', desc: '拖动布娃娃舞者的手脚和头部命中对应目标，获得分数并延长霹雳舞回合时间。' },
        { name: 'Astral War', added: '2026-10-10', path: 'games/Action/astral-war/index.html', preview: 'games/Action/astral-war/preview.webp', icon: '🎮', desc: '二战题材浏览器 FPS，可选择士兵或僵尸外观、调整武器配置，并提供机器人训练与大厅模式。' },
        { name: 'FLOP CLUB', added: '2026-10-10', path: 'games/Action/flop-club/index.html', preview: 'games/Action/flop-club/preview.webp', icon: '🎮', desc: '从三种高度的跳台起跳，完成翻转和转体，对准漂浮圆环入水，挑战更高评分。' },
        { name: 'Vector Dive', added: '2026-10-10', path: 'games/Action/vector-dive/index.html', preview: 'games/Action/vector-dive/preview.webp', icon: '🎮', desc: '驾驶飞行器穿越逐圈加速的霓虹线框赛道，利用加速与相位移动坚持更久。' },
        { name: 'Harbor Skirmish', added: '2026-10-10', path: 'games/Action/harbor-skirmish/index.html', preview: 'games/Action/harbor-skirmish/preview.webp', icon: '🎮', desc: '在海边小镇抵御一波波兔子入侵，切换三种武器，利用屋顶路线、冲刺与钩索周旋。' },
        { name: '地下拳场', added: '2026-10-10', path: 'games/Action/underground-boxing/index.html', preview: 'games/Action/underground-boxing/preview.webp', icon: '🎮', desc: '在地下 3D 拳台进行三回合限时对决，平衡出拳、格挡、闪避与体力消耗。' },
        { name: '街头小子 ·', added: '2026-10-10', path: 'games/Action/urban-champion-3d/index.html', preview: 'games/Action/urban-champion-3d/preview.webp', icon: '🎮', desc: '在日落街区交替使用高低拳与格挡，将对手逼入井口，同时留意从楼上掉落的花盆。' },
        { name: '零点街区 · 弹壳特攻队', added: '2026-10-10', path: 'games/Action/zero-district-shells-3d/index.html', preview: 'games/Action/zero-district-shells-3d/preview.webp', icon: '🎮', desc: '在城市围攻中坚持三分钟，以自动射击配合走位躲避敌群，拾取经验并选择升级能力。' },
        { name: 'ASCII DISTRICT', added: '2026-10-10', path: 'games/Action/ascii-district/index.html', preview: 'games/Action/ascii-district/preview.webp', icon: '🎮', desc: '在由 ASCII 字符构成的第一人称竞技场迎战病毒敌人，利用冲刺、跳跃和滑行应对连续波次。' },
        { name: 'Aura Farming', added: '2026-10-10', path: 'games/Action/aura-farming/index.html', preview: 'games/Action/aura-farming/preview.webp', icon: '🎮', desc: '让跳舞的水豚在龙舟船头保持平衡，逆着波浪调整重心，在 40 秒内完成六个动作。' },
        { name: 'CHRONO RAID', added: '2026-10-10', path: 'games/Action/chrono-raid/index.html', preview: 'games/Action/chrono-raid/preview.webp', icon: '🎮', desc: '选择 SUZUNE 的近身连击或 AOI 的远程攻击，躲避机械首领，并触发带动画演出的必杀技。' },
        { name: 'MR', added: '2026-10-10', path: 'games/Action/mr-nips/index.html', preview: 'games/Action/mr-nips/preview.webp', icon: '🎮', desc: '操控像素角色躲避无人机，自动发射双束激光，收集能量并蓄力释放清屏 Nova。' },
        { name: 'Billionaire Pit', added: '2026-10-10', path: 'games/Action/billionaire-pit/index.html', preview: 'games/Action/billionaire-pit/preview.webp', icon: '🎮', desc: '选择讽刺风格的亿万富豪角色，在三轮锦标赛中对战电脑，使用拳击、踢击、格挡与闪避。' },
        { name: '血裔决斗', added: '2026-10-10', path: 'games/Action/nightborn-clash/index.html', preview: 'games/Action/nightborn-clash/preview.webp', icon: '🎮', desc: '选择四名吸血鬼斗士之一，组合普通攻击、聚气技能和超必杀，可进入练习场或进行 99 秒人机决斗。' },
        { name: '沙漠行动', added: '2026-10-10', path: 'games/Action/dust-ii-ops/index.html', preview: 'games/Action/dust-ii-ops/preview.webp', icon: '🎮', desc: '在沙漠地图上与机器人交战，选择个人竞技、团队、爆破或生化模式，切换装备并使用可选的无敌与飞行辅助。' },
        { name: 'Thornwake', added: '2026-10-10', path: 'games/Action/thornwake/index.html', preview: 'games/Action/thornwake/preview.webp', icon: '🎮', desc: '昆虫主题的动作 Roguelite：挥动针刃作战，在盘根错节的房间中跳跃、冲刺，通过反复探索收集丝线与余烬种子。' },
        { name: 'DEAD END', added: '2026-10-10', path: 'games/Action/dead-end/index.html', preview: 'games/Action/dead-end/preview.webp', icon: '🎮', desc: '在 Oakridge 社区抵御感染者波次；3D 模式加入三个待修复中继站、照明弹和撤离目标。' },
        { name: 'Anime Rift', added: '2026-10-10', path: 'games/Action/anime-rift/index.html', preview: 'games/Action/anime-rift/preview.webp', icon: '🎮', desc: '使用 13 名动漫与原创角色，在三座竞技场中施展飞行、特殊技和击飞出界，提供单人人机练习。' },
        { name: 'VeilFall', added: '2026-10-10', path: 'games/Action/veilfall/index.html', preview: 'games/Action/veilfall/preview.webp', icon: '🎮', desc: '探索茂密的 3D 山谷，以 Crimson Dreadlord 开始三波战斗试炼；这是仍在开发的 MOBA 风格原型。' },
        { name: 'Butterball Run', added: '2026-10-10', path: 'games/Action/butterball-run/index.html', preview: 'games/Action/butterball-run/preview.webp', icon: '🎮', desc: '操控黄油球绕餐盘移动，在 60 秒内救出八只贻贝，躲避移动的芦笋并保住黄油能量。' },
        { name: 'Tideglass Hunt', added: '2026-10-10', path: 'games/Action/tideglass-hunt/index.html', preview: 'games/Action/tideglass-hunt/preview.webp', icon: '🎮', desc: '选择钢铁、风暴或冰霜能力，在海岸战斗场景中探索，搭配技能对付怪物；限时狩猎可由单人开局。' },
        { name: 'Canteen Crashers', added: '2026-10-10', path: 'games/Action/canteen-crashers/index.html', preview: 'games/Action/canteen-crashers/preview.webp', icon: '🎮', desc: '在食堂箱子中寻找三份食谱并带回厨房，利用装备与托盘滑行躲避主厨；演示版提供三名电脑队友。' },
        { name: '木実', added: '2026-10-10', path: 'games/Action/komorebi-kinomi/index.html', preview: 'games/Action/komorebi-kinomi/preview.webp', icon: '🎮', desc: '左右移动小森林精灵接住木果与闪光、避开落叶，在 60 秒内挑战 300 分采集目标。' },
        { name: 'PATCH', added: '2026-10-10', path: 'games/Action/patch/index.html', preview: 'games/Action/patch/preview.webp', icon: '🎮', desc: '操纵麻薯小人离开安全领地，画出闭环圈地，同时躲避十四名电脑对手对暴露路径的截击。' },
        { name: 'DEADBLOCK', added: '2026-10-10', path: 'games/Action/deadblock-outbreak/index.html', preview: 'games/Action/deadblock-outbreak/preview.webp', icon: '🎮', desc: '在六张地图中抵御逐步增强的丧尸波次，搜寻补给并解锁武器、路障与战地强化。' },
        { name: 'Dropzone Royale', added: '2026-10-10', path: 'games/Action/dropzone-royale/index.html', preview: 'games/Action/dropzone-royale/preview.webp', icon: '🎮', desc: '空降岛屿与 39 名电脑对手竞争，搜查建筑寻找装备，在俯视角生存竞技中躲避逐步收缩的风暴。' },
        { name: 'Mog Mode', added: '2026-10-10', path: 'games/Action/mog-mode/index.html', preview: 'games/Action/mog-mode/preview.webp', icon: '🎮', desc: '选择科技公司 CEO 的夸张角色，在五次握手中抓准时机，成功四次赢得合照主角位置；属于非官方恶搞作品。' },
        { name: 'The Crownless', added: '2026-10-10', path: 'games/Action/the-crownless/index.html', preview: 'games/Action/the-crownless/preview.webp', icon: '🎮', desc: '以格斗连招攻上砂岩城塞，收集灵魂获得新能力，逐步挑战国王；死亡会失去本轮战斗进度。' },
        { name: 'Until the Crown Falls', added: '2026-10-10', path: 'games/Action/until-the-crown-falls/index.html', preview: 'games/Action/until-the-crown-falls/preview.webp', icon: '🎮', desc: '在无尽围攻中守护国王，搜集钢材、指挥卫兵；国王受到的伤害不会自动恢复。' },
        { name: 'u', added: '2026-10-10', path: 'games/Action/universe-duel/index.html', preview: 'games/Action/universe-duel/preview.webp', icon: '🎮', desc: '选择机甲，在掩体间利用冲刺、追踪导弹、激光剑和等离子爆发进行对决。' },
        { name: 'RUNNER', added: '2026-10-10', path: 'games/Action/runner-stage-1/index.html', preview: 'games/Action/runner-stage-1/preview.webp', icon: '🎮', desc: '在受魂斗罗启发的横版原型中穿越丛林桥梁，射击敌人并向堡垒前进。' },
        { name: 'DRONE', added: '2026-10-10', path: 'games/Action/drone-io/index.html', preview: 'games/Action/drone-io/preview.webp', icon: '🌐', desc: '驾驶无人机在本地竞技场躲避电脑对手，利用雷达寻找机会并逐步升级。' },
        { name: 'Knightmare', added: '2026-10-10', path: 'games/Action/knightmare-medusa/index.html', preview: 'games/Action/knightmare-medusa/preview.webp', icon: '🎮', desc: '在 Knightmare 的非官方 3D 首领战改编中射击、闪避，并释放净化迎战美杜莎。' },
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
        { name: 'Odyssey Expedition', path: 'games/Action/Odyssey-Expedition/index.html', preview: 'games/Action/Odyssey-Expedition/preview.webp', icon: 'fas fa-compass', desc: '奥德赛远征：3D海盗远航冒险' },
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
        { name: 'Surge For Oinja', path: 'games/Action/Surge-For-Oinja/index.html', preview: 'games/Action/Surge-For-Oinja/preview.webp', icon: 'fas fa-gamepad', desc: '第三人称幸存者类游戏：自动攻击，组合电气技能与支援机械，在两张地图中修复设施、搭配成长路线并迎战首领。', author: 'Olivia', source: 'astragames 收录（开源）', github: 'https://github.com/Olivia295/SURGE-for-Oinja' },
        { name: 'Astra Floor', path: 'games/Action/Astra-Floor/index.html', preview: 'games/Action/Astra-Floor/preview.webp', icon: 'fas fa-gamepad', desc: '3D 第一人称僵尸生存射击：控制后坐力、管理冲刺体力，使用武士刀抵御逐渐增强的敌潮并挑战最终首领。', author: 'BEROCHLU', source: 'astragames 收录（开源）', github: 'https://github.com/BEROCHLU/astrafloor' },
        { name: 'Sandline', path: 'games/Action/Sandline/index.html', preview: 'games/Action/Sandline/preview.webp', icon: 'fas fa-gamepad', desc: '在沙漠旧城与 AI 队友协同进行单机 3 对 3 回合制交战，利用掩体、枪械与手雷争夺 A/B 爆破目标。源码 MIT 许可。', author: 'xilinnihao-afk', source: 'astragames 收录（开源）', github: 'https://github.com/xilinnihao-afk/sandline-threejs-fps' },
        { name: 'Magic Carpet Wizard', path: 'games/Action/Magic-Carpet-Wizard/index.html', preview: 'games/Action/Magic-Carpet-Wizard/preview.webp', icon: 'fas fa-gamepad', desc: '驾驶魔毯探索球形世界，穿环、施法，并挑战敌人与 Boss。', author: 'threapchills', source: 'astragames 收录（开源）', github: 'https://github.com/threapchills/MagicCarpetWizard' },
        { name: 'Clock Out Unseen', path: 'games/Action/Clock-Out-Unseen/index.html', preview: 'games/Action/Clock-Out-Unseen/preview.webp', icon: 'fas fa-gamepad', desc: '在三关限时办公室潜行中，借助家具掩体、咖啡机和六秒文件夹伪装避开巡逻，赶到电梯下班。', author: 'Ryan-fm', source: 'astragames 收录（开源）', github: 'https://github.com/Ryan-fm/clockout-unseen' },
        { name: 'Blackwater', path: 'games/Action/Blackwater/index.html', preview: 'games/Action/Blackwater/preview.webp', icon: 'fas fa-gamepad', desc: '潜入雨夜货运港口的战术 FPS，包含精细步枪、战斗 HUD 和九名敌人。', author: 'hiraeth', source: 'GitHub 开源仓库', github: 'https://github.com/Hiraeth010/blackwater' },
        { name: 'Voidbound', path: 'games/Action/Voidbound/index.html', preview: 'games/Action/Voidbound/preview.webp', icon: 'fas fa-gamepad', desc: '在教堂竞技场中以轻重剑击、闪避和范围魔法迎战恶魔。', author: 'Alexey Fateev', source: 'astragames 收录（开源）', github: 'https://github.com/alesha-pro/bench-portal' },
        { name: 'Neural Sight', path: 'games/Action/Neural-Sight/index.html', preview: 'games/Action/Neural-Sight/preview.webp', icon: 'fas fa-gamepad', desc: '在高斯泼溅实景构成的第一人称游戏原型中探索，体验武器影像、感染者与可投掷弹力球。', author: 'Earl Cameron', source: 'astragames 收录（开源）', github: 'https://github.com/monstercameron/Neural-Sight' },
        { name: 'Saber Descent', path: 'games/Action/Saber-Descent/index.html', preview: 'games/Action/Saber-Descent/preview.webp', icon: 'fas fa-gamepad', desc: '手持能量剑深入五层地牢，组合斩击、格挡和冲刺，击败守卫并寻找下一道传送门。', author: 'Dwayne', source: 'astragames 收录（开源）', github: 'https://github.com/Vheissu/saber-battle' },
        { name: 'Mario Mix 2', path: 'games/Action/Mario-Mix-2/index.html', preview: 'games/Action/Mario-Mix-2/preview.webp', icon: 'fas fa-gamepad', desc: '让《忍者龙剑传》的隼龙与《坦克大战》的坦克进入马里奥地下关卡 1-2，也可双角色接力救回公主。', author: 'Aha-xiaoQ', source: 'astragames 收录（开源）', github: 'https://github.com/Aha-xiaoQ/aha-xiaoq.github.io' }
    ],
    Arcade: [
        { name: 'Sulli RUN', added: '2026-10-10', path: 'games/Arcade/sulli-run/index.html', preview: 'games/Arcade/sulli-run/preview.webp', icon: '🎮', desc: '操纵 3D 大猩猩在霓虹城市中跑酷，切换跑道、跳跃和滑行，躲避障碍并提高得分。' },
        { name: 'Barrelbound', added: '2026-10-10', path: 'games/Arcade/barrelbound/index.html', preview: 'games/Arcade/barrelbound/preview.webp', icon: '🎮', desc: '选择 Rocco 或 Pip，在三个丛林平台关卡中二段跳、投掷木桶、搭乘矿车，找回遗失的货物并挑战最终首领。' },
        { name: 'STORM RACE', added: '2026-10-10', path: 'games/Arcade/storm-race/index.html', preview: 'games/Arcade/storm-race/preview.webp', icon: '🏎️', desc: '迷你四驱车竞速，包含零件拆解车库、加速和晴天、雨天、暴风雨赛道变化。' },
        { name: 'FANG STARLIGHT RUN', added: '2026-10-10', path: 'games/Arcade/fang-starlight-run/index.html', preview: 'games/Arcade/fang-starlight-run/preview.webp', icon: '🎮', desc: '操控小狼穿越三个星夜横版关卡，利用二段跳与冲刺收集金币和星之碎片。' },
        { name: 'Blue Bajaj Rally', added: '2026-10-10', path: 'games/Arcade/blue-bajaj-rally/index.html', preview: 'games/Arcade/blue-bajaj-rally/preview.webp', icon: '🎮', desc: '驾驶三轮 Bajaj 在埃塞俄比亚风格的高地赛道上，与五名电脑车手竞速或挑战计时。' },
        { name: 'APEX CLUB', added: '2026-10-10', path: 'games/Arcade/apex-club/index.html', preview: 'games/Arcade/apex-club/preview.webp', icon: '🎮', desc: '在海湾赛道参加三圈卡丁车竞速，选择六款赛车，利用漂移蓄力与出弯小喷争夺个人名次或 4v4 队伍积分。' },
        { name: '鹈鹕踏浪', added: '2026-10-10', path: 'games/Arcade/pelican-pedal/index.html', preview: 'games/Arcade/pelican-pedal/preview.webp', icon: '🎮', desc: '让鹈鹕骑着自行车穿行于不断变化的 3D 海岸，在三条车道间换道、跳跃与低头躲避障碍，连续收集小鱼获得连击，使用护盾、磁铁' },
        { name: '狂飙赛车 ·', added: '2026-10-10', path: 'games/Arcade/overdrive/index.html', preview: 'games/Arcade/overdrive/preview.webp', icon: '🏎️', desc: '与五名 AI 对手进行 3D 赛车竞速，可选择车辆和赛道，提供计时、漂移及氮气加速。' },
        { name: '零界深潜', added: '2026-10-10', path: 'games/Arcade/abyss-protocol/index.html', preview: 'games/Arcade/abyss-protocol/preview.webp', icon: '🎮', desc: '只靠左右移动，在 3D 深井中踩着移动、脆裂与相位平台不断下潜，躲避激光和锯刃，收集晶体与生存芯片。' },
        { name: '疾风赛道 跑跑卡丁车', added: '2026-10-10', path: 'games/Arcade/-kart-racing/index.html', preview: 'games/Arcade/-kart-racing/preview.webp', icon: '🏎️', desc: '通过漂移积攒氮气，在三圈竞速中使用道具争夺名次；当前游戏名为“疾风赛道”，提供 2–4 人联机入口。' },
        { name: 'TIDAL RUSH', added: '2026-10-10', path: 'games/Arcade/tidal-rush/index.html', preview: 'games/Arcade/tidal-rush/preview.webp', icon: '🎮', desc: '在热带卡丁车赛道上漂移、使用道具，经过三圈比赛与七名对手争夺名次。' },
        { name: '紅月', added: '2026-10-10', path: 'games/Arcade/luna-crimson-requiem/index.html', preview: 'games/Arcade/luna-crimson-requiem/preview.webp', icon: '🎮', desc: '在哥特像素关卡中跳跃前进，通过挥剑、踩踏或召唤攻击迎战敌人的短篇横版冒险。' },
        { name: 'Strange Orbit', added: '2026-10-10', path: 'games/Arcade/crayon-space-bike/index.html', preview: 'games/Arcade/crayon-space-bike/preview.webp', icon: '🎮', desc: '骑着自行车沿行星环与宇航员对手竞速，收集星尘、跟随尾流并加速完成轨道杯。' },
        { name: 'One More Vine', added: '2026-10-10', path: 'games/Arcade/one-more-vine/index.html', preview: 'games/Arcade/one-more-vine/preview.webp', icon: '🎮', desc: '在四个丛林关卡中奔跑、跳跃和荡藤，收集宝藏、躲避鳄鱼并刷新通关时间。' },
        { name: 'Bengaluru ORR Rush', added: '2026-10-10', path: 'games/Arcade/bengaluru-orr-rush/index.html', preview: 'games/Arcade/bengaluru-orr-rush/preview.webp', icon: '🎮', desc: '穿行班加罗尔的拥堵道路，避开坑洼和外卖摩托，利用加速与侧向挥击争取超车空间。' },
        { name: '极地速降', added: '2026-10-10', path: 'games/Arcade/skicross/index.html', preview: 'games/Arcade/skicross/preview.webp', icon: '🎮', desc: '与三名对手沿雪山竞速，穿越旗门与障碍，并在雪崩追上之前冲向终点。' },
        { name: 'Itsy Bitsy Spider', added: '2026-10-10', path: 'games/Arcade/itsy-bitsy-spider/index.html', preview: 'games/Arcade/itsy-bitsy-spider/preview.webp', icon: '🎮', desc: '爬上长满苔藓的墙壁，捕食飞虫恢复抓力，并在雨水到来前藏进洞穴。' },
        { name: 'Desi Mayhem', added: '2026-10-10', path: 'games/Arcade/desi-mayhem/index.html', preview: 'games/Arcade/desi-mayhem/preview.webp', icon: '🎮', desc: '骑摩托穿行印度城市道路，在公交车与三轮车之间竞速，并使用踢击、拳击和加速。' },
        { name: 'Cosmic Tides', added: '2026-10-10', path: 'games/Arcade/cosmic-tides/index.html', preview: 'games/Arcade/cosmic-tides/preview.webp', icon: '🎮', desc: '驾驶载具穿越银河海面，追逐发光路线门，可选择两圈竞速或无尽漂流。' },
        { name: 'Neon Wake', added: '2026-10-10', path: 'games/Arcade/neon-wake/index.html', preview: 'games/Arcade/neon-wake/preview.webp', icon: '🎮', desc: '驾驶快艇沿迪拜海岸穿过八个赛段，在三圈赛道中使用加速与跳台捷径。' },
        { name: 'Wings of Freedom', added: '2026-10-10', path: 'games/Arcade/levi-skyrun/index.html', preview: 'games/Arcade/levi-skyrun/preview.webp', icon: '🎮', desc: '引导利威尔自动穿梭屋顶，闪避障碍，把握翻越与攻击巨人的时机来积累连贯动作。' },
        { name: 'Hot Wheeler', added: '2026-10-10', path: 'games/Arcade/hot-wheeler/index.html', preview: 'games/Arcade/hot-wheeler/preview.webp', icon: '🎮', desc: '驾驶玩具赛车穿过特技公园或卧室赛道的环形轨道、坡道与加速区，可切换自动跑圈、手动驾驶和放置车辆。' },
        { name: 'Glider', added: '2026-10-10', path: 'games/Arcade/glider-game/index.html', preview: 'games/Arcade/glider-game/preview.webp', icon: '🎮', desc: '发射纸飞机，在不断延展的 3D 地貌中转向、加速与穿环，或自由探索不同生态区域。' },
        { name: 'Duck Off', added: '2026-10-10', path: 'games/Arcade/duck-off/index.html', preview: 'games/Arcade/duck-off/preview.webp', icon: '🎮', desc: '点击划水推动小鸭前进，躲开木桩与漩涡、积攒加速，支持单人练习与房间竞速。' },
        { name: 'Wildwake Rally', added: '2026-10-10', path: 'games/Arcade/wildwake-rally/index.html', preview: 'games/Arcade/wildwake-rally/preview.webp', icon: '🎮', desc: '驾驶橙色拉力赛车穿越低多边形山地赛道，提供两圈单人练习与公开排行榜。' },
        { name: 'PaperRoute', added: '2026-10-10', path: 'games/Arcade/paperroute/index.html', preview: 'games/Arcade/paperroute/preview.webp', icon: '🎮', desc: '骑车穿行郊区街道，向两侧订户投递报纸，并躲开车辆、行人和坑洞。' },
        { name: 'Zombie Escape Driver', added: '2026-10-10', path: 'games/Arcade/zombie-escape-driver/index.html', preview: 'games/Arcade/zombie-escape-driver/preview.webp', icon: '🧟', desc: '在无尽夜间驾驶中穿越丧尸与交通，收集废料并加速冲向下一个街区。' },
        { name: 'DUSKLINE', added: '2026-10-10', path: 'games/Arcade/duskline-canyon-circuit/index.html', preview: 'games/Arcade/duskline-canyon-circuit/preview.webp', icon: '🎮', desc: '在落日峡谷环线上驾驶，结合圈速计时、赛道进度小地图与可切换的追车视角。' },
        { name: 'RED FLAG GAME', added: '2026-10-10', path: 'games/Arcade/red-flag-game/index.html', preview: 'games/Arcade/red-flag-game/preview.webp', icon: '🎮', desc: '驾车往返机场与家，留意限速、红绿灯和剩余驾照分数。' },
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
        { name: '魔毯巫师', path: 'games/Arcade/Magic-Carpet-Wizard/index.html', preview: 'games/Arcade/Magic-Carpet-Wizard/preview.webp', icon: 'fas fa-hat-wizard', desc: 'AI生成·魔法飞毯冒险' },
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
        { name: 'Voidrunner', path: 'games/Arcade/Voidrunner/index.html', preview: 'games/Arcade/Voidrunner/preview.webp', icon: 'fas fa-gamepad', desc: '驾驶反重力飞船在霓虹赛道上与七名对手竞速，结合加速、气刹与武器争夺名次。', author: 'Alexey Fateev', source: 'astragames 收录（开源）', github: 'https://github.com/alesha-pro/bench-portal' }
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
        { name: 'Mahjong Connect', path: 'games/Board/Mahjong-Connect/index.html', preview: 'games/Board/Mahjong-Connect/preview.webp', icon: 'fas fa-border-all', desc: '麻将连连看' },
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
        { name: 'Snake And Ladder', path: 'games/Board/snake-and-ladder/index.html', preview: 'games/Board/snake-and-ladder/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·Snake And Ladder游戏', isNew: true },
        { name: 'Three Kingdoms', path: 'games/Board/Three-Kingdoms/index.html', preview: 'games/Board/Three-Kingdoms/preview.webp', icon: 'fas fa-gamepad', desc: '选择魏、蜀、吴，在 15 城地图上经营金粮、指挥 108 名武将，以回合制征战对抗 AI 势力，争夺天下统一。', author: 'MartinDelophy', source: 'astragames 收录（开源）', github: 'https://github.com/MartinDelophy/awesome-gpt-6-astra' }
    ],
    Memory: [
        { name: 'Color Match', path: 'games/Memory/Color-Match/index.html', icon: 'fas fa-palette', desc: '颜色匹配记忆' },
        { name: 'Match Pairs', path: 'games/Memory/Match-Pairs/index.html', icon: 'fas fa-clone', desc: '配对记忆' },
        { name: 'Memory Card', path: 'games/Memory/Memory-Card/index.html', icon: 'fas fa-id-card', desc: '记忆卡片翻牌' },
        { name: 'Simon Says', path: 'games/Memory/Simon-Says/index.html', icon: 'fas fa-circle-notch', desc: '西蒙说记忆' }
    ],
    Typing: [
        { name: '猴子打字', path: 'games/Typing/MonkeyType/index.html', preview: 'games/Typing/MonkeyType/preview.webp', icon: 'fas fa-keyboard', desc: 'AI生成·打字测试' },
        { name: '文字雨', path: 'games/Typing/Word-Rain/index.html', preview: 'games/Typing/Word-Rain/preview.webp', icon: 'fas fa-cloud-rain', desc: 'AI生成·打字雨' },
        { name: 'Hangman', path: 'games/Typing/Hangman/index.html', icon: 'fas fa-spell-check', desc: '猜单词游戏' },
        { name: 'Speed Typing', path: 'games/Typing/Speed-Typing/index.html', icon: 'fas fa-keyboard', desc: '速度打字练习' },
        { name: 'Type Master', path: 'games/Typing/Type-Master/index.html', icon: 'fas fa-font', desc: '打字大师' },
        { name: 'Typing Speed Challenge', path: 'games/Typing/Typing-Speed-Challenge/index.html', icon: 'fas fa-stopwatch', desc: '打字速度挑战' },
        { name: '打字比赛', path: 'games/Typing/typing-race/index.html', preview: 'games/Typing/typing-race/preview.webp', icon: 'fas fa-gamepad', desc: 'AI生成·打字速度比赛', isNew: true }
    ],
    Adventure: [
        
    ],
    Casual: [
        { name: 'Tidehook', added: '2026-10-10', path: 'games/Casual/tidehook/index.html', preview: 'games/Casual/tidehook/preview.webp', icon: '🎮', desc: '驾驶小拖船 Mallow 完成三段海岸航程，拖回会影响加速与转向的不同重量打捞物，交给港口起重机，并最终找回灯塔透镜。' },
        { name: 'JUNK RUN', added: '2026-10-10', path: 'games/Casual/junk-run/index.html', preview: 'games/Casual/junk-run/preview.webp', icon: '🎮', desc: '用废料零件组装无动力小车，再依靠重力冲下山坡；从第一人称工坊开始。' },
        { name: 'Spy or Lie', added: '2026-10-10', path: 'games/Casual/spy-or-lie/index.html', preview: 'games/Casual/spy-or-lie/preview.webp', icon: '🎮', desc: '与电脑对战的六边形策略桌游：放置隐藏身份的特工，通过虚张声势和包围敌方群组触发连锁占领。' },
        { name: '三分天下 · 百将风云', added: '2026-10-10', path: 'games/Casual/three-kingdoms/index.html', preview: 'games/Casual/three-kingdoms/preview.webp', icon: '🎮', desc: '选择魏、蜀、吴，在 15 城地图上经营金粮、指挥拥有独立 AI 生成头像的 108 名武将，以回合制征战对抗 AI 势力' },
        { name: '缺氧 · 小小星球', added: '2026-10-10', path: 'games/Casual/hypoxia/index.html', preview: 'games/Casual/hypoxia/preview.webp', icon: '🚀', desc: '地下殖民地生存模拟：指挥三名复制人挖掘和建造，管理氧气、食物及电力，让基地持续运转。' },
        { name: '魔塔 · 永夜之阶', added: '2026-10-10', path: 'games/Casual/magic-tower/index.html', preview: 'games/Casual/magic-tower/preview.webp', icon: '🏰', desc: '十五层像素高塔冒险，围绕攻防计算、有限资源和三色钥匙规划路线、逐层探索。' },
        { name: '永恒荒野', added: '2026-10-10', path: 'games/Casual/eternal-wilderness/index.html', preview: 'games/Casual/eternal-wilderness/preview.webp', icon: '🎮', desc: '投稿中的《饥荒》复刻网页生存与策略游戏；截图展示了森林探索、物资收集、背包，以及生命、饱食与理智状态。' },
        { name: '潜水员戴夫复刻', added: '2026-10-10', path: 'games/Casual/dave-the-diver/index.html', preview: 'games/Casual/dave-the-diver/preview.webp', icon: '🎮', desc: '《潜水员戴夫》的浏览器复刻，将水下鱼叉捕鱼、寿司店经营与海岛种植结合在一起。' },
        { name: 'No Moat', added: '2026-10-10', path: 'games/Casual/no-moat/index.html', preview: 'games/Casual/no-moat/preview.webp', icon: '🎮', desc: '创业题材的肉鸽卡牌游戏：招募团队，打出卡牌应对抄袭者、程序错误和云服务账单。' },
        { name: 'The Free Game', added: '2026-10-10', path: 'games/Casual/the-free-game-web/index.html', preview: 'games/Casual/the-free-game-web/preview.webp', icon: '🎮', desc: '修路、培养工人、搭建生产链，在细致的 3D 中世纪村庄里经营建设。' },
        { name: 'AGI of Empires', added: '2026-10-10', path: 'games/Casual/agi-of-empires/index.html', preview: 'games/Casual/agi-of-empires/preview.webp', icon: '🎮', desc: '收集资金与 GPU，建造数据中心和军队，抢先完成 ASI 研究或摧毁其他 AI 实验室的总部。' },
        { name: 'Atlas Go', added: '2026-10-10', path: 'games/Casual/atlas-go/index.html', preview: 'games/Casual/atlas-go/preview.webp', icon: '🎮', desc: '在城市街道网络和特殊图形棋盘上对弈围棋，支持本地轮流操作并提供好友对局入口。' },
        { name: 'Ironwood', added: '2026-10-10', path: 'games/Casual/ironwood/index.html', preview: 'games/Casual/ironwood/preview.webp', icon: '🎮', desc: '采集原料，为机器供能并连接传送带，将林间空地发展成持续运转的工厂。' },
        { name: 'DUST FRONT', added: '2026-10-10', path: 'games/Casual/dust-front/index.html', preview: 'games/Casual/dust-front/preview.webp', icon: '🎮', desc: '单人即时战略：建设基地、占领据点，指挥地面与空中部队作战。' },
        { name: '前线指令', added: '2026-10-10', path: 'games/Casual/frontline-command/index.html', preview: 'games/Casual/frontline-command/preview.webp', icon: '🎮', desc: '在现代战争题材的即时战略游戏中建设基地、争夺资源区，指挥坦克、步兵、飞机与无人机对抗电脑，并通过间谍和情报系统获取优势。' },
        { name: 'Coin Pusher Roguelite', added: '2026-10-10', path: 'games/Casual/mintfall/index.html', preview: 'games/Casual/mintfall/preview.webp', icon: '🎮', desc: '在 3D 推币机中瞄准投币，组合特殊硬币与遗物，用有限投币次数完成六轮分数目标。' },
        { name: 'Westward', added: '2026-10-10', path: 'games/Casual/westward/index.html', preview: 'games/Casual/westward/preview.webp', icon: '🎮', desc: '带领马车队沿俄勒冈小道西行，分配食物、安排狩猎与修理，并处理旅途中的选择。' },
        { name: 'Outerstead', added: '2026-10-10', path: 'games/Casual/outerstead/index.html', preview: 'games/Casual/outerstead/preview.webp', icon: '🎮', desc: '为四名幸存者建造边境殖民地，安排食物与工作优先级，并探索 Hollow-7 的秘密。' },
        { name: 'Outermate', added: '2026-10-10', path: 'games/Casual/outermate/index.html', preview: 'games/Casual/outermate/preview.webp', icon: '🎮', desc: '熟悉监狱的日常作息，建立关系并收集权限与物资，准备多条越狱路线。' },
        { name: 'Česká dobrodružství', added: '2026-10-10', path: 'games/Casual/czech-adventures/index.html', preview: 'games/Casual/czech-adventures/preview.webp', icon: '🎮', desc: '乘坐火车、汽车、船只或飞机探索微缩捷克世界，切换载具并完成小任务。' },
        { name: 'Land', added: '2026-10-10', path: 'games/Casual/land-if-you-can/index.html', preview: 'games/Casual/land-if-you-can/preview.webp', icon: '🎮', desc: '接管客机或轻型飞机，跟随塔台指引完成进近与降落挑战，包含五个场景、可互动客舱和飞行回放。' },
        { name: 'Last Train to the Sea', added: '2026-10-10', path: 'games/Casual/last-train-to-the-sea/index.html', preview: 'games/Casual/last-train-to-the-sea/preview.webp', icon: '🎮', desc: '驾驶长着翅膀的电车穿行五座云上小镇，维持车身平衡、接送乘客，并收集车资、车票和车站印章。' },
        { name: 'Realm of Seratari', added: '2026-10-10', path: 'games/Casual/realm-of-seratari/index.html', preview: 'games/Casual/realm-of-seratari/preview.webp', icon: '🎮', desc: '在程序生成的世界中养育巨龙、狩猎与收集金币，决定如何与会成长、防御和结盟的城镇相处。' },
        { name: 'Monopoly City', added: '2026-10-10', path: 'games/Casual/monopoly-city/index.html', preview: 'games/Casual/monopoly-city/preview.webp', icon: '🎮', desc: '在微缩 3D 城市棋盘上与三名电脑对手掷骰对局，处理机会卡、交易地产，并切换棋盘与街道视角。' },
        { name: 'MUST', added: '2026-10-10', path: 'games/Casual/must-make-paperclips/index.html', preview: 'games/Casual/must-make-paperclips/preview.webp', icon: '🎮', desc: '布置、升级炮塔守卫废土上的回形针工厂，穿插第一人称战斗，并通过永久研究挑战六个任务。' },
        { name: 'Sundrift', added: '2026-10-10', path: 'games/Casual/sundrift/index.html', preview: 'games/Casual/sundrift/preview.webp', icon: '🏎️', desc: '驾驶小艇探索夕照中的群岛海域，结合局部海图寻找海岸，在没有限时目标的航行沙盒中漫游。' },
        { name: 'VeilFall', added: '2026-10-10', path: 'games/Casual/veilfall-hollow-war/index.html', preview: 'games/Casual/veilfall-hollow-war/preview.webp', icon: '🎮', desc: '扮演 Ilyra 参加三路 5v5 电脑对战，施放光系技能、购买遗物，推进防御塔并摧毁敌方核心。' },
        { name: 'Minimum Rage', added: '2026-10-10', path: 'games/Casual/minimum-rage/index.html', preview: 'games/Casual/minimum-rage/preview.webp', icon: '🎮', desc: '帮助 Kevin 保住餐厅工作：接单、取餐并服务八位顾客，避免过多客人失去耐心离开。' },
        { name: 'Cabsolutely', added: '2026-10-10', path: 'games/Casual/cabsolutely/index.html', preview: 'games/Casual/cabsolutely/preview.webp', icon: '🎮', desc: '驾驶出租车穿行旧金山金融区，接送乘客赚取每日目标车费，并留意车辆状况。' },
        { name: 'Mini Moto', added: '2026-10-10', path: 'games/Casual/mini-moto/index.html', preview: 'games/Casual/mini-moto/preview.webp', icon: '🎮', desc: '管理车手并塑造微缩越野摩托公园，通过全景或头盔视角观察八圈比赛。' },
        { name: 'DASH', added: '2026-10-10', path: 'games/Casual/dash-dinner/index.html', preview: 'games/Casual/dash-dinner/preview.webp', icon: '🎮', desc: '接受限时外卖订单，以第一人称穿行城市，管理配送员体力并逐步升级交通工具。' },
        { name: 'Stillwater', added: '2026-10-10', path: 'games/Casual/stillwater-aquarium/index.html', preview: 'games/Casual/stillwater-aquarium/preview.webp', icon: '🎮', desc: '照料淡水水族箱、投喂小鱼，通过水草与更大栖息地逐步扩展鱼缸。' },
        { name: 'Saber', added: '2026-10-10', path: 'games/Casual/saber-descent/index.html', preview: 'games/Casual/saber-descent/preview.webp', icon: '🎮', desc: '手持能量剑深入五层地牢，组合斩击、格挡和冲刺，击败守卫并寻找下一道传送门。' },
        { name: 'The Sunshard', added: '2026-10-10', path: 'games/Casual/the-sunshard/index.html', preview: 'games/Casual/the-sunshard/preview.webp', icon: '🎮', desc: '体素风动作 RPG：使用火花弹与日光爆发对抗 Hollowborn，闪现躲避危险，唤醒太阳之门。' },
        { name: 'Lumbridge', added: '2026-10-10', path: 'games/Casual/lumbridge/index.html', preview: 'games/Casual/lumbridge/preview.webp', icon: '🎮', desc: '复古多人冒险，包含共享世界、技能、采集和战斗，可使用游客身份进入。' },
        { name: '热血归来 · 八荒幻世', added: '2026-10-10', path: 'games/Casual/mir176/index.html', preview: 'games/Casual/mir176/preview.webp', icon: '🎮', desc: '传奇风格动作 RPG，包含战士、法师、道士三职业、装备、副本战斗与自动战斗。' },
        { name: 'Zork', added: '2026-10-10', path: 'games/Casual/zork/index.html', preview: 'games/Casual/zork/preview.webp', icon: '🎮', desc: 'Zork 的非官方 3D 改编，以第一人称探索地下世界，结合谜题、战斗与冒险日志。' },
        { name: 'The Simpsons', added: '2026-10-10', path: 'games/Casual/hit-and-run-web/index.html', preview: 'games/Casual/hit-and-run-web/preview.webp', icon: '🎮', desc: '在非官方浏览器重制版中步行或驾车探索春田镇，体验任务、街道交通与警察追逐。' },
        { name: 'Where the Wind Wanders', added: '2026-10-10', path: 'games/Casual/crayon-adventure/index.html', preview: 'games/Casual/crayon-adventure/preview.webp', icon: '🎮', desc: '在阳光下的 2.5D 山谷中沿小径漫游，寻找三封风之信，体验轻松的探索冒险。' },
        { name: 'Skyward', added: '2026-10-10', path: 'games/Casual/skyward-gathering/index.html', preview: 'games/Casual/skyward-gathering/preview.webp', icon: '🎮', desc: '探索浮空群岛，在社区之间跳跃和滑翔，并完成居民交付的任务。' },
        { name: 'Anna', added: '2026-10-10', path: 'games/Casual/anna-leo-starstone/index.html', preview: 'games/Casual/anna-leo-starstone/preview.webp', icon: '🎮', desc: '在 Anna 的音乐魔法与 Leo 的超能力之间切换，唤醒旋律花朵并探索奇迹花园。' },
        { name: 'The Legend of Deller', added: '2026-10-10', path: 'games/Casual/the-legend-of-deller/index.html', preview: 'games/Casual/the-legend-of-deller/preview.webp', icon: '🎮', desc: '探索雨雾庇护所，再向地牢进发，运用剑技连段、元素技能和闪避展开冒险。' },
        { name: 'Dungeon of Astra', added: '2026-10-10', path: 'games/Casual/dungeon-of-astra/index.html', preview: 'games/Casual/dungeon-of-astra/preview.webp', icon: '🎮', desc: '招募冒险小队，深入百层地下城，结合剑击、火球与队友职业能力，挑战带永久死亡机制的冒险。' },
        { name: 'Sunlandia', added: '2026-10-10', path: 'games/Casual/sunlandia/index.html', preview: 'games/Casual/sunlandia/preview.webp', icon: '🎮', desc: '以第一人称探索沉船后的孤岛，调查线索、解开环境谜题，并寻找通往灯塔的道路。' },
        { name: 'NÁCAR', added: '2026-10-10', path: 'games/Casual/nacar/index.html', preview: 'games/Casual/nacar/preview.webp', icon: '🎮', desc: '在浸水的蜗牛壳中扮演微生物，吞食营养、探索微观水域，并逐渐进化出新的身体部件。' },
        { name: 'BELOW', added: '2026-10-10', path: 'games/Casual/below-the-hollow/index.html', preview: 'games/Casual/below-the-hollow/preview.webp', icon: '🎮', desc: '以第一人称探索每次重新生成的水下洞穴，沿潜水引导绳寻找返回水面的路径。' },
        { name: 'The Road to Kufa', added: '2026-10-10', path: 'games/Casual/road-to-kufa/index.html', preview: 'games/Casual/road-to-kufa/preview.webp', icon: '🎮', desc: '步行或骑马探索阿拉伯沙漠世界，游览绿洲城镇并发现地标；当前为开发中的冒险原型。' },
        { name: 'Grand Theft Auto VI', added: '2026-10-10', path: 'games/Casual/gta-vi-ps1-demake/index.html', preview: 'games/Casual/gta-vi-ps1-demake/preview.webp', icon: '🎮', desc: '在 PlayStation 风格画面中探索小型 Vice City，体验驾驶、双主角、任务和警察追逐；为非官方粉丝改编。' },
        { name: 'Don’t Look Away', added: '2026-10-10', path: 'games/Casual/dont-look-away/index.html', preview: 'games/Casual/dont-look-away/preview.webp', icon: '🎮', desc: '在黑暗教堂中恢复供电并寻找逃生钥匙；石像天使会在看不见它们时逼近，每次眨眼都伴随风险。' },
        { name: 'Europe', added: '2026-10-10', path: 'games/Casual/europe-the-game/index.html', preview: 'games/Casual/europe-the-game/preview.webp', icon: '🎮', desc: '探索欧洲城市街区，在工作、体力、社交与虚拟日常预算之间进行取舍。' },
        { name: 'ASTRA Arcade', added: '2026-10-10', path: 'games/Casual/astra-arcade/index.html', preview: 'games/Casual/astra-arcade/preview.webp', icon: '🎮', desc: '集山地拉力、滑雪、反重力竞速等六款浏览器游戏于一体的街机厅；按一个合集收录。' },
        { name: 'Chao Party', added: '2026-10-10', path: 'games/Casual/chao-party/index.html', preview: 'games/Casual/chao-party/preview.webp', icon: '🎮', desc: '非官方 Chao Garden 多人同人游戏：选择索尼克角色，探索花园并与 Chao 互动。' },
        { name: '泡泡坦克大作战联机版', added: '2026-10-10', path: 'games/Casual/-toon-tank-arena/index.html', preview: 'games/Casual/-toon-tank-arena/preview.webp', icon: '🛡️', desc: '用弹跳炮弹与强化道具守护彩虹核心，提供单人、双人同屏合作与在线对战模式的卡通坦克竞技场。' },
        { name: 'Above the Rooftops', added: '2026-10-10', path: 'games/Casual/above-the-rooftops/index.html', preview: 'games/Casual/above-the-rooftops/preview.webp', icon: '🎮', desc: '涂绘风筝并在城市屋顶上放飞，控制风筝线张力，体验自由飞行或限时收集天空光点的挑战。' },
        { name: 'Starship Foundry', added: '2026-10-10', path: 'games/Casual/starship-foundry/index.html', preview: 'games/Casual/starship-foundry/preview.webp', icon: '✈️', desc: '用模块拼装飞船，检查连接、动力与推力，再带着作品进入穿环、跳跃或等距视角射击模式。' },
        { name: 'POCKET_01', added: '2026-10-10', path: 'games/Casual/pocket-01/index.html', preview: 'games/Casual/pocket-01/preview.webp', icon: '🎮', desc: '打开虚拟单色掌机，在 12 款小游戏中选择贪吃蛇、方块、打砖块、扫雷或八关推箱子等玩法。' },
        { name: 'Bubble Wrap Simulator', added: '2026-10-10', path: 'games/Casual/bubble-wrap-simulator/index.html', preview: 'games/Casual/bubble-wrap-simulator/preview.webp', icon: '🎮', desc: '探索由泡泡纸构成的房间，自由戳破各处表面，体验没有任务限制的解压游戏。' },
        { name: 'Loulou', added: '2026-10-10', path: 'games/Casual/loulous-apartment/index.html', preview: 'games/Casual/loulous-apartment/preview.webp', icon: '🎮', desc: '探索温馨的公寓游戏，与日常物品互动，并抚摸小狗 Maggie。' },
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
        { name: 'Coloring Book', path: 'games/Casual/Coloring-Book/index.html', preview: 'games/Casual/Coloring-Book/preview.webp', icon: 'fas fa-paint-brush', desc: '涂色画册' },
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
        { name: 'Dwellcraft', path: 'games/Casual/Dwellcraft/index.html', preview: 'games/Casual/Dwellcraft/preview.webp', icon: 'fas fa-gamepad', desc: '从家具库拖入物件，自由装修三个住宅，调整材质与光照，再以第一人称走进自己的设计。', author: 'Ryan-fm', source: 'astragames 收录（开源）', github: 'https://github.com/Ryan-fm/Dwellcraft' },
        { name: 'Toy2Game', path: 'games/Casual/Toy2Game/index.html', preview: 'games/Casual/Toy2Game/preview.webp', icon: 'fas fa-gamepad', desc: '把桌面玩具改编成四款 3D 网页游戏：轮流敲冰、带小兔穿过机关、放置太空人保持平衡、挪车解谜。非商业使用免费。', author: 'asmoyou', source: 'astragames 收录（开源）', github: 'https://github.com/asmoyou/toy2game' },
        { name: 'Jelly Baby', path: 'games/Casual/Jelly-Baby/index.html', preview: 'games/Casual/Jelly-Baby/preview.webp', icon: 'fas fa-gamepad', desc: '阳光木桌上的软体果冻游乐场，可以跳跃、拉伸，体验秋千和蹦床。', author: 'Scott', source: 'GitHub 开源仓库', github: 'https://github.com/scottstts/Jelly-Baby' },
        { name: 'Aegis Flora', path: 'games/Casual/Aegis-Flora/index.html', preview: 'games/Casual/Aegis-Flora/preview.webp', icon: 'fas fa-gamepad', desc: '放置太阳朋克防御塔以改变敌人路径，在连续进攻中保护核心。', author: 'Joshua Ray', source: 'astragames 收录（开源）', github: 'https://github.com/murderszn/aegis-flora' }
    ]
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

    // 上架 14 天内视为新品，点亮卡片 NEW 徽标
    const NEW_DAYS = 14;
    const now = Date.now();
    allGames.forEach(g => {
        if (g.added) g.isNew = (now - new Date(g.added + 'T00:00:00').getTime()) / 86400000 <= NEW_DAYS;
    });

    renderTagCloud();
    fillCounts();
    renderHeroArt();
    renderTodayPicks();
    renderNewArrivals();
    renderGames();
    renderGenArtSection();
    renderHotGames();
    setupShuffle();
    bindEvents();
    setupNavigation();
    setupBackToTop();
    setupMobileMenu();
    setupScrollReveal();
    setupNavbarScroll();
    setupInteractions();
    initHeroCanvas();
    
    console.log('%c🎮 AIGameHub v2.1', 'font-size: 20px; font-weight: bold; color: #7C6CFF;');
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

// 确定性洗牌（mulberry32 种子随机）：同一日期同序，用于"今日精选"按天轮换
function seededShuffle(arr, seed) {
    const a = arr.slice();
    let t = seed >>> 0;
    const rnd = () => {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function todaySeed() {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Hero 展示位：与今日精选同一种子，每天轮换展示第一款有封面的作品
function renderHeroArt() {
    const art = document.querySelector('.hero-art');
    if (!art) return;
    const pick = seededShuffle(allGames, todaySeed()).find(g => g.preview);
    if (!pick) return;
    const localizedName = window.i18n?.t(`games.${pick.name}`) || pick.name;
    const localizedCategory = getCategoryName(pick.category);
    art.href = pick.path;
    const img = art.querySelector('.hero-art-img');
    if (img) { img.src = pick.preview; img.alt = localizedName; }
    const chipCat = art.querySelector('.chip-cat');
    if (chipCat) { chipCat.removeAttribute('data-i18n'); chipCat.textContent = localizedCategory; }
    const chipName = art.querySelector('.chip-name');
    if (chipName) chipName.textContent = '· ' + localizedName;
}

// 今日精选：以日期为种子从全部作品轮换 8 款，每天不同、当天稳定
function renderTodayPicks() {
    const grid = document.getElementById('todayGrid');
    if (!grid) return;
    const picks = seededShuffle(allGames, todaySeed()).slice(0, 8);
    grid.innerHTML = '';
    picks.forEach((g, i) => grid.appendChild(createGameCard(g, i)));
}

// 最新上架：按上架日期倒序展示最近收录的 12 款，每批同步自动更新
function renderNewArrivals() {
    const grid = document.getElementById('newGrid');
    if (!grid) return;
    const dated = allGames.filter(g => g.added).sort((a, b) => b.added.localeCompare(a.added));
    if (!dated.length) {
        const section = grid.closest('section');
        if (section) section.style.display = 'none';
        return;
    }
    grid.innerHTML = '';
    dated.slice(0, 12).forEach((g, i) => grid.appendChild(createGameCard(g, i)));
}

// 目录"换一批"：打乱当前筛选结果重新渲染，方便探索长尾作品
function setupShuffle() {
    const toolbar = document.querySelector('.directory-toolbar');
    if (!toolbar || document.getElementById('shuffleBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'shuffleBtn';
    btn.className = 'filter-btn';
    btn.type = 'button';
    btn.innerHTML = `<i class="fas fa-shuffle"></i> <span>${window.i18n?.t('games.shuffle') || '换一批'}</span>`;
    btn.onclick = () => {
        if (!filteredGames.length) return;
        filteredGames = seededShuffle(filteredGames, Math.floor(Math.random() * 1e9));
        renderList(filteredGames);
    };
    toolbar.appendChild(btn);
}

function renderGames(category = 'all', searchTerm = '') {
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
    renderList(filteredGames);
}

function renderList(gamesToShow) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    currentPage = 1;

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
            ${game.github ? `<p class="game-credit">作者：${game.author || '未知'} ｜ 来源：${game.source || 'astragames 收录'} ｜ 源码：${game.github}</p>` : ''}
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