import useUpdateEffect from '../../../useUpdateEffect';
import type { Plugin } from '../types';
import { useRef } from 'react';

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { manual, ready = true, defaultParams = [], refreshDeps = [] },
) => {
  const hasRun = useRef(false);
  hasRun.current = false;

  useUpdateEffect(() => {
    if (!manual && ready) {
      hasRun.current = true;
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);

  useUpdateEffect(() => {
    if (hasRun.current) {
      return;
    }
    if (!manual) {
      hasRun.current = true;
      fetchInstance.refresh();
    }
  }, [...refreshDeps]);

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

useAutoRunPlugin.onInit = ({ ready = true, manual }) => {
  return {
    loading: !manual && ready,
  };
};

export default useAutoRunPlugin;
