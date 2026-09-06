import { useEffect, useRef, useState } from 'react';
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

function AnalogClock({ totalMinutes, testId = 'analog-clock', label = formatClock(totalMinutes) }: {
  totalMinutes: number;
  testId?: string;
  label?: string;
}) {
  const normalized = normalizeTime(totalMinutes);
  const { hour, minute } = clockValue(normalized);
  const hourRotation = (hour % 12) * 30 + minute / 2;
  const minuteRotation = minute * 6;
  const markerPoint = (hourNumber: number) => {
    const angle = (hourNumber * 30 - 90) * (Math.PI / 180);
    return { x: 50 + 39 * Math.cos(angle), y: 50 + 39 * Math.sin(angle) };
  };

  return (
    <svg
      className="clock-face"
      data-testid={testId}
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

type Jump = { from: number; minutes: number; to: number };

export default function ClockElapsedTime({ config, onEvent }: WidgetProps<'clock-elapsed-time'>) {
  const key = JSON.stringify(config);
  const step = config.minuteStep ?? 5;
  const [minutes, setMinutes] = useState(0);
  const [progress, setProgress] = useState(0);
  const [jumps, setJumps] = useState<Jump[]>([]);
  const milestoneSent = useRef(false);
  const { completed, completeOnce } = useCompletionLatch(key);
  const interactiveElapsed = config.mode === 'elapsed' && config.jumpMinutes !== undefined;
  const start = config.mode === 'elapsed' ? parseTime(config.startTime) : 0;
  const target = config.mode === 'set-time' ? parseTime(config.targetTime) : null;
  const targetElapsed = config.mode === 'elapsed' ? config.elapsedMinutes : 0;
  const elapsedResult = config.mode === 'elapsed'
    ? normalizeTime(start + targetElapsed)
    : 0;
  const currentElapsed = start + progress;
  const shown = config.mode === 'elapsed'
    ? interactiveElapsed ? currentElapsed : elapsedResult
    : minutes;
  const matchesCurrentTarget = target !== null && minutes === target;
  const visiblyComplete = config.mode === 'elapsed'
    ? interactiveElapsed && completed && progress === targetElapsed
    : completed && matchesCurrentTarget;

  useEffect(() => {
    setMinutes(0);
    setProgress(0);
    setJumps([]);
    milestoneSent.current = false;
  }, [key]);

  const commitSetTime = (next: number, action: 'change-hour' | 'change-minute' | 'reset') => {
    const normalized = normalizeTime(next);
    const value = clockValue(normalized);
    setMinutes(normalized);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value });
    if (target !== null && normalized === target) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
  };

  const commitJump = (jumpMinutes: number) => {
    const remaining = targetElapsed - progress;
    if (jumpMinutes > remaining) {
      onEvent({ type: 'interaction', action: 'change-minute' });
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }

    const nextProgress = progress + jumpMinutes;
    const from = currentElapsed;
    const to = start + nextProgress;
    const value = clockValue(normalizeTime(to));
    setProgress(nextProgress);
    setJumps((current) => [...current, { from, minutes: jumpMinutes, to }]);
    onEvent({ type: 'interaction', action: 'change-minute' });
    onEvent({ type: 'change', value });

    if (Math.floor(normalizeTime(from) / 60) !== Math.floor(normalizeTime(to) / 60) && !milestoneSent.current) {
      milestoneSent.current = true;
      onEvent({ type: 'coach', cue: 'milestone' });
    }
    if (nextProgress === targetElapsed) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
  };

  const resetElapsed = () => {
    const hadJumps = jumps.length > 0 || progress > 0;
    setProgress(0);
    setJumps([]);
    milestoneSent.current = false;
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: clockValue(normalizeTime(start)) });
    if (hadJumps) onEvent({ type: 'coach', cue: 'retry' });
  };

  if (interactiveElapsed) {
    const remaining = Math.max(0, targetElapsed - progress);
    return (
      <section
        className="card widget-experiment clock"
        data-testid="widget-clock-elapsed-time"
        data-state={visiblyComplete ? 'complete' : 'building'}
        data-complete={visiblyComplete ? 'yes' : 'no'}
      >
        <div className="clock-display" aria-label="Elapsed time clocks">
          <div>
            <strong>Start</strong>
            <AnalogClock totalMinutes={start} testId="clock-start" />
            <output data-testid="clock-start-result">{formatClock(start)}</output>
          </div>
          <div>
            <strong>Current</strong>
            <AnalogClock totalMinutes={shown} testId="clock-current" />
            <output data-testid="clock-current-result">{formatClock(shown)}</output>
          </div>
          {visiblyComplete && (
            <div>
              <strong>End</strong>
              <AnalogClock totalMinutes={start + targetElapsed} testId="clock-end" />
              <output data-testid="clock-end-result">{formatClock(start + targetElapsed)}</output>
            </div>
          )}
        </div>
        <div className="clock-controls" aria-label="Elapsed time jump controls">
          {(config.jumpMinutes ?? []).map((jump) => (
            <button
              key={jump}
              disabled={jump > remaining || visiblyComplete}
              aria-label={`Add ${jump} minutes`}
              onPointerDown={() => {
                if (jump > remaining && !visiblyComplete) commitJump(jump);
              }}
              onClick={() => commitJump(jump)}
            >
              Add {jump} minutes
            </button>
          ))}
          <button onClick={resetElapsed}>Start over</button>
        </div>
        <div className="clock-jump-history" aria-label="Elapsed-time jumps">
          {jumps.length > 0 ? jumps.map((jump, index) => (
            <p key={`${jump.from}-${jump.to}`} data-testid={`clock-jump-${index + 1}`}>
              {formatClock(jump.from)} → {jump.minutes} minutes → {formatClock(jump.to)}
            </p>
          )) : <p>No jumps yet—choose a friendly interval to move forward.</p>}
        </div>
        <p role="status" aria-live="polite">
          {visiblyComplete
            ? `Elapsed time complete: ${formatClock(start + targetElapsed)}.`
            : `${remaining} minute${remaining === 1 ? '' : 's'} remaining. Choose a jump no larger than the remaining interval.`}
        </p>
      </section>
    );
  }

  return (
    <section
      className="card widget-experiment clock"
      data-testid="widget-clock-elapsed-time"
      data-state={config.mode === 'elapsed' ? 'result' : visiblyComplete ? 'complete' : 'setting'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
      {config.mode === 'set-time' && (
        <div className="clock-controls" aria-label="Set clock controls">
          <button aria-label="Decrease hour" onClick={() => commitSetTime(minutes - 60, 'change-hour')}>− hour</button>
          <button aria-label="Increase hour" onClick={() => commitSetTime(minutes + 60, 'change-hour')}>+ hour</button>
          <button aria-label="Decrease minute" onClick={() => commitSetTime(minutes - step, 'change-minute')}>− minute</button>
          <button aria-label="Increase minute" onClick={() => commitSetTime(minutes + step, 'change-minute')}>+ minute</button>
          <button onClick={() => commitSetTime(0, 'reset')}>Start over</button>
        </div>
      )}
      <AnalogClock totalMinutes={shown} />
      <output data-testid="clock-result">{formatClock(shown)}</output>
      <p role="status">
        {config.mode === 'elapsed'
          ? `Elapsed-time result: ${formatClock(shown)}.`
          : visiblyComplete
            ? 'Target time complete.'
            : `Clock shows ${formatClock(shown)}.`}
      </p>
    </section>
  );
}
