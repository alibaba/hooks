/**
 * title: Store complex types such as array or object
 * description: useLocalStorageState will do the serialization and deserialization work automatically.
 *
 * title.zh-CN: 存储数组或对象等复杂类型
 * description.zh-CN: useLocalStorageState 会自动处理序列化和反序列化的操作。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useLocalStorageState } from 'ahooks';

const defaultArray = ['a', 'e', 'i', 'o', 'u'];

export default function () {
  const [value, setValue] = useLocalStorageState('use-local-storage-state-demo2', {
    defaultValue: defaultArray,
  });

  return (
    <>
      <Space style={{ marginBottom: 8 }} wrap>
        <Button onClick={() => setValue([...(value || []), Math.random().toString(36).slice(-1)])}>
          push random
        </Button>
        <Button onClick={() => setValue(defaultArray)}>reset</Button>
      </Space>
      <p>{value?.join('-')}</p>
    </>
  );
}
