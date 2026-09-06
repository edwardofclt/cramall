import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit05Lessons } from './u05';

const expectedManifest = [
  {
    "id": "reading-u05-l01",
    "unitId": "reading-u05",
    "title": "Explain Stated and Implied Central Ideas",
    "indicatorCodes": [
      "ELA.4.AOR.2.2"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u05-l01",
    "cards": [
      {
        "id": "reading-u05-l01-c1",
        "title": "Find the Central Idea",
        "conceptTag": "central-idea"
      },
      {
        "id": "reading-u05-l01-c2",
        "title": "Choose Supporting Details",
        "conceptTag": "supporting-details"
      },
      {
        "id": "reading-u05-l01-c3",
        "title": "Explain How Details Develop the Idea",
        "conceptTag": "idea-development"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u05-l01",
    "questions": [
      {
        "id": "reading-u05-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "central-idea",
        "reviewCardId": "reading-u05-l01-c1"
      },
      {
        "id": "reading-u05-l01-q02",
        "type": "true-false",
        "conceptTag": "central-idea",
        "reviewCardId": "reading-u05-l01-c1"
      },
      {
        "id": "reading-u05-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "central-idea",
        "reviewCardId": "reading-u05-l01-c1"
      },
      {
        "id": "reading-u05-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "central-idea",
        "reviewCardId": "reading-u05-l01-c1"
      },
      {
        "id": "reading-u05-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "supporting-details",
        "reviewCardId": "reading-u05-l01-c2"
      },
      {
        "id": "reading-u05-l01-q06",
        "type": "true-false",
        "conceptTag": "supporting-details",
        "reviewCardId": "reading-u05-l01-c2"
      },
      {
        "id": "reading-u05-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "supporting-details",
        "reviewCardId": "reading-u05-l01-c2"
      },
      {
        "id": "reading-u05-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "supporting-details",
        "reviewCardId": "reading-u05-l01-c2"
      },
      {
        "id": "reading-u05-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      },
      {
        "id": "reading-u05-l01-q10",
        "type": "true-false",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      },
      {
        "id": "reading-u05-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      },
      {
        "id": "reading-u05-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      },
      {
        "id": "reading-u05-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u05-l01",
    "checks": [
      {
        "cardId": "reading-u05-l01-c1",
        "check": {
          "prompt": "Which is a central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Salt marshes support wildlife and shorelines"
            },
            {
              "id": "b",
              "text": "Young fish hide"
            },
            {
              "id": "c",
              "text": "Tides rise"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It covers the text’s main explanation."
        }
      },
      {
        "cardId": "reading-u05-l01-c2",
        "check": {
          "prompt": "Which detail supports shoreline protection?",
          "choices": [
            {
              "id": "a",
              "text": "Marsh stems slow waves"
            },
            {
              "id": "b",
              "text": "Birds have feathers"
            },
            {
              "id": "c",
              "text": "Researchers carry pencils"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It explains the shoreline-buffer part of the idea."
        }
      },
      {
        "cardId": "reading-u05-l01-c3",
        "check": {
          "prompt": "How does the fish detail develop the idea?",
          "choices": [
            {
              "id": "a",
              "text": "It gives an example of marsh wildlife support"
            },
            {
              "id": "b",
              "text": "It proves every fish lives there"
            },
            {
              "id": "c",
              "text": "It describes a storm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Shelter among grasses illustrates habitat support."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u05-l01",
    "widgets": [
      {
        "cardId": "reading-u05-l01-c2",
        "ref": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Salt marshes support wildlife and shorelines",
              "Every wet place is a salt marsh"
            ],
            "details": [
              {
                "id": "nursery",
                "text": "Young fish find shelter among marsh grasses.",
                "supports": [
                  "Salt marshes support wildlife and shorelines"
                ],
                "sourceQuote": "Young fish and shrimp hide between the stems"
              },
              {
                "id": "buffer",
                "text": "Marsh plants slow waves near the shoreline.",
                "supports": [
                  "Salt marshes support wildlife and shorelines"
                ],
                "sourceQuote": "Their stems bend as waves pass, and their roots hold muddy soil"
              },
              {
                "id": "definition",
                "text": "Any place with rainwater is a salt marsh.",
                "supports": [
                  "Every wet place is a salt marsh"
                ],
                "sourceQuote": "A puddle after rain is not automatically a salt marsh"
              }
            ],
            "requiredDetailCount": 2,
            "source": {
              "title": "Why Salt Marshes Matter",
              "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
            }
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u05-l01",
    "passage": {
      "title": "Why Salt Marshes Matter",
      "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
    },
    "reference": {
      "title": "Read “Why Salt Marshes Matter”",
      "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
    },
    "evidence": [
      "Young fish",
      "slow moving water",
      "shoreline buffer"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 5 literal content', () => {
  test('asks what the research observations support without calling the stated idea implied', () => {
    const question = unit05Lessons[0]!.quiz.pool.find(({ id }) => id === 'reading-u05-l01-q03');
    expect(question?.prompt).toBe('Which central idea is supported by the research paragraph’s observations?');
    expect(question?.explanation).toBe('The grouped observations support several connected benefits.');
  });

  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit05Lessons, expectedManifest, 'reading');
    expect(unit05Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit05Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit05Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit05Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit05Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit05Lessons) {
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
    for (const lesson of unit05Lessons) {
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
