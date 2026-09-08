# Cram All

Cram All is a browser-only, fourth-grade learning app with 119 guided lessons, worked examples, tactile experiments, and 10-question Quick Checks. Its complete South Carolina Grade 4 catalog contains 33 Math lessons in 12 units, 24 Reading lessons in 11 units, 32 Science lessons in 8 units, and 30 Social Studies lessons in 5 units. Pip the Carolina wren guides Social Studies through colonial history, the American Revolution, westward expansion, the Civil War, and Reconstruction. Every Social Studies lesson includes a guided timeline, map, evidence board, or cause-and-effect activity. There is no account, server, or cloud sync: the app and its data stay in the browser.

## Quick start (under 5 minutes)

You need [Node.js 20 or newer](https://nodejs.org/) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, choose **Math**, and start **Numbers to the Millions**.

## Test and build

```sh
npm run standards:check  # verify research/generated standards parity
npm test                 # run all behavior and content-validation tests
npx tsc -b --pretty false
npm run build            # create the normal multi-file build in dist/
npm run build:single     # create one self-contained dist-single/index.html
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

- `src/content/curriculum.ts` is the authored 119-row identity, title, unit, and indicator-allocation contract; its Reading OE array is derived from validated generated metadata.
- `src/content/schema.ts` defines lesson/question/widget schemas and permanent content validation rules.
- `src/content/subjects.ts` combines generated standards units with the registered lessons for Math, Reading, Science, and Social Studies.
- `src/content/math/u01.ts` through `u12.ts`, `src/content/reading/u01.ts` through `u11.ts`, `src/content/science/u01.ts` through `u08.ts`, and `src/content/social-studies/u01.ts` through `u05.ts` contain learner-facing authored lessons.
- Each subject's `index.ts` registers one exported `unitNNLessons` array under its canonical unit ID.
- `src/content/standards/standards.json` is generated only by `node scripts/build-standards.mjs` from `docs/research/sc-grade4-standards.json`; never hand-edit it.
- `src/content/content-validation.test.ts` checks exact catalog identity, standards coverage, OE policy, pass thresholds, and review-card relationships.
- `src/content/lesson-quality.test.ts` deterministically samples, grades, and checks result deep links for every lesson.

### Add and validate a lesson

1. Find the destination unit in `src/content/standards/standards.json` and its authored row in `src/content/curriculum.ts`. Use the exact canonical ID, title, unit ID, and only the indicator codes allocated there.
2. Add one literal `Lesson` object to the matching `src/content/<subject>/uNN.ts` export. Give the lesson, its 3 learn cards, and its 13 questions unique canonical IDs.
3. Keep `passThreshold: 8`, use at least two natural question types, map each concept tag to one same-lesson review card, and make every card reachable from at least one missed question.
4. For Reading only, spread `READING_OE_CODES` into `crossCuttingExpectationCodes`; never put an OE code in `indicatorCodes`.
5. Use a widget only when its exact `{ type, config }` parses `WidgetRefSchema` and the type exists in `widgetRegistry`. The card prose and quiz must remain understandable without the widget.
6. Run the unit test, `src/content/schema.test.ts`, `src/content/content-validation.test.ts`, `src/content/lesson-quality.test.ts`, and `npx tsc -b --pretty false`. Independently review standards fidelity, every answer, original-text provenance, and child-safe wording.
7. Run `npm run standards:check`, the full test suite, both builds, and the browser/review-link smoke path before release.

## Widgets

A learn card may reference a widget with `{ type, config }`. The supported type names live in `WIDGET_TYPES` in `src/content/schema.ts`; their lazy-loaded React components are mapped in `src/widgets/registry.ts`. Existing math widget implementations are in `src/widgets/math/`.

To add a widget type, implement a component that accepts `WidgetProps`, add its type to `WIDGET_TYPES`, register the lazy import in `widgetRegistry`, add focused component tests, and then reference the same type from lesson content. The validation suite rejects unregistered widget names.

## Project references

- [Product and interaction design](docs/superpowers/specs/2026-08-29-cram-all-design.md)
- [Plan A implementation plan](docs/superpowers/plans/2026-08-29-plan-a-foundation.md)
- [South Carolina grade 4 standards research snapshot](docs/research/sc-grade4-standards.json)

- [Social Studies design and lesson map](docs/superpowers/specs/2026-09-07-social-studies-design.md)
- [Social Studies standards, historical sources, and Pip artwork provenance](docs/research/sc-grade4-social-studies-sources.md)
