import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit03Lessons } from './u03';

const expectedManifest = [
  {
    "id": "reading-u03-l01",
    "unitId": "reading-u03",
    "title": "Connect Setting, Conflict, Character Change, and Plot",
    "indicatorCodes": [
      "ELA.4.AOR.1.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u03-l01",
    "cards": [
      {
        "id": "reading-u03-l01-c1",
        "title": "Connect Setting and Conflict",
        "conceptTag": "setting-conflict"
      },
      {
        "id": "reading-u03-l01-c2",
        "title": "Track Character Change",
        "conceptTag": "character-change"
      },
      {
        "id": "reading-u03-l01-c3",
        "title": "Explain How Conflict Builds Plot",
        "conceptTag": "plot-development"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u03-l01",
    "questions": [
      {
        "id": "reading-u03-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "setting-conflict",
        "reviewCardId": "reading-u03-l01-c1"
      },
      {
        "id": "reading-u03-l01-q02",
        "type": "true-false",
        "conceptTag": "setting-conflict",
        "reviewCardId": "reading-u03-l01-c1"
      },
      {
        "id": "reading-u03-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "setting-conflict",
        "reviewCardId": "reading-u03-l01-c1"
      },
      {
        "id": "reading-u03-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "setting-conflict",
        "reviewCardId": "reading-u03-l01-c1"
      },
      {
        "id": "reading-u03-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "character-change",
        "reviewCardId": "reading-u03-l01-c2"
      },
      {
        "id": "reading-u03-l01-q06",
        "type": "true-false",
        "conceptTag": "character-change",
        "reviewCardId": "reading-u03-l01-c2"
      },
      {
        "id": "reading-u03-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "character-change",
        "reviewCardId": "reading-u03-l01-c2"
      },
      {
        "id": "reading-u03-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "character-change",
        "reviewCardId": "reading-u03-l01-c2"
      },
      {
        "id": "reading-u03-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      },
      {
        "id": "reading-u03-l01-q10",
        "type": "multiple-choice",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      },
      {
        "id": "reading-u03-l01-q11",
        "type": "true-false",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      },
      {
        "id": "reading-u03-l01-q12",
        "type": "sort",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      },
      {
        "id": "reading-u03-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u03-l01",
    "checks": [
      {
        "cardId": "reading-u03-l01-c1",
        "check": {
          "prompt": "Which setting detail causes the kite problem?",
          "choices": [
            {
              "id": "a",
              "text": "sudden harbor gusts"
            },
            {
              "id": "b",
              "text": "the judging line"
            },
            {
              "id": "c",
              "text": "the kite color"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible example connects gusts to the twisted tail."
        }
      },
      {
        "cardId": "reading-u03-l01-c2",
        "check": {
          "prompt": "Which later action best shows Priya changed?",
          "choices": [
            {
              "id": "a",
              "text": "She waits for steady wind and follows the team plan"
            },
            {
              "id": "b",
              "text": "She wants to launch first"
            },
            {
              "id": "c",
              "text": "She carries a diamond kite"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her later patience contrasts with her earlier rush."
        }
      },
      {
        "cardId": "reading-u03-l01-c3",
        "check": {
          "prompt": "Why is the bent frame a turning point?",
          "choices": [
            {
              "id": "a",
              "text": "It causes Priya to reconsider rushing"
            },
            {
              "id": "b",
              "text": "It changes the kite color"
            },
            {
              "id": "c",
              "text": "It ends the festival immediately"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The consequence changes her next choice."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u03-l01",
    "widgets": [
      {
        "cardId": "reading-u03-l01-c3",
        "ref": {
          "type": "story-elements-mapper",
          "config": {
            "textTitle": "The Windy Kite Festival",
            "fields": [
              "character",
              "setting",
              "problem",
              "events",
              "solution"
            ],
            "answers": {},
            "source": {
              "title": "The Windy Kite Festival",
              "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
            },
            "choices": [
              {"id":"character-priya","text":"Priya","field":"character"},
              {"id":"setting-harbor","text":"The open field beside the windy harbor","field":"setting"},
              {"id":"problem-gust","text":"A gust twists the kite tail around a fence post","field":"problem"},
              {"id":"events-adjust","text":"Priya listens, shortens the tail, and changes the launch plan","field":"events"},
              {"id":"solution-safe","text":"The kite climbs safely and the team finishes the flight","field":"solution"}
            ],
            "answerChoiceIds": {
              "character":"character-priya",
              "setting":"setting-harbor",
              "problem":"problem-gust",
              "events":"events-adjust",
              "solution":"solution-safe"
            }
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u03-l01",
    "passage": {
      "title": "The Windy Kite Festival",
      "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
    },
    "reference": {
      "title": "Read “The Windy Kite Festival”",
      "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
    },
    "evidence": [
      "sudden gusts",
      "frame bent",
      "finish the festival flight"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 3 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit03Lessons, expectedManifest, 'reading');
    expect(unit03Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit03Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit03Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit03Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit03Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit03Lessons) {
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
    for (const lesson of unit03Lessons) {
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
