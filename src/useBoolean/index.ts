import { useCallback } from 'react';

// 自定义hooks -- 用以切换
import useToggle from '../useToggle';

const useBoolean = (defaultValue: boolean = false) => {
  // 初始化Toggle的默认值
  const { state, toggle } = useToggle(defaultValue);

  // 设置成true
  const setTrue = useCallback(() => toggle(true), [toggle]);

  // 设置成false
  const setFalse = useCallback(() => toggle(false), [toggle]);

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
};

export default useBoolean;
