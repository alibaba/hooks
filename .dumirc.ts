import { defineConfig } from 'dumi';

const packages = require('./packages/hooks/package.json');

export default defineConfig({
  // ssr: {},
  hash: true,
  mfsu: false,
  favicons: ['/simple-logo.svg'],
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'hook', dir: 'packages/hooks/src' },
      { type: 'hook', dir: 'packages/hooks/src/useRequest/docs' },
      { type: 'hook', dir: 'packages/use-url-state' },
    ],
    codeBlockMode: 'passive',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  alias: {
    ahooks: process.cwd() + '/packages/hooks/src/index.ts',
    '@ahooksjs/use-url-state': process.cwd() + '/packages/use-url-state/src/index.ts',
  },
  // TODO: 原来的统计使用的是：https://s4.cnzz.com/z_stat.php?id=1278992092&web_id=1278992092，但这个链接无法访问，
  //       是否需要切换到 dumi 内置的统计功能中
  analytics: {},
  manifest: {},
  sitemap: {
    hostname: 'https://ahooks.js.org/',
  },
  themeConfig: {
    // name: `ahooks ${packages.version}`,
    logo: '/logo.svg',
    prefersColor: { default: 'auto', switch: true },
    footer:
      'Open-source MIT Licensed | Copyright © 2019-present<br />Powered by <a href="https://d.umijs.org" target="_blank">dumi</a>',
    socialLinks: {
      github: 'https://github.com/alibaba/hooks',
    },
  },
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
  exportStatic: {},
  /**
   * TODO: dumi v1 中，该选项配置如下：
   *
   * nodeModulesTransform: {
   *   type: 'none',
   *   exclude: [],
   * },
   *
   * 在 v2 中暂时不确定怎样是等价的配置
   */
  // legacy: {},
  links: [
    // Used by the `useFusionTable` demo
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  scripts: [],
});
