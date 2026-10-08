# Master Art & Graphics Overhaul Specification
> *A production-grade prompt and art direction manifesto to elevate Aegis Florae to commercial AAA visual fidelity.*

---

## How to Use This Prompt
Copy and paste the prompt in **Section 1** into your AI generation workflows, give it to a 3D technical artist/developer, or feed it to an LLM/agent to execute next-level visual refactoring.

---

## 1. The Master Prompt (Copy & Paste Ready)

```markdown
Act as a Principal Technical Artist and Art Director with experience shipping AAA PC/Console strategy titles (e.g., Dota 2, Warhammer 40k: Dawn of War, Frostpunk, Into the Breach). 

Your goal is to completely overhaul the visual fidelity, color grading, surface materials, lighting, and HUD design of "Aegis Florae" — an open-field mazing tower defense game that fuses Classical Greco-Roman ruins with lush solarpunk flora and heavy dieselpunk automata.

Anchor all artistic and technical decisions to this visual target:
- Master Reference: Crumbling Carrara marble ruins (fluted Ionic/Corinthian columns with Corinthian capitals and friezes) overgrown with dense golden chrysanthemums, blooming pink peonies, and creeping ivy.
- Backdrop: Deep cerulean-teal sky with brooding, dark chiaroscuro cumulus clouds and distant snow-dusted alpine peaks.
- Tech Contrast: Weathered cast-iron boilers, riveted antique brass gears, clockwork linkages, and intense glowing cyan/amber energy conduits.

Execute improvements across these six core visual pillars:

### 1. PBR Material & Texture Realism
- Eliminate all flat, untextured shading. Every surface must exhibit multi-layered PBR depth:
  - Marble: Diffuse color map with subtle grey veins, micro-roughness map (0.25–0.45) with polished highlights on pediment tops and edge wear/chips on corners, and subtle Subsurface Scattering (SSS) for stone translucency.
  - Antique Brass: High metallic (0.88–0.94), medium roughness (0.22–0.32), green-copper patina staining in crevices, and edge-scuff specular highlights.
  - Cast Iron: Anisotropic brush lines, dark gunmetal diffuse, surface pitting/hammer marks, and carbon soot buildup near exhaust stacks and gun muzzles.
  - Organic Foliage: Two-sided subsurface transmission so sunlight shines through peony petals; glossy leaf coats with specular sheen.

### 2. Volumetric Lighting & Atmospheric Chiaroscuro
- Implement a three-tone lighting model inspired by classical Romantic landscape paintings:
  - Key Sun: Warm golden sunlight (#FFF4DC at 3.0 Intensity) casting long, soft contact-hardening shadows across the marble pavers.
  - Ambient Fill: Deep cerulean teal (#0E3844) to lift shadows with dramatic cinematic contrast.
  - Rim / Accent Light: Incandescent solar amber highlights catching the silhouette edges of turrets, mechs, and column capitals.
- Atmospheric FX: Volumetric god rays (crepuscular sun shafts) penetrating through the colonnade gaps, accompanied by 400+ floating golden dust/pollen motes drifting on wind vector fields.

### 3. World & Environment Dressing
- The playing grid must feel like an authentic, ruined temple courtyard rather than a floating checkerboard:
  - Stone Flagstones: Cracked, uneven marble pavers with inlaid geometric brass/gold labyrinthine mosaic runes along the main arterial paths.
  - Dynamic Ground Decals: Lingering scorch marks, cracked impact craters from mortar shells, oil slicks from defeated tanks, and patches of moss clustering in the tile seams.
  - Floral Clustering: Instead of sparse buds, place multi-layered floral embankments—weeping wisteria vines draping from architraves, dense chrysanthemum bushes, and tumbling peony blooms overflowing stone plinths.

### 4. 3D Combat Juice & Particle Telemetry (Dota 2 Polish)
- Weapon Feedback:
  - Gatling Turrets: High-contrast kinetic tracer streams with motion blur, expanding starburst muzzle flashes with dynamic point light flickers, and spent brass shell casings ejected sideways with gravity, ground collision, and physical bouncing.
  - Bloom Mortars: 3D parabolic arcing shells leaving billowing smoke trails, detonating into a 2-stage explosion: instantaneous blinding white-orange flash followed by an expanding circular ground dust shockwave and glowing shrapnel embers.
  - Prism Pillars: High-density volumetric cyan laser beam with an intense white-hot core, Fresnel bloom halo, and violent sparking contact effects that heat the enemy's armor plate red-hot.
  - Resonance Obelisks: Concentric 3D planar distortion shockwaves rippling across the tiles, accompanied by ground-hugging mist rings and armor-shattering violet runes.
- Creep Hit & Death Reactions:
  - 1-frame white flash on hit, followed by directional mechanical knockback/stagger.
  - Floating 3D combat numbers in bold sans-serif text (Yellow = Kinetic, Orange = Blast, Cyan = Energy, Purple = Sonic) with physics pop and decay.
  - Death Disassembly: Enemies burst into 4–8 physics-simulated debris chunks (sheared armor plates, rolling cogs, loose tread links) with showers of sparks and scrap gold gear icons.

### 5. Color Theory & Visual Hierarchy
- Strictly enforce the 60-30-10 Rule to preserve competitive readability:
  - 60% Foundation: Muted natural tones (Carrara ivory, weathered travertine, slate iron) to keep the playing field readable.
  - 30% Organic Life: Vibrant natural saturations (peony magenta, chrysanthemum gold, jade moss) to frame boundaries and choke points.
  - 10% High-Energy Action: Max-luminance telegraphed colors reserved strictly for combat: Electric Cyan (#00F5D4) for player mana/lasers, Incandescent Amber (#FF6B35) for explosions, Hostile Crimson (#FF3B30) for boss headlights/critical danger.

### 6. AAA Dota-Style Console HUD
- Bottom console tray styled in cast iron, dark slate, and beveled brass trim:
  - Tactile Minimap: High-contrast radar in the bottom-left with real-time creep dots, tower silhouettes, green glowing A* trajectory line, and a camera frustum cone.
  - Unit Inspector: High-resolution animated 3D unit portrait, live DPS meter, kill tally, and brass-framed branching upgrade buttons with detailed mouseover tooltips.
  - Typography: Clean classical serif headers (Georgia/Cinzel) paired with hyper-legible modern monospace stats (Courier/Roboto Mono).
```

