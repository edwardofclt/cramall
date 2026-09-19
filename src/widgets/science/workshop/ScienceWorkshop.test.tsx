import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import ScienceWorkshop from '../ScienceWorkshop';
import type { ScienceWorkshopConfig } from '../../../content/science/workshop-schema';
import { codes, decodeLetters, lampDurations, matchingSpan, plantParts, receiverCases, targetPixels, challengePixels, wavePoints, wavePath } from './models';
import { scienceWorkshopActivities } from '../../../content/science/workshopActivities';
afterEach(cleanup);
const choose = (name: string, value: string) => fireEvent.change(screen.getByLabelText(name), { target: { value } });
const click = (name: string) => fireEvent.click(screen.getByRole('button', { name }));
function mount(activity: ScienceWorkshopConfig['activity']) { const onEvent = vi.fn(); render(<ScienceWorkshop config={{ activity }} onEvent={onEvent}/>); return onEvent; }
test('all eight modes require work and reset without writing progress', () => { const storage = vi.spyOn(Storage.prototype, 'setItem'); for (const item of scienceWorkshopActivities) {
    const event = mount(item.config.activity);
    expect(screen.getByRole('region', { name: /work surface/ })).toBeInTheDocument();
    expect(event).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'complete' }));
    click('Reset activity');
    cleanup();
} expect(storage).not.toHaveBeenCalled(); storage.mockRestore(); });
test('wave requires matching adjacent points and a changed retained diagram', () => { mount('crest-to-crest'); choose('Prediction', 'B'); choose('A start', '0'); choose('A end', '1'); choose('B start', '0'); choose('B end', '2'); click('Check spans'); expect(screen.getByLabelText('Span feedback')).toHaveTextContent('different kinds'); choose('A end', '2'); click('Check spans'); click('Bring matching points closer'); click('Pin changed diagram'); expect(screen.getByLabelText('Retained wave comparison')).toHaveTextContent('closer'); });
test('pixel entry decodes exactly nine values and requires repairing a located cell', () => { mount('pixel-post'); choose('Reading order', 'rows'); click('Decode my values'); expect(screen.getByLabelText('Encoding feedback')).toHaveTextContent('Every square'); '110110100'.split('').forEach((v, i) => choose(`Value row ${Math.floor(i / 3) + 1} column ${i % 3 + 1}`, v)); click('Decode my values'); click('Open one value changed'); choose('Repair cell', '5'); choose('Repair value', '0'); click('Check repair'); expect(screen.getByLabelText('Repair feedback')).toHaveTextContent('repaired'); });
test('lamp requires every 6,7,6 record and keeps timeline consistent', () => { mount('lamp-test-notebook'); ['check', 'close', 'observe', 'record'].forEach((v, i) => choose(`Procedure step ${i + 1}`, v)); click('Lock common settings'); for (let i = 0; i < 3; i++) {
    click(`Inspect trial ${i + 1}`);
    click('Show whole interval');
    choose(`Trial ${i + 1} lit seconds`, String([6, 7, 6][i]));
    choose(`Trial ${i + 1} effect`, 'off');
} click('Check notebook'); expect(screen.getByLabelText('Notebook feedback')).toHaveTextContent('6, 7, 6'); });
test('sense model needs processing and two distinct responses before sight transfer', () => { mount('sense-response'); choose('Sense node', 'sight'); choose('Processing node', 'brain'); choose('Response node', 'turn'); click('Run and retain path'); expect(screen.getByLabelText('Trail feedback')).toHaveTextContent('sound'); choose('Sense node', 'hearing'); click('Run and retain path'); click('Run and retain path'); expect(screen.getByLabelText('Trail feedback')).toHaveTextContent('different'); choose('Response node', 'pause'); click('Run and retain path'); click('Open berry scene'); choose('Sense node', 'sight'); choose('Response node', 'approach'); click('Run and retain path'); expect(screen.getByLabelText('Retained response paths')).toHaveTextContent('approach'); });
test('message builds two exact encodings before opening separately supplied trials', () => { mount('message-design-trials'); ['....', '---', '--', '.'].forEach((v, i) => choose(`A ${'HOME'[i]}`, v)); click('Reconstruct A'); choose('Second solution', 'C'); ['1100', '1010', '0101', '0011'].forEach((v, i) => choose(`C ${'HOME'[i]}`, v)); click('Reconstruct C'); click('Open supplied trial record'); expect(screen.getByRole('table', { name: 'Supplied HOME trials' })).toHaveTextContent('16'); });
test('receiver excludes notebook detail and sorts routes separately from effects', () => { mount('receiver-changes'); click('Notebook cover was blue'); click('Check useful observations'); expect(screen.getByLabelText('Observation feedback')).toHaveTextContent('receiving'); });
test('plant puts structures on real aboveground and root diagram and rejects light from roots', () => { mount('plant-system'); choose('Water and support path', 'light'); click('Check plant system'); expect(screen.getByLabelText('Plant feedback')).toHaveTextContent('Light'); });
test.each(['plant', 'wren'])('survival accepts a selectable %s path but rejects preferences', organism => { mount('survival-evidence'); choose('Organism', organism); click('The bird was the observer’s favorite'); click('Check evidence links'); expect(screen.getByLabelText('Evidence feedback')).toHaveTextContent('structure doing a job'); });
function build(activity: ScienceWorkshopConfig['activity']) {
    switch (activity) {
        case 'receiver-changes':
            for (const c of receiverCases)
                click(`${c.receiver}: ${c.effect}`);
            click('Check useful observations');
            for (const c of receiverCases)
                for (const col of ['source', 'route', 'receiver', 'effect'] as const)
                    choose(`${c.name} ${col}`, c[col]);
            click('Check comparison rows');
            choose('Comparison route 1', 'Sound');
            choose('Comparison route 2', 'Light');
            break;
        case 'crest-to-crest':
            choose('Prediction', 'A');
            choose('A start', '0');
            choose('A end', '2');
            choose('B start', '1');
            choose('B end', '3');
            click('Check spans');
            expect(screen.getByLabelText('Span feedback')).toHaveTextContent('Revise your prediction');
            click('Bring matching points closer');
            click('Pin changed diagram');
            break;
        case 'pixel-post':
            choose('Reading order', 'rows');
            targetPixels.split('').forEach((v, i) => choose(`Value row ${Math.floor(i / 3) + 1} column ${i % 3 + 1}`, v));
            click('Decode my values');
            click('Open one value changed');
            choose('Repair cell', '5');
            choose('Repair value', '0');
            click('Check repair');
            break;
        case 'message-design-trials':
            codes.A.forEach((v, i) => choose(`A ${'HOME'[i]}`, v));
            click('Reconstruct A');
            choose('Second solution', 'C');
            codes.C.forEach((v, i) => choose(`C ${'HOME'[i]}`, v));
            click('Reconstruct C');
            click('Open supplied trial record');
            choose('Accuracy evidence', 'accuracy');
            choose('Clarity evidence', 'clarity');
            choose('Values-used evidence', 'count');
            choose('Message requirement', 'printed');
            choose('Best design for this need', 'A');
            click('Check design comparison');
            break;
        case 'lamp-test-notebook':
            ['check', 'close', 'observe', 'record'].forEach((v, i) => choose(`Procedure step ${i + 1}`, v));
            click('Lock common settings');
            lampDurations.forEach((v, i) => { click(`Inspect trial ${i + 1}`); click('Show whole interval'); choose(`Trial ${i + 1} lit seconds`, String(v)); choose(`Trial ${i + 1} effect`, 'off'); });
            click('Check notebook');
            choose('Trials meeting ten seconds', '0');
            choose('Observation or explanation', 'effect');
            click('Check goal judgment');
            break;
        case 'plant-system':
            plantParts.forEach((p, i) => { choose(`Plant site ${i + 1} label`, p); choose(`Plant site ${i + 1} function`, String(i)); });
            choose('Water and support path', 'chain');
            choose('Light input', 'leaves');
            choose('Reproduction or protection link', 'flower');
            click('Check plant system');
            break;
        case 'survival-evidence':
            choose('Organism', 'plant');
            choose('Cooperating structures claim', 'system');
            click('Blackberry roots reached damp soil during a dry week');
            click('Its stem remained upright and held spread leaves in sunlight');
            choose('Function for roots', 'Water access');
            choose('Function for stem', 'Support leaves in light');
            click('Check evidence links');
            break;
        case 'sense-response':
            choose('Sense node', 'hearing');
            choose('Processing node', 'brain');
            choose('Response node', 'turn');
            click('Run and retain path');
            choose('Response node', 'fly');
            click('Run and retain path');
            click('Open berry scene');
            choose('Sense node', 'sight');
            choose('Response node', 'continue');
            click('Run and retain path');
            break;
    }
}
function explain() { choose('My explanation', 'supported'); choose('Evidence limit', 'limited'); click('Check explanation'); }
const upstream: Record<ScienceWorkshopConfig['activity'], readonly [
    string,
    string
]> = {
    'receiver-changes': ['Sound route', 'Still → turning'], 'crest-to-crest': ['A end', '1'], 'pixel-post': ['Value row 1 column 1', '0'], 'message-design-trials': ['A H', '.'], 'lamp-test-notebook': ['Trial 3 lit seconds', '10'], 'plant-system': ['Water and support path', 'light'], 'survival-evidence': ['Function for roots', 'Feeding'], 'sense-response': ['Sense node', 'hearing']
};
for (const { config: { activity } } of scienceWorkshopActivities) {
    test(`${activity}: complete reasoning, revise, reset and complete once per attempt`, () => {
        const event = mount(activity);
        build(activity);
        choose('My explanation', 'wrong');
        choose('Evidence limit', 'all');
        click('Check explanation');
        expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent('Review');
        expect(event.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(0);
        explain();
        expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent('Explanation complete');
        click('Check explanation');
        expect(event.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(1);
        choose('Evidence limit', 'all');
        expect(screen.getByLabelText('Explanation feedback')).toBeEmptyDOMElement();
        choose('Evidence limit', 'limited');
        click('Check explanation');
        expect(event.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(1);
        choose(...upstream[activity]);
        expect(screen.queryByText(/Explanation complete/)).not.toBeInTheDocument();
        click('Reset activity');
        expect(screen.queryByLabelText('My explanation')).not.toBeInTheDocument();
        build(activity);
        expect(screen.getByLabelText('My explanation')).toHaveValue('');
        explain();
        expect(event.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(2);
    });
}
test('wren has its own complete cooperating-functions path', () => { const event = mount('survival-evidence'); choose('Organism', 'wren'); choose('Cooperating structures claim', 'system'); click('Its beak gathered insects'); click('Its wings carried it to cover'); choose('Function for beak', 'Feeding'); choose('Function for wings', 'Movement to cover'); click('Check evidence links'); explain(); expect(event).toHaveBeenCalledWith({ type: 'complete', value: { activity: 'survival-evidence' } }); });
test('Morse and drum alternate path keeps local HOME separate from supplied HOHE', () => { mount('message-design-trials'); codes.A.forEach((v, i) => choose(`A ${'HOME'[i]}`, v)); click('Reconstruct A'); choose('Second solution', 'B'); codes.B.forEach((v, i) => choose(`B ${'HOME'[i]}`, v)); click('Reconstruct B'); expect(screen.getByLabelText('B reconstruction feedback')).toHaveTextContent('HOME'); click('Open supplied trial record'); expect(screen.getByRole('table', { name: 'Supplied HOME trials' })).toHaveTextContent('HOHE'); });
test('rechecking upstream work never restores a prior explanation success', () => { mount('plant-system'); build('plant-system'); explain(); choose('Light input', 'roots'); click('Check plant system'); expect(screen.queryByText(/Explanation complete/)).not.toBeInTheDocument(); choose('Light input', 'leaves'); click('Check plant system'); expect(screen.getByLabelText('My explanation')).toHaveValue(''); expect(screen.getByLabelText('Evidence limit')).toHaveValue(''); expect(screen.getByLabelText('Explanation feedback')).toBeEmptyDOMElement(); });
test('pixel keyboard cursor follows row-major order and writes only binary cells', () => { mount('pixel-post'); const cursor = screen.getByRole('group', { name: 'Keyboard pixel cursor' }); fireEvent.keyDown(cursor, { key: '1' }); fireEvent.keyDown(cursor, { key: 'ArrowDown' }); fireEvent.keyDown(cursor, { key: '0' }); expect(screen.getByLabelText('Value row 1 column 1')).toHaveValue('1'); expect(screen.getByLabelText('Value row 2 column 1')).toHaveValue('0'); expect(screen.getByLabelText('Value row 1 column 2')).toHaveValue(''); });
test('authored models preserve exact geometry, values and unique codes', () => { expect(targetPixels).toBe('110110100'); expect(challengePixels.split('').flatMap((v, i) => v !== targetPixels[i] ? [i] : [])).toEqual([5]); expect(lampDurations).toEqual([6, 7, 6]); for (const id of ['A', 'B', 'C'] as const) {
    expect(new Set(codes[id]).size).toBe(4);
    expect(decodeLetters(id, [...codes[id]])).toBe('HOME');
    expect(codes[id].join('').length).toBe({ A: 10, B: 8, C: 16 }[id]);
} expect(matchingSpan('0', '1')).toBe(false); expect(matchingSpan('0', '4')).toBe(false); expect(matchingSpan('1', '3')).toBe(true); for (const n of [1, 2, 3, 4, 5]) {
    const p = wavePoints(n);
    expect(new Set(p.map(v => v.y))).toEqual(new Set([35, 95]));
    expect(p[1].x - p[0].x).toBeCloseTo(150 / n);
    expect(wavePath(n)).toMatch(/^M20,65/);
} });
test('lamp goal comparison refuses a near-pass judgment before final reasoning', () => { mount('lamp-test-notebook'); build('lamp-test-notebook'); choose('Trials meeting ten seconds', '1'); click('Check goal judgment'); expect(screen.getByLabelText('Goal feedback')).toHaveTextContent('whole ten'); expect(screen.queryByLabelText('My explanation')).not.toBeInTheDocument(); choose('Trials meeting ten seconds', '0'); click('Check goal judgment'); expect(screen.getByLabelText('My explanation')).toBeInTheDocument(); });
test('pixel repair value has an explicit 0/1 keyboard equivalent', () => { mount('pixel-post'); build('pixel-post'); choose('Repair value', '1'); fireEvent.keyDown(screen.getByLabelText('Repair value'), { key: '0' }); expect(screen.getByLabelText('Repair value')).toHaveValue('0'); click('Check repair'); expect(screen.getByLabelText('Repair feedback')).toHaveTextContent('repaired'); });
test('initial and pinned wave plots share one layout box and the same coordinate scale',()=>{
 mount('crest-to-crest');build('crest-to-crest');
 const initial=screen.getByRole('img',{name:/^Initial B:/});
 const pinned=screen.getByRole('img',{name:/^Pinned B:/});
 expect(pinned.parentElement?.parentElement).toBe(initial.parentElement?.parentElement);
 expect(pinned.parentElement?.className).toBe(initial.parentElement?.className);
 expect(pinned.getAttribute('viewBox')).toBe(initial.getAttribute('viewBox'));
});
test('retry coaching does not diagnose unset pixels when all nine values are entered',()=>{
 const event=mount('pixel-post');choose('Reading order','rows');for(let i=0;i<9;i++)choose(`Value row ${Math.floor(i/3)+1} column ${i%3+1}`,'0');click('Decode my values');
 expect(screen.getByLabelText('Encoding feedback')).toHaveTextContent('first difference');expect(event).toHaveBeenCalledWith({type:'coach',cue:'retry'});
 const coach=scienceWorkshopActivities.find(a=>a.config.activity==='pixel-post')!.coach;
 expect(coach.reactions.retry.text).not.toMatch(/every square needs a value/i);
});
test('retry coaching does not call nonadjacent crests different kinds of points',()=>{
 mount('crest-to-crest');choose('Prediction','B');choose('A start','0');choose('A end','4');choose('B start','0');choose('B end','2');click('Check spans');
 expect(screen.getByLabelText('Span feedback')).toHaveTextContent('do not skip');
 const coach=scienceWorkshopActivities.find(a=>a.config.activity==='crest-to-crest')!.coach;
 expect(coach.reactions.retry.text).not.toMatch(/different kinds of points/i);
});
test('lamp interval always has a closed switch spanning a real wire gap',()=>{
 mount('lamp-test-notebook');['check','close','observe','record'].forEach((v,i)=>choose(`Procedure step ${i+1}`,v));click('Lock common settings');click('Inspect trial 1');
 const circuit=screen.getByRole('img',{name:/^Labeled battery/});
 expect(circuit).toHaveAccessibleName(/time 0 seconds: lamp lit.*switch closed/i);
 expect(circuit.querySelector('[data-circuit-part="wire"]')).toHaveAttribute('d','M55 140V60H220M270 60H295V140H165M125 140H55');
 expect(circuit.querySelector('[data-circuit-part="switch"]')).toHaveAttribute('d','M125 140L165 140');
 click('Show whole interval');expect(circuit).toHaveAccessibleName(/lamp off.*switch closed/i);
 click('Replay from start');expect(circuit.querySelector('[data-circuit-part="switch"]')).toHaveAttribute('d','M125 140L165 140');
});
test('pixel upstream edits retain earlier sent reconstruction and successful repair without current success',()=>{
 mount('pixel-post');build('pixel-post');explain();choose('Value row 1 column 1','0');
 expect(screen.getByRole('region',{name:'Earlier local reconstruction'})).toHaveTextContent('Black 1');
 expect(screen.getByLabelText('Retained repair record')).toHaveTextContent(/earlier.*row 2, column 3/i);
 expect(screen.queryByText(/Explanation complete/)).not.toBeInTheDocument();expect(screen.queryByLabelText('My explanation')).not.toBeInTheDocument();
 choose('Value row 1 column 1','1');click('Decode my values');expect(screen.queryByLabelText('My explanation')).not.toBeInTheDocument();
 click('Open one value changed');expect(screen.getByLabelText('Repair cell')).toHaveValue('');expect(screen.getByLabelText('Retained repair record')).toHaveTextContent(/earlier/i);
 click('Reset activity');expect(screen.queryByLabelText('Retained repair record')).not.toBeInTheDocument();
});
test('long chosen explanations are also visible as full wrapping text outside native options',()=>{
 mount('crest-to-crest');build('crest-to-crest');choose('My explanation','supported');
 expect(screen.getByLabelText('My explanation selected text')).toHaveTextContent('A initially has shorter wavelength than B. Changed matching-point spacing changes wavelength while height stays fixed.');
 choose('My explanation','wrong');expect(screen.getByLabelText('My explanation selected text')).toHaveTextContent('Higher crests alone show a longer wavelength.');
});
