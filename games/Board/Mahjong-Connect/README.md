# Mahjong Connect - 麻将连连看

A classic Mahjong Connect puzzle game with 3D tile effects, path visualization, and smooth animations.

## Features

- **3D Tile Design** - CSS 3D transforms create realistic mahjong tiles with depth, shadows, and highlights
- **Path Detection** - Connect matching tiles with paths that have at most **2 turns** (0-turn straight line, 1-turn L-shape, 2-turn Z/U-shape)
- **Visual Path Drawing** - Canvas-based connection line display with glowing effect
- **Hint System** - Highlights a valid matching pair when you're stuck
- **Shuffle** - Rearrange remaining tiles to find new matches
- **Timer & Statistics** - Track time, remaining tiles, matches, and best score
- **Elimination Animation** - Scaledown + fadeout + 3D rotation effect
- **Responsive Design** - Adapts to different screen sizes
- **Internationalization** - Built-in i18n support (zh-CN / en)

## How to Play

1. Click a tile to select it (highlighted in amber/gold)
2. Click another tile of the same type
3. If the two tiles can be connected by a path with at most 2 turns, they are eliminated
4. Clear all tiles to win!

## Controls

| Button | Action |
|--------|--------|
| Hint | Find and highlight a valid pair |
| Shuffle | Randomize remaining tiles |
| New Game | Restart from scratch |

## Tile Types

The game uses 36 unique Unicode mahjong tile symbols across 6 suits:

- **Wan (万子)** 🀇-🀏 - Characters suit, golden theme
- **Tiao (条子)** 🀐-🀘 - Bamboo suit, green theme
- **Tong (筒子)** 🀙-🀡 - Circles suit, red theme
- **Honor (字牌)** 🀀-🀆 - Winds & Dragons, blue theme
- **Flower (花牌)** 🀢🀣 - Bonus tiles, purple theme

## Technical Details

- **Board Size**: 8 rows x 12 columns = 72 tiles (36 pairs)
- **Path Algorithm**: BFS-based connection check supporting boundary routing
- **3D Effect**: CSS `perspective`, `transform-style: preserve-3d`, `translateZ`
- **Line Rendering**: HTML5 Canvas with shadow glow effects
- **Best Time**: Persisted via `localStorage`

## File Structure

```
Mahjong-Connect/
├── index.html    # Main page with i18n data attributes
├── style.css     # 3D tile styles, animations, responsive layout
├── script.js     # Game logic, pathfinding, UI interactions
└── README.md     # This file
```