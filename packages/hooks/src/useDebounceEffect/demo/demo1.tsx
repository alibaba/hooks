/**
 * title: Default usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React, { useState } from 'react';
import { Input } from 'antd';
import { useDebounceEffect } from 'ahooks';

export default () => {
  const [value, setValue] = useState('hello');
  const [records, setRecords] = useState<string[]>([]);

  useDebounceEffect(
    () => {
      setRecords((val) => [...val, value]);
    },
    [value],
    {
      wait: 1000,
    },
  );

  return (
    <>
      <Input
        style={{ marginBottom: 16 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
      />
      <ul style={{ marginLeft: 16 }}>
        {records.map((record, index) => (
          <li key={index}>{record}</li>
        ))}
      </ul>
    </>
  );
};
