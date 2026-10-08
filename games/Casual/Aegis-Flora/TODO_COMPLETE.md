# Aegis Florae 3D — Complete Task List & Release Progress

For the verified feature matrix, see [SHIPPING_FEATURE_MATRIX.md](./SHIPPING_FEATURE_MATRIX.md).

---

## 🟢 COMPLETED & VERIFIED

### 1. Meta-Progression (Verdant Glyphs) — VERIFIED (#6, #18)
- [x] **localStorage persistence** — Save/load glyph levels between runs (`aegis_glyphs`)
- [x] **Foundry Engineering** — +2% tower damage per level
- [x] **Ancient Vaults** — +50 starting scrap per level
- [x] **Flora Symbiosis** — Max Sanctum HP upgrade
- [x] **Mazing Mastery** — Unlocks Greco-Roman Masonry Wall (`blocker`)
- [x] **Glyph shop UI** — `G` key toggle, modal UI, dynamic scrap costs
- [x] **Apply bonuses to new games** — Damage multipliers, start cash, max lives applied cleanly

### 2. Sanctum Abilities (D/F keys) — VERIFIED
- [x] **Verdant Overgrowth (D)** — 35 Mana, 25s cooldown
  - [x] Roots all creeps in 4×4 radius around Sanctum for 3.5s
  - [x] Deals 60 Sonic damage instantly
  - [x] Visual: green shockwave ring + green mist overlay
- [x] **Solar Flare (F)** — 75 Mana, 60s cooldown
  - [x] Targets cursor grid cell with orbital solar beam
  - [x] 800 Energy damage in 3-tile radius
  - [x] Leaves scorch and crater decals
- [x] **Ability cluster in HUD** — Cooldown sweep, mana check, hotkey tooltips
- [x] **Mana regeneration** — Continuous +4/sec regeneration

### 3. Armor System — VERIFIED
- [x] **Armor values per enemy** — spider: 0, tank: 8, walker: 10, boss: 16, drone: 1, ship: 6
- [x] **Dota 2 armor formula** — `1 - (0.06 * Armor) / (1 + 0.06 * |Armor|)`
- [x] **Negative armor formula** — `2 - 0.94^|Armor|` for damage amplification
- [x] **Damage type modifiers** — Kinetic, Energy, Sonic, Blast
- [x] **Armor stripping** — Resonance Obelisk strips armor; Resonance Shatter strips 3 armor + triggers bonus shatter damage

### 4. Flow Field Pathfinding & Spatial Indexing — VERIFIED (#11)
- [x] **Integration Flow Field** — Goal-rooted BFS potential field (`computeFlowField`, `getFlowPath`)
- [x] **Distance potential field** — Instant route recalculation on maze changes
- [x] **Spatial target indexing** — Grid bucket queries (`queryFoesInRadius`) eliminating O(N*M) loops
- [x] **Performance benchmark** — 350 active creeps maintain >1,000 FPS simulation speed

### 5. Object Pooling — VERIFIED (#11)
- [x] **Floating combat text pool** — `DMG_POOL` recycling damage number objects
- [x] **Shell casing pool** — `FX_SHARED.shellPool` recycling brass cylinders
- [x] **Laser spark pool** — `FX_SHARED.sparkPool` recycling contact particles
- [x] **Light pool** — `LIGHT_POOL` fixed 6-light pool eliminating shader recompilations

### 6. Tower Targeting Priorities — VERIFIED (#7)
- [x] **5 priority modes** — First, Last, Strongest, Weakest, Closest
- [x] **Interactive HUD buttons** — Selectable buttons in Tower Inspector
- [x] **Keybindings** — `Tab` and `Y` shortcuts, gamepad View cycle

### 7. Tower Branch Upgrade Mechanics — VERIFIED (#8)
- [x] **Gatling T3-B Rail-Needler** — Pierces up to 3 targets in a line
- [x] **Beam T3-B Refraction Lens** — 3-way prism beam split
- [x] **Beam T3-A Sol Invictus** — Ground scorching thermal zones
- [x] **Slow T3-A Chrono-Stutter** — Deterministic freeze on every 4th pulse
- [x] **Slow T3-B Resonance Shatter** — Armor strip (-3) + 50% shatter detonation

### 8. Guided Mazing Tutorial — VERIFIED (#9)
- [x] **8-step interactive tutorial** — Guided walkthrough of maze-building hook
- [x] **Persistence & replayability** — Saved completion status, replay button in Settings, `?` HUD shortcut

### 9. Combat Readability & Tactical Clarity — VERIFIED (#10)
- [x] **Tactical Clarity mode** — Scenery desaturation, bloom dimming, pollen particle opacity drop
- [x] **Base plinths & threat rings** — Color-coded footprint rings for towers and creeps
- [x] **Animated path flow** — Conveyer-style dashed path line flow toward Sanctum

---

## 🟡 PLANNED & ROADMAP (Open GitHub Issues)

- [x] **Windows-First Release Checklist** (#13) — Standalone packaging, Steamworks plan, and release verification
- [x] **Sanctum Leak & Defeat Audio** (#19) — Enhanced leak alarm klaxon with anti-stacking and game over audio
- [x] **Gesture-Driven Audio Startup** (#20) — Strict user-gesture gating for AudioContext and diagnostics
- [x] **Boss Affixes & Wave-10 Climax** (#21) — Multi-phase boss encounter mechanics, hardlight shield, and EMP
- [ ] **Missing Enemy Archetypes** (#22) — Steam Prowler and Dreadnought Ram chassis
- [ ] **Licensed Solarpunk Soundtrack** (#27, #28) — Commissioned / licensed ambient loops