import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  umd: {
    name: 'umijsHooks',
    globals: {
      'react': 'React',
    }
  },
};

export default options;
