# Guided activities — completed rollout

Date: September 8, 2026. Status: **APPROVED — implementation, subject reviews, integration review, and final evidence audit complete.**

The user approved the 32 designs, then accepted the three actual prototypes with “looks good.” The remaining **29 activities are implemented**, bringing the original Math, Reading and Science curriculum to **89/89 covered lessons**. The current catalog also includes the separate Social Studies rollout: **119/119 registered lessons have at least one eligible guided activity**.

| Subject | Covered lessons | Activities from this 32-lesson design |
|---|---:|---:|
| Math | 33/33 | 10 (9 added after the prototype) |
| Reading | 24/24 | 13 (12 added after the prototype) |
| Science | 32/32 | 9 (8 added after the prototype) |
| Social Studies, separate work | 30/30 | Outside this design |

Coverage counts a learn card with a rendered coached widget or interactive guided Science demo. Worked examples, ordinary questions, and passive illustrations alone do not count. The permanent coverage test now requires zero uncovered lessons. A separate exact-placement test pins all 29 new registrations. Independent integration audit confirmed 119 lessons, 357 cards, 1,547 unique questions, exactly 29 new workshop cards, and no removed source or quiz content.

The user subsequently authorized committing, merging, and pushing this work. Fresh checks on the isolated release are recorded in [release verification](2026-09-08-guided-activities-release.md); the evidence below describes the earlier shared-workspace completion checkpoint.

## Verification

- `npm test`: **2,040/2,040 passed in 240 files**. This normal repository command includes **1,319 current-workspace tests** (139 files) and **721 tests in the existing nested checkout** (101 files). No skipped/failing gate was used to claim completion.
- `npx tsc -b --pretty false`: passed.
- Normal and self-contained single-file builds: passed. Normal font links retained; the single HTML contains no external resource tags (9,206,357 bytes).
- `git diff --check`: passed. No staging or commits performed for this activity work. Existing concurrent work was preserved.
- All 29 activities completed through their real lesson URLs in both normal and single builds, including incorrect work, supported final reasoning, reset, and unchanged `cramall.v1`.
- All 29 completed at 390×844 using keyboard button activation with reduced motion; the final Math versions also completed at 320×740. Every entry passed initial source/task containment at 320×740, 1280×600, and 1280×900 with CSS zoom 2. Desktop review used 1440×900. No page or pane horizontal overflow found.
- Source panes remain keyboard-scrollable; ArrowDown moved the Reading source 40 pixels without moving the document. Complete Reading originals, annotations, comparison forms, notebooks, and citations were inspected.
- Browser console: zero errors or warnings in the verification session. Single-build runtime resource inspection also found no external resources.

Logs are retained in `/tmp/cram-full-activities-final-tests.log`, `...-final-types.log`, `...-final-build.log`, and `...-final-single.log`. Runtime census: `/tmp/cram-guided-activity-census.json`. Detailed implementation reports and exact browser procedures are recorded under `.superpowers/sdd/2026-09-07-complete-guided-activities/`.

## Independent review and corrections

Math, Reading, and Science received separate independent spec/code reviews and fresh re-reviews after corrections. All are approved. Root separately checked the corrected behavior in the browser.

- Math: correct partial rule tests receive truthful feedback; rejected unequal fence allocation keeps unused segments on the reel; all 34 allocated segments remain represented; fourths begin loose without a solved grouping; valid predictions clear obsolete errors; bird bars and ticks share one exact scale. Focused review gate: 31/31.
- Reading: blank final form comparison cannot complete; phase-wide guide messages remain truthful; revised clusters label retained synthesis as an earlier draft until rechecked. Full source originals stay unchanged. Focused review gate: 34/34.
- Science: initial and pinned wave plots have identical rendered dimensions; lamp wiring contains a real closed switch gap throughout supplied trials; prior pixel reconstruction and repair evidence remain labeled during edits; shared guide messages stay truthful across phases. Focused review gate: 31/31.
- Long chosen answers wrap below native selectors. Completion remains local practice feedback and does not write scoring or progress.

The independent integration review approved shared typing, lazy loading, exact registrations, source-only read-aloud, all real lesson starts, and content preservation.

## Open the new activities

These links use the local normal preview on port 4182. Each opens the authored guide introduction before the activity begins.

