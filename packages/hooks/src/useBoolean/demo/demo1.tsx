/**
 * title: Basic usage
 * description: Toggle boolean, default value can be set optionally.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 切换 boolean，可以接收默认值。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useBoolean } from 'ahooks';

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <Space>
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={setFalse}>Set false</Button>
        <Button onClick={setTrue}>Set true</Button>
      </Space>
    </div>
  );
};
