import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import fse from 'fs-extra';

import { getManifest } from './src/assets/manifest.js';

const isProd = !process.env.ROLLUP_WATCH;
const extensions = [
  '.ts',
  '.tsx',
];

const plugins = [
  nodeResolve({
    extensions,
    browser: true,
  }),
  json({
    preferConst: true,
  }),
  babel({
    babelHelpers: 'bundled',
    extensions,
    presets: [
      '@babel/typescript',
      'jsx-dom-runtime/babel-preset',
    ],
    plugins: [
      [
        'const-enum',
        {
          transform: 'constObject',
        },
      ],
    ],
  }),
  isProd && terser(),
]
  .filter(Boolean);

await fse.emptyDir('./build');
await Promise.all([
  fse.copy('./static', './build'),
  fse.writeJSON('./build/manifest.json', getManifest(isProd)),
])

export default [
  {
    input: './src/popup/main.tsx',
    output: {
      file: './build/popup.js',
      format: 'es',
    },
    plugins: [
      css({
        output: 'popup.css',
      }),
      ...plugins,
    ],
  },
  {
    input: './src/content/index.ts',
    output: {
      file: './build/content.js',
      format: 'es',
    },
    plugins,
  },
  {
    input: './src/module/index.ts',
    output: {
      file: './build/module.js',
      format: 'iife',
    },
    plugins,
  },
];
