import { render, screen, within, cleanup } from '@testing-library/react';
import { expect, test } from 'vitest';
import { WidgetFrame } from '../WidgetFrame';
import { lessonsByUnit } from '../../content/math';

const activities = Object.values(lessonsByUnit).flat().flatMap(lesson => lesson.learnCards).filter(card => card.widget);
for (const card of activities) {
  test(`${card.id} separates its meaningful work surface from its tasks`, async () => {
    render(<WidgetFrame {...card.widget!} onEvent={() => {}} />);
    const root = await screen.findByTestId(`widget-${card.widget!.type}`);
    expect(root).toHaveClass('activity-shell');
    const visual = within(root).getByRole('region', { name: /work surface$/ });
    const tasks = within(root).getByRole('region', { name: /tasks$/ });
    expect(visual.textContent?.trim().length).toBeGreaterThan(0);
    expect(within(tasks).getAllByRole('button').length).toBeGreaterThan(0);
    expect(visual).not.toContainElement(tasks);
    cleanup();
  });
}
