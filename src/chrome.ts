/// <reference types="chrome"/>
import type { IMessage, PostEvents } from './transport';

export const getURL = (path: string): string => {
  return chrome.runtime.getURL(path);
};

export const sendTabMessage = async (type: PostEvents, detail?: unknown): Promise<void> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (typeof tab?.id === 'number') {
    chrome.tabs.sendMessage<IMessage>(tab.id, {
      type,
      detail,
    });
  }
};

export const sendMessage = (message: IMessage): void => {
  chrome.runtime.sendMessage(message);
};

export const onMessage = (cb: (message?: IMessage) => void): void => {
  chrome.runtime.onMessage.addListener(cb);
};
