import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {ThemeEvidenceCollectorWidgetConfigSchema} from '../../content/schema';
import ThemeEvidenceCollector from './ThemeEvidenceCollector';

const config={
  themeChoices:['Practice pays off','Cats are funny'],
  evidence:[
    {id:'daily',text:'Ava practices each day.',supports:['Practice pays off']},
    {id:'improves',text:'Ava improves after a week.',supports:['Practice pays off']},
    {id:'joke',text:'The cat wears a tiny hat.',supports:['Cats are funny']},
  ],
  requiredEvidenceCount:2,
};

test('emits authored-order state and completes once when every selected detail supports the theme',async()=>{
  // Removing authored-order sorting or the completion guard must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<ThemeEvidenceCollector config={config} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:'Choose theme Practice pays off'}));
  await user.click(screen.getByRole('button',{name:'Toggle evidence Ava improves after a week.'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Toggle evidence Ava practices each day.'}));

  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'toggle-evidence'},
    {type:'change',value:{theme:'Practice pays off',evidenceIds:['daily','improves']}},
    {type:'complete',value:{theme:'Practice pays off',evidenceIds:['daily','improves']}},
  ]);
  expect(screen.getByTestId('widget-theme-evidence-collector')).toHaveAttribute('data-state','complete');
  expect(screen.getByRole('status')).toHaveTextContent('Theme supported');

  await user.click(screen.getByRole('button',{name:'Toggle evidence The cat wears a tiny hat.'}));
  expect(screen.getByTestId('widget-theme-evidence-collector')).toHaveAttribute('data-state','revision');
  expect(screen.getByRole('status')).toHaveTextContent(/does not support/i);
  expect(screen.getByRole('status')).not.toHaveTextContent(/Ava practices|Ava improves/i);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);

  await user.click(screen.getByRole('button',{name:'Toggle evidence The cat wears a tiny hat.'}));
  expect(screen.getByTestId('widget-theme-evidence-collector')).toHaveAttribute('data-state','complete');
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('keeps complete source details visible with keyboard-ready selected markers',async()=>{
  // Removing persistent source text, aria-pressed, or visible selected cues must fail this test.
  const user=userEvent.setup();
  render(<ThemeEvidenceCollector config={config} onEvent={vi.fn()}/>);

  const theme=screen.getByRole('button',{name:'Choose theme Practice pays off'});
  const evidence=screen.getByRole('button',{name:'Toggle evidence Ava practices each day.'});
  expect(theme).toHaveAttribute('aria-pressed','false');
  expect(evidence).toHaveAttribute('aria-pressed','false');
  expect(screen.getByText('Ava practices each day.')).toBeVisible();
  expect(screen.getByText('Ava improves after a week.')).toBeVisible();

  theme.focus();
  await user.keyboard('{Enter}');
  evidence.focus();
  await user.keyboard(' ');
  expect(theme).toHaveAttribute('aria-pressed','true');
  expect(evidence).toHaveAttribute('aria-pressed','true');
  expect(theme).toHaveTextContent('Selected');
  expect(evidence).toHaveTextContent('Selected');
});

test('emits interaction before complete next state for choosing and resetting',async()=>{
  // Reordering events or omitting the reset state must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<ThemeEvidenceCollector config={config} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:'Choose theme Practice pays off'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'choose-theme'},
    {type:'change',value:{theme:'Practice pays off',evidenceIds:[]}},
  ]);

  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'reset'},
    {type:'change',value:{theme:null,evidenceIds:[]}},
  ]);
});

test('switching themes after success exits visible success without rearming completion',async()=>{
  // Deriving visible state from the completion latch instead of current choices must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<ThemeEvidenceCollector config={config} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Choose theme Practice pays off'}));
  await user.click(screen.getByRole('button',{name:'Toggle evidence Ava practices each day.'}));
  await user.click(screen.getByRole('button',{name:'Toggle evidence Ava improves after a week.'}));
  await user.click(screen.getByRole('button',{name:'Choose theme Cats are funny'}));

  expect(screen.getByTestId('widget-theme-evidence-collector')).toHaveAttribute('data-state','revision');
  expect(screen.getByRole('status')).toHaveTextContent(/does not support/i);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('resets safely on the first render of a new config',async()=>{
  // Retaining stale evidence IDs across config changes must fail this test rather than crash the widget.
  const user=userEvent.setup();
  const view=render(<ThemeEvidenceCollector config={config} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Choose theme Practice pays off'}));
  await user.click(screen.getByRole('button',{name:'Toggle evidence Ava practices each day.'}));

  view.rerender(<ThemeEvidenceCollector config={{themeChoices:['Kindness matters','Weather changes'],evidence:[{id:'help',text:'Mia helps a neighbor.',supports:['Kindness matters']},{id:'share',text:'Mia shares her lunch.',supports:['Kindness matters']}],requiredEvidenceCount:2}} onEvent={vi.fn()}/>);

  expect(screen.getByRole('button',{name:'Choose theme Kindness matters'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByRole('button',{name:'Toggle evidence Mia helps a neighbor.'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByRole('status')).toHaveTextContent('Choose a theme');
  expect(screen.getByTestId('widget-theme-evidence-collector')).toHaveAttribute('data-state','collecting');
});

test('normalizes authoring text and rejects equivalent, dangling, duplicate, or unsolvable references',()=>{
  // Weakening canonical uniqueness, reference integrity, or solvability must fail these literals.
  expect(ThemeEvidenceCollectorWidgetConfigSchema.parse({
    themeChoices:['  Practice   pays off  ','Cats are funny'],
    evidence:[
      {id:'  a  ',text:'  Ava   practices. ',supports:[' Practice pays off ']},
      {id:'b',text:'Ava improves.',supports:['Practice pays off']},
    ],
    requiredEvidenceCount:2,
  })).toEqual({
    themeChoices:['Practice pays off','Cats are funny'],
    evidence:[
      {id:'a',text:'Ava practices.',supports:['Practice pays off']},
      {id:'b',text:'Ava improves.',supports:['Practice pays off']},
    ],
    requiredEvidenceCount:2,
  });

  const base={themeChoices:['Practice pays off','Cats are funny'],evidence:[{id:'a',text:'one',supports:['Practice pays off']},{id:'b',text:'two',supports:['Practice pays off']}],requiredEvidenceCount:2};
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({...base,themeChoices:['Practice pays off',' practice pays off ']}).success).toBe(false);
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({...base,evidence:[base.evidence[0],{id:' A ',text:'two',supports:['Practice pays off']}]}).success).toBe(false);
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({...base,evidence:[base.evidence[0],{id:'b',text:' ONE ',supports:['Practice pays off']}]}).success).toBe(false);
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({...base,evidence:[{id:'a',text:'one',supports:['Missing theme']},base.evidence[1]]}).success).toBe(false);
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({...base,evidence:[{id:'a',text:'one',supports:['Practice pays off',' practice pays off ']},base.evidence[1]]}).success).toBe(false);
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({themeChoices:['A','B'],evidence:[{id:'a',text:'one',supports:['A']},{id:'b',text:'two',supports:['B']}],requiredEvidenceCount:2}).success).toBe(false);
});
