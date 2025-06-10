import { useRef } from 'react';
import type { Plugin, Timeout } from '../types';

const useLoadingDelayPlugin: Plugin<any, any[]> = (fetchInstance, { loadingDelay, ready }) => {
  const timerRef = useRef<Timeout>(undefined);

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

      // Two cases:
      // 1. ready === undefined
      // 2. ready === true
      if (ready !== false) {
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
