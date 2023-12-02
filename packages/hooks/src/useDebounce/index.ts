import { useState } from 'react';
import useDebounceFn from '../useDebounceFn';
import type { DebounceOptions } from './debounceOptions';
import useUpdateEffect from '../useUpdateEffect';

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useUpdateEffect(() => {
    run();
  }, [value]);

  return debounced;
}

export default useDebounce;
