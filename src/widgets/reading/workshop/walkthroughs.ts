import type { ReadingWorkshopConfig } from '../../../content/reading/workshop-schema';
export type Walkthrough = { activity: ReadingWorkshopConfig['activity']; phases: Record<string, string | string[]>[] };
/** Reviewer-only paths: these are never imported by the learner activity. */
export const walkthroughs: Walkthrough[] = [
 {activity:'direct-the-reading',phases:[{line:'question',clue:'question',emphasis:'found',pause:'end',tone:'uncertainty'},{line:'relief',clue:'relief',emphasis:'last',pause:'end',tone:'relief'},{comparison:'clues',reflection:'reread'}]},
 {activity:'word-desk',phases:[{reference:'dictionary',field:'meaning',definition:'land',context:'creek',wordclass:'noun',pronunciation:'bangk'},{reference:'glossary',field:'meaning',definition:'salty',context:'coast'},{connection:'both'}]},
 {activity:'connect-weather-report',phases:[{investigation:'amount',detail:'noon',contribution:'quantity'},{detail:'map',contribution:'location'},{detail:'sound',contribution:'experience'},{together:'combine',limit:'no-ratio'}]},
 {activity:'authors-lens',phases:[{phrases:['belief','request'],perspective:'supports',purpose:'persuade'},{phrases:['planning','sites'],perspective:'neutral',purpose:'explain'},{comparison:'different'}]},
 {activity:'support-chain',phases:[{claim:'keep',reason:'place',evidence:'84'},{reason:'organization',evidence:'counts',limit:'different'},{decoration:'aside',condition:'care'},{reasoning:'qualified'}]},
 {activity:'two-views-one-event',phases:[{event:'rain',evidence:'ari',view:'disappointed',reaction:'stopped'},{evidence:'bea',view:'relieved',reaction:'clarified',turn:'relieved'},{effect:'cooperate'}]},
 {activity:'one-moment-three-forms',phases:[{narrative:'return',drama:'return',poem:'return'},{paragraph:'narrative',speaker:'drama',direction:'drama',line:'poem',stanza:'poem'},{pair:'narrative-drama',contrast:'performable'}]},
 {activity:'literal-and-vivid',phases:[{literal:'nervous',context:'hands',effect:'anxiety'},{literal:'sound',context:'quiet',effect:'sudden'},{comparison:'adds'}]},
 {activity:'question-compass',phases:[{topic:'corner',need:'setup'},{heading1:'location',finding1:'path',heading2:'books',finding2:'choices'},{missing:'cost',reason:'absent'}]},
 {activity:'research-folder',phases:[{A:'action',B:'outside',C:'action',D:'investigation',E:'outside',F:'action'},{include:'A',includeReason:'reuse',exclude:'B',excludeReason:'appearance'},{B:'helps',reason:'question'}]},
 {activity:'research-clusters',phases:[{label1:'finding',label2:'caring',label3:'sharing',A:'one',B:'two',C:'three',D:'one',E:'two',F:'three'},{one:'finding',two:'caring',three:'sharing'},{reason:'ideas'}]},
 {activity:'source-credit',phases:[{quotation:'“Labels need checking when books move.”',attribution:'moss'},{author:'moss',title:'shelf',publisher:'practice',year:'2026'},{draft:'A',credit:'yes',reason:'both'}]},
];
