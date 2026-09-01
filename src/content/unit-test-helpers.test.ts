import { test } from 'vitest';
import { unit01Lessons } from './math/u01';
import { expectUnitLessons } from './unit-test-helpers';

test('unit helper accepts the exact reviewed Math pilot contract', () => {
  expectUnitLessons(unit01Lessons, [
    { id: 'math-u01-l01', title: 'Numbers to the Millions', indicatorCodes: ['4.NR.1.1'] },
    { id: 'math-u01-l02', title: 'Comparing and Ordering Big Numbers', indicatorCodes: ['4.NR.1.3'] },
  ], 'math');
});
