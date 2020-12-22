import { useEffect, EffectCallback, DependencyList, useState } from 'react';
import { DebounceOptions } from '../useDebounce/debounceOptions';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';

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
    run();

    return cancel;
  }, deps);

  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;
