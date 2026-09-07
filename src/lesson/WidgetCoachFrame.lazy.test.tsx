import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { WidgetCoachFrame } from './WidgetCoachFrame';
const loading = vi.hoisted(() => ({ resolve: null as null | (() => void) }));
vi.mock('../widgets/registry', async () => {
  const { lazy } = await import('react');
  return { widgetRegistry: { 'place-value-builder': lazy(async () => {
    await new Promise<void>(resolve => { loading.resolve = resolve; });
    return { default: () => <button type="button">Build a number</button> };
  }) } };
});

test('waits for lazy activity readiness before focusing its first meaningful control', async () => {
  const user = userEvent.setup();
  render(<WidgetCoachFrame type="place-value-builder" config={{target:2}} guide="nutty" visitKey="lazy" onEvent={vi.fn()} onIntroActiveChange={vi.fn()} coach={{intro:[{speaker:'guide',text:'Build a number.'},{speaker:'kid',text:'I will change one place.'}],reactions:{complete:{text:'You built it.'}}}}/>);
  expect(loading.resolve).toBeNull();
  await user.click(screen.getByRole('button',{name:'Next'}));
  await user.click(screen.getByRole('button',{name:'Try it'}));
  expect(screen.queryByRole('button',{name:'Build a number'})).not.toBeInTheDocument();
  await waitFor(() => expect(loading.resolve).not.toBeNull());
  await act(async () => { loading.resolve!(); });
  expect(await screen.findByRole('button',{name:'Build a number'})).toHaveFocus();
});
