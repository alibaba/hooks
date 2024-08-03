import { useRef, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useValueMutation<T, V>(
  value: T,
  onChange: (newVal: T) => V,
  isEqual: (val1?: T, val2?: T) => boolean = Object.is,
) {
  const prevValueRef = useRef(value);
  const [changedValue, setChangedValue] = useState<T>(value);
  const onInnerChange = useMemoizedFn((newVal: T) => {
    setChangedValue(newVal);
    return onChange(newVal);
  });
  const equal = isEqual(prevValueRef.current, value) || isEqual(value, changedValue);
  const curValue = equal ? changedValue : value;

  prevValueRef.current = value;
  return [curValue, onInnerChange] as const;
}

export default useValueMutation;
