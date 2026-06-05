// ==================== 游戏参数配置 ====================
var ctx = myCanvas.getContext("2d");
var FPS = 40;                      // 游戏帧率
var jump_amount = -7;              // 小鸟上升高度（负值表示向上）
var max_fall_speed = +10;          // 最大下降速度
var acceleration = 1;              // 重力加速度
var pipe_speed = -2;               // 管道移动速度
var game_mode = "prestart";        // 游戏状态: prestart, running, over
var time_game_last_running;        // 上次游戏结束时间
var bottom_bar_offset = 0;         // 底部滚动条偏移量
var pipes = [];                    // 管道数组

// ==================== 分数统计系统 ====================
var current_score = 0;             // 当前分数
var high_score = 0;                // 最高分
var final_score = 0;               // 最终分数（游戏结束时锁定）

// ==================== 精灵类（游戏对象基类） ====================
function MySprite(img_url) {
  this.x = 0;                        // X坐标
  this.y = 0;                        // Y坐标
  this.visible = true;               // 是否可见
  this.velocity_x = 0;               // X轴速度
  this.velocity_y = 0;               // Y轴速度
  this.MyImg = new Image();          // 图片对象
  this.MyImg.src = img_url || "";    // 图片地址
  this.angle = 0;                    // 旋转角度
  this.flipV = false;                // 垂直翻转
  this.flipH = false;                // 水平翻转
}

// 精灵每帧渲染和更新方法
MySprite.prototype.Do_Frame_Things = function () {
  ctx.save();
  // 移动到精灵中心点
  ctx.translate(this.x + this.MyImg.width / 2, this.y + this.MyImg.height / 2);
  // 旋转画布
  ctx.rotate((this.angle * Math.PI) / 180);
  // 处理翻转
  if (this.flipV) ctx.scale(1, -1);
  if (this.flipH) ctx.scale(-1, 1);
  // 绘制图像
  if (this.visible)
    ctx.drawImage(this.MyImg, -this.MyImg.width / 2, -this.MyImg.height / 2);
  // 更新位置
  this.x = this.x + this.velocity_x;
  this.y = this.y + this.velocity_y;
  ctx.restore();
};

// ==================== 本地存储管理 ====================
function loadHighScore() {
  var saved = localStorage.getItem('flappybird_highscore');
  high_score = saved ? parseInt(saved) : 0;
}

function saveHighScore() {
  localStorage.setItem('flappybird_highscore', high_score);
}

// ==================== 分数计算 ====================
function calculateScore() {
  current_score = 0;
  for (var i = 0; i < pipes.length; i++) {
    // 每过一个管道得0.5分
    if (pipes[i].x + pipes[i].MyImg.width < bird.x) {
      current_score += 0.5;
    }
  }
  return Math.floor(current_score);
}

function updateHighScore() {
  var score = calculateScore();
  if (score > high_score) {
    high_score = score;
    saveHighScore();
    return true; // 返回true表示打破记录
  }
  return false;
}

// ==================== 碰撞检测 ====================
function ImagesTouching(thing1, thing2) {
  // 如果任一对象不可见，不碰撞
  if (!thing1.visible || !thing2.visible) return false;
  
  // 检查X轴重叠
  if (
    thing1.x >= thing2.x + thing2.MyImg.width ||
    thing1.x + thing1.MyImg.width <= thing2.x
  )
    return false;
  
  // 检查Y轴重叠
  if (
    thing1.y >= thing2.y + thing2.MyImg.height ||
    thing1.y + thing1.MyImg.height <= thing2.y
  )
    return false;
  
  // 两轴都重叠，表示碰撞
  return true;
}
// ==================== 玩家输入处理 ====================
function Got_Player_Input(MyEvent) {
  switch (game_mode) {
    case "prestart": {
      // 首次点击：开始游戏
      game_mode = "running";
      break;
    }
    case "running": {
      // 游戏运行中：小鸟往上跳
      bird.velocity_y = jump_amount;
      break;
    }
    case "over":
      // 游戏结束：1秒后可以重新开始
      if (new Date() - time_game_last_running > 1000) {
        reset_game();
        game_mode = "running";
        break;
      }
  }
  MyEvent.preventDefault();
}

// 监听各种输入事件
addEventListener("touchstart", Got_Player_Input);  // 触摸屏
 addEventListener("mousedown", Got_Player_Input);    // 鼠标点击
addEventListener("keydown", Got_Player_Input);      // 键盘按键

