import pkg from '../../package.json' with { type: 'json' };

const urls = [
  // Wix Studio
  'https://editor.wix.com/studio/*',
  // Wix Editor
  'https://editor.wix.com/html/editor/web/*',
  // Wix Blocks
  'https://blocks.wix.com/edit/blocks/*',
];

const matches = [
  'https://editor.wix.com/*',
  'https://blocks.wix.com/*',
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
    author: {
      email: pkg.author.email,
    },
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
        matches,
      },
    ],
  }),
);
