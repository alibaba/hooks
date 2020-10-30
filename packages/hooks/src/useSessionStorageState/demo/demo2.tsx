/**
 * title: Persist objects
 * desc: useSessionStorageState will do the serialization and deserialization work automatically.
 *
 * title.zh-CN: 存储对象
 * desc.zh-CN: useSessionStorageState 会自动处理序列化和反序列化的操作。
 */

import { useSessionStorageState } from 'ahooks';
import React from 'react';

const defaultArray = ['a', 'e', 'i', 'o', 'u'];

export default function () {
  const [value, setValue] = useSessionStorageState('cascader', defaultArray);

  return (
    <>
      <p>{value.join('-')}</p>
      <button
        type="button"
        style={{ marginRight: 8 }}
        onClick={() => setValue([...value, Math.random().toString(36).slice(-1)])}
      >
        push random
      </button>
      <button type="button" onClick={() => setValue(defaultArray)}>
        reset
      </button>
    </>
  );
}
