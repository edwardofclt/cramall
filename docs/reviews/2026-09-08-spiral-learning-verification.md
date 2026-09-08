# Spiral learning verification

Scope: cumulative practice and delayed review on branch `codex/spiral-learning`, based on `0f1ecd9`. Implementation and verification used the separate worktree `/private/tmp/cram-all-spiral-learning`. Concurrent original-checkout Social Studies and activity edits are excluded.

## Final automated gates

- `npm test`: **1,182 passed in 114 files** (baseline: 1,022 in 110 files).
- `npx tsc -b --pretty false`: passed with no diagnostics.
- `npm run build`: passed; existing Vite large-chunk advisory remains.
- `npm run build:single`: passed, one self-contained HTML artifact (6,587.13 kB before gzip).
- `npm run standards:check`: passed; Math 33 indicators/12 units, Reading 20 indicators plus 6 overarching expectations/11 units, Science 14 indicators/8 units.
- `git diff --check`: passed.

Artifact inspection confirmed a sole `dist-single/index.html`, no external scripts/stylesheets or Google Font links in the single build, and preserved Google Font links in the normal build.

Focused tests establish the failure before each behavior change. They cover calendar/DST boundaries, future/backward dates, overdue selection, relevant earlier foundations, multiple lessons, variant rotation, no unpassed/future warmup content, old-save round trips, invalid imports, strict review keys, same-day/early interval protection, newer quiz misses, reset/import stale callbacks, source ownership, feedback, one forward action, URL/history, and session completion. All 31 connection applications are schema-checked against the registered curriculum and exact teaching-card targets; all 11 Reading applications have complete original sources.

## Real browser evidence

The normal build was served on localhost port 4178 and the single build on port 4179. Dedicated disposable learner fixtures represented three passed lessons and an entirely completed 89-lesson curriculum, dated September 1.

- Math warmup displayed three earlier concepts, explained an intentional mistake, exposed its exact teaching-card link, and completed into the original lesson introduction.
- Math Connect it appeared after the worked example, preserved an unrelated query parameter, survived refresh, explained its answer and advanced to the Quick Check handoff. Browser Back/Forward restored the URL-driven stages.
- Reading warmup displayed the full earlier passage before its question and retained it during answer feedback. Keyboard Enter advanced to a different question. An authored summarization application displayed its complete new source and explained why the selected summary matched it.
- Reading practice and feedback had no horizontal overflow at 390 × 844. Short-window application layout had no horizontal overflow at 1280 × 500; measured buttons were at least 44px high. The temporary viewport override was reset.
- A completed Math subject still offered mixed review. Its three questions came from place value, comparison and addition lessons. After finishing and reloading, the due count changed from 99 to 96 while all 33 lessons and their earned stars remained passed.
- The single build completed a three-question Science warmup, delivered feedback, returned to the original introduction and retained that stage on reload.
- Both final rebuilt artifacts were reloaded successfully with persisted progress. Captured browser console errors: zero.

The fixture setup page lived only in ignored build output and was removed by the final builds; it is not shipped. Browser file-chooser automation timed out, so actual file-picker interaction is not claimed as verified. Import/export and invalid-file behavior are covered by automated tests. The single artifact was browser-tested over localhost; direct `file://` execution is not claimed here. Reduced-motion behavior is covered by the existing and adjacent automated checks.

## Independent review

**APPROVED, no unresolved findings.** A scoped memory reviewer and a separate whole-feature reviewer inspected scheduling, save compatibility, all 31 authored answers, numerical correctness, complete Reading evidence, truthful Science explanations, teaching-card alignment, navigation and accessibility.

The review found and verified fixes for a same-day quiz miss being hidden behind an older long interval, early practice losing its actual observation date across clock rollback, strict prototype-key validation, and early practice accidentally reviving a superseded interval. Regression tests and independent direct reproductions passed after the fixes. The final full suite and both builds above ran after these corrections.
