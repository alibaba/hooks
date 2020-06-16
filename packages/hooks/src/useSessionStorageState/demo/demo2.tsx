/**
 * title: Persist objects
 * desc: useSessionStorageState will do the serialization and deserialization work automatically.
 * 
 * title.zh-CN: 存储对象
 * desc.zh-CN: useSessionStorageState 会自动处理序列化和反序列化的操作。
 */

import React from 'react';
import { Cascader } from 'antd';
import { useSessionStorageState } from '@umijs/hooks';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default function () {
  const [value, setValue] = useSessionStorageState('cascader');
  return (
    <>
      <Cascader options={options} value={value} onChange={setValue} placeholder="Please select" />
    </>
  );
}
