/**
 * title: Select Search
 * desc: Common Select with asynchronous search.
 *
 * title.zh-CN: Select Search
 * desc.zh-CN: 常见的 Select 异步搜索。
 */

import React from 'react';
import { Select } from 'antd';
import { useSearch } from '@umijs/hooks';

const { Option } = Select;

const getEmail = (str: string) => {
  console.log('search string: ', str);
  return fetch(`https://randomuser.me/api/?results=5&email=${str}`)
    .then(res => res.json())
    .then(res => res.results);
};

export default () => {
  const { data, loading, onChange, cancel } = useSearch(getEmail);

  return (
    <Select
      showSearch
      placeholder="Select Emails"
      filterOption={false}
      onSearch={onChange}
      loading={loading}
      onBlur={cancel}
      style={{ width: 300 }}
    >
      {data && data.map((d: any) => <Option key={d.email}>{d.email}</Option>)}
    </Select>
  );
};
