import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { WidgetConfig, WidgetType } from '../content/schema';

type BaseTenValue = {
  ones: number;
  tens: number;
  hundreds: number;
  thousands: number;
  value: number;
};

type MoneyCounts = Record<'1' | '5' | '10' | '25' | '100', number>;
type MoneyValue = { totalCents: number; counts: MoneyCounts };
type ClockValue = { hour: number; minute: number; totalMinutes: number };
type BalanceValue = { leftTotal: number; rightTotal: number };
type LightValue = { incidentAngle: number; reflectionAngle: number };

export type WidgetEventMap = {
  'place-value-builder':
    | { type: 'interaction'; action: 'change-place' | 'reset' }
    | { type: 'change'; value: number }
    | { type: 'complete'; value: number };
  'number-line-compare':
    | { type: 'interaction'; action: 'move-marker' | 'choose-comparison' }
    | { type: 'change'; value: { a: number; b: number; choice: '<' | '=' | '>' | null } }
    | { type: 'complete'; value: { a: number; b: number; choice: '<' | '=' | '>' } };
  'base-ten-blocks':
    | { type: 'interaction'; action: 'add-block' | 'remove-block' | 'regroup' | 'reset' }
    | { type: 'change'; value: BaseTenValue }
    | { type: 'complete'; value: BaseTenValue };
  'fraction-models':
    | { type: 'interaction'; action: 'select-piece' | 'clear-model' }
    | { type: 'change'; value: { numerator: number; denominator: number } }
    | { type: 'complete'; value: { numerator: number; denominator: number; equivalent: boolean } };
  'area-model-multiplier':
    | { type: 'interaction'; action: 'select-cell' | 'reset' }
    | { type: 'change'; value: { selectedCells: number; product: number } }
    | { type: 'complete'; value: { product: number } };
  'array-builder':
    | { type: 'interaction'; action: 'change-rows' | 'change-columns' | 'reset' }
    | { type: 'change'; value: { rows: number; columns: number; product: number } }
    | { type: 'complete'; value: { rows: number; columns: number; product: number } };
  'money-counter':
    | { type: 'interaction'; action: 'add-coin' | 'remove-coin' | 'reset' }
    | { type: 'change'; value: MoneyValue }
    | { type: 'complete'; value: MoneyValue };
  'clock-elapsed-time':
    | { type: 'interaction'; action: 'change-hour' | 'change-minute' | 'reset' }
    | { type: 'change'; value: ClockValue }
    | { type: 'complete'; value: ClockValue };
  'quarter-inch-ruler':
    | { type: 'interaction'; action: 'move-marker' | 'reset' }
    | { type: 'change'; value: { inches: number } }
    | { type: 'complete'; value: { inches: number } };
  'balance-scale':
    | { type: 'interaction'; action: 'add-weight' | 'remove-weight' | 'check' | 'reset' }
    | { type: 'change'; value: BalanceValue }
    | { type: 'complete'; value: BalanceValue };
  'shape-classifier':
    | { type: 'interaction'; action: 'select-shape' | 'place-shape' | 'reset' }
    | { type: 'change'; value: { placements: Record<string, string> } }
    | { type: 'complete'; value: { placements: Record<string, string> } }
    | { type: 'change'; value: { memberships: Record<string, string[]> } }
    | { type: 'complete'; value: { memberships: Record<string, string[]> } };
  'data-plot-builder':
    | { type: 'interaction'; action: 'increase-value' | 'decrease-value' | 'reset' }
    | { type: 'change'; value: { values: Record<string, number> } }
    | { type: 'complete'; value: { values: Record<string, number> } };
  'probability-spinner':
    | { type: 'interaction'; action: 'spin' | 'reset' }
    | { type: 'change'; value: { outcomeId: string | null; counts: Record<string, number> } }
    | { type: 'complete'; value: { outcomeId: string; counts: Record<string, number> } };
  'collision-ramp':
    | { type: 'interaction'; action: 'change-angle' | 'change-speed' | 'run' | 'choose-prediction' | 'reset' }
    | { type: 'change'; value: { rampAngle: number; speedA: number; speedB: number } }
    | { type: 'complete'; value: { prediction: 'left' | 'right' | 'same'; correct: boolean } };
  'energy-transfer-builder':
    | { type: 'interaction'; action: 'append-path' | 'reset' }
    | { type: 'change'; value: { path: string[] } }
    | { type: 'complete'; value: { path: string[] } };
  'wave-maker':
    | { type: 'interaction'; action: 'change-amplitude' | 'change-frequency' | 'reset' }
    | { type: 'change'; value: { amplitude: number; frequency: number } }
    | { type: 'complete'; value: { amplitude: number; frequency: number } };
  'light-reflection-eye':
    | { type: 'interaction'; action: 'change-angle' | 'check' | 'reset' }
    | { type: 'change'; value: LightValue }
    | { type: 'complete'; value: LightValue };
  'message-sender':
    | { type: 'interaction'; action: 'append-symbol' | 'remove-symbol' | 'send' | 'reset' }
    | { type: 'change'; value: { encoded: string } }
    | { type: 'complete'; value: { encoded: string; decoded: string } };
  'energy-conversion-designer':
    | { type: 'interaction'; action: 'append-chain' | 'reset' }
    | { type: 'change'; value: { chain: string[] } }
    | { type: 'complete'; value: { chain: string[] } };
  'animal-structure-matcher':
    | { type: 'interaction'; action: 'select-structure' | 'match' | 'reset' }
    | { type: 'change'; value: { matches: Record<string, string> } }
    | { type: 'complete'; value: { matches: Record<string, string> } };
  'erosion-simulator':
    | { type: 'interaction'; action: 'select-agent' | 'toggle-vegetation' | 'run' | 'reset' }
    | { type: 'change'; value: { agent: string; vegetation: boolean } }
    | { type: 'complete'; value: { agent: string; vegetation: boolean } };
  'rock-layer-explorer':
    | { type: 'interaction'; action: 'select-layer' | 'check' | 'reset' }
    | { type: 'change'; value: { selectedLayerId: string | null } }
    | { type: 'complete'; value: { selectedLayerId: string } };
  'topographic-map-explorer':
    | { type: 'interaction'; action: 'select-point' | 'check' | 'reset' }
    | { type: 'change'; value: { selectedPointId: string | null } }
    | { type: 'complete'; value: { selectedPointId: string } };
  'hazard-solution-designer':
    | { type: 'interaction'; action: 'toggle-solution' | 'check' | 'reset' }
    | { type: 'change'; value: { selectedIds: string[] } }
    | { type: 'complete'; value: { selectedIds: string[] } };
  'resource-sorter':
    | { type: 'interaction'; action: 'select-item' | 'place-item' | 'reset' }
    | { type: 'change'; value: { placements: Record<string, string> } }
    | { type: 'complete'; value: { placements: Record<string, string> } };
  'word-root-builder':
    | { type: 'interaction'; action: 'select-prefix' | 'select-root' | 'select-suffix' | 'check' | 'reset' }
    | { type: 'change'; value: { parts: string[]; word: string } }
    | { type: 'complete'; value: { word: string; meaning: string } };
  'context-clue-detective':
    | { type: 'interaction'; action: 'choose-clue' | 'reset' }
    | { type: 'change'; value: { choiceId: string | null } }
    | { type: 'complete'; value: { choiceId: string } };
  'story-elements-mapper':
    | { type: 'interaction'; action: 'change-field' | 'check' | 'reset' }
    | { type: 'change'; value: { entries: Record<string,string> } }
    | { type: 'complete'; value: { entries: Record<string,string> } };
  'theme-evidence-collector':
    | {type:'interaction';action:'choose-theme'|'toggle-evidence'|'reset'}
    | {type:'change';value:{theme:string|null;evidenceIds:string[]}}
    | {type:'complete';value:{theme:string;evidenceIds:string[]}};
  'central-idea-organizer':
    | {type:'interaction';action:'choose-main-idea'|'toggle-detail'|'reset'}
    | {type:'change';value:{mainIdea:string|null;detailIds:string[]}}
    | {type:'complete';value:{mainIdea:string;detailIds:string[]}};
  'text-structure-sorter':
    | {type:'interaction';action:'select-excerpt'|'place-structure'|'reset'}
    | {type:'change';value:{placements:Record<string,string>}}
    | {type:'complete';value:{placements:Record<string,string>}};
  'summary-builder':
    | {type:'interaction';action:'toggle-sentence'|'reset'}
    | {type:'change';value:{selectedIds:string[];composition?:string}}
    | {type:'complete';value:{selectedIds:string[];composition?:string}};
  'pov-switcher':
    | {type:'interaction';action:'select-pronoun'|'apply'|'reset'}
    | {type:'change';value:{selectedPronouns:string[]}}
    | {type:'complete';value:{rewrittenText:string}};
  'figurative-language-matcher':
    | {type:'interaction';action:'select-phrase'|'match'|'reset'}
    | {type:'change';value:{matches:Record<string,string>}}
    | {type:'complete';value:{matches:Record<string,string>}};
  'source-credibility-checker':
    | {type:'interaction';action:'rate-source'|'select-reason'|'check'|'reset'}
    | {type:'change';value:{ratings:Record<string,'credible'|'needs-checking'|'credible-for-question'>;reasons?:Record<string,string[]>}}
    | {type:'complete';value:{ratings:Record<string,'credible'|'needs-checking'|'credible-for-question'>;reasons?:Record<string,string[]>}};
};

