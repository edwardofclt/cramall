import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {CentralIdeaOrganizerWidgetConfigSchema} from '../../content/schema';
import CentralIdeaOrganizer from './CentralIdeaOrganizer';

const config={
  mainIdeaChoices:['Plants need sunlight','Dogs like bones'],
  details:[
    {id:'sun',text:'Leaves use sunlight.',supports:['Plants need sunlight']},
    {id:'grow',text:'Plants grow toward a window.',supports:['Plants need sunlight']},
    {id:'dog',text:'Dogs wag their tails.',supports:['Dogs like bones']},
  ],
  requiredDetailCount:2,
};

test('retains unsupported details, emits authored order, and completes once after revision',async()=>{
  // Dropping an unsupported choice, preserving toggle order, or re-emitting completion must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<CentralIdeaOrganizer config={config} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:'Choose main idea Plants need sunlight'}));
  await user.click(screen.getByRole('button',{name:'Toggle detail Dogs wag their tails.'}));
  expect(screen.getByRole('button',{name:'Toggle detail Dogs wag their tails.'})).toHaveAttribute('aria-pressed','true');
  expect(screen.getByRole('status')).toHaveTextContent(/does not support/i);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);

  await user.click(screen.getByRole('button',{name:'Toggle detail Dogs wag their tails.'}));
  await user.click(screen.getByRole('button',{name:'Toggle detail Plants grow toward a window.'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Toggle detail Leaves use sunlight.'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'toggle-detail'},
    {type:'change',value:{mainIdea:'Plants need sunlight',detailIds:['sun','grow']}},
    {type:'complete',value:{mainIdea:'Plants need sunlight',detailIds:['sun','grow']}},
  ]);
  expect(screen.getByTestId('widget-central-idea-organizer')).toHaveAttribute('data-state','complete');

  await user.click(screen.getByRole('button',{name:'Choose main idea Dogs like bones'}));
  expect(screen.getByTestId('widget-central-idea-organizer')).toHaveAttribute('data-state','revision');
  expect(screen.getByRole('status')).toHaveTextContent(/does not support/i);
  expect(screen.getByRole('status')).not.toHaveTextContent(/Dogs wag their tails/i);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('keeps all source-based choices visible with keyboard-ready non-color selection markers',async()=>{
  // Removing source text, aria-pressed, keyboard activation, or visible selected cues must fail this test.
  const user=userEvent.setup();
  render(<CentralIdeaOrganizer config={config} onEvent={vi.fn()}/>);
  const idea=screen.getByRole('button',{name:'Choose main idea Plants need sunlight'});
  const detail=screen.getByRole('button',{name:'Toggle detail Leaves use sunlight.'});
  expect(screen.getByText('Dogs like bones')).toBeVisible();
  expect(screen.getByText('Plants grow toward a window.')).toBeVisible();
  expect(idea).toHaveAttribute('aria-pressed','false');
  expect(detail).toHaveAttribute('aria-pressed','false');

  idea.focus();
  await user.keyboard('{Enter}');
  detail.focus();
  await user.keyboard(' ');
  expect(idea).toHaveAttribute('aria-pressed','true');
  expect(detail).toHaveAttribute('aria-pressed','true');
  expect(idea).toHaveTextContent('Selected');
  expect(detail).toHaveTextContent('Selected');
});

test('emits interaction before each changed state and resets the organizer',async()=>{
  // Reordering events or omitting the reset state must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<CentralIdeaOrganizer config={config} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Choose main idea Plants need sunlight'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'choose-main-idea'},
    {type:'change',value:{mainIdea:'Plants need sunlight',detailIds:[]}},
  ]);
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'reset'},
    {type:'change',value:{mainIdea:null,detailIds:[]}},
  ]);
});

