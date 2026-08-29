import { useEffect, useRef, useState, type RefObject } from 'react';
import { motion, useAnimationControls, type PanInfo } from 'framer-motion';
import { springy } from '../../app/motion';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { WidgetProps } from '../registry';

/* -- geometry ------------------------------------------------------------- */

const W = 640;
const H = 250;
const PAD = 46;
const LINE_Y = 118;

/** Where a value sits, in SVG user units. */
function pxOf(value: number, min: number, max: number): number {
  return PAD + ((value - min) / (max - min)) * (W - PAD * 2);
}

/**
 * Pointer position → the nearest whole number on the line. Reading the pointer (rather
 * than the drag transform) keeps the marker under the finger even though the SVG scales.
 */
function valueAtPointer(
  svg: SVGSVGElement | null,
  pageX: number,
  min: number,
  max: number,
): number | null {
  if (!svg) return null;
  const rect = svg.getBoundingClientRect();
  if (rect.width === 0) return null;
  const userX = ((pageX - (rect.left + window.scrollX)) / rect.width) * W;
  const ratio = (userX - PAD) / (W - PAD * 2);
  return clamp(Math.round(min + ratio * (max - min)), min, max);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Ticks a fourth grader can count: at most ~11 of them, on friendly intervals. */
function tickStep(range: number): number {
  for (const step of [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2500, 5000, 10000]) {
    if (range / step <= 10) return step;
  }
  return Math.max(1, Math.ceil(range / 10));
}

function tickValues(min: number, max: number): number[] {
  const step = tickStep(max - min);
  const ticks: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max; v += step) ticks.push(v);
  if (ticks[0] !== min) ticks.unshift(min);
  if (ticks[ticks.length - 1] !== max) ticks.push(max);
  return ticks;
}

/* -- config --------------------------------------------------------------- */

const DEFAULTS = { min: 0, max: 100, a: 25, b: 52 };

function toWhole(raw: unknown, fallback: number): number {
  const n = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : Number.NaN;
  return Number.isFinite(n) ? Math.round(n) : fallback;
}

function readConfig(config: Record<string, unknown>) {
  let min = toWhole(config.min, DEFAULTS.min);
  let max = toWhole(config.max, DEFAULTS.max);
  // A backwards or degenerate line has nothing to drag along — fall back whole.
  if (!(max > min)) {
    min = DEFAULTS.min;
    max = DEFAULTS.max;
  }
  return {
    min,
    max,
    a: clamp(toWhole(config.a, DEFAULTS.a), min, max),
    b: clamp(toWhole(config.b, DEFAULTS.b), min, max),
  };
}

/* -- component ------------------------------------------------------------ */

type Sym = '<' | '=' | '>';

const WORDS: Record<Sym, string> = {
  '<': 'less than',
  '=': 'equal to',
  '>': 'greater than',
};

const SYMBOLS: Sym[] = ['<', '=', '>'];

