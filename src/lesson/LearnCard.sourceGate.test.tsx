import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { LearnCard } from './LearnCard';
import { unit03Lessons } from '../content/reading/u03';

test('keeps a source-dependent inline question unavailable until the activity source is revealed', async () => {
  const card = unit03Lessons.flatMap(lesson => lesson.learnCards).find(card => card.widget?.type === 'story-elements-mapper')!;
  const user = userEvent.setup();
  const renderCard = (stageVisitKey: string) => <LearnCard stageVisitKey={stageVisitKey} card={{...card,check:{prompt:'Which detail belongs in this story map?',choices:[{id:'a',text:'A kite'},{id:'b',text:'A train'}],correctChoiceId:'a',explanation:'Use the story.'}}} guide="winnie" onWidgetEvent={vi.fn()} onDialogueAnnouncement={vi.fn()}/>;
  const view = render(renderCard('visit-1'));
  expect(screen.queryByText('Which detail belongs in this story map?')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button',{name:'Next'}));
  await user.click(screen.getByRole('button',{name:'Try it'}));
  await screen.findByTestId('widget-story-elements-mapper');
  expect(await screen.findByText('Which detail belongs in this story map?')).toBeInTheDocument();
  view.rerender(renderCard('visit-2'));
  expect(screen.queryByTestId('widget-story-elements-mapper')).not.toBeInTheDocument();
  expect(screen.queryByText('Which detail belongs in this story map?')).not.toBeInTheDocument();
});
