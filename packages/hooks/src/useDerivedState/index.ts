import { useState } from 'react';

// 这段代码定义了一个自定义hook，用于派生状态
const useDerivedState = <T = any>(value: T) => {
  // 使用useState定义内部状态和前一个状态
  const [internalValue, setInternalValue] = useState<T>(value);
  const [prevValue, setPrevValue] = useState<T>(value);

  // 如果传入的value和前一个状态不同，则更新内部状态和前一个状态
  if (value !== prevValue) {
    setPrevValue(value);
    setInternalValue(value);
  }
  // 返回内部状态和更新内部状态的函数
  return [internalValue, setInternalValue];
};

export default useDerivedState;
