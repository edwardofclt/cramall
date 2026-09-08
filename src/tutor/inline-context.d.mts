export type GuideSelection = { lessonId: string; stageKey: string; activity?: { value?: number; theme?: string | null; evidenceIds?: string[] } };
export type InlineSource = {title: string; text: string};
export type InlineLesson = {
  id: string; title: string; subject: string; guide: {id: 'winnie' | 'nutty'; name: string}; source: InlineSource | null;
  stages: {key: string; title: string; text: string[]; source?: InlineSource; activity?: {type: string; target?: number; columns?: number; themeChoices?: string[]; evidence?: {id: string; quote: string}[]}}[];
};
export type InlineContext = {
  lessonId: string; lessonTitle: string; subject: string; guide: InlineLesson['guide']; stageKey: string; currentFocus: string; concepts: string[]; source: InlineSource | null;
  activity: {type: string; target?: number; currentValue?: number | null; selectedTheme?: string | null; selectedEvidence?: string[]} | null;
};
export function getInlineLesson(id: string): InlineLesson | undefined;
export function buildInlineContext(selection: GuideSelection): InlineContext;
