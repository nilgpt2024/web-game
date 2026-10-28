# Turbo Kart Rally — Architecture Contract

A kart racer in the spirit of Mario Kart, built with **Three.js r170** as native ES modules (no build step).
`index.html` loads `src/main.js` through an import map (`three`, `three/addons/…`). Serve with
`python3 -m http.server 8080` from the project root and open `http://localhost:8080`.

**Original IP only**: no Nintendo names, characters, logos, or assets. Everything is procedural
(geometry, textures via CanvasTexture, audio via WebAudio). No external asset files.

## Conventions (everyone must follow)

- 1 unit = 1 meter. **Y is up.** Track lies in the XZ plane (with gentle elevation allowed).
- Kart heading `h` (radians) is `object3D.rotation.y`. **Forward vector = (sin h, 0, cos h)**. Models face **+Z**.
- Driver's right vector = forward × up = **(−cos h, 0, sin h)** (at h = 0 the kart faces +Z and its right side is −X).
  Turning right therefore means *decreasing* heading.
- `input.steer`: **+1 = turn toward driver's right**, −1 = left.
- Shared tuning lives in `src/config.js` (`PHYSICS`, `RACE`, `CHARACTERS`, `ITEMS`, `DIFFICULTY`, `KEYS`). Import; don't duplicate.
- Cross-system notifications go through `bus` from `src/events.js` (`bus.on(name, fn)`, `bus.emit(name, data)`).
- Only import `three` and `three/addons/...`. No other dependencies.
- Every module must be robust: no throwing in the frame loop; guard against missing optional fields.
- Dispose of anything you create when `dispose()` is called (race restart creates a fresh world).

## Module ownership

| File(s) | Owner | Exports |
|---|---|---|
| `src/track.js`, `src/environment.js` | Agent 1 — World | `createTrack(scene, renderer)` |
| `src/kart.js`, `src/ai.js`, `src/input.js` | Agent 2 — Driving | `Kart`, `resolveKartCollisions`, `AIDriver`, `InputController` |
| `src/items.js`, `src/effects.js` | Agent 3 — Items & FX | `ItemSystem`, `Effects` |
| `src/models.js`, `src/camera.js` | Agent 4 — Art & Camera | `createKartModel`, `createItemModel`, `ChaseCamera` |
| `src/main.js`, `src/race.js`, `src/hud.js`, `src/menu.js`, `src/audio.js`, `src/styles.css` | Agent 5 — Game & UI | game loop, `RaceManager`, `HUD`, `Menu`, `AudioEngine` |

Do **not** edit files you don't own. If you need something from another module, code against this contract.

---

## 1. World — `src/track.js`

```js
export function createTrack(scene, renderer) // -> Track (adds everything to scene: road, walls, scenery, sky, lights, fog)
```
`Track` object:
| member | type | meaning |
|---|---|---|
| `name` | string | display name, e.g. "Sunset Bay Circuit" |
| `curve` | `THREE.CatmullRomCurve3` (closed) | road centerline (y = road height) |
| `length` | number | curve length (~1600–2200 units; lap ≈ 45–60 s) |
| `roadWidth` | number | full paved width (~24) |
| `startPositions` | `Array<{position: Vector3, heading: number}>` length ≥ 8 | grid slots behind the start line; index 0 = pole |
| `itemBoxPositions` | `Vector3[]` | centre of each item box (rows of 4–6 across the road, 4+ rows) |
| `minimap` | `{ points: Array<{x,z}>, bounds: {minX,maxX,minZ,maxZ} }` | ≥ 200 centerline samples for HUD minimap |
| `getSurfaceInfo(pos: Vector3, hintT?: number)` | → `{ height, normal: Vector3, surface, t, lateral, onRoad }` | `height` = ground Y under pos; `surface` ∈ `'road'|'offroad'|'boost'|'jump'`; `t` ∈ [0,1) progress along centerline (0 = start/finish line, increasing in race direction); `lateral` = signed distance from centerline (+ = right of race direction); `hintT` = previous t for fast local search |
| `resolveWall(pos: Vector3, radius: number)` | → `null` or `{ normal: Vector3, depth: number }` | outer barrier collision; caller pushes pos by `normal*depth` and reflects velocity |
| `getPointAt(t)` / `getTangentAt(t)` | Vector3 | centerline point / unit forward direction at t |
| `getRacingLine(t)` | Vector3 | a good AI line point (cuts apexes); defaults to centerline |
| `update(dt, time)` | | animate water, flags, crowds, etc. |
| `dispose()` | | |

Surfaces: `boost` pads (dash panels, glowing chevrons) and `jump` ramps (kart gets upward launch) placed on the road.
Offroad (grass/sand) runs a few meters outside the road before the barrier.
The race direction at t=0 must match `startPositions[i].heading`.

## 2. Driving — `src/kart.js`, `src/ai.js`, `src/input.js`

