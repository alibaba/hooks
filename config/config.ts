import { menus } from './hooks';

export default {
  // ssr: {},
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
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
  mode: 'site',
  title: 'ahooks',
  favicon: '/simple-logo.svg',
  logo: '/logo.svg',
  dynamicImport: {},
  manifest: {},
  hash: true,
  resolve: {
    includes: ['docs', 'packages/hooks/src', 'packages'],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  navs: {
    'zh-CN': [
      { title: '指南', path: '/zh-CN/guide' },
      // TODO how to set default url
      { title: 'Hooks', path: '/zh-CN/hooks' },
      {
        title: '历史版本',
        children: [
          {
            title: 'v2.x',
            path: 'https://ahooks.js.org/',
          },
          {
            title: 'v1.x',
            path: 'http://hooks.umijs.org/',
          },
        ],
      },
      { title: '更新日志', path: 'https://github.com/alibaba/hooks/releases' },
      { title: '国内镜像', path: 'https://ahooks.gitee.io/zh-CN' },
      { title: 'GitHub', path: 'https://github.com/alibaba/hooks' },
    ],
    'en-US': [
      { title: 'Guide', path: '/guide' },
      { title: 'Hooks', path: '/hooks' },
      {
        title: 'Legacy Versions',
        children: [
          {
            title: 'v2.x',
            path: 'https://ahooks.js.org/',
          },
          {
            title: 'v1.x',
            path: 'http://hooks.umijs.org/',
          },
        ],
      },
      { title: 'Releases', path: 'https://github.com/alibaba/hooks/releases' },
      { title: '国内镜像', path: 'https://ahooks.gitee.io/zh-CN' },
      { title: 'GitHub', path: 'https://github.com/alibaba/hooks' },
    ],
  },
  menus: {
    '/': [
      {
        title: 'Home',
        path: 'index',
      },
    ],
    '/zh-CN': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/guide': [
      {
        title: 'Quick Start',
        path: '/guide/quick-start',
      },
    ],
    '/zh-CN/guide': [
      {
        title: '快速上手',
        path: '/guide/quick-start',
      },
    ],
    '/hooks': menus,
    '/zh-CN/hooks': menus,
  },
  headScripts: ['https://s4.cnzz.com/z_stat.php?id=1278992092&web_id=1278992092'],
};
