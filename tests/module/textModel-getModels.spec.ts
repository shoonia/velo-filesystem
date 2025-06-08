import { describe, it } from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

import { createModelsMock } from '../mocks.ts';
import { getModels } from '../../src/module/textModel.ts';

const includePaths = [
  '/backend/http-functions.js',
  '/backend/routers.js',
  '/backend/test.js',
  '/backend/test.jsw',
  '/backend/folder/test.jsw',
  '/backend/folder/test.js',
  '/backend/jobs.config',
  '/backend/test.json',
  '/backend/test.md',
  '/public/folder/util.js',
  '/public/pages/sof6z.js',
  '/public/util.js',
  '/styles/global.css',
];

const excludePaths = [
  '/backend/___config___/@velo/google-sso-integration-config.json',
  '/@npm/form-data/README.md',
  '/@velo/google-drive-integration/package.json',
];

describe('getModels', () => {
  it('should return only the user\'s visible models', () => {
    createModelsMock([
      ...includePaths,
      ...excludePaths,
    ]);

    const reslut = getModels().map((i) => i.uri.path);

    deepStrictEqual(reslut, includePaths);
  });
});
