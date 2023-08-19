/**
 * title: Sync state with localStorage
 * desc: The state can be synchronized with `localStorage`, ensuring that it remains consistent across different tabs or when modified elsewhere.(try to open this demo in two tabs, and then click the button in one of the tabs)
 *
 * title.zh-CN: 将 state 与 localStorage 保持同步
 * desc.zh-CN: 当 state 在其他地方被修改时，会自动同步到 `localStorage` 中，包括不同浏览器 tab 之间。（尝试打开两个此页面，点击其中一个页面的按钮，另一个页面的 count 会自动更新）
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
  });

  const add = () => setCount(count! + 1);

  return (
    <button onClick={add} style={{ margin: '0 8px' }}>
      count: {count}
    </button>
  );
}
