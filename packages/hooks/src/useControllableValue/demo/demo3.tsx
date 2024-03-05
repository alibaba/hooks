/**
 * title: No value, have onChange component
 * description: If there is an onChange field in props, the onChange will be trigger when state change
 *
 * title.zh-CN: 无 value，有 onChange 的组件
 * description.zh-CN: 只要 props 中有 onChange 字段，则在 state 变化时，就会触发 onChange 函数
 */

import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { useControllableValue } from 'ahooks';

const ControllableComponent = (props: any) => {
  const [state, setState] = useControllableValue<string>(props);

  return <Input value={state} onChange={(e) => setState(e.target.value)} />;
};
const Parent = () => {
  const [state, setState] = useState<number>(0);

  return (
    <Space>
      <ControllableComponent onChange={setState} />
      <div>state:{state}</div>
    </Space>
  );
};
export default Parent;
