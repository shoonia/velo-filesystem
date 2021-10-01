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

  for (const model of models) {
    const { path } = model.uri;
    const value = model.getValue();

    if (path === '/public/pages/masterPage.js') {
      const file = await srcDir.getChildFile('masterPage.js');
      await file.write(value);
    }

    else if (path.startsWith('/public/pages/')) {
      const pages = await srcDir.getChildDirectory('pages');
      const file = await pages.getChildFile(getPageName(path));
      await file.write(value);
    }

    else if (
      path.startsWith('/public/') ||
      path.startsWith('/backend/')
    ) {
      const paths = path.slice(1).split('/');
      const len = paths.length;

      let i = 0;
      let handler = await srcDir.getChildDirectory(paths[i]);

      while (++i < len) {
        const key = paths[i];

        if (i + 1 === len) {
          const file = await handler.getChildFile(key);
          await file.write(value);
        } else {
          handler = await handler.getChildDirectory(key);
        }
      }
    }
  }
};
