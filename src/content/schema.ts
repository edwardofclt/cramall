import { z } from 'zod';

export const WIDGET_TYPES = ['place-value-builder', 'number-line-compare'] as const;

export const SubjectIdSchema = z.enum(['math', 'reading', 'science']);
export const GuideIdSchema = z.enum(['nutty', 'winnie', 'sandy']);
export const PoseSchema = z.enum(['idle', 'talk', 'think', 'cheer', 'oops']);

export const DialogueLineSchema = z.object({
  speaker: z.union([GuideIdSchema, z.literal('kid')]),
  text: z.string().min(1),
  pose: PoseSchema.optional(),
});

export const RichBlockSchema = z.object({
  kind: z.enum(['text', 'example', 'tip']),
  text: z.string().min(1),
});

export const WidgetRefSchema = z.object({
  type: z.string(),
  config: z.record(z.unknown()),
});

export const LearnCardSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  dialogue: z.array(DialogueLineSchema).optional(),
  blocks: z.array(RichBlockSchema).min(1),
  widget: WidgetRefSchema.optional(),
});

const questionBase = {
  id: z.string().min(1),
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  conceptTag: z.string().min(1),
  reviewCardId: z.string().min(1),
};
export const ChoiceQuestionSchema = z.object({
  ...questionBase,
  type: z.enum(['multiple-choice', 'true-false']),
  choices: z.array(z.object({ id: z.string(), text: z.string() })).min(2),
  correctChoiceId: z.string(),
});
export const FillQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('fill-blank'),
  acceptedAnswers: z.array(z.string().min(1)).min(1),
});
export const SortQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('sort'),
  items: z.array(z.object({ id: z.string(), text: z.string() })).min(2),
  correctOrder: z.array(z.string()).min(2),
});
export const QuestionSchema = z.discriminatedUnion('type', [
  ChoiceQuestionSchema, FillQuestionSchema, SortQuestionSchema,
]);

export const LessonSchema = z.object({
  id: z.string().min(1),
  unitId: z.string().min(1),
  title: z.string().min(1),
  indicatorCodes: z.array(z.string()).min(1),
  intro: z.array(DialogueLineSchema).min(1),
  learnCards: z.array(LearnCardSchema).min(1),
  workedExample: z.object({ title: z.string(), steps: z.array(z.string()).min(1) }),
  quiz: z.object({ passThreshold: z.number().int(), pool: z.array(QuestionSchema) }),
});

export const UnitSchema = z.object({
  id: z.string().min(1),
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
export type LearnCard = z.infer<typeof LearnCardSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Subject = {
  id: SubjectId; title: string; guide: GuideId; color: string; units: Unit[];
};

export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = [];
  const parsed = LessonSchema.safeParse(lesson);
  if (!parsed.success) {
    return parsed.error.issues.map((i) => `${lesson.id}: ${i.path.join('.')}: ${i.message}`);
  }
  const cardIds = new Set(lesson.learnCards.map((c) => c.id));
  if (lesson.quiz.pool.length < 13)
    errors.push(`${lesson.id}: quiz pool has ${lesson.quiz.pool.length}, needs >= 13`);
  const seen = new Set<string>();
  for (const q of lesson.quiz.pool) {
    if (seen.has(q.id)) errors.push(`${lesson.id}: duplicate question id ${q.id}`);
    seen.add(q.id);
    if (!cardIds.has(q.reviewCardId))
      errors.push(`${q.id}: reviewCardId "${q.reviewCardId}" does not match any learn card`);
    if (q.type === 'multiple-choice' || q.type === 'true-false') {
      if (!q.choices.some((c) => c.id === q.correctChoiceId))
        errors.push(`${q.id}: correctChoiceId "${q.correctChoiceId}" not in choices`);
    }
    if (q.type === 'sort') {
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
    if (seenCards.has(card.id)) errors.push(`${lesson.id}: duplicate learn card id ${card.id}`);
    seenCards.add(card.id);
    if (card.widget && !(WIDGET_TYPES as readonly string[]).includes(card.widget.type))
      errors.push(`${card.id}: unknown widget type "${card.widget.type}"`);
  }
  return errors;
}
