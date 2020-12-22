import { useEffect, EffectCallback, DependencyList, useState } from 'react';
import { ThrottleOptions } from '../useThrottle/throttleOptions';
import useThrottleFn from '../useThrottleFn';
import useUpdateEffect from '../useUpdateEffect';
import useUnmount from '../useUnmount';

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
    return run();
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useThrottleEffect;
