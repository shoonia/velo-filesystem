import {
  IReqMessage,
  CUSTOM_EVENT_REQUEST,
  CUSTOM_EVENT_RESPONSE,
} from '../transport';
import { getURL, onMessage, sendResMessage } from '../chrome';
import { createElement } from '../util';

const script = createElement('script', {
  type: 'module',
  src: getURL('module.js'),
  async: true,
});

document.body.append(script);

window.addEventListener(CUSTOM_EVENT_RESPONSE, ({ detail }) => {
  sendResMessage(detail);
});

onMessage<IReqMessage>((detail) => {
  window.dispatchEvent(
    new CustomEvent<IReqMessage>(CUSTOM_EVENT_REQUEST, {
      detail,
    }),
  );
});
