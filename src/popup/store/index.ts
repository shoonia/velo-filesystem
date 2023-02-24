import { createStoreon } from 'storeon-velo';

import type { IState, IEvents } from './types';
import { appModule } from './appModule';
import { messageModule } from './messageModule';

export const { connect, readyStore } = createStoreon<IState, IEvents>([
  appModule,
  messageModule,
]);
