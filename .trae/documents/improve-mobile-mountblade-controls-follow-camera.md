# 进一步优化「骑马与砍杀」操控与马头方向辨识度方案

## 1. 摘要（Summary）

用户反馈当前游戏「不好控制」「不好区分马头方向」，并要求重点考虑移动端方便操控。根据用户选择，本次方案将：

1. **移动端改为“摇杆指向 = 马头方向 + 相机自动跟随马背”**：左摇杆直接决定马的行进方向，镜头平滑地自动跟在马尾后方，让玩家始终能看到马头前方，降低方向迷失感。
2. **新增地面 / HUD 方向箭头**：在马脚下或屏幕中心显示一个始终指向前方的发光箭头，远距离或混乱战场也能瞬间判断马头朝向。
3. **顺手优化操控手感**：降低移动端最高速度/加速度和转向灵敏度，增加相机跟随延迟与缓冲，避免高速时过于飘忽。
4. **同步调整 UI / i18n**：放大移动端虚拟摇杆与按钮、更新操作说明、增加“镜头回正”按钮。

## 2. 当前状态分析（Current State Analysis）

| 文件 | 现状 | 问题 |
|------|------|------|
| `src/config.ts` | 已定义 `PLAYER.touch`（死区、灵敏度、自动冲刺、瞄准辅助） | 缺少**相机自动跟随**、**地面箭头**、**移动端速度修正**的独立配置 |
| `src/player.ts` | 移动端使用 `controlMode = 'absolute'`，摇杆向量映射为世界 yaw；相机 yaw 与马 yaw 完全同步（`unit.mesh.rotation.y = player.cameraYaw`） | 右侧滑动改变 cameraYaw 后，摇杆的“前”会随视角变化；玩家需要持续两手配合，容易晕眩 |
| `src/main.ts` | 左侧 40% 区域触发摇杆，右侧 60% 滑动转视角，按钮控制冲刺/武器/攻击 | 缺少“自动跟拍”逻辑；没有视觉指示器标明马头方向 |
| `src/units.ts` | 马头已做分色、马耳、缰绳、鞍褥滚边、燕尾旗、玩家专属黄色冠羽与尾带 | 在混战中/远距离/镜头快速转动时仍然不够醒目 |
| `src/style.css` / `index.html` | 已有触控控件基础样式 | 摇杆/按钮尺寸仍可再放大，缺少“方向箭头”与“镜头回正”元素 |
| `game-i18n.js` | 已有 `rule5` 等移动端文案 | 需更新为新的相机自动跟随说明 |

## 3. 具体改动方案（Proposed Changes）

### 3.1 `src/config.ts` — 新增移动端专属配置

新增常量分组：

```ts
export const PLAYER = {
  // ... 保留原有字段 ...
  mobile: {
    speedMultiplier: 0.85,          // 移动端最高速度乘数，避免太快难控
    turnSmoothing: 12,              // 比桌面更柔和的转向插值
    cameraFollowLerp: 4.5,          // 相机自动跟拍响应速度（越大越紧）
    cameraFollowDelay: 0.12,        // 镜头滞后系数，给转弯留出预判感
    recenterTimeout: 1.2,           // 玩家手动转视角后，多久恢复自动跟拍
  },
  forwardIndicator: {
    enabled: true,
    color: 0xfacc15,                // 亮黄色，与玩家冠羽一致
    size: 1.6,                      // 箭头长度
    offsetY: 0.15,                  // 略高于地面避免 z-fighting
    opacity: 0.75,
  },
};
```

并把 `touch.joystickDeadZone` 从 `0.15` 提升到 `0.18`，减少手指轻微抖动导致的误转向。

### 3.2 `src/player.ts` — 新增相机自动跟随与方向箭头

1. 扩展 `PlayerController` 接口：
   ```ts
   cameraFollowMode: boolean;
   cameraFollowTimer: number;   // 手动转视角后暂停跟拍的倒计时
   forwardIndicator?: THREE.Mesh;
   ```

2. `createPlayer` 中：
   - 若 `isMobileDevice()`，设置 `controlMode = 'absolute'`、`cameraFollowMode = true`、`cameraFollowTimer = 0`。
   - 调用 `createForwardIndicator(scene)` 并把网格挂到 `player.forwardIndicator`。

3. 新增 `updateCameraFollow(player, dt)`：
   - 仅当 `cameraFollowMode === true` 且 `cameraFollowTimer <= 0` 时生效。
   - 计算目标相机 yaw：`desiredCameraYaw = player.unit.mesh.rotation.y + Math.PI`（即从马背后看）。
   - 使用 `rotateToward` 平滑插值，插值速度使用 `PLAYER.mobile.cameraFollowLerp`。
   - 保持 `cameraPitch` 在合适范围。

4. 在 `updatePlayer` 的 `absolute` 分支里：
   - 仍使用 `targetYaw` 作为马的行进方向。
   - `input.move` 保持为摇杆幅值（油门）。
   - 速度上限乘以 `PLAYER.mobile.speedMultiplier`。
   - 转向插值系数改为 `PLAYER.mobile.turnSmoothing`。

5. 新增 `createForwardIndicator(scene)` / `updateForwardIndicator(player)`：
   - 创建一个扁平化的箭头（`THREE.ConeGeometry` 压扁 + 旋转，或 `THREE.ShapeGeometry`）。
   - 每帧把箭头放到马前 `forward * 2.5` 处，`y = terrainHeight + offsetY`，并朝向马的前方。
   - 移动端始终显示；桌面端可只在移动时显示（更干净）。

### 3.3 `src/main.ts` — 触控逻辑与主循环整合

1. 新增 DOM 引用：
   ```ts
   const btnCamera = document.getElementById('btn-camera') as HTMLButtonElement;
   const forwardHudArrow = document.getElementById('forward-hud-arrow') as HTMLElement;
   ```

