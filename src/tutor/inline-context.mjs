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
  let activity = stage.activity ? {type:stage.activity.type, materials:stage.activity.materials, stateAvailable:state !== undefined} : null;
  if (state !== undefined && !stage.activity) throw new Error('No activity in this stage');
  if (state !== undefined && !stage.activity.stateKind) throw new Error('Activity state is not supported');
  if (stage.activity?.type === 'place-value-builder') {
    if (state !== undefined && (!onlyKeys(state, ['value']) || !Number.isInteger(state.value) || state.value < 0 || state.value >= 10 ** stage.activity.columns)) throw new Error('Invalid number state');
    activity = { ...activity, target: stage.activity.target, currentValue: state?.value ?? null };
  }
  if (stage.activity?.type === 'theme-evidence-collector') {
    if (state !== undefined && (!onlyKeys(state, ['theme', 'evidenceIds']) || (state.theme !== null && !stage.activity.themeChoices.includes(state.theme)) || !Array.isArray(state.evidenceIds) || state.evidenceIds.length > stage.activity.evidence.length || state.evidenceIds.some(id => !stage.activity.evidence.some(item => item.id === id)))) throw new Error('Invalid evidence state');
    activity = { ...activity, selectedTheme: state?.theme ?? null, selectedEvidence: stage.activity.evidence.filter(item => state?.evidenceIds.includes(item.id)).map(item => item.quote) };
  }
  if (stage.activity?.stateKind === 'placements') {
    const {items, locations} = stage.activity;
    if (state !== undefined && (!onlyKeys(state, ['placements']) || !onlyKeys(state.placements, items.map(item => item.id)) || Object.values(state.placements).some(id => !locations.some(item => item.id === id)))) throw new Error('Invalid source placement');
    activity = {...activity, placements:Object.entries(state?.placements ?? {}).map(([itemId, locationId]) => ({item:items.find(item => item.id === itemId).label, location:locations.find(item => item.id === locationId).label}))};
  }
  return { lessonId: lesson.id, lessonTitle: lesson.title, subject: lesson.subject, lessonOverview:lesson.overview, guide: lesson.guide, stageKey: stage.key, currentFocus: stage.title, concepts: stage.text, source: stage.source ?? lesson.source, activity };
}
