import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit07Lessons } from './u07';

const expectedManifest = [
  {
    "id": "reading-u07-l01",
    "unitId": "reading-u07",
    "title": "Use Text Features and Informational Structures",
    "indicatorCodes": [
      "ELA.4.AOR.5.2"
    ]
  },
  {
    "id": "reading-u07-l02",
    "unitId": "reading-u07",
    "title": "Explain How Visuals and Multimedia Add Meaning",
    "indicatorCodes": [
      "ELA.4.AOR.10.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u07-l01",
    "cards": [
      {
        "id": "reading-u07-l01-c1",
        "title": "Navigate with Text Features",
        "conceptTag": "text-features"
      },
      {
        "id": "reading-u07-l01-c2",
        "title": "Recognize Three Text Structures",
        "conceptTag": "structure-types"
      },
      {
        "id": "reading-u07-l01-c3",
        "title": "Explain How Organization Builds Meaning",
        "conceptTag": "structure-meaning"
      }
    ]
  },
  {
    "id": "reading-u07-l02",
    "cards": [
      {
        "id": "reading-u07-l02-c1",
        "title": "Read Visuals as Evidence",
        "conceptTag": "visual-information"
      },
      {
        "id": "reading-u07-l02-c2",
        "title": "Connect Visuals and Words",
        "conceptTag": "visual-text-connection"
      },
      {
        "id": "reading-u07-l02-c3",
        "title": "Explain a Multimedia Contribution",
        "conceptTag": "multimedia-contribution"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u07-l01",
    "questions": [
      {
        "id": "reading-u07-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "text-features",
        "reviewCardId": "reading-u07-l01-c1"
      },
      {
        "id": "reading-u07-l01-q02",
        "type": "true-false",
        "conceptTag": "text-features",
        "reviewCardId": "reading-u07-l01-c1"
      },
      {
        "id": "reading-u07-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "text-features",
        "reviewCardId": "reading-u07-l01-c1"
      },
      {
        "id": "reading-u07-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "text-features",
        "reviewCardId": "reading-u07-l01-c1"
      },
      {
        "id": "reading-u07-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "structure-types",
        "reviewCardId": "reading-u07-l01-c2"
      },
      {
        "id": "reading-u07-l01-q06",
        "type": "true-false",
        "conceptTag": "structure-types",
        "reviewCardId": "reading-u07-l01-c2"
      },
      {
        "id": "reading-u07-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "structure-types",
        "reviewCardId": "reading-u07-l01-c2"
      },
      {
        "id": "reading-u07-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "structure-types",
        "reviewCardId": "reading-u07-l01-c2"
      },
      {
        "id": "reading-u07-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      },
      {
        "id": "reading-u07-l01-q10",
        "type": "true-false",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      },
      {
        "id": "reading-u07-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      },
      {
        "id": "reading-u07-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      },
      {
        "id": "reading-u07-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u07-l02",
    "questions": [
      {
        "id": "reading-u07-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "visual-information",
        "reviewCardId": "reading-u07-l02-c1"
      },
      {
        "id": "reading-u07-l02-q02",
        "type": "true-false",
        "conceptTag": "visual-information",
        "reviewCardId": "reading-u07-l02-c1"
      },
      {
        "id": "reading-u07-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "visual-information",
        "reviewCardId": "reading-u07-l02-c1"
      },
      {
        "id": "reading-u07-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "visual-information",
        "reviewCardId": "reading-u07-l02-c1"
      },
      {
        "id": "reading-u07-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "visual-text-connection",
        "reviewCardId": "reading-u07-l02-c2"
      },
      {
        "id": "reading-u07-l02-q06",
        "type": "true-false",
        "conceptTag": "visual-text-connection",
        "reviewCardId": "reading-u07-l02-c2"
      },
      {
        "id": "reading-u07-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "visual-text-connection",
        "reviewCardId": "reading-u07-l02-c2"
      },
      {
        "id": "reading-u07-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "visual-text-connection",
        "reviewCardId": "reading-u07-l02-c2"
      },
      {
        "id": "reading-u07-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      },
      {
        "id": "reading-u07-l02-q10",
        "type": "true-false",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      },
      {
        "id": "reading-u07-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      },
      {
        "id": "reading-u07-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      },
      {
        "id": "reading-u07-l02-q13",
        "type": "multiple-choice",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u07-l01",
    "checks": [
      {
        "cardId": "reading-u07-l01-c1",
        "check": {
          "prompt": "What does the caption contribute?",
          "choices": [
            {
              "id": "a",
              "text": "It explains repair marks and detour arrows"
            },
            {
              "id": "b",
              "text": "It defines composite"
            },
            {
              "id": "c",
              "text": "It orders all repair steps"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That is the caption’s visible information."
        }
      },
      {
        "cardId": "reading-u07-l01-c2",
        "check": {
          "prompt": "Which structure uses First, Next, Then?",
          "choices": [
            {
              "id": "a",
              "text": "sequence"
            },
            {
              "id": "b",
              "text": "compare-contrast"
            },
            {
              "id": "c",
              "text": "problem-solution"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Those words order steps."
        }
      },
      {
        "cardId": "reading-u07-l01-c3",
        "check": {
          "prompt": "How does compare-contrast help?",
          "choices": [
            {
              "id": "a",
              "text": "It shows tradeoffs between two materials"
            },
            {
              "id": "b",
              "text": "It hides differences"
            },
            {
              "id": "c",
              "text": "It gives repair order"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The section compares cost, appearance, and durability."
        }
      }
    ]
  },
  {
    "id": "reading-u07-l02",
    "checks": [
      {
        "cardId": "reading-u07-l02-c1",
        "check": {
          "prompt": "Which station has 1.5 inches at 4 p.m.?",
          "choices": [
            {
              "id": "a",
              "text": "West"
            },
            {
              "id": "b",
              "text": "Central"
            },
            {
              "id": "c",
              "text": "East"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible table description lists West at 1.5 inches."
        }
      },
      {
        "cardId": "reading-u07-l02-c2",
        "check": {
          "prompt": "How does the table support the forecast?",
          "choices": [
            {
              "id": "a",
              "text": "Western rain begins earlier and totals more at each time"
            },
            {
              "id": "b",
              "text": "All stations are equal"
            },
            {
              "id": "c",
              "text": "East starts first"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The values match west-to-east movement."
        }
      },
      {
        "cardId": "reading-u07-l02-c3",
        "check": {
          "prompt": "What does the transcript add?",
          "choices": [
            {
              "id": "a",
              "text": "The audible experience of steady, loud rain"
            },
            {
              "id": "b",
              "text": "A new station total"
            },
            {
              "id": "c",
              "text": "A map color"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The words describe sound and intensity."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u07-l01",
    "widgets": [
      {
        "cardId": "reading-u07-l01-c2",
        "ref": {
          "type": "text-structure-sorter",
          "config": {
            "excerpts": [
              {
                "id": "repair",
                "text": "Loose boards created a tripping problem, so volunteers replaced them.",
                "structure": "problem-solution"
              },
              {
                "id": "steps",
                "text": "First inspect the boards, next mark damage, and then make repairs.",
                "structure": "sequence"
              },
              {
                "id": "materials",
                "text": "Recycled boards cost less, while composite boards last longer.",
                "structure": "compare-contrast"
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u07-l02",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u07-l01",
    "passage": {
      "title": "Boardwalk Repair Guide",
      "text": "Boardwalk Repair Guide\n\nHeading: Why Repairs Matter\nLoose boards created a tripping problem, so volunteers replaced them with secure boards.\n\nHeading: Inspection Steps\nFirst, inspect every board from the marked path. Next, mark loose or cracked boards. Then, have trained adults make repairs. Finally, reopen the safe section.\n\nHeading: Comparing Materials\nRecycled wood boards cost less and match the older walkway, while composite boards last longer and resist water. Both need secure fasteners.\n\nDiagram description: A top-view rectangle labels the closed section, the safe walking route, and three repair marks. Caption: “Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.”\n\nGlossary: fastener — a screw or other piece that joins materials; composite — material made by combining substances.\n\nThe headings preview each section. The diagram and caption show locations and movement. The glossary clarifies technical words. Structure helps readers anticipate whether a section will present a problem and response, ordered steps, or similarities and differences."
    },
    "reference": {
      "title": "Read “Boardwalk Repair Guide”",
      "text": "Boardwalk Repair Guide\n\nHeading: Why Repairs Matter\nLoose boards created a tripping problem, so volunteers replaced them with secure boards.\n\nHeading: Inspection Steps\nFirst, inspect every board from the marked path. Next, mark loose or cracked boards. Then, have trained adults make repairs. Finally, reopen the safe section.\n\nHeading: Comparing Materials\nRecycled wood boards cost less and match the older walkway, while composite boards last longer and resist water. Both need secure fasteners.\n\nDiagram description: A top-view rectangle labels the closed section, the safe walking route, and three repair marks. Caption: “Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.”\n\nGlossary: fastener — a screw or other piece that joins materials; composite — material made by combining substances.\n\nThe headings preview each section. The diagram and caption show locations and movement. The glossary clarifies technical words. Structure helps readers anticipate whether a section will present a problem and response, ordered steps, or similarities and differences."
    },
    "evidence": [
      "Inspection Steps",
      "Diagram description",
      "Glossary"
    ]
  },
  {
    "id": "reading-u07-l02",
    "passage": {
      "title": "Tracking a Storm’s Rain",
      "text": "Tracking a Storm’s Rain — accessible media packet\n\nForecast prose: A slow storm is expected to cross the county from west to east Tuesday. Forecasters expect the western station to begin receiving rain before the eastern station.\n\nRainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.\n\nMap legend description: pale blue means under 0.5 inch; medium blue means 0.5–1.0 inch; dark blue means over 1.0 inch. At 4 p.m., West and Central are dark blue; East is medium blue. Arrows point west to east.\n\nPhoto caption: “Water covers the lowest board of the creek gauge at Central Station at noon.”\n\nAudio transcript: Reporter: “Rain began lightly in the west before sunrise. By noon, drops struck the shelter roof in a steady, loud pattern. The eastern station was still receiving lighter rain.”\n\nTogether, the representations show timing, amount, location, a visible creek effect, and the sound/intensity experience."
    },
    "reference": {
      "title": "Read “Tracking a Storm’s Rain”",
      "text": "Tracking a Storm’s Rain — accessible media packet\n\nForecast prose: A slow storm is expected to cross the county from west to east Tuesday. Forecasters expect the western station to begin receiving rain before the eastern station.\n\nRainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.\n\nMap legend description: pale blue means under 0.5 inch; medium blue means 0.5–1.0 inch; dark blue means over 1.0 inch. At 4 p.m., West and Central are dark blue; East is medium blue. Arrows point west to east.\n\nPhoto caption: “Water covers the lowest board of the creek gauge at Central Station at noon.”\n\nAudio transcript: Reporter: “Rain began lightly in the west before sunrise. By noon, drops struck the shelter roof in a steady, loud pattern. The eastern station was still receiving lighter rain.”\n\nTogether, the representations show timing, amount, location, a visible creek effect, and the sound/intensity experience."
    },
    "evidence": [
      "Rainfall table description",
      "Map legend description",
      "Audio transcript"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 7 literal content', () => {
  test('places the complete rainfall table before the card 1 inline check', () => {
    const card = unit07Lessons.find(({ id }) => id === 'reading-u07-l02')!.learnCards[0]!;
    const priorMaterial = card.blocks.map(({ text }) => text).join('\n');
    expect(priorMaterial).toContain('Rainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.');
    expect(card.check?.prompt).toBe('Which station has 1.5 inches at 4 p.m.?');
  });

  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit07Lessons, expectedManifest, 'reading');
    expect(unit07Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit07Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit07Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit07Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit07Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit07Lessons) {
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
    for (const lesson of unit07Lessons) {
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
