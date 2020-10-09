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
  const [state, setState] = useControllableValue<number>(props);

  return <input value={state} onChange={() => setState(state + 1)} style={{ width: 300 }} />;
};

const Parent = () => {
  const [state, setState] = useState<number>(0);
  const increment = () => {
    setState((s) => s + 1);
  };

  const decrease = () => {
    setState((s) => s - 1);
  };

  return (
    <>
      <ControllableComponent value={state} onChange={setState} />
      <button type="button" onClick={increment} style={{ margin: '0 4px' }}>
        +
      </button>
      <button type="button" onClick={decrease}>
        -
      </button>
    </>
  );
};
export default Parent;
