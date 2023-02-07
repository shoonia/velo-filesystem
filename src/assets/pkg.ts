import { version, discussions } from '../../package.json';

export { version, discussions };

export const getMetaFileValue = (): string => {
  return JSON.stringify({ version }, null, 2);
};
