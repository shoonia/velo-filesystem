import type { editor } from 'monaco-editor';

interface IGetModels {
  (): editor.ITextModel[];
}

interface IPageMap {
  (): (path: string) => string;
}

export const getModels: IGetModels = () => {
  const models = window.monaco?.editor.getModels() ?? [];

  return models.filter(
    (model) => model.uri.path.indexOf('@') === -1,
  );
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
