import { buildTutorContext, tutorLesson } from './context';

export type TutorAction = 'explain' | 'simplify' | 'example' | 'read' | 'question';

const explanations = [
  'Think of a topic as what a story is about, and a theme as a message you can take away. Gardening is the topic here. To find a message, watch what Mateo chooses to do and what happens afterward. A useful theme could also fit a story that takes place somewhere else. What changes in the way Mateo treats his neighbors?',
  'Evidence is a clue from the story that helps explain your thinking. For a theme, look for a choice and what happens because of it. A detail about the garden might tell us the setting. A detail about how someone helps a neighbor could tell us more about the message. Pick a quotation from the story, and we can talk about what it shows.',
  'A theme grows as a character changes. Try following three stepping stones: at first, then, and because of that. Mateo first wants to keep the extra row. After the rain, he makes a different choice. Later, the neighbors help each other. How does his later choice differ from his first one?',
];

export function demoReply(action: TutorAction, question: string, cardId: string, evidenceIds: string[] = []): string {
  const context = buildTutorContext(cardId, evidenceIds);
  const focus = tutorLesson.cards.findIndex(card => card.id === cardId);
  const asked = question.toLowerCase().trim();
  const requestsReading = /^(?:(?:can|could|would|will) you\s+)?(?:please\s+)?read\b.*\b(story|passage|page|aloud|it)\b/.test(asked);
  if (action === 'read' || requestsReading) return tutorLesson.source.text;
  if (/\b(quiz|test)\b.*\b(answer|answers)\b|\b(correct answer|answer key)\b/.test(asked)) {
    return 'I can help with a strategy: look for a complete message, then connect it to choices and results in the story. During a Quick Check, choose for yourself. Which part of finding a theme would you like to practice?';
  }
  if (action === 'simplify' || /don't (get|understand)|do not understand|confus|simpl|another way/.test(asked)) {
    return 'Imagine putting two stickers on a book. One label says what it is about, like “gardening.” The other tells an idea you could use in your own life, like “Working together can help people solve a problem.” The first is a topic. The second is a possible theme. Which kind of sticker gives a message?';
  }
  if (action === 'example' || /\bexample\b/.test(asked)) {
    return 'Here is a made-up mini-story: Jo cannot carry a big box alone. Kai helps, and together they move it safely. “A box” is a topic. “Asking for help can make a hard job easier” is a possible theme. In The Extra Row, look for the characters’ actions in the same way. What happens after Mateo brings the seedlings?';
  }
  if (action === 'question' && /evidence|quote|detail|selected|picked|fit/.test(asked)) {
    if (!context.selectedEvidence.length) return 'Choose a quotation under “Your evidence” first. Look for an action that changes what happens to the neighbors. Then ask yourself how that action connects to the message you have in mind.';
    const quote = context.selectedEvidence[0];
    const coaching = evidenceIds.includes('measures') && quote === 'Mateo measured straight garden rows'
      ? 'That shows careful planning. Does it also show how the neighbors treat each other, or would another moment help explain that?'
      : 'That gives us a character’s action. What changes for the neighbors because of that action? Connect those two ideas to explain your evidence.';
    return `You selected “${quote}.” ${coaching}`;
  }
  if (action === 'question' && /gardening|friendship|topic|theme|message/.test(asked)) {
    if (/friendship/.test(asked)) return 'Friendship is a topic: it names an idea, but it does not yet tell us a message. Try finishing “Friendship can…” in a way the story supports. Then point to an action and its result. What do the neighbors do for each other?';
    return 'Gardening is a topic because it names what the story is about. A theme adds a message about life. Ask what Mateo’s choices and their results suggest about helping other people. Could that message also fit a story outside a garden?';
  }
  if (action === 'question' && /mateo|ana|share|help|seedling|pepper|neighbor|generos|change/.test(asked)) {
    return 'Look at these two moments in The Extra Row: Mateo brings pepper seedlings after the rain, and later Ana brings stakes for his tomatoes. Those actions show help going both ways. What do you think the neighbors learn from working together?';
  }
  if (action === 'explain') return explanations[focus];
  return 'This sample has a few prepared replies; a live tutor would handle more questions. Try “Why isn’t gardening a theme?” or choose “Give me an example” to explore how the conversation would feel.';
}
