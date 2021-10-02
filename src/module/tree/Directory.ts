import { File } from './File';

interface IDirectoryOptions {
  handler: FileSystemDirectoryHandle;
}

export class Directory {
  #handler: FileSystemDirectoryHandle;
  #directories: Map<string, Directory> = new Map();
  #files: Map<string, File> = new Map();

  constructor({
    handler,
  }: IDirectoryOptions) {
    this.#handler = handler;
  }

  async appendDirectory(name: string): Promise<Directory> {
    const handler = await this.#handler.getDirectoryHandle(name, {
      create: true,
    });

    const directory = new Directory({
      handler,
    });

    this.#directories.set(name, directory);

    return directory;
  }

  async appendFile(name: string): Promise<File> {
    const handler = await this.#handler.getFileHandle(name, {
      create: true,
    });

    const file = new File({
      handler,
    });

    this.#files.set(name, file);

    return file;
  }

  async getChildDirectory(name: string): Promise<Directory> {
    if (this.#directories.has(name)) {
      return this.#directories.get(name) as Directory;
    }

    return this.appendDirectory(name);
  }

  async getChildFile(name: string): Promise<File> {
    if (this.#files.has(name)) {
      return this.#files.get(name) as File;
    }

    return this.appendFile(name);
  }

  async writeChildFile(name: string, content: string): Promise<File> {
    const file = await this.getChildFile(name);
    await file.write(content);

    return file;
  }
}
