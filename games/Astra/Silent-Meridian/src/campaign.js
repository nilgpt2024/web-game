// Pure puzzle rules and campaign progression. The original chapter keeps its own state.
export const CHAPTER_PUZZLES = { 2: ['route', 'lamps', 'bridge'], 3: ['mirrors', 'growth', 'specimens'], 4: ['causality', 'shutters', 'origin'] };
export const REEFS = [1, 2];
export const ROUTE_SOLUTION = [0, 4, 5, 6, 10, 9, 8, 12, 13, 14, 15];
export const MIRROR_CELLS = [11, 1, 3, 18, 15, 20];
export const SPECIMEN_GIVENS = { 0: 1, 1: 2, 4: 3, 11: 1, 14: 4 };
export const SHUTTER_MASKS = [[1,0,0,0,1,0,0,0,0], [0,1,0,0,0,1,0,0,1], [1,1,0,0,0,0,1,0,0]];
export const SHUTTER_TARGET = [0,1,1,1,1,0,0,1,1];
export const ORIGIN_SOLUTION = [6, 3, 2, 5];
const same = (a, b) => Array.isArray(a) && a.length === b.length && a.every((v,i) => v === b[i]);
const wrap = (n,m) => ((n % m) + m) % m;
const ints = (a,n,max) => Array.isArray(a) && a.length === n && a.every(v => Number.isInteger(v) && v >= 0 && v <= max);
export const adjacent = (a,b,size=4) => Math.abs(a % size - b % size) + Math.abs(Math.floor(a / size) - Math.floor(b / size)) === 1;

export function toggleBridge(values, cell) {
  if (!Number.isInteger(cell) || cell < 0 || cell > 8) return [...values];
  return values.map((v,i) => i === cell || adjacent(i,cell,3) ? 1-v : v);
}
export const BRIDGE_INITIAL = [0,1,4,6,8].reduce(toggleBridge, Array(9).fill(0));
export function bridgePlan(values) {
  let best = null;
  for (let mask=0; mask<512; mask++) {
    let v=[...values]; const presses=[];
    for(let i=0;i<9;i++) if(mask & (1<<i)) {v=toggleBridge(v,i); presses.push(i);}
    if(v.every(n=>n===0) && (!best || presses.length < best.length)) best=presses;
  }
  return best;
}
export function extendRoute(path, cell) {
  if (!Number.isInteger(cell) || cell<0 || cell>15 || REEFS.includes(cell)) return [...path];
  const previous=path.indexOf(cell);
  if(previous>=0) return path.slice(0,previous+1);
  if(path.length>=11 || !adjacent(path.at(-1),cell)) return [...path];
  return [...path,cell];
}
export function lampClaims(values) {
  const [a,b,c,d]=values.map(Boolean);
  return [!b,c,a!==d,!a && b].map(Number);
}
export function traceLight(mirrors) {
  let x=-1,y=2,dx=1,dy=0;
  const points=[[-.5,2.5]], visited=[], seen=new Set();
  for(let step=0;step<100;step++) {
    x+=dx;y+=dy;
    if(x<0 || y<0 || x>=5 || y>=5) {
      points.push([x+.5,y+.5]);
      return {points,visited,success:x===5 && y===4 && new Set(visited).size===MIRROR_CELLS.length,loop:false};
    }
    points.push([x+.5,y+.5]);
    const key=`${x},${y},${dx},${dy}`;
    if(seen.has(key)) return {points,visited,success:false,loop:true};
    seen.add(key);
    const mirror=MIRROR_CELLS.indexOf(y*5+x);
    if(mirror>=0) {visited.push(mirror); [dx,dy]=mirrors[mirror] ? [dy,dx] : [-dy,-dx];}
  }
  return {points,visited,success:false,loop:true};
}
export function grow(sequence) {
  const history=[[1,0,0]];
  for(const climate of sequence) {
    if(!Number.isInteger(climate) || climate<0 || climate>2) return {history,valid:false};
    let [root,leaf,flower]=history.at(-1);
    if(climate===0) leaf+=root;
    if(climate===1) root+=1;
    if(climate===2) {if(root===0)return {history,valid:false}; flower+=leaf;root-=1;}
    history.push([root,leaf,flower]);
    if(Math.max(root,leaf,flower)>6)return {history,valid:false};
  }
  return {history,valid:true};
}
export function rotateMask(mask, turns) {
  let result=[...mask];
  for(let t=0;t<wrap(turns,4);t++) result=Array.from({length:9},(_,i)=>result[(2-i%3)*3+Math.floor(i/3)]);
  return result;
}
export const overlayShutters = turns => SHUTTER_MASKS.map((m,i)=>rotateMask(m,turns[i])).reduce((a,b)=>a.map((v,i)=>v^b[i]),Array(9).fill(0));
export function initialPuzzle(id) {
  const values={route:[0],lamps:[0,0,0,0],bridge:BRIDGE_INITIAL,mirrors:[1,1,1,1,1,1],growth:[0,0,0,0,0],specimens:Array.from({length:16},(_,i)=>SPECIMEN_GIVENS[i]??0),causality:[0,1,2,3,4],shutters:[0,0,0],origin:[0,0,0,0]};
  return [...values[id]];
}
export function freshChapter(id) {
  return {started:false,phase:'present',inspected:[],puzzles:Object.fromEntries(CHAPTER_PUZZLES[id].map(k=>[k,initialPuzzle(k)])),solved:Object.fromEntries(CHAPTER_PUZZLES[id].map(k=>[k,false])),hints:Object.fromEntries(CHAPTER_PUZZLES[id].map(k=>[k,0])),complete:false,choice:null};
}
export const freshCampaign = () => ({active:1,chapters:{2:freshChapter(2),3:freshChapter(3),4:freshChapter(4)}});

