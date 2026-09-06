import type { Lesson } from '../schema';

export const unit11Lessons = [
  {
    id: 'math-u11-l01',
    unitId: 'math-u11',
    title: 'Classify Triangles by Sides and Angles',
    indicatorCodes: ['4.MGSR.3.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Every triangle has side-length attributes and angle attributes.' },
      { speaker: 'kid', text: 'Side marks tell whether all, exactly two, or no side lengths match.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Angle measures tell whether angles are acute, right, obtuse, or all equal.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will give both classifications when enough information is provided.' },
    ],
    learnCards: [
      {
        id: 'math-u11-l01-c1',
        title: 'Classify by Side Length',
        blocks: [
          { kind: 'text', text: 'Equilateral triangles have three equal sides, isosceles triangles have exactly two equal sides in this lesson, and scalene triangles have no equal sides.' },
          { kind: 'example', text: 'Side lengths 5, 5, and 7 make an isosceles triangle.' },
          { kind: 'tip', text: 'Use side lengths or matching tick marks, not the drawing’s appearance alone.' },
        ],
        widget: { type: 'shape-classifier', config: { mode: 'classifications', shapes: [{ id: 'equilateral', label: 'Equilateral triangle', sides: 3, angles: 3, parallelPairs: 0, diagram: 'equilateral-triangle', classifications: ['triangle', 'equilateral-triangle', 'acute-triangle', 'equiangular-triangle'] }, { id: 'isosceles', label: 'Isosceles triangle', sides: 3, angles: 3, parallelPairs: 0, diagram: 'isosceles-acute-triangle', classifications: ['triangle', 'isosceles-triangle', 'acute-triangle'] }, { id: 'scalene', label: 'Scalene triangle', sides: 3, angles: 3, parallelPairs: 0, diagram: 'scalene-acute-triangle', classifications: ['triangle', 'scalene-triangle', 'acute-triangle'] }], bins: [{ id: 'triangle', label: 'Triangle', classification: 'triangle' }, { id: 'equilateral-triangle', label: 'Equilateral', classification: 'equilateral-triangle', parentIds: ['triangle'] }, { id: 'equiangular-triangle', label: 'Equiangular', classification: 'equiangular-triangle', parentIds: ['equilateral-triangle'] }, { id: 'isosceles-triangle', label: 'Isosceles', classification: 'isosceles-triangle', parentIds: ['triangle'] }, { id: 'scalene-triangle', label: 'Scalene', classification: 'scalene-triangle', parentIds: ['triangle'] }, { id: 'acute-triangle', label: 'Acute', classification: 'acute-triangle', parentIds: ['triangle'] }] } },
      },
      {
        id: 'math-u11-l01-c2',
        title: 'Classify by Angle Measure',
        blocks: [
          { kind: 'text', text: 'An acute triangle has three acute angles; a right triangle has one 90° angle; an obtuse triangle has one angle greater than 90°.' },
          { kind: 'example', text: 'Angles 45°, 45°, and 90° make a right triangle; three 60° angles make an equiangular and acute triangle.' },
          { kind: 'tip', text: 'Triangle angle measures total 180°, so there cannot be two right or two obtuse angles.' },
        ],
        widget: { type: 'shape-classifier', config: { mode: 'classifications', shapes: [{ id: 'iso-acute', label: 'Isosceles acute triangle', sides: 3, angles: 3, parallelPairs: 0, diagram: 'isosceles-acute-triangle', classifications: ['triangle', 'isosceles-triangle', 'acute-triangle'] }, { id: 'iso-right', label: 'Isosceles right triangle', sides: 3, angles: 3, parallelPairs: 0, diagram: 'isosceles-right-triangle', classifications: ['triangle', 'isosceles-triangle', 'right-triangle'] }, { id: 'iso-obtuse', label: 'Isosceles obtuse triangle', sides: 3, angles: 3, parallelPairs: 0, diagram: 'isosceles-obtuse-triangle', classifications: ['triangle', 'isosceles-triangle', 'obtuse-triangle'] }], bins: [{ id: 'triangle', label: 'Triangle', classification: 'triangle' }, { id: 'isosceles-triangle', label: 'Isosceles', classification: 'isosceles-triangle', parentIds: ['triangle'] }, { id: 'acute-triangle', label: 'Acute', classification: 'acute-triangle', parentIds: ['triangle'] }, { id: 'right-triangle', label: 'Right', classification: 'right-triangle', parentIds: ['triangle'] }, { id: 'obtuse-triangle', label: 'Obtuse', classification: 'obtuse-triangle', parentIds: ['triangle'] }] } },
      },
      {
        id: 'math-u11-l01-c3',
        title: 'Give Both Triangle Classifications',
        blocks: [
          { kind: 'text', text: 'Combine one side classification and one angle classification when both attributes are known.' },
          { kind: 'example', text: 'Sides 5, 5, and about 7.1 with angles 45°, 45°, and 90° describe an isosceles right triangle.' },
          { kind: 'tip', text: 'A complete classification cites the measurements or marks that support each name.' },
        ],
        widget: { type: 'shape-classifier', config: { mode: 'classifications', shapes: [{ id: 'equilateral', label: 'Equilateral triangle', sides: 3, angles: 3, parallelPairs: 0, diagram: 'equilateral-triangle', classifications: ['triangle', 'equilateral-triangle', 'acute-triangle', 'equiangular-triangle'] }, { id: 'scalene-obtuse', label: 'Scalene obtuse triangle', sides: 3, angles: 3, parallelPairs: 0, diagram: 'scalene-obtuse-triangle', classifications: ['triangle', 'scalene-triangle', 'obtuse-triangle'] }], bins: [{ id: 'triangle', label: 'Triangle', classification: 'triangle' }, { id: 'equilateral-triangle', label: 'Equilateral', classification: 'equilateral-triangle', parentIds: ['triangle'] }, { id: 'equiangular-triangle', label: 'Equiangular', classification: 'equiangular-triangle', parentIds: ['equilateral-triangle'] }, { id: 'scalene-triangle', label: 'Scalene', classification: 'scalene-triangle', parentIds: ['triangle'] }, { id: 'acute-triangle', label: 'Acute', classification: 'acute-triangle', parentIds: ['triangle'] }, { id: 'obtuse-triangle', label: 'Obtuse', classification: 'obtuse-triangle', parentIds: ['triangle'] }] } },
      },
    ],
    workedExample: {
      title: 'Classify a triangle with sides 6, 6, 6 and angles 60°, 60°, 60°',
      steps: [
        'All three sides are equal, so the side classification is equilateral.',
        'All three angles are equal, so it is equiangular; each angle is also acute.',
        'The complete description is an equilateral, equiangular acute triangle.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u11-l01-q01', type: 'multiple-choice', conceptTag: 'triangle-sides', reviewCardId: 'math-u11-l01-c1', prompt: 'A triangle has side lengths 5, 5, and 7. How is it classified by sides?', choices: [{ id: 'a', text: 'Isosceles' }, { id: 'b', text: 'Equilateral' }, { id: 'c', text: 'Scalene' }, { id: 'd', text: 'Right' }], correctChoiceId: 'a', explanation: 'Exactly two side lengths are equal, so it is isosceles in this lesson.' },
        { id: 'math-u11-l01-q02', type: 'fill-blank', conceptTag: 'triangle-sides', reviewCardId: 'math-u11-l01-c1', prompt: 'A triangle with no equal side lengths is called ___.', acceptedAnswers: ['scalene'], explanation: 'Scalene triangles have three different side lengths.' },
        { id: 'math-u11-l01-q03', type: 'true-false', conceptTag: 'triangle-sides', reviewCardId: 'math-u11-l01-c1', prompt: 'A triangle with side lengths 4, 4, and 4 is equilateral.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'All three sides are equal.' },
        { id: 'math-u11-l01-q04', type: 'multiple-choice', conceptTag: 'triangle-sides', reviewCardId: 'math-u11-l01-c1', prompt: 'Which side lengths describe a scalene triangle?', choices: [{ id: 'a', text: '4, 5, 6' }, { id: 'b', text: '5, 5, 7' }, { id: 'c', text: '8, 8, 8' }, { id: 'd', text: '3, 3, 5' }], correctChoiceId: 'a', explanation: 'All three listed side lengths are different.' },
        { id: 'math-u11-l01-q05', type: 'multiple-choice', conceptTag: 'triangle-angles', reviewCardId: 'math-u11-l01-c2', prompt: 'A triangle has angles 30°, 60°, and 90°. How is it classified by angles?', choices: [{ id: 'a', text: 'Right' }, { id: 'b', text: 'Acute' }, { id: 'c', text: 'Obtuse' }, { id: 'd', text: 'Equiangular' }], correctChoiceId: 'a', explanation: 'One angle measures exactly 90°, so it is right.' },
        { id: 'math-u11-l01-q06', type: 'fill-blank', conceptTag: 'triangle-angles', reviewCardId: 'math-u11-l01-c2', prompt: 'A triangle with one angle measuring 110° is an ___ triangle.', acceptedAnswers: ['obtuse'], explanation: 'An angle greater than 90° makes the triangle obtuse.' },
        { id: 'math-u11-l01-q07', type: 'true-false', conceptTag: 'triangle-angles', reviewCardId: 'math-u11-l01-c2', prompt: 'A triangle with angles 60°, 60°, and 60° is both equiangular and acute.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'All angles are equal and each is less than 90°.' },
        { id: 'math-u11-l01-q08', type: 'multiple-choice', conceptTag: 'triangle-angles', reviewCardId: 'math-u11-l01-c2', prompt: 'Which angle set describes an acute triangle?', choices: [{ id: 'a', text: '50°, 60°, 70°' }, { id: 'b', text: '40°, 50°, 90°' }, { id: 'c', text: '30°, 40°, 110°' }, { id: 'd', text: '60°, 60°, 90°' }], correctChoiceId: 'a', explanation: 'All three angles are less than 90° and total 180°.' },
        { id: 'math-u11-l01-q09', type: 'multiple-choice', conceptTag: 'triangle-classification', reviewCardId: 'math-u11-l01-c3', prompt: 'A triangle has sides 5, 5, and about 7.1 and angles 45°, 45°, and 90°. Which classification is complete?', choices: [{ id: 'a', text: 'Isosceles right' }, { id: 'b', text: 'Scalene acute' }, { id: 'c', text: 'Equilateral equiangular' }, { id: 'd', text: 'Isosceles obtuse' }], correctChoiceId: 'a', explanation: 'Two sides are equal and one angle is right.' },
        { id: 'math-u11-l01-q10', type: 'fill-blank', conceptTag: 'triangle-classification', reviewCardId: 'math-u11-l01-c3', prompt: 'A triangle with three unequal sides and one 100° angle is a scalene ___ triangle.', acceptedAnswers: ['obtuse'], explanation: 'Three unequal sides make it scalene, and the 100° angle makes it obtuse.' },
        { id: 'math-u11-l01-q11', type: 'true-false', conceptTag: 'triangle-classification', reviewCardId: 'math-u11-l01-c3', prompt: 'A triangle with sides 6, 6, 6 and angles 60°, 60°, 60° is equilateral and equiangular.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'All side lengths and all angle measures match.' },
        { id: 'math-u11-l01-q12', type: 'multiple-choice', conceptTag: 'triangle-classification', reviewCardId: 'math-u11-l01-c3', prompt: 'Which evidence proves a triangle is isosceles acute?', choices: [{ id: 'a', text: 'Exactly two equal sides and all three angles less than 90°' }, { id: 'b', text: 'Three equal sides and one 90° angle' }, { id: 'c', text: 'No equal sides and one angle greater than 90°' }, { id: 'd', text: 'Four equal sides and four right angles' }], correctChoiceId: 'a', explanation: 'The evidence supplies both the side and angle classifications.' },
        { id: 'math-u11-l01-q13', type: 'multiple-choice', conceptTag: 'triangle-classification', reviewCardId: 'math-u11-l01-c3', prompt: 'A triangle has angles 35°, 55°, and 90° and three different side lengths. Which classification fits?', choices: [{ id: 'a', text: 'Scalene right' }, { id: 'b', text: 'Isosceles acute' }, { id: 'c', text: 'Equilateral right' }, { id: 'd', text: 'Scalene obtuse' }], correctChoiceId: 'a', explanation: 'Three different sides make it scalene and the 90° angle makes it right.' },
      ],
    },
  },
  {
    id: 'math-u11-l02',
    unitId: 'math-u11',
    title: 'The Quadrilateral Hierarchy',
    indicatorCodes: ['4.MGSR.3.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Quadrilaterals can belong to more than one shape group.' },
      { speaker: 'kid', text: 'Shared attributes create parent and child categories.' },
      { speaker: 'nutty', pose: 'cheer', text: 'A square keeps every attribute of rectangles, rhombuses, and parallelograms.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will name every valid classification and explain the hierarchy.' },
    ],
    learnCards: [
      {
        id: 'math-u11-l02-c1',
        title: 'Find Quadrilateral Attributes',
        blocks: [
          { kind: 'text', text: 'A quadrilateral has four sides; parallel sides, equal sides, and right angles identify more specific groups.' },
          { kind: 'example', text: 'A rectangle has four right angles and two pairs of parallel sides.' },
          { kind: 'tip', text: 'Use marked attributes rather than a shape’s tilt or size.' },
        ],
        widget: { type: 'shape-classifier', config: { shapes: [{ id: 'trapezoid', label: 'Trapezoid', sides: 4, angles: 4, parallelPairs: 1 }, { id: 'rectangle', label: 'Rectangle', sides: 4, angles: 4, parallelPairs: 2 }, { id: 'square', label: 'Square', sides: 4, angles: 4, parallelPairs: 2 }], bins: [{ id: 'one-pair', label: '1 parallel pair', value: 1 }, { id: 'two-pairs', label: '2 parallel pairs', value: 2 }], rule: 'parallelPairs' } },
      },
      {
        id: 'math-u11-l02-c2',
        title: 'Place Shapes in a Hierarchy',
        blocks: [
          { kind: 'text', text: 'A child group inherits every attribute of its parent group.' },
          { kind: 'example', text: 'Every rectangle is a parallelogram and quadrilateral; every rhombus is also a parallelogram and quadrilateral.' },
          { kind: 'tip', text: 'A square belongs to both the rectangle and rhombus branches because it has four right angles and four equal sides.' },
        ],
        widget: { type: 'shape-classifier', config: { mode: 'classifications', shapes: [{ id: 'parallelogram', label: 'Parallelogram', sides: 4, angles: 4, parallelPairs: 2, diagram: 'parallelogram', classifications: ['quadrilateral', 'parallelogram'] }, { id: 'rectangle', label: 'Rectangle', sides: 4, angles: 4, parallelPairs: 2, diagram: 'rectangle', classifications: ['quadrilateral', 'parallelogram', 'rectangle'] }, { id: 'rhombus', label: 'Rhombus', sides: 4, angles: 4, parallelPairs: 2, diagram: 'rhombus', classifications: ['quadrilateral', 'parallelogram', 'rhombus'] }], bins: [{ id: 'quadrilateral', label: 'Quadrilateral', classification: 'quadrilateral' }, { id: 'parallelogram', label: 'Parallelogram', classification: 'parallelogram', parentIds: ['quadrilateral'] }, { id: 'rectangle', label: 'Rectangle', classification: 'rectangle', parentIds: ['parallelogram'] }, { id: 'rhombus', label: 'Rhombus', classification: 'rhombus', parentIds: ['parallelogram'] }] } },
      },
      {
        id: 'math-u11-l02-c3',
        title: 'Explain Every Valid Classification',
        blocks: [
          { kind: 'text', text: 'Name all groups whose defining attributes the shape satisfies.' },
          { kind: 'example', text: 'A square is a square, rectangle, rhombus, parallelogram, and quadrilateral.' },
          { kind: 'tip', text: 'The reverse is not always true: a parallelogram need not have right angles or four equal sides.' },
        ],
        widget: { type: 'shape-classifier', config: { mode: 'classifications', shapes: [{ id: 'square', label: 'Square', sides: 4, angles: 4, parallelPairs: 2, diagram: 'square', classifications: ['quadrilateral', 'parallelogram', 'rectangle', 'rhombus', 'square'] }], bins: [{ id: 'quadrilateral', label: 'Quadrilateral', classification: 'quadrilateral' }, { id: 'parallelogram', label: 'Parallelogram', classification: 'parallelogram', parentIds: ['quadrilateral'] }, { id: 'rectangle', label: 'Rectangle', classification: 'rectangle', parentIds: ['parallelogram'] }, { id: 'rhombus', label: 'Rhombus', classification: 'rhombus', parentIds: ['parallelogram'] }, { id: 'square', label: 'Square', classification: 'square', parentIds: ['rectangle', 'rhombus'] }] } },
      },
    ],
    workedExample: {
      title: 'Classify a square in the hierarchy',
      steps: [
        'Four sides make it a quadrilateral, and two parallel side pairs make it a parallelogram.',
        'Four right angles also make it a rectangle; four equal sides also make it a rhombus.',
        'Because it has both rectangle and rhombus attributes, it is specifically a square and belongs to all five groups.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u11-l02-q01', type: 'multiple-choice', conceptTag: 'quadrilateral-attributes', reviewCardId: 'math-u11-l02-c1', prompt: 'Which attribute must every quadrilateral have?', choices: [{ id: 'a', text: 'Four sides' }, { id: 'b', text: 'Four equal sides' }, { id: 'c', text: 'Four right angles' }, { id: 'd', text: 'Two pairs of parallel sides' }], correctChoiceId: 'a', explanation: 'A quadrilateral is defined by having four sides.' },
        { id: 'math-u11-l02-q02', type: 'fill-blank', conceptTag: 'quadrilateral-attributes', reviewCardId: 'math-u11-l02-c1', prompt: 'A parallelogram has ___ pairs of parallel sides.', acceptedAnswers: ['2'], explanation: 'Both pairs of opposite sides are parallel.' },
        { id: 'math-u11-l02-q03', type: 'true-false', conceptTag: 'quadrilateral-attributes', reviewCardId: 'math-u11-l02-c1', prompt: 'A rectangle has four right angles.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Four right angles are a defining rectangle attribute.' },
        { id: 'math-u11-l02-q04', type: 'multiple-choice', conceptTag: 'quadrilateral-attributes', reviewCardId: 'math-u11-l02-c1', prompt: 'Which attributes define a rhombus in this hierarchy?', choices: [{ id: 'a', text: 'Four equal sides and two pairs of parallel sides' }, { id: 'b', text: 'Four right angles only' }, { id: 'c', text: 'Exactly one pair of parallel sides' }, { id: 'd', text: 'No parallel sides' }], correctChoiceId: 'a', explanation: 'A rhombus is a parallelogram with all four sides equal.' },
        { id: 'math-u11-l02-q05', type: 'multiple-choice', conceptTag: 'hierarchy-membership', reviewCardId: 'math-u11-l02-c2', prompt: 'Which statement is always true?', choices: [{ id: 'a', text: 'Every rectangle is a parallelogram.' }, { id: 'b', text: 'Every parallelogram is a rectangle.' }, { id: 'c', text: 'Every quadrilateral is a square.' }, { id: 'd', text: 'Every rhombus has four right angles.' }], correctChoiceId: 'a', explanation: 'Rectangles inherit the two parallel side pairs of parallelograms.' },
        { id: 'math-u11-l02-q06', type: 'sort', conceptTag: 'hierarchy-membership', reviewCardId: 'math-u11-l02-c2', prompt: 'Order one valid hierarchy path for a square from most specific to most general.', items: [{ id: 'a', text: 'Square' }, { id: 'b', text: 'Rectangle' }, { id: 'c', text: 'Parallelogram' }, { id: 'd', text: 'Quadrilateral' }], correctOrder: ['a', 'b', 'c', 'd'], explanation: 'A square meets each broader group’s attributes along this path.' },
        { id: 'math-u11-l02-q07', type: 'true-false', conceptTag: 'hierarchy-membership', reviewCardId: 'math-u11-l02-c2', prompt: 'Every rhombus is a quadrilateral.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'A rhombus has four sides, so it belongs to the quadrilateral group.' },
        { id: 'math-u11-l02-q08', type: 'multiple-choice', conceptTag: 'hierarchy-membership', reviewCardId: 'math-u11-l02-c2', prompt: 'A shape has four right angles but its side lengths are not all equal. Which most specific name is guaranteed?', choices: [{ id: 'a', text: 'Rectangle' }, { id: 'b', text: 'Square' }, { id: 'c', text: 'Rhombus' }, { id: 'd', text: 'Trapezoid with exactly one parallel pair' }], correctChoiceId: 'a', explanation: 'Four right angles guarantee a rectangle; unequal sides rule out a square.' },
        { id: 'math-u11-l02-q09', type: 'multiple-choice', conceptTag: 'hierarchy-explanation', reviewCardId: 'math-u11-l02-c3', prompt: 'Which list gives every classification for a square?', choices: [{ id: 'a', text: 'Square, rectangle, rhombus, parallelogram, quadrilateral' }, { id: 'b', text: 'Square only' }, { id: 'c', text: 'Square and rectangle only' }, { id: 'd', text: 'Square, triangle, and quadrilateral' }], correctChoiceId: 'a', explanation: 'A square satisfies all attributes in both rectangle and rhombus branches.' },
        { id: 'math-u11-l02-q10', type: 'fill-blank', conceptTag: 'hierarchy-explanation', reviewCardId: 'math-u11-l02-c3', prompt: 'A four-sided shape with two pairs of parallel sides is at least a ___.', acceptedAnswers: ['parallelogram'], explanation: 'Two pairs of parallel sides place it in the parallelogram group.' },
        { id: 'math-u11-l02-q11', type: 'true-false', conceptTag: 'hierarchy-explanation', reviewCardId: 'math-u11-l02-c3', prompt: 'Every parallelogram is a square.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'A parallelogram may lack four right angles or four equal sides.' },
        { id: 'math-u11-l02-q12', type: 'multiple-choice', conceptTag: 'hierarchy-explanation', reviewCardId: 'math-u11-l02-c3', prompt: 'Why is every square a rectangle?', choices: [{ id: 'a', text: 'A square has four right angles and two pairs of parallel sides.' }, { id: 'b', text: 'A square has exactly one parallel pair.' }, { id: 'c', text: 'A square has three sides.' }, { id: 'd', text: 'A square has no equal sides.' }], correctChoiceId: 'a', explanation: 'Those square attributes satisfy the rectangle definition.' },
        { id: 'math-u11-l02-q13', type: 'multiple-choice', conceptTag: 'hierarchy-explanation', reviewCardId: 'math-u11-l02-c3', prompt: 'A shape is a rhombus but not a square. Which statement must still be true?', choices: [{ id: 'a', text: 'It is a parallelogram and quadrilateral.' }, { id: 'b', text: 'It has four right angles.' }, { id: 'c', text: 'It is a rectangle.' }, { id: 'd', text: 'It has exactly one pair of parallel sides.' }], correctChoiceId: 'a', explanation: 'Every rhombus inherits parallelogram and quadrilateral attributes.' },
      ],
    },
  },
] satisfies Lesson[];
