import type { Pose } from '../../content/schema';
import winnieAsset from '../assets/winnie.png';
import { IllustratedCharacter } from './IllustratedCharacter';

export function Winnie({ pose }: { pose: Pose }) {
  return <IllustratedCharacter asset={winnieAsset} guide="winnie" pose={pose} />;
}
