# Aegis Florae: Game Design Document (GDD)

---

## 1. High-Level Vision & Design Goals

### 1.1 Core Elevator Pitch
**Aegis Florae** reimagines the open-grid mazing purity of **Robo Defense** with the visual spectacle, particle kineticism, and deep tactical responsiveness of **Dota 2**. Players place living brass-and-marble defense engines onto an open Greco-Roman ruins battlefield to deflect, delay, and obliterate oncoming waves of mechanized rogue war-machines before they breach the **Verdant Sanctum**.

### 1.2 Core Pillars
1. **The Maze is the Weapon:** Players do not simply place towers on roadside slots; they architect the entire road. Every tower is a physical wall. A well-designed maze turns a 10-second march into a 90-second gauntlet.
2. **Instant Feedback & Dota-Tier Juice:** Every shot has weight, recoil, muzzle bloom, and impact cratering. Health bars tick down with Dota-style damage chunks and overhead status badges (Slowed, Stunned, Shattered, Burning).
3. **Branching Tactical Specialization:** Inspired by Robo Defense's upgrade tiers and Dota's talent trees, every tower evolves from a simple baseline structure into specialized tier-3 super-weapons.
4. **Legible Complexity:** Intuitive color coding, hotkeys (`Q-W-E-R`), and live trajectory preview lines ensure complex mazing feels fluid and masterable.

---

## 2. Battlefield & Mazing Mechanics

```
  SPAWN PORTAL (West)                                         SANCTUM GATE (East)
  +---+                                                                       +---+
  | S | - - - - - - > [ WALL / TOWER ]                                       | E |
  | P |               +---+   +---+       [ WALL / TOWER ]                    | X |
  | A | - - - - - - > | T |   | T | - - > +---+                               | I |
  | W |               +---+   +---+       | T | - - - - - - - - - - - - - - > | T |
  | N | - - - - - - - - - - - - - - - - - +---+                               |   |
  +---+                                                                       +---+
                      < - - - - DYNAMIC A* RECALCULATION - - - - >
```

### 2.1 The Grid Layout
- **Dimensions:** Default battlefield is `32 columns x 18 rows` (scalable up to `48 x 24` on grand battlefield modes).
- **Spawn Zones:** Located on the left (West) boundary edge (1 to 3 active ingress gates).
- **Sanctum (Goal):** Located on the right (East) boundary edge.
- **Cell Occupancy:**
  - `Empty Dirt / Pavers`: Pathable by ground creeps. Towers can be placed.
  - `Ancient Monoliths / Natural Obstacles`: Unpathable natural stone pillars, reflecting pools, and overgrown marble pediments scattered around the board to create natural maze anchors.
  - `Placed Towers`: Blocks ground pathing. Towers occupy either `1x1` or `2x2` grid cells.

### 2.2 Mazing Rules & Pathfinding Validation
1. **Dynamic Path Recalculation:**
   - Every time a tower is placed, upgraded, or sold, an **A* pathfinding graph** recalculates the shortest path from each spawn point to the Sanctum.
   - Creeps currently on the board immediately redirect toward the newly updated shortest path. If a tower is placed directly adjacent to a creep, it gracefully shifts to the nearest open cell center without glitching.
2. **The Golden Anti-Block Rule:**
   - A player **CANNOT** place a tower if doing so would reduce the number of valid paths from any spawn to the Sanctum to zero.
   - **Hover Validation:** When the player hovers a tower over the grid, the pathfinder simulates the placement in real-time. If it blocks all paths:
     - The placement ghost turns **crimson red**.
     - An audible low-buzz error chirp plays.
     - A floating tooltip warns: *"Path Blocked! Maze must leave an open lane to the Sanctum."*
     - Mouse click is ignored / disallowed.
3. **Creep Pathing Archetypes:**
   - **Ground Creeps:** Obey grid collision strictly, following the A* shortest path.
   - **Air Creeps (Robo Defense inspired Blimps/Jets):** Fly in a direct linear trajectory from Spawn to Sanctum, ignoring ground maze walls. Requires dedicated anti-air targeting (e.g., Bloom Cannon flak or high-angle Petal Razor).
   - **Breacher Creeps (Siege Rams):** Very rare heavy elite units that, if trapped in an excessively long maze (>300% direct distance), will initiate a charge attack against the nearest tower to carve a shortcut if not burned down quickly!

---

## 3. Defense Grid & Tower Arsenal

Towers are living machines fusing Greco-Roman architecture with solarpunk floral bio-engineering and diesel mechanics.

```
                      +-----------------------------+
                      |       BASE TOWER (T1)       |
                      +--------------+--------------+
                                     |
                                [ Upgrade ]
                                     |
                      +--------------v--------------+
                      |     ADVANCED FORM (T2)      |
                      +-------+-------------+-------+
                              |             |
                         [ Branch A ]   [ Branch B ]
                              |             |
                   +----------v----+   +----v----------+
                   |  ELITE T3 (A) |   |  ELITE T3 (B) |
                   +---------------+   +---------------+
```

