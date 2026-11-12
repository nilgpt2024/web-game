'use strict';
// Run attire is presentation-only: it never uses gameplay RNG or changes combat stats.
// Each row is a deliberately chosen material, attachment and action response.
const attirePalette={ember:'#efae78',venom:'#badb81',frost:'#bce5ed',copper:'#e2b780',moss:'#b9cf99',silk:'#c6dfe8',sky:'#a9d4ec',rose:'#e5a7b5',gold:'#e6cc85',moon:'#cdb5eb',bone:'#e8dbc0',iron:'#a9bfc5'};
const attireRows=`
cinder|needle|thorn|ember|hit|ember barbs along the needle
venom|belt|bottle|venom|hit|a hanging widow-venom sac
rime|head|branch|frost|hit|forked frost antennae
chain|mantle|wing|copper|hit|copper-veined winglets
burst|shoulder|flower|moss|kill|a cluster of funeral mushrooms
leech|belt|root|rose|kill|a redroot sap vessel
gather|belt|spool|silk|hit|a velvet-wrapped silk bobbin
reservoir|shoulder|drop|sky|silk|a glass dew catcher
pogo|boots|thorn|bone|pogo|downward thorn spurs
spring|boots|coil|sky|pogo|springtail ankle coils
comet|shoulder|shield|ember|dash|a scorched comet shell
ward|shoulder|lantern|gold|guard|a caged aegis lantern
thorns|mantle|branch|rose|guard|a climbing briar mantle
duel|needle|claw|bone|hit|a single ivory fang guard
execute|needle|moon|moon|hit|a crescent reaper hook
fury|shoulder|heart|rose|hurt|a heart-shaped hymn brooch
fever|head|flower|ember|hit|a fever-blossom crown
gild|head|claw|gold|kill|gilded jaw ornaments
tea|belt|cup|moss|clear|a steaming hearth-tea flask
dew|mantle|drop|sky|clear|morning-dew cloak jewels
third|belt|bell|gold|hit|three tiny counting bells
fan|needle|star|sky|bolt|a star-shaped spool guard
echo|mantle|moon|moon|halo|echoing crescent cloak clasps
lamp|shoulder|lantern|moss|light|a firefly heart lantern
glass|mantle|crystal|rose|hit|fractured glass wings
lead|boots|stone|iron|move|heavy stone ankle cuffs
dry|belt|spool|bone|bolt|a cracked, empty bobbin
bloodprice|head|moon|rose|hit|a blood-moon diadem
greed|belt|coin|gold|kill|chained debt coins
restless|mantle|wing|rose|hit|tattered restless wings
archive_reed|needle|leaf|moss|hit|a duelist's reed blade binding
archive_quicksilver|belt|spool|iron|dash|a flowing quicksilver bobbin
archive_hollow|shoulder|spool|moon|bolt|a hollow spindle harness
archive_dewglass|needle|drop|sky|bolt|a dewglass trigger gem
archive_boots|boots|claw|moss|move|jointed cricket greaves
archive_heartwood|shoulder|root|moss|guard|a carved heartwood pauldron
archive_tide|belt|drop|silk|silk|a rising-tide reservoir
archive_skyfang|needle|feather|sky|air|an upturned skyhunter fang
archive_pristine|head|mask|bone|clean|a porcelain brow inlay
archive_ambush|needle|thorn|rose|hit|a concealed first-strike thorn
archive_giant|shoulder|claw|gold|hit|a giantkiller trophy tooth
archive_mark|mantle|ribbon|rose|hit|four red counting stitches
archive_pogosilk|boots|spool|silk|pogo|an acrobat's ankle bobbin
archive_thunderheel|boots|star|copper|pogo|lightning-carved heel plates
archive_chase|boots|claw|ember|kill|a hooked hunter's heel
archive_nectar|belt|bottle|gold|kill|a nectar-filled amber sac
archive_afterglow|mantle|wing|gold|kill|luminous afterglow wing fringes
archive_mendbell|shoulder|bell|moss|mend|a mender's green bell
archive_thrifty|mantle|ribbon|moss|mend|neat moss-suture embroidery
archive_winterhalo|head|moon|frost|halo|a frosted winter wreath
archive_halobattery|belt|coil|moon|halo|a moonwell capacitor coil
archive_entrydew|belt|bottle|sky|entry|a pilgrim's dew flask
archive_flawless|shoulder|crystal|gold|clear|an unbroken amber brooch
archive_scavenger|head|branch|iron|kill|lodestone-tipped antennae
archive_patience|needle|thorn|moon|patient|a folded, patient thorn
men_grounded|boots|root|moss|ground|root-bound boot braces
men_rising|head|feather|sky|rise|an upward-swept feather crest
men_falling|boots|claw|bone|fall|plummet-tooth heel blades
men_wallfang|shoulder|stone|moss|wall|a bark-textured climbing plate
men_clean|mantle|star|gold|clean|first-light pollen embroidery
men_wealthy|needle|coin|gold|wealth|a seedweight counterbalance
men_empty|needle|claw|moon|empty|a hollow-spool fang
men_close|needle|claw|iron|hit|a close-combat hooked knuckle
men_distant|head|lens|sky|bolt|a far-thread lens above the brow
men_fresh|needle|crystal|bone|hit|a shellbreaker dust capsule
men_ashbite|head|claw|ember|hit|ash-blackened mandible tips
men_toxic|belt|cup|venom|hit|a little venom-sipping cup
men_brittle|needle|crystal|frost|hit|a jagged frost splinter
men_opening|shoulder|shield|bone|hit|an open-shell shoulder guard
men_dazed|head|flower|gold|hit|a dandelion seed crown
men_slip|mantle|ribbon|silk|dash|a loose slipstitch sash
men_tender|needle|flower|rose|mend|a tender thorn blossom
men_overture|shoulder|bell|moon|halo|a loom-overture chime
men_ribbon|mantle|ribbon|sky|chain|a long flight ribbon
men_quickstart|head|bell|copper|entry|a bright opening bell
men_perfectthread|boots|ribbon|silk|pogo|silver landing wraps
men_perfectpurse|belt|purse|gold|pogo|an acrobat's stitched purse
men_perfectsap|shoulder|bottle|moss|pogo|a sky-nectar ampoule
men_skybattery|boots|coil|copper|pogo|an aerial battery coil
men_springbolt|needle|spool|ember|pogo|a springfire barrel spool
men_skyguard|head|flower|rose|pogo|a folded petal parasol
men_dashrefund|mantle|feather|silk|dash|a windcatcher feather fan
men_dashburst|boots|star|ember|dash|comet-landing heel stars
men_trailfrost|mantle|ribbon|frost|dash|a trailing hoarfrost ribbon
men_sprint|boots|wing|sky|dash|fleet-footed silver fins
men_mendward|shoulder|shield|moss|mend|a sutured shield plate
men_menddash|boots|ribbon|moss|mend|stitchstep ankle bindings
men_mendtide|belt|spool|moss|mend|a warm-tide green spool
men_mendreach|needle|ribbon|moss|mend|a trailing long suture
men_halosap|belt|root|moon|halo|a moonroot sap vial
men_halosilence|head|leaf|moon|halo|a folded hush wreath
men_haloneedle|mantle|star|bone|halo|needle-constellation stitching
men_haloafterguard|shoulder|moon|silk|halo|a crescent aftermoon guard
men_roomspool|belt|spool|copper|entry|a traveling brass bobbin
men_roomfervor|head|star|rose|entry|a fevered threshold sigil
men_killglow|mantle|lantern|gold|kill|a firefly wake cage
men_killsurge|needle|gear|rose|kill|a butcher's rhythm ratchet
men_killguard|mantle|leaf|silk|kill|a last-breath silk veil
men_killfrost|shoulder|flower|frost|kill|a winter-funeral rosette
men_killarc|mantle|branch|copper|kill|a widow's copper filigree
men_cachepurse|belt|key|gold|cache|a cachekeeper's tiny key
men_cachesilk|shoulder|spool|bone|cache|a salvaged cocoon spool
men_trialtea|belt|cup|copper|clear|a travel-worn copper thermos
men_riddlerebate|head|book|gold|riddle|a scholar's folded pollen scroll
men_bargainhunter|head|lens|gold|wealth|a merchant's amber monocle
men_hunterpurse|shoulder|coin|copper|kill|a captain's bounty medallion
men_bossweave|head|spool|gold|hit|a crowned royal bobbin
men_knock|needle|stone|iron|hit|a weighted staggering stitch
men_secondwind|mantle|flower|rose|hurt|a bruised blossom clasp
men_scarguard|shoulder|ribbon|rose|hurt|scar-tissue shoulder stitches
men_thundershell|shoulder|star|copper|hurt|a thunder-carved husk
men_deepinterest|belt|root|gold|clear|a branching dividend charm
men_patientregen|belt|spool|moss|patient|a slow-winding patient spool
men_needletempo|needle|gear|copper|hit|a quickthorn clockwork gear
men_halodial|shoulder|dial|moon|halo|a silver moon dial
men_sunder|boots|thorn|rose|hit|broken sundered spurs
men_mute|needle|ribbon|iron|bolt|a tightly bound silent needle
men_earthbound|boots|stone|moss|ground|chained earthbound stones
men_skybound|mantle|wing|moon|air|shackled skybound wings
men_sting|shoulder|heart|ember|hurt|a hunted-heart brand
men_debt|belt|purse|rose|clear|a debt collector's sealed purse
men_glasshalo|head|moon|rose|halo|a cracked glass-moon crown
men_fatigue|shoulder|drop|gold|move|heavy honey-filled shell plates
men_embers|mantle|heart|ember|hurt|a smoldering ember-vow seal
men_hunger|belt|spool|iron|bolt|a skeletal hollow-thread spool
weave_sky|mantle|feather|sky|pogo|a three-feather skyspindle fan
weave_dash|mantle|branch|copper|dash|a stormstitch wire harness
weave_rot|shoulder|flower|venom|halo|a living plague-loom garden
weave_orbit|belt|moon|moon|halo|a satellite-cocoon astrolabe
weave_guard|shoulder|shield|gold|guard|a gilded reprisal carapace
weave_blood|belt|heart|rose|bolt|a pulsing bloodloom ampoule
core:edge|needle|crystal|silk|hit|a glass-needle edge inlay
core:blood|mantle|root|rose|kill|living bloodroot cloak veins
core:wings|mantle|wing|silk|air|delicate gossamer wing extensions
core:silk|belt|spool|sky|hit|a bottomless double spool
core:heart|shoulder|shield|gold|guard|layered amber carapace armor
core:dash|boots|ribbon|moon|dash|translucent ghoststep wraps
core:reach|needle|thorn|moss|hit|a longthorn blade extension
core:storm|needle|coil|copper|bolt|a storm-cocoon barrel coil
core:fury|head|feather|rose|hit|a wild-rhythm feather crest
oath:thornheart|shoulder|heart|rose|hit|a thorn-pierced oath heart
oath:hunger|belt|claw|bone|hit|a hungry loom-jaw talisman
oath:fleet|boots|wing|rose|move|frayed fleet-oath winglets
iron:edge|needle|thorn|ember|hit|a red-hot forged needle collar
iron:spring|boots|coil|iron|pogo|iron-tempered ankle springs
iron:shell|shoulder|shield|ember|guard|a riveted furnace shell
`.trim().split('\n').map((row,index)=>{const [key,slot,motif,palette,trigger,look]=row.split('|');return{key,slot,motif,color:attirePalette[palette],trigger,look,index}});
const attireCatalog=new Map(attireRows.map(d=>[d.key,d]));
const attireSlots=['mantle','boots','belt','shoulder','needle','head'];
let attireState={owner:null,entries:[],refresh:0,pulses:new Map(),sparks:[],trail:[],clock:0,dash:-1,stamp:0};
let attireDrawingPlayer=false;
function resetAttire(){attireState={owner:player,entries:[],refresh:0,pulses:new Map(),sparks:[],trail:[],clock:0,dash:-1,stamp:0};refreshAttire()}
function attireKey(r){return r.key||'core:'+r.id}
function refreshAttire(){
 const p=player;if(!p)return;const owned=new Map();
 for(const [key,power]of Object.entries(p.gifts||{}))if(power>0&&attireCatalog.has(key))owned.set(key,{...attireCatalog.get(key),power,tier:0});
 for(const r of p.relics||[]){const key=attireKey(r),d=attireCatalog.get(key);if(!d||r.heirloom)continue;const old=owned.get(key);owned.set(key,{...d,power:old?.power||1,tier:Math.max(old?.tier||0,r.tier||0)})}
 for(const [prefix,ids]of [['oath:',p.rootOaths],['iron:',p.ironTempers]])for(const id of ids||[]){const d=attireCatalog.get(prefix+id);if(d)owned.set(d.key,{...d,power:1,tier:2})}
 attireState.owner=p;attireState.entries=[...owned.values()];attireState.refresh=.3;
}
function attireReady(d){const p=player;switch(d.trigger){case'ground':return p.ground;case'air':return !p.ground;case'rise':return !p.ground&&p.vy<0;case'fall':return !p.ground&&p.vy>0;case'wall':return !!p.wall;case'clean':return !roomDamaged;case'wealth':return runSeeds>=25;case'empty':return p.silk<=20;case'silk':return p.silk>=70;case'chain':return combo>=4;case'light':return !!currentNode?.dark;case'patient':return runTime-(p.menLastDamage??p.archiveLastHit??0)>=10;case'entry':return runTime-roomStartedAt<8;case'guard':return p.shields>0||p.wovenCounter;case'hurt':return p.hp<=2||menWindow('hurt');default:return false}}
function attirePulse(key){return Math.max(0,attireState.pulses.get(key)||0)}
function wakeAttire(event,key=null){
 if(attireState.owner!==player)resetAttire();if(attireState.refresh<=0||key)refreshAttire();
 const candidates=attireState.entries.filter(d=>key?d.key===key:d.trigger===event);
 for(const d of candidates)attireState.pulses.set(d.key,Math.max(attirePulse(d.key),key?1.25:.72));
 if(paintedGarden.reduced||!candidates.length||attireState.clock-attireState.stamp<.12)return;
 attireState.stamp=attireState.clock;
 // Small glyphs stay close to the hero; enemy telegraphs retain the whole arena.
 for(const [i,d]of candidates.slice(0,4).entries())attireState.sparks.push({d,x:player.x,y:player.y-6,a:-Math.PI*.85+i*.7,age:0,life:key?1:.5});
 attireState.sparks=attireState.sparks.slice(-16);
}
function tickAttire(dt){
 if(attireState.owner!==player)resetAttire();attireState.clock+=dt;attireState.refresh-=dt;if(attireState.refresh<=0)refreshAttire();
 for(const [key,life]of attireState.pulses){if(life<=dt)attireState.pulses.delete(key);else attireState.pulses.set(key,life-dt)}
 for(const f of attireState.sparks)f.age+=dt;attireState.sparks=attireState.sparks.filter(f=>f.age<f.life);
 if(player.dash>0&&attireState.dash!==player.dashId){attireState.dash=player.dashId;wakeAttire('dash')}
 for(const f of attireState.trail)f.age+=dt;attireState.trail=attireState.trail.filter(f=>f.age<.25);
 if(!paintedGarden.reduced&&(player.dash>0||Math.abs(player.vx)>200)&&attireState.clock-(attireState.lastTrail||0)>.045){attireState.lastTrail=attireState.clock;attireState.trail.push({x:player.x,y:player.y+12,age:0})}
}
function attireShape(d,size=1){
 const c=d.color,v=d.index%3;ctx.save();ctx.scale(size,size);ctx.strokeStyle=c;ctx.fillStyle=c;ctx.lineWidth=1.1;ctx.lineCap='round';ctx.lineJoin='round';
 const path=points=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();finishInk(c,'#081923',1.4)};
 const ring=(x,y,r)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.strokeStyle=c;ctx.stroke()};
 switch(d.motif){
 case'thorn':case'claw':path([[-3,5],[-2,-4],[3+v,-10],[1,0],[4,4]]);line(-1,2,0,-4,'#fff3d2',.7);break;
 case'branch':line(0,6,0,-8,c,1.8);for(let i=0;i<3;i++){const y=3-i*4;line(0,y,-5+i,y-4,c,1.2);line(0,y,5-i,y-4,c,1.2);ellipse(5-i,y-4,1,1,'#ffedce')}break;
 case'root':ctx.beginPath();ctx.moveTo(0,-7);ctx.bezierCurveTo(-8,-2,8,3,-3,8);ctx.moveTo(0,-3);ctx.lineTo(6,1);ctx.moveTo(1,3);ctx.lineTo(-6,4);ctx.stroke();outlinedEllipse(0,0,3,4,c,'#15272b',1);break;
 case'wing':ctx.beginPath();ctx.moveTo(0,7);ctx.bezierCurveTo(-2,-13,12,-13,8,-3);ctx.quadraticCurveTo(15,4,0,7);finishInk(c+'a8','#11242c',1.2);for(let i=0;i<3;i++)line(0,6,6+i,-6+i*4,c,.8);break;
 case'feather':case'leaf':ctx.beginPath();ctx.moveTo(0,8);ctx.quadraticCurveTo(-10,-1,3,-11-v);ctx.quadraticCurveTo(11,2,0,8);finishInk(c,'#10252b',1);line(0,7,3,-8,'#fff2d088',.9);for(let i=0;i<3;i++)line(1,3-i*3,-3,1-i*3,'#143339',.6);break;
 case'bottle':case'drop':ctx.beginPath();ctx.moveTo(0,-8);ctx.bezierCurveTo(-2,-2,-9,5,-2,8);ctx.bezierCurveTo(10,10,7,0,0,-8);finishInk(c+'bb','#0c2531',1.5);line(-2,1,-3,4,'#fff8da',1.2);if(d.motif==='bottle'){line(-3,-6,3,-6,'#dac397',2);line(-3,-8,3,-8,'#624d3a',2)}break;
 case'spool':line(-5,-5,5,-5,c,3);line(-5,5,5,5,c,3);for(let i=0;i<5;i++)line(-3,-3+i*1.5,3,-2+i*1.5,c,1);line(4,2,8,7,c,.8);break;
 case'coil':for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(0,-5+i*3,5,2,0,0,Math.PI*2);ctx.stroke()}break;
 case'bell':path([[-5,4],[-3,0],[-3,-5],[0,-7],[3,-5],[3,0],[5,4]]);ellipse(0,6,1.8,1.5,'#fff0cb');line(-3,1,3,1,'#475044',.8);break;
 case'shield':path([[-7,-7],[6,-6],[5,3],[0,9],[-5,3]]);line(0,-5,0,5,'#ffedc9',1);line(-4,-3,4,-2,'#ffedc9',.7);break;
 case'crystal':path([[0,-10],[5,-3],[3,7],[-2,9],[-5,-3]]);line(0,-7,-1,6,'#fff9de',.9);line(-4,-2,4,-2,'#233d43',.7);break;
 case'moon':ctx.beginPath();ctx.arc(0,0,8,-1.25,1.25);ctx.quadraticCurveTo(-3,0,2.5,-7.6);finishInk(c,'#0c2430',1);ellipse(-3,-2,1.3,1.3,c);break;
 case'heart':ctx.beginPath();ctx.moveTo(0,8);ctx.bezierCurveTo(-15,-2,-4,-12,0,-5);ctx.bezierCurveTo(5,-12,13,-1,0,8);finishInk(c,'#192331',1.2);line(-3,-3,-3,0,'#ffeddc',1);break;
 case'flower':for(let i=0;i<5;i++){ctx.save();ctx.rotate(i*Math.PI*.4);ellipse(0,-4,2.5,4,c);ctx.restore()}outlinedEllipse(0,0,2.7,2.7,'#f2dbac','#123239',1);break;
 case'lantern':line(0,-10,0,-6,c,1);path([[-4,-5],[4,-5],[5,5],[0,8],[-5,5]]);ellipse(0,0,2,4,'#fff0b6');line(-4,-4,-2,6,'#42574f',1);line(4,-4,2,6,'#42574f',1);break;
 case'star':case'gear':{const points=[],n=d.motif==='gear'?8:4;for(let i=0;i<n*2;i++){const a=i*Math.PI/n,r=i%2?3:7;points.push([Math.cos(a)*r,Math.sin(a)*r])}path(points);ellipse(0,0,2,2,'#fff0ca');break}
 case'ribbon':ctx.beginPath();ctx.moveTo(-3,-7);ctx.bezierCurveTo(8,-2,-8,5,4,11+v*2);ctx.strokeStyle='#0d222d';ctx.lineWidth=4;ctx.stroke();ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();break;
 case'stone':path([[-6,-4],[-2,-7],[5,-4],[6,4],[0,7],[-5,4]]);line(-3,-3,2,-4,'#eee5ca',1);line(2,-2,-1,3,'#394d50',1);break;
 case'cup':path([[-5,-3],[4,-3],[3,7],[-3,7]]);ring(5,1,2.5);line(-2,-6,-1,-9,c,.8);line(2,-5,3,-8,c,.8);break;
 case'key':ring(0,-4,3);line(0,-1,0,8,c,2);line(0,5,4,5,c,1.5);line(0,8,3,8,c,1.5);break;
 case'book':path([[-6,-6],[0,-4],[6,-6],[6,6],[0,8],[-6,6]]);line(0,-3,0,6,'#4e594b',1);line(-4,-1,-2,0,'#4e594b',.8);line(2,2,4,1,'#4e594b',.8);break;
 case'purse':outlinedEllipse(0,2,6,6,c,'#132b30',1.2);line(-3,-5,3,-5,'#efdab0',2);line(0,-4,2,3,'#596044',1);break;
 case'mask':path([[-6,-5],[0,-3],[6,-5],[4,5],[0,8],[-4,5]]);line(-4,0,-2,1,'#142e36',1.5);line(2,1,4,0,'#142e36',1.5);break;
 case'coin':case'lens':case'dial':outlinedEllipse(0,0,6,7,c+'c0','#132c37',1.4);ring(0,0,4);if(d.motif==='dial'){line(0,0,0,-4,'#fce9c4',1);line(0,0,3,2,'#fce9c4',1)}else line(-2,-3,2,3,'#fff4d5',1);break;
 }
 if(d.tier>0){const n=d.tier;for(let i=0;i<n;i++)ellipse(-3+i*3,10, .8,.8,giftTiers[n].color)}
 if(d.tier===3){line(-8,-6,-6,-8,'#f6d891',.8);line(6,8,8,6,'#f6d891',.8)}
 // Every charm carries a tiny individual maker's notch, even within one material family.
 line(-3+(d.index%4)*2,5,-2+(d.index%4)*2,6,'#132731',.6);ctx.restore();
}
function attireFeatured(){
 const result=[];for(const slot of attireSlots){const list=attireState.entries.filter(d=>d.slot===slot);if(!list.length)continue;
 // Active pieces take the foreground; otherwise shared attachments take turns.
 const cycle=paintedGarden.reduced?0:Math.floor(attireState.clock/4.5)%list.length;
 const ordered=list.map((d,i)=>({d,rank:attirePulse(d.key)*10+(attireReady(d)?2:0)+(i===cycle?1:0)})).sort((a,b)=>b.rank-a.rank);
 result.push(...ordered.slice(0,2).map(({d},i)=>({...d,position:i})))}return result;
}
function attirePlacement(d,t){const j=d.position||0,bob=paintedGarden.reduced?0:Math.sin(t*2+d.index)*.9;switch(d.slot){case'head':return{x:j?13:-15,y:-42-j*2,angle:j?.3:-.35,size:.64};case'shoulder':return{x:j?13:-12,y:-1+j*8,angle:j?.2:-.2,size:.8};case'belt':return{x:j?4:-10,y:16+bob,angle:bob*.05,size:.62};case'boots':return{x:j?8:-5,y:24,angle:j?.15:-.15,size:.58};case'needle':return{x:18+j*13,y:3+j*2,angle:1.55,size:.62};default:return{x:-24-j*13,y:3+j*4+bob,angle:-.4-j*.3,size:1.1}}}
function drawAttireLayer(x,y,face,t,scale,anim,back){
 if(anim!==player||!attireState.entries.length)return;ctx.save();const inheritedAlpha=ctx.globalAlpha;ctx.translate(x,y);ctx.scale(scale,scale);
 const run=Math.min(1,Math.abs(anim.vx||0)/250);ctx.scale(face*(1+(anim.land||0)*.2),1-(anim.land||0)*.18);ctx.rotate((anim.dash>0?.18:run*.035)*face);
 const featured=attireFeatured();for(const d of featured){if(d.slot==='needle'||(d.slot==='mantle')!==back)continue;const pos=attirePlacement(d,paintedTime()),pulse=attirePulse(d.key),lit=attireReady(d);ctx.save();ctx.translate(pos.x,pos.y);ctx.rotate(pos.angle);if(pulse>0||lit){ellipse(0,0,8*pos.size,10*pos.size,d.color+'28');ctx.globalAlpha=inheritedAlpha}else ctx.globalAlpha=inheritedAlpha*.9;
 const s=pos.size*(1+(paintedGarden.reduced?0:Math.sin(Math.min(1,pulse)*Math.PI)*.12));attireShape(d,s);
 if(d.key==='reservoir'||d.key==='archive_tide'){line(-1,4,-1,4-7*player.silk/100,'#f1ffeb',1)}
 if(d.key==='third'){for(let i=0;i<3;i++)ellipse(-3+i*3,-9,1,1,(player.strikeCount||0)%3>=i?'#fff0bd':'#59626c')}
 if(d.key==='glass'||d.key==='men_glasshalo'||d.key==='men_sunder'){line(-4,-4,1,0,'#301f35',1.2);line(1,0,-1,4,'#301f35',1)}ctx.restore()}
 if(!back){const shown=new Set(featured.map(d=>d.key)),extra=attireState.entries.filter(d=>!shown.has(d.key));const page=paintedGarden.reduced?0:Math.floor(attireState.clock/4.5);const start=extra.length>12?page*12%extra.length:0;
 // Additional gifts become small embroidered sigils, with pages only for extreme builds.
 for(let i=0;i<Math.min(12,extra.length);i++){const d=extra[(start+i)%extra.length];ctx.save();ctx.translate(-15+(i%4)*5,7+Math.floor(i/4)*5);attireShape(d,.22);ctx.restore()}}
 ctx.restore();
}
function drawAttireNeedle(weapon){
 if(!attireDrawingPlayer)return;const length=weapon==='lance'?76:weapon==='twins'?29:46,t=paintedTime();ctx.save();if(veilActive())ctx.globalAlpha*=.35;
 const pieces=attireFeatured().filter(d=>d.slot==='needle');for(const [i,d]of pieces.entries()){ctx.save();ctx.translate(12+i*13,1+i*1.7);ctx.rotate(Math.PI/2);attireShape(d,.6);ctx.restore()}
 const fire=giftPower('cinder')>0||player.ironTempers?.includes('edge'),poison=giftPower('venom')>0||weavePower('rot')>0;
 if(fire){line(20,0,length+7,length*.12-2,'#ecad70',1.5);for(let i=0;i<3;i++){const x=22+i*(length-20)/3,h=2+(paintedGarden.reduced?1:Math.sin(t*9+i*2)*1.5);ctx.beginPath();ctx.moveTo(x-2,x*.12-2);ctx.quadraticCurveTo(x+2,-h-3,x+4,x*.12-2);ctx.strokeStyle='#ffcf8baa';ctx.lineWidth=1.2;ctx.stroke()}}
 if(poison){line(18,5,length+2,length*.12+2,'#bdde83',1.2);for(let i=0;i<2;i++){const x=22+i*(length-22)*.7;ellipse(x,x*.12+3+(paintedGarden.reduced?0:((t*.8+i*.5)%1)*3),1.2,1.8,'#d4e995b0')}}
 if(giftPower('rime')||menPower('brittle'))for(let i=0;i<3;i++){const x=20+i*8;line(x,x*.12,x+3,x*.12-4,'#d7f7f2',.8)}
 ctx.restore();
}
function drawAttireWake(){
 if(!player||attireState.owner!==player||player.inv>0&&Math.floor(time*16)%2!==0)return;
 ctx.save();if(veilActive())ctx.globalAlpha=.28;
 const movers=attireState.entries.filter(d=>['dash','move','air','chain'].includes(d.trigger)).slice(0,3);
 if(!paintedGarden.reduced)for(const [i,d]of movers.entries()){ctx.beginPath();ctx.moveTo(player.x-player.face*(18+i*5),player.y+7+i*4);for(const p of [...attireState.trail].reverse())ctx.lineTo(p.x-player.face*(18+i*5),p.y+Math.sin(p.age*20+i)*4);ctx.strokeStyle=d.color+'70';ctx.lineWidth=1.4;ctx.stroke()}
 for(const f of attireState.sparks){const q=f.age/f.life;ctx.save();ctx.globalAlpha=(1-q)*.65*(veilActive()?.28:1);ctx.translate(f.x+Math.cos(f.a)*(15+q*25),f.y+Math.sin(f.a)*(15+q*25)-q*10);ctx.rotate(f.a*.25);attireShape(f.d,.4);ctx.restore()}ctx.restore();
}
function attireDescription(r){const d=attireCatalog.get(attireKey(r));return d?d.look:''}
function attireJournal(){refreshAttire();if(!attireState.entries.length)return '';return `<details class="attire-journal"><summary>THREAD & CHITIN · ${attireState.entries.length} visible gifts</summary><p>Your gifts become armor, tools and embroidered charms. Related actions wake their colors. Rare pieces gain silver beading; Mythic pieces gain gold filigree. Shared attachments take turns, with active gifts moving to the foreground. Heirlooms keep their own silhouette.</p><div>${attireState.entries.map(d=>`<p><i style="--thread:${d.color}"></i><b>${(wildGifts.find(g=>g.key===d.key)||archiveGifts.find(g=>g.key===d.key)||relicPool.find(g=>'core:'+g.id===d.key)||rootOaths.find(g=>'oath:'+g.id===d.key)||ironTempers.find(g=>'iron:'+g.id===d.key))?.name||d.key}</b><span>${d.look}.</span></p>`).join('')}</div></details>`}
function installItemAppearance(){
 const equip=equipRun;equipRun=function(){equip();resetAttire()};
 const make=makeRoom;makeRoom=function(...a){const r=make(...a);attireState.sparks=[];attireState.trail=[];attireState.pulses.clear();refreshAttire();wakeAttire('entry');return r};
 const apply=applyGift;applyGift=function(d,s,t,p=player){const before=p.gifts?.[d.key]||0;apply(d,s,t,p);if(p===player&&(p.gifts?.[d.key]||0)>before){refreshAttire();wakeAttire('pickup',d.key)}};
 const select=selectRelic;selectRelic=function(i){const before=player.relics.length,r=offered[i],result=select(i);if(player.relics.length>before){refreshAttire();if(r)wakeAttire('pickup',attireKey(r))}return result};
 const held=drawHeldArm;drawHeldArm=function(weapon){held(weapon);drawAttireNeedle(weapon)};
 const art=drawMoth;drawMoth=function(x,y,face=1,t=0,scale=1,anim={}){if(anim===player){if(attireState.owner!==player)resetAttire();ctx.save();if(veilActive())ctx.globalAlpha*=.35;drawAttireLayer(x,y,face,t,scale,anim,true);ctx.restore()}const previous=attireDrawingPlayer;attireDrawingPlayer=anim===player;try{art(x,y,face,t,scale,anim)}finally{attireDrawingPlayer=previous}if(anim===player){ctx.save();if(veilActive())ctx.globalAlpha*=.35;drawAttireLayer(x,y,face,t,scale,anim,false);ctx.restore()}};
 const world=drawTravelerRoom;drawTravelerRoom=function(){world();drawAttireWake()};
 const step=update;update=function(dt){const before=runTime,wasCleared=cleared,cache=currentNode?.depthExtras?.cache,opened=cache?.opened;step(dt);if(state==='playing'&&runTime>before){tickAttire(runTime-before);if(!wasCleared&&cleared)wakeAttire('clear');if(cache&&!opened&&cache.opened)wakeAttire('cache')}};
 const answer=answerRiddle;answerRiddle=function(...a){const prior=currentNode?.puzzle?.status,r=answer(...a);if(prior!=='solved'&&currentNode?.puzzle?.status==='solved')wakeAttire('riddle');return r};
 const hit=hitEnemy;hitEnemy=function(e,...args){const hp=e.hp,direct=!giftInternal,result=hit(e,...args);if(direct&&e.hp<hp)wakeAttire(args[2]?'bolt':'hit');return result};
 const kill=giftKill;giftKill=function(...a){const r=kill(...a);wakeAttire('kill');return r};
 const bounce=pogoBounce;pogoBounce=function(...a){const r=bounce(...a);wakeAttire('pogo');return r};
 const mend=heal;heal=function(...a){const hp=player.hp,r=mend(...a);if(player.hp>hp)wakeAttire('mend');return r};
 const halo=silkHalo;silkHalo=function(...a){const r=halo(...a);if(r)wakeAttire('halo');return r};
 const shot=bolt;bolt=function(...a){const n=shots.length,r=shot(...a);if(shots.length>n)wakeAttire('bolt');return r};
 const damage=hurt;hurt=function(...a){const hp=player.hp,shields=player.shields,r=damage(...a);if(player.hp<hp)wakeAttire('hurt');else if(player.shields<shields)wakeAttire('guard');return r};
 const card=giftCard;giftCard=function(r,i){const html=card(r,i),look=attireDescription(r);return look&&!r.heirloom?html.replace('</button>',`<span class="attire-look">WORN AS · ${look}</span></button>`):html};
 const build=showBuild;showBuild=function(){build();if(state==='dialogue')$('panelcontent').insertAdjacentHTML?.('beforeend',attireJournal())};$('buildbutton').onclick=showBuild;
}
