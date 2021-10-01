/// <reference types="jest"/>
import type { editor } from 'monaco-editor';

import { excludeInternalModels } from '../../src/module/textModel';

const includePaths = [
  '/backend/http-functions.js',
  '/backend/routers.js',
  '/backend/test.js',
  '/backend/test.jsw',
  '/backend/folder/test.jsw',
  '/backend/folder/test.js',
  '/backend/jobs.config',
  '/public/folder/util.js',
  '/public/pages/sof6z.js',
  '/public/util.js',
];

const excludePaths = [
  '/backend/___config___/@velo/google-sso-integration-config.json',
  '/@npm/form-data/README.md',
  '/@velo/google-drive-integration/package.json',
];

const createModelMock = (): editor.ITextModel[] => [
  ...includePaths,
  ...excludePaths,
].map((path) => {
  return { uri: { path } } as editor.ITextModel;
});

describe('excludeInternalModels', () => {
  it('should remove all internal files', () => {
    const models = createModelMock();
    const filteredModules = excludeInternalModels(models);
    const result = filteredModules.map((i) => i.uri.path);

    expect(result).toEqual(includePaths);
  });
});
