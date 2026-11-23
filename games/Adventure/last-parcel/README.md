# Last Parcel — Outbreak Night

A single-page, first-person **survival horror** demo built with three.js and Polyfork low-poly
assets. An unofficial, non-commercial homage to the 1998 Raccoon City outbreak-night film: the
same blizzard, the same ordinary courier, the same sealed green case, and the same ending where
the cure arrives one minute too late.

It is 03:40 on the night the T-virus breaks out. You are **Bryan**, a medical courier who took an
overnight run for double pay because Michelle is pregnant and the rent is due. A woman walked
into the road, the van went into the ditch, and she got back up wrong. One sealed green case is
still strapped to the back seat — the stabilizer for an antiviral Raccoon General Hospital needs
on floor 28. You take a dead patrol officer's sidearm and eight rounds. You are not a soldier,
not a scientist, not a chosen survivor. You are the man who happened to be carrying the case.

Nobody is coming to rescue you. The lab is waiting for the case, not for you.

## How it follows the film

| Film beat | In this demo |
| --- | --- |
| Ordinary medical courier, overtime, pregnant girlfriend | Cold open + answering-machine subtitle at the first landmark |
| ONE sealed medical case delivered to a hospital lab | The case never leaves your hands; three waypoints are route markers, not three parcels |
| Umbrella is watching the city, not saving it | Umbrella internal broadcast + ACT II field-channel subtitle reveal the payload |
| A little girl in the tunnel bites him | A low push-in on the kid at the ACT II cut, then the bite; the T-virus load jumps and never goes back down |
| Ammo is scarce; running is better than fighting | No free magazine refill at waypoints, only four scavenged rounds |
| Green herb, first aid spray, typewriter safe spot | Landmark subtitle; lamp pools slow the virus instead of curing it |
| Antiviral is made, researchers back away, syringe falls | Ending told in first-person subtitles that shorten into `M—`, over a lens that drops to the floor |
| He becomes the monster; helicopters at first light | Searchlight sweep, one surviving eye, then the end card |
| A rookie named Leon checks in across town | RPD radio beat near the hospital |

## Three acts

| Act | Time | What changes |
| --- | --- | --- |
| ACT I — The Night Shift | 03:40 | the road is quiet: two infected, a long way ahead. Get the case off the van. |
| ACT II — What Is In The Case | 04:05 | three more wake up, Umbrella says the quiet part out loud, the tunnel bite lands. |
| ACT III — Floor 28 | 04:40 | four more; the lab researcher talks you up the stairwell over the radio. |

`Space` (or another `E`) skips an act card once it has been up for half a second. Gameplay is
frozen while a card is on screen.

## The loop

1. Take the case off the van behind you at the depot.
2. Keep hold of it all the way to the hospital: the barricade, the parking deck, and finally the
   Umbrella lab door. Pressing `E` at a waypoint advances the route and cuts to the next act — it
   does **not** swap the case for a new one.
3. At the lab door a low-angle shot plays the handover: the leaf opens six inches, the case is
   pushed toward the light, the leaf closes — then the ending sequence starts.

## Point of view

Nothing in the game tells you the plot. Every line you hear has a source in the street — a
dispatch radio, Michelle's voicemail, your own voice, an Umbrella channel you were not meant
to hear, Carl's intercom — and everything is written in the first person, in the present tense,
as sensation rather than explanation. No narrator, no "you are a courier" briefing, no
foreshadowing of what is going to happen to you.

- The title screen is the **job sheet you signed** plus one unread message, not a synopsis.
- The HUD is a manifest, not a quest log: no distance counter, no system banners. When an
  infected turns toward you, the only warning is the thought `it saw me`.
- The meter label is how you feel, not a stat: `COLD` → `BITE · LEFT ARM` →
  `UNDER THE SKIN` → `LEFT HAND GONE` → `CAN'T SAY HER NAME`. Four one-way thresholds make
  Bryan talk to himself; the lens tilts slightly as the fever climbs.
