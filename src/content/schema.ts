import { z } from 'zod';

export const WIDGET_TYPES = ['place-value-builder', 'number-line-compare'] as const;

export const SubjectIdSchema = z.enum(['math', 'reading', 'science']);
export const GuideIdSchema = z.enum(['nutty', 'winnie', 'sandy']);
export const PoseSchema = z.enum(['idle', 'talk', 'think', 'cheer', 'oops']);

export const UnitIdSchema = z.string().regex(
  /^(math|reading|science)-u\d{2}$/,
  'invalid canonical unit id',
);
export const LessonIdSchema = z.string().regex(
  /^(math|reading|science)-u\d{2}-l\d{2}$/,
  'invalid canonical lesson id',
);
export const LearnCardIdSchema = z.string().regex(
  /^(math|reading|science)-u\d{2}-l\d{2}-c\d+$/,
  'invalid canonical learn card id',
);
export const QuestionIdSchema = z.string().regex(
  /^(math|reading|science)-u\d{2}-l\d{2}-q\d{2,}$/,
  'invalid canonical question id',
);
const OptionIdSchema = z.string().regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  'invalid canonical option id',
);

export const DialogueLineSchema = z.object({
  speaker: z.union([GuideIdSchema, z.literal('kid')]),
  text: z.string().min(1),
  pose: PoseSchema.optional(),
});

export const RichBlockSchema = z.object({
  kind: z.enum(['text', 'example', 'tip']),
  text: z.string().min(1),
});

export const PlaceValueWidgetConfigSchema = z.object({
  target: z.number().int().min(0).optional(),
  periods: z.union([z.literal(2), z.literal(3)]).optional(),
}).strict().superRefine((config, context) => {
  const columns = (config.periods ?? 2) * 3;
  if (config.target !== undefined && config.target >= 10 ** columns) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['target'],
      message: `target must fit in ${columns} place-value columns`,
    });
  }
});

function alignsToStep(value: number, min: number, step: number): boolean {
  const steps = (value - min) / step;
  return Math.abs(steps - Math.round(steps)) < 1e-9;
}

export const NumberLineWidgetConfigSchema = z.object({
  min: z.number().finite(),
  max: z.number().finite(),
  a: z.number().finite(),
  b: z.number().finite(),
  step: z.number().finite().positive().optional(),
}).strict().superRefine((config, context) => {
  if (config.max <= config.min) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['max'],
      message: 'max must be greater than min',
    });
    return;
  }
  for (const marker of ['a', 'b'] as const) {
    if (config[marker] < config.min || config[marker] > config.max) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [marker],
        message: `${marker} must be between min and max`,
      });
    }
  }
  const step = config.step ?? 1;
  for (const marker of ['a', 'b'] as const) {
    if (!alignsToStep(config[marker], config.min, step)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [marker],
        message: `${marker} must align to step from min`,
      });
    }
  }
});

export const WidgetRefSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('place-value-builder'),
    config: PlaceValueWidgetConfigSchema,
  }).strict(),
  z.object({
    type: z.literal('number-line-compare'),
    config: NumberLineWidgetConfigSchema,
  }).strict(),
]);

export const LearnCardSchema = z.object({
  id: LearnCardIdSchema,
  title: z.string().min(1),
  dialogue: z.array(DialogueLineSchema).optional(),
  blocks: z.array(RichBlockSchema).min(1),
  widget: WidgetRefSchema.optional(),
});

const questionBase = {
  id: QuestionIdSchema,
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  conceptTag: z.string().min(1),
  reviewCardId: z.string().min(1),
};
export const ChoiceQuestionSchema = z.object({
  ...questionBase,
  type: z.enum(['multiple-choice', 'true-false']),
  choices: z.array(z.object({ id: OptionIdSchema, text: z.string().min(1) }).strict()).min(2),
  correctChoiceId: OptionIdSchema,
});
export const FillQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('fill-blank'),
  acceptedAnswers: z.array(z.string().min(1)).min(1),
});
export const SortQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('sort'),
  items: z.array(z.object({ id: OptionIdSchema, text: z.string().min(1) }).strict()).min(2),
  correctOrder: z.array(OptionIdSchema).min(2),
});
export const QuestionSchema = z.discriminatedUnion('type', [
  ChoiceQuestionSchema, FillQuestionSchema, SortQuestionSchema,
]);

