import { IBaseNode, IDirectoryNode, IFileNode, TreeNodeTypes } from './types';

export class BaseNode implements IBaseNode {
  readonly #nodeType;
  readonly #name;

  constructor() {
    this.#nodeType = TreeNodeTypes.base;
    this.#name = '';
  }

  public get nodeType(): TreeNodeTypes {
    return this.#nodeType;
  }

  public get name(): string {
    return this.#name;
  }

  public isFile(): this is IFileNode {
    return this.#nodeType === TreeNodeTypes.file;
  }

  public isDirectory(): this is IDirectoryNode {
    return this.#nodeType === TreeNodeTypes.dir;
  }
}
