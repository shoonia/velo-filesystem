import type { editor } from 'monaco-editor';
import type { IPage } from '../../src/types';

export const getModels = (): readonly editor.ITextModel[] => {
  const modules = window.monaco?.editor?.getModels() ?? [];

  return modules.filter((i) => i.uri.path.indexOf('@') === -1);
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
            title: i.title,
          })) ?? [];
        }
      }
    }
  } catch { /**/ }

  return [];
};

/**
 * Characters that are not allowed in a file name. The File System Access API
 * rejects a path component containing any of these, so a page title that has
 * one cannot be used verbatim.
 */
// eslint-disable-next-line no-control-regex -- these are the characters to strip
const UNSAFE_CHARS = /[<>:"/\\|?*\u0000-\u001F]/g;

/** Leading/trailing dots and whitespace are also rejected. */
const UNSAFE_EDGES = /^[\s.]+|[\s.]+$/g;

/** Reserved device names on Windows, which stay reserved with an extension. */
const RESERVED_NAME = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;

/**
 * Convert a page title into a usable file name. Returns an empty string when
 * nothing usable is left, so the caller can fall back to the page ID.
 */
export const toSafeFileName = (title: string): string => {
  const name = title
    .replaceAll(UNSAFE_CHARS, '-')
    .replaceAll(UNSAFE_EDGES, '');

  if (name === '') {
    return '';
  }

  return RESERVED_NAME.test(name.split('.')[0]) ? `_${name}` : name;
};

export const createPageMap = (includePageId: boolean, pages: readonly IPage[]) => {
  const map = pages.reduce<Map<string, string>>(
    (acc, i) => {
      const name = toSafeFileName(i.title);

      // Nothing usable in the title - leave it unmapped so the lookup below
      // falls back to the model's own `<pageId>.js` name.
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
    // Compare the names the files will actually get, not the raw titles:
    // two different titles can be sanitized down to the same file name.
    const name = toSafeFileName(page.title).toLowerCase();

    // An unusable title falls back to the page ID, which is always unique.
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
