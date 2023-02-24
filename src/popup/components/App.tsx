import type { FC } from 'jsx-dom-runtime';

import { DashboardPage } from './DashboardPage';
import { Footer } from './Footer';

export const App: FC = () => (
  <>
    <DashboardPage />
    <Footer />
  </>
);
