// 游戏子页面通用国际化模块
const GAME_TRANSLATIONS = {
    'zh-CN': {
        common: {
            backToHub: '返回游戏大厅',
            score: '分数',
            highScore: '最高分',
            newGame: '重新开始',
            restart: '重新开始',
            start: '开始',
            pause: '暂停',
            resume: '继续',
            help: '帮助',
            howToPlay: '如何玩',
            rules: '游戏规则',
            tips: '游戏技巧',
            gameOver: '游戏结束',
            victory: '胜利',
            level: '关卡',
            time: '时间',
            win: '赢了',
            lose: '输了',
            continue: '继续',
            tryAgain: '再试一次',
            nextLevel: '下一关',
            prevLevel: '上一关',
            menu: '菜单',
            settings: '设置',
            soundOn: '声音开',
            soundOff: '声音关',
            language: '语言'
        },
        ui: {
            clickOrSpace: '点击或按空格键',
            arrowKeys: '使用方向键',
            touchControls: '触屏控制',
            avoidObstacles: '避开障碍物',
            collectItems: '收集物品',
            realTimeScore: '实时计分',
            highScoreRecord: '最高分记录',
            newRecord: '破纪录提示',
            localSave: '本地存储',
            features: '游戏特色',
            howToPlayTitle: '游戏说明',
            goal: '游戏目标',
            controls: '操作方式',
            keyboard: '键盘',
            mobile: '移动端',
            rulesTitle: '游戏规则',
            tipsTitle: '游戏技巧'
        },
        specific: {
            '2048': {
                title: '2048',
                desc: '合并相同数字，挑战 2048 方块！',
                helpTitle: '📖 游戏说明',
                goal: '合并相同的数字方块，最终达到 2048！',
                controlsKey: '键盘：使用方向键 ⬆️ ⬇️ ⬅️ ➡️',
                controlsMobile: '移动端：点击屏幕下方的方向按钮',
                rules1: '每次移动时，所有方块会向指定方向滑动',
                rules2: '相同数字的方块碰撞时会合并',
                rules3: '合并后的数字等于两者之和',
                rules4: '每次移动后会随机生成一个新方块（2或4）',
                rules5: '无法移动时游戏结束',
                tip1: '尽量把大数字放在角落',
                tip2: '保持方块按顺序排列',
                tip3: '避免棋盘过于分散',
                tip4: '提前规划移动路线'
            },
            'Flappy-Bird': {
                title: 'Flappy Bird',
                desc: '点击或按空格键控制小鸟飞翔',
                control: '点击屏幕或按空格键控制',
                goal: '避开管道，飞得更远！'
            },
            'Breakout': {
                title: 'Breakout',
                desc: '打砖块游戏',
                control: '鼠标或键盘控制'
            },
            'Snake': {
                title: '贪吃蛇',
                subtitle: '吃食物，变长，活下去！',
                difficulty: '难度选择',
                statistics: '统计数据',
                score: '分数',
                length: '长度',
                best: '最佳',
                resetStats: '重置统计',
                resetStatsTitle: '重置所有统计数据',
                playAgain: '再玩一局',
                difficulty: {
                    easy: '简单',
                    easySpeed: '慢速',
                    medium: '中等',
                    mediumSpeed: '正常',
                    hard: '困难',
                    hardSpeed: '快速'
                },
                stats: {
                    gamesPlayed: '游戏次数',
                    highestScore: '最高分',
                    totalFoodEaten: '总吃食数'
                },
                overlay: {
                    start: '点击或按空格开始游戏',
                    hint: '蛇将自动开始移动 | 使用方向键控制'
                },
                gameOver: {
                    title: '游戏结束！',
                    score: '得分',
                    length: '长度',
                    message: '下次好运！'
                }
            },
            'Tetris': {
                title: '俄罗斯方块',
                desc: '经典方块消除游戏',
                rulesBtn: '规则',
                clickToStart: '点击开始游戏',
                nextPiece: '下一个',
                gameOver: '游戏结束',
                control: {
                    move: '移动',
                    rotate: '旋转',
                    drop: '下落'
                },
                stats: {
                    level: '等级',
                    lines: '行数',
                    score: '分数',
                    time: '时间'
                },
                btn: {
                    start: '开始游戏',
                    pause: '暂停',
                    restart: '重新开始',
                    playAgain: '再玩一次'
                },
                tip: {
                    esc: '暂停/继续',
                    space: '硬降'
                },
                rules: {
                    title: '游戏规则',
                    controlsTitle: '操作方式',
                    moveLeftRight: '左右移动方块',
                    rotate: '旋转方块',
                    softDrop: '软降（加速下落）',
                    hardDrop: '硬降（直接落地）',
                    pauseResume: '暂停/继续游戏',
                    objectiveTitle: '游戏目标',
                    obj1: '填满一整行即可消除',
                    obj2: '同时消除多行可获得额外加分',
                    obj3: '等级提升后速度会加快',
                    obj4: '方块堆到顶部时游戏结束',
                    scoringTitle: '计分规则',
                    score1: '消除 1 行：100 分',
                    score2: '消除 2 行：300 分',
                    score3: '消除 3 行：500 分',
                    score4: '消除 4 行：800 分（Tetris！）'
                },
                final: {
                    score: '最终得分',
                    lines: '消除行数',
                    time: '游戏时长',
                    level: '最高等级'
                }
            },
            'Pac-Man': {
                title: '🟡 PAC-MAN',
                subtitle: '经典街机游戏 - 收集豆子，躲避幽灵，挑战极限！',
                startTitle: 'PAC-MAN',
                startSubtitle: '准备好开始经典街机冒险了吗？',
                startHint: '收集所有豆子，躲避幽灵！',
                startGame: '开始游戏',
                paused: '已暂停',
                pausedSubtitle: '游戏已暂停',
                resumeGame: '继续游戏',
                backToMenu: '返回主菜单',
                pauseTip: '按 <kbd>P</kbd> 键快速继续',
                pause: '暂停',
                sound: '音效',
                gameRules: '游戏规则',
                controlsTitle: '操作控制',
                controlsDesc: '使用方向键 <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> 或 <kbd>WASD</kbd> 移动吃豆人',
                collectDotsTitle: '收集豆子',
                collectDotsDesc: '吃掉所有小豆子得分，收集完毕进入下一关卡',
                powerPelletTitle: '能量豆子',
                powerPelletDesc: '吃大豆子可短暂反击幽灵，获得额外高分奖励',
                avoidGhostsTitle: '躲避幽灵',
                avoidGhostsDesc: '避开四个幽灵追击，每条生命都很珍贵',
                ghostBlinky: 'Blinky（追击者）',
                ghostBlinkyDesc: '红色幽灵，直接追踪你的位置',
                ghostPinky: 'Pinky（伏击者）',
                ghostPinkyDesc: '粉色幽灵，预测你的前方位置',
                ghostInky: 'Inky（变化者）',
                ghostInkyDesc: '青色幽灵，行动难以预测',
                ghostClyde: 'Clyde（游荡者）',
                ghostClydeDesc: '橙色幽灵，时近时远难以捉摸',
                scoreRulesTitle: '🎯 评分规则',
                dotScoreName: '普通豆子',
                dotScoreValue: '+10 分',
                pelletScoreName: '能量豆子',
                pelletScoreValue: '+50 分',
                ghostScoreName: '吃掉幽灵',
                ghostScoreValue: '+200 分',
                clearLevelScoreName: '清空关卡',
                clearLevelScoreValue: '+500 分',
                gameOverTitle: 'GAME OVER',
                gameOverSubtitle: '游戏结束',
                playAgain: '再玩一次',
                backToMenuBtn: '返回主菜单'
            },
            'Minesweeper': {
                title: 'Minesweeper',
                desc: '经典扫雷游戏'
            },
            'Sudoku': {
                title: 'Sudoku',
                desc: '数独逻辑游戏'
            },
            'Space-Invaders': {
                title: '👾 Space Invaders',
                subtitle: '太空入侵者 - 保卫地球！',
                moveShip: '移动飞船',
                shoot: '发射子弹',
                pauseGame: '暂停游戏',
                startGame: '开始游戏',
                gamePaused: '游戏已暂停',
                pausedHint: '游戏已暂停',
                backToMenu: '返回主菜单',
                quickResume: '按 <kbd>P</kbd> 键快速继续',
                sound: '音效',
                gameRules: '游戏规则',
                controls: '操作控制',
                controlsDesc: '使用 <kbd>←</kbd> <kbd>→</kbd> 方向键控制飞船左右移动',
                shooting: '射击攻击',
                shootingDesc: '按 <kbd>空格</kbd> 键发射子弹消灭外星入侵者',
                goal: '游戏目标',
                goalDesc: '消灭所有外星人进入下一关，获得更高分数',
                warning: '注意事项',
                warningDesc: '不要让外星人到达底部，避开外星人的攻击',
                scoreRules: '💎 得分规则',
                gameOver: '游戏结束',
                gameOverSubtitle: '游戏结束',
                finalScore: '最终得分',
                reachedLevel: '到达关卡',
                newHighScore: '新纪录！',
                playAgain: '再玩一次',
                mainMenu: '主菜单'
            },
            'Tower-Blocks': {
                title: 'Tower Blocks Game',
                floors: '楼层',
                highScore: '最高: ',
                clickToPlace: '点击屏幕或按空格键放置方块',
                gameOver: '游戏结束！',
                builtFloors: '你建造了 {score} 层高楼',
                encouragement: '继续努力，挑战更高！',
                playAgain: '再玩一次',
                logoTitle: 'Tower Blocks',
                subtitle: '堆叠方块，建造最高的塔！',
                quickTips: '快速提示',
                tip1: '完美对齐可获得奖励',
                tip2: '速度会逐渐加快',
                tip3: '挑战你的最高记录',
                ruleGoalTitle: '游戏目标',
                ruleGoalDesc: '堆叠尽可能多的方块，建造最高的塔',
                ruleControlsTitle: '操作方式',
                ruleControlsDesc: '点击屏幕或按空格键放置移动中的方块',
                rulePerfectTitle: '完美对齐',
                rulePerfectDesc1: '如果方块完美对齐，将不会被切割',
                rulePerfectDesc2: '获得完美对齐奖励！',
                ruleCutTitle: '方块切割',
                ruleCutDesc1: '未对齐的部分会被切掉',
                ruleCutDesc2: '剩余部分继续堆叠',
                ruleGameOverTitle: '游戏结束',
                ruleGameOverDesc1: '如果方块完全没有重叠，游戏结束',
                ruleGameOverDesc2: '挑战你的最高分！'
            },
            'Jump-Game': {
                title: '🏃 Jump Game',
                subtitle: '跳跃游戏 - 躲避障碍收集金币',
                jump: '跳跃',
                startGame: '开始游戏',
                gamePaused: '游戏已暂停',
                pausedHint: '游戏已暂停',
                backToMenu: '返回主菜单',
                quickResume: '按 <kbd>P</kbd> 键快速继续',
                sound: '音效',
                gameRules: '游戏规则',
                controls: '操作控制',
                controlsDesc: '按 <kbd>空格</kbd>、<kbd>↑</kbd> 或点击屏幕跳跃',
                avoidObstacles: '躲避障碍',
                avoidObstaclesDesc: '跳过地面上的障碍物，碰到即游戏结束',
                collectCoins: '收集金币',
                collectCoinsDesc: '跳跃收集空中的金币，每个金币 +10 分',
                keepRunning: '持续奔跑',
                keepRunningDesc: '游戏速度会逐渐加快，坚持越久得分越高',
                scoreRules: '💎 得分规则',
                keepRunningScore: '持续奔跑',
                runningScoreValue: '= 1 分/米',
                collectCoinsScore: '收集金币',
                coinsScoreValue: '= 10 分',
                avoidObstaclesScore: '躲避障碍',
                obstacleScoreValue: '= 5 分',
                gameOver: '游戏结束',
                gameOverSubtitle: '游戏结束',
                finalScore: '最终得分',
                coinsCollected: '收集金币',
                distance: '奔跑距离',
                maxCombo: '最大连击',
                newHighScore: '新纪录！',
                playAgain: '再玩一次'
            },
            'Candy-Crush': {
                title: 'Candy Crush Game',
                selectMode: '选择游戏模式',
                endlessMode: '无尽模式',
                endlessModeDesc: '尽情享受，无时间限制',
                timedMode: '限时模式',
                timedModeDesc: '挑战2分钟极限',
                changeMode: '切换模式',
                gameOver: '游戏结束！',
                finalScoreText: '你的得分：{score}',
                playAgain: '再玩一次',
                backToMenu: '返回菜单'
            },
            'Bubble-Shooter': {
                title: '🎯 泡泡龙',
                subtitle: 'Bubble Shooter - 瞄准、发射、消除！',
                scoreLabel: '🎯 分数',
                levelLabel: '🎮 关卡',
                remainingLabel: '🎨 剩余',
                highScoreLabel: '🏆 最高',
                sound: '音效',
                instructionsTitle: '📖 游戏说明',
                rule1: '🖱️ 移动鼠标瞄准，点击发射泡泡',
                rule2: '🎯 3个或以上相同颜色的泡泡会消除',
                rule3: '💎 消除后孤立的泡泡会掉落获得额外分数',
                rule4: '⚡ 连击消除获得加成分数',
                rule5: '🏆 清空所有泡泡进入下一关',
                startTitle: '泡泡龙',
                startSubtitle: 'Bubble Shooter',
                tipsTitle: '🎮 游戏技巧',
                tip1: '• 利用墙壁反弹瞄准难以到达的位置',
                tip2: '• 优先消除顶部的泡泡',
                tip3: '• 计划连击以获得更高分数',
                pausedTitle: '游戏暂停',
                pausedSubtitle: 'Game Paused',
                backToMenu: '返回主菜单',
                gameOver: '游戏结束',
                gameOverSubtitle: 'Game Over',
                statsTitle: '📊 游戏统计',
                finalScoreLabel: '最终分数',
                reachedLevelLabel: '到达关卡',
                poppedBubblesLabel: '消除泡泡',
                maxComboLabel: '最大连击',
                newRecordText: '新纪录！',
                playAgain: '再玩一次'
            }
        }
    },
    'en': {
        common: {
            backToHub: 'Back to Game Hub',
            score: 'Score',
            highScore: 'High Score',
            newGame: 'New Game',
            restart: 'Restart',
            start: 'Start',
            pause: 'Pause',
            resume: 'Resume',
            help: 'Help',
            howToPlay: 'How to Play',
            rules: 'Rules',
            tips: 'Tips',
            gameOver: 'Game Over',
            victory: 'Victory',
            level: 'Level',
            time: 'Time',
            win: 'Win',
            lose: 'Lose',
            continue: 'Continue',
            tryAgain: 'Try Again',
            nextLevel: 'Next Level',
            prevLevel: 'Previous Level',
            menu: 'Menu',
            settings: 'Settings',
            soundOn: 'Sound On',
            soundOff: 'Sound Off',
            language: 'Language'
        },
        ui: {
            clickOrSpace: 'Click or press Space',
            arrowKeys: 'Use arrow keys',
            touchControls: 'Touch controls',
            avoidObstacles: 'Avoid obstacles',
            collectItems: 'Collect items',
            realTimeScore: 'Real-time Score',
            highScoreRecord: 'High Score Record',
            newRecord: 'New Record Alert',
            localSave: 'Local Save',
            features: 'Game Features',
            howToPlayTitle: 'How to Play',
            goal: 'Goal',
            controls: 'Controls',
            keyboard: 'Keyboard',
            mobile: 'Mobile',
            rulesTitle: 'Rules',
            tipsTitle: 'Tips'
        },
        specific: {
            '2048': {
                title: '2048',
                desc: 'Merge same numbers, reach 2048!',
                helpTitle: '📖 How to Play',
                goal: 'Merge same number tiles to reach 2048!',
                controlsKey: 'Keyboard: Use arrow keys ⬆️ ⬇️ ⬅️ ➡️',
                controlsMobile: 'Mobile: Tap direction buttons at bottom',
                rules1: 'All tiles slide in direction of move',
                rules2: 'Same number tiles merge when colliding',
                rules3: 'Merged number equals sum of both',
                rules4: 'New tile (2 or 4) spawns after each move',
                rules5: 'Game ends when no moves left',
                tip1: 'Keep big numbers in a corner',
                tip2: 'Maintain tile order',
                tip3: 'Avoid spreading tiles',
                tip4: 'Plan moves in advance'
            },
            'Flappy-Bird': {
                title: 'Flappy Bird',
                desc: 'Click or press Space to control the bird',
                control: 'Click screen or press Space to control',
                goal: 'Avoid pipes, fly further!'
            },
            'Breakout': {
                title: 'Breakout',
                desc: 'Break the bricks',
                control: 'Mouse or keyboard controls'
            },
            'Snake': {
                title: 'Snake Game',
                subtitle: 'Eat, grow, and survive!',
                difficulty: 'Difficulty',
                statistics: 'Statistics',
                score: 'Score',
                length: 'Length',
                best: 'Best',
                resetStats: 'Reset Stats',
                resetStatsTitle: 'Reset all statistics',
                playAgain: 'Play Again',
                difficulty: {
                    easy: 'Easy',
                    easySpeed: 'Slow',
                    medium: 'Medium',
                    mediumSpeed: 'Normal',
                    hard: 'Hard',
                    hardSpeed: 'Fast'
                },
                stats: {
                    gamesPlayed: 'Games Played',
                    highestScore: 'Highest Score',
                    totalFoodEaten: 'Total Food Eaten'
                },
                overlay: {
                    start: 'Click or press Space to start',
                    hint: 'Snake will auto-move | Use arrow keys to control'
                },
                gameOver: {
                    title: 'Game Over!',
                    score: 'Score',
                    length: 'Length',
                    message: 'Better luck next time!'
                }
            },
            'Tetris': {
                title: 'Tetris',
                desc: 'Classic block puzzle game',
                rulesBtn: 'Rules',
                clickToStart: 'Click to Start Game',
                nextPiece: 'Next Piece',
                gameOver: 'Game Over',
                control: {
                    move: 'Move',
                    rotate: 'Rotate',
                    drop: 'Drop'
                },
                stats: {
                    level: 'Level',
                    lines: 'Lines',
                    score: 'Score',
                    time: 'Time'
                },
                btn: {
                    start: 'Start Game',
                    pause: 'Pause',
                    restart: 'Restart',
                    playAgain: 'Play Again'
                },
                tip: {
                    esc: 'Pause/Resume',
                    space: 'Hard Drop'
                },
                rules: {
                    title: 'Game Rules',
                    controlsTitle: 'Controls',
                    moveLeftRight: 'Move piece left/right',
                    rotate: 'Rotate piece',
                    softDrop: 'Soft drop',
                    hardDrop: 'Hard drop',
                    pauseResume: 'Pause/Resume game',
                    objectiveTitle: 'Game Objective',
                    obj1: 'Fill a complete row to clear it',
                    obj2: 'Clear multiple rows simultaneously for bonus points',
                    obj3: 'Speed increases as level goes up',
                    obj4: 'Game ends when pieces reach the top',
                    scoringTitle: 'Scoring',
                    score1: 'Clear 1 line: 100 points',
                    score2: 'Clear 2 lines: 300 points',
                    score3: 'Clear 3 lines: 500 points',
                    score4: 'Clear 4 lines: 800 points (Tetris!)'
                },
                final: {
                    score: 'Final Score',
                    lines: 'Lines Cleared',
                    time: 'Game Time',
                    level: 'Highest Level'
                }
            },
            'Pac-Man': {
                title: '🟡 PAC-MAN',
                subtitle: 'Classic Arcade Game - Collect dots, avoid ghosts, challenge your limits!',
                startTitle: 'PAC-MAN',
                startSubtitle: 'Ready to start a classic arcade adventure?',
                startHint: 'Collect all dots, avoid ghosts!',
                startGame: 'Start Game',
                paused: 'PAUSED',
                pausedSubtitle: 'Game Paused',
                resumeGame: 'Resume Game',
                backToMenu: 'Back to Menu',
                pauseTip: 'Press <kbd>P</kbd> to quickly resume',
                pause: 'Pause',
                sound: 'Sound',
                gameRules: 'GAME RULES',
                controlsTitle: 'Controls',
                controlsDesc: 'Use arrow keys <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> or <kbd>WASD</kbd> to move Pac-Man',
                collectDotsTitle: 'Collect Dots',
                collectDotsDesc: 'Eat all the small dots to score, complete them to advance to the next level',
                powerPelletTitle: 'Power Pellets',
                powerPelletDesc: 'Eat large pellets to briefly counterattack ghosts and earn bonus points',
                avoidGhostsTitle: 'Avoid Ghosts',
                avoidGhostsDesc: 'Evade the four ghost pursuers, every life is precious',
                ghostBlinky: 'Blinky (Chaser)',
                ghostBlinkyDesc: 'Red ghost, directly tracks your position',
                ghostPinky: 'Pinky (Ambusher)',
                ghostPinkyDesc: 'Pink ghost, predicts your position ahead',
                ghostInky: 'Inky (Fickle)',
                ghostInkyDesc: 'Cyan ghost, unpredictable movement',
                ghostClyde: 'Clyde (Wanderer)',
                ghostClydeDesc: 'Orange ghost, comes and goes unpredictably',
                scoreRulesTitle: '🎯 Scoring Rules',
                dotScoreName: 'Regular Dot',
                dotScoreValue: '+10 pts',
                pelletScoreName: 'Power Pellet',
                pelletScoreValue: '+50 pts',
                ghostScoreName: 'Eat Ghost',
                ghostScoreValue: '+200 pts',
                clearLevelScoreName: 'Clear Level',
                clearLevelScoreValue: '+500 pts',
                gameOverTitle: 'GAME OVER',
                gameOverSubtitle: 'Game Over',
                playAgain: 'Play Again',
                backToMenuBtn: 'Back to Menu'
            },
            'Minesweeper': {
                title: 'Minesweeper',
                desc: 'Classic minesweeper game'
            },
            'Sudoku': {
                title: 'Sudoku',
                desc: 'Sudoku logic game'
            },
            'Space-Invaders': {
                title: '👾 Space Invaders',
                subtitle: 'Space Invaders - Defend Earth!',
                moveShip: 'Move Ship',
                shoot: 'Fire Bullet',
                pauseGame: 'Pause Game',
                startGame: 'Start Game',
                gamePaused: 'GAME PAUSED',
                pausedHint: 'Game Paused',
                backToMenu: 'Back to Menu',
                quickResume: 'Press <kbd>P</kbd> to resume quickly',
                sound: 'Sound',
                gameRules: 'GAME RULES',
                controls: 'Controls',
                controlsDesc: 'Use <kbd>←</kbd> <kbd>→</kbd> arrow keys to move the ship left and right',
                shooting: 'Shooting Attack',
                shootingDesc: 'Press <kbd>Space</kbd> to fire bullets and destroy alien invaders',
                goal: 'Game Goal',
                goalDesc: 'Destroy all aliens to advance to the next level and get higher scores',
                warning: 'Warning',
                warningDesc: "Don't let aliens reach the bottom, avoid their attacks",
                scoreRules: '💎 Score Rules',
                gameOver: 'GAME OVER',
                gameOverSubtitle: 'Game Over',
                finalScore: 'FINAL SCORE',
                reachedLevel: 'REACHED LEVEL',
                newHighScore: 'NEW HIGH SCORE!',
                playAgain: 'PLAY AGAIN',
                mainMenu: 'MAIN MENU'
            },
            'Tower-Blocks': {
                title: 'Tower Blocks Game',
                floors: 'Floors',
                highScore: 'Best: ',
                clickToPlace: 'Tap screen or press Space to place block',
                gameOver: 'Game Over!',
                builtFloors: 'You built {score} floors!',
                encouragement: 'Keep trying, go higher!',
                playAgain: 'Play Again',
                logoTitle: 'Tower Blocks',
                subtitle: 'Stack blocks, build the highest tower!',
                quickTips: 'Quick Tips',
                tip1: 'Perfect alignment earns bonus points',
                tip2: 'Speed increases gradually',
                tip3: 'Challenge your high score record',
                ruleGoalTitle: 'Game Goal',
                ruleGoalDesc: 'Stack as many blocks as possible, build the tallest tower',
                ruleControlsTitle: 'Controls',
                ruleControlsDesc: 'Tap screen or press Space to place the moving block',
                rulePerfectTitle: 'Perfect Alignment',
                rulePerfectDesc1: 'If the block is perfectly aligned, it won\'t be cut',
                rulePerfectDesc2: 'Get perfect alignment bonus!',
                ruleCutTitle: 'Block Cutting',
                ruleCutDesc1: 'Misaligned parts will be cut off',
                ruleCutDesc2: 'Remaining part continues stacking',
                ruleGameOverTitle: 'Game Over',
                ruleGameOverDesc1: 'If blocks have no overlap at all, game over',
                ruleGameOverDesc2: 'Challenge your best score!'
            },
            'Jump-Game': {
                title: '🏃 Jump Game',
                subtitle: 'Jump Game - Dodge obstacles, collect coins!',
                jump: 'Jump',
                startGame: 'START GAME',
                gamePaused: 'GAME PAUSED',
                pausedHint: 'Game Paused',
                backToMenu: 'Back to Menu',
                quickResume: 'Press <kbd>P</kbd> to resume quickly',
                sound: 'Sound',
                gameRules: 'GAME RULES',
                controls: 'Controls',
                controlsDesc: 'Press <kbd>Space</kbd>, <kbd>↑</kbd> or tap screen to jump',
                avoidObstacles: 'Dodge Obstacles',
                avoidObstaclesDesc: 'Jump over obstacles on the ground, collision ends the game',
                collectCoins: 'Collect Coins',
                collectCoinsDesc: 'Jump to collect coins in the air, each coin +10 points',
                keepRunning: 'Keep Running',
                keepRunningDesc: 'Game speed gradually increases, survive longer for higher scores',
                scoreRules: '💎 Score Rules',
                keepRunningScore: 'Keep Running',
                runningScoreValue: '= 1 pt/m',
                collectCoinsScore: 'Collect Coins',
                coinsScoreValue: '= 10 pts',
                avoidObstaclesScore: 'Dodge Obstacles',
                obstacleScoreValue: '= 5 pts',
                gameOver: 'GAME OVER',
                gameOverSubtitle: 'Game Over',
                finalScore: 'FINAL SCORE',
                coinsCollected: 'COINS COLLECTED',
                distance: 'DISTANCE',
                maxCombo: 'MAX COMBO',
                newHighScore: 'NEW HIGH SCORE!',
                playAgain: 'Try Again'
            },
            'Candy-Crush': {
                title: 'Candy Crush Game',
                selectMode: 'Select Game Mode',
                endlessMode: 'Endless Mode',
                endlessModeDesc: 'Enjoy freely, no time limit',
                timedMode: 'Timed Mode',
                timedModeDesc: 'Challenge your limits in 2 minutes',
                changeMode: 'Switch Mode',
                gameOver: 'Game Over!',
                finalScoreText: 'Your score: {score}',
                playAgain: 'Play Again',
                backToMenu: 'Back to Menu'
            },
            'Bubble-Shooter': {
                title: '🎯 Bubble Shooter',
                subtitle: 'Bubble Shooter - Aim, Shoot, Pop!',
                scoreLabel: '🎯 Score',
                levelLabel: '🎮 Level',
                remainingLabel: '🎨 Left',
                highScoreLabel: '🏆 Best',
                sound: 'Sound',
                instructionsTitle: '📖 How to Play',
                rule1: '🖱️ Move mouse to aim, click to shoot bubble',
                rule2: '🎯 3 or more same-colored bubbles will pop',
                rule3: '💎 Isolated bubbles after popping fall for bonus points',
                rule4: '⚡ Combo pops earn score multipliers',
                rule5: '🏆 Clear all bubbles to advance to next level',
                startTitle: 'Bubble Shooter',
                startSubtitle: 'Bubble Shooter',
                tipsTitle: '🎮 Tips',
                tip1: '• Use wall bounces to reach hard-to-reach spots',
                tip2: '• Prioritize popping top bubbles first',
                tip3: '• Plan combos for higher scores',
                pausedTitle: 'Paused',
                pausedSubtitle: 'Game Paused',
                backToMenu: 'Back to Menu',
                gameOver: 'Game Over',
                gameOverSubtitle: 'Game Over',
                statsTitle: '📊 Statistics',
                finalScoreLabel: 'Final Score',
                reachedLevelLabel: 'Level Reached',
                poppedBubblesLabel: 'Bubbles Popped',
                maxComboLabel: 'Max Combo',
                newRecordText: 'New Record!',
                playAgain: 'Play Again'
            }
        }
    }
};

class GameI18n {
    constructor(options = {}) {
        this.currentLang = localStorage.getItem('WebGameHub-lang') || this.detectLanguage();
        this.translations = GAME_TRANSLATIONS;
        this.availableLangs = ['zh-CN', 'en'];
        this.gameName = options.gameName || '';
    }

    detectLanguage() {
        const browserLang = navigator.language;
        if (browserLang.startsWith('zh')) return 'zh-CN';
        return 'en';
    }

    t(key, fallback = '') {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return fallback;
            }
        }
        
        return value || fallback;
    }

    setLanguage(lang) {
        if (!this.availableLangs.includes(lang)) {
            lang = 'en';
        }
        
        this.currentLang = lang;
        localStorage.setItem('WebGameHub-lang', lang);
        this.render();
    }

    render() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation) {
                el.textContent = translation;
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const attr = el.getAttribute('data-i18n-attr');
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation && attr) {
                el.setAttribute(attr, translation);
            }
        });

        document.documentElement.lang = this.currentLang;
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }

    bindEvents() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.dataset.lang);
            });
        });
    }

    init() {
        this.render();
        this.bindEvents();
    }
}
