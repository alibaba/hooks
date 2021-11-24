import useUpdateEffect from '../../../useUpdateEffect';
import type { Plugin } from '../types';

const useReadyPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { manual, ready = true, defaultParams = [] },
) => {
  useUpdateEffect(() => {
    if (!manual && ready) {
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);

  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true,
        };
      }
    },
  };
};

useReadyPlugin.onInit = ({ ready = true, manual }) => {
  return {
    loading: !manual && ready,
  };
};

export default useReadyPlugin;
