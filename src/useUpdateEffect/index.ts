import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  // 使用useRef定一个对象并赋值
  // 验证是否被初始化了，
  const isMounted = useRef(false);

  // 初始化执行，当deps值改变则执行对应的方法
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
