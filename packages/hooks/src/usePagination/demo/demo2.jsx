import { List, Pagination, Select } from 'antd';
import React, { useState } from 'react';
import usePagination from '..';

const queryData = ({ current, pageSize, gender }) =>
  fetch(`https://randomuser.me/api?results=${pageSize}&page=${current}&gender=${gender}`)
    .then(res => res.json())
    .then(res => ({
      total: 55,
      data: res.results,
    }));

export default () => {
  const [gender, setGender] = useState();
  const { data, loading, pagination } = usePagination(params => queryData({ ...params, gender }), [
    gender,
  ]);
  return (
    <>
      <Select
        style={{
          width: 180,
          marginBottom: 24,
        }}
        onChange={g => setGender(g)}
        placeholder="select gender"
        allowClear
      >
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
      </Select>
      <List
        dataSource={data}
        loading={loading}
        renderItem={item => (
          <List.Item>
            {item.name.last} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...pagination}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={pagination.onChange}
        style={{
          marginTop: 16,
          textAlign: 'right',
        }}
      />
    </>
  );
};
