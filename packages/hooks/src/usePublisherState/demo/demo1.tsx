/**
 * title: Default usage
 *
 * title.zh-CN: 基础用法
 */

import { usePublisherState, useSubscriberState } from 'ahooks';
import type { PublisherStateType } from 'ahooks';
import React, { useState } from 'react';
const InnerComp: React.FC<{ data: PublisherStateType<number>; data1: number }> = ({
  data,
  data1,
}) => {
  const counter = useSubscriberState(data);
  return (
    <div>
      <p>
        Child counter: {counter},{data1}
      </p>
    </div>
  );
};
export default () => {
  const [counter, setCounter] = usePublisherState(0);
  const [counter1, setCounter1] = useState(0);
  return (
    <div>
      <p>
        <button
          type="button"
          onClick={() => setCounter((val) => val + 1)}
          style={{ margin: '0 16px' }}
        >
          counter++ with usePublisherState
        </button>
        <button type="button" onClick={() => setCounter1((val) => val + 1)}>
          counter++ with useState
        </button>
      </p>

      <p>
        Parent counter: {counter.current},{counter1}
      </p>
      <InnerComp data={counter} data1={counter1} />
    </div>
  );
};
