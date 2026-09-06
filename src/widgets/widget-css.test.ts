import { expect, test } from 'vitest';

const nodeProcess = (globalThis as typeof globalThis & {
  process: {
    getBuiltinModule(name: 'fs'): {
      readFileSync(path: string, encoding: 'utf8'): string;
    };
  };
}).process;
const themeCss = nodeProcess.getBuiltinModule('fs').readFileSync('src/theme.css', 'utf8');
const coachingCss = themeCss.slice(themeCss.indexOf('/* --- in-step widget coaching'), themeCss.indexOf('* {'));

test('widget CSS defines low-specificity base controls, narrow layout, and reduced-motion fallbacks', () => {
  expect(themeCss).toMatch(/:where\(\.widget-experiment button\)\s*\{[^}]*min-block-size:\s*44px[^}]*min-inline-size:\s*44px[^}]*font-family:\s*inherit/);
  expect(themeCss).toMatch(/:where\(\.widget-experiment input\)\s*\{[^}]*min-block-size:\s*44px[^}]*font-family:\s*inherit/);
  expect(themeCss).toMatch(/:where\(\.widget-experiment button:disabled\)\s*\{[^}]*cursor:\s*not-allowed/);
  expect(themeCss).toMatch(/@media\s*\(max-width:\s*600px\)[\s\S]*?\.widget-experiment \[data-widget-grid\]\s*\{[^}]*grid-template-columns:\s*1fr/);
  expect(themeCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation-iteration-count:\s*1\s*!important/);
});

test('coaching reserves a non-overlay reaction column and keeps it a block strip on narrow screens', () => {
  expect(coachingCss).toMatch(/\.widget-coach-frame\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\([^)]*\);/);
  expect(coachingCss).toMatch(/\.widget-coach-intro\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/);
  expect(coachingCss).toMatch(/\.widget-coach-reaction\s*\{[^}]*grid-column:\s*2[^}]*grid-row:\s*2[^}]*position:\s*static/);
  expect(coachingCss).toMatch(/\.widget-coach-activity\s*\{[^}]*grid-column:\s*1[^}]*grid-row:\s*2/);
  expect(coachingCss).toMatch(/@media\s*\(max-width:\s*640px\)[\s\S]*?\.widget-coach-frame\s*\{[^}]*grid-template-columns:\s*1fr/);
  expect(coachingCss).toMatch(/@media\s*\(max-width:\s*640px\)[\s\S]*?\.widget-coach-reaction\s*\{[^}]*grid-column:\s*1[^}]*grid-row:\s*auto/);
  expect(coachingCss).not.toMatch(/\.widget-coach-(?:reaction|activity|intro)[^{]*\{[^}]*position:\s*absolute/);
});

test('coaching controls and copy remain usable at narrow and high-zoom widths', () => {
  expect(coachingCss).toMatch(/\.widget-coach-controls\s+\.btn\s*,\s*\.widget-coach-dismiss\s*\{[^}]*min-block-size:\s*44px[^}]*min-inline-size:\s*44px/);
  expect(coachingCss).toMatch(/\.widget-coach-controls\s*\{[^}]*flex-wrap:\s*wrap/);
  expect(coachingCss).toMatch(/\.widget-coach-frame[\s\S]*?overflow-wrap:\s*anywhere/);
  expect(coachingCss).not.toMatch(/\.widget-coach-frame[\s\S]*?overflow-x:\s*(?:auto|scroll)/);
});

test('coaching motion has an explicit reduced-motion fallback', () => {
  expect(coachingCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.widget-coach-frame\s+\*\s*,[\s\S]*?animation-duration:\s*0\.001ms\s*!important/);
  expect(coachingCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.widget-coach-activity\s*,\s*\.widget-coach-reaction\s*\{[^}]*transition:\s*none\s*!important/);
});
