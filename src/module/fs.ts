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

const MAX_LISTED_ERRORS = 10;

export const writeErrorMessage = (errors: readonly string[]) => {
  const listed = errors.slice(0, MAX_LISTED_ERRORS);
  const rest = errors.length - listed.length;

  return alert(
    `${errors.length} file(s) could not be saved:\n\n` +
    listed.join('\n') +
    (rest > 0 ? `\n...and ${rest} more` : '') +
    '\n\nThe selected folder may be read-only, or a page title may contain ' +
    'characters that cannot be used in a file name. Note that the files listed ' +
    'above were left unchanged - any older copy on disk is still there.',
  );
};

export const duplicateErrorMessage = (page: IPage) => alert(
  `Multiple pages share the same title: "${page.title}".\n\n` +
  'This can cause files to overwrite when saved. To fix this:\n\n' +
  '- Rename the duplicate pages in Wix and reload this tab,\n' +
  '- OR enable ✅ "Include page ID" in the extension so filenames remain unique.\n\n' +
  'After making one of these changes, try downloading again.',
);
