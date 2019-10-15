import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  entry: 'src/index.ts',
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    name: 'umijsHooks',
    globals: {
      'react': 'React',
    }
  },
  preCommit: {
    eslint: true,
    prettier: true,
  },
  doc: {
    title: '@umijs/hooks',
    repository: 'https://github.com/umijs/hooks',
    theme: '/Users/troy/Desktop/my-npm/fix/docz-theme-umi/es',
    ignore: ['readme.md', 'changelog.md', 'readme_zh-CN.md', 'contributing.md', 'license.md'],
    themeConfig: {
      codemirrorTheme: 'docz-light',
      // showPlaygroundEditor: true,
      menus: [
        { title: '发布日志', link: 'https://github.com/umijs/hooks/releases' },
        { title: 'Github', link: 'https://github.com/umijs/hooks' },
      ],
    },
  },
  extraBabelPlugins: [[
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ]],
};

export default options;
