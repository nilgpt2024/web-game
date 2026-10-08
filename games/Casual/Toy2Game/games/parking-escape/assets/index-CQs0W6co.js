(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const Ud={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};const Fd=([i,e,t])=>{const n=document.createElementNS("http://www.w3.org/2000/svg",i);return Object.keys(e).forEach(s=>{n.setAttribute(s,String(e[s]))}),t?.length&&t.forEach(s=>{const a=Fd(s);n.appendChild(a)}),n},nh=(i,e={})=>{const n={...Ud,...e};return Fd(["svg",n,i])};const sh=i=>{for(const e in i)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};const ah=(...i)=>i.filter((e,t,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===t).join(" ").trim();const rh=i=>i.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());const oh=i=>{const e=rh(i);return e.charAt(0).toUpperCase()+e.slice(1)};const lh=i=>Array.from(i.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),nc=i=>typeof i=="string"?i:!i||!i.class?"":i.class&&typeof i.class=="string"?i.class.split(" "):i.class&&Array.isArray(i.class)?i.class:"",sc=(i,{nameAttr:e,icons:t,attrs:n})=>{const s=i.getAttribute(e);if(s==null)return;const a=oh(s),r=t[a];if(!r)return console.warn(`${i.outerHTML} icon name was not found in the provided icons object.`);const o=lh(i),c=sh(o)?{}:{"aria-hidden":"true"},l={...Ud,"data-lucide":s,...c,...n,...o},f=nc(o),u=nc(n),d=ah("lucide",`lucide-${s}`,...f,...u);d&&Object.assign(l,{class:d});const m=nh(r,l);return i.parentNode?.replaceChild(m,i)};const ch=[["path",{d:"M12 5v14"}],["path",{d:"m19 12-7 7-7-7"}]];const dh=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];const uh=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];const hh=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];const fh=[["path",{d:"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 14h.01"}],["rect",{width:"18",height:"8",x:"3",y:"10",rx:"2"}],["path",{d:"M5 18v2"}],["path",{d:"M19 18v2"}]];const ph=[["path",{d:"M20 6 9 17l-5-5"}]];const mh=[["path",{d:"m9 18 6-6-6-6"}]];const xh=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];const gh=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}]];const _h=[["path",{d:"M12 3v18"}],["path",{d:"M3 12h18"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}]];const vh=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];const Mh=[["line",{x1:"2",x2:"5",y1:"12",y2:"12"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}],["circle",{cx:"12",cy:"12",r:"7"}],["circle",{cx:"12",cy:"12",r:"3"}]];const yh=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];const Sh=[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3"}]];const Eh=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];const bh=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];const Th=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]];const Ah=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];const zh=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}]];const wh=[["path",{d:"M14 17H5"}],["path",{d:"M19 7h-9"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]];const Rh=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];const Ch=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18"}],["path",{d:"M4 22h16"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6"}]];const Ph=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];const Dh=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];const Ih=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]];const Lh=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];const Od=({icons:i={},nameAttr:e="data-lucide",attrs:t={},root:n=document,inTemplates:s}={})=>{if(!Object.values(i).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof n>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(n.querySelectorAll(`[${e}]`)).forEach(r=>sc(r,{nameAttr:e,icons:i,attrs:t})),s&&Array.from(n.querySelectorAll("template")).forEach(o=>Od({icons:i,nameAttr:e,attrs:t,root:o.content,inTemplates:s})),e==="data-lucide"){const r=n.querySelectorAll("[icon-name]");r.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(r).forEach(o=>sc(o,{nameAttr:"icon-name",icons:i,attrs:t})))}},Bd="toy2game-library-v1";function Nh(){try{const i=JSON.parse(localStorage.getItem(Bd)??"{}");return{favorites:Array.isArray(i?.favorites)?[...new Set(i.favorites.filter(e=>typeof e=="string"))]:[],recent:Array.isArray(i?.recent)?i.recent.filter(e=>typeof e?.id=="string"&&Number.isFinite(e?.playedAt)).slice(0,24):[]}}catch{return{favorites:[],recent:[]}}}function Uh(i){try{return localStorage.setItem(Bd,JSON.stringify(i)),!0}catch{return!1}}function Fh(i){const e=Nh();e.recent=[{id:i,playedAt:Date.now()},...e.recent.filter(t=>t.id!==i)].slice(0,24),Uh(e)}function Oh(i){return new URL("../../",new URL(i,window.location.origin)).pathname}function xi(i){for(var e=arguments.length,t=Array(e>1?e-1:0),n=1;n<e;n++)t[n-1]=arguments[n];throw Error("[Immer] minified error nr: "+i+(t.length?" "+t.map((function(s){return"'"+s+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function ds(i){return!!i&&!!i[ti]}function In(i){var e;return!!i&&((function(t){if(!t||typeof t!="object")return!1;var n=Object.getPrototypeOf(t);if(n===null)return!0;var s=Object.hasOwnProperty.call(n,"constructor")&&n.constructor;return s===Object||typeof s=="function"&&Function.toString.call(s)===qh})(i)||Array.isArray(i)||!!i[hc]||!!(!((e=i.constructor)===null||e===void 0)&&e[hc])||Qo(i)||jo(i))}function Os(i,e,t){t===void 0&&(t=!1),xs(i)===0?(t?Object.keys:sl)(i).forEach((function(n){t&&typeof n=="symbol"||e(n,i[n],i)})):i.forEach((function(n,s){return e(s,n,i)}))}function xs(i){var e=i[ti];return e?e.i>3?e.i-4:e.i:Array.isArray(i)?1:Qo(i)?2:jo(i)?3:0}function $r(i,e){return xs(i)===2?i.has(e):Object.prototype.hasOwnProperty.call(i,e)}function Bh(i,e){return xs(i)===2?i.get(e):i[e]}function Gd(i,e,t){var n=xs(i);n===2?i.set(e,t):n===3?i.add(t):i[e]=t}function Gh(i,e){return i===e?i!==0||1/i==1/e:i!=i&&e!=e}function Qo(i){return Wh&&i instanceof Map}function jo(i){return Xh&&i instanceof Set}function bn(i){return i.o||i.t}function el(i){if(Array.isArray(i))return Array.prototype.slice.call(i);var e=Yh(i);delete e[ti];for(var t=sl(e),n=0;n<t.length;n++){var s=t[n],a=e[s];a.writable===!1&&(a.writable=!0,a.configurable=!0),(a.get||a.set)&&(e[s]={configurable:!0,writable:!0,enumerable:a.enumerable,value:i[s]})}return Object.create(Object.getPrototypeOf(i),e)}function tl(i,e){return e===void 0&&(e=!1),il(i)||ds(i)||!In(i)||(xs(i)>1&&(i.set=i.add=i.clear=i.delete=Hh),Object.freeze(i),e&&Os(i,(function(t,n){return tl(n,!0)}),!0)),i}function Hh(){xi(2)}function il(i){return i==null||typeof i!="object"||Object.isFrozen(i)}function Ri(i){var e=Kh[i];return e||xi(18,i),e}function ac(){return Bs}function ar(i,e){e&&(Ri("Patches"),i.u=[],i.s=[],i.v=e)}function Ia(i){Jr(i),i.p.forEach(kh),i.p=null}function Jr(i){i===Bs&&(Bs=i.l)}function rc(i){return Bs={p:[],l:Bs,h:i,m:!0,_:0}}function kh(i){var e=i[ti];e.i===0||e.i===1?e.j():e.g=!0}function rr(i,e){e._=e.p.length;var t=e.p[0],n=i!==void 0&&i!==t;return e.h.O||Ri("ES5").S(e,i,n),n?(t[ti].P&&(Ia(e),xi(4)),In(i)&&(i=La(e,i),e.l||Na(e,i)),e.u&&Ri("Patches").M(t[ti].t,i,e.u,e.s)):i=La(e,t,[]),Ia(e),e.u&&e.v(e.u,e.s),i!==Hd?i:void 0}function La(i,e,t){if(il(e))return e;var n=e[ti];if(!n)return Os(e,(function(o,c){return oc(i,n,e,o,c,t)}),!0),e;if(n.A!==i)return e;if(!n.P)return Na(i,n.t,!0),n.t;if(!n.I){n.I=!0,n.A._--;var s=n.i===4||n.i===5?n.o=el(n.k):n.o,a=s,r=!1;n.i===3&&(a=new Set(s),s.clear(),r=!0),Os(a,(function(o,c){return oc(i,n,s,o,c,t,r)})),Na(i,s,!1),t&&i.u&&Ri("Patches").N(n,t,i.u,i.s)}return n.o}function oc(i,e,t,n,s,a,r){if(ds(s)){var o=La(i,s,a&&e&&e.i!==3&&!$r(e.R,n)?a.concat(n):void 0);if(Gd(t,n,o),!ds(o))return;i.m=!1}else r&&t.add(s);if(In(s)&&!il(s)){if(!i.h.D&&i._<1)return;La(i,s),e&&e.A.l||Na(i,s)}}function Na(i,e,t){t===void 0&&(t=!1),!i.l&&i.h.D&&i.m&&tl(e,t)}function or(i,e){var t=i[ti];return(t?bn(t):i)[e]}function lc(i,e){if(e in i)for(var t=Object.getPrototypeOf(i);t;){var n=Object.getOwnPropertyDescriptor(t,e);if(n)return n;t=Object.getPrototypeOf(t)}}function Zr(i){i.P||(i.P=!0,i.l&&Zr(i.l))}function lr(i){i.o||(i.o=el(i.t))}function Qr(i,e,t){var n=Qo(e)?Ri("MapSet").F(e,t):jo(e)?Ri("MapSet").T(e,t):i.O?(function(s,a){var r=Array.isArray(s),o={i:r?1:0,A:a?a.A:ac(),P:!1,I:!1,R:{},l:a,t:s,k:null,o:null,j:null,C:!1},c=o,l=jr;r&&(c=[o],l=Cs);var f=Proxy.revocable(c,l),u=f.revoke,d=f.proxy;return o.k=d,o.j=u,d})(e,t):Ri("ES5").J(e,t);return(t?t.A:ac()).p.push(n),n}function Vh(i){return ds(i)||xi(22,i),(function e(t){if(!In(t))return t;var n,s=t[ti],a=xs(t);if(s){if(!s.P&&(s.i<4||!Ri("ES5").K(s)))return s.t;s.I=!0,n=cc(t,a),s.I=!1}else n=cc(t,a);return Os(n,(function(r,o){s&&Bh(s.t,r)===o||Gd(n,r,e(o))})),a===3?new Set(n):n})(i)}function cc(i,e){switch(e){case 2:return new Map(i);case 3:return Array.from(i)}return el(i)}var dc,Bs,nl=typeof Symbol<"u"&&typeof Symbol("x")=="symbol",Wh=typeof Map<"u",Xh=typeof Set<"u",uc=typeof Proxy<"u"&&Proxy.revocable!==void 0&&typeof Reflect<"u",Hd=nl?Symbol.for("immer-nothing"):((dc={})["immer-nothing"]=!0,dc),hc=nl?Symbol.for("immer-draftable"):"__$immer_draftable",ti=nl?Symbol.for("immer-state"):"__$immer_state",qh=""+Object.prototype.constructor,sl=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Object.getOwnPropertySymbols!==void 0?function(i){return Object.getOwnPropertyNames(i).concat(Object.getOwnPropertySymbols(i))}:Object.getOwnPropertyNames,Yh=Object.getOwnPropertyDescriptors||function(i){var e={};return sl(i).forEach((function(t){e[t]=Object.getOwnPropertyDescriptor(i,t)})),e},Kh={},jr={get:function(i,e){if(e===ti)return i;var t=bn(i);if(!$r(t,e))return(function(s,a,r){var o,c=lc(a,r);return c?"value"in c?c.value:(o=c.get)===null||o===void 0?void 0:o.call(s.k):void 0})(i,t,e);var n=t[e];return i.I||!In(n)?n:n===or(i.t,e)?(lr(i),i.o[e]=Qr(i.A.h,n,i)):n},has:function(i,e){return e in bn(i)},ownKeys:function(i){return Reflect.ownKeys(bn(i))},set:function(i,e,t){var n=lc(bn(i),e);if(n?.set)return n.set.call(i.k,t),!0;if(!i.P){var s=or(bn(i),e),a=s?.[ti];if(a&&a.t===t)return i.o[e]=t,i.R[e]=!1,!0;if(Gh(t,s)&&(t!==void 0||$r(i.t,e)))return!0;lr(i),Zr(i)}return i.o[e]===t&&(t!==void 0||e in i.o)||Number.isNaN(t)&&Number.isNaN(i.o[e])||(i.o[e]=t,i.R[e]=!0),!0},deleteProperty:function(i,e){return or(i.t,e)!==void 0||e in i.t?(i.R[e]=!1,lr(i),Zr(i)):delete i.R[e],i.o&&delete i.o[e],!0},getOwnPropertyDescriptor:function(i,e){var t=bn(i),n=Reflect.getOwnPropertyDescriptor(t,e);return n&&{writable:!0,configurable:i.i!==1||e!=="length",enumerable:n.enumerable,value:t[e]}},defineProperty:function(){xi(11)},getPrototypeOf:function(i){return Object.getPrototypeOf(i.t)},setPrototypeOf:function(){xi(12)}},Cs={};Os(jr,(function(i,e){Cs[i]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}})),Cs.deleteProperty=function(i,e){return Cs.set.call(this,i,e,void 0)},Cs.set=function(i,e,t){return jr.set.call(this,i[0],e,t,i[0])};var $h=(function(){function i(t){var n=this;this.O=uc,this.D=!0,this.produce=function(s,a,r){if(typeof s=="function"&&typeof a!="function"){var o=a;a=s;var c=n;return function(M){var p=this;M===void 0&&(M=o);for(var h=arguments.length,S=Array(h>1?h-1:0),A=1;A<h;A++)S[A-1]=arguments[A];return c.produce(M,(function(y){var z;return(z=a).call.apply(z,[p,y].concat(S))}))}}var l;if(typeof a!="function"&&xi(6),r!==void 0&&typeof r!="function"&&xi(7),In(s)){var f=rc(n),u=Qr(n,s,void 0),d=!0;try{l=a(u),d=!1}finally{d?Ia(f):Jr(f)}return typeof Promise<"u"&&l instanceof Promise?l.then((function(M){return ar(f,r),rr(M,f)}),(function(M){throw Ia(f),M})):(ar(f,r),rr(l,f))}if(!s||typeof s!="object"){if((l=a(s))===void 0&&(l=s),l===Hd&&(l=void 0),n.D&&tl(l,!0),r){var m=[],g=[];Ri("Patches").M(s,l,m,g),r(m,g)}return l}xi(21,s)},this.produceWithPatches=function(s,a){if(typeof s=="function")return function(l){for(var f=arguments.length,u=Array(f>1?f-1:0),d=1;d<f;d++)u[d-1]=arguments[d];return n.produceWithPatches(l,(function(m){return s.apply(void 0,[m].concat(u))}))};var r,o,c=n.produce(s,a,(function(l,f){r=l,o=f}));return typeof Promise<"u"&&c instanceof Promise?c.then((function(l){return[l,r,o]})):[c,r,o]},typeof t?.useProxies=="boolean"&&this.setUseProxies(t.useProxies),typeof t?.autoFreeze=="boolean"&&this.setAutoFreeze(t.autoFreeze)}var e=i.prototype;return e.createDraft=function(t){In(t)||xi(8),ds(t)&&(t=Vh(t));var n=rc(this),s=Qr(this,t,void 0);return s[ti].C=!0,Jr(n),s},e.finishDraft=function(t,n){var s=t&&t[ti],a=s.A;return ar(a,n),rr(void 0,a)},e.setAutoFreeze=function(t){this.D=t},e.setUseProxies=function(t){t&&!uc&&xi(20),this.O=t},e.applyPatches=function(t,n){var s;for(s=n.length-1;s>=0;s--){var a=n[s];if(a.path.length===0&&a.op==="replace"){t=a.value;break}}s>-1&&(n=n.slice(s+1));var r=Ri("Patches").$;return ds(t)?r(t,n):this.produce(t,(function(o){return r(o,n)}))},i})(),ii=new $h,Jh=ii.produce;ii.produceWithPatches.bind(ii);ii.setAutoFreeze.bind(ii);ii.setUseProxies.bind(ii);ii.applyPatches.bind(ii);ii.createDraft.bind(ii);ii.finishDraft.bind(ii);class Zh{constructor(e){const t=Qh();this.c=1,this.s0=t(" "),this.s1=t(" "),this.s2=t(" "),this.s0-=t(e),this.s0<0&&(this.s0+=1),this.s1-=t(e),this.s1<0&&(this.s1+=1),this.s2-=t(e),this.s2<0&&(this.s2+=1)}next(){const e=2091639*this.s0+this.c*23283064365386963e-26;return this.s0=this.s1,this.s1=this.s2,this.s2=e-(this.c=Math.trunc(e))}}function Qh(){let i=4022871197;return function(t){const n=t.toString();for(let s=0;s<n.length;s++){i+=n.charCodeAt(s);let a=.02519603282416938*i;i=a>>>0,a-=i,a*=i,i=a>>>0,a-=i,i+=a*4294967296}return(i>>>0)*23283064365386963e-26}}function fc(i,e){return e.c=i.c,e.s0=i.s0,e.s1=i.s1,e.s2=i.s2,e}function jh(i,e){const t=new Zh(i),n=t.next.bind(t);return e&&fc(e,t),n.state=()=>fc(t,{}),n}class pc{constructor(e){this.state=e||{seed:"0"},this.used=!1}static seed(){return Date.now().toString(36).slice(-10)}isUsed(){return this.used}getState(){return this.state}_random(){this.used=!0;const e=this.state,t=e.prngstate?"":e.seed,n=jh(t,e.prngstate),s=n();return this.state={...e,prngstate:n.state()},s}api(){const e=this._random.bind(this),t={D4:4,D6:6,D8:8,D10:10,D12:12,D20:20},n={};for(const a in t){const r=t[a];n[a]=o=>o===void 0?Math.floor(e()*r)+1:Array.from({length:o}).map(()=>Math.floor(e()*r)+1)}function s(a=6,r){return r===void 0?Math.floor(e()*a)+1:Array.from({length:r}).map(()=>Math.floor(e()*a)+1)}return{...n,Die:s,Number:()=>e(),Shuffle:a=>{const r=[...a];let o=a.length,c=0;const l=Array.from({length:o});for(;o;){const f=Math.trunc(o*e());l[c++]=r[f],r[f]=r[--o]}return l},_private:this}}}const ef={name:"random",noClient:({api:i})=>i._private.isUsed(),flush:({api:i})=>i._private.getState(),api:({data:i})=>new pc(i).api(),setup:({game:i})=>{let{seed:e}=i;return e===void 0&&(e=pc.seed()),{seed:e}},playerView:()=>{}};var cr,mc;function tf(){if(mc)return cr;mc=1;var i="[object Object]";function e(d){var m=!1;if(d!=null&&typeof d.toString!="function")try{m=!!(d+"")}catch{}return m}function t(d,m){return function(g){return d(m(g))}}var n=Function.prototype,s=Object.prototype,a=n.toString,r=s.hasOwnProperty,o=a.call(Object),c=s.toString,l=t(Object.getPrototypeOf,Object);function f(d){return!!d&&typeof d=="object"}function u(d){if(!f(d)||c.call(d)!=i||e(d))return!1;var m=l(d);if(m===null)return!0;var g=r.call(m,"constructor")&&m.constructor;return typeof g=="function"&&g instanceof g&&a.call(g)==o}return cr=u,cr}tf();const al="MAKE_MOVE",qa="GAME_EVENT",rl="REDO",ol="RESET",ll="SYNC",cl="UNDO",dl="UPDATE",ul="PATCH",kd="PLUGIN",Ya="STRIP_TRANSIENTS",nf=(i,e,t,n)=>({type:al,payload:{type:i,args:e,playerID:t,credentials:n}}),ba=(i,e,t,n)=>({type:qa,payload:{type:i,args:e,playerID:t,credentials:n}}),Vd=(i,e,t,n)=>({type:qa,payload:{type:i,args:e,playerID:t,credentials:n},automatic:!0}),Wd=i=>({type:ll,state:i.state,log:i.log,initialState:i.initialState,clientOnly:!0}),Xd=(i,e,t,n)=>({type:ul,prevStateID:i,stateID:e,patch:t,deltalog:n,clientOnly:!0}),qd=(i,e)=>({type:dl,state:i,deltalog:e,clientOnly:!0}),Yd=i=>({type:ol,state:i,clientOnly:!0}),Kd=(i,e)=>({type:cl,payload:{type:null,args:null,playerID:i,credentials:e}}),$d=(i,e)=>({type:rl,payload:{type:null,args:null,playerID:i,credentials:e}}),sf=(i,e,t,n)=>({type:kd,payload:{type:i,args:e,playerID:t,credentials:n}}),Jd=()=>({type:Ya});var af=Object.freeze({__proto__:null,makeMove:nf,gameEvent:ba,automaticGameEvent:Vd,sync:Wd,patch:Xd,update:qd,reset:Yd,undo:Kd,redo:$d,plugin:sf,stripTransients:Jd});const ss="INVALID_MOVE",rf={name:"plugin-immer",fnWrap:i=>(e,...t)=>{let n=!1;const s=Jh(e.G,a=>{const r=i({...e,G:a},...t);if(r===ss){n=!0;return}return r});return n?ss:s}};var Ot;(function(i){i.MOVE="MOVE",i.GAME_ON_END="GAME_ON_END",i.PHASE_ON_BEGIN="PHASE_ON_BEGIN",i.PHASE_ON_END="PHASE_ON_END",i.TURN_ON_BEGIN="TURN_ON_BEGIN",i.TURN_ON_MOVE="TURN_ON_MOVE",i.TURN_ON_END="TURN_ON_END"})(Ot||(Ot={}));var Vi;(function(i){i.CalledOutsideHook="Events must be called from moves or the `onBegin`, `onEnd`, and `onMove` hooks.\nThis error probably means you called an event from other game code, like an `endIf` trigger or one of the `turn.order` methods.",i.EndTurnInOnEnd="`endTurn` is disallowed in `onEnd` hooks — the turn is already ending.",i.MaxTurnEndings=`Maximum number of turn endings exceeded for this update.
This likely means game code is triggering an infinite loop.`,i.PhaseEventInOnEnd="`setPhase` & `endPhase` are disallowed in a phase’s `onEnd` hook — the phase is already ending.\nIf you’re trying to dynamically choose the next phase when a phase ends, use the phase’s `next` trigger.",i.StageEventInOnEnd="`setStage`, `endStage` & `setActivePlayers` are disallowed in `onEnd` hooks.",i.StageEventInPhaseBegin="`setStage`, `endStage` & `setActivePlayers` are disallowed in a phase’s `onBegin` hook.\nUse `setActivePlayers` in a `turn.onBegin` hook or declare stages with `turn.activePlayers` instead.",i.StageEventInTurnBegin="`setStage` & `endStage` are disallowed in `turn.onBegin`.\nUse `setActivePlayers` or declare stages with `turn.activePlayers` instead."})(Vi||(Vi={}));class of{constructor(e,t,n){this.flow=e,this.playerID=n,this.dispatch=[],this.initialTurn=t.turn,this.updateTurnContext(t,void 0),this.maxEndedTurnsPerAction=t.numPlayers*100}api(){const e={_private:this};for(const t of this.flow.eventNames)e[t]=(...n)=>{this.dispatch.push({type:t,args:n,phase:this.currentPhase,turn:this.currentTurn,calledFrom:this.currentMethod,error:new Error("Events Plugin Error")})};return e}isUsed(){return this.dispatch.length>0}updateTurnContext(e,t){this.currentPhase=e.phase,this.currentTurn=e.turn,this.currentMethod=t}unsetCurrentMethod(){this.currentMethod=void 0}update(e){const t=e,n=({stack:s},a)=>({...t,plugins:{...t.plugins,events:{...t.plugins.events,data:{error:a+`
`+s}}}});e:for(let s=0;s<this.dispatch.length;s++){const a=this.dispatch[s],r=a.turn!==e.ctx.turn;if(this.currentTurn-this.initialTurn>=this.maxEndedTurnsPerAction)return n(a.error,Vi.MaxTurnEndings);if(a.calledFrom===void 0)return n(a.error,Vi.CalledOutsideHook);if(e.ctx.gameover)break e;switch(a.type){case"endStage":case"setStage":case"setActivePlayers":{switch(a.calledFrom){case Ot.TURN_ON_END:case Ot.PHASE_ON_END:return n(a.error,Vi.StageEventInOnEnd);case Ot.PHASE_ON_BEGIN:return n(a.error,Vi.StageEventInPhaseBegin);case Ot.TURN_ON_BEGIN:if(a.type==="setActivePlayers")break;return n(a.error,Vi.StageEventInTurnBegin)}if(r)continue e;break}case"endTurn":{if(a.calledFrom===Ot.TURN_ON_END||a.calledFrom===Ot.PHASE_ON_END)return n(a.error,Vi.EndTurnInOnEnd);if(r)continue e;break}case"endPhase":case"setPhase":{if(a.calledFrom===Ot.PHASE_ON_END)return n(a.error,Vi.PhaseEventInOnEnd);if(a.phase!==e.ctx.phase)continue e;break}}const c=Vd(a.type,a.args,this.playerID);e=this.flow.processEvent(e,c)}return e}}const hl={name:"events",noClient:({api:i})=>i._private.isUsed(),isInvalid:({data:i})=>i.error||!1,fnWrap:(i,e)=>(t,...n)=>{const s=t.events;s&&s._private.updateTurnContext(t.ctx,e);const a=i(t,...n);return s&&s._private.unsetCurrentMethod(),a},dangerouslyFlushRawState:({state:i,api:e})=>e._private.update(i),api:({game:i,ctx:e,playerID:t})=>new of(i.flow,e,t).api()},lf={name:"log",flush:()=>({}),api:({data:i})=>({setMetadata:e=>{i.metadata=e}}),setup:()=>({})},cf={name:"plugin-serializable",fnWrap:i=>(e,...t)=>i(e,...t)},df=(...i)=>console.error(...i);function vt(i){df("ERROR:",i)}const fl=[rf,ef,lf,cf],Ks=[...fl,hl],uf=(i,e,t)=>(t.game.plugins.filter(n=>n.action!==void 0).filter(n=>n.name===e.payload.type).forEach(n=>{const s=n.name,a=i.plugins[s]||{data:{}},r=n.action(a.data,e.payload);i={...i,plugins:{...i.plugins,[s]:{...a,data:r}}}}),i),us=({plugins:i})=>Object.entries(i||{}).reduce((e,[t,{api:n}])=>(e[t]=n,e),{}),Zd=(i,e,t)=>[...fl,...t,hl].filter(n=>n.fnWrap!==void 0).reduce((n,{fnWrap:s})=>s(n,e),i),hf=(i,e)=>([...Ks,...e.game.plugins].filter(t=>t.setup!==void 0).forEach(t=>{const n=t.name,s=t.setup({G:i.G,ctx:i.ctx,game:e.game});i={...i,plugins:{...i.plugins,[n]:{data:s}}}}),i),eo=(i,e)=>([...Ks,...e.game.plugins].filter(t=>t.api!==void 0).forEach(t=>{const n=t.name,s=i.plugins[n]||{data:{}},a=t.api({G:i.G,ctx:i.ctx,data:s.data,game:e.game,playerID:e.playerID});i={...i,plugins:{...i.plugins,[n]:{...s,api:a}}}}),i),ff=(i,e)=>([...fl,...e.game.plugins,hl].reverse().forEach(t=>{const n=t.name,s=i.plugins[n]||{data:{}};if(t.flush){const a=t.flush({G:i.G,ctx:i.ctx,game:e.game,api:s.api,data:s.data});i={...i,plugins:{...i.plugins,[t.name]:{data:a}}}}else if(t.dangerouslyFlushRawState){i=t.dangerouslyFlushRawState({state:i,game:e.game,api:s.api,data:s.data});const a=i.plugins[n].data;i={...i,plugins:{...i.plugins,[t.name]:{data:a}}}}}),i),pf=(i,e)=>[...Ks,...e.game.plugins].filter(t=>t.noClient!==void 0).map(t=>{const n=t.name,s=i.plugins[n];return s?t.noClient({G:i.G,ctx:i.ctx,game:e.game,api:s.api,data:s.data}):!1}).includes(!0),mf=(i,e)=>[...Ks,...e.game.plugins].filter(n=>n.isInvalid!==void 0).map(n=>{const{name:s}=n,a=i.plugins[s],r=n.isInvalid({G:i.G,ctx:i.ctx,game:e.game,data:a&&a.data});return r?{plugin:s,message:r}:!1}).find(n=>n)||!1,Qd=(i,e)=>{const t=ff(i,e),n=mf(t,e);if(!n)return[t];const{plugin:s,message:a}=n;return vt(`${s} plugin declared action invalid:
${a}`),[i,n]},xf=({G:i,ctx:e,plugins:t={}},{game:n,playerID:s})=>([...Ks,...n.plugins].forEach(({name:a,playerView:r})=>{if(!r)return;const{data:o}=t[a]||{data:{}},c=r({G:i,ctx:e,game:n,data:o,playerID:s});t={...t,[a]:{data:c}}}),t);function Ua(i,e=!1){i.moveLimit&&(e&&(i.minMoves=i.moveLimit),i.maxMoves=i.moveLimit,delete i.moveLimit)}function Fa(i,e){let t={},n=[],s=null,a={},r={};if(Array.isArray(e)){const c={};e.forEach(l=>c[l]=Oa.NULL),t=c}else{if(Ua(e),e.next&&(s=e.next),e.revert&&(n=[...i._prevActivePlayers,{activePlayers:i.activePlayers,_activePlayersMinMoves:i._activePlayersMinMoves,_activePlayersMaxMoves:i._activePlayersMaxMoves,_activePlayersNumMoves:i._activePlayersNumMoves}]),e.currentPlayer!==void 0&&js(t,a,r,i.currentPlayer,e.currentPlayer),e.others!==void 0)for(let c=0;c<i.playOrder.length;c++){const l=i.playOrder[c];l!==i.currentPlayer&&js(t,a,r,l,e.others)}if(e.all!==void 0)for(let c=0;c<i.playOrder.length;c++){const l=i.playOrder[c];js(t,a,r,l,e.all)}if(e.value)for(const c in e.value)js(t,a,r,c,e.value[c]);if(e.minMoves)for(const c in t)a[c]===void 0&&(a[c]=e.minMoves);if(e.maxMoves)for(const c in t)r[c]===void 0&&(r[c]=e.maxMoves)}Object.keys(t).length===0&&(t=null),Object.keys(a).length===0&&(a=null),Object.keys(r).length===0&&(r=null);const o={};for(const c in t)o[c]=0;return{...i,activePlayers:t,_activePlayersMinMoves:a,_activePlayersMaxMoves:r,_activePlayersNumMoves:o,_prevActivePlayers:n,_nextActivePlayers:s}}function gf(i){let{activePlayers:e,_activePlayersMinMoves:t,_activePlayersMaxMoves:n,_activePlayersNumMoves:s,_prevActivePlayers:a,_nextActivePlayers:r}=i;if(e&&Object.keys(e).length===0)if(r)i=Fa(i,r),{activePlayers:e,_activePlayersMinMoves:t,_activePlayersMaxMoves:n,_activePlayersNumMoves:s,_prevActivePlayers:a}=i;else if(a.length>0){const o=a.length-1;({activePlayers:e,_activePlayersMinMoves:t,_activePlayersMaxMoves:n,_activePlayersNumMoves:s}=a[o]),a=a.slice(0,o)}else e=null,t=null,n=null;return{...i,activePlayers:e,_activePlayersMinMoves:t,_activePlayersMaxMoves:n,_activePlayersNumMoves:s,_prevActivePlayers:a}}function js(i,e,t,n,s){(typeof s!="object"||s===Oa.NULL)&&(s={stage:s}),s.stage!==void 0&&(Ua(s),i[n]=s.stage,s.minMoves&&(e[n]=s.minMoves),s.maxMoves&&(t[n]=s.maxMoves))}function to(i,e){return i[e]+""}function _f(i,e){let{G:t,ctx:n}=i;const{numPlayers:s}=n,r={...us(i),G:t,ctx:n},o=e.order;let c=[...Array.from({length:s})].map((d,m)=>m+"");o.playOrder!==void 0&&(c=o.playOrder(r));const l=o.first(r),f=typeof l;f!=="number"&&vt(`invalid value returned by turn.order.first — expected number got ${f} “${l}”.`);const u=to(c,l);return n={...n,currentPlayer:u,playOrderPos:l,playOrder:c},n=Fa(n,e.activePlayers||{}),n}function vf(i,e,t,n){const s=t.order;let{G:a,ctx:r}=i,o=r.playOrderPos,c=!1;if(n&&n!==!0)typeof n!="object"&&vt(`invalid argument to endTurn: ${n}`),Object.keys(n).forEach(l=>{switch(l){case"remove":e=to(r.playOrder,o);break;case"next":o=r.playOrder.indexOf(n.next),e=n.next;break;default:vt(`invalid argument to endTurn: ${l}`)}});else{const f={...us(i),G:a,ctx:r},u=s.next(f),d=typeof u;u!==void 0&&d!=="number"&&vt(`invalid value returned by turn.order.next — expected number or undefined got ${d} “${u}”.`),u===void 0?c=!0:(o=u,e=to(r.playOrder,o))}return r={...r,playOrderPos:o,currentPlayer:e},{endPhase:c,ctx:r}}const Mf={DEFAULT:{first:({ctx:i})=>i.turn===0?i.playOrderPos:(i.playOrderPos+1)%i.playOrder.length,next:({ctx:i})=>(i.playOrderPos+1)%i.playOrder.length}},Oa={NULL:null};let yf="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",Sf=(i=21)=>{let e="",t=i|0;for(;t-- >0;)e+=yf[Math.random()*64|0];return e};var dr={},vn={},xc;function jd(){if(xc)return vn;xc=1,Object.defineProperty(vn,"__esModule",{value:!0}),vn.Pointer=void 0,vn.unescapeToken=i,vn.escapeToken=e;function i(n){return n.replace(/~1/g,"/").replace(/~0/g,"~")}function e(n){return n.replace(/~/g,"~0").replace(/\//g,"~1")}var t=(function(){function n(s){s===void 0&&(s=[""]),this.tokens=s}return n.fromJSON=function(s){var a=s.split("/").map(i);if(a[0]!=="")throw new Error("Invalid JSON Pointer: ".concat(s));return new n(a)},n.prototype.toString=function(){return this.tokens.map(e).join("/")},n.prototype.evaluate=function(s){for(var a=null,r="",o=s,c=1,l=this.tokens.length;c<l;c++)a=o,r=this.tokens[c],!(r=="__proto__"||r=="constructor"||r=="prototype")&&(o=(a||{})[r]);return{parent:a,key:r,value:o}},n.prototype.get=function(s){return this.evaluate(s).value},n.prototype.set=function(s,a){var r=this.evaluate(s);r.parent&&(r.parent[r.key]=a)},n.prototype.push=function(s){this.tokens.push(s)},n.prototype.add=function(s){var a=this.tokens.concat(String(s));return new n(a)},n.prototype.parent=function(){var s=this.tokens.length>1?this.tokens.slice(0,-1):[""];return new n(s)},n})();return vn.Pointer=t,vn}var zt={},ur={},gc;function eu(){return gc||(gc=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.hasOwnProperty=void 0,i.objectType=e,i.clone=n,i.hasOwnProperty=Object.prototype.hasOwnProperty;function e(s){return s===void 0?"undefined":s===null?"null":Array.isArray(s)?"array":typeof s}function t(s){return s!=null&&typeof s=="object"}function n(s){if(!t(s))return s;if(s.constructor==Array){for(var a=s.length,r=new Array(a),o=0;o<a;o++)r[o]=n(s[o]);return r}if(s.constructor==Date){var c=new Date(+s);return c}var l={};for(var f in s)i.hasOwnProperty.call(s,f)&&(l[f]=n(s[f]));return l}})(ur)),ur}var Fi={},_c;function tu(){if(_c)return Fi;_c=1,Object.defineProperty(Fi,"__esModule",{value:!0}),Fi.isDestructive=e,Fi.subtract=t,Fi.intersection=n,Fi.diffArrays=c,Fi.diffObjects=l,Fi.diffAny=f;var i=eu();function e(u){var d=u.op;return d==="remove"||d==="replace"||d==="copy"||d==="move"}function t(u,d){var m=[];for(var g in u)i.hasOwnProperty.call(u,g)&&u[g]!==void 0&&!(i.hasOwnProperty.call(d,g)&&d[g]!==void 0)&&m.push(g);return m}function n(u){for(var d=u.length,m={},g=0;g<d;g++){var M=u[g];for(var p in M)i.hasOwnProperty.call(M,p)&&M[p]!==void 0&&(m[p]=(m[p]||0)+1)}for(var p in m)m[p]<d&&delete m[p];return Object.keys(m)}function s(u,d){var m=[];for(var g in u)i.hasOwnProperty.call(u,g)&&u[g]!==void 0&&i.hasOwnProperty.call(d,g)&&d[g]!==void 0&&m.push(g);return m}function a(u){return u.op==="add"}function r(u){return u.op==="remove"}function o(u,d){return{operations:u.operations.concat(d),cost:u.cost+1}}function c(u,d,m,g){g===void 0&&(g=f);var M=Math.max(u.length,d.length),p=new Map([[0,{operations:[],cost:0}]]);function h(E,w){var _=E*(M+1)+w,T=p.get(_);if(T===void 0){if(E>0&&w>0&&!g(u[E-1],d[w-1],m.add(String(E-1))).length)T=h(E-1,w-1);else{var P=[];if(E>0){var C=h(E-1,w),L={op:"remove",index:E-1};P.push(o(C,L))}if(w>0){var q=h(E,w-1),Y={op:"add",index:E-1,value:d[w-1]};P.push(o(q,Y))}if(E>0&&w>0){var B=h(E-1,w-1),K={op:"replace",index:E-1,original:u[E-1],value:d[w-1]};P.push(o(B,K))}var X=P.sort(function(ee,ie){return ee.cost-ie.cost})[0];T=X}p.set(_,T)}return T}var S=isNaN(u.length)||u.length<=0?0:u.length,A=isNaN(d.length)||d.length<=0?0:d.length,y=h(S,A).operations,z=y.reduce(function(E,w){var _=E[0],T=E[1];if(a(w)){var P=w.index+1+T,C=P<S+T?String(P):"-",L={op:w.op,path:m.add(C).toString(),value:w.value};return[_.concat(L),T+1]}else if(r(w)){var L={op:w.op,path:m.add(String(w.index+T)).toString()};return[_.concat(L),T-1]}else{var q=m.add(String(w.index+T)),Y=g(w.original,w.value,q);return[_.concat.apply(_,Y),T]}},[[],0])[0];return z}function l(u,d,m,g){g===void 0&&(g=f);var M=[];return t(u,d).forEach(function(p){M.push({op:"remove",path:m.add(p).toString()})}),t(d,u).forEach(function(p){M.push({op:"add",path:m.add(p).toString(),value:d[p]})}),s(u,d).forEach(function(p){M.push.apply(M,g(u[p],d[p],m.add(p)))}),M}function f(u,d,m,g){if(g===void 0&&(g=f),u===d)return[];var M=(0,i.objectType)(u),p=(0,i.objectType)(d);return M=="array"&&p=="array"?c(u,d,m,g):M=="object"&&p=="object"?l(u,d,m,g):[{op:"replace",path:m.toString(),value:d}]}return Fi}var vc;function Ef(){if(vc)return zt;vc=1;var i=zt&&zt.__extends||(function(){var p=function(h,S){return p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(A,y){A.__proto__=y}||function(A,y){for(var z in y)Object.prototype.hasOwnProperty.call(y,z)&&(A[z]=y[z])},p(h,S)};return function(h,S){if(typeof S!="function"&&S!==null)throw new TypeError("Class extends value "+String(S)+" is not a constructor or null");p(h,S);function A(){this.constructor=h}h.prototype=S===null?Object.create(S):(A.prototype=S.prototype,new A)}})();Object.defineProperty(zt,"__esModule",{value:!0}),zt.InvalidOperationError=zt.TestError=zt.MissingError=void 0,zt.add=c,zt.remove=l,zt.replace=f,zt.move=u,zt.copy=d,zt.test=m,zt.apply=M;var e=jd(),t=eu(),n=tu(),s=(function(p){i(h,p);function h(S){var A=p.call(this,"Value required at path: ".concat(S))||this;return A.path=S,A.name="MissingError",A}return h})(Error);zt.MissingError=s;var a=(function(p){i(h,p);function h(S,A){var y=p.call(this,"Test failed: ".concat(S," != ").concat(A))||this;return y.actual=S,y.expected=A,y.name="TestError",y}return h})(Error);zt.TestError=a;function r(p,h,S){if(Array.isArray(p))if(h=="-")p.push(S);else{var A=parseInt(h,10);p.splice(A,0,S)}else p[h]=S}function o(p,h){if(Array.isArray(p)){var S=parseInt(h,10);p.splice(S,1)}else delete p[h]}function c(p,h,S){var A=e.Pointer.fromJSON(h.path);if(S?.implicitArrayCreation&&A.tokens[A.tokens.length-1]==="-"){var y=A.parent().evaluate(p);y.value===void 0&&(0,t.objectType)(y.parent)==="object"&&(y.parent[y.key]=[])}var z=A.evaluate(p);return z.parent===void 0||z.parent===null?new s(h.path):S?.implicitArrayCreation&&z.key==="-"&&!Array.isArray(z.parent)?new s(h.path):(r(z.parent,z.key,(0,t.clone)(h.value)),null)}function l(p,h,S){var A=e.Pointer.fromJSON(h.path).evaluate(p);return A.parent===null?new s(h.path):A.value===void 0?new s(h.path):(o(A.parent,A.key),null)}function f(p,h,S){var A=e.Pointer.fromJSON(h.path).evaluate(p);if(A.parent===null)return new s(h.path);if(Array.isArray(A.parent)){if(parseInt(A.key,10)>=A.parent.length)return new s(h.path)}else if(A.value===void 0)return new s(h.path);return A.parent[A.key]=(0,t.clone)(h.value),null}function u(p,h,S){var A=e.Pointer.fromJSON(h.from),y=A.evaluate(p);if(y.value===void 0)return new s(h.from);var z=e.Pointer.fromJSON(h.path);if(A.tokens.length<z.tokens.length&&A.tokens.every(function(w,_){return w===z.tokens[_]}))return new s(h.path);var E=z.evaluate(p);return E.parent===void 0||E.parent===null?new s(h.path):(o(y.parent,y.key),r(E.parent,E.key,y.value),null)}function d(p,h,S){var A=e.Pointer.fromJSON(h.from).evaluate(p);if(A.value===void 0)return new s(h.from);var y=e.Pointer.fromJSON(h.path).evaluate(p);return y.parent===void 0||y.parent===null?new s(h.path):(r(y.parent,y.key,(0,t.clone)(A.value)),null)}function m(p,h,S){var A=e.Pointer.fromJSON(h.path).evaluate(p);return(0,n.diffAny)(A.value,h.value,new e.Pointer).length?new a(A.value,h.value):null}var g=(function(p){i(h,p);function h(S){var A=p.call(this,"Invalid operation: ".concat(S.op))||this;return A.operation=S,A.name="InvalidOperationError",A}return h})(Error);zt.InvalidOperationError=g;function M(p,h,S){switch(h.op){case"add":return c(p,h,S);case"remove":return l(p,h);case"replace":return f(p,h);case"move":return u(p,h);case"copy":return d(p,h);case"test":return m(p,h)}return new g(h)}return zt}var Mc;function bf(){return Mc||(Mc=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.Pointer=void 0,i.applyPatch=s,i.createPatch=r,i.createTests=c;var e=jd();Object.defineProperty(i,"Pointer",{enumerable:!0,get:function(){return e.Pointer}});var t=Ef(),n=tu();function s(l,f,u){return f.map(function(d){return(0,t.apply)(l,d,u)})}function a(l){function f(u,d,m){var g=l(u,d,m);return Array.isArray(g)?g:(0,n.diffAny)(u,d,m,f)}return f}function r(l,f,u){var d=new e.Pointer;return(u?a(u):n.diffAny)(l,f,d)}function o(l,f){var u=e.Pointer.fromJSON(f).evaluate(l);if(u!==void 0)return{op:"test",path:f,value:u.value}}function c(l,f){var u=new Array;return f.filter(n.isDestructive).forEach(function(d){var m=o(l,d.path);if(m&&u.push(m),"from"in d){var g=o(l,d.from);g&&u.push(g)}}),u}})(dr)),dr}var Tf=bf();function Af({moves:i,phases:e,endIf:t,onEnd:n,turn:s,events:a,plugins:r}){i===void 0&&(i={}),a===void 0&&(a={}),r===void 0&&(r=[]),e===void 0&&(e={}),t||(t=()=>{}),n||(n=({G:R})=>R),s||(s={});const o={...e};""in o&&vt("cannot specify phase with empty name"),o[""]={};const c={},l=new Set;let f=null;Object.keys(i).forEach(R=>l.add(R));const u=(R,O)=>{const V=Zd(R,O,r);return be=>{const ae=us(be);return V({...ae,G:be.G,ctx:be.ctx,playerID:be.playerID})}},d=R=>O=>{const V=us(O);return R({...V,G:O.G,ctx:O.ctx})},m={onEnd:u(n,Ot.GAME_ON_END),endIf:d(t)};for(const R in o){const O=o[R];if(O.start===!0&&(f=R),O.moves!==void 0)for(const V of Object.keys(O.moves))c[R+"."+V]=O.moves[V],l.add(V);O.endIf===void 0&&(O.endIf=()=>{}),O.onBegin===void 0&&(O.onBegin=({G:V})=>V),O.onEnd===void 0&&(O.onEnd=({G:V})=>V),O.turn===void 0&&(O.turn=s),O.turn.order===void 0&&(O.turn.order=Mf.DEFAULT),O.turn.onBegin===void 0&&(O.turn.onBegin=({G:V})=>V),O.turn.onEnd===void 0&&(O.turn.onEnd=({G:V})=>V),O.turn.endIf===void 0&&(O.turn.endIf=()=>!1),O.turn.onMove===void 0&&(O.turn.onMove=({G:V})=>V),O.turn.stages===void 0&&(O.turn.stages={}),Ua(O.turn,!0);for(const V in O.turn.stages){const ae=O.turn.stages[V].moves||{};for(const de of Object.keys(ae)){const De=R+"."+V+"."+de;c[De]=ae[de],l.add(de)}}if(O.wrapped={onBegin:u(O.onBegin,Ot.PHASE_ON_BEGIN),onEnd:u(O.onEnd,Ot.PHASE_ON_END),endIf:d(O.endIf)},O.turn.wrapped={onMove:u(O.turn.onMove,Ot.TURN_ON_MOVE),onBegin:u(O.turn.onBegin,Ot.TURN_ON_BEGIN),onEnd:u(O.turn.onEnd,Ot.TURN_ON_END),endIf:d(O.turn.endIf)},typeof O.next!="function"){const{next:V}=O;O.next=()=>V||null}O.wrapped.next=d(O.next)}function g(R){return R.phase?o[R.phase]:o[""]}function M(R){return R}function p(R,O){const V=new Set,be=new Set;for(let ae=0;ae<O.length;ae++){const{fn:de,arg:De,...ze}=O[ae];if(de===L){be.clear();const Qe=R.ctx.phase;if(V.has(Qe)){const je={...R.ctx,phase:null};return{...R,ctx:je}}V.add(Qe)}const Ze=[];if(R=de(R,{...ze,arg:De,next:Ze}),de===C)break;const He=_(R);if(He){O.push({fn:C,arg:He,turn:R.ctx.turn,phase:R.ctx.phase,automatic:!0});continue}const qe=T(R);if(qe){O.push({fn:L,arg:qe,turn:R.ctx.turn,phase:R.ctx.phase,automatic:!0});continue}if([M,E,w].includes(de)){const Qe=P(R);if(Qe){O.push({fn:q,arg:Qe,turn:R.ctx.turn,phase:R.ctx.phase,automatic:!0});continue}}O.push(...Ze)}return R}function h(R,{next:O}){return O.push({fn:S}),R}function S(R,{next:O}){let{G:V,ctx:be}=R;return V=g(be).wrapped.onBegin(R),O.push({fn:A}),{...R,G:V,ctx:be}}function A(R,{currentPlayer:O}){let{ctx:V}=R;const be=g(V);O?(V={...V,currentPlayer:O},be.turn.activePlayers&&(V=Fa(V,be.turn.activePlayers))):V=_f(R,be.turn);const ae=V.turn+1;V={...V,turn:ae,numMoves:0,_prevActivePlayers:[]};const de=be.turn.wrapped.onBegin({...R,ctx:V});return{...R,G:de,ctx:V,_undo:[],_redo:[]}}function y(R,{arg:O,next:V,phase:be}){const ae=g({phase:be});let{ctx:de}=R;if(O&&O.next)if(O.next in o)de={...de,phase:O.next};else return vt("invalid phase: "+O.next),R;else de={...de,phase:ae.wrapped.next(R)||null};return R={...R,ctx:de},V.push({fn:S}),R}function z(R,{arg:O,currentPlayer:V,next:be}){let{G:ae,ctx:de}=R;const De=g(de),{endPhase:ze,ctx:Ze}=vf(R,V,De.turn,O);return de=Ze,R={...R,G:ae,ctx:de},ze?be.push({fn:L,turn:de.turn,phase:de.phase}):be.push({fn:A,currentPlayer:de.currentPlayer}),R}function E(R,{arg:O,playerID:V}){if((typeof O=="string"||O===Oa.NULL)&&(O={stage:O}),typeof O!="object")return R;Ua(O);let{ctx:be}=R,{activePlayers:ae,_activePlayersMinMoves:de,_activePlayersMaxMoves:De,_activePlayersNumMoves:ze}=be;return O.stage!==void 0&&(ae===null&&(ae={}),ae[V]=O.stage,ze[V]=0,O.minMoves&&(de===null&&(de={}),de[V]=O.minMoves),O.maxMoves&&(De===null&&(De={}),De[V]=O.maxMoves)),be={...be,activePlayers:ae,_activePlayersMinMoves:de,_activePlayersMaxMoves:De,_activePlayersNumMoves:ze},{...R,ctx:be}}function w(R,{arg:O}){return{...R,ctx:Fa(R.ctx,O)}}function _(R){return m.endIf(R)}function T(R){return g(R.ctx).wrapped.endIf(R)}function P(R){const O=g(R.ctx),V=R.ctx.numMoves||0;return O.turn.maxMoves&&V>=O.turn.maxMoves?!0:O.turn.wrapped.endIf(R)}function C(R,{arg:O,phase:V}){R=L(R,{}),O===void 0&&(O=!0),R={...R,ctx:{...R.ctx,gameover:O}};const be=m.onEnd(R);return{...R,G:be}}function L(R,{arg:O,next:V,turn:be,automatic:ae}){R=q(R,{turn:be,force:!0,automatic:!0});const{phase:de,turn:De}=R.ctx;if(V&&V.push({fn:y,arg:O,phase:de}),de===null)return R;const Ze=g(R.ctx).wrapped.onEnd(R),He={...R.ctx,phase:null},qe=ba("endPhase",O),{_stateID:Qe}=R,je={action:qe,_stateID:Qe,turn:De,phase:de};ae&&(je.automatic=!0);const at=[...R.deltalog||[],je];return{...R,G:Ze,ctx:He,deltalog:at}}function q(R,{arg:O,next:V,turn:be,force:ae,automatic:de,playerID:De}){if(be!==R.ctx.turn)return R;const{currentPlayer:ze,numMoves:Ze,phase:He,turn:qe}=R.ctx,Qe=g(R.ctx),je=Ze||0;if(!ae&&Qe.turn.minMoves&&je<Qe.turn.minMoves)return`${Qe.turn.minMoves}`,R;const at=Qe.turn.wrapped.onEnd(R);V&&V.push({fn:z,arg:O,currentPlayer:ze});let D={...R.ctx,activePlayers:null};if(O&&O.remove){De=De||ze;const U=D.playOrder.filter($=>$!=De),k=D.playOrderPos>U.length-1?0:D.playOrderPos;if(D={...D,playOrder:U,playOrderPos:k},U.length===0)return V.push({fn:L,turn:qe,phase:He}),R}const At=ba("endTurn",O),{_stateID:tt}=R,b={action:At,_stateID:tt,turn:qe,phase:He};de&&(b.automatic=!0);const x=[...R.deltalog||[],b];return{...R,G:at,ctx:D,deltalog:x,_undo:[],_redo:[]}}function Y(R,{arg:O,next:V,automatic:be,playerID:ae}){ae=ae||R.ctx.currentPlayer;let{ctx:de,_stateID:De}=R,{activePlayers:ze,_activePlayersNumMoves:Ze,_activePlayersMinMoves:He,_activePlayersMaxMoves:qe,phase:Qe,turn:je}=de;const at=ze!==null&&ae in ze,D=g(de);if(!O&&at){const U=D.turn.stages[ze[ae]];U&&U.next&&(O=U.next)}if(V&&V.push({fn:E,arg:O,playerID:ae}),!at)return R;const At=Ze[ae]||0;if(He&&He[ae]&&At<He[ae])return`${He[ae]}`,R;ze={...ze},delete ze[ae],He&&(He={...He},delete He[ae]),qe&&(qe={...qe},delete qe[ae]),de=gf({...de,activePlayers:ze,_activePlayersMinMoves:He,_activePlayersMaxMoves:qe});const b={action:ba("endStage",O),_stateID:De,turn:je,phase:Qe};be&&(b.automatic=!0);const x=[...R.deltalog||[],b];return{...R,ctx:de,deltalog:x}}function B(R,O,V){const be=g(R),ae=be.turn.stages,{activePlayers:de}=R;if(de&&de[V]!==void 0&&de[V]!==Oa.NULL&&ae[de[V]]!==void 0&&ae[de[V]].moves!==void 0){const ze=ae[de[V]].moves;if(O in ze)return ze[O]}else if(be.moves){if(O in be.moves)return be.moves[O]}else if(O in i)return i[O];return null}function K(R,O){const{playerID:V,type:be}=O,{currentPlayer:ae,activePlayers:de,_activePlayersMaxMoves:De}=R.ctx,ze=B(R.ctx,be,V),Ze=!ze||typeof ze=="function"||ze.noLimit!==!0;let{numMoves:He,_activePlayersNumMoves:qe}=R.ctx;Ze&&(V===ae&&He++,de&&qe[V]++),R={...R,ctx:{...R.ctx,numMoves:He,_activePlayersNumMoves:qe}},De&&qe[V]>=De[V]&&(R=Y(R,{playerID:V,automatic:!0}));const je=g(R.ctx).turn.wrapped.onMove({...R,playerID:V});return R={...R,G:je},p(R,[{fn:M}])}function X(R,O,V){return p(R,[{fn:Y,arg:V,playerID:O}])}function ee(R,O){return p(R,[{fn:Y,playerID:O}])}function ie(R,O,V){return p(R,[{fn:w,arg:V}])}function pe(R,O,V){return p(R,[{fn:L,phase:R.ctx.phase,turn:R.ctx.turn,arg:{next:V}}])}function _e(R){return p(R,[{fn:L,phase:R.ctx.phase,turn:R.ctx.turn}])}function Ee(R,O,V){return p(R,[{fn:q,turn:R.ctx.turn,phase:R.ctx.phase,arg:V}])}function Je(R,O,V){return p(R,[{fn:q,turn:R.ctx.turn,phase:R.ctx.phase,force:!0,arg:V}])}function ht(R,O,V){return p(R,[{fn:C,turn:R.ctx.turn,phase:R.ctx.phase,arg:V}])}const Xe={endStage:ee,setStage:X,endTurn:Ee,pass:Je,endPhase:_e,setPhase:pe,endGame:ht,setActivePlayers:ie},Z=[];a.endTurn!==!1&&Z.push("endTurn"),a.pass!==!1&&Z.push("pass"),a.endPhase!==!1&&Z.push("endPhase"),a.setPhase!==!1&&Z.push("setPhase"),a.endGame!==!1&&Z.push("endGame"),a.setActivePlayers!==!1&&Z.push("setActivePlayers"),a.endStage!==!1&&Z.push("endStage"),a.setStage!==!1&&Z.push("setStage");function oe(R,O){const{type:V,playerID:be,args:ae}=O.payload;return typeof Xe[V]!="function"?R:Xe[V](R,be,...Array.isArray(ae)?ae:[ae])}function ne(R,O,V){return O.activePlayers?V in O.activePlayers:O.currentPlayer===V}return{ctx:R=>({numPlayers:R,turn:0,currentPlayer:"0",playOrder:[...Array.from({length:R})].map((O,V)=>V+""),playOrderPos:0,phase:f,activePlayers:null}),init:R=>p(R,[{fn:h}]),isPlayerActive:ne,eventHandlers:Xe,eventNames:Object.keys(Xe),enabledEventNames:Z,moveMap:c,moveNames:[...l.values()],processMove:K,processEvent:oe,getMove:B}}function zf(i){return i.processMove!==void 0}function pl(i){if(zf(i))return i;if(i.name===void 0&&(i.name="default"),i.deltaState===void 0&&(i.deltaState=!1),i.disableUndo===void 0&&(i.disableUndo=!1),i.setup===void 0&&(i.setup=()=>({})),i.moves===void 0&&(i.moves={}),i.playerView===void 0&&(i.playerView=({G:t})=>t),i.plugins===void 0&&(i.plugins=[]),i.plugins.forEach(t=>{if(t.name===void 0)throw new Error("Plugin missing name attribute");if(t.name.includes(" "))throw new Error(t.name+": Plugin name must not include spaces")}),i.name.includes(" "))throw new Error(i.name+": Game name must not include spaces");const e=Af(i);return{...i,flow:e,moveNames:e.moveNames,pluginNames:i.plugins.map(t=>t.name),processMove:(t,n)=>{let s=e.getMove(t.ctx,n.type,n.playerID);if(wf(s)&&(s=s.move),s instanceof Function){const a=Zd(s,Ot.MOVE,i.plugins);let r=[];n.args!==void 0&&(r=Array.isArray(n.args)?n.args:[n.args]);const o={...us(t),G:t.G,ctx:t.ctx,playerID:n.playerID};return a(o,...r)}return vt(`invalid move object: ${n.type}`),t.G}}}function wf(i){return i instanceof Object&&i.move!==void 0}var io;(function(i){i.UnauthorizedAction="update/unauthorized_action",i.MatchNotFound="update/match_not_found",i.PatchFailed="update/patch_failed"})(io||(io={}));var Ft;(function(i){i.StaleStateId="action/stale_state_id",i.UnavailableMove="action/unavailable_move",i.InvalidMove="action/invalid_move",i.InactivePlayer="action/inactive_player",i.GameOver="action/gameover",i.ActionDisabled="action/action_disabled",i.ActionInvalid="action/action_invalid",i.PluginActionInvalid="action/plugin_invalid"})(Ft||(Ft={}));const ea=i=>i.payload.playerID!==null&&i.payload.playerID!==void 0,Rf=(i,e,t)=>{function n(a){return a.undoable!==void 0}function s(a){return a instanceof Function}return n(t)?s(t.undoable)?t.undoable({G:i,ctx:e}):t.undoable:!0};function yc(i,e){if(e.game.disableUndo)return i;const t={G:i.G,ctx:i.ctx,plugins:i.plugins,playerID:e.action.payload.playerID||i.ctx.currentPlayer};return e.action.type==="MAKE_MOVE"&&(t.moveType=e.action.payload.type),{...i,_undo:[...i._undo,t],_redo:[]}}function hr(i,e,t){const n={action:e,_stateID:i._stateID,turn:i.ctx.turn,phase:i.ctx.phase},s=i.plugins.log.data.metadata;return s!==void 0&&(n.metadata=s),typeof t=="object"&&t.redact===!0?n.redact=!0:typeof t=="object"&&t.redact instanceof Function&&(n.redact=t.redact({G:i.G,ctx:i.ctx})),{...i,deltalog:[n]}}function fr(i,e,t){const[n,s]=Qd(i,t);return s?[n,Vt(e,Ft.PluginActionInvalid,s)]:[n]}function iu(i){if(!i)return[null,void 0];const{transients:e,...t}=i;return[t,e]}function Vt(i,e,t){return{...i,transients:{error:{type:e,payload:t}}}}const Cf=i=>e=>t=>{const n=e(t);if(t.type===Ya)return n;{const[,s]=iu(i.getState());return typeof s<"u"?(i.dispatch(Jd()),{...n,transients:s}):n}};function Pf({game:i,isClient:e}){return i=pl(i),(t=null,n)=>{let[s]=iu(t);switch(n.type){case Ya:return s;case qa:{if(s={...s,deltalog:[]},e)return s;if(s.ctx.gameover!==void 0)return vt("cannot call event after game end"),Vt(s,Ft.GameOver);if(ea(n)&&!i.flow.isPlayerActive(s.G,s.ctx,n.payload.playerID))return vt(`disallowed event: ${n.payload.type}`),Vt(s,Ft.InactivePlayer);s=eo(s,{game:i,playerID:n.payload.playerID});let a=i.flow.processEvent(s,n),r;return[a,r]=fr(a,s,{game:i}),r||(a=yc(a,{game:i,action:n}),{...a,_stateID:s._stateID+1})}case al:{const a=s={...s,deltalog:[]},r=i.flow.getMove(s.ctx,n.payload.type,n.payload.playerID||s.ctx.currentPlayer);if(r===null)return vt(`disallowed move: ${n.payload.type}`),Vt(s,Ft.UnavailableMove);if(e&&r.client===!1)return s;if(s.ctx.gameover!==void 0)return vt("cannot make move after game end"),Vt(s,Ft.GameOver);if(ea(n)&&!i.flow.isPlayerActive(s.G,s.ctx,n.payload.playerID))return vt(`disallowed move: ${n.payload.type}`),Vt(s,Ft.InactivePlayer);s=eo(s,{game:i,playerID:n.payload.playerID});const o=i.processMove(s,n.payload);if(o===ss)return vt(`invalid move: ${n.payload.type} args: ${n.payload.args}`),Vt(s,Ft.InvalidMove);const c={...s,G:o};if(e&&pf(c,{game:i}))return s;if(s=c,e){let f;return[s,f]=fr(s,a,{game:i}),f||{...s,_stateID:s._stateID+1}}s=hr(s,n,r),s=i.flow.processMove(s,n.payload);let l;return[s,l]=fr(s,a,{game:i}),l||(s=yc(s,{game:i,action:n}),{...s,_stateID:s._stateID+1})}case ol:case dl:case ll:return n.state;case cl:{if(s={...s,deltalog:[]},i.disableUndo)return vt("Undo is not enabled"),Vt(s,Ft.ActionDisabled);const{G:a,ctx:r,_undo:o,_redo:c,_stateID:l}=s;if(o.length<2)return vt("No moves to undo"),Vt(s,Ft.ActionInvalid);const f=o[o.length-1],u=o[o.length-2];if(ea(n)&&n.payload.playerID!==f.playerID)return vt("Cannot undo other players' moves"),Vt(s,Ft.ActionInvalid);if(f.moveType){const d=i.flow.getMove(u.ctx,f.moveType,f.playerID);if(!Rf(a,r,d))return vt("Move cannot be undone"),Vt(s,Ft.ActionInvalid)}return s=hr(s,n),{...s,G:u.G,ctx:u.ctx,plugins:u.plugins,_stateID:l+1,_undo:o.slice(0,-1),_redo:[f,...c]}}case rl:{if(s={...s,deltalog:[]},i.disableUndo)return vt("Redo is not enabled"),Vt(s,Ft.ActionDisabled);const{_undo:a,_redo:r,_stateID:o}=s;if(r.length===0)return vt("No moves to redo"),Vt(s,Ft.ActionInvalid);const c=r[0];return ea(n)&&n.payload.playerID!==c.playerID?(vt("Cannot redo other players' moves"),Vt(s,Ft.ActionInvalid)):(s=hr(s,n),{...s,G:c.G,ctx:c.ctx,plugins:c.plugins,_stateID:o+1,_undo:[...a,c],_redo:r.slice(1)})}case kd:return uf(s,n,{game:i});case ul:{const a=s,r=JSON.parse(JSON.stringify(a)),o=Tf.applyPatch(r,n.patch);return o.some(l=>l!==null)?(vt(`Patch ${JSON.stringify(n.patch)} apply failed`),Vt(a,io.PatchFailed,o)):r}default:return s}}}function Gs(i){"@babel/helpers - typeof";return Gs=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Gs(i)}function Df(i,e){if(Gs(i)!="object"||!i)return i;var t=i[Symbol.toPrimitive];if(t!==void 0){var n=t.call(i,e);if(Gs(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(i)}function If(i){var e=Df(i,"string");return Gs(e)=="symbol"?e:e+""}function Lf(i,e,t){return(e=If(e))in i?Object.defineProperty(i,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):i[e]=t,i}function Sc(i,e){var t=Object.keys(i);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(i);e&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),t.push.apply(t,n)}return t}function Ec(i){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Sc(Object(t),!0).forEach(function(n){Lf(i,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(t)):Sc(Object(t)).forEach(function(n){Object.defineProperty(i,n,Object.getOwnPropertyDescriptor(t,n))})}return i}function Qt(i){return"Minified Redux error #"+i+"; visit https://redux.js.org/Errors?code="+i+" for the full message or use the non-minified dev environment for full errors. "}var bc=(function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"})(),Tc=function(){return Math.random().toString(36).substring(7).split("").join(".")},Ac={INIT:"@@redux/INIT"+Tc(),REPLACE:"@@redux/REPLACE"+Tc()};function Nf(i){if(typeof i!="object"||i===null)return!1;for(var e=i;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(i)===e}function nu(i,e,t){var n;if(typeof e=="function"&&typeof t=="function"||typeof t=="function"&&typeof arguments[3]=="function")throw new Error(Qt(0));if(typeof e=="function"&&typeof t>"u"&&(t=e,e=void 0),typeof t<"u"){if(typeof t!="function")throw new Error(Qt(1));return t(nu)(i,e)}if(typeof i!="function")throw new Error(Qt(2));var s=i,a=e,r=[],o=r,c=!1;function l(){o===r&&(o=r.slice())}function f(){if(c)throw new Error(Qt(3));return a}function u(M){if(typeof M!="function")throw new Error(Qt(4));if(c)throw new Error(Qt(5));var p=!0;return l(),o.push(M),function(){if(p){if(c)throw new Error(Qt(6));p=!1,l();var S=o.indexOf(M);o.splice(S,1),r=null}}}function d(M){if(!Nf(M))throw new Error(Qt(7));if(typeof M.type>"u")throw new Error(Qt(8));if(c)throw new Error(Qt(9));try{c=!0,a=s(a,M)}finally{c=!1}for(var p=r=o,h=0;h<p.length;h++){var S=p[h];S()}return M}function m(M){if(typeof M!="function")throw new Error(Qt(10));s=M,d({type:Ac.REPLACE})}function g(){var M,p=u;return M={subscribe:function(S){if(typeof S!="object"||S===null)throw new Error(Qt(11));function A(){S.next&&S.next(f())}A();var y=p(A);return{unsubscribe:y}}},M[bc]=function(){return this},M}return d({type:Ac.INIT}),n={dispatch:d,subscribe:u,getState:f,replaceReducer:m},n[bc]=g,n}function su(){for(var i=arguments.length,e=new Array(i),t=0;t<i;t++)e[t]=arguments[t];return e.length===0?function(n){return n}:e.length===1?e[0]:e.reduce(function(n,s){return function(){return n(s.apply(void 0,arguments))}})}function Uf(){for(var i=arguments.length,e=new Array(i),t=0;t<i;t++)e[t]=arguments[t];return function(n){return function(){var s=n.apply(void 0,arguments),a=function(){throw new Error(Qt(15))},r={getState:s.getState,dispatch:function(){return a.apply(void 0,arguments)}},o=e.map(function(c){return c(r)});return a=su.apply(void 0,o)(s.dispatch),Ec(Ec({},s),{},{dispatch:a})}}}function Ff({game:i,numPlayers:e,setupData:t}){i=pl(i),e||(e=2);const n=i.flow.ctx(e);let s={G:{},ctx:n,plugins:{}};s=hf(s,{game:i}),s=eo(s,{game:i,playerID:void 0});const a=us(s);s.G=i.setup({...a,ctx:s.ctx},t);let r={...s,_undo:[],_redo:[],_stateID:0};return r=i.flow.init(r),[r]=Qd(r,{game:i}),i.disableUndo||(r._undo=[{G:r.G,ctx:r.ctx,plugins:r.plugins}]),r}class Of{constructor({transportDataCallback:e,gameName:t,playerID:n,matchID:s,credentials:a,numPlayers:r}){this.connectionStatusCallback=()=>{},this.isConnected=!1,this.transportDataCallback=e,this.gameName=t||"default",this.playerID=n||null,this.matchID=s||"default",this.credentials=a,this.numPlayers=r||2}subscribeToConnectionStatus(e){this.connectionStatusCallback=e}setConnectionStatus(e){this.isConnected=e,this.connectionStatusCallback()}notifyClient(e){this.transportDataCallback(e)}}class Bf extends Of{connect(){}disconnect(){}sendAction(){}sendChatMessage(){}requestSync(){}updateCredentials(){}updateMatchID(){}updatePlayerID(){}}const Gf=i=>new Bf(i);class Hf{constructor(){this.debugPanel=null,this.currentClient=null,this.clients=new Map,this.subscribers=new Map}register(e){this.clients.set(e,e),this.mountDebug(e),this.notifySubscribers()}unregister(e){if(this.clients.delete(e),this.currentClient===e){this.unmountDebug();for(const[t]of this.clients){if(this.debugPanel)break;this.mountDebug(t)}}this.notifySubscribers()}subscribe(e){const t=Symbol();return this.subscribers.set(t,e),e(this.getState()),()=>{this.subscribers.delete(t)}}switchPlayerID(e){if(this.currentClient.multiplayer){for(const[t]of this.clients)if(t.playerID===e&&t.debugOpt!==!1&&t.multiplayer===this.currentClient.multiplayer){this.switchToClient(t);return}}this.currentClient.updatePlayerID(e),this.notifySubscribers()}switchToClient(e){e!==this.currentClient&&(this.unmountDebug(),this.mountDebug(e),this.notifySubscribers())}notifySubscribers(){const e=this.getState();this.subscribers.forEach(t=>{t(e)})}getState(){return{client:this.currentClient,debuggableClients:this.getDebuggableClients()}}getDebuggableClients(){return[...this.clients.values()].filter(e=>e.debugOpt!==!1)}mountDebug(e){if(e.debugOpt===!1||this.debugPanel!==null||typeof document>"u")return;let t,n=document.body;e.debugOpt&&e.debugOpt!==!0&&(t=e.debugOpt.impl||t,n=e.debugOpt.target||n),t&&(this.currentClient=e,this.debugPanel=new t({target:n,props:{clientManager:this}}))}unmountDebug(){this.debugPanel.$destroy(),this.debugPanel=null,this.currentClient=null}}const kf=new Hf;function no(i,e,t){return!t&&i==null&&(i=e.getState().ctx.currentPlayer),i}function ml(i,e,t,n,s,a){const r={};for(const o of e)r[o]=(...c)=>{const l=af[i](o,c,no(n,t,a),s);t.dispatch(l)};return r}const Vf=ml.bind(null,"makeMove"),Wf=ml.bind(null,"gameEvent"),Xf=ml.bind(null,"plugin");class qf{constructor({game:e,debug:t,numPlayers:n,multiplayer:s,matchID:a,playerID:r,credentials:o,enhancer:c}){this.game=pl(e),this.playerID=r,this.matchID=a||"default",this.credentials=o,this.multiplayer=s,this.debugOpt=t,this.manager=kf,this.gameStateOverride=null,this.subscribers={},this._running=!1,this.reducer=Pf({game:this.game,isClient:s!==void 0}),this.initialState=null,s||(this.initialState=Ff({game:this.game,numPlayers:n})),this.reset=()=>{this.store.dispatch(Yd(this.initialState))},this.undo=()=>{const m=Kd(no(this.playerID,this.store,this.multiplayer),this.credentials);this.store.dispatch(m)},this.redo=()=>{const m=$d(no(this.playerID,this.store,this.multiplayer),this.credentials);this.store.dispatch(m)},this.log=[];const d=Uf(Cf,()=>m=>g=>{const M=m(g);return this.notifySubscribers(),M},m=>g=>M=>{const p=m.getState(),h=g(M);return!("clientOnly"in M)&&M.type!==Ya&&this.transport.sendAction(p,M),h},m=>g=>M=>{const p=g(M),h=m.getState();switch(M.type){case al:case qa:case cl:case rl:{const S=h.deltalog;this.log=[...this.log,...S];break}case ol:{this.log=[];break}case ul:case dl:{let S=-1;this.log.length>0&&(S=this.log[this.log.length-1]._stateID);let A=M.deltalog||[];A=A.filter(y=>y._stateID>S),this.log=[...this.log,...A];break}case ll:{this.initialState=M.initialState,this.log=M.log||[];break}}return p});c=c!==void 0?su(d,c):d,this.store=nu(this.reducer,this.initialState,c),s||(s=Gf),this.transport=s({transportDataCallback:m=>this.receiveTransportData(m),gameKey:e,game:this.game,matchID:a,playerID:r,credentials:o,gameName:this.game.name,numPlayers:n}),this.createDispatchers(),this.chatMessages=[],this.sendChatMessage=m=>{this.transport.sendChatMessage(this.matchID,{id:Sf(7),sender:this.playerID,payload:m})}}receiveMatchData(e){this.matchData=e,this.notifySubscribers()}receiveChatMessage(e){this.chatMessages=[...this.chatMessages,e],this.notifySubscribers()}receiveTransportData(e){const[t]=e.args;if(t===this.matchID)switch(e.type){case"sync":{const[,n]=e.args,s=Wd(n);this.receiveMatchData(n.filteredMetadata),this.store.dispatch(s);break}case"update":{const[,n,s]=e.args,a=this.store.getState();if(n._stateID>=a._stateID){const r=qd(n,s);this.store.dispatch(r)}break}case"patch":{const[,n,s,a,r]=e.args,o=this.store.getState()._stateID;if(n!==o)break;const c=Xd(n,s,a,r);this.store.dispatch(c),this.store.getState()._stateID===o&&this.transport.requestSync();break}case"matchData":{const[,n]=e.args;this.receiveMatchData(n);break}case"chat":{const[,n]=e.args;this.receiveChatMessage(n);break}}}notifySubscribers(){Object.values(this.subscribers).forEach(e=>e(this.getState()))}overrideGameState(e){this.gameStateOverride=e,this.notifySubscribers()}start(){this.transport.connect(),this._running=!0,this.manager.register(this)}stop(){this.transport.disconnect(),this._running=!1,this.manager.unregister(this)}subscribe(e){const t=Object.keys(this.subscribers).length;return this.subscribers[t]=e,this.transport.subscribeToConnectionStatus(()=>this.notifySubscribers()),(this._running||!this.multiplayer)&&e(this.getState()),()=>{delete this.subscribers[t]}}getInitialState(){return this.initialState}getState(){let e=this.store.getState();if(this.gameStateOverride!==null&&(e=this.gameStateOverride),e===null)return e;let t=!0;const n=this.game.flow.isPlayerActive(e.G,e.ctx,this.playerID);return this.multiplayer&&!n&&(t=!1),!this.multiplayer&&this.playerID!==null&&this.playerID!==void 0&&!n&&(t=!1),e.ctx.gameover!==void 0&&(t=!1),this.multiplayer||(e={...e,G:this.game.playerView({G:e.G,ctx:e.ctx,playerID:this.playerID}),plugins:xf(e,this)}),{...e,log:this.log,isActive:t,isConnected:this.transport.isConnected}}createDispatchers(){this.moves=Vf(this.game.moveNames,this.store,this.playerID,this.credentials,this.multiplayer),this.events=Wf(this.game.flow.enabledEventNames,this.store,this.playerID,this.credentials,this.multiplayer),this.plugins=Xf(this.game.pluginNames,this.store,this.playerID,this.credentials,this.multiplayer)}updatePlayerID(e){this.playerID=e,this.createDispatchers(),this.transport.updatePlayerID(e),this.notifySubscribers()}updateMatchID(e){this.matchID=e,this.createDispatchers(),this.transport.updateMatchID(e),this.notifySubscribers()}updateCredentials(e){this.credentials=e,this.createDispatchers(),this.transport.updateCredentials(e),this.notifySubscribers()}}function Yf(i){return new qf(i)}const oi=6,qt=6,Hs=["初来乍到","渐入佳境","环环相扣","出库高手"],Kf=[{id:"X",name:"出库警车",color:"#f4f6f5",kind:"police"},{id:"A",name:"珊瑚轿车",color:"#f06468",kind:"car"},{id:"B",name:"天蓝轿车",color:"#59bddd",kind:"car"},{id:"C",name:"柠檬出租车",color:"#f5cf35",kind:"taxi"},{id:"D",name:"橘色越野车",color:"#f6a33f",kind:"jeep"},{id:"E",name:"青绿轿车",color:"#73be8e",kind:"car"},{id:"F",name:"红色消防车",color:"#e65b4c",kind:"fire"},{id:"G",name:"紫色轿车",color:"#b398d2",kind:"car"},{id:"H",name:"蓝色工程车",color:"#5499ed",kind:"jeep"},{id:"I",name:"白色救护车",color:"#ebf0f2",kind:"ambulance"},{id:"J",name:"薄荷轿车",color:"#54cbb8",kind:"car"},{id:"K",name:"黄色校车",color:"#fac347",kind:"bus"},{id:"L",name:"绿色货车",color:"#9bbd69",kind:"truck"},{id:"M",name:"紫色巴士",color:"#c5b5dd",kind:"bus"},{id:"N",name:"红色货车",color:"#e77464",kind:"truck"}],zn=i=>Kf.find(e=>e.id===i);function $f(i,e){const t=new Int8Array(oi*oi).fill(-1);return i.forEach((n,s)=>{if(!(e[s]===qt&&s===0))for(let a=0;a<n.size;a++)t[n.axis==="x"?n.lane*oi+e[s]+a:(e[s]+a)*oi+n.lane]=s}),t}function zc(i,e){if(!Array.isArray(e)||e.length!==i.length||!i.length)return!1;const t=new Set;for(let n=0;n<i.length;n++){const s=i[n],a=e[n];if(!Number.isInteger(a)||!Number.isInteger(s.lane)||s.lane<0||s.lane>=oi)return!1;if(!(n===0&&a===qt&&s.id==="X"&&s.axis==="x"&&s.lane===2)){if(a<0||a+s.size>oi)return!1;for(let r=0;r<s.size;r++){const o=s.axis==="x"?s.lane*oi+a+r:(a+r)*oi+s.lane;if(t.has(o))return!1;t.add(o)}}}return i[0].id==="X"&&i[0].axis==="x"&&i[0].lane===2&&i[0].size===2}function ks(i,e,t,n=$f(i,e)){const s=i[t];if(!s||e[0]===qt)return{min:e[t],max:e[t]};const a=c=>n[s.axis==="x"?s.lane*oi+c:c*oi+s.lane];let r=e[t],o=e[t];for(;r>0&&a(r-1)===-1;)r--;for(;o+s.size<oi&&a(o+s.size)===-1;)o++;return t===0&&o===oi-s.size&&(o=qt),{min:r,max:o}}function xl(i,e,t){if(!Number.isInteger(t.car)||t.car<0||t.car>=i.length||!Number.isInteger(t.to)||e[0]===qt||t.to===e[t.car]||t.car===0&&t.to===5)return!1;const n=ks(i,e,t.car);return t.to>=n.min&&t.to<=n.max}function Jf(i,e){const t=[...i];return t[e.car]=e.to,t}const Zf=(i,e)=>i<=e?3:i<=e+5?2:1,Qf=JSON.parse('[{"id":1,"name":"清晨出发","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"z","lane":4,"size":2},{"id":"F","axis":"x","lane":1,"size":2},{"id":"E","axis":"x","lane":3,"size":2},{"id":"D","axis":"x","lane":5,"size":2},{"id":"K","axis":"z","lane":5,"size":3},{"id":"L","axis":"x","lane":4,"size":3},{"id":"M","axis":"z","lane":0,"size":3},{"id":"B","axis":"x","lane":3,"size":2}],"positions":[2,0,0,2,1,0,2,3,4]},{"id":2,"name":"街角相逢","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"x","lane":0,"size":3},{"id":"G","axis":"z","lane":5,"size":2},{"id":"L","axis":"x","lane":3,"size":3},{"id":"D","axis":"z","lane":2,"size":2},{"id":"J","axis":"z","lane":4,"size":2},{"id":"H","axis":"z","lane":1,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"I","axis":"x","lane":5,"size":2},{"id":"C","axis":"x","lane":4,"size":2}],"positions":[2,2,0,3,3,1,0,2,4,4]},{"id":3,"name":"借个车位","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"x","lane":0,"size":2},{"id":"E","axis":"x","lane":4,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"B","axis":"z","lane":3,"size":2},{"id":"J","axis":"z","lane":5,"size":2},{"id":"H","axis":"z","lane":5,"size":2},{"id":"N","axis":"x","lane":3,"size":3},{"id":"G","axis":"z","lane":0,"size":2}],"positions":[1,2,3,3,1,1,3,2,1]},{"id":4,"name":"错峰出行","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"z","lane":5,"size":2},{"id":"N","axis":"x","lane":3,"size":3},{"id":"A","axis":"z","lane":5,"size":2},{"id":"M","axis":"z","lane":1,"size":3},{"id":"D","axis":"x","lane":5,"size":2},{"id":"G","axis":"z","lane":3,"size":2},{"id":"B","axis":"z","lane":4,"size":2},{"id":"K","axis":"x","lane":4,"size":3},{"id":"F","axis":"z","lane":4,"size":2},{"id":"E","axis":"z","lane":0,"size":2}],"positions":[2,1,1,3,0,0,0,2,2,0,1]},{"id":5,"name":"晨光小巷","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"z","lane":1,"size":2},{"id":"K","axis":"z","lane":3,"size":3},{"id":"F","axis":"x","lane":0,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"A","axis":"z","lane":0,"size":2},{"id":"L","axis":"z","lane":2,"size":3},{"id":"J","axis":"x","lane":1,"size":2},{"id":"B","axis":"z","lane":4,"size":2},{"id":"G","axis":"z","lane":3,"size":2}],"positions":[1,4,3,3,3,2,3,1,1,1]},{"id":6,"name":"早餐街口","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"z","lane":4,"size":2},{"id":"D","axis":"z","lane":0,"size":2},{"id":"F","axis":"z","lane":5,"size":2},{"id":"C","axis":"x","lane":4,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"K","axis":"x","lane":5,"size":3},{"id":"A","axis":"x","lane":1,"size":2},{"id":"L","axis":"z","lane":3,"size":3},{"id":"B","axis":"x","lane":1,"size":2},{"id":"N","axis":"x","lane":0,"size":3},{"id":"E","axis":"z","lane":5,"size":2}],"positions":[1,4,3,1,1,0,1,1,2,3,2,4]},{"id":7,"name":"邻里让行","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"z","lane":3,"size":3},{"id":"B","axis":"x","lane":4,"size":2},{"id":"D","axis":"x","lane":1,"size":2},{"id":"G","axis":"z","lane":4,"size":2},{"id":"K","axis":"x","lane":0,"size":3},{"id":"C","axis":"x","lane":5,"size":2},{"id":"I","axis":"z","lane":5,"size":2}],"positions":[0,2,0,0,1,1,0,1]},{"id":8,"name":"树荫车位","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"x","lane":1,"size":2},{"id":"G","axis":"z","lane":5,"size":2},{"id":"I","axis":"x","lane":2,"size":2},{"id":"A","axis":"z","lane":2,"size":2},{"id":"B","axis":"z","lane":5,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"E","axis":"x","lane":0,"size":2}],"positions":[2,1,3,0,3,1,4,2]},{"id":9,"name":"午后出游","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":4,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"J","axis":"z","lane":1,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"E","axis":"x","lane":5,"size":2},{"id":"M","axis":"z","lane":0,"size":3},{"id":"K","axis":"z","lane":5,"size":3},{"id":"F","axis":"z","lane":4,"size":2},{"id":"I","axis":"z","lane":3,"size":2}],"positions":[2,3,2,3,0,1,4,0,2,0,3]},{"id":10,"name":"周末集市","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"K","axis":"z","lane":1,"size":3},{"id":"G","axis":"z","lane":5,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"H","axis":"x","lane":4,"size":2},{"id":"M","axis":"x","lane":5,"size":3},{"id":"D","axis":"x","lane":4,"size":2},{"id":"I","axis":"z","lane":4,"size":2},{"id":"B","axis":"z","lane":0,"size":2}],"positions":[2,2,3,1,0,4,3,2,2,2]},{"id":11,"name":"公园门前","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":3,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"E","axis":"x","lane":4,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"B","axis":"x","lane":0,"size":2},{"id":"M","axis":"z","lane":4,"size":3},{"id":"N","axis":"z","lane":5,"size":3}],"positions":[0,3,3,1,3,1,2,2]},{"id":12,"name":"放学路上","difficulty":0,"minimum":4,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"x","lane":3,"size":2},{"id":"G","axis":"x","lane":1,"size":2},{"id":"H","axis":"x","lane":0,"size":2},{"id":"I","axis":"x","lane":3,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"N","axis":"x","lane":4,"size":3},{"id":"M","axis":"z","lane":4,"size":3},{"id":"F","axis":"x","lane":5,"size":2},{"id":"B","axis":"x","lane":1,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"L","axis":"z","lane":0,"size":3}],"positions":[1,2,1,2,0,2,0,2,2,4,4,0]},{"id":13,"name":"各退一步","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"z","lane":3,"size":2},{"id":"M","axis":"z","lane":0,"size":3},{"id":"D","axis":"z","lane":4,"size":2},{"id":"L","axis":"x","lane":5,"size":3},{"id":"K","axis":"x","lane":0,"size":3},{"id":"B","axis":"x","lane":5,"size":2},{"id":"H","axis":"x","lane":3,"size":2},{"id":"F","axis":"x","lane":4,"size":2},{"id":"G","axis":"z","lane":5,"size":2},{"id":"C","axis":"z","lane":2,"size":2}],"positions":[1,1,1,2,0,3,4,1,3,2,0]},{"id":14,"name":"小小调度","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"B","axis":"x","lane":0,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"N","axis":"z","lane":3,"size":3},{"id":"D","axis":"x","lane":5,"size":2},{"id":"L","axis":"z","lane":2,"size":3},{"id":"A","axis":"x","lane":5,"size":2},{"id":"H","axis":"x","lane":3,"size":2},{"id":"J","axis":"x","lane":0,"size":2}],"positions":[0,2,1,4,2,2,1,4,0,0]},{"id":15,"name":"雨后街道","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"J","axis":"x","lane":3,"size":2},{"id":"M","axis":"x","lane":5,"size":3},{"id":"N","axis":"x","lane":1,"size":3},{"id":"E","axis":"z","lane":4,"size":2},{"id":"H","axis":"z","lane":1,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"G","axis":"z","lane":3,"size":2},{"id":"F","axis":"z","lane":0,"size":2},{"id":"B","axis":"z","lane":3,"size":2}],"positions":[1,1,4,0,0,1,3,4,4,2,1]},{"id":16,"name":"晚风归途","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"z","lane":2,"size":2},{"id":"B","axis":"z","lane":0,"size":2},{"id":"I","axis":"x","lane":0,"size":2},{"id":"F","axis":"z","lane":2,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"G","axis":"z","lane":1,"size":2},{"id":"N","axis":"z","lane":3,"size":3},{"id":"H","axis":"x","lane":5,"size":2}],"positions":[0,4,0,2,1,2,4,2,4]},{"id":17,"name":"花店转角","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"F","axis":"z","lane":0,"size":2},{"id":"E","axis":"x","lane":1,"size":2},{"id":"C","axis":"x","lane":3,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"H","axis":"x","lane":0,"size":2},{"id":"I","axis":"x","lane":5,"size":2},{"id":"N","axis":"x","lane":4,"size":3},{"id":"L","axis":"z","lane":5,"size":3},{"id":"A","axis":"x","lane":1,"size":2},{"id":"B","axis":"x","lane":3,"size":2}],"positions":[1,2,3,3,4,0,3,0,3,0,0,2]},{"id":18,"name":"河畔停车","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"M","axis":"z","lane":4,"size":3},{"id":"A","axis":"x","lane":3,"size":2},{"id":"C","axis":"z","lane":5,"size":2},{"id":"B","axis":"z","lane":2,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"I","axis":"x","lane":0,"size":2},{"id":"F","axis":"x","lane":4,"size":2},{"id":"D","axis":"z","lane":2,"size":2},{"id":"G","axis":"x","lane":5,"size":2}],"positions":[0,3,2,0,3,4,3,0,0,2,0]},{"id":19,"name":"书店相遇","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"M","axis":"z","lane":2,"size":3},{"id":"I","axis":"x","lane":3,"size":2},{"id":"C","axis":"z","lane":3,"size":2},{"id":"H","axis":"x","lane":4,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"N","axis":"x","lane":5,"size":3},{"id":"A","axis":"x","lane":0,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"K","axis":"x","lane":1,"size":3},{"id":"J","axis":"x","lane":4,"size":2},{"id":"G","axis":"z","lane":5,"size":2}],"positions":[0,3,4,2,4,1,3,4,0,1,0,1]},{"id":20,"name":"操场旁边","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"z","lane":4,"size":2},{"id":"H","axis":"x","lane":3,"size":2},{"id":"M","axis":"z","lane":3,"size":3},{"id":"K","axis":"x","lane":5,"size":3},{"id":"G","axis":"z","lane":5,"size":2},{"id":"B","axis":"x","lane":1,"size":2},{"id":"N","axis":"x","lane":4,"size":3}],"positions":[0,3,0,0,1,2,0,1]},{"id":21,"name":"面包飘香","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"E","axis":"z","lane":5,"size":2},{"id":"M","axis":"x","lane":4,"size":3},{"id":"I","axis":"x","lane":3,"size":2},{"id":"J","axis":"x","lane":1,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"C","axis":"z","lane":5,"size":2},{"id":"F","axis":"z","lane":0,"size":2}],"positions":[1,1,1,2,0,1,4,3,0]},{"id":22,"name":"小桥借位","difficulty":0,"minimum":5,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"z","lane":4,"size":2},{"id":"M","axis":"x","lane":3,"size":3},{"id":"K","axis":"x","lane":4,"size":3},{"id":"N","axis":"z","lane":2,"size":3},{"id":"B","axis":"z","lane":5,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"H","axis":"z","lane":3,"size":2},{"id":"F","axis":"z","lane":0,"size":2}],"positions":[0,1,3,1,1,0,0,1,3]},{"id":23,"name":"林间驿站","difficulty":0,"minimum":6,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"x","lane":0,"size":2},{"id":"J","axis":"z","lane":1,"size":2},{"id":"D","axis":"x","lane":3,"size":2},{"id":"K","axis":"z","lane":5,"size":3},{"id":"G","axis":"x","lane":1,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"L","axis":"x","lane":4,"size":3},{"id":"F","axis":"x","lane":4,"size":2},{"id":"H","axis":"x","lane":5,"size":2}],"positions":[0,2,0,0,0,2,2,3,1,4]},{"id":24,"name":"海边出发","difficulty":0,"minimum":6,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"z","lane":4,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"N","axis":"x","lane":5,"size":3},{"id":"H","axis":"z","lane":5,"size":2},{"id":"J","axis":"x","lane":0,"size":2},{"id":"D","axis":"x","lane":1,"size":2},{"id":"M","axis":"z","lane":1,"size":3},{"id":"L","axis":"z","lane":0,"size":3},{"id":"I","axis":"x","lane":0,"size":2},{"id":"G","axis":"z","lane":3,"size":2}],"positions":[1,2,1,3,3,2,2,3,1,4,2]},{"id":25,"name":"街坊互助","difficulty":0,"minimum":6,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":3,"size":2},{"id":"L","axis":"x","lane":5,"size":3},{"id":"C","axis":"z","lane":2,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"K","axis":"z","lane":5,"size":3},{"id":"I","axis":"z","lane":1,"size":2},{"id":"N","axis":"z","lane":2,"size":3}],"positions":[1,1,3,0,3,2,3,3]},{"id":26,"name":"顺路同行","difficulty":0,"minimum":6,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"x","lane":4,"size":2},{"id":"B","axis":"x","lane":1,"size":2},{"id":"M","axis":"z","lane":5,"size":3},{"id":"J","axis":"z","lane":3,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"A","axis":"x","lane":5,"size":2},{"id":"D","axis":"x","lane":1,"size":2},{"id":"L","axis":"z","lane":4,"size":3},{"id":"N","axis":"z","lane":0,"size":3}],"positions":[1,2,0,1,2,4,0,2,2,2]},{"id":27,"name":"留点空间","difficulty":0,"minimum":6,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"L","axis":"x","lane":5,"size":3},{"id":"H","axis":"x","lane":3,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"K","axis":"z","lane":0,"size":3},{"id":"M","axis":"z","lane":5,"size":3},{"id":"C","axis":"x","lane":1,"size":2},{"id":"B","axis":"x","lane":4,"size":2},{"id":"A","axis":"z","lane":4,"size":2},{"id":"E","axis":"z","lane":3,"size":2}],"positions":[1,1,1,1,2,3,1,0,4,1,2]},{"id":28,"name":"轻松换位","difficulty":0,"minimum":6,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"L","axis":"z","lane":2,"size":3},{"id":"H","axis":"z","lane":2,"size":2},{"id":"F","axis":"x","lane":4,"size":2},{"id":"C","axis":"z","lane":3,"size":2},{"id":"E","axis":"x","lane":3,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"G","axis":"x","lane":4,"size":2}],"positions":[0,3,1,4,1,4,0,0,0]},{"id":29,"name":"慢慢来吧","difficulty":0,"minimum":6,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"x","lane":3,"size":2},{"id":"M","axis":"z","lane":4,"size":3},{"id":"B","axis":"z","lane":5,"size":2},{"id":"L","axis":"z","lane":0,"size":3},{"id":"D","axis":"x","lane":5,"size":2},{"id":"I","axis":"x","lane":5,"size":2},{"id":"J","axis":"z","lane":5,"size":2},{"id":"F","axis":"x","lane":4,"size":2},{"id":"H","axis":"z","lane":3,"size":2},{"id":"C","axis":"x","lane":1,"size":2},{"id":"N","axis":"x","lane":0,"size":3},{"id":"E","axis":"x","lane":4,"size":2}],"positions":[1,2,1,4,0,0,2,2,0,1,1,2,2]},{"id":30,"name":"一路畅通","difficulty":0,"minimum":6,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"N","axis":"x","lane":4,"size":3},{"id":"F","axis":"z","lane":3,"size":2},{"id":"H","axis":"x","lane":3,"size":2},{"id":"A","axis":"z","lane":5,"size":2},{"id":"K","axis":"x","lane":5,"size":3},{"id":"I","axis":"x","lane":0,"size":2},{"id":"D","axis":"z","lane":0,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"C","axis":"x","lane":3,"size":2},{"id":"J","axis":"x","lane":0,"size":2}],"positions":[1,4,0,1,2,4,0,1,1,2,4,1,3]},{"id":31,"name":"转角之间","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"z","lane":4,"size":2},{"id":"J","axis":"z","lane":3,"size":2},{"id":"K","axis":"x","lane":0,"size":3},{"id":"F","axis":"x","lane":5,"size":2},{"id":"N","axis":"x","lane":4,"size":3},{"id":"I","axis":"z","lane":2,"size":2},{"id":"L","axis":"z","lane":5,"size":3},{"id":"B","axis":"z","lane":5,"size":2},{"id":"H","axis":"z","lane":0,"size":2}],"positions":[1,3,1,3,2,1,0,3,1,1]},{"id":32,"name":"礼让通行","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"z","lane":1,"size":2},{"id":"H","axis":"z","lane":4,"size":2},{"id":"C","axis":"x","lane":4,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"I","axis":"x","lane":3,"size":2},{"id":"G","axis":"z","lane":2,"size":2},{"id":"F","axis":"x","lane":1,"size":2},{"id":"K","axis":"z","lane":5,"size":3},{"id":"L","axis":"z","lane":0,"size":3},{"id":"M","axis":"x","lane":5,"size":3},{"id":"B","axis":"z","lane":0,"size":2},{"id":"N","axis":"x","lane":0,"size":3}],"positions":[2,0,2,4,1,1,0,3,1,0,3,4,3]},{"id":33,"name":"迂回有道","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"z","lane":1,"size":3},{"id":"B","axis":"z","lane":5,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"M","axis":"z","lane":0,"size":3},{"id":"F","axis":"x","lane":5,"size":2},{"id":"K","axis":"x","lane":1,"size":3},{"id":"I","axis":"z","lane":0,"size":2},{"id":"E","axis":"z","lane":4,"size":2},{"id":"L","axis":"x","lane":3,"size":3},{"id":"J","axis":"x","lane":0,"size":2}],"positions":[2,3,2,2,4,0,4,1,3,1,2,1]},{"id":34,"name":"双向礼让","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"B","axis":"z","lane":3,"size":2},{"id":"I","axis":"x","lane":3,"size":2},{"id":"G","axis":"z","lane":3,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"H","axis":"x","lane":4,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"N","axis":"z","lane":2,"size":3},{"id":"K","axis":"x","lane":0,"size":3},{"id":"A","axis":"z","lane":5,"size":2},{"id":"F","axis":"x","lane":1,"size":2}],"positions":[0,1,0,3,1,1,3,1,2,1,0]},{"id":35,"name":"前后照应","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"M","axis":"z","lane":4,"size":3},{"id":"G","axis":"z","lane":2,"size":2},{"id":"C","axis":"z","lane":3,"size":2},{"id":"I","axis":"z","lane":0,"size":2},{"id":"D","axis":"x","lane":4,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"E","axis":"z","lane":3,"size":2},{"id":"A","axis":"x","lane":0,"size":2}],"positions":[0,1,2,0,4,2,3,2,1]},{"id":36,"name":"错位通行","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"M","axis":"z","lane":4,"size":3},{"id":"A","axis":"z","lane":0,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"I","axis":"x","lane":1,"size":2},{"id":"C","axis":"z","lane":0,"size":2},{"id":"E","axis":"z","lane":2,"size":2},{"id":"N","axis":"x","lane":0,"size":3},{"id":"G","axis":"x","lane":5,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"K","axis":"z","lane":1,"size":3},{"id":"J","axis":"z","lane":5,"size":2}],"positions":[2,2,1,1,1,4,3,3,4,2,3,1]},{"id":37,"name":"借道而行","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"x","lane":5,"size":3},{"id":"D","axis":"x","lane":0,"size":2},{"id":"J","axis":"x","lane":1,"size":2},{"id":"I","axis":"z","lane":5,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"N","axis":"z","lane":0,"size":3},{"id":"C","axis":"z","lane":2,"size":2},{"id":"E","axis":"z","lane":1,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"A","axis":"z","lane":4,"size":2}],"positions":[1,2,0,2,1,3,3,3,4,3,1]},{"id":38,"name":"街区穿梭","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"M","axis":"z","lane":4,"size":3},{"id":"I","axis":"x","lane":3,"size":2},{"id":"E","axis":"x","lane":4,"size":2},{"id":"J","axis":"z","lane":3,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"N","axis":"x","lane":0,"size":3},{"id":"K","axis":"z","lane":5,"size":3}],"positions":[1,4,0,1,2,2,1,3,0,3,1]},{"id":39,"name":"临时停靠","difficulty":1,"minimum":7,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"z","lane":3,"size":3},{"id":"B","axis":"x","lane":3,"size":2},{"id":"A","axis":"z","lane":5,"size":2},{"id":"M","axis":"x","lane":5,"size":3},{"id":"L","axis":"x","lane":1,"size":3},{"id":"D","axis":"x","lane":4,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"C","axis":"x","lane":1,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"H","axis":"z","lane":0,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"J","axis":"x","lane":0,"size":2}],"positions":[1,1,1,2,1,0,4,4,4,1,4,2,3]},{"id":40,"name":"车位交换","difficulty":1,"minimum":8,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"z","lane":5,"size":2},{"id":"K","axis":"z","lane":1,"size":3},{"id":"D","axis":"x","lane":3,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"J","axis":"z","lane":5,"size":2},{"id":"H","axis":"z","lane":0,"size":2},{"id":"B","axis":"z","lane":3,"size":2},{"id":"E","axis":"x","lane":0,"size":2},{"id":"I","axis":"x","lane":5,"size":2},{"id":"A","axis":"z","lane":0,"size":2}],"positions":[0,1,3,3,1,4,0,1,4,3,3]},{"id":41,"name":"忙里有序","difficulty":1,"minimum":8,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"z","lane":1,"size":3},{"id":"K","axis":"x","lane":4,"size":3},{"id":"H","axis":"z","lane":4,"size":2},{"id":"E","axis":"z","lane":3,"size":2},{"id":"L","axis":"z","lane":5,"size":3},{"id":"J","axis":"z","lane":2,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"A","axis":"x","lane":0,"size":2},{"id":"C","axis":"x","lane":3,"size":2},{"id":"G","axis":"x","lane":1,"size":2},{"id":"I","axis":"z","lane":0,"size":2}],"positions":[2,2,3,1,0,0,4,4,1,4,1,2]},{"id":42,"name":"来回调度","difficulty":1,"minimum":8,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":5,"size":2},{"id":"K","axis":"z","lane":3,"size":3},{"id":"M","axis":"x","lane":3,"size":3},{"id":"C","axis":"x","lane":5,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"B","axis":"z","lane":0,"size":2},{"id":"A","axis":"x","lane":0,"size":2},{"id":"D","axis":"z","lane":0,"size":2},{"id":"F","axis":"x","lane":1,"size":2}],"positions":[1,1,0,1,0,1,3,4,1,4,3,1]},{"id":43,"name":"横街纵巷","difficulty":1,"minimum":8,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"F","axis":"z","lane":4,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"M","axis":"z","lane":3,"size":3},{"id":"L","axis":"x","lane":0,"size":3},{"id":"J","axis":"z","lane":0,"size":2},{"id":"I","axis":"z","lane":3,"size":2}],"positions":[1,4,1,0,1,3,3,0,1]},{"id":44,"name":"先退后进","difficulty":1,"minimum":8,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"z","lane":4,"size":2},{"id":"F","axis":"z","lane":2,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"J","axis":"x","lane":5,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"H","axis":"x","lane":4,"size":2},{"id":"B","axis":"z","lane":1,"size":2},{"id":"C","axis":"x","lane":3,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"D","axis":"z","lane":3,"size":2},{"id":"G","axis":"x","lane":5,"size":2},{"id":"E","axis":"z","lane":0,"size":2}],"positions":[1,0,3,0,0,0,4,3,3,1,4,4,3]},{"id":45,"name":"找个空当","difficulty":1,"minimum":8,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"x","lane":1,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"G","axis":"x","lane":5,"size":2},{"id":"M","axis":"z","lane":0,"size":3},{"id":"J","axis":"z","lane":3,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"H","axis":"z","lane":2,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"B","axis":"z","lane":5,"size":2},{"id":"I","axis":"x","lane":5,"size":2}],"positions":[0,2,1,1,3,3,2,2,0,2,3]},{"id":46,"name":"轮流借位","difficulty":1,"minimum":8,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"I","axis":"x","lane":5,"size":2},{"id":"F","axis":"x","lane":3,"size":2},{"id":"J","axis":"x","lane":0,"size":2},{"id":"M","axis":"z","lane":0,"size":3},{"id":"A","axis":"z","lane":4,"size":2},{"id":"K","axis":"z","lane":5,"size":3},{"id":"B","axis":"x","lane":4,"size":2},{"id":"D","axis":"z","lane":3,"size":2},{"id":"E","axis":"x","lane":3,"size":2}],"positions":[1,1,4,3,2,0,1,0,0,4,1]},{"id":47,"name":"小城早高峰","difficulty":1,"minimum":8,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":1,"size":2},{"id":"K","axis":"x","lane":1,"size":3},{"id":"M","axis":"z","lane":5,"size":3},{"id":"F","axis":"x","lane":4,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"L","axis":"x","lane":5,"size":3},{"id":"J","axis":"z","lane":2,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"I","axis":"z","lane":3,"size":2},{"id":"B","axis":"x","lane":3,"size":2}],"positions":[2,3,1,0,4,3,3,3,1,3,4]},{"id":48,"name":"恰到好处","difficulty":1,"minimum":9,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"x","lane":4,"size":2},{"id":"L","axis":"x","lane":5,"size":3},{"id":"D","axis":"z","lane":0,"size":2},{"id":"J","axis":"x","lane":1,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"G","axis":"z","lane":5,"size":2},{"id":"C","axis":"z","lane":5,"size":2},{"id":"K","axis":"z","lane":0,"size":3},{"id":"A","axis":"z","lane":4,"size":2},{"id":"B","axis":"x","lane":0,"size":2},{"id":"F","axis":"z","lane":3,"size":2}],"positions":[1,3,1,0,3,1,3,1,2,2,4,2]},{"id":49,"name":"三车相逢","difficulty":1,"minimum":9,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"L","axis":"z","lane":0,"size":3},{"id":"K","axis":"z","lane":2,"size":3},{"id":"M","axis":"x","lane":0,"size":3},{"id":"J","axis":"z","lane":5,"size":2},{"id":"E","axis":"x","lane":0,"size":2},{"id":"F","axis":"z","lane":1,"size":2},{"id":"I","axis":"x","lane":1,"size":2},{"id":"D","axis":"x","lane":1,"size":2},{"id":"N","axis":"x","lane":4,"size":3},{"id":"H","axis":"x","lane":3,"size":2},{"id":"B","axis":"z","lane":3,"size":2},{"id":"G","axis":"x","lane":5,"size":2}],"positions":[0,3,2,0,2,3,3,4,0,3,3,1,1]},{"id":50,"name":"空位接力","difficulty":1,"minimum":9,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"x","lane":3,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"H","axis":"x","lane":5,"size":2},{"id":"J","axis":"x","lane":0,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"E","axis":"z","lane":2,"size":2},{"id":"I","axis":"z","lane":1,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"N","axis":"z","lane":3,"size":3},{"id":"K","axis":"z","lane":0,"size":3}],"positions":[1,4,2,0,3,3,3,3,4,2,2]},{"id":51,"name":"车流交汇","difficulty":1,"minimum":9,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"x","lane":0,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"H","axis":"z","lane":5,"size":2},{"id":"D","axis":"z","lane":2,"size":2},{"id":"A","axis":"z","lane":4,"size":2},{"id":"E","axis":"x","lane":1,"size":2},{"id":"M","axis":"z","lane":0,"size":3},{"id":"N","axis":"x","lane":5,"size":3},{"id":"B","axis":"z","lane":3,"size":2},{"id":"L","axis":"x","lane":4,"size":3}],"positions":[1,3,4,2,0,1,0,2,3,2,3]},{"id":52,"name":"出口在望","difficulty":1,"minimum":9,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"M","axis":"x","lane":4,"size":3},{"id":"B","axis":"z","lane":1,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"E","axis":"x","lane":3,"size":2},{"id":"H","axis":"z","lane":5,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"L","axis":"z","lane":3,"size":3},{"id":"D","axis":"x","lane":5,"size":2},{"id":"C","axis":"z","lane":2,"size":2}],"positions":[0,1,0,4,2,0,1,0,2,1]},{"id":53,"name":"排队等候","difficulty":1,"minimum":9,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"z","lane":3,"size":2},{"id":"F","axis":"z","lane":0,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"D","axis":"z","lane":3,"size":2},{"id":"A","axis":"x","lane":5,"size":2},{"id":"L","axis":"z","lane":2,"size":3},{"id":"H","axis":"x","lane":4,"size":2},{"id":"J","axis":"z","lane":4,"size":2},{"id":"I","axis":"x","lane":0,"size":2},{"id":"G","axis":"z","lane":5,"size":2}],"positions":[1,2,1,2,0,3,3,0,0,1,1]},{"id":54,"name":"等待时机","difficulty":1,"minimum":9,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"z","lane":1,"size":2},{"id":"C","axis":"z","lane":3,"size":2},{"id":"A","axis":"z","lane":0,"size":2},{"id":"G","axis":"z","lane":4,"size":2},{"id":"J","axis":"z","lane":5,"size":2},{"id":"D","axis":"z","lane":2,"size":2},{"id":"K","axis":"x","lane":0,"size":3},{"id":"E","axis":"x","lane":4,"size":2},{"id":"M","axis":"x","lane":5,"size":3},{"id":"H","axis":"x","lane":1,"size":2}],"positions":[1,3,1,2,2,1,0,3,2,3,0]},{"id":55,"name":"顺藤摸瓜","difficulty":1,"minimum":10,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":2,"size":2},{"id":"A","axis":"x","lane":5,"size":2},{"id":"D","axis":"z","lane":0,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"E","axis":"z","lane":0,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"F","axis":"x","lane":3,"size":2},{"id":"M","axis":"z","lane":3,"size":3}],"positions":[1,3,2,4,0,0,1,4,1]},{"id":56,"name":"盘活车位","difficulty":1,"minimum":10,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"M","axis":"z","lane":2,"size":3},{"id":"E","axis":"z","lane":5,"size":2},{"id":"I","axis":"z","lane":4,"size":2},{"id":"K","axis":"z","lane":3,"size":3},{"id":"N","axis":"x","lane":0,"size":3},{"id":"C","axis":"z","lane":2,"size":2},{"id":"J","axis":"x","lane":1,"size":2},{"id":"B","axis":"x","lane":4,"size":2}],"positions":[0,0,3,2,3,1,2,1,0,0]},{"id":57,"name":"穿针引线","difficulty":1,"minimum":10,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"z","lane":3,"size":2},{"id":"H","axis":"x","lane":3,"size":2},{"id":"G","axis":"x","lane":5,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"D","axis":"z","lane":1,"size":2},{"id":"E","axis":"x","lane":0,"size":2},{"id":"A","axis":"x","lane":5,"size":2},{"id":"B","axis":"x","lane":0,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"F","axis":"z","lane":2,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"L","axis":"x","lane":1,"size":3}],"positions":[2,4,2,0,0,3,3,4,0,2,4,2,0]},{"id":58,"name":"留好退路","difficulty":1,"minimum":10,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"z","lane":3,"size":2},{"id":"J","axis":"x","lane":0,"size":2},{"id":"B","axis":"x","lane":1,"size":2},{"id":"F","axis":"x","lane":3,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"K","axis":"z","lane":0,"size":3},{"id":"N","axis":"x","lane":5,"size":3},{"id":"E","axis":"x","lane":4,"size":2},{"id":"H","axis":"z","lane":5,"size":2},{"id":"I","axis":"z","lane":2,"size":2},{"id":"A","axis":"x","lane":0,"size":2},{"id":"G","axis":"z","lane":5,"size":2}],"positions":[2,0,0,1,3,1,2,3,3,1,3,4,3]},{"id":59,"name":"稳步向前","difficulty":1,"minimum":10,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"L","axis":"z","lane":2,"size":3},{"id":"K","axis":"x","lane":5,"size":3},{"id":"F","axis":"z","lane":4,"size":2},{"id":"C","axis":"x","lane":0,"size":2},{"id":"A","axis":"x","lane":4,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"I","axis":"x","lane":0,"size":2},{"id":"D","axis":"z","lane":4,"size":2}],"positions":[0,3,1,0,1,4,1,0,1,4]},{"id":60,"name":"有序出发","difficulty":1,"minimum":10,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"x","lane":4,"size":2},{"id":"F","axis":"z","lane":5,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"N","axis":"x","lane":5,"size":3},{"id":"G","axis":"z","lane":1,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"J","axis":"z","lane":0,"size":2},{"id":"B","axis":"x","lane":4,"size":2},{"id":"E","axis":"x","lane":3,"size":2}],"positions":[0,2,1,0,2,4,1,3,4,4]},{"id":61,"name":"交错车阵","difficulty":2,"minimum":11,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"x","lane":3,"size":2},{"id":"F","axis":"z","lane":4,"size":2},{"id":"A","axis":"z","lane":1,"size":2},{"id":"C","axis":"z","lane":5,"size":2},{"id":"M","axis":"z","lane":3,"size":3},{"id":"H","axis":"z","lane":2,"size":2},{"id":"E","axis":"z","lane":0,"size":2},{"id":"L","axis":"x","lane":5,"size":3}],"positions":[1,0,1,4,1,1,3,1,2]},{"id":62,"name":"连锁让行","difficulty":2,"minimum":11,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":3,"size":2},{"id":"F","axis":"z","lane":0,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"G","axis":"x","lane":0,"size":2},{"id":"I","axis":"z","lane":2,"size":2},{"id":"M","axis":"x","lane":5,"size":3},{"id":"N","axis":"z","lane":5,"size":3},{"id":"E","axis":"x","lane":3,"size":2},{"id":"L","axis":"x","lane":1,"size":3}],"positions":[0,1,4,1,2,2,3,1,0,0]},{"id":63,"name":"一退两进","difficulty":2,"minimum":11,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"z","lane":5,"size":2},{"id":"N","axis":"z","lane":0,"size":3},{"id":"A","axis":"z","lane":1,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"C","axis":"x","lane":0,"size":2},{"id":"B","axis":"z","lane":3,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"J","axis":"x","lane":5,"size":2},{"id":"D","axis":"x","lane":1,"size":2},{"id":"L","axis":"x","lane":4,"size":3},{"id":"H","axis":"x","lane":0,"size":2}],"positions":[0,3,3,3,2,2,2,0,4,1,2,0]},{"id":64,"name":"左右逢源","difficulty":2,"minimum":11,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"H","axis":"x","lane":5,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"C","axis":"x","lane":4,"size":2},{"id":"M","axis":"x","lane":3,"size":3},{"id":"L","axis":"z","lane":5,"size":3},{"id":"E","axis":"z","lane":0,"size":2},{"id":"D","axis":"z","lane":1,"size":2}],"positions":[1,0,4,2,2,2,4,2,0,3,4]},{"id":65,"name":"环环相扣","difficulty":2,"minimum":12,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"C","axis":"z","lane":3,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"N","axis":"z","lane":5,"size":3},{"id":"M","axis":"x","lane":3,"size":3},{"id":"H","axis":"z","lane":4,"size":2},{"id":"F","axis":"z","lane":0,"size":2},{"id":"A","axis":"x","lane":5,"size":2},{"id":"B","axis":"x","lane":1,"size":2},{"id":"I","axis":"z","lane":0,"size":2},{"id":"G","axis":"x","lane":4,"size":2}],"positions":[1,0,4,1,1,1,1,2,0,2,0,4]},{"id":66,"name":"腾挪空间","difficulty":2,"minimum":12,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"A","axis":"z","lane":3,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"I","axis":"z","lane":5,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"E","axis":"z","lane":0,"size":2},{"id":"N","axis":"x","lane":3,"size":3},{"id":"G","axis":"z","lane":3,"size":2}],"positions":[1,4,3,3,2,2,0,0,0,0]},{"id":67,"name":"见缝插针","difficulty":2,"minimum":12,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":3,"size":2},{"id":"C","axis":"x","lane":3,"size":2},{"id":"D","axis":"x","lane":3,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"G","axis":"x","lane":1,"size":2},{"id":"K","axis":"z","lane":0,"size":3},{"id":"A","axis":"x","lane":4,"size":2},{"id":"B","axis":"x","lane":4,"size":2},{"id":"I","axis":"z","lane":5,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"L","axis":"z","lane":4,"size":3}],"positions":[0,2,1,4,0,4,1,3,3,1,0,2,0]},{"id":68,"name":"多走一步","difficulty":2,"minimum":12,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"A","axis":"z","lane":0,"size":2},{"id":"H","axis":"z","lane":4,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"J","axis":"x","lane":1,"size":2},{"id":"L","axis":"z","lane":5,"size":3},{"id":"G","axis":"z","lane":3,"size":2},{"id":"F","axis":"z","lane":2,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"E","axis":"x","lane":3,"size":2}],"positions":[0,4,0,3,2,4,0,0,3,4,2,1]},{"id":69,"name":"街巷回环","difficulty":2,"minimum":12,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"x","lane":3,"size":3},{"id":"D","axis":"z","lane":5,"size":2},{"id":"H","axis":"z","lane":5,"size":2},{"id":"A","axis":"x","lane":4,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"M","axis":"x","lane":5,"size":3},{"id":"C","axis":"z","lane":4,"size":2},{"id":"J","axis":"x","lane":1,"size":2},{"id":"E","axis":"z","lane":0,"size":2},{"id":"I","axis":"z","lane":3,"size":2},{"id":"B","axis":"z","lane":0,"size":2},{"id":"G","axis":"x","lane":4,"size":2}],"positions":[0,1,2,4,3,1,0,2,4,0,1,3,1]},{"id":70,"name":"步步相让","difficulty":2,"minimum":12,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"C","axis":"x","lane":5,"size":2},{"id":"D","axis":"x","lane":5,"size":2},{"id":"A","axis":"z","lane":0,"size":2},{"id":"H","axis":"x","lane":0,"size":2},{"id":"B","axis":"z","lane":2,"size":2},{"id":"L","axis":"z","lane":5,"size":3},{"id":"K","axis":"x","lane":4,"size":3},{"id":"F","axis":"z","lane":3,"size":2},{"id":"G","axis":"x","lane":3,"size":2},{"id":"E","axis":"x","lane":1,"size":2}],"positions":[1,0,4,1,1,1,3,1,3,0,3,1]},{"id":71,"name":"拥堵疏导","difficulty":2,"minimum":13,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"x","lane":1,"size":2},{"id":"H","axis":"z","lane":2,"size":2},{"id":"C","axis":"z","lane":1,"size":2},{"id":"N","axis":"x","lane":5,"size":3},{"id":"F","axis":"z","lane":5,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"K","axis":"z","lane":0,"size":3},{"id":"J","axis":"z","lane":4,"size":2},{"id":"L","axis":"x","lane":4,"size":3},{"id":"B","axis":"z","lane":2,"size":2}],"positions":[2,3,3,1,1,0,2,3,2,3,0]},{"id":72,"name":"巧借长车","difficulty":2,"minimum":13,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"x","lane":1,"size":2},{"id":"E","axis":"z","lane":2,"size":2},{"id":"N","axis":"x","lane":4,"size":3},{"id":"B","axis":"z","lane":0,"size":2},{"id":"L","axis":"z","lane":4,"size":3},{"id":"H","axis":"x","lane":3,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"I","axis":"z","lane":0,"size":2},{"id":"M","axis":"x","lane":5,"size":3},{"id":"D","axis":"z","lane":1,"size":2}],"positions":[2,2,4,3,1,1,1,2,4,3,4]},{"id":73,"name":"长短相济","difficulty":2,"minimum":13,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"F","axis":"x","lane":3,"size":2},{"id":"A","axis":"x","lane":0,"size":2},{"id":"K","axis":"x","lane":4,"size":3},{"id":"M","axis":"z","lane":2,"size":3},{"id":"L","axis":"z","lane":5,"size":3},{"id":"N","axis":"x","lane":5,"size":3},{"id":"G","axis":"x","lane":5,"size":2},{"id":"B","axis":"z","lane":4,"size":2},{"id":"I","axis":"x","lane":1,"size":2}],"positions":[0,1,4,2,0,3,2,0,2,0]},{"id":74,"name":"转圜余地","difficulty":2,"minimum":13,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"A","axis":"x","lane":1,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"H","axis":"x","lane":3,"size":2},{"id":"E","axis":"z","lane":2,"size":2},{"id":"F","axis":"z","lane":5,"size":2},{"id":"M","axis":"z","lane":1,"size":3}],"positions":[2,3,0,1,2,3,2,4,0,1]},{"id":75,"name":"进退之间","difficulty":2,"minimum":14,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"D","axis":"z","lane":4,"size":2},{"id":"M","axis":"z","lane":3,"size":3},{"id":"K","axis":"z","lane":2,"size":3},{"id":"A","axis":"z","lane":5,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"H","axis":"x","lane":3,"size":2}],"positions":[0,1,3,0,2,0,1,3,1]},{"id":76,"name":"解开车结","difficulty":2,"minimum":14,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"L","axis":"x","lane":4,"size":3},{"id":"A","axis":"z","lane":2,"size":2},{"id":"N","axis":"z","lane":1,"size":3},{"id":"F","axis":"z","lane":0,"size":2},{"id":"M","axis":"z","lane":5,"size":3},{"id":"G","axis":"z","lane":4,"size":2},{"id":"B","axis":"z","lane":0,"size":2},{"id":"I","axis":"x","lane":5,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"H","axis":"z","lane":1,"size":2},{"id":"J","axis":"x","lane":1,"size":2}],"positions":[2,2,0,2,4,3,2,0,2,4,0,4]},{"id":77,"name":"逆向思考","difficulty":2,"minimum":14,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"z","lane":1,"size":3},{"id":"D","axis":"x","lane":0,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"B","axis":"z","lane":2,"size":2},{"id":"A","axis":"x","lane":4,"size":2},{"id":"K","axis":"z","lane":5,"size":3},{"id":"I","axis":"z","lane":3,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"F","axis":"z","lane":4,"size":2},{"id":"C","axis":"x","lane":5,"size":2}],"positions":[2,0,4,3,3,4,1,0,1,1,1]},{"id":78,"name":"腾出通道","difficulty":2,"minimum":14,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"z","lane":2,"size":2},{"id":"L","axis":"z","lane":4,"size":3},{"id":"B","axis":"z","lane":5,"size":2},{"id":"M","axis":"z","lane":0,"size":3},{"id":"A","axis":"z","lane":5,"size":2},{"id":"I","axis":"z","lane":1,"size":2},{"id":"H","axis":"x","lane":0,"size":2},{"id":"K","axis":"x","lane":1,"size":3},{"id":"J","axis":"x","lane":4,"size":2},{"id":"E","axis":"x","lane":0,"size":2}],"positions":[2,4,1,4,1,2,2,3,1,3,1]},{"id":79,"name":"迂回穿行","difficulty":2,"minimum":14,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"z","lane":4,"size":2},{"id":"G","axis":"z","lane":5,"size":2},{"id":"N","axis":"x","lane":3,"size":3},{"id":"K","axis":"z","lane":2,"size":3},{"id":"L","axis":"x","lane":0,"size":3},{"id":"E","axis":"x","lane":5,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"I","axis":"z","lane":0,"size":2},{"id":"H","axis":"x","lane":1,"size":2},{"id":"F","axis":"z","lane":3,"size":2}],"positions":[0,4,1,3,2,0,0,2,3,1,0]},{"id":80,"name":"穿行街区","difficulty":2,"minimum":15,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":5,"size":2},{"id":"F","axis":"z","lane":0,"size":2},{"id":"B","axis":"z","lane":1,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"A","axis":"z","lane":2,"size":2},{"id":"N","axis":"z","lane":0,"size":3},{"id":"E","axis":"x","lane":5,"size":2},{"id":"D","axis":"x","lane":3,"size":2},{"id":"I","axis":"z","lane":5,"size":2},{"id":"L","axis":"z","lane":4,"size":3},{"id":"K","axis":"z","lane":3,"size":3}],"positions":[1,1,0,3,0,4,3,3,3,4,0,0]},{"id":81,"name":"静心调度","difficulty":2,"minimum":15,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"J","axis":"x","lane":5,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"E","axis":"z","lane":0,"size":2},{"id":"H","axis":"x","lane":4,"size":2},{"id":"F","axis":"z","lane":5,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"G","axis":"z","lane":1,"size":2},{"id":"B","axis":"z","lane":5,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"A","axis":"x","lane":0,"size":2},{"id":"I","axis":"x","lane":5,"size":2}],"positions":[0,2,2,2,4,2,3,1,3,0,1,0,4]},{"id":82,"name":"连环借位","difficulty":2,"minimum":15,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"z","lane":3,"size":3},{"id":"M","axis":"x","lane":4,"size":3},{"id":"A","axis":"x","lane":5,"size":2},{"id":"E","axis":"x","lane":3,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"G","axis":"z","lane":2,"size":2},{"id":"L","axis":"x","lane":5,"size":3},{"id":"J","axis":"x","lane":1,"size":2},{"id":"I","axis":"x","lane":0,"size":2},{"id":"F","axis":"x","lane":3,"size":2}],"positions":[0,0,2,3,1,4,0,0,4,4,3]},{"id":83,"name":"通路重组","difficulty":2,"minimum":15,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"D","axis":"z","lane":2,"size":2},{"id":"B","axis":"z","lane":1,"size":2},{"id":"I","axis":"z","lane":3,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"H","axis":"z","lane":5,"size":2},{"id":"A","axis":"z","lane":0,"size":2},{"id":"C","axis":"x","lane":3,"size":2}],"positions":[0,2,2,2,4,2,4,3,2,0,0]},{"id":84,"name":"进退有方","difficulty":2,"minimum":15,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"G","axis":"x","lane":3,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"E","axis":"z","lane":2,"size":2},{"id":"H","axis":"z","lane":5,"size":2},{"id":"M","axis":"z","lane":4,"size":3},{"id":"D","axis":"z","lane":5,"size":2},{"id":"J","axis":"x","lane":0,"size":2},{"id":"A","axis":"z","lane":1,"size":2},{"id":"L","axis":"x","lane":1,"size":3}],"positions":[1,3,0,3,4,3,1,0,1,4,1]},{"id":85,"name":"调度考验","difficulty":2,"minimum":15,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"G","axis":"x","lane":3,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"H","axis":"z","lane":0,"size":2},{"id":"M","axis":"x","lane":1,"size":3},{"id":"C","axis":"x","lane":4,"size":2},{"id":"B","axis":"z","lane":2,"size":2},{"id":"I","axis":"z","lane":5,"size":2}],"positions":[1,4,4,0,0,2,1,3,3,1]},{"id":86,"name":"柳暗花明","difficulty":2,"minimum":16,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"B","axis":"z","lane":0,"size":2},{"id":"D","axis":"x","lane":3,"size":2},{"id":"C","axis":"z","lane":4,"size":2},{"id":"M","axis":"z","lane":5,"size":3},{"id":"L","axis":"z","lane":2,"size":3},{"id":"J","axis":"x","lane":5,"size":2},{"id":"F","axis":"z","lane":3,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"E","axis":"z","lane":1,"size":2},{"id":"N","axis":"z","lane":0,"size":3},{"id":"I","axis":"x","lane":0,"size":2}],"positions":[0,0,1,4,1,0,1,2,1,0,3,3]},{"id":87,"name":"曲径通幽","difficulty":2,"minimum":16,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"z","lane":0,"size":2},{"id":"M","axis":"z","lane":5,"size":3},{"id":"B","axis":"z","lane":4,"size":2},{"id":"C","axis":"z","lane":1,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"D","axis":"z","lane":3,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"N","axis":"z","lane":2,"size":3},{"id":"A","axis":"x","lane":0,"size":2},{"id":"J","axis":"z","lane":3,"size":2}],"positions":[1,3,0,2,4,4,1,4,3,1,3]},{"id":88,"name":"环城车流","difficulty":2,"minimum":16,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"z","lane":0,"size":2},{"id":"L","axis":"z","lane":4,"size":3},{"id":"I","axis":"x","lane":0,"size":2},{"id":"J","axis":"z","lane":1,"size":2},{"id":"G","axis":"z","lane":2,"size":2},{"id":"D","axis":"z","lane":0,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"K","axis":"x","lane":4,"size":3},{"id":"B","axis":"x","lane":5,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"E","axis":"x","lane":1,"size":2},{"id":"H","axis":"x","lane":3,"size":2}],"positions":[2,1,1,2,1,3,4,0,3,2,4,2,0]},{"id":89,"name":"层层让路","difficulty":2,"minimum":16,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"x","lane":0,"size":3},{"id":"J","axis":"z","lane":0,"size":2},{"id":"G","axis":"x","lane":5,"size":2},{"id":"H","axis":"x","lane":3,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"M","axis":"x","lane":1,"size":3},{"id":"A","axis":"x","lane":5,"size":2},{"id":"I","axis":"z","lane":1,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"D","axis":"z","lane":3,"size":2}],"positions":[1,1,3,3,4,3,1,1,3,0,2]},{"id":90,"name":"突破重围","difficulty":2,"minimum":16,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"x","lane":4,"size":3},{"id":"I","axis":"z","lane":1,"size":2},{"id":"L","axis":"z","lane":4,"size":3},{"id":"M","axis":"x","lane":0,"size":3},{"id":"E","axis":"x","lane":1,"size":2},{"id":"D","axis":"z","lane":5,"size":2},{"id":"K","axis":"z","lane":0,"size":3},{"id":"C","axis":"x","lane":5,"size":2},{"id":"J","axis":"x","lane":3,"size":2},{"id":"B","axis":"z","lane":2,"size":2}],"positions":[1,3,3,0,0,2,0,1,4,3,4]},{"id":91,"name":"拥挤时刻","difficulty":3,"minimum":17,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"x","lane":5,"size":2},{"id":"I","axis":"z","lane":4,"size":2},{"id":"M","axis":"x","lane":5,"size":3},{"id":"H","axis":"z","lane":0,"size":2},{"id":"B","axis":"x","lane":4,"size":2},{"id":"E","axis":"z","lane":1,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"J","axis":"z","lane":2,"size":2},{"id":"A","axis":"z","lane":3,"size":2},{"id":"C","axis":"z","lane":0,"size":2},{"id":"K","axis":"x","lane":1,"size":3}],"positions":[1,3,1,0,3,3,3,1,3,2,1,1]},{"id":92,"name":"密集车阵","difficulty":3,"minimum":17,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"x","lane":1,"size":2},{"id":"F","axis":"z","lane":4,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"L","axis":"z","lane":2,"size":3},{"id":"G","axis":"z","lane":3,"size":2},{"id":"M","axis":"x","lane":4,"size":3},{"id":"I","axis":"z","lane":5,"size":2},{"id":"K","axis":"x","lane":0,"size":3},{"id":"H","axis":"z","lane":5,"size":2},{"id":"A","axis":"x","lane":5,"size":2}],"positions":[0,4,4,0,1,1,1,4,1,2,2]},{"id":93,"name":"多重借道","difficulty":3,"minimum":17,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"D","axis":"x","lane":0,"size":2},{"id":"L","axis":"x","lane":5,"size":3},{"id":"C","axis":"z","lane":4,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"A","axis":"z","lane":1,"size":2},{"id":"M","axis":"z","lane":0,"size":3},{"id":"G","axis":"x","lane":1,"size":2},{"id":"B","axis":"x","lane":0,"size":2},{"id":"N","axis":"z","lane":3,"size":3},{"id":"J","axis":"x","lane":3,"size":2},{"id":"H","axis":"x","lane":4,"size":2}],"positions":[1,4,1,2,2,3,1,4,0,0,2,2]},{"id":94,"name":"深巷回声","difficulty":3,"minimum":17,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"B","axis":"x","lane":3,"size":2},{"id":"J","axis":"z","lane":1,"size":2},{"id":"F","axis":"x","lane":3,"size":2},{"id":"C","axis":"x","lane":1,"size":2},{"id":"K","axis":"x","lane":5,"size":3},{"id":"D","axis":"z","lane":4,"size":2},{"id":"A","axis":"x","lane":0,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"L","axis":"z","lane":0,"size":3},{"id":"H","axis":"z","lane":5,"size":2}],"positions":[0,4,3,2,0,1,1,3,4,3,0,3,1]},{"id":95,"name":"错综有序","difficulty":3,"minimum":17,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"x","lane":4,"size":2},{"id":"J","axis":"z","lane":2,"size":2},{"id":"D","axis":"z","lane":1,"size":2},{"id":"I","axis":"z","lane":4,"size":2},{"id":"G","axis":"z","lane":4,"size":2},{"id":"M","axis":"x","lane":1,"size":3},{"id":"B","axis":"x","lane":0,"size":2},{"id":"L","axis":"z","lane":5,"size":3}],"positions":[2,2,0,2,4,2,3,0,2]},{"id":96,"name":"层层解锁","difficulty":3,"minimum":17,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"x","lane":5,"size":2},{"id":"C","axis":"z","lane":0,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"N","axis":"z","lane":0,"size":3},{"id":"M","axis":"z","lane":5,"size":3},{"id":"D","axis":"z","lane":3,"size":2},{"id":"H","axis":"x","lane":0,"size":2},{"id":"F","axis":"x","lane":1,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"B","axis":"z","lane":1,"size":2},{"id":"J","axis":"z","lane":2,"size":2}],"positions":[1,0,0,3,2,2,2,3,2,3,1,0,4]},{"id":97,"name":"狭路相让","difficulty":3,"minimum":17,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"J","axis":"x","lane":0,"size":2},{"id":"M","axis":"z","lane":3,"size":3},{"id":"N","axis":"z","lane":5,"size":3},{"id":"L","axis":"z","lane":2,"size":3},{"id":"E","axis":"x","lane":4,"size":2},{"id":"B","axis":"x","lane":0,"size":2},{"id":"F","axis":"z","lane":1,"size":2},{"id":"I","axis":"z","lane":4,"size":2}],"positions":[1,3,3,4,1,1,3,3,0,4,1]},{"id":98,"name":"城市迷局","difficulty":3,"minimum":18,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"G","axis":"x","lane":3,"size":2},{"id":"H","axis":"z","lane":2,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"C","axis":"z","lane":0,"size":2},{"id":"I","axis":"z","lane":4,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"N","axis":"x","lane":5,"size":3},{"id":"B","axis":"z","lane":3,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"K","axis":"z","lane":5,"size":3},{"id":"D","axis":"x","lane":1,"size":2},{"id":"E","axis":"x","lane":3,"size":2}],"positions":[0,0,2,3,4,1,1,2,1,3,1,0,3]},{"id":99,"name":"步步为营","difficulty":3,"minimum":18,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"z","lane":1,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"M","axis":"z","lane":3,"size":3},{"id":"A","axis":"x","lane":3,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"H","axis":"z","lane":2,"size":2},{"id":"K","axis":"z","lane":4,"size":3}],"positions":[1,4,3,1,1,0,1,3,2]},{"id":100,"name":"解开连环","difficulty":3,"minimum":18,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"L","axis":"z","lane":2,"size":3},{"id":"I","axis":"z","lane":5,"size":2},{"id":"G","axis":"z","lane":5,"size":2},{"id":"H","axis":"x","lane":4,"size":2},{"id":"B","axis":"z","lane":1,"size":2},{"id":"K","axis":"x","lane":0,"size":3},{"id":"J","axis":"z","lane":3,"size":2},{"id":"N","axis":"z","lane":4,"size":3}],"positions":[0,1,4,2,2,3,0,2,2]},{"id":101,"name":"最后一格","difficulty":3,"minimum":18,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"z","lane":4,"size":2},{"id":"C","axis":"x","lane":0,"size":2},{"id":"A","axis":"x","lane":4,"size":2},{"id":"H","axis":"x","lane":5,"size":2},{"id":"E","axis":"z","lane":0,"size":2},{"id":"K","axis":"z","lane":2,"size":3},{"id":"G","axis":"z","lane":1,"size":2},{"id":"M","axis":"z","lane":5,"size":3},{"id":"D","axis":"x","lane":0,"size":2},{"id":"I","axis":"z","lane":3,"size":2},{"id":"B","axis":"x","lane":5,"size":2}],"positions":[0,2,4,2,3,4,1,3,1,1,1,1]},{"id":102,"name":"长车迷阵","difficulty":3,"minimum":18,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"H","axis":"x","lane":4,"size":2},{"id":"B","axis":"z","lane":1,"size":2},{"id":"G","axis":"z","lane":2,"size":2},{"id":"E","axis":"z","lane":4,"size":2},{"id":"L","axis":"z","lane":5,"size":3},{"id":"N","axis":"x","lane":0,"size":3},{"id":"I","axis":"z","lane":0,"size":2},{"id":"A","axis":"z","lane":2,"size":2},{"id":"K","axis":"z","lane":3,"size":3}],"positions":[0,3,4,4,3,0,1,0,3,1,0]},{"id":103,"name":"环线调度","difficulty":3,"minimum":19,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"x","lane":1,"size":2},{"id":"E","axis":"x","lane":0,"size":2},{"id":"M","axis":"z","lane":4,"size":3},{"id":"F","axis":"x","lane":4,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"K","axis":"z","lane":1,"size":3},{"id":"I","axis":"x","lane":3,"size":2},{"id":"A","axis":"x","lane":5,"size":2},{"id":"D","axis":"z","lane":3,"size":2},{"id":"J","axis":"z","lane":5,"size":2},{"id":"B","axis":"x","lane":5,"size":2},{"id":"N","axis":"z","lane":0,"size":3}],"positions":[2,2,2,0,4,3,0,1,2,3,2,0,0]},{"id":104,"name":"静候空位","difficulty":3,"minimum":20,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"A","axis":"z","lane":2,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"B","axis":"z","lane":1,"size":2},{"id":"D","axis":"z","lane":4,"size":2},{"id":"C","axis":"z","lane":4,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"K","axis":"x","lane":1,"size":3},{"id":"L","axis":"x","lane":0,"size":3}],"positions":[2,4,1,4,2,0,4,1,0]},{"id":105,"name":"全盘统筹","difficulty":3,"minimum":20,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"x","lane":4,"size":3},{"id":"L","axis":"z","lane":5,"size":3},{"id":"J","axis":"z","lane":2,"size":2},{"id":"G","axis":"z","lane":3,"size":2},{"id":"H","axis":"z","lane":4,"size":2},{"id":"N","axis":"x","lane":5,"size":3},{"id":"C","axis":"x","lane":0,"size":2},{"id":"E","axis":"z","lane":2,"size":2},{"id":"F","axis":"z","lane":1,"size":2}],"positions":[0,0,1,0,2,3,3,3,2,0]},{"id":106,"name":"往返之间","difficulty":3,"minimum":21,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"I","axis":"x","lane":3,"size":2},{"id":"M","axis":"z","lane":3,"size":3},{"id":"E","axis":"x","lane":5,"size":2},{"id":"L","axis":"z","lane":2,"size":3},{"id":"H","axis":"x","lane":1,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"G","axis":"z","lane":0,"size":2}],"positions":[0,4,2,1,0,0,0,3]},{"id":107,"name":"多步筹谋","difficulty":3,"minimum":21,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"x","lane":0,"size":3},{"id":"F","axis":"x","lane":4,"size":2},{"id":"E","axis":"z","lane":3,"size":2},{"id":"A","axis":"z","lane":3,"size":2},{"id":"B","axis":"z","lane":2,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"D","axis":"z","lane":0,"size":2},{"id":"C","axis":"x","lane":1,"size":2}],"positions":[0,3,4,1,3,0,1,3,0]},{"id":108,"name":"抽丝剥茧","difficulty":3,"minimum":21,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"E","axis":"z","lane":5,"size":2},{"id":"I","axis":"x","lane":0,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"H","axis":"z","lane":0,"size":2},{"id":"A","axis":"x","lane":3,"size":2},{"id":"M","axis":"x","lane":1,"size":3},{"id":"B","axis":"z","lane":5,"size":2},{"id":"G","axis":"z","lane":3,"size":2},{"id":"F","axis":"z","lane":2,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"L","axis":"x","lane":0,"size":3}],"positions":[0,1,3,4,1,4,0,1,1,2,2,3,1]},{"id":109,"name":"车阵深处","difficulty":3,"minimum":22,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"F","axis":"z","lane":5,"size":2},{"id":"I","axis":"z","lane":2,"size":2},{"id":"B","axis":"x","lane":4,"size":2},{"id":"K","axis":"z","lane":0,"size":3},{"id":"H","axis":"x","lane":0,"size":2},{"id":"J","axis":"x","lane":3,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"D","axis":"z","lane":3,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"N","axis":"z","lane":4,"size":3}],"positions":[2,1,3,4,0,2,0,1,3,3,1]},{"id":110,"name":"峰回路转","difficulty":3,"minimum":22,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"K","axis":"z","lane":2,"size":3},{"id":"M","axis":"x","lane":3,"size":3},{"id":"N","axis":"x","lane":5,"size":3},{"id":"J","axis":"x","lane":4,"size":2},{"id":"L","axis":"z","lane":5,"size":3},{"id":"C","axis":"x","lane":1,"size":2},{"id":"G","axis":"z","lane":3,"size":2}],"positions":[0,4,0,1,0,1,2,4,1]},{"id":111,"name":"寸格必争","difficulty":3,"minimum":22,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"x","lane":5,"size":2},{"id":"M","axis":"z","lane":4,"size":3},{"id":"L","axis":"z","lane":0,"size":3},{"id":"G","axis":"z","lane":3,"size":2},{"id":"N","axis":"x","lane":1,"size":3},{"id":"C","axis":"z","lane":2,"size":2},{"id":"B","axis":"z","lane":5,"size":2},{"id":"A","axis":"x","lane":4,"size":2},{"id":"J","axis":"x","lane":5,"size":2},{"id":"F","axis":"z","lane":5,"size":2},{"id":"H","axis":"x","lane":0,"size":2},{"id":"D","axis":"x","lane":0,"size":2}],"positions":[1,3,0,1,2,1,3,1,3,0,3,0,2]},{"id":112,"name":"重重关卡","difficulty":3,"minimum":23,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"N","axis":"z","lane":4,"size":3},{"id":"G","axis":"x","lane":5,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"M","axis":"x","lane":1,"size":3},{"id":"F","axis":"x","lane":5,"size":2},{"id":"E","axis":"z","lane":1,"size":2},{"id":"A","axis":"x","lane":0,"size":2},{"id":"I","axis":"z","lane":2,"size":2},{"id":"K","axis":"z","lane":0,"size":3},{"id":"D","axis":"z","lane":5,"size":2},{"id":"H","axis":"x","lane":0,"size":2},{"id":"B","axis":"z","lane":5,"size":2}],"positions":[2,1,4,4,0,2,4,2,3,2,0,0,2]},{"id":113,"name":"精密换位","difficulty":3,"minimum":23,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"x","lane":5,"size":3},{"id":"G","axis":"x","lane":0,"size":2},{"id":"N","axis":"x","lane":0,"size":3},{"id":"E","axis":"x","lane":3,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"B","axis":"x","lane":4,"size":2},{"id":"M","axis":"x","lane":1,"size":3},{"id":"L","axis":"z","lane":4,"size":3},{"id":"D","axis":"z","lane":3,"size":2},{"id":"H","axis":"z","lane":0,"size":2}],"positions":[0,2,3,0,1,1,1,3,2,3,3]},{"id":114,"name":"城市脉络","difficulty":3,"minimum":23,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"B","axis":"z","lane":1,"size":2},{"id":"L","axis":"z","lane":4,"size":3},{"id":"H","axis":"z","lane":0,"size":2},{"id":"E","axis":"z","lane":3,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"F","axis":"z","lane":5,"size":2},{"id":"A","axis":"z","lane":0,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"K","axis":"x","lane":5,"size":3},{"id":"D","axis":"x","lane":3,"size":2}],"positions":[1,4,4,0,4,1,0,1,2,3,2,3]},{"id":115,"name":"连环破局","difficulty":3,"minimum":23,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"z","lane":0,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"H","axis":"z","lane":2,"size":2},{"id":"E","axis":"z","lane":4,"size":2},{"id":"B","axis":"z","lane":4,"size":2},{"id":"L","axis":"x","lane":1,"size":3},{"id":"D","axis":"x","lane":0,"size":2},{"id":"A","axis":"z","lane":1,"size":2},{"id":"M","axis":"x","lane":5,"size":3},{"id":"I","axis":"x","lane":4,"size":2}],"positions":[2,4,2,3,2,0,0,2,2,3,3]},{"id":116,"name":"出库远征","difficulty":3,"minimum":23,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"H","axis":"z","lane":4,"size":2},{"id":"D","axis":"x","lane":5,"size":2},{"id":"B","axis":"z","lane":1,"size":2},{"id":"I","axis":"z","lane":0,"size":2},{"id":"E","axis":"x","lane":1,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"A","axis":"z","lane":4,"size":2},{"id":"F","axis":"x","lane":0,"size":2},{"id":"J","axis":"z","lane":2,"size":2},{"id":"M","axis":"x","lane":4,"size":3}],"positions":[2,4,2,2,0,3,3,2,4,0,1]},{"id":117,"name":"出库大师","difficulty":3,"minimum":25,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"D","axis":"x","lane":5,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"F","axis":"x","lane":5,"size":2},{"id":"B","axis":"x","lane":3,"size":2},{"id":"L","axis":"z","lane":5,"size":3},{"id":"I","axis":"x","lane":1,"size":2},{"id":"M","axis":"x","lane":0,"size":3},{"id":"A","axis":"z","lane":1,"size":2},{"id":"C","axis":"z","lane":2,"size":2},{"id":"G","axis":"x","lane":4,"size":2},{"id":"E","axis":"z","lane":3,"size":2}],"positions":[0,0,2,3,4,3,2,1,1,4,2,2,1]},{"id":118,"name":"最后通道","difficulty":3,"minimum":27,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"x","lane":1,"size":2},{"id":"L","axis":"x","lane":0,"size":3},{"id":"H","axis":"z","lane":5,"size":2},{"id":"I","axis":"x","lane":4,"size":2},{"id":"B","axis":"z","lane":1,"size":2},{"id":"D","axis":"z","lane":3,"size":2},{"id":"J","axis":"z","lane":0,"size":2},{"id":"K","axis":"z","lane":4,"size":3},{"id":"M","axis":"x","lane":5,"size":3},{"id":"C","axis":"z","lane":0,"size":2},{"id":"G","axis":"z","lane":2,"size":2},{"id":"A","axis":"z","lane":5,"size":2}],"positions":[0,1,1,4,3,4,2,0,0,2,3,2,1]},{"id":119,"name":"调度专家","difficulty":3,"minimum":30,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"C","axis":"z","lane":3,"size":2},{"id":"L","axis":"z","lane":4,"size":3},{"id":"A","axis":"x","lane":5,"size":2},{"id":"G","axis":"z","lane":3,"size":2},{"id":"F","axis":"z","lane":0,"size":2},{"id":"M","axis":"z","lane":5,"size":3},{"id":"K","axis":"x","lane":0,"size":3},{"id":"E","axis":"x","lane":3,"size":2},{"id":"J","axis":"x","lane":4,"size":2},{"id":"B","axis":"x","lane":1,"size":2},{"id":"D","axis":"z","lane":2,"size":2},{"id":"H","axis":"x","lane":5,"size":2}],"positions":[0,2,1,1,4,4,1,1,0,4,2,3,4]},{"id":120,"name":"终极调度","difficulty":3,"minimum":30,"cars":[{"id":"X","axis":"x","lane":2,"size":2},{"id":"E","axis":"x","lane":1,"size":2},{"id":"A","axis":"x","lane":4,"size":2},{"id":"F","axis":"z","lane":3,"size":2},{"id":"K","axis":"x","lane":0,"size":3},{"id":"B","axis":"x","lane":3,"size":2},{"id":"G","axis":"z","lane":0,"size":2},{"id":"N","axis":"z","lane":5,"size":3},{"id":"D","axis":"z","lane":2,"size":2},{"id":"C","axis":"x","lane":5,"size":2},{"id":"H","axis":"z","lane":3,"size":2}],"positions":[1,0,4,3,2,1,3,0,4,0,1]}]'),Ht=Qf,au=i=>({positions:[...i.positions],past:[],future:[]});function jf(i,e){return{name:"parking-escape",minPlayers:1,maxPlayers:1,disableUndo:!0,setup:()=>structuredClone(e??au(i)),moves:{slide:({G:t},n)=>{if(!xl(i.cars,t.positions,n))return ss;t.past.push([...t.positions]),t.positions=Jf(t.positions,n),t.future=[]},back:({G:t})=>{if(!t.past.length)return ss;t.future.push([...t.positions]),t.positions=t.past.pop()},forward:({G:t})=>{if(!t.future.length)return ss;t.past.push([...t.positions]),t.positions=t.future.pop()}},endIf:({G:t})=>t.positions[0]===qt?{winner:"0"}:void 0}}const ru=(i,e)=>Yf({game:jf(i,e),numPlayers:1,debug:!1}),ou="parking-escape-save-v2",lu="parking-escape-preferences-v1";function ep(i,e,t){const n=t.flatMap((s,a)=>s!==e[a]?[{car:a,to:s}]:[]);return n.length===1&&xl(i.cars,e,n[0])}function wc(i){const e={version:2,level:1,game:au(Ht[0]),seconds:0,best:{}};if(!i||typeof i!="object")return e;const t=i;if(t.version!==2)return e;if(t.best&&typeof t.best=="object")for(const r of Ht){const o=t.best[r.id];Number.isInteger(o)&&o>=r.minimum&&o<=1e4&&(e.best[r.id]=o)}const n=Ht.find(r=>r.id===t.level),s=t.game;if(!n||!s||!zc(n.cars,s.positions)||!Array.isArray(s.past)||!Array.isArray(s.future)||s.past.length+s.future.length>1e4||![...s.past,...s.future].every(r=>zc(n.cars,r)))return e;const a=[...s.past,s.positions,...[...s.future].reverse()];if(a[0].some((r,o)=>r!==n.positions[o]))return e;for(let r=1;r<a.length;r++)if(!ep(n,a[r-1],a[r]))return e;return{version:2,level:n.id,game:structuredClone(s),seconds:Number.isFinite(t.seconds)&&t.seconds>=0?Math.min(t.seconds,864e3):0,best:e.best}}function tp(){try{return wc(JSON.parse(localStorage.getItem(ou)??"null"))}catch{return wc(null)}}function ip(i){try{localStorage.setItem(ou,JSON.stringify(i))}catch{}}function np(){try{return JSON.parse(localStorage.getItem(lu)??"null")?.sound!==!1}catch{return!0}}function sp(i){try{localStorage.setItem(lu,JSON.stringify({sound:i}))}catch{}}const gl="185",as={ROTATE:0,DOLLY:1,PAN:2},un={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ap=0,Rc=1,rp=2,Ta=1,cu=2,Ps=3,pn=0,Kt=1,Xi=2,$i=0,rs=1,Cc=2,Pc=3,Dc=4,op=5,Tn=100,lp=101,cp=102,dp=103,up=104,hp=200,fp=201,pp=202,mp=203,so=204,ao=205,xp=206,gp=207,_p=208,vp=209,Mp=210,yp=211,Sp=212,Ep=213,bp=214,ro=0,oo=1,lo=2,hs=3,co=4,uo=5,ho=6,fo=7,du=0,Tp=1,Ap=2,Ci=0,uu=1,hu=2,fu=3,_l=4,pu=5,mu=6,xu=7,gu=300,Ln=301,fs=302,pr=303,mr=304,Ka=306,po=1e3,qi=1001,mo=1002,Pt=1003,zp=1004,ta=1005,Gt=1006,xr=1007,wn=1008,ei=1009,_u=1010,vu=1011,Vs=1012,vl=1013,Li=1014,zi=1015,Zi=1016,Ml=1017,yl=1018,Ws=1020,Mu=35902,yu=35899,Su=1021,Eu=1022,_i=1023,Qi=1026,Rn=1027,bu=1028,Sl=1029,Nn=1030,El=1031,bl=1033,Aa=33776,za=33777,wa=33778,Ra=33779,xo=35840,go=35841,_o=35842,vo=35843,Mo=36196,yo=37492,So=37496,Eo=37488,bo=37489,Ba=37490,To=37491,Ao=37808,zo=37809,wo=37810,Ro=37811,Co=37812,Po=37813,Do=37814,Io=37815,Lo=37816,No=37817,Uo=37818,Fo=37819,Oo=37820,Bo=37821,Go=36492,Ho=36494,ko=36495,Vo=36283,Wo=36284,Ga=36285,Xo=36286,wp=3200,qo=0,Rp=1,dn="",jt="srgb",Ha="srgb-linear",ka="linear",it="srgb",kn=7680,Ic=519,Cp=512,Pp=513,Dp=514,Tl=515,Ip=516,Lp=517,Al=518,Np=519,Lc=35044,Nc="300 es",wi=2e3,Xs=2001;function Up(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Va(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Fp(){const i=Va("canvas");return i.style.display="block",i}const Uc={};function Fc(...i){const e="THREE."+i.shift();console.log(e,...i)}function Tu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ne(...i){i=Tu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function $e(...i){i=Tu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function os(...i){const e=i.join(" ");e in Uc||(Uc[e]=!0,Ne(...i))}function Op(i,e,t){return new Promise(function(n,s){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}const Bp={[ro]:oo,[lo]:ho,[co]:fo,[hs]:uo,[oo]:ro,[ho]:lo,[fo]:co,[uo]:hs};class gn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Oc=1234567;const Ls=Math.PI/180,qs=180/Math.PI;function gs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]).toLowerCase()}function We(i,e,t){return Math.max(e,Math.min(t,i))}function zl(i,e){return(i%e+e)%e}function Gp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Hp(i,e,t){return i!==e?(t-i)/(e-i):0}function Ns(i,e,t){return(1-t)*i+t*e}function kp(i,e,t,n){return Ns(i,e,1-Math.exp(-t*n))}function Vp(i,e=1){return e-Math.abs(zl(i,e*2)-e)}function Wp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Xp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function qp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Yp(i,e){return i+Math.random()*(e-i)}function Kp(i){return i*(.5-Math.random())}function $p(i){i!==void 0&&(Oc=i);let e=Oc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Jp(i){return i*Ls}function Zp(i){return i*qs}function Qp(i){return(i&i-1)===0&&i!==0}function jp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function em(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function tm(i,e,t,n,s){const a=Math.cos,r=Math.sin,o=a(t/2),c=r(t/2),l=a((e+n)/2),f=r((e+n)/2),u=a((e-n)/2),d=r((e-n)/2),m=a((n-e)/2),g=r((n-e)/2);switch(s){case"XYX":i.set(o*f,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*f,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*f,o*l);break;case"XZX":i.set(o*f,c*g,c*m,o*l);break;case"YXY":i.set(c*m,o*f,c*g,o*l);break;case"ZYZ":i.set(c*g,c*m,o*f,o*l);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function is(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Yo={DEG2RAD:Ls,RAD2DEG:qs,generateUUID:gs,clamp:We,euclideanModulo:zl,mapLinear:Gp,inverseLerp:Hp,lerp:Ns,damp:kp,pingpong:Vp,smoothstep:Wp,smootherstep:Xp,randInt:qp,randFloat:Yp,randFloatSpread:Kp,seededRandom:$p,degToRad:Jp,radToDeg:Zp,isPowerOfTwo:Qp,ceilPowerOfTwo:jp,floorPowerOfTwo:em,setQuaternionFromProperEuler:tm,normalize:Wt,denormalize:is},Vl=class Vl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*n-r*s+e.x,this.y=a*s+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Vl.prototype.isVector2=!0;let Ue=Vl;class mn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,a,r,o){let c=n[s+0],l=n[s+1],f=n[s+2],u=n[s+3],d=a[r+0],m=a[r+1],g=a[r+2],M=a[r+3];if(u!==M||c!==d||l!==m||f!==g){let p=c*d+l*m+f*g+u*M;p<0&&(d=-d,m=-m,g=-g,M=-M,p=-p);let h=1-o;if(p<.9995){const S=Math.acos(p),A=Math.sin(S);h=Math.sin(h*S)/A,o=Math.sin(o*S)/A,c=c*h+d*o,l=l*h+m*o,f=f*h+g*o,u=u*h+M*o}else{c=c*h+d*o,l=l*h+m*o,f=f*h+g*o,u=u*h+M*o;const S=1/Math.sqrt(c*c+l*l+f*f+u*u);c*=S,l*=S,f*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=f,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,a,r){const o=n[s],c=n[s+1],l=n[s+2],f=n[s+3],u=a[r],d=a[r+1],m=a[r+2],g=a[r+3];return e[t]=o*g+f*u+c*m-l*d,e[t+1]=c*g+f*d+l*u-o*m,e[t+2]=l*g+f*m+o*d-c*u,e[t+3]=f*g-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,c=Math.sin,l=o(n/2),f=o(s/2),u=o(a/2),d=c(n/2),m=c(s/2),g=c(a/2);switch(r){case"XYZ":this._x=d*f*u+l*m*g,this._y=l*m*u-d*f*g,this._z=l*f*g+d*m*u,this._w=l*f*u-d*m*g;break;case"YXZ":this._x=d*f*u+l*m*g,this._y=l*m*u-d*f*g,this._z=l*f*g-d*m*u,this._w=l*f*u+d*m*g;break;case"ZXY":this._x=d*f*u-l*m*g,this._y=l*m*u+d*f*g,this._z=l*f*g+d*m*u,this._w=l*f*u-d*m*g;break;case"ZYX":this._x=d*f*u-l*m*g,this._y=l*m*u+d*f*g,this._z=l*f*g-d*m*u,this._w=l*f*u+d*m*g;break;case"YZX":this._x=d*f*u+l*m*g,this._y=l*m*u+d*f*g,this._z=l*f*g-d*m*u,this._w=l*f*u-d*m*g;break;case"XZY":this._x=d*f*u-l*m*g,this._y=l*m*u-d*f*g,this._z=l*f*g+d*m*u,this._w=l*f*u+d*m*g;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],a=t[8],r=t[1],o=t[5],c=t[9],l=t[2],f=t[6],u=t[10],d=n+o+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(f-c)*m,this._y=(a-l)*m,this._z=(r-s)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(f-c)/m,this._x=.25*m,this._y=(s+r)/m,this._z=(a+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(a-l)/m,this._x=(s+r)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(r-s)/m,this._x=(a+l)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,a=e._z,r=e._w,o=t._x,c=t._y,l=t._z,f=t._w;return this._x=n*f+r*o+s*l-a*c,this._y=s*f+r*c+a*o-n*l,this._z=a*f+r*l+n*c-s*o,this._w=r*f-n*o-s*c-a*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,a=e._z,r=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,a=-a,r=-r,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),f=Math.sin(l);c=Math.sin(c*l)/f,t=Math.sin(t*l)/f,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+a*t,this._w=this._w*c+r*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+a*t,this._w=this._w*c+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Wl=class Wl{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*s,this.y=a[1]*t+a[4]*n+a[7]*s,this.z=a[2]*t+a[5]*n+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*n+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*n+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*n+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,a=e.x,r=e.y,o=e.z,c=e.w,l=2*(r*s-o*n),f=2*(o*t-a*s),u=2*(a*n-r*t);return this.x=t+c*l+r*u-o*f,this.y=n+c*f+o*l-a*u,this.z=s+c*u+a*f-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s,this.y=a[1]*t+a[5]*n+a[9]*s,this.z=a[2]*t+a[6]*n+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,a=e.z,r=t.x,o=t.y,c=t.z;return this.x=s*c-a*o,this.y=a*r-n*c,this.z=n*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return gr.copy(this).projectOnVector(e),this.sub(gr)}reflect(e){return this.sub(gr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Wl.prototype.isVector3=!0;let F=Wl;const gr=new F,Bc=new mn,Xl=class Xl{constructor(e,t,n,s,a,r,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,r,o,c,l)}set(e,t,n,s,a,r,o,c,l){const f=this.elements;return f[0]=e,f[1]=s,f[2]=o,f[3]=t,f[4]=a,f[5]=c,f[6]=n,f[7]=r,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,r=n[0],o=n[3],c=n[6],l=n[1],f=n[4],u=n[7],d=n[2],m=n[5],g=n[8],M=s[0],p=s[3],h=s[6],S=s[1],A=s[4],y=s[7],z=s[2],E=s[5],w=s[8];return a[0]=r*M+o*S+c*z,a[3]=r*p+o*A+c*E,a[6]=r*h+o*y+c*w,a[1]=l*M+f*S+u*z,a[4]=l*p+f*A+u*E,a[7]=l*h+f*y+u*w,a[2]=d*M+m*S+g*z,a[5]=d*p+m*A+g*E,a[8]=d*h+m*y+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],f=e[8];return t*r*f-t*o*l-n*a*f+n*o*c+s*a*l-s*r*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],f=e[8],u=f*r-o*l,d=o*c-f*a,m=l*a-r*c,g=t*u+n*d+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=u*M,e[1]=(s*l-f*n)*M,e[2]=(o*n-s*r)*M,e[3]=d*M,e[4]=(f*t-s*c)*M,e[5]=(s*a-o*t)*M,e[6]=m*M,e[7]=(n*c-l*t)*M,e[8]=(r*t-n*a)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,a,r,o){const c=Math.cos(a),l=Math.sin(a);return this.set(n*c,n*l,-n*(c*r+l*o)+r+e,-s*l,s*c,-s*(-l*r+c*o)+o+t,0,0,1),this}scale(e,t){return os("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_r.makeScale(e,t)),this}rotate(e){return os("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_r.makeRotation(-e)),this}translate(e,t){return os("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Xl.prototype.isMatrix3=!0;let Fe=Xl;const _r=new Fe,Gc=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hc=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function im(){const i={enabled:!0,workingColorSpace:Ha,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===it&&(s.r=Ji(s.r),s.g=Ji(s.g),s.b=Ji(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===it&&(s.r=ls(s.r),s.g=ls(s.g),s.b=ls(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===dn?ka:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ha]:{primaries:e,whitePoint:n,transfer:ka,toXYZ:Gc,fromXYZ:Hc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:Gc,fromXYZ:Hc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),i}const Ke=im();function Ji(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Vn;class nm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vn===void 0&&(Vn=Va("canvas")),Vn.width=e.width,Vn.height=e.height;const s=Vn.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Vn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Va("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Ji(a[r]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ji(t[n]/255)*255):t[n]=Ji(t[n]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sm=0;class wl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=gs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(vr(s[r].image)):a.push(vr(s[r]))}else a=vr(s);n.url=a}return t||(e.images[this.uuid]=n),n}}function vr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}let am=0;const Mr=new F;class kt extends gn{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=qi,s=qi,a=Gt,r=wn,o=_i,c=ei,l=kt.DEFAULT_ANISOTROPY,f=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=gs(),this.name="",this.source=new wl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mr).x}get height(){return this.source.getSize(Mr).y}get depth(){return this.source.getSize(Mr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case po:e.x=e.x-Math.floor(e.x);break;case qi:e.x=e.x<0?0:1;break;case mo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case po:e.y=e.y-Math.floor(e.y);break;case qi:e.y=e.y<0?0:1;break;case mo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=gu;kt.DEFAULT_ANISOTROPY=1;const ql=class ql{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*n+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*n+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*n+r[11]*s+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,a;const c=e.elements,l=c[0],f=c[4],u=c[8],d=c[1],m=c[5],g=c[9],M=c[2],p=c[6],h=c[10];if(Math.abs(f-d)<.01&&Math.abs(u-M)<.01&&Math.abs(g-p)<.01){if(Math.abs(f+d)<.1&&Math.abs(u+M)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(l+1)/2,y=(m+1)/2,z=(h+1)/2,E=(f+d)/4,w=(u+M)/4,_=(g+p)/4;return A>y&&A>z?A<.01?(n=0,s=.707106781,a=.707106781):(n=Math.sqrt(A),s=E/n,a=w/n):y>z?y<.01?(n=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),n=E/s,a=_/s):z<.01?(n=.707106781,s=.707106781,a=0):(a=Math.sqrt(z),n=w/a,s=_/a),this.set(n,s,a,t),this}let S=Math.sqrt((p-g)*(p-g)+(u-M)*(u-M)+(d-f)*(d-f));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(u-M)/S,this.z=(d-f)/S,this.w=Math.acos((l+m+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ql.prototype.isVector4=!0;let pt=ql;class rm extends gn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},a=new kt(s),r=n.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new wl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pi extends rm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Au extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class om extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xa=class Xa{constructor(e,t,n,s,a,r,o,c,l,f,u,d,m,g,M,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,r,o,c,l,f,u,d,m,g,M,p)}set(e,t,n,s,a,r,o,c,l,f,u,d,m,g,M,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=s,h[1]=a,h[5]=r,h[9]=o,h[13]=c,h[2]=l,h[6]=f,h[10]=u,h[14]=d,h[3]=m,h[7]=g,h[11]=M,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xa().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Wn.setFromMatrixColumn(e,0).length(),a=1/Wn.setFromMatrixColumn(e,1).length(),r=1/Wn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,a=e.z,r=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),f=Math.cos(a),u=Math.sin(a);if(e.order==="XYZ"){const d=r*f,m=r*u,g=o*f,M=o*u;t[0]=c*f,t[4]=-c*u,t[8]=l,t[1]=m+g*l,t[5]=d-M*l,t[9]=-o*c,t[2]=M-d*l,t[6]=g+m*l,t[10]=r*c}else if(e.order==="YXZ"){const d=c*f,m=c*u,g=l*f,M=l*u;t[0]=d+M*o,t[4]=g*o-m,t[8]=r*l,t[1]=r*u,t[5]=r*f,t[9]=-o,t[2]=m*o-g,t[6]=M+d*o,t[10]=r*c}else if(e.order==="ZXY"){const d=c*f,m=c*u,g=l*f,M=l*u;t[0]=d-M*o,t[4]=-r*u,t[8]=g+m*o,t[1]=m+g*o,t[5]=r*f,t[9]=M-d*o,t[2]=-r*l,t[6]=o,t[10]=r*c}else if(e.order==="ZYX"){const d=r*f,m=r*u,g=o*f,M=o*u;t[0]=c*f,t[4]=g*l-m,t[8]=d*l+M,t[1]=c*u,t[5]=M*l+d,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=r*c}else if(e.order==="YZX"){const d=r*c,m=r*l,g=o*c,M=o*l;t[0]=c*f,t[4]=M-d*u,t[8]=g*u+m,t[1]=u,t[5]=r*f,t[9]=-o*f,t[2]=-l*f,t[6]=m*u+g,t[10]=d-M*u}else if(e.order==="XZY"){const d=r*c,m=r*l,g=o*c,M=o*l;t[0]=c*f,t[4]=-u,t[8]=l*f,t[1]=d*u+M,t[5]=r*f,t[9]=m*u-g,t[2]=g*u-m,t[6]=o*f,t[10]=M*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lm,e,cm)}lookAt(e,t,n){const s=this.elements;return Jt.subVectors(e,t),Jt.lengthSq()===0&&(Jt.z=1),Jt.normalize(),nn.crossVectors(n,Jt),nn.lengthSq()===0&&(Math.abs(n.z)===1?Jt.x+=1e-4:Jt.z+=1e-4,Jt.normalize(),nn.crossVectors(n,Jt)),nn.normalize(),ia.crossVectors(Jt,nn),s[0]=nn.x,s[4]=ia.x,s[8]=Jt.x,s[1]=nn.y,s[5]=ia.y,s[9]=Jt.y,s[2]=nn.z,s[6]=ia.z,s[10]=Jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,r=n[0],o=n[4],c=n[8],l=n[12],f=n[1],u=n[5],d=n[9],m=n[13],g=n[2],M=n[6],p=n[10],h=n[14],S=n[3],A=n[7],y=n[11],z=n[15],E=s[0],w=s[4],_=s[8],T=s[12],P=s[1],C=s[5],L=s[9],q=s[13],Y=s[2],B=s[6],K=s[10],X=s[14],ee=s[3],ie=s[7],pe=s[11],_e=s[15];return a[0]=r*E+o*P+c*Y+l*ee,a[4]=r*w+o*C+c*B+l*ie,a[8]=r*_+o*L+c*K+l*pe,a[12]=r*T+o*q+c*X+l*_e,a[1]=f*E+u*P+d*Y+m*ee,a[5]=f*w+u*C+d*B+m*ie,a[9]=f*_+u*L+d*K+m*pe,a[13]=f*T+u*q+d*X+m*_e,a[2]=g*E+M*P+p*Y+h*ee,a[6]=g*w+M*C+p*B+h*ie,a[10]=g*_+M*L+p*K+h*pe,a[14]=g*T+M*q+p*X+h*_e,a[3]=S*E+A*P+y*Y+z*ee,a[7]=S*w+A*C+y*B+z*ie,a[11]=S*_+A*L+y*K+z*pe,a[15]=S*T+A*q+y*X+z*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],a=e[12],r=e[1],o=e[5],c=e[9],l=e[13],f=e[2],u=e[6],d=e[10],m=e[14],g=e[3],M=e[7],p=e[11],h=e[15],S=c*m-l*d,A=o*m-l*u,y=o*d-c*u,z=r*m-l*f,E=r*d-c*f,w=r*u-o*f;return t*(M*S-p*A+h*y)-n*(g*S-p*z+h*E)+s*(g*A-M*z+h*w)-a*(g*y-M*E+p*w)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],a=e[1],r=e[5],o=e[9],c=e[2],l=e[6],f=e[10];return t*(r*f-o*l)-n*(a*f-o*c)+s*(a*l-r*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],f=e[8],u=e[9],d=e[10],m=e[11],g=e[12],M=e[13],p=e[14],h=e[15],S=t*o-n*r,A=t*c-s*r,y=t*l-a*r,z=n*c-s*o,E=n*l-a*o,w=s*l-a*c,_=f*M-u*g,T=f*p-d*g,P=f*h-m*g,C=u*p-d*M,L=u*h-m*M,q=d*h-m*p,Y=S*q-A*L+y*C+z*P-E*T+w*_;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/Y;return e[0]=(o*q-c*L+l*C)*B,e[1]=(s*L-n*q-a*C)*B,e[2]=(M*w-p*E+h*z)*B,e[3]=(d*E-u*w-m*z)*B,e[4]=(c*P-r*q-l*T)*B,e[5]=(t*q-s*P+a*T)*B,e[6]=(p*y-g*w-h*A)*B,e[7]=(f*w-d*y+m*A)*B,e[8]=(r*L-o*P+l*_)*B,e[9]=(n*P-t*L-a*_)*B,e[10]=(g*E-M*y+h*S)*B,e[11]=(u*y-f*E-m*S)*B,e[12]=(o*T-r*C-c*_)*B,e[13]=(t*C-n*T+s*_)*B,e[14]=(M*A-g*z-p*S)*B,e[15]=(f*z-u*A+d*S)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,a=e.z;return t[0]*=n,t[4]*=s,t[8]*=a,t[1]*=n,t[5]*=s,t[9]*=a,t[2]*=n,t[6]*=s,t[10]*=a,t[3]*=n,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),a=1-n,r=e.x,o=e.y,c=e.z,l=a*r,f=a*o;return this.set(l*r+n,l*o-s*c,l*c+s*o,0,l*o+s*c,f*o+n,f*c-s*r,0,l*c-s*o,f*c+s*r,a*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,a,r){return this.set(1,n,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,a=t._x,r=t._y,o=t._z,c=t._w,l=a+a,f=r+r,u=o+o,d=a*l,m=a*f,g=a*u,M=r*f,p=r*u,h=o*u,S=c*l,A=c*f,y=c*u,z=n.x,E=n.y,w=n.z;return s[0]=(1-(M+h))*z,s[1]=(m+y)*z,s[2]=(g-A)*z,s[3]=0,s[4]=(m-y)*E,s[5]=(1-(d+h))*E,s[6]=(p+S)*E,s[7]=0,s[8]=(g+A)*w,s[9]=(p-S)*w,s[10]=(1-(d+M))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const a=this.determinantAffine();if(a===0)return n.set(1,1,1),t.identity(),this;let r=Wn.set(s[0],s[1],s[2]).length();const o=Wn.set(s[4],s[5],s[6]).length(),c=Wn.set(s[8],s[9],s[10]).length();a<0&&(r=-r),hi.copy(this);const l=1/r,f=1/o,u=1/c;return hi.elements[0]*=l,hi.elements[1]*=l,hi.elements[2]*=l,hi.elements[4]*=f,hi.elements[5]*=f,hi.elements[6]*=f,hi.elements[8]*=u,hi.elements[9]*=u,hi.elements[10]*=u,t.setFromRotationMatrix(hi),n.x=r,n.y=o,n.z=c,this}makePerspective(e,t,n,s,a,r,o=wi,c=!1){const l=this.elements,f=2*a/(t-e),u=2*a/(n-s),d=(t+e)/(t-e),m=(n+s)/(n-s);let g,M;if(c)g=a/(r-a),M=r*a/(r-a);else if(o===wi)g=-(r+a)/(r-a),M=-2*r*a/(r-a);else if(o===Xs)g=-r/(r-a),M=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,a,r,o=wi,c=!1){const l=this.elements,f=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),m=-(n+s)/(n-s);let g,M;if(c)g=1/(r-a),M=r/(r-a);else if(o===wi)g=-2/(r-a),M=-(r+a)/(r-a);else if(o===Xs)g=-1/(r-a),M=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Xa.prototype.isMatrix4=!0;let mt=Xa;const Wn=new F,hi=new mt,lm=new F(0,0,0),cm=new F(1,1,1),nn=new F,ia=new F,Jt=new F,kc=new mt,Vc=new mn;class xn{constructor(e=0,t=0,n=0,s=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],c=s[1],l=s[5],f=s[9],u=s[2],d=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-We(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-f,m),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return kc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vc.setFromEuler(this),this.setFromQuaternion(Vc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class Rl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dm=0;const Wc=new F,Xn=new mn,Oi=new mt,na=new F,Es=new F,um=new F,hm=new mn,Xc=new F(1,0,0),qc=new F(0,1,0),Yc=new F(0,0,1),Kc={type:"added"},fm={type:"removed"},qn={type:"childadded",child:null},yr={type:"childremoved",child:null};class Dt extends gn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=gs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dt.DEFAULT_UP.clone();const e=new F,t=new xn,n=new mn,s=new F(1,1,1);function a(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new Fe}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xn.setFromAxisAngle(e,t),this.quaternion.multiply(Xn),this}rotateOnWorldAxis(e,t){return Xn.setFromAxisAngle(e,t),this.quaternion.premultiply(Xn),this}rotateX(e){return this.rotateOnAxis(Xc,e)}rotateY(e){return this.rotateOnAxis(qc,e)}rotateZ(e){return this.rotateOnAxis(Yc,e)}translateOnAxis(e,t){return Wc.copy(e).applyQuaternion(this.quaternion),this.position.add(Wc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xc,e)}translateY(e){return this.translateOnAxis(qc,e)}translateZ(e){return this.translateOnAxis(Yc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?na.copy(e):na.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(Es,na,this.up):Oi.lookAt(na,Es,this.up),this.quaternion.setFromRotationMatrix(Oi),s&&(Oi.extractRotation(s.matrixWorld),Xn.setFromRotationMatrix(Oi),this.quaternion.premultiply(Xn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kc),qn.child=e,this.dispatchEvent(qn),qn.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(fm),yr.child=e,this.dispatchEvent(yr),yr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kc),qn.child=e,this.dispatchEvent(qn),qn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,e,um),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,hm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*n-a[8]*s,a[13]+=n-a[1]*t-a[5]*n-a[9]*s,a[14]+=s-a[2]*t-a[6]*n-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const u=c[l];a(e.shapes,u)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(a(e.animations,c))}}if(t){const o=r(e.geometries),c=r(e.materials),l=r(e.textures),f=r(e.images),u=r(e.shapes),d=r(e.skeletons),m=r(e.animations),g=r(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),f.length>0&&(n.images=f),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(o){const c=[];for(const l in o){const f=o[l];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Dt.DEFAULT_UP=new F(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ns extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pm={type:"move"};class Sr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ns,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ns,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ns,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,a=null,r=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(const M of e.hand.values()){const p=t.getJointPose(M,n),h=this._getHandJoint(l,M);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const f=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=f.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&d>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pm)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ns;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const zu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},sn={h:0,s:0,l:0},sa={h:0,s:0,l:0};function Er(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=zl(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,r=2*n-a;this.r=Er(r,a,e+1/3),this.g=Er(r,a,e),this.b=Er(r,a,e-1/3)}return Ke.colorSpaceToWorking(this,s),this}setStyle(e,t=jt){function n(a){a!==void 0&&parseFloat(a)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=zu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return Ke.workingToColorSpace(Ut.copy(this),e),Math.round(We(Ut.r*255,0,255))*65536+Math.round(We(Ut.g*255,0,255))*256+Math.round(We(Ut.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Ut.copy(this),t);const n=Ut.r,s=Ut.g,a=Ut.b,r=Math.max(n,s,a),o=Math.min(n,s,a);let c,l;const f=(o+r)/2;if(o===r)c=0,l=0;else{const u=r-o;switch(l=f<=.5?u/(r+o):u/(2-r-o),r){case n:c=(s-a)/u+(s<a?6:0);break;case s:c=(a-n)/u+2;break;case a:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=f,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=jt){Ke.workingToColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,s=Ut.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(sn),this.setHSL(sn.h+e,sn.s+t,sn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(sn),e.getHSL(sa);const n=Ns(sn.h,sa.h,t),s=Ns(sn.s,sa.s,t),a=Ns(sn.l,sa.l,t);return this.setHSL(n,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*s,this.g=a[1]*t+a[4]*n+a[7]*s,this.b=a[2]*t+a[5]*n+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new Ye;Ye.NAMES=zu;class mm extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const fi=new F,Bi=new F,br=new F,Gi=new F,Yn=new F,Kn=new F,$c=new F,Tr=new F,Ar=new F,zr=new F,wr=new pt,Rr=new pt,Cr=new pt;class gi{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),fi.subVectors(e,t),s.cross(fi);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,n,s,a){fi.subVectors(s,t),Bi.subVectors(n,t),br.subVectors(e,t);const r=fi.dot(fi),o=fi.dot(Bi),c=fi.dot(br),l=Bi.dot(Bi),f=Bi.dot(br),u=r*l-o*o;if(u===0)return a.set(0,0,0),null;const d=1/u,m=(l*c-o*f)*d,g=(r*f-o*c)*d;return a.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Gi)===null?!1:Gi.x>=0&&Gi.y>=0&&Gi.x+Gi.y<=1}static getInterpolation(e,t,n,s,a,r,o,c){return this.getBarycoord(e,t,n,s,Gi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Gi.x),c.addScaledVector(r,Gi.y),c.addScaledVector(o,Gi.z),c)}static getInterpolatedAttribute(e,t,n,s,a,r){return wr.setScalar(0),Rr.setScalar(0),Cr.setScalar(0),wr.fromBufferAttribute(e,t),Rr.fromBufferAttribute(e,n),Cr.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(wr,a.x),r.addScaledVector(Rr,a.y),r.addScaledVector(Cr,a.z),r}static isFrontFacing(e,t,n,s){return fi.subVectors(n,t),Bi.subVectors(e,t),fi.cross(Bi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),Bi.subVectors(this.a,this.b),fi.cross(Bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,a){return gi.getInterpolation(e,this.a,this.b,this.c,t,n,s,a)}containsPoint(e){return gi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,a=this.c;let r,o;Yn.subVectors(s,n),Kn.subVectors(a,n),Tr.subVectors(e,n);const c=Yn.dot(Tr),l=Kn.dot(Tr);if(c<=0&&l<=0)return t.copy(n);Ar.subVectors(e,s);const f=Yn.dot(Ar),u=Kn.dot(Ar);if(f>=0&&u<=f)return t.copy(s);const d=c*u-f*l;if(d<=0&&c>=0&&f<=0)return r=c/(c-f),t.copy(n).addScaledVector(Yn,r);zr.subVectors(e,a);const m=Yn.dot(zr),g=Kn.dot(zr);if(g>=0&&m<=g)return t.copy(a);const M=m*l-c*g;if(M<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Kn,o);const p=f*g-m*u;if(p<=0&&u-f>=0&&m-g>=0)return $c.subVectors(a,s),o=(u-f)/(u-f+(m-g)),t.copy(s).addScaledVector($c,o);const h=1/(p+M+d);return r=M*h,o=d*h,t.copy(n).addScaledVector(Yn,r).addScaledVector(Kn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class $s{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,pi):pi.fromBufferAttribute(a,r),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),aa.copy(n.boundingBox)),aa.applyMatrix4(e.matrixWorld),this.union(aa)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bs),ra.subVectors(this.max,bs),$n.subVectors(e.a,bs),Jn.subVectors(e.b,bs),Zn.subVectors(e.c,bs),an.subVectors(Jn,$n),rn.subVectors(Zn,Jn),Mn.subVectors($n,Zn);let t=[0,-an.z,an.y,0,-rn.z,rn.y,0,-Mn.z,Mn.y,an.z,0,-an.x,rn.z,0,-rn.x,Mn.z,0,-Mn.x,-an.y,an.x,0,-rn.y,rn.x,0,-Mn.y,Mn.x,0];return!Pr(t,$n,Jn,Zn,ra)||(t=[1,0,0,0,1,0,0,0,1],!Pr(t,$n,Jn,Zn,ra))?!1:(oa.crossVectors(an,rn),t=[oa.x,oa.y,oa.z],Pr(t,$n,Jn,Zn,ra))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Hi=[new F,new F,new F,new F,new F,new F,new F,new F],pi=new F,aa=new $s,$n=new F,Jn=new F,Zn=new F,an=new F,rn=new F,Mn=new F,bs=new F,ra=new F,oa=new F,yn=new F;function Pr(i,e,t,n,s){for(let a=0,r=i.length-3;a<=r;a+=3){yn.fromArray(i,a);const o=s.x*Math.abs(yn.x)+s.y*Math.abs(yn.y)+s.z*Math.abs(yn.z),c=e.dot(yn),l=t.dot(yn),f=n.dot(yn);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>o)return!1}return!0}const St=new F,la=new Ue;let xm=0;class Di extends gn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Lc,this.updateRanges=[],this.gpuType=zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)la.fromBufferAttribute(this,t),la.applyMatrix3(e),this.setXY(t,la.x,la.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=is(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=is(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=is(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=is(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=is(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,a){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array),a=Wt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Lc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class wu extends Di{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ru extends Di{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class li extends Di{constructor(e,t,n){super(new Float32Array(e),t,n)}}const gm=new $s,Ts=new F,Dr=new F;class Cl{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):gm.setFromPoints(e).getCenter(n);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ts.subVectors(e,this.center);const t=Ts.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ts,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ts.copy(e.center).add(Dr)),this.expandByPoint(Ts.copy(e.center).sub(Dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let _m=0;const si=new mt,Ir=new Dt,Qn=new F,Zt=new $s,As=new $s,wt=new F;class Ui extends gn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=gs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Up(e)?Ru:wu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Fe().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return si.makeRotationFromQuaternion(e),this.applyMatrix4(si),this}rotateX(e){return si.makeRotationX(e),this.applyMatrix4(si),this}rotateY(e){return si.makeRotationY(e),this.applyMatrix4(si),this}rotateZ(e){return si.makeRotationZ(e),this.applyMatrix4(si),this}translate(e,t,n){return si.makeTranslation(e,t,n),this.applyMatrix4(si),this}scale(e,t,n){return si.makeScale(e,t,n),this.applyMatrix4(si),this}lookAt(e){return Ir.lookAt(e),Ir.updateMatrix(),this.applyMatrix4(Ir.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qn).negate(),this.translate(Qn.x,Qn.y,Qn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,a=e.length;s<a;s++){const r=e[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new li(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $s);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const a=t[n];Zt.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];As.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(Zt.min,As.min),Zt.expandByPoint(wt),wt.addVectors(Zt.max,As.max),Zt.expandByPoint(wt)):(Zt.expandByPoint(As.min),Zt.expandByPoint(As.max))}Zt.getCenter(n);let s=0;for(let a=0,r=e.count;a<r;a++)wt.fromBufferAttribute(e,a),s=Math.max(s,n.distanceToSquared(wt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,f=o.count;l<f;l++)wt.fromBufferAttribute(o,l),c&&(Qn.fromBufferAttribute(e,l),wt.add(Qn)),s=Math.max(s,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,a=t.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==n.count)&&(r=new Di(new Float32Array(4*n.count),4),this.setAttribute("tangent",r));const o=[],c=[];for(let _=0;_<n.count;_++)o[_]=new F,c[_]=new F;const l=new F,f=new F,u=new F,d=new Ue,m=new Ue,g=new Ue,M=new F,p=new F;function h(_,T,P){l.fromBufferAttribute(n,_),f.fromBufferAttribute(n,T),u.fromBufferAttribute(n,P),d.fromBufferAttribute(a,_),m.fromBufferAttribute(a,T),g.fromBufferAttribute(a,P),f.sub(l),u.sub(l),m.sub(d),g.sub(d);const C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(M.copy(f).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(C),p.copy(u).multiplyScalar(m.x).addScaledVector(f,-g.x).multiplyScalar(C),o[_].add(M),o[T].add(M),o[P].add(M),c[_].add(p),c[T].add(p),c[P].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let _=0,T=S.length;_<T;++_){const P=S[_],C=P.start,L=P.count;for(let q=C,Y=C+L;q<Y;q+=3)h(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const A=new F,y=new F,z=new F,E=new F;function w(_){z.fromBufferAttribute(s,_),E.copy(z);const T=o[_];A.copy(T),A.sub(z.multiplyScalar(z.dot(T))).normalize(),y.crossVectors(E,T);const C=y.dot(c[_])<0?-1:1;r.setXYZW(_,A.x,A.y,A.z,C)}for(let _=0,T=S.length;_<T;++_){const P=S[_],C=P.start,L=P.count;for(let q=C,Y=C+L;q<Y;q+=3)w(e.getX(q+0)),w(e.getX(q+1)),w(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Di(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const s=new F,a=new F,r=new F,o=new F,c=new F,l=new F,f=new F,u=new F;if(e)for(let d=0,m=e.count;d<m;d+=3){const g=e.getX(d+0),M=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,M),r.fromBufferAttribute(t,p),f.subVectors(r,a),u.subVectors(s,a),f.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,p),o.add(f),c.add(f),l.add(f),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)s.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),f.subVectors(r,a),u.subVectors(s,a),f.cross(u),n.setXYZ(d+0,f.x,f.y,f.z),n.setXYZ(d+1,f.x,f.y,f.z),n.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(o,c){const l=o.array,f=o.itemSize,u=o.normalized,d=new l.constructor(c.length*f);let m=0,g=0;for(let M=0,p=c.length;M<p;M++){o.isInterleavedBufferAttribute?m=c[M]*o.data.stride+o.offset:m=c[M]*f;for(let h=0;h<f;h++)d[g++]=l[m++]}return new Di(d,f,u)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ui,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let f=0,u=l.length;f<u;f++){const d=l[f],m=e(d,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,c=r.length;o<c;o++){const l=r[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let u=0,d=l.length;u<d;u++){const m=l[u];f.push(m.toJSON(e.data))}f.length>0&&(s[c]=f,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const f=s[l];this.setAttribute(l,f.clone(t))}const a=e.morphAttributes;for(const l in a){const f=[],u=a[l];for(let d=0,m=u.length;d<m;d++)f.push(u[d].clone(t));this.morphAttributes[l]=f}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let l=0,f=r.length;l<f;l++){const u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let vm=0;class _s extends gn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=gs(),this.name="",this.type="Material",this.blending=rs,this.side=pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ao,this.blendEquation=Tn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ic,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=kn,this.stencilZFail=kn,this.stencilZPass=kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rs&&(n.blending=this.blending),this.side!==pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==so&&(n.blendSrc=this.blendSrc),this.blendDst!==ao&&(n.blendDst=this.blendDst),this.blendEquation!==Tn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ic&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==kn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==kn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==kn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(a){const r=[];for(const o in a){const c=a[o];delete c.metadata,r.push(c)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ue().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let a=0;a!==s;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ki=new F,Lr=new F,ca=new F,on=new F,Nr=new F,da=new F,Ur=new F;class Pl{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ki)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ki.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ki.copy(this.origin).addScaledVector(this.direction,t),ki.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Lr.copy(e).add(t).multiplyScalar(.5),ca.copy(t).sub(e).normalize(),on.copy(this.origin).sub(Lr);const a=e.distanceTo(t)*.5,r=-this.direction.dot(ca),o=on.dot(this.direction),c=-on.dot(ca),l=on.lengthSq(),f=Math.abs(1-r*r);let u,d,m,g;if(f>0)if(u=r*c-o,d=r*o-c,g=a*f,u>=0)if(d>=-g)if(d<=g){const M=1/f;u*=M,d*=M,m=u*(u+r*d+2*o)+d*(r*u+d+2*c)+l}else d=a,u=Math.max(0,-(r*d+o)),m=-u*u+d*(d+2*c)+l;else d=-a,u=Math.max(0,-(r*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-r*a+o)),d=u>0?-a:Math.min(Math.max(-a,-c),a),m=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-a,-c),a),m=d*(d+2*c)+l):(u=Math.max(0,-(r*a+o)),d=u>0?a:Math.min(Math.max(-a,-c),a),m=-u*u+d*(d+2*c)+l);else d=r>0?-a:a,u=Math.max(0,-(r*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Lr).addScaledVector(ca,d),m}intersectSphere(e,t){ki.subVectors(e.center,this.origin);const n=ki.dot(this.direction),s=ki.dot(ki)-n*n,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=n-r,c=n+r;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,a,r,o,c;const l=1/this.direction.x,f=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),f>=0?(a=(e.min.y-d.y)*f,r=(e.max.y-d.y)*f):(a=(e.max.y-d.y)*f,r=(e.min.y-d.y)*f),n>r||a>s||((a>n||isNaN(n))&&(n=a),(r<s||isNaN(s))&&(s=r),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ki)!==null}intersectTriangle(e,t,n,s,a){Nr.subVectors(t,e),da.subVectors(n,e),Ur.crossVectors(Nr,da);let r=this.direction.dot(Ur),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;on.subVectors(this.origin,e);const c=o*this.direction.dot(da.crossVectors(on,da));if(c<0)return null;const l=o*this.direction.dot(Nr.cross(on));if(l<0||c+l>r)return null;const f=-o*on.dot(Ur);return f<0?null:this.at(f/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wa extends _s{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=du,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jc=new mt,Sn=new Pl,ua=new Cl,Zc=new F,ha=new F,fa=new F,pa=new F,Fr=new F,ma=new F,Qc=new F,xa=new F;class vi extends Dt{constructor(e=new Ui,t=new Wa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){ma.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const f=o[c],u=a[c];f!==0&&(Fr.fromBufferAttribute(u,e),r?ma.addScaledVector(Fr,f):ma.addScaledVector(Fr.sub(t),f))}t.add(ma)}return t}raycast(e,t){const n=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(a),Sn.copy(e.ray).recast(e.near),!(ua.containsPoint(Sn.origin)===!1&&(Sn.intersectSphere(ua,Zc)===null||Sn.origin.distanceToSquared(Zc)>(e.far-e.near)**2))&&(Jc.copy(a).invert(),Sn.copy(e.ray).applyMatrix4(Jc),!(n.boundingBox!==null&&Sn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Sn)))}_computeIntersections(e,t,n){let s;const a=this.geometry,r=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,f=a.attributes.uv1,u=a.attributes.normal,d=a.groups,m=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,M=d.length;g<M;g++){const p=d[g],h=r[p.materialIndex],S=Math.max(p.start,m.start),A=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=S,z=A;y<z;y+=3){const E=o.getX(y),w=o.getX(y+1),_=o.getX(y+2);s=ga(this,h,e,n,l,f,u,E,w,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let p=g,h=M;p<h;p+=3){const S=o.getX(p),A=o.getX(p+1),y=o.getX(p+2);s=ga(this,r,e,n,l,f,u,S,A,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,M=d.length;g<M;g++){const p=d[g],h=r[p.materialIndex],S=Math.max(p.start,m.start),A=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=S,z=A;y<z;y+=3){const E=y,w=y+1,_=y+2;s=ga(this,h,e,n,l,f,u,E,w,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let p=g,h=M;p<h;p+=3){const S=p,A=p+1,y=p+2;s=ga(this,r,e,n,l,f,u,S,A,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Mm(i,e,t,n,s,a,r,o){let c;if(e.side===Kt?c=n.intersectTriangle(r,a,s,!0,o):c=n.intersectTriangle(s,a,r,e.side===pn,o),c===null)return null;xa.copy(o),xa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(xa);return l<t.near||l>t.far?null:{distance:l,point:xa.clone(),object:i}}function ga(i,e,t,n,s,a,r,o,c,l){i.getVertexPosition(o,ha),i.getVertexPosition(c,fa),i.getVertexPosition(l,pa);const f=Mm(i,e,t,n,ha,fa,pa,Qc);if(f){const u=new F;gi.getBarycoord(Qc,ha,fa,pa,u),s&&(f.uv=gi.getInterpolatedAttribute(s,o,c,l,u,new Ue)),a&&(f.uv1=gi.getInterpolatedAttribute(a,o,c,l,u,new Ue)),r&&(f.normal=gi.getInterpolatedAttribute(r,o,c,l,u,new F),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new F,materialIndex:0};gi.getNormal(ha,fa,pa,d.normal),f.face=d,f.barycoord=u}return f}class ym extends kt{constructor(e=null,t=1,n=1,s,a,r,o,c,l=Pt,f=Pt,u,d){super(null,r,o,c,l,f,s,a,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Or=new F,Sm=new F,Em=new Fe;class Wi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Or.subVectors(n,t).cross(Sm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Or),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return n===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(s,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Em.getNormalMatrix(e),s=this.coplanarPoint(Or).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const En=new Cl,bm=new Ue(.5,.5),_a=new F;class Dl{constructor(e=new Wi,t=new Wi,n=new Wi,s=new Wi,a=new Wi,r=new Wi){this.planes=[e,t,n,s,a,r]}set(e,t,n,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wi,n=!1){const s=this.planes,a=e.elements,r=a[0],o=a[1],c=a[2],l=a[3],f=a[4],u=a[5],d=a[6],m=a[7],g=a[8],M=a[9],p=a[10],h=a[11],S=a[12],A=a[13],y=a[14],z=a[15];if(s[0].setComponents(l-r,m-f,h-g,z-S).normalize(),s[1].setComponents(l+r,m+f,h+g,z+S).normalize(),s[2].setComponents(l+o,m+u,h+M,z+A).normalize(),s[3].setComponents(l-o,m-u,h-M,z-A).normalize(),n)s[4].setComponents(c,d,p,y).normalize(),s[5].setComponents(l-c,m-d,h-p,z-y).normalize();else if(s[4].setComponents(l-c,m-d,h-p,z-y).normalize(),t===wi)s[5].setComponents(l+c,m+d,h+p,z+y).normalize();else if(t===Xs)s[5].setComponents(c,d,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),En.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),En.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(En)}intersectsSprite(e){En.center.set(0,0,0);const t=bm.distanceTo(e.center);return En.radius=.7071067811865476+t,En.applyMatrix4(e.matrixWorld),this.intersectsSphere(En)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(_a.x=s.normal.x>0?e.max.x:e.min.x,_a.y=s.normal.y>0?e.max.y:e.min.y,_a.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(_a)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cu extends kt{constructor(e=[],t=Ln,n,s,a,r,o,c,l,f){super(e,t,n,s,a,r,o,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Tm extends kt{constructor(e,t,n,s,a,r,o,c,l){super(e,t,n,s,a,r,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ps extends kt{constructor(e,t,n=Li,s,a,r,o=Pt,c=Pt,l,f=Qi,u=1){if(f!==Qi&&f!==Rn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,a,r,o,c,f,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Am extends ps{constructor(e,t=Li,n=Ln,s,a,r=Pt,o=Pt,c,l=Qi){const f={width:e,height:e,depth:1},u=[f,f,f,f,f,f];super(e,e,t,n,s,a,r,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Pu extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vs extends Ui{constructor(e=1,t=1,n=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const c=[],l=[],f=[],u=[];let d=0,m=0;g("z","y","x",-1,-1,n,t,e,r,a,0),g("z","y","x",1,-1,n,t,-e,r,a,1),g("x","z","y",1,1,e,n,t,s,r,2),g("x","z","y",1,-1,e,n,-t,s,r,3),g("x","y","z",1,-1,e,t,n,s,a,4),g("x","y","z",-1,-1,e,t,-n,s,a,5),this.setIndex(c),this.setAttribute("position",new li(l,3)),this.setAttribute("normal",new li(f,3)),this.setAttribute("uv",new li(u,2));function g(M,p,h,S,A,y,z,E,w,_,T){const P=y/w,C=z/_,L=y/2,q=z/2,Y=E/2,B=w+1,K=_+1;let X=0,ee=0;const ie=new F;for(let pe=0;pe<K;pe++){const _e=pe*C-q;for(let Ee=0;Ee<B;Ee++){const Je=Ee*P-L;ie[M]=Je*S,ie[p]=_e*A,ie[h]=Y,l.push(ie.x,ie.y,ie.z),ie[M]=0,ie[p]=0,ie[h]=E>0?1:-1,f.push(ie.x,ie.y,ie.z),u.push(Ee/w),u.push(1-pe/_),X+=1}}for(let pe=0;pe<_;pe++)for(let _e=0;_e<w;_e++){const Ee=d+_e+B*pe,Je=d+_e+B*(pe+1),ht=d+(_e+1)+B*(pe+1),Xe=d+(_e+1)+B*pe;c.push(Ee,Je,Xe),c.push(Je,ht,Xe),ee+=6}o.addGroup(m,ee,T),m+=ee,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Us extends Ui{constructor(e=1,t=1,n=1,s=32,a=1,r=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),a=Math.floor(a);const f=[],u=[],d=[],m=[];let g=0;const M=[],p=n/2;let h=0;S(),r===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(f),this.setAttribute("position",new li(u,3)),this.setAttribute("normal",new li(d,3)),this.setAttribute("uv",new li(m,2));function S(){const y=new F,z=new F;let E=0;const w=(t-e)/n;for(let _=0;_<=a;_++){const T=[],P=_/a,C=P*(t-e)+e;for(let L=0;L<=s;L++){const q=L/s,Y=q*c+o,B=Math.sin(Y),K=Math.cos(Y);z.x=C*B,z.y=-P*n+p,z.z=C*K,u.push(z.x,z.y,z.z),y.set(B,w,K).normalize(),d.push(y.x,y.y,y.z),m.push(q,1-P),T.push(g++)}M.push(T)}for(let _=0;_<s;_++)for(let T=0;T<a;T++){const P=M[T][_],C=M[T+1][_],L=M[T+1][_+1],q=M[T][_+1];(e>0||T!==0)&&(f.push(P,C,q),E+=3),(t>0||T!==a-1)&&(f.push(C,L,q),E+=3)}l.addGroup(h,E,0),h+=E}function A(y){const z=g,E=new Ue,w=new F;let _=0;const T=y===!0?e:t,P=y===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,p*P,0),d.push(0,P,0),m.push(.5,.5),g++;const C=g;for(let L=0;L<=s;L++){const Y=L/s*c+o,B=Math.cos(Y),K=Math.sin(Y);w.x=T*K,w.y=p*P,w.z=T*B,u.push(w.x,w.y,w.z),d.push(0,P,0),E.x=B*.5+.5,E.y=K*.5*P+.5,m.push(E.x,E.y),g++}for(let L=0;L<s;L++){const q=z+L,Y=C+L;y===!0?f.push(Y,Y+1,q):f.push(Y+1,Y,q),_+=3}l.addGroup(h,_,y===!0?1:2),h+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Us(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fn extends Ui{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,f=c+1,u=e/o,d=t/c,m=[],g=[],M=[],p=[];for(let h=0;h<f;h++){const S=h*d-r;for(let A=0;A<l;A++){const y=A*u-a;g.push(y,-S,0),M.push(0,0,1),p.push(A/o),p.push(1-h/c)}}for(let h=0;h<c;h++)for(let S=0;S<o;S++){const A=S+l*h,y=S+l*(h+1),z=S+1+l*(h+1),E=S+1+l*h;m.push(A,y,E),m.push(y,z,E)}this.setIndex(m),this.setAttribute("position",new li(g,3)),this.setAttribute("normal",new li(M,3)),this.setAttribute("uv",new li(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fn(e.width,e.height,e.widthSegments,e.heightSegments)}}class zm extends _s{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ye(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function ms(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(jc(s))s.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(jc(s[0])){const a=[];for(let r=0,o=s.length;r<o;r++)a[r]=s[r].clone();e[t][n]=a}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Xt(i){const e={};for(let t=0;t<i.length;t++){const n=ms(i[t]);for(const s in n)e[s]=n[s]}return e}function jc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function wm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Du(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Rm={clone:ms,merge:Xt};var Cm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ni extends _s{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cm,this.fragmentShader=Pm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ms(e.uniforms),this.uniformsGroups=wm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ye().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ue().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new pt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Fe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new mt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Dm extends Ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ed extends _s{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qo,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Im extends _s{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Lm extends _s{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Iu extends Dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Nm extends Iu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Br=new mt,td=new F,id=new F;class Um{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=ei,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dl,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;td.setFromMatrixPosition(e.matrixWorld),t.position.copy(td),id.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(id),t.updateMatrixWorld(),Br.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Br,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Xs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Br)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const va=new F,Ma=new mn,bi=new F;class Lu extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,Ma,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,bi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(va,Ma,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,bi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ln=new F,nd=new Ue,sd=new Ue;class mi extends Lu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qs*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ln.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ln.x,ln.y).multiplyScalar(-e/ln.z),ln.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ln.x,ln.y).multiplyScalar(-e/ln.z)}getViewSize(e,t){return this.getViewBounds(e,nd,sd),t.subVectors(sd,nd)}setViewOffset(e,t,n,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ls*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;a+=r.offsetX*s/c,t-=r.offsetY*n/l,s*=r.width/c,n*=r.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class $a extends Lu{constructor(e=-1,t=1,n=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=n-e,r=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,r=a+l*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Fm extends Um{constructor(){super(new $a(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gr extends Iu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.shadow=new Fm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const jn=-90,es=1;class Om extends Dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new mi(jn,es,e,t);s.layers=this.layers,this.add(s);const a=new mi(jn,es,e,t);a.layers=this.layers,this.add(a);const r=new mi(jn,es,e,t);r.layers=this.layers,this.add(r);const o=new mi(jn,es,e,t);o.layers=this.layers,this.add(o);const c=new mi(jn,es,e,t);c.layers=this.layers,this.add(c);const l=new mi(jn,es,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,a,r,o,c]=t;for(const l of t)this.remove(l);if(e===wi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,c,l,f]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(u,d,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Bm extends mi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ad=new mt;class Gm{constructor(e,t,n=0,s=1/0){this.ray=new Pl(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Rl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):$e("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ad.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ad),this}intersectObject(e,t=!0,n=[]){return Ko(e,this,n,t),n.sort(rd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,a=e.length;s<a;s++)Ko(e[s],this,n,t);return n.sort(rd),n}}function rd(i,e){return i.distance-e.distance}function Ko(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const a=i.children;for(let r=0,o=a.length;r<o;r++)Ko(a[r],e,t,!0)}}class od{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=We(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(We(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Yl=class Yl{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const a=this.elements;return a[0]=e,a[2]=t,a[1]=n,a[3]=s,this}};Yl.prototype.isMatrix2=!0;let ld=Yl;class Hm extends gn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ne("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function cd(i,e,t,n){const s=km(n);switch(t){case Su:return i*e;case bu:return i*e/s.components*s.byteLength;case Sl:return i*e/s.components*s.byteLength;case Nn:return i*e*2/s.components*s.byteLength;case El:return i*e*2/s.components*s.byteLength;case Eu:return i*e*3/s.components*s.byteLength;case _i:return i*e*4/s.components*s.byteLength;case bl:return i*e*4/s.components*s.byteLength;case Aa:case za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case wa:case Ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case go:case vo:return Math.max(i,16)*Math.max(e,8)/4;case xo:case _o:return Math.max(i,8)*Math.max(e,8)/2;case Mo:case yo:case Eo:case bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case So:case Ba:case To:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ao:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ro:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Co:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Po:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Do:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Io:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Lo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case No:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Oo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Bo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Go:case Ho:case ko:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Vo:case Wo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ga:case Xo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function km(i){switch(i){case ei:case _u:return{byteLength:1,components:1};case Vs:case vu:case Zi:return{byteLength:2,components:1};case Ml:case yl:return{byteLength:2,components:4};case Li:case vl:case zi:return{byteLength:4,components:1};case Mu:case yu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gl}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gl);function Nu(){let i=null,e=!1,t=null,n=null;function s(a,r){t(a,r),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function Vm(i){const e=new WeakMap;function t(o,c){const l=o.array,f=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,f),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const f=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,f);else{u.sort((m,g)=>m.start-g.start);let d=0;for(let m=1;m<u.length;m++){const g=u[d],M=u[m];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++d,u[d]=M)}u.length=d+1;for(let m=0,g=u.length;m<g;m++){const M=u[m];i.bufferSubData(l,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:a,update:r}}var Wm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xm=`#ifdef USE_ALPHAHASH
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
#endif`,qm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ym=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Km=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$m=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jm=`#ifdef USE_AOMAP
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
#endif`,Zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qm=`#ifdef USE_BATCHING
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
#endif`,jm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ex=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ix=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,nx=`#ifdef USE_IRIDESCENCE
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
#endif`,sx=`#ifdef USE_BUMPMAP
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
#endif`,ax=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ox=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,dx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ux=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,fx=`#define PI 3.141592653589793
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
} // validated`,px=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,mx=`vec3 transformedNormal = objectNormal;
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
#endif`,xx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_x=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mx="gl_FragColor = linearToOutputTexel( gl_FragColor );",yx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sx=`#ifdef USE_ENVMAP
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
#endif`,Ex=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bx=`#ifdef USE_ENVMAP
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
#endif`,Tx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ax=`#ifdef USE_ENVMAP
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
#endif`,zx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Px=`#ifdef USE_GRADIENTMAP
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
}`,Dx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ix=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Ux=`#ifdef USE_ENVMAP
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
#endif`,Fx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ox=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hx=`PhysicalMaterial material;
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
#endif`,kx=`uniform sampler2D dfgLUT;
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
}`,Vx=`
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
#endif`,Wx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Xx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Yx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$x=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,e0=`#if defined( USE_POINTS_UV )
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
#endif`,t0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,i0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,n0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,s0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,a0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,r0=`#ifdef USE_MORPHTARGETS
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
#endif`,o0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,l0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,c0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,d0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,u0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,h0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,f0=`#ifdef USE_NORMALMAP
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
#endif`,p0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,m0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,x0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,g0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,v0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,M0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,y0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,S0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,E0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,b0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,T0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,A0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,z0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,w0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,R0=`float getShadowMask() {
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
}`,C0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,P0=`#ifdef USE_SKINNING
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
#endif`,D0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,I0=`#ifdef USE_SKINNING
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
#endif`,L0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,N0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,U0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,F0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,O0=`#ifdef USE_TRANSMISSION
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
#endif`,B0=`#ifdef USE_TRANSMISSION
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
#endif`,G0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const W0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,X0=`uniform sampler2D t2D;
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
}`,q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,K0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J0=`#include <common>
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
}`,Z0=`#if DEPTH_PACKING == 3200
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
}`,Q0=`#define DISTANCE
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
}`,j0=`#define DISTANCE
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
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ig=`uniform float scale;
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
}`,ng=`uniform vec3 diffuse;
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
}`,sg=`#include <common>
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
}`,ag=`uniform vec3 diffuse;
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
}`,rg=`#define LAMBERT
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
}`,og=`#define LAMBERT
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
}`,lg=`#define MATCAP
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
}`,cg=`#define MATCAP
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
}`,dg=`#define NORMAL
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
}`,ug=`#define NORMAL
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
}`,hg=`#define PHONG
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
}`,fg=`#define PHONG
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
}`,pg=`#define STANDARD
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
}`,mg=`#define STANDARD
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
}`,xg=`#define TOON
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
}`,gg=`#define TOON
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
}`,_g=`uniform float size;
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
}`,vg=`uniform vec3 diffuse;
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
}`,Mg=`#include <common>
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
}`,yg=`uniform vec3 color;
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
}`,Sg=`uniform float rotation;
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
}`,Eg=`uniform vec3 diffuse;
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
}`,ke={alphahash_fragment:Wm,alphahash_pars_fragment:Xm,alphamap_fragment:qm,alphamap_pars_fragment:Ym,alphatest_fragment:Km,alphatest_pars_fragment:$m,aomap_fragment:Jm,aomap_pars_fragment:Zm,batching_pars_vertex:Qm,batching_vertex:jm,begin_vertex:ex,beginnormal_vertex:tx,bsdfs:ix,iridescence_fragment:nx,bumpmap_pars_fragment:sx,clipping_planes_fragment:ax,clipping_planes_pars_fragment:rx,clipping_planes_pars_vertex:ox,clipping_planes_vertex:lx,color_fragment:cx,color_pars_fragment:dx,color_pars_vertex:ux,color_vertex:hx,common:fx,cube_uv_reflection_fragment:px,defaultnormal_vertex:mx,displacementmap_pars_vertex:xx,displacementmap_vertex:gx,emissivemap_fragment:_x,emissivemap_pars_fragment:vx,colorspace_fragment:Mx,colorspace_pars_fragment:yx,envmap_fragment:Sx,envmap_common_pars_fragment:Ex,envmap_pars_fragment:bx,envmap_pars_vertex:Tx,envmap_physical_pars_fragment:Ux,envmap_vertex:Ax,fog_vertex:zx,fog_pars_vertex:wx,fog_fragment:Rx,fog_pars_fragment:Cx,gradientmap_pars_fragment:Px,lightmap_pars_fragment:Dx,lights_lambert_fragment:Ix,lights_lambert_pars_fragment:Lx,lights_pars_begin:Nx,lights_toon_fragment:Fx,lights_toon_pars_fragment:Ox,lights_phong_fragment:Bx,lights_phong_pars_fragment:Gx,lights_physical_fragment:Hx,lights_physical_pars_fragment:kx,lights_fragment_begin:Vx,lights_fragment_maps:Wx,lights_fragment_end:Xx,lightprobes_pars_fragment:qx,logdepthbuf_fragment:Yx,logdepthbuf_pars_fragment:Kx,logdepthbuf_pars_vertex:$x,logdepthbuf_vertex:Jx,map_fragment:Zx,map_pars_fragment:Qx,map_particle_fragment:jx,map_particle_pars_fragment:e0,metalnessmap_fragment:t0,metalnessmap_pars_fragment:i0,morphinstance_vertex:n0,morphcolor_vertex:s0,morphnormal_vertex:a0,morphtarget_pars_vertex:r0,morphtarget_vertex:o0,normal_fragment_begin:l0,normal_fragment_maps:c0,normal_pars_fragment:d0,normal_pars_vertex:u0,normal_vertex:h0,normalmap_pars_fragment:f0,clearcoat_normal_fragment_begin:p0,clearcoat_normal_fragment_maps:m0,clearcoat_pars_fragment:x0,iridescence_pars_fragment:g0,opaque_fragment:_0,packing:v0,premultiplied_alpha_fragment:M0,project_vertex:y0,dithering_fragment:S0,dithering_pars_fragment:E0,roughnessmap_fragment:b0,roughnessmap_pars_fragment:T0,shadowmap_pars_fragment:A0,shadowmap_pars_vertex:z0,shadowmap_vertex:w0,shadowmask_pars_fragment:R0,skinbase_vertex:C0,skinning_pars_vertex:P0,skinning_vertex:D0,skinnormal_vertex:I0,specularmap_fragment:L0,specularmap_pars_fragment:N0,tonemapping_fragment:U0,tonemapping_pars_fragment:F0,transmission_fragment:O0,transmission_pars_fragment:B0,uv_pars_fragment:G0,uv_pars_vertex:H0,uv_vertex:k0,worldpos_vertex:V0,background_vert:W0,background_frag:X0,backgroundCube_vert:q0,backgroundCube_frag:Y0,cube_vert:K0,cube_frag:$0,depth_vert:J0,depth_frag:Z0,distance_vert:Q0,distance_frag:j0,equirect_vert:eg,equirect_frag:tg,linedashed_vert:ig,linedashed_frag:ng,meshbasic_vert:sg,meshbasic_frag:ag,meshlambert_vert:rg,meshlambert_frag:og,meshmatcap_vert:lg,meshmatcap_frag:cg,meshnormal_vert:dg,meshnormal_frag:ug,meshphong_vert:hg,meshphong_frag:fg,meshphysical_vert:pg,meshphysical_frag:mg,meshtoon_vert:xg,meshtoon_frag:gg,points_vert:_g,points_frag:vg,shadow_vert:Mg,shadow_frag:yg,sprite_vert:Sg,sprite_frag:Eg},xe={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},Ai={basic:{uniforms:Xt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Xt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Xt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Xt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Xt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Xt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Xt([xe.points,xe.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Xt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Xt([xe.common,xe.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Xt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Xt([xe.sprite,xe.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distance:{uniforms:Xt([xe.common,xe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distance_vert,fragmentShader:ke.distance_frag},shadow:{uniforms:Xt([xe.lights,xe.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};Ai.physical={uniforms:Xt([Ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const ya={r:0,b:0,g:0},bg=new mt,Uu=new Fe;Uu.set(-1,0,0,0,1,0,0,0,1);function Tg(i,e,t,n,s,a){const r=new Ye(0);let o=s===!0?0:1,c,l,f=null,u=0,d=null;function m(S){let A=S.isScene===!0?S.background:null;if(A&&A.isTexture){const y=S.backgroundBlurriness>0;A=e.get(A,y)}return A}function g(S){let A=!1;const y=m(S);y===null?p(r,o):y&&y.isColor&&(p(y,1),A=!0);const z=i.xr.getEnvironmentBlendMode();z==="additive"?t.buffers.color.setClear(0,0,0,1,a):z==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(S,A){const y=m(A);y&&(y.isCubeTexture||y.mapping===Ka)?(l===void 0&&(l=new vi(new vs(1,1,1),new Ni({name:"BackgroundCubeMaterial",uniforms:ms(Ai.backgroundCube.uniforms),vertexShader:Ai.backgroundCube.vertexShader,fragmentShader:Ai.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(z,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(bg.makeRotationFromEuler(A.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Uu),l.material.toneMapped=Ke.getTransfer(y.colorSpace)!==it,(f!==y||u!==y.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=y,u=y.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new vi(new fn(2,2),new Ni({name:"BackgroundMaterial",uniforms:ms(Ai.background.uniforms),vertexShader:Ai.background.vertexShader,fragmentShader:Ai.background.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(y.colorSpace)!==it,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||u!==y.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=y,u=y.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,A){S.getRGB(ya,Du(i)),t.buffers.color.setClear(ya.r,ya.g,ya.b,A,a)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return r},setClearColor:function(S,A=1){r.set(S),o=A,p(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,p(r,o)},render:g,addToRenderList:M,dispose:h}}function Ag(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let a=s,r=!1;function o(C,L,q,Y,B){let K=!1;const X=u(C,Y,q,L);a!==X&&(a=X,l(a.object)),K=m(C,Y,q,B),K&&g(C,Y,q,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(K||r)&&(r=!1,y(C,L,q,Y),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function f(C){return i.deleteVertexArray(C)}function u(C,L,q,Y){const B=Y.wireframe===!0;let K=n[L.id];K===void 0&&(K={},n[L.id]=K);const X=C.isInstancedMesh===!0?C.id:0;let ee=K[X];ee===void 0&&(ee={},K[X]=ee);let ie=ee[q.id];ie===void 0&&(ie={},ee[q.id]=ie);let pe=ie[B];return pe===void 0&&(pe=d(c()),ie[B]=pe),pe}function d(C){const L=[],q=[],Y=[];for(let B=0;B<t;B++)L[B]=0,q[B]=0,Y[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:q,attributeDivisors:Y,object:C,attributes:{},index:null}}function m(C,L,q,Y){const B=a.attributes,K=L.attributes;let X=0;const ee=q.getAttributes();for(const ie in ee)if(ee[ie].location>=0){const _e=B[ie];let Ee=K[ie];if(Ee===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(Ee=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(Ee=C.instanceColor)),_e===void 0||_e.attribute!==Ee||Ee&&_e.data!==Ee.data)return!0;X++}return a.attributesNum!==X||a.index!==Y}function g(C,L,q,Y){const B={},K=L.attributes;let X=0;const ee=q.getAttributes();for(const ie in ee)if(ee[ie].location>=0){let _e=K[ie];_e===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(_e=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(_e=C.instanceColor));const Ee={};Ee.attribute=_e,_e&&_e.data&&(Ee.data=_e.data),B[ie]=Ee,X++}a.attributes=B,a.attributesNum=X,a.index=Y}function M(){const C=a.newAttributes;for(let L=0,q=C.length;L<q;L++)C[L]=0}function p(C){h(C,0)}function h(C,L){const q=a.newAttributes,Y=a.enabledAttributes,B=a.attributeDivisors;q[C]=1,Y[C]===0&&(i.enableVertexAttribArray(C),Y[C]=1),B[C]!==L&&(i.vertexAttribDivisor(C,L),B[C]=L)}function S(){const C=a.newAttributes,L=a.enabledAttributes;for(let q=0,Y=L.length;q<Y;q++)L[q]!==C[q]&&(i.disableVertexAttribArray(q),L[q]=0)}function A(C,L,q,Y,B,K,X){X===!0?i.vertexAttribIPointer(C,L,q,B,K):i.vertexAttribPointer(C,L,q,Y,B,K)}function y(C,L,q,Y){M();const B=Y.attributes,K=q.getAttributes(),X=L.defaultAttributeValues;for(const ee in K){const ie=K[ee];if(ie.location>=0){let pe=B[ee];if(pe===void 0&&(ee==="instanceMatrix"&&C.instanceMatrix&&(pe=C.instanceMatrix),ee==="instanceColor"&&C.instanceColor&&(pe=C.instanceColor)),pe!==void 0){const _e=pe.normalized,Ee=pe.itemSize,Je=e.get(pe);if(Je===void 0)continue;const ht=Je.buffer,Xe=Je.type,Z=Je.bytesPerElement,oe=Xe===i.INT||Xe===i.UNSIGNED_INT||pe.gpuType===vl;if(pe.isInterleavedBufferAttribute){const ne=pe.data,R=ne.stride,O=pe.offset;if(ne.isInstancedInterleavedBuffer){for(let V=0;V<ie.locationSize;V++)h(ie.location+V,ne.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let V=0;V<ie.locationSize;V++)p(ie.location+V);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let V=0;V<ie.locationSize;V++)A(ie.location+V,Ee/ie.locationSize,Xe,_e,R*Z,(O+Ee/ie.locationSize*V)*Z,oe)}else{if(pe.isInstancedBufferAttribute){for(let ne=0;ne<ie.locationSize;ne++)h(ie.location+ne,pe.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let ne=0;ne<ie.locationSize;ne++)p(ie.location+ne);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let ne=0;ne<ie.locationSize;ne++)A(ie.location+ne,Ee/ie.locationSize,Xe,_e,Ee*Z,Ee/ie.locationSize*ne*Z,oe)}}else if(X!==void 0){const _e=X[ee];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(ie.location,_e);break;case 3:i.vertexAttrib3fv(ie.location,_e);break;case 4:i.vertexAttrib4fv(ie.location,_e);break;default:i.vertexAttrib1fv(ie.location,_e)}}}}S()}function z(){T();for(const C in n){const L=n[C];for(const q in L){const Y=L[q];for(const B in Y){const K=Y[B];for(const X in K)f(K[X].object),delete K[X];delete Y[B]}}delete n[C]}}function E(C){if(n[C.id]===void 0)return;const L=n[C.id];for(const q in L){const Y=L[q];for(const B in Y){const K=Y[B];for(const X in K)f(K[X].object),delete K[X];delete Y[B]}}delete n[C.id]}function w(C){for(const L in n){const q=n[L];for(const Y in q){const B=q[Y];if(B[C.id]===void 0)continue;const K=B[C.id];for(const X in K)f(K[X].object),delete K[X];delete B[C.id]}}}function _(C){for(const L in n){const q=n[L],Y=C.isInstancedMesh===!0?C.id:0,B=q[Y];if(B!==void 0){for(const K in B){const X=B[K];for(const ee in X)f(X[ee].object),delete X[ee];delete B[K]}delete q[Y],Object.keys(q).length===0&&delete n[L]}}}function T(){P(),r=!0,a!==s&&(a=s,l(a.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:z,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:w,initAttributes:M,enableAttribute:p,disableUnusedAttributes:S}}function zg(i,e,t){let n;function s(c){n=c}function a(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function r(c,l,f){f!==0&&(i.drawArraysInstanced(n,c,l,f),t.update(l,n,f))}function o(c,l,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,f);let d=0;for(let m=0;m<f;m++)d+=l[m];t.update(d,n,1)}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function wg(i,e,t,n){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==_i&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const _=w===Zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==ei&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==zi&&!_)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const f=c(l);f!==l&&(Ne("WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),z=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:y,maxSamples:z,samples:E}}function Rg(i){const e=this;let t=null,n=0,s=!1,a=!1;const r=new Wi,o=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||s;return s=d,n=u.length,m},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,d){t=f(u,d,0)},this.setState=function(u,d,m){const g=u.clippingPlanes,M=u.clipIntersection,p=u.clipShadows,h=i.get(u);if(!s||g===null||g.length===0||a&&!p)a?f(null):l();else{const S=a?0:n,A=S*4;let y=h.clippingState||null;c.value=y,y=f(g,d,A,m);for(let z=0;z!==A;++z)y[z]=t[z];h.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(u,d,m,g){const M=u!==null?u.length:0;let p=null;if(M!==0){if(p=c.value,g!==!0||p===null){const h=m+M*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<h)&&(p=new Float32Array(h));for(let A=0,y=m;A!==M;++A,y+=4)r.copy(u[A]).applyMatrix4(S,o),r.normal.toArray(p,y),p[y+3]=r.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,p}}const hn=4,dd=[.125,.215,.35,.446,.526,.582],An=20,Cg=256,zs=new $a,ud=new Ye;let Hr=null,kr=0,Vr=0,Wr=!1;const Pg=new F;class hd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,a={}){const{size:r=256,position:o=Pg}=a;Hr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Vr=this._renderer.getActiveMipmapLevel(),Wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=md(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Hr,kr,Vr),this._renderer.xr.enabled=Wr,e.scissorTest=!1,ts(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ln||e.mapping===fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Vr=this._renderer.getActiveMipmapLevel(),Wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:Zi,format:_i,colorSpace:Ha,depthBuffer:!1},s=fd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fd(e,t,n);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Dg(a)),this._blurMaterial=Lg(a,e,t),this._ggxMaterial=Ig(a,e,t)}return s}_compileMaterial(e){const t=new vi(new Ui,e);this._renderer.compile(t,zs)}_sceneToCubeUV(e,t,n,s,a){const c=new mi(90,1,t,n),l=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,m=u.toneMapping;u.getClearColor(ud),u.toneMapping=Ci,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new vi(new vs,new Wa({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,p=M.material;let h=!1;const S=e.background;S?S.isColor&&(p.color.copy(S),e.background=null,h=!0):(p.color.copy(ud),h=!0);for(let A=0;A<6;A++){const y=A%3;y===0?(c.up.set(0,l[A],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+f[A],a.y,a.z)):y===1?(c.up.set(0,0,l[A]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+f[A],a.z)):(c.up.set(0,l[A],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+f[A]));const z=this._cubeSize;ts(s,y*z,A>2?z:0,z,z),u.setRenderTarget(s),h&&u.render(M,c),u.render(e,c)}u.toneMapping=m,u.autoClear=d,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ln||e.mapping===fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=md()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pd());const a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;ts(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(r,zs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[n];o.material=r;const c=r.uniforms,l=n/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-f*f),d=0+l*1.25,m=u*d,{_lodMax:g}=this,M=this._sizeLods[n],p=3*M*(n>g-hn?n-g+hn:0),h=4*(this._cubeSize-M);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=g-t,ts(a,p,h,3*M,2*M),s.setRenderTarget(a),s.render(o,zs),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=g-n,ts(e,p,h,3*M,2*M),s.setRenderTarget(e),s.render(o,zs)}_blur(e,t,n,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,s,"latitudinal",a),this._halfBlur(r,e,n,n,s,"longitudinal",a)}_halfBlur(e,t,n,s,a,r,o){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&$e("blur direction must be either latitudinal or longitudinal!");const f=3,u=this._lodMeshes[s];u.material=l;const d=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(a)?Math.PI/(2*m):2*Math.PI/(2*An-1),M=a/g,p=isFinite(a)?1+Math.floor(f*M):An;p>An&&Ne(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${An}`);const h=[];let S=0;for(let w=0;w<An;++w){const _=w/M,T=Math.exp(-_*_/2);h.push(T),w===0?S+=T:w<p&&(S+=2*T)}for(let w=0;w<h.length;w++)h[w]=h[w]/S;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=h,d.latitudinal.value=r==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:A}=this;d.dTheta.value=g,d.mipInt.value=A-n;const y=this._sizeLods[s],z=3*y*(s>A-hn?s-A+hn:0),E=4*(this._cubeSize-y);ts(t,z,E,3*y,2*y),c.setRenderTarget(t),c.render(u,zs)}}function Dg(i){const e=[],t=[],n=[];let s=i;const a=i-hn+1+dd.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);e.push(o);let c=1/o;r>i-hn?c=dd[r-i+hn-1]:r===0&&(c=0),t.push(c);const l=1/(o-2),f=-l,u=1+l,d=[f,f,u,f,u,u,f,f,u,u,f,u],m=6,g=6,M=3,p=2,h=1,S=new Float32Array(M*g*m),A=new Float32Array(p*g*m),y=new Float32Array(h*g*m);for(let E=0;E<m;E++){const w=E%3*2/3-1,_=E>2?0:-1,T=[w,_,0,w+2/3,_,0,w+2/3,_+1,0,w,_,0,w+2/3,_+1,0,w,_+1,0];S.set(T,M*g*E),A.set(d,p*g*E);const P=[E,E,E,E,E,E];y.set(P,h*g*E)}const z=new Ui;z.setAttribute("position",new Di(S,M)),z.setAttribute("uv",new Di(A,p)),z.setAttribute("faceIndex",new Di(y,h)),n.push(new vi(z,null)),s>hn&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function fd(i,e,t){const n=new Pi(i,e,t);return n.texture.mapping=Ka,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ts(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ig(i,e,t){return new Ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Cg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ja(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Lg(i,e,t){const n=new Float32Array(An),s=new F(0,1,0);return new Ni({name:"SphericalGaussianBlur",defines:{n:An,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ja(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function pd(){return new Ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ja(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function md(){return new Ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Ja(){return`

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
	`}class Fu extends Pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Cu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new vs(5,5,5),a=new Ni({name:"CubemapFromEquirect",uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:$i});a.uniforms.tEquirect.value=t;const r=new vi(s,a),o=t.minFilter;return t.minFilter===wn&&(t.minFilter=Gt),new Om(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,s);e.setRenderTarget(a)}}function Ng(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,m=!1){return d==null?null:m?r(d):a(d)}function a(d){if(d&&d.isTexture){const m=d.mapping;if(m===pr||m===mr)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const M=new Fu(g.height);return M.fromEquirectangularTexture(i,d),e.set(d,M),d.addEventListener("dispose",l),o(M.texture,d.mapping)}else return null}}return d}function r(d){if(d&&d.isTexture){const m=d.mapping,g=m===pr||m===mr,M=m===Ln||m===fs;if(g||M){let p=t.get(d);const h=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return n===null&&(n=new hd(i)),p=g?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const S=d.image;return g&&S&&S.height>0||M&&S&&c(S)?(n===null&&(n=new hd(i)),p=g?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",f),p.texture):null}}}return d}function o(d,m){return m===pr?d.mapping=Ln:m===mr&&(d.mapping=fs),d}function c(d){let m=0;const g=6;for(let M=0;M<g;M++)d[M]!==void 0&&m++;return m===g}function l(d){const m=d.target;m.removeEventListener("dispose",l);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function f(d){const m=d.target;m.removeEventListener("dispose",f);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Ug(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&os("WebGLRenderer: "+n+" extension not supported."),s}}}function Fg(i,e,t,n){const s={},a=new WeakMap;function r(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",r),delete s[d.id];const m=a.get(d);m&&(e.remove(m),a.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",r),s[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const m in d)e.update(d[m],i.ARRAY_BUFFER)}function l(u){const d=[],m=u.index,g=u.attributes.position;let M=0;if(g===void 0)return;if(m!==null){const S=m.array;M=m.version;for(let A=0,y=S.length;A<y;A+=3){const z=S[A+0],E=S[A+1],w=S[A+2];d.push(z,E,E,w,w,z)}}else{const S=g.array;M=g.version;for(let A=0,y=S.length/3-1;A<y;A+=3){const z=A+0,E=A+1,w=A+2;d.push(z,E,E,w,w,z)}}const p=new(g.count>=65535?Ru:wu)(d,1);p.version=M;const h=a.get(u);h&&e.remove(h),a.set(u,p)}function f(u){const d=a.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&l(u)}else l(u);return a.get(u)}return{get:o,update:c,getWireframeAttribute:f}}function Og(i,e,t){let n;function s(u){n=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function c(u,d){i.drawElements(n,d,a,u*r),t.update(d,n,1)}function l(u,d,m){m!==0&&(i.drawElementsInstanced(n,d,a,u*r,m),t.update(d,n,m))}function f(u,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,a,u,0,m);let M=0;for(let p=0;p<m;p++)M+=d[p];t.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=f}function Bg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,o){switch(t.calls++,r){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:$e("WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Gg(i,e,t){const n=new WeakMap,s=new pt;function a(r,o,c){const l=r.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=f!==void 0?f.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let T=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let A=0;m===!0&&(A=1),g===!0&&(A=2),M===!0&&(A=3);let y=o.attributes.position.count*A,z=1;y>e.maxTextureSize&&(z=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*z*4*u),w=new Au(E,y,z,u);w.type=zi,w.needsUpdate=!0;const _=A*4;for(let P=0;P<u;P++){const C=p[P],L=h[P],q=S[P],Y=y*z*4*P;for(let B=0;B<C.count;B++){const K=B*_;m===!0&&(s.fromBufferAttribute(C,B),E[Y+K+0]=s.x,E[Y+K+1]=s.y,E[Y+K+2]=s.z,E[Y+K+3]=0),g===!0&&(s.fromBufferAttribute(L,B),E[Y+K+4]=s.x,E[Y+K+5]=s.y,E[Y+K+6]=s.z,E[Y+K+7]=0),M===!0&&(s.fromBufferAttribute(q,B),E[Y+K+8]=s.x,E[Y+K+9]=s.y,E[Y+K+10]=s.z,E[Y+K+11]=q.itemSize===4?s.w:1)}}d={count:u,texture:w,size:new Ue(y,z)},n.set(o,d),o.addEventListener("dispose",T)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",r.morphTexture,t);else{let m=0;for(let M=0;M<l.length;M++)m+=l[M];const g=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:a}}function Hg(i,e,t,n,s){let a=new WeakMap;function r(l){const f=s.render.frame,u=l.geometry,d=e.get(l,u);if(a.get(d)!==f&&(e.update(d),a.set(d,f)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),a.get(l)!==f&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),a.set(l,f))),l.isSkinnedMesh){const m=l.skeleton;a.get(m)!==f&&(m.update(),a.set(m,f))}return d}function o(){a=new WeakMap}function c(l){const f=l.target;f.removeEventListener("dispose",c),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:r,dispose:o}}const kg={[uu]:"LINEAR_TONE_MAPPING",[hu]:"REINHARD_TONE_MAPPING",[fu]:"CINEON_TONE_MAPPING",[_l]:"ACES_FILMIC_TONE_MAPPING",[mu]:"AGX_TONE_MAPPING",[xu]:"NEUTRAL_TONE_MAPPING",[pu]:"CUSTOM_TONE_MAPPING"};function Vg(i,e,t,n,s,a){const r=new Pi(e,t,{type:i,depthBuffer:s,stencilBuffer:a,samples:n?4:0,depthTexture:s?new ps(e,t):void 0}),o=new Pi(e,t,{type:Zi,depthBuffer:!1,stencilBuffer:!1}),c=new Ui;c.setAttribute("position",new li([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new li([0,2,0,0,2,0],2));const l=new Dm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new vi(c,l),u=new $a(-1,1,1,-1,0,1);let d=null,m=null,g=!1,M,p=null,h=[],S=!1;this.setSize=function(A,y){r.setSize(A,y),o.setSize(A,y);for(let z=0;z<h.length;z++){const E=h[z];E.setSize&&E.setSize(A,y)}},this.setEffects=function(A){h=A,S=h.length>0&&h[0].isRenderPass===!0;const y=r.width,z=r.height;for(let E=0;E<h.length;E++){const w=h[E];w.setSize&&w.setSize(y,z)}},this.begin=function(A,y){if(g||A.toneMapping===Ci&&h.length===0)return!1;if(p=y,y!==null){const z=y.width,E=y.height;(r.width!==z||r.height!==E)&&this.setSize(z,E)}return S===!1&&A.setRenderTarget(r),M=A.toneMapping,A.toneMapping=Ci,!0},this.hasRenderPass=function(){return S},this.end=function(A,y){A.toneMapping=M,g=!0;let z=r,E=o;for(let w=0;w<h.length;w++){const _=h[w];if(_.enabled!==!1&&(_.render(A,E,z,y),_.needsSwap!==!1)){const T=z;z=E,E=T}}if(d!==A.outputColorSpace||m!==A.toneMapping){d=A.outputColorSpace,m=A.toneMapping,l.defines={},Ke.getTransfer(d)===it&&(l.defines.SRGB_TRANSFER="");const w=kg[m];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=z.texture,A.setRenderTarget(p),A.render(f,u),p=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Ou=new kt,$o=new ps(1,1),Bu=new Au,Gu=new om,Hu=new Cu,xd=[],gd=[],_d=new Float32Array(16),vd=new Float32Array(9),Md=new Float32Array(4);function Ms(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let a=xd[s];if(a===void 0&&(a=new Float32Array(s),xd[s]=a),e!==0){n.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,i[r].toArray(a,o)}return a}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Za(i,e){let t=gd[e];t===void 0&&(t=new Int32Array(e),gd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Wg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Xg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function qg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function Yg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function Kg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;Md.set(n),i.uniformMatrix2fv(this.addr,!1,Md),Tt(t,n)}}function $g(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;vd.set(n),i.uniformMatrix3fv(this.addr,!1,vd),Tt(t,n)}}function Jg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;_d.set(n),i.uniformMatrix4fv(this.addr,!1,_d),Tt(t,n)}}function Zg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Qg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function jg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function e_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function t_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function i_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function n_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function s_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function a_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_2D_SHADOW?($o.compareFunction=t.isReversedDepthBuffer()?Al:Tl,a=$o):a=Ou,t.setTexture2D(e||a,s)}function r_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Gu,s)}function o_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Hu,s)}function l_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bu,s)}function c_(i){switch(i){case 5126:return Wg;case 35664:return Xg;case 35665:return qg;case 35666:return Yg;case 35674:return Kg;case 35675:return $g;case 35676:return Jg;case 5124:case 35670:return Zg;case 35667:case 35671:return Qg;case 35668:case 35672:return jg;case 35669:case 35673:return e_;case 5125:return t_;case 36294:return i_;case 36295:return n_;case 36296:return s_;case 35678:case 36198:case 36298:case 36306:case 35682:return a_;case 35679:case 36299:case 36307:return r_;case 35680:case 36300:case 36308:case 36293:return o_;case 36289:case 36303:case 36311:case 36292:return l_}}function d_(i,e){i.uniform1fv(this.addr,e)}function u_(i,e){const t=Ms(e,this.size,2);i.uniform2fv(this.addr,t)}function h_(i,e){const t=Ms(e,this.size,3);i.uniform3fv(this.addr,t)}function f_(i,e){const t=Ms(e,this.size,4);i.uniform4fv(this.addr,t)}function p_(i,e){const t=Ms(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function m_(i,e){const t=Ms(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function x_(i,e){const t=Ms(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function g_(i,e){i.uniform1iv(this.addr,e)}function __(i,e){i.uniform2iv(this.addr,e)}function v_(i,e){i.uniform3iv(this.addr,e)}function M_(i,e){i.uniform4iv(this.addr,e)}function y_(i,e){i.uniform1uiv(this.addr,e)}function S_(i,e){i.uniform2uiv(this.addr,e)}function E_(i,e){i.uniform3uiv(this.addr,e)}function b_(i,e){i.uniform4uiv(this.addr,e)}function T_(i,e,t){const n=this.cache,s=e.length,a=Za(t,s);bt(n,a)||(i.uniform1iv(this.addr,a),Tt(n,a));let r;this.type===i.SAMPLER_2D_SHADOW?r=$o:r=Ou;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||r,a[o])}function A_(i,e,t){const n=this.cache,s=e.length,a=Za(t,s);bt(n,a)||(i.uniform1iv(this.addr,a),Tt(n,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||Gu,a[r])}function z_(i,e,t){const n=this.cache,s=e.length,a=Za(t,s);bt(n,a)||(i.uniform1iv(this.addr,a),Tt(n,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Hu,a[r])}function w_(i,e,t){const n=this.cache,s=e.length,a=Za(t,s);bt(n,a)||(i.uniform1iv(this.addr,a),Tt(n,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||Bu,a[r])}function R_(i){switch(i){case 5126:return d_;case 35664:return u_;case 35665:return h_;case 35666:return f_;case 35674:return p_;case 35675:return m_;case 35676:return x_;case 5124:case 35670:return g_;case 35667:case 35671:return __;case 35668:case 35672:return v_;case 35669:case 35673:return M_;case 5125:return y_;case 36294:return S_;case 36295:return E_;case 36296:return b_;case 35678:case 36198:case 36298:case 36306:case 35682:return T_;case 35679:case 36299:case 36307:return A_;case 35680:case 36300:case 36308:case 36293:return z_;case 36289:case 36303:case 36311:case 36292:return w_}}class C_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=c_(t.type)}}class P_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=R_(t.type)}}class D_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],n)}}}const Xr=/(\w+)(\])?(\[|\.)?/g;function yd(i,e){i.seq.push(e),i.map[e.id]=e}function I_(i,e,t){const n=i.name,s=n.length;for(Xr.lastIndex=0;;){const a=Xr.exec(n),r=Xr.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&r+2===s){yd(t,l===void 0?new C_(o,i,e):new P_(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new D_(o),yd(t,u)),t=u}}}class Ca{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const o=e.getActiveUniform(t,r),c=e.getUniformLocation(t,o.name);I_(o,c,this)}const s=[],a=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(e,t,n,s){const a=this.map[t];a!==void 0&&a.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&n.push(r)}return n}}function Sd(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const L_=37297;let N_=0;function U_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}const Ed=new Fe;function F_(i){Ke._getMatrix(Ed,Ke.workingColorSpace,i);const e=`mat3( ${Ed.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(i)){case ka:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function bd(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),a=(i.getShaderInfoLog(e)||"").trim();if(n&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+U_(i.getShaderSource(e),o)}else return a}function O_(i,e){const t=F_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const B_={[uu]:"Linear",[hu]:"Reinhard",[fu]:"Cineon",[_l]:"ACESFilmic",[mu]:"AgX",[xu]:"Neutral",[pu]:"Custom"};function G_(i,e){const t=B_[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sa=new F;function H_(){Ke.getLuminanceCoefficients(Sa);const i=Sa.x.toFixed(4),e=Sa.y.toFixed(4),t=Sa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function k_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function V_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function W_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const a=i.getActiveAttrib(e,s),r=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:i.getAttribLocation(e,r),locationSize:o}}return t}function Ds(i){return i!==""}function Td(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ad(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const X_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jo(i){return i.replace(X_,Y_)}const q_=new Map;function Y_(i,e){let t=ke[e];if(t===void 0){const n=q_.get(e);if(n!==void 0)t=ke[n],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Jo(t)}const K_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zd(i){return i.replace(K_,$_)}function $_(i,e,t,n){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function wd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const J_={[Ta]:"SHADOWMAP_TYPE_PCF",[Ps]:"SHADOWMAP_TYPE_VSM"};function Z_(i){return J_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Q_={[Ln]:"ENVMAP_TYPE_CUBE",[fs]:"ENVMAP_TYPE_CUBE",[Ka]:"ENVMAP_TYPE_CUBE_UV"};function j_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Q_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const ev={[fs]:"ENVMAP_MODE_REFRACTION"};function tv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":ev[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const iv={[du]:"ENVMAP_BLENDING_MULTIPLY",[Tp]:"ENVMAP_BLENDING_MIX",[Ap]:"ENVMAP_BLENDING_ADD"};function nv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":iv[i.combine]||"ENVMAP_BLENDING_NONE"}function sv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function av(i,e,t,n){const s=i.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const c=Z_(t),l=j_(t),f=tv(t),u=nv(t),d=sv(t),m=k_(t),g=V_(a),M=s.createProgram();let p,h,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ds).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ds).join(`
`),h.length>0&&(h+=`
`)):(p=[wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),h=[wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+f:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?ke.tonemapping_pars_fragment:"",t.toneMapping!==Ci?G_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,O_("linearToOutputTexel",t.outputColorSpace),H_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ds).join(`
`)),r=Jo(r),r=Td(r,t),r=Ad(r,t),o=Jo(o),o=Td(o,t),o=Ad(o,t),r=zd(r),o=zd(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",t.glslVersion===Nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const A=S+p+r,y=S+h+o,z=Sd(s,s.VERTEX_SHADER,A),E=Sd(s,s.FRAGMENT_SHADER,y);s.attachShader(M,z),s.attachShader(M,E),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function w(C){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(M)||"",q=s.getShaderInfoLog(z)||"",Y=s.getShaderInfoLog(E)||"",B=L.trim(),K=q.trim(),X=Y.trim();let ee=!0,ie=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(ee=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,z,E);else{const pe=bd(s,z,"vertex"),_e=bd(s,E,"fragment");$e("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+pe+`
`+_e)}else B!==""?Ne("WebGLProgram: Program Info Log:",B):(K===""||X==="")&&(ie=!1);ie&&(C.diagnostics={runnable:ee,programLog:B,vertexShader:{log:K,prefix:p},fragmentShader:{log:X,prefix:h}})}s.deleteShader(z),s.deleteShader(E),_=new Ca(s,M),T=W_(s,M)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(M,L_)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=N_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=z,this.fragmentShader=E,this}let rv=0;class ov{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new lv(e),t.set(e,n)),n}}class lv{constructor(e){this.id=rv++,this.code=e,this.usedTimes=0}}function cv(i){return i===Nn||i===Ba||i===Ga}function dv(i,e,t,n,s,a){const r=new Rl,o=new ov,c=new Set,l=[],f=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function M(_,T,P,C,L,q){const Y=C.fog,B=L.geometry,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ee=e.get(_.envMap||K,X),ie=ee&&ee.mapping===Ka?ee.image.height:null,pe=m[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Ne("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const _e=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ee=_e!==void 0?_e.length:0;let Je=0;B.morphAttributes.position!==void 0&&(Je=1),B.morphAttributes.normal!==void 0&&(Je=2),B.morphAttributes.color!==void 0&&(Je=3);let ht,Xe,Z,oe;if(pe){const Te=Ai[pe];ht=Te.vertexShader,Xe=Te.fragmentShader}else{ht=_.vertexShader,Xe=_.fragmentShader;const Te=o.getVertexShaderStage(_),gt=o.getFragmentShaderStage(_);o.update(_,Te,gt),Z=Te.id,oe=gt.id}const ne=i.getRenderTarget(),R=i.state.buffers.depth.getReversed(),O=L.isInstancedMesh===!0,V=L.isBatchedMesh===!0,be=!!_.map,ae=!!_.matcap,de=!!ee,De=!!_.aoMap,ze=!!_.lightMap,Ze=!!_.bumpMap&&_.wireframe===!1,He=!!_.normalMap,qe=!!_.displacementMap,Qe=!!_.emissiveMap,je=!!_.metalnessMap,at=!!_.roughnessMap,D=_.anisotropy>0,At=_.clearcoat>0,tt=_.dispersion>0,b=_.iridescence>0,x=_.sheen>0,U=_.transmission>0,k=D&&!!_.anisotropyMap,$=At&&!!_.clearcoatMap,se=At&&!!_.clearcoatNormalMap,ce=At&&!!_.clearcoatRoughnessMap,J=b&&!!_.iridescenceMap,j=b&&!!_.iridescenceThicknessMap,ue=x&&!!_.sheenColorMap,Re=x&&!!_.sheenRoughnessMap,me=!!_.specularMap,he=!!_.specularColorMap,Ie=!!_.specularIntensityMap,Le=U&&!!_.transmissionMap,Be=U&&!!_.thicknessMap,I=!!_.gradientMap,le=!!_.alphaMap,Q=_.alphaTest>0,fe=!!_.alphaHash,Me=!!_.extensions;let te=Ci;_.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(te=i.toneMapping);const we={shaderID:pe,shaderType:_.type,shaderName:_.name,vertexShader:ht,fragmentShader:Xe,defines:_.defines,customVertexShaderID:Z,customFragmentShaderID:oe,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:V,batchingColor:V&&L._colorsTexture!==null,instancing:O,instancingColor:O&&L.instanceColor!==null,instancingMorph:O&&L.morphTexture!==null,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:be,matcap:ae,envMap:de,envMapMode:de&&ee.mapping,envMapCubeUVHeight:ie,aoMap:De,lightMap:ze,bumpMap:Ze,normalMap:He,displacementMap:qe,emissiveMap:Qe,normalMapObjectSpace:He&&_.normalMapType===Rp,normalMapTangentSpace:He&&_.normalMapType===qo,packedNormalMap:He&&_.normalMapType===qo&&cv(_.normalMap.format),metalnessMap:je,roughnessMap:at,anisotropy:D,anisotropyMap:k,clearcoat:At,clearcoatMap:$,clearcoatNormalMap:se,clearcoatRoughnessMap:ce,dispersion:tt,iridescence:b,iridescenceMap:J,iridescenceThicknessMap:j,sheen:x,sheenColorMap:ue,sheenRoughnessMap:Re,specularMap:me,specularColorMap:he,specularIntensityMap:Ie,transmission:U,transmissionMap:Le,thicknessMap:Be,gradientMap:I,opaque:_.transparent===!1&&_.blending===rs&&_.alphaToCoverage===!1,alphaMap:le,alphaTest:Q,alphaHash:fe,combine:_.combine,mapUv:be&&g(_.map.channel),aoMapUv:De&&g(_.aoMap.channel),lightMapUv:ze&&g(_.lightMap.channel),bumpMapUv:Ze&&g(_.bumpMap.channel),normalMapUv:He&&g(_.normalMap.channel),displacementMapUv:qe&&g(_.displacementMap.channel),emissiveMapUv:Qe&&g(_.emissiveMap.channel),metalnessMapUv:je&&g(_.metalnessMap.channel),roughnessMapUv:at&&g(_.roughnessMap.channel),anisotropyMapUv:k&&g(_.anisotropyMap.channel),clearcoatMapUv:$&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:se&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Re&&g(_.sheenRoughnessMap.channel),specularMapUv:me&&g(_.specularMap.channel),specularColorMapUv:he&&g(_.specularColorMap.channel),specularIntensityMapUv:Ie&&g(_.specularIntensityMap.channel),transmissionMapUv:Le&&g(_.transmissionMap.channel),thicknessMapUv:Be&&g(_.thicknessMap.channel),alphaMapUv:le&&g(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(He||D),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!B.attributes.uv&&(be||le),fog:!!Y,useFog:_.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&He===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:R,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Je,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:te,decodeVideoTexture:be&&_.map.isVideoTexture===!0&&Ke.getTransfer(_.map.colorSpace)===it,decodeVideoTextureEmissive:Qe&&_.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(_.emissiveMap.colorSpace)===it,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Xi,flipSided:_.side===Kt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Me&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&_.extensions.multiDraw===!0||V)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return we.vertexUv1s=c.has(1),we.vertexUv2s=c.has(2),we.vertexUv3s=c.has(3),c.clear(),we}function p(_){const T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)T.push(P),T.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(h(T,_),S(T,_),T.push(i.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function h(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function S(_,T){r.disableAll(),T.instancing&&r.enable(0),T.instancingColor&&r.enable(1),T.instancingMorph&&r.enable(2),T.matcap&&r.enable(3),T.envMap&&r.enable(4),T.normalMapObjectSpace&&r.enable(5),T.normalMapTangentSpace&&r.enable(6),T.clearcoat&&r.enable(7),T.iridescence&&r.enable(8),T.alphaTest&&r.enable(9),T.vertexColors&&r.enable(10),T.vertexAlphas&&r.enable(11),T.vertexUv1s&&r.enable(12),T.vertexUv2s&&r.enable(13),T.vertexUv3s&&r.enable(14),T.vertexTangents&&r.enable(15),T.anisotropy&&r.enable(16),T.alphaHash&&r.enable(17),T.batching&&r.enable(18),T.dispersion&&r.enable(19),T.batchingColor&&r.enable(20),T.gradientMap&&r.enable(21),T.packedNormalMap&&r.enable(22),T.vertexNormals&&r.enable(23),_.push(r.mask),r.disableAll(),T.fog&&r.enable(0),T.useFog&&r.enable(1),T.flatShading&&r.enable(2),T.logarithmicDepthBuffer&&r.enable(3),T.reversedDepthBuffer&&r.enable(4),T.skinning&&r.enable(5),T.morphTargets&&r.enable(6),T.morphNormals&&r.enable(7),T.morphColors&&r.enable(8),T.premultipliedAlpha&&r.enable(9),T.shadowMapEnabled&&r.enable(10),T.doubleSided&&r.enable(11),T.flipSided&&r.enable(12),T.useDepthPacking&&r.enable(13),T.dithering&&r.enable(14),T.transmission&&r.enable(15),T.sheen&&r.enable(16),T.opaque&&r.enable(17),T.pointsUvs&&r.enable(18),T.decodeVideoTexture&&r.enable(19),T.decodeVideoTextureEmissive&&r.enable(20),T.alphaToCoverage&&r.enable(21),T.numLightProbeGrids>0&&r.enable(22),T.hasPositionAttribute&&r.enable(23),_.push(r.mask)}function A(_){const T=m[_.type];let P;if(T){const C=Ai[T];P=Rm.clone(C.uniforms)}else P=_.uniforms;return P}function y(_,T){let P=f.get(T);return P!==void 0?++P.usedTimes:(P=new av(i,T,_,s),l.push(P),f.set(T,P)),P}function z(_){if(--_.usedTimes===0){const T=l.indexOf(_);l[T]=l[l.length-1],l.pop(),f.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function w(){o.dispose()}return{getParameters:M,getProgramCacheKey:p,getUniforms:A,acquireProgram:y,releaseProgram:z,releaseShaderCache:E,programs:l,dispose:w}}function uv(){let i=new WeakMap;function e(r){return i.has(r)}function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function n(r){i.delete(r)}function s(r,o,c){i.get(r)[o]=c}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:a}}function hv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Rd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Cd(){const i=[];let e=0;const t=[],n=[],s=[];function a(){e=0,t.length=0,n.length=0,s.length=0}function r(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,g,M,p,h){let S=i[e];return S===void 0?(S={id:d.id,object:d,geometry:m,material:g,materialVariant:r(d),groupOrder:M,renderOrder:d.renderOrder,z:p,group:h},i[e]=S):(S.id=d.id,S.object=d,S.geometry=m,S.material=g,S.materialVariant=r(d),S.groupOrder=M,S.renderOrder=d.renderOrder,S.z=p,S.group=h),e++,S}function c(d,m,g,M,p,h){const S=o(d,m,g,M,p,h);g.transmission>0?n.push(S):g.transparent===!0?s.push(S):t.push(S)}function l(d,m,g,M,p,h){const S=o(d,m,g,M,p,h);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):t.unshift(S)}function f(d,m,g){t.length>1&&t.sort(d||hv),n.length>1&&n.sort(m||Rd),s.length>1&&s.sort(m||Rd),g&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let d=e,m=i.length;d<m;d++){const g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:a,push:c,unshift:l,finish:u,sort:f}}function fv(){let i=new WeakMap;function e(n,s){const a=i.get(n);let r;return a===void 0?(r=new Cd,i.set(n,[r])):s>=a.length?(r=new Cd,a.push(r)):r=a[s],r}function t(){i=new WeakMap}return{get:e,dispose:t}}function pv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ye};break;case"SpotLight":t={position:new F,direction:new F,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function mv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let xv=0;function gv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function _v(i){const e=new pv,t=mv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,a=new mt,r=new mt;function o(l){let f=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let m=0,g=0,M=0,p=0,h=0,S=0,A=0,y=0,z=0,E=0,w=0;l.sort(gv);for(let T=0,P=l.length;T<P;T++){const C=l[T],L=C.color,q=C.intensity,Y=C.distance;let B=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Nn?B=C.shadow.map.texture:B=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)f+=L.r*q,u+=L.g*q,d+=L.b*q;else if(C.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(C.sh.coefficients[K],q);w++}else if(C.isDirectionalLight){const K=e.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const X=C.shadow,ee=t.get(C);ee.shadowIntensity=X.intensity,ee.shadowBias=X.bias,ee.shadowNormalBias=X.normalBias,ee.shadowRadius=X.radius,ee.shadowMapSize=X.mapSize,n.directionalShadow[m]=ee,n.directionalShadowMap[m]=B,n.directionalShadowMatrix[m]=C.shadow.matrix,S++}n.directional[m]=K,m++}else if(C.isSpotLight){const K=e.get(C);K.position.setFromMatrixPosition(C.matrixWorld),K.color.copy(L).multiplyScalar(q),K.distance=Y,K.coneCos=Math.cos(C.angle),K.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),K.decay=C.decay,n.spot[M]=K;const X=C.shadow;if(C.map&&(n.spotLightMap[z]=C.map,z++,X.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[M]=X.matrix,C.castShadow){const ee=t.get(C);ee.shadowIntensity=X.intensity,ee.shadowBias=X.bias,ee.shadowNormalBias=X.normalBias,ee.shadowRadius=X.radius,ee.shadowMapSize=X.mapSize,n.spotShadow[M]=ee,n.spotShadowMap[M]=B,y++}M++}else if(C.isRectAreaLight){const K=e.get(C);K.color.copy(L).multiplyScalar(q),K.halfWidth.set(C.width*.5,0,0),K.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=K,p++}else if(C.isPointLight){const K=e.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),K.distance=C.distance,K.decay=C.decay,C.castShadow){const X=C.shadow,ee=t.get(C);ee.shadowIntensity=X.intensity,ee.shadowBias=X.bias,ee.shadowNormalBias=X.normalBias,ee.shadowRadius=X.radius,ee.shadowMapSize=X.mapSize,ee.shadowCameraNear=X.camera.near,ee.shadowCameraFar=X.camera.far,n.pointShadow[g]=ee,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=C.shadow.matrix,A++}n.point[g]=K,g++}else if(C.isHemisphereLight){const K=e.get(C);K.skyColor.copy(C.color).multiplyScalar(q),K.groundColor.copy(C.groundColor).multiplyScalar(q),n.hemi[h]=K,h++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=u,n.ambient[2]=d;const _=n.hash;(_.directionalLength!==m||_.pointLength!==g||_.spotLength!==M||_.rectAreaLength!==p||_.hemiLength!==h||_.numDirectionalShadows!==S||_.numPointShadows!==A||_.numSpotShadows!==y||_.numSpotMaps!==z||_.numLightProbes!==w)&&(n.directional.length=m,n.spot.length=M,n.rectArea.length=p,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=y+z-E,n.spotLightMap.length=z,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=w,_.directionalLength=m,_.pointLength=g,_.spotLength=M,_.rectAreaLength=p,_.hemiLength=h,_.numDirectionalShadows=S,_.numPointShadows=A,_.numSpotShadows=y,_.numSpotMaps=z,_.numLightProbes=w,n.version=xv++)}function c(l,f){let u=0,d=0,m=0,g=0,M=0;const p=f.matrixWorldInverse;for(let h=0,S=l.length;h<S;h++){const A=l[h];if(A.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),u++}else if(A.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),m++}else if(A.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(p),r.identity(),a.copy(A.matrixWorld),a.premultiply(p),r.extractRotation(a),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(A.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(p),d++}else if(A.isHemisphereLight){const y=n.hemi[M];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(p),M++}}}return{setup:o,setupView:c,state:n}}function Pd(i){const e=new _v(i),t=[],n=[],s=[];function a(d){u.camera=d,t.length=0,n.length=0,s.length=0}function r(d){t.push(d)}function o(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function f(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:l,setupLightsView:f,pushLight:r,pushShadow:o,pushLightProbeGrid:c}}function vv(i){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new Pd(i),e.set(s,[o])):a>=r.length?(o=new Pd(i),r.push(o)):o=r[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Mv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yv=`uniform sampler2D shadow_pass;
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
}`,Sv=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],Ev=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Dd=new mt,ws=new F,qr=new F;function bv(i,e,t){let n=new Dl;const s=new Ue,a=new Ue,r=new pt,o=new Im,c=new Lm,l={},f=t.maxTextureSize,u={[pn]:Kt,[Kt]:pn,[Xi]:Xi},d=new Ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:Mv,fragmentShader:yv}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new Ui;g.setAttribute("position",new Di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new vi(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ta;let h=this.type;this.render=function(E,w,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===cu&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ta);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),L=i.state;L.setBlending($i),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const q=h!==this.type;q&&w.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(B=>B.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,B=E.length;Y<B;Y++){const K=E[Y],X=K.shadow;if(X===void 0){Ne("WebGLShadowMap:",K,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const ee=X.getFrameExtents();s.multiply(ee),a.copy(X.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(a.x=Math.floor(f/ee.x),s.x=a.x*ee.x,X.mapSize.x=a.x),s.y>f&&(a.y=Math.floor(f/ee.y),s.y=a.y*ee.y,X.mapSize.y=a.y));const ie=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=ie,X.map===null||q===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Ps){if(K.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Pi(s.x,s.y,{format:Nn,type:Zi,minFilter:Gt,magFilter:Gt,generateMipmaps:!1}),X.map.texture.name=K.name+".shadowMap",X.map.depthTexture=new ps(s.x,s.y,zi),X.map.depthTexture.name=K.name+".shadowMapDepth",X.map.depthTexture.format=Qi,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Pt,X.map.depthTexture.magFilter=Pt}else K.isPointLight?(X.map=new Fu(s.x),X.map.depthTexture=new Am(s.x,Li)):(X.map=new Pi(s.x,s.y),X.map.depthTexture=new ps(s.x,s.y,Li)),X.map.depthTexture.name=K.name+".shadowMap",X.map.depthTexture.format=Qi,this.type===Ta?(X.map.depthTexture.compareFunction=ie?Al:Tl,X.map.depthTexture.minFilter=Gt,X.map.depthTexture.magFilter=Gt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Pt,X.map.depthTexture.magFilter=Pt);X.camera.updateProjectionMatrix()}const pe=X.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<pe;_e++){if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,_e),i.clear();else{_e===0&&(i.setRenderTarget(X.map),i.clear());const Ee=X.getViewport(_e);r.set(a.x*Ee.x,a.y*Ee.y,a.x*Ee.z,a.y*Ee.w),L.viewport(r)}if(K.isPointLight){const Ee=X.camera,Je=X.matrix,ht=K.distance||Ee.far;ht!==Ee.far&&(Ee.far=ht,Ee.updateProjectionMatrix()),ws.setFromMatrixPosition(K.matrixWorld),Ee.position.copy(ws),qr.copy(Ee.position),qr.add(Sv[_e]),Ee.up.copy(Ev[_e]),Ee.lookAt(qr),Ee.updateMatrixWorld(),Je.makeTranslation(-ws.x,-ws.y,-ws.z),Dd.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Dd,Ee.coordinateSystem,Ee.reversedDepth)}else X.updateMatrices(K);n=X.getFrustum(),y(w,_,X.camera,K,this.type)}X.isPointLightShadow!==!0&&this.type===Ps&&S(X,_),X.needsUpdate=!1}h=this.type,p.needsUpdate=!1,i.setRenderTarget(T,P,C)};function S(E,w){const _=e.update(M);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Pi(s.x,s.y,{format:Nn,type:Zi})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(w,null,_,d,M,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(w,null,_,m,M,null)}function A(E,w,_,T){let P=null;const C=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)P=C;else if(P=_.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const L=P.uuid,q=w.uuid;let Y=l[L];Y===void 0&&(Y={},l[L]=Y);let B=Y[q];B===void 0&&(B=P.clone(),Y[q]=B,w.addEventListener("dispose",z)),P=B}if(P.visible=w.visible,P.wireframe=w.wireframe,T===Ps?P.side=w.shadowSide!==null?w.shadowSide:w.side:P.side=w.shadowSide!==null?w.shadowSide:u[w.side],P.alphaMap=w.alphaMap,P.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,P.map=w.map,P.clipShadows=w.clipShadows,P.clippingPlanes=w.clippingPlanes,P.clipIntersection=w.clipIntersection,P.displacementMap=w.displacementMap,P.displacementScale=w.displacementScale,P.displacementBias=w.displacementBias,P.wireframeLinewidth=w.wireframeLinewidth,P.linewidth=w.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const L=i.properties.get(P);L.light=_}return P}function y(E,w,_,T,P){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===Ps)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);const q=e.update(E),Y=E.material;if(Array.isArray(Y)){const B=q.groups;for(let K=0,X=B.length;K<X;K++){const ee=B[K],ie=Y[ee.materialIndex];if(ie&&ie.visible){const pe=A(E,ie,T,P);E.onBeforeShadow(i,E,w,_,q,pe,ee),i.renderBufferDirect(_,null,q,pe,E,ee),E.onAfterShadow(i,E,w,_,q,pe,ee)}}}else if(Y.visible){const B=A(E,Y,T,P);E.onBeforeShadow(i,E,w,_,q,B,null),i.renderBufferDirect(_,null,q,B,E,null),E.onAfterShadow(i,E,w,_,q,B,null)}}const L=E.children;for(let q=0,Y=L.length;q<Y;q++)y(L[q],w,_,T,P)}function z(E){E.target.removeEventListener("dispose",z);for(const _ in l){const T=l[_],P=E.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function Tv(i,e){function t(){let I=!1;const le=new pt;let Q=null;const fe=new pt(0,0,0,0);return{setMask:function(Me){Q!==Me&&!I&&(i.colorMask(Me,Me,Me,Me),Q=Me)},setLocked:function(Me){I=Me},setClear:function(Me,te,we,Te,gt){gt===!0&&(Me*=Te,te*=Te,we*=Te),le.set(Me,te,we,Te),fe.equals(le)===!1&&(i.clearColor(Me,te,we,Te),fe.copy(le))},reset:function(){I=!1,Q=null,fe.set(-1,0,0,0)}}}function n(){let I=!1,le=!1,Q=null,fe=null,Me=null;return{setReversed:function(te){if(le!==te){const we=e.get("EXT_clip_control");te?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),le=te;const Te=Me;Me=null,this.setClear(Te)}},getReversed:function(){return le},setTest:function(te){te?ne(i.DEPTH_TEST):R(i.DEPTH_TEST)},setMask:function(te){Q!==te&&!I&&(i.depthMask(te),Q=te)},setFunc:function(te){if(le&&(te=Bp[te]),fe!==te){switch(te){case ro:i.depthFunc(i.NEVER);break;case oo:i.depthFunc(i.ALWAYS);break;case lo:i.depthFunc(i.LESS);break;case hs:i.depthFunc(i.LEQUAL);break;case co:i.depthFunc(i.EQUAL);break;case uo:i.depthFunc(i.GEQUAL);break;case ho:i.depthFunc(i.GREATER);break;case fo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=te}},setLocked:function(te){I=te},setClear:function(te){Me!==te&&(Me=te,le&&(te=1-te),i.clearDepth(te))},reset:function(){I=!1,Q=null,fe=null,Me=null,le=!1}}}function s(){let I=!1,le=null,Q=null,fe=null,Me=null,te=null,we=null,Te=null,gt=null;return{setTest:function(dt){I||(dt?ne(i.STENCIL_TEST):R(i.STENCIL_TEST))},setMask:function(dt){le!==dt&&!I&&(i.stencilMask(dt),le=dt)},setFunc:function(dt,yi,Si){(Q!==dt||fe!==yi||Me!==Si)&&(i.stencilFunc(dt,yi,Si),Q=dt,fe=yi,Me=Si)},setOp:function(dt,yi,Si){(te!==dt||we!==yi||Te!==Si)&&(i.stencilOp(dt,yi,Si),te=dt,we=yi,Te=Si)},setLocked:function(dt){I=dt},setClear:function(dt){gt!==dt&&(i.clearStencil(dt),gt=dt)},reset:function(){I=!1,le=null,Q=null,fe=null,Me=null,te=null,we=null,Te=null,gt=null}}}const a=new t,r=new n,o=new s,c=new WeakMap,l=new WeakMap;let f={},u={},d={},m=new WeakMap,g=[],M=null,p=!1,h=null,S=null,A=null,y=null,z=null,E=null,w=null,_=new Ye(0,0,0),T=0,P=!1,C=null,L=null,q=null,Y=null,B=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ee=0;const ie=i.getParameter(i.VERSION);ie.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ie)[1]),X=ee>=1):ie.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),X=ee>=2);let pe=null,_e={};const Ee=i.getParameter(i.SCISSOR_BOX),Je=i.getParameter(i.VIEWPORT),ht=new pt().fromArray(Ee),Xe=new pt().fromArray(Je);function Z(I,le,Q,fe){const Me=new Uint8Array(4),te=i.createTexture();i.bindTexture(I,te),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<Q;we++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,fe,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(le+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return te}const oe={};oe[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),oe[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),oe[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),r.setFunc(hs),Ze(!1),He(Rc),ne(i.CULL_FACE),De($i);function ne(I){f[I]!==!0&&(i.enable(I),f[I]=!0)}function R(I){f[I]!==!1&&(i.disable(I),f[I]=!1)}function O(I,le){return d[I]!==le?(i.bindFramebuffer(I,le),d[I]=le,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=le),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=le),!0):!1}function V(I,le){let Q=g,fe=!1;if(I){Q=m.get(le),Q===void 0&&(Q=[],m.set(le,Q));const Me=I.textures;if(Q.length!==Me.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let te=0,we=Me.length;te<we;te++)Q[te]=i.COLOR_ATTACHMENT0+te;Q.length=Me.length,fe=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,fe=!0);fe&&i.drawBuffers(Q)}function be(I){return M!==I?(i.useProgram(I),M=I,!0):!1}const ae={[Tn]:i.FUNC_ADD,[lp]:i.FUNC_SUBTRACT,[cp]:i.FUNC_REVERSE_SUBTRACT};ae[dp]=i.MIN,ae[up]=i.MAX;const de={[hp]:i.ZERO,[fp]:i.ONE,[pp]:i.SRC_COLOR,[so]:i.SRC_ALPHA,[Mp]:i.SRC_ALPHA_SATURATE,[_p]:i.DST_COLOR,[xp]:i.DST_ALPHA,[mp]:i.ONE_MINUS_SRC_COLOR,[ao]:i.ONE_MINUS_SRC_ALPHA,[vp]:i.ONE_MINUS_DST_COLOR,[gp]:i.ONE_MINUS_DST_ALPHA,[yp]:i.CONSTANT_COLOR,[Sp]:i.ONE_MINUS_CONSTANT_COLOR,[Ep]:i.CONSTANT_ALPHA,[bp]:i.ONE_MINUS_CONSTANT_ALPHA};function De(I,le,Q,fe,Me,te,we,Te,gt,dt){if(I===$i){p===!0&&(R(i.BLEND),p=!1);return}if(p===!1&&(ne(i.BLEND),p=!0),I!==op){if(I!==h||dt!==P){if((S!==Tn||z!==Tn)&&(i.blendEquation(i.FUNC_ADD),S=Tn,z=Tn),dt)switch(I){case rs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Cc:i.blendFunc(i.ONE,i.ONE);break;case Pc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Dc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:$e("WebGLState: Invalid blending: ",I);break}else switch(I){case rs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Cc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Pc:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dc:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",I);break}A=null,y=null,E=null,w=null,_.set(0,0,0),T=0,h=I,P=dt}return}Me=Me||le,te=te||Q,we=we||fe,(le!==S||Me!==z)&&(i.blendEquationSeparate(ae[le],ae[Me]),S=le,z=Me),(Q!==A||fe!==y||te!==E||we!==w)&&(i.blendFuncSeparate(de[Q],de[fe],de[te],de[we]),A=Q,y=fe,E=te,w=we),(Te.equals(_)===!1||gt!==T)&&(i.blendColor(Te.r,Te.g,Te.b,gt),_.copy(Te),T=gt),h=I,P=!1}function ze(I,le){I.side===Xi?R(i.CULL_FACE):ne(i.CULL_FACE);let Q=I.side===Kt;le&&(Q=!Q),Ze(Q),I.blending===rs&&I.transparent===!1?De($i):De(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),r.setFunc(I.depthFunc),r.setTest(I.depthTest),r.setMask(I.depthWrite),a.setMask(I.colorWrite);const fe=I.stencilWrite;o.setTest(fe),fe&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Qe(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):R(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(I){C!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),C=I)}function He(I){I!==ap?(ne(i.CULL_FACE),I!==L&&(I===Rc?i.cullFace(i.BACK):I===rp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):R(i.CULL_FACE),L=I}function qe(I){I!==q&&(X&&i.lineWidth(I),q=I)}function Qe(I,le,Q){I?(ne(i.POLYGON_OFFSET_FILL),(Y!==le||B!==Q)&&(Y=le,B=Q,r.getReversed()&&(le=-le),i.polygonOffset(le,Q))):R(i.POLYGON_OFFSET_FILL)}function je(I){I?ne(i.SCISSOR_TEST):R(i.SCISSOR_TEST)}function at(I){I===void 0&&(I=i.TEXTURE0+K-1),pe!==I&&(i.activeTexture(I),pe=I)}function D(I,le,Q){Q===void 0&&(pe===null?Q=i.TEXTURE0+K-1:Q=pe);let fe=_e[Q];fe===void 0&&(fe={type:void 0,texture:void 0},_e[Q]=fe),(fe.type!==I||fe.texture!==le)&&(pe!==Q&&(i.activeTexture(Q),pe=Q),i.bindTexture(I,le||oe[I]),fe.type=I,fe.texture=le)}function At(){const I=_e[pe];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function tt(){try{i.compressedTexImage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function b(){try{i.compressedTexImage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function x(){try{i.texSubImage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function U(){try{i.texSubImage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function se(){try{i.texStorage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function ce(){try{i.texStorage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function J(){try{i.texImage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function j(){try{i.texImage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function ue(I){return u[I]!==void 0?u[I]:i.getParameter(I)}function Re(I,le){u[I]!==le&&(i.pixelStorei(I,le),u[I]=le)}function me(I){ht.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),ht.copy(I))}function he(I){Xe.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Xe.copy(I))}function Ie(I,le){let Q=l.get(le);Q===void 0&&(Q=new WeakMap,l.set(le,Q));let fe=Q.get(I);fe===void 0&&(fe=i.getUniformBlockIndex(le,I.name),Q.set(I,fe))}function Le(I,le){const fe=l.get(le).get(I);c.get(le)!==fe&&(i.uniformBlockBinding(le,fe,I.__bindingPointIndex),c.set(le,fe))}function Be(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),f={},u={},pe=null,_e={},d={},m=new WeakMap,g=[],M=null,p=!1,h=null,S=null,A=null,y=null,z=null,E=null,w=null,_=new Ye(0,0,0),T=0,P=!1,C=null,L=null,q=null,Y=null,B=null,ht.set(0,0,i.canvas.width,i.canvas.height),Xe.set(0,0,i.canvas.width,i.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:ne,disable:R,bindFramebuffer:O,drawBuffers:V,useProgram:be,setBlending:De,setMaterial:ze,setFlipSided:Ze,setCullFace:He,setLineWidth:qe,setPolygonOffset:Qe,setScissorTest:je,activeTexture:at,bindTexture:D,unbindTexture:At,compressedTexImage2D:tt,compressedTexImage3D:b,texImage2D:J,texImage3D:j,pixelStorei:Re,getParameter:ue,updateUBOMapping:Ie,uniformBlockBinding:Le,texStorage2D:se,texStorage3D:ce,texSubImage2D:x,texSubImage3D:U,compressedTexSubImage2D:k,compressedTexSubImage3D:$,scissor:me,viewport:he,reset:Be}}function Av(i,e,t,n,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ue,f=new WeakMap,u=new Set;let d;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(b,x){return g?new OffscreenCanvas(b,x):Va("canvas")}function p(b,x,U){let k=1;const $=tt(b);if(($.width>U||$.height>U)&&(k=U/Math.max($.width,$.height)),k<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const se=Math.floor(k*$.width),ce=Math.floor(k*$.height);d===void 0&&(d=M(se,ce));const J=x?M(se,ce):d;return J.width=se,J.height=ce,J.getContext("2d").drawImage(b,0,0,se,ce),Ne("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+se+"x"+ce+")."),J}else return"data"in b&&Ne("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),b;return b}function h(b){return b.generateMipmaps}function S(b){i.generateMipmap(b)}function A(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(b,x,U,k,$,se=!1){if(b!==null){if(i[b]!==void 0)return i[b];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ce;k&&(ce=e.get("EXT_texture_norm16"),ce||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=x;if(x===i.RED&&(U===i.FLOAT&&(J=i.R32F),U===i.HALF_FLOAT&&(J=i.R16F),U===i.UNSIGNED_BYTE&&(J=i.R8),U===i.UNSIGNED_SHORT&&ce&&(J=ce.R16_EXT),U===i.SHORT&&ce&&(J=ce.R16_SNORM_EXT)),x===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.R8UI),U===i.UNSIGNED_SHORT&&(J=i.R16UI),U===i.UNSIGNED_INT&&(J=i.R32UI),U===i.BYTE&&(J=i.R8I),U===i.SHORT&&(J=i.R16I),U===i.INT&&(J=i.R32I)),x===i.RG&&(U===i.FLOAT&&(J=i.RG32F),U===i.HALF_FLOAT&&(J=i.RG16F),U===i.UNSIGNED_BYTE&&(J=i.RG8),U===i.UNSIGNED_SHORT&&ce&&(J=ce.RG16_EXT),U===i.SHORT&&ce&&(J=ce.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RG8UI),U===i.UNSIGNED_SHORT&&(J=i.RG16UI),U===i.UNSIGNED_INT&&(J=i.RG32UI),U===i.BYTE&&(J=i.RG8I),U===i.SHORT&&(J=i.RG16I),U===i.INT&&(J=i.RG32I)),x===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RGB8UI),U===i.UNSIGNED_SHORT&&(J=i.RGB16UI),U===i.UNSIGNED_INT&&(J=i.RGB32UI),U===i.BYTE&&(J=i.RGB8I),U===i.SHORT&&(J=i.RGB16I),U===i.INT&&(J=i.RGB32I)),x===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),U===i.UNSIGNED_INT&&(J=i.RGBA32UI),U===i.BYTE&&(J=i.RGBA8I),U===i.SHORT&&(J=i.RGBA16I),U===i.INT&&(J=i.RGBA32I)),x===i.RGB&&(U===i.UNSIGNED_SHORT&&ce&&(J=ce.RGB16_EXT),U===i.SHORT&&ce&&(J=ce.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),x===i.RGBA){const j=se?ka:Ke.getTransfer($);U===i.FLOAT&&(J=i.RGBA32F),U===i.HALF_FLOAT&&(J=i.RGBA16F),U===i.UNSIGNED_BYTE&&(J=j===it?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&ce&&(J=ce.RGBA16_EXT),U===i.SHORT&&ce&&(J=ce.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function z(b,x){let U;return b?x===null||x===Li||x===Ws?U=i.DEPTH24_STENCIL8:x===zi?U=i.DEPTH32F_STENCIL8:x===Vs&&(U=i.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Li||x===Ws?U=i.DEPTH_COMPONENT24:x===zi?U=i.DEPTH_COMPONENT32F:x===Vs&&(U=i.DEPTH_COMPONENT16),U}function E(b,x){return h(b)===!0||b.isFramebufferTexture&&b.minFilter!==Pt&&b.minFilter!==Gt?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function w(b){const x=b.target;x.removeEventListener("dispose",w),T(x),x.isVideoTexture&&f.delete(x),x.isHTMLTexture&&u.delete(x)}function _(b){const x=b.target;x.removeEventListener("dispose",_),C(x)}function T(b){const x=n.get(b);if(x.__webglInit===void 0)return;const U=b.source,k=m.get(U);if(k){const $=k[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&P(b),Object.keys(k).length===0&&m.delete(U)}n.remove(b)}function P(b){const x=n.get(b);i.deleteTexture(x.__webglTexture);const U=b.source,k=m.get(U);delete k[x.__cacheKey],r.memory.textures--}function C(b){const x=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(x.__webglFramebuffer[k]))for(let $=0;$<x.__webglFramebuffer[k].length;$++)i.deleteFramebuffer(x.__webglFramebuffer[k][$]);else i.deleteFramebuffer(x.__webglFramebuffer[k]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[k])}else{if(Array.isArray(x.__webglFramebuffer))for(let k=0;k<x.__webglFramebuffer.length;k++)i.deleteFramebuffer(x.__webglFramebuffer[k]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let k=0;k<x.__webglColorRenderbuffer.length;k++)x.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[k]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const U=b.textures;for(let k=0,$=U.length;k<$;k++){const se=n.get(U[k]);se.__webglTexture&&(i.deleteTexture(se.__webglTexture),r.memory.textures--),n.remove(U[k])}n.remove(b)}let L=0;function q(){L=0}function Y(){return L}function B(b){L=b}function K(){const b=L;return b>=s.maxTextures&&Ne("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),L+=1,b}function X(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function ee(b,x){const U=n.get(b);if(b.isVideoTexture&&D(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&U.__version!==b.version){const k=b.image;if(k===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{R(U,b,x);return}}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+x)}function ie(b,x){const U=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){R(U,b,x);return}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+x)}function pe(b,x){const U=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){R(U,b,x);return}t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+x)}function _e(b,x){const U=n.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&U.__version!==b.version){O(U,b,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+x)}const Ee={[po]:i.REPEAT,[qi]:i.CLAMP_TO_EDGE,[mo]:i.MIRRORED_REPEAT},Je={[Pt]:i.NEAREST,[zp]:i.NEAREST_MIPMAP_NEAREST,[ta]:i.NEAREST_MIPMAP_LINEAR,[Gt]:i.LINEAR,[xr]:i.LINEAR_MIPMAP_NEAREST,[wn]:i.LINEAR_MIPMAP_LINEAR},ht={[Cp]:i.NEVER,[Np]:i.ALWAYS,[Pp]:i.LESS,[Tl]:i.LEQUAL,[Dp]:i.EQUAL,[Al]:i.GEQUAL,[Ip]:i.GREATER,[Lp]:i.NOTEQUAL};function Xe(b,x){if(x.type===zi&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Gt||x.magFilter===xr||x.magFilter===ta||x.magFilter===wn||x.minFilter===Gt||x.minFilter===xr||x.minFilter===ta||x.minFilter===wn)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,Ee[x.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Ee[x.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Ee[x.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,Je[x.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,Je[x.minFilter]),x.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,ht[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Pt||x.minFilter!==ta&&x.minFilter!==wn||x.type===zi&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Z(b,x){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",w));const k=x.source;let $=m.get(k);$===void 0&&($={},m.set(k,$));const se=X(x);if(se!==b.__cacheKey){$[se]===void 0&&($[se]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,U=!0),$[se].usedTimes++;const ce=$[b.__cacheKey];ce!==void 0&&($[b.__cacheKey].usedTimes--,ce.usedTimes===0&&P(x)),b.__cacheKey=se,b.__webglTexture=$[se].texture}return U}function oe(b,x,U){return Math.floor(Math.floor(b/U)/x)}function ne(b,x,U,k){const se=b.updateRanges;if(se.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,U,k,x.data);else{se.sort((Re,me)=>Re.start-me.start);let ce=0;for(let Re=1;Re<se.length;Re++){const me=se[ce],he=se[Re],Ie=me.start+me.count,Le=oe(he.start,x.width,4),Be=oe(me.start,x.width,4);he.start<=Ie+1&&Le===Be&&oe(he.start+he.count-1,x.width,4)===Le?me.count=Math.max(me.count,he.start+he.count-me.start):(++ce,se[ce]=he)}se.length=ce+1;const J=t.getParameter(i.UNPACK_ROW_LENGTH),j=t.getParameter(i.UNPACK_SKIP_PIXELS),ue=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Re=0,me=se.length;Re<me;Re++){const he=se[Re],Ie=Math.floor(he.start/4),Le=Math.ceil(he.count/4),Be=Ie%x.width,I=Math.floor(Ie/x.width),le=Le,Q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Be),t.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,Be,I,le,Q,U,k,x.data)}b.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,j),t.pixelStorei(i.UNPACK_SKIP_ROWS,ue)}}function R(b,x,U){let k=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(k=i.TEXTURE_3D);const $=Z(b,x),se=x.source;t.bindTexture(k,b.__webglTexture,i.TEXTURE0+U);const ce=n.get(se);if(se.version!==ce.__version||$===!0){if(t.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const Q=Ke.getPrimaries(Ke.workingColorSpace),fe=x.colorSpace===dn?null:Ke.getPrimaries(x.colorSpace),Me=x.colorSpace===dn||Q===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let j=p(x.image,!1,s.maxTextureSize);j=At(x,j);const ue=a.convert(x.format,x.colorSpace),Re=a.convert(x.type);let me=y(x.internalFormat,ue,Re,x.normalized,x.colorSpace,x.isVideoTexture);Xe(k,x);let he;const Ie=x.mipmaps,Le=x.isVideoTexture!==!0,Be=ce.__version===void 0||$===!0,I=se.dataReady,le=E(x,j);if(x.isDepthTexture)me=z(x.format===Rn,x.type),Be&&(Le?t.texStorage2D(i.TEXTURE_2D,1,me,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,me,j.width,j.height,0,ue,Re,null));else if(x.isDataTexture)if(Ie.length>0){Le&&Be&&t.texStorage2D(i.TEXTURE_2D,le,me,Ie[0].width,Ie[0].height);for(let Q=0,fe=Ie.length;Q<fe;Q++)he=Ie[Q],Le?I&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,ue,Re,he.data):t.texImage2D(i.TEXTURE_2D,Q,me,he.width,he.height,0,ue,Re,he.data);x.generateMipmaps=!1}else Le?(Be&&t.texStorage2D(i.TEXTURE_2D,le,me,j.width,j.height),I&&ne(x,j,ue,Re)):t.texImage2D(i.TEXTURE_2D,0,me,j.width,j.height,0,ue,Re,j.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Le&&Be&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,me,Ie[0].width,Ie[0].height,j.depth);for(let Q=0,fe=Ie.length;Q<fe;Q++)if(he=Ie[Q],x.format!==_i)if(ue!==null)if(Le){if(I)if(x.layerUpdates.size>0){const Me=cd(he.width,he.height,x.format,x.type);for(const te of x.layerUpdates){const we=he.data.subarray(te*Me/he.data.BYTES_PER_ELEMENT,(te+1)*Me/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,te,he.width,he.height,1,ue,we)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,j.depth,ue,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,me,he.width,he.height,j.depth,0,he.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,j.depth,ue,Re,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,me,he.width,he.height,j.depth,0,ue,Re,he.data)}else{Le&&Be&&t.texStorage2D(i.TEXTURE_2D,le,me,Ie[0].width,Ie[0].height);for(let Q=0,fe=Ie.length;Q<fe;Q++)he=Ie[Q],x.format!==_i?ue!==null?Le?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,ue,he.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,me,he.width,he.height,0,he.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?I&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,ue,Re,he.data):t.texImage2D(i.TEXTURE_2D,Q,me,he.width,he.height,0,ue,Re,he.data)}else if(x.isDataArrayTexture)if(Le){if(Be&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,me,j.width,j.height,j.depth),I)if(x.layerUpdates.size>0){const Q=cd(j.width,j.height,x.format,x.type);for(const fe of x.layerUpdates){const Me=j.data.subarray(fe*Q/j.data.BYTES_PER_ELEMENT,(fe+1)*Q/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,fe,j.width,j.height,1,ue,Re,Me)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ue,Re,j.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,j.width,j.height,j.depth,0,ue,Re,j.data);else if(x.isData3DTexture)Le?(Be&&t.texStorage3D(i.TEXTURE_3D,le,me,j.width,j.height,j.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ue,Re,j.data)):t.texImage3D(i.TEXTURE_3D,0,me,j.width,j.height,j.depth,0,ue,Re,j.data);else if(x.isFramebufferTexture){if(Be)if(Le)t.texStorage2D(i.TEXTURE_2D,le,me,j.width,j.height);else{let Q=j.width,fe=j.height;for(let Me=0;Me<le;Me++)t.texImage2D(i.TEXTURE_2D,Me,me,Q,fe,0,ue,Re,null),Q>>=1,fe>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const Q=i.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),j.parentNode!==Q){Q.appendChild(j),u.add(x),Q.onpaint=fe=>{const Me=fe.changedElements;for(const te of u)Me.includes(te.image)&&(te.needsUpdate=!0)},Q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{const Me=i.RGBA,te=i.RGBA,we=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Me,te,we,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Le&&Be){const Q=tt(Ie[0]);t.texStorage2D(i.TEXTURE_2D,le,me,Q.width,Q.height)}for(let Q=0,fe=Ie.length;Q<fe;Q++)he=Ie[Q],Le?I&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,ue,Re,he):t.texImage2D(i.TEXTURE_2D,Q,me,ue,Re,he);x.generateMipmaps=!1}else if(Le){if(Be){const Q=tt(j);t.texStorage2D(i.TEXTURE_2D,le,me,Q.width,Q.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Re,j)}else t.texImage2D(i.TEXTURE_2D,0,me,ue,Re,j);h(x)&&S(k),ce.__version=se.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function O(b,x,U){if(x.image.length!==6)return;const k=Z(b,x),$=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+U);const se=n.get($);if($.version!==se.__version||k===!0){t.activeTexture(i.TEXTURE0+U);const ce=Ke.getPrimaries(Ke.workingColorSpace),J=x.colorSpace===dn?null:Ke.getPrimaries(x.colorSpace),j=x.colorSpace===dn||ce===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const ue=x.isCompressedTexture||x.image[0].isCompressedTexture,Re=x.image[0]&&x.image[0].isDataTexture,me=[];for(let te=0;te<6;te++)!ue&&!Re?me[te]=p(x.image[te],!0,s.maxCubemapSize):me[te]=Re?x.image[te].image:x.image[te],me[te]=At(x,me[te]);const he=me[0],Ie=a.convert(x.format,x.colorSpace),Le=a.convert(x.type),Be=y(x.internalFormat,Ie,Le,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,le=se.__version===void 0||k===!0,Q=$.dataReady;let fe=E(x,he);Xe(i.TEXTURE_CUBE_MAP,x);let Me;if(ue){I&&le&&t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Be,he.width,he.height);for(let te=0;te<6;te++){Me=me[te].mipmaps;for(let we=0;we<Me.length;we++){const Te=Me[we];x.format!==_i?Ie!==null?I?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,we,0,0,Te.width,Te.height,Ie,Te.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,we,Be,Te.width,Te.height,0,Te.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,we,0,0,Te.width,Te.height,Ie,Le,Te.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,we,Be,Te.width,Te.height,0,Ie,Le,Te.data)}}}else{if(Me=x.mipmaps,I&&le){Me.length>0&&fe++;const te=tt(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Be,te.width,te.height)}for(let te=0;te<6;te++)if(Re){I?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,me[te].width,me[te].height,Ie,Le,me[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Be,me[te].width,me[te].height,0,Ie,Le,me[te].data);for(let we=0;we<Me.length;we++){const gt=Me[we].image[te].image;I?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,we+1,0,0,gt.width,gt.height,Ie,Le,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,we+1,Be,gt.width,gt.height,0,Ie,Le,gt.data)}}else{I?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ie,Le,me[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Be,Ie,Le,me[te]);for(let we=0;we<Me.length;we++){const Te=Me[we];I?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,we+1,0,0,Ie,Le,Te.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,we+1,Be,Ie,Le,Te.image[te])}}}h(x)&&S(i.TEXTURE_CUBE_MAP),se.__version=$.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function V(b,x,U,k,$,se){const ce=a.convert(U.format,U.colorSpace),J=a.convert(U.type),j=y(U.internalFormat,ce,J,U.normalized,U.colorSpace),ue=n.get(x),Re=n.get(U);if(Re.__renderTarget=x,!ue.__hasExternalTextures){const me=Math.max(1,x.width>>se),he=Math.max(1,x.height>>se);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,se,j,me,he,x.depth,0,ce,J,null):t.texImage2D($,se,j,me,he,0,ce,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),at(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,$,Re.__webglTexture,0,je(x)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,$,Re.__webglTexture,se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function be(b,x,U){if(i.bindRenderbuffer(i.RENDERBUFFER,b),x.depthBuffer){const k=x.depthTexture,$=k&&k.isDepthTexture?k.type:null,se=z(x.stencilBuffer,$),ce=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;at(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,je(x),se,x.width,x.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,je(x),se,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,se,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,b)}else{const k=x.textures;for(let $=0;$<k.length;$++){const se=k[$],ce=a.convert(se.format,se.colorSpace),J=a.convert(se.type),j=y(se.internalFormat,ce,J,se.normalized,se.colorSpace);at(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,je(x),j,x.width,x.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,je(x),j,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,j,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ae(b,x,U){const k=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=n.get(x.depthTexture);if($.__renderTarget=x,(!$.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),k){if($.__webglInit===void 0&&($.__webglInit=!0,x.depthTexture.addEventListener("dispose",w)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,x.depthTexture);const ue=a.convert(x.depthTexture.format),Re=a.convert(x.depthTexture.type);let me;x.depthTexture.format===Qi?me=i.DEPTH_COMPONENT24:x.depthTexture.format===Rn&&(me=i.DEPTH24_STENCIL8);for(let he=0;he<6;he++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,me,x.width,x.height,0,ue,Re,null)}}else ee(x.depthTexture,0);const se=$.__webglTexture,ce=je(x),J=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,j=x.depthTexture.format===Rn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Qi)at(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,J,se,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,j,J,se,0);else if(x.depthTexture.format===Rn)at(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,J,se,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,j,J,se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function de(b){const x=n.get(b),U=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const k=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),k){const $=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,k.removeEventListener("dispose",$)};k.addEventListener("dispose",$),x.__depthDisposeCallback=$}x.__boundDepthTexture=k}if(b.depthTexture&&!x.__autoAllocateDepthBuffer)if(U)for(let k=0;k<6;k++)ae(x.__webglFramebuffer[k],b,k);else{const k=b.texture.mipmaps;k&&k.length>0?ae(x.__webglFramebuffer[0],b,0):ae(x.__webglFramebuffer,b,0)}else if(U){x.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[k]),x.__webglDepthbuffer[k]===void 0)x.__webglDepthbuffer[k]=i.createRenderbuffer(),be(x.__webglDepthbuffer[k],b,!1);else{const $=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=x.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,se)}}else{const k=b.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),be(x.__webglDepthbuffer,b,!1);else{const $=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,se)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(b,x,U){const k=n.get(b);x!==void 0&&V(k.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&de(b)}function ze(b){const x=b.texture,U=n.get(b),k=n.get(x);b.addEventListener("dispose",_);const $=b.textures,se=b.isWebGLCubeRenderTarget===!0,ce=$.length>1;if(ce||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=x.version,r.memory.textures++),se){U.__webglFramebuffer=[];for(let J=0;J<6;J++)if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer[J]=[];for(let j=0;j<x.mipmaps.length;j++)U.__webglFramebuffer[J][j]=i.createFramebuffer()}else U.__webglFramebuffer[J]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer=[];for(let J=0;J<x.mipmaps.length;J++)U.__webglFramebuffer[J]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(ce)for(let J=0,j=$.length;J<j;J++){const ue=n.get($[J]);ue.__webglTexture===void 0&&(ue.__webglTexture=i.createTexture(),r.memory.textures++)}if(b.samples>0&&at(b)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let J=0;J<$.length;J++){const j=$[J];U.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[J]);const ue=a.convert(j.format,j.colorSpace),Re=a.convert(j.type),me=y(j.internalFormat,ue,Re,j.normalized,j.colorSpace,b.isXRRenderTarget===!0),he=je(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,he,me,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,U.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),be(U.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,x);for(let J=0;J<6;J++)if(x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)V(U.__webglFramebuffer[J][j],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,j);else V(U.__webglFramebuffer[J],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);h(x)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let J=0,j=$.length;J<j;J++){const ue=$[J],Re=n.get(ue);let me=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(me=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,Re.__webglTexture),Xe(me,ue),V(U.__webglFramebuffer,b,ue,i.COLOR_ATTACHMENT0+J,me,0),h(ue)&&S(me)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(J=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,k.__webglTexture),Xe(J,x),x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)V(U.__webglFramebuffer[j],b,x,i.COLOR_ATTACHMENT0,J,j);else V(U.__webglFramebuffer,b,x,i.COLOR_ATTACHMENT0,J,0);h(x)&&S(J),t.unbindTexture()}b.depthBuffer&&de(b)}function Ze(b){const x=b.textures;for(let U=0,k=x.length;U<k;U++){const $=x[U];if(h($)){const se=A(b),ce=n.get($).__webglTexture;t.bindTexture(se,ce),S(se),t.unbindTexture()}}}const He=[],qe=[];function Qe(b){if(b.samples>0){if(at(b)===!1){const x=b.textures,U=b.width,k=b.height;let $=i.COLOR_BUFFER_BIT;const se=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(b),J=x.length>1;if(J)for(let ue=0;ue<x.length;ue++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const j=b.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ue=0;ue<x.length;ue++){if(b.resolveDepthBuffer&&(b.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const Re=n.get(x[ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Re,0)}i.blitFramebuffer(0,0,U,k,0,0,U,k,$,i.NEAREST),c===!0&&(He.length=0,qe.length=0,He.push(i.COLOR_ATTACHMENT0+ue),b.depthBuffer&&b.resolveDepthBuffer===!1&&(He.push(se),qe.push(se),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,qe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,He))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let ue=0;ue<x.length;ue++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const Re=n.get(x[ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,Re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const x=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function je(b){return Math.min(s.maxSamples,b.samples)}function at(b){const x=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function D(b){const x=r.render.frame;f.get(b)!==x&&(f.set(b,x),b.update())}function At(b,x){const U=b.colorSpace,k=b.format,$=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==Ha&&U!==dn&&(Ke.getTransfer(U)===it?(k!==_i||$!==ei)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",U)),x}function tt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=K,this.resetTextureUnits=q,this.getTextureUnits=Y,this.setTextureUnits=B,this.setTexture2D=ee,this.setTexture2DArray=ie,this.setTexture3D=pe,this.setTextureCube=_e,this.rebindTextures=De,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=V,this.useMultisampledRTT=at,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function zv(i,e){function t(n,s=dn){let a;const r=Ke.getTransfer(s);if(n===ei)return i.UNSIGNED_BYTE;if(n===Ml)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===_u)return i.BYTE;if(n===vu)return i.SHORT;if(n===Vs)return i.UNSIGNED_SHORT;if(n===vl)return i.INT;if(n===Li)return i.UNSIGNED_INT;if(n===zi)return i.FLOAT;if(n===Zi)return i.HALF_FLOAT;if(n===Su)return i.ALPHA;if(n===Eu)return i.RGB;if(n===_i)return i.RGBA;if(n===Qi)return i.DEPTH_COMPONENT;if(n===Rn)return i.DEPTH_STENCIL;if(n===bu)return i.RED;if(n===Sl)return i.RED_INTEGER;if(n===Nn)return i.RG;if(n===El)return i.RG_INTEGER;if(n===bl)return i.RGBA_INTEGER;if(n===Aa||n===za||n===wa||n===Ra)if(r===it)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Aa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===za)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ra)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Aa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===za)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wa)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ra)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xo||n===go||n===_o||n===vo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===xo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===go)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_o)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Mo||n===yo||n===So||n===Eo||n===bo||n===Ba||n===To)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===Mo||n===yo)return r===it?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===So)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(n===Eo)return a.COMPRESSED_R11_EAC;if(n===bo)return a.COMPRESSED_SIGNED_R11_EAC;if(n===Ba)return a.COMPRESSED_RG11_EAC;if(n===To)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ao||n===zo||n===wo||n===Ro||n===Co||n===Po||n===Do||n===Io||n===Lo||n===No||n===Uo||n===Fo||n===Oo||n===Bo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===Ao)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zo)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wo)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ro)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Co)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Po)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Do)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Io)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Lo)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===No)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uo)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fo)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oo)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bo)return r===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Go||n===Ho||n===ko)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===Go)return r===it?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ho)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ko)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vo||n===Wo||n===Ga||n===Xo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===Vo)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Wo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ga)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const wv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rv=`
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

}`;class Cv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Pu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ni({vertexShader:wv,fragmentShader:Rv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vi(new fn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pv extends gn{constructor(e,t){super();const n=this;let s=null,a=1,r=null,o="local-floor",c=1,l=null,f=null,u=null,d=null,m=null,g=null;const M=typeof XRWebGLBinding<"u",p=new Cv,h={},S=t.getContextAttributes();let A=null,y=null;const z=[],E=[],w=new Ue;let _=null;const T=new mi;T.viewport=new pt;const P=new mi;P.viewport=new pt;const C=[T,P],L=new Bm;let q=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let oe=z[Z];return oe===void 0&&(oe=new Sr,z[Z]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(Z){let oe=z[Z];return oe===void 0&&(oe=new Sr,z[Z]=oe),oe.getGripSpace()},this.getHand=function(Z){let oe=z[Z];return oe===void 0&&(oe=new Sr,z[Z]=oe),oe.getHandSpace()};function B(Z){const oe=E.indexOf(Z.inputSource);if(oe===-1)return;const ne=z[oe];ne!==void 0&&(ne.update(Z.inputSource,Z.frame,l||r),ne.dispatchEvent({type:Z.type,data:Z.inputSource}))}function K(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",X);for(let Z=0;Z<z.length;Z++){const oe=E[Z];oe!==null&&(E[Z]=null,z[Z].disconnect(oe))}q=null,Y=null,p.reset();for(const Z in h)delete h[Z];e.setRenderTarget(A),m=null,d=null,u=null,s=null,y=null,Xe.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,n.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",K),s.addEventListener("inputsourceschange",X),S.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(w),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,R=null,O=null;S.depth&&(O=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=S.stencil?Rn:Qi,R=S.stencil?Ws:Li);const V={colorFormat:t.RGBA8,depthFormat:O,scaleFactor:a};u=this.getBinding(),d=u.createProjectionLayer(V),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Pi(d.textureWidth,d.textureHeight,{format:_i,type:ei,depthTexture:new ps(d.textureWidth,d.textureHeight,R,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ne={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new Pi(m.framebufferWidth,m.framebufferHeight,{format:_i,type:ei,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(o),Xe.setContext(s),Xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function X(Z){for(let oe=0;oe<Z.removed.length;oe++){const ne=Z.removed[oe],R=E.indexOf(ne);R>=0&&(E[R]=null,z[R].disconnect(ne))}for(let oe=0;oe<Z.added.length;oe++){const ne=Z.added[oe];let R=E.indexOf(ne);if(R===-1){for(let V=0;V<z.length;V++)if(V>=E.length){E.push(ne),R=V;break}else if(E[V]===null){E[V]=ne,R=V;break}if(R===-1)break}const O=z[R];O&&O.connect(ne)}}const ee=new F,ie=new F;function pe(Z,oe,ne){ee.setFromMatrixPosition(oe.matrixWorld),ie.setFromMatrixPosition(ne.matrixWorld);const R=ee.distanceTo(ie),O=oe.projectionMatrix.elements,V=ne.projectionMatrix.elements,be=O[14]/(O[10]-1),ae=O[14]/(O[10]+1),de=(O[9]+1)/O[5],De=(O[9]-1)/O[5],ze=(O[8]-1)/O[0],Ze=(V[8]+1)/V[0],He=be*ze,qe=be*Ze,Qe=R/(-ze+Ze),je=Qe*-ze;if(oe.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(je),Z.translateZ(Qe),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),O[10]===-1)Z.projectionMatrix.copy(oe.projectionMatrix),Z.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const at=be+Qe,D=ae+Qe,At=He-je,tt=qe+(R-je),b=de*ae/D*at,x=De*ae/D*at;Z.projectionMatrix.makePerspective(At,tt,b,x,at,D),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function _e(Z,oe){oe===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(oe.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let oe=Z.near,ne=Z.far;p.texture!==null&&(p.depthNear>0&&(oe=p.depthNear),p.depthFar>0&&(ne=p.depthFar)),L.near=P.near=T.near=oe,L.far=P.far=T.far=ne,(q!==L.near||Y!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),q=L.near,Y=L.far),L.layers.mask=Z.layers.mask|6,T.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;const R=Z.parent,O=L.cameras;_e(L,R);for(let V=0;V<O.length;V++)_e(O[V],R);O.length===2?pe(L,T,P):L.projectionMatrix.copy(T.projectionMatrix),Ee(Z,L,R)};function Ee(Z,oe,ne){ne===null?Z.matrix.copy(oe.matrixWorld):(Z.matrix.copy(ne.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(oe.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(oe.projectionMatrix),Z.projectionMatrixInverse.copy(oe.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=qs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(Z){c=Z,d!==null&&(d.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(L)},this.getCameraTexture=function(Z){return h[Z]};let Je=null;function ht(Z,oe){if(f=oe.getViewerPose(l||r),g=oe,f!==null){const ne=f.views;m!==null&&(e.setRenderTargetFramebuffer(y,m.framebuffer),e.setRenderTarget(y));let R=!1;ne.length!==L.cameras.length&&(L.cameras.length=0,R=!0);for(let ae=0;ae<ne.length;ae++){const de=ne[ae];let De=null;if(m!==null)De=m.getViewport(de);else{const Ze=u.getViewSubImage(d,de);De=Ze.viewport,ae===0&&(e.setRenderTargetTextures(y,Ze.colorTexture,Ze.depthStencilTexture),e.setRenderTarget(y))}let ze=C[ae];ze===void 0&&(ze=new mi,ze.layers.enable(ae),ze.viewport=new pt,C[ae]=ze),ze.matrix.fromArray(de.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(de.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(De.x,De.y,De.width,De.height),ae===0&&(L.matrix.copy(ze.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),R===!0&&L.cameras.push(ze)}const O=s.enabledFeatures;if(O&&O.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const ae=u.getDepthInformation(ne[0]);ae&&ae.isValid&&ae.texture&&p.init(ae,s.renderState)}if(O&&O.includes("camera-access")&&M){e.state.unbindTexture(),u=n.getBinding();for(let ae=0;ae<ne.length;ae++){const de=ne[ae].camera;if(de){let De=h[de];De||(De=new Pu,h[de]=De);const ze=u.getCameraImage(de);De.sourceTexture=ze}}}}for(let ne=0;ne<z.length;ne++){const R=E[ne],O=z[ne];R!==null&&O!==void 0&&O.update(R,oe,l||r)}Je&&Je(Z,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),g=null}const Xe=new Nu;Xe.setAnimationLoop(ht),this.setAnimationLoop=function(Z){Je=Z},this.dispose=function(){}}}const Dv=new mt,ku=new Fe;ku.set(-1,0,0,0,1,0,0,0,1);function Iv(i,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function n(p,h){h.color.getRGB(p.fogColor.value,Du(i)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function s(p,h,S,A,y){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?a(p,h):h.isMeshLambertMaterial?(a(p,h),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(a(p,h),u(p,h)):h.isMeshPhongMaterial?(a(p,h),f(p,h),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(a(p,h),d(p,h),h.isMeshPhysicalMaterial&&m(p,h,y)):h.isMeshMatcapMaterial?(a(p,h),g(p,h)):h.isMeshDepthMaterial?a(p,h):h.isMeshDistanceMaterial?(a(p,h),M(p,h)):h.isMeshNormalMaterial?a(p,h):h.isLineBasicMaterial?(r(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?c(p,h,S,A):h.isSpriteMaterial?l(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Kt&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Kt&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const S=e.get(h),A=S.envMap,y=S.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(Dv.makeRotationFromEuler(y)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(ku),p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function r(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function c(p,h,S,A){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*S,p.scale.value=A*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function l(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function f(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function u(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function d(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,S){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Kt&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,h){h.matcap&&(p.matcap.value=h.matcap)}function M(p,h){const S=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Lv(i,e,t,n){let s={},a={},r=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,z){const E=z.program;n.uniformBlockBinding(y,E)}function l(y,z){let E=s[y.id];E===void 0&&(p(y),E=f(y),s[y.id]=E,y.addEventListener("dispose",S));const w=z.program;n.updateUBOMapping(y,w);const _=e.render.frame;a[y.id]!==_&&(d(y),a[y.id]=_)}function f(y){const z=u();y.__bindingPointIndex=z;const E=i.createBuffer(),w=y.__size,_=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,w,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,z,E),E}function u(){for(let y=0;y<o;y++)if(r.indexOf(y)===-1)return r.push(y),y;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const z=s[y.id],E=y.uniforms,w=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,z);for(let _=0,T=E.length;_<T;_++){const P=E[_];if(Array.isArray(P))for(let C=0,L=P.length;C<L;C++)m(P[C],_,C,w);else m(P,_,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(y,z,E,w){if(M(y,z,E,w)===!0){const _=y.__offset,T=y.value;if(Array.isArray(T)){let P=0;for(let C=0;C<T.length;C++){const L=T[C],q=h(L);g(L,y.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,y.__data)}}function g(y,z,E){typeof y=="number"||typeof y=="boolean"?z[0]=y:y.isMatrix3?(z[0]=y.elements[0],z[1]=y.elements[1],z[2]=y.elements[2],z[3]=0,z[4]=y.elements[3],z[5]=y.elements[4],z[6]=y.elements[5],z[7]=0,z[8]=y.elements[6],z[9]=y.elements[7],z[10]=y.elements[8],z[11]=0):ArrayBuffer.isView(y)?z.set(new y.constructor(y.buffer,y.byteOffset,z.length)):y.toArray(z,E)}function M(y,z,E,w){const _=y.value,T=z+"_"+E;if(w[T]===void 0)return typeof _=="number"||typeof _=="boolean"?w[T]=_:ArrayBuffer.isView(_)?w[T]=_.slice():w[T]=_.clone(),!0;{const P=w[T];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return w[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function p(y){const z=y.uniforms;let E=0;const w=16;for(let T=0,P=z.length;T<P;T++){const C=Array.isArray(z[T])?z[T]:[z[T]];for(let L=0,q=C.length;L<q;L++){const Y=C[L],B=Array.isArray(Y.value)?Y.value:[Y.value];for(let K=0,X=B.length;K<X;K++){const ee=B[K],ie=h(ee),pe=E%w,_e=pe%ie.boundary,Ee=pe+_e;E+=_e,Ee!==0&&w-Ee<ie.storage&&(E+=w-Ee),Y.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=E,E+=ie.storage}}}const _=E%w;return _>0&&(E+=w-_),y.__size=E,y.__cache={},this}function h(y){const z={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(z.boundary=4,z.storage=4):y.isVector2?(z.boundary=8,z.storage=8):y.isVector3||y.isColor?(z.boundary=16,z.storage=12):y.isVector4?(z.boundary=16,z.storage=16):y.isMatrix3?(z.boundary=48,z.storage=48):y.isMatrix4?(z.boundary=64,z.storage=64):y.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(z.boundary=16,z.storage=y.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",y),z}function S(y){const z=y.target;z.removeEventListener("dispose",S);const E=r.indexOf(z.__bindingPointIndex);r.splice(E,1),i.deleteBuffer(s[z.id]),delete s[z.id],delete a[z.id]}function A(){for(const y in s)i.deleteBuffer(s[y]);r=[],s={},a={}}return{bind:c,update:l,dispose:A}}const Nv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ti=null;function Uv(){return Ti===null&&(Ti=new ym(Nv,16,16,Nn,Zi),Ti.name="DFG_LUT",Ti.minFilter=Gt,Ti.magFilter=Gt,Ti.wrapS=qi,Ti.wrapT=qi,Ti.generateMipmaps=!1,Ti.needsUpdate=!0),Ti}class Fv{constructor(e={}){const{canvas:t=Fp(),context:n=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:m=ei}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=r;const M=m,p=new Set([bl,El,Sl]),h=new Set([ei,Li,Vs,Ws,Ml,yl]),S=new Uint32Array(4),A=new Int32Array(4),y=new F;let z=null,E=null;const w=[],_=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,L=null,q=null,Y=null,B=null;this._outputColorSpace=jt;let K=0,X=0,ee=null,ie=-1,pe=null;const _e=new pt,Ee=new pt;let Je=null;const ht=new Ye(0);let Xe=0,Z=t.width,oe=t.height,ne=1,R=null,O=null;const V=new pt(0,0,Z,oe),be=new pt(0,0,Z,oe);let ae=!1;const de=new Dl;let De=!1,ze=!1;const Ze=new mt,He=new F,qe=new pt,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function at(){return ee===null?ne:1}let D=n;function At(v,N){return t.getContext(v,N)}try{const v={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${gl}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",yi,!1),D===null){const N="webgl2";if(D=At(N,v),D===null)throw At(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(v){throw $e("WebGLRenderer: "+v.message),v}let tt,b,x,U,k,$,se,ce,J,j,ue,Re,me,he,Ie,Le,Be,I,le,Q,fe,Me,te;function we(){tt=new Ug(D),tt.init(),fe=new zv(D,tt),b=new wg(D,tt,e,fe),x=new Tv(D,tt),b.reversedDepthBuffer&&d&&x.buffers.depth.setReversed(!0),q=D.createFramebuffer(),Y=D.createFramebuffer(),B=D.createFramebuffer(),U=new Bg(D),k=new uv,$=new Av(D,tt,x,k,b,fe,U),se=new Ng(P),ce=new Vm(D),Me=new Ag(D,ce),J=new Fg(D,ce,U,Me),j=new Hg(D,J,ce,Me,U),I=new Gg(D,b,$),Ie=new Rg(k),ue=new dv(P,se,tt,b,Me,Ie),Re=new Iv(P,k),me=new fv,he=new vv(tt),Be=new Tg(P,se,x,j,g,c),Le=new bv(P,j,b),te=new Lv(D,U,b,x),le=new zg(D,tt,U),Q=new Og(D,tt,U),U.programs=ue.programs,P.capabilities=b,P.extensions=tt,P.properties=k,P.renderLists=me,P.shadowMap=Le,P.state=x,P.info=U}we(),M!==ei&&(T=new Vg(M,t.width,t.height,o,s,a));const Te=new Pv(P,D);this.xr=Te,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const v=tt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=tt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(v){v!==void 0&&(ne=v,this.setSize(Z,oe,!1))},this.getSize=function(v){return v.set(Z,oe)},this.setSize=function(v,N,W=!0){if(Te.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=v,oe=N,t.width=Math.floor(v*ne),t.height=Math.floor(N*ne),W===!0&&(t.style.width=v+"px",t.style.height=N+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,v,N)},this.getDrawingBufferSize=function(v){return v.set(Z*ne,oe*ne).floor()},this.setDrawingBufferSize=function(v,N,W){Z=v,oe=N,ne=W,t.width=Math.floor(v*W),t.height=Math.floor(N*W),this.setViewport(0,0,v,N)},this.setEffects=function(v){if(M===ei){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let N=0;N<v.length;N++)if(v[N].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(_e)},this.getViewport=function(v){return v.copy(V)},this.setViewport=function(v,N,W,G){v.isVector4?V.set(v.x,v.y,v.z,v.w):V.set(v,N,W,G),x.viewport(_e.copy(V).multiplyScalar(ne).round())},this.getScissor=function(v){return v.copy(be)},this.setScissor=function(v,N,W,G){v.isVector4?be.set(v.x,v.y,v.z,v.w):be.set(v,N,W,G),x.scissor(Ee.copy(be).multiplyScalar(ne).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(v){x.setScissorTest(ae=v)},this.setOpaqueSort=function(v){R=v},this.setTransparentSort=function(v){O=v},this.getClearColor=function(v){return v.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(v=!0,N=!0,W=!0){let G=0;if(v){let H=!1;if(ee!==null){const ve=ee.texture.format;H=p.has(ve)}if(H){const ve=ee.texture.type,Se=h.has(ve),ge=Be.getClearColor(),Ae=Be.getClearAlpha(),Ce=ge.r,Ge=ge.g,Ve=ge.b;Se?(S[0]=Ce,S[1]=Ge,S[2]=Ve,S[3]=Ae,D.clearBufferuiv(D.COLOR,0,S)):(A[0]=Ce,A[1]=Ge,A[2]=Ve,A[3]=Ae,D.clearBufferiv(D.COLOR,0,A))}else G|=D.COLOR_BUFFER_BIT}N&&(G|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),L=v},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",yi,!1),Be.dispose(),me.dispose(),he.dispose(),k.dispose(),se.dispose(),j.dispose(),Me.dispose(),te.dispose(),ue.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",$l),Te.removeEventListener("sessionend",Jl),_n.stop()};function gt(v){v.preventDefault(),Fc("WebGLRenderer: Context Lost."),C=!0}function dt(){Fc("WebGLRenderer: Context Restored."),C=!1;const v=U.autoReset,N=Le.enabled,W=Le.autoUpdate,G=Le.needsUpdate,H=Le.type;we(),U.autoReset=v,Le.enabled=N,Le.autoUpdate=W,Le.needsUpdate=G,Le.type=H}function yi(v){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Si(v){const N=v.target;N.removeEventListener("dispose",Si),Ju(N)}function Ju(v){Zu(v),k.remove(v)}function Zu(v){const N=k.get(v).programs;N!==void 0&&(N.forEach(function(W){ue.releaseProgram(W)}),v.isShaderMaterial&&ue.releaseShaderCache(v))}this.renderBufferDirect=function(v,N,W,G,H,ve){N===null&&(N=Qe);const Se=H.isMesh&&H.matrixWorld.determinantAffine()<0,ge=eh(v,N,W,G,H);x.setMaterial(G,Se);let Ae=W.index,Ce=1;if(G.wireframe===!0){if(Ae=J.getWireframeAttribute(W),Ae===void 0)return;Ce=2}const Ge=W.drawRange,Ve=W.attributes.position;let Pe=Ge.start*Ce,rt=(Ge.start+Ge.count)*Ce;ve!==null&&(Pe=Math.max(Pe,ve.start*Ce),rt=Math.min(rt,(ve.start+ve.count)*Ce)),Ae!==null?(Pe=Math.max(Pe,0),rt=Math.min(rt,Ae.count)):Ve!=null&&(Pe=Math.max(Pe,0),rt=Math.min(rt,Ve.count));const Mt=rt-Pe;if(Mt<0||Mt===1/0)return;Me.setup(H,G,ge,W,Ae);let _t,lt=le;if(Ae!==null&&(_t=ce.get(Ae),lt=Q,lt.setIndex(_t)),H.isMesh)G.wireframe===!0?(x.setLineWidth(G.wireframeLinewidth*at()),lt.setMode(D.LINES)):lt.setMode(D.TRIANGLES);else if(H.isLine){let Lt=G.linewidth;Lt===void 0&&(Lt=1),x.setLineWidth(Lt*at()),H.isLineSegments?lt.setMode(D.LINES):H.isLineLoop?lt.setMode(D.LINE_LOOP):lt.setMode(D.LINE_STRIP)}else H.isPoints?lt.setMode(D.POINTS):H.isSprite&&lt.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))lt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Lt=H._multiDrawStarts,ye=H._multiDrawCounts,$t=H._multiDrawCount,et=Ae?ce.get(Ae).bytesPerElement:1,ni=k.get(G).currentProgram.getUniforms();for(let Ei=0;Ei<$t;Ei++)ni.setValue(D,"_gl_DrawID",Ei),lt.render(Lt[Ei]/et,ye[Ei])}else if(H.isInstancedMesh)lt.renderInstances(Pe,Mt,H.count);else if(W.isInstancedBufferGeometry){const Lt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ye=Math.min(W.instanceCount,Lt);lt.renderInstances(Pe,Mt,ye)}else lt.render(Pe,Mt)};function Kl(v,N,W){v.transparent===!0&&v.side===Xi&&v.forceSinglePass===!1?(v.side=Kt,v.needsUpdate=!0,Qs(v,N,W),v.side=pn,v.needsUpdate=!0,Qs(v,N,W),v.side=Xi):Qs(v,N,W)}this.compile=function(v,N,W=null){W===null&&(W=v),E=he.get(W),E.init(N),_.push(E),W.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),v!==W&&v.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights();const G=new Set;return v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ve=H.material;if(ve)if(Array.isArray(ve))for(let Se=0;Se<ve.length;Se++){const ge=ve[Se];Kl(ge,W,H),G.add(ge)}else Kl(ve,W,H),G.add(ve)}),E=_.pop(),G},this.compileAsync=function(v,N,W=null){const G=this.compile(v,N,W);return new Promise(H=>{function ve(){if(G.forEach(function(Se){k.get(Se).currentProgram.isReady()&&G.delete(Se)}),G.size===0){H(v);return}setTimeout(ve,10)}tt.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let nr=null;function Qu(v){nr&&nr(v)}function $l(){_n.stop()}function Jl(){_n.start()}const _n=new Nu;_n.setAnimationLoop(Qu),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(v){nr=v,Te.setAnimationLoop(v),v===null?_n.stop():_n.start()},Te.addEventListener("sessionstart",$l),Te.addEventListener("sessionend",Jl),this.render=function(v,N){if(N!==void 0&&N.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;L!==null&&L.renderStart(v,N);const W=Te.enabled===!0&&Te.isPresenting===!0,G=T!==null&&(ee===null||W)&&T.begin(P,ee);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(N),N=Te.getCamera()),v.isScene===!0&&v.onBeforeRender(P,v,N,ee),E=he.get(v,_.length),E.init(N),E.state.textureUnits=$.getTextureUnits(),_.push(E),Ze.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),de.setFromProjectionMatrix(Ze,wi,N.reversedDepth),ze=this.localClippingEnabled,De=Ie.init(this.clippingPlanes,ze),z=me.get(v,w.length),z.init(),w.push(z),Te.enabled===!0&&Te.isPresenting===!0){const Se=P.xr.getDepthSensingMesh();Se!==null&&sr(Se,N,-1/0,P.sortObjects)}sr(v,N,0,P.sortObjects),z.finish(),P.sortObjects===!0&&z.sort(R,O,N.reversedDepth),je=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,je&&Be.addToRenderList(z,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),De===!0&&Ie.beginShadows();const H=E.state.shadowsArray;if(Le.render(H,v,N),De===!0&&Ie.endShadows(),(G&&T.hasRenderPass())===!1){const Se=z.opaque,ge=z.transmissive;if(E.setupLights(),N.isArrayCamera){const Ae=N.cameras;if(ge.length>0)for(let Ce=0,Ge=Ae.length;Ce<Ge;Ce++){const Ve=Ae[Ce];Ql(Se,ge,v,Ve)}je&&Be.render(v);for(let Ce=0,Ge=Ae.length;Ce<Ge;Ce++){const Ve=Ae[Ce];Zl(z,v,Ve,Ve.viewport)}}else ge.length>0&&Ql(Se,ge,v,N),je&&Be.render(v),Zl(z,v,N)}ee!==null&&X===0&&($.updateMultisampleRenderTarget(ee),$.updateRenderTargetMipmap(ee)),G&&T.end(P),v.isScene===!0&&v.onAfterRender(P,v,N),Me.resetDefaultState(),ie=-1,pe=null,_.pop(),_.length>0?(E=_[_.length-1],$.setTextureUnits(E.state.textureUnits),De===!0&&Ie.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,w.pop(),w.length>0?z=w[w.length-1]:z=null,L!==null&&L.renderEnd()};function sr(v,N,W,G){if(v.visible===!1)return;if(v.layers.test(N.layers)){if(v.isGroup)W=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(N);else if(v.isLightProbeGrid)E.pushLightProbeGrid(v);else if(v.isLight)E.pushLight(v),v.castShadow&&E.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||de.intersectsSprite(v)){G&&qe.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ze);const Se=j.update(v),ge=v.material;ge.visible&&z.push(v,Se,ge,W,qe.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||de.intersectsObject(v))){const Se=j.update(v),ge=v.material;if(G&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),qe.copy(v.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),qe.copy(Se.boundingSphere.center)),qe.applyMatrix4(v.matrixWorld).applyMatrix4(Ze)),Array.isArray(ge)){const Ae=Se.groups;for(let Ce=0,Ge=Ae.length;Ce<Ge;Ce++){const Ve=Ae[Ce],Pe=ge[Ve.materialIndex];Pe&&Pe.visible&&z.push(v,Se,Pe,W,qe.z,Ve)}}else ge.visible&&z.push(v,Se,ge,W,qe.z,null)}}const ve=v.children;for(let Se=0,ge=ve.length;Se<ge;Se++)sr(ve[Se],N,W,G)}function Zl(v,N,W,G){const{opaque:H,transmissive:ve,transparent:Se}=v;E.setupLightsView(W),De===!0&&Ie.setGlobalState(P.clippingPlanes,W),G&&x.viewport(_e.copy(G)),H.length>0&&Zs(H,N,W),ve.length>0&&Zs(ve,N,W),Se.length>0&&Zs(Se,N,W),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Ql(v,N,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){const Pe=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new Pi(1,1,{generateMipmaps:!0,type:Pe?Zi:ei,minFilter:wn,samples:Math.max(4,b.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const ve=E.state.transmissionRenderTarget[G.id],Se=G.viewport||_e;ve.setSize(Se.z*P.transmissionResolutionScale,Se.w*P.transmissionResolutionScale);const ge=P.getRenderTarget(),Ae=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(ve),P.getClearColor(ht),Xe=P.getClearAlpha(),Xe<1&&P.setClearColor(16777215,.5),P.clear(),je&&Be.render(W);const Ge=P.toneMapping;P.toneMapping=Ci;const Ve=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),De===!0&&Ie.setGlobalState(P.clippingPlanes,G),Zs(v,W,G),$.updateMultisampleRenderTarget(ve),$.updateRenderTargetMipmap(ve),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let rt=0,Mt=N.length;rt<Mt;rt++){const _t=N[rt],{object:lt,geometry:Lt,material:ye,group:$t}=_t;if(ye.side===Xi&&lt.layers.test(G.layers)){const et=ye.side;ye.side=Kt,ye.needsUpdate=!0,jl(lt,W,G,Lt,ye,$t),ye.side=et,ye.needsUpdate=!0,Pe=!0}}Pe===!0&&($.updateMultisampleRenderTarget(ve),$.updateRenderTargetMipmap(ve))}P.setRenderTarget(ge,Ae,Ce),P.setClearColor(ht,Xe),Ve!==void 0&&(G.viewport=Ve),P.toneMapping=Ge}function Zs(v,N,W){const G=N.isScene===!0?N.overrideMaterial:null;for(let H=0,ve=v.length;H<ve;H++){const Se=v[H],{object:ge,geometry:Ae,group:Ce}=Se;let Ge=Se.material;Ge.allowOverride===!0&&G!==null&&(Ge=G),ge.layers.test(W.layers)&&jl(ge,N,W,Ae,Ge,Ce)}}function jl(v,N,W,G,H,ve){v.onBeforeRender(P,N,W,G,H,ve),v.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(P,N,W,G,v,ve),H.transparent===!0&&H.side===Xi&&H.forceSinglePass===!1?(H.side=Kt,H.needsUpdate=!0,P.renderBufferDirect(W,N,G,H,v,ve),H.side=pn,H.needsUpdate=!0,P.renderBufferDirect(W,N,G,H,v,ve),H.side=Xi):P.renderBufferDirect(W,N,G,H,v,ve),v.onAfterRender(P,N,W,G,H,ve)}function Qs(v,N,W){N.isScene!==!0&&(N=Qe);const G=k.get(v),H=E.state.lights,ve=E.state.shadowsArray,Se=H.state.version,ge=ue.getParameters(v,H.state,ve,N,W,E.state.lightProbeGridArray),Ae=ue.getProgramCacheKey(ge);let Ce=G.programs;G.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,G.fog=N.fog;const Ge=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;G.envMap=se.get(v.envMap||G.environment,Ge),G.envMapRotation=G.environment!==null&&v.envMap===null?N.environmentRotation:v.envMapRotation,Ce===void 0&&(v.addEventListener("dispose",Si),Ce=new Map,G.programs=Ce);let Ve=Ce.get(Ae);if(Ve!==void 0){if(G.currentProgram===Ve&&G.lightsStateVersion===Se)return tc(v,ge),Ve}else ge.uniforms=ue.getUniforms(v),L!==null&&v.isNodeMaterial&&L.build(v,W,ge),v.onBeforeCompile(ge,P),Ve=ue.acquireProgram(ge,Ae),Ce.set(Ae,Ve),G.uniforms=ge.uniforms;const Pe=G.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Pe.clippingPlanes=Ie.uniform),tc(v,ge),G.needsLights=ih(v),G.lightsStateVersion=Se,G.needsLights&&(Pe.ambientLightColor.value=H.state.ambient,Pe.lightProbe.value=H.state.probe,Pe.directionalLights.value=H.state.directional,Pe.directionalLightShadows.value=H.state.directionalShadow,Pe.spotLights.value=H.state.spot,Pe.spotLightShadows.value=H.state.spotShadow,Pe.rectAreaLights.value=H.state.rectArea,Pe.ltc_1.value=H.state.rectAreaLTC1,Pe.ltc_2.value=H.state.rectAreaLTC2,Pe.pointLights.value=H.state.point,Pe.pointLightShadows.value=H.state.pointShadow,Pe.hemisphereLights.value=H.state.hemi,Pe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Pe.spotLightMatrix.value=H.state.spotLightMatrix,Pe.spotLightMap.value=H.state.spotLightMap,Pe.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=Ve,G.uniformsList=null,Ve}function ec(v){if(v.uniformsList===null){const N=v.currentProgram.getUniforms();v.uniformsList=Ca.seqWithValue(N.seq,v.uniforms)}return v.uniformsList}function tc(v,N){const W=k.get(v);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function ju(v,N){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;y.setFromMatrixPosition(N.matrixWorld);for(let W=0,G=v.length;W<G;W++){const H=v[W];if(H.texture!==null&&H.boundingBox.containsPoint(y))return H}return null}function eh(v,N,W,G,H){N.isScene!==!0&&(N=Qe),$.resetTextureUnits();const ve=N.fog,Se=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?N.environment:null,ge=ee===null?P.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ke.workingColorSpace,Ae=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ce=se.get(G.envMap||Se,Ae),Ge=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ve=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pe=!!W.morphAttributes.position,rt=!!W.morphAttributes.normal,Mt=!!W.morphAttributes.color;let _t=Ci;G.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(_t=P.toneMapping);const lt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Lt=lt!==void 0?lt.length:0,ye=k.get(G),$t=E.state.lights;if(De===!0&&(ze===!0||v!==pe)){const ut=v===pe&&G.id===ie;Ie.setState(G,v,ut)}let et=!1;G.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==$t.state.version||ye.outputColorSpace!==ge||H.isBatchedMesh&&ye.batching===!1||!H.isBatchedMesh&&ye.batching===!0||H.isBatchedMesh&&ye.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&ye.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&ye.instancing===!1||!H.isInstancedMesh&&ye.instancing===!0||H.isSkinnedMesh&&ye.skinning===!1||!H.isSkinnedMesh&&ye.skinning===!0||H.isInstancedMesh&&ye.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&ye.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&ye.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&ye.instancingMorph===!1&&H.morphTexture!==null||ye.envMap!==Ce||G.fog===!0&&ye.fog!==ve||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Ie.numPlanes||ye.numIntersection!==Ie.numIntersection)||ye.vertexAlphas!==Ge||ye.vertexTangents!==Ve||ye.morphTargets!==Pe||ye.morphNormals!==rt||ye.morphColors!==Mt||ye.toneMapping!==_t||ye.morphTargetsCount!==Lt||!!ye.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,ye.__version=G.version);let ni=ye.currentProgram;et===!0&&(ni=Qs(G,N,H),L&&G.isNodeMaterial&&L.onUpdateProgram(G,ni,ye));let Ei=!1,ji=!1,Gn=!1;const ct=ni.getUniforms(),yt=ye.uniforms;if(x.useProgram(ni.program)&&(Ei=!0,ji=!0,Gn=!0),G.id!==ie&&(ie=G.id,ji=!0),ye.needsLights){const ut=ju(E.state.lightProbeGridArray,H);ye.lightProbeGrid!==ut&&(ye.lightProbeGrid=ut,ji=!0)}if(Ei||pe!==v){x.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ct.setValue(D,"projectionMatrix",v.projectionMatrix),ct.setValue(D,"viewMatrix",v.matrixWorldInverse);const tn=ct.map.cameraPosition;tn!==void 0&&tn.setValue(D,He.setFromMatrixPosition(v.matrixWorld)),b.logarithmicDepthBuffer&&ct.setValue(D,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ct.setValue(D,"isOrthographic",v.isOrthographicCamera===!0),pe!==v&&(pe=v,ji=!0,Gn=!0)}if(ye.needsLights&&($t.state.directionalShadowMap.length>0&&ct.setValue(D,"directionalShadowMap",$t.state.directionalShadowMap,$),$t.state.spotShadowMap.length>0&&ct.setValue(D,"spotShadowMap",$t.state.spotShadowMap,$),$t.state.pointShadowMap.length>0&&ct.setValue(D,"pointShadowMap",$t.state.pointShadowMap,$)),H.isSkinnedMesh){ct.setOptional(D,H,"bindMatrix"),ct.setOptional(D,H,"bindMatrixInverse");const ut=H.skeleton;ut&&(ut.boneTexture===null&&ut.computeBoneTexture(),ct.setValue(D,"boneTexture",ut.boneTexture,$))}H.isBatchedMesh&&(ct.setOptional(D,H,"batchingTexture"),ct.setValue(D,"batchingTexture",H._matricesTexture,$),ct.setOptional(D,H,"batchingIdTexture"),ct.setValue(D,"batchingIdTexture",H._indirectTexture,$),ct.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&ct.setValue(D,"batchingColorTexture",H._colorsTexture,$));const en=W.morphAttributes;if((en.position!==void 0||en.normal!==void 0||en.color!==void 0)&&I.update(H,W,ni),(ji||ye.receiveShadow!==H.receiveShadow)&&(ye.receiveShadow=H.receiveShadow,ct.setValue(D,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&N.environment!==null&&(yt.envMapIntensity.value=N.environmentIntensity),yt.dfgLUT!==void 0&&(yt.dfgLUT.value=Uv()),ji){if(ct.setValue(D,"toneMappingExposure",P.toneMappingExposure),ye.needsLights&&th(yt,Gn),ve&&G.fog===!0&&Re.refreshFogUniforms(yt,ve),Re.refreshMaterialUniforms(yt,G,ne,oe,E.state.transmissionRenderTarget[v.id]),ye.needsLights&&ye.lightProbeGrid){const ut=ye.lightProbeGrid;yt.probesSH.value=ut.texture,yt.probesMin.value.copy(ut.boundingBox.min),yt.probesMax.value.copy(ut.boundingBox.max),yt.probesResolution.value.copy(ut.resolution)}Ca.upload(D,ec(ye),yt,$)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ca.upload(D,ec(ye),yt,$),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ct.setValue(D,"center",H.center),ct.setValue(D,"modelViewMatrix",H.modelViewMatrix),ct.setValue(D,"normalMatrix",H.normalMatrix),ct.setValue(D,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){const ut=G.uniformsGroups;for(let tn=0,Hn=ut.length;tn<Hn;tn++){const ic=ut[tn];te.update(ic,ni),te.bind(ic,ni)}}return ni}function th(v,N){v.ambientLightColor.needsUpdate=N,v.lightProbe.needsUpdate=N,v.directionalLights.needsUpdate=N,v.directionalLightShadows.needsUpdate=N,v.pointLights.needsUpdate=N,v.pointLightShadows.needsUpdate=N,v.spotLights.needsUpdate=N,v.spotLightShadows.needsUpdate=N,v.rectAreaLights.needsUpdate=N,v.hemisphereLights.needsUpdate=N}function ih(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(v,N,W){const G=k.get(v);G.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),k.get(v.texture).__webglTexture=N,k.get(v.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,N){const W=k.get(v);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(v,N=0,W=0){ee=v,K=N,X=W;let G=null,H=!1,ve=!1;if(v){const ge=k.get(v);if(ge.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(D.FRAMEBUFFER,ge.__webglFramebuffer),_e.copy(v.viewport),Ee.copy(v.scissor),Je=v.scissorTest,x.viewport(_e),x.scissor(Ee),x.setScissorTest(Je),ie=-1;return}else if(ge.__webglFramebuffer===void 0)$.setupRenderTarget(v);else if(ge.__hasExternalTextures)$.rebindTextures(v,k.get(v.texture).__webglTexture,k.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Ge=v.depthTexture;if(ge.__boundDepthTexture!==Ge){if(Ge!==null&&k.has(Ge)&&(v.width!==Ge.image.width||v.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(v)}}const Ae=v.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ve=!0);const Ce=k.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ce[N])?G=Ce[N][W]:G=Ce[N],H=!0):v.samples>0&&$.useMultisampledRTT(v)===!1?G=k.get(v).__webglMultisampledFramebuffer:Array.isArray(Ce)?G=Ce[W]:G=Ce,_e.copy(v.viewport),Ee.copy(v.scissor),Je=v.scissorTest}else _e.copy(V).multiplyScalar(ne).floor(),Ee.copy(be).multiplyScalar(ne).floor(),Je=ae;if(W!==0&&(G=q),x.bindFramebuffer(D.FRAMEBUFFER,G)&&x.drawBuffers(v,G),x.viewport(_e),x.scissor(Ee),x.setScissorTest(Je),H){const ge=k.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,ge.__webglTexture,W)}else if(ve){const ge=N;for(let Ae=0;Ae<v.textures.length;Ae++){const Ce=k.get(v.textures[Ae]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ae,Ce.__webglTexture,W,ge)}}else if(v!==null&&W!==0){const ge=k.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ge.__webglTexture,W)}ie=-1},this.readRenderTargetPixels=function(v,N,W,G,H,ve,Se,ge=0){if(!(v&&v.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=k.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(Ae=Ae[Se]),Ae){x.bindFramebuffer(D.FRAMEBUFFER,Ae);try{const Ce=v.textures[ge],Ge=Ce.format,Ve=Ce.type;if(v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ge),!b.textureFormatReadable(Ge)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!b.textureTypeReadable(Ve)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=v.width-G&&W>=0&&W<=v.height-H&&D.readPixels(N,W,G,H,fe.convert(Ge),fe.convert(Ve),ve)}finally{const Ce=ee!==null?k.get(ee).__webglFramebuffer:null;x.bindFramebuffer(D.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(v,N,W,G,H,ve,Se,ge=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=k.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(Ae=Ae[Se]),Ae)if(N>=0&&N<=v.width-G&&W>=0&&W<=v.height-H){x.bindFramebuffer(D.FRAMEBUFFER,Ae);const Ce=v.textures[ge],Ge=Ce.format,Ve=Ce.type;if(v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ge),!b.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!b.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Pe),D.bufferData(D.PIXEL_PACK_BUFFER,ve.byteLength,D.STREAM_READ),D.readPixels(N,W,G,H,fe.convert(Ge),fe.convert(Ve),0);const rt=ee!==null?k.get(ee).__webglFramebuffer:null;x.bindFramebuffer(D.FRAMEBUFFER,rt);const Mt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Op(D,Mt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Pe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ve),D.deleteBuffer(Pe),D.deleteSync(Mt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,N=null,W=0){const G=Math.pow(2,-W),H=Math.floor(v.image.width*G),ve=Math.floor(v.image.height*G),Se=N!==null?N.x:0,ge=N!==null?N.y:0;$.setTexture2D(v,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,Se,ge,H,ve),x.unbindTexture()},this.copyTextureToTexture=function(v,N,W=null,G=null,H=0,ve=0){let Se,ge,Ae,Ce,Ge,Ve,Pe,rt,Mt;const _t=v.isCompressedTexture?v.mipmaps[ve]:v.image;if(W!==null)Se=W.max.x-W.min.x,ge=W.max.y-W.min.y,Ae=W.isBox3?W.max.z-W.min.z:1,Ce=W.min.x,Ge=W.min.y,Ve=W.isBox3?W.min.z:0;else{const yt=Math.pow(2,-H);Se=Math.floor(_t.width*yt),ge=Math.floor(_t.height*yt),v.isDataArrayTexture?Ae=_t.depth:v.isData3DTexture?Ae=Math.floor(_t.depth*yt):Ae=1,Ce=0,Ge=0,Ve=0}G!==null?(Pe=G.x,rt=G.y,Mt=G.z):(Pe=0,rt=0,Mt=0);const lt=fe.convert(N.format),Lt=fe.convert(N.type);let ye;N.isData3DTexture?($.setTexture3D(N,0),ye=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?($.setTexture2DArray(N,0),ye=D.TEXTURE_2D_ARRAY):($.setTexture2D(N,0),ye=D.TEXTURE_2D),x.activeTexture(D.TEXTURE0),x.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),x.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),x.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);const $t=x.getParameter(D.UNPACK_ROW_LENGTH),et=x.getParameter(D.UNPACK_IMAGE_HEIGHT),ni=x.getParameter(D.UNPACK_SKIP_PIXELS),Ei=x.getParameter(D.UNPACK_SKIP_ROWS),ji=x.getParameter(D.UNPACK_SKIP_IMAGES);x.pixelStorei(D.UNPACK_ROW_LENGTH,_t.width),x.pixelStorei(D.UNPACK_IMAGE_HEIGHT,_t.height),x.pixelStorei(D.UNPACK_SKIP_PIXELS,Ce),x.pixelStorei(D.UNPACK_SKIP_ROWS,Ge),x.pixelStorei(D.UNPACK_SKIP_IMAGES,Ve);const Gn=v.isDataArrayTexture||v.isData3DTexture,ct=N.isDataArrayTexture||N.isData3DTexture;if(v.isDepthTexture){const yt=k.get(v),en=k.get(N),ut=k.get(yt.__renderTarget),tn=k.get(en.__renderTarget);x.bindFramebuffer(D.READ_FRAMEBUFFER,ut.__webglFramebuffer),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,tn.__webglFramebuffer);for(let Hn=0;Hn<Ae;Hn++)Gn&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,k.get(v).__webglTexture,H,Ve+Hn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,k.get(N).__webglTexture,ve,Mt+Hn)),D.blitFramebuffer(Ce,Ge,Se,ge,Pe,rt,Se,ge,D.DEPTH_BUFFER_BIT,D.NEAREST);x.bindFramebuffer(D.READ_FRAMEBUFFER,null),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||k.has(v)){const yt=k.get(v),en=k.get(N);x.bindFramebuffer(D.READ_FRAMEBUFFER,Y),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,B);for(let ut=0;ut<Ae;ut++)Gn?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,yt.__webglTexture,H,Ve+ut):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,yt.__webglTexture,H),ct?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,en.__webglTexture,ve,Mt+ut):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,en.__webglTexture,ve),H!==0?D.blitFramebuffer(Ce,Ge,Se,ge,Pe,rt,Se,ge,D.COLOR_BUFFER_BIT,D.NEAREST):ct?D.copyTexSubImage3D(ye,ve,Pe,rt,Mt+ut,Ce,Ge,Se,ge):D.copyTexSubImage2D(ye,ve,Pe,rt,Ce,Ge,Se,ge);x.bindFramebuffer(D.READ_FRAMEBUFFER,null),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ct?v.isDataTexture||v.isData3DTexture?D.texSubImage3D(ye,ve,Pe,rt,Mt,Se,ge,Ae,lt,Lt,_t.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(ye,ve,Pe,rt,Mt,Se,ge,Ae,lt,_t.data):D.texSubImage3D(ye,ve,Pe,rt,Mt,Se,ge,Ae,lt,Lt,_t):v.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ve,Pe,rt,Se,ge,lt,Lt,_t.data):v.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ve,Pe,rt,_t.width,_t.height,lt,_t.data):D.texSubImage2D(D.TEXTURE_2D,ve,Pe,rt,Se,ge,lt,Lt,_t);x.pixelStorei(D.UNPACK_ROW_LENGTH,$t),x.pixelStorei(D.UNPACK_IMAGE_HEIGHT,et),x.pixelStorei(D.UNPACK_SKIP_PIXELS,ni),x.pixelStorei(D.UNPACK_SKIP_ROWS,Ei),x.pixelStorei(D.UNPACK_SKIP_IMAGES,ji),ve===0&&N.generateMipmaps&&D.generateMipmap(ye),x.unbindTexture()},this.initRenderTarget=function(v){k.get(v).__webglFramebuffer===void 0&&$.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?$.setTextureCube(v,0):v.isData3DTexture?$.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?$.setTexture2DArray(v,0):$.setTexture2D(v,0),x.unbindTexture()},this.resetState=function(){K=0,X=0,ee=null,x.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}const Id={type:"change"},Il={type:"start"},Vu={type:"end"},Ea=new Pl,Ld=new Wi,Ov=Math.cos(70*Yo.DEG2RAD),Et=new F,Yt=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Yr=1e-6;class Bv extends Hm{constructor(e,t=null){super(e,t),this.state=ot.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:as.ROTATE,MIDDLE:as.DOLLY,RIGHT:as.PAN},this.touches={ONE:un.ROTATE,TWO:un.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new mn,this._lastTargetPosition=new F,this._quat=new mn().setFromUnitVectors(e.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new od,this._sphericalDelta=new od,this._scale=1,this._panOffset=new F,this._rotateStart=new Ue,this._rotateEnd=new Ue,this._rotateDelta=new Ue,this._panStart=new Ue,this._panEnd=new Ue,this._panDelta=new Ue,this._dollyStart=new Ue,this._dollyEnd=new Ue,this._dollyDelta=new Ue,this._dollyDirection=new F,this._mouse=new Ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Hv.bind(this),this._onPointerDown=Gv.bind(this),this._onPointerUp=kv.bind(this),this._onContextMenu=$v.bind(this),this._onMouseWheel=Xv.bind(this),this._onKeyDown=qv.bind(this),this._onTouchStart=Yv.bind(this),this._onTouchMove=Kv.bind(this),this._onMouseDown=Vv.bind(this),this._onMouseMove=Wv.bind(this),this._interceptControlDown=Jv.bind(this),this._interceptControlUp=Zv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Id),this.update(),this.state=ot.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Et.copy(t).sub(this.target),Et.applyQuaternion(this._quat),this._spherical.setFromVector3(Et),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Yt:n>Math.PI&&(n-=Yt),s<-Math.PI?s+=Yt:s>Math.PI&&(s-=Yt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(Et.setFromSpherical(this._spherical),Et.applyQuaternion(this._quatInverse),t.copy(this.target).add(Et),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Et.length();r=this._clampDistance(o*this._scale);const c=o-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),a=!!c}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=c!==this.object.zoom;const l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),r=Et.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(Ea.origin.copy(this.object.position),Ea.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ea.direction))<Ov?this.object.lookAt(this.target):(Ld.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ea.intersectPlane(Ld,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Yr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Yr||this._lastTargetPosition.distanceToSquared(this.target)>Yr?(this.dispatchEvent(Id),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Yt/60*this.autoRotateSpeed*e:Yt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Et.setFromMatrixColumn(t,0),Et.multiplyScalar(-e),this._panOffset.add(Et)}_panUp(e,t){this.screenSpacePanning===!0?Et.setFromMatrixColumn(t,1):(Et.setFromMatrixColumn(t,0),Et.crossVectors(this.object.up,Et)),Et.multiplyScalar(e),this._panOffset.add(Et)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Et.copy(s).sub(this.target);let a=Et.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/n.clientHeight,this.object.matrix),this._panUp(2*t*a/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,a=t-n.top,r=n.width,o=n.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Yt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Yt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Yt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Yt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Yt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Yt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(n*n+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Yt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Yt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Gv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Hv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function kv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Vu),this.state=ot.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Vv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case as.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ot.DOLLY;break;case as.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ot.ROTATE}break;case as.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(Il)}function Wv(i){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Xv(i){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(i.preventDefault(),this.dispatchEvent(Il),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Vu))}function qv(i){this.enabled!==!1&&this._handleKeyDown(i)}function Yv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case un.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ot.TOUCH_ROTATE;break;case un.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case un.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ot.TOUCH_DOLLY_PAN;break;case un.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(Il)}function Kv(i){switch(this._trackPointer(i),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ot.NONE}}function $v(i){this.enabled!==!1&&i.preventDefault()}function Jv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Zv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Rs=new F;function ai(i,e,t,n,s,a){const r=2*Math.PI*s/4,o=Math.max(a-2*s,0),c=Math.PI/4;Rs.copy(e),Rs[n]=0,Rs.normalize();const l=.5*r/(r+o),f=1-Rs.angleTo(i)/c;return Math.sign(Rs[t])===1?f*l:o/(r+o)+l+l*(1-f)}class Ll extends vs{constructor(e=1,t=1,n=1,s=2,a=.1){const r=s*2+1;if(a=Math.min(e/2,t/2,n/2,a),super(1,1,1,r,r,r),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:a},r===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new F,l=new F,f=new F(e,t,n).divideScalar(2).subScalar(a),u=this.attributes.position.array,d=this.attributes.normal.array,m=this.attributes.uv.array,g=u.length/6,M=new F,p=.5/r;for(let h=0,S=0;h<u.length;h+=3,S+=2)switch(c.fromArray(u,h),l.copy(c),l.x-=Math.sign(l.x)*p,l.y-=Math.sign(l.y)*p,l.z-=Math.sign(l.z)*p,l.normalize(),u[h+0]=f.x*Math.sign(c.x)+l.x*a,u[h+1]=f.y*Math.sign(c.y)+l.y*a,u[h+2]=f.z*Math.sign(c.z)+l.z*a,d[h+0]=l.x,d[h+1]=l.y,d[h+2]=l.z,Math.floor(h/g)){case 0:M.set(1,0,0),m[S+0]=ai(M,l,"z","y",a,n),m[S+1]=1-ai(M,l,"y","z",a,t);break;case 1:M.set(-1,0,0),m[S+0]=1-ai(M,l,"z","y",a,n),m[S+1]=1-ai(M,l,"y","z",a,t);break;case 2:M.set(0,1,0),m[S+0]=1-ai(M,l,"x","z",a,e),m[S+1]=ai(M,l,"z","x",a,n);break;case 3:M.set(0,-1,0),m[S+0]=1-ai(M,l,"x","z",a,e),m[S+1]=1-ai(M,l,"z","x",a,n);break;case 4:M.set(0,0,1),m[S+0]=1-ai(M,l,"x","y",a,e),m[S+1]=1-ai(M,l,"y","x",a,t);break;case 5:M.set(0,0,-1),m[S+0]=ai(M,l,"x","y",a,e),m[S+1]=1-ai(M,l,"y","x",a,t);break}}static fromJSON(e){return new Ll(e.width,e.height,e.depth,e.segments,e.radius)}}class Kr{geometries=new Set;materials=new Map;textures=new Set;material(e){return this.materials.has(e)||this.materials.set(e,new ed({color:e,roughness:.4,metalness:.02})),this.materials.get(e)}mesh(e,t,n,s){this.geometries.add(t);const a=new vi(t,n);return a.position.set(s[0],s[1],s[2]),a.castShadow=!0,a.receiveShadow=!0,e.add(a),a}box(e,t,n,s,a=.04){return this.mesh(e,new Ll(t[0],t[1],t[2],2,Math.min(a,...t.map(r=>r/2))),this.material(s),n)}label(e,t,n,s,a,r="#34494e",o="transparent"){const c=document.createElement("canvas");c.width=256,c.height=128;const l=c.getContext("2d");o!=="transparent"&&(l.fillStyle=o,l.fillRect(0,0,256,128)),l.fillStyle=r,l.font="bold 68px system-ui, sans-serif",l.textAlign="center",l.textBaseline="middle",l.fillText(t,128,68,245);const f=new Tm(c);f.colorSpace=jt,this.textures.add(f);const u=new ed({map:f,transparent:!0,roughness:.6,depthWrite:!1});this.materials.set(`label-${this.materials.size}`,u);const d=this.mesh(e,new fn(n,s),u,a);return d.rotation.x=-Math.PI/2,d.castShadow=!1,d}board(){const e=new ns;this.box(e,[7.65,.44,7.65],[0,-.29,0],"#fafcfb",.2),this.box(e,[6.18,.11,6.18],[0,-.015,0],"#bdcccf",.1);for(let t=0;t<6;t++)for(let n=0;n<6;n++){const s=n-2.5,a=t-2.5;this.box(e,[.976,.1,.976],[s,.005,a],(t+n)%2?"#eaf0ef":"#f3f5f3",.045);for(const r of[-.35,.35])this.box(e,[.035,.023,.28],[s+r,.062,a],"#dce4e3",.01)}for(const t of[-3.43,3.43])this.box(e,[7.5,.17,.64],[0,.065,t],"#8fcc22",.065);this.box(e,[.64,.17,6.4],[-3.43,.065,0],"#8fcc22",.065),this.box(e,[.64,.17,2.1],[3.43,.065,-2.13],"#8fcc22",.065),this.box(e,[.64,.17,3.1],[3.43,.065,1.63],"#8fcc22",.065);for(const t of[-3.07,3.07])this.box(e,[6.2,.21,.09],[0,.04,t],"#fbfcfa",.035);this.box(e,[.09,.21,6.2],[-3.07,.04,0],"#fbfcfa",.035),this.box(e,[.09,.21,2.06],[3.07,.04,-2.07],"#fbfcfa",.035),this.box(e,[.09,.21,3.06],[3.07,.04,1.57],"#fbfcfa",.035);for(const t of[-3.43,3.43]){for(const n of[-1.65,1.65])for(let s=-2;s<=2;s++)this.box(e,[.09,.008,.45],[n+s*.17,.156,t],"#ffffff",.003);this.box(e,[.64,.012,.5],[0,.16,t],"#5db4d6",.035),this.label(e,"P",.4,.37,[0,.174,t],"#ffffff")}for(const t of[-3.43,3.43])for(const n of[-2.82,2.85])this.box(e,[.48,.02,.18],[t,.165,n],"#315656",.07),["#f27a67","#f6d25f","#4fbc90"].forEach((s,a)=>{const r=this.mesh(e,new Us(.062,.062,.012,16),this.material(s),[t+(a-1)*.14,.182,n]);r.castShadow=!1});for(const t of[-3.43,3.43])for(const n of[-1.68,1.65])this.box(e,[.09,.009,.9],[t,.157,n],"#5bb278",.02);this.box(e,[1.75,.22,1.12],[3.83,-.1,-.5],"#fafcfb",.1),this.box(e,[1.72,.013,.94],[3.84,.02,-.5],"#c7d8d6",.04);for(const t of[-.9,-.1])this.box(e,[1.54,.008,.025],[3.84,.03,t],"#fbfdf9",.005);for(const t of[3.57,4.03])for(const n of[-1,1]){const s=this.box(e,[.28,.01,.055],[t,.039,-.5+n*.086],"#42877d",.01);s.rotation.y=n*Math.PI/4}return e}vehicle(e,t){const n=new ns,s=zn(e.id),a=e.size-.18,r=s.color,o="#354951";this.box(n,[a,.17,.88],[0,.155,0],"#fafcf9",.13);for(const u of[-a/2+.31,a/2-.31])for(const d of[-.35,.35]){const m=this.mesh(n,new Us(.14,.14,.08,14),this.material("#43545a"),[u,.23,d]);m.rotation.x=Math.PI/2;const g=this.mesh(n,new Us(.064,.064,.085,12),this.material("#d9e1df"),[u,.23,d]);g.rotation.x=Math.PI/2}this.box(n,[a-.13,.24,.71],[0,.34,0],r,.11);const c=s.kind==="truck",l=s.kind==="bus",f=s.kind==="fire"||s.kind==="ambulance";if(c){this.box(n,[.55,.22,.62],[a/2-.4,.53,0],o,.07),this.box(n,[.32,.03,.64],[a/2-.46,.65,0],r,.02),this.box(n,[a-.9,.24,.64],[-.34,.51,0],"#e1e5dc",.04);for(let u=0;u<11;u++)this.box(n,[.035,.032,.57],[-a/2+.21+u*(a-1)/10,.65,0],"#9eae9d",.008)}else if(l||f){this.box(n,[a-.4,.23,.62],[-.02,.54,0],o,.07),this.box(n,[a-.48,.07,.64],[-.05,.68,0],r,.045);for(let u=0;u<(l?7:3);u++)for(const d of[-.32,.32])this.box(n,[.045,.2,.03],[-a/2+.28+u*.29,.55,d],r,.01);if(s.kind==="fire"){for(const u of[-.17,.17])this.box(n,[1.1,.045,.04],[-.11,.76,u],"#e1e5dd",.01);for(let u=0;u<6;u++)this.box(n,[.035,.04,.34],[-.62+u*.2,.76,0],"#e1e5dd",.01)}s.kind==="ambulance"&&(this.box(n,[.39,.013,.13],[-.07,.724,0],"#e96363",.005),this.box(n,[.13,.014,.39],[-.07,.725,0],"#e96363",.005))}else{this.box(n,[.93,.23,.61],[-.1,.52,0],o,.105),this.box(n,[.4,.028,.58],[-.15,.646,0],s.kind==="police"?"#f7faf6":r,.025);for(const u of[-.316,.316])this.box(n,[.04,.18,.035],[-.13,.51,u],r,.01);if(s.kind==="police"){for(const u of[-.7,.64])this.box(n,[.28,.015,.54],[u,.465,0],"#354348",.035);this.box(n,[.16,.04,.57],[-.12,.685,0],"#eff7f4",.02),this.box(n,[.15,.095,.24],[-.12,.731,-.15],"#408edd",.025),this.box(n,[.15,.095,.24],[-.12,.731,.15],"#f15b5d",.025),this.label(n,"POLICE",.45,.22,[.52,.478,0],"#ffffff")}if(s.kind==="taxi"&&(this.box(n,[.23,.1,.32],[-.1,.705,0],"#fff8db",.025),this.label(n,"TAXI",.21,.21,[-.1,.761,0])),s.kind==="jeep")for(const u of[-.22,.22])this.box(n,[.65,.045,.034],[-.12,.685,u],"#e6e9df",.01)}for(const u of[-.23,.23])this.box(n,[.047,.08,.16],[a/2-.073,.35,u],"#fffbd8",.016),this.box(n,[.035,.065,.12],[-a/2+.062,.34,u],"#c84342",.01);return t!==0&&this.label(n,String(t).padStart(2,"0"),.3,.22,[a/2-.3,.466,0],"#283c43"),n.rotation.y=e.axis==="x"?0:-Math.PI/2,n.traverse(u=>{u.userData.car=t}),n}dispose(){this.geometries.forEach(e=>e.dispose()),this.materials.forEach(e=>e.dispose()),this.textures.forEach(e=>e.dispose()),this.geometries.clear(),this.materials.clear(),this.textures.clear()}}class Qv{constructor(e,t){this.host=e,this.callbacks=t,this.renderer=new Fv({antialias:!0,powerPreference:"high-performance",alpha:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=cu,this.renderer.toneMapping=_l,this.renderer.toneMappingExposure=1,this.world.background=new Ye("#edf3f5");const n=this.renderer.domElement;n.setAttribute("aria-label","益智移车出库三维停车场"),n.setAttribute("role","img"),e.append(n),this.world.add(new Nm("#ffffff","#acbcc0",1.7));const s=new Gr("#fffaf0",2.4);s.position.set(-3,12,5),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),Object.assign(s.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:.1,far:30}),s.shadow.normalBias=.035,s.shadow.bias=-2e-4,this.world.add(s);const a=new Gr("#d8f6ff",.7);a.position.set(5,5,-8),this.world.add(a),this.world.add(this.boardModels.board());const r=new Wa({color:"#edf3f5",toneMapped:!1}),o=new zm({opacity:.17});this.floorMaterials.push(r,o);const c=this.boardModels.mesh(this.world,new fn(200,200),r,[0,-.52,0]);c.rotation.x=-Math.PI/2,c.castShadow=!1;const l=this.boardModels.mesh(this.world,new fn(200,200),o,[0,-.518,0]);l.rotation.x=-Math.PI/2,l.castShadow=!1;const f=(u,d)=>{const m=new vi(new fn(1,1),new Wa({color:u,transparent:!0,opacity:d,depthWrite:!1}));return m.rotation.x=-Math.PI/2,m.position.y=.075,this.world.add(m),m};this.selector=f("#218d9c",.62),this.hintMarker=f("#ffcc45",.75),this.hintMarker.visible=!1,n.addEventListener("pointerdown",this.pointerDown,{signal:this.abort.signal}),n.addEventListener("pointermove",this.pointerMove,{signal:this.abort.signal}),n.addEventListener("pointerup",this.pointerUp,{signal:this.abort.signal}),n.addEventListener("pointercancel",this.pointerCancel,{signal:this.abort.signal}),n.addEventListener("lostpointercapture",this.lostCapture,{signal:this.abort.signal}),n.addEventListener("webglcontextlost",u=>{u.preventDefault(),this.setPaused(!0),t.error()},{signal:this.abort.signal}),this.controls=new Bv(this.camera,n),this.controls.target.set(.35,0,0),this.controls.enablePan=!1,this.controls.enableDamping=!1,this.controls.minPolarAngle=.02,this.controls.maxPolarAngle=Math.PI/3.2,this.controls.minZoom=.75,this.controls.maxZoom=1.65,this.controls.touches.ONE=un.ROTATE,this.controls.touches.TWO=un.DOLLY_ROTATE,this.resetView(),this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),this.resize(),this.frameId=requestAnimationFrame(this.frame)}host;callbacks;renderer;camera=new $a(-6,6,6,-6,.1,100);world=new mm;controls;boardModels=new Kr;carModels=new Kr;actors=[];level;positions=[];targets=[];selector;hintMarker;selected=0;hint=null;ray=new Gm;plane=new Wi(new F(0,1,0),-.25);observer;frameId=0;last=0;drag=null;pointers=new Set;multi=!1;touchPoints=new Map;pinch=null;floorMaterials=[];abort=new AbortController;reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;disposed=!1;paused=!1;inputLocked=!1;animating=!1;setLevel(e,t){this.cancelDrag(),this.actors.forEach(n=>this.world.remove(n)),this.carModels.dispose(),this.carModels=new Kr,this.level=e,this.actors=e.cars.map((n,s)=>{const a=this.carModels.vehicle(n,s);return this.world.add(a),a}),this.sync(t,!0),this.select(0),this.showHint(null)}point(e,t){const n=this.level.cars[e],s=t-3+n.size/2;return new F(n.axis==="x"?s:n.lane-2.5,0,n.axis==="z"?s:n.lane-2.5)}sync(e,t=!1){this.positions=[...e],this.targets=e.map((n,s)=>this.point(s,n)),(t||this.reduced)&&this.actors.forEach((n,s)=>n.position.copy(this.targets[s])),this.animating=this.actors.some((n,s)=>n.position.distanceToSquared(this.targets[s])>1e-5),this.updateMarkers()}select(e){this.selected=e,this.updateMarkers()}showHint(e){this.hint=e,this.updateMarkers()}updateMarkers(){if(!this.level)return;const e=(t,n,s)=>{const a=this.level.cars[n],r=this.point(n,s);t.position.set(r.x,.079,r.z),t.scale.set(a.axis==="x"?a.size-.035:.98,a.axis==="z"?a.size-.035:.98,1)};this.selector.visible=this.positions[0]!==qt,e(this.selector,this.selected,this.positions[this.selected]),this.hintMarker.visible=!!this.hint,this.hint&&e(this.hintMarker,this.hint.car,Math.min(this.hint.to,4))}cast(e,t){const n=this.renderer.domElement.getBoundingClientRect();this.ray.setFromCamera(new Ue((e-n.left)/n.width*2-1,-(t-n.top)/n.height*2+1),this.camera)}ground(e,t){return this.cast(e,t),this.ray.ray.intersectPlane(this.plane,new F)}pointerDown=e=>{if(e.button!==0)return;if(this.pointers.add(e.pointerId),this.touchPoints.set(e.pointerId,new Ue(e.clientX,e.clientY)),this.pointers.size>1){this.multi=!0,this.cancelDrag();const a=[...this.touchPoints.values()];this.pinch={distance:a[0].distanceTo(a[1]),zoom:this.camera.zoom},this.controls.enabled=!1;return}if(this.multi=!1,this.paused||this.inputLocked||this.animating||this.positions[0]===qt)return;this.cast(e.clientX,e.clientY);const t=this.ray.intersectObjects(this.actors,!0)[0];if(!t)return;const n=t.object.userData.car,s=this.ground(e.clientX,e.clientY);s&&(this.callbacks.select(n),this.controls.enabled=!1,this.drag={pointer:e.pointerId,car:n,start:s,from:this.positions[n],to:this.positions[n],x:e.clientX,y:e.clientY,moved:!1},this.renderer.domElement.setPointerCapture(e.pointerId))};pointerMove=e=>{if(this.touchPoints.has(e.pointerId)&&this.touchPoints.set(e.pointerId,new Ue(e.clientX,e.clientY)),this.multi&&this.pinch&&this.touchPoints.size>=2&&!this.paused){const o=[...this.touchPoints.values()];this.camera.zoom=Yo.clamp(this.pinch.zoom*o[0].distanceTo(o[1])/Math.max(1,this.pinch.distance),.75,1.65),this.camera.updateProjectionMatrix();return}const t=this.drag;if(!t||t.pointer!==e.pointerId||this.multi||this.paused)return;const n=this.ground(e.clientX,e.clientY);if(!n||(Math.hypot(e.clientX-t.x,e.clientY-t.y)>6&&(t.moved=!0),!t.moved))return;const s=this.level.cars[t.car].axis,a=ks(this.level.cars,this.positions,t.car),r=Yo.clamp(t.from+n[s]-t.start[s],a.min,a.max);t.to=r,this.actors[t.car].position.copy(this.point(t.car,r))};pointerUp=e=>{const t=this.drag;if(this.pointers.delete(e.pointerId),this.touchPoints.delete(e.pointerId),t?.pointer===e.pointerId){let n=Math.round(t.to);t.car===0&&n>=5&&(n=qt),this.drag=null,!this.multi&&!this.paused&&!this.inputLocked&&t.moved&&n!==t.from&&this.callbacks.move({car:t.car,to:n}),this.sync(this.positions),queueMicrotask(()=>{this.disposed||(this.controls.enabled=!this.paused)})}this.pointers.size||(this.multi=!1,this.pinch=null,queueMicrotask(()=>{this.disposed||(this.controls.enabled=!this.paused)}))};pointerCancel=e=>{this.pointers.delete(e.pointerId),this.touchPoints.delete(e.pointerId),this.cancelDrag(),this.pointers.size||(this.multi=!1,this.pinch=null)};lostCapture=e=>{this.drag?.pointer===e.pointerId&&this.pointerCancel(e)};cancelDrag(){this.drag&&(this.actors[this.drag.car].position.copy(this.targets[this.drag.car]),this.drag=null),this.controls&&(this.controls.enabled=!this.paused)}setPaused(e){this.paused=e,this.cancelDrag(),this.pointers.clear(),this.touchPoints.clear(),this.pinch=null,this.multi=!1,this.controls.enabled=!e}resetView(){this.camera.position.set(5.4,14,10),this.controls.target.set(.35,0,0),this.camera.zoom=1,this.controls.update(),this.resize()}rotate(e){const t=this.camera.position.clone().sub(this.controls.target);t.applyAxisAngle(new F(0,1,0),e*Math.PI/12),this.camera.position.copy(this.controls.target).add(t),this.controls.update(),this.resize()}topView(){this.camera.position.set(.35,18,.01),this.camera.zoom=1,this.controls.update(),this.resize()}resize(){const e=Math.max(1,this.host.clientWidth),t=Math.max(1,this.host.clientHeight),n=e/t;this.renderer.setSize(e,t),this.camera.updateMatrixWorld();const s=[];for(const d of[-3.9,4.8])for(const m of[-.52,.9])for(const g of[-3.9,3.9])s.push(new F(d,m,g).applyMatrix4(this.camera.matrixWorldInverse));const a=Math.min(...s.map(d=>d.x)),r=Math.max(...s.map(d=>d.x)),o=Math.min(...s.map(d=>d.y)),c=Math.max(...s.map(d=>d.y)),l=Math.max((r-a)/n,c-o)/2+.3,f=(a+r)/2,u=(o+c)/2;this.camera.left=f-l*n,this.camera.right=f+l*n,this.camera.top=u+l,this.camera.bottom=u-l,this.camera.updateProjectionMatrix()}screenPoint(e,t=this.positions[e]){const n=this.point(e,t);n.y=.5,n.project(this.camera);const s=this.renderer.domElement.getBoundingClientRect();return{x:s.left+(n.x+1)*s.width/2,y:s.top+(1-n.y)*s.height/2}}frame=e=>{if(this.disposed)return;const t=Math.min((e-(this.last||e))/1e3,.05);if(this.last=e,!this.paused){let n=!1;this.actors.forEach((s,a)=>{this.drag?.car!==a&&(s.position.distanceToSquared(this.targets[a])>1e-5?(s.position.lerp(this.targets[a],1-Math.exp(-22*t)),n=!0):s.position.copy(this.targets[a]))}),this.animating=n}this.callbacks.frame(this.paused?0:t),document.hidden||this.renderer.render(this.world,this.camera),this.frameId=requestAnimationFrame(this.frame)};dispose(){this.disposed=!0,cancelAnimationFrame(this.frameId),this.abort.abort(),this.observer.disconnect(),this.controls.dispose();for(const e of[this.selector,this.hintMarker])e.geometry.dispose(),e.material.dispose();this.world.traverse(e=>{e instanceof Gr&&e.shadow.dispose()}),this.boardModels.dispose(),this.carModels.dispose(),this.floorMaterials.forEach(e=>e.dispose()),this.renderer.dispose(),this.renderer.domElement.remove(),this.world.clear()}}class jv{enabled=!0;context;unlock(){if(this.enabled)try{this.context??=new AudioContext,this.context.state==="suspended"&&this.context.resume().catch(()=>{})}catch{}}play(e=!1){!this.enabled||this.context?.state!=="running"||(e?[523,659,784,1047]:[440,660]).forEach((t,n)=>{const s=this.context,a=s.createOscillator(),r=s.createGain(),o=s.currentTime+n*.09;a.type="sine",a.frequency.value=t,r.gain.setValueAtTime(.035,o),r.gain.exponentialRampToValueAtTime(.001,o+.14),a.connect(r),r.connect(s.destination),a.onended=()=>{a.disconnect(),r.disconnect()},a.start(o),a.stop(o+.16)})}suspend(e){this.context&&(e||!this.enabled?this.context.suspend().catch(()=>{}):this.context.resume().catch(()=>{}))}dispose(){this.context?.close().catch(()=>{})}}const eM={ArrowLeft:dh,ArrowRight:uh,ArrowUp:hh,ArrowDown:ch,CarFront:fh,CircleHelp:xh,Volume2:Dh,VolumeX:Ih,Maximize:yh,Minimize:Sh,RotateCcw:Ah,RotateCw:zh,Undo2:Ph,Redo2:Th,Lightbulb:vh,Pause:Eh,Play:bh,X:Lh,Check:ph,Flag:gh,Settings2:wh,LocateFixed:Mh,Grid2X2:_h,Trophy:Ch,Star:Rh,ChevronRight:mh},re=i=>document.querySelector(i),nt=i=>`<i data-lucide="${i}"></i>`,Rt=(i,e,t,n="")=>`<button type="button" id="${i}" class="icon-button ${n}" aria-label="${e}" data-tooltip="${e}">${nt(t)}</button>`,ys=()=>Od({icons:eM,attrs:{"stroke-width":1.8,"aria-hidden":"true"}}),ci=i=>String(i).padStart(2,"0"),Qa=tp();let Oe=Ht[Qa.level-1],Ii=ru(Oe,Qa.game),st=Ii.getState().G,Pn=Qa.seconds;const di=Qa.best,Bt=new jv;Bt.enabled=np();let ft,Ct=0,Un=Oe.id,Cn=Oe.difficulty,Yi=!1,Nl=!1,Ki=null,Is=null,cn=null,ri=null,cs=!1,Pa=0,Ul,Da=-1,Zo=!1,Ys=!1;const It=new AbortController;Fh("parking-escape");re("#app").innerHTML=`
  <header class="header">
    <a class="brand" href="${Oh("./")}" aria-label="返回游戏大厅" title="返回游戏大厅">
      <span class="back-mark">${nt("arrow-left")}</span><span class="parking-mark">P<span></span></span>
      <span><h1>益智移车出库</h1><small>PARKING ESCAPE</small></span>
    </a>
    <nav class="header-tools" aria-label="游戏工具">
      ${Rt("rules","游戏规则","circle-help")}${Rt("sound","关闭音效","volume-2")}${Rt("fullscreen","进入全屏","maximize")}${Rt("pause","暂停游戏","pause")}
      <span class="divider"></span>${Rt("settings","游戏设置","settings-2")}
      <button id="restart" class="restart-button" aria-label="新的一局">${nt("rotate-ccw")}<span>新的一局</span></button>
    </nav>
  </header>
  <main class="play-area">
    <section class="game-space" aria-label="停车场">
      <div class="challenge-bar"><div><div class="eyebrow"><span id="level-number">第 01 关</span><span class="slash">/</span><span id="difficulty">初来乍到</span></div><h2 id="level-name">清晨出发</h2></div><div class="traffic-status" id="traffic-status"><span></span><span id="traffic-label">出口待疏通</span>${nt("flag")}</div></div>
      <div id="parking-scene"><div class="scene-loading" id="loading">停车场准备中</div></div>
      <div class="scene-tools"><span class="board-caption">城市停车场 <span>06 × 06</span></span><div class="view-tools" role="group" aria-label="停车场视角">${Rt("view-left","向左旋转视角","rotate-ccw")}${Rt("view-top","俯视停车场","grid2-x2")}${Rt("view-reset","恢复默认视角","locate-fixed")}${Rt("view-right","向右旋转视角","rotate-cw")}</div></div>
      <div class="pause-overlay" id="pause-overlay" hidden>${nt("pause")}<h2>休息一下</h2><button class="primary-button" id="resume">${nt("play")}继续游戏</button></div>
    </section>
    <aside class="sidebar" aria-label="本关状态与操作">
      <div class="mission"><span class="eyebrow">本关目标</span><div><span class="police-mark">${nt("car-front")}<i></i></span><h2>警车出库</h2><span class="solo-label">单人</span></div></div>
      <div class="stats"><div class="move-stat"><span class="eyebrow">已用步数</span><strong id="move-count">00</strong></div><div class="secondary-stats"><div><span>最少步数</span><strong id="minimum">4</strong></div><div><span>个人最佳</span><strong id="best">未通关</strong></div><div><span>本局用时</span><strong id="timer">00:00</strong></div></div></div>
      <div class="puzzle-tools" role="group" aria-label="移车工具">${Rt("undo","撤销一步","undo-2")}${Rt("redo","重做一步","redo-2")}<button id="hint" class="hint-button" aria-label="提示" data-tooltip="提示">${nt("lightbulb")}<span>提示</span></button></div>
      <div class="move-panel"><label class="eyebrow" for="vehicle-select">当前车辆</label><div class="vehicle-select-wrap"><span id="car-swatch"></span><select id="vehicle-select" aria-label="当前车辆"></select></div><div class="direction-controls" role="group" aria-label="移动车辆">${Rt("move-back","向左移动一格","arrow-left","direction-button")}${Rt("move-forward","向右移动一格","arrow-right","direction-button")}<button id="exit" class="primary-button" aria-label="警车出库">出库${nt("arrow-right")}</button></div></div>
      <div class="hint-result" id="hint-result" hidden><span id="hint-label" role="status"></span><button id="apply-hint" class="icon-button" aria-label="执行提示这一步" data-tooltip="执行提示这一步">${nt("arrow-right")}</button></div>
      <div class="chapter-progress"><div class="progress-heading"><span class="eyebrow">出库旅程</span><span id="completed">0 / ${Ht.length}</span></div><div class="progress-track"><span id="progress-fill"></span></div><div class="chapter-title"><span id="chapter-name">初来乍到</span><button id="all-levels" aria-label="选择关卡">全部关卡${nt("chevron-right")}</button></div><div class="chapter-levels" id="chapter-levels"></div></div>
    </aside>
  </main>
  <footer class="garage"><div class="garage-heading">${nt("car-front")}<span>本关车辆</span><strong id="car-count">9</strong></div><div class="garage-cars" id="garage-cars" role="group" aria-label="选择车辆"></div><span class="garage-end">${nt("flag")}出发有序，路路畅通</span></footer>
  <dialog id="rules-dialog" aria-labelledby="rules-title"><div class="dialog-top"><span class="eyebrow">PARKING ESCAPE</span>${Rt("close-rules","关闭规则","x","close-dialog")}</div><h2 id="rules-title">游戏规则</h2><ol class="rules-list"><li><strong>各行其道</strong><p>车辆只能沿车身方向前后移动，不能转弯、横移或越过其他车辆。</p></li><li><strong>让出一条路</strong><p>黑白警车从右侧出口完全驶出，即为通关。</p></li><li><strong>少一步，更精彩</strong><p>一次连续滑动计一步，出库也计一步。达到最少步数得三星，多五步以内得二星，其余通关得一星。</p></li></ol><button class="primary-button wide close-dialog">${nt("check")}开始挑战</button></dialog>
  <dialog id="settings-dialog" aria-labelledby="settings-title"><form id="settings-form"><div class="dialog-top"><span class="eyebrow">${Ht.length} 个停车场</span>${Rt("close-settings","关闭设置","x","close-dialog")}</div><h2 id="settings-title">选择关卡</h2><div class="difficulty-options" id="difficulty-options" role="group" aria-label="关卡难度"></div><div id="level-grid"></div><div class="settings-footer"><div class="draft-summary" id="draft-summary" role="status"></div><button type="submit" class="primary-button wide">按此关卡开始新局${nt("arrow-right")}</button></div></form></dialog>
  <dialog id="restart-dialog" aria-labelledby="restart-title"><div class="dialog-top"><span class="eyebrow">重新出发</span>${Rt("close-restart","取消重开","x","close-dialog")}</div><h2 id="restart-title">重新开始这一关？</h2><p>本关车辆将回到初始位置。</p><div class="dialog-actions"><button class="secondary-button close-dialog">继续这局</button><button class="primary-button" id="confirm-restart">${nt("rotate-ccw")}重新开局</button></div></dialog>
  <dialog id="result-dialog" aria-labelledby="result-title"><div class="dialog-top"><span class="eyebrow">PARKING COMPLETE</span>${Rt("close-result","查看停车场","x","close-dialog")}</div><div class="result-trophy">${nt("trophy")}</div><h2 id="result-title">顺利出库！</h2><p id="result-level"></p><div class="result-stars" id="result-stars"></div><div class="result-stats"><div><strong id="result-moves"></strong><span>移车步数</span></div><div><strong id="result-time"></strong><span>本局用时</span></div><div><strong id="result-best"></strong><span>个人最佳</span></div></div><button class="primary-button wide" id="next-level">下一关${nt("arrow-right")}</button><button class="text-button" id="play-again">${nt("rotate-ccw")}再来一局</button></dialog>
  <div id="toast" class="toast" role="status" hidden></div>
`;const Mi=()=>st.positions[0]===qt,Fn=()=>Yi||!!Ki||document.hidden,On=()=>Fn()||!!ft?.animating||Ys,Ss=()=>ip({version:2,level:Oe.id,game:st,seconds:Pn,best:di}),Fl=()=>`${ci(Math.floor(Pn/60))}:${ci(Math.floor(Pn)%60)}`;function ui(){Pa++,cn?.terminate(),cn=null,ri=null,cs=!1,ft?.showHint(null),re("#hint-result").hidden=!0}function Bn(){ft?.setPaused(Fn()),Bt.suspend(document.hidden||Yi||!!Ki&&Ki.id!=="result-dialog"),re("#pause-overlay").hidden=!Yi;const i=Yi?"继续游戏":"暂停游戏";re("#pause").setAttribute("aria-label",i),re("#pause").dataset.tooltip=i,re("#pause").innerHTML=nt(Yi?"play":"pause"),Dn()}function ja(i,e){ui(),Ki||(Is=e??document.activeElement),Ki?.close(),Ki=re(i),Ki.showModal(),Bn()}function Ol(){Ki?.close(),Ki=null,Bn(),(Is?.isConnected&&!Is.closest("[hidden]")&&!Is.hasAttribute("disabled")?Is:re("#restart")).focus()}function Fs(i){re("#toast").textContent=i,re("#toast").hidden=!1}function Wu(){const i=document.documentElement,e=document;if(e.fullscreenEnabled&&typeof i.requestFullscreen=="function"&&typeof e.exitFullscreen=="function")return{element:e.fullscreenElement,enter:()=>i.requestFullscreen(),exit:()=>e.exitFullscreen()};if((e.webkitFullscreenEnabled??e.fullscreenEnabled)!==!1&&typeof i.webkitRequestFullscreen=="function"&&typeof e.webkitExitFullscreen=="function")return{element:e.webkitFullscreenElement,enter:()=>i.webkitRequestFullscreen(),exit:()=>e.webkitExitFullscreen()}}function er(){const i=Wu(),e=!!i?.element,t=e?"退出全屏":"进入全屏";re("#fullscreen").hidden=!i,re("#fullscreen").setAttribute("aria-label",t),re("#fullscreen").setAttribute("aria-pressed",String(e)),re("#fullscreen").dataset.tooltip=t,re("#fullscreen").innerHTML=nt(e?"minimize":"maximize"),ys()}async function tM(){const i=Wu();if(!i){er();return}try{i.element?await i.exit():await i.enter()}catch{Ys||Fs("暂时无法切换全屏，请稍后再试")}}function Xu(){re("#garage-cars").innerHTML=Oe.cars.map((i,e)=>`<button class="garage-car" type="button" data-car="${e}" aria-label="选择${e===0?"警车":`${ci(e)} ${zn(i.id).name}`}" aria-pressed="${e===Ct}" data-tooltip="${zn(i.id).name}" style="--car:${zn(i.id).color}"><span class="mini-car">${nt("car-front")}</span><span>${e===0?"警车":ci(e)}</span></button>`).join(""),re("#vehicle-select").innerHTML=Oe.cars.map((i,e)=>`<option value="${e}">${e===0?"":`${ci(e)} `}${zn(i.id).name}</option>`).join(""),re("#car-count").textContent=String(Oe.cars.length),ys()}function Bl(){const i=Object.keys(di).length;re("#completed").textContent=`${i} / ${Ht.length}`,re("#progress-fill").style.width=`${i/Ht.length*100}%`,re("#chapter-name").textContent=Hs[Oe.difficulty];const e=Math.floor((Oe.id-1)/6)*6;re("#chapter-levels").innerHTML=Ht.slice(e,e+6).map(t=>`<button type="button" data-level="${t.id}" aria-label="第 ${t.id} 关 ${t.name}" ${t.id===Oe.id?'aria-current="step"':""} class="${di[t.id]?"completed":""}">${ci(t.id)}${di[t.id]?nt("check"):""}</button>`).join("")}function Dn(){Zo=!!ft?.animating;const i=On(),e=Mi(),t=Oe.cars[Ct],n=ks(Oe.cars,st.positions,Ct);re("#undo").disabled=i||e||!st.past.length,re("#redo").disabled=i||e||!st.future.length,re("#hint").disabled=i||e||cs,re("#hint span").textContent=cs?"思考中":"提示",re("#move-back").disabled=i||e||n.min>=st.positions[Ct],re("#move-forward").disabled=i||e||n.max<=st.positions[Ct],re("#exit").disabled=i||e||ks(Oe.cars,st.positions,0).max!==qt,re("#apply-hint").disabled=i||!ri;for(const[s,a,r]of[["move-back",t.axis==="x"?"左":"上",t.axis==="x"?"arrow-left":"arrow-up"],["move-forward",t.axis==="x"?"右":"下",t.axis==="x"?"arrow-right":"arrow-down"]]){const o=`向${a}移动一格`;re(`#${s}`).setAttribute("aria-label",o),re(`#${s}`).dataset.tooltip=o,re(`#${s}`).innerHTML=nt(r)}re("#vehicle-select").value=String(Ct),re("#vehicle-select").disabled=i||e,re("#car-swatch").style.background=zn(t.id).color;for(const s of document.querySelectorAll("[data-car]"))s.setAttribute("aria-pressed",String(Number(s.dataset.car)===Ct)),s.disabled=i||e;ft&&(ft.inputLocked=i||e),ys()}function Gl(){re("#level-number").textContent=`第 ${ci(Oe.id)} 关`,re("#level-name").textContent=Oe.name,re("#difficulty").textContent=Hs[Oe.difficulty],re("#move-count").textContent=ci(st.past.length),re("#minimum").textContent=String(Oe.minimum),re("#best").textContent=di[Oe.id]?`${di[Oe.id]} 步`:"未通关",re("#timer").textContent=Fl();const i=ks(Oe.cars,st.positions,0).max===qt;re("#traffic-status").classList.toggle("clear",i||Mi()),re("#traffic-label").textContent=Mi()?"顺利出库":i?"出口已畅通":"出口待疏通",Dn()}function qu(){Ul=Ii.subscribe(i=>{if(!i)return;const e=i.G.positions.some((t,n)=>t!==st.positions[n]);st=i.G,e&&ft?.sync(st.positions),Mi()&&(di[Oe.id]=Math.min(di[Oe.id]??1/0,st.past.length)),Gl(),Ss()}),Ii.start()}function Js(i){ui(),Ul?.(),Ii.stop(),Oe=Ht[i-1],Ct=0,Pn=0,Da=-1,Nl=!1,Yi=!1,Ii=ru(Oe),st=Ii.getState().G,ft?.setLevel(Oe,st.positions),ft?.resetView(),Ol(),re("#toast").hidden=!0,Xu(),Bl(),qu(),Gl(),Ss()}function Hl(i){On()||Mi()||!Oe.cars[i]||(Ct=i,ft?.select(i),Dn())}function tr(i){On()||!xl(Oe.cars,st.positions,i)||(ui(),re("#toast").hidden=!0,Bt.unlock(),Ct=i.car,ft?.select(Ct),Ii.moves.slide(i),Bt.play())}function kl(i){let e=st.positions[Ct]+i;Ct===0&&e===5&&(e=qt),tr({car:Ct,to:e})}function ir(i=Oe.id,e=re("#settings")){Un=i,Cn=Ht[i-1].difficulty,re("#difficulty-options").innerHTML=Hs.map((t,n)=>{const s=Ht.filter(a=>a.difficulty===n);return`<button type="button" data-difficulty="${n}" aria-label="${t}" aria-pressed="${n===Cn}">${t}<small>${s.filter(a=>di[a.id]).length} / ${s.length}</small></button>`}).join(""),Yu(),ja("#settings-dialog",e),re(`[data-draft="${Un}"]`).scrollIntoView({block:"nearest"})}function Yu(){document.querySelectorAll("[data-difficulty]").forEach(i=>i.setAttribute("aria-pressed",String(Number(i.dataset.difficulty)===Cn))),re("#level-grid").innerHTML=`<fieldset><legend>${Hs[Cn]} · 所有关卡均可挑战</legend><div class="level-options" role="group" aria-label="${Hs[Cn]}">${Ht.filter(i=>i.difficulty===Cn).map(i=>`<button type="button" data-draft="${i.id}" aria-label="第 ${i.id} 关 ${i.name}" aria-pressed="${i.id===Un}" class="${di[i.id]?"completed":""}">${ci(i.id)}<small>${di[i.id]?nt("check"):`${i.minimum} 步`}</small></button>`).join("")}</div></fieldset>`,re("#level-grid").scrollTop=0,Ku()}function Ku(){const i=Ht[Un-1];document.querySelectorAll("[data-draft]").forEach(e=>e.setAttribute("aria-pressed",String(Number(e.dataset.draft)===Un))),re("#draft-summary").textContent=`第 ${ci(i.id)} 关 · ${i.name} · 最少 ${i.minimum} 步`,ys()}function iM(){Nl=!0,re("#result-level").textContent=`第 ${ci(Oe.id)} 关 · ${Oe.name}`;const i=Zf(st.past.length,Oe.minimum);re("#result-stars").innerHTML=[1,2,3].map(e=>`<span class="${e<=i?"earned":""}">${nt("star")}</span>`).join(""),re("#result-stars").setAttribute("aria-label",`${i} 星`),re("#result-moves").textContent=String(st.past.length),re("#result-time").textContent=Fl(),re("#result-best").textContent=String(di[Oe.id]),re("#next-level").innerHTML=Oe.id===Ht.length?`全部关卡${nt("grid2-x2")}`:`下一关${nt("arrow-right")}`,Bl(),Bt.play(!0),ja("#result-dialog"),ys()}function nM(){if(On()||Mi()||cs)return;ui(),cs=!0;const i=Pa;try{cn=new Worker(new URL(""+new URL("hint.worker-DGLfRcSU.js",import.meta.url).href,import.meta.url),{type:"module"}),cn.onmessage=e=>{if(!(i!==Pa||Fn())){if(cn?.terminate(),cn=null,cs=!1,e.data.status==="solved"&&e.data.moves.length){ri=e.data.moves[0],Ct=ri.car,ft?.select(Ct),ft?.showHint(ri);const t=Oe.cars[ri.car],n=ri.to-st.positions[ri.car],s=t.axis==="x"?n>0?"向右":"向左":n>0?"向下":"向上";re("#hint-label").textContent=ri.to===qt?"警车可以出库了":`${ci(ri.car)} ${zn(t.id).name} ${s} ${Math.abs(n)} 格`,re("#hint-result").hidden=!1}else Fs(e.data.status==="limit"?"本次提示计算较久，请稍后再试":"当前没有可用提示");Dn()}},cn.onerror=()=>{i===Pa&&(ui(),Fs("提示暂不可用，请稍后再试"),Dn())},cn.postMessage({cars:Oe.cars,positions:st.positions})}catch{ui(),Fs("提示暂不可用，请稍后再试")}Dn()}function sM(i){Ys||(!Fn()&&!Mi()&&(st.past.length||st.future.length)&&(Pn+=i),Math.floor(Pn)!==Da&&(Da=Math.floor(Pn),re("#timer").textContent=Fl(),Da%5===0&&Ss()),Zo!==!!ft?.animating&&(Zo=!!ft?.animating,Dn()),Mi()&&!Nl&&!ft?.animating&&!Fn()&&iM())}const xt=(i,e)=>re(i).addEventListener("click",e,{signal:It.signal});xt("#rules",()=>ja("#rules-dialog",re("#rules")));xt("#settings",()=>ir());xt("#all-levels",()=>ir(Oe.id,re("#all-levels")));xt("#restart",()=>{(st.past.length||st.future.length)&&!Mi()?ja("#restart-dialog",re("#restart")):Js(Oe.id)});xt("#confirm-restart",()=>Js(Oe.id));xt("#play-again",()=>Js(Oe.id));xt("#next-level",()=>{Oe.id===Ht.length?ir(1):Js(Oe.id+1)});xt("#pause",()=>{ui(),Yi=!Yi,Bn()});xt("#resume",()=>{Yi=!1,Bn()});xt("#undo",()=>{!On()&&!Mi()&&st.past.length&&(ui(),Ii.moves.back())});xt("#redo",()=>{!On()&&!Mi()&&st.future.length&&(ui(),Ii.moves.forward())});xt("#hint",nM);xt("#apply-hint",()=>{ri&&tr(ri)});xt("#move-back",()=>kl(-1));xt("#move-forward",()=>kl(1));xt("#exit",()=>tr({car:0,to:qt}));xt("#view-left",()=>ft?.rotate(-1));xt("#view-right",()=>ft?.rotate(1));xt("#view-top",()=>ft?.topView());xt("#view-reset",()=>ft?.resetView());function $u(){const i=Bt.enabled?"关闭音效":"开启音效";re("#sound").setAttribute("aria-label",i),re("#sound").setAttribute("aria-pressed",String(Bt.enabled)),re("#sound").dataset.tooltip=i,re("#sound").innerHTML=nt(Bt.enabled?"volume-2":"volume-x"),ys()}xt("#sound",()=>{Bt.enabled=!Bt.enabled,sp(Bt.enabled),Bt.unlock(),Bt.suspend(Fn()),$u()});xt("#fullscreen",()=>{tM()});for(const i of["fullscreenchange","webkitfullscreenchange"])document.addEventListener(i,er,{signal:It.signal});for(const i of["fullscreenerror","webkitfullscreenerror"])document.addEventListener(i,()=>Fs("暂时无法切换全屏，请稍后再试"),{signal:It.signal});document.querySelectorAll(".close-dialog").forEach(i=>i.addEventListener("click",Ol,{signal:It.signal}));document.querySelectorAll("dialog").forEach(i=>i.addEventListener("cancel",e=>{e.preventDefault(),Ol()},{signal:It.signal}));re("#settings-form").addEventListener("submit",i=>{i.preventDefault(),Js(Un)},{signal:It.signal});re("#difficulty-options").addEventListener("click",i=>{const e=i.target.closest("[data-difficulty]");e&&(Cn=Number(e.dataset.difficulty),Yu())},{signal:It.signal});re("#level-grid").addEventListener("click",i=>{const e=i.target.closest("[data-draft]");e&&(Un=Number(e.dataset.draft),Ku())},{signal:It.signal});re("#chapter-levels").addEventListener("click",i=>{const e=i.target.closest("[data-level]");e&&ir(Number(e.dataset.level),e)},{signal:It.signal});re("#garage-cars").addEventListener("click",i=>{const e=i.target.closest("[data-car]");e&&Hl(Number(e.dataset.car))},{signal:It.signal});re("#vehicle-select").addEventListener("change",i=>Hl(Number(i.target.value)),{signal:It.signal});document.addEventListener("pointerdown",()=>{Fn()||Bt.unlock()},{signal:It.signal});document.addEventListener("visibilitychange",()=>{ui(),Bn(),Ss()},{signal:It.signal});document.addEventListener("keydown",i=>{if(On()||i.ctrlKey||i.metaKey||i.altKey||i.target instanceof HTMLElement&&i.target.matches("input, select, textarea, button, a"))return;const t=(Oe.cars[Ct].axis==="x"?["ArrowLeft","ArrowRight"]:["ArrowUp","ArrowDown"]).indexOf(i.key);t!==-1&&(i.preventDefault(),kl(t?1:-1))},{signal:It.signal});function Nd(){re("#loading")?.remove(),re("#parking-scene").insertAdjacentHTML("beforeend",'<div class="scene-error" role="alert"><h2>停车场暂时无法显示</h2><p>请重新加载页面，或使用支持 WebGL 的浏览器。</p><button class="primary-button" id="reload">重新加载</button></div>'),xt("#reload",()=>location.reload())}Xu();Bl();$u();er();Gl();try{ft=new Qv(re("#parking-scene"),{select:Hl,move:tr,frame:sM,error:Nd}),ft.setLevel(Oe,st.positions),re("#loading").remove()}catch(i){console.error(i),Nd()}qu();Bn();function aM(){Ys||(Ss(),Ys=!0,ui(),Ul?.(),Ii.stop(),It.abort(),ft?.dispose(),Bt.dispose())}window.addEventListener("pagehide",i=>{i.persisted?(ui(),ft?.setPaused(!0),Bt.suspend(!0),Ss()):aM()},{signal:It.signal});window.addEventListener("pageshow",i=>{i.persisted&&(Bn(),er())},{signal:It.signal});
