import { useRef, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useValueMutation<T, V>(
  value: T,
  onChange: (newVal: T) => V,
  isEqual: (val1?: T, val2?: T) => boolean = Object.is,
) {
  const prevValueRef = useRef(value);
  const [changedValue, setChangedValue] = useState<T>(value);
  const isUncontrolledRef = useRef(false);
  const onInnerChange = useMemoizedFn((newVal: T) => {
    isUncontrolledRef.current = true;
    setChangedValue(newVal);
    return onChange(newVal);
  });
  const equal = isEqual(prevValueRef.current, value) || isEqual(value, changedValue);
  if (!equal) {
    isUncontrolledRef.current = false;
  }
  const curValue = isUncontrolledRef.current ? changedValue : value;

  prevValueRef.current = value;
  return [curValue, onInnerChange] as const;
}

export default useValueMutation;
