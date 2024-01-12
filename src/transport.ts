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

type TDispatcer<T> = (detail: T) => boolean;
type TListener<T> = (callback: (detail: T) => void) => void

export const dispatchResponce: TDispatcer<IResponse> = (detail) =>
  dispatchEvent(
    new CustomEvent<IResponse>(CUSTOM_EVENT_RESPONSE, { detail }),
  );

export const dispatchRequest: TDispatcer<IRequest> = (detail) =>
  dispatchEvent(
    new CustomEvent<IRequest>(CUSTOM_EVENT_REQUEST, { detail }),
  );

export const addResponseListener: TListener<IResponse> = (callback) =>
  addEventListener(CUSTOM_EVENT_RESPONSE, (event) => callback(event.detail));


export const addRequestListener: TListener<IRequest> = (callback) =>
  addEventListener(CUSTOM_EVENT_REQUEST, (event) => callback(event.detail));
