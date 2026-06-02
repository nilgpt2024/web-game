const Sokoban = (() => {
    const TILE = {
        FLOOR: 0,
        WALL: 1,
        TARGET: 2,
        BOX: 3,
        BOX_ON_TARGET: 4,
        PLAYER: 5,
        PLAYER_ON_TARGET: 6
    };

    const LEVELS = [
        {
            name: 'Level 1',
            map: [
                '  ####  ',
                '###  ###',
                '#   $  #',
                '# .@.  #',
                '#   $  #',
                '###  ###',
                '  ####  '
            ]
        },
        {
            name: 'Level 2',
            map: [
                '  ##### ',
                '###   ##',
                '# $ #  #',
                '# . .@#',
                '# $ #  #',
                '###   ##',
                '  ##### '
            ]
        },
        {
            name: 'Level 3',
            map: [
                '####### ',
                '#     # ',
                '# .$$.# ',
                '# $@$ # ',
                '# .$$.# ',
                '#     # ',
                '####### '
            ]
        },
        {
            name: 'Level 4',
            map: [
                '  ######',
                '  #    #',
                '  #$   #',
                '### .  #',
                '# .$.@ #',
                '### .###',
                '  #    #',
                '  ######'
            ]
        },
        {
            name: 'Level 5',
            map: [
                ' ###### ',
                ' #    ##',
                '##$#   #',
                '# ..$@ #',
                '# ...# #',
                '##$$#  #',
                ' #     #',
                ' #######'
            ]
        },
        {
            name: 'Level 6',
            map: [
                '  ##### ',
                '###   ##',
                '# $ #  #',
                '#.$.$. #',
                '# $ #  #',
                '#.@.#  #',
                '###   ##',
                '  ##### '
            ]
        },
        {
            name: 'Level 7',
            map: [
                '########',
                '#      #',
                '# .$@. #',
                '# .$$# #',
                '# .  # #',
                '#  $  # ',
                '####  ##',
                '   #### '
            ]
        },
        {
            name: 'Level 8',
            map: [
                '  ######',
                '  #    #',
                '###$#$ #',
                '# .... #',
                '# $@$  #',
                '# .... #',
                '###$#$ #',
                '  #    #',
                '  ######'
            ]
        },
        {
            name: 'Level 9',
            map: [
                ' ########',
                ' ##  #  #',
                ' # $    #',
                '## $$# ##',
                '# .#. . #',
                '# .#@.# #',
                '# .#. . #',
                '## $$# ##',
                ' # $    #',
                ' ##  #  #',
                ' ########'
            ]
        },
        {
            name: 'Level 10',
            map: [
                '  #######',
                '  #     #',
                '  # .$. #',
                '###$#$# #',
                '#  ...  #',
                '# @$#$ ###',
                '#  ...  #',
                '###$#$# #',
                '  # .$. #',
                '  #     #',
                '  #######'
            ]
        },
        {
            name: 'Level 11',
            map: [
                '   ######',
                '   #    #',
                '   # ## ##',
                '### $    #',
                '#  $ #...#',
                '# #@#....#',
                '#  $ #...#',
                '### $    #',
                '   # ## ##',
                '   #    #',
                '   ######'
            ]
        },
        {
            name: 'Level 12',
            map: [
                '    #####',
                '    #   #',
                '    #$  #',
                '  ### .##',
                '  #  .@ #',
                '### $ . #',
                '#  #..# #',
                '# $$  # #',
                '#   #   #',
                '#########'
            ]
        }
    ];

    let currentLevel = 0;
    let grid = [];
    let playerPos = { x: 0, y: 0 };
    let boxes = [];
    let targets = [];
    let steps = 0;
    let history = [];
    let gameWon = false;
    let facing = 'down';

    const boardEl = document.getElementById('board');
    const stepsDisplay = document.getElementById('steps-display');
    const levelDisplay = document.getElementById('level-display');
    const bestDisplay = document.getElementById('best-display');
    const boxesDisplay = document.getElementById('boxes-display');
    const undoBtn = document.getElementById('undo-btn');

    function parseLevel(levelData) {
        const lines = levelData.map;
        grid = [];
        boxes = [];
        targets = [];
        playerPos = { x: 0, y: 0 };
        steps = 0;
        history = [];
        gameWon = false;

        for (let y = 0; y < lines.length; y++) {
            const row = [];
            for (let x = 0; x < lines[y].length; x++) {
                const ch = lines[y][x];
                switch (ch) {
                    case '#':
                        row.push(TILE.WALL);
                        break;
                    case '@':
                        row.push(TILE.FLOOR);
                        playerPos = { x, y };
                        break;
                    case '+':
                        row.push(TILE.TARGET);
                        playerPos = { x, y };
                        targets.push({ x, y });
                        break;
                    case '$':
                        row.push(TILE.FLOOR);
                        boxes.push({ x, y });
                        break;
                    case '*':
                        row.push(TILE.TARGET);
                        boxes.push({ x, y });
                        targets.push({ x, y });
                        break;
                    case '.':
                        row.push(TILE.TARGET);
                        targets.push({ x, y });
                        break;
                    default:
                        row.push(TILE.FLOOR);
                }
            }
            grid.push(row);
        }
    }

    function getBestRecord(level) {
        try {
            return parseInt(localStorage.getItem(`sokoban_best_${level}`)) || null;
        } catch {
            return null;
        }
    }

    function setBestRecord(level, val) {
        try {
            localStorage.setItem(`sokoban_best_${level}`, val);
        } catch {}
    }

    function isCompleted(level) {
        try {
            return JSON.parse(localStorage.getItem(`sokoban_completed`) || '{}')[level] || false;
        } catch {
            return false;
        }
    }

    function markCompleted(level) {
        try {
            const data = JSON.parse(localStorage.getItem(`sokoban_completed`) || '{}');
            data[level] = true;
            localStorage.setItem(`sokoban_completed`, JSON.stringify(data));
        } catch {}
    }

    function updateStats() {
        stepsDisplay.textContent = steps;
        levelDisplay.textContent = `${currentLevel + 1} / ${LEVELS.length}`;
        const best = getBestRecord(currentLevel);
        bestDisplay.textContent = best !== null ? best : '-';
        const onTarget = boxes.filter(b => targets.some(t => t.x === b.x && t.y === b.y)).length;
        boxesDisplay.textContent = `${onTarget} / ${targets.length}`;
        undoBtn.disabled = history.length === 0 || gameWon;
    }

    function render() {
        boardEl.innerHTML = '';
        const inner = document.createElement('div');
        inner.className = 'board-inner';
        inner.style.gridTemplateColumns = `repeat(${grid[0].length}, 1fr)`;

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;

                if (grid[y][x] === TILE.WALL) {
                    cell.innerHTML = `
                        <div class="wall-3d">
                            <div class="wall-face wall-front"></div>
                            <div class="wall-face wall-top"></div>
                            <div class="wall-face wall-left"></div>
                            <div class="wall-face wall-right"></div>
                        </div>`;
                } else if (grid[y][x] !== undefined) {
                    cell.classList.add('cell-floor');

                    const isTarget = targets.some(t => t.x === x && t.y === y);
                    if (isTarget) {
                        const marker = document.createElement('div');
                        marker.className = 'target-marker';
                        cell.appendChild(marker);
                    }

                    const box = boxes.find(b => b.x === x && b.y === y);
                    if (box) {
                        const onTarget = isTarget;
                        const boxEl = document.createElement('div');
                        boxEl.className = `box-3d${onTarget ? ' on-target' : ''}`;
                        boxEl.innerHTML = `
                            <div class="box-face box-front"></div>
                            <div class="box-face box-top"></div>
                            <div class="box-face box-left"></div>
                            <div class="box-face box-right"></div>`;
                        cell.appendChild(boxEl);
                    }

                    if (playerPos.x === x && playerPos.y === y) {
                        const playerEl = document.createElement('div');
                        playerEl.className = `player-3d facing-${facing}`;
                        playerEl.innerHTML = `
                            <div class="player-body">
                                <div class="player-face player-head"></div>
                                <div class="player-face player-top-face"></div>
                                <div class="player-face player-left-face"></div>
                                <div class="player-face player-right-face"></div>
                            </div>`;
                        cell.appendChild(playerEl);
                    }
                }

                inner.appendChild(cell);
            }
        }

        boardEl.appendChild(inner);
        updateStats();
    }

    function move(dx, dy) {
        if (gameWon) return;

        const nx = playerPos.x + dx;
        const ny = playerPos.y + dy;

        if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[ny].length) return;
        if (grid[ny][nx] === TILE.WALL) return;

        const boxIdx = boxes.findIndex(b => b.x === nx && b.y === ny);

        if (boxIdx !== -1) {
            const bx = nx + dx;
            const by = ny + dy;

            if (by < 0 || by >= grid.length || bx < 0 || bx >= grid[by].length) return;
            if (grid[by][bx] === TILE.WALL) return;
            if (boxes.some(b => b.x === bx && b.y === by)) return;

            history.push({
                type: 'push',
                playerFrom: { ...playerPos },
                playerTo: { x: nx, y: ny },
                boxIndex: boxIdx,
                boxFrom: { x: nx, y: ny },
                boxTo: { x: bx, y: by },
                facingBefore: facing
            });

            boxes[boxIdx] = { x: bx, y: by };
            playerPos = { x: nx, y: ny };
            steps++;

            const cell = boardEl.querySelector(`[data-x="${nx}"][data-y="${ny}"]`);
            if (cell) {
                const boxEl = cell.querySelector('.box-3d');
                if (boxEl) {
                    boxEl.classList.add('box-pushed');
                    setTimeout(() => boxEl.classList.remove('box-pushed'), 200);
                }
            }
        } else {
            history.push({
                type: 'move',
                from: { ...playerPos },
                to: { x: nx, y: ny },
                facingBefore: facing
            });

            playerPos = { x: nx, y: ny };
            steps++;
        }

        if (dx === 0 && dy === -1) facing = 'up';
        else if (dx === 0 && dy === 1) facing = 'down';
        else if (dx === -1 && dy === 0) facing = 'left';
        else if (dx === 1 && dy === 0) facing = 'right';

        const pCell = boardEl.querySelector(`[data-x="${playerPos.x}"][data-y="${playerPos.y}"]`);
        if (pCell) {
            const pEl = pCell.querySelector('.player-3d');
            if (pEl) {
                pEl.className = `player-3d facing-${facing} player-moving`;
                setTimeout(() => pEl.classList.remove('player-moving'), 150);
            }
        }

        render();
        checkWin();
    }

    function undo() {
        if (history.length === 0 || gameWon) return;

        const action = history.pop();

        if (action.type === 'move') {
            playerPos = action.from;
        } else if (action.type === 'push') {
            playerPos = action.playerFrom;
            boxes[action.boxIndex] = action.boxFrom;
        }

        facing = action.facingBefore;
        steps--;
        render();
    }

    function checkWin() {
        const allOnTarget = boxes.every(b => targets.some(t => t.x === b.x && t.y === b.y));
        if (!allOnTarget) return;

        gameWon = true;
        markCompleted(currentLevel);

        const best = getBestRecord(currentLevel);
        if (best === null || steps < best) {
            setBestRecord(currentLevel, steps);
        }

        setTimeout(() => showVictoryModal(), 400);

        const board = document.querySelector('.game-board');
        if (board) {
            board.classList.add('victory-shake');
            setTimeout(() => board.classList.remove('victory-shake'), 500);
        }
    }

    function showVictoryModal() {
        document.getElementById('victory-steps').textContent = steps;
        document.getElementById('victory-best').textContent = getBestRecord(currentLevel) || steps;

        if (currentLevel >= LEVELS.length - 1) {
            document.getElementById('victory-modal').classList.remove('show');
            document.getElementById('complete-modal').classList.add('show');
        } else {
            document.getElementById('victory-modal').classList.add('show');
        }
    }

    function hideVictoryModal() {
        document.getElementById('victory-modal').classList.remove('show');
        document.getElementById('complete-modal').classList.remove('show');
    }

    function loadLevel(index) {
        currentLevel = index;
        parseLevel(LEVELS[index]);
        facing = 'down';
        hideVictoryModal();
        render();
        buildLevelGrid();
    }

    function restart() {
        loadLevel(currentLevel);
    }

    function nextLevel() {
        hideVictoryModal();
        if (currentLevel < LEVELS.length - 1) {
            loadLevel(currentLevel + 1);
        }
    }

    function buildLevelGrid() {
        const gridEl = document.getElementById('level-grid');
        gridEl.innerHTML = '';

        LEVELS.forEach((level, i) => {
            const btn = document.createElement('button');
            btn.className = 'level-btn';
            btn.textContent = i + 1;

            if (i === currentLevel) btn.classList.add('current');
            if (isCompleted(i)) btn.classList.add('completed');

            btn.addEventListener('click', () => loadLevel(i));
            gridEl.appendChild(btn);
        });
    }

    function toggleRules() {
        document.getElementById('rules').classList.toggle('open');
    }

    function closeRules() {
        document.getElementById('rules').classList.remove('open');
    }

    function handleKeydown(e) {
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            undo();
            return;
        }

        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                e.preventDefault();
                move(0, -1);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                e.preventDefault();
                move(0, 1);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                e.preventDefault();
                move(-1, 0);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                e.preventDefault();
                move(1, 0);
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                restart();
                break;
            case 'Escape':
                closeRules();
                break;
        }
    }

    function init() {
        loadLevel(0);

        document.addEventListener('keydown', handleKeydown);

        document.getElementById('rules-btn').addEventListener('click', toggleRules);
        document.getElementById('close-rules-btn').addEventListener('click', closeRules);
        document.getElementById('undo-btn').addEventListener('click', undo);
        document.getElementById('restart-btn').addEventListener('click', restart);
        document.getElementById('levels-btn').addEventListener('click', () => {
            document.getElementById('level-panel').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('replay-btn').addEventListener('click', () => {
            hideVictoryModal();
            restart();
        });

        document.getElementById('next-level-btn').addEventListener('click', nextLevel);
        document.getElementById('back-to-first-btn').addEventListener('click', () => {
            hideVictoryModal();
            loadLevel(0);
        });

        document.querySelectorAll('.mobile-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const dir = btn.dataset.dir;
                switch (dir) {
                    case 'up': move(0, -1); break;
                    case 'down': move(0, 1); break;
                    case 'left': move(-1, 0); break;
                    case 'right': move(1, 0); break;
                }
            });
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', Sokoban.init);
