import { useEffect, useState, type AnimationEvent, type CSSProperties } from 'react';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import type { InstructionalDemo } from '../content/schema';

type Focus = InstructionalDemo['focus'];
type Release = 'idle' | 'lower' | 'higher';
type RunPhase = 'idle' | 'running' | 'complete';

type DemoRun = {
  release: Release;
  sequence: number;
  phase: RunPhase;
  wasReset: boolean;
};

type TrackPose = { x: number; y: number; angle: number };
type TrackSample = { curveT: number } | { lineX: number };

const TRACK_PATH = 'M58 37 C105 37 101 203 335 203 H580';
const FINAL_TRACK_POSE: TrackPose = { x: 493, y: 203, angle: 0 };
const TRACK_SAMPLES: Record<Exclude<Release, 'idle'>, TrackSample[]> = {
  higher: [
    { curveT: 0.1 },
    { curveT: 0.24 },
    { curveT: 0.4 },
    { curveT: 0.58 },
    { curveT: 0.76 },
    { curveT: 1 },
    { lineX: 420 },
    { lineX: 480 },
    { lineX: FINAL_TRACK_POSE.x },
  ],
  lower: [
    { curveT: 0.5 },
    { curveT: 0.58 },
    { curveT: 0.66 },
    { curveT: 0.74 },
    { curveT: 0.82 },
    { curveT: 0.9 },
    { curveT: 1 },
    { lineX: 440 },
    { lineX: FINAL_TRACK_POSE.x },
  ],
};

function poseAt(sample: TrackSample): TrackPose {
  if ('lineX' in sample) return { x: sample.lineX, y: 203, angle: 0 };

  const t = sample.curveT;
  const u = 1 - t;
  const x = u ** 3 * 58 + 3 * u ** 2 * t * 105 + 3 * u * t ** 2 * 101 + t ** 3 * 335;
  const y = u ** 3 * 37 + 3 * u ** 2 * t * 37 + 3 * u * t ** 2 * 203 + t ** 3 * 203;
  const dx = 3 * u ** 2 * (105 - 58) + 6 * u * t * (101 - 105) + 3 * t ** 2 * (335 - 101);
  const dy = 6 * u * t * (203 - 37);
  return { x, y, angle: Math.atan2(dy, dx) * 180 / Math.PI };
}

function numberForMotion(value: number): string {
  return Number(value.toFixed(3)).toString();
}

function cssTrackPose(pose: TrackPose): string {
  return `translate(${numberForMotion(pose.x)}px, ${numberForMotion(pose.y)}px) rotate(${numberForMotion(pose.angle)}deg)`;
}

function svgTrackPose(pose: TrackPose): string {
  return `translate(${numberForMotion(pose.x)} ${numberForMotion(pose.y)}) rotate(${numberForMotion(pose.angle)})`;
}

const COPY: Record<Focus, { title: string; prompt: string }> = {
  'speed-energy': {
    title: 'Compare release height, speed, and energy',
    prompt: 'Run both releases. Compare the same car only while it crosses the same fixed near-bottom interval.',
  },
  evidence: {
    title: 'Build a Claim–Evidence–Reasoning explanation',
    prompt: 'Run both releases, then notice how a model observation can support a claim when reasoning connects the ideas.',
  },
  collision: {
    title: 'Observe energy transfer in a safe collision',
    prompt: 'Run a safe miniature marble-and-foam-block collision from each release height and compare how far the block moves.',
  },
};

function resultFor(focus: Focus, release: Exclude<Release, 'idle'>): string {
  const higher = release === 'higher';
  if (focus === 'speed-energy') {
    return higher
      ? 'Higher release complete: The same car traveled through the same fixed near-bottom interval faster, so it had more kinetic energy than on the lower release.'
      : 'Lower release complete: The same car traveled through the same fixed near-bottom interval more slowly, so it had less kinetic energy than on the higher release.';
  }
  if (focus === 'evidence') {
    return higher
      ? 'Claim: The higher release gives the same coaster car more kinetic energy near the bottom. Model observation: In this simplified model, the same car traveled through the fixed near-bottom interval faster after the higher release. Reasoning: For the same car, faster motion means more kinetic energy. This model helps explain the pattern; it is not real experimental evidence.'
      : 'Claim: The lower release gives the same coaster car less kinetic energy near the bottom. Model observation: In this simplified model, the same car traveled through the fixed near-bottom interval more slowly after the lower release. Reasoning: For the same car, slower motion means less kinetic energy. This model helps explain the pattern; it is not real experimental evidence.';
  }
  return higher
    ? 'Higher release model complete: In this safe miniature marble-and-foam-block collision, the foam block moved farther. The faster marble had more energy of motion, so more energy of motion transferred to the block. This is a qualitative model, not an exact measurement.'
    : 'Lower release model complete: In this safe miniature marble-and-foam-block collision, the foam block moved a shorter distance. The marble slowed as some energy of motion transferred to the block. This is a qualitative model, not an exact measurement.';
}

