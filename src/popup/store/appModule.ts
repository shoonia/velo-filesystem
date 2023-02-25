import type { TMoudule } from './types';
import { IResMessage, ReqEvents, ResEvents } from '../../../src/transport';
import { onMessage, sendReqMessage } from '../../../src/chrome';

const key = 'excludePageId';

export const appModule: TMoudule = (store) => {
  store.on('@init', () => {
    return {
      isEnable: false,
      includePageId: !localStorage.getItem(key),
    };
  });

  store.on('@ready', (state) => {
    sendReqMessage(ReqEvents.onmout, state);
  });

  store.on('download/file', (state) => {
    sendReqMessage(ReqEvents.download, state);
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
