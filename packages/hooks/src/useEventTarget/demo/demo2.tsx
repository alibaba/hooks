/**
 * title: Custom transformer function
 * desc: Controlled Input component with number input only
 *
 * title.zh-CN: 自定义转换函数
 * desc.zh-CN: 只能输入数字的受控Input组件
 */

import React, { Fragment } from 'react';
import { useEventTarget } from 'ahooks';

export default () => {
  const [value, { onChange, reset }] = useEventTarget({
    transformer: (val: string) => val.replace(/[^\d]/g, ''),
  });

  return (
    <Fragment>
      <input
        value={value || ''}
        onChange={onChange}
        style={{ width: 200, marginRight: 20 }}
        placeholder="请输入"
      />
      <button type="button" onClick={reset}>
        reset
      </button>
    </Fragment>
  );
};
