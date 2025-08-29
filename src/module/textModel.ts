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
  const map = pages.reduce<Map<string, string>>(
    (acc, i) =>
      acc.set(
        `${i.pageId}.js`,
        includePageId
          ? `${i.title}.${i.pageId}.js`
          : `${i.title}.js`,
      ),
    new Map(),
  );

  return (path: string): string => {
    const name = path.split('/').at(-1) ?? '';

    return map.get(name) ?? name;
  };
};

export const isMasterPage = (path: string): boolean => {
  return path === '/public/pages/masterPage.js';
};

export const isPages = (path: string): boolean => {
  return path.startsWith('/public/pages/');
};

export const findDuplicate = (pages: readonly IPage[]): IPage | undefined => {
  const seen = new Set<string>();

  return pages.find((page) => {
    const title = page.title.toLowerCase();

    if (seen.has(title)) {
      return true;
    }

    seen.add(title);

    return false;
  });
};
