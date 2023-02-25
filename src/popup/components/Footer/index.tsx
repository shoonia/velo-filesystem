import type { FC } from 'jsx-dom-runtime';

import './styles.css';
import { to } from '../../../chrome';
import { discussions as link, version } from '../../../assets/pkg';

export const Footer: FC = () => {
  const handleClick: EventListener = (event) => {
    event.preventDefault();
    to(link);
  };

  return (
    <footer class="footer">
      <span class="note">
        {`v${version}-alpha`}
      </span>
      <a
        href={link}
        onclick={handleClick}
        class="feedback"
      >
        Feedback
      </a>
    </footer>
  );
};
