import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit04Lessons } from './u04';

const expectedManifest = [
  {
    "id": "reading-u04-l01",
    "unitId": "reading-u04",
    "title": "Explain Explicit and Implied Themes",
    "indicatorCodes": [
      "ELA.4.AOR.2.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u04-l01",
    "cards": [
      {
        "id": "reading-u04-l01-c1",
        "title": "State a Theme as a Message",
        "conceptTag": "theme-statement"
      },
      {
        "id": "reading-u04-l01-c2",
        "title": "Gather Key Details",
        "conceptTag": "theme-evidence"
      },
      {
        "id": "reading-u04-l01-c3",
        "title": "Explain How the Theme Develops",
        "conceptTag": "theme-development"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u04-l01",
    "questions": [
      {
        "id": "reading-u04-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "theme-statement",
        "reviewCardId": "reading-u04-l01-c1"
      },
      {
        "id": "reading-u04-l01-q02",
        "type": "true-false",
        "conceptTag": "theme-statement",
        "reviewCardId": "reading-u04-l01-c1"
      },
      {
        "id": "reading-u04-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "theme-statement",
        "reviewCardId": "reading-u04-l01-c1"
      },
      {
        "id": "reading-u04-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "theme-statement",
        "reviewCardId": "reading-u04-l01-c1"
      },
      {
        "id": "reading-u04-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "theme-evidence",
        "reviewCardId": "reading-u04-l01-c2"
      },
      {
        "id": "reading-u04-l01-q06",
        "type": "true-false",
        "conceptTag": "theme-evidence",
        "reviewCardId": "reading-u04-l01-c2"
      },
      {
        "id": "reading-u04-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "theme-evidence",
        "reviewCardId": "reading-u04-l01-c2"
      },
      {
        "id": "reading-u04-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "theme-evidence",
        "reviewCardId": "reading-u04-l01-c2"
      },
      {
        "id": "reading-u04-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      },
      {
        "id": "reading-u04-l01-q10",
        "type": "true-false",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      },
      {
        "id": "reading-u04-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      },
      {
        "id": "reading-u04-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      },
      {
        "id": "reading-u04-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u04-l01",
    "checks": [
      {
        "cardId": "reading-u04-l01-c1",
        "check": {
          "prompt": "Which choice is a theme?",
          "choices": [
            {
              "id": "a",
              "text": "Generosity strengthens a community"
            },
            {
              "id": "b",
              "text": "Mateo plants peppers"
            },
            {
              "id": "c",
              "text": "Gardening"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is a complete transferable message."
        }
      },
      {
        "cardId": "reading-u04-l01-c2",
        "check": {
          "prompt": "Which detail best supports generosity?",
          "choices": [
            {
              "id": "a",
              "text": "Mateo gives Ana part of the extra row"
            },
            {
              "id": "b",
              "text": "Mateo measures rows"
            },
            {
              "id": "c",
              "text": "Rain falls at night"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That action directly shows sharing."
        }
      },
      {
        "cardId": "reading-u04-l01-c3",
        "check": {
          "prompt": "What consequence develops the theme?",
          "choices": [
            {
              "id": "a",
              "text": "The families begin sharing work and vegetables"
            },
            {
              "id": "b",
              "text": "The rows are straight"
            },
            {
              "id": "c",
              "text": "The rain stops"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The community grows more cooperative after Mateo shares."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u04-l01",
    "widgets": [
      {
        "cardId": "reading-u04-l01-c2",
        "ref": {
          "type": "theme-evidence-collector",
          "config": {
            "themeChoices": [
              "Generosity strengthens a community",
              "Gardening takes careful planning"
            ],
            "evidence": [
              {
                "id": "shares",
                "text": "Mateo gives his neighbor part of the extra row.",
                "supports": [
                  "Generosity strengthens a community"
                ],
                "sourceQuote": "carried over a tray of pepper seedlings"
              },
              {
                "id": "replants",
                "text": "They replant the washed-out seedlings together.",
                "supports": [
                  "Generosity strengthens a community"
                ],
                "sourceQuote": "Ana and Mateo rebuilt the row"
              },
              {
                "id": "measures",
                "text": "Mateo measures the garden rows before planting.",
                "supports": [
                  "Gardening takes careful planning"
                ],
                "sourceQuote": "Mateo measured straight garden rows"
              }
            ],
            "requiredEvidenceCount": 2,
            "source": {
              "title": "The Extra Row",
              "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
            }
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u04-l01",
    "passage": {
      "title": "The Extra Row",
      "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
    },
    "reference": {
      "title": "Read “The Extra Row”",
      "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
    },
    "evidence": [
      "extra row",
      "generosity",
      "cooperation"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 4 literal content', () => {
  test('describes the theme as inferred before the final explanatory paragraph states it', () => {
    const question = unit04Lessons[0]!.quiz.pool.find(({ id }) => id === 'reading-u04-l01-q10');
    expect(question?.prompt).toBe('Before the final explanatory paragraph, readers must infer the theme from Mateo’s actions and their consequences.');
    expect('choices' in question! && question.choices[0]!.text).toBe('True — the events imply the message before it is explained');
    expect(question?.explanation).toBe('Mateo never states the message; the final explanatory paragraph names the theme after the narrative events imply it.');
  });

  test('coaches theme evidence with Winnie-sized strategy and retry copy', () => {
    const card = unit04Lessons[0]!.learnCards[1]!;
    expect(card.widgetCoach?.intro).toHaveLength(2);
    expect(card.widgetCoach?.reactions.strategy?.text).toContain('source');
    expect(card.widgetCoach?.reactions.retry?.text).toContain('source quote');
  });

  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit04Lessons, expectedManifest, 'reading');
    expect(unit04Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit04Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit04Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit04Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit04Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit04Lessons) {
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
    for (const lesson of unit04Lessons) {
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