- The case in your hands sways half a step behind your walk. It never leaves you.
- The four key beats are **shown**, not described: the crash, the girl in the tunnel, the
  handover and the mutation are realtime camera moves through the same street (see below).
- The ending stays behind his eyes while the sentences fall apart — the last one is just `M—`.
  After that he cannot narrate anything, so the end card is a cold institutional log written by
  the people who never gave him the syringe.

## Infection is one-way

The fever meter only climbs. It rises faster while sprinting, a lit safe spot (the typewriter
under the lamp) merely **slows** it, and the tunnel bite adds a permanent drip on top. Bites cost
15 and shove you back. At 100 there is no respawn: the virus wins early and you get the shorter
`TOO LATE` ending. This is deliberate — the film is an origin story, not a survival fantasy.

## The ending

`Space` / `Enter` / `Esc` skips the ending sequence.

- **`SUBJECT ZERO`** — the case reaches the bench. You notice the room is warm, hear Carl backing
  away, watch the syringe hit the floor, and lose the words you were trying to say. The end card
  is Umbrella's incident log: sample received, antiviral synthesized, no administration recorded.
- **`TOO LATE`** — you go down before the hospital. The recovery log says the case was found in
  the snow, still sealed, and carried the rest of the way by another hand.

There is no extraction, no rescue and no win screen. The end card reports the night as an entry
in a log: time on the street, route, Order 0447, fever at handover, bodies, rounds and bites.

## Realtime story shots

There is **no pre-rendered CG and no image or video asset** in this build. Four story beats are
played as camera moves through the same live 3-D street the player walks down. The props are
built lazily from the existing `delivery-courier` factory and plain boxes, and marked
`userData.noWrap` because the world has already been bent onto the globe.

| Shot | When | What the camera does |
| --- | --- | --- |
| `crash` | cold open, 8.9 s | cuts from the pavement to headlight height; a woman stands 3.6 m ahead under a warm headlamp, 15 SVG cracks spread across the lens, FOV punches to ~91, then the lens falls back to the road |
| `girl` | ACT II card ends | low push-in on the `age:'kid'` figure under the overpass, one arm out; she says "help me", the bite lands in a flash, the camera recoils, goes wide and rolls |
| `lab` | third waypoint | low angle on a steel double door; the left leaf opens about six inches, the seam widens and warms, the case in your hands is pushed forward, then the leaf closes and the ending starts |
| `turn` | last ending subtitles | the black ending screen thins out so the street shows through; the lens drops from 1.62 m to 0.34 m, goes wide (FOV → ~104), tilts and reddens under the searchlight |

A shot owns the camera and — except `turn` — freezes player input: state goes to `shot`, the
HUD, ammo, crosshair and hit marker drop out, letterbox bars slide in. `turn` is an *overlay*
shot: it plays under the ending's own timers without interrupting them. `Space` / `Enter` /
`Esc` skips a blocking shot, and `endShot()` always restores FOV, layers and the previous phase.

## How it is presented

- **Cold open** (~21 s): letterbox bars, a typed subtitle track, a camera that starts on the
  pavement at 0.34 m and rises to eye height, with the `crash` shot cut in at 8.9 s. `Space`
  skips it.
- **Subtitles** (`say()`): every story line is typed into the same bottom-centre track with an
  uppercase speaker tag naming the real source (`DISPATCH RADIO`, `MICHELLE · VOICEMAIL`,
  `BRYAN`, `UMBRELLA FIELD CHANNEL`, `CARL · INTERCOM`, `RPD DISPATCH`).
- **Body**: first-person fever lines, a dark-red vignette, a faint lens tilt, heartbeat, and a
  case that lags half a step behind your walk.
- **Colour grade**: a cold-teal radial grade, film grain, and a red wash when you are bitten.
- **Act cards** cut in on black with a timecode, three first-person caption lines and a fragment
  of the emergency / Umbrella / containment broadcast.
- **Ending**: a black screen, subtitles that shorten into a single letter, the `turn` shot
  letting the red-lit street show through the black, a searchlight sweeping the ceiling, then
  black.
