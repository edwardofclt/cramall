import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import { lessonsByUnit } from '../../content/science';
import type { WidgetConfig, WidgetType } from '../../content/schema';
import EnergyTransferBuilder from './EnergyTransferBuilder';
import EnergyConversionDesigner from './EnergyConversionDesigner';
import WaveMaker from './WaveMaker';
import LightReflectionEye from './LightReflectionEye';
import MessageSender from './MessageSender';
import ErosionSimulator from './ErosionSimulator';
import RockLayerExplorer from './RockLayerExplorer';
import ResourceSorter from './ResourceSorter';
import AnimalStructureMatcher from './AnimalStructureMatcher';
import TopographicMapExplorer from './TopographicMapExplorer';
import HazardSolutionDesigner from './HazardSolutionDesigner';
import CollisionRamp from './CollisionRamp';

function config<T extends WidgetType>(id: string): WidgetConfig<T> {
 return Object.values(lessonsByUnit).flat().flatMap(l => l.learnCards).find(c => c.id === id)!.widget!.config as WidgetConfig<T>;
}
const completions = (events: ReturnType<typeof vi.fn>) => events.mock.calls.filter(([e]) => e.type === 'complete');

test('transfer model requires a saved prediction and a run before interpreting the receiver', async () => {
 const user = userEvent.setup(); const onEvent = vi.fn();
 render(<EnergyTransferBuilder config={config<'energy-transfer-builder'>('science-u02-l01-c2')} onEvent={onEvent}/>);
 expect(screen.queryByRole('heading', { name: 'Distractors' })).not.toBeInTheDocument();
 expect(screen.getByRole('button', { name: 'Run transfer model' })).toBeDisabled();
 await user.click(screen.getByRole('button', { name: 'Predict no change' }));
 for (const token of ['Sun', 'light', 'paper square']) await user.click(screen.getByRole('button', { name: `Add ${token} to path` }));
 expect(screen.getByRole('button', { name: 'Observe warmer effect' })).toBeDisabled();
 await user.click(screen.getByRole('button', { name: 'Run transfer model' }));
 await user.click(screen.getByRole('button', { name: 'Observe warmer effect' }));
 expect(screen.getByLabelText('Prediction feedback')).toHaveTextContent(/differed/);
 expect(screen.getByLabelText('Transfer observation')).toHaveTextContent(/warmer/);
 expect(completions(onEvent)).toHaveLength(1);
});

test('conversion waits for running the connected device and explaining its effect', async () => {
 const user = userEvent.setup(); const onEvent = vi.fn();
 render(<EnergyConversionDesigner config={config<'energy-conversion-designer'>('science-u05-l01-c2')} onEvent={onEvent}/>);
 for (const label of ['Hand-crank generator','Buzzer']) await user.click(screen.getByRole('button',{name:`Add ${label}`}));
 expect(completions(onEvent)).toHaveLength(0);
 await user.click(screen.getByRole('button',{name:'Run connected device'}));
 expect(screen.getByLabelText('Device observation')).toHaveTextContent(/buzzer/i);

 expect(screen.getByRole('button',{name:'The device changed motion into another effect'}).closest('[data-activity-reveal]')).not.toBeNull(); await user.click(screen.getByRole('button',{name:'The device changed motion into another effect'}));
 expect(completions(onEvent)).toHaveLength(1);
 expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'The device used up all its energy'}));
 expect(screen.getByTestId('widget-energy-conversion-designer')).not.toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'The device changed motion into another effect'}));
 expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state','complete');
 expect(completions(onEvent)).toHaveLength(1);
});

