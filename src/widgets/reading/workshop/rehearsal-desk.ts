import { exact, phase, pin, select, type Draft, type Experience } from './types';
const lines={question:'“You found my kite?”',excited:'“I found it!”',relief:'“At last,”'};
const clues={question:'Leo asked, staring at the muddy bundle.',excited:'Ana lifted its bright tail.',relief:'Leo ran his fingers along the unbroken frame.'};
const planFields=()=>[
 select('line','Line to direct',lines),pin('clue','Text clue',clues),
 select('emphasis','Emphasis word',{found:'found',kite:'kite',it:'it',last:'last'}),
 select('pause','Pause mark',{end:'A pause at the end of this spoken line',inside:'A brief thinking pause before the emphasized word'}),
 select('tone','Voice direction',{uncertainty:'Uncertainty',surprise:'Surprise',excitement:'Excitement',relief:'Relief',gentle:'Gentle disbelief',loud:'Louder to prove relief'})
];
export function validReadingPlan(d:Draft) {
 const valid:Record<string,{tones:string[];words:string[]}>={question:{tones:['uncertainty','surprise'],words:['found','kite']},excited:{tones:['excitement'],words:['found','it']},relief:{tones:['relief','gentle'],words:['last']}};
 const plan=valid[String(d.line)];return !!plan&&d.clue===d.line&&plan.tones.includes(String(d.tone))&&plan.words.includes(String(d.emphasis))&&['end','inside'].includes(String(d.pause));
}
export const rehearsal:Experience={surface:'rehearsal',phases:[
 phase('First voice plan','Choose a spoken line. Pin its context, then mark emphasis, a pause, and a possible voice.',planFields(),validReadingPlan,'Your first voice plan connects a line to its context.','Revisit the speaker’s words and context. Leo whispers: feeling does not require a louder voice.'),
 phase('Second voice plan','Direct a different line so you can compare what the markings suggest.',planFields(),(d,all)=>validReadingPlan(d)&&d.line!==all[0]?.line,'Two different lines now have evidence-linked voice plans.','Revisit the scene. Use a different line and a voice supported by its own context.'),
 phase('Read and reflect','Try both marked lines independently. No microphone or audio is required; the app does not assess your performance.',[
 select('comparison','Text clue → Voice choice → Meaning',{clues:'The muddy bundle can suggest uncertainty; the bright tail excitement; the unbroken frame relief. My choices follow those clues.',punctuation:'Every question must always rise, whatever the scene says.',volume:'A louder voice always proves stronger feelings.'}),
 select('reflection','My independent reading reflection',{reread:'I tried my two plans and used the context to think about their meaning.',revise:'I tried both plans and want to adjust my voice while keeping the same text clues.'})
 ],d=>d.comparison==='clues'&&['reread','revise'].includes(String(d.reflection)),'You connected two reading choices to clues and reflected on your own reading.')
]};
export const desk:Experience={surface:'desk',phases:[
 phase('Bank notebook row','Inspect the reference packet. Try a meaning in the field note and pin the words that support it.',[
 select('reference','Reference for bank',{glossary:'Topic glossary',dictionary:'Dictionary'}),select('field','Entry field to explain bank',{pronunciation:'Pronunciation',meaning:'Meaning',class:'Word class'}),
 select('definition','Meaning to substitute for bank',{money:'a business that keeps and lends money',land:'land along a river or stream'}),pin('context','Bank context',{coast:'Near the coast',creek:'beside the creek'}),
 select('wordclass','Bank word class',{verb:'verb',noun:'noun',adjective:'adjective'}),select('pronunciation','Bank pronunciation',{banking:'/bank-ing/',bangk:'/bangk/'})
 ],exact({reference:'dictionary',field:'meaning',definition:'land',context:'creek',wordclass:'noun',pronunciation:'bangk'}),'Bank means land along a stream here. You also located its noun label and pronunciation.','Revisit the dictionary’s meaning field. Does a business that keeps money fit beside this creek?'),
 phase('Brackish notebook row','Use the topic entry. Keep the coastal context linked to your substitution.',[
 select('reference','Reference for brackish',{dictionary:'Dictionary',glossary:'Topic glossary'}),select('field','Entry field to explain brackish',{class:'Word class',meaning:'Meaning',pronunciation:'Pronunciation'}),select('definition','Meaning to substitute for brackish',{muddy:'full of mud',salty:'slightly salty',fresh:'without salt'}),pin('context','Brackish context',{rested:'We rested on the bank',coast:'Near the coast, the creek water became brackish.'})
 ],exact({reference:'glossary',field:'meaning',definition:'salty',context:'coast'}),'The topic glossary and coastal context support slightly salty.'),
 phase('Explain the notebook','Compare both retained substitutions with their source entries.',[select('connection','Entry evidence → Context evidence',{first:'The first definition is always the right one.',both:'The entry gives a possible meaning; the sentence helps me decide whether it fits.',sound:'Knowing pronunciation alone tells me which meaning fits.'})],exact({connection:'both'}),'You used both an entry and its sentence to choose precise meanings.')
]};
