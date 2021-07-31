import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { emptyDirSync, copySync, writeJSONSync } from 'fs-extra';

import pkg from './package.json';

const isProd = !process.env.ROLLUP_WATCH;
const isDev = !isProd;

process.env.NODE_ENV = isProd ? 'production' : 'development';

emptyDirSync('./build');
copySync('./static', './build');
writeJSONSync('./build/manifest.json', {
  manifest_version: 3,
  name: pkg.title,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  homepage_url: pkg.homepage,
  icons: {
    '16': 'icons/velo.png',
    '48': 'icons/velo.png',
  },
  permissions: [
    'tabs',
  ],
  host_permissions: [
    'https://editor.wix.com/html/editor/web/*',
    'https://create.editorx.com/html/editor/web/',
  ],
  action: {
    default_popup: 'popup.html',
    default_icon: 'icons/velo.png',
  },
  content_scripts: [
    {
      matches: [
        'https://editor.wix.com/html/editor/web/*',
        'https://create.editorx.com/html/editor/web/',
      ],
      js: [
        'content.js',
      ],
      run_at: 'document_idle',
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'module.js',
      ],
      matches: [
        'https://editor.wix.com/*',
        'https://create.editorx.com/*',
      ],
    },
  ],
});

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
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      svelte({
        compilerOptions: {
          dev: isDev,
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
    plugins: [
      nodeResolve({
        extensions,
      }),
      commonjs(),
      bablePlugin,
      isProd && terser(),
    ],
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
    plugins: [
      nodeResolve({
        extensions,
      }),
      commonjs(),
      bablePlugin,
      isProd && terser(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
