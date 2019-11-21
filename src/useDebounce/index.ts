import { useState } from 'react';
import useDebounceFn from '../useDebounceFn';

function useDebounce<T>(value: T, wait: number) {
  const [state, setState] = useState(value);

  useDebounceFn(
    () => {
      setState(value);
    },
    [value],
    wait,
  );

  return state;
}

export default useDebounce;
