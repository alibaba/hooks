import { useState, useCallback, useRef } from 'react';

interface EventTarget<U> {
  target: {
    value: U;
  };
}

export interface Options<T, U> {
  initialValue?: T;
  transformer?: (value: U) => T;
}

function useEventTarget<T, U = T>(options?: Options<T, U>) {
  const { initialValue, transformer } = options || {};
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => setValue(initialValue), []);

  const transformerRef = useRef(transformer);
  transformerRef.current = transformer;

  const onChange = useCallback((e: EventTarget<U>) => {
    const _value = e.target.value;
    if (typeof transformerRef.current === 'function') {
      return setValue(transformerRef.current(_value));
    }
    // no transformer => U and T should be the same
    return setValue((_value as unknown) as T);
  }, []);

  return [
    value,
    {
      onChange,
      reset,
    },
  ] as const;
}

export default useEventTarget;
