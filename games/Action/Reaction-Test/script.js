const ReactionGame = (() => {
    const STORAGE_KEY = 'reaction-test-data';
    const COLORS = [
        { name: 'red', hex: '#ef4444', zh: '红色', en: 'Red' },
        { name: 'blue', hex: '#3b82f6', zh: '蓝色', en: 'Blue' },
        { name: 'green', hex: '#22c55e', zh: '绿色', en: 'Green' },
        { name: 'yellow', hex: '#eab308', zh: '黄色', en: 'Yellow' },
        { name: 'purple', hex: '#a855f7', zh: '紫色', en: 'Purple' },
        { name: 'orange', hex: '#f97316', zh: '橙色', en: 'Orange' }
    ];

    const RATING_TIERS = [
        { min: 0, max: 149, grade: 'S', key: 'excellent' },
        { min: 150, max: 199, grade: 'A', key: 'great' },
        { min: 200, max: 279, grade: 'B', key: 'good' },
        { min: 280, max: 349, grade: 'C', key: 'average' },
        { min: 350, max: Infinity, grade: 'D', key: 'slow' }
    ];

    let state = {
        mode: 'classic',
        phase: 'idle',
        startTime: 0,
        timeoutId: null,
        targetColor: null,
        sequence: [],
        playerIndex: 0,
        round: 0,
        totalRounds: 5,
        seqTimerStart: 0,
        seqTimerDuration: 2500,
        seqTimerInterval: null,
        history: [],
        bestTime: null,
        attempts: 0
    };

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function getLang() {
        return localStorage.getItem('WebGameHub-lang') || 'zh-CN';
    }

    function t(key) {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        return el ? el.textContent : key;
    }

    function loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                state.history = data.history || [];
                state.bestTime = data.bestTime || null;
                state.attempts = data.attempts || 0;
            }
        } catch (_) {}
    }

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            history: state.history.slice(-50),
            bestTime: state.bestTime,
            attempts: state.attempts
        }));
    }

    function getRating(ms) {
        for (const tier of RATING_TIERS) {
            if (ms >= tier.min && ms <= tier.max) return tier;
        }
        return RATING_TIERS[RATING_TIERS.length - 1];
    }

    function formatTime(ms) {
        return ms + ' ms';
    }

    function updateStats() {
        $('#last-time').textContent = state.history.length > 0 ? formatTime(state.history[state.history.length - 1].time) : '---';
        $('#best-time').textContent = state.bestTime !== null ? formatTime(state.bestTime) : '---';

        if (state.history.length > 0) {
            const avg = Math.round(state.history.reduce((s, h) => s + h.time, 0) / state.history.length);
            $('#avg-time').textContent = formatTime(avg);
        } else {
            $('#avg-time').textContent = '---';
        }

        $('#attempts').textContent = state.attempts;
    }

    function renderHistory() {
        const list = $('#history-list');
        if (state.history.length === 0) {
            list.innerHTML = `<div class="history-empty">${t('reaction.noHistory')}</div>`;
            return;
        }

        const sorted = [...state.history].sort((a, b) => a.time - b.time).slice(0, 15);
        list.innerHTML = sorted.map((item, i) => {
            const rating = getRating(item.time);
            const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other';
            return `
                <div class="history-item">
                    <span class="history-item-rank ${rankClass}">${i + 1}</span>
                    <span class="history-item-time">${formatTime(item.time)}</span>
                    <span class="history-item-grade grade-${rating.grade.toLowerCase()}">${rating.grade}</span>
                    <span style="color:#94a3b8;font-size:0.76px;margin-left:auto;">${item.mode}</span>
                </div>`;
        }).join('');
    }

    function showResult(ms) {
        const rating = getRating(ms);
        $('#result-grade').textContent = rating.grade;
        $('#result-time').textContent = formatTime(ms);
        const ratingTextKey = `reaction.ratings.${rating.key}`;
        const ratingEl = document.querySelector(`[data-i18n="${ratingTextKey}"]`);
        $('#result-rating').textContent = ratingEl ? ratingEl.textContent : rating.grade;
        $('#result-display').style.display = 'block';

        state.history.push({ time: ms, mode: state.mode, date: Date.now() });
        state.attempts++;
        if (state.bestTime === null || ms < state.bestTime) {
            state.bestTime = ms;
        }
        saveData();
        updateStats();
        renderHistory();
    }

    function setZone(phase, textKey) {
        const zone = $('#reaction-zone');
        zone.className = 'reaction-zone ' + phase;
        const textEl = document.querySelector(`[data-i18n="${textKey}"]`);
        $('#zone-text').textContent = textEl ? textEl.textContent : textKey;
    }

    function clearSeqState() {
        if (state.seqTimerInterval) {
            clearInterval(state.seqTimerInterval);
            state.seqTimerInterval = null;
        }
        $$('.seq-btn').forEach(b => {
            b.classList.remove('lit', 'correct-flash', 'wrong-flash', 'disabled');
        });
        state.playerIndex = 0;
        state.round = 0;
        state.sequence = [];
        $('#seq-round').textContent = '0';
        const fill = $('#seq-timer-fill');
        if (fill) fill.style.width = '100%';
    }

    function switchMode(mode) {
        state.mode = mode;
        resetGame();

        $$('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));

        const reactionArea = $('#reaction-area');
        const seqArea = $('#sequence-area');

        if (mode === 'sequence') {
            reactionArea.style.display = 'none';
            seqArea.style.display = 'block';
        } else {
            reactionArea.style.display = 'block';
            seqArea.style.display = 'none';
            $('#target-color-display').style.display = mode === 'color' ? 'flex' : 'none';
        }
    }

    function startClassicRound() {
        setZone('waiting', 'reaction.waitForGreen');
        state.phase = 'waiting';

        const delay = 1500 + Math.random() * 4000;
        state.timeoutId = setTimeout(() => {
            state.phase = 'ready';
            state.startTime = performance.now();
            setZone('ready', 'reaction.clickNow');
        }, delay);
    }

    function startColorRound() {
        state.targetColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const chip = $('#target-color-chip');
        chip.style.background = state.targetColor.hex;
        const lang = getLang();
        $('#target-color-name').textContent = lang === 'zh-CN' ? state.targetColor.zh : state.targetColor.en;

        setZone('waiting', 'reaction.waitForTarget');
        state.phase = 'waiting';

        const delay = 1500 + Math.random() * 3500;
        state.timeoutId = setTimeout(() => {
            state.phase = 'ready';
            state.startTime = performance.now();
            $('#reaction-zone').style.background = `linear-gradient(145deg, ${state.targetColor.hex}, ${adjustColor(state.targetColor.hex, -20)})`;
            $('#reaction-zone').classList.add('ready');
            const lang = getLang();
            $('#zone-text').textContent = lang === 'zh-CN' ? '点击!' : 'CLICK!';
        }, delay);
    }

    function adjustColor(hex, amount) {
        const num = parseInt(hex.slice(1), 16);
        const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
        const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function onZoneClick() {
        if (state.mode === 'sequence') return;

        if (state.phase === 'idle') {
            if (state.mode === 'classic') startClassicRound();
            else if (state.mode === 'color') startColorRound();
            return;
        }

        if (state.phase === 'waiting') {
            clearTimeout(state.timeoutId);
            state.timeoutId = null;
            setZone('too-early', 'reaction.tooEarly');
            state.phase = 'tooEarly';
            state.attempts++;
            saveData();
            updateStats();
            setTimeout(() => {
                setZone('idle', 'reaction.clickStart');
                state.phase = 'idle';
            }, 1200);
            return;
        }

        if (state.phase === 'ready') {
            const elapsed = Math.round(performance.now() - state.startTime);
            state.phase = 'result';
            setZone('result', '');
            const lang = getLang();
            $('#zone-text').textContent = formatTime(elapsed) + (lang === 'zh-CN' ? ' 🎯' : ' 🎯');
            showResult(elapsed);
            $('#start-btn').classList.add('hide');
            $('#reset-btn').classList.remove('hide');
        }
    }

    function startSequenceMode() {
        clearSeqState();
        state.round = 0;
        state.sequence = [];
        state.playerIndex = 0;
        $('#result-display').style.display = 'none';
        nextSequenceRound();
    }

    function nextSequenceRound() {
        state.round++;
        $('#seq-round').textContent = state.round;
        state.sequence.push(Math.floor(Math.random() * 9));
        state.playerIndex = 0;
        playSequenceAnimation();
    }

    function playSequenceAnimation() {
        $$('.seq-btn').forEach(b => b.classList.add('disabled'));
        let i = 0;

        function showNext() {
            if (i >= state.sequence.length) {
                $$('.seq-btn').forEach(b => b.classList.remove('disabled'));
                startSeqInputTimer();
                return;
            }
            const idx = state.sequence[i];
            const btn = $(`.seq-btn[data-index="${idx}"]`);
            btn.classList.add('lit');
            setTimeout(() => {
                btn.classList.remove('lit');
                i++;
                setTimeout(showNext, 180);
            }, 450);
        }

        setTimeout(showNext, 400);
    }

    function startSeqInputTimer() {
        state.seqTimerStart = performance.now();
        const fill = $('#seq-timer-fill');
        fill.style.width = '100%';

        state.seqTimerInterval = setInterval(() => {
            const elapsed = performance.now() - state.seqTimerStart;
            const pct = Math.max(0, 100 - (elapsed / state.seqTimerDuration) * 100);
            fill.style.width = pct + '%';

            if (elapsed >= state.seqTimerDuration) {
                clearInterval(state.seqTimerInterval);
                state.seqTimerInterval = null;
                endSequenceRound(true);
            }
        }, 20);
    }

    function handleSeqBtnClick(index) {
        if (state.phase !== 'seqInput') return;
        const btn = $(`.seq-btn[data-index="${index}"]`);

        if (index === state.sequence[state.playerIndex]) {
            btn.classList.add('correct-flash');
            setTimeout(() => btn.classList.remove('correct-flash'), 350);
            state.playerIndex++;

            if (state.playerIndex >= state.sequence.length) {
                clearInterval(state.seqTimerInterval);
                state.seqTimerInterval = null;
                if (state.round >= state.totalRounds) {
                    endSequenceRound(false, true);
                } else {
                    setTimeout(nextSequenceRound, 500);
                }
            }
        } else {
            btn.classList.add('wrong-flash');
            clearInterval(state.seqTimerInterval);
            state.seqTimerInterval = null;
            setTimeout(() => endSequenceRound(true), 450);
        }
    }

    function endSequenceRound(failed, completed) {
        state.phase = 'result';
        $$('.seq-btn').forEach(b => b.classList.add('disabled'));

        if (completed) {
            const totalTime = Math.round(performance.now() - state.seqStartTime);
            const avgTime = Math.round(totalTime / (state.totalRounds * (state.totalRounds + 1) / 2));
            showResult(avgTime);
        } else if (failed) {
            const avgEstimate = 300 + Math.floor(Math.random() * 200);
            showResult(avgEstimate);
        }

        $('#start-btn').classList.add('hide');
        $('#reset-btn').classList.remove('hide');
    }

    function resetGame() {
        if (state.timeoutId) {
            clearTimeout(state.timeoutId);
            state.timeoutId = null;
        }
        clearSeqState();
        state.phase = 'idle';
        $('#result-display').style.display = 'none';
        $('#start-btn').classList.remove('hide');
        $('#reset-btn').classList.add('hide');

        if (state.mode !== 'sequence') {
            setZone('idle', 'reaction.clickStart');
            $('#reaction-zone').style.background = '';
        }
    }

    function init() {
        loadData();
        updateStats();
        renderHistory();

        $$('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => switchMode(btn.dataset.mode));
        });

        $('#reaction-zone').addEventListener('click', onZoneClick);

        $$('.seq-btn').forEach(btn => {
            btn.addEventListener('click', () => handleSeqBtnClick(parseInt(btn.dataset.index)));
        });

        $('#start-btn').addEventListener('click', () => {
            if (state.mode === 'sequence') {
                state.phase = 'seqInput';
                state.seqStartTime = performance.now();
                startSequenceMode();
            } else {
                $('#result-display').style.display = 'none';
                if (state.mode === 'classic') startClassicRound();
                else if (state.mode === 'color') startColorRound();
            }
            $('#start-btn').classList.add('hide');
            $('#reset-btn').classList.remove('hide');
        });

        $('#reset-btn').addEventListener('click', resetGame);

        $('#clear-history').addEventListener('click', () => {
            if (confirm(getLang() === 'zh-CN' ? '确定清空所有历史记录？' : 'Clear all history?')) {
                state.history = [];
                state.bestTime = null;
                state.attempts = 0;
                saveData();
                updateStats();
                renderHistory();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                if (state.mode === 'sequence') return;
                onZoneClick();
            }
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => ReactionGame.init());
