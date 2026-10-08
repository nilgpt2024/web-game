# Aegis Florae: Authoritative Shipping Feature Matrix

This document is the single source of truth for all gameplay, architecture, and visual features in *Aegis Florae*. Every feature is classified by verified implementation status against `game.html` and automated regression tests.

---

## 1. Feature Status Summary

| Status | Definition |
|---|---|
| **🟢 Verified** | Implemented, working in `game.html`, and covered by automated test suites in `tests/`. |
| **🟡 Partial** | Partially implemented or basic version active in `game.html`, with deeper extensions planned. |
| **🔵 Planned** | Specified in game design docs; documented in GitHub issues, not yet active in release builds. |

---

## 2. Core Gameplay & Mazing Engine

| System | Feature | Status | Notes & Specifications | Tested In |
|---|---|---|---|---|
| **Mazing Grid** | 26×18 Grid Tiles | **🟢 Verified** | Classical ruins battlefield; coordinates `COLS=26, ROWS=18, CELL_SIZE=2.0`. | `first_run_tutorial.test.js` |
| **Pathfinding** | Goal-Rooted Flow Field | **🟢 Verified** | Dijkstra/BFS backward potential field from Sanctum (`computeFlowField`, `getFlowPath`) with O(1) step lookup. | `large_wave_performance.test.js` |
| **Path Validation** | No Complete Blocking | **🟢 Verified** | Real-time path validation via `canPlace(gx, gy)`; prevents sealing the creeps' route to the Sanctum. | `first_run_tutorial.test.js` |
| **Path Visualizer** | Animated Flow Line | **🟢 Verified** | High-contrast dashed teal line (`LineDashedMaterial`) with animated `dashOffset` flowing toward Sanctum. | `tactical_clarity.test.js` |
| **Spatial Indexing** | Creep Index Grid | **🟢 Verified** | Bounded cell buckets with token deduplication (`buildSpatialIndex`, `queryFoesInRadius`) eliminating O(N*M) loops. | `large_wave_performance.test.js` |
| **Combat Pause** | Complete Freeze | **🟢 Verified** | Pauses simulation delta, tower targeting, projectile physics, wave timers, and spawn queues (`togglePause`). | `tower_targeting.test.js` |
| **Wave Structure** | 50 progressive waves | **🟢 Verified** | `WAVE_MAX = 50`; waves 1–50 scaled with formula `hpScale(w)`; boss encounters on multiples of 10. | `large_wave_performance.test.js` |

---

## 3. Towers & Branching Specialization

| Tower Key | Name & Archetype | Branch Options | Status | Mechanics Implemented | Tested In |
|---|---|---|---|---|---|
| `gun` | **Petal Gatling** (Direct DPS) | **A: Vulcan Pedestal**<br>**B: Rail-Needler** | **🟢 Verified** | Base: rapid-fire kinetic pellets.<br>A: 8-barrel rotary rate.<br>B: Line pierce up to 3 targets with piercing tracer. | `tower_branches.test.js` |
| `rocket` | **Spore Mortar** (Blast Artillery) | **A: Cataclysm Bloom**<br>**B: Skyburst Flak** | **🟢 Verified** | Base: high-arc mortar shell with AoE splash.<br>A: heavy blast with ground craters.<br>B: dedicated anti-air flak battery with rapid intercept rounds. | `tower_branches.test.js` |
| `beam` | **Prism Pillar** (Focus Thermal Melt) | **A: Sol Invictus**<br>**B: Refraction Lens** | **🟢 Verified** | Base: continuous melting beam with ramp.<br>A: persistent scorching thermal ground zones.<br>B: 3-way refraction split beam striking 2 secondary foes. | `tower_branches.test.js` |
| `slow` | **Resonance Obelisk** (Acoustic Crowd Control) | **A: Chrono-Stutter**<br>**B: Resonance Shatter** | **🟢 Verified** | Base: radial acoustic pulse stripping 1 armor + chill.<br>A: 4th pulse deterministic 1.2s freeze stun.<br>B: strips 3 armor + 50% bonus acoustic shatter blast. | `tower_branches.test.js` |
| `blocker` | **Ruin Barrier** (Obstacle) | N/A | **🟢 Verified** | 0-damage masonry block for maze crafting; unlocked via Mazing Mastery glyph. | `first_run_tutorial.test.js` |

---

## 4. Tower Targeting Priorities

