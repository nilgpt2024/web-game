import * as THREE from 'three';

// Objects remember; people never appear. A Residual may replay a door or a drawer as a pale,
// incomplete copy of itself while the real object stays exactly where the case left it.
// The same machinery draws the latch reconstruction as a blueprint: Aren's imagination,
// clearly marked as a demonstration rather than an event.
function ghostOf(size, style) {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(...size);
  const fill = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    color: style === 'blueprint' ? '#7fc4ff' : '#dcebf2', transparent: true, opacity: 0, depthWrite: false,
    blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({
    color: style === 'blueprint' ? '#a6dcff' : '#f2f8fb', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
  group.add(fill, edges);
  group.userData = { fill, edges, style };
  group.visible = false;
  return group;
}

export function createEchoes({ upper, rooms }) {
  const corridor = upper.corridor, victor = upper.victor;
  const animations = [];
  const tween = (seconds, step) => new Promise(resolve => animations.push({ t: 0, seconds, step, resolve }));

  // Door leaf ghosts (memory and blueprint) share the real door's hinge.
  // Step 12: the leaf is 1.38 x 2.88 and opens into Victor's room (positive angle).
  const OPEN = corridor.doorPivot.userData.open(corridor.doorOpen);
  function doorGhost(style) {
    const pivot = new THREE.Group();
    pivot.position.copy(corridor.doorPivot.position);
    const leaf = ghostOf([1.38, 2.88, .09], style);
    leaf.position.set(.69, 1.46, 0);
    pivot.add(leaf);
    corridor.root.add(pivot);
    return { pivot, leaf };
  }
  const memoryDoor = doorGhost('memory'), blueprintDoor = doorGhost('blueprint');
  const drawer = ghostOf([1.03, .19, .54], 'memory');
  drawer.position.set(-3.6, 1.16, -1.72);
  victor.root.add(drawer);
  const deskLamp = [];
  victor.root.traverse(o => { if (o.isPointLight && o.position.x < -4 && o.position.z < -2) deskLamp.push(o); });

  function setOpacity(ghost, fill, edges) {
    ghost.visible = fill > 0.001 || edges > 0.001;
    ghost.userData.fill.material.opacity = fill;
    ghost.userData.edges.material.opacity = edges;
  }

  // Door Echo: the open door briefly remembers closing.
  async function doorCloses() {
    const { pivot, leaf } = memoryDoor;
    pivot.rotation.y = OPEN;
    await tween(1.25, p => {
      const e = 1 - Math.pow(1 - p, 3);
      pivot.rotation.y = OPEN * (1 - e);
      setOpacity(leaf, .26 * Math.min(1, p * 4) + .08 * Math.sin(Math.PI * p), .9 * Math.min(1, p * 3));
    });
    await tween(1.6, p => setOpacity(leaf, .26 * (1 - p), .9 * (1 - p)));
    setOpacity(leaf, 0, 0);
  }

  // Earlier Search: a drawer slides open and shut in pale light.
  async function drawerSearch(phase) {
    if (phase === 'open') await tween(1.2, p => { drawer.position.z = -1.72 - .28 + .5 * (1 - Math.pow(1 - p, 2)); setOpacity(drawer, .22 * Math.min(1, p * 2), .6 * Math.min(1, p * 2)); });
    if (phase === 'close') { await tween(.9, p => { drawer.position.z = -1.5 - .5 * p; }); await tween(.8, p => setOpacity(drawer, .22 * (1 - p), .6 * (1 - p))); }
  }

  // Victor's Voice: the desk lamp gutters, as if the room lost its breath.
  function dimLamp(seconds = 3.5) {
    return tween(seconds, p => { const d = p < .2 ? 1 - p * 2.5 : p > .8 ? .5 + (p - .8) * 2.5 : .5 + Math.sin(p * 40) * .04; for (const l of deskLamp) l.userData.dim = d; })
      .then(() => { for (const l of deskLamp) l.userData.dim = 1; });
  }

  // Latch reconstruction, three steps: show the blueprint leaf, pull it shut, rattle the handle.
  const latch = {
    async show() { blueprintDoor.pivot.rotation.y = OPEN; await tween(.6, p => setOpacity(blueprintDoor.leaf, .12 * p, .85 * p)); },
    async close() { await tween(.85, p => { const e = p < .8 ? (p / .8) * (p / .8) : 1; blueprintDoor.pivot.rotation.y = OPEN * (1 - e) + (p > .8 ? Math.sin((p - .8) * 30) * .015 : 0); }); blueprintDoor.pivot.rotation.y = 0; },
    async tryHandle() { await tween(.6, p => { blueprintDoor.pivot.rotation.y = Math.sin(p * Math.PI * 4) * .012 * (1 - p); }); },
    async hide() { await tween(.6, p => setOpacity(blueprintDoor.leaf, .12 * (1 - p), .85 * (1 - p))); blueprintDoor.pivot.rotation.y = OPEN; }
  };

  function update(dt) {
    for (const a of [...animations]) {
      a.t = Math.min(a.seconds, a.t + dt);
      a.step(a.t / a.seconds);
      if (a.t >= a.seconds) { animations.splice(animations.indexOf(a), 1); a.resolve(); }
    }
  }
  return { update, doorCloses, drawerSearch, dimLamp, latch };
}
