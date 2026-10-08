// Player-facing content only. Creator-only murder/staging truth stays in the brief.
export const cast={
 aren:{name:'Aren Vale',role:'Traveller',voice:'Indian English male, late 20s / early 30s. Understated, intelligent, slightly weary. Calm observation and restrained deadpan; no detective caricature.',speed:0.96,pitch:'neutral, slightly low'},
 mira:{name:'Mira Senn',role:'Writer',voice:'Indian English female, early 30s. Quick, sharp, articulate, dry and alert. Confident and perceptive; not breathless or flirtatious.',speed:1.05,pitch:'neutral'},
 ada:{name:'Ada Moss',role:'Cedar House owner',voice:'Indian English female, late 40s. Grounded, practical, composed and capable. Warm beneath firmness; never elderly, frail or mystical.',speed:0.96,pitch:'neutral, slightly low'},
 elias:{name:'Elias Brann',role:'Structural engineer',voice:'Indian English male, mid-30s. Educated, measured, precise and reassuring. Trustworthy concern; no sinister whisper, ominous pause or villain affect.',speed:0.98,pitch:'neutral'},
 victor:{name:'Victor Soren',role:'Property developer',voice:'Indian English male, early 50s. Polished, self-assured, socially dominant, faintly patronising. Expensive confidence without caricature. Ordinary adult authority, including the two fragmentary Residual lines.',speed:0.95,pitch:'neutral, low'}
};
const line=(id,speaker,text,expression,direction)=>({line_id:id,speaker,text,voice_asset:`voices/${speaker}/${id}`,expression,portrait_pose:expression,auto_advance_allowed:true,direction});
export const lines=[
 line('s7_01','aren','Rain had been arguing with the windows all evening. The windows were holding their position. Barely.','amused','Quiet internal narration; lightly dry, not theatrical.'),
 line('s7_02','mira','That came from upstairs. Did everyone hear it?','alert','Immediate, attentive. Look toward the staircase.'),
 line('s7_03','elias',"Yes. All four. Victor's room?",'concerned','Genuine uncertainty. Keep the question ordinary and unweighted.'),
 line('s7_04','ada',"Stay here. I'll check on him.",'uneasy','Practical decision, with unease contained.'),
 line('s7_05','aren','That sounded less like a request.','amused','A quiet aside before following, no broad punchline.'),
 line('s7_06','ada',"Victor? It's Ada. Is everything all right?",'uneasy','Call through an ordinary closed door, not a horror whisper.'),
 line('s7_07','ada',"No answer. The key lock turns freely. It is the separate night latch. We usually keep its hold-back on.",'guarded','Practical concern. Identify the separate night latch without solving the staged-room assumption.'),
 line('s7_08','mira',"He's not answering any of us. We shouldn't just leave him in there.",'concerned','Concern replaces impatience.'),
 line('s7_09','elias',"The door's secured. Keep clear of the frame. I'll help.",'helpful','Practical, reassuring, no special expertise about the lock.'),
 line('s7_10','ada',"Victor, we're coming in.",'practical','Firm warning, then a pause.'),
 line('s7_11','aren',"Victor... He isn't breathing.",'surprised','Low, plain, stunned. No noir flourish.'),
 line('s7_12','elias','We need a doctor.','shock','Contained shock and urgent concern. No suspicious pause.'),
 line('s7_13','mira',"Then nobody touches anything else. Let's give him some space.",'concerned','Steady but shaken.'),
 line('s7_14','mira',"If those knocks were Victor, he was alive at nine-fourteen. That was only a few minutes ago.",'skeptical','An assumption forming, not an established fact.'),
 line('s7_15','aren',"Nine-fourteen. We should write down what we actually remember.",'serious','Grounded, careful. He is a traveller trying to make sense of events.'),
 line('s7_16','ada',"The road is blocked. I'll keep trying the telephone, but help won't reach us straightaway in this storm.",'guarded','Practical facts, restrained distress. No new emergency details.'),
 line('s7_17','elias',"I'll keep the doorway clear. We should leave the room as it is.",'helpful','Ordinary controlled helpfulness.'),
 line('s7_18','aren',"The glass is cracked. A mechanical watch. It stopped at nine-oh-eight.",'thinking','Careful observation; make the time clear.'),
 line('s7_19','mira','The knocks were at nine-fourteen. Six minutes later.','alert','A quick precise connection, no excitement about the death.'),
 line('s7_20','aren',"Two times. They don't support the same story. Let me put this down.",'surprised','Small realization, held; no triumphant delivery.'),
 line('s7_21','aren','Tell me about the rhythm. What did you hear?','neutral','Open question, no accusation.'),
 line('s7_22','mira',"Three knocks, close together. Then a pause. The last one made me look up again. I couldn't tell you who made them.",'alert','Precise eyewitness recall, no certainty beyond hearing.'),
 line('s7_23','aren','Did you know Victor before tonight?','serious','Neutral, concise.'),
 line('s7_24','mira',"I knew of his work. That isn't quite the same as knowing him. Why?",'guarded','A little defensive, not overtly guilty.'),
 line('s7_25','aren','When you reached the door, what did you find?','neutral','Ask about observation, not lock mechanics.'),
 line('s7_26','ada',"It was shut. I called his name, tried the handle, then waited for an answer. There wasn't one.",'guarded','Clear sequence; no bolt, key or staging explanation.'),
 line('s7_27','aren','You recognised the four knocks?','thinking','Curious without treating folklore as proof.'),
 line('s7_28','ada',"A family saying. Three knocks mean someone's at the door. Four means the house remembers. It's a saying, Aren.",'practical','Matter of fact, not spooky exposition or a supernatural confirmation.'),
 line('s7_29','aren','You heard all four as well?','neutral','Same open questioning tone as with the others.'),
 line('s7_30','elias',"With you, downstairs. I looked up after the first. Ada was already listening. I heard the same thing you did.",'concerned','Sincere, measured recall. No sinister emphasis on downstairs.'),
 line('s7_31','aren',"His case stays at his side. He seems to be listening carefully.",'thinking','Neutral visual observation, without implying guilt.'),
 line('s7_32','aren',"The watch stopped at nine-oh-eight. The knocks cannot tell us whether Victor was alive at nine-fourteen.",'serious','A careful conclusion about evidence, not an exact medical time of death.'),
 line('s7_33','mira',"Then we start with what happened before the knocks.",'concerned','Quiet agreement; the investigation is beginning.'),
 line('s7_34','ada',"Take a moment. There's room by the fire, if the rain hasn't claimed you first.",'warm','Warm, practical welcome before the knocks only.')
];
export const lineById=Object.fromEntries(lines.map(l=>[l.line_id,l]));
export const sequences={knockResponse:['s7_02','s7_03','s7_04','s7_05'],adaCheck:['s7_06','s7_07'],corridor:['s7_08','s7_09'],door:['s7_10'],discovery:['s7_11','s7_12'],assumption:['s7_14'],help:['s7_16'],watch:['s7_18','s7_19','s7_20'],observe:['s7_31'],conclusion:['s7_32','s7_33']};
export const topics={
 mira:[{id:'mira_knocks',label:'The knocks',lines:['s7_21','s7_22'],remember:'Mira heard three close knocks, then a pause before the fourth. She could not identify the person making them.'},{id:'mira_victor',label:'Victor',lines:['s7_23','s7_24'],remember:'Mira says she knew of Victor’s work.'}],
 ada:[{id:'ada_room',label:'The room',lines:['s7_25','s7_26'],remember:'Ada called through the shut door and tried its handle. There was no answer.'},{id:'ada_knocks',label:'The four knocks',lines:['s7_27','s7_28'],remember:'Ada knows a family saying about four knocks. She called it a saying.'}],
 elias:[{id:'elias_heard',label:'What did you hear?',lines:['s7_29','s7_30'],remember:'Elias heard the knocks downstairs with the others.'}]
};
export const observeDetails=[
 {id:'spectacles',label:'Rectangular spectacles',text:'Plain rectangular frames. His eyes keep returning to whoever is speaking.'},
 {id:'case',label:'Document case',text:'A structured case held at his side. Nothing inside it is visible.'},
 {id:'posture',label:'Steady posture',text:'He stands clear of the doorway, making space for the others.'}
];
export const conclusion="Victor's watch stopped at [9:08], so the [Four Knocks] cannot prove he was alive at 9:14.";
