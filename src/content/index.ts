
/// <reference types="chrome"/>

const script = Object.assign(document.createElement('script'), {
  type: 'module',
  src: chrome.runtime.getURL('module.js'),
  async: true,
});

document.body.append(script);
