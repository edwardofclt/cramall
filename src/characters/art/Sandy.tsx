import type { Pose } from '../../content/schema';
import sandyAsset from '../assets/sandy.png';
import { IllustratedCharacter } from './IllustratedCharacter';

export function Sandy({ pose }: { pose: Pose }) {
  return <IllustratedCharacter asset={sandyAsset} guide="sandy" pose={pose} />;
}
