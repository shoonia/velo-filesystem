import type { TMoudule } from './types';
import {
  type IResponse,
  RequestEvents,
  ResponseEvents,
} from '../../../src/transport';
import { onMessage, sendRequest } from '../../../src/chrome';

const key = 'excludePageId';

export const appModule: TMoudule = (store) => {
  store.on('@init', () => {
    return {
      isEnable: false,
      includePageId: !localStorage.getItem(key),
    };
  });

  store.on('@ready', (state) => {
    sendRequest(RequestEvents.onmout, state);
  });

  store.on('download/file', (state) => {
    sendRequest(RequestEvents.download, state);
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

  onMessage<IResponse>((res) => {
    switch (res?.type) {
      case ResponseEvents.content_loaded: {
        return store.set({ isEnable: true });
      }
    }
  });
};
