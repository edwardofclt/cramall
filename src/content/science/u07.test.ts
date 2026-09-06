import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { buildResult, type Answer } from '../../quiz/engine';
import { unit07Lessons } from './u07';

const specs = [
  {
    "id": "science-u07-l01",
    "title": "Find Earth-Feature Patterns on Maps",
    "indicatorCodes": [
      "4-ESS2-2"
    ],
    "cards": [
      {
        "title": "Read a map key and elevation",
        "tag": "map-data-reading",
        "widget": {
          "type": "topographic-map-explorer",
          "config": {
            "contours": [
              {
                "elevation": 100,
                "points": "10,90 50,60 90,90"
              },
              {
                "elevation": 200,
                "points": "25,75 50,45 75,75"
              }
            ],
            "points": [
              {
                "id": "ridge-north",
                "label": "Ridge North",
                "x": 35,
                "y": 40,
                "elevation": 200,
                "group": "ridge-band"
              },
              {
                "id": "ridge-south",
                "label": "Ridge South",
                "x": 35,
                "y": 65,
                "elevation": 200,
                "group": "ridge-band"
              },
              {
                "id": "valley",
                "label": "Valley",
                "x": 70,
                "y": 55,
                "elevation": 100,
                "group": "valley"
              }
            ],
            "targetPattern": "band"
          }
        }
      },
      {
        "title": "Recognize clustered and linear patterns",
        "tag": "earth-feature-patterns",
        "widget": null
      },
      {
        "title": "Describe a pattern from data",
        "tag": "map-pattern-claim",
        "widget": null
      }
    ],
    "routes": [
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "true-false",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "fill-blank",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "true-false",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "true-false",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "fill-blank",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u07-l02",
    "title": "Interpret Earth-Feature Map Data",
    "indicatorCodes": [
      "4-ESS2-2"
    ],
    "cards": [
      {
        "title": "Compare elevations and locations",
        "tag": "map-data-comparison",
        "widget": null
      },
      {
        "title": "Connect several data points",
        "tag": "multi-point-pattern",
        "widget": {
          "type": "topographic-map-explorer",
          "config": {
            "contours": [
              {
                "elevation": 0,
                "points": "5,80 50,70 95,80"
              },
              {
                "elevation": 50,
                "points": "20,60 50,50 80,60"
              }
            ],
            "points": [
            {
              "id": "h1",
              "label": "Hill 1",
              "x": 20,
              "y": 20,
              "elevation": 50,
              "group": "hill-band"
            },
            {
              "id": "h2",
              "label": "Hill 2",
              "x": 50,
              "y": 20,
              "elevation": 50,
              "group": "hill-band"
            },
            {
              "id": "h3",
              "label": "Hill 3",
              "x": 80,
              "y": 20,
              "elevation": 50,
              "group": "hill-band"
            },
            {
              "id": "c1",
              "label": "Coast 1",
              "x": 20,
              "y": 80,
              "elevation": 0,
              "group": "coast-band"
            },
            {
              "id": "c2",
              "label": "Coast 2",
              "x": 50,
              "y": 80,
              "elevation": 0,
              "group": "coast-band"
            },
            {
              "id": "c3",
              "label": "Coast 3",
              "x": 80,
              "y": 80,
              "elevation": 0,
              "group": "coast-band"
            }
          ],
          "targetPattern": "band"
          }
        }
      },
      {
        "title": "Support an interpretation",
        "tag": "map-interpretation-evidence",
        "widget": null
      }
    ],
    "routes": [
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "true-false",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "fill-blank",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "true-false",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "true-false",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "fill-blank",
        "card": 3
      }
    ]
  },

  {
    "id": "science-u07-l03",
    "title": "Test a Weathering or Erosion Variable",
    "indicatorCodes": [
      "4-ESS2-1"
    ],
    "cards": [
      {
        "title": "Choose one process and variable",
        "tag": "single-process-variable",
        "widget": null
      },
      {
        "title": "Plan a fair comparison",
        "tag": "erosion-fair-test",
        "widget": {
          "type": "erosion-simulator",
          "config": {
            "terrain": "soil",
            "agents": [
              "water"
            ],
          "vegetation": false,
          "targetAgent": "water",
          "comparison": {
            "variable": "vegetation",
            "values": [false, true]
          }
          }
        }
      },
      {
        "title": "Use observations as evidence",
        "tag": "erosion-observation-evidence",
        "widget": null
      }
    ],
    "routes": [
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "true-false",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "fill-blank",
        "card": 1
      },
      {
        "type": "sort",
        "card": 2
      },
      {
        "type": "true-false",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "true-false",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "fill-blank",
        "card": 3
      }
    ]
  },

  {
    "id": "science-u07-l04",
    "title": "Use Rock Layers and Fossils as Change Evidence",
    "indicatorCodes": [
      "4-ESS1-1"
    ],
    "cards": [
      {
        "title": "Read relative layer order",
        "tag": "relative-layer-order",
        "widget": null
      },
      {
        "title": "Find patterns in fossils and layers",
        "tag": "rock-fossil-patterns",
        "widget": {
          "type": "rock-layer-explorer",
          "config": {
            "layers": [
              {
                "id": "upper-shells",
                "label": "Upper shell layer",
                "age": 1,
                "artifact": "marine shell fossils"
              },
              {
                "id": "lower-plants",
                "label": "Lower plant layer",
                "age": 2,
                "artifact": "plant fossils without shells"
              }
            ],
            "prompt": "Which layer is relatively older?",
            "targetLayerId": "lower-plants",
            "evidencePrompt": "Which evidence supports this relative-age conclusion?",
            "evidenceChoices": [
              { "id": "fossil-order", "text": "The lower layer has plant fossils without shells below the upper shell layer." },
              { "id": "calendar-years", "text": "Rank 2 means the lower layer is two years old." },
              { "id": "invented-process", "text": "The ranks prove the exact process that formed the rock." }
            ],
            "requiredEvidenceId": "fossil-order"
          }
        }
      },
      {
        "title": "Explain landscape change over time",
        "tag": "landscape-change-explanation",
        "widget": null
      }
    ],
    "routes": [
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "true-false",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "fill-blank",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "true-false",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "sort",
        "card": 3
      },
      {
        "type": "true-false",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "fill-blank",
        "card": 3
      }
    ]
  },

] as const;

