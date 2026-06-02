class RhythmGame {
    constructor() {
        this.audioContext = null;
        this.gameState = 'menu';
        this.currentSong = null;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.perfectCount = 0;
        this.goodCount = 0;
        this.missCount = 0;
        this.totalNotes = 0;
        this.hitNotes = 0;
        this.notes = [];
        this.noteIndex = 0;
        this.gameTime = 0;
        this.songDuration = 0;
        this.animationFrame = null;
        this.lastTimestamp = 0;
        this.pressedKeys = new Set();
        
        this.tracks = document.querySelectorAll('.track');
        this.hitZones = document.querySelectorAll('.hit-zone');
        this.trackContainer = document.querySelector('.track-container');
        
        this.songs = {
            easy: {
                name: '轻松节拍',
                bpm: 100,
                duration: 30000,
                patterns: this.generateEasyPattern()
            },
            normal: {
                name: '动感旋律',
                bpm: 130,
                duration: 35000,
                patterns: this.generateNormalPattern()
            },
            hard: {
                name: '极速狂飙',
                bpm: 160,
                duration: 40000,
                patterns: this.generateHardPattern()
            },
            extreme: {
                name: '地狱模式',
                bpm: 200,
                duration: 45000,
                patterns: this.generateExtremePattern()
            }
        };

        this.keyMap = {
            'd': 0, 'D': 0, 'ArrowLeft': 0,
            'f': 1, 'F': 1, 'ArrowRight': 1,
            'j': 2, 'J': 2, 'ArrowUp': 2,
            'k': 3, 'K': 3, 'ArrowDown': 3
        };

        this.initAudio();
        this.bindEvents();
        this.setupTouchControls();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported, using visual feedback only');
        }
    }

    playHitSound(type) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        if (type === 'perfect') {
            oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
        } else if (type === 'good') {
            oscillator.frequency.setValueAtTime(660, this.audioContext.currentTime);
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.25, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.12);
        } else if (type === 'miss') {
            oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        }

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    generateEasyPattern() {
        const pattern = [];
        const beatInterval = 60000 / 100;
        for (let i = 0; i < 50; i++) {
            if (Math.random() > 0.3) {
                pattern.push({
                    time: i * beatInterval + Math.random() * beatInterval * 0.5,
                    track: Math.floor(Math.random() * 4)
                });
            }
        }
        return pattern.sort((a, b) => a.time - b.time);
    }

    generateNormalPattern() {
        const pattern = [];
        const beatInterval = 60000 / 130;
        for (let i = 0; i < 70; i++) {
            if (Math.random() > 0.25) {
                pattern.push({
                    time: i * beatInterval * 0.8 + Math.random() * beatInterval * 0.4,
                    track: Math.floor(Math.random() * 4)
                });
            }
        }
        return pattern.sort((a, b) => a.time - b.time);
    }

    generateHardPattern() {
        const pattern = [];
        const beatInterval = 60000 / 160;
        for (let i = 0; i < 100; i++) {
            if (Math.random() > 0.15) {
                pattern.push({
                    time: i * beatInterval * 0.6 + Math.random() * beatInterval * 0.3,
                    track: Math.floor(Math.random() * 4)
                });
            }
        }
        return pattern.sort((a, b) => a.time - b.time);
    }

    generateExtremePattern() {
        const pattern = [];
        const beatInterval = 60000 / 200;
        for (let i = 0; i < 140; i++) {
            if (Math.random() > 0.1) {
                pattern.push({
                    time: i * beatInterval * 0.5 + Math.random() * beatInterval * 0.25,
                    track: Math.floor(Math.random() * 4)
                });
            }
        }
        return pattern.sort((a, b) => a.time - b.time);
    }

    bindEvents() {
        document.querySelectorAll('.song-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const songId = btn.dataset.song;
                this.startGame(songId);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (this.gameState !== 'playing') return;
            
            const key = e.key;
            if (this.keyMap.hasOwnProperty(key) && !this.pressedKeys.has(key)) {
                this.pressedKeys.add(key);
                const track = this.keyMap[key];
                this.handleKeyPress(track);
                this.animateHitZone(track);
            }

            if (key === 'Escape' || key === ' ') {
                e.preventDefault();
                this.togglePause();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.pressedKeys.delete(e.key);
            const key = e.key;
            if (this.keyMap.hasOwnProperty(key)) {
                const track = this.keyMap[key];
                this.resetHitZone(track);
            }
        });

        document.getElementById('pause-btn').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            if (this.currentSong) {
                this.startGame(this.currentSong);
            }
        });

        document.getElementById('menu-btn').addEventListener('click', () => {
            this.showMenu();
        });
    }

    setupTouchControls() {
        if ('ontouchstart' in window) {
            const overlay = document.createElement('div');
            overlay.className = 'touch-overlay';
            overlay.innerHTML = `
                <div class="touch-zone" data-track="0"></div>
                <div class="touch-zone" data-track="1"></div>
                <div class="touch-zone" data-track="2"></div>
                <div class="touch-zone" data-track="3"></div>
            `;
            document.body.appendChild(overlay);

            overlay.querySelectorAll('.touch-zone').forEach(zone => {
                zone.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    if (this.gameState === 'playing') {
                        const track = parseInt(zone.dataset.track);
                        this.handleKeyPress(track);
                        this.animateHitZone(track);
                        setTimeout(() => this.resetHitZone(track), 100);
                    }
                });
            });
        }
    }

    startGame(songId) {
        this.currentSong = songId;
        const song = this.songs[songId];
        
        this.resetGameStats();
        this.notes = [...song.patterns];
        this.totalNotes = this.notes.length;
        this.songDuration = song.duration;
        this.noteIndex = 0;
        this.gameTime = 0;
        this.lastTimestamp = 0;

        document.getElementById('menu-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';

        this.gameState = 'playing';
        this.gameLoop(0);

        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    resetGameStats() {
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.perfectCount = 0;
        this.goodCount = 0;
        this.missCount = 0;
        this.hitNotes = 0;
        this.updateUI();
        this.clearAllNotes();
    }

    gameLoop(timestamp) {
        if (this.gameState !== 'playing') return;

        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        this.gameTime += deltaTime;

        this.spawnNotes();
        this.updateNotes(deltaTime);
        this.checkMissedNotes();
        this.updateProgress();

        if (this.gameTime >= this.songDuration && this.notes.filter(n => n.element).length === 0) {
            this.endGame();
            return;
        }

        this.animationFrame = requestAnimationFrame((t) => this.gameLoop(t));
    }

    spawnNotes() {
        const spawnAhead = 2000;
        while (this.noteIndex < this.notes.length && 
               this.notes[this.noteIndex].time <= this.gameTime + spawnAhead) {
            const noteData = this.notes[this.noteIndex];
            this.createNoteElement(noteData);
            this.noteIndex++;
        }
    }

    createNoteElement(noteData) {
        const note = document.createElement('div');
        note.className = `note ${Math.random() > 0.7 ? 'good-note' : 'perfect-note'}`;
        note.dataset.track = noteData.track;
        note.dataset.time = noteData.time;
        
        const fallDuration = 2000;
        note.style.animationDuration = `${fallDuration}ms`;
        
        this.tracks[noteData.track].appendChild(note);
        noteData.element = note;
        noteData.spawned = true;
    }

    updateNotes(deltaTime) {
        this.notes.forEach(noteData => {
            if (noteData.element && noteData.spawned) {
                noteData.elapsedTime = (noteData.elapsedTime || 0) + deltaTime;
            }
        });
    }

    checkMissedNotes() {
        const hitZoneY = this.getHitZonePosition();
        
        this.notes.forEach((noteData, index) => {
            if (noteData.element && noteData.spawned && !noteData.hit && !noteData.missed) {
                const noteRect = noteData.element.getBoundingClientRect();
                const trackRect = this.tracks[noteData.track].getBoundingClientRect();
                
                if (noteRect.top > trackRect.bottom) {
                    this.handleMiss(noteData);
                }
            }
        });
    }

    getHitZonePosition() {
        const hitZone = this.hitZones[0];
        const rect = hitZone.getBoundingClientRect();
        const containerRect = this.trackContainer.getBoundingClientRect();
        return rect.top - containerRect.top + rect.height / 2;
    }

    handleKeyPress(track) {
        if (this.gameState !== 'playing') return;

        const tolerance = { perfect: 50, good: 120 };
        let bestNote = null;
        let bestDiff = Infinity;
        let judgment = null;

        this.notes.forEach(noteData => {
            if (noteData.element && noteData.spawned && !noteData.hit && !noteData.missed && 
                parseInt(noteData.element.dataset.track) === track) {
                
                const noteRect = noteData.element.getBoundingClientRect();
                const hitZoneRect = this.hitZones[track].getBoundingClientRect();
                const diff = Math.abs(noteRect.top + noteRect.height / 2 - hitZoneRect.top - hitZoneRect.height / 2);

                if (diff < tolerance.good && diff < bestDiff) {
                    bestDiff = diff;
                    bestNote = noteData;
                    judgment = diff <= tolerance.perfect ? 'perfect' : 'good';
                }
            }
        });

        if (bestNote && judgment) {
            this.handleHit(bestNote, judgment);
        }
    }

    handleHit(noteData, judgment) {
        noteData.hit = true;
        noteData.element.remove();
        delete noteData.element;

        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
        this.hitNotes++;

        let points = 0;
        if (judgment === 'perfect') {
            this.perfectCount++;
            points = 100 * this.getComboMultiplier();
        } else {
            this.goodCount++;
            points = 50 * this.getComboMultiplier();
        }

        this.score += Math.floor(points);
        this.playHitSound(judgment);
        this.showJudgment(judgment);
        this.createHitEffect(noteData.track, judgment);
        this.showComboBurst();
        this.updateUI();
    }

    handleMiss(noteData) {
        noteData.missed = true;
        noteData.element.remove();
        delete noteData.element;

        this.missCount++;
        this.combo = 0;
        this.playHitSound('miss');
        this.showJudgment('miss');
        this.updateUI();
    }

    getComboMultiplier() {
        if (this.combo >= 50) return 3.0;
        if (this.combo >= 30) return 2.5;
        if (this.combo >= 20) return 2.0;
        if (this.combo >= 10) return 1.5;
        return 1.0;
    }

    showJudgment(type) {
        const display = document.getElementById('judgment-display');
        display.textContent = type.toUpperCase();
        display.className = `judgment-${type}`;
        
        void display.offsetWidth;
        display.style.animation = 'none';
        void display.offsetWidth;
        display.style.animation = 'judgmentPop 0.5s ease-out forwards';

        setTimeout(() => {
            display.textContent = '';
            display.className = '';
        }, 500);
    }

    createHitEffect(track, type) {
        const container = document.getElementById('effects-container');
        const effect = document.createElement('div');
        effect.className = `hit-effect ${type}`;
        
        const trackRect = this.tracks[track].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        effect.style.left = `${trackRect.left + trackRect.width / 2 - containerRect.left}px`;
        effect.style.top = `${trackRect.bottom - 50 - containerRect.top}px`;
        
        container.appendChild(effect);
        
        setTimeout(() => effect.remove(), 400);
    }

    showComboBurst() {
        if (this.combo > 0 && this.combo % 10 === 0) {
            const container = document.getElementById('effects-container');
            const burst = document.createElement('div');
            burst.className = 'combo-burst';
            burst.textContent = `${this.combo} COMBO!`;
            burst.style.left = '50%';
            burst.style.top = '40%';
            burst.style.transform = 'translateX(-50%)';
            
            container.appendChild(burst);
            
            setTimeout(() => burst.remove(), 800);
        }
    }

    animateHitZone(track) {
        this.hitZones[track].classList.add('active');
    }

    resetHitZone(track) {
        this.hitZones[track].classList.remove('active');
    }

    updateUI() {
        document.getElementById('score').textContent = this.score.toLocaleString();
        document.getElementById('combo').textContent = this.combo;
        
        const multiplier = this.getComboMultiplier();
        const multiplierEl = document.getElementById('combo-multiplier');
        multiplierEl.textContent = multiplier > 1 ? ` (${multiplier}x)` : '';

        const accuracy = this.totalNotes > 0 ? ((this.hitNotes / this.totalNotes) * 100).toFixed(1) : 100;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
    }

    updateProgress() {
        const progress = Math.min((this.gameTime / this.songDuration) * 100, 100);
        document.getElementById('progress-fill').style.width = `${progress}%`;
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            cancelAnimationFrame(this.animationFrame);
            document.getElementById('pause-btn').textContent = '▶ 继续';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.lastTimestamp = 0;
            document.getElementById('pause-btn').textContent = '⏸ 暂停';
            this.gameLoop(0);
        }
    }

    endGame() {
        this.gameState = 'ended';
        cancelAnimationFrame(this.animationFrame);

        const accuracy = this.totalNotes > 0 ? ((this.hitNotes / this.totalNotes) * 100) : 0;
        const grade = this.calculateGrade(accuracy);

        document.getElementById('final-score').textContent = this.score.toLocaleString();
        document.getElementById('max-combo').textContent = this.maxCombo;
        document.getElementById('perfect-count').textContent = this.perfectCount;
        document.getElementById('good-count').textContent = this.goodCount;
        document.getElementById('miss-count').textContent = this.missCount;
        document.getElementById('final-accuracy').textContent = `${accuracy.toFixed(1)}%`;

        const gradeEl = document.getElementById('result-grade');
        gradeEl.textContent = grade.letter;
        gradeEl.className = `result-grade grade-${grade.letter.toLowerCase()}`;

        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'flex';
    }

    calculateGrade(accuracy) {
        if (accuracy >= 95 && this.missCount === 0) return { letter: 'S' };
        if (accuracy >= 90) return { letter: 'A' };
        if (accuracy >= 80) return { letter: 'B' };
        if (accuracy >= 70) return { letter: 'C' };
        return { letter: 'D' };
    }

    showMenu() {
        this.gameState = 'menu';
        cancelAnimationFrame(this.animationFrame);
        this.clearAllNotes();
        
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'none';
        document.getElementById('menu-screen').style.display = 'flex';
        document.getElementById('pause-btn').textContent = '⏸ 暂停';
    }

    clearAllNotes() {
        document.querySelectorAll('.note').forEach(note => note.remove());
        document.getElementById('effects-container').innerHTML = '';
        document.getElementById('judgment-display').textContent = '';
    }
}

if (typeof GameI18n !== 'undefined') {
    const gameI18n = new GameI18n();
    gameI18n.init();
}

document.addEventListener('DOMContentLoaded', () => {
    window.rhythmGame = new RhythmGame();
});
