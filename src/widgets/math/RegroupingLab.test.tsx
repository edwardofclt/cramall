import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { WidgetRefSchema } from '../../content/schema';
import RegroupingLab from './RegroupingLab';

const subtraction = { a: 50003, b: 26718, operation: 'subtract' as const, context: 'Remove 26,718 from 50,003.' };
const exchange = (from: number) => `Exchange 1 × ${from.toLocaleString('en-US')} for 10 × ${(from / 10).toLocaleString('en-US')}`;
const trayValue = () => [...document.querySelectorAll('[data-counter-count]')].reduce((sum, el) => sum + Number(el.getAttribute('data-counter-count')) * Number(el.getAttribute('data-unit')), 0);
async function finishDigit(user: ReturnType<typeof userEvent.setup>, digit: number) {
  await user.type(screen.getByRole('spinbutton', {name: 'Result digit'}), String(digit));
  await user.click(screen.getByRole('button', {name: 'Check this column'}));
}

test('the schema rejects impossible or out-of-range arithmetic', () => {
  expect(WidgetRefSchema.safeParse({type:'regrouping-lab',config:subtraction}).success).toBe(true);
  for(const config of [{...subtraction,a:10,b:20},{...subtraction,a:100001},{...subtraction,a:4.2},{...subtraction,operation:'add',a:99999,b:2},{...subtraction,purpose:'inverse-check'}]) expect(WidgetRefSchema.safeParse({type:'regrouping-lab',config}).success).toBe(false);
});

test('subtraction conserves value across zero exchanges and requires removal before committing a column', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<RegroupingLab config={subtraction} onEvent={onEvent}/>);
  expect(screen.queryByRole('button',{name:'Check operation'})).not.toBeInTheDocument();
  await user.click(screen.getByRole('button',{name:'Add the amounts'}));
  expect(screen.getByLabelText('Operation feedback')).toHaveTextContent('Try again');
  expect(screen.queryByRole('spinbutton',{name:'Result digit'})).not.toBeInTheDocument();
  await user.click(screen.getByRole('button',{name:'Subtract the amounts'}));
  expect(trayValue()).toBe(50003);
  expect(screen.getByRole('button',{name:'Remove 8 ones'})).toBeDisabled();
  for(const unit of [10000,1000,100,10]) {
    await user.click(screen.getByRole('button',{name:exchange(unit)}));
    expect(trayValue()).toBe(50003);
  }
  await user.click(screen.getByRole('button',{name:'Remove 8 ones'}));
  expect(trayValue()).toBe(49995);
  await finishDigit(user, 4);
  expect(screen.getByLabelText('Column feedback')).toHaveTextContent('Try again');
  await user.clear(screen.getByRole('spinbutton',{name:'Result digit'}));
  await finishDigit(user, 5);
  await user.click(screen.getByRole('button',{name:exchange(100)}));
  await user.click(screen.getByRole('button',{name:'Remove 1 tens'}));
  expect(screen.getByRole('group',{name:'18 tens in the tray'})).toBeInTheDocument();
  await user.click(screen.getByRole('button',{name:'Exchange 10 × 10 for 1 × 100'}));
  await finishDigit(user,8);
  for(const [amount, place, digit] of [[7,'hundreds',2],[6,'thousands',3],[2,'ten thousands',2]] as const) {
    await user.click(screen.getByRole('button',{name:`Remove ${amount} ${place}`}));
    await finishDigit(user,digit);
  }
  expect(trayValue()).toBe(23285);
  expect(screen.getByLabelText('Result record')).toHaveTextContent('23,285');
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
  await user.click(screen.getByRole('button',{name:'An exchange changes the total value'}));
  expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent('Try again');
  await user.click(screen.getByRole('button',{name:'An exchange keeps the same total value'}));
  expect(screen.getByTestId('widget-regrouping-lab')).toHaveAttribute('data-state','complete');
  await user.click(screen.getByRole('button',{name:'An exchange changes the total value'}));
  expect(screen.getByTestId('widget-regrouping-lab')).not.toHaveAttribute('data-state','complete');
  await user.click(screen.getByRole('button',{name:'An exchange keeps the same total value'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(screen.queryByLabelText('Result record')).not.toBeInTheDocument();
  expect(screen.getByRole('button',{name:'Add the amounts'})).toHaveFocus();
});

test('addition carries into 100,000 and never completes from input edits or exchanges alone', () => {
  const onEvent = vi.fn(); const writes=vi.spyOn(Storage.prototype,'setItem');
  render(<RegroupingLab config={{a:99999,b:1,operation:'add',context:'Combine both amounts.'}} onEvent={onEvent}/>);
  fireEvent.click(screen.getByRole('button',{name:'Add the amounts'}));
  for(const unit of [10,100,1000,10000,100000]) {
    fireEvent.click(screen.getByRole('button',{name:`Exchange 10 × ${(unit / 10).toLocaleString('en-US')} for 1 × ${unit.toLocaleString('en-US')}`}));
    expect(trayValue()).toBe(100000);
    fireEvent.change(screen.getByRole('spinbutton',{name:'Result digit'}),{target:{value:'0'}});
    fireEvent.click(screen.getByRole('button',{name:'Check this column'}));
  }
  fireEvent.change(screen.getByRole('spinbutton',{name:'Result digit'}),{target:{value:'1'}});
  fireEvent.click(screen.getByRole('button',{name:'Check this column'}));
  expect(screen.getByLabelText('Result record')).toHaveTextContent('100,000');
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
  fireEvent.click(screen.getByRole('button',{name:'An exchange keeps the same total value'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
  expect(writes).not.toHaveBeenCalled(); writes.mockRestore();
});


test('the inverse-check activity requires rebuilding the total and explaining the inverse relationship', () => {
  const onEvent = vi.fn();
  render(<RegroupingLab config={{a:38465,b:28956,operation:'add',purpose:'inverse-check',context:'Check 67,421 − 28,956 = 38,465.'}} onEvent={onEvent}/>);
  fireEvent.click(screen.getByRole('button',{name:'Add the amounts'}));
  for(const [unit,digit] of [[10,1],[100,2],[1000,4],[10000,7]] as const) {
    fireEvent.click(screen.getByRole('button',{name:`Exchange 10 × ${(unit/10).toLocaleString('en-US')} for 1 × ${unit.toLocaleString('en-US')}`}));
    fireEvent.change(screen.getByRole('spinbutton',{name:'Result digit'}),{target:{value:String(digit)}});
    fireEvent.click(screen.getByRole('button',{name:'Check this column'}));
  }
  fireEvent.change(screen.getByRole('spinbutton',{name:'Result digit'}),{target:{value:'6'}});
  fireEvent.click(screen.getByRole('button',{name:'Check this column'}));
  expect(screen.getByLabelText('Result record')).toHaveTextContent('67,421');
  fireEvent.click(screen.getByRole('button',{name:'Addition cannot check subtraction'}));
  expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent('Try again');
  fireEvent.click(screen.getByRole('button',{name:'Adding the removed amount rebuilds the original total'}));
  expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent('subtraction checks');
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toEqual([[{type:'complete',value:{result:67421}}]]);
});
