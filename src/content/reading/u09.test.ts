import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit09Lessons } from './u09';

const expectedManifest = [
  {
    "id": "reading-u09-l01",
    "unitId": "reading-u09",
    "title": "Compare First- and Third-Person Narration",
    "indicatorCodes": [
      "ELA.4.AOR.3.1"
    ]
  },
  {
    "id": "reading-u09-l02",
    "unitId": "reading-u09",
    "title": "Explain How Character Perspectives Shape a Story",
    "indicatorCodes": [
      "ELA.4.AOR.3.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u09-l01",
    "cards": [
      {
        "id": "reading-u09-l01-c1",
        "title": "Recognize First-Person Narration",
        "conceptTag": "first-person"
      },
      {
        "id": "reading-u09-l01-c2",
        "title": "Recognize Third-Person Narration",
        "conceptTag": "third-person"
      },
      {
        "id": "reading-u09-l01-c3",
        "title": "Compare What Narrators Reveal",
        "conceptTag": "pov-comparison"
      }
    ]
  },
  {
    "id": "reading-u09-l02",
    "cards": [
      {
        "id": "reading-u09-l02-c1",
        "title": "Identify Character Perspectives",
        "conceptTag": "character-perspective"
      },
      {
        "id": "reading-u09-l02-c2",
        "title": "Compare Reactions to One Event",
        "conceptTag": "perspective-contrast"
      },
      {
        "id": "reading-u09-l02-c3",
        "title": "Explain the Impact on the Text",
        "conceptTag": "perspective-impact"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u09-l01",
    "questions": [
      {
        "id": "reading-u09-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "first-person",
        "reviewCardId": "reading-u09-l01-c1"
      },
      {
        "id": "reading-u09-l01-q02",
        "type": "true-false",
        "conceptTag": "first-person",
        "reviewCardId": "reading-u09-l01-c1"
      },
      {
        "id": "reading-u09-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "first-person",
        "reviewCardId": "reading-u09-l01-c1"
      },
      {
        "id": "reading-u09-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "first-person",
        "reviewCardId": "reading-u09-l01-c1"
      },
      {
        "id": "reading-u09-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "third-person",
        "reviewCardId": "reading-u09-l01-c2"
      },
      {
        "id": "reading-u09-l01-q06",
        "type": "true-false",
        "conceptTag": "third-person",
        "reviewCardId": "reading-u09-l01-c2"
      },
      {
        "id": "reading-u09-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "third-person",
        "reviewCardId": "reading-u09-l01-c2"
      },
      {
        "id": "reading-u09-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "third-person",
        "reviewCardId": "reading-u09-l01-c2"
      },
      {
        "id": "reading-u09-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      },
      {
        "id": "reading-u09-l01-q10",
        "type": "true-false",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      },
      {
        "id": "reading-u09-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      },
      {
        "id": "reading-u09-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      },
      {
        "id": "reading-u09-l01-q13",
        "type": "fill-blank",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u09-l02",
    "questions": [
      {
        "id": "reading-u09-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "character-perspective",
        "reviewCardId": "reading-u09-l02-c1"
      },
      {
        "id": "reading-u09-l02-q02",
        "type": "true-false",
        "conceptTag": "character-perspective",
        "reviewCardId": "reading-u09-l02-c1"
      },
      {
        "id": "reading-u09-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "character-perspective",
        "reviewCardId": "reading-u09-l02-c1"
      },
      {
        "id": "reading-u09-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "character-perspective",
        "reviewCardId": "reading-u09-l02-c1"
      },
      {
        "id": "reading-u09-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "perspective-contrast",
        "reviewCardId": "reading-u09-l02-c2"
      },
      {
        "id": "reading-u09-l02-q06",
        "type": "true-false",
        "conceptTag": "perspective-contrast",
        "reviewCardId": "reading-u09-l02-c2"
      },
      {
        "id": "reading-u09-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "perspective-contrast",
        "reviewCardId": "reading-u09-l02-c2"
      },
      {
        "id": "reading-u09-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "perspective-contrast",
        "reviewCardId": "reading-u09-l02-c2"
      },
      {
        "id": "reading-u09-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      },
      {
        "id": "reading-u09-l02-q10",
        "type": "true-false",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      },
      {
        "id": "reading-u09-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      },
      {
        "id": "reading-u09-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      },
      {
        "id": "reading-u09-l02-q13",
        "type": "multiple-choice",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u09-l01",
    "checks": [
      {
        "cardId": "reading-u09-l01-c1",
        "check": {
          "prompt": "Which pronoun signals first person?",
          "choices": [
            {
              "id": "a",
              "text": "I"
            },
            {
              "id": "b",
              "text": "she"
            },
            {
              "id": "c",
              "text": "Lila"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The narrator refers to herself as I."
        }
      },
      {
        "cardId": "reading-u09-l01-c2",
        "check": {
          "prompt": "Which phrase is third person?",
          "choices": [
            {
              "id": "a",
              "text": "she noticed"
            },
            {
              "id": "b",
              "text": "I wondered"
            },
            {
              "id": "c",
              "text": "my marker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "She refers to a character from outside."
        }
      },
      {
        "cardId": "reading-u09-l01-c3",
        "check": {
          "prompt": "How should “Lila carried Lila’s marker” begin in first person?",
          "choices": [
            {
              "id": "a",
              "text": "I carried my marker"
            },
            {
              "id": "b",
              "text": "She carried her marker"
            },
            {
              "id": "c",
              "text": "Lila carried my marker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "I/my correctly shifts the narrator."
        }
      }
    ]
  },
  {
    "id": "reading-u09-l02",
    "checks": [
      {
        "cardId": "reading-u09-l02-c1",
        "check": {
          "prompt": "How does Jalen view the gym move?",
          "choices": [
            {
              "id": "a",
              "text": "as a disappointing loss of his practiced event"
            },
            {
              "id": "b",
              "text": "as perfect weather"
            },
            {
              "id": "c",
              "text": "as proof Mei is angry"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "His groan and thoughts directly support that view."
        }
      },
      {
        "cardId": "reading-u09-l02-c2",
        "check": {
          "prompt": "Why does Mei react positively?",
          "choices": [
            {
              "id": "a",
              "text": "She values safety and new indoor events"
            },
            {
              "id": "b",
              "text": "She wants no field day"
            },
            {
              "id": "c",
              "text": "She practiced long jump"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her words show those priorities."
        }
      },
      {
        "cardId": "reading-u09-l02-c3",
        "check": {
          "prompt": "What resolves the perspective conflict?",
          "choices": [
            {
              "id": "a",
              "text": "They restate each other’s views and combine ideas"
            },
            {
              "id": "b",
              "text": "The rain instantly stops"
            },
            {
              "id": "c",
              "text": "The principal restores long jump"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Accurate understanding changes their actions."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u09-l01",
    "widgets": [
      {
        "cardId": "reading-u09-l01-c1",
        "ref": {
          "type": "pov-switcher",
          "config": {
            "passage": "I carried my painted marker toward the trail.",
            "from": "first",
            "target": "third",
            "pronounOptions": [
              "Lila",
              "Lila's",
              "I",
              "my",
              "she"
            ],
            "requiredPronouns": [
              "Lila",
              "Lila's"
            ]
          }
        }
      },
      {
        "cardId": "reading-u09-l01-c2",
        "ref": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "First-person narration",
              "Third-person narration"
            ],
            "details": [
              {
                "id": "brush-i",
                "text": "\"I brushed it clean and wondered whether it belonged to the trail's original route.\"",
                "supports": [
                  "First-person narration"
                ]
              },
              {
                "id": "proud-i",
                "text": "\"I felt proud when I recognized the faded owl symbol.\"",
                "supports": [
                  "First-person narration"
                ]
              },
              {
                "id": "brush-she",
                "text": "\"She brushed it clean and remembered the faded owl symbol from a library map.\"",
                "supports": [
                  "Third-person narration"
                ]
              },
              {
                "id": "carlos",
                "text": "\"Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet.\"",
                "supports": [
                  "Third-person narration"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        }
      },
      {
        "cardId": "reading-u09-l01-c3",
        "ref": {
          "type": "pov-switcher",
          "config": {
            "passage": "Lila carried Lila’s marker to the trail.",
            "from": "third",
            "target": "first",
            "pronounOptions": [
              "I",
              "my",
              "she"
            ],
            "requiredPronouns": [
              "I",
              "my"
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u09-l02",
    "widgets": [
      {
        "cardId": "reading-u09-l02-c1",
        "ref": {
          "type": "theme-evidence-collector",
          "config": {
            "themeChoices": [
              "Jalen sees the gym move as losing his practiced event",
              "Mei sees the gym move as safer and full of new options"
            ],
            "evidence": [
              {
                "id": "groan",
                "text": "Jalen groaned when the principal moved every event into the gym.",
                "supports": [
                  "Jalen sees the gym move as losing his practiced event"
                ]
              },
              {
                "id": "jump",
                "text": "He had practiced the long jump for weeks.",
                "supports": [
                  "Jalen sees the gym move as losing his practiced event"
                ]
              },
              {
                "id": "grin",
                "text": "Mei grinned at the news.",
                "supports": [
                  "Mei sees the gym move as safer and full of new options"
                ]
              },
              {
                "id": "wet",
                "text": "She disliked running on wet grass.",
                "supports": [
                  "Mei sees the gym move as safer and full of new options"
                ]
              }
            ],
            "requiredEvidenceCount": 2
          }
        }
      },
      {
        "cardId": "reading-u09-l02-c3",
        "ref": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "misread",
                "text": "Jalen hears Mei's excitement as proof that she does not care about the canceled jump.",
                "role": "main"
              },
              {
                "id": "tension",
                "text": "That misreading makes his reply sharp and creates tension.",
                "role": "main"
              },
              {
                "id": "restate",
                "text": "Once each of them accurately restates the other's view, the conflict softens.",
                "role": "main"
              },
              {
                "id": "plan",
                "text": "Their combined ideas produce a standing-jump challenge and a cone relay.",
                "role": "detail"
              },
              {
                "id": "rain",
                "text": "The rain stopped by lunchtime.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "misread",
              "tension",
              "restate"
            ],
            "maxSentences": 4
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u09-l01",
    "passage": {
      "title": "The Hidden Trail Marker",
      "text": "The Hidden Trail Marker — first-person version\n\nI carried my painted marker toward the school nature trail. Near the first bend, I noticed an older marker half buried under pine needles. I brushed it clean and wondered whether it belonged to the trail’s original route. I felt proud when I recognized the faded owl symbol from a map in the library. I hurried back to tell Ms. Reed, still wondering whether another marker waited farther ahead.\n\nThe Hidden Trail Marker — third-person omniscient version\n\nLila carried Lila’s painted marker toward the school nature trail. Near the first bend, she noticed an older marker half buried under pine needles. She brushed it clean and remembered the faded owl symbol from a library map. Lila felt proud and hurried back to tell Ms. Reed. Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet."
    },
    "reference": {
      "title": "Read “The Hidden Trail Marker”",
      "text": "The Hidden Trail Marker — first-person version\n\nI carried my painted marker toward the school nature trail. Near the first bend, I noticed an older marker half buried under pine needles. I brushed it clean and wondered whether it belonged to the trail’s original route. I felt proud when I recognized the faded owl symbol from a map in the library. I hurried back to tell Ms. Reed, still wondering whether another marker waited farther ahead.\n\nThe Hidden Trail Marker — third-person omniscient version\n\nLila carried Lila’s painted marker toward the school nature trail. Near the first bend, she noticed an older marker half buried under pine needles. She brushed it clean and remembered the faded owl symbol from a library map. Lila felt proud and hurried back to tell Ms. Reed. Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet."
    },
    "evidence": [
      "I carried my",
      "Lila carried Lila’s",
      "Carlos found"
    ]
  },
  {
    "id": "reading-u09-l02",
    "passage": {
      "title": "Rain on Field Day",
      "text": "Rain on Field Day\n\nRain drummed against the classroom windows on field-day morning. Jalen groaned when the principal moved every event into the gym. He had practiced the long jump for weeks and thought an indoor field day would feel cramped and disappointing.\n\nMei grinned. She disliked running on wet grass and imagined relay games winding safely around cones. “We can invent events that fit the space,” she said. Jalen heard her excitement as proof that she did not care about the canceled jump, and his reply sounded sharp.\n\nDuring setup, Mei noticed his silence. She explained that she was relieved about safety but understood why he missed his event. Jalen admitted that he had treated her relief as an insult. Together they designed a standing-jump challenge and a careful cone relay.\n\nTheir contrasting perspectives first create tension and a disappointed mood. Once each character accurately restates the other’s view, the conflict softens. Their combined ideas reshape the events and produce a cooperative resolution."
    },
    "reference": {
      "title": "Read “Rain on Field Day”",
      "text": "Rain on Field Day\n\nRain drummed against the classroom windows on field-day morning. Jalen groaned when the principal moved every event into the gym. He had practiced the long jump for weeks and thought an indoor field day would feel cramped and disappointing.\n\nMei grinned. She disliked running on wet grass and imagined relay games winding safely around cones. “We can invent events that fit the space,” she said. Jalen heard her excitement as proof that she did not care about the canceled jump, and his reply sounded sharp.\n\nDuring setup, Mei noticed his silence. She explained that she was relieved about safety but understood why he missed his event. Jalen admitted that he had treated her relief as an insult. Together they designed a standing-jump challenge and a careful cone relay.\n\nTheir contrasting perspectives first create tension and a disappointed mood. Once each character accurately restates the other’s view, the conflict softens. Their combined ideas reshape the events and produce a cooperative resolution."
    },
    "evidence": [
      "Jalen groaned",
      "Mei grinned",
      "accurately restates"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 9 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit09Lessons, expectedManifest, 'reading');
    expect(unit09Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit09Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit09Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit09Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit09Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit09Lessons) {
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

  test('shows Mei’s reason before its inline check', () => {
    const perspectiveLesson = unit09Lessons.find(({ id }) => id === 'reading-u09-l02')!;
    const contrastCard = perspectiveLesson.learnCards.find(({ id }) => id === 'reading-u09-l02-c2')!;
    expect(contrastCard.blocks[1]).toEqual({
      kind: 'example',
      text: 'Jalen groans; Mei grins because Mei values safety and new indoor events.',
    });
  });

  test('uses a grammatical q11 prompt', () => {
    const perspectiveLesson = unit09Lessons.find(({ id }) => id === 'reading-u09-l02')!;
    expect(perspectiveLesson.quiz.pool.find(({ id }) => id === 'reading-u09-l02-q11')!.prompt)
      .toBe('How does the story deepen readers’ understanding?');
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit09Lessons) {
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
