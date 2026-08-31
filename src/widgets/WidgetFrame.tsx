import { Component, Suspense, type ErrorInfo, type ReactNode } from 'react';
import type { WidgetConfig, WidgetType } from '../content/schema';
import { widgetRegistry, type WidgetEventHandler } from './registry';

/** A widget that breaks is never allowed to break the lesson — this is what shows instead. */
function NappingWidget() {
  return (
    <div className="card widget-napping" data-testid="widget-napping">
      <span aria-hidden="true">😴</span> This experiment is napping. Keep going — you can still
      finish the lesson!
    </div>
  );
}

type BoundaryProps = { children: ReactNode };
type BoundaryState = { failed: boolean };

class WidgetErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Nothing the kid can do about it; leave a breadcrumb for whoever writes the widget.
    console.error('Widget crashed:', error, info.componentStack);
  }

  render() {
    return this.state.failed ? <NappingWidget /> : this.props.children;
  }
}

export type WidgetFrameProps = {
  [T in WidgetType]: { type: T; config: WidgetConfig<T>; onEvent: WidgetEventHandler<T> };
}[WidgetType];

function RenderWidget(ref: WidgetFrameProps) {
  switch (ref.type) {
    case 'place-value-builder': {
      const Widget = widgetRegistry['place-value-builder'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'number-line-compare': {
      const Widget = widgetRegistry['number-line-compare'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'base-ten-blocks': {
      const Widget = widgetRegistry['base-ten-blocks'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'fraction-models': {
      const Widget = widgetRegistry['fraction-models'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'area-model-multiplier': {
      const Widget = widgetRegistry['area-model-multiplier'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'array-builder': {
      const Widget = widgetRegistry['array-builder'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'money-counter': {
      const Widget = widgetRegistry['money-counter'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'clock-elapsed-time': {
      const Widget = widgetRegistry['clock-elapsed-time'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'quarter-inch-ruler': {
      const Widget = widgetRegistry['quarter-inch-ruler'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'balance-scale': {
      const Widget = widgetRegistry['balance-scale'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'shape-classifier': {
      const Widget = widgetRegistry['shape-classifier'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'data-plot-builder': {
      const Widget = widgetRegistry['data-plot-builder'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'probability-spinner': {
      const Widget = widgetRegistry['probability-spinner'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'collision-ramp': {
      const Widget = widgetRegistry['collision-ramp'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'energy-transfer-builder': {
      const Widget = widgetRegistry['energy-transfer-builder'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    case 'wave-maker': {
      const Widget = widgetRegistry['wave-maker'];
      return <Widget config={ref.config} onEvent={ref.onEvent} />;
    }
    default: {
      const exhaustive: never = ref;
      void exhaustive;
      return <NappingWidget />;
    }
  }
}

/**
 * Loads a widget by type: lazily (so widget code stays out of the first paint) and behind
 * an error boundary (so a crash degrades to a friendly card). An unknown type is treated
 * the same as a crash — content referencing a widget nobody built still renders a lesson.
 */
export function WidgetFrame(ref: WidgetFrameProps) {
  return (
    // Keying by type gives a swapped-in widget a fresh boundary instead of inheriting the
    // previous one's failed state.
    <WidgetErrorBoundary key={ref.type}>
      <Suspense
        fallback={
          <div className="card widget-loading" data-testid="widget-loading">
            Getting the experiment ready…
          </div>
        }
      >
        <RenderWidget {...ref} />
      </Suspense>
    </WidgetErrorBoundary>
  );
}
