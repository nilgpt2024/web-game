// Canonical short-game content. Step 9 resolves the physical night-latch staging.
export const LOCK_METHOD = 'SPRING_NIGHT_LATCH_HOLDBACK';
export const storyGraph = {
 ARRIVAL:['VICTOR_ARRIVES'], VICTOR_ARRIVES:['PRESSURE_SCENE'], PRESSURE_SCENE:['TIME_COMPRESSION'],
 TIME_COMPRESSION:['FOUR_KNOCKS'], FOUR_KNOCKS:['DISCOVERY'], DISCOVERY:['WATCH'], WATCH:['INVESTIGATION_OPEN'],
 INVESTIGATION_OPEN:['MIRA_THREAD','BRANN_THREAD','WEAPON_THREAD','RESIDUALS','FINAL_THEORY'],
 MIRA_THREAD:['INVESTIGATION_OPEN','RESIDUALS'], BRANN_THREAD:['INVESTIGATION_OPEN','RESIDUALS'],
 WEAPON_THREAD:['INVESTIGATION_OPEN','RESIDUALS'], RESIDUALS:['INVESTIGATION_OPEN'],
 FINAL_THEORY:['CONFESSION'], CONFESSION:['DAWN_ENDING'], DAWN_ENDING:[]
};
const L=(id,speaker,text,expression='neutral',direction='Natural, concise delivery. Let the other person finish.',scene='investigation')=>({line_id:id,speaker,text,expression,portrait_pose:expression,voice_asset:`voices/${speaker}/${id}`,auto_advance_allowed:true,direction,scene});
export const lines8=[
 L('s8_a01','aren','I had asked for a dry room. The rain appeared to have followed me in to negotiate.','amused','Understated internal aside.','arrival'),
 L('s8_a02','ada','Welcome to Cedar House. Ada Moss. Leave the wet things by the door; this is still a guesthouse, not a pond.','warm','Practical warmth.','arrival'),
 L('s8_a03','aren','Aren Vale. Just passing through.','neutral',undefined,'arrival'),
 L('s8_a04','ada','My family has kept this place for years. Find a seat. Dinner can survive one more guest.','practical',undefined,'arrival'),
 L('s8_a05','mira','Mira Senn. Writer. Local history, buildings, the people who own them.','curious','Brisk, plausible cover.','arrival'),
 L('s8_a06','aren','Light holiday reading.','amused',undefined,'arrival'),
 L('s8_a07','elias','Elias Brann. Structural engineer. The loose stair tread is marked. Use the other side.','helpful','Ordinary helpfulness. No foreshadowing.','arrival'),
 L('s8_a08','mira','He fixed the sign before anyone fell over it.','amused',undefined,'arrival'),
 L('s8_v01','victor','Ada. Victor Soren. I trust my room is ready. The road has been quite unreasonable.','polished','Polished social confidence, not a villain voice.','victor-arrives'),
 L('s8_v02','ada','Your room is ready. The road makes its own arrangements.','practical',undefined,'victor-arrives'),
 L('s8_v03','victor','Good. We should finish our business while I am here.','polished',undefined,'victor-arrives'),
 L('s8_p01','aren','Business? I thought everyone came here for the view.','neutral',undefined,'pressure'),
 L('s8_p02','victor','A view is an asset. So is this property, if sentiment does not get in the way.','dismissive','Casually patronising.','pressure'),
 L('s8_p03','ada','It was an enquiry about a rescue, not demolition. Cedar House is not for sale.','irritated','Firm refusal, financially pressured but capable.','pressure'),
 L('s8_p04','victor','Your creditors may be less sentimental about the distinction.','annoyed','Controlled pressure.','pressure'),
 L('s8_p05','mira','Would the buyer be your company, or one of its intermediaries?','curious',undefined,'pressure'),
 L('s8_p06','victor','An unusually specific interest in local history.','dismissive',undefined,'pressure'),
 L('s8_p07','ada',"Three knocks mean someone's at the door. Four means the house remembers.",'practical','Matter of fact; family saying, not mystical exposition.','pressure'),
 L('s8_p08','aren','I will try to be forgettable.','amused','One quiet aside, then leave the joke behind.','pressure'),
 L('s8_m01','aren','Were you upstairs before we found him?','serious'),
 L('s8_m02','mira','No. I was downstairs. I barely knew the man.','guarded','A plausible lie, not a theatrical tell.'),
 L('s8_m03','aren','A rust thread on his desk. A fresh snag in your scarf.','serious'),
 L('s8_m04','mira','I searched his room. Eight twenty-nine to eight thirty-four, while he was downstairs on the telephone. The door was open.','defensive','Admission under pressure, then regain composure.'),
 L('s8_m05','mira','I’m investigating his redevelopment network. Cedar House is next. I took a Kaveri Heights photocopy. I didn’t know Elias.','serious'),
 L('s8_m06','aren','A theft and a lie. Not yet a murder.','serious'),
 L('s8_m07','mira','Ada saw me return. I stayed by the telephone with her until Elias came down.','concerned'),
 L('s8_m08','mira','You have my page and my account. I should have given you both the first time.','serious'),
 L('s8_d01','aren','You saw Mira return at eight thirty-four?','serious'),
 L('s8_d02','ada','Eight thirty-four. I checked the clock. She stayed beside me. Victor went upstairs at eight thirty-seven. Elias followed at eight fifty-one.','practical'),
 L('s8_d03','ada','Elias returned at nine thirteen. Mira hadn’t left me. Then the knocks.','solemn','Clear witness facts, not an accusation.'),
 L('s8_d04','aren','You had agreed terms?','serious'),
 L('s8_d05','ada','I had agreed draft terms. The bills were winning. Then I saw what they would pull down.','worried'),
 L('s8_d06','ada','I refused his demolition proposal. Then I stayed downstairs, calling about the road. Mira was with me.','solemn'),
 L('s8_d07','ada','I called it an enquiry out of shame. That is all I concealed.','solemn'),
 L('s8_e01','aren','This letter to Victor. Dev Brann signed it.','serious'),
 L('s8_e02','elias','My father. He signed the revised certificates at Kaveri Heights. He should not have.','careful','Controlled, personal; not sinister.'),
 L('s8_e03','elias','His records show cheaper materials and buried warnings. Six people died. His signature became the whole public story.','careful','Serious. No comic beat.'),
 L('s8_e04','elias','His career and reputation were gone. Years later, his appeal unresolved, he died by suicide.','shaken','Plain, restrained. No melodrama or musical flourish.'),
 L('s8_e05','aren','The records do not excuse his signature. They show who else was responsible.','serious'),
 L('s8_e06','elias','That is what I wanted Victor to acknowledge.','careful'),
 L('s8_r01','aren','Your recorder. Its empty cassette sleeve is in your case.','serious'),
 L('s8_r02','elias','To record his admission. I went up at eight fifty-one. Victor let me in at eight fifty-three. I came downstairs at nine thirteen.','careful'),
 L('s8_r03','aren','This fragment fits the torn sheet in your case. Its edge has the same dark wiping streak as the bookend.','serious','Ordinary visible comparison, not laboratory certainty.'),
 L('s8_r04','elias','He grabbed the papers. The letter tore. I took the tape when I left. He was still standing.','pressured','He adjusts his spectacles once; hold composure.'),
 L('s8_r05','aren','The cleaned metal, the torn page, the missing tape. I need to put those together.','thinking'),
 L('s8_r06','elias','I went there for an admission. You have my account.','careful'),
 L('s8_c01','aren','Elias. Your torn letter. Your recorder, without its tape. The wiping streak leads back to your case.','serious',undefined,'accusation'),
 L('s8_c02','aren','You confronted Victor over Dev Brann and Kaveri Heights. Then used the brass bookend. Twice.','serious',undefined,'accusation'),
 L('s8_c03','aren','The damaged watch marks the first disturbance. You place yourself there until just before nine thirteen.','serious',undefined,'accusation'),
 L('s8_c04','aren','You released the night latch, left, and pulled the door shut. A caught latch does not put anyone inside. Nor do the knocks.','serious','Refer to the player-demonstrated spring night latch; calm, exact accusation.','accusation'),
 L('s8_c05','elias',"The first hit wasn't supposed to happen.",'shaken','Locked wording. Quiet, struggling to speak.','confession'),
 L('s8_c06','aren','And the second?','serious','Locked wording. Ask plainly. Leave silence afterwards.','confession'),
 L('s8_c07','elias','He moved. I saw him move. I could have called for help. I chose to hit him again.','resigned','The silence has already held. No excuse, no triumph.','confession'),
 L('s8_c08','elias','He said my father signed. He was right. Then he said the rest did not matter, and that he could finish my career too.','shaken',undefined,'confession'),
 L('s8_c09','elias','I wanted his admission on tape. Instead I cleaned the bookend, gathered the papers, took the cassette, released the hold-back and pulled the door shut behind me.','resigned','A plain admission of the demonstrated latch action, with no new trick.','confession'),
 L('s8_c10','aren','Your father compromised. Victor buried a wider crime. Neither gave you the right to kill him.','serious',undefined,'confession'),
 L('s8_c11','elias',"I didn't knock.",'resigned','Locked wording. No sinister emphasis.','confession'),
 L('s8_c12','aren','I know.','serious','Locked wording. Quiet certainty.','confession'),
 L('s8_z01','ada','Help is on its way. The room is sealed. Leave it until they arrive.','solemn','Near dawn. Exhausted, practical.','dawn'),
 L('s8_z02','aren','By dawn, we had an answer for the death. I went upstairs to collect my things.','serious','Internal, spent, no joke or promise of a sequel.','dawn')
];
export const sequences8={
 arrival:['s8_a01','s8_a02','s8_a03','s8_a04'], introductions:['s8_a05','s8_a06','s8_a07','s8_a08'],
 victor:['s8_v01','s8_v02','s8_v03'], pressure:['s8_p01','s8_p02','s8_p03','s8_p04'], folklore:['s8_p07','s8_p08'],
 denial:['s8_m01','s8_m02'], miraConfront:['s8_m03'], mira:['s8_m04','s8_m05','s8_m06','s8_m07'], witness:['s8_d01','s8_d02','s8_d03'],
 ada:['s8_d04','s8_d05','s8_d06','s8_d07'], brann:['s8_e01','s8_e02','s8_e03','s8_e04','s8_e05','s8_e06'], recorder:['s8_r01','s8_r02','s8_r03','s8_r04'],
 accusation:['s8_c01','s8_c02','s8_c03','s8_c04'], confessionFirst:['s8_c05','s8_c06'], confessionLast:['s8_c07','s8_c08','s8_c09','s8_c10','s8_c11'], confessionKnow:['s8_c12'], dawn:['s8_z01','s8_z02']
};
export const clues8={
 trace:{label:'Scarf thread',title:'A small snag.',place:'DESK EDGE',art:'thread',text:'A rust thread caught on the drawer. Mira’s scarf has a fresh snag of the same colour. It cannot tell us when she was here.',detail:'Rust thread on the drawer; Mira’s scarf has a matching visible snag. Its age is unknown.'},
 document:{label:'Torn Document',title:'The part left behind.',place:'BESIDE THE DESK',art:'document',text:'“V. Soren — Kaveri Heights. The revised material schedule was withheld. I signed under pressure. I cannot let my signature conceal the warnings. — Dev Brann.”\nThe letter is torn across a sentence. Its other half is missing.',detail:'Fragment of Dev Brann’s letter to Victor about Kaveri Heights, substitutions, pressure and hidden warnings. A torn edge remains.'},
 recorder:{label:'Missing Tape',title:'An empty recorder.',place:'UNDER THE DESK',art:'recorder',text:'The recorder is empty. Its label reads “D. BRANN — RECORDS”. A torn cassette sleeve lies beside it. Someone came prepared to record; that alone cannot establish a plan to kill.',detail:'Recorder labelled D. Brann — Records. Empty tape compartment and torn cassette sleeve; no recording is available.'},
 bookend:{label:'Cleaned Bookend',title:'Heavier than it looks.',place:'VICTOR’S DESK',art:'bookend',text:'The brass face has been wiped. A dark trace remains in one corner and on letter paper caught underneath. Its paired bookend is still dusty. This one was moved and imperfectly cleaned.',detail:'Heavy brass bookend, wiped face, dark trace in its corner and on a paper scrap. Its paired bookend remains dusty.'},
 impacts:{label:'Two impacts',title:'Two impacts.',place:'BESIDE VICTOR',art:'impacts',text:'Two distinct impacts. The first brought Victor down and damaged his watch. A shifted floor trace separates it from the second, delivered after he fell. The watch cannot date that second blow.',detail:'Two separate impacts, with a shifted floor trace between them. The watch alone cannot date the second blow.'},
 staging:{label:'Staged Lock',title:'The closed room.',place:'VICTOR’S DOOR',art:'door',text:'The key lock was unlocked. A separate spring night latch held the door. Its hold-back has a clean thumb mark in an old dust outline; the broken strike bears the narrow tongue mark. Reconstruct the action.',detail:'Demonstrated: release the inside hold-back, step outside and pull the door shut; the bevelled spring tongue catches without anyone inside. Key lock was unlocked. Fresh hold-back mark and broken strike support staging.'},
 kaveri:{label:'Kaveri Heights',title:'Six names behind a signature.',place:'MIRA’S PHOTOCOPY',art:'document',text:'Kaveri Heights: cheaper structural materials substituted; safety warnings suppressed; certificates revised. Dev Brann signed them. Six residents died when part of the building failed in severe rain. The company’s internal pressure is absent from the public finding. Mira copied the page to investigate the same network now approaching Cedar House.',detail:'Mira’s stolen photocopy records material substitution, revised certificates signed by Dev Brann and six deaths. It connects Victor’s old company to his current network.'}
};
export const residuals8=[
 {id:'door',location:'corridor',title:'For a moment, the corridor repeats itself.',beats:[{caption:'[A door closes.]',duration:1600,sfx:'sfx_residual_door'},{caption:'[A faint mechanical sound.]',duration:1500,sfx:'sfx_residual_mechanism'},{caption:'[Footsteps move away. No one is there.]',duration:2300,sfx:'sfx_residual_steps'}],note:'A door, a small sound, departing steps. No face, tool or method. Not physical proof.'},
 {id:'voice',location:'victor',title:'A voice where there should be silence.',beats:[{caption:'“Dev signed. Responsibility does not disappear because—”',duration:3900,voice:'residual_victor_voice'},{caption:'[An impact. The fragment ends.]',duration:1800,sfx:'sfx_residual_impact'}],note:'A fragment about Dev and signatures, then an impact. No speaker confronting Victor is identifiable.'},
 {id:'search',location:'victor',title:'The room holds a different moment.',beats:[{caption:'[Paper shifts. A drawer opens.]',duration:1900,sfx:'sfx_residual_search'},{caption:'[Victor, downstairs] “Is the downstairs telephone working?”',duration:3400,voice:'residual_phone_voice'},{caption:'[The drawer closes. The room is still.]',duration:1600,sfx:'sfx_residual_drawer_close'}],note:'An earlier search, while Victor was downstairs. It supports the witnessed timing; it does not identify a killer.'}
];
export const caseNotes8=[
 {id:'mira',title:'Mira lied, but earlier.',requires:['trace','kaveri'],people:['mira_admission','ada_witness'],sentence:['Mira’s ',{key:'trace',answer:'Scarf thread',choices:['Scarf thread','Cleaned Bookend']},' and stolen page expose a search ',{key:'when',answer:'before the confrontation',choices:['during the murder','before the confrontation']},'. Ada’s account places her downstairs throughout the later window.'],conclusion:'Mira trespassed earlier. Her lie concealed reporting, not the murder.'},
 {id:'brann',title:'An admission on tape.',requires:['document','kaveri','recorder'],people:['elias_family','elias_account'],sentence:['The ',{key:'paper',answer:'Torn Document',choices:['Torn Document','Scarf thread']},' connects Elias to Dev Brann and Kaveri Heights. The ',{key:'tape',answer:'Missing Tape',choices:['9:08','Missing Tape']},' points to a ',{key:'intent',answer:'planned confrontation',choices:['planned murder','planned confrontation']},', not proof of a planned killing.'],conclusion:'Elias came prepared to confront Victor and record an admission.'},
 {id:'final',title:'The whole account.',requires:['document','recorder','kaveri','trace','bookend','impacts','staging'],people:['ada_deal','ada_witness','elias_account'],sentence:[{key:'who',answer:'Elias Brann',choices:['Mira Senn','Ada Moss','Elias Brann']},' killed Victor over ',{key:'why',answer:'Dev Brann / Kaveri Heights',choices:['Cedar House debts','Dev Brann / Kaveri Heights']},', using the ',{key:'weapon',answer:'brass bookend',choices:['brass bookend','cassette recorder']},'. The first blow left a choice; the second was ',{key:'second',answer:'deliberate',choices:['deliberate','an accident']},'. The room was staged ',{key:'exit',answer:'by pulling the live night latch shut',choices:['by pulling the live night latch shut','with someone still inside']},'. Victor was dead ',{key:'time',answer:'before the Four Knocks',choices:['before the Four Knocks','because of the Four Knocks']},'.'],conclusion:'Human murder. A spring latch pulled shut after departure. The knocks have no established source.'}
];
export const cueSlots8=['cedar_house_main','social_tension','four_knocks_silence','post_knocks','investigation','deduction','kaveri_serious','residual','accusation','dawn_ending'];
