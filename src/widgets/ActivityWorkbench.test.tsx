import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ActivityWorkbench } from './ActivityWorkbench';

test('returning to the first task resets only the task pane scroll position', () => {
  const view = (phase: string) => <ActivityWorkbench label="Comparison" visual={<p>Model stays here</p>} revealKey={phase}><button>First move</button>{phase === 'explain' && <p data-activity-reveal>Explain the result</p>}</ActivityWorkbench>;
  const {rerender} = render(view('predict'));
  const tasks = screen.getByRole('region',{name:'Comparison tasks'});
  rerender(view('explain'));
  tasks.scrollTop = 400;
  rerender(view('predict'));
  expect(tasks.scrollTop).toBe(0);
  expect(screen.getByText('Model stays here')).toBeVisible();
});
