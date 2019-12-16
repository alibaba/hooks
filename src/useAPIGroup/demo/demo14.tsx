import React from 'react';
import { Select } from 'antd';
import useAPI from '..';

const { Option } = Select;

const getEmail = (str: string) => {
  console.log('search string: ', str);
  return fetch(`https://randomuser.me/api/?results=5&email=${str}`)
    .then(res => res.json())
    .then(res => res.results);
};

export default () => {
  const { data, loading, run, cancel } = useAPI(getEmail, {
    throttleInterval: 500,
    manual: true
  });

  return (
    <Select
      showSearch
      placeholder="Select Emails"
      filterOption={false}
      onSearch={run}
      onBlur={cancel}
      loading={loading}
      style={{ width: 300 }}
    >
      {data && data.map((d: any) => <Option key={d.email}>{d.email}</Option>)}
    </Select>
  );
};