| Priority Mode | Key / Button | Status | Mechanics & Evaluation Formula | Tested In |
|---|---|---|---|---|
| **First** | UI / `Tab` / `Y` / Pad | **🟢 Verified** | Targets foe closest to the Sanctum along path progress (`(wp * 1000) - distance`). | `tower_targeting.test.js` |
| **Last** | UI / `Tab` / `Y` / Pad | **🟢 Verified** | Targets trailing foe closest to spawn portal (`-((wp * 1000) - distance)`). | `tower_targeting.test.js` |
| **Strongest** | UI / `Tab` / `Y` / Pad | **🟢 Verified** | Targets foe with highest current HP (`hp * 100000 + progress`). | `tower_targeting.test.js` |
| **Weakest** | UI / `Tab` / `Y` / Pad | **🟢 Verified** | Targets foe with lowest current HP for execution (`-hp * 100000 + progress`). | `tower_targeting.test.js` |
| **Closest** | UI / `Tab` / `Y` / Pad | **🟢 Verified** | Targets foe with lowest Euclidean distance to tower plinth (`-distance * 100000 + progress`). | `tower_targeting.test.js` |

---

## 5. Enemy Archetypes & Threat Types

| Creep Key | Name | Movement | Armor | Status | Tactical Weakness & Behavior | Tested In |
|---|---|---|---|---|---|---|
| `spider` | **Skitter Scout** | Ground (Fast) | 0 | **🟢 Verified** | Swarm unit, vulnerable to Kinetic Gatling. | `large_wave_performance.test.js` |
| `tank` | **Tread Tank** | Ground (Slow) | 8 | **🟢 Verified** | Heavy composite armor, vulnerable to Energy Beam. | `large_wave_performance.test.js` |
| `drone` | **Rotor Drone** | Flying (Air) | 1 | **🟢 Verified** | Bypasses maze walls directly to Sanctum; requires anti-air. | `large_wave_performance.test.js` |
| `walker` | **Diesel Walker** | Ground (Medium) | 10 | **🟢 Verified** | Bipedal heavy armored siege walker. | `large_wave_performance.test.js` |
| `ship` | **Sky Zeppelin** | Flying (Air Heavy) | 6 | **🟢 Verified** | Flying fortress with high leak penalty (5 HP). | `large_wave_performance.test.js` |
| `boss` | **Goliath Colossus** | Ground (Titan) | 16/8 | **🟢 Verified** | Multi-phase titan encounter: Phase 1 Siege (16 Armor + Support repair drones), Phase 2 EMP Overcharge (Seismic EMP tower disable + 15% Hardlight Shield), Phase 3 Berserk Core Meltdown (+35% speed, core armor reduced to 8 for counterplay, seismic stomps). | `boss_phases_mechanics.test.js` |
| `prowler` | **Steam Prowler** | Ground (Skirmish) | 2 | **🟢 Verified** | High-mobility skirmisher with 20% steam-screen evasion against Kinetic/Energy attacks; counter with Bloom AoE or Sonic resonance (+35% bonus). | `missing_enemy_archetypes.test.js` |
| `ram` | **Dreadnought Ram** | Ground (Battering) | 12 | **🟢 Verified** | Heavy siege juggernaut with hydraulic battering ram that stalls adjacent tower reload cooldowns; melt with Energy/Sonic or Chrono Stutter freeze. | `missing_enemy_archetypes.test.js` |

---

## 6. Sanctum Abilities & Meta-Progression

| System | Feature | Status | Specification | Tested In |
|---|---|---|---|---|
| **Active Ability D** | Verdant Overgrowth | **🟢 Verified** | 35 Mana, roots all foes in 4×4 radius for 3.5s and deals 60 Sonic damage. | `game.html` / `first_run_tutorial.test.js` |
| **Active Ability F** | Solar Flare | **🟢 Verified** | 75 Mana, orbital solar lance dealing 800 Energy damage in 3-tile radius with lingering decals. | `game.html` / `first_run_tutorial.test.js` |
| **Mana Economy** | Continuous Regen | **🟢 Verified** | Passive mana regeneration (+4/sec, max 100). | `game.html` |
| **Meta-Progression** | Verdant Glyphs | **🟢 Verified** | Persistent scrap meta-upgrades saved in `localStorage` (`aegis_glyphs`): Foundry Engineering, Ancient Vaults, Flora Symbiosis, Mazing Mastery. | `game.html` / `tests/` |
| **Interactive Shop** | Glyph Shop UI (`G`) | **🟢 Verified** | Modal upgrade conservatory with level tracking, scrap counter, and live bonus application. | `game.html` |