test('wave changes stay neutral until a comparison is committed', async () => {
 const user=userEvent.setup(); const onEvent=vi.fn();
 render(<WaveMaker config={config<'wave-maker'>('science-u03-l01-c2')} onEvent={onEvent}/>);
 await user.click(screen.getByRole('button',{name:'Increase amplitude'}));
 await user.click(screen.getByRole('button',{name:'Increase amplitude'}));
 expect(completions(onEvent)).toHaveLength(0);
 expect(onEvent.mock.calls.filter(([e])=>e.type==='coach')).toHaveLength(0);
 await user.click(screen.getByRole('button',{name:'Compare wave patterns'}));

 expect(screen.getByRole('button',{name:'The crests moved farther from the baseline'}).closest('[data-activity-reveal]')).not.toBeNull(); await user.click(screen.getByRole('button',{name:'The crests moved farther from the baseline'}));
 expect(screen.getByLabelText('Wave comparison')).toHaveTextContent(/2.*4/);
 expect(completions(onEvent)).toHaveLength(1);
 const retainedExplanation = screen.getByLabelText('Wave explanation feedback').textContent;
 await user.click(screen.getByRole('button',{name:'Compare wave patterns'}));
 expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state','complete');
 expect(screen.getByLabelText('Wave explanation feedback')).toHaveTextContent(retainedExplanation!);
 expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'Only the number of cycles grows'}));
 expect(screen.getByTestId('widget-wave-maker')).not.toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'The crests moved farther from the baseline'}));
 expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state','complete');
 expect(completions(onEvent)).toHaveLength(1);
});

test('light path stays proposed until commitment and can recover from the eye-first idea', async () => {
 const user=userEvent.setup(); const onEvent=vi.fn();
 render(<LightReflectionEye config={config<'light-reflection-eye'>('science-u03-l04-c2')} onEvent={onEvent}/>);
 expect(screen.queryByTestId('incident-ray')).not.toBeInTheDocument();
 for(const label of ['eye: Eye','object: Book','source: Lamp']) await user.click(screen.getByRole('button',{name:`Select ${label}`}));
 expect(screen.queryByTestId('incident-ray')).not.toBeInTheDocument();
 await user.click(screen.getByRole('button',{name:'Trace committed light path'}));
 expect(completions(onEvent)).toHaveLength(0);
 expect(screen.getByRole('status')).toHaveTextContent(/try again/i);
 await user.click(screen.getByRole('button',{name:'Start over'}));
 for(const label of ['source: Lamp','object: Book','eye: Eye']) await user.click(screen.getByRole('button',{name:`Select ${label}`}));
 await user.click(screen.getByRole('button',{name:'Trace committed light path'}));
 expect(screen.getByTestId('incident-ray')).toBeInTheDocument();
 expect(completions(onEvent)).toHaveLength(1);
});

test('message model retains a received signal before the learner explains the shared code', async () => {
 const user=userEvent.setup(); const onEvent=vi.fn();
 render(<MessageSender config={config<'message-sender'>('science-u04-l02-c1')} onEvent={onEvent}/>);
 await user.click(screen.getByRole('button',{name:'Add dot'})); await user.click(screen.getByRole('button',{name:'Add dash'}));
 await user.click(screen.getByRole('button',{name:'Send message'}));
 expect(screen.getByLabelText('Received signal')).toHaveTextContent('.-');
 expect(completions(onEvent)).toHaveLength(0);

 expect(screen.getByRole('button',{name:'Both ends use the same code'}).closest('[data-activity-reveal]')).not.toBeNull(); await user.click(screen.getByRole('button',{name:'Both ends use the same code'}));
 expect(completions(onEvent)).toHaveLength(1);
 const retainedExplanation = screen.getByLabelText('Code explanation feedback').textContent;
 await user.click(screen.getByRole('button',{name:'Send message'}));
 expect(screen.getByTestId('widget-message-sender')).toHaveAttribute('data-state','complete');
 expect(screen.getByLabelText('Code explanation feedback')).toHaveTextContent(retainedExplanation!);
 expect(screen.getByTestId('widget-message-sender')).toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'The receiver guessed my thought'}));
 expect(screen.getByTestId('widget-message-sender')).not.toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'Both ends use the same code'}));
 expect(screen.getByTestId('widget-message-sender')).toHaveAttribute('data-state','complete');
 expect(completions(onEvent)).toHaveLength(1);
});

test('erosion preserves an incorrect prediction while a correct conclusion completes the comparison', async () => {
 const user=userEvent.setup(); const onEvent=vi.fn();
 render(<ErosionSimulator config={config<'erosion-simulator'>('science-u07-l03-c2')} onEvent={onEvent}/>);
 await user.click(screen.getByRole('button',{name:'Predict covered movement'}));
 await user.click(screen.getByRole('button',{name:'Run erosion'}));
 await user.click(screen.getByRole('button',{name:'Toggle vegetation'}));
 await user.click(screen.getByRole('button',{name:'Run erosion'}));
 await user.click(screen.getByRole('button',{name:'Conclude bare tray moved more soil'}));
 expect(screen.getByLabelText('Original erosion prediction')).toHaveTextContent('covered');
 expect(screen.getByLabelText('Erosion comparison feedback')).toHaveTextContent(/differed/);
 expect(completions(onEvent)).toHaveLength(1);
 const retainedExplanation = screen.getByLabelText('Erosion comparison feedback').textContent;
 await user.click(screen.getByRole('button',{name:'Run erosion'}));
 expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-state','complete');
 expect(screen.getByLabelText('Erosion comparison feedback')).toHaveTextContent(retainedExplanation!);
});

