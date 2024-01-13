import { existsSync } from 'node:fs';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

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
      [
        '@babel/preset-typescript',
        {
          optimizeConstEnums: true,
        },
      ],
      'jsx-dom-runtime/babel-preset',
    ],
  }),
  isProd && terser({
    ecma: 2020,
    module: true,
    toplevel: true,
    parse: {
      ecma: 2020,
    },
    compress: {
      ecma: 2020,
      module: true,
      comparisons: false,
      inline: 2,
      drop_console: true,
      passes: 3,
      toplevel: true,
      pure_getters: true,
    },
    output: {
      ecma: 2020,
      comments: false,
    },
  }),
]
  .filter(Boolean);

const emptyDir = async (path) => {
  if (existsSync(path)) await rm(path, { recursive: true });
  await mkdir(path);
};

await emptyDir('./build');
await Promise.all([
  cp('./static', './build', { recursive: true }),
  writeFile('./build/manifest.json', getManifest(isProd)),
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
