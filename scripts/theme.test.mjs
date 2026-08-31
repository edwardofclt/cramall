import { readFileSync } from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';
import { SUBJECTS } from '../src/content/subjects.ts';

const themeCss = readFileSync(path.join(process.cwd(), 'src/theme.css'), 'utf8');

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(normalized)) throw new Error(`invalid color ${hex}`);
  return [0, 2, 4].map((offset) => Number.parseInt(normalized.slice(offset, offset + 2), 16));
}

function luminance(hex) {
  const channels = hexToRgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

function token(name) {
  const value = new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i').exec(themeCss)?.[1];
  if (!value) throw new Error(`missing hex theme token --${name}`);
  return value;
}

function block(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const value = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`).exec(themeCss)?.[1];
  if (!value) throw new Error(`missing CSS rule ${selector}`);
  return value;
}

function compositeHex(foreground, background, alpha) {
  const mixed = hexToRgb(foreground).map((channel, index) =>
    Math.round(channel * alpha + hexToRgb(background)[index] * (1 - alpha)),
  );
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

test('normal and semantic text token pairs meet WCAG AA 4.5:1', () => {
  const white = token('c-card');
  const page = token('c-bg');
  for (const foreground of ['c-ink', 'c-ink-soft']) {
    expect(contrast(token(foreground), white), `${foreground} on card`).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token(foreground), page), `${foreground} on page`).toBeGreaterThanOrEqual(4.5);
  }
  expect(contrast(token('c-good-ink'), token('c-good-soft'))).toBeGreaterThanOrEqual(4.5);
  expect(contrast(token('c-bad-ink'), token('c-bad-soft'))).toBeGreaterThanOrEqual(4.5);
});

test('white-on-action colors and every subject action color meet 4.5:1', () => {
  const white = token('c-on-accent');
  for (const action of ['c-accent-action', 'c-good-action', 'c-bad-action']) {
    expect(contrast(white, token(action)), action).toBeGreaterThanOrEqual(4.5);
  }
  for (const subject of SUBJECTS) {
    expect(subject.actionColor, `${subject.id} action color`).toBeDefined();
    expect(contrast(white, subject.actionColor), subject.id).toBeGreaterThanOrEqual(4.5);
    expect(subject.actionColor).not.toBe(subject.color);
  }
});

test('unit-number rendered text meets 4.5:1 for every subject', () => {
  const rule = block('.unit-number');
  const opacity = Number(/opacity:\s*([\d.]+)/.exec(rule)?.[1] ?? '1');
  const foreground = token('c-on-accent');
  for (const subject of SUBJECTS) {
    const renderedForeground = compositeHex(foreground, subject.actionColor, opacity);
    expect(
      contrast(renderedForeground, subject.actionColor),
      `${subject.id} unit-number`,
    ).toBeGreaterThanOrEqual(4.5);
  }
});

test('functional boundaries meet 3:1 against their adjacent surfaces', () => {
  const white = token('c-card');
  const page = token('c-bg');
  for (const boundary of ['c-control-border', 'c-line', 'c-example-border']) {
    expect(contrast(token(boundary), white), `${boundary} on card`).toBeGreaterThanOrEqual(3);
    expect(contrast(token(boundary), page), `${boundary} on page`).toBeGreaterThanOrEqual(3);
  }
});

test('interactive bindings use action tokens while bright colors remain decorative', () => {
  expect(block('.btn-primary')).toMatch(/--c-accent-action/);
  expect(block('.unit-chip')).toMatch(/--accent-action/);
  expect(block(".lesson-node[data-state='passed'] .lesson-node-circle")).toMatch(/--accent-action/);
  expect(block('.progress-fill')).toMatch(/--accent-action/);
  expect(block('.subject-card')).toMatch(/--accent(?!-action)/);
  expect(block('.subject-card-title')).toMatch(/--accent-action/);
});

test('quiet links have 44px targets and all keyboard focus is visibly outlined', () => {
  expect(block('.link-quiet')).toMatch(/min-height:\s*44px/);
  expect(block('.link-quiet')).toMatch(/min-width:\s*44px/);
  expect(block(':focus-visible')).toMatch(/outline:\s*3px solid/);
  expect(block(':focus-visible')).toMatch(/--accent-action/);
});

test('short Reading worked pages keep coaching in a stretchable inline overflow region', () => {
  const coaching = block(".lesson-page[data-stage='worked'][data-worked-passage='true'] .worked-coaching");
  expect(coaching).toMatch(/align-self:\s*stretch/);
  expect(coaching).toMatch(/min-height:\s*0/);
  expect(coaching).toMatch(/overflow-y:\s*auto/);
  expect(coaching).toMatch(/overscroll-behavior:\s*contain/);
});

test('wide Reading worked pages keep columns width-gated while containment has a usable-height floor', () => {
  expect(themeCss).toMatch(/@media\s*\(min-width:\s*48rem\)\s*\{/);
  expect(block(".lesson-page[data-stage='worked'][data-worked-passage='true'] .worked-reading-columns"))
    .toMatch(/grid-template-columns/);
  expect(themeCss).toMatch(/@media\s*\(min-width:\s*48rem\)\s*and\s*\(min-height:\s*40rem\)\s*\{/);
  expect(themeCss).toMatch(/40rem\/640px.*passage viewport/i);
});
