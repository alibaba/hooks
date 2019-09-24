import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  entry: 'src/index.tsx',
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
    base: '/base',
    repository: 'https://github.com/umijs/hooks',
    theme: 'docz-theme-umi-hooks',
    ignore: ['readme.md', 'changelog.md', 'readme_zh-CN.md', 'contributing.md', 'license.md'],
    themeConfig: {
      codemirrorTheme: 'docz-dark',
      showPlaygroundEditor: true,
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
