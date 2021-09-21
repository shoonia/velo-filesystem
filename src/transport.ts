export const CUSTOM_EVENT = 'velo-filesystem::custom-event';

export const enum PostEvents {
  download = '>_download',
}

export interface IMessage {
  type: PostEvents;
  detail?: unknown;
}
