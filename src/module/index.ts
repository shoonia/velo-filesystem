/// <reference types="wicg-file-system-access"/>

type TPageIdMap = Map<string, string>;

const createPageIdMap = (): TPageIdMap => {
  const map: TPageIdMap = new Map();

  window.siteHeader?.pageIdList.pages.forEach((i) => {
    map.set(`${i.pageId}.js`, `${i.title}.${i.pageId}.js`);
  });

  return map;
};

const createWritable = (content: string) => {
  return async (file: FileSystemFileHandle): Promise<void> => {
    const writable = await file.createWritable();

    await writable.write(content);
    await writable.close();
  };
};

export const loadFiles = async (): Promise<void> => {
  const createOps: FileSystemGetDirectoryOptions = {
    create: true,
  };

  const models = window.monaco?.editor.getModels();
  const pageIdMap = createPageIdMap();

  if (!Array.isArray(models)) {
    return;
  }

  const rootDir = await window.showDirectoryPicker();
  const srcDir = await rootDir.getDirectoryHandle('src', createOps);

  const [
    pagesDir,
    publicDir,
    backendDir,
  ] = await Promise.all([
    srcDir.getDirectoryHandle('pages', createOps),
    srcDir.getDirectoryHandle('public', createOps),
    srcDir.getDirectoryHandle('backend', createOps),
  ]);

  const files = models.map((model) => {
    const { path } = model.uri;

    const name = path.split('/').pop() ?? '';
    const value = model.getValue();
    const handler = createWritable(value);

    if (path === '/public/pages/masterPage.js') {
      return srcDir.getFileHandle(name, createOps).then(handler);
    }

    if (path.startsWith('/public/pages/')) {
      const title = pageIdMap.has(name) ? pageIdMap.get(name) ?? '' : name;

      return pagesDir.getFileHandle(title, createOps).then(handler);
    }

    if (path.startsWith('/public/')) {
      return publicDir.getFileHandle(name, createOps).then(handler);
    }

    if (path.startsWith('/backend/')) {
      return backendDir.getFileHandle(name, createOps).then(handler);
    }
  })
    .filter(Boolean);

  await Promise.all(files);
};
