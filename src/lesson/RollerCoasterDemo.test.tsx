import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { InstructionalDemo, LearnCard as LearnCardData } from '../content/schema';
import { LearnCard } from './LearnCard';
import { RollerCoasterDemo } from './RollerCoasterDemo';

const motionPreference = vi.hoisted(() => ({ reduced: false }));
vi.mock('../app/useReducedMotionPref', () => ({
  useReducedMotionPref: () => motionPreference.reduced,
}));

const baseCard: LearnCardData = {
  id: 'science-u01-l01-c3',
  title: 'Relate faster motion to more energy',
  blocks: [{ kind: 'text', text: 'Compare the same car on the same track.' }],
};

function renderDemo(
  focus: InstructionalDemo['focus'],
  onWidgetEvent = vi.fn(),
) {
  const renderCard = () => <RollerCoasterDemo focus={focus} />;
  const view = render(renderCard());
  // Geometry tests begin after a neutral prediction; the real dialogue and prediction
  // gate are covered in RollerCoasterGuide.test.tsx.
  fireEvent.click(screen.getByRole('button', { name: 'The lower release' }));
  return {
    onWidgetEvent,
    ...view,
    rerenderDemo: () => view.rerender(renderCard()),
  };
}

afterEach(() => {
  motionPreference.reduced = false;
  vi.restoreAllMocks();
});

