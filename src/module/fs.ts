import type { IPage } from '../types';
import { Directory } from './tree/Directory';

export const getRootDir = async () => {
  try {
    const handler = await showDirectoryPicker({
      mode: 'readwrite',
    });

    return [null, new Directory(handler)] as const;
  } catch (error) {
    if (error instanceof DOMException) {
      return [error, null] as const;
    }

    throw error;
  }
};

export const duplicateErrorMessage = (page: IPage): void => {
  const message = `A few pages with duplicate titles - "${page.title}".\n\n` +
    'Please rename each duplicate page title and reload the browser tab or check on ✅ "Include page ID"';

  alert(message);
};
