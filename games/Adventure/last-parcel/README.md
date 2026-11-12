# Last Parcel — Outbreak Night

A single-page, first-person **survival shooter** demo built with three.js and Polyfork low-poly assets.

It is three hours into the outbreak on Alder Street, 03:40, in a blizzard. You are the courier who
was still out when the quarantine line was drawn three blocks east. Carry three serum samples from
the depot to the corner clinic, the Ward 3 quarantine door and the east gate — and shoot the
infected that are standing in the road between them.

Infection replaces the old warmth meter: it climbs in the cold and inside the dark, and only a
lamp pool (or a safe drop point) pushes it back down. At 100 you turn, black out, and come round at
the last checkpoint with the fever still on you.

## Three acts

The run is built as a one-night outbreak film rather than a level list. Each delivery ends an act
and cuts to a title card (letterboxed, timecode, three caption lines, a fragment of citywide
broadcast), and each act wakes its own slice of the street:

| Act | Time | What changes |
| --- | --- | --- |
| ACT I — The First One | 03:40 | the block is quiet: two infected, both a full block ahead. Clinic first. |
| ACT II — The Line Moves East | 04:05 | the cordon arrives, three more infected wake up mid-street, the drop swings to Ward 3. |
| ACT III — Nothing Left to Hold | 04:40 | four more infected, the densest bands sit between you and the east gate. |

`Space` (or another `E`) skips a card once it has been up for half a second. Gameplay is frozen
while a card is on screen — the horde does not move under the cut.

The street is wrapped around a **little planet** (radius 66 m): the road runs along the equator for
about half a revolution, so the block curves up over the horizon ahead of you and the far side of
town stays behind the curve.

## The curved world

Every position in the level is stored as a pair of arc lengths — `lat` across the street and `s`
along it — and only the renderer bends it onto the sphere (`surfPos`, `surfBasis`, `placeOnGlobe`
in `game.js`). Movement, collision, detection and interaction all keep working in flat 2-D numbers,
which is why the same gameplay code survived the switch from a straight street.

- `wrapOntoGlobe()` bends every object placed by the level-building code; outer blocks are pulled
  inward first so their footings don't sink below the curve.
- The camera's `up` is the local surface normal, so "down the street" is a great circle.
- Snow is a local particle box re-oriented to the surface each frame; the sky light rides the
  player's local horizon.
- The planet body is a sphere, the road and kerbs are ribbon meshes sampled along the arc, and
  distant blocks legitimately vanish behind the curve — that is the point of the shape.

## The infected

Nine of them in total, but they do not all exist on the street at once: each act wakes its own
band, so the population grows 2 → 5 → 9 as the night gets worse. They are built from the
`delivery-courier` character factory with infected tints (grey-green skin, blood-stained pack,
dark torn clothing), a hunched `poseInfected()` and a procedural shambling walk. They wander their
band until you come within 21 m, then chase at 3.5 m/s. A bite costs 15 infection and shoves you
back. Three torso hits put one down; the body falls where it stood and stays there.

## The sidearm

Eight rounds in the magazine, sixteen spare, `R` to reload (1.35 s). Left mouse fires a hitscan ray
along the camera axis with a small spread allowance — 44 m range, three hits per infected. Every
shot is audible to the whole block, so firing pulls nearby infected into a chase. Each completed
drop restocks the magazine and adds eight rounds to the reserve.

## Run it

ES modules need a real HTTP origin, so opening the file directly will not work:

```powershell
cd D:\PycharmProjects\GameHub\games\Adventure\last-parcel
python -m http.server 8777 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8777/index.html>. Any static server works; there is no build step
and no npm dependency.

## Controls

| Key | Action |
| --- | --- |
| `W` `A` `S` `D` | Move |
| `Shift` | Run (costs breath) |
| `C` | Crouch (slower, smaller bite profile) |
| `E` | Pick up / deliver |
| Left mouse | Fire |
| `R` | Reload |
| `Space` | Skip the act card |
| Mouse | Look (click the canvas to capture the pointer) |
| `Esc` | Pause |

## Loop

1. Pick up the first serum vial at the depot behind the spawn point.
2. Deliver it to the drop point named in the objective line — that ends the act and cuts to the
   next title card.
3. The next sample waits at that drop point; three of them, then the east gate lets you through.

Infection climbs everywhere, faster while sprinting. Standing in a lamp pool pushes it back down.
At 100 you turn and wake up at the last checkpoint at 46. Bites are what usually do it — the horde
is not decorative.

## Files

```
index.html          HUD, overlays, import map
style.css           night-street UI, ammo + hit marker, act cards
game.js             scenes/acts, player, infected, gunplay, infection, audio, parcel logic
vendor/             three.js r180 module build + BufferGeometryUtils/SkeletonUtils addons
assets/*.mjs        Polyfork assets (ES module form, unmodified)
preview-*.png       screenshots of the finished demo (title card, act card, gameplay)
```

`game.js` exposes `window.__dbg` when the page is opened with `?debug=1` — handy for poking the
scene from the console (`state`, `infected`, `fire()`, `startReload()`), and harmless otherwise.

## Asset notes

Every Polyfork asset is used through its ES-module factory and its `colorway` parameter; nothing is
retinted by hand. Characters arrive in a T-pose, so `poseRelaxed()` / `poseInfected()` rotate the
arm bones on the axis declared by the asset rig (`LeftArm/RightArm` → Z, ±1.22 rad). Cloned skinned
characters must go through `SkeletonUtils.clone` — `Object3D.clone(true)` leaves the clone bound to
the original skeleton and the mesh disappears.

The sidearm is plain geometry built in `buildWeapon()` (five boxes plus a torus trigger guard and
an additive muzzle sprite), not an imported asset: the Polyfork pistol download could not be
completed on this network, and a 0.2 m prop would have needed the same hand-tuning anyway.

`assets/two-lane-street-tile.mjs` and `assets/composite-plaza-tile.mjs` are downloaded but unused:
the road is built from plain geometry so it reads cleanly at eye level in the dark. Keep them if you
want to dress the street later.

See `CREDITS.md` for licensing.
