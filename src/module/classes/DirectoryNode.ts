import { BaseNode } from './BaseNode';
import { IFileNode, IDirectoryNode, TreeNodeTypes, IDirectoryNodeOptions } from './types';

export class DirectoryNode extends BaseNode implements IDirectoryNode {
  readonly #nodeType;
  readonly #name;
  readonly parrent;
  readonly children: (IDirectoryNode | IFileNode)[];

  constructor(options: IDirectoryNodeOptions) {
    super();
    this.#nodeType = TreeNodeTypes.dir;
    this.#name = options.name;
    this.parrent = options.parrent;
    this.children = [];
  }
}
