import React, { useState } from 'react';
import { Select, Input, AutoComplete } from 'antd';
import useSearch from '..';

const { Option } = Select;

const queryData = (type: string, text: string): Promise<string[]> => {
  console.log(type, text);
  const data: string[] = [];
  for (let i = 0; i < 10; i++) {
    data.push(`${type}-${i}-${text}-${Math.round(Math.random() * 100)}`);
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export default () => {
  const [type, setType] = useState('app');
  const { data = [], loading, onChange } = useSearch<string[]>(
    text => {
      if (!text) {
        return Promise.resolve([]);
      }
      return queryData(type, text);
    },
    [type],
  );

  return (
    <Input.Group compact>
      <Select value={type} onChange={setType} style={{ width: 92 }}>
        <Option value="app">App</Option>
        <Option value="product">Product</Option>
      </Select>
      <AutoComplete options={data} style={{ width: 300 }} onSearch={onChange} placeholder="Search">
        <Input.Search loading={loading} />
      </AutoComplete>
    </Input.Group>
  );
};
