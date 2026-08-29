import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders app title', () => {
  render(<App />);
  expect(screen.getByText(/cram all/i)).toBeInTheDocument();
});

test('route changes move focus to the new main landmark', async () => {
  window.location.hash = '';
  const user = userEvent.setup();
  render(<App />);

  await waitFor(() => expect(screen.getByRole('main')).toHaveFocus());
  await user.click(screen.getByRole('link', { name: /my progress/i }));

  expect(await screen.findByRole('heading', { name: /my progress/i })).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('main')).toHaveFocus());
  expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
});
