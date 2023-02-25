import type { editor } from 'monaco-editor';
import type { IPage } from '../../src/types';

type IGetModels = () => editor.ITextModel[];
type IPageMap = (includePageId: boolean) => (path: string) => string;

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

export const isMasterPage = (path: string): boolean => {
  return path === '/public/pages/masterPage.js';
};

export const isPages = (path: string): boolean => {
  return path.startsWith('/public/pages/');
};

export const isPublicOrBackend = (path: string): boolean => {
  return path.startsWith('/backend/') || path.startsWith('/public/');
};
