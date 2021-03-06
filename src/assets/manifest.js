import {
  title,
  version,
  description,
  author,
  homepage,
  discussions,
} from '../../package.json';

export { version, discussions };

/**
 * @param {boolean} isProd
 * @returns {Readonly<chrome.runtime.ManifestV3>}
 */
export const getManifest = (isProd) => ({
  manifest_version: 3,
  name: isProd ? title : `DEV: ${title}`,
  version,
  description,
  author: author.name,
  homepage_url: homepage,
  icons: {
    '16': 'icons/velo.png',
    '48': 'icons/velo.png',
  },
  permissions: [
    'tabs',
  ],
  host_permissions: [
    'https://editor.wix.com/html/editor/web/*',
    'https://create.editorx.com/edit/*',
  ],
  action: {
    default_popup: 'popup.html',
    default_icon: 'icons/velo.png',
  },
  content_scripts: [
    {
      matches: [
        'https://editor.wix.com/html/editor/web/*',
        'https://create.editorx.com/edit/*',
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

export const getMetaFileValue = () => {
  return JSON.stringify({ version }, null, 2);
};
