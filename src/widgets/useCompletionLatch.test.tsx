import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { useCompletionLatch } from './useCompletionLatch';

test('completion latch fires once and resets on a new key', async () => {
  const fired = vi.fn();

  function Probe({ id }: { id: string }) {
    const { completed, completeOnce } = useCompletionLatch(id);
    return (
      <button data-complete={completed} onClick={() => completeOnce(fired)}>
        Finish
      </button>
    );
  }

  const user = userEvent.setup();
  const view = render(<Probe id="a" />);
  await user.click(screen.getByRole('button', { name: 'Finish' }));
  await user.click(screen.getByRole('button', { name: 'Finish' }));
  expect(fired).toHaveBeenCalledTimes(1);

  view.rerender(<Probe id="b" />);
  expect(screen.getByRole('button', { name: 'Finish' })).toHaveAttribute('data-complete', 'false');
  await user.click(screen.getByRole('button', { name: 'Finish' }));
  expect(fired).toHaveBeenCalledTimes(2);
});
