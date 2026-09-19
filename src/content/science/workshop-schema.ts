import { z } from 'zod';

export const ScienceWorkshopConfigSchema = z.object({
  activity: z.enum(['receiver-changes', 'crest-to-crest', 'pixel-post', 'message-design-trials', 'lamp-test-notebook', 'plant-system', 'survival-evidence', 'sense-response']),
}).strict();
export type ScienceWorkshopConfig = z.infer<typeof ScienceWorkshopConfigSchema>;
export const ScienceWorkshopRefSchema = z.object({ type: z.literal('science-workshop'), config: ScienceWorkshopConfigSchema }).strict();
