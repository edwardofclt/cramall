import { z } from 'zod';

const text = z.string().trim().min(1);
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const ScaleReadingConfigSchema = z.object({
  items: z.array(z.object({
    id, label: text,
    illustration: z.enum(['apple', 'backpack', 'eraser', 'kit']),
    unit: z.enum(['oz', 'lb', 'g', 'kg']),
    valueTenths: z.number().int().positive().max(10000),
    minWhole: z.number().int().min(0),
    maxWhole: z.number().int().positive(),
  }).strict()).min(1).max(4),
}).strict().superRefine(({ items }, context) => {
  if (new Set(items.map(item => item.id)).size !== items.length) context.addIssue({ code: 'custom', message: 'Object ids must be unique' });
  items.forEach((item, index) => {
    if (item.maxWhole <= item.minWhole || item.maxWhole - item.minWhole > 5 || item.valueTenths <= item.minWhole * 10 || item.valueTenths >= item.maxWhole * 10 || item.valueTenths % 10 === 0) {
      context.addIssue({ code: 'custom', path: ['items', index], message: 'Reading must fall between whole marks inside a scale spanning one to five whole units' });
    }
  });
});

export const PhrasePathfinderConfigSchema = z.object({
  title: text, source: text,
  originalWord: z.string().regex(/^[A-Za-z]+$/), changedWord: z.string().regex(/^[A-Za-z]+$/),
  meaningPrompt: text,
  meaningChoices: z.array(z.object({ id, text }).strict()).min(2).max(4),
  correctMeaningId: id, meaningEvidence: text,
}).strict().superRefine((value, context) => {
  const matches = value.source.match(new RegExp(`\\b${value.originalWord}\\b`, 'g')) ?? [];
  if (matches.length !== 1 || value.originalWord.toLowerCase() === value.changedWord.toLowerCase()) context.addIssue({ code: 'custom', message: 'Repair needs one complete original word and a distinct changed word' });
  const evidenceSentences = value.source.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(sentence => sentence.trim()) ?? [value.source];
  if (!evidenceSentences.includes(value.meaningEvidence)) context.addIssue({ code: 'custom', path: ['meaningEvidence'], message: 'Evidence must be a complete selectable source sentence' });
  if (new Set(value.meaningChoices.map(choice => choice.id)).size !== value.meaningChoices.length || new Set(value.meaningChoices.map(choice => choice.text)).size !== value.meaningChoices.length || !value.meaningChoices.some(choice => choice.id === value.correctMeaningId)) {
    context.addIssue({ code: 'custom', message: 'Meaning choices must be unique and include the answer' });
  }
});

export const DeviceRetestConfigSchema = z.object({
  title: text, goalSeconds: z.number().int().min(1).max(30),
  before: z.array(z.number().int().min(0)).length(3),
  after: z.array(z.number().int().min(0)).length(3),
  setupNote: text,
  heldConstant: z.array(text).min(1),
}).strict().superRefine((value, context) => {
  if ([...value.before, ...value.after].some(duration => duration > value.goalSeconds)) context.addIssue({ code: 'custom', message: 'Recorded durations must fit the observation interval' });
  if (value.before.some(duration => duration >= value.goalSeconds) || value.after.some(duration => duration !== value.goalSeconds)) context.addIssue({ code: 'custom', message: 'This comparison requires three original trials below the goal and three supplied retest trials meeting it' });
});

export const ScaleReadingWidgetRefSchema = z.object({ type: z.literal('scale-reading'), config: ScaleReadingConfigSchema }).strict();
export const PhrasePathfinderWidgetRefSchema = z.object({ type: z.literal('phrase-pathfinder'), config: PhrasePathfinderConfigSchema }).strict();
export const DeviceRetestWidgetRefSchema = z.object({ type: z.literal('device-retest'), config: DeviceRetestConfigSchema }).strict();
