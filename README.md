# Cram All

Cram All is a browser-only, fourth-grade learning app for short guided lessons, worked examples, and 10-question quick checks. It currently includes two pilot math lessons, a progress view, and a Parent Corner for reviewing and moving a child's local progress. There is no account, server, or cloud sync: the app and its data stay in the browser.

## Quick start (under 5 minutes)

You need [Node.js 20 or newer](https://nodejs.org/) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, choose **Math**, and start **Numbers to the Millions**.

## Test and build

```sh
npm test                 # run all behavior and content-validation tests
npm run build             # create the normal multi-file build in dist/
npm run build:single      # create one self-contained dist-single/index.html
```

The normal build must be served over HTTP. After `npm run build`, run:

```sh
npx vite preview --host 127.0.0.1
```

Then open the URL Vite prints (normally `http://127.0.0.1:4173/`). Do not double-click `dist/index.html`; its JavaScript chunks are intended to be served together.

The single-file build is portable. After `npm run build:single`, double-click `dist-single/index.html`, drag it into a browser, or open its absolute `file://` URL. It contains the app's scripts, styles, and images, so there are no sibling asset files to copy. Browser progress is still tied to the page's origin; progress saved on a served site does not automatically appear in the `file://` copy.

## Progress and Parent Corner

Cram All saves lesson attempts, best scores, stars, streaks, settings, and parent spot-checks in browser `localStorage` under `cramall.v1`. Progress remains after reloads in the same browser and origin. Clearing site data, changing browser/profile, or moving between an HTTP origin and a `file://` page creates a separate local record.

**Parent Corner** provides three maintenance actions:

- **Export progress** downloads `cramall-progress.json` as a backup or transfer file.
- **Import progress file** validates and restores a compatible exported JSON file.
- **Reset progress** clears the current save after the parent types `RESET`.

Because there is no backend, Cram All has no login, cross-device sync, remote backup, classroom dashboard, or server-side recovery. Export a progress file before clearing browser data or moving to another device.

## Content layout

- `src/content/schema.ts` defines the lesson/question schema and permanent content validation rules.
- `src/content/subjects.ts` combines standards units with the registered lessons for Math, Reading, and Science.
- `src/content/math/u01.ts` contains the two current pilot lessons.
- `src/content/math/index.ts` registers lesson arrays by unit ID. Reading and Science have matching subject folders.
- `src/content/standards/standards.json` is the standards data consumed by the app. Its source snapshot is `docs/research/sc-grade4-standards.json`.
- `src/content/content-validation.test.ts` checks registration, standards coverage, pass thresholds, and review-card relationships.

### Add and validate a lesson

1. Find the destination subject and unit in `src/content/standards/standards.json`. Use its exact unit ID and only indicator codes listed for that unit.
2. Add a `Lesson` object to the unit module, such as `src/content/math/u01.ts`. Give the lesson, every learn card, and every question unique stable IDs.
3. Supply every required section from `LessonSchema`: `unitId`, title, indicator codes, intro dialogue, at least one learn card, a worked example, and a quiz.
4. Give the quiz at least 13 valid questions and keep `passThreshold: 8`. Every question needs an explanation, concept tag, and `reviewCardId` that points to a real learn card in that lesson. Choice answers must reference a real choice; sort answers must be a complete permutation of their item IDs.
5. If this is the first lesson module for a unit, export its lesson array and register it under the exact unit ID in `src/content/<subject>/index.ts`'s `lessonsByUnit` map.
6. Run the focused validation, then the complete suite:

   ```sh
   npm test -- src/content/content-validation.test.ts src/content/schema.test.ts
   npm test
   ```

7. Run both production builds and smoke-test the lesson in a browser.

## Widgets

A learn card may reference a widget with `{ type, config }`. The supported type names live in `WIDGET_TYPES` in `src/content/schema.ts`; their lazy-loaded React components are mapped in `src/widgets/registry.ts`. Existing math widget implementations are in `src/widgets/math/`.

To add a widget type, implement a component that accepts `WidgetProps`, add its type to `WIDGET_TYPES`, register the lazy import in `widgetRegistry`, add focused component tests, and then reference the same type from lesson content. The validation suite rejects unregistered widget names.

## Project references

- [Product and interaction design](docs/superpowers/specs/2026-08-29-cram-all-design.md)
- [Plan A implementation plan](docs/superpowers/plans/2026-08-29-plan-a-foundation.md)
- [South Carolina grade 4 standards research snapshot](docs/research/sc-grade4-standards.json)
