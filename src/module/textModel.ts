import type { editor } from 'monaco-editor';
import type { IPage } from '../../src/types';

export const getModels = (): readonly editor.ITextModel[] => {
  const modules = window.monaco?.editor?.getModels() ?? [];

  return modules.filter((i) => i.uri.path.indexOf('@') === -1);
};

// eslint-disable-next-line no-control-regex -- these are the characters to strip
const UNSAFE_CHARS = /[<>:"/\\|?*\u0000-\u001F]/g;
/** Leading/trailing dots and whitespace are also rejected. */
const UNSAFE_EDGES = /^[\s.]+|[\s.]+$/g;
/** Reserved device names on Windows, which stay reserved with an extension. */
const RESERVED_NAME = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;

export const toSafeFileName = (title: string): string => {
  const name = title
    .replaceAll(UNSAFE_CHARS, '-')
    .replaceAll(UNSAFE_EDGES, '');

  if (name === '') {
    return '';
  }

  return RESERVED_NAME.test(name.split('.')[0]) ? `_${name}` : name;
};

export const getPages = (): IPage[] => {
  try {
    const relpuggable = window.wixCodeRepluggableAppDebug;
    const apis = relpuggable?.readyAPIs;

    if (apis instanceof Set) {
      for (const key of apis) {
        if (key?.name === 'wix-code editor adapter') {
          return relpuggable.host?.getAPI?.(key)?.editorAPI?.pages?.getPagesData?.()?.map?.((i: IPage) => ({
            id: i.id,
            title: toSafeFileName(i.title),
          })) ?? [];
        }
      }
    }
  } catch { /**/ }

  return [];
};

export const createPageMap = (includePageId: boolean, pages: readonly IPage[]) => {
  const map = pages.reduce<Map<string, string>>(
    (acc, i) => {
      const name = i.title;

      if (name === '') {
        return acc;
      }

      return acc.set(
        `${i.id}.js`,
        includePageId
          ? `${name}.${i.id}.js`
          : `${name}.js`,
      );
    },
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
    const name = page.title.toLowerCase();

    if (name === '') {
      return false;
    }

    if (seen.has(name)) {
      return true;
    }

    seen.add(name);

    return false;
  });
};
