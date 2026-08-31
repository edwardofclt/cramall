import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

const normalizeTime = (total: number) => (total + 1440) % 1440;
const parseTime = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
const clockValue = (total: number) => ({
  hour: Math.floor(total / 60) % 24,
  minute: total % 60,
  totalMinutes: total,
});

function formatClock(total: number) {
  const { hour, minute } = clockValue(normalizeTime(total));
  return `${((hour + 11) % 12) + 1}:${String(minute).padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
}

function AnalogClock({ totalMinutes }: { totalMinutes: number }) {
  const normalized = normalizeTime(totalMinutes);
  const { hour, minute } = clockValue(normalized);
  const label = formatClock(normalized);
  const hourRotation = (hour % 12) * 30 + minute / 2;
  const minuteRotation = minute * 6;
  const markerPoint = (hourNumber: number) => {
    const angle = (hourNumber * 30 - 90) * (Math.PI / 180);
    return { x: 50 + 39 * Math.cos(angle), y: 50 + 39 * Math.sin(angle) };
  };

  return (
    <svg
      className="clock-face"
      data-testid="analog-clock"
      role="img"
      aria-label={`Analog clock showing ${label}`}
      viewBox="0 0 100 100"
    >
      <circle className="clock-rim" cx="50" cy="50" r="46" />
      {Array.from({ length: 12 }, (_, index) => {
        const hourNumber = index + 1;
        const point = markerPoint(hourNumber);
        return (
          <text
            className="clock-hour-marker"
            data-testid="clock-hour-marker"
            key={hourNumber}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="central"
            aria-hidden="true"
          >
            {hourNumber}
          </text>
        );
      })}
      <line
        className="clock-hour-hand"
        data-testid="clock-hour-hand"
        x1="50"
        y1="50"
        x2="50"
        y2="29"
        transform={`rotate(${hourRotation} 50 50)`}
        aria-hidden="true"
      />
      <line
        className="clock-minute-hand"
        data-testid="clock-minute-hand"
        x1="50"
        y1="50"
        x2="50"
        y2="14"
        transform={`rotate(${minuteRotation} 50 50)`}
        aria-hidden="true"
      />
      <circle className="clock-center" cx="50" cy="50" r="3" aria-hidden="true" />
    </svg>
  );
}

export default function ClockElapsedTime({ config, onEvent }: WidgetProps<'clock-elapsed-time'>) {
  const key = JSON.stringify(config);
  const step = config.minuteStep ?? 5;
  const [minutes, setMinutes] = useState(0);
  const { completed, completeOnce } = useCompletionLatch(key);
  const elapsed = config.mode === 'elapsed'
    ? normalizeTime(parseTime(config.startTime) + config.elapsedMinutes)
    : 0;
  const target = config.mode === 'set-time' ? parseTime(config.targetTime) : null;
  const shown = config.mode === 'elapsed' ? elapsed : minutes;

  useEffect(() => setMinutes(0), [key]);

  const commit = (next: number, action: 'change-hour' | 'change-minute' | 'reset') => {
    const normalized = normalizeTime(next);
    const value = clockValue(normalized);
    setMinutes(normalized);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value });
    if (target !== null && normalized === target) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
  };

  return (
    <section
      className="card widget-experiment clock"
      data-testid="widget-clock-elapsed-time"
      data-state={config.mode === 'elapsed' ? 'result' : completed ? 'complete' : 'setting'}
      data-complete={completed ? 'yes' : 'no'}
    >
      {config.mode === 'set-time' && (
        <div className="clock-controls" aria-label="Set clock controls">
          <button aria-label="Decrease hour" onClick={() => commit(minutes - 60, 'change-hour')}>− hour</button>
          <button aria-label="Increase hour" onClick={() => commit(minutes + 60, 'change-hour')}>+ hour</button>
          <button aria-label="Decrease minute" onClick={() => commit(minutes - step, 'change-minute')}>− minute</button>
          <button aria-label="Increase minute" onClick={() => commit(minutes + step, 'change-minute')}>+ minute</button>
          <button onClick={() => commit(0, 'reset')}>Start over</button>
        </div>
      )}
      <AnalogClock totalMinutes={shown} />
      <output data-testid="clock-result">{formatClock(shown)}</output>
      <p role="status">
        {config.mode === 'elapsed'
          ? `Elapsed-time result: ${formatClock(shown)}.`
          : completed
            ? 'Target time complete.'
            : `Clock shows ${formatClock(shown)}.`}
      </p>
    </section>
  );
}