test('rock selection checks immediately and keeps its conclusion beside the evidence', async () => {
 const user=userEvent.setup();
 render(<RockLayerExplorer config={config<'rock-layer-explorer'>('science-u07-l04-c2')} onEvent={vi.fn()}/>);
 await user.click(screen.getByRole('button',{name:'Select Lower plant layer layer'}));
 expect(screen.getByRole('status')).toHaveTextContent(/correct/i);
 expect(screen.queryByRole('button',{name:'Check layer'})).not.toBeInTheDocument();
 expect(screen.getByLabelText('Layer evidence feedback').closest('[data-activity-reveal]')).not.toBeNull();
 const conclusion=screen.getByLabelText('Layer conclusion feedback');
 await user.click(screen.getByRole('button',{name:/Choose: The lower layer has plant fossils/}));
 expect(conclusion).toHaveTextContent(/correct/i);
 expect(screen.getByLabelText('Layer evidence feedback')).toHaveTextContent(/supported/i);
});

test('resource cards withhold category verdicts until placement and retain each result', async () => {
 const user=userEvent.setup();
 render(<ResourceSorter config={config<'resource-sorter'>('science-u08-l02-c1')} onEvent={vi.fn()}/>);
 expect(screen.queryByText('Lesson category: renewable source')).not.toBeInTheDocument();
 await user.click(screen.getByRole('button',{name:'Select Wind'}));
 await user.click(screen.getByRole('button',{name:'Place selected item in Renewable resource'}));
 expect(screen.getByLabelText('Wind category feedback')).toHaveTextContent(/renewable/i);
 await user.click(screen.getByRole('button',{name:'Connect Wind to Can affect flying wildlife'}));
 expect(screen.getByLabelText('Wind category feedback')).toHaveTextContent(/renewable/i);
});

test('animal system requires a learner-chosen internal and external structure', async () => {
 const user=userEvent.setup(); const onEvent=vi.fn();
 render(<AnimalStructureMatcher config={config<'animal-structure-matcher'>('science-u06-l02-c2')} onEvent={onEvent}/>);
 for(const [part,fn] of [['beak','gathers food'],['wing','moves through air'],['lungs','takes in air']]) {
  await user.click(screen.getByRole('button',{name:`Select wren ${part}`})); await user.click(screen.getByRole('button',{name:`Match ${fn}`}));
 }
 expect(screen.getByRole('button',{name:'Connect cooperating system'})).toBeDisabled();

 expect(screen.getByRole('button',{name:'Use wing in the system'}).closest('[data-activity-reveal]')).not.toBeNull(); await user.click(screen.getByRole('button',{name:'Use wing in the system'}));
 await user.click(screen.getByRole('button',{name:'Use lungs in the system'}));
 await user.click(screen.getByRole('button',{name:'Connect cooperating system'}));
 expect(completions(onEvent)).toHaveLength(1);
 await user.click(screen.getByRole('button',{name:'Use lungs in the system'}));
 expect(screen.getByTestId('widget-animal-structure-matcher')).not.toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'Use lungs in the system'}));
 await user.click(screen.getByRole('button',{name:'Connect cooperating system'}));
 expect(screen.getByTestId('widget-animal-structure-matcher')).toHaveAttribute('data-state','complete');
 expect(completions(onEvent)).toHaveLength(1);
});

test('map selection changes the plotted point as well as its control', async () => {
 const user=userEvent.setup();
 render(<TopographicMapExplorer config={config<'topographic-map-explorer'>('science-u07-l02-c2')} onEvent={vi.fn()}/>);
 await user.click(screen.getByRole('button',{name:'Select Hill 1'}));
 expect(screen.getByTestId('topographic-point-h1')).toHaveAttribute('data-selected','yes');
 await user.click(screen.getByRole('button',{name:'Select Hill 2'}));
 expect(screen.getByTestId('map-selection-link')).toBeInTheDocument();
});

