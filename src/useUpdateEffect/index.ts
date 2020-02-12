import { useEffect, useRef } from 'react';

/**
 * 该钩子与useEffect完全相同，不同之处在于它忽略了第一个渲染并且仅在依赖项更新时运行。
 * @param effect : Executable function: 可执行的方法
 * @param deps ： （可选）传递依赖于更改的对象
 */
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
