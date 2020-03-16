import { useState, useCallback } from 'react';

interface ValueProps<T> {
  value: T | undefined;
  onChange: (e: EventTarget<T>) => any
}

interface EventTarget<T> {
  target: {
    value: T;
  }
}

export default <T>(initialValue?: T, transformer?: (value: T) => T): [
  ValueProps<T>,
  () => void
] => {
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => setValue(initialValue), [setValue]);

  const onChange = useCallback((e: EventTarget<T>) => {
    let val = e.target.value;
    if (typeof transformer === 'function') {
      val = transformer(val);
    }
    setValue(val);
  }, [setValue]);

  return [{
    value,
    onChange,
  }, reset];
};
