import { createStoreon } from 'storeon';
import { useStoreon as _useStoreon } from '@storeon/svelte';

import type { IState, IEvents } from './types';
import { appModule } from './appModule';
import { messageModule } from './messageModule';

export const store = createStoreon<IState, IEvents>([
  appModule,
  messageModule,
]);

export const useStoreon = _useStoreon<IState, IEvents>;
