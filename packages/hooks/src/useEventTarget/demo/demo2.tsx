/**
 * title: Custom transformer function
 * desc: Controlled input component with number input only
 *
 * title.zh-CN: 自定义转换函数
 * desc.zh-CN: 只能输入数字的 input 组件
 */

import React from 'react';
import { useEventTarget } from 'ahooks';

export default () => {
  const [value, { onChange, reset }] = useEventTarget({
    initialValue: '',
    transformer: (val: string) => val.replace(/[^\d]/g, ''),
  });

  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        style={{ width: 200, marginRight: 20 }}
        placeholder="Please type here"
      />
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
};
