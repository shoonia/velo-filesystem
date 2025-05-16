import type { IState } from './popup/store/types';
import type {
  IRequest,
  IResponse,
  REQUEST,
} from './transport';

export const getURL = (path: string) => {
  return chrome.runtime.getURL(path);
};

export const to = (url: string) => {
  return chrome.tabs.create({ url });
};

export const sendRequest = async (type: REQUEST, state: IState): Promise<void> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (typeof tab?.id === 'number') {
    await chrome.tabs.sendMessage<IRequest>(tab.id, { type, state });
  }
};

export const sendRespose = (message: IResponse) => {
  return chrome.runtime.sendMessage(message);
};

export const onMessage = <T extends IResponse | IRequest>(
  cb: (message: T) => void,
): void => {
  return chrome.runtime.onMessage.addListener(cb);
};
