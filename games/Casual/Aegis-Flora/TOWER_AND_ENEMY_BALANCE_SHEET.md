# Aegis Florae: Tower & Enemy Balance Specification

---

## 1. Mathematical Formulas & Damage Models

### 1.1 Damage Mitigation & Armor Formula
Following the proven, highly legible armor model from **Dota 2**, armor provides diminishing returns of effective HP (EHP) without hard caps:

$$\text{Damage Multiplier} = 1 - \frac{0.06 \times \text{Armor}}{1 + 0.06 \times |\text{Armor}|} \quad (\text{for Armor} \ge 0)$$

For negative armor (e.g. stripped by the Resonance Monolith):
$$\text{Damage Multiplier} = 2 - (1 - 0.06)^{|\text{Armor}|}$$

```
+------------+-------------------+--------------------+
| Armor Value| Damage Taken (%)  | Effective HP (+%)  |
+------------+-------------------+--------------------+
| -10        | 171.8% (+71.8%)   | 58.2%              |
| -5         | 133.8% (+33.8%)   | 74.7%              |
| 0          | 100.0%            | 100.0%             |
| 5          | 76.9%  (-23.1%)   | 130.0%             |
| 10         | 62.5%  (-37.5%)   | 160.0%             |
| 20         | 45.5%  (-54.5%)   | 220.0%             |
+------------+-------------------+--------------------+
```

### 1.2 Damage & Armor Interaction Matrix
- **Kinetic (Yellow):** Strong against unarmored and light units (+25%); weak against heavy mechanized plates (-40%).
- **Explosive / AoE (Orange):** Moderate against all ground targets; shreds tightly packed swarms with quadratic splash falloff.
- **Energy Beam (Cyan):** Ignores 50% of armor; ramps up sustained DPS against single heavy targets.
- **Sonic / Void (Purple):** Deals pure damage (ignores all armor completely); applies armor stripping debuffs.

---

## 2. Comprehensive Tower Arsenal Specifications

```
+---------------------------------------------------------------------------------------------------+
| TOWER 1: PETAL RAZOR / GATLING PLINTH (Direct Kinetic Blaster)                                    |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
| Tier  | Name               | Cost  | Dmg   | Atk Spd | Range  | DPS    | Special Abilities        |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
| T1    | Petal Razor        | 100s  | 18    | 5.0/s   | 3.5 tl | 90     | Baseline rapid-fire      |
| T2    | Vulcan Pedestal    | 160s  | 28    | 6.5/s   | 4.0 tl | 182    | +1% AtkSpd/s of fire     |
| T3-A  | Phalanx Storm      | 320s  | 42    | 8.0/s   | 4.5 tl | 336    | Incendiary rounds (-3 Ar)|
| T3-B  | Rail-Needler       | 350s  | 120   | 2.5/s   | 5.5 tl | 300    | Pierces 3 creeps in line |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+

+---------------------------------------------------------------------------------------------------+
| TOWER 2: SPORE MORTAR / BLOOM CANNON (Bomb / Flak Artillery)                                      |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
| Tier  | Name               | Cost  | Dmg   | Atk Spd | Range  | Splash | Special Abilities        |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
| T1    | Spore Mortar       | 150s  | 120   | 0.65/s  | 6.0 tl | 1.8 tl | High AoE ground splash   |
| T2    | Cluster Sporepod   | 220s  | 210   | 0.70/s  | 6.5 tl | 2.4 tl | Spawns 2 sub-munitions   |
| T3-A  | Skyburst Flak      | 420s  | 380   | 0.85/s  | 7.5 tl | 3.0 tl | 2.5x Dmg vs Flying units |
| T3-B  | Cataclysm Bloom    | 460s  | 450   | 0.55/s  | 6.0 tl | 3.2 tl | Echo slam fissures, slow |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+

+---------------------------------------------------------------------------------------------------+
| TOWER 3: PRISM PILLAR (Sustained Focus Beam)                                                      |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
| Tier  | Name               | Cost  | Dmg   | Ramp Time Range  | Max DPS| Special Abilities        |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
| T1    | Prism Pillar       | 175s  | 40    | 3.0 sec | 4.5 tl | 240    | Continuous melting beam  |
| T2    | Focus Lens Monolith| 250s  | 75    | 2.5 sec | 5.0 tl | 450    | Stores ramp charge 0.5s  |
| T3-A  | Sol Invictus       | 500s  | 140   | 2.0 sec | 6.0 tl | 850    | Piercing continuous line |
| T3-B  | Refraction Prism   | 480s  | 90    | 2.5 sec | 5.0 tl | 540x3  | Splits beam to 3 targets |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+

+---------------------------------------------------------------------------------------------------+
| TOWER 4: RESONANCE MONOLITH (Radial Acoustic Crowd Control)                                       |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
| Tier  | Name               | Cost  | Dmg   | Interval| Range  | Slow % | Special Abilities        |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
| T1    | Resonance Monolith | 125s  | 15    | 1.5 sec | 3.0 tl | 35%    | 2.0s slow aura pulse     |
| T2    | Harmonic Dampener  | 200s  | 35    | 1.3 sec | 3.5 tl | 50%    | Slows enemy cast/charge  |
| T3-A  | Chrono-Stutter     | 380s  | 60    | 1.2 sec | 4.0 tl | 55%    | Every 4th pulse = stun   |
| T3-B  | Resonance Shatter  | 400s  | 80    | 1.0 sec | 4.0 tl | 40%    | -6 Armor, +35% taken dmg |
+-------+--------------------+-------+-------+---------+--------+--------+--------------------------+
```

