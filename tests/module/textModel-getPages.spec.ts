import { afterEach, describe, it } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { getPages } from '../../src/module/textModel.ts';

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
const adapter = { name: 'wix-code editor adapter' };

const mockApp = (app: unknown) => {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value: { wixCodeRepluggableAppDebug: app },
  });
};

describe('getPages', () => {
  afterEach(() => {
    if (originalWindow) {
      Object.defineProperty(globalThis, 'window', originalWindow);
    } else {
      Reflect.deleteProperty(globalThis, 'window');
    }
  });

  it('should select the editor adapter and sanitize titles without changing source pages', () => {
    const pages = Object.freeze([
      Object.freeze({ id: 'home', title: 'Home', extra: 'ignored' }),
      Object.freeze({ id: 'office', title: 'edit: office' }),
      Object.freeze({ id: 'reserved', title: 'CON' }),
      Object.freeze({ id: 'empty', title: '...' }),
    ]);
    let calls = 0;

    mockApp({
      readyAPIs: new Set([null, { name: 'another adapter' }, adapter]),
      host: {
        getAPI(key: unknown) {
          strictEqual(key, adapter);
          calls++;
          return { editorAPI: { pages: { getPagesData: () => pages } } };
        },
      },
    });

    deepStrictEqual(getPages(), [
      { id: 'home', title: 'Home' },
      { id: 'office', title: 'edit- office' },
      { id: 'reserved', title: '_CON' },
      { id: 'empty', title: '' },
    ]);
    strictEqual(calls, 1);
    strictEqual(pages[1].title, 'edit: office');
  });

  for (const [name, app] of [
    ['missing debug app', undefined],
    ['missing ready APIs', {}],
    ['ready APIs that are not a Set', { readyAPIs: [adapter] }],
    ['missing editor adapter', { readyAPIs: new Set([{ name: 'another adapter' }]) }],
    ['missing host', { readyAPIs: new Set([adapter]) }],
    ['missing getAPI', { readyAPIs: new Set([adapter]), host: {} }],
  ] as const) {
    it(`should return an empty array for ${name}`, () => {
      mockApp(app);
      deepStrictEqual(getPages(), []);
    });
  }

  for (const [name, api] of [
    ['missing API', undefined],
    ['missing editor API', {}],
    ['missing pages API', { editorAPI: {} }],
    ['missing getPagesData', { editorAPI: { pages: {} } }],
    ['missing page data', { editorAPI: { pages: { getPagesData: () => undefined } } }],
    ['empty page data', { editorAPI: { pages: { getPagesData: () => [] } } }],
  ] as const) {
    it(`should return an empty array for ${name}`, () => {
      mockApp({
        readyAPIs: new Set([adapter]),
        host: { getAPI: () => api },
      });
      deepStrictEqual(getPages(), []);
    });
  }

  for (const stage of ['getAPI', 'getPagesData']) {
    it(`should return an empty array when ${stage} throws`, () => {
      const fail = () => { throw new Error('API unavailable'); };
      mockApp({
        readyAPIs: new Set([adapter]),
        host: {
          getAPI: stage === 'getAPI'
            ? fail
            : () => ({ editorAPI: { pages: { getPagesData: fail } } }),
        },
      });
      deepStrictEqual(getPages(), []);
    });
  }
});