---

## 7. Controls, Ergonomics & Accessibility

| Action | Primary Hotkey | Controller Default | Status |
|---|---|---|---|
| **Select Tower 1 (Gatling)** | `Q` or `1` | D-Pad / Carousel | **🟢 Verified** |
| **Select Tower 2 (Mortar)** | `W` or `2` | D-Pad / Carousel | **🟢 Verified** |
| **Select Tower 3 (Beam)** | `E` or `3` | D-Pad / Carousel | **🟢 Verified** |
| **Select Tower 4 (Slow)** | `R` or `4` | D-Pad / Carousel | **🟢 Verified** |
| **Start / Call Wave** | `Space` | `A` (Button 0) | **🟢 Verified** |
| **Verdant Overgrowth (Root)** | `D` | HUD Ability Card | **🟢 Verified** |
| **Solar Flare (Orbital Beam)** | `F` | HUD Ability Card | **🟢 Verified** |
| **Pause / Resume** | `P` | `Start` (Button 9) | **🟢 Verified** |
| **Cycle Game Speed** | `V` | `Back` (Button 8) | **🟢 Verified** |
| **Toggle Mute** | `M` | HUD Button | **🟢 Verified** |
| **Cycle Target Priority** | `Tab` or `Y` | `Y` / `View` | **🟢 Verified** |
| **Tactical Clarity Mode** | `K` | HUD Button (`👁`) | **🟢 Verified** |
| **Guided Tutorial Walkthrough** | `?` | HUD Button (`?`) | **🟢 Verified** |
| **Toggle Camera Mode** | `C` (Iso) / `T` (Shoulder) | Right Stick Click | **🟢 Verified** |
| **Verdant Glyph Shop** | `G` | HUD Button | **🟢 Verified** |
| **Controller Remapping** | Interactive Modal | Native Gamepad API | **🟢 Verified** |

---

## 8. Rendering, Performance & Readability

| System | Feature | Status | Details | Tested In |
|---|---|---|---|---|
| **Dynamic Resolution** | DRS / Dynamic Scaling | **🟢 Verified** | Automated frame time governor scaling render buffer between 0.65× and 1.0× to sustain 60 FPS. | `game.html` |
| **Post-Processing** | Screen-Space Bloom | **🟢 Verified** | Custom shader pass with ACES tone mapping, bloom isolation (0.85 threshold), and optical vignette. | `tactical_clarity.test.js` |
| **Tactical Clarity** | Clean Readability Mode | **🟢 Verified** | Scenery desaturation, bloom dimming (0.12), pollen particle opacity drop (0.12), color-coded tower plinth rings, threat silhouette rings. | `tactical_clarity.test.js` |
| **Object Pooling** | Particle & Text Pools | **🟢 Verified** | `DMG_POOL` combat text, `FX_SHARED.sparkPool`, `FX_SHARED.shellPool`, `LIGHT_POOL` dynamic lights eliminating GC churn. | `large_wave_performance.test.js` |
| **Large Wave Scaling** | 350-Creep Stress | **🟢 Verified** | Deterministic stress scenario sustains <1ms average simulation time (>1,000 FPS head-room) with 1% low >180 FPS. | `large_wave_performance.test.js` |

---

## 9. Audio Architecture

| System | Feature | Status | Details |
|---|---|---|---|
| **Audio Safety** | Safe Explosion Bus | **🟢 Verified** | Master mute immediately sets master gain to 0; explosion bus clamped with exponential decibel curve to prevent clipping (`tests/audio_limiter_mute.test.js`). |
| **Soundtrack** | Dynamic Solarpunk Score | **🟢 Verified** | *Verdant Harmonies: Solarpunk Echoes* 4-stem dynamic score (Ambience, Plucked Arpeggio, Clockwork Percussion, Boss Bass Drive) with pause filter, visibility handling, and independent sliders (`tests/dynamic_music_soundtrack.test.js`). |
| **Leak / End Audio**| Sanctum Klaxon & Stingers | **🟢 Verified** | Warning klaxon with anti-stacking throttle on leaks; defeat somber collapse chord and victory fanfare (`tests/leak_alarm_sfx.test.js`). |
| **Licensing Provenance**| Chrono Trigger Assessment | **🟢 Verified** | Written NO-GO legal determination on copyrighted tracks; full commercial provenance documented in `AUDIO_PROVENANCE_AND_LICENSING.md`. |
