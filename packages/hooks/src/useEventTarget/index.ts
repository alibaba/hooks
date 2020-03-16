import { useState } from 'react';

interface ValueProps<T> {
  value: T;
  onChange: (e: EventTarget<T>) => any
}

interface EventTarget<T> {
  target: {
    value: T;
  }
}

export default <T>(initialValue: T, transformer?: (value: T) => T): [
  ValueProps<T>,
  () => void
] => {
  const [value, setValue] = useState(initialValue);

  const reset = () => setValue(initialValue);

  const onChange = (e: EventTarget<T>) => {
    let val = e.target.value;
    if (typeof transformer === 'function') {
      val = transformer(val);
    }
    setValue(val);
  };

  return [{
    value,
    onChange,
  }, reset];
};
