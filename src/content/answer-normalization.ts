export function normalizeAnswerText(value: string): string {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en-US')
    .replace(/\s+/g, ' ')
    .replace(/,/g, '')
    .replace(/\s*\+\s*/g, '+');
}
