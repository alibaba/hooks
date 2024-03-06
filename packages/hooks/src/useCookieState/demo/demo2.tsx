/**
 * title: SetState can receive function
 * description: Function updater is also acceptable with useCookieState's setState，similar to how useState is used.
 *
 * title.zh-CN: setState 可以接收函数
 * description.zh-CN: useCookieState 的 setState 可以接收 function updater，就像 useState 那样。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useCookieState } from 'ahooks';

export default function App() {
  const [value, setValue] = useCookieState('useCookieStateUpdater', {
    defaultValue: '0',
  });

  return (
    <>
      <Space wrap>
        <Button onClick={() => setValue((v) => String(Number(v) + 1))}>inc +</Button>
        <Button onClick={() => setValue((v) => String(Number(v) - 1))}>dec -</Button>
        <Button onClick={() => setValue('0')}>reset</Button>
      </Space>
      <p>{value}</p>
    </>
  );
}
