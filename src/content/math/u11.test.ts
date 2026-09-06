import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit11Lessons } from './u11';

const expected = [
  { id: 'math-u11-l01', title: 'Classify Triangles by Sides and Angles', indicatorCodes: ['4.MGSR.3.1'] },
  { id: 'math-u11-l02', title: 'The Quadrilateral Hierarchy', indicatorCodes: ['4.MGSR.3.2'] },
] as const;

const expectedCards = {
  'math-u11-l01': [['math-u11-l01-c1', 'Classify by Side Length', 'triangle-sides'], ['math-u11-l01-c2', 'Classify by Angle Measure', 'triangle-angles'], ['math-u11-l01-c3', 'Give Both Triangle Classifications', 'triangle-classification']],
  'math-u11-l02': [['math-u11-l02-c1', 'Find Quadrilateral Attributes', 'quadrilateral-attributes'], ['math-u11-l02-c2', 'Place Shapes in a Hierarchy', 'hierarchy-membership'], ['math-u11-l02-c3', 'Explain Every Valid Classification', 'hierarchy-explanation']],
} as const;

const expectedRoutes = {
  'math-u11-l01': [
      ['multiple-choice', 'triangle-sides', 1],
      ['fill-blank', 'triangle-sides', 1],
      ['true-false', 'triangle-sides', 1],
      ['multiple-choice', 'triangle-sides', 1],
      ['multiple-choice', 'triangle-angles', 2],
      ['fill-blank', 'triangle-angles', 2],
      ['true-false', 'triangle-angles', 2],
      ['multiple-choice', 'triangle-angles', 2],
      ['multiple-choice', 'triangle-classification', 3],
      ['fill-blank', 'triangle-classification', 3],
      ['true-false', 'triangle-classification', 3],
      ['multiple-choice', 'triangle-classification', 3],
      ['multiple-choice', 'triangle-classification', 3]
  ],
  'math-u11-l02': [
      ['multiple-choice', 'quadrilateral-attributes', 1],
      ['fill-blank', 'quadrilateral-attributes', 1],
      ['true-false', 'quadrilateral-attributes', 1],
      ['multiple-choice', 'quadrilateral-attributes', 1],
      ['multiple-choice', 'hierarchy-membership', 2],
      ['sort', 'hierarchy-membership', 2],
      ['true-false', 'hierarchy-membership', 2],
      ['multiple-choice', 'hierarchy-membership', 2],
      ['multiple-choice', 'hierarchy-explanation', 3],
      ['fill-blank', 'hierarchy-explanation', 3],
      ['true-false', 'hierarchy-explanation', 3],
      ['multiple-choice', 'hierarchy-explanation', 3],
      ['multiple-choice', 'hierarchy-explanation', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u11-l01-c1': {"type": "shape-classifier", "config": {"mode": "classifications", "shapes": [{"id": "equilateral", "label": "Equilateral triangle", "sides": 3, "angles": 3, "parallelPairs": 0, "diagram": "equilateral-triangle", "classifications": ["triangle", "equilateral-triangle", "acute-triangle", "equiangular-triangle"]}, {"id": "isosceles", "label": "Isosceles triangle", "sides": 3, "angles": 3, "parallelPairs": 0, "diagram": "isosceles-acute-triangle", "classifications": ["triangle", "isosceles-triangle", "acute-triangle"]}, {"id": "scalene", "label": "Scalene triangle", "sides": 3, "angles": 3, "parallelPairs": 0, "diagram": "scalene-acute-triangle", "classifications": ["triangle", "scalene-triangle", "acute-triangle"]}], "bins": [{"id": "triangle", "label": "Triangle", "classification": "triangle"}, {"id": "equilateral-triangle", "label": "Equilateral", "classification": "equilateral-triangle", "parentIds": ["triangle"]}, {"id": "equiangular-triangle", "label": "Equiangular", "classification": "equiangular-triangle", "parentIds": ["equilateral-triangle"]}, {"id": "isosceles-triangle", "label": "Isosceles", "classification": "isosceles-triangle", "parentIds": ["triangle"]}, {"id": "scalene-triangle", "label": "Scalene", "classification": "scalene-triangle", "parentIds": ["triangle"]}, {"id": "acute-triangle", "label": "Acute", "classification": "acute-triangle", "parentIds": ["triangle"]}]}},
  'math-u11-l01-c2': {"type": "shape-classifier", "config": {"mode": "classifications", "shapes": [{"id": "iso-acute", "label": "Isosceles acute triangle", "sides": 3, "angles": 3, "parallelPairs": 0, "diagram": "isosceles-acute-triangle", "classifications": ["triangle", "isosceles-triangle", "acute-triangle"]}, {"id": "iso-right", "label": "Isosceles right triangle", "sides": 3, "angles": 3, "parallelPairs": 0, "diagram": "isosceles-right-triangle", "classifications": ["triangle", "isosceles-triangle", "right-triangle"]}, {"id": "iso-obtuse", "label": "Isosceles obtuse triangle", "sides": 3, "angles": 3, "parallelPairs": 0, "diagram": "isosceles-obtuse-triangle", "classifications": ["triangle", "isosceles-triangle", "obtuse-triangle"]}], "bins": [{"id": "triangle", "label": "Triangle", "classification": "triangle"}, {"id": "isosceles-triangle", "label": "Isosceles", "classification": "isosceles-triangle", "parentIds": ["triangle"]}, {"id": "acute-triangle", "label": "Acute", "classification": "acute-triangle", "parentIds": ["triangle"]}, {"id": "right-triangle", "label": "Right", "classification": "right-triangle", "parentIds": ["triangle"]}, {"id": "obtuse-triangle", "label": "Obtuse", "classification": "obtuse-triangle", "parentIds": ["triangle"]}]}},
  'math-u11-l01-c3': {"type": "shape-classifier", "config": {"mode": "classifications", "shapes": [{"id": "equilateral", "label": "Equilateral triangle", "sides": 3, "angles": 3, "parallelPairs": 0, "diagram": "equilateral-triangle", "classifications": ["triangle", "equilateral-triangle", "acute-triangle", "equiangular-triangle"]}, {"id": "scalene-obtuse", "label": "Scalene obtuse triangle", "sides": 3, "angles": 3, "parallelPairs": 0, "diagram": "scalene-obtuse-triangle", "classifications": ["triangle", "scalene-triangle", "obtuse-triangle"]}], "bins": [{"id": "triangle", "label": "Triangle", "classification": "triangle"}, {"id": "equilateral-triangle", "label": "Equilateral", "classification": "equilateral-triangle", "parentIds": ["triangle"]}, {"id": "equiangular-triangle", "label": "Equiangular", "classification": "equiangular-triangle", "parentIds": ["equilateral-triangle"]}, {"id": "scalene-triangle", "label": "Scalene", "classification": "scalene-triangle", "parentIds": ["triangle"]}, {"id": "acute-triangle", "label": "Acute", "classification": "acute-triangle", "parentIds": ["triangle"]}, {"id": "obtuse-triangle", "label": "Obtuse", "classification": "obtuse-triangle", "parentIds": ["triangle"]}]}},
  'math-u11-l02-c1': {"type": "shape-classifier", "config": {"shapes": [{"id": "trapezoid", "label": "Trapezoid", "sides": 4, "angles": 4, "parallelPairs": 1}, {"id": "rectangle", "label": "Rectangle", "sides": 4, "angles": 4, "parallelPairs": 2}, {"id": "square", "label": "Square", "sides": 4, "angles": 4, "parallelPairs": 2}], "bins": [{"id": "one-pair", "label": "1 parallel pair", "value": 1}, {"id": "two-pairs", "label": "2 parallel pairs", "value": 2}], "rule": "parallelPairs"}},
  'math-u11-l02-c2': {"type": "shape-classifier", "config": {"mode": "classifications", "shapes": [{"id": "parallelogram", "label": "Parallelogram", "sides": 4, "angles": 4, "parallelPairs": 2, "diagram": "parallelogram", "classifications": ["quadrilateral", "parallelogram"]}, {"id": "rectangle", "label": "Rectangle", "sides": 4, "angles": 4, "parallelPairs": 2, "diagram": "rectangle", "classifications": ["quadrilateral", "parallelogram", "rectangle"]}, {"id": "rhombus", "label": "Rhombus", "sides": 4, "angles": 4, "parallelPairs": 2, "diagram": "rhombus", "classifications": ["quadrilateral", "parallelogram", "rhombus"]}], "bins": [{"id": "quadrilateral", "label": "Quadrilateral", "classification": "quadrilateral"}, {"id": "parallelogram", "label": "Parallelogram", "classification": "parallelogram", "parentIds": ["quadrilateral"]}, {"id": "rectangle", "label": "Rectangle", "classification": "rectangle", "parentIds": ["parallelogram"]}, {"id": "rhombus", "label": "Rhombus", "classification": "rhombus", "parentIds": ["parallelogram"]}]}},
  'math-u11-l02-c3': {"type": "shape-classifier", "config": {"mode": "classifications", "shapes": [{"id": "square", "label": "Square", "sides": 4, "angles": 4, "parallelPairs": 2, "diagram": "square", "classifications": ["quadrilateral", "parallelogram", "rectangle", "rhombus", "square"]}], "bins": [{"id": "quadrilateral", "label": "Quadrilateral", "classification": "quadrilateral"}, {"id": "parallelogram", "label": "Parallelogram", "classification": "parallelogram", "parentIds": ["quadrilateral"]}, {"id": "rectangle", "label": "Rectangle", "classification": "rectangle", "parentIds": ["parallelogram"]}, {"id": "rhombus", "label": "Rhombus", "classification": "rhombus", "parentIds": ["parallelogram"]}, {"id": "square", "label": "Square", "classification": "square", "parentIds": ["rectangle", "rhombus"]}]}},
} as const;

test('u11 is the exact validated 2-lesson unit', () => {
  expect(unit11Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit11Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u11');
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.passThreshold).toBe(8);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);
    expect(lesson.quiz.pool.map(({ id }) => id)).toEqual(
      Array.from({ length: 13 }, (_, index) => `${lesson.id}-q${String(index + 1).padStart(2, '0')}`),
    );

    const cardSpecs = expectedCards[lesson.id as keyof typeof expectedCards];
    expect(lesson.learnCards.map((card, index) => [
      card.id,
      card.title,
      lesson.quiz.pool.find(({ reviewCardId }) => reviewCardId === `${lesson.id}-c${index + 1}`)?.conceptTag,
    ])).toEqual(cardSpecs);
    expect(lesson.quiz.pool.map(({ type, conceptTag, reviewCardId }) => [
      type, conceptTag, Number(reviewCardId.slice(-1)),
    ])).toEqual(expectedRoutes[lesson.id as keyof typeof expectedRoutes]);
    expect(new Set(lesson.quiz.pool.map(({ reviewCardId }) => reviewCardId))).toEqual(
      new Set(lesson.learnCards.map(({ id }) => id)),
    );

    for (const card of lesson.learnCards) {
      const expectedWidget = expectedWidgets[card.id as keyof typeof expectedWidgets];
      expect(card.widget).toEqual(expectedWidget);
      if (card.widget) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
    }
  }
});