export function validateChapterPuzzle(chapter,id) {
  const v=chapter.puzzles[id];
  if(id==='route') return v.length===11 && v[0]===0 && v.at(-1)===15 && new Set(v).size===11 && !v.some(n=>REEFS.includes(n)) && v.every((n,i)=>i===0||adjacent(v[i-1],n)) && v.includes(6) && v.includes(12) && v.indexOf(6)<v.indexOf(12);
  if(id==='lamps') return same(v,lampClaims(v));
  if(id==='bridge') return v.every(n=>n===0);
  if(id==='mirrors') return traceLight(v).success;
  if(id==='growth') {const r=grow(v);return r.valid && same(r.history.at(-1),[2,5,5]);}
  if(id==='specimens') return Object.entries(SPECIMEN_GIVENS).every(([i,n])=>v[i]===n) && [0,1,2,3].every(r=>new Set(v.slice(r*4,r*4+4)).size===4 && new Set([0,1,2,3].map(c=>v[c*4+r])).size===4) && v.every(n=>n>=1 && n<=4);
  if(id==='causality') {const ix=n=>v.indexOf(n)+1;return new Set(v).size===5 && ix(4)===ix(1)+1 && ix(2)===2*ix(1) && ix(0)>ix(2);}
  if(id==='shutters') return same(overlayShutters(v),SHUTTER_TARGET);
  if(id==='origin') return chapter.solved.causality && chapter.solved.shutters && same(v,ORIGIN_SOLUTION);
  return false;
}
export function unlockedChapter(state) {
  if(!state.ending)return 1;
  if(!state.campaign.chapters[2].complete)return 2;
  return state.campaign.chapters[3].complete ? 4 : 3;
}
export function selectChapter(state,id) {
  if(!Number.isInteger(id) || id<1 || id>unlockedChapter(state))return false;
  state.campaign.active=id;if(id>1)state.campaign.chapters[id].started=true;return true;
}
export function submitChapterPuzzle(state,id) {
  const active=state.campaign.active;
  if(active===1 || active>unlockedChapter(state) || !CHAPTER_PUZZLES[active].includes(id))return false;
  const chapter=state.campaign.chapters[active];
  if(!validateChapterPuzzle(chapter,id))return false;
  chapter.solved[id]=true;return true;
}
export function completeChapter(state,choice='continue') {
  const active=state.campaign.active;
  if(active===1 || active>unlockedChapter(state))return false;
  const chapter=state.campaign.chapters[active];
  if(!CHAPTER_PUZZLES[active].every(id=>chapter.solved[id]) || chapter.phase!=='present')return false;
  if(!(active===4 ? ['carry','quiet'] : ['continue']).includes(choice))return false;
  chapter.complete=true;chapter.choice=choice;return true;
}
export function changeChapterPuzzle(state,id,index,direction=1) {
  const active=state.campaign.active;
  if(active===1 || active>unlockedChapter(state) || !CHAPTER_PUZZLES[active].includes(id))return false;
  const chapter=state.campaign.chapters[active], v=chapter.puzzles[id];
  if(chapter.solved[id] || !Number.isInteger(index) || ![-1,1].includes(direction))return false;
  if(id==='route') chapter.puzzles[id]=extendRoute(v,index);
  else if(id==='bridge') chapter.puzzles[id]=toggleBridge(v,index);
  else if(index<0 || index>=v.length) return false;
  else if(id==='specimens') {if(index in SPECIMEN_GIVENS)return false;v[index]=v[index]===0 ? (direction===1?1:4) : wrap(v[index]-1+direction,4)+1;}
  else if(id==='causality') {const next=index+direction;if(next<0||next>=v.length)return false;[v[index],v[next]]=[v[next],v[index]];}
  else v[index]=wrap(v[index]+direction,{lamps:2,mirrors:2,growth:3,shutters:4,origin:10}[id]);
  return true;
}
export function resetChapterPuzzle(state,id) {
  const c=state.campaign.chapters[state.campaign.active];
  if(!c || !(id in c.puzzles) || c.solved[id])return false;
  c.puzzles[id]=initialPuzzle(id);return true;
}

