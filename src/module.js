const createWritable = (content) => async (file) => {
  const writable = await file.createWritable();

  await writable.write(content);
  await writable.close();
};

const loadFiles = async () => {
  const createOps = { create: true };

  const models = window?.monaco.editor.getModels();

  if (typeof models === 'undefined') {
    return;
  }

  const root = await window.showDirectoryPicker();

  const [
    pagesDir,
    publicDir,
    backendDir,
  ] = await Promise.all([
    root.getDirectoryHandle('pages', createOps),
    root.getDirectoryHandle('public', createOps),
    root.getDirectoryHandle('backend', createOps),
  ]);

  const files = models.map((model) => {
    const { path } = model.uri;

    const name = path.split('/').pop();
    const value = model.getValue();
    const handler = createWritable(value);

    if (path.startsWith('/public/pages/')) {
      return pagesDir.getFileHandle(name, createOps).then(handler)
    }

    if (path.startsWith('/public/')) {
      return publicDir.getFileHandle(name, createOps).then(handler)
    }

    if (path.startsWith('/backend/')) {
      return backendDir.getFileHandle(name, createOps).then(handler)
    }
  })
    .filter(Boolean);

  await Promise.all(files);
};

window.addEventListener('velo-fs', () => {
  loadFiles();
});
