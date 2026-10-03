import { chapters, chapterPuzzles } from './chapters.js';
import { CHAPTER_PUZZLES, REEFS, MIRROR_CELLS, SPECIMEN_GIVENS, SHUTTER_MASKS, SHUTTER_TARGET, rotateMask, overlayShutters, traceLight, grow, bridgePlan, unlockedChapter } from './campaign.js';

const coordinate = n => `${'ABCD'[n%4]}${Math.floor(n/4)+1}`;
const roman = ['I','II','III','IV','V','VI'];
const eventKeys = ['eventGate','eventLight','eventBell','eventLetter','eventShadow'];

// Rendering stays separate from pure puzzle rules. All changes go through app actions.
export function expeditionView(state,h) {
  const {t,esc,prose,button,icon,logo,commonTools}=h;
  const active=state.campaign.active, chapter=chapters[active], progress=state.campaign.chapters[active];
  const keys=CHAPTER_PUZZLES[active] || [];
  const ready=progress && keys.every(k=>progress.solved[k]);
  const label = id => esc(t(chapterPuzzles[id].title));
  const mutation = (id,index,direction=1) => `chapter-change:${id}:${index}:${direction}`;
  const smallGrid = values => `<div class="shutter-grid" aria-hidden="true">${values.map(v=>`<i class="${v?'lit':''}"></i>`).join('')}</div>`;

  function scene(screen='game') {
    const points=keys.map((id,i)=>({action:`chapter-puzzle:${id}`,point:chapter.points[i],label:label(id),icon:progress.solved[id]?'check':'star',done:progress.solved[id]}));
    points.push({action:'chapter-notes',point:[88,29],label:t('readRecords'),icon:'eye',done:progress.inspected.includes(progress.phase)});
    points.push({action:'chapter-exit',point:active===2?[64,61]:active===3?[49,35]:[53,38],label:t('chapterExit'),short:t('chapterPassage'),icon:progress.complete?'check':'arrow',done:progress.complete});
    return `<div class="stage chapter-stage ${progress.phase==='echo'?'is-echo':''}"><div class="world" id="world"><img id="scene-image" class="scene-image" src="./assets/${chapter.art}.png" alt="${esc(t(chapter.summary))}" draggable="false">${screen==='game'?`<div class="hotspots ${state.showHotspots?'show-markers':''}">${points.map(p=>button(`<span class="point-mark">${icon(p.icon)}</span><span class="point-label">${p.short || p.label}</span>`,p.action,`hotspot ${p.done?'done':''} ${p.point[0]<25?'edge-left':p.point[0]>75?'edge-right':''}`,`style="left:${p.point[0]}%;top:${p.point[1]}%" aria-label="${p.label}"`)).join('')}</div>`:''}</div><div class="scene-vignette"></div><div class="mist mist-one"></div>${progress.phase==='echo'?'<div class="echo-grain"></div><div class="echo-line"></div>':''}</div>`;
  }
  function game(saveAvailable) {
    return `${scene()}<header class="topbar game-bar"><div class="brand compact">${logo()}<span>${esc(t('title'))}</span></div><div class="phase-wrap"><div class="phase-control" role="group" aria-label="${t('shift')}">${['present','echo'].map(p=>button(`${icon('phase')}${t(p)}`,`phase:${p}`,progress.phase===p?'active':'',`aria-pressed="${progress.phase===p}"`)).join('')}</div><span class="phase-shortcut">${t('shift')}</span></div>${commonTools()}</header>
      <main class="exploration"><div class="room-heading"><div class="eyebrow">${chapter.numeral} <span class="line"></span> ${esc(t(chapter.subtitle))}</div><h1>${esc(t(chapter.title))}</h1><p>${esc(t(chapter.summary))}</p></div><div class="station-clock"><span>${t(progress.phase==='echo'?'echoTime':'presentTime')}</span><strong>${chapter.time[progress.phase==='echo'?1:0]}</strong><div class="clock-rule"><i></i></div></div><div class="mission"><div class="mission-signals">${keys.map(k=>`<span class="signal-light ${progress.solved[k]?'lit':''}" aria-label="${label(k)}: ${progress.solved[k]?t('solved'):'—'}">${icon(progress.solved[k]?'check':'star')}</span>`).join('')}<span>${keys.filter(k=>progress.solved[k]).length}<i>/</i>3</span></div><p>${t(ready?'chapterReady':'chapterExplore')}</p></div></main>
      <div class="side-tools campaign-tools">${button(icon('book'),'journal','icon-button',`aria-label="${t('journal')}"`)}${button(icon('archive'),'chapters','icon-button',`aria-label="${t('chapters')}"`)}${button(icon('help'),'help','icon-button',`aria-label="${t('help')}"`)}${button(icon('settings'),'settings','icon-button',`aria-label="${t('settings')}"`)}</div>
      <nav class="room-nav chapter-room-nav" aria-label="${t('chapterMap')}">${keys.map((id,i)=>button(`<span class="nav-number">0${i+1}</span>${icon(progress.solved[id]?'check':'star')}<span>${label(id)}</span>`,`chapter-puzzle:${id}`,'')).join('')}</nav><footer class="game-footer"><span>${t('title')} · ${chapter.numeral} / IV</span><span>${saveAvailable?t('saved'):''}</span></footer>`;
  }
  function chapterList() {
    const unlocked=unlockedChapter(state);
    return `<p class="body-copy">${t('campaignSubtitle')}</p><div class="chapter-list">${[1,2,3,4].map(id=>{
      const data=chapters[id], complete=id===1?Boolean(state.ending):state.campaign.chapters[id].complete;
      const started=id===1?state.started:state.campaign.chapters[id].started;
      const status=id>unlocked?'chapterLocked':complete?'chapterComplete':started?'chapterInProgress':'chapterUnstarted';
      return button(`<img src="./assets/${data.art}.png" alt="" loading="lazy"><span class="chapter-list-copy"><small>${data.numeral} / IV · ${t(status)}</small><strong>${esc(t(data.title))}</strong><span>${esc(t(data.summary))}</span></span>${icon(id>unlocked?'phase':'arrow')}`,`chapter-select:${id}`,`chapter-row ${id===active?'current':''}`,`${id>unlocked?'disabled':''} aria-label="${esc(t(data.title))} · ${t(status)}"`);
    }).join('')}</div>`;
  }
  function carried() {
    const records=[];
    if(state.ending)records.push(`<article><h4>${t('chapterOneRecord')}</h4>${prose(t('chapterOneResult'))}</article>`);
    for(const id of [2,3])if(state.campaign.chapters[id].complete)records.push(`<article><h4>${esc(t(chapters[id].travelTitle))}</h4>${prose(t(chapters[id].travelResult))}</article>`);
    return `<section class="travel-records"><h3>${t('travelNotes')}</h3><p>${t('travelIntro')}</p>${records.join('') || `<p>${t('noTravelNotes')}</p>`}</section>`;
  }
  function evidence() {
    return ['present','echo'].map((p,i)=>`<article class="chapter-record"><h4>${esc(t(chapter.records[i].slice(0,2)))}</h4>${progress.inspected.includes(p)?prose(t(chapter.records[i].slice(2))):`<p class="missing-note">${t('missingPhase')} · ${t(p)}</p>`}</article>`).join('');
  }
  function journal() {
    return `<div class="journal-layout"><div class="journal-entries"><h3 class="journal-section-title">${esc(t(chapter.title))}</h3>${evidence()}${keys.filter(k=>progress.solved[k]).map(k=>`<article class="chapter-record"><h4>${label(k)} · ${t('solved')}</h4>${prose(t(chapterPuzzles[k].result))}</article>`).join('')}${carried()}</div><aside class="personal-notes"><label for="personal-note">${t('fieldNotes')}</label><textarea id="personal-note" maxlength="4000" placeholder="${esc(t('notesPlaceholder'))}">${esc(state.personalNote)}</textarea><small>${t('personalSaved')} <span id="personal-counter">${state.personalNote.length}/4000</span></small></aside></div>`;
  }
  function mechanism(id) {
    const v=progress.puzzles[id];
    if(id==='route')return `<div class="route-caption"><span>A1 → ◯ C2 → ● A4 → D4</span><output>${t('routeSteps')} ${v.length-1}/10</output></div><div class="route-board"><svg viewBox="0 0 400 400" aria-hidden="true"><polyline points="${v.map(n=>`${(n%4)*100+50},${Math.floor(n/4)*100+50}`).join(' ')}"/></svg>${Array.from({length:16},(_,n)=>button(`<small>${coordinate(n)}</small><strong>${REEFS.includes(n)?'×':n===0?'◎':n===15?'◇':n===6?'◯':n===12?'●':'·'}</strong><b>${v.includes(n)?String(v.indexOf(n)).padStart(2,'0'):''}</b>`,mutation(id,n),`route-cell ${v.includes(n)?'visited':''} ${v.at(-1)===n?'route-end':''}`,`aria-label="${coordinate(n)}" ${REEFS.includes(n)?'disabled':''}`)).join('')}</div><p class="instrument-instruction">${t('routeInstruction')}</p>`;
    if(id==='lamps')return `<div class="testimony-lamps">${v.map((value,i)=>button(`<span>${'ABCD'[i]}</span><i class="lamp-bulb"></i><small>${t(value?'lampLit':'lampDark')}</small>`,mutation(id,i),value?'lit':'',`aria-label="${'ABCD'[i]} ${t(value?'lampLit':'lampDark')}" aria-pressed="${Boolean(value)}"`)).join('')}</div><p class="instrument-instruction">${t('lampsInstruction')}</p>`;
    if(id==='bridge')return `<div class="bridge-board">${v.map((value,i)=>button(`<span class="bridge-bulb"></span><small>${'ABC'[i%3]}${Math.floor(i/3)+1}</small>`,mutation(id,i),value?'lit':'',`aria-label="${'ABC'[i%3]}${Math.floor(i/3)+1} ${t(value?'lampLit':'lampDark')}" aria-pressed="${Boolean(value)}"`)).join('')}</div><p class="instrument-instruction">${t('bridgeInstruction')}</p>`;
    if(id==='mirrors') {
      const trace=traceLight(v);
      return `<div class="optical-bench"><span class="beam-source">→</span><span class="beam-target ${trace.success?'lit':''}">◇</span><div class="mirror-grid">${Array.from({length:25},(_,cell)=>{const n=MIRROR_CELLS.indexOf(cell);return n<0?'<span class="empty-mirror-cell"></span>':button(`<small>${roman[n]}</small><strong>${v[n]?'&#92;':'/'}</strong>`,mutation(id,n),'mirror-cell',`aria-label="${t('mirror')} ${roman[n]}"`);}).join('')}</div><svg class="beam-overlay" viewBox="-.5 -.5 6 6" aria-hidden="true"><polyline points="${trace.points.map(p=>p.join(',')).join(' ')}"/></svg></div><p class="puzzle-live-status" role="status">${t(trace.success?'lightReady':trace.loop?'lightLoop':'lightMiss')}</p><p class="instrument-instruction">${t('mirrorsInstruction')}</p>`;
    }
    if(id==='growth') {
      const climates=['climateSun','climateRain','climateMist'],glyphs=['☼','⋮','≋'],simulation=grow(v);
      return `<div class="climate-sequence">${v.map((n,i)=>button(`<small>0${i+1}</small><strong>${glyphs[n]}</strong><span>${t(climates[n])}</span>`,mutation(id,i),'climate-card',`aria-label="${t('growthDay')} ${i+1}: ${t(climates[n])}"`)).join('')}</div><p class="growth-target">${t('growthTarget')}</p><table class="growth-history"><thead><tr><th>${t('growthDay')}</th>${['growthRoot','growthLeaf','growthFlower'].map(k=>`<th>${t(k)}</th>`).join('')}</tr></thead><tbody>${simulation.history.map((row,i)=>`<tr><th>${i}</th>${row.map(n=>`<td>${n}</td>`).join('')}</tr>`).join('')}</tbody></table>${simulation.valid?'':`<p class="phase-warning">${t('growthInvalid')}</p>`}<p class="instrument-instruction">${t('growthInstruction')}</p>`;
    }
    if(id==='specimens')return `<div class="specimen-grid">${v.map((n,i)=>button(`<span>${n||'·'}</span>${i in SPECIMEN_GIVENS?'<i></i>':''}`,mutation(id,i),i in SPECIMEN_GIVENS?'fixed':'',`aria-label="${t('specimenCell')} ${Math.floor(i/4)+1},${i%4+1}: ${n||t('empty')}${i in SPECIMEN_GIVENS?' '+t('fixed'):''}" ${i in SPECIMEN_GIVENS?'disabled':''}`)).join('')}</div><p class="instrument-instruction">${t('specimensInstruction')}</p>`;
    if(id==='causality')return `<ol class="causal-list">${v.map((event,i)=>`<li><small>0${i+1}</small><span>${t(eventKeys[event])}</span><div>${button('↑',mutation(id,i,-1),'dial-turn',`aria-label="${t(eventKeys[event])} ${t('moveEarlier')}" ${i===0?'disabled':''}`)}${button('↓',mutation(id,i,1),'dial-turn',`aria-label="${t(eventKeys[event])} ${t('moveLater')}" ${i===4?'disabled':''}`)}</div></li>`).join('')}</ol><p class="instrument-instruction">${t('causalityInstruction')}</p>`;
    if(id==='shutters')return `<div class="shutter-comparison"><figure><figcaption>${t('overlay')}</figcaption>${smallGrid(overlayShutters(v))}</figure><span>→</span><figure><figcaption>${t('targetPattern')}</figcaption>${smallGrid(SHUTTER_TARGET)}</figure></div><div class="shutter-layers">${v.map((n,i)=>`<div><span>${t('shutter')} ${'ABC'[i]} · ${n*90}°</span>${smallGrid(rotateMask(SHUTTER_MASKS[i],n))}${button('↻',mutation(id,i),'dial-turn',`aria-label="${t('rotate')} ${'ABC'[i]}"`)}</div>`).join('')}</div><p class="instrument-instruction">${t('shuttersInstruction')}</p>`;
    if(id==='origin')return `<div class="origin-digits">${v.map((n,i)=>`<div><small>0${i+1}</small>${button('+',mutation(id,i),'dial-turn',`aria-label="${t('originSlot')} ${i+1} +"`)}<output>${n}</output>${button('−',mutation(id,i,-1),'dial-turn',`aria-label="${t('originSlot')} ${i+1} −"`)}</div>`).join('')}</div>${carried()}`;
    return '';
  }
  function puzzle(id) {
    if(!keys.includes(id))return '';
    const data=chapterPuzzles[id];
    if(progress.solved[id])return `<div class="calibration-success">${icon('check')}<span>${t('mechanismRestored')}</span></div><div class="body-copy">${prose(t(data.result))}</div>${button(t('returnExplore')+icon('arrow'),'close','primary')}`;
    const level=progress.hints[id];
    let hint=level?t(data.hints[level-1]):'';
    if(id==='bridge' && level===3) {const plan=bridgePlan(progress.puzzles.bridge);hint=plan.length?t('bridgeAdaptive')+plan.map(n=>`${'ABC'[n%3]}${Math.floor(n/3)+1}`).join(' · '):t('bridgeReady');}
    const locked=id==='origin' && (!progress.solved.causality || !progress.solved.shutters);
    return `<p class="puzzle-intro">${esc(t(data.intro))}</p>${locked?`<p class="phase-warning">${t('originLocked')}</p>`:`<fieldset class="instrument">${mechanism(id)}</fieldset><div class="puzzle-feedback" id="puzzle-feedback" role="status" aria-live="polite"></div><div class="puzzle-actions">${button(icon('reset')+t('resetPuzzle'),`chapter-reset:${id}`,'text-button')}${button(t('verifyMechanism')+icon('arrow'),`chapter-check:${id}`,'primary')}</div>`}<div class="hint-area">${level?`<p class="hint-copy"><span>${t('hintLevel')} ${level}/3</span>${esc(hint)}</p>`:''}${button(icon('help')+t(level===0?'hint':level===3?'lastHint':'nextHint'),`chapter-hint:${id}`,'text-button',level===3?'disabled':'')}</div><details class="evidence-peek" id="evidence-peek"><summary>${icon('book')}${t('relatedNotes')}<span>+</span></summary><div>${evidence()}</div></details>`;
  }
  function modal(type,id) {
    const eyebrow=`${chapter.numeral} / IV · ${esc(t(chapter.title))}`;
    if(type==='chapters')return {title:t('chapters'),eyebrow:'SILENT MERIDIAN / I — IV',content:chapterList(),cls:'chapters-modal'};
    if(type==='chapter-puzzle')return {title:label(id),eyebrow,content:puzzle(id),cls:`puzzle-modal ${id}-modal`};
    if(type==='chapter-notes') {const record=chapter.records[progress.phase==='echo'?1:0];return {title:t(record.slice(0,2)),eyebrow,content:`<div class="note-sheet">${prose(t(record.slice(2)))}<div class="note-stamp">${t('recorded')}${icon('check')}</div></div>${button(t('back')+icon('arrow'),'close','primary')}`,cls:'note-modal'};}
    if(type==='chapter-briefing')return {title:esc(t(chapter.title)),eyebrow,content:`<div class="body-copy">${prose(t(chapter.intro))}</div><p class="keyboard-guide">${t('chapterControls')}</p>${button(t('beginInvestigation')+icon('arrow'),'close','primary')}`,cls:''};
    if(type==='chapter-exit')return {title:t('chapterExit'),eyebrow,content:`<div class="body-copy"><p>${t(!ready?'chapterExitLocked':progress.phase==='echo'?'chapterEchoExit':'chapterPassageReady')}</p></div>${!ready?`<ul class="calibration-list">${keys.map(k=>`<li class="${progress.solved[k]?'complete':''}">${icon(progress.solved[k]?'check':'star')}${label(k)}</li>`).join('')}</ul>`:''}${ready?button(t(progress.phase==='echo'?'chapterToPresent':active===4?'finalPassage':'chapterExit')+icon('arrow'),progress.phase==='echo'?'shift':active===4?'chapter-final':'chapter-finish:continue','primary'):button(t('returnExplore'),'close','primary')}`,cls:''};
    if(type==='chapter-final')return {title:t('finalPassage'),eyebrow:'00:20 → 00:21',content:`<div class="body-copy">${prose(t('finalPassageBody'))}</div><div class="ending-choices">${button(t('finalCarry'),'chapter-finish:carry','primary')}${button(t('finalQuiet'),'chapter-finish:quiet','secondary')}</div>`,cls:''};
    return null;
  }
  function ending() {
    const last=active===4,carry=progress.choice==='carry';
    return `${scene('ending')}<div class="ending-shade"></div><header class="topbar">${logo()}${commonTools()}</header><main class="ending-content campaign-ending"><div class="eyebrow">${last?t('campaignFinished'):`${chapter.numeral} / IV · ${t('chapterComplete')}`}</div><div class="ending-clock">${last?'00:21':active===2?'00:19':'00:20'}</div><div class="line"></div><h1>${esc(last?t(carry?'endingCarryTitle':'endingQuietTitle'):t(chapter.endTitle))}</h1><div class="ending-copy">${prose(last?t(carry?'endingCarry':'endingQuiet'):t(chapter.endBody))}${last?`<p class="echo-callback">${t(state.ending==='keep'?'tapeKept':'tapeReleased')}</p>`:''}</div><div class="ending-actions">${button(t(last?'chapters':'nextChapter')+icon('arrow'),last?'chapters':`chapter-select:${active+1}`,'primary')}${button(t('reviewJournal')+icon('book'),'journal','text-button')}${button(t('chapterReturn'),'revisit','text-button')}</div></main>`;
  }
  return {scene,game,modal,journal,ending,carried};
}
