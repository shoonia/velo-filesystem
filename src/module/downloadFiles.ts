import type { Directory } from './Directory';
import type { IState } from '../popup/store/types';
import { getMetaFileValue } from '../assets/pkg';
import { duplicateErrorMessage, getRootDir, writeErrorMessage } from './fs';
import {
  getModels,
  getPages,
  createPageMap,
  isMasterPage,
  isPages,
  findDuplicate,
} from './textModel';

export const downloadFiles = async ({ includePageId }: IState): Promise<void> => {
  const pages = getPages();

  if (!includePageId) {
    const duplicate = findDuplicate(pages);

    if (duplicate) {
      return duplicateErrorMessage(duplicate);
    }
  }

  const rootDir = await getRootDir();

  if (rootDir == null) {
    return;
  }

  const srcDir = await rootDir.getDirectory('src');

  const models = getModels();
  const getPageName = createPageMap(includePageId, pages);

  const tasks: Promise<void>[] = [];
  const errors: string[] = [];

  const write = (dir: Directory, name: string, value: string): void => {
    tasks.push(
      dir.writeFile(name, value).catch((error: unknown) => {
        errors.push(`${name} - ${error instanceof Error ? error.message : String(error)}`);
      }),
    );
  };

  write(rootDir, 'velofilesystemrc', getMetaFileValue());

  for (const model of models) {
    const { path } = model.uri;
    const value = model.getValue();

    if (isMasterPage(path)) {
      const pages = await srcDir.getDirectory('pages');

      write(pages, 'masterPage.js', value);

      continue;
    }

    if (isPages(path)) {
      const pages = await srcDir.getDirectory('pages');

      write(pages, getPageName(path), value);

      continue;
    }

    const paths = path.slice(1).split('/');
    const len = paths.length;

    let i = 0;
    let dir: Directory = srcDir;

    while (i < len) {
      const name = paths[i];

      if (++i !== len) {
        dir = await dir.getDirectory(name);
      } else {
        write(dir, name, value);
      }
    }
  }

  await Promise.all(tasks);

  if (errors.length > 0) {
    writeErrorMessage(errors);
  }
};
