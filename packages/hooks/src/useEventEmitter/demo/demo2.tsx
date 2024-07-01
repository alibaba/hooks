/**
 * title: Invoke asynchronous methods arbitrarily across components
 * desc: A component creates a 'getData' event. By calling 'getData' in component B, component A receives the notification
 *
 * title.zh-CN: 任意跨组件调用异步方法
 * desc.zh-CN: A组件创建了一个 `getData` 事件。在 B组件 中调用 `getData` ，A 组件就可以收到通知。
 */

import React, { useRef, FC, useState } from 'react';
import { useEventEmitter } from 'ahooks';

const ComponentA: FC = function (props) {
  const inputRef = useRef<any>();
  const Bus = useEventEmitter<string>();
  const getData = async (type: string) => {
    // Your asynchronous operation

    return `${type} Get A Data`;
  };
  Bus.useSubscription(getData, 'A/getData');

  return (
    <input ref={inputRef} placeholder="Enter reply" style={{ width: '100%', padding: '4px' }} />
  );
};

const ComponentB: FC = function (props) {
  const Bus = useEventEmitter<string>();
  const [data, setData] = useState('none');
  return (
    <div style={{ paddingBottom: 24 }}>
      <p>{data}</p>
      <button
        type="button"
        onClick={async () => {
          const results = await Bus.asyncEmit('B', 'A/getData');
          if (results) {
            setData(results[0]);
          }
        }}
      >
        Get
      </button>
    </div>
  );
};

export default function () {
  return (
    <>
      <ComponentA />
      <ComponentB />
    </>
  );
}
