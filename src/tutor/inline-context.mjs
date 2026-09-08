import { inlineLessons } from './inline-manifest.mjs';

export function getInlineLesson(id) { return inlineLessons.find(lesson => lesson.id === id); }
function onlyKeys(value, keys) {
  return value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).every(key => keys.includes(key));
}
export function buildInlineContext(selection) {
  if (!onlyKeys(selection, ['lessonId', 'stageKey', 'activity'])) throw new Error('Invalid guide context');
  const lesson = getInlineLesson(selection.lessonId);
  const stage = lesson?.stages.find(item => item.key === selection.stageKey);
  if (!lesson || !stage) throw new Error('Unsupported lesson stage');
  const state = selection.activity;
  let activity = null;
  if (state !== undefined && !stage.activity) throw new Error('No activity in this stage');
  if (stage.activity?.type === 'place-value-builder') {
    if (state !== undefined && (!onlyKeys(state, ['value']) || !Number.isInteger(state.value) || state.value < 0 || state.value >= 10 ** stage.activity.columns)) throw new Error('Invalid number state');
    activity = { type: stage.activity.type, target: stage.activity.target, currentValue: state?.value ?? null };
  }
  if (stage.activity?.type === 'theme-evidence-collector') {
    if (state !== undefined && (!onlyKeys(state, ['theme', 'evidenceIds']) || (state.theme !== null && !stage.activity.themeChoices.includes(state.theme)) || !Array.isArray(state.evidenceIds) || state.evidenceIds.length > stage.activity.evidence.length || state.evidenceIds.some(id => !stage.activity.evidence.some(item => item.id === id)))) throw new Error('Invalid evidence state');
    activity = { type: stage.activity.type, selectedTheme: state?.theme ?? null, selectedEvidence: stage.activity.evidence.filter(item => state?.evidenceIds.includes(item.id)).map(item => item.quote) };
  }
  return { lessonId: lesson.id, lessonTitle: lesson.title, subject: lesson.subject, guide: lesson.guide, stageKey: stage.key, currentFocus: stage.title, concepts: stage.text, source: stage.source ?? lesson.source, activity };
}
