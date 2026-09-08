# Social Studies release verification

September 8, 2026. Release branch: `codex/social-studies`, based on `0f1ecd9`.
The user authorized committing, merging to `main`, and pushing this feature.

## Delivered scope

Pip the Carolina wren guides five units and 30 Grade 4 lessons aligned to all 30 South Carolina 2019 Social Studies indicators. Each lesson has three teaching cards, 13 authored quiz questions, visible source notes, and a guided timeline, map, evidence board, or cause-and-effect activity. The complete catalog contains 119 lessons, 36 units, 357 cards, and 1,547 questions.

Only this feature was copied into an isolated release worktree. Five shared schema/registry/fixture files were reconstructed to exclude concurrent prototypes and workshops. Original Math, Reading, and Science lesson files and standards records are unchanged. The shared authoring checkout remains untouched apart from the two owned test-option corrections.

## Automated and build evidence

- Clean isolated baseline: **1,022 tests / 110 files passed**.
- Isolated feature suite: **1,093 tests / 123 files passed**.
- Focused integration/content/widget checks: **87 tests / 14 files passed**.
- Reduced-motion lesson/guide checks: **4 tests passed**, including a rerun after removing unsupported Testing Library options.
- `npx tsc -b --pretty false`, `npm run standards:check`, `npm run build`, and `npm run build:single`: **passed**.
- Standards parity: Math 33/12, Reading 20 + 6 OE/11, Science 14/8, Social Studies 30/5.
- Artifact inspection: portable HTML embeds four PNG guide assets and has no external script or stylesheet references; Google Fonts appears only in the normal build.
- `git diff --check`: **passed**.

Vite reports its existing large-chunk advisory for the normal build. It does not prevent either build.

## Browser and independent review

The broader feature review exercised all four activity families through incorrect placement, recovery, incorrect explanation, completion, and reset. It checked desktop, short-wide, 390px and 320px layouts, sources during questions, an actual 9/10 Quick Check, review links, refresh/history, saved completion, and old/new Parent Corner checks.

The isolated release repeated all 30 real lesson activity routes in normal production preview. Every activity loaded with its source text and no document horizontal overflow. Additional release checks covered the complete evidence-board feedback/reset flow, all 30 portable subject links, embedded Pip artwork, the 320px map layout, keyboard source selection and placement, and worked-example field notes after refresh. No browser errors were reported in the release tab.

Browser media-preference and native text-zoom emulation were unavailable. Four rendered integration tests exercised reduced-motion behavior; browser reflow checks reached 320px. Native system preferences were not changed.

Independent review of all 30 lessons, 390 answer keys, standards, and provenance: **APPROVED**. Independent release extraction review: **APPROVED**, with no code findings, unresolved imports, or dependencies on concurrent work.
