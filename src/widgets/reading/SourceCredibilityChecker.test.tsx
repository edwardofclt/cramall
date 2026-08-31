import {render,screen,within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {SourceCredibilityCheckerWidgetConfigSchema} from '../../content/schema';
import SourceCredibilityChecker from './SourceCredibilityChecker';

const sources=[
  {
    id:'museum',
    title:'Museum migration notes',
    author:'Dr. Ada Reed',
    date:'May 4, 2025',
    publisher:'River Museum',
    purpose:'Explain a tagged bird migration',
    claims:['The bird flew north in April.','Its tag was recorded at two wetlands.'],
  },
  {
    id:'mystery',
    title:'Amazing bird facts',
    publisher:'Popular Posts',
    claims:[],
  },
];

test('evaluates missing author and evidence before completing corrected ratings',async()=>{
  // Accepting a criteria-missing source or completing before every decision is corrected must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SourceCredibilityChecker config={{sources,criteria:['author','evidence'],credibleIds:['museum']}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Rate Amazing bird facts credible'}));
  await user.click(screen.getByRole('button',{name:'Check sources'}));
  expect(screen.getByRole('status')).toHaveTextContent(/author.*evidence/i);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
  await user.click(screen.getByRole('button',{name:'Rate Amazing bird facts needs checking'}));
  await user.click(screen.getByRole('button',{name:'Rate Museum migration notes credible'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Check sources'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'check'},
    {type:'change',value:{ratings:{museum:'credible',mystery:'needs-checking'}}},
    {type:'complete',value:{ratings:{museum:'credible',mystery:'needs-checking'}}},
  ]);
});

test('shows every supplied record field and explicitly names missing evidence fields',()=>{
  // Hiding metadata, purpose, claims, or missing-field labels while rating must fail this test.
  render(<SourceCredibilityChecker config={{sources,criteria:['author','evidence'],credibleIds:['museum']}} onEvent={vi.fn()}/>);
  const museum=screen.getByRole('article',{name:'Source: Museum migration notes'});
  expect(museum).toHaveTextContent('Author: Dr. Ada Reed');
  expect(museum).toHaveTextContent('Date: May 4, 2025');
  expect(museum).toHaveTextContent('Publisher: River Museum');
  expect(museum).toHaveTextContent('Purpose: Explain a tagged bird migration');
  expect(within(museum).getByText('The bird flew north in April.')).toBeVisible();
  expect(within(museum).getByText('Its tag was recorded at two wetlands.')).toBeVisible();
  const mystery=screen.getByRole('article',{name:'Source: Amazing bird facts'});
  expect(mystery).toHaveTextContent('Author: Missing');
  expect(mystery).toHaveTextContent('Date: Missing');
  expect(mystery).toHaveTextContent('Publisher: Popular Posts');
  expect(mystery).toHaveTextContent('Purpose: Missing');
  expect(mystery).toHaveTextContent('Claims: Missing');
  expect(screen.getByText(/practice records supplied by this lesson/i)).toBeVisible();
  expect(screen.getByText(/does not browse or verify real sources/i)).toBeVisible();
});

test('emits each rating as interaction then authored-order retained change',async()=>{
  // Click-order serialization, dropped ratings, or silent rating changes must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SourceCredibilityChecker config={{sources,criteria:['author','evidence'],credibleIds:['museum']}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Rate Amazing bird facts needs checking'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Rate Museum migration notes credible'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'rate-source'},
    {type:'change',value:{ratings:{museum:'credible',mystery:'needs-checking'}}},
  ]);
});

