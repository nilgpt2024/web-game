// Additional directing text. Existing case facts and locked confession remain unchanged.
const L=(id,speaker,text,expression='serious',scene='directing')=>({line_id:id,speaker,text,expression,scene,voice_asset:`voices/${speaker}/${id}`,direction:'Understated Indian English. Allow the image and the other person room to register.',auto_advance_allowed:true});
export const lines81=[
 L('s81_o01','aren','Cedar House. Before the rains close the road. There is something you should see.','thinking','opening'),
 L('s81_o02','aren','No signature. An address, and a remarkable confidence in my curiosity.','amused','opening'),
 L('s81_o03','aren','I had been passing through. Apparently, I was expected.','thinking','opening'),
 L('s81_o04','aren','The windows looked warm. That was enough of an answer for now.','neutral','opening'),
 L('s81_clear','ada','Please. Downstairs, both of you. Aren, see what you can without moving him.','solemn','discovery'),
 L('s81_watch','aren','Nine-oh-eight. Six minutes before we heard the knocks.','thinking','watch'),
 L('s81_private','mira','Outside. Just under the roof. I would rather say this without an audience.','guarded','mira'),
 L('s81_aha','aren','Then the knocks prove nothing about whether he was alive.','realization','deduction'),
 L('s81_mira_note','aren','The search came first. Ada places her downstairs when it matters.','thinking','deduction'),
 L('s81_brann_note','aren','A confrontation was planned. The killing is another question.','serious','deduction'),
 L('s81_gather','aren','Downstairs. We need to put the whole evening together.','serious','accusation')
];
export const openingShots=[
 {image:'01',seconds:7,line:'s81_o01',caption:'An unsigned message.'},
 {image:'02',seconds:6,line:'s81_o02',caption:'Aren Vale · Travelling through'},
 {image:'03',seconds:5,line:'s81_o03',caption:'Western Ghats · Monsoon, 1999'},
 {image:'04',seconds:6,line:'s81_o04',caption:'Cedar House'},
 {image:'05',seconds:5,caption:'6:32 PM'},
 {image:'06',seconds:5,caption:''}
];
// Cue events are explicit even when final audio is absent. Nothing synthesizes audio here.
export const directingCues={
 opening_message:'paper unfold; rain outside; intimate narration',opening_travel:'soft transit bed; distant storm; music arrival',opening_door:'latch; hinge; warm room ambience crossfade',
 evening_phone:'analogue telephone; fire; social music thinning',evening_stairs:'quiet footsteps; rain; no ominous Elias sting',
 body_reveal:'music out before cut; room stillness',body_check:'cloth; one restrained step; silence',crime_scene_empty:'departing steps then quiet rain',
 veranda_private:'rain beyond roof; roof drips; low sheltered voice',case1_connection:'watch tick; distant remembered knock; fragile tonal connection',case1_break:'connection breaks; held breath; restrained deduction sting',
 case2_timing:'paper cards reorder; soft ink mark',case3_intent:'cassette click; paper settles',accusation_gather:'stairs into lounge; chair settles; music tension',
 confession_second_silence:'3.8 seconds; no music or filler',ending_fourth_silence:'fourth knock; 4 seconds near-silence; black',
 residual_mechanism:'faint unidentifiable mechanism; no tool implied',residual_papers:'paper moves; drawer softly opens',residual_phone:'distant Victor asking for telephone; no killer'
};
