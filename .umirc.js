export default {
  extraBabelPlugins: [[
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ]],
  doc: {
    locales: [['en-US', 'English'], ['zh-CN', '中文']]
  }
}
