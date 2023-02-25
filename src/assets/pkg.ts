import { version, discussions } from '../../package.json';

export { version, discussions };

export const getMetaFileValue = (): string => {
  return JSON.stringify({
    version,
    editor: {
      dateCreated: new Date().toISOString(),
      url: location.href,
    },
  }, null, 2);
};
