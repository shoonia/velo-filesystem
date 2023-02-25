import {
  ResEvents,
  IResMessage,
  CUSTOM_EVENT_RESPONSE,
} from './transport';

export const dispatchEvent = (type: ResEvents): void => {
  window.dispatchEvent(
    new CustomEvent<IResMessage>(CUSTOM_EVENT_RESPONSE, {
      detail: { type },
    }),
  );
};
