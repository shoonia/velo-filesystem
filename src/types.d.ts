import type {
  IMessage,
  CUSTOM_EVENT_REQUEST,
  CUSTOM_EVENT_RESPONSE,
} from './transport';

export declare global {
  interface Window {
    monaco?: typeof import('monaco-editor');
    siteHeader?: {
      pageIdList: {
        pages: {
          pageId: string;
          title: string;
          pageJsonFileName: string;
        }[]
      }
    }
  }

  interface WindowEventMap {
    [CUSTOM_EVENT_REQUEST]: CustomEvent<IMessage>;
    [CUSTOM_EVENT_RESPONSE]: CustomEvent<IMessage>;
  }
}
