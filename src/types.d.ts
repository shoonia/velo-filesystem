import type monaco from 'monaco-editor';
import type {
  IRequest,
  IResponse,
  CUSTOM_EVENT,
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

declare global {
  interface Window {
    monaco?: typeof monaco;
    readonly siteHeader?: ISiteHeader;
    readonly editorModel?: {
      readonly siteHeader?: ISiteHeader;
    }
  }

  interface WindowEventMap {
    readonly [CUSTOM_EVENT.REQUEST]: CustomEvent<IRequest>;
    readonly [CUSTOM_EVENT.RESPONSE]: CustomEvent<IResponse>;
  }
}
