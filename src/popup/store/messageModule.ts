import type { TMoudule } from './types';
import { onMessage } from '../../chrome';
import { IResMessage, ResEvents } from '../../transport';

export const messageModule: TMoudule = ({ dispatch }) => {
  onMessage<IResMessage>((message) => {
    switch (message?.type) {
      case ResEvents.content_loaded: {
        return dispatch('enable/toogle', true);
      }

      case ResEvents.diagnostic: {
        console.log(message.payload);
      }
    }
  });
};