### 3.1 Tower 1: Petal Razor / Gatling Plinth (`Key: Q`)
*Robo Defense analogue: Gun Turret -> Vulcan / Gatling Cannon.*
- **Lore & Appearance:** An Ionic fluted marble plinth supporting a four-barrel rotary brass Gatling cannon. Heat dissipation is achieved through surrounding petals of copper-veined orchids that flare open and glow amber under continuous fire.
- **Combat Role:** Fast, high-frequency kinetic projectile turret. Excels at cutting down unarmored swarmers, drones, and light scouts.
- **Base Stats (T1):**
  - Cost: `100 Scrap`
  - Range: `3.5 Grid Tiles`
  - Attack Speed: `5.0 rounds/sec`
  - Damage: `18 Kinetic per shot`
- **Upgrades:**
  - **T2: Vulcan Pedestal:** +35% fire rate, spinning barrel spin-up mechanic (+1% attack speed per second of continuous firing, caps at +50%).
  - **T3 Branch A - Phalanx Petal-Storm:** 8-barrel rotary gun with incendiary tracer rounds; targets ignited take damage-over-time and suffer -3 armor.
  - **T3 Branch B - Rail-Needler:** Transforms into high-velocity hyper-kinetic kinetic piercer; shots pierce through up to 3 ground creeps in a line.

### 3.2 Tower 2: Spore Mortar / Bloom Cannon (`Key: W`)
*Robo Defense analogue: Missile Launcher / Rocket Pods.*
- **Lore & Appearance:** A cast-iron mortar housing camouflaged inside an armored mechanical lotus flower. Upon firing, the petals snap backward, launching an arcing spore-artillery shell high into the air with a bass-heavy *THUMP*, releasing a cloud of explosive bio-shrapnel on impact.
- **Combat Role:** Long-range artillery with Area-of-Effect (AoE) splash damage and Anti-Air tracking capability.
- **Base Stats (T1):**
  - Cost: `150 Scrap`
  - Range: `6.0 Grid Tiles` (Minimum range: 1.5 tiles)
  - Attack Speed: `0.65 rounds/sec`
  - Damage: `120 Explosive AoE (radius 1.8 tiles)`
- **Upgrades:**
  - **T2: Cluster Sporepod:** Increases splash radius to 2.4 tiles and splits into 2 mini-spore cluster bombs upon detonation.
  - **T3 Branch A - Skyburst Flak Orchid:** Specialized anti-air and heavy shrapnel artillery. Exploding shells blanket the sky and ground with burning pollen, dealing 2.5x damage against aerial units.
  - **T3 Branch B - Cataclysm Bloom (Dota Earthshaker Echo Slam style):** Launches seismic shock pods that create lingering fissures on the ground, slowing creeps by 40% and dealing aftershock damage whenever creeps die inside the zone.

### 3.3 Tower 3: Prism Pillar (`Key: E`)
*Robo Defense analogue: Laser Cannon / Beam Turret.*
- **Lore & Appearance:** A slender, pristine Corinthian marble column carved with glowing geometric solar glyphs. Suspended above the capital is a hovering, spinning octahedral cyan prism crystal that channels focused solar mana.
- **Combat Role:** Single-target beam weapon with ramping damage. As the beam remains locked on a single target, its energy frequency intensifies, melting heavy armor and boss colossi.
- **Base Stats (T1):**
  - Cost: `175 Scrap`
  - Range: `4.5 Grid Tiles`
  - Damage: Starts at `40 Energy DPS`, ramps smoothly up to `240 Energy DPS` over 3.0 seconds of uninterrupted focus.
- **Upgrades:**
  - **T2: Focus Lens Monolith:** Increases max ramped DPS to `450 Energy DPS` and retains 50% ramp charge when switching targets if the previous target died within 0.5s.
  - **T3 Branch A - Sol Invictus Array (Dota Phoenix Sun Ray style):** Beam pierces through the primary target and burns a continuous scorch line on the ground behind it, damaging all creeps standing in the ray.
  - **T3 Branch B - Refraction Prism:** Beam splits into 3 secondary refracted beams (dealing 60% damage) that tether to nearby enemies, shredding multiple medium-tier mechs simultaneously.

### 3.4 Tower 4: Resonance Monolith (`Key: R`)
*Robo Defense analogue: Slow / Freeze Tower.*
- **Lore & Appearance:** An ancient cracked basalt obelisk entwined with weeping wisteria vines and brass acoustic tuning forks. Pulses emit concentric rippling shockwaves across the stone tiles with a resonant cello/sub-bass thrum.
- **Combat Role:** Radial control, crowd control, and damage amplification. Essential for packing enemies tightly into Bloom Cannon kill boxes.
- **Base Stats (T1):**
  - Cost: `125 Scrap`
  - Range: `3.0 Grid Tiles (Radial aura)`
  - Pulse Rate: `1 pulse every 1.5 seconds`
  - Effect: Slows all enemies in radius by `35%` for 2.0 seconds. Deals minor acoustic damage (`15 Sonic`).