test('keeps wrong ratings selected and leaves live completion after revision without rearming',async()=>{
  // Clearing wrong choices, displaying latched success, or emitting completion twice must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SourceCredibilityChecker config={{sources,criteria:['author','evidence'],credibleIds:['museum']}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Rate Museum migration notes credible'}));
  await user.click(screen.getByRole('button',{name:'Rate Amazing bird facts needs checking'}));
  expect(screen.getByTestId('widget-source-credibility-checker')).toHaveAttribute('data-state','revision');
  await user.click(screen.getByRole('button',{name:'Check sources'}));
  expect(screen.getByTestId('widget-source-credibility-checker')).toHaveAttribute('data-state','complete');
  await user.click(screen.getByRole('button',{name:'Rate Amazing bird facts credible'}));
  expect(screen.getByRole('button',{name:'Rate Amazing bird facts credible'})).toHaveAttribute('aria-pressed','true');
  expect(screen.getByTestId('widget-source-credibility-checker')).toHaveAttribute('data-state','revision');
  await user.click(screen.getByRole('button',{name:'Check sources'}));
  expect(screen.getByRole('status')).toHaveTextContent(/author.*evidence/i);
  await user.click(screen.getByRole('button',{name:'Rate Amazing bird facts needs checking'}));
  await user.click(screen.getByRole('button',{name:'Check sources'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('requires every rating and gives bounded feedback without revealing credible answers',async()=>{
  // Completing partial work or directly listing the expected rating must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SourceCredibilityChecker config={{sources,criteria:['author','evidence'],credibleIds:['museum']}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Rate Museum migration notes needs checking'}));
  await user.click(screen.getByRole('button',{name:'Check sources'}));
  expect(screen.getByRole('status')).toHaveTextContent(/rate every source/i);
  expect(screen.getByRole('status')).not.toHaveTextContent(/museum.*credible|credible.*museum/i);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
});

test('resets ratings and status without rearming completion',async()=>{
  // Retaining ratings/status or rearming completion on reset must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SourceCredibilityChecker config={{sources,criteria:['author','evidence'],credibleIds:['museum']}} onEvent={onEvent}/>);
  for(const [title,rating] of [['Museum migration notes','credible'],['Amazing bird facts','needs checking']] as const){
    await user.click(screen.getByRole('button',{name:`Rate ${title} ${rating}`}));
  }
  await user.click(screen.getByRole('button',{name:'Check sources'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'reset'},
    {type:'change',value:{ratings:{}}},
  ]);
  expect(screen.getByRole('status')).toHaveTextContent('Rate every source.');
  expect(screen.getByRole('button',{name:'Rate Museum migration notes credible'})).toHaveAttribute('aria-pressed','false');
  for(const [title,rating] of [['Museum migration notes','credible'],['Amazing bird facts','needs checking']] as const){
    await user.click(screen.getByRole('button',{name:`Rate ${title} ${rating}`}));
  }
  await user.click(screen.getByRole('button',{name:'Check sources'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
});

test('resets stale ratings safely on the first render of a new config',async()=>{
  // Showing or dereferencing removed source IDs during lesson navigation must fail this test.
  const user=userEvent.setup(),onEvent=vi.fn();
  const view=render(<SourceCredibilityChecker config={{sources,criteria:['author','evidence'],credibleIds:['museum']}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Rate Museum migration notes credible'}));
  view.rerender(<SourceCredibilityChecker config={{sources:[{
    id:'archive',title:'Town archive map',date:'1912',purpose:'Record property lines',claims:['The map labels Oak Street.'],
  }],criteria:['date','purpose'],credibleIds:['archive']}} onEvent={onEvent}/>);
  expect(screen.queryByRole('button',{name:/Museum migration notes/})).not.toBeInTheDocument();
  expect(screen.getByRole('button',{name:'Rate Town archive map credible'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByTestId('widget-source-credibility-checker')).toHaveAttribute('data-state','rating');
});

test('supports keyboard ratings with visible non-color selection markers',async()=>{
  // Mouse-only controls or color-only selected state must fail this test.
  const user=userEvent.setup();
  render(<SourceCredibilityChecker config={{sources,criteria:['author','evidence'],credibleIds:['museum']}} onEvent={vi.fn()}/>);
  const button=screen.getByRole('button',{name:'Rate Museum migration notes credible'});
  button.focus();
  await user.keyboard('{Enter}');
  expect(button).toHaveAttribute('aria-pressed','true');
  expect(button).toHaveTextContent('✓ Selected');
});

test('normalizes records and rejects ambiguous, unsafe, or incorrectly derived configs',()=>{
  // Blank/equivalent records, unstable IDs, duplicate criteria, or authored answers unlike criteria-derived answers must fail these literals.
  expect(SourceCredibilityCheckerWidgetConfigSchema.parse({
    sources:[{id:' museum ',title:' Museum   notes ',author:' Ada ',claims:[' Tagged bird '] }],
    criteria:['author','evidence'],credibleIds:['museum'],
  })).toEqual({
    sources:[{id:'museum',title:'Museum notes',author:'Ada',claims:['Tagged bird']}],
    criteria:['author','evidence'],credibleIds:['museum'],
  });
  for(const config of [
    {sources:[{id:' ',title:'Notes',claims:[]}],criteria:['author'],credibleIds:[]},
    {sources:[{id:'1',title:'Notes',claims:[]}],criteria:['author'],credibleIds:[]},
    {sources:[{id:'toString',title:'Notes',claims:[]}],criteria:['author'],credibleIds:[]},
    {sources:[{id:'one',title:'Notes',claims:[]},{id:' ONE ',title:'Other',claims:[]}],criteria:['author'],credibleIds:[]},
    {sources:[{id:'one',title:'Notes',claims:[]},{id:'two',title:' notes ',claims:[]}],criteria:['author'],credibleIds:[]},
    {sources:[{id:'one',title:'Notes',author:' ',claims:[]}],criteria:['author'],credibleIds:[]},
    {sources:[{id:'one',title:'Notes',claims:['Fact',' fact ']}],criteria:['evidence'],credibleIds:['one']},
    {sources:[{id:'one',title:'Notes',author:'Ada',claims:[]}],criteria:['author','author'],credibleIds:['one']},
    {sources:[{id:'one',title:'Notes',author:'Ada',claims:[]}],criteria:['author'],credibleIds:[]},
    {sources:[{id:'one',title:'Notes',claims:[]}],criteria:['author'],credibleIds:['one']},
    {sources:[{id:'one',title:'Notes',author:'Ada',claims:[]}],criteria:['author'],credibleIds:['one','one']},
    {sources:[{id:'One',title:'Notes',author:'Ada',claims:[]}],criteria:['author'],credibleIds:['one']},
  ])expect(SourceCredibilityCheckerWidgetConfigSchema.safeParse(config).success).toBe(false);
});
