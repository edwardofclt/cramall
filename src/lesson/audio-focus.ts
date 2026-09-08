// A single owner coordinates device read-aloud and the live guide. No audio or
// learner state is stored; ownership ends when that player stops or unmounts.
let owner: (() => void) | undefined;
export function claimAudio(stop: () => void) {
  if (owner === stop) return;
  const previous = owner;
  owner = stop;
  previous?.();
}
export function releaseAudio(stop: () => void): boolean {
  if (owner !== stop) return false;
  owner = undefined;
  return true;
}
