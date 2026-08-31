# Plan B2 Science final fix report

Date: 2026-08-31

Base: `dc6fb3d` (`fix: clarify resource placement feedback`)

Result: DONE

## Scope and findings

- S1 CollisionRamp: replaced native binary `number ± 1` control arithmetic with exact-decimal addition followed by exact comparison/clamping and conversion back to the event/state number. This preserves the shared 12-decimal domain for angle and both speed controls, including `1.000000000001 − 1 = 0.000000000001`.
- S6 EnergyConversionDesigner: treats a chain retained across a config change as empty whenever any retained ID is absent from the new component set. Completion checks, append behavior, accessible naming, and node rendering all use that safe chain before any component dereference; the existing keyed effect then clears stored chain/status state.
- S10 TopographicMapExplorer: added direct strict-rejection regression cases for a coordinate that parses as nonfinite, a duplicate point ID, and a blank point label. Existing production validation already rejected all three, so no S10 production expansion was made.
- No authored lessons, standards, characters, progress, quiz, storage, shared schema/registry/frame production boundaries, unrelated widgets, or concurrent untracked Plan C wave documents were modified.

## TDD evidence

Baseline before edits:

- `npm test -- CollisionRamp EnergyConversionDesigner TopographicMapExplorer WidgetFrame schema`
- PASS: 7 files, 55 tests.

Red regressions before production edits:

- `npm test -- CollisionRamp EnergyConversionDesigner TopographicMapExplorer`
- Expected FAIL: 2 files failed, 1 passed; 3 tests failed and 22 passed.
- CollisionRamp failed with `RangeError: Collision ramp values must use the shared exact-decimal policy of at most 12 decimal places` after a decrease from `1.000000000001`.
- EnergyConversionDesigner direct rerender failed with `TypeError: Cannot read properties of undefined (reading 'energyIn')` after the retained interior `panel` ID was replaced.
- The same EnergyConversionDesigner rerender through WidgetFrame entered `widget-napping`, proving boundary-level failure rather than recovery.
- The three new S10 cases passed against the existing strict schema, as expected for coverage-only closure.

Green after the minimal S1/S6 production fixes:

- `npm test -- CollisionRamp EnergyConversionDesigner TopographicMapExplorer`
- PASS: 3 files, 25 tests.

S10 mutation check:

- Temporarily weakened only the nonfinite-coordinate, unique-ID, and nonblank-text guards.
- `npm test -- TopographicMapExplorer -t 'rejects a coordinate|rejects duplicate point ids|rejects a blank point label'`
- Expected FAIL: all 3 selected tests failed because the mutated schema accepted each invalid fixture.
- Restored the schema immediately; `git diff -- src/content/schema.ts` was empty.

Focused and adjacent verification after restoration:

- `npm test -- CollisionRamp EnergyConversionDesigner TopographicMapExplorer WidgetFrame schema && npx tsc -b --pretty false`
- PASS: 7 files, 61 tests; TypeScript exit 0.
- `npm test -- src/widgets/science`
- PASS: 12 files, 81 tests.

## Full verification evidence

- `npm test`
  - PASS: 55 files, 519 tests.
  - Existing Framer reduced-motion and React Router v7 future-flag notices remained informational only.
- `npx tsc -b --pretty false`
  - PASS: exit 0.
- `npm run build`
  - PASS: 472 modules transformed; normal production output generated.
  - Existing Vite warning for the main chunk over 500 kB remained informational only.
- `npm run build:single`
  - PASS: 472 modules transformed; `dist-single/index.html` generated.
- Single-build inspection
  - PASS: exactly one file under `dist-single`.
  - PASS: no external HTTP(S) `script` or `link` resource in `dist-single/index.html`.
- Literal correlation loop from Plan B2 Task S13
  - PASS: each of all 12 Science widget literals occurs in exactly the schema, registry, and WidgetFrame production boundary files.
- Protected-scope check against `dc6fb3d`
  - PASS: no tracked diff in `.github`, `src/characters`, authored Reading/Science content, standards, progress, quiz, math widgets, or lesson files.
- `git diff --check`
  - PASS.

## Final file scope

- `src/widgets/science/CollisionRamp.tsx`
- `src/widgets/science/CollisionRamp.test.tsx`
- `src/widgets/science/EnergyConversionDesigner.tsx`
- `src/widgets/science/EnergyConversionDesigner.test.tsx`
- `src/widgets/science/TopographicMapExplorer.test.tsx`
- `.superpowers/sdd/2026-08-29-plan-b2-science-widgets/final-fix-report.md`

Concerns: none. The build-size and test-library notices above predate this wave and do not affect the verified behavior.
