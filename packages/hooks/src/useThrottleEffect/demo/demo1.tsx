/**
 * title: Basic usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React, { useState } from 'react';
import { Input } from 'antd';
import { useThrottleEffect } from 'ahooks';

export default () => {
  const [value, setValue] = useState('hello');
  const [records, setRecords] = useState<string[]>([]);

  useThrottleEffect(
    () => {
      setRecords((val) => [...val, value]);
    },
    [value],
    {
      wait: 1000,
    },
  );

  return (
    <div>
      <Input
        style={{ marginBottom: 8 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
      />
      <ul style={{ marginLeft: 16 }}>
        {records.map((record, index) => (
          <li key={index}>{record}</li>
        ))}
      </ul>
    </div>
  );
};
