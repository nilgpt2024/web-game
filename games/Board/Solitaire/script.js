const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const SUIT_SYMBOLS = { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' };
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RANK_VALUES = { A: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13 };
const RED_SUITS = ['hearts', 'diamonds'];
const CARD_OFFSET_Y = 26;
const CARD_OFFSET_Y_MOBILE = 20;

class SolitaireGame {
  constructor() {
    this.stock = [];
    this.waste = [];
    this.foundations = [[], [], [], []];
    this.tableau = [[], [], [], [], [], [], []];
    this.moves = 0;
    this.score = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.history = [];
    this.selectedCard = null;
    this.selectedPile = null;
    this.selectedIndex = null;
    this.isDragging = false;
    this.dragCards = [];
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    this.dom = {
      stock: document.getElementById('stock'),
      waste: document.getElementById('waste'),
      tableau: document.getElementById('tableau'),
      timer: document.getElementById('timer'),
      movesEl: document.getElementById('moves'),
      scoreEl: document.getElementById('score'),
      newGameBtn: document.getElementById('newGameBtn'),
      undoBtn: document.getElementById('undoBtn'),
      autoCompleteBtn: document.getElementById('autoCompleteBtn'),
      hintBtn: document.getElementById('hintBtn'),
      winModal: document.getElementById('winModal'),
      finalTime: document.getElementById('finalTime'),
      finalMoves: document.getElementById('finalMoves'),
      finalScore: document.getElementById('finalScore'),
      playAgainBtn: document.getElementById('playAgainBtn')
    };

    this.init();
  }

  init() {
    this.createDeck();
    this.shuffleDeck();
    this.dealCards();
    this.render();
    this.startTimer();
    this.bindEvents();
  }

  createDeck() {
    this.deck = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        this.deck.push({ suit, rank, faceUp: false, id: `${suit}-${rank}` });
      }
    }
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealCards() {
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = this.deck.pop();
        card.faceUp = (row === col);
        this.tableau[col].push(card);
      }
    }
    this.stock = [...this.deck];
    this.deck = [];
  }

  isRed(suit) {
    return RED_SUITS.includes(suit);
  }

  canPlaceOnTableau(card, targetPile) {
    if (targetPile.length === 0) return card.rank === 'K';
    const topCard = targetPile[targetPile.length - 1];
    if (!topCard.faceUp) return false;
    return this.isRed(card.suit) !== this.isRed(topCard.suit) &&
           RANK_VALUES[card.rank] === RANK_VALUES[topCard.rank] - 1;
  }

  canPlaceOnFoundation(card, foundationIndex) {
    const foundation = this.foundations[foundationIndex];
    if (foundation.length === 0) return card.rank === 'A';
    const topCard = foundation[foundation.length - 1];
    return card.suit === topCard.suit &&
           RANK_VALUES[card.rank] === RANK_VALUES[topCard.rank] + 1;
  }

  getFoundationForSuit(suit) {
    if (RED_SUITS.includes(suit)) {
      return suit === 'hearts' ? 0 : 1;
    }
    return suit === 'clubs' ? 2 : 3;
  }

  saveState() {
    this.history.push({
      stock: JSON.parse(JSON.stringify(this.stock)),
      waste: JSON.parse(JSON.stringify(this.waste)),
      foundations: JSON.parse(JSON.stringify(this.foundations)),
      tableau: JSON.parse(JSON.stringify(this.tableau)),
      moves: this.moves,
      score: this.score
    });
    if (this.history.length > 100) this.history.shift();
  }

  undo() {
    if (this.history.length === 0) return;
    const state = this.history.pop();
    this.stock = state.stock;
    this.waste = state.waste;
    this.foundations = state.foundations;
    this.tableau = state.tableau;
    this.moves = state.moves;
    this.score = state.score;
    this.clearSelection();
    this.render();
  }

  clearSelection() {
    this.selectedCard = null;
    this.selectedPile = null;
    this.selectedIndex = null;
    document.querySelectorAll('.card.selected').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.hint-highlight').forEach(el => el.classList.remove('hint-highlight'));
  }

  drawFromStock() {
    this.saveState();
    if (this.stock.length === 0) {
      if (this.waste.length === 0) return;
      this.stock = this.waste.reverse().map(c => ({ ...c, faceUp: false }));
      this.waste = [];
      this.score = Math.max(0, this.score - 20);
    } else {
      const card = this.stock.pop();
      card.faceUp = true;
      this.waste.push(card);
    }
    this.moves++;
    this.updateStats();
    this.render();
  }

  moveCards(cards, fromPile, fromIndex, toPileType, toIndex, toSubIndex) {
    this.saveState();
    let removed = [];

    if (fromPile === 'waste') {
      removed = this.waste.splice(fromIndex, 1);
    } else if (fromPile === 'tableau') {
      removed = this.tableau[fromIndex].splice(fromIndex);
      if (this.tableau[fromIndex].length > 0) {
        const topCard = this.tableau[fromIndex][this.tableau[fromIndex].length - 1];
        if (!topCard.faceUp) {
          topCard.faceUp = true;
          this.score += 5;
        }
      }
    } else if (fromPile === 'foundation') {
      removed = this.foundations[fromIndex].splice(-1, 1);
      this.score -= 15;
    }

    if (toPileType === 'foundation') {
      this.foundations[toIndex].push(...removed);
      this.score += 10;
    } else if (toPileType === 'tableau') {
      this.tableau[toIndex].push(...removed);
    } else if (toPileType === 'waste') {
    }

    this.moves++;
    this.updateStats();
    this.clearSelection();
    this.render();

    setTimeout(() => this.checkWin(), 300);
  }

  tryAutoMoveToFoundation(card, pileType, pileIndex, cardIndex) {
    const foundationIdx = this.getFoundationForSuit(card.suit);
    if (this.canPlaceOnFoundation(card, foundationIdx)) {
      this.moveCards([card], pileType, pileIndex, 'foundation', foundationIdx);
      return true;
    }
    return false;
  }

  handleCardClick(pileType, pileIndex, cardIndex) {
    let card = null;
    if (pileType === 'stock') {
      this.drawFromStock();
      return;
    }
    if (pileType === 'waste') {
      if (this.waste.length === 0) return;
      card = this.waste[this.waste.length - 1];
    } else if (pileType === 'tableau') {
      const pile = this.tableau[pileIndex];
      if (cardIndex >= pile.length || !pile[cardIndex].faceUp) return;
      card = pile[cardIndex];
    } else if (pileType === 'foundation') {
      const pile = this.foundations[pileIndex];
      if (pile.length === 0) return;
      card = pile[pile.length - 1];
      cardIndex = pile.length - 1;
    }

    if (!card) return;

    if (this.selectedCard) {
      if (this.selectedCard.id === card.id && this.selectedPile === pileType && this.selectedIndex === pileIndex) {
        this.clearSelection();
        return;
      }

      const cardsToMove = this.getCardsFromSelection();
      if (this.tryMoveSelected(pileType, pileIndex, cardsToMove)) {
        return;
      }
      this.clearSelection();
    }

    this.selectedCard = card;
    this.selectedPile = pileType;
    this.selectedIndex = pileIndex;
    this.render();
    const cardEl = this.findCardElement(card.id);
    if (cardEl) cardEl.classList.add('selected');

    if (pileType === 'tableau' && card.rank === 'A') {
      this.tryAutoMoveToFoundation(card, pileType, pileIndex, cardIndex);
    }
  }

  getCardsFromSelection() {
    if (!this.selectedCard || !this.selectedPile) return [];
    if (this.selectedPile === 'waste') return [this.selectedCard];
    if (this.selectedPile === 'foundation') return [this.selectedCard];
    if (this.selectedPile === 'tableau') {
      return this.tableau[this.selectedIndex].slice(this.selectedIndex);
    }
    return [];
  }

  tryMoveSelected(targetPileType, targetIndex, cardsToMove) {
    if (cardsToMove.length === 0) return false;
    const firstCard = cardsToMove[0];

    if (targetPileType === 'foundation') {
      if (cardsToMove.length !== 1) return false;
      if (this.canPlaceOnFoundation(firstCard, targetIndex)) {
        this.moveCards(cardsToMove, this.selectedPile, this.selectedIndex, 'foundation', targetIndex);
        return true;
      }
      return false;
    }

    if (targetPileType === 'tableau') {
      if (this.canPlaceOnTableau(firstCard, this.tableau[targetIndex])) {
        this.moveCards(cardsToMove, this.selectedPile, this.selectedIndex, 'tableau', targetIndex);
        return true;
      }
      return false;
    }

    return false;
  }

  findCardElement(cardId) {
    return document.querySelector(`.card[data-id="${cardId}"]`);
  }

  doubleClickCard(pileType, pileIndex, cardIndex) {
    let card = null;
    if (pileType === 'waste') {
      if (this.waste.length === 0) return;
      card = this.waste[this.waste.length - 1];
    } else if (pileType === 'tableau') {
      const pile = this.tableau[pileIndex];
      if (cardIndex >= pile.length || !pile[cardIndex].faceUp) return;
      card = pile[cardIndex];
      if (cardIndex !== pile.length - 1) return;
    } else if (pileType === 'foundation') {
      return;
    }
    if (!card) return;
    this.tryAutoMoveToFoundation(card, pileType, pileIndex, cardIndex);
  }

  checkWin() {
    const totalInFoundations = this.foundations.reduce((sum, f) => sum + f.length, 0);
    if (totalInFoundations === 52) {
      this.stopTimer();
      this.showWinModal();
    }
  }

  autoComplete() {
    let moved = true;
    while (moved) {
      moved = false;

      const wasteTop = this.waste.length > 0 ? this.waste[this.waste.length - 1] : null;
      if (wasteTop && this.tryAutoMoveToFoundation(wasteTop, 'waste', this.waste.length - 1, this.waste.length - 1)) {
        moved = true;
        continue;
      }

      for (let fi = 0; fi < 4; fi++) {
        const f = this.foundations[fi];
        if (f.length === 0) continue;
        const topCard = f[f.length - 1];
        for (let ti = 0; ti < 7; ti++) {
          const t = this.tableau[ti];
          if (t.length === 0) continue;
          const tableauTop = t[t.length - 1];
          if (!tableauTop.faceUp) continue;
          if (this.canPlaceOnTableau(topCard, t) && this.isSafeToMoveFromFoundation(topCard, ti)) {
            this.saveState();
            this.foundations[fi].pop();
            this.score -= 15;
            this.tableau[ti].push(topCard);
            this.moves++;
            this.updateStats();
            this.render();
            moved = true;
            break;
          }
        }
        if (moved) break;
      }

      if (!moved) {
        for (let ti = 0; ti < 7; ti++) {
          const t = this.tableau[ti];
          if (t.length === 0) continue;
          const topCard = t[t.length - 1];
          if (!topCard.faceUp) continue;
          if (this.tryAutoMoveToFoundation(topCard, 'tableau', ti, t.length - 1)) {
            moved = true;
            break;
          }
        }
      }
    }
  }

  isSafeToMoveFromFoundation(card, tableauIndex) {
    const foundationIdx = this.getFoundationForSuit(card.suit);
    const foundation = this.foundations[foundationIdx];
    if (foundation.length === 0) return false;
    const nextRankValue = RANK_VALUES[card.rank] + 1;

    for (let ti = 0; ti < 7; ti++) {
      if (ti === tableauIndex) continue;
      const t = this.tableau[ti];
      for (let ci = 0; ci < t.length; ci++) {
        const c = t[ci];
        if (c.faceUp && c.suit === card.suit && RANK_VALUES[c.rank] >= nextRankValue) {
          return true;
        }
      }
    }

    for (let wi = 0; wi < this.waste.length; wi++) {
      const w = this.waste[wi];
      if (w.suit === card.suit && RANK_VALUES[w.rank] >= nextRankValue) {
        return true;
      }
    }

    return false;
  }

  findHint() {
    this.clearSelection();

    if (this.waste.length > 0) {
      const card = this.waste[this.waste.length - 1];
      for (let fi = 0; fi < 4; fi++) {
        if (this.canPlaceOnFoundation(card, fi)) {
          this.highlightHint('waste', -1, this.waste.length - 1);
          return;
        }
      }
      for (let ti = 0; ti < 7; ti++) {
        if (this.canPlaceOnTableau(card, this.tableau[ti])) {
          this.highlightHint('waste', -1, this.waste.length - 1);
          return;
        }
      }
    }

    for (let ti = 0; ti < 7; ti++) {
      const pile = this.tableau[ti];
      for (let ci = 0; ci < pile.length; ci++) {
        const card = pile[ci];
        if (!card.faceUp) continue;
        for (let fi = 0; fi < 4; fi++) {
          if (ci === pile.length - 1 && this.canPlaceOnFoundation(card, fi)) {
            this.highlightHint('tableau', ti, ci);
            return;
          }
        }
        if (ci > 0) {
          for (let tj = 0; tj < 7; tj++) {
            if (tj === ti) continue;
            if (this.canPlaceOnTableau(card, this.tableau[tj]) && this.isBeneficialMove(ti, ci, tj)) {
              this.highlightHint('tableau', ti, ci);
              return;
            }
          }
        }
      }
    }

    if (this.stock.length > 0) {
      this.dom.stock.classList.add('drop-highlight');
      setTimeout(() => this.dom.stock.classList.remove('drop-highlight'), 1500);
    }
  }

  isBeneficialMove(fromCol, fromCardIdx, toCol) {
    const fromPile = this.tableau[fromCol];
    const toPile = this.tableau[toCol];
    const movingCard = fromPile[fromCardIdx];

    if (toPile.length === 0 && movingCard.rank === 'K' && fromCardIdx > 0) {
      const cardBelow = fromPile[fromCardIdx - 1];
      if (cardBelow.faceUp && cardBelow.rank !== 'K') return true;
    }

    if (toPile.length > 0 && fromCardIdx > 0) {
      const cardBelow = fromPile[fromCardIdx - 1];
      if (!cardBelow.faceUp) return true;
    }

    return false;
  }

  highlightHint(pileType, pileIndex, cardIndex) {
    if (pileType === 'waste') {
      const wasteCards = this.dom.waste.querySelectorAll('.card');
      if (wasteCards.length > 0) {
        wasteCards[wasteCards.length - 1]?.classList.add('hint-highlight');
      }
    } else if (pileType === 'tableau') {
      const pileEl = this.dom.tableau.children[pileIndex];
      const cards = pileEl?.querySelectorAll('.card');
      if (cards && cards[cardIndex]) {
        cards[cardIndex].classList.add('hint-highlight');
      }
    }
  }

  startTimer() {
    this.stopTimer();
    this.timerSeconds = 0;
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      this.dom.timer.textContent = this.formatTime(this.timerSeconds);
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  updateStats() {
    this.dom.movesEl.textContent = this.moves;
    this.dom.scoreEl.textContent = this.score;
  }

  showWinModal() {
    this.dom.finalTime.textContent = this.formatTime(this.timerSeconds);
    this.dom.finalMoves.textContent = this.moves;
    this.dom.finalScore.textContent = this.score;
    this.dom.winModal.classList.add('active');
  }

  newGame() {
    this.stopTimer();
    this.stock = [];
    this.waste = [];
    this.foundations = [[], [], [], []];
    this.tableau = [[], [], [], [], [], [], []];
    this.moves = 0;
    this.score = 0;
    this.timerSeconds = 0;
    this.history = [];
    this.clearSelection();
    this.dom.winModal.classList.remove('active');
    this.createDeck();
    this.shuffleDeck();
    this.dealCards();
    this.render();
    this.startTimer();
    this.updateStats();
  }

  render() {
    this.renderStock();
    this.renderWaste();
    this.renderFoundations();
    this.renderTableau();
  }

  renderStock() {
    const existing = this.dom.stock.querySelectorAll('.card');
    existing.forEach(c => c.remove());
    this.dom.stock.classList.toggle('stock-empty', this.stock.length === 0);

    if (this.stock.length > 0) {
      const cardEl = this.createCardElement(this.stock[this.stock.length - 1], true);
      cardEl.style.position = 'absolute';
      cardEl.style.left = '0';
      cardEl.style.top = '0';
      cardEl.style.cursor = 'pointer';
      this.dom.stock.appendChild(cardEl);
    }
  }

  renderWaste() {
    const existing = this.dom.waste.querySelectorAll('.card');
    existing.forEach(c => c.remove());

    const showCount = Math.min(this.waste.length, 3);
    const startIdx = Math.max(0, this.waste.length - showCount);

    for (let i = startIdx; i < this.waste.length; i++) {
      const card = this.waste[i];
      const cardEl = this.createCardElement(card, false);
      const offset = (i - startIdx) * (window.innerWidth <= 480 ? 14 : 18);
      cardEl.style.position = 'absolute';
      cardEl.style.left = offset + 'px';
      cardEl.style.top = '0';
      cardEl.style.zIndex = i - startIdx;
      if (i === this.waste.length - 1) {
        cardEl.style.cursor = 'pointer';
      }
      this.dom.waste.appendChild(cardEl);
    }
  }

  renderFoundations() {
    for (let i = 0; i < 4; i++) {
      const foundationEl = document.getElementById(`foundation-${i}`);
      const existing = foundationEl.querySelectorAll('.card');
      existing.forEach(c => c.remove());

      const pile = this.foundations[i];
      for (let j = 0; j < pile.length; j++) {
        const card = pile[j];
        const cardEl = this.createCardElement(card, false);
        cardEl.style.position = 'absolute';
        cardEl.style.left = '0';
        cardEl.style.top = '0';
        cardEl.style.zIndex = j;
        if (j === pile.length - 1) {
          cardEl.classList.add('card-to-foundation');
          cardEl.style.cursor = 'pointer';
        }
        foundationEl.appendChild(cardEl);
      }
    }
  }

  renderTableau() {
    const isMobile = window.innerWidth <= 768;
    const offsetY = isMobile ? CARD_OFFSET_Y_MOBILE : CARD_OFFSET_Y;

    for (let col = 0; col < 7; col++) {
      const pileEl = this.dom.tableau.children[col];
      const existing = pileEl.querySelectorAll('.card');
      existing.forEach(c => c.remove());

      const pile = this.tableau[col];
      for (let row = 0; row < pile.length; row++) {
        const card = pile[row];
        const cardEl = this.createCardElement(card, !card.faceUp);
        cardEl.style.position = 'absolute';
        cardEl.style.left = '0';
        cardEl.style.top = (row * offsetY) + 'px';
        cardEl.style.zIndex = row;
        if (card.faceUp) {
          cardEl.style.cursor = 'pointer';
        }
        if (row === 0) {
          cardEl.classList.add('card-deal-animation');
        }
        pileEl.appendChild(cardEl);
      }

      const slot = pileEl.querySelector('.pile-slot');
      if (slot) {
        slot.style.height = (pile.length > 0 ? 110 : 110) + 'px';
      }
    }
  }

  createCardElement(card, faceDown) {
    const el = document.createElement('div');
    el.className = `card ${faceDown ? 'card-face-down' : ''} ${this.isRed(card.suit) ? 'red' : 'black'}`;
    el.dataset.id = card.id;
    el.dataset.suit = card.suit;
    el.dataset.rank = card.rank;

    el.innerHTML = `
      <div class="card-face-front">
        <div class="card-corner card-corner-top">
          <span>${card.rank}</span>
          <span>${SUIT_SYMBOLS[card.suit]}</span>
        </div>
        <div class="card-suit-center">${SUIT_SYMBOLS[card.suit]}</div>
        <div class="card-corner card-corner-bottom">
          <span>${card.rank}</span>
          <span>${SUIT_SYMBOLS[card.suit]}</span>
        </div>
      </div>
      <div class="card-face-back">
        <span class="back-pattern">🃏</span>
      </div>
    `;

    return el;
  }

  bindEvents() {
    this.dom.stock.addEventListener('click', (e) => {
      if (!e.target.closest('.card')) this.drawFromStock();
    });

    this.dom.newGameBtn.addEventListener('click', () => this.newGame());
    this.dom.undoBtn.addEventListener('click', () => this.undo());
    this.dom.autoCompleteBtn.addEventListener('click', () => this.autoComplete());
    this.dom.hintBtn.addEventListener('click', () => this.findHint());
    this.dom.playAgainBtn.addEventListener('click', () => this.newGame());

    document.addEventListener('click', (e) => {
      const cardEl = e.target.closest('.card');
      if (!cardEl) {
        const pileSlot = e.target.closest('.pile-slot');
        if (pileSlot) {
          const stockPile = pileSlot.closest('.stock-pile.stock-empty');
          if (stockPile) this.drawFromStock();
        }
        return;
      }

      if (this.isDragging) return;

      const pileContainer = cardEl.closest('[data-pile]');
      if (!pileContainer) return;

      const pileType = pileContainer.dataset.pile;
      const cardId = cardEl.dataset.id;

      if (pileType === 'stock') {
        this.drawFromStock();
        return;
      }

      if (pileType === 'waste') {
        this.handleCardClick('waste', -1, this.waste.length - 1);
        return;
      }

      if (pileType === 'foundation') {
        const fi = parseInt(pileContainer.id.split('-')[1]);
        this.handleCardClick('foundation', fi, this.foundations[fi].length - 1);
        return;
      }

      if (pileType === 'tableau') {
        const col = parseInt(pileContainer.dataset.column);
        const cards = Array.from(pileContainer.querySelectorAll('.card'));
        const cardIndex = cards.indexOf(cardEl);
        this.handleCardClick('tableau', col, cardIndex);
      }
    });

    document.addEventListener('dblclick', (e) => {
      const cardEl = e.target.closest('.card');
      if (!cardEl || cardEl.classList.contains('card-face-down')) return;
      if (this.isDragging) return;

      const pileContainer = cardEl.closest('[data-pile]');
      if (!pileContainer) return;

      const pileType = pileContainer.dataset.pile;
      if (pileType === 'stock' || pileType === 'foundation') return;

      if (pileType === 'waste') {
        this.doubleClickCard('waste', -1, this.waste.length - 1);
        return;
      }

      if (pileType === 'tableau') {
        const col = parseInt(pileContainer.dataset.column);
        const cards = Array.from(pileContainer.querySelectorAll('.card'));
        const cardIndex = cards.indexOf(cardEl);
        this.doubleClickCard('tableau', col, cardIndex);
      }
    });

    document.addEventListener('mousedown', (e) => {
      const cardEl = e.target.closest('.card');
      if (!cardEl || cardEl.classList.contains('card-face-down')) return;

      const pileContainer = cardEl.closest('[data-pile]');
      if (!pileContainer || pileContainer.dataset.pile === 'stock') return;

      const pileType = pileContainer.dataset.pile;
      if (pileType === 'foundation' && !(e.ctrlKey || e.metaKey)) return;

      this.startDrag(e, cardEl, pileType, pileContainer);
    });

    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const cardEl = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.card');
      if (!cardEl || cardEl.classList.contains('card-face-down')) return;

      const pileContainer = cardEl.closest('[data-pile]');
      if (!pileContainer || pileContainer.dataset.pile === 'stock') return;

      const pileType = pileContainer.dataset.pile;
      if (pileType === 'foundation') return;

      this.startDrag(e, cardEl, pileType, pileContainer, touch);
    }, { passive: false });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      this.onDrag(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      this.onDrag(touch.clientX, touch.clientY);
    }, { passive: false });

    document.addEventListener('mouseup', (e) => {
      if (!this.isDragging) return;
      this.endDrag(e.clientX, e.clientY);
    });

    document.addEventListener('touchend', (e) => {
      if (!this.isDragging) return;
      const touch = e.changedTouches[0];
      this.endDrag(touch.clientX, touch.clientY);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.undo();
      }
      if (e.key === 'Escape') {
        this.clearSelection();
      }
    });
  }

  startDrag(e, cardEl, pileType, pileContainer, pointer = e) {
    const rect = cardEl.getBoundingClientRect();
    this.isDragging = true;
    this.dragStartX = pointer.clientX;
    this.dragStartY = pointer.clientY;
    this.dragOffsetX = pointer.clientX - rect.left;
    this.dragOffsetY = pointer.clientY - rect.top;

    if (pileType === 'waste') {
      this.dragSourcePile = 'waste';
      this.dragSourceIndex = -1;
      this.dragCards = [this.waste[this.waste.length - 1]];
    } else if (pileType === 'tableau') {
      const col = parseInt(pileContainer.dataset.column);
      const cards = Array.from(pileContainer.querySelectorAll('.card'));
      const cardIndex = cards.indexOf(cardEl);
      this.dragSourcePile = 'tableau';
      this.dragSourceIndex = col;
      this.dragCardIndex = cardIndex;
      this.dragCards = this.tableau[col].slice(cardIndex);
    } else if (pileType === 'foundation') {
      const fi = parseInt(pileContainer.id.split('-')[1]);
      this.dragSourcePile = 'foundation';
      this.dragSourceIndex = fi;
      this.dragCards = [this.foundations[fi][this.foundations[fi].length - 1]];
    }

    this.clearSelection();

    if (pileType === 'tableau') {
      const allCards = pileContainer.querySelectorAll('.card');
      for (let i = this.dragCardIndex; i < allCards.length; i++) {
        allCards[i].classList.add('dragging');
      }
    } else {
      cardEl.classList.add('dragging');
    }

    this.setDragPosition(pointer.clientX, pointer.clientY);
  }

  onDrag(x, y) {
    this.setDragPosition(x, y);
    this.highlightDropTarget(x, y);
  }

  setDragPosition(x, y) {
    const draggingCards = document.querySelectorAll('.card.dragging');
    draggingCards.forEach((el, i) => {
      el.style.position = 'fixed';
      el.style.left = (x - this.dragOffsetX) + 'px';
      el.style.top = (y - this.dragOffsetY + i * (window.innerWidth <= 768 ? CARD_OFFSET_Y_MOBILE : CARD_OFFSET_Y)) + 'px';
      el.style.zIndex = 9999 + i;
    });
  }

  highlightDropTarget(x, y) {
    document.querySelectorAll('.drop-highlight').forEach(el => el.classList.remove('drop-highlight'));

    const elemBelow = document.elementFromPoint(x, y);
    if (!elemBelow) return;

    const targetPile = elemBelow.closest('[data-pile]');
    if (!targetPile || this.dragCards.length === 0) return;

    const targetType = targetPile.dataset.pile;
    const firstCard = this.dragCards[0];

    if (targetType === 'foundation' && this.dragCards.length === 1) {
      const fi = parseInt(targetPile.id.split('-')[1]);
      if (this.canPlaceOnFoundation(firstCard, fi)) {
        targetPile.classList.add('drop-highlight');
      }
    } else if (targetType === 'tableau') {
      const col = parseInt(targetPile.dataset.column);
      if (this.canPlaceOnTableau(firstCard, this.tableau[col])) {
        targetPile.classList.add('drop-highlight');
      }
    }
  }

  endDrag(x, y) {
    if (!this.isDragging) return;

    const elemBelow = document.elementFromPoint(x, y);
    let dropped = false;

    if (elemBelow) {
      const targetPile = elemBelow.closest('[data-pile]');
      if (targetPile && this.dragCards.length > 0) {
        const targetType = targetPile.dataset.pile;
        const firstCard = this.dragCards[0];

        if (targetType === 'foundation' && this.dragCards.length === 1) {
          const fi = parseInt(targetPile.id.split('-')[1]);
          if (this.canPlaceOnFoundation(firstCard, fi)) {
            this.moveCards(this.dragCards, this.dragSourcePile, this.dragSourceIndex, 'foundation', fi);
            dropped = true;
          }
        } else if (targetType === 'tableau') {
          const col = parseInt(targetPile.dataset.column);
          if (this.canPlaceOnTableau(firstCard, this.tableau[col])) {
            this.moveCards(this.dragCards, this.dragSourcePile, this.dragSourceIndex, 'tableau', col);
            dropped = true;
          }
        }
      }
    }

    document.querySelectorAll('.drop-highlight').forEach(el => el.classList.remove('drop-highlight'));
    document.querySelectorAll('.card.dragging').forEach(el => el.classList.remove('dragging'));

    this.isDragging = false;
    this.dragCards = [];
    this.dragSourcePile = null;
    this.dragSourceIndex = null;

    if (!dropped) {
      this.render();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.solitaireGame = new SolitaireGame();
});
