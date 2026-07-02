import * as THREE from 'three';
import { InputController } from '../core/InputController';
import { Loop } from '../core/Loop';
import { createRenderer, resizeRenderer } from '../core/Renderer';
import { Player, type ArenaBounds } from '../entities/Player';
import { CameraRig } from '../systems/CameraRig';
import { DebugTools, type DebugTuning } from '../systems/DebugTools';
import { PhaseSystem } from '../systems/PhaseSystem';
import { PrincipleOrb } from '../entities/PrincipleOrb';
import { PRINCIPLES } from '../data/principles';

const ARENA: ArenaBounds = { halfWidth: 11, halfDepth: 7 };
const ORB_INTERACT_DIST = 4;

interface ChoiceDef {
  text: string;
  xp: number;
  result: string;
}

interface ChallengeDef {
  icon: string;
  title: string;
  desc: string;
  choices: ChoiceDef[];
}

function studyChallenge(id: number): ChallengeDef {
  const c: Record<number, ChallengeDef> = {
    0: { icon:'☕', title:'免费咖啡的陷阱', desc:'咖啡店门口写着"免费试饮"，店员递来一杯。你喝完，他说："买一包带回家？"', choices:[{ text:'觉得欠了人情，买一包（互惠）', xp:30, result:'互惠生效——接受了小恩惠后，你产生了回报义务感。' }, { text:'礼貌道谢后走人', xp:5, result:'保持了自主权，但店员有些失望。' }] },
    1: { icon:'⏰', title:'限时抢购', desc:'销售员说："这款只剩最后两件，下周一恢复原价。"', choices:[{ text:'相信稀缺性，立刻下单', xp:30, result:'稀缺——机会越少价值越高，你被紧迫感说服了。' }, { text:'不着急，想清楚再说', xp:5, result:'抵抗了人为稀缺压力，保持了理性。' }] },
    2: { icon:'🎓', title:'专家的建议', desc:'穿白大褂的人在讲座上推荐保健品："临床验证，效果显著。"', choices:[{ text:'听从专家建议购买', xp:30, result:'权威符号+专业语言说服了你。' }, { text:'查数据再决定', xp:5, result:'尊重权威但不盲从。' }] },
    3: { icon:'✍️', title:'公开承诺', desc:'你在朋友圈发了"今年读50本书"，朋友问进度。', choices:[{ text:'为了面子赶进度', xp:30, result:'承诺一致——公开承诺后，行为自动对齐说过的话。' }, { text:'说最近太忙', xp:5, result:'打破了承诺的一致性，心里别扭。' }] },
    4: { icon:'😊', title:'相似性效应', desc:'新同事发现你们喜欢同一款小众游戏，聊得很开心。他请你帮忙赶方案。', choices:[{ text:'有好感，爽快答应', xp:30, result:'好感——相似性+正面互动让你更愿意说好。' }, { text:'婉拒，说自己也很忙', xp:5, result:'拒绝了，关系可能变淡。' }] },
    5: { icon:'📱', title:'大家都在用', desc:'一群人都在用某款笔记App说效率翻倍。', choices:[{ text:'下载试试', xp:30, result:'社会认同——他人选择是正确信号，尤其在不确定时。' }, { text:'先了解再决定', xp:5, result:'保持独立思考。' }] },
    6: { icon:'🤝', title:'我们是一家人', desc:'团队组长说："我们都是一家人，周末加个班冲刺KPI。"', choices:[{ text:'为了团队拼了', xp:30, result:'联盟——"我们"的身份让你更愿意为集体付出。' }, { text:'正常节奏来', xp:5, result:'保持边界，但被认为不合群。' }] },
  };
  return c[id]!;
}

