import type { editor, languages } from 'monaco-editor';

interface IGetModels {
  (): editor.ITextModel[];
}

interface IGetJsWorker {
  (): ReturnType<typeof languages.typescript.getJavaScriptWorker> | undefined
}

interface IPageMap {
  (): (path: string) => string;
}

const allModels: IGetModels = () => {
  return window.monaco?.editor.getModels() ?? [];
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

export const getJsWorker: IGetJsWorker = () => {
  return window.monaco?.languages.typescript.getJavaScriptWorker();
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