test('hazard impact reasoning allows a mismatched impact and rejects that link on check', async () => {
 const user=userEvent.setup(); const onEvent=vi.fn();
 render(<HazardSolutionDesigner config={config<'hazard-solution-designer'>('science-u08-l03-c3')} onEvent={onEvent}/>);
 await user.click(screen.getByRole('button',{name:'Toggle Storm shutters'}));
 await user.click(screen.getByRole('button',{name:'Connect limited preparation time to Storm shutters'}));
 await user.click(screen.getByRole('button',{name:'Check solution'}));
 expect(screen.getByRole('status')).toHaveTextContent(/does not match/i);
 expect(completions(onEvent)).toHaveLength(0);
});

test('collision holds the model on a work surface beside its task controls', () => {
 render(<CollisionRamp config={config<'collision-ramp'>('science-u01-l04-c2')} onEvent={vi.fn()}/>);
 const visual=screen.getByLabelText('Collision model work surface');
 expect(within(visual).getByTestId('collision-comparison-track')).toBeInTheDocument();
 expect(within(visual).queryByRole('button',{name:'Moves left'})).not.toBeInTheDocument();
});

test('collision comparison still asks for an inference after matching the changed speed', async () => {
 const user=userEvent.setup(); const onEvent=vi.fn();
 render(<CollisionRamp config={config<'collision-ramp'>('science-u01-l04-c2')} onEvent={onEvent}/>);
 await user.click(screen.getByRole('button',{name:'Moves left'}));
 await user.click(screen.getByRole('button',{name:'Run collision model'}));
 await screen.findByText(/Run 1 observed. Change only/);
 await user.click(screen.getByRole('button',{name:'Increase Cart A speed'}));
 await user.click(screen.getByRole('button',{name:'Moves left'}));
 await user.click(screen.getByRole('button',{name:'Run collision model'}));
 await screen.findByText(/Run 2 observed. Choose a comparison/);
 await user.click(screen.getByRole('button',{name:'Run 2 had more Cart A speed'}));
 expect(completions(onEvent)).toHaveLength(0);
 await user.click(screen.getByRole('button',{name:'Motion changes could support an energy-transfer idea'}));
 expect(completions(onEvent)).toHaveLength(1);
 expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'The model made energy itself visible'}));
 expect(screen.getByTestId('widget-collision-ramp')).not.toHaveAttribute('data-state','complete');
 await user.click(screen.getByRole('button',{name:'Motion changes could support an energy-transfer idea'}));
 expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-state','complete');
 expect(completions(onEvent)).toHaveLength(1);
 await user.click(screen.getByRole('button',{name:'Both runs used the same Cart A speed'}));
 expect(screen.getByTestId('widget-collision-ramp')).not.toHaveAttribute('data-state','complete');
 expect(screen.queryByRole('button',{name:'Motion changes could support an energy-transfer idea'})).not.toBeInTheDocument();
 expect(screen.getByRole('status')).toHaveTextContent(/does not match/i);
 await user.click(screen.getByRole('button',{name:'Run 2 had more Cart A speed'}));
 await user.click(screen.getByRole('button',{name:'Motion changes could support an energy-transfer idea'}));
 expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-state','complete');
 expect(completions(onEvent)).toHaveLength(1);
});

test('building the motor path connects the visible wire before the motor can run', async () => {
 const user=userEvent.setup();
 render(<EnergyTransferBuilder config={config<'energy-transfer-builder'>('science-u02-l03-c2')} onEvent={vi.fn()}/>);
 expect(screen.queryByTestId('energy-connection')).not.toBeInTheDocument();
 for(const token of ['battery','electric current','motor']) await user.click(screen.getByRole('button',{name:`Add ${token} to path`}));
 expect(screen.getByTestId('energy-connection')).toBeInTheDocument();
 expect(screen.getByRole('img',{name:/battery and motor before/i})).toBeInTheDocument();
});

test('the accessible light diagram also withholds the ordered answer before commitment', () => {
 render(<LightReflectionEye config={config<'light-reflection-eye'>('science-u03-l04-c2')} onEvent={vi.fn()}/>);
 expect(screen.queryByRole('img',{name:/from Lamp to Book to Eye/i})).not.toBeInTheDocument();
});

