/**
 * title: Basic usage
 * desc: Controlled input component，support reset.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 受控的 input，支持 reset。
 */

import React from 'react';
import { useEventTarget } from 'ahooks';

export default () => {
  const [value, { reset, onChange }] = useEventTarget({ initialValue: 'this is initial value' });

  return (
    <div>
      <input value={value} onChange={onChange} style={{ width: 200, marginRight: 20 }} />
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
};
