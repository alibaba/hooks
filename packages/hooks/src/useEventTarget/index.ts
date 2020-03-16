import { useState, useCallback } from 'react';
import usePersistFn from '../usePersistFn';

interface ValueProps<T, U> {
  value: T | undefined;
  onChange: (e: EventTarget<U>) => any
}

interface EventTarget<U> {
  target: {
    value: U;
  }
}

export default <T, U = T>(initialValue?: T, transformer?: (value: U) => T): [
  ValueProps<T, U>,
  () => void
] => {
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => setValue(initialValue), [setValue]);

  const persistTransformer = transformer == null ? transformer : usePersistFn(transformer);

  const onChange = useCallback((e: EventTarget<U>) => {
    const _value = e.target.value;
    if (typeof persistTransformer === 'function') {
      return setValue(persistTransformer(_value))
    }
    // no transformer => U and T should be the same
    return setValue(_value as unknown as T);
  }, [setValue]);

  return [{
    value,
    onChange,
  }, reset];
};
