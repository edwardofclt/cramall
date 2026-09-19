import { describe, expect, it } from 'vitest';
import { unit01Lessons } from '../content/math/u01';
import { buildInlineContext, getInlineLesson } from './inline-context.mjs';
import { allLessons, SUBJECTS } from '../content/subjects';
import { widgetSpeechText } from '../widgets/widgetSpeechText';
import { projectInlineLessons } from './lesson-projection';

describe('inline lesson context', () => {
  it('keeps the generated gateway manifest synchronized with the registered curriculum', () => {
    const expected = JSON.parse(JSON.stringify(projectInlineLessons(SUBJECTS)));
    expect(allLessons().map(lesson => getInlineLesson(lesson.id))).toEqual(expected);
  });
  it.each(allLessons())('covers the complete authored lesson $id without assessment keys', lesson => {
    const manifest = getInlineLesson(lesson.id)!;
    expect(manifest.title).toBe(lesson.title);
    expect(buildInlineContext({lessonId:lesson.id,stageKey:'intro'}).lessonOverview).toEqual(lesson.learnCards.flatMap(card => [card.title,...card.blocks.map(block => block.text)]));
    expect(manifest.stages.map(stage => stage.key)).toEqual(['intro', ...lesson.learnCards.map(card => `card:${card.id}`), 'worked', 'outro']);
    for (const card of lesson.learnCards) expect(manifest.stages.find(stage => stage.key === `card:${card.id}`)?.text).toEqual(card.blocks.map(block => block.text));
    expect(manifest.stages.find(stage => stage.key === 'worked')?.text).toEqual(lesson.workedExample.steps);
    expect(JSON.stringify(manifest)).not.toMatch(/"(?:quiz|check|correctChoiceId|acceptedAnswers|correctOrder|supports|reactions|targetId|locationId|causeId|explain|judgments)":/);
  });
  it('uses the correct guide and safe activity material throughout all four subjects', () => {
    for (const subject of SUBJECTS) for (const unit of subject.units) for (const lesson of unit.lessons) {
      expect(getInlineLesson(lesson.id)?.guide.id).toBe(subject.guide);
      for (const card of lesson.learnCards) {
        const context = buildInlineContext({lessonId:lesson.id, stageKey:`card:${card.id}`});
        if (card.widget) expect(context.activity?.materials).toEqual(widgetSpeechText(card.widget));
        else expect(context.activity).toBeNull();
      }
    }
  });
  it('keeps each Reading workshop source in its own step', () => {
    const lesson = allLessons().find(item => item.learnCards.some(card => card.widget?.type === 'reading-workshop'))!;
    const card = lesson.learnCards.find(item => item.widget?.type === 'reading-workshop')!;
    const context = buildInlineContext({lessonId:lesson.id,stageKey:`card:${card.id}`});
    const source = widgetSpeechText(card.widget!);
    expect(context.source).toEqual({title:source[0],text:source[1]});
    expect(context.activity?.stateAvailable).toBe(false);
    expect(buildInlineContext({lessonId:'reading-u08-l01',stageKey:'intro'}).source).toBeNull();
    expect(buildInlineContext({lessonId:'reading-u08-l01',stageKey:'worked'}).source?.title).toBe('A Shadier Schoolyard / How Tree Canopies Cool Pavement');
  });
  it('resolves Social Studies placements to visible labels without correctness mappings', () => {
    const lesson = allLessons().find(item => item.learnCards.some(card => card.widget?.type === 'history-map'))!;
    const card = lesson.learnCards.find(item => item.widget?.type === 'history-map')!;
    if (card.widget?.type !== 'history-map') throw new Error('Missing map fixture');
    const config = card.widget.config;
    const context = buildInlineContext({lessonId:lesson.id,stageKey:`card:${card.id}`,activity:{placements:{[config.cards[0].id]:config.locations[1].id}}});
    expect(context.guide.name).toBe('Pip');
    expect(context.activity?.placements).toEqual([{item:config.cards[0].text,location:config.locations[1].label}]);
    for (const source of config.sources) expect(context.source?.text).toContain(source.text);
    expect(() => buildInlineContext({lessonId:lesson.id,stageKey:`card:${card.id}`,activity:{placements:{invented:'invented'}}})).toThrow();
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
