import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert/strict';

import { createPageMap } from '../../src/module/textModel.ts';
import type { IPage } from '../../src/types.ts';

const pages: IPage[] = [
  { id: 'sof6z', title: 'Home' },
  { id: 'ay6yh', title: 'edit: office' },
  { id: 'kt3n1', title: '' },
];

describe('createPageMap', () => {
  it('should name a page by its title and ID', () => {
    const getPageName = createPageMap(true, pages);

    strictEqual(getPageName('/public/pages/sof6z.js'), 'Home.sof6z.js');
  });

  it('should name a page by its title alone', () => {
    const getPageName = createPageMap(false, pages);

    strictEqual(getPageName('/public/pages/sof6z.js'), 'Home.js');
  });

  it('should sanitize a title that cannot be used in a file name', () => {
    strictEqual(
      createPageMap(true, pages)('/public/pages/ay6yh.js'),
      'edit- office.ay6yh.js',
    );

    strictEqual(
      createPageMap(false, pages)('/public/pages/ay6yh.js'),
      'edit- office.js',
    );
  });

  it('should fall back to the page ID when the title is unusable', () => {
    strictEqual(createPageMap(true, pages)('/public/pages/kt3n1.js'), 'kt3n1.js');
    strictEqual(createPageMap(false, pages)('/public/pages/kt3n1.js'), 'kt3n1.js');
  });

  it('should fall back to the page ID for a page that is not listed', () => {
    const getPageName = createPageMap(true, pages);

    strictEqual(getPageName('/public/pages/f9pbg.js'), 'f9pbg.js');
  });
});
