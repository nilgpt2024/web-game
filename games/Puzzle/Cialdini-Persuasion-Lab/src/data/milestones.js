export const MILESTONES = [
  { id:'first_study', cond:s=>s.prins.some(p=>p>=1), title:'第一次突破', titleEn:'First Breakthrough', msg:'你第一次掌握了一个说服原理——从此你有了一把武器。', msgEn:'You mastered your first principle.' },
  { id:'all_basics', cond:s=>s.prins.every(p=>p>=1) && s.phase==='study', title:'基础扎实', titleEn:'Basics Covered', msg:'七个原理你都入门了。可以去找工作了！', msgEn:'All 7 principles at level 1!' },
  { id:'first_promotion', cond:s=>s.jobLevel>=1, title:'第一次晋升', titleEn:'First Promotion', msg:'你升职了！努力没有白费。', msgEn:'You got promoted!' },
  { id:'saved_500', cond:s=>s.money>=500 && s.phase==='work', title:'第一笔存款', titleEn:'First Savings', msg:'存到了 500 块。这是你创业的种子资金。', msgEn:'500 saved. Seed money for your startup.' },
  { id:'big_break', cond:s=>s.bigOpportunityTaken, title:'抓住机遇', titleEn:'Seized the Opportunity', msg:'你抓住了改变人生的机会——现在可以创业了！', msgEn:'You seized a life-changing opportunity!' },
  { id:'earn_1000', cond:s=>s.totalEarned>=1000, title:'四位数收入', titleEn:'Four Digits', msg:'累计收入突破 1000。', msgEn:'1000 total earned.' },
  { id:'earn_5000', cond:s=>s.totalEarned>=5000, title:'五位数收入', titleEn:'Five Digits', msg:'累计收入突破 5000。', msgEn:'5000 total earned.' },
  { id:'earn_10000', cond:s=>s.totalEarned>=10000, title:'六位数收入', titleEn:'Six Figures', msg:'累计收入突破 10000。', msgEn:'10000 total earned.' },
];
