const gamesData ={
    Puzzle: [
        { name: 'Vesper', lang: 'little', added: '2026-10-10', path: 'games/Puzzle/vesper/index.html', preview: 'games/Puzzle/vesper/preview.webp', icon: '🎮', desc: 'Third-person puzzle adventure: explore a sunken garden and celestial machinery, managing light as life, ammo and currency to restore three seals.' },
        { name: 'Mystery Town', lang: 'little', added: '2026-10-10', path: 'games/Puzzle/mystery-town/index.html', preview: 'games/Puzzle/mystery-town/preview.webp', icon: '🎮', desc: 'Observe a miniature 3D world, inspect and manipulate objects, and solve environmental puzzles in the right causal order.' },
        { name: 'Bubble Pop', lang: 'no_need', added: '2026-10-10', path: 'games/Puzzle/qbxxl/index.html', preview: 'games/Puzzle/qbxxl/preview.webp', icon: '🎮', desc: 'Click to pop connected bubbles of the same color; big groups trigger bombs and rainbows across relaxed, level and timed modes.' },
        { name: 'Bonkshot', lang: 'little', added: '2026-10-10', path: 'games/Puzzle/bonkshot/index.html', preview: 'games/Puzzle/bonkshot/preview.webp', icon: '🎮', desc: 'Drag a slingshot to launch little characters, knock out wooden supports, collapse structures and clear targets.' },
        { name: 'Greenhouse Escape Room', lang: 'little', added: '2026-10-10', path: 'games/Puzzle/greenhouse-escape-room/index.html', preview: 'games/Puzzle/greenhouse-escape-room/preview.webp', icon: '🎮', desc: 'Explore a storm-sealed greenhouse, fix copper pipes, arrange plants and reflect light to rescue the last seed.' },
        { name: 'Infinite Garden', lang: 'little', added: '2026-10-10', path: 'games/Puzzle/infinite-garden/index.html', preview: 'games/Puzzle/infinite-garden/preview.webp', icon: '🎮', desc: 'Explore 48 gravity-shifting gardens, deliver colored fruit to matching pedestals and wake circuits in boundless architectural space.' },
        { name: 'Lantern Cove', lang: 'text', added: '2026-10-10', path: 'games/Puzzle/lantern-cove/index.html', preview: 'games/Puzzle/lantern-cove/preview.webp', icon: '🎮', desc: 'Guide Mara through a hand-drawn harbor, talk to guards, and combine clues and items to find the lighthouse\'s lost lens.' },
        { name: '2048', lang: 'no_need', path: 'games/Puzzle/2048/index.html', preview: 'games/Puzzle/2048/preview.webp', icon: 'fas fa-th', hot: true, desc: 'Classic number-merging puzzle.' },
        { name: 'Jigsaw Puzzle', lang: 'no_need', path: 'games/Puzzle/Jigsaw-Puzzle/index.html', preview: 'games/Puzzle/Jigsaw-Puzzle/preview.webp', icon: 'fas fa-puzzle-piece', desc: 'Fun jigsaw challenge.' },
        { name: 'Klotski', lang: 'no_need', path: 'games/Puzzle/Klotski/index.html', preview: 'games/Puzzle/Klotski/preview.webp', icon: 'fas fa-chess-board', desc: 'Classic sliding-block puzzle.' },
        { name: 'Maze Escape', lang: 'no_need', path: 'games/Puzzle/Maze-Escape/index.html', preview: 'games/Puzzle/Maze-Escape/preview.webp', icon: 'fas fa-route', desc: 'Maze escape adventure.' },
        { name: 'Minesweeper', lang: 'no_need', path: 'games/Puzzle/Minesweeper/index.html', preview: 'games/Puzzle/Minesweeper/preview.webp', icon: 'fas fa-bomb', hot: true, desc: 'Classic minesweeper game.' },
        { name: 'Spot Difference', lang: 'little', path: 'games/Puzzle/Spot-Difference/index.html', preview: 'games/Puzzle/Spot-Difference/preview.webp', icon: 'fas fa-search', desc: 'Spot-the-difference challenge.' },
        { name: 'Sudoku', lang: 'no_need', path: 'games/Puzzle/Sudoku/index.html', preview: 'games/Puzzle/Sudoku/preview.webp', icon: 'fas fa-table-cells', hot: true, desc: 'Classic sudoku logic game.' },
        { name: 'Tilting Maze', lang: 'no_need', path: 'games/Puzzle/Tilting-Maze/index.html', preview: 'games/Puzzle/Tilting-Maze/preview.webp', icon: 'fas fa-compass', desc: 'Gravity maze.' },
        { name: 'Sokoban', lang: 'no_need', path: 'games/Puzzle/Sokoban/index.html', preview: 'games/Puzzle/Sokoban/preview.webp', icon: 'fas fa-box', hot: true, desc: '3D sokoban box-pushing puzzle.' },
        { name: 'Tangram', lang: 'no_need', path: 'games/Puzzle/Tangram/index.html', preview: 'games/Puzzle/Tangram/preview.webp', icon: 'fas fa-shapes', desc: 'Tangram shape puzzles.' },
        { name: 'Cialdini-Persuasion-Lab', lang: 'little', path: 'games/Puzzle/Cialdini-Persuasion-Lab/index.html', preview: 'games/Puzzle/Cialdini-Persuasion-Lab/preview.webp', icon: 'fas fa-brain', desc: 'Persuasion training based on Cialdini\'s principles of influence.' },
        { name: 'Wordle', lang: 'text', path: 'games/Puzzle/Wordle/index.html', preview: 'games/Puzzle/Wordle/preview.webp', icon: 'fas fa-font', hot: true, desc: 'Classic five-letter word guessing game.' },
        { name: 'Mastermind', lang: 'little', path: 'games/Puzzle/Mastermind/index.html', preview: 'games/Puzzle/Mastermind/preview.webp', icon: 'fas fa-circle-dot', desc: 'Classic code-breaking deduction game.' },
        { name: 'Nonogram', lang: 'no_need', path: 'games/Puzzle/Nonogram/index.html', preview: 'games/Puzzle/Nonogram/preview.webp', icon: 'fas fa-table-cells', desc: 'Logic picture-filling puzzle game.' },
        { name: 'Lights Out', lang: 'no_need', path: 'games/Puzzle/Lights-Out/index.html', preview: 'games/Puzzle/Lights-Out/preview.webp', icon: 'fas fa-lightbulb', desc: 'Classic lights-out puzzle game.' },
        { name: 'Color Flood', lang: 'little', path: 'games/Puzzle/Color-Flood/index.html', preview: 'games/Puzzle/Color-Flood/preview.webp', icon: 'fas fa-fill-drip', desc: 'AI-generated color flood fill puzzle.' },
        { name: 'Firefly Jar', lang: 'no_need', path: 'games/Puzzle/Firefly-Jar/index.html', preview: 'games/Puzzle/Firefly-Jar/preview.webp', icon: 'fas fa-bug', desc: 'AI-generated firefly collecting game.' },
        { name: 'Rubik\'s Cube', lang: 'no_need', path: 'games/Puzzle/Rubiks-Cube/index.html', preview: 'games/Puzzle/Rubiks-Cube/preview.webp', icon: 'fas fa-cube', desc: 'AI-generated 3D Rubik\'s cube game.' },
        { name: 'Tower of Hanoi 3D', lang: 'no_need', path: 'games/Puzzle/Tower-of-Hanoi/index.html', preview: 'games/Puzzle/Tower-of-Hanoi/preview.webp', icon: 'fas fa-layer-group', desc: 'AI-generated classic Tower of Hanoi puzzle.' },
        { name: 'Alibi', lang: 'little', path: 'games/Puzzle/Alibi/index.html', preview: 'games/Puzzle/Alibi/preview.webp', icon: 'fas fa-search', desc: 'AI-generated deduction puzzle.' },
        { name: 'Alphabet Typing Speed Game', lang: 'little', path: 'games/Puzzle/Alphabet/index.html', preview: 'games/Puzzle/Alphabet/preview.webp', icon: 'fas fa-font', desc: 'AI-generated letter game.' },
        { name: 'Pawpurr', lang: 'no_need', path: 'games/Puzzle/Animals/index.html', preview: 'games/Puzzle/Animals/preview.webp', icon: 'fas fa-paw', desc: 'AI-generated animal memory game.' },
        { name: 'Blind Crest', lang: 'no_need', path: 'games/Puzzle/Blind-Crest/index.html', preview: 'games/Puzzle/Blind-Crest/preview.webp', icon: 'fas fa-chess-knight', desc: 'AI-generated crest puzzle.' },
        { name: 'Color Guessing', lang: 'little', path: 'games/Puzzle/Color-Guessing/index.html', preview: 'games/Puzzle/Color-Guessing/preview.webp', icon: 'fas fa-palette', desc: 'AI-generated color guessing game.' },
        { name: 'Deep Miner', lang: 'little', path: 'games/Puzzle/Deep-Miner/index.html', preview: 'games/Puzzle/Deep-Miner/preview.webp', icon: 'fas fa-mountain', desc: 'AI-generated mining puzzle.' },
        { name: 'Emoji Puzzle Mania', lang: 'no_need', path: 'games/Puzzle/Emoji-Puzzle-Mania/index.html', preview: 'games/Puzzle/Emoji-Puzzle-Mania/preview.webp', icon: 'fas fa-puzzle-piece', desc: 'AI-generated emoji puzzle game.' },
        { name: 'The Hollow', lang: 'no_need', path: 'games/Puzzle/Escape-the-Maze/index.html', preview: 'games/Puzzle/Escape-the-Maze/preview.webp', icon: 'fas fa-route', desc: 'AI-generated maze escape.' },
        { name: 'Escapement', lang: 'little', path: 'games/Puzzle/Escapement/index.html', preview: 'games/Puzzle/Escapement/preview.webp', icon: 'fas fa-cog', desc: 'AI-generated mechanical puzzle.' },
        { name: 'FATHOM', lang: 'little', path: 'games/Puzzle/Fathom/index.html', preview: 'games/Puzzle/Fathom/preview.webp', icon: 'fas fa-water', desc: 'AI-generated deep-sea puzzle.' },
        { name: 'Five Rungs', lang: 'little', path: 'games/Puzzle/Five-Rungs/index.html', preview: 'games/Puzzle/Five-Rungs/preview.webp', icon: 'fas fa-stairs', desc: 'AI-generated ladder puzzle.' },
        { name: 'Glyphgate', lang: 'little', path: 'games/Puzzle/Glyphgate/index.html', preview: 'games/Puzzle/Glyphgate/preview.webp', icon: 'fas fa-door-open', desc: 'AI-generated rune puzzle.' },
        { name: 'Neural Overload', lang: 'no_need', path: 'games/Puzzle/Memory-Match/index.html', preview: 'games/Puzzle/Memory-Match/preview.webp', icon: 'fas fa-brain', desc: 'AI-generated memory match game.' },
        { name: 'Mind Meter', lang: 'little', path: 'games/Puzzle/Mind-Meter/index.html', preview: 'games/Puzzle/Mind-Meter/preview.webp', icon: 'fas fa-brain', desc: 'AI-generated mind puzzle.' },
        { name: 'Nine Holes', lang: 'no_need', path: 'games/Puzzle/Nine-Holes/index.html', preview: 'games/Puzzle/Nine-Holes/preview.webp', icon: 'fas fa-circle', desc: 'AI-generated nine-hole strategy game.' },
        { name: 'Selfsame', lang: 'little', path: 'games/Puzzle/Selfsame/index.html', preview: 'games/Puzzle/Selfsame/preview.webp', icon: 'fas fa-copy', desc: 'AI-generated mirror puzzle.' },
        { name: 'Tilt Maze', lang: 'no_need', path: 'games/Puzzle/Tilt-Maze/index.html', preview: 'games/Puzzle/Tilt-Maze/preview.webp', icon: 'fas fa-compass', desc: 'AI-generated gravity maze.' },
        { name: 'Highlight', lang: 'text', path: 'games/Puzzle/Word-Search/index.html', preview: 'games/Puzzle/Word-Search/preview.webp', icon: 'fas fa-search', desc: 'AI-generated word search game.' },
        { name: 'Jigsaw HTML', lang: 'no_need', path: 'games/Puzzle/Jigsaw-HTML/index.html', preview: 'games/Puzzle/Jigsaw-HTML/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated web jigsaw puzzle game.', isNew: true },
        { name: 'Hot Cold', lang: 'little', path: 'games/Puzzle/hot-cold-hunt/index.html', preview: 'games/Puzzle/hot-cold-hunt/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated hot-cold treasure hunt game.', isNew: true },
        { name: 'Maze Walker', lang: 'no_need', path: 'games/Puzzle/maze-walker/index.html', preview: 'games/Puzzle/maze-walker/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated maze exploration game.', isNew: true },
        { name: 'Text Adventure', lang: 'text', path: 'games/Puzzle/text-adventure/index.html', preview: 'games/Puzzle/text-adventure/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated text adventure game.', isNew: true },
        { name: 'Abacus', lang: 'little', path: 'games/Puzzle/abacus/index.html', preview: 'games/Puzzle/abacus/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated abacus calculation game.', isNew: true },
        { name: 'Convergence', lang: 'little', path: 'games/Puzzle/convergence/index.html', preview: 'games/Puzzle/convergence/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated convergence puzzle game.', isNew: true },
        { name: 'Floodline', lang: 'little', path: 'games/Puzzle/floodline/index.html', preview: 'games/Puzzle/floodline/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated flood simulation puzzle game.', isNew: true },
        { name: 'Wordform', lang: 'text', path: 'games/Casual/wordform/index.html', preview: 'games/Casual/wordform/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated word-building puzzle game.', isNew: true },
        { name: '6Oct', lang: 'little', path: 'games/Puzzle/6oct/index.html', preview: 'games/Puzzle/6oct/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated 6Oct game.', isNew: true },
        { name: 'Cargo Stack', lang: 'little', path: 'games/Puzzle/cargo-stack/index.html', preview: 'games/Puzzle/cargo-stack/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Cargo Stack game.', isNew: true },
        { name: 'Circuit Bulb', lang: 'little', path: 'games/Puzzle/circuit-bulb/index.html', preview: 'games/Puzzle/circuit-bulb/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Circuit Bulb game.', isNew: true },
        { name: 'Colour Pour', lang: 'little', path: 'games/Puzzle/colour-pour/index.html', preview: 'games/Puzzle/colour-pour/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Colour Pour game.', isNew: true },
        { name: 'Connected', lang: 'little', path: 'games/Puzzle/connected/index.html', preview: 'games/Puzzle/connected/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Connected game.', isNew: true },
        { name: 'Cut Rope', lang: 'little', path: 'games/Puzzle/cut-rope/index.html', preview: 'games/Puzzle/cut-rope/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Cut Rope game.', isNew: true },
        { name: 'Four Dots', lang: 'little', path: 'games/Puzzle/four-dots/index.html', preview: 'games/Puzzle/four-dots/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Four Dots game.', isNew: true },
        { name: 'Hex Puzzle', lang: 'little', path: 'games/Puzzle/hex-puzzle/index.html', preview: 'games/Puzzle/hex-puzzle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Hex Puzzle game.', isNew: true },
        { name: 'Laser Bounce', lang: 'little', path: 'games/Puzzle/laser-bounce/index.html', preview: 'games/Puzzle/laser-bounce/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Laser Bounce game.', isNew: true },
        { name: 'Line Trap', lang: 'little', path: 'games/Puzzle/line-trap/index.html', preview: 'games/Puzzle/line-trap/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Line Trap game.', isNew: true },
        { name: 'Link', lang: 'little', path: 'games/Puzzle/link/index.html', preview: 'games/Puzzle/link/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Link game.', isNew: true },
        { name: 'Memory', lang: 'no_need', path: 'games/Puzzle/memory/index.html', preview: 'games/Puzzle/memory/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Memory game.', isNew: true },
        { name: 'Memory Cards', lang: 'no_need', path: 'games/Puzzle/memory-cards/index.html', preview: 'games/Puzzle/memory-cards/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Memory Cards game.', isNew: true },
        { name: 'Number Merge', lang: 'little', path: 'games/Puzzle/number-merge/index.html', preview: 'games/Puzzle/number-merge/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Number Merge game.', isNew: true },
        { name: 'Pairing', lang: 'little', path: 'games/Puzzle/pairing/index.html', preview: 'games/Puzzle/pairing/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Pairing game.', isNew: true },
        { name: 'Pathfinder', lang: 'little', path: 'games/Puzzle/pathfinder/index.html', preview: 'games/Puzzle/pathfinder/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Pathfinder game.', isNew: true },
        { name: 'Perfect Square', lang: 'little', path: 'games/Puzzle/perfect-square/index.html', preview: 'games/Puzzle/perfect-square/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Perfect Square game.', isNew: true },
        { name: 'Screw Master', lang: 'little', path: 'games/Puzzle/screw-master/index.html', preview: 'games/Puzzle/screw-master/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Screw Master game.', isNew: true },
        { name: 'Shape Fitter', lang: 'little', path: 'games/Puzzle/shape-fitter/index.html', preview: 'games/Puzzle/shape-fitter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Shape Fitter game.', isNew: true },
        { name: 'Signal Circuit', lang: 'little', path: 'games/Puzzle/signal-circuit/index.html', preview: 'games/Puzzle/signal-circuit/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Signal Circuit game.', isNew: true },
        { name: 'Slide Puzzle', lang: 'little', path: 'games/Puzzle/slide-puzzle/index.html', preview: 'games/Puzzle/slide-puzzle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Slide Puzzle game.', isNew: true },
        { name: 'Square One', lang: 'little', path: 'games/Puzzle/square-one/index.html', preview: 'games/Puzzle/square-one/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Square One game.', isNew: true },
        { name: 'Tile Tap', lang: 'little', path: 'games/Puzzle/tile-tap/index.html', preview: 'games/Puzzle/tile-tap/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Tile Tap game.', isNew: true },
        { name: 'Unruly', lang: 'little', path: 'games/Puzzle/unruly/index.html', preview: 'games/Puzzle/unruly/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Unruly game.', isNew: true },
        { name: 'Math Quest', lang: 'little', path: 'games/Puzzle/math-quest/index.html', preview: 'games/Puzzle/math-quest/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Math Quest game.', isNew: true },
        { name: 'Words Of Wonder', lang: 'little', path: 'games/Puzzle/words-of-wonder/index.html', preview: 'games/Puzzle/words-of-wonder/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Words Of Wonder game.', isNew: true },
        { name: 'Silent Meridian', lang: 'little', path: 'games/Astra/Silent-Meridian/index.html', preview: 'games/Astra/Silent-Meridian/preview.webp', icon: 'fas fa-compass', desc: 'Silent Meridian: a web puzzle game.' },
        { name: 'CityMaker', lang: 'no_need', path: 'games/Puzzle/CityMaker/index.html', preview: 'games/Puzzle/CityMaker/preview.webp', icon: 'fas fa-gamepad', desc: 'Play 2048 on a 4x4 block: merge identical buildings and climb an eleven-level building ladder from traditional homes to a city skyline.\', author: \'Derek Wang\', source: \'astragames 收录（开源）\', github: \'https://github.com/derek-wangpch/OpenCityMaker' },
        { name: 'Sunjing Puzzles', lang: 'no_need', path: 'games/Puzzle/Sunjing-Puzzles/index.html', preview: 'games/Puzzle/Sunjing-Puzzles/preview.webp', icon: 'fas fa-gamepad', desc: 'Disassemble six-piece interlocking wooden locks on a 3D woodworking stand, tackle two Klotski layouts with hints and move-undo.\', author: \'MartinDelophy\', source: \'astragames 收录（开源）\', github: \'https://github.com/MartinDelophy/awesome-gpt-6-astra' },
        { name: 'The Fourth Knock', lang: 'little', path: 'games/Puzzle/The-Fourth-Knock/index.html', preview: 'games/Puzzle/The-Fourth-Knock/preview.webp', icon: 'fas fa-gamepad', desc: 'Explore Cedar House, talk to strangers, and piece together the truth of a locked-room murder in this short 2.5D detective adventure.\', author: \'Nikhil Desai\', source: \'astragames 收录（开源）\', github: \'https://github.com/nikhilsatishdesai/the-fourth-knock' },
        { name: 'Cialdini 3D', lang: 'text', added: '2026-10-20', path: 'games/Puzzle/Cialdini-3D/index.html', preview: '', icon: '🧩', desc: '3D spatial puzzle: move, observe and trigger mechanisms in a three-dimensional scene.', isNew: true },
        { name: 'Sliding Puzzle', lang: 'no_need', added: '2026-10-20', path: 'games/Puzzle/Sliding-Puzzle-Game/index.html', preview: 'games/Puzzle/Sliding-Puzzle-Game/preview.webp', icon: '🔢', desc: 'A number Klotski sliding puzzle: slide scrambled tiles back into order.', isNew: true },
        { name: 'Tilt Labyrinth', lang: 'no_need', added: '2026-11-13', path: 'https://blog.silencestar.com/posts/tilt-labyrinth/play/', preview: '', icon: 'fas fa-gamepad', desc: 'A wooden ball maze in 2,000 lines of three.js. Fable profiled it from 55 ms to 9 ms per frame on its own.', nameZh: '木头滚珠迷宫', descZh: 'three.js 2000 行，它自己把单帧从 55ms 优化到 9ms', author: 'mylifcc', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 32, post: 'https://x.com/mylifcc/status/2120054646282870910', external: true, isNew: true },
        { name: 'IRONDUSK — Yard 7', lang: 'no_need', added: '2026-11-13', path: 'https://qiaomu.t5t6.com/irondusk-yard-7/', preview: '', icon: 'fas fa-gamepad', desc: 'One prompt asking for a tiny FPS level that can keep up with AAA visuals. A second prompt made a 3D brick breaker with AI and two-player modes.', nameZh: 'IRONDUSK — Yard 7 射击关卡', descZh: '一条提示词要一个 3A 画风的小关卡；另一条做了支持 AI 和双人对战的 3D 打砖块', author: 'vista8', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 20, post: 'https://x.com/vista8/status/2120383046239285264', external: true, isNew: true },
        { name: 'Thimble Knights', lang: 'no_need', added: '2026-11-13', path: 'https://www.aigameshare.com/games/animal-card-battle-game?play=1&mode=fullscreen', preview: '', icon: 'fas fa-gamepad', desc: 'A real-time animal card battle game.', nameZh: 'Thimble Knights 动物卡牌对战', descZh: '实时策略卡牌对战，角色是一群可爱小动物', author: '_nilni', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 34, post: 'https://x.com/_nilni/status/2120435983032447382', external: true, isNew: true },
        { name: 'BRIX \'84', lang: 'no_need', added: '2026-11-13', path: 'https://remix.gg/g/brix-84', preview: '', icon: 'fas fa-gamepad', desc: 'Block breaker that gets wild after the second power-up.', nameZh: 'BRIX \'84 打砖块', descZh: '看似普通打砖块，吃到第二个道具后画风突变', author: '0xChuckstock', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 23, post: 'https://x.com/0xChuckstock/status/2120896397839126579', external: true, isNew: true },
        { name: 'Dawnlings — tilt the valley, roll the blobs', lang: 'no_need', added: '2026-11-18', path: 'https://kengoworks.itch.io/dawnlings', preview: '', icon: 'fas fa-gamepad', desc: 'A browser game inspired by LocoRoco: you tilt the land so sleepy blobs roll, split and merge, waking the valley into color. Sound effects and concept art were generated on fal.', nameZh: 'Dawnlings 倾斜山谷滚团子', descZh: '致敬 PSP 上 LocoRoco 的浏览器游戏：不直接控制小团子，而是倾斜整个山谷让它们滚动、分裂、合体，把沉睡的世界一点点唤醒；音效和概念图用 fal 生成', author: 'kevin_t_ngo', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 477, post: 'https://x.com/kevin_t_ngo/status/2122969346935017497', external: true, isNew: true },
        { name: 'DRIFT: Veresk-9', lang: 'no_need', added: '2026-11-20', path: 'http://drift.harma.cc/en', preview: '', icon: 'fas fa-gamepad', desc: 'A first-person 3D space puzzle game in the browser. Fly to a dead mining station in the asteroid belt to silence its beacon, and find the crew never evacuated.', nameZh: 'DRIFT: Veresk-9 小行星带空间站解谜', descZh: '第一人称 3D 太空解谜：23 世纪小行星带，飞去一座死掉的采矿站关掉信标，却发现船员从没撤离；有聊天记录、语音日志和藏起来的秘密，桌面浏览器直接玩', author: 'Rencrypta', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 21, post: 'https://x.com/Rencrypta/status/2123527249064321465', external: true, isNew: true }
    ],
    Action: [
        { name: 'Miami Flap', lang: 'no_need', added: '2026-10-10', path: 'games/Action/miami-flap/index.html', preview: 'games/Action/miami-flap/preview.webp', icon: '🐦', desc: 'Flap through neon pipes, collect stars and nail precise passes for bonuses; classic and chaos modes add shields, magnets and unlockable skins.' },
        { name: 'HOLLOWMARK', lang: 'little', added: '2026-10-10', path: 'games/Action/hollowmark/index.html', preview: 'games/Action/hollowmark/preview.webp', icon: '🎮', desc: 'First-person exploration of an industrial underground: find keycards, manage ammo and fight enemies in campaign mode.' },
        { name: 'Canyon Overdrive', lang: 'no_need', added: '2026-10-10', path: 'games/Action/canyon-overdrive/index.html', preview: 'games/Action/canyon-overdrive/preview.webp', icon: '🎮', desc: 'Pilot a fighter through neon canyons, dodge fire and break through blockades with cannons, missiles and rolls.' },
        { name: 'Flight 1073', lang: 'no_need', added: '2026-10-10', path: 'games/Action/flight-1073/index.html', preview: 'games/Action/flight-1073/preview.webp', icon: '✈️', desc: 'A Hebrew aviation parody: dodge meal carts, complete timed tasks and try to land the plane.' },
        { name: 'FOE TO FLEET', lang: 'no_need', added: '2026-10-10', path: 'games/Action/foe-to-fleet/index.html', preview: 'games/Action/foe-to-fleet/preview.webp', icon: '🎮', desc: 'Enlist defeated enemies into your fleet; companions serve as weapons and shields across seven waves of bullet-hell combat.' },
        { name: 'MoxRide', lang: 'no_need', added: '2026-10-10', path: 'games/Action/moxride/index.html', preview: 'games/Action/moxride/preview.webp', icon: '🎮', desc: 'Bomb downhill on a skateboard through a colorful city, grinding rails and chaining tricks for combo scores.' },
        { name: 'Midway 1942', lang: 'little', added: '2026-10-10', path: 'games/Action/midway-1942/index.html', preview: 'games/Action/midway-1942/preview.webp', icon: '🐟', desc: 'Fight interceptors with your wingman, break through flak and dive-bomb two carriers; use predicted drop points to time gravity bombs, then resupply and strike again.' },
        { name: 'JellyBlob', lang: 'no_need', added: '2026-10-10', path: 'games/Action/jellyblob/index.html', preview: 'games/Action/jellyblob/preview.webp', icon: '🎮', desc: 'Multiplayer jelly arena: collect drops, trap rivals with trail loops and jump to safety; small blobs can outmaneuver bigger ones.' },
        { name: 'Stadium Elite', lang: 'little', added: '2026-10-10', path: 'games/Action/stadium-elite/index.html', preview: 'games/Action/stadium-elite/preview.webp', icon: '🎮', desc: 'Play an 11-a-side Barcelona vs Real Madrid match in 3D: pass, shoot and switch players.' },
        { name: 'Magic Carpet Wizard', lang: 'little', added: '2026-10-10', path: 'games/Action/magic-carpet/index.html', preview: 'games/Action/magic-carpet/preview.webp', icon: '🎮', desc: 'Fly a magic carpet around a spherical world, thread rings, cast spells and challenge enemies and bosses.' },
        { name: 'Iron Bastion', lang: 'little', added: '2026-10-10', path: 'games/Action/iron-bastion/index.html', preview: 'games/Action/iron-bastion/preview.webp', icon: '🎮', desc: 'Drive a 3D tank across six war zones, repel enemy waves and defend beacons; destroyable brick walls, tactical dash and EMP.' },
        { name: 'Stick Fighter', lang: 'no_need', added: '2026-10-10', path: 'games/Action/stick-fighter/index.html', preview: 'games/Action/stick-fighter/preview.webp', icon: '🎮', desc: 'An in-development stickman fighter with punch-kick combos, uppercuts, shurikens and blocks; practice vs CPU plus online and friend modes.' },
        { name: 'Gogh Strike', lang: 'little', added: '2026-10-10', path: 'games/Action/gogh-strike/index.html', preview: 'games/Action/gogh-strike/preview.webp', icon: '🎮', desc: 'A first-person paint battle in Van Gogh style with six artists, unique weapons and a race to 20 points.' },
        { name: 'Cinderfall', lang: 'little', added: '2026-10-10', path: 'games/Action/cinderfall/index.html', preview: 'games/Action/cinderfall/preview.webp', icon: '🎮', desc: 'A fantasy arena for four heroes with six skill trees and solo AI battles, plus online rooms.' },
        { name: 'Oz Breakdance', lang: 'little', added: '2026-10-10', path: 'games/Action/breakdance/index.html', preview: 'games/Action/breakdance/preview.webp', icon: '🎮', desc: 'Drag the ragdoll dancer\'s limbs and head onto targets to score and extend your breakdance round.' },
        { name: 'Astral War', lang: 'little', added: '2026-10-10', path: 'games/Action/astral-war/index.html', preview: 'games/Action/astral-war/preview.webp', icon: '🎮', desc: 'WWII browser FPS: choose soldier or zombie skins, tweak loadouts, with bot training and lobby modes.' },
        { name: 'FLOP CLUB', lang: 'little', added: '2026-10-10', path: 'games/Action/flop-club/index.html', preview: 'games/Action/flop-club/preview.webp', icon: '🎮', desc: 'Launch from three diving platforms, perform flips and twists, and nail floating rings to score higher.' },
        { name: 'Vector Dive', lang: 'no_need', added: '2026-10-10', path: 'games/Action/vector-dive/index.html', preview: 'games/Action/vector-dive/preview.webp', icon: '🎮', desc: 'Fly through a neon wireframe track that speeds up each lap, using boosts and phase-shift to survive longer.' },
        { name: 'Harbor Skirmish', lang: 'little', added: '2026-10-10', path: 'games/Action/harbor-skirmish/index.html', preview: 'games/Action/harbor-skirmish/preview.webp', icon: '🎮', desc: 'Repel waves of rabbit invaders in a seaside town, switching between three weapons with rooftop routes, dashes and grappling hooks.' },
        { name: 'Underground Boxing', lang: 'little', added: '2026-10-10', path: 'games/Action/underground-boxing/index.html', preview: 'games/Action/underground-boxing/preview.webp', icon: '🎮', desc: 'Three rounds of underground 3D boxing: balance punches, blocks, dodges and stamina.' },
        { name: 'Urban Champion 3D', lang: 'little', added: '2026-10-10', path: 'games/Action/urban-champion-3d/index.html', preview: 'games/Action/urban-champion-3d/preview.webp', icon: '🎮', desc: 'Trade high and low punches and blocks in a sunset street, push rivals into manholes and dodge falling flowerpots.' },
        { name: 'Zero District Shells 3D', lang: 'no_need', added: '2026-10-10', path: 'games/Action/zero-district-shells-3d/index.html', preview: 'games/Action/zero-district-shells-3d/preview.webp', icon: '🎮', desc: 'Hold out for three minutes in a city siege: auto-fire, strafe, avoid enemy hordes, pick up XP and choose upgrades.' },
        { name: 'ASCII DISTRICT', lang: 'no_need', added: '2026-10-10', path: 'games/Action/ascii-district/index.html', preview: 'games/Action/ascii-district/preview.webp', icon: '🎮', desc: 'Battle virus enemies in a first-person ASCII arena with dashes, jumps and slides across continuous waves.' },
        { name: 'Aura Farming', lang: 'little', added: '2026-10-10', path: 'games/Action/aura-farming/index.html', preview: 'games/Action/aura-farming/preview.webp', icon: '🎮', desc: 'Balance dancing capybaras on a dragon-boat prow, counter the waves and complete six moves in 40 seconds.' },
        { name: 'CHRONO RAID', lang: 'no_need', added: '2026-10-10', path: 'games/Action/chrono-raid/index.html', preview: 'games/Action/chrono-raid/preview.webp', icon: '🎮', desc: 'Pick SUZUNE\'s close combos or AOI\'s ranged attacks, dodge mech bosses and trigger cinematic finishers.' },
        { name: 'MR', lang: 'no_need', added: '2026-10-10', path: 'games/Action/mr-nips/index.html', preview: 'games/Action/mr-nips/preview.webp', icon: '🎮', desc: 'Steer a pixel hero through drones with auto twin lasers, gathering energy to unleash a screen-clearing Nova.' },
        { name: 'Billionaire Pit', lang: 'little', added: '2026-10-10', path: 'games/Action/billionaire-pit/index.html', preview: 'games/Action/billionaire-pit/preview.webp', icon: '🎮', desc: 'Choose a satirical billionaire and battle the CPU across three tournament rounds with punches, kicks, blocks and dodges.' },
        { name: 'Nightborn Clash', lang: 'little', added: '2026-10-10', path: 'games/Action/nightborn-clash/index.html', preview: 'games/Action/nightborn-clash/preview.webp', icon: '🎮', desc: 'Pick one of four vampire fighters, chain normals, charge skills and supers in practice mode or 99-second CPU duels.' },
        { name: 'Dust II Ops', lang: 'no_need', added: '2026-10-10', path: 'games/Action/dust-ii-ops/index.html', preview: 'games/Action/dust-ii-ops/preview.webp', icon: '🎮', desc: 'Battle bots on a desert map across deathmatch, team, demolition or zombie modes, switching gear with optional invincibility and flight assists.' },
        { name: 'Thornwake', lang: 'no_need', added: '2026-10-10', path: 'games/Action/thornwake/index.html', preview: 'games/Action/thornwake/preview.webp', icon: '🎮', desc: 'An insect-themed action roguelite: slash with a needle blade, jump and dash through tangled rooms, collecting silk and ember seeds.' },
        { name: 'DEAD END', lang: 'little', added: '2026-10-10', path: 'games/Action/dead-end/index.html', preview: 'games/Action/dead-end/preview.webp', icon: '🎮', desc: 'Defend the Oakridge neighborhood from infected waves; 3D mode adds three relays to fix, flares and extraction goals.' },
        { name: 'Anime Rift', lang: 'no_need', added: '2026-10-10', path: 'games/Action/anime-rift/index.html', preview: 'games/Action/anime-rift/preview.webp', icon: '🎮', desc: 'Wield 13 anime and original characters across three arenas with flight, specials and ring-outs; solo CPU practice included.' },
        { name: 'VeilFall', lang: 'text', added: '2026-10-10', path: 'games/Action/veilfall/index.html', preview: 'games/Action/veilfall/preview.webp', icon: '🎮', desc: 'Explore a lush 3D valley and face a three-wave trial as the Crimson Dreadlord; an in-development MOBA-style prototype.' },
        { name: 'Butterball Run', lang: 'no_need', added: '2026-10-10', path: 'games/Action/butterball-run/index.html', preview: 'games/Action/butterball-run/preview.webp', icon: '🎮', desc: 'Move a butter ball around the plate, rescue eight mussels in 60 seconds, dodge moving asparagus and preserve butter energy.' },
        { name: 'Tideglass Hunt', lang: 'little', added: '2026-10-10', path: 'games/Action/tideglass-hunt/index.html', preview: 'games/Action/tideglass-hunt/preview.webp', icon: '🎮', desc: 'Pick steel, storm or frost abilities, explore coastal combat scenes, and match skills against monsters; timed hunts can start solo.' },
        { name: 'Canteen Crashers', lang: 'no_need', added: '2026-10-10', path: 'games/Action/canteen-crashers/index.html', preview: 'games/Action/canteen-crashers/preview.webp', icon: '🎮', desc: 'Find three recipes in canteen crates and return them to the kitchen, using gear and tray slides to dodge the head chef; the demo adds three CPU teammates.' },
        { name: 'Komorebi Kinomi', lang: 'little', added: '2026-10-10', path: 'games/Action/komorebi-kinomi/index.html', preview: 'games/Action/komorebi-kinomi/preview.webp', icon: '🎮', desc: 'Move a little forest spirit to catch fruits and sparkles and avoid falling leaves, chasing a 300-point goal in 60 seconds.' },
        { name: 'PATCH', lang: 'no_need', added: '2026-10-10', path: 'games/Action/patch/index.html', preview: 'games/Action/patch/preview.webp', icon: '🎮', desc: 'Pilot a mochi hero out of safe territory, draw closed loops to claim land, and dodge 14 CPU rivals cutting off exposed paths.' },
        { name: 'DEADBLOCK', lang: 'little', added: '2026-10-10', path: 'games/Action/deadblock-outbreak/index.html', preview: 'games/Action/deadblock-outbreak/preview.webp', icon: '🎮', desc: 'Survive escalating zombie waves across six maps, scavenging supplies and unlocking weapons, barricades and field upgrades.' },
        { name: 'Dropzone Royale', lang: 'no_need', added: '2026-10-10', path: 'games/Action/dropzone-royale/index.html', preview: 'games/Action/dropzone-royale/preview.webp', icon: '🎮', desc: 'Drop onto an island with 39 CPU rivals, raid buildings for gear, and survive a shrinking storm in top-down survival combat.' },
        { name: 'Mog Mode', lang: 'little', added: '2026-10-10', path: 'games/Action/mog-mode/index.html', preview: 'games/Action/mog-mode/preview.webp', icon: '🎮', desc: 'Play an exaggerated tech-CEO mogul: time five handshakes right and win four to take the photo\'s center spot; an unofficial parody.' },
        { name: 'The Crownless', lang: 'text', added: '2026-10-10', path: 'games/Action/the-crownless/index.html', preview: 'games/Action/the-crownless/preview.webp', icon: '🎮', desc: 'Climb a sandstone citadel with fighting combos, collect souls for new abilities and challenge the king; death loses the current run.' },
        { name: 'Until the Crown Falls', lang: 'little', added: '2026-10-10', path: 'games/Action/until-the-crown-falls/index.html', preview: 'games/Action/until-the-crown-falls/preview.webp', icon: '🎮', desc: 'Defend the king in endless siege: gather steel, command guards; the king\'s health does not regenerate.' },
        { name: 'u', lang: 'little', added: '2026-10-10', path: 'games/Action/universe-duel/index.html', preview: 'games/Action/universe-duel/preview.webp', icon: '🎮', desc: 'Choose a mech and duel behind cover with dashes, homing missiles, laser swords and plasma bursts.' },
        { name: 'RUNNER', lang: 'no_need', added: '2026-10-10', path: 'games/Action/runner-stage-1/index.html', preview: 'games/Action/runner-stage-1/preview.webp', icon: '🎮', desc: 'A Contra-inspired side-scrolling prototype: cross jungle bridges, shoot enemies and push toward the fortress.' },
        { name: 'DRONE', lang: 'no_need', added: '2026-10-10', path: 'games/Action/drone-io/index.html', preview: 'games/Action/drone-io/preview.webp', icon: '🌐', desc: 'Fly a drone in a local arena against CPU rivals, using radar to find openings and upgrade progressively.' },
        { name: 'Knightmare', lang: 'no_need', added: '2026-10-10', path: 'games/Action/knightmare-medusa/index.html', preview: 'games/Action/knightmare-medusa/preview.webp', icon: '🎮', desc: 'Shoot, dodge and unleash purification against Medusa in an unofficial 3D boss-fight adaptation of Knightmare.' },
        { name: 'Archery', lang: 'little', path: 'games/Action/Archery/index.html', preview: 'games/Action/Archery/preview.webp', icon: 'fas fa-bullseye', desc: 'Archery competition.' },
        { name: 'Mount & Blade', lang: 'little', path: 'games/Action/Archery-3D/index.html', preview: 'games/Action/Archery-3D/preview.webp', icon: 'fas fa-horse-head', desc: 'Mount & Blade: 3D mounted melee combat.' },
        { name: 'Breakout', lang: 'no_need', path: 'games/Action/Breakout/index.html', preview: 'games/Action/Breakout/preview.webp', icon: 'fas fa-cube', hot: true, desc: 'Breakout brick-breaker game.' },
        { name: 'Crossy Road', lang: 'little', path: 'games/Action/Crossy-Road/index.html', preview: 'games/Action/Crossy-Road/preview.webp', icon: 'fas fa-road', desc: 'Crossy road crossing challenge.' },
        { name: 'Emoji Catcher', lang: 'little', path: 'games/Action/Emoji-Catcher/index.html', preview: 'games/Action/Emoji-Catcher/preview.webp', icon: 'fas fa-smile', desc: 'Emoji catching game.' },
        { name: 'Flappy Bird', lang: 'no_need', path: 'games/Action/Flappy-Bird/index.html', preview: 'games/Action/Flappy-Bird/preview.webp', icon: 'fas fa-dove', desc: 'Classic flappy bird.' },
        { name: 'Fruit Slicer', lang: 'little', path: 'games/Action/Fruit-Slicer/index.html', preview: 'games/Action/Fruit-Slicer/preview.webp', icon: 'fas fa-lemon', desc: 'Fruit slicing game.' },
        { name: 'Insect Catch', lang: 'little', path: 'games/Action/Insect-Catch/index.html', preview: 'games/Action/Insect-Catch/preview.webp', icon: 'fas fa-bug', desc: 'Insect catching game.' },
        { name: 'Piano Tiles', lang: 'little', path: 'games/Action/Piano-Tiles/index.html', preview: 'games/Action/Piano-Tiles/preview.webp', icon: 'fas fa-music', desc: 'Don\'t-tap-the-white-tiles game.' },
        { name: 'Ping Pong', lang: 'no_need', path: 'games/Action/Ping-Pong/index.html', preview: 'games/Action/Ping-Pong/preview.webp', icon: 'fas fa-table-tennis-paddle-ball', desc: 'Table tennis duel.' },
        { name: 'Shape Clicker', lang: 'little', path: 'games/Action/Shape-Clicker/index.html', preview: 'games/Action/Shape-Clicker/preview.webp', icon: 'fas fa-shapes', desc: 'Shape clicking game.' },
        { name: 'Whack A Mole', lang: 'little', path: 'games/Action/Whack-A-Mole/index.html', preview: 'games/Action/Whack-A-Mole/preview.webp', icon: 'fas fa-hammer', desc: 'Whack-a-mole game.' },
        { name: 'Dodge Game', lang: 'no_need', path: 'games/Action/Dodge-Game/index.html', preview: 'games/Action/Dodge-Game/preview.webp', icon: 'fas fa-running', desc: '3D obstacle dodge.' },
        { name: 'Space Shooter', lang: 'no_need', path: 'games/Action/Space-Shooter/index.html', preview: 'games/Action/Space-Shooter/preview.webp', icon: 'fas fa-rocket', desc: 'Space shooting game.' },
        { name: 'Platform Game', lang: 'no_need', path: 'games/Action/Platform-Game/index.html', preview: 'games/Action/Platform-Game/preview.webp', icon: 'fas fa-person-running', desc: 'Platform jumping adventure.' },
        { name: 'Reaction Test', lang: 'little', path: 'games/Action/Reaction-Test/index.html', preview: 'games/Action/Reaction-Test/preview.webp', icon: 'fas fa-bolt', desc: 'Reaction speed test.' },
        { name: 'Ink Raiders', lang: 'little', path: 'games/Action/Ink-Raiders/index.html', preview: 'games/Action/Ink-Raiders/preview.webp', icon: 'fas fa-fill-drip', desc: 'Ink Raiders: 3D arena ink-splat kill fest.' },
        { name: 'Odyssey Expedition', lang: 'little', path: 'games/Action/Odyssey-Expedition/index.html', preview: 'games/Action/Odyssey-Expedition/preview.webp', icon: 'fas fa-compass', desc: 'Odyssey Expedition: 3D pirate voyage adventure.' },
        { name: 'Emoji Horde Survival', lang: 'no_need', path: 'games/Action/Emoji-Horde-Survival/index.html', preview: 'games/Action/Emoji-Horde-Survival/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated emoji survival shooter.', isNew: true },
        { name: 'Keyboard Dodger', lang: 'no_need', path: 'games/Action/keyboard-dodger/index.html', preview: 'games/Action/keyboard-dodger/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated keyboard dodge game.', isNew: true },
        { name: 'Aim Trainer', lang: 'little', path: 'games/Action/aim-trainer/index.html', preview: 'games/Action/aim-trainer/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated mouse aim training game.', isNew: true },
        { name: 'Cliffwalkers', lang: 'little', path: 'games/Action/cliffwalkers/index.html', preview: 'games/Action/cliffwalkers/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated cliff walking game.', isNew: true },
        { name: 'Hellcat', lang: 'no_need', path: 'games/Action/hellcat/index.html', preview: 'games/Action/hellcat/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated action shooting game.', isNew: true },
        { name: 'Cosmic Cleaner', lang: 'little', path: 'games/Action/cosmic-cleaner/index.html', preview: 'games/Action/cosmic-cleaner/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Cosmic Cleaner game.', isNew: true },
        { name: 'Orbital Outpost', lang: 'little', path: 'games/Action/orbital-outpost/index.html', preview: 'games/Action/orbital-outpost/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Orbital Outpost game.', isNew: true },
        { name: 'Planet Visitor', lang: 'little', path: 'games/Action/planet-visitor/index.html', preview: 'games/Action/planet-visitor/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Planet Visitor game.', isNew: true },
        { name: 'Planet War', lang: 'little', path: 'games/Action/planet-war/index.html', preview: 'games/Action/planet-war/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Planet War game.', isNew: true },
        { name: 'Antigravity', lang: 'little', path: 'games/Action/antigravity/index.html', preview: 'games/Action/antigravity/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Antigravity game.', isNew: true },
        { name: 'Cool Platformer', lang: 'little', path: 'games/Action/cool-platformer/index.html', preview: 'games/Action/cool-platformer/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Cool Platformer game.', isNew: true },
        { name: 'Devil King', lang: 'little', path: 'games/Action/devil-king/index.html', preview: 'games/Action/devil-king/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Devil King game.', isNew: true },
        { name: 'Doodle Jump', lang: 'no_need', path: 'games/Action/doodle-jump/index.html', preview: 'games/Action/doodle-jump/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Doodle Jump game.', isNew: true },
        { name: 'Flip Jump', lang: 'little', path: 'games/Action/flip-jump/index.html', preview: 'games/Action/flip-jump/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Flip Jump game.', isNew: true },
        { name: 'Level Devil', lang: 'little', path: 'games/Action/level-devil/index.html', preview: 'games/Action/level-devil/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Level Devil game.', isNew: true },
        { name: 'Mario', lang: 'little', path: 'games/Action/mario/index.html', preview: 'games/Action/mario/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Mario game.', isNew: true },
        { name: 'Parkour', lang: 'little', path: 'games/Action/parkour/index.html', preview: 'games/Action/parkour/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Parkour game.', isNew: true },
        { name: 'That Level Again 1', lang: 'little', path: 'games/Action/that-level-again-1/index.html', preview: 'games/Action/that-level-again-1/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated That Level Again 1 game.', isNew: true },
        { name: 'That Level Again 2', lang: 'little', path: 'games/Action/that-level-again-2/index.html', preview: 'games/Action/that-level-again-2/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated That Level Again 2 game.', isNew: true },
        { name: 'That Level Again 3', lang: 'little', path: 'games/Action/that-level-again-3/index.html', preview: 'games/Action/that-level-again-3/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated That Level Again 3 game.', isNew: true },
        { name: 'That Level Again 4', lang: 'little', path: 'games/Action/that-level-again-4/index.html', preview: 'games/Action/that-level-again-4/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated That Level Again 4 game.', isNew: true },
        { name: 'That Level Again 5', lang: 'little', path: 'games/Action/that-level-again-5/index.html', preview: 'games/Action/that-level-again-5/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated That Level Again 5 game.', isNew: true },
        { name: 'Alien Battle', lang: 'little', path: 'games/Action/alien-battle/index.html', preview: 'games/Action/alien-battle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Alien Battle game.', isNew: true },
        { name: 'Bird Shooter', lang: 'little', path: 'games/Action/bird-shooter/index.html', preview: 'games/Action/bird-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Bird Shooter game.', isNew: true },
        { name: 'Cannon Blaster', lang: 'little', path: 'games/Action/cannon-blaster/index.html', preview: 'games/Action/cannon-blaster/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Cannon Blaster game.', isNew: true },
        { name: 'Fighter Fury', lang: 'little', path: 'games/Action/fighter-fury/index.html', preview: 'games/Action/fighter-fury/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Fighter Fury game.', isNew: true },
        { name: 'Fighter Jet', lang: 'little', path: 'games/Action/fighter-jet/index.html', preview: 'games/Action/fighter-jet/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Fighter Jet game.', isNew: true },
        { name: 'Gun Run', lang: 'little', path: 'games/Action/gun-run/index.html', preview: 'games/Action/gun-run/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Gun Run game.', isNew: true },
        { name: 'Gunman', lang: 'little', path: 'games/Action/gunman/index.html', preview: 'games/Action/gunman/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Gunman game.', isNew: true },
        { name: 'Projectile Enemy', lang: 'little', path: 'games/Action/projectile-enemy/index.html', preview: 'games/Action/projectile-enemy/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Projectile Enemy game.', isNew: true },
        { name: 'Robot Destruction', lang: 'little', path: 'games/Action/robot-destruction/index.html', preview: 'games/Action/robot-destruction/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Robot Destruction game.', isNew: true },
        { name: 'Shadow Shooter', lang: 'little', path: 'games/Action/shadow-shooter/index.html', preview: 'games/Action/shadow-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Shadow Shooter game.', isNew: true },
        { name: 'Shoot Enemy', lang: 'little', path: 'games/Action/shoot-enemy/index.html', preview: 'games/Action/shoot-enemy/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Shoot Enemy game.', isNew: true },
        { name: 'Shooter', lang: 'little', path: 'games/Action/shooter/index.html', preview: 'games/Action/shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Shooter game.', isNew: true },
        { name: 'Sniper', lang: 'little', path: 'games/Action/sniper/index.html', preview: 'games/Action/sniper/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Sniper game.', isNew: true },
        { name: 'Space Fighter', lang: 'little', path: 'games/Action/space-fighter/index.html', preview: 'games/Action/space-fighter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Space Fighter game.', isNew: true },
        { name: 'Survivor', lang: 'little', path: 'games/Action/survivor/index.html', preview: 'games/Action/survivor/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Survivor game.', isNew: true },
        { name: 'Tee Shooter', lang: 'little', path: 'games/Action/tee-shooter/index.html', preview: 'games/Action/tee-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Tee Shooter game.', isNew: true },
        { name: 'Thunder God', lang: 'little', path: 'games/Action/thunder-god/index.html', preview: 'games/Action/thunder-god/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Thunder God game.', isNew: true },
        { name: 'Tower Shooter', lang: 'little', path: 'games/Action/tower-shooter/index.html', preview: 'games/Action/tower-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Tower Shooter game.', isNew: true },
        { name: 'Trench Defence', lang: 'little', path: 'games/Action/trench-defence/index.html', preview: 'games/Action/trench-defence/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Trench Defence game.', isNew: true },
        { name: 'Vaccine Shooter', lang: 'little', path: 'games/Action/vaccine-shooter/index.html', preview: 'games/Action/vaccine-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Vaccine Shooter game.', isNew: true },
        { name: 'Window Shooter', lang: 'little', path: 'games/Action/window-shooter/index.html', preview: 'games/Action/window-shooter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Window Shooter game.', isNew: true },
        { name: 'Last Beacon', lang: 'no_need', path: 'games/Astra/Last-Beacon/index.html', preview: 'games/Astra/Last-Beacon/preview.webp', icon: 'fas fa-tower-broadcast', desc: 'The Last Lighthouse: 3D island tower defense.' },
        { name: 'Dual Realms', lang: 'little', path: 'games/Astra/Dual-Realms/index.html', preview: 'games/Astra/Dual-Realms/preview.webp', icon: 'fas fa-khanda', desc: 'Time Realm: a Chinese side-scrolling action game.' },
        { name: 'Surge For Oinja', lang: 'little', path: 'games/Action/Surge-For-Oinja/index.html', preview: 'games/Action/Surge-For-Oinja/preview.webp', icon: 'fas fa-gamepad', desc: 'A third-person survivor-style game: auto-attack, combine electric skills and support mechs, repair facilities across two maps, build growth paths and face bosses.\', author: \'Olivia\', source: \'astragames 收录（开源）\', github: \'https://github.com/Olivia295/SURGE-for-Oinja' },
        { name: 'Astra Floor', lang: 'no_need', path: 'games/Action/Astra-Floor/index.html', preview: 'games/Action/Astra-Floor/preview.webp', icon: 'fas fa-gamepad', desc: '3D first-person zombie survival shooter: control recoil, manage sprint stamina, wield a katana against escalating hordes and face the final boss.\', author: \'BEROCHLU\', source: \'astragames 收录（开源）\', github: \'https://github.com/BEROCHLU/astrafloor' },
        { name: 'Sandline', lang: 'little', path: 'games/Action/Sandline/index.html', preview: 'games/Action/Sandline/preview.webp', icon: 'fas fa-gamepad', desc: 'Squad with AI teammates in solo 3v3 turn-based desert old-town combat, using cover, guns and grenades to contest A/B bomb sites. MIT-licensed source.\', author: \'xilinnihao-afk\', source: \'astragames 收录（开源）\', github: \'https://github.com/xilinnihao-afk/sandline-threejs-fps' },
        { name: 'Magic Carpet Wizard', lang: 'little', path: 'games/Action/Magic-Carpet-Wizard/index.html', preview: 'games/Action/Magic-Carpet-Wizard/preview.webp', icon: 'fas fa-gamepad', desc: 'Fly a magic carpet around a spherical world, thread rings, cast spells and challenge enemies and bosses.\', author: \'threapchills\', source: \'astragames 收录（开源）\', github: \'https://github.com/threapchills/MagicCarpetWizard' },
        { name: 'Clock Out Unseen', lang: 'little', path: 'games/Action/Clock-Out-Unseen/index.html', preview: 'games/Action/Clock-Out-Unseen/preview.webp', icon: 'fas fa-gamepad', desc: 'Three timed office-stealth levels: hide behind furniture, coffee machines and six-second folder disguises to dodge patrols and reach the elevator.\', author: \'Ryan-fm\', source: \'astragames 收录（开源）\', github: \'https://github.com/Ryan-fm/clockout-unseen' },
        { name: 'Blackwater', lang: 'little', path: 'games/Action/Blackwater/index.html', preview: 'games/Action/Blackwater/preview.webp', icon: 'fas fa-gamepad', desc: 'A tactical FPS infiltrating a rainy-night cargo port with detailed rifles, a combat HUD and nine enemies.\', author: \'hiraeth\', source: \'GitHub 开源仓库\', github: \'https://github.com/Hiraeth010/blackwater' },
        { name: 'Voidbound', lang: 'little', path: 'games/Action/Voidbound/index.html', preview: 'games/Action/Voidbound/preview.webp', icon: 'fas fa-gamepad', desc: 'Battle demons in a church arena with light and heavy sword strikes, dodges and area magic.\', author: \'Alexey Fateev\', source: \'astragames 收录（开源）\', github: \'https://github.com/alesha-pro/bench-portal' },
        { name: 'Neural Sight', lang: 'little', path: 'games/Action/Neural-Sight/index.html', preview: 'games/Action/Neural-Sight/preview.webp', icon: 'fas fa-gamepad', desc: 'Explore a first-person prototype built with Gaussian-splatting scenes, featuring weapon visuals, infected and throwable bouncy balls.\', author: \'Earl Cameron\', source: \'astragames 收录（开源）\', github: \'https://github.com/monstercameron/Neural-Sight' },
        { name: 'Saber Descent', lang: 'little', path: 'games/Action/Saber-Descent/index.html', preview: 'games/Action/Saber-Descent/preview.webp', icon: 'fas fa-gamepad', desc: 'Descend five dungeon floors with an energy blade, chaining slashes, blocks and dashes to defeat guards and find the next portal.\', author: \'Dwayne\', source: \'astragames 收录（开源）\', github: \'https://github.com/Vheissu/saber-battle' },
        { name: 'Mario Mix 2', lang: 'little', path: 'games/Action/Mario-Mix-2/index.html', preview: 'games/Action/Mario-Mix-2/preview.webp', icon: 'fas fa-gamepad', desc: 'Bring Ninja Gaiden\'s Ryu and a Battle City tank into Mario\'s underground level 1-2, with two-character tag-team rescue of the princess.\', author: \'Aha-xiaoQ\', source: \'astragames 收录（开源）\', github: \'https://github.com/Aha-xiaoQ/aha-xiaoq.github.io' },
        { name: 'Odyssey Voyage', lang: 'little', added: '2026-10-20', path: 'games/Action/Odyssey-Voyage/index.html', preview: '', icon: '⛵', desc: 'Set sail on a sea adventure, dodge reefs and storms, collect supplies and explore the Odyssey route.', isNew: true },
        { name: 'Pirate Raid', lang: 'little', added: '2026-10-20', path: 'games/Action/Pirate-Raid/index.html', preview: '', icon: '🏴‍☠️', desc: 'Command a pirate ship on raids: aim and fire, board enemy vessels and plunder ports.', isNew: true },
        { name: 'Pirate Raiders', lang: 'little', added: '2026-10-20', path: 'games/Action/Pirate-Raiders/index.html', preview: '', icon: '🏝️', desc: 'Pirate-themed action platformer: fight across islands and warships, collecting treasure.', isNew: true },
        { name: 'Space Shooter 3D', lang: 'little', added: '2026-10-20', path: 'games/Action/Space-Shooter-3D/index.html', preview: '', icon: '🚀', desc: '3D space flight shooter: pilot a fighter through the stars and shoot down enemy ships.', isNew: true },
        { name: 'Nazi Zombies Portable', lang: 'little', added: '2026-10-20', path: 'games/FPS/Nazi-Zombies-Portable/index.html', preview: '', icon: '🧟', desc: 'A web remake of Call of Duty Nazi Zombies: first-person survival shooting, repairing windows, buying guns and surviving wave after wave.', isNew: true },
        { name: 'Doodle District', lang: 'no_need', added: '2026-10-21', path: 'games/FPS/Doodle-District/index.html', preview: 'games/FPS/Doodle-District/preview.webp', icon: 'fas fa-pen-nib', desc: 'A first-person survival shooter hand-drawn in blue ballpoint on notebook paper: grapple across roofs, parry bullets with a katana, survive waves, with 10-player online mayhem.', author: 'iifor', source: 'GitHub 公开仓库', github: 'https://github.com/iifor/doodleshooter', isNew: true },
        { name: 'Inkwave', lang: 'no_need', added: '2026-10-24', path: 'games/Action/inkwave/index.html', preview: 'games/Action/inkwave/preview.webp', icon: 'fas fa-fill-drip', desc: 'A Splatoon-style 4v4 turf-war shooter in the browser: cover the map in ink, dive and swim as a squid, and splat rival bots with shooters, chargers, rollers and specials.', author: 'Jayden Davis', source: 'GitHub MIT 开源仓库', github: 'https://github.com/DevFrancois/inkwave', isNew: true },
        { name: 'Voxel Musou', lang: 'no_need', added: '2026-10-28', path: 'games/Action/voxel-musou/index.html', preview: 'games/Action/voxel-musou/preview.webp', icon: '⚔️', desc: 'A voxel hack-and-slash battlefield: lead a Three Kingdoms warrior through four historical campaigns, carving through waves of hundreds of soldiers with combos, mounts and musou specials.', author: 'BubuAi', source: 'GitHub MIT 开源仓库', github: 'https://github.com/mike007jd/voxel-musou', isNew: true },
        { name: 'AMAGIRI', lang: 'little', added: '2026-10-31', path: 'games/Action/amagiri/index.html', preview: 'games/Action/amagiri/preview.webp', icon: '⚔️', desc: 'A life-and-death duel in a rain-soaked shrine: dash, parry and slash through the rain curtain in this high-quality 2D sword-fighting game.', author: 'mafeis', source: 'GitHub 公开仓库', github: 'https://github.com/mafeis/amagiri', isNew: true },
        { name: 'Three Kingdoms 3v3', lang: 'text', added: '2026-11-19', path: 'games/Action/Three-Kingdoms-3v3/index.html', preview: 'games/Action/Three-Kingdoms-3v3/preview.webp', icon: '⚔️', desc: 'Browser 3v3 MOBA on a three-lane map: you plus two AI allies against three AI heroes. Seven pickable heroes, lane creeps, towers, XP, gold and item builds. Interface is in Chinese.', nameZh: '三国烽火 3v3', descZh: '三路 3v3 对战：你带两名 AI 队友对阵三名 AI 武将，可选曹仁/关羽/诸葛亮/黄忠/赵云/司马懿/郭嘉', author: 'suipce', source: '自研玩法与数值，3D 基座为自托管改版', isNew: true },
        { name: 'Saltline — first-person shooter', lang: 'no_need', added: '2026-11-13', path: 'https://claude.ai/artifact/BGY1SztrAYcJQHSsnHHGmp', preview: '', icon: 'fas fa-gamepad', desc: 'By an Anthropic engineer. One-shot prompts, no human feedback, 8 hours, ~$550. Models, sounds and textures all generated in code.', nameZh: 'Saltline 第一人称射击', descZh: 'Anthropic 工程师；一次性提示、无人工反馈跑 8 小时，约 $550；模型、音效、贴图全部代码生成', author: 'felixrieseberg', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 14595, post: 'https://x.com/felixrieseberg/status/2119925633564463609', external: true, isNew: true },
        { name: 'Hogwarts Royale', lang: 'no_need', added: '2026-11-13', path: 'https://www.spawn.co/@mattshumer/hogwarts-royale', preview: '', icon: 'fas fa-gamepad', desc: '"Create a mashup of Harry Potter and Fortnite" — a playable battle royale.', nameZh: 'Hogwarts Royale（哈利·波特 × 堡垒之夜）', descZh: '大逃杀玩法', author: 'mattshumer_', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 310, post: 'https://x.com/mattshumer_/status/2119872098306810226', external: true, isNew: true },
        { name: 'Frontline Warfare Deathmatch', lang: 'no_need', added: '2026-11-13', path: 'https://spawn.co/@robot/frontline-warfare-deathmatch', preview: '', icon: 'fas fa-gamepad', desc: 'A Call of Duty-style shooter in the browser.', nameZh: 'Frontline 类 COD 死斗', descZh: '浏览器里的使命召唤式射击', author: 'alightinastorm', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 163, post: 'https://x.com/alightinastorm/status/2120020469487440210', external: true, isNew: true },
        { name: 'Vippi', lang: 'no_need', added: '2026-11-13', path: 'https://vippi.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'A COD-style shooter. The author\'s creepy-game benchmark is linked too.', nameZh: 'Vippi 类 COD 射击', descZh: '', author: 'Shrit1401', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 1, post: 'https://x.com/Shrit1401/status/2120060593763926314', external: true, isNew: true },
        { name: 'Four-character fighting game', lang: 'no_need', added: '2026-11-13', path: 'https://claude.ai/artifact/1QGGhB68jMCjjjeeKtKNUo', preview: '', icon: 'fas fa-gamepad', desc: 'Fable 5.2 + ElevenLabs MCP for 39 voice and sound clips, including an announcer it designed. Desktop + keyboard.', nameZh: '格斗游戏（ElevenLabs 配音）', descZh: 'Fable 5.2 + ElevenLabs MCP，桌面键盘玩', author: 'promodenstudio', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 4, post: 'https://x.com/promodenstudio/status/2120085977079107788', external: true, isNew: true },
        { name: 'Oil Paint — hand-painted game', lang: 'no_need', added: '2026-11-13', path: 'https://patch.gg/blendi/oil-paint', preview: '', icon: 'fas fa-gamepad', desc: 'Made in under an hour. Every frame is about 1.5 million brush strokes, running at 200 fps in a browser tab. Open source.', nameZh: 'Oil Paint 手绘油画风游戏', descZh: '不到一小时做成；每帧约 150 万笔笔触，浏览器里跑 200 帧；开源', author: 'BlendiByl', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 7880, post: 'https://x.com/BlendiByl/status/2120341251178594532', external: true, isNew: true },
        { name: 'Evensong', lang: 'no_need', added: '2026-11-13', path: 'https://evensong-phi.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'A dark-fantasy souls-like boss fight, playable in the browser.', nameZh: 'Evensong 魂系 Boss 战', descZh: '黑暗奇幻风的魂类 Boss 战试玩', author: 'kevin_t_ngo', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 1741, post: 'https://x.com/kevin_t_ngo/status/2120238844754923874', external: true, isNew: true },
        { name: 'Gilt & Gutter', lang: 'no_need', added: '2026-11-13', path: 'https://gilt-and-gutter.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'A 1v1 first-person shooter with two playable characters.', nameZh: 'Gilt & Gutter 1v1 第一人称射击', descZh: '两个可选角色的 1v1 对战', author: 'kevin_t_ngo', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 323, post: 'https://x.com/kevin_t_ngo/status/2119900487688622171', external: true, isNew: true },
        { name: 'Mist-Locked Mountain Gate — 3D action game', lang: 'no_need', added: '2026-11-13', path: 'https://op7418.github.io/guizang-game-skill/', preview: '', icon: 'fas fa-gamepad', desc: 'One afternoon, 4.5 billion tokens. Models, scenes and moves all by Fable, packed into a single 30 MB HTML file.', nameZh: '雾锁山门 3D 动作游戏', descZh: '一个下午、45 亿 token；模型、场景、动作都是它做的，全部装在一个 30MB 的 HTML 里', author: 'op7418', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 1125, post: 'https://x.com/op7418/status/2120694045299327187', external: true, isNew: true },
        { name: 'Fable 5.2 FPS Repro', lang: 'no_need', added: '2026-11-13', path: 'https://wquguru.github.io/fable52-fps-repro/', preview: '', icon: 'fas fa-gamepad', desc: 'Four single-file 3D FPS demos: models, sound and textures all in code. Method and source are open.', nameZh: 'Fable 5.2 FPS 复现（4 个单文件演示）', descZh: '模型、声音、贴图全是代码；方法和源码都开源', author: 'wquguru', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 154, github: 'https://github.com/wquguru/fable52-fps-repro', post: 'https://x.com/wquguru/status/2120383332722905400', external: true, isNew: true },
        { name: 'Lumina Zombies', lang: 'no_need', added: '2026-11-13', path: 'https://luminazombies.com/', preview: '', icon: 'fas fa-gamepad', desc: 'A brand-new map with easter eggs in a few prompts, plus upgrades that halved hardware demand and latency on the other two maps.', nameZh: 'Lumina Zombies 新地图', descZh: '几条提示词做出一张带彩蛋的新地图，并把另外两张图的硬件需求和延迟减半', author: 'LuminaBench', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 124, post: 'https://x.com/LuminaBench/status/2120660076927099048', external: true, isNew: true },
        { name: 'Ringfall', lang: 'no_need', added: '2026-11-13', path: 'https://patch.gg/games/rehan/ringfall', preview: '', icon: 'fas fa-gamepad', desc: 'A Destiny-inspired FPS. Open source and remixable.', nameZh: 'Ringfall《命运》风格 FPS', descZh: '开源，可以拿去改', author: 'rehan_shei', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 62, post: 'https://x.com/rehan_shei/status/2119994607291584962', external: true, isNew: true },
        { name: 'Fighting game (plays on phones)', lang: 'no_need', added: '2026-11-13', path: 'https://claude.ai/artifact/QvSjL7Hexf3nKdUP9Zerr7', preview: '', icon: 'fas fa-gamepad', desc: 'A fighting game iterated overnight, playable in a mobile browser.', nameZh: '格斗游戏（手机浏览器可玩）', descZh: '一晚上迭代出来的格斗游戏', author: 's_shigel', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 32, post: 'https://x.com/s_shigel/status/2120300080569975034', external: true, isNew: true },
        { name: 'HITOFUDE', lang: 'no_need', added: '2026-11-13', path: 'https://shubhu121.github.io/hitdude/play/', preview: '', icon: 'fas fa-gamepad', desc: 'Every frame brushed in code as sumi ink on paper. The boss erases the level; your sword is a paintbrush.', nameZh: 'HITOFUDE 一筆 水墨动作游戏', descZh: '每一帧都是代码画的墨；Boss 会擦掉关卡，你的剑是一支毛笔', author: 'positronx_', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 52, post: 'https://x.com/positronx_/status/2120374208043876422', external: true, isNew: true },
        { name: 'IGNITION fighting game', lang: 'no_need', added: '2026-11-13', path: 'https://fighting-game-ignition.saito-931.workers.dev', preview: '', icon: 'fas fa-gamepad', desc: 'A 2D fighting game with generated voices and sound, play logs and replays.', nameZh: 'IGNITION 零界 格斗游戏', descZh: '2D 格斗游戏，带生成的语音和音效，能存对战记录和回放', author: 's_shigel', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 11, post: 'https://x.com/s_shigel/status/2120895161890914336', external: true, isNew: true },
        { name: 'Pogo Riot', lang: 'no_need', added: '2026-11-14', path: 'https://www.spawn.co/@abbidabbi/pogo-riot', preview: '', icon: 'fas fa-gamepad', desc: 'A free-for-all FPS where you bounce on a pogo stick and aim at the same time.', nameZh: 'Pogo Riot 弹跳杆射击', descZh: '多人混战 FPS，踩着弹跳杆一边跳一边瞄准', author: 'Pumpnasterr', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 63, post: 'https://x.com/Pumpnasterr/status/2121343507885682917', external: true, isNew: true },
        { name: 'Siege Wing — a helicopter in a medieval war', lang: 'no_need', added: '2026-11-14', path: 'https://bannerfall.itch.io/siege-wing', preview: '', icon: 'fas fa-gamepad', desc: 'Fly a chopper with cannon, rockets and missiles, dodge Roman ballistae and bring down the castle.', nameZh: 'Siege Wing 直升机攻城', descZh: '开直升机打中世纪战争：火炮、火箭、导弹三种武器，躲罗马弩炮、拆城堡', author: 'builderjaydub', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 578, post: 'https://x.com/builderjaydub/status/2120223731520040966', external: true, isNew: true },
        { name: 'Goku: Four-Star Road', lang: 'no_need', added: '2026-11-15', path: 'https://app.usecrayon.ai/play/76dbd04f-0684-4486-8cc4-eae0585295e8', preview: '', icon: 'fas fa-gamepad', desc: 'A fan action game based on Dragon Ball\'s Red Ribbon Army saga, built with three.js. A work in progress; the first two maps are playable.', nameZh: 'Goku: Four-Star Road 悟空：四星之路', descZh: '照着龙珠红缎带军篇做的同人动作游戏，three.js 写的，目前能玩前两张地图', author: 'aniketjart', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 1365, post: 'https://x.com/aniketjart/status/2121793239175119279', external: true, isNew: true },
        { name: 'Valle Morta', lang: 'no_need', added: '2026-11-16', path: 'https://valle-morta.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'A first-person zombie survival shooter in a war-torn alpine valley, built in two days. No premade 3D assets; every visual is generated in code.', nameZh: 'Valle Morta 丧尸生存射击', descZh: '两天做出的第一人称丧尸生存射击，战火中的阿尔卑斯山谷，没用任何现成 3D 素材，画面全是代码生成', author: 'LexnLin', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 323, github: 'https://github.com/Leonxlnx/valle-morta', post: 'https://x.com/LexnLin/status/2121934071429468543', external: true, isNew: true },
        { name: 'The World of Hoodcraft', lang: 'no_need', added: '2026-11-19', path: 'https://www.spawn.co/@izkimar/the-world-of-hoodcraft', preview: '', icon: 'fas fa-gamepad', desc: 'World of Warcraft meets GTA in the browser: hijack wagons, hit 5-star heat until battlemages turn you into a sheep. 6,000 networked NPCs, fully multiplayer with open PvP.', nameZh: 'The World of Hoodcraft 兜帽工艺世界', descZh: '把魔兽世界和 GTA 揉在一起的浏览器多人游戏：抢马车、通缉升到五星会被法师变成羊，6000 个联网 NPC，开放 PvP', author: 'Izkimar', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 454, post: 'https://x.com/Izkimar/status/2123188582836031910', external: true, isNew: true }
    ],
    Arcade: [
        { name: 'Sulli RUN', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/sulli-run/index.html', preview: 'games/Arcade/sulli-run/preview.webp', icon: '🎮', desc: 'Parkour as a 3D gorilla through a neon city, switching lanes, jumping and sliding to dodge obstacles and boost score.' },
        { name: 'Barrelbound', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/barrelbound/index.html', preview: 'games/Arcade/barrelbound/preview.webp', icon: '🎮', desc: 'Pick Rocco or Pip, double-jump and throw barrels across three jungle platform levels, ride minecarts, recover lost cargo and face the final boss.' },
        { name: 'STORM RACE', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/storm-race/index.html', preview: 'games/Arcade/storm-race/preview.webp', icon: '🏎️', desc: 'Mini 4WD racing with a part-stripping garage, boost and sunny, rainy and stormy track variants.' },
        { name: 'FANG STARLIGHT RUN', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/fang-starlight-run/index.html', preview: 'games/Arcade/fang-starlight-run/preview.webp', icon: '🎮', desc: 'Dash as a wolf cub through three starlit side-scrolling levels, using double-jumps and dashes to collect coins and star shards.' },
        { name: 'Blue Bajaj Rally', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/blue-bajaj-rally/index.html', preview: 'games/Arcade/blue-bajaj-rally/preview.webp', icon: '🎮', desc: 'Race a three-wheeled Bajaj against five CPU riders or the clock on Ethiopian highland tracks.' },
        { name: 'APEX CLUB', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/apex-club/index.html', preview: 'games/Arcade/apex-club/preview.webp', icon: '🎮', desc: 'Three laps of kart racing on a bay circuit: six cars, drift-boost, and solo or 4v4 team points.' },
        { name: 'Pelican Pedal', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/pelican-pedal/index.html', preview: 'games/Arcade/pelican-pedal/preview.webp', icon: '🎮', desc: 'Ride a pelican\'s bicycle through a shifting 3D coastline, switching lanes, jumping and ducking; chain fish combos and use shields, magnets and boosts.' },
        { name: 'Overdrive', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/overdrive/index.html', preview: 'games/Arcade/overdrive/preview.webp', icon: '🏎️', desc: '3D racing against five AI rivals with selectable cars and tracks, plus time trial, drift and nitro.' },
        { name: 'Abyss Protocol', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/abyss-protocol/index.html', preview: 'games/Arcade/abyss-protocol/preview.webp', icon: '🎮', desc: 'Descend a 3D deep well using only left-right movement across moving, crumbling and phasing platforms, dodging lasers and saws while collecting crystals and survival chips.' },
        { name: 'Kart Racing', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/-kart-racing/index.html', preview: 'games/Arcade/-kart-racing/preview.webp', icon: '🏎️', desc: 'Drift to charge nitro and fight for position across three laps with items; current title Gale Kart, 2-4 player online entry.' },
        { name: 'TIDAL RUSH', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/tidal-rush/index.html', preview: 'games/Arcade/tidal-rush/preview.webp', icon: '🎮', desc: 'Drift and use items on tropical kart tracks across three laps against seven rivals.' },
        { name: 'Luna Crimson Requiem', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/luna-crimson-requiem/index.html', preview: 'games/Arcade/luna-crimson-requiem/preview.webp', icon: '🎮', desc: 'Jump through gothic pixel stages, slashing, stomping or summoning attacks to take on enemies in this short side-scrolling adventure.' },
        { name: 'Strange Orbit', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/crayon-space-bike/index.html', preview: 'games/Arcade/crayon-space-bike/preview.webp', icon: '🎮', desc: 'Bike along planetary rings against astronaut rivals, collecting star dust and drafting to speed through the Orbit Cup.' },
        { name: 'One More Vine', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/one-more-vine/index.html', preview: 'games/Arcade/one-more-vine/preview.webp', icon: '🎮', desc: 'Run, jump and swing through four jungle levels, collect treasure, dodge crocodiles and beat the clock.' },
        { name: 'Bengaluru ORR Rush', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/bengaluru-orr-rush/index.html', preview: 'games/Arcade/bengaluru-orr-rush/preview.webp', icon: '🎮', desc: 'Weave through congested Bengaluru roads, dodge potholes and delivery bikes, and use boosts and side-swipes to overtake.' },
        { name: 'SkiCross', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/skicross/index.html', preview: 'games/Arcade/skicross/preview.webp', icon: '🎮', desc: 'Race three rivals down a snowy mountain, threading gates and obstacles before the avalanche catches up.' },
        { name: 'Itsy Bitsy Spider', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/itsy-bitsy-spider/index.html', preview: 'games/Arcade/itsy-bitsy-spider/preview.webp', icon: '🎮', desc: 'Climb a mossy wall, catch insects to restore grip, and hide in a cave before the rain arrives.' },
        { name: 'Desi Mayhem', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/desi-mayhem/index.html', preview: 'games/Arcade/desi-mayhem/preview.webp', icon: '🎮', desc: 'Ride a motorbike through Indian city roads, racing between buses and auto-rickshaws with kicks, punches and boosts.' },
        { name: 'Cosmic Tides', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/cosmic-tides/index.html', preview: 'games/Arcade/cosmic-tides/preview.webp', icon: '🎮', desc: 'Drive a vehicle across a galactic sea, chasing glowing gates in two-lap racing or endless drift.' },
        { name: 'Neon Wake', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/neon-wake/index.html', preview: 'games/Arcade/neon-wake/preview.webp', icon: '🎮', desc: 'Pilot a speedboat along the Dubai coast through eight segments with boosts and jump shortcuts on three-lap courses.' },
        { name: 'Wings of Freedom', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/levi-skyrun/index.html', preview: 'games/Arcade/levi-skyrun/preview.webp', icon: '🎮', desc: 'Guide Levi as he auto-dashes across rooftops, dodging obstacles and timing vaults and titan attacks for flowing combos.' },
        { name: 'Hot Wheeler', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/hot-wheeler/index.html', preview: 'games/Arcade/hot-wheeler/preview.webp', icon: '🎮', desc: 'Drive toy cars through stunt parks or bedroom tracks with loops, ramps and boost pads; auto-lap, manual drive and place-mode options.' },
        { name: 'Glider', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/glider-game/index.html', preview: 'games/Arcade/glider-game/preview.webp', icon: '🎮', desc: 'Launch a paper plane through an ever-growing 3D landscape, turning, boosting and threading rings or free-exploring biomes.' },
        { name: 'Duck Off', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/duck-off/index.html', preview: 'games/Arcade/duck-off/preview.webp', icon: '🎮', desc: 'Click to paddle your duck forward, dodge posts and whirlpools, bank boosts; solo practice and room racing included.' },
        { name: 'Wildwake Rally', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/wildwake-rally/index.html', preview: 'games/Arcade/wildwake-rally/preview.webp', icon: '🎮', desc: 'Race an orange rally car through low-poly mountain tracks with two-lap solo practice and a public leaderboard.' },
        { name: 'PaperRoute', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/paperroute/index.html', preview: 'games/Arcade/paperroute/preview.webp', icon: '🎮', desc: 'Bike through suburban streets, deliver newspapers to subscribers on both sides, and dodge cars, pedestrians and potholes.' },
        { name: 'Zombie Escape Driver', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/zombie-escape-driver/index.html', preview: 'games/Arcade/zombie-escape-driver/preview.webp', icon: '🧟', desc: 'Endless night driving through zombies and traffic: collect scrap and boost into the next block.' },
        { name: 'DUSKLINE', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/duskline-canyon-circuit/index.html', preview: 'games/Arcade/duskline-canyon-circuit/preview.webp', icon: '🎮', desc: 'Drive a canyon circuit at sunset with lap timing, a track-progress minimap and switchable chase cameras.' },
        { name: 'RED FLAG GAME', lang: 'no_need', added: '2026-10-10', path: 'games/Arcade/red-flag-game/index.html', preview: 'games/Arcade/red-flag-game/preview.webp', icon: '🎮', desc: 'Drive between airport and home while watching speed limits, traffic lights and your remaining license points.' },
        { name: 'Asteroids', lang: 'no_need', path: 'games/Arcade/Asteroids/index.html', preview: 'games/Arcade/Asteroids/preview.webp', icon: 'fas fa-rocket', hot: true, desc: 'Classic space shooter arcade game.' },
        { name: 'Frogger', lang: 'no_need', path: 'games/Arcade/Frogger/index.html', preview: 'games/Arcade/Frogger/preview.webp', icon: 'fas fa-frog', hot: true, desc: 'Classic frog crossing game.' },
        { name: 'Bubble Shooter', lang: 'no_need', path: 'games/Arcade/Bubble-Shooter/index.html', preview: 'games/Arcade/Bubble-Shooter/preview.webp', icon: 'fas fa-circle', desc: 'Bubble shooter game.' },
        { name: 'Candy Crush', lang: 'no_need', path: 'games/Arcade/Candy-Crush/index.html', preview: 'games/Arcade/Candy-Crush/preview.webp', icon: 'fas fa-candy-cane', desc: 'Candy match-3 game.' },
        { name: 'Jump Game', lang: 'no_need', path: 'games/Arcade/Jump-Game/index.html', preview: 'games/Arcade/Jump-Game/preview.webp', icon: 'fas fa-person-running', desc: 'Jumping adventure.' },
        { name: 'Pac-Man', lang: 'no_need', path: 'games/Arcade/Pac-Man/index.html', preview: 'games/Arcade/Pac-Man/preview.webp', icon: 'fas fa-ghost', hot: true, desc: 'Classic Pac-Man.' },
        { name: 'Snake', lang: 'no_need', path: 'games/Arcade/Snake/index.html', preview: 'games/Arcade/Snake/preview.webp', icon: 'fas fa-worm', hot: true, desc: 'Classic snake game.' },
        { name: 'Space Invaders', lang: 'no_need', path: 'games/Arcade/Space-Invaders/index.html', preview: 'games/Arcade/Space-Invaders/preview.webp', icon: 'fas fa-space-shuttle', desc: 'Classic space invaders.' },
        { name: 'Tetris', lang: 'no_need', path: 'games/Arcade/Tetris/index.html', preview: 'games/Arcade/Tetris/preview.webp', icon: 'fas fa-square', hot: true, desc: 'Classic Tetris.' },
        { name: 'Tower Blocks', lang: 'no_need', path: 'games/Arcade/Tower-Blocks/index.html', preview: 'games/Arcade/Tower-Blocks/preview.webp', icon: 'fas fa-layer-group', desc: 'Tower stacking game.' },
        { name: 'DiabloJS', lang: 'text', path: 'games/Arcade/Diablo-JS/index.html', preview: 'games/Arcade/Diablo-JS/preview.webp', icon: 'fas fa-sword', desc: 'Diablo-style action RPG.' },
        { name: '3D Asteroids', lang: 'no_need', path: 'games/Arcade/Asteroids-3D/index.html', preview: 'games/Arcade/Asteroids-3D/preview.webp', icon: 'fas fa-rocket', desc: 'AI-generated 3D space shooter.' },
        { name: 'Blobby Volley', lang: 'no_need', path: 'games/Arcade/Blobby-Volley/index.html', preview: 'games/Arcade/Blobby-Volley/preview.webp', icon: 'fas fa-volleyball', desc: 'AI-generated funny volleyball duel.' },
        { name: 'Duck Hunt \'26', lang: 'no_need', path: 'games/Arcade/Duck-Hunt/index.html', preview: 'games/Arcade/Duck-Hunt/preview.webp', icon: 'fas fa-duck', desc: 'AI-generated classic duck hunt.' },
        { name: 'Icy Tower', lang: 'no_need', path: 'games/Arcade/Icy-Tower/index.html', preview: 'games/Arcade/Icy-Tower/preview.webp', icon: 'fas fa-mountain', desc: 'AI-generated icy tower jumping game.' },
        { name: 'Three Gates', lang: 'no_need', path: 'games/Arcade/Mini-Tower-Defense/index.html', preview: 'games/Arcade/Mini-Tower-Defense/preview.webp', icon: 'fas fa-chess-rook', desc: 'AI-generated mini tower defense.' },
        { name: 'Lights On', lang: 'no_need', path: 'games/Arcade/Missile-Command/index.html', preview: 'games/Arcade/Missile-Command/preview.webp', icon: 'fas fa-bomb', desc: 'AI-generated classic missile defense.' },
        { name: 'Peg Fever', lang: 'no_need', path: 'games/Arcade/Peggle/index.html', preview: 'games/Arcade/Peggle/preview.webp', icon: 'fas fa-circle', desc: 'AI-generated peg-bouncing elimination game.' },
        { name: 'Suika Game', lang: 'no_need', path: 'games/Arcade/Suika/index.html', preview: 'games/Arcade/Suika/preview.webp', icon: 'fas fa-apple-whole', desc: 'AI-generated Suika fruit merge game.' },
        { name: 'Worms', lang: 'no_need', path: 'games/Arcade/Worms/index.html', preview: 'games/Arcade/Worms/preview.webp', icon: 'fas fa-worm', desc: 'AI-generated turn-based worm battle.' },
        { name: 'Agar.io Clone', lang: 'no_need', path: 'games/Arcade/Agario/index.html', preview: 'games/Arcade/Agario/preview.webp', icon: 'fas fa-circle', desc: 'AI-generated cell eating battle.' },
        { name: 'Artillery', lang: 'no_need', path: 'games/Arcade/Artillery/index.html', preview: 'games/Arcade/Artillery/preview.webp', icon: 'fas fa-bomb', desc: 'AI-generated turn-based artillery shooting.' },
        { name: 'RESONANCE 3D', lang: 'no_need', path: 'games/Arcade/Ball-Bouncing/index.html', preview: 'games/Arcade/Ball-Bouncing/preview.webp', icon: 'fas fa-baseball', desc: 'AI-generated bouncing ball game.' },
        { name: 'Bubble Break', lang: 'no_need', path: 'games/Arcade/Bubble-Break/index.html', preview: 'games/Arcade/Bubble-Break/preview.webp', icon: 'fas fa-circle', desc: 'AI-generated bubble elimination game.' },
        { name: 'Glowtide', lang: 'no_need', path: 'games/Arcade/Chain-Reaction/index.html', preview: 'games/Arcade/Chain-Reaction/preview.webp', icon: 'fas fa-atom', desc: 'AI-generated chain reaction strategy game.' },
        { name: 'Squiggle', lang: 'no_need', path: 'games/Arcade/Doodling/index.html', preview: 'games/Arcade/Doodling/preview.webp', icon: 'fas fa-pen', desc: 'AI-generated doodle adventure.' },
        { name: 'Downhill Dreamer', lang: 'no_need', path: 'games/Arcade/Downhill-Dreamer/index.html', preview: 'games/Arcade/Downhill-Dreamer/preview.webp', icon: 'fas fa-skiing', desc: 'AI-generated downhill skiing.' },
        { name: 'Fling', lang: 'no_need', path: 'games/Arcade/Fling/index.html', preview: 'games/Arcade/Fling/preview.webp', icon: 'fas fa-hand-rock', desc: 'AI-generated physics throwing game.' },
        { name: 'Fresh Oil', lang: 'no_need', path: 'games/Arcade/Fresh-Oil/index.html', preview: 'games/Arcade/Fresh-Oil/preview.webp', icon: 'fas fa-gas-pump', desc: 'AI-generated oil tycoon game.' },
        { name: 'Getting Up Here', lang: 'no_need', path: 'games/Arcade/Getting-Up-Here/index.html', preview: 'games/Arcade/Getting-Up-Here/preview.webp', icon: 'fas fa-mountain', desc: 'AI-generated climbing game.' },
        { name: 'Hummingbird', lang: 'no_need', path: 'games/Arcade/Hummingbird/index.html', preview: 'games/Arcade/Hummingbird/preview.webp', icon: 'fas fa-dove', desc: 'AI-generated hummingbird adventure.' },
        { name: 'Kurve', lang: 'no_need', path: 'games/Arcade/Kurve/index.html', preview: 'games/Arcade/Kurve/preview.webp', icon: 'fas fa-wave-square', desc: 'AI-generated curve battle.' },
        { name: 'Liquid War', lang: 'no_need', path: 'games/Arcade/Liquid-War/index.html', preview: 'games/Arcade/Liquid-War/preview.webp', icon: 'fas fa-tint', desc: 'AI-generated liquid territory battle.' },
        { name: 'Lumenwright', lang: 'no_need', path: 'games/Arcade/Lumenwright/index.html', preview: 'games/Arcade/Lumenwright/preview.webp', icon: 'fas fa-lightbulb', desc: 'AI-generated light-shadow action.' },
        { name: 'Moor Chicken', lang: 'no_need', path: 'games/Arcade/Moorhuhn/index.html', preview: 'games/Arcade/Moorhuhn/preview.webp', icon: 'fas fa-feather', desc: 'AI-generated pheasant shooting game.' },
        { name: 'Obstacle Dodge', lang: 'no_need', path: 'games/Arcade/Obstacle-Dodge/index.html', preview: 'games/Arcade/Obstacle-Dodge/preview.webp', icon: 'fas fa-running', desc: 'AI-generated obstacle dodge.' },
        { name: 'Pingu Throw', lang: 'no_need', path: 'games/Arcade/Pingu-Throw/index.html', preview: 'games/Arcade/Pingu-Throw/preview.webp', icon: 'fas fa-snowman', desc: 'AI-generated penguin snowball throwing.' },
        { name: 'Pulseforge', lang: 'no_need', path: 'games/Arcade/Pulseforge/index.html', preview: 'games/Arcade/Pulseforge/preview.webp', icon: 'fas fa-bolt', desc: 'AI-generated pulse shooting.' },
        { name: 'Push Mine', lang: 'no_need', path: 'games/Arcade/Push-Mine/index.html', preview: 'games/Arcade/Push-Mine/preview.webp', icon: 'fas fa-hard-hat', desc: 'AI-generated minecart pushing adventure.' },
        { name: 'QIX', lang: 'no_need', path: 'games/Arcade/Qix/index.html', preview: 'games/Arcade/Qix/preview.webp', icon: 'fas fa-vector-square', desc: 'AI-generated classic Qix area capture.' },
        { name: 'Scatter', lang: 'no_need', path: 'games/Arcade/Scatter/index.html', preview: 'games/Arcade/Scatter/preview.webp', icon: 'fas fa-expand', desc: 'AI-generated scatter shooting.' },
        { name: 'SKYLINE', lang: 'no_need', path: 'games/Arcade/Skyline/index.html', preview: 'games/Arcade/Skyline/preview.webp', icon: 'fas fa-city', desc: 'AI-generated city building.' },
        { name: 'Stack Tower', lang: 'no_need', path: 'games/Arcade/Stack-Tower/index.html', preview: 'games/Arcade/Stack-Tower/preview.webp', icon: 'fas fa-layer-group', desc: 'AI-generated tower stacking.' },
        { name: 'Strata', lang: 'no_need', path: 'games/Arcade/Strata/index.html', preview: 'games/Arcade/Strata/preview.webp', icon: 'fas fa-layer-group', desc: 'AI-generated layered elimination.' },
        { name: 'Timberbound', lang: 'no_need', path: 'games/Arcade/Timberbound/index.html', preview: 'games/Arcade/Timberbound/preview.webp', icon: 'fas fa-tree', desc: 'AI-generated lumberjack action.' },
        { name: 'VOID', lang: 'no_need', path: 'games/Arcade/Void/index.html', preview: 'games/Arcade/Void/preview.webp', icon: 'fas fa-globe', desc: 'AI-generated void exploration.' },
        { name: 'VOID RUNNER', lang: 'no_need', path: 'games/Arcade/Void-Runner/index.html', preview: 'games/Arcade/Void-Runner/preview.webp', icon: 'fas fa-running', desc: 'AI-generated void runner.' },
        { name: 'Lanternfall', lang: 'no_need', path: 'games/Arcade/Webcraft/index.html', preview: 'games/Arcade/Webcraft/preview.webp', icon: 'fas fa-cube', desc: 'AI-generated web building.' },
        { name: 'Magic Carpet Wizard', lang: 'no_need', path: 'games/Arcade/Magic-Carpet-Wizard/index.html', preview: 'games/Arcade/Magic-Carpet-Wizard/preview.webp', icon: 'fas fa-hat-wizard', desc: 'AI-generated magic carpet adventure.' },
        { name: 'Block Drop', lang: 'no_need', path: 'games/Arcade/Block-Drop/index.html', preview: 'games/Arcade/Block-Drop/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated block drop arcade game.', isNew: true },
        { name: 'Pong', lang: 'no_need', path: 'games/Arcade/Pong/index.html', preview: 'games/Arcade/Pong/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated classic table tennis game.', isNew: true },
        { name: 'Pong Lite', lang: 'no_need', path: 'games/Arcade/pong-lite/index.html', preview: 'games/Arcade/pong-lite/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated lite table tennis game.', isNew: true },
        { name: 'Endless Runner', lang: 'no_need', path: 'games/Arcade/endless-runner/index.html', preview: 'games/Arcade/endless-runner/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated endless runner game.', isNew: true },
        { name: 'Abhita', lang: 'no_need', path: 'games/Arcade/abhita/index.html', preview: 'games/Arcade/abhita/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Abhita game.', isNew: true },
        { name: 'Balance Stack', lang: 'no_need', path: 'games/Arcade/balance-stack/index.html', preview: 'games/Arcade/balance-stack/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Balance Stack game.', isNew: true },
        { name: 'Bomb Blast', lang: 'no_need', path: 'games/Arcade/bomb-blast/index.html', preview: 'games/Arcade/bomb-blast/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Bomb Blast game.', isNew: true },
        { name: 'Boom Dots', lang: 'no_need', path: 'games/Arcade/boom-dots/index.html', preview: 'games/Arcade/boom-dots/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Boom Dots game.', isNew: true },
        { name: 'Breakoid', lang: 'no_need', path: 'games/Arcade/breakoid/index.html', preview: 'games/Arcade/breakoid/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Breakoid game.', isNew: true },
        { name: 'Bug Smasher', lang: 'no_need', path: 'games/Arcade/bug-smasher/index.html', preview: 'games/Arcade/bug-smasher/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Bug Smasher game.', isNew: true },
        { name: 'Catch Me If You Can', lang: 'no_need', path: 'games/Arcade/catch-me-if-you-can/index.html', preview: 'games/Arcade/catch-me-if-you-can/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Catch Me If You Can game.', isNew: true },
        { name: 'Circle Path', lang: 'no_need', path: 'games/Arcade/circle-path/index.html', preview: 'games/Arcade/circle-path/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Circle Path game.', isNew: true },
        { name: 'Collector', lang: 'no_need', path: 'games/Arcade/collector/index.html', preview: 'games/Arcade/collector/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Collector game.', isNew: true },
        { name: 'Color Dash', lang: 'no_need', path: 'games/Arcade/color-dash/index.html', preview: 'games/Arcade/color-dash/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Color Dash game.', isNew: true },
        { name: 'Crowd Control', lang: 'no_need', path: 'games/Arcade/crowd-control/index.html', preview: 'games/Arcade/crowd-control/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Crowd Control game.', isNew: true },
        { name: 'Curve Snake', lang: 'no_need', path: 'games/Arcade/curve-snake/index.html', preview: 'games/Arcade/curve-snake/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Curve Snake game.', isNew: true },
        { name: 'Demon', lang: 'no_need', path: 'games/Arcade/demon/index.html', preview: 'games/Arcade/demon/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Demon game.', isNew: true },
        { name: 'Dodge Enemy', lang: 'no_need', path: 'games/Arcade/dodge-enemy/index.html', preview: 'games/Arcade/dodge-enemy/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Dodge Enemy game.', isNew: true },
        { name: 'Dodge Master', lang: 'no_need', path: 'games/Arcade/dodge-master/index.html', preview: 'games/Arcade/dodge-master/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Dodge Master game.', isNew: true },
        { name: 'Dream Weaver', lang: 'no_need', path: 'games/Arcade/dream-weaver/index.html', preview: 'games/Arcade/dream-weaver/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Dream Weaver game.', isNew: true },
        { name: 'Ellars', lang: 'no_need', path: 'games/Arcade/ellars/index.html', preview: 'games/Arcade/ellars/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Ellars game.', isNew: true },
        { name: 'Endless Mafia', lang: 'no_need', path: 'games/Arcade/endless-mafia/index.html', preview: 'games/Arcade/endless-mafia/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Endless Mafia game.', isNew: true },
        { name: 'Flappy', lang: 'no_need', path: 'games/Arcade/flappy/index.html', preview: 'games/Arcade/flappy/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Flappy game.', isNew: true },
        { name: 'Fly Monkey', lang: 'no_need', path: 'games/Arcade/fly-monkey/index.html', preview: 'games/Arcade/fly-monkey/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Fly Monkey game.', isNew: true },
        { name: 'Glass Step', lang: 'no_need', path: 'games/Arcade/glass-step/index.html', preview: 'games/Arcade/glass-step/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Glass Step game.', isNew: true },
        { name: 'Hungry Player', lang: 'no_need', path: 'games/Arcade/hungry-player/index.html', preview: 'games/Arcade/hungry-player/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Hungry Player game.', isNew: true },
        { name: 'Jump Dot', lang: 'no_need', path: 'games/Arcade/jump-dot/index.html', preview: 'games/Arcade/jump-dot/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Jump Dot game.', isNew: true },
        { name: 'Kaiju Krush', lang: 'no_need', path: 'games/Arcade/kaiju-krush/index.html', preview: 'games/Arcade/kaiju-krush/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Kaiju Krush game.', isNew: true },
        { name: 'Luma Bounce', lang: 'no_need', path: 'games/Arcade/luma-bounce/index.html', preview: 'games/Arcade/luma-bounce/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Luma Bounce game.', isNew: true },
        { name: 'Pirates', lang: 'no_need', path: 'games/Arcade/pirates/index.html', preview: 'games/Arcade/pirates/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Pirates game.', isNew: true },
        { name: 'Red Light Green Light', lang: 'no_need', path: 'games/Arcade/red-light-green-light/index.html', preview: 'games/Arcade/red-light-green-light/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Red Light Green Light game.', isNew: true },
        { name: 'Road Cross', lang: 'no_need', path: 'games/Arcade/road-cross/index.html', preview: 'games/Arcade/road-cross/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Road Cross game.', isNew: true },
        { name: 'Shape Collector', lang: 'no_need', path: 'games/Arcade/shape-collector/index.html', preview: 'games/Arcade/shape-collector/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Shape Collector game.', isNew: true },
        { name: 'Sky High', lang: 'no_need', path: 'games/Arcade/sky-high/index.html', preview: 'games/Arcade/sky-high/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Sky High game.', isNew: true },
        { name: 'Space Waves', lang: 'no_need', path: 'games/Arcade/space-waves/index.html', preview: 'games/Arcade/space-waves/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Space Waves game.', isNew: true },
        { name: 'Spaceman', lang: 'no_need', path: 'games/Arcade/spaceman/index.html', preview: 'games/Arcade/spaceman/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Spaceman game.', isNew: true },
        { name: 'Stick Game', lang: 'no_need', path: 'games/Arcade/stick-game/index.html', preview: 'games/Arcade/stick-game/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Stick Game game.', isNew: true },
        { name: 'Stick Toss', lang: 'no_need', path: 'games/Arcade/stick-toss/index.html', preview: 'games/Arcade/stick-toss/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Stick Toss game.', isNew: true },
        { name: 'Swipe Assassin', lang: 'no_need', path: 'games/Arcade/swipe-assassin/index.html', preview: 'games/Arcade/swipe-assassin/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Swipe Assassin game.', isNew: true },
        { name: 'Tap Target', lang: 'no_need', path: 'games/Arcade/tap-target/index.html', preview: 'games/Arcade/tap-target/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Tap Target game.', isNew: true },
        { name: 'Whack A Bug', lang: 'no_need', path: 'games/Arcade/whack-a-bug/index.html', preview: 'games/Arcade/whack-a-bug/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Whack A Bug game.', isNew: true },
        { name: 'Car Race', lang: 'no_need', path: 'games/Arcade/car-race/index.html', preview: 'games/Arcade/car-race/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Car Race game.', isNew: true },
        { name: 'Forest Runner', lang: 'no_need', path: 'games/Arcade/forest-runner/index.html', preview: 'games/Arcade/forest-runner/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Forest Runner game.', isNew: true },
        { name: 'One Car', lang: 'no_need', path: 'games/Arcade/one-car/index.html', preview: 'games/Arcade/one-car/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated One Car game.', isNew: true },
        { name: 'Road Fighter', lang: 'no_need', path: 'games/Arcade/road-fighter/index.html', preview: 'games/Arcade/road-fighter/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Road Fighter game.', isNew: true },
        { name: 'Shadow Runner', lang: 'no_need', path: 'games/Arcade/shadow-runner/index.html', preview: 'games/Arcade/shadow-runner/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Shadow Runner game.', isNew: true },
        { name: 'Straight Rush', lang: 'no_need', path: 'games/Arcade/straight-rush/index.html', preview: 'games/Arcade/straight-rush/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Straight Rush game.', isNew: true },
        { name: 'Survival Run', lang: 'no_need', path: 'games/Arcade/survival-run/index.html', preview: 'games/Arcade/survival-run/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Survival Run game.', isNew: true },
        { name: 'Two Cars', lang: 'no_need', path: 'games/Arcade/two-cars/index.html', preview: 'games/Arcade/two-cars/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Two Cars game.', isNew: true },
        { name: 'Two Cars Ai', lang: 'no_need', path: 'games/Arcade/two-cars-ai/index.html', preview: 'games/Arcade/two-cars-ai/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Two Cars Ai game.', isNew: true },
        { name: 'Thunderfall', lang: 'no_need', path: 'games/Astra/Thunderfall/index.html', preview: 'games/Astra/Thunderfall/preview.webp', icon: 'fas fa-rocket', hot: true, desc: 'Thunderfall: vertical bullet-hell shooting.' },
        { name: 'APEX CLUB', lang: 'no_need', path: 'games/Astra/Apex-Club/index.html', preview: 'games/Astra/Apex-Club/preview.webp', icon: 'fas fa-car', desc: 'Bay Circuit 3D kart grand prix.' },
        { name: 'Fruit Ninja', lang: 'no_need', path: 'games/Astra/Fruit-Ninja-Dojo/index.html', preview: 'games/Astra/Fruit-Ninja-Dojo/preview.webp', icon: 'fas fa-apple-whole', desc: 'Fruit Ninja: classic fruit slicing.' },
        { name: 'Race Jimothy', lang: 'no_need', path: 'games/Astra/Race-Jimothy/index.html', preview: 'games/Astra/Race-Jimothy/preview.webp', icon: 'fas fa-pencil-ruler', desc: 'Draw-and-race: race a raccoon.' },
        { name: 'Voidrunner', lang: 'no_need', path: 'games/Arcade/Voidrunner/index.html', preview: 'games/Arcade/Voidrunner/preview.webp', icon: 'fas fa-gamepad', desc: 'Race an anti-gravity ship against seven rivals on neon tracks, combining boosts, air brakes and weapons.\', author: \'Alexey Fateev\', source: \'astragames 收录（开源）\', github: \'https://github.com/alesha-pro/bench-portal' },
        { name: 'Doodle Jump', lang: 'no_need', added: '2026-10-20', path: 'games/Arcade/Doodle-Jump-Game/index.html', preview: 'games/Arcade/Doodle-Jump-Game/preview.webp', icon: '🦘', desc: 'Doodle jump: use arrow keys to bounce the little monster upward on platforms, avoiding black holes and obstacles.', isNew: true },
        { name: 'Turbo Kart Rally', lang: 'no_need', added: '2026-10-28', path: 'games/Arcade/turbo-kart-rally/index.html', preview: 'games/Arcade/turbo-kart-rally/preview.webp', icon: '🏎️', desc: 'A bright low-poly arcade kart racer: drift around winding tracks, fire item pickups and overtake rival drivers in fast pick-up-and-play cup races.', author: 'BridgeMind', source: 'GitHub MIT 开源仓库', github: 'https://github.com/bridge-mind/turbo-kart-rally', isNew: true },
        { name: 'Three Games (Saltline · The Clockmaker\'s Heart · Tidewright)', lang: 'no_need', added: '2026-11-13', path: 'https://claude.ai/artifact/MXxb36zKgN261ckbGhmNin', preview: '', icon: 'fas fa-gamepad', desc: 'Signed by Felix Rieseberg: "All games made with Claude Fable 5.2. First drafts, no human feedback." The most-shared link of launch day.', nameZh: 'Three Games 合集页（Saltline / 钟表匠之心 / Tidewright）', descZh: '页面署名 Felix Rieseberg，写明三款都是 Fable 5.2 无人工反馈的初稿；被转发最多的链接（视频来自转发者 @vineerpasam）', author: 'felixrieseberg', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 810, post: 'https://x.com/vineerpasam/status/2119955306096857145', external: true, isNew: true },
        { name: 'Voxel Engine', lang: 'no_need', added: '2026-11-13', path: 'https://www.spawn.co/@mattshumer/voxel-engine', preview: '', icon: 'fas fa-gamepad', desc: 'Built from a single prompt. Sound on.', nameZh: '体素引擎', descZh: '一条提示词生成，要开声音', author: 'mattshumer_', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 735, post: 'https://x.com/mattshumer_/status/2119870965106483384', external: true, isNew: true },
        { name: 'Portals: Endless Worlds', lang: 'no_need', added: '2026-11-13', path: 'https://portals-endless-worlds.netlify.app/', preview: '', icon: 'fas fa-gamepad', desc: '25,000 agents built 450+ code-only 3D worlds inspired by books, art and places, linked by portals you drift through.', nameZh: 'Portals 无尽传送门世界', descZh: '2.5 万个 Agent 做出 450 多个代码 3D 世界，传送门相连自动漫游', author: 'emollick', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 1921, github: 'https://github.com/emollick/ai-portals', post: 'https://x.com/emollick/status/2119918307457577163', external: true, isNew: true },
        { name: 'I Would Have Gotten Away With It', lang: 'no_need', added: '2026-11-13', path: 'https://i-would-have-gotten-away-with-it.netlify.app/', preview: '', icon: 'fas fa-gamepad', desc: 'A reverse Scooby-Doo: you are the villain scaring off meddling kids. Fable also made the trailer, music and sound.', nameZh: '反向史酷比：吓跑多管闲事的孩子', descZh: '预告片的音乐音效也是它做的', author: 'emollick', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 507, post: 'https://x.com/emollick/status/2119876449494540554', external: true, isNew: true },
        { name: 'Turbo Tails', lang: 'no_need', added: '2026-11-13', path: 'https://turbo-tails.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: '3D kart racer: 6 racers, drifting, ramps, items, single and multiplayer.', nameZh: 'Turbo Tails 3D 卡丁车', descZh: '6 名车手、漂移、道具，单人和多人', author: 'petergyang', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 138, post: 'https://x.com/petergyang/status/2119901658394358005', external: true, isNew: true },
        { name: 'Childhood Rug Racer', lang: 'no_need', added: '2026-11-13', path: 'https://noclipepe.pages.dev/rug/', preview: '', icon: 'fas fa-gamepad', desc: 'A racing game on your childhood play rug, same prompt as GPT-6.2 Sol. The author calls the model "Fable 5.5 (routing)".', nameZh: '童年地毯赛车', descZh: '同题对比 GPT-6.2 Sol；作者写的是路由到的「Fable 5.5」', author: 'noclipepe', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 412, post: 'https://x.com/noclipepe/status/2119728047754547326', external: true, isNew: true },
        { name: 'Rambo Dino', lang: 'no_need', added: '2026-11-13', path: 'https://noclipepe.pages.dev/dino', preview: '', icon: 'fas fa-gamepad', desc: 'The Chrome T-Rex game, rebuilt. Compared against Opus 5.5, Gemini 4 Carbon and GPT-6 Astra.', nameZh: 'Chrome 恐龙变兰博', descZh: '老 T-Rex 测试，对比 Opus / Gemini / GPT', author: 'noclipepe', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 146, post: 'https://x.com/noclipepe/status/2119927838321328577', external: true, isNew: true },
        { name: 'Cloud Stunt 3D', lang: 'no_need', added: '2026-11-13', path: 'https://finderchangchang.github.io/cloud-stunt-3d/', preview: '', icon: 'fas fa-gamepad', desc: 'Generated in 30 minutes; an optimized "golden" version is linked too.', nameZh: '云端特技 3D', descZh: '30 分钟生成', author: 'jev_chat', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 329, post: 'https://x.com/jev_chat/status/2120015641151426838', external: true, isNew: true },
        { name: 'Worm Rider', lang: 'no_need', added: '2026-11-13', path: 'https://github.com/amirmushichge/worm-rider', preview: '', icon: 'fas fa-gamepad', desc: 'Open source. 220 KB, 3,400 lines, 10 prompts, every model built from scratch in Claude Code.', nameZh: 'Worm Rider 沙虫骑士', descZh: '开源；220KB、3400 行、10 条提示词，模型全部代码建', author: 'AmirMushich', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 251, github: 'https://github.com/amirmushichge/worm-rider', post: 'https://x.com/AmirMushich/status/2119937977426338283', external: true, isNew: true },
        { name: 'Roost', lang: 'no_need', added: '2026-11-13', path: 'https://claude.ai/artifact/DLnFodkTwvawCNwurDmSZK?sk=5N6PtC07f1niB7h3I6clZQ', preview: '', icon: 'fas fa-gamepad', desc: '3D dirt-bike racing in one chat: 5 prompts, 15 minutes, 3 tracks, AI rivals, nitro, handlebar cam.', nameZh: 'Roost 3D 越野摩托', descZh: '5 条提示词 15 分钟；3 条赛道、AI 对手、氮气', author: 'tejas3732', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 6, post: 'https://x.com/tejas3732/status/2120091513657139549', external: true, isNew: true },
        { name: 'Silicon Seduction', lang: 'no_need', added: '2026-11-13', path: 'https://silicon-seduction.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'Can you make it out without being seduced?', nameZh: 'Silicon Seduction', descZh: '逃出去别被诱惑', author: 'ZryMiller', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 13, post: 'https://x.com/ZryMiller/status/2119918766691954691', external: true, isNew: true },
        { name: 'LANTERNFALL', lang: 'no_need', added: '2026-11-13', path: 'https://loktar00.github.io/lanternfall/', preview: '', icon: 'fas fa-gamepad', desc: 'The whole game — animations, models, everything — generated by Fable. Watch the effect when enemies die.', nameZh: 'LANTERNFALL', descZh: '整个游戏连动画、模型都由它生成，敌人死亡的特效很细', author: 'loktar00', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 1404, post: 'https://x.com/loktar00/status/2120192761542615271', external: true, isNew: true },
        { name: 'Rooftop Rally — pickleball in Unreal 5.9', lang: 'no_need', added: '2026-11-13', path: 'https://wavedash.com/games/rooftop-rally', preview: '', icon: 'fas fa-gamepad', desc: 'Fable 5.2 with the Unreal Engine 5.9 preview. Characters from Tripo; the other 3D assets and the rest by Fable.', nameZh: 'Rooftop Rally 天台匹克球（Unreal 5.9）', descZh: 'Fable 5.2 + Unreal Engine 5.9 预览版；角色用 Tripo，其余资产和关卡都是它做的', author: 'chongdashu', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 1082, post: 'https://x.com/chongdashu/status/2120154573356793883', external: true, isNew: true },
        { name: 'Dread & District', lang: 'no_need', added: '2026-11-13', path: 'https://dread-and-district.netlify.app', preview: '', icon: 'fas fa-gamepad', desc: 'A fantasy transport sim "with heart": one vague paragraph, then a bunch of agents arguing about art, lore and jokes. Good logistics defeats evil.', nameZh: 'Dread & District 奇幻运输模拟', descZh: '一段模糊的需求交给一群 Agent 去争论美术、设定和笑话，做出「靠物流打败邪恶」的游戏', author: 'emollick', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 301, post: 'https://x.com/emollick/status/2120248525254742318', external: true, isNew: true },
        { name: 'First Crush', lang: 'no_need', added: '2026-11-13', path: 'https://frontier.every.to/experiments/first-crush', preview: '', icon: 'fas fa-gamepad', desc: 'A winemaking game: scrub the vat, crush 250 kg of fruit, read the hydrometer, pick a yeast — and it explains why. Click "Try it" on the page.', nameZh: 'First Crush 酿酒教学游戏', descZh: '从刷桶、压 250 公斤葡萄到测糖度、选酵母，边玩边讲原理；页面里点 Try it', author: 'kieranklaassen', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 228, post: 'https://x.com/kieranklaassen/status/2119871673294037280', external: true, isNew: true },
        { name: 'Starry Nightrider', lang: 'no_need', added: '2026-11-13', path: 'https://starrynightrider.com', preview: '', icon: 'fas fa-gamepad', desc: 'Van Gogh riding through his Starry Night, as a game.', nameZh: 'Starry Nightrider 星夜骑行', descZh: '梵高骑车穿过他的《星夜》', author: 'ebbyamir', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 17183, post: 'https://x.com/ebbyamir/status/2120284261089673376', external: true, isNew: true },
        { name: 'SKYWAKE', lang: 'no_need', added: '2026-11-13', path: 'https://app.usecrayon.ai/play/992c2130-43da-416b-a577-aed9514d3057', preview: '', icon: 'fas fa-gamepad', desc: 'A flying quest game made with Fable 5.2, Opus 5.5, Crayon and three.js.', nameZh: 'SKYWAKE 飞行任务', descZh: 'Fable 5.2 + Opus 5.5 + Crayon + three.js', author: 'aniketjart', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 77, post: 'https://x.com/aniketjart/status/2120378493729222700', external: true, isNew: true },
        { name: 'Chairmageddon', lang: 'no_need', added: '2026-11-13', path: 'https://fowllabs.com/fable-5-2/chairmageddon/', preview: '', icon: 'fas fa-gamepad', desc: 'Destroy a peaceful town of blue chairs. Yes, you can vortex the baby stroller.', nameZh: 'Chairmageddon 椅子末日', descZh: '摧毁一个全是蓝椅子的和平小镇', author: 'argofowl', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 48, post: 'https://x.com/argofowl/status/2120568779537273263', external: true, isNew: true },
        { name: 'Farewell Light', lang: 'no_need', added: '2026-11-13', path: 'https://sael.net/demo/farewell-light/', preview: '', icon: 'fas fa-gamepad', desc: 'A gameplay demo made overnight.', nameZh: 'Farewell Light', descZh: '一晚上做出的玩法演示', author: 'RyanSael', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 44, post: 'https://x.com/RyanSael/status/2120695866684231998', external: true, isNew: true },
        { name: 'Open-world kart adventure', lang: 'no_need', added: '2026-11-13', path: 'https://claude.ai/artifact/FpdQ81sJs1KiV1a6JCY4jj', preview: '', icon: 'fas fa-gamepad', desc: 'One-shot in three hours; the main quest takes about half an hour.', nameZh: '开放世界冒险卡丁车', descZh: '一次生成，耗时三小时；主线半小时可以通关', author: 'realWeZZard', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 24, post: 'https://x.com/realWeZZard/status/2120379500492185939', external: true, isNew: true },
        { name: 'Midnight Pass', lang: 'no_need', added: '2026-11-13', path: 'https://claude.ai/artifact/UD9pGEN4QFA8F5EadRw8eL', preview: '', icon: 'fas fa-gamepad', desc: 'One HTML file, 603 lines, zero assets: real drift physics, a generated mountain, synthesized engine and tyres.', nameZh: 'Midnight Pass 山路漂移', descZh: '一个 HTML 文件、603 行、零素材；漂移物理、整座山和引擎声都是生成的', author: 'andreysuperior', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 42, post: 'https://x.com/andreysuperior/status/2120666660130746458', external: true, isNew: true },
        { name: 'Patchwork Quilt', lang: 'no_need', added: '2026-11-13', path: 'https://patch.gg/blendi/patchwork-quilt', preview: '', icon: 'fas fa-gamepad', desc: 'A patchwork, stop-motion style game slice. The whole map is code. Open source.', nameZh: 'Patchwork Quilt 拼布定格风', descZh: '整张地图都是代码；开源', author: 'BlendiByl', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 607, post: 'https://x.com/BlendiByl/status/2120746541636047347', external: true, isNew: true },
        { name: 'Tennis', lang: 'no_need', added: '2026-11-13', path: 'https://tennis.sixfingerpunch.com/', preview: '', icon: 'fas fa-gamepad', desc: 'Asked to "go wild" making a game, it returned what looks like a Pong clone — until you play it.', nameZh: 'Tennis：让它放开做，结果是个 Pong', descZh: '让它「放开做一个游戏」，看着只是个 Pong，玩起来才知道不止于此', author: 'photonstorm', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 3030, post: 'https://x.com/photonstorm/status/2120330010112434313', external: true, isNew: true },
        { name: 'Cayley flight simulator', lang: 'no_need', added: '2026-11-13', path: 'https://lauramionel.github.io/cayley-flight-simulator/', preview: '', icon: 'fas fa-gamepad', desc: 'One-shot overnight: real wing physics that computes lift and drag for each part of the wing.', nameZh: 'Cayley 浏览器飞行模拟', descZh: '一夜生成，按真实空气动力学逐段计算机翼的升力和阻力', author: 'lionel_mora', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 294, post: 'https://x.com/lionel_mora/status/2120554787812860294', external: true, isNew: true },
        { name: 'MAAD MAXXING', lang: 'no_need', added: '2026-11-13', path: 'https://maad-maxxing.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: '100% code, no assets. First 3 stages playable; audio by ElevenLabs.', nameZh: 'MAAD MAXXING', descZh: '纯代码、零素材；前 3 关可玩，音频用 ElevenLabs', author: 'Andrew_Blumson', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 241, post: 'https://x.com/Andrew_Blumson/status/2120599812512833557', external: true, isNew: true },
        { name: 'Banana Mine Rush', lang: 'no_need', added: '2026-11-13', path: 'https://remix.gg/g/banana-mine-rush', preview: '', icon: 'fas fa-gamepad', desc: 'A 3D kart racer on Remix: plays instantly in the browser with no account, with multiplayer and leaderboards.', nameZh: 'Banana Mine Rush 矿洞卡丁车', descZh: '3D 卡丁车，浏览器免登录就能玩，带多人和排行榜', author: '0xChuckstock', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 154, post: 'https://x.com/0xChuckstock/status/2120125184606658728', external: true, isNew: true },
        { name: 'Save the World', lang: 'no_need', added: '2026-11-13', path: 'https://save-the-world-fable.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'It built the street, found the 3D models and sounds, and played the game itself to record the trailer. Best on a laptop.', nameZh: 'Save the World 拯救世界', descZh: '街道、3D 模型和音效都是它做或找的，宣传视频也是它自己玩着录的；电脑上玩最好', author: 'global_techgirl', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 63, post: 'https://x.com/global_techgirl/status/2120246750459961453', external: true, isNew: true },
        { name: 'Thunder Valley dino chase', lang: 'no_need', added: '2026-11-13', path: 'https://loktar00.github.io/llm-test-pages/fable52-dino-chase/', preview: '', icon: 'fas fa-gamepad', desc: 'Vanilla JS with its own WebGL renderer; dinos, trees and terrain are stacked 2D pixel slices.', nameZh: 'Thunder Valley 恐龙追逐', descZh: '不用引擎和库，自己写的 WebGL 渲染器，恐龙和树都是一层层像素叠成的 3D', author: 'loktar00', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 92, post: 'https://x.com/loktar00/status/2120905457380507991', external: true, isNew: true },
        { name: 'Survivors', lang: 'no_need', added: '2026-11-13', path: 'https://remix.gg/g/survivors', preview: '', icon: 'fas fa-gamepad', desc: 'Vampire Survivors with WoW-style leveling and loot. Solo or co-op for up to 4.', nameZh: 'Survivors 吸血鬼幸存者 + 魔兽式装备', descZh: '幸存者玩法加魔兽式升级和装备，单人或最多 4 人合作', author: 'BLACKST0CK', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 40, post: 'https://x.com/BLACKST0CK/status/2120329788896498123', external: true, isNew: true },
        { name: 'Thermal', lang: 'no_need', added: '2026-11-13', path: 'https://loktar00.github.io/llm-test-pages/fable52-hang-glider/', preview: '', icon: 'fas fa-gamepad', desc: 'A little hang glider game: ride the thermals and reach the target.', nameZh: 'Thermal 滑翔伞', descZh: '驾驶滑翔伞借热气流飞到终点目标', author: 'loktar00', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 35, post: 'https://x.com/loktar00/status/2121005021131083851', external: true, isNew: true },
        { name: 'Hoppy Meadow', lang: 'no_need', added: '2026-11-13', path: 'https://remix.gg/g/hoppy-meadow', preview: '', icon: 'fas fa-gamepad', desc: 'Looks like a simple platformer until you reach the flagpole.', nameZh: 'Hoppy Meadow 跳跳草地', descZh: '看起来是普通平台跳跃，到旗杆之后才有反转', author: '0xChuckstock', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 26, post: 'https://x.com/0xChuckstock/status/2120620907865473448', external: true, isNew: true },
        { name: 'Harbor Lights Grand Prix', lang: 'no_need', added: '2026-11-13', path: 'https://tetriss22.github.io/harbor-gp/', preview: '', icon: 'fas fa-gamepad', desc: 'One HTML file: 20 pixel cars on a 22-corner street circuit, with a betting window before each race (play money).', nameZh: 'Harbor Lights Grand Prix 港口大奖赛', descZh: '一个 HTML 文件：像素小岛上 20 辆车跑 22 个弯的街道赛，赛前可以下注（虚拟筹码）', author: 'Tetriss112', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 28, post: 'https://x.com/Tetriss112/status/2120946576663134308', external: true, isNew: true },
        { name: 'The Vast Horizon', lang: 'no_need', added: '2026-11-13', path: 'https://the-vast-horizon.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: 'A multiplayer surf game on a shared lake; type a word and the world changes.', nameZh: 'The Vast Horizon 文字冲浪', descZh: '多人在同一片湖上冲浪，输入一个词就会改变世界', author: 'OdinLovis', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 26, post: 'https://x.com/OdinLovis/status/2120198469755503091', external: true, isNew: true },
        { name: 'Handful: Island God', lang: 'no_need', added: '2026-11-13', path: 'https://www.aigameshare.com/games/island-god-game?play=1&mode=fullscreen', preview: '', icon: 'fas fa-gamepad', desc: 'Play a god and guide the little dots to the light.', nameZh: 'Handful 岛屿之神', descZh: '你当神，帮小点们找到光', author: '_nilni', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 11, post: 'https://x.com/_nilni/status/2120639452146250153', external: true, isNew: true },
        { name: 'Great Wave', lang: 'no_need', added: '2026-11-13', path: 'https://www.aigameshare.com/games/great-wave-off-kanagawa?play=1&mode=fullscreen', preview: '', icon: 'fas fa-gamepad', desc: 'Surf into Hokusai\'s Great Wave, row past the wind and thunder gods toward Mount Fuji.', nameZh: 'Great Wave 神奈川冲浪', descZh: '走进北斋《神奈川冲浪里》，划船躲过风神雷神，去富士山', author: '_nilni', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 7, post: 'https://x.com/_nilni/status/2120797996610994355', external: true, isNew: true },
        { name: 'Coloured Pencil', lang: 'no_need', added: '2026-11-13', path: 'https://patch.gg/blendi/coloured-pencil', preview: '', icon: 'fas fa-gamepad', desc: 'A colored-pencil game slice; every surface\'s shading and the whole town are code. Open source.', nameZh: 'Coloured Pencil 彩铅风游戏', descZh: '彩色铅笔质感的小镇游戏片段，所有着色和整个小镇都是代码；开源', author: 'BlendiByl', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 406, post: 'https://x.com/BlendiByl/status/2121130385723789637', external: true, isNew: true },
        { name: 'KUMOKIRI', lang: 'no_need', added: '2026-11-13', path: 'https://app.usecrayon.ai/play/0cd7624e-1297-417e-a5be-b3c3036a496a', preview: '', icon: 'fas fa-gamepad', desc: 'A painterly samurai game made with Fable 5.2, Crayon and three.js.', nameZh: 'KUMOKIRI 水墨武士', descZh: '绘画风的武士游戏，Fable 5.2 + Crayon + three.js', author: 'aniketjart', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 39, post: 'https://x.com/aniketjart/status/2121101334900617631', external: true, isNew: true },
        { name: 'NightClub: Drift & Speed', lang: 'no_need', added: '2026-11-13', path: 'https://www.nightclub-driftspeed.xyz/', preview: '', icon: 'fas fa-gamepad', desc: 'A browser drift racing game with a worldwide leaderboard, built from an empty folder in 72 hours.', nameZh: 'NightClub: Drift & Speed 夜店漂移', descZh: '浏览器里的漂移赛车，带全球排行榜，72 小时从空文件夹做出来', author: 'Story91_', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 13, post: 'https://x.com/Story91_/status/2121016763190059194', external: true, isNew: true },
        { name: 'Reef Dive', lang: 'no_need', added: '2026-11-13', path: 'https://wavedash.com/games/reef-dive', preview: '', icon: 'fas fa-gamepad', desc: 'A three.js diving game the author handed to Fable 5.2 for one day to make it feel like a much bigger game.', nameZh: 'Reef Dive 珊瑚潜水', descZh: '作者把十月做的 three.js 潜水游戏交给 Fable 5.2 改了一天，画面大升级', author: 'boona11', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 10, post: 'https://x.com/boona11/status/2120886837422195123', external: true, isNew: true },
        { name: 'Starfall — a browser MOBA', lang: 'no_need', added: '2026-11-13', path: 'https://sanwan.ai/games/xingyun-moba/', preview: '', icon: 'fas fa-gamepad', desc: 'One prompt, about 20 hours of Fable 5.2: five heroes, one human player and NPCs.', nameZh: '星陨战纪：网页版类王者荣耀', descZh: '一句提示词，Fable 5.2 跑了约 20 小时；5 个英雄，一个真人玩家加 NPC', author: 'FuSheng_0306', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 246, post: 'https://x.com/FuSheng_0306/status/2121237878097207583', external: true, isNew: true },
        { name: 'Kestrel Head — Solstice racing', lang: 'no_need', added: '2026-11-13', path: 'https://samg-coder.github.io/solstice-racing/', preview: '', icon: 'fas fa-gamepad', desc: 'Built on the author\'s own Rust + WebGPU engine: a Porsche 992 GT3 R modeled in Blender and a 3 km island circuit. Controller support.', nameZh: 'Kestrel Head 赛车（Solstice 引擎）', descZh: '用作者自己的 Rust + WebGPU 引擎；在 Blender 里建了保时捷 992 GT3 R 和 3 公里海岛赛道，支持手柄', author: 'SamGCoder', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 56, github: 'https://github.com/SamG-Coder/solstice-racing', post: 'https://x.com/SamGCoder/status/2120044542087070066', external: true, isNew: true },
        { name: 'Poke Dodge', lang: 'no_need', added: '2026-11-14', path: 'http://poke-jam.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: 'A 2v2 Pokemon x dodgeball mashup with NBA Jam flavor: gym ladder, type matchups and held items, on a Three.js stage.', nameZh: 'Poke Dodge 宝可梦躲避球', descZh: '2v2 宝可梦 × 躲避球，带 NBA Jam 味道；有道馆天梯、属性克制和携带道具', author: 'crtvTeknologist', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 13, post: 'https://x.com/crtvTeknologist/status/2121319366830809285', external: true, isNew: true },
        { name: 'INFALL — you are the black hole', lang: 'no_need', added: '2026-11-14', path: 'https://infall-game.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: 'The only instruction was "go crazy and blow my mind"; it went from idea to game in one shot.', nameZh: 'INFALL 你就是黑洞', descZh: '只说了「放开做，让我大吃一惊」，从点子到代码一次做出', author: 'AugustCastilIo', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 4, post: 'https://x.com/AugustCastilIo/status/2121350653037756557', external: true, isNew: true },
        { name: 'Aussie Outback 4x4', lang: 'no_need', added: '2026-11-14', path: 'https://rust4x4.com/', preview: '', icon: 'fas fa-gamepad', desc: 'Off-roading in the Australian bush on the author\'s own Rust + WebGPU engine: mud, creek crossings, rock crawling, diff locks, tyre pressure and dynamic weather.', nameZh: 'Aussie Outback 4x4 澳洲越野', descZh: '作者自己的 Rust + WebGPU 引擎：泥地、涉溪、攀岩、差速锁、胎压和动态天气', author: 'SamGCoder', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 31, post: 'https://x.com/SamGCoder/status/2121513178303811931', external: true, isNew: true },
        { name: 'Small Magic — wizard sandbox', lang: 'no_need', added: '2026-11-14', path: 'https://patch.gg/play/blendi/small-magic', preview: '', icon: 'fas fa-gamepad', desc: 'Built in one day: 7 spells, about 1,800 destructible physics pieces, no models or textures, open source.', nameZh: 'Small Magic 巫师沙盒', descZh: '一天做出的巫师沙盒：7 种法术、约 1800 块可破坏的物理碎片，零模型零贴图，开源', author: 'BlendiByl', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 2560, post: 'https://x.com/BlendiByl/status/2121594536153718972', external: true, isNew: true },
        { name: 'PaletteRider — cycle through famous paintings', lang: 'no_need', added: '2026-11-14', path: 'https://aashishgtbit.github.io/PaletteRider/', preview: '', icon: 'fas fa-gamepad', desc: 'Ride a bicycle through cities from Klee\'s Castle and Sun and Van Gogh\'s Café Terrace at Night; the music was made by Fable 5.2 too.', nameZh: 'PaletteRider 骑车进名画', descZh: '骑自行车穿过名画里的城市：克利《城堡与太阳》、梵高《夜晚露天咖啡座》，音乐也是它做的', author: 'Aashish_Tiwari_', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 10, post: 'https://x.com/Aashish_Tiwari_/status/2120963463610880150', external: true, isNew: true },
        { name: 'Midnight Grid', lang: 'no_need', added: '2026-11-15', path: 'https://mikenevermiss.github.io/midnight-grid/', preview: '', icon: 'fas fa-gamepad', desc: 'An open-world driving game from one prompt: race through the city, crash into traffic and get chased by the cops. Every car, building, texture and sound is generated in code.', nameZh: 'Midnight Grid 午夜城市飙车', descZh: '一句提示词做出的开放世界驾驶游戏：在城市里飙车、撞车、被警察追，车辆、建筑、贴图和音效全是代码生成', author: 'mikenevermiss', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 28, post: 'https://x.com/mikenevermiss/status/2121900977959612500', external: true, isNew: true },
        { name: 'Monster Math', lang: 'no_need', added: '2026-11-16', path: 'https://monstermath.ai-created.com', preview: '', icon: 'fas fa-gamepad', desc: 'A Pokémon-inspired K-5 math practice and tutoring game. Open source under MIT; play it online or run it locally.', nameZh: 'Monster Math 怪兽数学', descZh: '仿宝可梦的小学 K–5 数学练习和辅导游戏，MIT 开源，可以在线玩也能本地跑', author: 'AIandDesign', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 28, github: 'https://github.com/TheMarco/monstermath', post: 'https://x.com/AIandDesign/status/2122108555356778615', external: true, isNew: true },
        { name: 'omw: a castle valley in oil brush strokes', lang: 'no_need', added: '2026-11-16', path: 'https://omw-game.kimaki.dev', preview: '', icon: 'fas fa-gamepad', desc: 'The "omw" pixel-art post by @de5imulate rebuilt as a playable three.js game in the browser, rendered like an oil painting.', nameZh: 'omw 油画笔触的城堡山谷', descZh: '把 @de5imulate 那张「omw」像素画做成浏览器里能玩的 three.js 游戏，整个画面像油画笔触', author: '__morse', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 4484, github: 'https://github.com/remorses/castle-valley', post: 'https://x.com/__morse/status/2122013410309153042', external: true, isNew: true },
        { name: 'Solar: a tiny solar system you can fly around', lang: 'no_need', added: '2026-11-17', path: 'https://patch.gg/play/blendi/solar', preview: '', icon: 'fas fa-gamepad', desc: 'Inspired by Outer Wilds: real orbits and gravity, unbroken flights between planets, and every world drawn by code. Open source.', nameZh: 'Solar 可以飞来飞去的迷你太阳系', descZh: '受《星际拓荒》启发：真实轨道和引力，行星之间一路连续飞行，星球全由代码画出；开源', author: 'BlendiByl', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 793, post: 'https://x.com/BlendiByl/status/2122673770607591855', external: true, isNew: true },
        { name: 'Uno com Escada: a Fiat Uno with a ladder on a race circuit', lang: 'no_need', added: '2026-11-18', path: 'https://viktorkav.com.br/apoio/uno-com-escada/fable/', preview: '', icon: 'fas fa-gamepad', desc: 'Drive a 1996 Uno Mille with a ladder on the roof around a circuit. One 603 KB HTML file with no engine, 3D library or textures; the car, forest, sky and engine sound all come from code.', nameZh: 'Uno com Escada 车顶绑梯子的菲亚特 Uno 赛道', descZh: '开着车顶绑梯子的 96 款 Uno Mille 跑赛道；一个 603 KB 的 HTML，没用引擎、3D 库和贴图，车、树林、天空和 1.0 发动机的声音全由代码生成', author: 'ViktorKav', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 9194, github: 'https://github.com/viktorkav/uno-com-escada', post: 'https://x.com/ViktorKav/status/2122647483281015155', external: true, isNew: true },
        { name: 'HADAL: a dive into the Mariana Trench', lang: 'no_need', added: '2026-11-18', path: 'https://mariana.pplx.app', preview: '', icon: 'fas fa-gamepad', desc: 'Start on a sunlit reef, board a submarine and descend past shipwrecks and a whale fall to Challenger Deep, scanning 18 discoveries. A hand-written WebGPU renderer with no engine or assets, in one 373 KB HTML file.', nameZh: 'HADAL 下潜马里亚纳海沟', descZh: '从珊瑚礁出发，坐潜艇经过沉船和鲸落一路潜到挑战者深渊，沿途扫描 18 处发现；自己写的 WebGPU 渲染器，没有引擎和素材，整个游戏是一个 373 KB 的 HTML', author: 'AravSrinivas', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 364, post: 'https://x.com/AravSrinivas/status/2122713692324384793', external: true, isNew: true },
        { name: 'Xiyou X: a Journey to the West tower defense', lang: 'no_need', added: '2026-11-18', path: 'https://nisen0808-web.github.io/xiyou-td-play/', preview: '', icon: 'fas fa-gamepad', desc: 'A tower defense test build with eight levels, five difficulties and special character cards to draw. Runs in desktop and mobile browsers, best in landscape.', nameZh: '西游X 西游题材塔防', descZh: '西游题材塔防测试版：八个关卡、五种难度，可抽特殊角色卡；网页和手机浏览器都能玩，横屏体验更好', author: 'PhyrexNi', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 59, post: 'https://x.com/PhyrexNi/status/2122602578978709908', external: true, isNew: true },
        { name: 'Fall Line: downhill MTB', lang: 'no_need', added: '2026-11-19', path: 'https://fallline-9zo.pages.dev', preview: '', icon: 'fas fa-gamepad', desc: 'A downhill mountain bike game in three.js, playable in the browser with a keyboard. The author spent 7 days riding every build and telling Fable what felt wrong.', nameZh: 'Fall Line 山地车速降', descZh: 'three.js 写的山地车速降游戏，浏览器里用键盘就能玩；作者花 7 天把每一版都骑一遍，告诉它哪里手感不对', author: 'BananaOfMercy', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 279, post: 'https://x.com/BananaOfMercy/status/2123037856398733438', external: true, isNew: true },
        { name: 'Napoleon x Locke', lang: 'no_need', added: '2026-11-19', path: 'https://napolehim.com', preview: '', icon: 'fas fa-gamepad', desc: 'Ride Napoleon\'s winged horse through Egypt, Italy, Paris and Saint Helena. Claim the crown, fly the roadster, pop the balloons.', nameZh: 'Napoleon x Locke 骑飞马走完拿破仑的一生', descZh: '骑着拿破仑的飞马穿过埃及、意大利、巴黎和圣赫勒拿岛，抢皇冠、戳气球', author: 'lockeorca', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 9, post: 'https://x.com/lockeorca/status/2123044026152890803', external: true, isNew: true },
        { name: 'Ink Flight', lang: 'no_need', added: '2026-11-20', path: 'https://wavedash.com/games/ink-flight', preview: '', icon: 'fas fa-gamepad', desc: 'Fly a folded paper plane through a world drawn entirely in code. No images, no 3D models, playable in the browser.', nameZh: 'Ink Flight 飞过速写本的纸飞机', descZh: '开着一架折出来的纸飞机飞过它用代码画的世界，没用图片和 3D 模型，浏览器里直接飞', author: 'prasenx', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 16, github: 'https://github.com/StarKnightt/ink-flight', post: 'https://x.com/prasenx/status/2123467881170243808', external: true, isNew: true },
        { name: 'Room 13', lang: 'no_need', added: '2026-11-20', path: 'https://room13.srv1903550.hstgr.cloud', preview: '', icon: 'fas fa-gamepad', desc: 'An interactive game for learning English through mystery stories: double-click any word to look it up, translate sentences, then clear reading quizzes.', nameZh: '13 号教室 Room 13 读悬疑故事学英语', descZh: '用悬疑对话小说学英语的互动游戏：不认识的词双击就查，句子能翻译，读完做阅读理解闯关', author: 'MartinaBuilds', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 7, post: 'https://x.com/MartinaBuilds/status/2123424275462053893', external: true, isNew: true }
    ],
    Board: [
        { name: 'Connect Four', lang: 'no_need', path: 'games/Board/Connect-Four/index.html', preview: 'games/Board/Connect-Four/preview.webp', icon: 'fas fa-circle', desc: 'Classic four-in-a-row strategy game.' },
        { name: 'Blackjack', lang: 'no_need', path: 'games/Board/Blackjack/index.html', preview: 'games/Board/Blackjack/preview.webp', icon: 'fas fa-club', desc: 'Classic 21-point poker card game.' },
        { name: 'Checkers', lang: 'no_need', path: 'games/Board/Checkers/index.html', preview: 'games/Board/Checkers/preview.webp', icon: 'fas fa-chess-board', desc: 'Classic checkers game.' },
        { name: 'Poker', lang: 'no_need', path: 'games/Board/Poker/index.html', preview: 'games/Board/Poker/preview.webp', icon: 'fas fa-diamond', desc: 'Classic five-card poker game.' },
        { name: 'Battleship', lang: 'no_need', path: 'games/Board/Battleship/index.html', preview: 'games/Board/Battleship/preview.webp', icon: 'fas fa-ship', desc: 'Classic battleship game.' },
        { name: 'Backgammon', lang: 'no_need', path: 'games/Board/Backgammon/index.html', preview: 'games/Board/Backgammon/preview.webp', icon: 'fas fa-dice', desc: 'AI-generated classic backgammon.' },
        { name: 'Chess', lang: 'no_need', path: 'games/Board/Chess/index.html', preview: 'games/Board/Chess/preview.webp', icon: 'fas fa-chess', desc: 'AI-generated chess game.' },
        { name: 'FreeCell', lang: 'no_need', path: 'games/Board/Freecell/index.html', preview: 'games/Board/Freecell/preview.webp', icon: 'fas fa-clone', desc: 'AI-generated freecell solitaire.' },
        { name: '8 Ball', lang: 'no_need', path: 'games/Board/8-Ball/index.html', preview: 'games/Board/8-Ball/preview.webp', icon: 'fas fa-circle', desc: 'AI-generated American 8-ball pool.' },
        { name: 'Crazy Eights', lang: 'no_need', path: 'games/Board/Crazy-Eights/index.html', preview: 'games/Board/Crazy-Eights/preview.webp', icon: 'fas fa-clone', desc: 'AI-generated crazy eights card game.' },
        { name: 'Ludo', lang: 'no_need', path: 'games/Board/Ludo/index.html', preview: 'games/Board/Ludo/preview.webp', icon: 'fas fa-dice', desc: 'AI-generated classic ludo.' },
        { name: 'Yacht', lang: 'no_need', path: 'games/Board/Yahtzee/index.html', preview: 'games/Board/Yahtzee/preview.webp', icon: 'fas fa-dice', desc: 'AI-generated dice game.' },
        { name: 'Gomoku', lang: 'no_need', path: 'games/Board/Gomoku/index.html', preview: 'games/Board/Gomoku/preview.webp', icon: 'fas fa-circle-dot', desc: 'Five-in-a-row battle.' },
        { name: 'Rock Paper Scissors', lang: 'no_need', path: 'games/Board/Rock-Paper-Scissors/index.html', preview: 'games/Board/Rock-Paper-Scissors/preview.webp', icon: 'fas fa-hand-scissors', desc: 'Rock paper scissors.' },
        { name: 'Tic Tac Toe', lang: 'no_need', path: 'games/Board/Tic-Tac-Toe/index.html', preview: 'games/Board/Tic-Tac-Toe/preview.webp', icon: 'fas fa-hashtag', desc: 'Tic-tac-toe game.' },
        { name: 'Reversi', lang: 'no_need', path: 'games/Board/Reversi/index.html', preview: 'games/Board/Reversi/preview.webp', icon: 'fas fa-circle-half-stroke', desc: '3D reversi game.' },
        { name: 'Solitaire', lang: 'no_need', path: 'games/Board/Solitaire/index.html', preview: 'games/Board/Solitaire/preview.webp', icon: 'fas fa-layer-group', hot: true, desc: 'Solitaire card game.' },
        { name: 'Mahjong Connect', lang: 'no_need', path: 'games/Board/Mahjong-Connect/index.html', preview: 'games/Board/Mahjong-Connect/preview.webp', icon: 'fas fa-border-all', desc: 'Mahjong connect game.' },
        { name: 'Agora', lang: 'no_need', path: 'games/Board/agora/index.html', preview: 'games/Board/agora/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated strategy board game.', isNew: true },
        { name: 'Aresia', lang: 'no_need', path: 'games/Board/aresia/index.html', preview: 'games/Board/aresia/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated strategy board game.', isNew: true },
        { name: 'Bisque', lang: 'no_need', path: 'games/Board/bisque/index.html', preview: 'games/Board/bisque/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated original board game.', isNew: true },
        { name: 'Doctrine', lang: 'no_need', path: 'games/Board/doctrine/index.html', preview: 'games/Board/doctrine/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated strategy board game.', isNew: true },
        { name: 'Go (Baduk / Weiqi) — Free Online Game, 19×19', lang: 'no_need', path: 'games/Board/go/index.html', preview: 'games/Board/go/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated classic Go game.', isNew: true },
        { name: 'Mahjong Solitaire — Free Online Tile Match Game', lang: 'no_need', path: 'games/Board/mahjong/index.html', preview: 'games/Board/mahjong/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated classic mahjong game.', isNew: true },
        { name: 'Mancala — Free Online Kalah', lang: 'no_need', path: 'games/Board/mancala/index.html', preview: 'games/Board/mancala/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated classic mancala game.', isNew: true },
        { name: 'Othello — Free Online Reversi Game', lang: 'no_need', path: 'games/Board/othello/index.html', preview: 'games/Board/othello/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated classic othello game.', isNew: true },
        { name: 'Pente Grammai', lang: 'no_need', path: 'games/Board/pentegrammai/index.html', preview: 'games/Board/pentegrammai/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated original board game.', isNew: true },
        { name: 'Senet', lang: 'no_need', path: 'games/Board/senet/index.html', preview: 'games/Board/senet/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated ancient Egyptian board game.', isNew: true },
        { name: 'The Royal Game of Ur', lang: 'no_need', path: 'games/Casual/ur/index.html', preview: 'games/Casual/ur/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated ancient Mesopotamian board game.', isNew: true },
        { name: 'Carrom', lang: 'no_need', path: 'games/Board/carrom/index.html', preview: 'games/Board/carrom/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Carrom game.', isNew: true },
        { name: 'Snake And Ladder', lang: 'no_need', path: 'games/Board/snake-and-ladder/index.html', preview: 'games/Board/snake-and-ladder/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Snake And Ladder game.', isNew: true },
        { name: 'Three Kingdoms', lang: 'text', path: 'games/Board/Three-Kingdoms/index.html', preview: 'games/Board/Three-Kingdoms/preview.webp', icon: 'fas fa-gamepad', desc: 'Choose Wei, Shu or Wu: manage gold and grain on a 15-city map, command 108 generals in turn-based campaigns against AI factions for unification.', author: 'MartinDelophy', source: 'astragames 收录（开源）', github: 'https://github.com/MartinDelophy/awesome-gpt-6-astra' },
        { name: 'Mahjong Solitaire', lang: 'no_need', added: '2026-10-20', path: 'games/Board/Mahjong-Solitaire-Game/index.html', preview: 'games/Board/Mahjong-Solitaire-Game/preview.webp', icon: '🀄', desc: 'Classic mahjong connect: match two identical open tiles and clear the board.', isNew: true },
        { name: 'Four-Player Mahjong', lang: 'no_need', added: '2026-11-08', path: 'games/Board/Pomax-Mahjong/index.html', preview: 'games/Board/Pomax-Mahjong/preview.webp', icon: '🀄', desc: '阜阳麻将手机单机：不带花牌、只碰不吃、只能自摸，与三家电脑同桌，中文语音报牌，点开就玩，不用下载。', author: 'Pomax', source: 'GitHub 开源项目（纯 HTML/CSS/JS）', github: 'https://github.com/Pomax/mahjong', isNew: true },
        { name: 'Late Eastern Han Dynasty', lang: 'text', added: '2026-11-08', path: 'games/Board/Late-Eastern-Han-Dynasty/index.html', preview: 'games/Board/Late-Eastern-Han-Dynasty/preview.webp', icon: '🏯', desc: 'A deep late-Han grand strategy game: 223 officers with loyalty and recruitment, 30 cities, diplomacy and 11 stratagems, 9 troop types and 7 formations, hex battles and nine historical scenarios.', author: 'CtxPilot', source: 'GitHub 开源项目（MIT）', github: 'https://github.com/CtxPilot/Late-Eastern-Han-Dynasty', isNew: true }
    ],
    Memory: [
        { name: 'Color Match', lang: 'no_need', path: 'games/Memory/Color-Match/index.html', icon: 'fas fa-palette', desc: 'Color matching memory game.' },
        { name: 'Match Pairs', lang: 'no_need', path: 'games/Memory/Match-Pairs/index.html', icon: 'fas fa-clone', desc: 'Pair matching memory game.' },
        { name: 'Memory Card', lang: 'no_need', path: 'games/Memory/Memory-Card/index.html', icon: 'fas fa-id-card', desc: 'Memory card flip game.' },
        { name: 'Simon Says', lang: 'no_need', path: 'games/Memory/Simon-Says/index.html', icon: 'fas fa-circle-notch', desc: 'Simon says memory game.' }
    ],
    Typing: [
        { name: 'Monkey Type', lang: 'text', path: 'games/Typing/MonkeyType/index.html', preview: 'games/Typing/MonkeyType/preview.webp', icon: 'fas fa-keyboard', desc: 'AI-generated typing test.' },
        { name: 'WORD RAIN', lang: 'text', path: 'games/Typing/Word-Rain/index.html', preview: 'games/Typing/Word-Rain/preview.webp', icon: 'fas fa-cloud-rain', desc: 'AI-generated typing rain.' },
        { name: 'Hangman', lang: 'text', path: 'games/Typing/Hangman/index.html', icon: 'fas fa-spell-check', desc: 'Word guessing game.' },
        { name: 'Speed Typing', lang: 'text', path: 'games/Typing/Speed-Typing/index.html', icon: 'fas fa-keyboard', desc: 'Speed typing practice.' },
        { name: 'Type Master', lang: 'text', path: 'games/Typing/Type-Master/index.html', icon: 'fas fa-font', desc: 'Type master game.' },
        { name: 'Typing Speed Challenge', lang: 'text', path: 'games/Typing/Typing-Speed-Challenge/index.html', icon: 'fas fa-stopwatch', desc: 'Typing speed challenge.' },
        { name: 'Typing Race', lang: 'text', path: 'games/Typing/typing-race/index.html', preview: 'games/Typing/typing-race/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated typing speed race.', isNew: true },
        { name: 'Typing Game', lang: 'no_need', added: '2026-10-20', path: 'games/Typing/Typing-Game/index.html', preview: 'games/Typing/Typing-Game/preview.webp', icon: '⌨️', desc: 'Typing practice: hit the prompted letters fast and accurately to improve input speed.', isNew: true }
    ],
    Adventure: [,
        
        { name: 'Mirror Earth', lang: 'no_need', added: '2026-11-13', path: 'https://www.spawn.co/@mattshumer/earth?room=local', preview: '', icon: 'fas fa-gamepad', desc: 'The whole planet as a destructible game world, with weather that matches the real Earth in real time.', nameZh: 'Mirror Earth 镜像地球', descZh: '整个地球可去可破坏，天气等与真实地球实时同步', author: 'mattshumer_', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 2390, post: 'https://x.com/mattshumer_/status/2119877065701036047', external: true, isNew: true },
        { name: 'What the Water Keeps', lang: 'no_need', added: '2026-11-13', path: 'https://what-the-water-keeps.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'A boat ride through 8 dreamlike worlds, playable in the browser.', nameZh: 'What the Water Keeps 梦境划船', descZh: '穿过 8 个梦境世界的划船游戏；原帖没放链接，链接来自转发者 @Bhavani_00007 / @meta_pavy', author: 'kevin_t_ngo', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 4224, post: 'https://x.com/kevin_t_ngo/status/2119868968307695818', external: true, isNew: true },
        { name: 'VOWLORN', lang: 'no_need', added: '2026-11-13', path: 'https://higgsfield.ai/@higgsfield.studio/blogs/fable-5-2-built-this-rpg-from-pure-code-here-s-every-step', preview: '', icon: 'fas fa-gamepad', desc: 'A dark RPG where even the voices are code, deployed through Higgsfield MCP. Links go to the play pages with full workflows.', nameZh: 'VOWLORN 纯代码暗黑 RPG', descZh: '配音也是代码生成，经 Higgsfield MCP 发布；链接是带试玩入口的博客页', author: 'higgsfield_ai', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 46, post: 'https://x.com/higgsfield_ai/status/2119997122896601269', external: true, isNew: true },
        { name: 'CROSSTOWN — open-world New York (early preview)', lang: 'no_need', added: '2026-11-13', path: 'https://nyc.somethingbig.ai/', preview: '', icon: 'fas fa-gamepad', desc: '"Rockstar took 8 years. Fable 5.2 is gonna do it in 7 days." Only part of the city is in so far; press B to send feedback.', nameZh: 'CROSSTOWN 纽约开放世界（早期试玩）', descZh: '「Rockstar 花了 8 年，Fable 5.2 要 7 天做完」；目前只开放一部分城市，按 B 可以提反馈', author: 'mattshumer_', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 7475, post: 'https://x.com/mattshumer_/status/2120282133503820150', external: true, isNew: true },
        { name: 'The Waking River', lang: 'no_need', added: '2026-11-13', path: 'https://rivergame-kappa.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: 'One prompt and a few follow-ups: five sleeping worlds that wake as you sail through, with a score made from code.', nameZh: 'The Waking River 奇幻航行', descZh: '一条提示词加几次追问；五个随航行苏醒的世界，配乐也是代码生成', author: 'flxrnc', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 86, post: 'https://x.com/flxrnc/status/2120494277528580110', external: true, isNew: true },
        { name: 'Giant Leap', lang: 'no_need', added: '2026-11-13', path: 'https://giant-leap.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: 'Jump from the Moon to the Earth. You just jump.', nameZh: 'Giant Leap 从月球跳回地球', descZh: '只需要跳', author: 'handsher_NGU', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 23, post: 'https://x.com/handsher_NGU/status/2120287667141374212', external: true, isNew: true },
        { name: 'Go for Launch', lang: 'no_need', added: '2026-11-13', path: 'https://clockendbader.github.io/fable-builds/go-for-launch/', preview: '', icon: 'fas fa-gamepad', desc: 'A full cockpit game from Earth to the Moon in one prompt: 1 h 18 min, about $30. Three difficulty levels, live gauges, mission control on the radio; every sound made in code.', nameZh: 'Go for Launch 从地球到月球驾驶舱', descZh: '一条提示词，1 小时 18 分、约 $30；三档难度、实时仪表，无线电里有任务控制中心，声音全是代码生成', author: 'clockendbader', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 5, post: 'https://x.com/clockendbader/status/2121251400533631304', external: true, isNew: true },
        { name: 'Unsung Vale — open-world RPG', lang: 'no_need', added: '2026-11-14', path: 'https://unsung-vale.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'A third-person open-world RPG demo. No assets: everything on screen is made with code.', nameZh: 'Unsung Vale 开放世界 RPG', descZh: '第三人称开放世界 RPG 试玩版，没用任何素材，画面全是代码生成', author: 'LexnLin', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 302, github: 'https://github.com/Leonxlnx/unsung-vale', post: 'https://x.com/LexnLin/status/2121253191748669705', external: true, isNew: true },
        { name: 'Valsera — side-scrolling RPG', lang: 'no_need', added: '2026-11-15', path: 'https://valsera-game.vercel.app/', preview: '', icon: 'fas fa-gamepad', desc: 'A browser-playable side-scrolling RPG; every visual is drawn with code, no image model or pre-made art.', nameZh: 'Valsera 横版 RPG', descZh: '浏览器里能玩的横版 RPG，画面全是代码画的，没用图像模型和现成素材', author: 'kevin_t_ngo', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 511, post: 'https://x.com/kevin_t_ngo/status/2121701020598415465', external: true, isNew: true },
        { name: 'VICE \'86: open-world driving in a neon 1986 Miami', lang: 'no_need', added: '2026-11-17', path: 'https://heat.pplx.app', preview: '', icon: 'fas fa-gamepad', desc: 'An open-world driving game that runs in the browser. No game engine and no three.js: it has its own WebGL2 renderer, and the city, cars, rain and engine sounds are all generated by code, about 63,000 lines of JavaScript.', nameZh: 'VICE \'86 霓虹 1986 迈阿密开放世界驾驶', descZh: '浏览器里跑的开放世界驾驶游戏，没用游戏引擎和 three.js，自己写的 WebGL2 渲染器，城市、车、雨和引擎声全是代码生成，约 6.3 万行 JavaScript', author: 'AravSrinivas', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 1269, post: 'https://x.com/AravSrinivas/status/2122338465648103676', external: true, isNew: true },
        { name: 'Market Order', lang: 'no_need', added: '2026-11-20', path: 'https://market-order-city.netlify.app/', preview: '', icon: 'fas fa-gamepad', desc: 'An open-world driving game where you steal cars and run missions. Everything from your wanted level to the weather is driven by Anthropic\'s ANT stock price.', nameZh: 'Market Order 股价说了算的开放世界', descZh: '偷车、接任务的开放世界驾驶游戏：通缉等级、天气和天际线全由 Anthropic 股票 ANT 的实时行情决定', author: 'emollick', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 170, post: 'https://x.com/emollick/status/2123520499368263977', external: true, isNew: true }
    ],
    Casual: [
        { name: 'Tidehook', lang: 'little', added: '2026-10-10', path: 'games/Casual/tidehook/index.html', preview: 'games/Casual/tidehook/preview.webp', icon: '🎮', desc: 'Steer the tugboat Mallow through three coastal journeys, haul salvaged cargo of different weights that affect speed and turning, deliver to the port crane, and recover the lighthouse lens.' },
        { name: 'JUNK RUN', lang: 'little', added: '2026-10-10', path: 'games/Casual/junk-run/index.html', preview: 'games/Casual/junk-run/preview.webp', icon: '🎮', desc: 'Assemble a motorless car from scrap parts, then ride gravity down the hill; start in the first-person workshop.' },
        { name: 'Spy or Lie', lang: 'text', added: '2026-10-10', path: 'games/Casual/spy-or-lie/index.html', preview: 'games/Casual/spy-or-lie/preview.webp', icon: '🎮', desc: 'A hex-based strategy board game vs the CPU: place agents with hidden identities, bluff and surround enemy groups to trigger chain captures.' },
        { name: 'Hypoxia', lang: 'little', added: '2026-10-10', path: 'games/Casual/hypoxia/index.html', preview: 'games/Casual/hypoxia/preview.webp', icon: '🚀', desc: 'Underground colony survival: command three dupes to dig and build, managing oxygen, food and power to keep the base running.' },
        { name: 'Magic Tower', lang: 'little', added: '2026-10-10', path: 'games/Casual/magic-tower/index.html', preview: 'games/Casual/magic-tower/preview.webp', icon: '🏰', desc: 'A fifteen-floor pixel tower adventure: plan routes around attack-defense math, limited resources and three-colored keys as you explore floor by floor.' },
        { name: 'Eternal Wilderness', lang: 'text', added: '2026-10-10', path: 'games/Casual/eternal-wilderness/index.html', preview: 'games/Casual/eternal-wilderness/preview.webp', icon: '🎮', desc: 'A submitted Don\'t Starve-inspired web survival strategy game; screenshots show forest exploration, resource gathering, a backpack, and health, hunger and sanity stats.' },
        { name: 'Dave the Diver', lang: 'little', added: '2026-10-10', path: 'games/Casual/dave-the-diver/index.html', preview: 'games/Casual/dave-the-diver/preview.webp', icon: '🎮', desc: 'A browser remake of Dave the Diver combining underwater spearfishing, sushi restaurant management and island farming.' },
        { name: 'No Moat', lang: 'text', added: '2026-10-10', path: 'games/Casual/no-moat/index.html', preview: 'games/Casual/no-moat/preview.webp', icon: '🎮', desc: 'A startup-themed roguelike card game: recruit a team, play cards against copycats, bugs and cloud bills.' },
        { name: 'The Free Game', lang: 'little', added: '2026-10-10', path: 'games/Casual/the-free-game-web/index.html', preview: 'games/Casual/the-free-game-web/preview.webp', icon: '🎮', desc: 'Build roads, train workers and set up production chains in a detailed 3D medieval village.' },
        { name: 'AGI of Empires', lang: 'text', added: '2026-10-10', path: 'games/Casual/agi-of-empires/index.html', preview: 'games/Casual/agi-of-empires/preview.webp', icon: '🎮', desc: 'Collect funds and GPUs, build data centers and armies, and race to complete ASI research or destroy rival AI labs\' headquarters.' },
        { name: 'Atlas Go', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/atlas-go/index.html', preview: 'games/Casual/atlas-go/preview.webp', icon: '🎮', desc: 'Play Go on city street networks and special graphic boards, with local pass-and-play and friend-match entry.' },
        { name: 'Ironwood', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/ironwood/index.html', preview: 'games/Casual/ironwood/preview.webp', icon: '🎮', desc: 'Gather raw materials, power machines and connect conveyor belts to turn a forest clearing into a running factory.' },
        { name: 'DUST FRONT', lang: 'little', added: '2026-10-10', path: 'games/Casual/dust-front/index.html', preview: 'games/Casual/dust-front/preview.webp', icon: '🎮', desc: 'Single-player RTS: build bases, capture outposts, and command ground and air forces in battle.' },
        { name: 'Frontline Command', lang: 'little', added: '2026-10-10', path: 'games/Casual/frontline-command/index.html', preview: 'games/Casual/frontline-command/preview.webp', icon: '🎮', desc: 'A modern-warfare RTS: build bases, contest resource zones, command tanks, infantry, planes and drones against the CPU, and gain edges through spies and intel systems.' },
        { name: 'Coin Pusher Roguelite', lang: 'little', added: '2026-10-10', path: 'games/Casual/mintfall/index.html', preview: 'games/Casual/mintfall/preview.webp', icon: '🎮', desc: 'Aim coins in a 3D coin pusher, combine special coins and relics, and hit six rounds of score goals with limited throws.' },
        { name: 'Westward', lang: 'little', added: '2026-10-10', path: 'games/Casual/westward/index.html', preview: 'games/Casual/westward/preview.webp', icon: '🎮', desc: 'Lead a wagon train west along the Oregon Trail, ration food, schedule hunting and repairs, and handle journey choices.' },
        { name: 'Outerstead', lang: 'little', added: '2026-10-10', path: 'games/Casual/outerstead/index.html', preview: 'games/Casual/outerstead/preview.webp', icon: '🎮', desc: 'Build a frontier colony for four survivors, manage food and job priorities, and explore the secrets of Hollow-7.' },
        { name: 'Outermate', lang: 'text', added: '2026-10-10', path: 'games/Casual/outermate/index.html', preview: 'games/Casual/outermate/preview.webp', icon: '🎮', desc: 'Learn a prison\'s daily routine, build relationships and collect permissions and supplies to prepare multiple escape routes.' },
        { name: 'Česká dobrodružství', lang: 'little', added: '2026-10-10', path: 'games/Casual/czech-adventures/index.html', preview: 'games/Casual/czech-adventures/preview.webp', icon: '🎮', desc: 'Explore a miniature Czech world by train, car, boat or plane, switching vehicles and completing small tasks.' },
        { name: 'Land', lang: 'text', added: '2026-10-10', path: 'games/Casual/land-if-you-can/index.html', preview: 'games/Casual/land-if-you-can/preview.webp', icon: '🎮', desc: 'Take over an airliner or light plane, follow tower guidance through approach and landing challenges with five scenarios, an interactive cabin and flight replay.' },
        { name: 'Last Train to the Sea', lang: 'text', added: '2026-10-10', path: 'games/Casual/last-train-to-the-sea/index.html', preview: 'games/Casual/last-train-to-the-sea/preview.webp', icon: '🎮', desc: 'Drive a winged tram through five cloud towns, keep it balanced, ferry passengers, and collect fares, tickets and station stamps.' },
        { name: 'Realm of Seratari', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/realm-of-seratari/index.html', preview: 'games/Casual/realm-of-seratari/preview.webp', icon: '🎮', desc: 'Raise dragons, hunt and collect gold in a procedurally generated world, and decide how to treat towns that grow, defend and ally.' },
        { name: 'Monopoly City', lang: 'text', added: '2026-10-10', path: 'games/Casual/monopoly-city/index.html', preview: 'games/Casual/monopoly-city/preview.webp', icon: '🎮', desc: 'Roll dice against three CPU rivals on a miniature 3D city board, handle chance cards and property deals, and switch between board and street views.' },
        { name: 'MUST', lang: 'little', added: '2026-10-10', path: 'games/Casual/must-make-paperclips/index.html', preview: 'games/Casual/must-make-paperclips/preview.webp', icon: '🎮', desc: 'Place and upgrade turrets to guard a paperclip factory in the wasteland, mixing in first-person combat and permanent research across six missions.' },
        { name: 'Sundrift', lang: 'little', added: '2026-10-10', path: 'games/Casual/sundrift/index.html', preview: 'games/Casual/sundrift/preview.webp', icon: '🏎️', desc: 'Sail a small boat across sunset archipelago seas, using local charts to find coastlines in a relaxed no-time-limit sailing sandbox.' },
        { name: 'VeilFall', lang: 'text', added: '2026-10-10', path: 'games/Casual/veilfall-hollow-war/index.html', preview: 'games/Casual/veilfall-hollow-war/preview.webp', icon: '🎮', desc: 'Play Ilyra in a three-lane 5v5 CPU battle: cast light skills, buy relics, push towers and destroy the enemy core.' },
        { name: 'Minimum Rage', lang: 'little', added: '2026-10-10', path: 'games/Casual/minimum-rage/index.html', preview: 'games/Casual/minimum-rage/preview.webp', icon: '🎮', desc: 'Help Kevin keep his restaurant job: take orders, fetch food and serve eight customers before too many lose patience.' },
        { name: 'Cabsolutely', lang: 'little', added: '2026-10-10', path: 'games/Casual/cabsolutely/index.html', preview: 'games/Casual/cabsolutely/preview.webp', icon: '🎮', desc: 'Drive a taxi through San Francisco\'s financial district, ferry passengers to hit daily fare targets, and watch your vehicle\'s condition.' },
        { name: 'Mini Moto', lang: 'little', added: '2026-10-10', path: 'games/Casual/mini-moto/index.html', preview: 'games/Casual/mini-moto/preview.webp', icon: '🎮', desc: 'Manage a rider and shape a miniature off-road moto park, watching eight laps from panorama or helmet cams.' },
        { name: 'DASH', lang: 'little', added: '2026-10-10', path: 'games/Casual/dash-dinner/index.html', preview: 'games/Casual/dash-dinner/preview.webp', icon: '🎮', desc: 'Accept timed delivery orders, drive through the city in first person, manage courier stamina and upgrade vehicles.' },
        { name: 'Stillwater', lang: 'little', added: '2026-10-10', path: 'games/Casual/stillwater-aquarium/index.html', preview: 'games/Casual/stillwater-aquarium/preview.webp', icon: '🎮', desc: 'Care for a freshwater aquarium, feed small fish, and expand the tank with plants and larger habitats.' },
        { name: 'Saber', lang: 'little', added: '2026-10-10', path: 'games/Casual/saber-descent/index.html', preview: 'games/Casual/saber-descent/preview.webp', icon: '🎮', desc: 'Descend five dungeon floors with an energy blade, chaining slashes, blocks and dashes to defeat guards and find the next portal.' },
        { name: 'The Sunshard', lang: 'text', added: '2026-10-10', path: 'games/Casual/the-sunshard/index.html', preview: 'games/Casual/the-sunshard/preview.webp', icon: '🎮', desc: 'A voxel action RPG: fight Hollowborn with spark shots and sunlight bursts, blink past danger and awaken the sun gate.' },
        { name: 'Lumbridge', lang: 'text', added: '2026-10-10', path: 'games/Casual/lumbridge/index.html', preview: 'games/Casual/lumbridge/preview.webp', icon: '🎮', desc: 'A retro multiplayer adventure with a shared world, skills, gathering and combat; enter as a guest.' },
        { name: 'Mir 176', lang: 'text', added: '2026-10-10', path: 'games/Casual/mir176/index.html', preview: 'games/Casual/mir176/preview.webp', icon: '🎮', desc: 'A Legend-style action RPG with warrior, mage and taoist classes, gear, dungeon battles and auto-combat.' },
        { name: 'Zork', lang: 'text', added: '2026-10-10', path: 'games/Casual/zork/index.html', preview: 'games/Casual/zork/preview.webp', icon: '🎮', desc: 'An unofficial 3D adaptation of Zork: explore the underground in first person with puzzles, combat and an adventure log.' },
        { name: 'The Simpsons', lang: 'little', added: '2026-10-10', path: 'games/Casual/hit-and-run-web/index.html', preview: 'games/Casual/hit-and-run-web/preview.webp', icon: '🎮', desc: 'In an unofficial browser remake, walk or drive around Springfield, experiencing quests, street traffic and police chases.' },
        { name: 'Where the Wind Wanders', lang: 'little', added: '2026-10-10', path: 'games/Casual/crayon-adventure/index.html', preview: 'games/Casual/crayon-adventure/preview.webp', icon: '🎮', desc: 'Wander sunny 2.5D valley trails, find three letters of wind and enjoy a relaxed exploration adventure.' },
        { name: 'Skyward', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/skyward-gathering/index.html', preview: 'games/Casual/skyward-gathering/preview.webp', icon: '🎮', desc: 'Explore floating islands, jump and glide between communities, and complete delivery quests for residents.' },
        { name: 'Anna', lang: 'little', added: '2026-10-10', path: 'games/Casual/anna-leo-starstone/index.html', preview: 'games/Casual/anna-leo-starstone/preview.webp', icon: '🎮', desc: 'Switch between Anna\'s music magic and Leo\'s superpowers, awaken melody flowers and explore a wonder garden.' },
        { name: 'The Legend of Deller', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/the-legend-of-deller/index.html', preview: 'games/Casual/the-legend-of-deller/preview.webp', icon: '🎮', desc: 'Take shelter from rain and mist, then head into dungeons with sword combos, elemental skills and dodges.' },
        { name: 'Dungeon of Astra', lang: 'little', added: '2026-10-10', path: 'games/Casual/dungeon-of-astra/index.html', preview: 'games/Casual/dungeon-of-astra/preview.webp', icon: '🎮', desc: 'Recruit an adventuring party, descend a hundred-floor dungeon, and combine sword strikes, fireballs and class abilities with permadeath stakes.' },
        { name: 'Sunlandia', lang: 'little', added: '2026-10-10', path: 'games/Casual/sunlandia/index.html', preview: 'games/Casual/sunlandia/preview.webp', icon: '🎮', desc: 'Explore a shipwrecked island in first person, investigate clues, solve environmental puzzles and find the road to the lighthouse.' },
        { name: 'NÁCAR', lang: 'little', added: '2026-10-10', path: 'games/Casual/nacar/index.html', preview: 'games/Casual/nacar/preview.webp', icon: '🎮', desc: 'Play a microorganism inside a flooded snail shell: eat nutrients, explore microscopic waters and evolve new body parts.' },
        { name: 'BELOW', lang: 'little', added: '2026-10-10', path: 'games/Casual/below-the-hollow/index.html', preview: 'games/Casual/below-the-hollow/preview.webp', icon: '🎮', desc: 'Explore freshly regenerated underwater caves in first person, following the dive guide rope to find the way back to the surface.' },
        { name: 'The Road to Kufa', lang: 'little', added: '2026-10-10', path: 'games/Casual/road-to-kufa/index.html', preview: 'games/Casual/road-to-kufa/preview.webp', icon: '🎮', desc: 'Walk or ride across an Arabian desert world, visit oasis towns and discover landmarks; an in-development adventure prototype.' },
        { name: 'Grand Theft Auto VI', lang: 'little', added: '2026-10-10', path: 'games/Casual/gta-vi-ps1-demake/index.html', preview: 'games/Casual/gta-vi-ps1-demake/preview.webp', icon: '🎮', desc: 'Explore a small Vice City in PlayStation-era graphics with driving, dual protagonists, missions and police chases; an unofficial fan adaptation.' },
        { name: 'Don’t Look Away', lang: 'little', added: '2026-10-10', path: 'games/Casual/dont-look-away/index.html', preview: 'games/Casual/dont-look-away/preview.webp', icon: '🎮', desc: 'Restore power and find an escape key in a dark church; stone angels advance when unseen, and every blink carries risk.' },
        { name: 'Europe', lang: 'little', added: '2026-10-10', path: 'games/Casual/europe-the-game/index.html', preview: 'games/Casual/europe-the-game/preview.webp', icon: '🎮', desc: 'Explore European city blocks, balancing work, stamina, social life and virtual daily budgets.' },
        { name: 'ASTRA Arcade', lang: 'little', added: '2026-10-10', path: 'games/Casual/astra-arcade/index.html', preview: 'games/Casual/astra-arcade/preview.webp', icon: '🎮', desc: 'An arcade hall of six browser games including mountain rally, skiing and anti-gravity racing; collected as one bundle.' },
        { name: 'Chao Party', lang: 'little', added: '2026-10-10', path: 'games/Casual/chao-party/index.html', preview: 'games/Casual/chao-party/preview.webp', icon: '🎮', desc: 'An unofficial Chao Garden multiplayer fan game: pick a Sonic character, explore the garden and interact with Chao.' },
        { name: 'Toon Tank Arena', lang: 'little', added: '2026-10-10', path: 'games/Casual/-toon-tank-arena/index.html', preview: 'games/Casual/-toon-tank-arena/preview.webp', icon: '🛡️', desc: 'A cartoon tank arena: defend the rainbow core with bouncing shells and power-ups across solo, two-player co-op and online modes.' },
        { name: 'Above the Rooftops', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/above-the-rooftops/index.html', preview: 'games/Casual/above-the-rooftops/preview.webp', icon: '🎮', desc: 'Paint kites and fly them over city rooftops, controlling line tension for free flight or timed collection of sky lights.' },
        { name: 'Starship Foundry', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/starship-foundry/index.html', preview: 'games/Casual/starship-foundry/preview.webp', icon: '✈️', desc: 'Assemble a ship from modules, check connections, power and thrust, then take it into ring-threading, jumping or isometric shooting modes.' },
        { name: 'POCKET_01', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/pocket-01/index.html', preview: 'games/Casual/pocket-01/preview.webp', icon: '🎮', desc: 'Open a virtual monochrome handheld and pick from 12 mini-games: snake, blocks, breakout, minesweeper or eight-level sokoban.' },
        { name: 'Bubble Wrap Simulator', lang: 'no_need', added: '2026-10-10', path: 'games/Casual/bubble-wrap-simulator/index.html', preview: 'games/Casual/bubble-wrap-simulator/preview.webp', icon: '🎮', desc: 'Explore a room made of bubble wrap and pop any surface you like in this stress-free no-objective game.' },
        { name: 'Loulou', lang: 'little', added: '2026-10-10', path: 'games/Casual/loulous-apartment/index.html', preview: 'games/Casual/loulous-apartment/preview.webp', icon: '🎮', desc: 'Explore a cozy apartment game, interact with everyday objects and pet the dog Maggie.' },
        { name: 'Death by AI', lang: 'little', path: 'games/Casual/Death-by-AI/index.html', preview: 'games/Casual/Death-by-AI/preview.webp', icon: 'fas fa-robot', desc: 'AI-generated AI-judgment interactive.' },
        { name: 'Everywhere', lang: 'little', path: 'games/Casual/Everywhere/index.html', preview: 'games/Casual/Everywhere/preview.webp', icon: 'fas fa-globe-americas', desc: 'AI-generated interactive experience.' },
        { name: 'Family Feud', lang: 'text', path: 'games/Casual/Family-Feud/index.html', preview: 'games/Casual/Family-Feud/preview.webp', icon: 'fas fa-users', desc: 'AI-generated family quiz game.' },
        { name: 'Interactive Buddy', lang: 'little', path: 'games/Casual/Interactive-Buddy/index.html', preview: 'games/Casual/Interactive-Buddy/preview.webp', icon: 'fas fa-hand-sparkles', desc: 'AI-generated virtual pet.' },
        { name: 'Living RPS', lang: 'little', path: 'games/Casual/Living-RPS/index.html', preview: 'games/Casual/Living-RPS/preview.webp', icon: 'fas fa-hand-scissors', desc: 'AI-generated dynamic rock-paper-scissors.' },
        { name: 'Menagerie', lang: 'little', path: 'games/Casual/Menagerie/index.html', preview: 'games/Casual/Menagerie/preview.webp', icon: 'fas fa-horse', desc: 'AI-generated animal viewing.' },
        { name: 'Under the Lamp', lang: 'little', path: 'games/Casual/Mystery-AI/index.html', preview: 'games/Casual/Mystery-AI/preview.webp', icon: 'fas fa-question', desc: 'AI-generated AI deduction interactive.' },
        { name: 'Procession', lang: 'little', path: 'games/Casual/Procession/index.html', preview: 'games/Casual/Procession/preview.webp', icon: 'fas fa-music', desc: 'AI-generated parade experience.' },
        { name: 'Rack', lang: 'no_need', path: 'games/Casual/Rack/index.html', preview: 'games/Casual/Rack/preview.webp', icon: 'fas fa-circle', desc: 'AI-generated casual pool.' },
        { name: 'Shopfloor', lang: 'little', path: 'games/Casual/Shopfloor/index.html', preview: 'games/Casual/Shopfloor/preview.webp', icon: 'fas fa-industry', desc: 'AI-generated workshop simulation.' },
        { name: 'Departures', lang: 'text', path: 'games/Casual/Time-Travel-Agency/index.html', preview: 'games/Casual/Time-Travel-Agency/preview.webp', icon: 'fas fa-clock', desc: 'AI-generated text adventure.' },
        { name: 'Two Truths & a Lie', lang: 'little', path: 'games/Casual/Two-Truths-One-Lie/index.html', preview: 'games/Casual/Two-Truths-One-Lie/preview.webp', icon: 'fas fa-theater-masks', desc: 'AI-generated two-truths-one-lie game.' },
        { name: 'Emoji Horde', lang: 'no_need', path: 'games/Casual/Emoji-Horde/index.html', preview: 'games/Casual/Emoji-Horde/preview.webp', icon: 'fas fa-laugh', desc: 'AI-generated emoji tower-defense survival.' },
        { name: 'Moodswing', lang: 'no_need', path: 'games/Casual/Emoji-Match-Three/index.html', preview: 'games/Casual/Emoji-Match-Three/preview.webp', icon: 'fas fa-gem', desc: 'AI-generated emoji match-3 game.' },
        { name: 'PLUMB', lang: 'little', path: 'games/Casual/Fishing/index.html', preview: 'games/Casual/Fishing/preview.webp', icon: 'fas fa-fish', desc: 'AI-generated casual fishing game.' },
        { name: 'Idle Factory Tycoon', lang: 'little', path: 'games/Casual/Idle-Factory/index.html', preview: 'games/Casual/Idle-Factory/preview.webp', icon: 'fas fa-industry', desc: 'AI-generated idle factory tycoon.' },
        { name: 'Dice Roll Simulator', lang: 'no_need', path: 'games/Casual/Dice-Roll-Simulator/index.html', preview: 'games/Casual/Dice-Roll-Simulator/preview.webp', icon: 'fas fa-dice', desc: 'Dice roll simulator.' },
        { name: 'Quiz', lang: 'text', path: 'games/Casual/Quiz/index.html', preview: 'games/Casual/Quiz/preview.webp', icon: 'fas fa-question-circle', desc: 'Knowledge quiz.' },
        { name: 'Speak Number Guessing', lang: 'no_need', path: 'games/Casual/Speak-Number-Guessing/index.html', preview: 'games/Casual/Speak-Number-Guessing/preview.webp', icon: 'fas fa-microphone', desc: 'Voice number guessing game.' },
        { name: 'Type Number Guessing', lang: 'no_need', path: 'games/Casual/Type-Number-Guessing/index.html', preview: 'games/Casual/Type-Number-Guessing/preview.webp', icon: 'fas fa-calculator', desc: 'Typing number guessing game.' },
        { name: 'Rhythm Game', lang: 'little', path: 'games/Casual/Rhythm-Game/index.html', preview: 'games/Casual/Rhythm-Game/preview.webp', icon: 'fas fa-music', desc: 'Music rhythm game.' },
        { name: 'Coloring Book', lang: 'little', path: 'games/Casual/Coloring-Book/index.html', preview: 'games/Casual/Coloring-Book/preview.webp', icon: 'fas fa-paint-brush', desc: 'Coloring book.' },
        { name: 'Catch Circle', lang: 'little', path: 'games/Casual/Catch-Circle/index.html', preview: 'games/Casual/Catch-Circle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated casual reaction game.', isNew: true },
        { name: 'Number Guess', lang: 'no_need', path: 'games/Casual/Number-Guess/index.html', preview: 'games/Casual/Number-Guess/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated number guessing game.', isNew: true },
        { name: 'Whac A Mole HTML', lang: 'little', path: 'games/Casual/Whac-A-Mole-HTML/index.html', preview: 'games/Casual/Whac-A-Mole-HTML/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated whack-a-mole game.', isNew: true },
        { name: 'Click Sprint', lang: 'little', path: 'games/Casual/click-sprint/index.html', preview: 'games/Casual/click-sprint/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated fast-click reaction game.', isNew: true },
        { name: 'Guess Number', lang: 'no_need', path: 'games/Casual/guess-number/index.html', preview: 'games/Casual/guess-number/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated number guessing mini game.', isNew: true },
        { name: 'Coin Streak', lang: 'no_need', path: 'games/Casual/coin-streak/index.html', preview: 'games/Casual/coin-streak/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated coin-flip streak game.', isNew: true },
        { name: 'Reaction Time', lang: 'little', path: 'games/Casual/reaction-time/index.html', preview: 'games/Casual/reaction-time/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated reaction speed test.', isNew: true },
        { name: 'Dice Battle', lang: 'no_need', path: 'games/Casual/dice-battle/index.html', preview: 'games/Casual/dice-battle/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated dice battle game.', isNew: true },
        { name: 'Falling Catcher', lang: 'little', path: 'games/Casual/falling-catcher/index.html', preview: 'games/Casual/falling-catcher/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated falling-catcher game.', isNew: true },
        { name: 'Apoapsis', lang: 'little', path: 'games/Casual/apoapsis/index.html', preview: 'games/Casual/apoapsis/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated physics simulation game.', isNew: true },
        { name: 'Biosphere Blue', lang: 'little', path: 'games/Casual/biosphereblue/index.html', preview: 'games/Casual/biosphereblue/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated ecology simulation game.', isNew: true },
        { name: 'Bonneville Spillway Operator', lang: 'little', path: 'games/Casual/bonnevillespillwayoperator/index.html', preview: 'games/Casual/bonnevillespillwayoperator/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated dam management simulation game.', isNew: true },
        { name: 'Drift', lang: 'little', path: 'games/Casual/drift/index.html', preview: 'games/Casual/drift/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated drift physics game.', isNew: true },
        { name: 'Eclipsepredictor', lang: 'little', path: 'games/Casual/eclipsepredictor/index.html', preview: 'games/Casual/eclipsepredictor/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated astronomy prediction game.', isNew: true },
        { name: 'Metropolis 2K', lang: 'little', path: 'games/Casual/metropolis2k/index.html', preview: 'games/Casual/metropolis2k/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated city-building simulation game.', isNew: true },
        { name: 'Odyssey', lang: 'little', path: 'games/Adventure/odyssey/index.html', preview: 'games/Adventure/odyssey/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated adventure exploration game.', isNew: true },
        { name: 'Messenger: Outbreak Night', lang: 'no_need', path: 'games/Adventure/messenger/index.html', preview: 'games/Adventure/messenger/preview.webp', icon: 'fas fa-envelope-open-text', desc: 'A medical courier races through fallen Raccoon City on a blizzard night, delivering the packages that keep survivors alive.', isNew: true },
        { name: 'Tidelands', lang: 'little', path: 'games/Casual/tidelands/index.html', preview: 'games/Casual/tidelands/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated tide simulation game.', isNew: true },
        { name: 'Tower', lang: 'little', path: 'games/Casual/tower/index.html', preview: 'games/Casual/tower/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated tower physics game.', isNew: true },
        { name: 'Ultimate Tic-Tac-Toe — Free Online vs AI', lang: 'no_need', path: 'games/Casual/ultimatetictactoe/index.html', preview: 'games/Casual/ultimatetictactoe/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated ultimate tic-tac-toe game.', isNew: true },
        { name: 'Bubble Pop', lang: 'no_need', path: 'games/Casual/bubble-pop/index.html', preview: 'games/Casual/bubble-pop/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Bubble Pop game.', isNew: true },
        { name: 'Buttermilk', lang: 'little', path: 'games/Casual/buttermilk/index.html', preview: 'games/Casual/buttermilk/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Buttermilk game.', isNew: true },
        { name: 'Candy Crusher', lang: 'little', path: 'games/Casual/candy-crusher/index.html', preview: 'games/Casual/candy-crusher/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Candy Crusher game.', isNew: true },
        { name: 'Cooking', lang: 'little', path: 'games/Casual/cooking/index.html', preview: 'games/Casual/cooking/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Cooking game.', isNew: true },
        { name: 'Fruit Basket', lang: 'little', path: 'games/Casual/fruit-basket/index.html', preview: 'games/Casual/fruit-basket/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Fruit Basket game.', isNew: true },
        { name: 'Fruit Cosmics', lang: 'little', path: 'games/Casual/fruit-cosmics/index.html', preview: 'games/Casual/fruit-cosmics/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Fruit Cosmics game.', isNew: true },
        { name: 'Archer', lang: 'little', path: 'games/Casual/archer/index.html', preview: 'games/Casual/archer/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Archer game.', isNew: true },
        { name: 'Basketball', lang: 'little', path: 'games/Casual/basketball/index.html', preview: 'games/Casual/basketball/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Basketball game.', isNew: true },
        { name: 'Bowling', lang: 'little', path: 'games/Casual/bowling/index.html', preview: 'games/Casual/bowling/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Bowling game.', isNew: true },
        { name: 'Cricket 123', lang: 'little', path: 'games/Casual/cricket-123/index.html', preview: 'games/Casual/cricket-123/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Cricket 123 game.', isNew: true },
        { name: 'Football', lang: 'little', path: 'games/Casual/football/index.html', preview: 'games/Casual/football/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Football game.', isNew: true },
        { name: 'Penalty', lang: 'little', path: 'games/Casual/penalty/index.html', preview: 'games/Casual/penalty/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Penalty game.', isNew: true },
        { name: 'Table Tennis', lang: 'little', path: 'games/Casual/table-tennis/index.html', preview: 'games/Casual/table-tennis/preview.webp', icon: 'fas fa-gamepad', desc: 'AI-generated Table Tennis game.', isNew: true },
        { name: 'Mosswing', lang: 'little', path: 'games/Astra/Mosswing/index.html', preview: 'games/Astra/Mosswing/preview.webp', icon: 'fas fa-leaf', desc: 'Physics sandbox: momentum, gravity and soft bodies.' },
        { name: 'Melon Lab', lang: 'little', path: 'games/Astra/Melon-Lab/index.html', preview: 'games/Astra/Melon-Lab/preview.webp', icon: 'fas fa-apple-whole', desc: 'Melon lab: a melon physics sandbox.' },
        { name: 'Dwellcraft', lang: 'little', path: 'games/Casual/Dwellcraft/index.html', preview: 'games/Casual/Dwellcraft/preview.webp', icon: 'fas fa-gamepad', desc: 'Drag items from a furniture library, freely decorate three homes, adjust materials and lighting, then walk through your design in first person.\', author: \'Ryan-fm\', source: \'astragames 收录（开源）\', github: \'https://github.com/Ryan-fm/Dwellcraft' },
        { name: 'Toy2Game', lang: 'little', path: 'games/Casual/Toy2Game/index.html', preview: 'games/Casual/Toy2Game/preview.webp', icon: 'fas fa-gamepad', desc: 'Four 3D web games adapted from tabletop toys: take turns hammering ice, guide a bunny through traps, balance an astronaut, and solve parking puzzles. Free for non-commercial use.\', author: \'asmoyou\', source: \'astragames 收录（开源）\', github: \'https://github.com/asmoyou/toy2game' },
        { name: 'Jelly Baby', lang: 'no_need', path: 'games/Casual/Jelly-Baby/index.html', preview: 'games/Casual/Jelly-Baby/preview.webp', icon: 'fas fa-gamepad', desc: 'A soft-body jelly playground on a sunny wooden table: jump, stretch, and enjoy swings and trampolines.\', author: \'Scott\', source: \'GitHub 开源仓库\', github: \'https://github.com/scottstts/Jelly-Baby' },
        { name: 'Aegis Flora', lang: 'no_need', path: 'games/Casual/Aegis-Flora/index.html', preview: 'games/Casual/Aegis-Flora/preview.webp', icon: 'fas fa-gamepad', desc: 'Place solarpunk defense towers to redirect enemy paths and protect the core through continuous assaults.', author: 'Joshua Ray', source: 'astragames 收录（开源）', github: 'https://github.com/murderszn/aegis-flora' },
        { name: 'Feed the Backrooms', lang: 'no_need', added: '2026-11-13', path: 'https://feed-backrooms.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: 'The Backrooms, reversed: you are the monster and your job is to catch people.', nameZh: 'Feed the Backrooms：你当怪物', descZh: '后室反转玩法，你负责抓人', author: 'LexnLin', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 94, post: 'https://x.com/LexnLin/status/2119966127149429093', external: true, isNew: true },
        { name: 'Stray Cat', lang: 'no_need', added: '2026-11-13', path: 'https://claude.ai/artifact/4nPXUKJjQWNsZEHVNmXXCt', preview: '', icon: 'fas fa-gamepad', desc: 'Rescue kittens, hiss at dogs, yowl at an old tomcat. Every sound is synthesized.', nameZh: '流浪猫游戏', descZh: '救小猫、冲狗哈气、和老公猫对嚎，声音全部合成', author: 'aimikoda', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 43, post: 'https://x.com/aimikoda/status/2120120133712593118', external: true, isNew: true },
        { name: 'Cozy Lisbon', lang: 'no_need', added: '2026-11-13', path: 'https://cozylisbon.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: 'A one-prompt cozy game about a little plane flying over Lisbon.', nameZh: 'Cozy Lisbon 飞越里斯本', descZh: '一条提示词做的小飞机游戏，在里斯本上空慢慢飞', author: 'goncalo_canhoto', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 166, post: 'https://x.com/goncalo_canhoto/status/2119932946346094690', external: true, isNew: true },
        { name: 'Cozy Bakery', lang: 'no_need', added: '2026-11-13', path: 'https://cozybakery.vercel.app', preview: '', icon: 'fas fa-gamepad', desc: 'An Overcooked-style co-op cooking game around Portugal, 1 to 4 players, works on mobile.', nameZh: 'Cozy Bakery 葡萄牙合作厨房', descZh: '类似 Overcooked 的多人做饭游戏，做蛋挞和 francesinha，1–4 人，手机也能玩', author: 'goncalo_canhoto', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 18, post: 'https://x.com/goncalo_canhoto/status/2120530199649432063', external: true, isNew: true },
        { name: 'Knock It Off', lang: 'no_need', added: '2026-11-14', path: 'https://fowllabs.com/fable-5-2/knock-it-off/', preview: '', icon: 'fas fa-gamepad', desc: 'You\'re a cat at 3am, swatting everything off the desk without waking the human. A single HTML file with no 3D models.', nameZh: 'Knock It Off 猫咪推东西', descZh: '凌晨三点当一只猫，一爪一爪把桌上东西推下去还不能吵醒主人；单个 HTML，没用 3D 模型', author: 'argofowl', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 43, post: 'https://x.com/argofowl/status/2121276206683410839', external: true, isNew: true },
        { name: 'Hello Jello — draggable jelly physics', lang: 'no_need', added: '2026-11-18', path: 'https://jello.sixfingerpunch.com/', preview: '', icon: 'fas fa-gamepad', desc: 'A cute jelly physics toy: click and drag to stretch and fling a bunch of wobbly jellies.', nameZh: 'Hello Jello 可以拖着玩的果冻', descZh: '超可爱的果冻物理玩具：点住拖动就能拉扯、甩动一群软乎乎的果冻', author: 'photonstorm', source: 'Claude Fable 5.2 · awesome-fable-5.2', model: 'Claude Fable 5.2', likes: 6, post: 'https://x.com/photonstorm/status/2122879821986627587', external: true, isNew: true }
    ]
};
// 生成艺术体验（AI 生成交互体验合集）：独立于玩法分类展示，不参与筛选与计数
const genArtExperiences = [
    { name: 'Orbital Garden', path: 'games/Astra/Orbital-Garden/index.html', preview: 'games/Astra/Orbital-Garden/preview.webp', icon: 'fas fa-atom', desc: 'Orbit garden: touchable generative art.' },
    { name: 'Vesper — Aurora Observatory', path: 'games/Astra/MiaAI-Experiences/001-aurora-observatory/index.html', preview: 'games/Astra/MiaAI-Experiences/001-aurora-observatory/preview.jpg', icon: 'fas fa-palette', desc: 'Vesper — Aurora Observatory — an AI-generated interactive experience.' },
    { name: 'FORM / Independent Design Review', path: 'games/Astra/MiaAI-Experiences/002-form-editorial/index.html', preview: 'games/Astra/MiaAI-Experiences/002-form-editorial/preview.jpg', icon: 'fas fa-palette', desc: 'FORM / Independent Design Review — an AI-generated interactive experience.' },
    { name: 'Tempo — Time in Motion', path: 'games/Astra/MiaAI-Experiences/003-kinetic-time/index.html', preview: 'games/Astra/MiaAI-Experiences/003-kinetic-time/preview.jpg', icon: 'fas fa-palette', desc: 'Tempo — Time in Motion — an AI-generated interactive experience.' },
    { name: 'Dune — Architecture of Stillness', path: 'games/Astra/MiaAI-Experiences/004-dune-residence/index.html', preview: 'games/Astra/MiaAI-Experiences/004-dune-residence/preview.jpg', icon: 'fas fa-palette', desc: 'Dune — Architecture of Stillness — an AI-generated interactive experience.' },
    { name: 'Abyss / Deep Ocean Survey', path: 'games/Astra/MiaAI-Experiences/005-abyss-sonar/index.html', preview: 'games/Astra/MiaAI-Experiences/005-abyss-sonar/preview.jpg', icon: 'fas fa-palette', desc: 'Abyss / Deep Ocean Survey — an AI-generated interactive experience.' },
    { name: 'Side A — A Listening Room', path: 'games/Astra/MiaAI-Experiences/006-side-a-records/index.html', preview: 'games/Astra/MiaAI-Experiences/006-side-a-records/preview.jpg', icon: 'fas fa-palette', desc: 'Side A — A Listening Room — an AI-generated interactive experience.' },
    { name: 'Herbarium / Collected in Quiet', path: 'games/Astra/MiaAI-Experiences/007-herbarium/index.html', preview: 'games/Astra/MiaAI-Experiences/007-herbarium/preview.jpg', icon: 'fas fa-palette', desc: 'Herbarium / Collected in Quiet — an AI-generated interactive experience.' },
    { name: 'Nacre / The Shape of a Memory', path: 'games/Astra/MiaAI-Experiences/008-nacre-parfum/index.html', preview: 'games/Astra/MiaAI-Experiences/008-nacre-parfum/preview.jpg', icon: 'fas fa-palette', desc: 'Nacre / The Shape of a Memory — an AI-generated interactive experience.' },
    { name: 'Unusual Practice / Independent Designer', path: 'games/Astra/MiaAI-Experiences/009-unusual-practice/index.html', preview: 'games/Astra/MiaAI-Experiences/009-unusual-practice/preview.jpg', icon: 'fas fa-palette', desc: 'Unusual Practice / Independent Designer — an AI-generated interactive experience.' },
    { name: 'Melt / Take Your Time', path: 'games/Astra/MiaAI-Experiences/010-lava-lounge/index.html', preview: 'games/Astra/MiaAI-Experiences/010-lava-lounge/preview.jpg', icon: 'fas fa-palette', desc: 'Melt / Take Your Time — an AI-generated interactive experience.' },
    { name: 'Elsewhere / A Postcard Collection', path: 'games/Astra/MiaAI-Experiences/011-postcards-from-elsewhere/index.html', preview: 'games/Astra/MiaAI-Experiences/011-postcards-from-elsewhere/preview.jpg', icon: 'fas fa-palette', desc: 'Elsewhere / A Postcard Collection — an AI-generated interactive experience.' },
    { name: 'Word Garden / Small Poems', path: 'games/Astra/MiaAI-Experiences/012-word-garden/index.html', preview: 'games/Astra/MiaAI-Experiences/012-word-garden/preview.jpg', icon: 'fas fa-palette', desc: 'Word Garden / Small Poems — an AI-generated interactive experience.' },
    { name: 'Pixel Orchard / Memory Harvest', path: 'games/Astra/MiaAI-Experiences/013-pixel-orchard/index.html', preview: 'games/Astra/MiaAI-Experiences/013-pixel-orchard/preview.jpg', icon: 'fas fa-palette', desc: 'Pixel Orchard / Memory Harvest — an AI-generated interactive experience.' },
    { name: 'Window Seat / An Afternoon Indoors', path: 'games/Astra/MiaAI-Experiences/014-storm-window/index.html', preview: 'games/Astra/MiaAI-Experiences/014-storm-window/preview.jpg', icon: 'fas fa-palette', desc: 'Window Seat / An Afternoon Indoors — an AI-generated interactive experience.' },
    { name: 'Fold / One Sheet, Infinite Possibility', path: 'games/Astra/MiaAI-Experiences/015-fold-studio/index.html', preview: 'games/Astra/MiaAI-Experiences/015-fold-studio/preview.jpg', icon: 'fas fa-palette', desc: 'Fold / One Sheet, Infinite Possibility — an AI-generated interactive experience.' },
    { name: 'Sunprint / A Blueprint of Light', path: 'games/Astra/MiaAI-Experiences/016-blueprint-of-light/index.html', preview: 'games/Astra/MiaAI-Experiences/016-blueprint-of-light/preview.jpg', icon: 'fas fa-palette', desc: 'Sunprint / A Blueprint of Light — an AI-generated interactive experience.' },
    { name: 'Pelagia / A Ballet Without Gravity', path: 'games/Astra/MiaAI-Experiences/017-jellyfish-ballet/index.html', preview: 'games/Astra/MiaAI-Experiences/017-jellyfish-ballet/preview.jpg', icon: 'fas fa-palette', desc: 'Pelagia / A Ballet Without Gravity — an AI-generated interactive experience.' },
    { name: 'Labyrinth Club / Find Your Way', path: 'games/Astra/MiaAI-Experiences/018-labyrinth-club/index.html', preview: 'games/Astra/MiaAI-Experiences/018-labyrinth-club/preview.jpg', icon: 'fas fa-palette', desc: 'Labyrinth Club / Find Your Way — an AI-generated interactive experience.' },
    { name: 'Komorebi / The Lunch Ritual', path: 'games/Astra/MiaAI-Experiences/019-komorebi-kitchen/index.html', preview: 'games/Astra/MiaAI-Experiences/019-komorebi-kitchen/preview.jpg', icon: 'fas fa-palette', desc: 'Komorebi / The Lunch Ritual — an AI-generated interactive experience.' },
    { name: 'Chroma Field / A Living Color Study', path: 'games/Astra/MiaAI-Experiences/020-chroma-field/index.html', preview: 'games/Astra/MiaAI-Experiences/020-chroma-field/preview.jpg', icon: 'fas fa-palette', desc: 'Chroma Field / A Living Color Study — an AI-generated interactive experience.' },
    { name: 'Somewhere / Departures for the Imagination', path: 'games/Astra/MiaAI-Experiences/021-departure-board/index.html', preview: 'games/Astra/MiaAI-Experiences/021-departure-board/preview.jpg', icon: 'fas fa-palette', desc: 'Somewhere / Departures for the Imagination — an AI-generated interactive experience.' },
    { name: 'Thread &amp; Form / Digital Loom', path: 'games/Astra/MiaAI-Experiences/022-thread-and-form/index.html', preview: 'games/Astra/MiaAI-Experiences/022-thread-and-form/preview.jpg', icon: 'fas fa-palette', desc: 'Thread &amp; Form / Digital Loom — an AI-generated interactive experience.' },
    { name: 'Ridgeline / The Long Way Up', path: 'games/Astra/MiaAI-Experiences/023-ridgeline/index.html', preview: 'games/Astra/MiaAI-Experiences/023-ridgeline/preview.jpg', icon: 'fas fa-palette', desc: 'Ridgeline / The Long Way Up — an AI-generated interactive experience.' },
    { name: 'Small Victories / The Everyday Comic', path: 'games/Astra/MiaAI-Experiences/024-small-victories/index.html', preview: 'games/Astra/MiaAI-Experiences/024-small-victories/preview.jpg', icon: 'fas fa-palette', desc: 'Small Victories / The Everyday Comic — an AI-generated interactive experience.' },
    { name: 'Aeroform / Objects of Forward Motion', path: 'games/Astra/MiaAI-Experiences/025-aero-form/index.html', preview: 'games/Astra/MiaAI-Experiences/025-aero-form/preview.jpg', icon: 'fas fa-palette', desc: 'Aeroform / Objects of Forward Motion — an AI-generated interactive experience.' },
    { name: 'Tidal Hours', path: 'games/Astra/MiaAI-Experiences/026-tidal-hours/index.html', preview: 'games/Astra/MiaAI-Experiences/026-tidal-hours/preview.jpg', icon: 'fas fa-palette', desc: 'Tidal Hours — an AI-generated interactive experience.' },
    { name: 'Cabinet of Minerals', path: 'games/Astra/MiaAI-Experiences/027-mineral-cabinet/index.html', preview: 'games/Astra/MiaAI-Experiences/027-mineral-cabinet/preview.jpg', icon: 'fas fa-palette', desc: 'Cabinet of Minerals — an AI-generated interactive experience.' },
    { name: 'Night Almanac', path: 'games/Astra/MiaAI-Experiences/028-lunar-calendar/index.html', preview: 'games/Astra/MiaAI-Experiences/028-lunar-calendar/preview.jpg', icon: 'fas fa-palette', desc: 'Night Almanac — an AI-generated interactive experience.' },
    { name: 'Pollen Atlas', path: 'games/Astra/MiaAI-Experiences/029-pollen-atlas/index.html', preview: 'games/Astra/MiaAI-Experiences/029-pollen-atlas/preview.jpg', icon: 'fas fa-palette', desc: 'Pollen Atlas — an AI-generated interactive experience.' },
    { name: 'Contour Office', path: 'games/Astra/MiaAI-Experiences/030-contour-office/index.html', preview: 'games/Astra/MiaAI-Experiences/030-contour-office/preview.jpg', icon: 'fas fa-palette', desc: 'Contour Office — an AI-generated interactive experience.' },
    { name: 'Deep Listening', path: 'games/Astra/MiaAI-Experiences/031-whale-frequency/index.html', preview: 'games/Astra/MiaAI-Experiences/031-whale-frequency/preview.jpg', icon: 'fas fa-palette', desc: 'Deep Listening — an AI-generated interactive experience.' },
    { name: 'The Fern House', path: 'games/Astra/MiaAI-Experiences/032-fern-house/index.html', preview: 'games/Astra/MiaAI-Experiences/032-fern-house/preview.jpg', icon: 'fas fa-palette', desc: 'The Fern House — an AI-generated interactive experience.' },
    { name: 'The Barometer Room', path: 'games/Astra/MiaAI-Experiences/033-barometer-room/index.html', preview: 'games/Astra/MiaAI-Experiences/033-barometer-room/preview.jpg', icon: 'fas fa-palette', desc: 'The Barometer Room — an AI-generated interactive experience.' },
    { name: 'Totality', path: 'games/Astra/MiaAI-Experiences/034-eclipse-chamber/index.html', preview: 'games/Astra/MiaAI-Experiences/034-eclipse-chamber/preview.jpg', icon: 'fas fa-palette', desc: 'Totality — an AI-generated interactive experience.' },
    { name: 'Reef Reserve', path: 'games/Astra/MiaAI-Experiences/035-reef-reserve/index.html', preview: 'games/Astra/MiaAI-Experiences/035-reef-reserve/preview.jpg', icon: 'fas fa-palette', desc: 'Reef Reserve — an AI-generated interactive experience.' },
    { name: 'White Silence', path: 'games/Astra/MiaAI-Experiences/036-arctic-journal/index.html', preview: 'games/Astra/MiaAI-Experiences/036-arctic-journal/preview.jpg', icon: 'fas fa-palette', desc: 'White Silence — an AI-generated interactive experience.' },
    { name: 'Borrowed Skies', path: 'games/Astra/MiaAI-Experiences/037-migration-map/index.html', preview: 'games/Astra/MiaAI-Experiences/037-migration-map/preview.jpg', icon: 'fas fa-palette', desc: 'Borrowed Skies — an AI-generated interactive experience.' },
    { name: 'Chromatic Passage', path: 'games/Astra/MiaAI-Experiences/038-prism-studio/index.html', preview: 'games/Astra/MiaAI-Experiences/038-prism-studio/preview.jpg', icon: 'fas fa-palette', desc: 'Chromatic Passage — an AI-generated interactive experience.' },
    { name: 'Sand Has Memory', path: 'games/Astra/MiaAI-Experiences/039-sand-memory/index.html', preview: 'games/Astra/MiaAI-Experiences/039-sand-memory/preview.jpg', icon: 'fas fa-palette', desc: 'Sand Has Memory — an AI-generated interactive experience.' },
    { name: 'Solar Garden', path: 'games/Astra/MiaAI-Experiences/040-solar-garden/index.html', preview: 'games/Astra/MiaAI-Experiences/040-solar-garden/preview.jpg', icon: 'fas fa-palette', desc: 'Solar Garden — an AI-generated interactive experience.' },
    { name: 'One Thousand Wishes / Lantern Night', path: 'games/Astra/MiaAI-Experiences/041-lantern-festival/index.html', preview: 'games/Astra/MiaAI-Experiences/041-lantern-festival/preview.jpg', icon: 'fas fa-palette', desc: 'One Thousand Wishes / Lantern Night — an AI-generated interactive experience.' },
    { name: 'A Museum of Folds', path: 'games/Astra/MiaAI-Experiences/042-paper-museum/index.html', preview: 'games/Astra/MiaAI-Experiences/042-paper-museum/preview.jpg', icon: 'fas fa-palette', desc: 'A Museum of Folds — an AI-generated interactive experience.' },
    { name: 'The Sun Keeps Time', path: 'games/Astra/MiaAI-Experiences/043-sundial-courtyard/index.html', preview: 'games/Astra/MiaAI-Experiences/043-sundial-courtyard/preview.jpg', icon: 'fas fa-palette', desc: 'The Sun Keeps Time — an AI-generated interactive experience.' },
    { name: 'A Thought Takes Shape', path: 'games/Astra/MiaAI-Experiences/044-thought-network/index.html', preview: 'games/Astra/MiaAI-Experiences/044-thought-network/preview.jpg', icon: 'fas fa-palette', desc: 'A Thought Takes Shape — an AI-generated interactive experience.' },
    { name: 'The Seed Library', path: 'games/Astra/MiaAI-Experiences/045-seed-library/index.html', preview: 'games/Astra/MiaAI-Experiences/045-seed-library/preview.jpg', icon: 'fas fa-palette', desc: 'The Seed Library — an AI-generated interactive experience.' },
    { name: 'Wind Chapel', path: 'games/Astra/MiaAI-Experiences/046-wind-chapel/index.html', preview: 'games/Astra/MiaAI-Experiences/046-wind-chapel/preview.jpg', icon: 'fas fa-palette', desc: 'Wind Chapel — an AI-generated interactive experience.' },
    { name: 'Time, Compressed', path: 'games/Astra/MiaAI-Experiences/047-ice-core-archive/index.html', preview: 'games/Astra/MiaAI-Experiences/047-ice-core-archive/preview.jpg', icon: 'fas fa-palette', desc: 'Time, Compressed — an AI-generated interactive experience.' },
    { name: 'The Dream Index', path: 'games/Astra/MiaAI-Experiences/048-dream-index/index.html', preview: 'games/Astra/MiaAI-Experiences/048-dream-index/preview.jpg', icon: 'fas fa-palette', desc: 'The Dream Index — an AI-generated interactive experience.' },
    { name: 'Where Ink Goes', path: 'games/Astra/MiaAI-Experiences/049-ink-diffusion/index.html', preview: 'games/Astra/MiaAI-Experiences/049-ink-diffusion/preview.jpg', icon: 'fas fa-palette', desc: 'Where Ink Goes — an AI-generated interactive experience.' },
    { name: 'Letters in the Dark', path: 'games/Astra/MiaAI-Experiences/050-star-navigation/index.html', preview: 'games/Astra/MiaAI-Experiences/050-star-navigation/preview.jpg', icon: 'fas fa-palette', desc: 'Letters in the Dark — an AI-generated interactive experience.' },
    { name: 'Komorebi — Tea Ritual', path: 'games/Astra/MiaAI-Experiences/051-tea-ceremony/index.html', preview: 'games/Astra/MiaAI-Experiences/051-tea-ceremony/preview.jpg', icon: 'fas fa-palette', desc: 'Komorebi — Tea Ritual — an AI-generated interactive experience.' },
    { name: 'Equal / A Study in Pressure', path: 'games/Astra/MiaAI-Experiences/052-hydraulic-balance/index.html', preview: 'games/Astra/MiaAI-Experiences/052-hydraulic-balance/preview.jpg', icon: 'fas fa-palette', desc: 'Equal / A Study in Pressure — an AI-generated interactive experience.' },
    { name: 'Form / Type Playground', path: 'games/Astra/MiaAI-Experiences/053-type-specimen/index.html', preview: 'games/Astra/MiaAI-Experiences/053-type-specimen/preview.jpg', icon: 'fas fa-palette', desc: 'Form / Type Playground — an AI-generated interactive experience.' },
    { name: 'Selene / Moon Journal', path: 'games/Astra/MiaAI-Experiences/054-lunar-planner/index.html', preview: 'games/Astra/MiaAI-Experiences/054-lunar-planner/preview.jpg', icon: 'fas fa-palette', desc: 'Selene / Moon Journal — an AI-generated interactive experience.' },
    { name: 'Chroma / Color Kitchen', path: 'games/Astra/MiaAI-Experiences/055-chromatic-mixer/index.html', preview: 'games/Astra/MiaAI-Experiences/055-chromatic-mixer/preview.jpg', icon: 'fas fa-palette', desc: 'Chroma / Color Kitchen — an AI-generated interactive experience.' },
    { name: 'Midnight Frequency', path: 'games/Astra/MiaAI-Experiences/056-midnight-radio/index.html', preview: 'games/Astra/MiaAI-Experiences/056-midnight-radio/preview.jpg', icon: 'fas fa-palette', desc: 'Midnight Frequency — an AI-generated interactive experience.' },
    { name: 'Still / A Small Garden', path: 'games/Astra/MiaAI-Experiences/057-zen-stones/index.html', preview: 'games/Astra/MiaAI-Experiences/057-zen-stones/preview.jpg', icon: 'fas fa-palette', desc: 'Still / A Small Garden — an AI-generated interactive experience.' },
    { name: 'The Object Archive', path: 'games/Astra/MiaAI-Experiences/058-archive-vault/index.html', preview: 'games/Astra/MiaAI-Experiences/058-archive-vault/preview.jpg', icon: 'fas fa-palette', desc: 'The Object Archive — an AI-generated interactive experience.' },
    { name: 'Split / Precision Timer', path: 'games/Astra/MiaAI-Experiences/059-sprint-clock/index.html', preview: 'games/Astra/MiaAI-Experiences/059-sprint-clock/preview.jpg', icon: 'fas fa-palette', desc: 'Split / Precision Timer — an AI-generated interactive experience.' },
    { name: 'Sunday / Pasta for Everyone', path: 'games/Astra/MiaAI-Experiences/060-pasta-table/index.html', preview: 'games/Astra/MiaAI-Experiences/060-pasta-table/preview.jpg', icon: 'fas fa-palette', desc: 'Sunday / Pasta for Everyone — an AI-generated interactive experience.' },
    { name: 'Elsewhere / City Lines', path: 'games/Astra/MiaAI-Experiences/061-metro-map/index.html', preview: 'games/Astra/MiaAI-Experiences/061-metro-map/preview.jpg', icon: 'fas fa-palette', desc: 'Elsewhere / City Lines — an AI-generated interactive experience.' },
    { name: 'Aster / Connect the Night', path: 'games/Astra/MiaAI-Experiences/062-star-atlas/index.html', preview: 'games/Astra/MiaAI-Experiences/062-star-atlas/preview.jpg', icon: 'fas fa-palette', desc: 'Aster / Connect the Night — an AI-generated interactive experience.' },
    { name: 'Resonance / Wave Studio', path: 'games/Astra/MiaAI-Experiences/063-sound-shapes/index.html', preview: 'games/Astra/MiaAI-Experiences/063-sound-shapes/preview.jpg', icon: 'fas fa-palette', desc: 'Resonance / Wave Studio — an AI-generated interactive experience.' },
    { name: 'Beyond / A Fourth-Dimensional Study', path: 'games/Astra/MiaAI-Experiences/064-fourth-dimension/index.html', preview: 'games/Astra/MiaAI-Experiences/064-fourth-dimension/preview.jpg', icon: 'fas fa-palette', desc: 'Beyond / A Fourth-Dimensional Study — an AI-generated interactive experience.' },
    { name: 'Bloom / Botanical Geometry', path: 'games/Astra/MiaAI-Experiences/065-bloom-lab/index.html', preview: 'games/Astra/MiaAI-Experiences/065-bloom-lab/preview.jpg', icon: 'fas fa-palette', desc: 'Bloom / Botanical Geometry — an AI-generated interactive experience.' },
    { name: 'Knight / A Study in Movement', path: 'games/Astra/MiaAI-Experiences/066-knights-tour/index.html', preview: 'games/Astra/MiaAI-Experiences/066-knights-tour/preview.jpg', icon: 'fas fa-palette', desc: 'Knight / A Study in Movement — an AI-generated interactive experience.' },
    { name: 'Blue / Beneath the Surface', path: 'games/Astra/MiaAI-Experiences/067-glacier-study/index.html', preview: 'games/Astra/MiaAI-Experiences/067-glacier-study/preview.jpg', icon: 'fas fa-palette', desc: 'Blue / Beneath the Surface — an AI-generated interactive experience.' },
    { name: 'Fieldnotes / A Place for Small Ideas', path: 'games/Astra/MiaAI-Experiences/068-field-notes/index.html', preview: 'games/Astra/MiaAI-Experiences/068-field-notes/preview.jpg', icon: 'fas fa-palette', desc: 'Fieldnotes / A Place for Small Ideas — an AI-generated interactive experience.' },
    { name: 'After Hours / Ticket Studio', path: 'games/Astra/MiaAI-Experiences/069-night-ticket/index.html', preview: 'games/Astra/MiaAI-Experiences/069-night-ticket/preview.jpg', icon: 'fas fa-palette', desc: 'After Hours / Ticket Studio — an AI-generated interactive experience.' },
    { name: 'Equilibrium / Mobile Study', path: 'games/Astra/MiaAI-Experiences/070-kinetic-balance/index.html', preview: 'games/Astra/MiaAI-Experiences/070-kinetic-balance/preview.jpg', icon: 'fas fa-palette', desc: 'Equilibrium / Mobile Study — an AI-generated interactive experience.' },
    { name: 'Room / One Thing at a Time', path: 'games/Astra/MiaAI-Experiences/071-focus-room/index.html', preview: 'games/Astra/MiaAI-Experiences/071-focus-room/preview.jpg', icon: 'fas fa-palette', desc: 'Room / One Thing at a Time — an AI-generated interactive experience.' },
    { name: 'Patchwork / Pixel Quilt', path: 'games/Astra/MiaAI-Experiences/072-pixel-quilt/index.html', preview: 'games/Astra/MiaAI-Experiences/072-pixel-quilt/preview.jpg', icon: 'fas fa-palette', desc: 'Patchwork / Pixel Quilt — an AI-generated interactive experience.' },
    { name: 'Terroir / Tasting Notes', path: 'games/Astra/MiaAI-Experiences/073-cellar-notes/index.html', preview: 'games/Astra/MiaAI-Experiences/073-cellar-notes/preview.jpg', icon: 'fas fa-palette', desc: 'Terroir / Tasting Notes — an AI-generated interactive experience.' },
    { name: 'Orbit / A Little More Room', path: 'games/Astra/MiaAI-Experiences/074-orbit-budget/index.html', preview: 'games/Astra/MiaAI-Experiences/074-orbit-budget/preview.jpg', icon: 'fas fa-palette', desc: 'Orbit / A Little More Room — an AI-generated interactive experience.' },
    { name: 'Weather, by You', path: 'games/Astra/MiaAI-Experiences/075-cloud-composer/index.html', preview: 'games/Astra/MiaAI-Experiences/075-cloud-composer/preview.jpg', icon: 'fas fa-palette', desc: 'Weather, by You — an AI-generated interactive experience.' },
    { name: 'Atelier 04 — A house for quiet', path: 'games/Astra/MiaAI-Experiences/076-atelier-plan/index.html', preview: 'games/Astra/MiaAI-Experiences/076-atelier-plan/preview.jpg', icon: 'fas fa-palette', desc: 'Atelier 04 — A house for quiet — an AI-generated interactive experience.' },
    { name: 'Tsugi / The Beauty of Repair', path: 'games/Astra/MiaAI-Experiences/077-golden-repair/index.html', preview: 'games/Astra/MiaAI-Experiences/077-golden-repair/preview.jpg', icon: 'fas fa-palette', desc: 'Tsugi / The Beauty of Repair — an AI-generated interactive experience.' },
    { name: 'Midnight Picture House', path: 'games/Astra/MiaAI-Experiences/078-midnight-cinema/index.html', preview: 'games/Astra/MiaAI-Experiences/078-midnight-cinema/preview.jpg', icon: 'fas fa-palette', desc: 'Midnight Picture House — an AI-generated interactive experience.' },
    { name: 'Isola — An atlas of elsewhere', path: 'games/Astra/MiaAI-Experiences/079-island-atlas/index.html', preview: 'games/Astra/MiaAI-Experiences/079-island-atlas/preview.jpg', icon: 'fas fa-palette', desc: 'Isola — An atlas of elsewhere — an AI-generated interactive experience.' },
    { name: 'Forma — The hour object', path: 'games/Astra/MiaAI-Experiences/080-hour-object/index.html', preview: 'games/Astra/MiaAI-Experiences/080-hour-object/preview.jpg', icon: 'fas fa-palette', desc: 'Forma — The hour object — an AI-generated interactive experience.' },
    { name: 'Chromatic Chapel', path: 'games/Astra/MiaAI-Experiences/081-chromatic-chapel/index.html', preview: 'games/Astra/MiaAI-Experiences/081-chromatic-chapel/preview.jpg', icon: 'fas fa-palette', desc: 'Chromatic Chapel — an AI-generated interactive experience.' },
    { name: 'Clay / Form Studio', path: 'games/Astra/MiaAI-Experiences/082-clay-form/index.html', preview: 'games/Astra/MiaAI-Experiences/082-clay-form/preview.jpg', icon: 'fas fa-palette', desc: 'Clay / Form Studio — an AI-generated interactive experience.' },
    { name: 'Letter Foundry — Type in motion', path: 'games/Astra/MiaAI-Experiences/083-letter-foundry/index.html', preview: 'games/Astra/MiaAI-Experiences/083-letter-foundry/preview.jpg', icon: 'fas fa-palette', desc: 'Letter Foundry — Type in motion — an AI-generated interactive experience.' },
    { name: 'Ringworld / The Geometry of Saturn', path: 'games/Astra/MiaAI-Experiences/084-ring-world/index.html', preview: 'games/Astra/MiaAI-Experiences/084-ring-world/preview.jpg', icon: 'fas fa-palette', desc: 'Ringworld / The Geometry of Saturn — an AI-generated interactive experience.' },
    { name: 'Nightjet — Somewhere by morning', path: 'games/Astra/MiaAI-Experiences/085-night-train/index.html', preview: 'games/Astra/MiaAI-Experiences/085-night-train/preview.jpg', icon: 'fas fa-palette', desc: 'Nightjet — Somewhere by morning — an AI-generated interactive experience.' },
    { name: 'Woven Memory — Pattern studio', path: 'games/Astra/MiaAI-Experiences/086-woven-memory/index.html', preview: 'games/Astra/MiaAI-Experiences/086-woven-memory/preview.jpg', icon: 'fas fa-palette', desc: 'Woven Memory — Pattern studio — an AI-generated interactive experience.' },
    { name: 'The Marble Room', path: 'games/Astra/MiaAI-Experiences/087-marble-room/index.html', preview: 'games/Astra/MiaAI-Experiences/087-marble-room/preview.jpg', icon: 'fas fa-palette', desc: 'The Marble Room — an AI-generated interactive experience.' },
    { name: 'Kō / An Hour Without Edges', path: 'games/Astra/MiaAI-Experiences/088-incense-hour/index.html', preview: 'games/Astra/MiaAI-Experiences/088-incense-hour/preview.jpg', icon: 'fas fa-palette', desc: 'Kō / An Hour Without Edges — an AI-generated interactive experience.' },
    { name: 'Side B — A listening room', path: 'games/Astra/MiaAI-Experiences/089-vinyl-evening/index.html', preview: 'games/Astra/MiaAI-Experiences/089-vinyl-evening/preview.jpg', icon: 'fas fa-palette', desc: 'Side B — A listening room — an AI-generated interactive experience.' },
    { name: 'Glasshouse — Plant care journal', path: 'games/Astra/MiaAI-Experiences/090-glasshouse/index.html', preview: 'games/Astra/MiaAI-Experiences/090-glasshouse/preview.jpg', icon: 'fas fa-palette', desc: 'Glasshouse — Plant care journal — an AI-generated interactive experience.' },
    { name: 'Between Mountains — Ink study', path: 'games/Astra/MiaAI-Experiences/091-ink-mountains/index.html', preview: 'games/Astra/MiaAI-Experiences/091-ink-mountains/preview.jpg', icon: 'fas fa-palette', desc: 'Between Mountains — Ink study — an AI-generated interactive experience.' },
    { name: 'Aerogram / A Small Leap of Faith', path: 'games/Astra/MiaAI-Experiences/092-aerogram/index.html', preview: 'games/Astra/MiaAI-Experiences/092-aerogram/preview.jpg', icon: 'fas fa-palette', desc: 'Aerogram / A Small Leap of Faith — an AI-generated interactive experience.' },
    { name: '093 Cellar Notes', path: 'games/Astra/MiaAI-Experiences/093-cellar-notes/index.html', preview: 'games/Astra/MiaAI-Experiences/093-cellar-notes/preview.jpg', icon: 'fas fa-palette', desc: '093 Cellar Notes — A private collection — an AI-generated interactive experience.' },
    { name: 'Ribbon — A rehearsal in motion', path: 'games/Astra/MiaAI-Experiences/094-ribbon-rehearsal/index.html', preview: 'games/Astra/MiaAI-Experiences/094-ribbon-rehearsal/preview.jpg', icon: 'fas fa-palette', desc: 'Ribbon — A rehearsal in motion — an AI-generated interactive experience.' },
    { name: 'Light Hour — A shadow study', path: 'games/Astra/MiaAI-Experiences/095-light-hour/index.html', preview: 'games/Astra/MiaAI-Experiences/095-light-hour/preview.jpg', icon: 'fas fa-palette', desc: 'Light Hour — A shadow study — an AI-generated interactive experience.' },
    { name: 'Ferro / Invisible Forces', path: 'games/Astra/MiaAI-Experiences/096-magnetic-matter/index.html', preview: 'games/Astra/MiaAI-Experiences/096-magnetic-matter/preview.jpg', icon: 'fas fa-palette', desc: 'Ferro / Invisible Forces — an AI-generated interactive experience.' },
    { name: 'A Small Oracle', path: 'games/Astra/MiaAI-Experiences/097-small-oracle/index.html', preview: 'games/Astra/MiaAI-Experiences/097-small-oracle/preview.jpg', icon: 'fas fa-palette', desc: 'A Small Oracle — an AI-generated interactive experience.' },
    { name: 'Poolside — A little longer', path: 'games/Astra/MiaAI-Experiences/098-poolside-club/index.html', preview: 'games/Astra/MiaAI-Experiences/098-poolside-club/preview.jpg', icon: 'fas fa-palette', desc: 'Poolside — A little longer — an AI-generated interactive experience.' },
    { name: 'Marginalia — A page for your thoughts', path: 'games/Astra/MiaAI-Experiences/099-marginalia/index.html', preview: 'games/Astra/MiaAI-Experiences/099-marginalia/preview.jpg', icon: 'fas fa-palette', desc: 'Marginalia — A page for your thoughts — an AI-generated interactive experience.' },
    { name: 'Organica — Wave laboratory', path: 'games/Astra/MiaAI-Experiences/100-organic-wave-lab/index.html', preview: 'games/Astra/MiaAI-Experiences/100-organic-wave-lab/preview.jpg', icon: 'fas fa-palette', desc: 'Organica — Wave laboratory — an AI-generated interactive experience.' },
];

let currentCategory = 'all';
let allGames = [];
let i18nInitialized = false;
// 分页加载
const PAGE_SIZE = 24;
let currentPage = 1;
let filteredGames = [];
let isLoading = false;

// 游戏卡片链接：统一使用无扩展名带斜杠 URL（games/xxx/），避免 Cloudflare Pages 对
// games/xxx/index.html 的 308 重定向被 Google 记为"自动重定向失败"
function gameHref(path) {
    if (typeof path !== 'string') return path;
    return path.replace(/\/index\.html$/i, '/');
}

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
    art.href = gameHref(pick.path);
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
    card.href = gameHref(game.path);
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.dataset.category = game.category;
    // 网格入场阶梯延迟：55ms × min(索引,9)，封顶 9
    card.style.animationDelay = `${55 * Math.min(index, 9)}ms`;

    const localizedName = window.i18n?.t(`games.${game.name}`) || game.name;
    const localizedDesc = window.i18n?.t(`games.${game.name}_desc`) || game.desc;
    const localizedCategory = getCategoryName(game.category);
    const subtitle = getEnSubtitle(game, localizedName, localizedCategory);

    // 标签：AI生成、热门、新品、语言
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
    if (game.lang && game.lang !== 'little') {
        const langLabel = window.i18n?.t(`games.lang.${game.lang}`) || game.lang;
        const langClass = game.lang === 'no_need' ? 'tag-lang-ok' : 'tag-lang-text';
        tags.push(`<span class="game-tag ${langClass}">${langLabel}</span>`);
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
        // 跳过"换一批"等非分类按钮（无 data-category）；否则点击会触发 renderGames(undefined) 重置回全部列表
        if (!btn.dataset.category) return;
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
