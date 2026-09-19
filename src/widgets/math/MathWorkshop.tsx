import { useEffect, useRef, useState } from 'react';
import type { WidgetProps } from '../registry';
import EstimateCheckpoint from './workshop/EstimateCheckpoint';
import AcornRuleMachine from './workshop/AcornRuleMachine';
import PackUseRebuild from './workshop/PackUseRebuild';
import FractionPicnic from './workshop/FractionPicnic';
import BundleFourths from './workshop/BundleFourths';
import DecimalExchange from './workshop/DecimalExchange';
import FenceGarden from './workshop/FenceGarden';
import TriangleDesk from './workshop/TriangleDesk';
import GraphDetective from './workshop/GraphDetective';
import './workshop/workshop.css';
import { ResetContext } from './workshop/common';
const experiences = { 'estimate-checkpoint': EstimateCheckpoint, 'acorn-rule-machine': AcornRuleMachine, 'pack-use-rebuild': PackUseRebuild, 'fraction-picnic': FractionPicnic, 'bundle-the-fourths': BundleFourths, 'decimal-exchange-mat': DecimalExchange, 'fence-the-garden': FenceGarden, 'triangle-inspection-desk': TriangleDesk, 'graph-detective': GraphDetective };
export default function MathWorkshop(props: WidgetProps<'math-workshop'>) {
    const [attempt, setAttempt] = useState(0);
    const root = useRef<HTMLDivElement>(null);
    const Experience = experiences[props.config.activity];
    useEffect(() => { root.current?.querySelector<HTMLElement>('button:not(:disabled),select,input')?.focus(); }, [attempt, props.config.activity]);
    const reset = () => { props.onEvent({ type: 'interaction', action: 'reset' }); setAttempt(v => v + 1); };
    return <div ref={root} className="activity-shell" data-testid="widget-math-workshop" data-activity={props.config.activity}><ResetContext.Provider value={reset}><Experience key={`${props.config.activity}:${attempt}`} {...props}/></ResetContext.Provider></div>;
}
