import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert/strict';

import { toSafeFileName } from '../../src/module/textModel.ts';

describe('toSafeFileName', () => {
  it('should keep an ordinary title unchanged', () => {
    strictEqual(toSafeFileName('Club Honours'), 'Club Honours');
  });

  it('should not touch characters that are legal in a file name', () => {
    strictEqual(toSafeFileName('edit - office (v2) [old] #1 & 2!'), 'edit - office (v2) [old] #1 & 2!');
  });

  it('should replace a colon', () => {
    strictEqual(toSafeFileName('edit: office'), 'edit- office');
  });

  it('should replace every reserved character', () => {
    strictEqual(toSafeFileName('a<b>c:d"e/f\\g|h?i*j'), 'a-b-c-d-e-f-g-h-i-j');
  });

  it('should replace control characters', () => {
    const NUL = String.fromCharCode(0);
    const UNIT_SEP = String.fromCharCode(31);

    strictEqual(toSafeFileName(`a${NUL}b${UNIT_SEP}c`), 'a-b-c');
  });

  it('should trim leading and trailing dots and whitespace', () => {
    strictEqual(toSafeFileName('  Home  '), 'Home');
    strictEqual(toSafeFileName('..Home..'), 'Home');
    strictEqual(toSafeFileName(' .Home. '), 'Home');
  });

  it('should keep dots inside the title', () => {
    strictEqual(toSafeFileName('v1.2 notes'), 'v1.2 notes');
  });

  it('should return an empty string when nothing usable is left', () => {
    strictEqual(toSafeFileName(''), '');
    strictEqual(toSafeFileName('   '), '');
    strictEqual(toSafeFileName('...'), '');
  });

  it('should escape reserved device names on Windows', () => {
    strictEqual(toSafeFileName('CON'), '_CON');
    strictEqual(toSafeFileName('nul'), '_nul');
    strictEqual(toSafeFileName('COM1'), '_COM1');
    strictEqual(toSafeFileName('lpt9'), '_lpt9');
  });

  it('should escape a reserved device name that has an extension', () => {
    strictEqual(toSafeFileName('aux.backup'), '_aux.backup');
  });

  it('should not escape a name that merely starts with a reserved word', () => {
    strictEqual(toSafeFileName('Contact'), 'Contact');
    strictEqual(toSafeFileName('COM10'), 'COM10');
  });
});
