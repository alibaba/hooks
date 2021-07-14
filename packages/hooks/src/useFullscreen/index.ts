import { useCallback, useState } from 'react';
import screenfull from 'screenfull';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';
import type { BasicTarget } from '../utils/dom2';
import { getTargetElement } from '../utils/dom2';

export interface Options {
  onExitFull?: () => void;
  onFull?: () => void;
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onExitFull, onFull } = options || {};

  const onExitFullRef = useLatest(onExitFull);
  const onFullRef = useLatest(onFull);

  const [state, setState] = useState(false);

  const onChange = useCallback(() => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = screenfull;
      if (isFullscreen) {
        onFullRef.current?.();
      } else {
        screenfull.off('change', onChange);
        onExitFullRef.current?.();
      }
      setState(isFullscreen);
    }
  }, []);

  const setFull = useCallback(() => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (screenfull.isEnabled) {
      try {
        screenfull.request(el);
        screenfull.on('change', onChange);
      } catch (error) {
        console.error(error);
      }
    }
  }, [target, onChange]);

  const exitFull = useCallback(() => {
    if (!state) {
      return;
    }
    if (screenfull.isEnabled) {
      screenfull.exit();
    }
  }, [state]);

  const toggleFull = useCallback(() => {
    if (state) {
      exitFull();
    } else {
      setFull();
    }
  }, [state, setFull, exitFull]);

  useUnmount(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', onChange);
    }
  });

  return [
    state,
    {
      setFull: useMemoizedFn(setFull),
      exitFull: useMemoizedFn(exitFull),
      toggleFull: useMemoizedFn(toggleFull),
    },
  ] as const;
};

export default useFullscreen;
