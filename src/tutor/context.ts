import lesson from './lesson-context.json';
export const tutorLesson = lesson;
export function buildTutorContext(cardId: string, evidenceIds: string[] = []) {
  const card = lesson.cards.find(item => item.id === cardId);
  if (!card || evidenceIds.some(id => !lesson.evidence.some(item => item.id === id))) {
    throw new Error('Unknown tutor focus or evidence');
  }
  return {
    lesson: lesson.title,
    currentFocus: card.title,
    concepts: card.concepts,
    source: lesson.source,
    selectedEvidence: lesson.evidence.filter(item => evidenceIds.includes(item.id)).map(item => item.quote),
  };
}
