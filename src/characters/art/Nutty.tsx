import type { Pose } from '../../content/schema';
import nuttyAsset from '../assets/nutty.png';
import { IllustratedCharacter } from './IllustratedCharacter';

export function Nutty({ pose }: { pose: Pose }) {
  return <IllustratedCharacter asset={nuttyAsset} guide="nutty" pose={pose} />;
}
