import { createStoreon } from 'storeon-velo';

import type { IState, IEvents } from './types';
import { appModule } from './appModule';

export const { connect, dispatch, getState, readyStore } = createStoreon<IState, IEvents>([
  appModule,
]);
