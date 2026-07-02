export interface Principle {
  id: number;
  icon: string;
  name: string;
  color: string;
  emissive: string;
}

export const PRINCIPLES: Principle[] = [
  { id:0, icon:'🎁', name:'互惠', color:'#e17055', emissive:'#e17055' },
  { id:1, icon:'⏳', name:'稀缺', color:'#fdcb6e', emissive:'#fdcb6e' },
  { id:2, icon:'👑', name:'权威', color:'#6C5CE7', emissive:'#6C5CE7' },
  { id:3, icon:'🔗', name:'承诺一致', color:'#00b894', emissive:'#00b894' },
  { id:4, icon:'❤️', name:'好感', color:'#fd79a8', emissive:'#fd79a8' },
  { id:5, icon:'👥', name:'社会认同', color:'#0984e3', emissive:'#0984e3' },
  { id:6, icon:'🤝', name:'联盟', color:'#00cec9', emissive:'#00cec9' },
];

export const PHASE_NAMES = ['study', 'work', 'entrepreneur'] as const;
export type Phase = typeof PHASE_NAMES[number];
