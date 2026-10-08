(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const hh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};const fh=([n,e,t])=>{const i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(e).forEach(r=>{i.setAttribute(r,String(e[r]))}),t?.length&&t.forEach(r=>{const s=fh(r);i.appendChild(s)}),i},jf=(n,e={})=>{const i={...hh,...e};return fh(["svg",i,n])};const ed=n=>{for(const e in n)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};const td=(...n)=>n.filter((e,t,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===t).join(" ").trim();const nd=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());const id=n=>{const e=nd(n);return e.charAt(0).toUpperCase()+e.slice(1)};const rd=n=>Array.from(n.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),Ec=n=>typeof n=="string"?n:!n||!n.class?"":n.class&&typeof n.class=="string"?n.class.split(" "):n.class&&Array.isArray(n.class)?n.class:"",Tc=(n,{nameAttr:e,icons:t,attrs:i})=>{const r=n.getAttribute(e);if(r==null)return;const s=id(r),a=t[s];if(!a)return console.warn(`${n.outerHTML} icon name was not found in the provided icons object.`);const o=rd(n),l=ed(o)?{}:{"aria-hidden":"true"},c={...hh,"data-lucide":r,...l,...i,...o},h=Ec(o),f=Ec(i),u=td("lucide",`lucide-${r}`,...h,...f);u&&Object.assign(c,{class:u});const d=jf(a,c);return n.parentNode?.replaceChild(d,n)};const sd=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];const ad=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];const od=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];const ld=[["path",{d:"M20 6 9 17l-5-5"}]];const cd=[["path",{d:"m6 9 6 6 6-6"}]];const ud=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];const hd=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}]];const fd=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]];const dd=[["path",{d:"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"}],["circle",{cx:"12",cy:"8",r:"2"}],["path",{d:"M12 10v12"}],["path",{d:"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"}],["path",{d:"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"}]];const pd=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}],["path",{d:"M9 3v18"}],["path",{d:"M15 3v18"}]];const md=[["path",{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]];const gd=[["path",{d:"M11 5h10"}],["path",{d:"M11 12h10"}],["path",{d:"M11 19h10"}],["path",{d:"M4 4h1v5"}],["path",{d:"M4 9h2"}],["path",{d:"M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02"}]];const _d=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];const vd=[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3"}]];const xd=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];const Md=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];const yd=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];const Sd=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}]];const bd=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]];const Ed=[["path",{d:"M14 17H5"}],["path",{d:"M19 7h-9"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]];const Td=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];const Ad=[["path",{d:"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"}],["path",{d:"M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"}],["path",{d:"M5 21h14"}]];const wd=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];const Pd=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18"}],["path",{d:"M4 22h16"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6"}]];const Rd=[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]];const Cd=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];const Dd=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];const Ld=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]];const Id=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];const dh=({icons:n={},nameAttr:e="data-lucide",attrs:t={},root:i=document,inTemplates:r}={})=>{if(!Object.values(n).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof i>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(i.querySelectorAll(`[${e}]`)).forEach(a=>Tc(a,{nameAttr:e,icons:n,attrs:t})),r&&Array.from(i.querySelectorAll("template")).forEach(o=>dh({icons:n,nameAttr:e,attrs:t,root:o.content,inTemplates:r})),e==="data-lucide"){const a=i.querySelectorAll("[icon-name]");a.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(a).forEach(o=>Tc(o,{nameAttr:"icon-name",icons:n,attrs:t})))}},ph="toy2game-library-v1";function Nd(){try{const n=JSON.parse(localStorage.getItem(ph)??"{}");return{favorites:Array.isArray(n?.favorites)?[...new Set(n.favorites.filter(e=>typeof e=="string"))]:[],recent:Array.isArray(n?.recent)?n.recent.filter(e=>typeof e?.id=="string"&&Number.isFinite(e?.playedAt)).slice(0,24):[]}}catch{return{favorites:[],recent:[]}}}function Ud(n){try{return localStorage.setItem(ph,JSON.stringify(n)),!0}catch{return!1}}function Od(n){const e=Nd();e.recent=[{id:n,playedAt:Date.now()},...e.recent.filter(t=>t.id!==n)].slice(0,24),Ud(e)}function Fd(n){return new URL("../../",new URL(n,window.location.origin)).pathname}const ml=["easy","normal","hard","perfect"],fr={easy:{label:"轻松",description:"记得少，容易漏看和忘记，轻松练一练。",capacity:6,attention:.6,mistake:.2},normal:{label:"普通",description:"记忆有限，偶尔会漏看或想错。",capacity:12,attention:.8,mistake:.12},hard:{label:"困难",description:"记得更多、更仔细，仍会遗忘和失误。",capacity:20,attention:.95,mistake:.04},perfect:{label:"完美记忆",description:"记住所有公开翻过的位置，不会记忆失误。",capacity:48,attention:1,mistake:0}},Mn=[{name:"薄荷队",color:"#79ac87",ink:"#426e51",pale:"#edf4e9",symbol:"sprout"},{name:"蜜桃队",color:"#df9789",ink:"#a25d50",pale:"#fcf0e8",symbol:"flower-2"},{name:"蓝莓队",color:"#8da8cf",ink:"#5b759c",pale:"#edf2fa",symbol:"cloud"},{name:"柠檬队",color:"#d6b44f",ink:"#9b7b29",pale:"#faf4dc",symbol:"sun"}];function Ir(n){const e=n&&typeof n=="object"?n:{},t=[2,3,4].includes(e.count)?e.count:2;return{count:t,pairs:e.pairs===12?12:24,bots:Array.from({length:t},(i,r)=>Array.isArray(e.bots)?e.bots[r]===!0:r===1),difficulty:ml.includes(e.difficulty)?e.difficulty:"normal"}}function mh(n){return Math.imul(n,1664525)+1013904223>>>0}function gh(n,e,t){let i=n^Math.imul(e+1,2654435769)^t;return i=Math.imul(i^i>>>16,569420461),i=Math.imul(i^i>>>15,1935289751),((i^i>>>15)>>>0)/4294967296}function Bd(n,e){const t=fr[n.settings.difficulty];n.settings.bots.forEach((i,r)=>{if(!i||gh(n.rng,r,2769414579)>=t.attention)return;const s=n.botMemories[r],a=s.findIndex(o=>o.id===e);a>=0&&s.splice(a,1),s.push({id:e,face:n.memory[e]}),s.length>t.capacity&&s.shift()})}function _h(n,e){n=Ir(n);let t=e>>>0;const i=Array.from({length:n.pairs*2},(r,s)=>Math.floor(s/2));for(let r=i.length-1;r>0;r--){t=mh(t);const s=Math.floor(t/4294967296*(r+1));[i[r],i[s]]=[i[s],i[r]]}return{settings:n,seed:e>>>0,rng:t,deck:i,owners:i.map(()=>-1),memory:i.map(()=>null),botMemories:Array.from({length:n.count},()=>[]),open:[],current:0,scores:Array(n.count).fill(0),phase:"first",attempts:0,last:"start",actions:[]}}function vh(n,e,t){return["human","bot"].includes(t)&&(n.phase==="first"||n.phase==="second")&&Number.isInteger(e)&&e>=0&&e<n.deck.length&&n.owners[e]===-1&&!n.open.includes(e)&&t==="bot"===n.settings.bots[n.current]}function xh(n,e,t){return vh(n,e,t)?(n.open.push(e),n.memory[e]=n.deck[e],n.rng=mh(n.rng),Bd(n,e),n.phase=n.open.length===2?"settling":"second",n.open.length===2&&n.attempts++,n.actions.push({type:"flip",id:e,actor:t}),!0):!1}function Mh(n){if(n.phase!=="settling"||n.open.length!==2)return!1;const[e,t]=n.open;return n.deck[e]===n.deck[t]?(n.owners[e]=n.owners[t]=n.current,n.scores[n.current]++,n.last="match",n.botMemories=n.botMemories.map(i=>i.filter(r=>r.id!==e&&r.id!==t))):(n.current=(n.current+1)%n.settings.count,n.last="miss"),n.open=[],n.phase=n.owners.every(i=>i>=0)?"finished":"first",n.actions.push({type:"settle"}),!0}function gl(n){if(n.phase!=="finished")return[];const e=Math.max(...n.scores);return n.scores.flatMap((t,i)=>t===e?[i]:[])}function zd(n){const e=n.memory.map(()=>null);for(const t of n.botMemories[n.current])e[t.id]=t.face;return{memory:e,available:n.owners.map((t,i)=>t<0&&!n.open.includes(i)),first:n.open.length?n.memory[n.open[0]]:null,rng:n.rng,mistake:gh(n.rng,n.current,1675113877)<fr[n.settings.difficulty].mistake}}function kd(n){const e=n.available.flatMap((r,s)=>r?[s]:[]);if(!e.length)return null;if(!n.mistake&&n.first!==null){const r=e.find(s=>n.memory[s]===n.first);if(r!==void 0)return r}else if(!n.mistake){const r=new Map;for(const s of e){const a=n.memory[s];if(a!==null){if(r.has(a))return r.get(a);r.set(a,s)}}}const t=e.filter(r=>n.memory[r]===null),i=!n.mistake&&t.length?t:e;return i[Math.floor(n.rng/4294967296*i.length)]}function Gd(n){if(!n||typeof n!="object")return null;const e=n,t=e.settings;if(![1,2].includes(e.version)||!t||![2,3,4].includes(t.count)||![12,24].includes(t.pairs)||!Array.isArray(t.bots)||t.bots.length!==t.count||!t.bots.every(r=>typeof r=="boolean")||(t.difficulty!==void 0||e.version===2)&&!ml.includes(t.difficulty)||!Number.isInteger(e.seed)||e.seed<0||e.seed>4294967295||!Array.isArray(e.actions)||e.actions.length>2e4)return null;const i=_h(Ir(t),e.seed);for(const r of e.actions){if(!r||typeof r!="object")return null;if(r.type==="flip"){if(!["human","bot"].includes(r.actor)||!xh(i,r.id,r.actor))return null}else if(r.type==="settle"){if(!Mh(i))return null}else return null}return i}const Vd=n=>({version:2,settings:n.settings,seed:n.seed,actions:n.actions});let Hd="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",Wd=(n=21)=>{let e="",t=n|0;for(;t-- >0;)e+=Hd[Math.random()*64|0];return e};function cn(n){for(var e=arguments.length,t=Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(r){return"'"+r+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function sr(n){return!!n&&!!n[jt]}function yi(n){var e;return!!n&&((function(t){if(!t||typeof t!="object")return!1;var i=Object.getPrototypeOf(t);if(i===null)return!0;var r=Object.hasOwnProperty.call(i,"constructor")&&i.constructor;return r===Object||typeof r=="function"&&Function.toString.call(r)===Qd})(n)||Array.isArray(n)||!!n[Ic]||!!(!((e=n.constructor)===null||e===void 0)&&e[Ic])||_l(n)||vl(n))}function Nr(n,e,t){t===void 0&&(t=!1),dr(n)===0?(t?Object.keys:bl)(n).forEach((function(i){t&&typeof i=="symbol"||e(i,n[i],n)})):n.forEach((function(i,r){return e(r,i,n)}))}function dr(n){var e=n[jt];return e?e.i>3?e.i-4:e.i:Array.isArray(n)?1:_l(n)?2:vl(n)?3:0}function ao(n,e){return dr(n)===2?n.has(e):Object.prototype.hasOwnProperty.call(n,e)}function Xd(n,e){return dr(n)===2?n.get(e):n[e]}function yh(n,e,t){var i=dr(n);i===2?n.set(e,t):i===3?n.add(t):n[e]=t}function qd(n,e){return n===e?n!==0||1/n==1/e:n!=n&&e!=e}function _l(n){return Kd&&n instanceof Map}function vl(n){return Jd&&n instanceof Set}function mi(n){return n.o||n.t}function xl(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var e=jd(n);delete e[jt];for(var t=bl(e),i=0;i<t.length;i++){var r=t[i],s=e[r];s.writable===!1&&(s.writable=!0,s.configurable=!0),(s.get||s.set)&&(e[r]={configurable:!0,writable:!0,enumerable:s.enumerable,value:n[r]})}return Object.create(Object.getPrototypeOf(n),e)}function Ml(n,e){return e===void 0&&(e=!1),yl(n)||sr(n)||!yi(n)||(dr(n)>1&&(n.set=n.add=n.clear=n.delete=Yd),Object.freeze(n),e&&Nr(n,(function(t,i){return Ml(i,!0)}),!0)),n}function Yd(){cn(2)}function yl(n){return n==null||typeof n!="object"||Object.isFrozen(n)}function Sn(n){var e=ep[n];return e||cn(18,n),e}function Ac(){return Ur}function da(n,e){e&&(Sn("Patches"),n.u=[],n.s=[],n.v=e)}function Bs(n){oo(n),n.p.forEach($d),n.p=null}function oo(n){n===Ur&&(Ur=n.l)}function wc(n){return Ur={p:[],l:Ur,h:n,m:!0,_:0}}function $d(n){var e=n[jt];e.i===0||e.i===1?e.j():e.g=!0}function pa(n,e){e._=e.p.length;var t=e.p[0],i=n!==void 0&&n!==t;return e.h.O||Sn("ES5").S(e,n,i),i?(t[jt].P&&(Bs(e),cn(4)),yi(n)&&(n=zs(e,n),e.l||ks(e,n)),e.u&&Sn("Patches").M(t[jt].t,n,e.u,e.s)):n=zs(e,t,[]),Bs(e),e.u&&e.v(e.u,e.s),n!==Sh?n:void 0}function zs(n,e,t){if(yl(e))return e;var i=e[jt];if(!i)return Nr(e,(function(o,l){return Pc(n,i,e,o,l,t)}),!0),e;if(i.A!==n)return e;if(!i.P)return ks(n,i.t,!0),i.t;if(!i.I){i.I=!0,i.A._--;var r=i.i===4||i.i===5?i.o=xl(i.k):i.o,s=r,a=!1;i.i===3&&(s=new Set(r),r.clear(),a=!0),Nr(s,(function(o,l){return Pc(n,i,r,o,l,t,a)})),ks(n,r,!1),t&&n.u&&Sn("Patches").N(i,t,n.u,n.s)}return i.o}function Pc(n,e,t,i,r,s,a){if(sr(r)){var o=zs(n,r,s&&e&&e.i!==3&&!ao(e.R,i)?s.concat(i):void 0);if(yh(t,i,o),!sr(o))return;n.m=!1}else a&&t.add(r);if(yi(r)&&!yl(r)){if(!n.h.D&&n._<1)return;zs(n,r),e&&e.A.l||ks(n,r)}}function ks(n,e,t){t===void 0&&(t=!1),!n.l&&n.h.D&&n.m&&Ml(e,t)}function ma(n,e){var t=n[jt];return(t?mi(t):n)[e]}function Rc(n,e){if(e in n)for(var t=Object.getPrototypeOf(n);t;){var i=Object.getOwnPropertyDescriptor(t,e);if(i)return i;t=Object.getPrototypeOf(t)}}function lo(n){n.P||(n.P=!0,n.l&&lo(n.l))}function ga(n){n.o||(n.o=xl(n.t))}function co(n,e,t){var i=_l(e)?Sn("MapSet").F(e,t):vl(e)?Sn("MapSet").T(e,t):n.O?(function(r,s){var a=Array.isArray(r),o={i:a?1:0,A:s?s.A:Ac(),P:!1,I:!1,R:{},l:s,t:r,k:null,o:null,j:null,C:!1},l=o,c=uo;a&&(l=[o],c=br);var h=Proxy.revocable(l,c),f=h.revoke,u=h.proxy;return o.k=u,o.j=f,u})(e,t):Sn("ES5").J(e,t);return(t?t.A:Ac()).p.push(i),i}function Zd(n){return sr(n)||cn(22,n),(function e(t){if(!yi(t))return t;var i,r=t[jt],s=dr(t);if(r){if(!r.P&&(r.i<4||!Sn("ES5").K(r)))return r.t;r.I=!0,i=Cc(t,s),r.I=!1}else i=Cc(t,s);return Nr(i,(function(a,o){r&&Xd(r.t,a)===o||yh(i,a,e(o))})),s===3?new Set(i):i})(n)}function Cc(n,e){switch(e){case 2:return new Map(n);case 3:return Array.from(n)}return xl(n)}var Dc,Ur,Sl=typeof Symbol<"u"&&typeof Symbol("x")=="symbol",Kd=typeof Map<"u",Jd=typeof Set<"u",Lc=typeof Proxy<"u"&&Proxy.revocable!==void 0&&typeof Reflect<"u",Sh=Sl?Symbol.for("immer-nothing"):((Dc={})["immer-nothing"]=!0,Dc),Ic=Sl?Symbol.for("immer-draftable"):"__$immer_draftable",jt=Sl?Symbol.for("immer-state"):"__$immer_state",Qd=""+Object.prototype.constructor,bl=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Object.getOwnPropertySymbols!==void 0?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,jd=Object.getOwnPropertyDescriptors||function(n){var e={};return bl(n).forEach((function(t){e[t]=Object.getOwnPropertyDescriptor(n,t)})),e},ep={},uo={get:function(n,e){if(e===jt)return n;var t=mi(n);if(!ao(t,e))return(function(r,s,a){var o,l=Rc(s,a);return l?"value"in l?l.value:(o=l.get)===null||o===void 0?void 0:o.call(r.k):void 0})(n,t,e);var i=t[e];return n.I||!yi(i)?i:i===ma(n.t,e)?(ga(n),n.o[e]=co(n.A.h,i,n)):i},has:function(n,e){return e in mi(n)},ownKeys:function(n){return Reflect.ownKeys(mi(n))},set:function(n,e,t){var i=Rc(mi(n),e);if(i?.set)return i.set.call(n.k,t),!0;if(!n.P){var r=ma(mi(n),e),s=r?.[jt];if(s&&s.t===t)return n.o[e]=t,n.R[e]=!1,!0;if(qd(t,r)&&(t!==void 0||ao(n.t,e)))return!0;ga(n),lo(n)}return n.o[e]===t&&(t!==void 0||e in n.o)||Number.isNaN(t)&&Number.isNaN(n.o[e])||(n.o[e]=t,n.R[e]=!0),!0},deleteProperty:function(n,e){return ma(n.t,e)!==void 0||e in n.t?(n.R[e]=!1,ga(n),lo(n)):delete n.R[e],n.o&&delete n.o[e],!0},getOwnPropertyDescriptor:function(n,e){var t=mi(n),i=Reflect.getOwnPropertyDescriptor(t,e);return i&&{writable:!0,configurable:n.i!==1||e!=="length",enumerable:i.enumerable,value:t[e]}},defineProperty:function(){cn(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){cn(12)}},br={};Nr(uo,(function(n,e){br[n]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}})),br.deleteProperty=function(n,e){return br.set.call(this,n,e,void 0)},br.set=function(n,e,t){return uo.set.call(this,n[0],e,t,n[0])};var tp=(function(){function n(t){var i=this;this.O=Lc,this.D=!0,this.produce=function(r,s,a){if(typeof r=="function"&&typeof s!="function"){var o=s;s=r;var l=i;return function(M){var m=this;M===void 0&&(M=o);for(var p=arguments.length,b=Array(p>1?p-1:0),S=1;S<p;S++)b[S-1]=arguments[S];return l.produce(M,(function(x){var w;return(w=s).call.apply(w,[m,x].concat(b))}))}}var c;if(typeof s!="function"&&cn(6),a!==void 0&&typeof a!="function"&&cn(7),yi(r)){var h=wc(i),f=co(i,r,void 0),u=!0;try{c=s(f),u=!1}finally{u?Bs(h):oo(h)}return typeof Promise<"u"&&c instanceof Promise?c.then((function(M){return da(h,a),pa(M,h)}),(function(M){throw Bs(h),M})):(da(h,a),pa(c,h))}if(!r||typeof r!="object"){if((c=s(r))===void 0&&(c=r),c===Sh&&(c=void 0),i.D&&Ml(c,!0),a){var d=[],g=[];Sn("Patches").M(r,c,d,g),a(d,g)}return c}cn(21,r)},this.produceWithPatches=function(r,s){if(typeof r=="function")return function(c){for(var h=arguments.length,f=Array(h>1?h-1:0),u=1;u<h;u++)f[u-1]=arguments[u];return i.produceWithPatches(c,(function(d){return r.apply(void 0,[d].concat(f))}))};var a,o,l=i.produce(r,s,(function(c,h){a=c,o=h}));return typeof Promise<"u"&&l instanceof Promise?l.then((function(c){return[c,a,o]})):[l,a,o]},typeof t?.useProxies=="boolean"&&this.setUseProxies(t.useProxies),typeof t?.autoFreeze=="boolean"&&this.setAutoFreeze(t.autoFreeze)}var e=n.prototype;return e.createDraft=function(t){yi(t)||cn(8),sr(t)&&(t=Zd(t));var i=wc(this),r=co(this,t,void 0);return r[jt].C=!0,oo(i),r},e.finishDraft=function(t,i){var r=t&&t[jt],s=r.A;return da(s,i),pa(void 0,s)},e.setAutoFreeze=function(t){this.D=t},e.setUseProxies=function(t){t&&!Lc&&cn(20),this.O=t},e.applyPatches=function(t,i){var r;for(r=i.length-1;r>=0;r--){var s=i[r];if(s.path.length===0&&s.op==="replace"){t=s.value;break}}r>-1&&(i=i.slice(r+1));var a=Sn("Patches").$;return sr(t)?a(t,i):this.produce(t,(function(o){return a(o,i)}))},n})(),en=new tp,np=en.produce;en.produceWithPatches.bind(en);en.setAutoFreeze.bind(en);en.setUseProxies.bind(en);en.applyPatches.bind(en);en.createDraft.bind(en);en.finishDraft.bind(en);class ip{constructor(e){const t=rp();this.c=1,this.s0=t(" "),this.s1=t(" "),this.s2=t(" "),this.s0-=t(e),this.s0<0&&(this.s0+=1),this.s1-=t(e),this.s1<0&&(this.s1+=1),this.s2-=t(e),this.s2<0&&(this.s2+=1)}next(){const e=2091639*this.s0+this.c*23283064365386963e-26;return this.s0=this.s1,this.s1=this.s2,this.s2=e-(this.c=Math.trunc(e))}}function rp(){let n=4022871197;return function(t){const i=t.toString();for(let r=0;r<i.length;r++){n+=i.charCodeAt(r);let s=.02519603282416938*n;n=s>>>0,s-=n,s*=n,n=s>>>0,s-=n,n+=s*4294967296}return(n>>>0)*23283064365386963e-26}}function Nc(n,e){return e.c=n.c,e.s0=n.s0,e.s1=n.s1,e.s2=n.s2,e}function sp(n,e){const t=new ip(n),i=t.next.bind(t);return e&&Nc(e,t),i.state=()=>Nc(t,{}),i}class Uc{constructor(e){this.state=e||{seed:"0"},this.used=!1}static seed(){return Date.now().toString(36).slice(-10)}isUsed(){return this.used}getState(){return this.state}_random(){this.used=!0;const e=this.state,t=e.prngstate?"":e.seed,i=sp(t,e.prngstate),r=i();return this.state={...e,prngstate:i.state()},r}api(){const e=this._random.bind(this),t={D4:4,D6:6,D8:8,D10:10,D12:12,D20:20},i={};for(const s in t){const a=t[s];i[s]=o=>o===void 0?Math.floor(e()*a)+1:Array.from({length:o}).map(()=>Math.floor(e()*a)+1)}function r(s=6,a){return a===void 0?Math.floor(e()*s)+1:Array.from({length:a}).map(()=>Math.floor(e()*s)+1)}return{...i,Die:r,Number:()=>e(),Shuffle:s=>{const a=[...s];let o=s.length,l=0;const c=Array.from({length:o});for(;o;){const h=Math.trunc(o*e());c[l++]=a[h],a[h]=a[--o]}return c},_private:this}}}const ap={name:"random",noClient:({api:n})=>n._private.isUsed(),flush:({api:n})=>n._private.getState(),api:({data:n})=>new Uc(n).api(),setup:({game:n})=>{let{seed:e}=n;return e===void 0&&(e=Uc.seed()),{seed:e}},playerView:()=>{}};var _a,Oc;function op(){if(Oc)return _a;Oc=1;var n="[object Object]";function e(u){var d=!1;if(u!=null&&typeof u.toString!="function")try{d=!!(u+"")}catch{}return d}function t(u,d){return function(g){return u(d(g))}}var i=Function.prototype,r=Object.prototype,s=i.toString,a=r.hasOwnProperty,o=s.call(Object),l=r.toString,c=t(Object.getPrototypeOf,Object);function h(u){return!!u&&typeof u=="object"}function f(u){if(!h(u)||l.call(u)!=n||e(u))return!1;var d=c(u);if(d===null)return!0;var g=a.call(d,"constructor")&&d.constructor;return typeof g=="function"&&g instanceof g&&s.call(g)==o}return _a=f,_a}op();const El="MAKE_MOVE",ta="GAME_EVENT",Tl="REDO",Al="RESET",wl="SYNC",Pl="UNDO",Rl="UPDATE",Cl="PATCH",bh="PLUGIN",na="STRIP_TRANSIENTS",lp=(n,e,t,i)=>({type:El,payload:{type:n,args:e,playerID:t,credentials:i}}),Rs=(n,e,t,i)=>({type:ta,payload:{type:n,args:e,playerID:t,credentials:i}}),Eh=(n,e,t,i)=>({type:ta,payload:{type:n,args:e,playerID:t,credentials:i},automatic:!0}),Th=n=>({type:wl,state:n.state,log:n.log,initialState:n.initialState,clientOnly:!0}),Ah=(n,e,t,i)=>({type:Cl,prevStateID:n,stateID:e,patch:t,deltalog:i,clientOnly:!0}),wh=(n,e)=>({type:Rl,state:n,deltalog:e,clientOnly:!0}),Ph=n=>({type:Al,state:n,clientOnly:!0}),Rh=(n,e)=>({type:Pl,payload:{type:null,args:null,playerID:n,credentials:e}}),Ch=(n,e)=>({type:Tl,payload:{type:null,args:null,playerID:n,credentials:e}}),cp=(n,e,t,i)=>({type:bh,payload:{type:n,args:e,playerID:t,credentials:i}}),Dh=()=>({type:na});var up=Object.freeze({__proto__:null,makeMove:lp,gameEvent:Rs,automaticGameEvent:Eh,sync:Th,patch:Ah,update:wh,reset:Ph,undo:Rh,redo:Ch,plugin:cp,stripTransients:Dh});const Or="INVALID_MOVE",hp={name:"plugin-immer",fnWrap:n=>(e,...t)=>{let i=!1;const r=np(e.G,s=>{const a=n({...e,G:s},...t);if(a===Or){i=!0;return}return a});return i?Or:r}};var Ot;(function(n){n.MOVE="MOVE",n.GAME_ON_END="GAME_ON_END",n.PHASE_ON_BEGIN="PHASE_ON_BEGIN",n.PHASE_ON_END="PHASE_ON_END",n.TURN_ON_BEGIN="TURN_ON_BEGIN",n.TURN_ON_MOVE="TURN_ON_MOVE",n.TURN_ON_END="TURN_ON_END"})(Ot||(Ot={}));var Nn;(function(n){n.CalledOutsideHook="Events must be called from moves or the `onBegin`, `onEnd`, and `onMove` hooks.\nThis error probably means you called an event from other game code, like an `endIf` trigger or one of the `turn.order` methods.",n.EndTurnInOnEnd="`endTurn` is disallowed in `onEnd` hooks — the turn is already ending.",n.MaxTurnEndings=`Maximum number of turn endings exceeded for this update.
This likely means game code is triggering an infinite loop.`,n.PhaseEventInOnEnd="`setPhase` & `endPhase` are disallowed in a phase’s `onEnd` hook — the phase is already ending.\nIf you’re trying to dynamically choose the next phase when a phase ends, use the phase’s `next` trigger.",n.StageEventInOnEnd="`setStage`, `endStage` & `setActivePlayers` are disallowed in `onEnd` hooks.",n.StageEventInPhaseBegin="`setStage`, `endStage` & `setActivePlayers` are disallowed in a phase’s `onBegin` hook.\nUse `setActivePlayers` in a `turn.onBegin` hook or declare stages with `turn.activePlayers` instead.",n.StageEventInTurnBegin="`setStage` & `endStage` are disallowed in `turn.onBegin`.\nUse `setActivePlayers` or declare stages with `turn.activePlayers` instead."})(Nn||(Nn={}));class fp{constructor(e,t,i){this.flow=e,this.playerID=i,this.dispatch=[],this.initialTurn=t.turn,this.updateTurnContext(t,void 0),this.maxEndedTurnsPerAction=t.numPlayers*100}api(){const e={_private:this};for(const t of this.flow.eventNames)e[t]=(...i)=>{this.dispatch.push({type:t,args:i,phase:this.currentPhase,turn:this.currentTurn,calledFrom:this.currentMethod,error:new Error("Events Plugin Error")})};return e}isUsed(){return this.dispatch.length>0}updateTurnContext(e,t){this.currentPhase=e.phase,this.currentTurn=e.turn,this.currentMethod=t}unsetCurrentMethod(){this.currentMethod=void 0}update(e){const t=e,i=({stack:r},s)=>({...t,plugins:{...t.plugins,events:{...t.plugins.events,data:{error:s+`
`+r}}}});e:for(let r=0;r<this.dispatch.length;r++){const s=this.dispatch[r],a=s.turn!==e.ctx.turn;if(this.currentTurn-this.initialTurn>=this.maxEndedTurnsPerAction)return i(s.error,Nn.MaxTurnEndings);if(s.calledFrom===void 0)return i(s.error,Nn.CalledOutsideHook);if(e.ctx.gameover)break e;switch(s.type){case"endStage":case"setStage":case"setActivePlayers":{switch(s.calledFrom){case Ot.TURN_ON_END:case Ot.PHASE_ON_END:return i(s.error,Nn.StageEventInOnEnd);case Ot.PHASE_ON_BEGIN:return i(s.error,Nn.StageEventInPhaseBegin);case Ot.TURN_ON_BEGIN:if(s.type==="setActivePlayers")break;return i(s.error,Nn.StageEventInTurnBegin)}if(a)continue e;break}case"endTurn":{if(s.calledFrom===Ot.TURN_ON_END||s.calledFrom===Ot.PHASE_ON_END)return i(s.error,Nn.EndTurnInOnEnd);if(a)continue e;break}case"endPhase":case"setPhase":{if(s.calledFrom===Ot.PHASE_ON_END)return i(s.error,Nn.PhaseEventInOnEnd);if(s.phase!==e.ctx.phase)continue e;break}}const l=Eh(s.type,s.args,this.playerID);e=this.flow.processEvent(e,l)}return e}}const Dl={name:"events",noClient:({api:n})=>n._private.isUsed(),isInvalid:({data:n})=>n.error||!1,fnWrap:(n,e)=>(t,...i)=>{const r=t.events;r&&r._private.updateTurnContext(t.ctx,e);const s=n(t,...i);return r&&r._private.unsetCurrentMethod(),s},dangerouslyFlushRawState:({state:n,api:e})=>e._private.update(n),api:({game:n,ctx:e,playerID:t})=>new fp(n.flow,e,t).api()},dp={name:"log",flush:()=>({}),api:({data:n})=>({setMetadata:e=>{n.metadata=e}}),setup:()=>({})},pp={name:"plugin-serializable",fnWrap:n=>(e,...t)=>n(e,...t)},mp=(...n)=>console.error(...n);function Mt(n){mp("ERROR:",n)}const Ll=[hp,ap,dp,pp],Yr=[...Ll,Dl],gp=(n,e,t)=>(t.game.plugins.filter(i=>i.action!==void 0).filter(i=>i.name===e.payload.type).forEach(i=>{const r=i.name,s=n.plugins[r]||{data:{}},a=i.action(s.data,e.payload);n={...n,plugins:{...n.plugins,[r]:{...s,data:a}}}}),n),ar=({plugins:n})=>Object.entries(n||{}).reduce((e,[t,{api:i}])=>(e[t]=i,e),{}),Lh=(n,e,t)=>[...Ll,...t,Dl].filter(i=>i.fnWrap!==void 0).reduce((i,{fnWrap:r})=>r(i,e),n),_p=(n,e)=>([...Yr,...e.game.plugins].filter(t=>t.setup!==void 0).forEach(t=>{const i=t.name,r=t.setup({G:n.G,ctx:n.ctx,game:e.game});n={...n,plugins:{...n.plugins,[i]:{data:r}}}}),n),ho=(n,e)=>([...Yr,...e.game.plugins].filter(t=>t.api!==void 0).forEach(t=>{const i=t.name,r=n.plugins[i]||{data:{}},s=t.api({G:n.G,ctx:n.ctx,data:r.data,game:e.game,playerID:e.playerID});n={...n,plugins:{...n.plugins,[i]:{...r,api:s}}}}),n),vp=(n,e)=>([...Ll,...e.game.plugins,Dl].reverse().forEach(t=>{const i=t.name,r=n.plugins[i]||{data:{}};if(t.flush){const s=t.flush({G:n.G,ctx:n.ctx,game:e.game,api:r.api,data:r.data});n={...n,plugins:{...n.plugins,[t.name]:{data:s}}}}else if(t.dangerouslyFlushRawState){n=t.dangerouslyFlushRawState({state:n,game:e.game,api:r.api,data:r.data});const s=n.plugins[i].data;n={...n,plugins:{...n.plugins,[t.name]:{data:s}}}}}),n),xp=(n,e)=>[...Yr,...e.game.plugins].filter(t=>t.noClient!==void 0).map(t=>{const i=t.name,r=n.plugins[i];return r?t.noClient({G:n.G,ctx:n.ctx,game:e.game,api:r.api,data:r.data}):!1}).includes(!0),Mp=(n,e)=>[...Yr,...e.game.plugins].filter(i=>i.isInvalid!==void 0).map(i=>{const{name:r}=i,s=n.plugins[r],a=i.isInvalid({G:n.G,ctx:n.ctx,game:e.game,data:s&&s.data});return a?{plugin:r,message:a}:!1}).find(i=>i)||!1,Ih=(n,e)=>{const t=vp(n,e),i=Mp(t,e);if(!i)return[t];const{plugin:r,message:s}=i;return Mt(`${r} plugin declared action invalid:
${s}`),[n,i]},yp=({G:n,ctx:e,plugins:t={}},{game:i,playerID:r})=>([...Yr,...i.plugins].forEach(({name:s,playerView:a})=>{if(!a)return;const{data:o}=t[s]||{data:{}},l=a({G:n,ctx:e,game:i,data:o,playerID:r});t={...t,[s]:{data:l}}}),t);function Gs(n,e=!1){n.moveLimit&&(e&&(n.minMoves=n.moveLimit),n.maxMoves=n.moveLimit,delete n.moveLimit)}function Vs(n,e){let t={},i=[],r=null,s={},a={};if(Array.isArray(e)){const l={};e.forEach(c=>l[c]=Hs.NULL),t=l}else{if(Gs(e),e.next&&(r=e.next),e.revert&&(i=[...n._prevActivePlayers,{activePlayers:n.activePlayers,_activePlayersMinMoves:n._activePlayersMinMoves,_activePlayersMaxMoves:n._activePlayersMaxMoves,_activePlayersNumMoves:n._activePlayersNumMoves}]),e.currentPlayer!==void 0&&es(t,s,a,n.currentPlayer,e.currentPlayer),e.others!==void 0)for(let l=0;l<n.playOrder.length;l++){const c=n.playOrder[l];c!==n.currentPlayer&&es(t,s,a,c,e.others)}if(e.all!==void 0)for(let l=0;l<n.playOrder.length;l++){const c=n.playOrder[l];es(t,s,a,c,e.all)}if(e.value)for(const l in e.value)es(t,s,a,l,e.value[l]);if(e.minMoves)for(const l in t)s[l]===void 0&&(s[l]=e.minMoves);if(e.maxMoves)for(const l in t)a[l]===void 0&&(a[l]=e.maxMoves)}Object.keys(t).length===0&&(t=null),Object.keys(s).length===0&&(s=null),Object.keys(a).length===0&&(a=null);const o={};for(const l in t)o[l]=0;return{...n,activePlayers:t,_activePlayersMinMoves:s,_activePlayersMaxMoves:a,_activePlayersNumMoves:o,_prevActivePlayers:i,_nextActivePlayers:r}}function Sp(n){let{activePlayers:e,_activePlayersMinMoves:t,_activePlayersMaxMoves:i,_activePlayersNumMoves:r,_prevActivePlayers:s,_nextActivePlayers:a}=n;if(e&&Object.keys(e).length===0)if(a)n=Vs(n,a),{activePlayers:e,_activePlayersMinMoves:t,_activePlayersMaxMoves:i,_activePlayersNumMoves:r,_prevActivePlayers:s}=n;else if(s.length>0){const o=s.length-1;({activePlayers:e,_activePlayersMinMoves:t,_activePlayersMaxMoves:i,_activePlayersNumMoves:r}=s[o]),s=s.slice(0,o)}else e=null,t=null,i=null;return{...n,activePlayers:e,_activePlayersMinMoves:t,_activePlayersMaxMoves:i,_activePlayersNumMoves:r,_prevActivePlayers:s}}function es(n,e,t,i,r){(typeof r!="object"||r===Hs.NULL)&&(r={stage:r}),r.stage!==void 0&&(Gs(r),n[i]=r.stage,r.minMoves&&(e[i]=r.minMoves),r.maxMoves&&(t[i]=r.maxMoves))}function fo(n,e){return n[e]+""}function bp(n,e){let{G:t,ctx:i}=n;const{numPlayers:r}=i,a={...ar(n),G:t,ctx:i},o=e.order;let l=[...Array.from({length:r})].map((u,d)=>d+"");o.playOrder!==void 0&&(l=o.playOrder(a));const c=o.first(a),h=typeof c;h!=="number"&&Mt(`invalid value returned by turn.order.first — expected number got ${h} “${c}”.`);const f=fo(l,c);return i={...i,currentPlayer:f,playOrderPos:c,playOrder:l},i=Vs(i,e.activePlayers||{}),i}function Ep(n,e,t,i){const r=t.order;let{G:s,ctx:a}=n,o=a.playOrderPos,l=!1;if(i&&i!==!0)typeof i!="object"&&Mt(`invalid argument to endTurn: ${i}`),Object.keys(i).forEach(c=>{switch(c){case"remove":e=fo(a.playOrder,o);break;case"next":o=a.playOrder.indexOf(i.next),e=i.next;break;default:Mt(`invalid argument to endTurn: ${c}`)}});else{const h={...ar(n),G:s,ctx:a},f=r.next(h),u=typeof f;f!==void 0&&u!=="number"&&Mt(`invalid value returned by turn.order.next — expected number or undefined got ${u} “${f}”.`),f===void 0?l=!0:(o=f,e=fo(a.playOrder,o))}return a={...a,playOrderPos:o,currentPlayer:e},{endPhase:l,ctx:a}}const Tp={DEFAULT:{first:({ctx:n})=>n.turn===0?n.playOrderPos:(n.playOrderPos+1)%n.playOrder.length,next:({ctx:n})=>(n.playOrderPos+1)%n.playOrder.length}},Hs={NULL:null};var va={},ui={},Fc;function Nh(){if(Fc)return ui;Fc=1,Object.defineProperty(ui,"__esModule",{value:!0}),ui.Pointer=void 0,ui.unescapeToken=n,ui.escapeToken=e;function n(i){return i.replace(/~1/g,"/").replace(/~0/g,"~")}function e(i){return i.replace(/~/g,"~0").replace(/\//g,"~1")}var t=(function(){function i(r){r===void 0&&(r=[""]),this.tokens=r}return i.fromJSON=function(r){var s=r.split("/").map(n);if(s[0]!=="")throw new Error("Invalid JSON Pointer: ".concat(r));return new i(s)},i.prototype.toString=function(){return this.tokens.map(e).join("/")},i.prototype.evaluate=function(r){for(var s=null,a="",o=r,l=1,c=this.tokens.length;l<c;l++)s=o,a=this.tokens[l],!(a=="__proto__"||a=="constructor"||a=="prototype")&&(o=(s||{})[a]);return{parent:s,key:a,value:o}},i.prototype.get=function(r){return this.evaluate(r).value},i.prototype.set=function(r,s){var a=this.evaluate(r);a.parent&&(a.parent[a.key]=s)},i.prototype.push=function(r){this.tokens.push(r)},i.prototype.add=function(r){var s=this.tokens.concat(String(r));return new i(s)},i.prototype.parent=function(){var r=this.tokens.length>1?this.tokens.slice(0,-1):[""];return new i(r)},i})();return ui.Pointer=t,ui}var Pt={},xa={},Bc;function Uh(){return Bc||(Bc=1,(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.hasOwnProperty=void 0,n.objectType=e,n.clone=i,n.hasOwnProperty=Object.prototype.hasOwnProperty;function e(r){return r===void 0?"undefined":r===null?"null":Array.isArray(r)?"array":typeof r}function t(r){return r!=null&&typeof r=="object"}function i(r){if(!t(r))return r;if(r.constructor==Array){for(var s=r.length,a=new Array(s),o=0;o<s;o++)a[o]=i(r[o]);return a}if(r.constructor==Date){var l=new Date(+r);return l}var c={};for(var h in r)n.hasOwnProperty.call(r,h)&&(c[h]=i(r[h]));return c}})(xa)),xa}var Pn={},zc;function Oh(){if(zc)return Pn;zc=1,Object.defineProperty(Pn,"__esModule",{value:!0}),Pn.isDestructive=e,Pn.subtract=t,Pn.intersection=i,Pn.diffArrays=l,Pn.diffObjects=c,Pn.diffAny=h;var n=Uh();function e(f){var u=f.op;return u==="remove"||u==="replace"||u==="copy"||u==="move"}function t(f,u){var d=[];for(var g in f)n.hasOwnProperty.call(f,g)&&f[g]!==void 0&&!(n.hasOwnProperty.call(u,g)&&u[g]!==void 0)&&d.push(g);return d}function i(f){for(var u=f.length,d={},g=0;g<u;g++){var M=f[g];for(var m in M)n.hasOwnProperty.call(M,m)&&M[m]!==void 0&&(d[m]=(d[m]||0)+1)}for(var m in d)d[m]<u&&delete d[m];return Object.keys(d)}function r(f,u){var d=[];for(var g in f)n.hasOwnProperty.call(f,g)&&f[g]!==void 0&&n.hasOwnProperty.call(u,g)&&u[g]!==void 0&&d.push(g);return d}function s(f){return f.op==="add"}function a(f){return f.op==="remove"}function o(f,u){return{operations:f.operations.concat(u),cost:f.cost+1}}function l(f,u,d,g){g===void 0&&(g=h);var M=Math.max(f.length,u.length),m=new Map([[0,{operations:[],cost:0}]]);function p(T,P){var v=T*(M+1)+P,E=m.get(v);if(E===void 0){if(T>0&&P>0&&!g(f[T-1],u[P-1],d.add(String(T-1))).length)E=p(T-1,P-1);else{var R=[];if(T>0){var C=p(T-1,P),N={op:"remove",index:T-1};R.push(o(C,N))}if(P>0){var Y=p(T,P-1),K={op:"add",index:T-1,value:u[P-1]};R.push(o(Y,K))}if(T>0&&P>0){var z=p(T-1,P-1),$={op:"replace",index:T-1,original:f[T-1],value:u[P-1]};R.push(o(z,$))}var k=R.sort(function(ie,se){return ie.cost-se.cost})[0];E=k}m.set(v,E)}return E}var b=isNaN(f.length)||f.length<=0?0:f.length,S=isNaN(u.length)||u.length<=0?0:u.length,x=p(b,S).operations,w=x.reduce(function(T,P){var v=T[0],E=T[1];if(s(P)){var R=P.index+1+E,C=R<b+E?String(R):"-",N={op:P.op,path:d.add(C).toString(),value:P.value};return[v.concat(N),E+1]}else if(a(P)){var N={op:P.op,path:d.add(String(P.index+E)).toString()};return[v.concat(N),E-1]}else{var Y=d.add(String(P.index+E)),K=g(P.original,P.value,Y);return[v.concat.apply(v,K),E]}},[[],0])[0];return w}function c(f,u,d,g){g===void 0&&(g=h);var M=[];return t(f,u).forEach(function(m){M.push({op:"remove",path:d.add(m).toString()})}),t(u,f).forEach(function(m){M.push({op:"add",path:d.add(m).toString(),value:u[m]})}),r(f,u).forEach(function(m){M.push.apply(M,g(f[m],u[m],d.add(m)))}),M}function h(f,u,d,g){if(g===void 0&&(g=h),f===u)return[];var M=(0,n.objectType)(f),m=(0,n.objectType)(u);return M=="array"&&m=="array"?l(f,u,d,g):M=="object"&&m=="object"?c(f,u,d,g):[{op:"replace",path:d.toString(),value:u}]}return Pn}var kc;function Ap(){if(kc)return Pt;kc=1;var n=Pt&&Pt.__extends||(function(){var m=function(p,b){return m=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(S,x){S.__proto__=x}||function(S,x){for(var w in x)Object.prototype.hasOwnProperty.call(x,w)&&(S[w]=x[w])},m(p,b)};return function(p,b){if(typeof b!="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");m(p,b);function S(){this.constructor=p}p.prototype=b===null?Object.create(b):(S.prototype=b.prototype,new S)}})();Object.defineProperty(Pt,"__esModule",{value:!0}),Pt.InvalidOperationError=Pt.TestError=Pt.MissingError=void 0,Pt.add=l,Pt.remove=c,Pt.replace=h,Pt.move=f,Pt.copy=u,Pt.test=d,Pt.apply=M;var e=Nh(),t=Uh(),i=Oh(),r=(function(m){n(p,m);function p(b){var S=m.call(this,"Value required at path: ".concat(b))||this;return S.path=b,S.name="MissingError",S}return p})(Error);Pt.MissingError=r;var s=(function(m){n(p,m);function p(b,S){var x=m.call(this,"Test failed: ".concat(b," != ").concat(S))||this;return x.actual=b,x.expected=S,x.name="TestError",x}return p})(Error);Pt.TestError=s;function a(m,p,b){if(Array.isArray(m))if(p=="-")m.push(b);else{var S=parseInt(p,10);m.splice(S,0,b)}else m[p]=b}function o(m,p){if(Array.isArray(m)){var b=parseInt(p,10);m.splice(b,1)}else delete m[p]}function l(m,p,b){var S=e.Pointer.fromJSON(p.path);if(b?.implicitArrayCreation&&S.tokens[S.tokens.length-1]==="-"){var x=S.parent().evaluate(m);x.value===void 0&&(0,t.objectType)(x.parent)==="object"&&(x.parent[x.key]=[])}var w=S.evaluate(m);return w.parent===void 0||w.parent===null?new r(p.path):b?.implicitArrayCreation&&w.key==="-"&&!Array.isArray(w.parent)?new r(p.path):(a(w.parent,w.key,(0,t.clone)(p.value)),null)}function c(m,p,b){var S=e.Pointer.fromJSON(p.path).evaluate(m);return S.parent===null?new r(p.path):S.value===void 0?new r(p.path):(o(S.parent,S.key),null)}function h(m,p,b){var S=e.Pointer.fromJSON(p.path).evaluate(m);if(S.parent===null)return new r(p.path);if(Array.isArray(S.parent)){if(parseInt(S.key,10)>=S.parent.length)return new r(p.path)}else if(S.value===void 0)return new r(p.path);return S.parent[S.key]=(0,t.clone)(p.value),null}function f(m,p,b){var S=e.Pointer.fromJSON(p.from),x=S.evaluate(m);if(x.value===void 0)return new r(p.from);var w=e.Pointer.fromJSON(p.path);if(S.tokens.length<w.tokens.length&&S.tokens.every(function(P,v){return P===w.tokens[v]}))return new r(p.path);var T=w.evaluate(m);return T.parent===void 0||T.parent===null?new r(p.path):(o(x.parent,x.key),a(T.parent,T.key,x.value),null)}function u(m,p,b){var S=e.Pointer.fromJSON(p.from).evaluate(m);if(S.value===void 0)return new r(p.from);var x=e.Pointer.fromJSON(p.path).evaluate(m);return x.parent===void 0||x.parent===null?new r(p.path):(a(x.parent,x.key,(0,t.clone)(S.value)),null)}function d(m,p,b){var S=e.Pointer.fromJSON(p.path).evaluate(m);return(0,i.diffAny)(S.value,p.value,new e.Pointer).length?new s(S.value,p.value):null}var g=(function(m){n(p,m);function p(b){var S=m.call(this,"Invalid operation: ".concat(b.op))||this;return S.operation=b,S.name="InvalidOperationError",S}return p})(Error);Pt.InvalidOperationError=g;function M(m,p,b){switch(p.op){case"add":return l(m,p,b);case"remove":return c(m,p);case"replace":return h(m,p);case"move":return f(m,p);case"copy":return u(m,p);case"test":return d(m,p)}return new g(p)}return Pt}var Gc;function wp(){return Gc||(Gc=1,(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.Pointer=void 0,n.applyPatch=r,n.createPatch=a,n.createTests=l;var e=Nh();Object.defineProperty(n,"Pointer",{enumerable:!0,get:function(){return e.Pointer}});var t=Ap(),i=Oh();function r(c,h,f){return h.map(function(u){return(0,t.apply)(c,u,f)})}function s(c){function h(f,u,d){var g=c(f,u,d);return Array.isArray(g)?g:(0,i.diffAny)(f,u,d,h)}return h}function a(c,h,f){var u=new e.Pointer;return(f?s(f):i.diffAny)(c,h,u)}function o(c,h){var f=e.Pointer.fromJSON(h).evaluate(c);if(f!==void 0)return{op:"test",path:h,value:f.value}}function l(c,h){var f=new Array;return h.filter(i.isDestructive).forEach(function(u){var d=o(c,u.path);if(d&&f.push(d),"from"in u){var g=o(c,u.from);g&&f.push(g)}}),f}})(va)),va}var Pp=wp();function Rp({moves:n,phases:e,endIf:t,onEnd:i,turn:r,events:s,plugins:a}){n===void 0&&(n={}),s===void 0&&(s={}),a===void 0&&(a=[]),e===void 0&&(e={}),t||(t=()=>{}),i||(i=({G:D})=>D),r||(r={});const o={...e};""in o&&Mt("cannot specify phase with empty name"),o[""]={};const l={},c=new Set;let h=null;Object.keys(n).forEach(D=>c.add(D));const f=(D,B)=>{const X=Lh(D,B,a);return Se=>{const le=ar(Se);return X({...le,G:Se.G,ctx:Se.ctx,playerID:Se.playerID})}},u=D=>B=>{const X=ar(B);return D({...X,G:B.G,ctx:B.ctx})},d={onEnd:f(i,Ot.GAME_ON_END),endIf:u(t)};for(const D in o){const B=o[D];if(B.start===!0&&(h=D),B.moves!==void 0)for(const X of Object.keys(B.moves))l[D+"."+X]=B.moves[X],c.add(X);B.endIf===void 0&&(B.endIf=()=>{}),B.onBegin===void 0&&(B.onBegin=({G:X})=>X),B.onEnd===void 0&&(B.onEnd=({G:X})=>X),B.turn===void 0&&(B.turn=r),B.turn.order===void 0&&(B.turn.order=Tp.DEFAULT),B.turn.onBegin===void 0&&(B.turn.onBegin=({G:X})=>X),B.turn.onEnd===void 0&&(B.turn.onEnd=({G:X})=>X),B.turn.endIf===void 0&&(B.turn.endIf=()=>!1),B.turn.onMove===void 0&&(B.turn.onMove=({G:X})=>X),B.turn.stages===void 0&&(B.turn.stages={}),Gs(B.turn,!0);for(const X in B.turn.stages){const le=B.turn.stages[X].moves||{};for(const G of Object.keys(le)){const ee=D+"."+X+"."+G;l[ee]=le[G],c.add(G)}}if(B.wrapped={onBegin:f(B.onBegin,Ot.PHASE_ON_BEGIN),onEnd:f(B.onEnd,Ot.PHASE_ON_END),endIf:u(B.endIf)},B.turn.wrapped={onMove:f(B.turn.onMove,Ot.TURN_ON_MOVE),onBegin:f(B.turn.onBegin,Ot.TURN_ON_BEGIN),onEnd:f(B.turn.onEnd,Ot.TURN_ON_END),endIf:u(B.turn.endIf)},typeof B.next!="function"){const{next:X}=B;B.next=()=>X||null}B.wrapped.next=u(B.next)}function g(D){return D.phase?o[D.phase]:o[""]}function M(D){return D}function m(D,B){const X=new Set,Se=new Set;for(let le=0;le<B.length;le++){const{fn:G,arg:ee,...j}=B[le];if(G===N){Se.clear();const Ee=D.ctx.phase;if(X.has(Ee)){const Ne={...D.ctx,phase:null};return{...D,ctx:Ne}}X.add(Ee)}const ue=[];if(D=G(D,{...j,arg:ee,next:ue}),G===C)break;const ae=v(D);if(ae){B.push({fn:C,arg:ae,turn:D.ctx.turn,phase:D.ctx.phase,automatic:!0});continue}const Re=E(D);if(Re){B.push({fn:N,arg:Re,turn:D.ctx.turn,phase:D.ctx.phase,automatic:!0});continue}if([M,T,P].includes(G)){const Ee=R(D);if(Ee){B.push({fn:Y,arg:Ee,turn:D.ctx.turn,phase:D.ctx.phase,automatic:!0});continue}}B.push(...ue)}return D}function p(D,{next:B}){return B.push({fn:b}),D}function b(D,{next:B}){let{G:X,ctx:Se}=D;return X=g(Se).wrapped.onBegin(D),B.push({fn:S}),{...D,G:X,ctx:Se}}function S(D,{currentPlayer:B}){let{ctx:X}=D;const Se=g(X);B?(X={...X,currentPlayer:B},Se.turn.activePlayers&&(X=Vs(X,Se.turn.activePlayers))):X=bp(D,Se.turn);const le=X.turn+1;X={...X,turn:le,numMoves:0,_prevActivePlayers:[]};const G=Se.turn.wrapped.onBegin({...D,ctx:X});return{...D,G,ctx:X,_undo:[],_redo:[]}}function x(D,{arg:B,next:X,phase:Se}){const le=g({phase:Se});let{ctx:G}=D;if(B&&B.next)if(B.next in o)G={...G,phase:B.next};else return Mt("invalid phase: "+B.next),D;else G={...G,phase:le.wrapped.next(D)||null};return D={...D,ctx:G},X.push({fn:b}),D}function w(D,{arg:B,currentPlayer:X,next:Se}){let{G:le,ctx:G}=D;const ee=g(G),{endPhase:j,ctx:ue}=Ep(D,X,ee.turn,B);return G=ue,D={...D,G:le,ctx:G},j?Se.push({fn:N,turn:G.turn,phase:G.phase}):Se.push({fn:S,currentPlayer:G.currentPlayer}),D}function T(D,{arg:B,playerID:X}){if((typeof B=="string"||B===Hs.NULL)&&(B={stage:B}),typeof B!="object")return D;Gs(B);let{ctx:Se}=D,{activePlayers:le,_activePlayersMinMoves:G,_activePlayersMaxMoves:ee,_activePlayersNumMoves:j}=Se;return B.stage!==void 0&&(le===null&&(le={}),le[X]=B.stage,j[X]=0,B.minMoves&&(G===null&&(G={}),G[X]=B.minMoves),B.maxMoves&&(ee===null&&(ee={}),ee[X]=B.maxMoves)),Se={...Se,activePlayers:le,_activePlayersMinMoves:G,_activePlayersMaxMoves:ee,_activePlayersNumMoves:j},{...D,ctx:Se}}function P(D,{arg:B}){return{...D,ctx:Vs(D.ctx,B)}}function v(D){return d.endIf(D)}function E(D){return g(D.ctx).wrapped.endIf(D)}function R(D){const B=g(D.ctx),X=D.ctx.numMoves||0;return B.turn.maxMoves&&X>=B.turn.maxMoves?!0:B.turn.wrapped.endIf(D)}function C(D,{arg:B,phase:X}){D=N(D,{}),B===void 0&&(B=!0),D={...D,ctx:{...D.ctx,gameover:B}};const Se=d.onEnd(D);return{...D,G:Se}}function N(D,{arg:B,next:X,turn:Se,automatic:le}){D=Y(D,{turn:Se,force:!0,automatic:!0});const{phase:G,turn:ee}=D.ctx;if(X&&X.push({fn:x,arg:B,phase:G}),G===null)return D;const ue=g(D.ctx).wrapped.onEnd(D),ae={...D.ctx,phase:null},Re=Rs("endPhase",B),{_stateID:Ee}=D,Ne={action:Re,_stateID:Ee,turn:ee,phase:G};le&&(Ne.automatic=!0);const ke=[...D.deltalog||[],Ne];return{...D,G:ue,ctx:ae,deltalog:ke}}function Y(D,{arg:B,next:X,turn:Se,force:le,automatic:G,playerID:ee}){if(Se!==D.ctx.turn)return D;const{currentPlayer:j,numMoves:ue,phase:ae,turn:Re}=D.ctx,Ee=g(D.ctx),Ne=ue||0;if(!le&&Ee.turn.minMoves&&Ne<Ee.turn.minMoves)return`${Ee.turn.minMoves}`,D;const ke=Ee.turn.wrapped.onEnd(D);X&&X.push({fn:w,arg:B,currentPlayer:j});let L={...D.ctx,activePlayers:null};if(B&&B.remove){ee=ee||j;const F=L.playOrder.filter(Z=>Z!=ee),V=L.playOrderPos>F.length-1?0:L.playOrderPos;if(L={...L,playOrder:F,playOrderPos:V},F.length===0)return X.push({fn:N,turn:Re,phase:ae}),D}const nt=Rs("endTurn",B),{_stateID:Ye}=D,A={action:nt,_stateID:Ye,turn:Re,phase:ae};G&&(A.automatic=!0);const _=[...D.deltalog||[],A];return{...D,G:ke,ctx:L,deltalog:_,_undo:[],_redo:[]}}function K(D,{arg:B,next:X,automatic:Se,playerID:le}){le=le||D.ctx.currentPlayer;let{ctx:G,_stateID:ee}=D,{activePlayers:j,_activePlayersNumMoves:ue,_activePlayersMinMoves:ae,_activePlayersMaxMoves:Re,phase:Ee,turn:Ne}=G;const ke=j!==null&&le in j,L=g(G);if(!B&&ke){const F=L.turn.stages[j[le]];F&&F.next&&(B=F.next)}if(X&&X.push({fn:T,arg:B,playerID:le}),!ke)return D;const nt=ue[le]||0;if(ae&&ae[le]&&nt<ae[le])return`${ae[le]}`,D;j={...j},delete j[le],ae&&(ae={...ae},delete ae[le]),Re&&(Re={...Re},delete Re[le]),G=Sp({...G,activePlayers:j,_activePlayersMinMoves:ae,_activePlayersMaxMoves:Re});const A={action:Rs("endStage",B),_stateID:ee,turn:Ne,phase:Ee};Se&&(A.automatic=!0);const _=[...D.deltalog||[],A];return{...D,ctx:G,deltalog:_}}function z(D,B,X){const Se=g(D),le=Se.turn.stages,{activePlayers:G}=D;if(G&&G[X]!==void 0&&G[X]!==Hs.NULL&&le[G[X]]!==void 0&&le[G[X]].moves!==void 0){const j=le[G[X]].moves;if(B in j)return j[B]}else if(Se.moves){if(B in Se.moves)return Se.moves[B]}else if(B in n)return n[B];return null}function $(D,B){const{playerID:X,type:Se}=B,{currentPlayer:le,activePlayers:G,_activePlayersMaxMoves:ee}=D.ctx,j=z(D.ctx,Se,X),ue=!j||typeof j=="function"||j.noLimit!==!0;let{numMoves:ae,_activePlayersNumMoves:Re}=D.ctx;ue&&(X===le&&ae++,G&&Re[X]++),D={...D,ctx:{...D.ctx,numMoves:ae,_activePlayersNumMoves:Re}},ee&&Re[X]>=ee[X]&&(D=K(D,{playerID:X,automatic:!0}));const Ne=g(D.ctx).turn.wrapped.onMove({...D,playerID:X});return D={...D,G:Ne},m(D,[{fn:M}])}function k(D,B,X){return m(D,[{fn:K,arg:X,playerID:B}])}function ie(D,B){return m(D,[{fn:K,playerID:B}])}function se(D,B,X){return m(D,[{fn:P,arg:X}])}function me(D,B,X){return m(D,[{fn:N,phase:D.ctx.phase,turn:D.ctx.turn,arg:{next:X}}])}function fe(D){return m(D,[{fn:N,phase:D.ctx.phase,turn:D.ctx.turn}])}function Pe(D,B,X){return m(D,[{fn:Y,turn:D.ctx.turn,phase:D.ctx.phase,arg:X}])}function qe(D,B,X){return m(D,[{fn:Y,turn:D.ctx.turn,phase:D.ctx.phase,force:!0,arg:X}])}function rt(D,B,X){return m(D,[{fn:C,turn:D.ctx.turn,phase:D.ctx.phase,arg:X}])}const Ke={endStage:ie,setStage:k,endTurn:Pe,pass:qe,endPhase:fe,setPhase:me,endGame:rt,setActivePlayers:se},Q=[];s.endTurn!==!1&&Q.push("endTurn"),s.pass!==!1&&Q.push("pass"),s.endPhase!==!1&&Q.push("endPhase"),s.setPhase!==!1&&Q.push("setPhase"),s.endGame!==!1&&Q.push("endGame"),s.setActivePlayers!==!1&&Q.push("setActivePlayers"),s.endStage!==!1&&Q.push("endStage"),s.setStage!==!1&&Q.push("setStage");function de(D,B){const{type:X,playerID:Se,args:le}=B.payload;return typeof Ke[X]!="function"?D:Ke[X](D,Se,...Array.isArray(le)?le:[le])}function oe(D,B,X){return B.activePlayers?X in B.activePlayers:B.currentPlayer===X}return{ctx:D=>({numPlayers:D,turn:0,currentPlayer:"0",playOrder:[...Array.from({length:D})].map((B,X)=>X+""),playOrderPos:0,phase:h,activePlayers:null}),init:D=>m(D,[{fn:p}]),isPlayerActive:oe,eventHandlers:Ke,eventNames:Object.keys(Ke),enabledEventNames:Q,moveMap:l,moveNames:[...c.values()],processMove:$,processEvent:de,getMove:z}}function Cp(n){return n.processMove!==void 0}function Il(n){if(Cp(n))return n;if(n.name===void 0&&(n.name="default"),n.deltaState===void 0&&(n.deltaState=!1),n.disableUndo===void 0&&(n.disableUndo=!1),n.setup===void 0&&(n.setup=()=>({})),n.moves===void 0&&(n.moves={}),n.playerView===void 0&&(n.playerView=({G:t})=>t),n.plugins===void 0&&(n.plugins=[]),n.plugins.forEach(t=>{if(t.name===void 0)throw new Error("Plugin missing name attribute");if(t.name.includes(" "))throw new Error(t.name+": Plugin name must not include spaces")}),n.name.includes(" "))throw new Error(n.name+": Game name must not include spaces");const e=Rp(n);return{...n,flow:e,moveNames:e.moveNames,pluginNames:n.plugins.map(t=>t.name),processMove:(t,i)=>{let r=e.getMove(t.ctx,i.type,i.playerID);if(Dp(r)&&(r=r.move),r instanceof Function){const s=Lh(r,Ot.MOVE,n.plugins);let a=[];i.args!==void 0&&(a=Array.isArray(i.args)?i.args:[i.args]);const o={...ar(t),G:t.G,ctx:t.ctx,playerID:i.playerID};return s(o,...a)}return Mt(`invalid move object: ${i.type}`),t.G}}}function Dp(n){return n instanceof Object&&n.move!==void 0}var po;(function(n){n.UnauthorizedAction="update/unauthorized_action",n.MatchNotFound="update/match_not_found",n.PatchFailed="update/patch_failed"})(po||(po={}));var Ut;(function(n){n.StaleStateId="action/stale_state_id",n.UnavailableMove="action/unavailable_move",n.InvalidMove="action/invalid_move",n.InactivePlayer="action/inactive_player",n.GameOver="action/gameover",n.ActionDisabled="action/action_disabled",n.ActionInvalid="action/action_invalid",n.PluginActionInvalid="action/plugin_invalid"})(Ut||(Ut={}));const ts=n=>n.payload.playerID!==null&&n.payload.playerID!==void 0,Lp=(n,e,t)=>{function i(s){return s.undoable!==void 0}function r(s){return s instanceof Function}return i(t)?r(t.undoable)?t.undoable({G:n,ctx:e}):t.undoable:!0};function Vc(n,e){if(e.game.disableUndo)return n;const t={G:n.G,ctx:n.ctx,plugins:n.plugins,playerID:e.action.payload.playerID||n.ctx.currentPlayer};return e.action.type==="MAKE_MOVE"&&(t.moveType=e.action.payload.type),{...n,_undo:[...n._undo,t],_redo:[]}}function Ma(n,e,t){const i={action:e,_stateID:n._stateID,turn:n.ctx.turn,phase:n.ctx.phase},r=n.plugins.log.data.metadata;return r!==void 0&&(i.metadata=r),typeof t=="object"&&t.redact===!0?i.redact=!0:typeof t=="object"&&t.redact instanceof Function&&(i.redact=t.redact({G:n.G,ctx:n.ctx})),{...n,deltalog:[i]}}function ya(n,e,t){const[i,r]=Ih(n,t);return r?[i,kt(e,Ut.PluginActionInvalid,r)]:[i]}function Fh(n){if(!n)return[null,void 0];const{transients:e,...t}=n;return[t,e]}function kt(n,e,t){return{...n,transients:{error:{type:e,payload:t}}}}const Ip=n=>e=>t=>{const i=e(t);if(t.type===na)return i;{const[,r]=Fh(n.getState());return typeof r<"u"?(n.dispatch(Dh()),{...i,transients:r}):i}};function Np({game:n,isClient:e}){return n=Il(n),(t=null,i)=>{let[r]=Fh(t);switch(i.type){case na:return r;case ta:{if(r={...r,deltalog:[]},e)return r;if(r.ctx.gameover!==void 0)return Mt("cannot call event after game end"),kt(r,Ut.GameOver);if(ts(i)&&!n.flow.isPlayerActive(r.G,r.ctx,i.payload.playerID))return Mt(`disallowed event: ${i.payload.type}`),kt(r,Ut.InactivePlayer);r=ho(r,{game:n,playerID:i.payload.playerID});let s=n.flow.processEvent(r,i),a;return[s,a]=ya(s,r,{game:n}),a||(s=Vc(s,{game:n,action:i}),{...s,_stateID:r._stateID+1})}case El:{const s=r={...r,deltalog:[]},a=n.flow.getMove(r.ctx,i.payload.type,i.payload.playerID||r.ctx.currentPlayer);if(a===null)return Mt(`disallowed move: ${i.payload.type}`),kt(r,Ut.UnavailableMove);if(e&&a.client===!1)return r;if(r.ctx.gameover!==void 0)return Mt("cannot make move after game end"),kt(r,Ut.GameOver);if(ts(i)&&!n.flow.isPlayerActive(r.G,r.ctx,i.payload.playerID))return Mt(`disallowed move: ${i.payload.type}`),kt(r,Ut.InactivePlayer);r=ho(r,{game:n,playerID:i.payload.playerID});const o=n.processMove(r,i.payload);if(o===Or)return Mt(`invalid move: ${i.payload.type} args: ${i.payload.args}`),kt(r,Ut.InvalidMove);const l={...r,G:o};if(e&&xp(l,{game:n}))return r;if(r=l,e){let h;return[r,h]=ya(r,s,{game:n}),h||{...r,_stateID:r._stateID+1}}r=Ma(r,i,a),r=n.flow.processMove(r,i.payload);let c;return[r,c]=ya(r,s,{game:n}),c||(r=Vc(r,{game:n,action:i}),{...r,_stateID:r._stateID+1})}case Al:case Rl:case wl:return i.state;case Pl:{if(r={...r,deltalog:[]},n.disableUndo)return Mt("Undo is not enabled"),kt(r,Ut.ActionDisabled);const{G:s,ctx:a,_undo:o,_redo:l,_stateID:c}=r;if(o.length<2)return Mt("No moves to undo"),kt(r,Ut.ActionInvalid);const h=o[o.length-1],f=o[o.length-2];if(ts(i)&&i.payload.playerID!==h.playerID)return Mt("Cannot undo other players' moves"),kt(r,Ut.ActionInvalid);if(h.moveType){const u=n.flow.getMove(f.ctx,h.moveType,h.playerID);if(!Lp(s,a,u))return Mt("Move cannot be undone"),kt(r,Ut.ActionInvalid)}return r=Ma(r,i),{...r,G:f.G,ctx:f.ctx,plugins:f.plugins,_stateID:c+1,_undo:o.slice(0,-1),_redo:[h,...l]}}case Tl:{if(r={...r,deltalog:[]},n.disableUndo)return Mt("Redo is not enabled"),kt(r,Ut.ActionDisabled);const{_undo:s,_redo:a,_stateID:o}=r;if(a.length===0)return Mt("No moves to redo"),kt(r,Ut.ActionInvalid);const l=a[0];return ts(i)&&i.payload.playerID!==l.playerID?(Mt("Cannot redo other players' moves"),kt(r,Ut.ActionInvalid)):(r=Ma(r,i),{...r,G:l.G,ctx:l.ctx,plugins:l.plugins,_stateID:o+1,_undo:[...s,l],_redo:a.slice(1)})}case bh:return gp(r,i,{game:n});case Cl:{const s=r,a=JSON.parse(JSON.stringify(s)),o=Pp.applyPatch(a,i.patch);return o.some(c=>c!==null)?(Mt(`Patch ${JSON.stringify(i.patch)} apply failed`),kt(s,po.PatchFailed,o)):a}default:return r}}}function Fr(n){"@babel/helpers - typeof";return Fr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Fr(n)}function Up(n,e){if(Fr(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e);if(Fr(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function Op(n){var e=Up(n,"string");return Fr(e)=="symbol"?e:e+""}function Fp(n,e,t){return(e=Op(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Hc(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function Wc(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Hc(Object(t),!0).forEach(function(i){Fp(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Hc(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function Kt(n){return"Minified Redux error #"+n+"; visit https://redux.js.org/Errors?code="+n+" for the full message or use the non-minified dev environment for full errors. "}var Xc=(function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"})(),qc=function(){return Math.random().toString(36).substring(7).split("").join(".")},Yc={INIT:"@@redux/INIT"+qc(),REPLACE:"@@redux/REPLACE"+qc()};function Bp(n){if(typeof n!="object"||n===null)return!1;for(var e=n;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(n)===e}function Bh(n,e,t){var i;if(typeof e=="function"&&typeof t=="function"||typeof t=="function"&&typeof arguments[3]=="function")throw new Error(Kt(0));if(typeof e=="function"&&typeof t>"u"&&(t=e,e=void 0),typeof t<"u"){if(typeof t!="function")throw new Error(Kt(1));return t(Bh)(n,e)}if(typeof n!="function")throw new Error(Kt(2));var r=n,s=e,a=[],o=a,l=!1;function c(){o===a&&(o=a.slice())}function h(){if(l)throw new Error(Kt(3));return s}function f(M){if(typeof M!="function")throw new Error(Kt(4));if(l)throw new Error(Kt(5));var m=!0;return c(),o.push(M),function(){if(m){if(l)throw new Error(Kt(6));m=!1,c();var b=o.indexOf(M);o.splice(b,1),a=null}}}function u(M){if(!Bp(M))throw new Error(Kt(7));if(typeof M.type>"u")throw new Error(Kt(8));if(l)throw new Error(Kt(9));try{l=!0,s=r(s,M)}finally{l=!1}for(var m=a=o,p=0;p<m.length;p++){var b=m[p];b()}return M}function d(M){if(typeof M!="function")throw new Error(Kt(10));r=M,u({type:Yc.REPLACE})}function g(){var M,m=f;return M={subscribe:function(b){if(typeof b!="object"||b===null)throw new Error(Kt(11));function S(){b.next&&b.next(h())}S();var x=m(S);return{unsubscribe:x}}},M[Xc]=function(){return this},M}return u({type:Yc.INIT}),i={dispatch:u,subscribe:f,getState:h,replaceReducer:d},i[Xc]=g,i}function zh(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return e.length===0?function(i){return i}:e.length===1?e[0]:e.reduce(function(i,r){return function(){return i(r.apply(void 0,arguments))}})}function zp(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return function(i){return function(){var r=i.apply(void 0,arguments),s=function(){throw new Error(Kt(15))},a={getState:r.getState,dispatch:function(){return s.apply(void 0,arguments)}},o=e.map(function(l){return l(a)});return s=zh.apply(void 0,o)(r.dispatch),Wc(Wc({},r),{},{dispatch:s})}}}function kp({game:n,numPlayers:e,setupData:t}){n=Il(n),e||(e=2);const i=n.flow.ctx(e);let r={G:{},ctx:i,plugins:{}};r=_p(r,{game:n}),r=ho(r,{game:n,playerID:void 0});const s=ar(r);r.G=n.setup({...s,ctx:r.ctx},t);let a={...r,_undo:[],_redo:[],_stateID:0};return a=n.flow.init(a),[a]=Ih(a,{game:n}),n.disableUndo||(a._undo=[{G:a.G,ctx:a.ctx,plugins:a.plugins}]),a}class Gp{constructor({transportDataCallback:e,gameName:t,playerID:i,matchID:r,credentials:s,numPlayers:a}){this.connectionStatusCallback=()=>{},this.isConnected=!1,this.transportDataCallback=e,this.gameName=t||"default",this.playerID=i||null,this.matchID=r||"default",this.credentials=s,this.numPlayers=a||2}subscribeToConnectionStatus(e){this.connectionStatusCallback=e}setConnectionStatus(e){this.isConnected=e,this.connectionStatusCallback()}notifyClient(e){this.transportDataCallback(e)}}class Vp extends Gp{connect(){}disconnect(){}sendAction(){}sendChatMessage(){}requestSync(){}updateCredentials(){}updateMatchID(){}updatePlayerID(){}}const Hp=n=>new Vp(n);class Wp{constructor(){this.debugPanel=null,this.currentClient=null,this.clients=new Map,this.subscribers=new Map}register(e){this.clients.set(e,e),this.mountDebug(e),this.notifySubscribers()}unregister(e){if(this.clients.delete(e),this.currentClient===e){this.unmountDebug();for(const[t]of this.clients){if(this.debugPanel)break;this.mountDebug(t)}}this.notifySubscribers()}subscribe(e){const t=Symbol();return this.subscribers.set(t,e),e(this.getState()),()=>{this.subscribers.delete(t)}}switchPlayerID(e){if(this.currentClient.multiplayer){for(const[t]of this.clients)if(t.playerID===e&&t.debugOpt!==!1&&t.multiplayer===this.currentClient.multiplayer){this.switchToClient(t);return}}this.currentClient.updatePlayerID(e),this.notifySubscribers()}switchToClient(e){e!==this.currentClient&&(this.unmountDebug(),this.mountDebug(e),this.notifySubscribers())}notifySubscribers(){const e=this.getState();this.subscribers.forEach(t=>{t(e)})}getState(){return{client:this.currentClient,debuggableClients:this.getDebuggableClients()}}getDebuggableClients(){return[...this.clients.values()].filter(e=>e.debugOpt!==!1)}mountDebug(e){if(e.debugOpt===!1||this.debugPanel!==null||typeof document>"u")return;let t,i=document.body;e.debugOpt&&e.debugOpt!==!0&&(t=e.debugOpt.impl||t,i=e.debugOpt.target||i),t&&(this.currentClient=e,this.debugPanel=new t({target:i,props:{clientManager:this}}))}unmountDebug(){this.debugPanel.$destroy(),this.debugPanel=null,this.currentClient=null}}const Xp=new Wp;function mo(n,e,t){return!t&&n==null&&(n=e.getState().ctx.currentPlayer),n}function Nl(n,e,t,i,r,s){const a={};for(const o of e)a[o]=(...l)=>{const c=up[n](o,l,mo(i,t,s),r);t.dispatch(c)};return a}const qp=Nl.bind(null,"makeMove"),Yp=Nl.bind(null,"gameEvent"),$p=Nl.bind(null,"plugin");class Zp{constructor({game:e,debug:t,numPlayers:i,multiplayer:r,matchID:s,playerID:a,credentials:o,enhancer:l}){this.game=Il(e),this.playerID=a,this.matchID=s||"default",this.credentials=o,this.multiplayer=r,this.debugOpt=t,this.manager=Xp,this.gameStateOverride=null,this.subscribers={},this._running=!1,this.reducer=Np({game:this.game,isClient:r!==void 0}),this.initialState=null,r||(this.initialState=kp({game:this.game,numPlayers:i})),this.reset=()=>{this.store.dispatch(Ph(this.initialState))},this.undo=()=>{const d=Rh(mo(this.playerID,this.store,this.multiplayer),this.credentials);this.store.dispatch(d)},this.redo=()=>{const d=Ch(mo(this.playerID,this.store,this.multiplayer),this.credentials);this.store.dispatch(d)},this.log=[];const u=zp(Ip,()=>d=>g=>{const M=d(g);return this.notifySubscribers(),M},d=>g=>M=>{const m=d.getState(),p=g(M);return!("clientOnly"in M)&&M.type!==na&&this.transport.sendAction(m,M),p},d=>g=>M=>{const m=g(M),p=d.getState();switch(M.type){case El:case ta:case Pl:case Tl:{const b=p.deltalog;this.log=[...this.log,...b];break}case Al:{this.log=[];break}case Cl:case Rl:{let b=-1;this.log.length>0&&(b=this.log[this.log.length-1]._stateID);let S=M.deltalog||[];S=S.filter(x=>x._stateID>b),this.log=[...this.log,...S];break}case wl:{this.initialState=M.initialState,this.log=M.log||[];break}}return m});l=l!==void 0?zh(u,l):u,this.store=Bh(this.reducer,this.initialState,l),r||(r=Hp),this.transport=r({transportDataCallback:d=>this.receiveTransportData(d),gameKey:e,game:this.game,matchID:s,playerID:a,credentials:o,gameName:this.game.name,numPlayers:i}),this.createDispatchers(),this.chatMessages=[],this.sendChatMessage=d=>{this.transport.sendChatMessage(this.matchID,{id:Wd(7),sender:this.playerID,payload:d})}}receiveMatchData(e){this.matchData=e,this.notifySubscribers()}receiveChatMessage(e){this.chatMessages=[...this.chatMessages,e],this.notifySubscribers()}receiveTransportData(e){const[t]=e.args;if(t===this.matchID)switch(e.type){case"sync":{const[,i]=e.args,r=Th(i);this.receiveMatchData(i.filteredMetadata),this.store.dispatch(r);break}case"update":{const[,i,r]=e.args,s=this.store.getState();if(i._stateID>=s._stateID){const a=wh(i,r);this.store.dispatch(a)}break}case"patch":{const[,i,r,s,a]=e.args,o=this.store.getState()._stateID;if(i!==o)break;const l=Ah(i,r,s,a);this.store.dispatch(l),this.store.getState()._stateID===o&&this.transport.requestSync();break}case"matchData":{const[,i]=e.args;this.receiveMatchData(i);break}case"chat":{const[,i]=e.args;this.receiveChatMessage(i);break}}}notifySubscribers(){Object.values(this.subscribers).forEach(e=>e(this.getState()))}overrideGameState(e){this.gameStateOverride=e,this.notifySubscribers()}start(){this.transport.connect(),this._running=!0,this.manager.register(this)}stop(){this.transport.disconnect(),this._running=!1,this.manager.unregister(this)}subscribe(e){const t=Object.keys(this.subscribers).length;return this.subscribers[t]=e,this.transport.subscribeToConnectionStatus(()=>this.notifySubscribers()),(this._running||!this.multiplayer)&&e(this.getState()),()=>{delete this.subscribers[t]}}getInitialState(){return this.initialState}getState(){let e=this.store.getState();if(this.gameStateOverride!==null&&(e=this.gameStateOverride),e===null)return e;let t=!0;const i=this.game.flow.isPlayerActive(e.G,e.ctx,this.playerID);return this.multiplayer&&!i&&(t=!1),!this.multiplayer&&this.playerID!==null&&this.playerID!==void 0&&!i&&(t=!1),e.ctx.gameover!==void 0&&(t=!1),this.multiplayer||(e={...e,G:this.game.playerView({G:e.G,ctx:e.ctx,playerID:this.playerID}),plugins:yp(e,this)}),{...e,log:this.log,isActive:t,isConnected:this.transport.isConnected}}createDispatchers(){this.moves=qp(this.game.moveNames,this.store,this.playerID,this.credentials,this.multiplayer),this.events=Yp(this.game.flow.enabledEventNames,this.store,this.playerID,this.credentials,this.multiplayer),this.plugins=$p(this.game.pluginNames,this.store,this.playerID,this.credentials,this.multiplayer)}updatePlayerID(e){this.playerID=e,this.createDispatchers(),this.transport.updatePlayerID(e),this.notifySubscribers()}updateMatchID(e){this.matchID=e,this.createDispatchers(),this.transport.updateMatchID(e),this.notifySubscribers()}updateCredentials(e){this.credentials=e,this.createDispatchers(),this.transport.updateCredentials(e),this.notifySubscribers()}}function Kp(n){return new Zp(n)}function Jp(n){return{name:"flip-match",minPlayers:2,maxPlayers:4,disableUndo:!0,setup:()=>structuredClone(n),moves:{flip:({G:e},t,i)=>{if(!xh(e,t,i))return Or},settle:({G:e})=>{if(!Mh(e))return Or}},endIf:({G:e})=>e.phase==="finished"?{winners:gl(e)}:void 0}}class kh{client;paused=!1;delay;disposed=!1;constructor(e,t=crypto.getRandomValues(new Uint32Array(1))[0],i){const r=i??_h(e,t);this.client=Kp({game:Jp(r),numPlayers:r.settings.count,debug:!1}),this.client.start(),this.delay=r.phase==="settling"?1.5:r.settings.bots[r.current]?.85:0}get state(){return this.client.getState().G}get isBot(){return this.state.settings.bots[this.state.current]}get ready(){return!this.paused&&!this.disposed&&this.delay<=0&&["first","second"].includes(this.state.phase)}get waiting(){return this.delay}flip(e,t="human"){return!this.ready||!vh(this.state,e,t)?!1:(this.client.moves.flip(e,t),this.delay=this.state.phase==="settling"?1.5:this.isBot?.85:.36,!0)}update(e){if(!(this.paused||this.disposed||this.state.phase==="finished"||!Number.isFinite(e)||e<0)&&(this.delay=Math.max(0,this.delay-Math.min(e,.05)),!(this.delay>0))){if(this.state.phase==="settling")this.client.moves.settle(),this.delay=this.isBot?.85:.38;else if(this.isBot){const t=kd(zd(this.state));t!==null&&this.flip(t,"bot")}}}dispose(){this.disposed=!0,this.client.stop()}}const Ul="185",tr={ROTATE:0,DOLLY:1,PAN:2},ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qp=0,$c=1,jp=2,Cs=1,Gh=2,Er=3,si=0,Ht=1,Un=2,Bn=0,nr=1,Zc=2,Kc=3,Jc=4,em=5,gi=100,tm=101,nm=102,im=103,rm=104,sm=200,am=201,om=202,lm=203,go=204,_o=205,cm=206,um=207,hm=208,fm=209,dm=210,pm=211,mm=212,gm=213,_m=214,vo=0,xo=1,Mo=2,or=3,yo=4,So=5,bo=6,Eo=7,Ol=0,vm=1,xm=2,bn=0,Vh=1,Hh=2,Wh=3,Xh=4,qh=5,Yh=6,Fl=7,$h=300,Si=301,lr=302,Sa=303,ba=304,ia=306,To=1e3,On=1001,Ao=1002,Dt=1003,Mm=1004,ns=1005,Ft=1006,Ea=1007,vi=1008,Qt=1009,Zh=1010,Kh=1011,Br=1012,Bl=1013,Tn=1014,hn=1015,kn=1016,zl=1017,kl=1018,zr=1020,Jh=35902,Qh=35899,jh=1021,ef=1022,fn=1023,Gn=1026,xi=1027,Gl=1028,Vl=1029,bi=1030,Hl=1031,Wl=1033,Ds=33776,Ls=33777,Is=33778,Ns=33779,wo=35840,Po=35841,Ro=35842,Co=35843,Do=36196,Lo=37492,Io=37496,No=37488,Uo=37489,Ws=37490,Oo=37491,Fo=37808,Bo=37809,zo=37810,ko=37811,Go=37812,Vo=37813,Ho=37814,Wo=37815,Xo=37816,qo=37817,Yo=37818,$o=37819,Zo=37820,Ko=37821,Jo=36492,Qo=36494,jo=36495,el=36283,tl=36284,Xs=36285,nl=36286,ym=3200,qs=0,Sm=1,jn="",Jt="srgb",Ys="srgb-linear",$s="linear",st="srgb",Ii=7680,Qc=519,bm=512,Em=513,Tm=514,Xl=515,Am=516,wm=517,ql=518,Pm=519,jc=35044,eu="300 es",yn=2e3,kr=2001;function Rm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Zs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Cm(){const n=Zs("canvas");return n.style.display="block",n}const tu={};function nu(...n){const e="THREE."+n.shift();console.log(e,...n)}function tf(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ve(...n){n=tf(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function je(...n){n=tf(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ir(...n){const e=n.join(" ");e in tu||(tu[e]=!0,Ve(...n))}function Dm(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Lm={[vo]:xo,[Mo]:bo,[yo]:Eo,[or]:So,[xo]:vo,[bo]:Mo,[Eo]:yo,[So]:or};class oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let iu=1234567;const wr=Math.PI/180,Gr=180/Math.PI;function wi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function Yl(n,e){return(n%e+e)%e}function Im(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Nm(n,e,t){return n!==e?(t-n)/(e-n):0}function Pr(n,e,t){return(1-t)*n+t*e}function Um(n,e,t,i){return Pr(n,e,1-Math.exp(-t*i))}function Om(n,e=1){return e-Math.abs(Yl(n,e*2)-e)}function Fm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Bm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function zm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function km(n,e){return n+Math.random()*(e-n)}function Gm(n){return n*(.5-Math.random())}function Vm(n){n!==void 0&&(iu=n);let e=iu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Hm(n){return n*wr}function Wm(n){return n*Gr}function Xm(n){return(n&n-1)===0&&n!==0}function qm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ym(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function $m(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),h=a((e+i)/2),f=s((e-i)/2),u=a((e-i)/2),d=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*h,l*f,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*f,o*c);break;case"ZXZ":n.set(l*f,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*d,o*c);break;case"YXY":n.set(l*d,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*d,o*h,o*c);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Gt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const il={DEG2RAD:wr,RAD2DEG:Gr,generateUUID:wi,clamp:Ze,euclideanModulo:Yl,mapLinear:Im,inverseLerp:Nm,lerp:Pr,damp:Um,pingpong:Om,smoothstep:Fm,smootherstep:Bm,randInt:zm,randFloat:km,randFloatSpread:Gm,seededRandom:Vm,degToRad:Hm,radToDeg:Wm,isPowerOfTwo:Xm,ceilPowerOfTwo:qm,floorPowerOfTwo:Ym,setQuaternionFromProperEuler:$m,normalize:Gt,denormalize:Ki},uc=class uc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};uc.prototype.isVector2=!0;let ce=uc;class ai{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],f=i[r+3],u=s[a+0],d=s[a+1],g=s[a+2],M=s[a+3];if(f!==M||l!==u||c!==d||h!==g){let m=l*u+c*d+h*g+f*M;m<0&&(u=-u,d=-d,g=-g,M=-M,m=-m);let p=1-o;if(m<.9995){const b=Math.acos(m),S=Math.sin(b);p=Math.sin(p*b)/S,o=Math.sin(o*b)/S,l=l*p+u*o,c=c*p+d*o,h=h*p+g*o,f=f*p+M*o}else{l=l*p+u*o,c=c*p+d*o,h=h*p+g*o,f=f*p+M*o;const b=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=b,c*=b,h*=b,f*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],f=s[a],u=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+h*f+l*d-c*u,e[t+1]=l*g+h*u+c*f-o*d,e[t+2]=c*g+h*d+o*u-l*f,e[t+3]=h*g-o*f-l*u-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),f=o(s/2),u=l(i/2),d=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],u=i+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const hc=class hc{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ru.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ru.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*h,this.y=i+l*h+o*c-s*f,this.z=r+l*f+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ta.copy(this).projectOnVector(e),this.sub(Ta)}reflect(e){return this.sub(Ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};hc.prototype.isVector3=!0;let I=hc;const Ta=new I,ru=new ai,fc=class fc{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],d=i[5],g=i[8],M=r[0],m=r[3],p=r[6],b=r[1],S=r[4],x=r[7],w=r[2],T=r[5],P=r[8];return s[0]=a*M+o*b+l*w,s[3]=a*m+o*S+l*T,s[6]=a*p+o*x+l*P,s[1]=c*M+h*b+f*w,s[4]=c*m+h*S+f*T,s[7]=c*p+h*x+f*P,s[2]=u*M+d*b+g*w,s[5]=u*m+d*S+g*T,s[8]=u*p+d*x+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,u=o*l-h*s,d=c*s-a*l,g=t*f+i*u+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=f*M,e[1]=(r*c-h*i)*M,e[2]=(o*i-r*a)*M,e[3]=u*M,e[4]=(h*t-r*l)*M,e[5]=(r*s-o*t)*M,e[6]=d*M,e[7]=(i*l-c*t)*M,e[8]=(a*t-i*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ir("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Aa.makeScale(e,t)),this}rotate(e){return ir("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Aa.makeRotation(-e)),this}translate(e,t){return ir("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};fc.prototype.isMatrix3=!0;let He=fc;const Aa=new He,su=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),au=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zm(){const n={enabled:!0,workingColorSpace:Ys,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===st&&(r.r=zn(r.r),r.g=zn(r.g),r.b=zn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(r.r=rr(r.r),r.g=rr(r.g),r.b=rr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===jn?$s:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ir("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ir("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ys]:{primaries:e,whitePoint:i,transfer:$s,toXYZ:su,fromXYZ:au,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Jt},outputColorSpaceConfig:{drawingBufferColorSpace:Jt}},[Jt]:{primaries:e,whitePoint:i,transfer:st,toXYZ:su,fromXYZ:au,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Jt}}}),n}const et=Zm();function zn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function rr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ni;class Km{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ni===void 0&&(Ni=Zs("canvas")),Ni.width=e.width,Ni.height=e.height;const r=Ni.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ni}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Zs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=zn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(zn(t[i]/255)*255):t[i]=zn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jm=0;class $l{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=wi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(wa(r[a].image)):s.push(wa(r[a]))}else s=wa(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function wa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Km.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let Qm=0;const Pa=new I;class Bt extends oi{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,i=On,r=On,s=Ft,a=vi,o=fn,l=Qt,c=Bt.DEFAULT_ANISOTROPY,h=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=wi(),this.name="",this.source=new $l(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Pa).x}get height(){return this.source.getSize(Pa).y}get depth(){return this.source.getSize(Pa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$h)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case To:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case Ao:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case To:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case Ao:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=$h;Bt.DEFAULT_ANISOTROPY=1;const dc=class dc{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,x=(d+1)/2,w=(p+1)/2,T=(h+u)/4,P=(f+M)/4,v=(g+m)/4;return S>x&&S>w?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=T/i,s=P/i):x>w?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=T/r,s=v/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=P/s,r=v/s),this.set(i,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(f-M)*(f-M)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-M)/b,this.z=(u-h)/b,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};dc.prototype.isVector4=!0;let mt=dc;class jm extends oi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Bt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ft,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new $l(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends jm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class nf extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class eg extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ea=class ea{constructor(e,t,i,r,s,a,o,l,c,h,f,u,d,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,h,f,u,d,g,M,m)}set(e,t,i,r,s,a,o,l,c,h,f,u,d,g,M,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ea().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Ui.setFromMatrixColumn(e,0).length(),s=1/Ui.setFromMatrixColumn(e,1).length(),a=1/Ui.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*h,d=a*f,g=o*h,M=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=u-M*c,t[9]=-o*l,t[2]=M-u*c,t[6]=g+d*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,d=l*f,g=c*h,M=c*f;t[0]=u+M*o,t[4]=g*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-g,t[6]=M+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,d=l*f,g=c*h,M=c*f;t[0]=u-M*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*h,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,d=a*f,g=o*h,M=o*f;t[0]=l*h,t[4]=g*c-d,t[8]=u*c+M,t[1]=l*f,t[5]=M*c+u,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,d=a*c,g=o*l,M=o*c;t[0]=l*h,t[4]=M-u*f,t[8]=g*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*f+g,t[10]=u-M*f}else if(e.order==="XZY"){const u=a*l,d=a*c,g=o*l,M=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=u*f+M,t[5]=a*h,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*h,t[10]=M*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tg,e,ng)}lookAt(e,t,i){const r=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),qn.crossVectors(i,$t),qn.lengthSq()===0&&(Math.abs(i.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),qn.crossVectors(i,$t)),qn.normalize(),is.crossVectors($t,qn),r[0]=qn.x,r[4]=is.x,r[8]=$t.x,r[1]=qn.y,r[5]=is.y,r[9]=$t.y,r[2]=qn.z,r[6]=is.z,r[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],d=i[13],g=i[2],M=i[6],m=i[10],p=i[14],b=i[3],S=i[7],x=i[11],w=i[15],T=r[0],P=r[4],v=r[8],E=r[12],R=r[1],C=r[5],N=r[9],Y=r[13],K=r[2],z=r[6],$=r[10],k=r[14],ie=r[3],se=r[7],me=r[11],fe=r[15];return s[0]=a*T+o*R+l*K+c*ie,s[4]=a*P+o*C+l*z+c*se,s[8]=a*v+o*N+l*$+c*me,s[12]=a*E+o*Y+l*k+c*fe,s[1]=h*T+f*R+u*K+d*ie,s[5]=h*P+f*C+u*z+d*se,s[9]=h*v+f*N+u*$+d*me,s[13]=h*E+f*Y+u*k+d*fe,s[2]=g*T+M*R+m*K+p*ie,s[6]=g*P+M*C+m*z+p*se,s[10]=g*v+M*N+m*$+p*me,s[14]=g*E+M*Y+m*k+p*fe,s[3]=b*T+S*R+x*K+w*ie,s[7]=b*P+S*C+x*z+w*se,s[11]=b*v+S*N+x*$+w*me,s[15]=b*E+S*Y+x*k+w*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],d=e[14],g=e[3],M=e[7],m=e[11],p=e[15],b=l*d-c*u,S=o*d-c*f,x=o*u-l*f,w=a*d-c*h,T=a*u-l*h,P=a*f-o*h;return t*(M*b-m*S+p*x)-i*(g*b-m*w+p*T)+r*(g*S-M*w+p*P)-s*(g*x-M*T+m*P)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-i*(s*h-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],d=e[11],g=e[12],M=e[13],m=e[14],p=e[15],b=t*o-i*a,S=t*l-r*a,x=t*c-s*a,w=i*l-r*o,T=i*c-s*o,P=r*c-s*l,v=h*M-f*g,E=h*m-u*g,R=h*p-d*g,C=f*m-u*M,N=f*p-d*M,Y=u*p-d*m,K=b*Y-S*N+x*C+w*R-T*E+P*v;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/K;return e[0]=(o*Y-l*N+c*C)*z,e[1]=(r*N-i*Y-s*C)*z,e[2]=(M*P-m*T+p*w)*z,e[3]=(u*T-f*P-d*w)*z,e[4]=(l*R-a*Y-c*E)*z,e[5]=(t*Y-r*R+s*E)*z,e[6]=(m*x-g*P-p*S)*z,e[7]=(h*P-u*x+d*S)*z,e[8]=(a*N-o*R+c*v)*z,e[9]=(i*R-t*N-s*v)*z,e[10]=(g*T-M*x+p*b)*z,e[11]=(f*x-h*T-d*b)*z,e[12]=(o*E-a*C-l*v)*z,e[13]=(t*C-i*E+r*v)*z,e[14]=(M*S-g*w-m*b)*z,e[15]=(h*w-f*S+u*b)*z,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,f=o+o,u=s*c,d=s*h,g=s*f,M=a*h,m=a*f,p=o*f,b=l*c,S=l*h,x=l*f,w=i.x,T=i.y,P=i.z;return r[0]=(1-(M+p))*w,r[1]=(d+x)*w,r[2]=(g-S)*w,r[3]=0,r[4]=(d-x)*T,r[5]=(1-(u+p))*T,r[6]=(m+b)*T,r[7]=0,r[8]=(g+S)*P,r[9]=(m-b)*P,r[10]=(1-(u+M))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Ui.set(r[0],r[1],r[2]).length();const o=Ui.set(r[4],r[5],r[6]).length(),l=Ui.set(r[8],r[9],r[10]).length();s<0&&(a=-a),an.copy(this);const c=1/a,h=1/o,f=1/l;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=h,an.elements[5]*=h,an.elements[6]*=h,an.elements[8]*=f,an.elements[9]*=f,an.elements[10]*=f,t.setFromRotationMatrix(an),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=yn,l=!1){const c=this.elements,h=2*s/(t-e),f=2*s/(i-r),u=(t+e)/(t-e),d=(i+r)/(i-r);let g,M;if(l)g=s/(a-s),M=a*s/(a-s);else if(o===yn)g=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===kr)g=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=yn,l=!1){const c=this.elements,h=2/(t-e),f=2/(i-r),u=-(t+e)/(t-e),d=-(i+r)/(i-r);let g,M;if(l)g=1/(a-s),M=a/(a-s);else if(o===yn)g=-2/(a-s),M=-(a+s)/(a-s);else if(o===kr)g=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};ea.prototype.isMatrix4=!0;let ut=ea;const Ui=new I,an=new ut,tg=new I(0,0,0),ng=new I(1,1,1),qn=new I,is=new I,$t=new I,ou=new ut,lu=new ai;class Vn{constructor(e=0,t=0,i=0,r=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],f=r[2],u=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ze(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ou.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ou,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return lu.setFromEuler(this),this.setFromQuaternion(lu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class Zl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ig=0;const cu=new I,Oi=new ai,Rn=new ut,rs=new I,mr=new I,rg=new I,sg=new ai,uu=new I(1,0,0),hu=new I(0,1,0),fu=new I(0,0,1),du={type:"added"},ag={type:"removed"},Fi={type:"childadded",child:null},Ra={type:"childremoved",child:null};class Ct extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new I,t=new Vn,i=new ai,r=new I(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ut},normalMatrix:{value:new He}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(uu,e)}rotateY(e){return this.rotateOnAxis(hu,e)}rotateZ(e){return this.rotateOnAxis(fu,e)}translateOnAxis(e,t){return cu.copy(e).applyQuaternion(this.quaternion),this.position.add(cu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(uu,e)}translateY(e){return this.translateOnAxis(hu,e)}translateZ(e){return this.translateOnAxis(fu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?rs.copy(e):rs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(mr,rs,this.up):Rn.lookAt(rs,mr,this.up),this.quaternion.setFromRotationMatrix(Rn),r&&(Rn.extractRotation(r.matrixWorld),Oi.setFromRotationMatrix(Rn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(du),Fi.child=e,this.dispatchEvent(Fi),Fi.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ag),Ra.child=e,this.dispatchEvent(Ra),Ra.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(du),Fi.child=e,this.dispatchEvent(Fi),Fi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,e,rg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,sg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ct.DEFAULT_UP=new I(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class xn extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const og={type:"move"};class Ca{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,i),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(og)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new xn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const rf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},ss={h:0,s:0,l:0};function Da(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=Yl(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Da(a,s,e+1/3),this.g=Da(a,s,e),this.b=Da(a,s,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=Jt){function i(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jt){const i=rf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zn(e.r),this.g=zn(e.g),this.b=zn(e.b),this}copyLinearToSRGB(e){return this.r=rr(e.r),this.g=rr(e.g),this.b=rr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jt){return et.workingToColorSpace(Nt.copy(this),e),Math.round(Ze(Nt.r*255,0,255))*65536+Math.round(Ze(Nt.g*255,0,255))*256+Math.round(Ze(Nt.b*255,0,255))}getHexString(e=Jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Nt.copy(this),t);const i=Nt.r,r=Nt.g,s=Nt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=Jt){et.workingToColorSpace(Nt.copy(this),e);const t=Nt.r,i=Nt.g,r=Nt.b;return e!==Jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Yn),this.setHSL(Yn.h+e,Yn.s+t,Yn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Yn),e.getHSL(ss);const i=Pr(Yn.h,ss.h,t),r=Pr(Yn.s,ss.s,t),s=Pr(Yn.l,ss.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new Qe;Qe.NAMES=rf;class sf extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const on=new I,Cn=new I,La=new I,Dn=new I,Bi=new I,zi=new I,pu=new I,Ia=new I,Na=new I,Ua=new I,Oa=new mt,Fa=new mt,Ba=new mt;class un{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),on.subVectors(e,t),r.cross(on);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){on.subVectors(r,t),Cn.subVectors(i,t),La.subVectors(e,t);const a=on.dot(on),o=on.dot(Cn),l=on.dot(La),c=Cn.dot(Cn),h=Cn.dot(La),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,d=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-d-g,g,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Oa.setScalar(0),Fa.setScalar(0),Ba.setScalar(0),Oa.fromBufferAttribute(e,t),Fa.fromBufferAttribute(e,i),Ba.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Oa,s.x),a.addScaledVector(Fa,s.y),a.addScaledVector(Ba,s.z),a}static isFrontFacing(e,t,i,r){return on.subVectors(i,t),Cn.subVectors(e,t),on.cross(Cn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),on.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Bi.subVectors(r,i),zi.subVectors(s,i),Ia.subVectors(e,i);const l=Bi.dot(Ia),c=zi.dot(Ia);if(l<=0&&c<=0)return t.copy(i);Na.subVectors(e,r);const h=Bi.dot(Na),f=zi.dot(Na);if(h>=0&&f<=h)return t.copy(r);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(Bi,a);Ua.subVectors(e,s);const d=Bi.dot(Ua),g=zi.dot(Ua);if(g>=0&&d<=g)return t.copy(s);const M=d*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(zi,o);const m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return pu.subVectors(s,r),o=(f-h)/(f-h+(d-g)),t.copy(r).addScaledVector(pu,o);const p=1/(m+M+u);return a=M*p,o=u*p,t.copy(i).addScaledVector(Bi,a).addScaledVector(zi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Pi{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ln):ln.fromBufferAttribute(s,a),ln.applyMatrix4(e.matrixWorld),this.expandByPoint(ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),as.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),as.copy(i.boundingBox)),as.applyMatrix4(e.matrixWorld),this.union(as)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ln),ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gr),os.subVectors(this.max,gr),ki.subVectors(e.a,gr),Gi.subVectors(e.b,gr),Vi.subVectors(e.c,gr),$n.subVectors(Gi,ki),Zn.subVectors(Vi,Gi),hi.subVectors(ki,Vi);let t=[0,-$n.z,$n.y,0,-Zn.z,Zn.y,0,-hi.z,hi.y,$n.z,0,-$n.x,Zn.z,0,-Zn.x,hi.z,0,-hi.x,-$n.y,$n.x,0,-Zn.y,Zn.x,0,-hi.y,hi.x,0];return!za(t,ki,Gi,Vi,os)||(t=[1,0,0,0,1,0,0,0,1],!za(t,ki,Gi,Vi,os))?!1:(ls.crossVectors($n,Zn),t=[ls.x,ls.y,ls.z],za(t,ki,Gi,Vi,os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ln=[new I,new I,new I,new I,new I,new I,new I,new I],ln=new I,as=new Pi,ki=new I,Gi=new I,Vi=new I,$n=new I,Zn=new I,hi=new I,gr=new I,os=new I,ls=new I,fi=new I;function za(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){fi.fromArray(n,s);const o=r.x*Math.abs(fi.x)+r.y*Math.abs(fi.y)+r.z*Math.abs(fi.z),l=e.dot(fi),c=t.dot(fi),h=i.dot(fi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Et=new I,cs=new ce;let lg=0;class sn extends oi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jc,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)cs.fromBufferAttribute(this,t),cs.applyMatrix3(e),this.setXY(t,cs.x,cs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Gt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),i=Gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),i=Gt(i,this.array),r=Gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),i=Gt(i,this.array),r=Gt(r,this.array),s=Gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class af extends sn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class of extends sn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class dt extends sn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const cg=new Pi,_r=new I,ka=new I;class $r{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):cg.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_r.subVectors(e,this.center);const t=_r.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(_r,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ka.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_r.copy(e.center).add(ka)),this.expandByPoint(_r.copy(e.center).sub(ka))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ug=0;const nn=new ut,Ga=new Ct,Hi=new I,Zt=new Pi,vr=new Pi,Rt=new I;class zt extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rm(e)?of:af)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,i){return nn.makeTranslation(e,t,i),this.applyMatrix4(nn),this}scale(e,t,i){return nn.makeScale(e,t,i),this.applyMatrix4(nn),this}lookAt(e){return Ga.lookAt(e),Ga.updateMatrix(),this.applyMatrix4(Ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new dt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Zt.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];vr.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(Zt.min,vr.min),Zt.expandByPoint(Rt),Rt.addVectors(Zt.max,vr.max),Zt.expandByPoint(Rt)):(Zt.expandByPoint(vr.min),Zt.expandByPoint(vr.max))}Zt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Rt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Rt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Rt.fromBufferAttribute(o,c),l&&(Hi.fromBufferAttribute(e,c),Rt.add(Hi)),r=Math.max(r,i.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new sn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new I,l[v]=new I;const c=new I,h=new I,f=new I,u=new ce,d=new ce,g=new ce,M=new I,m=new I;function p(v,E,R){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,E),f.fromBufferAttribute(i,R),u.fromBufferAttribute(s,v),d.fromBufferAttribute(s,E),g.fromBufferAttribute(s,R),h.sub(c),f.sub(c),d.sub(u),g.sub(u);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(C),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(C),o[v].add(M),o[E].add(M),o[R].add(M),l[v].add(m),l[E].add(m),l[R].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let v=0,E=b.length;v<E;++v){const R=b[v],C=R.start,N=R.count;for(let Y=C,K=C+N;Y<K;Y+=3)p(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const S=new I,x=new I,w=new I,T=new I;function P(v){w.fromBufferAttribute(r,v),T.copy(w);const E=o[v];S.copy(E),S.sub(w.multiplyScalar(w.dot(E))).normalize(),x.crossVectors(T,E);const C=x.dot(l[v])<0?-1:1;a.setXYZW(v,S.x,S.y,S.z,C)}for(let v=0,E=b.length;v<E;++v){const R=b[v],C=R.start,N=R.count;for(let Y=C,K=C+N;Y<K;Y+=3)P(e.getX(Y+0)),P(e.getX(Y+1)),P(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new sn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);const r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,h=new I,f=new I;if(e)for(let u=0,d=e.count;u<d;u+=3){const g=e.getX(u+0),M=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=t.count;u<d;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let d=0,g=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?d=l[M]*o.data.stride+o.offset:d=l[M]*h;for(let p=0;p<h;p++)u[g++]=c[d++]}return new sn(u,h,f)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],d=e(u,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const d=c[f];h.push(d.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],f=s[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let hg=0;class Ri extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hg++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=nr,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=go,this.blendDst=_o,this.blendEquation=gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==nr&&(i.blending=this.blending),this.side!==si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==go&&(i.blendSrc=this.blendSrc),this.blendDst!==_o&&(i.blendDst=this.blendDst),this.blendEquation!==gi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==or&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ce().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ce().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const In=new I,Va=new I,us=new I,Kn=new I,Ha=new I,hs=new I,Wa=new I;class Kl{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Va.copy(e).add(t).multiplyScalar(.5),us.copy(t).sub(e).normalize(),Kn.copy(this.origin).sub(Va);const s=e.distanceTo(t)*.5,a=-this.direction.dot(us),o=Kn.dot(this.direction),l=-Kn.dot(us),c=Kn.lengthSq(),h=Math.abs(1-a*a);let f,u,d,g;if(h>0)if(f=a*l-o,u=a*o-l,g=s*h,f>=0)if(u>=-g)if(u<=g){const M=1/h;f*=M,u*=M,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-s,-l),s),d=u*(u+2*l)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+u*(u+2*l)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Va).addScaledVector(us,u),d}intersectSphere(e,t){In.subVectors(e.center,this.origin);const i=In.dot(this.direction),r=In.dot(In)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,i,r,s){Ha.subVectors(t,e),hs.subVectors(i,e),Wa.crossVectors(Ha,hs);let a=this.direction.dot(Wa),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Kn.subVectors(this.origin,e);const l=o*this.direction.dot(hs.crossVectors(Kn,hs));if(l<0)return null;const c=o*this.direction.dot(Ha.cross(Kn));if(c<0||l+c>a)return null;const h=-o*Kn.dot(Wa);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jl extends Ri{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mu=new ut,di=new Kl,fs=new $r,gu=new I,ds=new I,ps=new I,ms=new I,Xa=new I,gs=new I,_u=new I,_s=new I;class yt extends Ct{constructor(e=new zt,t=new Jl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){gs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],f=s[l];h!==0&&(Xa.fromBufferAttribute(f,e),a?gs.addScaledVector(Xa,h):gs.addScaledVector(Xa.sub(t),h))}t.add(gs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fs.copy(i.boundingSphere),fs.applyMatrix4(s),di.copy(e.ray).recast(e.near),!(fs.containsPoint(di.origin)===!1&&(di.intersectSphere(fs,gu)===null||di.origin.distanceToSquared(gu)>(e.far-e.near)**2))&&(mu.copy(s).invert(),di.copy(e.ray).applyMatrix4(mu),!(i.boundingBox!==null&&di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,di)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=b,w=S;x<w;x+=3){const T=o.getX(x),P=o.getX(x+1),v=o.getX(x+2);r=vs(this,p,e,i,c,h,f,T,P,v),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),M=Math.min(o.count,d.start+d.count);for(let m=g,p=M;m<p;m+=3){const b=o.getX(m),S=o.getX(m+1),x=o.getX(m+2);r=vs(this,a,e,i,c,h,f,b,S,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=b,w=S;x<w;x+=3){const T=x,P=x+1,v=x+2;r=vs(this,p,e,i,c,h,f,T,P,v),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),M=Math.min(l.count,d.start+d.count);for(let m=g,p=M;m<p;m+=3){const b=m,S=m+1,x=m+2;r=vs(this,a,e,i,c,h,f,b,S,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function fg(n,e,t,i,r,s,a,o){let l;if(e.side===Ht?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===si,o),l===null)return null;_s.copy(o),_s.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(_s);return c<t.near||c>t.far?null:{distance:c,point:_s.clone(),object:n}}function vs(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ds),n.getVertexPosition(l,ps),n.getVertexPosition(c,ms);const h=fg(n,e,t,i,ds,ps,ms,_u);if(h){const f=new I;un.getBarycoord(_u,ds,ps,ms,f),r&&(h.uv=un.getInterpolatedAttribute(r,o,l,c,f,new ce)),s&&(h.uv1=un.getInterpolatedAttribute(s,o,l,c,f,new ce)),a&&(h.normal=un.getInterpolatedAttribute(a,o,l,c,f,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new I,materialIndex:0};un.getNormal(ds,ps,ms,u.normal),h.face=u,h.barycoord=f}return h}class lf extends Bt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Dt,h=Dt,f,u){super(null,a,o,l,c,h,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vu extends sn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Wi=new ut,xu=new ut,xs=[],Mu=new Pi,dg=new ut,xr=new yt,Mr=new $r;class pg extends yt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new vu(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,dg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Wi),Mu.copy(e.boundingBox).applyMatrix4(Wi),this.boundingBox.union(Mu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new $r),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Wi),Mr.copy(e.boundingSphere).applyMatrix4(Wi),this.boundingSphere.union(Mr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(xr.geometry=this.geometry,xr.material=this.material,xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mr.copy(this.boundingSphere),Mr.applyMatrix4(i),e.ray.intersectsSphere(Mr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Wi),xu.multiplyMatrices(i,Wi),xr.matrixWorld=xu,xr.raycast(e,xs);for(let a=0,o=xs.length;a<o;a++){const l=xs[a];l.instanceId=s,l.object=this,t.push(l)}xs.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new vu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new lf(new Float32Array(r*this.count),r,this.count,Gl,hn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const qa=new I,mg=new I,gg=new He;class Qn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=qa.subVectors(i,t).cross(mg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(qa),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||gg.getNormalMatrix(e),r=this.coplanarPoint(qa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new $r,_g=new ce(.5,.5),Ms=new I;class Ql{constructor(e=new Qn,t=new Qn,i=new Qn,r=new Qn,s=new Qn,a=new Qn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=yn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],f=s[5],u=s[6],d=s[7],g=s[8],M=s[9],m=s[10],p=s[11],b=s[12],S=s[13],x=s[14],w=s[15];if(r[0].setComponents(c-a,d-h,p-g,w-b).normalize(),r[1].setComponents(c+a,d+h,p+g,w+b).normalize(),r[2].setComponents(c+o,d+f,p+M,w+S).normalize(),r[3].setComponents(c-o,d-f,p-M,w-S).normalize(),i)r[4].setComponents(l,u,m,x).normalize(),r[5].setComponents(c-l,d-u,p-m,w-x).normalize();else if(r[4].setComponents(c-l,d-u,p-m,w-x).normalize(),t===yn)r[5].setComponents(c+l,d+u,p+m,w+x).normalize();else if(t===kr)r[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(e){pi.center.set(0,0,0);const t=_g.distanceTo(e.center);return pi.radius=.7071067811865476+t,pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ms.x=r.normal.x>0?e.max.x:e.min.x,Ms.y=r.normal.y>0?e.max.y:e.min.y,Ms.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ms)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cf extends Bt{constructor(e=[],t=Si,i,r,s,a,o,l,c,h){super(e,t,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vg extends Bt{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class cr extends Bt{constructor(e,t,i=Tn,r,s,a,o=Dt,l=Dt,c,h=Gn,f=1){if(h!==Gn&&h!==xi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $l(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xg extends cr{constructor(e,t=Tn,i=Si,r,s,a=Dt,o=Dt,l,c=Gn){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class uf extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ci extends zt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(f,2));function g(M,m,p,b,S,x,w,T,P,v,E){const R=x/P,C=w/v,N=x/2,Y=w/2,K=T/2,z=P+1,$=v+1;let k=0,ie=0;const se=new I;for(let me=0;me<$;me++){const fe=me*C-Y;for(let Pe=0;Pe<z;Pe++){const qe=Pe*R-N;se[M]=qe*b,se[m]=fe*S,se[p]=K,c.push(se.x,se.y,se.z),se[M]=0,se[m]=0,se[p]=T>0?1:-1,h.push(se.x,se.y,se.z),f.push(Pe/P),f.push(1-me/v),k+=1}}for(let me=0;me<v;me++)for(let fe=0;fe<P;fe++){const Pe=u+fe+z*me,qe=u+fe+z*(me+1),rt=u+(fe+1)+z*(me+1),Ke=u+(fe+1)+z*me;l.push(Pe,qe,Ke),l.push(qe,rt,Ke),ie+=6}o.addGroup(d,ie,E),d+=ie,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ks extends zt{constructor(e=1,t=1,i=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:r,heightSegments:s},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],h=t/2,f=Math.PI/2*e,u=t,d=2*f+u,g=i*2+s,M=r+1,m=new I,p=new I;for(let b=0;b<=g;b++){let S=0,x=0,w=0,T=0;if(b<=i){const E=b/i,R=E*Math.PI/2;x=-h-e*Math.cos(R),w=e*Math.sin(R),T=-e*Math.cos(R),S=E*f}else if(b<=i+s){const E=(b-i)/s;x=-h+E*t,w=e,T=0,S=f+E*u}else{const E=(b-i-s)/i,R=E*Math.PI/2;x=h+e*Math.sin(R),w=e*Math.cos(R),T=e*Math.sin(R),S=f+u+E*f}const P=Math.max(0,Math.min(1,S/d));let v=0;b===0?v=.5/r:b===g&&(v=-.5/r);for(let E=0;E<=r;E++){const R=E/r,C=R*Math.PI*2,N=Math.sin(C),Y=Math.cos(C);p.x=-w*Y,p.y=x,p.z=w*N,o.push(p.x,p.y,p.z),m.set(-w*Y,T,w*N),m.normalize(),l.push(m.x,m.y,m.z),c.push(R+v,P)}if(b>0){const E=(b-1)*M;for(let R=0;R<r;R++){const C=E+R,N=E+R+1,Y=b*M+R,K=b*M+R+1;a.push(C,N,Y),a.push(N,K,Y)}}}this.setIndex(a),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(l,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ks(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Js extends zt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new I,h=new ce;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){const d=i+f/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(o,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Rr extends zt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],f=[],u=[],d=[];let g=0;const M=[],m=i/2;let p=0;b(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new dt(f,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(d,2));function b(){const x=new I,w=new I;let T=0;const P=(t-e)/i;for(let v=0;v<=s;v++){const E=[],R=v/s,C=R*(t-e)+e;for(let N=0;N<=r;N++){const Y=N/r,K=Y*l+o,z=Math.sin(K),$=Math.cos(K);w.x=C*z,w.y=-R*i+m,w.z=C*$,f.push(w.x,w.y,w.z),x.set(z,P,$).normalize(),u.push(x.x,x.y,x.z),d.push(Y,1-R),E.push(g++)}M.push(E)}for(let v=0;v<r;v++)for(let E=0;E<s;E++){const R=M[E][v],C=M[E+1][v],N=M[E+1][v+1],Y=M[E][v+1];(e>0||E!==0)&&(h.push(R,C,Y),T+=3),(t>0||E!==s-1)&&(h.push(C,N,Y),T+=3)}c.addGroup(p,T,0),p+=T}function S(x){const w=g,T=new ce,P=new I;let v=0;const E=x===!0?e:t,R=x===!0?1:-1;for(let N=1;N<=r;N++)f.push(0,m*R,0),u.push(0,R,0),d.push(.5,.5),g++;const C=g;for(let N=0;N<=r;N++){const K=N/r*l+o,z=Math.cos(K),$=Math.sin(K);P.x=E*$,P.y=m*R,P.z=E*z,f.push(P.x,P.y,P.z),u.push(0,R,0),T.x=z*.5+.5,T.y=$*.5*R+.5,d.push(T.x,T.y),g++}for(let N=0;N<r;N++){const Y=w+N,K=C+N;x===!0?h.push(K,K+1,Y):h.push(K+1,K,Y),v+=3}c.addGroup(p,v,x===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ve("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const h=i[r],u=i[r+1]-h,d=(a-h)/u;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new ce:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new I,r=[],s=[],a=[],o=new I,l=new ut;for(let d=0;d<=e;d++){const g=d/e;r[d]=this.getTangentAt(g,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),f=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ze(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Ze(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class jl extends wn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ce){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Mg extends jl{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ec(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,f){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,r(a,o,u,d)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const yu=new I,Su=new I,Ya=new ec,$a=new ec,Za=new ec;class yg extends wn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new I){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=r[(o-1)%s]:(Su.subVectors(r[0],r[1]).add(r[0]),c=Su);const f=r[o%s],u=r[(o+1)%s];if(this.closed||o+2<s?h=r[(o+2)%s]:(yu.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=yu),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),d),M=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),Ya.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,M,m),$a.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,M,m),Za.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,M,m)}else this.curveType==="catmullrom"&&(Ya.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),$a.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Za.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return i.set(Ya.calc(l),$a.calc(l),Za.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function bu(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function Sg(n,e){const t=1-n;return t*t*e}function bg(n,e){return 2*(1-n)*n*e}function Eg(n,e){return n*n*e}function Cr(n,e,t,i){return Sg(n,e)+bg(n,t)+Eg(n,i)}function Tg(n,e){const t=1-n;return t*t*t*e}function Ag(n,e){const t=1-n;return 3*t*t*n*e}function wg(n,e){return 3*(1-n)*n*n*e}function Pg(n,e){return n*n*n*e}function Dr(n,e,t,i,r){return Tg(n,e)+Ag(n,t)+wg(n,i)+Pg(n,r)}class hf extends wn{constructor(e=new ce,t=new ce,i=new ce,r=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new ce){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Dr(e,r.x,s.x,a.x,o.x),Dr(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rg extends wn{constructor(e=new I,t=new I,i=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new I){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Dr(e,r.x,s.x,a.x,o.x),Dr(e,r.y,s.y,a.y,o.y),Dr(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ff extends wn{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cg extends wn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class df extends wn{constructor(e=new ce,t=new ce,i=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ce){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Cr(e,r.x,s.x,a.x),Cr(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dg extends wn{constructor(e=new I,t=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new I){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Cr(e,r.x,s.x,a.x),Cr(e,r.y,s.y,a.y),Cr(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pf extends wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return i.set(bu(o,l.x,c.x,h.x,f.x),bu(o,l.y,c.y,h.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new ce().fromArray(r))}return this}}var rl=Object.freeze({__proto__:null,ArcCurve:Mg,CatmullRomCurve3:yg,CubicBezierCurve:hf,CubicBezierCurve3:Rg,EllipseCurve:jl,LineCurve:ff,LineCurve3:Cg,QuadraticBezierCurve:df,QuadraticBezierCurve3:Dg,SplineCurve:pf});class Lg extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new rl[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new rl[r.type]().fromJSON(r))}return this}}class sl extends Lg{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new ff(this.currentPoint.clone(),new ce(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new df(this.currentPoint.clone(),new ce(e,t),new ce(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new hf(this.currentPoint.clone(),new ce(e,t),new ce(i,r),new ce(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new pf(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new jl(e,t,i,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Us extends sl{constructor(e){super(e),this.uuid=wi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new sl().fromJSON(r))}return this}}function Ig(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=mf(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Bg(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let h=o,f=l;for(let u=t;u<r;u+=t){const d=n[u],g=n[u+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>f&&(f=g)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return Vr(s,a,t,o,l,c,0),a}function mf(n,e,t,i,r){let s;if(r===Zg(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Eu(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Eu(a/i|0,n[a],n[a+1],s);return s&&ur(s,s.next)&&(Wr(s),s=s.next),s}function Ei(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ur(t,t.next)||gt(t.prev,t,t.next)===0)){if(Wr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Vr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&Hg(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Ug(n,i,r,s):Ng(n)){e.push(l.i,n.i,c.i),Wr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Og(Ei(n),e),Vr(n,e,t,i,r,s,2)):a===2&&Fg(n,e,t,i,r,s):Vr(Ei(n),e,t,i,r,s,1);break}}}function Ng(n){const e=n.prev,t=n,i=n.next;if(gt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,h=Math.min(r,s,a),f=Math.min(o,l,c),u=Math.max(r,s,a),d=Math.max(o,l,c);let g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=d&&Tr(r,o,s,l,a,c,g.x,g.y)&&gt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ug(n,e,t,i){const r=n.prev,s=n,a=n.next;if(gt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,h=r.y,f=s.y,u=a.y,d=Math.min(o,l,c),g=Math.min(h,f,u),M=Math.max(o,l,c),m=Math.max(h,f,u),p=al(d,g,e,t,i),b=al(M,m,e,t,i);let S=n.prevZ,x=n.nextZ;for(;S&&S.z>=p&&x&&x.z<=b;){if(S.x>=d&&S.x<=M&&S.y>=g&&S.y<=m&&S!==r&&S!==a&&Tr(o,h,l,f,c,u,S.x,S.y)&&gt(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=d&&x.x<=M&&x.y>=g&&x.y<=m&&x!==r&&x!==a&&Tr(o,h,l,f,c,u,x.x,x.y)&&gt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=M&&S.y>=g&&S.y<=m&&S!==r&&S!==a&&Tr(o,h,l,f,c,u,S.x,S.y)&&gt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=b;){if(x.x>=d&&x.x<=M&&x.y>=g&&x.y<=m&&x!==r&&x!==a&&Tr(o,h,l,f,c,u,x.x,x.y)&&gt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Og(n,e){let t=n;do{const i=t.prev,r=t.next.next;!ur(i,r)&&_f(i,t,t.next,r)&&Hr(i,r)&&Hr(r,i)&&(e.push(i.i,t.i,r.i),Wr(t),Wr(t.next),t=n=r),t=t.next}while(t!==n);return Ei(t)}function Fg(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qg(a,o)){let l=vf(a,o);a=Ei(a,a.next),l=Ei(l,l.next),Vr(a,e,t,i,r,s,0),Vr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Bg(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=mf(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Xg(c))}r.sort(zg);for(let s=0;s<r.length;s++)t=kg(r[s],t);return t}function zg(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function kg(n,e){const t=Gg(n,e);if(!t)return e;const i=vf(t,n);return Ei(i,i.next),Ei(t,t.next)}function Gg(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(ur(n,t))return t;do{if(ur(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&gf(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const f=Math.abs(r-t.y)/(i-t.x);Hr(t,n)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&Vg(a,t)))&&(a=t,h=f)}t=t.next}while(t!==o);return a}function Vg(n,e){return gt(n.prev,n,e.prev)<0&&gt(e.next,n,n.next)<0}function Hg(n,e,t,i){let r=n;do r.z===0&&(r.z=al(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Wg(r)}function Wg(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function al(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Xg(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function gf(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function Tr(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&gf(n,e,t,i,r,s,a,o)}function qg(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Yg(n,e)&&(Hr(n,e)&&Hr(e,n)&&$g(n,e)&&(gt(n.prev,n,e.prev)||gt(n,e.prev,e))||ur(n,e)&&gt(n.prev,n,n.next)>0&&gt(e.prev,e,e.next)>0)}function gt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ur(n,e){return n.x===e.x&&n.y===e.y}function _f(n,e,t,i){const r=Ss(gt(n,e,t)),s=Ss(gt(n,e,i)),a=Ss(gt(t,i,n)),o=Ss(gt(t,i,e));return!!(r!==s&&a!==o||r===0&&ys(n,t,e)||s===0&&ys(n,i,e)||a===0&&ys(t,n,i)||o===0&&ys(t,e,i))}function ys(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Ss(n){return n>0?1:n<0?-1:0}function Yg(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&_f(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Hr(n,e){return gt(n.prev,n,n.next)<0?gt(n,e,n.next)>=0&&gt(n,n.prev,e)>=0:gt(n,e,n.prev)<0||gt(n,n.next,e)<0}function $g(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function vf(n,e){const t=ol(n.i,n.x,n.y),i=ol(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Eu(n,e,t,i){const r=ol(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Wr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function ol(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Zg(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Kg{static triangulate(e,t,i=2){return Ig(e,t,i)}}class Qi{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Qi.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Tu(e),Au(i,e);let a=e.length;t.forEach(Tu);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Au(i,t[l]);const o=Kg.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Tu(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Au(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class tc extends zt{constructor(e=new Us([new ce(.5,.5),new ce(-.5,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new dt(r,3)),this.setAttribute("uv",new dt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,M=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:Jg;let S,x=!1,w,T,P,v;if(p){S=p.getSpacedPoints(h),x=!0,u=!1;const G=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(h,G),T=new I,P=new I,v=new I}u||(m=0,d=0,g=0,M=0);const E=o.extractPoints(c);let R=E.shape;const C=E.holes;if(!Qi.isClockWise(R)){R=R.reverse();for(let G=0,ee=C.length;G<ee;G++){const j=C[G];Qi.isClockWise(j)&&(C[G]=j.reverse())}}function Y(G){const j=10000000000000001e-36;let ue=G[0];for(let ae=1;ae<=G.length;ae++){const Re=ae%G.length,Ee=G[Re],Ne=Ee.x-ue.x,ke=Ee.y-ue.y,L=Ne*Ne+ke*ke,nt=Math.max(Math.abs(Ee.x),Math.abs(Ee.y),Math.abs(ue.x),Math.abs(ue.y)),Ye=j*nt*nt;if(L<=Ye){G.splice(Re,1),ae--;continue}ue=Ee}}Y(R),C.forEach(Y);const K=C.length,z=R;for(let G=0;G<K;G++){const ee=C[G];R=R.concat(ee)}function $(G,ee,j){return ee||je("ExtrudeGeometry: vec does not exist"),G.clone().addScaledVector(ee,j)}const k=R.length;function ie(G,ee,j){let ue,ae,Re;const Ee=G.x-ee.x,Ne=G.y-ee.y,ke=j.x-G.x,L=j.y-G.y,nt=Ee*Ee+Ne*Ne,Ye=Ee*L-Ne*ke;if(Math.abs(Ye)>Number.EPSILON){const A=Math.sqrt(nt),_=Math.sqrt(ke*ke+L*L),F=ee.x-Ne/A,V=ee.y+Ee/A,Z=j.x-L/_,he=j.y+ke/_,pe=((Z-F)*L-(he-V)*ke)/(Ee*L-Ne*ke);ue=F+Ee*pe-G.x,ae=V+Ne*pe-G.y;const J=ue*ue+ae*ae;if(J<=2)return new ce(ue,ae);Re=Math.sqrt(J/2)}else{let A=!1;Ee>Number.EPSILON?ke>Number.EPSILON&&(A=!0):Ee<-Number.EPSILON?ke<-Number.EPSILON&&(A=!0):Math.sign(Ne)===Math.sign(L)&&(A=!0),A?(ue=-Ne,ae=Ee,Re=Math.sqrt(nt)):(ue=Ee,ae=Ne,Re=Math.sqrt(nt/2))}return new ce(ue/Re,ae/Re)}const se=[];for(let G=0,ee=z.length,j=ee-1,ue=G+1;G<ee;G++,j++,ue++)j===ee&&(j=0),ue===ee&&(ue=0),se[G]=ie(z[G],z[j],z[ue]);const me=[];let fe,Pe=se.concat();for(let G=0,ee=K;G<ee;G++){const j=C[G];fe=[];for(let ue=0,ae=j.length,Re=ae-1,Ee=ue+1;ue<ae;ue++,Re++,Ee++)Re===ae&&(Re=0),Ee===ae&&(Ee=0),fe[ue]=ie(j[ue],j[Re],j[Ee]);me.push(fe),Pe=Pe.concat(fe)}let qe;if(m===0)qe=Qi.triangulateShape(z,C);else{const G=[],ee=[];for(let j=0;j<m;j++){const ue=j/m,ae=d*Math.cos(ue*Math.PI/2),Re=g*Math.sin(ue*Math.PI/2)+M;for(let Ee=0,Ne=z.length;Ee<Ne;Ee++){const ke=$(z[Ee],se[Ee],Re);D(ke.x,ke.y,-ae),ue===0&&G.push(ke)}for(let Ee=0,Ne=K;Ee<Ne;Ee++){const ke=C[Ee];fe=me[Ee];const L=[];for(let nt=0,Ye=ke.length;nt<Ye;nt++){const A=$(ke[nt],fe[nt],Re);D(A.x,A.y,-ae),ue===0&&L.push(A)}ue===0&&ee.push(L)}}qe=Qi.triangulateShape(G,ee)}const rt=qe.length,Ke=g+M;for(let G=0;G<k;G++){const ee=u?$(R[G],Pe[G],Ke):R[G];x?(P.copy(w.normals[0]).multiplyScalar(ee.x),T.copy(w.binormals[0]).multiplyScalar(ee.y),v.copy(S[0]).add(P).add(T),D(v.x,v.y,v.z)):D(ee.x,ee.y,0)}for(let G=1;G<=h;G++)for(let ee=0;ee<k;ee++){const j=u?$(R[ee],Pe[ee],Ke):R[ee];x?(P.copy(w.normals[G]).multiplyScalar(j.x),T.copy(w.binormals[G]).multiplyScalar(j.y),v.copy(S[G]).add(P).add(T),D(v.x,v.y,v.z)):D(j.x,j.y,f/h*G)}for(let G=m-1;G>=0;G--){const ee=G/m,j=d*Math.cos(ee*Math.PI/2),ue=g*Math.sin(ee*Math.PI/2)+M;for(let ae=0,Re=z.length;ae<Re;ae++){const Ee=$(z[ae],se[ae],ue);D(Ee.x,Ee.y,f+j)}for(let ae=0,Re=C.length;ae<Re;ae++){const Ee=C[ae];fe=me[ae];for(let Ne=0,ke=Ee.length;Ne<ke;Ne++){const L=$(Ee[Ne],fe[Ne],ue);x?D(L.x,L.y+S[h-1].y,S[h-1].x+j):D(L.x,L.y,f+j)}}}Q(),de();function Q(){const G=r.length/3;if(u){let ee=0,j=k*ee;for(let ue=0;ue<rt;ue++){const ae=qe[ue];B(ae[2]+j,ae[1]+j,ae[0]+j)}ee=h+m*2,j=k*ee;for(let ue=0;ue<rt;ue++){const ae=qe[ue];B(ae[0]+j,ae[1]+j,ae[2]+j)}}else{for(let ee=0;ee<rt;ee++){const j=qe[ee];B(j[2],j[1],j[0])}for(let ee=0;ee<rt;ee++){const j=qe[ee];B(j[0]+k*h,j[1]+k*h,j[2]+k*h)}}i.addGroup(G,r.length/3-G,0)}function de(){const G=r.length/3;let ee=0;oe(z,ee),ee+=z.length;for(let j=0,ue=C.length;j<ue;j++){const ae=C[j];oe(ae,ee),ee+=ae.length}i.addGroup(G,r.length/3-G,1)}function oe(G,ee){let j=G.length;for(;--j>=0;){const ue=j;let ae=j-1;ae<0&&(ae=G.length-1);for(let Re=0,Ee=h+m*2;Re<Ee;Re++){const Ne=k*Re,ke=k*(Re+1),L=ee+ue+Ne,nt=ee+ae+Ne,Ye=ee+ae+ke,A=ee+ue+ke;X(L,nt,Ye,A)}}}function D(G,ee,j){l.push(G),l.push(ee),l.push(j)}function B(G,ee,j){Se(G),Se(ee),Se(j);const ue=r.length/3,ae=b.generateTopUV(i,r,ue-3,ue-2,ue-1);le(ae[0]),le(ae[1]),le(ae[2])}function X(G,ee,j,ue){Se(G),Se(ee),Se(ue),Se(ee),Se(j),Se(ue);const ae=r.length/3,Re=b.generateSideWallUV(i,r,ae-6,ae-3,ae-2,ae-1);le(Re[0]),le(Re[1]),le(Re[3]),le(Re[1]),le(Re[2]),le(Re[3])}function Se(G){r.push(l[G*3+0]),r.push(l[G*3+1]),r.push(l[G*3+2])}function le(G){s.push(G.x),s.push(G.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Qg(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new rl[r.type]().fromJSON(r)),new tc(i,e.options)}}const Jg={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new ce(s,a),new ce(o,l),new ce(c,h)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],f=e[i*3+2],u=e[r*3],d=e[r*3+1],g=e[r*3+2],M=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ce(a,1-l),new ce(c,1-f),new ce(u,1-g),new ce(M,1-p)]:[new ce(o,1-l),new ce(h,1-f),new ce(d,1-g),new ce(m,1-p)]}};function Qg(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ti extends zt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,f=e/o,u=t/l,d=[],g=[],M=[],m=[];for(let p=0;p<h;p++){const b=p*u-a;for(let S=0;S<c;S++){const x=S*f-s;g.push(x,-b,0),M.push(0,0,1),m.push(S/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const S=b+c*p,x=b+c*(p+1),w=b+1+c*(p+1),T=b+1+c*p;d.push(S,x,T),d.push(x,w,T)}this.setIndex(d),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(M,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.width,e.height,e.widthSegments,e.heightSegments)}}class nc extends zt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new I,u=new I,d=[],g=[],M=[],m=[];for(let p=0;p<=i;p++){const b=[],S=p/i,x=a+S*o,w=e*Math.cos(x),T=Math.sqrt(e*e-w*w);let P=0;p===0&&a===0?P=.5/t:p===i&&l===Math.PI&&(P=-.5/t);for(let v=0;v<=t;v++){const E=v/t,R=r+E*s;f.x=-T*Math.cos(R),f.y=w,f.z=T*Math.sin(R),g.push(f.x,f.y,f.z),u.copy(f).normalize(),M.push(u.x,u.y,u.z),m.push(E+P,1-S),b.push(c++)}h.push(b)}for(let p=0;p<i;p++)for(let b=0;b<t;b++){const S=h[p][b+1],x=h[p][b],w=h[p+1][b],T=h[p+1][b+1];(p!==0||a>0)&&d.push(S,x,T),(p!==i-1||l<Math.PI)&&d.push(x,w,T)}this.setIndex(d),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(M,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Qs extends zt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);const l=[],c=[],h=[],f=[],u=new I,d=new I,g=new I;for(let M=0;M<=i;M++){const m=a+M/i*o;for(let p=0;p<=r;p++){const b=p/r*s;d.x=(e+t*Math.cos(m))*Math.cos(b),d.y=(e+t*Math.cos(m))*Math.sin(b),d.z=t*Math.sin(m),c.push(d.x,d.y,d.z),u.x=e*Math.cos(b),u.y=e*Math.sin(b),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),f.push(p/r),f.push(M/i)}}for(let M=1;M<=i;M++)for(let m=1;m<=r;m++){const p=(r+1)*M+m-1,b=(r+1)*(M-1)+m-1,S=(r+1)*(M-1)+m,x=(r+1)*M+m;l.push(p,b,x),l.push(b,S,x)}this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class jg extends Ri{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Qe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function hr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(wu(r))r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(wu(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Vt(n){const e={};for(let t=0;t<n.length;t++){const i=hr(n[t]);for(const r in i)e[r]=i[r]}return e}function wu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function e0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function xf(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const t0={clone:hr,merge:Vt};var n0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,i0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends Ri{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=n0,this.fragmentShader=i0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hr(e.uniforms),this.uniformsGroups=e0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Qe().setHex(r.value);break;case"v2":this.uniforms[i].value=new ce().fromArray(r.value);break;case"v3":this.uniforms[i].value=new I().fromArray(r.value);break;case"v4":this.uniforms[i].value=new mt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new He().fromArray(r.value);break;case"m4":this.uniforms[i].value=new ut().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class r0 extends An{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ji extends Ri{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qs,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class s0 extends Ri{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qs,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Ol,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class a0 extends Ri{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ym,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class o0 extends Ri{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ic extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class l0 extends ic{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ka=new ut,Pu=new I,Ru=new I;class Mf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ql,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Pu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pu),Ru.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ru),t.updateMatrixWorld(),Ka.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ka,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===kr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ka)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const bs=new I,Es=new ai,gn=new I;class yf extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(bs,Es,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bs,Es,gn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(bs,Es,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bs,Es,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new I,Cu=new ce,Du=new ce;class rn extends yf{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gr*2*Math.atan(Math.tan(wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z)}getViewSize(e,t){return this.getViewBounds(e,Cu,Du),t.subVectors(Du,Cu)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(wr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class c0 extends Mf{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0}}class u0 extends ic{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new c0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ra extends yf{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class h0 extends Mf{constructor(){super(new ra(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ja extends ic{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new h0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Xi=-90,qi=1;class f0 extends Ct{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new rn(Xi,qi,e,t);r.layers=this.layers,this.add(r);const s=new rn(Xi,qi,e,t);s.layers=this.layers,this.add(s);const a=new rn(Xi,qi,e,t);a.layers=this.layers,this.add(a);const o=new rn(Xi,qi,e,t);o.layers=this.layers,this.add(o);const l=new rn(Xi,qi,e,t);l.layers=this.layers,this.add(l);const c=new rn(Xi,qi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===yn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===kr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class d0 extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Lu=new ut;class p0{constructor(e,t,i=0,r=1/0){this.ray=new Kl(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Zl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Lu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Lu),this}intersectObject(e,t=!0,i=[]){return ll(e,this,i,t),i.sort(Iu),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)ll(e[r],this,i,t);return i.sort(Iu),i}}function Iu(n,e){return n.distance-e.distance}function ll(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)ll(s[a],e,t,!0)}}class Nu{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const pc=class pc{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};pc.prototype.isMatrix2=!0;let Uu=pc;class m0 extends oi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ve("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Ou(n,e,t,i){const r=g0(i);switch(t){case jh:return n*e;case Gl:return n*e/r.components*r.byteLength;case Vl:return n*e/r.components*r.byteLength;case bi:return n*e*2/r.components*r.byteLength;case Hl:return n*e*2/r.components*r.byteLength;case ef:return n*e*3/r.components*r.byteLength;case fn:return n*e*4/r.components*r.byteLength;case Wl:return n*e*4/r.components*r.byteLength;case Ds:case Ls:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Is:case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Po:case Co:return Math.max(n,16)*Math.max(e,8)/4;case wo:case Ro:return Math.max(n,8)*Math.max(e,8)/2;case Do:case Lo:case No:case Uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Io:case Ws:case Oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case zo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ko:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Go:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Xo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Yo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case $o:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Zo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ko:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Jo:case Qo:case jo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case el:case tl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Xs:case nl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function g0(n){switch(n){case Qt:case Zh:return{byteLength:1,components:1};case Br:case Kh:case kn:return{byteLength:2,components:1};case zl:case kl:return{byteLength:2,components:4};case Tn:case Bl:case hn:return{byteLength:4,components:1};case Jh:case Qh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ul}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ul);function Sf(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function _0(n){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const h=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],M=f[d];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,f[u]=M)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const M=f[d];n.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var v0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,x0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,M0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,y0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,b0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,E0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,T0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,A0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,w0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,P0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,D0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,L0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,B0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,k0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,G0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,V0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,H0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,X0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$0="gl_FragColor = linearToOutputTexel( gl_FragColor );",Z0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,K0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,J0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Q0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,j0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,e_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,t_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,n_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,i_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,r_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,s_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,a_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,o_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,l_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,u_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,h_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,f_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,d_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,p_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,m_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,g_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,__=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,v_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,x_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,M_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,y_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,S_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,T_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,A_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,w_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,P_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,C_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,D_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,L_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,I_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,N_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,U_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,F_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,B_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,G_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,V_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,H_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,W_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,X_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,q_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Y_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,$_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Z_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,K_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,J_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Q_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ev=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,tv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,iv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,av=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ov=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,uv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,fv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_v=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ev=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Av=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Pv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Iv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ov=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Hv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$v=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:v0,alphahash_pars_fragment:x0,alphamap_fragment:M0,alphamap_pars_fragment:y0,alphatest_fragment:S0,alphatest_pars_fragment:b0,aomap_fragment:E0,aomap_pars_fragment:T0,batching_pars_vertex:A0,batching_vertex:w0,begin_vertex:P0,beginnormal_vertex:R0,bsdfs:C0,iridescence_fragment:D0,bumpmap_pars_fragment:L0,clipping_planes_fragment:I0,clipping_planes_pars_fragment:N0,clipping_planes_pars_vertex:U0,clipping_planes_vertex:O0,color_fragment:F0,color_pars_fragment:B0,color_pars_vertex:z0,color_vertex:k0,common:G0,cube_uv_reflection_fragment:V0,defaultnormal_vertex:H0,displacementmap_pars_vertex:W0,displacementmap_vertex:X0,emissivemap_fragment:q0,emissivemap_pars_fragment:Y0,colorspace_fragment:$0,colorspace_pars_fragment:Z0,envmap_fragment:K0,envmap_common_pars_fragment:J0,envmap_pars_fragment:Q0,envmap_pars_vertex:j0,envmap_physical_pars_fragment:u_,envmap_vertex:e_,fog_vertex:t_,fog_pars_vertex:n_,fog_fragment:i_,fog_pars_fragment:r_,gradientmap_pars_fragment:s_,lightmap_pars_fragment:a_,lights_lambert_fragment:o_,lights_lambert_pars_fragment:l_,lights_pars_begin:c_,lights_toon_fragment:h_,lights_toon_pars_fragment:f_,lights_phong_fragment:d_,lights_phong_pars_fragment:p_,lights_physical_fragment:m_,lights_physical_pars_fragment:g_,lights_fragment_begin:__,lights_fragment_maps:v_,lights_fragment_end:x_,lightprobes_pars_fragment:M_,logdepthbuf_fragment:y_,logdepthbuf_pars_fragment:S_,logdepthbuf_pars_vertex:b_,logdepthbuf_vertex:E_,map_fragment:T_,map_pars_fragment:A_,map_particle_fragment:w_,map_particle_pars_fragment:P_,metalnessmap_fragment:R_,metalnessmap_pars_fragment:C_,morphinstance_vertex:D_,morphcolor_vertex:L_,morphnormal_vertex:I_,morphtarget_pars_vertex:N_,morphtarget_vertex:U_,normal_fragment_begin:O_,normal_fragment_maps:F_,normal_pars_fragment:B_,normal_pars_vertex:z_,normal_vertex:k_,normalmap_pars_fragment:G_,clearcoat_normal_fragment_begin:V_,clearcoat_normal_fragment_maps:H_,clearcoat_pars_fragment:W_,iridescence_pars_fragment:X_,opaque_fragment:q_,packing:Y_,premultiplied_alpha_fragment:$_,project_vertex:Z_,dithering_fragment:K_,dithering_pars_fragment:J_,roughnessmap_fragment:Q_,roughnessmap_pars_fragment:j_,shadowmap_pars_fragment:ev,shadowmap_pars_vertex:tv,shadowmap_vertex:nv,shadowmask_pars_fragment:iv,skinbase_vertex:rv,skinning_pars_vertex:sv,skinning_vertex:av,skinnormal_vertex:ov,specularmap_fragment:lv,specularmap_pars_fragment:cv,tonemapping_fragment:uv,tonemapping_pars_fragment:hv,transmission_fragment:fv,transmission_pars_fragment:dv,uv_pars_fragment:pv,uv_pars_vertex:mv,uv_vertex:gv,worldpos_vertex:_v,background_vert:vv,background_frag:xv,backgroundCube_vert:Mv,backgroundCube_frag:yv,cube_vert:Sv,cube_frag:bv,depth_vert:Ev,depth_frag:Tv,distance_vert:Av,distance_frag:wv,equirect_vert:Pv,equirect_frag:Rv,linedashed_vert:Cv,linedashed_frag:Dv,meshbasic_vert:Lv,meshbasic_frag:Iv,meshlambert_vert:Nv,meshlambert_frag:Uv,meshmatcap_vert:Ov,meshmatcap_frag:Fv,meshnormal_vert:Bv,meshnormal_frag:zv,meshphong_vert:kv,meshphong_frag:Gv,meshphysical_vert:Vv,meshphysical_frag:Hv,meshtoon_vert:Wv,meshtoon_frag:Xv,points_vert:qv,points_frag:Yv,shadow_vert:$v,shadow_frag:Zv,sprite_vert:Kv,sprite_frag:Jv},ye={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},vn={basic:{uniforms:Vt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:Vt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:Vt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:Vt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:Vt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Qe(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:Vt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:Vt([ye.points,ye.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:Vt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:Vt([ye.common,ye.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:Vt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:Vt([ye.sprite,ye.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:Vt([ye.common,ye.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:Vt([ye.lights,ye.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};vn.physical={uniforms:Vt([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const Ts={r:0,b:0,g:0},Qv=new ut,bf=new He;bf.set(-1,0,0,0,1,0,0,0,1);function jv(n,e,t,i,r,s){const a=new Qe(0);let o=r===!0?0:1,l,c,h=null,f=0,u=null;function d(b){let S=b.isScene===!0?b.background:null;if(S&&S.isTexture){const x=b.backgroundBlurriness>0;S=e.get(S,x)}return S}function g(b){let S=!1;const x=d(b);x===null?m(a,o):x&&x.isColor&&(m(x,1),S=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(b,S){const x=d(S);x&&(x.isCubeTexture||x.mapping===ia)?(c===void 0&&(c=new yt(new Ci(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:hr(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Qv.makeRotationFromEuler(S.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(bf),c.material.toneMapped=et.getTransfer(x.colorSpace)!==st,(h!==x||f!==x.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,u=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new yt(new Ti(2,2),new An({name:"BackgroundMaterial",uniforms:hr(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=et.getTransfer(x.colorSpace)!==st,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,u=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,S){b.getRGB(Ts,xf(n)),t.buffers.color.setClear(Ts.r,Ts.g,Ts.b,S,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:M,dispose:p}}function ex(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(C,N,Y,K,z){let $=!1;const k=f(C,K,Y,N);s!==k&&(s=k,c(s.object)),$=d(C,K,Y,z),$&&g(C,K,Y,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,x(C,N,Y,K),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(C){return n.bindVertexArray(C)}function h(C){return n.deleteVertexArray(C)}function f(C,N,Y,K){const z=K.wireframe===!0;let $=i[N.id];$===void 0&&($={},i[N.id]=$);const k=C.isInstancedMesh===!0?C.id:0;let ie=$[k];ie===void 0&&(ie={},$[k]=ie);let se=ie[Y.id];se===void 0&&(se={},ie[Y.id]=se);let me=se[z];return me===void 0&&(me=u(l()),se[z]=me),me}function u(C){const N=[],Y=[],K=[];for(let z=0;z<t;z++)N[z]=0,Y[z]=0,K[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:Y,attributeDivisors:K,object:C,attributes:{},index:null}}function d(C,N,Y,K){const z=s.attributes,$=N.attributes;let k=0;const ie=Y.getAttributes();for(const se in ie)if(ie[se].location>=0){const fe=z[se];let Pe=$[se];if(Pe===void 0&&(se==="instanceMatrix"&&C.instanceMatrix&&(Pe=C.instanceMatrix),se==="instanceColor"&&C.instanceColor&&(Pe=C.instanceColor)),fe===void 0||fe.attribute!==Pe||Pe&&fe.data!==Pe.data)return!0;k++}return s.attributesNum!==k||s.index!==K}function g(C,N,Y,K){const z={},$=N.attributes;let k=0;const ie=Y.getAttributes();for(const se in ie)if(ie[se].location>=0){let fe=$[se];fe===void 0&&(se==="instanceMatrix"&&C.instanceMatrix&&(fe=C.instanceMatrix),se==="instanceColor"&&C.instanceColor&&(fe=C.instanceColor));const Pe={};Pe.attribute=fe,fe&&fe.data&&(Pe.data=fe.data),z[se]=Pe,k++}s.attributes=z,s.attributesNum=k,s.index=K}function M(){const C=s.newAttributes;for(let N=0,Y=C.length;N<Y;N++)C[N]=0}function m(C){p(C,0)}function p(C,N){const Y=s.newAttributes,K=s.enabledAttributes,z=s.attributeDivisors;Y[C]=1,K[C]===0&&(n.enableVertexAttribArray(C),K[C]=1),z[C]!==N&&(n.vertexAttribDivisor(C,N),z[C]=N)}function b(){const C=s.newAttributes,N=s.enabledAttributes;for(let Y=0,K=N.length;Y<K;Y++)N[Y]!==C[Y]&&(n.disableVertexAttribArray(Y),N[Y]=0)}function S(C,N,Y,K,z,$,k){k===!0?n.vertexAttribIPointer(C,N,Y,z,$):n.vertexAttribPointer(C,N,Y,K,z,$)}function x(C,N,Y,K){M();const z=K.attributes,$=Y.getAttributes(),k=N.defaultAttributeValues;for(const ie in $){const se=$[ie];if(se.location>=0){let me=z[ie];if(me===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(me=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(me=C.instanceColor)),me!==void 0){const fe=me.normalized,Pe=me.itemSize,qe=e.get(me);if(qe===void 0)continue;const rt=qe.buffer,Ke=qe.type,Q=qe.bytesPerElement,de=Ke===n.INT||Ke===n.UNSIGNED_INT||me.gpuType===Bl;if(me.isInterleavedBufferAttribute){const oe=me.data,D=oe.stride,B=me.offset;if(oe.isInstancedInterleavedBuffer){for(let X=0;X<se.locationSize;X++)p(se.location+X,oe.meshPerAttribute);C.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let X=0;X<se.locationSize;X++)m(se.location+X);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let X=0;X<se.locationSize;X++)S(se.location+X,Pe/se.locationSize,Ke,fe,D*Q,(B+Pe/se.locationSize*X)*Q,de)}else{if(me.isInstancedBufferAttribute){for(let oe=0;oe<se.locationSize;oe++)p(se.location+oe,me.meshPerAttribute);C.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let oe=0;oe<se.locationSize;oe++)m(se.location+oe);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let oe=0;oe<se.locationSize;oe++)S(se.location+oe,Pe/se.locationSize,Ke,fe,Pe*Q,Pe/se.locationSize*oe*Q,de)}}else if(k!==void 0){const fe=k[ie];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(se.location,fe);break;case 3:n.vertexAttrib3fv(se.location,fe);break;case 4:n.vertexAttrib4fv(se.location,fe);break;default:n.vertexAttrib1fv(se.location,fe)}}}}b()}function w(){E();for(const C in i){const N=i[C];for(const Y in N){const K=N[Y];for(const z in K){const $=K[z];for(const k in $)h($[k].object),delete $[k];delete K[z]}}delete i[C]}}function T(C){if(i[C.id]===void 0)return;const N=i[C.id];for(const Y in N){const K=N[Y];for(const z in K){const $=K[z];for(const k in $)h($[k].object),delete $[k];delete K[z]}}delete i[C.id]}function P(C){for(const N in i){const Y=i[N];for(const K in Y){const z=Y[K];if(z[C.id]===void 0)continue;const $=z[C.id];for(const k in $)h($[k].object),delete $[k];delete z[C.id]}}}function v(C){for(const N in i){const Y=i[N],K=C.isInstancedMesh===!0?C.id:0,z=Y[K];if(z!==void 0){for(const $ in z){const k=z[$];for(const ie in k)h(k[ie].object),delete k[ie];delete z[$]}delete Y[K],Object.keys(Y).length===0&&delete i[N]}}}function E(){R(),a=!0,s!==r&&(s=r,c(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:M,enableAttribute:m,disableUnusedAttributes:b}}function tx(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function nx(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==fn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===kn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Qt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==hn&&!v)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Ve("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:x,maxSamples:w,samples:T}}function ix(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Qn,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||i!==0||r;return r=u,i=f.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,M=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const b=s?0:i,S=b*4;let x=p.clippingState||null;l.value=x,x=h(g,u,S,d);for(let w=0;w!==S;++w)x[w]=t[w];p.clippingState=x,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,u,d,g){const M=f!==null?f.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const p=d+M*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,x=d;S!==M;++S,x+=4)a.copy(f[S]).applyMatrix4(b,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}const ni=4,Fu=[.125,.215,.35,.446,.526,.582],_i=20,rx=256,yr=new ra,Bu=new Qe;let Qa=null,ja=0,eo=0,to=!1;const sx=new I;class cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=sx}=s;Qa=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ku(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qa,ja,eo),this._renderer.xr.enabled=to,e.scissorTest=!1,Yi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Si||e.mapping===lr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qa=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:kn,format:fn,colorSpace:Ys,depthBuffer:!1},r=zu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zu(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ax(s)),this._blurMaterial=lx(s,e,t),this._ggxMaterial=ox(s,e,t)}return r}_compileMaterial(e){const t=new yt(new zt,e);this._renderer.compile(t,yr)}_sceneToCubeUV(e,t,i,r,s){const l=new rn(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Bu),f.toneMapping=bn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yt(new Ci,new Jl({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let p=!1;const b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,p=!0):(m.color.copy(Bu),p=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[S],s.y,s.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[S]));const w=this._cubeSize;Yi(r,x*w,S>2?w:0,w,w),f.setRenderTarget(r),p&&f.render(M,l),f.render(e,l)}f.toneMapping=d,f.autoClear=u,e.background=b}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Si||e.mapping===lr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ku());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Yi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,yr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=0+c*1.25,d=f*u,{_lodMax:g}=this,M=this._sizeLods[i],m=3*M*(i>g-ni?i-g+ni:0),p=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=g-t,Yi(s,m,p,3*M,2*M),r.setRenderTarget(s),r.render(o,yr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Yi(e,m,p,3*M,2*M),r.setRenderTarget(e),r.render(o,yr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&je("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[r];f.material=c;const u=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*_i-1),M=s/g,m=isFinite(s)?1+Math.floor(h*M):_i;m>_i&&Ve(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${_i}`);const p=[];let b=0;for(let P=0;P<_i;++P){const v=P/M,E=Math.exp(-v*v/2);p.push(E),P===0?b+=E:P<m&&(b+=2*E)}for(let P=0;P<p.length;P++)p[P]=p[P]/b;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:S}=this;u.dTheta.value=g,u.mipInt.value=S-i;const x=this._sizeLods[r],w=3*x*(r>S-ni?r-S+ni:0),T=4*(this._cubeSize-x);Yi(t,w,T,3*x,2*x),l.setRenderTarget(t),l.render(f,yr)}}function ax(n){const e=[],t=[],i=[];let r=n;const s=n-ni+1+Fu.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-ni?l=Fu[a-n+ni-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,M=3,m=2,p=1,b=new Float32Array(M*g*d),S=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let T=0;T<d;T++){const P=T%3*2/3-1,v=T>2?0:-1,E=[P,v,0,P+2/3,v,0,P+2/3,v+1,0,P,v,0,P+2/3,v+1,0,P,v+1,0];b.set(E,M*g*T),S.set(u,m*g*T);const R=[T,T,T,T,T,T];x.set(R,p*g*T)}const w=new zt;w.setAttribute("position",new sn(b,M)),w.setAttribute("uv",new sn(S,m)),w.setAttribute("faceIndex",new sn(x,p)),i.push(new yt(w,null)),r>ni&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function zu(n,e,t){const i=new En(n,e,t);return i.texture.mapping=ia,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Yi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function ox(n,e,t){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:rx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function lx(n,e,t){const i=new Float32Array(_i),r=new I(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function ku(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Gu(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function sa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ef extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new cf(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ci(5,5,5),s=new An({name:"CubemapFromEquirect",uniforms:hr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:Bn});s.uniforms.tEquirect.value=t;const a=new yt(r,s),o=t.minFilter;return t.minFilter===vi&&(t.minFilter=Ft),new f0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function cx(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,d=!1){return u==null?null:d?a(u):s(u)}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===Sa||d===ba)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const M=new Ef(g.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const d=u.mapping,g=d===Sa||d===ba,M=d===Si||d===lr;if(g||M){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new cl(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const b=u.image;return g&&b&&b.height>0||M&&b&&l(b)?(i===null&&(i=new cl(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===Sa?u.mapping=Si:d===ba&&(u.mapping=lr),u}function l(u){let d=0;const g=6;for(let M=0;M<g;M++)u[M]!==void 0&&d++;return d===g}function c(u){const d=u.target;d.removeEventListener("dispose",c);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function ux(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ir("WebGLRenderer: "+i+" extension not supported."),r}}}function hx(n,e,t,i){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const d=s.get(u);d&&(e.remove(d),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const d in u)e.update(u[d],n.ARRAY_BUFFER)}function c(f){const u=[],d=f.index,g=f.attributes.position;let M=0;if(g===void 0)return;if(d!==null){const b=d.array;M=d.version;for(let S=0,x=b.length;S<x;S+=3){const w=b[S+0],T=b[S+1],P=b[S+2];u.push(w,T,T,P,P,w)}}else{const b=g.array;M=g.version;for(let S=0,x=b.length/3-1;S<x;S+=3){const w=S+0,T=S+1,P=S+2;u.push(w,T,T,P,P,w)}}const m=new(g.count>=65535?of:af)(u,1);m.version=M;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function h(f){const u=s.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function fx(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,u){n.drawElements(i,u,s,f*a),t.update(u,i,1)}function c(f,u,d){d!==0&&(n.drawElementsInstanced(i,u,s,f*a,d),t.update(u,i,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,f,0,d);let M=0;for(let m=0;m<d;m++)M+=u[m];t.update(M,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function dx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function px(n,e,t){const i=new WeakMap,r=new mt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let R=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",R)};var d=R;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),M===!0&&(x=2),m===!0&&(x=3);let w=o.attributes.position.count*x,T=1;w>e.maxTextureSize&&(T=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const P=new Float32Array(w*T*4*f),v=new nf(P,w,T,f);v.type=hn,v.needsUpdate=!0;const E=x*4;for(let C=0;C<f;C++){const N=p[C],Y=b[C],K=S[C],z=w*T*4*C;for(let $=0;$<N.count;$++){const k=$*E;g===!0&&(r.fromBufferAttribute(N,$),P[z+k+0]=r.x,P[z+k+1]=r.y,P[z+k+2]=r.z,P[z+k+3]=0),M===!0&&(r.fromBufferAttribute(Y,$),P[z+k+4]=r.x,P[z+k+5]=r.y,P[z+k+6]=r.z,P[z+k+7]=0),m===!0&&(r.fromBufferAttribute(K,$),P[z+k+8]=r.x,P[z+k+9]=r.y,P[z+k+10]=r.z,P[z+k+11]=K.itemSize===4?r.w:1)}}u={count:f,texture:v,size:new ce(w,T)},i.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const M=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",M),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function mx(n,e,t,i,r){let s=new WeakMap;function a(c){const h=r.render.frame,f=c.geometry,u=e.get(c,f);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==h&&(d.update(),s.set(d,h))}return u}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const gx={[Vh]:"LINEAR_TONE_MAPPING",[Hh]:"REINHARD_TONE_MAPPING",[Wh]:"CINEON_TONE_MAPPING",[Xh]:"ACES_FILMIC_TONE_MAPPING",[Yh]:"AGX_TONE_MAPPING",[Fl]:"NEUTRAL_TONE_MAPPING",[qh]:"CUSTOM_TONE_MAPPING"};function _x(n,e,t,i,r,s){const a=new En(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new cr(e,t):void 0}),o=new En(e,t,{type:kn,depthBuffer:!1,stencilBuffer:!1}),l=new zt;l.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new dt([0,2,0,0,2,0],2));const c=new r0({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new yt(l,c),f=new ra(-1,1,1,-1,0,1);let u=null,d=null,g=!1,M,m=null,p=[],b=!1;this.setSize=function(S,x){a.setSize(S,x),o.setSize(S,x);for(let w=0;w<p.length;w++){const T=p[w];T.setSize&&T.setSize(S,x)}},this.setEffects=function(S){p=S,b=p.length>0&&p[0].isRenderPass===!0;const x=a.width,w=a.height;for(let T=0;T<p.length;T++){const P=p[T];P.setSize&&P.setSize(x,w)}},this.begin=function(S,x){if(g||S.toneMapping===bn&&p.length===0)return!1;if(m=x,x!==null){const w=x.width,T=x.height;(a.width!==w||a.height!==T)&&this.setSize(w,T)}return b===!1&&S.setRenderTarget(a),M=S.toneMapping,S.toneMapping=bn,!0},this.hasRenderPass=function(){return b},this.end=function(S,x){S.toneMapping=M,g=!0;let w=a,T=o;for(let P=0;P<p.length;P++){const v=p[P];if(v.enabled!==!1&&(v.render(S,T,w,x),v.needsSwap!==!1)){const E=w;w=T,T=E}}if(u!==S.outputColorSpace||d!==S.toneMapping){u=S.outputColorSpace,d=S.toneMapping,c.defines={},et.getTransfer(u)===st&&(c.defines.SRGB_TRANSFER="");const P=gx[d];P&&(c.defines[P]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,S.setRenderTarget(m),S.render(h,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Tf=new Bt,ul=new cr(1,1),Af=new nf,wf=new eg,Pf=new cf,Vu=[],Hu=[],Wu=new Float32Array(16),Xu=new Float32Array(9),qu=new Float32Array(4);function pr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Vu[r];if(s===void 0&&(s=new Float32Array(r),Vu[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function At(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function aa(n,e){let t=Hu[e];t===void 0&&(t=new Int32Array(e),Hu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function vx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function xx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function Mx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function yx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function Sx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;qu.set(i),n.uniformMatrix2fv(this.addr,!1,qu),wt(t,i)}}function bx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;Xu.set(i),n.uniformMatrix3fv(this.addr,!1,Xu),wt(t,i)}}function Ex(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;Wu.set(i),n.uniformMatrix4fv(this.addr,!1,Wu),wt(t,i)}}function Tx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ax(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function wx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function Px(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function Rx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Cx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function Dx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function Lx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function Ix(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(ul.compareFunction=t.isReversedDepthBuffer()?ql:Xl,s=ul):s=Tf,t.setTexture2D(e||s,r)}function Nx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||wf,r)}function Ux(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Pf,r)}function Ox(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Af,r)}function Fx(n){switch(n){case 5126:return vx;case 35664:return xx;case 35665:return Mx;case 35666:return yx;case 35674:return Sx;case 35675:return bx;case 35676:return Ex;case 5124:case 35670:return Tx;case 35667:case 35671:return Ax;case 35668:case 35672:return wx;case 35669:case 35673:return Px;case 5125:return Rx;case 36294:return Cx;case 36295:return Dx;case 36296:return Lx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ix;case 35679:case 36299:case 36307:return Nx;case 35680:case 36300:case 36308:case 36293:return Ux;case 36289:case 36303:case 36311:case 36292:return Ox}}function Bx(n,e){n.uniform1fv(this.addr,e)}function zx(n,e){const t=pr(e,this.size,2);n.uniform2fv(this.addr,t)}function kx(n,e){const t=pr(e,this.size,3);n.uniform3fv(this.addr,t)}function Gx(n,e){const t=pr(e,this.size,4);n.uniform4fv(this.addr,t)}function Vx(n,e){const t=pr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Hx(n,e){const t=pr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Wx(n,e){const t=pr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Xx(n,e){n.uniform1iv(this.addr,e)}function qx(n,e){n.uniform2iv(this.addr,e)}function Yx(n,e){n.uniform3iv(this.addr,e)}function $x(n,e){n.uniform4iv(this.addr,e)}function Zx(n,e){n.uniform1uiv(this.addr,e)}function Kx(n,e){n.uniform2uiv(this.addr,e)}function Jx(n,e){n.uniform3uiv(this.addr,e)}function Qx(n,e){n.uniform4uiv(this.addr,e)}function jx(n,e,t){const i=this.cache,r=e.length,s=aa(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=ul:a=Tf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function eM(n,e,t){const i=this.cache,r=e.length,s=aa(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||wf,s[a])}function tM(n,e,t){const i=this.cache,r=e.length,s=aa(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Pf,s[a])}function nM(n,e,t){const i=this.cache,r=e.length,s=aa(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Af,s[a])}function iM(n){switch(n){case 5126:return Bx;case 35664:return zx;case 35665:return kx;case 35666:return Gx;case 35674:return Vx;case 35675:return Hx;case 35676:return Wx;case 5124:case 35670:return Xx;case 35667:case 35671:return qx;case 35668:case 35672:return Yx;case 35669:case 35673:return $x;case 5125:return Zx;case 36294:return Kx;case 36295:return Jx;case 36296:return Qx;case 35678:case 36198:case 36298:case 36306:case 35682:return jx;case 35679:case 36299:case 36307:return eM;case 35680:case 36300:case 36308:case 36293:return tM;case 36289:case 36303:case 36311:case 36292:return nM}}class rM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Fx(t.type)}}class sM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=iM(t.type)}}class aM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const no=/(\w+)(\])?(\[|\.)?/g;function Yu(n,e){n.seq.push(e),n.map[e.id]=e}function oM(n,e,t){const i=n.name,r=i.length;for(no.lastIndex=0;;){const s=no.exec(i),a=no.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Yu(t,c===void 0?new rM(o,n,e):new sM(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new aM(o),Yu(t,f)),t=f}}}class Os{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);oM(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function $u(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const lM=37297;let cM=0;function uM(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Zu=new He;function hM(n){et._getMatrix(Zu,et.workingColorSpace,n);const e=`mat3( ${Zu.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case $s:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ku(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+uM(n.getShaderSource(e),o)}else return s}function fM(n,e){const t=hM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const dM={[Vh]:"Linear",[Hh]:"Reinhard",[Wh]:"Cineon",[Xh]:"ACESFilmic",[Yh]:"AgX",[Fl]:"Neutral",[qh]:"Custom"};function pM(n,e){const t=dM[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const As=new I;function mM(){et.getLuminanceCoefficients(As);const n=As.x.toFixed(4),e=As.y.toFixed(4),t=As.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ar).join(`
`)}function _M(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function vM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ar(n){return n!==""}function Ju(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xM=/^[ \t]*#include +<([\w\d./]+)>/gm;function hl(n){return n.replace(xM,yM)}const MM=new Map;function yM(n,e){let t=$e[e];if(t===void 0){const i=MM.get(e);if(i!==void 0)t=$e[i],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return hl(t)}const SM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ju(n){return n.replace(SM,bM)}function bM(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function eh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const EM={[Cs]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function TM(n){return EM[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const AM={[Si]:"ENVMAP_TYPE_CUBE",[lr]:"ENVMAP_TYPE_CUBE",[ia]:"ENVMAP_TYPE_CUBE_UV"};function wM(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":AM[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const PM={[lr]:"ENVMAP_MODE_REFRACTION"};function RM(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":PM[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const CM={[Ol]:"ENVMAP_BLENDING_MULTIPLY",[vm]:"ENVMAP_BLENDING_MIX",[xm]:"ENVMAP_BLENDING_ADD"};function DM(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":CM[n.combine]||"ENVMAP_BLENDING_NONE"}function LM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function IM(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=TM(t),c=wM(t),h=RM(t),f=DM(t),u=LM(t),d=gM(t),g=_M(s),M=r.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ar).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ar).join(`
`),p.length>0&&(p+=`
`)):(m=[eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ar).join(`
`),p=[eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bn?"#define TONE_MAPPING":"",t.toneMapping!==bn?$e.tonemapping_pars_fragment:"",t.toneMapping!==bn?pM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,fM("linearToOutputTexel",t.outputColorSpace),mM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ar).join(`
`)),a=hl(a),a=Ju(a,t),a=Qu(a,t),o=hl(o),o=Ju(o,t),o=Qu(o,t),a=ju(a),o=ju(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===eu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===eu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+a,x=b+p+o,w=$u(r,r.VERTEX_SHADER,S),T=$u(r,r.FRAGMENT_SHADER,x);r.attachShader(M,w),r.attachShader(M,T),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function P(C){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(M)||"",Y=r.getShaderInfoLog(w)||"",K=r.getShaderInfoLog(T)||"",z=N.trim(),$=Y.trim(),k=K.trim();let ie=!0,se=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(ie=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,M,w,T);else{const me=Ku(r,w,"vertex"),fe=Ku(r,T,"fragment");je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+me+`
`+fe)}else z!==""?Ve("WebGLProgram: Program Info Log:",z):($===""||k==="")&&(se=!1);se&&(C.diagnostics={runnable:ie,programLog:z,vertexShader:{log:$,prefix:m},fragmentShader:{log:k,prefix:p}})}r.deleteShader(w),r.deleteShader(T),v=new Os(r,M),E=vM(r,M)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(M,lM)),R},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cM++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=w,this.fragmentShader=T,this}let NM=0;class UM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new OM(e),t.set(e,i)),i}}class OM{constructor(e){this.id=NM++,this.code=e,this.usedTimes=0}}function FM(n){return n===bi||n===Ws||n===Xs}function BM(n,e,t,i,r,s){const a=new Zl,o=new UM,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function M(v,E,R,C,N,Y){const K=C.fog,z=N.geometry,$=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||$,k),se=ie&&ie.mapping===ia?ie.image.height:null,me=d[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Ve("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const fe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Pe=fe!==void 0?fe.length:0;let qe=0;z.morphAttributes.position!==void 0&&(qe=1),z.morphAttributes.normal!==void 0&&(qe=2),z.morphAttributes.color!==void 0&&(qe=3);let rt,Ke,Q,de;if(me){const Le=vn[me];rt=Le.vertexShader,Ke=Le.fragmentShader}else{rt=v.vertexShader,Ke=v.fragmentShader;const Le=o.getVertexShaderStage(v),_t=o.getFragmentShaderStage(v);o.update(v,Le,_t),Q=Le.id,de=_t.id}const oe=n.getRenderTarget(),D=n.state.buffers.depth.getReversed(),B=N.isInstancedMesh===!0,X=N.isBatchedMesh===!0,Se=!!v.map,le=!!v.matcap,G=!!ie,ee=!!v.aoMap,j=!!v.lightMap,ue=!!v.bumpMap&&v.wireframe===!1,ae=!!v.normalMap,Re=!!v.displacementMap,Ee=!!v.emissiveMap,Ne=!!v.metalnessMap,ke=!!v.roughnessMap,L=v.anisotropy>0,nt=v.clearcoat>0,Ye=v.dispersion>0,A=v.iridescence>0,_=v.sheen>0,F=v.transmission>0,V=L&&!!v.anisotropyMap,Z=nt&&!!v.clearcoatMap,he=nt&&!!v.clearcoatNormalMap,pe=nt&&!!v.clearcoatRoughnessMap,J=A&&!!v.iridescenceMap,ne=A&&!!v.iridescenceThicknessMap,_e=_&&!!v.sheenColorMap,Oe=_&&!!v.sheenRoughnessMap,Me=!!v.specularMap,ve=!!v.specularColorMap,ze=!!v.specularIntensityMap,Ge=F&&!!v.transmissionMap,We=F&&!!v.thicknessMap,U=!!v.gradientMap,ge=!!v.alphaMap,te=v.alphaTest>0,xe=!!v.alphaHash,Ae=!!v.extensions;let re=bn;v.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(re=n.toneMapping);const Ue={shaderID:me,shaderType:v.type,shaderName:v.name,vertexShader:rt,fragmentShader:Ke,defines:v.defines,customVertexShaderID:Q,customFragmentShaderID:de,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:X,batchingColor:X&&N._colorsTexture!==null,instancing:B,instancingColor:B&&N.instanceColor!==null,instancingMorph:B&&N.morphTexture!==null,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Se,matcap:le,envMap:G,envMapMode:G&&ie.mapping,envMapCubeUVHeight:se,aoMap:ee,lightMap:j,bumpMap:ue,normalMap:ae,displacementMap:Re,emissiveMap:Ee,normalMapObjectSpace:ae&&v.normalMapType===Sm,normalMapTangentSpace:ae&&v.normalMapType===qs,packedNormalMap:ae&&v.normalMapType===qs&&FM(v.normalMap.format),metalnessMap:Ne,roughnessMap:ke,anisotropy:L,anisotropyMap:V,clearcoat:nt,clearcoatMap:Z,clearcoatNormalMap:he,clearcoatRoughnessMap:pe,dispersion:Ye,iridescence:A,iridescenceMap:J,iridescenceThicknessMap:ne,sheen:_,sheenColorMap:_e,sheenRoughnessMap:Oe,specularMap:Me,specularColorMap:ve,specularIntensityMap:ze,transmission:F,transmissionMap:Ge,thicknessMap:We,gradientMap:U,opaque:v.transparent===!1&&v.blending===nr&&v.alphaToCoverage===!1,alphaMap:ge,alphaTest:te,alphaHash:xe,combine:v.combine,mapUv:Se&&g(v.map.channel),aoMapUv:ee&&g(v.aoMap.channel),lightMapUv:j&&g(v.lightMap.channel),bumpMapUv:ue&&g(v.bumpMap.channel),normalMapUv:ae&&g(v.normalMap.channel),displacementMapUv:Re&&g(v.displacementMap.channel),emissiveMapUv:Ee&&g(v.emissiveMap.channel),metalnessMapUv:Ne&&g(v.metalnessMap.channel),roughnessMapUv:ke&&g(v.roughnessMap.channel),anisotropyMapUv:V&&g(v.anisotropyMap.channel),clearcoatMapUv:Z&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:he&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&g(v.sheenRoughnessMap.channel),specularMapUv:Me&&g(v.specularMap.channel),specularColorMapUv:ve&&g(v.specularColorMap.channel),specularIntensityMapUv:ze&&g(v.specularIntensityMap.channel),transmissionMapUv:Ge&&g(v.transmissionMap.channel),thicknessMapUv:We&&g(v.thicknessMap.channel),alphaMapUv:ge&&g(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ae||L),vertexNormals:!!z.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!z.attributes.uv&&(Se||ge),fog:!!K,useFog:v.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||z.attributes.normal===void 0&&ae===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:D,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:qe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:re,decodeVideoTexture:Se&&v.map.isVideoTexture===!0&&et.getTransfer(v.map.colorSpace)===st,decodeVideoTextureEmissive:Ee&&v.emissiveMap.isVideoTexture===!0&&et.getTransfer(v.emissiveMap.colorSpace)===st,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Un,flipSided:v.side===Ht,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ae&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ae&&v.extensions.multiDraw===!0||X)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function m(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)E.push(R),E.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(p(E,v),b(E,v),E.push(n.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function p(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function b(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function S(v){const E=d[v.type];let R;if(E){const C=vn[E];R=t0.clone(C.uniforms)}else R=v.uniforms;return R}function x(v,E){let R=h.get(E);return R!==void 0?++R.usedTimes:(R=new IM(n,E,v,r),c.push(R),h.set(E,R)),R}function w(v){if(--v.usedTimes===0){const E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function P(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:S,acquireProgram:x,releaseProgram:w,releaseShaderCache:T,programs:c,dispose:P}}function zM(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function kM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function th(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function nh(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,M,m,p){let b=n[e];return b===void 0?(b={id:u.id,object:u,geometry:d,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:m,group:p},n[e]=b):(b.id=u.id,b.object=u,b.geometry=d,b.material=g,b.materialVariant=a(u),b.groupOrder=M,b.renderOrder=u.renderOrder,b.z=m,b.group=p),e++,b}function l(u,d,g,M,m,p){const b=o(u,d,g,M,m,p);g.transmission>0?i.push(b):g.transparent===!0?r.push(b):t.push(b)}function c(u,d,g,M,m,p){const b=o(u,d,g,M,m,p);g.transmission>0?i.unshift(b):g.transparent===!0?r.unshift(b):t.unshift(b)}function h(u,d,g){t.length>1&&t.sort(u||kM),i.length>1&&i.sort(d||th),r.length>1&&r.sort(d||th),g&&(t.reverse(),i.reverse(),r.reverse())}function f(){for(let u=e,d=n.length;u<d;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:h}}function GM(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new nh,n.set(i,[a])):r>=s.length?(a=new nh,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function VM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Qe};break;case"SpotLight":t={position:new I,direction:new I,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function HM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let WM=0;function XM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function qM(n){const e=new VM,t=HM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);const r=new I,s=new ut,a=new ut;function o(c){let h=0,f=0,u=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let d=0,g=0,M=0,m=0,p=0,b=0,S=0,x=0,w=0,T=0,P=0;c.sort(XM);for(let E=0,R=c.length;E<R;E++){const C=c[E],N=C.color,Y=C.intensity,K=C.distance;let z=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===bi?z=C.shadow.map.texture:z=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=N.r*Y,f+=N.g*Y,u+=N.b*Y;else if(C.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(C.sh.coefficients[$],Y);P++}else if(C.isDirectionalLight){const $=e.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const k=C.shadow,ie=t.get(C);ie.shadowIntensity=k.intensity,ie.shadowBias=k.bias,ie.shadowNormalBias=k.normalBias,ie.shadowRadius=k.radius,ie.shadowMapSize=k.mapSize,i.directionalShadow[d]=ie,i.directionalShadowMap[d]=z,i.directionalShadowMatrix[d]=C.shadow.matrix,b++}i.directional[d]=$,d++}else if(C.isSpotLight){const $=e.get(C);$.position.setFromMatrixPosition(C.matrixWorld),$.color.copy(N).multiplyScalar(Y),$.distance=K,$.coneCos=Math.cos(C.angle),$.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),$.decay=C.decay,i.spot[M]=$;const k=C.shadow;if(C.map&&(i.spotLightMap[w]=C.map,w++,k.updateMatrices(C),C.castShadow&&T++),i.spotLightMatrix[M]=k.matrix,C.castShadow){const ie=t.get(C);ie.shadowIntensity=k.intensity,ie.shadowBias=k.bias,ie.shadowNormalBias=k.normalBias,ie.shadowRadius=k.radius,ie.shadowMapSize=k.mapSize,i.spotShadow[M]=ie,i.spotShadowMap[M]=z,x++}M++}else if(C.isRectAreaLight){const $=e.get(C);$.color.copy(N).multiplyScalar(Y),$.halfWidth.set(C.width*.5,0,0),$.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=$,m++}else if(C.isPointLight){const $=e.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),$.distance=C.distance,$.decay=C.decay,C.castShadow){const k=C.shadow,ie=t.get(C);ie.shadowIntensity=k.intensity,ie.shadowBias=k.bias,ie.shadowNormalBias=k.normalBias,ie.shadowRadius=k.radius,ie.shadowMapSize=k.mapSize,ie.shadowCameraNear=k.camera.near,ie.shadowCameraFar=k.camera.far,i.pointShadow[g]=ie,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=C.shadow.matrix,S++}i.point[g]=$,g++}else if(C.isHemisphereLight){const $=e.get(C);$.skyColor.copy(C.color).multiplyScalar(Y),$.groundColor.copy(C.groundColor).multiplyScalar(Y),i.hemi[p]=$,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==d||v.pointLength!==g||v.spotLength!==M||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==b||v.numPointShadows!==S||v.numSpotShadows!==x||v.numSpotMaps!==w||v.numLightProbes!==P)&&(i.directional.length=d,i.spot.length=M,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=x+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,v.directionalLength=d,v.pointLength=g,v.spotLength=M,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=b,v.numPointShadows=S,v.numSpotShadows=x,v.numSpotMaps=w,v.numLightProbes=P,i.version=WM++)}function l(c,h){let f=0,u=0,d=0,g=0,M=0;const m=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const S=c[p];if(S.isDirectionalLight){const x=i.directional[f];x.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),f++}else if(S.isSpotLight){const x=i.spot[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const x=i.point[u];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const x=i.hemi[M];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),M++}}}return{setup:o,setupView:l,state:i}}function ih(n){const e=new qM(n),t=[],i=[],r=[];function s(u){f.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function YM(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ih(n),e.set(r,[o])):s>=a.length?(o=new ih(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const $M=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,KM=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],JM=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],rh=new ut,Sr=new I,io=new I;function QM(n,e,t){let i=new Ql;const r=new ce,s=new ce,a=new mt,o=new a0,l=new o0,c={},h=t.maxTextureSize,f={[si]:Ht,[Ht]:si,[Un]:Un},u=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:$M,fragmentShader:ZM}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new zt;g.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new yt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cs;let p=this.type;this.render=function(T,P,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Gh&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Cs);const E=n.getRenderTarget(),R=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Bn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const Y=p!==this.type;Y&&P.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(z=>z.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,z=T.length;K<z;K++){const $=T[K],k=$.shadow;if(k===void 0){Ve("WebGLShadowMap:",$,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const ie=k.getFrameExtents();r.multiply(ie),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ie.x),r.x=s.x*ie.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ie.y),r.y=s.y*ie.y,k.mapSize.y=s.y));const se=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=se,k.map===null||Y===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Er){if($.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new En(r.x,r.y,{format:bi,type:kn,minFilter:Ft,magFilter:Ft,generateMipmaps:!1}),k.map.texture.name=$.name+".shadowMap",k.map.depthTexture=new cr(r.x,r.y,hn),k.map.depthTexture.name=$.name+".shadowMapDepth",k.map.depthTexture.format=Gn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Dt,k.map.depthTexture.magFilter=Dt}else $.isPointLight?(k.map=new Ef(r.x),k.map.depthTexture=new xg(r.x,Tn)):(k.map=new En(r.x,r.y),k.map.depthTexture=new cr(r.x,r.y,Tn)),k.map.depthTexture.name=$.name+".shadowMap",k.map.depthTexture.format=Gn,this.type===Cs?(k.map.depthTexture.compareFunction=se?ql:Xl,k.map.depthTexture.minFilter=Ft,k.map.depthTexture.magFilter=Ft):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Dt,k.map.depthTexture.magFilter=Dt);k.camera.updateProjectionMatrix()}const me=k.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<me;fe++){if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,fe),n.clear();else{fe===0&&(n.setRenderTarget(k.map),n.clear());const Pe=k.getViewport(fe);a.set(s.x*Pe.x,s.y*Pe.y,s.x*Pe.z,s.y*Pe.w),N.viewport(a)}if($.isPointLight){const Pe=k.camera,qe=k.matrix,rt=$.distance||Pe.far;rt!==Pe.far&&(Pe.far=rt,Pe.updateProjectionMatrix()),Sr.setFromMatrixPosition($.matrixWorld),Pe.position.copy(Sr),io.copy(Pe.position),io.add(KM[fe]),Pe.up.copy(JM[fe]),Pe.lookAt(io),Pe.updateMatrixWorld(),qe.makeTranslation(-Sr.x,-Sr.y,-Sr.z),rh.multiplyMatrices(Pe.projectionMatrix,Pe.matrixWorldInverse),k._frustum.setFromProjectionMatrix(rh,Pe.coordinateSystem,Pe.reversedDepth)}else k.updateMatrices($);i=k.getFrustum(),x(P,v,k.camera,$,this.type)}k.isPointLightShadow!==!0&&this.type===Er&&b(k,v),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,R,C)};function b(T,P){const v=e.update(M);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new En(r.x,r.y,{format:bi,type:kn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(P,null,v,u,M,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(P,null,v,d,M,null)}function S(T,P,v,E){let R=null;const C=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)R=C;else if(R=v.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const N=R.uuid,Y=P.uuid;let K=c[N];K===void 0&&(K={},c[N]=K);let z=K[Y];z===void 0&&(z=R.clone(),K[Y]=z,P.addEventListener("dispose",w)),R=z}if(R.visible=P.visible,R.wireframe=P.wireframe,E===Er?R.side=P.shadowSide!==null?P.shadowSide:P.side:R.side=P.shadowSide!==null?P.shadowSide:f[P.side],R.alphaMap=P.alphaMap,R.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,R.map=P.map,R.clipShadows=P.clipShadows,R.clippingPlanes=P.clippingPlanes,R.clipIntersection=P.clipIntersection,R.displacementMap=P.displacementMap,R.displacementScale=P.displacementScale,R.displacementBias=P.displacementBias,R.wireframeLinewidth=P.wireframeLinewidth,R.linewidth=P.linewidth,v.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const N=n.properties.get(R);N.light=v}return R}function x(T,P,v,E,R){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&R===Er)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);const Y=e.update(T),K=T.material;if(Array.isArray(K)){const z=Y.groups;for(let $=0,k=z.length;$<k;$++){const ie=z[$],se=K[ie.materialIndex];if(se&&se.visible){const me=S(T,se,E,R);T.onBeforeShadow(n,T,P,v,Y,me,ie),n.renderBufferDirect(v,null,Y,me,T,ie),T.onAfterShadow(n,T,P,v,Y,me,ie)}}}else if(K.visible){const z=S(T,K,E,R);T.onBeforeShadow(n,T,P,v,Y,z,null),n.renderBufferDirect(v,null,Y,z,T,null),T.onAfterShadow(n,T,P,v,Y,z,null)}}const N=T.children;for(let Y=0,K=N.length;Y<K;Y++)x(N[Y],P,v,E,R)}function w(T){T.target.removeEventListener("dispose",w);for(const v in c){const E=c[v],R=T.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function jM(n,e){function t(){let U=!1;const ge=new mt;let te=null;const xe=new mt(0,0,0,0);return{setMask:function(Ae){te!==Ae&&!U&&(n.colorMask(Ae,Ae,Ae,Ae),te=Ae)},setLocked:function(Ae){U=Ae},setClear:function(Ae,re,Ue,Le,_t){_t===!0&&(Ae*=Le,re*=Le,Ue*=Le),ge.set(Ae,re,Ue,Le),xe.equals(ge)===!1&&(n.clearColor(Ae,re,Ue,Le),xe.copy(ge))},reset:function(){U=!1,te=null,xe.set(-1,0,0,0)}}}function i(){let U=!1,ge=!1,te=null,xe=null,Ae=null;return{setReversed:function(re){if(ge!==re){const Ue=e.get("EXT_clip_control");re?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ge=re;const Le=Ae;Ae=null,this.setClear(Le)}},getReversed:function(){return ge},setTest:function(re){re?oe(n.DEPTH_TEST):D(n.DEPTH_TEST)},setMask:function(re){te!==re&&!U&&(n.depthMask(re),te=re)},setFunc:function(re){if(ge&&(re=Lm[re]),xe!==re){switch(re){case vo:n.depthFunc(n.NEVER);break;case xo:n.depthFunc(n.ALWAYS);break;case Mo:n.depthFunc(n.LESS);break;case or:n.depthFunc(n.LEQUAL);break;case yo:n.depthFunc(n.EQUAL);break;case So:n.depthFunc(n.GEQUAL);break;case bo:n.depthFunc(n.GREATER);break;case Eo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=re}},setLocked:function(re){U=re},setClear:function(re){Ae!==re&&(Ae=re,ge&&(re=1-re),n.clearDepth(re))},reset:function(){U=!1,te=null,xe=null,Ae=null,ge=!1}}}function r(){let U=!1,ge=null,te=null,xe=null,Ae=null,re=null,Ue=null,Le=null,_t=null;return{setTest:function(ht){U||(ht?oe(n.STENCIL_TEST):D(n.STENCIL_TEST))},setMask:function(ht){ge!==ht&&!U&&(n.stencilMask(ht),ge=ht)},setFunc:function(ht,dn,pn){(te!==ht||xe!==dn||Ae!==pn)&&(n.stencilFunc(ht,dn,pn),te=ht,xe=dn,Ae=pn)},setOp:function(ht,dn,pn){(re!==ht||Ue!==dn||Le!==pn)&&(n.stencilOp(ht,dn,pn),re=ht,Ue=dn,Le=pn)},setLocked:function(ht){U=ht},setClear:function(ht){_t!==ht&&(n.clearStencil(ht),_t=ht)},reset:function(){U=!1,ge=null,te=null,xe=null,Ae=null,re=null,Ue=null,Le=null,_t=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let h={},f={},u={},d=new WeakMap,g=[],M=null,m=!1,p=null,b=null,S=null,x=null,w=null,T=null,P=null,v=new Qe(0,0,0),E=0,R=!1,C=null,N=null,Y=null,K=null,z=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,ie=0;const se=n.getParameter(n.VERSION);se.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(se)[1]),k=ie>=1):se.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),k=ie>=2);let me=null,fe={};const Pe=n.getParameter(n.SCISSOR_BOX),qe=n.getParameter(n.VIEWPORT),rt=new mt().fromArray(Pe),Ke=new mt().fromArray(qe);function Q(U,ge,te,xe){const Ae=new Uint8Array(4),re=n.createTexture();n.bindTexture(U,re),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ue=0;Ue<te;Ue++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,Ae):n.texImage2D(ge+Ue,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ae);return re}const de={};de[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),de[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),de[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(n.DEPTH_TEST),a.setFunc(or),ue(!1),ae($c),oe(n.CULL_FACE),ee(Bn);function oe(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function D(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function B(U,ge){return u[U]!==ge?(n.bindFramebuffer(U,ge),u[U]=ge,U===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ge),U===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function X(U,ge){let te=g,xe=!1;if(U){te=d.get(ge),te===void 0&&(te=[],d.set(ge,te));const Ae=U.textures;if(te.length!==Ae.length||te[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Ue=Ae.length;re<Ue;re++)te[re]=n.COLOR_ATTACHMENT0+re;te.length=Ae.length,xe=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,xe=!0);xe&&n.drawBuffers(te)}function Se(U){return M!==U?(n.useProgram(U),M=U,!0):!1}const le={[gi]:n.FUNC_ADD,[tm]:n.FUNC_SUBTRACT,[nm]:n.FUNC_REVERSE_SUBTRACT};le[im]=n.MIN,le[rm]=n.MAX;const G={[sm]:n.ZERO,[am]:n.ONE,[om]:n.SRC_COLOR,[go]:n.SRC_ALPHA,[dm]:n.SRC_ALPHA_SATURATE,[hm]:n.DST_COLOR,[cm]:n.DST_ALPHA,[lm]:n.ONE_MINUS_SRC_COLOR,[_o]:n.ONE_MINUS_SRC_ALPHA,[fm]:n.ONE_MINUS_DST_COLOR,[um]:n.ONE_MINUS_DST_ALPHA,[pm]:n.CONSTANT_COLOR,[mm]:n.ONE_MINUS_CONSTANT_COLOR,[gm]:n.CONSTANT_ALPHA,[_m]:n.ONE_MINUS_CONSTANT_ALPHA};function ee(U,ge,te,xe,Ae,re,Ue,Le,_t,ht){if(U===Bn){m===!0&&(D(n.BLEND),m=!1);return}if(m===!1&&(oe(n.BLEND),m=!0),U!==em){if(U!==p||ht!==R){if((b!==gi||w!==gi)&&(n.blendEquation(n.FUNC_ADD),b=gi,w=gi),ht)switch(U){case nr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Zc:n.blendFunc(n.ONE,n.ONE);break;case Kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Jc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:je("WebGLState: Invalid blending: ",U);break}else switch(U){case nr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Zc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Kc:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jc:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",U);break}S=null,x=null,T=null,P=null,v.set(0,0,0),E=0,p=U,R=ht}return}Ae=Ae||ge,re=re||te,Ue=Ue||xe,(ge!==b||Ae!==w)&&(n.blendEquationSeparate(le[ge],le[Ae]),b=ge,w=Ae),(te!==S||xe!==x||re!==T||Ue!==P)&&(n.blendFuncSeparate(G[te],G[xe],G[re],G[Ue]),S=te,x=xe,T=re,P=Ue),(Le.equals(v)===!1||_t!==E)&&(n.blendColor(Le.r,Le.g,Le.b,_t),v.copy(Le),E=_t),p=U,R=!1}function j(U,ge){U.side===Un?D(n.CULL_FACE):oe(n.CULL_FACE);let te=U.side===Ht;ge&&(te=!te),ue(te),U.blending===nr&&U.transparent===!1?ee(Bn):ee(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const xe=U.stencilWrite;o.setTest(xe),xe&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ee(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):D(n.SAMPLE_ALPHA_TO_COVERAGE)}function ue(U){C!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),C=U)}function ae(U){U!==Qp?(oe(n.CULL_FACE),U!==N&&(U===$c?n.cullFace(n.BACK):U===jp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):D(n.CULL_FACE),N=U}function Re(U){U!==Y&&(k&&n.lineWidth(U),Y=U)}function Ee(U,ge,te){U?(oe(n.POLYGON_OFFSET_FILL),(K!==ge||z!==te)&&(K=ge,z=te,a.getReversed()&&(ge=-ge),n.polygonOffset(ge,te))):D(n.POLYGON_OFFSET_FILL)}function Ne(U){U?oe(n.SCISSOR_TEST):D(n.SCISSOR_TEST)}function ke(U){U===void 0&&(U=n.TEXTURE0+$-1),me!==U&&(n.activeTexture(U),me=U)}function L(U,ge,te){te===void 0&&(me===null?te=n.TEXTURE0+$-1:te=me);let xe=fe[te];xe===void 0&&(xe={type:void 0,texture:void 0},fe[te]=xe),(xe.type!==U||xe.texture!==ge)&&(me!==te&&(n.activeTexture(te),me=te),n.bindTexture(U,ge||de[U]),xe.type=U,xe.texture=ge)}function nt(){const U=fe[me];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Ye(){try{n.compressedTexImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function _(){try{n.texSubImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function F(){try{n.texSubImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function he(){try{n.texStorage2D(...arguments)}catch(U){je("WebGLState:",U)}}function pe(){try{n.texStorage3D(...arguments)}catch(U){je("WebGLState:",U)}}function J(){try{n.texImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function ne(){try{n.texImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function _e(U){return f[U]!==void 0?f[U]:n.getParameter(U)}function Oe(U,ge){f[U]!==ge&&(n.pixelStorei(U,ge),f[U]=ge)}function Me(U){rt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),rt.copy(U))}function ve(U){Ke.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Ke.copy(U))}function ze(U,ge){let te=c.get(ge);te===void 0&&(te=new WeakMap,c.set(ge,te));let xe=te.get(U);xe===void 0&&(xe=n.getUniformBlockIndex(ge,U.name),te.set(U,xe))}function Ge(U,ge){const xe=c.get(ge).get(U);l.get(ge)!==xe&&(n.uniformBlockBinding(ge,xe,U.__bindingPointIndex),l.set(ge,xe))}function We(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},me=null,fe={},u={},d=new WeakMap,g=[],M=null,m=!1,p=null,b=null,S=null,x=null,w=null,T=null,P=null,v=new Qe(0,0,0),E=0,R=!1,C=null,N=null,Y=null,K=null,z=null,rt.set(0,0,n.canvas.width,n.canvas.height),Ke.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:oe,disable:D,bindFramebuffer:B,drawBuffers:X,useProgram:Se,setBlending:ee,setMaterial:j,setFlipSided:ue,setCullFace:ae,setLineWidth:Re,setPolygonOffset:Ee,setScissorTest:Ne,activeTexture:ke,bindTexture:L,unbindTexture:nt,compressedTexImage2D:Ye,compressedTexImage3D:A,texImage2D:J,texImage3D:ne,pixelStorei:Oe,getParameter:_e,updateUBOMapping:ze,uniformBlockBinding:Ge,texStorage2D:he,texStorage3D:pe,texSubImage2D:_,texSubImage3D:F,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:Me,viewport:ve,reset:We}}function ey(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ce,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(A,_){return g?new OffscreenCanvas(A,_):Zs("canvas")}function m(A,_,F){let V=1;const Z=Ye(A);if((Z.width>F||Z.height>F)&&(V=F/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const he=Math.floor(V*Z.width),pe=Math.floor(V*Z.height);u===void 0&&(u=M(he,pe));const J=_?M(he,pe):u;return J.width=he,J.height=pe,J.getContext("2d").drawImage(A,0,0,he,pe),Ve("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+he+"x"+pe+")."),J}else return"data"in A&&Ve("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function p(A){return A.generateMipmaps}function b(A){n.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(A,_,F,V,Z,he=!1){if(A!==null){if(n[A]!==void 0)return n[A];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let pe;V&&(pe=e.get("EXT_texture_norm16"),pe||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=_;if(_===n.RED&&(F===n.FLOAT&&(J=n.R32F),F===n.HALF_FLOAT&&(J=n.R16F),F===n.UNSIGNED_BYTE&&(J=n.R8),F===n.UNSIGNED_SHORT&&pe&&(J=pe.R16_EXT),F===n.SHORT&&pe&&(J=pe.R16_SNORM_EXT)),_===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(J=n.R8UI),F===n.UNSIGNED_SHORT&&(J=n.R16UI),F===n.UNSIGNED_INT&&(J=n.R32UI),F===n.BYTE&&(J=n.R8I),F===n.SHORT&&(J=n.R16I),F===n.INT&&(J=n.R32I)),_===n.RG&&(F===n.FLOAT&&(J=n.RG32F),F===n.HALF_FLOAT&&(J=n.RG16F),F===n.UNSIGNED_BYTE&&(J=n.RG8),F===n.UNSIGNED_SHORT&&pe&&(J=pe.RG16_EXT),F===n.SHORT&&pe&&(J=pe.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(J=n.RG8UI),F===n.UNSIGNED_SHORT&&(J=n.RG16UI),F===n.UNSIGNED_INT&&(J=n.RG32UI),F===n.BYTE&&(J=n.RG8I),F===n.SHORT&&(J=n.RG16I),F===n.INT&&(J=n.RG32I)),_===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(J=n.RGB8UI),F===n.UNSIGNED_SHORT&&(J=n.RGB16UI),F===n.UNSIGNED_INT&&(J=n.RGB32UI),F===n.BYTE&&(J=n.RGB8I),F===n.SHORT&&(J=n.RGB16I),F===n.INT&&(J=n.RGB32I)),_===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),F===n.UNSIGNED_INT&&(J=n.RGBA32UI),F===n.BYTE&&(J=n.RGBA8I),F===n.SHORT&&(J=n.RGBA16I),F===n.INT&&(J=n.RGBA32I)),_===n.RGB&&(F===n.UNSIGNED_SHORT&&pe&&(J=pe.RGB16_EXT),F===n.SHORT&&pe&&(J=pe.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),_===n.RGBA){const ne=he?$s:et.getTransfer(Z);F===n.FLOAT&&(J=n.RGBA32F),F===n.HALF_FLOAT&&(J=n.RGBA16F),F===n.UNSIGNED_BYTE&&(J=ne===st?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&pe&&(J=pe.RGBA16_EXT),F===n.SHORT&&pe&&(J=pe.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function w(A,_){let F;return A?_===null||_===Tn||_===zr?F=n.DEPTH24_STENCIL8:_===hn?F=n.DEPTH32F_STENCIL8:_===Br&&(F=n.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Tn||_===zr?F=n.DEPTH_COMPONENT24:_===hn?F=n.DEPTH_COMPONENT32F:_===Br&&(F=n.DEPTH_COMPONENT16),F}function T(A,_){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Dt&&A.minFilter!==Ft?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function P(A){const _=A.target;_.removeEventListener("dispose",P),E(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&f.delete(_)}function v(A){const _=A.target;_.removeEventListener("dispose",v),C(_)}function E(A){const _=i.get(A);if(_.__webglInit===void 0)return;const F=A.source,V=d.get(F);if(V){const Z=V[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(A),Object.keys(V).length===0&&d.delete(F)}i.remove(A)}function R(A){const _=i.get(A);n.deleteTexture(_.__webglTexture);const F=A.source,V=d.get(F);delete V[_.__cacheKey],a.memory.textures--}function C(A){const _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let Z=0;Z<_.__webglFramebuffer[V].length;Z++)n.deleteFramebuffer(_.__webglFramebuffer[V][Z]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=A.textures;for(let V=0,Z=F.length;V<Z;V++){const he=i.get(F[V]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),a.memory.textures--),i.remove(F[V])}i.remove(A)}let N=0;function Y(){N=0}function K(){return N}function z(A){N=A}function $(){const A=N;return A>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),N+=1,A}function k(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function ie(A,_){const F=i.get(A);if(A.isVideoTexture&&L(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&F.__version!==A.version){const V=A.image;if(V===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{D(F,A,_);return}}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+_)}function se(A,_){const F=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){D(F,A,_);return}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+_)}function me(A,_){const F=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){D(F,A,_);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+_)}function fe(A,_){const F=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&F.__version!==A.version){B(F,A,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+_)}const Pe={[To]:n.REPEAT,[On]:n.CLAMP_TO_EDGE,[Ao]:n.MIRRORED_REPEAT},qe={[Dt]:n.NEAREST,[Mm]:n.NEAREST_MIPMAP_NEAREST,[ns]:n.NEAREST_MIPMAP_LINEAR,[Ft]:n.LINEAR,[Ea]:n.LINEAR_MIPMAP_NEAREST,[vi]:n.LINEAR_MIPMAP_LINEAR},rt={[bm]:n.NEVER,[Pm]:n.ALWAYS,[Em]:n.LESS,[Xl]:n.LEQUAL,[Tm]:n.EQUAL,[ql]:n.GEQUAL,[Am]:n.GREATER,[wm]:n.NOTEQUAL};function Ke(A,_){if(_.type===hn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ft||_.magFilter===Ea||_.magFilter===ns||_.magFilter===vi||_.minFilter===Ft||_.minFilter===Ea||_.minFilter===ns||_.minFilter===vi)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,Pe[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Pe[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Pe[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,qe[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,qe[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,rt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Dt||_.minFilter!==ns&&_.minFilter!==vi||_.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Q(A,_){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",P));const V=_.source;let Z=d.get(V);Z===void 0&&(Z={},d.set(V,Z));const he=k(_);if(he!==A.__cacheKey){Z[he]===void 0&&(Z[he]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Z[he].usedTimes++;const pe=Z[A.__cacheKey];pe!==void 0&&(Z[A.__cacheKey].usedTimes--,pe.usedTimes===0&&R(_)),A.__cacheKey=he,A.__webglTexture=Z[he].texture}return F}function de(A,_,F){return Math.floor(Math.floor(A/F)/_)}function oe(A,_,F,V){const he=A.updateRanges;if(he.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,F,V,_.data);else{he.sort((Oe,Me)=>Oe.start-Me.start);let pe=0;for(let Oe=1;Oe<he.length;Oe++){const Me=he[pe],ve=he[Oe],ze=Me.start+Me.count,Ge=de(ve.start,_.width,4),We=de(Me.start,_.width,4);ve.start<=ze+1&&Ge===We&&de(ve.start+ve.count-1,_.width,4)===Ge?Me.count=Math.max(Me.count,ve.start+ve.count-Me.start):(++pe,he[pe]=ve)}he.length=pe+1;const J=t.getParameter(n.UNPACK_ROW_LENGTH),ne=t.getParameter(n.UNPACK_SKIP_PIXELS),_e=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Oe=0,Me=he.length;Oe<Me;Oe++){const ve=he[Oe],ze=Math.floor(ve.start/4),Ge=Math.ceil(ve.count/4),We=ze%_.width,U=Math.floor(ze/_.width),ge=Ge,te=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,We),t.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,We,U,ge,te,F,V,_.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,J),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(n.UNPACK_SKIP_ROWS,_e)}}function D(A,_,F){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);const Z=Q(A,_),he=_.source;t.bindTexture(V,A.__webglTexture,n.TEXTURE0+F);const pe=i.get(he);if(he.version!==pe.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const te=et.getPrimaries(et.workingColorSpace),xe=_.colorSpace===jn?null:et.getPrimaries(_.colorSpace),Ae=_.colorSpace===jn||te===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let ne=m(_.image,!1,r.maxTextureSize);ne=nt(_,ne);const _e=s.convert(_.format,_.colorSpace),Oe=s.convert(_.type);let Me=x(_.internalFormat,_e,Oe,_.normalized,_.colorSpace,_.isVideoTexture);Ke(V,_);let ve;const ze=_.mipmaps,Ge=_.isVideoTexture!==!0,We=pe.__version===void 0||Z===!0,U=he.dataReady,ge=T(_,ne);if(_.isDepthTexture)Me=w(_.format===xi,_.type),We&&(Ge?t.texStorage2D(n.TEXTURE_2D,1,Me,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Me,ne.width,ne.height,0,_e,Oe,null));else if(_.isDataTexture)if(ze.length>0){Ge&&We&&t.texStorage2D(n.TEXTURE_2D,ge,Me,ze[0].width,ze[0].height);for(let te=0,xe=ze.length;te<xe;te++)ve=ze[te],Ge?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,ve.width,ve.height,_e,Oe,ve.data):t.texImage2D(n.TEXTURE_2D,te,Me,ve.width,ve.height,0,_e,Oe,ve.data);_.generateMipmaps=!1}else Ge?(We&&t.texStorage2D(n.TEXTURE_2D,ge,Me,ne.width,ne.height),U&&oe(_,ne,_e,Oe)):t.texImage2D(n.TEXTURE_2D,0,Me,ne.width,ne.height,0,_e,Oe,ne.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ge&&We&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Me,ze[0].width,ze[0].height,ne.depth);for(let te=0,xe=ze.length;te<xe;te++)if(ve=ze[te],_.format!==fn)if(_e!==null)if(Ge){if(U)if(_.layerUpdates.size>0){const Ae=Ou(ve.width,ve.height,_.format,_.type);for(const re of _.layerUpdates){const Ue=ve.data.subarray(re*Ae/ve.data.BYTES_PER_ELEMENT,(re+1)*Ae/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,re,ve.width,ve.height,1,_e,Ue)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,ve.width,ve.height,ne.depth,_e,ve.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,Me,ve.width,ve.height,ne.depth,0,ve.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,ve.width,ve.height,ne.depth,_e,Oe,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,Me,ve.width,ve.height,ne.depth,0,_e,Oe,ve.data)}else{Ge&&We&&t.texStorage2D(n.TEXTURE_2D,ge,Me,ze[0].width,ze[0].height);for(let te=0,xe=ze.length;te<xe;te++)ve=ze[te],_.format!==fn?_e!==null?Ge?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,ve.width,ve.height,_e,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,te,Me,ve.width,ve.height,0,ve.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,ve.width,ve.height,_e,Oe,ve.data):t.texImage2D(n.TEXTURE_2D,te,Me,ve.width,ve.height,0,_e,Oe,ve.data)}else if(_.isDataArrayTexture)if(Ge){if(We&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Me,ne.width,ne.height,ne.depth),U)if(_.layerUpdates.size>0){const te=Ou(ne.width,ne.height,_.format,_.type);for(const xe of _.layerUpdates){const Ae=ne.data.subarray(xe*te/ne.data.BYTES_PER_ELEMENT,(xe+1)*te/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xe,ne.width,ne.height,1,_e,Oe,Ae)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,_e,Oe,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,ne.width,ne.height,ne.depth,0,_e,Oe,ne.data);else if(_.isData3DTexture)Ge?(We&&t.texStorage3D(n.TEXTURE_3D,ge,Me,ne.width,ne.height,ne.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,_e,Oe,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Me,ne.width,ne.height,ne.depth,0,_e,Oe,ne.data);else if(_.isFramebufferTexture){if(We)if(Ge)t.texStorage2D(n.TEXTURE_2D,ge,Me,ne.width,ne.height);else{let te=ne.width,xe=ne.height;for(let Ae=0;Ae<ge;Ae++)t.texImage2D(n.TEXTURE_2D,Ae,Me,te,xe,0,_e,Oe,null),te>>=1,xe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const te=n.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ne.parentNode!==te){te.appendChild(ne),f.add(_),te.onpaint=xe=>{const Ae=xe.changedElements;for(const re of f)Ae.includes(re.image)&&(re.needsUpdate=!0)},te.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ne);else{const Ae=n.RGBA,re=n.RGBA,Ue=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ae,re,Ue,ne)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ze.length>0){if(Ge&&We){const te=Ye(ze[0]);t.texStorage2D(n.TEXTURE_2D,ge,Me,te.width,te.height)}for(let te=0,xe=ze.length;te<xe;te++)ve=ze[te],Ge?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,_e,Oe,ve):t.texImage2D(n.TEXTURE_2D,te,Me,_e,Oe,ve);_.generateMipmaps=!1}else if(Ge){if(We){const te=Ye(ne);t.texStorage2D(n.TEXTURE_2D,ge,Me,te.width,te.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,_e,Oe,ne)}else t.texImage2D(n.TEXTURE_2D,0,Me,_e,Oe,ne);p(_)&&b(V),pe.__version=he.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function B(A,_,F){if(_.image.length!==6)return;const V=Q(A,_),Z=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+F);const he=i.get(Z);if(Z.version!==he.__version||V===!0){t.activeTexture(n.TEXTURE0+F);const pe=et.getPrimaries(et.workingColorSpace),J=_.colorSpace===jn?null:et.getPrimaries(_.colorSpace),ne=_.colorSpace===jn||pe===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const _e=_.isCompressedTexture||_.image[0].isCompressedTexture,Oe=_.image[0]&&_.image[0].isDataTexture,Me=[];for(let re=0;re<6;re++)!_e&&!Oe?Me[re]=m(_.image[re],!0,r.maxCubemapSize):Me[re]=Oe?_.image[re].image:_.image[re],Me[re]=nt(_,Me[re]);const ve=Me[0],ze=s.convert(_.format,_.colorSpace),Ge=s.convert(_.type),We=x(_.internalFormat,ze,Ge,_.normalized,_.colorSpace),U=_.isVideoTexture!==!0,ge=he.__version===void 0||V===!0,te=Z.dataReady;let xe=T(_,ve);Ke(n.TEXTURE_CUBE_MAP,_);let Ae;if(_e){U&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,We,ve.width,ve.height);for(let re=0;re<6;re++){Ae=Me[re].mipmaps;for(let Ue=0;Ue<Ae.length;Ue++){const Le=Ae[Ue];_.format!==fn?ze!==null?U?te&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,0,0,Le.width,Le.height,ze,Le.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,We,Le.width,Le.height,0,Le.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,0,0,Le.width,Le.height,ze,Ge,Le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,We,Le.width,Le.height,0,ze,Ge,Le.data)}}}else{if(Ae=_.mipmaps,U&&ge){Ae.length>0&&xe++;const re=Ye(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,We,re.width,re.height)}for(let re=0;re<6;re++)if(Oe){U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Me[re].width,Me[re].height,ze,Ge,Me[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,Me[re].width,Me[re].height,0,ze,Ge,Me[re].data);for(let Ue=0;Ue<Ae.length;Ue++){const _t=Ae[Ue].image[re].image;U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,0,0,_t.width,_t.height,ze,Ge,_t.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,We,_t.width,_t.height,0,ze,Ge,_t.data)}}else{U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ze,Ge,Me[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,ze,Ge,Me[re]);for(let Ue=0;Ue<Ae.length;Ue++){const Le=Ae[Ue];U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,0,0,ze,Ge,Le.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,We,ze,Ge,Le.image[re])}}}p(_)&&b(n.TEXTURE_CUBE_MAP),he.__version=Z.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function X(A,_,F,V,Z,he){const pe=s.convert(F.format,F.colorSpace),J=s.convert(F.type),ne=x(F.internalFormat,pe,J,F.normalized,F.colorSpace),_e=i.get(_),Oe=i.get(F);if(Oe.__renderTarget=_,!_e.__hasExternalTextures){const Me=Math.max(1,_.width>>he),ve=Math.max(1,_.height>>he);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,he,ne,Me,ve,_.depth,0,pe,J,null):t.texImage2D(Z,he,ne,Me,ve,0,pe,J,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),ke(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,Z,Oe.__webglTexture,0,Ne(_)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,Z,Oe.__webglTexture,he),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Se(A,_,F){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){const V=_.depthTexture,Z=V&&V.isDepthTexture?V.type:null,he=w(_.stencilBuffer,Z),pe=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ke(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ne(_),he,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne(_),he,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,he,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,A)}else{const V=_.textures;for(let Z=0;Z<V.length;Z++){const he=V[Z],pe=s.convert(he.format,he.colorSpace),J=s.convert(he.type),ne=x(he.internalFormat,pe,J,he.normalized,he.colorSpace);ke(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ne(_),ne,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne(_),ne,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ne,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function le(A,_,F){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(_.depthTexture);if(Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ke(n.TEXTURE_CUBE_MAP,_.depthTexture);const _e=s.convert(_.depthTexture.format),Oe=s.convert(_.depthTexture.type);let Me;_.depthTexture.format===Gn?Me=n.DEPTH_COMPONENT24:_.depthTexture.format===xi&&(Me=n.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,Me,_.width,_.height,0,_e,Oe,null)}}else ie(_.depthTexture,0);const he=Z.__webglTexture,pe=Ne(_),J=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,ne=_.depthTexture.format===xi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Gn)ke(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,J,he,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,ne,J,he,0);else if(_.depthTexture.format===xi)ke(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,J,he,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,ne,J,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function G(A){const _=i.get(A),F=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const V=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=V}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(F)for(let V=0;V<6;V++)le(_.__webglFramebuffer[V],A,V);else{const V=A.texture.mipmaps;V&&V.length>0?le(_.__webglFramebuffer[0],A,0):le(_.__webglFramebuffer,A,0)}else if(F){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=n.createRenderbuffer(),Se(_.__webglDepthbuffer[V],A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=_.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,he),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,he)}}else{const V=A.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Se(_.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,he),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,he)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ee(A,_,F){const V=i.get(A);_!==void 0&&X(V.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&G(A)}function j(A){const _=A.texture,F=i.get(A),V=i.get(_);A.addEventListener("dispose",v);const Z=A.textures,he=A.isWebGLCubeRenderTarget===!0,pe=Z.length>1;if(pe||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,a.memory.textures++),he){F.__webglFramebuffer=[];for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[J]=[];for(let ne=0;ne<_.mipmaps.length;ne++)F.__webglFramebuffer[J][ne]=n.createFramebuffer()}else F.__webglFramebuffer[J]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let J=0;J<_.mipmaps.length;J++)F.__webglFramebuffer[J]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(pe)for(let J=0,ne=Z.length;J<ne;J++){const _e=i.get(Z[J]);_e.__webglTexture===void 0&&(_e.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&ke(A)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let J=0;J<Z.length;J++){const ne=Z[J];F.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[J]);const _e=s.convert(ne.format,ne.colorSpace),Oe=s.convert(ne.type),Me=x(ne.internalFormat,_e,Oe,ne.normalized,ne.colorSpace,A.isXRRenderTarget===!0),ve=Ne(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,Me,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,F.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),Se(F.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(he){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Ke(n.TEXTURE_CUBE_MAP,_);for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0)for(let ne=0;ne<_.mipmaps.length;ne++)X(F.__webglFramebuffer[J][ne],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ne);else X(F.__webglFramebuffer[J],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);p(_)&&b(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let J=0,ne=Z.length;J<ne;J++){const _e=Z[J],Oe=i.get(_e);let Me=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Me=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Me,Oe.__webglTexture),Ke(Me,_e),X(F.__webglFramebuffer,A,_e,n.COLOR_ATTACHMENT0+J,Me,0),p(_e)&&b(Me)}t.unbindTexture()}else{let J=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(J=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(J,V.__webglTexture),Ke(J,_),_.mipmaps&&_.mipmaps.length>0)for(let ne=0;ne<_.mipmaps.length;ne++)X(F.__webglFramebuffer[ne],A,_,n.COLOR_ATTACHMENT0,J,ne);else X(F.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,J,0);p(_)&&b(J),t.unbindTexture()}A.depthBuffer&&G(A)}function ue(A){const _=A.textures;for(let F=0,V=_.length;F<V;F++){const Z=_[F];if(p(Z)){const he=S(A),pe=i.get(Z).__webglTexture;t.bindTexture(he,pe),b(he),t.unbindTexture()}}}const ae=[],Re=[];function Ee(A){if(A.samples>0){if(ke(A)===!1){const _=A.textures,F=A.width,V=A.height;let Z=n.COLOR_BUFFER_BIT;const he=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(A),J=_.length>1;if(J)for(let _e=0;_e<_.length;_e++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const ne=A.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let _e=0;_e<_.length;_e++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),J){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[_e]);const Oe=i.get(_[_e]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Oe,0)}n.blitFramebuffer(0,0,F,V,0,0,F,V,Z,n.NEAREST),l===!0&&(ae.length=0,Re.length=0,ae.push(n.COLOR_ATTACHMENT0+_e),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ae.push(he),Re.push(he),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Re)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ae))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),J)for(let _e=0;_e<_.length;_e++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,pe.__webglColorRenderbuffer[_e]);const Oe=i.get(_[_e]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,Oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Ne(A){return Math.min(r.maxSamples,A.samples)}function ke(A){const _=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(A){const _=a.render.frame;h.get(A)!==_&&(h.set(A,_),A.update())}function nt(A,_){const F=A.colorSpace,V=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==Ys&&F!==jn&&(et.getTransfer(F)===st?(V!==fn||Z!==Qt)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",F)),_}function Ye(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=Y,this.getTextureUnits=K,this.setTextureUnits=z,this.setTexture2D=ie,this.setTexture2DArray=se,this.setTexture3D=me,this.setTextureCube=fe,this.rebindTextures=ee,this.setupRenderTarget=j,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=G,this.setupFrameBufferTexture=X,this.useMultisampledRTT=ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ty(n,e){function t(i,r=jn){let s;const a=et.getTransfer(r);if(i===Qt)return n.UNSIGNED_BYTE;if(i===zl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===kl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Jh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Zh)return n.BYTE;if(i===Kh)return n.SHORT;if(i===Br)return n.UNSIGNED_SHORT;if(i===Bl)return n.INT;if(i===Tn)return n.UNSIGNED_INT;if(i===hn)return n.FLOAT;if(i===kn)return n.HALF_FLOAT;if(i===jh)return n.ALPHA;if(i===ef)return n.RGB;if(i===fn)return n.RGBA;if(i===Gn)return n.DEPTH_COMPONENT;if(i===xi)return n.DEPTH_STENCIL;if(i===Gl)return n.RED;if(i===Vl)return n.RED_INTEGER;if(i===bi)return n.RG;if(i===Hl)return n.RG_INTEGER;if(i===Wl)return n.RGBA_INTEGER;if(i===Ds||i===Ls||i===Is||i===Ns)if(a===st)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ds)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ds)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ns)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===wo||i===Po||i===Ro||i===Co)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===wo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Po)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ro)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Co)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Do||i===Lo||i===Io||i===No||i===Uo||i===Ws||i===Oo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Do||i===Lo)return a===st?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Io)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===No)return s.COMPRESSED_R11_EAC;if(i===Uo)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ws)return s.COMPRESSED_RG11_EAC;if(i===Oo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Fo||i===Bo||i===zo||i===ko||i===Go||i===Vo||i===Ho||i===Wo||i===Xo||i===qo||i===Yo||i===$o||i===Zo||i===Ko)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Fo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Bo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===zo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ko)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Go)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Vo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ho)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Wo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Yo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$o)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Zo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ko)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Jo||i===Qo||i===jo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Jo)return a===st?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===el||i===tl||i===Xs||i===nl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===el)return s.COMPRESSED_RED_RGTC1_EXT;if(i===tl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===nl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const ny=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ry{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new uf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new An({vertexShader:ny,fragmentShader:iy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yt(new Ti(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sy extends oi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null;const M=typeof XRWebGLBinding<"u",m=new ry,p={},b=t.getContextAttributes();let S=null,x=null;const w=[],T=[],P=new ce;let v=null;const E=new rn;E.viewport=new mt;const R=new rn;R.viewport=new mt;const C=[E,R],N=new d0;let Y=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let de=w[Q];return de===void 0&&(de=new Ca,w[Q]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Q){let de=w[Q];return de===void 0&&(de=new Ca,w[Q]=de),de.getGripSpace()},this.getHand=function(Q){let de=w[Q];return de===void 0&&(de=new Ca,w[Q]=de),de.getHandSpace()};function z(Q){const de=T.indexOf(Q.inputSource);if(de===-1)return;const oe=w[de];oe!==void 0&&(oe.update(Q.inputSource,Q.frame,c||a),oe.dispatchEvent({type:Q.type,data:Q.inputSource}))}function $(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",k);for(let Q=0;Q<w.length;Q++){const de=T[Q];de!==null&&(T[Q]=null,w[Q].disconnect(de))}Y=null,K=null,m.reset();for(const Q in p)delete p[Q];e.setRenderTarget(S),d=null,u=null,f=null,r=null,x=null,Ke.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",$),r.addEventListener("inputsourceschange",k),b.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,D=null,B=null;b.depth&&(B=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=b.stencil?xi:Gn,D=b.stencil?zr:Tn);const X={colorFormat:t.RGBA8,depthFormat:B,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(X),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new En(u.textureWidth,u.textureHeight,{format:fn,type:Qt,depthTexture:new cr(u.textureWidth,u.textureHeight,D,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const oe={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new En(d.framebufferWidth,d.framebufferHeight,{format:fn,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ke.setContext(r),Ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(Q){for(let de=0;de<Q.removed.length;de++){const oe=Q.removed[de],D=T.indexOf(oe);D>=0&&(T[D]=null,w[D].disconnect(oe))}for(let de=0;de<Q.added.length;de++){const oe=Q.added[de];let D=T.indexOf(oe);if(D===-1){for(let X=0;X<w.length;X++)if(X>=T.length){T.push(oe),D=X;break}else if(T[X]===null){T[X]=oe,D=X;break}if(D===-1)break}const B=w[D];B&&B.connect(oe)}}const ie=new I,se=new I;function me(Q,de,oe){ie.setFromMatrixPosition(de.matrixWorld),se.setFromMatrixPosition(oe.matrixWorld);const D=ie.distanceTo(se),B=de.projectionMatrix.elements,X=oe.projectionMatrix.elements,Se=B[14]/(B[10]-1),le=B[14]/(B[10]+1),G=(B[9]+1)/B[5],ee=(B[9]-1)/B[5],j=(B[8]-1)/B[0],ue=(X[8]+1)/X[0],ae=Se*j,Re=Se*ue,Ee=D/(-j+ue),Ne=Ee*-j;if(de.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ne),Q.translateZ(Ee),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),B[10]===-1)Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const ke=Se+Ee,L=le+Ee,nt=ae-Ne,Ye=Re+(D-Ne),A=G*le/L*ke,_=ee*le/L*ke;Q.projectionMatrix.makePerspective(nt,Ye,A,_,ke,L),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function fe(Q,de){de===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(de.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let de=Q.near,oe=Q.far;m.texture!==null&&(m.depthNear>0&&(de=m.depthNear),m.depthFar>0&&(oe=m.depthFar)),N.near=R.near=E.near=de,N.far=R.far=E.far=oe,(Y!==N.near||K!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),Y=N.near,K=N.far),N.layers.mask=Q.layers.mask|6,E.layers.mask=N.layers.mask&-5,R.layers.mask=N.layers.mask&-3;const D=Q.parent,B=N.cameras;fe(N,D);for(let X=0;X<B.length;X++)fe(B[X],D);B.length===2?me(N,E,R):N.projectionMatrix.copy(E.projectionMatrix),Pe(Q,N,D)};function Pe(Q,de,oe){oe===null?Q.matrix.copy(de.matrixWorld):(Q.matrix.copy(oe.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(de.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Gr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(Q){return p[Q]};let qe=null;function rt(Q,de){if(h=de.getViewerPose(c||a),g=de,h!==null){const oe=h.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let D=!1;oe.length!==N.cameras.length&&(N.cameras.length=0,D=!0);for(let le=0;le<oe.length;le++){const G=oe[le];let ee=null;if(d!==null)ee=d.getViewport(G);else{const ue=f.getViewSubImage(u,G);ee=ue.viewport,le===0&&(e.setRenderTargetTextures(x,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(x))}let j=C[le];j===void 0&&(j=new rn,j.layers.enable(le),j.viewport=new mt,C[le]=j),j.matrix.fromArray(G.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(G.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(ee.x,ee.y,ee.width,ee.height),le===0&&(N.matrix.copy(j.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),D===!0&&N.cameras.push(j)}const B=r.enabledFeatures;if(B&&B.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const le=f.getDepthInformation(oe[0]);le&&le.isValid&&le.texture&&m.init(le,r.renderState)}if(B&&B.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let le=0;le<oe.length;le++){const G=oe[le].camera;if(G){let ee=p[G];ee||(ee=new uf,p[G]=ee);const j=f.getCameraImage(G);ee.sourceTexture=j}}}}for(let oe=0;oe<w.length;oe++){const D=T[oe],B=w[oe];D!==null&&B!==void 0&&B.update(D,de,c||a)}qe&&qe(Q,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),g=null}const Ke=new Sf;Ke.setAnimationLoop(rt),this.setAnimationLoop=function(Q){qe=Q},this.dispose=function(){}}}const ay=new ut,Rf=new He;Rf.set(-1,0,0,0,1,0,0,0,1);function oy(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,xf(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,S,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),M(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),S=b.envMap,x=b.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(ay.makeRotationFromEuler(x)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Rf),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ly(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,w){const T=w.program;i.uniformBlockBinding(x,T)}function c(x,w){let T=r[x.id];T===void 0&&(m(x),T=h(x),r[x.id]=T,x.addEventListener("dispose",b));const P=w.program;i.updateUBOMapping(x,P);const v=e.render.frame;s[x.id]!==v&&(u(x),s[x.id]=v)}function h(x){const w=f();x.__bindingPointIndex=w;const T=n.createBuffer(),P=x.__size,v=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,P,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,T),T}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const w=r[x.id],T=x.uniforms,P=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let v=0,E=T.length;v<E;v++){const R=T[v];if(Array.isArray(R))for(let C=0,N=R.length;C<N;C++)d(R[C],v,C,P);else d(R,v,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,w,T,P){if(M(x,w,T,P)===!0){const v=x.__offset,E=x.value;if(Array.isArray(E)){let R=0;for(let C=0;C<E.length;C++){const N=E[C],Y=p(N);g(N,x.__data,R),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(R+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,x.__data)}}function g(x,w,T){typeof x=="number"||typeof x=="boolean"?w[0]=x:x.isMatrix3?(w[0]=x.elements[0],w[1]=x.elements[1],w[2]=x.elements[2],w[3]=0,w[4]=x.elements[3],w[5]=x.elements[4],w[6]=x.elements[5],w[7]=0,w[8]=x.elements[6],w[9]=x.elements[7],w[10]=x.elements[8],w[11]=0):ArrayBuffer.isView(x)?w.set(new x.constructor(x.buffer,x.byteOffset,w.length)):x.toArray(w,T)}function M(x,w,T,P){const v=x.value,E=w+"_"+T;if(P[E]===void 0)return typeof v=="number"||typeof v=="boolean"?P[E]=v:ArrayBuffer.isView(v)?P[E]=v.slice():P[E]=v.clone(),!0;{const R=P[E];if(typeof v=="number"||typeof v=="boolean"){if(R!==v)return P[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(R.equals(v)===!1)return R.copy(v),!0}}return!1}function m(x){const w=x.uniforms;let T=0;const P=16;for(let E=0,R=w.length;E<R;E++){const C=Array.isArray(w[E])?w[E]:[w[E]];for(let N=0,Y=C.length;N<Y;N++){const K=C[N],z=Array.isArray(K.value)?K.value:[K.value];for(let $=0,k=z.length;$<k;$++){const ie=z[$],se=p(ie),me=T%P,fe=me%se.boundary,Pe=me+fe;T+=fe,Pe!==0&&P-Pe<se.storage&&(T+=P-Pe),K.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=T,T+=se.storage}}}const v=T%P;return v>0&&(T+=P-v),x.__size=T,x.__cache={},this}function p(x){const w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(w.boundary=16,w.storage=x.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",x),w}function b(x){const w=x.target;w.removeEventListener("dispose",b);const T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function S(){for(const x in r)n.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:S}}const cy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _n=null;function uy(){return _n===null&&(_n=new lf(cy,16,16,bi,kn),_n.name="DFG_LUT",_n.minFilter=Ft,_n.magFilter=Ft,_n.wrapS=On,_n.wrapT=On,_n.generateMipmaps=!1,_n.needsUpdate=!0),_n}class hy{constructor(e={}){const{canvas:t=Cm(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Qt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const M=d,m=new Set([Wl,Hl,Vl]),p=new Set([Qt,Tn,Br,zr,zl,kl]),b=new Uint32Array(4),S=new Int32Array(4),x=new I;let w=null,T=null;const P=[],v=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let C=!1,N=null,Y=null,K=null,z=null;this._outputColorSpace=Jt;let $=0,k=0,ie=null,se=-1,me=null;const fe=new mt,Pe=new mt;let qe=null;const rt=new Qe(0);let Ke=0,Q=t.width,de=t.height,oe=1,D=null,B=null;const X=new mt(0,0,Q,de),Se=new mt(0,0,Q,de);let le=!1;const G=new Ql;let ee=!1,j=!1;const ue=new ut,ae=new I,Re=new mt,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ne=!1;function ke(){return ie===null?oe:1}let L=i;function nt(y,O){return t.getContext(y,O)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ul}`),t.addEventListener("webglcontextlost",_t,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",dn,!1),L===null){const O="webgl2";if(L=nt(O,y),L===null)throw nt(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw je("WebGLRenderer: "+y.message),y}let Ye,A,_,F,V,Z,he,pe,J,ne,_e,Oe,Me,ve,ze,Ge,We,U,ge,te,xe,Ae,re;function Ue(){Ye=new ux(L),Ye.init(),xe=new ty(L,Ye),A=new nx(L,Ye,e,xe),_=new jM(L,Ye),A.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),Y=L.createFramebuffer(),K=L.createFramebuffer(),z=L.createFramebuffer(),F=new dx(L),V=new zM,Z=new ey(L,Ye,_,V,A,xe,F),he=new cx(R),pe=new _0(L),Ae=new ex(L,pe),J=new hx(L,pe,F,Ae),ne=new mx(L,J,pe,Ae,F),U=new px(L,A,Z),ze=new ix(V),_e=new BM(R,he,Ye,A,Ae,ze),Oe=new oy(R,V),Me=new GM,ve=new YM(Ye),We=new jv(R,he,_,ne,g,l),Ge=new QM(R,ne,A),re=new ly(L,F,A,_),ge=new tx(L,Ye,F),te=new fx(L,Ye,F),F.programs=_e.programs,R.capabilities=A,R.extensions=Ye,R.properties=V,R.renderLists=Me,R.shadowMap=Ge,R.state=_,R.info=F}Ue(),M!==Qt&&(E=new _x(M,t.width,t.height,o,r,s));const Le=new sy(R,L);this.xr=Le,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const y=Ye.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ye.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(y){y!==void 0&&(oe=y,this.setSize(Q,de,!1))},this.getSize=function(y){return y.set(Q,de)},this.setSize=function(y,O,q=!0){if(Le.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=y,de=O,t.width=Math.floor(y*oe),t.height=Math.floor(O*oe),q===!0&&(t.style.width=y+"px",t.style.height=O+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,y,O)},this.getDrawingBufferSize=function(y){return y.set(Q*oe,de*oe).floor()},this.setDrawingBufferSize=function(y,O,q){Q=y,de=O,oe=q,t.width=Math.floor(y*q),t.height=Math.floor(O*q),this.setViewport(0,0,y,O)},this.setEffects=function(y){if(M===Qt){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let O=0;O<y.length;O++)if(y[O].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(fe)},this.getViewport=function(y){return y.copy(X)},this.setViewport=function(y,O,q,H){y.isVector4?X.set(y.x,y.y,y.z,y.w):X.set(y,O,q,H),_.viewport(fe.copy(X).multiplyScalar(oe).round())},this.getScissor=function(y){return y.copy(Se)},this.setScissor=function(y,O,q,H){y.isVector4?Se.set(y.x,y.y,y.z,y.w):Se.set(y,O,q,H),_.scissor(Pe.copy(Se).multiplyScalar(oe).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(y){_.setScissorTest(le=y)},this.setOpaqueSort=function(y){D=y},this.setTransparentSort=function(y){B=y},this.getClearColor=function(y){return y.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(y=!0,O=!0,q=!0){let H=0;if(y){let W=!1;if(ie!==null){const Te=ie.texture.format;W=m.has(Te)}if(W){const Te=ie.texture.type,De=p.has(Te),be=We.getClearColor(),Ie=We.getClearAlpha(),Fe=be.r,Xe=be.g,Je=be.b;De?(b[0]=Fe,b[1]=Xe,b[2]=Je,b[3]=Ie,L.clearBufferuiv(L.COLOR,0,b)):(S[0]=Fe,S[1]=Xe,S[2]=Je,S[3]=Ie,L.clearBufferiv(L.COLOR,0,S))}else H|=L.COLOR_BUFFER_BIT}O&&(H|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),N=y},this.dispose=function(){t.removeEventListener("webglcontextlost",_t,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",dn,!1),We.dispose(),Me.dispose(),ve.dispose(),V.dispose(),he.dispose(),ne.dispose(),Ae.dispose(),re.dispose(),_e.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",gc),Le.removeEventListener("sessionend",_c),ci.stop()};function _t(y){y.preventDefault(),nu("WebGLRenderer: Context Lost."),C=!0}function ht(){nu("WebGLRenderer: Context Restored."),C=!1;const y=F.autoReset,O=Ge.enabled,q=Ge.autoUpdate,H=Ge.needsUpdate,W=Ge.type;Ue(),F.autoReset=y,Ge.enabled=O,Ge.autoUpdate=q,Ge.needsUpdate=H,Ge.type=W}function dn(y){je("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function pn(y){const O=y.target;O.removeEventListener("dispose",pn),qf(O)}function qf(y){Yf(y),V.remove(y)}function Yf(y){const O=V.get(y).programs;O!==void 0&&(O.forEach(function(q){_e.releaseProgram(q)}),y.isShaderMaterial&&_e.releaseShaderCache(y))}this.renderBufferDirect=function(y,O,q,H,W,Te){O===null&&(O=Ee);const De=W.isMesh&&W.matrixWorld.determinantAffine()<0,be=Kf(y,O,q,H,W);_.setMaterial(H,De);let Ie=q.index,Fe=1;if(H.wireframe===!0){if(Ie=J.getWireframeAttribute(q),Ie===void 0)return;Fe=2}const Xe=q.drawRange,Je=q.attributes.position;let Be=Xe.start*Fe,at=(Xe.start+Xe.count)*Fe;Te!==null&&(Be=Math.max(Be,Te.start*Fe),at=Math.min(at,(Te.start+Te.count)*Fe)),Ie!==null?(Be=Math.max(Be,0),at=Math.min(at,Ie.count)):Je!=null&&(Be=Math.max(Be,0),at=Math.min(at,Je.count));const St=at-Be;if(St<0||St===1/0)return;Ae.setup(W,H,be,q,Ie);let vt,lt=ge;if(Ie!==null&&(vt=pe.get(Ie),lt=te,lt.setIndex(vt)),W.isMesh)H.wireframe===!0?(_.setLineWidth(H.wireframeLinewidth*ke()),lt.setMode(L.LINES)):lt.setMode(L.TRIANGLES);else if(W.isLine){let Lt=H.linewidth;Lt===void 0&&(Lt=1),_.setLineWidth(Lt*ke()),W.isLineSegments?lt.setMode(L.LINES):W.isLineLoop?lt.setMode(L.LINE_LOOP):lt.setMode(L.LINE_STRIP)}else W.isPoints?lt.setMode(L.POINTS):W.isSprite&&lt.setMode(L.TRIANGLES);if(W.isBatchedMesh)if(Ye.get("WEBGL_multi_draw"))lt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Lt=W._multiDrawStarts,Ce=W._multiDrawCounts,Yt=W._multiDrawCount,tt=Ie?pe.get(Ie).bytesPerElement:1,tn=V.get(H).currentProgram.getUniforms();for(let mn=0;mn<Yt;mn++)tn.setValue(L,"_gl_DrawID",mn),lt.render(Lt[mn]/tt,Ce[mn])}else if(W.isInstancedMesh)lt.renderInstances(Be,St,W.count);else if(q.isInstancedBufferGeometry){const Lt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ce=Math.min(q.instanceCount,Lt);lt.renderInstances(Be,St,Ce)}else lt.render(Be,St)};function mc(y,O,q){y.transparent===!0&&y.side===Un&&y.forceSinglePass===!1?(y.side=Ht,y.needsUpdate=!0,jr(y,O,q),y.side=si,y.needsUpdate=!0,jr(y,O,q),y.side=Un):jr(y,O,q)}this.compile=function(y,O,q=null){q===null&&(q=y),T=ve.get(q),T.init(O),v.push(T),q.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),y!==q&&y.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),T.setupLights();const H=new Set;return y.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Te=W.material;if(Te)if(Array.isArray(Te))for(let De=0;De<Te.length;De++){const be=Te[De];mc(be,q,W),H.add(be)}else mc(Te,q,W),H.add(Te)}),T=v.pop(),H},this.compileAsync=function(y,O,q=null){const H=this.compile(y,O,q);return new Promise(W=>{function Te(){if(H.forEach(function(De){V.get(De).currentProgram.isReady()&&H.delete(De)}),H.size===0){W(y);return}setTimeout(Te,10)}Ye.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let ha=null;function $f(y){ha&&ha(y)}function gc(){ci.stop()}function _c(){ci.start()}const ci=new Sf;ci.setAnimationLoop($f),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(y){ha=y,Le.setAnimationLoop(y),y===null?ci.stop():ci.start()},Le.addEventListener("sessionstart",gc),Le.addEventListener("sessionend",_c),this.render=function(y,O){if(O!==void 0&&O.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(y,O);const q=Le.enabled===!0&&Le.isPresenting===!0,H=E!==null&&(ie===null||q)&&E.begin(R,ie);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(O),O=Le.getCamera()),y.isScene===!0&&y.onBeforeRender(R,y,O,ie),T=ve.get(y,v.length),T.init(O),T.state.textureUnits=Z.getTextureUnits(),v.push(T),ue.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),G.setFromProjectionMatrix(ue,yn,O.reversedDepth),j=this.localClippingEnabled,ee=ze.init(this.clippingPlanes,j),w=Me.get(y,P.length),w.init(),P.push(w),Le.enabled===!0&&Le.isPresenting===!0){const De=R.xr.getDepthSensingMesh();De!==null&&fa(De,O,-1/0,R.sortObjects)}fa(y,O,0,R.sortObjects),w.finish(),R.sortObjects===!0&&w.sort(D,B,O.reversedDepth),Ne=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,Ne&&We.addToRenderList(w,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ee===!0&&ze.beginShadows();const W=T.state.shadowsArray;if(Ge.render(W,y,O),ee===!0&&ze.endShadows(),(H&&E.hasRenderPass())===!1){const De=w.opaque,be=w.transmissive;if(T.setupLights(),O.isArrayCamera){const Ie=O.cameras;if(be.length>0)for(let Fe=0,Xe=Ie.length;Fe<Xe;Fe++){const Je=Ie[Fe];xc(De,be,y,Je)}Ne&&We.render(y);for(let Fe=0,Xe=Ie.length;Fe<Xe;Fe++){const Je=Ie[Fe];vc(w,y,Je,Je.viewport)}}else be.length>0&&xc(De,be,y,O),Ne&&We.render(y),vc(w,y,O)}ie!==null&&k===0&&(Z.updateMultisampleRenderTarget(ie),Z.updateRenderTargetMipmap(ie)),H&&E.end(R),y.isScene===!0&&y.onAfterRender(R,y,O),Ae.resetDefaultState(),se=-1,me=null,v.pop(),v.length>0?(T=v[v.length-1],Z.setTextureUnits(T.state.textureUnits),ee===!0&&ze.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,N!==null&&N.renderEnd()};function fa(y,O,q,H){if(y.visible===!1)return;if(y.layers.test(O.layers)){if(y.isGroup)q=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(O);else if(y.isLightProbeGrid)T.pushLightProbeGrid(y);else if(y.isLight)T.pushLight(y),y.castShadow&&T.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||G.intersectsSprite(y)){H&&Re.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ue);const De=ne.update(y),be=y.material;be.visible&&w.push(y,De,be,q,Re.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||G.intersectsObject(y))){const De=ne.update(y),be=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Re.copy(y.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Re.copy(De.boundingSphere.center)),Re.applyMatrix4(y.matrixWorld).applyMatrix4(ue)),Array.isArray(be)){const Ie=De.groups;for(let Fe=0,Xe=Ie.length;Fe<Xe;Fe++){const Je=Ie[Fe],Be=be[Je.materialIndex];Be&&Be.visible&&w.push(y,De,Be,q,Re.z,Je)}}else be.visible&&w.push(y,De,be,q,Re.z,null)}}const Te=y.children;for(let De=0,be=Te.length;De<be;De++)fa(Te[De],O,q,H)}function vc(y,O,q,H){const{opaque:W,transmissive:Te,transparent:De}=y;T.setupLightsView(q),ee===!0&&ze.setGlobalState(R.clippingPlanes,q),H&&_.viewport(fe.copy(H)),W.length>0&&Qr(W,O,q),Te.length>0&&Qr(Te,O,q),De.length>0&&Qr(De,O,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function xc(y,O,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){const Be=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new En(1,1,{generateMipmaps:!0,type:Be?kn:Qt,minFilter:vi,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace})}const Te=T.state.transmissionRenderTarget[H.id],De=H.viewport||fe;Te.setSize(De.z*R.transmissionResolutionScale,De.w*R.transmissionResolutionScale);const be=R.getRenderTarget(),Ie=R.getActiveCubeFace(),Fe=R.getActiveMipmapLevel();R.setRenderTarget(Te),R.getClearColor(rt),Ke=R.getClearAlpha(),Ke<1&&R.setClearColor(16777215,.5),R.clear(),Ne&&We.render(q);const Xe=R.toneMapping;R.toneMapping=bn;const Je=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),ee===!0&&ze.setGlobalState(R.clippingPlanes,H),Qr(y,q,H),Z.updateMultisampleRenderTarget(Te),Z.updateRenderTargetMipmap(Te),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let at=0,St=O.length;at<St;at++){const vt=O[at],{object:lt,geometry:Lt,material:Ce,group:Yt}=vt;if(Ce.side===Un&&lt.layers.test(H.layers)){const tt=Ce.side;Ce.side=Ht,Ce.needsUpdate=!0,Mc(lt,q,H,Lt,Ce,Yt),Ce.side=tt,Ce.needsUpdate=!0,Be=!0}}Be===!0&&(Z.updateMultisampleRenderTarget(Te),Z.updateRenderTargetMipmap(Te))}R.setRenderTarget(be,Ie,Fe),R.setClearColor(rt,Ke),Je!==void 0&&(H.viewport=Je),R.toneMapping=Xe}function Qr(y,O,q){const H=O.isScene===!0?O.overrideMaterial:null;for(let W=0,Te=y.length;W<Te;W++){const De=y[W],{object:be,geometry:Ie,group:Fe}=De;let Xe=De.material;Xe.allowOverride===!0&&H!==null&&(Xe=H),be.layers.test(q.layers)&&Mc(be,O,q,Ie,Xe,Fe)}}function Mc(y,O,q,H,W,Te){y.onBeforeRender(R,O,q,H,W,Te),y.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),W.onBeforeRender(R,O,q,H,y,Te),W.transparent===!0&&W.side===Un&&W.forceSinglePass===!1?(W.side=Ht,W.needsUpdate=!0,R.renderBufferDirect(q,O,H,W,y,Te),W.side=si,W.needsUpdate=!0,R.renderBufferDirect(q,O,H,W,y,Te),W.side=Un):R.renderBufferDirect(q,O,H,W,y,Te),y.onAfterRender(R,O,q,H,W,Te)}function jr(y,O,q){O.isScene!==!0&&(O=Ee);const H=V.get(y),W=T.state.lights,Te=T.state.shadowsArray,De=W.state.version,be=_e.getParameters(y,W.state,Te,O,q,T.state.lightProbeGridArray),Ie=_e.getProgramCacheKey(be);let Fe=H.programs;H.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?O.environment:null,H.fog=O.fog;const Xe=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;H.envMap=he.get(y.envMap||H.environment,Xe),H.envMapRotation=H.environment!==null&&y.envMap===null?O.environmentRotation:y.envMapRotation,Fe===void 0&&(y.addEventListener("dispose",pn),Fe=new Map,H.programs=Fe);let Je=Fe.get(Ie);if(Je!==void 0){if(H.currentProgram===Je&&H.lightsStateVersion===De)return Sc(y,be),Je}else be.uniforms=_e.getUniforms(y),N!==null&&y.isNodeMaterial&&N.build(y,q,be),y.onBeforeCompile(be,R),Je=_e.acquireProgram(be,Ie),Fe.set(Ie,Je),H.uniforms=be.uniforms;const Be=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Be.clippingPlanes=ze.uniform),Sc(y,be),H.needsLights=Qf(y),H.lightsStateVersion=De,H.needsLights&&(Be.ambientLightColor.value=W.state.ambient,Be.lightProbe.value=W.state.probe,Be.directionalLights.value=W.state.directional,Be.directionalLightShadows.value=W.state.directionalShadow,Be.spotLights.value=W.state.spot,Be.spotLightShadows.value=W.state.spotShadow,Be.rectAreaLights.value=W.state.rectArea,Be.ltc_1.value=W.state.rectAreaLTC1,Be.ltc_2.value=W.state.rectAreaLTC2,Be.pointLights.value=W.state.point,Be.pointLightShadows.value=W.state.pointShadow,Be.hemisphereLights.value=W.state.hemi,Be.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Be.spotLightMatrix.value=W.state.spotLightMatrix,Be.spotLightMap.value=W.state.spotLightMap,Be.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=T.state.lightProbeGridArray.length>0,H.currentProgram=Je,H.uniformsList=null,Je}function yc(y){if(y.uniformsList===null){const O=y.currentProgram.getUniforms();y.uniformsList=Os.seqWithValue(O.seq,y.uniforms)}return y.uniformsList}function Sc(y,O){const q=V.get(y);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function Zf(y,O){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let q=0,H=y.length;q<H;q++){const W=y[q];if(W.texture!==null&&W.boundingBox.containsPoint(x))return W}return null}function Kf(y,O,q,H,W){O.isScene!==!0&&(O=Ee),Z.resetTextureUnits();const Te=O.fog,De=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?O.environment:null,be=ie===null?R.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:et.workingColorSpace,Ie=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Fe=he.get(H.envMap||De,Ie),Xe=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Je=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Be=!!q.morphAttributes.position,at=!!q.morphAttributes.normal,St=!!q.morphAttributes.color;let vt=bn;H.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(vt=R.toneMapping);const lt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Lt=lt!==void 0?lt.length:0,Ce=V.get(H),Yt=T.state.lights;if(ee===!0&&(j===!0||y!==me)){const ft=y===me&&H.id===se;ze.setState(H,y,ft)}let tt=!1;H.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Yt.state.version||Ce.outputColorSpace!==be||W.isBatchedMesh&&Ce.batching===!1||!W.isBatchedMesh&&Ce.batching===!0||W.isBatchedMesh&&Ce.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ce.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ce.instancing===!1||!W.isInstancedMesh&&Ce.instancing===!0||W.isSkinnedMesh&&Ce.skinning===!1||!W.isSkinnedMesh&&Ce.skinning===!0||W.isInstancedMesh&&Ce.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ce.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ce.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ce.instancingMorph===!1&&W.morphTexture!==null||Ce.envMap!==Fe||H.fog===!0&&Ce.fog!==Te||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ze.numPlanes||Ce.numIntersection!==ze.numIntersection)||Ce.vertexAlphas!==Xe||Ce.vertexTangents!==Je||Ce.morphTargets!==Be||Ce.morphNormals!==at||Ce.morphColors!==St||Ce.toneMapping!==vt||Ce.morphTargetsCount!==Lt||!!Ce.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,Ce.__version=H.version);let tn=Ce.currentProgram;tt===!0&&(tn=jr(H,O,W),N&&H.isNodeMaterial&&N.onUpdateProgram(H,tn,Ce));let mn=!1,Hn=!1,Di=!1;const ct=tn.getUniforms(),bt=Ce.uniforms;if(_.useProgram(tn.program)&&(mn=!0,Hn=!0,Di=!0),H.id!==se&&(se=H.id,Hn=!0),Ce.needsLights){const ft=Zf(T.state.lightProbeGridArray,W);Ce.lightProbeGrid!==ft&&(Ce.lightProbeGrid=ft,Hn=!0)}if(mn||me!==y){_.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ct.setValue(L,"projectionMatrix",y.projectionMatrix),ct.setValue(L,"viewMatrix",y.matrixWorldInverse);const Xn=ct.map.cameraPosition;Xn!==void 0&&Xn.setValue(L,ae.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&ct.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ct.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),me!==y&&(me=y,Hn=!0,Di=!0)}if(Ce.needsLights&&(Yt.state.directionalShadowMap.length>0&&ct.setValue(L,"directionalShadowMap",Yt.state.directionalShadowMap,Z),Yt.state.spotShadowMap.length>0&&ct.setValue(L,"spotShadowMap",Yt.state.spotShadowMap,Z),Yt.state.pointShadowMap.length>0&&ct.setValue(L,"pointShadowMap",Yt.state.pointShadowMap,Z)),W.isSkinnedMesh){ct.setOptional(L,W,"bindMatrix"),ct.setOptional(L,W,"bindMatrixInverse");const ft=W.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ct.setValue(L,"boneTexture",ft.boneTexture,Z))}W.isBatchedMesh&&(ct.setOptional(L,W,"batchingTexture"),ct.setValue(L,"batchingTexture",W._matricesTexture,Z),ct.setOptional(L,W,"batchingIdTexture"),ct.setValue(L,"batchingIdTexture",W._indirectTexture,Z),ct.setOptional(L,W,"batchingColorTexture"),W._colorsTexture!==null&&ct.setValue(L,"batchingColorTexture",W._colorsTexture,Z));const Wn=q.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&U.update(W,q,tn),(Hn||Ce.receiveShadow!==W.receiveShadow)&&(Ce.receiveShadow=W.receiveShadow,ct.setValue(L,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&O.environment!==null&&(bt.envMapIntensity.value=O.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=uy()),Hn){if(ct.setValue(L,"toneMappingExposure",R.toneMappingExposure),Ce.needsLights&&Jf(bt,Di),Te&&H.fog===!0&&Oe.refreshFogUniforms(bt,Te),Oe.refreshMaterialUniforms(bt,H,oe,de,T.state.transmissionRenderTarget[y.id]),Ce.needsLights&&Ce.lightProbeGrid){const ft=Ce.lightProbeGrid;bt.probesSH.value=ft.texture,bt.probesMin.value.copy(ft.boundingBox.min),bt.probesMax.value.copy(ft.boundingBox.max),bt.probesResolution.value.copy(ft.resolution)}Os.upload(L,yc(Ce),bt,Z)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Os.upload(L,yc(Ce),bt,Z),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ct.setValue(L,"center",W.center),ct.setValue(L,"modelViewMatrix",W.modelViewMatrix),ct.setValue(L,"normalMatrix",W.normalMatrix),ct.setValue(L,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){const ft=H.uniformsGroups;for(let Xn=0,Li=ft.length;Xn<Li;Xn++){const bc=ft[Xn];re.update(bc,tn),re.bind(bc,tn)}}return tn}function Jf(y,O){y.ambientLightColor.needsUpdate=O,y.lightProbe.needsUpdate=O,y.directionalLights.needsUpdate=O,y.directionalLightShadows.needsUpdate=O,y.pointLights.needsUpdate=O,y.pointLightShadows.needsUpdate=O,y.spotLights.needsUpdate=O,y.spotLightShadows.needsUpdate=O,y.rectAreaLights.needsUpdate=O,y.hemisphereLights.needsUpdate=O}function Qf(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(y,O,q){const H=V.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),V.get(y.texture).__webglTexture=O,V.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,O){const q=V.get(y);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(y,O=0,q=0){ie=y,$=O,k=q;let H=null,W=!1,Te=!1;if(y){const be=V.get(y);if(be.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,be.__webglFramebuffer),fe.copy(y.viewport),Pe.copy(y.scissor),qe=y.scissorTest,_.viewport(fe),_.scissor(Pe),_.setScissorTest(qe),se=-1;return}else if(be.__webglFramebuffer===void 0)Z.setupRenderTarget(y);else if(be.__hasExternalTextures)Z.rebindTextures(y,V.get(y.texture).__webglTexture,V.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Xe=y.depthTexture;if(be.__boundDepthTexture!==Xe){if(Xe!==null&&V.has(Xe)&&(y.width!==Xe.image.width||y.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(y)}}const Ie=y.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(Te=!0);const Fe=V.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Fe[O])?H=Fe[O][q]:H=Fe[O],W=!0):y.samples>0&&Z.useMultisampledRTT(y)===!1?H=V.get(y).__webglMultisampledFramebuffer:Array.isArray(Fe)?H=Fe[q]:H=Fe,fe.copy(y.viewport),Pe.copy(y.scissor),qe=y.scissorTest}else fe.copy(X).multiplyScalar(oe).floor(),Pe.copy(Se).multiplyScalar(oe).floor(),qe=le;if(q!==0&&(H=Y),_.bindFramebuffer(L.FRAMEBUFFER,H)&&_.drawBuffers(y,H),_.viewport(fe),_.scissor(Pe),_.setScissorTest(qe),W){const be=V.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,be.__webglTexture,q)}else if(Te){const be=O;for(let Ie=0;Ie<y.textures.length;Ie++){const Fe=V.get(y.textures[Ie]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Ie,Fe.__webglTexture,q,be)}}else if(y!==null&&q!==0){const be=V.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,be.__webglTexture,q)}se=-1},this.readRenderTargetPixels=function(y,O,q,H,W,Te,De,be=0){if(!(y&&y.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&De!==void 0&&(Ie=Ie[De]),Ie){_.bindFramebuffer(L.FRAMEBUFFER,Ie);try{const Fe=y.textures[be],Xe=Fe.format,Je=Fe.type;if(y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be),!A.textureFormatReadable(Xe)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Je)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=y.width-H&&q>=0&&q<=y.height-W&&L.readPixels(O,q,H,W,xe.convert(Xe),xe.convert(Je),Te)}finally{const Fe=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(y,O,q,H,W,Te,De,be=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&De!==void 0&&(Ie=Ie[De]),Ie)if(O>=0&&O<=y.width-H&&q>=0&&q<=y.height-W){_.bindFramebuffer(L.FRAMEBUFFER,Ie);const Fe=y.textures[be],Xe=Fe.format,Je=Fe.type;if(y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be),!A.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Be=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Be),L.bufferData(L.PIXEL_PACK_BUFFER,Te.byteLength,L.STREAM_READ),L.readPixels(O,q,H,W,xe.convert(Xe),xe.convert(Je),0);const at=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,at);const St=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Dm(L,St,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Be),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Te),L.deleteBuffer(Be),L.deleteSync(St),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,O=null,q=0){const H=Math.pow(2,-q),W=Math.floor(y.image.width*H),Te=Math.floor(y.image.height*H),De=O!==null?O.x:0,be=O!==null?O.y:0;Z.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,q,0,0,De,be,W,Te),_.unbindTexture()},this.copyTextureToTexture=function(y,O,q=null,H=null,W=0,Te=0){let De,be,Ie,Fe,Xe,Je,Be,at,St;const vt=y.isCompressedTexture?y.mipmaps[Te]:y.image;if(q!==null)De=q.max.x-q.min.x,be=q.max.y-q.min.y,Ie=q.isBox3?q.max.z-q.min.z:1,Fe=q.min.x,Xe=q.min.y,Je=q.isBox3?q.min.z:0;else{const bt=Math.pow(2,-W);De=Math.floor(vt.width*bt),be=Math.floor(vt.height*bt),y.isDataArrayTexture?Ie=vt.depth:y.isData3DTexture?Ie=Math.floor(vt.depth*bt):Ie=1,Fe=0,Xe=0,Je=0}H!==null?(Be=H.x,at=H.y,St=H.z):(Be=0,at=0,St=0);const lt=xe.convert(O.format),Lt=xe.convert(O.type);let Ce;O.isData3DTexture?(Z.setTexture3D(O,0),Ce=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Z.setTexture2DArray(O,0),Ce=L.TEXTURE_2D_ARRAY):(Z.setTexture2D(O,0),Ce=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const Yt=_.getParameter(L.UNPACK_ROW_LENGTH),tt=_.getParameter(L.UNPACK_IMAGE_HEIGHT),tn=_.getParameter(L.UNPACK_SKIP_PIXELS),mn=_.getParameter(L.UNPACK_SKIP_ROWS),Hn=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,vt.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,vt.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Fe),_.pixelStorei(L.UNPACK_SKIP_ROWS,Xe),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Je);const Di=y.isDataArrayTexture||y.isData3DTexture,ct=O.isDataArrayTexture||O.isData3DTexture;if(y.isDepthTexture){const bt=V.get(y),Wn=V.get(O),ft=V.get(bt.__renderTarget),Xn=V.get(Wn.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,ft.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let Li=0;Li<Ie;Li++)Di&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(y).__webglTexture,W,Je+Li),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(O).__webglTexture,Te,St+Li)),L.blitFramebuffer(Fe,Xe,De,be,Be,at,De,be,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(W!==0||y.isRenderTargetTexture||V.has(y)){const bt=V.get(y),Wn=V.get(O);_.bindFramebuffer(L.READ_FRAMEBUFFER,K),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,z);for(let ft=0;ft<Ie;ft++)Di?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,bt.__webglTexture,W,Je+ft):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,bt.__webglTexture,W),ct?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Wn.__webglTexture,Te,St+ft):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Wn.__webglTexture,Te),W!==0?L.blitFramebuffer(Fe,Xe,De,be,Be,at,De,be,L.COLOR_BUFFER_BIT,L.NEAREST):ct?L.copyTexSubImage3D(Ce,Te,Be,at,St+ft,Fe,Xe,De,be):L.copyTexSubImage2D(Ce,Te,Be,at,Fe,Xe,De,be);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ct?y.isDataTexture||y.isData3DTexture?L.texSubImage3D(Ce,Te,Be,at,St,De,be,Ie,lt,Lt,vt.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(Ce,Te,Be,at,St,De,be,Ie,lt,vt.data):L.texSubImage3D(Ce,Te,Be,at,St,De,be,Ie,lt,Lt,vt):y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Te,Be,at,De,be,lt,Lt,vt.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Te,Be,at,vt.width,vt.height,lt,vt.data):L.texSubImage2D(L.TEXTURE_2D,Te,Be,at,De,be,lt,Lt,vt);_.pixelStorei(L.UNPACK_ROW_LENGTH,Yt),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,tt),_.pixelStorei(L.UNPACK_SKIP_PIXELS,tn),_.pixelStorei(L.UNPACK_SKIP_ROWS,mn),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Hn),Te===0&&O.generateMipmaps&&L.generateMipmap(Ce),_.unbindTexture()},this.initRenderTarget=function(y){V.get(y).__webglFramebuffer===void 0&&Z.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Z.setTextureCube(y,0):y.isData3DTexture?Z.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Z.setTexture2DArray(y,0):Z.setTexture2D(y,0),_.unbindTexture()},this.resetState=function(){$=0,k=0,ie=null,_.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const sh={type:"change"},rc={type:"start"},Cf={type:"end"},ws=new Kl,ah=new Qn,fy=Math.cos(70*il.DEG2RAD),Tt=new I,Wt=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ro=1e-6;class dy extends m0{constructor(e,t=null){super(e,t),this.state=ot.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:tr.ROTATE,MIDDLE:tr.DOLLY,RIGHT:tr.PAN},this.touches={ONE:ti.ROTATE,TWO:ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new ai,this._lastTargetPosition=new I,this._quat=new ai().setFromUnitVectors(e.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Nu,this._sphericalDelta=new Nu,this._scale=1,this._panOffset=new I,this._rotateStart=new ce,this._rotateEnd=new ce,this._rotateDelta=new ce,this._panStart=new ce,this._panEnd=new ce,this._panDelta=new ce,this._dollyStart=new ce,this._dollyEnd=new ce,this._dollyDelta=new ce,this._dollyDirection=new I,this._mouse=new ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=my.bind(this),this._onPointerDown=py.bind(this),this._onPointerUp=gy.bind(this),this._onContextMenu=by.bind(this),this._onMouseWheel=xy.bind(this),this._onKeyDown=My.bind(this),this._onTouchStart=yy.bind(this),this._onTouchMove=Sy.bind(this),this._onMouseDown=_y.bind(this),this._onMouseMove=vy.bind(this),this._interceptControlDown=Ey.bind(this),this._interceptControlUp=Ty.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sh),this.update(),this.state=ot.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Tt.copy(t).sub(this.target),Tt.applyQuaternion(this._quat),this._spherical.setFromVector3(Tt),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Wt:i>Math.PI&&(i-=Wt),r<-Math.PI?r+=Wt:r>Math.PI&&(r-=Wt),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Tt.setFromSpherical(this._spherical),Tt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Tt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Tt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new I(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Tt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ws.origin.copy(this.object.position),ws.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ws.direction))<fy?this.object.lookAt(this.target):(ah.setFromNormalAndCoplanarPoint(this.object.up,this.target),ws.intersectPlane(ah,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>ro||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ro||this._lastTargetPosition.distanceToSquared(this.target)>ro?(this.dispatchEvent(sh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Wt/60*this.autoRotateSpeed*e:Wt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Tt.setFromMatrixColumn(t,0),Tt.multiplyScalar(-e),this._panOffset.add(Tt)}_panUp(e,t){this.screenSpacePanning===!0?Tt.setFromMatrixColumn(t,1):(Tt.setFromMatrixColumn(t,0),Tt.crossVectors(this.object.up,Tt)),Tt.multiplyScalar(e),this._panOffset.add(Tt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Tt.copy(r).sub(this.target);let s=Tt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Wt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Wt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Wt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Wt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ce,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function py(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function my(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function gy(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Cf),this.state=ot.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function _y(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case tr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ot.DOLLY;break;case tr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ot.ROTATE}break;case tr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(rc)}function vy(n){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function xy(n){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(n.preventDefault(),this.dispatchEvent(rc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Cf))}function My(n){this.enabled!==!1&&this._handleKeyDown(n)}function yy(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ti.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ot.TOUCH_ROTATE;break;case ti.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case ti.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ot.TOUCH_DOLLY_PAN;break;case ti.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(rc)}function Sy(n){switch(this._trackPointer(n),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ot.NONE}}function by(n){this.enabled!==!1&&n.preventDefault()}function Ey(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ty(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Ay extends sf{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Ci;e.deleteAttribute("uv");const t=new ji({side:Ht}),i=new ji,r=new u0(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new yt(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new pg(e,i,6),o=new Ct;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new yt(e,$i(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new yt(e,$i(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new yt(e,$i(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const f=new yt(e,$i(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const u=new yt(e,$i(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const d=new yt(e,$i(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function $i(n){return new s0({color:0,emissive:16777215,emissiveIntensity:n})}function wy(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,l=new zt;let c=0;for(let h=0;h<n.length;++h){const f=n[h];let u=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(f.attributes[d]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(e){let d;if(t)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(t){let h=0;const f=[];for(let u=0;u<n.length;++u){const d=n[u].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+h);h+=n[u].attributes.position.count}l.setIndex(f)}for(const h in s){const f=oh(s[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(const h in a){const f=a[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){const d=[];for(let M=0;M<a[h].length;++M)d.push(a[h][M][u]);const g=oh(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function oh(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){const h=n[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}const a=new e(s),o=new sn(a,t,i);let l=0;for(let c=0;c<n.length;++c){const h=n[c];if(h.isInterleavedBufferAttribute){const f=l/t;for(let u=0,d=h.count;u<d;u++)for(let g=0;g<t;g++){const M=h.getComponent(u,g);o.setComponent(u+f,g,M)}}else a.set(h.array,l);l+=h.count*t}return r!==void 0&&(o.gpuType=r),o}const Ps=["小兔","狐狸","棕熊","熊猫","小猫","青蛙","考拉","狮子","企鹅","小猪","小鼠","小鸡","草莓","橙子","西瓜","香蕉","葡萄","樱桃","苹果","梨子","菠萝","牛油果","蜜桃","柠檬"],Zi=new Map,Py=["#f8dce3","#deedf8","#fff0ce","#e5eddd","#f7e6cb","#e6f1cf","#e5e1f5","#fce8bf","#ddecf4","#f7e0de","#dee6f9","#e4efd6"];function Df(n){if(Zi.has(n))return Zi.get(n);const e=document.createElement("canvas");e.width=e.height=384;const t=e.getContext("2d");t.scale(3,3),t.lineCap="round",t.lineJoin="round";const i=(l,c,h,f,u,d=0)=>{t.fillStyle=u,t.beginPath(),t.ellipse(l,c,h,f,d,0,Math.PI*2),t.fill()},r=(l,c)=>{t.fillStyle=c,t.beginPath(),l.forEach(([h,f],u)=>u?t.lineTo(h,f):t.moveTo(h,f)),t.closePath(),t.fill()},s=(l,c,h=2)=>{t.strokeStyle=c,t.lineWidth=h,t.beginPath(),l.forEach(([f,u],d)=>d?t.lineTo(f,u):t.moveTo(f,u)),t.stroke()},a=(l,c,h=-.5)=>i(l,c,12,5,"#729953",h),o=(l=66,c=16)=>{for(const h of[64-c,64+c])i(h,l,3.1,4.1,"#534535"),i(h-.7,l-1.3,.8,1,"#fff9e9");i(64-c-7,l+8,5.5,3,"#efb0a0"),i(64+c+7,l+8,5.5,3,"#efb0a0"),t.strokeStyle="#745143",t.lineWidth=2,t.beginPath(),t.arc(64,l+4,6,.2,Math.PI-.2),t.stroke()};if(i(64,64,64,64,Py[(n+12)%12]),i(28,24,2,2,"#ffffffaa"),i(105,78,2,2,"#ffffffaa"),i(96,30,3,3,"#ffffff88"),i(22,95,3,3,"#ffffff88"),n<0){i(64,64,64,64,"#f5d66e"),t.strokeStyle="#e0b746",t.lineWidth=1.1,t.beginPath(),t.arc(64,64,47,0,Math.PI*2),t.stroke();const l=Array.from({length:10},(c,h)=>{const f=h*Math.PI/5-Math.PI/2,u=h%2?14:27;return[64+Math.cos(f)*u,61+Math.sin(f)*u]});r(l.map(([c,h])=>[c,h+2]),"#ffebb0"),r(l,"#dcb047"),i(54,58,1.8,2.3,"#b38b31"),i(72,58,1.8,2.3,"#b38b31"),t.strokeStyle="#b38b31",t.lineWidth=1.5,t.beginPath(),t.arc(63,61,4.3,.2,Math.PI-.2),t.stroke();for(const c of[54,64,74])i(c,100,1.5,1.5,"#c5a23f")}else if(n<=11)if(n===0)i(47,37,10,25,"#fffdf3",-.16),i(79,37,10,25,"#fffdf3",.16),i(47,34,4.5,16,"#efb8bc",-.16),i(79,34,4.5,16,"#efb8bc",.16),i(64,70,34,29,"#fffdf3"),o(68),i(64,75,3,2,"#d99295");else if(n===1||n===4){const l=n===1?"#ec9a48":"#d8aa78";r([[30,58],[31,24],[53,44],[75,44],[97,24],[98,58]],l),r([[35,43],[35,31],[48,44]],"#edbbaf"),r([[80,44],[93,31],[93,45]],"#edbbaf"),i(64,68,36,29,l),n===1?r([[29,61],[64,76],[99,61],[86,88],[64,101],[42,88]],"#fff6dc"):(s([[57,44],[59,53]],"#a4784b",3),s([[70,44],[69,52]],"#a4784b",3),s([[25,74],[40,77]],"#a4784b"),s([[88,77],[103,74]],"#a4784b")),o(66),i(64,76,4,3,"#6b5140")}else if([2,3,6,7,10].includes(n)){const l={2:"#b98255",3:"#fffcef",6:"#a8b8bd",7:"#f3c75f",10:"#afbdd1"}[n],c=n===3?"#535352":l;if(n===7)for(let h=0;h<12;h++)i(64+Math.cos(h*Math.PI/6)*30,66+Math.sin(h*Math.PI/6)*30,13,13,"#b87d42");i(33,42,n===6||n===10?19:14,n===6||n===10?20:14,c),i(95,42,n===6||n===10?19:14,n===6||n===10?20:14,c),i(33,43,8,9,n===3?"#757573":"#edd1be"),i(95,43,8,9,n===3?"#757573":"#edd1be"),i(64,68,35,32,l),n===3&&(i(48,64,10,13,"#535352",.3),i(80,64,10,13,"#535352",-.3)),(n===2||n===7)&&i(64,81,19,13,"#fce6bb"),o(65),i(64,75,n===6?8:4,n===6?12:3,n===10?"#dd9faa":"#695448"),n===3&&(i(48,63,2,2,"#fff8e6"),i(80,63,2,2,"#fff8e6"))}else n===5?(i(64,70,37,29,"#91b968"),i(43,47,14,16,"#91b968"),i(85,47,14,16,"#91b968"),i(43,47,9,10,"#fff9dc"),i(85,47,9,10,"#fff9dc"),i(43,48,3,4,"#4c583e"),i(85,48,3,4,"#4c583e"),i(39,75,6,3,"#eab29a"),i(89,75,6,3,"#eab29a"),t.strokeStyle="#56723f",t.lineWidth=2.4,t.beginPath(),t.arc(64,66,17,.3,Math.PI-.3),t.stroke()):n===8?(i(64,66,32,38,"#667f8b"),i(64,78,25,24,"#fff8df"),i(50,55,13,15,"#fff8df"),i(78,55,13,15,"#fff8df"),i(50,57,3,4,"#43535b"),i(78,57,3,4,"#43535b"),r([[57,65],[71,65],[64,73]],"#e9b348"),i(46,100,10,4,"#e9b348"),i(82,100,10,4,"#e9b348")):n===9?(r([[32,58],[27,29],[51,42],[77,42],[101,29],[96,58]],"#e6a5a9"),i(64,68,35,32,"#efbbbc"),o(64),i(64,82,17,11,"#df989f"),i(58,81,2.5,3.5,"#b9727e"),i(70,81,2.5,3.5,"#b9727e")):(i(64,68,33,33,"#f5cc58"),i(55,34,4,10,"#e5ae43",-.3),i(65,31,4,11,"#e5ae43",.1),o(65),r([[58,76],[70,76],[64,82]],"#d79436"),i(32,79,9,16,"#eebd48",-.4),i(96,79,9,16,"#eebd48",.4));else{if(n===12){t.fillStyle="#e7837e",t.beginPath(),t.moveTo(31,51),t.bezierCurveTo(32,24,96,24,97,51),t.bezierCurveTo(97,73,77,97,64,102),t.bezierCurveTo(51,97,31,73,31,51),t.fill();for(const[l,c]of[[42,52],[63,44],[85,52],[48,76],[80,76],[64,90]])i(l,c,1.6,3,"#ffe6ae",.2);r([[64,26],[57,36],[40,35],[48,44],[61,42],[70,46],[79,35],[69,35]],"#719757")}else if(n===13||n===23){i(64,69,n===13?34:39,n===13?33:27,n===13?"#f1b054":"#eed363",n===23?-.25:0),a(75,32,.1),s([[63,37],[63,26]],"#8b8750",3);for(const[l,c]of[[43,52],[85,74],[55,89],[36,74]])i(l,c,1,1.5,"#d8984b")}else if(n===14){t.fillStyle="#8aaa62",t.beginPath(),t.arc(64,48,44,0,Math.PI),t.fill(),t.fillStyle="#f6e5ad",t.beginPath(),t.arc(64,48,38,0,Math.PI),t.fill(),t.fillStyle="#e88885",t.beginPath(),t.arc(64,48,33,0,Math.PI),t.fill();for(const[l,c]of[[42,56],[64,54],[85,56],[54,75],[76,75]])i(l,c,1.5,2.6,"#795f4c",.1)}else{if(n===15)return t.fillStyle="#eecb60",t.beginPath(),t.moveTo(33,32),t.bezierCurveTo(31,77,77,96,100,45),t.bezierCurveTo(102,99,28,121,25,50),t.closePath(),t.fill(),s([[31,32],[29,25]],"#8b7e4a",5),i(61,86,3,4,"#776240"),i(80,78,3,4,"#776240"),Zi.set(n,e),e;if(n===16){for(const[l,c]of[[47,47],[76,47],[36,66],[62,66],[88,65],[49,87],[75,86],[64,102]])i(l,c,14,14,"#a38ac2");a(78,25),s([[63,39],[63,21]],"#899057",3)}else{if(n===17)return s([[38,73],[70,28],[86,76]],"#7c9856",3),a(78,30,.3),i(38,78,22,23,"#ca6f78"),i(87,82,22,23,"#d98087"),i(32,72,3,4,"#f7c6ba"),i(81,76,3,4,"#f7c6ba"),o(80,25),Zi.set(n,e),e;if(n===18||n===22)i(49,69,24,31,n===18?"#d98076":"#eeafa0",-.22),i(79,69,24,31,n===18?"#e48a7b":"#efba9e",.22),s([[64,43],[62,25]],"#90724a",3),a(78,32),n===22&&s([[64,55],[60,76],[64,94]],"#da958c",1.5);else if(n===19)i(64,51,20,22,"#bfca78"),i(64,76,32,29,"#c9d68b"),s([[63,33],[69,22]],"#977b4f",4),a(80,29,.3);else if(n===20){i(64,75,29,34,"#e8bc67");for(let l=35;l<92;l+=14)s([[l,51],[l+20,97]],"#c99d51",1.2);for(let l=36;l<95;l+=14)s([[l,98],[l+17,51]],"#c99d51",1.2);r([[64,48],[41,28],[59,32],[65,14],[71,33],[86,26],[79,46]],"#829f62")}else if(n===21)return i(64,48,20,23,"#88a868"),i(64,76,34,30,"#88a868"),i(64,49,14,17,"#e1de9d"),i(64,75,27,24,"#e1de9d"),i(64,79,15,15,"#b58c60"),o(55,10),Zi.set(n,e),e}}o(n===14?64:65,n===20?13:16)}return Zi.set(n,e),e}const so=new Map;function Lr(n){return so.has(n)||so.set(n,Df(n).toDataURL()),so.get(n)}const Lf=.34,er=5.7;function If(n){const e=n===12?[4,5,6,5,4]:[4,6,7,7,7,7,6,4],t=n===12?1.32:1.07;return e.flatMap((i,r)=>Array.from({length:i},(s,a)=>new I((a-(i-1)/2)*t,Lf,(r-(e.length-1)/2)*(n===12?1.4:1.04))))}const Nf=n=>{const e=[Math.PI/4,-3*Math.PI/4,-Math.PI/4,3*Math.PI/4][n];return{x:Math.sin(e)*5.65,z:Math.cos(e)*5.65,angle:e+Math.PI/2}};function lh(n,e){const t=Nf(n),i=(e%6-2.5)*.43;return new I(t.x+Math.sin(t.angle)*i,.33+Math.floor(e/6)*.11,t.z+Math.cos(t.angle)*i)}class ch{geometries=new Set;materials=new Map;textures=[];gold=this.material("#ebc44f");faceMaterials=new Map;cylinder=new Rr(.465,.465,.16,40);circle=new Js(.406,40);rim=new Qs(.427,.034,8,40);material(e,t=.4){const i=`${e}:${t}`;return this.materials.has(i)||this.materials.set(i,new ji({color:e,roughness:t,metalness:0})),this.materials.get(i)}mesh(e,t,i,r=0,s=0,a=0){this.geometries.add(t);const o=new yt(t,i);return o.position.set(r,s,a),o.castShadow=!0,o.receiveShadow=!0,e.add(o),o}texture(e){const t=new vg(e);return t.colorSpace=Jt,t.anisotropy=4,this.textures.push(t),t}face(e){return this.faceMaterials.has(e)||this.faceMaterials.set(e,new ji({map:this.texture(Df(e)),roughness:.52,metalness:0})),this.faceMaterials.get(e)}octagon(e,t){const i=new Us;return[[-e+t,-e],[e-t,-e],[e,-e+t],[e,e-t],[e-t,e],[-e+t,e],[-e,e-t],[-e,-e+t]].forEach(([r,s],a)=>a?i.lineTo(r,s):i.moveTo(r,s)),i.closePath(),i}slab(e,t,i,r,s,a){const o=this.mesh(e,new tc(t,{depth:i,bevelEnabled:r>0,bevelSegments:3,steps:1,bevelSize:r,bevelThickness:r,curveSegments:24}),s,0,a,0);return o.rotation.x=-Math.PI/2,o}board(e){const t=new xn,i=If(e);this.slab(t,this.octagon(er-.12,1.9),.65,.14,this.material("#87ad91"),-.63);const r=this.octagon(er-.12,1.9);for(const f of i){const u=new sl;u.absarc(f.x,-f.z,.505,0,Math.PI*2,!0),r.holes.push(u)}this.slab(t,r,.13,.055,this.material("#a4c8ab"),.07);const s=new Rr(.495,.48,.06,32);for(const f of i)this.mesh(t,s,this.material("#749c7d"),f.x,.045,f.z).castShadow=!1;const a=document.createElement("canvas");a.width=512,a.height=384;const o=a.getContext("2d");o.fillStyle="#718c60",o.font="500 34px system-ui",o.textAlign="center",o.textBaseline="middle",i.forEach((f,u)=>o.fillText(String(u+1).padStart(2,"0"),u%8*64+32,Math.floor(u/8)*64+32));const l=new ji({map:this.texture(a),transparent:!0,roughness:1,depthWrite:!1});this.materials.set("numbers",l),i.forEach((f,u)=>{const d=new Ti(.27,.22),g=d.getAttribute("uv");for(let m=0;m<g.count;m++)g.setXY(m,(u%8+g.getX(m))/8,1-(Math.floor(u/8)+1-g.getY(m))/6);const M=this.mesh(t,d,l,f.x+.39,.26,f.z+.43);M.rotation.x=-Math.PI/2,M.castShadow=!1});for(let f=0;f<4;f++){const{x:u,z:d,angle:g}=Nf(f),M=new xn;t.add(M),M.position.set(u,.225,d),M.rotation.y=g;const m=new Us;m.absellipse(0,0,.43,1.55,0,Math.PI*2,!1,0),this.slab(M,m,.012,.025,this.material("#97bd88"),0);const p=new Ci(.68,.025,.025);for(let E=0;E<16;E++)this.mesh(M,p,this.material("#b2cf9d"),0,.045,(E-7.5)*.17).castShadow=!1;const b=this.mesh(M,new Rr(.18,.18,.027,24),this.material(Mn[f].color),0,.03,-1.75);b.castShadow=!1;const S=document.createElement("canvas");S.width=S.height=64;const x=S.getContext("2d");x.fillStyle=Mn[f].color,x.fillRect(0,0,64,64),x.fillStyle="#fffef0",x.font="bold 40px system-ui",x.textAlign="center",x.textBaseline="middle",x.fillText(String(f+1),32,34);const w=new ji({map:this.texture(S),roughness:.5});this.materials.set(`badge${f}`,w),this.mesh(M,new Js(.165,24),w,0,.046,-1.75).rotation.x=-Math.PI/2;const T=new xn;t.add(T),T.rotation.y=f*Math.PI/2,this.mesh(T,new Ks(.19,2.95,4,16),this.material("#86ac74"),0,.18,4.94).rotation.z=Math.PI/2,this.mesh(T,new Ks(.125,2.65,4,16),this.gold,-.02,.36,4.94).rotation.z=Math.PI/2;for(let E=0;E<4;E++){const R=this.mesh(T,new Qs(.137,.019,6,20),this.material("#f8dc7a"),-.55-E*.12,.36,4.94);R.rotation.y=Math.PI/2}const P=new Us;for(let E=0;E<10;E++){const R=E*Math.PI/5,C=E%2?.25:.4;E?P.lineTo(Math.cos(R)*C,Math.sin(R)*C):P.moveTo(Math.cos(R)*C,Math.sin(R)*C)}P.closePath();const v=this.slab(T,P,.12,.045,this.gold,.28);v.position.x=-1.55,v.position.z=4.94;for(const E of[-.09,.09])this.mesh(T,new nc(.027,8,6),this.material("#a88530"),-1.55+E,.455,4.9).scale.y=.5}t.updateMatrixWorld(!0);const c=new Map;t.traverse(f=>{if(!(f instanceof yt))return;let u=f.geometry.clone().applyMatrix4(f.matrixWorld);if(u.index){const g=u;u=g.toNonIndexed(),g.dispose()}u.clearGroups();const d=f.material;c.has(d)||c.set(d,[]),c.get(d).push(u)});const h=new xn;for(const[f,u]of c){const d=wy(u);this.mesh(h,d,f).castShadow=!f.transparent,u.forEach(g=>g.dispose())}return h}tile(e,t){const i=new xn;i.userData.id=e;const r=this.mesh(i,this.cylinder,this.gold);r.userData.id=e;const s=this.mesh(i,this.circle,this.face(t),0,.083,0);s.rotation.x=-Math.PI/2,s.castShadow=!1;const a=this.mesh(i,this.circle,this.face(-1),0,-.083,0);a.rotation.x=Math.PI/2,a.castShadow=!1;for(const o of[-1,1]){const l=this.mesh(i,this.rim,this.material("#ffe69b"),0,o*.077,0);l.rotation.x=Math.PI/2,l.castShadow=!1}return{group:i,target:r}}dispose(){this.geometries.forEach(e=>e.dispose()),this.materials.forEach(e=>e.dispose()),this.faceMaterials.forEach(e=>e.dispose()),this.textures.forEach(e=>e.dispose()),this.geometries.clear(),this.materials.clear(),this.faceMaterials.clear(),this.textures=[]}}class Ry{renderer;camera=new ra(-9,9,6,-6,.1,100);world=new sf;models=new ch;table=new xn;tiles=[];slots=[0,0,0,0];controls;observer;environment;ground;shadow;ray=new p0;pointer=new ce;v=new I;aspect=1;frame=0;last=0;time=0;disposed=!1;motion=matchMedia("(prefers-reduced-motion: reduce)");pointers=new Set;gesture=null;host;game;onFrame;onFlip;onLost;constructor(e,t,i,r,s){this.host=e,this.game=t,this.onFrame=i,this.onFlip=r,this.onLost=s,this.renderer=new hy({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia("(pointer: coarse)").matches?1.5:2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Gh,this.renderer.toneMapping=Fl,this.renderer.toneMappingExposure=.95;const a=this.renderer.domElement;a.setAttribute("aria-label","薄荷绿八角棋盘，轻触黄色棋子翻面，也可使用棋子列表"),a.setAttribute("role","img"),e.append(a),this.world.background=new Qe("#f7f7ef");const o=new cl(this.renderer),l=new Ay;this.environment=o.fromScene(l,.04),this.world.environment=this.environment.texture,this.world.environmentIntensity=.28,l.dispose(),o.dispose(),this.world.add(new l0("#ffffff","#bfd2b1",1.6));const c=new Ja("#fff7e3",2.6);c.position.set(-8,16,9),c.castShadow=!0,c.shadow.mapSize.set(1024,1024),Object.assign(c.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:40}),c.shadow.bias=-15e-5,c.shadow.normalBias=.025,c.shadow.radius=4,this.world.add(c);const h=new Ja("#dfefff",.65);h.position.set(8,9,-8),this.world.add(h),this.ground=new yt(new Ti(200,200),new Jl({color:"#f7f7ef",toneMapped:!1})),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-.79,this.world.add(this.ground),this.shadow=new yt(new Ti(200,200),new jg({opacity:.12})),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=-.788,this.shadow.receiveShadow=!0,this.world.add(this.shadow),this.controls=new dy(this.camera,a),this.controls.enablePan=!1,this.controls.enableDamping=!1,this.controls.rotateSpeed=.6,this.controls.minZoom=.8,this.controls.maxZoom=2,this.controls.minPolarAngle=.05,this.controls.maxPolarAngle=Math.PI*.32,this.controls.touches.ONE=ti.ROTATE,this.controls.touches.TWO=ti.DOLLY_ROTATE,this.view("reset"),this.setGame(t),this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),a.addEventListener("pointerdown",this.pointerDown,!0),a.addEventListener("pointermove",this.pointerMove,!0),a.addEventListener("pointerup",this.pointerUp,!0),a.addEventListener("pointercancel",this.pointerCancel,!0),a.addEventListener("lostpointercapture",this.pointerCancel),a.addEventListener("webglcontextlost",this.contextLost),this.resize(),this.frame=requestAnimationFrame(this.animate)}setGame(e){this.game=e,this.time=0,this.last=0,this.slots.fill(0),this.cancelGesture(),this.world.remove(this.table),this.models.dispose(),this.models=new ch,this.table=this.models.board(e.state.settings.pairs);const t=If(e.state.settings.pairs);this.tiles=e.state.deck.map((i,r)=>{const s=this.models.tile(r,i),a=e.state.owners[r],o=e.state.open.includes(r)||a>=0?0:Math.PI,l=a>=0?this.slots[a]++:-1;return s.group.position.copy(a>=0?lh(a,l):t[r]),s.group.rotation.x=o,s.group.scale.setScalar(a>=0?.62:1),this.table.add(s.group),{...s,angle:o,from:o,at:-1,owner:a,slot:l,origin:t[r]}}),this.world.add(this.table)}view(e){this.cancelGesture(),e==="reset"||e==="top"?(this.controls.target.set(0,0,0),this.camera.position.set(0,e==="top"?22:18,e==="top"?.1:12.5),this.camera.zoom=1):(this.v.copy(this.camera.position).sub(this.controls.target).applyAxisAngle(new I(0,1,0),e==="left"?-Math.PI/6:Math.PI/6),this.camera.position.copy(this.controls.target).add(this.v)),this.controls.update(),this.camera.updateProjectionMatrix()}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;!e||!t||(this.aspect=e/t,this.fitView(),this.renderer.setSize(e,t))}fitView(){this.camera.updateMatrixWorld();let e=4.7;for(const t of[-er,-3.8,3.8,er])for(const i of[-er,-3.8,3.8,er])if(!(Math.abs(t)+Math.abs(i)>9.6))for(const r of[-.6,.8])this.v.set(t,r,i).applyMatrix4(this.camera.matrixWorldInverse),e=Math.max(e,Math.abs(this.v.y)+.45,(Math.abs(this.v.x)+.4)/this.aspect);Math.abs(this.camera.top-e)<1e-6&&Math.abs(this.camera.right-e*this.aspect)<1e-6||(this.camera.left=-e*this.aspect,this.camera.right=e*this.aspect,this.camera.top=e,this.camera.bottom=-e,this.camera.updateProjectionMatrix())}pick(e){const t=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-t.left)/t.width*2-1,-(e.clientY-t.top)/t.height*2+1),this.camera.updateMatrixWorld(),this.ray.setFromCamera(this.pointer,this.camera);const i=o=>this.game.state.owners[o]<0&&!this.game.state.open.includes(o),r=this.ray.intersectObjects(this.tiles.map(o=>o.target))[0];if(r){const o=r.object.userData.id;return i(o)?o:null}let s=null,a=19;for(const o of this.tiles){this.v.copy(o.origin).project(this.camera);const l=Math.hypot(t.x+(this.v.x+1)*t.width/2-e.clientX,t.y+(1-this.v.y)*t.height/2-e.clientY);l<a&&(a=l,s=o.group.userData.id)}return s!==null&&i(s)?s:null}cancelGesture(){this.gesture=null,this.pointers.clear()}pointerDown=e=>{if(this.pointers.add(e.pointerId),this.pointers.size>1){this.gesture&&(this.gesture.moved=!0);return}this.gesture={id:e.pointerId,x:e.clientX,y:e.clientY,moved:e.button!==0,tile:this.pick(e)}};pointerMove=e=>{this.gesture&&Math.hypot(e.clientX-this.gesture.x,e.clientY-this.gesture.y)>7&&(this.gesture.moved=!0),!this.pointers.size&&e.pointerType==="mouse"&&(this.renderer.domElement.style.cursor=this.game.ready&&!this.game.isBot&&this.pick(e)!==null?"pointer":"grab")};pointerUp=e=>{const t=this.gesture;t?.id===e.pointerId&&!t.moved&&this.pointers.size===1&&t.tile!==null&&this.pick(e)===t.tile&&this.onFlip(t.tile),this.pointers.delete(e.pointerId),this.pointers.size||(this.gesture=null)};pointerCancel=e=>{this.pointers.delete(e.pointerId),this.gesture&&(this.gesture.moved=!0),this.pointers.size||(this.gesture=null)};contextLost=e=>{e.preventDefault(),this.onLost()};animate=e=>{if(this.disposed)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.game.update(t),this.game.paused||(this.time+=t);const i=this.game.state;for(const[r,s]of this.tiles.entries()){const a=i.open.includes(r)||i.owners[r]>=0?0:Math.PI;a!==s.angle&&(s.from=s.group.rotation.x,s.angle=a,s.at=this.time),s.owner!==i.owners[r]&&(s.owner=i.owners[r],s.slot=this.slots[s.owner]++,s.at=this.time);const o=this.motion.matches?1:Math.min(1,(this.time-s.at)/(s.owner>=0?.55:.34)),l=o*o*(3-2*o);s.group.rotation.x=il.lerp(s.from,s.angle,l),s.owner>=0?(s.group.position.copy(s.origin).lerp(lh(s.owner,s.slot),l),s.group.position.y+=Math.sin(Math.PI*o)*1.8,s.group.scale.setScalar(il.lerp(1,.62,l))):(s.group.position.copy(s.origin),s.group.position.y=Lf+Math.sin(Math.PI*o)*.58)}this.controls.enabled=!this.game.paused,this.controls.update(),this.fitView(),this.renderer.render(this.world,this.camera),this.onFrame(),this.frame=requestAnimationFrame(this.animate)};diagnostics(){this.camera.updateMatrixWorld();const e=this.renderer.domElement.getBoundingClientRect();return{camera:{position:this.camera.position.toArray(),zoom:this.camera.zoom},drawCalls:this.renderer.info.render.calls,tiles:this.tiles.map((t,i)=>(this.v.copy(t.origin).project(this.camera),{id:i,x:e.x+(this.v.x+1)*e.width/2,y:e.y+(1-this.v.y)*e.height/2}))}}dispose(){this.disposed=!0,cancelAnimationFrame(this.frame),this.observer.disconnect(),this.controls.dispose();const e=this.renderer.domElement;e.removeEventListener("pointerdown",this.pointerDown,!0),e.removeEventListener("pointermove",this.pointerMove,!0),e.removeEventListener("pointerup",this.pointerUp,!0),e.removeEventListener("pointercancel",this.pointerCancel,!0),e.removeEventListener("lostpointercapture",this.pointerCancel),e.removeEventListener("webglcontextlost",this.contextLost),this.models.dispose(),this.environment.dispose();for(const t of[this.ground,this.shadow])t.geometry.dispose(),t.material.dispose();this.world.traverse(t=>{t instanceof Ja&&t.shadow.dispose()}),this.renderer.dispose(),e.remove()}}class Cy{enabled=!0;context;nodes=new Set;unlock(){if(this.enabled)try{this.context??=new AudioContext,this.context.state==="suspended"&&this.context.resume().catch(()=>{})}catch{}}play(e){if(!this.enabled||this.context?.state!=="running")return;({flip:[620],match:[659,880],miss:[330,294],win:[523,659,784,1046]})[e].forEach((i,r)=>{const s=this.context,a=s.currentTime+r*.1,o=s.createOscillator(),l=s.createGain();o.type="sine",o.frequency.setValueAtTime(i,a),l.gain.setValueAtTime(.045,a),l.gain.exponentialRampToValueAtTime(.001,a+.18),o.connect(l),l.connect(s.destination),this.nodes.add(o),o.onended=()=>{this.nodes.delete(o),o.disconnect(),l.disconnect()},o.start(a),o.stop(a+.2)})}suspend(e){this.context&&(e||!this.enabled?(this.stop(),this.context.suspend().catch(()=>{})):this.context.resume().catch(()=>{}))}stop(){for(const e of this.nodes)try{e.stop()}catch{}this.nodes.clear()}dispose(){this.stop(),this.context?.close().catch(()=>{})}}const Uf="flip-match-save-v1",Of="flip-match-preferences-v1";function Dy(){try{return Gd(JSON.parse(localStorage.getItem(Uf)??"null"))}catch{return null}}function Zr(n){try{localStorage.setItem(Uf,JSON.stringify(Vd(n)))}catch{}}function Ly(){try{const n=JSON.parse(localStorage.getItem(Of)??"null");return{settings:Ir([1,2].includes(n?.version)?n.settings:null),sound:n?.sound!==!1}}catch{return{settings:Ir(null),sound:!0}}}function Ff(n,e){try{localStorage.setItem(Of,JSON.stringify({version:2,settings:n,sound:e}))}catch{}}function Iy(n,e,t){const i=document,r=document.documentElement,s=()=>i.fullscreenEnabled===!0&&typeof r.requestFullscreen=="function"&&typeof i.exitFullscreen=="function",a=()=>i.webkitFullscreenEnabled===!0&&typeof r.webkitRequestFullscreen=="function"&&typeof i.webkitExitFullscreen=="function";let o=!1;const l=()=>{const h=!!(i.fullscreenElement||i.webkitFullscreenElement),f=h?"退出全屏":"进入全屏";n.hidden=!s()&&!a(),n.setAttribute("aria-label",f),n.dataset.tooltip=f,n.setAttribute("aria-pressed",String(h)),e(h)},c=async()=>{if(!o){o=!0;try{i.fullscreenElement?await i.exitFullscreen():i.webkitFullscreenElement?await i.webkitExitFullscreen?.():s()?await r.requestFullscreen():a()&&await r.webkitRequestFullscreen?.()}catch{t()}finally{o=!1}}};return n.addEventListener("click",c),i.addEventListener("fullscreenchange",l),i.addEventListener("webkitfullscreenchange",l),i.addEventListener("fullscreenerror",t),i.addEventListener("webkitfullscreenerror",t),l(),()=>{n.removeEventListener("click",c),i.removeEventListener("fullscreenchange",l),i.removeEventListener("webkitfullscreenchange",l),i.removeEventListener("fullscreenerror",t),i.removeEventListener("webkitfullscreenerror",t)}}const Ny={ArrowLeft:sd,ArrowRight:ad,CircleHelp:ud,Settings2:Ed,Volume2:Dd,VolumeX:Ld,Maximize:_d,Minimize:vd,RotateCcw:yd,RotateCw:Sd,Scan:bd,Pause:xd,Play:Md,X:Id,Users:Cd,Bot:od,UserRound:Rd,Trophy:Pd,Hand:md,Check:ld,Sprout:Ad,Flower2:dd,Cloud:hd,Sun:wd,Grid3x3:pd,Ellipsis:fd,Sparkles:Td,ChevronDown:cd,ListOrdered:gd},we=n=>document.querySelector(n),xt=n=>`<i data-lucide="${n}"></i>`,Kr=()=>dh({icons:Ny,attrs:{"stroke-width":1.8}}),Xt=(n,e,t)=>`<button type="button" class="icon-button" id="${n}" aria-label="${e}" data-tooltip="${e}">${xt(t)}</button>`,sc=n=>`<span class="avatar" style="--team:${Mn[n].color};--pale:${Mn[n].pale};--ink:${Mn[n].ink}" aria-hidden="true">${xt(Mn[n].symbol)}</span>`,Mi=n=>`${n+1} 号${Mn[n].name}`,Bf=Ly(),zf=Dy();let pt=zf?.settings??Bf.settings,ii=Bf.sound,it=new kh(pt,void 0,zf??void 0),Ai,Fn=null,Ji=null,ri=!1,fl=!1,ac=!1,dl=0,Fs=0,oc=-1,kf=!1,ei=pt.count,oa=pt.pairs,Xr=[...pt.bots],qr=pt.difficulty,pl;const qt=new Cy,Gf=new AbortController,la=Gf.signal;Od("flip-match");we("#app").innerHTML=`
  <header class="header">
    <a class="brand" href="${Fd("./")}" aria-label="返回游戏大厅" title="返回游戏大厅">${xt("arrow-left")}<span class="brand-mark" aria-hidden="true"><i></i><i>✦</i></span><span><h1>翻棋对对碰</h1><small>FLIP & MATCH</small></span></a>
    <span class="header-note">一翻，一对，好记性。</span>
    <nav class="header-tools" aria-label="游戏工具">${Xt("rules-button","游戏规则","circle-help")}${Xt("sound-button","关闭音效","volume-2")}${Xt("fullscreen-button","进入全屏","maximize")}${Xt("settings-button","游戏设置","settings-2")}<span class="tool-divider"></span><button id="restart-button" class="restart-button" aria-label="新的一局" data-tooltip="新的一局">${xt("rotate-ccw")}<span>新的一局</span></button></nav>
  </header>
  <main class="game-layout">
    <section class="round-bar" aria-label="当前回合">
      <div class="turn-copy"><div class="eyebrow"><span class="live-dot"></span><span id="turn-label">薄荷队的回合</span><span class="small-separator">/</span><span id="turn-role">真人</span></div><h2 id="status-heading">翻开两枚，找到好朋友</h2><p id="status-description">记住每一次相遇，下一对也许就在那里。</p></div>
      <div class="reveals" aria-label="本回合翻开的棋子"><span class="reveal" id="reveal-0"></span><span class="pair-link">${xt("ellipsis")}</span><span class="reveal" id="reveal-1"></span></div>
      <div class="counters"><div><span>已找到</span><p><strong id="matched-count">00</strong><small> / <span id="total-pairs">24</span> 对</small></p></div><div><span>尝试次数</span><p><strong id="attempt-count">00</strong><small> 次</small></p></div></div>
    </section>
    <section class="play-area" aria-label="翻棋配对场景"><div id="match-scene"><div id="loading" class="scene-loading"><span class="brand-mark"><i></i><i>✦</i></span><strong>正在摆好小棋子…</strong></div></div>
      <div class="scene-caption"><span></span>动物 × 水果 · 记忆力小派对</div>
      <div class="scene-bottom"><span class="scene-hint">${xt("hand")}轻触翻棋 · 拖动旋转 · 双指缩放</span><div class="view-tools">${Xt("view-left","向左旋转视角","rotate-ccw")}${Xt("view-reset","恢复默认视角","scan")}${Xt("view-top","俯视棋盘","grid-3x3")}${Xt("view-right","向右旋转视角","rotate-cw")}<span></span><button id="tiles-button" class="list-button" aria-expanded="false" aria-controls="tile-panel">${xt("list-ordered")}<span>棋子列表</span></button></div></div>
      <section id="tile-panel" class="tile-panel" aria-label="棋子列表" hidden><div class="tile-panel-top"><strong>点编号，也能翻棋</strong>${Xt("close-tiles","收起棋子列表","chevron-down")}</div><p>编号与棋盘位置一一对应，已翻开的图案会显示在这里。</p><div id="tile-grid" class="tile-grid"></div></section>
      <div id="paused-state" class="paused-state" hidden>${xt("pause")}<h2>休息一下，好记性等你</h2><p>棋子和回合都替你留好了。</p><button class="primary-button" id="resume-button">${xt("play")}继续游戏</button></div>
    </section>
    <section class="game-dock" aria-label="玩家得分"><div class="dock-heading"><span>${xt("users")}配对小分队<small id="roster-label"></small></span><span class="dock-tip" id="dock-tip">找到一对，再翻一次</span>${Xt("pause-button","暂停游戏","pause")}</div><div class="players" id="players"></div></section>
  </main>
  <footer class="footer"><span>${xt("sprout")}把小小的相遇，装进口袋。</span><span>每对 1 分 · 配完结算 · 自动保存进度</span></footer>
  <dialog id="rules-dialog" aria-labelledby="rules-title"><div class="dialog-top"><span class="eyebrow">LITTLE TILES, HAPPY PAIRS</span>${Xt("close-rules","关闭规则","x")}</div><h2 id="rules-title">把好朋友，找成一对</h2><div class="rule-pair"><img src="${Lr(0)}" alt="小兔棋子"/><span>+</span><img src="${Lr(0)}" alt="相同的小兔棋子"/><span>=</span><strong>1 分</strong></div><ol class="rules-list"><li><strong>轮到你，翻两枚</strong><p>棋子开始都背面朝上。依次点击两枚，记住它们的图案和位置。</p></li><li><strong>相同收走，不同盖回</strong><p>找到相同图案就得 1 分，并继续翻两枚；不同则展示片刻后盖回，换下一位。</p></li><li><strong>找到最多，就是赢家</strong><p>全部棋子配完后结算，得分最高者获胜，并列最高就一起庆祝！机器人只观察公开翻过的棋子，普通难度会漏看、遗忘和失误。</p></li></ol><p class="rule-note">可在设置中选择 12 对或 24 对棋子，邀请 2–4 位真人或机器人。机器人可选轻松、普通、困难或完美记忆，默认普通。不用抢时间，慢慢记就好。</p><button class="primary-button wide" id="rules-ready">${xt("check")}记住啦，开始配对</button></dialog>
  <dialog id="settings-dialog" aria-labelledby="settings-title"><form id="settings-form"><div class="dialog-top"><span class="eyebrow">MAKE ROOM FOR FRIENDS</span>${Xt("close-settings","关闭设置","x")}</div><h2 id="settings-title">游戏设置</h2><p class="dialog-description">选好小伙伴，开始一场记忆力小派对。</p><fieldset><legend>棋盘大小</legend><div class="size-options" role="group" aria-label="棋盘大小"><button type="button" data-pairs="12"><strong>12 对</strong><small>动物朋友 · 轻松记</small></button><button type="button" data-pairs="24"><strong>24 对</strong><small>动物与水果 · 挑战记</small></button></div></fieldset><fieldset class="difficulty-setting"><legend>机器人难度</legend><select id="bot-difficulty" aria-label="机器人难度" aria-describedby="difficulty-description">${ml.map(n=>`<option value="${n}">${fr[n].label}${n==="normal"?"（默认）":""}</option>`).join("")}</select><p id="difficulty-description"></p></fieldset><fieldset><legend>玩家人数</legend><div class="count-options" role="group" aria-label="玩家人数">${[2,3,4].map(n=>`<button type="button" data-count="${n}">${n} 人</button>`).join("")}</div></fieldset><div class="roster-settings">${Mn.map((n,e)=>`<div class="roster-row" data-seat="${e}">${sc(e)}<strong>${Mi(e)}</strong><div class="seat-roles" role="group" aria-label="${Mi(e)}席位类型">${[!1,!0].map(t=>`<button type="button" data-owner="${e}" data-bot="${t}" aria-label="${Mi(e)}设为${t?"机器人":"真人"}">${xt(t?"bot":"user-round")}<span>${t?"机器人":"真人"}</span></button>`).join("")}</div></div>`).join("")}</div><p id="roster-summary" class="roster-summary" aria-live="polite"></p><div class="settings-submit"><p class="setting-note">确认后重新洗牌，当前进度将清零。</p><button type="submit" class="primary-button wide">按此设置开始新局${xt("arrow-right")}</button></div></form></dialog>
  <dialog id="restart-dialog" aria-labelledby="restart-title"><div class="dialog-top"><span class="eyebrow">SHUFFLE & SMILE</span>${Xt("close-restart","取消重开","x")}</div><h2 id="restart-title">重新开始这一局？</h2><p class="dialog-description">沿用当前人数、阵容、棋盘大小和机器人难度。重新洗牌，当前得分和进度会清零。</p><div class="dialog-actions"><button class="secondary-button" id="cancel-restart">继续这局</button><button class="primary-button" id="confirm-restart">重新开局${xt("arrow-right")}</button></div></dialog>
  <dialog id="result-dialog" aria-labelledby="result-title"><div class="dialog-top"><span class="eyebrow">A POCKET FULL OF PAIRS</span>${Xt("close-result","查看棋盘","x")}</div><div class="result-trophy">${xt("trophy")}</div><h2 id="result-title">今天的记忆小高手</h2><p id="result-description" class="dialog-description"></p><div id="result-scores" class="result-scores"></div><p id="result-attempts" class="roster-summary"></p><button id="play-again" class="primary-button wide">再来一局${xt("arrow-right")}</button><button id="change-roster" class="text-button">换个阵容</button></dialog>
  <div id="toast" class="toast" role="status" hidden></div><div id="announcement" class="sr-only" role="status" aria-live="polite"></div>
`;function Uy(n){clearTimeout(pl),we("#toast").textContent=n,we("#toast").hidden=!1,pl=setTimeout(()=>{we("#toast").hidden=!0},3e3)}function li(){it.paused=ri||!!Fn||document.hidden||fl,it.paused&&Ai?.cancelGesture(),qt.suspend(it.paused),we("#paused-state").hidden=!ri||!!Fn||fl;const n=ri?"继续游戏":"暂停游戏";we("#pause-button").innerHTML=xt(ri?"play":"pause"),we("#pause-button").setAttribute("aria-label",n),we("#pause-button").dataset.tooltip=n,Kr(),js()}function ca(n,e){Fn||(Ji=e??(document.activeElement===document.body?we("#settings-button"):document.activeElement)),Fn?.close(),Fn=we(n),Fn.showModal(),li()}function lc(){Fn?.close(),Fn=null,li(),Ji?.isConnected&&!Ji.closest("[hidden]")&&!(Ji instanceof HTMLButtonElement&&Ji.disabled)?Ji.focus():we("#settings-button").focus()}function Vf(){qt.enabled=ii;const n=ii?"关闭音效":"开启音效";we("#sound-button").innerHTML=xt(ii?"volume-2":"volume-x"),we("#sound-button").setAttribute("aria-label",n),we("#sound-button").dataset.tooltip=n,we("#sound-button").setAttribute("aria-pressed",String(ii)),Kr()}function Hf(){we("#players").style.setProperty("--count",String(pt.count)),we("#players").innerHTML=Mn.slice(0,pt.count).map((e,t)=>`<article class="player" data-player="${t}" style="--team:${e.color};--ink:${e.ink};--pale:${e.pale}"><div class="player-info">${sc(t)}<div class="player-name"><strong>${Mi(t)}</strong><small>${xt(pt.bots[t]?"bot":"user-round")}${pt.bots[t]?`${pt.difficulty==="perfect"?"完美":fr[pt.difficulty].label}机器人`:"真人"}</small></div><div class="player-score"><strong id="score-${t}">0</strong><span>对</span></div></div><div class="player-bottom"><span class="player-state" id="player-state-${t}">等待回合</span><div class="collection" id="collection-${t}"></div></div></article>`).join("");const n=pt.bots.filter(Boolean).length;we("#roster-label").textContent=`${pt.count-n} 真人 · ${n} 机器人`,we("#tile-grid").innerHTML=it.state.deck.map((e,t)=>`<button class="tile-option" data-tile="${t}" type="button"><img alt=""/><span>${String(t+1).padStart(2,"0")}</span></button>`).join(""),Kr()}function js(){const n=it.state,e=n.scores.reduce((s,a)=>s+a,0),t=n.current;oc=n.actions.length,kf=it.ready,we("#matched-count").textContent=String(e).padStart(2,"0"),we("#total-pairs").textContent=String(pt.pairs),we("#attempt-count").textContent=String(n.attempts).padStart(2,"0"),we("#turn-label").textContent=n.phase==="finished"?"所有好朋友都找到啦":`${Mi(t)}的回合`,we("#turn-role").textContent=n.phase==="finished"?"已完成":it.isBot?`${fr[pt.difficulty].label}机器人`:"真人";const i=n.open.length===2&&n.deck[n.open[0]]===n.deck[n.open[1]],r=n.phase==="finished"?"每一次相遇，都成了一对":it.paused?"棋子留在这里，等你回来":n.phase==="settling"?i?"是一对！收进你的小口袋":"记住它们，下次再相遇":it.isBot?"小机器人正在回忆…":n.phase==="second"?"另一位好朋友，藏在哪里？":n.last==="match"?"好记性！再找一对吧":n.last==="miss"?"轮到你啦，翻开两枚棋子":"翻开两枚，找到好朋友";we("#status-heading").textContent=r,we("#status-description").textContent=n.phase==="finished"?`共找到 ${e} 对，尝试了 ${n.attempts} 次。`:n.phase==="settling"?i?"每对 1 分，配对成功可以继续翻。":"稍后盖回棋子，轮到下一位小伙伴。":n.phase==="second"?`已翻开${Ps[n.deck[n.open[0]]]}，再选一枚棋子。`:"记住每一次相遇，下一对也许就在那里。",we("#announcement").textContent=`${we("#turn-label").textContent}。${r}。${we("#status-description").textContent}`;for(let s=0;s<2;s++){const a=n.open[s],o=we(`#reveal-${s}`);o.innerHTML=a===void 0?"<span>?</span>":`<img src="${Lr(n.deck[a])}" alt="${Ps[n.deck[a]]}"/>`,o.classList.toggle("open",a!==void 0)}for(let s=0;s<pt.count;s++){we(`[data-player="${s}"]`).classList.toggle("active",t===s&&n.phase!=="finished"),we(`#score-${s}`).textContent=String(n.scores[s]),we(`#player-state-${s}`).textContent=n.phase==="finished"?gl(n).includes(s)?"记忆小高手":"配对完成":t===s?it.paused?"暂停中":it.isBot?"正在回忆":"轮到你啦":"等待回合";const a=[...new Set(n.deck.filter((o,l)=>n.owners[l]===s))];we(`#collection-${s}`).innerHTML=a.length?a.slice(-4).map(o=>`<img src="${Lr(o)}" alt="已找到${Ps[o]}一对"/>`).join("")+(a.length>4?`<small>+${a.length-4}</small>`:""):"<span>小口袋等你装满</span>"}document.querySelectorAll("[data-tile]").forEach(s=>{const a=Number(s.dataset.tile),o=n.owners[a]>=0,l=n.open.includes(a);s.disabled=!it.ready||it.isBot||o||l,s.setAttribute("aria-label",`第 ${a+1} 枚，${o?"已配对":l?Ps[n.deck[a]]:"背面"}`),s.classList.toggle("matched",o),s.classList.toggle("face-up",l);const c=s.querySelector("img");c.src=Lr(l||o?n.deck[a]:-1)})}function Oy(){const n=performance.now(),e=Fs?Math.min((n-Fs)/1e3,.05):0;Fs=n;const t=it.state;if(t.actions.length!==oc){const i=t.actions.at(-1);!it.paused&&i&&qt.play(i.type==="flip"?"flip":t.last==="match"?"match":"miss"),Zr(t),js()}else kf!==it.ready&&js();t.phase==="finished"&&!ac&&!it.paused&&(dl+=e,dl>=.75&&(qt.play("win"),Fy()))}function Fy(){ac=!0;const n=it.state,e=gl(n);we("#result-title").textContent=e.length>1?"一起成为记忆小高手！":`${Mn[e[0]].name}，好记性！`,we("#result-description").textContent=`${e.map(Mi).join("、")}找到 ${n.scores[e[0]]} 对好朋友。`,we("#result-scores").innerHTML=n.scores.map((t,i)=>`<div class="result-row ${e.includes(i)?"winner":""}">${sc(i)}<span>${Mi(i)}</span>${e.includes(i)?xt("trophy"):""}<strong>${t}<small> 对</small></strong></div>`).join(""),we("#result-attempts").textContent=`${pt.pairs} 对全部找到 · 共尝试 ${n.attempts} 次`,ca("#result-dialog"),Kr()}function ua(){qt.stop(),qt.unlock(),it.dispose(),it=new kh(pt),ac=!1,dl=0,ri=!1,oc=-1,Fs=0,Ai?.setGame(it),Hf(),lc(),Zr(it.state)}function Wf(n){qt.unlock(),it.flip(n)&&(Zr(it.state),js(),qt.play("flip"))}function Jr(){document.querySelectorAll("[data-seat]").forEach(e=>{e.hidden=Number(e.dataset.seat)>=ei}),document.querySelectorAll("[data-count]").forEach(e=>e.setAttribute("aria-pressed",String(Number(e.dataset.count)===ei))),document.querySelectorAll("[data-pairs]").forEach(e=>e.setAttribute("aria-pressed",String(Number(e.dataset.pairs)===oa))),document.querySelectorAll("[data-owner]").forEach(e=>e.setAttribute("aria-pressed",String((Xr[Number(e.dataset.owner)]??!1)===(e.dataset.bot==="true"))));const n=Xr.slice(0,ei).filter(Boolean).length;we("#roster-summary").textContent=`${ei-n} 真人 · ${n} 机器人${n===ei?" · 看机器人比一局":""}`,we("#bot-difficulty").value=qr,we("#bot-difficulty").disabled=n===0,we("#difficulty-description").textContent=`${fr[qr].description}${n?" 本局所有机器人使用此难度。":" 加入机器人后生效。"}`}function Xf(n){ei=pt.count,oa=pt.pairs,Xr=[...pt.bots,!1,!1].slice(0,4),qr=pt.difficulty,Jr(),ca("#settings-dialog",n?.currentTarget)}function cc(n){we("#tile-panel").hidden=!n,we("#tiles-button").setAttribute("aria-expanded",String(n)),n||we("#tiles-button").focus()}we("#rules-button").addEventListener("click",()=>ca("#rules-dialog",we("#rules-button")));we("#settings-button").addEventListener("click",Xf);we("#change-roster").addEventListener("click",Xf);for(const n of["close-rules","rules-ready","close-settings","close-restart","cancel-restart","close-result"])we(`#${n}`).addEventListener("click",lc);document.querySelectorAll("dialog").forEach(n=>n.addEventListener("cancel",e=>{e.preventDefault(),lc()}));we("#restart-button").addEventListener("click",()=>!it.state.actions.length||it.state.phase==="finished"?ua():ca("#restart-dialog",we("#restart-button")));we("#confirm-restart").addEventListener("click",ua);we("#play-again").addEventListener("click",ua);we("#pause-button").addEventListener("click",()=>{ri=!ri,qt.unlock(),li()});we("#resume-button").addEventListener("click",()=>{ri=!1,qt.unlock(),li()});we("#sound-button").addEventListener("click",()=>{ii=!ii,Vf(),Ff(pt,ii),qt.unlock(),qt.suspend(it.paused)});for(const n of["left","reset","top","right"])we(`#view-${n}`).addEventListener("click",()=>Ai?.view(n));we("#tiles-button").addEventListener("click",()=>cc(we("#tile-panel").hidden));we("#close-tiles").addEventListener("click",()=>cc(!1));we("#tile-grid").addEventListener("click",n=>{const e=n.target.closest("[data-tile]");e&&!e.disabled&&Wf(Number(e.dataset.tile))});document.querySelectorAll("[data-count]").forEach(n=>n.addEventListener("click",()=>{ei=Number(n.dataset.count),Jr()}));document.querySelectorAll("[data-pairs]").forEach(n=>n.addEventListener("click",()=>{oa=Number(n.dataset.pairs),Jr()}));document.querySelectorAll("[data-owner]").forEach(n=>n.addEventListener("click",()=>{Xr[Number(n.dataset.owner)]=n.dataset.bot==="true",Jr()}));we("#bot-difficulty").addEventListener("change",()=>{qr=we("#bot-difficulty").value,Jr()});we("#settings-form").addEventListener("submit",n=>{n.preventDefault(),pt=Ir({count:ei,pairs:oa,bots:Xr,difficulty:qr}),Ff(pt,ii),ua()});document.addEventListener("visibilitychange",li,{signal:la});window.addEventListener("keydown",n=>{n.key==="Escape"&&!Fn&&!we("#tile-panel").hidden&&cc(!1)},{signal:la});const By=Iy(we("#fullscreen-button"),n=>{we("#fullscreen-button").innerHTML=xt(n?"minimize":"maximize"),Kr()},()=>Uy("暂时无法切换全屏，请稍后再试。"));function uh(){fl=!0,li();const n=Ai;Ai=void 0,n?.dispose(),we("#match-scene").innerHTML='<div class="scene-loading error-state"><strong>暂时无法打开 3D 棋盘</strong><span>请使用支持 WebGL 的浏览器，或重新加载试试。已保存的对局会保留。</span><button class="primary-button" id="retry-button">重新加载</button></div>',we("#retry-button").addEventListener("click",()=>location.reload())}Hf();Vf();li();Zr(it.state);try{Ai=new Ry(we("#match-scene"),it,Oy,Wf,uh),we("#loading").remove()}catch(n){console.error(n),uh()}function zy(){Zr(it.state),Gf.abort(),clearTimeout(pl),By(),Ai?.dispose(),it.dispose(),qt.dispose()}window.addEventListener("pagehide",n=>{n.persisted?(it.paused=!0,qt.suspend(!0)):zy()},{signal:la});window.addEventListener("pageshow",n=>{n.persisted&&li()},{signal:la});