function workChallenge(id: number): ChallengeDef {
  const c: Record<number, ChallengeDef> = {
    0: { icon:'📊', title:'客户答谢会', desc:'你给客户送了小礼品，对方说"太客气了"，然后提了一个额外需求。', choices:[{ text:'利用互惠引导客户签单', xp:35, result:'互惠——先施恩再索取，客户更难拒绝。' }, { text:'公事公办不欠人情', xp:5, result:'你没有利用心理杠杆，效率降低。' }] },
    1: { icon:'🏷️', title:'稀缺提案', desc:'你发现市场上某资源即将短缺，可以向老板提议提前囤货。', choices:[{ text:'用稀缺数据说服老板批准', xp:35, result:'稀缺——真实稀缺性说服了决策者。' }, { text:'按常规流程采购', xp:5, result:'错过了利用信息差的机会。' }] },
    2: { icon:'📜', title:'专家背书', desc:'你需要在会议上推动一个方案，但反对声音很大。', choices:[{ text:'邀请领域专家为你站台', xp:35, result:'权威——专家的背书让反对声音消失了。' }, { text:'据理力争用数据说话', xp:5, result:'纯数据说服力不如权威背书。' }] },
    3: { icon:'📋', title:'团队共识', desc:'团队定了一套新流程，你其实觉得效率更低。', choices:[{ text:'先承诺执行再私下优化', xp:35, result:'承诺一致——先对齐，再改进，不影响团队信任。' }, { text:'当场提出反对', xp:5, result:'虽然坦诚，但破坏了团队一致性。' }] },
    4: { icon:'🎯', title:'客户破冰', desc:'重要客户来访，你发现他喜欢摄影，桌上摆着相机。', choices:[{ text:'从摄影话题切入建立好感', xp:35, result:'好感——相似兴趣快速拉近距离。' }, { text:'直接进入业务洽谈', xp:5, result:'效率高但缺乏情感连接。' }] },
    5: { icon:'📈', title:'案例说服', desc:'你需要说服一个保守的客户采用新方案。', choices:[{ text:'展示同行成功案例', xp:35, result:'社会认同——看到同行成功了，客户更愿意尝试。' }, { text:'展示产品功能参数', xp:5, result:'数据不如同行的选择有说服力。' }] },
    6: { icon:'🤝', title:'团队冲刺', desc:'年底冲刺，需要大家周末加班。你作为团队核心，大家看着你。', choices:[{ text:'领头加班并强调团队身份', xp:35, result:'联盟——你带头付出，团队凝聚力更强。' }, { text:'按制度支付加班费即可', xp:5, result:'物质激励不如归属感持久。' }] },
  };
  return c[id]!;
}

function entrepreneurChallenge(id: number): ChallengeDef {
  const c: Record<number, ChallengeDef> = {
    0: { icon:'🏢', title:'免费咨询转收费', desc:'你给潜在客户做了一次免费咨询，对方很满意。现在提出想长期合作。', choices:[{ text:'利用互惠提出合理报价', xp:40, result:'互惠——先提供价值再报价，客户更易接受。' }, { text:'直接报价', xp:5, result:'没有铺垫，客户觉得价格高了。' }] },
    1: { icon:'💎', title:'限量合伙人名额', desc:'你的项目很受欢迎，有人想加入。你手上只剩最后一个合伙人名额。', choices:[{ text:'强调稀缺性筛选最佳人选', xp:40, result:'稀缺——名额越少，渴望越强。' }, { text:'敞开大门欢迎所有人', xp:5, result:'失去稀缺性，反而降低了项目的吸引力。' }] },
    2: { icon:'👔', title:'行业峰会演讲', desc:'你被邀请在行业峰会上演讲，台下坐满了潜在客户。', choices:[{ text:'展示权威数据+荣誉证书', xp:40, result:'权威——演讲台上的权威感赢得了信任。' }, { text:'随意分享个人经验', xp:5, result:'缺乏权威感，说服力不足。' }] },
    3: { icon:'🏗️', title:'公司愿景宣誓', desc:'你发布了公司未来三年的宏大愿景，让全员签字承诺。', choices:[{ text:'让每个人公开签名承诺', xp:40, result:'承诺一致——公开签名后，全员行动力大幅提升。' }, { text:'发邮件通知即可', xp:5, result:'没有承诺约束力，执行效果打折。' }] },
    4: { icon:'🎭', title:'投资人晚宴', desc:'晚宴上你发现一位投资人也喜欢红酒和爵士乐。', choices:[{ text:'从红酒爵士入手建立私人好感', xp:40, result:'好感——共同爱好是最好的社交润滑剂。' }, { text:'全程只聊商业模式', xp:5, result:'专业但缺乏个人连接，融资可能性降低。' }] },
    5: { icon:'🏆', title:'权威客户背书', desc:'你已经有了一个行业头部客户，其他潜在客户还在观望。', choices:[{ text:'公开头部客户合作案例', xp:40, result:'社会认同——头部客户的认可是最强信任信号。' }, { text:'低调保护客户隐私', xp:5, result:'失去了最有价值的社会证明。' }] },
    6: { icon:'🌐', title:'创始人社区', desc:'你建立了一个创始人互助社群，有人说"让我免费进群学习就好"。', choices:[{ text:'要求所有成员互帮互助', xp:40, result:'联盟——共同身份让社群更有凝聚力。' }, { text:'让他免费观望', xp:5, result:'没有付出，也就没有归属感。' }] },
  };
  return c[id]!;
}