2. 修改 `touchmove` 右侧滑动逻辑：
   - 滑动时把 `player.cameraFollowTimer` 设为 `PLAYER.mobile.recenterTimeout`，暂停自动跟拍。
   - 滑动结束后开始倒计时，倒计时归零再恢复跟拍。

3. 修改 `touchend`：
   - 摇杆释放时不仅清空 `input.move`，也把 `targetYaw` 清空；马自然减速到 0。

4. 新增“镜头回正”按钮事件：
   - 点击立即把 `cameraFollowTimer` 清零并调用一次 `updateCameraFollow`，让相机瞬间回到马背视角。

5. 在 `animate` 主循环中：
   - 每帧调用 `updateCameraFollow(player, dt)`。
   - 调用 `updateForwardIndicator(player)`。
   - 当马速度大于阈值时，让地面箭头透明度 slightly pulse，提供速度反馈。

6. 保留桌面端逻辑不变，仅通过 `cameraFollowMode` 开关区分。

### 3.4 `src/units.ts` — 进一步强化马头方向（辅助）

在 `createHorseMesh` 中做小幅增强：

- 把马耳从 `ConeGeometry(0.06, 0.18)` 改为 `(0.08, 0.28)`，更修长并前倾。
- 在马鼻梁上方加一条高对比度“额带”（白色/亮色），让正面轮廓更立体。
- 玩家马的黄色冠羽加粗一点，并在顶端加一个发光小球（`MeshBasicMaterial`），提升远距离识别度。

> 这些改动是“锦上添花”，核心方向辨识交给地面箭头。

### 3.5 `index.html` — 新增 HUD 箭头与镜头回正按钮

在 `#touch-controls` 的 `.action-buttons` 里追加：

```html
<button id="btn-camera" class="touch-btn camera" type="button">
  <i class="fas fa-video"></i>
</button>
```

在 `#app` 内新增 HUD 方向箭头（桌面和移动都可用，移动端更明显）：

```html
<div id="forward-hud-arrow" class="forward-hud-arrow hidden">
  <i class="fas fa-chevron-up"></i>
</div>
```

把操作说明 `rule5` 改为：

> 移动端：左侧摇杆控制马头方向，镜头自动跟随，按钮射击/挥砍；滑动右侧可临时转视角。

### 3.6 `src/style.css` — 样式调整

- `.joystick` 尺寸从 `150px` 增大到 `170px`；`.joystick-knob` 从 `58px` 到 `66px`。
- `.touch-btn.attack` 从 `100px` 增大到 `110px`。
- 新增 `.touch-btn.camera`：圆形、带相机图标、位于冲刺按钮上方。
- 新增 `.forward-hud-arrow`：固定在马屏幕投影位置（通过 JS 动态 `left/top`），默认半透明，移动时高亮。
- 确保 `.touch-controls.active ~ .weapon-hint` 仍生效，避免桌面提示遮挡。

### 3.7 `game-i18n.js` — 文案更新

- `specific.MountBlade.rule5` 中文/英文同步改为新的自动跟随说明。
- 新增 `specific.MountBlade.recenterCamera`：`镜头回正` / `Recenter`。
- 可选：新增 `specific.MountBlade.forwardArrow` 提示 toast，首次进入游戏时显示“地面的黄色箭头指示马头方向”。

## 4. 假设与决策（Assumptions & Decisions）

- **桌面端保持不变**：WASD + 鼠标自由视角已经是成熟的 PC 控制方式，本次只把“自动跟拍”应用于移动端 `absolute` 模式。
- **摇杆向量仍相对于相机，但相机会自动回到马背后**：这样玩家在绝大多数时候只需要左手操作，右手只在需要环视战场时滑动。
- **地面箭头采用 HUD/世界混合**：世界坐标箭头能随地形起伏，HUD 箭头确保箭头始终可见；两者互补。
- **不再引入倒车概念**：移动端摇杆向后即“掉头前进”，符合常见的手机动作游戏直觉；桌面 S 键仍保持倒车。
- **性能可接受**：方向箭头是一个简单 mesh，自动跟随只是每帧一次角度插值，对 60 FPS 无影响。

## 5. 验证步骤（Verification Steps）

1. **TypeScript 编译**：
   ```bash
   cd games/Action/Archery-3D
   npm run build
   ```
   确保 0 errors、0 warnings（除已存在的 `THREE.Clock deprecated` 外）。

2. **桌面端回归**：
   - WASD 移动、鼠标瞄准、Shift 冲刺、空格攻击、1/2 切武器仍正常。
   - 马头方向不因为新增箭头而卡顿。

3. **移动端模拟（Chrome DevTools 切到 iPhone SE / Pixel 5）**：
   - 点击“开始”后触控控件出现，地面箭头在玩家马脚下。
   - 左摇杆向上推：马朝当前屏幕上方跑，相机平滑跟到马背后。
   - 左摇杆快速左右切换：马转弯，相机滞后跟随，不会瞬切。
   - 右侧滑动：相机临时自由转动，停止滑动约 1.2s 后自动回到马背视角。
   - 点击“镜头回正”按钮：相机立即回到马背后。
   - 攻击/冲刺/切武器按钮响应正常，武器名称更新正确。

4. **方向辨识度验证**：
   - 从多个角度（正面、背面、侧面、远距离）观察，地面黄色箭头始终清晰指向马头方向。
   - 在夜间/雾天/草丛环境中箭头对比度足够。

5. **国际化验证**：
   - 中英文切换后，移动端操作说明、`镜头回正` 按钮 tooltip 文案正确。

6. **构建产物**：
   - `npm run preview` 后，从 GameHub 大厅点击该游戏，页面能正常加载且无 404。