function runningFor(focus: Focus, release: Exclude<Release, 'idle'>): string {
  const label = release === 'higher' ? 'Higher' : 'Lower';
  if (focus === 'collision') {
    return `${label} release running: Watch the marble travel toward the foam block. The modeled outcome will be announced after the collision and the block stops moving.`;
  }
  return `${label} release running: Watch the same car travel toward and through the fixed near-bottom interval. The modeled outcome will be announced after the car stops moving.`;
}

function CoasterVehicle({ collision }: { collision: boolean }) {
  if (collision) {
    return (
      <>
        <g className="rc-speed-trail">
          <path d="M-62 -7 H-28" />
          <path d="M-52 1 H-25" />
          <path d="M-44 9 H-23" />
        </g>
        <g className="rc-marble-rotor">
          <circle className="rc-marble-shell" cx="0" cy="0" r="12" />
          <path className="rc-marble-stripe" d="M-10 -5 C-4 -1 4 1 11 5" />
          <ellipse className="rc-marble-shine" cx="-4" cy="-5" rx="3.2" ry="2.2" />
        </g>
      </>
    );
  }
  return (
    <>
      <g className="rc-speed-trail">
        <path d="M-75 -8 H-34" />
        <path d="M-64 1 H-31" />
        <path d="M-54 10 H-29" />
      </g>
      <g className="rc-car">
        <ellipse className="rc-car-shadow" cx="0" cy="18" rx="30" ry="4" />
        <path className="rc-car-body" d="M-29 -12 H22 Q29 -12 30 -4 L28 7 Q27 12 20 12 H-24 Q-30 12 -31 6 L-33 -4 Q-34 -10 -29 -12 Z" />
        <path className="rc-car-panel" d="M-27 -6 H25 L23 5 H-25 Z" />
        <path className="rc-car-canopy" d="M-14 -12 Q-10 -31 5 -31 Q17 -31 21 -12 Z" />
        <circle className="rc-rider-head" cx="3" cy="-21" r="6" />
        <path className="rc-safety-bar" d="M-9 -12 Q1 -20 15 -12" />
        <g className="rc-wheel" transform="translate(-18 11)">
          <g className="rc-wheel-rotor">
            <circle className="rc-wheel-tire" r="8" />
            <circle className="rc-wheel-hub" r="2.5" />
            <path className="rc-wheel-spoke" d="M-5 0 H5" />
            <path className="rc-wheel-spoke" d="M0 -5 V5" />
          </g>
        </g>
        <g className="rc-wheel" transform="translate(18 11)">
          <g className="rc-wheel-rotor">
            <circle className="rc-wheel-tire" r="8" />
            <circle className="rc-wheel-hub" r="2.5" />
            <path className="rc-wheel-spoke" d="M-5 0 H5" />
            <path className="rc-wheel-spoke" d="M0 -5 V5" />
          </g>
        </g>
      </g>
    </>
  );
}

