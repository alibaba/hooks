import { useRef } from 'react';

/**
 * A Hook that returns the latest value, effectively avoiding the closure problem.
 * @see https://ahooks.js.org/hooks/use-latest
 */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
