/// <reference types="node" />
import pkg from '../../package.json' assert { type: 'json' };

const urls = [
  'https://editor.wix.com/studio/*',
  'https://editor.wix.com/html/editor/web/*',
  'https://create.editorx.com/edit/*',
];

/**
 * @param {boolean} isProd
 * @returns {string}
 */
export const getManifest = (isProd) => JSON.stringify(
  /**@type {chrome.runtime.ManifestV3} */
  ({
    manifest_version: 3,
    name: isProd ? pkg.title : `DEV: ${pkg.title}`,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author.name,
    homepage_url: pkg.homepage,
    icons: {
      '16': 'icons/velo.png',
      '48': 'icons/velo.png',
    },
    host_permissions: urls,
    action: {
      default_popup: 'popup.html',
      default_icon: 'icons/velo.png',
    },
    content_scripts: [
      {
        matches: urls,
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
  })
);
