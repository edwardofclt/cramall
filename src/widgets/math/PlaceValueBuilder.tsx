import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';
import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { springy } from '../../app/motion';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { WidgetProps } from '../registry';

/* -- number words --------------------------------------------------------- */

const SMALL = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/** Words for 1–999 — the piece every period repeats. */
function periodToWords(n: number): string {
  const parts: string[] = [];
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;

  if (hundreds > 0) parts.push(`${SMALL[hundreds]} hundred`);
  if (rest > 0 && rest < 20) parts.push(SMALL[rest]!);
  else if (rest >= 20) {
    const tens = Math.floor(rest / 10);
    const ones = rest % 10;
    // US convention: hyphenate the compound tens, no "and" anywhere.
    parts.push(ones > 0 ? `${TENS[tens]}-${SMALL[ones]}` : TENS[tens]!);
  }
  return parts.join(' ');
}

/**
 * US short-scale word form for 0 – 999,999,999 (every number these columns can build).
 * Anything outside that range or not a whole number reads as "zero" rather than throwing —
 * a widget must never take a lesson down.
 */
export function numberToWords(value: number): string {
  if (!Number.isFinite(value)) return 'zero';
  const n = Math.trunc(Math.abs(value));
  if (n === 0 || n > 999_999_999) return 'zero';

  const groups: Array<[number, string]> = [
    [Math.floor(n / 1_000_000) % 1000, ' million'],
    [Math.floor(n / 1_000) % 1000, ' thousand'],
    [n % 1000, ''],
  ];

  return groups
    .filter(([amount]) => amount > 0)
    .map(([amount, name]) => `${periodToWords(amount)}${name}`)
    .join(' ');
}

