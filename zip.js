import { createRequire } from 'node:module';
import { zipSync } from 'cross-zip';

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

zipSync('./build', `./${pkg.name}@${pkg.version}.zip`);
