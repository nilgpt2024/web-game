# Aegis Florae: Technical Architecture & Engine Specification

---

## 1. System Overview & Technology Stack

**Aegis Florae** is engineered to deliver zero-lag, 60+ FPS high-fidelity mazing gameplay on modern web platforms with responsive scaling across desktop and widescreen displays.

```
+-----------------------------------------------------------------------------------------+
|                                    APPLICATION STACK                                    |
+-----------------------------------------------------------------------------------------+
| PRESENTATION LAYER   | HTML5 Canvas / WebGL (PixiJS v8 / Three.js Orthographic Viewport)|
| AUDIO SUBSYSTEM      | Web Audio API (Synthesized spatial effects & dynamic mixing)     |
| SIMULATION ENGINE    | Fixed-timestep Game Loop (60 Hz tick rate)                       |
| PATHFINDING MODULE   | High-Performance A* Graph Solver + Flow Field Vector Matrix      |
| STATE & PROGRESSION  | Immutable Game State Manager + LocalStorage / Cloud Sync         |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Grid & Pathfinding System

### 2.1 Grid Data Structure
The battlefield is represented as a contiguous 1D typed array or 2D matrix representing tiles:
```typescript
interface GridTile {
  x: number;               // Column index (0..cols-1)
  y: number;               // Row index (0..rows-1)
  type: TileType;          // DIRT, MARBLE, WATER, WALL, TOWER
  towerId: string | null;  // Reference to placed tower entity
  cost: number;            // 1 = normal, Infinity = blocked
  isSpawn: boolean;
  isGoal: boolean;
}
```

### 2.2 Dynamic A* Pathfinding & Maze Validation Algorithm
Because every tower placed is a physical wall, the pathfinding engine must guarantee that **no tower placement can completely seal off the path from any spawn or active creep to the Sanctum**.

```
             [ User Hovers Tower Placement on Cell (X, Y) ]
                                   |
                                   v
             [ Temporarily mark Cell (X, Y) as BLOCKED ]
                                   |
                                   v
         +---------------------------------------------------+
         | Run Fast Path Search (Spawn Points -> Sanctum)    |
         +---------------------------------------------------+
                                   |
                  +----------------+----------------+
                  |                                 |
              [ Path Exists? ]               [ No Path Found! ]
                  |                                 |
                  v                                 v
         +------------------------+      +-------------------------+
         | Also check all active  |      | Ghost turns RED         |
         | Creeps on board!       |      | Play Error Chirp        |
         +------------------------+      | Disallow Click / Place  |
                  |                      +-------------------------+
         +--------+--------+
         |                 |
     [ All OK ]      [ Creep Trapped! ]
         |                 |
         v                 v
  [ Ghost Green ]    [ Ghost Red ]
  [ Allow Place ]    [ Disallow ]
```

#### The Path Validation Code Architecture:
```typescript
class PathfindingEngine {
  private grid: GridTile[][];
  private width: number;
  private height: number;
  private spawns: Point[];
  private goal: Point;

  /**
   * Evaluates whether a proposed placement is legal without modifying actual board state.
   */
  public canPlaceTower(tx: number, ty: number, activeCreeps: Creep[]): boolean {
    if (this.grid[ty][tx].cost === Infinity) return false; // Already occupied

    // 1. Speculatively mark as blocked
    this.grid[ty][tx].cost = Infinity;

    // 2. Validate that each spawn still has an open path to the goal
    let valid = true;
    for (const spawn of this.spawns) {
      const path = this.findPathAStar(spawn, this.goal);
      if (!path || path.length === 0) {
        valid = false;
        break;
      }
    }

    // 3. Validate that existing creeps on the board are not trapped inside a closed box
    if (valid) {
      for (const creep of activeCreeps) {
        const creepPos = { x: Math.floor(creep.x), y: Math.floor(creep.y) };
        const path = this.findPathAStar(creepPos, this.goal);
        if (!path || path.length === 0) {
          valid = false;
          break;
        }
      }
    }

    // 4. Revert speculative block
    this.grid[ty][tx].cost = 1;
    return valid;
  }
}
```

### 2.3 Flow Field Optimization for High Swarms (200+ Creeps)
When creep counts exceed 100 on screen, running individual A* queries per unit becomes redundant. The engine computes an **Integration Flow Field**:
1. Run a single backward Dijkstra flood-fill from the Sanctum (Goal) outward across all open tiles to generate a distance potential field.
2. Calculate the normalized gradient vector for each tile pointing toward the adjacent neighbor with the lowest potential cost.
3. Creeps simply sample the vector of the tile they occupy:
   $$\vec{v} = \text{VectorField}(x, y) \times \text{Speed}$$
4. When a tower is placed, only the flow field is updated once, and all 300+ creeps instantly redirect smoothly with zero per-frame pathfinding CPU overhead.

---

## 3. Entity Component Architecture

To maintain high performance and clean separation of concerns, the simulation uses an Entity-Component-System (ECS) pattern.

```
       +-------------------------------------------------------------+
       |                        ECS FRAMEWORK                        |
       +-------------------------------------------------------------+
       | ENTITIES    | Tower, Creep, Projectile, Particle, TextPop   |
       | COMPONENTS  | Position, Velocity, Health, Armor, Targeter,  |
       |             | Renderable, ParticleEmitter, Lifetime         |
       | SYSTEMS     | MovementSystem, TargetAcquisitionSystem,      |
       |             | CombatSystem, ParticleSystem, RenderSystem    |
       +-------------------------------------------------------------+
