export default {
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd'
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@alifd/next',
        style: true
      },
      'fusion'
    ],
  ],
  mode: 'site',
  title: 'ahooks',
  favicon: '/simple-logo.svg',
  logo: '/logo.svg',
  dynamicImport: {},
  manifest: {},
  links: [{ rel: "manifest", href: "/asset-manifest.json" }],
  hash: true,
  resolve: {
    includes: ['docs', 'packages/hooks/src', 'packages/use-request'],
  },
  links: [{ rel: 'stylesheet', href: '/style.css' }],
  navs: {
    'zh-CN': [
      null,
      { title: 'GitHub', path: 'https://github.com/ice-lab/ahooks' },
      { title: '更新日志', path: 'https://github.com/ice-lab/ahooks/releases' },
    ],
    'en-US': [
      null,
      { title: 'GitHub', path: 'https://github.com/ice-lab/ahooks' },
      { title: 'Changelog', path: 'https://github.com/ice-lab/ahooks/releases' },
    ],
  },
  headScripts: [
    'https://v1.cnzz.com/z_stat.php?id=1278602214&web_id=1278602214'
  ],
}
