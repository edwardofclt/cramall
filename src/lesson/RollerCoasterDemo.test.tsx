import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { InstructionalDemo, LearnCard as LearnCardData } from '../content/schema';
import { LearnCard } from './LearnCard';

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
  const onDialogueAnnouncement = vi.fn();
  const renderCard = () => (
    <LearnCard
      card={{ ...baseCard, demo: { type: 'roller-coaster' as const, focus } }}
      onWidgetEvent={onWidgetEvent}
      onDialogueAnnouncement={onDialogueAnnouncement}
    />
  );
  const view = render(renderCard());
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
    expect(vehicle).toHaveAttribute('transform', 'translate(493 210)');
    expect(within(demo).getByRole('status')).toHaveTextContent(/same car/i);
    expect(within(demo).getByRole('status')).toHaveTextContent(/same fixed near-bottom interval/i);
    expect(within(demo).getByRole('status')).toHaveTextContent(/more slowly.*less kinetic energy/i);
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
      /same fixed near-bottom interval faster.*more kinetic energy/i,
    );

    await user.click(within(demo).getByRole('button', { name: 'Reset' }));
    expect(demo).toHaveAttribute('data-run', 'idle');
    expect(demo).toHaveAttribute('data-motion', 'idle');
    expect(within(demo).getByRole('status')).toHaveTextContent(
      /reset.*choose a release height/i,
    );
  });

  test('frames model observations as Claim, Evidence, and Reasoning without calling them experimental evidence', async () => {
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
    expect(result).toHaveTextContent(/claim:/i);
    expect(result).toHaveTextContent(/model observation:.*fixed near-bottom interval faster/i);
    expect(result).toHaveTextContent(/reasoning:.*same car.*more kinetic energy/i);
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
      /foam block moved a shorter distance.*some energy of motion transferred/i,
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
      /foam block moved farther.*more energy of motion transferred/i,
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
    expect(vehicle).toHaveAttribute('transform', 'translate(493 210)');
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
    expect(reducedVehicle).toHaveAttribute('transform', 'translate(493 210)');
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
    expect(vehicle).toHaveAttribute('transform', 'translate(493 210)');
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
