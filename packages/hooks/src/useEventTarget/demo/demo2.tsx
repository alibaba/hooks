/**
 * title: Custom transformer function
 * description: Controlled input component with number input only.
 *
 * title.zh-CN: 自定义转换函数
 * description.zh-CN: 只能输入数字的 input 组件。
 */

import React from 'react';
import { Button, Input, Space } from 'antd';
import { useEventTarget } from 'ahooks';

export default () => {
  const [value, { onChange, reset }] = useEventTarget({
    initialValue: '',
    transformer: (val: string) => val.replace(/[^\d]/g, ''),
  });

  return (
    <Space>
      <Input placeholder="Please type here" value={value} onChange={onChange} />
      <Button onClick={reset}>Reset</Button>
    </Space>
  );
};