export function hydrateCampaign(raw,firstComplete) {
  const campaign=freshCampaign(); let previousComplete=firstComplete;
  for(const id of [2,3,4]) {
    const source=raw?.chapters?.[id], target=campaign.chapters[id];
    // Ignore progress beyond the first locked chapter; never unlock from unverified flags.
    if(!source || !previousComplete)break;
    if(['present','echo'].includes(source.phase))target.phase=source.phase;
    target.inspected=Array.isArray(source.inspected) ? [...new Set(source.inspected.filter(v=>['present','echo'].includes(v)))] : [];
    for(const k of CHAPTER_PUZZLES[id]) {
      const v=source.puzzles?.[k];
      const valid=k==='route' ? Array.isArray(v) && v.length>0 && v.length<=11 && v[0]===0 && v.every((n,i)=>Number.isInteger(n)&&n>=0&&n<=15&&!REEFS.includes(n)&&(i===0||adjacent(n,v[i-1]))) && new Set(v).size===v.length : ints(v,target.puzzles[k].length,{lamps:1,bridge:1,mirrors:1,growth:2,specimens:4,causality:4,shutters:3,origin:9}[k]);
      if(valid && (k!=='causality'||new Set(v).size===5) && (k!=='specimens'||Object.entries(SPECIMEN_GIVENS).every(([i,n])=>v[i]===n)))target.puzzles[k]=[...v];
      target.solved[k]=source.solved?.[k]===true && validateChapterPuzzle(target,k);
      if(Number.isInteger(source.hints?.[k]))target.hints[k]=Math.min(3,Math.max(0,source.hints[k]));
    }
    target.started=source.started===true || target.inspected.length>0 || CHAPTER_PUZZLES[id].some(k=>target.solved[k] || !same(target.puzzles[k],initialPuzzle(k)));
    target.complete=source.complete===true && CHAPTER_PUZZLES[id].every(k=>target.solved[k]) && (id===4 ? ['carry','quiet'] : ['continue']).includes(source.choice);
    if(target.complete)target.choice=source.choice;
    previousComplete=target.complete;
  }
  const shell={ending:firstComplete,campaign};
  if(Number.isInteger(raw?.active))campaign.active=Math.min(unlockedChapter(shell),Math.max(1,raw.active));
  return campaign;
}