function visibleAnswers(question: Question): string[] {
  if ('choices' in question) return question.choices.map(({ text }) => text);
  if ('items' in question) return question.items.map(({ text }) => text);
  return question.acceptedAnswers;
}

function incorrectAnswer(question: Question): Answer {
  if (question.type === 'fill-blank') return '__not_an_accepted_answer__';
  if (question.type === 'sort') return [...question.correctOrder].reverse();
  return question.choices.find(({ id }) => id !== question.correctChoiceId)!.id;
}

const selfContainedPromptFacts = {
  'science-u07-l01-q01': 'Map key: Ridge 200 m; Valley 100 m.',
  'science-u07-l01-q03': 'Map key: Ridge 200 m; Valley 100 m.',
  'science-u07-l01-q04': 'Map key: Ridge 200 m; Valley 100 m.',
  'science-u07-l01-q07': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q08': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q09': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q10': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q11': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q12': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l02-q01': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q03': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q04': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q05': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q06': 'Explorer note: named-point buttons show printed elevations but not plotted locations.',
  'science-u07-l02-q07': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q08': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q09': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q10': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q11': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q12': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l03-q01': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q02': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q03': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q04': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q06': 'The on-screen erosion activity is an authored prediction model; the supplied tray record is the evidence.',
  'science-u07-l03-q07': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q08': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q09': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l03-q10': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l03-q11': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l03-q12': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l03-q13': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l04-q01': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q02': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q03': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q04': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q05': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q06': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q07': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q08': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q10': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q11': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q12': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q13': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
} as const;

test('all 44 source-dependent Unit 7 questions embed their complete standalone facts', () => {
  const questions = unit07Lessons.flatMap((lesson) => lesson.quiz.pool);
  expect(Object.keys(selfContainedPromptFacts)).toHaveLength(44);
  for (const [questionId, fact] of Object.entries(selfContainedPromptFacts)) {
    const question = questions.find(({ id }) => id === questionId);
    expect(question, questionId).toBeDefined();
    expect(question!.prompt, questionId).toContain(fact);
  }
});

