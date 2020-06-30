/**
 * title: Store complex types such as arrays or objects
 * desc: useCookieState will do the serialization and deserialization work automatically.
 *
 * title.zh-CN: 存储数组或对象等复杂类型
 * desc.zh-CN: useCookieState 会自动处理序列化和反序列化的操作。
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
