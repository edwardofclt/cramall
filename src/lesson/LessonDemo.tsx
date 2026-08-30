import type { InstructionalDemo } from '../content/schema';
import { RollerCoasterDemo } from './RollerCoasterDemo';

export function LessonDemo({ demo }: { demo: InstructionalDemo }) {
  switch (demo.type) {
    case 'roller-coaster':
      return <RollerCoasterDemo focus={demo.focus} />;
  }
}
