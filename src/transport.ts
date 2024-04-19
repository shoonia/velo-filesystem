import type { IState } from './popup/store/types';

export const enum CUSTOM_EVENT {
  REQUEST = '>_request::velo-filesystem',
  RESPONSE = '<_response::velo-filesystem',
}

export const enum REQUEST {
  READY = '>_ready',
  DOWNLOAD = '>_download',
}

export const enum RESPONSE {
  LOADED = '<_loaded',
}

export interface IRequest {
  readonly type: REQUEST;
  readonly state: IState;
}

export interface IResponse {
  readonly type: RESPONSE;
}

type TDispatcer<T> = (detail: T) => boolean;
type TListener<T> = (callback: (detail: T) => void) => void

export const dispatchResponce: TDispatcer<IResponse> = (detail) =>
  dispatchEvent(
    new CustomEvent<IResponse>(CUSTOM_EVENT.RESPONSE, { detail }),
  );

export const dispatchRequest: TDispatcer<IRequest> = (detail) =>
  dispatchEvent(
    new CustomEvent<IRequest>(CUSTOM_EVENT.REQUEST, { detail }),
  );

export const addResponseListener: TListener<IResponse> = (callback) =>
  addEventListener(CUSTOM_EVENT.RESPONSE, (event) => callback(event.detail));


export const addRequestListener: TListener<IRequest> = (callback) =>
  addEventListener(CUSTOM_EVENT.REQUEST, (event) => callback(event.detail));
