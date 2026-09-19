# Science: 9 guided activities

[Review overview and shared contract](2026-09-07-missing-guided-activities-design.md). Status: implemented and independently reviewed; see the [September 8 verification record](../../reviews/2026-09-08-complete-guided-activities.md). Sandy guides every activity. Model outputs and supplied observation records have separate labels. All records newly specified here are invented instructional cases, not reports of experiments conducted by the app or learner.

| Ref | Lesson | Activity |
|---|---|---|
| S1 | Compare Energy Transfer Observations | Compare the Receiver Changes |
| S2 | Describe Wavelength Patterns | Crest-to-Crest Workshop |
| S3 | Send Binary-Grid Picture Messages | Pixel Post |
| S4 | Compare Message Solutions | Message Design Trials |
| S5 | Test an Energy-Conversion Device | Lamp Test Notebook |
| S6 | Refine a Device Using Test Evidence | One-Change Retest |
| S7 | Explain Plant Structures as a System | Build a Plant System |
| S8 | Argue How Structures Support Survival | Survival Evidence Board |
| S9 | Model Sense, Brain, and Response | Sense-to-Response Trail |

## S1 — Compare the Receiver Changes

**Placement:** `science-u02-l04-c3` in `science-u02-l04`, *Compare Energy Transfer Observations*. Standard: `4-PS3-2`.

**Concept → action → result → reasoning:** Different transfer routes can be supported by different receiver effects; reconstruct and compare supplied cases; retain a common source/route/receiver/effect table; infer transfer without treating energy as directly visible.

**Complete supplied case packet:** Sound case: a struck tuning fork produces sound; nearby paper bits in the described setup change from still to trembling. Light case: a flashlight is switched on; a card changes from dim to brighter. Heating case: a spoon rests in warm water; the supplied temperature record describes the spoon as warmer afterward. Electric-current case: a connected battery powers a motor; its shaft changes from still to turning. An extra note says the notebook cover was blue. These are qualitative practice descriptions, with no numerical energy measurements.

**Loop:** Choose which observations might help compare transfer → inspect before/after case cards → place source, route, receiver, and effect strips into four rows → connect two different rows through “change at a receiver” → build a comparison and attach a limit. Source descriptions stay readable while sorting. A replay button advances an illustration through its supplied before/after states; its caption says it illustrates the packet, not a new experiment.

**Dialogue:** Sandy: “These cases have different effects. Let's compare what changed at the receiving object.” Kid: “I’ll organize the supplied observations and use more than one case to explain a pattern.” Start: **Compare the cases**.

**Coaching:** Irrelevant selection: “Does that detail describe a change in the receiving object?” Route/effect confusion: “Turning is what the motor does. Which route connects the battery and motor?” Valid rows: “Look for a shared pattern without claiming every effect is the same.” Completion: “You used different receiver effects to support an energy-transfer idea and kept its limits.”

**Finish/key:** Four correct rows; compare at least two distinct routes; explain that receiver changes can support transfer; reject “we saw energy itself” and “these records show exact energy amounts.” “Warmer” is an observation described by the supplied record, not a temperature sensed by the app.

**Build/verify:** New comparison-board mode sharing evidence controls with S8. Test retained source labels, route versus effect, and no model-as-evidence language.

## S2 — Crest-to-Crest Workshop

**Placement:** `science-u03-l02-c2` in `science-u03-l02`, *Describe Wavelength Patterns*. Standard: `4-PS4-1`.

**Concept → action → result → reasoning:** Wavelength compares neighboring matching points; mark and change crest spacing in a diagram; retain before/after spans; explain shorter/longer spacing independently of height.

**Practice setup:** Two same-width rope-pattern strips, equal amplitude and scale, with A showing more complete cycles across the strip than B. No meter scale, exact wavelength number, frequency label, or sound pitch claim. Initially both patterns are static and unlabeled as shorter/longer.

**Loop:** Predict which neighboring crests are farther apart → place start/end markers on neighboring crests or neighboring troughs in each strip → check the spans → change B using “Bring matching points closer” / “Move matching points farther apart” controls → pin a second diagram → compare with the first while height stays fixed. Selecting a crest and adjacent trough visibly makes a half-cycle span and prompts correction after Check.

