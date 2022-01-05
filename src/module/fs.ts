import { Directory } from './tree/Directory';

type IGetRootDir = () => Promise<[DOMException | null, Directory | null]>;

export const getRootDir: IGetRootDir = async () => {
  try {
    const root = await window.showDirectoryPicker();

    const rootDir = new Directory({
      handler: root,
    });

    return [null, rootDir];
  } catch (error) {
    if (error instanceof DOMException) {
      return [error, null];
    }

    throw error;
  }
};
