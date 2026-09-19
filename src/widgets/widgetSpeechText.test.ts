import { describe, expect, test } from 'vitest';
import { WidgetRefSchema, type WidgetRef } from '../content/schema';
import { widgetSpeechText } from './widgetSpeechText';
import { scaleReadingConfig } from '../content/math/activityPrototypes';

const parse = (value: unknown) => WidgetRefSchema.parse(value) as WidgetRef;

describe('widgetSpeechText', () => {
  test('reads complete scale unit names without revealing rounded measurements', () => {
    const spoken = widgetSpeechText({ type: 'scale-reading', config: scaleReadingConfig }).join(' ');
    expect(spoken).toContain('Camping kit: scale in kilograms.');
    expect(spoken).toContain('Apple: scale in ounces.');
    expect(spoken).not.toContain('4 kilograms');
  });
  test('includes visible Reading source material and choices', () => {
    const ref = parse({
      type: 'story-elements-mapper',
      config: {
        textTitle: 'The Garden Map',
        source: {
          title: 'Maya checks the map',
          text: 'Maya checked the garden map before choosing a path.',
        },
        fields: ['character', 'setting'],
        choices: [
          { id: 'choice-maya', text: 'Maya', field: 'character' },
          { id: 'choice-garden', text: 'The garden', field: 'setting' },
        ],
        answerChoiceIds: { character: 'choice-maya', setting: 'choice-garden' },
      },
    });

    const text = widgetSpeechText(ref).join(' ');
    expect(text).toContain('The Garden Map');
    expect(text).toContain('Maya checks the map');
    expect(text).toContain('Maya checked the garden map before choosing a path.');
    expect(text).toContain('Maya');
    expect(text).toContain('The garden');
    expect(text).not.toContain('choice-maya');
    expect(text).not.toContain('choice-garden');
  });

  test('includes visible planning sentences and figurative phrases without hidden answers', () => {
    const summary = parse({
      type: 'summary-builder',
      config: {
        sourceSentences: [
          { id: 'main', text: 'Bees help plants reproduce.', role: 'main' },
          { id: 'detail', text: 'They carry pollen between flowers.', role: 'detail' },
          { id: 'extra', text: 'Some bees live in hives.', role: 'extra' },
        ],
        requiredMainIds: ['main'],
        requiredDetailIds: ['detail'],
        maxSentences: 2,
        compositionPrompt: 'Choose the main idea and one supporting detail.',
        minCompositionWords: 5,
      },
    });
    const figurative = parse({
      type: 'figurative-language-matcher',
      config: {
        pairs: [
          { id: 'phrase-1', phrase: 'The moon was a lantern.', kind: 'metaphor', meaning: 'The moon gave light.' },
          { id: 'phrase-2', phrase: 'The wind whispered.', kind: 'personification', meaning: 'The wind made a soft sound.' },
        ],
      },
    });

    const summaryText = widgetSpeechText(summary).join(' ');
    expect(summaryText).toContain('Bees help plants reproduce.');
    expect(summaryText).toContain('Choose the main idea and one supporting detail.');
    expect(summaryText).not.toContain('requiredMainIds');

    const figurativeText = widgetSpeechText(figurative).join(' ');
    expect(figurativeText).toContain('The moon was a lantern.');
    expect(figurativeText).toContain('The moon gave light.');
    expect(figurativeText).not.toContain('phrase-1');
    expect(figurativeText).not.toContain('metaphor');
  });

  test('includes credibility source metadata but excludes answer keys and classifications', () => {
    const ref = parse({
      type: 'source-credibility-checker',
      config: {
        question: 'Which source is best for this question?',
        requiredReasonCount: 1,
        sources: [{
          id: 'source-a',
          title: 'River Science Center',
          author: 'Dr. Lee',
          date: '2025',
          publisher: 'River Science Center',
          purpose: 'Explain local river changes',
          claims: ['The river level changed after the storm.'],
          judgments: [{ criterion: 'expertise', strength: 'supports', reason: 'The author studies rivers.' }],
        }],
        answers: { 'source-a': 'credible-for-question' },
      },
    });

    const text = widgetSpeechText(ref).join(' ');
    expect(text).toContain('Which source is best for this question?');
    expect(text).toContain('River Science Center');
    expect(text).toContain('Dr. Lee');
    expect(text).toContain('2025');
    expect(text).toContain('Explain local river changes');
    expect(text).toContain('The river level changed after the storm.');
    expect(text).not.toContain('The author studies rivers.');
    expect(text).toContain('expertise');
    expect(text).not.toContain('source-a');
    expect(text).not.toContain('credible-for-question');
    expect(text).not.toContain('supports');
  });

  test('does not read a hidden Base-ten completion target', () => {
    const ref = parse({
      type: 'base-ten-blocks',
      config: { target: 482, initial: { ones: 0, tens: 0, hundreds: 0, thousands: 0 } },
    });

    expect(widgetSpeechText(ref).join(' ')).not.toContain('482');
  });

  test('speaks a Probability event label instead of its internal segment id', () => {
    const ref = parse({
      type: 'probability-spinner',
      config: {
        segments: [
          { id: 'red-segment', label: 'Red', weight: 1 },
          { id: 'blue-segment', label: 'Blue', weight: 1 },
        ],
        eventQuestion: { eventLabel: 'red-segment', classification: 'possible' },
      },
    });

    const text = widgetSpeechText(ref).join(' ');
    expect(text).toContain('Event to classify: Red.');
    expect(text).not.toContain('red-segment');
  });

  test('uses the learner-facing label for a legacy shape rule', () => {
    const ref = parse({
      type: 'shape-classifier',
      config: {
        shapes: [
          { id: 'shape-a', label: 'Rectangle', sides: 4, angles: 4, parallelPairs: 2 },
          { id: 'shape-b', label: 'Triangle', sides: 3, angles: 3, parallelPairs: 0 },
        ],
        bins: [
          { id: 'bin-two', label: 'Two pairs', value: 2 },
          { id: 'bin-zero', label: 'No pairs', value: 0 },
        ],
        rule: 'parallelPairs',
      },
    });

    const text = widgetSpeechText(ref).join(' ');
    expect(text).toContain('Classify by pairs of parallel sides.');
    expect(text).not.toContain('parallelPairs');
  });
});


