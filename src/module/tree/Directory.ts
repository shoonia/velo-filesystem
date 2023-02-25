import { File } from './File';

export class Directory {
  #handler: FileSystemDirectoryHandle;
  #directories: Map<string, Directory> = new Map();
  #files: Map<string, File> = new Map();

  constructor(handler: FileSystemDirectoryHandle) {
    this.#handler = handler;
  }

  async #getFile(name: string): Promise<File> {
    if (this.#files.has(name)) {
      return this.#files.get(name) as File;
    }

    const handler = await this.#handler.getFileHandle(name, {
      create: true,
    });

    const file = new File(handler);
    this.#files.set(name, file);

    return file;
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

  async writeFile(name: string, content: string): Promise<File> {
    const file = await this.#getFile(name);

    await file.write(content);

    return file;
  }
}
