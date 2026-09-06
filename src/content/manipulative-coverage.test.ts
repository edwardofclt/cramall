import { expect, test } from 'vitest';
import { allLessons } from './subjects';

/**
 * The product requirement: a lesson gives the learner *multiple* manipulatives, not one
 * demonstration and two pages of prose. `LearnCardSchema` allows one widget and one demo per
 * card and every lesson has three cards, so the ceiling is three and the bar here is two.
 *
 * Counted as a manipulative: a `widget` (something the learner operates) or a `demo` (a
 * replayable model). An inline `check` is practice, not a manipulative, so it does not count.
 */

function manipulatives(lesson: ReturnType<typeof allLessons>[number]): number {
  return lesson.learnCards.filter((card) => card.widget !== undefined).length
    + lesson.learnCards.filter((card) => card.demo !== undefined).length;
}

test('every lesson offers at least two manipulatives', () => {
  const thin = allLessons()
    .map((lesson) => ({ id: lesson.id, count: manipulatives(lesson) }))
    .filter(({ count }) => count < 2);

  const bySubject = (prefix: string) => thin.filter(({ id }) => id.startsWith(prefix)).length;
  const summary = `${thin.length} lessons under two manipulatives `
    + `(math ${bySubject('math')}, reading ${bySubject('reading')}, science ${bySubject('science')})`;

  expect(thin.map(({ id, count }) => `${id}: ${count}`), summary).toEqual([]);
});
