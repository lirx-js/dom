/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually

  documentation: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'documentation/getting-started/introduction/index',
        'documentation/getting-started/installation/index',
      ],
    },
    {
      type: 'category',
      label: 'Template Syntax',
      link: {
        type: 'doc',
        id: 'documentation/syntax/index',
      },
      items: [
        'documentation/syntax/reactive-text/index',
        {
          type: 'category',
          label: 'Attributes',
          items: [
            {
              type: 'category',
              label: 'Bind',
              link: {
                type: 'doc',
                id: 'documentation/syntax/attributes/bind/index',
              },
              items: [
                'documentation/syntax/attributes/bind/reactive-class/index',
                'documentation/syntax/attributes/bind/reactive-class-list/index',
                'documentation/syntax/attributes/bind/reactive-style/index',
                'documentation/syntax/attributes/bind/reactive-style-list/index',
                'documentation/syntax/attributes/bind/reactive-property/index',
                'documentation/syntax/attributes/bind/reactive-attribute/index',
                'documentation/syntax/attributes/bind/reactive-input/index',
              ],
            },
            {
              type: 'category',
              label: 'Event',
              link: {
                type: 'doc',
                id: 'documentation/syntax/attributes/event/index',
              },
              items: [
                'documentation/syntax/attributes/event/event-listener/index',
                'documentation/syntax/attributes/event/reactive-output/index',
              ],
            },
            'documentation/syntax/attributes/modifier/index',
          ],
        },
        {
          type: 'category',
          label: 'RX Components',
          link: {
            type: 'doc',
            id: 'documentation/syntax/rx-components/index',
          },
          items: [
            'documentation/syntax/rx-components/rx-container/index',
            'documentation/syntax/rx-components/rx-template/index',
            'documentation/syntax/rx-components/rx-inject-template/index',
            'documentation/syntax/rx-components/rx-if/index',
            'documentation/syntax/rx-components/rx-switch/index',
            'documentation/syntax/rx-components/rx-for-loop/index',
          ],
        },
        'documentation/syntax/custom-element/index',
      ],
    },
    'documentation/example/index',
  ],
  reference: [
    {
      type: 'autogenerated',
      dirName: 'reference'
    },
  ],
  changelogs: [
    {
      type: 'autogenerated',
      dirName: 'changelogs'
    },
  ],
};

module.exports = sidebars;
