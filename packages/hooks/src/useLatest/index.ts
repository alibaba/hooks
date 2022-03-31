import { useRef } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef(value);

  return ref;
}

export default useLatest;
