import type { FC } from 'jsx-dom-runtime';

import './App.css';
import { DashboardPage } from './DashboardPage';
import { Feedback } from './Feedback';
import { ReleaseNote } from './ReleaseNote';

export const App: FC = () => {
  return (
    <>
      <main>
        <DashboardPage />
      </main>
      <footer>
        <ReleaseNote />
        <Feedback />
      </footer>
    </>
  );
};
