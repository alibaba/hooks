import { useState } from 'react';
import useThrottleFn from '../useThrottleFn';

/**
 * 截流，获取值
 * @param value
 * @param wait
 */
function useThrottle<T>(value: T, wait: number) {
  const [state, setState] = useState(value);

  // 开启截流事件，当value改变时，等待wait秒事件后返回-获取数据
  useThrottleFn(
    () => {
      setState(value);
    },
    [value],
    wait,
  );

  return state;
}

export default useThrottle;
