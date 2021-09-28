export const CUSTOM_EVENT_REQUEST = 'velo-filesystem::>_request';
export const CUSTOM_EVENT_RESPONSE = 'velo-filesystem::<_response';

export const enum ReqEvents {
  onmout = '>_onmout',
  download = '>_download',
}

export const enum ResEvents {
  content_loaded = '<_content_loaded',
}

export interface IReqMessage {
  type: ReqEvents;
  payload?: unknown;
}

export interface IResMessage {
  type: ResEvents;
  payload?: unknown;
}