```

### 3.1 Combat & Targeting Pipeline
Towers execute target selection every tick:
1. **Range Filtering:** Scan spatial hash grid for creeps within radius $R$.
2. **Prioritization Filter:** Sort candidates based on current tower strategy:
   - `First`: Furthest along the path (lowest distance-to-goal in flow field).
   - `Last`: Closest to spawn.
   - `Strongest`: Highest current HP.
   - `Weakest`: Lowest current HP.
   - `Closest`: Minimum Euclidean distance to tower.
3. **Weapon State Machine:**
   - **Continuous (Prism Pillar):** Retains locked target; ramps damage delta per millisecond. Breaks lock if target exits range or dies.
   - **Ballistic (Spore Mortar):** Solves parabolic flight trajectory. Projectile takes $t = \text{distance} / v$ seconds; explodes on arrival coordinates.
   - **Direct Kinetic (Gatling Plinth):** High-speed bullet entity with raycast sweep to prevent tunneling through fast creeps.

---

## 4. Rendering & Particle Pipeline (Dota 2 Visual Fidelity)

### 4.1 Particle System & Object Pooling
To prevent garbage collector (GC) stutters during massive swarm battles, **zero allocations occur during runtime**.
- Pre-allocated pool of `3,000 Particle` objects and `500 FloatingCombatText` objects.
- Particles support:
  - Position, velocity, acceleration, rotational speed.
  - Color transitions (e.g., bright cyan `#00F5D4` fading into transparent deep blue `#001233`).
  - Size over lifetime curves (expansion upon explosion, shrink on fade).
  - Blend modes: `ADDITIVE` for energy beams and explosions, `NORMAL` for stone dust and spent brass casings.

### 4.2 Dynamic Post-Processing & Screen Shake
- **Screen Shake:** Triggered by heavy mortar impacts and boss death explosions. Generates trauma decay:
  $$\text{Offset}_X = \text{Random}(-1, 1) \times \text{Trauma}^2 \times \text{MaxShake}$$
- **Bloom & Conduits:** WebGL post-processing shader with dual-pass Kawase blur highlights energy conduits, laser beams, and glowing flowers while keeping background marble crisp.

---

## 5. Audio Subsystem (Web Audio API)

All audio is driven programmatically via the browser's native **Web Audio API**:
- **Zero Asset Loading Stalls:** Weapon sounds are either synthesized via oscillators, noise buffers, and biquad filters, or streamed via lightweight compressed audio buffers.
- **Dynamic Low-Pass Filter:** When the Sanctum is below 25% health, master audio routes through a resonant 400Hz low-pass filter with an ominous heartbeat pulse, heightening cinematic tension.
- **Spatial Positioning:** Turret shots and creep deaths are panned according to their X position on the battlefield (`AudioContext.createPanner`).

---

## 6. Performance Budget & Targets

```
+---------------------------+-----------------------------------+
| Metric                    | Target Limit                      |
+---------------------------+-----------------------------------+
| Frame Rate                | 60 FPS rock-solid (16.6ms frame)  |
| Max Creeps on Screen      | 350 simultaneous active units     |
| Max Active Projectiles    | 200 physical / beam entities      |
| Max Active Particles      | 2,500 simultaneous particles      |
| A* Maze Recalculation     | < 2.0 ms per tower placement      |
| Memory Footprint          | < 75 MB RAM heap                  |
+---------------------------+-----------------------------------+
```
