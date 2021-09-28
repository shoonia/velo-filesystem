import pkg from '../package.json';

/** @type {Readonly<chrome.runtime.ManifestV3>} */
export const manifest = {
  manifest_version: 3,
  name: pkg.title,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author.name,
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
    'https://create.editorx.com/html/editor/web/*',
  ],
  action: {
    default_popup: 'popup.html',
    default_icon: 'icons/velo.png',
  },
  content_scripts: [
    {
      matches: [
        'https://editor.wix.com/html/editor/web/*',
        'https://create.editorx.com/html/editor/web/*',
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
};
