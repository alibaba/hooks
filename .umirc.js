export default {
  extraBabelPlugins: [[
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ]],
  mode: 'site',
  title: 'ahooks',
  dynamicImport: {},
  manifest: {},
  links: [{ rel: "manifest", href: "/asset-manifest.json" }],
  hash: true,
  resolve: {
    includes: ['docs', 'packages/hooks/src', 'packages/use-request'],
  },
  styles: [
    `a[title='站长统计'] { display: none; }`,
  ],
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
