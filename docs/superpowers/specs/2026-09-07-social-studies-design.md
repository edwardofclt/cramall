# Social Studies for Grade 4

Status: implemented and independently reviewed; the isolated release passes all gates. Acceptance evidence is recorded in `docs/reviews/2026-09-08-social-studies-release.md`.
Prepared September 7, 2026 against source commit `0f1ecd9` with concurrent guided-activity work preserved.
The user has selected **Pip the Carolina wren** as the new guide.

## Outcome and scope

Add Social Studies as the fourth subject, with five units and 30 complete lessons.
Each lesson has its own guided activity, three teaching cards, a worked example,
and a 13-question pool for the existing 10-question Quick Check. The finished
catalog will contain 119 lessons across 36 units. This is the implemented allocation,
not a claim that South Carolina mandates a particular lesson count.

Social Studies appears on Home, its subject map, My Progress, and Parent Corner.
Pip introduces lessons, prepares each activity, responds to meaningful learner
actions, and appears in quiz feedback. The normal and portable builds both
contain the complete subject, including guide art and activity visuals.

This is an additive subject project. The earlier Plan C identity contract remains
the baseline for the existing 89 lessons; this approved addendum will extend it.
The historical Plan A remediation and prior subject rollouts are not execution
instructions for this work. Existing character artwork and learner content remain
outside the change scope except for the shared registration required by Pip.

## Sources and standards