describe('roller-coaster instructional demo', () => {
  test('leaves cards without a demo unchanged', () => {
    render(
      <LearnCard
        card={baseCard}
        onWidgetEvent={vi.fn()}
        onDialogueAnnouncement={vi.fn()}
      />,
    );

    expect(screen.queryByRole('region', { name: /interactive roller-coaster model/i })).toBeNull();
    expect(screen.getByText('Compare the same car on the same track.')).toBeInTheDocument();
  });

  test('renders a layered track and a coaster car with visible rolling parts', () => {
    renderDemo('speed-energy');
    const scene = screen.getByTestId('roller-coaster-scene');

    expect(scene.querySelector('.rc-distant-hills')).toBeInTheDocument();
    expect(scene.querySelector('.rc-track-ties')).toBeInTheDocument();
    expect(scene.querySelector('.rc-track-highlight')).toBeInTheDocument();
    expect(scene.querySelector('.rc-speed-trail')).toBeInTheDocument();
    expect(scene.querySelectorAll('.rc-wheel')).toHaveLength(2);
    expect(scene.querySelectorAll('.rc-wheel-spoke')).toHaveLength(4);
    expect(screen.getByTestId('roller-coaster-vehicle-body')).toHaveAttribute(
      'transform',
      'translate(0 -19)',
    );
  });

  test('renders the collision model with a visibly rolling marble and an impact cue', () => {
    renderDemo('collision');
    const scene = screen.getByTestId('roller-coaster-scene');

    expect(scene.querySelector('.rc-marble-shell')).toBeInTheDocument();
    expect(scene.querySelector('.rc-marble-stripe')).toBeInTheDocument();
    expect(scene.querySelector('.rc-marble-shine')).toBeInTheDocument();
    expect(scene.querySelector('.rc-impact-burst')).toBeInTheDocument();
    expect(scene.querySelector('.rc-block-shadow')).toBeInTheDocument();
    expect(screen.getByTestId('roller-coaster-vehicle-body')).toHaveAttribute(
      'transform',
      'translate(0 -12)',
    );
  });

  test('keeps every animated vehicle pose on the rail with the rail tangent', async () => {
    const user = userEvent.setup();
    renderDemo('speed-energy');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });

    function expectPosesOnTrack(vehicle: SVGGElement | null) {
      const poses = Array.from({ length: 9 }, (_, index) =>
        vehicle?.style.getPropertyValue(`--rc-pose-${index}`).trim() ?? '',
      );

      expect(poses.every(Boolean)).toBe(true);
      for (const pose of poses) {
        const match = pose.match(
          /^translate\(([-\d.]+)px, ([-\d.]+)px\) rotate\(([-\d.]+)deg\)$/,
        );
        expect(match, `Unexpected track pose: ${pose}`).not.toBeNull();
        const [, xText, yText, angleText] = match!;
        const actual = {
          x: Number(xText),
          y: Number(yText),
          angle: Number(angleText),
        };

        if (actual.x >= 335) {
          expect(actual.y).toBeCloseTo(203, 2);
          expect(actual.angle).toBeCloseTo(0, 2);
          continue;
        }

        let nearest = { distance: Number.POSITIVE_INFINITY, angle: 0 };
        for (let step = 0; step <= 10_000; step += 1) {
          const t = step / 10_000;
          const u = 1 - t;
          const x = u ** 3 * 58 + 3 * u ** 2 * t * 105 + 3 * u * t ** 2 * 101 + t ** 3 * 335;
          const y = u ** 3 * 37 + 3 * u ** 2 * t * 37 + 3 * u * t ** 2 * 203 + t ** 3 * 203;
          const dx = 3 * u ** 2 * (105 - 58) + 6 * u * t * (101 - 105) + 3 * t ** 2 * (335 - 101);
          const dy = 6 * u * t * (203 - 37);
          const distance = Math.hypot(actual.x - x, actual.y - y);
          if (distance < nearest.distance) {
            nearest = { distance, angle: Math.atan2(dy, dx) * 180 / Math.PI };
          }
        }

        expect(nearest.distance).toBeLessThan(0.08);
        expect(actual.angle).toBeCloseTo(nearest.angle, 1);
      }
    }

    await user.click(within(demo).getByRole('button', { name: 'Run higher release' }));
    const scene = within(demo).getByTestId('roller-coaster-scene');
    expectPosesOnTrack(scene.querySelector<SVGGElement>('.rc-vehicle'));

    await user.click(within(demo).getByRole('button', { name: 'Run lower release' }));
    expectPosesOnTrack(scene.querySelector<SVGGElement>('.rc-vehicle'));
  });

  test('runs the lower release from the keyboard and compares the fixed near-bottom interval', async () => {
    const user = userEvent.setup();
    renderDemo('speed-energy');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });
    const lower = within(demo).getByRole('button', { name: 'Run lower release' });

    expect(demo).toHaveAttribute('data-run', 'idle');
    expect(demo).toHaveAttribute('data-motion', 'idle');
    lower.focus();
    await user.keyboard('{Enter}');

    expect(demo).toHaveAttribute('data-run', 'lower');
    expect(demo).toHaveAttribute('data-motion', 'animate');
    expect(demo).toHaveAttribute('data-phase', 'running');
    expect(within(demo).getByRole('status')).toHaveTextContent(/lower release.*running/i);
    expect(within(demo).getByRole('status')).not.toHaveTextContent(/complete|less kinetic energy/i);

    const vehicle = within(demo)
      .getByTestId('roller-coaster-scene')
      .querySelector<SVGGElement>('.rc-vehicle');
    fireEvent.animationEnd(vehicle!);

    expect(demo).toHaveAttribute('data-phase', 'complete');
    expect(demo).toHaveAttribute('data-motion', 'instant');
    expect(vehicle).not.toHaveStyle({ animationName: 'rc-vehicle-lower' });
    expect(vehicle).toHaveAttribute('transform', 'translate(493 203) rotate(0)');
    expect(within(demo).getByRole('status')).toHaveTextContent(/same car/i);
    expect(within(demo).getByRole('status')).toHaveTextContent(/same fixed near-bottom interval/i);
    expect(within(demo).getByRole('status')).toHaveTextContent(/more slowly.*model observation/i);
  });

  test('schedules a fresh browser CSS animation every time the same release is run', async () => {
    const user = userEvent.setup();
    renderDemo('speed-energy');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });
    const scene = within(demo).getByTestId('roller-coaster-scene');
    const lower = within(demo).getByRole('button', { name: 'Run lower release' });

    await user.click(lower);
    const firstRunVehicle = scene.querySelector<SVGGElement>('.rc-vehicle');
    expect(firstRunVehicle).toHaveStyle({
      animationName: 'rc-vehicle-lower',
      animationDuration: '2.4s',
      animationFillMode: 'forwards',
    });

    await user.click(lower);
    const secondRunVehicle = scene.querySelector<SVGGElement>('.rc-vehicle');
    expect(secondRunVehicle).not.toBe(firstRunVehicle);
    expect(demo).toHaveAttribute('data-phase', 'running');
    expect(secondRunVehicle).toHaveStyle({
      animationName: 'rc-vehicle-lower',
      animationDuration: '2.4s',
      animationFillMode: 'forwards',
    });

    fireEvent.animationEnd(firstRunVehicle!);
    expect(demo).toHaveAttribute('data-phase', 'running');
    fireEvent.animationEnd(secondRunVehicle!);
    expect(demo).toHaveAttribute('data-phase', 'complete');
    expect(within(demo).getByRole('status')).toHaveTextContent(/lower release complete/i);
  });

  test('runs the higher release and reset with complete visible results', async () => {
    const user = userEvent.setup();
    renderDemo('speed-energy');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });

    await user.click(within(demo).getByRole('button', { name: 'Run higher release' }));
    expect(within(demo).getByRole('status')).toHaveTextContent(/higher release.*running/i);
    expect(within(demo).getByRole('status')).not.toHaveTextContent(/complete|more kinetic energy/i);

    const vehicle = within(demo)
      .getByTestId('roller-coaster-scene')
      .querySelector<SVGGElement>('.rc-vehicle');
    fireEvent.animationEnd(vehicle!);

    expect(demo).toHaveAttribute('data-run', 'higher');
    expect(within(demo).getByRole('status')).toHaveTextContent(
      /same fixed near-bottom interval faster/i,
    );

    await user.click(within(demo).getByRole('button', { name: 'Reset' }));
    expect(demo).toHaveAttribute('data-run', 'idle');
    expect(demo).toHaveAttribute('data-motion', 'idle');
    expect(within(demo).getByRole('status')).toHaveTextContent(
      /reset.*choose a release height/i,
    );
  });

  test('reports model observations without supplying the learner’s explanation', async () => {
    const user = userEvent.setup();
    renderDemo('evidence');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });

    expect(within(demo).getByText(/simplified model.*not real experimental evidence/i)).toBeVisible();
    await user.click(within(demo).getByRole('button', { name: 'Run higher release' }));
    expect(within(demo).getByRole('status')).toHaveTextContent(/higher release.*running/i);

    const vehicle = within(demo)
      .getByTestId('roller-coaster-scene')
      .querySelector<SVGGElement>('.rc-vehicle');
    fireEvent.animationEnd(vehicle!);

    const result = within(demo).getByRole('status');
    expect(result).toHaveTextContent(/fixed near-bottom interval faster/i);
    expect(result).toHaveTextContent(/model observation.*not real experimental evidence/i);
    expect(result).not.toHaveTextContent(/claim:|reasoning:/i);
  });

  test('shows the higher-release marble moving the foam block farther after a safe collision', async () => {
    const user = userEvent.setup();
    renderDemo('collision');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });

    expect(within(demo).getByText(/safe miniature marble-and-foam-block collision/i)).toBeVisible();
    await user.click(within(demo).getByRole('button', { name: 'Run lower release' }));
    expect(demo).toHaveAttribute('data-phase', 'running');
    expect(demo).toHaveAttribute('data-block-distance', 'moving');
    expect(within(demo).getByRole('status')).toHaveTextContent(/lower release.*running/i);
    expect(within(demo).getByRole('status')).not.toHaveTextContent(/block moved|complete/i);
    const scene = within(demo).getByTestId('roller-coaster-scene');
    fireEvent.animationEnd(scene.querySelector<SVGGElement>('.rc-vehicle')!);
    expect(demo).toHaveAttribute('data-phase', 'running');
    expect(within(demo).getByRole('status')).not.toHaveTextContent(/block moved|complete/i);

    fireEvent.animationEnd(scene.querySelector<SVGGElement>('.rc-block')!);
    expect(demo).toHaveAttribute('data-phase', 'complete');
    expect(demo).toHaveAttribute('data-block-distance', 'shorter');
    expect(within(demo).getByRole('status')).toHaveTextContent(
      /foam block moved a shorter distance.*qualitative model/i,
    );
    const firstLowerBlock = within(demo)
      .getByTestId('roller-coaster-scene')
      .querySelector<SVGGElement>('.rc-block');

    await user.click(within(demo).getByRole('button', { name: 'Run lower release' }));
    expect(demo).toHaveAttribute('data-phase', 'running');
    expect(within(demo).getByRole('status')).toHaveTextContent(/lower release.*running/i);
    const replayedLowerBlock = within(demo)
      .getByTestId('roller-coaster-scene')
      .querySelector<SVGGElement>('.rc-block');
    expect(replayedLowerBlock).not.toBe(firstLowerBlock);
    fireEvent.animationEnd(replayedLowerBlock!);
    expect(demo).toHaveAttribute('data-phase', 'complete');

    await user.click(within(demo).getByRole('button', { name: 'Run higher release' }));
    expect(demo).toHaveAttribute('data-block-distance', 'moving');
    expect(within(demo).getByRole('status')).not.toHaveTextContent(/block moved farther|complete/i);
    const higherBlock = within(demo)
      .getByTestId('roller-coaster-scene')
      .querySelector<SVGGElement>('.rc-block');
    fireEvent.animationEnd(higherBlock!);
    expect(demo).toHaveAttribute('data-block-distance', 'farther');
    expect(within(demo).getByRole('status')).toHaveTextContent(
      /foam block moved farther.*qualitative model/i,
    );
  });

  test('reduced motion reaches the same higher-release result without travel animation', async () => {
    const user = userEvent.setup();
    const normal = renderDemo('collision');
    const normalDemo = screen.getByRole('region', { name: /interactive roller-coaster model/i });
    await user.click(within(normalDemo).getByRole('button', { name: 'Run higher release' }));
    const normalBlock = within(normalDemo)
      .getByTestId('roller-coaster-scene')
      .querySelector<SVGGElement>('.rc-block');
    fireEvent.animationEnd(normalBlock!);
    const expectedStatus = within(normalDemo).getByRole('status').textContent;
    normal.unmount();

    motionPreference.reduced = true;
    renderDemo('collision');
    const reducedDemo = screen.getByRole('region', { name: /interactive roller-coaster model/i });
    await user.click(within(reducedDemo).getByRole('button', { name: 'Run higher release' }));

    const vehicle = within(reducedDemo)
      .getByTestId('roller-coaster-scene')
      .querySelector<SVGGElement>('.rc-vehicle');
    expect(reducedDemo).toHaveAttribute('data-motion', 'instant');
    expect(reducedDemo).toHaveAttribute('data-phase', 'complete');
    expect(reducedDemo).toHaveAttribute('data-block-distance', 'farther');
    expect(vehicle).not.toHaveStyle({ animationName: 'rc-vehicle-higher' });
    expect(vehicle).toHaveAttribute('transform', 'translate(493 203) rotate(0)');
    expect(within(reducedDemo).getByRole('status')).toHaveTextContent(expectedStatus ?? '');
  });

  test('completes an active collision immediately when reduced motion turns on', async () => {
    const user = userEvent.setup();
    const { rerenderDemo } = renderDemo('collision');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });
    await user.click(within(demo).getByRole('button', { name: 'Run higher release' }));

    const scene = within(demo).getByTestId('roller-coaster-scene');
    expect(demo).toHaveAttribute('data-phase', 'running');
    expect(scene.querySelector('.rc-vehicle')).toHaveStyle({
      animationName: 'rc-vehicle-higher',
    });

    motionPreference.reduced = true;
    rerenderDemo();

    const reducedVehicle = scene.querySelector<SVGGElement>('.rc-vehicle');
    expect(demo).toHaveAttribute('data-phase', 'complete');
    expect(demo).toHaveAttribute('data-motion', 'instant');
    expect(demo).toHaveAttribute('data-block-distance', 'farther');
    expect(reducedVehicle).not.toHaveStyle({ animationName: 'rc-vehicle-higher' });
    expect(reducedVehicle).toHaveAttribute('transform', 'translate(493 203) rotate(0)');
    expect(within(demo).getByRole('status')).toHaveTextContent(
      /higher release model complete.*foam block moved farther/i,
    );
  });

  test('does not start unrequested motion when reduced motion turns off after an instant run', async () => {
    const user = userEvent.setup();
    motionPreference.reduced = true;
    const { rerenderDemo } = renderDemo('speed-energy');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });
    await user.click(within(demo).getByRole('button', { name: 'Run lower release' }));

    const scene = within(demo).getByTestId('roller-coaster-scene');
    expect(demo).toHaveAttribute('data-phase', 'complete');
    expect(demo).toHaveAttribute('data-motion', 'instant');

    motionPreference.reduced = false;
    rerenderDemo();

    const vehicle = scene.querySelector<SVGGElement>('.rc-vehicle');
    expect(demo).toHaveAttribute('data-phase', 'complete');
    expect(demo).toHaveAttribute('data-motion', 'instant');
    expect(vehicle).not.toHaveStyle({ animationName: 'rc-vehicle-lower' });
    expect(vehicle).toHaveAttribute('transform', 'translate(493 203) rotate(0)');
    expect(within(demo).getByRole('status')).toHaveTextContent(/lower release complete/i);
  });

  test('practice controls do not emit widget progress or write browser storage', async () => {
    const user = userEvent.setup();
    const storageWrite = vi.spyOn(Storage.prototype, 'setItem');
    const { onWidgetEvent } = renderDemo('speed-energy');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });

    await user.click(within(demo).getByRole('button', { name: 'Run lower release' }));
    await user.click(within(demo).getByRole('button', { name: 'Run higher release' }));
    await user.click(within(demo).getByRole('button', { name: 'Reset' }));

    expect(onWidgetEvent).not.toHaveBeenCalled();
    expect(storageWrite).not.toHaveBeenCalled();
  });

  test('keeps the graphics decorative and every control at the shared 44px minimum', () => {
    renderDemo('speed-energy');
    const demo = screen.getByRole('region', { name: /interactive roller-coaster model/i });

    expect(within(demo).getByTestId('roller-coaster-scene')).toHaveAttribute('aria-hidden', 'true');
    for (const control of within(demo).getAllByRole('button')) {
      expect(control).toHaveClass('btn');
    }
  });
});