function Marker({
  letter,
  value,
  min,
  max,
  reduced,
  svgRef,
  onDragTo,
}: {
  letter: 'A' | 'B';
  value: number;
  min: number;
  max: number;
  reduced: boolean;
  svgRef: RefObject<SVGSVGElement>;
  onDragTo: (value: number) => void;
}) {
  const above = letter === 'A';
  const text = String(value);
  const pillW = Math.max(54, 26 + text.length * 17);
  const pillY = above ? 8 : 212;

  const handleDrag = (_event: unknown, info: PanInfo) => {
    const next = valueAtPointer(svgRef.current, info.point.x, min, max);
    if (next !== null && next !== value) onDragTo(next);
  };

  return (
    <motion.g
      className="nl-marker"
      data-marker={letter.toLowerCase()}
      // Reduced motion means no drag physics at all — the steppers below do the same job.
      drag={reduced ? false : 'x'}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ left: PAD, right: W - PAD }}
      onDrag={handleDrag}
      whileDrag={reduced ? undefined : { scale: 1.1 }}
      // `initial={false}`: the marker must *start* on its number. Animating in from x=0
      // would leave it stranded at the left end if the animation never runs (background
      // tab, stalled frames) — position is data here, not decoration.
      initial={false}
      animate={{ x: pxOf(value, min, max) }}
      transition={reduced ? { duration: 0 } : springy}
      style={{ touchAction: 'none', cursor: reduced ? 'default' : 'grab' }}
      role="img"
      aria-label={`Marker ${letter} at ${value}`}
    >
      {/* Fat invisible handle: little fingers should not have to hit the shape exactly. */}
      <rect
        className="nl-grab"
        x={-34}
        y={above ? 0 : LINE_Y}
        width={68}
        height={above ? LINE_Y : H - LINE_Y}
      />
      <line
        className="nl-stem"
        x1={0}
        y1={above ? 98 : LINE_Y}
        x2={0}
        y2={above ? LINE_Y : 162}
      />
      {above ? (
        <circle className="nl-shape" cx={0} cy={74} r={24} />
      ) : (
        <rect className="nl-shape" x={-24} y={162} width={48} height={48} rx={12} />
      )}
      <text className="nl-letter" x={0} y={above ? 82 : 194} textAnchor="middle">
        {letter}
      </text>
      <rect className="nl-pill" x={-pillW / 2} y={pillY} width={pillW} height={34} rx={14} />
      <text
        className="nl-pill-text"
        data-testid={`marker-${letter.toLowerCase()}-value`}
        x={0}
        y={pillY + 25}
        textAnchor="middle"
      >
        {text}
      </text>
    </motion.g>
  );
}

