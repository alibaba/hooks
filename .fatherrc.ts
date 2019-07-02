import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  entry: 'src/index.tsx',
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    name: 'umijsHooks',
    globals:{
      'react': 'React'
    }
  },
  preCommit: {
    eslint: true,
    prettier: true,
  },
  doc: {
    title: '@umijs/hooks',
    base: '/hooks/'
  }
};

export default options;