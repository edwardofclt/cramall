import { describe, expect, it } from 'vitest';
import { unit04Lessons } from '../content/reading/u04';
import { buildTutorContext, tutorLesson } from './context';

describe('tutor lesson grounding', () => {
  it('keeps the prototype source and concepts in sync with the authored lesson', () => {
    const lesson = unit04Lessons[0];
    const widget = lesson.learnCards[1].widget;
    if (widget?.type !== 'theme-evidence-collector') throw new Error('Expected theme activity');
    expect(tutorLesson.source).toEqual(widget.config.source);
    expect(tutorLesson.cards).toEqual(lesson.learnCards.map(card => ({ id: card.id, title: card.title, concepts: card.blocks.map(block => block.text) })));
    expect(tutorLesson.evidence).toEqual(widget.config.evidence.map(item => ({ id: item.id, quote: item.sourceQuote })));
  });

  it('sends the full passage and selected quotes without assessment keys', () => {
    const context = buildTutorContext('reading-u04-l01-c2', ['shares']) as Record<string, unknown>;
    expect(context.currentFocus).toBe('Gather Key Details');
    expect(context.selectedEvidence).toEqual(['carried over a tray of pepper seedlings']);
    expect(JSON.stringify(context)).toContain('Their two families began trading garden tasks and vegetables.');
    expect(JSON.stringify(context)).not.toMatch(/"(?:correctChoiceId|acceptedAnswers|correctOrder|quiz|supports)":/);
  });

  it('rejects nonexistent focus and evidence instead of accepting arbitrary context', () => {
    expect(() => buildTutorContext('other-lesson')).toThrow();
    expect(() => buildTutorContext('reading-u04-l01-c1', ['invented'])).toThrow();
  });
});
