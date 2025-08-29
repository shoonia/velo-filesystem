import { test } from 'node:test';
import { strictEqual } from 'node:assert/strict';

import { findDuplicate } from '../../src/module/textModel.ts';
import type { IPage } from '../../src/types.ts';

test('findDuplicate returns undefined for empty array', () => {
  strictEqual(findDuplicate([]), undefined);
});

test('findDuplicate returns undefined for array with unique titles', () => {
  const pages: IPage[] = [
    { pageId: '1', title: 'Home', pageJsonFileName: 'home.js' },
    { pageId: '2', title: 'About', pageJsonFileName: 'about.js' },
    { pageId: '3', title: 'Contact', pageJsonFileName: 'contact.js' },
  ];
  strictEqual(findDuplicate(pages), undefined);
});

test('findDuplicate returns the first duplicate page (case-insensitive)', () => {
  const pages: IPage[] = [
    { pageId: '1', title: 'Home', pageJsonFileName: 'home.js' },
    { pageId: '2', title: 'About', pageJsonFileName: 'about.js' },
    { pageId: '3', title: 'home', pageJsonFileName: 'home2.js' },
    { pageId: '4', title: 'Contact', pageJsonFileName: 'contact.js' },
  ];
  strictEqual(findDuplicate(pages), pages[2]);
});

test('findDuplicate returns the first duplicate even if there are multiple duplicates', () => {
  const pages: IPage[] = [
    { pageId: '1', title: 'Home', pageJsonFileName: 'home.js' },
    { pageId: '2', title: 'About', pageJsonFileName: 'about.js' },
    { pageId: '3', title: 'home', pageJsonFileName: 'home2.js' },
    { pageId: '4', title: 'about', pageJsonFileName: 'about2.js' },
  ];
  strictEqual(findDuplicate(pages), pages[2]);
});

test('findDuplicate returns the duplicate if it is not the first element', () => {
  const pages: IPage[] = [
    { pageId: '1', title: 'Home', pageJsonFileName: 'home.js' },
    { pageId: '2', title: 'About', pageJsonFileName: 'about.js' },
    { pageId: '3', title: 'Contact', pageJsonFileName: 'contact.js' },
    { pageId: '4', title: 'About', pageJsonFileName: 'about2.js' },
  ];
  strictEqual(findDuplicate(pages), pages[3]);
});
