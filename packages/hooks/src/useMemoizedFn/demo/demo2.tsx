/**
 * title: Performance Improvement
 * description: useMemoizedFn function reference will not change, which can be used for performance optimization.
 *
 * title.zh-CN: 性能提升
 * description.zh-CN: useMemoizedFn 函数地址不会变化，可以用于性能优化。
 */

import React, { useCallback, useRef, useState } from 'react';
import { Button, message } from 'antd';
import { useMemoizedFn } from 'ahooks';

// some expensive component with React.memo
const ExpensiveTree = React.memo<Record<string, any>>(({ showCount }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <p>Render Count: {renderCountRef.current}</p>
      <Button onClick={showCount}>showParentCount</Button>
    </div>
  );
});

export default () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  const memoizedFn = useMemoizedFn(() => {
    message.info(`Current count is ${count}`);
  });

  return (
    <>
      <p>count: {count}</p>
      <Button onClick={() => setCount((c) => c + 1)}>Add Count</Button>

      <p>You can click the Button to see the number of sub-component renderings</p>

      <div style={{ marginTop: 32 }}>
        <h3>Component with useCallback function:</h3>
        {/* use callback function, ExpensiveTree component will re-render on state change */}
        <ExpensiveTree showCount={callbackFn} />
      </div>

      <div style={{ marginTop: 32 }}>
        <h3>Component with useMemoizedFn function:</h3>
        {/* use memoized function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={memoizedFn} />
      </div>
    </>
  );
};
