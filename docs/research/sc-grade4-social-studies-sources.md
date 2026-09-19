# Social Studies source and asset index

Prepared September 7, 2026 for the approved Social Studies addition.

## Standards

- [SCDE current standards listing](https://www.ed.sc.gov/instruction/standards/social-studies/standards/): lists the 2019 Social Studies College- and Career-Ready Standards.
- [Official 2019 standards PDF](https://www.ed.sc.gov/instruction/standards/social-studies/standards/2019-south-carolina-social-studies-college-and-career-ready-standards/): Grade 4 overview and skills on printed pages 28–31; 30 indicators on printed pages 32–37. Normative indicator text is copied to the existing research source JSON, with line-wrap whitespace normalized.
- [Grade 4 Alignment Guide, May 2024](https://www.ed.sc.gov/instruction/standards/social-studies/instructional-resources/grade-4-us-sc-studies-part-i-alignment-guide-2024-may-2024/): supports content scope and inquiry skills. Its historical examples are cross-checked against primary or authoritative sources, rather than used as the sole authority for dates and names.

`docs/research/sc-grade4-standards.json` is the source of truth. `scripts/build-standards.mjs` generates the runtime JSON. The Social Studies record adds a separate verification note; historical three-subject research reviews are retained unchanged.

## Lesson provenance

- [Units 1–3 sources](social-studies-u01-u03-sources.md)
- [Units 4–5 sources](social-studies-u04-u05-sources.md)

Each activity carries the full supplied source text, title, attribution and source URL. Newly authored historical summaries are identified as summaries. Pip's dialogue is fictional instructional coaching, never presented as a historical eyewitness account. Each Quick Check retains the lesson's teaching notes while questions are answered.

## Pip artwork

Final project asset: `src/characters/assets/pip.png` (1254 × 1254 PNG with alpha transparency).
Created with the built-in image generation tool, using `src/characters/assets/nutty.png` only as a style reference. No existing guide image was modified.

Generation prompt: Create an original friendly Carolina wren mascot with warm chestnut feathers, cream belly and eyebrow stripe, small curved beak, upright tail, tiny bird feet, a blue satchel and an unfolded unlabeled map. Match the reference's warmly lit, rounded children's-storybook illustration style. Center the full body with padding. No scene, text or watermark; transparent background.

Final edit prompt: Preserve the exact Pip character, feathers, pose, satchel and map; remove the generated checkerboard backdrop and output true transparent alpha outside the character. Do not draw a grid or a representation of transparency.

The selected result's alpha channel was verified before copying it into the app. The unused first image remains outside the project. The app uses the same pose/motion wrapper as the three existing guides.
