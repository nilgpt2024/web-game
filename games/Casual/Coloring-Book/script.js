(function () {
  'use strict';

  const CANVAS_SIZE = 500;
  const PREVIEW_SIZE = 48;
  const MAX_HISTORY = 30;

  let mainCanvas, lineCanvas, mainCtx, lineCtx;
  let currentTool = 'fill';
  let currentColor = '#0d9488';
  let brushSize = 8;
  let isDrawing = false;
  let lastX = 0, lastY = 0;
  let historyStack = [];
  let currentPattern = 'cat';

  const patternDefinitions = {
    cat: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.arc(0, 10, 70, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-55, -40); ctx.lineTo(-35, -75); ctx.lineTo(-15, -45);
      ctx.moveTo(55, -40); ctx.lineTo(35, -75); ctx.lineTo(15, -45);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-25, 0, 10, 0, Math.PI * 2);
      ctx.arc(25, 0, 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-25, 0, 4, 0, Math.PI * 2);
      ctx.arc(25, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 12); ctx.lineTo(-6, 24); ctx.lineTo(6, 24); ctx.closePath();
      ctx.fillStyle = '#f97316';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, 32); ctx.quadraticCurveTo(0, 42, 18, 32);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-20, 50); ctx.lineTo(-15, 62);
      ctx.moveTo(20, 50); ctx.lineTo(15, 62);
      ctx.stroke();

      ctx.restore();
    },

    dog: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.ellipse(0, 10, 60, 68, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(-52, 5, 22, 38, -0.2, 0, Math.PI * 2);
      ctx.ellipse(52, 5, 22, 38, 0.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-22, 0, 11, 0, Math.PI * 2);
      ctx.arc(22, 0, 11, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-22, 0, 5, 0, Math.PI * 2);
      ctx.arc(22, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, 22, 14, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 28); ctx.lineTo(-8, 44); ctx.lineTo(8, 44); ctx.closePath();
      ctx.fillStyle = '#f97316';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -20, 18, 0.1, Math.PI - 0.1);
      ctx.stroke();
      ctx.restore();
    },

    butterfly: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2.5 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.ellipse(-48, -10, 42, 52, -0.3, 0, Math.PI * 2);
      ctx.ellipse(48, -10, 42, 52, 0.3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(-30, 42, 24, 30, -0.2, 0, Math.PI * 2);
      ctx.ellipse(30, 42, 24, 30, 0.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(-48, -10, 20, 26, -0.3, 0, Math.PI * 2);
      ctx.ellipse(48, -10, 20, 26, 0.3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -60); ctx.lineTo(0, 65);
      ctx.lineWidth = 4 / scale;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-4, -56); ctx.lineTo(-14, -74); ctx.lineTo(-4, -64);
      ctx.moveTo(4, -56); ctx.lineTo(14, -74); ctx.lineTo(4, -64);
      ctx.lineWidth = 2.5 / scale;
      ctx.stroke();
      ctx.restore();
    },

    fish: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.ellipse(0, 0, 65, 42, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-58, 0); ctx.lineTo(-90, -30); ctx.lineTo(-85, 0); ctx.lineTo(-90, 30); ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-10, -38); ctx.quadraticCurveTo(5, -68, 20, -42);
      ctx.moveTo(10, 38); ctx.quadraticCurveTo(-5, 60, -8, 40);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(30, -6, 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(33, -6, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(54, -4); ctx.lineTo(66, -2); ctx.lineTo(54, 4);
      ctx.stroke();

      for (let i = -30; i < 35; i += 14) {
        ctx.beginPath();
        ctx.arc(i, 0, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#333';
        ctx.fill();
      }
      ctx.restore();
    },

    house: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2 + 10);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.rect(-60, -20, 120, 100);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-72, -20); ctx.lineTo(0, -95); ctx.lineTo(72, -20);
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(-20, 25, 28, 40);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-6, 46, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.fillRect(-6, 47, 3, 10);

      ctx.beginPath();
      ctx.rect(-50, -5, 22, 22);
      ctx.rect(28, -5, 22, 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-39, -5); ctx.lineTo(-39, 17);
      ctx.moveTo(-50, 6); ctx.lineTo(-28, 6);
      ctx.moveTo(39, -5); ctx.lineTo(39, 17);
      ctx.moveTo(28, 6); ctx.lineTo(50, 6);
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(-8, -55, 16, 20);
      ctx.stroke();
      for (let i = -4; i < 6; i += 4) {
        ctx.beginPath(); ctx.moveTo(-8, -51 + i); ctx.lineTo(8, -51 + i); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(i, -55); ctx.lineTo(i, -35); ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(-30, 80); ctx.lineTo(-30, 105); ctx.lineTo(30, 105); ctx.lineTo(30, 80);
      ctx.stroke();
      ctx.restore();
    },

    tree: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2 + 20);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.fillStyle = '#a16207';
      ctx.fillRect(-14, 20, 28, 65);
      ctx.strokeRect(-14, 20, 28, 65);

      ctx.beginPath();
      ctx.moveTo(0, -82); ctx.lineTo(-65, -10); ctx.lineTo(65, -10); ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -50); ctx.lineTo(-55, 10); ctx.lineTo(55, 10); ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -18); ctx.lineTo(-42, 36); ctx.lineTo(42, 36); ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(-20, 42, 7, 0, Math.PI * 2);
      ctx.arc(18, 50, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    },

    sun: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        const innerR = 52;
        const outerR = 72;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
        ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
        ctx.stroke();

        if (i % 2 === 0) {
          const a1 = angle - 0.12;
          const a2 = angle + 0.12;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
          ctx.lineTo(Math.cos(angle) * (outerR + 10), Math.sin(angle) * (outerR + 10));
          ctx.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(-14, -10, 6, 0, Math.PI * 2);
      ctx.arc(14, -10, 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-14, -10, 3, 0, Math.PI * 2);
      ctx.arc(14, -10, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 10, 16, 0, Math.PI);
      ctx.stroke();
      ctx.restore();
    },

    flower: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2.5 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 - Math.PI / 2;
        ctx.save();
        ctx.translate(Math.cos(angle) * 32, Math.sin(angle) * 32);
        ctx.rotate(angle + Math.PI / 2);
        ctx.beginPath();
        ctx.ellipse(0, 12, 16, 26, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.stroke();

      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * 9, Math.sin(angle) * 9, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#333';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(0, 20); ctx.lineTo(0, 85);
      ctx.lineWidth = 3 / scale;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 40); ctx.lineTo(-18, 30);
      ctx.moveTo(0, 58); ctx.lineTo(18, 50);
      ctx.moveTo(0, 75); ctx.lineTo(-14, 68);
      ctx.lineWidth = 2.5 / scale;
      ctx.stroke();
      ctx.restore();
    },

    star: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAngle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const innerAngle = outerAngle + Math.PI / 5;
        const outerR = 70;
        const innerR = 28;
        if (i === 0) {
          ctx.moveTo(Math.cos(outerAngle) * outerR, Math.sin(outerAngle) * outerR);
        } else {
          ctx.lineTo(Math.cos(outerAngle) * outerR, Math.sin(outerAngle) * outerR);
        }
        ctx.lineTo(Math.cos(innerAngle) * innerR, Math.sin(innerAngle) * innerR);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-12, -8, 5, 0, Math.PI * 2);
      ctx.arc(12, -8, 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-12, -8, 2, 0, Math.PI * 2);
      ctx.arc(12, -8, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 8, 8, 0, Math.PI);
      ctx.stroke();
      ctx.restore();
    },

    heart: function (ctx, w, h, scale) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.bezierCurveTo(-50, -10, -50, -50, 0, -15);
      ctx.bezierCurveTo(50, -50, 50, -10, 0, 30);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-18, -18, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f97316';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-10, -8); ctx.quadraticCurveTo(0, 2, 10, -8);
      ctx.stroke();
      ctx.restore();
    }
  };

  function drawPattern(ctx, patternName, width, height) {
    ctx.clearRect(0, 0, width, height);
    if (patternDefinitions[patternName]) {
      const minDim = Math.min(width, height);
      const scale = minDim / 180;
      patternDefinitions[patternName](ctx, width, height, scale);
    }
  }

  function saveState() {
    if (historyStack.length >= MAX_HISTORY) {
      historyStack.shift();
    }
    historyStack.push(mainCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE));
  }

  function undo() {
    if (historyStack.length > 0) {
      const state = historyStack.pop();
      mainCtx.putImageData(state, 0, 0);
    } else {
      mainCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }

  function clearCanvas() {
    saveState();
    mainCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

  function floodFill(startX, startY, fillColor) {
    const imageData = mainCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const data = imageData.data;
    const startPos = (Math.floor(startY) * CANVAS_SIZE + Math.floor(startX)) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    const startA = data[startPos + 3];

    const fillRGB = hexToRgb(fillColor);
    if (!fillRGB) return;

    if (
      startR === fillRGB.r &&
      startG === fillRGB.g &&
      startB === fillRGB.b &&
      startA === 255
    ) {
      return;
    }

    const tolerance = 32;
    const stack = [[Math.floor(startX), Math.floor(startY)]];
    const visited = new Uint8Array(CANVAS_SIZE * CANVAS_SIZE);

    function colorMatch(pos) {
      return (
        Math.abs(data[pos] - startR) <= tolerance &&
        Math.abs(data[pos + 1] - startG) <= tolerance &&
        Math.abs(data[pos + 2] - startB) <= tolerance &&
        Math.abs(data[pos + 3] - startA) <= tolerance
      );
    }

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= CANVAS_SIZE || y < 0 || y >= CANVAS_SIZE) continue;

      const idx = y * CANVAS_SIZE + x;
      if (visited[idx]) continue;

      const pos = idx * 4;
      if (!colorMatch(pos)) continue;

      visited[idx] = 1;
      data[pos] = fillRGB.r;
      data[pos + 1] = fillRGB.g;
      data[pos + 2] = fillRGB.b;
      data[pos + 3] = 255;

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    mainCtx.putImageData(imageData, 0, 0);
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function getCanvasCoords(e) {
    const rect = mainCanvas.getBoundingClientRect();
    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function handlePointerDown(e) {
    e.preventDefault();
    isDrawing = true;
    const coords = getCanvasCoords(e);
    lastX = coords.x;
    lastY = coords.y;

    if (currentTool === 'fill') {
      saveState();
      floodFill(coords.x, coords.y, currentColor);
    } else if (currentTool === 'brush' || currentTool === 'eraser') {
      saveState();
      mainCtx.beginPath();
      mainCtx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);
      if (currentTool === 'eraser') {
        mainCtx.globalCompositeOperation = 'destination-out';
      } else {
        mainCtx.globalCompositeOperation = 'source-over';
        mainCtx.fillStyle = currentColor;
      }
      mainCtx.fill();
    }
  }

  function handlePointerMove(e) {
    if (!isDrawing) return;
    if (currentTool !== 'brush' && currentTool !== 'eraser') return;
    e.preventDefault();

    const coords = getCanvasCoords(e);
    mainCtx.beginPath();
    mainCtx.moveTo(lastX, lastY);
    mainCtx.lineTo(coords.x, coords.y);
    mainCtx.lineWidth = brushSize;
    mainCtx.lineCap = 'round';
    mainCtx.lineJoin = 'round';
    if (currentTool === 'eraser') {
      mainCtx.globalCompositeOperation = 'destination-out';
      mainCtx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      mainCtx.globalCompositeOperation = 'source-over';
      mainCtx.strokeStyle = currentColor;
    }
    mainCtx.stroke();
    lastX = coords.x;
    lastY = coords.y;
  }

  function handlePointerUp() {
    if (isDrawing) {
      isDrawing = false;
      mainCtx.globalCompositeOperation = 'source-over';
    }
  }

  function saveImage() {
    const mergeCanvas = document.createElement('canvas');
    mergeCanvas.width = CANVAS_SIZE;
    mergeCanvas.height = CANVAS_SIZE;
    const mergeCtx = mergeCanvas.getContext('2d');
    mergeCtx.fillStyle = '#ffffff';
    mergeCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    mergeCtx.drawImage(lineCanvas, 0, 0);
    mergeCtx.drawImage(mainCanvas, 0, 0);

    const link = document.createElement('a');
    link.download = `coloring-book-${currentPattern}-${Date.now()}.png`;
    link.href = mergeCanvas.toDataURL('image/png');
    link.click();
  }

  function selectPattern(patternName) {
    currentPattern = patternName;
    document.querySelectorAll('.pattern-card').forEach(function (card) {
      card.classList.toggle('active', card.dataset.pattern === patternName);
    });
    drawPattern(lineCtx, patternName, CANVAS_SIZE, CANVAS_SIZE);
    mainCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    historyStack = [];
  }

  function selectColor(color) {
    currentColor = color;
    document.querySelectorAll('.color-swatch').forEach(function (swatch) {
      swatch.classList.toggle('active', swatch.dataset.color === color);
    });
    document.getElementById('current-color-box').style.background = color;
    document.getElementById('current-color-code').textContent = color;
  }

  function selectTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.tool-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tool === tool);
    });
    document.getElementById('brush-size-group').style.display =
      (tool === 'brush' || tool === 'eraser') ? 'flex' : 'none';
    document.querySelector('.canvas-frame').dataset.tool = tool;
  }

  function generatePreviews() {
    Object.keys(patternDefinitions).forEach(function (name) {
      const container = document.getElementById('preview-' + name);
      if (!container) return;
      const previewCanvas = document.createElement('canvas');
      previewCanvas.width = PREVIEW_SIZE;
      previewCanvas.height = PREVIEW_SIZE;
      const pCtx = previewCanvas.getContext('2d');
      drawPattern(pCtx, name, PREVIEW_SIZE, PREVIEW_SIZE);
      container.appendChild(previewCanvas);
    });
  }

  function init() {
    mainCanvas = document.getElementById('main-canvas');
    lineCanvas = document.getElementById('line-canvas');
    mainCtx = mainCanvas.getContext('2d');
    lineCtx = lineCanvas.getContext('2d');

    drawPattern(lineCtx, currentPattern, CANVAS_SIZE, CANVAS_SIZE);
    generatePreviews();

    document.querySelectorAll('.pattern-card').forEach(function (card) {
      card.addEventListener('click', function () {
        selectPattern(card.dataset.pattern);
      });
    });

    document.querySelectorAll('.color-swatch').forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        selectColor(swatch.dataset.color);
      });
    });

    var customColorInput = document.getElementById('custom-color');
    customColorInput.addEventListener('input', function () {
      selectColor(this.value);
    });

    document.querySelectorAll('.tool-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectTool(btn.dataset.tool);
      });
    });

    var brushSizeInput = document.getElementById('brush-size');
    var brushSizeValue = document.getElementById('brush-size-value');
    brushSizeInput.addEventListener('input', function () {
      brushSize = parseInt(this.value, 10);
      brushSizeValue.textContent = brushSize + 'px';
    });

    mainCanvas.addEventListener('mousedown', handlePointerDown);
    mainCanvas.addEventListener('mousemove', handlePointerMove);
    mainCanvas.addEventListener('mouseup', handlePointerUp);
    mainCanvas.addEventListener('mouseleave', handlePointerUp);

    mainCanvas.addEventListener('touchstart', handlePointerDown, { passive: false });
    mainCanvas.addEventListener('touchmove', handlePointerMove, { passive: false });
    mainCanvas.addEventListener('touchend', handlePointerUp);
    mainCanvas.addEventListener('touchcancel', handlePointerUp);

    document.getElementById('btn-undo').addEventListener('click', undo);
    document.getElementById('btn-clear').addEventListener('click', clearCanvas);
    document.getElementById('btn-save').addEventListener('click', saveImage);

    selectTool('fill');
    selectColor('#0d9488');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
