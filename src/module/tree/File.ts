interface IFileOptions {
  handler: FileSystemFileHandle;
}

export class File {
  #handler: FileSystemFileHandle;

  constructor({
    handler,
  }: IFileOptions) {
    this.#handler = handler;
  }

  async write(content: string): Promise<void> {
    const writable = await this.#handler.createWritable();

    await writable.write(content);
    await writable.close();
  }
}
