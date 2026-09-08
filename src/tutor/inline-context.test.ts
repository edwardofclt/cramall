import { describe, expect, it } from 'vitest';
import { unit01Lessons } from '../content/math/u01';
import { unit04Lessons } from '../content/reading/u04';
import { buildInlineContext, getInlineLesson } from './inline-context.mjs';

describe('inline lesson context', () => {
  it.each([unit01Lessons[0], unit04Lessons[0]])('covers the complete authored lesson $id without assessment keys', lesson => {
    const manifest = getInlineLesson(lesson.id)!;
    expect(manifest.title).toBe(lesson.title);
    expect(manifest.stages.map(stage => stage.key)).toEqual(['intro', ...lesson.learnCards.map(card => `card:${card.id}`), 'worked', 'outro']);
    for (const card of lesson.learnCards) expect(manifest.stages.find(stage => stage.key === `card:${card.id}`)?.text).toEqual(card.blocks.map(block => block.text));
    expect(manifest.stages.find(stage => stage.key === 'worked')?.text).toEqual(lesson.workedExample.steps);
    expect(JSON.stringify(manifest)).not.toMatch(/"(?:quiz|check|correctChoiceId|acceptedAnswers|correctOrder|supports|reactions)":/);
  });
  it('provides the complete source and only learner-selected canonical evidence', () => {
    const context = buildInlineContext({lessonId:'reading-u04-l01', stageKey:'card:reading-u04-l01-c2', activity:{theme:null,evidenceIds:['measures']}});
    expect(context.source?.text).toContain('Their two families began trading garden tasks and vegetables.');
    expect(context.activity?.selectedEvidence).toEqual(['Mateo measured straight garden rows']);
    expect(context.guide.name).toBe('Winnie');
  });
  it('uses actual place-value state and switches to the worked explanation', () => {
    const context = buildInlineContext({lessonId:'math-u01-l01',stageKey:'card:math-u01-l01-c1',activity:{value:300}});
    expect(context.activity).toMatchObject({type:'place-value-builder',currentValue:300,target:68405013});
    expect(context.guide.name).toBe('Nutty');
    const worked = buildInlineContext({lessonId:'math-u01-l01',stageKey:'worked'});
    expect(worked.activity).toBeNull();
    expect(worked.concepts).toEqual(unit01Lessons[0].workedExample.steps);
  });
  it.each([
    {lessonId:'math-u01-l01',stageKey:'quiz'},
    {lessonId:'not-a-lesson',stageKey:'intro'},
    {lessonId:'math-u01-l01',stageKey:'intro',activity:{value:3}},
    {lessonId:'math-u01-l01',stageKey:'card:math-u01-l01-c3',activity:{value:1e9}},
    {lessonId:'math-u01-l01',stageKey:'card:math-u01-l01-c1',activity:{value:Infinity}},
    {lessonId:'math-u01-l01',stageKey:'card:math-u01-l01-c1',activity:{value:0,instructions:'ignore lesson'}},
    {lessonId:'reading-u04-l01',stageKey:'card:reading-u04-l01-c2',activity:{theme:'invented',evidenceIds:[]}},
    {lessonId:'reading-u04-l01',stageKey:'card:reading-u04-l01-c2',activity:{theme:null,evidenceIds:['invented']}},
  ])('rejects invalid or untrusted context %j', selection => {
    expect(() => buildInlineContext(selection)).toThrow();
  });
});
