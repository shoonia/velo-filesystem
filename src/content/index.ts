import { getURL, onMessage } from '../chrome';
import { createElement } from '../util';

const script = createElement('script', {
  type: 'module',
  src: getURL('module.js'),
  async: true,
});

document.body.append(script);

onMessage((message) => {
  console.log(message);
});
