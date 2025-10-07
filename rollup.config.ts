import { existsSync } from 'node:fs';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import type { InputPluginOption, RollupOptions, Plugin } from 'rollup';

import { getManifest } from './src/assets/manifest.ts';

const isProd = !process.env.ROLLUP_WATCH;
const extensions = [
  '.ts',
  '.tsx',
];

const plugins: InputPluginOption = [
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
    compress: {
      ecma: 2020,
      module: true,
      comparisons: false,
      inline: 2,
      drop_console: true,
      passes: 3,
      toplevel: true,
      unsafe: true,
      pure_getters: true,
      unsafe_arrows: true,
    },
  }),
]
  .filter(Boolean);

const emptyDir = async (path: string) => {
  if (existsSync(path)) await rm(path, { recursive: true });
  await mkdir(path);
};

await emptyDir('./build');
await Promise.all([
  cp('./static', './build', { recursive: true }),
  writeFile('./build/manifest.json', getManifest(isProd)),
]);

const config: RollupOptions[] = [
  {
    input: './src/popup/main.tsx',
    output: {
      file: './build/popup.js',
      format: 'es',
    },
    plugins: [
      css({
        output: 'popup.css',
      }) as Plugin,
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

export default config;
