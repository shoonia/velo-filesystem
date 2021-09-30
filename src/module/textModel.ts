import type { editor } from 'monaco-editor';

type TModel = editor.ITextModel;

export const excludeInternalModels = (models: TModel[]): TModel[] => {
  return models.filter((i) => {
    const index = i?.uri?.path?.indexOf?.('@');

    return index === -1;
  });
};

export const getModels = (): TModel[] => {
  const models = window.monaco?.editor?.getModels?.();

  if (Array.isArray(models)) {
    return excludeInternalModels(models);
  }

  return [];
};