function Stepper({
  letter,
  value,
  min,
  max,
  onMove,
}: {
  letter: 'A' | 'B';
  value: number;
  min: number;
  max: number;
  onMove: (next: number) => void;
}) {
  return (
    <div className="nl-stepper" data-marker={letter.toLowerCase()}>
      <span className="nl-stepper-chip" aria-hidden="true">
        {letter}
      </span>
      <button
        type="button"
        className="btn nl-nudge"
        aria-label={`Move ${letter} left`}
        onClick={() => onMove(value - 1)}
        disabled={value <= min}
      >
        <span aria-hidden="true">←</span>
      </button>
      <span className="nl-stepper-value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="btn nl-nudge"
        aria-label={`Move ${letter} right`}
        onClick={() => onMove(value + 1)}
        disabled={value >= max}
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

/**
 * Two markers on a number line and the three comparison symbols. Kids can drag the
 * markers (or nudge them with the arrow buttons) and then say how the numbers compare —
 * the check always uses where the markers are *now*, so moving one re-asks the question.
 */
export default function NumberLineCompare({ config }: WidgetProps) {
  const reduced = useReducedMotionPref();
  const settings = readConfig(config);
  const { min, max } = settings;

  const svgRef = useRef<SVGSVGElement>(null);
  const board = useAnimationControls();
  const [a, setA] = useState(settings.a);
  const [b, setB] = useState(settings.b);
  const [choice, setChoice] = useState<Sym | null>(null);
  const [attempts, setAttempts] = useState(0);

  // A card handing this widget different numbers starts a fresh question.
  useEffect(() => {
    setA(settings.a);
    setB(settings.b);
    setChoice(null);
  }, [settings.a, settings.b, min, max]);

  const truth: Sym = a < b ? '<' : a > b ? '>' : '=';
  const state = choice === null ? 'choosing' : choice === truth ? 'correct' : 'incorrect';

  const move = (setter: (value: number) => void) => (next: number) => {
    setter(clamp(next, min, max));
    // The answer was about the old picture; ask again now that the picture changed.
    setChoice(null);
  };

  const choose = (symbol: Sym) => {
    setChoice(symbol);
    setAttempts((n) => n + 1);
    if (reduced) return;
    board.start(
      symbol === truth
        ? { scale: [1, 1.03, 1], transition: { duration: 0.45 } }
        : { x: [0, -10, 10, -8, 8, 0], transition: { duration: 0.4 } },
    );
  };

  const ticks = tickValues(min, max);

  return (
    <div
      className="card widget-experiment nl"
      data-testid="widget-number-line-compare"
      data-state={state}
    >
      <div className="widget-head">
        <h3 className="widget-title">
          <span aria-hidden="true">📏</span> Which one is bigger?
        </h3>
        <span className="badge nl-hint">Slide the markers, then pick a symbol</span>
      </div>

      <motion.div className="nl-board" animate={board}>
        {state !== 'choosing' && (
          // Keyed by attempt so the flash replays on every answer, right or wrong.
          <div key={attempts} className="nl-flash" data-tone={state} aria-hidden="true" />
        )}
        <svg
          ref={svgRef}
          className="nl-svg"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Number line from ${min} to ${max}. Marker A is at ${a}. Marker B is at ${b}.`}
        >
          <line className="nl-axis" x1={PAD} y1={LINE_Y} x2={W - PAD} y2={LINE_Y} />
          {/* The stretch between the two markers, so "how far apart" is visible. */}
          <line
            className="nl-span"
            x1={pxOf(Math.min(a, b), min, max)}
            y1={LINE_Y}
            x2={pxOf(Math.max(a, b), min, max)}
            y2={LINE_Y}
          />
          {ticks.map((tick) => (
            <g key={tick} className="nl-tick">
              <line
                x1={pxOf(tick, min, max)}
                y1={LINE_Y - 10}
                x2={pxOf(tick, min, max)}
                y2={LINE_Y + 10}
              />
              <text x={pxOf(tick, min, max)} y={LINE_Y + 32} textAnchor="middle">
                {tick}
              </text>
            </g>
          ))}
          <Marker
            letter="A"
            value={a}
            min={min}
            max={max}
            reduced={reduced}
            svgRef={svgRef}
            onDragTo={move(setA)}
          />
          <Marker
            letter="B"
            value={b}
            min={min}
            max={max}
            reduced={reduced}
            svgRef={svgRef}
            onDragTo={move(setB)}
          />
        </svg>
      </motion.div>

      <div className="nl-steppers" role="group" aria-label="Move the markers">
        <Stepper letter="A" value={a} min={min} max={max} onMove={move(setA)} />
        <Stepper letter="B" value={b} min={min} max={max} onMove={move(setB)} />
      </div>

      <p className="nl-sentence" data-testid="nl-sentence">
        <span className="nl-sentence-number" data-marker="a">
          {a}
        </span>
        <span className="nl-slot" data-filled={choice !== null}>
          {choice ?? '?'}
        </span>
        <span className="nl-sentence-number" data-marker="b">
          {b}
        </span>
      </p>

      <div className="nl-symbols" role="group" aria-label="Choose the comparison">
        {SYMBOLS.map((symbol) => (
          <motion.button
            key={symbol}
            type="button"
            className="btn nl-symbol"
            aria-label={WORDS[symbol]}
            aria-pressed={choice === symbol}
            onClick={() => choose(symbol)}
            whileTap={reduced ? undefined : { scale: 0.94 }}
            transition={springy}
          >
            <span className="nl-symbol-glyph" aria-hidden="true">
              {symbol}
            </span>
            <span className="nl-symbol-word" aria-hidden="true">
              {WORDS[symbol]}
            </span>
          </motion.button>
        ))}
      </div>

      {state !== 'choosing' && (
        <p className="nl-feedback" data-testid="nl-feedback" data-tone={state} role="status">
          {state === 'correct'
            ? `🎉 Yes! ${a} is ${WORDS[truth]} ${b}.`
            : 'Not quite — the number farther to the right is always bigger. Try again!'}
        </p>
      )}
    </div>
  );
}
