import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit08Lessons } from './u08';

const expectedManifest = [
  {
    "id": "reading-u08-l01",
    "unitId": "reading-u08",
    "title": "Connect Author's Purpose and Perspective",
    "indicatorCodes": [
      "ELA.4.AOR.4.1"
    ]
  },
  {
    "id": "reading-u08-l02",
    "unitId": "reading-u08",
    "title": "Explain Claims, Reasons, and Evidence",
    "indicatorCodes": [
      "ELA.4.AOR.5.3"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u08-l01",
    "cards": [
      {
        "id": "reading-u08-l01-c1",
        "title": "Identify the Author's Purpose",
        "conceptTag": "author-purpose"
      },
      {
        "id": "reading-u08-l01-c2",
        "title": "Infer the Author's Perspective",
        "conceptTag": "author-perspective"
      },
      {
        "id": "reading-u08-l01-c3",
        "title": "Explain How Perspective Conveys Purpose",
        "conceptTag": "purpose-perspective"
      }
    ]
  },
  {
    "id": "reading-u08-l02",
    "cards": [
      {
        "id": "reading-u08-l02-c1",
        "title": "Locate the Claim",
        "conceptTag": "claim"
      },
      {
        "id": "reading-u08-l02-c2",
        "title": "Evaluate the Reasons",
        "conceptTag": "reasons"
      },
      {
        "id": "reading-u08-l02-c3",
        "title": "Connect Evidence to the Claim",
        "conceptTag": "claim-evidence"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u08-l01",
    "questions": [
      {
        "id": "reading-u08-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "author-purpose",
        "reviewCardId": "reading-u08-l01-c1"
      },
      {
        "id": "reading-u08-l01-q02",
        "type": "true-false",
        "conceptTag": "author-purpose",
        "reviewCardId": "reading-u08-l01-c1"
      },
      {
        "id": "reading-u08-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "author-purpose",
        "reviewCardId": "reading-u08-l01-c1"
      },
      {
        "id": "reading-u08-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "author-purpose",
        "reviewCardId": "reading-u08-l01-c1"
      },
      {
        "id": "reading-u08-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "author-perspective",
        "reviewCardId": "reading-u08-l01-c2"
      },
      {
        "id": "reading-u08-l01-q06",
        "type": "true-false",
        "conceptTag": "author-perspective",
        "reviewCardId": "reading-u08-l01-c2"
      },
      {
        "id": "reading-u08-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "author-perspective",
        "reviewCardId": "reading-u08-l01-c2"
      },
      {
        "id": "reading-u08-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "author-perspective",
        "reviewCardId": "reading-u08-l01-c2"
      },
      {
        "id": "reading-u08-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      },
      {
        "id": "reading-u08-l01-q10",
        "type": "true-false",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      },
      {
        "id": "reading-u08-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      },
      {
        "id": "reading-u08-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      },
      {
        "id": "reading-u08-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u08-l02",
    "questions": [
      {
        "id": "reading-u08-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "claim",
        "reviewCardId": "reading-u08-l02-c1"
      },
      {
        "id": "reading-u08-l02-q02",
        "type": "true-false",
        "conceptTag": "claim",
        "reviewCardId": "reading-u08-l02-c1"
      },
      {
        "id": "reading-u08-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "claim",
        "reviewCardId": "reading-u08-l02-c1"
      },
      {
        "id": "reading-u08-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "claim",
        "reviewCardId": "reading-u08-l02-c1"
      },
      {
        "id": "reading-u08-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "reasons",
        "reviewCardId": "reading-u08-l02-c2"
      },
      {
        "id": "reading-u08-l02-q06",
        "type": "true-false",
        "conceptTag": "reasons",
        "reviewCardId": "reading-u08-l02-c2"
      },
      {
        "id": "reading-u08-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "reasons",
        "reviewCardId": "reading-u08-l02-c2"
      },
      {
        "id": "reading-u08-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "reasons",
        "reviewCardId": "reading-u08-l02-c2"
      },
      {
        "id": "reading-u08-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      },
      {
        "id": "reading-u08-l02-q10",
        "type": "true-false",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      },
      {
        "id": "reading-u08-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      },
      {
        "id": "reading-u08-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      },
      {
        "id": "reading-u08-l02-q13",
        "type": "multiple-choice",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u08-l01",
    "checks": [
      {
        "cardId": "reading-u08-l01-c1",
        "check": {
          "prompt": "What is Text A mainly trying to do?",
          "choices": [
            {
              "id": "a",
              "text": "persuade the committee to study planting shade trees"
            },
            {
              "id": "b",
              "text": "explain every tree species"
            },
            {
              "id": "c",
              "text": "entertain with a fantasy"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The writer states a belief and makes a request."
        }
      },
      {
        "cardId": "reading-u08-l01-c2",
        "check": {
          "prompt": "Which phrase most clearly reveals support?",
          "choices": [
            {
              "id": "a",
              "text": "I believe our school should plant"
            },
            {
              "id": "b",
              "text": "A canopy is a layer"
            },
            {
              "id": "c",
              "text": "Cooling varies"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It directly states the writer’s position."
        }
      },
      {
        "cardId": "reading-u08-l01-c3",
        "check": {
          "prompt": "How does “Please ask” serve Text A?",
          "choices": [
            {
              "id": "a",
              "text": "It turns support into a direct advocacy request"
            },
            {
              "id": "b",
              "text": "It defines canopy"
            },
            {
              "id": "c",
              "text": "It proves all sites cool equally"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The phrase asks the audience to act."
        }
      }
    ]
  },
  {
    "id": "reading-u08-l02",
    "checks": [
      {
        "cardId": "reading-u08-l02-c1",
        "check": {
          "prompt": "Which sentence is the claim?",
          "choices": [
            {
              "id": "a",
              "text": "The school should keep the refill station"
            },
            {
              "id": "b",
              "text": "The log counted 1,240 refills"
            },
            {
              "id": "c",
              "text": "A bottle has a sticker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is the position the argument supports."
        }
      },
      {
        "cardId": "reading-u08-l02-c2",
        "check": {
          "prompt": "Which is a relevant reason?",
          "choices": [
            {
              "id": "a",
              "text": "Students can refill after activity"
            },
            {
              "id": "b",
              "text": "The station is beside a wall"
            },
            {
              "id": "c",
              "text": "A sticker shows a dolphin"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Convenient access directly supports keeping it."
        }
      },
      {
        "cardId": "reading-u08-l02-c3",
        "check": {
          "prompt": "What does 1,240 refills support?",
          "choices": [
            {
              "id": "a",
              "text": "The station is frequently used"
            },
            {
              "id": "b",
              "text": "Every refill replaces plastic"
            },
            {
              "id": "c",
              "text": "Filters never need changing"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The log directly measures use."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u08-l01",
    "widgets": []
  },
  {
    "id": "reading-u08-l02",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u08-l01",
    "passage": {
      "title": "A Shadier Schoolyard / How Tree Canopies Cool Pavement",
      "text": "Paired Text A — A Shadier Schoolyard\n\nI believe our school should plant two shade trees beside the blacktop. At midday, the pavement feels hot, and students crowd beneath the one small awning. Trees would create another shaded place for reading and recess. Their roots would need protected planting beds, and adults would choose species suited to the site. Planting takes planning, but a cooler gathering space would serve students for years. Please ask the school committee to study safe locations this fall.\n\nPaired Text B — How Tree Canopies Cool Pavement\n\nA tree canopy is the layer formed by branches and leaves. A canopy blocks some sunlight before it reaches pavement. Leaves also release water vapor, a process that can cool nearby air. The amount of cooling varies with tree size, weather, placement, and time of day. Schools considering trees must also plan for roots, water, and long-term care. These facts explain why tree shade can change conditions around paved areas without promising the same result in every location."
    },
    "reference": {
      "title": "Read “A Shadier Schoolyard / How Tree Canopies Cool Pavement”",
      "text": "Paired Text A — A Shadier Schoolyard\n\nI believe our school should plant two shade trees beside the blacktop. At midday, the pavement feels hot, and students crowd beneath the one small awning. Trees would create another shaded place for reading and recess. Their roots would need protected planting beds, and adults would choose species suited to the site. Planting takes planning, but a cooler gathering space would serve students for years. Please ask the school committee to study safe locations this fall.\n\nPaired Text B — How Tree Canopies Cool Pavement\n\nA tree canopy is the layer formed by branches and leaves. A canopy blocks some sunlight before it reaches pavement. Leaves also release water vapor, a process that can cool nearby air. The amount of cooling varies with tree size, weather, placement, and time of day. Schools considering trees must also plan for roots, water, and long-term care. These facts explain why tree shade can change conditions around paved areas without promising the same result in every location."
    },
    "evidence": [
      "I believe",
      "tree canopy",
      "Please ask"
    ]
  },
  {
    "id": "reading-u08-l02",
    "passage": {
      "title": "Keep the Refill Station",
      "text": "Keep the Refill Station\n\nOur school should keep the water-bottle refill station beside the gym. First, it gives students a convenient place to refill reusable bottles after physical education and recess. A facilities log recorded 1,240 refills during the first eight weeks of school. That count shows frequent use.\n\nSecond, refilling a bottle can reduce the number of single-use bottles placed in trash bins. In a one-day cafeteria check, the green team counted 37 fewer disposable water bottles than on the same event day before the station opened. One student’s bottle has a dolphin sticker; that detail is true but does not support the claim.\n\nThe station needs filter changes and cleaning, so keeping it requires a maintenance plan. The usage log and waste count do not prove every refill replaces a disposable bottle, but they provide relevant evidence for convenience and reduced waste. For those reasons, the school should keep and maintain the station."
    },
    "reference": {
      "title": "Read “Keep the Refill Station”",
      "text": "Keep the Refill Station\n\nOur school should keep the water-bottle refill station beside the gym. First, it gives students a convenient place to refill reusable bottles after physical education and recess. A facilities log recorded 1,240 refills during the first eight weeks of school. That count shows frequent use.\n\nSecond, refilling a bottle can reduce the number of single-use bottles placed in trash bins. In a one-day cafeteria check, the green team counted 37 fewer disposable water bottles than on the same event day before the station opened. One student’s bottle has a dolphin sticker; that detail is true but does not support the claim.\n\nThe station needs filter changes and cleaning, so keeping it requires a maintenance plan. The usage log and waste count do not prove every refill replaces a disposable bottle, but they provide relevant evidence for convenience and reduced waste. For those reasons, the school should keep and maintain the station."
    },
    "evidence": [
      "1,240 refills",
      "37 fewer",
      "dolphin sticker"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 8 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit08Lessons, expectedManifest, 'reading');
    expect(unit08Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit08Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit08Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit08Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit08Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit08Lessons) {
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

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit08Lessons) {
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
