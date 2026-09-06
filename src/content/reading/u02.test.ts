import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit02Lessons } from './u02';

const expectedManifest = [
  {
    "id": "reading-u02-l01",
    "unitId": "reading-u02",
    "title": "Build Meaning with Roots, Base Words, and Affixes",
    "indicatorCodes": [
      "ELA.4.AOR.9.1"
    ]
  },
  {
    "id": "reading-u02-l02",
    "unitId": "reading-u02",
    "title": "Use Definition, Example, and Restatement Clues",
    "indicatorCodes": [
      "ELA.4.AOR.7.1"
    ]
  },
  {
    "id": "reading-u02-l03",
    "unitId": "reading-u02",
    "title": "Use Print and Digital References Precisely",
    "indicatorCodes": [
      "ELA.4.AOR.7.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u02-l01",
    "cards": [
      {
        "id": "reading-u02-l01-c1",
        "title": "Build Words from Meaningful Parts",
        "conceptTag": "word-parts"
      },
      {
        "id": "reading-u02-l01-c2",
        "title": "Use Roots to Unlock Meaning",
        "conceptTag": "root-meaning"
      },
      {
        "id": "reading-u02-l01-c3",
        "title": "Check the Whole Word in Context",
        "conceptTag": "morphology-check"
      }
    ]
  },
  {
    "id": "reading-u02-l02",
    "cards": [
      {
        "id": "reading-u02-l02-c1",
        "title": "Spot the Kind of Context Clue",
        "conceptTag": "clue-types"
      },
      {
        "id": "reading-u02-l02-c2",
        "title": "Read Around the Unknown Word",
        "conceptTag": "context-reasoning"
      },
      {
        "id": "reading-u02-l02-c3",
        "title": "Confirm Meaning in the Sentence",
        "conceptTag": "context-check"
      }
    ]
  },
  {
    "id": "reading-u02-l03",
    "cards": [
      {
        "id": "reading-u02-l03-c1",
        "title": "Choose the Right Reference",
        "conceptTag": "reference-choice"
      },
      {
        "id": "reading-u02-l03-c2",
        "title": "Read a Dictionary Entry",
        "conceptTag": "dictionary-entry"
      },
      {
        "id": "reading-u02-l03-c3",
        "title": "Select the Precise Meaning",
        "conceptTag": "precise-meaning"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u02-l01",
    "questions": [
      {
        "id": "reading-u02-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "word-parts",
        "reviewCardId": "reading-u02-l01-c1"
      },
      {
        "id": "reading-u02-l01-q02",
        "type": "fill-blank",
        "conceptTag": "word-parts",
        "reviewCardId": "reading-u02-l01-c1"
      },
      {
        "id": "reading-u02-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "word-parts",
        "reviewCardId": "reading-u02-l01-c1"
      },
      {
        "id": "reading-u02-l01-q04",
        "type": "true-false",
        "conceptTag": "word-parts",
        "reviewCardId": "reading-u02-l01-c1"
      },
      {
        "id": "reading-u02-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "root-meaning",
        "reviewCardId": "reading-u02-l01-c2"
      },
      {
        "id": "reading-u02-l01-q06",
        "type": "fill-blank",
        "conceptTag": "root-meaning",
        "reviewCardId": "reading-u02-l01-c2"
      },
      {
        "id": "reading-u02-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "root-meaning",
        "reviewCardId": "reading-u02-l01-c2"
      },
      {
        "id": "reading-u02-l01-q08",
        "type": "true-false",
        "conceptTag": "root-meaning",
        "reviewCardId": "reading-u02-l01-c2"
      },
      {
        "id": "reading-u02-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      },
      {
        "id": "reading-u02-l01-q10",
        "type": "fill-blank",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      },
      {
        "id": "reading-u02-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      },
      {
        "id": "reading-u02-l01-q12",
        "type": "sort",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      },
      {
        "id": "reading-u02-l01-q13",
        "type": "true-false",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u02-l02",
    "questions": [
      {
        "id": "reading-u02-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "clue-types",
        "reviewCardId": "reading-u02-l02-c1"
      },
      {
        "id": "reading-u02-l02-q02",
        "type": "multiple-choice",
        "conceptTag": "clue-types",
        "reviewCardId": "reading-u02-l02-c1"
      },
      {
        "id": "reading-u02-l02-q03",
        "type": "true-false",
        "conceptTag": "clue-types",
        "reviewCardId": "reading-u02-l02-c1"
      },
      {
        "id": "reading-u02-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "clue-types",
        "reviewCardId": "reading-u02-l02-c1"
      },
      {
        "id": "reading-u02-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "context-reasoning",
        "reviewCardId": "reading-u02-l02-c2"
      },
      {
        "id": "reading-u02-l02-q06",
        "type": "fill-blank",
        "conceptTag": "context-reasoning",
        "reviewCardId": "reading-u02-l02-c2"
      },
      {
        "id": "reading-u02-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "context-reasoning",
        "reviewCardId": "reading-u02-l02-c2"
      },
      {
        "id": "reading-u02-l02-q08",
        "type": "true-false",
        "conceptTag": "context-reasoning",
        "reviewCardId": "reading-u02-l02-c2"
      },
      {
        "id": "reading-u02-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      },
      {
        "id": "reading-u02-l02-q10",
        "type": "multiple-choice",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      },
      {
        "id": "reading-u02-l02-q11",
        "type": "fill-blank",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      },
      {
        "id": "reading-u02-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      },
      {
        "id": "reading-u02-l02-q13",
        "type": "true-false",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      }
    ]
  },
  {
    "id": "reading-u02-l03",
    "questions": [
      {
        "id": "reading-u02-l03-q01",
        "type": "multiple-choice",
        "conceptTag": "reference-choice",
        "reviewCardId": "reading-u02-l03-c1"
      },
      {
        "id": "reading-u02-l03-q02",
        "type": "true-false",
        "conceptTag": "reference-choice",
        "reviewCardId": "reading-u02-l03-c1"
      },
      {
        "id": "reading-u02-l03-q03",
        "type": "multiple-choice",
        "conceptTag": "reference-choice",
        "reviewCardId": "reading-u02-l03-c1"
      },
      {
        "id": "reading-u02-l03-q04",
        "type": "multiple-choice",
        "conceptTag": "reference-choice",
        "reviewCardId": "reading-u02-l03-c1"
      },
      {
        "id": "reading-u02-l03-q05",
        "type": "multiple-choice",
        "conceptTag": "dictionary-entry",
        "reviewCardId": "reading-u02-l03-c2"
      },
      {
        "id": "reading-u02-l03-q06",
        "type": "fill-blank",
        "conceptTag": "dictionary-entry",
        "reviewCardId": "reading-u02-l03-c2"
      },
      {
        "id": "reading-u02-l03-q07",
        "type": "multiple-choice",
        "conceptTag": "dictionary-entry",
        "reviewCardId": "reading-u02-l03-c2"
      },
      {
        "id": "reading-u02-l03-q08",
        "type": "true-false",
        "conceptTag": "dictionary-entry",
        "reviewCardId": "reading-u02-l03-c2"
      },
      {
        "id": "reading-u02-l03-q09",
        "type": "multiple-choice",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      },
      {
        "id": "reading-u02-l03-q10",
        "type": "multiple-choice",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      },
      {
        "id": "reading-u02-l03-q11",
        "type": "fill-blank",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      },
      {
        "id": "reading-u02-l03-q12",
        "type": "multiple-choice",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      },
      {
        "id": "reading-u02-l03-q13",
        "type": "true-false",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u02-l01",
    "checks": [
      {
        "cardId": "reading-u02-l01-c1",
        "check": {
          "prompt": "In rebuild, which part means again?",
          "choices": [
            {
              "id": "a",
              "text": "re-"
            },
            {
              "id": "b",
              "text": "build"
            },
            {
              "id": "c",
              "text": "-less"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible example states that re- means again."
        }
      },
      {
        "cardId": "reading-u02-l01-c2",
        "check": {
          "prompt": "The root port means carry. Which word means able to be carried?",
          "choices": [
            {
              "id": "a",
              "text": "portable"
            },
            {
              "id": "b",
              "text": "transport"
            },
            {
              "id": "c",
              "text": "rebuild"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Port means carry and -able means able to be."
        }
      },
      {
        "cardId": "reading-u02-l01-c3",
        "check": {
          "prompt": "Why should you reread after combining word-part meanings?",
          "choices": [
            {
              "id": "a",
              "text": "confirm the meaning fits the sentence"
            },
            {
              "id": "b",
              "text": "count the letters"
            },
            {
              "id": "c",
              "text": "remove the root"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The card says context confirms or corrects the combined meaning."
        }
      }
    ]
  },
  {
    "id": "reading-u02-l02",
    "checks": [
      {
        "cardId": "reading-u02-l02-c1",
        "check": {
          "prompt": "Which words directly define nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "creatures that are active at night"
            },
            {
              "id": "b",
              "text": "owls and moths"
            },
            {
              "id": "c",
              "text": "Some garden visitors"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The phrase after nocturnal directly states its meaning."
        }
      },
      {
        "cardId": "reading-u02-l02-c2",
        "check": {
          "prompt": "What does emerge mean in the visible sentence?",
          "choices": [
            {
              "id": "a",
              "text": "come out from hiding"
            },
            {
              "id": "b",
              "text": "sleep through every night"
            },
            {
              "id": "c",
              "text": "grow bright petals"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The words “in other words” introduce the restatement."
        }
      },
      {
        "cardId": "reading-u02-l02-c3",
        "check": {
          "prompt": "Which substitution confirms nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "creatures active at night"
            },
            {
              "id": "b",
              "text": "creatures with feathers"
            },
            {
              "id": "c",
              "text": "creatures living in gardens"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That substitution preserves the exact definition in the card."
        }
      }
    ]
  },
  {
    "id": "reading-u02-l03",
    "checks": [
      {
        "cardId": "reading-u02-l03-c1",
        "check": {
          "prompt": "Which reference best gives the wetland meaning of brackish?",
          "choices": [
            {
              "id": "a",
              "text": "the packet glossary"
            },
            {
              "id": "b",
              "text": "a calendar"
            },
            {
              "id": "c",
              "text": "a map scale"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible glossary defines the topic word brackish."
        }
      },
      {
        "cardId": "reading-u02-l03-c2",
        "check": {
          "prompt": "In “a gentle current moved,” what part of speech is current?",
          "choices": [
            {
              "id": "a",
              "text": "noun"
            },
            {
              "id": "b",
              "text": "adjective"
            },
            {
              "id": "c",
              "text": "verb"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The entry labels the moving-water meaning as a noun."
        }
      },
      {
        "cardId": "reading-u02-l03-c3",
        "check": {
          "prompt": "Which bank meaning fits the field note?",
          "choices": [
            {
              "id": "a",
              "text": "land beside a river or stream"
            },
            {
              "id": "b",
              "text": "a business that keeps money"
            },
            {
              "id": "c",
              "text": "a row of switches"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The creek and grass are context evidence for the riverbank meaning."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u02-l01",
    "widgets": [
      {
        "cardId": "reading-u02-l01-c2",
        "ref": {
          "type": "word-root-builder",
          "config": {
            "root": "port",
            "prefixes": [
              "trans"
            ],
            "suffixes": [
              "able"
            ],
            "targets": [
              {
                "word": "transport",
                "meaning": "carry from one place to another"
              },
              {
                "word": "portable",
                "meaning": "able to be carried"
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u02-l02",
    "widgets": [
      {
        "cardId": "reading-u02-l02-c1",
        "ref": {
          "type": "context-clue-detective",
          "config": {
            "passage": "Nocturnal animals, creatures that are active at night, include owls and moths.",
            "targetWord": "nocturnal",
            "clueChoices": [
              {
                "id": "definition",
                "text": "creatures that are active at night",
                "type": "definition"
              },
              {
                "id": "examples",
                "text": "owls and moths",
                "type": "example"
              }
            ],
            "correctChoiceId": "definition"
          }
        }
      }
    ]
  },
  {
    "id": "reading-u02-l03",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u02-l01",
    "passage": {
      "title": "The Rebuilt Garden",
      "text": "After a summer storm, the school garden needed careful work. Nia and Omar rebuilt a short border around the herb bed. They reused straight boards that had washed beside the fence and replaced one cracked board with a new piece. Before lifting anything, they previewed the cleanup map so they knew where each pile belonged.\n\nA small cart transported fresh soil from the gate to the raised beds. The cart was portable enough for one student to pull, but the load was heavy, so the students made two trips. Omar reread the labels on three reusable bins: wood, weeds, and plastic. Nia checked each item before sorting it.\n\nBy noon, the repaired border held the soil in place. The class had built it again, carried supplies across the garden, looked at the plan beforehand, and used materials more than once. Those actions made the meanings of rebuilt, transported, previewed, and reusable clear in context."
    },
    "reference": {
      "title": "Read “The Rebuilt Garden”",
      "text": "After a summer storm, the school garden needed careful work. Nia and Omar rebuilt a short border around the herb bed. They reused straight boards that had washed beside the fence and replaced one cracked board with a new piece. Before lifting anything, they previewed the cleanup map so they knew where each pile belonged.\n\nA small cart transported fresh soil from the gate to the raised beds. The cart was portable enough for one student to pull, but the load was heavy, so the students made two trips. Omar reread the labels on three reusable bins: wood, weeds, and plastic. Nia checked each item before sorting it.\n\nBy noon, the repaired border held the soil in place. The class had built it again, carried supplies across the garden, looked at the plan beforehand, and used materials more than once. Those actions made the meanings of rebuilt, transported, previewed, and reusable clear in context."
    },
    "evidence": [
      "rebuilt",
      "transported",
      "reusable"
    ]
  },
  {
    "id": "reading-u02-l02",
    "passage": {
      "title": "Night Garden Visitors",
      "text": "Night Garden Visitors\n\nSome garden visitors are nocturnal, creatures that are active at night. Owls may hunt after sunset, and moths often visit pale flowers in the dark. These examples help explain nocturnal even if the word is new.\n\nAt dusk, several insects emerge; in other words, they come out from hiding. A luna moth rests during much of the day but becomes active when evening arrives. By contrast, many butterflies are diurnal and fly while the sun is up.\n\nReaders can use the definition beside nocturnal, the examples of owls and moths, and the restatement after emerge. Then they should replace the unknown word with the possible meaning and reread. If “creatures active at night” fits the first sentence without changing its message, the context-clue reasoning is confirmed."
    },
    "reference": {
      "title": "Read “Night Garden Visitors”",
      "text": "Night Garden Visitors\n\nSome garden visitors are nocturnal, creatures that are active at night. Owls may hunt after sunset, and moths often visit pale flowers in the dark. These examples help explain nocturnal even if the word is new.\n\nAt dusk, several insects emerge; in other words, they come out from hiding. A luna moth rests during much of the day but becomes active when evening arrives. By contrast, many butterflies are diurnal and fly while the sun is up.\n\nReaders can use the definition beside nocturnal, the examples of owls and moths, and the restatement after emerge. Then they should replace the unknown word with the possible meaning and reread. If “creatures active at night” fits the first sentence without changing its message, the context-clue reasoning is confirmed."
    },
    "evidence": [
      "nocturnal",
      "emerge",
      "owls and moths"
    ]
  },
  {
    "id": "reading-u02-l03",
    "passage": {
      "title": "Field Notes Word Desk",
      "text": "Field Notes Word Desk — invented reference packet\n\nDictionary entry: current /KUR-uhnt/ noun. 1. a steady movement of water or air in one direction. 2. the present time. adjective. happening now.\n\nDictionary entry: bank /bangk/ noun. 1. land beside a river or stream. 2. a business that keeps and lends money.\n\nGlossary: migrate — verb — to move from one region to another, often with the seasons. Brackish — adjective — slightly salty because fresh water and seawater mix.\n\nField note: “The young fish rested near the grassy bank while a gentle current moved through the creek. Some birds migrate through the preserve each fall. Where the river meets the ocean, the water becomes brackish.”\n\nA print dictionary and a trusted digital dictionary can provide pronunciation, part of speech, and numbered meanings. A topic glossary gives the specialized meaning used in one text. Readers compare each entry with the sentence instead of automatically choosing meaning 1."
    },
    "reference": {
      "title": "Read “Field Notes Word Desk”",
      "text": "Field Notes Word Desk — invented reference packet\n\nDictionary entry: current /KUR-uhnt/ noun. 1. a steady movement of water or air in one direction. 2. the present time. adjective. happening now.\n\nDictionary entry: bank /bangk/ noun. 1. land beside a river or stream. 2. a business that keeps and lends money.\n\nGlossary: migrate — verb — to move from one region to another, often with the seasons. Brackish — adjective — slightly salty because fresh water and seawater mix.\n\nField note: “The young fish rested near the grassy bank while a gentle current moved through the creek. Some birds migrate through the preserve each fall. Where the river meets the ocean, the water becomes brackish.”\n\nA print dictionary and a trusted digital dictionary can provide pronunciation, part of speech, and numbered meanings. A topic glossary gives the specialized meaning used in one text. Readers compare each entry with the sentence instead of automatically choosing meaning 1."
    },
    "evidence": [
      "current /KUR-uhnt/",
      "brackish",
      "grassy bank"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 2 literal content', () => {
  test('bridges the roots lesson into a Winnie-coached word build', () => {
    const card = unit02Lessons[0]!.learnCards[1]!;
    if (!card.widget || card.widget.type !== 'word-root-builder') throw new Error('word-root widget is missing');
    if (!('widgetCoach' in card) || !card.widgetCoach) throw new Error('word-root coach is missing');
    expect(card.widgetCoach.intro).toEqual([
      expect.objectContaining({ speaker: 'guide', text: expect.stringContaining('snap') }),
      expect.objectContaining({ speaker: 'kid', text: expect.stringContaining('left to right') }),
    ]);
    expect(card.widgetCoach.reactions.strategy?.text).toContain('root');
    expect(card.widgetCoach.reactions.retry?.text).toContain('whole-word meaning');
    expect(card.widgetCoach.reactions.milestone?.text).toContain('spelling');
    expect(card.widgetCoach.reactions.complete.text).toContain('word parts');
  });

  test('keeps the complete context-clue source in the same lesson activity', () => {
    const card = unit02Lessons[1]!.learnCards[0]!;
    expect(card.blocks.some(block => block.text === 'Source passage: Nocturnal animals, creatures that are active at night, include owls and moths.')).toBe(true);
    const widget = 'widget' in card ? card.widget : undefined;
    if (!widget || widget.type !== 'context-clue-detective') throw new Error('context clue widget is missing');
    expect(widget.config.passage).toBe('Nocturnal animals, creatures that are active at night, include owls and moths.');
    const coach = 'widgetCoach' in card ? card.widgetCoach : undefined;
    expect(coach?.intro).toHaveLength(2);
    expect(coach?.reactions.complete.text).toContain('complete sentence');
    expect(coach?.reactions.retry?.text).toContain('both the clue words and their kind');
  });

  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit02Lessons, expectedManifest, 'reading');
    expect(unit02Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit02Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit02Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit02Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit02Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit02Lessons) {
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
    for (const lesson of unit02Lessons) {
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

  test('gives the submarine morphology check the sentence context named in its feedback', () => {
    const question = unit02Lessons[0]!.quiz.pool.find(
      ({ id }) => id === 'reading-u02-l01-q11',
    );

    expect(question?.prompt).toBe(
      'In “The submarine traveled under the sea,” which response best checks the word submarine?',
    );
  });
});
