import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useThrottleFn from '../useThrottleFn';
import useUpdateEffect from '../useUpdateEffect';

function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  const [flag, setFlag] = useState({});

  const { run } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
}

export default useThrottleEffect;
