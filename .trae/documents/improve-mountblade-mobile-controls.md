# 骑马与砍杀：移动端操控与马头方向优化计划

## 1. Summary

用户反馈当前游戏“不好控制，而且不好区分马头的方向”，并要求重点考虑移动端操控。本计划针对这两项核心问题：

1. **操控困难**：将移动端虚拟摇杆从“上下控制油门 / 左右控制转向”的坦克式操控，改为“摇杆指向哪里，马头就朝哪里、马就往哪里跑”的**绝对方向操控**，并加入**轻度弓箭瞄准辅助**。
2. **马头方向难辨**：在现有分色马头、马耳、鬃毛、鞍褥基础上，进一步增加**高可见度的方向标识**（顶部羽饰/燕尾旗、非对称鞍褥、更明显的鼻带），并针对移动端优化相机俯视角度，让玩家始终能从背后清晰判断马匹朝向。

## 2. Current State Analysis

### 2.1 当前操控实现

- **桌面端**：[src/player.ts](file:///d:/PycharmProjects/GameHub/games/Action/Archery-3D/src/player.ts) 通过 `input.move`/`input.turn` 模拟量控制，转向速度随速度递减，已做平滑处理。
- **移动端**：`main.ts` 中的 `updateJoystick` 把摇杆角度映射为 `move = -sin(angle) * magnitude` 和 `turn = cos(angle) * magnitude`。
  - 问题：玩家推摇杆“上”时马会朝**当前面朝方向**前进，而不是屏幕上方；推“右”时马会原地右转，而不是朝屏幕右侧移动。这导致移动设备上很难凭直觉判断最终走向。
- **相机**：越肩固定相机，由 `cameraOffset = (0, 4.2, 7.5)` 决定，会跟随 `cameraYaw`。

### 2.2 当前马头视觉

- [src/units.ts](file:///d:/PycharmProjects/GameHub/games/Action/Archery-3D/src/units.ts) 已做：
  - 前脸分色（`headFront` 浅米色鼻口）
  - 前倾马耳
  - 深色流线鬃毛
  - 阵营色鞍褥（caparison）
  - 玩家马匹额外黄色冠羽
- 问题：在移动端小屏幕、低分辨率、远距离或逆光场景下，头顶小冠羽和面部细节仍容易被遮挡或看不清。

### 2.3 当前移动端 UI

- 固定左下角摇杆、右侧视角区、右下角动作按钮。
- 摇杆为固定位置，不会跟随手指出现；按钮尺寸 64–90px，在部分小屏手机上仍偏小。

## 3. Proposed Changes

### 3.1 移动端摇杆改为绝对方向（src/player.ts + src/main.ts）

**目标**：摇杆向量直接映射为相机坐标系下的目标世界方向，马匹自动转向该方向并前进。

#### 3.1.1 数据结构变更

在 `PlayerController` 中增加绝对方向控制字段：

```typescript
export interface PlayerController {
  unit: Unit;
  cameraYaw: number;
  cameraPitch: number;
  input: {
    move: number; // 0..1 在绝对模式下表示推进幅度；桌面端仍为 -1..1
    turn: number; // 桌面端使用；绝对模式下忽略
    sprint: boolean;
    attack: boolean;
  };
  controlMode: 'relative' | 'absolute';
  targetYaw: number | null; // 仅 absolute 模式使用
  currentTurn: number;
  velocity: number;
  maxSpeedMod: number;
}
```

`createPlayer` 中根据 `isMobileDevice()` 初始化 `controlMode` 与 `targetYaw`。

#### 3.1.2 updatePlayer 改造

- 当 `controlMode === 'absolute'` 且 `targetYaw !== null` 时：
  1. 计算当前 `cameraYaw` 到 `targetYaw` 的最短有向角差。
  2. 按当前速度计算可用转向速率（沿用 `turnAtSpeed`、`sprintTurnPenalty`）。
  3. 将该角差钳制在可用转向速率内，平滑更新 `cameraYaw`。
  4. `input.move` 始终 ≥ 0，直接作为前进油门；倒车逻辑不再使用。
- 桌面端 `relative` 模式逻辑完全保留，避免回归。

#### 3.1.3 updateJoystick 改造（src/main.ts）

- 在 `touchstart` 中改为**动态摇杆**：当手指按在屏幕左侧 40% 区域时，将摇杆容器整体移动到触摸点。
- `updateJoystick` 中：
  - 计算摇杆向量 `(dx, dy)` 并归一化。
  - 构造相机坐标系下的目标方向：`worldDir = cameraForward * (-dy) + cameraRight * dx`。
  - 通过 `Math.atan2(worldDir.x, worldDir.z)` 得到 `targetYaw`。
  - `player.input.move = magnitude`（0..1）。
  - `player.targetYaw = targetYaw`。
- `touchend`/`touchcancel` 时清空 `targetYaw`，`input.move = 0`，摇杆归位并隐藏/复位。

### 3.2 移动端弓箭轻度瞄准辅助（src/main.ts + src/config.ts）

**目标**：触屏下精细瞄准困难，当准心靠近敌人上半身时，给予轻微吸附，但不自动锁定。

#### 3.2.1 配置常量

在 `PLAYER.touch` 中新增：

```typescript
aimAssist: {
  maxDistance: 55,
  coneAngle: 0.22, // 约 12.6°
  strength: 0.25,
  targetOffsetY: 2.0, // 瞄准敌人胸部高度
}
```

#### 3.2.2 辅助逻辑

在 `main.ts` 的拉弓循环中，仅在 `isMobileDevice()` 下执行：

1. 获取当前准心方向 `aimDir`。
2. 遍历所有敌军，跳过已死亡 / 友军。
3. 对每位敌人计算：
   - 水平距离 `dist`
   - 水平夹角 `angle`
   - 若 `dist < maxDistance` 且 `angle < coneAngle`，计算候选辅助方向 `assistDir = (enemyPos + offsetY - playerEye).normalized`
   - 按 `1 - angle/coneAngle` 作为权重，选择最佳目标。
4. 将当前 `cameraYaw`/`cameraPitch` 按 `strength * weight` 向目标方向插值。
5. 不改变鼠标/桌面瞄准行为。

### 3.3 增强马头方向辨识度（src/units.ts）

在现有视觉基础上新增/调整：

1. **顶部方向羽饰/燕尾旗（pennon）**
   - 在马背后方（鞍后）插一根向后上方倾斜的细长旗杆 + 燕尾旗，材质为阵营色半透明，受风微微摆动。
   - 长度 1.2–1.5，从玩家视角看始终朝马后上方延伸，明确标识“这是马的背部、相反方向是头部”。
2. **非对称鞍褥**
   - 当前鞍褥前后颜色相同；改为**前部浅色/后部深色**或在前端加一条亮色滚边，让“哪边是前”一目了然。
3. **鼻带与缰绳**
   - 在马鼻口处增加深色横向鼻带，连接到颈部两侧，强化“前脸”轮廓。
4. **玩家马匹专属方向标记**
   - 保留并加高黄色冠羽，同时在马尾梢增加黄色绑带，形成“前黄后黄”的轴线，让玩家一眼识别中轴线。

这些修改全部在 `createHorseMesh` 与 `createPlayer` 的玩家马匹专属标记中完成。

### 3.4 移动端相机与 UI 优化

#### 3.4.1 移动端相机参数（src/config.ts）

新增 `PLAYER.mobileCameraOffset`：

```typescript
mobileCameraOffset: new THREE.Vector3(0, 5.4, 10.5)
```

`createPlayer` 中根据 `isMobileDevice()` 选择相机偏移。更高的机位和更远的距离让玩家更容易看到马头和周围敌人。

#### 3.4.2 触控 UI 尺寸与动态摇杆（src/style.css + index.html）

- 摇杆区域从 120px 放大到 **150px**，触控死区视觉环更明显。
- 摇杆拇指从 48px 放大到 **58px**。
- 动作按钮最小尺寸从 64px 提高到 **72px**，攻击按钮 100px。
- 增加 `.joystick.active` 状态样式（高亮环）。
- 隐藏桌面端的武器切换提示 `weapon-hint` 在移动端显示，避免与触控按钮重叠；移动端改为在动作按钮上方显示一个迷你武器条。
- 在 `index.html` 说明面板中加入移动端专属操作提示（使用 `data-i18n` 支持中英文）。

#### 3.4.3 防止触控冲突

- 所有 `touchstart`/`touchmove` 保持 `preventDefault` 与 `passive: false`。
- 动态摇杆后，`isTouchOnActionButton` 判断区域保持不变，但按钮区域扩大到 160×280 以匹配新的按钮尺寸。

### 3.5 其他手感微调

- 移动端绝对模式下，摇杆推到 **90% 以上**时自动触发冲刺（可选），保留冲刺按钮作为显式开关。
- 增加相机转向时的侧倾角度（从 0.12 提升到 0.18 在移动端），让高速转弯更有反馈。

## 4. Assumptions & Decisions

1. **绝对方向 vs 相对转向**：已征得用户同意采用“绝对方向”摇杆，因此桌面端 `relative` 逻辑保留，移动端使用新逻辑。
2. **瞄准辅助**：仅对移动端弓箭生效，近战挥砍不受影响；吸附强度较低（0.25），保留技术空间。
3. **摇杆无倒车**：绝对方向模式下不提供倒车；需要后退时玩家可将马头转向相机方向再前进，符合移动端动作游戏习惯。
4. **动态摇杆**：摇杆在用户首次触摸左侧区域时出现在手指下，避免固定摇杆够不到的问题。
5. **相机高度**：移动端略微抬高机位，不会破坏沉浸感，但能显著改善战场态势感知。
6. **构建与验证**：修改完成后需重新运行 `npm run build` 与 `npm run preview`，并在浏览器移动端模拟器中验证摇杆、瞄准、按钮、胜负判定。

## 5. Verification Steps

1. **构建检查**
   - `npm run build` 在 `d:\PycharmProjects\GameHub\games\Action\Archery-3D` 成功无 TypeScript 错误。
2. **桌面端回归测试**
   - WASD + 鼠标控制手感与之前一致。
   - 鼠标瞄准、左键拉弓/挥剑、1/2 切武器正常。
3. **移动端摇杆测试（浏览器 DevTools 移动模拟）**
   - 触摸左侧屏幕出现摇杆并跟随手指。
   - 推摇杆“上”马朝屏幕上方（相机前方）移动。
   - 推摇杆“右”马朝屏幕右侧移动。
   - 松开摇杆马停止并保留当前朝向。
4. **马头方向辨识度测试**
   - 从背后观察玩家马匹，能清晰看到顶部羽饰/燕尾旗指向后方、鞍褥前缘亮色、鼻带清晰。
   - 在不同光照和距离下仍能辨认马头朝向。
5. **瞄准辅助测试**
   - 装备弓箭，将准心靠近敌人时准心轻微向敌人中心移动。
   - 准心远离敌人后无吸附。
   - 切换剑后无吸附。
6. **UI 与按钮测试**
   - 移动端触控按钮响应灵敏，无与摇杆/视角区冲突。
   - 武器按钮显示当前武器，点击切换更新 HUD。
   - 攻击按钮长按拉弓、松开射箭；剑模式点击挥砍。
7. **胜负判定测试**
   - 击败敌方将领后弹出胜利界面。
   - 玩家 HP 归零后弹出战败界面。
8. **中英文切换**
   - 移动端说明文本随语言切换正确更新。

## 6. Files to Modify

| 文件 | 修改内容 |
|------|----------|
| [src/config.ts](file:///d:/PycharmProjects/GameHub/games/Action/Archery-3D/src/config.ts) | 新增 `mobileCameraOffset`、`PLAYER.touch.aimAssist` 等常量 |
| [src/player.ts](file:///d:/PycharmProjects/GameHub/games/Action/Archery-3D/src/player.ts) | `PlayerController` 增加 `controlMode`/`targetYaw`；`createPlayer` 根据移动设备初始化；`updatePlayer` 支持 absolute 模式 |
| [src/main.ts](file:///d:/PycharmProjects/GameHub/games/Action/Archery-3D/src/main.ts) | 动态摇杆、绝对方向映射、瞄准辅助调用、按钮区域调整 |
| [src/units.ts](file:///d:/PycharmProjects/GameHub/games/Action/Archery-3D/src/units.ts) | 增强马匹方向视觉：燕尾旗、非对称鞍褥、鼻带、玩家专属标记 |
| [src/style.css](file:///d:/PycharmProjects/GameHub/games/Action/Archery-3D/src/style.css) | 触控控件尺寸、动态摇杆样式、移动端武器提示隐藏 |
| [index.html](file:///d:/PycharmProjects/GameHub/games/Action/Archery-3D/index.html) | 增加移动端操作说明条目 |
