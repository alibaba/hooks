/**
 * title: Default usage
 * desc: With usePersistFn, function references never change.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 通过 usePersistFn, 函数引用永远不会变化。
 */

import React, { useState, useCallback, useRef } from 'react';
import { Button, message } from 'antd';
import { usePersistFn } from '@umijs/hooks';

export default () => {
  const [count, setCount] = useState(0);

  const showCountPersistFn = usePersistFn(() => {
    message.info(`Current count is ${count}`);
  });

  const showCountCommon = useCallback(
    () => {
      message.info(`Current count is ${count}`);
    },
    [count],
  )

  return (
    <>
      <Button onClick={() => { setCount(c => c + 1) }}>Add Count</Button>
      <p>You can click the button to see the number of sub-component renderings</p>

      <div style={{ marginTop: 32 }}>
        <h4>Component with persist function:</h4>
        {/* use persist function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={showCountPersistFn} />
      </div>
      <div style={{ marginTop: 32 }}>
        <h4>Component without persist function:</h4>
        {/* use persist function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={showCountCommon} />
      </div>
    </>
  );
};

// some expensive component with React.memo
const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <p>Render Count: {renderCountRef.current}</p>
      <Button onClick={showCount}>showParentCount</Button>
    </div>
  )
})
