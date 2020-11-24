/**
 * title: Default usage
 * desc: use boolean value as default，use it as same as useBoolean.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
import { useToggle } from 'ahooks';

export default () => {
  const [state, { toggle }] = useToggle();

  return (
    <div>
      <p>Effects：{`${state}`}</p>
      <p>
        <button type="button" onClick={() => toggle()}>
          Toggle
        </button>
        <button type="button" onClick={() => toggle(false)} style={{ margin: '0 8px' }}>
          Toggle False
        </button>
        <button type="button" onClick={() => toggle(true)}>
          Toggle True
        </button>
      </p>
    </div>
  );
};
