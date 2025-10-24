export class Directory {
  readonly #handler: FileSystemDirectoryHandle;
  readonly #directories: Map<string, Directory> = new Map();

  constructor(handler: FileSystemDirectoryHandle) {
    this.#handler = handler;
  }

  async getDirectory(name: string): Promise<Directory> {
    if (this.#directories.has(name)) {
      return this.#directories.get(name)!;
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

    /**
     * Normalize line endings to LF to avoid CRLF vs LF diffs when files
     * are downloaded on Windows (CRLF) but committed/used on Unix (LF).
     * Convert CRLF -> LF
     */
    const normalized = content.replaceAll(/\r\n/g, '\n');

    await writable.write(normalized);
    await writable.close();
  }
}
