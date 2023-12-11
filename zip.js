import { zipSync } from 'cross-zip';
import pkg from './package.json' with { type: 'json' };

zipSync('./build', `./${pkg.name}@${pkg.version}.zip`);
