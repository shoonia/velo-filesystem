/// <reference types="jest"/>
import type { editor } from 'monaco-editor';

interface IMockModels {
  (paths: string[]): () => void
}

export const createModelsMock: IMockModels = (paths) => {
  Object.assign(window, {
    monaco: {
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
  });

  return () => {
    delete window.monaco;
  };
};
