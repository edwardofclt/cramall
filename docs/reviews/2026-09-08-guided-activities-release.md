# Guided activities release verification

September 8, 2026. The user requested: “commit & merge when you're done. don't forget to run `git push`.” This supersedes the earlier implementation-only restriction on staging and commits.

## Release scope

The isolated `codex/guided-activities-release` checkout starts from local `main` at `af255d548f59e302346db02fa05fa52f93327e5f`, the separately reviewed Social Studies feature. The activity commit adds all 32 approved guided activities, their exact lesson registrations, authored coaching, focused tests, and design/review records. It also updates the agent handoff. It preserves existing lessons, questions, standards, character assets, progress rules, and the Social Studies feature. No dependencies are added.

The original shared checkout and its uncommitted work remain intact. Only explicitly enumerated activity paths and these release records are staged. Local dependency links, generated builds, temporary browser output, ignored execution ledgers, and unrelated feature work are excluded.

All 342 source files in the combined release were compared byte for byte with the independently approved shared-workspace implementation: no differences. The earlier [implementation review](2026-09-08-complete-guided-activities.md) and [prototype review](2026-09-07-guided-activity-prototypes.md) therefore cover the same application source.

## Fresh release checks

- Focused activity and integration gate: **189 tests passed in 16 files**.
- Full isolated `npm test`: **1,319 tests passed in 139 files**. This checkout excludes the older nested review checkout whose 721 tests were included in the previous shared-workspace total of 2,040.
- TypeScript, standards parity, normal build, and self-contained build: passed.
- Normal HTML retains the intended Google Font links. The self-contained HTML is 9,206,357 bytes and has no external resource tags. Both builds retain the existing non-blocking bundle-size warning.
- All 29 workshop activities completed and reset through their actual lesson URLs in the isolated normal build on port 5412 and self-contained build on port 5413. Walkthroughs included rejected submissions and final reasoning. `cramall.v1` remained unchanged; all pages stayed within the 1440-pixel viewport. The portable runtime resource check found no external requests.
- The three prototype completion flows, mobile/short-window layouts, keyboard controls, reduced motion, and source-pane scrolling are covered by the earlier browser evidence on the identical application source and by the fresh focused/full tests above.
- Browser console inspection found only the existing missing `/favicon.ico` request on each preview origin; no application errors or warnings were recorded.

The catalog contains **119 lessons with guided activity coverage**, including 89 original Math/Reading/Science lessons and 30 Social Studies lessons. Permanent tests enforce zero uncovered lessons and the exact 29 new workshop placements.

Fresh logs are `/tmp/cram-guided-release-focused.log`, `/tmp/cram-guided-release-tests.log`, `/tmp/cram-guided-release-types.log`, `/tmp/cram-guided-release-build.log`, `/tmp/cram-guided-release-single.log`, and `/tmp/cram-guided-release-standards.log`. Git commit, merge, and push outcomes are reported after those operations complete.