test('resets safely on the first render of a new config',async()=>{
  // Dereferencing retained detail IDs or keeping stale choices across config changes must fail this test.
  const user=userEvent.setup();
  const view=render(<CentralIdeaOrganizer config={config} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Choose main idea Plants need sunlight'}));
  await user.click(screen.getByRole('button',{name:'Toggle detail Leaves use sunlight.'}));

  view.rerender(<CentralIdeaOrganizer config={{mainIdeaChoices:['Rain changes rivers','Wind moves sand'],details:[{id:'rain',text:'Rain fills the stream.',supports:['Rain changes rivers']},{id:'bank',text:'Fast water wears a bank.',supports:['Rain changes rivers']}],requiredDetailCount:2}} onEvent={vi.fn()}/>);
  expect(screen.getByRole('button',{name:'Choose main idea Rain changes rivers'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByRole('button',{name:'Toggle detail Rain fills the stream.'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByRole('status')).toHaveTextContent('Choose a main idea');
  expect(screen.getByTestId('widget-central-idea-organizer')).toHaveAttribute('data-state','organizing');
});

test('normalizes authoring text and rejects equivalent, dangling, duplicate, or unsolvable references',()=>{
  // Weakening canonical uniqueness, reference integrity, or solvability must fail these literals.
  expect(CentralIdeaOrganizerWidgetConfigSchema.parse({
    mainIdeaChoices:['  Plants   need sunlight  ','Dogs like bones'],
    details:[
      {id:' sun ',text:' Leaves   use sunlight. ',supports:[' Plants need sunlight ']},
      {id:'grow',text:'Plants grow.',supports:['Plants need sunlight']},
    ],
    requiredDetailCount:2,
  })).toEqual({
    mainIdeaChoices:['Plants need sunlight','Dogs like bones'],
    details:[
      {id:'sun',text:'Leaves use sunlight.',supports:['Plants need sunlight']},
      {id:'grow',text:'Plants grow.',supports:['Plants need sunlight']},
    ],
    requiredDetailCount:2,
  });

  const base={mainIdeaChoices:['Plants need sunlight','Dogs like bones'],details:[{id:'a',text:'one',supports:['Plants need sunlight']},{id:'b',text:'two',supports:['Plants need sunlight']}],requiredDetailCount:2};
  expect(CentralIdeaOrganizerWidgetConfigSchema.safeParse({...base,mainIdeaChoices:['Plants need sunlight',' plants need sunlight ']}).success).toBe(false);
  expect(CentralIdeaOrganizerWidgetConfigSchema.safeParse({...base,details:[base.details[0],{id:' A ',text:'two',supports:['Plants need sunlight']}]}).success).toBe(false);
  expect(CentralIdeaOrganizerWidgetConfigSchema.safeParse({...base,details:[base.details[0],{id:'b',text:' ONE ',supports:['Plants need sunlight']}]}).success).toBe(false);
  expect(CentralIdeaOrganizerWidgetConfigSchema.safeParse({...base,details:[{id:'a',text:'one',supports:['Missing idea']},base.details[1]]}).success).toBe(false);
  expect(CentralIdeaOrganizerWidgetConfigSchema.safeParse({...base,details:[{id:'a',text:'one',supports:['Plants need sunlight',' plants need sunlight ']},base.details[1]]}).success).toBe(false);
  expect(CentralIdeaOrganizerWidgetConfigSchema.safeParse({mainIdeaChoices:['A','B'],details:[{id:'a',text:'one',supports:['A']},{id:'b',text:'two',supports:['B']}],requiredDetailCount:2}).success).toBe(false);
});

test('keeps the complete source beside the idea board and exposes exact quote anchors',()=>{
  const source={title:'Why Marshes Matter',text:'Why Marshes Matter\n\nYoung fish shelter among marsh grasses. Marsh plants slow waves.'};
  render(<CentralIdeaOrganizer config={{
    mainIdeaChoices:['Marshes support wildlife and shorelines','Every wet place is a marsh'],
    details:[
      {id:'nursery',text:'Young fish find shelter among marsh grasses.',supports:['Marshes support wildlife and shorelines'],sourceQuote:'Young fish shelter among marsh grasses.'},
      {id:'buffer',text:'Marsh plants slow waves.',supports:['Marshes support wildlife and shorelines'],sourceQuote:'Marsh plants slow waves.'},
    ],
    requiredDetailCount:2,
    source,
  }} onEvent={vi.fn()}/>);

  expect(screen.getByRole('heading',{name:'Why Marshes Matter'})).toBeVisible();
  expect(screen.getByTestId('central-idea-source')).toHaveTextContent(/Young fish shelter among marsh grasses\. Marsh plants slow waves\./);
  expect(screen.getByRole('button',{name:/Toggle detail Young fish.*Young fish shelter among marsh grasses/i})).toBeVisible();
  expect(screen.getByText('Source: “Young fish shelter among marsh grasses.”')).toBeVisible();
});
