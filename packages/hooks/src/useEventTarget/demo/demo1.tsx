/**
 * title: Basic usage
 * desc: Controlled Input component with initial value and reset functionality
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 带初始化值跟重置的受控 Input 组件
 */

import React, { Fragment } from 'react';
import { useEventTarget } from 'ahooks';

export default () => {
  const [value, { reset, onChange }] = useEventTarget({ initialValue: 'this is initial value' });

  return (
    <Fragment>
      <input value={value} onChange={onChange} style={{ width: 200, marginRight: 20 }} />
      <button type="button" onClick={reset}>
        reset
      </button>
    </Fragment>
  );
};
