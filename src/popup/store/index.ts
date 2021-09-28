import { createStoreon } from 'storeon';

import { appModule } from './appModule';
import { messageModule } from './messageModule';

export const store = createStoreon([
  appModule,
  messageModule,
]);
