# Math final-review fixes B

## Scope completed

- Updated FractionModels, AreaModelMultiplier, ArrayBuilder, MoneyCounter,
  ClockElapsedTime, QuarterInchRuler, and DataPlotBuilder so their visible
  `data-state`, `data-complete`, and learner status return to the live model
  state after the learner leaves a completed target. The typed `complete`
  event remains one-shot for the configured widget instance.
- Preserved elapsed-clock result mode.
- Made area-model cell selection reversible and added the visible sum of all
  partial products.
- Made exact fraction targets say `Fraction complete.`; a differently written
  but equivalent target still says `Equivalent fraction complete.`
- Kept all Data Plot categories in one explicit row with a chart width based
  on the category count, allowing the existing viewport to scroll rather than
  wrap the shared-baseline plot.

## Verification

- `npm test -- FractionModels AreaModelMultiplier ArrayBuilder MoneyCounter ClockElapsedTime QuarterInchRuler DataPlotBuilder` — 28 tests passed.
- `npm test` — 430 tests passed across 43 files.
- `npx tsc -b --pretty false` — passed.
- `npm run build` — passed (the existing Vite chunk-size advisory remains).
- `git diff --check` — passed.
