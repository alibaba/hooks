import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  umd: {
    name: 'ahooksUseRequest',
    globals: {
      'react': 'React',
    }
  },
};

export default options;
