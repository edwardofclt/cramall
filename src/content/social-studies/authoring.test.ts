import { expect, test } from 'vitest';
import { historyLesson, type HistoryLessonDraft } from './authoring';
const card = { title: 'Read a clue', text: 'A map shows where a place is.', example: 'A labeled map locates Charleston.', tip: 'Use the label.' };
const draft: HistoryLessonDraft = {
  id: 'social-studies-u01-l01', title: 'Read the Past', indicatorCode: '4.1.CO', intro: 'Let us compare clues.',
  cards: [card, card, card], activity: {type:'place-value-builder',config:{target:10}},
  coach: {intro:[{speaker:'guide',text:'Read these clues.'},{speaker:'kid',text:'I will compare them.'}],reactions:{complete:{text:'You compared the clues.'}}},
  worked: {title:'Use a clue',steps:['Read the map label.']},
  questions: Array.from({length:13},(_,i) => ({card:(i % 3 + 1) as 1|2|3,prompt:`Which clue helps with question ${i + 1}?`,correct:'A label',wrong:['A guess','A color alone'],explanation:'The label names the place.'})),
};
test('assigns canonical IDs, review targets and visible reference material without inventing questions', () => {
  const lesson=historyLesson(draft);
  expect(lesson.unitId).toBe('social-studies-u01');
  expect(lesson.quiz.pool[12]!.id).toBe('social-studies-u01-l01-q13');
  expect(lesson.quiz.pool[1]!.reviewCardId).toBe('social-studies-u01-l01-c2');
  expect(lesson.quiz.pool.map(q=>q.prompt)).toEqual(draft.questions.map(q=>q.prompt));
  expect(lesson.learnCards[1]!.widget).toEqual(draft.activity);
  expect(lesson.learnCards[1]!.widgetCoach).toEqual(draft.coach);
  expect(lesson.quiz.reference?.text).toContain(card.text);
  expect(lesson.quiz.reference?.text).toContain(card.example);
  expect(lesson.learnCards.every(card=>card.check)).toBe(true);
  expect(lesson.quiz.pool.slice(0,3).map(q => 'choices' in q ? q.choices.findIndex(c=>c.id===q.correctChoiceId) : -1)).toEqual([0,1,2]);
});
test('rejects incomplete drafts rather than shipping truncated lessons', () => {
  expect(()=>historyLesson({...draft,questions:draft.questions.slice(0,12)})).toThrow(/13/);
  expect(()=>historyLesson({...draft,questions:draft.questions.map(q=>({...q,card:1}))})).toThrow(/card/);
});
