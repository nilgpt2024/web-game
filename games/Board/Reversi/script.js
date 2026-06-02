(function() {
    'use strict';

    const EMPTY = 0;
    const BLACK = 1;
    const WHITE = 2;

    const DIRECTIONS = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0], [1, 1]
    ];

    let board = [];
    let currentPlayer = BLACK;
    let gameOver = false;
    let history = [];
    let lastMovePos = null;

    const boardEl = document.getElementById('board');
    const blackScoreEl = document.getElementById('blackScore');
    const whiteScoreEl = document.getElementById('whiteScore');
    const turnIndicatorEl = document.getElementById('turnIndicator');
    const gameStatusEl = document.getElementById('gameStatus');
    const newGameBtn = document.getElementById('newGameBtn');
    const undoBtn = document.getElementById('undoBtn');
    const showHintsCheckbox = document.getElementById('showHints');
    const difficultySelect = document.getElementById('difficultySelect');

    function initBoard() {
        board = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
        board[3][3] = WHITE;
        board[3][4] = BLACK;
        board[4][3] = BLACK;
        board[4][4] = WHITE;
        currentPlayer = BLACK;
        gameOver = false;
        history = [];
        lastMovePos = null;
        gameStatusEl.className = 'game-status';
        gameStatusEl.textContent = '';
    }

    function renderBoard() {
        boardEl.innerHTML = '';
        const validMoves = getValidMoves(currentPlayer);

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (showHintsCheckbox.checked && !gameOver && validMoves.some(m => m.row === row && m.col === col)) {
                    cell.classList.add('valid-move');
                }

                if (lastMovePos && lastMovePos.row === row && lastMovePos.col === col) {
                    cell.classList.add('last-move');
                }

                if (board[row][col] !== EMPTY) {
                    const container = document.createElement('div');
                    container.className = 'piece-container';
                    const piece = document.createElement('div');
                    piece.className = 'piece ' + (board[row][col] === BLACK ? 'black' : 'white');
                    piece.id = `piece-${row}-${col}`;
                    container.appendChild(piece);
                    cell.appendChild(container);
                }

                if (!gameOver && currentPlayer === BLACK && validMoves.some(m => m.row === row && m.col === col)) {
                    cell.addEventListener('click', handleCellClick);
                }

                boardEl.appendChild(cell);
            }
        }
        updateUI();
    }

    function updateUI() {
        const scores = countPieces();
        blackScoreEl.textContent = scores.black;
        whiteScoreEl.textContent = scores.white;

        const playerBlackEl = document.querySelector('.player-black');
        const playerWhiteEl = document.querySelector('.player-white');
        playerBlackEl.classList.toggle('active', currentPlayer === BLACK && !gameOver);
        playerWhiteEl.classList.toggle('active', currentPlayer === WHITE && !gameOver);

        if (!gameOver) {
            turnIndicatorEl.innerHTML = `<span data-i18n="${currentPlayer === BLACK ? 'yourTurn' : 'aiThinking'}">${currentPlayer === BLACK ? '你的回合' : 'AI 思考中...'}</span>`;
            turnIndicatorEl.style.display = '';
        } else {
            turnIndicatorEl.style.display = 'none';
        }

        undoBtn.disabled = history.length === 0 || gameOver;
    }

    function countPieces() {
        let black = 0, white = 0;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (board[r][c] === BLACK) black++;
                else if (board[r][c] === WHITE) white++;
            }
        }
        return { black, white };
    }

    function isInBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    function getFlips(row, col, player) {
        if (board[row][col] !== EMPTY) return [];

        const opponent = player === BLACK ? WHITE : BLACK;
        let allFlips = [];

        for (const [dr, dc] of DIRECTIONS) {
            let flips = [];
            let r = row + dr;
            let c = col + dc;

            while (isInBounds(r, c) && board[r][c] === opponent) {
                flips.push({ row: r, col: c });
                r += dr;
                c += dc;
            }

            if (flips.length > 0 && isInBounds(r, c) && board[r][c] === player) {
                allFlips = allFlips.concat(flips);
            }
        }
        return allFlips;
    }

    function getValidMoves(player) {
        const moves = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (getFlips(r, c, player).length > 0) {
                    moves.push({ row: r, col: c });
                }
            }
        }
        return moves;
    }

    function hasValidMoves(player) {
        return getValidMoves(player).length > 0;
    }

    async function makeMove(row, col, player, animate = true) {
        const flips = getFlips(row, col, player);
        if (flips.length === 0) return false;

        history.push({
            board: board.map(r => [...r]),
            player: currentPlayer,
            lastMove: lastMovePos
        });

        board[row][col] = player;
        lastMovePos = { row, col };

        renderBoard();

        if (animate) {
            const newPiece = document.getElementById(`piece-${row}-${col}`);
            if (newPiece) newPiece.classList.add('placing');

            await delay(getAnimationDelay());

            for (const flip of flips) {
                const piece = document.getElementById(`piece-${flip.row}-${flip.col}`);
                if (piece) piece.classList.add('flipping');
            }

            await delay(550);

            for (const flip of flips) {
                board[flip.row][flip.col] = player;
            }

            renderBoard();
        } else {
            for (const flip of flips) {
                board[flip.row][flip.col] = player;
            }
        }

        switchTurn();
        return true;
    }

    function switchTurn() {
        const opponent = currentPlayer === BLACK ? WHITE : BLACK;
        currentPlayer = opponent;

        if (!hasValidMoves(currentPlayer)) {
            if (!hasValidMoves(currentPlayer === BLACK ? WHITE : BLACK)) {
                endGame();
                return;
            }
            currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
        }

        renderBoard();

        if (currentPlayer === WHITE && !gameOver) {
            setTimeout(() => aiMove(), 600 + Math.random() * 400);
        }
    }

    async function aiMove() {
        if (gameOver || currentPlayer !== WHITE) return;

        const difficulty = difficultySelect.value;
        let move;

        switch (difficulty) {
            case 'easy':
                move = getRandomMove();
                break;
            case 'hard':
                move = getBestMove(5);
                break;
            default:
                move = getBestMove(2);
                break;
        }

        if (move) {
            await makeMove(move.row, move.col, WHITE);
        }
    }

    function getRandomMove() {
        const moves = getValidMoves(WHITE);
        if (moves.length === 0) return null;
        return moves[Math.floor(Math.random() * moves.length)];
    }

    function getBestMove(depth) {
        const moves = getValidMoves(WHITE);
        if (moves.length === 0) return null;

        let bestScore = -Infinity;
        let bestMoves = [];

        for (const move of moves) {
            const score = evaluateMove(move, depth);
            if (score > bestScore) {
                bestScore = score;
                bestMoves = [move];
            } else if (score === bestScore) {
                bestMoves.push(move);
            }
        }

        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    function evaluateMove(move, depth) {
        const testBoard = board.map(r => [...r]);
        const flips = getFlips(move.row, move.col, WHITE);
        testBoard[move.row][move.col] = WHITE;
        for (const f of flips) testBoard[f.row][f.col] = WHITE;

        let score = flips.length * 2;

        const positionWeights = [
            [100, -20, 10,  5,  5, 10, -20, 100],
            [-20, -50, -2, -2, -2,  -2, -50, -20],
            [ 10,  -2,  1,  1,  1,   1,  -2,  10],
            [  5,  -2,  1,  0,  0,   1,  -2,   5],
            [  5,  -2,  1,  0,  0,   1,  -2,   5],
            [ 10,  -2,  1,  1,  1,   1,  -2,  10],
            [-20, -50, -2, -2, -2,  -2, -50, -20],
            [100, -20, 10,  5,  5, 10, -20, 100]
        ];

        score += positionWeights[move.row][move.col];

        const isCorner = (move.row === 0 || move.row === 7) && (move.col === 0 || move.col === 7);
        if (isCorner) score += 30;

        const isAdjacentToCorner =
            ((move.row <= 1 || move.row >= 6) && (move.col === 0 || move.col === 7)) ||
            ((move.col <= 1 || move.col >= 6) && (move.row === 0 || move.row === 7));
        if (isAdjacentToCorner && !isCorner) score -= 25;

        if (depth > 0) {
            const originalBoard = board;
            board = testBoard;
            const oppMoves = getValidMoves(BLACK);
            if (oppMoves.length === 0) {
                score += 40;
            } else {
                let worstForOpp = Infinity;
                for (const om of oppMoves) {
                    const omFlips = getFlips(om.row, om.col, BLACK);
                    worstForOpp = Math.min(worstForOpp, omFlips.length);
                }
                score -= worstForOpp * 0.5;
            }
            board = originalBoard;
        }

        return score;
    }

    function endGame() {
        gameOver = true;
        const scores = countPieces();

        gameStatusEl.classList.add('show');

        if (scores.black > scores.white) {
            gameStatusEl.classList.add('win');
            gameStatusEl.textContent = `🎉 恭喜！你赢了 ${scores.black} : ${scores.white}`;
        } else if (scores.white > scores.black) {
            gameStatusEl.classList.add('lose');
            gameStatusEl.textContent = `😔 AI 赢了 ${scores.white} : ${scores.black}`;
        } else {
            gameStatusEl.classList.add('draw');
            gameStatusEl.textContent = `🤝 平局 ${scores.black} : ${scores.white}`;
        }

        renderBoard();
    }

    function undo() {
        if (history.length === 0 || gameOver) return;

        const state = history.pop();
        board = state.board;
        currentPlayer = state.player;
        lastMovePos = state.lastMove;

        while (history.length > 0 && currentPlayer === WHITE) {
            const prev = history.pop();
            board = prev.board;
            currentPlayer = prev.player;
            lastMovePos = prev.lastMove;
        }

        renderBoard();
    }

    function handleCellClick(e) {
        if (gameOver || currentPlayer !== BLACK) return;

        const cell = e.currentTarget;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (getFlips(row, col, BLACK).length > 0) {
            makeMove(row, col, BLACK);
        }
    }

    function getAnimationDelay() {
        const speed = document.getElementById('animationSpeed')?.value || 'normal';
        switch (speed) {
            case 'fast': return 150;
            case 'slow': return 400;
            default: return 280;
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    newGameBtn.addEventListener('click', () => {
        initBoard();
        renderBoard();
    });

    undoBtn.addEventListener('click', undo);

    showHintsCheckbox.addEventListener('change', () => {
        if (!gameOver) renderBoard();
    });

    if (typeof GameI18n !== 'undefined') {
        const gameI18n = new GameI18n();
        gameI18n.init();
    }

    initBoard();
    renderBoard();
})();
