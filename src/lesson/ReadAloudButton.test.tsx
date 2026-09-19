import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { ReadAloudButton } from './ReadAloudButton';
import { claimAudio, releaseAudio } from './audio-focus';
const stopGuide = vi.fn();
beforeEach(() => {
  vi.stubGlobal('speechSynthesis', { speak: vi.fn(), cancel: vi.fn() });
  vi.stubGlobal('SpeechSynthesisUtterance', class { onend = null; onerror = null; rate = 1; constructor(public text: string) {} });
});
afterEach(() => { cleanup(); releaseAudio(stopGuide); vi.unstubAllGlobals(); vi.clearAllMocks(); });
it('hands audio from the guide to read-aloud and back without leaving a false speaking state', async () => {
  const user = userEvent.setup();
  claimAudio(stopGuide);
  render(<ReadAloudButton text="Our lesson" />);
  await user.click(screen.getByRole('button', { name: 'Read aloud' }));
  expect(stopGuide).toHaveBeenCalledOnce();
  expect(screen.getByRole('button', { name: 'Stop reading' })).toBeVisible();
  act(() => claimAudio(stopGuide));
  expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'Read aloud' })).toBeVisible();
});
it('does not cancel a newer reader when an older reader unmounts', async () => {
  const user = userEvent.setup();
  const first = render(<ReadAloudButton text="First" />);
  await user.click(screen.getByRole('button', { name: 'Read aloud' }));
  const second = render(<ReadAloudButton text="Second" />);
  await user.click(screen.getByRole('button', { name: 'Read aloud' }));
  vi.mocked(window.speechSynthesis.cancel).mockClear();
  first.unmount();
  expect(window.speechSynthesis.cancel).not.toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'Stop reading' })).toBeVisible();
  second.unmount();
  expect(window.speechSynthesis.cancel).toHaveBeenCalledOnce();
});