// ==================== 小鸟物理模拟 ====================
function make_bird_slow_and_fall() {
  // 应用重力加速度
  if (bird.velocity_y < max_fall_speed) {
    bird.velocity_y = bird.velocity_y + acceleration;
  }
  
  // 检查是否掉落到底部
  if (bird.y > myCanvas.height - bird.MyImg.height) {
    bird.velocity_y = 0;
    if (game_mode !== "over") {
      final_score = calculateScore(); // 锁定最终分数
      updateHighScore();
    }
    game_mode = "over";
  }
  
  // 检查是否飞出顶部
  if (bird.y < 0 - bird.MyImg.height) {
// Project: WebGameHub
    bird.velocity_y = 0;
    if (game_mode !== "over") {
      final_score = calculateScore(); // 锁定最终分数
      updateHighScore();
    }
    game_mode = "over";
  }
}

// ==================== 添加管道 ====================
function add_pipe(x_pos, top_of_gap, gap_width) {
  // 创建上方管道
  var top_pipe = new MySprite();
  top_pipe.MyImg = pipe_piece;
  top_pipe.x = x_pos;
  top_pipe.y = top_of_gap - pipe_piece.height;
  top_pipe.velocity_x = pipe_speed;
  pipes.push(top_pipe);
  
  // 创建下方管道（翻转显示）
  var bottom_pipe = new MySprite();
  bottom_pipe.MyImg = pipe_piece;
  bottom_pipe.flipV = true;  // 垂直翻转
  bottom_pipe.x = x_pos;
  bottom_pipe.y = top_of_gap + gap_width;
  bottom_pipe.velocity_x = pipe_speed;
  pipes.push(bottom_pipe);
}

// ==================== 小鸟傾斜角度 ====================
function make_bird_tilt_appropriately() {
  // 往上飞时头部抬起
  if (bird.velocity_y < 0) {
    bird.angle = -15;
  } 
  // 往下掉时头部下低
  else if (bird.angle < 70) {
    bird.angle = bird.angle + 4;
  }
}

// ==================== 渲染所有管道 ====================
function show_the_pipes() {
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].Do_Frame_Things();
  }
}

// ==================== 检查游戏结束 ====================
function check_for_end_game() {
  // 检查小鸟是否与任何管道碰撞
  for (var i = 0; i < pipes.length; i++) {
    if (ImagesTouching(bird, pipes[i])) {
      game_mode = "over";
      final_score = calculateScore(); // 锁定最终分数
      updateHighScore(); // 游戏结束时更新最高分
      return;
    }
  }
}
// ==================== 显示开始提示 ====================
function display_intro_instructions() {
  // 标题
  ctx.font = "bold 35px Arial";
  ctx.fillStyle = "#FFD700";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  ctx.strokeText("Flappy Bird", myCanvas.width / 2, myCanvas.height / 3 - 20);
  ctx.fillText("Flappy Bird", myCanvas.width / 2, myCanvas.height / 3 - 20);
  
  // 开始提示
/* Developer: SinceraXY - CUPB */
  ctx.font = "22px Arial";
  ctx.fillStyle = "#FFF";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeText("Press, touch or click to start", myCanvas.width / 2, myCanvas.height / 3 + 30);
  ctx.fillText("Press, touch or click to start", myCanvas.width / 2, myCanvas.height / 3 + 30);
  
  // 显示最高分
  if (high_score > 0) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFD700";
    ctx.strokeText("🏆 High Score: " + high_score, myCanvas.width / 2, myCanvas.height / 3 + 70);
    ctx.fillText("🏆 High Score: " + high_score, myCanvas.width / 2, myCanvas.height / 3 + 70);
  }
}

// ==================== 显示实时分数 ====================
function display_current_score() {
  var score = calculateScore();
  
  // 分数背景
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(10, 10, 180, 80);
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 180, 80);
  
  // 当前分数
  ctx.font = "bold 24px Arial";
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "left";
  ctx.fillText("🐦 Score: " + score, 20, 40);
  
  // 最高分
  ctx.font = "18px Arial";
  ctx.fillStyle = "#FFD700";
  ctx.fillText("🏆 Best: " + high_score, 20, 70);
}