function CoasterScene({ focus, release, phase, reduced, runNumber, onAnimationComplete }: {
  focus: Focus;
  release: Release;
  phase: RunPhase;
  reduced: boolean;
  runNumber: number;
  onAnimationComplete: (runNumber: number) => void;
}) {
  const collision = focus === 'collision';
  const hasRelease = release !== 'idle';
  const animatedRelease = hasRelease && phase === 'running' && !reduced ? release : null;
  const idleTransform = svgTrackPose(poseAt(TRACK_SAMPLES.higher[0]));
  const finalTransform = svgTrackPose(FINAL_TRACK_POSE);
  const trackPoseStyle = hasRelease
    ? Object.fromEntries(
        TRACK_SAMPLES[release].map((sample, index) => [
          `--rc-pose-${index}`,
          cssTrackPose(poseAt(sample)),
        ]),
      )
    : {};
  const animationStyle = {
    ...trackPoseStyle,
    ...(animatedRelease ? {
      animationName: `rc-vehicle-${animatedRelease}`,
      animationDuration: animatedRelease === 'higher' ? '1.6s' : '2.4s',
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
    } : {}),
  } as CSSProperties;
  const finishRun = (event: AnimationEvent<SVGGElement>) => {
    if (event.currentTarget === event.target) {
      onAnimationComplete(runNumber);
    }
  };

  return (
    <svg
      className="rc-scene"
      data-testid="roller-coaster-scene"
      viewBox="0 0 640 270"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="rc-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#93c5fd" />
          <stop offset="0.58" stopColor="#dbeafe" />
          <stop offset="1" stopColor="#f0fdf4" />
        </linearGradient>
        <linearGradient id="rc-distant-hill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#86efac" />
          <stop offset="1" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="rc-near-hill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#4ade80" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="rc-car-paint" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fb7185" />
          <stop offset="1" stopColor="#db2777" />
        </linearGradient>
        <radialGradient id="rc-marble-paint" cx="32%" cy="28%" r="70%">
          <stop offset="0" stopColor="#7dd3fc" />
          <stop offset="0.55" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#0369a1" />
        </radialGradient>
        <linearGradient id="rc-foam-paint" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <rect className="rc-sky" width="640" height="270" rx="18" fill="url(#rc-sky)" />
      <circle className="rc-sun" cx="568" cy="48" r="24" />
      <circle className="rc-sun-glow" cx="568" cy="48" r="34" />
      <g className="rc-clouds">
        <path d="M170 53 C176 38 194 39 200 50 C205 43 219 44 223 55 C236 55 240 69 228 74 H169 C154 72 155 56 170 53 Z" />
        <path d="M420 75 C427 61 442 62 448 72 C456 63 471 68 471 78 C485 78 489 91 477 95 H418 C405 93 406 78 420 75 Z" />
      </g>
      <path className="rc-distant-hills" d="M0 178 C56 132 105 150 151 171 C207 120 262 142 316 177 C373 132 429 145 487 179 C540 142 594 150 640 181 V270 H0 Z" fill="url(#rc-distant-hill)" />
      <path className="rc-hill" d="M0 235 C100 190 170 225 245 218 C350 207 420 236 520 214 C570 203 610 210 640 224 V270 H0 Z" fill="url(#rc-near-hill)" />
      <path className="rc-ground-shadow" d="M0 248 C145 235 275 250 407 240 C505 232 577 239 640 246 V270 H0 Z" />
      <path className="rc-track-ties" d="M58 40 C105 40 101 207 335 207 H580" />
      <path className="rc-track-shadow" d="M58 43 C105 43 101 210 335 210 H580" />
      <path className="rc-track" d={TRACK_PATH} />
      <path className="rc-track-highlight" d="M58 34 C105 34 101 200 335 200 H580" />
      <path className="rc-support" d="M104 93 V227 M161 153 V225 M235 190 V226 M335 203 V226 M448 203 V226 M555 203 V226 M104 142 L161 214 M161 189 L235 222 M335 226 L448 205 M448 226 L555 205" />
      <g className="rc-release-markers">
        <path d="M54 43 H98" />
        <path d="M127 120 H169" />
        <text x="17" y="76">
          <tspan x="17">higher</tspan>
          <tspan x="17" dy="14">release</tspan>
        </text>
        <text x="115" y="109">lower release</text>
      </g>
      <g className="rc-speed-markers">
        <path d="M352 174 V228" />
        <path d="M430 174 V228" />
        <text x="341" y="164">fixed</text>
        <text x="416" y="164">interval</text>
      </g>
      {collision && (
        <g key={`collision-${release}-${runNumber}`} className="rc-collision-target">
          <path className="rc-collision-floor" d="M495 229 H606" />
          <g className="rc-impact-burst">
            <path d="M498 178 L485 166" />
            <path d="M493 191 L474 188" />
            <path d="M499 204 L483 216" />
          </g>
          <g
            className="rc-block"
            onAnimationEnd={animatedRelease ? finishRun : undefined}
          >
            <ellipse className="rc-block-shadow" cx="527" cy="216" rx="26" ry="6" />
            <rect className="rc-block-body" x="506" y="175" width="42" height="36" rx="7" fill="url(#rc-foam-paint)" />
            <path className="rc-block-texture" d="M513 184 Q520 179 527 184 T541 184 M512 202 Q520 197 528 202 T542 202" />
            <text x="510" y="197">foam</text>
          </g>
        </g>
      )}
      <g
        key={`${release}-${runNumber}`}
        className="rc-vehicle"
        style={animationStyle}
        transform={!hasRelease ? idleTransform : phase === 'complete' ? finalTransform : undefined}
        onAnimationEnd={animatedRelease && !collision ? finishRun : undefined}
      >
        <g
          className="rc-vehicle-body"
          data-testid="roller-coaster-vehicle-body"
          transform={`translate(0 -${collision ? 12 : 19})`}
        >
          <CoasterVehicle collision={collision} />
        </g>
      </g>
    </svg>
  );
}

