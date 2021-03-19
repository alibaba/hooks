import { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';
import { DebounceOptions } from './debounceOptions';

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run, cancel } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
    return cancel;
  }, [value]);

  return debounced;
}

export default useDebounce;
