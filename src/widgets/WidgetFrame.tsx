import { Component, Suspense, type ErrorInfo, type ReactNode } from 'react';
import { widgetRegistry } from './registry';

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
  /** Widget type from the lesson card, e.g. `place-value-builder`. */
  type: string;
  config: Record<string, unknown>;
};

/**
 * Loads a widget by type: lazily (so widget code stays out of the first paint) and behind
 * an error boundary (so a crash degrades to a friendly card). An unknown type is treated
 * the same as a crash — content referencing a widget nobody built still renders a lesson.
 */
export function WidgetFrame({ type, config }: WidgetFrameProps) {
  const Widget = widgetRegistry[type];
  if (!Widget) return <NappingWidget />;

  return (
    // Keying by type gives a swapped-in widget a fresh boundary instead of inheriting the
    // previous one's failed state.
    <WidgetErrorBoundary key={type}>
      <Suspense
        fallback={
          <div className="card widget-loading" data-testid="widget-loading">
            Getting the experiment ready…
          </div>
        }
      >
        <Widget config={config} />
      </Suspense>
    </WidgetErrorBoundary>
  );
}
