import type monaco from 'monaco-editor';
import type {
  IRequest,
  IResponse,
  CUSTOM_EVENT,
} from './transport';

interface IPage {
  readonly id: string;
  readonly title: string;
}

declare global {
  interface Window {
    readonly monaco?: typeof monaco;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly wixCodeRepluggableAppDebug?: any;
  }

  interface WindowEventMap {
    readonly [CUSTOM_EVENT.REQUEST]: CustomEvent<IRequest>;
    readonly [CUSTOM_EVENT.RESPONSE]: CustomEvent<IResponse>;
  }
}
