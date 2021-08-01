import { getURL } from '../chrome';

const script = Object.assign(document.createElement('script'), {
  type: 'module',
  src: getURL('module.js'),
  async: true,
});

document.body.append(script);
