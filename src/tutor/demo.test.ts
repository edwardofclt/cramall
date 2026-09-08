import { describe, expect, it } from 'vitest';
import { demoReply } from './demo';
import { tutorLesson } from './context';

describe('local tutor samples', () => {
  it('explains the idea briefly instead of reading the source', () => {
    const reply = demoReply('explain', '', 'reading-u04-l01-c1');
    expect(reply).toMatch(/topic/i);
    expect(reply).toMatch(/message/i);
    expect(reply.split(/\s+/).length).toBeLessThan(100);
    expect(reply).not.toContain('Mateo measured straight garden rows');
  });
  it('offers a different concrete example when asked to simplify', () => {
    const reply = demoReply('simplify', '', 'reading-u04-l01-c1');
    expect(reply).toMatch(/label|sticker/i);
    expect(reply).not.toBe(demoReply('explain', '', 'reading-u04-l01-c1'));
  });
  it('explains a topic misconception using the actual question', () => {
    expect(demoReply('question', "Why isn't gardening a theme?", 'reading-u04-l01-c1')).toMatch(/gardening.*topic/is);
    expect(demoReply('question', "I don't understand", 'reading-u04-l01-c1')).toMatch(/label|sticker/i);
  });
  it('connects coaching to the learner-selected quotation', () => {
    const reply = demoReply('question', 'Does my evidence fit?', 'reading-u04-l01-c2', ['measures']);
    expect(reply).toContain('Mateo measured straight garden rows');
    expect(reply).toMatch(/planning/i);
    expect(reply).not.toMatch(/correct answer/i);
  });
  it('reads the complete source only on an explicit request', () => {
    expect(demoReply('read', '', 'reading-u04-l01-c1')).toBe(tutorLesson.source.text);
    expect(demoReply('question', 'Please read the story', 'reading-u04-l01-c1')).toBe(tutorLesson.source.text);
  });
  it('identifies unsupported questions as a sample limitation', () => {
    expect(demoReply('question', 'How does a satellite work?', 'reading-u04-l01-c1')).toMatch(/sample.*live/is);
  });
  it.each(["I read the story but I don't understand", "Please don't read the story, explain the theme", 'Do not read the page'])('does not mistake %s for a reading request', question => {
    expect(demoReply('question', question, 'reading-u04-l01-c1')).not.toBe(tutorLesson.source.text);
  });
  it('gives a strategy instead of promising quiz answers', () => {
    expect(demoReply('question', 'Give me the quiz answers', 'reading-u04-l01-c1')).toMatch(/hint|strategy/i);
  });
});
