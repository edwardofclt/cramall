import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { LearnCard } from './LearnCard';
vi.mock('../app/useReducedMotionPref', () => ({ useReducedMotionPref: () => true }));

test('roller coaster dialogue replaces the model and focuses a neutral prediction', async () => {
  const user = userEvent.setup();
  const intro = vi.fn();
  render(<LearnCard card={{id:'demo-card',title:'Compare motion',blocks:[],demo:{type:'roller-coaster',focus:'collision'}}} guide="sandy" onWidgetEvent={vi.fn()} onDialogueAnnouncement={vi.fn()} onWidgetCoachIntroActiveChange={intro}/>);
  expect(screen.queryByTestId('roller-coaster-scene')).not.toBeInTheDocument();
  expect(screen.getByTestId('character-sandy')).toBeInTheDocument();
  await user.click(screen.getByRole('button', {name:'Next'}));
  await user.click(screen.getByRole('button', {name:'Start the model'}));
  expect(screen.getByRole('button', {name:'The lower release'})).toHaveFocus();
  expect(screen.getByRole('button', {name:'Run higher release'})).toBeDisabled();
  expect(screen.getByRole('region', {name:'Release comparison record'})).toHaveTextContent('Not run yet');
  expect(intro).toHaveBeenLastCalledWith(false);
});

test('retains the original prediction and both model observations through explanation and replay', async () => {
  const user = userEvent.setup();
  const writes = vi.spyOn(Storage.prototype,'setItem');
  render(<LearnCard card={{id:'demo-card',title:'Compare motion',blocks:[],demo:{type:'roller-coaster',focus:'collision'}}} guide="sandy" onWidgetEvent={vi.fn()} onDialogueAnnouncement={vi.fn()}/>);
  await user.click(screen.getByRole('button', {name:'Next'}));
  await user.click(screen.getByRole('button', {name:'Start the model'}));
  await user.click(screen.getByRole('button', {name:'The lower release'}));
  expect(screen.getByTestId('widget-coach-reaction')).toHaveTextContent(/prediction/);
  await user.click(screen.getByRole('button', {name:'Run lower release'}));
  await user.click(screen.getByRole('button', {name:'Run higher release'}));
  expect(screen.getByLabelText('Release prediction feedback')).toHaveTextContent(/differed/);
  expect(screen.getByLabelText('Lower release record')).toHaveTextContent(/shorter distance/);
  expect(screen.getByLabelText('Higher release record')).toHaveTextContent(/farther/);
  expect(screen.getByRole('region', {name:'Release comparison record'})).toHaveTextContent('Shorter block movement');
  expect(screen.getByRole('region', {name:'Release comparison record'})).toHaveTextContent('Farther block movement');
  await user.click(screen.getByRole('button', {name:'We directly saw energy'}));
  expect(screen.getByLabelText('Release explanation feedback')).toHaveTextContent(/Try again/);
  await user.click(screen.getByRole('button', {name:'The change in motion could support an energy explanation'}));
  expect(screen.getByLabelText('Release explanation feedback')).toHaveTextContent(/could support/);
  expect(screen.getByLabelText('Release prediction feedback')).toHaveTextContent(/differed/);
  await user.click(screen.getByRole('button', {name:'Run lower release'}));
  expect(screen.getByLabelText('Higher release record')).toBeInTheDocument();
  await user.click(screen.getByRole('button', {name:'Reset'}));
  expect(screen.queryByLabelText('Higher release record')).not.toBeInTheDocument();
  expect(screen.getByRole('button', {name:'The lower release'})).toHaveFocus();
  expect(writes).not.toHaveBeenCalled();
  writes.mockRestore();
});
