# -*- coding: utf-8 -*-
"""第二层：给无中文支持的游戏页注入可折叠"中文玩法引导面板"
- 不改游戏本体，只在 </body> 前内联一个悬浮按钮+面板
- 数据：游戏名、中文玩法描述(desc)、语言标签、分类通用提示
- 跳过 node_modules/dist/assets 及已支持中文的页面
"""
import glob, io, os, re, json, html

root = r'D:\PycharmProjects\GameHub'
DATA = json.loads(io.open(root + r'\_guide_data.json', encoding='utf-8').read())

# 分类 -> 通用中文玩法提示（类型级，不虚构具体按键）
CAT_TIPS = {
    'Puzzle': '通过点击、拖拽或滑动来移动和组合元素，观察规律，达成关卡目标。',
    'Action': '使用方向键 / WASD 或鼠标控制移动，空格或点击触发跳跃、攻击等动作，躲避障碍、击败敌人。',
    'Arcade': '方向键或鼠标控制角色/物体，空格或点击触发主操作，在有限时间内争取更高分数。',
    'Board': '通过点击进行落子、走棋或出牌等回合操作，遵循规则，与对手或 AI 对弈。',
    'Memory': '点击卡牌翻面，记住图案位置，成对匹配消除。',
    'Typing': '用键盘输入屏幕显示的字母、单词或句子，尽量快速且准确。',
    'Casual': '以点击、拖拽或简单按键为主，跟随画面提示操作即可上手。',
    'Adventure': '方向键/鼠标移动角色，点击场景中的物品与人互动，推进剧情与谜题。',
    'Astra': '本作品为 AI 生成的交互体验，用鼠标/触屏点击、拖动或滚轮探索画面中的元素。',
}

# 知名游戏精准提示覆盖（slug -> 提示）
GAME_TIPS = {
    'go': '点击棋盘交叉点落子（黑先白后），围地多者胜；注意气尽提子与禁入点。',
    'othello': '点击棋盘空格落子，夹住对方棋子即可翻转其颜色，最终棋子多者获胜。',
    'mahjong': '点击两张相同且可自由取出的牌进行配对消除，清空牌面即获胜。',
    'Checkers': '点击己方棋子选择，再点击目标格斜向移动或跳跃吃子。',
    'Backgammon': '掷骰后按点数移动己方棋子，先把所有棋子移出棋盘者获胜。',
    'Poker': '点击牌面选择要保留的牌，再按发牌，组成更大的牌型以赢下对局。',
    'Blackjack': '点击"要牌(Hit)"加牌、点击"停牌(Stand)"结束本局，点数更接近 21 且不爆牌者胜。',
    'Connect-Four': '点击棋盘列顶部，使棋子落入该列最底部，四子连成一线即获胜。',
    'Battleship': '先点击己方棋盘布置舰船，再点击敌方棋盘格发起攻击，击沉全部舰船获胜。',
    'snake-and-ladder': '点击"掷骰子"按钮前进，落到蛇头则后退、落到梯子底则前进。',
    'Ludo': '点击"掷骰子"后点击可移动的棋子走棋，四枚棋子全部到达终点者获胜。',
    'mancala': '点击己方坑位取子，按规则逐坑播种，最终种子最多者获胜。',
    'Yahtzee': '点击"掷骰子"并可保留部分骰子重掷，在计分表上选择组合得分，填满记分卡后总分高者胜。',
    'Freecell': '点击顶部的牌移动到空列或按递减顺序叠放，将全部牌按花色升序移到右上角四堆。',
    'Crazy-Eights': '点击手中与牌堆顶花色或点数相同的牌打出，无牌可出则点牌堆摸牌。',
    'MonkeyType': '在输入框内快速输入显示的单词，按空格进入下一个单词，结束后查看 WPM 与准确率。',
    'typing-race': '用键盘输入上方给出的单词或句子，与对手/计时赛跑，输入准确才能前进。',
    'Typing-Game': '按照屏幕提示用键盘输入字母或单词，输入正确即可得分或推进关卡。',
    'Word-Rain': '在单词落入底部前用键盘输入它，输入正确即消除，防止单词堆积。',
}

# 语言标签显示文案
LANG_LABEL = {
    'no_need': '✅ 无需阅读英文，纯图形操作',
    'little': '🟡 仅少量英文（菜单/按钮），基本不影响游玩',
    'text': '🔴 含较多英文文本，建议理解英文后游玩',
}

