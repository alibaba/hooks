/**
 * title: Sync state with localStorage
 * desc: When the stored value changes, all `useLocalStorageState` with the same `key` will synchronize their states, including different tabs of the same browser (try to open two tabs of this page, clicking a button on one page will automatically update the "count" on the other page).
 *
 * title.zh-CN: 将 state 与 localStorage 保持同步
 * desc.zh-CN: 存储值变化时，所有 `key` 相同的 `useLocalStorageState` 会同步状态，包括同一浏览器不同 tab 之间（尝试打开两个此页面，点击其中一个页面的按钮，另一个页面的 count 会自动更新）
 */

import React from 'react';
import { useLocalStorageState } from 'ahooks';

export default function () {
  return (
    <>
      <Counter />
      <Counter />
    </>
  );
}

function Counter() {
  const [count, setCount] = useLocalStorageState('use-local-storage-state-demo4', {
    defaultValue: 0,
    listenStorageChange: true,
  });

  return (
    <div style={{ marginBottom: '8px' }}>
      <button style={{ marginRight: '8px' }} onClick={() => setCount(count! + 1)}>
        count: {count}
      </button>
      <button onClick={() => setCount()}>Clear</button>
    </div>
  );
}
