export type GuideSelection = { lessonId: string; stageKey: string; activity?: { value?: number; theme?: string | null; evidenceIds?: string[]; placements?: Record<string,string> } };
export type InlineSource = {title: string; text: string};
export type InlineActivity = {
  type: string; materials: string[]; stateKind?: 'number' | 'theme' | 'placements';
  target?: number; columns?: number; themeChoices?: string[]; evidence?: {id: string; quote: string}[];
  items?: {id:string; label:string}[]; locations?: {id:string; label:string}[];
};
export type InlineLesson = {
  id: string; title: string; subject: string; overview: string[]; guide: {id: 'winnie' | 'nutty' | 'sandy' | 'pip'; name: string}; source: InlineSource | null;
  stages: {key: string; title: string; text: string[]; source?: InlineSource; activity?: InlineActivity}[];
};
export type InlineContext = {
  lessonId: string; lessonTitle: string; subject: string; lessonOverview: string[]; guide: InlineLesson['guide']; stageKey: string; currentFocus: string; concepts: string[]; source: InlineSource | null;
  activity: {type: string; materials: string[]; stateAvailable: boolean; target?: number; currentValue?: number | null; selectedTheme?: string | null; selectedEvidence?: string[]; placements?: {item:string;location:string}[]} | null;
};
export function getInlineLesson(id: string): InlineLesson | undefined;
export function buildInlineContext(selection: GuideSelection): InlineContext;