test('reads equal sharing and neutral shape names without supplying classifications', () => {
  const division = parse({type:'array-builder', config:{rows:4,columns:3,editable:true,task:'division',dividend:936,divisor:4}});
  expect(widgetSpeechText(division).join(' ')).toContain('936 shared into 4 equal groups');
  const shapes = parse({type:'shape-classifier',config:{shapes:[{id:'s',label:'Square',sides:4,angles:4,parallelPairs:2},{id:'t',label:'Triangle',sides:3,angles:3,parallelPairs:0}],bins:[{id:'two',label:'Two pairs',value:2},{id:'none',label:'No pairs',value:0}],rule:'parallelPairs'}});
  const text = widgetSpeechText(shapes).join(' ');
  expect(text).toContain('Shape A');
  expect(text).not.toContain('Square');
});


test('keeps protection impact keys out of pre-check read-aloud', () => {
  const hazard = parse({type:'hazard-solution-designer',config:{hazard:'flood',solutions:[{id:'wall',label:'Barrier',effectiveness:'good',strengths:['blocks rising water'],limits:['needs upkeep'],impacts:['Rising water reaches homes.']},{id:'drain',label:'Drain',effectiveness:'partial',strengths:['carries water away'],limits:['can clog'],impacts:['Water pools on roads.']}],requiredIds:['wall'],requiredImpactIds:['Rising water reaches homes.']}});
  const spoken = widgetSpeechText(hazard).join(' ');
  expect(spoken).toContain('Barrier');
  expect(spoken).not.toContain('Rising water reaches homes.');
});
