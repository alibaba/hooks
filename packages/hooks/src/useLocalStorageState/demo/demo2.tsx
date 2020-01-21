import React from 'react';
import { Cascader } from 'antd';
import useLocalStorageState from '..';

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
  const [value, setValue] = useLocalStorageState('cascader');
  return (
    <>
      <Cascader options={options} value={value} onChange={setValue} placeholder="Please select" />
    </>
  );
}
