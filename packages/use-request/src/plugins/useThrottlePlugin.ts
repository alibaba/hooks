import { throttle } from 'lodash';
import type { UseRequestPlugin } from '../types';

// TODO: 好像有点问题，需要调试
const useThrottlePlugin: UseRequestPlugin<{ wait: number }> = ({ wait }) => {
  return {
    run: (runImplement) => {
      return throttle((...args) => runImplement(...args), wait);
    },
  };
};

export default useThrottlePlugin;
