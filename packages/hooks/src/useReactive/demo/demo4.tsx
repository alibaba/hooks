/**
 * title: Notice
 * description: useReactive returns a proxy object which always has the same reference. If `useEffect`, `useMemo`, `useCallback` and props passed to child component rely on the proxy, none of the above will be invoked by any changes to the proxy.
 *
 * title.zh-CN: 注意
 * description.zh-CN: useReactive 产生可操作的代理对象一直都是同一个引用，`useEffect` , `useMemo` ,`useCallback` ,`子组件属性传递` 等如果依赖的是这个代理对象是**不会**引起重新执行。
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useReactive } from 'ahooks';

export default () => {
  const state = useReactive({ count: 0 });
  const [stateCount, setStateCount] = useState(0);

  const state2 = useReactive({ count: 0 });
  const [stateCount2, setStateCount2] = useState(0);

  // Depends on the object, because it is always the same reference, it will not be executed
  useEffect(() => {
    setStateCount(stateCount + 1);
  }, [state]);

  // Depends on the underlying data type, so as long as it changes, it will be re-executed
  useEffect(() => {
    setStateCount2(stateCount2 + 1);
  }, [state2.count]);

  return (
    <div>
      <p>stateCount: {stateCount}</p>
      <Button onClick={() => (state.count += 1)}>stateCount + 1</Button>

      <p style={{ marginTop: 16 }}>stateCount2: {stateCount2}</p>
      <Button onClick={() => (state2.count += 1)}>stateCount2 + 1</Button>
    </div>
  );
};
