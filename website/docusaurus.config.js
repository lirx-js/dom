// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require('prism-react-renderer/themes/github');
// const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('./themes/prism/github');
const darkCodeTheme = require('./themes/prism/dracula');
// const darkCodeTheme = require('prism-react-renderer/themes/nightOwl');
// const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const organizationName = 'lirx-js';
const projectName = 'dom';

const githubURL = `https://github.com/${organizationName}/${projectName}/`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LiRX/dom',
  tagline: 'The Reactive Programming Web Framework',
  url: 'https://dom.lirx.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logos/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName, // Usually your GitHub org/user name.
  projectName, // Usually your repo name.
  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    // locales: ['en', 'fr'],
    // localeConfigs: {
    //   en: {
    //     htmlLang: 'en-GB',
    //   },
    // },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `${githubURL}tree/main/website`,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `${githubURL}tree/main/website`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content: 'Reactive Programming, framework, web, ui',
        },
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'LiRX/dom',
        logo: {
          alt: 'LiRX/dom Logo',
          src: 'img/logos/lirx-dom-logo.png',
        },
        items: [
          {
            label: 'Docs',
            type: 'docSidebar',
            sidebarId: 'documentation',
            position: 'left',
          },
          {
            label: 'Syntax',
            to: '/docs/documentation/syntax/rx-components/',
            position: 'left',
          },
          {
            label: 'Reference',
            type: 'docSidebar',
            sidebarId: 'reference',
            position: 'left',
          },
          {
            label: 'Blog',
            to: '/blog',
            position: 'left',
          },
          {
            label: 'GitHub',
            href: githubURL,
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Introduction',
                to: '/docs/documentation/getting-started/introduction/',
              },
              {
                label: 'Examples',
                to: 'https://github.com/lirx-js/dom-examples',
              },
            ],
          },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Ask for a functionality',
          //       href: 'https://github.com/lirx-js/core/discussions',
          //     },
          //   ],
          // },
          {
            title: 'Ecosystem',
            items: [
              {
                label: 'LiRX/core',
                href: 'https://core.lirx.org',
              },
              {
                label: 'LiRX/dom',
                href: 'https://dom.lirx.org',
                // href: 'https://github.com/lirx-js/dom',
              },
              {
                label: 'LiRX/router',
                // href: 'https://router.lirx.org',
                href: 'https://github.com/lirx-js/router',
              },
              {
                label: 'LiRX/i18n',
                // href: 'https://i18n.lirx.org',
                href: 'https://github.com/lirx-js/i18n',
              },
              {
                label: 'LiRX/store',
                // href: 'https://store.lirx.org',
                href: 'https://github.com/lirx-js/store',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog/',
              },
              {
                label: 'Changelog',
                to: '/docs/changelogs/0.9.0/',
              },
              {
                label: 'GitHub',
                href: githubURL,
              },
              {
                label: 'Ask for a functionality',
                href: `${githubURL}discussions`,
              },
            ],
          },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/facebook/docusaurus',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} @lirx/dom, owned by Valentin Richard and maintained with love by all the community ♥.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // https://docusaurus.io/docs/markdown-features/diagrams
      // /** @type {import('@docusaurus/theme-mermaid').UserThemeConfig.mermaid} */
      mermaid: {
        // theme: { light: 'neutral', dark: 'forest' },
        theme: { light: 'default', dark: 'dark' },
        options: {
          // https://mermaid.js.org/config/theming.html
          // "themeVariables": {
          //   "primaryColor": "#dfecff",
          //   "primaryTextColor": "#00002d",
          //   "primaryBorderColor": "#1e7af6",
          //   "lineColor": "#505050",
          //   "secondaryColor": "#006100",
          //   "tertiaryColor": "#fff"
          // },
          // "themeVariables": {
          //   "primaryColor": "#2883fd",
          //   "primaryTextColor": "#fff",
          //   "primaryBorderColor": "#0f4288",
          //   "lineColor": "#505050",
          //   "secondaryColor": "#006100",
          //   "tertiaryColor": "#fff"
          // },
        },
      },
    }),
};

module.exports = config;