export const LessonSchema = z.object({
  id: LessonIdSchema,
  unitId: UnitIdSchema,
  title: z.string().min(1),
  indicatorCodes: z.array(z.string()).min(1),
  intro: z.array(DialogueLineSchema).min(1),
  learnCards: z.array(LearnCardSchema).min(1),
  workedExample: z.object({ title: z.string(), steps: z.array(z.string()).min(1) }),
  quiz: z.object({ passThreshold: z.literal(8), pool: z.array(QuestionSchema) }),
});

export const UnitSchema = z.object({
  id: UnitIdSchema,
  subjectId: SubjectIdSchema,
  number: z.number().int().positive(),
  title: z.string().min(1),
  indicatorCodes: z.array(z.string()).min(1),
  prerequisiteUnitIds: z.array(z.string()),
  lessons: z.array(LessonSchema),
});

export type SubjectId = z.infer<typeof SubjectIdSchema>;
export type GuideId = z.infer<typeof GuideIdSchema>;
export type Pose = z.infer<typeof PoseSchema>;
export type DialogueLine = z.infer<typeof DialogueLineSchema>;
export type RichBlock = z.infer<typeof RichBlockSchema>;
export type WidgetRef = z.infer<typeof WidgetRefSchema>;
export type WidgetType = WidgetRef['type'];
export type WidgetConfig<T extends WidgetType = WidgetType> = Extract<
  WidgetRef,
  { type: T }
>['config'];
export type LearnCard = z.infer<typeof LearnCardSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Subject = {
  id: SubjectId;
  title: string;
  guide: GuideId;
  /** Bright decorative identity color (confetti, shadows, non-semantic flourishes). */
  color: string;
  /** Darker identity color for text, controls, and meaningful graphics. */
  actionColor: string;
  units: Unit[];
};

