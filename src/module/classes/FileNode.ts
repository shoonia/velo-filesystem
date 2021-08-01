import { BaseNode } from './BaseNode';
import { IFileNode, IFileNodeOptions, TreeNodeTypes } from './types';

export class FileNode extends BaseNode implements IFileNode {
  readonly #nodeType;
  readonly #name;
  readonly monacoModel;
  readonly parrent;
  readonly fileHandle;

  constructor(options: IFileNodeOptions) {
    super();
    this.#nodeType = TreeNodeTypes.file;
    this.#name = options.name;
    this.monacoModel = options.monacoModel;
    this.parrent = options.parrent;
    this.fileHandle = options.fileHandle;
  }
}
