import * as THREE from 'three';
import { InputController } from '../core/InputController';
import { Loop } from '../core/Loop';
import { createRenderer, resizeRenderer } from '../core/Renderer';
import { Player, type ArenaBounds } from '../entities/Player';
import { InkProjectile } from '../entities/InkProjectile';
import { Target } from '../entities/Target';
import { AudioSystem } from '../systems/AudioSystem';
import { CameraRig } from '../systems/CameraRig';
import { DebugTools, type DebugTuning } from '../systems/DebugTools';
import { FloorPaint } from '../systems/FloorPaint';
import { Hud } from '../systems/Hud';
import { ComboTracker } from '../systems/Combo';
import { ScorePopups } from '../systems/ScorePopups';
import gameConfig from './gameConfig.json';

const ARENA: ArenaBounds = {
  halfWidth: gameConfig.arena.halfWidth,
  halfDepth: gameConfig.arena.halfDepth,
};

const ROUND_TIME = gameConfig.roundTime;
const INK_COLORS = gameConfig.ink.colors;
const KILL_SCORE = gameConfig.combat.killScore;
const COVERAGE_SCORE = gameConfig.combat.coverageScorePerPercent;

export class Game {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  private readonly input: InputController;
  private readonly player = new Player();
  private readonly projectiles: InkProjectile[] = [];
  private readonly targets: Target[] = [];
  private readonly audio = new AudioSystem();
  private readonly hud = new Hud();
  private readonly cameraRig = new CameraRig(this.camera);
  private readonly combo = new ComboTracker();
  private readonly popups = new ScorePopups();
  private readonly floorPaint: FloorPaint;
  private readonly loop = new Loop(
    (delta, elapsed) => this.update(delta, elapsed),
    () => this.render(),
  );

  private readonly tuning: DebugTuning = {
    speed: gameConfig.player.speed,
    dashMultiplier: gameConfig.player.dashMultiplier,
    acceleration: gameConfig.player.acceleration,
    fireCooldown: gameConfig.player.fireCooldown,
    cameraLag: gameConfig.camera.lag,
    exposure: gameConfig.camera.exposure,
    maxDpr: gameConfig.camera.maxDpr,
  };

  private readonly debugTools: DebugTools;
  private readonly muzzlePos = new THREE.Vector3();
  private readonly tmpVec = new THREE.Vector3();

  private frame = 0;
  private fireTimer = 0;
  private timeLeft = ROUND_TIME;
  private kills = 0;
  private running = false;
  private gameOver = false;

  private readonly titleScreen = this.getElement('#title-screen');
  private readonly gameoverScreen = this.getElement('#gameover-screen');
  private readonly startBtn = this.getElement<HTMLButtonElement>('#start-btn');
  private readonly restartBtn = this.getElement<HTMLButtonElement>('#restart-btn');

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = createRenderer(canvas);
    this.renderer.toneMappingExposure = this.tuning.exposure;
    this.camera.userData.canvas = canvas;

    const stick = this.getElement('#touch-stick');
    const knob = this.getElement('#touch-knob');
    const dashButton = this.getElement('#dash-button');
    this.input = new InputController(stick, knob, dashButton, canvas);

    this.debugTools = new DebugTools(this.tuning, () => {
      this.renderer.toneMappingExposure = this.tuning.exposure;
      resizeRenderer(this.renderer, this.camera, this.tuning.maxDpr);
    });

    this.floorPaint = new FloorPaint(ARENA.halfWidth, ARENA.halfDepth);

    this.createScene();
    this.cameraRig.snapTo(this.player.group.position);
    resizeRenderer(this.renderer, this.camera, this.tuning.maxDpr);
    this.spawnTargets();

    this.startBtn.addEventListener('click', () => this.beginRound());
    this.restartBtn.addEventListener('click', () => this.beginRound());

