import {
  IReqMessage,
  CUSTOM_EVENT_REQUEST,
  CUSTOM_EVENT_RESPONSE,
} from '../transport';
import { getURL, onMessage, sendResMessage } from '../chrome';

document.body.append(
  Object.assign(document.createElement('script'), {
    type: 'module',
    src: getURL('module.js'),
    async: true,
  }),
);

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
