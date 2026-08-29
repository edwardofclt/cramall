import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { RichText, plainText, speechText } from './Rich';

describe('RichText', () => {
  test('renders **bold** as strong and newlines as line breaks', () => {
    const { container } = render(<RichText text={'Say **ten** now.\nThen stop.'} />);

    expect(screen.getByText('ten').tagName).toBe('STRONG');
    expect(container.querySelectorAll('br')).toHaveLength(1);
    expect(container.textContent).toBe('Say ten now.Then stop.');
  });

  test('leaves an unpaired asterisk alone instead of eating the line', () => {
    const { container } = render(<RichText text={'3 * 4 = 12'} />);

    expect(container.textContent).toBe('3 * 4 = 12');
  });
});

describe('plainText', () => {
  test('drops the bold markers', () => {
    expect(plainText('Say **ten** now.')).toBe('Say ten now.');
  });

  test('drops a stray asterisk so the voice never says "star"', () => {
    expect(plainText('A **big** number * is fun')).toBe('A big number is fun');
  });

  test('collapses newlines so the text reads as one run', () => {
    expect(plainText('One\n\nTwo')).toBe('One Two');
  });
});

describe('speechText', () => {
  test('punctuates each piece so the voice pauses between them', () => {
    expect(speechText(['Every digit has a place', 'Count carefully.', ''])).toBe(
      'Every digit has a place. Count carefully.',
    );
  });
});