| Design | Activity | Lesson |
|---|---|---|
| M1 | Estimate Checkpoint | [math-u02-l02](http://127.0.0.1:4182/?activities=complete#/lesson/math-u02-l02?step=card:math-u02-l02-c3) |
| M2 | Acorn Rule Machine | [math-u03-l02](http://127.0.0.1:4182/?activities=complete#/lesson/math-u03-l02?step=card:math-u03-l02-c2) |
| M3 | Pack Use Rebuild | [math-u05-l02](http://127.0.0.1:4182/?activities=complete#/lesson/math-u05-l02?step=card:math-u05-l02-c2) |
| M4 | Fraction Picnic | [math-u06-l02](http://127.0.0.1:4182/?activities=complete#/lesson/math-u06-l02?step=card:math-u06-l02-c3) |
| M5 | Bundle The Fourths | [math-u06-l03](http://127.0.0.1:4182/?activities=complete#/lesson/math-u06-l03?step=card:math-u06-l03-c2) |
| M6 | Decimal Exchange Mat | [math-u08-l03](http://127.0.0.1:4182/?activities=complete#/lesson/math-u08-l03?step=card:math-u08-l03-c3) |
| M8 | Fence The Garden | [math-u10-l01](http://127.0.0.1:4182/?activities=complete#/lesson/math-u10-l01?step=card:math-u10-l01-c2) |
| M9 | Triangle Inspection Desk | [math-u11-l01](http://127.0.0.1:4182/?activities=complete#/lesson/math-u11-l01?step=card:math-u11-l01-c3) |
| M10 | Graph Detective | [math-u12-l02](http://127.0.0.1:4182/?activities=complete#/lesson/math-u12-l02?step=card:math-u12-l02-c3) |
| R2 | Direct The Reading | [reading-u01-l02](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u01-l02?step=card:reading-u01-l02-c2) |
| R3 | Word Desk | [reading-u02-l03](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u02-l03?step=card:reading-u02-l03-c3) |
| R4 | Connect Weather Report | [reading-u07-l02](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u07-l02?step=card:reading-u07-l02-c3) |
| R5 | Authors Lens | [reading-u08-l01](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u08-l01?step=card:reading-u08-l01-c3) |
| R6 | Support Chain | [reading-u08-l02](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u08-l02?step=card:reading-u08-l02-c3) |
| R7 | Two Views One Event | [reading-u09-l02](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u09-l02?step=card:reading-u09-l02-c3) |
| R8 | One Moment Three Forms | [reading-u10-l01](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u10-l01?step=card:reading-u10-l01-c3) |
| R9 | Literal And Vivid | [reading-u10-l03](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u10-l03?step=card:reading-u10-l03-c3) |
| R10 | Question Compass | [reading-u11-l01](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u11-l01?step=card:reading-u11-l01-c3) |
| R11 | Research Folder | [reading-u11-l03](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u11-l03?step=card:reading-u11-l03-c3) |
| R12 | Research Clusters | [reading-u11-l04](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u11-l04?step=card:reading-u11-l04-c3) |
| R13 | Source Credit | [reading-u11-l05](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u11-l05?step=card:reading-u11-l05-c3) |
| S1 | Receiver Changes | [science-u02-l04](http://127.0.0.1:4182/?activities=complete#/lesson/science-u02-l04?step=card:science-u02-l04-c3) |
| S2 | Crest To Crest | [science-u03-l02](http://127.0.0.1:4182/?activities=complete#/lesson/science-u03-l02?step=card:science-u03-l02-c2) |
| S3 | Pixel Post | [science-u04-l03](http://127.0.0.1:4182/?activities=complete#/lesson/science-u04-l03?step=card:science-u04-l03-c3) |
| S4 | Message Design Trials | [science-u04-l04](http://127.0.0.1:4182/?activities=complete#/lesson/science-u04-l04?step=card:science-u04-l04-c3) |
| S5 | Lamp Test Notebook | [science-u05-l03](http://127.0.0.1:4182/?activities=complete#/lesson/science-u05-l03?step=card:science-u05-l03-c1) |
| S7 | Plant System | [science-u06-l01](http://127.0.0.1:4182/?activities=complete#/lesson/science-u06-l01?step=card:science-u06-l01-c3) |
| S8 | Survival Evidence | [science-u06-l03](http://127.0.0.1:4182/?activities=complete#/lesson/science-u06-l03?step=card:science-u06-l03-c3) |
| S9 | Sense Response | [science-u06-l04](http://127.0.0.1:4182/?activities=complete#/lesson/science-u06-l04?step=card:science-u06-l04-c3) |

The three earlier prototypes remain in their original locations: [Scale Reading](http://127.0.0.1:4182/?activities=complete#/lesson/math-u09-l04?step=card:math-u09-l04-c3), [Phrase Pathfinder](http://127.0.0.1:4182/?activities=complete#/lesson/reading-u01-l01?step=card:reading-u01-l01-c2), and [Device Retest](http://127.0.0.1:4182/?activities=complete#/lesson/science-u05-l04?step=card:science-u05-l04-c3).