export function RollerCoasterDemo({ focus }: { focus: Focus }) {
  const reduced = useReducedMotionPref();
  const [demoRun, setDemoRun] = useState<DemoRun>({
    release: 'idle',
    sequence: 0,
    phase: 'idle',
    wasReset: false,
  });
  const copy = COPY[focus];
  const phase: RunPhase = reduced && demoRun.phase === 'running'
    ? 'complete'
    : demoRun.phase;

  useEffect(() => {
    if (!reduced) return;
    setDemoRun((current) => current.phase === 'running'
      ? { ...current, phase: 'complete' }
      : current);
  }, [reduced]);

  const runRelease = (release: Exclude<Release, 'idle'>) => {
    setDemoRun((current) => ({
      release,
      sequence: current.sequence + 1,
      phase: reduced ? 'complete' : 'running',
      wasReset: false,
    }));
  };
  const reset = () => {
    setDemoRun((current) => ({
      release: 'idle',
      sequence: current.sequence + 1,
      phase: 'idle',
      wasReset: true,
    }));
  };
  const completeRun = (sequence: number) => {
    setDemoRun((current) => current.sequence === sequence && current.phase === 'running'
      ? { ...current, phase: 'complete' }
      : current);
  };
  const status = demoRun.release === 'idle'
    ? `${demoRun.wasReset ? 'Reset complete. ' : ''}Choose a release height. Nothing moves until you run the model.`
    : phase === 'running'
      ? runningFor(focus, demoRun.release)
      : resultFor(focus, demoRun.release);
  const blockDistance = demoRun.release === 'idle'
    ? 'none'
    : phase === 'running'
      ? 'moving'
      : demoRun.release === 'lower'
        ? 'shorter'
        : 'farther';

  return (
    <section
      className="rc-demo"
      aria-label={`Interactive roller-coaster model: ${copy.title}`}
      data-run={demoRun.release}
      data-motion={demoRun.release === 'idle' ? 'idle' : phase === 'running' ? 'animate' : 'instant'}
      data-phase={phase}
      data-focus={focus}
      data-block-distance={blockDistance}
    >
      <div className="rc-demo-heading">
        <div>
          <span className="rc-demo-kicker">Interactive roller-coaster model</span>
          <h3>{copy.title}</h3>
        </div>
        <span className="rc-demo-badge">Practice only</span>
      </div>
      <p className="rc-demo-prompt">{copy.prompt}</p>
      <p className="rc-demo-note">
        Simplified model: it helps us notice a pattern, but it is not real experimental evidence.
      </p>

      <CoasterScene
        focus={focus}
        release={demoRun.release}
        phase={phase}
        reduced={reduced}
        runNumber={demoRun.sequence}
        onAnimationComplete={completeRun}
      />

      <div className="rc-controls" aria-label="Roller-coaster model controls">
        <button
          className="btn rc-control rc-control-lower"
          type="button"
          aria-pressed={demoRun.release === 'lower'}
          onClick={() => runRelease('lower')}
        >
          Run lower release
        </button>
        <button
          className="btn btn-primary rc-control"
          type="button"
          aria-pressed={demoRun.release === 'higher'}
          onClick={() => runRelease('higher')}
        >
          Run higher release
        </button>
        <button className="btn rc-control" type="button" onClick={reset}>
          Reset
        </button>
      </div>

      <p className="rc-status" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