```js
export class Kart {
  constructor({ scene, track, character /* CHARACTERS entry */, isPlayer, index /* 0..7 */, model /* from createKartModel */ })
  // state (read by others):
  object3D          // THREE.Group added to scene; contains model.root
  position          // Vector3 (== object3D.position)
  velocity          // Vector3
  heading           // radians
  speed             // signed forward speed (units/s)
  radius            // PHYSICS.kartRadius (× 0.6 while shrunk)
  input             // { throttle 0..1, brake 0..1, steer -1..1, drift bool (held), item bool (pressed this frame), lookBack bool }
  isPlayer, character, index
  trackT            // last t from track.getSurfaceInfo
  surface           // current surface string
  airborne          // bool
  drifting, driftDir (-1|1), driftLevel (0..3), boostTimer, starTimer, shrinkTimer, spinTimer, invulnTimer
  item              // null | item id held (set by ItemSystem)
  itemCount         // for triple items
  controlsLocked    // bool — RaceManager sets true during countdown / after finish (AI keeps driving after finish)
  // race fields maintained by RaceManager: lap, place, finished, finishTime, raceProgress
  update(dt)
  applyHit(kind)     // 'spin' (banana), 'tumble' (shell/blue shell), 'shrink' (lightning); ignored while starTimer>0 or invulnTimer>0
  applyBoost(seconds, strength = 1)
  startStar(seconds)
  get forward()      // Vector3 unit
  reset(position, heading)
  dispose()
}
export function resolveKartCollisions(karts) // pairwise sphere push, weight-based; star kart spins non-star karts
```
Arcade feel requirements: snappy acceleration, drift by holding drift while steering (small hop on press),
3-level mini-turbo (blue→orange→purple sparks) released as boost, boost pads, jump ramps with airtime,
offroad slowdown (ignored while boosting/star), wall bounce, slope following via `getSurfaceInfo().normal`,
start-line rocket boost (press throttle during last part of countdown — RaceManager emits `race:countdown`).
Kart calls `model.animate(...)` each frame (see §4).

Events the Kart must emit (on `bus`):
`kart:driftStart {kart}`, `kart:driftLevel {kart, level}`, `kart:driftEnd {kart}`, `kart:miniTurbo {kart, level}`,
`kart:boost {kart, source}`, `kart:hit {kart, kind}`, `kart:wallBump {kart, intensity}`, `kart:jump {kart}`, `kart:land {kart}`,
`kart:bump {a, b, intensity}`.

```js
export class AIDriver { constructor(kart, track, { difficulty /* key of DIFFICULTY */ }); update(dt, raceContext) }
// raceContext = { karts, player, itemSystem, time }. Sets kart.input each frame: follows track.getRacingLine with look-ahead,
// drifts on long corners, avoids item/banana hazards via itemSystem.getHazards(), uses items tactically
// (by setting input.item = true), rubber-bands relative to player's raceProgress, varied personalities.

export class InputController { constructor(); getInput() /* same shape as kart.input */; isPressed(action); consumePressed(action); dispose() }
// keyboard (KEYS in config) + Gamepad API. `item` is edge-triggered. Also exposes `pausePressed` via consumePressed('pause').
```

## 3. Items & FX — `src/items.js`, `src/effects.js`

```js
export class ItemSystem {
  constructor({ scene, track, karts })
  update(dt, time)          // item boxes (spin/bob, respawn after 2 s), projectiles, hazards, collisions with karts
  getHazards()              // Array<{ position: Vector3, radius, type }> for AI avoidance
  // Each frame, for every kart with kart.input.item === true and kart.item set -> use it.
  // Roulette: on box pickup, emit item:roulette and assign kart.item after ~1.5 s (player) / instantly-ish for AI,
  // weighted by kart.place (leaders get bananas/green shells; back gets stars/lightning/triple mushrooms; blue shell rare, never to 1st).
  // Holding a banana/shell behind the kart (drag) while input.item held is a nice-to-have.
  rouletteState(kart)       // { spinning: bool, displayItem } for HUD
  dispose()
}
```
Items: mushroom (boost), triple_mushroom, banana (spin hazard; can be thrown forward if steer/throttle up else dropped behind),
green_shell (straight, bounces off walls ~5 times, 8 s life), red_shell (homes on kart ahead following the track),
star (invincible, faster, rainbow), lightning (shrinks all opponents, spins them), blue_shell (seeks 1st place, big explosion).
Use `createItemModel(type)` from models.js for visuals. Emit `item:pickup {kart}`, `item:roulette {kart}`, `item:got {kart, item}`,
`item:use {kart, item}`, `item:hit {kart, item, by}`, `item:explode {position}`, `item:lightning {by}`.

