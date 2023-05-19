import type { editor } from 'monaco-editor';
import type { IPage } from '../../src/types';

export const getModels = (): readonly editor.ITextModel[] => {
  const modules = window.monaco?.editor?.getModels() ?? [];

  return modules.filter((i) => i.uri.path.indexOf('@') === -1);
};

export const getPages = (): readonly IPage[] => {
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

export const createPageMap = (includePageId: boolean, pages: readonly IPage[]) => {
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
  return ['/backend/', '/public/', '/styles/'].some((i) => path.startsWith(i));
};

export const findDuplicate = (pages: readonly IPage[]): IPage | undefined => {
  return pages.find((page, index) => {
    const title = page.title.toLowerCase();

    for (let i = index + 1; i < pages.length; i++) {
      if (pages[i].title.toLowerCase() === title) {
        return true;
      }
    }

    return false;
  });
};
