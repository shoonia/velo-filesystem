import type { FC } from 'jsx-dom-runtime';

import './Feedback.css';
import { to } from '../../chrome';
import { discussions as link } from '../../assets/pkg';

const handleClick: EventListener = (event) => {
  event.preventDefault();
  to(link);
};

export const Feedback: FC = () => (
  <a
    href={link}
    onclick={handleClick}
    class="feedback"
  >
    Feedback
  </a>
);
