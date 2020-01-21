import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  umd: {
    name: 'umijsUseRequest',
    globals: {
      'react': 'React',
    }
  },
};

export default options;