**Dialogue:** Sandy: “A wave's height and the spacing between its crests describe different things. Let's compare the spacing.” Kid: “I’ll mark matching neighboring points, change their spacing, and explain the pattern.” Start: **Mark the wave patterns**.

**Coaching:** Crest-to-trough attempt: “Your markers are on different kinds of points. Find the next matching point.” Skipped crest: “Check whether another matching crest lies between your markers.” Valid comparison: “Keep the starting span beside the changed span.” Completion: “You compared matching-point spacing while keeping the wave height the same.”

**Finish/key:** Initial A shorter wavelength than B; correct neighboring matching points on both; a retained changed diagram and an explanation based on spacing. Changing height alone is not accepted as evidence for longer wavelength. No numerical measurement is required or invented.

**Build/verify:** New explicit wavelength mode, possibly sharing WaveMaker geometry. The current WaveMaker labels cycles as frequency and its explanation is about amplitude; neither may be inherited unchanged. Test crest/trough choices, adjacency, constant amplitude/scale, and text alternatives describing the same geometry.

## S3 — Pixel Post

**Placement:** `science-u04-l03-c3` in `science-u04-l03`, *Send Binary-Grid Picture Messages*. Standard: `4-PS4-3`.

**Concept → action → result → reasoning:** A picture can be reconstructed from two-valued cells and a shared order; encode, locally decode, and repair a grid; compare intended and reconstructed images; explain why order and each value matter.

**Practice setup:** A small flag on a 3×3 grid. Target rows: black black white / black black white / black white white. Key: black=1, white=0. Shared order: top-left, left to right, then next row. Neutral unset input cells are visibly “not entered”; they are not a third transmitted value. No remote recipient or real message transmission.

**Loop:** Plan the reading order → enter nine values from the target grid → press “Decode my values” to reconstruct a second grid locally → check mismatches and revise → open an authored “One value changed” challenge → find and repair the wrong cell → explain why both the key and order are needed. Keep the original grid, sent values, reconstruction, and repair record visible. A cursor can step through cells; keyboard arrows plus 0/1 or large Black/White buttons are equivalent controls.

**Dialogue:** Sandy: “A picture can travel as a pattern of two values. Both ends need the same order.” Kid: “I’ll encode each square, rebuild the picture here, and repair a changed value.” Start: **Encode the picture**.

**Coaching:** Incomplete message: “Every square needs a value, including white squares.” Mismatch: “Compare the grids in the agreed order to locate the first difference.” First reconstruction: “Now check what one changed value does.” Completion: “You used a shared key and order to reconstruct and repair the picture.”

**Finish/key:** Correct encoding `110110100`. Challenge encoding `110111100` changes row 2, column 3 from white to black; repair it to 0. Require a correct first reconstruction, a located repair, and an order/key explanation. Untouched prefilled target pixels never count as learner work.

**Build/verify:** New picture-grid mode/family. Current binary MessageSender uses 8-bit character codes and cannot represent this task merely through configuration. Test exactly nine entered binary values, row-major mapping, keyboard repair, and non-color cell labels.

## S4 — Message Design Trials

**Placement:** `science-u04-l04-c3` in `science-u04-l04`, *Compare Message Solutions*. Standard: `4-PS4-3`.

**Concept → action → result → reasoning:** Different two-valued coding solutions have tradeoffs; construct two encodings for the same target and inspect supplied trials; retain comparable results by criterion; justify a solution with a limitation.

**Complete practice packet:** Target message: HOME. All three supplied trials used the same target and noisy indoor setting. Solution A is a printed Morse strip, with H=`....`, O=`---`, M=`--`, E=`.`; 10 dots/dashes. Solution B is a drum code, soft=0/loud=1, with H=00, O=01, M=10, E=11; 8 beats. Solution C is a printed black/white strip, black=1/white=0, with H=1100, O=1010, M=0101, E=0011; 16 cells. All keys include agreed letter boundaries; separators are framing, not a third data value.

