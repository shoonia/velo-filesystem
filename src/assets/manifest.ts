import pkg from '../../package.json' with { type: 'json' };

const urls = [
  // Wix Studio
  'https://*.wix.com/studio/*',
  // Wix Editor
  'https://*.wix.com/html/editor/web/*',
  // Wix Blocks
  'https://*.wix.com/edit/blocks/*',
];

const matches = [
  'https://*.wix.com/*',
];

export const getManifest = (isProd: boolean) => {
  const manifest: chrome.runtime.ManifestV3 = {
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
  };

  return JSON.stringify(manifest);
};
