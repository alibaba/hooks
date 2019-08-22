import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  entry: 'src/index.tsx',
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    name: 'umijsHooks',
    globals: {
      'react': 'React',
      'axios': 'axios'
    }
  },
  preCommit: {
    eslint: true,
    prettier: true,
  },
  doc: {
    title: '@umijs/hooks',
    base: '/hooks/',
    ignore: ['changelog.md', 'code_of_conduct.md', 'contributing.md', 'license.md']
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