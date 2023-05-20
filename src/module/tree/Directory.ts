export class Directory {
  #handler: FileSystemDirectoryHandle;
  #directories: Map<string, Directory> = new Map();

  constructor(handler: FileSystemDirectoryHandle) {
    this.#handler = handler;
  }

  async getDirectory(name: string): Promise<Directory> {
    if (this.#directories.has(name)) {
      return this.#directories.get(name) as Directory;
    }

    const handler = await this.#handler.getDirectoryHandle(name, {
      create: true,
    });

    const directory = new Directory(handler);
    this.#directories.set(name, directory);

    return directory;
  }

  async writeFile(name: string, content: string): Promise<void> {
    const file = await this.#handler.getFileHandle(name, {
      create: true,
    });

    const writable = await file.createWritable();

    await writable.write(content);
    await writable.close();
  }
}
