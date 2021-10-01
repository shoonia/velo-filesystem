import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import { emptyDirSync, copySync, writeJSONSync } from 'fs-extra';

import { manifest } from './src/manifest';

const isProd = !process.env.ROLLUP_WATCH;
const isDev = !isProd;
const nodeEnv = isProd ? 'production' : 'development';

process.env.NODE_ENV = nodeEnv;

const extensions = [
  '.js',
  '.ts',
];

const babelConfig = {
  presets: [
    '@babel/typescript',
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

const bablePlugin = babel({
  babelHelpers: 'bundled',
  extensions,
  ...babelConfig,
});

const plugins = [
  nodeResolve({
    extensions,
  }),
  json({
    preferConst: true,
  }),
  commonjs(),
  bablePlugin,
  isProd && terser(),
]
  .filter(Boolean);

emptyDirSync('./build');
copySync('./static', './build');
writeJSONSync('./build/manifest.json', manifest);

export default [
  {
    input: './src/popup/main.ts',
    output: {
      file: './build/popup.js',
      format: 'es',
    },
    plugins: [
      nodeResolve({
        extensions,
        browser: true,
        dedupe: [
          'svelte',
        ],
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      }),
      svelte({
        compilerOptions: {
          dev: isDev,
          sourcemap: isDev,
          cssHash: ({ css, hash }) => `s-${hash(css)}`,
        },
        preprocess: sveltePreprocess({
          sourceMap: isDev,
          babel: babelConfig,
        }),
      }),
      css({
        output: 'popup.css',
      }),
      bablePlugin,
      isProd && terser(),
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
      format: 'es',
    },
    plugins,
    watch: {
      clearScreen: false,
    },
  },
];
