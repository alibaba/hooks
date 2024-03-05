/**
 * title: Basic usage
 * description: Controlled input component，support reset.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 受控的 input，支持 reset。
 */

import React from 'react';
import { Button, Input, Space } from 'antd';
import { useEventTarget } from 'ahooks';

export default () => {
  const [value, { reset, onChange }] = useEventTarget({
    initialValue: 'this is initial value',
  });

  return (
    <Space>
      <Input value={value} onChange={onChange} />
      <Button onClick={reset}>Reset</Button>
    </Space>
  );
};
