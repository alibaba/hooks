import { useRef } from 'react';
import type { UseRequestPlugin } from '../type';
import { sleep } from '../utils';

const useLoadingDelayPlugin: UseRequestPlugin<{ time: number }> = ({ time }) => {
  const startTime = useRef(0);

  return {
    onBefore: () => {
      startTime.current = Date.now();
    },
    onComplete: async () => {
      const now = Date.now();
      const difference = now - startTime.current;
      if (difference < time) {
        await sleep(time - difference);
      }
    },
  };
};

export default useLoadingDelayPlugin;