// ==================== 显示游戏结束 ====================
function display_game_over() {
  var score = final_score; // 使用锁定的最终分数
  var isNewRecord = score > high_score; // 只有超过最高分才算新纪录
  
  // 半透明背景
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
  
  // 游戏结束标题
  ctx.font = "bold 50px Arial";
  ctx.fillStyle = "#FF4444";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";
  ctx.strokeText("Game Over", myCanvas.width / 2, 100);
  ctx.fillText("Game Over", myCanvas.width / 2, 100);
  
  // 分数板背景
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(myCanvas.width / 2 - 150, 130, 300, 140);
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 3;
  ctx.strokeRect(myCanvas.width / 2 - 150, 130, 300, 140);
  
  // 当前分数
  ctx.font = "28px Arial";
  ctx.fillStyle = "#FFF";
  ctx.fillText("🐦 Your Score", myCanvas.width / 2, 165);
  ctx.font = "bold 40px Arial";
  ctx.fillStyle = "#FFD700";
  ctx.fillText(score, myCanvas.width / 2, 210);
  
  // 最高分
  ctx.font = "22px Arial";
  ctx.fillStyle = isNewRecord ? "#FF1493" : "#FFF";

// GitHub: https://github.com/nilgpt2024/web-game

  var recordText = isNewRecord ? "🎉 NEW RECORD! 🎉" : "🏆 High Score: " + high_score;
  ctx.fillText(recordText, myCanvas.width / 2, 250);
  
  // 重新开始提示
  ctx.font = "20px Arial";
  ctx.fillStyle = "#FFF";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeText("Click, touch, or press to play again", myCanvas.width / 2, 320);
  ctx.fillText("Click, touch, or press to play again", myCanvas.width / 2, 320);
}

// ==================== 显示底部滚动条 ====================
function display_bar_running_along_bottom() {
  // 循环滚动效果
  if (bottom_bar_offset < -23) bottom_bar_offset = 0;
  ctx.drawImage(
    bottom_bar,
    bottom_bar_offset,
    myCanvas.height - bottom_bar.height
  );
}

// ==================== 重置游戏 ====================
function reset_game() {
  bird.y = myCanvas.height / 2;   // 重置小鸟位置
  bird.angle = 0;                 // 重置角度
  bird.velocity_y = 0;            // 重置速度
  pipes = [];                     // 清空管道数组
  current_score = 0;              // 重置当前分数
  final_score = 0;                // 重置最终分数
  add_all_my_pipes();             // 重新加载管道
}
// ==================== 初始化所有管道 ====================
function add_all_my_pipes() {
  // 添加一系列管道 (X位置, 间隙顶部, 间隙宽度)
  add_pipe(500, 100, 140);
  add_pipe(800, 50, 140);
  add_pipe(1000, 250, 140);
  add_pipe(1200, 150, 120);
  add_pipe(1600, 100, 120);
  add_pipe(1800, 150, 120);
  add_pipe(2000, 200, 120);
  add_pipe(2200, 250, 120);
  add_pipe(2400, 30, 100);
  add_pipe(2700, 300, 100);
  add_pipe(3000, 100, 80);
  add_pipe(3300, 250, 80);
  add_pipe(3600, 50, 60);
  
  // 添加终点线
  var finish_line = new MySprite("http://s2js.com/img/etc/flappyend.png");
  finish_line.x = 3900;
  finish_line.velocity_x = pipe_speed;
  pipes.push(finish_line);
}

// ==================== 加载管道图像 ====================
var pipe_piece = new Image();
pipe_piece.onload = add_all_my_pipes;  // 图像加载完成后初始化管道
pipe_piece.src = "http://s2js.com/img/etc/flappypipe.png";
// ==================== 主游戏循环 ====================
function Do_a_Frame() {
  // 清空画布
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  
  // 渲染小鸟
  bird.Do_Frame_Things();
  
  // 渲染底部滚动条
  display_bar_running_along_bottom();
  
  // 根据游戏状态执行不同逻辑
  switch (game_mode) {
    case "prestart": {
      // 游戏开始前：显示提示
      display_intro_instructions();
      break;
    }
    case "running": {
      // 游戎运行中
      time_game_last_running = new Date();
      bottom_bar_offset = bottom_bar_offset + pipe_speed;
      show_the_pipes();
      make_bird_tilt_appropriately();
      make_bird_slow_and_fall();
      check_for_end_game();
      display_current_score(); // 显示实时分数
      break;
    }
    case "over": {
      // 游戎结束
      show_the_pipes(); // 继续显示管道
      make_bird_slow_and_fall();
      display_game_over();
      break;
    }
  }
}

// ==================== 加载底部图像 ====================
var bottom_bar = new Image();
bottom_bar.src = "http://s2js.com/img/etc/flappybottom.png";

// ==================== 创建小鸟 ====================
var bird = new MySprite("http://s2js.com/img/etc/flappybird.png");
bird.x = myCanvas.width / 3;    // 设置初始 X 位置
bird.y = myCanvas.height / 2;   // 设置初始 Y 位置

// ==================== 游戏初始化 ====================
function initGame() {
  loadHighScore();  // 加载最高分
  console.log("🐦 Flappy Bird 游戏已启动！");
  console.log("🎮 点击屏幕或按空格键开始游戏");
  if (high_score > 0) {
    console.log("🏆 当前最高分: " + high_score);
  }
}

// ==================== 启动游戏循环 ====================
initGame();  // 初始化游戏
setInterval(Do_a_Frame, 1000 / FPS);  // 每 1000/40 = 25ms 执行一次
