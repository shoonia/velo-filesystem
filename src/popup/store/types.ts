import type { StoreonModule } from 'storeon-velo';

export interface IState {
  readonly isEnable: boolean;
  readonly includePageId: boolean;
}

export interface IEvents {
  'download/file': never;
  'toggle/includePageId': boolean;
}

export type TMoudule = StoreonModule<IState, IEvents>;
