import { allLessons } from './subjects';

const prototypes = [
  ['math-u09-l04', 'math-u09-l04-c3', 'scale-reading'],
  ['reading-u01-l01', 'reading-u01-l01-c2', 'phrase-pathfinder'],
  ['science-u05-l04', 'science-u05-l04-c3', 'device-retest'],
];

test.each(prototypes)('%s contains its designed coached activity on %s', (lessonId, cardId, type) => {
  const card = allLessons().find(lesson => lesson.id === lessonId)?.learnCards.find(candidate => candidate.id === cardId);
  expect(card?.widget?.type).toBe(type);
  expect(card?.widgetCoach?.intro.map(line => line.speaker)).toEqual(['guide', 'kid']);
  expect(card?.widgetCoach?.startLabel).toBeTruthy();
});

test('every registered lesson includes at least one guided activity', () => {
  // Other curriculum work can add subjects independently of this three-subject rollout.
  const originalSubjects = allLessons().filter(lesson => /^(math|reading|science)-/.test(lesson.id));
  const uncovered = allLessons().filter(lesson => !lesson.learnCards.some(card => (card.widget && card.widgetCoach) || card.demo)).map(lesson => lesson.id);
  expect(uncovered).toEqual([]);
  expect(originalSubjects).toHaveLength(89);
});
