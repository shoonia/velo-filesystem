import type { FC } from 'jsx-dom-runtime';

import './ReleaseNote.css';
import { version } from '../../assets/pkg';

export const ReleaseNote: FC = () => (
  <span class="note">
    v{version}-alpha
  </span>
);
