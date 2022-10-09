import { useRef } from 'react';
import type { Plugin, Timeout } from '../types';
import { isBoolean } from '../../../utils';

const useLoadingDelayPlugin: Plugin<any, any[]> = (fetchInstance, { loadingDelay, ready }) => {
  const timerRef = useRef<Timeout>();

  if (!loadingDelay) {
    return {};
  }

  const cancelTimeout = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    onBefore: () => {
      cancelTimeout();

      if (ready === undefined || (isBoolean(ready) && ready)) {
        timerRef.current = setTimeout(() => {
          fetchInstance.setState({
            loading: true,
          });
        }, loadingDelay);
      }

      return {
        loading: false,
      };
    },
    onFinally: () => {
      cancelTimeout();
    },
    onCancel: () => {
      cancelTimeout();
    },
  };
};

export default useLoadingDelayPlugin;
