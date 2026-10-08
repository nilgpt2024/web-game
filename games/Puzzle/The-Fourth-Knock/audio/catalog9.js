import {lines as lines7,cast} from '../content/step7.js';
import {lines8,sequences8} from '../content/step8.js';
import {lines81} from '../content/directing81.js';
import {lines9} from '../content/step9.js';
export {cast};
const active7=new Set(['s7_02','s7_03','s7_04','s7_05','s7_06','s7_07','s7_08','s7_09','s7_10','s7_11','s7_12','s7_14','s7_16','s7_18','s7_21','s7_22','s7_23','s7_24','s7_25','s7_26','s7_27','s7_28','s7_29','s7_30','s7_31']);
const active8=new Set([...Object.values(sequences8).flat(),'s8_p05','s8_p06','s8_m08']);
export const spokenLines=[...lines7.filter(l=>active7.has(l.line_id)),...lines8.filter(l=>active8.has(l.line_id)),...lines81,...lines9];
const asset=(id,kind,title,trigger,duration,description,extra={})=>({id,kind,title,trigger,duration,description,base:`${kind==='music'?'music':kind==='ambience'?'ambience':'sfx'}/${id}`,loop:kind!=='sfx',...extra});
export const soundAssets=[
 asset('mus_lounge_loop','music','An address in the rain','arrival',40,'Original warm, curious chamber-jazz; upright bass, brushes, piano and a spare clarinet motif.',{tempo:'78–88',instruments:'Upright bass; brushes; felt piano; clarinet',intensity:1,mood:'Warm curiosity',intro:2,tail:2}),
 asset('mus_social_unease','music','Terms and conditions','victor_arrives / social_unease',36,'The arrival motif with clipped piano answers and muted trumpet; social awkwardness, never a villain theme.',{tempo:'82–92',instruments:'Upright bass; brushes; piano; muted trumpet',intensity:2,mood:'Polite tension',intro:1,tail:2,tempId:'mus_lounge_loop'}),
 asset('mus_pre_knock','music','Between calls','pre_knock',32,'Sparse bass, widely spaced piano and brush texture. Leave room for rain. No riser or horror anticipation.',{tempo:'68–78',instruments:'Upright bass; sparse piano; light brushes',intensity:1,mood:'Waiting',intro:1,tail:2,tempId:'mus_post_knocks_loop'}),
 asset('mus_investigation_loop','music','Arrange the facts','investigation',48,'Low-distraction noir thinking loop; gentle bass pulse, brush swish and occasional clarinet. No lead melody under speech.',{tempo:'76–86',instruments:'Upright bass; brushes; quiet clarinet; piano',intensity:2,mood:'Thoughtful momentum',intro:2,tail:3}),
 asset('mus_accusation','music','The whole account','accusation',36,'Controlled chamber-noir tension, bass and low piano with a restrained bowed-string colour. No percussion drive or triumph.',{tempo:'58–68',instruments:'Upright bass; low piano; restrained viola',intensity:3,mood:'Controlled confrontation',intro:1,tail:3,tempId:'mus_post_knocks_loop'}),
 asset('mus_dawn','music','Solved, unsettled','dawn',32,'Very quiet unresolved piano and bass harmonics. Reflective, exhausted. No bright resolution; must fade completely before knocks.',{tempo:'50–60',instruments:'Piano; sparse bass harmonics',intensity:1,mood:'Apparent release',intro:2,tail:3}),
 asset('mus_deduction_sting','music','A relation breaks','Case Note 1 realization; Case Notes 2/3/4 confirmation',2.6,'One original compact clever motif: two piano notes, a muted clarinet answer and soft bass punctuation. Understated recognition, no victory fanfare.',{loop:false,base:'music/mus_deduction_sting',tempo:'Free, about 84',instruments:'Piano; clarinet; bass',intensity:2,mood:'Recognition',intro:0,tail:1.1}),
 asset('amb_exterior','ambience','Monsoon outside','Opening travel/house stills',30,'Wide rain over foliage and stone, distant valley wash, no traffic/voices/thunder baked into loop.',{spatial:'Wide exterior, mono-compatible',gain:1}),
 asset('amb_veranda','ambience','Under the roof','Controllable arrival and private Mira conversation',30,'Sheltered rain curtain beyond the roof; close gentle runoff, less direct high-frequency rain at listener.',{spatial:'Rain wide beyond shelter; drips slightly left/right',gain:1,tempId:'amb_lounge_rain_loop'}),
 asset('amb_lounge_rain_loop','ambience','Rain through lounge windows','Lounge outside dramatic silence states',32,'Rain filtered through shut windows, broad and even, no wind entering the room.',{spatial:'Window-side left bias, subtle',gain:1}),
 asset('amb_fireplace_subtle','ambience','Hearth','Lounge only',28,'Small steady hearth with sparse soft crackles. No huge pops or footsteps.',{spatial:'Fireplace centre/rear; narrow stereo',gain:.45}),
 asset('amb_upper_corridor_rain_muffled','ambience','Upper corridor','Corridor before dawn',30,'Close old-house room tone and rain behind corridor glass, cooler and quieter than lounge.',{spatial:'Narrower interior, rain left',gain:1}),
 asset('amb_victor_room_still','ambience','An occupied room, now still','Victor room',30,'Still guest-room air with remote rain on glass. No breathing, ticking watch or implied person.',{spatial:'Mostly centre; window left',gain:1}),
 asset('amb_dawn','ambience','Near dawn','Dawn and final knocks',30,'Thinner easing rain, distant runoff and quiet house air. No birdsong implying cheerful closure.',{spatial:'Distant exterior, restrained stereo',gain:1}),
 asset('sfx_stairs_footsteps','sfx','Wooden footsteps','Each authored walking step; indoor player steps',.28,'One soft shoe-on-timber footfall; dry, warm, no shuffle tail. Used with alternating slight pan and restrained gain.'),
 asset('sfx_walk_stone','sfx','Sheltered stone footstep','Each veranda step',.3,'One soft shoe step on damp stone under shelter; small close contact, not a splash.'),
 asset('sfx_door_handle_locked','sfx','Handle meets night latch','Ada checks the door; demonstration third step',1,'Brief old brass handle turn against a caught separate latch, a restrained wooden resistance. No key jangle.'),
 asset('sfx_door_force','sfx','Strike gives','Forced-door discovery',1.1,'One shoulder pressure, short wooden strike split, latch release. Firm but not explosive; no shout.'),
 asset('sfx_old_house_creak_01','sfx','Landing settles','Arrival at corridor after knocks',1.8,'Single small timber settling creak under feet. Domestic, not horror.'),
 asset('sfx_front_door','sfx','Shelter threshold','Opening final still/live entrance; Victor entrance',1.1,'Soft latch and heavy timber hinge followed by restrained closing thud. No footsteps in file.'),
 asset('sfx_room_transition','sfx','A doorway crossed','Ordinary room transition under fade',.7,'A soft hinge movement and room-air shift, no cinematic whoosh.'),
 asset('sfx_phone_ring','sfx','Downstairs telephone','8:27 telephone beat',1.7,'One short two-part electromechanical landline ring, filtered by lounge distance.'),
 asset('sfx_distant_thunder','sfx','Storm at the road','8:45 road update',4,'Low distant natural thunder rolling outside. No crack, jump-scare or sub-bass dependency.'),
 asset('sfx_paper_handle','sfx','Paper handled','Unsigned message; paper/thread/document inspections',.65,'Quiet single paper lift and settle; dry readable texture.'),
 asset('sfx_watch_check','sfx','A glance at the time','Victor 8:37 watch gesture',.45,'Soft cuff brush and tiny leather strap movement. No electronic beep or magical sparkle.'),
 asset('sfx_watch_inspect','sfx','Broken watch','Watch inspection',.8,'Small metal/glass touch on cloth, then stillness. The stopped watch must never audibly tick.'),
 asset('sfx_bookend_inspect','sfx','Brass weight','Bookend evidence opened',.7,'Small low brass contact on wood; solid weight, not a weapon swing.'),
 asset('sfx_recorder_inspect','sfx','Empty compartment','Recorder inspection; Case Note 3 relationship',.6,'A small cassette compartment hinge and dry plastic click; no tape playback.'),
 asset('sfx_ui_soft_select','sfx','Select','Nearby interaction / clue panel opened',.14,'Soft tactile tap, no computer beep.'),
 asset('sfx_case_fill','sfx','Place a clue term','Every Case Note blank filled',.2,'Quiet pencil-and-paper tick, distinct from confirmation.'),
 asset('sfx_case_wrong','sfx','Reconsider','Incorrect Case Note confirmation',.32,'Gentle erased-pencil brush. No failure buzzer or comic trombone.'),
 asset('sfx_case_note_confirm','sfx','File a conclusion','Successful Case Note',.5,'Restrained ink stamp onto paper. Dry and tactile; not an achievement flourish.'),
 asset('sfx_clue_record','sfx','Keep observation','Evidence recorded',.35,'Short pencil underline on paper, quieter than deduction stamp.'),
 asset('sfx_latch_release','sfx','Release hold-back','Night-latch demonstration first step',.45,'Small metal snib release and spring tongue extending; ordinary rim night-latch hardware.'),
 asset('sfx_latch_close','sfx','Self-catching latch','Night-latch demonstration second step',.8,'Wood door pulled closed, bevel sliding over strike, then clear spring click. Sequence audible without exaggeration.'),
 asset('sfx_four_knocks_master','sfx','Four knocks upstairs','9:14 all four living characters in lounge',5.8,'Exactly four wood-resonant strikes at 0.15, 1.10, 2.05, 4.30 seconds. Moderate low-mid body; upstairs right, naturally decaying. Last strike firmer, not louder by more than 1.5 dB.',{critical:true}),
 asset('sfx_four_knocks_ending','sfx','The same four knocks, sealed room','Final empty corridor',5.8,'Derive from the same four-knock master: identical strikes and onset times, slightly emptier room resonance and more distant perspective. No new motif or extra knock.',{critical:true,tempId:'sfx_four_knocks_master'}),
 asset('sfx_residual_door','sfx','Remembered door','Door Echo beat 1',1.3,'Single door closure, subtly softened bandwidth and short room tail. Not an extra knock.'),
 asset('sfx_residual_mechanism','sfx','A small sound remains','Door Echo beat 2',1.1,'Faint ambiguous mechanical touch. Do not make it diagnostic of the latch or a particular tool.'),
 asset('sfx_residual_steps','sfx','Steps leaving','Door Echo beat 3',2.1,'Three receding soft footsteps with no character identity; shared restrained Residual room colour.'),
 asset('sfx_residual_impact','sfx','Interrupted argument','Victor Voice beat 2',1.4,'One muffled solid impact, abrupt but low level, followed by short silence; no gore or scream.'),
 asset('sfx_residual_search','sfx','Earlier paper search','Earlier Search beat 1',1.7,'Paper shifts and shallow drawer opens; subtle narrowed bandwidth, not supernatural spectacle.'),
 asset('sfx_residual_drawer_close','sfx','The earlier drawer closes','Earlier Search beat 3',1.2,'Quiet drawer closing, fading into ordinary room air; no hidden voice or extra clue.')
];
export const cueAliases={opening_message:'sfx_paper_handle',opening_door:'sfx_front_door',evening_phone:'sfx_phone_ring',watch_check:'sfx_watch_check',case2_timing:'sfx_paper_handle',case3_intent:'sfx_recorder_inspect'};
export const timingMarkers=['opening_still','opening_travel','evening_stairs','body_reveal','body_check','crime_scene_empty','veranda_private','case1_connection','case1_break','accusation_gather','confession_second_silence','ending_fourth_silence'];
