import useUpdateEffect from '../../../useUpdateEffect';
import type { Plugin } from '../types';

const useRefreshDeps: Plugin<any, any[]> = (fetchInstance, { manual, refreshDeps = [] }) => {
  useUpdateEffect(() => {
    if (!manual) {
      fetchInstance.refresh();
    }
  }, [...refreshDeps]);

  return {};
};

export default useRefreshDeps;
