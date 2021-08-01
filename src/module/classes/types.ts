import type TMonaco from 'monaco-editor';

export const enum TreeNodeTypes {
  base,
  dir,
  file,
}

export interface IBaseNode {
  readonly nodeType: TreeNodeTypes;
  readonly name: string;
}

export interface IFileNode extends IBaseNode {
  readonly parrent: IDirectoryNode;
  readonly monacoModel: TMonaco.editor.ITextModel;
  readonly fileHandle: FileSystemFileHandle;
}

export interface IDirectoryNode extends IBaseNode {
  readonly parrent: IDirectoryNode | null;
  readonly children: (IDirectoryNode | IFileNode)[];
}

export interface IFileNodeOptions {
  readonly name: string;
  readonly monacoModel: TMonaco.editor.ITextModel;
  readonly parrent: IDirectoryNode;
  readonly fileHandle: FileSystemFileHandle;
}

export interface IDirectoryNodeOptions {
  readonly name: string;
  readonly parrent: IDirectoryNode;
}
