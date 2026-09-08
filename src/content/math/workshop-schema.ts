import { z } from 'zod';

export const MathWorkshopConfigSchema = z.object({
  activity: z.enum(['estimate-checkpoint', 'acorn-rule-machine', 'pack-use-rebuild', 'fraction-picnic', 'bundle-the-fourths', 'decimal-exchange-mat', 'fence-the-garden', 'triangle-inspection-desk', 'graph-detective']),
}).strict();
export type MathWorkshopConfig = z.infer<typeof MathWorkshopConfigSchema>;
export const MathWorkshopRefSchema = z.object({ type: z.literal('math-workshop'), config: MathWorkshopConfigSchema }).strict();
