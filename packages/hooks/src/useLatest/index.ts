import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

function useLatest<T>(value: T) {
  const ref = useRef(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

export default useLatest;