---

## 3. Enemy Waves & Scaling Formulas

### 3.1 Base Creep Types
```
+-------------------+---------+-----------+--------+-------+---------+--------------------------+
| Creep Name        | Base HP | Speed     | Armor  | Type  | Bounty  | Tactical Weakness        |
+-------------------+---------+-----------+--------+-------+---------+--------------------------+
| Skitter Scout     | 110     | 2.2 tl/s  | 0      | Light | 5s      | Vulnerable to Gatling    |
| Steam Prowler     | 280     | 1.6 tl/s  | 2      | Med   | 10s     | Vulnerable to Bloom AoE  |
| Tread Tank        | 850     | 0.9 tl/s  | 8      | Heavy | 22s     | Vulnerable to Beam melt  |
| Rotor Drone       | 320     | 1.8 tl/s  | 1      | Air   | 14s     | Ignores maze; needs Flak |
| Dreadnought Ram   | 3,200   | 0.7 tl/s  | 12     | Siege | 60s     | Requires Stun + Beam     |
| Goliath Colossus  | 16,000  | 0.45 tl/s | 16     | Boss  | 350s    | Massive multi-phase boss |
+-------------------+---------+-----------+--------+-------+---------+--------------------------+
```

### 3.2 Wave Scaling Formula
For any given wave $W \in [1, 50]$ (implemented in `game.html` as `hpScale`):

$$\text{Creep HP}(W) = \text{Base HP} \times \left(1 + 0.22(W-1) + 0.012(W-1)^2\right) \times E(W)$$

where $E(W) = 1 + 0.7(1 - W/25)$ for $W \le 25$ (early-game pacing bump: +67% at wave 1,
+42% at wave 10, +14% at wave 20, fading to 1.0 by wave 25) and $E(W) = 1$ after.
Review note: the in-code quadratic curve is already ~2.3x more aggressive late than the
original $1 + 0.18W + 0.012W^{1.65}$ design formula, so no late-game coefficient change
was needed — the bump lives entirely in $E(W)$ and base HP values are untouched, keeping
the tuned late game neutral.

New archetypes: **Phase Blink** (320 HP, 0.5s gold-glow telegraph then teleport 3–5 tiles,
waves 15+, ~1 per 15 regulars capped 3–6, killable mid-charge) and **Rift Dart**
(12 HP ≈ 40% of a same-wave Scout, 5.4 speed phase-sprint with cyan afterimage trail,
waves 25+ in pairs, trio from wave 30).

$$\text{Kill Bounty}(W) = \text{Base Bounty} \times \left(1 + 0.04 \times W\right)$$

- **Wave 10 Boss (Iron Centurion):** 4,800 HP, 8 Armor.
- **Wave 30 Boss (Aegis Breaker):** 28,500 HP, 14 Armor, deploys drone escorts.
- **Wave 50 Boss (Titanus Colossus):** 110,000 HP, 20 Armor, immune to slow for 3s every 10s.
- **Wave 100 Final Boss (The Rust God):** 750,000 HP, 25 Armor, EMP wave disabling towers periodically.

---

## 4. Economy, Interest, and Early Call Bonus

### 4.1 Scrap Generation
1. **Starting Scrap:** `350 Scrap` (standard baseline).
2. **Interest System:** At the conclusion of each wave, the player earns **5% interest** on held Scrap reserves, capped at `+50 Scrap per wave` (reached at 1,000 banked Scrap). This creates a strategic push-and-pull between spending on towers immediately versus banking for compounding interest.
3. **Early Wave Call Bonus:**
   Calling the next wave with $T_{\text{remaining}}$ seconds left on the prep timer awards:
   $$\text{Bonus Scrap} = \text{Floor}\left(T_{\text{remaining}} \times 2.5 \times \sqrt{\text{Wave}}\right)$$
   Additionally, enemies in early-called waves grant +15% bonus scrap bounty on death.

---

## 5. Sanctum Super-Abilities (Dota-Style Global Spells)

Players build **Solar Mana** passively at a rate of `4.0 Mana/sec` (max capacity 100 Mana).

1. **Verdant Overgrowth (`Hotkey: D`):**
   - Cost: `35 Mana` | Cooldown: `25 seconds`
   - Effect: Thick, thorned floral vines erupt in a 4x4 grid tile radius. All creeps inside are **rooted** (movement speed reduced to 0) for `3.5 seconds` and take `60 Magic DPS`.
2. **Solar Beam Orbital Flare (`Hotkey: F`):**
   - Cost: `75 Mana` | Cooldown: `60 seconds`
   - Effect: Calls down an incandescent solar beam from the sky onto a targeted location. Deals `800 Energy Damage` on initial impact in a 3-tile radius and leaves a searing ground crater for 6 seconds that burns creeps for `120 DPS`.
