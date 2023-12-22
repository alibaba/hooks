import React, { useEffect } from 'react';
import { useGetState } from 'ahooks';

/**
 * desc.zh-CN: setState 之后可以立即获取最新的 state 值
 */
export default () => {
  const [count, setCount, getCount] = useGetState<number>(0);

  function handleClick() {
    setCount(count + 1);
    const newCount = getCount();
    // do something with newCount
    alert(newCount);
  }

  return <button onClick={handleClick}>add count and alert</button>;
};
