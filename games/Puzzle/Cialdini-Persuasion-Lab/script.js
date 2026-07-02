(function(){
'use strict';

const $ = id => document.getElementById(id);
const _ = s => s;

const PRINS = [
  { icon:'🎁', name:'互惠', nameEn:'Reciprocity' },
  { icon:'⏳', name:'稀缺', nameEn:'Scarcity' },
  { icon:'👑', name:'权威', nameEn:'Authority' },
  { icon:'🔗', name:'承诺一致', nameEn:'Consistency' },
  { icon:'❤️', name:'好感', nameEn:'Liking' },
  { icon:'👥', name:'社会认同', nameEn:'Social Proof' },
  { icon:'🤝', name:'联盟', nameEn:'Unity' },
];

// ---- Event Data ----
const EVENTS = {
study:[
{icon:'📖',id:'first_lesson',title:'第一堂课',titleEn:'First Lesson',
desc:'你翻开一本说服力教材，第一章讲的是"互惠原理"。你感觉有点枯燥。',descEn:'You open a persuasion textbook. Chapter 1: Reciprocity. It feels dry.',
choices:[
{text:'认真做笔记',textEn:'Take notes',story:'你写满了三页笔记，对互惠原理有了扎实的理解。',storyEn:'Three pages of notes. Reciprocity is now clear.',effect:{prin:0,xp:[5,8]}},
{text:'随便翻翻',textEn:'Skim through',story:'你大概看了一下，但没往心里去。',storyEn:'You skimmed but did not absorb much.',effect:{prin:0,xp:[1,3]}},
]},
{icon:'📚',id:'boring_theory',title:'枯燥的理论',titleEn:'Boring Theory',
desc:'后面的章节全是学术理论，你读得昏昏欲睡。你是那种需要实践才能学进去的人。',descEn:'The next chapters are pure academic theory. Your eyes glaze over.',
choices:[
{text:'硬着头皮啃下去',textEn:'Grind through it',story:'你咬牙坚持读完了，虽然很痛苦但确实学到了东西。',storyEn:'You pushed through. Painful but educational.',effect:{prin:1,xp:[3,6],rep:[0,1]}},
{text:'找视频教程看',textEn:'Find video tutorials',story:'视频里的案例让你豁然开朗，学到了更多。',storyEn:'The video examples made everything click.',effect:{prin:2,xp:[4,7]}},
{text:'先放一放去打游戏',textEn:'Play games instead',story:'放松了一天，但什么也没学到。',storyEn:'You relaxed but learned nothing.',effect:{}},
]},
{icon:'👥',id:'study_group',title:'学习小组',titleEn:'Study Group',
desc:'几个同学组了个学习小组，邀请你加入。但你本来打算自己一个人学。',descEn:'Classmates invite you to a study group. You planned to study alone.',
choices:[
{text:'加入小组',textEn:'Join',story:'小组讨论让你接触到了不同的理解角度，社交能力也提升了。',storyEn:'Great discussion. Different perspectives helped.',effect:{prin:4,xp:[3,5],rep:[1,2]}},
{text:'自己学效率更高',textEn:'Study alone',story:'你按自己的节奏学习，虽然孤独但效率很高。',storyEn:'Your own pace. Efficient but lonely.',effect:{prin:3,xp:[4,7]}},
]},
{icon:'📝',id:'tough_exam',title:'模拟测试',titleEn:'Mock Test',
desc:'老师搞了一次模拟测试，题目非常难。你发现很多原理你根本没掌握透。',descEn:'A mock test reveals you have not fully grasped the principles.',
choices:[
{text:'死磕薄弱环节',textEn:'Grind weak spots',story:'你花了大量时间补短板，水平大幅提升。',storyEn:'You shored up your weaknesses. Big improvement.',effect:{prin:5,xp:[5,9],rep:[0,1]}},
{text:'请教老师',textEn:'Ask the teacher',story:'老师的一对一指导让你茅塞顿开。',storyEn:'One-on-one guidance was eye-opening.',effect:{prin:2,xp:[6,10]}},
{text:'反正不记成绩，不管了',textEn:'Ignore it',story:'你放弃了查漏补缺的机会。',storyEn:'You missed a chance to improve.',effect:{}},
]},
{icon:'💰',id:'tutor_job',title:'兼职家教',titleEn:'Tutoring Job',
desc:'有人在招家教，教小孩用说服力原理做演讲。时薪不错，但会占用学习时间。',descEn:'A tutoring gig teaching persuasion to kids. Good pay but takes study time.',
choices:[
{text:'接！赚钱要紧',textEn:'Take it! Need money',story:'你赚到了一笔钱，但学习进度落下了。',storyEn:'You made money but fell behind on study.',effect:{money:[20,40],prin:6,xp:[1,2]}},
{text:'拒绝了，专心学习',textEn:'Decline, focus on study',story:'你拒绝了诱惑，专心学习。',storyEn:'You stayed focused on studying.',effect:{prin:0,xp:[4,7]}},
]},
{icon:'🏆',id:'scholarship',title:'奖学金评选',titleEn:'Scholarship',
desc:'学校有一个说服力大赛，第一名有丰厚的奖学金。报名截止了。',descEn:'A persuasion competition with a scholarship prize.',
choices:[
{text:'报名参加',textEn:'Enter',story:'你在比赛中表现出色，拿到了奖学金！',storyEn:'You performed brilliantly and won the scholarship!',effect:{money:[50,100],rep:[3,5],prin:2,xp:[3,6]}},
{text:'我不行，算了',textEn:'Not good enough',story:'你放弃了证明自己的机会。',storyEn:'You passed up a chance to prove yourself.',effect:{}},
]},
{icon:'💊',id:'crash_course',title:'高价集训营',titleEn:'Bootcamp',
desc:'一个知名说服力大师开了集训营，三天学费 200 块——你拿不出这么多钱。',descEn:'A famous persuasion master is offering a 3-day bootcamp for 200.',
choices:[
{text:'借钱也要去',textEn:'Borrow and go',story:'你借了钱参加了集训营，确实学到了真东西。',storyEn:'You borrowed money for the bootcamp. Worth it.',effect:{money:[-30,-50],prin:1,xp:[7,12],rep:[2,4]}},
{text:'太贵了，自学吧',textEn:'Too expensive, self-study',story:'你继续自学，进度缓慢但扎实。',storyEn:'You kept self-studying. Slow but steady.',effect:{prin:3,xp:[2,5]}},
]},
{icon:'🎯',id:'class_project',title:'小组项目',titleEn:'Group Project',
desc:'老师布置了一个大作业——用说服原理设计一场真实的募捐活动。',descEn:'Design a real fundraising campaign using persuasion principles.',
choices:[
{text:'自己包揽全部',textEn:'Do it all yourself',story:'你包揽了全部工作，质量很高但累得半死。',storyEn:'You did everything. Great quality but exhausting.',effect:{prin:0,xp:[5,8],rep:[2,3]}},
{text:'分工合作',textEn:'Divide and conquer',story:'团队协作很顺利，每个人都发挥了自己的特长。',storyEn:'Great teamwork. Everyone played to their strengths.',effect:{prin:6,xp:[3,6],rep:[3,5]}},
{text:'混过去就行了',textEn:'Slack off',story:'你拖累了团队，大家都不高兴。',storyEn:'You let the team down.',effect:{rep:[-3,-1]}},
]},
{icon:'🤝',id:'networking',title:'行业交流会',titleEn:'Networking Event',
desc:'有一个免费的行业交流会，可以认识很多人。但去的话今晚就不能学习了。',descEn:'A free industry networking event vs. study time tonight.',
choices:[
{text:'去交流会',textEn:'Go network',story:'你认识了一个行业前辈，对方给你了很多实用建议。',storyEn:'You met an industry veteran who gave great advice.',effect:{rep:[3,5],prin:4,xp:[2,4]}},
{text:'不去，学习重要',textEn:'Stay and study',story:'你在书桌前度过了一个平静而充实的晚上。',storyEn:'A quiet, productive evening of study.',effect:{prin:5,xp:[4,7]}},
]},
{icon:'🎓',id:'graduation',title:'学成出师',titleEn:'Graduation',
desc:'你已经把所有原理学到了 Lv.1。现在面临选择——去找工作，还是继续深造？',descEn:'All principles at Lv.1. Time to choose: get a job or keep studying?',
choices:[
  {text:'去找工作',textEn:'Get a job',story:'你收拾好简历，踏入了职场的大门。',storyEn:'You polished your resume and entered the job market.',nextPhase:'work'},
  {text:'再学一段时间',textEn:'Keep studying',story:'你决定多学一段时间，打好更坚实的基础。',storyEn:'You decided to build a stronger foundation.',effect:{prin:1,xp:[3,6]}},
]},
],
work:[
{icon:'🏢',id:'first_day',title:'入职第一天',titleEn:'First Day',
desc:'你坐在格子间里，同事们都忙着没人管你。你的直属上司丢给你一堆资料。',descEn:'You sit at your cubicle. Everyone is busy. Your boss drops a stack of documents.',
choices:[
{text:'主动找活干',textEn:'Proactively ask for work',story:'你的主动性给上司留下了好印象。',storyEn:'Your initiative impressed your boss.',effect:{money:[10,20],rep:[2,3],jobProgress:[2,3]}},
{text:'先观察再说',textEn:'Observe first',story:'你花了一天时间熟悉环境，虽然没什么产出但了解了公司情况。',storyEn:'You spent the day observing. Slow but steady.',effect:{rep:[0,1],jobProgress:[0,1]}},
]},
{icon:'📋',id:'extra_task',title:'额外的任务',titleEn:'Extra Task',
desc:'快下班时，上司让你加班完成一个紧急方案，但你今晚有约。',descEn:'Your boss asks you to work late on an urgent proposal. You have plans tonight.',
choices:[
{text:'留下加班',textEn:'Stay and work',story:'你加班到深夜，方案做得不错，上司很满意。',storyEn:'You worked late and delivered a great proposal.',effect:{money:[15,25],rep:[2,4],jobProgress:[2,3]}},
{text:'说今晚有事',textEn:'Say you have plans',story:'上司没说什么，但你能感觉到他有点失望。',storyEn:'Your boss said nothing but looked disappointed.',effect:{rep:[-1,0],jobProgress:[0,1]}},
]},
{icon:'😈',id:'backstabbing',title:'替罪羊',titleEn:'Scapegoat',
desc:'你的主管犯了一个严重的错误，他想让你替他背黑锅。如果你不答应，他可能会给你穿小鞋。如果你答应，你可能被开除。',descEn:'Your manager made a serious mistake and wants you to take the blame. Say no and face retaliation. Say yes and risk getting fired.',
choices:[
{text:'忍了，替他背',textEn:'Take the blame',story:'你背了黑锅，被扣了工资。主管私下说会补偿你。',storyEn:'You took the fall and got your pay cut. Your manager owes you one.',effect:{money:[-30,-20],rep:[-3,-1],jobProgress:[1,2]}},
{text:'直接向高层举报',textEn:'Report to higher-ups',
usePrin:2,baseRate:40,
success:'你收集了证据，成功让高层相信了真相。主管被处分了。',successEn:'You had evidence and the truth came out. Your manager was disciplined.',
successEffect:{rep:[5,8],jobProgress:[3,5]},
fail:'你没有足够的证据，高层反而觉得你在闹事。',failEn:'You had no proof. Now you look like the troublemaker.',
failEffect:{rep:[-8,-5],jobProgress:[-3,-1],money:[-20,-10]},},
]},
{icon:'📞',id:'headhunter',title:'猎头电话',titleEn:'Headhunter Call',
desc:'一个猎头打电话来，说有个公司愿意给你 1.5 倍的工资挖你过去。但那边行业不同，要重新开始。',descEn:'A headhunter offers you a job at 1.5x salary, but in a different industry.',
choices:[
{text:'跳槽！工资翻倍',textEn:'Take the offer!',story:'你跳槽了，工资涨了很多，但一切都要重新适应。',storyEn:'You switched jobs. More money, but starting over.',effect:{money:[50,80],rep:[0,2],jobProgress:[-5,-3]}},
{text:'留在现在的公司',textEn:'Stay where you are',story:'你拒绝了猎头，决定在现在的公司继续发展。',storyEn:'You declined. Time to grow where you are.',effect:{rep:[1,3],jobProgress:[2,4]}},
]},
{icon:'⚠️',id:'layoff_warning',title:'裁员风暴',titleEn:'Layoff Storm',
desc:'公司要裁员了。你听说你的部门在名单上。你现在的级别比较低，很危险。',descEn:'Your department is on the layoff list. You are junior and vulnerable.',
choices:[
{text:'主动加班表现',textEn:'Work extra hard',story:'你连续加班两周，最终保住了工作。',storyEn:'You worked overtime for two weeks and kept your job.',effect:{money:[10,20],rep:[2,4],jobProgress:[1,2]}},
{text:'偷偷找下家',textEn:'Quietly look for backup',story:'你找到了一个备选工作，裁员时直接走人。',storyEn:'You found a backup job and left when the layoff came.',effect:{money:[0,10],rep:[0,1],jobProgress:[-2,0]}},
{text:'听天由命',textEn:'Just wait and see',story:'你被裁了。只能从头再来。',storyEn:'You got laid off. Back to square one.',effect:{money:[-10,0],rep:[-3,-1],jobProgress:[-8,-5]}},
]},
{icon:'⬆️',id:'promotion_chance',title:'晋升机会',titleEn:'Promotion Chance',
desc:'你的上司要升迁了，他的位置空了出来。你和另一个同事都有机会竞争这个位置。',descEn:'Your boss is moving up. You and a colleague are both candidates.',
choices:[
{text:'主动争取',textEn:'Go for it',story:'你在上司面前展示了自己的能力，成功拿到了晋升。',storyEn:'You showcased your skills and got the promotion.',effect:{money:[30,50],rep:[4,6],jobProgress:[5,8]}},
{text:'让给同事',textEn:'Let the colleague have it',story:'你选择了谦让。同事很感激，但你的晋升要等下次了。',storyEn:'You stepped back. Your colleague is grateful, but you wait.',effect:{rep:[2,4],jobProgress:[0,1]}},
]},
{icon:'🎭',id:'office_politics',title:'站队',titleEn:'Choose Sides',
desc:'公司里两个副总在明争暗斗，都来拉拢你。你谁也得罪不起。',descEn:'Two VPs are fighting for power. Both want you on their side.',
choices:[
{text:'站在林副总这边',textEn:'Side with VP Lin',story:'林副总赢了，你跟着沾光。',storyEn:'VP Lin won. You benefited.',effect:{money:[20,40],rep:[3,5],jobProgress:[2,4]}},
{text:'站在王副总这边',textEn:'Side with VP Wang',story:'王副总失势了，你也被牵连了。',storyEn:'VP Wang lost. You were dragged down too.',effect:{money:[-10,0],rep:[-5,-2],jobProgress:[-3,-1]}},
{text:'两不相帮，专心做事',textEn:'Stay neutral, focus on work',story:'你埋头做事，虽然没站队但也没得罪谁。',storyEn:'You kept your head down and stayed safe.',effect:{rep:[0,2],jobProgress:[1,2]}},
]},
{icon:'🌍',id:'biz_trip',title:'出差谈判',titleEn:'Business Trip',
desc:'公司派你去和一个难缠的客户谈续约。这个客户以苛刻闻名，好几个同事都搞不定。',descEn:'Sent to negotiate renewal with a notoriously difficult client.',
choices:[
{text:'接下这个任务',textEn:'Take the challenge',story:'你精心准备，用上了学过的说服技巧，成功续约！',storyEn:'You prepared thoroughly and used every persuasion trick. Deal signed!',effect:{money:[40,60],rep:[5,8],jobProgress:[3,5]}},
{text:'说自己没把握',textEn:'Say you are not ready',story:'公司派了别人去，但对你有些失望。',storyEn:'Someone else went. Your boss was disappointed.',effect:{rep:[-2,0],jobProgress:[0,1]}},
]},
{icon:'🧠',id:'mentor_found',title:'贵人指点',titleEn:'Find a Mentor',
desc:'公司里一位资深总监看出了你的潜力，愿意花时间指导你，但他的要求很严格。',descEn:'A senior director sees potential in you and offers mentorship.',
choices:[
 {text:'拜师学艺',textEn:'Accept',story:'在总监的指导下，你的能力突飞猛进。',storyEn:'Under the director guidance, you improved rapidly.',effect:{prin:2,xp:[5,9],rep:[3,5],jobProgress:[2,4]}},
{text:'婉拒，自己摸索',textEn:'Decline, learn alone',story:'你靠自己摸索，走了一些弯路。',storyEn:'You figured things out yourself. Some detours along the way.',effect:{prin:1,xp:[2,4],jobProgress:[0,2]}},
]},
{icon:'🔥',id:'company_crisis',title:'公司危机',titleEn:'Company Crisis',
desc:'公司突然爆出负面新闻，客户纷纷质疑。CEO 号召全体员工一起渡过难关。',descEn:'Negative news hits the company. Clients are questioning everything.',
choices:[
{text:'站出来支持公司',textEn:'Stand up for the company',story:'你公开支持公司，虽然冒险但CEO记住了你的忠诚。',storyEn:'You publicly showed support. Risky, but the CEO noticed.',effect:{rep:[2,5],jobProgress:[3,5]}},
{text:'低调观望',textEn:'Keep a low profile',story:'你等风波过去再行动，安全但不亮眼。',storyEn:'You waited it out. Safe but unremarkable.',effect:{rep:[-1,1],jobProgress:[0,2]}},
]},
{icon:'💡',id:'big_opportunity',title:'改变人生的机遇',titleEn:'Life-changing Opportunity',
desc:'你在工作中发现了一个巨大的市场空白。如果抓住它，你可能会提前实现财务自由。但你需要把所有积蓄投进去。',descEn:'You discover a massive market gap. Going for it could mean financial freedom — but you must risk everything.',
choices:[
{text:'全力一搏！',textEn:'Go all in!',
usePrin:1,baseRate:35,
success:'你赌对了！大赚了一笔，现在你有资本创业了。',successEn:'You bet correctly! Big money. Now you can start your own business.',
successEffect:{money:[500,1000],rep:[8,12],bigOpportunityTaken:true},
fail:'投资失败了，你的积蓄打了水漂……',failEn:'The investment failed. Your savings are gone.',
failEffect:{money:[-100,-200],rep:[-5,-2],bigOpportunityFailed:true},},
{text:'风险太大，放弃',textEn:'Too risky, pass',story:'你放弃了这次机会，继续安稳工作。',storyEn:'You passed on the opportunity and kept working.',effect:{rep:[0,1]}},
]},
{icon:'💼',id:'side_project',title:'副业尝试',titleEn:'Side Project',
desc:'你有个创业想法，可以在业余时间先试试水。但搞副业会影响你的本职工作表现。',descEn:'You have a business idea. A side project could test the waters — but it might hurt your day job.',
choices:[
{text:'搞副业',textEn:'Start the side project',story:'副业有了一些起色，赚了点小钱。但本职工作确实受到了影响。',storyEn:'The side project made some money but your day job suffered.',effect:{money:[30,60],rep:[1,3],jobProgress:[-3,-1],sideProjectActive:true}},
{text:'专心工作',textEn:'Focus on the day job',story:'你专注于本职工作，表现稳定。',storyEn:'You focused on your job. Consistent performance.',effect:{rep:[1,3],jobProgress:[2,4]}},
]},
],
entrepreneur:[
{icon:'🤝',id:'first_client',title:'第一个客户',titleEn:'First Client',
desc:'你的咨询公司终于迎来了第一个客户——一家小餐厅想做促销活动。你报多少价？',descEn:'Your first client! A small restaurant wants a promotion campaign. How much do you charge?',
choices:[
{text:'低价吸引（200）',textEn:'Low price (200)',story:'你报了个低价，客户很开心地签了约。',storyEn:'You offered a low price. The client happily signed.',effect:{money:[150,250],rep:[2,4]}},
{text:'市场价（500）',textEn:'Market price (500)',story:'客户犹豫了一下，但最终还是接受了。这个价格更健康。',storyEn:'The client hesitated but accepted. A healthier rate.',effect:{money:[400,600],rep:[1,3]}},
]},
{icon:'🚪',id:'employee_leaving',title:'员工离职',titleEn:'Employee Leaving',
desc:'你唯一的员工提出要离职，说是找到了更稳定的工作。你刚接了两个项目，人手不够。',descEn:'Your only employee is leaving. You have two projects lined up and no one to help.',
choices:[
{text:'加薪留人',textEn:'Raise salary to keep them',story:'你加了 30% 的工资把人留住了。',storyEn:'You offered a 30% raise and they stayed.',effect:{money:[-50,-30],rep:[1,3]}},
{text:'放人走，自己扛',textEn:'Let them go, do it yourself',story:'你一个人熬了几个通宵把项目做完了，累但省了人力成本。',storyEn:'You pulled all-nighters to finish the projects. Exhausting but cheaper.',effect:{money:[30,50],rep:[0,2]}},
]},
{icon:'💸',id:'cash_crisis',title:'现金流危机',titleEn:'Cash Flow Crisis',
desc:'连续两个月没有新客户，但你还要付办公室租金和工资。账面快见底了。',descEn:'Two months without new clients. Rent and salaries are due. Account nearly empty.',
choices:[
{text:'降薪过冬',textEn:'Cut salaries',story:'你带头降薪，团队理解并支持你度过了难关。',storyEn:'You led by example with a pay cut. The team rallied.',effect:{money:[-20,0],rep:[3,5]}},
{text:'去借贷',textEn:'Take a loan',story:'你借了一笔钱缓解了压力，但要还利息。',storyEn:'You took a loan to stay afloat. Interest hurts.',effect:{money:[100,200],rep:[-1,1]}},
{text:'裁员缩减',textEn:'Lay off staff',story:'你裁掉了部分员工，团队氛围变得很差。',storyEn:'You laid people off. Team morale plummeted.',effect:{money:[50,100],rep:[-6,-3]}},
]},
{icon:'⚔️',id:'competitor',title:'竞争对手',titleEn:'Competitors',
desc:'市场上突然出现了一家和你业务类似的咨询公司，报价比你低 30%。客户开始流失。',descEn:'A competitor appears with 30% lower prices. Clients are leaving.',
choices:[
{text:'打价格战',textEn:'Price war',story:'你也降价了，虽然抢回了一些客户但利润率暴跌。',storyEn:'You cut prices too. Won some clients back but margins are thin.',effect:{money:[-20,10],rep:[1,3]}},
{text:'差异化竞争',textEn:'Differentiate',story:'你强调自己独特的说服方法论，客户认可了你的价值。',storyEn:'You emphasized your unique methodology. Clients see the value.',effect:{money:[30,60],rep:[4,7]}},
{text:'找他们合作',textEn:'Collaborate',story:'你找对方谈了合作，各自专注细分市场，双赢。',storyEn:'You proposed a partnership. Each focuses on a niche. Win-win.',effect:{money:[20,40],rep:[2,5],prin:6,xp:[3,6]}},
]},
{icon:'🐋',id:'big_client',title:'大客户来了',titleEn:'Big Client',
desc:'一家大公司找上门来，想让你做一个大型项目。项目金额很高，但要求也非常苛刻。',descEn:'A major company wants to hire you. High pay, high demands.',
choices:[
{text:'接！拼一把',textEn:'Take it!',story:'你带着团队拼尽全力完成了项目，赚了一大笔钱。',storyEn:'You and your team delivered. Big payday.',effect:{money:[500,800],rep:[5,8]}},
{text:'我们目前能力不够',textEn:'We are not ready yet',story:'你婉拒了这个项目。客户很失望，但你保持了口碑。',storyEn:'You declined. The client was disappointed but respects your honesty.',effect:{rep:[2,4]}},
]},
{icon:'🤼',id:'partner_dispute',title:'合伙人分歧',titleEn:'Partner Dispute',
desc:'你的合伙人对公司发展方向有完全不同的想法，你们大吵了一架。公司面临分裂。',descEn:'Your partner has a completely different vision. A huge fight threatens the company.',
choices:[
{text:'让步，听他的',textEn:'Give in',story:'你让步了，公司按照他的方向走。你心里不太舒服。',storyEn:'You gave in. The company goes his way. You are not happy.',effect:{rep:[-2,0]}},
{text:'坚持自己的想法',textEn:'Stand your ground',story:'你成功说服了他，公司按你的方向前进。',storyEn:'You convinced him. The company goes your way.',effect:{money:[30,60],rep:[2,5],prin:3,xp:[4,8]}},
{text:'和平散伙',textEn:'Part ways',story:'你们分家了，各自开了自己的公司。',storyEn:'You split and each started your own firm.',effect:{money:[-100,-50],rep:[0,3],partner_split:true}},
]},
{icon:'💎',id:'investment_round',title:'融资还是自给',titleEn:'Investment or Bootstrap',
desc:'有投资人找上门，想给你的公司投资一大笔钱，但要占不少股份。你现在的公司虽然小但是完全属于你。',descEn:'An investor offers big money for a significant stake. Your company is small but all yours.',
choices:[
{text:'接受融资',textEn:'Take the investment',story:'你拿了投资，扩张了团队，业务增长很快。但你不再100%拥有公司了。',storyEn:'You took the money, expanded, and grew fast. But you no longer own 100%.',effect:{money:[1000,2000],rep:[8,12]}},
{text:'拒绝，慢慢来',textEn:'Bootstrap',story:'你拒绝了投资，靠自己的节奏稳步增长。慢但踏实。',storyEn:'You declined. Slow growth but full control.',effect:{money:[100,200],rep:[2,5]}},
]},
{icon:'📈',id:'expansion',title:'扩张还是深耕',titleEn:'Expand or Deepen',
desc:'你的公司发展得不错，现在面临选择——是开分公司进入新城市，还是把现有业务做得更深？',descEn:'Your company is doing well. Expand to new cities or deepen existing services?',
choices:[
{text:'扩张到新城市',textEn:'Expand',story:'新城市的业务增长不如预期，亏了一些钱。',storyEn:'The new city underperformed. Lost some money.',effect:{money:[-100,0],rep:[2,5]}},
{text:'深耕现有市场',textEn:'Deepen services',story:'你推出了高端咨询服务，客单价大幅提升。',storyEn:'You launched premium services. Average deal size grew.',effect:{money:[200,400],rep:[4,7]}},
]},
{icon:'🔄',id:'industry_shift',title:'行业变革',titleEn:'Industry Shift',
desc:'AI技术的突飞猛进让传统咨询行业面临洗牌。你必须要做出改变。',descEn:'AI is disrupting traditional consulting. You must adapt.',
choices:[
{text:'全面转型AI咨询',textEn:'Pivot to AI consulting',story:'你赌对了方向，公司成为了AI咨询的先驱。',storyEn:'You bet on the right trend. Your firm is now an AI consulting pioneer.',effect:{money:[500,1000],rep:[10,15],prin:1,xp:[5,10]}},
{text:'坚持传统路线',textEn:'Stay traditional',story:'你的客户逐渐流失，生意越来越难做。',storyEn:'Clients gradually left. Business got harder.',effect:{money:[-100,-50],rep:[-5,-2]}},
{text:'AI+人工混合模式',textEn:'Hybrid AI + Human',story:'你找到了一个平衡点，效率和人性化兼具。',storyEn:'You found the sweet spot. Efficient AND personal.',effect:{money:[300,600],rep:[5,10]}},
]},
{icon:'👑',id:'industry_leader',title:'行业领袖',titleEn:'Industry Leader',
desc:'你被邀请在一个大型行业峰会上做主题演讲。这是你成为行业领袖的机会。',descEn:'You are invited to give a keynote at a major industry summit.',
choices:[
{text:'全力以赴',textEn:'Go all out',
usePrin:2,baseRate:50,
success:'你的演讲震撼全场，从此你就是行业里公认的领袖了！',successEn:'Your speech electrified the audience. You are now an industry leader!',
successEffect:{money:[500,1000],rep:[15,20],becomeLeader:true},
fail:'你的演讲反响平平，错过了成为领袖的机会。',failEn:'Your speech fell flat. Missed your chance at leadership.',
failEffect:{rep:[-3,-1]},},
  {text:'推掉，低调做事',textEn:'Decline, stay low-key',story:'你推掉了演讲机会，继续埋头经营自己的公司。',storyEn:'You declined the speech and kept running your company quietly.',effect:{money:[100,200],rep:[2,4],leaderDeclined:true}},
]},
],
};

// ---- State ----
let S = {};
let P = null; // pending milestone

function initState() {
  S = {
    phase:'study', day:0, money:0, rep:0,
    prins:[0,0,0,0,0,0,0], prinXP:[0,0,0,0,0,0,0],
    totalEarned:0, jobLevel:0, jobProgress:0,
    bigOpportunityTaken:false, leaderDeclined:false, becomeLeader:false, milestones:new Set(),
    eventHistory:[],
    seenEvents:new Set(),
  };
}

function xpNeed(lv) { return (lv+1)*10; }
function xpGain(lv) { return 6+lv*2; }
function successChance(lv, diff) {
  return Math.min(95, Math.max(10, Math.round(40 + (lv-diff*0.6)*8)));
}
function fmt(n) { return n.toLocaleString(); }
function rnd(a,b) { return Math.floor(Math.random()*(b-a+1))+a; }
function pick(arr) { return arr[rnd(0,arr.length-1)]; }
function clamp(v,min,max) { return Math.max(min,Math.min(max,v)); }

// ---- DOM ----
const titleScreen=$('title-screen'),gameScreen=$('game-screen');
const dayNum=$('day-num'),phaseBadge=$('phase-badge');
const statMoney=$('stat-money'),statRep=$('stat-rep');
const phaseContent=$('phase-content'),logArea=$('log-area'),sidePanel=$('side-panel');
const rmIcon=$('rm-icon'),rmTitle=$('rm-title'),rmText=$('rm-text'),rmBtn=$('rm-btn');
const msTitle=$('ms-title'),msText=$('ms-text'),msBtn=$('ms-btn');
const resultModal=$('result-modal'),milestoneModal=$('milestone-modal');

function updStats() {
  dayNum.textContent = S.day;
  statMoney.textContent = fmt(S.money);
  statRep.textContent = S.rep;
  const n = {study:'📚 学习',work:'💼 工作',entrepreneur:'🏢 创业'};
  phaseBadge.textContent = n[S.phase]||'';
}

function log(msg, cls='') {
  const d = document.createElement('div');
  d.className = 'log-line'+(cls?' log-'+cls:'');
  d.textContent = msg;
  logArea.appendChild(d);
  logArea.scrollTop = logArea.scrollHeight;
}

// ---- Modals ----
function showResult(icon, title, text) {
  return new Promise(res => {
    rmIcon.textContent = icon;
    rmTitle.textContent = title;
    rmText.textContent = text;
    resultModal.classList.add('open');
    rmBtn.onclick = () => {
      resultModal.classList.remove('open');
      if (P) { const m=P; P=null; showMilestone(m).then(res); }
      else res();
    };
  });
}

function showMilestone(m) {
  return new Promise(res => {
    const zh=(localStorage.getItem('game-lang')||'zh-CN')==='zh-CN';
    msTitle.textContent = zh?m.title:m.titleEn;
    msText.textContent = zh?m.msg:m.msgEn;
    milestoneModal.classList.add('open');
    log(`🏆 ${zh?m.title:m.titleEn}`,'high');
    msBtn.onclick = () => { milestoneModal.classList.remove('open'); res(); };
  });
}

function checkMs() {
  for (const m of MILESTONES) {
    if (!S.milestones.has(m.id) && m.cond(S)) {
      S.milestones.add(m.id); P = m; return true;
    }
  }
  return false;
}

// ---- Core ----
function render() {
  updStats();
  renderSide();
  const e = S.currentEvent;
  if (!e) { phaseContent.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-dim);">正在加载...</div>'; return; }
  
  const zh=(localStorage.getItem('game-lang')||'zh-CN')==='zh-CN';
  const t = zh?e.title:e.titleEn;
  const d = zh?e.desc:e.descEn;
  const eid = e.id;

  phaseContent.innerHTML = `<div class="event-card">
    <div class="ec-icon">${e.icon}</div>
    <div class="ec-title">${t}</div>
    <div class="ec-desc">${d}</div>
    <div class="ec-choices" id="ec-choices"></div>
  </div>`;

  const cont = $('ec-choices');
  e.choices.forEach((ch, ci) => {
    const bt = document.createElement('button');
    bt.className = 'ec-btn';
    bt.textContent = zh?ch.text:ch.textEn;
    bt.addEventListener('click', () => choiceMade(ci));
    cont.appendChild(bt);
  });
}

function renderSide() {
  if (S.phase==='study') {
    const done = S.prins.filter(p=>p>=1).length;
    const allDone = done === 7;
    sidePanel.innerHTML = `<button class="sp-btn" disabled>📚 学习第 ${S.day+1} 天</button>
      <div style="font-size:.6rem;color:var(--text-dim);text-align:center;">${done}/7 已入门</div>
      ${allDone?'<button id="sp-gw" class="sp-btn" style="border-color:var(--success);color:var(--success);">💼 去找工作</button>':''}`;
    const gw=$('sp-gw'); if(gw) gw.addEventListener('click',()=>transitionPhase('work'));
  } else if (S.phase==='work') {
    const t = ['实习生','专员','主管','经理','总监'][Math.min(S.jobLevel,4)];
    sidePanel.innerHTML = `<button class="sp-btn" disabled>💼 ${t}</button>
      ${S.bigOpportunityTaken&&S.money>=500?'<button id="sp-startup" class="sp-btn" style="border-color:var(--success);color:var(--success);">🏢 去创业</button>':''}
      <div style="font-size:.6rem;color:var(--text-dim);text-align:center;">职级 ${S.jobLevel+1} · 日薪 ${15+S.jobLevel*10}</div>`;
    const sb=$('sp-startup'); if(sb) sb.addEventListener('click',()=>transitionPhase('entrepreneur'));
  } else {
    sidePanel.innerHTML = `<button class="sp-btn" disabled>🏢 创业第 ${S.day+1} 天</button>
      <div style="font-size:.6rem;color:var(--text-dim);text-align:center;">累计 ¥${fmt(S.totalEarned)}</div>`;
  }
}

function choiceMade(ci) {
  if (S.busy) return;
  S.busy = true;
  S.day++;
  const e = S.currentEvent;
  const ch = e.choices[ci];
  S.seenEvents.add(e.id);

  const isRisky = !!ch.usePrin;
  const zh=(localStorage.getItem('game-lang')||'zh-CN')==='zh-CN';

  if (isRisky) {
    const lv = S.prins[ch.usePrin];
    const rate = ch.baseRate + lv * 5;
    const roll = Math.random() * 100;
    const ok = roll < rate;
    const out = ok
      ? { story:ch.success, storyEn:ch.successEn, effect:ch.successEffect||{} }
      : { story:ch.fail, storyEn:ch.failEn, effect:ch.failEffect||{} };
    applyEffect(out.effect, ok);
    checkMs();
    const msg = zh?out.story:out.storyEn;
    log(`${ok?'✅':'❌'} ${PRINS[ch.usePrin].icon} ${PRINS[ch.usePrin].name} (${Math.round(rate)}%)`, ok?'good':'bad');
    log(msg, 'info');
    S.busy = false;
    showResult(ok?'✅':'❌', ok?'成功':'失败', msg).then(() => nextEvent());
  } else {
    applyEffect(ch.effect||{}, true);
    checkMs();
    const msg = zh?ch.story:ch.storyEn;
    log(msg, 'info');
    
    if (ch.nextPhase) {
      S.busy = false;
      showResult('🔄', '进入下一阶段', msg).then(() => {
        transitionPhase(ch.nextPhase);
      });
    } else {
      S.busy = false;
      showResult('📌', '选择', msg).then(() => nextEvent());
    }
  }
}

function applyEffect(ef, success) {
  if (!ef) return;
  if (ef.money) {
    const [mn,mx]=ef.money; const v=rnd(mn,mx);
    S.money+=v; if(v>0)S.totalEarned+=v; if(S.money<0)S.money=0;
  }
  if (ef.rep) {
    const [mn,mx]=ef.rep; S.rep=clamp(S.rep+rnd(mn,mx),0,100);
  }
  if (ef.jobProgress) {
    const [mn,mx]=ef.jobProgress; S.jobProgress+=rnd(mn,mx);
    if(S.jobProgress<0)S.jobProgress=0;
    const need=3+S.jobLevel*2;
    while(S.jobProgress>=need&&S.jobLevel<4){
      S.jobProgress-=need; S.jobLevel++;
      log(`🎉 升职了！现在是「${['实习生','专员','主管','经理','总监'][S.jobLevel]}」！`,'high');
    }
  }
  // Prin: {prin:i, xp:[min,max]}
  if(ef.prin!==undefined && ef.xp){
    const i=ef.prin; const [mn,mx]=ef.xp; const gain=rnd(mn,mx);
    const lv=S.prins[i]; S.prinXP[i]+=gain;
    if(S.prinXP[i]>=xpNeed(lv)){ S.prinXP[i]-=xpNeed(lv); S.prins[i]++;
      log(`⬆️ ${PRINS[i].icon} ${PRINS[i].name} 升到 Lv.${S.prins[i]}！`,'good'); }
  }
  if(ef.bigOpportunityTaken) S.bigOpportunityTaken=true;
  if(ef.becomeLeader) S.becomeLeader=true;
  if(ef.leaderDeclined) S.leaderDeclined=true;
  updStats();
}

function nextEvent() {
  // Check phase transitions
  if (S.phase==='study' && S.prins.every(p=>p>=1) && !S.pendingGradEvent) {
    S.pendingGradEvent = true;
    // The graduation event will be shown automatically
  }
  
  if (S.becomeLeader) {
    showResult('👑', '行业领袖！', '你成为了行业领袖！从零开始，你走完了这条路。').then(() => {
      showMilestone({title:'完结撒花',titleEn:'The End',msg:'恭喜——你从零做到了领袖。\n人生没有白走的路，每一步都算数。',msgEn:'From zero to industry leader. Every step counted.'});
    });
    return;
  }

  // Pick next event
  const pool = [...EVENTS[S.phase]];
  // For study, if all Lv1 and not seen graduation, force it
  if (S.phase==='study') {
    const grad = pool.find(e => e.id==='graduation');
    if (S.prins.every(p=>p>=1) && grad && !S.seenEvents.has('graduation')) {
      S.currentEvent = grad;
      render();
      return;
    }
  }
  
  // For work, mix in opportunities
  if (S.phase==='work' && !S.bigOpportunityTaken && S.money >= 100 && Math.random() < 0.2) {
    const opp = pool.find(e => e.id==='big_opportunity');
    if (opp) { S.currentEvent = opp; render(); return; }
  }

  // For entrepreneur, force leader event when conditions met
  if (S.phase==='entrepreneur' && !S.becomeLeader && !S.leaderDeclined) {
    const leader = pool.find(e => e.id==='industry_leader');
    if (S.totalEarned >= 12000 && leader) {
      S.currentEvent = leader;
      render();
      return;
    }
  }

  // Pick random unseen first, then any
  const unseen = pool.filter(e => !S.seenEvents.has(e.id));
  const available = unseen.length > 0 ? unseen : pool;
  S.currentEvent = pick(available);
  render();
}

function transitionPhase(phase) {
  S.phase = phase;
  log(`🔄 进入新阶段：${phase==='work'?'工作':phase==='entrepreneur'?'创业':'学习'}`,'high');
  if (phase==='work') {
    S.jobLevel = 0;
    S.jobProgress = 0;
    log('你找到了一份工作，职场生活开始了。','info');
    log('每个选择都可能影响你的晋升、收入和口碑。','info');
  } else if (phase==='entrepreneur') {
    log('你的咨询公司正式开张了。','info');
    log('创业的路上没有容易二字，每个决定都关乎生死。','info');
    S.becomeLeader = false;
  }
  nextEvent();
}

// ---- Milestones ----
const MILESTONES = [
  { id:'first_study', cond:s=>s.prins.some(p=>p>=1), title:'第一次突破', titleEn:'First Breakthrough', msg:'你第一次掌握了一个说服原理——从此你有了一把武器。', msgEn:'You mastered your first principle.' },
  { id:'all_basics', cond:s=>s.prins.every(p=>p>=1) && s.phase==='study', title:'基础扎实', titleEn:'Basics Covered', msg:'七个原理你都入门了。可以去找工作了！', msgEn:'All 7 principles at level 1!' },
  { id:'first_promotion', cond:s=>s.jobLevel>=1, title:'第一次晋升', titleEn:'First Promotion', msg:'你升职了！努力没有白费。', msgEn:'You got promoted!' },
  { id:'saved_500', cond:s=>s.money>=500 && s.phase==='work', title:'第一笔存款', titleEn:'First Savings', msg:'存到了 500 块。这是你创业的种子资金。', msgEn:'500 saved. Seed money for your startup.' },
  { id:'big_break', cond:s=>s.bigOpportunityTaken, title:'抓住机遇', titleEn:'Seized the Opportunity', msg:'你抓住了改变人生的机会——现在可以创业了！', msgEn:'You seized a life-changing opportunity!' },
  { id:'earn_1000', cond:s=>s.totalEarned>=1000, title:'四位数收入', titleEn:'Four Digits', msg:'累计收入突破 1000。', msgEn:'1000 total earned.' },
  { id:'earn_5000', cond:s=>s.totalEarned>=5000, title:'五位数收入', titleEn:'Five Digits', msg:'累计收入突破 5000。', msgEn:'5000 total earned.' },
  { id:'earn_10000', cond:s=>s.totalEarned>=10000, title:'六位数收入', titleEn:'Six Figures', msg:'累计收入突破 10000。', msgEn:'10000 total earned.' },
];

// ---- Start ----
$('start-btn').addEventListener('click', () => {
  titleScreen.classList.remove('active');
  gameScreen.classList.add('active');
  initState();
  logArea.innerHTML = '<div class="log-line log-info">📚 你的人生从一间小书房开始——面前是七本说服力原理的书。</div>';
  log('每个回合你都会面对一个故事和选择。', 'info');
  log('你的每一个决定，都在塑造你的人生。', 'info');
  S.currentEvent = EVENTS.study.find(e => e.id === 'first_lesson');
  render();
});

// ---- Lang ----
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    localStorage.setItem('game-lang',this.dataset.lang);
    render();
  });
});

// ---- Close upgrade panel on bg click only ----
$('upgrade-panel')?.addEventListener('click', (e) => {
  if(e.target===$('upgrade-panel')) { $('upgrade-panel').classList.remove('open'); }
});

console.log('🏗️ 从零到领袖 v4 - 事件驱动人生模拟');
})();
