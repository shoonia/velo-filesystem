import { File } from './File';

export class Directory {
  #handler: FileSystemDirectoryHandle;
  #directories: Map<string, Directory> = new Map();
  #files: Map<string, File> = new Map();

  constructor(handler: FileSystemDirectoryHandle) {
    this.#handler = handler;
  }

  /**
   * Returns exist child directory or create and return a new one
   */
  async getChildDirectory(name: string): Promise<Directory> {
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

  /**
   * Returns exist child file or create and returned a new one
   */
  async getChildFile(name: string): Promise<File> {
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

  /**
   * Writes content to child file
   * if child file does not exist creates a new one
   */
  async writeChildFile(name: string, content: string): Promise<File> {
    const file = await this.getChildFile(name);

    await file.write(content);

    return file;
  }
}
