import type { File } from './tree/File';
import type { Directory } from './tree/Directory';
import type { IState } from 'src/popup/store/types';
import { getMetaFileValue } from '../assets/pkg';
import { getRootDir } from './fs';
import { getModels, createPageMap, fileMatch } from './textModel';

export const downloadFiles = async ({ includePageId }: IState): Promise<void> => {
  const [, rootDir] = await getRootDir();

  if (rootDir === null) {
    return;
  }

  const srcDir = await rootDir.getChildDirectory('src');

  const models = getModels();
  const getPageName = createPageMap(includePageId);

  const tasks: Promise<File>[] = [
    rootDir.writeChildFile('velofilesystemrc', getMetaFileValue()),
  ];

  for (const model of models) {
    const { path } = model.uri;
    const value = model.getValue();

    if (fileMatch.isMasterPage(path)) {
      tasks.push(
        srcDir.writeChildFile('masterPage.js', value),
      );
    }

    else if (fileMatch.isPages(path)) {
      const pages = await srcDir.getChildDirectory('pages');

      tasks.push(
        pages.writeChildFile(getPageName(path), value),
      );
    }

    else if (fileMatch.isPublicOrBackend(path)) {
      const paths = path.slice(1).split('/');
      const len = paths.length;

      let i = 0;
      let handler: Directory = srcDir;

      while (i < len) {
        const name = paths[i++];

        if (i !== len) {
          handler = await handler.getChildDirectory(name);
        } else {
          tasks.push(
            handler.writeChildFile(name, value),
          );
        }
      }
    }
  }

  await Promise.all(tasks);
};
