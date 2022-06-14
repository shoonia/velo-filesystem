export class File {
  #handler: FileSystemFileHandle;

  constructor(handler: FileSystemFileHandle) {
    this.#handler = handler;
  }

  /**
   * Write the contents of the file
   */
  async write(content: string): Promise<void> {
    const writable = await this.#handler.createWritable();

    await writable.write(content);
    await writable.close();
  }
}
