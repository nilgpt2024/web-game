# Aegis Florae 3D — Gap Analysis & Implementation Status

This document reconciles the project's **documented specifications** (GDD, TECHNICAL_ARCHITECTURE, UI_AND_UX_SPEC, TOWER_AND_ENEMY_BALANCE_SHEET) with the **actual implementation** in `game.html`.

For the authoritative status of all shipping features, see [SHIPPING_FEATURE_MATRIX.md](./SHIPPING_FEATURE_MATRIX.md).

---

## 🟢 RESOLVED & VERIFIED IN GAME.HTML

The following critical gaps have been resolved, verified, and backed by automated regression tests:

### 1. Sanctum Super-Abilities (`D` and `F` keys) — VERIFIED
- **Implementation:** `D` activates **Verdant Overgrowth** (roots all creeps in a 4×4 area for 3.5s, deals 60 Sonic damage, costs 35 Mana). `F` activates **Solar Flare** (orbital lance dealing 800 Energy damage in a 3-tile radius, costs 75 Mana).
- **HUD & Ergonomics:** Live mana counter, continuous regeneration (+4.0/s), animated cooldown sweeps, and on-screen buttons in `#ability-cluster`.

### 2. Meta-Progression (Verdant Glyphs) — VERIFIED (#6, #18)
- **Implementation:** LocalStorage persistence under `aegis_glyphs`.
- **Upgrades:** Foundry Engineering (+2% dmg/lvl), Ancient Vaults (+50 start cash/lvl), Flora Symbiosis (Sanctum HP), Mazing Mastery (Masonry Walls).
- **UI:** Interactive Conservatory modal (`G` key, HUD button), meta-scrap tracking, and dynamic cost scaling.

### 3. Armor System & Damage Types — VERIFIED
- **Implementation:** Full Dota 2 diminishing returns formula implemented in `applyDamage(f, amount, dtype, hasArmor)`.
- **Damage Types:** Kinetic (+25% vs unarmored, -40% vs heavy), Energy (ignores 50% armor), Sonic (pure damage), Blast (AoE splash).
- **Armor Stripping:** Resonance Obelisk strips armor (-1 to -3), displaying live overhead damage and armor shred indicators.

### 4. Goal-Rooted Flow Field Pathfinding — VERIFIED (#11)
- **Implementation:** Backward Dijkstra/BFS flood-fill from the Sanctum (`computeFlowField`, `getFlowPath`).
- **Performance:** Instantaneous single-pass potential field recalculation replacing O(N) per-creep A* searches when placing or removing towers.

### 5. Spatial Target Indexing & Object Pooling — VERIFIED (#11)
- **Implementation:** Creeps bucketed into spatial grid cells (`buildSpatialIndex`, `queryFoesInRadius`).
- **Pooling:** `DMG_POOL` for floating combat text, `FX_SHARED.shellPool` for brass casings, `FX_SHARED.sparkPool` for laser sparks, and `LIGHT_POOL` for dynamic point lights.
- **Benchmark:** 350 active creeps maintain >1,000 FPS simulation throughput (<1ms frame times).

### 6. Tower Targeting Priorities — VERIFIED (#7)
- **Implementation:** Five selectable targeting priorities: `First`, `Last`, `Strongest`, `Weakest`, `Closest`.
- **Input:** Interactive buttons in Tower Inspector, `Tab` and `Y` keyboard shortcuts, and gamepad View cycle.

### 7. Tower Branch Upgrades — VERIFIED (#8)
- **Mechanics:**
  - Gatling T3-B (Rail-Needler): Pierces up to 3 targets in firing line.
  - Beam T3-B (Refraction Lens): 3-way prism splitting to 2 secondary targets.
  - Beam T3-A (Sol Invictus): Persistent thermal scorch lines and ground burn zones.
  - Slow T3-A (Chrono-Stutter): Deterministic 1.2s temporal freeze on every 4th pulse.
  - Slow T3-B (Resonance Shatter): Strips 3 armor + triggers 50% bonus acoustic shatter blast.

### 8. Guided First-Run Tutorial — VERIFIED (#9)
- **Implementation:** 8-step walkthrough explaining Sanctum defense, mazing hook, path recalibration, choke points, wave launching, and tower inspection.

### 9. Combat Readability & Tactical Clarity — VERIFIED (#10)
- **Implementation:** Tactical Clarity toggle (`K` key, `#btnClarity`), scenery desaturation, bloom dimming, tower base plinths, and creep threat footprint rings.

### 10. Pause & Audio Safety — VERIFIED (#1, #4, #5)
- **Implementation:** Pause completely freezes simulation, timers, and animations. Audio master mute is immediate; explosion bus is clamped with an exponential curve.

---

## 🟡 REMAINING ROADMAP ITEMS

The remaining planned enhancements are tracked in GitHub issues:

### 1. Windows-First Release Checklist & Package (#13)
- Windows standalone wrapper / runner verification, launch checklist, and packaging guide.

### 2. Dedicated Sanctum Leak & Defeat SFX (#19)
- Enhanced leak audio stinger and game over soundscape.

### 3. Gesture-Driven AudioContext Initialization (#20)
- Guarding all AudioContext startup strictly behind explicit user interactions.

### 4. Boss Affixes & Wave-10 Climax (#21)
- Multi-phase boss behaviors (EMP wave, shield barrier, micro-drone release).

### 5. Steam Prowler & Dreadnought Ram Archetypes (#22)
- Adding the remaining 2 specialized enemy chassis (dodge skirmisher & siege ram).

### 6. Licensed Soundtrack Integration (#27, #28)
- Commissioning / licensing high-fidelity solarpunk ambient loops.