---

## 2. Key Visual Benchmark Breakdown

```
+----------------------------------------------------------------------------------------------------------+
|                                     THE 60 - 30 - 10 COLOR HIERARCHY                                     |
+------------------------------------+------------------------------------+--------------------------------+
| 60% BASE ARCHITECTURE              | 30% BIOLUMINESCENT FLORA           | 10% COMBAT FX & TELEMETRY      |
+------------------------------------+------------------------------------+--------------------------------+
| - Carrara Marble: #F4EEDD          | - Peony Magenta: #E05780           | - Solar Cyan Beam: #00F5D4     |
| - Weathered Travertine: #CFC4A8    | - Chrysanthemum Gold: #FFB703      | - Explosive Amber: #FF6B35     |
| - Dark Gunmetal Iron: #22262B      | - Clover Leaf Green: #2D7246       | - Resonance Sonic: #7209B7     |
| - Gunmetal Bronze: #4A3B32         | - Patina Verdigris: #5E9B8A        | - Hostile Red Alert: #FF3B30   |
+------------------------------------+------------------------------------+--------------------------------+
```

---

## 3. Implementation Checklist for 3D & Technical Artists

1. **Shader Graphs / Materials:**
   - [ ] Implement a **Triplanar Marble Shader** with world-space moss accumulation in concave crevices.
   - [ ] Build a **Foliage Two-Sided Subsurface Scattering Shader** with vertex-wind animation for sway.
   - [ ] Add an **Armor Heat/Damage Decal Shader** that glows red-orange where continuous beams hit.
2. **Post-Processing Pipeline:**
   - [ ] **Bloom:** Dual-pass Kawase blur tuned to threshold `0.85` so only crystals and muzzle flashes glow.
   - [ ] **Ambient Occlusion (SSAO):** Darkens crevices where pillars meet flagstones and under mech treads.
   - [ ] **Color Grading:** ACES tonemapper with lifted mid-tones and cooled shadow teal tints.
3. **Audio-Visual Sync:**
   - [ ] Match screen-shake trauma decay curves directly to mortar detonation radius.
   - [ ] Add spatial audio panning to weapon discharges based on 3D viewport coordinates.