function normalizedVisibleText(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en-US')
    .replace(/,/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function duplicateValues(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = lesson.learnCards.flatMap((card) => {
    const widget = card.widget as { type?: unknown } | undefined;
    return widget &&
      typeof widget.type === 'string' &&
      !(WIDGET_TYPES as readonly string[]).includes(widget.type)
      ? [`${card.id}: unknown widget type "${widget.type}"`]
      : [];
  });
  const parsed = LessonSchema.safeParse(lesson);
  if (!parsed.success) {
    return [
      ...errors,
      ...parsed.error.issues.map((i) => `${lesson.id}: ${i.path.join('.')}: ${i.message}`),
    ];
  }
  const cardIds = new Set(lesson.learnCards.map((c) => c.id));
  if (lesson.unitId !== lesson.id.slice(0, lesson.id.lastIndexOf('-l'))) {
    errors.push(`${lesson.id}: lesson id must belong to unit ${lesson.unitId}`);
  }
  if (lesson.quiz.pool.length < 13)
    errors.push(`${lesson.id}: quiz pool has ${lesson.quiz.pool.length}, needs >= 13`);
  const seen = new Set<string>();
  for (const q of lesson.quiz.pool) {
    if (!q.id.startsWith(`${lesson.id}-q`)) {
      errors.push(`${q.id}: question id must belong to lesson ${lesson.id}`);
    }
    if (seen.has(q.id)) errors.push(`${lesson.id}: duplicate question id ${q.id}`);
    seen.add(q.id);
    if (!cardIds.has(q.reviewCardId))
      errors.push(`${q.id}: reviewCardId "${q.reviewCardId}" does not match any learn card`);
    if (q.type === 'multiple-choice' || q.type === 'true-false') {
      if (duplicateValues(q.choices.map((choice) => choice.id)).length > 0)
        errors.push(`${q.id}: duplicate choice id`);
      if (duplicateValues(q.choices.map((choice) => normalizedVisibleText(choice.text))).length > 0)
        errors.push(`${q.id}: duplicate choice text after normalization`);
      if (!q.choices.some((c) => c.id === q.correctChoiceId))
        errors.push(`${q.id}: correctChoiceId "${q.correctChoiceId}" not in choices`);
    }
    if (q.type === 'sort') {
      if (duplicateValues(q.items.map((item) => item.id)).length > 0)
        errors.push(`${q.id}: duplicate sort item id`);
      if (duplicateValues(q.items.map((item) => normalizedVisibleText(item.text))).length > 0)
        errors.push(`${q.id}: duplicate sort item text after normalization`);
      const itemIds = new Set(q.items.map((i) => i.id));
      const unique = new Set(q.correctOrder);
      if (
        q.correctOrder.length !== q.items.length ||
        unique.size !== q.correctOrder.length ||
        !q.correctOrder.every((id) => itemIds.has(id))
      )
        errors.push(`${q.id}: correctOrder must be a permutation of item ids`);
    }
  }
  // Card ids are load-bearing: the lesson player keys its stages on them and the results
  // screen deep-links to a card by id, so a duplicate would silently strand a review link.
  const seenCards = new Set<string>();
  for (const card of lesson.learnCards) {
    if (!card.id.startsWith(`${lesson.id}-c`)) {
      errors.push(`${card.id}: learn card id must belong to lesson ${lesson.id}`);
    }
    if (seenCards.has(card.id)) errors.push(`${lesson.id}: duplicate learn card id ${card.id}`);
    seenCards.add(card.id);
  }
  return errors;
}

function countById<T extends { id: string }>(values: T[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value.id, (counts.get(value.id) ?? 0) + 1);
  return counts;
}

/** Validates the two content views together so authored modules cannot be orphaned,
 * consumed twice, or silently shadowed by a colliding permanent identity. */
export function validateContentCatalog(
  subjects: Subject[],
  registries: Record<SubjectId, Record<string, Lesson[]>>,
): string[] {
  const errors: string[] = [];
  const unitsBySubject = new Map<SubjectId, Set<string>>();
  const consumed = subjects.flatMap((subject) => {
    unitsBySubject.set(subject.id, new Set(subject.units.map((unit) => unit.id)));
    return subject.units.flatMap((unit) => unit.lessons);
  });
  const registered: Lesson[] = [];

  for (const subjectId of SubjectIdSchema.options) {
    const realUnitIds = unitsBySubject.get(subjectId) ?? new Set<string>();
    for (const [registryUnitId, lessons] of Object.entries(registries[subjectId])) {
      if (!realUnitIds.has(registryUnitId)) {
        errors.push(`${subjectId}: registry key ${registryUnitId} must name a real unit`);
      }
      for (const lesson of lessons) {
        registered.push(lesson);
        if (lesson.unitId !== registryUnitId) {
          errors.push(`${lesson.id}: registry key ${registryUnitId} does not match lesson unitId`);
        }
      }
    }
  }

  const registeredCounts = countById(registered);
  const consumedCounts = countById(consumed);
  const allIds = new Set([...registeredCounts.keys(), ...consumedCounts.keys()]);
  for (const id of allIds) {
    if ((registeredCounts.get(id) ?? 0) !== 1)
      errors.push(`${id}: lesson must be registered exactly once`);
    if ((consumedCounts.get(id) ?? 0) !== 1)
      errors.push(`${id}: registered lesson must be consumed exactly once`);
  }

  for (const id of duplicateValues(consumed.map((lesson) => lesson.id)))
    errors.push(`duplicate lesson id ${id}`);
  const cards = consumed.flatMap((lesson) => lesson.learnCards);
  for (const id of duplicateValues(cards.map((card) => card.id)))
    errors.push(`duplicate learn card id ${id}`);
  const questions = consumed.flatMap((lesson) => lesson.quiz.pool);
  for (const id of duplicateValues(questions.map((question) => question.id)))
    errors.push(`duplicate question id ${id}`);

  return errors;
}
