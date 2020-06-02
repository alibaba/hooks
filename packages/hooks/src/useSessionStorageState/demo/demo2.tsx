/**
 * title: Persist objects
 * desc: useSessionStorageState will do the serialization and deserialization work automatically.
 *
 * title.zh-CN: 存储对象
 * desc.zh-CN: useSessionStorageState 会自动处理序列化和反序列化的操作。
 */

import React from 'react';
import { useSessionStorageState } from 'ahooks';

const defaultArray = ['a', 'h', 'o', 'o', 'k'];

export default function () {
  const [value, setValue] = useSessionStorageState('cascader', defaultArray);

  return (
    <>
      <p>{ value }</p>
      <button style={{ marginRight: '16px' }} onClick={() => setValue([...value, Math.random().toString(36).slice(-1)])}>push random</button>
      <button onClick={() => setValue(defaultArray)}>reset</button>
    </>
  );
}
