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
};

export type WidgetEvent<T extends WidgetType = WidgetType> = WidgetEventMap[T];
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
} satisfies WidgetRegistry;
