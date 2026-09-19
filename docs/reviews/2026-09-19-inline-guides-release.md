# Inline lesson guides release verification

The user explicitly requested “Merge & release” on September 19. This release combines the reviewed guide integration at `c85d355` with GitHub main at `27d4b57`, including the newly released spiral-learning feature from PR #3. The original shared checkout and unrelated branches remain untouched.

## Integration

The lesson-player conflict retains the spiral wrapper's `review` prop, recall/connect stages, and existing guide integration. The guide is available during teaching stages in all 119 lessons. Recall, Connect it, mixed-review questions, and Quick Checks remain outside its canonical context. Entering a review stage unmounts the guide and closes its voice session.

A new regression first reproduced an expanded parent layout after returning from connection practice to the collapsed guide. The fix resets that layout while the guide is absent. The new Social Studies review assertion is scoped to the lesson stage because the launcher also contains Pip; its original reflection and source assertions remain intact. Released curriculum, widgets, review scheduling, progress storage, and scoring behavior are preserved.

## Fresh checks

- Focused guide/review/lesson/progress/context gate: **584 tests passed in 29 files**.
- Full suite: **1,712 tests passed in 153 files**.
- TypeScript, four-subject standards parity, normal build, single-file build, and whitespace checks: passed.
- Normal build retains Google Font links. The single build has no external script or font links. Browser bundles contain neither server-key configuration nor the test credential. The existing large-chunk advisory remains.
- Normal-build browser flow: Social Studies worked field notes → Connect it source/question → feedback → reflection. Source remains visible, the guide is absent during the question, and the disabled collapsed launcher returns afterward with the normal lesson layout. Unrelated query parameters remain intact.
- Self-contained build served over HTTP: Reading worked passage → Connect it source/question → Back to worked passage. At 390px, the settled page has no horizontal overflow and the guide remains disabled without a gateway. Direct `file://` execution is not claimed.
- Independent merge review: **APPROVED**, no actionable findings. It checked retained spiral routes, review composition, guide lifecycle, layout reset, and assessment-data exclusion.

## Deployment and rollback

The established release target is [GitHub Pages](https://edwardofclt.github.io/cramall/), deployed by `.github/workflows/deploy-pages.yml` after a push/merge to `main`. Deployment success and the published app are checked after merging the release PR.

Pages serves static files and has no voice backend, so live AI help remains disabled there. This release does not expose the local gateway, add cloud credentials, or claim fresh live-model validation. Local adult-enabled voice configuration and the previously documented microphone-permission and Math teaching-quality limitations remain in the README/prototype record.

If the deployment breaks lesson navigation or retained review behavior, revert this release PR's merge commit with `git revert -m 1 <merge-sha>`, rerun the checks, and push `main` to redeploy the previous behavior. Disabling local voice separately requires only `TUTOR_ADULT_REVIEW=false` and a server restart.
