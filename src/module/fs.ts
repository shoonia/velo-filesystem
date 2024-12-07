import type { IPage } from '../types';
import { Directory } from './Directory';

export const getRootDir = async () => {
  try {
    const handler = await showDirectoryPicker({
      mode: 'readwrite',
    });

    return new Directory(handler);
  } catch (error) {
    if (error instanceof DOMException) {
      return;
    }

    throw error;
  }
};

export const duplicateErrorMessage = (page: IPage) => alert(
  `A few pages with duplicate titles - "${page.title}".\n\n` +
  'Please rename each duplicate page title and reload the browser tab or check on ✅ "Include page ID"',
);
