import type { editor } from 'monaco-editor';
import type { IPage } from 'src/types';

type IGetModels = () => editor.ITextModel[];
type IPageMap = () => (path: string) => string;

interface IFileMatch {
  isMasterPage(path: string): boolean;
  isPages(path: string): boolean;
  isPublicOrBackend(path: string): boolean;
}

const allModels: IGetModels = () => {
  return window.monaco?.editor?.getModels() ?? [];
};

export const getModels: IGetModels = () => {
  return allModels().filter(
    (model) => model.uri.path.indexOf('@') === -1,
  );
};

export const getJsModels: IGetModels = () => {
  return allModels().filter((model) => {
    const { path } = model.uri;

    return path.indexOf('@') === -1 && /\.js(w)?$/i.test(path);
  });
};

export const getPages = (): IPage[] => {
  if (Array.isArray(window.editorModel?.siteHeader?.pageIdList?.pages)) {
    return window.editorModel?.siteHeader?.pageIdList?.pages ?? [];
  }

  if (Array.isArray(window?.siteHeader?.pageIdList?.pages)) {
    return window?.siteHeader?.pageIdList?.pages ?? [];
  }

  return [];
};

export const createPageMap: IPageMap = () => {
  const map = new Map<string, string>();
  const pages = getPages();

  pages.forEach((i) => {
    map.set(`${i.pageId}.js`, `${i.title}.${i.pageId}.js`);
  });

  return (path: string): string => {
    const name = path.split('/').pop() ?? '';

    return map.get(name) ?? name;
  };
};

export const fileMatch: IFileMatch = {
  isMasterPage(path): boolean {
    return path === '/public/pages/masterPage.js';
  },

  isPages(path): boolean {
    return path.startsWith('/public/pages/');
  },

  isPublicOrBackend(path): boolean {
    return path.startsWith('/backend/') || path.startsWith('/public/');
  },
};