test('Unit 7 is the exact reviewed Science wave', () => {
  expect(unit07Lessons).toHaveLength(specs.length);
  for (const [lessonIndex, lesson] of unit07Lessons.entries()) {
    const spec = specs[lessonIndex]!;
    expect({ id: lesson.id, title: lesson.title, indicatorCodes: lesson.indicatorCodes }).toEqual({
      id: spec.id,
      title: spec.title,
      indicatorCodes: spec.indicatorCodes,
    });
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.intro.map(({ speaker, pose }) => ({ speaker, pose }))).toEqual([
      { speaker: 'sandy', pose: 'talk' },
      { speaker: 'sandy', pose: 'think' },
      { speaker: 'sandy', pose: 'talk' },
      { speaker: 'sandy', pose: 'cheer' },
    ]);
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.learnCards.map(({ id }) => id)).toEqual([1, 2, 3].map((number) => `${lesson.id}-c${number}`));
    for (const [cardIndex, card] of lesson.learnCards.entries()) {
      expect(card.title).toBe(spec.cards[cardIndex]!.title);
      expect(card.blocks.map(({ kind }) => kind)).toEqual(['text', 'example', 'tip']);
      expect(card.blocks[2]!.text.startsWith(['Support:', 'Response frame:', 'Stretch:'][cardIndex]!)).toBe(true);
    }
    expect(lesson.workedExample.steps.length).toBeGreaterThanOrEqual(3);
    expect(lesson.quiz.passThreshold).toBe(8);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(lesson.quiz.pool.map(({ id }) => id)).toEqual(Array.from({ length: 13 }, (_, index) => `${lesson.id}-q${String(index + 1).padStart(2, '0')}`));
    expect(lesson.quiz.pool.map((question) => ({ type: question.type, card: Number(question.reviewCardId[question.reviewCardId.length - 1]) }))).toEqual(spec.routes);
    for (const [questionIndex, question] of lesson.quiz.pool.entries()) {
      const cardNumber = spec.routes[questionIndex]!.card;
      expect(question.reviewCardId).toBe(`${lesson.id}-c${cardNumber}`);
      expect(question.conceptTag).toBe(spec.cards[cardNumber - 1]!.tag);
      const normalized = visibleAnswers(question).map(normalizeAnswerText);
      expect(new Set(normalized).size).toBe(normalized.length);
    }
    expect(new Set(lesson.quiz.pool.map(({ conceptTag }) => conceptTag))).toEqual(new Set(spec.cards.map(({ tag }) => tag)));
    const expectedWidgets = spec.cards.flatMap((card, index) => card.widget === null ? [] : [{ card: index + 1, value: card.widget }]);
    expect(lesson.learnCards.flatMap((card, index) => card.widget === undefined ? [] : [{ card: index + 1, value: card.widget }])).toEqual(expectedWidgets);
    for (const widget of expectedWidgets) expect(WidgetRefSchema.safeParse(widget.value).success).toBe(true);
    const keys = lesson.quiz.pool.flatMap((question) => question.type === 'multiple-choice' ? [question.correctChoiceId] : []);
    const counts = ['a', 'b', 'c', 'd'].map((key) => keys.filter((value) => value === key).length);
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  }
  const prose = JSON.stringify(unit07Lessons);
  expect(prose).not.toMatch(/absolute dating|million years old|specific rock formation memorization/i);
  expect(prose).toMatch(/P1 A1.*P6 A6.*V1 C2.*V3 C4/i);
  expect(prose).toMatch(/H1 B1 50 m.*H3 F1 50 m.*C1 B4 0 m.*C3 F4 0 m/i);
  expect(unit07Lessons[0]!.quiz.pool.filter((question) => /A1|A6|C2|C4|column A|rows 1–6/i.test(JSON.stringify(question))).length).toBeGreaterThanOrEqual(4);
  expect(unit07Lessons[1]!.quiz.pool.filter((question) => /B1|D1|F1|B4|D4|F4|row 1|row 4|column pairs/i.test(JSON.stringify(question))).length).toBeGreaterThanOrEqual(4);
});

