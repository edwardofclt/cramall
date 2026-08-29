import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/** Every widget takes the raw `config` object its content card carries — nothing else. */
export type WidgetProps = { config: Record<string, unknown> };

/**
 * Widget type (as written in lesson content) → the component that draws it.
 *
 * Entries are `React.lazy` so a widget's code only downloads when a card actually shows
 * it. Keys must cover every `WIDGET_TYPES` entry in the content schema — a test asserts
 * it, so a new widget type cannot ship without something to render it.
 */
export const widgetRegistry: Record<string, LazyExoticComponent<ComponentType<WidgetProps>>> = {
  'place-value-builder': lazy(() => import('./math/PlaceValueBuilder')),
  'number-line-compare': lazy(() => import('./math/NumberLineCompare')),
};
