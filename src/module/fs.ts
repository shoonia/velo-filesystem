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
  `Multiple pages share the same title: "${page.title}".\n\n` +
  'This can cause files to overwrite when saved. To fix this:\n\n' +
  '- Rename the duplicate pages in Wix and reload this tab,\n' +
  '- OR enable ✅ "Include page ID" in the extension so filenames remain unique.\n\n' +
  'After making one of these changes, try downloading again.',
);
