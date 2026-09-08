import type { CauseConfig, EvidenceConfig, MapConfig, TimelineConfig } from '../../content/social-studies/history-schema';

export const historyBase = {
  title: 'Investigate a new government',
  prompt: 'Use the source summaries to build a comparison.',
  sources: [
    { id: 'articles', title: 'The first plan — summary', text: 'The Articles took effect in 1781. They left many powers with the states.', attribution: 'Authored summary based on the National Archives', url: 'https://www.archives.gov/historical-docs/articles-of-confederation' },
    { id: 'constitution', title: 'A new plan — summary', text: 'Delegates signed the Constitution in 1787. Enough states approved it in 1788. The new government began in 1789.', attribution: 'Authored summary based on the National Archives', url: 'https://www.archives.gov/founding-docs/more-perfect-union' },
  ],
  explain: {
    prompt: 'Why did the government begin after approval?',
    choices: [
      { id: 'approval', text: 'Enough states had to approve the new plan first.' },
      { id: 'cards', text: 'Moving our cards changed the past.' },
    ],
    correctChoiceId: 'approval',
    explanation: 'Approval allowed the plan to become a working government.',
  },
};

export const timelineConfig: TimelineConfig = {
  ...historyBase,
  events: [
    { id: 'began', title: 'New government begins', year: 1789, detail: 'The new government began operating.', sourceId: 'constitution' },
    { id: 'articles', title: 'Articles take effect', year: 1781, detail: 'The first national plan took effect.', sourceId: 'articles' },
    { id: 'approved', title: 'States approve', year: 1788, detail: 'Enough states approved the Constitution.', sourceId: 'constitution' },
  ],
  correctOrder: ['articles', 'approved', 'began'],
};

export const evidenceConfig: EvidenceConfig = {
  ...historyBase,
  headings: [{ id: 'first', label: 'First national plan' }, { id: 'new', label: 'New national plan' }],
  cards: [
    { id: 'articles-card', text: 'The Articles took effect in 1781.', sourceId: 'articles', targetId: 'first' },
    { id: 'constitution-card', text: 'States approved the Constitution in 1788.', sourceId: 'constitution', targetId: 'new' },
  ],
};

export const causeConfig: CauseConfig = {
  ...historyBase,
  causes: [{ id: 'agreement', text: 'States approve the first plan' }, { id: 'approval', text: 'Enough states approve the Constitution' }],
  effects: [
    { id: 'first', text: 'The Articles take effect.', sourceId: 'articles', causeId: 'agreement' },
    { id: 'new', text: 'A new government can begin.', sourceId: 'constitution', causeId: 'approval' },
  ],
};

export const mapConfig: MapConfig = {
  ...historyBase,
  title: 'Places in South Carolina',
  mapKind: 'south-carolina',
  period: '1780–1789',
  locations: [
    { id: 'upcountry', label: 'Upcountry', x: 25, y: 25, detail: 'Inland in the northwest of South Carolina.', sourceId: 'articles' },
    { id: 'charleston', label: 'Charleston', x: 70, y: 72, detail: 'A port on the southeastern coast.', sourceId: 'constitution' },
  ],
  cards: [
    { id: 'inland', text: 'The northwest is farther from the ocean.', sourceId: 'articles', locationId: 'upcountry' },
    { id: 'port', text: 'Ships reached this coastal port.', sourceId: 'constitution', locationId: 'charleston' },
  ],
};
