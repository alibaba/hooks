import { useState, useCallback, useRef } from 'react';

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

  const transformerRef = useRef(transformer);
  transformerRef.current = transformer;

  const onChange = useCallback((e: EventTarget<U>) => {
    const _value = e.target.value;
    if (typeof transformerRef.current === 'function') {
      return setValue(transformerRef.current(_value))
    }
    // no transformer => U and T should be the same
    return setValue(_value as unknown as T);
  }, [setValue]);

  return [{
    value,
    onChange,
  }, reset];
};
