import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  umd: {
    name: 'ahooks',
    globals: {
      'react': 'React',
    }
  },
};

export default options;
