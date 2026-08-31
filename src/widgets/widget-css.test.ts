import { expect, test } from 'vitest';

const nodeProcess = (globalThis as typeof globalThis & {
  process: {
    getBuiltinModule(name: 'fs'): {
      readFileSync(path: string, encoding: 'utf8'): string;
    };
  };
}).process;
const themeCss = nodeProcess.getBuiltinModule('fs').readFileSync('src/theme.css', 'utf8');

test('widget CSS defines low-specificity base controls, narrow layout, and reduced-motion fallbacks', () => {
  expect(themeCss).toMatch(/:where\(\.widget-experiment button\)\s*\{[^}]*min-block-size:\s*44px[^}]*min-inline-size:\s*44px[^}]*font-family:\s*inherit/);
  expect(themeCss).toMatch(/:where\(\.widget-experiment input\)\s*\{[^}]*min-block-size:\s*44px[^}]*font-family:\s*inherit/);
  expect(themeCss).toMatch(/:where\(\.widget-experiment button:disabled\)\s*\{[^}]*cursor:\s*not-allowed/);
  expect(themeCss).toMatch(/@media\s*\(max-width:\s*600px\)[\s\S]*?\.widget-experiment \[data-widget-grid\]\s*\{[^}]*grid-template-columns:\s*1fr/);
  expect(themeCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation-iteration-count:\s*1\s*!important/);
});
