import type { editor } from 'monaco-editor';

interface IExcludeInternalModels {
  (models: editor.ITextModel[]): editor.ITextModel[]
}

interface IGetModels {
  (): editor.ITextModel[];
}

interface IPageMap {
  (): (path: string) => string;
}

export const excludeInternalModels: IExcludeInternalModels = (models) => {
  return models.filter((models) => {
    const index = models.uri.path.indexOf?.('@');

    return index === -1;
  });
};

export const getModels: IGetModels = () => {
  const models = window.monaco?.editor?.getModels?.();

  if (Array.isArray(models)) {
    return excludeInternalModels(models);
  }

  return [];
};

export const createPageMap: IPageMap = () => {
  const map = new Map<string, string>();

  window.siteHeader?.pageIdList.pages.forEach((i) => {
    map.set(`${i.pageId}.js`, `${i.title}.${i.pageId}.js`);
  });

  return (path: string): string => {
    const name = path.split('/').pop() ?? '';

    return map.get(name) ?? name;
  };
};
