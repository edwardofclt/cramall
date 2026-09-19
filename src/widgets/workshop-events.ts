/** Local practice events; none of these persist or award progress. */
export type WorkshopActivityEvent =
  | { type: 'interaction'; action: 'plan' | 'act' | 'check' | 'explain' | 'reset' | 'replay' }
  | { type: 'change'; value: { phase: string } }
  | { type: 'complete'; value: { activity: string } };
