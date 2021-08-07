import { debounce } from 'lodash';
import type { UseRequestPlugin } from '../type';

const useDebouncePlugin: UseRequestPlugin<{ wait: number }> = ({ wait }) => {
  return {
    run: (runImplement) => {
      return debounce((...args) => runImplement(...args), wait);
    },
  };
};

export default useDebouncePlugin;
