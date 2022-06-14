export const CUSTOM_EVENT_REQUEST = '>_request::velo-filesystem';
export const CUSTOM_EVENT_RESPONSE = '<_response::velo-filesystem';

export const enum ReqEvents {
  onmout = '>_onmout',
  download = '>_download',
}

export const enum ResEvents {
  content_loaded = '<_content_loaded',
}

export interface IReqMessage {
  type: ReqEvents;
}

export interface IResMessage {
  type: ResEvents;
}
