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
  },
  plugins: [[
    'umi-plugin-react', {
      pwa: true,
      headScripts: [
        'https://v1.cnzz.com/z_stat.php?id=1278602214&web_id=1278602214'
      ]
    },
  ]],

}
