import * as THREE from 'three';
import { COLORS, BATTLEFIELD } from './config';
import { getTerrainHeight, randRange, randSign } from './utils';

export function createBattlefield(scene: THREE.Scene): void {
  // Ground
  const groundGeometry = new THREE.PlaneGeometry(BATTLEFIELD.size, BATTLEFIELD.size, 128, 128);
  const positions = groundGeometry.attributes.position.array as Float32Array;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const z = positions[i + 1];
    positions[i + 2] = getTerrainHeight(x, z);
  }
  groundGeometry.computeVertexNormals();
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.ground,
    roughness: 0.95,
    metalness: 0.02,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffe6cc, 0x3d342b, 0.5);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffe6cc, 2.0);
  sunLight.position.set(60, 80, 40);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 300;
  sunLight.shadow.camera.left = -120;
  sunLight.shadow.camera.right = 120;
  sunLight.shadow.camera.top = 120;
  sunLight.shadow.camera.bottom = -120;
  scene.add(sunLight);
}

export function createDecorations(scene: THREE.Scene): void {
  // Trees (instanced)
  const treeCount = 90;
  const trunkGeom = new THREE.CylinderGeometry(0.18, 0.28, 1.4, 7);
  const trunkMat = new THREE.MeshStandardMaterial({ color: COLORS.treeTrunk, roughness: 0.9 });
  const leavesGeom = new THREE.ConeGeometry(1.2, 2.6, 8);
  const leavesMat = new THREE.MeshStandardMaterial({ color: COLORS.treeLeaves, roughness: 0.9 });

  const trunks = new THREE.InstancedMesh(trunkGeom, trunkMat, treeCount);
  const leaves = new THREE.InstancedMesh(leavesGeom, leavesMat, treeCount);
  trunks.castShadow = true; trunks.receiveShadow = true;
  leaves.castShadow = true; leaves.receiveShadow = true;

  const dummy = new THREE.Object3D();
  for (let i = 0; i < treeCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = randRange(35, BATTLEFIELD.size * 0.45);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = randRange(0.8, 1.6);
    const y = getTerrainHeight(x, z);

    dummy.position.set(x, y + 0.7 * scale, z);
    dummy.rotation.set(0, Math.random() * Math.PI, 0);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, y + 2.3 * scale, z);
    dummy.updateMatrix();
    leaves.setMatrixAt(i, dummy.matrix);
  }
  scene.add(trunks);
  scene.add(leaves);

  // Dead trees
  const deadCount = 18;
  const deadTrunkGeom = new THREE.CylinderGeometry(0.12, 0.2, 2.2, 6);
  const deadMat = new THREE.MeshStandardMaterial({ color: COLORS.deadTree, roughness: 1 });
  const deadTrees = new THREE.InstancedMesh(deadTrunkGeom, deadMat, deadCount);
  deadTrees.castShadow = true;
  for (let i = 0; i < deadCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = randRange(30, BATTLEFIELD.size * 0.48);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = getTerrainHeight(x, z);
    dummy.position.set(x, y + 1.1, z);
    dummy.rotation.set(randRange(-0.15, 0.15), Math.random() * Math.PI, randRange(-0.1, 0.1));
    dummy.scale.setScalar(randRange(0.8, 1.4));
    dummy.updateMatrix();
    deadTrees.setMatrixAt(i, dummy.matrix);
  }
  scene.add(deadTrees);

  // Rocks
  const rockCount = 40;
  const rockGeom = new THREE.DodecahedronGeometry(0.6, 0);
  const rockMat = new THREE.MeshStandardMaterial({ color: COLORS.rock, roughness: 0.9 });
  const rocks = new THREE.InstancedMesh(rockGeom, rockMat, rockCount);
  rocks.castShadow = true; rocks.receiveShadow = true;
  for (let i = 0; i < rockCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = randRange(20, BATTLEFIELD.size * 0.46);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = getTerrainHeight(x, z);
    dummy.position.set(x, y + 0.3, z);
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    dummy.scale.set(randRange(0.6, 1.4), randRange(0.4, 1.0), randRange(0.6, 1.4));
    dummy.updateMatrix();
    rocks.setMatrixAt(i, dummy.matrix);
  }
  scene.add(rocks);

  // Campfires
  for (let i = 0; i < 3; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = randRange(45, 90);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = getTerrainHeight(x, z);
    createCampfire(scene, x, y, z);
  }
}

function createCampfire(scene: THREE.Scene, x: number, y: number, z: number): void {
  const group = new THREE.Group();
  group.position.set(x, y + 0.1, z);

  const logGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.7, 5);
  const logMat = new THREE.MeshStandardMaterial({ color: COLORS.deadTree });
  for (let i = 0; i < 5; i++) {
    const log = new THREE.Mesh(logGeom, logMat);
    log.rotation.z = Math.PI / 2;
    log.rotation.y = (i / 5) * Math.PI;
    log.position.y = 0.05;
    group.add(log);
  }

  const fireGeom = new THREE.ConeGeometry(0.25, 0.6, 6);
  const fireMat = new THREE.MeshBasicMaterial({ color: COLORS.campfire, transparent: true, opacity: 0.85 });
  const fire = new THREE.Mesh(fireGeom, fireMat);
  fire.position.y = 0.35;
  group.add(fire);

  const light = new THREE.PointLight(COLORS.campfire, 2, 12);
  light.position.y = 0.6;
  light.castShadow = false;
  group.add(light);

  scene.add(group);

  // Animate fire flicker in main loop via userData
  group.userData = { fire, light, baseY: 0.35 };
  (group as any).isCampfire = true;
}

export function createFlag(scene: THREE.Scene, x: number, z: number, team: 'ally' | 'enemy'): void {
  const poleGeom = new THREE.CylinderGeometry(0.06, 0.06, 7, 8);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x3e2723 });
  const pole = new THREE.Mesh(poleGeom, poleMat);
  const y = getTerrainHeight(x, z);
  pole.position.set(x, y + 3.5, z);
  pole.castShadow = true;
  scene.add(pole);

  const flagColor = team === 'ally' ? COLORS.ally : COLORS.enemy;
  const flagGeom = new THREE.PlaneGeometry(1.6, 1.0, 8, 4);
  const flagMat = new THREE.MeshStandardMaterial({ color: flagColor, side: THREE.DoubleSide });
  const flag = new THREE.Mesh(flagGeom, flagMat);
  flag.position.set(x + 0.8, y + 5.8, z);
  scene.add(flag);

  flag.userData = { basePos: flag.position.clone(), phase: Math.random() * Math.PI * 2 };
  (flag as any).isFlag = true;
}

export function animateDecorations(scene: THREE.Scene, time: number): void {
  scene.traverse((obj) => {
    if ((obj as any).isFlag) {
      const flag = obj as THREE.Mesh;
      const positions = (flag.geometry as THREE.PlaneGeometry).attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        positions[i + 2] = Math.sin(time * 3 + x * 3 + flag.userData.phase) * 0.12 * x;
      }
      (flag.geometry as THREE.PlaneGeometry).attributes.position.needsUpdate = true;
    }
    if ((obj as any).isCampfire) {
      const fire = obj.userData.fire as THREE.Mesh;
      const light = obj.userData.light as THREE.PointLight;
      const s = 0.85 + Math.sin(time * 10 + obj.id) * 0.15;
      fire.scale.set(s, s, s);
      fire.rotation.y = time * 2;
      light.intensity = 1.5 + Math.sin(time * 8) * 0.5;
    }
  });
}
