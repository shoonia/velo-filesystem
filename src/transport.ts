import type { IState } from './popup/store/types';

export const CUSTOM_EVENT_REQUEST = '>_request::velo-filesystem';
export const CUSTOM_EVENT_RESPONSE = '<_response::velo-filesystem';

export const enum RequestEvents {
  onmout = '>_onmout',
  download = '>_download',
}

export const enum ResponseEvents {
  content_loaded = '<_content_loaded',
}

export interface IRequest {
  readonly type: RequestEvents;
  readonly state: IState;
}

export interface IResponse {
  readonly type: ResponseEvents;
}

export const dispatchResponce = (detail: IResponse): boolean => {
  return window.dispatchEvent(
    new CustomEvent<IResponse>(CUSTOM_EVENT_RESPONSE, { detail }),
  );
};

export const dispatchRequest = (detail: IRequest): boolean => {
  return window.dispatchEvent(
    new CustomEvent<IRequest>(CUSTOM_EVENT_REQUEST, { detail }),
  );
};

export const addResponseListener = (
  cb: (res: IResponse) => void,
): void => {
  window.addEventListener(CUSTOM_EVENT_RESPONSE, ({ detail }) => cb(detail));
};

export const addRequestListener = (
  cb: (req: IRequest) => void,
): void => {
  window.addEventListener(CUSTOM_EVENT_REQUEST, ({ detail }) => cb(detail));
};
