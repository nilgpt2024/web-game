# Credits

## 3D assets — Polyfork (polyfork.dev)

All `.mjs` files under `assets/` are unmodified downloads from `https://polyfork.dev/cdn/<slug>.mjs`.
Assets by Lucas Martinic / Polyfork.

Used in this demo:

| File | Asset |
| --- | --- |
| arc-street-lamp.mjs | Arc Street Lamp |
| police-barricade.mjs | Police Barricade |
| field-barricade.mjs | Field Barricade |
| apartment-block.mjs | Apartment Block |
| prewar-apartment-house.mjs | Prewar Apartment House |
| snow-laden-spruce.mjs | Snow-Laden Spruce |
| cardboard-delivery-box.mjs | Cardboard Delivery Box |
| hospital-bed.mjs | Hospital Bed |
| casualty-stretcher.mjs | Casualty Stretcher |
| medical-gas-cylinder.mjs | Medical Gas Cylinder |
| clinical-waste-bin.mjs | Clinical Waste Bin |
| ambulance-van.mjs | Ambulance Van |
| curbside-mailbox.mjs | Curbside Mailbox |
| motel-neon-sign.mjs | Motel Neon Sign |
| highway-patrol-officer.mjs | Highway Patrol Officer (spare — the street's patrol car era is over) |
| security-patrol-cruiser.mjs | Security Patrol Cruiser |
| delivery-courier.mjs | Delivery Courier (the depot courier, and the base of every infected) |
| two-lane-street-tile.mjs | Two-Lane Street Tile (spare, unused) |
| composite-plaza-tile.mjs | Composite Plaza Tile (spare, unused) |

License per Polyfork's terms: **free for commercial use, attribution not required**
(HD variants and Pro are paid tiers). Mesh files additionally fall under CC BY 4.0 if redistributed
as standalone meshes, in which case attribution to Polyfork is required. The `.mjs` source files may
not be resold, and the assets may not be used to train or to build a commercial asset generator.
Verify against the current license page before shipping.

## Engine

three.js r180 (MIT), vendored in `vendor/`.
`BufferGeometryUtils` and `SkeletonUtils` come from the official three.js examples (MIT).

## Everything else

Level layout, gameplay code, the infected tints and poses, the sidearm model, HUD, WebAudio cues
and the procedural snow are original to this demo.

Not used, and not credited: `teen-zombie-b5bb27` and `pistol-42de05` were identified on Polyfork as
the intended infected and weapon, but their `.mjs` downloads could not be completed on this network
(the CDN stalls or truncates the ~1 MB modules), so the infected are built from the courier asset
and the sidearm from procedural geometry. If those files are dropped into `assets/` later, they
should be added to the table above with their slug and (for standalone mesh redistribution) the
CC BY 4.0 attribution to Polyfork.
