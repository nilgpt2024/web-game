# Aegis Florae: UI & UX Specification

---

## 1. UX Design Philosophy

The user interface of **Aegis Florae** bridges the minimalist grid-clarity of **Robo Defense** with the tactile, cinematic weight of **Dota 2**.

```
+---------------------------------------------------------------------------------------+
|                                    CORE UX PILLARS                                    |
+---------------------------------------------------------------------------------------+
| 1. INSTANT INFORMATION READABILITY | High-contrast health pips, color-coded damage    |
|                                    | numbers, and an omnipresent pathflow line.       |
| 2. KINETIC BUTTON FEEL             | Tactile bevels, metallic clunks, active glows,   |
|                                    | and smooth hover transitions.                    |
| 3. ZERO-FRUSTRATION MAZING         | Real-time path validation with clear visual/audio|
|                                    | feedback before placing any tower.               |
| 4. STREAMLINED HOTKEY WORKFLOW     | Complete keyboard ergonomics (`Q, W, E, R, D, F`)|
|                                    | enabling rapid, APM-friendly play.               |
+---------------------------------------------------------------------------------------+
```

---

## 2. Screen Anatomy & Layout Breakdown

```
+----------------------------------------------------------------------------------------------------------+
|  [Pause / Esc]      WAVE 18 / 100                 [NEXT WAVE IN 14s]              [SPEED: 1x / 2x / 4x]  |
|                                                                                                          |
|                                                                                                          |
|                                         BATTLEFIELD VIEWPORT                                             |
|                                (Pan / Zoomable 2.5D Orthographic Grid)                                   |
|                                                                                                          |
|                                                                                                          |
|   SPAWN                                                                                        SANCTUM   |
|   PORTAL ====> [A* Trajectory Guide Line] ====> [MAZE TOWERS] ====> [KILL ZONE] ====>            CORE    |
|                                                                                                          |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
|                                      DOTA-STYLE BOTTOM TRAY HUD                                          |
+--------------------+-----------------------------+-----------------------------+-------------------------+
|     TACTICAL       |       SANCTUM HEALTH        |      TOWER BUILD DOCK       |     UNIT INSPECTOR      |
|     MINI-MAP       |      & SCRAP RESOURCES      |                             |    & UPGRADE PANEL      |
|                    |                             |  [ Q ]     [ W ]    [ E ]   |                         |
|   [ 32x18 Grid ]   |   Sanctum HP: 2,500/2,500   |  Gatling   Bloom    Prism   |  [ 3D Render / Icon ]   |
|   - Creep blips    |   [|||||||||||||||||||||]   |  100s      150s     175s    |  Prism Pillar (Tier 2)  |
|   - Maze layout    |                             |                             |  Damage: 75 -> 450 DPS  |
|   - Camera box     |   Scrap: 480   (+24 int)    |  [ R ]     [ D ]    [ F ]   |  Target: [ First v ]    |
|                    |   Mana:  65 / 100           |  Resonance Root     Solar   |  [ Upgrade T3-A: 500s ] |
|   [Center View]    |   Early Call: +35s bonus    |  125s      35m      75m     |  [ Upgrade T3-B: 480s ] |
|                    |                             |                             |  [ Sell Tower:  +210s ] |
+--------------------+-----------------------------+-----------------------------+-------------------------+
```

---

## 3. Placement & Mazing Interaction Mechanics

### 3.1 Hover & Placement States
When the player selects a tower (via click or pressing `Q/W/E/R`), the cursor enters **Placement Mode**:

1. **Valid Tile Hover (Green Ghost):**
   - Semi-transparent silhouette of the tower hovers over the grid cell.
   - A bright cyan/white **Range Circle** expands outward from the tower, showing exact firing coverage.
   - The green dotted **A* Trajectory Guide Line** recalculates in real-time, showing how creeps will detour around this new obstacle.
   - Mouse Left-Click drops the tower instantly with a heavy stone-placement sound (`THUD`).
2. **Invalid / Blocked Maze Hover (Crimson Red Ghost):**
   - If placing the tower would completely cut off all paths from any spawn or trapped creep to the Sanctum:
     - The ghost turns glowing red with a diagonal slash icon.
     - A gentle warning sound emits: `buzzer-soft.wav`.
     - Tooltip appears: *"Path Blocked! Maze must leave an open lane to the Sanctum."*
     - Left-click does nothing; placement is safely rejected.
3. **Cancellation:**
   - Pressing `Right-Click` or `Escape` cancels Placement Mode immediately.

---

## 4. Hotkeys & Ergonomics (Dota 2 Standard)

```
+------------+-------------------------------------------------------------+
| Hotkey     | Action                                                      |
+------------+-------------------------------------------------------------+
| Q          | Select Petal Razor / Gatling Plinth (100 Scrap)             |
| W          | Select Spore Mortar / Bloom Cannon (150 Scrap)              |
| E          | Select Prism Pillar (175 Scrap)                             |
| R          | Select Resonance Monolith (125 Scrap)                       |
| D          | Trigger Sanctum Ability 1: Verdant Overgrowth (Root)        |
| F          | Trigger Sanctum Ability 2: Solar Flare (Orbital Strike)     |
| Spacebar   | Center Camera on Sanctum / Wave Front                       |
| Tab        | Cycle through placed towers                                 |
| U          | Upgrade selected tower                                      |
| S          | Sell selected tower for 75% scrap refund                    |
| 1 / 2 / 4  | Toggle Game Speed (1x / 2x / 4x)                            |
| N          | Call Next Wave Early (Collect early scrap bonus)            |
+------------+-------------------------------------------------------------+
```

---

## 5. Visual Juice & Telemetry

### 5.1 Dota 2-Style Combat Text Popups
Damage numbers erupt upwards from hit creeps with logarithmic damping and subtle random horizontal scatter:
- **Kinetic Bullets:** Compact, crisp golden numbers (`-18`, `-28`).
- **AoE Explosions:** Bold orange numerals scaling with damage size (`-240!`).
- **Beam Sizzle:** Rapidly updating cyan counter above the target showing cumulative beam burn.
- **Armor Melt:** Purple broken shield icon with `-3 Armor` text.

### 5.2 Responsive Viewport Modes
- **Ultra-Wide (21:9 & 32:9):** Battlefield expands horizontally; HUD stays docked centered on the bottom edge with ornamental marble filigree flanking the wings.
- **Standard Desktop (16:9 & 16:10):** Native viewport filling 100vw and 100vh with no scrollbars.
- **Tablet / Touch Devices:** Virtual on-screen touch buttons for Q-W-E-R with touch-drag panning and pinch-to-zoom.