    this.publishDiagnostics();
  }

  start(): void {
    this.loop.start();
  }

  dispose(): void {
    this.loop.stop();
    this.input.dispose();
    this.audio.dispose();
    this.debugTools.dispose();
    this.popups.dispose();
    this.floorPaint.dispose();
    for (const p of this.projectiles) p.dispose();
    for (const t of this.targets) t.dispose();
    this.player.dispose();
    this.renderer.dispose();
    window.__THREE_GAME_DIAGNOSTICS__ = undefined;
  }

  private beginRound(): void {
    this.titleScreen.classList.add('hidden');
    this.gameoverScreen.classList.add('hidden');
    this.floorPaint.reset();
    for (const p of this.projectiles) {
      p.dispose();
      this.scene.remove(p.group);
    }
    this.projectiles.length = 0;
    for (const t of this.targets) {
      t.dispose();
      this.scene.remove(t.group);
    }
    this.targets.length = 0;
    this.spawnTargets();
    this.player.group.position.set(0, 0.06, 0);
    this.timeLeft = ROUND_TIME;
    this.kills = 0;
    this.running = true;
    this.gameOver = false;
    this.combo.reset();
    this.popups.reset();
    this.hud.setStatus('喷射墨水，占领场地');
  }

  private spawnTargets(): void {
    for (let i = 0; i < gameConfig.combat.targetCount; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const radius = 5 + Math.random() * 4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const hue = (i * 0.13 + 0.05) % 1;
      const target = new Target(new THREE.Vector3(x, 0, z), hue);
      this.targets.push(target);
      this.scene.add(target.group);
    }
  }

  private update(delta: number, elapsed: number): void {
    this.frame += 1;
    resizeRenderer(this.renderer, this.camera, this.tuning.maxDpr);

    if (this.running && !this.gameOver) {
      this.timeLeft -= delta;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.endRound();
      }
    }

    this.player.update(delta, elapsed, this.input, this.tuning, ARENA, this.camera, this.canvas);

    if (this.running && !this.gameOver) {
      this.handleFiring(delta);
    }

    for (const projectile of this.projectiles) {
      projectile.update(delta);
    }

    this.resolveProjectiles();

    for (const target of this.targets) {
      target.update(delta, elapsed, ARENA);
    }

    if (this.running && !this.gameOver) {
      this.cameraRig.update(delta, this.player.group.position, this.tuning.cameraLag);
    }

    this.combo.update(delta);
    this.popups.update(delta);
    this.floorPaint.update(delta);
    this.hud.update(this.floorPaint.coverage, this.kills, this.timeLeft, this.combo.count, this.combo.multiplier);
    this.publishDiagnostics();
  }

  private handleFiring(delta: number): void {
    this.fireTimer -= delta;
    if (!this.input.isFireHeld() && !this.input.consumeFirePressed()) return;
    if (this.fireTimer > 0) return;
    this.fireTimer = this.tuning.fireCooldown;

    this.player.getMuzzlePosition(this.muzzlePos);
    const dir = new THREE.Vector3(this.player.aim.x, 0, this.player.aim.y);
    const colorHex = INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)];
    const color = new THREE.Color(colorHex);
    const projectile = new InkProjectile(this.muzzlePos.clone(), dir, color, 16);
    this.projectiles.push(projectile);
    this.scene.add(projectile.group);
    this.audio.fire();
  }

  private resolveProjectiles(): void {
    for (const projectile of this.projectiles) {
      if (projectile.active) continue;
      this.floorPaint.splat(projectile.group.position.x, projectile.group.position.z, projectile.color, gameConfig.ink.splatRadius);
      this.audio.splat();
      this.checkTargetHits(projectile.group.position, 1.1, projectile.color);
      this.scene.remove(projectile.group);
      projectile.dispose();
    }
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      if (!this.projectiles[i].active) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  private checkTargetHits(pos: THREE.Vector3, radius: number, color: THREE.Color): void {
    for (const target of this.targets) {
      if (!target.active) continue;
      this.tmpVec.copy(target.group.position).sub(pos);
      this.tmpVec.y = 0;
      if (this.tmpVec.lengthSq() <= radius * radius) {
        target.splat();
        this.kills += 1;
        this.audio.kill();
        this.hud.flashKill();
        const multiplier = this.combo.register();
        const label = multiplier > 1 ? `击杀 +${multiplier}× 连击 ${this.combo.count}` : `击杀水滴怪！×${this.kills}`;
        this.hud.setStatus(label);
        this.popups.spawn(`+${multiplier * KILL_SCORE}`, `#${color.getHexString()}`, target.group.position.x, target.group.position.z, this.cameraRig);
        this.floorPaint.splat(target.group.position.x, target.group.position.z, color, gameConfig.ink.killSplatRadius);
      }
    }
  }

  private endRound(): void {
    this.running = false;
    this.gameOver = true;
    const coverage = this.floorPaint.coverage;
    const score = coverage * COVERAGE_SCORE + this.kills * KILL_SCORE * this.combo.multiplier;
    this.getElement('#result-coverage').textContent = `${coverage}%`;
    this.getElement('#result-kills').textContent = String(this.kills);
    this.getElement('#result-score').textContent = String(score);
    this.hud.setStatus('战斗结束');
    this.gameoverScreen.classList.remove('hidden');
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  private createScene(): void {
    this.scene.background = new THREE.Color('#0b0d18');
    this.scene.fog = new THREE.Fog('#0b0d18', 26, 52);

    const hemisphere = new THREE.HemisphereLight('#eef1ff', '#1b2030', 1.5);
    this.scene.add(hemisphere);

    const sun = new THREE.DirectionalLight('#ffffff', 2.6);
    sun.position.set(-6, 12, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 40;
    sun.shadow.camera.left = -16;
    sun.shadow.camera.right = 16;
    sun.shadow.camera.top = 16;
    sun.shadow.camera.bottom = -16;
    this.scene.add(sun);

    this.scene.add(this.createArena());
    this.scene.add(this.player.group);
  }

  private createArena(): THREE.Group {
    const arena = new THREE.Group();
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(ARENA.halfWidth * 2, ARENA.halfDepth * 2, 1, 1),
      new THREE.MeshStandardMaterial({
        map: this.floorPaint.texture,
        roughness: 0.78,
        metalness: 0.04,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    arena.add(floor);

    const railMaterial = new THREE.MeshStandardMaterial({
      color: '#6366f1',
      roughness: 0.5,
      metalness: 0.12,
    });
    const longRailGeometry = new THREE.BoxGeometry(ARENA.halfWidth * 2 + 1, 0.7, 0.5);
    const shortRailGeometry = new THREE.BoxGeometry(0.5, 0.7, ARENA.halfDepth * 2 + 1);
    const rails = [
      new THREE.Mesh(longRailGeometry, railMaterial),
      new THREE.Mesh(longRailGeometry, railMaterial),
      new THREE.Mesh(shortRailGeometry, railMaterial),
      new THREE.Mesh(shortRailGeometry, railMaterial),
    ];
    rails[0].position.set(0, 0.35, -ARENA.halfDepth - 0.25);
    rails[1].position.set(0, 0.35, ARENA.halfDepth + 0.25);
    rails[2].position.set(-ARENA.halfWidth - 0.25, 0.35, 0);
    rails[3].position.set(ARENA.halfWidth + 0.25, 0.35, 0);
    for (const rail of rails) {
      rail.castShadow = true;
      rail.receiveShadow = true;
      arena.add(rail);
    }

    return arena;
  }

  private publishDiagnostics(): void {
    const info = this.renderer.info;
    (window as unknown as { __THREE_GAME_DIAGNOSTICS__?: unknown }).__THREE_GAME_DIAGNOSTICS__ = {
      frame: this.frame,
      running: this.running,
      gameOver: this.gameOver,
      timeLeft: this.timeLeft,
      coverage: this.floorPaint.coverage,
      kills: this.kills,
      projectiles: this.projectiles.length,
      targets: this.targets.length,
      player: {
        position: {
          x: this.player.group.position.x,
          y: this.player.group.position.y,
          z: this.player.group.position.z,
        },
        speed: this.player.velocity.length(),
      },
      renderer: {
        calls: info.render.calls,
        triangles: info.render.triangles,
        geometries: info.memory.geometries,
        textures: info.memory.textures,
      },
      canvas: {
        clientWidth: this.canvas.clientWidth,
        clientHeight: this.canvas.clientHeight,
        width: this.canvas.width,
        height: this.canvas.height,
        dpr: Math.min(window.devicePixelRatio || 1, this.tuning.maxDpr),
      },
    };
  }

  private getElement<T extends HTMLElement = HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Missing element: ${selector}`);
    return element;
  }
}
