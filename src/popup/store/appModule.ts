import type { TMoudule } from './types';
import {
  type IResponse,
  REQUEST,
  RESPONSE,
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
    sendRequest(REQUEST.READY, state);
  });

  store.on('download/file', (state) => {
    sendRequest(REQUEST.DOWNLOAD, state);
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
      case RESPONSE.LOADED: {
        return store.set({ isEnable: true });
      }
    }
  });
};
