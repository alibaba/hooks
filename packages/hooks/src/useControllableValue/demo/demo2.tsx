/**
 * title: Controlled component
 * desc: If props has the value field, then the state is controlled by it's parent
 *
 * title.zh-CN: 受控组件
 * desc.zh-CN: 如果 props 有 value 字段，则由父级接管控制 state
 */

import React, { useState } from 'react';
import { useControllableValue } from 'ahooks';

const ControllableComponent = (props: any) => {
  const [state, setState] = useControllableValue<string>(props);

  return <input value={state} onChange={(e) => setState(e.target.value)} style={{ width: 300 }} />;
};

const Parent = () => {
  const [state, setState] = useState<string>('');
  const clear = () => {
    setState('');
  };

  return (
    <>
      <ControllableComponent value={state} onChange={setState} />
      <button type="button" onClick={clear} style={{ marginLeft: 8 }}>
        Clear
      </button>
    </>
  );
};
export default Parent;
