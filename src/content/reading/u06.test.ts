import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit06Lessons } from './u06';

const expectedManifest = [
  {
    "id": "reading-u06-l01",
    "unitId": "reading-u06",
    "title": "Summarize Literary Texts",
    "indicatorCodes": [
      "ELA.4.AOR.6.1"
    ]
  },
  {
    "id": "reading-u06-l02",
    "unitId": "reading-u06",
    "title": "Summarize Informational Texts",
    "indicatorCodes": [
      "ELA.4.AOR.6.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u06-l01",
    "cards": [
      {
        "id": "reading-u06-l01-c1",
        "title": "Retell the Plot Selectively",
        "conceptTag": "literary-plot-summary"
      },
      {
        "id": "reading-u06-l01-c2",
        "title": "Include Theme and Relevant Details",
        "conceptTag": "literary-theme-details"
      },
      {
        "id": "reading-u06-l01-c3",
        "title": "Write an Objective Literary Summary",
        "conceptTag": "literary-summary"
      }
    ]
  },
  {
    "id": "reading-u06-l02",
    "cards": [
      {
        "id": "reading-u06-l02-c1",
        "title": "State the Central Idea",
        "conceptTag": "informational-central-idea"
      },
      {
        "id": "reading-u06-l02-c2",
        "title": "Select Relevant Supporting Details",
        "conceptTag": "informational-details"
      },
      {
        "id": "reading-u06-l02-c3",
        "title": "Condense in Your Own Words",
        "conceptTag": "informational-summary"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u06-l01",
    "questions": [
      {
        "id": "reading-u06-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "literary-plot-summary",
        "reviewCardId": "reading-u06-l01-c1"
      },
      {
        "id": "reading-u06-l01-q02",
        "type": "true-false",
        "conceptTag": "literary-plot-summary",
        "reviewCardId": "reading-u06-l01-c1"
      },
      {
        "id": "reading-u06-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "literary-plot-summary",
        "reviewCardId": "reading-u06-l01-c1"
      },
      {
        "id": "reading-u06-l01-q04",
        "type": "sort",
        "conceptTag": "literary-plot-summary",
        "reviewCardId": "reading-u06-l01-c1"
      },
      {
        "id": "reading-u06-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "literary-theme-details",
        "reviewCardId": "reading-u06-l01-c2"
      },
      {
        "id": "reading-u06-l01-q06",
        "type": "true-false",
        "conceptTag": "literary-theme-details",
        "reviewCardId": "reading-u06-l01-c2"
      },
      {
        "id": "reading-u06-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "literary-theme-details",
        "reviewCardId": "reading-u06-l01-c2"
      },
      {
        "id": "reading-u06-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "literary-theme-details",
        "reviewCardId": "reading-u06-l01-c2"
      },
      {
        "id": "reading-u06-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      },
      {
        "id": "reading-u06-l01-q10",
        "type": "true-false",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      },
      {
        "id": "reading-u06-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      },
      {
        "id": "reading-u06-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      },
      {
        "id": "reading-u06-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u06-l02",
    "questions": [
      {
        "id": "reading-u06-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "informational-central-idea",
        "reviewCardId": "reading-u06-l02-c1"
      },
      {
        "id": "reading-u06-l02-q02",
        "type": "true-false",
        "conceptTag": "informational-central-idea",
        "reviewCardId": "reading-u06-l02-c1"
      },
      {
        "id": "reading-u06-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "informational-central-idea",
        "reviewCardId": "reading-u06-l02-c1"
      },
      {
        "id": "reading-u06-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "informational-central-idea",
        "reviewCardId": "reading-u06-l02-c1"
      },
      {
        "id": "reading-u06-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "informational-details",
        "reviewCardId": "reading-u06-l02-c2"
      },
      {
        "id": "reading-u06-l02-q06",
        "type": "true-false",
        "conceptTag": "informational-details",
        "reviewCardId": "reading-u06-l02-c2"
      },
      {
        "id": "reading-u06-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "informational-details",
        "reviewCardId": "reading-u06-l02-c2"
      },
      {
        "id": "reading-u06-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "informational-details",
        "reviewCardId": "reading-u06-l02-c2"
      },
      {
        "id": "reading-u06-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      },
      {
        "id": "reading-u06-l02-q10",
        "type": "true-false",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      },
      {
        "id": "reading-u06-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      },
      {
        "id": "reading-u06-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      },
      {
        "id": "reading-u06-l02-q13",
        "type": "fill-blank",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u06-l01",
    "checks": [
      {
        "cardId": "reading-u06-l01-c1",
        "check": {
          "prompt": "Which belongs in the plot summary?",
          "choices": [
            {
              "id": "a",
              "text": "Amina searches for and returns the binoculars"
            },
            {
              "id": "b",
              "text": "The strap is green"
            },
            {
              "id": "c",
              "text": "Friends plan lunch"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It states the central action and resolution."
        }
      },
      {
        "cardId": "reading-u06-l01-c2",
        "check": {
          "prompt": "Which theme is best supported?",
          "choices": [
            {
              "id": "a",
              "text": "Responsibility includes honest care for borrowed things"
            },
            {
              "id": "b",
              "text": "Green is lucky"
            },
            {
              "id": "c",
              "text": "Lunch solves problems"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her search and truthful report support responsibility."
        }
      },
      {
        "cardId": "reading-u06-l01-c3",
        "check": {
          "prompt": "Which sentence is objective?",
          "choices": [
            {
              "id": "a",
              "text": "Amina searches carefully and honestly returns what she borrowed"
            },
            {
              "id": "b",
              "text": "Amina is obviously the coolest character"
            },
            {
              "id": "c",
              "text": "The green strap is beautiful"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It reports supported events without opinion."
        }
      }
    ]
  },
  {
    "id": "reading-u06-l02",
    "checks": [
      {
        "cardId": "reading-u06-l02-c1",
        "check": {
          "prompt": "Which is the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Purple martin houses need good placement and care"
            },
            {
              "id": "b",
              "text": "One house is white"
            },
            {
              "id": "c",
              "text": "Martins fly"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It unifies the full article."
        }
      },
      {
        "cardId": "reading-u06-l02-c2",
        "check": {
          "prompt": "Which detail belongs?",
          "choices": [
            {
              "id": "a",
              "text": "Open space provides a clear flight path"
            },
            {
              "id": "b",
              "text": "One pictured house is white"
            },
            {
              "id": "c",
              "text": "The article has four paragraphs"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It explains suitable placement."
        }
      },
      {
        "cardId": "reading-u06-l02-c3",
        "check": {
          "prompt": "Which sentence is an accurate paraphrase?",
          "choices": [
            {
              "id": "a",
              "text": "Martin houses succeed when placed in open space and cared for seasonally"
            },
            {
              "id": "b",
              "text": "Every bird needs a white city"
            },
            {
              "id": "c",
              "text": "The author loves poles"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It restates the idea without copying."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u06-l01",
    "widgets": [
      {
        "cardId": "reading-u06-l01-c3",
        "ref": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "plot",
                "text": "Amina loses borrowed binoculars, searches carefully, and returns them.",
                "role": "main"
              },
              {
                "id": "theme",
                "text": "Her honest choices show responsibility.",
                "role": "main"
              },
              {
                "id": "detail",
                "text": "She retraces her route beside the marsh.",
                "role": "detail"
              },
              {
                "id": "extra",
                "text": "The binocular strap is green.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "plot",
              "theme"
            ],
            "maxSentences": 3,
            "requiredDetailIds": [
              "detail"
            ],
            "compositionPrompt": "Use your plan to explain the plot and theme in your own words.",
            "minCompositionWords": 8,
            "maxCompositionWords": 28
          }
        }
      }
    ]
  },
  {
    "id": "reading-u06-l02",
    "widgets": [
      {
        "cardId": "reading-u06-l02-c3",
        "ref": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "central",
                "text": "Purple martin houses work best with suitable placement and regular care.",
                "role": "main"
              },
              {
                "id": "space",
                "text": "Open space gives the birds a clear flight path.",
                "role": "detail"
              },
              {
                "id": "care",
                "text": "Seasonal cleaning keeps the house ready.",
                "role": "detail"
              },
              {
                "id": "extra",
                "text": "One house in the article is painted white.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "central"
            ],
            "maxSentences": 3,
            "requiredDetailIds": [
              "space",
              "care"
            ],
            "compositionPrompt": "Use the central idea and both details to explain the article in your own words.",
            "minCompositionWords": 10,
            "maxCompositionWords": 30
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u06-l01",
    "passage": {
      "title": "The Borrowed Binoculars",
      "text": "The Borrowed Binoculars\n\nAmina borrowed her aunt’s binoculars for a marsh walk. At the first overlook, she watched an egret step through shallow water. Later, she reached for the binoculars and found only the green strap’s empty case.\n\nHer friends were ready for lunch, but Amina said she needed to retrace the route. She checked the overlook rail, the map bench, and the sandy path. Near a clump of cordgrass, she spotted the binoculars beside a weathered post. One lens was dusty but not cracked.\n\nAmina wiped the case, told her aunt exactly what had happened, and returned the binoculars. Her aunt thanked her for searching carefully and being honest. Amina decided that borrowing something meant protecting it and reporting problems truthfully.\n\nThe plot moves from loss to a careful search and honest return. A theme of responsibility grows through Amina’s choices. The green strap and lunch plans are minor details; they do not belong in every concise summary."
    },
    "reference": {
      "title": "Read “The Borrowed Binoculars”",
      "text": "The Borrowed Binoculars\n\nAmina borrowed her aunt’s binoculars for a marsh walk. At the first overlook, she watched an egret step through shallow water. Later, she reached for the binoculars and found only the green strap’s empty case.\n\nHer friends were ready for lunch, but Amina said she needed to retrace the route. She checked the overlook rail, the map bench, and the sandy path. Near a clump of cordgrass, she spotted the binoculars beside a weathered post. One lens was dusty but not cracked.\n\nAmina wiped the case, told her aunt exactly what had happened, and returned the binoculars. Her aunt thanked her for searching carefully and being honest. Amina decided that borrowing something meant protecting it and reporting problems truthfully.\n\nThe plot moves from loss to a careful search and honest return. A theme of responsibility grows through Amina’s choices. The green strap and lunch plans are minor details; they do not belong in every concise summary."
    },
    "evidence": [
      "binoculars",
      "responsibility",
      "green strap"
    ]
  },
  {
    "id": "reading-u06-l02",
    "passage": {
      "title": "A City for Purple Martins",
      "text": "A City for Purple Martins\n\nPurple martin houses work best with suitable placement and regular care. These tall birdhouses contain several nesting rooms, so a group of birds may use one structure.\n\nOpen space around the house gives martins a clear flight path. A pole placed away from thick trees can also make it harder for some climbing animals to reach the rooms. People should follow safe installation directions and check the pole from the ground.\n\nCare continues after nesting season. An adult can lower a safely designed house, remove old nesting material, and inspect the rooms. Seasonal cleaning helps prepare the house for future birds. Observers can record arrival dates and room use without disturbing nests.\n\nOne pictured house is painted white, but color is not the article’s main point. Placement, a clear flight path, seasonal cleaning, and careful monitoring work together. A concise summary should state that central idea and select a few supporting details rather than copy every sentence."
    },
    "reference": {
      "title": "Read “A City for Purple Martins”",
      "text": "A City for Purple Martins\n\nPurple martin houses work best with suitable placement and regular care. These tall birdhouses contain several nesting rooms, so a group of birds may use one structure.\n\nOpen space around the house gives martins a clear flight path. A pole placed away from thick trees can also make it harder for some climbing animals to reach the rooms. People should follow safe installation directions and check the pole from the ground.\n\nCare continues after nesting season. An adult can lower a safely designed house, remove old nesting material, and inspect the rooms. Seasonal cleaning helps prepare the house for future birds. Observers can record arrival dates and room use without disturbing nests.\n\nOne pictured house is painted white, but color is not the article’s main point. Placement, a clear flight path, seasonal cleaning, and careful monitoring work together. A concise summary should state that central idea and select a few supporting details rather than copy every sentence."
    },
    "evidence": [
      "clear flight path",
      "seasonal cleaning",
      "painted white"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 6 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit06Lessons, expectedManifest, 'reading');
    expect(unit06Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit06Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit06Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit06Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit06Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit06Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('coaches summary planning before composition with Winnie-sized reactions', () => {
    for (const lesson of unit06Lessons) {
      const card = lesson.learnCards.find((candidate) => 'widget' in candidate && candidate.widget?.type === 'summary-builder');
      expect(card && 'widgetCoach' in card ? card.widgetCoach : undefined).toEqual(expect.objectContaining({
        intro: expect.arrayContaining([
          expect.objectContaining({speaker: 'guide'}),
          expect.objectContaining({speaker: 'kid'}),
        ]),
        reactions: expect.objectContaining({
          strategy: expect.any(Object),
          retry: expect.any(Object),
          milestone: expect.any(Object),
          complete: expect.any(Object),
        }),
      }));
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit06Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });
});
