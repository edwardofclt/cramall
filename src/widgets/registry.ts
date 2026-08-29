import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { WidgetConfig, WidgetType } from '../content/schema';

export type WidgetEvent =
  | { type: 'interaction'; action: 'change-place' | 'reset' | 'move-marker' | 'choose-comparison' }
  | { type: 'change'; value: number | { a: number; b: number; choice: '<' | '=' | '>' | null } }
  | { type: 'complete'; value: number | { a: number; b: number; choice: '<' | '=' | '>' } };

export type WidgetEventHandler = (event: WidgetEvent) => void;

/** Every widget receives only its schema-validated config plus the shared event channel. */
export type WidgetProps<T extends WidgetType = WidgetType> = {
  config: WidgetConfig<T>;
  onEvent: WidgetEventHandler;
};

type RegisteredWidget = LazyExoticComponent<ComponentType<WidgetProps>>;

/**
 * Widget type (as written in lesson content) → the component that draws it.
 *
 * Entries are `React.lazy` so a widget's code only downloads when a card actually shows
 * it. Keys must cover every `WIDGET_TYPES` entry in the content schema — a test asserts
 * it, so a new widget type cannot ship without something to render it.
 */
export const widgetRegistry: Record<WidgetType, RegisteredWidget> = {
  'place-value-builder': lazy(() => import('./math/PlaceValueBuilder')) as RegisteredWidget,
  'number-line-compare': lazy(() => import('./math/NumberLineCompare')) as RegisteredWidget,
};
