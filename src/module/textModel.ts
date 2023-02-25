import type { editor } from 'monaco-editor';
import type { IPage } from '../../src/types';

type IGetModels = () => editor.ITextModel[];
type IPageMap = (includePageId: boolean) => (path: string) => string;

interface IFileMatch {
  isMasterPage(path: string): boolean;
  isPages(path: string): boolean;
  isPublicOrBackend(path: string): boolean;
}

export const getModels: IGetModels = () => {
  const modules = window.monaco?.editor?.getModels() ?? [];

  return modules.filter((i) => i.uri.path.indexOf('@') === -1);
};

export const getPages = (): IPage[] => {
  const pages = window.editorModel?.siteHeader?.pageIdList?.pages;

  if (Array.isArray(pages)) {
    return pages;
  }

  const pages2 = window.siteHeader?.pageIdList?.pages;

  if (Array.isArray(pages2)) {
    return pages2;
  }

  return [];
};

export const createPageMap: IPageMap = (includePageId) => {
  const pages = getPages();

  const map = new Map<string, string>(
    pages.map((i) => [
      `${i.pageId}.js`,
      includePageId ? `${i.title}.${i.pageId}.js` : `${i.title}.js`,
    ]),
  );

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