export class Game {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
  private readonly input: InputController;
  private readonly player = new Player();
  private readonly orbs: PrincipleOrb[] = [];
  private readonly phaseSys = new PhaseSystem();
  private readonly cameraRig = new CameraRig(this.camera);
  private readonly loop = new Loop((dt, el) => this.update(dt, el), () => this.render());
  private readonly raycaster = new THREE.Raycaster();
  private readonly debugTools: DebugTools;
  private readonly tuning: DebugTuning = { speed: 5.8, dashMultiplier: 1.75, acceleration: 13, cameraLag: 0.16, exposure: 1.05, maxDpr: 2 };
  private frame = 0;
  private elapsed = 0;
  private awaitingChoice = false;
  private hoveredOrb: PrincipleOrb | null = null;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = createRenderer(canvas);
    this.renderer.toneMappingExposure = this.tuning.exposure;

    const stick = this.getElement('#touch-stick');
    const knob = this.getElement('#touch-knob');
    const dashBtn = this.getElement('#dash-button');
    this.input = new InputController(canvas, stick, knob, dashBtn);

    this.debugTools = new DebugTools(this.tuning, () => {
      this.renderer.toneMappingExposure = this.tuning.exposure;
      resizeRenderer(this.renderer, this.camera, this.tuning.maxDpr);
    });

    this.buildStudyRoom();
    this.spawnOrbs();
    this.scene.add(this.player.group);
    this.cameraRig.snapTo(this.player.group.position);
    resizeRenderer(this.renderer, this.camera, this.tuning.maxDpr);

