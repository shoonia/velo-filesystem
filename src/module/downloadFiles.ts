import type { File } from './tree/File';
import type { Directory } from './tree/Directory';
import type { IState } from 'src/popup/store/types';
import { getMetaFileValue } from '../assets/pkg';
import { duplicateErrorMessage, getRootDir } from './fs';
import { getModels,
  getPages,
  createPageMap,
  isMasterPage,
  isPages,
  isPublicOrBackend,
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

  const [, rootDir] = await getRootDir();

  if (rootDir === null) {
    return;
  }

  const srcDir = await rootDir.getDirectory('src');

  const models = getModels();
  const getPageName = createPageMap(includePageId, pages);

  const tasks: Promise<File>[] = [
    rootDir.writeFile('velofilesystemrc', getMetaFileValue()),
  ];

  for (const model of models) {
    const { path } = model.uri;
    const value = model.getValue();

    if (isMasterPage(path)) {
      tasks.push(
        srcDir.writeFile('masterPage.js', value),
      );
    }

    else if (isPages(path)) {
      const pages = await srcDir.getDirectory('pages');

      tasks.push(
        pages.writeFile(getPageName(path), value),
      );
    }

    else if (isPublicOrBackend(path)) {
      const paths = path.slice(1).split('/');
      const len = paths.length;

      let i = 0;
      let dir: Directory = srcDir;

      while (i < len) {
        const name = paths[i++];

        if (i !== len) {
          dir = await dir.getDirectory(name);
        } else {
          tasks.push(
            dir.writeFile(name, value),
          );
        }
      }
    }
  }

  await Promise.all(tasks);
};
