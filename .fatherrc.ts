import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  entry: 'src/index.tsx',
  esm: 'rollup',
  cjs: 'rollup',
  preCommit: {
    eslint: true,
    prettier: true
  },
  doc: {
    title: '@umijs/hooks'
  }
};

export default options;