import { rehearsal, desk } from './rehearsal-desk';
import { weather, lens, support, views } from './source-chains';
import { forms, literal } from './forms-language';
import { inquiry, folder, clusters, citation } from './research';
import type { Activity, Experience } from './types';
export const experiences:Record<Activity,Experience>={
 'direct-the-reading':rehearsal,'word-desk':desk,'connect-weather-report':weather,'authors-lens':lens,'support-chain':support,'two-views-one-event':views,'one-moment-three-forms':forms,'literal-and-vivid':literal,'question-compass':inquiry,'research-folder':folder,'research-clusters':clusters,'source-credit':citation
};