Use the official [2019 SC Social Studies Standards](https://www.ed.sc.gov/instruction/standards/social-studies/standards/2019-south-carolina-social-studies-college-and-career-ready-standards/),
printed pages 28–37, for the normative Grade 4 indicator text. The
[May 2024 Grade 4 Alignment Guide](https://www.ed.sc.gov/instruction/standards/social-studies/instructional-resources/grade-4-us-sc-studies-part-i-alignment-guide-2024-may-2024/)
provides the content and instructional context. The current
[SCDE standards listing](https://www.ed.sc.gov/instruction/standards/social-studies/standards/)
continues to identify the 2019 standards. These sources were checked September 7,
2026. The 2024 guide supports the 2019 standards; it is not a replacement edition.

There are five standards, each with six indicators: CO, CE, P, CX, CC, and E.
Their skills concern comparison, causation, periodization, context, continuity
and change, and evidence. Each indicator receives one primary lesson below.
Source analysis and South Carolina context also recur within other lessons.

During implementation, add the 30 exact indicator texts, source details, and
five-unit sequence to `docs/research/sc-grade4-standards.json`. Extend the
standards generator and runtime schema, then regenerate the derived JSON.
Retain the existing three subjects' metadata and record a separate social
studies verification note; do not rewrite earlier research reviews as though
they already verified the fourth subject.

History materials need a per-lesson provenance record in
`docs/research/sc-grade4-social-studies-sources.md`: lesson ID, supporting
primary/authoritative sources, date or period, excerpt or paraphrase status,
and any simplification. Authored summaries are labeled as summaries. Fictional
dialogue from Pip is coaching, never an invented historical witness account.

## Approach

The recommended approach is one integrated subject using the existing lesson,
quiz, progress, and coaching systems, with four small history activity families.
This gives every lesson an appropriate interaction while keeping the same
controls and feedback patterns across the subject.

A smaller starter unit would leave the requested curriculum incomplete. Thirty
unrelated custom activity components would create unnecessary maintenance and
inconsistent controls. The shared families below provide varied historical
reasoning without requiring either approach.

## Pip and the subject appearance

Pip is a warm brown Carolina wren with a cream eyebrow, upright tail, a small
blue satchel, and an unfolding map. Use a soft, rounded illustrated style that
fits Nutty, Winnie, and Sandy. Inspect their actual assets as visual references
before creating Pip. The illustration is an original mascot, not a depiction of
a historical person. The map prop has no illegible decorative writing.

Use a blue subject accent with a darker blue action color; verify text contrast
against the real backgrounds. Arrange four Home cards as a balanced grid that
becomes one column on narrow screens. Follow the existing guide dimensions,
pose API (`idle`, `talk`, `think`, `cheer`, `oops`), speech bubble layout, and
reduced-motion behavior. Pip remains visible during kid lines. Package artwork
locally and verify it in the single-file build.

Pip's voice is curious and concrete: “What clue helped you decide?” or “Let's
compare what changed.” Introduce the character as a guide who helps investigate
the past. Avoid claims that Pip personally witnessed historical events.

## Curriculum and activity allocation

IDs follow `social-studies-uNN-lNN`; card and question suffixes use the existing
canonical conventions. Unit prerequisites form the sequence 1 → 2 → 3 → 4 → 5,
with the existing soft-lock and preview behavior.

The table specifies original lesson titles and proposed learner actions.
The indicator allocations follow the official standards; the activity designs
are authored for this application.

### Unit 1 — People and Colonies (1600–1730)

| Lesson | Indicator | Guided activity |
|---|---|---|
| 01 — When Cultures Met | 4.1.CO | Connect evidence cards to a comparison of two encounters. |
| 02 — Trade and Forced Labor | 4.1.CE | Connect trade rules to their different effects on people. |
| 03 — Life in Three Colonial Regions | 4.1.P | Build a regional comparison on a labeled map. |
| 04 — People of Early South Carolina | 4.1.CX | Attach sourced community details to places and context. |
| 05 — How Colonial Work Changed | 4.1.CC | Build a before-and-after timeline of work and trade. |
| 06 — Clues to Colonial Life | 4.1.E | Build an evidence board comparing two source perspectives. |

### Unit 2 — Building a New Nation (1730–1800)

| Lesson | Indicator | Guided activity |
|---|---|---|
| 01 — Many People in the Revolution | 4.2.CO | Compare contributions using source cards. |
| 02 — Why Colonists Sought Independence | 4.2.CE | Link a rule, a colonial response, and a consequence. |
| 03 — Building Our Government | 4.2.P | Arrange founding events and explain a turning point. |
| 04 — South Carolina and Independence | 4.2.CX | Connect local events to their wider importance on a map. |
| 05 — Rights and Promises | 4.2.CC | Compare rights before and after selected founding documents. |
| 06 — Different Views of a New Nation | 4.2.E | Support a comparison with details from two sources. |

### Unit 3 — A Growing and Divided Country (1800–1850)

| Lesson | Indicator | Guided activity |
|---|---|---|
| 01 — Moving West, Different Experiences | 4.3.CO | Map a journey and compare reasons and responses. |
| 02 — Land, Laws, and Forced Removal | 4.3.CE | Connect government actions to effects on communities. |
| 03 — New Tools Changed the Land | 4.3.P | Build a timeline linking tools and environmental changes. |
| 04 — Why Regions Disagreed | 4.3.CX | Build a sourced comparison of regional interests. |
| 05 — When Borders Moved | 4.3.CC | Compare dated territorial evidence at labeled map locations. |
| 06 — Looking West Through Different Eyes | 4.3.E | Compare accounts and select evidence for a careful claim. |

### Unit 4 — Civil War and Freedom (1850–1870)

| Lesson | Indicator | Guided activity |
|---|---|---|
| 01 — Slavery and the Road to War | 4.4.CO | Compare economic and political causes with evidence. |
| 02 — How War Plans Affected People | 4.4.CE | Connect mapped strategies to effects on supplies and people. |
| 03 — People Worked for Freedom | 4.4.P | Build a sequence connecting civic action and emancipation. |
| 04 — South Carolinians During the War | 4.4.CX | Compare sourced experiences within the same period. |
| 05 — How the War Changed Life | 4.4.CC | Connect before-and-after evidence to a timeline. |
| 06 — Evidence from a Divided Nation | 4.4.E | Assemble evidence explaining wartime divisions. |

### Unit 5 — Rebuilding and Seeking Equal Rights (1860–1880)

| Lesson | Indicator | Guided activity |
|---|---|---|
| 01 — People Rebuilding Communities | 4.5.CO | Compare groups' actions using an evidence board. |
| 02 — Three Changes to the Constitution | 4.5.CE | Connect amendments to rights and their limits in practice. |
| 03 — A Turning Point After War | 4.5.P | Build a timeline and explain changes in work and government. |
| 04 — Rebuilding South Carolina | 4.5.CX | Link local places and events to Reconstruction conditions. |
| 05 — New Rights, Unfair Barriers | 4.5.CC | Compare rights, restrictions, and resistance over time. |
| 06 — What Reconstruction Changed | 4.5.E | Compare sources and build a supported conclusion. |

For Unit 3 Lesson 5, the map uses clearly labeled present-day geography as a
location reference. Dated source cards compare territorial control and community
experiences before and after border changes. The app does not depict its modern
outline as historical borders.

The age-level teaching must preserve the substance behind these short titles.
For example, teach slavery explicitly as a cause of Civil War, distinguish
emancipation from immediate equality, and distinguish constitutional rights from
their denial in practice. During lesson authoring, check each assigned
indicator's complete alignment-guide content, not only its short label.

## A fourth grader's lesson experience

Target a manageable sitting, approximately 10–15 minutes, with no timer.
One lesson addresses one principal historical question. Use three cards:
understand the idea, investigate it, and explain what the evidence supports.

Each card uses short paragraphs, one concrete example, and a brief tip or
question. Aim for 60–100 words of core teaching per card. Keep most sentences
under 18 words; longer source excerpts require an adjacent plain-language
explanation. These are editing targets, not proof of reading-level quality.
Define up to three new terms per card at first use. Prefer everyday wording
before the historical term: “a change to the Constitution—an amendment.”

Each lesson includes:

- A short Pip introduction and closing that connect to the lesson's question.
- Three cards, with all information needed for their checks visible before the
  check becomes available. At least one card contains a coached activity.
- A worked example explaining how a source or comparison supports an answer.
- Exactly 13 distinct quiz questions, sampled to 10 with `passThreshold: 8`.
  Use at least two natural existing question types. Every teaching card has a
  meaningful review link from at least one question.

Provide optional read-aloud for visible teaching and activity material. Never
include hidden answers in read-aloud text. Historical understanding, rather
than memorizing isolated dates or spellings, should determine quiz success.
Every source-dependent question includes its required excerpt or clearly
labeled summary; it does not rely on remembering another screen.

Teach difficult history with direct, non-graphic language. Describe people who
were enslaved as people with families, skills, decisions, and resistance. Do
not invite children to buy people, profit from slavery, reenact forced removal,
or win a war. Native communities continue into the present; avoid presenting
them as one interchangeable culture or as having disappeared. Label dated maps
and distinguish present-day borders from historical ones.

## Four guided activity families

All four use `WidgetCoachFrame`, `ActivityWorkbench`, and local coaching. Their
configuration schemas are strict and reject missing targets, duplicate IDs,
unresolvable sources, and contradictory answer relationships. Keep history
configuration types in a focused module imported into the central widget union.

**History timeline:** arrange event cards with keyboard/tap controls, examine the
resulting ordered sequence, and explain a change or turning point. Cards include
dates as evidence. Feedback checks a committed placement; it does not give the
answer away on selection. A correct order alone is insufficient for completion.

**History map:** select labeled places or periods, attach sourced details, and
compare regions or changed borders. Geographic placement and labels carry
meaning. Use authored, verified maps with accessible text lists; no external
map service is needed. The learner must make a comparison after inspecting the
map. A map is an educational representation, not an automatically discovered fact.

**History evidence board:** examine at least two short sources or clearly labeled
summaries, place relevant detail cards under claims or comparison headings, and
choose an explanation supported by the assembled evidence. Keep all applicable
source text available. Do not merely decorate a multiple-choice quiz with cards.

**History cause-and-effect:** build at least two relationships between an action,
policy, or condition and its consequences; compare who was affected; explain one
relationship using the supplied evidence. Display the learner-built connections.
Do not imply that earlier events automatically caused later events or that one
cause completely explains a complex event.

Each activity follows a short guide/kid conversation → planning or inspection →
meaningful action → visible result → explanation. Prediction is omitted when it
would amount to guessing an untaught historical fact. Give immediate feedback on
committed placements and answers, as in the current activity rollout. Correctness
is never signaled before commitment. Wrong feedback names a useful next move.

Earlier placement or evidence feedback remains available when explanation
feedback appears. Reset clears activity state and returns focus to its first
control. Revising a previously correct construction invalidates its dependent
explanation and completion; completion can occur again only after a valid new
construction and explanation. Activity state stays local and never writes scores,
progress, analytics, or storage.

## Representative lesson prototype: Building Our Government

Primary indicator: `4.2.P`. The main concept is that establishing the U.S.
government involved a sequence of decisions, documents, and approvals.

The lesson's three cards cover representatives meeting to make decisions, the
first national plan and its limitations, and the transition to the Constitution.
Define representative, constitution, and approve in context. Explain that a
democratic republic uses elected representatives, while voting rights at this
time excluded many people.

The prototype conversation below informed the final activity. The executable plan places each activity on card 2, immediately after its supporting teaching:

> Pip: “A new government took several steps. Let's use these event cards to see
> how one plan led to another.”
>
> Kid: “I'll put the events in order. Then I'll explain what changed.”

The final dialogue action starts the timeline in the same reserved footprint
and focuses its first event control. No timeline controls exist underneath the
intro dialogue. One forward action is visible per dialogue line.

Visible reference cards are newly written summaries, with source labels:

- **1781:** The Articles of Confederation took effect as the first national
  constitution.
- **1787:** Convention delegates signed a proposed Constitution.
- **1788:** The ninth state approved the Constitution, meeting the approval
  requirement for the new plan.
- **1789:** The new federal government began operating under the Constitution.

Source support: National Archives,
[Articles of Confederation](https://www.archives.gov/historical-docs/articles-of-confederation),
[Constitution history](https://www.archives.gov/founding-docs/more-perfect-union),
and [records of the founding governments](https://www.archives.gov/research/guide-fed-records/groups/360.html).
Dates support ordering; the explanation checks historical understanding.

The learner selects a card and places it in a timeline slot, or moves it with
labeled earlier/later buttons. A misplaced card gets: “Compare this year with
the card beside it. Which event happened earlier?” A correct placement gets a
brief statement about its position, without revealing the remaining sequence.

After ordering, ask: “Why did the new government begin after states approved
the Constitution?” The correct explanation is that the plan needed enough
states' approval before the new government could operate. Distractors confuse
signing a proposal with approval, or claim that arranging cards changed history.

If the explanation is wrong: “Find the card about state approval. How did that
step help the new plan move forward?” On completion: “You used the sequence to
explain how approval helped turn a plan into a working government.” Preserve the
timeline and placement feedback while showing this explanation feedback.

## Responsive behavior and accessibility

Reuse the stable workbench with the visual or source pane beside a scrolling
task pane on wide screens, stacked on mobile. Source-heavy work surfaces may
scroll within their labeled region. Text cards grow to fit wrapped text; do not
shrink them to fixed text heights. Preserve the current intro's 360px guide cap,
reserved footprint, and one-forward-action ownership.

All actions work with native buttons and keyboard controls; dragging may be an
optional enhancement but is never required. Use targets of at least 44×44px,
visible focus, text status and symbols in addition to color, descriptive map
labels, and concise announcements. Map information must remain available without
interpreting the picture. Reduced motion retains the same content and result.

## Integration boundaries

| Area | Required change |
|---|---|
| Standards | Extend research JSON, generator, parity checker, runtime schema, and their focused tests; regenerate derived JSON. |
| Identity | Add `social-studies` and `pip` to the subject/guide schemas and canonical ID patterns; extend the curriculum manifest and subject registry. |
| Guide | Add local Pip artwork and its art wrapper; extend `Character` registries and character tests. |
| Content | Add `src/content/social-studies/index.ts`, `u01.ts`–`u05.ts`, five unit tests, a coverage test, and the source provenance document. |
| Activities | Add four components under `src/widgets/social-studies/`, focused schemas/styles/tests, typed registry/events, exhaustive frame cases, and visible read-aloud support. |
| Screens | Verify four-subject Home/map/progress/parent behavior; make only the necessary layout and standards-link changes. |
| Persistence | Existing lesson-keyed saves continue to load unchanged; new lesson records share the existing `cramall.v1` format. |
| Validation | Extend exact catalog/count tests to 119 lessons, 36 units, 357 cards, and 1,547 questions. Keep the original 89 identities intact. |

The new subject must be selected from actual runtime registries wherever the
app already iterates subjects. Audit hard-coded three-subject lists in source,
fixtures, scripts, and tests. Update complete-catalog expectations deliberately;
never weaken them to “at least” counts. No account, backend, package dependency,
or online service is required.

## Implementation and acceptance

After this design is approved, write the executable implementation plan in
`docs/superpowers/plans/2026-09-07-social-studies.md`. Build the standards/identity
foundation, Pip, the representative activity and remaining families, the five
content units, then the complete integration. Make each unit's content and quiz
answers reviewable before integrating it. This document is the design authority
for the new subject; it does not authorize re-executing old curriculum waves.

Begin behavior work with focused failing tests. Permanent acceptance checks must
prove every one of the 30 new lessons has at least one registered, correctly
configured activity with authored guide introduction and completion feedback.
Also prove all 30 indicators are allocated and covered, every answer is supported,
and every review link resolves to the correct card.

Test incorrect actions and recovery, changing a completed answer, reset, retained
source and feedback, intro replacement, focus, reduced motion, and absence of
activity writes to progress. Exercise a previously exported three-subject save
alongside a new Social Studies attempt, refresh, export/import, and review links.
Assess source fidelity, reading load, and historical framing independently;
passing schemas do not establish educational accuracy.

Run focused and adjacent tests before `npm run standards:check`, `npm test`,
`npx tsc -b --pretty false`, `npm run build`, and `npm run build:single`.
Distinguish this checkout's test count from any existing nested review checkout.
Inspect the actual build artifacts and browser-test the normal build via Vite
preview. Verify the portable artifact contains the guide, maps, and source text
without external resource requests.

Browser acceptance covers all 30 activity placements in their real lesson routes;
complete wrong/recovery/reset paths for every activity family. Inspect desktop,
short-wide, 390px and 320px layouts, keyboard operation, text zoom, history and
refresh, and reduced motion. Independently review the completed feature and fix
findings before reporting the subject ready. Update README and the current
handoff with actual final counts and evidence.

Implementation and verification: see `docs/superpowers/plans/2026-09-07-social-studies.md` and `docs/reviews/2026-09-08-social-studies-release.md`.
