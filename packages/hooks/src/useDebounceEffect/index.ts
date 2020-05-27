import { useEffect, EffectCallback, DependencyList, useState } from 'react';
import { DebounceOptions } from '../useDebounce/debounceOptions';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';

function useDebounceEffect(effect: EffectCallback, deps?: DependencyList, options?: DebounceOptions) {
  const [flag, setFlag] = useState({})

  const {run} = useDebounceFn(() => {
    setFlag({})
  }, options)

  useEffect(() => {
    return run()
  }, deps)

  useUpdateEffect(effect, [flag])
}

export default useDebounceEffect
