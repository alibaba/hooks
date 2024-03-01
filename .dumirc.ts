import { defineConfig } from 'dumi';

const packages = require('./packages/hooks/package.json');

export default defineConfig({
  mfsu: false,
  hash: true,
  manifest: {},
  alias: {
    ahooks: process.cwd() + '/packages/hooks/src/index.ts',
    '@ahooksjs/use-url-state': process.cwd() + '/packages/use-url-state/src/index.ts',
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'hook', dir: 'packages/hooks/src' },
      { type: 'hook', dir: 'packages/hooks/src/useRequest/docs' },
      { type: 'hook', dir: 'packages/use-url-state' },
    ],
  },
  sitemap: {
    hostname: 'https://ahooks.js.org/',
  },
  locales: [
    { id: 'en-US', name: 'English' },
    { id: 'zh-CN', name: '中文' },
  ],
  favicons: ['/simple-logo.svg'],
  themeConfig: {
    logo: '/logo.svg',
    // name: packages.version, // TODO: 溢出了
    prefersColor: {
      default: 'light',
      switch: true,
    },
    footer:
      'Open-source MIT Licensed | Copyright © 2019-present<br />Powered by <a href="https://d.umijs.org" target="_blank">dumi</a>',
    socialLinks: {
      github: 'https://github.com/alibaba/hooks',
    },
    nav: {
      'en-US': [
        { title: 'Guide', link: '/guide' },
        { title: 'Hooks', link: '/hooks/index' },
        { title: 'Blog', link: '/blog/function' },
        { title: 'Releases', link: 'https://github.com/alibaba/hooks/releases' },
        { title: 'Mirror', link: 'https://ahooks.gitee.io/zh-CN' },
        {
          title: 'Legacy Versions',
          children: [
            { title: 'v2.x', link: 'https://ahooks-v2.js.org/' },
            { title: 'v1.x', link: 'http://hooks.umijs.org/' },
          ],
        },
      ],
      'zh-CN': [
        { title: '指南', link: '/zh-CN/guide' },
        { title: 'Hooks', link: '/zh-CN/hooks/index' },
        { title: '博客', link: '/zh-CN/blog/function' },
        { title: '更新日志', link: 'https://github.com/alibaba/hooks/releases' },
        { title: '国内镜像', link: 'https://ahooks.gitee.io/zh-CN' },
        {
          title: '历史版本',
          children: [
            { title: 'v2.x', link: 'https://ahooks-v2.js.org/' },
            { title: 'v1.x', link: 'http://hooks.umijs.org/' },
          ],
        },
      ],
    },
  },
  links: [
    // Used by the `useFusionTable` demo
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  scripts: [
    `const insertVersion = function() {
      const logo = document.querySelector('.__dumi-default-navbar-logo');
      if (!logo) return;
      const dom = document.createElement('span');
      dom.id = 'logo-version';
      dom.innerHTML = '${packages.version}';
      logo.parentNode.insertBefore(dom, logo.nextSibling);
    };
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const logoVersion = document.querySelector('#logo-version');
          if (logoVersion) {
            observer.disconnect();
          } else {
            insertVersion();
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });`,
  ],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@alifd/next',
        style: false,
      },
      'fusion',
    ],
  ],
  // https://github.com/alibaba/hooks/issues/2155
  extraBabelIncludes: ['filter-obj'],
});
