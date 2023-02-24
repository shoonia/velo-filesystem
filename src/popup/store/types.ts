import type { StoreonModule } from 'storeon-velo';

export interface IState {
  readonly isEnable: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEvents {}

export type TMoudule = StoreonModule<IState, IEvents>;
