import { createRequire } from 'module';
import { zip } from 'cross-zip';

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

await zip('./build', `./${pkg.name}@${pkg.version}.zip`);
