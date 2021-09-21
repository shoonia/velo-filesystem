/// <reference types="chrome"/>
import type { IMessage } from './transport';

export const getURL = (path: string): string => {
  return chrome.runtime.getURL(path);
};

export const sendTabMessage = async (message?: IMessage): Promise<void> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (typeof tab?.id === 'number') {
    chrome.tabs.sendMessage(tab.id, message);
  }
};

export const onMessage = (cb: (message?: IMessage) => void): void => {
  chrome.runtime.onMessage.addListener(cb);
};
