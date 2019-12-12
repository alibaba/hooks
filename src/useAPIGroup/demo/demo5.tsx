import { List, Pagination, Select, Button } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import React, { useState } from 'react';
import useAPI from '..';
import { PaginatedFormatReturn } from '../types';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  pager: {
    total: number;
  }
  list: Item[];
}

const queryData = ({ current, pageSize, gender }) =>
  fetch(`https://randomuser.me/api?results=${pageSize}&page=${current}&gender=${gender}`)
    .then(res => res.json());

export default () => {
  const [gender, setGender] = useState();
  const { data, loading, pagination } = useAPI(
    params => queryData({ ...params, gender }),
    {
      paginated: true,
      refreshDeps: [gender],
      formatResult: (res) => ({
        pager: {
          total: 55
        },
        list: res.results,
      } as PaginatedFormatReturn<Item>)
    }
  );

  return (
    <>
      <Select
        style={{ width: 180, marginBottom: 24 }}
        onChange={g => setGender(g)}
        placeholder="select gender"
        allowClear
      >
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
      </Select>
      <List
        dataSource={data && data.list}
        loading={loading}
        renderItem={item => (
          <List.Item>
            {item.name.last} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...(pagination as PaginationConfig)}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={pagination.onChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </>
  );
};
