// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const codeTheme = require('prism-react-renderer/themes/okaidia')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Symbiosis',
  tagline: 'Managed Kubernetes',
  url: 'https://symbiosis.host',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'symbiosis',
  projectName: 'symbiosis',
  scripts: [{src: 'https://plausible.io/js/plausible.js', async: true, defer: true, 'data-domain': 'docs.symbiosis.host'}],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: "/",
          breadcrumbs: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  ({
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    navbar: {
      title: 'Symbiosis',
      logo: {
        href: 'http://symbiosis.host', // TODO env variable
        alt: 'Symbiosis Logo',
        src: 'img/logo.png',
        target: '_self',
      },
      items: [],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} Symbiosis.`,
      links: [],
    },
    prism: {
      additionalLanguages: ['hcl'],
      theme: codeTheme,
      darkTheme: codeTheme,
    },
    algolia: {
      appId: 'IMQ0I0NAKK',
      apiKey: '245b6cbedb3505bd8f90516bd21bb86f',
      indexName: 'symbiosis-docs',
    },
  }),

  plugins: ['tailwind-loader'],
};

module.exports = config;