```js
export class Effects {
  constructor(scene, camera)
  update(dt, karts)         // continuous: drift sparks per level colour, boost flames at exhaust, offroad dust, star sparkle, tire smoke
  burst(kind, position, opts) // 'explosion', 'confetti', 'itemBox', 'hitStars', 'splash', 'landingDust'
  dispose()
}
```
Effects subscribe to bus events themselves (kart:*, item:*). Pooled particles (InstancedMesh or Points), no per-frame allocations.
Exhaust / wheel positions come from `kart.object3D` + `model.anchors` (§4).

## 4. Art & Camera — `src/models.js`, `src/camera.js`

```js
export function createKartModel(character) // -> KartModel
KartModel = {
  root: THREE.Group,                      // faces +Z, origin at ground contact centre, ~2.4 long, ~1.6 wide
  anchors: { exhaustL, exhaustR, wheelRL, wheelRR, wheelFL, wheelFR, itemHold /* behind kart */ } // THREE.Object3D children of root
  animate({ dt, speed, steer, drifting, driftDir, boosting, airborne, spin /* 0..1 spin-out phase */, star /* bool */, time }),
  setShrunk(scale),                       // visual scale
  dispose()
}
export function createItemModel(type) // -> THREE.Object3D for 'item_box', 'banana', 'green_shell', 'red_shell', 'blue_shell', 'mushroom', 'star', 'lightning'
export function createCharacterPortrait(character) // -> dataURL string (canvas 128x128) for menus/HUD
```
Stylized, chunky, colourful, readable at speed: chassis, bumpers, spoiler, 4 wheels with rims & treads, steering wheel,
driver with head/eyes/hat per `character.hat`, animated body lean, wheel spin, suspension bob, steer angle.
MeshStandardMaterial / MeshToonMaterial, cast shadows.

```js
export class ChaseCamera {
  constructor(camera /* PerspectiveCamera */)
  update(dt, kart, { lookBack, mode /* 'race'|'countdown'|'finish'|'intro' */ })
  // Smooth spring follow, FOV widens with speed/boost, slight shake on hits/boost, drift offset,
  // intro flyover around the start grid during 'intro', orbiting shot on 'finish'.
  snap(kart)                // hard reset behind kart
}
```

## 5. Game & UI — `src/main.js`, `src/race.js`, `src/hud.js`, `src/menu.js`, `src/audio.js`, `src/styles.css`

Game flow: **Title → Character select (8 racers, stats bars) → Difficulty/laps → Intro flyover → Countdown 3-2-1-GO → Race (3 laps) → Results → Restart/Menu**. Pause menu (Esc).

`main.js` owns renderer (antialias, ACES tone mapping, sRGB, PCF soft shadows), `PerspectiveCamera`,
post-processing (EffectComposer + UnrealBloomPass, subtle), resize handling, and the loop:

```
dt = min(clock.getDelta(), 1/30)
playerKart.input = controlsLocked ? neutral : inputController.getInput()
ai.update(dt, ctx) for each AI
kart.update(dt) for each kart
resolveKartCollisions(karts)
itemSystem.update(dt, time)
race.update(dt)
effects.update(dt, karts)
track.update(dt, time)
chaseCamera.update(dt, player, {...})
hud.update(dt, state)
audio.update(dt, { player, karts, camera })
composer.render()
```

`RaceManager`: grid placement from `track.startPositions` (player starts mid-pack), countdown (emits `race:countdown {n}` for 3,2,1 and `race:go`),
lap counting from `kart.trackT` wraps (must pass t≈0.5 checkpoint before a lap counts — no reverse cheating), `raceProgress = lap + t`,
places sorted by progress, `race:lap {kart, lap}`, `race:finalLap`, `race:finish {kart, place}`, `race:end` (when player finishes;
AI remaining get estimated times). Wrong-way detection for the player (`race:wrongWay {active}`).

`HUD` (DOM overlay in `#ui-root`): position (big "1st"…"8th" with colour), lap counter, race timer + lap splits, item slot with
roulette animation, minimap (canvas) with all racers as coloured dots, speedometer, drift/boost indicators, countdown overlay,
"FINAL LAP!", "WRONG WAY", finish banner, results table.

`AudioEngine` (WebAudio, fully procedural): player engine (pitch/filter by speed), drift screech, mini-turbo, boost whoosh, item box,
roulette ticks, item use/hit/explosion, countdown beeps, lap/final-lap jingle, finish fanfare, catchy upbeat chiptune/synth background
music loop (and faster tempo on final lap). Unlock on first user gesture. Master volume + mute toggle (M key).

## Event catalogue (bus)
race:countdown {n} · race:go · race:lap {kart, lap} · race:finalLap · race:finish {kart, place} · race:end · race:wrongWay {active}
kart:driftStart · kart:driftLevel · kart:driftEnd · kart:miniTurbo · kart:boost · kart:hit · kart:wallBump · kart:jump · kart:land · kart:bump
item:pickup · item:roulette · item:got · item:use · item:hit · item:explode · item:lightning
game:state {state}  ('title'|'select'|'intro'|'countdown'|'racing'|'finished'|'paused')
