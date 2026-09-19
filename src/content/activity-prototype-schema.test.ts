import { ScaleReadingConfigSchema, PhrasePathfinderConfigSchema, DeviceRetestConfigSchema } from './activity-prototype-schema';

const scale = { items: [{ id: 'kit', label: 'Camping kit', illustration: 'kit', unit: 'kg', valueTenths: 35, minWhole: 2, maxWhole: 5 }] };
const phrase = { title: 'A path', source: 'Take the winding path beside the oak.', originalWord: 'winding', changedWord: 'windy', meaningPrompt: 'Where?', meaningChoices: [{ id: 'oak', text: 'Beside the oak.' }, { id: 'house', text: 'Beside a house.' }], correctMeaningId: 'oak', meaningEvidence: 'Take the winding path beside the oak.' };
const retest = { title: 'Lamp', goalSeconds: 10, before: [5, 7, 6], after: [10, 10, 10], setupNote: 'One clip was loosely fitted.', heldConstant: ['Battery type', 'Lamp', 'Switch', 'Viewing condition', 'Ten-second interval'] };

test('scale values must fit a readable whole-mark range and have distinct object ids', () => {
  expect(ScaleReadingConfigSchema.safeParse(scale).success).toBe(true);
  expect(ScaleReadingConfigSchema.safeParse({ items: [{ ...scale.items[0], valueTenths: 999 }] }).success).toBe(false);
  expect(ScaleReadingConfigSchema.safeParse({ items: [{ ...scale.items[0], valueTenths: 30 }] }).success).toBe(false);
  expect(ScaleReadingConfigSchema.safeParse({ items: [{ ...scale.items[0], minWhole: 5, maxWhole: 2 }] }).success).toBe(false);
  expect(ScaleReadingConfigSchema.safeParse({ items: [scale.items[0], scale.items[0]] }).success).toBe(false);
});

test('reading repair and evidence must refer to the complete source with a reachable answer', () => {
  expect(PhrasePathfinderConfigSchema.safeParse(phrase).success).toBe(true);
  for (const change of [{ meaningEvidence: 'beside the oak' }, { meaningEvidence: 'Absent quote' }, { originalWord: 'missing' }, { originalWord: 'wind' }, { correctMeaningId: 'missing' }, { changedWord: 'winding' }, { source: 'A winding and another winding path.' }]) {
    expect(PhrasePathfinderConfigSchema.safeParse({ ...phrase, ...change }).success).toBe(false);
  }
});

test('supplied lamp records must cover the same trials and fit the fixed observation interval', () => {
  expect(DeviceRetestConfigSchema.safeParse(retest).success).toBe(true);
  for (const change of [{ after: [9, 10, 10] }, { before: [10, 10, 10] }, { after: [11, 10, 10] }, { after: [10] }, { before: [] }, { before: [5.5, 7, 6] }]) {
    expect(DeviceRetestConfigSchema.safeParse({ ...retest, ...change }).success).toBe(false);
  }
});
