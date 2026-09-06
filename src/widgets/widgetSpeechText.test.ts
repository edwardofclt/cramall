import { describe, expect, test } from 'vitest';
import { WidgetRefSchema, type WidgetRef } from '../content/schema';
import { widgetSpeechText } from './widgetSpeechText';

const parse = (value: unknown) => WidgetRefSchema.parse(value) as WidgetRef;

describe('widgetSpeechText', () => {
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
    expect(text).toContain('The author studies rivers.');
    expect(text).not.toContain('source-a');
    expect(text).not.toContain('credible-for-question');
    expect(text).not.toContain('supports');
  });
});
