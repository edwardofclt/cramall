import { useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';
import Wavelength from './workshop/Wavelength';
import PixelPost from './workshop/PixelPost';
import MessageTrials from './workshop/MessageTrials';
import LampNotebook from './workshop/LampNotebook';
import PlantSystem from './workshop/PlantSystem';
import SenseResponse from './workshop/SenseResponse';
import { ReceiverChanges, SurvivalEvidence } from './workshop/EvidenceBoards';
import './workshop/workshop.css';
const modes = { 'receiver-changes': ReceiverChanges, 'crest-to-crest': Wavelength, 'pixel-post': PixelPost, 'message-design-trials': MessageTrials, 'lamp-test-notebook': LampNotebook, 'plant-system': PlantSystem, 'survival-evidence': SurvivalEvidence, 'sense-response': SenseResponse };
export default function ScienceWorkshop({ config, onEvent }: WidgetProps<'science-workshop'>) { const [attempt, setAttempt] = useState(0); const { completeOnce } = useCompletionLatch(`${config.activity}-${attempt}`); const Mode = modes[config.activity]; return <div className="activity-shell" data-testid="widget-science-workshop" data-activity={config.activity}><Mode key={`${config.activity}-${attempt}`} activity={config.activity} onEvent={onEvent} complete={() => completeOnce(() => onEvent({ type: 'complete', value: { activity: config.activity } }))} reset={() => { setAttempt(a => a + 1); onEvent({ type: 'interaction', action: 'reset' }); }}/></div>; }
