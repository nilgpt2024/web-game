const L=(id,speaker,text,expression,scene,direction)=>({line_id:id,speaker,text,expression,scene,direction,voice_asset:`voices/${speaker}/${id}`,auto_advance_allowed:true});
export const lines9=[
 L('s9_road','ada','The lower road is blocked. I will keep trying the telephone.','practical','evening','Practical household update. No dread or suspicious emphasis on anyone leaving.'),
 L('s9_latch','aren','The spring catches when the door closes. Release the hold-back, step outside, pull it shut. No one needs to stay inside.','thinking','locked-room','Explain the demonstrated action simply, with a small pause before the final sentence.'),
 L('residual_victor_voice','victor','Dev signed. Responsibility does not disappear because—','annoyed','residual-voice','A fragment of an argument, cut off mid-thought. Restrained impatience; no ghost voice.'),
 L('residual_phone_voice','victor','Is the downstairs telephone working?','polished','residual-search','Ordinary practical question, heard from downstairs. No menace.')
];
export const lockMethod={id:'SPRING_NIGHT_LATCH_HOLDBACK',name:'A self-catching night latch',steps:[
 {label:'Release the hold-back',text:'Inside face: the small hold-back snib keeps the spring tongue retracted. Its dusty outline has a clean thumb mark. Release it and the bevelled tongue projects.',sfx:'sfx_latch_release'},
 {label:'Pull the door closed from outside',text:'Corridor side: the bevel rides over the strike plate, retracts, then springs into its socket. The separate key lock is still unlocked. No string, key or person inside is needed.',sfx:'sfx_latch_close'},
 {label:'Try the outside handle',text:'The outside handle cannot withdraw this separate night latch. The broken strike has the same narrow tongue mark. Whoever left the room could pull it shut behind them.',sfx:'sfx_door_handle_locked'}
]};