/** 68405013 → "68,405,013" (kept local so the readout never depends on a locale). */
function withCommas(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* -- config --------------------------------------------------------------- */

const PLACE_NAMES = [
  'ones',
  'tens',
  'hundreds',
  'thousands',
  'ten thousands',
  'hundred thousands',
  'millions',
  'ten millions',
  'hundred millions',
];

const PERIOD_NAMES = ['Ones', 'Thousands', 'Millions'];

function toNumber(raw: unknown): number {
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string' && raw.trim() !== '') return Number(raw);
  return Number.NaN;
}

/** Anything but a clean 3 means two periods — a typo shows a working widget, not a crash. */
function readPeriods(raw: unknown): 2 | 3 {
  return toNumber(raw) === 3 ? 3 : 2;
}

function readTarget(raw: unknown, columns: number): number | null {
  const n = toNumber(raw);
  if (!Number.isInteger(n) || n < 0 || n >= 10 ** columns) return null;
  return n;
}

/* -- component ------------------------------------------------------------ */

const SPARKS = ['✨', '🎉', '⭐', '🎊', '✨'];

function Column({
  place,
  digit,
  onBump,
  reduced,
}: {
  place: string;
  digit: number;
  onBump: (delta: number) => void;
  reduced: boolean;
}) {
  const slug = place.replace(/ /g, '-');

  return (
    <div className="pv-column" data-testid="pv-column">
      <button
        type="button"
        className="btn pv-step pv-step-up"
        aria-label={`Add one to the ${place} place`}
        onClick={() => onBump(1)}
        disabled={digit === 9}
      >
        <span aria-hidden="true">+</span>
      </button>

      <motion.span
        // Re-keying replays the pop, so a tap always *feels* like it landed.
        key={digit}
        className="pv-digit"
        data-testid={`pv-digit-${slug}`}
        // Scale only, never opacity: a stalled animation must still leave a readable
        // digit on screen.
        initial={reduced ? false : { scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={springy}
      >
        {digit}
      </motion.span>

      <button
        type="button"
        className="btn pv-step pv-step-down"
        aria-label={`Take one from the ${place} place`}
        onClick={() => onBump(-1)}
        disabled={digit === 0}
      >
        <span aria-hidden="true">−</span>
      </button>

      <span className="pv-place-label">{place}</span>
    </div>
  );
}

/**
 * Tap +/− on each place to build a number, and watch the standard, word, and expanded
 * forms change together — the point is seeing that "3 in the hundreds place" *is* 300.
 * With a `target` in the config the widget celebrates the exact match.
 */
export default function PlaceValueBuilder({
  config,
  onEvent,
}: WidgetProps<'place-value-builder'>) {
  const reduced = useReducedMotionPref();
  const periods = readPeriods(config.periods);
  const columns = periods * 3;
  const target = readTarget(config.target, columns);

  const [digits, setDigits] = useState<number[]>(() => Array<number>(columns).fill(0));
  const [interacted, setInteracted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number | null>(null);

  // A card that swaps its config mid-flight gets a matching set of columns back.
  useEffect(() => {
    setDigits(Array<number>(columns).fill(0));
    setInteracted(false);
    setCompleted(false); setCheckedValue(null);
  }, [columns, target]);

  const places = digits.length === columns ? digits : Array<number>(columns).fill(0);
  const value = places.reduce((sum, digit, index) => sum + digit * 10 ** index, 0);
  // Target zero must not celebrate just because React mounted an all-zero board.
  const matched = interacted && target !== null && value === target;

  const applyDigits = (next: number[], action: 'change-place' | 'reset') => {
    const nextValue = next.reduce((sum, digit, index) => sum + digit * 10 ** index, 0);
    if (action === 'reset') setCheckedValue(null);
    setDigits(next);
    setInteracted(action !== 'reset');
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: nextValue });
    if (action !== 'reset' && !completed && target !== null && nextValue === target) {
      setCompleted(true);
      onEvent({ type: 'complete', value: nextValue });
    }
  };

  const bump = (index: number, delta: number) =>
    applyDigits(
      places.map((digit, i) =>
        i === index ? Math.min(9, Math.max(0, digit + delta)) : digit,
      ),
      'change-place',
    );

  const expanded =
    value === 0
      ? '0'
      : places
          .map((digit, index) => (digit === 0 ? null : withCommas(digit * 10 ** index)))
          .filter((part): part is string => part !== null)
          .reverse()
          .join(' + ');

  // Highest place first, grouped into periods so the commas on screen match the readout.
  const groups = Array.from({ length: periods }, (_, g) => {
    const base = (periods - 1 - g) * 3;
    return { name: PERIOD_NAMES[periods - 1 - g]!, indices: [base + 2, base + 1, base] };
  });

  return (
    <div
      className="card widget-experiment pv activity-shell math-activity"
      data-testid="widget-place-value-builder"
      data-state={matched ? 'matched' : 'building'}
      data-complete={matched ? 'yes' : 'no'}
    >
<ActivityWorkbench label="Build a place-value number" visual={<><div className="widget-head">
        <h3 className="widget-title">
          <span aria-hidden="true">🔢</span> Place Value Builder
        </h3>
        {target !== null && (
          <span className="badge pv-target">Build {withCommas(target)}</span>
        )}

      </div>

<div className="pv-readouts" aria-live="polite" aria-atomic="true">
        <p className="pv-readout">
          <span className="pv-readout-label">Standard form</span>
          <motion.span
            className="pv-standard"
            data-testid="pv-standard"
            animate={matched && !reduced ? { scale: [1, 1.16, 1] } : { scale: 1 }}
            transition={springy}
          >
            {withCommas(value)}
          </motion.span>
        </p>
        <p className="pv-readout">
          <span className="pv-readout-label">Word form</span>
          <span className="pv-words" data-testid="pv-words">
            {numberToWords(value)}
          </span>
        </p>
        <p className="pv-readout">
          <span className="pv-readout-label">Expanded form</span>
          <span className="pv-expanded" data-testid="pv-expanded">
            {expanded}
          </span>
        </p>
      </div>
{matched && !reduced && (
        <div className="pv-sparkles" aria-hidden="true">
          {SPARKS.map((spark, i) => (
            <motion.span
              key={i}
              className="pv-spark"
              initial={{ opacity: 0, y: 10, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0], y: -80 - i * 6, scale: [0.4, 1.3, 0.9] }}
              transition={{ duration: 1.4, delay: i * 0.09, ease: 'easeOut' }}
              style={{ left: `${18 + i * 16}%` }}
            >
              {spark}
            </motion.span>
          ))}
        </div>
      )}</>}>
<button
          type="button"
          className="btn pv-reset"
          onClick={() => applyDigits(Array<number>(columns).fill(0), 'reset')}
          disabled={value === 0}
        >
          Start over
        </button>
<div className="pv-columns" role="group" aria-label="Place value columns">
        {groups.map((group, gi) => (
          <Fragment key={group.name}>
            {gi > 0 && (
              <span className="pv-comma" aria-hidden="true">
                ,
              </span>
            )}
            <div className="pv-period">
              <span className="pv-period-label" aria-hidden="true">
                {group.name}
              </span>
              <div className="pv-period-columns" data-period={group.name.toLowerCase()}>
                {group.indices.map((index) => (
                  <Column
                    key={index}
                    place={PLACE_NAMES[index]!}
                    digit={places[index]!}
                    reduced={reduced}
                    onBump={(delta) => bump(index, delta)}
                  />
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
{target !== null && (
        <p className="pv-feedback" data-testid="pv-feedback" data-tone={matched ? 'good' : 'hint'}>
          {matched
            ? `🎉 You built it! That's exactly ${withCommas(target)}.`
            : value === 0
              ? 'Tap the + buttons to stack up the places.'
              : value < target
                ? 'Keep going — you need a little more!'
                : 'A little too big — take some away.'}
        </p>
      )}
<section className="math-task"><h4>Check and explain</h4><button type="button" onClick={() => { setCheckedValue(value); onEvent({ type: 'coach', cue: target !== null && value !== target ? 'retry' : 'milestone' }); }}>Check my number</button>
<p aria-label="Place-value check feedback" role="status">{checkedValue === null ? 'Build a number, then check the digit in each place.' : target !== null && checkedValue !== target ? `Try again. You checked ${withCommas(checkedValue)}. Compare each digit’s place with ${withCommas(target)}.` : `You checked ${withCommas(checkedValue)}. Its expanded form names the value of each nonzero place.`}</p><p>What changes when the same digit moves one place to the left?</p></section>
</ActivityWorkbench>
</div>
  );
}