Supplied trial record, assuming correctly encoded HOME: A decoded HOME, 4/4 letters; B decoded HOHE, 3/4 letters, with one pair of beats confused in the noise; C decoded HOME, 4/4 letters. Both printed strips were readable at the stated viewing distance. These are invented case records, not universal performance measurements or results of the learner's button presses.

**Loop:** Build A and either B or C from their keys → inspect local reconstruction of each authored code → open the separately labeled supplied trial record → place results under accuracy, clarity, and values used → select the requirement “accurate printed message with fewer values” → justify a choice using two criteria and name a limit. Learner-generated decoding and supplied trial records remain separate regions.

**Dialogue:** Sandy: “The same message can use different patterns. A shorter pattern is useful only if the message can still be understood.” Kid: “I’ll build two solutions, compare the supplied results, and explain a choice using the criteria.” Start: **Compare message designs**.

**Coaching:** Comparing different targets: “Keep HOME as the target for both designs.” Shortest-only choice: “Check accuracy as well as the number of values.” Correct comparison: “What might change if the conditions or the reader's key changed?” Completion: “You supported a design choice with two criteria and a limitation.”

**Finish/key:** For the stated printed-message need, A meets 4/4 with 10 values versus C's 16. B uses fewer values but misses a letter in this supplied noisy trial and is not printed. Require two constructed encodings, a criteria-based choice, and a limit such as needing the shared key; do not claim A is always best or noise always causes B to fail.

**Build/verify:** New comparison task; reuse local encoding utilities where they fit, with the existing boundary kept typed. Test code uniqueness, exact value counts, fair record labels, and no real-network sending.

## S5 — Lamp Test Notebook

**Placement:** `science-u05-l03-c1` in `science-u05-l03`, *Test an Energy-Conversion Device*. Standard: `4-PS3-4`.

**Concept → action → result → reasoning:** Judge a device against a fixed goal using repeatable procedures and observable records; order a procedure and replay supplied trials; retain results and comparisons; explain whether the records meet the goal without inventing a cause.

**Practice setup:** Battery-powered reading-lamp case. Goal: stay visibly lit throughout a ten-second interval. Supplied practice record: Trial 1 lit six seconds, then flickered off; Trial 2 lit seven seconds, then flickered off; Trial 3 lit six seconds, then flickered off. Same battery type, lamp, switch, connections, viewing condition, and ten-second interval are specified in every supplied trial. A static labeled circuit diagram identifies the device; no physical assembly is requested. The prototype uses the existing lesson's 6, 7, 6 record for continuity across teaching, activity, and Quick Check.

**Loop:** Arrange “check setup / close switch / observe the whole interval / record the result” → lock the common test settings → step or play each supplied record → enter the visible lit duration and observed effect in a notebook → compare each with the ten-second goal → separate an observation from a proposed explanation. Playing a record animates its known timeline; changing playback speed cannot change the underlying trial values.

**Dialogue:** Sandy: “We need the same goal and procedure for every trial. Then the records can help us judge the lamp.” Kid: “I’ll organize the test steps, inspect the supplied trials, and compare every result with the goal.” Start: **Open the test notebook**.

**Coaching:** Inconsistent setup: “Change the playback view if you need to, but keep the test conditions and goal the same.” Inference in observation field: “Record what the lamp did before suggesting why.” Near-pass verdict: “The goal is the whole ten seconds. Compare each recorded duration with ten.” Completion: “You used all three records to judge this version against its stated goal.”

**Finish/key:** Record 6,7,6 seconds with flickered off; zero of three met ten seconds. Require procedure, all records, goal comparison, and distinction between an effect and an untested cause. Do not convert seconds into an energy amount or judge by an average alone.

**Build/verify:** New device-trial notebook family. Existing energy-conversion path builder lacks repeated records and criterion evaluation. Test all-trial judgment, exact timeline/text agreement, reduced-motion instant records, and no false “we tested your physical lamp.”

## S6 — One-Change Retest

**Placement:** `science-u05-l04-c3` in `science-u05-l04`, *Refine a Device Using Test Evidence*. Standard: `4-PS3-4`.

