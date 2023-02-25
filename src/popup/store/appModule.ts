import type { TMoudule } from './types';
import { IResMessage, ResEvents } from '../../../src/transport';
import { onMessage } from '../../../src/chrome';

const key = 'excludePageId';

export const appModule: TMoudule = (store) => {
  store.on('@init', () => {
    return {
      isEnable: false,
      includePageId: !localStorage.getItem(key),
    };
  });

  store.on('toggle/includePageId', (_, includePageId) => {
    if (includePageId) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, '1');
    }

    return {
      includePageId,
    };
  });

  onMessage<IResMessage>((message) => {
    switch (message?.type) {
      case ResEvents.content_loaded: {
        return store.set({ isEnable: true });
      }
    }
  });
};
