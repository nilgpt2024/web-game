# Aegis Florae: Art & Audio Specification

---

## 1. Visual Identity & Aesthetic Philosophy

### 1.1 The "Solarpunk-Mecha" Fusion
**Aegis Florae** juxtaposes the grandeur of ancient classical architecture with rugged, clanking dieselpunk machinery and thriving, radiant botanical life.

```
       +-------------------------------------------------------------+
       |                  THE THREE VISUAL PILLARS                   |
       +-------------------------------------------------------------+
       | 1. GRECO-ROMAN MARBLE | White Carrara marble, fluted Ionic  |
       |    & CLASSICAL RUINS  | columns, cracked pediments, mossy   |
       |                       | flagstones, golden inscribed runes  |
       +-----------------------+-------------------------------------+
       | 2. HEAVY DIESEL-MECH  | Cast iron, riveted brass boilers,   |
       |    & INDUSTRIAL TECH  | exposed clockwork gears, hydraulic  |
       |                       | pistons, exhaust stacks, oil stains |
       +-----------------------+-------------------------------------+
       | 3. VIVID BIOLUMINESCE | Giant golden chrysanthemums, pink   |
       |    & OVERGROWN FLORA  | peonies, creeping ivy, glowing cyan |
       |                       | solar mana vines, floating spores   |
       +-----------------------+-------------------------------------+
```

### 1.2 Color Palette & Material Hierarchy
- **Architecture & Foundations:** Warm ivory white (`#F4EEDD`), weathered stone grey (`#7D8287`), sunlit travertine (`#D6C7A1`).
- **Defensive Metals & Machinery:** Antique brass (`#C59B27`), gunmetal bronze (`#4A3B32`), brushed olive-drab iron (`#38423B`).
- **Flora & Organic Elements:** Lush clover green (`#2D7246`), vivid jade (`#1B998B`), radiant chrysanthemum gold (`#FFB703`), blooming peony magenta (`#E05780`).
- **Energy Conduits & VFX (Dota-Style Accents):**
  - Solar Beam / Mana: Intense electric cyan (`#00F5D4`, `#00BBF9`).
  - Artillery Explosions / Fire: High-saturation incandescent amber and orange (`#FF6B35`, `#FF0054`).
  - Acoustic / Sonic Wave: Ethereal amethyst purple and indigo (`#7209B7`, `#B5179E`).
  - Creep Laser Eyes / Hostile HUD: Malicious crimson-orange (`#D00000`, `#E85D04`).

