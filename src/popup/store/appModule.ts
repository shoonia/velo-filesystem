import type { TMoudule } from './types';

export const appModule: TMoudule = (store) => {
  store.on('@init', () => {
    return {
      isEnable: false,
    };
  });
};
