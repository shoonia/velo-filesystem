import type { TMoudule } from './types';
import { onMessage } from '../../chrome';
import { PostEvents } from '../../transport';

export const messageModule: TMoudule = ({ dispatch }) => {
  onMessage((message) => {
    switch (message?.type) {
      case PostEvents.content_loaded: {
        return dispatch('enable/toogle', true);
      }
    }
  });
};
