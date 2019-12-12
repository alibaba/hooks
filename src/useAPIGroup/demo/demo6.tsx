import { Table, Button } from 'antd';
import React from 'react';
import useAPI from '..';

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

const getTableData = ({ current, pageSize, sorter = {}, filters = {} }) => {
  console.log(current, pageSize, sorter, filters);
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
      total: res.info.results,
      list: res.results,
    }));
};

export default () => {
  const { tableProps, filters, sorter, cancel, run, refresh, params } = useAPI(getTableData, {
    paginated: true,
    formatResult: (res) => {
      return {
        list: res.list,
        pager: {
          total: res.total,
        }
      }
    }
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
      sortOrder: sorter && sorter.field === 'phone' && sorter.order,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }],
      filteredValue: filters && filters.gender,
    },
  ];

  return (
    <div>
      <Button onClick={refresh}>刷新</Button>
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};
