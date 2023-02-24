import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import fse from 'fs-extra';

import { getManifest } from './src/assets/manifest.js';

const isProd = !process.env.ROLLUP_WATCH;
const nodeEnv = isProd ? 'production' : 'development';

process.env.NODE_ENV = nodeEnv;

const extensions = [
  '.js',
  '.ts',
  '.tsx',
];

const babelConfig = {
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
};

const plugins = [
  nodeResolve({
    extensions,
    browser: true,
    dedupe: [
      'svelte',
    ],
  }),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(nodeEnv),
  }),
  json({
    preferConst: true,
  }),
  babel({
    babelHelpers: 'bundled',
    extensions,
    ...babelConfig,
  }),
  commonjs(),
  isProd && terser(),
]
  .filter(Boolean);

fse.emptyDirSync('./build');
fse.copySync('./static', './build');
fse.writeJSONSync('./build/manifest.json', getManifest(isProd));

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
    watch: {
      clearScreen: false,
    },
  },
  {
    input: './src/content/index.ts',
    output: {
      file: './build/content.js',
      format: 'es',
    },
    plugins,
    watch: {
      clearScreen: false,
    },
  },
  {
    input: './src/module/index.ts',
    output: {
      file: './build/module.js',
      format: 'iife',
    },
    plugins,
    watch: {
      clearScreen: false,
    },
  },
];
