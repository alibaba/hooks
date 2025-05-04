import { useRef } from 'react';
import useInViewport from '../../../useInViewport';
import useUpdateEffect from '../../../useUpdateEffect';
import type { Plugin } from '../types';

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    manual,
    ready = true,
    defaultParams = [],
    refreshDeps = [],
    target,
    root,
    rootMargin,
    threshold,
    refreshDepsAction,
  },
) => {
  const hasAutoRun = useRef(false);
  hasAutoRun.current = false;

  const shouldRun = useRef(true);
  let [visible] = useInViewport(target, { root, rootMargin, threshold });
  if (!target) visible = true;

  useUpdateEffect(() => {
    shouldRun.current = ready;
  }, [ready, ...refreshDeps]);

  useUpdateEffect(() => {
    if (!manual && ready && visible && shouldRun.current) {
      hasAutoRun.current = true;
      shouldRun.current = false;
      fetchInstance.run(...defaultParams);
    }
  }, [ready, visible]);

  useUpdateEffect(() => {
    if (hasAutoRun.current) {
      return;
    }
    if (!manual && visible && shouldRun.current) {
      hasAutoRun.current = true;
      shouldRun.current = false;
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        fetchInstance.refresh();
      }
    }
  }, [...refreshDeps, visible]);

  return {
    onBefore: () => {
      if (target) {
        return { stopNow: shouldRun.current || !ready };
      }
      return { stopNow: !ready };
    },
  };
};

useAutoRunPlugin.onInit = ({ ready = true, manual }) => {
  return {
    loading: !manual && ready,
  };
};

export default useAutoRunPlugin;