export type CoachCue = 'strategy' | 'retry' | 'milestone';
export type WidgetCoachEvent = { type: 'coach'; cue: CoachCue };
export type WidgetEvent<T extends WidgetType = WidgetType> = WidgetEventMap[T] | WidgetCoachEvent;
export type WidgetEventHandler<T extends WidgetType = WidgetType> = (event: WidgetEvent<T>) => void;
export type WidgetProps<T extends WidgetType = WidgetType> = {
  config: WidgetConfig<T>;
  onEvent: WidgetEventHandler<T>;
};
export type WidgetRegistry = {
  [T in WidgetType]: LazyExoticComponent<ComponentType<WidgetProps<T>>>;
};

/**
 * Widget type (as written in lesson content) → the component that draws it.
 *
 * Entries are `React.lazy` so a widget's code only downloads when a card actually shows
 * it. Keys must cover every `WIDGET_TYPES` entry in the content schema — a test asserts
 * it, so a new widget type cannot ship without something to render it.
 */
export const widgetRegistry = {
  'place-value-builder': lazy(() => import('./math/PlaceValueBuilder')),
  'number-line-compare': lazy(() => import('./math/NumberLineCompare')),
  'base-ten-blocks': lazy(() => import('./math/BaseTenBlocks')),
  'fraction-models': lazy(() => import('./math/FractionModels')),
  'area-model-multiplier': lazy(() => import('./math/AreaModelMultiplier')),
  'array-builder': lazy(() => import('./math/ArrayBuilder')),
  'money-counter': lazy(() => import('./math/MoneyCounter')),
  'clock-elapsed-time': lazy(() => import('./math/ClockElapsedTime')),
  'quarter-inch-ruler': lazy(() => import('./math/QuarterInchRuler')),
  'balance-scale': lazy(() => import('./math/BalanceScale')),
  'shape-classifier': lazy(() => import('./math/ShapeClassifier')),
  'data-plot-builder': lazy(() => import('./math/DataPlotBuilder')),
  'probability-spinner': lazy(() => import('./math/ProbabilitySpinner')),
  'collision-ramp': lazy(() => import('./science/CollisionRamp')),
  'energy-transfer-builder': lazy(() => import('./science/EnergyTransferBuilder')),
  'wave-maker': lazy(() => import('./science/WaveMaker')),
  'light-reflection-eye': lazy(() => import('./science/LightReflectionEye')),
  'message-sender': lazy(() => import('./science/MessageSender')),
  'energy-conversion-designer': lazy(() => import('./science/EnergyConversionDesigner')),
  'animal-structure-matcher': lazy(() => import('./science/AnimalStructureMatcher')),
  'erosion-simulator': lazy(() => import('./science/ErosionSimulator')),
  'rock-layer-explorer': lazy(() => import('./science/RockLayerExplorer')),
  'topographic-map-explorer': lazy(() => import('./science/TopographicMapExplorer')),
  'hazard-solution-designer': lazy(() => import('./science/HazardSolutionDesigner')),
  'resource-sorter': lazy(() => import('./science/ResourceSorter')),
  'word-root-builder': lazy(() => import('./reading/WordRootBuilder')),
  'context-clue-detective': lazy(() => import('./reading/ContextClueDetective')),
  'story-elements-mapper': lazy(() => import('./reading/StoryElementsMapper')),
  'theme-evidence-collector': lazy(() => import('./reading/ThemeEvidenceCollector')),
  'central-idea-organizer': lazy(() => import('./reading/CentralIdeaOrganizer')),
  'text-structure-sorter': lazy(() => import('./reading/TextStructureSorter')),
  'summary-builder': lazy(() => import('./reading/SummaryBuilder')),
  'pov-switcher': lazy(() => import('./reading/PovSwitcher')),
  'figurative-language-matcher': lazy(() => import('./reading/FigurativeLanguageMatcher')),
  'source-credibility-checker': lazy(() => import('./reading/SourceCredibilityChecker')),
} satisfies WidgetRegistry;
