import { useEffect, EffectCallback, DependencyList, useState } from 'react';
import { DebounceOptions } from '../useDebounce/debounceOptions';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';
import useUnmount from '../useUnmount';

function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;