**Concept → action → result → reasoning:** A controlled refinement compares versions while holding other conditions steady; choose a change, inspect setup differences, and compare supplied trial sets; retain before/after evidence; make a bounded improvement claim.

**Complete supplied case:** Original lamp: 6,7,6 seconds lit before flickering off during three ten-second trials. Setup note: one clip was loosely fitted. Refined version: only that clip was replaced with a firmly fitting clip. Same battery type, lamp, switch, viewing condition, and interval. Retest records: 10,10,10 seconds lit, with no flicker during the interval. Goal: remain lit throughout ten seconds. This invented record describes the one-clip revision; it does not supply results for other revisions.

**Loop:** Highlight the original performance gap → propose a change using component controls → compare old/new setup cards and identify changed versus held-steady features → if multiple features changed, revise for a fair comparison → inspect the supplied one-clip retest → align paired trial bars with a ten-second goal line → build “change / first results / retest results / supported claim / limit.” The learner can inspect other one-change proposals, but the app labels their outcomes “Needs a new test,” never fabricating retest evidence.

**Dialogue:** Sandy: “A new version needs a fair comparison with the first one. Let's change one feature and keep track of the evidence.” Kid: “I’ll compare the setups, inspect both record sets, and explain what this retest supports.” Start: **Compare the refinement**.

**Coaching:** Multiple changes: “With several changes at once, which one could explain a difference? Try a one-feature plan.” No supplied data: “This packet has no retest for that change. It would need a new test.” Retest matched: “Cite both sets of records before making your claim.” Completion: “You connected one recorded change to better results in these trials and kept the claim limited to the evidence.”

**Finish/key:** Identify the one-clip comparison; original 0/3 meets goal, refined 3/3; cite both sets and the unchanged conditions. Accept “this version performed better in these trials”; reject “will never fail again” or “the app proved the clip caused every failure.” All data needed are inside this activity; S5 completion is not required or stored.

**Build/verify:** Second mode of S5's trial notebook. Test controlled-change count, honest unavailable outcomes, standalone lesson access, retained original records, and no stale success after revising the plan.

## S7 — Build a Plant System

**Placement:** `science-u06-l01-c3` in `science-u06-l01`, *Explain Plant Structures as a System*. Standard: `4-LS1-1`.

**Concept → action → result → reasoning:** Plant structures perform connected jobs; assemble and label a whole-plant model and link functions; see a connected system; explain how several parts support growth or reproduction together.

**Complete source card:** “A blackberry plant has roots in soil, stems supporting leaves and flowers, leaves exposed to light, flowers, and thorns along its stems. Roots take in water and help anchor the plant. Stems support the plant and move materials. Leaves capture sunlight to help the plant make food. Flowers support reproduction. Thorns can discourage some animals from feeding.” This is supplied instructional information, not an app observation.

**Loop:** Place root, stem, leaf, flower, and thorn labels on a recognizable plant diagram → attach function cards → connect roots→stem→leaves as a water/material-support pathway and light→leaves as a separate input → connect flower and thorn roles to reproduction/protection → explain a system contribution using at least three structures. Select/place buttons mirror every diagram control. Optional toggling hides one connection and asks which explanation is now incomplete; it never simulates instant plant death or guaranteed growth.

**Dialogue:** Sandy: “A plant's parts have different jobs, and some jobs depend on connections between parts.” Kid: “I’ll build the plant model, connect its jobs, and explain how several structures work together.” Start: **Build the plant system**.

**Coaching:** Isolated list: “Connect one structure's job to another structure instead of only listing names.” Misrouted light: “Light reaches the leaves from outside the plant; it does not travel up from the roots.” Function matched: “Use the links to explain how water, support, and light work together.” Completion: “You explained a plant system using connected structure jobs.”

**Finish/key:** Five valid structure/function matches and a supported roots/stem/leaves chain, plus one reproduction/protection role. Roots do not take in the plant's food; thorns do not guarantee protection. No microscopic cell mechanisms required.

**Build/verify:** New plant-system mode sharing selected matching controls, not animal-only language/art. Use correctly placed visible roots and aboveground parts. Test direction/meaning of links, non-color labels, and complete text alternative of the assembled system.