INJECT_CSS = '''
.cn-guide-btn{position:fixed;right:16px;bottom:16px;z-index:2147483000;background:linear-gradient(135deg,#7C6CFF,#5B4FE0);color:#fff;border:none;border-radius:999px;padding:10px 18px;font:600 14px/1 'Microsoft YaHei',system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.35);display:flex;align-items:center;gap:6px;transition:transform .2s}.cn-guide-btn:hover{transform:translateY(-2px)}.cn-guide-btn:active{transform:scale(.96)}
.cn-guide-panel{position:fixed;right:16px;bottom:70px;z-index:2147483000;width:min(340px,calc(100vw - 32px));max-height:70vh;overflow:auto;background:#1a1724;color:#f0edf7;border:1px solid rgba(124,108,255,.4);border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.5);font:14px/1.7 'Microsoft YaHei',system-ui,sans-serif;padding:16px 18px;box-sizing:border-box;display:none}
.cn-guide-panel.open{display:block}
.cn-guide-panel h4{margin:0 0 4px;font-size:17px;font-weight:700;color:#fff;padding-right:28px}
.cn-guide-panel .cn-guide-lang{font-size:12px;margin-bottom:10px}
.cn-guide-panel .cn-guide-desc{font-size:13px;color:#c9c3dd;margin:8px 0 12px}
.cn-guide-panel .cn-guide-tip{background:rgba(124,108,255,.12);border-left:3px solid #7C6CFF;border-radius:6px;padding:8px 10px;font-size:13px;color:#d9d3f0;margin:8px 0 12px}
.cn-guide-panel a.cn-guide-more{display:inline-block;color:#a99bff;text-decoration:none;font-size:13px;font-weight:600}
.cn-guide-panel a.cn-guide-more:hover{text-decoration:underline}
.cn-guide-close{position:absolute;top:10px;right:12px;background:none;border:none;color:#9b93b8;font-size:20px;line-height:1;cursor:pointer;padding:4px}
.cn-guide-close:hover{color:#fff}
'''

def build_panel(name, desc, lang, cat, path):
    slug = path.split('/')[2]
    tip = GAME_TIPS.get(slug) or CAT_TIPS.get(cat, '通过鼠标点击或键盘按键操作，跟随画面提示即可上手。')
    label = LANG_LABEL.get(lang, '')
    name_esc = html.escape(name, quote=True)
    desc_esc = html.escape(desc or '这是一款 AI 生成的浏览器小游戏，打开即可试玩。', quote=True)
    tip_esc = html.escape(tip, quote=True)
    label_esc = html.escape(label, quote=True)
    js_name = name_esc
    return f'''
<!-- AIGameHub CN Guide Panel (auto-injected, game-agnostic) -->
<style>{INJECT_CSS}</style>
<div id="cn-guide-wrap">
<button class="cn-guide-btn" id="cnGuideBtn" aria-label="中文玩法引导">📖 中文玩法</button>
<div class="cn-guide-panel" id="cnGuidePanel" role="dialog" aria-label="中文玩法引导">
<button class="cn-guide-close" id="cnGuideClose" aria-label="关闭">×</button>
<h4>{name_esc}</h4>
<div class="cn-guide-lang">{label_esc}</div>
<div class="cn-guide-desc">{desc_esc}</div>
<div class="cn-guide-tip">💡 {tip_esc}</div>
<a class="cn-guide-more" href="https://suipce.com/" target="_blank" rel="noopener">🎮 返回 AIGameHub 查看更多游戏 ›</a>
</div>
</div>
<script>(function(){{var b=document.getElementById('cnGuideBtn'),p=document.getElementById('cnGuidePanel'),c=document.getElementById('cnGuideClose');if(!b||!p)return;var t=null;function open(){{p.classList.add('open');b.style.display='none';clearTimeout(t)}}function close(){{p.classList.remove('open');b.style.display='flex';t=setTimeout(function(){{b.style.display='none'}},20000)}}b.addEventListener('click',open);c.addEventListener('click',close);document.addEventListener('keydown',function(e){{if(e.key==='Escape')close()}})}})();</script>
'''

def inject_one(p):
    c = io.open(p, encoding='utf-8', errors='ignore').read()
    # 移除旧的注入块（如果存在），支持重注入
    old = re.search(r'<!-- AIGameHub CN Guide Panel.*?</script>', c, re.S)
    if old:
        c = c.replace(old.group(0), '')
    rel = os.path.relpath(p, root).replace('\\','/')
    info = DATA[rel]
    cat = rel.split('/')[1]
    panel = build_panel(info['name'], info['desc'], info['lang'], cat, rel)
    if '</body>' in c:
        out = c.replace('</body>', panel + '\n</body>', 1)
    elif '</html>' in c:
        out = c.replace('</html>', panel + '\n</html>', 1)
    else:
        return 'skip-no-body'
    io.open(p, 'w', encoding='utf-8', newline='').write(out)
    return 'ok'

ok = skipped_already = skip_nobody = 0
errs = []
for p in sorted(DATA.keys()):
    fp = os.path.join(root, *p.split('/'))
    if not os.path.exists(fp):
        errs.append(p + ' (missing file)')
        continue
    r = inject_one(fp)
    if r == 'ok': ok += 1
    elif r == 'skip-already': skipped_already += 1
    else: skip_nobody += 1

print(f"注入成功: {ok} | 已存在跳过: {skipped_already} | 无body跳过: {skip_nobody}")
for e in errs[:20]:
    print("  ERR", e)
