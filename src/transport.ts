export const CUSTOM_EVENT_REQUEST = '>_request::velo-filesystem';
export const CUSTOM_EVENT_RESPONSE = '<_response::velo-filesystem';

export const enum ReqEvents {
  onmout = '>_onmout',
  diagnostics = '>_diagnostics',
  download = '>_download',
}

export const enum ResEvents {
  content_loaded = '<_content_loaded',
  diagnostic = '<_diagnostic',
}

export interface IReqMessage {
  type: ReqEvents;
  payload?: unknown;
}

export interface IResMessage {
  type: ResEvents;
  payload?: unknown;
}
