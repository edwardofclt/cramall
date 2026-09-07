import type { WidgetRef } from '../content/schema';

const compact = (value: string) => value.trim().replace(/\s+/g, ' ');
const add = (...values: Array<string | number | undefined | null>) => values
  .flatMap((value) => value === undefined || value === null ? [] : [compact(String(value))])
  .filter(Boolean);

/**
 * Returns prose and labels that a learner can see before committing a widget.
 * Identifiers, answer keys, classifications, and result text deliberately stay out.
 */
export function widgetSpeechText(ref: WidgetRef): string[] {
  switch (ref.type) {
    case 'regrouping-lab':
      return add(ref.config.context, 'Choose an operation, exchange equal values, and work through the places.');
    case 'place-value-builder':
      return add(ref.config.target === undefined ? undefined : `Build ${ref.config.target}.`);
    case 'number-line-compare':
      return add(`Number line from ${ref.config.min} to ${ref.config.max}.`, `Marker A starts at ${ref.config.a}.`, `Marker B starts at ${ref.config.b}.`);
    case 'base-ten-blocks':
      return add(ref.config.allowRegroup ? 'Regrouping is available.' : undefined);
    case 'fraction-models':
      return add(ref.config.taskPrompt, `The model has ${ref.config.denominator} equal parts.`, ref.config.task === 'share' ? 'Share every equal part fairly.' : undefined);
    case 'area-model-multiplier':
      return add(`Area model: ${ref.config.a} times ${ref.config.b}.`, ref.config.splitA ? `Split ${ref.config.a} into ${ref.config.splitA.join(' plus ')}.` : undefined, ref.config.splitB ? `Split ${ref.config.b} into ${ref.config.splitB.join(' plus ')}.` : undefined);
    case 'array-builder':
      return add(ref.config.taskPrompt, ref.config.task === 'factor-hunt' && ref.config.targetProduct !== undefined ? `Find factor pairs for ${ref.config.targetProduct}.` : undefined, ref.config.task === 'division' && ref.config.dividend !== undefined && ref.config.divisor !== undefined ? `Show ${ref.config.dividend} shared into ${ref.config.divisor} equal groups.` : undefined);
    case 'money-counter':
      return add(ref.config.taskPrompt, ref.config.targetCents === undefined ? undefined : `Show ${ref.config.targetCents} cents.`);
    case 'clock-elapsed-time':
      return ref.config.mode === 'set-time'
        ? []
        : add(`Start at ${ref.config.startTime}.`, ...(ref.config.jumpMinutes ?? []).map((jump) => `Add ${jump} minutes.`));
    case 'quarter-inch-ruler':
      return add(ref.config.taskPrompt, `Measure from ${ref.config.startInches ?? 0} inches to ${ref.config.targetInches} inches.`);
    case 'balance-scale':
      return add(ref.config.taskPrompt, ref.config.lengthModel ? 'Compare the two lengths.' : 'Compare the two pans.', ...ref.config.left.map((weight) => weight.label), ...ref.config.right.map((weight) => weight.label));
    case 'shape-classifier':
      return 'mode' in ref.config
        ? add('Classify the shapes.', 'Select every class that fits.', ...ref.config.shapes.map((_, index) => `Shape ${String.fromCharCode(65 + index)}`), ...ref.config.bins.map((bin) => bin.label))
        : add(
          'Classify the shapes.',
          `Classify by ${ref.config.rule === 'parallelPairs' ? 'pairs of parallel sides' : ref.config.rule}.`,
          ...ref.config.shapes.map((_, index) => `Shape ${String.fromCharCode(65 + index)}`),
          ...ref.config.bins.map((bin) => bin.label),
        );
    case 'data-plot-builder':
      return add(ref.config.prompt, ref.config.taskPrompt, `Categories: ${ref.config.categories.join(', ')}.`);
    case 'probability-spinner': {
      const event = ref.config.eventQuestion;
      const eventLabel = event === undefined
        ? undefined
        : event.eventLabel === 'all'
          ? 'any listed outcome'
          : event.eventLabel === 'none'
            ? 'an outcome not in the sample space'
            : ref.config.segments.find((segment) => segment.id === event.eventLabel)?.label;
      return add(ref.config.taskPrompt, ...ref.config.segments.map((segment) => segment.label), eventLabel ? `Event to classify: ${eventLabel}.` : undefined);
    }
    case 'collision-ramp':
      return add(ref.config.taskPrompt, `Cart A has mass ${ref.config.massA}.`, `Cart B has mass ${ref.config.massB}.`);
    case 'energy-transfer-builder':
      return add('Build the energy path.', 'Sources:', ...ref.config.sources, 'Transfer route:', ...ref.config.transfers, 'Receivers:', ...ref.config.targets, 'Other choices:', ...(ref.config.distractors ?? []));
    case 'wave-maker':
      return add(ref.config.taskPrompt, `Wave medium: ${ref.config.medium}.`, ref.config.target?.amplitude === undefined ? undefined : `Target amplitude ${ref.config.target.amplitude}.`, ref.config.target?.frequency === undefined ? undefined : `Target frequency ${ref.config.target.frequency}.`);
    case 'light-reflection-eye':
      return add(ref.config.taskPrompt, ref.config.task === 'trace-path' && ref.config.pathLabels ? `Build a possible path using ${ref.config.pathLabels.source}, ${ref.config.pathLabels.object}, and ${ref.config.pathLabels.eye}.` : 'Angles are measured from the dashed normal.');
    case 'message-sender':
      return add(`${ref.config.encoding === 'morse' ? 'Morse' : 'Binary'} code message model.`, 'Simplified in-app information-encoding model.', `Target message: ${ref.config.message}.`);
    case 'energy-conversion-designer': {
      const labels = new Map(ref.config.components.map((component) => [component.id, component.label]));
      return add(
        `Start with ${labels.get(ref.config.requiredStart)} and end with ${labels.get(ref.config.requiredEnd)}.`,
        'Each outgoing energy label must match the next incoming energy label.',
        ...ref.config.components.flatMap((component) => [component.label, `Input: ${component.energyIn}.`, `Output: ${component.energyOut}.`]),
        ...(ref.config.constraints ?? []).map((constraint) => constraint.label),
      );
    }
    case 'animal-structure-matcher':
      return add('Match each animal structure to its function.', 'Structures:', ...ref.config.pairs.map((pair) => `${pair.animal}: ${pair.structure}`), 'Function choices:', ...[...new Set(ref.config.pairs.map((pair) => pair.function))].sort());
    case 'erosion-simulator':
      return add('Choose an erosion agent, then run the authored model.', `Terrain: ${ref.config.terrain}.`, ...(ref.config.agents), ref.config.comparison ? 'Compare bare and covered terrain.' : undefined);
    case 'rock-layer-explorer':
      return add(ref.config.prompt, ...ref.config.layers.map((layer) => layer.label), ...ref.config.layers.flatMap((layer) => layer.artifact ? [layer.artifact] : []), ref.config.evidencePrompt, ...(ref.config.evidenceChoices ?? []).map((choice) => choice.text));
    case 'topographic-map-explorer':
      return add('Read the contour map.', ...ref.config.contours.map((contour) => `Contour elevation ${contour.elevation} meters.`), ...ref.config.points.map((point) => `${point.label}: ${point.elevation} meters.`));
    case 'hazard-solution-designer':
      return add(`Hazard: ${ref.config.hazard}.`, 'Choose protections for the hazard.', ...ref.config.solutions.flatMap((solution) => [solution.label, ...(solution.strengths ?? []), ...(solution.limits ?? [])]));
    case 'resource-sorter':
      return add('Sort each resource into an authored category.', ref.config.lessonCategory, ...ref.config.items.flatMap((item) => [item.label, ...(item.effectChoices ?? []).map((choice) => choice.text)]), ...(ref.config.effectChoices ?? []).map((choice) => choice.text));
    case 'word-root-builder':
      return add('Build a word from its parts.', `Root: ${ref.config.root}.`, ...(ref.config.prefixes ?? []).map((prefix) => `Prefix: ${prefix}.`), ...(ref.config.suffixes ?? []).map((suffix) => `Suffix: ${suffix}.`));
    case 'context-clue-detective':
      return add(ref.config.passage, `Find the clue for ${ref.config.targetWord}.`, ...ref.config.clueChoices.map((clue) => clue.text));
    case 'story-elements-mapper':
      return add(ref.config.textTitle, ref.config.source?.title, ref.config.source?.text, 'Point each story element to words in the source.', ...(ref.config.choices ?? []).map((choice) => choice.text));
    case 'theme-evidence-collector':
      return add(ref.config.source?.title, ref.config.source?.text, 'Choose a theme and evidence that supports it.', ...ref.config.themeChoices, ...ref.config.evidence.flatMap((detail) => [detail.text, detail.sourceQuote]));
    case 'central-idea-organizer':
      return add(ref.config.source?.title, ref.config.source?.text, 'Choose the central idea and details that support it.', ...ref.config.mainIdeaChoices, ...ref.config.details.flatMap((detail) => [detail.text, detail.sourceQuote]));
    case 'text-structure-sorter':
      return add('Match each excerpt to its text structure.', ...ref.config.excerpts.map((excerpt) => excerpt.text));
    case 'summary-builder':
      return add(...ref.config.sourceSentences.map((sentence) => sentence.text), ref.config.compositionPrompt, `Choose up to ${ref.config.maxSentences} sentences.`);
    case 'pov-switcher':
      return add(ref.config.passage, 'Rewrite the passage from the new point of view.', ...ref.config.pronounOptions);
    case 'figurative-language-matcher':
      return add('Match each phrase to its meaning.', 'Phrases:', ...ref.config.pairs.map((pair) => pair.phrase), 'Meaning choices:', ...ref.config.pairs.map((pair) => pair.meaning).sort());
    case 'source-credibility-checker':
      return add(ref.config.question, ...ref.config.sources.flatMap((source) => [source.title, source.author, source.date, source.publisher, source.purpose, ...(source.claims ?? []), ...(source.judgments ?? []).map((judgment) => judgment.criterion)]));
    default: {
      const exhaustive: never = ref;
      return exhaustive;
    }
  }
}
