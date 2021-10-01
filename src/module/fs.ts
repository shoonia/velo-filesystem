interface IGetRootDir {
  (): Promise<[DOMException | null, FileSystemDirectoryHandle | null]>;
}

interface ICreateVeloRc {
  (handler: FileSystemDirectoryHandle,
    content: Record<string, string>): Promise<FileSystemFileHandle>;
}

export const getRootDir: IGetRootDir = async () => {
  try {
    const rootDir = await window.showDirectoryPicker();

    return [null, rootDir];
  } catch (error) {
    if (error instanceof DOMException) {
      return [error, null];
    }

    throw error;
  }
};

export const createVeloRc: ICreateVeloRc = async (handler, content) => {
  const veloRc = await handler.getFileHandle('velofilesystemrc', {
    create: true,
  });

  const writable = await veloRc.createWritable();

  await writable.write(JSON.stringify(content, null, 2));
  await writable.close();

  return veloRc;
};
