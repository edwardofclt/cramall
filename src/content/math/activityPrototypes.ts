import type { WidgetCoach, WidgetConfig } from '../schema';

export const scaleReadingConfig: WidgetConfig<'scale-reading'> = {
  items: [
    { id: 'apple', label: 'Apple', illustration: 'apple', unit: 'oz', valueTenths: 56, minWhole: 4, maxWhole: 7 },
    { id: 'backpack', label: 'Backpack', illustration: 'backpack', unit: 'lb', valueTenths: 73, minWhole: 6, maxWhole: 9 },
    { id: 'eraser', label: 'Eraser', illustration: 'eraser', unit: 'g', valueTenths: 234, minWhole: 22, maxWhole: 25 },
    { id: 'kit', label: 'Camping kit', illustration: 'kit', unit: 'kg', valueTenths: 35, minWhole: 2, maxWhole: 5 },
  ],
};
export const scaleReadingCoach: WidgetCoach = {
  startLabel: 'Weigh the kit',
  intro: [
    { speaker: 'guide', pose: 'talk', text: 'The kit has light and heavy objects. Let’s read each scale carefully and keep its unit.' },
    { speaker: 'kid', text: 'I’ll place each object, find the neighboring whole numbers, and record the nearest one.' },
  ],
  reactions: {
    strategy: { pose: 'think', text: 'Keep the scale’s unit with your number.' },
    retry: { pose: 'oops', text: 'Compare the reading with the halfway point between the neighboring whole marks.' },
    milestone: { pose: 'talk', text: 'Your notebook keeps both the reading and the rounded value.' },
    complete: { pose: 'cheer', text: 'You read four scales and kept the units with your measurements.' },
  },
};
