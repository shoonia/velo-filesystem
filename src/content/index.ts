import { dispatchRequest, addResponseListener } from '../transport';
import { getURL, onMessage, sendRespose } from '../chrome';

document.body.append(
  Object.assign(document.createElement('script'), {
    type: 'module',
    src: getURL('module.js'),
    async: true,
  }),
);

addResponseListener(sendRespose);
onMessage(dispatchRequest);
