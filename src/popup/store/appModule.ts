import type { TMoudule } from './types';

export const appModule: TMoudule = ({ on }) => {
  on('@init', () => {
    return {
      isEnable: false,
    };
  });

  on('enable/toogle', (_, isEnable) => {
    return { isEnable };
  });
};