test('Unit 7 map and erosion widgets connect Sandy coaching to fair comparisons and visible patterns', () => {
  const mapCard = unit07Lessons[1]!.learnCards[1]!;
  const erosionCard = unit07Lessons[2]!.learnCards[1]!;
  expect(mapCard.widgetCoach?.intro).toHaveLength(2);
  expect(mapCard.widgetCoach?.reactions.strategy?.text).toMatch(/elevation.*location|location.*elevation/i);
  expect(mapCard.widgetCoach?.reactions.complete.text).toMatch(/visible map pattern/i);
  expect(erosionCard.widgetCoach?.intro).toHaveLength(2);
  expect(erosionCard.widgetCoach?.reactions.strategy?.text).toMatch(/vegetation.*same|same.*vegetation/i);
  expect(erosionCard.widgetCoach?.reactions.milestone?.text).toMatch(/matched run/i);
  expect(erosionCard.widgetCoach?.reactions.complete.text).toMatch(/matched bare and covered/i);
  const mapConfig = (mapCard.widget as { config: { points: unknown[]; targetPattern?: string } }).config;
  expect(mapConfig.points).toHaveLength(6);
  expect(mapConfig.targetPattern).toBe('band');
  const erosionConfig = (erosionCard.widget as { config: { comparison?: unknown } }).config;
  expect(erosionConfig.comparison).toEqual({ variable: 'vegetation', values: [false, true] });
});

test('opening topographic card uses rich plotted points and in-step Sandy coaching', () => {
  const card = unit07Lessons[0]!.learnCards[0]!;
  expect(card.widgetCoach?.intro).toHaveLength(2);
  expect(card.widgetCoach?.intro.map(({ speaker }) => speaker)).toEqual(['guide', 'kid']);
  expect(card.widgetCoach?.reactions.strategy?.text).toMatch(/elevation|point|contour/i);
  expect(card.widgetCoach?.reactions.retry?.text).toMatch(/pattern|point|elevation/i);
  expect(card.widgetCoach?.reactions.complete.text).toMatch(/pattern|elevation|model/i);
  const config = (card.widget as { config: { points: Array<Record<string, unknown>>; targetPattern?: string; targetPointId?: string } }).config;
  expect(config.targetPattern).toMatch(/^(band|cluster)$/);
  expect(config.targetPointId).toBeUndefined();
  expect(config.points.every((point) => typeof point.x === 'number' && typeof point.y === 'number' && typeof point.group === 'string')).toBe(true);
});

test('rock-layer widget coaches relative rank with fossil evidence and no invented age', () => {
  const card = unit07Lessons[3]!.learnCards[1]!;
  expect(card.widgetCoach?.intro).toHaveLength(2);
  expect(card.widgetCoach?.reactions.strategy?.text).toMatch(/rank.*fossil|fossil.*rank/i);
  expect(card.widgetCoach?.reactions.retry?.text).toMatch(/years|process/i);
  expect(card.widgetCoach?.reactions.complete.text).toMatch(/relative-age.*rank.*fossil|rank.*fossil/i);
  const config = (card.widget as { config: { evidenceChoices?: Array<{ id: string }>; requiredEvidenceId?: string } }).config;
  expect(config.evidenceChoices).toHaveLength(3);
  expect(config.requiredEvidenceId).toBe('fossil-order');
});

test('every card has an immediate exact missed-result review route', () => {
  for (const lesson of unit07Lessons) {
    const expectedTargets = lesson.learnCards.map((card) => ({
      legacyHref: `/lesson/${lesson.id}?card=${card.id}`,
      canonicalStep: `card:${card.id}`,
    }));
    const actualTargets = lesson.learnCards.map((card) => {
      const question = lesson.quiz.pool.find(({ reviewCardId }) => reviewCardId === card.id)!;
      const result = buildResult([question], [incorrectAnswer(question)]);
      expect(result.missed).toEqual([{ conceptTag: question.conceptTag, reviewCardId: card.id, count: 1 }]);
      const legacyHref = `/lesson/${lesson.id}?card=${result.missed[0]!.reviewCardId}`;
      const cardParam = new URLSearchParams(legacyHref.split('?')[1]).get('card');
      return { legacyHref, canonicalStep: `card:${cardParam}` };
    });
    expect(actualTargets).toEqual(expectedTargets);
  }
});