### 1.3 Production Visual Benchmarks
The visual target is anchored by the master reference ([`aegis.jpeg`](file:///Users/jahflyx/Downloads/aegis.jpeg)) and realized through four core concept pillars:
- **Battlefield Arena:** 2.5D open courtyard grid of cracked marble pavers flanked by Corinthian colonnades, floral terraces, and alpine peaks.
- **Prism Gatling Plinth:** Ornate Corinthian marble column with classical relief carvings, antique brass gears, rotating barrels, and a glowing cyan mana core.
- **Bloom Cannon:** Patinated brass lotus flower petals encasing a heavy rifled mortar launching arcing bio-explosives.
- **Rogue Diesel Walker:** Riveted iron plating, brass pipework, dual smokestacks, and glowing amber headlights stomping along the maze.

---

## 2. Animation & Particle Pipeline (The Dota 2 Update)

In Robo Defense, units were static or 2-frame 2D sprites sliding across a flat grid. In **Aegis Florae**, we elevate the experience with Dota 2-level kinetic feedback, attack animations, and particle systems.

### 2.1 Tower Animation States
Every defensive structure possesses four distinct animation states:

1. **Idle Breathing (Ambient Loop):**
   - Petals gently sway in the breeze; exhaust vents emit faint puffs of steam.
   - Crystals hover and bob smoothly on a sinusoidal float curve (`y = sin(time * 2.0) * 4px`).
   - Brass gears rotate slowly; ambient mana conduits pulse with a soft sine-wave glow.
2. **Target Acquisition & Wind-Up (Anticipation):**
   - Turret heads pivot smoothly toward the targeted creep with calculated rotational inertia (damping factor `0.15`).
   - Muzzle barrels spin up (Gatling) or flower petals peel back like a blooming aperture (Bloom Cannon).
   - Glow conduits surge in brightness from 30% to 100% saturation.
3. **Fire & Release (Action):**
   - **Gatling Plinth:** Violent mechanical barrel recoil backwards against hydraulic pistons; high-contrast muzzle flash bursts (`15-20px` starburst sprite) accompanied by flying spent brass shell casings ejected sideways with physics bounce.
   - **Bloom Cannon:** Dramatic downwards squash of the flower stem as the mortar kicks back, launching a smoke-trailing physical spore projectile high into an arced parabolic ballistic curve.
   - **Prism Pillar:** The hovering crystal locks in place, radiating electrical lightning arcing to the four marble corner plinths, firing a continuous high-density volumetric laser beam that dynamically flickers with laser heat distortion.
4. **Post-Fire Dissipation (Follow-Through):**
   - Hot metal cools down, shifting from white-hot glow to red-amber before returning to normal brass.
   - Petal heat-sinks vent a burst of white vapor/steam sideways.

```
       +--------------------------------------------------------+
       |             TOWER FIRING ANIMATION TIMELINE            |
       +--------------------------------------------------------+
       | [Idle] ---> [Aim & Wind-up] ---> [Fire / Recoil] ----> |
       | (Swaying)     (Barrel Spin)        (Muzzle Flash)      |
       |                                     + Spent Shells     |
       |                                                        |
       | ---> [Heat Venting / Cool Down] ---> [Return to Idle]  |
       |        (Steam Puff / Glow Fade)                        |
       +--------------------------------------------------------+
```

### 2.2 Creep Movement & Damage Reactions
- **Locomotion:**
  - Tread tanks have animated rolling treads that lay down temporary dust trails on the marble pavers.
  - Bipedal and spider walkers feature inverted kinematics (IK) foot-planting animations with audible clanking footsteps.
  - Creeps lean into turns as they navigate corners of the player's maze (banking effect).
- **Hit Reactions (Visual Juice):**
  - **Flash White:** Units flash bright white for 1 frame (`16ms`) upon taking kinetic damage.
  - **Overhead Damage Numbers:** Floating combat text pops up in bold sans-serif numerals with color-coded damage:
    - Yellow: Physical / Kinetic
    - Cyan: Energy / Laser
    - Orange: Splash / Explosive
    - Purple: Sonic / Magic
    - Red / Exclamation Point: Critical Hit!
  - **Status Buffs & Debuffs (Dota Style):** Overhead circular debuff icons with radial timer sweeps:
    - *Frost/Slow:* Creep turns frost-tinted cyan with frost trail particles.
    - *Armor Shatter:* Cracked shield badge over head.
    - *Stun:* Spinning gold star halos over the unit.
- **Death & Scrap Explosions:**
  - Enemies do not vanish. They trigger a violent mechanical disassembly!
  - Sparks fly outward; metal chassis plates shear apart into 3-6 physics debris chunks that bounce on the grid and fade out.
  - A shower of golden scrap gears and cyan mana orbs burst toward the HUD resource counter.

---

## 3. Camera & Rendering Perspective

### 3.1 Perspective: 2.5D Orthographic Isometric
- **View Angle:** `30-degree` or `45-degree` true orthographic projection (no perspective distortion to maintain precise tile-clicking accuracy).
- **Layering & Depth Sorting (Y-Sorting):**
  - Entities with a higher `Y` coordinate render on top of entities with a lower `Y` coordinate.
  - High towers (e.g., Prism Pillar) cast soft, dynamic elongated shadows towards the bottom-right (simulating mid-afternoon solar lighting).
- **Controls & Navigation:**
  - Mouse wheel to zoom (0.75x wide battlefield overview to 2.0x cinematic close-up).
  - Middle-mouse drag or Edge-Panning to scroll across large grids.
  - Spacebar to instantly center the camera on the Sanctum or current wave front.

---

## 4. Dota-Inspired HUD & User Interface Specification

The HUD occupies the bottom 18-22% of the screen, styled like Dota 2's iconic stone-and-metal console dashboard.

```
+---------------------------------------------------------------------------------------------------------+
|                                         PLAYING FIELD (FULL SCREEN)                                     |
|                                                                                                         |
|  [Wave 14/100]  [Next: Siege Walkers in 12s]                       [Send Wave Now! (+45 Scrap)]         |
|                                                                                                         |
+---------------------------------------------------------------------------------------------------------+
|                                    DOTA-STYLE BOTTOM TRAY CONSOLE                                       |
+-------------------+-----------------------------+-----------------------------+---------------------+
|    MINI-MAP /     |       SANCTUM STATUS        |      TOWER BUILD DOCK       |  INSPECTOR & INFO   |
|   RADAR OVERVIEW  |                             |                             |                     |
|                   |  [Sanctum Core 3D Icon]     |  [Q]       [W]   [E]   [R]  |  [Selected Unit]    |
|   [Ground Grid]   |  HP: 2,500 / 2,500          | Gatling   Bloom  Prism Reso |  Name: Prism T2     |
|   - Creep dots    |  Scrap: 420  (+12/w)        |  100s     150s   175s  125s |  DPS: 180 (Energy)  |
|   - Tower blocks  |  Mana:  85 / 100            |                             |  Kills: 47          |
|   - Flow vector   |                             |  [D] Sanctum Root (30 Mana) |  [Upgrade: 220s]    |
|                   |  Score: 18,450              |  [F] Solar Ray   (70 Mana)  |  [Sell: +140s]      |
+-------------------+-----------------------------+-----------------------------+---------------------+
```

### 4.1 HUD Sections Breakdown
1. **Radar / Mini-Map (Bottom Left):**
   - Scaled tactical overview of the entire grid.
   - Green line showing the calculated shortest A* path.
   - Red dots representing active creeps.
   - Blue/tan boxes showing placed towers.
   - Clickable to jump camera position.
2. **Sanctum Status & Resources (Left Center):**
   - High-poly / animated Solarpunk Sanctum Core emblem.
   - Large health bar with green vitality pool and numeric readout.
   - Glowing Scrap resource counter (gear icon) and Mana resource counter (crystal icon).
3. **Tower Build Dock (Center):**
   - Four primary tower slots with hotkeys prominently stamped: `[Q]`, `[W]`, `[E]`, `[R]`.
   - Hovering displays high-detail tooltip with DPS, range, damage type, and upgrade previews.
   - Hotkeys `[D]` and `[F]` house Sanctum Global Super-Abilities.
4. **Unit Inspector & Upgrade Console (Right):**
   - When a placed tower is clicked:
     - Displays full 3D/animated portrait, kill count, total damage dealt, and range.
     - Targeting priority drop-down: `First`, `Last`, `Strongest`, `Weakest`, `Closest`.
     - Prominent **[Upgrade]** button (with branching T3 choice buttons) and **[Sell]** button (refunding 75% of invested scrap).
   - When an enemy creep is clicked:
     - Displays enemy speed, current health / max health, armor value, and special traits.

---

## 5. Audio Design & Soundscapes

### 5.1 Weapons & Combat SFX
- **Petal Razor / Gatling:** Crisp, rapid-fire staccato brass mechanical chatter (`brrrr-clack-clack`), followed by tinkling brass shells hitting stone.
- **Bloom Cannon:** Heavy mechanical latch opening, deep chest-thumping *THWUMP* mortar launch, high-pitched whistling descent, and concussive bass explosion with fluttering flower petal debris.
- **Prism Pillar:** High-voltage ozone hum, charging pitch that ramps up in frequency and volume as the beam sustains, sizzle sound of vaporizing metal on impact.
- **Resonance Monolith:** Deep acoustic sub-bass gong/thrum (`40Hz - 80Hz`) followed by a rippling crystal chime echo.

### 5.2 Environmental & UI Audio
- **Ambient Soundscape:** Soft Mediterranean wind rustling through olive trees, distant birdsong, gentle dripping fountain water, overlaid with the quiet, soothing rhythmic clockwork ticks of the Sanctum core.
- **UI & Placement:**
  - Tower placement: Solid, satisfying heavy marble stone clunk (`THUD-CLINK`).
  - Maze Block Warning: Muffled dual-tone warning buzzer.
  - Early Wave Call: Resonant bronze war horn sound.
- **Dota-Style Announcer:** Crisp, authoritative voice lines:
  - *"The Sanctum is under attack!"*
  - *"Path constructed. Incoming wave detected."*
  - *"Colossus approaching the perimeter!"*
  - *"Flawless defense."*
