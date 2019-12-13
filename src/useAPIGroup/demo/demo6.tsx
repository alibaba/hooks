import { Table, Button } from 'antd';
import React from 'react';
import useAPI from '../usePaginated';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

const getTableData = ({ current, pageSize, sorter, filters }) => {
  let url = `https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`;
  if (sorter && sorter.field && sorter.order) {
    url += `&${sorter.field}=${sorter.order}`;
  }
  if (filters) {
    Object.entries(filters).forEach(i => {
      url += `&${i[0]}=${i[1]}`;
    });
  }
  return fetch(url)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results as number,
      list: res.results as Item[],
    }));
};

export default () => {
  const { tableProps, filters, sorter, refresh } = useAPI(getTableData, {
    paginated: true
  });

  const columns = [
    {
      title: 'name',
      dataIndex: 'name.last',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      sorter: true,
      sortOrder: sorter && sorter.field === 'phone' ? sorter.order : false,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }],
      filteredValue: filters.gender,
    },
  ];

  return (
    <div>
      <Button onClick={refresh} style={{ marginBottom: 16 }}>刷新</Button>
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};
