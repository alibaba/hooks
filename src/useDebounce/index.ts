import { useState } from 'react';
import useDebounceFn from '../useDebounceFn';

/**
 * 值防抖， 等到wait值获取到值
 * @param value 值
 * @param wait 等待时间
 */
function useDebounce<T>(value: T, wait: number) {
  const [state, setState] = useState(value);

  useDebounceFn(
    () => {
      setState(value);
    },
    [value],
    wait,
  );

  return state;
}

export default useDebounce;
