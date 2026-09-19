import { z } from 'zod';

export const ReadingWorkshopConfigSchema = z.object({
  activity: z.enum(['direct-the-reading', 'word-desk', 'connect-weather-report', 'authors-lens', 'support-chain', 'two-views-one-event', 'one-moment-three-forms', 'literal-and-vivid', 'question-compass', 'research-folder', 'research-clusters', 'source-credit']),
}).strict();
export type ReadingWorkshopConfig = z.infer<typeof ReadingWorkshopConfigSchema>;
export const ReadingWorkshopRefSchema = z.object({ type: z.literal('reading-workshop'), config: ReadingWorkshopConfigSchema }).strict();
