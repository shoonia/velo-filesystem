import { createModelsMock } from '../mocks';
import { getJsModels } from '../../src/module/textModel';

const includePaths = [
  '/backend/http-functions.js',
  '/backend/routers.js',
  '/backend/test.js',
  '/backend/test.jsw',
  '/backend/folder/test.jsw',
  '/backend/folder/test.jsW',
  '/backend/folder/test.js',
  '/public/folder/util.js',
  '/public/pages/sof6z.js',
  '/public/util.js',
  '/public/util.JS',
];

const excludePaths = [
  '/backend/jobs.config',
  '/backend/test.json',
  '/backend/test.md',
  '/public/test.md',
  '/backend/___config___/@velo/google-sso-integration-config.json',
  '/@npm/form-data/README.md',
  '/@velo/google-drive-integration/package.json',
];

describe('getJsModels', () => {
  it('should return only JS models', () => {
    const dropMock = createModelsMock([
      ...includePaths,
      ...excludePaths,
    ]);

    const reslut = getJsModels().map((i) => i.uri.path);

    dropMock();
    expect(reslut).toEqual(includePaths);
  });
});