## S8 — Survival Evidence Board

**Placement:** `science-u06-l03-c3` in `science-u06-l03`, *Argue How Structures Support Survival*. Standard: `4-LS1-1`.

**Concept → action → result → reasoning:** A system argument connects a claim, relevant observations, and cooperating functions; link evidence cards to a plant or animal claim; inspect a traceable argument; explain the system and one evidence limit.

**Complete supplied packet:** Plant notes: blackberry roots reached damp soil during a dry week; its stem remained upright and held spread leaves in sunlight. Wren notes: its beak gathered insects; its wings carried it to cover; feathers covered and protected its body. Extra notes: the observer used a purple notebook; the bird was the observer's favorite. Limits: these descriptions do not measure exact food production, prove every individual survives, or show microscopic processes. These are supplied practice observations, not results measured inside the app.

**Loop:** Choose plant or wren → assemble a claim about cooperating structures → inspect the complete packet and select at least two relevant observations → connect each structure to its function and both to the claim → set aside preference/unrelated details → choose a cautious limit. The visual diagram displays arrows corresponding to the selected reasoning links, not glowing “survival power.” An optional second round compares the other organism.

**Dialogue:** Sandy: “An argument needs more than a list of body parts. Which observations help explain how the parts work together?” Kid: “I’ll connect a claim to observations and functions, then name what the evidence cannot tell me.” Start: **Build a survival argument**.

**Coaching:** Preference used as evidence: “Does that note show a structure doing a job?” Unconnected list: “Explain how the selected jobs help the organism together.” Relevant evidence: “Keep the observation separate from the conclusion it supports.” Completion: “Your argument connects cooperating structures to supplied observations and a clear limit.”

**Finish/key:** Plant water access + supported leaves in light support growth/survival; wren feeding + movement to cover support survival/behavior, optionally feathers/protection. Accept either complete path; no enforced single organism. Require at least two evidence/function links, system reasoning, and one truthful limit. Freewritten extension is reflection, not machine-scored argument quality.

**Build/verify:** Science argument mode sharing S1's evidence-board controls. Test both accepted organisms, observation/inference distinction, irrelevant true facts, and no required microscopic explanation.

## S9 — Sense-to-Response Trail

**Placement:** `science-u06-l04-c3` in `science-u06-l04`, *Model Sense, Brain, and Response*. Standard: `4-LS1-2`.

**Concept → action → result → reasoning:** Sense information is processed before a possible response; construct and run an information-flow model; retain two possible response paths; explain why the same kind of input need not force one outcome.

**Complete model card:** “A branch snaps near a wren. Sound can provide information through hearing. In this model, that information goes to the brain for processing. The wren might turn toward the sound, pause, or fly to cover. These are possible responses, not predictions that every wren must behave the same way. In another scene, a wren sees a berry: light provides information through sight.”

**Loop:** Select the branch-snap event → place hearing and brain nodes between event and response → choose one plausible response and step the model → retain its labeled path → choose a second plausible response with the same input → compare paths → transfer to the berry scene with sight. A moving information marker follows the learner's links; it is labeled a model signal, not a literal thing seen moving inside the animal. No audio is necessary.

**Dialogue:** Sandy: “The same sound can lead to more than one response. Let's model how information reaches an animal and is processed.” Kid: “I’ll connect the event, sense, and brain, then compare two possible responses.” Start: **Build the response trail**.

**Coaching:** Sense mismatch: “Is this event giving sound information or light information?” Missing processing: “This model needs the brain-processing step between receiving information and responding.” First path: “Keep that path and try another possible response to the same sound.” Completion: “You modeled information moving through a sense and the brain, with more than one possible response.”

**Finish/key:** sound→hearing→brain processing→two distinct choices among turn/pause/fly to cover; berry/light→sight→brain processing→a plausible look/approach/continue response. Require both paths and a statement that these are possibilities, not guarantees. No receptor, memory-storage, or neurological mechanism content.

**Build/verify:** New sense-response model. Do not repurpose the structure matcher into a fixed one-to-one sense/response quiz. Test branching valid outcomes, missing brain step, optional sound off, and identical reduced-motion end states.
