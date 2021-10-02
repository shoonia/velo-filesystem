import type { File } from './tree/File';
import { version } from '../manifest';
import { createVeloRc, getRootDir } from './fs';
import { Directory } from './tree/Directory';
import { getModels, createPageMap } from './textModel';

export const downloadFiles = async (): Promise<void> => {
  const [, root] = await getRootDir();

  if (root === null) {
    return;
  }

  const [src] = await Promise.all([
    root.getDirectoryHandle('src', { create: true }),
    createVeloRc(root, { version }),
  ]);

  const models = getModels();
  const getPageName = createPageMap();
  const srcDir = new Directory({
    handler: src,
  });

  const tasks: Promise<File>[] = [];

  for (const model of models) {
    const { path } = model.uri;
    const value = model.getValue();

    if (path === '/public/pages/masterPage.js') {
      tasks.push(
        srcDir.writeChildFile('masterPage.js', value),
      );
    }

    else if (path.startsWith('/public/pages/')) {
      const pages = await srcDir.getChildDirectory('pages');

      tasks.push(
        pages.writeChildFile(getPageName(path), value),
      );
    }

    else if (
      path.startsWith('/public/') ||
      path.startsWith('/backend/')
    ) {
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
