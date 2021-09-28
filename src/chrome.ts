/// <reference types="chrome"/>
import type {
  IReqMessage,
  IResMessage,
  ReqEvents,
} from './transport';

export const getURL = (path: string): string => {
  return chrome.runtime.getURL(path);
};

export const sendReqMessage = async (
  type: ReqEvents,
  payload?: unknown,
): Promise<void> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (typeof tab?.id === 'number') {
    chrome.tabs.sendMessage<IReqMessage>(tab.id, {
      type,
      payload,
    });
  }
};

export const sendResMessage = (message: IResMessage): void => {
  chrome.runtime.sendMessage(message);
};

export const onMessage = <T extends IResMessage | IReqMessage>(
  cb: (message?: T) => void,
): void => {
  chrome.runtime.onMessage.addListener(cb);
};
