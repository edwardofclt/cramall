import type { Lesson, Question, WidgetRef, WidgetCoach } from '../schema';

export type HistoryCard = { title: string; text: string; example: string; tip: string };
export type HistoryQuestion = {
  card: 1 | 2 | 3;
  prompt: string;
  correct: string;
  wrong: string[];
  explanation: string;
  type?: 'multiple-choice' | 'true-false';
};
export type HistoryLessonDraft = {
  id: string;
  title: string;
  indicatorCode: string;
  intro: string;
  cards: [HistoryCard, HistoryCard, HistoryCard];
  activity: WidgetRef;
  coach: WidgetCoach;
  worked: { title: string; steps: string[] };
  questions: HistoryQuestion[];
};

/** Assigns mechanical IDs and presentation order to explicitly authored content. */
export function historyLesson(draft: HistoryLessonDraft): Lesson {
  if (draft.questions.length !== 13) throw new Error(`${draft.id} needs exactly 13 authored questions`);
  if (draft.cards.length !== 3 || new Set(draft.questions.map(question => question.card)).size !== 3) {
    throw new Error(`${draft.id} needs questions for each of its three cards`);
  }
  const pool: Question[] = draft.questions.map((question, index) => {
    const values = [question.correct, ...question.wrong];
    const correctPosition = index % values.length;
    const choices = question.wrong.map((text, i) => ({ id: `choice-${i + 1}`, text }));
    choices.splice(correctPosition, 0, { id: 'supported', text: question.correct });
    return {
      id: `${draft.id}-q${String(index + 1).padStart(2, '0')}`,
      type: question.type ?? 'multiple-choice',
      prompt: question.prompt,
      choices,
      correctChoiceId: 'supported',
      explanation: question.explanation,
      conceptTag: `history-card-${question.card}`,
      reviewCardId: `${draft.id}-c${question.card}`,
    };
  });
  return {
    id: draft.id,
    unitId: draft.id.slice(0, draft.id.lastIndexOf('-l')),
    title: draft.title,
    indicatorCodes: [draft.indicatorCode],
    intro: [
      { speaker: 'pip', pose: 'talk', text: draft.intro },
      { speaker: 'kid', text: 'I’ll look for clues and explain what they help me understand.' },
      { speaker: 'pip', pose: 'think', text: 'Take your time. You can read or listen, and try an idea again.' },
    ],
    learnCards: draft.cards.map((card, index) => {
      const firstQuestion = pool.find(question => question.reviewCardId === `${draft.id}-c${index + 1}`)!;
      const check = 'choices' in firstQuestion ? {
        prompt: firstQuestion.prompt,
        choices: firstQuestion.choices,
        correctChoiceId: firstQuestion.correctChoiceId,
        explanation: firstQuestion.explanation,
      } : undefined;
      return {
        id: `${draft.id}-c${index + 1}`,
        title: card.title,
        blocks: [
          { kind: 'text' as const, text: card.text },
          { kind: 'example' as const, text: card.example },
          { kind: 'tip' as const, text: card.tip },
        ],
        ...(index === 1 ? { widget: draft.activity, widgetCoach: draft.coach } : {}),
        check,
      };
    }),
    workedExample: {
      ...draft.worked,
      passage: {
        title: 'Lesson field notes',
        text: draft.cards.map(card => `${card.title}\n${card.text}\n${card.example}`).join('\n\n'),
      },
    },
    quiz: {
      passThreshold: 8,
      pool,
      reference: {
        title: 'Lesson field notes — use these while you answer',
        text: draft.cards.map(card => `${card.title}\n${card.text}\n${card.example}\n${card.tip}`).join('\n\n'),
      },
    },
  };
}
