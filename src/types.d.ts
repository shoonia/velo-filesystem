import type {
  IRequest,
  IResponse,
  CUSTOM_EVENT_REQUEST,
  CUSTOM_EVENT_RESPONSE,
} from './transport';

interface IPage {
  readonly pageId: string;
  readonly title: string;
  readonly pageJsonFileName: string;
}

interface ISiteHeader {
  readonly pageIdList?: {
    readonly pages?: IPage[];
  }
}

export declare global {
  interface Window {
    monaco?: typeof import('monaco-editor');
    readonly siteHeader?: ISiteHeader;
    readonly editorModel?: {
      readonly siteHeader?: ISiteHeader;
    }
  }

  interface WindowEventMap {
    readonly [CUSTOM_EVENT_REQUEST]: CustomEvent<IRequest>;
    readonly [CUSTOM_EVENT_RESPONSE]: CustomEvent<IResponse>;
  }
}
