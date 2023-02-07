import { createRequire } from 'node:module';
import { zipSync } from 'cross-zip';

const pkg = createRequire(import.meta.url)('./package.json');

zipSync('./build', `./${pkg.name}@${pkg.version}.zip`);
