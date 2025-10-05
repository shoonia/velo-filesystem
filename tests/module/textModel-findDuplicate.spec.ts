import { test } from 'node:test';
import { strictEqual } from 'node:assert/strict';

import { findDuplicate } from '../../src/module/textModel.ts';
import type { IPage } from '../../src/types.ts';

test('findDuplicate returns undefined for empty array', () => {
  strictEqual(findDuplicate([]), undefined);
});

test('findDuplicate returns undefined for array with unique titles', () => {
  const pages: IPage[] = [
    { id: '1', title: 'Home' },
    { id: '2', title: 'About' },
    { id: '3', title: 'Contact' },
  ];
  strictEqual(findDuplicate(pages), undefined);
});

test('findDuplicate returns the first duplicate page (case-insensitive)', () => {
  const pages: IPage[] = [
    { id: '1', title: 'Home' },
    { id: '2', title: 'About' },
    { id: '3', title: 'home' },
    { id: '4', title: 'Contact' },
  ];
  strictEqual(findDuplicate(pages), pages[2]);
});

test('findDuplicate returns the first duplicate even if there are multiple duplicates', () => {
  const pages: IPage[] = [
    { id: '1', title: 'Home' },
    { id: '2', title: 'About' },
    { id: '3', title: 'home' },
    { id: '4', title: 'about' },
  ];
  strictEqual(findDuplicate(pages), pages[2]);
});

test('findDuplicate returns the duplicate if it is not the first element', () => {
  const pages: IPage[] = [
    { id: '1', title: 'Home' },
    { id: '2', title: 'About' },
    { id: '3', title: 'Contact' },
    { id: '4', title: 'About' },
  ];
  strictEqual(findDuplicate(pages), pages[3]);
});
