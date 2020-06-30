/**
 * title: Persist state with function updater
 * desc: function updater is also acceptable with useCookieState.
 *
 * title.zh-CN: 使用 function updater 存储
 * desc.zh-CN: useCookieState 里也可以用 function updater，就像 useState 那样。
 */

import React from 'react';
import { useCookieState } from 'ahooks';

function getDefaultValue(): string {
  return [1, 2, 3, 4, 5].join(',');
}

export default function () {
  const [value, setValue] = useCookieState('cascader', {
    defaultValue: getDefaultValue,
  });

  return (
    <>
      <p>{value.replace(/,/g, '-')}</p>
      <button
        type="button"
        style={{ marginRight: '16px' }}
        onClick={() => setValue(value.split(',').reverse().join(','))}
      >
        push random
      </button>
      <button type="button" onClick={() => setValue(getDefaultValue)}>
        reset
      </button>
    </>
  );
}
