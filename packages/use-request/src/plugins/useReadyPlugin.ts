import type { UseRequestPlugin } from '../types';

const useReadyPlugin: UseRequestPlugin<{ ready: boolean }> = (ready) => {
  return {
    run: (runImplement) => {
      if (ready) {
        return runImplement;
      }
      return () => {};
    },
  };
};

export default useReadyPlugin;