test('hazard links are neutral until the learner checks the plan', async () => {
 const user=userEvent.setup(); const onEvent=vi.fn();
 render(<HazardSolutionDesigner config={config<'hazard-solution-designer'>('science-u08-l03-c3')} onEvent={onEvent}/>);
 await user.click(screen.getByRole('button',{name:'Toggle Storm shutters'}));
 await user.click(screen.getByRole('button',{name:'Connect window damage to Storm shutters'}));
 await user.click(screen.getByRole('button',{name:'Toggle Early warnings'}));
 await user.click(screen.getByRole('button',{name:'Connect limited preparation time to Early warnings'}));
 expect(onEvent.mock.calls.filter(([event])=>event.type==='coach')).toHaveLength(0);
 await user.click(screen.getByRole('button',{name:'Check solution'}));
 expect(completions(onEvent)).toHaveLength(1);
});

test('map pattern reasoning uses the whole visible group without speaking its keyed pattern name', async () => {
 const user=userEvent.setup();const onEvent=vi.fn();
 render(<TopographicMapExplorer config={config<'topographic-map-explorer'>('science-u07-l02-c2')} onEvent={onEvent}/>);
 await user.click(screen.getByRole('button',{name:'Select Hill 1'}));
 await user.click(screen.getByRole('button',{name:'Select Hill 2'}));
 await user.click(screen.getByRole('button',{name:'Choose band pattern'}));
 expect(completions(onEvent)).toHaveLength(0);
 await user.click(screen.getByRole('button',{name:'Select Hill 3'}));
 await user.click(screen.getByRole('button',{name:'Choose band pattern'}));
 expect(completions(onEvent)).toHaveLength(1);
});

test('map point accessible names omit the authored pattern key',()=>{
 render(<TopographicMapExplorer config={config<'topographic-map-explorer'>('science-u07-l02-c2')} onEvent={vi.fn()}/>);
 expect(screen.getByTestId('topographic-point-h1')).not.toHaveAttribute('aria-label',expect.stringContaining('band'));
});

test('replaying a transfer retains the earlier explanation and does not repeat milestone coaching', async () => {
 const user=userEvent.setup();const onEvent=vi.fn();
 render(<EnergyTransferBuilder config={config<'energy-transfer-builder'>('science-u02-l03-c2')} onEvent={onEvent}/>);
 await user.click(screen.getByRole('button',{name:'Predict a change'}));
 for(const token of ['battery','electric current','motor']) await user.click(screen.getByRole('button',{name:`Add ${token} to path`}));
 await user.click(screen.getByRole('button',{name:'Run transfer model'}));
 await user.click(screen.getByRole('button',{name:'Observe moving effect'}));
 const explanation=screen.getByLabelText('Transfer explanation feedback').textContent;
 onEvent.mockClear();
 await user.click(screen.getByRole('button',{name:'Run transfer model'}));
 expect(screen.getByLabelText('Transfer explanation feedback')).toHaveTextContent(explanation!);
 expect(onEvent.mock.calls.filter(([event])=>event.type==='coach')).toHaveLength(0);
 expect(screen.getByTestId('widget-energy-transfer-builder')).toHaveAttribute('data-state','complete');
});

test('conversion replay preserves the explanation that already completed the device', async () => {
 const user=userEvent.setup();
 render(<EnergyConversionDesigner config={config<'energy-conversion-designer'>('science-u05-l01-c2')} onEvent={vi.fn()}/>);
 for(const label of ['Hand-crank generator','Buzzer']) await user.click(screen.getByRole('button',{name:`Add ${label}`}));
 await user.click(screen.getByRole('button',{name:'Run connected device'}));
 await user.click(screen.getByRole('button',{name:'The device changed motion into another effect'}));
 const feedback=screen.getByRole('status').textContent;
 await user.click(screen.getByRole('button',{name:'Run connected device'}));
 expect(screen.getByRole('status')).toHaveTextContent(feedback!);
 expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state','complete');
});

 test('hand-crank conversion shows a mechanical generator instead of a battery', () => {
 render(<EnergyConversionDesigner config={config<'energy-conversion-designer'>('science-u05-l01-c2')} onEvent={vi.fn()}/>);
 expect(screen.getByTestId('generator-crank')).toBeInTheDocument();
 expect(screen.getByTestId('generator-rotor')).toBeInTheDocument();
 expect(screen.queryByTestId('battery-terminals')).not.toBeInTheDocument();
 });
