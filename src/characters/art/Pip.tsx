import type { Pose } from '../../content/schema';
import pipAsset from '../assets/pip.png';
import { IllustratedCharacter } from './IllustratedCharacter';

export function Pip({ pose }: { pose: Pose }) {
  return <IllustratedCharacter asset={pipAsset} guide="pip" pose={pose} />;
}
