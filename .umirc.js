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
  links: [{ rel: 'manifest', href: '/asset-manifest.json' }],
  hash: true,
  resolve: {
    includes: ['docs', 'packages/hooks/src', 'packages/use-request', 'packages/use-url-state'],
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
      null,
      { title: 'v1.x', path: 'http://hooks.umijs.org/' },
      { title: 'GitHub', path: 'https://github.com/alibaba/hooks' },
      { title: '更新日志', path: 'https://github.com/alibaba/hooks/releases' },
    ],
    'en-US': [
      null,
      { title: 'v1.x', path: 'http://hooks.umijs.org/' },
      { title: 'GitHub', path: 'https://github.com/alibaba/hooks' },
      { title: 'Changelog', path: 'https://github.com/alibaba/hooks/releases' },
    ],
  },
  headScripts: ['https://s4.cnzz.com/z_stat.php?id=1278992092&web_id=1278992092'],
};
