import type { StoreonModule } from 'storeon';

export interface IState {
  isEnable: boolean;
}

export interface IEvents {
  'enable/toogle': boolean;
}

export type TMoudule = StoreonModule<IState, IEvents>;
