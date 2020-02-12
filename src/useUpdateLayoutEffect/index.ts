/* eslint consistent-return: 0 */

import { useLayoutEffect, useRef } from 'react';

/**
 * 仅在依赖项更新时运行的useLayoutEffect挂钩。
 * 与useLayoutEffect功能相同，不同之处在于第一次不会执行
 * @param effect ： 可以执行的方法
 * @param deps ： 依赖的数组，当改变时，会执行的依赖
 */
const useUpdateLayoutEffect: typeof useLayoutEffect = (effect, deps) => {
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateLayoutEffect;
