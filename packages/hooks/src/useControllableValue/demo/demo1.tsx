/**
 * title: Uncontrolled component
 * desc: If there is no value in props, the component manage state by self
 *
 * title.zh-CN: 非受控组件
 * desc.zh-CN: 如果 props 中没有 value，则组件内部自己管理 state
 */
import React from 'react';
import { useControllableValue } from 'ahooks';

export default (props: any) => {
  const [state, setState] = useControllableValue<string>(props, {
    defaultValue: '',
  });

  return (
    <>
      <input value={state} onChange={(e) => setState(e.target.value)} style={{ width: 300 }} />
      <button type="button" onClick={() => setState('')} style={{ marginLeft: 8 }}>
        Clear
      </button>
    </>
  );
};
