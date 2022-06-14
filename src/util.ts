import {
  ResEvents,
  IResMessage,
  CUSTOM_EVENT_RESPONSE,
} from './transport';

type M = HTMLElementTagNameMap;

export const createElement = <T extends keyof M>(
  tagName: T,
  props?: Partial<M[T]>,
): M[T] => {
  return Object.assign(document.createElement<T>(tagName), props);
};

export const dispatchEvent = (type: ResEvents): void => {
  window.dispatchEvent(
    new CustomEvent<IResMessage>(CUSTOM_EVENT_RESPONSE, {
      detail: { type },
    }),
  );
};
