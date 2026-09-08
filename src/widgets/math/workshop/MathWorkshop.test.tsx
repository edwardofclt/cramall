import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import MathWorkshop from '../MathWorkshop';
import type { MathWorkshopConfig } from '../../../content/math/workshop-schema';
const click = (name: string) => fireEvent.click(screen.getByRole('button', { name }));
const fill = (name: string, value: string) => fireEvent.change(screen.getByLabelText(name, { exact: true }), { target: { value } });
const check = (name: string) => fireEvent.click(screen.getByRole('checkbox', { name }));
function setup(activity: MathWorkshopConfig['activity']) { const events = vi.fn(); render(<MathWorkshop config={{ activity }} onEvent={events}/>); return events; }
function finish(reason: string, events: ReturnType<typeof vi.fn>) {
    fill('Explain your work', reason);
    click('Check explanation');
    expect(screen.getByText('Activity complete. Your reasoning matches your work.')).toBeInTheDocument();
    click('Check explanation');
    expect(events.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(1);
    click('Reset activity');
    expect(screen.queryByText('Activity complete. Your reasoning matches your work.')).not.toBeInTheDocument();
}
describe('concrete Math workshop loops', () => {
    test.each([['1000', '36000', '23000', '59000'], ['10000', '40000', '20000', '60000']])('estimates with %s endpoints; conceals exact sum until supported verdict', (place, a, b, sum) => {
        const e = setup('estimate-checkpoint');
        expect(screen.queryByText(/Exact sum: 59,111/)).not.toBeInTheDocument();
        fill('Prediction', 'plausible');
        click('Commit prediction');
        fill('Rounding place', place);
        click('Place first count');
        click('Place second count');
        fill('First rounded endpoint', a);
        fill('Second rounded endpoint', b);
        fill('Estimate operation', '+');
        fill('Estimate result', sum);
        click('Check estimate');
        fill('Verdict', 'plausible');
        click('Check verdict');
        expect(screen.queryByText(/Exact sum: 59,111/)).not.toBeInTheDocument();
        fill('Verdict', 'too-large');
        click('Check verdict');
        expect(screen.getByText(/Exact sum: 59,111/)).toBeInTheDocument();
        fill('Rounding place', place === '1000' ? '10000' : '1000');
        expect(screen.queryByText(/Exact sum: 59,111/)).not.toBeInTheDocument();
        fill('Rounding place', place);
        click('Place first count');
        click('Place second count');
        fill('First rounded endpoint', a);
        fill('Second rounded endpoint', b);
        fill('Estimate operation', '+');
        fill('Estimate result', sum);
        click('Check estimate');
        fill('Verdict', 'too-large');
        click('Check verdict');
        finish('size', e);
    });
    test('tests all rule rows, repairs false confidence and solves inverse input', () => {
        const e = setup('acorn-rule-machine');
        fill('Machine rule', 'add10');
        click('Send 2 bags');
        expect(screen.getByText('Predicted 12 seeds — matches')).toBeInTheDocument();
        expect(screen.queryByLabelText('Seeds for 5 bags')).not.toBeInTheDocument();
        click('Send 4 bags');
        click('Send 7 bags');
        expect(screen.getByText('Predicted 14 seeds — does not match')).toBeInTheDocument();
        fill('Machine rule', 'times6');
        expect(screen.queryByText(/Predicted 14 seeds/)).not.toBeInTheDocument();
        click('Send 2 bags');
        click('Send 4 bags');
        click('Send 7 bags');
        fill('Seeds for 5 bags', '30');
        fill('Bags for 54 seeds', '8');
        click('Check missing entries');
        expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument();
        fill('Bags for 54 seeds', '9');
        click('Check missing entries');
        finish('six', e);
    });
    test('builds packs, runs ordered stages and reconstructs unknown pack count', () => {
        const e = setup('pack-use-rebuild');
        for (let i = 1; i <= 4; i++)
            click(`Place bundle in pack ${i}`);
        fill('First operation', '-');
        fill('Second operation', '×');
        click('Check first equation');
        expect(screen.queryByRole('button', { name: 'Run packed stage' })).not.toBeInTheDocument();
        fill('First operation', '×');
        fill('Second operation', '-');
        fill('Unknown position', 'result');
        click('Check first equation');
        click('Run packed stage');
        fill('Packed markers', '72');
        click('Check packed total');
        click('Move 15 markers to used tray');
        fill('Remaining markers', '57');
        click('Check remaining total');
        click('Rebuild inverse story');
        fill('Inverse unknown position', 'packs');
        fill('Inverse first operation', '×');
        fill('Inverse second operation', '-');
        click('Check inverse equation');
        click('Restore 15 used markers');
        click('Regroup into packs of 18');
        fill('Original packs', '3');
        click('Check original packs');
        expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument();
        fill('Original packs', '4');
        click('Check original packs');
        fill('Original packs','5'); expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument(); fill('Original packs','4'); click('Check original packs');
        finish('undo', e);
    });
    test('conserves eleven eighths and rejects reordered duplicate partitions', () => {
        const e = setup('fraction-picnic');
        fill('Prediction', 'more');
        click('Commit prediction');
        for (let i = 0; i < 5; i++)
            click('Add eighth to plate A');
        for (let i = 0; i < 6; i++)
            click('Add eighth to plate B');
        fill('Piece denominator', '11');
        click('Record grouping');
        expect(screen.queryByText('Record 1: 5/8 + 6/8 = 11/8')).not.toBeInTheDocument();
        fill('Piece denominator', '8');
        click('Record grouping');
        click('Remove eighth from plate B');
        click('Add eighth to plate A');
        click('Record grouping');
        expect(screen.getByText(/Changing the order repeats/)).toBeInTheDocument();
        click('Remove eighth from plate B');
        click('Add eighth to plate A');
        click('Record grouping');
        expect(screen.getByText('Record 2: 7/8 + 4/8 = 11/8')).toBeInTheDocument();
        fill('Piece denominator','11'); expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument(); fill('Piece denominator','8'); click('Record grouping');
        finish('same-pieces', e);
    });
    test('bundles thirteen fourths and independently unbundles two and three fourths', () => {
        const e = setup('bundle-the-fourths');
        expect(screen.queryByText(/3 1\/4/)).not.toBeInTheDocument();
        fill('Prediction', '2-3');
        click('Commit prediction');
        click('Make a whole');
        click('Make a whole');
        click('Make a whole');
        fill('Whole groups', '3');
        fill('Leftover numerator', '1');
        fill('Mixed denominator', '1');
        fill('Fraction numerator', '13');
        fill('Fraction denominator', '4');
        click('Check both names');
        expect(screen.queryByRole('button', { name: 'Start reverse round' })).not.toBeInTheDocument();
        fill('Mixed denominator', '4');
        click('Check both names');
        click('Start reverse round');
        click('Break one whole into fourths');
        click('Break one whole into fourths');
        fill('Reverse numerator', '11');
        fill('Reverse denominator', '4');
        click('Check reverse name');
        fill('Reverse numerator','12'); expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument(); fill('Reverse numerator','11'); click('Check reverse name');
        finish('four', e);
    });
    test('exchanges exact hundredths and subtracts after renaming', () => {
        const e = setup('decimal-exchange-mat');
        fill('Prediction', 'below-one');
        click('Commit prediction');
        click('Place 0.48');
        click('Trade 10 hundredths for 1 tenth');
        expect(screen.getByText(/An exchange needs ten smaller pieces/)).toBeInTheDocument();
        click('Place 0.36');
        click('Trade 10 hundredths for 1 tenth');
        fill('Fraction numerator', '84');
        fill('Fraction denominator', '100');
        fill('Decimal result', '0.84');
        click('Check decimal record');
        fill('Round explanation', 'equal');
        click('Confirm round explanation');
        click('Start subtraction round');
        fill('Prediction', 'below-one');
        click('Commit prediction');
        click('Remove 3 tenths and 5 hundredths');
        expect(screen.getByText(/Rename a larger piece/)).toBeInTheDocument();
        click('Trade 1 whole for 10 tenths');
        click('Trade 1 tenth for 10 hundredths');
        click('Remove 3 tenths and 5 hundredths');
        fill('Fraction numerator', '85');
        fill('Fraction denominator', '100');
        fill('Decimal result', '0.85');
        click('Check decimal record');
        fill('Round explanation', 'equal');
        click('Confirm round explanation');
        fill('Round explanation','more'); expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument(); fill('Round explanation','equal'); click('Confirm round explanation');
        finish('equal', e);
    });
    test('allocates all opposite sides and transfers perimeter with length units', () => {
        const e = setup('fence-the-garden');
        fill('Prediction', 'one');
        click('Commit prediction');
        click('Fence top with 11 m');
        fill('Left fence meters', '6');
        fill('Right fence meters', '6');
        click('Allocate widths');
        fill('Width in meters', '6');
        fill('Perimeter equation', '11+6+11+6');
        click('Check garden');
        expect(screen.queryByRole('button', { name: 'Start transfer garden' })).not.toBeInTheDocument();
        click('Fence bottom with 11 m');
        click('Allocate widths');
        click('Check garden');
        click('Start transfer garden');
        fill('Transfer perimeter equation', '7+4+7+4');
        fill('Transfer fence total', '22');
        fill('Fence unit', 'm²');
        click('Check transfer');
        expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument();
        fill('Fence unit', 'm');
        click('Check transfer');
        fill('Transfer fence total','23'); expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument(); fill('Transfer fence total','22'); click('Check transfer');
        finish('opposites', e);
    });
    test('classifies angle-derived triangles with all memberships and rotation evidence', () => {
        const e = setup('triangle-inspection-desk');
        const answers = [['A', 'equilateral', ['acute', 'equiangular']], ['B', 'isosceles', ['right']], ['C', 'scalene', ['obtuse']], ['D', 'isosceles', ['acute']]] as const;
        for (const [id, side, angles] of answers) {
            click(`Inspect triangle ${id}`);
            fill('Side category', side);
            for (const angle of angles)
                check(angle);
            if (id === 'A') {
                check('equiangular');
                click('Check triangle');
                expect(screen.getByText(/Check both whether every angle/)).toBeInTheDocument();
                check('equiangular');
            }
            click('Check triangle');
        }
        click('Rotate triangle');
        fill('Evidence for triangle D', 'marks');
        click('Check evidence');
        finish('unchanged', e);
    });
    test('splits basket symbols, selects real data, retains three linked equations', () => {
        const e = setup('graph-detective');
        click('Enlarge basket key');
        expect(screen.getByRole('img', { name: 'One basket contains four apples' })).toBeInTheDocument();
        click('Split whole baskets into halves');
        for (let i = 1; i <= 5; i++)
            click(`Mark half basket ${i}`);
        fill('Apples per half basket', '2');
        fill('Graph operation', '+');
        fill('Graph result', '10');
        fill('Graph unit', 'apples');
        click('Check case');
        expect(screen.queryByLabelText('Case explanation')).not.toBeInTheDocument();
        fill('Graph operation', '×');
        click('Check case');
        fill('Case explanation', 'key');
        click('Confirm case explanation');
        click('Open bird case');
        click('Mark Robin bar');
        click('Mark Wren bar');
        fill('Graph operation', '-');
        fill('Graph result', '7');
        fill('Graph unit', 'birds');
        click('Check case');
        fill('Case explanation', 'difference');
        click('Confirm case explanation');
        click('Open ribbon case');
        click('Mark ribbon 3/8 m');
        click('Mark ribbon 4/8 m');
        fill('Graph operation', '+');
        fill('Graph result', '7/8');
        fill('Graph unit', 'm');
        click('Check case');
        fill('Case explanation', 'eighths');
        click('Confirm case explanation');
        expect(within(screen.getByRole('region', { name: 'Case records' })).getAllByRole('listitem')).toHaveLength(3);
        click('Mark ribbon 3/8 m'); expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument(); expect(within(screen.getByRole('region',{name:'Case records'})).getAllByRole('listitem')).toHaveLength(2); click('Mark ribbon 3/8 m'); click('Check case'); click('Confirm case explanation');
        finish('read', e);
    });
});
test('prediction commitment is required before the estimate can be submitted', () => {
    setup('estimate-checkpoint');
    click('Place first count');
    click('Place second count');
    fill('First rounded endpoint', '36000');
    fill('Second rounded endpoint', '23000');
    fill('Estimate operation', '+');
    fill('Estimate result', '59000');
    click('Check estimate');
    expect(screen.queryByLabelText('Verdict')).not.toBeInTheDocument();
    fill('Prediction', 'too-large');
    click('Commit prediction');
    click('Check estimate');
    expect(screen.getByLabelText('Verdict')).toBeInTheDocument();
});
test('every activity keeps its reset inside the stable workbench task panel', () => {
    setup('acorn-rule-machine');
    expect(within(screen.getByRole('region', { name: 'Acorn Rule Machine tasks' })).getByRole('button', { name: 'Reset activity' })).toBeInTheDocument();
});
test('picture calculation requires the learner to interpret the half-symbol key', () => {
    setup('graph-detective');
    click('Split whole baskets into halves');
    for (let i = 1; i <= 5; i++)
        click(`Mark half basket ${i}`);
    fill('Graph operation', '×');
    fill('Graph result', '10');
    fill('Graph unit', 'apples');
    click('Check case');
    expect(screen.queryByLabelText('Case explanation')).not.toBeInTheDocument();
    fill('Apples per half basket', '2');
    click('Check case');
    expect(screen.getByLabelText('Case explanation')).toBeInTheDocument();
});
test('changing the inspected triangle invalidates submitted rotation evidence', () => {
    setup('triangle-inspection-desk');
    for (const [id, side, angles] of [['A', 'equilateral', ['acute', 'equiangular']], ['B', 'isosceles', ['right']], ['C', 'scalene', ['obtuse']], ['D', 'isosceles', ['acute']]] as const) {
        click(`Inspect triangle ${id}`);
        fill('Side category', side);
        for (const a of angles)
            check(a);
        click('Check triangle');
    }
    click('Rotate triangle');
    fill('Evidence for triangle D', 'marks');
    click('Check evidence');
    expect(screen.getByLabelText('Explain your work')).toBeInTheDocument();
    click('Inspect triangle A');
    expect(screen.queryByLabelText('Explain your work')).not.toBeInTheDocument();
});
test('reset allows another complete attempt without writing storage', () => {
    const storage = vi.spyOn(Storage.prototype, 'setItem');
    const e = setup('acorn-rule-machine');
    function solve() { fill('Machine rule', 'times6'); for (const n of [2, 4, 7])
        click(`Send ${n} bags`); fill('Seeds for 5 bags', '30'); fill('Bags for 54 seeds', '9'); click('Check missing entries'); fill('Explain your work', 'six'); click('Check explanation'); }
    solve();
    fill('Seeds for 5 bags', '31');
    expect(screen.queryByText('Activity complete. Your reasoning matches your work.')).not.toBeInTheDocument();
    fill('Seeds for 5 bags', '30');
    click('Check missing entries');
    fill('Explain your work', 'six');
    click('Check explanation');
    expect(e.mock.calls.filter(([x]) => x.type === 'complete')).toHaveLength(1);
    click('Reset activity');
    solve();
    expect(e.mock.calls.filter(([x]) => x.type === 'complete')).toHaveLength(2);
    expect(storage).not.toHaveBeenCalled();
    storage.mockRestore();
});

test('long selected reasoning is fully visible outside the closed select',()=>{
 render(<MathWorkshop config={{activity:'acorn-rule-machine'}} onEvent={vi.fn()}/>);
 fill('Machine rule','times6'); for(const n of [2,4,7])click(`Send ${n} bags`); fill('Seeds for 5 bags','30'); fill('Bags for 54 seeds','9'); click('Check missing entries'); fill('Explain your work','six');
 expect(screen.getByText('Chosen: Each bag adds the same six seeds.')).toBeInTheDocument();
});
