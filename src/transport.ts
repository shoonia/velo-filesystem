export const CUSTOM_EVENT_REQUEST = 'velo-filesystem::>_request';
export const CUSTOM_EVENT_RESPONSE = 'velo-filesystem::<_response';

export const enum PostEvents {
  onmout = '>_onmout',
  download = '>_download',
  content_loaded = '<_content_loaded',
}

export interface IMessage {
  type: PostEvents;
  detail?: unknown;
}
