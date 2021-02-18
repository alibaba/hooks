/**
 * title: Uncontrolled component
 * desc: If there is no value in props, the component use self-contained state
 *
 * title.zh-CN: 非受控组件
 * desc.zh-CN: 如果 props 中没有 value，则组件内部自理 state
 */
import React from 'react';
import { useControllableValue } from 'ahooks';

export default (props: any) => {
  const [state, setState] = useControllableValue<string>(props, {
    defaultValue: '',
  });

  return (
    <>
      <input
        value={state}
        onChange={e => setState(e.target.value)}
        style={{ width: 300 }}
      />
      <button type="button" onClick={() => setState('')} style={{ margin: '0 4px'}}>
        Clear
      </button>
    </>
  );
};
