import type { CUSTOM_EVENT, IMessage } from './transport';

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
    [CUSTOM_EVENT]: CustomEvent<IMessage>;
  }
}
