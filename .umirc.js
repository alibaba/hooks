export default {
  hash: true,
  extraBabelPlugins: [[
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ]],
  doc: {
    title: 'Umi Hooks',
    include: ['packages/hooks/src', 'packages/use-request'],
    locales: [['en-US', 'English'], ['zh-CN', '中文']]
  }
}