    this.getElement('#start-btn').addEventListener('click', () => this.startGame());
    this.bindChoiceButtons();
    this.phaseSys.onChange(() => this.syncHUD());
    this.syncHUD();
    this.publishDiagnostics();
  }

  start(): void {
    this.loop.start();
  }

  dispose(): void {
    this.loop.stop();
    this.input.dispose();
    this.debugTools.dispose();
    for (const o of this.orbs) o.dispose();
    this.player.dispose();
    this.renderer.dispose();
    window.__THREE_GAME_DIAGNOSTICS__ = undefined;
  }

  /* ---- Game Flow ---- */

  private startGame(): void {
    this.getElement('#title-screen').classList.add('hidden');
    this.phaseSys.startPhase();
    this.setStatus('探索房间，点击光球学习说服原理');
  }

  /* ---- Scene Construction ---- */

  private buildStudyRoom(): void {
    this.scene.background = new THREE.Color('#1a1a2e');
    this.scene.fog = new THREE.Fog('#1a1a2e', 18, 38);

    const hemi = new THREE.HemisphereLight('#c8d0e0', '#2d2d4a', 1.4);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight('#ffe8b0', 2.2);
    sun.position.set(-4, 10, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 30;
    sun.shadow.camera.left = -14;
    sun.shadow.camera.right = 14;
    sun.shadow.camera.top = 12;
    sun.shadow.camera.bottom = -12;
    this.scene.add(sun);

    const amb = new THREE.AmbientLight('#444466', 0.4);
    this.scene.add(amb);

    this.scene.add(this.createStudyArena());
  }

  private createStudyArena(): THREE.Group {
    const g = new THREE.Group();
    const wFloor = ARENA.halfWidth * 2;
    const dFloor = ARENA.halfDepth * 2;

    const floorTex = this.patternCanvas(256, '#22223a', '#2a2a46', 32);
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(ARENA.halfWidth / 3, ARENA.halfDepth / 3);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(wFloor, dFloor),
      new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.7, metalness: 0.02 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    g.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: '#2a2a4a', roughness: 0.6, metalness: 0.05 });
    const wallH = 4.5;
    const wallT = 0.3;

    const walls = [
      { s: [wFloor + wallT * 2, wallH, wallT], p: [0, wallH / 2, -dFloor / 2 - wallT / 2] },
      { s: [wFloor + wallT * 2, wallH, wallT], p: [0, wallH / 2, dFloor / 2 + wallT / 2] },
      { s: [wallT, wallH, dFloor], p: [-wFloor / 2 - wallT / 2, wallH / 2, 0] },
      { s: [wallT, wallH, dFloor], p: [wFloor / 2 + wallT / 2, wallH / 2, 0] },
    ];
    for (const w of walls) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(...w.s), wallMat);
      m.position.set(w.p[0], w.p[1], w.p[2]);
      m.castShadow = true;
      m.receiveShadow = true;
      g.add(m);
    }

    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 5; i++) {
        const shelf = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.08, 0.6 + Math.random() * 0.6),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random() * 0.15 + 0.55, 0.4, 0.3 + Math.random() * 0.3),
            roughness: 0.8,
          }),
        );
        shelf.position.set(side * (ARENA.halfWidth - 0.25), 0.5 + Math.random() * 3.2, (Math.random() - 0.5) * 6);
        shelf.rotation.y = (Math.random() - 0.5) * 0.3;
        g.add(shelf);
      }
    }

    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 5; i++) {
        const shelf = new THREE.Mesh(
          new THREE.BoxGeometry(0.6 + Math.random() * 0.6, 0.08, 0.08),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random() * 0.15 + 0.55, 0.4, 0.3 + Math.random() * 0.3),
            roughness: 0.8,
          }),
        );
        shelf.position.set((Math.random() - 0.5) * 6, 0.5 + Math.random() * 3.2, side * (ARENA.halfDepth - 0.25));
        shelf.rotation.z = (Math.random() - 0.5) * 0.3;
        g.add(shelf);
      }
    }

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 2.2, 0.15, 32),
      new THREE.MeshStandardMaterial({ color: '#3d3d6b', roughness: 0.4, metalness: 0.1 }),
    );
    platform.position.y = 0.15;
    platform.receiveShadow = true;
    g.add(platform);

    return g;
  }

  private spawnOrbs(): void {
    const radius = 2.4;
    const yBase = 1.2;
    const center = new THREE.Vector3(0, yBase, 0);
    PRINCIPLES.forEach((p, i) => {
      const angle = (i / PRINCIPLES.length) * Math.PI * 2;
      const pos = new THREE.Vector3(
        center.x + Math.cos(angle) * radius,
        yBase,
        center.z + Math.sin(angle) * radius,
      );
      const orb = new PrincipleOrb(p, pos);
      this.orbs.push(orb);
      this.scene.add(orb.group);
    });
  }

  /* ---- Input & Raycasting ---- */

  private get interactable(): boolean {
    return this.phaseSys.state.phaseStarted && !this.awaitingChoice;
  }

  private handleClick(): void {
    const ndc = this.input.consumeClick();
    if (!ndc || !this.interactable) return;

    this.raycaster.setFromCamera(ndc, this.camera);
    const targets = this.orbs.map(o => o.core);
    const hits = this.raycaster.intersectObjects(targets);
    if (hits.length === 0) return;

    const hitObj = hits[0].object;
    const orb = this.orbs.find(o => o.core === hitObj);
    if (!orb) return;

    const dist = orb.getPosition().distanceTo(this.player.group.position);
    if (dist > ORB_INTERACT_DIST) {
      this.setStatus('靠近一些再点击光球');
      return;
    }

    this.openChallenge(orb);
  }

  private updateHover(): void {
    // continuous hover detection via raycasting
    if (!this.interactable) {
      if (this.hoveredOrb) { this.hoveredOrb.hovered = false; this.hoveredOrb = null; }
      return;
    }

    // Use center of screen for hover detection (crosshair-style)
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const targets = this.orbs.map(o => o.core);
    const hits = this.raycaster.intersectObjects(targets);
    let found: PrincipleOrb | null = null;

    if (hits.length > 0) {
      const hitObj = hits[0].object;
      const orb = this.orbs.find(o => o.core === hitObj) ?? null;
      if (orb) {
        const dist = orb.getPosition().distanceTo(this.player.group.position);
        if (dist <= ORB_INTERACT_DIST) found = orb;
      }
    }

    if (found !== this.hoveredOrb) {
      if (this.hoveredOrb) this.hoveredOrb.hovered = false;
      this.hoveredOrb = found;
      if (found) found.hovered = true;
    }
  }

  /* ---- Challenge UI ---- */

  private openChallenge(orb: PrincipleOrb): void {
    const { phase } = this.phaseSys.state;
    const challenge: ChallengeDef =
      phase === 'study' ? studyChallenge(orb.principle.id) :
      phase === 'work' ? workChallenge(orb.principle.id) :
      entrepreneurChallenge(orb.principle.id);

    this.awaitingChoice = true;
    this.getElement('#cc-icon').textContent = challenge.icon;
    this.getElement('#cc-title').textContent = challenge.title;
    this.getElement('#cc-desc').textContent = challenge.desc;
    const btns = this.getElement('#cc-buttons');
    btns.innerHTML = '';
    challenge.choices.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.className = 'cc-btn';
      btn.dataset.principle = String(orb.principle.id);
      btn.dataset.xp = String(c.xp);
      btn.dataset.result = c.result;
      btn.dataset.index = String(i);
      btn.textContent = `A${i + 1}: ${c.text}`;
      btns.appendChild(btn);
    });
    this.getElement('#choice-panel').classList.remove('hidden');
  }

  private bindChoiceButtons(): void {
    const panel = this.getElement('#choice-panel');
    panel.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.cc-btn') as HTMLButtonElement | null;
      if (!btn) return;
      const principleId = parseInt(btn.dataset.principle!);
      const xp = parseInt(btn.dataset.xp!);
      const result = btn.dataset.result!;
      panel.classList.add('hidden');
      this.awaitingChoice = false;
      this.phaseSys.addXP(principleId, xp);
      this.showResult(result);
      this.phaseSys.nextDay();
      this.checkPhaseTransition();
    });
  }

  private showResult(text: string): void {
    const toast = this.getElement('#result-toast');
    this.getElement('#rt-icon').textContent = '💡';
    this.getElement('#rt-text').textContent = text;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  }

  /* ---- Phase Logic ---- */

  private checkPhaseTransition(): void {
    const { phase, principles } = this.phaseSys.state;
    if (phase === 'study' && this.phaseSys.checkStudyComplete()) {
      this.phaseSys.advancePhase();
      this.setStatus('🎉 所有原理已掌握！准备进入打工阶段');
      this.phaseSys.addMoney(100);
      this.phaseSys.addRep(20);
      this.syncHUD();
    } else if (phase === 'work') {
      let allLv2 = true;
      for (const p of principles.values()) { if (p.level < 2) { allLv2 = false; break; } }
      if (allLv2) {
        this.phaseSys.advancePhase();
        this.setStatus('🚀 打工经验已满！准备创业！');
        this.phaseSys.addMoney(500);
        this.phaseSys.addRep(50);
        this.syncHUD();
      }
    } else if (phase === 'entrepreneur') {
      let allLv3 = true;
      for (const p of principles.values()) { if (p.level < 3) { allLv3 = false; break; } }
      if (allLv3) {
        this.setStatus('🏆 恭喜！你已成为说服力行业领袖！');
      }
    }
  }

  /* ---- HUD Sync ---- */

  private syncHUD(): void {
    const s = this.phaseSys.state;
    const phaseLabels: Record<string, string> = { study:'📚 学习', work:'💼 打工', entrepreneur:'🏢 创业' };
    this.getElement('#phase-badge').textContent = phaseLabels[s.phase] ?? s.phase;
    this.getElement('#day-num').textContent = String(s.day);
    this.getElement('#stat-money').textContent = String(s.money);
    this.getElement('#stat-rep').textContent = String(s.reputation);
  }

  private setStatus(text: string): void {
    this.getElement('#status-line').textContent = text;
  }

  /* ---- Main Loop ---- */

  private update(delta: number, elapsed: number): void {
    this.frame++;
    if (!this.phaseSys.state.phaseStarted) {
      if (this.hoveredOrb) { this.hoveredOrb.hovered = false; this.hoveredOrb = null; }
      this.render();
      return;
    }
    this.elapsed += delta;

    resizeRenderer(this.renderer, this.camera, this.tuning.maxDpr);
    this.player.update(delta, elapsed, this.input, this.tuning, ARENA);
    for (const orb of this.orbs) orb.update(delta, elapsed);
    this.cameraRig.update(delta, this.player.group.position, this.tuning.cameraLag);
    this.updateHover();
    this.handleClick();
    this.publishDiagnostics();
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /* ---- Utilities ---- */

  private patternCanvas(size: number, bg: string, fg: string, step: number): THREE.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = fg;
    ctx.lineWidth = 1;
    for (let i = 0; i <= size; i += step) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  private publishDiagnostics(): void {
    const info = this.renderer.info;
    window.__THREE_GAME_DIAGNOSTICS__ = {
      frame: this.frame,
      elapsed: this.elapsed,
      phase: this.phaseSys.state.phase,
      day: this.phaseSys.state.day,
      money: this.phaseSys.state.money,
      reputation: this.phaseSys.state.reputation,
      player: { position: { x: this.player.group.position.x, y: this.player.group.position.y, z: this.player.group.position.z }, speed: this.player.velocity.length() },
      renderer: { calls: info.render.calls, triangles: info.render.triangles, geometries: info.memory.geometries, textures: info.memory.textures },
      canvas: { clientWidth: this.canvas.clientWidth, clientHeight: this.canvas.clientHeight, width: this.canvas.width, height: this.canvas.height, dpr: Math.min(window.devicePixelRatio || 1, this.tuning.maxDpr) },
    };
  }

  private getElement(sel: string): HTMLElement {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) throw new Error(`Missing element: ${sel}`);
    return el;
  }
}
