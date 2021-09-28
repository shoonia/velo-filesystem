import {
  IMessage,
  PostEvents,
  CUSTOM_EVENT_RESPONSE,
} from '../../transport';

export const dispatchEvent = (type: PostEvents, detail?: unknown): void => {
  window.dispatchEvent(
    new CustomEvent<IMessage>(CUSTOM_EVENT_RESPONSE, {
      detail: {
        type,
        detail,
      },
    }),
  );
};
