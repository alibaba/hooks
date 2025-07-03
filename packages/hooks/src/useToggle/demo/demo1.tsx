/**
 * title: Basic usage
 * description: Default value is boolean，alike useBoolean.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useToggle } from 'ahooks';

export default () => {
  const [state, { toggle, setLeft, setRight }] = useToggle();

  return (
    <div>
      <p>effects: {`${state}`}</p>
      <Space style={{ marginTop: 8 }} wrap>
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={setLeft}>Toggle False</Button>
        <Button onClick={setRight}>Toggle True</Button>
      </Space>
    </div>
  );
};
