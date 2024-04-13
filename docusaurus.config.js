// @ts-check

// CTRL+F for "set this" to find all the fields with placeholder values.
// For other configuration options,
// see: https://docusaurus.io/docs/api/themes/configuration

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Code-Study',
    favicon: 'img/favicon.ico',
    staticDirectories: ['static'],

    // The url for your site: <url>/<baseUrl>/
    url: 'https://code-study.github.io',  // set this
    baseUrl: '/',  // set this

    // (optional) GitHub pages deployment config.
    organizationName: 'Code-Study',  // set this – GitHub Org or Username
    projectName: 'Code-Study.github.io',  // set this – repo name
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
                theme: {
                    customCss: './src/css/custom.scss',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // set this - Replace with your project's social card
            image: '/img/logo.svg',
            docs: {
                sidebar: {
                    hideable: true,
                }
            },
            // set this – navbar items
            // See: https://docusaurus.io/docs/api/themes/configuration#navbar
            navbar: {
                title: 'Code Study',  // set this
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',  // set this to your main docs page name
                        position: 'left',
                        label: 'Get Codes',
                    },
                    {
                        href: 'https://github.com/Code-Study/Archive',  // set this
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            // set this – to the links you want
            // See: https://docusaurus.io/docs/api/themes/configuration#footer-1
            footer: {
                style: 'light',
                links: [
                    {
                        label: 'Get Codes',
                        to: '/docs/intro',
                    },
                    {
                        label: 'GitHub',
                        href: 'https://github.com/Code-Study/Archive',
                    },
                ],
                // set this
                copyright: `Copyright © ${new Date().getFullYear()} Code Study, Junnei. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),

    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],

    plugins: [
        'docusaurus-plugin-sass',
        async function disableUsedExports() {
            return {
                name: 'disable-used-exports',
                configureWebpack() {
                    return {
                        optimization: {
                            usedExports: false
                        }
                    }
                }
            }
        },
        [ require.resolve('docusaurus-lunr-search'), {
            languages: ['en', 'ko']
        }]
    ],
};

export default config;
