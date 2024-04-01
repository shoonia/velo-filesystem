import type { editor } from 'monaco-editor';

export const createModelsMock = (paths: string[]) => {
  globalThis.window = {
    monaco: {
      // @ts-expect-error @typescript-eslint/ban-ts-comment
      editor: {
        getModels() {
          return paths.map(
            (path) => ({
              uri: { path },
            }) as editor.ITextModel,
          );
        },
      },
    },
  };
};
