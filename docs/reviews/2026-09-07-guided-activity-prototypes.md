# Guided activity prototypes — ready for review

All 32 missing activities have designs. Three working prototypes are ready in their actual lessons. The remaining 29 designs follow this rendered-review checkpoint.

| Prototype | Open the lesson | What to try |
|---|---|---|
| M7 — Weigh the Field Kit | [Math: weight measurement](http://127.0.0.1:4182/#/lesson/math-u09-l04?step=card:math-u09-l04-c3) | Predict units, place four objects, align each scale reading, record rounded measurements, and explain the halfway rule. |
| R1 — Phrase Pathfinder | [Reading: accurate reading and pace](http://127.0.0.1:4182/#/lesson/reading-u01-l01?step=card:reading-u01-l01-c2) | Repair a changed word using the original passage, choose pauses, step through phrase groups, connect meaning to evidence, and reflect on an independent reread. |
| S6 — One-Change Retest | [Science: refine using test evidence](http://127.0.0.1:4182/#/lesson/science-u05-l04?step=card:science-u05-l04-c3) | Compare a controlled clip change, cite both supplied trial sets and unchanged conditions, then make a supported claim with a limit. |

These links use the local preview running on port 4182. The portable single-file build was also checked through port 4183.

## Verified behavior

- Each activity starts after its guide conversation with one forward action, an authored start label, and focus inside the activity.
- Wrong answers support revision. Reading clears affected success feedback after answer, evidence, or pause edits. Science clears conclusions when the plan or evidence changes.
- Mathematical records retain their units. Original Reading text remains accessible. Science distinguishes supplied practice records from an app experiment and leaves untested alternative outcomes unavailable.
- All three complete without changing saved progress. They remain unscored practice and do not replace the Quick Check.
- Desktop, short windows, 320px and 390px layouts, enlarged text, keyboard controls, and reduced-motion operation were checked. Science bars meet their goal line accurately, and the goal label clears every trial value.

## Verification evidence

Final focused checks: **107/107**. Final full shared-workspace suite: **1,852/1,852 tests in 229 files**. These totals include the repository's existing automatic discovery of tests in its nested review checkout. TypeScript, normal build, single-file build, and diff whitespace checks pass. Both real browser builds complete all three activities; no console errors were recorded.

Independent code and instructional-design review: **APPROVED**, including the final chart-label adjustment. The single-file HTML has no external resource tags; the normal build retains its intended Google Font links. The existing build-size warning remains.

The earlier full-gate failures came from obsolete no-widget placement assertions (updated here) and the separate, then-incomplete Social Studies work (resolved by that task). The final full gate is green.

## Coverage and next checkpoint

The original three subjects now have guided activities in **60/89 lessons**: Math 24/33, Reading 12/24, and Science 24/32. The exact remaining **29** gaps are listed in `src/content/guided-activity-coverage.test.ts`. Social Studies belongs to a separate rollout.

User review of these working prototypes is the next checkpoint before expanding their interaction patterns to the remaining designs. All changes remain uncommitted.

Design package: [all 32 activities](../superpowers/specs/2026-09-07-missing-guided-activities-design.md). Execution plan: [three prototypes](../superpowers/plans/2026-09-07-guided-activity-prototypes.md).