- **The street is dressed**: lit and dark windows, plow ridges, tyre lines, a fallen barricade,
  an abandoned ambulance, and strobes where the cordon died.

The street is wrapped around a **little planet** (radius 66 m): the road runs along the equator
for about half a revolution, so the block curves up over the horizon ahead of you.

## The curved world

Every position is stored as a pair of arc lengths — `lat` across the street and `s` along it —
and only the renderer bends it onto the sphere (`surfPos`, `surfBasis`, `placeOnGlobe`).
Movement, collision, detection and interaction keep working in flat 2-D numbers.

- `wrapOntoGlobe()` bends every object placed by the level-building code.
- The camera's `up` is the local surface normal, so "down the street" is a great circle.
- Snow is a local particle box re-oriented to the surface each frame.
- The planet body is a sphere; road and kerbs are ribbon meshes sampled along the arc.

## The infected

Nine of them, woken 2 → 5 → 9 as the night gets worse. They are built from the
`delivery-courier` factory with infected tints, a hunched `poseInfected()` and a procedural
shamble. A few are scaled into fused, swollen or crawling silhouettes so the street does not
read as nine identical zombies. They wander until you come within 21 m, then chase at 3.5 m/s.
Three torso hits put one down; the body stays where it fell.

## The sidearm

Eight rounds in the magazine, sixteen spare, `R` to reload (1.35 s). Left mouse fires a hitscan
ray along the camera axis — 44 m range, three hits per infected. Every shot is audible to the
whole block. Waypoints give you four scavenged rounds, never a full refill.

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
| `Shift` | Run (costs breath, speeds the virus) |
| `C` | Crouch (slower, smaller bite profile) |
| `E` | Pick up / advance the route / hand over |
| Left mouse | Fire |
| `R` | Reload |
| `Space` | Skip cold open, a story shot, an act card or the ending |
| Mouse | Look (click the canvas to capture the pointer) |
| `Esc` | Pause |

## Files

```
index.html          HUD, overlays, import map
style.css           night-street UI, ammo + hit marker, act cards, shot layer, ending
game.js             acts, player, infected, gunplay, T-virus, audio, case logic, story shots
vendor/             three.js r180 module build + BufferGeometryUtils/SkeletonUtils addons
assets/*.mjs        Polyfork assets (ES module form, unmodified)
preview-*.png       screenshots of the earlier build (title, cold open, act card, gameplay)
```

No image or video file is loaded by the game — the cracked windscreen is SVG paths generated at
runtime, the lab door is boxes, and both human figures come from the same character factory as
the infected. `wrapOntoGlobe()` has already run by the time shot props are created, so they carry
`userData.noWrap` and are placed with `placeOnGlobe()` directly.

`game.js` exposes `window.__dbg` when opened with `?debug=1`: `state`, `infected`, `fire()`,
`startReload()`, `deliver()`, `runEnding()`, and the shot helpers (`playShot`, `endShot`,
`updateShot`, `SHOT`, `SHOTS`). Harmless otherwise.

## Asset notes

Every Polyfork asset is used through its ES-module factory and its `colorway` parameter; nothing
is retinted by hand. Characters arrive in a T-pose, so `poseRelaxed()` / `poseInfected()` rotate
the arm bones on the rig's axis (`LeftArm/RightArm` → Z, ±1.22 rad). Cloned skinned characters
must go through `SkeletonUtils.clone` — `Object3D.clone(true)` leaves the clone bound to the
original skeleton and the mesh disappears.

The sidearm is plain geometry built in `buildWeapon()` (five boxes plus a torus trigger guard and
an additive muzzle sprite), not an imported asset.

`assets/two-lane-street-tile.mjs` and `assets/composite-plaza-tile.mjs` are downloaded but unused:
the road is built from plain geometry so it reads cleanly at eye level in the dark.

See `CREDITS.md` for licensing. This is a fan-made, non-commercial homage; Resident Evil,
Raccoon City, Umbrella and the T-virus belong to their respective rights holders.
