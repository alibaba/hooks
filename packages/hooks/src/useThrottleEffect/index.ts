import { useEffect, EffectCallback, DependencyList, useState } from 'react';
import { ThrottleOptions } from '../useThrottle/throttleOptions';
import useThrottleFn from '../useThrottleFn';
import useUpdateEffect from '../useUpdateEffect';

function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    run();

    return cancel;
  }, deps);

  useUpdateEffect(effect, [flag]);
}

export default useThrottleEffect;