- **Upgrades:**
  - **T2: Harmonic Dampener:** Slow increased to `50%`, and slows enemy attack/ability charge times.
  - **T3 Branch A - Chrono-Stutter Monolith (Dota Faceless Void style):** Every 4th pulse triggers a 0.75-second complete temporal freeze (stun) on all creeps in the radius.
  - **T3 Branch B - Resonance Shatter (Dota Slardar / Shadow Fiend armor melt):** Emits high-frequency ultrasonic hum that strips 50% armor and magic resistance from all affected enemies, causing them to take +35% amplified damage from all other towers.

---

## 4. Enemy Waves (The Rogue Automata)

Rogue diesel-powered mining, industrial, and military war-mechs that have gone feral across the overgrown badlands.

```
+-------------------+-------------+-------+-------+--------+-------------------------------------+
| Creep Type        | Category    | Speed | HP    | Armor  | Special Trait                       |
+-------------------+-------------+-------+-------+--------+-------------------------------------+
| Skitter Scout     | Light Swarm | Fast  | Low   | None   | Moves in dense packs of 12-20       |
| Steam Prowler     | Skirmisher  | Med   | Med   | Light  | Emits steam screen (+20% dodge)     |
| Tread Tank        | Armored     | Slow  | High  | Heavy  | High kinetic resistance (-50%)      |
| Zeppelin Sky-Hull | Aerial      | Med   | Med   | Plated | Bypasses maze; flies straight       |
| Dreadnought Ram   | Siege       | Slow  | V.High| Heavy  | Can damage towers if stalled too long|
| Goliath Colossus  | Boss (Mega) | V.Slow| Titan | Shield | Multi-phase boss with shield charge |
+-------------------+-------------+-------+-------+--------+-------------------------------------+
```

### 4.1 Creep Progression & Wave Types
- **Standard Waves:** Mixed compositions testing general maze length and baseline DPS.
- **Swarm Waves:** Fast, low-health units requiring Gatling Plinths and Bloom Cannon splash.
- **Armored Waves:** High-armor siege walkers that laugh at Gatling bullets but melt under Prism Pillar beams.
- **Air Raids:** Flocks of rotor drones or armored airships that ignore maze walls entirely, forcing anti-air weapon coverage along the central axis.
- **Boss Waves (Every 10 Waves):** Epic multi-segment mechanical monstrosities with gigantic health pools, custom abilities (EMP pulse that disables towers for 3s, shield regeneration, or micro-drone deployments).

---

## 5. Economy & In-Game Progression

### 5.1 In-Run Economy
1. **Scrap (Gold analogue):**
   - Earned by killing creeps, completing waves, and collecting interest.
   - Used to build new towers, upgrade existing towers, or repair Sanctum fortifications.
2. **Solar Mana (Energy analogue):**
   - Automatically recharges over time (e.g., +5 Mana/sec).
   - Used to activate Sanctum Super-Abilities (Dota-style global spells):
     - `Ability 1 - Verdant Overgrowth (Hotkey: D)`: Roots all creeps in a target 4x4 area for 3.5s.
     - `Ability 2 - Solar Flare (Hotkey: F)`: Calls down an orbital solar beam on target location, dealing massive burst damage.
3. **Early Wave Caller Bonus (The "Send Wave Now" Button):**
   - Players can call the next wave before the current one finishes.
   - Grants immediate bonus Scrap proportional to remaining wave timer (+10% to +35% extra scrap), rewarding aggressive play and efficient mazing.

### 5.2 Meta-Progression (Robo Defense Reward System + Dota Talent Tree)
After each run (win or defeat), players earn **Verdant Glyphs** based on wave milestones and kill counts. These glyphs unlock permanent upgrades in the Sanctum Conservatory:
- **Foundry Engineering:** Increases base tower damage by +2% per level (up to +30%).
- **Ancient Vaults:** Starts each run with +50 / +100 / +200 bonus starting Scrap.
- **Flora Symbiosis:** Increases Sanctum maximum hit points and grants passive health regeneration between waves.
- **Mazing Mastery:** Unlocks special placeable non-tower blocker walls (low-cost decorative ruined marble barriers).

---

## 6. Player Experience & Game Modes

1. **Classic Campaign / Survival (Standard 50-Wave Mode):**
   - Survive 50 progressively harder waves culminating in colossal mechanized titan encounters on Wave 10, 20, 30, 40, and 50. (100-wave master mode and endless mode planned for post-launch).
2. **Infinite Overdrive (Endless Mode — Planned):**
   - Infinite scaling waves with random modifiers (Haste waves, Shielded waves, Resilient mechs). Leaderboard scoring based on wave reached.
3. **Architect Puzzle Challenges:**
   - Pre-set layouts with limited scrap where the player must solve specific mazing puzzles to survive impossible creep numbers.
