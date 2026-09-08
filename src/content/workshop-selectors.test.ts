import { MathWorkshopConfigSchema } from './math/workshop-schema';
import { ReadingWorkshopConfigSchema } from './reading/workshop-schema';
import { ScienceWorkshopConfigSchema } from './science/workshop-schema';

test.each([
  [MathWorkshopConfigSchema, 'fraction-picnic', 'scale-reading'],
  [ReadingWorkshopConfigSchema, 'source-credit', 'phrase-pathfinder'],
  [ScienceWorkshopConfigSchema, 'pixel-post', 'device-retest'],
] as const)('only an authored new activity selector is accepted', (schema, activity, prototype) => {
  expect(schema.safeParse({ activity }).success).toBe(true);
  expect(schema.safeParse({ activity: 'invented' }).success).toBe(false);
  expect(schema.safeParse({ activity: prototype }).success).toBe(false);
  expect(schema.safeParse({ activity, correct: true }).success).toBe(false);
});
