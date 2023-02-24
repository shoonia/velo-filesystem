import type { TMoudule } from './types';
import { onMessage } from '../../chrome';
import { IResMessage, ResEvents } from '../../transport';

export const messageModule: TMoudule = (store) => {
  onMessage<IResMessage>((message) => {
    switch (message?.type) {
      case ResEvents.content_loaded: {
        return store.set({ isEnable: true });
      }
    }
  });
};
